'use strict';
/**
 * ФИНАЛЬНАЯ ПРИЁМКА — боевая админка в браузере.
 * Только чтение: открываем вкладки, смотрим реальные данные, ловим ошибки.
 * Ничего не создаём и не меняем.
 */

const PUP = process.env.PUPPETEER_PATH || 'C:/Users/MrCOMP/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer';
const puppeteer = require(PUP);
const fs = require('fs');
const path = require('path');
const { check, group, summary, saveReport } = require('./lib');

const BASE = 'https://mycomputer.education';
const TOKEN = fs.readFileSync(path.join(__dirname, '..', 'prod-token.txt'), 'utf8').trim();
const SHOTS = path.join(__dirname, 'shots-prod');
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
const SUBTABS = [['base', 'База клієнтів'], ['payments', 'Оплати'], ['attendance', 'Відвідування'], ['schedule', 'Розклад']];
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });

  const consoleErrors = [], pageErrors = [], failedApi = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => pageErrors.push(String(e.message)));
  page.on('response', r => {
    if (r.url().includes('/api/') && r.status() >= 400) failedApi.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '')}`);
  });

  group('П1 Вход в боевую панель');
  await page.goto(BASE + '/admin.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(t => localStorage.setItem('mca_admin_token', t), TOKEN);
  await page.goto(BASE + '/admin.html', { waitUntil: 'networkidle2' });
  await sleep(2500);

  const loggedIn = await page.evaluate(() => document.getElementById('app')?.style.display !== 'none');
  check('Вход по боевому токену выполняется', loggedIn, '', 'blocker');
  const role = await page.evaluate(() => document.getElementById('roleBadge')?.textContent?.trim());
  check('Роль определяется как суперадмин', /Суперадмін/.test(role || ''), `бейдж: "${role}"`, 'blocker');

  group('П2 Реальные данные на вкладках');
  const leadsRows = await page.evaluate(() => document.querySelectorAll('#leadsBody tr').length);
  check('Заявки отображаются', leadsRows > 0, `строк: ${leadsRows}`, 'blocker');
  await page.screenshot({ path: path.join(SHOTS, 'prod-leads.png') });

  for (const [tab, label] of TABS) {
    const before = consoleErrors.length + pageErrors.length;
    await page.evaluate(t => window.showTab(t), tab);
    await sleep(1600);

    const state = await page.evaluate(t => {
      const el = document.getElementById(t + 'Tab');
      return { shown: !!el && el.style.display !== 'none', len: (el?.innerText || '').trim().length };
    }, tab);
    check(`Вкладка «${label}» открывается`, state.shown, '', 'blocker');
    check(`Вкладка «${label}» с содержимым`, state.len > 40, `символов текста: ${state.len}`, 'high');
    check(`«${label}» без ошибок JavaScript`, consoleErrors.length + pageErrors.length === before,
      [...consoleErrors, ...pageErrors].slice(before).join(' | ').slice(0, 300), 'high');
    await page.screenshot({ path: path.join(SHOTS, `prod-tab-${tab}.png`) });
  }

  group('П3 Подвкладки клиентов');
  await page.evaluate(() => window.showTab('clients'));
  await sleep(1500);
  for (const [sub, label] of SUBTABS) {
    const before = consoleErrors.length + pageErrors.length;
    await page.evaluate(s => window.showClientsSubTab(s), sub);
    await sleep(1800);
    const shown = await page.evaluate(s => {
      const el = document.getElementById('csub' + s.charAt(0).toUpperCase() + s.slice(1));
      return el ? el.style.display !== 'none' : null;
    }, sub);
    check(`Подвкладка «${label}» открывается`, shown === true, `состояние: ${shown}`, 'blocker');
    check(`«${label}» без ошибок JavaScript`, consoleErrors.length + pageErrors.length === before,
      [...consoleErrors, ...pageErrors].slice(before).join(' | ').slice(0, 300), 'high');
    await page.screenshot({ path: path.join(SHOTS, `prod-clients-${sub}.png`) });
  }

  group('П4 Формы открываются');
  const MODALS = [
    ['openClientModal', null, 'clientModal', 'Карточка клиента'],
    ['openCourseModal', null, 'courseModal', 'Карточка курса'],
    ['openArticleModal', null, 'articleModal', 'Карточка статьи'],
    ['openReviewModal', null, 'reviewModal', 'Карточка отзыва'],
    ['openNewLeadModal', undefined, 'newLeadModal', 'Новая заявка'],
    ['openLtModal', undefined, 'ltModal', 'Выдача доступа к урокам'],
  ];
  for (const [fn, arg, id, label] of MODALS) {
    const opened = await page.evaluate((f, a, mid) => {
      try {
        if (typeof window[f] !== 'function') return 'нет функции';
        a === undefined ? window[f]() : window[f](a);
        const el = document.getElementById(mid);
        return el ? getComputedStyle(el).display !== 'none' : 'нет элемента';
      } catch (e) { return 'исключение: ' + e.message; }
    }, fn, arg, id);
    check(`${label} открывается`, opened === true, String(opened), 'high');
    await page.evaluate(() => document.querySelectorAll('[id$="Modal"]').forEach(m => { if (m.style) m.style.display = 'none'; }));
    await sleep(120);
  }

  group('П5 Переключение на другие сайты');
  for (const site of ['https://mycomputer.school', 'https://python.mycomputer.education']) {
    const before = failedApi.length;
    await page.evaluate(s => {
      const sel = document.getElementById('siteSelector');
      sel.value = s;
      window.onSiteChange();
    }, site);
    await sleep(1200);
    await page.evaluate(() => window.showTab('courses'));
    await sleep(2500);
    const rows = await page.evaluate(() => (document.getElementById('coursesTab')?.innerText || '').trim().length);
    check(`Курсы сайта ${site.replace('https://', '')} загружаются`, rows > 40, `символов: ${rows}`, 'blocker');
    const newFails = failedApi.slice(before).filter(f => f.includes(site.replace('https://', '')));
    check(`Обращения к ${site.replace('https://', '')} без ошибок`, newFails.length === 0,
      newFails.join(' | ').slice(0, 300), 'blocker');
    await page.screenshot({ path: path.join(SHOTS, `prod-site-${site.replace(/[^a-z]/g, '')}.png`) });
  }
  await page.evaluate(() => {
    const sel = document.getElementById('siteSelector');
    sel.value = '';
    window.onSiteChange();
  });

  group('П6 Итог по ошибкам');
  check('Нет необработанных исключений', pageErrors.length === 0, pageErrors.slice(0, 4).join(' | ').slice(0, 500), 'blocker');
  check('Нет ошибок в консоли', consoleErrors.length === 0, consoleErrors.slice(0, 4).join(' | ').slice(0, 500), 'high');
  check('Нет упавших запросов к API', failedApi.length === 0, failedApi.slice(0, 6).join(' | ').slice(0, 500), 'blocker');

  await browser.close();
  summary('ФИНАЛЬНАЯ ПРИЁМКА — боевая админка');
  saveReport(path.join(__dirname, 'report-prod-ui.json'));
})();
