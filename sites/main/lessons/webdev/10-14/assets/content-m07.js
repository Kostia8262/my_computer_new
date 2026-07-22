/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 07 — JavaScript ES6+ · 10–14 Веб-Розробник
   ═══════════════════════════════════════════════════════════ */
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
input,select,textarea{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:8px 12px;border-radius:8px;font-size:13px;font-family:inherit;transition:.2s}
input:focus,select:focus,textarea:focus{outline:none;border-color:#3b82f6}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}
pre.out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:12px;font-family:monospace;color:#94a3b8;min-height:36px;white-space:pre-wrap}`;

  /* ─── 07-01 ──────────────────────────────────────────────── */
  patch('07-01',
    { uk:`<h2>Promise: then, catch, finally — основи</h2>
<p>Promise — об'єкт що представляє результат асинхронної операції. Три стани: pending → fulfilled / rejected.</p>
<h3>Створення</h3>
<pre>const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    const ok = Math.random() > 0.5;
    if (ok) resolve('Успіх!');
    else    reject(new Error('Помилка!'));
  }, 1000);
});</pre>
<h3>Споживання</h3>
<pre>p
  .then(result => console.log('✅', result))
  .catch(err   => console.error('❌', err.message))
  .finally(()  => console.log('🏁 завжди виконується'));

// then() повертає новий Promise → ланцюжок:
fetch('/api/data')
  .then(res  => res.json())
  .then(data => render(data))
  .catch(err => showError(err));</pre>
<h3>Швидкі фабрики</h3>
<pre>Promise.resolve(42)         // fulfilled одразу
Promise.reject(new Error()) // rejected одразу</pre>`,
      ru:`<h2>Promise</h2>
<pre>const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('OK'), 1000);
});

p.then(result => console.log(result))
 .catch(err   => console.error(err))
 .finally(()  => console.log('done'));

// Быстрые фабрики:
Promise.resolve(42)
Promise.reject(new Error())</pre>` },
    `<div class="pr-lab">
  <h2>⚡ Promise Lab</h2>

  <!-- Конструктор промісу -->
  <div class="pr-section">
    <h3>Promise Visualizer</h3>
    <div class="pr-controls">
      <label>Затримка: <span id="pr-delay-v">1000</span>ms
        <input type="range" id="pr-delay" min="200" max="3000" step="100" value="1000"
          oninput="document.getElementById('pr-delay-v').textContent=this.value">
      </label>
      <label>Шанс успіху: <span id="pr-chance-v">70</span>%
        <input type="range" id="pr-chance" min="0" max="100" value="70"
          oninput="document.getElementById('pr-chance-v').textContent=this.value">
      </label>
    </div>
    <div class="pr-btns">
      <button onclick="runPromise()">▶ new Promise()</button>
      <button onclick="runChain()">🔗 .then() chain</button>
      <button onclick="clearLog()">✕</button>
    </div>
    <div class="pr-timeline" id="pr-timeline"></div>
  </div>
</div>`,
    `${BASE}
.pr-lab{max-width:520px}
.pr-section{background:#1e293b;border-radius:10px;padding:12px}
.pr-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.pr-controls{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
.pr-controls label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}
.pr-controls label span{min-width:38px;font-family:monospace;color:#94a3b8}
.pr-controls input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}
.pr-btns{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap}
.pr-btns button{padding:6px 12px;font-size:12px}
.pr-timeline{display:flex;flex-direction:column;gap:4px;min-height:50px}
.pt-entry{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:7px;font-size:12px;font-family:monospace;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:none}}
.pt-pending{background:rgba(245,158,11,.1);border-left:2px solid #f59e0b;color:#fcd34d}
.pt-fulfilled{background:rgba(16,185,129,.1);border-left:2px solid #10b981;color:#6ee7b7}
.pt-rejected{background:rgba(239,68,68,.1);border-left:2px solid #ef4444;color:#fca5a5}
.pt-finally{background:rgba(100,116,139,.1);border-left:2px solid #64748b;color:#94a3b8}
.pt-then{background:rgba(59,130,246,.1);border-left:2px solid #3b82f6;color:#7dd3fc}`,
    `let running = false;
const tl = document.getElementById('pr-timeline');

function addEntry(cls, text) {
  const d = document.createElement('div');
  d.className = 'pt-entry pt-' + cls;
  d.textContent = '[' + new Date().toLocaleTimeString('uk-UA',{hour12:false}) + '] ' + text;
  tl.appendChild(d);
  tl.scrollTop = tl.scrollHeight;
}
function clearLog() { tl.innerHTML = ''; running = false; }

function fakeAsync(delay, chance) {
  return new Promise((resolve, reject) => {
    addEntry('pending', 'Promise → state: PENDING ⏳');
    setTimeout(() => {
      if (Math.random() * 100 < chance) resolve('Дані отримано успішно!');
      else reject(new Error('Помилка мережі'));
    }, delay);
  });
}

function runPromise() {
  if(running) return;
  running = true;
  clearLog();
  const delay  = parseInt(document.getElementById('pr-delay').value);
  const chance = parseInt(document.getElementById('pr-chance').value);
  addEntry('pending', 'Створюємо new Promise()...');
  fakeAsync(delay, chance)
    .then(result => { addEntry('fulfilled', '.then() → FULFILLED ✅  result: "' + result + '"'); })
    .catch(err   => { addEntry('rejected',  '.catch() → REJECTED ❌  err: "' + err.message + '"'); })
    .finally(()  => { addEntry('finally',   '.finally() → завжди виконується 🏁'); running = false; });
}

function runChain() {
  if(running) return;
  running = true;
  clearLog();
  addEntry('pending', 'Ланцюжок .then(): крок 1/3...');
  Promise.resolve(1)
    .then(n => { addEntry('then', '.then(n=1) → повертаємо n*2=2'); return n * 2; })
    .then(n => { addEntry('then', '.then(n=2) → повертаємо n+10=12'); return n + 10; })
    .then(n => { addEntry('fulfilled', '.then(n=12) → фінальний результат: ' + n); })
    .catch(err => addEntry('rejected', '.catch(): ' + err))
    .finally(() => { addEntry('finally', '.finally() 🏁'); running = false; });
}`,
    [
      { level:'easy',   uk:'Постав шанс успіху на 100% і натисни "new Promise()" — завжди fulfilled. Потім 0% — завжди rejected.',  ru:'Поставь шанс 100% → нажми "new Promise()" — всегда fulfilled. Потом 0% — rejected.' },
      { level:'easy',   uk:'Натисни ".then() chain" і прослідкуй як кожен .then() отримує результат попереднього.',  ru:'Нажми ".then() chain" — проследи как каждый .then() получает результат предыдущего.' },
      { level:'medium', uk:'У коді знайди де reject() викликається. Що відбудеться якщо викинути throw new Error() всередині .then()?',  ru:'Найди где reject() вызывается. Что произойдет если throw new Error() внутри .then()?' },
      { level:'medium', uk:'Зміни runChain(): зроби так щоб другий .then() кидав помилку (throw). Перевір що .catch() її зловить.',  ru:'Измени runChain(): второй .then() пусть кидает ошибку. Проверь что .catch() её поймает.' },
      { level:'hard',   uk:'Напиши delay(ms) функцію що повертає Promise який резолвиться через ms мілісекунд. Використай у ланцюжку для послідовної затримки.',  ru:'Напиши delay(ms) которая возвращает Promise, резолвящийся через ms. Используй в цепочке.' },
      { level:'extra',  uk:'Реалізуй retry(fn, times) — функцію що запускає fn() до times разів, поки не отримає fulfilled результат.',  ru:'Реализуй retry(fn, times) — запускает fn() до times раз, пока не получит fulfilled.' },
    ]
  );

  /* ─── 07-02 ──────────────────────────────────────────────── */
  patch('07-02',
    { uk:`<h2>async / await: читаємо асинхронний код як синхронний</h2>
<pre>// async функція завжди повертає Promise
async function fetchUser(id) {
  const res  = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  const user = await res.json();
  return user;
}

// Виклик async функції:
fetchUser(1).then(u => console.log(u)).catch(err => console.error(err));

// або в іншій async функції:
async function main() {
  try {
    const user = await fetchUser(1); // блокує лише цю функцію, не стрімку
    console.log(user.name);
  } catch (err) {
    console.error('Помилка:', err.message);
  }
}</pre>
<h3>Promise .then() vs async/await</h3>
<pre>// Promise chain:
getData()
  .then(data  => process(data))
  .then(result => save(result))
  .catch(err  => handle(err));

// async/await (читається як синхронний код):
async function run() {
  try {
    const data   = await getData();
    const result = await process(data);
    await save(result);
  } catch(err) { handle(err); }
}</pre>`,
      ru:`<h2>async / await</h2>
<pre>async function fetchUser(id) {
  const res  = await fetch('/api/users/' + id);
  const user = await res.json();
  return user; // Promise<user>
}

// Всегда оборачивай в try/catch:
async function main() {
  try {
    const user = await fetchUser(1);
  } catch(err) {
    console.error(err.message);
  }
}</pre>` },
    `<div class="aw-lab">
  <h2>⏳ async/await Lab</h2>

  <!-- Порівняння Promise vs async/await -->
  <div class="aw-section">
    <h3>Promise .then() vs async/await — два підходи, один результат</h3>
    <div class="aw-compare">
      <div class="awc-col">
        <div class="awc-label">Promise .then()</div>
        <div class="awc-code" id="then-code">
          <div class="cc-line">getData()</div>
          <div class="cc-line cc-indent">.then(data =&gt; process(data))</div>
          <div class="cc-line cc-indent">.then(result =&gt; save(result))</div>
          <div class="cc-line cc-indent">.catch(err =&gt; handle(err))</div>
        </div>
        <button onclick="runThen()">▶ Запустити</button>
        <div class="awc-log" id="then-log"></div>
      </div>
      <div class="awc-col">
        <div class="awc-label">async/await</div>
        <div class="awc-code" id="await-code">
          <div class="cc-line">async function run() {</div>
          <div class="cc-line cc-indent">try {</div>
          <div class="cc-line cc-indent2">const data = await getData()</div>
          <div class="cc-line cc-indent2">const result = await process(data)</div>
          <div class="cc-line cc-indent2">await save(result)</div>
          <div class="cc-line cc-indent">} catch(err) { handle(err) }</div>
          <div class="cc-line">}</div>
        </div>
        <button onclick="runAwait()">▶ Запустити</button>
        <div class="awc-log" id="await-log"></div>
      </div>
    </div>
  </div>

  <!-- async pipeline -->
  <div class="aw-section">
    <h3>Async Pipeline (симуляція API запитів)</h3>
    <div class="pipe-steps" id="pipe-steps">
      <div class="ps-step" data-step="0">1. fetch()</div>
      <div class="ps-step" data-step="1">2. res.json()</div>
      <div class="ps-step" data-step="2">3. process()</div>
      <div class="ps-step" data-step="3">4. save()</div>
    </div>
    <div class="pipe-btns">
      <button onclick="runPipeline(false)">▶ Без помилок</button>
      <button onclick="runPipeline(true)">⚠ З помилкою</button>
    </div>
    <pre class="out" id="pipe-out">—</pre>
  </div>
</div>`,
    `${BASE}
.aw-lab{max-width:520px}
.aw-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.aw-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.aw-compare{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.awc-col{display:flex;flex-direction:column;gap:6px}
.awc-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#475569}
.awc-code{background:#0f172a;border-radius:8px;padding:8px;font-family:monospace;font-size:10.5px;line-height:1.6;border:1px solid #1e293b;min-height:80px}
.cc-line{color:#94a3b8}.cc-indent{padding-left:10px}.cc-indent2{padding-left:20px}
.cc-line.hl{background:rgba(59,130,246,.2);color:#7dd3fc;border-radius:3px;padding-left:4px}
.awc-col button{padding:5px;font-size:11px;border-radius:6px}
.awc-log{font-size:11px;font-family:monospace;color:#64748b;min-height:30px;padding:4px;background:#0f172a;border-radius:6px;border:1px solid #1e293b;white-space:pre-wrap}

.pipe-steps{display:flex;gap:3px;margin-bottom:8px;flex-wrap:wrap}
.ps-step{padding:5px 10px;background:#0f172a;border:1px solid #334155;border-radius:6px;font-size:11px;font-family:monospace;color:#64748b;transition:.3s;cursor:default}
.ps-step.active{border-color:#3b82f6;background:rgba(59,130,246,.15);color:#7dd3fc}
.ps-step.done{border-color:#10b981;background:rgba(16,185,129,.1);color:#6ee7b7}
.ps-step.error{border-color:#ef4444;background:rgba(239,68,68,.1);color:#fca5a5}
.pipe-btns{display:flex;gap:6px;margin-bottom:8px}
.pipe-btns button{flex:1;padding:6px;font-size:12px}`,
    `// Симуляція async операцій
const fakeDelay = ms => new Promise(r => setTimeout(r, ms));

async function getData()     { await fakeDelay(400); return { id:1, raw:'[json]' }; }
async function processData(d){ await fakeDelay(300); return { ...d, processed:true }; }
async function saveData(r)   { await fakeDelay(300); return 'saved'; }

// Promise .then()
function runThen() {
  const log = document.getElementById('then-log');
  log.textContent = '⏳ Запуск...\n';
  const lines = document.querySelectorAll('#then-code .cc-line');
  let i = 0;
  const hi = () => { lines.forEach(l=>l.classList.remove('hl')); if(lines[i]) lines[i].classList.add('hl'); };

  hi();
  getData()
    .then(data => { i++; hi(); log.textContent += '✅ getData\n'; return processData(data); })
    .then(res  => { i++; hi(); log.textContent += '✅ process\n'; return saveData(res); })
    .then(()   => { i++; hi(); log.textContent += '✅ save → DONE'; })
    .catch(err => { log.textContent += '❌ ' + err.message; });
}

// async/await
async function runAwait() {
  const log = document.getElementById('await-log');
  log.textContent = '⏳ Запуск...\n';
  const lines = document.querySelectorAll('#await-code .cc-line');
  let i = 2;
  const hi = () => { lines.forEach(l=>l.classList.remove('hl')); if(lines[i]) lines[i].classList.add('hl'); };

  try {
    hi();
    const data = await getData();       log.textContent += '✅ await getData\n'; i++;hi();
    const res  = await processData(data); log.textContent += '✅ await process\n'; i++;hi();
    await saveData(res);                log.textContent += '✅ await save → DONE';
  } catch(err) { log.textContent += '❌ catch: ' + err.message; }
}

// Pipeline
async function runPipeline(withError) {
  const steps = document.querySelectorAll('.ps-step');
  const out   = document.getElementById('pipe-out');
  steps.forEach(s => { s.classList.remove('active','done','error'); });
  out.textContent = 'Запуск async pipeline...\n';

  const activate = i => steps[i].classList.add('active');
  const done     = i => { steps[i].classList.remove('active'); steps[i].classList.add('done'); };
  const fail     = i => { steps[i].classList.remove('active'); steps[i].classList.add('error'); };

  try {
    activate(0); await fakeDelay(500);
    if(withError && Math.random()<.5) throw new Error('Network Error (CORS?)');
    done(0); out.textContent += '✅ fetch() — response 200 OK\n';

    activate(1); await fakeDelay(300);
    done(1); out.textContent += '✅ res.json() — { id:1, name:"Alice" }\n';

    activate(2); await fakeDelay(400);
    if(withError) throw new Error('Invalid data format');
    done(2); out.textContent += '✅ process() — нормалізовано\n';

    activate(3); await fakeDelay(300);
    done(3); out.textContent += '✅ save() — збережено\n\n🎉 Pipeline завершено!';
  } catch(err) {
    const active = [...steps].findIndex(s=>s.classList.contains('active'));
    if(active>=0) fail(active);
    out.textContent += '\n❌ catch(err): ' + err.message + '\n(try/catch зупинив pipeline)';
  }
}`,
    [
      { level:'easy',   uk:'Натисни "▶ Запустити" у обох колонках. Порівняй результат — він однаковий?',  ru:'Нажми "▶ Запустить" в обеих колонках. Результат одинаковый?' },
      { level:'easy',   uk:'Запусти pipeline "Без помилок" і "З помилкою" — поглянь де зупиняється ланцюжок.',  ru:'Запусти pipeline "Без ошибок" и "С ошибкой" — посмотри где останавливается цепочка.' },
      { level:'medium', uk:'У коді знайди "await fakeDelay(400)". Що станеться якщо видалити await? Поясни різницю.',  ru:'Найди "await fakeDelay(400)". Что произойдет без await? Объясни разницу.' },
      { level:'medium', uk:'Перепиши runThen() через async/await (без .then()). Результат має бути ідентичним.',  ru:'Перепиши runThen() через async/await (без .then()). Результат должен совпадать.' },
      { level:'hard',   uk:'Додай до pipeline крок "5. render()" з затримкою 200ms. Він має виконуватись після save().',  ru:'Добавь в pipeline шаг "5. render()" с задержкой 200ms после save().' },
      { level:'extra',  uk:'Реалізуй withTimeout(promise, ms) — обгортка що відхиляє проміс якщо він не виконується за ms мілісекунд.',  ru:'Реализуй withTimeout(promise, ms) — обертка, которая отклоняет промис если он не выполняется за ms.' },
    ]
  );

  /* ─── 07-03 ──────────────────────────────────────────────── */
  patch('07-03',
    { uk:`<h2>Promise.all, race, allSettled, any</h2>
<pre>const p1 = fetch('/api/user');
const p2 = fetch('/api/posts');
const p3 = fetch('/api/comments');

// all: чекає ВСІ, відхиляється якщо ХОЧА Б ОДИН відхилений
const [user, posts, comments] = await Promise.all([p1, p2, p3]);

// allSettled: чекає ВСІ, повертає масив {status, value/reason}
const results = await Promise.allSettled([p1, p2, p3]);
// results[0] = { status:'fulfilled', value: ... }
// results[1] = { status:'rejected',  reason: Error }

// race: перший завершений виграє (fulfilled АБО rejected)
const fastest = await Promise.race([p1, p2, p3]);

// any: перший FULFILLED виграє, відхиляється лише якщо ВСІ rejected
const first = await Promise.any([p1, p2, p3]);</pre>
<h3>Коли що використовувати</h3>
<ul>
  <li><code>all</code> — потрібні результати ВСІХ (залежать один від одного)</li>
  <li><code>allSettled</code> — потрібні всі результати, навіть якщо є помилки</li>
  <li><code>race</code> — таймаут або найшвидша відповідь</li>
  <li><code>any</code> — fallback: перший успішний з кількох джерел</li>
</ul>`,
      ru:`<h2>Promise combinators</h2>
<pre>// all — ждёт ВСЕ, падает если хоть один rejected:
await Promise.all([p1, p2, p3]);

// allSettled — ждёт ВСЕ, возвращает {status, value/reason}:
await Promise.allSettled([p1, p2, p3]);

// race — побеждает первый (fulfilled или rejected):
await Promise.race([p1, p2, p3]);

// any — первый FULFILLED победитель:
await Promise.any([p1, p2, p3]);</pre>` },
    `<div class="comb-lab">
  <h2>🏁 Promise Combinators</h2>

  <!-- Promise Configuration -->
  <div class="comb-section">
    <h3>Налаштуй 3 проміси</h3>
    <div class="comb-promises" id="comb-promises">
      <!-- генерується JS -->
    </div>
  </div>

  <!-- Комбінатори -->
  <div class="comb-section">
    <h3>Обери комбінатор</h3>
    <div class="comb-btns">
      <button onclick="runCombinator('all')">Promise.all</button>
      <button onclick="runCombinator('allSettled')">allSettled</button>
      <button onclick="runCombinator('race')">race</button>
      <button onclick="runCombinator('any')">any</button>
    </div>
  </div>

  <!-- Результат -->
  <div class="comb-section">
    <h3>Візуалізація</h3>
    <div class="comb-visual" id="comb-visual"></div>
    <pre class="out" id="comb-out">Обери комбінатор →</pre>
  </div>
</div>`,
    `${BASE}
.comb-lab{max-width:520px}
.comb-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.comb-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.comb-promises{display:flex;gap:8px;flex-wrap:wrap}
.cp-box{flex:1;min-width:140px;background:#0f172a;border-radius:8px;padding:10px;border:1px solid #334155}
.cp-title{font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:8px;font-family:monospace}
.cp-row{display:flex;align-items:center;gap:6px;margin-bottom:5px;font-size:11px;color:#64748b}
.cp-row select,.cp-row input{padding:3px 6px;font-size:11px;width:80px}

.comb-btns{display:flex;gap:5px;flex-wrap:wrap}
.comb-btns button{flex:1;padding:6px 8px;font-size:11px;border-radius:6px;min-width:80px}

.comb-visual{display:flex;gap:5px;margin-bottom:8px;min-height:40px;flex-wrap:wrap}
.cv-bar{flex:1;min-width:60px;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;gap:3px;padding:6px}
.cvb-label{font-size:10px;font-weight:700;font-family:monospace;color:#64748b;margin-bottom:4px}
.cvb-progress{height:5px;border-radius:3px;background:#334155;overflow:hidden}
.cvb-fill{height:100%;width:0;border-radius:3px;transition:width linear}
.cvb-status{font-size:10px;font-family:monospace;min-height:14px}
.cv-result{flex:1;min-width:100px;background:#0f172a;border-radius:6px;padding:8px;border:1px solid #334155;font-size:11px;font-family:monospace}`,
    `const CONFIGS = [
  { name:'P1', delay:800,  fail:false },
  { name:'P2', delay:1400, fail:false },
  { name:'P3', delay:600,  fail:false },
];

// Рендеримо controls
function renderControls() {
  const c = document.getElementById('comb-promises');
  c.innerHTML = CONFIGS.map((cfg,i) => \`
    <div class="cp-box">
      <div class="cp-title">\${cfg.name}</div>
      <div class="cp-row">⏱
        <input type="number" value="\${cfg.delay}" min="100" max="3000" step="100"
          oninput="CONFIGS[\${i}].delay=parseInt(this.value)||800" style="width:65px">ms
      </div>
      <div class="cp-row">
        <label><input type="checkbox" \${cfg.fail?'checked':''} onchange="CONFIGS[\${i}].fail=this.checked" style="accent-color:#ef4444">
        Відхилити</label>
      </div>
    </div>\`).join('');
}
renderControls();

function makePromise(cfg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(cfg.fail) reject(new Error(\`\${cfg.name} rejected\`));
      else resolve(\`\${cfg.name}: "data ok"\`);
    }, cfg.delay);
  });
}

async function runCombinator(type) {
  const vis = document.getElementById('comb-visual');
  const out = document.getElementById('comb-out');
  out.textContent = \`Promise.\${type}() → запущено...\`;

  // Візуалізація прогресу
  const bars = {};
  vis.innerHTML = CONFIGS.map(cfg => \`
    <div class="cv-bar" id="bar-\${cfg.name}">
      <div class="cvb-label">\${cfg.name}</div>
      <div class="cvb-progress"><div class="cvb-fill" id="fill-\${cfg.name}" style="background:\${cfg.fail?'#ef4444':'#3b82f6'}"></div></div>
      <div class="cvb-status" id="st-\${cfg.name}">⏳ pending</div>
    </div>\`).join('') + \`<div class="cv-result" id="cv-result">…</div>\`;

  const promises = CONFIGS.map(cfg => {
    const start = Date.now();
    const p = makePromise(cfg);
    const fill = document.getElementById('fill-' + cfg.name);
    const st   = document.getElementById('st-'   + cfg.name);
    // animate progress bar
    const timer = setInterval(() => {
      const pct = Math.min(100, (Date.now()-start)/cfg.delay*100);
      fill.style.width = pct + '%';
    }, 30);
    p.then(v => { clearInterval(timer); fill.style.width='100%'; st.textContent='✅ '+(cfg.fail?'':v); })
     .catch(e => { clearInterval(timer); fill.style.width='100%'; fill.style.background='#ef4444'; st.textContent='❌ '+e.message; });
    return p;
  });

  const resEl = document.getElementById('cv-result');
  try {
    let result;
    if(type==='all')        result = await Promise.all(promises);
    else if(type==='allSettled') result = await Promise.allSettled(promises);
    else if(type==='race')  result = await Promise.race(promises);
    else if(type==='any')   result = await Promise.any(promises);

    resEl.style.color = '#6ee7b7';
    resEl.textContent = '✅ ' + JSON.stringify(result, null, 2);
    out.textContent = \`Promise.\${type}() → FULFILLED\n\${JSON.stringify(result, null, 2)}\`;
  } catch(err) {
    resEl.style.color = '#fca5a5';
    resEl.textContent = '❌ ' + err.message;
    out.textContent = \`Promise.\${type}() → REJECTED\n\${err.message}\`;
  }
}`,
    [
      { level:'easy',   uk:'Запусти Promise.all без помилок. Потім відмітив "Відхилити" для P2 і запусти знову. Що змінилось?',  ru:'Запусти Promise.all без ошибок. Потом отметь "Отклонить" для P2 — что изменилось?' },
      { level:'easy',   uk:'Відмітив "Відхилити" для P1 та P3. Запусти allSettled. Яке у кожного status у результаті?',  ru:'Отметь "Отклонить" для P1 и P3. Запусти allSettled. Какой у каждого status?' },
      { level:'medium', uk:'Постав P1=2000ms, P2=500ms, P3=1000ms. Запусти race — яке ім\'я у результаті і чому?',  ru:'Поставь P1=2000ms, P2=500ms, P3=1000ms. Запусти race — чье имя в результате?' },
      { level:'medium', uk:'Відмітив "Відхилити" для P1 та P2. Запусти any — яке ім\'я у результаті? Тепер усі три — що станеться?',  ru:'Отметь "Отклонить" P1 и P2. Запусти any — чье имя? Теперь все три — что произойдет?' },
      { level:'hard',   uk:'Напиши fetchWithFallback(urls) — намагається кожну URL послідовно, повертає першу успішну відповідь через Promise.any.',  ru:'Напиши fetchWithFallback(urls) — пробует каждый URL, возвращает первый успешный через Promise.any.' },
      { level:'extra',  uk:'Реалізуй Promise.allLimited(promises, concurrency) — виконує не більше concurrency промісів одночасно.',  ru:'Реализуй Promise.allLimited(promises, concurrency) — выполняет не более concurrency промисов одновременно.' },
    ]
  );

  /* ─── 07-04 ──────────────────────────────────────────────── */
  patch('07-04',
    { uk:`<h2>Error handling у async коді</h2>
<h3>Стратегії обробки помилок</h3>
<pre>// 1. try/catch в async функції
async function load() {
  try {
    const data = await fetchData();
    return process(data);
  } catch (err) {
    if (err instanceof NetworkError) retry();
    else throw err; // прокидаємо далі
  }
}

// 2. .catch() на виклику
load().catch(err => showToast(err.message));

// 3. Кастомні класи помилок
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
throw new ApiError('Not Found', 404);</pre>
<h3>Типові помилки</h3>
<pre>// Пропущений catch → UnhandledPromiseRejection!
async function bad() { await willFail(); } // ❌

// Помилка всередині callback не ловиться:
async function tricky() {
  try {
    [1,2,3].forEach(async n => {
      await doSomething(n); // ❌ помилки тут НЕ ловляться!
    });
  } catch(e) { /* не спрацює для forEach */ }
  // ✅ використовуй for...of:
  for (const n of [1,2,3]) { await doSomething(n); }
}</pre>`,
      ru:`<h2>Error handling в async</h2>
<pre>// try/catch:
async function load() {
  try {
    const data = await fetchData();
  } catch(err) {
    if(err instanceof NetworkError) retry();
    else throw err;
  }
}

// Кастомные классы:
class ApiError extends Error {
  constructor(msg, status) {
    super(msg);
    this.name = 'ApiError';
    this.status = status;
  }
}

// ОСТОРОЖНО: forEach + async не ловится!
// Используй for...of вместо forEach.</pre>` },
    `<div class="err-lab">
  <h2>🛡 Error Handling Lab</h2>

  <!-- Кастомні класи помилок -->
  <div class="err-section">
    <h3>Custom Error Classes</h3>
    <div class="err-types" id="err-types">
      <button onclick="triggerError('network')">NetworkError</button>
      <button onclick="triggerError('api')">ApiError 404</button>
      <button onclick="triggerError('api500')">ApiError 500</button>
      <button onclick="triggerError('validation')">ValidationError</button>
      <button onclick="triggerError('auth')">AuthError</button>
    </div>
    <pre class="out" id="err-out">Натисни на тип помилки →</pre>
  </div>

  <!-- forEach vs for...of -->
  <div class="err-section">
    <h3>forEach (async) vs for...of — пастка!</h3>
    <div class="fof-btns">
      <button onclick="runForEach()">❌ forEach + async</button>
      <button onclick="runForOf()">✅ for...of + await</button>
    </div>
    <pre class="out" id="fof-out">—</pre>
  </div>

  <!-- Error cascade -->
  <div class="err-section">
    <h3>Error propagation cascade</h3>
    <div class="casc-btns">
      <button onclick="runCascade(false)">▶ Без помилок</button>
      <button onclick="runCascade(true)">⚠ З помилкою на кроці 2</button>
    </div>
    <div class="casc-steps" id="casc-steps">
      <div class="css-step" id="cs0">step1()</div>
      <span class="cs-arr">→</span>
      <div class="css-step" id="cs1">step2()</div>
      <span class="cs-arr">→</span>
      <div class="css-step" id="cs2">step3()</div>
      <span class="cs-arr">→</span>
      <div class="css-step cs-final" id="cs3">result</div>
    </div>
    <pre class="out" id="casc-out">—</pre>
  </div>
</div>`,
    `${BASE}
.err-lab{max-width:520px}
.err-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.err-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.err-types,.fof-btns,.casc-btns{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
.err-types button,.fof-btns button,.casc-btns button{padding:5px 10px;font-size:11px;border-radius:6px}
.casc-steps{display:flex;align-items:center;gap:4px;margin-bottom:8px;flex-wrap:wrap}
.css-step{background:#0f172a;border:1px solid #334155;border-radius:6px;padding:7px 10px;font-size:11px;font-family:monospace;transition:.2s;color:#94a3b8}
.css-step.active{border-color:#3b82f6;color:#7dd3fc;background:rgba(59,130,246,.1)}
.css-step.done{border-color:#10b981;color:#6ee7b7;background:rgba(16,185,129,.1)}
.css-step.error{border-color:#ef4444;color:#fca5a5;background:rgba(239,68,68,.1)}
.cs-final{border-color:#334155}
.cs-arr{color:#334155;font-size:14px}`,
    `const fakeDelay = ms => new Promise(r => setTimeout(r, ms));

class NetworkError extends Error { constructor(m){super(m);this.name='NetworkError';} }
class ApiError     extends Error { constructor(m,s){super(m);this.name='ApiError';this.status=s;} }
class ValidationError extends Error { constructor(m){super(m);this.name='ValidationError';} }
class AuthError    extends Error { constructor(m){super(m);this.name='AuthError';} }

function triggerError(type) {
  let err;
  if(type==='network')    err = new NetworkError('Connection refused');
  else if(type==='api')   err = new ApiError('Not Found', 404);
  else if(type==='api500')err = new ApiError('Internal Server Error', 500);
  else if(type==='validation') err = new ValidationError('Field "email" is required');
  else if(type==='auth')  err = new AuthError('Token expired — login required');

  // instanceof chain (поліморфна обробка)
  let advice;
  if(err instanceof NetworkError)    advice = '→ retry() або показати "Перевір з\'єднання"';
  else if(err instanceof ApiError && err.status===404) advice = '→ navigate to 404 page';
  else if(err instanceof ApiError && err.status>=500) advice = '→ showServerErrorBanner()';
  else if(err instanceof ValidationError) advice = '→ підсвіти поле з помилкою';
  else if(err instanceof AuthError)  advice = '→ redirect to /login';

  document.getElementById('err-out').textContent =
    \`throw new \${err.name}("\${err.message}")\n\nerr instanceof \${err.name}: true\nerr.message: "\${err.message}"\n\${err.status ? 'err.status: '+err.status+'\n' : ''}err.stack: \${err.name}: \${err.message}\n    at triggerError (script.js)\n\nОбробка: \${advice}\`;
}

// forEach trap
async function runForEach() {
  const out = document.getElementById('fof-out');
  out.textContent = '❌ forEach + async (помилки НЕ ловляться!):\n';
  const nums = [1,2,3];
  let caught = false;
  try {
    nums.forEach(async n => {
      await fakeDelay(200);
      if(n===2) throw new Error('Помилка в forEach на n=2');
      out.textContent += '✅ forEach item ' + n + '\n';
    });
  } catch(e) {
    caught = true;
    out.textContent += '(це ніколи не виконається!)\n';
  }
  await fakeDelay(600);
  out.textContent += caught ? '❌ Catch спрацював' :
    '\n⚠ Catch НЕ спрацював! Помилка з forEach пропала мовчки.\n→ Використовуй for...of замість forEach з async!';
}

async function runForOf() {
  const out = document.getElementById('fof-out');
  out.textContent = '✅ for...of + await (помилки ловляться!):\n';
  try {
    for(const n of [1,2,3]) {
      await fakeDelay(200);
      if(n===2) throw new Error('Помилка на n=2');
      out.textContent += '✅ for...of item ' + n + '\n';
    }
  } catch(e) {
    out.textContent += '✅ catch() зловив: ' + e.message + '\n→ Виконання зупинилось коректно!';
  }
}

async function runCascade(withErr) {
  const out = document.getElementById('casc-out');
  const steps = [0,1,2,3].map(i => document.getElementById('cs'+i));
  steps.forEach(s => s.className = 'css-step' + (s.classList.contains('cs-final') ? ' cs-final' : ''));
  out.textContent = 'Запуск cascade...\n';

  async function step1() { await fakeDelay(300); return 'data-A'; }
  async function step2(d) { await fakeDelay(300); if(withErr) throw new ApiError('Step 2 failed',503); return d+'-B'; }
  async function step3(d) { await fakeDelay(300); return d+'-C (final)'; }

  try {
    steps[0].classList.add('active');
    const r1 = await step1(); steps[0].classList.replace('active','done'); out.textContent += '✅ step1 → '+r1+'\n';
    steps[1].classList.add('active');
    const r2 = await step2(r1); steps[1].classList.replace('active','done'); out.textContent += '✅ step2 → '+r2+'\n';
    steps[2].classList.add('active');
    const r3 = await step3(r2); steps[2].classList.replace('active','done'); out.textContent += '✅ step3 → '+r3+'\n';
    steps[3].classList.add('done'); out.textContent += '🎉 result: "'+r3+'"';
  } catch(err) {
    steps.forEach(s=>{ if(s.classList.contains('active')) s.classList.replace('active','error'); });
    out.textContent += '❌ catch: '+err.name+': '+err.message+'\n(Cascade зупинився — step3 не виконався!)';
  }
}`,
    [
      { level:'easy',   uk:'Натисни кожен тип помилки — зверни увагу на instanceof chain. Яке "advice" для ApiError 500?',  ru:'Нажми каждый тип ошибки — обрати внимание на instanceof chain. Какой "advice" для ApiError 500?' },
      { level:'easy',   uk:'Запусти cascade "Без помилок" і "З помилкою на кроці 2". Яка різниця у стані step3?',  ru:'Запусти cascade без ошибок и с ошибкой. Какая разница в состоянии step3?' },
      { level:'medium', uk:'Запусти "forEach + async" — чому помилка на n=2 не ловиться? Прочитай пояснення і своїми словами поясни механізм.',  ru:'Запусти "forEach + async" — почему ошибка на n=2 не ловится? Объясни механизм.' },
      { level:'medium', uk:'Розшир ApiError: додай поле retryAfter (секунди). Покажи його у triggerError() для status=503.',  ru:'Расширь ApiError: добавь поле retryAfter. Покажи его в triggerError() для status=503.' },
      { level:'hard',   uk:'Напиши safeAsync(fn) — обгортку що перехоплює помилки і повертає [result, null] або [null, error] замість throw.',  ru:'Напиши safeAsync(fn) — обертку что возвращает [result, null] или [null, error] вместо throw.' },
      { level:'extra',  uk:'Реалізуй retryWithBackoff(fn, maxRetries) — повторює fn() до maxRetries разів з exponential backoff (100ms, 200ms, 400ms...).',  ru:'Реализуй retryWithBackoff(fn, maxRetries) — повторяет fn() с exponential backoff.' },
    ]
  );

  /* ─── 07-05 ──────────────────────────────────────────────── */
  patch('07-05',
    { uk:`<h2>ES6 Modules: import / export (named та default)</h2>
<pre>// ─── math.js (модуль) ───────────────────────────────────
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function sub(a, b) { return a - b; }
export default class Calculator { /* ... */ }

// ─── main.js (споживач) ─────────────────────────────────
import Calculator from './math.js';            // default
import { PI, add, sub } from './math.js';      // named
import { add as plus } from './math.js';       // аліас
import * as math from './math.js';             // namespace</pre>
<h3>Повторний експорт (re-export)</h3>
<pre>// index.js — barrel file:
export { add, sub }  from './math.js';
export { default as Calculator } from './math.js';
export * from './utils.js'; // все з utils</pre>
<h3>Особливості модулів</h3>
<ul>
  <li>Завжди у strict mode</li>
  <li>Виконуються один раз (сингелтон)</li>
  <li>Живі прив'язки (live bindings) — не копії</li>
  <li>top-level await (у ES2022)</li>
</ul>`,
      ru:`<h2>ES6 Modules</h2>
<pre>// math.js:
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calc { }

// main.js:
import Calc from './math.js';          // default
import { PI, add } from './math.js';   // named
import { add as plus } from './math.js'; // alias
import * as math from './math.js';     // namespace

// barrel file (index.js):
export { add } from './math.js';
export * from './utils.js';</pre>` },
    `<div class="mod-lab">
  <h2>📦 ES6 Modules</h2>

  <!-- Module system visualizer -->
  <div class="mod-section">
    <h3>Module Dependency Graph</h3>
    <div class="mod-graph" id="mod-graph">
      <div class="mg-file" id="mg-main">
        <div class="mgf-name">📄 main.js</div>
        <div class="mgf-imports" id="main-imports"></div>
      </div>
      <div class="mg-sep">↓ import from</div>
      <div class="mg-files-row">
        <div class="mg-file" id="mg-math">
          <div class="mgf-name">📦 math.js</div>
          <div class="mgf-exports">
            <div class="mge-item mge-default">default: Calculator</div>
            <div class="mge-item mge-named">PI = 3.14159</div>
            <div class="mge-item mge-named">add(a,b)</div>
            <div class="mge-item mge-named">sub(a,b)</div>
            <div class="mge-item mge-named">mul(a,b)</div>
          </div>
        </div>
        <div class="mg-file" id="mg-utils">
          <div class="mgf-name">📦 utils.js</div>
          <div class="mgf-exports">
            <div class="mge-item mge-named">format(n)</div>
            <div class="mge-item mge-named">clamp(n,mn,mx)</div>
            <div class="mge-item mge-named">range(n)</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mod-import-builder">
      <h3>Import Builder</h3>
      <select id="mod-source" onchange="buildImport()">
        <option value="math">math.js</option>
        <option value="utils">utils.js</option>
      </select>
      <select id="mod-style" onchange="buildImport()">
        <option value="named">named { }</option>
        <option value="default">default</option>
        <option value="namespace">namespace * as</option>
        <option value="mixed">mixed</option>
      </select>
      <pre class="out" id="import-preview">—</pre>
    </div>
  </div>

  <!-- Live module simulation -->
  <div class="mod-section">
    <h3>Симуляція модульного коду</h3>
    <div class="mod-sim-btns">
      <button onclick="simAdd()">math.add(3, 7)</button>
      <button onclick="simCalc()">new Calculator()</button>
      <button onclick="simNamespace()">math.* namespace</button>
      <button onclick="simBarrel()">barrel index.js</button>
    </div>
    <pre class="out" id="mod-out">—</pre>
  </div>
</div>`,
    `${BASE}
.mod-lab{max-width:520px}
.mod-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.mod-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.mod-graph{display:flex;flex-direction:column;align-items:center;gap:6px;margin-bottom:12px}
.mg-file{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px;width:100%;max-width:420px}
.mgf-name{font-size:12px;font-weight:700;color:#f1f5f9;margin-bottom:6px;font-family:monospace}
.mgf-exports{display:flex;flex-wrap:wrap;gap:4px}
.mge-item{padding:2px 8px;border-radius:10px;font-size:10px;font-family:monospace}
.mge-default{background:rgba(245,158,11,.15);color:#fcd34d;border:1px solid rgba(245,158,11,.3)}
.mge-named{background:rgba(59,130,246,.1);color:#7dd3fc;border:1px solid rgba(59,130,246,.2)}
.mgf-imports{display:flex;flex-wrap:wrap;gap:4px}
.mg-sep{font-size:11px;color:#475569;font-family:monospace}
.mg-files-row{display:flex;gap:8px;width:100%;max-width:420px}
.mg-files-row .mg-file{flex:1}

.mod-import-builder{margin-top:10px}
.mod-import-builder select{margin-right:6px;padding:5px 8px;font-size:12px;margin-bottom:8px}
.mod-sim-btns{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
.mod-sim-btns button{flex:1;min-width:100px;padding:5px 8px;font-size:11px}`,
    `// Симуляція модулів
const MATH = {
  PI: 3.14159,
  add: (a,b) => a + b,
  sub: (a,b) => a - b,
  mul: (a,b) => a * b,
};
class Calculator {
  constructor(){ this.history = []; }
  calc(op, a, b) {
    const r = op==='add' ? a+b : op==='sub' ? a-b : a*b;
    this.history.push({ op,a,b,r });
    return r;
  }
}
const UTILS = {
  format: n => n.toFixed(2),
  clamp: (n,mn,mx) => Math.max(mn,Math.min(mx,n)),
  range: n => Array.from({length:n},(_,i)=>i),
};

// Import builder
const EXPORTS = {
  math:  { default:'Calculator', named:['PI','add','sub','mul'] },
  utils: { named:['format','clamp','range'] },
};

function buildImport() {
  const src   = document.getElementById('mod-source').value;
  const style = document.getElementById('mod-style').value;
  const exp   = EXPORTS[src];
  let line;
  if(style==='default')   line = exp.default ? \`import \${exp.default} from './\${src}.js';\` : '// немає default export';
  else if(style==='named') line = \`import { \${exp.named.join(', ')} } from './\${src}.js';\`;
  else if(style==='namespace') line = \`import * as \${src} from './\${src}.js';\`;
  else line = [
    exp.default ? \`import \${exp.default}, { \${exp.named.slice(0,2).join(', ')} } from './\${src}.js';\` : null,
    exp.default ? null : \`import { \${exp.named.join(', ')} } from './\${src}.js';\`,
  ].filter(Boolean).join('\n');
  document.getElementById('import-preview').textContent = '// ' + src + '.js imports:\n' + line;
  // підсвітка у графі
  document.querySelectorAll('.mg-file').forEach(f=>f.style.borderColor='');
  const tgt = document.getElementById('mg-' + src);
  if(tgt) tgt.style.borderColor = '#3b82f6';
}
buildImport();

function simAdd() {
  const r = MATH.add(3,7);
  document.getElementById('mod-out').textContent =
    \`// import { add } from './math.js';\n\nadd(3, 7) → \${r}\n\n// math.js виконується ОДИН раз (singleton)\n// add — live binding, не копія\`;
}
function simCalc() {
  const c = new Calculator();
  const r1 = c.calc('add',10,5); const r2 = c.calc('mul',3,4);
  document.getElementById('mod-out').textContent =
    \`// import Calculator from './math.js'; (default)\n\nconst c = new Calculator();\nc.calc('add',10,5) → \${r1}\nc.calc('mul',3,4) → \${r2}\nc.history → \${JSON.stringify(c.history)}\`;
}
function simNamespace() {
  document.getElementById('mod-out').textContent =
    \`// import * as math from './math.js';\n\nmath.PI  → \${MATH.PI}\nmath.add(3,7) → \${MATH.add(3,7)}\nmath.sub(10,3) → \${MATH.sub(10,3)}\nmath.mul(4,5) → \${MATH.mul(4,5)}\n\n// Namespace = читати-only об'єкт з усіма named exports\`;
}
function simBarrel() {
  document.getElementById('mod-out').textContent =
    \`// index.js (barrel file):\nexport { add, sub, mul } from './math.js';\nexport { default as Calculator } from './math.js';\nexport * from './utils.js';\n\n// Споживач:\n// import { add, Calculator, format } from './index.js';\n// Замість окремих imports для кожного файлу!\n\nformat(MATH.PI) → \${UTILS.format(MATH.PI)}\nrange(5) → [\${UTILS.range(5)}]\nclamp(150, 0, 100) → \${UTILS.clamp(150,0,100)}\`;
}`,
    [
      { level:'easy',   uk:'Перемикай джерело (math.js / utils.js) і стиль import — поглянь як змінюється згенерований рядок import.',  ru:'Переключай источник и стиль — смотри как меняется строка import.' },
      { level:'easy',   uk:'Натисни всі 4 кнопки симуляції. Яка різниця між default і named export у результаті?',  ru:'Нажми все 4 кнопки симуляции. Какая разница между default и named export?' },
      { level:'medium', uk:'Поясни чому utils.js не має default export. Коли краще використовувати default, а коли named?',  ru:'Объясни почему utils.js без default export. Когда лучше default, а когда named?' },
      { level:'medium', uk:'Знайди simBarrel() у коді. Навіщо потрібен barrel file? Як він спрощує import у споживачів?',  ru:'Найди simBarrel(). Зачем нужен barrel file? Как он упрощает import?' },
      { level:'hard',   uk:'Розшир симуляцію: додай четвертий модуль "validators.js" з named exports isEmail, isPhone, isAge. Оновіть barrel.',  ru:'Добавь модуль "validators.js" с isEmail, isPhone, isAge. Обнови barrel.' },
      { level:'extra',  uk:'Поясни концепцію "live bindings" у ES modules. Чим відрізняється від CommonJS require()? Напиши демо що показує різницю.',  ru:'Объясни "live bindings" в ES modules. Чем отличается от CommonJS? Напиши демо.' },
    ]
  );

  /* ─── 07-06 ──────────────────────────────────────────────── */
  patch('07-06',
    { uk:`<h2>Dynamic import(): ліниве завантаження модулів</h2>
<pre>// Статичний import (завжди зверху, завжди завантажується):
import { heavyLib } from './heavy.js'; // ❌ якщо рідко потрібно

// Динамічний import() — завантажує КОЛИ потрібно:
async function loadChart() {
  const { Chart } = await import('./chart.js'); // завантажується лише при виклику
  new Chart(canvas, { /* config */ });
}

// Умовне завантаження:
const mod = await import(isDev ? './dev-tools.js' : './prod.js');

// Code splitting у Vite / Webpack:
// import('./pages/Settings.js') → окремий chunk
// Завантажується лише коли юзер відкриває Settings</pre>
<h3>Практичні сценарії</h3>
<ul>
  <li>Ліниве завантаження важких бібліотек (chart.js, pdf-lib)</li>
  <li>Code splitting по маршрутах (SPA router)</li>
  <li>Feature flags: завантаження нового коду лише для beta-юзерів</li>
  <li>Завантаження за умовою: полтфіл лише для старих браузерів</li>
</ul>`,
      ru:`<h2>Dynamic import()</h2>
<pre>// Статический — всегда грузится:
import { lib } from './lib.js';

// Динамический — только когда нужно:
async function load() {
  const { Chart } = await import('./chart.js');
  new Chart(canvas, config);
}

// Условный:
const m = await import(isDev ? './dev.js' : './prod.js');

// Code splitting (Vite/Webpack):
// import('./pages/Settings.js') → отдельный chunk</pre>` },
    `<div class="di-lab">
  <h2>⚡ Dynamic import()</h2>

  <!-- Code splitting sim -->
  <div class="di-section">
    <h3>Code Splitting Simulator</h3>
    <div class="di-routes">
      <div class="di-route" onclick="loadPage('home')">
        🏠 Home <div class="dr-status" id="st-home">не завантажено</div>
      </div>
      <div class="di-route" onclick="loadPage('dashboard')">
        📊 Dashboard <div class="dr-status" id="st-dashboard">не завантажено</div>
      </div>
      <div class="di-route" onclick="loadPage('chart')">
        📈 Chart.js <div class="dr-status" id="st-chart">не завантажено</div>
      </div>
      <div class="di-route" onclick="loadPage('editor')">
        ✏️ Editor <div class="dr-status" id="st-editor">не завантажено</div>
      </div>
    </div>
    <div class="di-page-view" id="di-page-view">
      <div class="dpv-placeholder">Натисни на маршрут →</div>
    </div>
  </div>

  <!-- Bundle size visualizer -->
  <div class="di-section">
    <h3>Bundle size (static vs dynamic)</h3>
    <div class="di-bundles">
      <div class="dib-col">
        <div class="dib-label">❌ Статичні imports<br><span>всі модулі в одному bundle</span></div>
        <div class="dib-bar">
          <div class="dib-fill" style="width:100%;background:#ef4444">home+dashboard+chart+editor = 800KB</div>
        </div>
        <div class="dib-size">Початковий завантаж: 800KB</div>
      </div>
      <div class="dib-col">
        <div class="dib-label">✅ Dynamic import()<br><span>лише потрібне завантажується</span></div>
        <div class="dib-bar">
          <div class="dib-fill" style="width:15%;background:#10b981">home = 120KB</div>
        </div>
        <div class="dib-size" id="dib-dynamic-size">Початковий завантаж: 120KB</div>
      </div>
    </div>
    <pre class="out" id="di-out">Натисни на маршрут щоб побачити dynamic import →</pre>
  </div>
</div>`,
    `${BASE}
.di-lab{max-width:520px}
.di-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.di-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.di-routes{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px}
.di-route{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px;cursor:pointer;font-size:13px;font-weight:600;transition:.2s;display:flex;flex-direction:column;gap:4px}
.di-route:hover{border-color:#3b82f6}
.di-route.loaded{border-color:#10b981}
.dr-status{font-size:10px;font-family:monospace;color:#475569;font-weight:400}
.dr-status.loading{color:#f59e0b}.dr-status.done{color:#10b981}
.di-page-view{background:#0f172a;border-radius:8px;border:1px dashed #1e293b;padding:14px;min-height:80px;font-size:13px}
.dpv-placeholder{color:#334155;text-align:center;padding:20px;font-size:12px}

.di-bundles{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}
.dib-col{display:flex;flex-direction:column;gap:5px}
.dib-label{font-size:11px;font-weight:600;color:#94a3b8}
.dib-label span{font-size:10px;color:#475569;font-weight:400}
.dib-bar{height:20px;background:#0f172a;border-radius:5px;overflow:hidden;border:1px solid #1e293b}
.dib-fill{height:100%;display:flex;align-items:center;padding:0 8px;font-size:9px;font-weight:700;color:#fff;white-space:nowrap;border-radius:5px;transition:width .5s ease}
.dib-size{font-size:10px;color:#64748b;font-family:monospace}`,
    `const MODULES = {
  home:      { size: 120, icon:'🏠', content:'<h3 style="color:#f1f5f9">🏠 Home Page</h3><p style="color:#94a3b8;font-size:12px;margin-top:8px">Hero, features, CTA sections loaded.</p>', chunk:'home.chunk.js' },
  dashboard: { size: 280, icon:'📊', content:'<h3 style="color:#f1f5f9">📊 Dashboard</h3><p style="color:#94a3b8;font-size:12px;margin-top:8px">Tables, filters, analytics widgets loaded.</p>', chunk:'dashboard.chunk.js' },
  chart:     { size: 320, icon:'📈', content:'<h3 style="color:#f1f5f9">📈 Chart.js Module</h3><p style="color:#94a3b8;font-size:12px;margin-top:8px">Chart.js (320KB) lazy loaded only now!</p>', chunk:'chart.vendor.chunk.js' },
  editor:    { size: 200, icon:'✏️',  content:'<h3 style="color:#f1f5f9">✏️ Rich Editor</h3><p style="color:#94a3b8;font-size:12px;margin-top:8px">ProseMirror editor loaded on demand.</p>', chunk:'editor.chunk.js' },
};
const loaded = {};
let totalDynamic = 120; // home is already loaded

async function loadPage(name) {
  const mod = MODULES[name];
  const st  = document.getElementById('st-' + name);
  const route = [...document.querySelectorAll('.di-route')].find(r=>r.onclick.toString().includes(name));

  if(loaded[name]) {
    document.getElementById('di-page-view').innerHTML = mod.content;
    document.getElementById('di-out').textContent = \`// Кеш — модуль вже завантажений!\n// import() повертає той самий екземпляр (singleton)\nconsole.log("${name}.js" — з кешу);\`;
    return;
  }

  st.textContent = '⏳ loading...'; st.className = 'dr-status loading';
  document.getElementById('di-out').textContent =
    \`// Виконується:\nconst mod = await import('./pages/\${name}.js');\n// Завантажується chunk: \${mod.chunk} (\${mod.size}KB)\n// ...\`;

  await new Promise(r => setTimeout(r, 600 + Math.random()*400));

  loaded[name] = true;
  st.textContent = '✅ ' + mod.size + 'KB'; st.className = 'dr-status done';
  route.classList.add('loaded');
  document.getElementById('di-page-view').innerHTML = mod.content;

  if(name !== 'home') { totalDynamic += mod.size; }
  document.getElementById('dib-dynamic-size').textContent = \`Завантажено: \${totalDynamic}KB (замість 800KB)\`;
  document.getElementById('di-out').textContent =
    \`// import() виконано!\nconst mod = await import('./pages/\${name}.js');\n// \${mod.chunk} (\${mod.size}KB) завантажено\n// Загалом завантажено: \${totalDynamic}KB\n// Економія: \${800-totalDynamic}KB (\${Math.round((800-totalDynamic)/800*100)}%)\`;
}`,
    [
      { level:'easy',   uk:'Клікни по всіх 4 маршрутах. Поглянь на статус і total завантажений розмір. Порівняй зі static bundle.',  ru:'Кликни по всем 4 маршрутам. Посмотри на статус и total размер. Сравни со static bundle.' },
      { level:'easy',   uk:'Клікни двічі на "Dashboard" — другий раз він завантажується миттєво. Знайди у коді чому.',  ru:'Кликни "Dashboard" дважды — второй раз мгновенно. Найди в коде почему.' },
      { level:'medium', uk:'У реальному проекті на Vite, dynamic import() створює окремий chunk-файл. Поясни чим відрізняється від статичного import.',  ru:'В Vite, dynamic import создает отдельный chunk. Объясни разницу со статическим import.' },
      { level:'medium', uk:'Знайди в коді де визначаються розміри модулів. Як змінити так щоб editor.js завантажувався лише для авторизованих юзерів?',  ru:'Найди размеры модулей. Как изменить чтобы editor.js загружался только для авторизованных?' },
      { level:'hard',   uk:'Напиши lazyLoad(importFn, placeholder) — HOC що показує spinner поки import() не завершиться, потім рендерить компонент.',  ru:'Напиши lazyLoad(importFn, placeholder) — HOC что показывает spinner пока import() не завершится.' },
      { level:'extra',  uk:'Реалізуй prefetch(importFn) — завантажує модуль у фоні (під час idle) до того як юзер реально перейде на маршрут.',  ru:'Реализуй prefetch(importFn) — загружает модуль в фоне во время idle, до перехода на маршрут.' },
    ]
  );

  /* ─── 07-07 ──────────────────────────────────────────────── */
  patch('07-07',
    { uk:`<h2>Generators: function*, yield та ітератори</h2>
<pre>function* counter(start = 0) {
  while (true) {
    yield start++;  // пауза + повернення значення
  }
}

const gen = counter(1);
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }</pre>
<h3>Скінченний генератор</h3>
<pre>function* range(start, end, step = 1) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
  // повертає { value: undefined, done: true }
}

// Ітерація:
for (const n of range(1, 5)) console.log(n); // 1 2 3 4 5
const arr = [...range(0, 10, 2)]; // [0, 2, 4, 6, 8, 10]</pre>
<h3>Передача значень у генератор</h3>
<pre>function* dialogue() {
  const name = yield 'Як тебе звати?';
  const age  = yield \`Привіт, \${name}! Скільки тобі років?\`;
  return \`\${name}, \${age} — отримано!\`;
}
const d = dialogue();
d.next();           // { value: 'Як тебе звати?' }
d.next('Аліса');    // { value: 'Привіт, Аліса! Скільки...' }
d.next(14);         // { value: 'Аліса, 14 — отримано!', done: true }</pre>`,
      ru:`<h2>Generators</h2>
<pre>function* counter(start = 0) {
  while(true) { yield start++; }
}
const gen = counter(1);
gen.next(); // { value:1, done:false }

function* range(start, end) {
  for(let i=start; i<=end; i++) yield i;
}
[...range(1,5)] // [1,2,3,4,5]

// Передача значений:
function* dialog() {
  const name = yield 'Ваше имя?';
  return 'Привет, ' + name;
}
const d = dialog();
d.next();        // { value: 'Ваше имя?' }
d.next('Alice'); // { value: 'Привет, Alice', done:true }</pre>` },
    `<div class="gen-lab">
  <h2>⚙️ Generator Lab</h2>

  <!-- Stepper -->
  <div class="gen-section">
    <h3>Generator Stepper</h3>
    <select id="gen-select" onchange="selectGen()">
      <option value="counter">counter(1)</option>
      <option value="range">range(1, 10, 2)</option>
      <option value="fib">fibonacci()</option>
      <option value="dialogue">dialogue()</option>
    </select>
    <div class="gen-state">
      <div class="gs-box" id="gs-code"></div>
      <div class="gs-controls">
        <button onclick="stepNext()" id="step-btn">▶ .next()</button>
        <button onclick="resetGen()">↺ Reset</button>
        <div class="gs-input-wrap" id="gs-input-wrap" style="display:none">
          <input id="gs-input" placeholder="Передай значення...">
          <button onclick="stepWithValue()">▶ .next(value)</button>
        </div>
      </div>
      <div class="gs-log" id="gs-log"></div>
    </div>
  </div>
</div>`,
    `${BASE}
.gen-lab{max-width:520px}
.gen-section{background:#1e293b;border-radius:10px;padding:12px}
.gen-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.gen-section select{margin-bottom:10px;padding:6px 10px;font-size:12px;width:100%}
.gen-state{display:flex;flex-direction:column;gap:8px}
.gs-box{background:#0f172a;border-radius:8px;padding:10px;font-family:monospace;font-size:11.5px;line-height:1.8;border:1px solid #1e293b;min-height:80px;white-space:pre;color:#94a3b8}
.gs-box .hl-yield{background:rgba(245,158,11,.2);color:#fcd34d;border-radius:2px;padding:0 2px}
.gs-controls{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.gs-controls button{padding:6px 12px;font-size:12px}
.gs-input-wrap{display:flex;gap:5px;flex:1}
.gs-input-wrap input{flex:1;padding:6px 8px;font-size:12px}
.gs-log{display:flex;flex-direction:column;gap:3px;max-height:160px;overflow-y:auto}
.gsl-entry{font-size:11px;font-family:monospace;padding:5px 8px;border-radius:5px;background:#0f172a;border-left:2px solid #334155;transition:.15s}
.gsl-yield{border-color:#f59e0b;color:#fcd34d}.gsl-done{border-color:#10b981;color:#6ee7b7}.gsl-return{border-color:#a78bfa;color:#c4b5fd}`,
    `const GENERATORS = {
  counter: {
    code: \`function* counter(start = 1) {
  while (true) {
    yield start++;
  }
}\`,
    factory: function*() { let n=1; while(true){ yield n++; } }
  },
  range: {
    code: \`function* range(start=1, end=10, step=2) {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}\`,
    factory: function*() { for(let i=1;i<=10;i+=2) yield i; }
  },
  fib: {
    code: \`function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}\`,
    factory: function*() { let [a,b]=[0,1]; while(true){ yield a; [a,b]=[b,a+b]; } }
  },
  dialogue: {
    code: \`function* dialogue() {
  const name = yield 'Як тебе звати?';
  const age  = yield 'Привіт, '+name+'! Вік?';
  return name+', '+age+' — дякую!';
}\`,
    factory: function*() {
      const name = yield 'Як тебе звати?';
      const age  = yield 'Привіт, ' + name + '! Скільки тобі років?';
      return name + ', ' + age + ' — дякую!';
    },
    needsInput: true
  }
};

let currentGen = null;
let stepNum = 0;
let currentDef = null;

function selectGen() {
  resetGen();
}
function resetGen() {
  const key = document.getElementById('gen-select').value;
  currentDef = GENERATORS[key];
  currentGen = currentDef.factory();
  stepNum = 0;
  const code = currentDef.code.replace(/yield/g, '<span class="hl-yield">yield</span>');
  document.getElementById('gs-code').innerHTML = code;
  document.getElementById('gs-log').innerHTML = '';
  document.getElementById('step-btn').textContent = '▶ .next()';
  document.getElementById('gs-input-wrap').style.display = currentDef.needsInput ? 'flex' : 'none';
}

function addLog(cls, text) {
  const d = document.createElement('div');
  d.className = 'gsl-entry gsl-' + cls;
  d.textContent = 'Step ' + stepNum + ': ' + text;
  document.getElementById('gs-log').prepend(d);
}

function stepNext() {
  if(!currentGen) return;
  stepNum++;
  const { value, done } = currentGen.next();
  if(done) {
    addLog('done', '{ value: ' + JSON.stringify(value) + ', done: true }');
    currentGen = null;
    document.getElementById('step-btn').disabled = true;
  } else {
    addLog('yield', '{ value: ' + JSON.stringify(value) + ', done: false }');
  }
}

function stepWithValue() {
  if(!currentGen) return;
  const val = document.getElementById('gs-input').value;
  document.getElementById('gs-input').value = '';
  stepNum++;
  const { value, done } = currentGen.next(val);
  if(done) {
    addLog('return', '{ value: "' + value + '", done: true }');
    currentGen = null;
  } else {
    addLog('yield', '{ value: "' + value + '", done: false }');
  }
}

resetGen();`,
    [
      { level:'easy',   uk:'Обери "counter(1)" і натискай ".next()" 10 разів — числа нескінченно зростають.',  ru:'Выбери "counter(1)" и нажимай ".next()" 10 раз — числа бесконечно растут.' },
      { level:'easy',   uk:'Обери "range(1,10,2)" — натискай до done:true. Яка остання yield-значення? Чому done:true після?',  ru:'Выбери "range(1,10,2)" — жми до done:true. Какое последнее yield? Почему done:true?' },
      { level:'medium', uk:'Обери "dialogue" — натискай ".next()" і вводь значення (ім\'я і вік). Знайди де return у коді.',  ru:'Выбери "dialogue" — жми ".next()" и вводи значения. Найди где return в коде.' },
      { level:'medium', uk:'Обери "fibonacci" і натисни 15 разів. Які числа? Напиши функцію що бере перші n чисел Фібоначчі з генератора.',  ru:'Выбери "fibonacci" нажми 15 раз. Какие числа? Напиши функцию берущую первые n чисел.' },
      { level:'hard',   uk:'Реалізуй генератор infiniteMap(iterable, fn) — нескінченно застосовує fn до кожного елемента iterable по черзі.',  ru:'Реализуй генератор infiniteMap(iterable, fn) — бесконечно применяет fn к каждому элементу.' },
      { level:'extra',  uk:'Реалізуй генератор take(gen, n) що бере лише перші n значень з іншого генератора. Потім compose(gen1, gen2) — pipe генераторів.',  ru:'Реализуй take(gen, n) берущий первые n значений. Потом compose(gen1, gen2) — pipe генераторов.' },
    ]
  );

  /* ─── 07-08 ──────────────────────────────────────────────── */
  patch('07-08',
    { uk:`<h2>Symbol: унікальні ключі та Symbol.iterator</h2>
<pre>// Кожен Symbol() унікальний, навіть з однаковим описом:
const s1 = Symbol('id');
const s2 = Symbol('id');
s1 === s2; // false!

// Використання як ключ об'єкта:
const ID = Symbol('id');
const user = { name: 'Alice', [ID]: 42 };
user[ID];                    // 42
Object.keys(user);           // ['name'] — Symbol прихований!
Object.getOwnPropertySymbols(user); // [Symbol(id)]</pre>
<h3>Symbol.iterator — зробити об'єкт ітерованим</h3>
<pre>const range = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};

for (const n of range) console.log(n); // 1 2 3 4 5
[...range]; // [1, 2, 3, 4, 5]</pre>`,
      ru:`<h2>Symbol</h2>
<pre>const s1 = Symbol('id');
const s2 = Symbol('id');
s1 === s2; // false — каждый уникален!

// Скрытые ключи:
const ID = Symbol('id');
const user = { name:'Alice', [ID]:42 };
Object.keys(user); // ['name'] — Symbol скрыт!

// Symbol.iterator — делает объект итерируемым:
const range = {
  from:1, to:5,
  [Symbol.iterator]() {
    let cur = this.from;
    return { next: () => cur<=this.to
      ? { value:cur++, done:false }
      : { value:undefined, done:true } };
  }
};
[...range]; // [1,2,3,4,5]</pre>` },
    `<div class="sym-lab">
  <h2>🔑 Symbol Lab</h2>

  <!-- Symbol uniqueness -->
  <div class="sym-section">
    <h3>Symbol Uniqueness</h3>
    <div class="sym-btns">
      <button onclick="demoUniq()">Symbol('id') === Symbol('id')?</button>
      <button onclick="demoHidden()">Приховані ключі</button>
      <button onclick="demoGlobal()">Symbol.for() (global)</button>
    </div>
    <pre class="out" id="sym-out">—</pre>
  </div>

  <!-- Custom iterable -->
  <div class="sym-section">
    <h3>Symbol.iterator — Custom Iterable</h3>
    <div class="iter-controls">
      <label>from: <input type="number" id="iter-from" value="1" style="width:55px"></label>
      <label>to: <input type="number" id="iter-to" value="10" style="width:55px"></label>
      <label>step: <input type="number" id="iter-step" value="1" style="width:55px"></label>
      <button onclick="runIter()">▶ [...range]</button>
      <button onclick="runForOf()">for...of</button>
    </div>
    <pre class="out" id="iter-out">—</pre>
  </div>
</div>`,
    `${BASE}
.sym-lab{max-width:520px}
.sym-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.sym-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.sym-btns{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
.sym-btns button{flex:1;padding:5px 8px;font-size:11px;min-width:120px}
.iter-controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:8px}
.iter-controls label{font-size:12px;color:#64748b;display:flex;align-items:center;gap:4px}
.iter-controls button{padding:6px 12px;font-size:12px}`,
    `function demoUniq() {
  const s1 = Symbol('id');
  const s2 = Symbol('id');
  const s3 = Symbol.for('shared'); // global registry
  const s4 = Symbol.for('shared'); // same as s3!
  document.getElementById('sym-out').textContent =
    \`const s1 = Symbol('id');\nconst s2 = Symbol('id');\n\ns1 === s2 → \${s1===s2} // false! Кожен Symbol унікальний\ntypeof s1 → "\${typeof s1}"\ns1.toString() → "\${s1.toString()}"\ns1.description → "\${s1.description}"\n\n// Але Symbol.for() використовує global registry:\nSymbol.for('shared') === Symbol.for('shared') → \${s3===s4} // true!\`;
}

function demoHidden() {
  const ID = Symbol('id');
  const ROLE = Symbol('role');
  const user = { name:'Alice', age:14, [ID]:42, [ROLE]:'admin' };
  document.getElementById('sym-out').textContent =
    \`const ID   = Symbol('id');\nconst ROLE = Symbol('role');\nconst user = { name:'Alice', age:14, [ID]:42, [ROLE]:'admin' };\n\nObject.keys(user)       → [\${Object.keys(user).map(k=>'"'+k+'"').join(', ')}]  // Symbol-ключі приховані!\nJSON.stringify(user)    → \${JSON.stringify(user)}  // Symbol не серіалізується!\nuser[ID]                → \${user[ID]}\nObject.getOwnPropertySymbols(user) → [\${Object.getOwnPropertySymbols(user).map(s=>s.toString()).join(', ')}]\`;
}

function demoGlobal() {
  const s1 = Symbol.for('myapp.token');
  const s2 = Symbol.for('myapp.token');
  document.getElementById('sym-out').textContent =
    \`// Symbol.for() — глобальний реєстр:\nconst s1 = Symbol.for('myapp.token');\nconst s2 = Symbol.for('myapp.token');\n\ns1 === s2 → \${s1===s2} // true! Ті самі з реєстру\nSymbol.keyFor(s1) → "\${Symbol.keyFor(s1)}"\n\n// Застосування: shared Symbols між модулями / lib\`;
}

// Custom iterable
function makeRange(from, to, step) {
  return {
    from, to, step,
    [Symbol.iterator]() {
      let cur = this.from;
      return {
        next: () => cur <= this.to
          ? { value: cur, done: false, andThen: (cur += this.step) }
          : { value: undefined, done: true }
      };
    }
  };
}
// Fix: need closure
function makeRangeFixed(from, to, step) {
  return {
    [Symbol.iterator]() {
      let cur = from;
      return {
        next() {
          if(cur <= to) { const v = cur; cur += step; return { value:v, done:false }; }
          return { value:undefined, done:true };
        }
      };
    }
  };
}

function runIter() {
  const from = parseInt(document.getElementById('iter-from').value)||1;
  const to   = parseInt(document.getElementById('iter-to').value)||10;
  const step = parseInt(document.getElementById('iter-step').value)||1;
  const arr  = [...makeRangeFixed(from,to,step)];
  document.getElementById('iter-out').textContent =
    \`const range = { from:\${from}, to:\${to}, step:\${step}, [Symbol.iterator]() {...} };\n\n[...range] → [\${arr.join(', ')}]\n\nSpread, for...of, Array.from() — всі використовують Symbol.iterator!\`;
}

function runForOf() {
  const from = parseInt(document.getElementById('iter-from').value)||1;
  const to   = parseInt(document.getElementById('iter-to').value)||10;
  const step = parseInt(document.getElementById('iter-step').value)||1;
  const range = makeRangeFixed(from,to,step);
  const lines = [];
  for(const n of range) lines.push('  ' + n);
  document.getElementById('iter-out').textContent =
    \`for (const n of range) console.log(n);\n\n\${lines.join('\n')}\n\n// for...of внутрішньо викликає [Symbol.iterator]().next() на кожній ітерації\`;
}`,
    [
      { level:'easy',   uk:'Натисни "Symbol(id) === Symbol(id)?" — поясни чому результат false. Потім "Symbol.for() (global)".',  ru:'Нажми "Symbol(id) === Symbol(id)?" — объясни почему false. Потом "Symbol.for()".' },
      { level:'easy',   uk:'Натисни "Приховані ключі" — поглянь чому Object.keys() і JSON.stringify() не показують Symbol-ключі.',  ru:'Нажми "Приховані ключі" — почему Object.keys() и JSON.stringify() скрывают Symbol-ключи?' },
      { level:'medium', uk:'Постав from=0, to=20, step=5. Натисни [...range] і for...of. Яка різниця у виводі?',  ru:'Поставь from=0, to=20, step=5. Нажми [...range] и for...of. Какая разница?' },
      { level:'medium', uk:'Знайди [Symbol.iterator]() у коді. Що повертає метод next()? Коли done стає true?',  ru:'Найди [Symbol.iterator]() в коде. Что возвращает next()? Когда done становится true?' },
      { level:'hard',   uk:'Напиши клас LinkedList що реалізує Symbol.iterator для ітерації через for...of.',  ru:'Напиши класс LinkedList реализующий Symbol.iterator для итерации через for...of.' },
      { level:'extra',  uk:'Реалізуй Symbol.toPrimitive для об\'єкта Money { amount, currency } щоб конвертував у число, рядок та дефолт правильно.',  ru:'Реализуй Symbol.toPrimitive для объекта Money { amount, currency } для числа, строки и default.' },
    ]
  );

  /* ─── 07-09 ──────────────────────────────────────────────── */
  patch('07-09',
    { uk:`<h2>WeakMap, WeakSet та WeakRef</h2>
<h3>WeakMap vs Map</h3>
<pre>// Map — ключі СИЛЬНІ посилання (memory leak!)
const cache = new Map();
let el = document.querySelector('.btn');
cache.set(el, 'data');
el = null; // el видалено, але Map тримає посилання!

// WeakMap — ключі СЛАБКІ (не заважають GC)
const wcache = new WeakMap();
wcache.set(el, 'data');
el = null; // GC може видалити запис!</pre>
<h3>Ключові відмінності</h3>
<pre>// WeakMap:
// - Ключі тільки об'єкти (не примітиви)
// - Не ітерується (не forEach, не keys(), не size)
// - Автоматичне очищення при GC ключа

// WeakSet:
const visited = new WeakSet();
visited.add(nodeElement);
visited.has(nodeElement); // true
// Тільки has/add/delete, немає size/forEach</pre>
<h3>WeakRef</h3>
<pre>const wr = new WeakRef(largeObject);
const obj = wr.deref(); // null якщо GC зібрав
if (obj) { /* використовуємо */ }</pre>`,
      ru:`<h2>WeakMap, WeakSet, WeakRef</h2>
<pre>// Map — сильные ссылки (memory leak!):
const cache = new Map();
cache.set(el, data);
el = null; // Map ещё держит el!

// WeakMap — слабые ссылки (GC может удалить):
const wcache = new WeakMap();
wcache.set(el, data);
el = null; // GC удалит запись автоматически

// WeakMap: только объекты как ключи, нет итерации
// WeakSet: только has/add/delete, нет size

// WeakRef:
const wr = new WeakRef(largeObj);
wr.deref(); // null если GC собрал</pre>` },
    `<div class="wm-lab">
  <h2>💾 Weak Collections Lab</h2>

  <!-- WeakMap vs Map comparison -->
  <div class="wm-section">
    <h3>WeakMap — приватні дані об'єктів</h3>
    <div class="wm-btns">
      <button onclick="demoPrivateData()">Приватні властивості</button>
      <button onclick="demoCacheDiff()">Cache: Map vs WeakMap</button>
      <button onclick="demoWeakSet()">WeakSet visited</button>
    </div>
    <pre class="out" id="wm-out">—</pre>
  </div>

  <!-- Map vs WeakMap API comparison -->
  <div class="wm-section">
    <h3>API Comparison</h3>
    <div class="wm-compare">
      <div class="wmc-col">
        <div class="wmc-label">Map</div>
        <div class="wmc-api">
          <div class="wmc-method ok">.set(key, val)</div>
          <div class="wmc-method ok">.get(key)</div>
          <div class="wmc-method ok">.has(key)</div>
          <div class="wmc-method ok">.delete(key)</div>
          <div class="wmc-method ok">.size</div>
          <div class="wmc-method ok">.keys()</div>
          <div class="wmc-method ok">.values()</div>
          <div class="wmc-method ok">.forEach()</div>
          <div class="wmc-method ok">Primitive keys</div>
        </div>
      </div>
      <div class="wmc-col">
        <div class="wmc-label">WeakMap</div>
        <div class="wmc-api">
          <div class="wmc-method ok">.set(key, val)</div>
          <div class="wmc-method ok">.get(key)</div>
          <div class="wmc-method ok">.has(key)</div>
          <div class="wmc-method ok">.delete(key)</div>
          <div class="wmc-method no">.size ✗</div>
          <div class="wmc-method no">.keys() ✗</div>
          <div class="wmc-method no">.values() ✗</div>
          <div class="wmc-method no">.forEach() ✗</div>
          <div class="wmc-method no">Primitive keys ✗</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.wm-lab{max-width:520px}
.wm-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.wm-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.wm-btns{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
.wm-btns button{flex:1;padding:5px 10px;font-size:11px}
.wm-compare{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.wmc-col{background:#0f172a;border-radius:8px;padding:10px}
.wmc-label{font-size:11px;font-weight:700;color:#94a3b8;margin-bottom:8px;font-family:monospace}
.wmc-api{display:flex;flex-direction:column;gap:3px}
.wmc-method{font-size:10.5px;font-family:monospace;padding:3px 6px;border-radius:4px}
.wmc-method.ok{color:#6ee7b7;background:rgba(16,185,129,.08)}
.wmc-method.no{color:#f87171;background:rgba(239,68,68,.08)}`,
    `function demoPrivateData() {
  // WeakMap для зберігання приватних даних
  const _private = new WeakMap();

  class Person {
    constructor(name, age) {
      _private.set(this, { name, age, secret: 'hidden' });
    }
    greet() {
      const { name, age } = _private.get(this);
      return \`Hi, I'm \${name}, \${age} years old\`;
    }
    get name() { return _private.get(this).name; }
  }

  const alice = new Person('Alice', 14);
  const bob   = new Person('Bob', 16);

  document.getElementById('wm-out').textContent =
    \`// WeakMap для приватних даних класу:\nclass Person {\n  constructor(name, age) {\n    _private.set(this, { name, age, secret: 'hidden' });\n  }\n}\n\nalice.greet() → "\${alice.greet()}"\nbob.name     → "\${bob.name}"\nalice.secret → \${alice.secret} // undefined! Приватно\n\n_private.has(alice) → \${_private.has(alice)}\n// При alice = null → GC видалить запис у WeakMap автоматично!\`;
}

function demoCacheDiff() {
  const mapCache   = new Map();
  const weakCache  = new WeakMap();
  let key1 = { id: 1 };
  let key2 = { id: 2 };
  mapCache.set(key1, 'data-1');
  mapCache.set(key2, 'data-2');
  weakCache.set(key1, 'data-1');
  weakCache.set(key2, 'data-2');

  const mapSizeBefore = mapCache.size;
  key1 = null; // "видаляємо" об'єкт
  // Map.size все ще 2 — memory leak!
  // WeakMap не має .size — але GC прибере запис

  document.getElementById('wm-out').textContent =
    \`// Після key1 = null:\nmap.size  → \${mapCache.size} // Все ще 2! Map тримає посилання (memory leak)\nweakMap.size → undefined // WeakMap не має .size\n\n// Різниця:\n// Map:     key1 = null → Map ще тримає об'єкт у пам'яті\n// WeakMap: key1 = null → GC може видалити запис\n\n// Практичне застосування WeakMap:\n// - DOM node → metadata\n// - object → computed cache\n// - class instance → private state\`;
}

function demoWeakSet() {
  const processed = new WeakSet();
  const requests = [{ id:1, url:'/api/a' }, { id:2, url:'/api/b' }, { id:1, url:'/api/a' }];
  const results = requests.map(req => {
    if(processed.has(req)) return \`⚠ Дубль: \${req.url}\`;
    processed.add(req);
    return \`✅ Оброблено: \${req.url}\`;
  });

  const ws = new WeakSet();
  const o1 = {}, o2 = {};
  ws.add(o1); ws.add(o2);

  document.getElementById('wm-out').textContent =
    \`// WeakSet — трекер відвіданих об'єктів:\nconst processed = new WeakSet();\n\n\${results.join('\n')}\n\nws.has(o1) → \${ws.has(o1)}\nws.has({}) → \${ws.has({})} // false! Новий об'єкт\n\n// WeakSet API: тільки has(), add(), delete()\n// Немає size, forEach, keys — не ітерується!\`;
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і прочитай пояснення. Який основний сценарій для WeakMap?',  ru:'Нажми все три кнопки. Какой основной сценарий для WeakMap?' },
      { level:'easy',   uk:'Порівняй таблицю Map vs WeakMap. Яких методів немає у WeakMap? Чому?',  ru:'Сравни таблицу Map vs WeakMap. Каких методов нет у WeakMap? Почему?' },
      { level:'medium', uk:'У "Cache demo" поясни чому Map.size залишається 2 після key1=null. Що таке "memory leak"?',  ru:'В "Cache demo" объясни почему Map.size остается 2 после key1=null. Что такое "memory leak"?' },
      { level:'medium', uk:'Напиши клас EventEmitter де слухачі зберігаються у WeakMap (не у масиві) — щоб об\'єкт-ключ можна було GC.',  ru:'Напиши EventEmitter где слушатели хранятся в WeakMap (не в массиве).' },
      { level:'hard',   uk:'Реалізуй memoizeWeak(fn) — мемоізація де кеш зберігається у WeakMap і автоматично очищається.',  ru:'Реализуй memoizeWeak(fn) — мемоизация с кешем в WeakMap который автоматически очищается.' },
      { level:'extra',  uk:'Поясни коли використовувати WeakRef і FinalizationRegistry. Напиши демо що показує автоматичне очищення кешу.',  ru:'Объясни WeakRef + FinalizationRegistry. Напиши демо автоматической очистки кеша.' },
    ]
  );

  /* ─── 07-10 ──────────────────────────────────────────────── */
  patch('07-10',
    { uk:`<h2>structuredClone та глибоке копіювання</h2>
<h3>Поверхнева копія (shallow)</h3>
<pre>const orig = { a: 1, nested: { b: 2 } };

// Spread / Object.assign — поверхнева копія:
const copy = { ...orig };
copy.nested.b = 99;
orig.nested.b; // 99! Вкладений об'єкт — спільне посилання!</pre>
<h3>Глибока копія — методи</h3>
<pre>// 1. JSON (простий, але з обмеженнями):
const deep1 = JSON.parse(JSON.stringify(orig));
// ❌ Не копіює: undefined, Function, Symbol, Date (→ string!),
//    Map, Set, circular references → throw!

// 2. structuredClone (ES2022, найкращий):
const deep2 = structuredClone(orig);
// ✅ Date, Map, Set, TypedArray, ArrayBuffer
// ❌ Function, DOM nodes, prototype chain

// 3. Бібліотеки: _.cloneDeep(obj) (lodash)</pre>`,
      ru:`<h2>Deep Clone</h2>
<pre>// Spread — поверхностная копия:
const copy = { ...orig }; // nested — общая ссылка!

// JSON (простой, но с ограничениями):
JSON.parse(JSON.stringify(obj));
// ❌ теряет: undefined, Function, Symbol, Date→string

// structuredClone (ES2022, лучший):
structuredClone(obj);
// ✅ Date, Map, Set, TypedArray, circular
// ❌ Function, DOM nodes</pre>` },
    `<div class="clone-lab">
  <h2>🔄 Clone Lab</h2>

  <!-- Методи порівняння -->
  <div class="cl-section">
    <h3>Методи клонування</h3>
    <div class="cl-btns">
      <button onclick="testShallow()">Spread {...}</button>
      <button onclick="testJSON()">JSON</button>
      <button onclick="testStructured()">structuredClone</button>
      <button onclick="testCustom()">Власний deepClone</button>
    </div>
    <pre class="out" id="cl-out">—</pre>
  </div>

  <!-- Comparison table -->
  <div class="cl-section">
    <h3>Що підтримує кожен метод?</h3>
    <div class="cl-table-wrap">
      <table class="cl-table">
        <thead><tr><th>Тип</th><th>Spread</th><th>JSON</th><th>structuredClone</th></tr></thead>
        <tbody>
          <tr><td>Примітиви</td><td class="ok">✅</td><td class="ok">✅</td><td class="ok">✅</td></tr>
          <tr><td>Nested obj</td><td class="no">❌</td><td class="ok">✅</td><td class="ok">✅</td></tr>
          <tr><td>Date</td><td class="ok">✅</td><td class="no">❌ →string</td><td class="ok">✅</td></tr>
          <tr><td>Map / Set</td><td class="no">❌</td><td class="no">❌</td><td class="ok">✅</td></tr>
          <tr><td>Function</td><td class="ok">✅</td><td class="no">❌</td><td class="no">❌</td></tr>
          <tr><td>undefined</td><td class="ok">✅</td><td class="no">❌</td><td class="ok">✅</td></tr>
          <tr><td>Circular ref</td><td class="no">❌ throw</td><td class="no">❌ throw</td><td class="ok">✅</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
    `${BASE}
.clone-lab{max-width:520px}
.cl-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.cl-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.cl-btns{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
.cl-btns button{flex:1;padding:5px 10px;font-size:11px}
.cl-table-wrap{overflow-x:auto}
.cl-table{width:100%;border-collapse:collapse;font-size:11px;min-width:280px}
.cl-table th{background:#0f172a;padding:6px 8px;text-align:left;font-size:10px;text-transform:uppercase;color:#64748b;letter-spacing:.05em;border-bottom:1px solid #334155}
.cl-table td{padding:6px 8px;border-bottom:1px solid #1e293b;color:#94a3b8;font-family:monospace}
.cl-table td.ok{color:#6ee7b7}.cl-table td.no{color:#f87171}
.cl-table tr:last-child td{border-bottom:none}`,
    `const ORIG = {
  name: 'Alice',
  age: 14,
  nested: { score: 100, tags: ['js','css'] },
  date: new Date('2025-01-15'),
  map: new Map([['key','val']]),
  fn: (x) => x * 2,
  undef: undefined,
};

function testShallow() {
  const copy = { ...ORIG };
  copy.nested.score = 999; // мутуємо nested!
  document.getElementById('cl-out').textContent =
    \`const copy = { ...orig };\n\ncopy.nested.score = 999;\norig.nested.score → \${ORIG.nested.score} // 999! Shallow — спільне посилання на nested\n\ntypeof copy.date → "\${typeof copy.date}"  // Date збережено (reference)\ntypeof copy.fn   → "\${typeof copy.fn}"   // Function збережено (reference)\ncopy.map         → \${copy.map}  // Map reference\n\n⚠ Ризик: copy.nested === orig.nested → \${copy.nested === ORIG.nested}\`;
  ORIG.nested.score = 100; // відновити
}

function testJSON() {
  let result;
  try {
    const json = JSON.stringify(ORIG);
    const copy = JSON.parse(json);
    copy.nested.score = 999;
    result =
      \`JSON.parse(JSON.stringify(orig))\n\ncopy.nested.score = 999;\norig.nested.score → \${ORIG.nested.score} // 100 ✅ Глибока копія!\n\nВтрати при серіалізації:\ncopy.date → "\${copy.date}" ❌ (string замість Date!)\ncopy.fn   → \${copy.fn} ❌ (undefined — функції ігнуруються)\ncopy.undef → \${copy.undef} ❌ (undefined → missing)\ncopy.map   → \${JSON.stringify(copy.map)} ❌ (Map → {})\`;
    copy.nested.score = 100;
  } catch(e) { result = '❌ Помилка: ' + e.message; }
  document.getElementById('cl-out').textContent = result;
}

function testStructured() {
  let result;
  try {
    const copy = structuredClone({ ...ORIG, fn: undefined }); // fn excluded
    copy.nested.score = 999;
    result =
      \`structuredClone(orig)\n\ncopy.nested.score = 999;\norig.nested.score → \${ORIG.nested.score} // 100 ✅\n\ncopy.date instanceof Date → \${copy.date instanceof Date} ✅\ncopy.map  → Map { key:'val' } ✅  copy.map.get('key')="\${copy.map?.get('key')}"\ncopy.undef → \${copy.undef} ✅\ncopy.fn   → ❌ (Function не підтримується)\n\n✅ Підтримує circular references!\`;
    copy.nested.score = 100;
  } catch(e) { result = '❌ ' + e.message; }
  document.getElementById('cl-out').textContent = result;
}

function deepClone(obj, seen = new WeakMap()) {
  if(obj === null || typeof obj !== 'object') return obj;
  if(seen.has(obj)) return seen.get(obj);
  if(obj instanceof Date) return new Date(obj);
  if(obj instanceof Map) { const m=new Map(); seen.set(obj,m); obj.forEach((v,k)=>m.set(k,deepClone(v,seen))); return m; }
  if(obj instanceof Set) { const s=new Set(); seen.set(obj,s); obj.forEach(v=>s.add(deepClone(v,seen))); return s; }
  if(Array.isArray(obj)) { const a=[]; seen.set(obj,a); obj.forEach((v,i)=>a[i]=deepClone(v,seen)); return a; }
  const copy = {}; seen.set(obj, copy);
  Object.entries(obj).forEach(([k,v]) => { copy[k] = deepClone(v,seen); });
  return copy;
}

function testCustom() {
  const copy = deepClone(ORIG);
  copy.nested.score = 999;
  document.getElementById('cl-out').textContent =
    \`deepClone(obj) — власна реалізація\n\ncopy.nested.score = 999;\norig.nested.score → \${ORIG.nested.score} ✅\n\ncopy.date instanceof Date → \${copy.date instanceof Date} ✅\ncopy.fn → \${typeof copy.fn} ✅ (функції теж!) \ncopy.map.get('key') → "\${copy.map?.get('key')}" ✅\n\nПідтримує: Date, Map, Set, Function, circular refs (via WeakMap seen)\`;
  ORIG.nested.score = 100;
}`,
    [
      { level:'easy',   uk:'Натисни "Spread" — поглянь що orig.nested.score змінився. Поясни що таке shallow copy.',  ru:'Нажми "Spread" — посмотри что orig.nested.score изменился. Объясни shallow copy.' },
      { level:'easy',   uk:'Натисни "JSON" — які типи даних втрачаються? Перевір таблицю.',  ru:'Нажми "JSON" — какие типы теряются? Проверь таблицу.' },
      { level:'medium', uk:'Натисни "structuredClone" — перевір Date і Map. Чому Function не підтримується?',  ru:'Нажми "structuredClone" — проверь Date и Map. Почему Function не поддерживается?' },
      { level:'medium', uk:'Знайди deepClone() у коді — поясни навіщо WeakMap seen. Що буде з circular reference без нього?',  ru:'Найди deepClone() — объясни зачем WeakMap seen. Что с circular reference без него?' },
      { level:'hard',   uk:'Розшир deepClone() для підтримки RegExp і TypedArray (Float32Array, Uint8Array).',  ru:'Расширь deepClone() для поддержки RegExp и TypedArray (Float32Array, Uint8Array).' },
      { level:'extra',  uk:'Напиши deepDiff(obj1, obj2) — функцію що повертає об\'єкт тільки зі зміненими полями (глибоке порівняння).',  ru:'Напиши deepDiff(obj1, obj2) — функцию возвращающую только изменённые поля (глубокое сравнение).' },
    ]
  );

  /* ─── 07-11 ──────────────────────────────────────────────── */
  patch('07-11',
    { uk:`<h2>Web Workers: фонові обчислення</h2>
<pre>// main.js
const worker = new Worker('worker.js');

// Відправити дані у Worker:
worker.postMessage({ type: 'COMPUTE', data: bigArray });

// Отримати результат:
worker.onmessage = event => {
  console.log('Результат:', event.data);
};
worker.onerror = err => console.error(err);

// worker.js
self.onmessage = event => {
  const { type, data } = event.data;
  if (type === 'COMPUTE') {
    const result = heavyComputation(data); // не блокує main thread!
    self.postMessage({ type: 'RESULT', result });
  }
};</pre>
<h3>Обмеження Web Workers</h3>
<ul>
  <li>Немає доступу до DOM (document, window)</li>
  <li>Немає localStorage (є IndexedDB)</li>
  <li>Є: fetch, setTimeout, WebSocket, crypto</li>
  <li>Передача даних: postMessage (копіює або Transferable)</li>
</ul>`,
      ru:`<h2>Web Workers</h2>
<pre>// main.js:
const w = new Worker('worker.js');
w.postMessage({ type:'COMPUTE', data });
w.onmessage = e => console.log(e.data);

// worker.js:
self.onmessage = e => {
  const result = heavyComputation(e.data);
  self.postMessage(result); // не блокирует UI!
};

// Ограничения: нет DOM, localStorage
// Есть: fetch, setTimeout, WebSocket</pre>` },
    `<div class="ww-lab">
  <h2>⚙️ Web Workers (симуляція)</h2>
  <p style="font-size:12px;color:#64748b;margin-bottom:12px">Справжні Web Workers потребують окремого файлу. Тут симулюємо через setTimeout щоб показати концепцію.</p>

  <!-- Freeze comparison -->
  <div class="ww-section">
    <h3>Блокування UI vs Worker</h3>
    <div class="ww-controls">
      <label>Навантаження: <span id="ww-n-v">10M</span>
        <input type="range" id="ww-n" min="1" max="50" value="10"
          oninput="document.getElementById('ww-n-v').textContent=this.value+'M'">
      </label>
    </div>
    <div class="ww-btns">
      <button onclick="runBlocking()">❌ Blocking (main thread)</button>
      <button onclick="runWorkerSim()">✅ Worker (симуляція)</button>
    </div>
    <div class="ww-indicator">
      <div class="wwi-dot" id="ww-dot"></div>
      <span id="ww-indicator-text">UI вільний</span>
    </div>
    <pre class="out" id="ww-out">Натисни кнопку →</pre>
  </div>

  <!-- postMessage protocol -->
  <div class="ww-section">
    <h3>postMessage Protocol</h3>
    <div class="pm-timeline" id="pm-timeline"></div>
    <div class="pm-btns">
      <button onclick="demoProtocol('sum')">COMPUTE_SUM</button>
      <button onclick="demoProtocol('sort')">SORT_ARRAY</button>
      <button onclick="demoProtocol('prime')">COUNT_PRIMES</button>
    </div>
    <pre class="out" id="pm-out">—</pre>
  </div>
</div>`,
    `${BASE}
.ww-lab{max-width:520px}
.ww-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.ww-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.ww-controls{margin-bottom:8px}
.ww-controls label{font-size:12px;color:#64748b;display:flex;align-items:center;gap:8px}
.ww-controls label span{min-width:36px;font-family:monospace;color:#94a3b8}
.ww-controls input{flex:1;accent-color:#3b82f6;cursor:pointer}
.ww-btns{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap}
.ww-btns button{flex:1;padding:6px 10px;font-size:12px}
.ww-indicator{display:flex;align-items:center;gap:8px;padding:8px 0;margin-bottom:4px;font-size:12px;color:#94a3b8}
.wwi-dot{width:10px;height:10px;border-radius:50%;background:#10b981;transition:.2s}
.wwi-dot.busy{background:#ef4444;animation:pulse .5s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.pm-timeline{display:flex;flex-direction:column;gap:4px;margin-bottom:8px;min-height:30px}
.pmt-entry{font-size:11px;font-family:monospace;padding:5px 8px;border-radius:5px;animation:fadeIn .2s}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.pmt-main{background:rgba(59,130,246,.1);border-left:2px solid #3b82f6;color:#7dd3fc}
.pmt-worker{background:rgba(16,185,129,.1);border-left:2px solid #10b981;color:#6ee7b7}
.pm-btns{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px}
.pm-btns button{flex:1;padding:5px 8px;font-size:11px}`,
    `// Симуляція blocking computation
function heavySync(n) {
  let result = 0;
  for(let i=0;i<n*1_000_000;i++) result += Math.sqrt(i);
  return result;
}

function runBlocking() {
  const n = parseInt(document.getElementById('ww-n').value);
  const dot = document.getElementById('ww-dot');
  const txt = document.getElementById('ww-indicator-text');
  const out = document.getElementById('ww-out');

  dot.classList.add('busy');
  txt.textContent = '❌ UI заморожено — main thread зайнятий!';
  out.textContent = 'Обчислення на main thread...';

  // setTimeout щоб браузер зміг відрендерити стан
  setTimeout(() => {
    const t = Date.now();
    const r = heavySync(Math.min(n, 5)); // обмежуємо до 5M для безпеки
    const elapsed = Date.now() - t;
    dot.classList.remove('busy');
    txt.textContent = '✅ UI вільний';
    out.textContent =
      \`❌ Blocking: \${Math.min(n,5)}M ітерацій на main thread\nЧас: \${elapsed}ms\nРезультат: \${r.toFixed(2)}\n\nПроблема: весь цей час UI не реагував на кліки/скрол!\nРішення: перенести до Web Worker\`;
  }, 10);
}

function runWorkerSim() {
  const n = parseInt(document.getElementById('ww-n').value);
  const dot = document.getElementById('ww-dot');
  const txt = document.getElementById('ww-indicator-text');
  const out = document.getElementById('ww-out');

  dot.style.background = '#f59e0b';
  txt.textContent = '✅ Worker обчислює — UI ВІЛЬНИЙ!';
  out.textContent = \`main.js: worker.postMessage({ type:'COMPUTE', n:\${n}M })\n⏳ Worker обчислює у фоні...\`;

  // Симуляція: "worker" у setTimeout
  const t = Date.now();
  setTimeout(() => {
    const elapsed = n * 12 + 100; // симульований час
    const result  = n * 1_000_000 * 0.666; // приблизний результат
    dot.style.background = '#10b981';
    txt.textContent = '✅ UI вільний — Worker завершив!';
    out.textContent =
      \`// worker.js (симуляція):\nself.onmessage = ({ data }) => {\n  const result = heavyComputation(data.n);\n  self.postMessage({ type:'RESULT', result });\n};\n\n✅ Worker завершив:\nЧас: ~\${elapsed}ms (без блокування UI!)\nРезультат: \${result.toFixed(0)}\n\nmain.js: worker.onmessage → отримано результат\`;
  }, 800);
}

// postMessage protocol demo
const tl = document.getElementById('pm-timeline');
function addPM(cls, text) {
  const d = document.createElement('div');
  d.className = 'pmt-entry pmt-' + cls;
  d.textContent = text;
  tl.appendChild(d);
}

async function demoProtocol(type) {
  tl.innerHTML = '';
  const d = ms => new Promise(r => setTimeout(r, ms));
  const out = document.getElementById('pm-out');

  const configs = {
    sum:   { msg:'{ type:"COMPUTE_SUM", data:[1..1000] }', time:400, res:'sum=500500' },
    sort:  { msg:'{ type:"SORT_ARRAY", data:[...1000 random] }', time:600, res:'sorted array [0,1,2,...]' },
    prime: { msg:'{ type:"COUNT_PRIMES", limit:100000 }', time:700, res:'9592 прості числа' },
  };
  const cfg = configs[type];

  addPM('main', '🖥 main.js: worker.postMessage(' + cfg.msg + ')');
  out.textContent = 'Відправлено у Worker...';
  await d(300);
  addPM('worker', '⚙️ worker.js: onmessage → обчислення...');
  await d(cfg.time);
  addPM('worker', '⚙️ worker.js: self.postMessage({ type:"RESULT", ' + cfg.res + ' })');
  await d(300);
  addPM('main', '🖥 main.js: worker.onmessage → ' + cfg.res);
  out.textContent = \`Protocol: main ↔ worker\n\n→ postMessage() копіює дані (structured clone)\n→ Transferable objects (ArrayBuffer) передаються без копіювання\n\nРезультат: \${cfg.res}\`;
}`,
    [
      { level:'easy',   uk:'Натисни "❌ Blocking" — поглянь на індикатор. Потім "✅ Worker" — що відрізняється?',  ru:'Нажми "❌ Blocking" — посмотри на индикатор. Потом "✅ Worker" — что отличается?' },
      { level:'easy',   uk:'Натисни COMPUTE_SUM, SORT_ARRAY, COUNT_PRIMES — прослідкуй postMessage протокол у timeline.',  ru:'Нажми COMPUTE_SUM, SORT_ARRAY, COUNT_PRIMES — следи за postMessage протоколом.' },
      { level:'medium', uk:'Чому Web Workers не мають доступу до document і window? Що у них є замість цього?',  ru:'Почему Web Workers не имеют доступа к document? Что у них есть вместо этого?' },
      { level:'medium', uk:'postMessage() копіює дані. Для великих бінарних даних є Transferable. Знайди в теорії і поясни різницю.',  ru:'postMessage() копирует данные. Для больших бинарных есть Transferable. Объясни разницу.' },
      { level:'hard',   uk:'Напиши createFakeWorker(fn) — фабрику що симулює Web Worker API через Promise (postMessage/onmessage).',  ru:'Напиши createFakeWorker(fn) — фабрику симулирующую Worker API через Promise.' },
      { level:'extra',  uk:'Реалізуй workerPool(workerFile, poolSize) — пул воркерів що виконує задачі паралельно і повертає Promise.',  ru:'Реализуй workerPool(workerFile, poolSize) — пул воркеров выполняющий задачи параллельно.' },
    ]
  );

  /* ─── 07-12 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('07-12',
    { uk:`<h2>ПРОЕКТ: Task Manager з ES6 Modules патерном</h2>
<p>Побудуй Task Manager що використовує всі теми модуля 07.</p>
<h3>Обов'язкові фічі</h3>
<ol>
  <li>Модульна структура (симуляція ES modules через IIFE/closure)</li>
  <li>async/await для "збереження" задач (з штучною затримкою)</li>
  <li>Promise.all для паралельного завантаження (tasks + users)</li>
  <li>structuredClone для незмінних оновлень</li>
  <li>Generator для унікальних ID</li>
  <li>Symbols для приватних статусів</li>
</ol>
<h3>Бонус</h3>
<ul>
  <li>WeakMap для метаданих задач</li>
  <li>Error handling (кастомні класи)</li>
  <li>Undo/Redo через генератор станів</li>
</ul>`,
      ru:`<h2>ПРОЕКТ: Task Manager</h2>
<h3>Обязательные фичи</h3>
<ol>
  <li>Модульная структура (IIFE/closure)</li>
  <li>async/await для "сохранения" задач</li>
  <li>Promise.all для параллельной загрузки</li>
  <li>structuredClone для иммутабельных обновлений</li>
  <li>Generator для уникальных ID</li>
  <li>Symbols для приватных статусов</li>
</ol>` },
    `<div class="tm-app" id="tm-app">
  <div class="tm-header">
    <h1>📋 Task Manager</h1>
    <div class="tm-status">
      <span id="tm-loading" class="tm-badge loading">⏳ Loading...</span>
      <span class="tm-badge" id="tm-count">0 tasks</span>
      <button onclick="undoTask()" id="tm-undo" disabled>↩ Undo</button>
    </div>
  </div>

  <div class="tm-add">
    <input id="tm-input" placeholder="Нова задача..." onkeydown="e=>{if(e.key==='Enter')addTask()}">
    <select id="tm-priority">
      <option value="low">🟢 Низький</option>
      <option value="med" selected>🟡 Середній</option>
      <option value="high">🔴 Високий</option>
    </select>
    <select id="tm-assignee">
      <option value="alice">👩 Alice</option>
      <option value="bob">👨 Bob</option>
      <option value="carol">👩 Carol</option>
    </select>
    <button onclick="addTask()">+ Додати</button>
  </div>

  <div class="tm-filters">
    <button class="tmf-btn active" onclick="setFilter('all',this)">Всі</button>
    <button class="tmf-btn" onclick="setFilter('pending',this)">Active</button>
    <button class="tmf-btn" onclick="setFilter('done',this)">Done</button>
    <input id="tm-search" placeholder="🔍 Пошук..." oninput="renderTasks()">
  </div>

  <div class="tm-list" id="tm-list">
    <div class="tml-spinner">⟳ Завантаження...</div>
  </div>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f1f5f9;padding:14px}
.tm-app{max-width:520px;display:flex;flex-direction:column;gap:10px}
.tm-header{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}
.tm-header h1{font-size:18px;font-weight:800}
.tm-status{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.tm-badge{padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;background:#1e293b;border:1px solid #334155;color:#94a3b8}
.tm-badge.loading{color:#f59e0b;border-color:rgba(245,158,11,.3);animation:pulse .8s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.tm-badge.done{color:#10b981;border-color:rgba(16,185,129,.3)}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:7px 14px;border-radius:8px;cursor:pointer;font-size:12px;transition:.15s}
button:hover{border-color:#3b82f6;color:#7dd3fc}
button:disabled{opacity:.4;cursor:default}
input,select{background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:7px 10px;border-radius:8px;font-size:12px;font-family:inherit;transition:.2s}
input:focus,select:focus{outline:none;border-color:#3b82f6}

.tm-add{display:flex;gap:5px;flex-wrap:wrap}
.tm-add input{flex:1;min-width:140px}
.tm-filters{display:flex;gap:5px;flex-wrap:wrap}
.tmf-btn{padding:5px 12px;font-size:11px;border-radius:20px}
.tmf-btn.active{background:rgba(59,130,246,.15);border-color:#3b82f6;color:#7dd3fc}
.tm-filters input{flex:1;min-width:100px;padding:5px 10px;font-size:11px}

.tm-list{display:flex;flex-direction:column;gap:5px;min-height:60px}
.tml-spinner{padding:20px;text-align:center;color:#334155;font-size:12px;animation:pulse .8s infinite}
.tml-empty{padding:20px;text-align:center;color:#334155;font-size:12px}
.tm-card{background:#1e293b;border:1px solid #1e293b;border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px;transition:.2s;animation:cardIn .2s ease}
@keyframes cardIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.tm-card.is-done{opacity:.5}
.tm-card.is-done .tmc-title{text-decoration:line-through;color:#475569}
.tmc-check{width:20px;height:20px;border-radius:50%;border:2px solid #334155;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;transition:.2s}
.tmc-check.done{background:#10b981;border-color:#10b981}
.tmc-body{flex:1;min-width:0}
.tmc-title{font-size:13px;color:#f1f5f9;font-weight:600;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tmc-meta{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.tmc-id{font-size:9px;color:#334155;font-family:monospace}
.tmc-pr{padding:1px 6px;border-radius:8px;font-size:9px;font-weight:700}
.pr-high{background:rgba(239,68,68,.15);color:#f87171}
.pr-med{background:rgba(245,158,11,.15);color:#fcd34d}
.pr-low{background:rgba(16,185,129,.15);color:#6ee7b7}
.tmc-user{font-size:10px;color:#64748b}
.tmc-del{background:none;border:none;color:#334155;cursor:pointer;padding:3px 6px;border-radius:4px;font-size:14px;line-height:1}
.tmc-del:hover{color:#ef4444;background:rgba(239,68,68,.1)}`,
    `// ── Module: IdGenerator ────────────────────────────────────
const IdGen = (function() {
  function* gen() { let n = 1; while(true) yield 'T' + String(n++).padStart(3,'0'); }
  const g = gen();
  return { next: () => g.next().value };
})();

// ── Module: TaskStore ────────────────────────────────────
const STATUS = {
  PENDING: Symbol('pending'),
  DONE:    Symbol('done'),
};
const _meta = new WeakMap();

class TaskError extends Error { constructor(m){ super(m); this.name='TaskError'; } }

const TaskStore = (function() {
  let tasks = [];
  const history = [];

  async function fakeAPI(action, data) {
    await new Promise(r => setTimeout(r, 150 + Math.random()*200));
    return data;
  }

  return {
    async init() {
      const [fakeTasks, fakeUsers] = await Promise.all([
        fakeAPI('get-tasks', [
          { id:IdGen.next(), title:'Вивчити Promises', priority:'high', assignee:'alice', status:STATUS.DONE },
          { id:IdGen.next(), title:'Написати generators', priority:'med', assignee:'bob', status:STATUS.PENDING },
          { id:IdGen.next(), title:'Зробити проект', priority:'high', assignee:'alice', status:STATUS.PENDING },
        ]),
        fakeAPI('get-users', ['alice','bob','carol']),
      ]);
      tasks = fakeTasks;
      tasks.forEach(t => _meta.set(t, { createdAt: Date.now(), edits: 0 }));
      return { tasks, users: fakeUsers };
    },

    async add(title, priority, assignee) {
      if(!title.trim()) throw new TaskError('Title required');
      const task = { id:IdGen.next(), title:title.trim(), priority, assignee, status:STATUS.PENDING };
      history.push(structuredClone({ tasks }));
      tasks = [...tasks, task];
      _meta.set(task, { createdAt: Date.now(), edits: 0 });
      await fakeAPI('save', task);
      return task;
    },

    async toggle(id) {
      history.push(structuredClone({ tasks }));
      tasks = tasks.map(t => t.id!==id ? t : { ...t, status: t.status===STATUS.DONE ? STATUS.PENDING : STATUS.DONE });
      return tasks.find(t => t.id===id);
    },

    async remove(id) {
      history.push(structuredClone({ tasks }));
      tasks = tasks.filter(t => t.id !== id);
    },

    undo() { if(!history.length) return; ({ tasks } = history.pop()); },
    get all() { return tasks; },
    get canUndo() { return history.length > 0; },
  };
})();

// ── Module: UI ─────────────────────────────────────────────
let currentFilter = 'all';

async function init() {
  try {
    await TaskStore.init();
    document.getElementById('tm-loading').style.display = 'none';
    renderTasks();
  } catch(err) {
    document.getElementById('tm-loading').textContent = '❌ ' + err.message;
  }
}

function renderTasks() {
  const q   = (document.getElementById('tm-search')?.value||'').toLowerCase();
  const list = document.getElementById('tm-list');
  const STATUS_SYM = { PENDING: Symbol('pending'), DONE: Symbol('done') };

  let filtered = TaskStore.all.filter(t => {
    if(currentFilter==='pending' && t.status.description!=='pending') return false;
    if(currentFilter==='done'    && t.status.description!=='done')    return false;
    if(q && !t.title.toLowerCase().includes(q)) return false;
    return true;
  });

  if(!filtered.length) { list.innerHTML = '<div class="tml-empty">Задач немає</div>'; return; }

  list.innerHTML = filtered.map(t => {
    const isDone = t.status.description === 'done';
    return \`<div class="tm-card \${isDone?'is-done':''}" id="card-\${t.id}">
      <div class="tmc-check \${isDone?'done':''}" onclick="toggleTask('\${t.id}')">\${isDone?'✓':''}</div>
      <div class="tmc-body">
        <div class="tmc-title">\${t.title}</div>
        <div class="tmc-meta">
          <span class="tmc-id">\${t.id}</span>
          <span class="tmc-pr pr-\${t.priority}">\${t.priority}</span>
          <span class="tmc-user">@\${t.assignee}</span>
        </div>
      </div>
      <button class="tmc-del" onclick="removeTask('\${t.id}')">✕</button>
    </div>\`;
  }).join('');

  const all = TaskStore.all;
  const done = all.filter(t=>t.status.description==='done').length;
  document.getElementById('tm-count').textContent = done + '/' + all.length + ' done';
  document.getElementById('tm-undo').disabled = !TaskStore.canUndo;
}

async function addTask() {
  const input = document.getElementById('tm-input');
  const pri   = document.getElementById('tm-priority').value;
  const user  = document.getElementById('tm-assignee').value;
  try {
    await TaskStore.add(input.value, pri, user);
    input.value = '';
    renderTasks();
  } catch(err) { alert(err.message); }
}

async function toggleTask(id) { await TaskStore.toggle(id); renderTasks(); }
async function removeTask(id) { await TaskStore.remove(id); renderTasks(); }
function undoTask() { TaskStore.undo(); renderTasks(); }

function setFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.tmf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTasks();
}

// Підписуємо input
document.getElementById('tm-input').addEventListener('keydown', e => { if(e.key==='Enter') addTask(); });

init();`,
    [
      { level:'easy',   uk:'Додай 3 задачі з різним пріоритетом. Відмітили виконану — натисни Undo.',  ru:'Добавь 3 задачи с разным приоритетом. Отметь выполненную — нажми Undo.' },
      { level:'easy',   uk:'Фільтруй "Active" і "Done". Введи текст у пошук — які задачі залишаються?',  ru:'Фильтруй "Active" и "Done". Введи текст в поиск — какие задачи остаются?' },
      { level:'medium', uk:'Знайди STATUS = { PENDING: Symbol(...), DONE: Symbol(...) }. Поясни навіщо Symbol замість рядків.',  ru:'Найди STATUS с Symbol. Объясни зачем Symbol вместо строк.' },
      { level:'medium', uk:'Знайди Promise.all([fakeAPI, fakeAPI]) у коді. Що завантажується паралельно? Чим краще ніж послідовний await?',  ru:'Найди Promise.all в коде. Что грузится параллельно? Почему лучше чем await+await?' },
      { level:'hard',   uk:'Додай "завершити всі" (Done All) кнопку що використовує Promise.all для паралельного toggle всіх active задач.',  ru:'Добавь кнопку "Done All" использующую Promise.all для параллельного toggle всех active.' },
      { level:'extra',  uk:'Реалізуй TaskStore.export() що серіалізує задачі через structuredClone + JSON та TaskStore.import(json) для відновлення.',  ru:'Реализуй TaskStore.export() через structuredClone+JSON и TaskStore.import() для восстановления.' },
    ]
  );

})();
