/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 9 — DOM: Оживляємо сторінку · 8–11 Веб-Старт
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

  /* ─── Базові стилі для DOM-уроків ──────────────────────── */
  const BASE = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f8fafc;padding:20px}
button{background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:9px 18px;border-radius:8px;cursor:pointer;font-size:14px;transition:.2s}
button:hover{border-color:#059669;color:#4ade80}
.card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin-bottom:16px}
h2{font-size:18px;margin-bottom:12px}
h3{font-size:15px;color:#94a3b8;margin-bottom:10px}
input,textarea{background:#0f172a;border:1px solid #334155;color:#f8fafc;padding:10px;border-radius:8px;font-size:14px;font-family:inherit;width:100%;margin-bottom:8px}
input:focus,textarea:focus{outline:none;border-color:#059669;box-shadow:0 0 0 3px rgba(5,150,105,.2)}
.tag{display:inline-block;background:rgba(59,130,246,.15);border:1px solid #3b82f6;color:#60a5fa;padding:4px 12px;border-radius:20px;font-size:12px}`;

  /* ─── 09-01 ─────────────────────────────────────────────── */
  patch('09-01',
    { uk:`<h2>Що таке DOM: дерево документа</h2>
<p>Коли браузер завантажує HTML-файл, він будує з нього <strong>DOM</strong> (Document Object Model) — дерево об'єктів. Кожен HTML-тег стає «вузлом» цього дерева.</p>
<pre>html
 ├── head
 │   └── title
 └── body
     ├── h1
     ├── p
     └── div
         └── span</pre>
<h3>DOM = міст між HTML і JavaScript</h3>
<p>JavaScript звертається до DOM через глобальний об'єкт <code>document</code>:</p>
<pre>document.title          // назва сторінки
document.body           // тег body
document.getElementById('id')  // елемент за id</pre>
<p>У редакторі ти бачиш інтерактивну «рентгенографію» DOM — клікай на елементи щоб побачити їх властивості!</p>`,
      ru:`<h2>Что такое DOM: дерево документа</h2>
<p>Когда браузер загружает HTML, он строит из него <strong>DOM</strong> (Document Object Model) — дерево объектов. Каждый тег становится «узлом» этого дерева.</p>
<pre>html
 ├── head → title
 └── body
     ├── h1
     ├── p
     └── div → span</pre>
<h3>DOM = мост между HTML и JavaScript</h3>
<pre>document.title          // название страницы
document.body           // тег body
document.getElementById('id')  // элемент по id</pre>` },
    `<div class="dom-demo" id="demo">
  <div class="tree-node root">
    🌐 document
    <div class="tree-node">
      📄 &lt;html&gt;
      <div class="tree-row">
        <div class="tree-node">
          🤫 &lt;head&gt;
          <div class="tree-node leaf" id="n-title">📋 &lt;title&gt; Мій сайт</div>
        </div>
        <div class="tree-node">
          🏠 &lt;body&gt;
          <div class="tree-node leaf" id="n-h1">📌 &lt;h1&gt; Заголовок</div>
          <div class="tree-node leaf" id="n-p">📝 &lt;p&gt; Параграф</div>
          <div class="tree-node" id="n-div">
            📦 &lt;div&gt;
            <div class="tree-node leaf" id="n-span">🔤 &lt;span&gt; текст</div>
            <div class="tree-node leaf" id="n-btn">🔘 &lt;button&gt;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="info-box" id="info">
  👆 Клікни на елемент у дереві!
</div>
<div class="dom-actions">
  <button onclick="showTitle()">document.title</button>
  <button onclick="showBody()">document.body.children</button>
  <button onclick="showAll()">document.querySelectorAll("*")</button>
</div>`,
    `${BASE}
.dom-demo{background:#1e293b;border-radius:12px;padding:16px;margin-bottom:12px;font-size:13px}
.tree-node{padding:6px 12px;border-left:2px solid #334155;margin-left:20px;margin-top:4px;cursor:pointer;border-radius:0 6px 6px 0;transition:.2s}
.tree-node:hover,.tree-node.active{background:rgba(5,150,105,.15);border-left-color:#059669;color:#4ade80}
.root{margin-left:0;border-left:none;font-weight:700;font-size:14px}
.tree-row{display:flex;gap:12px}
.leaf{}
.info-box{background:#0f172a;border:1px solid #334155;border-radius:10px;padding:14px;margin-bottom:12px;font-size:13px;font-family:monospace;color:#94a3b8;min-height:44px}
.dom-actions{display:flex;gap:8px;flex-wrap:wrap}`,
    `const info = document.getElementById('info');
const nodes = {
  'n-title': { tag:'<title>', type:'Element', children:0,  text:'"Мій сайт"' },
  'n-h1':    { tag:'<h1>',    type:'Element', children:0,  text:'"Заголовок"' },
  'n-p':     { tag:'<p>',     type:'Element', children:0,  text:'"Параграф"' },
  'n-div':   { tag:'<div>',   type:'Element', children:2,  text:'(має 2 дочірніх)' },
  'n-span':  { tag:'<span>',  type:'Element', children:0,  text:'"текст"' },
  'n-btn':   { tag:'<button>',type:'Element', children:0,  text:'(порожня)' },
};

Object.keys(nodes).forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', e => {
    e.stopPropagation();
    document.querySelectorAll('.tree-node').forEach(n=>n.classList.remove('active'));
    el.classList.add('active');
    const n = nodes[id];
    info.innerHTML = \`<b>\${n.tag}</b> | Тип: \${n.type} | Дітей: \${n.children} | Вміст: \${n.text}\`;
  });
});

function showTitle() {
  info.textContent = 'document.title = "' + document.title + '"';
}
function showBody() {
  info.textContent = 'body.children.length = ' + document.body.children.length;
}
function showAll() {
  info.textContent = 'querySelectorAll("*").length = ' + document.querySelectorAll('*').length;
}`,
    [
      { level:'easy',   uk:'Клікни на кожен елемент у дереві і прочитай інформацію внизу.',     ru:'Кликни на каждый элемент в дереві и прочитай информацию внизу.' },
      { level:'medium', uk:'Натисни кнопки document.title, document.body.children, querySelectorAll("*") — поспостерігай за результатами.',   ru:'Нажми кнопки document.title, document.body.children, querySelectorAll("*") — понаблюдай.' },
      { level:'hard',   uk:'Додай у nodes новий id "n-img" для вузла <img> — намалюй його в HTML і в JS-об\'єкті nodes.',  ru:'Добавь в nodes новый id "n-img" для узла <img> — нарисуй его в HTML и в JS-объекте nodes.' },
    ]
  );

  /* ─── 09-02 ─────────────────────────────────────────────── */
  patch('09-02',
    { uk:`<h2>querySelector та querySelectorAll</h2>
<p>Це два основних способи знайти елементи на сторінці з JavaScript.</p>
<h3>querySelector — один елемент</h3>
<pre>// Знаходить ПЕРШИЙ відповідний
document.querySelector('#id')
document.querySelector('.клас')
document.querySelector('h1')
document.querySelector('nav a.active')</pre>
<h3>querySelectorAll — всі елементи</h3>
<pre>// Повертає NodeList (схоже на масив)
const кнопки = document.querySelectorAll('button');
кнопки.forEach(btn => {
  btn.style.color = 'red';
});</pre>
<h3>Ключова відмінність</h3>
<ul>
  <li><code>querySelector</code> → один елемент або <code>null</code></li>
  <li><code>querySelectorAll</code> → NodeList (може бути порожній)</li>
</ul>`,
      ru:`<h2>querySelector и querySelectorAll</h2>
<p>Два основных способа найти элементы на странице.</p>
<h3>querySelector — один элемент</h3>
<pre>document.querySelector('#id')
document.querySelector('.класс')
document.querySelector('h1')</pre>
<h3>querySelectorAll — все элементы</h3>
<pre>const кнопки = document.querySelectorAll('button');
кнопки.forEach(btn => btn.style.color = 'red');</pre>` },
    `<div class="qs-demo">
  <div class="card" id="card-main">
    <h2 id="title-main">Привіт, DOM! 👋</h2>
    <p class="desc">Тут живуть елементи для пошуку.</p>
    <div class="btn-row">
      <button class="action-btn" data-color="#4ade80">querySelector('#title-main')</button>
      <button class="action-btn" data-color="#60a5fa">querySelector('.desc')</button>
      <button class="action-btn" data-color="#fbbf24">querySelectorAll('button')</button>
      <button class="action-btn" data-color="#f87171">querySelectorAll('.item')</button>
    </div>
  </div>
  <ul class="items-list">
    <li class="item">🍎 Яблуко</li>
    <li class="item">🍌 Банан</li>
    <li class="item">🍒 Вишня</li>
  </ul>
  <div class="result-box" id="qs-result">← Натисни кнопку вище</div>
</div>`,
    `${BASE}
.qs-demo{max-width:520px}
.btn-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.items-list{list-style:none;display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
.item{background:#1e293b;border:1px solid #334155;padding:8px 16px;border-radius:8px;transition:.3s}
.item.highlight{border-color:#059669;background:rgba(5,150,105,.15);color:#4ade80;transform:scale(1.05)}
.result-box{background:#0f172a;border:1px solid #334155;border-radius:10px;padding:14px;font-family:monospace;font-size:13px;color:#94a3b8;min-height:46px}`,
    `const res = document.getElementById('qs-result');

document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Прибираємо підсвітку
    document.querySelectorAll('.highlight').forEach(e=>e.classList.remove('highlight'));

    const label = btn.textContent;

    if (label.includes("'#title-main'")) {
      const el = document.querySelector('#title-main');
      el.style.color = '#4ade80';
      res.textContent = 'querySelector("#title-main") → <h2> "' + el.textContent + '"';
      setTimeout(()=> el.style.color = '', 1500);
    }
    else if (label.includes("'.desc'")) {
      const el = document.querySelector('.desc');
      el.style.background = 'rgba(59,130,246,.2)';
      res.textContent = 'querySelector(".desc") → <p> "' + el.textContent + '"';
      setTimeout(()=> el.style.background = '', 1500);
    }
    else if (label.includes("querySelectorAll('button')")) {
      const btns = document.querySelectorAll('button');
      btns.forEach(b => { b.style.borderColor='#fbbf24'; b.style.color='#fbbf24'; });
      res.textContent = 'querySelectorAll("button") → знайдено: ' + btns.length + ' кнопок';
      setTimeout(()=> btns.forEach(b=>{ b.style.borderColor=''; b.style.color=''; }), 1500);
    }
    else {
      const items = document.querySelectorAll('.item');
      items.forEach(it => it.classList.add('highlight'));
      res.textContent = 'querySelectorAll(".item") → знайдено: ' + items.length + ' елементи';
    }
  });
});`,
    [
      { level:'easy',   uk:'Натисни всі 4 кнопки і поспостерігай які елементи підсвічуються.',  ru:'Нажми все 4 кнопки и понаблюдай какие элементы подсвечиваются.' },
      { level:'medium', uk:'Додай кнопку 5 з текстом "querySelectorAll(\'li\')" і код що виводить скільки li на сторінці.',  ru:'Добавь кнопку 5 с текстом "querySelectorAll(\'li\')" и код который выводит сколько li на странице.' },
      { level:'hard',   uk:'Виведи у result-box перший елемент зі списку items: querySelector(".item").textContent.',  ru:'Выведи в result-box первый элемент из списка items: querySelector(".item").textContent.' },
    ]
  );

  /* ─── 09-03 ─────────────────────────────────────────────── */
  patch('09-03',
    { uk:`<h2>innerHTML та textContent: зміна тексту</h2>
<p>Дві властивості для зміни вмісту елементів.</p>
<h3>textContent — чистий текст</h3>
<pre>const заг = document.querySelector('h1');
заг.textContent = 'Новий заголовок';</pre>
<ul>
  <li>Безпечний — HTML-теги не виконуються, виводяться як текст.</li>
  <li>Використовуй для вставки даних від користувача.</li>
</ul>
<h3>innerHTML — HTML-вміст</h3>
<pre>const div = document.querySelector('#box');
div.innerHTML = '&lt;strong&gt;Жирний&lt;/strong&gt; текст';</pre>
<ul>
  <li>Потужний — можна вставляти HTML-теги.</li>
  <li>⚠️ Ніколи не вставляй у innerHTML дані від користувача без перевірки — це XSS-атака!</li>
</ul>`,
      ru:`<h2>innerHTML и textContent: изменение текста</h2>
<h3>textContent — чистый текст</h3>
<pre>el.textContent = 'Новый текст';</pre>
<ul>
  <li>Безопасный — HTML-теги не выполняются.</li>
  <li>Используй для вставки данных от пользователя.</li>
</ul>
<h3>innerHTML — HTML-содержимое</h3>
<pre>el.innerHTML = '&lt;strong&gt;Жирный&lt;/strong&gt; текст';</pre>
<ul>
  <li>Мощный — можно вставлять HTML-теги.</li>
  <li>⚠️ Никогда не вставляй данные пользователя напрямую — XSS!</li>
</ul>` },
    `<div class="demo-wrap">
  <div class="card">
    <h2 id="main-h">Оригінальний заголовок</h2>
    <p id="main-p">Цей параграф можна змінити через textContent або innerHTML.</p>
    <div id="html-box" class="html-box">Тут буде HTML...</div>
  </div>

  <div class="controls card">
    <h3>textContent</h3>
    <div class="btn-row">
      <button onclick="chgText()">Змінити заголовок</button>
      <button onclick="chgPara()">Змінити параграф</button>
      <button onclick="resetAll()">🔄 Скинути</button>
    </div>

    <h3 style="margin-top:14px">innerHTML</h3>
    <div class="btn-row">
      <button onclick="injectSimple()">Простий HTML</button>
      <button onclick="injectCard()">HTML-картка</button>
      <button onclick="injectList()">HTML-список</button>
    </div>
  </div>
</div>`,
    `${BASE}
.demo-wrap{max-width:520px;display:flex;flex-direction:column;gap:14px}
#main-h{font-size:20px;margin-bottom:8px;transition:color .3s}
.html-box{background:#0f172a;border:1px solid #334155;border-radius:10px;padding:14px;min-height:60px;transition:all .3s}
.btn-row{display:flex;flex-wrap:wrap;gap:8px}
.mini-card{background:#1e293b;border:1px solid #059669;border-radius:10px;padding:14px}
.mini-card h4{color:#4ade80;margin-bottom:6px}`,
    `let origH = document.getElementById('main-h').textContent;
let origP = document.getElementById('main-p').textContent;

function chgText() {
  const h = document.getElementById('main-h');
  h.textContent = '✅ Заголовок змінено через textContent!';
  h.style.color  = '#4ade80';
}
function chgPara() {
  document.getElementById('main-p').textContent =
    'Параграф змінено! Якщо б тут був <b>HTML-тег</b> — він БИ НЕ відпрацював (показався б як текст).';
}
function resetAll() {
  const h = document.getElementById('main-h');
  h.textContent  = origH;
  h.style.color  = '';
  document.getElementById('main-p').textContent  = origP;
  document.getElementById('html-box').innerHTML  = 'Тут буде HTML...';
  document.getElementById('html-box').style.color = '';
}
function injectSimple() {
  document.getElementById('html-box').innerHTML =
    '<strong style="color:#4ade80">Жирний</strong> та <em style="color:#60a5fa">курсивний</em> текст через innerHTML!';
}
function injectCard() {
  document.getElementById('html-box').innerHTML = \`
    <div class="mini-card">
      <h4>🌟 Картка через innerHTML</h4>
      <p style="color:#94a3b8;font-size:13px">Дата: \${new Date().toLocaleDateString('uk')}</p>
      <p style="font-size:13px">Сюди можна вставити <b>будь-який HTML</b>!</p>
    </div>\`;
}
function injectList() {
  const речі = ['🍕 Піца','🎮 Ігри','💻 Код','🌍 Подорожі'];
  document.getElementById('html-box').innerHTML =
    '<ul style="padding-left:20px">' +
    речі.map(р => \`<li style="padding:4px 0;color:#60a5fa">\${р}</li>\`).join('') +
    '</ul>';
}`,
    [
      { level:'easy',   uk:'Натисни всі кнопки та подивись різницю між textContent і innerHTML.',  ru:'Нажми все кнопки и посмотри разницу между textContent и innerHTML.' },
      { level:'medium', uk:'Додай кнопку "Мій текст" яка ставить у #main-h твоє власне ім\'я через textContent.',  ru:'Добавь кнопку "Мой текст" которая ставит в #main-h твоё имя через textContent.' },
      { level:'hard',   uk:'Зміни injectList() щоб список рахував скільки елементів: після <ul> додай <p>Всього: X</p> через шаблонний літерал.',  ru:'Измени injectList() чтобы список считал сколько элементов: после <ul> добавь <p>Всего: X</p>.' },
    ]
  );

  /* ─── 09-04 ─────────────────────────────────────────────── */
  patch('09-04',
    { uk:`<h2>classList: add, remove, toggle</h2>
<p><code>classList</code> дозволяє додавати, видаляти і перемикати CSS-класи через JavaScript — без зміни стилів напряму.</p>
<h3>Методи</h3>
<pre>el.classList.add('active')     // додати клас
el.classList.remove('active')  // видалити клас
el.classList.toggle('active')  // якщо є — видалити, немає — додати
el.classList.contains('active')// true/false</pre>
<h3>Чому це краще ніж el.style.color = '...'</h3>
<ul>
  <li>Стилі залишаються у CSS (правильне місце).</li>
  <li>Легко перемикати кілька стилів одночасно одним класом.</li>
  <li>Анімація у CSS — JS лише перемикає клас.</li>
</ul>
<pre>.card.active {
  border-color: #059669;
  background: rgba(5,150,105,.1);
  transform: scale(1.02);
}</pre>`,
      ru:`<h2>classList: add, remove, toggle</h2>
<p><code>classList</code> позволяет добавлять, удалять и переключать CSS-классы через JavaScript.</p>
<h3>Методы</h3>
<pre>el.classList.add('active')
el.classList.remove('active')
el.classList.toggle('active')
el.classList.contains('active')</pre>
<h3>Почему это лучше чем el.style.color</h3>
<ul>
  <li>Стили остаются в CSS.</li>
  <li>Легко переключать несколько стилей одним классом.</li>
</ul>` },
    `<div class="cl-demo">
  <!-- Перемикач теми -->
  <div class="theme-bar">
    <span>Тема:</span>
    <button id="theme-btn" onclick="toggleTheme()">🌙 Темна</button>
  </div>

  <!-- Картки з виділенням -->
  <div class="cl-cards" id="cards">
    <div class="cl-card" onclick="selectCard(this)">🐱 Кіт</div>
    <div class="cl-card" onclick="selectCard(this)">🐶 Пес</div>
    <div class="cl-card" onclick="selectCard(this)">🐰 Кролик</div>
    <div class="cl-card" onclick="selectCard(this)">🦜 Папуга</div>
  </div>

  <!-- Кнопки-перемикачі -->
  <div class="cl-btns">
    <button class="toggle-btn" id="btn-bold"   onclick="toggleFeature('bold')">Жирний</button>
    <button class="toggle-btn" id="btn-large"  onclick="toggleFeature('large')">Великий</button>
    <button class="toggle-btn" id="btn-colored"onclick="toggleFeature('colored')">Кольоровий</button>
    <button class="toggle-btn" id="btn-shadow" onclick="toggleFeature('shadow')">Тінь</button>
  </div>
  <div class="preview-text" id="preview">Ось текст для прикладу!</div>
</div>`,
    `${BASE}
body{transition:background .3s,color .3s}
body.light-theme{background:#f8fafc;color:#0f172a}
body.light-theme .cl-card{background:#fff;border-color:#e2e8f0;color:#0f172a}
body.light-theme button{background:#f1f5f9;color:#0f172a;border-color:#e2e8f0}

.cl-demo{max-width:480px}
.theme-bar{display:flex;align-items:center;gap:10px;margin-bottom:16px;font-size:14px;color:#94a3b8}
.cl-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.cl-card{background:#1e293b;border:2px solid #334155;border-radius:12px;padding:20px;text-align:center;font-size:24px;cursor:pointer;transition:.25s;user-select:none}
.cl-card:hover{border-color:#3b82f6}
.cl-card.selected{border-color:#059669;background:rgba(5,150,105,.15);transform:scale(1.05)}

.cl-btns{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.toggle-btn.on{background:rgba(5,150,105,.2);border-color:#059669;color:#4ade80}
.preview-text{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:16px;font-size:18px;transition:all .3s;text-align:center}
.preview-text.bold{font-weight:900}
.preview-text.large{font-size:26px}
.preview-text.colored{color:#059669}
.preview-text.shadow{text-shadow:0 0 16px #059669,0 0 32px #059669}`,
    `function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  document.getElementById('theme-btn').textContent = isLight ? '🌙 Темна' : '☀️ Світла';
}

function selectCard(card) {
  document.querySelectorAll('.cl-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

function toggleFeature(cls) {
  const preview = document.getElementById('preview');
  const btn     = document.getElementById('btn-' + cls);
  preview.classList.toggle(cls);
  btn.classList.toggle('on');
}`,
    [
      { level:'easy',   uk:'Клікни на картки тварин — виділяй їх. Натисни кнопки ефектів для тексту.',  ru:'Кликни на карточки животных — выделяй их. Нажми кнопки эффектов для текста.' },
      { level:'medium', uk:'Додай п\'яту .cl-card "🐠 Рибка" і нову кнопку-перемикач "Підкреслення" (клас "underline", CSS text-decoration:underline).', ru:'Добавь пятую .cl-card "🐠 Рыбка" и новую кнопку-переключатель "Подчёркивание" (класс "underline").' },
      { level:'hard',   uk:'Зроби так щоб при кліку на картку текст у #preview змінювався на emoji тварини (data-атрибут або масив).', ru:'Сделай так чтобы при клике на карточку текст в #preview менялся на emoji животного.' },
    ]
  );

  /* ─── 09-05 ─────────────────────────────────────────────── */
  patch('09-05',
    { uk:`<h2>addEventListener: click, mouseover, keydown</h2>
<p><code>addEventListener</code> — це спосіб «підписатися» на подію. Коли подія станеться — виконується функція-обробник.</p>
<h3>Синтаксис</h3>
<pre>елемент.addEventListener('тип-події', функція);

// Click — клік мишкою:
btn.addEventListener('click', () => {
  console.log('Натиснуто!');
});

// mouseover — навели мишку:
div.addEventListener('mouseover', () => {
  div.style.background = 'blue';
});

// keydown — натиснута клавіша:
document.addEventListener('keydown', e => {
  console.log('Клавіша:', e.key);
});</pre>
<h3>Популярні події</h3>
<ul>
  <li><code>click</code> — клік</li>
  <li><code>dblclick</code> — подвійний клік</li>
  <li><code>mouseover/mouseout</code> — навів/прибрав мишку</li>
  <li><code>keydown/keyup</code> — клавіша</li>
  <li><code>input</code> — зміна поля введення</li>
</ul>`,
      ru:`<h2>addEventListener: click, mouseover, keydown</h2>
<p><code>addEventListener</code> — способ «подписаться» на событие.</p>
<h3>Синтаксис</h3>
<pre>элемент.addEventListener('тип-события', функция);

btn.addEventListener('click', () => {
  console.log('Нажато!');
});
document.addEventListener('keydown', e => {
  console.log('Клавиша:', e.key);
});</pre>
<h3>Популярные события</h3>
<ul>
  <li>click, dblclick, mouseover, mouseout</li>
  <li>keydown, keyup, input</li>
</ul>` },
    `<div class="ev-demo">
  <h2>🎮 Панель подій</h2>

  <!-- Click -->
  <div class="ev-section">
    <h3>👆 click</h3>
    <div class="btn-row">
      <button id="btn-click">Клікни мене</button>
      <button id="btn-dbl" ondblclick="dblAct()">Подвійний клік</button>
    </div>
    <div class="ev-log" id="log-click">—</div>
  </div>

  <!-- Mouseover -->
  <div class="ev-section">
    <h3>🖱 mouseover / mouseout</h3>
    <div id="hover-zone" class="hover-zone">Навед мишку сюди!</div>
  </div>

  <!-- Keydown -->
  <div class="ev-section">
    <h3>⌨️ keydown</h3>
    <input type="text" id="key-input" placeholder="Друкуй тут...">
    <div class="ev-log" id="log-key">— жодної клавіші —</div>
  </div>

  <!-- Лічильник -->
  <div class="ev-section">
    <h3>🔢 Лічильник кліків</h3>
    <div class="counter-row">
      <button id="btn-minus">−</button>
      <div class="counter" id="counter">0</div>
      <button id="btn-plus">+</button>
    </div>
  </div>
</div>`,
    `${BASE}
.ev-demo{max-width:500px}
.ev-section{background:#1e293b;border-radius:12px;padding:16px;margin-bottom:12px}
h2{font-size:18px;margin-bottom:12px}
h3{font-size:14px;color:#94a3b8;margin-bottom:10px}
.btn-row{display:flex;gap:8px;margin-bottom:8px}
.ev-log{background:#0f172a;border-radius:8px;padding:10px 14px;font-size:13px;font-family:monospace;color:#94a3b8;min-height:38px;transition:.2s}
.hover-zone{background:#0f172a;border:2px solid #334155;border-radius:10px;padding:20px;text-align:center;font-size:14px;color:#94a3b8;cursor:default;transition:all .3s}
.hover-zone.active{border-color:#059669;background:rgba(5,150,105,.15);color:#4ade80;transform:scale(1.02)}
.counter-row{display:flex;align-items:center;gap:16px}
.counter{background:#0f172a;border:2px solid #334155;border-radius:10px;padding:10px 28px;font-size:28px;font-weight:900;color:#f8fafc;min-width:80px;text-align:center;transition:transform .1s}
.counter.bump{transform:scale(1.25)}`,
    `// ── CLICK ──
let clickCount = 0;
document.getElementById('btn-click').addEventListener('click', () => {
  clickCount++;
  const log = document.getElementById('log-click');
  log.textContent = \`Кліків: \${clickCount} | Час: \${new Date().toLocaleTimeString('uk')}\`;
  log.style.color = '#4ade80';
});

function dblAct() {
  const log = document.getElementById('log-click');
  log.textContent = '🎉 Подвійний клік!';
  log.style.color = '#fbbf24';
}

// ── MOUSEOVER ──
const hz = document.getElementById('hover-zone');
hz.addEventListener('mouseover', () => {
  hz.classList.add('active');
  hz.textContent = '✅ Мишка всередині!';
});
hz.addEventListener('mouseout', () => {
  hz.classList.remove('active');
  hz.textContent = 'Навед мишку сюди!';
});

// ── KEYDOWN ──
document.getElementById('key-input').addEventListener('keydown', e => {
  const log = document.getElementById('log-key');
  log.textContent = \`Клавіша: "\${e.key}" | Код: \${e.code} | Shift: \${e.shiftKey}\`;
  log.style.color = '#60a5fa';
});

// ── ЛІЧИЛЬНИК ──
let cnt = 0;
const counter = document.getElementById('counter');

function bump() {
  counter.classList.remove('bump');
  void counter.offsetWidth; // перезапуск анімації
  counter.classList.add('bump');
  setTimeout(() => counter.classList.remove('bump'), 150);
}

document.getElementById('btn-plus').addEventListener('click', () => {
  cnt++;
  counter.textContent = cnt;
  counter.style.color = '#4ade80';
  bump();
});
document.getElementById('btn-minus').addEventListener('click', () => {
  cnt--;
  counter.textContent = cnt;
  counter.style.color = cnt < 0 ? '#f87171' : '#f8fafc';
  bump();
});`,
    [
      { level:'easy',   uk:'Поклікай на кнопку "Клікни мене" 10 разів — дивись як росте лічильник.',   ru:'Кликни на кнопку "Клікни мене" 10 раз — смотри как растёт счётчик.' },
      { level:'medium', uk:'Додай кнопку "Скинути" яка ставить cnt = 0, counter.textContent = 0 і колір counter.style.color = "".', ru:'Добавь кнопку "Сбросить" которая ставит cnt = 0, counter.textContent = 0 и сбрасывает цвет.' },
      { level:'hard',   uk:'Додай addEventListener("dblclick") до .counter: при подвійному кліку cnt множиться на 2.',  ru:'Добавь addEventListener("dblclick") к .counter: при двойном клике cnt умножается на 2.' },
    ]
  );

  /* ─── 09-06 ─────────────────────────────────────────────── */
  patch('09-06',
    { uk:`<h2>Event object: target та preventDefault()</h2>
<p>Коли відбувається подія, обробник отримує <strong>об'єкт події</strong> (event). У ньому є корисна інформація.</p>
<h3>event.target — хто спричинив подію</h3>
<pre>document.addEventListener('click', e => {
  console.log('Клікнули на:', e.target.tagName);
  console.log('Текст:', e.target.textContent);
});</pre>
<h3>event.preventDefault() — заборонити стандартну дію</h3>
<pre>// Щоб посилання не переходило за href:
link.addEventListener('click', e => {
  e.preventDefault();
  console.log('Перехід заборонено!');
});</pre>
<h3>event.stopPropagation() — зупинити «спливання»</h3>
<p>Якщо кліки «спливають» від дочірніх до батьківських елементів — <code>stopPropagation()</code> зупиняє це.</p>`,
      ru:`<h2>Event object: target и preventDefault()</h2>
<p>Когда происходит событие, обработчик получает <strong>объект события</strong>. В нём есть полезная информация.</p>
<h3>event.target — кто вызвал событие</h3>
<pre>document.addEventListener('click', e => {
  console.log('Клик на:', e.target.tagName);
});</pre>
<h3>event.preventDefault() — запретить стандартное действие</h3>
<pre>link.addEventListener('click', e => {
  e.preventDefault(); // ссылка не переходит
});</pre>` },
    `<div class="ev-obj-demo">
  <!-- Кліки на батьку і дочірніх -->
  <div class="ev-section">
    <h3>🎯 event.target</h3>
    <div class="click-area" id="area">
      <p>Клікни будь-де в цьому блоці</p>
      <button class="area-btn" id="area-btn1">Кнопка A</button>
      <button class="area-btn" id="area-btn2">Кнопка B</button>
      <span class="area-span">Текст-спан</span>
    </div>
    <div class="ev-log" id="target-log">— клікни вище —</div>
  </div>

  <!-- preventDefault на формі -->
  <div class="ev-section">
    <h3>🚫 preventDefault</h3>
    <form id="demo-form" class="demo-form">
      <input type="text" id="form-name" placeholder="Твоє ім'я">
      <input type="email" id="form-email" placeholder="Email">
      <button type="submit">Надіслати</button>
    </form>
    <div class="ev-log" id="form-log">— заповни і натисни Надіслати —</div>
  </div>

  <!-- Посилання без переходу -->
  <div class="ev-section">
    <h3>🔗 Посилання без переходу</h3>
    <a href="https://google.com" id="safe-link">Це посилання на Google (але ми заблокуємо перехід)</a>
    <div class="ev-log" id="link-log">—</div>
  </div>
</div>`,
    `${BASE}
.ev-obj-demo{max-width:500px;display:flex;flex-direction:column;gap:12px}
.ev-section{background:#1e293b;border-radius:12px;padding:16px}
h3{font-size:14px;color:#94a3b8;margin-bottom:10px}
.click-area{background:#0f172a;border-radius:10px;padding:16px;cursor:pointer;display:flex;flex-wrap:wrap;gap:8px;align-items:center;min-height:60px;transition:.2s}
.click-area:hover{border:1px dashed #334155}
.area-btn{background:#1e293b}
.area-span{color:#60a5fa;font-size:13px;padding:4px 10px}
.ev-log{background:#0f172a;border-radius:8px;padding:10px 14px;font-size:12px;font-family:monospace;color:#94a3b8;margin-top:8px;min-height:36px}
.demo-form{display:flex;flex-direction:column;gap:8px}
a{color:#60a5fa;display:block;margin-top:8px;padding:10px;background:#0f172a;border-radius:8px}`,
    `// ── event.target ──
document.getElementById('area').addEventListener('click', e => {
  const log = document.getElementById('target-log');
  log.style.color = '#4ade80';
  log.textContent =
    \`tagName: <\${e.target.tagName.toLowerCase()}> | \` +
    \`id: "\${e.target.id||'—'}" | \` +
    \`text: "\${e.target.textContent.trim().slice(0,30)}"\`;
});

// ── preventDefault на формі ──
document.getElementById('demo-form').addEventListener('submit', e => {
  e.preventDefault(); // зупиняємо стандартне відправлення
  const імя   = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const log   = document.getElementById('form-log');

  if (!імя || !email) {
    log.textContent = '❌ Заповни обидва поля!';
    log.style.color = '#f87171';
    return;
  }
  log.textContent = \`✅ Привіт, \${імя}! Email: \${email} (сторінка НЕ перезавантажилась!)\`;
  log.style.color = '#4ade80';
});

// ── Посилання без переходу ──
document.getElementById('safe-link').addEventListener('click', e => {
  e.preventDefault();
  const log = document.getElementById('link-log');
  log.textContent = '🚫 Перехід на ' + e.target.href + ' заблоковано через preventDefault()!';
  log.style.color = '#fbbf24';
});`,
    [
      { level:'easy',   uk:'Клікни на різні елементи у .click-area і дивись що показує event.target.',  ru:'Кликни на разные элементы в .click-area и смотри что показывает event.target.' },
      { level:'medium', uk:'Додай у форму поле #form-city і відображай його у form-log разом з іменем та email.',  ru:'Добавь в форму поле #form-city и отображай его в form-log вместе с именем и email.' },
      { level:'hard',   uk:'Додай перевірку: якщо форм-email не містить "@" — виводь "❌ Невірний email" і не продовжуй.',  ru:'Добавь проверку: если форм-email не содержит "@" — выводи "❌ Неверный email" и не продолжай.' },
    ]
  );

  /* ─── 09-07 ─────────────────────────────────────────────── */
  patch('09-07',
    { uk:`<h2>createElement та appendChild: нові елементи</h2>
<p>JavaScript може створювати нові HTML-елементи «на льоту» і додавати їх на сторінку.</p>
<h3>Три кроки</h3>
<pre>// 1. Створити елемент:
const div = document.createElement('div');

// 2. Налаштувати:
div.textContent = 'Новий блок!';
div.className   = 'my-card';
div.style.color = 'green';

// 3. Додати на сторінку:
document.getElementById('container').appendChild(div);</pre>
<h3>Інші методи вставки</h3>
<pre>parent.prepend(el)    // на початок
parent.append(el)     // в кінець (= appendChild)
parent.before(el)     // перед батьком
parent.after(el)      // після батька</pre>`,
      ru:`<h2>createElement и appendChild: новые элементы</h2>
<p>JavaScript может создавать новые HTML-элементы «на лету» и добавлять их на страницу.</p>
<h3>Три шага</h3>
<pre>// 1. Создать:
const div = document.createElement('div');
// 2. Настроить:
div.textContent = 'Новый блок!';
div.className = 'my-card';
// 3. Добавить:
document.getElementById('container').appendChild(div);</pre>` },
    `<div class="create-demo">
  <div class="ev-section">
    <h3>📝 Генератор карток</h3>
    <div class="form-row">
      <input type="text"  id="card-title" placeholder="Назва картки">
      <input type="text"  id="card-emoji" placeholder="Emoji (наприклад 🌟)" maxlength="4">
      <input type="color" id="card-color" value="#059669" title="Колір">
      <button onclick="addCard()">+ Додати картку</button>
    </div>
    <div class="cards-container" id="cards-container">
      <p class="empty-hint" id="empty-hint">Картки з'являться тут...</p>
    </div>
    <div class="stats" id="stats"></div>
  </div>
</div>`,
    `${BASE}
.create-demo{max-width:520px}
.ev-section{background:#1e293b;border-radius:12px;padding:20px}
h3{font-size:14px;color:#94a3b8;margin-bottom:12px}
.form-row{display:grid;grid-template-columns:1fr auto auto auto;gap:8px;margin-bottom:14px}
.form-row input[type=text]{margin:0}
input[type=color]{width:42px;height:42px;border-radius:8px;border:1px solid #334155;background:#0f172a;cursor:pointer;padding:2px}
.cards-container{display:flex;flex-wrap:wrap;gap:10px;min-height:60px}
.empty-hint{color:#475569;font-size:13px;align-self:center}
.gen-card{border-radius:12px;padding:14px 18px;font-weight:600;font-size:15px;cursor:pointer;display:flex;align-items:center;gap:8px;border:2px solid transparent;transition:.2s;animation:popIn .3s ease-out}
.gen-card:hover{filter:brightness(1.2);transform:translateY(-2px)}
@keyframes popIn{from{opacity:0;transform:scale(.7) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
.stats{margin-top:12px;font-size:13px;color:#94a3b8}`,
    `let cardCount = 0;

function addCard() {
  const title = document.getElementById('card-title').value.trim() || 'Картка';
  const emoji = document.getElementById('card-emoji').value.trim() || '✨';
  const color = document.getElementById('card-color').value;

  // Прибираємо підказку
  const hint = document.getElementById('empty-hint');
  if (hint) hint.remove();

  // Створюємо елемент:
  const card = document.createElement('div');
  card.className = 'gen-card';
  card.style.background    = color + '22';
  card.style.borderColor   = color;
  card.style.color         = color;
  card.innerHTML = \`<span>\${emoji}</span><span>\${title}</span>\`;

  // Клік на картці — видалення:
  card.addEventListener('click', () => {
    card.style.animation = 'popIn .2s ease-out reverse';
    setTimeout(() => card.remove(), 200);
    cardCount--;
    updateStats();
  });

  document.getElementById('cards-container').appendChild(card);
  cardCount++;
  updateStats();

  // Очищаємо поля:
  document.getElementById('card-title').value = '';
  document.getElementById('card-emoji').value = '';
}

function updateStats() {
  document.getElementById('stats').textContent =
    cardCount > 0 ? \`Карток: \${cardCount} (клікни на картку щоб видалити)\` : '';
  if (cardCount === 0) {
    const hint = document.createElement('p');
    hint.className = 'empty-hint';
    hint.id = 'empty-hint';
    hint.textContent = 'Картки з\'являться тут...';
    document.getElementById('cards-container').appendChild(hint);
  }
}`,
    [
      { level:'easy',   uk:'Додай 5 карток з різними назвами і кольорами. Потім клікни на деякі — видали їх.',  ru:'Добавь 5 карточек с разными названиями и цветами. Потом кликни на некоторые — удали их.' },
      { level:'medium', uk:'Додай поле input#card-desc для опису картки і відображай його під назвою у card.innerHTML.',  ru:'Добавь поле input#card-desc для описания карточки и отображай его под названием в card.innerHTML.' },
      { level:'hard',   uk:'Додай кнопку "Очистити все" яка видаляє всі .gen-card через querySelectorAll().forEach(c=>c.remove()).',  ru:'Добавь кнопку "Очистить всё" которая удаляет все .gen-card через querySelectorAll().forEach(c=>c.remove()).' },
    ]
  );

  /* ─── 09-08 ─────────────────────────────────────────────── */
  patch('09-08',
    { uk:`<h2>Видалення елемента: remove()</h2>
<p>Після того як знайшли або створили елемент — його можна видалити з DOM.</p>
<h3>Методи видалення</h3>
<pre>// Сучасний спосіб (рекомендовано):
el.remove();

// Через батьківський елемент:
parent.removeChild(el);</pre>
<h3>Типовий паттерн: список з кнопками видалення</h3>
<pre>function createItem(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const del = document.createElement('button');
  del.textContent = '✕';
  del.addEventListener('click', () => li.remove());
  li.appendChild(del);

  document.getElementById('list').appendChild(li);
}</pre>`,
      ru:`<h2>Удаление элемента: remove()</h2>
<p>После того как нашли или создали элемент — его можно удалить из DOM.</p>
<h3>Методы удаления</h3>
<pre>el.remove(); // современный способ</pre>
<h3>Типичный паттерн: список с кнопками удаления</h3>
<pre>const del = document.createElement('button');
del.textContent = '✕';
del.addEventListener('click', () => li.remove());
li.appendChild(del);</pre>` },
    `<div class="remove-demo">
  <div class="ev-section">
    <h3>🗑 Список покупок</h3>
    <div class="add-row">
      <input type="text" id="item-input" placeholder="Назва товару...">
      <button onclick="addItem()">+ Додати</button>
    </div>
    <ul class="shop-list" id="shop-list"></ul>
    <div class="list-footer">
      <span class="list-count" id="list-count">0 товарів</span>
      <button onclick="clearDone()" class="btn-gray">🗑 Видалити куплені</button>
      <button onclick="clearAll()"  class="btn-red">✕ Очистити все</button>
    </div>
  </div>
</div>`,
    `${BASE}
.remove-demo{max-width:480px}
.ev-section{background:#1e293b;border-radius:12px;padding:20px}
h3{font-size:14px;color:#94a3b8;margin-bottom:12px}
.add-row{display:flex;gap:8px;margin-bottom:14px}
.add-row input{flex:1;margin:0}
.shop-list{list-style:none;display:flex;flex-direction:column;gap:6px;margin-bottom:12px;min-height:40px}
.shop-item{display:flex;align-items:center;gap:10px;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:10px 12px;animation:slideIn .25s ease-out;transition:.2s}
@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
.shop-item.done{opacity:.5;text-decoration:line-through;border-color:#1e3a2f}
.shop-item input[type=checkbox]{width:18px;height:18px;accent-color:#059669;cursor:pointer;flex-shrink:0;margin:0}
.shop-item .item-text{flex:1;font-size:14px}
.shop-item .del-btn{background:none;border:none;color:#475569;font-size:16px;padding:2px 6px;cursor:pointer;border-radius:4px}
.shop-item .del-btn:hover{color:#f87171;background:rgba(239,68,68,.15)}
.list-footer{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.list-count{font-size:12px;color:#64748b;flex:1}
.btn-gray{font-size:12px;padding:6px 12px}
.btn-red{font-size:12px;padding:6px 12px;border-color:#ef4444;color:#f87171}`,
    `const defaultItems = ['🍞 Хліб','🥛 Молоко','🧀 Сир','🍎 Яблука'];
defaultItems.forEach(addItem);

function addItem(text) {
  const val = typeof text === 'string' ? text :
              document.getElementById('item-input').value.trim();
  if (!val) return;

  const li  = document.createElement('li');
  li.className = 'shop-item';

  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.addEventListener('change', () => {
    li.classList.toggle('done', cb.checked);
    updateCount();
  });

  const span = document.createElement('span');
  span.className = 'item-text';
  span.textContent = val;

  const del = document.createElement('button');
  del.className   = 'del-btn';
  del.textContent = '✕';
  del.title = 'Видалити';
  del.addEventListener('click', () => {
    li.style.animation = 'slideIn .2s ease-out reverse';
    setTimeout(() => { li.remove(); updateCount(); }, 200);
  });

  li.append(cb, span, del);
  document.getElementById('shop-list').appendChild(li);

  if (typeof text !== 'string') {
    document.getElementById('item-input').value = '';
  }
  updateCount();
}

function clearDone() {
  document.querySelectorAll('.shop-item.done').forEach(it => it.remove());
  updateCount();
}
function clearAll() {
  document.getElementById('shop-list').innerHTML = '';
  updateCount();
}
function updateCount() {
  const all  = document.querySelectorAll('.shop-item').length;
  const done = document.querySelectorAll('.shop-item.done').length;
  document.getElementById('list-count').textContent =
    \`\${all} товарів (\${done} куплено)\`;
}

document.getElementById('item-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addItem();
});`,
    [
      { level:'easy',   uk:'Додай кілька товарів і постав галочки на куплених. Натисни "Видалити куплені".',  ru:'Добавь несколько товаров и поставь галочки на купленных. Нажми "Удалить купленные".' },
      { level:'medium', uk:'Змін кнопку del-btn: при видаленні запитуй confirm("Видалити?") і видаляй лише якщо натиснуто OK.',  ru:'Измени кнопку del-btn: при удалении спрашивай confirm("Удалить?") и удаляй только если нажато OK.' },
      { level:'hard',   uk:'Додай можливість редагування товару при подвійному кліку на span: дозволь ввести новий текст (span.contentEditable = "true").',  ru:'Добавь возможность редактирования товара при двойном клике на span: разреши вводить новый текст (span.contentEditable = "true").' },
    ]
  );

  /* ─── 09-09 ─────────────────────────────────────────────── */
  patch('09-09',
    { uk:`<h2>Форми у JS: value та submit</h2>
<p>JavaScript читає і записує дані форм через властивість <code>value</code>.</p>
<h3>Читання значень</h3>
<pre>const поле  = document.getElementById('name');
const текст = поле.value;      // рядок
const число = Number(поле.value); // перетворення</pre>
<h3>Типи полів</h3>
<pre>input[type=text]     .value  // рядок
input[type=number]   .value  // рядок (перетвори через Number())
input[type=checkbox] .checked // true/false
input[type=radio]    // шукай checked через querySelectorAll
select               .value  // вибраний option
textarea             .value  // багаторядковий текст</pre>
<h3>Обробка форми</h3>
<pre>form.addEventListener('submit', e => {
  e.preventDefault(); // зупинити перезавантаження
  const val = document.getElementById('name').value;
  // обробляємо val...
});</pre>`,
      ru:`<h2>Формы в JS: value и submit</h2>
<p>JavaScript читает и записывает данные форм через свойство <code>value</code>.</p>
<h3>Чтение значений</h3>
<pre>const поле = document.getElementById('name');
const текст = поле.value;
const число = Number(поле.value);</pre>
<h3>Типы полей</h3>
<pre>input[type=text].value     // строка
input[type=checkbox].checked // true/false
select.value               // выбранный option</pre>` },
    `<div class="form-demo">
  <div class="ev-section">
    <h3>🧮 Розрахунок ІМТ</h3>
    <form id="bmi-form">
      <label class="lbl">Ім'я</label>
      <input type="text" id="f-name" placeholder="Твоє ім'я" required>
      <label class="lbl">Вага (кг)</label>
      <input type="number" id="f-weight" min="10" max="300" placeholder="наприклад 35" required>
      <label class="lbl">Зріст (см)</label>
      <input type="number" id="f-height" min="50" max="250" placeholder="наприклад 145" required>
      <label class="lbl">Фізична активність</label>
      <select id="f-activity">
        <option value="low">Низька (сидячий спосіб)</option>
        <option value="mid" selected>Середня (1-3 рази на тиждень)</option>
        <option value="high">Висока (щодня)</option>
      </select>
      <div class="check-row">
        <input type="checkbox" id="f-agree">
        <label for="f-agree">Погоджуюсь з умовами</label>
      </div>
      <button type="submit" class="submit">Розрахувати</button>
    </form>
    <div class="bmi-result" id="bmi-result"></div>
  </div>
</div>`,
    `${BASE}
.form-demo{max-width:440px}
.ev-section{background:#1e293b;border-radius:12px;padding:20px}
h3{font-size:14px;color:#94a3b8;margin-bottom:12px}
.lbl{display:block;font-size:12px;color:#94a3b8;margin-bottom:4px;margin-top:10px}
select{background:#0f172a;border:1px solid #334155;color:#f8fafc;padding:10px;border-radius:8px;font-size:14px;width:100%;cursor:pointer;margin-bottom:8px}
.check-row{display:flex;align-items:center;gap:10px;margin:12px 0;font-size:14px}
.check-row input{width:18px;height:18px;accent-color:#059669;margin:0;cursor:pointer;flex-shrink:0}
.submit{width:100%;background:#059669;border-color:#059669;color:#fff;padding:12px;font-size:15px;font-weight:600;margin-top:8px}
.submit:hover{background:#047857;border-color:#047857}
.bmi-result{margin-top:14px;background:#0f172a;border-radius:10px;padding:16px;font-size:14px;min-height:50px;display:none}`,
    `document.getElementById('bmi-form').addEventListener('submit', e => {
  e.preventDefault();

  const імя      = document.getElementById('f-name').value.trim();
  const вага     = Number(document.getElementById('f-weight').value);
  const зріст_см = Number(document.getElementById('f-height').value);
  const акт      = document.getElementById('f-activity').value;
  const згода    = document.getElementById('f-agree').checked;

  const res = document.getElementById('bmi-result');
  res.style.display = 'block';

  if (!згода) {
    res.innerHTML = '<span style="color:#f87171">❌ Потрібно погодитись з умовами!</span>';
    return;
  }
  if (!імя || !вага || !зріст_см) {
    res.innerHTML = '<span style="color:#f87171">❌ Заповни всі поля!</span>';
    return;
  }

  const зріст_м = зріст_см / 100;
  const імт     = вага / (зріст_м * зріст_м);

  let категорія, колір;
  if (імт < 18.5)      { категорія = 'Недостатня вага'; колір = '#60a5fa'; }
  else if (імт < 25)   { категорія = 'Нормальна вага ✅';  колір = '#4ade80'; }
  else if (імт < 30)   { категорія = 'Надмірна вага';    колір = '#fbbf24'; }
  else                  { категорія = 'Ожиріння';          колір = '#f87171'; }

  const активність = { low:'Низька', mid:'Середня', high:'Висока' };

  res.innerHTML = \`
    <b style="color:#4ade80">Привіт, \${імя}!</b><br>
    ІМТ: <b style="color:\${колір}">\${імт.toFixed(1)}</b> — \${категорія}<br>
    Активність: \${активність[акт]}<br>
    Зріст: \${зріст_см} см | Вага: \${вага} кг
  \`;
});`,
    [
      { level:'easy',   uk:'Заповни форму своїми даними і натисни "Розрахувати" — подивись результат.',  ru:'Заполни форму своими данными и нажми "Розрахувати" — посмотри результат.' },
      { level:'medium', uk:'Додай поле select для статі ("чоловіча"/"жіноча") і відображай його у результаті.',  ru:'Добавь поле select для пола ("мужской"/"женский") и отображай его в результате.' },
      { level:'hard',   uk:'Додай поле textarea для "побажання" і виводь перші 50 символів у результаті (value.slice(0,50)).',  ru:'Добавь поле textarea для "пожелания" и выводи первые 50 символов в результате (value.slice(0,50)).' },
    ]
  );

  /* ─── 09-10 ─────────────────────────────────────────────── */
  patch('09-10',
    { uk:`<h2>localStorage: пам'ять браузера</h2>
<p><code>localStorage</code> зберігає дані у браузері навіть після закриття вкладки або перезавантаження сторінки.</p>
<h3>API</h3>
<pre>// Зберегти:
localStorage.setItem('ключ', 'значення');

// Прочитати:
const val = localStorage.getItem('ключ'); // або null

// Видалити:
localStorage.removeItem('ключ');

// Очистити всё:
localStorage.clear();</pre>
<h3>Зберігаємо об'єкти (тільки рядки!)</h3>
<pre>// Зберігаємо:
localStorage.setItem('user', JSON.stringify({ name:'Аліна', age:10 }));

// Читаємо:
const user = JSON.parse(localStorage.getItem('user'));</pre>`,
      ru:`<h2>localStorage: память браузера</h2>
<p><code>localStorage</code> хранит данные в браузере даже после закрытия вкладки.</p>
<h3>API</h3>
<pre>localStorage.setItem('ключ', 'значение');
const val = localStorage.getItem('ключ');
localStorage.removeItem('ключ');
localStorage.clear();</pre>
<h3>Хранить объекты</h3>
<pre>localStorage.setItem('user', JSON.stringify({name:'Алина'}));
const user = JSON.parse(localStorage.getItem('user'));</pre>` },
    `<div class="ls-demo">
  <div class="ev-section">
    <h3>💾 Нотатки, що зберігаються</h3>
    <textarea id="note" rows="4" placeholder="Напиши нотатку... (зберігається автоматично!)"></textarea>
    <div class="ls-btns">
      <button onclick="saveNote()">💾 Зберегти</button>
      <button onclick="clearNote()">🗑 Очистити</button>
    </div>
    <div class="ls-status" id="note-status"></div>
  </div>

  <div class="ev-section">
    <h3>📊 Лічильник відвідувань</h3>
    <div class="visit-info" id="visit-info">...</div>
    <button onclick="resetVisits()">Скинути лічильник</button>
  </div>

  <div class="ev-section">
    <h3>⚙️ Налаштування</h3>
    <div class="settings">
      <label class="lbl">Мова:</label>
      <select id="s-lang" onchange="saveSetting('lang',this.value)">
        <option value="uk">Українська</option>
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
      <label class="lbl">Тема:</label>
      <select id="s-theme" onchange="saveSetting('theme',this.value)">
        <option value="dark">Темна</option>
        <option value="light">Світла</option>
      </select>
    </div>
  </div>
</div>`,
    `${BASE}
.ls-demo{max-width:460px;display:flex;flex-direction:column;gap:12px}
.ev-section{background:#1e293b;border-radius:12px;padding:16px}
h3{font-size:14px;color:#94a3b8;margin-bottom:10px}
.lbl{display:block;font-size:12px;color:#94a3b8;margin:8px 0 4px}
.ls-btns{display:flex;gap:8px;margin-top:8px}
.ls-status{font-size:12px;color:#94a3b8;margin-top:6px;min-height:18px}
.visit-info{background:#0f172a;border-radius:8px;padding:12px;font-size:14px;margin-bottom:10px;color:#60a5fa}
select{background:#0f172a;border:1px solid #334155;color:#f8fafc;padding:9px;border-radius:8px;font-size:14px;width:100%;cursor:pointer;margin-bottom:0}`,
    `// ── Нотатки ──
const noteEl = document.getElementById('note');
noteEl.value = localStorage.getItem('saved-note') || '';

noteEl.addEventListener('input', () => {
  localStorage.setItem('saved-note', noteEl.value);
  document.getElementById('note-status').textContent =
    '✅ Автозбережено: ' + new Date().toLocaleTimeString('uk');
});

function saveNote() {
  localStorage.setItem('saved-note', noteEl.value);
  document.getElementById('note-status').textContent = '💾 Збережено! Закрий і відкрий сторінку — нотатка залишиться.';
}
function clearNote() {
  noteEl.value = '';
  localStorage.removeItem('saved-note');
  document.getElementById('note-status').textContent = '🗑 Очищено';
}

// ── Лічильник ──
let visits = Number(localStorage.getItem('visits') || 0) + 1;
localStorage.setItem('visits', visits);
const first = localStorage.getItem('first-visit') || new Date().toLocaleString('uk');
localStorage.setItem('first-visit', first);
document.getElementById('visit-info').innerHTML =
  \`Відвідувань: <b>\${visits}</b><br>Перший візит: \${first}\`;

function resetVisits() {
  localStorage.removeItem('visits');
  localStorage.removeItem('first-visit');
  location.reload();
}

// ── Налаштування ──
function saveSetting(key, val) {
  localStorage.setItem(key, val);
}
// Відновлення налаштувань:
const savedLang  = localStorage.getItem('lang');
const savedTheme = localStorage.getItem('theme');
if (savedLang)  document.getElementById('s-lang').value  = savedLang;
if (savedTheme) document.getElementById('s-theme').value = savedTheme;`,
    [
      { level:'easy',   uk:'Напиши нотатку, закрий вкладку і відкрий знову — перевір що вона збереглась.',  ru:'Напиши заметку, закрой вкладку и открой снова — проверь что она сохранилась.' },
      { level:'medium', uk:'Додай поле input#ls-name "Ім\'я користувача". При saveNote() зберігай також localStorage.setItem("username", ...).',  ru:'Добавь поле input#ls-name "Имя пользователя". При saveNote() сохраняй также localStorage.setItem("username", ...).' },
      { level:'hard',   uk:'Зроби кнопку "Показати всі ключі": перебери Object.keys(localStorage) і виведи їх у нову div.',  ru:'Сделай кнопку "Показать все ключи": переберите Object.keys(localStorage) и выведи их в новый div.' },
    ]
  );

  /* ─── 09-11 ─────────────────────────────────────────────── */
  patch('09-11',
    { uk:`<h2>Таймери: setTimeout та setInterval</h2>
<p>JavaScript може виконувати код через певний час або з повторенням.</p>
<h3>setTimeout — один раз після затримки</h3>
<pre>const id = setTimeout(() => {
  console.log('Через 2 секунди!');
}, 2000); // мілісекунди

clearTimeout(id); // скасувати якщо ще не спрацював</pre>
<h3>setInterval — повторення кожні N мс</h3>
<pre>const id = setInterval(() => {
  console.log('Кожну секунду!');
}, 1000);

clearInterval(id); // зупинити</pre>
<h3>Типові застосування</h3>
<ul>
  <li>⏱ Таймер зворотного відліку</li>
  <li>🕐 Годинник, що оновлюється</li>
  <li>💬 Автозакриття сповіщень</li>
  <li>🎮 Ігровий цикл</li>
</ul>`,
      ru:`<h2>Таймеры: setTimeout и setInterval</h2>
<p>JavaScript может выполнять код через определённое время или с повторением.</p>
<h3>setTimeout — один раз</h3>
<pre>const id = setTimeout(() => {
  console.log('Через 2 секунды!');
}, 2000);
clearTimeout(id);</pre>
<h3>setInterval — повторение</h3>
<pre>const id = setInterval(() => {
  console.log('Каждую секунду!');
}, 1000);
clearInterval(id);</pre>` },
    `<div class="timer-demo">
  <!-- Годинник -->
  <div class="ev-section">
    <h3>🕐 Живий годинник</h3>
    <div class="clock" id="clock">--:--:--</div>
  </div>

  <!-- Таймер зворотного відліку -->
  <div class="ev-section">
    <h3>⏳ Таймер зворотного відліку</h3>
    <div class="cd-controls">
      <input type="number" id="cd-secs" value="10" min="1" max="999">
      <button id="cd-start" onclick="startCD()">▶ Старт</button>
      <button id="cd-stop"  onclick="stopCD()">⏹ Стоп</button>
    </div>
    <div class="countdown" id="countdown">--</div>
    <div class="cd-msg" id="cd-msg"></div>
  </div>

  <!-- Сповіщення з затримкою -->
  <div class="ev-section">
    <h3>💬 Сповіщення із setTimeout</h3>
    <div class="notif-btns">
      <button onclick="showNotif('Через 1 сек!',1000,'gr')">1 сек</button>
      <button onclick="showNotif('Через 3 сек!',3000,'bl')">3 сек</button>
      <button onclick="showNotif('Через 5 сек!',5000,'yw')">5 сек</button>
    </div>
    <div class="notif-area" id="notif-area"></div>
  </div>
</div>`,
    `${BASE}
.timer-demo{max-width:440px;display:flex;flex-direction:column;gap:12px}
.ev-section{background:#1e293b;border-radius:12px;padding:16px}
h3{font-size:14px;color:#94a3b8;margin-bottom:12px}
.clock{font-size:42px;font-weight:900;font-family:monospace;color:#4ade80;text-align:center;letter-spacing:.05em}
.cd-controls{display:flex;gap:8px;align-items:center;margin-bottom:12px}
.cd-controls input{width:80px;text-align:center;margin:0}
.countdown{font-size:54px;font-weight:900;font-family:monospace;color:#f8fafc;text-align:center;transition:color .3s}
.countdown.warn{color:#fbbf24;animation:pulse .5s ease infinite}
.countdown.done{color:#4ade80}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.cd-msg{text-align:center;font-size:14px;color:#94a3b8;margin-top:8px;min-height:24px}
.notif-btns{display:flex;gap:8px;margin-bottom:10px}
.notif-area{display:flex;flex-direction:column;gap:6px;min-height:30px}
.notif-item{background:#0f172a;border-radius:8px;padding:9px 14px;font-size:13px;animation:slideIn .3s ease-out}
@keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.gr{color:#4ade80}.bl{color:#60a5fa}.yw{color:#fbbf24}`,
    `// ── Годинник ──
function updateClock() {
  const n = new Date();
  const pad = x => String(x).padStart(2,'0');
  document.getElementById('clock').textContent =
    pad(n.getHours()) + ':' + pad(n.getMinutes()) + ':' + pad(n.getSeconds());
}
updateClock();
setInterval(updateClock, 1000);

// ── Зворотній відлік ──
let cdTimer = null;
let cdLeft  = 0;

function startCD() {
  if (cdTimer) clearInterval(cdTimer);
  cdLeft = parseInt(document.getElementById('cd-secs').value) || 10;
  const cd  = document.getElementById('countdown');
  const msg = document.getElementById('cd-msg');
  cd.textContent = cdLeft;
  cd.className   = 'countdown';
  msg.textContent = '';

  cdTimer = setInterval(() => {
    cdLeft--;
    cd.textContent = cdLeft;
    cd.className   = 'countdown' + (cdLeft <= 3 ? ' warn' : '');

    if (cdLeft <= 0) {
      clearInterval(cdTimer);
      cdTimer = null;
      cd.textContent = '🏁';
      cd.className   = 'countdown done';
      msg.textContent = '⏱ Час вийшов!';
    }
  }, 1000);
}
function stopCD() {
  if (cdTimer) { clearInterval(cdTimer); cdTimer = null; }
  document.getElementById('cd-msg').textContent = '⏹ Зупинено';
}

// ── Сповіщення ──
function showNotif(text, delay, cls) {
  setTimeout(() => {
    const area = document.getElementById('notif-area');
    const div  = document.createElement('div');
    div.className = 'notif-item ' + cls;
    div.textContent = '🔔 ' + text;
    area.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }, delay);
}`,
    [
      { level:'easy',   uk:'Натисни "▶ Старт" і перевір таймер. Спробуй зупинити до кінця.',  ru:'Нажми "▶ Старт" и проверь таймер. Попробуй остановить до конца.' },
      { level:'medium', uk:'Додай кнопку "⏸ Пауза": зберігай залишок при зупинці і продовжуй звідти при повторному старті.',  ru:'Добавь кнопку "⏸ Пауза": сохраняй остаток при остановке и продолжай оттуда при повторном старте.' },
      { level:'hard',   uk:'Зроби "поморанчевий годинник": щосекунди він змінює колір .clock між #4ade80 і #f59e0b (toggle через клас).',  ru:'Сделай "мигающие часы": каждую секунду меняй цвет .clock между #4ade80 и #f59e0b.' },
    ]
  );

  /* ─── 09-12 (ПРОЕКТ) ──────────────────────────────────────*/
  patch('09-12',
    { uk:`<h2>ПРОЕКТ: ToDo-список із localStorage</h2>
<p>Фінальний проект модуля 9 — класичний ToDo-список з усіма DOM-навичками разом.</p>
<h3>Що реалізовано</h3>
<ul>
  <li>✅ Додавання завдань (createElement, appendChild)</li>
  <li>✅ Позначення виконаних (classList.toggle)</li>
  <li>✅ Видалення (remove())</li>
  <li>✅ Фільтр «Всі / Активні / Виконані»</li>
  <li>✅ Збереження у localStorage (JSON)</li>
  <li>✅ Анімація появи і зникнення</li>
</ul>
<p>Вивчи код у вкладці JS — там зібрані всі теми модуля 9 в одному проекті. Додай кілька завдань і перезавантаж сторінку — вони збережуться!</p>`,
      ru:`<h2>ПРОЕКТ: ToDo-список с localStorage</h2>
<p>Финальный проект модуля 9 — классический ToDo-список со всеми DOM-навыками вместе.</p>
<h3>Что реализовано</h3>
<ul>
  <li>✅ Добавление задач (createElement, appendChild)</li>
  <li>✅ Отметка выполненных (classList.toggle)</li>
  <li>✅ Удаление (remove())</li>
  <li>✅ Фильтр «Все / Активные / Выполненные»</li>
  <li>✅ Сохранение в localStorage (JSON)</li>
</ul>` },
    `<div class="todo-app">
  <div class="todo-header">
    <h1>✅ Мої справи</h1>
    <div class="todo-stats" id="todo-stats">0 справ</div>
  </div>

  <div class="todo-add">
    <input type="text" id="todo-input" placeholder="Нова справа... (Enter або +)">
    <button id="add-btn" onclick="addTodo()">+</button>
  </div>

  <div class="todo-filters">
    <button class="filter-btn active" data-f="all"  onclick="setFilter('all',this)">Всі</button>
    <button class="filter-btn"        data-f="active" onclick="setFilter('active',this)">Активні</button>
    <button class="filter-btn"        data-f="done"   onclick="setFilter('done',this)">Виконані</button>
  </div>

  <ul class="todo-list" id="todo-list"></ul>

  <div class="todo-footer">
    <button onclick="clearDone()" class="btn-sm">🗑 Очистити виконані</button>
    <button onclick="clearAll()"  class="btn-sm btn-red">✕ Видалити всі</button>
  </div>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f8fafc;padding:20px;min-height:100vh}
.todo-app{max-width:440px;margin:0 auto}
.todo-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
h1{font-size:20px}
.todo-stats{font-size:12px;color:#64748b}
.todo-add{display:flex;gap:8px;margin-bottom:12px}
.todo-add input{flex:1;background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:11px 14px;border-radius:10px;font-size:14px}
.todo-add input:focus{outline:none;border-color:#059669;box-shadow:0 0 0 3px rgba(5,150,105,.2)}
.todo-add button{background:#059669;border:none;color:#fff;padding:11px 18px;border-radius:10px;font-size:22px;cursor:pointer;line-height:1;transition:.2s}
.todo-add button:hover{background:#047857}
.todo-filters{display:flex;gap:6px;margin-bottom:12px}
.filter-btn{background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:6px 14px;border-radius:8px;font-size:13px;cursor:pointer;transition:.2s}
.filter-btn.active{border-color:#059669;color:#4ade80;background:rgba(5,150,105,.12)}
.todo-list{list-style:none;display:flex;flex-direction:column;gap:6px;min-height:60px}
.todo-item{display:flex;align-items:center;gap:10px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:12px 14px;animation:slideIn .25s ease-out;transition:opacity .2s,border-color .2s}
@keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.todo-item.done{opacity:.55;border-color:#1e3a2f}
.todo-item.done .todo-text{text-decoration:line-through;color:#64748b}
.todo-item.hiding{animation:slideIn .2s ease-out reverse}
.todo-cb{width:18px;height:18px;accent-color:#059669;cursor:pointer;flex-shrink:0}
.todo-text{flex:1;font-size:14px;cursor:pointer}
.todo-del{background:none;border:none;color:#475569;font-size:16px;cursor:pointer;padding:2px 6px;border-radius:4px;transition:.2s}
.todo-del:hover{color:#f87171;background:rgba(239,68,68,.12)}
.todo-footer{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
.btn-sm{background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:7px 14px;border-radius:8px;font-size:12px;cursor:pointer;transition:.2s}
.btn-sm:hover{border-color:#94a3b8;color:#f8fafc}
.btn-red{border-color:#ef4444;color:#f87171}
.btn-red:hover{border-color:#f87171;background:rgba(239,68,68,.1)}`,
    `// ── Дані ──
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all';

// ── Збереження ──
function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// ── Рендер ──
function render() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  const visible = todos.filter(t =>
    filter === 'all'    ? true :
    filter === 'active' ? !t.done :
                           t.done
  );

  visible.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');

    const cb = document.createElement('input');
    cb.type    = 'checkbox';
    cb.className = 'todo-cb';
    cb.checked = todo.done;
    cb.addEventListener('change', () => {
      todo.done = cb.checked;
      save();
      render();
    });

    const span = document.createElement('span');
    span.className   = 'todo-text';
    span.textContent = todo.text;
    span.addEventListener('dblclick', () => {
      const нов = prompt('Редагувати:', todo.text);
      if (нов && нов.trim()) {
        todo.text = нов.trim();
        save();
        render();
      }
    });

    const del = document.createElement('button');
    del.className   = 'todo-del';
    del.textContent = '✕';
    del.addEventListener('click', () => {
      li.classList.add('hiding');
      setTimeout(() => {
        todos = todos.filter(t => t !== todo);
        save();
        render();
      }, 200);
    });

    li.append(cb, span, del);
    list.appendChild(li);
  });

  // Статистика
  const all  = todos.length;
  const done = todos.filter(t=>t.done).length;
  document.getElementById('todo-stats').textContent =
    \`\${all} справ · \${done} виконано · \${all-done} залишилось\`;
}

// ── Додати ──
function addTodo() {
  const inp = document.getElementById('todo-input');
  const text = inp.value.trim();
  if (!text) return;
  todos.push({ text, done:false, id: Date.now() });
  save();
  render();
  inp.value = '';
  inp.focus();
}

// ── Фільтр ──
function setFilter(f, btn) {
  filter = f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// ── Очистити ──
function clearDone() {
  todos = todos.filter(t => !t.done);
  save(); render();
}
function clearAll() {
  if (confirm('Видалити ВСІ справи?')) {
    todos = [];
    save(); render();
  }
}

// ── Enter ──
document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

// ── Початковий рендер ──
if (todos.length === 0) {
  todos = [
    { text:'Вивчити querySelector', done:true,  id:1 },
    { text:'Зробити Todo-список',   done:true,  id:2 },
    { text:'Опанувати localStorage',done:false, id:3 },
    { text:'Розпочати модуль 10',   done:false, id:4 },
  ];
  save();
}
render();`,
    [
      { level:'easy',   uk:'Додай 3 власні завдання. Закрий і відкрий вкладку — переконайся що вони збереглись.',  ru:'Добавь 3 своих задания. Закрой и открой вкладку — убедись что они сохранились.' },
      { level:'medium', uk:'Додай пріоритет до завдань: select зі значеннями "висока"/"середня"/"низька" у формі. Зберігай priority у todo-об\'єкті.',  ru:'Добавь приоритет к заданиям: select со значениями "высокий"/"средний"/"низкий" в форме. Сохраняй priority в todo-объекте.' },
      { level:'hard',   uk:'Додай drag-and-drop переміщення завдань: HTML5 draggable="true" і події dragstart, dragover, drop для зміни порядку у масиві todos.',  ru:'Добавь drag-and-drop перемещение задач: HTML5 draggable="true" и события dragstart, dragover, drop для изменения порядка в массиве todos.' },
      { level:'extra',  uk:'Додай пошук: input#search який фільтрує список у реальному часі (при введенні кожного символу) — показує лише завдання що містять текст запиту.',  ru:'Добавь поиск: input#search который фильтрует список в реальном времени — показывает только задачи содержащие текст запроса.' },
    ]
  );

})();
