/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 12 — Проект 2: Портфоліо · 10–14
   Патчить WEB_LESSONS після завантаження lessons.js
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
p{font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:8px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
button:hover{border-color:#0ea5e9;color:#7dd3fc}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}`;

  /* ─── 12-01: Планування портфоліо-сайту ──────────────────────── */
  patch('12-01',
    { uk:`<h2>Планування портфоліо-сайту: структура та секції</h2>
<p>Портфоліо — сайт-візитка розробника: показує, хто ти, що вмієш і які проекти зробив. Це другий великий проект курсу — робимо його так само крок за кроком, як квіз у модулі 11.</p>
<h3>Стандартні секції портфоліо</h3>
<pre>1. Header  — логотип + навігація (гамбургер на мобільному)
2. Hero    — велике привітання, анімований заголовок, кнопка "Написати"
3. Про мене — фото, короткий опис, факти (роки досвіду, к-сть проектів)
4. Навички — прогрес-бари або теги технологій
5. Проекти — сітка карток з фільтрацією по категорії
6. Контакти — форма зворотного зв'язку
7. Footer  — соцмережі, copyright</pre>
<h3>Порядок розробки в цьому модулі</h3>
<p>Ми будуємо сайт секція за секцією: спочатку Hero з анімацією, потім Навички, потім Проекти з фільтром і модальним вікном, потім навігація, тема і, нарешті, SEO та деплой.</p>`,
      ru:`<h2>Планирование портфолио-сайта: структура и секции</h2>
<p>Портфолио — сайт-визитка разработчика. Это второй большой проект курса — делаем его так же шаг за шагом, как квиз в модуле 11.</p>
<h3>Стандартные секции портфолио</h3>
<pre>1. Header  — логотип + навигация (гамбургер на мобильном)
2. Hero    — большое приветствие, анимированный заголовок, кнопка "Написать"
3. Обо мне — фото, краткое описание, факты
4. Навыки  — прогресс-бары или теги технологий
5. Проекты — сетка карточек с фильтрацией по категории
6. Контакты — форма обратной связи
7. Footer  — соцсети, copyright</pre>
<h3>Порядок разработки в этом модуле</h3>
<p>Строим сайт секция за секцией: сначала Hero с анимацией, потом Навыки, потом Проекты с фильтром и модальным окном, потом навигация, тема и SEO с деплоем.</p>` },
    `<div class="wf">
  <div class="wf-row">🧭 Header (лого + навігація)</div>
  <div class="wf-row wf-big">🚀 Hero (заголовок + кнопка)</div>
  <div class="wf-row">🙋 Про мене</div>
  <div class="wf-row">📊 Навички</div>
  <div class="wf-row wf-big">🗂 Проекти (сітка + фільтр)</div>
  <div class="wf-row">✉️ Контакти</div>
  <div class="wf-row">📎 Footer</div>
</div>`,
    `${BASE}
.wf{max-width:360px;display:flex;flex-direction:column;gap:8px}
.wf-row{border:2px dashed #475569;border-radius:10px;padding:14px;color:#94a3b8;font-size:13px}
.wf-big{padding:26px;color:#cbd5e1;font-weight:600}`,
    ``,
    [
      { level:'easy',   uk:'Перелічи всі 7 секцій wireframe вголос і поясни своїми словами, для чого потрібна кожна.', ru:'Перечисли все 7 секций wireframe вслух и объясни своими словами, для чего нужна каждая.' },
      { level:'medium', uk:'Додай у wireframe ще один рядок між Навичками і Проектами: "🎓 Освіта / Курси".', ru:'Добавь в wireframe ещё одну строку между Навыками и Проектами: "🎓 Образование / Курсы".' },
      { level:'hard',   uk:'Зміни клас <code>.wf-big</code> так, щоб великі секції мали суцільну (не пунктирну) рамку кольору <code>#0ea5e9</code> — щоб виділити найважливіші блоки.', ru:'Измени класс .wf-big так, чтобы большие секции имели сплошную рамку цвета #0ea5e9.' },
    ]
  );

  /* ─── 12-02: Hero із анімованим заголовком ────────────────────── */
  patch('12-02',
    { uk:`<h2>Hero із анімованим заголовком (CSS @keyframes)</h2>
<p>Hero — перше, що бачить відвідувач. Додамо ефект "друкарської машинки" та плавну появу підзаголовку через <code>@keyframes</code>.</p>
<h3>Ефект появи знизу з fade</h3>
<pre>@keyframes riseIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-title { animation: riseIn .7s ease both; }
.hero-sub   { animation: riseIn .7s ease .15s both; } /* затримка 0.15s */</pre>
<h3>Затримка (delay) для послідовної появи</h3>
<p>Другий і третій елементи отримують невелику <code>animation-delay</code>, щоб з'являтись по черзі, а не одночасно — це виглядає природніше.</p>
<h3>both у animation-fill-mode</h3>
<p>Значення <code>both</code> означає: елемент лишається у стані "from" ДО старту анімації і зберігає стан "to" ПІСЛЯ завершення — без цього елемент "блимнув" би в початковому вигляді на мить.</p>`,
      ru:`<h2>Hero с анимированным заголовком (CSS @keyframes)</h2>
<p>Hero — первое, что видит посетитель. Добавим плавное появление заголовка и подзаголовка через <code>@keyframes</code>.</p>
<h3>Эффект появления снизу с fade</h3>
<pre>@keyframes riseIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-title { animation: riseIn .7s ease both; }
.hero-sub   { animation: riseIn .7s ease .15s both; }</pre>
<h3>Задержка (delay) для последовательного появления</h3>
<p>Второй и третий элементы получают небольшую <code>animation-delay</code>, чтобы появляться по очереди.</p>
<h3>both в animation-fill-mode</h3>
<p>Значение <code>both</code>: элемент остаётся в состоянии "from" ДО старта анимации и сохраняет "to" ПОСЛЕ завершения.</p>` },
    `<section class="hero">
  <h1 class="hero-title">Привіт, я Аліна 👋</h1>
  <p class="hero-sub">Веб-розробниця · Роблю сайти, які запам'ятовуються</p>
  <button class="hero-btn">Написати мені</button>
</section>`,
    `${BASE}
.hero{text-align:center;padding:60px 20px;background:radial-gradient(ellipse at 50% 20%,#1e3a5f,#0f172a);border-radius:16px}
.hero-title{font-size:32px;font-weight:900;margin-bottom:10px;animation:riseIn .7s ease both}
.hero-sub{color:#94a3b8;font-size:14px;margin-bottom:20px;animation:riseIn .7s ease .15s both}
.hero-btn{background:#0ea5e9;color:#fff;border:none;padding:12px 26px;border-radius:10px;font-weight:700;cursor:pointer;animation:riseIn .7s ease .3s both}
@keyframes riseIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`,
    ``,
    [
      { level:'easy',   uk:'Перезапусти прев\'ю (кнопка ⟳) кілька разів і подивись, як три елементи з\'являються по черзі.', ru:'Перезапусти превью (кнопка ⟳) несколько раз и посмотри, как три элемента появляются по очереди.' },
      { level:'medium', uk:'Зміни затримку кнопки з .3s на .6s — вона з\'явиться помітно пізніше.', ru:'Измени задержку кнопки с .3s на .6s — она появится заметно позже.' },
      { level:'hard',   uk:'Зроби альтернативну анімацію <code>@keyframes zoomIn</code> (from: <code>opacity:0;transform:scale(.85)</code>) і застосуй її до <code>.hero-btn</code> замість riseIn.', ru:'Сделай альтернативную анимацию @keyframes zoomIn и примени её к .hero-btn вместо riseIn.' },
    ]
  );

  /* ─── 12-03: Секція «Навички» — анімовані progress-bar ─────────── */
  patch('12-03',
    { uk:`<h2>Секція «Навички»: анімовані progress-bar</h2>
<p>Прогрес-бар навички має "заповнюватись" при появі на екрані — це виглядає живіше, ніж статична смужка.</p>
<h3>Структура: обгортка + заповнення</h3>
<pre>&lt;div class="skill"&gt;
  &lt;div class="skill-label"&gt;HTML/CSS — 90%&lt;/div&gt;
  &lt;div class="skill-track"&gt;
    &lt;div class="skill-fill" data-percent="90"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
<h3>Анімація через JS (щоб взяти width із data-атрибута)</h3>
<pre>document.querySelectorAll('.skill-fill').forEach(fill => {
  const percent = fill.dataset.percent;
  setTimeout(() => { fill.style.width = percent + '%'; }, 100);
});</pre>
<p>Атрибут <code>data-percent</code> зберігає число окремо від CSS — так JS знає, до якого значення анімувати, а верстальник бачить відсоток прямо в HTML.</p>`,
      ru:`<h2>Секция «Навыки»: анимированные progress-bar</h2>
<p>Прогресс-бар навыка должен "заполняться" при появлении на экране.</p>
<h3>Структура: обёртка + заполнение</h3>
<pre>&lt;div class="skill"&gt;
  &lt;div class="skill-label"&gt;HTML/CSS — 90%&lt;/div&gt;
  &lt;div class="skill-track"&gt;
    &lt;div class="skill-fill" data-percent="90"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
<h3>Анимация через JS</h3>
<pre>document.querySelectorAll('.skill-fill').forEach(fill => {
  const percent = fill.dataset.percent;
  setTimeout(() => { fill.style.width = percent + '%'; }, 100);
});</pre>
<p>Атрибут <code>data-percent</code> хранит число отдельно от CSS.</p>` },
    `<div class="skills">
  <div class="skill">
    <div class="skill-label">HTML / CSS — 90%</div>
    <div class="skill-track"><div class="skill-fill" data-percent="90"></div></div>
  </div>
  <div class="skill">
    <div class="skill-label">JavaScript — 75%</div>
    <div class="skill-track"><div class="skill-fill" data-percent="75"></div></div>
  </div>
  <div class="skill">
    <div class="skill-label">Figma — 60%</div>
    <div class="skill-track"><div class="skill-fill" data-percent="60"></div></div>
  </div>
</div>
<button onclick="location.reload()" style="margin-top:14px">↺ Перезапустити анімацію</button>`,
    `${BASE}
.skills{max-width:380px;display:flex;flex-direction:column;gap:14px}
.skill-label{font-size:13px;color:#cbd5e1;margin-bottom:6px}
.skill-track{height:10px;background:#1e293b;border:1px solid #334155;border-radius:5px;overflow:hidden}
.skill-fill{width:0;height:100%;background:linear-gradient(90deg,#0ea5e9,#38bdf8);transition:width 1s ease}`,
    `document.querySelectorAll('.skill-fill').forEach(function (fill) {
  var percent = fill.dataset.percent;
  setTimeout(function () { fill.style.width = percent + '%'; }, 150);
});`,
    [
      { level:'easy',   uk:'Натисни "↺ Перезапустити анімацію" і подивись, як смужки заповнюються заново.', ru:'Нажми "↺ Перезапустить анимацию" и посмотри, как полоски заполняются заново.' },
      { level:'medium', uk:'Додай четвертий навик "Git — 80%" (label + track + fill з <code>data-percent="80"</code>).', ru:'Добавь четвёртый навык "Git — 80%".' },
      { level:'hard',   uk:'Зроби так, щоб колір <code>.skill-fill</code> залежав від відсотка: додай у JS перевірку — якщо percent < 70, задай <code>fill.style.background = \'#f59e0b\'</code> замість градієнта.', ru:'Сделай так, чтобы цвет .skill-fill зависел от процента: если меньше 70 — оранжевый вместо градиента.' },
    ]
  );

  /* ─── 12-04: Секція «Проекти» — ізотоп-сітка на JS ─────────────── */
  patch('12-04',
    { uk:`<h2>Секція «Проекти»: ізотоп-сітка на JS</h2>
<p>"Isotope-сітка" (isotope grid) — популярна назва для сітки карток, яка вміє красиво перебудовуватись при фільтрації чи зміні розміру. Зробимо власну спрощену версію на CSS Grid + JS, без важких бібліотек.</p>
<h3>CSS Grid як основа</h3>
<pre>.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
}</pre>
<h3>Дані проектів як масив об'єктів</h3>
<pre>const PROJECTS = [
  { title: 'Погодний застосунок', category: 'js',     emoji: '🌤️' },
  { title: 'Лендінг кав\'ярні',    category: 'design', emoji: '☕' },
  { title: 'Todo-список',         category: 'js',     emoji: '✅' },
];</pre>
<p>Так само, як з питаннями у квізі — один масив даних + одна функція рендеру означають, що додати новий проект можна просто дописавши об'єкт у масив.</p>`,
      ru:`<h2>Секция «Проекты»: изотоп-сетка на JS</h2>
<p>"Isotope-сетка" — популярное название для сетки карточек, красиво перестраивающейся при фильтрации. Сделаем свою упрощённую версию на CSS Grid + JS.</p>
<h3>CSS Grid как основа</h3>
<pre>.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
}</pre>
<h3>Данные проектов как массив объектов</h3>
<pre>const PROJECTS = [
  { title: 'Погодное приложение', category: 'js',     emoji: '🌤️' },
  { title: 'Лендинг кофейни',     category: 'design', emoji: '☕' },
  { title: 'Todo-список',         category: 'js',     emoji: '✅' },
];</pre>
<p>Один массив данных + одна функция рендера — добавить новый проект можно просто дописав объект.</p>` },
    `<div class="projects-grid" id="grid"></div>`,
    `${BASE}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
.proj-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;text-align:center;transition:.2s}
.proj-card:hover{border-color:#0ea5e9;transform:translateY(-4px)}
.proj-emoji{font-size:32px;margin-bottom:8px}
.proj-title{font-size:13px;font-weight:600}
.proj-cat{font-size:10px;color:#64748b;text-transform:uppercase;margin-top:4px}`,
    `var PROJECTS = [
  { title: 'Погодний застосунок', category: 'js',     emoji: '🌤️' },
  { title: 'Лендінг кав\\'ярні',    category: 'design', emoji: '☕' },
  { title: 'Todo-список',         category: 'js',     emoji: '✅' },
  { title: 'Портфоліо фотографа', category: 'design', emoji: '📷' },
];

function renderGrid() {
  var grid = document.getElementById('grid');
  grid.innerHTML = '';
  PROJECTS.forEach(function (p) {
    var card = document.createElement('div');
    card.className = 'proj-card';
    card.innerHTML =
      '<div class="proj-emoji">' + p.emoji + '</div>' +
      '<div class="proj-title">' + p.title + '</div>' +
      '<div class="proj-cat">' + p.category + '</div>';
    grid.appendChild(card);
  });
}
renderGrid();`,
    [
      { level:'easy',   uk:'Порахуй, скільки карток намалювалось, і порівняй з довжиною масиву PROJECTS.', ru:'Посчитай, сколько карточек нарисовалось, и сравни с длиной массива PROJECTS.' },
      { level:'medium', uk:'Додай п\'ятий проект у масив: { title: "Гра Хрестики-нолики", category: "js", emoji: "🎮" }.', ru:'Добавь пятый проект в массив: { title: "Игра Крестики-нолики", category: "js", emoji: "🎮" }.' },
      { level:'hard',   uk:'Додай у кожен об\'єкт проекту поле <code>year</code> (наприклад 2025) і виведи його маленьким текстом під <code>.proj-cat</code>.', ru:'Добавь в каждый проект поле year и выведи его под .proj-cat.' },
    ]
  );

  /* ─── 12-05: Фільтрація проектів по категорії ──────────────────── */
  patch('12-05',
    { uk:`<h2>Фільтрація проектів по категорії</h2>
<p>Додамо кнопки-фільтри над сіткою: "Всі", "JS", "Design" — клік ховає картки, що не відповідають категорії.</p>
<h3>Простий підхід: показати/сховати через клас</h3>
<pre>function applyFilter(category) {
  document.querySelectorAll('.proj-card').forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('hidden', !match);
  });
}</pre>
<pre>.proj-card.hidden { display: none; }</pre>
<h3>Активна кнопка фільтра</h3>
<p>Так само, як активна вкладка в редакторі коду — потрібно прибрати клас <code>active</code> з усіх кнопок і додати лише до натиснутої.</p>`,
      ru:`<h2>Фильтрация проектов по категории</h2>
<p>Добавим кнопки-фильтры над сеткой: "Все", "JS", "Design".</p>
<h3>Простой подход: показать/скрыть через класс</h3>
<pre>function applyFilter(category) {
  document.querySelectorAll('.proj-card').forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('hidden', !match);
  });
}</pre>
<pre>.proj-card.hidden { display: none; }</pre>
<h3>Активная кнопка фильтра</h3>
<p>Нужно убрать класс active со всех кнопок и добавить только к нажатой.</p>` },
    `<div class="filters" id="filters"></div>
<div class="projects-grid" id="grid"></div>`,
    `${BASE}
.filters{display:flex;gap:8px;margin-bottom:14px}
.filter-btn{background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:7px 16px;border-radius:20px;font-size:12px;cursor:pointer}
.filter-btn.active{border-color:#0ea5e9;color:#7dd3fc;background:rgba(14,165,233,.1)}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
.proj-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;text-align:center}
.proj-card.hidden{display:none}
.proj-emoji{font-size:32px;margin-bottom:8px}
.proj-title{font-size:13px;font-weight:600}`,
    `var PROJECTS = [
  { title: 'Погодний застосунок', category: 'js',     emoji: '🌤️' },
  { title: 'Лендінг кав\\'ярні',    category: 'design', emoji: '☕' },
  { title: 'Todo-список',         category: 'js',     emoji: '✅' },
  { title: 'Портфоліо фотографа', category: 'design', emoji: '📷' },
];
var CATS = [ { key:'all', label:'Всі' }, { key:'js', label:'JS' }, { key:'design', label:'Design' } ];

function renderFilters() {
  var box = document.getElementById('filters');
  box.innerHTML = CATS.map(function (c, i) {
    return '<button class="filter-btn' + (i === 0 ? ' active' : '') + '" data-cat="' + c.key + '">' + c.label + '</button>';
  }).join('');
  box.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      box.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.dataset.cat);
    });
  });
}

function renderGrid() {
  var grid = document.getElementById('grid');
  grid.innerHTML = '';
  PROJECTS.forEach(function (p) {
    var card = document.createElement('div');
    card.className = 'proj-card';
    card.dataset.category = p.category;
    card.innerHTML = '<div class="proj-emoji">' + p.emoji + '</div><div class="proj-title">' + p.title + '</div>';
    grid.appendChild(card);
  });
}

function applyFilter(category) {
  document.querySelectorAll('.proj-card').forEach(function (card) {
    var match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('hidden', !match);
  });
}

renderFilters();
renderGrid();`,
    [
      { level:'easy',   uk:'Натисни всі три фільтри по черзі і переконайся, що картки правильно ховаються/показуються.', ru:'Нажми все три фильтра по очереди и убедись, что карточки правильно скрываются/показываются.' },
      { level:'medium', uk:'Додай четверту категорію у CATS: { key:"3d", label:"3D" } і один проект з <code>category:"3d"</code>.', ru:'Добавь четвёртую категорию в CATS: { key:"3d", label:"3D" } и один проект с category:"3d".' },
      { level:'hard',   uk:'Зроби так, щоб при відсутності проектів у категорії (порожній результат фільтра) з\'являвся текст "Проектів у цій категорії поки немає" — додай перевірку кількості видимих карток.', ru:'Сделай так, чтобы при отсутствии проектов в категории появлялся текст "Проектов в этой категории пока нет".' },
    ]
  );

  /* ─── 12-06: Модальне вікно з детальним описом проекту ─────────── */
  patch('12-06',
    { uk:`<h2>Модальне вікно з детальним описом проекту</h2>
<p>Клік по картці проекту відкриває модальне вікно з деталями — назва, опис, технології — без переходу на нову сторінку.</p>
<h3>Структура модалки</h3>
<pre>&lt;div class="modal-overlay hidden" id="overlay"&gt;
  &lt;div class="modal"&gt;
    &lt;button class="modal-close"&gt;✕&lt;/button&gt;
    &lt;div id="modal-body"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
<h3>Показ і закриття</h3>
<pre>function openModal(project) {
  modalBody.innerHTML = '&lt;h3&gt;' + project.title + '&lt;/h3&gt;&lt;p&gt;' + project.desc + '&lt;/p&gt;';
  overlay.classList.remove('hidden');
}
function closeModal() { overlay.classList.add('hidden'); }
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });</pre>
<p>Перевірка <code>e.target === overlay</code> дозволяє закрити модалку кліком по темному фону, але НЕ по самому вікну.</p>`,
      ru:`<h2>Модальное окно с подробным описанием проекта</h2>
<p>Клик по карточке проекта открывает модальное окно с деталями — без перехода на новую страницу.</p>
<h3>Структура модалки</h3>
<pre>&lt;div class="modal-overlay hidden" id="overlay"&gt;
  &lt;div class="modal"&gt;
    &lt;button class="modal-close"&gt;✕&lt;/button&gt;
    &lt;div id="modal-body"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
<h3>Показ и закрытие</h3>
<pre>function openModal(project) {
  modalBody.innerHTML = '&lt;h3&gt;' + project.title + '&lt;/h3&gt;&lt;p&gt;' + project.desc + '&lt;/p&gt;';
  overlay.classList.remove('hidden');
}
function closeModal() { overlay.classList.add('hidden'); }
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });</pre>
<p>Проверка e.target === overlay позволяет закрыть модалку кликом по тёмному фону, но НЕ по самому окну.</p>` },
    `<div class="projects-grid" id="grid"></div>

<div class="modal-overlay hidden" id="overlay">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div id="modal-body"></div>
  </div>
</div>`,
    `${BASE}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
.proj-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;text-align:center;cursor:pointer}
.proj-card:hover{border-color:#0ea5e9}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:100}
.modal-overlay.hidden{display:none}
.modal{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:26px;max-width:340px;position:relative}
.modal-close{position:absolute;top:10px;right:12px;background:none;border:none;color:#64748b;font-size:16px;cursor:pointer}
#modal-body h3{font-size:16px;margin-bottom:8px}
#modal-body p{font-size:13px;color:#94a3b8}`,
    `var PROJECTS = [
  { title: 'Погодний застосунок', emoji: '🌤️', desc: 'Показує погоду по місту через Open-Meteo API, з прогнозом на 5 днів.' },
  { title: 'Todo-список',         emoji: '✅', desc: 'Список справ зі збереженням у localStorage і фільтром "активні/виконані".' },
];

function renderGrid() {
  var grid = document.getElementById('grid');
  grid.innerHTML = '';
  PROJECTS.forEach(function (p, i) {
    var card = document.createElement('div');
    card.className = 'proj-card';
    card.innerHTML = '<div style="font-size:32px;margin-bottom:8px">' + p.emoji + '</div><div style="font-size:13px;font-weight:600">' + p.title + '</div>';
    card.addEventListener('click', function () { openModal(i); });
    grid.appendChild(card);
  });
}

function openModal(index) {
  var p = PROJECTS[index];
  document.getElementById('modal-body').innerHTML = '<h3>' + p.emoji + ' ' + p.title + '</h3><p>' + p.desc + '</p>';
  document.getElementById('overlay').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('overlay').classList.add('hidden');
}
document.getElementById('overlay').addEventListener('click', function (e) {
  if (e.target.id === 'overlay') closeModal();
});

renderGrid();`,
    [
      { level:'easy',   uk:'Клікни по обох картках і переконайся, що модалка показує правильний опис для кожної.', ru:'Кликни по обеим карточкам и убедись, что модалка показывает правильное описание для каждой.' },
      { level:'medium', uk:'Додай третій проект у масив PROJECTS зі своїм описом.', ru:'Добавь третий проект в массив PROJECTS со своим описанием.' },
      { level:'hard',   uk:'Додай можливість закрити модалку клавішею Escape: <code>document.addEventListener(\'keydown\', e => { if (e.key === \'Escape\') closeModal(); })</code>.', ru:'Добавь возможность закрыть модалку клавишей Escape.' },
    ]
  );

  /* ─── 12-07: Форма зворотного зв'язку із EmailJS ───────────────── */
  patch('12-07',
    { uk:`<h2>Форма зворотного зв'язку із EmailJS</h2>
<p>Статичний сайт (без бекенду) не може сам відправляти листи. <strong>EmailJS</strong> — сервіс, що дозволяє відправляти email прямо з клієнтського JS через готовий API, без власного сервера.</p>
<h3>Реальна інтеграція (поза цією пісочницею)</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  emailjs.init('ТВІЙ_PUBLIC_KEY');

  form.addEventListener('submit', e => {
    e.preventDefault();
    emailjs.sendForm('service_id', 'template_id', form)
      .then(() => showSuccess())
      .catch(err => showError(err));
  });
&lt;/script&gt;</pre>
<h3>Що імітуємо в цьому уроці</h3>
<p>Оскільки для реального EmailJS потрібен акаунт і ключі, у демо ми симулюємо мережевий запит через <code>setTimeout</code> — так само виглядає логіка "показати завантаження → показати успіх", яку ти напишеш і з реальним EmailJS.</p>`,
      ru:`<h2>Форма обратной связи с EmailJS</h2>
<p>Статический сайт (без бэкенда) не может сам отправлять письма. <strong>EmailJS</strong> — сервис, позволяющий отправлять email прямо из клиентского JS без своего сервера.</p>
<h3>Реальная интеграция (вне этой песочницы)</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  emailjs.init('ТВОЙ_PUBLIC_KEY');
  form.addEventListener('submit', e => {
    e.preventDefault();
    emailjs.sendForm('service_id', 'template_id', form)
      .then(() => showSuccess())
      .catch(err => showError(err));
  });
&lt;/script&gt;</pre>
<h3>Что имитируем в этом уроке</h3>
<p>Для реального EmailJS нужен аккаунт и ключи, поэтому в демо мы симулируем сетевой запрос через setTimeout — логика "показать загрузку → показать успех" та же самая, что и с реальным EmailJS.</p>` },
    `<form class="contact-form" id="form">
  <input type="text" placeholder="Твоє ім'я" required>
  <input type="email" placeholder="Email" required>
  <textarea rows="3" placeholder="Повідомлення" required></textarea>
  <button type="submit" id="submit-btn">Надіслати</button>
</form>
<div id="form-status" style="margin-top:10px;font-size:13px"></div>`,
    `${BASE}
.contact-form{max-width:360px;display:flex;flex-direction:column;gap:10px}
.contact-form input,.contact-form textarea{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:10px 12px;border-radius:8px;font-size:13px;font-family:inherit;resize:vertical}
.contact-form button{background:#0ea5e9;color:#fff;border:none;font-weight:700}
.status-ok{color:#4ade80}
.status-err{color:#f87171}`,
    `document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  var btn = document.getElementById('submit-btn');
  var status = document.getElementById('form-status');
  btn.disabled = true;
  btn.textContent = 'Надсилаємо...';
  status.textContent = '';

  setTimeout(function () {
    btn.disabled = false;
    btn.textContent = 'Надіслати';
    status.textContent = '✅ Повідомлення надіслано! Я відповім протягом дня.';
    status.className = 'status-ok';
    e.target.reset();
  }, 1200);
});`,
    [
      { level:'easy',   uk:'Заповни форму і натисни "Надіслати" — подивись на симуляцію завантаження і повідомлення успіху.', ru:'Заполни форму и нажми "Отправить" — посмотри на симуляцию загрузки и сообщение успеха.' },
      { level:'medium', uk:'Зміни затримку setTimeout з 1200 на 2500 мс.', ru:'Измени задержку setTimeout с 1200 на 2500 мс.' },
      { level:'hard',   uk:'Додай симуляцію помилки: якщо поле email не містить символ "@" (перевір через <code>e.target[1].value.includes(\'@\')</code>), показуй <code>status-err</code> з текстом "❌ Перевір email" замість успіху.', ru:'Добавь симуляцию ошибки: если email не содержит "@", показывай ошибку вместо успеха.' },
    ]
  );

  /* ─── 12-08: Адаптивна навігація з гамбургером ─────────────────── */
  patch('12-08',
    { uk:`<h2>Адаптивна навігація з гамбургером</h2>
<p>На вузьких екранах горизонтальне меню не влазить — ховаємо його за іконкою "гамбургер" (☰), яка розкриває випадаюче меню.</p>
<h3>HTML і базова логіка</h3>
<pre>&lt;button class="burger" id="burger"&gt;☰&lt;/button&gt;
&lt;nav class="nav" id="nav"&gt;
  &lt;a href="#about"&gt;Про мене&lt;/a&gt;
  &lt;a href="#projects"&gt;Проекти&lt;/a&gt;
&lt;/nav&gt;</pre>
<pre>burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});</pre>
<h3>CSS: приховати меню на вузьких екранах</h3>
<pre>@media (max-width: 640px) {
  .nav { display: none; }
  .nav.open { display: flex; flex-direction: column; }
  .burger { display: block; }
}</pre>`,
      ru:`<h2>Адаптивная навигация с гамбургером</h2>
<p>На узких экранах горизонтальное меню не влезает — прячем его за иконкой "гамбургер" (☰).</p>
<h3>HTML и базовая логика</h3>
<pre>&lt;button class="burger" id="burger"&gt;☰&lt;/button&gt;
&lt;nav class="nav" id="nav"&gt;
  &lt;a href="#about"&gt;Обо мне&lt;/a&gt;
  &lt;a href="#projects"&gt;Проекты&lt;/a&gt;
&lt;/nav&gt;</pre>
<pre>burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});</pre>
<h3>CSS: скрыть меню на узких экранах</h3>
<pre>@media (max-width: 640px) {
  .nav { display: none; }
  .nav.open { display: flex; flex-direction: column; }
  .burger { display: block; }
}</pre>` },
    `<header class="topbar">
  <span class="logo">✨ Аліна</span>
  <button class="burger" id="burger">☰</button>
  <nav class="nav" id="nav">
    <a href="#">Про мене</a>
    <a href="#">Навички</a>
    <a href="#">Проекти</a>
    <a href="#">Контакти</a>
  </nav>
</header>
<p style="margin-top:14px;font-size:12px;color:#64748b">Стисни вікно прев'ю або зменш екран, щоб побачити гамбургер у дії.</p>`,
    `${BASE}
.topbar{display:flex;align-items:center;justify-content:space-between;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px 18px;position:relative}
.logo{font-weight:700}
.nav{display:flex;gap:16px}
.nav a{color:#94a3b8;font-size:13px}
.burger{display:none;background:none;border:none;color:#f1f5f9;font-size:20px;cursor:pointer}
@media (max-width:480px){
  .nav{display:none;position:absolute;top:100%;left:0;right:0;background:#1e293b;flex-direction:column;padding:12px;gap:10px;border:1px solid #334155;border-top:none;border-radius:0 0 12px 12px}
  .nav.open{display:flex}
  .burger{display:block}
}`,
    `var burger = document.getElementById('burger');
var nav = document.getElementById('nav');
burger.addEventListener('click', function () {
  nav.classList.toggle('open');
});`,
    [
      { level:'easy',   uk:'Зменш ширину прев\'ю до мобільного розміру і натисни ☰ — переконайся, що меню розкривається.', ru:'Уменьши ширину превью до мобильного размера и нажми ☰.' },
      { level:'medium', uk:'Додай п\'ятий пункт меню "Блог" в кінець <code>.nav</code>.', ru:'Добавь пятый пункт меню "Блог" в конец .nav.' },
      { level:'hard',   uk:'Зроби так, щоб іконка гамбургера змінювалась на "✕" коли меню відкрите: <code>burger.textContent = nav.classList.contains(\'open\') ? \'✕\' : \'☰\'</code> всередині обробника кліку.', ru:'Сделай так, чтобы иконка гамбургера менялась на "✕" когда меню открыто.' },
    ]
  );

  /* ─── 12-09: Анімація при прокрутці — Intersection Observer ────── */
  patch('12-09',
    { uk:`<h2>Анімація при прокрутці (Intersection Observer)</h2>
<p><code>IntersectionObserver</code> повідомляє, коли елемент з'являється у видимій області екрана — ідеально для "reveal-on-scroll" анімацій без обробки <code>scroll</code>-події вручну.</p>
<h3>Базовий шаблон</h3>
<pre>const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // більше не стежимо
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));</pre>
<h3>CSS для переходу</h3>
<pre>.reveal { opacity: 0; transform: translateY(20px); transition: .6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }</pre>
<p><code>threshold: 0.2</code> означає "спрацювати, коли видно 20% елемента" — можна налаштувати чутливість.</p>`,
      ru:`<h2>Анимация при прокрутке (Intersection Observer)</h2>
<p><code>IntersectionObserver</code> сообщает, когда элемент появляется в видимой области экрана.</p>
<h3>Базовый шаблон</h3>
<pre>const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));</pre>
<h3>CSS для перехода</h3>
<pre>.reveal { opacity: 0; transform: translateY(20px); transition: .6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }</pre>` },
    `<p style="margin-bottom:10px">Прокрути вниз усередині прев'ю — картки з'являться по черзі:</p>
<div class="scroll-area" id="scroll-area">
  <div class="spacer"></div>
  <div class="reveal">🎯 Блок 1 — з'явився при прокрутці</div>
  <div class="reveal">🚀 Блок 2 — з'явився при прокрутці</div>
  <div class="reveal">✨ Блок 3 — з'явився при прокрутці</div>
</div>`,
    `${BASE}
.scroll-area{max-height:220px;overflow-y:auto;border:1px solid #334155;border-radius:12px;padding:16px}
.spacer{height:100px}
.reveal{opacity:0;transform:translateY(20px);transition:.5s ease;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:16px;margin-bottom:12px;font-size:13px}
.reveal.visible{opacity:1;transform:translateY(0)}`,
    `var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { root: document.getElementById('scroll-area'), threshold: 0.3 });

document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });`,
    [
      { level:'easy',   uk:'Прокрути область вниз і подивись, як картки з\'являються по черзі.', ru:'Прокрути область вниз и посмотри, как карточки появляются по очереди.' },
      { level:'medium', uk:'Додай четвертий <code>.reveal</code>-блок "🏆 Блок 4".', ru:'Добавь четвёртый .reveal-блок "🏆 Блок 4".' },
      { level:'hard',   uk:'Зміни <code>threshold</code> з 0.3 на 0.8 — переконайся, що блоки тепер з\'являються пізніше (коли видно 80% блока).', ru:'Измени threshold с 0.3 на 0.8 — блоки будут появляться позже.' },
    ]
  );

  /* ─── 12-10: Темна / світла тема з запам'ятовуванням ───────────── */
  patch('12-10',
    { uk:`<h2>Темна / світла тема з запам'ятовуванням</h2>
<p>Перемикач теми має "пам'ятати" вибір користувача навіть після перезавантаження сторінки — зберігаємо вибір у <code>localStorage</code> і застосовуємо його одразу при завантаженні.</p>
<h3>Застосування теми при старті</h3>
<pre>const saved = localStorage.getItem('portfolio-theme') || 'dark';
document.body.dataset.theme = saved;
themeBtn.textContent = saved === 'dark' ? '🌙' : '☀️';</pre>
<h3>Перемикач і збереження</h3>
<pre>function toggleTheme() {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
}</pre>
<p>Важливо: код застосування теми при старті має виконатись <strong>одразу</strong>, ще до першого малюнка сторінки — інакше буде помітний "спалах" неправильної теми на долю секунди.</p>`,
      ru:`<h2>Тёмная / светлая тема с запоминанием</h2>
<p>Переключатель темы должен "помнить" выбор пользователя даже после перезагрузки — сохраняем выбор в localStorage.</p>
<h3>Применение темы при старте</h3>
<pre>const saved = localStorage.getItem('portfolio-theme') || 'dark';
document.body.dataset.theme = saved;
themeBtn.textContent = saved === 'dark' ? '🌙' : '☀️';</pre>
<h3>Переключатель и сохранение</h3>
<pre>function toggleTheme() {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
}</pre>` },
    `<button onclick="toggleTheme()" id="theme-btn">🌙</button>
<div class="card" style="margin-top:14px">
  <h3>Аліна Коваль</h3>
  <p>Веб-розробниця, люблю JavaScript і каву ☕</p>
</div>`,
    `:root{ --bg:#0f172a; --card:#1e293b; --text:#f1f5f9; --border:#334155; }
[data-theme="light"]{ --bg:#f8fafc; --card:#ffffff; --text:#0f172a; --border:#e2e8f0; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);padding:20px;transition:.3s}
#theme-btn{background:var(--card);border:1px solid var(--border);color:var(--text);padding:9px 14px;border-radius:8px;cursor:pointer;font-size:16px}
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;transition:.3s}
.card h3{margin-bottom:6px}
.card p{font-size:13px;color:#94a3b8}`,
    `var saved = localStorage.getItem('portfolio-theme') || 'dark';
document.body.dataset.theme = saved;
document.getElementById('theme-btn').textContent = saved === 'dark' ? '🌙' : '☀️';

function toggleTheme() {
  var next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  document.getElementById('theme-btn').textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('portfolio-theme', next);
}`,
    [
      { level:'easy',   uk:'Перемкни тему і перезапусти прев\'ю (⟳) — переконайся, що вибрана тема залишилась.', ru:'Переключи тему и перезапусти превью — убедись, что выбранная тема осталась.' },
      { level:'medium', uk:'Додай третю CSS-змінну <code>--accent</code> (#0ea5e9 темна / #2563eb світла) і застосуй її до кольору заголовка h3.', ru:'Добавь третью CSS-переменную --accent и примени её к цвету заголовка h3.' },
      { level:'hard',   uk:'Додай кнопку "Скинути тему", яка викликає <code>localStorage.removeItem(\'portfolio-theme\')</code> — після перезапуску прев\'ю тема повернеться до dark за замовчуванням.', ru:'Добавь кнопку "Сбросить тему", вызывающую localStorage.removeItem.' },
    ]
  );

  /* ─── 12-11: Smooth scroll та активний пункт навігації ─────────── */
  patch('12-11',
    { uk:`<h2>Smooth scroll та активний пункт навігації</h2>
<p>Клік по пункту меню має плавно прокручувати до потрібної секції, а сам пункт меню — підсвічуватись активним, коли ця секція видима.</p>
<h3>Плавна прокрутка через CSS</h3>
<pre>html { scroll-behavior: smooth; }</pre>
<p>Найпростіший спосіб — одна властивість CSS, і всі посилання <code>&lt;a href="#section"&gt;</code> автоматично прокручують плавно.</p>
<h3>Активний пункт при прокрутці (IntersectionObserver)</h3>
<pre>const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector('.nav a[href="#' + entry.target.id + '"]')
        ?.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));</pre>`,
      ru:`<h2>Smooth scroll и активный пункт навигации</h2>
<p>Клик по пункту меню должен плавно прокручивать к нужной секции, а сам пункт — подсвечиваться активным.</p>
<h3>Плавная прокрутка через CSS</h3>
<pre>html { scroll-behavior: smooth; }</pre>
<h3>Активный пункт при прокрутке</h3>
<pre>const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector('.nav a[href="#' + entry.target.id + '"]')
        ?.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));</pre>` },
    `<nav class="nav" id="nav">
  <a href="#s1" class="active">Розділ 1</a>
  <a href="#s2">Розділ 2</a>
  <a href="#s3">Розділ 3</a>
</nav>
<div class="scroll-area" id="scroll-area">
  <section id="s1" class="sec">Розділ 1 — прокрути вниз</section>
  <section id="s2" class="sec">Розділ 2 — уже видно?</section>
  <section id="s3" class="sec">Розділ 3 — фінальний</section>
</div>`,
    `html{scroll-behavior:smooth}
${BASE}
.nav{display:flex;gap:10px;margin-bottom:10px}
.nav a{color:#94a3b8;font-size:12px;padding:6px 12px;border-radius:8px;border:1px solid #334155}
.nav a.active{color:#7dd3fc;border-color:#0ea5e9;background:rgba(14,165,233,.1)}
.scroll-area{max-height:220px;overflow-y:auto;border:1px solid #334155;border-radius:12px}
.sec{height:200px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#cbd5e1;border-bottom:1px solid #334155}`,
    `var navLinks = document.querySelectorAll('#nav a');
var sections = document.querySelectorAll('.sec');

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function (link) { link.classList.remove('active'); });
      var active = document.querySelector('#nav a[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, { root: document.getElementById('scroll-area'), threshold: 0.6 });

sections.forEach(function (s) { observer.observe(s); });`,
    [
      { level:'easy',   uk:'Прокрути область вниз і подивись, як активний пункт меню змінюється залежно від видимого розділу.', ru:'Прокрути область вниз и посмотри, как активный пункт меню меняется в зависимости от видимого раздела.' },
      { level:'medium', uk:'Додай четвертий розділ <code>&lt;section id="s4"&gt;</code> і відповідний пункт меню <code>&lt;a href="#s4"&gt;</code>.', ru:'Добавь четвёртый раздел и соответствующий пункт меню.' },
      { level:'hard',   uk:'Клікни по пункту меню — переконайся, що <code>scroll-behavior:smooth</code> плавно прокручує до розділу (може знадобитись <code>scrollIntoView({behavior:\'smooth\'})</code> замість звичайного якір-переходу для області з overflow).', ru:'Кликни по пункту меню — убедись в плавной прокрутке.' },
    ]
  );

  /* ─── 12-12: Оптимізація — lazy images, preload fonts ──────────── */
  patch('12-12',
    { uk:`<h2>Оптимізація: lazy images, preload fonts</h2>
<p>Швидкість завантаження впливає і на досвід користувача, і на SEO. Два простих, але потужних прийоми: лінива загрузка зображень і попереднє завантаження шрифтів.</p>
<h3>Lazy loading зображень</h3>
<pre>&lt;img src="photo.jpg" alt="Фото" loading="lazy"&gt;</pre>
<p>Атрибут <code>loading="lazy"</code> — вбудована функція браузера: зображення поза екраном не завантажуються, поки користувач не прокрутить до них.</p>
<h3>Preload шрифтів</h3>
<pre>&lt;link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin&gt;</pre>
<p>Це каже браузеру: "завантаж цей шрифт якомога раніше" — уникаємо ефекту "блимання невидимим текстом" (FOIT).</p>
<h3>Інші прийоми</h3>
<ul>
  <li><code>&lt;img width height&gt;</code> — щоб уникнути "стрибків" верстки під час завантаження</li>
  <li>WebP/AVIF замість JPEG — менший розмір при тій самій якості</li>
</ul>`,
      ru:`<h2>Оптимизация: lazy images, preload fonts</h2>
<p>Скорость загрузки влияет и на опыт пользователя, и на SEO.</p>
<h3>Lazy loading изображений</h3>
<pre>&lt;img src="photo.jpg" alt="Фото" loading="lazy"&gt;</pre>
<p>Атрибут loading="lazy" — встроенная функция браузера: изображения вне экрана не загружаются, пока пользователь не прокрутит к ним.</p>
<h3>Preload шрифтов</h3>
<pre>&lt;link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin&gt;</pre>
<h3>Другие приёмы</h3>
<ul>
  <li><code>&lt;img width height&gt;</code> — чтобы избежать "прыжков" вёрстки</li>
  <li>WebP/AVIF вместо JPEG — меньший размер при том же качестве</li>
</ul>` },
    `<h2>Порівняння: з атрибутами і без</h2>
<pre style="background:#1e293b;border:1px solid #f87171;border-radius:10px;padding:14px;font-size:12px;white-space:pre-wrap">&lt;img src="photo.jpg"&gt;</pre>
<pre style="background:#1e293b;border:1px solid #4ade80;border-radius:10px;padding:14px;font-size:12px;white-space:pre-wrap;margin-top:10px">&lt;img src="photo.jpg" alt="Портрет розробниці" width="320" height="240" loading="lazy"&gt;</pre>
<button onclick="checkAttrs()" style="margin-top:10px">Перевірити переваги</button>
<div id="out" style="margin-top:10px;font-size:12.5px;color:#94a3b8"></div>`,
    `${BASE}`,
    `function checkAttrs() {
  document.getElementById('out').innerHTML =
    '✅ alt — доступність для screen reader і SEO<br>' +
    '✅ width/height — немає "стрибка" верстки під час завантаження<br>' +
    '✅ loading="lazy" — зображення поза екраном не гальмують сторінку';
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і прочитай список переваг другого варіанта img.', ru:'Нажми кнопку и прочитай список преимуществ второго варианта img.' },
      { level:'medium', uk:'Додай у "хороший" приклад <code>&lt;img&gt;</code> ще один атрибут <code>decoding="async"</code> — знайди в теорії або погугли, для чого він.', ru:'Добавь в "хороший" пример img ещё один атрибут decoding="async".' },
      { level:'hard',   uk:'Додай у функцію <code>checkAttrs()</code> четвертий пункт про <code>&lt;link rel="preload"&gt;</code> для шрифтів.', ru:'Добавь в checkAttrs() четвёртый пункт про preload шрифтов.' },
    ]
  );

  /* ─── 12-13: SEO — мета-теги, og:-теги, JSON-LD ────────────────── */
  patch('12-13',
    { uk:`<h2>SEO: мета-теги, og:-теги, JSON-LD</h2>
<p>SEO (Search Engine Optimization) — робота над тим, щоб сайт краще показувався в пошуку і виглядав привабливо, коли ним діляться в соцмережах.</p>
<h3>Базові мета-теги</h3>
<pre>&lt;title&gt;Аліна Коваль — Веб-розробниця&lt;/title&gt;
&lt;meta name="description" content="Портфоліо веб-розробниці: проекти на JS, HTML, CSS"&gt;
&lt;link rel="canonical" href="https://alina.dev/"&gt;</pre>
<h3>Open Graph (og:) — прев'ю в соцмережах</h3>
<pre>&lt;meta property="og:title" content="Аліна Коваль — Портфоліо"&gt;
&lt;meta property="og:description" content="Веб-розробниця, проекти на JS"&gt;
&lt;meta property="og:image" content="https://alina.dev/preview.jpg"&gt;</pre>
<h3>JSON-LD — структуровані дані для Google</h3>
<pre>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Аліна Коваль",
  "jobTitle": "Веб-розробниця"
}
&lt;/script&gt;</pre>
<p>JSON-LD допомагає Google показати "розширений" результат пошуку — наприклад, картку людини чи організації прямо у видачі.</p>`,
      ru:`<h2>SEO: мета-теги, og:-теги, JSON-LD</h2>
<p>SEO — работа над тем, чтобы сайт лучше показывался в поиске и выглядел привлекательно при шаринге в соцсетях.</p>
<h3>Базовые мета-теги</h3>
<pre>&lt;title&gt;Алина Коваль — Веб-разработчица&lt;/title&gt;
&lt;meta name="description" content="Портфолио веб-разработчицы"&gt;
&lt;link rel="canonical" href="https://alina.dev/"&gt;</pre>
<h3>Open Graph (og:) — превью в соцсетях</h3>
<pre>&lt;meta property="og:title" content="Алина Коваль — Портфолио"&gt;
&lt;meta property="og:description" content="Веб-разработчица, проекты на JS"&gt;
&lt;meta property="og:image" content="https://alina.dev/preview.jpg"&gt;</pre>
<h3>JSON-LD — структурированные данные для Google</h3>
<pre>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Алина Коваль",
  "jobTitle": "Веб-разработчица"
}
&lt;/script&gt;</pre>` },
    `<h2>Генератор SEO-тегів</h2>
<input type="text" id="site-title" placeholder="Назва сайту" value="Аліна Коваль — Веб-розробниця" style="width:100%;padding:9px;margin-bottom:8px;background:#1e293b;border:1px solid #334155;color:#f1f5f9;border-radius:8px">
<input type="text" id="site-desc" placeholder="Опис" value="Портфоліо веб-розробниці: проекти на JS, HTML, CSS" style="width:100%;padding:9px;margin-bottom:10px;background:#1e293b;border:1px solid #334155;color:#f1f5f9;border-radius:8px">
<button onclick="generateTags()">Згенерувати теги</button>
<pre id="tags-out" style="margin-top:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:11.5px;white-space:pre-wrap;color:#94a3b8"></pre>`,
    `${BASE}`,
    `function generateTags() {
  var title = document.getElementById('site-title').value || 'Мій сайт';
  var desc = document.getElementById('site-desc').value || 'Опис сайту';

  document.getElementById('tags-out').textContent =
    '<title>' + title + '</title>\\n' +
    '<meta name="description" content="' + desc + '">\\n\\n' +
    '<meta property="og:title" content="' + title + '">\\n' +
    '<meta property="og:description" content="' + desc + '">\\n' +
    '<meta property="og:type" content="website">';
}
generateTags();`,
    [
      { level:'easy',   uk:'Зміни назву і опис у полях і натисни "Згенерувати теги" — подивись на результат.', ru:'Измени название и описание в полях и нажми "Сгенерировать теги".' },
      { level:'medium', uk:'Додай у результат ще один рядок: <code>og:image</code> з якимось посиланням на зображення.', ru:'Добавь в результат ещё одну строку: og:image.' },
      { level:'hard',   uk:'Додай перевірку: якщо опис довший за 160 символів, виведи попередження над тегами "⚠ Опис задовгий для Google (>160 символів)".', ru:'Добавь проверку: если описание длиннее 160 символов, выведи предупреждение.' },
    ]
  );

  /* ─── 12-14: Deploy — GitHub Pages або Netlify ─────────────────── */
  patch('12-14',
    { uk:`<h2>Deploy: GitHub Pages або Netlify</h2>
<p>Готовий сайт треба опублікувати, щоб його побачив хтось інший. Два найпростіші безкоштовні варіанти для статичних сайтів.</p>
<h3>GitHub Pages</h3>
<pre>1. Заливаєш код у репозиторій на GitHub (git push)
2. Settings → Pages → Source: branch "main"
3. Сайт з'являється за https://user.github.io/repo/</pre>
<h3>Netlify (drag & drop)</h3>
<pre>1. netlify.com → New site → "Deploy manually"
2. Перетягуєш папку проекту прямо у браузер
3. Сайт одразу онлайн за випадковою адресою на netlify.app</pre>
<h3>Що обрати?</h3>
<p><strong>GitHub Pages</strong> — простіше, якщо код уже на GitHub. <strong>Netlify</strong> — швидше для першого разу (навіть без git), плюс безкоштовний HTTPS, форми і preview-посилання на кожен pull request.</p>`,
      ru:`<h2>Deploy: GitHub Pages или Netlify</h2>
<p>Готовый сайт нужно опубликовать, чтобы его увидел кто-то другой.</p>
<h3>GitHub Pages</h3>
<pre>1. Заливаешь код в репозиторий на GitHub (git push)
2. Settings → Pages → Source: branch "main"
3. Сайт появляется по https://user.github.io/repo/</pre>
<h3>Netlify (drag & drop)</h3>
<pre>1. netlify.com → New site → "Deploy manually"
2. Перетаскиваешь папку проекта прямо в браузер
3. Сайт сразу онлайн по случайному адресу на netlify.app</pre>
<h3>Что выбрать?</h3>
<p><strong>GitHub Pages</strong> — проще, если код уже на GitHub. <strong>Netlify</strong> — быстрее для первого раза, плюс бесплатный HTTPS, формы и preview-ссылки на каждый pull request.</p>` },
    `<div class="btn-row">
  <button onclick="deployGH()">🐙 Deploy на GitHub Pages</button>
  <button onclick="deployNetlify()">▲ Deploy на Netlify</button>
</div>
<div class="term" id="t14">$ Проект готовий до публікації</div>`,
    `${BASE}
.term{background:#000;border:1px solid #334155;border-radius:10px;padding:14px;font-family:Consolas,monospace;font-size:12.5px;color:#a3e635;min-height:100px;white-space:pre-wrap;margin-top:10px}
.term-ok{color:#4ade80}
.term-dim{color:#64748b}`,
    `function log(text, cls) {
  var t = document.getElementById('t14');
  t.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  t.scrollTop = t.scrollHeight;
}

function deployGH() {
  log('$ git push origin main');
  log('$ Settings → Pages → Source: main', 'term-dim');
  log('✔ Сайт опубліковано: https://alina.github.io/portfolio/', 'term-ok');
}

function deployNetlify() {
  log('$ Перетягнуто папку у netlify.com/drop', 'term-dim');
  log('Uploading... 12 files', 'term-dim');
  log('✔ Сайт опубліковано: https://alina-portfolio.netlify.app/', 'term-ok');
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і порівняй фейкові адреси публікації.', ru:'Нажми обе кнопки и сравни фейковые адреса публикации.' },
      { level:'medium', uk:'Зміни адресу в <code>deployGH()</code> на свій вигаданий нікнейм замість "alina".', ru:'Измени адрес в deployGH() на свой вымышленный никнейм.' },
      { level:'hard',   uk:'Додай третю кнопку "Deploy на Vercel", яка виводить схожу симуляцію з адресою на <code>.vercel.app</code>.', ru:'Добавь третью кнопку "Deploy на Vercel" с похожей симуляцией.' },
    ]
  );

  /* ─── 12-15: ФІНАЛ 2 — Портфоліо-сайт ──────────────────────────── */
  patch('12-15',
    { uk:`<h2>ФІНАЛ 2: Портфоліо-сайт</h2>
<p>Фінальний проект модуля — повне портфоліо, що поєднує все вивчене: анімований Hero, навички з прогрес-барами, сітку проектів із фільтром і модальним вікном, гамбургер-навігацію, тему з запам'ятовуванням і форму зв'язку.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ Hero з анімацією появи (@keyframes)</li>
  <li>✅ Навички з анімованими progress-bar</li>
  <li>✅ Проекти: сітка + фільтр за категорією + модальне вікно</li>
  <li>✅ Адаптивна навігація з гамбургером</li>
  <li>✅ Темна / світла тема, збережена в localStorage</li>
  <li>✅ Форма зв'язку з симуляцією відправки</li>
</ul>
<p>Відкрий вкладку JS і подивись повний код — це вже справжня структура невеликого проекту-візитки.</p>`,
      ru:`<h2>ФИНАЛ 2: Портфолио-сайт</h2>
<p>Финальный проект модуля — полное портфолио, объединяющее всё изученное: анимированный Hero, навыки с progress-bar, сетку проектов с фильтром и модальным окном, гамбургер-навигацию, тему с запоминанием и форму связи.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ Hero с анимацией появления</li>
  <li>✅ Навыки с анимированными progress-bar</li>
  <li>✅ Проекты: сетка + фильтр + модальное окно</li>
  <li>✅ Адаптивная навигация с гамбургером</li>
  <li>✅ Тёмная / светлая тема в localStorage</li>
  <li>✅ Форма связи с симуляцией отправки</li>
</ul>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<style>
:root{ --bg:#0f172a; --card:#1e293b; --text:#f1f5f9; --border:#334155; --accent:#0ea5e9; }
[data-theme="light"]{ --bg:#f8fafc; --card:#ffffff; --text:#0f172a; --border:#e2e8f0; }
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);transition:.3s}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;position:sticky;top:0;background:var(--bg);border-bottom:1px solid var(--border);z-index:50}
.logo{font-weight:700}
.nav{display:flex;gap:16px;align-items:center}
.nav a{color:#94a3b8;font-size:13px}
.burger{display:none;background:none;border:none;color:var(--text);font-size:20px;cursor:pointer}
#theme-btn{background:var(--card);border:1px solid var(--border);color:var(--text);padding:6px 12px;border-radius:8px;cursor:pointer}
@media (max-width:640px){
  .nav{display:none;position:absolute;top:100%;left:0;right:0;background:var(--card);flex-direction:column;padding:14px;gap:12px;border-bottom:1px solid var(--border)}
  .nav.open{display:flex}
  .burger{display:block}
}
.hero{text-align:center;padding:60px 20px;background:radial-gradient(ellipse at 50% 20%,#1e3a5f,var(--bg))}
.hero-title{font-size:30px;font-weight:900;margin-bottom:10px;animation:riseIn .7s ease both}
.hero-sub{color:#94a3b8;font-size:14px;margin-bottom:18px;animation:riseIn .7s ease .15s both}
.hero-btn{background:var(--accent);color:#fff;border:none;padding:11px 24px;border-radius:10px;font-weight:700;cursor:pointer;animation:riseIn .7s ease .3s both}
@keyframes riseIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
section{padding:40px 24px;max-width:760px;margin:0 auto}
h2{font-size:20px;margin-bottom:18px}
.skills{display:flex;flex-direction:column;gap:12px;max-width:400px}
.skill-label{font-size:13px;color:#cbd5e1;margin-bottom:4px}
.skill-track{height:9px;background:var(--card);border:1px solid var(--border);border-radius:5px;overflow:hidden}
.skill-fill{width:0;height:100%;background:linear-gradient(90deg,#0ea5e9,#38bdf8);transition:width 1s ease}
.filters{display:flex;gap:8px;margin-bottom:14px}
.filter-btn{background:var(--card);border:1px solid var(--border);color:#94a3b8;padding:6px 14px;border-radius:20px;font-size:12px;cursor:pointer}
.filter-btn.active{border-color:var(--accent);color:#7dd3fc}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px}
.proj-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;text-align:center;cursor:pointer;transition:.2s}
.proj-card:hover{border-color:var(--accent);transform:translateY(-3px)}
.proj-card.hidden{display:none}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:100}
.modal-overlay.hidden{display:none}
.modal{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:24px;max-width:320px;position:relative}
.modal-close{position:absolute;top:8px;right:10px;background:none;border:none;color:#64748b;font-size:16px;cursor:pointer}
.contact-form{display:flex;flex-direction:column;gap:10px;max-width:360px}
.contact-form input,.contact-form textarea{background:var(--card);border:1px solid var(--border);color:var(--text);padding:10px 12px;border-radius:8px;font-size:13px;font-family:inherit}
.contact-form button{background:var(--accent);color:#fff;border:none;padding:11px;border-radius:8px;font-weight:700;cursor:pointer}
footer{text-align:center;padding:20px;color:#64748b;font-size:12px;border-top:1px solid var(--border)}
</style>
</head>
<body>
<header class="topbar">
  <span class="logo">✨ Аліна</span>
  <button class="burger" id="burger">☰</button>
  <nav class="nav" id="nav">
    <a href="#skills">Навички</a>
    <a href="#projects">Проекти</a>
    <a href="#contact">Контакти</a>
    <button id="theme-btn">🌙</button>
  </nav>
</header>

<section class="hero">
  <h1 class="hero-title">Привіт, я Аліна 👋</h1>
  <p class="hero-sub">Веб-розробниця · Роблю сайти, які запам'ятовуються</p>
  <button class="hero-btn" onclick="document.getElementById('contact').scrollIntoView()">Написати мені</button>
</section>

<section id="skills">
  <h2>Навички</h2>
  <div class="skills">
    <div><div class="skill-label">HTML / CSS — 90%</div><div class="skill-track"><div class="skill-fill" data-percent="90"></div></div></div>
    <div><div class="skill-label">JavaScript — 75%</div><div class="skill-track"><div class="skill-fill" data-percent="75"></div></div></div>
    <div><div class="skill-label">Figma — 60%</div><div class="skill-track"><div class="skill-fill" data-percent="60"></div></div></div>
  </div>
</section>

<section id="projects">
  <h2>Проекти</h2>
  <div class="filters" id="filters"></div>
  <div class="grid" id="grid"></div>
</section>

<section id="contact">
  <h2>Контакти</h2>
  <form class="contact-form" id="form">
    <input type="text" placeholder="Твоє ім'я" required>
    <input type="email" placeholder="Email" required>
    <textarea rows="3" placeholder="Повідомлення" required></textarea>
    <button type="submit" id="submit-btn">Надіслати</button>
  </form>
  <div id="form-status" style="margin-top:8px;font-size:13px;color:#4ade80"></div>
</section>

<footer>© 2026 Аліна Коваль · Портфоліо-проект Веб-Академії</footer>

<div class="modal-overlay hidden" id="overlay">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div id="modal-body"></div>
  </div>
</div>

<script>
var PROJECTS = [
  { title: 'Погодний застосунок', category: 'js', emoji: '🌤️', desc: 'Погода по місту через Open-Meteo API з прогнозом на 5 днів.' },
  { title: 'Лендінг кав\\'ярні', category: 'design', emoji: '☕', desc: 'Односторінковий лендінг з анімаціями та адаптивною версткою.' },
  { title: 'Todo-список', category: 'js', emoji: '✅', desc: 'Список справ зі збереженням у localStorage.' },
  { title: 'Портфоліо фотографа', category: 'design', emoji: '📷', desc: 'Галерея робіт з фільтрацією по жанру фотографії.' }
];
var CATS = [ { key: 'all', label: 'Всі' }, { key: 'js', label: 'JS' }, { key: 'design', label: 'Design' } ];

document.querySelectorAll('.skill-fill').forEach(function (fill) {
  var percent = fill.dataset.percent;
  setTimeout(function () { fill.style.width = percent + '%'; }, 200);
});

function renderFilters() {
  var box = document.getElementById('filters');
  box.innerHTML = CATS.map(function (c, i) {
    return '<button class="filter-btn' + (i === 0 ? ' active' : '') + '" data-cat="' + c.key + '">' + c.label + '</button>';
  }).join('');
  box.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      box.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.dataset.cat);
    });
  });
}

function renderGrid() {
  var grid = document.getElementById('grid');
  grid.innerHTML = '';
  PROJECTS.forEach(function (p, i) {
    var card = document.createElement('div');
    card.className = 'proj-card';
    card.dataset.category = p.category;
    card.innerHTML = '<div style="font-size:28px;margin-bottom:6px">' + p.emoji + '</div><div style="font-size:13px;font-weight:600">' + p.title + '</div>';
    card.addEventListener('click', function () { openModal(i); });
    grid.appendChild(card);
  });
}

function applyFilter(category) {
  document.querySelectorAll('.proj-card').forEach(function (card) {
    var match = category === 'all' || card.dataset.category === category;
    card.classList.toggle('hidden', !match);
  });
}

function openModal(index) {
  var p = PROJECTS[index];
  document.getElementById('modal-body').innerHTML = '<h3>' + p.emoji + ' ' + p.title + '</h3><p style="font-size:13px;color:#94a3b8;margin-top:8px">' + p.desc + '</p>';
  document.getElementById('overlay').classList.remove('hidden');
}
function closeModal() { document.getElementById('overlay').classList.add('hidden'); }
document.getElementById('overlay').addEventListener('click', function (e) {
  if (e.target.id === 'overlay') closeModal();
});

document.getElementById('burger').addEventListener('click', function () {
  document.getElementById('nav').classList.toggle('open');
});

var savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
document.body.dataset.theme = savedTheme;
document.getElementById('theme-btn').textContent = savedTheme === 'dark' ? '🌙' : '☀️';
document.getElementById('theme-btn').addEventListener('click', function () {
  var next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  this.textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('portfolio-theme', next);
});

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  var btn = document.getElementById('submit-btn');
  var status = document.getElementById('form-status');
  btn.disabled = true;
  btn.textContent = 'Надсилаємо...';
  setTimeout(function () {
    btn.disabled = false;
    btn.textContent = 'Надіслати';
    status.textContent = '✅ Дякую! Повідомлення надіслано.';
    e.target.reset();
  }, 1000);
});

renderFilters();
renderGrid();
<\/script>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Проскрольте всю сторінку зверху вниз — перевір, що всі секції (Hero, Навички, Проекти, Контакти) працюють.', ru:'Прокрути всю страницу сверху вниз — проверь, что все секции работают.' },
      { level:'medium', uk:'Додай у масив PROJECTS п\'ятий проект зі своєю назвою, категорією та описом.', ru:'Добавь в массив PROJECTS пятый проект со своим названием, категорией и описанием.' },
      { level:'hard',   uk:'Додай у секцію "Про мене" (нову <code>&lt;section id="about"&gt;</code> між hero і skills) короткий опис про себе і посилання на неї в навігації.', ru:'Добавь секцию "Обо мне" между hero и skills с коротким описанием и ссылкой в навигации.' },
      { level:'extra',  uk:'Об\'єднай форму з уроку 12-07: додай перевірку на "@" у email перед показом успіху, і показуй помилку червоним кольором, якщо перевірка не пройшла.', ru:'Объедини форму с уроком 12-07: добавь проверку на "@" в email перед показом успеха.' },
    ]
  );

})();
