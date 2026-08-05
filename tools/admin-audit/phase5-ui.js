'use strict';
/** ФАЗА 5 — браузерные тесты админки: все вкладки под каждой ролью, ошибки консоли, упавшие запросы. */

const PUP = process.env.PUPPETEER_PATH || 'C:/Users/MrCOMP/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer';
const puppeteer = require(PUP);
const { check, group, summary, saveReport, SUPER } = require('./lib');
const T = require('./tokens.json');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3100';
const SHOTS = path.join(__dirname, 'shots');
if (!fs.existsSync(SHOTS)) fs.mkdirSync(SHOTS, { recursive: true });

const TABS = [
  ['leads',      'Заявки'],
  ['clients',    'База клієнтів'],
  ['lessons',    'Уроки учнів'],
  ['dashboard',  'Дашборд'],
  ['admins',     'Співробітники'],
  ['courses',    'Курси'],
  ['curriculum', 'Програми'],
  ['content',    'Контент'],
  ['modules',    'Модулі'],
  ['articles',   'Статті'],
  ['reviews',    'Відгуки'],
  ['seo',        'SEO тексти'],
];

const SUBTABS = [['base', 'База'], ['payments', 'Оплати'], ['attendance', 'Відвідування'], ['schedule', 'Розклад']];

const ROLES = [
  ['суперадмин',   SUPER,           TABS.map(t => t[0])],
  ['администратор', T.administrator, TABS.filter(t => t[0] !== 'admins').map(t => t[0])],
  ['преподаватель', T.teacher,       ['clients']],
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const [roleName, token, allowedTabs] of ROLES) {
    group(`5.x Интерфейс — ${roleName}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1000 });

    const consoleErrors = [];
    const failedRequests = [];
    const pageErrors = [];
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', e => pageErrors.push(String(e.message)));
    // Внешние CDN (шрифты, аналитика) в headless-окружении недоступны — это шум окружения, не дефект админки.
    const EXTERNAL = /fonts\.gstatic|fonts\.googleapis|googletagmanager|google-analytics|contentsquare|doubleclick/;
    page.on('requestfailed', r => {
      if (!EXTERNAL.test(r.url())) failedRequests.push(`${r.method()} ${r.url()} — ${r.failure()?.errorText}`);
    });
    page.on('response', r => {
      if (r.url().includes('/api/') && r.status() >= 400) failedRequests.push(`${r.status()} ${r.request().method()} ${r.url()}`);
    });

    // Логин через localStorage — минуя форму
    await page.goto(BASE + '/admin.html', { waitUntil: 'domcontentloaded' });
    await page.evaluate(t => {
      localStorage.setItem('mca_admin_token', t);
      localStorage.setItem('mca_admin_tab', 'leads');
      localStorage.setItem('mca_admin_site', '');
    }, token);
    await page.goto(BASE + '/admin.html', { waitUntil: 'networkidle2' });
    await sleep(1200);

    const loggedIn = await page.evaluate(() => document.getElementById('app')?.style.display !== 'none');
    check(`[${roleName}] Вход по токену выполнен`, loggedIn, '', 'blocker');
    if (!loggedIn) { await page.close(); continue; }

    const badge = await page.evaluate(() => document.getElementById('roleBadge')?.textContent?.trim());
    check(`[${roleName}] Роль отображается в шапке`, !!badge, `бейдж: "${badge}"`, 'medium');

    // Видимость пунктов меню соответствует роли
    const visibleTabs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.sidebar-item'))
        .filter(b => b.offsetParent !== null)
        .map(b => b.id.replace('sideNav-', '')));
    const extra = visibleTabs.filter(t => !allowedTabs.includes(t));
    check(`[${roleName}] В меню нет лишних разделов`, extra.length === 0,
      `видны сверх ожидаемого: ${extra.join(', ')}`, 'high');

    // Обход вкладок
    for (const [tab, label] of TABS) {
      if (!visibleTabs.includes(tab)) continue;
      const before = consoleErrors.length + pageErrors.length;
      await page.evaluate(t => window.showTab(t), tab);
      await sleep(900);

      const shown = await page.evaluate(t => {
        const el = document.getElementById(t + 'Tab');
        return !!el && el.style.display !== 'none' && el.offsetParent !== null;
      }, tab);
      check(`[${roleName}] Вкладка «${label}» открывается`, shown, '', 'high');

      const empty = await page.evaluate(t => {
        const el = document.getElementById(t + 'Tab');
        return !el ? true : (el.innerText || '').trim().length < 20;
      }, tab);
      check(`[${roleName}] Вкладка «${label}» не пустая`, !empty, 'содержимое почти отсутствует', 'high');

      const after = consoleErrors.length + pageErrors.length;
      check(`[${roleName}] «${label}» без ошибок JavaScript`, after === before,
        [...consoleErrors, ...pageErrors].slice(before).join(' | ').slice(0, 400), 'high');

      if (roleName === 'суперадмин') {
        await page.screenshot({ path: path.join(SHOTS, `tab-${tab}.png`) });
      }
    }

    // Подвкладки клиентов
    if (visibleTabs.includes('clients')) {
      await page.evaluate(() => window.showTab('clients'));
      await sleep(700);
      const visibleSubs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.csub-btn'))
          .filter(b => b.offsetParent !== null)
          .map(b => b.id.replace('csub-', '')));
      for (const [sub, subLabel] of SUBTABS) {
        if (!visibleSubs.includes(sub)) continue;
        const before = consoleErrors.length + pageErrors.length;
        await page.evaluate(s => window.showClientsSubTab(s), sub);
        await sleep(900);
        const ok = await page.evaluate(s => {
          const el = document.getElementById('csub' + s.charAt(0).toUpperCase() + s.slice(1));
          return el ? el.style.display !== 'none' : null;
        }, sub);
        check(`[${roleName}] Подвкладка «${subLabel}» открывается`, ok !== false, `состояние: ${ok}`, 'high');
        check(`[${roleName}] «${subLabel}» без ошибок JavaScript`,
          consoleErrors.length + pageErrors.length === before,
          [...consoleErrors, ...pageErrors].slice(before).join(' | ').slice(0, 400), 'high');
        if (roleName === 'суперадмин') await page.screenshot({ path: path.join(SHOTS, `clients-${sub}.png`) });
      }
      if (roleName === 'преподаватель') {
        const hiddenForTeacher = await page.evaluate(() => ({
          base: document.getElementById('csub-base')?.style.display,
          payments: document.getElementById('csub-payments')?.style.display,
        }));
        check('[преподаватель] Подвкладки «База» и «Оплати» скрыты',
          hiddenForTeacher.base === 'none' && hiddenForTeacher.payments === 'none',
          JSON.stringify(hiddenForTeacher), 'high');
      }
    }

    // Модальные окна (только для ролей с правом записи)
    if (roleName !== 'преподаватель') {
      group(`5.y Модальные окна — ${roleName}`);
      const MODALS = [
        ['openClientModal', null, 'clientModal', 'Карточка клиента'],
        ['openCourseModal', null, 'courseModal', 'Карточка курса'],
        ['openArticleModal', null, 'articleModal', 'Карточка статьи'],
        ['openReviewModal', null, 'reviewModal', 'Карточка отзыва'],
        ['openNewLeadModal', undefined, 'newLeadModal', 'Новая заявка'],
        ['openLtModal', undefined, 'ltModal', 'Выдача токена урока'],
      ];
      for (const [fn, arg, modalId, label] of MODALS) {
        const before = consoleErrors.length + pageErrors.length;
        const opened = await page.evaluate((f, a, id) => {
          try {
            if (typeof window[f] !== 'function') return 'нет функции ' + f;
            a === undefined ? window[f]() : window[f](a);
            const el = document.getElementById(id);
            // .modal-overlay — position:fixed, у него offsetParent всегда null,
            // поэтому смотрим только на вычисленный display.
            return el ? getComputedStyle(el).display !== 'none' : 'нет элемента ' + id;
          } catch (e) { return 'исключение: ' + e.message; }
        }, fn, arg, modalId);
        check(`[${roleName}] ${label} открывается`, opened === true, String(opened), 'high');
        check(`[${roleName}] ${label} без ошибок JavaScript`,
          consoleErrors.length + pageErrors.length === before,
          [...consoleErrors, ...pageErrors].slice(before).join(' | ').slice(0, 300), 'medium');
        await page.evaluate(() => {
          document.querySelectorAll('.modal, [id$="Modal"]').forEach(m => { if (m.style) m.style.display = 'none'; });
        });
        await sleep(150);
      }
    }

    group(`5.z Сводка ошибок — ${roleName}`);
    check(`[${roleName}] Нет необработанных исключений на странице`, pageErrors.length === 0,
      pageErrors.slice(0, 5).join(' | ').slice(0, 600), 'high');
    // ERR_ABORTED — это запросы, отменённые вторым page.goto при входе по
    // токену; они не отражают поведение панели у реального пользователя.
    const realFailed = failedRequests.filter(f =>
      !/\/api\/(leads|clients)\/9999999/.test(f) && !/ERR_ABORTED/.test(f));
    check(`[${roleName}] Нет упавших запросов к API`, realFailed.length === 0,
      realFailed.slice(0, 8).join(' | ').slice(0, 800), 'high');

    await page.close();
  }

  await browser.close();
  summary('ФАЗА 5 — интерфейс');
  saveReport(path.join(__dirname, 'report-phase5.json'));
})();
