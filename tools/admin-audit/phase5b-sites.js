'use strict';
/** ФАЗА 5б — контентные вкладки на всех 9 сайтах из переключателя. */

const { req, check, eq, group, summary, saveReport, SUPER, uniq } = require('./lib');
const T = require('./tokens.json');
const path = require('path');

const SITES = [
  ['mycomputer.education',            'http://localhost:3100'],
  ['mycomputer.school',               'http://localhost:3101'],
  ['webdesign.mycomputer.education',  'http://localhost:3102'],
  ['python.mycomputer.education',     'http://localhost:3103'],
  ['minecraft.mycomputer.education',  'http://localhost:3104'],
  ['roblox.mycomputer.education',     'http://localhost:3105'],
  ['frontend.mycomputer.education',   'http://localhost:3106'],
  ['construct.mycomputer.education',  'http://localhost:3107'],
  ['scratch.mycomputer.education',    'http://localhost:3108'],
];

// Реальный источник запроса при переключении сайта — админка живёт на главном домене.
const ADMIN_ORIGIN = 'https://mycomputer.education';

(async () => {
  for (const [name, base] of SITES) {
    group(`5б ${name}`);
    const g = (u, o) => req('GET', u, { ...o, base });
    const p = (u, b, o) => req('POST', u, { ...o, base, body: b });
    const pt = (u, b, o) => req('PATCH', u, { ...o, base, body: b });
    const pu = (u, b, o) => req('PUT', u, { ...o, base, body: b });
    const d = (u, o) => req('DELETE', u, { ...o, base });

    // — вкладка «Курси» —
    const courses = await g('/api/courses?all=1', { token: SUPER });
    check(`[${name}] Курсы читаются`, courses.status === 200 && Array.isArray(courses.json?.courses),
      `получен ${courses.status}`, 'high');

    const cid = 'probe-' + uniq().toLowerCase();
    const made = await p('/api/courses', { id: cid, name: 'ТЕСТ', price: 1000 }, { token: SUPER });
    check(`[${name}] Курс создаётся`, made.status === 201, `получен ${made.status}: ${made.text.slice(0, 120)}`, 'high');
    if (made.status === 201) {
      const upd = await pt(`/api/courses/${cid}`, { price: 2000 }, { token: SUPER });
      eq(`[${name}] Курс редактируется`, upd.status, 200, 'high');
      eq(`[${name}] Новая цена вернулась`, upd.json?.course?.price, 2000, 'high');
      const rm = await d(`/api/courses/${cid}`, { token: SUPER });
      eq(`[${name}] Курс удаляется`, rm.status, 200, 'high');
    }

    // — вкладки «Контент» / «Модулі» / «SEO тексти» —
    const content = await g('/api/content');
    check(`[${name}] Контент читается`, content.status === 200, `получен ${content.status}`, 'high');
    const probeVal = 'значення-' + uniq();
    const putSeo = await pu('/api/content/seo', { data: { probe: probeVal } }, { token: SUPER });
    check(`[${name}] SEO-раздел сохраняется`, putSeo.status === 200, `получен ${putSeo.status}: ${putSeo.text.slice(0, 120)}`, 'high');
    const back = await g('/api/content');
    check(`[${name}] SEO-раздел читается обратно`, JSON.stringify(back.json || {}).includes(probeVal),
      'сохранённое значение не вернулось', 'high');

    for (const section of ['pricing', 'faq', 'modules']) {
      const r = await pu(`/api/content/${section}`, { data: { probe: 1 } }, { token: SUPER });
      check(`[${name}] Раздел «${section}» сохраняется`, r.status === 200, `получен ${r.status}`, 'medium');
    }

    // — вкладка «Статті» —
    const arts = await g('/api/articles?all=1', { token: SUPER });
    check(`[${name}] Статьи читаются`, arts.status === 200, `получен ${arts.status}`, 'high');
    const slug = 'probe-' + uniq().toLowerCase();
    const art = await p('/api/articles', { slug, title: 'ТЕСТ' }, { token: SUPER });
    check(`[${name}] Статья создаётся`, art.status === 201, `получен ${art.status}: ${art.text.slice(0, 120)}`, 'high');
    if (art.json?.article?.id) {
      const au = await pt(`/api/articles/${art.json.article.id}`, { title: 'ТЕСТ 2' }, { token: SUPER });
      eq(`[${name}] Статья редактируется`, au.status, 200, 'high');
      await d(`/api/articles/${art.json.article.id}`, { token: SUPER });
    }

    // — вкладка «Відгуки» —
    const revs = await g('/api/reviews');
    check(`[${name}] Отзывы читаются`, revs.status === 200, `получен ${revs.status}`, 'high');
    const rv = await p('/api/reviews', { name: 'ТЕСТ', text: 'Проба', rating: 5 }, { token: SUPER });
    check(`[${name}] Отзыв создаётся`, rv.status === 201, `получен ${rv.status}: ${rv.text.slice(0, 120)}`, 'high');
    if (rv.json?.review?.id) await d(`/api/reviews/${rv.json.review.id}`, { token: SUPER });

    // — переключатель сайта работает только если чужой домен разрешён по CORS —
    const pre = await req('OPTIONS', '/api/courses', {
      base,
      headers: {
        Origin: ADMIN_ORIGIN,
        'Access-Control-Request-Method': 'PATCH',
        'Access-Control-Request-Headers': 'x-admin-token,content-type',
      },
    });
    const allowOrigin = pre.headers.get('access-control-allow-origin');
    check(`[${name}] Предзапрос CORS из админки разрешён`,
      pre.status < 400 && (allowOrigin === ADMIN_ORIGIN || allowOrigin === '*'),
      `статус ${pre.status}, allow-origin=${allowOrigin} — из админки на главном домене вкладки этого сайта не сохранятся`, 'blocker');
    const allowHdr = (pre.headers.get('access-control-allow-headers') || '').toLowerCase();
    check(`[${name}] Заголовок x-admin-token разрешён в CORS`, allowHdr.includes('x-admin-token'),
      `allow-headers=${allowHdr}`, 'blocker');

    // — работа ведётся только через главный домен; на остальных админка не нужна —
    const adminPage = await g('/admin.html');
    if (name === 'mycomputer.education') {
      check(`[${name}] Страница админки отдаётся`, adminPage.status === 200, `получен ${adminPage.status}`, 'blocker');
    } else {
      check(`[${name}] Путь админки ведёт на главную панель`,
        (adminPage.status === 301 || adminPage.status === 302) &&
        adminPage.headers.get('location') === 'https://mycomputer.education/admin.html',
        `статус ${adminPage.status}, location=${adminPage.headers.get('location')}`, 'high');
    }
  }

  // — единый токен сети: тот же токен должен приниматься каждым сайтом —
  group('5б Единый токен сети');
  for (const [name, base] of SITES) {
    const r = await req('GET', '/api/courses?all=1', { base, token: SUPER });
    check(`[${name}] Принимает общий админский токен`, r.status === 200, `получен ${r.status}`, 'high');
    const bad = await req('POST', '/api/courses', { base, token: 'wrong'.repeat(10), body: { id: 'x', name: 'x' } });
    check(`[${name}] Отклоняет чужой токен`, bad.status === 401 || bad.status === 403, `получен ${bad.status}`, 'blocker');
  }

  summary('ФАЗА 5б — все 9 сайтов');
  saveReport(path.join(__dirname, 'report-phase5b.json'));
})();
