/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 05 — DOM та Інтерактивність · 10–14 Веб-Розробник
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
pre.out{background:#0f172a;border:1px solid #1e293b;border-radius:8px;padding:10px;font-size:12px;font-family:monospace;color:#94a3b8;min-height:36px;max-height:160px;overflow-y:auto;white-space:pre-wrap}`;

  /* ─── 05-01 ──────────────────────────────────────────────── */
  patch('05-01',
    { uk:`<h2>DOM traverse: parentElement, children, siblings</h2>
<h3>Навігація по DOM-дереву</h3>
<pre>const el = document.querySelector('.card');

// Вгору:
el.parentElement          // безпосередній батько
el.closest('.container')  // перший предок що відповідає

// Вниз:
el.children               // HTMLCollection дочірніх
el.childNodes             // NodeList (включно з текстом)
el.firstElementChild      // перший дочірній елемент
el.lastElementChild       // останній

// Вліво / вправо:
el.previousElementSibling
el.nextElementSibling

// Масив дочірніх:
[...el.children].filter(c => c.classList.contains('active'));</pre>
<h3>Пошук у піддереві</h3>
<pre>el.querySelector('.btn')       // перший серед нащадків
el.querySelectorAll('.item')   // всі серед нащадків</pre>
<h3>Перевірки</h3>
<pre>el.contains(otherEl)  // чи є otherEl нащадком el
el.matches('.active') // чи відповідає селектору</pre>`,
      ru:`<h2>DOM traverse</h2>
<pre>el.parentElement
el.closest('.container')
el.children
el.firstElementChild / lastElementChild
el.previousElementSibling / nextElementSibling

el.querySelector('.btn')
el.querySelectorAll('.item')
el.contains(other)
el.matches('.active')</pre>` },
    `<div class="dom-lab">
  <h2>🌳 DOM Traverse Lab</h2>

  <!-- Дерево DOM -->
  <div class="dom-tree" id="dom-tree">
    <div class="dt-node dt-root" id="n-root" data-label="div#container">
      <div class="dt-node dt-child" id="n-header" data-label="header">
        <div class="dt-node dt-leaf" id="n-logo" data-label="span.logo">Logo</div>
        <div class="dt-node dt-leaf" id="n-nav" data-label="nav">Nav</div>
      </div>
      <div class="dt-node dt-child" id="n-main" data-label="main">
        <div class="dt-node dt-leaf active" id="n-card1" data-label="div.card.active">Card 1</div>
        <div class="dt-node dt-leaf" id="n-card2" data-label="div.card">Card 2</div>
        <div class="dt-node dt-leaf" id="n-card3" data-label="div.card">Card 3</div>
      </div>
      <div class="dt-node dt-child" id="n-footer" data-label="footer">
        <div class="dt-node dt-leaf" id="n-copy" data-label="p.copy">© 2025</div>
      </div>
    </div>
  </div>

  <!-- Вибір елемента -->
  <div class="dt-select">
    <h3>Обери елемент та метод навігації</h3>
    <div class="dt-row">
      <select id="dt-el">
        <option value="n-card1">div.card.active (Card 1)</option>
        <option value="n-main">main</option>
        <option value="n-logo">span.logo</option>
        <option value="n-nav">nav</option>
        <option value="n-footer">footer</option>
      </select>
      <select id="dt-method">
        <option value="parent">parentElement</option>
        <option value="closest">closest('div')</option>
        <option value="children">children</option>
        <option value="first">firstElementChild</option>
        <option value="last">lastElementChild</option>
        <option value="prev">previousElementSibling</option>
        <option value="next">nextElementSibling</option>
        <option value="matches">matches('.active')</option>
        <option value="contains">contains(card2)</option>
      </select>
      <button onclick="runTraverse()">Go</button>
    </div>
  </div>

  <pre class="out" id="dom-out">Оберіть елемент і метод →</pre>
</div>`,
    `${BASE}
.dom-lab{max-width:520px}
.dom-tree{background:#1e293b;border-radius:12px;padding:14px;margin-bottom:10px;font-size:12px}
.dt-node{padding:5px 8px;border-radius:6px;margin:3px 0;cursor:pointer;border:1px solid transparent;transition:.2s}
.dt-root{border:1px solid #3b82f6;background:rgba(59,130,246,.08)}
.dt-child{margin-left:16px;border:1px solid #334155;background:#0f172a}
.dt-leaf{margin-left:32px;background:rgba(15,23,42,.6);color:#94a3b8;font-family:monospace;font-size:11px}
.dt-node[data-label]::before{content:attr(data-label);color:#64748b;font-size:10px;display:block;margin-bottom:2px}
.dt-node.active{border-color:#f59e0b!important;color:#f59e0b}
.dt-node.hl{background:rgba(59,130,246,.25)!important;border-color:#3b82f6!important;color:#7dd3fc!important}

.dt-select{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.dt-select h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.dt-row{display:flex;gap:6px;flex-wrap:wrap}
.dt-row select{flex:1;padding:7px 10px;font-size:12px}`,
    `const NODES = {
  'n-root':   { label:'div#container', parentId:null, childIds:['n-header','n-main','n-footer'] },
  'n-header': { label:'header',  parentId:'n-root',   childIds:['n-logo','n-nav'] },
  'n-logo':   { label:'span.logo', parentId:'n-header', childIds:[] },
  'n-nav':    { label:'nav',  parentId:'n-header', childIds:[] },
  'n-main':   { label:'main', parentId:'n-root',   childIds:['n-card1','n-card2','n-card3'] },
  'n-card1':  { label:'div.card.active', parentId:'n-main', childIds:[], active:true },
  'n-card2':  { label:'div.card', parentId:'n-main', childIds:[] },
  'n-card3':  { label:'div.card', parentId:'n-main', childIds:[] },
  'n-footer': { label:'footer', parentId:'n-root', childIds:['n-copy'] },
  'n-copy':   { label:'p.copy', parentId:'n-footer', childIds:[] },
};

function siblings(id) {
  const n = NODES[id];
  if(!n.parentId) return [];
  return NODES[n.parentId].childIds.filter(c => c !== id);
}

function highlight(ids) {
  document.querySelectorAll('.dt-node').forEach(el => el.classList.remove('hl'));
  [].concat(ids).forEach(id => { const el = document.getElementById(id); if(el) el.classList.add('hl'); });
}

function runTraverse() {
  const id  = document.getElementById('dt-el').value;
  const m   = document.getElementById('dt-method').value;
  const n   = NODES[id];
  let result, hlIds=[];
  switch(m) {
    case 'parent':   result = n.parentId ? NODES[n.parentId].label : 'null (root)'; hlIds=[n.parentId]; break;
    case 'closest':  { const chain=[id]; let cur=n; while(cur.parentId){chain.push(cur.parentId);cur=NODES[cur.parentId];} result='closest("div") → '+NODES[chain[chain.length-1]].label; hlIds=[chain[chain.length-1]]; break; }
    case 'children': result = n.childIds.length ? n.childIds.map(c=>NODES[c].label).join(', ') : 'порожньо'; hlIds=n.childIds; break;
    case 'first':    result = n.childIds[0] ? NODES[n.childIds[0]].label : 'null'; hlIds=[n.childIds[0]]; break;
    case 'last':     result = n.childIds.at(-1) ? NODES[n.childIds.at(-1)].label : 'null'; hlIds=[n.childIds.at(-1)]; break;
    case 'prev': { const sibs=siblings(id); const i=NODES[n.parentId]?.childIds.indexOf(id)||0; result=i>0?NODES[sibs[i-1]]?.label||'—':'null'; hlIds=[i>0?NODES[n.parentId].childIds[i-1]:null]; break; }
    case 'next': { const pibs=NODES[n.parentId]?.childIds||[]; const j=pibs.indexOf(id); result=j>=0&&j<pibs.length-1?NODES[pibs[j+1]].label:'null'; hlIds=[j>=0&&j<pibs.length-1?pibs[j+1]:null]; break; }
    case 'matches': result = n.active ? 'true  (має клас .active)' : 'false (немає .active)'; hlIds=[id]; break;
    case 'contains': result = n.childIds.includes('n-card2')||n.childIds.some(c=>NODES[c]?.childIds?.includes('n-card2')) ? 'true  (card2 є нащадком)' : 'false (card2 не є нащадком)'; hlIds=[id,'n-card2']; break;
  }
  highlight(hlIds.filter(Boolean));
  document.getElementById('dom-out').textContent =
    \`Елемент: \${n.label}\nМетод:   .\${m}\n\nРезультат: \${result}\`;
}`,
    [
      { level:'easy',   uk:'Обери "main" → children. Потім "Card 1" → parentElement. Прослідкуй підсвітку в дереві.',  ru:'Выбери "main" → children. Затем "Card 1" → parentElement. Следи за подсветкой.' },
      { level:'medium', uk:'Обери "span.logo" → nextElementSibling. Потім "nav" → previousElementSibling. Чому результат "null" для першого/останнього?',  ru:'Выбери "span.logo" → nextElementSibling. Затем "nav" → prev. Почему "null" для первого/последнего?' },
      { level:'hard',   uk:'Напиши функцію getAllDescendants(el) яка рекурсивно збирає всіх нащадків елемента у плоский масив.',  ru:'Напиши getAllDescendants(el) которая рекурсивно собирает всех потомков в плоский массив.' },
    ]
  );

  /* ─── 05-02 ──────────────────────────────────────────────── */
  patch('05-02',
    { uk:`<h2>Делегування подій: один обробник для багатьох</h2>
<p>Замість додавати слухач до кожного елемента — додаємо один до батька. Нові елементи підхоплюються автоматично.</p>
<h3>Принцип</h3>
<pre>// ❌ Погано: N обробників для N кнопок
buttons.forEach(btn => btn.addEventListener('click', handler));

// ✅ Делегування: 1 обробник на батька
container.addEventListener('click', event => {
  const btn = event.target.closest('button');
  if (!btn) return;
  // обробляємо btn
});</pre>
<h3>event.target vs event.currentTarget</h3>
<pre>container.addEventListener('click', e => {
  e.target         // елемент на якому клікнули
  e.currentTarget  // елемент до якого прив'язаний listener (container)
  e.target.closest('.btn') // шукаємо відповідний предок
});</pre>
<h3>Переваги</h3>
<ul>
  <li>Менше пам'яті (1 listener замість N)</li>
  <li>Динамічні елементи — не треба повторно додавати listener</li>
  <li>Простіша логіка видалення</li>
</ul>`,
      ru:`<h2>Делегирование событий</h2>
<pre>// ❌ N обработчиков:
buttons.forEach(btn => btn.addEventListener('click', fn));

// ✅ Делегирование — 1 обработчик на родителе:
container.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if(!btn) return;
  // обрабатываем btn
});

// e.target — где кликнули
// e.currentTarget — где слушатель</pre>` },
    `<div class="deleg-lab">
  <h2>📣 Делегування подій</h2>

  <!-- Список задач (динамічне додавання) -->
  <div class="dl-section">
    <h3>Todo List (1 обробник на ul)</h3>
    <div class="dl-add">
      <input id="dl-input" placeholder="Нова задача..." style="flex:1">
      <button onclick="addTask()">+ Додати</button>
    </div>
    <ul id="dl-list" class="dl-list">
      <li data-id="1"><span class="task-text">Вивчити DOM</span><div class="task-btns"><button class="btn-done">✓</button><button class="btn-del">✕</button></div></li>
      <li data-id="2"><span class="task-text">Зробити проект</span><div class="task-btns"><button class="btn-done">✓</button><button class="btn-del">✕</button></div></li>
    </ul>
    <div class="dl-stats" id="dl-stats">Задач: 2 · Виконано: 0</div>
    <pre class="out" id="dl-log">Клікни на задачі →</pre>
  </div>

  <!-- Accordion (делегування на details) -->
  <div class="dl-section">
    <h3>Accordion (делегування на .accordion)</h3>
    <div class="accordion" id="accordion">
      <div class="ac-item">
        <div class="ac-header">🌐 Модуль 1: HTML5</div>
        <div class="ac-body">Семантика, форми, SVG, PWA — 10 уроків</div>
      </div>
      <div class="ac-item">
        <div class="ac-header">🎨 Модуль 2: CSS3</div>
        <div class="ac-body">Grid, Flexbox, Custom Properties, анімації — 12 уроків</div>
      </div>
      <div class="ac-item">
        <div class="ac-header">⚡ Модуль 4: JavaScript</div>
        <div class="ac-body">Closures, scope, масиви, RegExp, JSON — 15 уроків</div>
      </div>
    </div>
    <pre class="out" id="ac-log">Клікни на заголовки →</pre>
  </div>
</div>`,
    `${BASE}
.deleg-lab{max-width:520px}
.dl-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.dl-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.dl-add{display:flex;gap:6px;margin-bottom:8px}
.dl-list{list-style:none;display:flex;flex-direction:column;gap:4px;margin-bottom:8px}
.dl-list li{background:#0f172a;border-radius:8px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;transition:.2s;border:1px solid #1e293b}
.dl-list li.done{opacity:.5;text-decoration:line-through}
.task-text{font-size:13px;flex:1}
.task-btns{display:flex;gap:4px}
.task-btns button{padding:3px 8px;font-size:11px}
.btn-done{border-color:rgba(16,185,129,.4);color:#10b981}
.btn-done:hover{background:rgba(16,185,129,.15)}
.btn-del{border-color:rgba(239,68,68,.3);color:#ef4444}
.btn-del:hover{background:rgba(239,68,68,.1)}
.dl-stats{font-size:11px;color:#64748b;margin-bottom:6px;font-family:monospace}

.accordion{display:flex;flex-direction:column;gap:4px;margin-bottom:8px}
.ac-item{border:1px solid #334155;border-radius:8px;overflow:hidden}
.ac-header{padding:10px 14px;cursor:pointer;font-size:13px;font-weight:600;color:#f1f5f9;user-select:none;transition:.2s;display:flex;justify-content:space-between;align-items:center}
.ac-header::after{content:'▾';color:#64748b;transition:transform .25s}
.ac-item.open .ac-header{color:#3b82f6;background:rgba(59,130,246,.08)}
.ac-item.open .ac-header::after{transform:rotate(-180deg)}
.ac-body{max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s;font-size:13px;color:#94a3b8;padding:0 14px}
.ac-item.open .ac-body{max-height:80px;padding:8px 14px}`,
    `// ─── Todo List ───────────────────────────────────────────
let taskId = 3;
const list  = document.getElementById('dl-list');
const log   = document.getElementById('dl-log');

// Один делегований слухач на весь ul
list.addEventListener('click', e => {
  const li   = e.target.closest('li');
  if(!li) return;
  const isDone = e.target.closest('.btn-done');
  const isDel  = e.target.closest('.btn-del');
  const taskText = li.querySelector('.task-text').textContent;

  if(isDone) {
    li.classList.toggle('done');
    log.textContent = \`✓ Делегований click → btn-done\n  li[data-id="\${li.dataset.id}"] .task-text = "\${taskText}"\n  e.target = \${e.target.tagName}\n  e.currentTarget = UL\`;
  } else if(isDel) {
    li.remove();
    log.textContent = \`✕ Делегований click → btn-del\n  Видалено: "\${taskText}"\`;
  } else {
    li.classList.toggle('done');
    log.textContent = \`Click на: \${e.target.tagName}\n  Closest li знайдено → тогл done стану\`;
  }
  updateStats();
});

function addTask() {
  const text = document.getElementById('dl-input').value.trim();
  if(!text) return;
  const li = document.createElement('li');
  li.dataset.id = taskId++;
  li.innerHTML = \`<span class="task-text">\${text}</span><div class="task-btns"><button class="btn-done">✓</button><button class="btn-del">✕</button></div>\`;
  list.appendChild(li);
  document.getElementById('dl-input').value = '';
  log.textContent = \`+ Додано "\${text}"\n  Новий li автоматично підхоплено делегуванням!\`;
  updateStats();
}
document.getElementById('dl-input').addEventListener('keydown', e => e.key==='Enter' && addTask());

function updateStats() {
  const all  = list.querySelectorAll('li').length;
  const done = list.querySelectorAll('li.done').length;
  document.getElementById('dl-stats').textContent = \`Задач: \${all} · Виконано: \${done}\`;
}

// ─── Accordion ───────────────────────────────────────────
const acc    = document.getElementById('accordion');
const acLog  = document.getElementById('ac-log');

acc.addEventListener('click', e => {
  const header = e.target.closest('.ac-header');
  if(!header) return;
  const item = header.closest('.ac-item');
  // Закриваємо всі
  acc.querySelectorAll('.ac-item').forEach(i => { if(i!==item) i.classList.remove('open'); });
  item.classList.toggle('open');
  acLog.textContent = \`Делегований click на .accordion\n  e.target = \${e.target.className}\n  closest(.ac-header) = "\${header.textContent.trim()}"\n  item.classList: \${item.className}\`;
});`,
    [
      { level:'easy',   uk:'Додай 3 нові задачі і натисни ✓ і ✕. Поспостерігай у лозі — e.target і e.currentTarget.',  ru:'Добавь 3 задачи и нажми ✓ и ✕. Наблюдай в логе — e.target и e.currentTarget.' },
      { level:'medium', uk:'Клікни на тексті задачі (не на кнопці) — що відбувається? Знайди у коді closest("li") і поясни навіщо він тут.',  ru:'Кликни на тексте задачи (не на кнопке) — что происходит? Найди closest("li") в коде.' },
      { level:'hard',   uk:'Розширш: клік на тексті задачі дозволяє inline-редагування через contenteditable. Після "Enter" — зберігає зміни.',  ru:'Добавь: клик на тексте задачи — inline-редактирование через contenteditable. Enter — сохранение.' },
    ]
  );

  /* ─── 05-03 ──────────────────────────────────────────────── */
  patch('05-03',
    { uk:`<h2>MutationObserver: спостерігаємо за змінами DOM</h2>
<pre>const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log(mutation.type);        // 'childList' | 'attributes' | 'characterData'
    console.log(mutation.target);      // змінений елемент
    console.log(mutation.addedNodes);  // додані вузли
    console.log(mutation.removedNodes);// видалені вузли
    console.log(mutation.attributeName); // для type:'attributes'
  });
});

observer.observe(targetElement, {
  childList:     true,  // додавання / видалення дітей
  attributes:    true,  // зміна атрибутів
  characterData: true,  // зміна тексту
  subtree:       true,  // спостерігати рекурсивно
  attributeOldValue: true, // зберігати старе значення атрибуту
});

observer.disconnect(); // зупинити</pre>
<h3>Практичні застосування</h3>
<ul>
  <li>Відстеження динамічних змін без polling</li>
  <li>Lazy-initialization компонентів</li>
  <li>Автозбереження форм при зміні</li>
  <li>Infinite scroll detection</li>
</ul>`,
      ru:`<h2>MutationObserver</h2>
<pre>const observer = new MutationObserver(mutations => {
  mutations.forEach(m => {
    console.log(m.type);         // childList | attributes | characterData
    console.log(m.addedNodes);
    console.log(m.attributeName);
  });
});

observer.observe(el, {
  childList:  true,
  attributes: true,
  subtree:    true,
});</pre>` },
    `<div class="mo-lab">
  <h2>👁 MutationObserver</h2>

  <!-- Цільовий елемент для спостереження -->
  <div class="mo-target-wrap">
    <h3>Цільовий елемент</h3>
    <div class="mo-target" id="mo-target">
      <div class="mo-item" id="mi-1">🔵 Item 1</div>
      <div class="mo-item" id="mi-2">🟢 Item 2</div>
    </div>
  </div>

  <!-- Дії -->
  <div class="mo-actions">
    <h3>Дії (спостерігаємо)</h3>
    <div class="ma-btns">
      <button onclick="moAdd()">+ Додати елемент</button>
      <button onclick="moRemove()">– Видалити останній</button>
      <button onclick="moChangeAttr()">Змінити клас</button>
      <button onclick="moChangeText()">Змінити текст</button>
    </div>
  </div>

  <!-- Налаштування observer -->
  <div class="mo-config">
    <h3>Конфігурація</h3>
    <label><input type="checkbox" id="mo-childList" checked> childList</label>
    <label><input type="checkbox" id="mo-attributes" checked> attributes</label>
    <label><input type="checkbox" id="mo-subtree" checked> subtree</label>
    <button onclick="rebuildObserver()">Перебудувати</button>
    <button onclick="stopObserver()" id="stop-btn">⏹ Stop</button>
  </div>

  <!-- Лог мутацій -->
  <div class="mo-log-wrap">
    <h3>Лог мутацій <span id="mo-count">(0)</span></h3>
    <div class="mo-log" id="mo-log"></div>
  </div>
</div>`,
    `${BASE}
.mo-lab{max-width:520px}
.mo-target-wrap,.mo-actions,.mo-config{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.mo-target-wrap h3,.mo-actions h3,.mo-config h3,.mo-log-wrap h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.mo-target{display:flex;flex-wrap:wrap;gap:6px;min-height:50px;border:1px dashed #334155;border-radius:8px;padding:8px;background:#0f172a}
.mo-item{padding:6px 12px;border-radius:6px;font-size:12px;font-weight:700;background:#1e293b;border:1px solid #334155;transition:.2s}
.mo-item.highlighted{border-color:#f59e0b;background:rgba(245,158,11,.1)}

.ma-btns{display:flex;flex-wrap:wrap;gap:5px}
.ma-btns button{padding:6px 10px;font-size:11px}

.mo-config{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.mo-config label{display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;cursor:pointer}
.mo-config input[type=checkbox]{accent-color:#3b82f6}

.mo-log-wrap{background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:12px}
.mo-log-wrap h3 span{color:#3b82f6;font-size:11px;font-family:monospace;font-weight:400}
.mo-log{display:flex;flex-direction:column;gap:4px;max-height:180px;overflow-y:auto}
.ml-entry{font-size:11px;font-family:monospace;padding:6px 10px;border-radius:6px;line-height:1.5}
.ml-childList{background:rgba(59,130,246,.1);color:#7dd3fc;border-left:2px solid #3b82f6}
.ml-attributes{background:rgba(245,158,11,.1);color:#fcd34d;border-left:2px solid #f59e0b}
.ml-characterData{background:rgba(16,185,129,.1);color:#6ee7b7;border-left:2px solid #10b981}`,
    `let observer = null;
let mutCount = 0;
let itemN = 3;

function logMutation(type, text) {
  mutCount++;
  document.getElementById('mo-count').textContent = \`(\${mutCount})\`;
  const log  = document.getElementById('mo-log');
  const div  = document.createElement('div');
  div.className = 'ml-entry ml-' + type;
  div.textContent = \`#\${mutCount} [\${type}] \${text}\`;
  log.prepend(div);
}

function buildObserver() {
  if(observer) observer.disconnect();
  const cfg = {
    childList:  document.getElementById('mo-childList').checked,
    attributes: document.getElementById('mo-attributes').checked,
    subtree:    document.getElementById('mo-subtree').checked,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
  };
  observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if(m.type==='childList') {
        m.addedNodes.forEach(n => { if(n.nodeType===1) logMutation('childList',\`Додано: \${n.textContent.trim()}\`); });
        m.removedNodes.forEach(n => { if(n.nodeType===1) logMutation('childList',\`Видалено: \${n.textContent.trim()}\`); });
      } else if(m.type==='attributes') {
        logMutation('attributes',\`\${m.target.id||'el'}.class: "\${m.oldValue}" → "\${m.target.className}"\`);
      } else if(m.type==='characterData') {
        logMutation('characterData',\`Текст змінено: "\${m.oldValue}" → "\${m.target.textContent}"\`);
      }
    });
  });
  observer.observe(document.getElementById('mo-target'), cfg);
  document.getElementById('stop-btn').textContent = '⏹ Stop';
}

function rebuildObserver() { buildObserver(); }
function stopObserver() {
  if(observer) { observer.disconnect(); observer=null; }
  document.getElementById('stop-btn').textContent = '▶ Resume';
}

const EMOJIS = ['🔵','🟢','🟡','🔴','🟣','⚪'];
function moAdd() {
  const el = document.createElement('div');
  el.className = 'mo-item';
  el.id = 'mi-' + itemN;
  el.textContent = EMOJIS[itemN%EMOJIS.length] + ' Item ' + itemN++;
  document.getElementById('mo-target').appendChild(el);
}
function moRemove() {
  const items = document.getElementById('mo-target').querySelectorAll('.mo-item');
  if(items.length) items[items.length-1].remove();
}
function moChangeAttr() {
  const items = document.getElementById('mo-target').querySelectorAll('.mo-item');
  if(!items.length) return;
  items[0].classList.toggle('highlighted');
}
function moChangeText() {
  const items = document.getElementById('mo-target').querySelectorAll('.mo-item');
  if(!items.length) return;
  const el = items[Math.floor(Math.random()*items.length)];
  // змінюємо textContent дочірнього TextNode
  el.textContent = el.textContent + '!';
}

buildObserver();`,
    [
      { level:'easy',   uk:'Натисни "+ Додати", "– Видалити", "Змінити клас" — спостерігай лог мутацій. Кольори: синій/жовтий/зелений.',  ru:'Нажми "+ Добавить", "Удалить", "Изменить класс" — наблюдай лог. Цвета: синий/жёлтый/зелёный.' },
      { level:'medium', uk:'Вимкни "childList" → Перебудувати → натисни "+ Додати". Чому лог не реагує? Поясни роль кожного флагу.',  ru:'Отключи "childList" → Перебудувати → "+ Добавить". Почему лог не реагирует?' },
      { level:'hard',   uk:'Напиши autosave(formEl) яка використовує MutationObserver + input events щоб зберігати дані форми в localStorage при кожній зміні.',  ru:'Напиши autosave(formEl) которая использует MutationObserver + input events для автосохранения в localStorage.' },
    ]
  );

  /* ─── 05-04 ──────────────────────────────────────────────── */
  patch('05-04',
    { uk:`<h2>Drag and Drop API</h2>
<pre>// Елемент можна тягнути:
el.draggable = true;

// Події на елементі, що тягнеться:
el.addEventListener('dragstart', e => {
  e.dataTransfer.setData('text/plain', el.id);
  e.dataTransfer.effectAllowed = 'move';
});
el.addEventListener('dragend', e => { ... });

// Події на зоні скидання:
zone.addEventListener('dragover', e => {
  e.preventDefault(); // обов'язково!
  e.dataTransfer.dropEffect = 'move';
});
zone.addEventListener('dragenter', e => { zone.classList.add('drag-over'); });
zone.addEventListener('dragleave', e => { zone.classList.remove('drag-over'); });
zone.addEventListener('drop', e => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const el = document.getElementById(id);
  zone.appendChild(el);
});</pre>`,
      ru:`<h2>Drag and Drop API</h2>
<pre>el.draggable = true;

// На элементе:
el.addEventListener('dragstart', e => {
  e.dataTransfer.setData('text/plain', el.id);
});

// На зоне:
zone.addEventListener('dragover', e => e.preventDefault());
zone.addEventListener('drop', e => {
  const id = e.dataTransfer.getData('text/plain');
  zone.appendChild(document.getElementById(id));
});</pre>` },
    `<div class="dnd-lab">
  <h2>🖱 Drag & Drop</h2>

  <!-- Основна сортувальна зона -->
  <div class="dnd-sort-section">
    <h3>Сортування списку (DnD)</h3>
    <ul class="sort-list" id="sort-list">
      <li draggable="true" data-id="1">🎨 CSS Анімації</li>
      <li draggable="true" data-id="2">⚡ JavaScript Основи</li>
      <li draggable="true" data-id="3">🖱 DOM Інтерактивність</li>
      <li draggable="true" data-id="4">📱 Адаптивний дизайн</li>
      <li draggable="true" data-id="5">🚀 ES6+ Модулі</li>
    </ul>
    <pre class="out" id="sort-log">Тягни елементи щоб сортувати →</pre>
  </div>

  <!-- Kanban міні -->
  <div class="dnd-kanban-section">
    <h3>Kanban (кілька зон)</h3>
    <div class="kanban" id="kanban">
      <div class="kanban-col" data-col="todo">
        <div class="kc-header">📋 Todo</div>
        <div class="kc-body" id="col-todo">
          <div class="k-card" draggable="true" id="kc1">Зробити лабу</div>
          <div class="k-card" draggable="true" id="kc2">Прочитати теорію</div>
        </div>
      </div>
      <div class="kanban-col" data-col="doing">
        <div class="kc-header">⚡ Doing</div>
        <div class="kc-body" id="col-doing">
          <div class="k-card" draggable="true" id="kc3">Пишу код</div>
        </div>
      </div>
      <div class="kanban-col" data-col="done">
        <div class="kc-header">✅ Done</div>
        <div class="kc-body" id="col-done">
          <div class="k-card" draggable="true" id="kc4">Теорія вивчена</div>
        </div>
      </div>
    </div>
    <pre class="out" id="kanban-log">Тягни картки між колонками →</pre>
  </div>
</div>`,
    `${BASE}
.dnd-lab{max-width:520px}
.dnd-sort-section,.dnd-kanban-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.dnd-sort-section h3,.dnd-kanban-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}

.sort-list{list-style:none;display:flex;flex-direction:column;gap:4px;margin-bottom:8px}
.sort-list li{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px 14px;cursor:grab;font-size:13px;user-select:none;transition:.2s}
.sort-list li:active{cursor:grabbing}
.sort-list li.dragging{opacity:.4;border-style:dashed}
.sort-list li.drag-over{border-color:#3b82f6;background:rgba(59,130,246,.1)}

.kanban{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:8px}
.kanban-col{background:#0f172a;border-radius:8px;overflow:hidden}
.kc-header{padding:8px 10px;font-size:11px;font-weight:700;text-transform:uppercase;background:#1e293b;letter-spacing:.04em}
.kc-body{padding:6px;min-height:60px;display:flex;flex-direction:column;gap:4px;transition:.2s}
.kc-body.drag-over{background:rgba(59,130,246,.1);border:1px dashed #3b82f6}
.k-card{background:#1e293b;border:1px solid #334155;border-radius:6px;padding:8px;font-size:12px;cursor:grab;user-select:none;transition:.2s}
.k-card:active{cursor:grabbing}
.k-card.dragging{opacity:.4}`,
    `// ─── Sort List ──────────────────────────────────────────
const sortList = document.getElementById('sort-list');
let dragItem = null;

sortList.addEventListener('dragstart', e => {
  dragItem = e.target.closest('li');
  if(!dragItem) return;
  dragItem.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  document.getElementById('sort-log').textContent =
    \`dragstart: "\${dragItem.textContent.trim()}"\`;
});
sortList.addEventListener('dragend', () => {
  if(dragItem) dragItem.classList.remove('dragging');
  sortList.querySelectorAll('li').forEach(li => li.classList.remove('drag-over'));
  document.getElementById('sort-log').textContent =
    'Порядок: ' + [...sortList.querySelectorAll('li')].map(li=>li.textContent.trim()).join(' → ');
  dragItem = null;
});
sortList.addEventListener('dragover', e => {
  e.preventDefault();
  const over = e.target.closest('li');
  if(!over || over===dragItem) return;
  sortList.querySelectorAll('li').forEach(li=>li.classList.remove('drag-over'));
  over.classList.add('drag-over');
  const bounding = over.getBoundingClientRect();
  const offset   = e.clientY - bounding.top;
  if(offset > bounding.height/2) {
    sortList.insertBefore(dragItem, over.nextSibling);
  } else {
    sortList.insertBefore(dragItem, over);
  }
});

// ─── Kanban ─────────────────────────────────────────────
let dragCard = null;

document.getElementById('kanban').addEventListener('dragstart', e => {
  dragCard = e.target.closest('.k-card');
  if(dragCard) { dragCard.classList.add('dragging'); e.dataTransfer.effectAllowed='move'; }
});
document.getElementById('kanban').addEventListener('dragend', () => {
  if(dragCard) dragCard.classList.remove('dragging');
  document.querySelectorAll('.kc-body').forEach(b=>b.classList.remove('drag-over'));
  dragCard = null;
});
document.querySelectorAll('.kc-body').forEach(body => {
  body.addEventListener('dragover', e => { e.preventDefault(); body.classList.add('drag-over'); });
  body.addEventListener('dragleave', () => body.classList.remove('drag-over'));
  body.addEventListener('drop', e => {
    e.preventDefault();
    body.classList.remove('drag-over');
    if(dragCard) {
      body.appendChild(dragCard);
      const col = body.closest('.kanban-col').dataset.col;
      document.getElementById('kanban-log').textContent =
        \`drop: "\${dragCard.textContent}" → колонка "\${col}"\`;
    }
  });
});`,
    [
      { level:'easy',   uk:'Перетягни елементи списку — зміни порядок. Перетягни картки між колонками Kanban.',  ru:'Перетяни элементы списка — измени порядок. Перетяни карточки между колонками Kanban.' },
      { level:'medium', uk:'Знайди у коді де використовується insertBefore — поясни різницю offset > height/2 для визначення позиції вставки.',  ru:'Найди insertBefore в коде — объясни зачем offset > height/2 для определения позиции вставки.' },
      { level:'hard',   uk:'Додай кнопку "+ Картка" в кожну колонку Kanban і зберігай стан дошки у localStorage.',  ru:'Добавь кнопку "+ Карточка" в каждую колонку и сохраняй состояние доски в localStorage.' },
    ]
  );

  /* ─── 05-05 ──────────────────────────────────────────────── */
  patch('05-05',
    { uk:`<h2>Clipboard API: copy та paste</h2>
<pre>// Сучасний async API (вимагає HTTPS або localhost):
await navigator.clipboard.writeText('Hello!');
const text = await navigator.clipboard.readText();

// Копіювання HTML:
await navigator.clipboard.write([
  new ClipboardItem({
    'text/plain': new Blob(['Hello'], { type:'text/plain' }),
    'text/html':  new Blob(['<b>Hello</b>'], { type:'text/html' }),
  })
]);</pre>
<h3>Fallback (document.execCommand)</h3>
<pre>// Для старих браузерів:
function copyLegacy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy'); // застаріло, але підтримується
  document.body.removeChild(el);
}</pre>
<h3>Clipboard events</h3>
<pre>document.addEventListener('copy',  e => {
  e.clipboardData.setData('text/plain', 'intercepted!');
  e.preventDefault();
});
document.addEventListener('paste', e => {
  const text = e.clipboardData.getData('text/plain');
});</pre>`,
      ru:`<h2>Clipboard API</h2>
<pre>// Async API:
await navigator.clipboard.writeText('Hello');
const text = await navigator.clipboard.readText();

// Fallback:
function copyLegacy(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  el.remove();
}

// Events:
document.addEventListener('copy', e => {
  e.clipboardData.setData('text/plain', 'intercepted!');
  e.preventDefault();
});</pre>` },
    `<div class="clip-lab">
  <h2>📋 Clipboard API</h2>

  <!-- Copy demo -->
  <div class="clip-section">
    <h3>Copy Text</h3>
    <div class="copy-items" id="copy-items">
      <div class="copy-item">
        <span class="ci-text">console.log('Hello, World!');</span>
        <button class="copy-btn" data-text="console.log('Hello, World!');">📋 Copy</button>
      </div>
      <div class="copy-item">
        <span class="ci-text">npm install vite --save-dev</span>
        <button class="copy-btn" data-text="npm install vite --save-dev">📋 Copy</button>
      </div>
      <div class="copy-item">
        <span class="ci-text">git push origin main</span>
        <button class="copy-btn" data-text="git push origin main">📋 Copy</button>
      </div>
    </div>
    <div class="custom-copy">
      <input id="custom-text" value="Свій текст для копіювання" style="flex:1">
      <button onclick="copyCustom()">📋 Copy Custom</button>
    </div>
    <pre class="out" id="copy-log">—</pre>
  </div>

  <!-- Paste demo -->
  <div class="clip-section">
    <h3>Paste Text</h3>
    <textarea id="paste-zone" rows="3" placeholder="Встав текст тут (Ctrl+V) або натисни кнопку..." style="width:100%"></textarea>
    <div style="display:flex;gap:6px;margin-top:6px">
      <button onclick="pasteFromClipboard()">📥 Paste</button>
      <button onclick="clearPaste()">✕ Очистити</button>
    </div>
    <pre class="out" id="paste-log">—</pre>
  </div>

  <!-- Clipboard interceptor -->
  <div class="clip-section">
    <h3>Copy Interceptor</h3>
    <label>
      <input type="checkbox" id="intercept-toggle" onchange="toggleIntercept()">
      Перехопити копіювання (додати підпис)
    </label>
    <div class="intercept-hint">Виділи текст на сторінці і натисни Ctrl+C</div>
    <pre class="out" id="intercept-log">—</pre>
  </div>
</div>`,
    `${BASE}
.clip-lab{max-width:520px}
.clip-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.clip-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.copy-items{display:flex;flex-direction:column;gap:5px;margin-bottom:8px}
.copy-item{background:#0f172a;border-radius:8px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px}
.ci-text{font-size:12px;font-family:monospace;color:#94a3b8;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.copy-btn{padding:4px 10px;font-size:11px;min-width:70px}
.copy-btn.copied{border-color:#10b981;color:#10b981;background:rgba(16,185,129,.1)}
.custom-copy{display:flex;gap:6px;margin-bottom:8px}
.clip-section label{display:flex;align-items:center;gap:6px;font-size:12px;color:#64748b;cursor:pointer;margin-bottom:8px}
.clip-section input[type=checkbox]{accent-color:#3b82f6}
.intercept-hint{font-size:11px;color:#475569;padding:6px 10px;background:#0f172a;border-radius:6px;margin-bottom:8px}`,
    `async function copyText(text, btn) {
  try {
    if(navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove();
    }
    if(btn) {
      const orig = btn.textContent;
      btn.textContent = '✅ Copied!';
      btn.classList.add('copied');
      setTimeout(()=>{ btn.textContent=orig; btn.classList.remove('copied'); },1500);
    }
    document.getElementById('copy-log').textContent =
      \`✅ Скопійовано (API: \${navigator.clipboard?'async Clipboard API':'fallback execCommand'})\n"\${text.slice(0,60)}\${text.length>60?'...':''}"\`;
  } catch(e) {
    document.getElementById('copy-log').textContent = '❌ ' + e.message;
  }
}

// Делегований обробник для .copy-btn
document.getElementById('copy-items').addEventListener('click', e => {
  const btn = e.target.closest('.copy-btn');
  if(btn) copyText(btn.dataset.text, btn);
});

function copyCustom() {
  const text = document.getElementById('custom-text').value;
  copyText(text, null);
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    const zone = document.getElementById('paste-zone');
    zone.value = text;
    document.getElementById('paste-log').textContent =
      \`✅ Прочитано з буфера: \${text.length} символів\n"\${text.slice(0,100)}"\`;
  } catch(e) {
    document.getElementById('paste-log').textContent =
      '⚠️ ' + e.message + '\n(Дозвіл на читання буфера вимагає жест користувача або HTTPS)';
  }
}
function clearPaste() { document.getElementById('paste-zone').value=''; }

document.getElementById('paste-zone').addEventListener('paste', e => {
  const text = e.clipboardData.getData('text/plain');
  document.getElementById('paste-log').textContent =
    \`paste event:\nДані: "\${text.slice(0,80)}"\ntypes: [\${[...e.clipboardData.types].join(', ')}]\`;
});

// Interceptor
let interceptActive = false;
function toggleIntercept() {
  interceptActive = document.getElementById('intercept-toggle').checked;
  document.getElementById('intercept-log').textContent =
    interceptActive ? '✅ Перехоплення активне — виділи текст та Ctrl+C' : '⏹ Вимкнено';
}
document.addEventListener('copy', e => {
  if(!interceptActive) return;
  const sel = window.getSelection()?.toString()||'';
  if(sel) {
    e.clipboardData.setData('text/plain', sel + '\n\n— WebCraft Academy © 2025');
    e.preventDefault();
    document.getElementById('intercept-log').textContent =
      \`✂️ Перехоплено:\nОригінал: "\${sel}"\nМодифіковано: + підпис "WebCraft Academy"\`;
  }
});`,
    [
      { level:'easy',   uk:'Натисни "📋 Copy" для console.log — потім встав у поле Paste. Поспостерігай лог.',  ru:'Нажми "📋 Copy" для console.log — вставь в поле Paste. Наблюдай лог.' },
      { level:'medium', uk:'Увімкни "Copy Interceptor" → виділи текст на сторінці → Ctrl+C → вклей кудись. Що додалось? Поясни як це працює через e.preventDefault().',  ru:'Включи "Interceptor" → выдели текст → Ctrl+C → вставь. Что добавилось? Объясни через e.preventDefault().' },
      { level:'hard',   uk:'Реалізуй copyRich(html, text) яка копіює і text/plain і text/html через ClipboardItem.',  ru:'Реализуй copyRich(html, text) которая копирует и text/plain и text/html через ClipboardItem.' },
    ]
  );

  /* ─── 05-06 ──────────────────────────────────────────────── */
  patch('05-06',
    { uk:`<h2>Keyboard events: keydown, keyup, комбінації клавіш</h2>
<pre>document.addEventListener('keydown', e => {
  e.key         // "Enter", "ArrowLeft", "a", "A"
  e.code        // "KeyA", "ArrowLeft", "Space" — незалежно від мови!
  e.keyCode     // 65 (застаріло)
  e.ctrlKey     // true якщо Ctrl натиснуто
  e.shiftKey    // true якщо Shift
  e.altKey      // true якщо Alt
  e.metaKey     // true якщо Cmd (Mac)
  e.repeat      // true якщо тримаємо клавішу
  e.preventDefault() // блокує дефолтну дію (напр. submit)
});

// keydown — при натисненні (повторюється при утриманні)
// keyup   — при відпусканні (один раз)
// keypress — застаріло, не використовувати!</pre>
<h3>Гарячі клавіші (hotkeys)</h3>
<pre>document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault(); // заборонити збереження сторінки
    save();
  }
  if (e.key === 'Escape') closeModal();
  if (e.code === 'Space') togglePlayback();
});</pre>`,
      ru:`<h2>Keyboard events</h2>
<pre>document.addEventListener('keydown', e => {
  e.key      // "Enter", "ArrowLeft", "a"
  e.code     // "KeyA", "Space" — физическая клавиша
  e.ctrlKey  // Ctrl нажат?
  e.shiftKey // Shift?
  e.altKey   // Alt?
  e.repeat   // удерживается?
});

// Горячая клавиша:
if(e.ctrlKey && e.key === 's') {
  e.preventDefault();
  save();
}</pre>` },
    `<div class="kbd-lab">
  <h2>⌨️ Keyboard Lab</h2>

  <!-- Клавіатурна подія live -->
  <div class="kbd-section">
    <h3>Live Key Inspector</h3>
    <div class="kbd-target-hint">Клікни тут і натискай клавіші →</div>
    <div class="kbd-target" id="kbd-target" tabindex="0">
      <div class="kt-placeholder" id="kt-ph">Клікни і натисни будь-яку клавішу</div>
      <div class="kt-display" id="kt-display" style="display:none">
        <div class="kt-key" id="kt-key">—</div>
        <div class="kt-details" id="kt-details"></div>
      </div>
    </div>
  </div>

  <!-- Hotkey реєстратор -->
  <div class="kbd-section">
    <h3>Hotkey Manager</h3>
    <div class="hk-list" id="hk-list">
      <div class="hk-item" data-action="save">
        <div class="hk-action">💾 Зберегти</div>
        <div class="hk-combo" id="hk-save">Ctrl+S</div>
      </div>
      <div class="hk-item" data-action="new">
        <div class="hk-action">📄 Новий файл</div>
        <div class="hk-combo" id="hk-new">Ctrl+N</div>
      </div>
      <div class="hk-item" data-action="search">
        <div class="hk-action">🔍 Пошук</div>
        <div class="hk-combo" id="hk-search">Ctrl+F</div>
      </div>
      <div class="hk-item" data-action="close">
        <div class="hk-action">✕ Закрити</div>
        <div class="hk-combo" id="hk-close">Escape</div>
      </div>
    </div>
    <pre class="out" id="hk-log">Натисни Ctrl+S, Ctrl+N, Ctrl+F або Escape →</pre>
  </div>

  <!-- Геймпад (стрілки) -->
  <div class="kbd-section">
    <h3>Arrow Keys Game</h3>
    <div class="game-field" id="game-field">
      <div class="game-player" id="game-player">🚀</div>
    </div>
    <div class="game-info">WASD або ↑←↓→ для руху · <span id="game-pos">x:80, y:80</span></div>
  </div>
</div>`,
    `${BASE}
.kbd-lab{max-width:520px}
.kbd-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.kbd-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}
.kbd-target-hint{font-size:11px;color:#475569;margin-bottom:6px}
.kbd-target{min-height:80px;background:#0f172a;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;border:1px solid #1e293b;transition:.2s;outline:none}
.kbd-target:focus{border-color:#3b82f6}
.kt-placeholder{font-size:12px;color:#334155}
.kt-display{text-align:center}
.kt-key{font-size:32px;font-weight:900;font-family:monospace;color:#f1f5f9;background:#1e293b;border-radius:10px;padding:8px 20px;display:inline-block;margin-bottom:8px;border:1px solid #334155}
.kt-details{display:flex;flex-wrap:wrap;gap:5px;justify-content:center}
.kd-chip{padding:3px 10px;border-radius:5px;font-size:11px;font-family:monospace;background:#0f172a;border:1px solid #334155;color:#64748b}
.kd-chip.active{border-color:#3b82f6;color:#7dd3fc}

.hk-list{display:flex;flex-direction:column;gap:4px;margin-bottom:8px}
.hk-item{background:#0f172a;border-radius:8px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;transition:.2s}
.hk-item.triggered{background:rgba(59,130,246,.15);border:1px solid #3b82f6}
.hk-action{font-size:12px;color:#94a3b8}
.hk-combo{font-size:12px;font-family:monospace;background:#1e293b;border:1px solid #334155;border-radius:5px;padding:2px 8px;color:#f1f5f9}

.game-field{height:120px;background:#050b1a;border-radius:8px;position:relative;overflow:hidden;margin-bottom:6px;border:1px solid #1e293b}
.game-player{position:absolute;font-size:22px;line-height:1;transition:transform .05s;will-change:transform}
.game-info{font-size:11px;color:#475569}`,
    `// Key Inspector
const target = document.getElementById('kbd-target');
target.addEventListener('keydown', e => {
  document.getElementById('kt-ph').style.display = 'none';
  document.getElementById('kt-display').style.display = 'block';
  document.getElementById('kt-key').textContent = e.key === ' ' ? 'Space' : e.key;
  const chips = [
    ['key', e.key],
    ['code', e.code],
    ['Ctrl', e.ctrlKey],
    ['Shift', e.shiftKey],
    ['Alt', e.altKey],
    ['repeat', e.repeat],
  ].map(([k,v]) => \`<span class="kd-chip\${v===true?' active':v===false?' dim':''}">\${k}: \${v}</span>\`).join('');
  document.getElementById('kt-details').innerHTML = chips;
  if(['Tab','Space','ArrowUp','ArrowDown'].includes(e.key)) e.preventDefault();
});
target.addEventListener('click', () => target.focus());

// Hotkey manager
const HOTKEYS = {
  'Ctrl+s': 'save', 'Ctrl+n': 'new', 'Ctrl+f': 'search', 'Escape': 'close',
};
const ACTIONS = {
  save:   '💾 Збережено!',
  new:    '📄 Новий файл відкрито',
  search: '🔍 Відкрито пошук',
  close:  '✕ Закрито',
};

document.addEventListener('keydown', e => {
  const combo = (e.ctrlKey?'Ctrl+':'') + (e.shiftKey?'Shift+':'') + e.key.toLowerCase();
  const action = HOTKEYS[combo];
  if(action) {
    e.preventDefault();
    document.querySelectorAll('.hk-item').forEach(i=>i.classList.remove('triggered'));
    const item = document.querySelector(\`[data-action="\${action}"]\`);
    if(item) { item.classList.add('triggered'); setTimeout(()=>item.classList.remove('triggered'),600); }
    document.getElementById('hk-log').textContent =
      \`⌨️ Combo: "\${combo}"\nДія: \${ACTIONS[action]}\`;
  }
});

// Arrow game
let px = 80, py = 80;
const player = document.getElementById('game-player');
const field  = document.getElementById('game-field');
const STEP = 8;

function updatePlayer() {
  player.style.left = px + 'px';
  player.style.top  = py + 'px';
  document.getElementById('game-pos').textContent = \`x:\${px}, y:\${py}\`;
}
updatePlayer();

document.addEventListener('keydown', e => {
  const moves = { ArrowUp:[-0,STEP,-1,0], ArrowDown:[0,STEP,1,0], ArrowLeft:[STEP,0,0,-1], ArrowRight:[STEP,0,0,1], w:[-0,STEP,-1,0], s:[0,STEP,1,0], a:[STEP,0,0,-1], d:[STEP,0,0,1] };
  const mv = moves[e.key];
  if(mv) {
    e.preventDefault();
    py = Math.max(0, Math.min(field.clientHeight-30, py + mv[2]*mv[1]));
    px = Math.max(0, Math.min(field.clientWidth-30,  px + mv[3]*mv[0]));
    updatePlayer();
  }
});`,
    [
      { level:'easy',   uk:'Клікни на "Live Key Inspector" і натискай різні клавіші — поспостерігай за e.key і e.code. Чим відрізняється "a" від "A"?',  ru:'Кликни на "Live Key Inspector" и нажимай клавиши — наблюдай e.key и e.code. Чем "a" отличается от "A"?' },
      { level:'medium', uk:'Натисни Ctrl+S — що відбувається? Знайди в коді e.preventDefault() і поясни навіщо він у гарячих клавішах.',  ru:'Нажми Ctrl+S — что происходит? Найди e.preventDefault() в коде — зачем он?' },
      { level:'hard',   uk:'Додай hotkey "Ctrl+Z" → "Undo" та "Ctrl+Y" → "Redo" до Hotkey Manager.',  ru:'Добавь hotkey "Ctrl+Z" → "Undo" и "Ctrl+Y" → "Redo" в Hotkey Manager.' },
    ]
  );

  /* ─── 05-07 ──────────────────────────────────────────────── */
  patch('05-07',
    { uk:`<h2>Touch events: swipe та жести на мобільному</h2>
<pre>// Основні touch-події:
el.addEventListener('touchstart', e => {
  const touch = e.touches[0];  // перший палець
  touch.clientX  // X відносно viewport
  touch.clientY  // Y відносно viewport
});
el.addEventListener('touchmove',  e => { e.preventDefault(); /* зупинити скрол */ });
el.addEventListener('touchend',   e => { /* e.changedTouches[0] — палець що відпустили */ });
el.addEventListener('touchcancel',e => { /* переривання (напр. дзвінок) */ });

// e.touches        — всі пальці на екрані
// e.targetTouches  — пальці на цьому елементі
// e.changedTouches — пальці що змінились (touchend)</pre>
<h3>Swipe detection</h3>
<pre>let startX, startY;
el.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
el.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 50)  onSwipeRight();
    if (dx < -50) onSwipeLeft();
  } else {
    if (dy > 50)  onSwipeDown();
    if (dy < -50) onSwipeUp();
  }
});</pre>`,
      ru:`<h2>Touch events</h2>
<pre>el.addEventListener('touchstart', e => {
  const t = e.touches[0];
  startX = t.clientX;
  startY = t.clientY;
});
el.addEventListener('touchend', e => {
  const t = e.changedTouches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;
  if(Math.abs(dx) > 50)
    dx > 0 ? onSwipeRight() : onSwipeLeft();
});</pre>` },
    `<div class="touch-lab">
  <h2>👆 Touch Events Lab</h2>

  <!-- Swipe detector -->
  <div class="touch-section">
    <h3>Swipe Detector</h3>
    <div class="swipe-area" id="swipe-area">
      <div class="sa-content" id="sa-content">
        <div class="sa-card active" data-idx="0">🌐 HTML5 Семантика</div>
        <div class="sa-card" data-idx="1">🎨 CSS Анімації</div>
        <div class="sa-card" data-idx="2">⚡ JavaScript</div>
        <div class="sa-card" data-idx="3">📱 Адаптивний дизайн</div>
      </div>
      <div class="sa-dots" id="sa-dots"></div>
      <div class="sa-hint">← свайп →</div>
    </div>
    <pre class="out" id="swipe-log">Свайпай або використовуй мишу →</pre>
  </div>

  <!-- Pinch to zoom симулятор (mouse) -->
  <div class="touch-section">
    <h3>Multi-touch / Pinch (симуляція мишею)</h3>
    <div class="pinch-area" id="pinch-area">
      <div class="pinch-el" id="pinch-el">🌍</div>
    </div>
    <div class="pinch-controls">
      <button onclick="pinchZoom(-0.2)">🔍− Zoom Out</button>
      <button onclick="pinchZoom(0.2)">🔍+ Zoom In</button>
      <button onclick="pinchReset()">↺ Reset</button>
      <span id="pinch-scale">scale: 1.0</span>
    </div>
  </div>

  <!-- Touch info -->
  <div class="touch-section">
    <h3>Touch Point Inspector</h3>
    <div class="tp-area" id="tp-area">
      <div class="tp-hint">Торкнись (або рухай миш з кнопкою) →</div>
    </div>
    <pre class="out" id="tp-log">—</pre>
  </div>
</div>`,
    `${BASE}
.touch-lab{max-width:520px}
.touch-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.touch-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}

.swipe-area{background:#0f172a;border-radius:10px;overflow:hidden;position:relative;height:100px;cursor:grab;border:1px solid #1e293b}
.swipe-area:active{cursor:grabbing}
.sa-content{display:flex;height:80px;transition:transform .3s cubic-bezier(.4,0,.2,1)}
.sa-card{min-width:100%;height:80px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#64748b;transition:.3s}
.sa-card.active{color:#f1f5f9}
.sa-dots{position:absolute;bottom:4px;left:50%;transform:translateX(-50%);display:flex;gap:4px}
.sd-dot{width:6px;height:6px;border-radius:50%;background:#334155;transition:.25s}
.sd-dot.active{background:#3b82f6}
.sa-hint{position:absolute;bottom:4px;right:10px;font-size:10px;color:#334155}

.pinch-area{height:120px;background:#0f172a;border-radius:8px;display:flex;align-items:center;justify-content:center;overflow:hidden;margin-bottom:8px;border:1px solid #1e293b}
.pinch-el{font-size:48px;transform-origin:center;transition:transform .2s;will-change:transform}
.pinch-controls{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.pinch-controls button{padding:5px 10px;font-size:11px}
.pinch-controls span{font-size:12px;font-family:monospace;color:#64748b}

.tp-area{height:80px;background:#0f172a;border-radius:8px;position:relative;border:1px solid #1e293b;cursor:crosshair;margin-bottom:8px;overflow:hidden}
.tp-hint{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:11px;color:#334155;pointer-events:none}
.tp-dot{position:absolute;width:20px;height:20px;border-radius:50%;background:rgba(59,130,246,.6);border:2px solid #3b82f6;transform:translate(-50%,-50%);pointer-events:none}`,
    `// ─── Swipe Carousel ──────────────────────────────────────
const cards = document.querySelectorAll('.sa-card');
const content = document.getElementById('sa-content');
let curCard = 0;
let swipeStartX = 0, swipeStartY = 0;

// Dots
const dotsEl = document.getElementById('sa-dots');
cards.forEach((_,i) => {
  const d=document.createElement('div');
  d.className='sd-dot'+(i===0?' active':'');
  dotsEl.appendChild(d);
});

function goCard(idx) {
  curCard = Math.max(0,Math.min(cards.length-1,idx));
  content.style.transform = \`translateX(-\${curCard*100}%)\`;
  cards.forEach((c,i)=>c.classList.toggle('active',i===curCard));
  dotsEl.querySelectorAll('.sd-dot').forEach((d,i)=>d.classList.toggle('active',i===curCard));
}

const swipeEl = document.getElementById('swipe-area');
const slog = document.getElementById('swipe-log');

function onSwipeStart(x,y) { swipeStartX=x; swipeStartY=y; }
function onSwipeEnd(x,y) {
  const dx=x-swipeStartX, dy=y-swipeStartY;
  if(Math.abs(dx)<20 && Math.abs(dy)<20) return;
  if(Math.abs(dx)>=Math.abs(dy)) {
    if(dx<-40) { goCard(curCard+1); slog.textContent='← Swipe Left → наступна картка'; }
    else if(dx>40) { goCard(curCard-1); slog.textContent='→ Swipe Right → попередня картка'; }
  } else {
    slog.textContent=(dy>0?'↓ Swipe Down':'↑ Swipe Up')+' — ігнорується (горизонтальний slider)';
  }
}

swipeEl.addEventListener('touchstart', e=>{ const t=e.touches[0]; onSwipeStart(t.clientX,t.clientY); },{passive:true});
swipeEl.addEventListener('touchend',   e=>{ const t=e.changedTouches[0]; onSwipeEnd(t.clientX,t.clientY); });
// Mouse fallback
let mDown=false;
swipeEl.addEventListener('mousedown', e=>{ mDown=true; onSwipeStart(e.clientX,e.clientY); });
window.addEventListener('mouseup',    e=>{ if(mDown){mDown=false;onSwipeEnd(e.clientX,e.clientY);} });

// ─── Pinch Zoom ───────────────────────────────────────────
let scale=1;
function pinchZoom(delta) {
  scale = Math.max(.3,Math.min(3,scale+delta));
  document.getElementById('pinch-el').style.transform=\`scale(\${scale})\`;
  document.getElementById('pinch-scale').textContent=\`scale: \${scale.toFixed(1)}\`;
}
function pinchReset() { scale=1; pinchZoom(0); }

// Touch pinch
let t1d0=0;
document.getElementById('pinch-area').addEventListener('touchstart',e=>{
  if(e.touches.length===2){
    t1d0=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
  }
},{passive:true});
document.getElementById('pinch-area').addEventListener('touchmove',e=>{
  if(e.touches.length===2){
    const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    pinchZoom((d-t1d0)/200);
    t1d0=d;
    e.preventDefault();
  }
},{passive:false});

// ─── Touch Points ─────────────────────────────────────────
const tpArea = document.getElementById('tp-area');
tpArea.addEventListener('mousemove', e => {
  if(!e.buttons) return;
  tpArea.querySelector('.tp-hint').style.display='none';
  let dot = document.getElementById('td0');
  if(!dot){dot=document.createElement('div');dot.className='tp-dot';dot.id='td0';tpArea.appendChild(dot);}
  const r=tpArea.getBoundingClientRect();
  dot.style.left=(e.clientX-r.left)+'px';
  dot.style.top=(e.clientY-r.top)+'px';
  document.getElementById('tp-log').textContent=\`Mouse point: x=\${Math.round(e.clientX-r.left)}, y=\${Math.round(e.clientY-r.top)}\nbuttons: \${e.buttons}\`;
});
tpArea.addEventListener('touchmove',e=>{
  e.preventDefault();
  tpArea.querySelectorAll('.tp-dot').forEach(d=>d.remove());
  tpArea.querySelector('.tp-hint').style.display='none';
  const r=tpArea.getBoundingClientRect();
  [...e.touches].forEach((t,i)=>{
    const d=document.createElement('div');
    d.className='tp-dot';d.id='td'+i;
    d.style.left=(t.clientX-r.left)+'px';d.style.top=(t.clientY-r.top)+'px';
    d.style.background='rgba('+(i===0?'59,130,246':'16,185,129')+', .6)';
    tpArea.appendChild(d);
  });
  document.getElementById('tp-log').textContent=\`Touches: \${e.touches.length}\n\${[...e.touches].map((t,i)=>\`[Finger \${i}] x=\${Math.round(t.clientX-r.left)}, y=\${Math.round(t.clientY-r.top)}\`).join('\n')}\`;
},{passive:false});`,
    [
      { level:'easy',   uk:'Свайпни ліво/право по карусел (або мишею з кнопкою). Поспостерігай лог — dx, dy.',  ru:'Свайпни влево/вправо по карусели (или мышью с кнопкой). Наблюдай лог — dx, dy.' },
      { level:'medium', uk:'Натисни Zoom In/Out — поясни transform:scale(). Знайди де Math.hypot використовується для pinch і для чого.',  ru:'Нажми Zoom In/Out. Найди Math.hypot в коде — для чего он?' },
      { level:'hard',   uk:'Додай клавіші ← → для перемикання карусел (keydown) — щоб і свайп і клавіші працювали.',  ru:'Добавь клавиши ← → для переключения карусели (keydown) — чтобы оба метода работали.' },
    ]
  );

  /* ─── 05-08 ──────────────────────────────────────────────── */
  patch('05-08',
    { uk:`<h2>Інтерактивна форма з live validation</h2>
<h3>HTML5 Constraint Validation API</h3>
<pre>input.validity.valid      // true/false
input.validity.valueMissing // required
input.validity.typeMismatch // type="email" тощо
input.validity.tooShort     // minlength
input.validity.tooLong      // maxlength
input.validity.patternMismatch // pattern

input.checkValidity()     // false = є помилки
input.setCustomValidity('Текст помилки') // кастомна помилка
input.setCustomValidity('') // очистити помилку</pre>
<h3>Патерн live validation</h3>
<pre>input.addEventListener('input', () => validate(input));
input.addEventListener('blur',  () => validate(input, true)); // onBlur — строгіше

function validate(input, strict=false) {
  const msg = getError(input, strict);
  input.setCustomValidity(msg);
  showError(input, msg);
}

// Не show error до першого blur (UX!)
let touched = new Set();
input.addEventListener('blur', () => touched.add(input.name));</pre>`,
      ru:`<h2>Live Validation</h2>
<pre>input.validity.valid
input.validity.valueMissing
input.validity.tooShort
input.checkValidity()
input.setCustomValidity('Помилка')
input.setCustomValidity('') // очистити

// Live:
input.addEventListener('input', () => validate(input));
input.addEventListener('blur',  () => validate(input, true));</pre>` },
    `<div class="form-lab">
  <h2>📋 Live Validation Form</h2>

  <form id="val-form" novalidate>
    <div class="fv-field">
      <label class="fv-label">Username <span class="req">*</span></label>
      <input id="f-username" name="username" type="text" minlength="3" maxlength="20"
        pattern="[a-zA-Z0-9_]+" placeholder="Тільки літери, цифри, _" required>
      <div class="fv-hint">3–20 символів, тільки a-z A-Z 0-9 _</div>
      <div class="fv-error" id="e-username"></div>
    </div>

    <div class="fv-field">
      <label class="fv-label">Email <span class="req">*</span></label>
      <input id="f-email" name="email" type="email" required placeholder="user@example.com">
      <div class="fv-error" id="e-email"></div>
    </div>

    <div class="fv-field">
      <label class="fv-label">Пароль <span class="req">*</span></label>
      <input id="f-password" name="password" type="password" minlength="8" required
        placeholder="Мінімум 8 символів">
      <div class="fv-strength" id="f-strength">
        <div class="fvs-bar"><div class="fvs-fill" id="fvs-fill"></div></div>
        <span class="fvs-label" id="fvs-label"></span>
      </div>
      <div class="fv-error" id="e-password"></div>
    </div>

    <div class="fv-field">
      <label class="fv-label">Підтвердження пароля <span class="req">*</span></label>
      <input id="f-confirm" name="confirm" type="password" required placeholder="Повтори пароль">
      <div class="fv-error" id="e-confirm"></div>
    </div>

    <div class="fv-field">
      <label class="fv-label">Вік <span class="req">*</span></label>
      <input id="f-age" name="age" type="number" min="10" max="100" required placeholder="Ваш вік">
      <div class="fv-error" id="e-age"></div>
    </div>

    <div class="fv-field">
      <label class="fv-label">Сайт</label>
      <input id="f-website" name="website" type="url" placeholder="https://example.com">
      <div class="fv-error" id="e-website"></div>
    </div>

    <button type="submit" class="fv-submit" id="fv-submit">Зареєструватись</button>
  </form>

  <div class="fv-result" id="fv-result" style="display:none"></div>
</div>`,
    `${BASE}
.form-lab{max-width:440px}
form{background:#1e293b;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px}
.fv-field{display:flex;flex-direction:column;gap:4px}
.fv-label{font-size:12px;font-weight:600;color:#94a3b8}
.req{color:#ef4444}
.fv-hint{font-size:11px;color:#475569}
input{width:100%;background:#0f172a;border:1px solid #1e293b;color:#f1f5f9;padding:9px 12px;border-radius:8px;font-size:13px;font-family:inherit;transition:.2s}
input:focus{outline:none;border-color:#3b82f6}
input.valid-ok{border-color:#10b981}
input.valid-err{border-color:#ef4444}
.fv-error{font-size:11px;color:#ef4444;min-height:16px;display:flex;align-items:center;gap:4px}
.fv-error:not(:empty)::before{content:'⚠ '}

.fv-strength{display:flex;align-items:center;gap:6px;margin-top:4px}
.fvs-bar{flex:1;height:4px;background:#0f172a;border-radius:4px;overflow:hidden}
.fvs-fill{height:100%;width:0;border-radius:4px;transition:.3s}
.fvs-label{font-size:11px;font-weight:700;min-width:50px}

.fv-submit{background:#1d4ed8;border:none;color:#fff;font-size:14px;font-weight:700;padding:11px;border-radius:8px;cursor:pointer;transition:.2s}
.fv-submit:hover{background:#2563eb}
.fv-submit:disabled{background:#334155;color:#64748b;cursor:not-allowed}

.fv-result{background:#1e293b;border-radius:10px;padding:14px;margin-top:10px;font-size:13px}
.fv-result.ok{border-left:3px solid #10b981;color:#6ee7b7}
.fv-result.err{border-left:3px solid #ef4444;color:#fca5a5}`,
    `const RULES = {
  username: v => {
    if(!v) return 'Username обов\'язковий';
    if(v.length<3) return \`Мінімум 3 символи (зараз \${v.length})\`;
    if(v.length>20) return 'Максимум 20 символів';
    if(!/^[a-zA-Z0-9_]+$/.test(v)) return 'Тільки літери, цифри та _';
    return '';
  },
  email: v => {
    if(!v) return 'Email обов\'язковий';
    if(!/^[^@]+@[^@]+\.[^@]+$/.test(v)) return 'Невалідний email';
    return '';
  },
  password: v => {
    if(!v) return 'Пароль обов\'язковий';
    if(v.length<8) return \`Мінімум 8 символів (зараз \${v.length})\`;
    return '';
  },
  confirm: v => {
    const pw = document.getElementById('f-password').value;
    if(!v) return 'Підтвердження обов\'язкове';
    if(v!==pw) return 'Паролі не співпадають';
    return '';
  },
  age: v => {
    if(!v) return 'Вік обов\'язковий';
    const n=parseInt(v);
    if(n<10) return 'Мінімум 10 років';
    if(n>100) return 'Максимум 100 років';
    return '';
  },
  website: v => {
    if(!v) return '';
    try { new URL(v); return ''; } catch(_) { return 'Невалідний URL (має бути https://...)'; }
  },
};

const touched = new Set();

function validateField(name, strict=false) {
  const input = document.getElementById('f-'+name);
  const errEl = document.getElementById('e-'+name);
  if(!input || !errEl) return true;
  if(!touched.has(name) && !strict) return !RULES[name](input.value);
  const err = RULES[name](input.value);
  errEl.textContent = err;
  input.classList.toggle('valid-ok', !err&&input.value!='');
  input.classList.toggle('valid-err', !!err);
  return !err;
}

const fields = ['username','email','password','confirm','age','website'];
fields.forEach(name => {
  const input = document.getElementById('f-'+name);
  if(!input) return;
  input.addEventListener('blur', () => { touched.add(name); validateField(name, true); updateSubmit(); });
  input.addEventListener('input', () => {
    if(touched.has(name)) validateField(name);
    if(name==='password') updateStrength(input.value);
    if(name==='password'&&touched.has('confirm')) validateField('confirm');
    updateSubmit();
  });
});

function updateStrength(v) {
  const criteria = [v.length>=8, /[A-Z]/.test(v), /[0-9]/.test(v), /[^a-zA-Z0-9]/.test(v)];
  const score = criteria.filter(Boolean).length;
  const labels = ['','Слабкий','Середній','Добрий','Сильний'];
  const colors = ['','#ef4444','#f59e0b','#3b82f6','#10b981'];
  document.getElementById('fvs-fill').style.width  = (score*25)+'%';
  document.getElementById('fvs-fill').style.background = colors[score]||'';
  document.getElementById('fvs-label').style.color = colors[score]||'';
  document.getElementById('fvs-label').textContent = score?labels[score]:'';
}

function updateSubmit() {
  const allValid = fields.every(n => !RULES[n](document.getElementById('f-'+n)?.value||''));
  document.getElementById('fv-submit').disabled = !allValid;
}
updateSubmit();

document.getElementById('val-form').addEventListener('submit', e => {
  e.preventDefault();
  fields.forEach(n=>{touched.add(n);validateField(n,true);});
  const allValid = fields.every(n => !RULES[n](document.getElementById('f-'+n)?.value||''));
  const res = document.getElementById('fv-result');
  res.style.display='block';
  if(allValid) {
    res.className='fv-result ok';
    res.textContent='✅ Форма валідна! Дані:\n'+fields.map(n=>n+': "'+document.getElementById('f-'+n).value+'"').join('\n');
  } else {
    res.className='fv-result err';
    res.textContent='❌ Є помилки — виправ їх і спробуй знову.';
  }
});`,
    [
      { level:'easy',   uk:'Заповни форму правильними даними → натисни "Зареєструватись". Потім введи короткий username — подивись error.',  ru:'Заполни форму правильными данными → нажми "Зарегистрироваться". Потом введи короткий username.' },
      { level:'medium', uk:'Знайди функцію RULES і поясни як вона перевіряє кожне поле. Чому confirm-rule читає значення #f-password?',  ru:'Найди объект RULES — объясни как проверяет каждое поле. Почему confirm читает #f-password?' },
      { level:'hard',   uk:'Додай поле "Phone" з regex валідацією для UA номера: +38(0XX)XXX-XX-XX.',  ru:'Добавь поле "Phone" с regex-валидацией для UA номера: +38(0XX)XXX-XX-XX.' },
    ]
  );

  /* ─── 05-09 ──────────────────────────────────────────────── */
  patch('05-09',
    { uk:`<h2>Infinite scroll: підвантаження при прокрутці</h2>
<h3>Підхід 1: scroll event (застарілий)</h3>
<pre>window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    loadMore(); // майже досягли низу
  }
});</pre>
<h3>Підхід 2: IntersectionObserver (кращий)</h3>
<pre>const sentinel = document.querySelector('.sentinel'); // елемент-маяк внизу

const io = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) loadMore();
}, { threshold: 0.1 });

io.observe(sentinel);</pre>
<h3>Загальний патерн</h3>
<pre>let page = 1;
let loading = false;

async function loadMore() {
  if (loading) return;
  loading = true;
  const items = await fetchPage(page++);
  if (!items.length) { io.disconnect(); return; } // кінець
  appendItems(items);
  loading = false;
}</pre>`,
      ru:`<h2>Infinite Scroll</h2>
<pre>// IntersectionObserver (лучше!):
const sentinel = document.querySelector('.sentinel');
const io = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting) loadMore();
});
io.observe(sentinel);

// Паттерн:
let page = 1, loading = false;
async function loadMore() {
  if(loading) return;
  loading = true;
  const items = await fetchPage(page++);
  if(!items.length) { io.disconnect(); return; }
  appendItems(items);
  loading = false;
}</pre>` },
    `<div class="inf-lab">
  <h2>♾️ Infinite Scroll</h2>

  <div class="inf-controls">
    <label>Метод:
      <select id="inf-method">
        <option value="io">IntersectionObserver</option>
        <option value="scroll">scroll event</option>
      </select>
    </label>
    <button onclick="resetInf()">↺ Reset</button>
    <div class="inf-stats" id="inf-stats">Показано: 0 / 100</div>
  </div>

  <div class="inf-scroll" id="inf-scroll">
    <div class="inf-items" id="inf-items"></div>
    <div class="inf-sentinel" id="inf-sentinel">
      <div class="inf-loader" id="inf-loader" style="display:none">
        <span class="il-spin">⟳</span> Завантаження...
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.inf-lab{max-width:520px}
.inf-controls{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;background:#1e293b;border-radius:10px;padding:10px 12px}
.inf-controls label{font-size:12px;color:#64748b;display:flex;align-items:center;gap:6px}
.inf-controls select{padding:5px 8px;font-size:12px}
.inf-stats{font-size:11px;font-family:monospace;color:#3b82f6;margin-left:auto}

.inf-scroll{height:320px;overflow-y:auto;background:#0f172a;border-radius:12px;border:1px solid #1e293b;scrollbar-width:thin;scrollbar-color:#334155 transparent}
.inf-items{display:flex;flex-direction:column;gap:1px}
.inf-card{padding:12px 16px;background:#1e293b;display:flex;align-items:center;gap:10px;animation:fadeCard .3s ease both}
@keyframes fadeCard{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ic-num{font-size:11px;font-family:monospace;color:#475569;min-width:30px}
.ic-icon{font-size:20px;flex-shrink:0}
.ic-content{flex:1}
.ic-title{font-size:13px;font-weight:600;color:#f1f5f9}
.ic-sub{font-size:11px;color:#64748b;margin-top:2px}
.ic-badge{padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;text-transform:uppercase}

.inf-sentinel{height:40px;display:flex;align-items:center;justify-content:center}
.inf-loader{font-size:12px;color:#64748b;display:flex;align-items:center;gap:6px}
.il-spin{display:inline-block;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}`,
    `const ITEMS_TOTAL = 100;
const PAGE_SIZE = 10;
const TOPICS = ['HTML5 Семантика','CSS Grid','Flexbox Tricks','JS Closures','DOM Events','async/await','Fetch API','RegExp','Array Methods','Date API','Math Utils','JSON Deep Copy','Web Workers','CSS Animations','Scroll-driven'];
const ICONS = ['🌐','🎨','⚡','🖱','📱','🚀','🌍','🔍','🔧','📅','🎲','🗂','⚙️','🎬','📜'];
const BADGES = [['Нові','rgba(59,130,246,.2)','#7dd3fc'],['Важливо','rgba(245,158,11,.2)','#fcd34d'],['Проект','rgba(139,92,246,.2)','#c4b5fd'],['Tip','rgba(16,185,129,.2)','#6ee7b7']];

function fakeItem(n) {
  const t = TOPICS[n % TOPICS.length];
  const b = BADGES[n % BADGES.length];
  return { num:n+1, icon:ICONS[n%ICONS.length], title:t, sub:'Урок '+String(n+1).padStart(3,'0')+' · 15 хв читання', badge:b };
}
function fakePage(page) {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page-1)*PAGE_SIZE;
      if(start>=ITEMS_TOTAL){resolve([]);return;}
      resolve(Array.from({length:Math.min(PAGE_SIZE,ITEMS_TOTAL-start)},(_,i)=>fakeItem(start+i)));
    }, 400);
  });
}

let page=1, loading=false, total=0, io=null;

function makeCard(item) {
  const d=document.createElement('div');
  d.className='inf-card';
  d.innerHTML=\`<div class="ic-num">#\${item.num}</div><div class="ic-icon">\${item.icon}</div><div class="ic-content"><div class="ic-title">\${item.title}</div><div class="ic-sub">\${item.sub}</div></div><div class="ic-badge" style="background:\${item.badge[1]};color:\${item.badge[2]}">\${item.badge[0]}</div>\`;
  return d;
}

async function loadMore() {
  if(loading||total>=ITEMS_TOTAL) return;
  loading=true;
  document.getElementById('inf-loader').style.display='flex';
  const items = await fakePage(page++);
  document.getElementById('inf-loader').style.display='none';
  const container=document.getElementById('inf-items');
  items.forEach(item=>{container.appendChild(makeCard(item));total++;});
  document.getElementById('inf-stats').textContent=\`Показано: \${total} / \${ITEMS_TOTAL}\`;
  if(total>=ITEMS_TOTAL&&io){io.disconnect();document.getElementById('inf-sentinel').textContent='✅ Всі '+ITEMS_TOTAL+' елементів завантажено';}
  loading=false;
}

function setupIO() {
  if(io) io.disconnect();
  io=new IntersectionObserver(entries=>{if(entries[0].isIntersecting)loadMore();},{root:document.getElementById('inf-scroll'),threshold:0.1});
  io.observe(document.getElementById('inf-sentinel'));
}

function setupScroll() {
  if(io){io.disconnect();io=null;}
  const scr=document.getElementById('inf-scroll');
  scr.onscroll=()=>{
    if(scr.scrollTop+scr.clientHeight>=scr.scrollHeight-80) loadMore();
  };
}

function resetInf() {
  if(io){io.disconnect();io=null;}
  document.getElementById('inf-scroll').onscroll=null;
  page=1;loading=false;total=0;
  document.getElementById('inf-items').innerHTML='';
  document.getElementById('inf-sentinel').innerHTML='<div class="inf-loader" id="inf-loader" style="display:none"><span class="il-spin">⟳</span> Завантаження...</div>';
  document.getElementById('inf-stats').textContent='Показано: 0 / 100';
  if(document.getElementById('inf-method').value==='io') setupIO(); else setupScroll();
  loadMore();
}

document.getElementById('inf-method').addEventListener('change',resetInf);
resetIO: setupIO();
loadMore();`,
    [
      { level:'easy',   uk:'Проскролюй список вниз — нові елементи підвантажуються. Переключи метод на "scroll event" і порівняй.',  ru:'Проскролюй список вниз — новые элементы загружаются. Переключи метод и сравни.' },
      { level:'medium', uk:'Знайди в коді .inf-sentinel — поясни що це "елемент-маяк". Чому IO кращий за scroll event?',  ru:'Найди .inf-sentinel в коде — объясни что это "маяк". Почему IO лучше scroll event?' },
      { level:'hard',   uk:'Додай кнопку "Load More" як альтернативу — при кліку завантажує наступну порцію (без автоскролу).',  ru:'Добавь кнопку "Load More" как альтернативу — при клике загружает следующую порцию.' },
    ]
  );

  /* ─── 05-10 ──────────────────────────────────────────────── */
  patch('05-10',
    { uk:`<h2>ResizeObserver та IntersectionObserver</h2>
<h3>ResizeObserver — спостерігає за розміром елемента</h3>
<pre>const ro = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const { width, height } = entry.contentRect;
    console.log(\`Новий розмір: \${width}×\${height}\`);

    // borderBoxSize (новіший API):
    const [{ inlineSize, blockSize }] = entry.borderBoxSize;
  });
});

ro.observe(element);
ro.unobserve(element);
ro.disconnect();</pre>
<h3>IntersectionObserver — деталі (нагадування)</h3>
<pre>new IntersectionObserver(entries => {
  entries.forEach(e => {
    e.isIntersecting    // true/false
    e.intersectionRatio // 0..1
    e.intersectionRect  // DOMRectReadOnly
    e.boundingClientRect
    e.rootBounds
  });
}, {
  root: null,      // viewport
  rootMargin: '0px',
  threshold: [0, 0.25, 0.5, 0.75, 1], // множинні пороги
});</pre>`,
      ru:`<h2>ResizeObserver + IntersectionObserver</h2>
<pre>// ResizeObserver:
const ro = new ResizeObserver(entries => {
  entries.forEach(e => {
    const { width, height } = e.contentRect;
  });
});
ro.observe(element);

// IntersectionObserver деталі:
new IntersectionObserver(entries => {
  entries.forEach(e => {
    e.isIntersecting     // true/false
    e.intersectionRatio  // 0..1
    e.intersectionRect
  });
}, { threshold: [0, .5, 1] });</pre>` },
    `<div class="obs-lab">
  <h2>🔭 Observer APIs</h2>

  <!-- ResizeObserver -->
  <div class="obs-section">
    <h3>ResizeObserver</h3>
    <div class="ro-container">
      <div class="ro-box" id="ro-box">
        <div class="ro-label" id="ro-label">Resize me →</div>
      </div>
    </div>
    <div class="ro-controls">
      <label>Width <span id="ro-w-v">300</span>px
        <input type="range" id="ro-w" min="120" max="480" value="300" oninput="resizeBox()">
      </label>
      <label>Height <span id="ro-h-v">120</span>px
        <input type="range" id="ro-h" min="50" max="250" value="120" oninput="resizeBox()">
      </label>
    </div>
    <pre class="out" id="ro-out">—</pre>
  </div>

  <!-- IntersectionObserver з ratios -->
  <div class="obs-section">
    <h3>IntersectionObserver з intersectionRatio</h3>
    <div class="io-scroll-box" id="io-scroll-box">
      <div class="io-spacer"></div>
      <div class="io-target" id="io-target">
        <div class="io-fill" id="io-fill"></div>
        <div class="io-text" id="io-text">0%</div>
      </div>
      <div class="io-spacer"></div>
    </div>
    <pre class="out" id="io-out">Прокрути до блоку →</pre>
  </div>
</div>`,
    `${BASE}
.obs-lab{max-width:520px}
.obs-section{background:#1e293b;border-radius:10px;padding:12px;margin-bottom:10px}
.obs-section h3{font-size:11px;text-transform:uppercase;color:#64748b;margin-bottom:8px}

.ro-container{background:#0f172a;border-radius:8px;padding:12px;margin-bottom:8px;overflow:hidden;min-height:140px}
.ro-box{background:linear-gradient(135deg,rgba(59,130,246,.15),rgba(139,92,246,.15));border:1px solid #334155;border-radius:8px;display:flex;align-items:center;justify-content:center;transition:width .2s,height .2s;resize:both;overflow:auto;width:300px;height:120px}
.ro-label{font-size:12px;color:#94a3b8;pointer-events:none}
.ro-controls{display:flex;flex-direction:column;gap:6px;margin-bottom:8px}
.ro-controls label{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}
.ro-controls label span{min-width:32px;font-family:monospace;color:#94a3b8}
.ro-controls input[type=range]{flex:1;accent-color:#3b82f6;cursor:pointer}

.io-scroll-box{height:200px;overflow-y:auto;background:#0f172a;border-radius:8px;border:1px solid #1e293b;scrollbar-width:thin;scrollbar-color:#334155 transparent;margin-bottom:8px}
.io-spacer{height:100px;display:flex;align-items:center;justify-content:center;color:#334155;font-size:11px}
.io-spacer::after{content:'↕ прокрути'}
.io-target{height:100px;margin:0 12px;border-radius:8px;border:1px solid #334155;position:relative;overflow:hidden;background:#1e293b}
.io-fill{position:absolute;inset:0;background:linear-gradient(90deg,#3b82f6,#8b5cf6);width:0;transition:.2s}
.io-text{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;font-variant-numeric:tabular-nums;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.5)}`,
    `// ResizeObserver
const roBox = document.getElementById('ro-box');
const ro = new ResizeObserver(entries => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  document.getElementById('ro-label').textContent = \`\${Math.round(width)} × \${Math.round(height)}\`;
  document.getElementById('ro-out').textContent =
    \`ResizeObserver callback:\ncontentRect.width  = \${Math.round(width)}px\ncontentRect.height = \${Math.round(height)}px\n\nAspect ratio: \${(width/height).toFixed(2)}\nArea: \${Math.round(width*height)} px²\n\nПрикладення: адаптивні компоненти без media queries!\`;
});
ro.observe(roBox);

function resizeBox() {
  const w = document.getElementById('ro-w').value;
  const h = document.getElementById('ro-h').value;
  document.getElementById('ro-w-v').textContent = w;
  document.getElementById('ro-h-v').textContent = h;
  roBox.style.width  = w + 'px';
  roBox.style.height = h + 'px';
}

// IntersectionObserver з ratio
const ioBox = document.getElementById('io-scroll-box');
const ioTarget = document.getElementById('io-target');
const io = new IntersectionObserver(entries => {
  const e = entries[0];
  const pct = Math.round(e.intersectionRatio * 100);
  document.getElementById('io-fill').style.width = pct + '%';
  document.getElementById('io-text').textContent = pct + '%';
  document.getElementById('io-out').textContent =
    \`IntersectionObserver:\nisIntersecting:   \${e.isIntersecting}\nintersectionRatio: \${e.intersectionRatio.toFixed(3)}\n\nboundingClientRect: \${Math.round(e.boundingClientRect.width)}×\${Math.round(e.boundingClientRect.height)}px\nintersectionRect: \${Math.round(e.intersectionRect.width)}×\${Math.round(e.intersectionRect.height)}px\`;
}, {
  root: ioBox,
  threshold: Array.from({length:21},(_,i)=>i/20),
});
io.observe(ioTarget);`,
    [
      { level:'easy',   uk:'Рухай слайдери Width і Height — бачиш як ResizeObserver фіксує кожну зміну. Прокрути до блоку IO.',  ru:'Двигай слайдеры Width и Height — ResizeObserver фиксирует каждое изменение. Прокрути к IO блоку.' },
      { level:'medium', uk:'Знайди threshold: Array.from({length:21},...) — поясни навіщо 21 порогове значення замість одного.',  ru:'Найди threshold: Array.from({length:21}...) — объясни зачем 21 пороговое значение.' },
      { level:'hard',   uk:'Реалізуй компонент який змінює свій CSS layout (1→2 колонки) коли його ширина > 350px через ResizeObserver (без media queries).',  ru:'Реализуй компонент который меняет layout (1→2 колонки) когда его ширина > 350px через ResizeObserver.' },
    ]
  );

  /* ─── 05-11 ──────────────────────────────────────────────── */
  patch('05-11',
    { uk:`<h2>contenteditable: мінімальний Rich Text Editor</h2>
<pre>// contenteditable — робить елемент редагованим:
&lt;div contenteditable="true"&gt;Клікни і редагуй&lt;/div&gt;

// Отримати вміст:
div.innerHTML  // з HTML-тегами
div.textContent // тільки текст
div.innerText  // текст зі стилями (видно)

// Форматування через execCommand (застаріло, але ще підтримується):
document.execCommand('bold');      // жирний
document.execCommand('italic');    // курсив
document.execCommand('formatBlock', false, 'h2');

// Сучасний підхід — Selection API:
const selection = window.getSelection();
const range = selection.getRangeAt(0);
const span = document.createElement('span');
span.style.color = 'red';
range.surroundContents(span); // обернути виділення</pre>
<h3>Зберегти позицію курсора</h3>
<pre>// range.startOffset, range.endOffset — позиція в TextNode</pre>`,
      ru:`<h2>contenteditable</h2>
<pre>&lt;div contenteditable="true"&gt;Редагуй&lt;/div&gt;

// Форматування:
document.execCommand('bold');
document.execCommand('italic');

// Selection API:
const sel = window.getSelection();
const range = sel.getRangeAt(0);
const span = document.createElement('span');
span.style.color = 'red';
range.surroundContents(span);</pre>` },
    `<div class="rte-lab">
  <h2>📝 Rich Text Editor</h2>

  <!-- Toolbar -->
  <div class="rte-toolbar" id="rte-toolbar">
    <div class="tb-group">
      <button onclick="fmt('bold')" title="Bold"><b>B</b></button>
      <button onclick="fmt('italic')" title="Italic"><i>I</i></button>
      <button onclick="fmt('underline')" title="Underline"><u>U</u></button>
      <button onclick="fmt('strikeThrough')" title="Strike"><s>S</s></button>
    </div>
    <div class="tb-sep"></div>
    <div class="tb-group">
      <button onclick="fmtBlock('h2')">H2</button>
      <button onclick="fmtBlock('h3')">H3</button>
      <button onclick="fmtBlock('p')">P</button>
      <button onclick="fmtBlock('blockquote')">❝</button>
    </div>
    <div class="tb-sep"></div>
    <div class="tb-group">
      <button onclick="fmt('insertUnorderedList')">• List</button>
      <button onclick="fmt('insertOrderedList')">1. List</button>
    </div>
    <div class="tb-sep"></div>
    <div class="tb-group">
      <input type="color" id="txt-color" value="#3b82f6" title="Text color" oninput="applyColor()">
      <button onclick="fmt('removeFormat')">✕ Clear</button>
    </div>
  </div>

  <!-- Editor -->
  <div class="rte-editor" id="rte-editor" contenteditable="true">
    <h2>Заголовок статті</h2>
    <p>Виділи цей текст і застосуй форматування через тулбар. Спробуй <b>жирний</b>, <i>курсив</i> та кольори!</p>
    <p>Це <u>підкреслений</u> текст і <s>закреслений</s> текст.</p>
  </div>

  <!-- Tabs: preview / html -->
  <div class="rte-tabs">
    <button class="rt-tab active" onclick="showTab('preview', this)">Preview</button>
    <button class="rt-tab" onclick="showTab('html', this)">HTML Source</button>
  </div>
  <div class="rte-preview" id="rte-preview" style="display:none"></div>
  <pre class="rte-source" id="rte-source" style="display:none"></pre>

  <div class="rte-stats" id="rte-stats">Символів: 0 · Слів: 0</div>
</div>`,
    `${BASE}
.rte-lab{max-width:520px}
.rte-toolbar{background:#1e293b;border-radius:10px 10px 0 0;padding:8px 10px;display:flex;align-items:center;gap:4px;flex-wrap:wrap;border-bottom:1px solid #0f172a}
.tb-group{display:flex;gap:3px}
.tb-sep{width:1px;background:#334155;margin:0 4px;align-self:stretch}
.rte-toolbar button{padding:5px 8px;font-size:12px;border-radius:5px;min-width:28px}
.rte-toolbar button:hover{background:rgba(59,130,246,.15);border-color:#3b82f6;color:#7dd3fc}
.rte-toolbar input[type=color]{width:28px;height:28px;border-radius:5px;border:1px solid #334155;padding:0;background:#0f172a;cursor:pointer}

.rte-editor{background:#0f172a;min-height:160px;padding:14px;outline:none;border-radius:0;border:1px solid #1e293b;border-top:none;font-size:14px;line-height:1.8;color:#f1f5f9;caret-color:#3b82f6}
.rte-editor:focus{border-color:#3b82f6}
.rte-editor h2{font-size:20px;font-weight:800;margin-bottom:8px}
.rte-editor h3{font-size:16px;font-weight:700;margin-bottom:6px}
.rte-editor blockquote{border-left:3px solid #3b82f6;padding-left:12px;color:#64748b;font-style:italic;margin:8px 0}
.rte-editor ul,.rte-editor ol{padding-left:20px;margin:6px 0}

.rte-tabs{display:flex;gap:0;background:#1e293b;border:1px solid #1e293b;border-top:none}
.rt-tab{flex:1;padding:7px;font-size:12px;border:none;border-radius:0;background:transparent;color:#64748b;cursor:pointer;transition:.2s;border-right:1px solid #0f172a}
.rt-tab:last-child{border-right:none}
.rt-tab.active{color:#f1f5f9;background:#0f172a}

.rte-preview{background:#0f172a;padding:12px;border:1px solid #1e293b;font-size:13px;line-height:1.7}
.rte-source{background:#0f172a;padding:12px;border:1px solid #1e293b;font-size:11px;color:#7dd3fc;font-family:monospace;white-space:pre-wrap;word-break:break-all;max-height:150px;overflow-y:auto}
.rte-stats{font-size:11px;color:#475569;padding:6px 0;font-family:monospace;background:#1e293b;border:1px solid #1e293b;border-top:none;border-radius:0 0 8px 8px;padding:6px 12px}`,
    `const editor = document.getElementById('rte-editor');

function fmt(cmd) {
  document.execCommand(cmd, false, null);
  editor.focus();
  updateStats();
}
function fmtBlock(tag) {
  document.execCommand('formatBlock', false, tag);
  editor.focus();
}
function applyColor() {
  const color = document.getElementById('txt-color').value;
  document.execCommand('foreColor', false, color);
  editor.focus();
}

editor.addEventListener('input', updateStats);
editor.addEventListener('keydown', e => {
  if(e.key==='Tab'){e.preventDefault();document.execCommand('insertHTML',false,'&nbsp;&nbsp;');}
});

function updateStats() {
  const text = editor.textContent.trim();
  const words = text ? text.split(/\s+/).length : 0;
  document.getElementById('rte-stats').textContent =
    \`Символів: \${text.length} · Слів: \${words}\`;
  // Оновлення preview якщо видно
  if(document.getElementById('rte-preview').style.display!=='none') {
    document.getElementById('rte-preview').innerHTML = editor.innerHTML;
    document.getElementById('rte-source').textContent = editor.innerHTML;
  }
}

function showTab(tab, btn) {
  document.querySelectorAll('.rt-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('rte-preview').style.display = tab==='preview' ? 'block' : 'none';
  document.getElementById('rte-source').style.display  = tab==='html'    ? 'block' : 'none';
  if(tab==='preview') document.getElementById('rte-preview').innerHTML = editor.innerHTML;
  if(tab==='html')    document.getElementById('rte-source').textContent = editor.innerHTML;
}

updateStats();`,
    [
      { level:'easy',   uk:'Виділи текст і натисни B (Bold), I (Italic). Потім "HTML Source" — поглянь як editor.innerHTML виглядає.',  ru:'Выдели текст и нажми B, I. Потом "HTML Source" — посмотри как выглядит editor.innerHTML.' },
      { level:'medium', uk:'Виділи слово → обери колір (color picker) → Apply. Знайди в коді execCommand("foreColor") — чому це "deprecated" але ще працює?',  ru:'Выдели слово → выбери цвет → Apply. Найди execCommand("foreColor") — почему "deprecated" но работает?' },
      { level:'hard',   uk:'Додай кнопку "💾 Save to localStorage" і "📂 Load" — зберігай та відновлюй editor.innerHTML.',  ru:'Добавь кнопки "💾 Save" и "📂 Load" — сохраняй и восстанавливай editor.innerHTML через localStorage.' },
    ]
  );

  /* ─── 05-12 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('05-12',
    { uk:`<h2>ПРОЕКТ: Drag-and-drop Kanban-дошка</h2>
<p>Побудуй повноцінну Kanban-дошку з DnD, localStorage та усіма вивченими DOM API.</p>
<h3>Обов'язковий функціонал</h3>
<ol>
  <li>3 колонки: Todo / In Progress / Done</li>
  <li>Додавання карток через форму (делегування)</li>
  <li>Drag & Drop між колонками (DnD API)</li>
  <li>Видалення картки (кнопка ✕)</li>
  <li>Збереження в localStorage (MutationObserver або input listener)</li>
  <li>Лічильник карток у заголовку кожної колонки</li>
  <li>Фільтр / пошук карток (keyboard events)</li>
</ol>
<h3>Бонус</h3>
<ul>
  <li>Редагування тексту картки (contenteditable)</li>
  <li>Дедлайн / дата (Date API)</li>
  <li>Пріоритет (кольорова мітка)</li>
</ul>`,
      ru:`<h2>ПРОЕКТ: Kanban-доска</h2>
<h3>Обязательный функционал</h3>
<ol>
  <li>3 колонки: Todo / In Progress / Done</li>
  <li>Добавление карточек через форму</li>
  <li>Drag & Drop между колонками</li>
  <li>Удаление карточки (✕)</li>
  <li>Сохранение в localStorage</li>
  <li>Счётчик карточек в заголовке</li>
  <li>Поиск карточек (keyboard)</li>
</ol>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Kanban Board</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="kb-header">
    <h1>📋 Kanban Board</h1>
    <div class="kb-search">
      <input id="kb-search" placeholder="🔍 Пошук карток...">
    </div>
    <div class="kb-total" id="kb-total">Карток: 0</div>
  </header>

  <!-- Форма додавання -->
  <div class="kb-add-form">
    <input id="add-text" placeholder="Назва картки..." style="flex:1">
    <select id="add-col">
      <option value="todo">📋 Todo</option>
      <option value="doing">⚡ Doing</option>
      <option value="done">✅ Done</option>
    </select>
    <select id="add-priority">
      <option value="low">🟢 Низький</option>
      <option value="med">🟡 Середній</option>
      <option value="high">🔴 Високий</option>
    </select>
    <button id="add-btn">+ Додати</button>
  </div>

  <!-- Kanban board -->
  <div class="kb-board" id="kb-board">
    <div class="kb-col" data-col="todo">
      <div class="kbc-head">
        <span>📋 Todo</span>
        <span class="kbc-count" id="cnt-todo">0</span>
      </div>
      <div class="kbc-body" id="col-todo"></div>
    </div>
    <div class="kb-col" data-col="doing">
      <div class="kbc-head">
        <span>⚡ Doing</span>
        <span class="kbc-count" id="cnt-doing">0</span>
      </div>
      <div class="kbc-body" id="col-doing"></div>
    </div>
    <div class="kb-col" data-col="done">
      <div class="kbc-head">
        <span>✅ Done</span>
        <span class="kbc-count" id="cnt-done">0</span>
      </div>
      <div class="kbc-body" id="col-done"></div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f1f5f9;min-height:100vh}

.kb-header{display:flex;align-items:center;gap:12px;padding:12px 16px;background:#1e293b;border-bottom:1px solid #334155;flex-wrap:wrap}
.kb-header h1{font-size:16px;font-weight:800}
.kb-search{flex:1;max-width:220px}
.kb-search input{width:100%;background:#0f172a;border:1px solid #334155;color:#f1f5f9;padding:7px 12px;border-radius:8px;font-size:12px}
.kb-search input:focus{outline:none;border-color:#3b82f6}
.kb-total{font-size:11px;color:#64748b;font-family:monospace;margin-left:auto}

.kb-add-form{display:flex;gap:6px;padding:10px 16px;background:#1e293b;border-bottom:1px solid #0f172a;flex-wrap:wrap}
.kb-add-form input,.kb-add-form select{padding:7px 10px;background:#0f172a;border:1px solid #334155;color:#f1f5f9;border-radius:8px;font-size:12px;font-family:inherit;min-width:0}
.kb-add-form input{flex:1;min-width:120px}
#add-btn{background:#1d4ed8;border:none;color:#fff;padding:7px 16px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.2s}
#add-btn:hover{background:#2563eb}

.kb-board{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:12px;height:calc(100vh - 120px)}
.kb-col{background:#1e293b;border-radius:10px;display:flex;flex-direction:column;overflow:hidden}
.kbc-head{padding:10px 12px;font-size:12px;font-weight:700;display:flex;justify-content:space-between;background:#0f172a;border-radius:10px 10px 0 0}
.kbc-count{background:#334155;border-radius:10px;padding:1px 7px;font-size:10px;color:#94a3b8;font-variant-numeric:tabular-nums}
.kbc-body{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:6px;scrollbar-width:thin;scrollbar-color:#334155 transparent;transition:.2s}
.kbc-body.drag-over{background:rgba(59,130,246,.08);border:1px dashed #3b82f6;border-radius:0 0 10px 10px}

.k-card{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:8px 10px;cursor:grab;position:relative;animation:cardIn .2s ease;transition:opacity .2s,border-color .2s}
@keyframes cardIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.k-card:active{cursor:grabbing}
.k-card.dragging{opacity:.4}
.k-card.hidden{display:none}
.k-card-title{font-size:12px;color:#f1f5f9;font-weight:600;padding-right:20px;outline:none;min-height:16px}
.k-card-title:focus{border-bottom:1px dashed #3b82f6}
.k-card-footer{display:flex;align-items:center;gap:5px;margin-top:6px}
.k-priority{display:inline-block;width:8px;height:8px;border-radius:50%;flex-shrink:0}
.k-priority.low{background:#10b981}.k-priority.med{background:#f59e0b}.k-priority.high{background:#ef4444}
.k-date{font-size:10px;color:#475569;font-family:monospace;flex:1}
.k-del{position:absolute;top:5px;right:6px;background:none;border:none;color:#334155;cursor:pointer;font-size:12px;padding:2px 4px;border-radius:3px;transition:.15s}
.k-del:hover{color:#ef4444}

@media(max-width:500px){.kb-board{grid-template-columns:1fr;height:auto}}`,
    `// ─── Data ────────────────────────────────────────────────
const COLS = ['todo','doing','done'];
let cards = JSON.parse(localStorage.getItem('kb-cards')||'[]');
let dragCard = null;
let nextId = cards.reduce((m,c)=>Math.max(m,c.id),0)+1;

// ─── Render ──────────────────────────────────────────────
function renderAll() {
  COLS.forEach(col => {
    const body = document.getElementById('col-'+col);
    body.innerHTML = '';
    const colCards = cards.filter(c=>c.col===col);
    colCards.forEach(card => body.appendChild(makeCardEl(card)));
    document.getElementById('cnt-'+col).textContent = colCards.length;
  });
  document.getElementById('kb-total').textContent = 'Карток: ' + cards.length;
  applySearch();
}

function makeCardEl(card) {
  const d=document.createElement('div');
  d.className='k-card';
  d.draggable=true;
  d.dataset.id=card.id;
  d.innerHTML=\`
    <div class="k-card-title" contenteditable="true">\${card.text}</div>
    <div class="k-card-footer">
      <span class="k-priority \${card.priority}"></span>
      <span class="k-date">\${card.date}</span>
    </div>
    <button class="k-del" title="Видалити">✕</button>\`;

  // Save edits
  d.querySelector('.k-card-title').addEventListener('blur', e => {
    const c=cards.find(c=>c.id===card.id);
    if(c){c.text=e.target.textContent.trim();save();}
  });
  return d;
}

// ─── Save / Load ─────────────────────────────────────────
function save() { localStorage.setItem('kb-cards', JSON.stringify(cards)); }

// ─── Add ─────────────────────────────────────────────────
function addCard() {
  const text = document.getElementById('add-text').value.trim();
  if(!text) return;
  const col  = document.getElementById('add-col').value;
  const pri  = document.getElementById('add-priority').value;
  cards.push({ id:nextId++, text, col, priority:pri, date:new Date().toLocaleDateString('uk-UA') });
  save();
  renderAll();
  document.getElementById('add-text').value='';
}
document.getElementById('add-btn').addEventListener('click', addCard);
document.getElementById('add-text').addEventListener('keydown', e=>e.key==='Enter'&&addCard());

// ─── Delete (делегування) ─────────────────────────────────
document.getElementById('kb-board').addEventListener('click', e => {
  if(!e.target.closest('.k-del')) return;
  const card = e.target.closest('.k-card');
  const id   = parseInt(card.dataset.id);
  cards = cards.filter(c=>c.id!==id);
  save(); renderAll();
});

// ─── Drag & Drop ─────────────────────────────────────────
document.getElementById('kb-board').addEventListener('dragstart', e => {
  const card = e.target.closest('.k-card');
  if(!card) return;
  dragCard = card;
  card.classList.add('dragging');
  e.dataTransfer.effectAllowed='move';
});
document.getElementById('kb-board').addEventListener('dragend', () => {
  if(dragCard) dragCard.classList.remove('dragging');
  document.querySelectorAll('.kbc-body').forEach(b=>b.classList.remove('drag-over'));
  dragCard=null;
});
document.querySelectorAll('.kbc-body').forEach(body=>{
  body.addEventListener('dragover', e=>{ e.preventDefault(); body.classList.add('drag-over'); });
  body.addEventListener('dragleave',()=>body.classList.remove('drag-over'));
  body.addEventListener('drop',e=>{
    e.preventDefault();
    body.classList.remove('drag-over');
    if(!dragCard) return;
    const id  = parseInt(dragCard.dataset.id);
    const col = body.closest('.kb-col').dataset.col;
    const c   = cards.find(c=>c.id===id);
    if(c){ c.col=col; save(); renderAll(); }
  });
});

// ─── Search (keyboard) ────────────────────────────────────
document.getElementById('kb-search').addEventListener('input', applySearch);
function applySearch() {
  const q = document.getElementById('kb-search').value.toLowerCase();
  document.querySelectorAll('.k-card').forEach(card => {
    const text = card.querySelector('.k-card-title').textContent.toLowerCase();
    card.classList.toggle('hidden', !!q && !text.includes(q));
  });
}

// ─── Init ────────────────────────────────────────────────
if(!cards.length) {
  cards = [
    {id:nextId++,text:'Вивчити DOM API',col:'done', priority:'high',date:'11.07.2025'},
    {id:nextId++,text:'Зробити Kanban дошку',col:'doing',priority:'med',date:'11.07.2025'},
    {id:nextId++,text:'Додати темну тему',col:'todo', priority:'low',date:'11.07.2025'},
  ];
  save();
}
renderAll();`,
    [
      { level:'easy',   uk:'Додай 3 картки з різним пріоритетом — перетягни між колонками. Введи текст у пошук.',  ru:'Добавь 3 карточки с разным приоритетом — перетяни между колонками. Введи текст в поиск.' },
      { level:'medium', uk:'Відкрий DevTools → Application → localStorage — знайди "kb-cards". Перезавантаж сторінку — дані зберігаються?',  ru:'Открой DevTools → Application → localStorage — найди "kb-cards". Перезагрузи страницу.' },
      { level:'hard',   uk:'Додай колонку "Backlog" (4-та ліворуч) і кнопку "Archive Done" яка переміщує всі Done картки у Backlog.',  ru:'Добавь колонку "Backlog" (4-я слева) и кнопку "Archive Done" — перемещает все Done в Backlog.' },
    ]
  );

})();
