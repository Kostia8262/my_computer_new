'use strict';
/** ФАЗА 7 — подтверждение находок в живом интерфейсе: что именно видит сотрудник. */

const PUP = process.env.PUPPETEER_PATH || 'C:/Users/MrCOMP/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer';
const puppeteer = require(PUP);
const { get, post, patch, put, del, check, group, summary, saveReport, SUPER, openDb, uniq } = require('./lib');
const T = require('./tokens.json');
const path = require('path');

const ADMIN = T.administrator;
const YM = '2099-07';
const sleep = n => new Promise(r => setTimeout(r, n));

(async () => {
  const db = openDb('main');

  // ══════════ A. Сирота в оплатах продолжает считаться в итогах месяца ══════════
  group('7.A Сирота в месячных оплатах');
  const victim = await post('/api/clients', { name: 'ПРОВЕРКА Сирота ' + uniq(), phone: '0505050505', monthlyFee: 5000 }, { token: ADMIN });
  const vid = victim.json.client.id;
  await post(`/api/monthly-payments/${YM}`, { records: [] }, { token: ADMIN });
  await put(`/api/monthly-payments/${YM}/${vid}`, { expectedAmount: 5000, paidAmount: 5000, status: 'paid' }, { token: ADMIN });

  const beforeDel = await get(`/api/monthly-payments/${YM}`, { token: ADMIN });
  const sumBefore = (beforeDel.json?.records || []).reduce((s, r) => s + (r.paidAmount || 0), 0);

  await del(`/api/clients/${vid}`, { token: SUPER });

  const afterDel = await get(`/api/monthly-payments/${YM}`, { token: ADMIN });
  const orphan = (afterDel.json?.records || []).find(r => r.clientId === vid);
  const sumAfter = (afterDel.json?.records || []).reduce((s, r) => s + (r.paidAmount || 0), 0);

  check('После удаления клиента его оплата исчезает из месяца', !orphan,
    `запись клиента #${vid} на 5000 грн осталась в месяце ${YM}: имя "${orphan?.clientName}", статус "${orphan?.status}"`, 'high');
  check('Итог месяца уменьшается после удаления клиента', sumAfter < sumBefore,
    `итог по оплатам до удаления ${sumBefore} грн, после — ${sumAfter} грн: удалённый ученик продолжает считаться в кассе`, 'high');

  // ══════════ B. Преподаватель и вкладка «Уроки учнів» ══════════
  group('7.B Преподаватель во вкладке «Уроки учнів»');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  await page.goto('http://localhost:3100/admin.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(t => {
    localStorage.setItem('mca_admin_token', t);
    localStorage.setItem('mca_admin_tab', 'leads');
  }, T.teacher);
  await page.goto('http://localhost:3100/admin.html', { waitUntil: 'networkidle2' });
  await sleep(1500);

  const lessonsVisible = await page.evaluate(() => {
    const b = document.getElementById('sideNav-lessons');
    return !!b && b.offsetParent !== null;
  });
  check('Преподаватель не видит раздел «Уроки учнів»', !lessonsVisible,
    'пункт меню виден преподавателю, хотя это раздел с доступами учеников', 'high');

  // Даже если открыть вкладку напрямую из консоли, сами доступы подгрузиться
  // не должны: строки учеников рисуются из списка клиентов, а вот ссылок с
  // токенами в разметке быть не может.
  await page.evaluate(() => window.showTab('lessons'));
  await sleep(1800);
  const leaked = await page.evaluate(() => {
    const el = document.getElementById('lessonsTab');
    const html = el ? el.innerHTML : '';
    return (html.match(/lessons\?token=/g) || []).length;
  });
  check('Преподавателю не показывают персональные ссылки доступа', leaked === 0,
    `в разметке ${leaked} ссылок с токенами учеников`, 'high');

  // Может ли преподаватель реально выдать токен
  const teacherIssue = await post('/api/lesson-tokens', { studentName: 'ПРОВЕРКА выдано преподавателем' }, { token: T.teacher });
  check('Преподаватель не может выдать токен доступа', teacherIssue.status === 401 || teacherIssue.status === 403,
    `сервер ответил ${teacherIssue.status} — токен создан преподавателем`, 'high');
  if (teacherIssue.json?.token?.id) await del(`/api/lesson-tokens/${teacherIssue.json.token.id}`, { token: SUPER });

  const seoVisible = await page.evaluate(() => {
    const b = document.getElementById('sideNav-seo');
    return !!b && b.offsetParent !== null;
  });
  check('Преподаватель не видит раздел «SEO тексти»', !seoVisible,
    'пункт меню виден, при открытии данные не грузятся — сервер отвечает 403', 'medium');

  await page.screenshot({ path: path.join(__dirname, 'shots', 'teacher-sidebar.png') });
  await page.close();

  // ══════════ C. Что видит сотрудник при сохранении SEO на лендинге ══════════
  group('7.C Сохранение SEO на лендинге');
  const seoPut = await (async () => {
    const { req } = require('./lib');
    return req('PUT', '/api/content/seo', { base: 'http://localhost:3103', token: SUPER, body: { data: { h1: 'проба' } } });
  })();
  check('SEO-тексты лендинга сохраняются', seoPut.status === 200,
    `python.mycomputer.education отвечает ${seoPut.status}: ${seoPut.text.slice(0, 120)} — правка теряется`, 'high');

  const seoRead = await (async () => {
    const { req } = require('./lib');
    return req('GET', '/api/content', { base: 'http://localhost:3103' });
  })();
  const hasSeoSection = JSON.stringify(seoRead.json || {}).includes('"seo"');
  check('Раздел SEO лендинга и читается, и сохраняется', hasSeoSection && seoPut.status === 200,
    `чтение: ${hasSeoSection ? 'есть' : 'нет'}, запись: ${seoPut.status}`, 'high');
  const seoBack = JSON.stringify(seoRead.json || {}).includes('проба');
  check('Сохранённый SEO-текст возвращается при чтении', seoBack,
    'записанное значение не вернулось', 'high');

  // ══════════ D. Пересчёт статистики после удаления ══════════
  group('7.D Согласованность счётчиков');
  const stats = await get('/api/clients', { token: ADMIN });
  const listed = (stats.json?.clients || []).length;
  const inDb = db.prepare('SELECT COUNT(*) n FROM clients').get().n;
  check('Счётчик клиентов совпадает с базой', listed === inDb, `в ответе ${listed}, в таблице ${inDb}`, 'high');
  const statTotal = stats.json?.stats?.total;
  check('Сводка по статусам совпадает со списком', statTotal === listed,
    `в сводке ${statTotal}, в списке ${listed}`, 'medium');

  const leadStats = await get('/api/leads/stats', { token: ADMIN });
  const leadsAll = await get('/api/leads', { token: ADMIN });
  check('Счётчик заявок совпадает со списком',
    (leadStats.json?.stats?.total ?? null) === (leadsAll.json?.leads || []).length,
    `в сводке ${leadStats.json?.stats?.total}, в списке ${(leadsAll.json?.leads || []).length}`, 'medium');

  await browser.close();
  summary('ФАЗА 7 — подтверждение находок');
  saveReport(path.join(__dirname, 'report-phase7.json'));
})();
