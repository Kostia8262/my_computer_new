/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 04 — JavaScript Основи · 10–14 Веб-Розробник
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
pre.out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:12px;font-family:monospace;color:#94a3b8;min-height:36px;max-height:160px;overflow-y:auto;white-space:pre-wrap;word-break:break-all}`;

  /* ─── 04-01 ──────────────────────────────────────────────── */
  patch('04-01',
    { uk:`<h2>Типи даних: typeof, instanceof, coercion</h2>
<h3>7 примітивних типів</h3>
<pre>typeof 42           // "number"
typeof "hello"      // "string"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" ← відомий баг!
typeof Symbol()     // "symbol"
typeof 42n          // "bigint"</pre>
<h3>Об'єктні типи</h3>
<pre>typeof {}           // "object"
typeof []           // "object" ← масив теж!
typeof function(){} // "function"

// Як перевірити масив:
Array.isArray([])   // true
// instanceof:
[] instanceof Array // true</pre>
<h3>Type Coercion — неявне приведення типів</h3>
<pre>"5" + 2   // "52"  ← рядок перемагає
"5" - 2   // 3     ← числова операція
"5" * "3" // 15    ← обидва в число
true + 1  // 2     ← true = 1
null + 1  // 1     ← null = 0
undefined + 1 // NaN</pre>
<h3>Явне приведення</h3>
<pre>Number("42")    // 42
String(42)      // "42"
Boolean(0)      // false — falsy values:
                // 0, "", null, undefined, NaN, false</pre>`,
      ru:`<h2>Типы данных: typeof, instanceof, coercion</h2>
<pre>typeof 42       // "number"
typeof "hello"  // "string"
typeof null     // "object" ← баг!
typeof []       // "object"
Array.isArray([]) // true</pre>
<h3>Type Coercion</h3>
<pre>"5" + 2   // "52"
"5" - 2   // 3
true + 1  // 2
null + 1  // 1

// Явное приведение:
Number("42") // 42
Boolean(0)   // false</pre>` },
    `<div class="types-lab">
  <h2>🔬 Types Explorer</h2>

  <div class="expr-input-row">
    <input id="expr-in" value='"5" + 2' placeholder="Введи вираз JS" style="flex:1">
    <button onclick="evalExpr()">Виконати</button>
  </div>
  <div class="expr-result" id="expr-result">
    <span id="res-val">—</span>
    <span class="res-type" id="res-type">—</span>
    <span class="res-is-arr" id="res-arr"></span>
  </div>

  <!-- Таблиця typeof -->
  <div class="types-table">
    <h3>typeof</h3>
    <div id="types-grid"></div>
  </div>

  <!-- Coercion тест -->
  <div class="coerce-section">
    <h3>Coercion тестер</h3>
    <div class="coerce-grid" id="coerce-grid"></div>
  </div>

  <!-- Falsy values -->
  <div class="falsy-section">
    <h3>Falsy values</h3>
    <div class="falsy-items" id="falsy-items"></div>
  </div>
</div>`,
    `${BASE}
.types-lab{max-width:520px}
.expr-input-row{display:flex;gap:8px;margin-bottom:8px}
.expr-input-row input{flex:1;font-family:monospace}
.expr-result{background:#1e293b;border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px;min-height:38px}
#res-val{font-size:16px;font-weight:700;font-family:monospace;color:#f1f5f9}
.res-type{background:#334155;color:#7dd3fc;font-size:11px;font-family:monospace;padding:2px 8px;border-radius:4px}
.res-is-arr{font-size:11px;color:#f59e0b}

.types-table,.coerce-section,.falsy-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
#types-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:5px}
.tg-cell{background:#0f172a;border-radius:6px;padding:7px 10px;display:flex;justify-content:space-between;align-items:center;gap:6px;cursor:pointer;transition:.15s}
.tg-cell:hover{border:1px solid #3b82f6}
.tg-val{font-size:12px;font-family:monospace;color:#f1f5f9}
.tg-ty{font-size:11px;color:#7dd3fc;font-family:monospace}

.coerce-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.cc-row{background:#0f172a;border-radius:6px;padding:7px 10px;font-size:12px;font-family:monospace;display:flex;justify-content:space-between;align-items:center}
.cc-expr{color:#94a3b8}
.cc-res{color:#f59e0b;font-weight:700}

.falsy-items{display:flex;flex-wrap:wrap;gap:5px}
.falsy-chip{background:#0f172a;border-radius:6px;padding:5px 12px;font-size:12px;font-family:monospace;color:#ef4444;border:1px solid rgba(239,68,68,.2)}`,
    `const VALUES = [
  42, "hello", true, undefined, null, Symbol('s'), 42n,
  {}, [], function(){}, NaN, Infinity,
];

function buildGrid() {
  const grid = document.getElementById('types-grid');
  VALUES.forEach(v => {
    const d = document.createElement('div');
    d.className = 'tg-cell';
    const dispVal = typeof v === 'function' ? 'function(){}' : typeof v === 'symbol' ? 'Symbol()' : String(v);
    d.innerHTML = '<span class="tg-val">' + dispVal + '</span><span class="tg-ty">' + (typeof v) + '</span>';
    d.onclick = () => {
      document.getElementById('res-val').textContent = dispVal;
      document.getElementById('res-type').textContent = 'typeof → "' + typeof v + '"';
      document.getElementById('res-arr').textContent = Array.isArray(v) ? '✓ Array.isArray' : '';
    };
    grid.appendChild(d);
  });
}

const COERCE = [
  ['"5" + 2',     () => "5" + 2],
  ['"5" - 2',     () => "5" - 2],
  ['"5" * "3"',   () => "5" * "3"],
  ['true + 1',    () => true + 1],
  ['null + 1',    () => null + 1],
  ['undefined+1', () => undefined + 1],
  ['"" + false',  () => "" + false],
  ['[] + {}',     () => [] + {}],
];

function buildCoerce() {
  const g = document.getElementById('coerce-grid');
  COERCE.forEach(([expr, fn]) => {
    const d = document.createElement('div');
    d.className = 'cc-row';
    d.innerHTML = '<span class="cc-expr">' + expr + '</span><span class="cc-res">= ' + fn() + '</span>';
    g.appendChild(d);
  });
}

const FALSY = [0, '', null, undefined, NaN, false];
function buildFalsy() {
  const f = document.getElementById('falsy-items');
  FALSY.forEach(v => {
    const d = document.createElement('div');
    d.className = 'falsy-chip';
    d.textContent = String(v) || '""';
    f.appendChild(d);
  });
}

function evalExpr() {
  const expr = document.getElementById('expr-in').value;
  try {
    const result = eval(expr);
    document.getElementById('res-val').textContent = String(result);
    document.getElementById('res-type').textContent = 'typeof → "' + typeof result + '"';
    document.getElementById('res-arr').textContent = Array.isArray(result) ? '✓ Array.isArray' : '';
  } catch(e) {
    document.getElementById('res-val').textContent = '❌ ' + e.message;
    document.getElementById('res-type').textContent = 'error';
    document.getElementById('res-arr').textContent = '';
  }
}
document.getElementById('expr-in').addEventListener('keydown', e => e.key === 'Enter' && evalExpr());

buildGrid(); buildCoerce(); buildFalsy();`,
    [
      { level:'easy',   uk:'Натисни на комірки в таблиці typeof — подивись typeof для кожного значення. Яке значення дає typeof "object" і при цьому не є об\'єктом?',  ru:'Нажми на ячейки typeof — посмотри результат. Какое значение дает typeof "object" но не является объектом?' },
      { level:'medium', uk:'Введи у поле: [] + [] і [] + {}. Поясни результати — чому JS перетворює масиви?',  ru:'Введи в поле: [] + [] и [] + {}. Объясни результаты — почему JS конвертирует массивы?' },
      { level:'hard',   uk:'Напиши функцію deepType(val) яка повертає: "null", "array", "date", "object", "number" тощо — точніше ніж typeof.',  ru:'Напиши функцию deepType(val) которая возвращает: "null", "array", "date", "object" — точнее чем typeof.' },
    ]
  );

  /* ─── 04-02 ──────────────────────────────────────────────── */
  patch('04-02',
    { uk:`<h2>Scope і hoisting: var, let, const</h2>
<h3>Scope (область видимості)</h3>
<pre>// Глобальний scope
let global = 'я глобальний';

function foo() {
  let local = 'я локальний'; // функціональний scope
  if (true) {
    let block = 'я блочний';  // блоковий scope (let/const)
    var varBlock = 'я теж в функції'; // var ігнорує блок!
  }
  console.log(varBlock); // ✅ "я теж в функції"
  console.log(block);    // ❌ ReferenceError
}</pre>
<h3>Hoisting (підняття)</h3>
<pre>// var підіймається і ініціалізується undefined:
console.log(x); // undefined (не ReferenceError!)
var x = 5;

// let/const підіймаються, але НЕ ініціалізуються:
console.log(y); // ❌ ReferenceError (Temporal Dead Zone)
let y = 5;

// Функції підіймаються повністю:
hello(); // ✅ "Hello!"
function hello() { console.log('Hello!'); }

// Але function expression — ні:
greet(); // ❌ TypeError
const greet = () => {};</pre>
<h3>Порівняння var / let / const</h3>
<pre>           var    let    const
Scope:     func   block  block
Hoisting:  +undef +TDZ   +TDZ
Re-assign: ✅     ✅     ❌
Re-decl:   ✅     ❌     ❌</pre>`,
      ru:`<h2>Scope и hoisting</h2>
<pre>// var — функциональный scope:
if(true){ var x = 5; }
console.log(x); // 5 ✅

// let/const — блочный:
if(true){ let y = 5; }
console.log(y); // ❌ ReferenceError

// Hoisting var:
console.log(a); // undefined
var a = 10;

// Hoisting let (TDZ):
console.log(b); // ❌ ReferenceError
let b = 10;</pre>` },
    `<div class="scope-lab">
  <h2>🔭 Scope Visualizer</h2>

  <!-- Scope chain демо -->
  <div class="scope-chain">
    <div class="sc-global">
      <div class="sc-label">🌍 Global Scope</div>
      <div class="sc-var">let <span class="sc-name">color</span> = <span class="sc-val" id="sv-color">"blue"</span></div>
      <div class="sc-inner sc-func">
        <div class="sc-label">📦 Function: outer()</div>
        <div class="sc-var">let <span class="sc-name">size</span> = <span class="sc-val" id="sv-size">"large"</span></div>
        <div class="sc-inner sc-block">
          <div class="sc-label">🔷 Block: if{}</div>
          <div class="sc-var">let <span class="sc-name">shape</span> = <span class="sc-val" id="sv-shape">"circle"</span></div>
          <div class="sc-var var-var">var <span class="sc-name">varX</span> = <span class="sc-val">"escapes!"</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Що видно з кожного scope -->
  <div class="scope-visibility">
    <h3>Що видно звідки?</h3>
    <div class="sv-btns">
      <button onclick="checkScope('global')" class="scope-btn">🌍 З Global</button>
      <button onclick="checkScope('func')"   class="scope-btn">📦 З outer()</button>
      <button onclick="checkScope('block')"  class="scope-btn">🔷 З if{}</button>
    </div>
    <pre class="out" id="scope-out">Вибери scope →</pre>
  </div>

  <!-- Hoisting demo -->
  <div class="hoist-section">
    <h3>Hoisting тестер</h3>
    <div class="hoist-btns">
      <button onclick="testHoist('var')">var hoisting</button>
      <button onclick="testHoist('let')">let TDZ</button>
      <button onclick="testHoist('func')">function hoisting</button>
      <button onclick="testHoist('expr')">function expr</button>
    </div>
    <pre class="out" id="hoist-out">Натисни кнопку →</pre>
  </div>

  <!-- var vs let quiz -->
  <div class="vl-quiz">
    <h3>var vs let: передбач результат</h3>
    <div class="vl-q" id="vl-q">
      <div class="vl-code" id="vl-code"></div>
      <div class="vl-opts" id="vl-opts"></div>
    </div>
    <div class="vl-score">Правильно: <span id="vl-correct">0</span> / <span id="vl-total">0</span></div>
  </div>
</div>`,
    `${BASE}
.scope-lab{max-width:520px}
.scope-chain{margin-bottom:12px}
.sc-global{background:#1e293b;border-radius:10px;padding:12px;border-left:3px solid #3b82f6}
.sc-func{background:#162032;border-radius:8px;padding:10px;margin-top:8px;border-left:3px solid #10b981}
.sc-block{background:#0f172a;border-radius:8px;padding:10px;margin-top:8px;border-left:3px solid #f59e0b}
.sc-label{font-size:11px;font-weight:700;color:#64748b;margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em}
.sc-var{font-size:12px;font-family:monospace;color:#94a3b8;margin-bottom:4px}
.sc-name{color:#7dd3fc}
.sc-val{color:#f59e0b}
.var-var .sc-name{color:#ef4444}

.scope-visibility,.hoist-section,.vl-quiz{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.sv-btns,.hoist-btns{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.sv-btns button,.hoist-btns button{padding:6px 10px;font-size:11px}

.vl-code{background:#0f172a;border-radius:8px;padding:10px;font-size:12px;font-family:monospace;color:#94a3b8;margin-bottom:8px;white-space:pre;line-height:1.7}
.vl-opts{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.vl-opt{padding:6px 12px;font-size:12px;font-family:monospace;cursor:pointer;transition:.2s}
.vl-opt.correct{border-color:#10b981;color:#10b981;background:rgba(16,185,129,.1)}
.vl-opt.wrong{border-color:#ef4444;color:#ef4444;background:rgba(239,68,68,.1)}
.vl-score{font-size:12px;color:#64748b;font-family:monospace}
.vl-score span{color:#3b82f6;font-weight:700}`,
    `const SCOPE_INFO = {
  global: {
    text: 'З Global scope видно тільки глобальні змінні:',
    vars: ['color = "blue"', '// size — недоступна (функц. scope)', '// shape — недоступна (блочн. scope)', '// varX — недоступна (функц. scope)']
  },
  func: {
    text: 'З outer() видно все до global:',
    vars: ['color = "blue"  (з global)', 'size = "large"  (локальна)', 'varX = "escapes!"  (var "витікає" з блоку)', '// shape — недоступна (блочн. scope)']
  },
  block: {
    text: 'З if{} блоку видно всі зовнішні scope:',
    vars: ['color = "blue"  (global)', 'size = "large"  (function)', 'shape = "circle" (block — let)', 'varX = "escapes!"  (var — також тут)']
  }
};

function checkScope(scope) {
  const info = SCOPE_INFO[scope];
  document.getElementById('scope-out').textContent = info.text + '\\n' + info.vars.map(v=>'  ' + v).join('\\n');
}

const HOIST = {
  var:  () => {
    let code = 'console.log(x); // → ?\\nvar x = 5;';
    let result = 'Результат: undefined\\n\\n✅ var ПІДНІМАЄТЬСЯ і ініціалізується undefined\\n   Це еквівалентно:\\n   var x;\\n   console.log(x); // undefined\\n   x = 5;';
    return code + '\\n\\n' + result;
  },
  let:  () => 'console.log(y); // → ?\\nlet y = 5;\\n\\nРезультат: ❌ ReferenceError: Cannot access \'y\' before initialization\\n\\n⚠️  let/const теж підіймаються, але НЕ ініціалізуються.\\n   Зона від початку блоку до let = TDZ (Temporal Dead Zone)',
  func: () => 'hello();\\nfunction hello() { console.log("Hello!"); }\\n\\nРезультат: ✅ "Hello!"\\n\\n✅ Оголошення функцій підіймаються ПОВНІСТЮ — і назва, і тіло.',
  expr: () => 'greet();\\nconst greet = () => console.log("Hi");\\n\\nРезультат: ❌ ReferenceError: Cannot access \'greet\' before initialization\\n\\n❌ Function expressions — це просто змінні. TDZ!',
};
function testHoist(k) {
  document.getElementById('hoist-out').textContent = HOIST[k]();
}

// Quiz
const QUIZ = [
  { code: 'var i = 0;\nfor(var i=0;i<3;i++){}\nconsole.log(i);', opts:['0','3','undefined','Error'], ans:1 },
  { code: 'let j = 0;\nfor(let j=0;j<3;j++){}\nconsole.log(j);', opts:['0','3','undefined','Error'], ans:0 },
  { code: 'console.log(a);\nvar a = 1;',  opts:['1','undefined','null','Error'], ans:1 },
  { code: 'console.log(b);\nlet b = 1;',  opts:['1','undefined','null','Error'], ans:3 },
];
let qIdx=0, correct=0, total=0;
function showQ() {
  if(qIdx >= QUIZ.length) qIdx = 0;
  const q = QUIZ[qIdx];
  document.getElementById('vl-code').textContent = q.code;
  const optsEl = document.getElementById('vl-opts');
  optsEl.innerHTML = '';
  q.opts.forEach((o,i) => {
    const b = document.createElement('button');
    b.className='vl-opt'; b.textContent=o;
    b.onclick = () => {
      total++;
      if(i===q.ans){correct++;b.classList.add('correct');}
      else{b.classList.add('wrong');optsEl.children[q.ans].classList.add('correct');}
      document.getElementById('vl-correct').textContent=correct;
      document.getElementById('vl-total').textContent=total;
      Array.from(optsEl.children).forEach(c=>c.onclick=null);
      setTimeout(()=>{qIdx++;showQ();},1200);
    };
    optsEl.appendChild(b);
  });
}
showQ();`,
    [
      { level:'easy',   uk:'Клікни "З Global", "З outer()", "З if{}" — прочитай що видно з кожного scope. Де доступна varX?',  ru:'Кликни "С Global", "С outer()", "С if{}" — прочитай что видно. Где доступна varX?' },
      { level:'medium', uk:'Пройди Quiz до кінця (4 питання) — чому for(var i) і for(let i) дають різний результат для console.log(i) після циклу?',  ru:'Пройди Quiz до конца — почему for(var i) и for(let i) дают разный результат после цикла?' },
      { level:'hard',   uk:'Написи функцію makeCounter() яка використовує замикання і var — поясни чому var у for-loop дає баги, а let — ні.',  ru:'Напиши функцию makeCounter() с замыканием и var — объясни почему var в for-loop дает баги.' },
    ]
  );

  /* ─── 04-03 ──────────────────────────────────────────────── */
  patch('04-03',
    { uk:`<h2>Closures: замикання</h2>
<p>Замикання — це функція яка "запам'ятовує" зовнішній scope навіть після того, як зовнішня функція завершилась.</p>
<h3>Базовий приклад</h3>
<pre>function makeCounter(start = 0) {
  let count = start; // ← приватна змінна!
  return {
    increment: () => ++count,
    decrement: () => --count,
    value:     () => count,
    reset:     () => { count = start; }
  };
}
const c = makeCounter(10);
c.increment(); // 11
c.increment(); // 12
c.value();     // 12</pre>
<h3>Навіщо замикання?</h3>
<ul>
  <li>Приватний стан (без класів)</li>
  <li>Фабрики функцій</li>
  <li>Мемоїзація (кешування результатів)</li>
  <li>Partial application / currying</li>
</ul>
<h3>Класична пастка — var у циклі</h3>
<pre>// Баг: всі функції захоплюють ОДНУ var i
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i)); // замикається на i
}
fns[0](); // 3 (не 0!)

// Виправлення 1: let
for (let i = 0; i < 3; i++) { fns.push(() => console.log(i)); }

// Виправлення 2: IIFE
for (var i = 0; i < 3; i++) {
  (function(j){ fns.push(() => console.log(j)); })(i);
}</pre>`,
      ru:`<h2>Closures — замыкания</h2>
<pre>function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    value:     () => count,
  };
}
const c = makeCounter(10);
c.increment(); // 11</pre>
<h3>Ловушка var в цикле</h3>
<pre>// Баг:
for(var i=0;i<3;i++) fns.push(()=>i);
fns[0](); // 3! (не 0)

// Фикс:
for(let i=0;i<3;i++) fns.push(()=>i);
fns[0](); // 0 ✅</pre>` },
    `<div class="closure-lab">
  <h2>🔒 Closure Lab</h2>

  <!-- Counter factory -->
  <div class="cl-section">
    <h3>Counter Factory</h3>
    <div class="counter-factory">
      <div class="cf-controls">
        <label>Start: <input id="cf-start" type="number" value="0" style="width:60px"></label>
        <button onclick="createCounter()">+ Новий лічильник</button>
      </div>
      <div class="cf-counters" id="cf-counters"></div>
    </div>
  </div>

  <!-- Мемоїзація -->
  <div class="cl-section">
    <h3>Мемоїзація (кешування)</h3>
    <div class="memo-demo">
      <p class="memo-desc">Фіббоначчі без і з кешем:</p>
      <div class="memo-btns">
        <button onclick="calcFib(false)">Fib без кешу</button>
        <button onclick="calcFib(true)">Fib з кешем</button>
        <label>n: <input id="fib-n" type="number" value="30" min="1" max="45" style="width:60px"></label>
      </div>
      <pre class="out" id="memo-out">—</pre>
    </div>
  </div>

  <!-- Var у циклі -->
  <div class="cl-section">
    <h3>var vs let у циклі</h3>
    <div class="loop-btns">
      <button onclick="loopDemo('var')">var — баг</button>
      <button onclick="loopDemo('let')">let — правильно</button>
      <button onclick="loopDemo('iife')">IIFE — фікс</button>
    </div>
    <pre class="out" id="loop-out">—</pre>
  </div>

  <!-- Currying -->
  <div class="cl-section">
    <h3>Currying (часткове застосування)</h3>
    <div class="curry-demo">
      <div class="curry-row">
        <label>Множник: <input id="curry-mult" type="number" value="3" style="width:55px"></label>
        <button onclick="buildCurry()">Побудувати</button>
      </div>
      <div class="curry-results" id="curry-results"></div>
    </div>
  </div>
</div>`,
    `${BASE}
.closure-lab{max-width:520px}
.cl-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.cl-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}

.cf-controls{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;font-size:12px;color:#64748b}
.cf-controls input{width:60px;padding:6px 8px;font-size:12px}
.cf-counters{display:flex;gap:8px;flex-wrap:wrap}
.counter-card{background:#0f172a;border-radius:8px;padding:10px 14px;min-width:110px;position:relative}
.cc-title{font-size:10px;color:#64748b;margin-bottom:4px}
.cc-val{font-size:28px;font-weight:900;color:#3b82f6;font-variant-numeric:tabular-nums;margin-bottom:8px;text-align:center}
.cc-btns{display:flex;gap:5px;justify-content:center}
.cc-btns button{padding:4px 8px;font-size:13px;font-weight:700}
.cc-close{position:absolute;top:6px;right:6px;padding:1px 5px;font-size:10px;border-color:transparent;color:#475569}
.cc-close:hover{border-color:#ef4444;color:#ef4444}

.memo-desc{font-size:12px;color:#64748b;margin-bottom:6px}
.memo-btns{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px;font-size:12px;color:#64748b}
.memo-btns input{width:60px;padding:6px;font-size:12px}

.loop-btns{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap}

.curry-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:12px;color:#64748b}
.curry-row input{width:55px;padding:6px;font-size:12px}
.curry-results{display:flex;flex-wrap:wrap;gap:6px}
.curry-chip{background:#0f172a;border-radius:6px;padding:5px 10px;font-size:12px;font-family:monospace;color:#7dd3fc}`,
    `// Counter factory
let counterN = 0;
function makeCounter(start) {
  let count = start;
  const id = ++counterN;
  return {
    id,
    increment: () => ++count,
    decrement: () => --count,
    value:     () => count,
    reset:     () => { count = start; return count; },
  };
}

const counters = {};
function createCounter() {
  const start = parseInt(document.getElementById('cf-start').value) || 0;
  const c = makeCounter(start);
  counters[c.id] = c;
  renderCounters();
}

function renderCounters() {
  const el = document.getElementById('cf-counters');
  el.innerHTML = '';
  Object.values(counters).forEach(c => {
    const d = document.createElement('div');
    d.className = 'counter-card';
    d.id = 'cc-' + c.id;
    d.innerHTML =
      '<div class="cc-title">Counter #' + c.id + '</div>' +
      '<div class="cc-val" id="cv-' + c.id + '">' + c.value() + '</div>' +
      '<div class="cc-btns">' +
        '<button onclick="counterOp(' + c.id + ',\'dec\')">−</button>' +
        '<button onclick="counterOp(' + c.id + ',\'reset\')">↺</button>' +
        '<button onclick="counterOp(' + c.id + ',\'inc\')">+</button>' +
      '</div>' +
      '<button class="cc-close" onclick="deleteCounter(' + c.id + ')">✕</button>';
    el.appendChild(d);
  });
}

function counterOp(id, op) {
  const c = counters[id];
  if(op==='inc') c.increment(); else if(op==='dec') c.decrement(); else c.reset();
  document.getElementById('cv-'+id).textContent = c.value();
}
function deleteCounter(id) { delete counters[id]; renderCounters(); }
createCounter();

// Мемоїзація
function memoize(fn) {
  const cache = {};
  return function(n) {
    if(n in cache) return cache[n];
    return cache[n] = fn.call(this, n);
  };
}
function fibSlow(n) { return n<=1?n:fibSlow(n-1)+fibSlow(n-2); }
const fibFast = memoize(function(n){ return n<=1?n:fibFast(n-1)+fibFast(n-2); });

function calcFib(withMemo) {
  const n = parseInt(document.getElementById('fib-n').value)||30;
  const t0 = performance.now();
  const result = withMemo ? fibFast(n) : fibSlow(n);
  const t1 = performance.now();
  document.getElementById('memo-out').textContent =
    'fib(' + n + ') = ' + result + '\nЧас: ' + (t1-t0).toFixed(3) + 'мс\n' + (withMemo?'✅ Кеш: O(n)':'❌ Без кешу: O(2^n)');
}

// Var vs Let
function loopDemo(type) {
  const fns = [];
  if(type==='var') {
    for(var i=0;i<4;i++) fns.push(()=>i);
    document.getElementById('loop-out').textContent =
      'for(var i...)\nfns[0]() = ' + fns[0]() + '\nfns[1]() = ' + fns[1]() + '\nfns[2]() = ' + fns[2]()+
      '\n\n❌ Всі повертають ' + fns[0]() + '!\n   var i поділяється між усіма функціями';
  } else if(type==='let') {
    for(let i=0;i<4;i++) fns.push(()=>i);
    document.getElementById('loop-out').textContent =
      'for(let i...)\nfns[0]() = ' + fns[0]() + '\nfns[1]() = ' + fns[1]() + '\nfns[2]() = ' + fns[2]()+
      '\n\n✅ Кожна ітерація let = новий scope!';
  } else {
    for(var i=0;i<4;i++) (function(j){ fns.push(()=>j); })(i);
    document.getElementById('loop-out').textContent =
      'for(var i) + IIFE\nfns[0]() = ' + fns[0]() + '\nfns[1]() = ' + fns[1]() + '\nfns[2]() = ' + fns[2]()+
      '\n\n✅ IIFE створює новий scope для j';
  }
}

// Currying
function buildCurry() {
  const mult = parseInt(document.getElementById('curry-mult').value)||2;
  const multiply = (factor) => (n) => n * factor;
  const byMult = multiply(mult);
  const el = document.getElementById('curry-results');
  el.innerHTML = '';
  [1,2,3,4,5,7,10].forEach(n => {
    const c = document.createElement('div');
    c.className = 'curry-chip';
    c.textContent = 'multiply(' + mult + ')(' + n + ') = ' + byMult(n);
    el.appendChild(c);
  });
}
buildCurry();`,
    [
      { level:'easy',   uk:'Натисни "var — баг" і "let — правильно" — поясни чому for(var) повертає однакові числа.',  ru:'Нажми "var — баг" и "let — правильно" — объясни почему for(var) возвращает одинаковые числа.' },
      { level:'medium', uk:'Порівняй час calcFib(false) і calcFib(true) для n=40 — яка різниця? Змінний fib-n контролює n.',  ru:'Сравни время calcFib(false) и calcFib(true) для n=40 — какая разница?' },
      { level:'hard',   uk:'Реалізуй once(fn) — функцію яка дозволяє викликати fn тільки один раз, при повторних викликах повертає перший результат.',  ru:'Реализуй once(fn) — функцию которая позволяет вызвать fn только один раз, при повторных — возвращает первый результат.' },
    ]
  );

  /* ─── 04-04 ──────────────────────────────────────────────── */
  patch('04-04',
    { uk:`<h2>Об'єкти: методи, this та shorthand</h2>
<h3>Shorthand properties та методи</h3>
<pre>const name = "Alice";
const age  = 17;

// Shorthand properties:
const user = { name, age };   // { name:"Alice", age:17 }

// Shorthand методи:
const obj = {
  greet() { return \`Hi, \${this.name}\`; }, // скорочений запис
  greet2: function() { ... },  // старий запис
  greet3: () => { ... },       // arrow — НЕ має власного this!
};</pre>
<h3>this</h3>
<pre>const person = {
  name: "Bob",
  sayHi()  { return this.name; },  // this = person
  sayHiArr: () => this.name,       // this = window/undefined!
};

// Binding this:
const bound = person.sayHi.bind({ name: "Alice" });
bound(); // "Alice"
person.sayHi.call({ name: "Carol" }); // "Carol"
person.sayHi.apply({ name: "Dave" });  // "Dave"</pre>
<h3>Object методи</h3>
<pre>Object.keys(obj)     // масив ключів
Object.values(obj)   // масив значень
Object.entries(obj)  // масив [key, value]
Object.assign({}, a, b) // злиття об'єктів
Object.freeze(obj)   // заморожує — immutable</pre>`,
      ru:`<h2>Объекты: методы, this</h2>
<pre>const name = "Alice";
const obj = { name, greet() { return this.name; } };

// this = объект вызова
// arrow function НЕ имеет своего this!

// bind/call/apply:
fn.bind({ name:"Bob" })()
fn.call({ name:"Bob" })
fn.apply({ name:"Bob" })

// Object методы:
Object.keys(obj)     // ключи
Object.values(obj)   // значения
Object.entries(obj)  // [[key,val],...]</pre>` },
    `<div class="obj-lab">
  <h2>📦 Object Lab</h2>

  <!-- Конструктор об'єкта -->
  <div class="obj-section">
    <h3>Object Builder</h3>
    <div class="ob-fields">
      <input id="ob-key" placeholder="key" style="width:120px">
      <input id="ob-val" placeholder="value">
      <select id="ob-type">
        <option value="string">string</option>
        <option value="number">number</option>
        <option value="boolean">boolean</option>
        <option value="method">method</option>
      </select>
      <button onclick="addProp()">+ Додати</button>
    </div>
    <pre class="out" id="ob-preview">const obj = {};</pre>
    <div class="ob-actions">
      <button onclick="callMethod()">Викликати метод greet()</button>
      <button onclick="showKeys()">Object.keys()</button>
      <button onclick="showEntries()">Object.entries()</button>
    </div>
    <pre class="out" id="ob-result">—</pre>
  </div>

  <!-- this демо -->
  <div class="obj-section">
    <h3>this у різних контекстах</h3>
    <div class="this-demos">
      <div class="this-card">
        <div class="this-label">Звичайна функція</div>
        <div class="this-method">greet() { return this.name }</div>
        <input id="this-name" value="Alice" style="width:100px;margin-top:6px">
        <button onclick="testThis('regular')">Викликати</button>
        <div class="this-result" id="tr-regular">—</div>
      </div>
      <div class="this-card">
        <div class="this-label">Arrow функція</div>
        <div class="this-method">greet: () => this.name</div>
        <button onclick="testThis('arrow')" style="margin-top:6px">Викликати</button>
        <div class="this-result" id="tr-arrow">—</div>
      </div>
      <div class="this-card">
        <div class="this-label">.bind() / .call()</div>
        <div class="this-method">fn.call({ name })</div>
        <input id="bind-name" value="Bob" style="width:100px;margin-top:6px">
        <button onclick="testThis('bind')">Викликати</button>
        <div class="this-result" id="tr-bind">—</div>
      </div>
    </div>
  </div>

  <!-- Object.assign/freeze -->
  <div class="obj-section">
    <h3>Object.assign та Object.freeze</h3>
    <button onclick="demoAssign()">Object.assign</button>
    <button onclick="demoFreeze()">Object.freeze</button>
    <pre class="out" id="oa-out">—</pre>
  </div>
</div>`,
    `${BASE}
.obj-lab{max-width:520px}
.obj-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.obj-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.ob-fields{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.ob-fields input,.ob-fields select{padding:7px 10px;font-size:12px}
.ob-actions{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}
.ob-actions button{padding:6px 10px;font-size:11px}

.this-demos{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.this-card{background:#0f172a;border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:4px}
.this-label{font-size:10px;color:#3b82f6;font-weight:700;text-transform:uppercase}
.this-method{font-size:11px;font-family:monospace;color:#64748b;line-height:1.5}
.this-card input{padding:5px 8px;font-size:12px;margin-top:auto}
.this-card button{padding:5px 10px;font-size:11px}
.this-result{font-size:12px;font-family:monospace;color:#f59e0b;min-height:18px;margin-top:4px}`,
    `// Object builder
const OBJ = {};
function addProp() {
  let key = document.getElementById('ob-key').value.trim();
  let val = document.getElementById('ob-val').value.trim();
  const type = document.getElementById('ob-type').value;
  if(!key) return;
  if(type==='number') OBJ[key] = parseFloat(val)||0;
  else if(type==='boolean') OBJ[key] = val==='true';
  else if(type==='method') OBJ[key] = function(){ return \`Hi from \${this.name||'?'}\`; };
  else OBJ[key] = val;
  document.getElementById('ob-key').value='';
  document.getElementById('ob-val').value='';
  updatePreview();
}
function updatePreview() {
  const lines = Object.entries(OBJ).map(([k,v]) =>
    \`  \${k}: \${typeof v==='function'?'function(){ return "Hi from "+this.name }':JSON.stringify(v)}\`
  );
  document.getElementById('ob-preview').textContent =
    \`const obj = {\n\${lines.join(',\n')}\n};\`;
}
function callMethod() {
  const methods = Object.entries(OBJ).filter(([,v])=>typeof v==='function');
  if(!methods.length) { document.getElementById('ob-result').textContent='Немає методів — додай тип "method"'; return; }
  const results = methods.map(([k,fn]) => \`obj.\${k}() = "\${fn.call(OBJ)}"\`);
  document.getElementById('ob-result').textContent = results.join('\n');
}
function showKeys() {
  document.getElementById('ob-result').textContent =
    \`Object.keys(obj) = [\${Object.keys(OBJ).map(k=>'"'+k+'"').join(', ')}]\`;
}
function showEntries() {
  document.getElementById('ob-result').textContent =
    'Object.entries(obj):\n' + Object.entries(OBJ).map(([k,v])=>\`  ["\${k}", \${JSON.stringify(v)||'fn'}]\`).join('\n');
}

// this demos
const person = {
  name: 'Alice',
  greet() { return \`Hi, \${this.name}\`; },
  greetArrow: () => 'Arrow: this.name = ' + (typeof window !== 'undefined' ? 'window.name="' + (window.name||'') + '"' : 'undefined'),
};

function testThis(type) {
  const name = document.getElementById('this-name').value;
  if(type==='regular') {
    person.name = name;
    document.getElementById('tr-regular').textContent = person.greet();
  } else if(type==='arrow') {
    document.getElementById('tr-arrow').textContent = person.greetArrow();
  } else {
    const bindName = document.getElementById('bind-name').value;
    const result = person.greet.call({ name: bindName });
    document.getElementById('tr-bind').textContent = \`call({name:"\${bindName}"}) → "\${result}"\`;
  }
}

function demoAssign() {
  const a = { color:'blue', size:'M' };
  const b = { size:'L', weight:70 };
  const merged = Object.assign({}, a, b);
  document.getElementById('oa-out').textContent =
    \`a = \${JSON.stringify(a)}\nb = \${JSON.stringify(b)}\n\nObject.assign({}, a, b) =\n\${JSON.stringify(merged, null, 2)}\n\n// b.size перезаписав a.size!\`;
}
function demoFreeze() {
  const cfg = Object.freeze({ api: 'https://api.example.com', version: 1 });
  try {
    cfg.api = 'changed'; // ← тихо ігнорується (або TypeError в strict mode)
  } catch(e) {}
  document.getElementById('oa-out').textContent =
    \`Object.freeze(cfg)\ncfg.api = "changed" // спроба зміни...\n\nЗначення після: \${JSON.stringify(cfg)}\n\n✅ api не змінилось — об'єкт заморожений!\`;
}
updatePreview();`,
    [
      { level:'easy',   uk:'Додай prop "name" (string "Alice") і prop "age" (number 17). Натисни Object.keys() і Object.entries().',  ru:'Добавь prop "name" (string) и "age" (number). Нажми Object.keys() и Object.entries().' },
      { level:'medium', uk:'Натисни "Arrow функція → Викликати" — прочитай результат. Чому arrow не має власного this?',  ru:'Нажми "Arrow → Викликати" — прочитай результат. Почему arrow не имеет своего this?' },
      { level:'hard',   uk:'Реалізуй deepClone(obj) через JSON.parse(JSON.stringify(obj)) і через spread {...obj} — чим вони відрізняються?',  ru:'Реализуй deepClone через JSON.parse(JSON.stringify()) и через spread {...obj} — чем они отличаются?' },
    ]
  );

  /* ─── 04-05 ──────────────────────────────────────────────── */
  patch('04-05',
    { uk:`<h2>Деструктуризація масивів та об'єктів</h2>
<h3>Деструктуризація об'єктів</h3>
<pre>const user = { name:'Alice', age:17, city:'Kyiv' };

// Базова:
const { name, age } = user;

// Перейменування:
const { name: userName } = user;

// Значення за замовчуванням:
const { country = 'Ukraine' } = user;

// Вкладена:
const { address: { street } } = {
  address: { street: 'Main St', zip: '01001' }
};

// У параметрах функції:
function greet({ name, age = 0 }) {
  return \`\${name}, \${age}\`;
}</pre>
<h3>Деструктуризація масивів</h3>
<pre>const [first, second, , fourth] = [1, 2, 3, 4];
// Пропуск через кому

const [a, b, ...rest] = [1, 2, 3, 4, 5];
// rest = [3, 4, 5]

// Swap змінних:
let x = 1, y = 2;
[x, y] = [y, x]; // x=2, y=1</pre>`,
      ru:`<h2>Деструктуризация</h2>
<pre>// Объект:
const { name, age = 0 } = user;
const { name: userName } = user; // переименование

// Массив:
const [first, , third] = [1, 2, 3];
const [a, ...rest] = [1, 2, 3, 4];

// Swap:
[x, y] = [y, x];

// В параметрах:
function fn({ name, age = 0 }) { ... }</pre>` },
    `<div class="destr-lab">
  <h2>🎯 Destructuring Lab</h2>

  <!-- Об'єкт -->
  <div class="ds-section">
    <h3>Деструктуризація об'єкта</h3>
    <div class="ds-obj-edit">
      <textarea id="ds-obj" rows="5">{
  "name": "Аліса",
  "age": 17,
  "city": "Київ",
  "skills": ["HTML","CSS","JS"]
}</textarea>
      <button onclick="parseObj()">Аналізувати</button>
    </div>
    <pre class="out" id="ds-obj-out">—</pre>
  </div>

  <!-- Масив -->
  <div class="ds-section">
    <h3>Деструктуризація масиву</h3>
    <div class="ds-arr-edit">
      <input id="ds-arr" value="10, 20, 30, 40, 50" placeholder="числа через кому" style="flex:1">
      <button onclick="parseArr()">Аналізувати</button>
    </div>
    <pre class="out" id="ds-arr-out">—</pre>
  </div>

  <!-- Swap demo -->
  <div class="ds-section">
    <h3>Swap змінних</h3>
    <div class="swap-demo">
      <div class="swap-vars">
        <label>x: <input id="sw-x" value="Яблуко" style="width:90px"></label>
        <button class="swap-arrow" onclick="swapVars()">⇄ Swap</button>
        <label>y: <input id="sw-y" value="Банан" style="width:90px"></label>
      </div>
      <pre class="out" id="swap-out">—</pre>
    </div>
  </div>

  <!-- Вкладена -->
  <div class="ds-section">
    <h3>Вкладена деструктуризація</h3>
    <button onclick="demoNested()">Показати</button>
    <pre class="out" id="nested-out">—</pre>
  </div>
</div>`,
    `${BASE}
.destr-lab{max-width:520px}
.ds-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.ds-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.ds-obj-edit{display:flex;flex-direction:column;gap:6px;margin-bottom:8px}
.ds-obj-edit textarea{font-family:monospace;font-size:12px;padding:8px;resize:vertical}
.ds-arr-edit{display:flex;gap:6px;margin-bottom:8px}
.ds-arr-edit input{flex:1;font-family:monospace}
.swap-demo{display:flex;flex-direction:column;gap:8px}
.swap-vars{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;color:#64748b}
.swap-vars input{padding:6px 10px;font-size:12px}
.swap-arrow{padding:6px 14px;font-size:16px}`,
    `function parseObj() {
  try {
    const obj = JSON.parse(document.getElementById('ds-obj').value);
    const keys = Object.keys(obj);
    let out = '// Деструктуризація:\n';
    out += 'const { ' + keys.join(', ') + ' } = obj;\n\n';
    keys.forEach(k => {
      const v = obj[k];
      out += \`\${k} = \${JSON.stringify(v)}\n\`;
    });
    // Якщо є масив — деструктуруємо
    const arrProp = keys.find(k => Array.isArray(obj[k]));
    if(arrProp) {
      const arr = obj[arrProp];
      out += \`\n// Вкладений масив:\nconst { \${arrProp}: [first\${arr.length>1?', second':''}] } = obj;\n\`;
      out += \`first = \${JSON.stringify(arr[0])}\${arr.length>1?', second = '+JSON.stringify(arr[1]):''}\`;
    }
    document.getElementById('ds-obj-out').textContent = out;
  } catch(e) {
    document.getElementById('ds-obj-out').textContent = '❌ ' + e.message;
  }
}

function parseArr() {
  const vals = document.getElementById('ds-arr').value.split(',').map(s => s.trim()).filter(Boolean);
  const nums = vals.map(v => isNaN(v) ? v.replace(/'/g,'') : Number(v));
  const [first, second, , fourth, ...rest] = nums;
  let out = \`const arr = [\${nums.map(v=>JSON.stringify(v)).join(', ')}];\n\n\`;
  out += \`const [first, second, , fourth, ...rest] = arr;\n\n\`;
  out += \`first  = \${JSON.stringify(first)}\n\`;
  out += \`second = \${JSON.stringify(second)}\n\`;
  out += \`fourth = \${JSON.stringify(fourth)}\n\`;
  out += \`rest   = \${JSON.stringify(rest)}\n\`;
  out += \`\n// Кількість пропущених: 1 (third)\`;
  document.getElementById('ds-arr-out').textContent = out;
}

function swapVars() {
  let x = document.getElementById('sw-x').value;
  let y = document.getElementById('sw-y').value;
  const before = \`До: x = "\${x}", y = "\${y}"\`;
  [x, y] = [y, x];
  document.getElementById('sw-x').value = x;
  document.getElementById('sw-y').value = y;
  document.getElementById('swap-out').textContent =
    before + \`\n[x, y] = [y, x];\nПісля: x = "\${x}", y = "\${y}"\`;
}

function demoNested() {
  const data = {
    user: { name: 'Аліса', address: { city: 'Київ', zip: '01001' } },
    scores: [95, 87, 100],
  };
  const { user: { name, address: { city } }, scores: [best, ...others] } = data;
  document.getElementById('nested-out').textContent =
    \`const data = { user: { name, address: { city, zip } }, scores:[95,87,100] };\n\n\` +
    \`const { user: { name, address: { city } }, scores: [best, ...others] } = data;\n\n\` +
    \`name    = "\${name}"\ncity    = "\${city}"\nbest    = \${best}\nothers  = [\${others}]\`;
}`,
    [
      { level:'easy',   uk:'Зміни JSON у полі "Деструктуризація об\'єкта" — додай поле "email" і натисни Аналізувати.',  ru:'Измени JSON в поле — добавь "email" и нажми Аналізувати.' },
      { level:'medium', uk:'У swap demo — заміни "Яблуко" і "Банан" своїми значеннями. Поясни як [x,y]=[y,x] працює без третьої змінної.',  ru:'В swap demo — замени значения. Объясни как [x,y]=[y,x] работает без третьей переменной.' },
      { level:'hard',   uk:'Напиши функцію яка приймає об\'єкт { first, last, age, city } і повертає рядок через деструктуризацію у параметрах функції.',  ru:'Напиши функцию которая принимает { first, last, age, city } через деструктуризацию в параметрах.' },
    ]
  );

  /* ─── 04-06 ──────────────────────────────────────────────── */
  patch('04-06',
    { uk:`<h2>Spread ... та rest ... оператори</h2>
<h3>Spread — розпакування</h3>
<pre>// Масиви:
const a = [1, 2, 3];
const b = [...a, 4, 5];  // [1, 2, 3, 4, 5]
Math.max(...a);           // 3

// Об'єкти:
const base = { color: 'blue', size: 'M' };
const extended = { ...base, size: 'L', weight: 70 };
// size: 'L' перезаписує!

// Клонування (shallow copy!):
const clone = [...a];
const objClone = { ...base };</pre>
<h3>Rest — збір решти</h3>
<pre>// У параметрах функції (завжди останній!):
function sum(first, ...rest) {
  return rest.reduce((acc, n) => acc + n, first);
}
sum(1, 2, 3, 4); // 10

// У деструктуризації:
const [head, ...tail] = [1, 2, 3, 4];
const { name, ...other } = { name:'Alice', age:17, city:'Kyiv' };
// other = { age:17, city:'Kyiv' }</pre>
<h3>Практика</h3>
<pre>// Merge об'єктів:
const merged = { ...defaults, ...overrides };

// Передача args у функцію:
const nums = [1, 2, 3];
Math.max(...nums); // замість Math.max.apply(null, nums)</pre>`,
      ru:`<h2>Spread и rest</h2>
<pre>// Spread — распаковка:
const b = [...a, 4, 5];
const obj = { ...base, size: 'L' };

// Rest — сбор остатка:
function sum(first, ...rest) {
  return rest.reduce((a,n)=>a+n, first);
}

// Деструктуризация с rest:
const [head, ...tail] = [1,2,3];
const { name, ...other } = obj;</pre>` },
    `<div class="sr-lab">
  <h2>🔀 Spread & Rest</h2>

  <!-- Spread масивів -->
  <div class="sr-section">
    <h3>Spread масивів</h3>
    <div class="sr-arrays">
      <div class="sr-input">
        <label>Масив A: <input id="arr-a" value="1,2,3" style="width:120px"></label>
        <label>Масив B: <input id="arr-b" value="4,5,6" style="width:120px"></label>
        <button onclick="spreadDemo()">Spread</button>
      </div>
      <pre class="out" id="spread-out">—</pre>
    </div>
  </div>

  <!-- Spread об'єктів -->
  <div class="sr-section">
    <h3>Spread об'єктів (merge)</h3>
    <div class="sr-input">
      <textarea id="obj-a" rows="3" style="flex:1;font-family:monospace;font-size:12px">{"color":"blue","size":"M"}</textarea>
      <textarea id="obj-b" rows="3" style="flex:1;font-family:monospace;font-size:12px">{"size":"XL","weight":72}</textarea>
    </div>
    <button onclick="spreadObj()">Merge ({...a,...b})</button>
    <pre class="out" id="obj-spread-out">—</pre>
  </div>

  <!-- Rest функція -->
  <div class="sr-section">
    <h3>Rest у функції</h3>
    <input id="rest-args" value="10, 20, 30, 40, 50" placeholder="числа через кому" style="width:100%">
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0">
      <button onclick="restSum()">sum(first, ...rest)</button>
      <button onclick="restMax()">max(...nums)</button>
      <button onclick="restLogger()">logger(label, ...msgs)</button>
    </div>
    <pre class="out" id="rest-out">—</pre>
  </div>

  <!-- Shallow copy демо -->
  <div class="sr-section">
    <h3>Shallow vs Deep copy</h3>
    <button onclick="shallowDemo()">Показати shallow проблему</button>
    <pre class="out" id="shallow-out">—</pre>
  </div>
</div>`,
    `${BASE}
.sr-lab{max-width:520px}
.sr-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.sr-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.sr-input{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;align-items:center;font-size:12px;color:#64748b}
.sr-input input,.sr-input textarea{flex:1;min-width:100px}
.sr-input textarea{padding:6px;resize:vertical}
.sr-section>button{margin-bottom:8px;font-size:12px;padding:6px 12px}`,
    `function parseNums(str) {
  return str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
}

function spreadDemo() {
  const a = parseNums(document.getElementById('arr-a').value);
  const b = parseNums(document.getElementById('arr-b').value);
  const merged = [...a, ...b];
  const [first, ...rest] = merged;
  document.getElementById('spread-out').textContent =
    \`a = [\${a}]\nb = [\${b}]\n\n[...a, ...b]  = [\${merged}]\n\nMath.max(...merged) = \${Math.max(...merged)}\nMath.min(...merged) = \${Math.min(...merged)}\n\nconst [first, ...rest] = merged;\nfirst = \${first}\nrest  = [\${rest}]\`;
}

function spreadObj() {
  try {
    const a = JSON.parse(document.getElementById('obj-a').value);
    const b = JSON.parse(document.getElementById('obj-b').value);
    const merged = { ...a, ...b };
    document.getElementById('obj-spread-out').textContent =
      \`a = \${JSON.stringify(a)}\nb = \${JSON.stringify(b)}\n\n{ ...a, ...b } = \${JSON.stringify(merged,null,2)}\n\n// Ключі з b перезаписують a!\`;
  } catch(e) {
    document.getElementById('obj-spread-out').textContent = '❌ ' + e.message;
  }
}

function getArgs() {
  return parseNums(document.getElementById('rest-args').value);
}

function restSum() {
  const nums = getArgs();
  const [first, ...rest] = nums;
  const sum = rest.reduce((a,n)=>a+n, first);
  document.getElementById('rest-out').textContent =
    \`function sum(first, ...rest)\nnums = [\${nums}]\n\nfirst = \${first}\nrest  = [\${rest}]\nsum   = \${sum}\`;
}
function restMax() {
  const nums = getArgs();
  document.getElementById('rest-out').textContent =
    \`Math.max(...[\${nums}]) = \${Math.max(...nums)}\n\n// Без spread довелось б: Math.max.apply(null, nums)\`;
}
function restLogger() {
  const nums = getArgs();
  function logger(label, ...msgs) {
    return \`[\${label}] \${msgs.join(' | ')}\`;
  }
  document.getElementById('rest-out').textContent =
    \`logger("INFO", ...nums)\n\n// = logger("INFO", \${nums.join(', ')})\n// → "\${logger('INFO', ...nums)}"\`;
}

function shallowDemo() {
  const original = { name: 'Alice', hobbies: ['chess', 'art'] };
  const copy = { ...original };
  copy.name = 'Bob';          // примітив — copy
  copy.hobbies.push('music'); // масив — shallow ref!
  document.getElementById('shallow-out').textContent =
    \`original = { name: "\${original.name}", hobbies: [\${original.hobbies.map(h=>'"'+h+'"')}] }\ncopy     = { name: "\${copy.name}",     hobbies: [\${copy.hobbies.map(h=>'"'+h+'"')}] }\n\n// copy.name = "Bob" — не торкнулось original ✅\n// copy.hobbies.push("music") — змінило ОБИДВА ❌\n// Це shallow copy — вкладені об'єкти НЕ копіюються!\`;
}`,
    [
      { level:'easy',   uk:'Введи різні числа у "Масив A" і "Масив B" — натисни Spread. Яке Math.max і Math.min отримав?',  ru:'Введи разные числа в "Массив A" и "B" — нажми Spread. Какой Math.max и Math.min?' },
      { level:'medium', uk:'Натисни "Shallow copy" і прочитай результат. Чому зміна hobbies в копії змінює оригінал? Як це виправити?',  ru:'Нажми "Shallow copy" — почему изменение hobbies в копии меняет оригинал? Как исправить?' },
      { level:'hard',   uk:'Реалізуй deepMerge(a, b) яка рекурсивно merge-ить вкладені об\'єкти (не shallow).',  ru:'Реализуй deepMerge(a, b) которая рекурсивно мержит вложенные объекты.' },
    ]
  );

  /* ─── 04-07 ──────────────────────────────────────────────── */
  patch('04-07',
    { uk:`<h2>Template literals та tagged templates</h2>
<h3>Template literals</h3>
<pre>const name = 'Alice';
const age  = 17;

// Базова інтерполяція:
\`Hello, \${name}! You are \${age} years old.\`

// Вирази:
\`\${2 + 2}\`                // "4"
\`\${name.toUpperCase()}\`   // "ALICE"
\`\${age >= 18 ? 'adult' : 'minor'}\` // "minor"

// Багаторядковий:
const html = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>Age: \${age}</p>
  </div>
\`;</pre>
<h3>Tagged templates</h3>
<pre>function tag(strings, ...values) {
  // strings — масив текстових частин
  // values  — масив інтерпольованих значень
  return strings.reduce((result, str, i) =>
    result + str + (values[i] !== undefined
      ? \`<b>\${values[i]}</b>\`  // обертаємо у <b>
      : ''), '');
}

const html = tag\`Hello, \${name}! Age: \${age}.\`;
// "Hello, <b>Alice</b>! Age: <b>17</b>."</pre>
<h3>Практичні застосування</h3>
<pre>// SQL-запит (безпека!):
const query = sql\`SELECT * FROM users WHERE id = \${userId}\`;
// Де sql() екранує значення

// styled-components (CSS-in-JS):
const Button = styled.button\`
  color: \${props => props.primary ? 'white' : 'blue'};
\`;</pre>`,
      ru:`<h2>Template literals</h2>
<pre>\`Hello, \${name}! \${age >= 18 ? 'adult' : 'minor'}\`

// Многострочный:
const html = \`
  <div>\${name}</div>
\`;

// Tagged template:
function tag(strings, ...vals) {
  return strings.reduce((r,s,i)=>
    r + s + (vals[i]!==undefined ? \`<b>\${vals[i]}</b>\` : ''), '');
}
tag\`Hello \${name}!\`
// → "Hello <b>Alice</b>!"</pre>` },
    `<div class="tpl-lab">
  <h2>📝 Template Literals</h2>

  <!-- Базовий будівник -->
  <div class="tpl-section">
    <h3>Template Builder</h3>
    <div class="tb-fields">
      <input id="tb-name"  value="Аліса" placeholder="name">
      <input id="tb-age"   value="17" type="number" style="width:60px" placeholder="age">
      <input id="tb-city"  value="Київ" placeholder="city">
      <input id="tb-score" value="95" type="number" style="width:60px" placeholder="score">
    </div>
    <div class="tb-templates">
      <button onclick="buildTpl('greeting')">Привітання</button>
      <button onclick="buildTpl('card')">HTML Card</button>
      <button onclick="buildTpl('conditional')">Умовний</button>
      <button onclick="buildTpl('multiline')">Багаторядковий</button>
    </div>
    <pre class="out" id="tpl-out">—</pre>
    <div id="tpl-preview" style="display:none"></div>
  </div>

  <!-- Tagged templates -->
  <div class="tpl-section">
    <h3>Tagged Templates</h3>
    <div class="tag-controls">
      <select id="tag-type" onchange="runTagged()">
        <option value="highlight">highlight (Bold)</option>
        <option value="escape">escape (XSS safe)</option>
        <option value="upper">upper (Uppercase)</option>
        <option value="currency">currency (₴ format)</option>
      </select>
    </div>
    <pre class="out" id="tag-out">—</pre>
    <div class="tag-preview" id="tag-preview"></div>
  </div>

  <!-- Реальний HTML генератор -->
  <div class="tpl-section">
    <h3>HTML Generator</h3>
    <div class="hg-items">
      <div class="hg-item">
        <input class="hg-name" value="Модуль 1: HTML">
        <input class="hg-num" type="number" value="10" style="width:55px">
        <button onclick="removeHgItem(this)">✕</button>
      </div>
      <div class="hg-item">
        <input class="hg-name" value="Модуль 2: CSS">
        <input class="hg-num" type="number" value="12" style="width:55px">
        <button onclick="removeHgItem(this)">✕</button>
      </div>
    </div>
    <button onclick="addHgItem()">+ Рядок</button>
    <button onclick="generateHTML()">Генерувати HTML</button>
    <pre class="out" id="hg-out" style="max-height:120px">—</pre>
  </div>
</div>`,
    `${BASE}
.tpl-lab{max-width:520px}
.tpl-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.tpl-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.tb-fields{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.tb-fields input{flex:1;min-width:80px}
.tb-templates{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.tb-templates button{padding:6px 10px;font-size:11px}
#tpl-preview{padding:10px;background:#0f172a;border-radius:8px;margin-top:6px;font-size:13px}
#tpl-preview .card{background:#1e293b;border-radius:8px;padding:12px;border:1px solid #334155}
.tag-controls{margin-bottom:8px}
.tag-controls select{width:100%;padding:7px 10px}
.tag-preview{padding:8px;background:#0f172a;border-radius:6px;margin-top:6px;min-height:24px;font-size:13px}
.hg-items{display:flex;flex-direction:column;gap:5px;margin-bottom:8px}
.hg-item{display:flex;gap:5px;align-items:center}
.hg-item input{flex:1;padding:6px 8px;font-size:12px}
.hg-item button{padding:4px 8px;font-size:11px;border-color:transparent;color:#475569}
.hg-item button:hover{border-color:#ef4444;color:#ef4444}
.tpl-section>button{padding:6px 10px;font-size:11px;margin-right:5px;margin-bottom:8px}`,
    `function getFields() {
  return {
    name:  document.getElementById('tb-name').value  || 'User',
    age:   parseInt(document.getElementById('tb-age').value)  || 0,
    city:  document.getElementById('tb-city').value  || '—',
    score: parseInt(document.getElementById('tb-score').value) || 0,
  };
}

function buildTpl(type) {
  const { name, age, city, score } = getFields();
  const preview = document.getElementById('tpl-preview');
  let result;
  if(type==='greeting') {
    result = \`// Template literal:\n\\\`Hello, \\\${name}! You are \\\${age} yo.\\\`\n\nРезультат:\n"${`Hello, ${name}! You are ${age} yo.`}"\`;
    preview.style.display='none';
  } else if(type==='card') {
    const html = \`<div class="card"><h3>\${name}</h3><p>🏙 \${city} · \${age} years</p><p>⭐ Score: \${score}</p></div>\`;
    result = \`// HTML template literal:\nconst html = \\\`<div class="card"><h3>\\\${name}</h3>...\\\`\n\nРезультат:\n\${html}\`;
    preview.style.display='block'; preview.innerHTML = html;
  } else if(type==='conditional') {
    const grade = score>=90?'A':score>=80?'B':score>=70?'C':'F';
    result = \`// Умовний вираз:\n\\\`Grade: \\\${score >= 90 ? 'A' : score >= 80 ? 'B' : 'F'}\\\`\n\nРезультат:\n"Grade: \${grade} (\${score >= 60 ? 'Passed ✅' : 'Failed ❌'})"\`;
    preview.style.display='none';
  } else {
    result = \`// Багаторядковий:\nconst report = \\\`\n  Student: \${name}\n  Age: \${age}\n  City: \${city}\n  Score: \${score}/100\n  Status: \${score>=60?'PASS':'FAIL'}\n\\\`;\`;
    preview.style.display='none';
  }
  document.getElementById('tpl-out').textContent = result;
}

function highlight(strings, ...vals) {
  return strings.reduce((r,s,i)=>r+s+(vals[i]!==undefined?'<strong style="color:#f59e0b">'+vals[i]+'</strong>':''),'');
}
function escape(strings, ...vals) {
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  return strings.reduce((r,s,i)=>r+s+(vals[i]!==undefined?esc(vals[i]):''),'');
}
function upper(strings, ...vals) {
  return strings.reduce((r,s,i)=>r+s+(vals[i]!==undefined?String(vals[i]).toUpperCase():''),'');
}
function currency(strings, ...vals) {
  return strings.reduce((r,s,i)=>r+s+(vals[i]!==undefined?'₴'+parseFloat(vals[i]).toFixed(2):''),'');
}

function runTagged() {
  const { name, age, score } = getFields();
  const type = document.getElementById('tag-type').value;
  const tags = { highlight, escape, upper, currency };
  const fn = tags[type];
  let result, html;
  if(type==='currency') {
    result = fn\`Ціна: \${score * 10}. Знижка: \${score}\`;
    html   = fn\`Ціна: \${score * 10}. Знижка: \${score}\`;
  } else if(type==='escape') {
    const danger = '<script>alert("xss")</script>';
    result = \`escape\\\`User: \\\${danger}\\\`\n→ "\${escape\`User: \${danger}\`}"\`;
    html   = 'XSS safe: ' + escape\`User: \${danger}\`;
  } else if(type==='upper') {
    result = \`upper\\\`Hello, \\\${name}! Score: \\\${score}\\\`\n→ "\${upper\`Hello, \${name}! Score: \${score}\`}"\`;
    html   = upper\`Hello, \${name}! Score: \${score}\`;
  } else {
    result = \`highlight\\\`Hello, \\\${name}! Age: \\\${age}\\\`\n→ HTML з <strong> тегами\`;
    html   = highlight\`Hello, \${name}! Age: \${age}\`;
  }
  document.getElementById('tag-out').textContent = result;
  document.getElementById('tag-preview').innerHTML = html;
}

function addHgItem() {
  const d = document.createElement('div');
  d.className='hg-item';
  d.innerHTML='<input class="hg-name" value="Модуль"><input class="hg-num" type="number" value="10" style="width:55px"><button onclick="removeHgItem(this)">✕</button>';
  document.querySelector('.hg-items').appendChild(d);
}
function removeHgItem(btn) { btn.closest('.hg-item').remove(); }
function generateHTML() {
  const items = Array.from(document.querySelectorAll('.hg-item')).map(row => ({
    name:  row.querySelector('.hg-name').value,
    count: row.querySelector('.hg-num').value,
  }));
  const html = \`<ul class="modules">\n\${items.map(i=>\`  <li><strong>\${i.name}</strong> — \${i.count} уроків</li>\`).join('\n')}\n</ul>\`;
  document.getElementById('hg-out').textContent = html;
}
runTagged();`,
    [
      { level:'easy',   uk:'Зміни поля name/age/city і натисни "HTML Card" — поспостерігай як Preview оновлюється.',  ru:'Измени поля и нажми "HTML Card" — наблюдай как Preview обновляется.' },
      { level:'medium', uk:'У Tagged Templates обери "escape" — поясни що відбувається з <script> тегом. Навіщо екранування важливе для безпеки?',  ru:'В Tagged Templates выбери "escape" — объясни что происходит с <script> тегом.' },
      { level:'hard',   uk:'Напиши tagged template sql`` яка екранує значення і виводить повний SQL запит з безпечними параметрами.',  ru:'Напиши tagged template sql`` которая экранирует значения и выводит SQL с безопасными параметрами.' },
    ]
  );

  /* ─── 04-08 ──────────────────────────────────────────────── */
  patch('04-08',
    { uk:`<h2>Масиви: map, filter, reduce, find, some, every, flat</h2>
<pre>const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map — трансформація кожного елемента:
nums.map(n => n * 2)          // [2,4,6,8,10,12,14,16,18,20]

// filter — відбір за умовою:
nums.filter(n => n % 2 === 0) // [2,4,6,8,10]

// reduce — згортка в одне значення:
nums.reduce((acc, n) => acc + n, 0) // 55

// find — перший елемент що відповідає:
nums.find(n => n > 5)  // 6

// findIndex:
nums.findIndex(n => n > 5) // 5

// some — хоча б один:
nums.some(n => n > 9)  // true

// every — всі:
nums.every(n => n > 0) // true

// flat — розгладження:
[1, [2, [3, 4]]].flat()    // [1, 2, [3, 4]]
[1, [2, [3, 4]]].flat(2)   // [1, 2, 3, 4]
[1, [2, [3, 4]]].flat(Infinity) // [1, 2, 3, 4]

// flatMap:
['hello world'].flatMap(s => s.split(' ')) // ['hello','world']

// forEach (без return):
nums.forEach(n => console.log(n));</pre>
<h3>Chaining</h3>
<pre>nums
  .filter(n => n % 2 === 0)  // парні
  .map(n => n * n)            // квадрат
  .reduce((a, n) => a + n, 0) // сума = 220</pre>`,
      ru:`<h2>Методы массивов</h2>
<pre>const nums = [1,2,3,4,5,6,7,8,9,10];

nums.map(n => n * 2)          // [2,4,...]
nums.filter(n => n % 2 === 0) // [2,4,6,8,10]
nums.reduce((a,n) => a+n, 0)  // 55
nums.find(n => n > 5)         // 6
nums.some(n => n > 9)         // true
nums.every(n => n > 0)        // true
[1,[2,[3]]].flat(Infinity)    // [1,2,3]

// Chaining:
nums.filter(n=>n%2===0).map(n=>n*n).reduce((a,n)=>a+n,0) // 220</pre>` },
    `<div class="arr-lab">
  <h2>🔧 Array Methods Lab</h2>

  <!-- Масив ввод -->
  <div class="arr-input">
    <input id="arr-input" value="3,7,1,9,2,8,4,6,5,10" placeholder="числа через кому" style="flex:1">
    <button onclick="reloadArr()">↺</button>
  </div>
  <div class="arr-display" id="arr-display"></div>

  <!-- Методи -->
  <div class="arr-methods">
    <div class="am-group">
      <div class="am-title">Трансформація</div>
      <button onclick="runMethod('map')">map(n*2)</button>
      <button onclick="runMethod('flatMap')">flatMap</button>
    </div>
    <div class="am-group">
      <div class="am-title">Пошук</div>
      <button onclick="runMethod('filter')">filter(&gt;5)</button>
      <button onclick="runMethod('find')">find(&gt;5)</button>
      <button onclick="runMethod('findIndex')">findIndex</button>
    </div>
    <div class="am-group">
      <div class="am-title">Агрегація</div>
      <button onclick="runMethod('reduce-sum')">reduce(sum)</button>
      <button onclick="runMethod('reduce-max')">reduce(max)</button>
      <button onclick="runMethod('some')">some(&gt;9)</button>
      <button onclick="runMethod('every')">every(&gt;0)</button>
    </div>
    <div class="am-group">
      <div class="am-title">Структура</div>
      <button onclick="runMethod('flat')">flat</button>
      <button onclick="runMethod('sort')">sort()</button>
      <button onclick="runMethod('sort-num')">sort numeric</button>
    </div>
  </div>

  <!-- Chaining builder -->
  <div class="chain-builder">
    <h3>Chain Builder</h3>
    <div class="chain-steps" id="chain-steps">
      <div class="chain-step">
        <select class="chain-op">
          <option value="filter-even">filter(парні)</option>
          <option value="filter-odd">filter(непарні)</option>
          <option value="filter-gt5">filter(&gt;5)</option>
          <option value="map-double">map(*2)</option>
          <option value="map-square">map(²)</option>
          <option value="sort-num">sort()</option>
        </select>
        <button onclick="this.closest('.chain-step').remove()">✕</button>
      </div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:8px">
      <button onclick="addStep()">+ Крок</button>
      <button onclick="runChain()">▶ Виконати</button>
    </div>
    <pre class="out" id="chain-out">—</pre>
  </div>

  <pre class="out" id="arr-out">—</pre>
</div>`,
    `${BASE}
.arr-lab{max-width:520px}
.arr-input{display:flex;gap:6px;margin-bottom:8px}
.arr-display{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;min-height:32px}
.arr-chip{background:#1e293b;border:1px solid #334155;border-radius:5px;padding:4px 8px;font-size:13px;font-family:monospace;font-weight:700;color:#f1f5f9;transition:.2s}
.arr-chip.hl{background:rgba(59,130,246,.25);border-color:#3b82f6;color:#7dd3fc}

.arr-methods{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:10px}
.am-group{background:#1e293b;border-radius:8px;padding:10px}
.am-title{font-size:10px;text-transform:uppercase;color:#3b82f6;margin-bottom:6px;font-weight:700}
.am-group button{display:block;width:100%;text-align:left;padding:5px 8px;font-size:11px;margin-bottom:3px}

.chain-builder{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.chain-builder h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.chain-steps{display:flex;flex-direction:column;gap:4px;margin-bottom:8px}
.chain-step{display:flex;gap:5px;align-items:center}
.chain-step select{flex:1;padding:5px;font-size:12px}
.chain-step button{padding:3px 7px;font-size:11px;border-color:transparent;color:#475569}
.chain-step button:hover{border-color:#ef4444;color:#ef4444}`,
    `let arr = [];

function reloadArr() {
  const raw = document.getElementById('arr-input').value;
  arr = raw.split(',').map(s => parseFloat(s.trim())).filter(n=>!isNaN(n));
  renderArr(arr);
}

function renderArr(a, highlight=[]) {
  const el = document.getElementById('arr-display');
  el.innerHTML = '';
  a.forEach((v,i) => {
    const d = document.createElement('div');
    d.className = 'arr-chip' + (highlight.includes(i)?' hl':'');
    d.textContent = v;
    el.appendChild(d);
  });
}

const METHODS = {
  'map':       a => ({ name:'map(n => n*2)', result: a.map(n=>n*2) }),
  'flatMap':   a => ({ name:'flatMap(n => [n, n*2])', result: a.flatMap(n=>[n,n*2]) }),
  'filter':    a => ({ name:'filter(n => n > 5)', result: a.filter(n=>n>5) }),
  'find':      a => ({ name:'find(n => n > 5)', result: a.find(n=>n>5) }),
  'findIndex': a => ({ name:'findIndex(n => n > 5)', result: a.findIndex(n=>n>5) }),
  'reduce-sum':a => ({ name:'reduce((acc,n) => acc+n, 0)', result: a.reduce((acc,n)=>acc+n,0) }),
  'reduce-max':a => ({ name:'reduce((a,b) => a>b?a:b)', result: a.reduce((a,b)=>a>b?a:b) }),
  'some':      a => ({ name:'some(n => n > 9)', result: a.some(n=>n>9) }),
  'every':     a => ({ name:'every(n => n > 0)', result: a.every(n=>n>0) }),
  'flat':      a => { const n=[[...a],[...a.slice(0,3)]]; return {name:'[[arr],[arr]].flat()',result:n.flat()}; },
  'sort':      a => ({ name:'sort() [лексикографічно!]', result:[...a].sort() }),
  'sort-num':  a => ({ name:'sort((a,b) => a-b)', result:[...a].sort((a,b)=>a-b) }),
};

function runMethod(m) {
  const { name, result } = METHODS[m](arr);
  const isArr = Array.isArray(result);
  document.getElementById('arr-out').textContent =
    \`arr.\${name}\n\nВхід: [\${arr}]\nРезультат: \${isArr?'['+result+']':JSON.stringify(result)}\`;
  if(isArr && result.length <= 20) renderArr(result.map(Number).filter(n=>!isNaN(n)));
}

const OPS = {
  'filter-even': a => a.filter(n=>n%2===0),
  'filter-odd':  a => a.filter(n=>n%2!==0),
  'filter-gt5':  a => a.filter(n=>n>5),
  'map-double':  a => a.map(n=>n*2),
  'map-square':  a => a.map(n=>n*n),
  'sort-num':    a => [...a].sort((a,b)=>a-b),
};

function addStep() {
  const d = document.createElement('div');
  d.className='chain-step';
  d.innerHTML='<select class="chain-op"><option value="filter-even">filter(парні)</option><option value="filter-odd">filter(непарні)</option><option value="filter-gt5">filter(&gt;5)</option><option value="map-double">map(*2)</option><option value="map-square">map(²)</option><option value="sort-num">sort()</option></select><button onclick="this.closest(\'.\'+\'chain-step\').remove()">✕</button>';
  document.getElementById('chain-steps').appendChild(d);
}
function runChain() {
  const steps = Array.from(document.querySelectorAll('.chain-op')).map(s=>s.value);
  let cur = [...arr];
  const parts = ['arr'];
  steps.forEach(op => {
    const labels = {'filter-even':'filter(n=>n%2===0)','filter-odd':'filter(n=>n%2!==0)','filter-gt5':'filter(n=>n>5)','map-double':'map(n=>n*2)','map-square':'map(n=>n*n)','sort-num':'sort((a,b)=>a-b)'};
    parts.push(labels[op]||op);
    cur = OPS[op](cur);
  });
  document.getElementById('chain-out').textContent = parts.join('\n  .') + '\n\nВхід:    ['+arr+']\nРезультат: ['+cur+']';
  renderArr(cur);
}

reloadArr();`,
    [
      { level:'easy',   uk:'Натисни map(n*2), filter(>5), reduce(sum) — прочитай результати. Зміни масив у полі і натисни ↺.',  ru:'Нажми map, filter, reduce — прочитай результаты. Измени массив и нажми ↺.' },
      { level:'medium', uk:'У Chain Builder додай 3 кроки: sort() → filter(>5) → map(*2). Поясни порядок виконання.',  ru:'В Chain Builder добавь 3 шага: sort() → filter(>5) → map(*2). Объясни порядок.' },
      { level:'hard',   uk:'Реалізуй groupBy(arr, fn) яка групує елементи масиву в об\'єкт за результатом fn(el). Наприклад groupBy([1,2,3,4], n=>n%2===0?"even":"odd").',  ru:'Реализуй groupBy(arr, fn) которая группирует элементы в объект. Например groupBy([1,2,3,4], n=>n%2?"odd":"even").' },
    ]
  );

  /* ─── 04-09 ──────────────────────────────────────────────── */
  patch('04-09',
    { uk:`<h2>Рядки: split, join, replace, trim, includes, padStart</h2>
<pre>const s = "  Hello, World!  ";

// Обрізка пробілів:
s.trim()       // "Hello, World!"
s.trimStart()  // "Hello, World!  "
s.trimEnd()    // "  Hello, World!"

// Пошук:
s.includes("World")    // true
s.startsWith("  He")   // true
s.endsWith("!  ")      // true
s.indexOf("o")         // 6 (перше входження)
s.lastIndexOf("o")     // 9

// Заміна:
s.replace("World", "JS")     // перше
s.replaceAll("l", "L")       // всі

// Split і Join:
"a,b,c".split(",")    // ["a","b","c"]
["a","b","c"].join("-") // "a-b-c"

// Форматування:
"5".padStart(3, "0")   // "005"
"5".padEnd(4, "-")     // "5---"
"hello".repeat(3)      // "hellohellohello"

// Трансформація:
s.toLowerCase()
s.toUpperCase()
s.slice(2, 7)     // "Hello"
s.at(-1)          // "!" (негативний індекс)</pre>`,
      ru:`<h2>Строки</h2>
<pre>const s = "  Hello, World!  ";
s.trim()             // "Hello, World!"
s.includes("World")  // true
s.startsWith("  He") // true
s.replace("World","JS")
s.replaceAll("l","L")
"a,b,c".split(",")   // ["a","b","c"]
["a","b"].join("-")  // "a-b"
"5".padStart(3,"0")  // "005"
s.slice(2, 7)        // "Hello"
s.at(-1)             // "!"</pre>` },
    `<div class="str-lab">
  <h2>📝 String Methods</h2>

  <div class="str-input-wrap">
    <textarea id="str-in" rows="3" placeholder="Введи рядок...">"  Привіт, Світ! JavaScript — це круто!  "</textarea>
  </div>

  <!-- Кнопки методів -->
  <div class="str-methods-grid">
    <div class="smg-group">
      <div class="smg-title">Обрізка</div>
      <button onclick="runStr('trim')">trim()</button>
      <button onclick="runStr('trimStart')">trimStart()</button>
      <button onclick="runStr('trimEnd')">trimEnd()</button>
    </div>
    <div class="smg-group">
      <div class="smg-title">Пошук</div>
      <button onclick="runStr('includes')">includes()</button>
      <button onclick="runStr('indexOf')">indexOf()</button>
      <button onclick="runStr('startsWith')">startsWith()</button>
    </div>
    <div class="smg-group">
      <div class="smg-title">Заміна</div>
      <button onclick="runStr('replace')">replace()</button>
      <button onclick="runStr('replaceAll')">replaceAll()</button>
    </div>
    <div class="smg-group">
      <div class="smg-title">Розбивка</div>
      <button onclick="runStr('split')">split()</button>
      <button onclick="runStr('slice')">slice()</button>
      <button onclick="runStr('at')">at(-1)</button>
    </div>
    <div class="smg-group">
      <div class="smg-title">Формат</div>
      <button onclick="runStr('padStart')">padStart()</button>
      <button onclick="runStr('padEnd')">padEnd()</button>
      <button onclick="runStr('repeat')">repeat(3)</button>
    </div>
    <div class="smg-group">
      <div class="smg-title">Регістр</div>
      <button onclick="runStr('upper')">toUpperCase()</button>
      <button onclick="runStr('lower')">toLowerCase()</button>
    </div>
  </div>

  <pre class="out" id="str-out">—</pre>

  <!-- Практичні завдання -->
  <div class="str-practical">
    <h3>Практичний аналізатор</h3>
    <input id="analyze-str" value="Hello World JavaScript 2025" style="width:100%;margin-bottom:8px">
    <button onclick="analyzeStr()">Аналізувати</button>
    <pre class="out" id="analyze-out">—</pre>
  </div>
</div>`,
    `${BASE}
.str-lab{max-width:520px}
.str-input-wrap{margin-bottom:10px}
.str-input-wrap textarea{width:100%;padding:10px;font-family:monospace;font-size:12px;resize:vertical}
.str-methods-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px}
.smg-group{background:#1e293b;border-radius:8px;padding:8px}
.smg-title{font-size:9px;text-transform:uppercase;color:#3b82f6;margin-bottom:5px;font-weight:700}
.smg-group button{display:block;width:100%;text-align:left;padding:4px 7px;font-size:11px;margin-bottom:2px;font-family:monospace}
.str-practical{background:#1e293b;border-radius:10px;padding:12px;margin-top:10px}
.str-practical h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.str-practical input{width:100%;margin-bottom:8px}`,
    `function getStr() {
  let v = document.getElementById('str-in').value;
  try { v = JSON.parse(v); } catch(e) {}
  return String(v);
}

const STR_METHODS = {
  'trim':       s => ({method:'trim()',         result: s.trim()}),
  'trimStart':  s => ({method:'trimStart()',     result: s.trimStart()}),
  'trimEnd':    s => ({method:'trimEnd()',       result: s.trimEnd()}),
  'includes':   s => ({method:'includes("і")',  result: s.includes('і')}),
  'indexOf':    s => ({method:'indexOf("і")',   result: s.indexOf('і')}),
  'startsWith': s => ({method:'startsWith(" ")',result: s.startsWith(' ')}),
  'replace':    s => ({method:'replace("!", "❗")', result: s.replace('!','❗')}),
  'replaceAll': s => ({method:'replaceAll("а","@")', result: s.replaceAll('а','@')}),
  'split':      s => ({method:'split(", ")',    result: JSON.stringify(s.split(', '))}),
  'slice':      s => ({method:'slice(0, 10)',   result: s.slice(0,10)}),
  'at':         s => ({method:'at(-1)',         result: s.at(-1)}),
  'padStart':   s => ({method:'(len).padStart(20,".")', result: s.trim().padStart(20,'.')}),
  'padEnd':     s => ({method:'(len).padEnd(20,".")',   result: s.trim().padEnd(20,'.')}),
  'repeat':     s => ({method:'trim().repeat(2)', result: s.trim().repeat(2)}),
  'upper':      s => ({method:'toUpperCase()',  result: s.toUpperCase()}),
  'lower':      s => ({method:'toLowerCase()',  result: s.toLowerCase()}),
};

function runStr(m) {
  const s = getStr();
  const { method, result } = STR_METHODS[m](s);
  document.getElementById('str-out').textContent =
    \`str = "\${s}"\n\nstr.\${method}\n→ \${JSON.stringify(result)}\n   (тип: \${typeof result}, довжина: \${Array.isArray(result)?result.length:(typeof result==='string'?result.length:'—')})\`;
}

function analyzeStr() {
  const s = document.getElementById('analyze-str').value;
  const words = s.trim().split(/\s+/);
  const chars = s.replace(/\s/g,'').length;
  const digits = (s.match(/\d/g)||[]).length;
  const upper = (s.match(/[A-ZА-ЯЇІЄ]/g)||[]).length;
  document.getElementById('analyze-out').textContent =
    \`Рядок: "\${s}"\n\nДовжина:    \${s.length}\nСимволів:   \${chars} (без пробілів)\nСлів:       \${words.length}\nЦифр:       \${digits}\nВерхній рег:\${upper}\n\nСлова:      [\${words.map(w=>'"'+w+'"').join(', ')}]\nПерше слово:"\${words[0]}"\nОстаннє:   "\${words.at(-1)}"\nВерхній рег:"\${s.toUpperCase()}"\`.replace('\${s.toUpperCase()}', s.toUpperCase());
}`,
    [
      { level:'easy',   uk:'Введи свій рядок і натисни split() — що отримаєш? Потім trim() — видали зайві пробіли.',  ru:'Введи свой текст и нажми split() — что получишь? Затем trim().' },
      { level:'medium', uk:'Натисни padStart() — навіщо потрібне вирівнювання? Де в реальному коді використовують "005" (padStart цифр)?',  ru:'Нажми padStart() — зачем нужно выравнивание? Где используют "005" (padStart цифр)?' },
      { level:'hard',   uk:'Напиши функцію capitalize(s) яка робить першу літеру великою, решту — маленькими. Потім titleCase(s) — кожне слово з великої.',  ru:'Напиши capitalize(s) — первая буква большая, остальные маленькие. Затем titleCase(s).' },
    ]
  );

  /* ─── 04-10 ──────────────────────────────────────────────── */
  patch('04-10',
    { uk:`<h2>Date: робота з датою і часом</h2>
<pre>// Поточна дата:
const now = new Date();

// Конструктори:
new Date(2025, 0, 15)     // 15 Jan 2025 (місяці з 0!)
new Date('2025-01-15')    // ISO рядок
new Date(1705276800000)   // Unix timestamp (ms)
Date.now()                // timestamp зараз

// Геттери:
now.getFullYear()  // 2025
now.getMonth()     // 0–11 (!)
now.getDate()      // 1–31
now.getDay()       // 0–6 (0=Sunday)
now.getHours()     // 0–23
now.getMinutes()
now.getSeconds()
now.getTime()      // Unix timestamp

// Форматування:
now.toLocaleDateString('uk-UA') // "15.01.2025"
now.toLocaleTimeString('uk-UA') // "14:30:00"
now.toLocaleString('uk-UA')     // "15.01.2025, 14:30:00"
now.toISOString()   // "2025-01-15T14:30:00.000Z"

// Різниця між датами:
const diff = date2 - date1; // ms
const days = Math.floor(diff / (1000*60*60*24));</pre>`,
      ru:`<h2>Date</h2>
<pre>const now = new Date();
// Месяцы 0-11!

now.getFullYear()
now.getMonth()     // 0-11
now.getDate()      // 1-31
now.getDay()       // 0=Sunday

now.toLocaleDateString('uk-UA') // "15.01.2025"
now.toISOString()               // "2025-01-15T..."

// Разница:
const days = (date2 - date1) / (1000*60*60*24);</pre>` },
    `<div class="date-lab">
  <h2>📅 Date Lab</h2>

  <!-- Живий годинник -->
  <div class="date-clock">
    <div class="dc-time" id="dc-time">00:00:00</div>
    <div class="dc-date" id="dc-date">—</div>
  </div>

  <!-- Date конструктор -->
  <div class="date-section">
    <h3>Date конструктор</h3>
    <div class="dc-inputs">
      <input type="date" id="d-date" value="2025-01-15">
      <input type="time" id="d-time" value="14:30">
      <button onclick="buildDate()">Створити Date</button>
    </div>
    <pre class="out" id="date-build-out">—</pre>
  </div>

  <!-- Різниця між датами -->
  <div class="date-section">
    <h3>Різниця між датами</h3>
    <div class="dc-diff-inputs">
      <label>Від: <input type="date" id="diff-from" value="2025-01-01"></label>
      <label>До:  <input type="date" id="diff-to"></label>
      <button onclick="calcDiff()">Порахувати</button>
    </div>
    <pre class="out" id="date-diff-out">—</pre>
  </div>

  <!-- Форматування -->
  <div class="date-section">
    <h3>Форматування</h3>
    <div class="format-btns">
      <button onclick="formatDate('uk-UA','date')">uk-UA дата</button>
      <button onclick="formatDate('en-US','date')">en-US дата</button>
      <button onclick="formatDate('uk-UA','datetime')">uk-UA datetime</button>
      <button onclick="formatDate('iso','iso')">ISO string</button>
      <button onclick="formatDate('ts','ts')">timestamp</button>
    </div>
    <pre class="out" id="date-fmt-out">—</pre>
  </div>

  <!-- Таймер -->
  <div class="date-section">
    <h3>Таймер (Date.now())</h3>
    <div style="display:flex;gap:6px;margin-bottom:8px">
      <button onclick="timerStart()">⏱ Start</button>
      <button onclick="timerStop()">⏹ Stop</button>
    </div>
    <div class="timer-display" id="timer-display">0.000 s</div>
  </div>
</div>`,
    `${BASE}
.date-lab{max-width:520px}
.date-clock{text-align:center;padding:16px;background:#1e293b;border-radius:12px;margin-bottom:10px}
.dc-time{font-size:40px;font-weight:900;color:#3b82f6;font-variant-numeric:tabular-nums;font-family:monospace;letter-spacing:.02em}
.dc-date{font-size:13px;color:#64748b;margin-top:4px}

.date-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.date-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.dc-inputs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.dc-inputs input{flex:1;padding:7px 10px}
.dc-diff-inputs{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px;font-size:12px;color:#64748b}
.dc-diff-inputs input{padding:7px 10px}
.format-btns{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px}
.format-btns button{padding:5px 8px;font-size:11px}
.timer-display{font-size:32px;font-weight:900;font-family:monospace;color:#10b981;font-variant-numeric:tabular-nums}`,
    `// Живий годинник
function updateClock() {
  const now = new Date();
  const DAYS = ['Неділя','Понеділок','Вівторок','Середа','Четвер','П\'ятниця','Субота'];
  document.getElementById('dc-time').textContent =
    String(now.getHours()).padStart(2,'0') + ':' +
    String(now.getMinutes()).padStart(2,'0') + ':' +
    String(now.getSeconds()).padStart(2,'0');
  document.getElementById('dc-date').textContent =
    DAYS[now.getDay()] + ', ' + now.toLocaleDateString('uk-UA');
}
setInterval(updateClock, 1000);
updateClock();

// Date builder
function buildDate() {
  const d = document.getElementById('d-date').value;
  const t = document.getElementById('d-time').value;
  const dt = new Date(d + 'T' + t);
  const MONTHS = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
  document.getElementById('date-build-out').textContent =
    \`new Date("\${d}T\${t}")\n\ngetFullYear() = \${dt.getFullYear()}\ngetMonth()    = \${dt.getMonth()} → \${MONTHS[dt.getMonth()]}\ngetDate()     = \${dt.getDate()}\ngetDay()      = \${dt.getDay()} (0=Sunday)\ngetHours()    = \${dt.getHours()}\ngetMinutes()  = \${dt.getMinutes()}\ngetTime()     = \${dt.getTime()} ms\`;
}
buildDate();

// Різниця
function calcDiff() {
  const from = new Date(document.getElementById('diff-from').value);
  const to   = new Date(document.getElementById('diff-to').value || Date.now());
  const diff  = to - from;
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const mins  = Math.floor(diff / 60000);
  document.getElementById('date-diff-out').textContent =
    \`Від: \${from.toLocaleDateString('uk-UA')}\nДо:  \${to.toLocaleDateString('uk-UA')}\n\nРізниця:\n  \${days} днів\n  \${hours} годин\n  \${mins} хвилин\n  \${diff} мс\`;
}
document.getElementById('diff-to').value = new Date().toISOString().split('T')[0];
calcDiff();

// Форматування
function formatDate(locale, mode) {
  const now = new Date();
  let result;
  if(mode==='date') result = now.toLocaleDateString(locale);
  else if(mode==='datetime') result = now.toLocaleString(locale);
  else if(mode==='iso') result = now.toISOString();
  else result = 'Date.now() = ' + Date.now() + ' ms';
  document.getElementById('date-fmt-out').textContent = result;
}

// Таймер
let timerStart_ = null;
function timerStart() { timerStart_ = Date.now(); updateTimer(); }
function timerStop()  { timerStart_ = null; }
function updateTimer() {
  if(!timerStart_) return;
  document.getElementById('timer-display').textContent =
    ((Date.now() - timerStart_) / 1000).toFixed(3) + ' s';
  requestAnimationFrame(updateTimer);
}`,
    [
      { level:'easy',   uk:'Поспостерігай за живим годинником. Натисни "uk-UA дата" і "en-US дата" — яка різниця формату?',  ru:'Наблюдай за живыми часами. Нажми "uk-UA" и "en-US" — какая разница формата?' },
      { level:'medium', uk:'Порахуй скільки днів пройшло з 1 Січня 2025. Потім скільки хвилин. Напиши формулу.',  ru:'Посчитай сколько дней прошло с 1 января 2025. Затем сколько минут.' },
      { level:'hard',   uk:'Напиши функцію countdown(targetDate) яка показує залишок днів/годин/хвилин до вказаної дати.',  ru:'Напиши функцию countdown(targetDate) которая показывает оставшееся дней/часов/минут.' },
    ]
  );

  /* ─── 04-11 ──────────────────────────────────────────────── */
  patch('04-11',
    { uk:`<h2>Math: числові операції</h2>
<pre>// Округлення:
Math.round(4.5)  // 5
Math.ceil(4.1)   // 5  ← вгору
Math.floor(4.9)  // 4  ← вниз
Math.trunc(4.9)  // 4  ← до нуля (обрізає)
Math.trunc(-4.9) // -4 (відрізняється від floor!)

// Степінь та корінь:
Math.pow(2, 10)   // 1024 (або 2**10)
Math.sqrt(16)     // 4
Math.cbrt(27)     // 3 (кубічний корінь)

// Мінімум / максимум:
Math.min(3, 1, 7, 2) // 1
Math.max(3, 1, 7, 2) // 7
Math.min(...arr)      // spread!

// Випадкові числа:
Math.random()              // 0 ≤ x < 1
Math.floor(Math.random() * 10)     // 0–9
Math.floor(Math.random() * 6) + 1 // 1–6 (кубик)

// Корисні константи:
Math.PI   // 3.14159...
Math.E    // 2.71828... (Ейлер)
Math.LN2  // ln(2)

// Абсолютне значення:
Math.abs(-42) // 42

// Логарифм:
Math.log(Math.E) // 1
Math.log2(8)     // 3
Math.log10(1000) // 3</pre>`,
      ru:`<h2>Math</h2>
<pre>Math.round(4.5)  // 5
Math.ceil(4.1)   // 5
Math.floor(4.9)  // 4
Math.trunc(-4.9) // -4 (не -5!)

Math.pow(2,10)   // 1024
Math.sqrt(16)    // 4
Math.min(3,1,7)  // 1
Math.max(3,1,7)  // 7

Math.random()              // 0 ≤ x < 1
Math.floor(Math.random()*6)+1 // 1-6 кубик

Math.PI   // 3.14159...
Math.abs(-42) // 42</pre>` },
    `<div class="math-lab">
  <h2>🎲 Math Lab</h2>

  <!-- Округлення -->
  <div class="math-section">
    <h3>Округлення</h3>
    <div class="rnd-input">
      <input type="number" id="rnd-val" value="4.567" step=".001" style="width:100px">
      <button onclick="showRound()">Порівняти</button>
    </div>
    <pre class="out" id="rnd-out">—</pre>
  </div>

  <!-- Кубик (random) -->
  <div class="math-section">
    <h3>Симулятор кубика</h3>
    <div class="dice-row">
      <select id="dice-sides"><option value="6">d6</option><option value="4">d4</option><option value="8">d8</option><option value="10">d10</option><option value="12">d12</option><option value="20">d20</option></select>
      <button onclick="rollDice()">🎲 Кинути!</button>
      <span class="dice-result" id="dice-result">—</span>
    </div>
    <div class="dice-history" id="dice-history"></div>
  </div>

  <!-- Калькулятор -->
  <div class="math-section">
    <h3>Math functions</h3>
    <div class="math-fns">
      <input type="number" id="math-x" value="16" style="width:80px" placeholder="x">
      <input type="number" id="math-y" value="3" style="width:80px" placeholder="y">
    </div>
    <div class="math-btns">
      <button onclick="mathFn('pow')">pow(x,y)</button>
      <button onclick="mathFn('sqrt')">sqrt(x)</button>
      <button onclick="mathFn('log2')">log2(x)</button>
      <button onclick="mathFn('abs')">abs(x)</button>
      <button onclick="mathFn('min')">min(x,y)</button>
      <button onclick="mathFn('max')">max(x,y)</button>
      <button onclick="mathFn('hypot')">hypot(x,y)</button>
    </div>
    <pre class="out" id="math-out">—</pre>
  </div>

  <!-- Кіло чисел random -->
  <div class="math-section">
    <h3>Random розподіл (1000 чисел)</h3>
    <div style="display:flex;gap:6px;margin-bottom:8px">
      <label>Min: <input id="rng-min" type="number" value="1" style="width:55px"></label>
      <label>Max: <input id="rng-max" type="number" value="6" style="width:55px"></label>
      <button onclick="testRandom()">Тест</button>
    </div>
    <div class="rng-bars" id="rng-bars"></div>
  </div>
</div>`,
    `${BASE}
.math-lab{max-width:520px}
.math-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.math-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.rnd-input{display:flex;gap:6px;margin-bottom:8px}
.dice-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap}
.dice-result{font-size:36px;font-weight:900;color:#f59e0b;font-variant-numeric:tabular-nums;min-width:40px}
.dice-history{display:flex;flex-wrap:wrap;gap:3px;max-height:50px;overflow:hidden}
.dice-chip{background:#0f172a;border-radius:4px;padding:2px 7px;font-size:12px;font-family:monospace;color:#94a3b8}
.math-fns{display:flex;gap:6px;margin-bottom:8px}
.math-btns{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px}
.math-btns button{padding:5px 8px;font-size:11px;font-family:monospace}
.rng-bars{display:flex;gap:4px;align-items:flex-end;height:80px;background:#0f172a;border-radius:8px;padding:8px}
.rng-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;height:100%;justify-content:flex-end}
.rng-bar{width:100%;background:#3b82f6;border-radius:2px 2px 0 0;min-height:2px;transition:.3s}
.rng-label{font-size:9px;color:#64748b;font-family:monospace}`,
    `function showRound() {
  const v = parseFloat(document.getElementById('rnd-val').value) || 4.567;
  document.getElementById('rnd-out').textContent =
    \`Значення: \${v}\n\nMath.round(\${v}) = \${Math.round(v)}\nMath.ceil(\${v})  = \${Math.ceil(v)}\nMath.floor(\${v}) = \${Math.floor(v)}\nMath.trunc(\${v}) = \${Math.trunc(v)}\n\nДля від'ємних:\nMath.floor(-\${Math.abs(v)}) = \${Math.floor(-Math.abs(v))}\nMath.trunc(-\${Math.abs(v)}) = \${Math.trunc(-Math.abs(v))}\`;
}

const diceHistory = [];
function rollDice() {
  const sides = parseInt(document.getElementById('dice-sides').value);
  const roll  = Math.floor(Math.random() * sides) + 1;
  document.getElementById('dice-result').textContent = roll;
  diceHistory.unshift(roll);
  if(diceHistory.length > 20) diceHistory.pop();
  document.getElementById('dice-history').innerHTML =
    diceHistory.map(n=>\`<span class="dice-chip">\${n}</span>\`).join('');
}

function mathFn(fn) {
  const x = parseFloat(document.getElementById('math-x').value)||16;
  const y = parseFloat(document.getElementById('math-y').value)||3;
  const fns = {
    pow:   [() => Math.pow(x,y),  \`Math.pow(\${x},\${y})\`],
    sqrt:  [() => Math.sqrt(x),   \`Math.sqrt(\${x})\`],
    log2:  [() => Math.log2(x),   \`Math.log2(\${x})\`],
    abs:   [() => Math.abs(-x),   \`Math.abs(-\${x})\`],
    min:   [() => Math.min(x,y),  \`Math.min(\${x},\${y})\`],
    max:   [() => Math.max(x,y),  \`Math.max(\${x},\${y})\`],
    hypot: [() => Math.hypot(x,y),\`Math.hypot(\${x},\${y}) — гіпотенуза!\`],
  };
  const [calc, label] = fns[fn];
  document.getElementById('math-out').textContent = \`\${label} = \${calc()}\`;
}

function testRandom() {
  const min = parseInt(document.getElementById('rng-min').value)||1;
  const max = parseInt(document.getElementById('rng-max').value)||6;
  const counts = {};
  for(let i=min;i<=max;i++) counts[i]=0;
  for(let i=0;i<1000;i++) {
    const v = Math.floor(Math.random()*(max-min+1))+min;
    counts[v]=(counts[v]||0)+1;
  }
  const maxCount = Math.max(...Object.values(counts));
  const el = document.getElementById('rng-bars');
  el.innerHTML = Object.entries(counts).map(([val,cnt])=>
    \`<div class="rng-bar-wrap"><div class="rng-bar" style="height:\${Math.round(cnt/maxCount*60)}px"></div><div class="rng-label">\${val}</div></div>\`
  ).join('');
}

showRound();
testRandom();`,
    [
      { level:'easy',   uk:'Натисни "Кинути!" кілька разів — кожен раз нове випадкове число. Поміняй кубик на d20.',  ru:'Нажми "Кинути!" несколько раз. Поменяй кубик на d20.' },
      { level:'medium', uk:'Запусти "Random розподіл" — стовпці мають бути приблизно рівні. Чому? Що таке рівномірний розподіл?',  ru:'Запусти "Random распределение" — столбцы примерно равны. Почему? Что такое равномерное распределение?' },
      { level:'hard',   uk:'Реалізуй функцію normalRandom() яка повертає число з нормальним розподілом (Box-Muller transform). Підказка: потрібно 2 Math.random().',  ru:'Реализуй normalRandom() с нормальным распределением (Box-Muller transform).' },
    ]
  );

  /* ─── 04-12 ──────────────────────────────────────────────── */
  patch('04-12',
    { uk:`<h2>Обробка помилок: try / catch / finally</h2>
<pre>try {
  // Небезпечний код
  JSON.parse("invalid");  // ← кине SyntaxError
} catch (error) {
  console.error(error.name);    // "SyntaxError"
  console.error(error.message); // "Unexpected token..."
  console.error(error.stack);   // Stack trace
} finally {
  // Виконується ЗАВЖДИ (з або без помилки)
  cleanup();
}</pre>
<h3>Типи помилок</h3>
<pre>SyntaxError     — невалідний синтаксис
TypeError       — неправильний тип (null.foo)
ReferenceError  — змінна не існує
RangeError      — значення поза межами
URIError        — помилка URI
EvalError       — рідко</pre>
<h3>Кастомні помилки</h3>
<pre>class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

throw new ValidationError('Too short', 'username');

try { validate(input); }
catch (e) {
  if (e instanceof ValidationError) {
    showError(e.field, e.message);
  } else {
    throw e; // перекидаємо якщо не знаємо тип
  }
}</pre>`,
      ru:`<h2>try / catch / finally</h2>
<pre>try {
  JSON.parse("invalid"); // SyntaxError
} catch (error) {
  console.error(error.name);    // "SyntaxError"
  console.error(error.message);
} finally {
  cleanup(); // всегда
}

// Кастомная ошибка:
class ValidationError extends Error {
  constructor(msg, field) {
    super(msg);
    this.name = 'ValidationError';
    this.field = field;
  }
}
throw new ValidationError('Too short', 'username');</pre>` },
    `<div class="err-lab">
  <h2>🛡 Error Handling</h2>

  <!-- Тестер помилок -->
  <div class="err-section">
    <h3>Симулятор помилок</h3>
    <div class="err-btns">
      <button onclick="triggerError('syntax')">SyntaxError</button>
      <button onclick="triggerError('type')">TypeError</button>
      <button onclick="triggerError('ref')">ReferenceError</button>
      <button onclick="triggerError('range')">RangeError</button>
      <button onclick="triggerError('custom')">CustomError</button>
    </div>
    <div class="err-result" id="err-result">
      <div class="er-badge" id="er-badge"></div>
      <pre class="er-detail" id="er-detail"></pre>
    </div>
  </div>

  <!-- try/catch flow -->
  <div class="err-section">
    <h3>try / catch / finally flow</h3>
    <div class="tcf-demo">
      <div class="tcf-controls">
        <label><input type="checkbox" id="tcf-throw" onchange="runTCF()"> Кинути помилку</label>
        <label><input type="checkbox" id="tcf-finally" checked onchange="runTCF()"> finally блок</label>
      </div>
      <div class="tcf-blocks" id="tcf-blocks"></div>
    </div>
    <pre class="out" id="tcf-out">—</pre>
  </div>

  <!-- Валідатор форми -->
  <div class="err-section">
    <h3>Validation з кастомними помилками</h3>
    <div class="vld-form">
      <input id="vld-username" placeholder="Username (min 3 chars)">
      <input id="vld-email"    placeholder="Email">
      <input id="vld-age" type="number" placeholder="Вік (18+)">
      <button onclick="validateForm()">Валідувати</button>
    </div>
    <pre class="out" id="vld-out">—</pre>
  </div>
</div>`,
    `${BASE}
.err-lab{max-width:520px}
.err-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.err-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.err-btns{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px}
.err-btns button{padding:5px 8px;font-size:11px}
.err-result{background:#0f172a;border-radius:8px;padding:10px;min-height:40px}
.er-badge{display:inline-block;padding:2px 10px;border-radius:5px;font-size:11px;font-weight:700;margin-bottom:6px}
.er-badge.type-syntax{background:rgba(239,68,68,.15);color:#ef4444}
.er-badge.type-type{background:rgba(245,158,11,.15);color:#f59e0b}
.er-badge.type-ref{background:rgba(139,92,246,.15);color:#8b5cf6}
.er-badge.type-range{background:rgba(59,130,246,.15);color:#3b82f6}
.er-badge.type-custom{background:rgba(16,185,129,.15);color:#10b981}
.er-detail{font-size:11px;color:#64748b;font-family:monospace;white-space:pre-wrap}

.tcf-controls{display:flex;gap:12px;margin-bottom:8px;font-size:12px;color:#64748b}
.tcf-controls label{display:flex;align-items:center;gap:5px;cursor:pointer}
.tcf-controls input[type=checkbox]{accent-color:#3b82f6}
.tcf-blocks{display:flex;gap:4px;margin-bottom:8px}
.tcf-block{flex:1;border-radius:6px;padding:8px;font-size:11px;font-family:monospace;text-align:center;border:1px solid #334155;color:#475569;transition:.3s}
.tcf-block.active{border-color:#3b82f6;color:#7dd3fc;background:rgba(59,130,246,.1)}
.tcf-block.catch-active{border-color:#ef4444;color:#ef4444;background:rgba(239,68,68,.1)}
.tcf-block.finally-active{border-color:#10b981;color:#10b981;background:rgba(16,185,129,.1)}

.vld-form{display:flex;flex-direction:column;gap:6px;margin-bottom:8px}
.vld-form input{width:100%}`,
    `function triggerError(type) {
  const badge = document.getElementById('er-badge');
  const detail = document.getElementById('er-detail');
  try {
    if(type==='syntax') JSON.parse('{"bad":}');
    if(type==='type')   null.toString();
    if(type==='ref')    eval('undefinedVariable + 1');
    if(type==='range')  new Array(-1);
    if(type==='custom') { throw Object.assign(new Error('Username is too short'), { name:'ValidationError', field:'username' }); }
  } catch(e) {
    badge.className = 'er-badge type-' + type;
    badge.textContent = e.name;
    detail.textContent = \`message: \${e.message}\nfield:   \${e.field||'—'}\n\nStack:\n\${(e.stack||'').split('\n').slice(0,3).join('\n')}\`;
  }
}

function runTCF() {
  const shouldThrow  = document.getElementById('tcf-throw').checked;
  const hasFinally   = document.getElementById('tcf-finally').checked;
  const blocks = document.getElementById('tcf-blocks');
  blocks.innerHTML = ['try','catch','finally'].map(n=>\`<div class="tcf-block" id="b-\${n}">\${n}</div>\`).join('');
  const log = [];

  function highlight(id, cls, delay) {
    setTimeout(()=>{
      const el = document.getElementById('b-'+id);
      if(el) el.className = 'tcf-block ' + cls;
    }, delay);
  }

  try {
    highlight('try','active',0);
    log.push('▶ try — виконуємо код...');
    if(shouldThrow) throw new Error('Щось пішло не так!');
    log.push('✅ try — завершено без помилок');
  } catch(e) {
    highlight('catch','catch-active',100);
    log.push('❌ catch — перехопили: ' + e.message);
  } finally {
    if(hasFinally) {
      highlight('finally','finally-active', shouldThrow?200:100);
      log.push('🔚 finally — виконується завжди');
    } else {
      document.getElementById('b-finally').style.opacity='.3';
    }
  }
  setTimeout(()=>{
    document.getElementById('tcf-out').textContent = log.join('\n');
  }, 300);
}
runTCF();

class ValidationError extends Error {
  constructor(msg, field) { super(msg); this.name='ValidationError'; this.field=field; }
}

function validateForm() {
  const uname = document.getElementById('vld-username').value;
  const email = document.getElementById('vld-email').value;
  const age   = parseInt(document.getElementById('vld-age').value);
  const errors = [];

  try {
    if(!uname || uname.length < 3) throw new ValidationError('Мінімум 3 символи', 'username');
    if(!email || !email.includes('@')) throw new ValidationError('Невалідний email', 'email');
    if(isNaN(age) || age < 18) throw new ValidationError('Вік має бути 18+', 'age');
    document.getElementById('vld-out').textContent = '✅ Валідація пройдена!\n' +
      \`username: "\${uname}"\nemail: "\${email}"\nage: \${age}\`;
  } catch(e) {
    if(e instanceof ValidationError) {
      document.getElementById('vld-out').textContent =
        \`❌ \${e.name}\nПоле: \${e.field}\nПомилка: \${e.message}\`;
    } else throw e;
  }
}`,
    [
      { level:'easy',   uk:'Натисни всі 5 кнопок помилок — прочитай назву, message і поле field. Яка помилка "найнебезпечніша" (null.toString)?',  ru:'Нажми все 5 кнопок ошибок — прочитай name, message, field. Какая ошибка "самая опасная"?' },
      { level:'medium', uk:'Включи "Кинути помилку" і поспостерігай за блоками try/catch/finally. Потім вимкни — чи виконується catch без помилки?',  ru:'Включи "Кинути помилку" — наблюдай за блоками. Выключи — выполняется ли catch без ошибки?' },
      { level:'hard',   uk:'Напиши клас NetworkError extends Error з полем statusCode. Кинь його якщо statusCode >= 400 і перехопи з instanceof.',  ru:'Напиши класс NetworkError extends Error с полем statusCode. Брось если statusCode >= 400.' },
    ]
  );

  /* ─── 04-13 ──────────────────────────────────────────────── */
  patch('04-13',
    { uk:`<h2>Regular Expressions: базові шаблони</h2>
<pre>// Синтаксис:
const re = /pattern/flags;
const re2 = new RegExp('pattern', 'flags');

// Флаги:
// g — global (всі збіги)
// i — ignore case
// m — multiline
// s — dotAll (. включає \n)

// Методи рядків:
str.match(/pattern/)   // масив збігів (або null)
str.match(/pat/g)      // всі збіги (global)
str.replace(/old/g, 'new')
str.split(/separator/)
str.search(/pattern/)  // індекс першого збігу

// Метод regexp:
/pattern/.test(str)    // true/false</pre>
<h3>Шаблони (patterns)</h3>
<pre>\\d  — цифра [0-9]
\\w  — слово [a-zA-Z0-9_]
\\s  — пробіл
\\D  — не цифра
.   — будь-який символ (крім \n)
^   — початок рядка
$   — кінець рядка
*   — 0 або більше
+   — 1 або більше
?   — 0 або 1
{3} — рівно 3
{2,5} — від 2 до 5
[aeiou] — клас символів
(ab|cd) — або ab або cd
(\\d+) — група захоплення</pre>`,
      ru:`<h2>RegExp</h2>
<pre>// Флаги: g, i, m, s
str.match(/pattern/)  // збіги
str.replace(/old/g,'new')
/pattern/.test(str)   // true/false

// Шаблоны:
\\d — цифра
\\w — слово [a-zA-Z0-9_]
\\s — пробел
.  — любой символ
^  — начало
$  — конец
+  — 1 и больше
*  — 0 и больше
{2,5} — от 2 до 5
(\\d+) — группа захвата</pre>` },
    `<div class="re-lab">
  <h2>🔍 RegExp Tester</h2>

  <!-- Основний тестер -->
  <div class="re-main">
    <div class="re-pattern-row">
      <span class="re-slash">/</span>
      <input id="re-pattern" value="\\d+" placeholder="pattern" style="flex:1;border-radius:0;border-left:none;border-right:none">
      <span class="re-slash">/</span>
      <input id="re-flags" value="g" placeholder="flags" style="width:50px;border-radius:0 8px 8px 0;border-left:none">
      <button onclick="runRe()">Test</button>
    </div>
    <textarea id="re-input" rows="3" placeholder="Введи текст для пошуку...">Телефон: 380-95-123-4567 або +38(044)123-45-67. Email: user@example.com. Дата: 2025-01-15.</textarea>
  </div>

  <div class="re-result" id="re-result">
    <div class="rr-matches" id="rr-matches"></div>
    <pre class="rr-code" id="rr-code">—</pre>
  </div>

  <!-- Готові шаблони -->
  <div class="re-presets">
    <h3>Готові шаблони</h3>
    <div class="rp-btns">
      <button onclick="setPattern('email')">📧 Email</button>
      <button onclick="setPattern('phone')">📱 Телефон</button>
      <button onclick="setPattern('date')">📅 Дата</button>
      <button onclick="setPattern('url')">🔗 URL</button>
      <button onclick="setPattern('digits')">🔢 Тільки цифри</button>
      <button onclick="setPattern('words')">🔤 Слова</button>
    </div>
  </div>

  <!-- Довідник символів -->
  <div class="re-cheatsheet">
    <h3>Шпаргалка</h3>
    <div class="rc-grid" id="rc-grid"></div>
  </div>
</div>`,
    `${BASE}
.re-lab{max-width:520px}
.re-main{margin-bottom:10px}
.re-pattern-row{display:flex;align-items:center;gap:0;margin-bottom:8px}
.re-slash{background:#1e293b;border:1px solid #334155;padding:8px 10px;font-family:monospace;font-size:14px;color:#f59e0b}
.re-pattern-row input{border-radius:0}
.re-pattern-row button{margin-left:6px;border-radius:8px}
.re-main textarea{width:100%;font-family:monospace;font-size:12px;padding:8px;resize:vertical}

.re-result{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.rr-matches{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;min-height:24px}
.rr-match{background:rgba(59,130,246,.2);border:1px solid #3b82f6;border-radius:4px;padding:2px 8px;font-size:12px;font-family:monospace;color:#7dd3fc}
.rr-no-match{color:#ef4444;font-size:12px}
.rr-code{font-size:11px;color:#94a3b8;font-family:monospace;white-space:pre-wrap}

.re-presets{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.re-presets h3,.re-cheatsheet h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.rp-btns{display:flex;flex-wrap:wrap;gap:5px}
.rp-btns button{padding:5px 8px;font-size:11px}

.re-cheatsheet{background:#1e293b;border-radius:10px;padding:12px}
.rc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:4px}
.rc-item{background:#0f172a;border-radius:5px;padding:5px 8px;font-size:11px;font-family:monospace;color:#94a3b8;cursor:pointer;transition:.15s}
.rc-item:hover{border:1px solid #3b82f6;color:#7dd3fc}
.rc-pat{color:#f59e0b}`,
    `function runRe() {
  const patStr = document.getElementById('re-pattern').value;
  const flags  = document.getElementById('re-flags').value || 'g';
  const text   = document.getElementById('re-input').value;
  try {
    const re     = new RegExp(patStr, flags);
    const matches= flags.includes('g') ? text.match(re) : (text.match(re)||[]).slice(0,1);
    const matchEl= document.getElementById('rr-matches');
    const codeEl = document.getElementById('rr-code');
    if(matches && matches.length) {
      matchEl.innerHTML = matches.map(m=>\`<span class="rr-match">\${m.replace(/</g,'&lt;')}</span>\`).join('');
      codeEl.textContent =
        \`/\${patStr}/\${flags}.test(text) = \${/\${patStr}/\${flags}/ .test(text)}\n\n\` +
        \`Збігів: \${matches.length}\nПерший: "\${matches[0]}"\n\` +
        (matches.length>1 ? \`Всі: \${JSON.stringify(matches)}\` : '');
    } else {
      matchEl.innerHTML = '<span class="rr-no-match">❌ Збігів не знайдено</span>';
      codeEl.textContent = \`/\${patStr}/\${flags}.test(text) = false\`;
    }
  } catch(e) {
    document.getElementById('rr-code').textContent = '❌ ' + e.message;
  }
}

const PATTERNS = {
  email:  ['[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}', 'gi'],
  phone:  ['(\\\\+?38)?[\\\\s-]?\\\\(?0\\\\d{2}\\\\)?[\\\\s-]?\\\\d{3}[\\\\s-]?\\\\d{2}[\\\\s-]?\\\\d{2}','g'],
  date:   ['\\\\d{4}-\\\\d{2}-\\\\d{2}', 'g'],
  url:    ['https?://[\\\\w./-]+','gi'],
  digits: ['\\\\d+','g'],
  words:  ['\\\\b[А-ЯA-ZҐЄІЇа-яa-zґєії]{4,}\\\\b','g'],
};
function setPattern(key) {
  const [pat, flags] = PATTERNS[key];
  document.getElementById('re-pattern').value = pat;
  document.getElementById('re-flags').value   = flags;
  runRe();
}

const CHEAT = [
  ['\\\\d','цифра [0-9]'],['\\\\D','не цифра'],['\\\\w','слово [a-zA-Z0-9_]'],
  ['\\\\W','не слово'],['\\\\s','пробіл'],['\\\\S','не пробіл'],
  ['.','будь-який'],['\\\\n','новий рядок'],['\\\\t','таб'],
  ['^','початок'],['$','кінець'],['|','або'],
  ['*','0 або більше'],['+','1 або більше'],['?','0 або 1'],
  ['{3}','рівно 3'],['{2,5}','від 2 до 5'],['[abc]','a або b або c'],
  ['(...)','група захоплення'],['(?:...)','без захоплення'],
];
const grid = document.getElementById('rc-grid');
CHEAT.forEach(([pat,desc]) => {
  const d=document.createElement('div');
  d.className='rc-item';
  d.innerHTML=\`<span class="rc-pat">\${pat}</span> \${desc}\`;
  d.onclick=()=>{document.getElementById('re-pattern').value=pat;runRe();};
  grid.appendChild(d);
});
runRe();`,
    [
      { level:'easy',   uk:'Натисни "📧 Email" і "📅 Дата" — подивись які шаблони використовуються. Скільки збігів знаходить кожен?',  ru:'Нажми "📧 Email" и "📅 Дата" — посмотри какие шаблоны. Сколько совпадений?' },
      { level:'medium', uk:'Напиши RegExp що знаходить всі слова, які починаються з великої літери. Флаг g. Підказка: /[A-ZА-ЯЇІЄ]\\w+/g.',  ru:'Напиши RegExp для всех слов с большой буквы. Флаг g. Подсказка: /[A-ZА-Я]\\w+/g.' },
      { level:'hard',   uk:'Напиши функцію maskEmail("user@example.com") яка повертає "us**@example.com" — перші 2 символи видно, решта — зірочки.',  ru:'Напиши maskEmail("user@example.com") → "us**@example.com" (первые 2 символа видны, остальные — звёздочки).' },
    ]
  );

  /* ─── 04-14 ──────────────────────────────────────────────── */
  patch('04-14',
    { uk:`<h2>JSON: parse, stringify та глибоке копіювання</h2>
<h3>JSON синтаксис</h3>
<pre>// Тільки: string, number, boolean, null, array, object
// НЕ: undefined, function, Symbol, Date (→ рядок!), BigInt

// Серіалізація (об'єкт → рядок):
const json = JSON.stringify(obj);
const pretty = JSON.stringify(obj, null, 2); // відступ 2

// Вибіркові поля (replacer):
JSON.stringify(obj, ['name', 'age']); // тільки name і age

// Замінювач функція:
JSON.stringify(obj, (key, val) =>
  typeof val === 'function' ? undefined : val
);</pre>
<h3>Парсинг (рядок → об'єкт)</h3>
<pre>const obj = JSON.parse(jsonString);

// Reviver:
JSON.parse(json, (key, val) =>
  key === 'date' ? new Date(val) : val
);</pre>
<h3>Глибоке копіювання</h3>
<pre>// Метод 1: JSON (простий, але втрачає функції/Date):
const deep = JSON.parse(JSON.stringify(original));

// Метод 2: structuredClone (сучасний, краще!):
const deep2 = structuredClone(original); // Chrome 98+

// Метод 3: бібліотека Lodash:
const deep3 = _.cloneDeep(original);</pre>
<h3>Безпека</h3>
<pre>try {
  const data = JSON.parse(userInput); // може кинути!
} catch (e) {
  console.error('Invalid JSON:', e.message);
}</pre>`,
      ru:`<h2>JSON</h2>
<pre>// Сериализация:
const str = JSON.stringify(obj, null, 2);

// Парсинг:
const obj = JSON.parse(jsonStr);

// Глубокое копирование:
const deep = JSON.parse(JSON.stringify(original));
// или:
const deep2 = structuredClone(original);

// Безопасно:
try {
  JSON.parse(input);
} catch(e) {
  console.error('Invalid JSON');
}</pre>` },
    `<div class="json-lab">
  <h2>🗂 JSON Lab</h2>

  <!-- Stringify -->
  <div class="json-section">
    <h3>JSON.stringify</h3>
    <div class="js-editor">
      <div class="js-obj-fields">
        <div class="jsf-row"><label>name</label><input class="jsf-val" value="Аліса"></div>
        <div class="jsf-row"><label>age</label><input class="jsf-val" type="number" value="17"></div>
        <div class="jsf-row"><label>skills</label><input class="jsf-val" value="HTML,CSS,JS"></div>
        <div class="jsf-row"><label>active</label><select class="jsf-val"><option>true</option><option>false</option></select></div>
        <button onclick="addField()">+ Поле</button>
      </div>
      <div class="js-controls">
        <label>Indent <select id="js-indent"><option value="0">0</option><option value="2" selected>2</option><option value="4">4</option></select></label>
        <label><input type="checkbox" id="js-only-keys"> Тільки ключі</label>
      </div>
      <button onclick="stringify()">stringify →</button>
    </div>
    <pre class="out" id="js-out">—</pre>
  </div>

  <!-- Parse -->
  <div class="json-section">
    <h3>JSON.parse</h3>
    <textarea id="jp-in" rows="4" placeholder='{"name":"Alice"}' style="width:100%;font-family:monospace;font-size:12px;padding:8px;resize:vertical">{"name":"Аліса","score":95,"tags":["js","css"]}</textarea>
    <button onclick="parseJSON()">parse →</button>
    <pre class="out" id="jp-out">—</pre>
  </div>

  <!-- Deep copy -->
  <div class="json-section">
    <h3>Deep Copy порівняння</h3>
    <button onclick="deepCopyDemo()">Показати</button>
    <pre class="out" id="dc-out">—</pre>
  </div>

  <!-- JSON валідатор -->
  <div class="json-section">
    <h3>JSON Validator</h3>
    <textarea id="jv-in" rows="3" placeholder='Введи JSON для перевірки...' style="width:100%;font-family:monospace;font-size:12px;padding:8px;resize:vertical"></textarea>
    <button onclick="validateJSON()">Перевірити</button>
    <div class="jv-result" id="jv-result"></div>
  </div>
</div>`,
    `${BASE}
.json-lab{max-width:520px}
.json-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.json-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.js-obj-fields{display:flex;flex-direction:column;gap:4px;margin-bottom:8px}
.jsf-row{display:flex;align-items:center;gap:8px}
.jsf-row label{min-width:48px;font-size:12px;color:#64748b;font-family:monospace}
.jsf-row .jsf-val{flex:1;padding:5px 8px;font-size:12px}
.js-controls{display:flex;gap:12px;align-items:center;font-size:12px;color:#64748b;margin-bottom:8px}
.js-controls select{padding:4px 6px;font-size:12px;margin-left:4px}
.js-controls input[type=checkbox]{accent-color:#3b82f6}
.json-section>button,.json-section .js-editor>button{padding:6px 14px;font-size:12px;margin-bottom:8px}
.json-section textarea{margin-bottom:8px}
.jv-result{padding:8px;border-radius:6px;font-size:12px;min-height:28px;font-family:monospace}
.jv-result.valid{background:rgba(16,185,129,.1);color:#10b981}
.jv-result.invalid{background:rgba(239,68,68,.1);color:#ef4444}`,
    `function getObj() {
  const rows = document.querySelectorAll('.jsf-row');
  const obj = {};
  rows.forEach(row => {
    const label = row.querySelector('label');
    const input = row.querySelector('.jsf-val');
    if(!label||!input) return;
    const key = label.textContent.trim();
    const rawVal = input.value || input.options?.[input.selectedIndex]?.value;
    if(key==='age') obj[key] = parseInt(rawVal)||0;
    else if(rawVal==='true') obj[key]=true;
    else if(rawVal==='false') obj[key]=false;
    else if(key==='skills') obj[key]=rawVal.split(',').map(s=>s.trim());
    else obj[key]=rawVal;
  });
  return obj;
}

function addField() {
  const key = prompt('Назва ключа:');
  if(!key) return;
  const d=document.createElement('div');
  d.className='jsf-row';
  d.innerHTML=\`<label>\${key}</label><input class="jsf-val" value=""><button onclick="this.closest('.jsf-row').remove()" style="padding:3px 7px;border-color:transparent;color:#475569">✕</button>\`;
  document.querySelector('.js-obj-fields').insertBefore(d, document.querySelector('.js-obj-fields>button'));
}

function stringify() {
  const obj = getObj();
  const indent = parseInt(document.getElementById('js-indent').value);
  const onlyKeys = document.getElementById('js-only-keys').checked;
  const replacer = onlyKeys ? Object.keys(obj) : null;
  const json = JSON.stringify(obj, replacer, indent);
  document.getElementById('js-out').textContent =
    \`Об'єкт: \${JSON.stringify(obj)}\n\nJSON.stringify(obj, \${onlyKeys?'keys':null}, \${indent}):\n\${json}\`;
}

function parseJSON() {
  try {
    const json = document.getElementById('jp-in').value;
    const obj  = JSON.parse(json);
    const keys = Object.keys(obj);
    let out = \`JSON.parse успішно!\n\nТип: \${typeof obj}\nКлючі: [\${keys.map(k=>'"'+k+'"').join(', ')}]\n\n\`;
    keys.forEach(k => { out += \`\${k}: \${JSON.stringify(obj[k])}\n\`; });
    document.getElementById('jp-out').textContent = out;
  } catch(e) {
    document.getElementById('jp-out').textContent = '❌ ' + e.message;
  }
}

function deepCopyDemo() {
  const original = {
    name: 'Alice',
    scores: [10, 20, 30],
    address: { city: 'Kyiv' },
    fn: function(){}, // буде втрачено!
    date: new Date('2025-01-15'), // стане рядком!
  };
  const shallow = { ...original };
  const deep    = JSON.parse(JSON.stringify(original));

  shallow.name = 'Bob';
  shallow.scores.push(40); // змінює original!

  let out = '=== Shallow copy ({ ...original }) ===\n';
  out += \`shallow.name:   "\${shallow.name}" (змінили)\noriginal.name:  "\${original.name}" ✅ не змінився\n\`;
  out += \`shallow.scores: [\${shallow.scores}]\noriginal.scores:[\${original.scores}] ❌ теж змінився!\n\n\`;
  out += '=== Deep copy (JSON.parse+stringify) ===\n';
  out += \`deep.scores: [\${deep.scores}] ✅ незалежний\n\`;
  out += \`deep.fn:     \${deep.fn} ❌ функція втрачена\n\`;
  out += \`deep.date:   "\${deep.date}" ❌ стала рядком\n\n\`;
  out += '=== structuredClone (якщо підтримується) ===\n';
  if(typeof structuredClone !== 'undefined') {
    try {
      const sc = structuredClone({name:'Alice',date:new Date('2025-01-15'),nums:[1,2,3]});
      out += \`sc.date instanceof Date: \${sc.date instanceof Date} ✅ Date зберігається!\`;
    } catch(e) { out += 'structuredClone: ' + e.message; }
  } else { out += 'structuredClone не підтримується у цьому середовищі'; }

  document.getElementById('dc-out').textContent = out;
}

function validateJSON() {
  const input = document.getElementById('jv-in').value;
  const el    = document.getElementById('jv-result');
  try {
    const obj = JSON.parse(input);
    el.className = 'jv-result valid';
    el.textContent = '✅ Валідний JSON. Ключів: ' + (typeof obj==='object'&&obj?Object.keys(obj).length:'—');
  } catch(e) {
    el.className = 'jv-result invalid';
    el.textContent = '❌ ' + e.message;
  }
}`,
    [
      { level:'easy',   uk:'Натисни "+ Поле", введи ключ "email" і значення — потім stringify з indent=2. Що отримаєш?',  ru:'Нажми "+ Поле", введи "email" — потом stringify с indent=2. Что получишь?' },
      { level:'medium', uk:'Натисни "Deep Copy порівняння" — знайди 3 обмеження JSON.parse(stringify): що втрачається? Коли краще structuredClone?',  ru:'Нажми "Deep Copy" — найди 3 ограничения JSON.parse(stringify). Когда лучше structuredClone?' },
      { level:'hard',   uk:'Напиши safeJSON(input) яка повертає { ok: true, data } або { ok: false, error } — без try/catch у caller.',  ru:'Напиши safeJSON(input) которая возвращает { ok: true, data } или { ok: false, error }.' },
    ]
  );

  /* ─── 04-15 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('04-15',
    { uk:`<h2>ПРОЕКТ: Функціональна бібліотека утиліт</h2>
<p>Побудуй власну мінімальну JS-бібліотеку утиліт (mini-Lodash). Кожна функція — окремий util.</p>
<h3>Обов'язкові функції</h3>
<ol>
  <li><code>chunk(arr, size)</code> — розбиває масив на шматки: chunk([1,2,3,4,5],2) → [[1,2],[3,4],[5]]</li>
  <li><code>groupBy(arr, fn)</code> — групує за значенням: groupBy([1,2,3],n=>n%2?'odd':'even')</li>
  <li><code>memoize(fn)</code> — кешує результати</li>
  <li><code>debounce(fn, ms)</code> — затримує виклик</li>
  <li><code>deepClone(val)</code> — глибока копія (через structuredClone або JSON)</li>
  <li><code>flattenDeep(arr)</code> — розгладжує вкладені масиви</li>
  <li><code>pick(obj, keys)</code> — вибирає тільки певні ключі</li>
  <li><code>omit(obj, keys)</code> — виключає певні ключі</li>
</ol>
<h3>Бонус</h3>
<pre>// Compose і pipe:
const compose = (...fns) => x => fns.reduceRight((v,f)=>f(v),x);
const pipe    = (...fns) => x => fns.reduce((v,f)=>f(v),x);

const transform = pipe(
  arr => arr.filter(n => n > 0),
  arr => arr.map(n => n * 2),
  arr => arr.sort((a,b) => a-b)
);
transform([-1, 3, -2, 5]) // [6, 10]</pre>`,
      ru:`<h2>ПРОЕКТ: Библиотека утилит</h2>
<h3>Обязательные функции</h3>
<ol>
  <li>chunk(arr, size) — разбивает массив</li>
  <li>groupBy(arr, fn) — группировка</li>
  <li>memoize(fn) — кэширование</li>
  <li>debounce(fn, ms) — задержка вызова</li>
  <li>deepClone(val) — глубокая копия</li>
  <li>flattenDeep(arr) — разгладить</li>
  <li>pick(obj, keys) — выбор ключей</li>
  <li>omit(obj, keys) — исключение ключей</li>
</ol>` },
    `<div class="lib-lab">
  <h2>📚 Utils Library Tester</h2>

  <div class="lib-status" id="lib-status"></div>

  <!-- chunk -->
  <div class="lib-fn">
    <div class="lf-header">
      <code class="lf-name">chunk(arr, size)</code>
      <span class="lf-badge" id="b-chunk">⏳</span>
    </div>
    <div class="lf-controls">
      <input id="chunk-arr" value="1,2,3,4,5,6,7" placeholder="числа">
      <input id="chunk-size" type="number" value="3" style="width:50px">
      <button onclick="testChunk()">Run</button>
    </div>
    <pre class="out lf-out" id="o-chunk">—</pre>
  </div>

  <!-- groupBy -->
  <div class="lib-fn">
    <div class="lf-header">
      <code class="lf-name">groupBy(arr, fn)</code>
      <span class="lf-badge" id="b-group">⏳</span>
    </div>
    <div class="lf-controls">
      <input id="gb-arr" value="1,2,3,4,5,6">
      <select id="gb-fn">
        <option value="even">n%2?"odd":"even"</option>
        <option value="gt3">n>3?"big":"small"</option>
        <option value="mod3">n%3</option>
      </select>
      <button onclick="testGroupBy()">Run</button>
    </div>
    <pre class="out lf-out" id="o-group">—</pre>
  </div>

  <!-- debounce -->
  <div class="lib-fn">
    <div class="lf-header">
      <code class="lf-name">debounce(fn, ms)</code>
      <span class="lf-badge" id="b-debounce">⏳</span>
    </div>
    <div class="lf-controls">
      <input id="db-input" placeholder="Пиши тут...">
      <span id="db-count" class="db-count">Викликів: 0</span>
    </div>
    <pre class="out lf-out" id="o-debounce">—</pre>
  </div>

  <!-- flattenDeep -->
  <div class="lib-fn">
    <div class="lf-header">
      <code class="lf-name">flattenDeep(arr)</code>
      <span class="lf-badge" id="b-flatten">⏳</span>
    </div>
    <div class="lf-controls">
      <input id="fl-arr" value="[1,[2,[3,[4]]],5]">
      <button onclick="testFlatten()">Run</button>
    </div>
    <pre class="out lf-out" id="o-flatten">—</pre>
  </div>

  <!-- pick / omit -->
  <div class="lib-fn">
    <div class="lf-header">
      <code class="lf-name">pick / omit</code>
      <span class="lf-badge" id="b-pick">⏳</span>
    </div>
    <div class="lf-controls">
      <input id="po-keys" value="name,age" placeholder="ключі через кому">
      <button onclick="testPick()">pick</button>
      <button onclick="testOmit()">omit</button>
    </div>
    <pre class="out lf-out" id="o-pick">—</pre>
  </div>

  <!-- compose / pipe -->
  <div class="lib-fn">
    <div class="lf-header">
      <code class="lf-name">compose / pipe</code>
      <span class="lf-badge" id="b-pipe">⏳</span>
    </div>
    <div class="lf-controls">
      <input id="pipe-in" value="-5,3,-2,8,1,-4,6">
      <button onclick="testPipe()">Run</button>
    </div>
    <pre class="out lf-out" id="o-pipe">—</pre>
  </div>
</div>`,
    `${BASE}
.lib-lab{max-width:520px}
.lib-status{padding:8px 12px;border-radius:8px;font-size:12px;font-family:monospace;margin-bottom:10px;background:#1e293b}
.lib-fn{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:8px}
.lf-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.lf-name{font-size:13px;font-weight:700;color:#7dd3fc}
.lf-badge{font-size:11px;padding:2px 8px;border-radius:5px;background:#0f172a;color:#64748b}
.lf-badge.pass{background:rgba(16,185,129,.15);color:#10b981}
.lf-badge.fail{background:rgba(239,68,68,.15);color:#ef4444}
.lf-controls{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;align-items:center}
.lf-controls input{flex:1;min-width:80px;padding:6px 8px;font-size:12px;font-family:monospace}
.lf-controls select{flex:1;padding:6px;font-size:12px}
.lf-controls button{padding:6px 12px;font-size:12px}
.lf-out{font-size:11px;max-height:80px;overflow-y:auto}
.db-count{font-size:11px;color:#64748b;font-family:monospace;white-space:nowrap}`,
    `// ─── Бібліотека утиліт ───────────────────────────────────
const _ = {
  chunk(arr, size) {
    const result = [];
    for(let i=0;i<arr.length;i+=size) result.push(arr.slice(i,i+size));
    return result;
  },

  groupBy(arr, fn) {
    return arr.reduce((groups, item) => {
      const key = fn(item);
      (groups[key] = groups[key]||[]).push(item);
      return groups;
    }, {});
  },

  memoize(fn) {
    const cache = new Map();
    return function(...args) {
      const key = JSON.stringify(args);
      if(cache.has(key)) return cache.get(key);
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  },

  debounce(fn, ms) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  },

  deepClone(val) {
    if(typeof structuredClone === 'function') return structuredClone(val);
    return JSON.parse(JSON.stringify(val));
  },

  flattenDeep(arr) {
    return arr.reduce((flat, item) =>
      flat.concat(Array.isArray(item) ? _.flattenDeep(item) : item), []);
  },

  pick(obj, keys) {
    return keys.reduce((acc, k) => { if(k in obj) acc[k]=obj[k]; return acc; }, {});
  },

  omit(obj, keys) {
    const keySet = new Set(keys);
    return Object.fromEntries(Object.entries(obj).filter(([k])=>!keySet.has(k)));
  },

  compose:(...fns) => x => fns.reduceRight((v,f)=>f(v),x),
  pipe:   (...fns) => x => fns.reduce((v,f)=>f(v),x),
};

// ─── Тести ────────────────────────────────────────────────
function badge(id, pass) {
  const el = document.getElementById('b-' + id);
  el.textContent = pass ? '✅ Pass' : '❌ Fail';
  el.className = 'lf-badge ' + (pass?'pass':'fail');
}

function parseArr(id) {
  return document.getElementById(id).value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
}

function testChunk() {
  const arr  = parseArr('chunk-arr');
  const size = parseInt(document.getElementById('chunk-size').value)||2;
  const res  = _.chunk(arr,size);
  const pass = res.every(c=>c.length<=size);
  badge('chunk',pass);
  document.getElementById('o-chunk').textContent =
    \`_.chunk([\${arr}], \${size})\n= \${JSON.stringify(res)}\n\nПереконайся: довжина кожного ≤ \${size}: \${pass?'✅':'❌'}\`;
}

const GB_FNS = {
  even:  n => n%2?'odd':'even',
  gt3:   n => n>3?'big':'small',
  mod3:  n => 'mod'+n%3,
};
function testGroupBy() {
  const arr = parseArr('gb-arr');
  const key = document.getElementById('gb-fn').value;
  const res = _.groupBy(arr, GB_FNS[key]);
  const pass = Object.keys(res).length > 0;
  badge('group',pass);
  document.getElementById('o-group').textContent =
    \`_.groupBy([\${arr}], fn)\n= \${JSON.stringify(res,null,2)}\`;
}

let dbCallCount = 0;
const debouncedSearch = _.debounce(val => {
  dbCallCount++;
  document.getElementById('db-count').textContent = 'Викликів: ' + dbCallCount;
  document.getElementById('o-debounce').textContent =
    \`Останній пошук: "\${val}"\nВикликів debounced fn: \${dbCallCount}\n\n✅ Хоч скільки разів пишеш — fn викликається через 400ms після останнього символу\`;
  badge('debounce', true);
}, 400);
document.getElementById('db-input').addEventListener('input', e => debouncedSearch(e.target.value));

function testFlatten() {
  try {
    const raw = document.getElementById('fl-arr').value;
    const arr = JSON.parse(raw.replace(/'/g,'"'));
    const res = _.flattenDeep(arr);
    badge('flatten', Array.isArray(res)&&!res.some(Array.isArray));
    document.getElementById('o-flatten').textContent =
      \`_.flattenDeep(\${raw})\n= [\${res}]\n\nВкладених масивів не залишилось: \${!res.some(Array.isArray)?'✅':'❌'}\`;
  } catch(e) {
    document.getElementById('o-flatten').textContent = '❌ ' + e.message;
  }
}

const DEMO_OBJ = { name:'Alice', age:17, city:'Kyiv', email:'alice@test.com', score:95 };
function testPick() {
  const keys = document.getElementById('po-keys').value.split(',').map(s=>s.trim());
  const res  = _.pick(DEMO_OBJ, keys);
  const pass = keys.every(k=>k in res);
  badge('pick',pass);
  document.getElementById('o-pick').textContent =
    \`obj = \${JSON.stringify(DEMO_OBJ)}\n\n_.pick(obj, [\${keys.map(k=>'"'+k+'"').join(',')}])\n= \${JSON.stringify(res)}\`;
}
function testOmit() {
  const keys = document.getElementById('po-keys').value.split(',').map(s=>s.trim());
  const res  = _.omit(DEMO_OBJ, keys);
  const pass = keys.every(k=>!(k in res));
  badge('pick',pass);
  document.getElementById('o-pick').textContent =
    \`obj = \${JSON.stringify(DEMO_OBJ)}\n\n_.omit(obj, [\${keys.map(k=>'"'+k+'"').join(',')}])\n= \${JSON.stringify(res)}\`;
}

function testPipe() {
  const nums = parseArr('pipe-in');
  const transform = _.pipe(
    arr => arr.filter(n => n > 0),
    arr => arr.map(n => n * 2),
    arr => arr.sort((a,b)=>a-b),
  );
  const res = transform(nums);
  badge('pipe', true);
  document.getElementById('o-pipe').textContent =
    \`Вхід:  [\${nums}]\n\npipe(\n  filter(n>0),  → [\${nums.filter(n=>n>0)}]\n  map(n*2),     → [\${nums.filter(n=>n>0).map(n=>n*2)}]\n  sort(a-b)     → [\${res}]\n)\n\nРезультат: [\${res}]\`;
}

// Запуск всіх тестів
function runAllTests() {
  testChunk(); testGroupBy(); testFlatten(); testPick(); testPipe();
  const passes = document.querySelectorAll('.lf-badge.pass').length;
  const total  = document.querySelectorAll('.lf-badge').length;
  document.getElementById('lib-status').innerHTML =
    \`📊 Авто-тести: \${passes}/\${total} пройдено \${passes===total?'🎉':'— Пиши у поле debounce щоб перевірити останній тест'}\`;
}
runAllTests();`,
    [
      { level:'easy',   uk:'Натисни "Run" для chunk, groupBy, flattenDeep — прочитай результати. Всі зелені ✅?',  ru:'Нажми "Run" для chunk, groupBy, flattenDeep — прочитай результаты. Все зелёные?' },
      { level:'medium', uk:'Введи щось у поле debounce і швидко пиши — скільки разів викличеться функція? Зміни 400ms на 100ms.',  ru:'Введи что-то в поле debounce и быстро печатай — сколько раз вызовется функция?' },
      { level:'hard',   uk:'Додай до бібліотеки функцію throttle(fn, ms) — подібна до debounce, але викликає fn не рідше ніж раз у ms мілісекунд.',  ru:'Добавь в библиотеку throttle(fn, ms) — похожа на debounce, но вызывает fn не реже чем раз в ms мс.' },
    ]
  );

})();
