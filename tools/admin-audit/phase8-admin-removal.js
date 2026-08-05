'use strict';
/** ФАЗА 8 — проверка удаления копий админки: редиректы, целость API, целость главной панели. */

const { req, check, eq, group, summary, saveReport, SUPER, uniq } = require('./lib');
const path = require('path');

const MAIN = 'http://localhost:3100';
const EXPECTED_TARGET = 'https://mycomputer.education/admin.html';

// Сайты, где копия админки удалена и должен стоять редирект
const REDIRECTED = [
  ['mycomputer.school',              'http://localhost:3101'],
  ['webdesign.mycomputer.education', 'http://localhost:3102'],
  ['python.mycomputer.education',    'http://localhost:3103'],
  ['minecraft.mycomputer.education', 'http://localhost:3104'],
  ['roblox.mycomputer.education',    'http://localhost:3105'],
  ['frontend.mycomputer.education',  'http://localhost:3106'],
  ['construct.mycomputer.education', 'http://localhost:3107'],
  ['scratch.mycomputer.education',   'http://localhost:3108'],
  ['blog.mycomputer.school',         'http://localhost:3109'],
  ['3dsmax.mycomputer.school',       'http://localhost:3110'],
];

(async () => {
  // ── 8.1 Пути ведут на главную админку ────────────────────────────────────
  group('8.1 Редирект на главную админку');
  for (const [name, base] of REDIRECTED) {
    for (const p of ['/admin', '/admin.html']) {
      const r = await req('GET', p, { base });
      const loc = r.headers.get('location');
      check(`[${name}] ${p} перенаправляет на главную`,
        (r.status === 301 || r.status === 302) && loc === EXPECTED_TARGET,
        `статус ${r.status}, location=${loc}`, 'high');
    }
    // Копии страницы не должно быть даже через статику
    const stale = await req('GET', '/admin.html?raw=1', { base });
    check(`[${name}] Старая копия панели не отдаётся`,
      stale.status === 301 || stale.status === 302 || stale.status === 404,
      `статус ${stale.status}`, 'high');
  }

  // ── 8.2 Главная админка на месте ─────────────────────────────────────────
  group('8.2 Главная админка цела');
  const page = await req('GET', '/admin.html', { base: MAIN });
  check('Главная админка отдаётся с кодом 200', page.status === 200, `статус ${page.status}`, 'blocker');
  check('Это действительно панель, а не заглушка', /siteSelector/.test(page.text) && /mca_admin_token/.test(page.text),
    `размер ответа ${page.text.length} байт`, 'blocker');
  const short = await req('GET', '/admin', { base: MAIN });
  check('Короткий путь /admin на главной работает', short.status === 200, `статус ${short.status}`, 'blocker');
  check('Переключатель сайтов содержит все домены',
    (page.text.match(/mycomputer\.(school|education)/g) || []).length >= 9,
    `найдено упоминаний доменов: ${(page.text.match(/mycomputer\.(school|education)/g) || []).length}`, 'high');

  // ── 8.3 API каждого сайта не пострадали ──────────────────────────────────
  group('8.3 API сайтов в целости');
  for (const [name, base] of REDIRECTED) {
    for (const [p, needAuth] of [['/api/health', false], ['/api/courses', false], ['/api/content', false]]) {
      const r = await req('GET', p, { base, token: needAuth ? SUPER : undefined });
      check(`[${name}] ${p} отвечает`, r.status === 200, `статус ${r.status}`, 'blocker');
    }
    const withToken = await req('GET', '/api/courses?all=1', { base, token: SUPER });
    check(`[${name}] Админский доступ к курсам работает`, withToken.status === 200, `статус ${withToken.status}`, 'blocker');
    const noToken = await req('POST', '/api/courses', { base, body: { id: 'x', name: 'x' } });
    check(`[${name}] Запись без токена по-прежнему закрыта`, noToken.status === 401 || noToken.status === 403,
      `статус ${noToken.status}`, 'blocker');
  }

  // ── 8.4 Редактирование чужого сайта из главной панели ────────────────────
  group('8.4 Мультисайтовое редактирование работает');
  for (const [name, base] of REDIRECTED) {
    const probe = 'значення-' + uniq();
    const put = await req('PUT', '/api/content/seo', { base, token: SUPER, body: { data: { probe } } });
    check(`[${name}] SEO-раздел сохраняется из главной панели`, put.status === 200, `статус ${put.status}`, 'blocker');
    const back = await req('GET', '/api/content', { base });
    check(`[${name}] Сохранённое читается обратно`, back.text.includes(probe), 'значение не вернулось', 'blocker');

    const cid = 'probe-' + uniq().toLowerCase();
    const made = await req('POST', '/api/courses', { base, token: SUPER, body: { id: cid, name: 'ТЕСТ', price: 100 } });
    check(`[${name}] Курс создаётся из главной панели`, made.status === 201, `статус ${made.status}`, 'blocker');
    if (made.status === 201) {
      const upd = await req('PATCH', `/api/courses/${cid}`, { base, token: SUPER, body: { price: 200 } });
      check(`[${name}] Курс редактируется`, upd.status === 200, `статус ${upd.status}`, 'blocker');
      const rm = await req('DELETE', `/api/courses/${cid}`, { base, token: SUPER });
      check(`[${name}] Курс удаляется`, rm.status === 200, `статус ${rm.status}`, 'blocker');
    }
  }

  // ── 8.5 Сайты остались работоспособны для посетителей ────────────────────
  group('8.5 Публичная часть сайтов');
  for (const [name, base] of REDIRECTED) {
    const home = await req('GET', '/', { base });
    check(`[${name}] Главная страница отдаётся`, home.status === 200, `статус ${home.status}`, 'blocker');
    const robots = await req('GET', '/robots.txt', { base });
    check(`[${name}] robots.txt отдаётся`, robots.status === 200, `статус ${robots.status}`, 'medium');
  }

  summary('ФАЗА 8 — удаление копий админки');
  saveReport(path.join(__dirname, 'report-phase8.json'));
})();
