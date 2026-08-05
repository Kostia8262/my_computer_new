'use strict';
/** ФАЗА 2 — безопасность: матрица ролей, утечки, инъекции, лимиты. */

const { req, get, post, patch, put, del, check, eq, group, summary, saveReport, SUPER, BASE } = require('./lib');
const T = require('./tokens.json');
const path = require('path');

const ADMIN = T.administrator, MANAGER = T.manager, TEACHER = T.teacher, REVOKED = T.revoked;
const GARBAGE = 'deadbeef'.repeat(6);

/**
 * Матрица эндпоинтов. access:
 *   'super'  — только суперадмин
 *   'admin'  — любая админская роль кроме преподавателя
 *   'any'    — любая аутентифицированная роль (включая преподавателя)
 *   'public' — без токена
 */
const ENDPOINTS = [
  // — учётные записи сотрудников —
  ['GET',    '/api/admins',                       'super'],
  ['POST',   '/api/admins',                       'super', { name: 'X-probe', role: 'manager' }],
  ['PATCH',  '/api/admins/1/revoke',              'super', {}],
  ['PATCH',  '/api/admins/1/profile',             'super', { city: 'probe' }],
  ['GET',    '/api/admins/1/history',             'super'],
  ['GET',    '/api/admins/1/leave',               'super'],
  ['POST',   '/api/admins/1/leave',               'super', { startDate: '2026-09-01', endDate: '2026-09-02' }],
  ['GET',    '/api/admins/1/attendance-calendar', 'super'],
  ['GET',    '/api/admins/teaching-today',        'super'],
  ['POST',   '/api/admins/1/regenerate-token',    'super', {}],
  ['GET',    '/api/admins/1/docs',                'super'],
  ['GET',    '/api/admins/1/salary',              'super'],
  ['DELETE', '/api/admins/999999',                'super'],
  // — заявки —
  ['GET',    '/api/leads',                        'admin'],
  ['GET',    '/api/leads/stats',                  'admin'],
  ['GET',    '/api/leads/1',                      'admin'],
  ['POST',   '/api/leads/admin',                  'admin', { child_name: 'Probe', phone: '0501234567' }],
  ['PATCH',  '/api/leads/999999',                 'admin', { notes: 'probe' }],
  ['DELETE', '/api/leads/999999',                 'super'],
  ['POST',   '/api/leads/import',                 'admin', { rows: [] }],
  // — клиенты —
  ['GET',    '/api/clients',                      'any'],
  ['POST',   '/api/clients',                      'admin', { name: 'Probe client' }],
  ['PATCH',  '/api/clients/999999',               'admin', { notes: 'probe' }],
  ['DELETE', '/api/clients/999999',               'super'],
  ['POST',   '/api/clients/import',               'admin', { rows: [] }],
  // — деньги —
  ['GET',    '/api/payments',                     'admin'],
  ['POST',   '/api/payments',                     'admin', { clientId: 1, amount: 1 }],
  ['DELETE', '/api/payments/999999',              'admin'],
  ['GET',    '/api/monthly-payments',             'admin'],
  ['GET',    '/api/monthly-payments/2099-01',     'admin'],
  ['POST',   '/api/monthly-payments/2099-01',     'admin', { records: [] }],
  ['PATCH',  '/api/monthly-payments/2099-01/1',   'admin', { status: 'paid' }],
  ['PUT',    '/api/monthly-payments/2099-01/1',   'admin', { paidAmount: 1 }],
  ['DELETE', '/api/monthly-payments/2099-01/1',   'admin'],
  // — посещаемость —
  ['GET',    '/api/attendance',                   'any'],
  ['POST',   '/api/attendance',                   'any', { clientId: 1, date: '2099-01-01', status: 'present' }],
  // — оповещения —
  ['GET',    '/api/alerts',                       'any'],
  // — контент —
  ['PUT',    '/api/content/pricing',              'admin', { data: {} }],
  ['POST',   '/api/courses',                      'admin', { id: 'probe-course', name: 'Probe' }],
  ['PATCH',  '/api/courses/scratch',              'admin', { name: 'Probe' }],
  ['POST',   '/api/courses/scratch/reorder',      'admin', { direction: 'down' }],
  ['DELETE', '/api/courses/probe-course-x',       'super'],
  ['POST',   '/api/articles',                     'admin', { slug: 'probe-a', title: 'P' }],
  ['PATCH',  '/api/articles/999999',              'admin', { title: 'P' }],
  ['DELETE', '/api/articles/999999',              'super'],
  ['POST',   '/api/reviews',                      'admin', { name: 'P', text: 'P' }],
  ['PATCH',  '/api/reviews/999999',               'admin', { text: 'P' }],
  ['DELETE', '/api/reviews/999999',               'super'],
  // — токены уроков —
  ['GET',    '/api/lesson-tokens',                'admin'],
  ['POST',   '/api/lesson-tokens',                'admin', { studentName: 'Probe' }],
  ['PATCH',  '/api/lesson-tokens/999999',         'admin', { active: false }],
  ['DELETE', '/api/lesson-tokens/999999',         'admin'],
];

const send = (method, url, token, body) => req(method, url, { token, body });
const denied = s => s === 401 || s === 403;

(async () => {
  // ── 2.1 Ни один админский эндпоинт не отвечает без токена ────────────────
  group('2.1 Доступ без токена');
  for (const [method, url, access, body] of ENDPOINTS) {
    if (access === 'public') continue;
    const r = await send(method, url, undefined, body);
    check(`${method} ${url} без токена отклонён`, denied(r.status),
      `получен ${r.status}`, 'blocker');
  }

  // ── 2.2 Мусорный и отозванный токены ─────────────────────────────────────
  group('2.2 Недействительные токены');
  for (const [method, url, access, body] of ENDPOINTS) {
    if (access === 'public') continue;
    const g = await send(method, url, GARBAGE, body);
    check(`${method} ${url} — мусорный токен отклонён`, denied(g.status), `получен ${g.status}`, 'blocker');
    const rv = await send(method, url, REVOKED, body);
    check(`${method} ${url} — отозванный токен отклонён`, denied(rv.status), `получен ${rv.status}`, 'blocker');
  }

  // ── 2.3 Преподаватель не выходит за пределы своей зоны ────────────────────
  group('2.3 Ограничения преподавателя');
  for (const [method, url, access, body] of ENDPOINTS) {
    if (access === 'any' || access === 'public') continue;
    const r = await send(method, url, TEACHER, body);
    check(`${method} ${url} — преподаватель отклонён`, denied(r.status), `получен ${r.status}`, 'blocker');
  }
  // Разрешённое преподавателю должно работать
  for (const [method, url, access, body] of ENDPOINTS) {
    if (access !== 'any') continue;
    const r = await send(method, url, TEACHER, body);
    check(`${method} ${url} — преподавателю доступно`, !denied(r.status), `получен ${r.status}`, 'high');
  }
  // Преподаватель не должен менять клиентов, даже читая их
  const tPatch = await send('PATCH', '/api/clients/1', TEACHER, { notes: 'teacher probe' });
  check('Преподаватель не может изменить клиента', denied(tPatch.status), `получен ${tPatch.status}`, 'blocker');

  // ── 2.4 Администратор и менеджер не дотягиваются до суперадминских ────────
  group('2.4 Эскалация привилегий');
  for (const [method, url, access, body] of ENDPOINTS) {
    if (access !== 'super') continue;
    for (const [label, tok] of [['администратор', ADMIN], ['менеджер', MANAGER]]) {
      const r = await send(method, url, tok, body);
      check(`${method} ${url} — ${label} отклонён`, denied(r.status), `получен ${r.status}`, 'blocker');
    }
  }
  // Роль superadmin нельзя выдать через API
  const esc1 = await post('/api/admins', { name: 'Escalate', role: 'superadmin' }, { token: SUPER });
  check('Нельзя создать сотрудника с ролью superadmin', esc1.status === 400,
    `получен ${esc1.status} ${esc1.text.slice(0, 120)}`, 'blocker');

  // ── 2.5 Утечки чувствительных данных ─────────────────────────────────────
  group('2.5 Утечки данных');
  const teachers = await get('/api/teachers', { token: ADMIN });
  check('GET /api/teachers не отдаёт токены', teachers.status === 200 && !/"token"/.test(teachers.text),
    teachers.text.slice(0, 200), 'blocker');
  const meAdmin = await get('/api/me', { token: ADMIN });
  check('GET /api/me не отдаёт токен', !/"token"/.test(meAdmin.text), meAdmin.text.slice(0, 200), 'high');
  const admListAsAdmin = await get('/api/admins', { token: ADMIN });
  check('Список сотрудников с токенами закрыт от администратора', denied(admListAsAdmin.status),
    `получен ${admListAsAdmin.status}`, 'blocker');
  // Публичные эндпоинты не должны отдавать неопубликованное
  const pubCourses = await get('/api/courses');
  check('GET /api/courses публично отвечает', pubCourses.status === 200, `получен ${pubCourses.status}`, 'info');
  const pubAll = await get('/api/courses?all=1');
  check('GET /api/courses?all=1 без токена не отдаёт скрытые курсы',
    pubAll.status !== 200 || !(pubAll.json?.courses || []).some(c => c.active === 0 || c.active === false),
    'неактивные курсы видны без токена', 'medium');

  // ── 2.6 Обход пути в файлах сотрудников ──────────────────────────────────
  group('2.6 Обход пути');
  for (const evil of ['..%2f..%2f..%2fpackage.json', '..%5c..%5c..%5cpackage.json', '%2e%2e%2f%2e%2e%2fserver%2fdb.js']) {
    const r = await get(`/api/admins/1/docs/${evil}`, { token: SUPER });
    check(`Скачивание вне каталога заблокировано: ${evil}`,
      r.status === 400 || r.status === 404,
      `получен ${r.status}, тело: ${r.text.slice(0, 120)}`, 'blocker');
  }
  const upEvil = await post('/api/admins/1/docs', { name: '../../evil.txt', data: Buffer.from('x').toString('base64') }, { token: SUPER });
  // Точки в имени безопасны — важно, что разделители пути вырезаны и файл
  // не может лечь за пределами каталога сотрудника.
  check('Загрузка файла с обходом пути обезврежена',
    upEvil.status !== 200 || !/[\/\\]/.test(upEvil.json?.name || ''),
    `имя после очистки: ${upEvil.json?.name}`, 'high');

  // ── 2.7 Инъекции и XSS ───────────────────────────────────────────────────
  group('2.7 Инъекции');
  const sqlName = "Robert'); DROP TABLE clients;--";
  const inj = await post('/api/clients', { name: sqlName, phone: '0501112233' }, { token: ADMIN });
  const stillThere = await get('/api/clients', { token: ADMIN });
  check('SQL-инъекция в имени клиента не выполняется', stillThere.status === 200 && Array.isArray(stillThere.json?.clients),
    `таблица clients после инъекции: ${stillThere.status}`, 'blocker');
  if (inj.json?.client?.id) await del(`/api/clients/${inj.json.client.id}`, { token: SUPER });

  const xss = '<img src=x onerror=alert(1)>';
  const xssLead = await post('/api/leads/admin', { child_name: 'XSS' + xss, phone: '0501112244' }, { token: ADMIN });
  check('Угловые скобки вырезаются при сохранении заявки',
    xssLead.status === 201 && !/[<>]/.test(xssLead.json?.lead?.child_name || ''),
    `сохранено: ${xssLead.json?.lead?.child_name}`, 'high');
  if (xssLead.json?.lead?.id) await del(`/api/leads/${xssLead.json.lead.id}`, { token: SUPER });

  // Поля, которые НЕ проходят через sanitize — статья хранит HTML намеренно
  const artXss = await post('/api/articles', {
    slug: 'probe-xss-' + Date.now(), title: 'Probe', content: '<script>alert(1)</script>',
  }, { token: ADMIN });
  check('Статья сохраняет HTML как есть (ожидаемо — редактор статей)',
    artXss.status === 201 || artXss.status === 200, `получен ${artXss.status}`, 'info');
  if (artXss.json?.article?.id) await del(`/api/articles/${artXss.json.article.id}`, { token: SUPER });

  // ── 2.8 Заголовки безопасности и CORS ────────────────────────────────────
  group('2.8 Заголовки и CORS');
  const h = await get('/admin.html');
  check('Заголовок X-Content-Type-Options выставлен', h.headers.get('x-content-type-options') === 'nosniff',
    String(h.headers.get('x-content-type-options')), 'medium');
  check('Content-Security-Policy присутствует', !!h.headers.get('content-security-policy'), '', 'medium');
  check('X-Frame-Options или frame-ancestors защищают от кликджекинга',
    !!h.headers.get('x-frame-options') || /frame-ancestors/.test(h.headers.get('content-security-policy') || ''),
    `x-frame-options=${h.headers.get('x-frame-options')}`, 'medium');
  const corsEvil = await get('/api/leads', { token: ADMIN, headers: { Origin: 'https://evil.example.com' } });
  check('CORS не отражает произвольный источник',
    corsEvil.headers.get('access-control-allow-origin') !== 'https://evil.example.com',
    `allow-origin=${corsEvil.headers.get('access-control-allow-origin')}`, 'high');

  // ── 2.9 Ограничение частоты запросов ─────────────────────────────────────
  group('2.9 Ограничение частоты');
  let limited = false, sent = 0;
  for (let i = 0; i < 25; i++) {
    const r = await post('/api/leads', { child_name: 'RateProbe', phone: '0509998877', age: 10 });
    sent++;
    if (r.status === 429) { limited = true; break; }
  }
  check('Публичная форма заявки ограничена по частоте', limited,
    `после ${sent} запросов лимит не сработал`, 'high');

  summary('ФАЗА 2 — безопасность');
  saveReport(path.join(__dirname, 'report-phase2.json'));
})();
