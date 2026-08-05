'use strict';
/** ФАЗА 6б — скорость на объёме, одновременная работа, расход лимита запросов. */

const PUP = process.env.PUPPETEER_PATH || 'C:/Users/MrCOMP/AppData/Roaming/npm/node_modules/@modelcontextprotocol/server-puppeteer/node_modules/puppeteer';
const { get, post, patch, del, check, group, summary, saveReport, SUPER, openDb } = require('./lib');
const T = require('./tokens.json');
const path = require('path');

const ADMIN = T.administrator;
const ms = async fn => { const t = Date.now(); const r = await fn(); return [Date.now() - t, r]; };

(async () => {
  // ══════════ 6.1 Скорость API на объёме ══════════
  group('6.1 Скорость API на объёме');
  const [tClients, rClients] = await ms(() => get('/api/clients', { token: ADMIN }));
  const nClients = (rClients.json?.clients || []).length;
  check('Список клиентов отвечает быстрее 2 с', tClients < 2000, `${tClients} мс на ${nClients} записей`, 'medium');
  check('Ответ со списком клиентов меньше 1 МБ', rClients.text.length < 1024 * 1024,
    `${Math.round(rClients.text.length / 1024)} КБ на ${nClients} клиентов — отдаётся вся база целиком`, 'medium');

  const [tLeads, rLeads] = await ms(() => get('/api/leads', { token: ADMIN }));
  check('Список заявок отвечает быстрее 2 с', tLeads < 2000, `${tLeads} мс на ${(rLeads.json?.leads || []).length} записей`, 'medium');
  const [tAlerts] = await ms(() => get('/api/alerts', { token: ADMIN }));
  check('Оповещения отвечают быстрее 2 с', tAlerts < 2000, `${tAlerts} мс`, 'medium');
  const [tAtt] = await ms(() => get('/api/attendance?year=2099&month=6', { token: ADMIN }));
  check('Посещаемость отвечает быстрее 2 с', tAtt < 2000, `${tAtt} мс`, 'medium');
  const [tSal] = await ms(() => get('/api/admins/1/salary?ym=2099-06', { token: SUPER }));
  check('Расчёт зарплаты отвечает быстрее 3 с', tSal < 3000, `${tSal} мс`, 'medium');

  // ══════════ 6.2 Одновременная работа ══════════
  group('6.2 Одновременная работа сотрудников');
  const list = rClients.json?.clients || [];
  const target = list.find(c => String(c.name).startsWith('НАГРУЗКА'))?.id;

  const [rA, rB] = await Promise.all([
    patch(`/api/clients/${target}`, { notes: 'правка сотрудника А' }, { token: ADMIN }),
    patch(`/api/clients/${target}`, { city: 'Київ' }, { token: T.manager }),
  ]);
  check('Две одновременные правки разных полей проходят', rA.status === 200 && rB.status === 200,
    `A=${rA.status}, B=${rB.status}`, 'high');
  const db = openDb('main');
  const after = db.prepare('SELECT notes, city FROM clients WHERE id=?').get(target);
  check('Одновременные правки разных полей не затирают друг друга',
    after?.notes === 'правка сотрудника А' && after?.city === 'Київ',
    `в БД notes="${after?.notes}", city="${after?.city}" — правка второго сотрудника потеряна`, 'high');

  const race = await Promise.all(Array.from({ length: 10 }, (_, i) =>
    patch(`/api/clients/${target}`, { notes: `гонка-${i}` }, { token: ADMIN })));
  check('Десять одновременных записей в одно поле обрабатываются', race.every(r => r.status === 200),
    race.map(r => r.status).join(','), 'high');

  const bulk = await Promise.all(Array.from({ length: 20 }, (_, i) =>
    post('/api/clients', { name: `ГОНКА ${i}`, phone: `07${String(10000000 + i)}` }, { token: ADMIN })));
  const ids = bulk.map(r => r.json?.client?.id).filter(Boolean);
  check('Двадцать одновременных созданий дают 20 разных записей',
    ids.length === 20 && new Set(ids).size === 20,
    `создано ${ids.length}, уникальных ${new Set(ids).size}`, 'high');
  for (const id of ids) await del(`/api/clients/${id}`, { token: SUPER });

  const mp = await Promise.all(list.filter(c => String(c.name).startsWith('НАГРУЗКА')).slice(0, 15).map(c =>
    patch(`/api/monthly-payments/2099-06/${c.id}`, { paidAmount: 3600, status: 'paid' }, { token: ADMIN })));
  check('Одновременная отметка оплат по 15 ученикам проходит', mp.every(r => r.status === 200),
    mp.map(r => r.status).join(','), 'high');

  // ══════════ 6.3 Расход лимита запросов ══════════
  group('6.3 Расход лимита запросов');
  const puppeteer = require(PUP);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });
  const errs = [];
  let apiCalls = 0;
  page.on('pageerror', e => errs.push(String(e.message)));
  page.on('request', r => { if (r.url().includes('/api/')) apiCalls++; });

  await page.goto('http://localhost:3100/admin.html', { waitUntil: 'domcontentloaded' });
  await page.evaluate(t => localStorage.setItem('mca_admin_token', t), SUPER);

  const tStart = Date.now();
  await page.goto('http://localhost:3100/admin.html', { waitUntil: 'networkidle2' });
  await page.waitForFunction(() => document.querySelectorAll('#leadsBody tr').length > 10, { timeout: 45000 }).catch(() => {});
  const tRender = Date.now() - tStart;
  const rows = await page.evaluate(() => document.querySelectorAll('#leadsBody tr').length);
  check('Вкладка заявок отрисовывается быстрее 10 с', tRender < 10000, `${tRender} мс, строк: ${rows}`, 'medium');
  check('Все заявки рисуются одной таблицей без постраничного вывода', rows > 400,
    `строк в DOM: ${rows} — при 5000 заявок это будет 5000 строк сразу`, 'info');
  const callsAfterLoad = apiCalls;
  check('Открытие админки тратит не больше 10 запросов из лимита', callsAfterLoad <= 10,
    `на один вход в панель ушло ${callsAfterLoad} запросов при лимите 500 на IP за 15 минут`, 'medium');

  const tCl = Date.now();
  await page.evaluate(() => window.showTab('clients'));
  await page.waitForFunction(() => document.querySelectorAll('#clientsBody tr').length > 10, { timeout: 45000 }).catch(() => {});
  const clRows = await page.evaluate(() => document.querySelectorAll('#clientsBody tr').length);
  check('Вкладка клиентов отрисовывается быстрее 10 с', Date.now() - tCl < 10000,
    `${Date.now() - tCl} мс, строк: ${clRows}`, 'medium');

  const tAttUi = Date.now();
  await page.evaluate(() => window.showClientsSubTab('attendance'));
  await new Promise(r => setTimeout(r, 4000));
  check('Таблица посещаемости на объёме отрисовывается быстрее 15 с', Date.now() - tAttUi < 15000,
    `${Date.now() - tAttUi} мс`, 'medium');

  const tPay = Date.now();
  await page.evaluate(() => window.showClientsSubTab('payments'));
  await new Promise(r => setTimeout(r, 4000));
  const payCalls = apiCalls - callsAfterLoad;
  check('Вкладка оплат отрисовывается быстрее 15 с', Date.now() - tPay < 15000, `${Date.now() - tPay} мс`, 'medium');

  const tDash = Date.now();
  await page.evaluate(() => window.showTab('dashboard'));
  await new Promise(r => setTimeout(r, 5000));
  check('Дашборд отрисовывается быстрее 15 с', Date.now() - tDash < 15000, `${Date.now() - tDash} мс`, 'medium');
  check('Полный обход вкладок укладывается в лимит запросов', apiCalls < 100,
    `суммарно ${apiCalls} запросов за один сеанс просмотра; лимит 500 на IP за 15 минут — примерно ${Math.floor(500 / Math.max(apiCalls, 1))} таких сеансов`, 'high');

  check('Интерфейс на объёме без исключений', errs.length === 0, errs.slice(0, 3).join(' | ').slice(0, 400), 'high');
  await page.screenshot({ path: path.join(__dirname, 'shots', 'volume-dashboard.png'), fullPage: false });
  await browser.close();

  summary('ФАЗА 6б — объём и одновременная работа');
  saveReport(path.join(__dirname, 'report-phase6.json'));
})();
