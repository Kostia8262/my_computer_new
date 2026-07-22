/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 08 — Fetch API та async/await · 10–14
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
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f1f5f9;padding:20px}
h2{font-size:18px;font-weight:700;margin-bottom:12px;color:#fff}
h3{font-size:11px;color:#64748b;margin-bottom:8px;letter-spacing:.04em;text-transform:uppercase}
p{font-size:13px;color:#94a3b8;line-height:1.65;margin-bottom:8px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
button:hover{border-color:#3b82f6;color:#93c5fd}
button:disabled{opacity:.4;cursor:default}
input,select,textarea{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:8px 12px;border-radius:8px;font-size:13px;font-family:inherit;transition:.2s}
input:focus,select:focus,textarea:focus{outline:none;border-color:#3b82f6}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}
pre.out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:12px;font-family:monospace;color:#94a3b8;min-height:40px;white-space:pre-wrap;overflow-x:auto}`;

  /* ──────────────────── Fake API data ──────────────────────── */
  const FAKE_USERS = [
    { id:1, name:'Leanne Graham',  username:'Bret',   email:'Sincere@april.biz',  phone:'1-770-736-0988', city:'Gwenborough' },
    { id:2, name:'Ervin Howell',   username:'Antonette', email:'Shanna@melissa.tv', phone:'010-692-6593', city:'Wisokyburgh' },
    { id:3, name:'Clementine B',   username:'Samantha',  email:'Nathan@yesenia.net', phone:'1-463-123-4447', city:'McKenziehaven' },
    { id:4, name:'Patricia Lebsack',username:'Karianne',email:'Julianne.OConner@kory.org', phone:'493-170-9623', city:'South Elvis' },
    { id:5, name:'Chelsey Dietrich',username:'Kamren',  email:'Lucio_Hettinger@annie.ca', phone:'(254)954-1289', city:'Roscoeview' },
  ];
  const FAKE_POSTS = [
    { userId:1, id:1, title:'sunt aut facere repellat provident', body:'quia et suscipit suscipit recusandae consequuntur...' },
    { userId:1, id:2, title:'qui est esse', body:'est rerum tempore vitae sequi sint nihil...' },
    { userId:2, id:3, title:'ea molestias quasi exercitationem', body:'et iusto sed quo iure voluptatem occaecati...' },
    { userId:2, id:4, title:'eum et est occaecati', body:'ullam et saepe reiciendis voluptatem adipisci...' },
    { userId:3, id:5, title:'nesciunt quas odio',  body:'repudiandae veniam quaerat sunt sed alias...' },
  ];
  const FAKE_WEATHER = {
    kyiv:    { city:'Kyiv',     temp:18, feels_like:16, humidity:72, wind:5.2,  desc:'Хмарно',        icon:'☁️' },
    london:  { city:'London',   temp:12, feels_like:10, humidity:85, wind:7.8,  desc:'Дощ',           icon:'🌧️' },
    berlin:  { city:'Berlin',   temp:15, feels_like:13, humidity:68, wind:4.1,  desc:'Ясно',          icon:'☀️' },
    paris:   { city:'Paris',    temp:17, feels_like:15, humidity:70, wind:3.6,  desc:'Мінлива хмарність', icon:'⛅' },
    new_york:{ city:'New York', temp:22, feels_like:21, humidity:60, wind:6.0,  desc:'Ясно',          icon:'☀️' },
  };

  /* ─── 08-01 ──────────────────────────────────────────────── */
  patch('08-01',
    { uk:`<h2>fetch(): GET, POST, headers, статус-коди</h2>
<p>fetch() — вбудована браузерна функція для HTTP-запитів. Повертає Promise.</p>
<h3>GET запит</h3>
<pre>// Базовий GET:
const response = await fetch('https://api.example.com/users');

// response — об'єкт Response, не самі дані!
console.log(response.status);      // 200
console.log(response.ok);          // true (2xx)
console.log(response.statusText);  // "OK"
const data = await response.json(); // читаємо body</pre>
<h3>POST запит</h3>
<pre>const res = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN',
  },
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});
const created = await res.json();</pre>
<h3>HTTP статус-коди</h3>
<ul>
  <li>200 OK — успіх</li>
  <li>201 Created — ресурс створено (POST)</li>
  <li>400 Bad Request — помилка у запиті</li>
  <li>401 Unauthorized — не авторизовано</li>
  <li>404 Not Found — ресурс не знайдено</li>
  <li>429 Too Many Requests — перевищено ліміт</li>
  <li>500 Internal Server Error — помилка сервера</li>
</ul>
<h3>Важливо: fetch не кидає помилку на 4xx/5xx!</h3>
<pre>const res = await fetch('/bad-url');
res.ok;        // false (наприклад, 404)
res.status;    // 404
// Але Promise НЕ відхилений — треба перевіряти вручну:
if (!res.ok) throw new Error('HTTP ' + res.status);</pre>`,
      ru:`<h2>fetch() основы</h2>
<pre>// GET:
const res = await fetch('/api/users');
console.log(res.status, res.ok);  // 200, true
const data = await res.json();

// POST:
await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name:'Alice' }),
});

// ВАЖНО: fetch не бросает ошибку на 4xx/5xx!
if(!res.ok) throw new Error('HTTP ' + res.status);</pre>
<h3>Статус-коды</h3>
<ul>
  <li>200 OK, 201 Created</li>
  <li>400 Bad Request, 401 Unauthorized</li>
  <li>404 Not Found, 429 Too Many Requests</li>
  <li>500 Internal Server Error</li>
</ul>` },
    `<div class="fetch-lab">
  <h2>🌐 Fetch Lab</h2>

  <!-- Request builder -->
  <div class="fl-section">
    <h3>Request Builder</h3>
    <div class="rl-row">
      <select id="rl-method">
        <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option>
      </select>
      <input id="rl-url" value="/api/users" placeholder="/api/...">
      <button onclick="sendRequest()">▶ Send</button>
    </div>
    <div id="rl-body-wrap" style="display:none;margin-top:6px">
      <textarea id="rl-body" rows="3" placeholder='{"name":"Alice","email":"alice@test.com"}'
        style="width:100%;font-family:monospace;font-size:11px">{"name":"Alice","email":"alice@test.com"}</textarea>
    </div>
    <div class="rl-headers" id="rl-headers">
      <span class="rlh-item">Content-Type: application/json</span>
    </div>
  </div>

  <!-- Response visualizer -->
  <div class="fl-section">
    <h3>Response</h3>
    <div class="rv-row" id="rv-status-row" style="display:none">
      <div class="rv-status" id="rv-status"></div>
      <div class="rv-meta" id="rv-meta"></div>
    </div>
    <div class="rv-tabs" id="rv-tabs" style="display:none">
      <button class="rvt active" onclick="showRvTab('body',this)">Body</button>
      <button class="rvt" onclick="showRvTab('headers',this)">Headers</button>
      <button class="rvt" onclick="showRvTab('timing',this)">Timing</button>
    </div>
    <pre class="out" id="rv-body">Натисни Send →</pre>
    <pre class="out" id="rv-headers" style="display:none"></pre>
    <pre class="out" id="rv-timing" style="display:none"></pre>
  </div>

  <!-- Status codes explorer -->
  <div class="fl-section">
    <h3>HTTP Status Codes — натисни щоб отримати</h3>
    <div class="sc-grid">
      <button onclick="fakeStatus(200)" class="sc-btn sc-2xx">200 OK</button>
      <button onclick="fakeStatus(201)" class="sc-btn sc-2xx">201 Created</button>
      <button onclick="fakeStatus(400)" class="sc-btn sc-4xx">400 Bad Req</button>
      <button onclick="fakeStatus(401)" class="sc-btn sc-4xx">401 Unauth</button>
      <button onclick="fakeStatus(403)" class="sc-btn sc-4xx">403 Forbidden</button>
      <button onclick="fakeStatus(404)" class="sc-btn sc-4xx">404 Not Found</button>
      <button onclick="fakeStatus(429)" class="sc-btn sc-4xx">429 Too Many</button>
      <button onclick="fakeStatus(500)" class="sc-btn sc-5xx">500 Server Err</button>
      <button onclick="fakeStatus(503)" class="sc-btn sc-5xx">503 Unavailable</button>
    </div>
    <pre class="out" id="sc-out">—</pre>
  </div>
</div>`,
    `${BASE}
.fetch-lab{max-width:540px}
.fl-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.fl-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.rl-row{display:flex;gap:5px;flex-wrap:wrap}
.rl-row select{padding:6px 8px;font-size:12px;font-family:monospace}
.rl-row input{flex:1;min-width:140px;padding:6px 10px;font-size:12px;font-family:monospace}
.rl-headers{margin-top:6px;display:flex;flex-wrap:wrap;gap:4px}
.rlh-item{padding:2px 8px;background:#0f172a;border:1px solid #1e293b;border-radius:10px;font-size:10px;font-family:monospace;color:#64748b}

.rv-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap}
.rv-status{padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;font-family:monospace}
.rv-status.s2xx{background:rgba(16,185,129,.15);color:#34d399;border:1px solid rgba(16,185,129,.3)}
.rv-status.s4xx{background:rgba(245,158,11,.15);color:#fbbf24;border:1px solid rgba(245,158,11,.3)}
.rv-status.s5xx{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3)}
.rv-meta{font-size:11px;color:#475569;font-family:monospace}
.rv-tabs{display:flex;gap:4px;margin-bottom:6px}
.rvt{padding:4px 12px;font-size:11px;border-radius:6px}
.rvt.active{background:rgba(59,130,246,.15);border-color:#3b82f6;color:#7dd3fc}

.sc-grid{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.sc-btn{padding:4px 10px;font-size:11px;border-radius:6px;font-family:monospace}
.sc-2xx{background:rgba(16,185,129,.1);color:#34d399;border-color:rgba(16,185,129,.2)}
.sc-4xx{background:rgba(245,158,11,.1);color:#fbbf24;border-color:rgba(245,158,11,.2)}
.sc-5xx{background:rgba(239,68,68,.1);color:#f87171;border-color:rgba(239,68,68,.2)}`,
    `const METHOD_COLOR = { GET:'#34d399', POST:'#7dd3fc', PUT:'#fbbf24', DELETE:'#f87171' };
const FAKE_DB = {
  '/api/users':     { status:200, data: [${JSON.stringify(FAKE_USERS.slice(0,3))}] },
  '/api/users/1':   { status:200, data: ${JSON.stringify(FAKE_USERS[0])} },
  '/api/posts':     { status:200, data: [${JSON.stringify(FAKE_POSTS.slice(0,3))}] },
  '/api/missing':   { status:404, data: { error:'Not Found', message:'Resource does not exist' } },
  '/api/secret':    { status:401, data: { error:'Unauthorized', message:'Token required' } },
};

document.getElementById('rl-method').addEventListener('change', e => {
  const needsBody = ['POST','PUT'].includes(e.target.value);
  document.getElementById('rl-body-wrap').style.display = needsBody ? 'block' : 'none';
  const h = document.getElementById('rl-headers');
  h.innerHTML = needsBody
    ? '<span class="rlh-item">Content-Type: application/json</span><span class="rlh-item">Authorization: Bearer ***</span>'
    : '<span class="rlh-item">Accept: application/json</span>';
});

async function sendRequest() {
  const method = document.getElementById('rl-method').value;
  const url    = document.getElementById('rl-url').value;
  const t0     = performance.now();

  // Reset
  document.getElementById('rv-status-row').style.display='none';
  document.getElementById('rv-tabs').style.display='none';
  document.getElementById('rv-body').textContent = '⏳ Sending request...';
  document.getElementById('rv-headers').textContent = '';
  document.getElementById('rv-timing').textContent = '';

  // Simulate network delay
  await new Promise(r => setTimeout(r, 180 + Math.random()*220));

  const fakeEntry = method === 'GET'
    ? (FAKE_DB[url] || { status:404, data:{ error:'Not Found', path:url } })
    : { status: method==='POST' ? 201 : method==='DELETE' ? 204 : 200,
        data: method==='DELETE' ? null : { id:Math.ceil(Math.random()*1000), ...JSON.parse(document.getElementById('rl-body').value||'{}'), createdAt:new Date().toISOString() } };

  const elapsed = (performance.now() - t0).toFixed(0);
  const ok = fakeEntry.status >= 200 && fakeEntry.status < 300;

  // Status
  const statusEl = document.getElementById('rv-status');
  statusEl.textContent = fakeEntry.status + ' ' + getStatusText(fakeEntry.status);
  statusEl.className = 'rv-status s' + String(fakeEntry.status)[0] + 'xx';
  document.getElementById('rv-meta').textContent = method + ' ' + url + ' · ' + elapsed + 'ms';
  document.getElementById('rv-status-row').style.display = 'flex';
  document.getElementById('rv-tabs').style.display = 'flex';

  document.getElementById('rv-body').textContent =
    fakeEntry.data ? JSON.stringify(fakeEntry.data, null, 2) : '(204 No Content)';
  document.getElementById('rv-headers').textContent =
    'Content-Type: application/json\nX-Request-Id: ' + Math.random().toString(36).slice(2) + '\nX-RateLimit-Remaining: 98\nX-RateLimit-Reset: 3600\nDate: ' + new Date().toUTCString();
  document.getElementById('rv-timing').textContent =
    'DNS lookup:    0ms (cached)\nConnect:       12ms\nSend:          1ms\nWait (TTFB):   ' + (elapsed-15) + 'ms\nReceive:       15ms\n──────────────────\nTotal:         ' + elapsed + 'ms\n\n' + (ok ? '✅ res.ok = true' : '❌ res.ok = false — перевіряй статус!');
}

function showRvTab(tab, btn) {
  document.querySelectorAll('.rvt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  ['body','headers','timing'].forEach(t => {
    document.getElementById('rv-'+t).style.display = t===tab ? 'block' : 'none';
  });
}

function getStatusText(code) {
  const map = {200:'OK',201:'Created',204:'No Content',400:'Bad Request',401:'Unauthorized',403:'Forbidden',404:'Not Found',429:'Too Many Requests',500:'Internal Server Error',503:'Service Unavailable'};
  return map[code] || '';
}

function fakeStatus(code) {
  const advice = {
    200:'✅ res.ok = true. data = await res.json() — читай дані.',
    201:'✅ res.ok = true. Ресурс успішно створено. location header вказує на новий ресурс.',
    400:'❌ res.ok = false. Перевір body запиту — невірний формат або відсутні поля.',
    401:'❌ res.ok = false. Додай Authorization header: "Bearer <token>".',
    403:'❌ res.ok = false. Авторизований, але немає прав на цю дію.',
    404:'❌ res.ok = false. Перевір URL — ресурс не існує.',
    429:'❌ res.ok = false. Зачекай — перевищено ліміт запитів (Rate Limit). Дивись Retry-After header.',
    500:'❌ res.ok = false. Помилка сервера — спробуй пізніше або зверни до підтримки.',
    503:'❌ res.ok = false. Сервер тимчасово недоступний (maintenance). Retry з backoff.',
  };
  const cls = code<300?'2xx':code<500?'4xx':'5xx';
  document.getElementById('sc-out').textContent =
    \`HTTP/1.1 \${code} \${getStatusText(code)}\nres.status: \${code}\nres.ok:     \${code>=200&&code<300}\n\nПорада: \${advice[code]}\n\nif (!res.ok) throw new Error('HTTP ' + res.status);\`;
}`,
    [
      { level:'easy',  uk:'Надішли GET на /api/users — поглянь на статус, body і timing. Потім GET /api/missing — що в res.ok?', ru:'Отправь GET на /api/users — посмотри статус, body, timing. Потом GET /api/missing — что в res.ok?' },
      { level:'easy',  uk:'Натисни всі 9 статус-кодів в Status Explorer. Для яких res.ok = true? Для яких false?', ru:'Нажми все 9 статус-кодов. Для каких res.ok = true? Для каких false?' },
      { level:'medium', uk:'Надішли POST на /api/users з body {"name":"Bob"}. Який статус відповіді? Чим 201 відрізняється від 200?', ru:'Отправь POST /api/users с body {"name":"Bob"}. Какой статус? Чем 201 отличается от 200?' },
      { level:'medium', uk:'Знайди у коді де перевіряється res.ok. Чому fetch не кидає помилку автоматично на 404? Напиши функцію safeFetch(url) яка завжди перевіряє res.ok.', ru:'Найди где проверяется res.ok. Почему fetch не бросает ошибку на 404? Напиши safeFetch(url) с проверкой.' },
      { level:'hard',  uk:'Додай до Request Builder кнопку "+ Header" і поле для довільного заголовку (key: value). Покажи їх у rv-headers секції відповіді.', ru:'Добавь "+ Header" кнопку и поле для произвольного заголовка. Покажи их в rv-headers.' },
      { level:'hard',  uk:'Реалізуй History: кожен запит зберігається у масиві { method, url, status, time }. Показуй останні 5 у списку під лабом.', ru:'Реализуй History: каждый запрос сохраняется в массив. Показывай последние 5 под лабом.' },
      { level:'extra', uk:'Реалізуй автоматичний retry: якщо status 429 або 503 — чекає 1000ms і повторює запит (максимум 3 рази), показуючи лічильник спроб.', ru:'Реализуй retry: при 429/503 — ждет 1000ms и повторяет запрос (макс 3 раза) с счетчиком попыток.' },
      { level:'extra', uk:'Реалізуй fetchQueue(requests, concurrency=2) — виконує масив fetch-запитів паралельно але не більше concurrency одночасно, повертає всі результати.', ru:'Реализуй fetchQueue(requests, concurrency=2) — выполняет массив запросов параллельно но не более concurrency одновременно.' },
    ]
  );

  /* ─── 08-02 ──────────────────────────────────────────────── */
  patch('08-02',
    { uk:`<h2>REST API: що таке і як влаштований</h2>
<p>REST (Representational State Transfer) — архітектурний стиль для API. Сервер зберігає ресурси, клієнт маніпулює ними через HTTP методи.</p>
<h3>Ресурси і endpoint'и</h3>
<pre>// Ресурс: "users"
GET    /api/users          → список всіх
GET    /api/users/1        → один (id=1)
POST   /api/users          → створити
PUT    /api/users/1        → замінити повністю
PATCH  /api/users/1        → оновити частково
DELETE /api/users/1        → видалити

// Вкладені ресурси:
GET    /api/users/1/posts  → пости юзера 1
GET    /api/users/1/posts/3 → пост 3 юзера 1</pre>
<h3>Властивості REST</h3>
<ul>
  <li>Stateless — кожен запит містить всю необхідну інформацію</li>
  <li>Uniform Interface — єдиний інтерфейс для всіх ресурсів</li>
  <li>Client-Server — клієнт і сервер незалежні</li>
</ul>
<h3>Query parameters</h3>
<pre>GET /api/posts?userId=1&_limit=5&_sort=id&_order=desc
// фільтрація + пагінація + сортування</pre>`,
      ru:`<h2>REST API</h2>
<pre>// Ресурс "users":
GET    /api/users      → список
GET    /api/users/1    → один
POST   /api/users      → создать
PUT    /api/users/1    → заменить
PATCH  /api/users/1    → обновить частично
DELETE /api/users/1    → удалить

// Вложенные:
GET /api/users/1/posts

// Query params:
GET /api/posts?userId=1&_limit=5&_sort=id</pre>
<h3>Принципы REST</h3>
<ul>
  <li>Stateless — каждый запрос самодостаточен</li>
  <li>Uniform Interface — единый интерфейс</li>
  <li>Client-Server — клиент и сервер независимы</li>
</ul>` },
    `<div class="rest-lab">
  <h2>🗂 REST Explorer</h2>

  <!-- Resource browser -->
  <div class="re-section">
    <h3>API Resource Browser</h3>
    <div class="re-resource">
      <select id="re-res" onchange="updateEndpoints()">
        <option value="users">users</option>
        <option value="posts">posts</option>
        <option value="comments">comments</option>
      </select>
      <span id="re-id-wrap">
        / <input type="number" id="re-id" placeholder="id" style="width:55px">
      </span>
      <span id="re-sub-wrap">
        / <select id="re-sub" style="width:80px">
          <option value="">—</option>
          <option value="posts">posts</option>
          <option value="albums">albums</option>
        </select>
      </span>
    </div>
    <div class="re-methods" id="re-methods">
      <button class="rem-btn get"   onclick="callREST('GET')"   >GET</button>
      <button class="rem-btn post"  onclick="callREST('POST')"  >POST</button>
      <button class="rem-btn patch" onclick="callREST('PATCH')" >PATCH</button>
      <button class="rem-btn del"   onclick="callREST('DELETE')">DELETE</button>
    </div>
    <div class="re-url" id="re-url">/api/users</div>
    <pre class="out" id="re-out">Обери ресурс і метод →</pre>
  </div>

  <!-- CRUD operations -->
  <div class="re-section">
    <h3>CRUD in-memory demo</h3>
    <div class="crud-form">
      <input id="crud-name"  placeholder="name">
      <input id="crud-email" placeholder="email">
      <button onclick="crudCreate()">POST</button>
      <input id="crud-id" type="number" placeholder="id" style="width:50px">
      <button onclick="crudRead()">GET</button>
      <button onclick="crudUpdate()">PATCH</button>
      <button onclick="crudDelete()">DELETE</button>
    </div>
    <div class="crud-list" id="crud-list"></div>
  </div>
</div>`,
    `${BASE}
.rest-lab{max-width:540px}
.re-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.re-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.re-resource{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px;font-family:monospace;font-size:12px;color:#94a3b8}
.re-resource select{padding:5px 8px;font-size:12px;font-family:monospace}
.re-resource input{padding:5px 6px;font-size:12px}
.re-methods{display:flex;gap:4px;margin-bottom:8px;flex-wrap:wrap}
.rem-btn{padding:5px 12px;font-size:11px;border-radius:6px;font-weight:700}
.rem-btn.get{color:#34d399;border-color:rgba(16,185,129,.3);background:rgba(16,185,129,.08)}
.rem-btn.post{color:#7dd3fc;border-color:rgba(59,130,246,.3);background:rgba(59,130,246,.08)}
.rem-btn.patch{color:#fbbf24;border-color:rgba(245,158,11,.3);background:rgba(245,158,11,.08)}
.rem-btn.del{color:#f87171;border-color:rgba(239,68,68,.3);background:rgba(239,68,68,.08)}
.re-url{font-family:monospace;font-size:11px;color:#475569;margin-bottom:6px;padding:4px 8px;background:#0f172a;border-radius:5px}

.crud-form{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
.crud-form input{flex:1;min-width:80px;padding:6px 8px;font-size:12px}
.crud-form button{padding:6px 10px;font-size:11px;font-family:monospace;font-weight:700}
.crud-list{display:flex;flex-direction:column;gap:5px}
.crud-item{display:flex;align-items:center;gap:8px;padding:7px 10px;background:#0f172a;border-radius:7px;font-size:12px;font-family:monospace;border:1px solid #1e293b;animation:fadeIn .2s}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.ci-id{color:#3b82f6;min-width:24px}.ci-name{flex:1;color:#f1f5f9}.ci-email{color:#64748b;font-size:10px}`,
    `// REST fake API responses
const REST_DATA = {
  users:    { list:${JSON.stringify(FAKE_USERS.slice(0,4))}, nested:['posts','albums'] },
  posts:    { list:${JSON.stringify(FAKE_POSTS.slice(0,4))}, nested:['comments'] },
  comments: { list:[{id:1,postId:1,name:'id labore ex et quam laborum',body:'laudantium enim quasi...',email:'Eliseo@gardner.biz'}], nested:[] },
};

function updateEndpoints() {
  const res = document.getElementById('re-res').value;
  buildUrl();
}
function buildUrl() {
  const res = document.getElementById('re-res').value;
  const id  = document.getElementById('re-id').value;
  const sub = document.getElementById('re-sub').value;
  let url   = '/api/' + res;
  if(id) url += '/' + id;
  if(id && sub) url += '/' + sub;
  document.getElementById('re-url').textContent = url;
  return { url, res, id, sub };
}
['re-res','re-id','re-sub'].forEach(el => document.getElementById(el).addEventListener('input', buildUrl));

async function callREST(method) {
  const { url, res, id, sub } = buildUrl();
  await new Promise(r => setTimeout(r, 150 + Math.random()*200));
  const data = REST_DATA[res] || REST_DATA.users;

  let result, status;
  if(method==='GET') {
    if(sub && id) { result = data.list.filter(x=>x.userId==id||x.postId==id); status=200; }
    else if(id)   { result = data.list.find(x=>x.id==id)||{error:'Not found'}; status=result.error?404:200; }
    else          { result = data.list; status=200; }
  } else if(method==='POST') {
    result = { ...data.list[0], id:data.list.length+1, createdAt:new Date().toISOString() }; status=201;
  } else if(method==='PATCH') {
    result = id ? { ...data.list.find(x=>x.id==id), updatedAt:new Date().toISOString() } : { error:'id required' }; status=id?200:400;
  } else if(method==='DELETE') {
    result = id ? null : { error:'id required' }; status=id?204:400;
  }

  document.getElementById('re-out').textContent =
    method + ' ' + url + ' → ' + status + '\n\n' + (result ? JSON.stringify(result,null,2) : '(No Content)');
}

// In-memory CRUD
let crudStore = [
  { id:1, name:'Alice', email:'alice@test.com' },
  { id:2, name:'Bob',   email:'bob@test.com' },
];
let nextId = 3;

function renderCrud() {
  const list = document.getElementById('crud-list');
  list.innerHTML = crudStore.map(u =>
    \`<div class="crud-item"><span class="ci-id">#\${u.id}</span><span class="ci-name">\${u.name}</span><span class="ci-email">\${u.email}</span></div>\`
  ).join('') || '<div style="font-size:11px;color:#334155;padding:8px">Порожньо</div>';
}
renderCrud();

function crudCreate() {
  const name  = document.getElementById('crud-name').value;
  const email = document.getElementById('crud-email').value;
  if(!name) return alert('Потрібне name');
  crudStore.push({ id:nextId++, name, email });
  renderCrud();
}
function crudRead() {
  const id = parseInt(document.getElementById('crud-id').value);
  const u  = crudStore.find(x=>x.id===id);
  alert(u ? JSON.stringify(u,null,2) : 'Не знайдено (404)');
}
function crudUpdate() {
  const id   = parseInt(document.getElementById('crud-id').value);
  const name = document.getElementById('crud-name').value;
  const idx  = crudStore.findIndex(x=>x.id===id);
  if(idx<0) return alert('Not found');
  if(name) crudStore[idx].name = name;
  renderCrud();
}
function crudDelete() {
  const id = parseInt(document.getElementById('crud-id').value);
  const before = crudStore.length;
  crudStore = crudStore.filter(x=>x.id!==id);
  if(crudStore.length===before) alert('Not found');
  else renderCrud();
}`,
    [
      { level:'easy',  uk:'Обери resource "users" → GET без id (список). Потім вкажи id=2 → GET (один). Яка різниця у відповіді?', ru:'Выбери resource "users" → GET без id (список). Потом id=2 → GET (один). Какая разница?' },
      { level:'easy',  uk:'У CRUD demo — створи 2 нових юзерів (POST). Знайди кожного по id (GET). Оновіть ім\'я першого (PATCH). Видали другого (DELETE).', ru:'В CRUD demo создай 2 юзеров. Найди каждого по id. Обнови имя первого. Удали второго.' },
      { level:'medium', uk:'Пояснити різницю між PUT і PATCH. Коли використовуємо кожен? Чому PATCH краще для часткового оновлення?', ru:'Объясни разницу PUT vs PATCH. Когда используем каждый? Почему PATCH лучше для частичного обновления?' },
      { level:'medium', uk:'Обери "users" → id=1 → sub=posts → GET. Що таке вкладені ресурси? Яка URL виходить?', ru:'Выбери "users" → id=1 → sub=posts → GET. Что такое вложенные ресурсы? Какой URL?' },
      { level:'hard',  uk:'Додай до CRUD сортування: кнопки "Сортувати за name" і "За id". Масив crudStore має перебудовуватись і список оновлюватись.', ru:'Добавь к CRUD сортировку: кнопки "По name" и "По id". Массив должен пересортироваться.' },
      { level:'hard',  uk:'Реалізуй пагінацію для CRUD: показуй 3 елементи на сторінку з кнопками "< Попередня" і "Наступна >".', ru:'Реализуй пагинацию CRUD: 3 элемента на страницу с кнопками "< Пред" и "След >".' },
      { level:'extra', uk:'Реалізуй пошук у CRUD: поле input що фільтрує список по name або email в реальному часі (без кнопки, по input).', ru:'Реализуй поиск в CRUD: input фильтрует список по name/email в реальном времени.' },
      { level:'extra', uk:'Реалізуй undo/redo для CRUD операцій через стек станів (масив snapshots). Кнопки ↩ Undo і ↪ Redo.', ru:'Реализуй undo/redo для CRUD через стек состояний. Кнопки ↩ Undo и ↪ Redo.' },
    ]
  );

  /* ─── 08-03 ──────────────────────────────────────────────── */
  patch('08-03',
    { uk:`<h2>Відкриті API: JSONPlaceholder, OpenWeather, GitHub</h2>
<p>Публічні API дозволяють отримувати реальні дані у навчальних та продакшн проектах.</p>
<h3>JSONPlaceholder</h3>
<pre>// https://jsonplaceholder.typicode.com — безкоштовний fake REST API
const res  = await fetch('https://jsonplaceholder.typicode.com/users');
const users = await res.json(); // масив 10 юзерів</pre>
<h3>OpenWeatherMap</h3>
<pre>// https://api.openweathermap.org — потребує API key (безкоштовний план)
const API_KEY = 'your_key';
const city = 'Kyiv';
const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric&lang=uk\`;
const res = await fetch(url);
const weather = await res.json();
// weather.main.temp, weather.weather[0].description</pre>
<h3>GitHub API</h3>
<pre>// https://api.github.com — без ключа (60 req/год), з ключем (5000 req/год)
const res  = await fetch('https://api.github.com/users/torvalds');
const user = await res.json();
// user.name, user.public_repos, user.avatar_url

// Список репозиторіїв:
const repos = await (await fetch('https://api.github.com/users/torvalds/repos')).json();</pre>
<h3>Загальні правила</h3>
<ul>
  <li>Завжди зберігай API ключ у .env (не у коді!)</li>
  <li>Перевіряй rate limits — скільки запитів на годину</li>
  <li>Читай документацію перед використанням</li>
</ul>`,
      ru:`<h2>Открытые API</h2>
<pre>// JSONPlaceholder (fake, без ключа):
await fetch('https://jsonplaceholder.typicode.com/users');

// OpenWeatherMap (нужен API key):
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=KEY&units=metric';
const weather = await (await fetch(url)).json();

// GitHub API (без ключа 60req/h):
await fetch('https://api.github.com/users/torvalds');
await fetch('https://api.github.com/users/torvalds/repos');</pre>
<ul>
  <li>Ключ в .env — никогда в коде!</li>
  <li>Следи за rate limits</li>
</ul>` },
    `<div class="api-lab">
  <h2>🌍 Open APIs Explorer</h2>

  <!-- JSONPlaceholder -->
  <div class="api-section">
    <h3>JSONPlaceholder (fake REST API)</h3>
    <div class="api-row">
      <select id="jp-resource">
        <option value="users">users (10)</option>
        <option value="posts">posts (100)</option>
        <option value="todos">todos (200)</option>
        <option value="photos">photos (5000)</option>
      </select>
      <input type="number" id="jp-limit" value="3" min="1" max="10" placeholder="_limit" style="width:60px">
      <button onclick="fetchJP()">▶ Fetch</button>
    </div>
    <pre class="out" id="jp-out">—</pre>
  </div>

  <!-- Weather -->
  <div class="api-section">
    <h3>Weather API (симуляція)</h3>
    <div class="api-row">
      <select id="weather-city">
        <option value="kyiv">Kyiv</option>
        <option value="london">London</option>
        <option value="berlin">Berlin</option>
        <option value="paris">Paris</option>
        <option value="new_york">New York</option>
      </select>
      <select id="weather-units">
        <option value="metric">metric (°C)</option>
        <option value="imperial">imperial (°F)</option>
      </select>
      <button onclick="fetchWeather()">▶ Fetch</button>
    </div>
    <div class="weather-card" id="weather-card" style="display:none"></div>
  </div>

  <!-- GitHub -->
  <div class="api-section">
    <h3>GitHub API (симуляція)</h3>
    <div class="api-row">
      <input id="gh-user" value="torvalds" placeholder="GitHub username">
      <button onclick="fetchGH()">▶ Profile</button>
      <button onclick="fetchGHRepos()">▶ Repos</button>
    </div>
    <pre class="out" id="gh-out">—</pre>
  </div>
</div>`,
    `${BASE}
.api-lab{max-width:540px}
.api-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.api-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.api-row{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px;align-items:center}
.api-row select{padding:6px 8px;font-size:12px}
.api-row input{flex:1;min-width:100px;padding:6px 10px;font-size:12px}

.weather-card{background:#0f172a;border-radius:10px;padding:14px;border:1px solid #1e293b;margin-top:6px}
.wc-city{font-size:16px;font-weight:700;color:#f1f5f9;margin-bottom:4px}
.wc-row{display:flex;align-items:center;gap:10px;margin-bottom:6px}
.wc-icon{font-size:32px}
.wc-temp{font-size:28px;font-weight:800;color:#fff}
.wc-desc{font-size:12px;color:#94a3b8}
.wc-details{display:grid;grid-template-columns:1fr 1fr;gap:4px}
.wc-detail{font-size:11px;color:#64748b;font-family:monospace}`,
    `const fakeDelay = ms => new Promise(r => setTimeout(r, ms));
const jp_data = {
  users:  ${JSON.stringify(FAKE_USERS)},
  posts:  ${JSON.stringify(FAKE_POSTS)},
  todos:  [{id:1,title:'delectus aut autem',completed:false},{id:2,title:'quis ut nam facilis',completed:true},{id:3,title:'fugiat veniam minus',completed:false}],
  photos: [{id:1,albumId:1,title:'accusamus beatae ad facilis',url:'https://via.placeholder.com/600/92c952'},{id:2,albumId:1,title:'reprehenderit est deserunt',url:'https://via.placeholder.com/600/771796'}],
};

async function fetchJP() {
  document.getElementById('jp-out').textContent = '⏳ GET https://jsonplaceholder.typicode.com/...';
  await fakeDelay(300);
  const res = jp_data[document.getElementById('jp-resource').value] || [];
  const lim = parseInt(document.getElementById('jp-limit').value)||3;
  const data = res.slice(0,lim);
  document.getElementById('jp-out').textContent =
    '// URL: https://jsonplaceholder.typicode.com/' + document.getElementById('jp-resource').value + '?_limit=' + lim + '\n' +
    '// Status: 200 OK\n' +
    '// Total items: ' + res.length + ', showing: ' + data.length + '\n\n' +
    JSON.stringify(data,null,2);
}

const WEATHER = ${JSON.stringify(FAKE_WEATHER)};
async function fetchWeather() {
  const cityKey = document.getElementById('weather-city').value;
  const units   = document.getElementById('weather-units').value;
  document.getElementById('weather-card').style.display = 'none';
  await fakeDelay(400);

  const w    = WEATHER[cityKey];
  const temp = units==='imperial' ? (w.temp * 9/5 + 32).toFixed(1) : w.temp;
  const unit = units==='metric' ? '°C' : '°F';
  const fl   = units==='imperial' ? (w.feels_like * 9/5 + 32).toFixed(1) : w.feels_like;

  const card = document.getElementById('weather-card');
  card.style.display = 'block';
  card.innerHTML = \`
    <div class="wc-city">\${w.city} \${w.icon}</div>
    <div class="wc-row">
      <div class="wc-icon">\${w.icon}</div>
      <div>
        <div class="wc-temp">\${temp}\${unit}</div>
        <div class="wc-desc">\${w.desc}</div>
      </div>
    </div>
    <div class="wc-details">
      <div class="wc-detail">🌡 Відчувається: \${fl}\${unit}</div>
      <div class="wc-detail">💧 Вологість: \${w.humidity}%</div>
      <div class="wc-detail">💨 Вітер: \${w.wind} m/s</div>
      <div class="wc-detail">📍 Units: \${units}</div>
    </div>
    <div style="font-size:9px;color:#334155;margin-top:8px;font-family:monospace">
      API: https://api.openweathermap.org/data/2.5/weather?q=\${w.city}&appid=YOUR_KEY&units=\${units}</div>\`;
}

const GH_PROFILES = {
  torvalds:  { login:'torvalds', name:'Linus Torvalds', public_repos:7, followers:200841, bio:'Linux kernel creator', avatar_url:'https://avatars.githubusercontent.com/u/1024025?v=4', company:'Linux Foundation' },
  gaearon:   { login:'gaearon', name:'Dan Abramov', public_repos:248, followers:85423, bio:'Working on React at Meta', company:'@Meta', avatar_url:'https://avatars.githubusercontent.com/u/810438?v=4' },
  sindresorhus:{ login:'sindresorhus', name:'Sindre Sorhus', public_repos:1168, followers:47832, bio:'Fulltime open-sourcerer', company:'', avatar_url:'https://avatars.githubusercontent.com/u/170270?v=4' },
};
const GH_REPOS = {
  torvalds: [{name:'linux',stars:177000,lang:'C',desc:'Linux kernel source tree'},{name:'uemacs',stars:2200,lang:'C',desc:'uEmacs/PK text editor'}],
  gaearon:  [{name:'react',stars:225000,lang:'JavaScript',desc:'Library for web UIs'},{name:'redux',stars:60500,lang:'JavaScript',desc:'Predictable state container'}],
  sindresorhus:[{name:'awesome',stars:323000,lang:null,desc:'Awesome lists'},{name:'got',stars:14200,lang:'JavaScript',desc:'HTTP requests library'}],
};

async function fetchGH() {
  const user = document.getElementById('gh-user').value.trim() || 'torvalds';
  document.getElementById('gh-out').textContent = '⏳ GET https://api.github.com/users/' + user;
  await fakeDelay(350);
  const profile = GH_PROFILES[user] || GH_PROFILES.torvalds;
  document.getElementById('gh-out').textContent =
    '// GET https://api.github.com/users/' + user + '\n// X-RateLimit-Remaining: 59/60\n\n' +
    JSON.stringify(profile,null,2);
}

async function fetchGHRepos() {
  const user = document.getElementById('gh-user').value.trim() || 'torvalds';
  document.getElementById('gh-out').textContent = '⏳ GET https://api.github.com/users/' + user + '/repos';
  await fakeDelay(300);
  const repos = GH_REPOS[user] || GH_REPOS.torvalds;
  document.getElementById('gh-out').textContent =
    '// GET https://api.github.com/users/' + user + '/repos?per_page=30&sort=stars\n\n' +
    repos.map(r=>\`⭐ \${r.stars.toLocaleString()} [\${r.lang||'—'}] \${r.name}\n   \${r.desc}\`).join('\n\n');
}`,
    [
      { level:'easy',  uk:'Зроби fetch для users (limit=5) і posts (limit=3). Порівняй структуру відповідей.', ru:'Сделай fetch для users (limit=5) и posts (limit=3). Сравни структуру ответов.' },
      { level:'easy',  uk:'Переглянь погоду в усіх 5 містах в обох одиницях (metric та imperial). Яка температура Лондона у Фаренгейтах?', ru:'Посмотри погоду в 5 городах в обеих единицах. Какая температура Лондона в Фаренгейтах?' },
      { level:'medium', uk:'Зроби fetch профілю і репозиторіїв gaearon і sindresorhus. У кого більше зірок на публічних репо?', ru:'Сделай fetch профиля и репо gaearon и sindresorhus. У кого больше звезд?' },
      { level:'medium', uk:'Чому не можна зберігати API ключ прямо у JS-файлі? Як правильно? Поясни концепцію .env і чому її не комітять у git.', ru:'Почему нельзя хранить API ключ в JS? Как правильно? Объясни .env и почему не коммитим в git.' },
      { level:'hard',  uk:'Додай кнопку "🔄 Refresh Auto" що оновлює погоду для обраного міста кожні 5 секунд (з лічильником оновлень і кнопкою Stop).', ru:'Добавь кнопку "🔄 Auto-Refresh" обновляющую погоду каждые 5 сек. Счетчик + кнопка Stop.' },
      { level:'hard',  uk:'Зроби порівняльну таблицю погоди для 3 міст одночасно — використай Promise.all для паралельного "завантаження".', ru:'Сделай таблицу погоды для 3 городов через Promise.all для параллельного "запроса".' },
      { level:'extra', uk:'Побудуй міні-дашборд: зліва список юзерів (JSONPlaceholder), клік → справа їхні пости. Дві колонки, все у одному layout.', ru:'Построй мини-дашборд: слева список юзеров, клик → справа их посты. Две колонки.' },
      { level:'extra', uk:'Реалізуй API Rate Limiter: клас що дозволяє не більше N запитів на хвилину, чергує їх у черзі і показує лічильник залишку.', ru:'Реализуй API Rate Limiter: класс позволяющий не более N запросов в минуту, с очередью.' },
    ]
  );

  /* ─── 08-04 ──────────────────────────────────────────────── */
  patch('08-04',
    { uk:`<h2>Обробка JSON та помилок мережі</h2>
<h3>JSON: серіалізація і парсинг</h3>
<pre>// Об'єкт → JSON рядок (серіалізація):
const user = { name: 'Alice', age: 14, skills: ['JS', 'CSS'] };
const json = JSON.stringify(user);
// '{"name":"Alice","age":14,"skills":["JS","CSS"]}'

// JSON рядок → об'єкт (парсинг):
const parsed = JSON.parse(json);
parsed.name; // 'Alice'

// Форматований JSON (для читання):
JSON.stringify(user, null, 2);

// Replacer (фільтрувати поля):
JSON.stringify(user, ['name', 'age']); // без skills

// Reviver (трансформувати під час парсингу):
JSON.parse('{"date":"2025-01-15"}', (key, val) =>
  key === 'date' ? new Date(val) : val
);</pre>
<h3>Помилки fetch і їх типи</h3>
<pre>try {
  const res = await fetch(url);

  // 1. Мережева помилка → Promise rejected:
  //    TypeError: Failed to fetch (немає з'єднання)

  // 2. HTTP помилка → res.ok = false:
  if (!res.ok) {
    const error = await res.json(); // читаємо тіло помилки
    throw new Error(error.message || 'HTTP ' + res.status);
  }

  // 3. JSON парсинг → SyntaxError якщо відповідь не JSON:
  const data = await res.json(); // може кинути!

} catch (err) {
  if (err.name === 'TypeError') { /* мережа */ }
  else if (err.name === 'SyntaxError') { /* не JSON */ }
  else { /* HTTP або інша */ }
}</pre>`,
      ru:`<h2>JSON и ошибки</h2>
<pre>// JSON:
JSON.stringify(obj);          // объект → строка
JSON.parse(str);              // строка → объект
JSON.stringify(obj, null, 2); // форматированный

// Типы ошибок fetch:
// 1. TypeError — нет сети (Promise rejected)
// 2. !res.ok — HTTP 4xx/5xx
// 3. SyntaxError — ответ не JSON

try {
  const res = await fetch(url);
  if(!res.ok) throw new Error('HTTP '+res.status);
  const data = await res.json();
} catch(err) {
  if(err.name==='TypeError') { /* сеть */ }
  else if(err.name==='SyntaxError') { /* не JSON */ }
  else { /* HTTP */ }
}</pre>` },
    `<div class="json-lab">
  <h2>🔧 JSON + Error Handling</h2>

  <!-- JSON playground -->
  <div class="jl-section">
    <h3>JSON Playground</h3>
    <div class="jp-cols">
      <div class="jp-col">
        <div class="jpc-label">JavaScript Object</div>
        <textarea id="jp-obj" rows="7" spellcheck="false">{
  "name": "Alice",
  "age": 14,
  "skills": ["JS","CSS"],
  "active": true,
  "score": null
}</textarea>
      </div>
      <div class="jp-actions">
        <button onclick="doStringify()">→ stringify</button>
        <button onclick="doParse()">← parse</button>
        <button onclick="doStringifyFormat()">→ format(2)</button>
      </div>
      <div class="jp-col">
        <div class="jpc-label">JSON String</div>
        <textarea id="jp-json" rows="7" spellcheck="false"></textarea>
      </div>
    </div>
    <pre class="out" id="jp-result">—</pre>
  </div>

  <!-- Error types -->
  <div class="jl-section">
    <h3>Симуляція помилок fetch</h3>
    <div class="err-btns">
      <button onclick="simError('network')">TypeError (No Network)</button>
      <button onclick="simError('http404')">HTTP 404</button>
      <button onclick="simError('http500')">HTTP 500</button>
      <button onclick="simError('nojson')">SyntaxError (not JSON)</button>
      <button onclick="simError('timeout')">Timeout</button>
      <button onclick="simError('ok')">✅ Success</button>
    </div>
    <pre class="out" id="err-out">Обери тип помилки →</pre>
  </div>
</div>`,
    `${BASE}
.json-lab{max-width:540px}
.jl-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.jl-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.jp-cols{display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:center;margin-bottom:8px}
.jp-col{display:flex;flex-direction:column;gap:4px}
.jpc-label{font-size:10px;font-weight:700;color:#475569;text-transform:uppercase}
.jp-cols textarea{width:100%;background:#0f172a;border:1px solid #334155;color:#e2e8f0;font-family:monospace;font-size:10.5px;border-radius:6px;padding:6px;resize:vertical;min-height:90px}
.jp-actions{display:flex;flex-direction:column;gap:4px}
.jp-actions button{padding:5px 8px;font-size:10px;border-radius:5px;white-space:nowrap}
.err-btns{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
.err-btns button{padding:5px 10px;font-size:11px;border-radius:6px}`,
    `function doStringify() {
  try {
    const obj = eval('(' + document.getElementById('jp-obj').value + ')');
    const json = JSON.stringify(obj);
    document.getElementById('jp-json').value = json;
    document.getElementById('jp-result').textContent =
      'JSON.stringify() ✅\nТип: ' + typeof json + '\nДовжина: ' + json.length + ' chars\n\nПримітка: undefined, Function, Symbol — губляться при stringify!';
  } catch(e) { document.getElementById('jp-result').textContent = '❌ ' + e.message; }
}

function doStringifyFormat() {
  try {
    const obj = eval('(' + document.getElementById('jp-obj').value + ')');
    const json = JSON.stringify(obj, null, 2);
    document.getElementById('jp-json').value = json;
    document.getElementById('jp-result').textContent =
      'JSON.stringify(obj, null, 2) — форматований\nДовжина: ' + json.length + ' chars (більше через відступи)';
  } catch(e) { document.getElementById('jp-result').textContent = '❌ ' + e.message; }
}

function doParse() {
  try {
    const str  = document.getElementById('jp-json').value;
    const obj  = JSON.parse(str);
    const keys = Object.keys(obj);
    document.getElementById('jp-obj').value = JSON.stringify(obj, null, 2)
      .replace(/\[/g,'[').replace(/\]/g,']');
    document.getElementById('jp-result').textContent =
      'JSON.parse() ✅\nТип результату: ' + typeof obj + '\nКлючі: ' + keys.join(', ') +
      '\nJSON.parse() → повертає: ' + obj.constructor.name;
  } catch(e) {
    document.getElementById('jp-result').textContent = '❌ SyntaxError: ' + e.message + '\n\nJSON вимагає:\n· Ключі у подвійних лапках\n· Немає trailing comma\n· Немає undefined, Function';
  }
}

const fakeDelay = ms => new Promise(r => setTimeout(r, ms));

async function simError(type) {
  const out = document.getElementById('err-out');
  out.textContent = '⏳ Виконується fetch...';
  await fakeDelay(300);

  const scenarios = {
    network: {
      code: \`try {
  const res = await fetch('/api/data');
} catch(err) {
  // err.name === 'TypeError'
  // err.message === 'Failed to fetch'
}\`,
      result: '❌ TypeError: Failed to fetch\nerr.name:    "TypeError"\nerr.message: "Failed to fetch"\n\nПричина: відсутнє мережеве з\'єднання,\n         DNS не вирішується,\n         або сервер недоступний.\n\nДія: показати "Перевірте з\'єднання"',
    },
    http404: {
      code: \`const res = await fetch('/api/users/99999');
if(!res.ok) throw new Error('HTTP ' + res.status);\`,
      result: '⚠ res.ok = false\nres.status = 404\n\nJSONBody: { "error": "User not found" }\n\n❌ Promise НЕ rejected автоматично!\n→ Треба перевіряти res.ok вручну\n\nДія: navigate to 404 page',
    },
    http500: {
      code: \`const res = await fetch('/api/data');
if(!res.ok) {
  const err = await res.json(); // читаємо тіло помилки
  throw new ApiError(err.message, res.status);
}\`,
      result: '⚠ res.ok = false\nres.status = 500\n\nJSONBody: { "error": "Internal Server Error", "trace":"..." }\n\nДія: showBanner("Сервер тимчасово недоступний")\n     retry з backoff',
    },
    nojson: {
      code: \`const res = await fetch('/api/html-page');
// res.ok = true, але відповідь — HTML, не JSON!
const data = await res.json(); // ← кидає SyntaxError!\`,
      result: '❌ SyntaxError: Unexpected token < in JSON at position 0\n\nerr.name: "SyntaxError"\n\nПричина: сервер повернув HTML (наприклад, сторінку 503),\n         а ми очікували JSON.\n\nДія:\ntry { const data = await res.json(); }\ncatch(e) {\n  if(e instanceof SyntaxError) showError("Unexpected response");\n}',
    },
    timeout: {
      code: \`const ctrl = new AbortController();
const timeout = setTimeout(() => ctrl.abort(), 5000);
try {
  const res = await fetch('/api/slow', { signal: ctrl.signal });
} catch(err) {
  if(err.name === 'AbortError') { /* timeout! */ }
} finally { clearTimeout(timeout); }\`,
      result: '❌ AbortError: The operation was aborted\nerr.name: "AbortError"\n\nПричина: fetch() скасовано через AbortController\n(детальніше у уроці 08-06)\n\nДія: showToast("Запит перервано — сервер відповів надто повільно")',
    },
    ok: {
      code: \`const res  = await fetch('/api/users/1');
if(!res.ok) throw new Error('HTTP ' + res.status);
const user = await res.json();\`,
      result: '✅ Promise fulfilled\nres.status: 200\nres.ok:     true\n\nuser = {\n  "id": 1,\n  "name": "Leanne Graham",\n  "email": "Sincere@april.biz"\n}\n\nВсе добре! Дані отримано.',
    },
  };
  const sc = scenarios[type];
  out.textContent = 'Код:\n' + sc.code + '\n\nРезультат:\n' + sc.result;
}`,
    [
      { level:'easy',  uk:'Вставь у "JavaScript Object" об\'єкт зі своїми даними (ім\'я, вік, хобі). Натисни "stringify" і "format(2)". Яка різниця?', ru:'Вставь в поле объект со своими данными. Нажми "stringify" и "format(2)". Какая разница?' },
      { level:'easy',  uk:'Спробуй JSON.parse з навмисною помилкою: видали одну лапку у JSON полі. Яке повідомлення SyntaxError?', ru:'Попробуй JSON.parse с намеренной ошибкой: удали одну кавычку в JSON. Какое SyntaxError?' },
      { level:'medium', uk:'Натисни всі 6 типів помилок і прочитай кожен результат. Складіть таблицю: тип помилки → err.name → дія.', ru:'Нажми все 6 типов ошибок. Составь таблицу: тип ошибки → err.name → действие.' },
      { level:'medium', uk:'Знайди в коді де перевіряється err.name === "TypeError". Напиши функцію handleFetchError(err) що обробляє всі 3 типи по-різному.', ru:'Напиши функцию handleFetchError(err) обрабатывающую все 3 типа по-разному.' },
      { level:'hard',  uk:'Напиши safeFetch(url, options) — обгортка що: 1) перевіряє res.ok, 2) ловить SyntaxError при .json(), 3) повертає [data, null] або [null, error].', ru:'Напиши safeFetch(url, options): проверяет res.ok, ловит SyntaxError, возвращает [data, null] или [null, error].' },
      { level:'hard',  uk:'Реалізуй JSON.safeStringify(obj) — як JSON.stringify але: замість кидання помилки на circular refs повертає "[Circular]", Function → "[Function]".', ru:'Реализуй JSON.safeStringify(obj): circular refs → "[Circular]", Function → "[Function]".' },
      { level:'extra', uk:'Реалізуй parseWithReviver(json) де дати (рядки типу "2025-01-15") автоматично перетворюються на Date об\'єкти. Покажи що instanceof Date = true.', ru:'Реализуй parseWithReviver(json) где строки-даты автоматически становятся Date. Проверь instanceof.' },
      { level:'extra', uk:'Побудуй "JSON Schema validator" — функцію що перевіряє що об\'єкт відповідає схемі { name:string, age:number, email:string } і повертає список помилок.', ru:'Напиши JSON Schema validator: проверяет {name:string,age:number,email:string}, возвращает список ошибок.' },
    ]
  );

  /* ─── 08-05 ──────────────────────────────────────────────── */
  patch('08-05',
    { uk:`<h2>CORS: що таке і як обходити</h2>
<p>CORS (Cross-Origin Resource Sharing) — механізм безпеки браузера що обмежує запити між різними доменами.</p>
<h3>Що таке origin?</h3>
<pre>// Origin = protocol + host + port:
https://myapp.com:443   ← один origin
https://api.myapp.com   ← РІЗНИЙ (різний host!)
http://myapp.com        ← РІЗНИЙ (різний protocol!)
https://myapp.com:8080  ← РІЗНИЙ (різний port!)</pre>
<h3>Як виникає CORS помилка</h3>
<pre>// Браузер на https://myapp.com робить запит до:
fetch('https://other-api.com/data')

// Браузер надсилає Preflight (OPTIONS):
OPTIONS /data HTTP/1.1
Origin: https://myapp.com

// Якщо сервер НЕ повертає правильні заголовки:
// ❌ CORS error: blocked by CORS policy</pre>
<h3>Серверні CORS заголовки</h3>
<pre>// Сервер має відповісти:
Access-Control-Allow-Origin: *          // або конкретний origin
Access-Control-Allow-Methods: GET,POST,PUT
Access-Control-Allow-Headers: Content-Type,Authorization</pre>
<h3>Рішення для розробника</h3>
<ul>
  <li>Попросити backend додати CORS заголовки</li>
  <li>Proxy у Vite/Webpack (vite.config.js → server.proxy)</li>
  <li>CORS proxy сервер (тільки для dev!)</li>
  <li>Same-origin deployment (фронт і API на одному домені)</li>
</ul>`,
      ru:`<h2>CORS</h2>
<p>CORS — браузерный механизм безопасности блокирующий запросы между разными origins.</p>
<pre>// Origin = protocol + host + port
// Сервер должен вернуть:
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,POST,PUT
Access-Control-Allow-Headers: Content-Type</pre>
<h3>Решения</h3>
<ul>
  <li>Backend добавляет CORS заголовки</li>
  <li>Proxy в Vite: vite.config.js → server.proxy</li>
  <li>Same-origin deployment</li>
</ul>` },
    `<div class="cors-lab">
  <h2>🔒 CORS Lab</h2>

  <!-- Origin checker -->
  <div class="cors-section">
    <h3>Same-Origin Checker</h3>
    <div class="oc-row">
      <input id="oc-from" value="https://myapp.com" placeholder="From origin">
      <span style="color:#64748b;font-size:12px">→ fetch →</span>
      <input id="oc-to" value="https://api.myapp.com" placeholder="To URL">
      <button onclick="checkOrigin()">Check</button>
    </div>
    <div class="oc-result" id="oc-result"></div>
  </div>

  <!-- Preflight simulation -->
  <div class="cors-section">
    <h3>Preflight Request Flow</h3>
    <div class="pf-btns">
      <button onclick="runPreflight('simple')">Simple Request (GET)</button>
      <button onclick="runPreflight('preflight')">Complex (POST+JSON)</button>
      <button onclick="runPreflight('blocked')">❌ CORS Blocked</button>
      <button onclick="runPreflight('proxy')">✅ Via Proxy</button>
    </div>
    <div class="pf-flow" id="pf-flow"></div>
  </div>

  <!-- Vite proxy config -->
  <div class="cors-section">
    <h3>Vite Proxy Config (рішення для dev)</h3>
    <pre style="font-family:monospace;font-size:11px;color:#e2e8f0;background:#0f172a;border-radius:8px;padding:12px;border:1px solid #1e293b">// vite.config.js:
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://real-api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
}

// Тепер:
// fetch('/api/users') → proxy → https://real-api.example.com/users
// Браузер бачить same-origin → NO CORS!</pre>
  </div>
</div>`,
    `${BASE}
.cors-lab{max-width:540px}
.cors-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.cors-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.oc-row{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-bottom:8px}
.oc-row input{flex:1;min-width:150px;padding:6px 10px;font-size:12px;font-family:monospace}
.oc-result{padding:8px 10px;border-radius:8px;font-size:12px;font-family:monospace;min-height:30px}
.oc-same{background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);color:#34d399}
.oc-diff{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#f87171}

.pf-btns{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.pf-btns button{flex:1;padding:5px 8px;font-size:11px;min-width:100px}
.pf-flow{display:flex;flex-direction:column;gap:5px;min-height:40px}
.pf-step{padding:6px 10px;border-radius:6px;font-size:11px;font-family:monospace;animation:fadeIn .2s}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.pf-browser{background:rgba(59,130,246,.08);border-left:2px solid #3b82f6;color:#7dd3fc}
.pf-server{background:rgba(16,185,129,.08);border-left:2px solid #10b981;color:#34d399}
.pf-error{background:rgba(239,68,68,.08);border-left:2px solid #ef4444;color:#f87171}
.pf-proxy{background:rgba(167,139,250,.08);border-left:2px solid #a78bfa;color:#c4b5fd}`,
    `function checkOrigin() {
  const fromStr = document.getElementById('oc-from').value;
  const toStr   = document.getElementById('oc-to').value;
  try {
    const from = new URL(fromStr);
    const to   = new URL(toStr);
    const same = from.protocol===to.protocol && from.hostname===to.hostname && from.port===to.port;
    const reasons = [];
    if(from.protocol!==to.protocol) reasons.push('protocol: '+from.protocol+' vs '+to.protocol);
    if(from.hostname!==to.hostname) reasons.push('host: '+from.hostname+' vs '+to.hostname);
    if(from.port!==to.port) reasons.push('port: '+(from.port||'443')+' vs '+(to.port||'443'));

    const el = document.getElementById('oc-result');
    if(same) {
      el.className='oc-result oc-same';
      el.textContent='✅ SAME ORIGIN — CORS не діє. Браузер дозволяє запит.';
    } else {
      el.className='oc-result oc-diff';
      el.textContent='❌ CROSS-ORIGIN — CORS діє!\nВідмінності: '+reasons.join(', ')+'\n\nБраузер вимагає CORS заголовки від '+to.hostname;
    }
  } catch(e) { document.getElementById('oc-result').textContent = '❌ Невірний URL: '+e.message; }
}

const fakeDelay = ms => new Promise(r => setTimeout(r, ms));
const pf = document.getElementById('pf-flow');
function addStep(cls, text) {
  const d = document.createElement('div');
  d.className = 'pf-step pf-'+cls;
  d.textContent = text;
  pf.appendChild(d);
}

async function runPreflight(type) {
  pf.innerHTML = '';
  const delay = 350;

  if(type==='simple') {
    addStep('browser', '🖥 Browser: GET /api/data (simple request — no preflight)');
    await fakeDelay(delay);
    addStep('browser', '🖥 Header: Origin: https://myapp.com');
    await fakeDelay(delay);
    addStep('server',  '🖧 Server: 200 OK');
    addStep('server',  '🖧 Header: Access-Control-Allow-Origin: *');
    await fakeDelay(delay);
    addStep('browser', '✅ Browser: CORS дозволений! Відповідь передана у JS.');
  } else if(type==='preflight') {
    addStep('browser', '🖥 Browser: POST + Content-Type: application/json → Preflight required!');
    await fakeDelay(delay);
    addStep('browser', '🖥 OPTIONS /api/users (Preflight Request)');
    addStep('browser', '🖥 Header: Access-Control-Request-Method: POST');
    addStep('browser', '🖥 Header: Access-Control-Request-Headers: content-type');
    await fakeDelay(delay);
    addStep('server', '🖧 Server: 204 No Content (preflight ok)');
    addStep('server', '🖧 Access-Control-Allow-Origin: https://myapp.com');
    addStep('server', '🖧 Access-Control-Allow-Methods: POST,GET');
    addStep('server', '🖧 Access-Control-Allow-Headers: Content-Type');
    await fakeDelay(delay);
    addStep('browser', '🖥 Browser: Тепер реальний POST /api/users...');
    await fakeDelay(delay);
    addStep('server', '✅ 201 Created — дані отримані!');
  } else if(type==='blocked') {
    addStep('browser', '🖥 Browser: GET /api/data');
    addStep('browser', '🖥 Header: Origin: https://myapp.com');
    await fakeDelay(delay);
    addStep('server', '🖧 Server: 200 OK (але без CORS заголовків!)');
    await fakeDelay(delay);
    addStep('error', '❌ Browser BLOCKS response!');
    addStep('error', 'Console: Access to fetch from origin "https://myapp.com" has been blocked by CORS policy');
    addStep('error', 'Missing: Access-Control-Allow-Origin header');
    addStep('error', '→ fetch() кидає TypeError (браузер блокує до JS!)\n→ JS не бачить навіть статус коду');
  } else if(type==='proxy') {
    addStep('browser', '🖥 Browser: GET /api/data (same-origin!)');
    await fakeDelay(delay);
    addStep('proxy', '⚡ Vite Proxy: /api → https://real-api.com');
    await fakeDelay(delay);
    addStep('server', '🖧 real-api.com: 200 OK');
    await fakeDelay(delay);
    addStep('proxy', '⚡ Proxy forwards response');
    addStep('browser', '✅ Browser: same-origin response — NO CORS!');
  }
}`,
    [
      { level:'easy',  uk:'Перевір пари origins: (1) https://myapp.com vs https://myapp.com/api (однаковий?), (2) http://localhost:3000 vs http://localhost:5173.', ru:'Проверь пары: (1) https://myapp.com vs https://myapp.com/api; (2) http://localhost:3000 vs http://localhost:5173.' },
      { level:'easy',  uk:'Запусти всі 4 сценарії Preflight Flow. Для якого типу запиту потрібен Preflight OPTIONS?', ru:'Запусти все 4 сценария. Для какого типа запроса нужен Preflight OPTIONS?' },
      { level:'medium', uk:'Чому браузер блокує відповідь а не запит? Прочитай "❌ CORS Blocked" сценарій — чому JS не бачить навіть статус код?', ru:'Почему браузер блокирует ответ, а не запрос? Прочитай "❌ CORS Blocked" — почему JS не видит статус?' },
      { level:'medium', uk:'Прочитай Vite proxy config. Поясни: що таке changeOrigin? Що робить rewrite? Як це вирішує CORS?', ru:'Прочитай Vite proxy config. Объясни: что такое changeOrigin? Что делает rewrite?' },
      { level:'hard',  uk:'Напиши простий Node.js/Express middleware що додає CORS заголовки для всіх запитів. Які заголовки мінімально потрібні?', ru:'Напиши Express middleware добавляющий CORS заголовки. Какие заголовки минимально нужны?' },
      { level:'hard',  uk:'Додай у origin checker список "whitelist": якщо to-origin є у whitelist → показує ✅ навіть якщо CORS. Симулюй що сервер налаштований.', ru:'Добавь whitelist в origin checker: если to-origin в списке → ✅. Симулируй настроенный сервер.' },
      { level:'extra', uk:'Реалізуй withCorsProxy(url) — функцію що додає CORS proxy prefix (наприклад corsproxy.io) до будь-якого URL. Покажи до/після.', ru:'Реализуй withCorsProxy(url) — добавляет CORS proxy prefix к URL. Покажи до/после.' },
      { level:'extra', uk:'Побудуй інтерактивну схему "Що відбувається при CORS запиті" — покадрово: browser → preflight → server → check → allow/block. Використай анімацію.', ru:'Построй интерактивную схему CORS запроса с анимацией: browser → preflight → server → allow/block.' },
    ]
  );

  /* ─── 08-06 ──────────────────────────────────────────────── */
  patch('08-06',
    { uk:`<h2>AbortController: скасування запиту</h2>
<pre>// AbortController — дозволяє скасувати fetch() або будь-яку async операцію
const controller = new AbortController();
const signal     = controller.signal;

// Запустити fetch із signal:
const res = await fetch('/api/data', { signal });

// Скасувати у будь-який момент:
controller.abort(); // → fetch кидає AbortError

// Обробити:
try {
  const res = await fetch('/api/data', { signal });
  const data = await res.json();
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('Запит скасовано');
  } else {
    throw err; // інша помилка — пробрасуємо
  }
}</pre>
<h3>Таймаут через AbortController</h3>
<pre>function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const id   = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal })
    .finally(() => clearTimeout(id));
}

// Або нативно (сучасні браузери):
const res = await fetch(url, { signal: AbortSignal.timeout(5000) });</pre>
<h3>Скасування при unmount компонента</h3>
<pre>// React useEffect:
useEffect(() => {
  const ctrl = new AbortController();
  fetchData({ signal: ctrl.signal });
  return () => ctrl.abort(); // cleanup = скасувати
}, []);</pre>`,
      ru:`<h2>AbortController</h2>
<pre>const ctrl = new AbortController();
const res  = await fetch('/api/data', { signal: ctrl.signal });
ctrl.abort(); // → AbortError в catch

// Timeout:
function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal });
}

// Или нативно (ES2022+):
fetch(url, { signal: AbortSignal.timeout(5000) });

// React useEffect cleanup:
useEffect(() => {
  const ctrl = new AbortController();
  fetchData({ signal: ctrl.signal });
  return () => ctrl.abort();
}, []);</pre>` },
    `<div class="abort-lab">
  <h2>⛔ AbortController Lab</h2>

  <!-- Manual abort -->
  <div class="ab-section">
    <h3>Ручне скасування запиту</h3>
    <div class="ab-controls">
      <label>Тривалість запиту: <span id="ab-dur-v">3</span>s
        <input type="range" id="ab-dur" min="1" max="10" value="3"
          oninput="document.getElementById('ab-dur-v').textContent=this.value">
      </label>
    </div>
    <div class="ab-btns">
      <button id="ab-start" onclick="startFetch()">▶ Почати fetch()</button>
      <button id="ab-abort" onclick="abortFetch()" disabled>⛔ abort()</button>
      <button onclick="resetAbort()">↺</button>
    </div>
    <div class="ab-progress">
      <div class="abp-bar"><div class="abp-fill" id="ab-fill"></div></div>
      <div class="abp-label" id="ab-label">Готовий</div>
    </div>
    <pre class="out" id="ab-out">—</pre>
  </div>

  <!-- Timeout demo -->
  <div class="ab-section">
    <h3>fetchWithTimeout</h3>
    <div class="ab-controls">
      <label>Timeout: <span id="to-v">2000</span>ms
        <input type="range" id="to-ms" min="500" max="5000" step="500" value="2000"
          oninput="document.getElementById('to-v').textContent=this.value">
      </label>
      <label>Request duration: <span id="to-dur-v">3000</span>ms
        <input type="range" id="to-dur" min="500" max="5000" step="500" value="3000"
          oninput="document.getElementById('to-dur-v').textContent=this.value">
      </label>
    </div>
    <button onclick="runWithTimeout()">▶ fetchWithTimeout()</button>
    <pre class="out" id="to-out" style="margin-top:8px">—</pre>
  </div>

  <!-- Search with abort (debounce) -->
  <div class="ab-section">
    <h3>Search with Abort (race condition fix)</h3>
    <input id="search-input" placeholder="Пиши для пошуку..." oninput="handleSearch()">
    <div class="search-results" id="search-results">
      <div class="sr-placeholder">Почни вводити →</div>
    </div>
    <pre class="out" id="search-log" style="max-height:80px;overflow-y:auto">—</pre>
  </div>
</div>`,
    `${BASE}
.abort-lab{max-width:540px}
.ab-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.ab-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.ab-controls{display:flex;flex-direction:column;gap:5px;margin-bottom:8px}
.ab-controls label{font-size:12px;color:#64748b;display:flex;align-items:center;gap:8px}
.ab-controls label span{min-width:30px;font-family:monospace;color:#94a3b8}
.ab-controls input[type=range]{flex:1;accent-color:#3b82f6}
.ab-btns{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap}
.ab-progress{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.abp-bar{flex:1;height:8px;background:#0f172a;border-radius:4px;overflow:hidden}
.abp-fill{height:100%;width:0;background:#3b82f6;border-radius:4px;transition:width linear}
.abp-fill.aborted{background:#ef4444;transition:none}
.abp-fill.done{background:#10b981}
.abp-label{font-size:11px;font-family:monospace;min-width:80px;color:#64748b}

.search-results{min-height:40px;padding:4px 0;margin-top:8px}
.sr-placeholder{font-size:12px;color:#334155;padding:8px}
.sr-item{padding:5px 8px;font-size:12px;border-bottom:1px solid #0f172a;color:#94a3b8;cursor:pointer;transition:.15s}
.sr-item:hover{color:#f1f5f9;background:rgba(255,255,255,.04)}
.sr-loading{font-size:11px;color:#64748b;padding:8px;animation:pulse .8s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`,
    `let currentController = null;
let animFrame = null;

async function startFetch() {
  currentController = new AbortController();
  const dur = parseInt(document.getElementById('ab-dur').value) * 1000;
  document.getElementById('ab-start').disabled = true;
  document.getElementById('ab-abort').disabled = false;

  const fill  = document.getElementById('ab-fill');
  const label = document.getElementById('ab-label');
  const out   = document.getElementById('ab-out');
  fill.className = 'abp-fill';
  fill.style.transition = 'width ' + dur + 'ms linear';
  fill.style.width = '0';

  await new Promise(r => setTimeout(r, 20)); // trigger transition
  fill.style.width = '100%';
  label.textContent = '⏳ Очікування...';
  out.textContent = 'const ctrl = new AbortController();\nawait fetch("/api/data", { signal: ctrl.signal });\n// Запит виконується ' + (dur/1000) + 's...';

  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, dur);
      currentController.signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted','AbortError'));
      });
    });
    fill.style.transition = 'none';
    fill.style.width = '100%';
    fill.className = 'abp-fill done';
    label.textContent = '✅ Завершено!';
    out.textContent += '\n\n✅ fetch() завершено успішно\nres.status: 200\ndata: { ... }';
  } catch(err) {
    fill.style.transition = 'none';
    fill.className = 'abp-fill aborted';
    label.textContent = '⛔ Скасовано';
    out.textContent += '\n\n❌ catch(err):\nerr.name:    "' + err.name + '"\nerr.message: "' + err.message + '"\n\nif(err.name === "AbortError") → показати "Запит скасовано"';
  } finally {
    document.getElementById('ab-start').disabled = false;
    document.getElementById('ab-abort').disabled = true;
    currentController = null;
  }
}

function abortFetch() {
  if(currentController) {
    currentController.abort();
    document.getElementById('ab-abort').disabled = true;
  }
}
function resetAbort() {
  if(currentController) currentController.abort();
  document.getElementById('ab-fill').style.width = '0';
  document.getElementById('ab-fill').className = 'abp-fill';
  document.getElementById('ab-label').textContent = 'Готовий';
  document.getElementById('ab-start').disabled = false;
  document.getElementById('ab-abort').disabled = true;
}

async function runWithTimeout() {
  const timeout = parseInt(document.getElementById('to-ms').value);
  const dur     = parseInt(document.getElementById('to-dur').value);
  const out     = document.getElementById('to-out');
  out.textContent = \`fetchWithTimeout(url, \${timeout}ms) — запит займе \${dur}ms...\n\`;

  const t0   = Date.now();
  const ctrl = new AbortController();
  const id   = setTimeout(() => ctrl.abort(), timeout);

  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, dur);
      ctrl.signal.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Timeout','AbortError')); });
    });
    clearTimeout(id);
    out.textContent += \`✅ Завершено за \${Date.now()-t0}ms (timeout: \${timeout}ms)\nДані отримано!\`;
  } catch(err) {
    out.textContent += \`❌ AbortError після \${Date.now()-t0}ms\nTimeout \${timeout}ms < request \${dur}ms\n→ fetchWithTimeout відхилено\`;
  }
}

// Search with abort (cancel previous request on new input)
let searchCtrl = null;
const SEARCH_DATA = ['JavaScript','JSON','jQuery','Java','JSX','Jasmine','Jest',
  'CSS','Cascading','Callback','Class','Closure','Context','CORS','Cache',
  'React','REST','Redux','Router','Render','Ref','Relay',
  'fetch','FormData','Function','FileReader','forEach'];

async function handleSearch() {
  const q = document.getElementById('search-input').value.trim();
  const log = document.getElementById('search-log');
  const results = document.getElementById('search-results');

  if(searchCtrl) {
    searchCtrl.abort();
    log.textContent = '[abort] Попередній запит скасовано\n' + log.textContent;
  }
  if(!q) { results.innerHTML = '<div class="sr-placeholder">Почни вводити →</div>'; return; }

  searchCtrl = new AbortController();
  results.innerHTML = '<div class="sr-loading">⟳ Пошук "' + q + '"...</div>';
  log.textContent = '[fetch] GET /api/search?q=' + q + '\n' + log.textContent;

  try {
    await new Promise((resolve, reject) => {
      const t = setTimeout(resolve, 300 + Math.random()*300);
      searchCtrl.signal.addEventListener('abort', () => { clearTimeout(t); reject(new DOMException('','AbortError')); });
    });
    const found = SEARCH_DATA.filter(s => s.toLowerCase().startsWith(q.toLowerCase()));
    results.innerHTML = found.length
      ? found.map(s=>\`<div class="sr-item">\${s}</div>\`).join('')
      : '<div class="sr-placeholder">Нічого не знайдено</div>';
    log.textContent = '[done] ' + found.length + ' результатів для "' + q + '"\n' + log.textContent;
  } catch(e) {
    if(e.name !== 'AbortError') results.innerHTML = '<div class="sr-placeholder">Помилка</div>';
  }
}`,
    [
      { level:'easy',  uk:'Натисни "▶ Почати fetch()" (3s). Через 1 секунду натисни "⛔ abort()". Яка помилка у консолі?', ru:'Нажми "▶ Начать fetch()" (3s). Через 1 сек нажми "⛔ abort()". Какая ошибка?' },
      { level:'easy',  uk:'У Search полі — швидко надрукуй кілька символів. Подивись на лог — скільки запитів скасувалось? Чому це важливо?', ru:'В поле Search быстро напечатай несколько символов. Посмотри лог — сколько запросов отменено? Почему важно?' },
      { level:'medium', uk:'Поставь timeout=2000ms, request duration=3000ms → запусти. Потім навпаки. Коли виникає AbortError?', ru:'Поставь timeout=2000ms, duration=3000ms → запусти. Потом наоборот. Когда AbortError?' },
      { level:'medium', uk:'Знайди де searchCtrl.abort() викликається перед новим fetch. Що б сталося без цього рядку? (підказка: race condition)', ru:'Найди где searchCtrl.abort() вызывается. Что без него? (подсказка: race condition)' },
      { level:'hard',  uk:'Реалізуй fetchWithRetry(url, { retries:3, timeout:2000 }) — повторює запит при AbortError таймаут, але НЕ при ручному abort().', ru:'Реализуй fetchWithRetry(url, {retries:3, timeout:2000}) — повторяет при timeout, но не при ручном abort().' },
      { level:'hard',  uk:'Додай до Search дебаунс 200ms (не відправляй запит якщо не пройшло 200ms після останнього keystroke) + кнопку "✕ Очистити".', ru:'Добавь к Search debounce 200ms + кнопку "✕ Очистить".' },
      { level:'extra', uk:'Реалізуй cancelablePromise(promise) — обгортка що додає метод .cancel() до будь-якого Promise, використовуючи AbortController всередині.', ru:'Реализуй cancelablePromise(p) — обертка добавляющая .cancel() к любому Promise через AbortController.' },
      { level:'extra', uk:'Побудуй чергу запитів RequestQueue: FIFO, максимум 3 активних паралельних, решта чекають. Кожен запит можна скасувати кнопкою.', ru:'Построй RequestQueue: FIFO, макс 3 параллельных, остальные ждут. Каждый запрос отменяется кнопкой.' },
    ]
  );

  /* ─── 08-07 ──────────────────────────────────────────────── */
  patch('08-07',
    { uk:`<h2>Cache API та Service Worker: кешування offline</h2>
<h3>Cache API</h3>
<pre>// Cache API — браузерне сховище для Response об'єктів
const cache = await caches.open('my-cache-v1');

// Зберегти:
await cache.put('/api/data', new Response(JSON.stringify(data)));
// або:
await cache.add('/api/data'); // fetch + зберегти

// Отримати:
const cached = await caches.match('/api/data');
if (cached) {
  const data = await cached.json();
}

// Видалити:
await cache.delete('/api/data');
const keys = await cache.keys(); // всі закешовані URL</pre>
<h3>Service Worker</h3>
<pre>// sw.js — окремий файл що виконується у фоні
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache =>
      cache.addAll(['/index.html', '/style.css', '/app.js'])
    )
  );
});

// Перехоплення запитів (fetch event):
self.addEventListener('fetch', event => {
  event.respondWith(
    // Cache First стратегія:
    caches.match(event.request).then(cached =>
      cached || fetch(event.request)
    )
  );
});</pre>
<h3>Стратегії кешування</h3>
<ul>
  <li>Cache First — спочатку кеш, потім мережа (швидко, але застаріло)</li>
  <li>Network First — спочатку мережа, кеш як fallback (актуально)</li>
  <li>Stale While Revalidate — кеш миттєво + оновлення у фоні</li>
</ul>`,
      ru:`<h2>Cache API + Service Worker</h2>
<pre>// Cache API:
const cache = await caches.open('my-cache-v1');
await cache.put('/api/data', new Response(JSON.stringify(data)));
const cached = await caches.match('/api/data');

// Service Worker (sw.js):
self.addEventListener('install', e => {
  e.waitUntil(caches.open('v1').then(c =>
    c.addAll(['/index.html','/app.js'])
  ));
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request) || fetch(e.request)
  );
});</pre>
<h3>Стратегии</h3>
<ul>
  <li>Cache First — быстро, но устарело</li>
  <li>Network First — актуально, fallback кеш</li>
  <li>Stale While Revalidate — кеш мгновенно + обновление фоном</li>
</ul>` },
    `<div class="sw-lab">
  <h2>💾 Cache & Service Worker</h2>

  <!-- Cache API demo -->
  <div class="sw-section">
    <h3>Cache API — in-memory симуляція</h3>
    <div class="cache-controls">
      <input id="cache-url" value="/api/users" placeholder="URL">
      <select id="cache-ver"><option>v1</option><option>v2</option><option>v3</option></select>
      <button onclick="cacheAdd()">cache.put()</button>
      <button onclick="cacheMatch()">cache.match()</button>
      <button onclick="cacheDelete()">cache.delete()</button>
      <button onclick="cacheList()">cache.keys()</button>
    </div>
    <div class="cache-store" id="cache-store">
      <div class="cs-empty">Кеш порожній</div>
    </div>
    <pre class="out" id="cache-out">—</pre>
  </div>

  <!-- Strategies -->
  <div class="sw-section">
    <h3>Стратегії кешування</h3>
    <div class="strat-btns">
      <button onclick="runStrategy('cache-first')">Cache First</button>
      <button onclick="runStrategy('network-first')">Network First</button>
      <button onclick="runStrategy('swr')">Stale-While-Revalidate</button>
    </div>
    <div class="strat-controls">
      <label><input type="checkbox" id="s-has-cache" checked> Є в кеші</label>
      <label><input type="checkbox" id="s-network-ok" checked> Мережа доступна</label>
    </div>
    <div class="strat-flow" id="strat-flow"></div>
    <pre class="out" id="strat-out">—</pre>
  </div>
</div>`,
    `${BASE}
.sw-lab{max-width:540px}
.sw-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.sw-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.cache-controls{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.cache-controls input{flex:1;min-width:100px;padding:5px 8px;font-size:11px;font-family:monospace}
.cache-controls select{padding:5px 8px;font-size:11px}
.cache-controls button{padding:5px 8px;font-size:10px;border-radius:5px;font-family:monospace}

.cache-store{background:#0f172a;border-radius:8px;padding:8px;min-height:40px;margin-bottom:8px;border:1px solid #1e293b}
.cs-empty{font-size:11px;color:#334155;padding:4px;font-family:monospace}
.cs-item{display:flex;justify-content:space-between;align-items:center;padding:4px 6px;border-bottom:1px solid #1e293b;font-family:monospace;font-size:10.5px;gap:8px}
.cs-item:last-child{border-bottom:none}
.csi-url{color:#7dd3fc;flex:1;overflow:hidden;text-overflow:ellipsis}
.csi-ver{color:#64748b;font-size:9px}
.csi-age{color:#334155;font-size:9px}
.csi-del{cursor:pointer;color:#334155;font-size:12px;padding:0 2px}
.csi-del:hover{color:#ef4444}

.strat-btns{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.strat-btns button{flex:1;padding:5px 10px;font-size:11px}
.strat-controls{display:flex;gap:12px;margin-bottom:8px;flex-wrap:wrap}
.strat-controls label{font-size:12px;color:#64748b;display:flex;align-items:center;gap:5px;cursor:pointer}
.strat-flow{display:flex;flex-direction:column;gap:4px;min-height:30px}
.sf-step{padding:5px 8px;border-radius:5px;font-size:11px;font-family:monospace;animation:fadeIn .2s}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.sf-cache{background:rgba(167,139,250,.1);border-left:2px solid #a78bfa;color:#c4b5fd}
.sf-net{background:rgba(59,130,246,.1);border-left:2px solid #3b82f6;color:#7dd3fc}
.sf-ok{background:rgba(16,185,129,.1);border-left:2px solid #10b981;color:#34d399}
.sf-err{background:rgba(239,68,68,.1);border-left:2px solid #ef4444;color:#f87171}`,
    `// In-memory Cache API simulation
const fakeDelay = ms => new Promise(r => setTimeout(r, ms));
const CACHES = {};

function getCacheName(ver) { return 'my-cache-' + document.getElementById('cache-ver').value; }

function renderCache() {
  const store = document.getElementById('cache-store');
  const allEntries = Object.entries(CACHES);
  if(!allEntries.length) { store.innerHTML='<div class="cs-empty">Кеш порожній</div>'; return; }
  store.innerHTML = allEntries.map(([k,v]) =>
    \`<div class="cs-item">
      <span class="csi-url">\${k}</span>
      <span class="csi-ver">[\${v.version}]</span>
      <span class="csi-age">\${Math.round((Date.now()-v.ts)/1000)}s ago</span>
      <span class="csi-del" onclick="deleteCacheEntry('\${k}')">✕</span>
    </div>\`
  ).join('');
}
function deleteCacheEntry(k) { delete CACHES[k]; renderCache(); }

function cacheAdd() {
  const url = document.getElementById('cache-url').value;
  const ver = document.getElementById('cache-ver').value;
  const key = ver + ':' + url;
  CACHES[key] = { url, version:ver, data:{ data:'cached-data', url, ts:Date.now() }, ts:Date.now() };
  renderCache();
  document.getElementById('cache-out').textContent =
    \`cache.put('\${url}', response);\n// Ключ: "\${key}"\n// Збережено у caches["\${ver}"] ✅\`;
}

async function cacheMatch() {
  const url = document.getElementById('cache-url').value;
  const ver = document.getElementById('cache-ver').value;
  const key = ver + ':' + url;
  await fakeDelay(60);
  const entry = CACHES[key];
  document.getElementById('cache-out').textContent = entry
    ? \`caches.match('\${url}') → ✅ HIT\nВік: \${Math.round((Date.now()-entry.ts)/1000)}s\nData: \${JSON.stringify(entry.data,null,2)}\`
    : \`caches.match('\${url}') → ❌ MISS (не знайдено у \${ver})\nDo: fetch('/api/data') → cache.put()\`;
}

function cacheDelete() {
  const url = document.getElementById('cache-url').value;
  const ver = document.getElementById('cache-ver').value;
  const key = ver + ':' + url;
  const existed = key in CACHES;
  delete CACHES[key];
  renderCache();
  document.getElementById('cache-out').textContent = existed
    ? \`cache.delete('\${url}') → true ✅ (видалено)\`
    : \`cache.delete('\${url}') → false (не було у кеші)\`;
}

function cacheList() {
  const ver = document.getElementById('cache-ver').value;
  const keys = Object.keys(CACHES).filter(k=>k.startsWith(ver+':')).map(k=>k.replace(ver+':',''));
  document.getElementById('cache-out').textContent =
    \`cache.keys() для \${ver}:\n[\${keys.map(k=>'"'+k+'"').join(',\n ')}\]\n\nВсього: \${keys.length} URL\`;
}

// Strategy flows
const flow = document.getElementById('strat-flow');
function addSF(cls, text) {
  const d=document.createElement('div'); d.className='sf-step sf-'+cls; d.textContent=text; flow.appendChild(d);
}

async function runStrategy(type) {
  flow.innerHTML='';
  const hasCache  = document.getElementById('s-has-cache').checked;
  const networkOk = document.getElementById('s-network-ok').checked;
  const out       = document.getElementById('strat-out');
  const delay     = 350;

  if(type==='cache-first') {
    addSF('cache','💜 1. caches.match(request)...');
    await fakeDelay(delay);
    if(hasCache) {
      addSF('ok','💜 ✅ CACHE HIT — відповідь з кешу (миттєво!)');
      out.textContent='Cache First: відповідь з кешу\n+ Дуже швидко\n+ Працює offline\n- Дані можуть бути застарілі';
    } else {
      addSF('err','💜 ❌ CACHE MISS');
      addSF('net','🔵 2. fetch(request)...');
      await fakeDelay(delay);
      if(networkOk) { addSF('ok','🔵 ✅ Мережева відповідь → зберігаємо у кеш'); }
      else { addSF('err','🔵 ❌ Мережа недоступна → помилка'); }
      out.textContent='Cache First: miss → network\n' + (networkOk?'✅ OK':'❌ Offline error');
    }
  } else if(type==='network-first') {
    addSF('net','🔵 1. fetch(request)...');
    await fakeDelay(delay);
    if(networkOk) {
      addSF('ok','🔵 ✅ Мережева відповідь → зберігаємо у кеш для fallback');
      out.textContent='Network First: мережа успішна\n+ Завжди актуальні дані\n- Повільніше (чекаємо мережу)';
    } else {
      addSF('err','🔵 ❌ Мережа недоступна');
      addSF('cache', '💜 2. caches.match(request)...');
      await fakeDelay(delay);
      if(hasCache) { addSF('ok','💜 ✅ Fallback із кешу!'); }
      else { addSF('err','💜 ❌ Кеш теж порожній → офлайн помилка'); }
      out.textContent='Network First: мережа offline → ' + (hasCache?'кеш fallback ✅':'помилка ❌');
    }
  } else if(type==='swr') {
    addSF('cache','💜 1. caches.match() → показуємо кеш МИТТЄВО...');
    await fakeDelay(delay);
    if(hasCache) { addSF('ok','💜 ✅ Кешована відповідь показана юзеру'); }
    else { addSF('err','💜 Кеш порожній — юзер бачить loading...'); }
    addSF('net','🔵 2. fetch() у фоні для оновлення...');
    await fakeDelay(delay);
    if(networkOk) {
      addSF('ok','🔵 ✅ Нові дані → оновлюємо кеш + UI');
      out.textContent='Stale-While-Revalidate:\n✅ Миттєвий показ кешу\n✅ Оновлення у фоні\n+ Найкращий UX\n- Короткий момент застарілих даних';
    } else {
      addSF('err','🔵 ❌ Мережа недоступна — залишаємо кеш');
      out.textContent='SWR: offline → кеш залишається\n+ Офлайн підтримка\n+ Завжди щось показуємо';
    }
  }
}`,
    [
      { level:'easy',  uk:'Додай 3 різні URL у кеш v1. Потім виконай cache.keys() — всі 3 з\'являться? Видали один і перевір знову.', ru:'Добавь 3 разных URL в кеш v1. Затем cache.keys() — все 3? Удали один и проверь снова.' },
      { level:'easy',  uk:'Протестуй усі 3 стратегії з 4 комбінаціями (є кеш/немає × мережа/offline). Яка стратегія найкраща для новин-сайту?', ru:'Протестируй 3 стратегии с 4 комбинациями (кеш/нет × сеть/offline). Какая стратегия для новостного сайта?' },
      { level:'medium', uk:'Поясни "Stale While Revalidate": чому назва "несвіже поки переперевіряємо"? Коли юзер побачить застарілі дані?', ru:'Объясни "Stale While Revalidate": почему "несвежее пока переперепроверяем"? Когда юзер увидит устаревшее?' },
      { level:'medium', uk:'Знайди в коді де "ts:Date.now()" зберігається. Як додати TTL (time-to-live): автоматично видаляти записи старші за N секунд?', ru:'Найди где ts:Date.now() сохраняется. Добавь TTL: автоматически удалять записи старше N секунд.' },
      { level:'hard',  uk:'Реалізуй cacheWithTTL(ttlMs) — кеш де кожен запис видаляється через ttlMs мілісекунд. Покажи лічильник часу до видалення.', ru:'Реализуй cacheWithTTL(ttlMs) — кеш где записи удаляются через ttlMs. Покажи счетчик до удаления.' },
      { level:'hard',  uk:'Реалізуй versioned cache: кнопка "Оновити версію v1→v2" очищає старий кеш і починає заповнювати новий (cache invalidation).', ru:'Реализуй versioned cache: кнопка "Обновить v1→v2" очищает старый кеш и наполняет новый.' },
      { level:'extra', uk:'Напиши спрощений Service Worker як рядок (Blob URL) що реєструється через navigator.serviceWorker.register і реалізує Cache First стратегію.', ru:'Напиши упрощенный Service Worker как строку (Blob URL) регистрирующийся через navigator.serviceWorker.register.' },
      { level:'extra', uk:'Реалізуй "smart prefetch": при idle (requestIdleCallback) завантажує та кешує потенційно потрібні URL (наприклад, усі links на поточній сторінці).', ru:'Реализуй "smart prefetch": при idle (requestIdleCallback) загружает и кеширует потенциально нужные URL.' },
    ]
  );

  /* ─── 08-08 ──────────────────────────────────────────────── */
  patch('08-08',
    { uk:`<h2>FormData: відправка форм та файлів</h2>
<pre>// FormData — спеціальний об'єкт для multipart/form-data
const form = document.getElementById('upload-form');
const fd   = new FormData(form); // автоматично збирає поля

// Або вручну:
const fd = new FormData();
fd.append('name',  'Alice');
fd.append('age',   '14');
fd.append('photo', fileInput.files[0]); // File об'єкт!

// Відправка через fetch:
const res = await fetch('/api/upload', {
  method: 'POST',
  body:   fd,         // НЕ JSON.stringify!
  // НЕ додаємо Content-Type — браузер сам встановить
  // multipart/form-data з boundary
});</pre>
<h3>Читання FormData</h3>
<pre>fd.get('name');       // 'Alice'
fd.getAll('tags');    // ['js', 'css'] (multiple)
fd.has('photo');      // true
fd.delete('age');
fd.set('name', 'Bob'); // перезаписати

// Перебір:
for (const [key, value] of fd) {
  console.log(key, value);
}</pre>
<h3>URL.createObjectURL</h3>
<pre>// Показати превью файлу без завантаження:
const file = fileInput.files[0];
const url  = URL.createObjectURL(file);
img.src    = url;
// Звільнити пам'ять після використання:
URL.revokeObjectURL(url);</pre>`,
      ru:`<h2>FormData</h2>
<pre>const fd = new FormData();
fd.append('name', 'Alice');
fd.append('file', fileInput.files[0]);

// Отправка (НЕ JSON.stringify, НЕ Content-Type!):
await fetch('/api/upload', { method:'POST', body:fd });

// Чтение:
fd.get('name');       // 'Alice'
fd.has('file');       // true
fd.delete('name');
for(const [k,v] of fd) console.log(k,v);

// Превью файла:
const url = URL.createObjectURL(file);
img.src = url;
URL.revokeObjectURL(url); // освободить память</pre>` },
    `<div class="fd-lab">
  <h2>📤 FormData Lab</h2>

  <!-- Form builder -->
  <div class="fd-section">
    <h3>Форма завантаження профілю</h3>
    <form id="profile-form" onsubmit="return false">
      <div class="fd-field">
        <label>Ім'я:</label>
        <input type="text" name="name" placeholder="Ваше ім'я">
      </div>
      <div class="fd-field">
        <label>Вік:</label>
        <input type="number" name="age" placeholder="Вік">
      </div>
      <div class="fd-field">
        <label>Навички:</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          <label class="fd-checkbox"><input type="checkbox" name="skills" value="html">HTML</label>
          <label class="fd-checkbox"><input type="checkbox" name="skills" value="css">CSS</label>
          <label class="fd-checkbox"><input type="checkbox" name="skills" value="js">JavaScript</label>
          <label class="fd-checkbox"><input type="checkbox" name="skills" value="react">React</label>
        </div>
      </div>
      <div class="fd-field">
        <label>Аватар:</label>
        <input type="file" name="avatar" id="avatar-input" accept="image/*" onchange="previewAvatar()">
        <div id="avatar-preview"></div>
      </div>
      <div class="fd-btns">
        <button type="button" onclick="readFD()">📖 Читати FormData</button>
        <button type="button" onclick="submitFD()">📤 POST (симуляція)</button>
      </div>
    </form>
    <pre class="out" id="fd-out">—</pre>
  </div>

  <!-- File info -->
  <div class="fd-section">
    <h3>File API: метадані файлу</h3>
    <input type="file" id="file-info-input" accept="*/*" onchange="showFileInfo()">
    <div id="file-info" style="margin-top:8px"></div>
  </div>
</div>`,
    `${BASE}
.fd-lab{max-width:540px}
.fd-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.fd-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.fd-field{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}
.fd-field label:first-child{font-size:11px;font-weight:600;text-transform:uppercase;color:#64748b;letter-spacing:.04em}
.fd-field input[type=text],.fd-field input[type=number]{padding:7px 10px;font-size:13px}
.fd-checkbox{display:flex;align-items:center;gap:5px;font-size:12px;color:#94a3b8;cursor:pointer;padding:4px 10px;background:#0f172a;border:1px solid #1e293b;border-radius:6px;transition:.15s}
.fd-checkbox:hover{border-color:#3b82f6;color:#7dd3fc}
.fd-checkbox input{accent-color:#3b82f6;cursor:pointer}
.fd-btns{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.fd-btns button{flex:1;padding:7px}

#avatar-preview{margin-top:6px}
#avatar-preview img{width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid #334155}
.fi-box{background:#0f172a;border-radius:8px;padding:10px;border:1px solid #1e293b}
.fi-row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #1e293b;font-size:11px;font-family:monospace}
.fi-row:last-child{border-bottom:none}
.fi-key{color:#64748b}.fi-val{color:#e2e8f0;text-align:right}
.fi-type{padding:2px 8px;background:rgba(59,130,246,.1);border-radius:10px;font-size:9px;color:#7dd3fc}`,
    `function readFD() {
  const form = document.getElementById('profile-form');
  const fd   = new FormData(form);
  const lines = ['// new FormData(form) → всі поля форми:\n'];
  for(const [k,v] of fd) {
    if(v instanceof File) lines.push(\`fd.get("\${k}") → File { name:"\${v.name}", size:\${v.size}, type:"\${v.type}" }\`);
    else lines.push(\`fd.get("\${k}") → "\${v}"\`);
  }
  lines.push(\`\nfd.getAll("skills") → [\${fd.getAll("skills").map(s=>'"'+s+'"').join(', ')}]\`);
  lines.push('fd.has("avatar")  → ' + fd.has('avatar'));
  document.getElementById('fd-out').textContent = lines.join('\n');
}

async function submitFD() {
  const form = document.getElementById('profile-form');
  const fd   = new FormData(form);
  const name = fd.get('name') || '(порожньо)';
  const age  = fd.get('age') || '(порожньо)';

  document.getElementById('fd-out').textContent = '⏳ POST /api/profile із FormData...';
  await new Promise(r => setTimeout(r, 400));

  // Симуляція response
  const file = fd.get('avatar');
  const hasFile = file && file.size > 0;
  document.getElementById('fd-out').textContent =
    \`// Request:\nfetch('/api/profile', {\n  method: 'POST',\n  body: fd,           // НЕ JSON.stringify!\n  // Content-Type: НЕ вказуємо — браузер сам:\n  // multipart/form-data; boundary=---WebKitBoundary...\n});\n\n// Response 201:\n{\n  "id": \${Math.floor(Math.random()*1000)+1},\n  "name": "\${name}",\n  "age": \${age},\n  "skills": [\${fd.getAll('skills').map(s=>'"'+s+'"').join(',')}],\n  "avatar": \${hasFile?'"'+file.name+' → uploaded"':'"no file"'},\n  "createdAt": "\${new Date().toISOString()}"\n}\`;
}

let avatarObjectUrl = null;
function previewAvatar() {
  if(avatarObjectUrl) URL.revokeObjectURL(avatarObjectUrl);
  const file = document.getElementById('avatar-input').files[0];
  if(!file) return;
  avatarObjectUrl = URL.createObjectURL(file);
  const prev = document.getElementById('avatar-preview');
  prev.innerHTML = \`<img src="\${avatarObjectUrl}" alt="Avatar preview">\`;
}

function showFileInfo() {
  const file = document.getElementById('file-info-input').files[0];
  if(!file) return;
  const fi = document.getElementById('file-info');

  const sizeStr = file.size < 1024 ? file.size + ' B'
    : file.size < 1024*1024 ? (file.size/1024).toFixed(1) + ' KB'
    : (file.size/1024/1024).toFixed(2) + ' MB';

  const isImage = file.type.startsWith('image/');
  const url = URL.createObjectURL(file);

  fi.innerHTML = \`<div class="fi-box">
    <div class="fi-row"><span class="fi-key">file.name</span><span class="fi-val">\${file.name}</span></div>
    <div class="fi-row"><span class="fi-key">file.size</span><span class="fi-val">\${sizeStr} (\${file.size} bytes)</span></div>
    <div class="fi-row"><span class="fi-key">file.type</span><span class="fi-val"><span class="fi-type">\${file.type||'unknown'}</span></span></div>
    <div class="fi-row"><span class="fi-key">file.lastModified</span><span class="fi-val">\${new Date(file.lastModified).toLocaleDateString()}</span></div>
    \${isImage ? '<div class="fi-row"><span class="fi-key">preview</span><span class="fi-val"><img src="'+url+'" style="height:40px;border-radius:4px;margin-top:4px;object-fit:cover"></span></div>' : ''}
  </div>\`;
  if(!isImage) URL.revokeObjectURL(url);
}`,
    [
      { level:'easy',  uk:'Заповни форму (ім\'я, вік, 2 навички) і натисни "Читати FormData". Знайди getAll("skills") у виводі.', ru:'Заполни форму и нажми "Читать FormData". Найди getAll("skills") в выводе.' },
      { level:'easy',  uk:'Вибери будь-який файл у "File API" — перевір file.name, file.size, file.type. Вибери зображення — з\'явиться превью?', ru:'Выбери файл в "File API" — проверь name, size, type. Выбери картинку — появится превью?' },
      { level:'medium', uk:'Чому при відправці FormData через fetch НЕ можна встановлювати Content-Type: application/json вручну? Що встановлює браузер?', ru:'Почему при FormData нельзя устанавливать Content-Type вручную? Что ставит браузер?' },
      { level:'medium', uk:'Знайди avatarObjectUrl і revokeObjectURL. Навіщо викликати revokeObjectURL? Що станеться без нього (витік пам\'яті)?', ru:'Найди revokeObjectURL. Зачем его вызывать? Что без него (утечка памяти)?' },
      { level:'hard',  uk:'Додай до форми поле "Теги" (input type=text, множинні значення через кому). При submit — розбий по комі і додай кожен тег окремим fd.append("tag", value).', ru:'Добавь поле "Теги" (через запятую). При submit — разбей и добавь каждый тег отдельным fd.append.' },
      { level:'hard',  uk:'Реалізуй drag-and-drop зону завантаження файлів: юзер перетягує файл → показує превью + розмір + тип. Підтримуй кілька файлів.', ru:'Реализуй drag-and-drop зону: перетащи файл → превью + размер + тип. Поддержи несколько файлов.' },
      { level:'extra', uk:'Реалізуй завантаження з progress bar: читай File через FileReader.readAsArrayBuffer() шматками по 64KB і показуй прогрес у відсотках.', ru:'Реализуй загрузку с progress bar: читай File через FileReader по 64KB и показывай прогресс %.' },
      { level:'extra', uk:'Побудуй "File Manager": показує список вибраних файлів з превью (зображення) або іконкою (інші типи), розміром, кнопкою видалення і загальним розміром.', ru:'Построй "File Manager": список файлов с превью/иконкой, размером, удалением и общим размером.' },
    ]
  );

  /* ─── 08-09 ──────────────────────────────────────────────── */
  patch('08-09',
    { uk:`<h2>WebSocket: двостороннє з'єднання в реальному часі</h2>
<pre>// WebSocket — постійне з'єднання між браузером і сервером
// Обидві сторони можуть відправляти повідомлення КОЛИ ЗАВГОДНО
const ws = new WebSocket('wss://echo.websocket.org');

// Events:
ws.onopen    = () => console.log('🟢 Підключено');
ws.onmessage = e  => console.log('📨 Отримано:', e.data);
ws.onerror   = e  => console.error('❌ Помилка:', e);
ws.onclose   = e  => console.log('🔴 Відключено', e.code, e.reason);

// Відправити:
ws.send('Hello Server!');
ws.send(JSON.stringify({ type: 'message', text: 'Hi!' }));

// Закрити:
ws.close(); // або ws.close(1000, 'Done');</pre>
<h3>readyState</h3>
<pre>ws.readyState === 0 // CONNECTING
ws.readyState === 1 // OPEN
ws.readyState === 2 // CLOSING
ws.readyState === 3 // CLOSED</pre>
<h3>HTTP vs WebSocket</h3>
<ul>
  <li>HTTP: клієнт запитує → сервер відповідає (request-response)</li>
  <li>WebSocket: постійне з'єднання, push від сервера, менший overhead</li>
  <li>Коли WebSocket: чат, live notifications, ігри, stock prices, collaborative editors</li>
</ul>`,
      ru:`<h2>WebSocket</h2>
<pre>const ws = new WebSocket('wss://echo.websocket.org');
ws.onopen    = () => console.log('🟢 Connected');
ws.onmessage = e  => console.log(e.data);
ws.onerror   = e  => console.error(e);
ws.onclose   = e  => console.log('🔴 Closed', e.code);

ws.send('Hello!');
ws.send(JSON.stringify({ type:'msg', text:'Hi' }));
ws.close();

// readyState: 0=CONNECTING 1=OPEN 2=CLOSING 3=CLOSED</pre>
<h3>HTTP vs WebSocket</h3>
<ul>
  <li>HTTP: запрос-ответ (клиент инициирует)</li>
  <li>WebSocket: постоянное соединение, push от сервера</li>
  <li>Чат, уведомления, игры, биржа, коллаборативные редакторы</li>
</ul>` },
    `<div class="ws-lab">
  <h2>⚡ WebSocket Lab</h2>

  <!-- Connection state -->
  <div class="ws-section">
    <h3>Connection Status</h3>
    <div class="ws-state">
      <div class="wss-dot" id="wss-dot"></div>
      <div id="wss-text">Відключено (CLOSED)</div>
      <div class="wss-badge" id="wss-state">readyState: 3</div>
    </div>
    <div class="ws-btns">
      <button id="ws-connect" onclick="wsConnect()">🟢 Connect</button>
      <button id="ws-disconnect" onclick="wsDisconnect()" disabled>🔴 Disconnect</button>
    </div>
  </div>

  <!-- Chat simulation -->
  <div class="ws-section">
    <h3>Live Chat (симуляція)</h3>
    <div class="ws-chat" id="ws-chat">
      <div class="wsc-placeholder">Підключіться щоб почати чат →</div>
    </div>
    <div class="ws-send">
      <input id="ws-msg" placeholder="Повідомлення..." onkeydown="if(event.key==='Enter')wsSend()">
      <button onclick="wsSend()" id="ws-send-btn" disabled>Надіслати</button>
    </div>
  </div>

  <!-- Protocol demo -->
  <div class="ws-section">
    <h3>WebSocket Protocol (порівняння з HTTP)</h3>
    <div class="proto-tabs">
      <button class="pt-btn active" onclick="showProto('ws',this)">WebSocket</button>
      <button class="pt-btn" onclick="showProto('http',this)">HTTP Polling</button>
      <button class="pt-btn" onclick="showProto('sse',this)">SSE (Server-Sent)</button>
    </div>
    <pre class="out" id="proto-out"></pre>
  </div>
</div>`,
    `${BASE}
.ws-lab{max-width:540px}
.ws-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.ws-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.ws-state{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap}
.wss-dot{width:12px;height:12px;border-radius:50%;background:#334155;transition:.3s;flex-shrink:0}
.wss-dot.connecting{background:#f59e0b;animation:pulse .5s infinite}
.wss-dot.open{background:#10b981}
.wss-dot.closed{background:#ef4444}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
#wss-text{font-size:12px;font-weight:600;flex:1}
.wss-badge{font-size:10px;font-family:monospace;padding:2px 8px;background:#0f172a;border:1px solid #1e293b;border-radius:8px;color:#475569}

.ws-btns{display:flex;gap:6px}
.ws-chat{background:#0f172a;border-radius:8px;border:1px solid #1e293b;padding:8px;height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:5px;margin-bottom:8px}
.wsc-placeholder{font-size:11px;color:#334155;text-align:center;padding:30px 0;font-family:monospace}
.wsc-msg{padding:6px 10px;border-radius:8px;font-size:12px;max-width:80%;animation:msgIn .15s}
@keyframes msgIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
.wsc-sent{background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.2);color:#7dd3fc;align-self:flex-end;border-bottom-right-radius:3px}
.wsc-recv{background:#1e293b;border:1px solid #334155;color:#94a3b8;align-self:flex-start;border-bottom-left-radius:3px}
.wsc-sys{font-size:10px;color:#334155;text-align:center;align-self:center;font-family:monospace}
.ws-send{display:flex;gap:6px}
.ws-send input{flex:1;padding:7px 10px;font-size:13px}

.proto-tabs{display:flex;gap:4px;margin-bottom:8px}
.pt-btn{flex:1;padding:5px 8px;font-size:11px;border-radius:6px}
.pt-btn.active{background:rgba(59,130,246,.15);border-color:#3b82f6;color:#7dd3fc}`,
    `const fakeDelay = ms => new Promise(r => setTimeout(r, ms));
let wsConnected = false;
let autoReplyInterval = null;
const DOT_STATES = { 0:'connecting', 1:'open', 2:'connecting', 3:'closed' };
const DOT_TEXTS  = { 0:'Підключення... (CONNECTING)', 1:'🟢 Підключено (OPEN)', 2:'Відключення... (CLOSING)', 3:'🔴 Відключено (CLOSED)' };

function setWSState(state) {
  const dot  = document.getElementById('wss-dot');
  const text = document.getElementById('wss-text');
  const badge= document.getElementById('wss-state');
  dot.className = 'wss-dot ' + (DOT_STATES[state]||'closed');
  text.textContent = DOT_TEXTS[state];
  badge.textContent = 'readyState: ' + state;
}

function addChatMsg(cls, text, label) {
  const chat = document.getElementById('ws-chat');
  if(chat.querySelector('.wsc-placeholder')) chat.innerHTML = '';
  const d = document.createElement('div');
  d.className = 'wsc-msg wsc-' + cls;
  d.textContent = (label ? label + ': ' : '') + text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

const SERVER_REPLIES = [
  'Привіт! Це WebSocket сервер 👋',
  'Я отримав твоє повідомлення!',
  'WebSocket — двосторонній зв\'язок ✨',
  'На відміну від HTTP — не чекаю запиту!',
  'Можу надсилати дані КОЛИ ЗАВГОДНО.',
  'Ping!',
  'Затримка мінімальна — немає HTTP overhead.',
  'Ідеально для чату, ігор, real-time даних.',
];
let replyIdx = 0;

async function wsConnect() {
  if(wsConnected) return;
  setWSState(0); // CONNECTING
  document.getElementById('ws-connect').disabled = true;
  await fakeDelay(600);
  setWSState(1); // OPEN
  wsConnected = true;
  document.getElementById('ws-disconnect').disabled = false;
  document.getElementById('ws-send-btn').disabled = false;
  addChatMsg('sys', 'WebSocket з\'єднання відкрито');

  // Auto server pushes
  autoReplyInterval = setInterval(() => {
    if(!wsConnected) return;
    addChatMsg('recv', SERVER_REPLIES[replyIdx++ % SERVER_REPLIES.length], '🖧 Server');
  }, 4000);
}

async function wsDisconnect() {
  if(!wsConnected) return;
  setWSState(2);
  clearInterval(autoReplyInterval);
  await fakeDelay(300);
  setWSState(3);
  wsConnected = false;
  document.getElementById('ws-connect').disabled = false;
  document.getElementById('ws-disconnect').disabled = true;
  document.getElementById('ws-send-btn').disabled = true;
  addChatMsg('sys', 'Відключено (code: 1000 Normal Closure)');
}

async function wsSend() {
  if(!wsConnected) return;
  const input = document.getElementById('ws-msg');
  const msg   = input.value.trim();
  if(!msg) return;
  input.value = '';

  addChatMsg('sent', msg, '👤 You');
  await fakeDelay(150 + Math.random()*100);
  const echo = 'Echo: ' + msg;
  addChatMsg('recv', echo, '🖧 Server');
}

// Protocol comparison
function showProto(type, btn) {
  document.querySelectorAll('.pt-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const protos = {
    ws: \`// WebSocket — постійне з'єднання:
const ws = new WebSocket('wss://api.example.com/ws');
ws.onopen = () => ws.send('subscribe:prices');
ws.onmessage = e => updateUI(JSON.parse(e.data));

// Сервер PUSH — без запиту від клієнта:
// { BTC: 45000, ETH: 3200 } → миттєво у UI

✅ Двосторонній зв'язок
✅ Мінімальний overhead (~2 bytes per message vs ~800 bytes HTTP)
✅ Сервер може відправляти дані КОЛИ ЗАВГОДНО
✅ Sub-millisecond latency для real-time apps
❌ Складніше масштабувати
❌ Потребує підтримки сервера\`,
    http: \`// HTTP Polling — клієнт регулярно запитує:
setInterval(async () => {
  const res  = await fetch('/api/prices');
  const data = await res.json();
  updateUI(data);
}, 1000); // 1 запит/секунду

// Або Long Polling:
async function poll() {
  const res = await fetch('/api/changes?since=1234567');
  // Сервер тримає з'єднання відкритим до змін
  const data = await res.json();
  updateUI(data);
  poll(); // знову
}

❌ Overhead кожного HTTP запиту (~800 bytes headers)
❌ Затримка = інтервал polling
❌ Навантаження на сервер (часті порожні відповіді)\`,
    sse: \`// Server-Sent Events — сервер → клієнт (односторонній):
const evtSource = new EventSource('/api/stream');
evtSource.onmessage = e => updateUI(e.data);
evtSource.addEventListener('price-update', e => {
  const data = JSON.parse(e.data);
  updatePrices(data);
});
evtSource.close();

// Переваги над HTTP polling:
✅ Сервер PUSH (як WS, але тільки → клієнт)
✅ Автоматичне перепідключення
✅ Стандартний HTTP (проходить через proxy)
✅ Простіше ніж WebSocket

❌ ТІЛЬКИ server → client (не двосторонній)
❌ Не підтримує бінарні дані\`,
  };
  document.getElementById('proto-out').textContent = protos[type];
}
showProto('ws', document.querySelector('.pt-btn'));`,
    [
      { level:'easy',  uk:'Натисни Connect → надішли 3 повідомлення → зачекай автоматичні відповіді сервера → Disconnect. Яке readyState при кожному стані?', ru:'Connect → отправь 3 сообщения → подожди автоответы → Disconnect. Какое readyState в каждом состоянии?' },
      { level:'easy',  uk:'Порівняй 3 протоколи у вкладках (WebSocket / HTTP Polling / SSE). Коли SSE краще за WebSocket?', ru:'Сравни 3 протокола. Когда SSE лучше WebSocket?' },
      { level:'medium', uk:'Знайди autoReplyInterval. Чому важливо clearInterval при disconnect? Що буде якщо не очистити?', ru:'Найди autoReplyInterval. Почему важно clearInterval при disconnect? Что будет без него?' },
      { level:'medium', uk:'Поясни "WebSocket overhead ~2 bytes vs HTTP ~800 bytes". Що це за байти у WebSocket frame?', ru:'Объясни "WebSocket overhead ~2 bytes vs HTTP ~800 bytes". Что это за байты в WebSocket frame?' },
      { level:'hard',  uk:'Додай до чату форматовані повідомлення: /bold текст → <b>, /code текст → <code>, /me дія → курсив. Парси команду перед відправкою.', ru:'Добавь форматирование: /bold текст → <b>, /code → <code>, /me → курсив. Парси до отправки.' },
      { level:'hard',  uk:'Реалізуй "typing indicator": поки юзер вводить текст — через 500ms показує "🖧 Server is typing...", зникає якщо юзер не пише 2s.', ru:'Реализуй typing indicator: при наборе → "🖧 Server is typing...", исчезает через 2s паузы.' },
      { level:'extra', uk:'Реалізуй автоматичний reconnect: при disconnect (помилка) — намагається перепідключитися через 1s, 2s, 4s... (exponential backoff). Показує спроби.', ru:'Реализуй авто-reconnect: при disconnect пробует через 1s, 2s, 4s (exponential backoff). Показывает попытки.' },
      { level:'extra', uk:'Побудуй симуляцію "Stock Price Ticker": після connect сервер кожні 500ms надсилає JSON з 5 "цінами" (random ±2%). Відображай у live таблиці з кольоровим індикатором росту/падіння.', ru:'Построй симуляцию "Stock Ticker": сервер каждые 500ms шлет JSON с 5 ценами (±2%). Таблица с цветным индикатором.' },
    ]
  );

  /* ─── 08-10 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('08-10',
    { uk:`<h2>ПРОЕКТ: API Dashboard — дані з кількох джерел</h2>
<p>Побудуй дашборд що об'єднує дані з кількох "API" в єдиному інтерфейсі.</p>
<h3>Обов'язкові фічі</h3>
<ol>
  <li>Паралельне завантаження з кількох API через Promise.all</li>
  <li>Відображення погоди (з вибором міста)</li>
  <li>Список GitHub-репозиторіїв</li>
  <li>Список користувачів (JSONPlaceholder стиль)</li>
  <li>Індикатор завантаження і обробка помилок</li>
  <li>Автоматичне оновлення погоди кожні 30 секунд</li>
</ol>
<h3>Технічні вимоги</h3>
<ul>
  <li>async/await + try/catch для кожного запиту</li>
  <li>AbortController для скасування при перемиканні міста</li>
  <li>Cache для уникнення повторних запитів (5хв TTL)</li>
  <li>structuredClone для роботи з даними</li>
</ul>`,
      ru:`<h2>ПРОЕКТ: API Dashboard</h2>
<h3>Обязательные фичи</h3>
<ol>
  <li>Параллельная загрузка Promise.all</li>
  <li>Погода с выбором города</li>
  <li>GitHub репозитории</li>
  <li>Список пользователей</li>
  <li>Индикатор загрузки и обработка ошибок</li>
  <li>Авто-обновление каждые 30 сек</li>
</ol>
<h3>Требования</h3>
<ul>
  <li>async/await + try/catch</li>
  <li>AbortController при смене города</li>
  <li>Cache с TTL 5 минут</li>
  <li>structuredClone для данных</li>
</ul>` },
    `<div class="dash-app" id="dash-app">
  <div class="dash-header">
    <h1>🌐 API Dashboard</h1>
    <div class="dh-controls">
      <select id="dash-city" onchange="refreshWeather()">
        <option value="kyiv">🇺🇦 Kyiv</option>
        <option value="london">🇬🇧 London</option>
        <option value="berlin">🇩🇪 Berlin</option>
        <option value="paris">🇫🇷 Paris</option>
        <option value="new_york">🇺🇸 New York</option>
      </select>
      <button onclick="loadAll()">🔄 Refresh All</button>
      <div class="dh-status" id="dh-status">—</div>
    </div>
  </div>

  <!-- Grid -->
  <div class="dash-grid">
    <!-- Weather -->
    <div class="dash-card" id="dc-weather">
      <div class="dc-title">🌤 Weather</div>
      <div class="dc-body" id="dcb-weather">
        <div class="dc-spinner">⟳</div>
      </div>
      <div class="dc-footer" id="dcf-weather"></div>
    </div>

    <!-- Users -->
    <div class="dash-card" id="dc-users">
      <div class="dc-title">👥 Users
        <input id="user-search" placeholder="Пошук..." oninput="filterUsers()" style="margin-left:auto;width:100px;padding:2px 6px;font-size:10px">
      </div>
      <div class="dc-body" id="dcb-users">
        <div class="dc-spinner">⟳</div>
      </div>
    </div>

    <!-- Repos -->
    <div class="dash-card dc-wide" id="dc-repos">
      <div class="dc-title">📦 GitHub Repos
        <select id="gh-select" onchange="refreshRepos()" style="margin-left:auto;font-size:11px;padding:2px 6px">
          <option value="torvalds">torvalds</option>
          <option value="gaearon">gaearon</option>
          <option value="sindresorhus">sindresorhus</option>
        </select>
      </div>
      <div class="dc-body" id="dcb-repos">
        <div class="dc-spinner">⟳</div>
      </div>
    </div>

    <!-- Stats -->
    <div class="dash-card" id="dc-stats">
      <div class="dc-title">📊 Stats</div>
      <div class="dc-body" id="dcb-stats">
        <div class="dc-spinner">⟳</div>
      </div>
    </div>
  </div>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f1f5f9;padding:14px}
.dash-app{max-width:560px}
.dash-header{display:flex;flex-direction:column;gap:8px;margin-bottom:12px}
.dash-header h1{font-size:18px;font-weight:800}
.dh-controls{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.dh-controls select,.dh-controls input{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:5px 8px;border-radius:7px;font-size:12px}
.dh-controls select:focus,.dh-controls input:focus{outline:none;border-color:#3b82f6}
.dh-controls button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:5px 12px;border-radius:7px;cursor:pointer;font-size:12px;transition:.2s}
.dh-controls button:hover{border-color:#3b82f6;color:#7dd3fc}
.dh-status{font-size:10px;color:#475569;font-family:monospace;margin-left:auto}

.dash-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.dash-card{background:#1e293b;border-radius:10px;overflow:hidden;display:flex;flex-direction:column;border:1px solid #1e293b;transition:.2s}
.dash-card:hover{border-color:#334155}
.dc-wide{grid-column:span 2}
.dc-title{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;padding:10px 12px 8px;border-bottom:1px solid #0f172a;display:flex;align-items:center;gap:6px;flex-shrink:0}
.dc-body{padding:10px 12px;flex:1;overflow-y:auto;max-height:200px}
.dc-footer{padding:5px 12px;font-size:9px;color:#334155;font-family:monospace;border-top:1px solid #0f172a}
.dc-spinner{color:#334155;font-size:20px;text-align:center;padding:20px;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.dc-error{color:#f87171;font-size:11px;padding:8px;font-family:monospace}

/* Weather */
.dw-city{font-size:14px;font-weight:700;color:#fff;margin-bottom:4px}
.dw-main{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.dw-icon{font-size:28px}.dw-temp{font-size:24px;font-weight:800;color:#fff}
.dw-desc{font-size:11px;color:#94a3b8}
.dw-details{display:grid;grid-template-columns:1fr 1fr;gap:3px}
.dw-d{font-size:10px;color:#64748b;font-family:monospace}

/* Users */
.du-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #0f172a;cursor:pointer;transition:.15s}
.du-item:last-child{border-bottom:none}
.du-item:hover .du-name{color:#7dd3fc}
.du-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
.du-name{font-size:12px;font-weight:600;color:#f1f5f9;margin-bottom:1px}
.du-email{font-size:10px;color:#475569}

/* Repos */
.dr-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.dr-item{background:#0f172a;border-radius:8px;padding:8px;border:1px solid #1e293b;transition:.15s}
.dr-item:hover{border-color:#334155}
.dr-name{font-size:12px;font-weight:700;color:#7dd3fc;margin-bottom:3px;font-family:monospace}
.dr-desc{font-size:10px;color:#64748b;margin-bottom:5px;line-height:1.4}
.dr-meta{display:flex;gap:8px;font-size:9px;font-family:monospace;color:#334155}
.dr-stars{color:#fcd34d}

/* Stats */
.dst-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #0f172a}
.dst-item:last-child{border-bottom:none}
.dst-icon{font-size:16px;width:24px;text-align:center}
.dst-label{font-size:11px;color:#64748b;flex:1}
.dst-val{font-size:13px;font-weight:700;color:#f1f5f9;font-family:monospace}`,
    `const fakeDelay = ms => new Promise(r => setTimeout(r, ms));
const CACHE = {};
const WEATHER_DATA = ${JSON.stringify(FAKE_WEATHER)};
const GH_REPOS_DATA = {
  torvalds:[{name:'linux',stars:177000,lang:'C',desc:'Linux kernel source'},{name:'uemacs',stars:2200,lang:'C',desc:'uEmacs/PK'},{name:'read-edid',stars:280,lang:'C',desc:'Read EDID'},{name:'subsurface',stars:1900,lang:'C',desc:'Dive log'}],
  gaearon:[{name:'react',stars:225000,lang:'JS',desc:'UI library'},{name:'redux',stars:60500,lang:'JS',desc:'State mgr'},{name:'react-hot-loader',stars:12500,lang:'JS',desc:'Hot reload'},{name:'overreacted',stars:8200,lang:'JS',desc:'Personal blog'}],
  sindresorhus:[{name:'awesome',stars:323000,lang:null,desc:'Awesome lists'},{name:'got',stars:14200,lang:'JS',desc:'HTTP lib'},{name:'execa',stars:6800,lang:'JS',desc:'Process exec'},{name:'ora',stars:9100,lang:'JS',desc:'Spinner'}],
};
const USERS = ${JSON.stringify(FAKE_USERS)};

let autoRefreshId = null;
let weatherCtrl = null;
let loadedUsers = [];
let loadStats = { requests:0, cached:0, errors:0, lastUpdate:null };

function cacheGet(key) { const e=CACHE[key]; if(!e) return null; if(Date.now()-e.ts>300000) { delete CACHE[key]; return null; } loadStats.cached++; return structuredClone(e.data); }
function cacheSet(key, data) { CACHE[key] = { data:structuredClone(data), ts:Date.now() }; }

async function fakeAPI(key, delay) {
  const cached = cacheGet(key);
  if(cached) return cached;
  await fakeDelay(delay);
  return null; // сигнал що потрібно завантажити
}

async function loadAll() {
  setStatus('⏳ Завантаження...');
  showSpinner('weather'); showSpinner('users'); showSpinner('repos'); showSpinner('stats');
  loadStats.requests++;
  const t0 = Date.now();

  try {
    const [weather, users, repos] = await Promise.all([
      loadWeather(),
      loadUsers(),
      loadRepos(),
    ]);
    renderStats();
    setStatus('✅ ' + Math.round(Date.now()-t0) + 'ms · ' + loadStats.requests + ' req, ' + loadStats.cached + ' cached');
  } catch(err) {
    setStatus('❌ ' + err.message);
    loadStats.errors++;
  }
  loadStats.lastUpdate = new Date();
  setupAutoRefresh();
}

async function loadWeather() {
  const city = document.getElementById('dash-city').value;
  const cached = cacheGet('weather:'+city);
  if(cached) { renderWeather(cached); return cached; }
  await fakeDelay(300+Math.random()*200);
  const data = WEATHER_DATA[city];
  cacheSet('weather:'+city, data);
  renderWeather(data);
  return data;
}

async function loadUsers() {
  const cached = cacheGet('users');
  if(cached) { loadedUsers = cached; renderUsers(cached); return cached; }
  await fakeDelay(250+Math.random()*200);
  cacheSet('users', USERS);
  loadedUsers = USERS;
  renderUsers(USERS);
  return USERS;
}

async function loadRepos() {
  const user = document.getElementById('gh-select').value;
  const cached = cacheGet('repos:'+user);
  if(cached) { renderRepos(cached); return cached; }
  await fakeDelay(350+Math.random()*200);
  const data = GH_REPOS_DATA[user] || [];
  cacheSet('repos:'+user, data);
  renderRepos(data);
  return data;
}

function renderWeather(w) {
  const body = document.getElementById('dcb-weather');
  body.innerHTML = \`<div class="dw-city">\${w.city}</div>
    <div class="dw-main"><div class="dw-icon">\${w.icon}</div>
      <div><div class="dw-temp">\${w.temp}°C</div><div class="dw-desc">\${w.desc}</div></div>
    </div>
    <div class="dw-details">
      <div class="dw-d">💧 \${w.humidity}%</div>
      <div class="dw-d">💨 \${w.wind} m/s</div>
      <div class="dw-d">🌡 відч. \${w.feels_like}°C</div>
    </div>\`;
  document.getElementById('dcf-weather').textContent = 'TTL: 5min · auto-refresh: 30s';
}

function renderUsers(users) {
  const body = document.getElementById('dcb-users');
  body.innerHTML = users.slice(0,5).map(u =>
    \`<div class="du-item"><div class="du-avatar">\${u.name[0]}</div>
      <div><div class="du-name">\${u.name}</div><div class="du-email">\${u.email}</div></div>
    </div>\`).join('');
}

function renderRepos(repos) {
  const body = document.getElementById('dcb-repos');
  body.innerHTML = '<div class="dr-grid">' + repos.map(r =>
    \`<div class="dr-item">
      <div class="dr-name">\${r.name}</div>
      <div class="dr-desc">\${r.desc}</div>
      <div class="dr-meta"><span class="dr-stars">⭐ \${r.stars.toLocaleString()}</span><span>\${r.lang||'—'}</span></div>
    </div>\`).join('') + '</div>';
}

function renderStats() {
  const body = document.getElementById('dcb-stats');
  const cacheSize = Object.keys(CACHE).length;
  body.innerHTML = [
    { icon:'📡', label:'HTTP запити', val: loadStats.requests },
    { icon:'💾', label:'Кеш хіти', val: loadStats.cached },
    { icon:'❌', label:'Помилки', val: loadStats.errors },
    { icon:'📦', label:'Кеш записів', val: cacheSize },
    { icon:'🕒', label:'Оновлено', val: loadStats.lastUpdate ? loadStats.lastUpdate.toLocaleTimeString('uk-UA',{hour12:false}) : '—' },
  ].map(({icon,label,val}) =>
    \`<div class="dst-item"><div class="dst-icon">\${icon}</div><div class="dst-label">\${label}</div><div class="dst-val">\${val}</div></div>\`
  ).join('');
}

function filterUsers() {
  const q = document.getElementById('user-search').value.toLowerCase();
  const filtered = loadedUsers.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  renderUsers(filtered);
}

function showSpinner(key) {
  document.getElementById('dcb-' + key).innerHTML = '<div class="dc-spinner">⟳</div>';
}
function setStatus(text) { document.getElementById('dh-status').textContent = text; }

async function refreshWeather() {
  if(weatherCtrl) weatherCtrl.abort();
  weatherCtrl = new AbortController();
  showSpinner('weather');
  await loadWeather();
}
async function refreshRepos() { showSpinner('repos'); await loadRepos(); }

function setupAutoRefresh() {
  if(autoRefreshId) clearInterval(autoRefreshId);
  autoRefreshId = setInterval(() => {
    const city = document.getElementById('dash-city').value;
    delete CACHE['weather:' + city]; // invalidate
    loadWeather();
    setStatus('🔄 Auto-refresh (' + new Date().toLocaleTimeString('uk-UA',{hour12:false}) + ')');
  }, 30000);
}

loadAll();`,
    [
      { level:'easy',  uk:'Натисни "Refresh All" → поглянь на Stats: скільки запитів? Натисни знову — скільки cached хітів?', ru:'Нажми "Refresh All" → посмотри Stats: сколько запросов? Нажми снова — сколько cached hits?' },
      { level:'easy',  uk:'Зміни місто в дропдауні Weather → дані оновляться. Зміни GitHub юзера → репозиторії зміняться. Пошук юзера — працює в реальному часі?', ru:'Смени город → данные обновятся. Смени GitHub юзера → репо изменятся. Поиск юзера — работает в реальном времени?' },
      { level:'medium', uk:'Знайди cacheGet() і cacheSet(). Яке TTL? Чому structuredClone використовується при збереженні та читанні?', ru:'Найди cacheGet() и cacheSet(). Какое TTL? Почему structuredClone при сохранении и чтении?' },
      { level:'medium', uk:'Знайди Promise.all([loadWeather, loadUsers, loadRepos]). Чому краще паралельно а не три окремих await? Зміри різницю у часі.', ru:'Найди Promise.all. Почему параллельно лучше трёх await? Измерь разницу во времени.' },
      { level:'hard',  uk:'Додай четвертий блок "Posts" у грід: завантажує 4 останні пости (JSONPlaceholder), клік → показує detail у модальному вікні.', ru:'Добавь блок "Posts": 4 последних поста, клик → detail в модальном окне.' },
      { level:'hard',  uk:'Реалізуй ручне управління кешем: кнопка "🗑 Clear Cache" очищає CACHE{} і показує Stats.cache=0. Додай кнопку "Cache Info" що виводить всі ключі з TTL.', ru:'Реализуй управление кешем: кнопка "Clear Cache" очищает CACHE. "Cache Info" показывает ключи + TTL.' },
      { level:'extra', uk:'Додай темну/світлу теми через CSS custom properties. Кнопка "🌙/☀️" у header перемикає. Збережи вибір у localStorage.', ru:'Добавь тёмную/светлую темы. Кнопка "🌙/☀️" переключает. Сохрани выбор в localStorage.' },
      { level:'extra', uk:'Реалізуй "WebSocket Live Feed" блок у дашборді: підключається при старті і кожні 2 секунди показує "server push" повідомлення (симуляція). AbortController при unmount.', ru:'Реализуй блок "WebSocket Live Feed": подключается и каждые 2 сек показывает server push (симуляция).' },
    ]
  );

})();
