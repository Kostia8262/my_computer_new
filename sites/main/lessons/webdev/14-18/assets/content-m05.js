/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 05 — Node.js + Express · 14–18
   Патчить WEB_LESSONS після завантаження lessons.js

   ВАЖЛИВО: реального Node.js-сервера в браузерній пісочниці немає.
   Усі демо цього модуля або (а) чесно симулюють роботу через фейковий
   термінал з поясненням у теорії, або (б) виконують РЕАЛЬНУ JS-логіку
   маршрутизації/middleware (написану власноруч, без мережі) так, щоб
   побачити механізм Express зсередини.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function patch(id, theory, html, css, js, tasks) {
    const l = WEB_LESSONS.find(x => x.id === id);
    if (!l) return;
    l.theory = theory;
    l.starterCode.html = html;
    l.starterCode.css  = css;
    l.starterCode.js   = js;
    l.tasks = tasks;
  }

  const BASE = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0b1120;color:#e2e8f0;padding:20px}
h2{font-size:18px;font-weight:700;margin-bottom:12px;color:#fff}
h3{font-size:11px;color:#64748b;margin-bottom:8px;letter-spacing:.04em;text-transform:uppercase}
p{font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:8px}
button{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-family:inherit;transition:.2s}
button:hover{border-color:#68a063;color:#8bc34a}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:Consolas,monospace;font-size:12px;color:#7dd3fc}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
input.rx-input{border:1px solid #334155;background:#1e293b;color:#e2e8f0;border-radius:6px;padding:6px 10px;font-size:13px;width:100%;margin-bottom:6px}
.term{background:#000;border:1px solid #334155;border-radius:10px;padding:14px;font-family:Consolas,monospace;font-size:12.5px;color:#8bc34a;min-height:100px;max-height:360px;overflow-y:auto;white-space:pre-wrap;line-height:1.7;margin-top:10px}
.term-prompt{color:#68a063}
.term-ok{color:#4ade80}
.term-err{color:#f87171}
.term-warn{color:#facc15}
.term-dim{color:#64748b}
.term-key{color:#c4b5fd}`;

  const TERM_HTML = `<h2 id="lesson-h2"></h2>
<div class="btn-row" id="btns"></div>
<div class="term" id="out">$ </div>`;

  /* Джерело fakeExpress передається в кожен урок ЯК ТЕКСТ (рядок), бо
     код кожного уроку виконується в ІЗОЛЬОВАНОМУ iframe студента, а не
     в цьому файлі — тож функції не можна "розділити" через замикання,
     їх потрібно буквально вставити рядком у кожен js-приклад. */
  const FAKE_EXPRESS_SRC = `function makeApp() {
  var layers = [];
  return {
    use: function (pathOrFn, fn) {
      if (typeof pathOrFn === 'function') { layers.push({ method: 'ALL', path: null, handler: pathOrFn, isMiddleware: true }); }
      else { layers.push({ method: 'ALL', path: pathOrFn, handler: fn, isMiddleware: true }); }
    },
    get: function (path, handler) { layers.push({ method: 'GET', path: path, handler: handler }); },
    post: function (path, handler) { layers.push({ method: 'POST', path: path, handler: handler }); },
    put: function (path, handler) { layers.push({ method: 'PUT', path: path, handler: handler }); },
    delete: function (path, handler) { layers.push({ method: 'DELETE', path: path, handler: handler }); },
    handle: function (req, onDone) {
      var res = {
        statusCode: 200,
        headers: {},
        status: function (code) { res.statusCode = code; return res; },
        set: function (key, value) { res.headers[key] = value; return res; },
        json: function (body) { onDone(res.statusCode, res.headers, body); },
        send: function (body) { onDone(res.statusCode, res.headers, body); }
      };
      var index = 0;
      function next(err) {
        if (err) { return handleError(err); }
        if (index >= layers.length) { return onDone(404, {}, { error: 'Маршрут не знайдено' }); }
        var layer = layers[index++];
        if (layer.isMiddleware) {
          if (layer.path && req.path.indexOf(layer.path) !== 0) return next();
          return layer.handler(req, res, next);
        }
        if (layer.method !== req.method) return next();
        var params = matchPath(layer.path, req.path);
        if (!params) return next();
        req.params = params;
        try { layer.handler(req, res, next); } catch (err2) { handleError(err2); }
      }
      function handleError(err) {
        var errorLayer = layers.find(function (l) { return l.isErrorHandler; });
        if (errorLayer) errorLayer.handler(err, req, res, next);
        else onDone(500, {}, { error: 'Internal Server Error' });
      }
      next();
    },
    useError: function (fn) { layers.push({ isMiddleware: true, isErrorHandler: true, handler: fn }); }
  };
}

function matchPath(pattern, path) {
  var patternParts = pattern.split('/').filter(Boolean);
  var pathParts = path.split('?')[0].split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  var params = {};
  for (var i = 0; i < patternParts.length; i++) {
    if (patternParts[i].charAt(0) === ':') { params[patternParts[i].slice(1)] = pathParts[i]; }
    else if (patternParts[i] !== pathParts[i]) { return null; }
  }
  return params;
}
`;

  /* ─── 05-01: Node.js: event loop, модулі та npm ──────────────────── */
  patch('05-01',
    { uk:`<h2>Node.js: event loop, модулі та npm</h2>
<p>Node.js — середовище виконання JavaScript ПОЗА браузером: без DOM, зате з доступом до файлової системи, мережі й процесів. Саме на ньому запускаються сервери, написані на JS.</p>
<h3>Модулі: require (CommonJS) vs import (ES Modules)</h3>
<pre>// CommonJS (традиційний Node.js):
const express = require('express');
module.exports = router;

// ES Modules (сучасний, потребує "type": "module" у package.json):
import express from 'express';
export default router;</pre>
<h3>package.json та npm</h3>
<pre>npm init -y                  // створює package.json
npm install express          // додає залежність у node_modules + package.json
npm install -D nodemon       // dev-залежність (лише для розробки)
npm run dev                  // запускає скрипт "dev" із package.json</pre>
<h3>Event Loop — чому Node.js не блокується</h3>
<p>Node.js однопотоковий, але не блокується під час I/O (читання файлів, запити до бази даних, мережа) завдяки Event Loop: важкі I/O-операції віддаються системі (libuv), а колбеки повертаються в чергу й виконуються, коли Call Stack вільний.</p>
<h3>Порядок виконання: синхронний код → мікротаски (Promise) → макротаски (setTimeout)</h3>
<pre>console.log('1');
setTimeout(() => console.log('2 (macrotask)'), 0);
Promise.resolve().then(() => console.log('3 (microtask)'));
console.log('4');
// Реальний порядок виводу: 1, 4, 3, 2 — мікротаски ЗАВЖДИ виконуються
// раніше за макротаски, навіть із затримкою setTimeout(...,0)</pre>`,
      ru:`<h2>Node.js: event loop, модули и npm</h2>
<p>Node.js — среда выполнения JavaScript вне браузера: без DOM, зато с доступом к файловой системе, сети и процессам.</p>
<h3>Модули: require (CommonJS) vs import (ES Modules)</h3>
<pre>// CommonJS:
const express = require('express');
module.exports = router;

// ES Modules (нужен "type": "module" в package.json):
import express from 'express';
export default router;</pre>
<h3>package.json и npm</h3>
<pre>npm init -y
npm install express
npm install -D nodemon
npm run dev</pre>
<h3>Event Loop — почему Node.js не блокируется</h3>
<p>Node.js однопоточен, но не блокируется во время I/O благодаря Event Loop: тяжёлые операции отдаются системе (libuv), а колбеки возвращаются в очередь.</p>
<h3>Порядок выполнения: синхронный код → микротаски (Promise) → макротаски (setTimeout)</h3>
<pre>console.log('1');
setTimeout(() => console.log('2 (macrotask)'), 0);
Promise.resolve().then(() => console.log('3 (microtask)'));
console.log('4');
// Реальный порядок вывода: 1, 4, 3, 2</pre>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Event Loop: реальний порядок виконання';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function runDemo() {
  log('$ node event-loop-demo.js', 'term-prompt');
  console.log('1');
  log('1', 'term-ok');

  setTimeout(function () {
    console.log('2 (macrotask - setTimeout)');
    log('2 (macrotask - setTimeout)', 'term-warn');
  }, 0);

  Promise.resolve().then(function () {
    console.log('3 (microtask - Promise.then)');
    log('3 (microtask - Promise.then)', 'term-key');
  });

  console.log('4');
  log('4', 'term-ok');

  log('// Зверни увагу: порядок виводу вище — 1, 4, а потім (у наступному тіку) 3, 2', 'term-dim');
}

var btns = document.getElementById('btns');
var b1 = document.createElement('button');
b1.textContent = '▶ node event-loop-demo.js';
b1.onclick = runDemo;
btns.appendChild(b1);`,
    [
      { level:'easy',   uk:'Запусти демо й подивись на реальний порядок виконання: спочатку весь синхронний код, потім мікротаски (Promise), і лише потім макротаски (setTimeout).', ru:'Запусти демо и посмотри на реальный порядок выполнения: сначала синхронный код, потом микротаски, потом макротаски.' },
      { level:'medium', uk:'Додай другий <code>setTimeout(..., 100)</code> з власним логом і подивись, чи він виконається ПІСЛЯ чи ДО першого <code>setTimeout(..., 0)</code>.', ru:'Добавь второй setTimeout(..., 100) и проверь порядок относительно первого.' },
      { level:'hard',   uk:'Додай ще один <code>Promise.resolve().then(...)</code> ПІСЛЯ вже існуючого — переконайся, що ОБИДВА мікротаски виконуються РАНІШЕ за <code>setTimeout</code>, і поясни своїми словами, чому черга мікротасків повністю спорожняється перед кожним макротаском.', ru:'Добавь ещё один Promise.then и убедись, что оба микротаска выполняются раньше setTimeout.' },
    ]
  );

  /* ─── 05-02: Express: перший сервер, middleware та routing ───────── */
  patch('05-02',
    { uk:`<h2>Express: перший сервер, middleware та routing</h2>
<p>Express — найпопулярніший фреймворк для створення HTTP-серверів на Node.js. У цій пісочниці немає реального Node.js і мережі, тож нижче показано справжній синтаксис Express, а демо виконує ВЛАСНУ спрощену реалізацію тієї самої логіки маршрутизації — написану на чистому JS, щоб побачити механізм зсередини.</p>
<h3>Реальний синтаксис (поза пісочницею, потребує Node.js)</h3>
<pre>const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  next(); // обовʼязково викликати next(), інакше запит "зависне"
});

app.get('/', (req, res) => {
  res.send('Привіт зі сервера!');
});

app.listen(3000, () => console.log('Сервер запущено на порті 3000'));</pre>
<h3>Middleware — функції, що виконуються ПОСЛІДОВНО для кожного запиту</h3>
<p>Кожен middleware отримує <code>(req, res, next)</code> і вирішує: обробити запит самому, чи передати далі викликом <code>next()</code>. Порядок реєстрації <code>app.use()</code>/<code>app.get()</code> визначає порядок виконання.</p>
<h3>Демо нижче: власний "fakeExpress" — та сама логіка, без мережі</h3>
<p>Функції <code>app.use()</code>, <code>app.get()</code>, <code>next()</code> реалізовані вручну на чистому JS і виконують РЕАЛЬНЕ зіставлення маршруту й ланцюжок middleware — саме так це працює всередині справжнього Express.</p>`,
      ru:`<h2>Express: первый сервер, middleware и routing</h2>
<p>Express — самый популярный фреймворк для создания HTTP-серверов на Node.js. Здесь нет реального Node.js, поэтому ниже — настоящий синтаксис Express, а демо выполняет собственную упрощённую реализацию той же логики маршрутизации.</p>
<h3>Реальный синтаксис (вне песочницы, нужен Node.js)</h3>
<pre>const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('Привет с сервера!');
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));</pre>
<h3>Middleware — функции, выполняющиеся последовательно</h3>
<p>Каждый middleware получает (req, res, next) и решает: обработать запрос самому или передать дальше через next().</p>
<h3>Демо ниже: собственный "fakeExpress" — та же логика, без сети</h3>
<p>Функции app.use(), app.get(), next() реализованы вручную на чистом JS.</p>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'fakeExpress: перший сервер + middleware';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

${FAKE_EXPRESS_SRC}

var app = makeApp();

app.use(function (req, res, next) {
  log('[middleware] ' + req.method + ' ' + req.path, 'term-dim');
  next();
});

app.get('/', function (req, res) {
  res.status(200).send('Привіт зі сервера!');
});

function sendRequest(method, path) {
  log('', '');
  log('→ Запит: ' + method + ' ' + path, 'term-prompt');
  app.handle({ method: method, path: path }, function (status, headers, body) {
    log('← Відповідь [' + status + ']: ' + JSON.stringify(body), status < 400 ? 'term-ok' : 'term-err');
  });
}

var btns = document.getElementById('btns');
var b1 = document.createElement('button');
b1.textContent = 'GET /';
b1.onclick = function () { sendRequest('GET', '/'); };
btns.appendChild(b1);

var b2 = document.createElement('button');
b2.textContent = 'GET /unknown (404)';
b2.onclick = function () { sendRequest('GET', '/unknown'); };
btns.appendChild(b2);`,
    [
      { level:'easy',   uk:'Надішли обидва симульовані запити й подивись, як middleware логує КОЖЕН запит перед тим, як спрацює маршрут (або 404, якщо маршруту немає).', ru:'Отправь оба запроса и посмотри, как middleware логирует каждый запрос перед срабатыванием маршрута.' },
      { level:'medium', uk:'Додай другий маршрут <code>app.get(\'/about\', ...)</code> і кнопку для нього.', ru:'Добавь маршрут app.get(\'/about\', ...) и кнопку для него.' },
      { level:'hard',   uk:'Додай ДРУГИЙ middleware ПІСЛЯ першого, що перевіряє наявність шляху "/" і додає лог "Головна сторінка!" лише для цього шляху (з обовʼязковим викликом <code>next()</code>), і переконайся, що для <code>/about</code> цей другий middleware НЕ логує нічого зайвого.', ru:'Добавь второй middleware, логирующий что-то только для пути "/".' },
    ]
  );

  /* ─── 05-03: Routing GET/POST/PUT/DELETE, параметри та query ─────── */
  patch('05-03',
    { uk:`<h2>Routing: GET, POST, PUT, DELETE, параметри та query</h2>
<h3>Чотири основні HTTP-методи й REST-семантика</h3>
<pre>app.get('/users', (req, res) => { /* отримати список */ });
app.post('/users', (req, res) => { /* створити нового */ });
app.put('/users/:id', (req, res) => { /* оновити існуючого */ });
app.delete('/users/:id', (req, res) => { /* видалити */ });</pre>
<h3>Параметри шляху (:id) — req.params</h3>
<pre>app.get('/users/:id', (req, res) => {
  res.send('Користувач з id = ' + req.params.id);
});
// GET /users/42  →  req.params = { id: '42' }</pre>
<h3>Query-параметри (?key=value) — req.query</h3>
<pre>app.get('/users', (req, res) => {
  const role = req.query.role;      // /users?role=admin → req.query = { role: 'admin' }
  const limit = req.query.limit || 10;
  res.send('Фільтр за роллю: ' + role);
});</pre>
<h3>Кілька параметрів одразу</h3>
<pre>app.get('/users/:userId/posts/:postId', (req, res) => {
  res.send(req.params.userId + ' / ' + req.params.postId);
});</pre>`,
      ru:`<h2>Routing: GET, POST, PUT, DELETE, параметры и query</h2>
<h3>Четыре основных HTTP-метода и REST-семантика</h3>
<pre>app.get('/users', (req, res) => { });
app.post('/users', (req, res) => { });
app.put('/users/:id', (req, res) => { });
app.delete('/users/:id', (req, res) => { });</pre>
<h3>Параметры пути (:id) — req.params</h3>
<pre>app.get('/users/:id', (req, res) => {
  res.send('Пользователь с id = ' + req.params.id);
});
// GET /users/42  →  req.params = { id: '42' }</pre>
<h3>Query-параметры (?key=value) — req.query</h3>
<pre>app.get('/users', (req, res) => {
  const role = req.query.role;
  res.send('Фильтр по роли: ' + role);
});</pre>
<h3>Несколько параметров сразу</h3>
<pre>app.get('/users/:userId/posts/:postId', (req, res) => {
  res.send(req.params.userId + ' / ' + req.params.postId);
});</pre>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Params та Query у fakeExpress';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function parseQuery(path) {
  var q = {};
  var idx = path.indexOf('?');
  if (idx === -1) return q;
  path.slice(idx + 1).split('&').forEach(function (pair) {
    var parts = pair.split('=');
    q[parts[0]] = decodeURIComponent(parts[1] || '');
  });
  return q;
}

${FAKE_EXPRESS_SRC}

var app = makeApp();

app.get('/users/:id', function (req, res) {
  res.status(200).json({ message: 'Користувач з id=' + req.params.id });
});

app.get('/users', function (req, res) {
  var query = parseQuery(req.path);
  res.status(200).json({ role: query.role || 'усі', limit: query.limit || '10' });
});

function sendRequest(method, path) {
  log('', '');
  log('→ Запит: ' + method + ' ' + path, 'term-prompt');
  app.handle({ method: method, path: path, params: {} }, function (status, headers, body) {
    log('← [' + status + ']: ' + JSON.stringify(body), status < 400 ? 'term-ok' : 'term-err');
  });
}

var btns = document.getElementById('btns');
[['GET', '/users/42'], ['GET', '/users?role=admin&limit=5']].forEach(function (pair) {
  var b = document.createElement('button');
  b.textContent = pair[0] + ' ' + pair[1];
  b.onclick = function () { sendRequest(pair[0], pair[1]); };
  btns.appendChild(b);
});`,
    [
      { level:'easy',   uk:'Надішли обидва запити й подивись, як <code>req.params.id</code> і <code>req.query</code> витягуються з різних частин URL.', ru:'Отправь оба запроса и посмотри, как req.params.id и req.query извлекаются из разных частей URL.' },
      { level:'medium', uk:'Додай маршрут <code>app.post(\'/users\', ...)</code>, що просто повертає <code>{ message: \'Користувача створено\' }</code> зі статусом 201, і кнопку <code>POST /users</code>.', ru:'Добавь маршрут app.post(\'/users\', ...) со статусом 201 и кнопку для него.' },
      { level:'hard',   uk:'Додай маршрут із ДВОМА параметрами: <code>app.get(\'/users/:userId/posts/:postId\', ...)</code>, що повертає обидва значення, і кнопку <code>GET /users/7/posts/3</code>.', ru:'Добавь маршрут с двумя параметрами /users/:userId/posts/:postId.' },
    ]
  );

  /* ─── 05-04: Request і Response ───────────────────────────────────── */
  patch('05-04',
    { uk:`<h2>Request і Response: headers, status codes, body</h2>
<h3>Об'єкт Request (req) — усе про вхідний запит</h3>
<pre>app.post('/login', (req, res) => {
  console.log(req.method);        // 'POST'
  console.log(req.headers);       // { 'content-type': 'application/json', ... }
  console.log(req.body);          // розпарсене тіло запиту (потребує body-parser middleware)
});</pre>
<h3>Об'єкт Response (res) — усе про відповідь</h3>
<pre>res.status(201);                          // встановити HTTP статус-код
res.set('X-Custom-Header', 'значення');   // встановити header відповіді
res.json({ ok: true });                   // відповісти JSON (сам встановлює Content-Type)
res.send('текст');                        // відповісти простим текстом/HTML</pre>
<h3>Найважливіші групи статус-кодів</h3>
<pre>2xx — успіх       200 OK, 201 Created, 204 No Content
3xx — перенаправлення  301 Moved, 304 Not Modified
4xx — помилка клієнта  400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
5xx — помилка сервера  500 Internal Server Error, 503 Service Unavailable</pre>
<h3>Ланцюжок методів (method chaining)</h3>
<pre>res.status(404).json({ error: 'Не знайдено' }); // status() повертає res, тому можна одразу викликати .json()</pre>`,
      ru:`<h2>Request и Response: headers, status codes, body</h2>
<h3>Объект Request (req)</h3>
<pre>app.post('/login', (req, res) => {
  console.log(req.method);
  console.log(req.headers);
  console.log(req.body);
});</pre>
<h3>Объект Response (res)</h3>
<pre>res.status(201);
res.set('X-Custom-Header', 'значение');
res.json({ ok: true });
res.send('текст');</pre>
<h3>Важнейшие группы статус-кодов</h3>
<pre>2xx — успех       200 OK, 201 Created, 204 No Content
3xx — перенаправление  301 Moved, 304 Not Modified
4xx — ошибка клиента  400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
5xx — ошибка сервера  500 Internal Server Error, 503 Service Unavailable</pre>
<h3>Цепочка методов (method chaining)</h3>
<pre>res.status(404).json({ error: 'Не найдено' });</pre>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Статус-коди та headers у відповіді';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

${FAKE_EXPRESS_SRC}

var app = makeApp();

app.get('/ok', function (req, res) {
  res.status(200).set('X-Powered-By', 'fakeExpress').json({ message: 'Все добре' });
});

app.post('/created', function (req, res) {
  res.status(201).json({ message: 'Ресурс створено', body: req.body });
});

app.get('/forbidden', function (req, res) {
  res.status(403).json({ error: 'Доступ заборонено' });
});

app.get('/broken', function (req, res) {
  throw new Error('Щось зламалось усередині обробника');
});

app.useError(function (err, req, res, next) {
  log('[error handler] ' + err.message, 'term-warn');
  res.status(500).json({ error: 'Internal Server Error' });
});

function sendRequest(method, path, body) {
  log('', '');
  log('→ ' + method + ' ' + path + (body ? ' body=' + JSON.stringify(body) : ''), 'term-prompt');
  app.handle({ method: method, path: path, body: body || {} }, function (status, headers, respBody) {
    log('← [' + status + '] headers=' + JSON.stringify(headers) + ' body=' + JSON.stringify(respBody), status < 400 ? 'term-ok' : 'term-err');
  });
}

var btns = document.getElementById('btns');
var configs = [
  ['GET', '/ok', null],
  ['POST', '/created', { name: 'Тест' }],
  ['GET', '/forbidden', null],
  ['GET', '/broken', null]
];
configs.forEach(function (c) {
  var b = document.createElement('button');
  b.textContent = c[0] + ' ' + c[1];
  b.onclick = function () { sendRequest(c[0], c[1], c[2]); };
  btns.appendChild(b);
});`,
    [
      { level:'easy',   uk:'Надішли всі чотири запити й подивись на різні статус-коди (200, 201, 403, 500) і те, як 500 обробляється окремим error-handler middleware.', ru:'Отправь все четыре запроса и посмотри на разные статус-коды и обработку 500 ошибки.' },
      { level:'medium', uk:'Додай маршрут <code>GET /notfound</code> зі статусом 404 і власним повідомленням про помилку.', ru:'Добавь маршрут GET /notfound со статусом 404.' },
      { level:'hard',   uk:'Додай у <code>/ok</code> ще один header — <code>res.set(\'X-Response-Time\', \'12ms\')</code> — і переконайся, що ОБИДВА headers показуються в лозі відповіді.', ru:'Добавь ещё один header в /ok и убедись, что оба header видны в логе ответа.' },
    ]
  );

  /* ─── 05-05: Middleware: body-parser, cors, helmet, morgan ───────── */
  patch('05-05',
    { uk:`<h2>Middleware: body-parser, cors, helmet, morgan</h2>
<p>Чотири найпоширеніші middleware в реальних Express-проектах — кожен вирішує одну конкретну проблему.</p>
<h3>express.json() (вбудований body-parser) — розбір JSON-тіла запиту</h3>
<pre>app.use(express.json()); // без цього req.body буде undefined для JSON-запитів</pre>
<h3>cors — дозвіл запитів з інших доменів</h3>
<pre>const cors = require('cors');
app.use(cors({ origin: 'https://mysite.com' })); // без цього браузер блокує крос-доменні fetch-запити</pre>
<h3>helmet — безпечні HTTP-заголовки за замовчуванням</h3>
<pre>const helmet = require('helmet');
app.use(helmet()); // додає X-Content-Type-Options, X-Frame-Options та інші security-заголовки</pre>
<h3>morgan — логування запитів</h3>
<pre>const morgan = require('morgan');
app.use(morgan('dev')); // виводить у консоль: GET /users 200 15ms</pre>
<h3>Порядок middleware має значення</h3>
<p>Middleware виконуються в ТОМУ порядку, у якому зареєстровані через <code>app.use()</code>. <code>express.json()</code> має стояти РАНІШЕ будь-якого маршруту, що читає <code>req.body</code> — інакше тіло запиту ще не буде розпарсене.</p>`,
      ru:`<h2>Middleware: body-parser, cors, helmet, morgan</h2>
<p>Четыре самых распространённых middleware в реальных Express-проектах.</p>
<h3>express.json() — разбор JSON-тела запроса</h3>
<pre>app.use(express.json());</pre>
<h3>cors — разрешение запросов с других доменов</h3>
<pre>const cors = require('cors');
app.use(cors({ origin: 'https://mysite.com' }));</pre>
<h3>helmet — безопасные HTTP-заголовки по умолчанию</h3>
<pre>const helmet = require('helmet');
app.use(helmet());</pre>
<h3>morgan — логирование запросов</h3>
<pre>const morgan = require('morgan');
app.use(morgan('dev'));</pre>
<h3>Порядок middleware имеет значение</h3>
<p>express.json() должен стоять раньше любого маршрута, читающего req.body.</p>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Ланцюжок middleware: morgan + cors + helmet + json';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

${FAKE_EXPRESS_SRC}

var app = makeApp();

function morganLike(req, res, next) {
  log('[morgan] ' + req.method + ' ' + req.path, 'term-dim');
  next();
}

function corsLike(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  log('[cors] додано Access-Control-Allow-Origin: *', 'term-dim');
  next();
}

function helmetLike(req, res, next) {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  log('[helmet] додано security-заголовки', 'term-dim');
  next();
}

function jsonBodyParser(req, res, next) {
  log('[express.json] req.body розпарсено: ' + JSON.stringify(req.body || {}), 'term-dim');
  next();
}

app.use(morganLike);
app.use(corsLike);
app.use(helmetLike);
app.use(jsonBodyParser);

app.post('/login', function (req, res) {
  res.status(200).json({ message: 'Дані отримано', body: req.body });
});

function sendRequest() {
  log('', '');
  log('→ POST /login body={"email":"a@x.com"}', 'term-prompt');
  app.handle({ method: 'POST', path: '/login', body: { email: 'a@x.com' } }, function (status, headers, body) {
    log('← [' + status + '] headers=' + JSON.stringify(headers), 'term-ok');
    log('   body=' + JSON.stringify(body), 'term-ok');
  });
}

var btns = document.getElementById('btns');
var b1 = document.createElement('button');
b1.textContent = 'POST /login';
b1.onclick = sendRequest;
btns.appendChild(b1);`,
    [
      { level:'easy',   uk:'Надішли запит і подивись, як ЧОТИРИ middleware виконуються послідовно одне за одним у ТОМУ порядку, у якому їх зареєстровано через <code>app.use()</code>.', ru:'Отправь запрос и посмотри, как четыре middleware выполняются последовательно в порядке регистрации.' },
      { level:'medium', uk:'Поміняй місцями <code>app.use(jsonBodyParser)</code> і <code>app.use(morganLike)</code> — подивись, як змінюється порядок логів.', ru:'Поменяй местами jsonBodyParser и morganLike — посмотри на изменение порядка логов.' },
      { level:'hard',   uk:'Додай пʼятий middleware — просту перевірку авторизації, що логує "[auth] токен відсутній" і викликає <code>next()</code> ЛИШЕ якщо в <code>req</code> є поле <code>token</code> (додай <code>token: \'abc\'</code> у сам запит для перевірки, що маршрут спрацьовує).', ru:'Добавь пятый middleware — простую проверку авторизации по полю token.' },
    ]
  );

  /* ─── 05-06: REST API дизайн ──────────────────────────────────────── */
  patch('05-06',
    { uk:`<h2>REST API: дизайн, JSON-відповіді та status codes</h2>
<h3>Конвенції іменування REST-маршрутів</h3>
<pre>GET    /api/users        → список усіх користувачів
GET    /api/users/:id    → один користувач за id
POST   /api/users        → створити нового користувача
PUT    /api/users/:id    → повністю замінити користувача
PATCH  /api/users/:id    → частково оновити користувача
DELETE /api/users/:id    → видалити користувача</pre>
<h3>Правило: іменники, множина, без дієслів у шляху</h3>
<pre>❌ GET /getAllUsers
❌ POST /createUser
✅ GET /users
✅ POST /users        // дієслово вже закладено в HTTP-метод POST</pre>
<h3>Консистентна форма JSON-відповіді</h3>
<pre>// Успіх:
{ "data": { "id": 1, "name": "Аліна" } }

// Список:
{ "data": [...], "total": 42, "page": 1 }

// Помилка:
{ "error": { "message": "Користувача не знайдено", "code": "USER_NOT_FOUND" } }</pre>
<h3>Статус-коди відповідно до дії</h3>
<pre>GET успішний    → 200
POST успішний   → 201 Created
DELETE успішний → 204 No Content (тіло відповіді порожнє)
Ресурс не знайдено → 404</pre>`,
      ru:`<h2>REST API: дизайн, JSON-ответы и status codes</h2>
<h3>Конвенции именования REST-маршрутов</h3>
<pre>GET    /api/users        → список пользователей
GET    /api/users/:id    → один пользователь
POST   /api/users        → создать
PUT    /api/users/:id    → полностью заменить
PATCH  /api/users/:id    → частично обновить
DELETE /api/users/:id    → удалить</pre>
<h3>Правило: существительные, множественное число, без глаголов</h3>
<pre>❌ GET /getAllUsers
✅ GET /users
✅ POST /users</pre>
<h3>Консистентная форма JSON-ответа</h3>
<pre>{ "data": { "id": 1, "name": "Алина" } }
{ "data": [...], "total": 42, "page": 1 }
{ "error": { "message": "Пользователь не найден", "code": "USER_NOT_FOUND" } }</pre>
<h3>Статус-коды в зависимости от действия</h3>
<pre>GET успешный    → 200
POST успешный   → 201 Created
DELETE успешный → 204 No Content
Ресурс не найден → 404</pre>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Міні REST API: /users у пам\\'яті';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

${FAKE_EXPRESS_SRC}

var users = [{ id: 1, name: 'Аліна' }, { id: 2, name: 'Марко' }];
var app = makeApp();

app.get('/api/users', function (req, res) {
  res.status(200).json({ data: users, total: users.length });
});

app.get('/api/users/:id', function (req, res) {
  var user = users.find(function (u) { return u.id === Number(req.params.id); });
  if (!user) return res.status(404).json({ error: { message: 'Користувача не знайдено', code: 'USER_NOT_FOUND' } });
  res.status(200).json({ data: user });
});

app.post('/api/users', function (req, res) {
  var newUser = { id: users.length + 1, name: req.body.name || 'Без імені' };
  users.push(newUser);
  res.status(201).json({ data: newUser });
});

app.delete('/api/users/:id', function (req, res) {
  users = users.filter(function (u) { return u.id !== Number(req.params.id); });
  res.status(204).json(null);
});

function sendRequest(method, path, body) {
  log('', '');
  log('→ ' + method + ' ' + path, 'term-prompt');
  app.handle({ method: method, path: path, body: body || {} }, function (status, headers, respBody) {
    log('← [' + status + ']: ' + JSON.stringify(respBody), status < 400 ? 'term-ok' : 'term-err');
  });
}

var btns = document.getElementById('btns');
[
  ['GET', '/api/users', null],
  ['GET', '/api/users/1', null],
  ['GET', '/api/users/99', null],
  ['POST', '/api/users', { name: 'Кіра' }],
  ['DELETE', '/api/users/2', null]
].forEach(function (c) {
  var b = document.createElement('button');
  b.textContent = c[0] + ' ' + c[1];
  b.onclick = function () { sendRequest(c[0], c[1], c[2]); };
  btns.appendChild(b);
});`,
    [
      { level:'easy',   uk:'Спробуй усі п\'ять кнопок по черзі й подивись на різні коректні статус-коди для кожної дії (200/201/204/404).', ru:'Попробуй все пять кнопок по очереди и посмотри на разные статус-коды для каждого действия.' },
      { level:'medium', uk:'Додай маршрут <code>PUT /api/users/:id</code>, що повністю замінює <code>name</code> користувача новим значенням з <code>req.body</code>.', ru:'Добавь маршрут PUT /api/users/:id, полностью заменяющий name.' },
      { level:'hard',   uk:'Додай пагінацію в <code>GET /api/users</code> — читай <code>req.query.page</code> (за замовчуванням 1) і повертай лише перших 1 користувача на "сторінку" разом із полем <code>page</code> у відповіді (потрібно розпарсити query, як в уроці 05-03).', ru:'Добавь пагинацию в GET /api/users с чтением req.query.page.' },
    ]
  );

  /* ─── 05-07: Authentication JWT ───────────────────────────────────── */
  patch('05-07',
    { uk:`<h2>Authentication: JWT tokens — access та refresh</h2>
<p>JWT (JSON Web Token) — компактний підписаний токен, що містить дані користувача (payload) у самому собі, без потреби зберігати сесію на сервері.</p>
<h3>Структура JWT: три частини, розділені крапкою</h3>
<pre>header.payload.signature

// header (закодований у Base64):    { "alg": "HS256", "typ": "JWT" }
// payload (закодований у Base64):   { "userId": 42, "exp": 1735689600 }
// signature: HMAC-SHA256(header + "." + payload, SECRET_KEY)</pre>
<h3>Реальне створення й перевірка (поза пісочницею, бібліотека jsonwebtoken)</h3>
<pre>const jwt = require('jsonwebtoken');

const accessToken = jwt.sign({ userId: 42 }, process.env.JWT_SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign({ userId: 42 }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

// Перевірка при кожному запиті:
const decoded = jwt.verify(token, process.env.JWT_SECRET); // кидає помилку, якщо токен невалідний/протермінований</pre>
<h3>Навіщо ДВА токени — access і refresh</h3>
<p><strong>Access token</strong> — короткоживучий (хвилини), передається з КОЖНИМ запитом. <strong>Refresh token</strong> — довгоживучий (дні/тижні), зберігається безпечніше і використовується ЛИШЕ для отримання нового access token, коли старий протермінувався — так компрометація access token завдає меншої шкоди.</p>
<h3>Демо нижче: спрощена (навчальна!) реалізація</h3>
<p>Використовує <code>btoa</code>/<code>atob</code> для кодування Base64 та просту контрольну суму замість справжнього криптографічного HMAC — це ілюструє СТРУКТУРУ токена, але НЕ є безпечним і не повинно використовуватись у реальному проекті (там — лише бібліотека <code>jsonwebtoken</code> із секретним ключем на сервері).</p>`,
      ru:`<h2>Authentication: JWT tokens — access и refresh</h2>
<p>JWT — компактный подписанный токен, содержащий данные пользователя в самом себе, без хранения сессии на сервере.</p>
<h3>Структура JWT: три части, разделённые точкой</h3>
<pre>header.payload.signature

// header (Base64):    { "alg": "HS256", "typ": "JWT" }
// payload (Base64):   { "userId": 42, "exp": 1735689600 }
// signature: HMAC-SHA256(header + "." + payload, SECRET_KEY)</pre>
<h3>Реальное создание и проверка (вне песочницы, библиотека jsonwebtoken)</h3>
<pre>const jwt = require('jsonwebtoken');

const accessToken = jwt.sign({ userId: 42 }, process.env.JWT_SECRET, { expiresIn: '15m' });
const refreshToken = jwt.sign({ userId: 42 }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

const decoded = jwt.verify(token, process.env.JWT_SECRET);</pre>
<h3>Зачем два токена — access и refresh</h3>
<p>Access token — короткоживущий, передаётся с каждым запросом. Refresh token — долгоживущий, используется только для получения нового access token.</p>
<h3>Демо ниже: упрощённая (учебная!) реализация</h3>
<p>Использует btoa/atob вместо настоящего HMAC — иллюстрирует структуру токена, но НЕ безопасна для реального проекта.</p>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Спрощений JWT (навчальна реалізація)';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function fakeSign(payload, secret, expiresInSeconds) {
  var header = { alg: 'FAKE-HS256', typ: 'JWT' };
  var fullPayload = Object.assign({}, payload, { exp: Date.now() + expiresInSeconds * 1000 });
  var headerB64 = btoa(JSON.stringify(header));
  var payloadB64 = btoa(JSON.stringify(fullPayload));
  var signature = btoa(secret + headerB64 + payloadB64).slice(0, 16);
  return headerB64 + '.' + payloadB64 + '.' + signature;
}

function fakeVerify(token, secret) {
  var parts = token.split('.');
  if (parts.length !== 3) throw new Error('Невалідний формат токена');
  var expectedSignature = btoa(secret + parts[0] + parts[1]).slice(0, 16);
  if (expectedSignature !== parts[2]) throw new Error('Підпис не збігається — токен підроблено або секрет невірний');
  var payload = JSON.parse(atob(parts[1]));
  if (payload.exp < Date.now()) throw new Error('Токен протермінований');
  return payload;
}

var ACCESS_SECRET = 'access-secret-key';
var REFRESH_SECRET = 'refresh-secret-key';

function issueTokens() {
  var access = fakeSign({ userId: 42 }, ACCESS_SECRET, 15 * 60);
  var refresh = fakeSign({ userId: 42 }, REFRESH_SECRET, 7 * 24 * 60 * 60);
  log('Access token: ' + access, 'term-key');
  log('Refresh token: ' + refresh, 'term-key');
  window._lastAccess = access;
  window._lastRefresh = refresh;
}

function verifyAccess() {
  if (!window._lastAccess) { log('Спочатку створи токени', 'term-warn'); return; }
  try {
    var payload = fakeVerify(window._lastAccess, ACCESS_SECRET);
    log('✓ Токен валідний. payload = ' + JSON.stringify(payload), 'term-ok');
  } catch (e) {
    log('✕ ' + e.message, 'term-err');
  }
}

function verifyWithWrongSecret() {
  if (!window._lastAccess) { log('Спочатку створи токени', 'term-warn'); return; }
  try {
    fakeVerify(window._lastAccess, 'невірний-секрет');
    log('✓ Це не мало статись!', 'term-err');
  } catch (e) {
    log('✕ (очікувано) ' + e.message, 'term-warn');
  }
}

var btns = document.getElementById('btns');
[['Створити access + refresh токени', issueTokens], ['Перевірити access token', verifyAccess], ['Перевірити з невірним секретом', verifyWithWrongSecret]].forEach(function (pair) {
  var b = document.createElement('button');
  b.textContent = pair[0];
  b.onclick = pair[1];
  btns.appendChild(b);
});`,
    [
      { level:'easy',   uk:'Створи токени, потім перевір access token — переконайся, що payload з <code>userId</code> коректно розпаковується.', ru:'Создай токены, затем проверь access token — убедись, что payload с userId корректно распаковывается.' },
      { level:'medium', uk:'Створи токени, потім натисни "Перевірити з невірним секретом" і подивись, як перевірка підпису коректно провалюється.', ru:'Создай токены, затем нажми "Проверить с неверным секретом" и посмотри на провал проверки подписи.' },
      { level:'hard',   uk:'Додай кнопку "Створити ПРОТЕРМІНОВАНИЙ токен" — виклич <code>fakeSign({ userId: 42 }, ACCESS_SECRET, -10)</code> (від\'ємний час життя) і перевір його через <code>fakeVerify</code> — переконайся, що спрацьовує саме помилка "Токен протермінований", а не помилка підпису.', ru:'Добавь кнопку создания просроченного токена (отрицательный expiresIn) и проверь, что срабатывает ошибка именно об истечении срока.' },
    ]
  );

  /* ─── 05-08: Multer: завантаження файлів ──────────────────────────── */
  patch('05-08',
    { uk:`<h2>Multer: завантаження файлів</h2>
<p>Multer — middleware для Express, що обробляє <code>multipart/form-data</code> (стандартний формат для завантаження файлів через HTML-форми) і додає розпарсений файл у <code>req.file</code> (або <code>req.files</code> для кількох).</p>
<h3>Реальний синтаксис (поза пісочницею)</h3>
<pre>const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/avatar', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  // { originalname: 'photo.png', mimetype: 'image/png', size: 204800, path: 'uploads/...' }
  res.json({ message: 'Файл завантажено', filename: req.file.filename });
});</pre>
<h3>Обмеження розміру й типу файлу</h3>
<pre>const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // максимум 5 МБ
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Лише зображення!'));
    cb(null, true);
  }
});</pre>
<h3>Демо нижче — реальний File API браузера</h3>
<p>Хоча Multer і сервер Node.js тут недоступні, вибір файлу через <code>&lt;input type="file"&gt;</code> і читання його метаданих (назва, розмір, тип) — СПРАВЖНІЙ, робочий браузерний File API, ідентичний тому, що бачив би <code>req.file</code> на сервері.</p>`,
      ru:`<h2>Multer: загрузка файлов</h2>
<p>Multer — middleware для Express, обрабатывающий multipart/form-data и добавляющий разобранный файл в req.file.</p>
<h3>Реальный синтаксис (вне песочницы)</h3>
<pre>const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/avatar', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  res.json({ message: 'Файл загружен', filename: req.file.filename });
});</pre>
<h3>Ограничения размера и типа файла</h3>
<pre>const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Только изображения!'));
    cb(null, true);
  }
});</pre>
<h3>Демо ниже — реальный File API браузера</h3>
<p>Выбор файла через input type="file" и чтение его метаданных — настоящий, рабочий браузерный File API.</p>` },
    `<h2 id="lesson-h2"></h2>
<input type="file" id="file-input" style="margin-bottom:10px">
<div class="btn-row" id="btns"></div>
<div class="term" id="out">$ Обери файл і натисни "Завантажити" (симуляція upload.single('avatar'))</div>`,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Multer-подібне завантаження файлу';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

var MAX_SIZE = 5 * 1024 * 1024;

function uploadFile() {
  var input = document.getElementById('file-input');
  var file = input.files[0];
  if (!file) { log('req.file = undefined — файл не обрано', 'term-err'); return; }

  log('', '');
  log('→ POST /avatar (multipart/form-data)', 'term-prompt');
  log('[multer] отримано файл: ' + file.name, 'term-dim');

  if (file.size > MAX_SIZE) {
    log('✕ Помилка fileFilter: розмір ' + file.size + ' байт перевищує ліміт ' + MAX_SIZE, 'term-err');
    return;
  }
  if (!file.type.indexOf('image/') === 0 && file.type.indexOf('image/') !== 0) {
    log('✕ Помилка fileFilter: дозволені лише зображення (отримано ' + file.type + ')', 'term-warn');
  }

  var reqFile = {
    originalname: file.name,
    mimetype: file.type || 'невідомо',
    size: file.size
  };

  log('req.file = ' + JSON.stringify(reqFile), 'term-key');
  log('← [201]: {"message":"Файл завантажено","filename":"' + file.name + '"}', 'term-ok');
}

var btns = document.getElementById('btns');
var b1 = document.createElement('button');
b1.textContent = 'Завантажити (upload.single("avatar"))';
b1.onclick = uploadFile;
btns.appendChild(b1);`,
    [
      { level:'easy',   uk:'Обери будь-який файл на своєму комп\'ютері й натисни кнопку — подивись, як браузер реально читає його метадані (назву, тип, розмір), так само як це побачив би <code>req.file</code> на сервері.', ru:'Выбери файл на компьютере и нажми кнопку — посмотри, как браузер реально читает его метаданные.' },
      { level:'medium', uk:'Обери файл більше 5 МБ (наприклад, велике відео) і переконайся, що спрацьовує перевірка ліміту розміру.', ru:'Выбери файл больше 5 МБ и убедись, что срабатывает проверка лимита размера.' },
      { level:'hard',   uk:'Додай другий <code>input type="file" multiple</code> і кнопку "Завантажити кілька файлів" (аналог <code>upload.array(\'photos\', 5)</code>), що обробляє ВСІ обрані файли одразу й виводить масив <code>req.files</code>.', ru:'Добавь второй input с multiple и кнопку для загрузки нескольких файлов (аналог upload.array).' },
    ]
  );

  /* ─── 05-09: Validation Zod/Joi на сервері ─────────────────────────── */
  patch('05-09',
    { uk:`<h2>Validation: Zod або Joi на сервері</h2>
<p>Дані від клієнта НІКОЛИ не можна вважати довіреними — навіть якщо форма на фронтенді валідує (модуль 04-09), зловмисник може надіслати запит напряму, в обхід форми. Сервер повинен валідувати САМОСТІЙНО.</p>
<h3>Реальний синтаксис Zod на сервері (поза пісочницею)</h3>
<pre>const { z } = require('zod');

const createUserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(14).max(120),
  name: z.string().min(2)
});

app.post('/users', (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }
  const validData = result.data; // тепер типізовано й гарантовано валідно
  // ...зберегти в базу
});</pre>
<h3>Middleware-обгортка для валідації (типовий патерн)</h3>
<pre>function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error.flatten() });
    req.body = result.data;
    next();
  };
}

app.post('/users', validate(createUserSchema), (req, res) => { /* req.body вже валідний */ });</pre>
<h3>Zod (JS/TS) vs Joi — коротко</h3>
<p><strong>Zod</strong> популярніший у TypeScript-проектах, бо вміє виводити (infer) TS-тип напряму зі схеми. <strong>Joi</strong> — старіша, теж потужна бібліотека, поширена у проектах, що почались до широкого поширення Zod.</p>`,
      ru:`<h2>Validation: Zod или Joi на сервере</h2>
<p>Данные от клиента никогда нельзя считать доверенными — сервер должен валидировать самостоятельно.</p>
<h3>Реальный синтаксис Zod на сервере (вне песочницы)</h3>
<pre>const { z } = require('zod');

const createUserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(14).max(120),
  name: z.string().min(2)
});

app.post('/users', (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }
  const validData = result.data;
});</pre>
<h3>Middleware-обёртка для валидации</h3>
<pre>function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error.flatten() });
    req.body = result.data;
    next();
  };
}</pre>
<h3>Zod vs Joi — коротко</h3>
<p>Zod популярнее в TypeScript-проектах. Joi — более старая, тоже мощная библиотека.</p>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Серверна валідація (принцип Zod)';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function createUserSchema(data) {
  var errors = {};
  if (!data.email || data.email.indexOf('@') === -1) errors.email = 'Некоректний email';
  if (typeof data.age !== 'number' || data.age < 14 || data.age > 120) errors.age = 'Вік має бути від 14 до 120';
  if (!data.name || data.name.length < 2) errors.name = 'Імʼя має бути мінімум 2 символи';
  return Object.keys(errors).length ? { success: false, errors: errors } : { success: true, data: data };
}

function validate(schemaFn) {
  return function (req, res, next) {
    var result = schemaFn(req.body);
    if (!result.success) return res.status(400).json({ error: result.errors });
    req.body = result.data;
    next();
  };
}

${FAKE_EXPRESS_SRC}

var app = makeApp();

app.post('/users', validate(createUserSchema), function (req, res) {
  res.status(201).json({ data: req.body });
});

function sendRequest(body) {
  log('', '');
  log('→ POST /users body=' + JSON.stringify(body), 'term-prompt');
  app.handle({ method: 'POST', path: '/users', body: body }, function (status, headers, respBody) {
    log('← [' + status + ']: ' + JSON.stringify(respBody), status < 400 ? 'term-ok' : 'term-err');
  });
}

var btns = document.getElementById('btns');
[
  ['Валідні дані', { email: 'a@x.com', age: 16, name: 'Аліна' }],
  ['Некоректний email', { email: 'нема-собаки', age: 16, name: 'Аліна' }],
  ['Занадто малий вік', { email: 'a@x.com', age: 5, name: 'Аліна' }]
].forEach(function (pair) {
  var b = document.createElement('button');
  b.textContent = pair[0];
  b.onclick = function () { sendRequest(pair[1]); };
  btns.appendChild(b);
});`,
    [
      { level:'easy',   uk:'Спробуй усі три кнопки й подивись, як middleware <code>validate()</code> блокує невалідні дані ще ДО того, як вони потрапляють у сам обробник маршруту.', ru:'Попробуй все три кнопки и посмотри, как validate() блокирует невалидные данные до обработчика маршрута.' },
      { level:'medium', uk:'Додай у <code>createUserSchema</code> нову перевірку поля <code>password</code> (мінімум 8 символів) і кнопку із запитом без пароля.', ru:'Добавь проверку поля password (минимум 8 символов) и кнопку с запросом без пароля.' },
      { level:'hard',   uk:'Створи ДРУГУ схему <code>updateUserSchema</code>, де ВСІ поля необов\'язкові (перевіряються, лише якщо передані), і застосуй її до нового маршруту <code>app.put(\'/users/:id\', validate(updateUserSchema), ...)</code>.', ru:'Создай вторую схему updateUserSchema, где все поля необязательны, и примени к PUT /users/:id.' },
    ]
  );

  /* ─── 05-10: Error handling middleware ────────────────────────────── */
  patch('05-10',
    { uk:`<h2>Error handling middleware та кастомні помилки</h2>
<p>Express розпізнає error-handling middleware за КІЛЬКІСТЮ аргументів — функція з ЧОТИРМА параметрами <code>(err, req, res, next)</code> викликається лише при помилці, і має реєструватись ОСТАННЬОЮ, після всіх маршрутів.</p>
<h3>Кастомні класи помилок (той самий принцип, що в модулі 01-08)</h3>
<pre>class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
class NotFoundError extends ApiError {
  constructor(resource) { super(404, resource + ' не знайдено'); }
}</pre>
<h3>Централізований error handler</h3>
<pre>app.get('/users/:id', (req, res, next) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return next(new NotFoundError('Користувача')); // передаємо помилку в next()
  res.json({ data: user });
});

// Реєструється ОСТАННІМ, після всіх маршрутів:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack); // логуємо повний стек для діагностики
  res.status(statusCode).json({ error: { message: err.message } });
});</pre>
<h3>Асинхронні обробники — типова пастка</h3>
<pre>app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchFromDatabase();
    res.json({ data });
  } catch (err) {
    next(err); // ОБОВʼЯЗКОВО try/catch + next(err) для async — інакше Express НЕ спіймає помилку
  }
});</pre>`,
      ru:`<h2>Error handling middleware и кастомные ошибки</h2>
<p>Express распознаёт error-handling middleware по количеству аргументов — функция с ЧЕТЫРЬМЯ параметрами (err, req, res, next) регистрируется последней.</p>
<h3>Кастомные классы ошибок</h3>
<pre>class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
class NotFoundError extends ApiError {
  constructor(resource) { super(404, resource + ' не найден'); }
}</pre>
<h3>Централизованный error handler</h3>
<pre>app.get('/users/:id', (req, res, next) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return next(new NotFoundError('Пользователя'));
  res.json({ data: user });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({ error: { message: err.message } });
});</pre>
<h3>Асинхронные обработчики — типичная ловушка</h3>
<pre>app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchFromDatabase();
    res.json({ data });
  } catch (err) {
    next(err);
  }
});</pre>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Кастомні помилки + централізований error handler';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function ApiError(statusCode, message) {
  var err = new Error(message);
  err.statusCode = statusCode;
  err.name = 'ApiError';
  return err;
}
function NotFoundError(resource) {
  return ApiError(404, resource + ' не знайдено');
}

${FAKE_EXPRESS_SRC}

var users = [{ id: 1, name: 'Аліна' }];
var app = makeApp();

app.get('/users/:id', function (req, res, next) {
  var user = users.find(function (u) { return u.id === Number(req.params.id); });
  if (!user) return next(NotFoundError('Користувача'));
  res.status(200).json({ data: user });
});

app.get('/crash', function (req, res, next) {
  next(ApiError(500, 'Несподівана внутрішня помилка'));
});

app.useError(function (err, req, res, next) {
  log('[error handler] statusCode=' + (err.statusCode || 500) + ', message="' + err.message + '"', 'term-warn');
  res.status(err.statusCode || 500).json({ error: { message: err.message } });
});

function sendRequest(path) {
  log('', '');
  log('→ GET ' + path, 'term-prompt');
  app.handle({ method: 'GET', path: path }, function (status, headers, body) {
    log('← [' + status + ']: ' + JSON.stringify(body), status < 400 ? 'term-ok' : 'term-err');
  });
}

var btns = document.getElementById('btns');
[['GET /users/1', '/users/1'], ['GET /users/999 (404)', '/users/999'], ['GET /crash (500)', '/crash']].forEach(function (pair) {
  var b = document.createElement('button');
  b.textContent = pair[0];
  b.onclick = function () { sendRequest(pair[1]); };
  btns.appendChild(b);
});`,
    [
      { level:'easy',   uk:'Спробуй усі три кнопки й подивись, як РІЗНІ помилки (404 і 500) проходять через ОДИН і той самий централізований error handler.', ru:'Попробуй все три кнопки и посмотри, как разные ошибки проходят через один error handler.' },
      { level:'medium', uk:'Створи новий тип помилки <code>function ValidationError(field) { return ApiError(400, "Некоректне поле: " + field); }</code> і новий маршрут, що її кидає.', ru:'Создай ValidationError(field) и новый маршрут, кидающий эту ошибку.' },
      { level:'hard',   uk:'Розшир <code>useError</code>-обробник так, щоб для <code>statusCode 500</code> у відповідь ДОДАВАВСЯ лог "🚨 Критична помилка, повідомлено команду" (симуляція сповіщення розробників), а для решти кодів — ні.', ru:'Расширь error handler так, чтобы для statusCode 500 добавлялся лог о критической ошибке.' },
    ]
  );

  /* ─── 05-11: Environment variables ────────────────────────────────── */
  patch('05-11',
    { uk:`<h2>Environment variables: dotenv та config</h2>
<p>Секретні дані (паролі бази даних, API-ключі, JWT-секрети) НІКОЛИ не пишуться напряму в коді — вони зберігаються в змінних середовища й читаються через <code>process.env</code>.</p>
<h3>Файл .env (НІКОЛИ не потрапляє в git!)</h3>
<pre># .env
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=супер-секретний-ключ-32-символи
NODE_ENV=development</pre>
<h3>.gitignore — обовʼязково виключити .env</h3>
<pre># .gitignore
.env
node_modules/</pre>
<h3>Реальне використання (поза пісочницею, бібліотека dotenv)</h3>
<pre>require('dotenv').config(); // завантажує .env у process.env

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

app.listen(PORT, () => console.log('Сервер на порті ' + PORT));</pre>
<h3>.env.example — шаблон для інших розробників</h3>
<pre># .env.example (ЦЕЙ файл МОЖНА комітити — без реальних значень)
PORT=3000
DATABASE_URL=
JWT_SECRET=</pre>
<h3>process.env у браузері не існує</h3>
<p><code>process</code> — глобальний обʼєкт Node.js, якого НЕМАЄ в браузері напряму (Vite/Webpack підставляють значення під час збірки через спеціальні плагіни). У демо нижче для навчальних цілей визначено фейковий <code>process.env</code>.</p>`,
      ru:`<h2>Environment variables: dotenv и config</h2>
<p>Секретные данные никогда не пишутся напрямую в коде — они хранятся в переменных среды и читаются через process.env.</p>
<h3>Файл .env (никогда не попадает в git!)</h3>
<pre># .env
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
JWT_SECRET=супер-секретный-ключ-32-символа
NODE_ENV=development</pre>
<h3>.gitignore — обязательно исключить .env</h3>
<pre># .gitignore
.env
node_modules/</pre>
<h3>Реальное использование (вне песочницы, библиотека dotenv)</h3>
<pre>require('dotenv').config();

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

app.listen(PORT, () => console.log('Сервер на порту ' + PORT));</pre>
<h3>.env.example — шаблон для других разработчиков</h3>
<pre># .env.example
PORT=3000
DATABASE_URL=
JWT_SECRET=</pre>
<h3>process.env в браузере не существует</h3>
<p>process — глобальный объект Node.js, которого нет в браузере напрямую. В демо ниже для учебных целей определён фейковый process.env.</p>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Симуляція dotenv + process.env';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

var fakeEnvFile = 'PORT=3000\\nDATABASE_URL=postgresql://user:pass@localhost/mydb\\nJWT_SECRET=навчальний-секрет\\nNODE_ENV=development';

function parseEnv(content) {
  var env = {};
  content.split('\\n').forEach(function (line) {
    var idx = line.indexOf('=');
    if (idx === -1) return;
    env[line.slice(0, idx)] = line.slice(idx + 1);
  });
  return env;
}

function loadDotenv() {
  log('$ require("dotenv").config()', 'term-prompt');
  log('Читаємо .env:', 'term-dim');
  log(fakeEnvFile, 'term-dim');

  var process_env = parseEnv(fakeEnvFile);
  window.process = { env: process_env };

  log('', '');
  log('process.env завантажено:', 'term-ok');
  log(JSON.stringify(process_env, null, 2), 'term-key');
}

function useConfig() {
  if (!window.process) { log('Спочатку виконай dotenv.config()', 'term-warn'); return; }
  var PORT = window.process.env.PORT || 3000;
  log('const PORT = process.env.PORT || 3000; // ' + PORT, 'term-ok');
  log('app.listen(' + PORT + ', () => console.log("Сервер на порті ' + PORT + '"));', 'term-ok');
}

var btns = document.getElementById('btns');
[['Завантажити .env (dotenv.config())', loadDotenv], ['Використати PORT у коді', useConfig]].forEach(function (pair) {
  var b = document.createElement('button');
  b.textContent = pair[0];
  b.onclick = pair[1];
  btns.appendChild(b);
});`,
    [
      { level:'easy',   uk:'Спочатку завантаж .env, потім використай PORT у коді — подивись, як значення переходить із текстового файлу в реальну змінну JS.', ru:'Сначала загрузи .env, затем используй PORT в коде — посмотри, как значение переходит из файла в переменную JS.' },
      { level:'medium', uk:'Додай у <code>fakeEnvFile</code> нову змінну <code>API_KEY=abc123</code> і виведи її значення в новій кнопці через <code>process.env.API_KEY</code>.', ru:'Добавь переменную API_KEY=abc123 и выведи её значение через process.env.API_KEY.' },
      { level:'hard',   uk:'Реалізуй просту перевірку "обовʼязкових" змінних середовища — функцію <code>validateEnv(required)</code>, що перевіряє: чи всі імена зі списку <code>[\'PORT\', \'JWT_SECRET\', \'MISSING_VAR\']</code> присутні в <code>process.env</code>, і виводить помилку з переліком відсутніх.', ru:'Реализуй validateEnv(required), проверяющую наличие обязательных переменных и выводящую ошибку с списком отсутствующих.' },
    ]
  );

  /* ─── 05-12: ФІНАЛ — REST API на Express + JWT ───────────────────── */
  patch('05-12',
    { uk:`<h2>ПРОЕКТ: REST API на Express + JWT</h2>
<p>Фінальний проект модуля — повноцінний (у межах симуляції) REST API для задач (todos) із авторизацією через JWT, що поєднує все вивчене в модулі 05: маршрутизацію, middleware, валідацію, обробку помилок і токени.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ <code>POST /login</code> — видає access token</li>
  <li>✅ Middleware <code>requireAuth</code> — перевіряє токен перед доступом до захищених маршрутів</li>
  <li>✅ <code>GET/POST/DELETE /todos</code> — CRUD, доступний ЛИШЕ з валідним токеном</li>
  <li>✅ Валідація тіла запиту (принцип Zod з 05-09)</li>
  <li>✅ Централізований error handler (принцип з 05-10)</li>
</ul>
<p>Відкрий вкладку JS — там повна структура API, побудована на власному fakeExpress, що виконує РЕАЛЬНУ логіку маршрутизації й middleware.</p>`,
      ru:`<h2>ПРОЕКТ: REST API на Express + JWT</h2>
<p>Финальный проект модуля — полноценный (в рамках симуляции) REST API для задач с авторизацией через JWT.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ POST /login — выдаёт access token</li>
  <li>✅ Middleware requireAuth — проверяет токен перед доступом</li>
  <li>✅ GET/POST/DELETE /todos — CRUD, доступный только с валидным токеном</li>
  <li>✅ Валидация тела запроса</li>
  <li>✅ Централизованный error handler</li>
</ul>` },
    TERM_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'REST API: /todos з JWT-авторизацією';

function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function fakeSign(payload, secret) {
  var headerB64 = btoa(JSON.stringify({ alg: 'FAKE-HS256' }));
  var payloadB64 = btoa(JSON.stringify(payload));
  var signature = btoa(secret + headerB64 + payloadB64).slice(0, 16);
  return headerB64 + '.' + payloadB64 + '.' + signature;
}
function fakeVerify(token, secret) {
  var parts = token.split('.');
  if (parts.length !== 3) throw new Error('Невалідний формат токена');
  var expected = btoa(secret + parts[0] + parts[1]).slice(0, 16);
  if (expected !== parts[2]) throw new Error('Невалідний токен');
  return JSON.parse(atob(parts[1]));
}

var SECRET = 'todos-app-secret';
var todos = [{ id: 1, title: 'Вивчити Express', done: true }, { id: 2, title: 'Здати проект', done: false }];

function ApiError(statusCode, message) {
  var err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function requireAuth(req, res, next) {
  if (!req.token) return next(ApiError(401, 'Токен відсутній'));
  try {
    req.user = fakeVerify(req.token, SECRET);
    next();
  } catch (e) {
    next(ApiError(401, 'Невалідний токен'));
  }
}

function validateTodo(req, res, next) {
  if (!req.body || !req.body.title || req.body.title.length < 2) {
    return next(ApiError(400, 'title обовʼязковий, мінімум 2 символи'));
  }
  next();
}

${FAKE_EXPRESS_SRC}

var app = makeApp();

app.post('/login', function (req, res) {
  var token = fakeSign({ userId: 1 }, SECRET);
  res.status(200).json({ accessToken: token });
});

app.get('/todos', requireAuth, function (req, res) {
  res.status(200).json({ data: todos });
});

app.post('/todos', requireAuth, validateTodo, function (req, res) {
  var newTodo = { id: todos.length + 1, title: req.body.title, done: false };
  todos.push(newTodo);
  res.status(201).json({ data: newTodo });
});

app.delete('/todos/:id', requireAuth, function (req, res) {
  todos = todos.filter(function (t) { return t.id !== Number(req.params.id); });
  res.status(204).json(null);
});

app.useError(function (err, req, res, next) {
  res.status(err.statusCode || 500).json({ error: { message: err.message } });
});

var currentToken = null;

function sendRequest(method, path, body, useToken) {
  log('', '');
  log('→ ' + method + ' ' + path + (useToken === false ? ' (БЕЗ токена)' : ''), 'term-prompt');
  app.handle({ method: method, path: path, body: body || {}, token: useToken === false ? null : currentToken }, function (status, headers, respBody) {
    log('← [' + status + ']: ' + JSON.stringify(respBody), status < 400 ? 'term-ok' : 'term-err');
  });
}

var btns = document.getElementById('btns');
var b1 = document.createElement('button');
b1.textContent = 'POST /login';
b1.onclick = function () {
  app.handle({ method: 'POST', path: '/login', body: {} }, function (status, headers, body) {
    currentToken = body.accessToken;
    log('', '');
    log('→ POST /login', 'term-prompt');
    log('← [' + status + ']: отримано accessToken (збережено для наступних запитів)', 'term-ok');
  });
};
btns.appendChild(b1);

[
  ['GET /todos (з токеном)', function () { sendRequest('GET', '/todos'); }],
  ['GET /todos (БЕЗ токена)', function () { sendRequest('GET', '/todos', null, false); }],
  ['POST /todos {"title":"Нова задача"}', function () { sendRequest('POST', '/todos', { title: 'Нова задача' }); }],
  ['DELETE /todos/1', function () { sendRequest('DELETE', '/todos/1'); }]
].forEach(function (pair) {
  var b = document.createElement('button');
  b.textContent = pair[0];
  b.onclick = pair[1];
  btns.appendChild(b);
});`,
    [
      { level:'easy',   uk:'Спочатку виконай <code>POST /login</code>, щоб отримати токен, потім спробуй <code>GET /todos</code> з токеном і БЕЗ токена — порівняй результати.', ru:'Сначала выполни POST /login, затем попробуй GET /todos с токеном и без — сравни результаты.' },
      { level:'medium', uk:'Спробуй <code>POST /todos</code> з порожнім <code>title</code> (зміни тіло запиту в коді) і переконайся, що спрацьовує <code>validateTodo</code> зі статусом 400.', ru:'Попробуй POST /todos с пустым title и убедись, что срабатывает validateTodo со статусом 400.' },
      { level:'hard',   uk:'Додай новий захищений маршрут <code>PUT /todos/:id/toggle</code>, що перемикає поле <code>done</code> у знайденої задачі (потрібен <code>requireAuth</code>), і кнопку для нього.', ru:'Добавь защищённый маршрут PUT /todos/:id/toggle, переключающий поле done, с requireAuth.' },
    ]
  );

})();
