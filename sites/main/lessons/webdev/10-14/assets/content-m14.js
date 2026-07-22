/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 14 — Проект 4: Блог · 10–14
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
input{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:9px 12px;border-radius:8px;font-size:13px}
button{background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
button:hover{border-color:#a78bfa;color:#c4b5fd}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.post-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:16px;margin-bottom:10px;cursor:pointer;transition:.2s}
.post-card:hover{border-color:#a78bfa}
.post-title{font-size:14px;font-weight:700;margin-bottom:4px}
.post-meta{font-size:11px;color:#64748b}`;

  /* ─── 14-01: Планування блогу без бекенду ────────────────────── */
  patch('14-01',
    { uk:`<h2>Планування блогу без бекенду</h2>
<p>Останній проект курсу — блог. Особливість: він працює <strong>без сервера й бази даних</strong> — усі пости зберігаються прямо у файлі з даними (JSON), а сайт — звичайний статичний HTML/CSS/JS.</p>
<h3>Що вміє наш блог</h3>
<ul>
  <li>Список постів + сторінка окремого поста (роутинг через #hash)</li>
  <li>Форматування тексту через Markdown (marked.js)</li>
  <li>Категорії, теги, пошук у реальному часі, пагінація</li>
  <li>Коментарі та лічильник переглядів у localStorage</li>
  <li>Темна тема, RSS-стрічка, SEO-теги, кнопки "поширити"</li>
</ul>
<h3>Чому "без бекенду" — це нормально?</h3>
<p>Для блогу, де контент оновлюється не щохвилини, а раз на день/тиждень, статичний сайт із JSON-файлом — цілком робоче й дешеве рішення (плюс легко хостити на GitHub Pages чи Netlify, як ти вже вмієш з модуля 10).</p>
<h3>Wireframe</h3>
<pre>┌─────────────────────────┐
│ 🏠 Мій Блог      🌙 🔍   │
├─────────────────────────┤
│ [Всі] [JS] [CSS] [Життя] │
│                          │
│  ┌───────────────────┐   │
│  │ Заголовок посту 1 │   │
│  │ 12 лип · 3 коментарі│  │
│  └───────────────────┘   │
│  ┌───────────────────┐   │
│  │ Заголовок посту 2 │   │
│  └───────────────────┘   │
│                          │
│      « 1  2  3 »         │
└─────────────────────────┘</pre>`,
      ru:`<h2>Планирование блога без бэкенда</h2>
<p>Последний проект курса — блог. Особенность: он работает <strong>без сервера и базы данных</strong> — все посты хранятся прямо в файле с данными (JSON), а сайт — обычный статический HTML/CSS/JS.</p>
<h3>Что умеет наш блог</h3>
<ul>
  <li>Список постов + страница отдельного поста (роутинг через #hash)</li>
  <li>Форматирование текста через Markdown (marked.js)</li>
  <li>Категории, теги, поиск в реальном времени, пагинация</li>
  <li>Комментарии и счётчик просмотров в localStorage</li>
  <li>Тёмная тема, RSS-лента, SEO-теги, кнопки "поделиться"</li>
</ul>
<h3>Почему "без бэкенда" — это нормально?</h3>
<p>Для блога, где контент обновляется не каждую минуту, статический сайт с JSON-файлом — вполне рабочее и дешёвое решение.</p>
<h3>Wireframe</h3>
<pre>┌─────────────────────────┐
│ 🏠 Мой Блог      🌙 🔍   │
├─────────────────────────┤
│ [Все] [JS] [CSS] [Жизнь] │
│                          │
│  ┌───────────────────┐   │
│  │ Заголовок поста 1 │   │
│  │ 12 июл · 3 комм.  │   │
│  └───────────────────┘   │
│  ┌───────────────────┐   │
│  │ Заголовок поста 2 │   │
│  └───────────────────┘   │
│                          │
│      « 1  2  3 »         │
└─────────────────────────┘</pre>` },
    `<div class="wf">
  <div class="wf-row">🏠 Header (лого + тема + пошук)</div>
  <div class="wf-row">🏷️ Фільтр категорій</div>
  <div class="wf-row wf-big">📰 Список постів (картки)</div>
  <div class="wf-row">« Пагінація »</div>
</div>`,
    `${BASE}
.wf{max-width:360px;display:flex;flex-direction:column;gap:8px}
.wf-row{border:2px dashed #475569;border-radius:10px;padding:14px;color:#94a3b8;font-size:13px}
.wf-big{padding:26px;color:#cbd5e1;font-weight:600}`,
    ``,
    [
      { level:'easy',   uk:'Перелічи вголос усі можливості блогу зі списку в теорії.', ru:'Перечисли вслух все возможности блога из списка в теории.' },
      { level:'medium', uk:'Додай у wireframe рядок "📄 Сторінка окремого посту" між списком постів і пагінацією.', ru:'Добавь в wireframe строку "📄 Страница отдельного поста".' },
      { level:'hard',   uk:'Поясни своїми словами, чому блог без бекенду не підійде, якщо потрібна форма реєстрації користувачів із паролями.', ru:'Объясни своими словами, почему блог без бэкенда не подойдёт, если нужна форма регистрации пользователей с паролями.' },
    ]
  );

  /* ─── 14-02: Дані у JSON-файлах ───────────────────────────────── */
  patch('14-02',
    { uk:`<h2>Дані у JSON-файлах: пости, автори, категорії</h2>
<p>Усі пости блогу зберігаються в одному масиві об'єктів — так само, як питання квізу чи проекти портфоліо.</p>
<h3>Форма одного поста</h3>
<pre>{
  id: 1,
  title: 'Як я вивчила JavaScript за літо',
  category: 'js',
  tags: ['javascript', 'навчання'],
  author: 'Аліна Коваль',
  date: '2026-07-01',
  excerpt: 'Короткий уривок для списку постів...',
  content: '## Заголовок\\n\\nТекст у **Markdown**-форматі.'
}</pre>
<h3>excerpt vs content</h3>
<p><strong>excerpt</strong> — короткий уривок для картки в списку (щоб не показувати весь текст одразу). <strong>content</strong> — повний текст, показується лише на сторінці окремого поста.</p>
<h3>Чому масив, а не окремі файли?</h3>
<p>Для невеликого блогу (десятки постів) один масив у JS-файлі простіший за окремий .json на кожен пост — усе завантажується одним запитом.</p>`,
      ru:`<h2>Данные в JSON-файлах: посты, авторы, категории</h2>
<p>Все посты блога хранятся в одном массиве объектов.</p>
<h3>Форма одного поста</h3>
<pre>{
  id: 1,
  title: 'Как я выучила JavaScript за лето',
  category: 'js',
  tags: ['javascript', 'обучение'],
  author: 'Алина Коваль',
  date: '2026-07-01',
  excerpt: 'Короткий отрывок для списка постов...',
  content: '## Заголовок\\n\\nТекст в **Markdown**-формате.'
}</pre>
<h3>excerpt vs content</h3>
<p><strong>excerpt</strong> — короткий отрывок для карточки в списке. <strong>content</strong> — полный текст, показывается только на странице отдельного поста.</p>
<h3>Почему массив, а не отдельные файлы?</h3>
<p>Для небольшого блога один массив в JS-файле проще отдельного .json на каждый пост.</p>` },
    `<h2>Дані блогу</h2>
<button onclick="showPosts()">Показати масив POSTS</button>
<pre id="out" style="margin-top:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:12px;white-space:pre-wrap;color:#94a3b8"></pre>`,
    `${BASE}`,
    `var POSTS = [
  { id: 1, title: 'Як я вивчила JavaScript за літо', category: 'js', author: 'Аліна', date: '2026-07-01', excerpt: 'Розповідь про перші кроки у програмуванні.' },
  { id: 2, title: 'CSS Grid vs Flexbox', category: 'css', author: 'Аліна', date: '2026-06-20', excerpt: 'Коли використовувати що і чому.' },
  { id: 3, title: 'Мій перший хакатон', category: 'life', author: 'Аліна', date: '2026-06-05', excerpt: 'Враження від участі у шкільному хакатоні.' },
];

function showPosts() {
  document.getElementById('out').textContent = POSTS.map(function (p) {
    return '#' + p.id + ' [' + p.category + '] ' + p.title + '\\n   ' + p.author + ' · ' + p.date + '\\n   ' + p.excerpt;
  }).join('\\n\\n');
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись на всі три пости у масиві.', ru:'Нажми кнопку и посмотри на все три поста в массиве.' },
      { level:'medium', uk:'Додай четвертий пост у масив POSTS зі своєю темою.', ru:'Добавь четвёртый пост в массив POSTS на свою тему.' },
      { level:'hard',   uk:'Додай до кожного поста поле <code>tags</code> (масив рядків, наприклад <code>[\'javascript\',\'навчання\']</code>) і виведи теги через кому в <code>showPosts()</code>.', ru:'Добавь к каждому посту поле tags (массив строк) и выведи теги через запятую.' },
    ]
  );

  /* ─── 14-03: Список постів — fetch + рендеринг ──────────────────── */
  patch('14-03',
    { uk:`<h2>Список постів: fetch + рендеринг</h2>
<p>У реальному проекті дані блогу зазвичай лежать в окремому <code>posts.json</code> і завантажуються через <code>fetch()</code>. У цій пісочниці (без власного сервера файлів) ми симулюємо той самий процес через <code>Promise</code> — код виглядає і поводиться так само, як справжній fetch.</p>
<h3>Симуляція мережевого запиту</h3>
<pre>function fetchPosts() {
  return new Promise(resolve => {
    setTimeout(() => resolve(POSTS), 400); // ніби "затримка мережі"
  });
}

async function init() {
  const posts = await fetchPosts();
  renderPosts(posts);
}</pre>
<h3>Рендер списку карток</h3>
<pre>function renderPosts(posts) {
  list.innerHTML = posts.map(p => \`
    &lt;div class="post-card" data-id="${'$'}{p.id}"&gt;
      &lt;div class="post-title"&gt;${'$'}{p.title}&lt;/div&gt;
      &lt;div class="post-meta"&gt;${'$'}{p.author} · ${'$'}{p.date}&lt;/div&gt;
    &lt;/div&gt;\`).join('');
}</pre>`,
      ru:`<h2>Список постов: fetch + рендеринг</h2>
<p>В реальном проекте данные блога обычно лежат в отдельном posts.json и загружаются через fetch(). В этой песочнице (без своего файлового сервера) мы симулируем тот же процесс через Promise — код выглядит и ведёт себя так же, как настоящий fetch.</p>
<h3>Симуляция сетевого запроса</h3>
<pre>function fetchPosts() {
  return new Promise(resolve => {
    setTimeout(() => resolve(POSTS), 400);
  });
}

async function init() {
  const posts = await fetchPosts();
  renderPosts(posts);
}</pre>
<h3>Рендер списка карточек</h3>
<pre>function renderPosts(posts) {
  list.innerHTML = posts.map(p => \`
    &lt;div class="post-card" data-id="${'$'}{p.id}"&gt;
      &lt;div class="post-title"&gt;${'$'}{p.title}&lt;/div&gt;
    &lt;/div&gt;\`).join('');
}</pre>` },
    `<div id="list">Завантаження...</div>`,
    `${BASE}`,
    `var POSTS = [
  { id: 1, title: 'Як я вивчила JavaScript за літо', category: 'js', author: 'Аліна', date: '2026-07-01' },
  { id: 2, title: 'CSS Grid vs Flexbox', category: 'css', author: 'Аліна', date: '2026-06-20' },
  { id: 3, title: 'Мій перший хакатон', category: 'life', author: 'Аліна', date: '2026-06-05' },
];

function fetchPosts() {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve(POSTS); }, 400);
  });
}

function renderPosts(posts) {
  document.getElementById('list').innerHTML = posts.map(function (p) {
    return '<div class="post-card"><div class="post-title">' + p.title + '</div><div class="post-meta">' + p.author + ' · ' + p.date + '</div></div>';
  }).join('');
}

async function init() {
  var posts = await fetchPosts();
  renderPosts(posts);
}
init();`,
    [
      { level:'easy',   uk:'Дочекайся завантаження ("400мс затримки") і подивись на список постів.', ru:'Дождись загрузки (400мс задержки) и посмотри на список постов.' },
      { level:'medium', uk:'Зміни затримку <code>setTimeout</code> з 400 на 1500 мс — переконайся, що текст "Завантаження..." видно довше.', ru:'Измени задержку setTimeout с 400 на 1500 мс.' },
      { level:'hard',   uk:'Додай четвертий пост у масив POSTS і переконайся, що <code>renderPosts()</code> автоматично показує його без змін у самій функції рендеру.', ru:'Добавь четвёртый пост в массив POSTS и убедись, что renderPosts() автоматически его показывает.' },
    ]
  );

  /* ─── 14-04: Сторінка посту — динамічний роутинг через #hash ───── */
  patch('14-04',
    { uk:`<h2>Сторінка посту: динамічний роутинг через #hash</h2>
<p>Без справжнього сервера немає "справжніх" URL типу <code>/posts/3</code>. Рішення — <strong>hash-роутинг</strong>: адреса виду <code>#/post/3</code>, яку JS читає й вирішує, що показати.</p>
<h3>Слухаємо зміну hash</h3>
<pre>window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

function render() {
  const hash = location.hash; // наприклад "#/post/3"
  const match = hash.match(/#\\/post\\/(\\d+)/);
  if (match) {
    showPost(Number(match[1]));
  } else {
    showList();
  }
}</pre>
<h3>Перехід між сторінками</h3>
<pre>&lt;a href="#/post/3"&gt;Читати далі →&lt;/a&gt;</pre>
<p>Клік по такому посиланню міняє <code>location.hash</code>, що автоматично викликає подію <code>hashchange</code> — і наша функція <code>render()</code> перемальовує сторінку, без перезавантаження і без сервера.</p>`,
      ru:`<h2>Страница поста: динамический роутинг через #hash</h2>
<p>Без настоящего сервера нет "настоящих" URL вида /posts/3. Решение — <strong>hash-роутинг</strong>: адрес вида #/post/3, который JS читает и решает, что показать.</p>
<h3>Слушаем изменение hash</h3>
<pre>window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

function render() {
  const hash = location.hash;
  const match = hash.match(/#\\/post\\/(\\d+)/);
  if (match) {
    showPost(Number(match[1]));
  } else {
    showList();
  }
}</pre>
<h3>Переход между страницами</h3>
<pre>&lt;a href="#/post/3"&gt;Читать далее →&lt;/a&gt;</pre>
<p>Клик по такой ссылке меняет location.hash, что автоматически вызывает событие hashchange.</p>` },
    `<div id="app"></div>`,
    `${BASE}`,
    `var POSTS = [
  { id: 1, title: 'Як я вивчила JavaScript за літо', content: 'Повний текст першого посту про навчання програмуванню...' },
  { id: 2, title: 'CSS Grid vs Flexbox', content: 'Повний текст про різницю між Grid і Flexbox...' },
];

function showList() {
  document.getElementById('app').innerHTML = '<h2>Всі пости</h2>' + POSTS.map(function (p) {
    return '<div class="post-card"><a href="#/post/' + p.id + '" style="color:inherit;text-decoration:none"><div class="post-title">' + p.title + '</div></a></div>';
  }).join('');
}

function showPost(id) {
  var post = POSTS.find(function (p) { return p.id === id; });
  if (!post) { document.getElementById('app').innerHTML = '<p>Пост не знайдено</p><a href="#">← Назад</a>'; return; }
  document.getElementById('app').innerHTML =
    '<a href="#" style="color:#a78bfa;font-size:13px">← Всі пости</a>' +
    '<h2 style="margin-top:10px">' + post.title + '</h2>' +
    '<p>' + post.content + '</p>';
}

function render() {
  var hash = location.hash;
  var match = hash.match(/#\\/post\\/(\\d+)/);
  if (match) showPost(Number(match[1]));
  else showList();
}

window.addEventListener('hashchange', render);
render();`,
    [
      { level:'easy',   uk:'Клікни на заголовок першого посту, потім поверніся назад через "← Всі пости".', ru:'Кликни на заголовок первого поста, потом вернись назад через "← Все посты".' },
      { level:'medium', uk:'Додай третій пост у масив POSTS і переконайся, що можна відкрити <code>#/post/3</code> і побачити саме його.', ru:'Добавь третий пост в массив POSTS и убедись, что можно открыть #/post/3.' },
      { level:'hard',   uk:'Спробуй вручну ввести в адресний рядок прев\'ю щось на кшталт <code>#/post/999</code> (неіснуючий id) — переконайся, що бачиш "Пост не знайдено", а не порожню сторінку.', ru:'Попробуй вручную ввести #/post/999 (несуществующий id) — убедись, что видишь "Пост не найден".' },
    ]
  );

  /* ─── 14-05: Markdown → HTML — marked.js ─────────────────────── */
  patch('14-05',
    { uk:`<h2>Markdown → HTML: marked.js</h2>
<p>Писати статті у звичайному HTML незручно (багато тегів). <strong>Markdown</strong> — простіший синтаксис для форматування тексту, і бібліотека <strong>marked.js</strong> перетворює його на HTML прямо в браузері.</p>
<h3>Базовий синтаксис Markdown</h3>
<pre># Заголовок 1
## Заголовок 2
**жирний текст**, *курсив*
- пункт списку
- ще пункт

[посилання](https://example.com)
\`\`\`js
код у блоці
\`\`\`</pre>
<h3>Підключення і використання</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  const html = marked.parse(markdownText);
  document.getElementById('content').innerHTML = html;
&lt;/script&gt;</pre>
<p>Тепер автор поста пише простий текст із <code>**</code> і <code>#</code>, а marked.js сам перетворює це на <code>&lt;strong&gt;</code> і <code>&lt;h1&gt;</code>.</p>`,
      ru:`<h2>Markdown → HTML: marked.js</h2>
<p>Писать статьи в обычном HTML неудобно. <strong>Markdown</strong> — более простой синтаксис форматирования, а библиотека <strong>marked.js</strong> превращает его в HTML прямо в браузере.</p>
<h3>Базовый синтаксис Markdown</h3>
<pre># Заголовок 1
## Заголовок 2
**жирный текст**, *курсив*
- пункт списка
- ещё пункт

[ссылка](https://example.com)
\`\`\`js
код в блоке
\`\`\`</pre>
<h3>Подключение и использование</h3>
<pre>&lt;script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
  const html = marked.parse(markdownText);
  document.getElementById('content').innerHTML = html;
&lt;/script&gt;</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f1f5f9;padding:20px}
textarea{width:100%;height:140px;background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:10px;border-radius:8px;font-family:monospace;font-size:13px}
#preview{margin-top:14px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:16px}
#preview h1,#preview h2{margin-bottom:8px}
#preview p{margin-bottom:8px;color:#cbd5e1}
#preview code{background:#0f172a;padding:2px 6px;border-radius:4px}
</style>
</head>
<body>
<h2 style="margin-bottom:10px">Редактор Markdown</h2>
<textarea id="md-input"># Мій перший пост

Це **важлива** думка і трохи *курсиву*.

- Пункт один
- Пункт два

\`код у рядку\`</textarea>
<div id="preview"></div>
<script>
var input = document.getElementById('md-input');
function update() {
  document.getElementById('preview').innerHTML = marked.parse(input.value);
}
input.addEventListener('input', update);
update();
<\/script>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Зміни текст у textarea і подивись, як прев\'ю оновлюється в реальному часі.', ru:'Измени текст в textarea и посмотри, как превью обновляется в реальном времени.' },
      { level:'medium', uk:'Додай у Markdown-текст блок коду через потрійні зворотні лапки і перевір, що він красиво відображається.', ru:'Добавь в Markdown-текст блок кода через тройные обратные кавычки.' },
      { level:'hard',   uk:'Додай посилання у форматі <code>[текст](url)</code> в текстарею і переконайся, що воно стало клікабельним посиланням у прев\'ю.', ru:'Добавь ссылку в формате [текст](url) и убедись, что она стала кликабельной в превью.' },
    ]
  );

  /* ─── 14-06: Категорії та теги — фільтрація ─────────────────────── */
  patch('14-06',
    { uk:`<h2>Категорії та теги: фільтрація</h2>
<p>Так само, як фільтр проектів у портфоліо (модуль 12), додамо кнопки категорій над списком постів.</p>
<h3>Логіка фільтра</h3>
<pre>let activeCategory = 'all';

function applyFilter() {
  const filtered = activeCategory === 'all'
    ? POSTS
    : POSTS.filter(p => p.category === activeCategory);
  renderPosts(filtered);
}</pre>
<h3>Активна кнопка</h3>
<pre>document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    applyFilter();
  });
});</pre>`,
      ru:`<h2>Категории и теги: фильтрация</h2>
<p>Так же, как фильтр проектов в портфолио (модуль 12), добавим кнопки категорий над списком постов.</p>
<h3>Логика фильтра</h3>
<pre>let activeCategory = 'all';

function applyFilter() {
  const filtered = activeCategory === 'all'
    ? POSTS
    : POSTS.filter(p => p.category === activeCategory);
  renderPosts(filtered);
}</pre>
<h3>Активная кнопка</h3>
<pre>document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    applyFilter();
  });
});</pre>` },
    `<div class="filters" id="filters"></div>
<div id="list"></div>`,
    `${BASE}
.filters{display:flex;gap:8px;margin-bottom:14px}
.filter-btn{background:#1e293b;border:1px solid #334155;color:#94a3b8;padding:6px 14px;border-radius:20px;font-size:12px;cursor:pointer}
.filter-btn.active{border-color:#a78bfa;color:#c4b5fd}`,
    `var POSTS = [
  { id: 1, title: 'Як я вивчила JavaScript за літо', category: 'js' },
  { id: 2, title: 'CSS Grid vs Flexbox', category: 'css' },
  { id: 3, title: 'Мій перший хакатон', category: 'life' },
  { id: 4, title: 'Асинхронність у JS', category: 'js' },
];
var CATS = [ { key:'all', label:'Всі' }, { key:'js', label:'JS' }, { key:'css', label:'CSS' }, { key:'life', label:'Життя' } ];
var activeCategory = 'all';

function renderFilters() {
  var box = document.getElementById('filters');
  box.innerHTML = CATS.map(function (c, i) {
    return '<button class="filter-btn' + (i === 0 ? ' active' : '') + '" data-cat="' + c.key + '">' + c.label + '</button>';
  }).join('');
  box.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      box.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      applyFilter();
    });
  });
}

function renderPosts(posts) {
  document.getElementById('list').innerHTML = posts.length
    ? posts.map(function (p) { return '<div class="post-card"><div class="post-title">' + p.title + '</div></div>'; }).join('')
    : '<p style="color:#64748b">Нічого не знайдено в цій категорії</p>';
}

function applyFilter() {
  var filtered = activeCategory === 'all' ? POSTS : POSTS.filter(function (p) { return p.category === activeCategory; });
  renderPosts(filtered);
}

renderFilters();
applyFilter();`,
    [
      { level:'easy',   uk:'Натисни всі чотири фільтри по черзі і подивись, які пости показуються.', ru:'Нажми все четыре фильтра по очереди и посмотри, какие посты показываются.' },
      { level:'medium', uk:'Додай п\'ятий пост із категорією "life" і переконайся, що фільтр "Життя" тепер показує два пости.', ru:'Добавь пятый пост с категорией "life".' },
      { level:'hard',   uk:'Додай п\'яту категорію "web" у CATS і хоча б один пост з такою категорією.', ru:'Добавь пятую категорию "web" в CATS и хотя бы один пост с такой категорией.' },
    ]
  );

  /* ─── 14-07: Пошук по постах (real-time) ────────────────────────── */
  patch('14-07',
    { uk:`<h2>Пошук по постах (real-time)</h2>
<p>Пошук має фільтрувати список одразу під час набору тексту, без кнопки "Знайти".</p>
<h3>Фільтр за заголовком і уривком</h3>
<pre>function search(query) {
  const q = query.toLowerCase();
  return POSTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q)
  );
}

input.addEventListener('input', e => {
  renderPosts(search(e.target.value));
});</pre>
<h3>toLowerCase() — навіщо?</h3>
<p>Щоб пошук "React" і "react" знаходив однакові результати — порівнюємо все у нижньому регістрі.</p>`,
      ru:`<h2>Поиск по постам (real-time)</h2>
<p>Поиск должен фильтровать список сразу во время набора текста.</p>
<h3>Фильтр по заголовку и отрывку</h3>
<pre>function search(query) {
  const q = query.toLowerCase();
  return POSTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q)
  );
}

input.addEventListener('input', e => {
  renderPosts(search(e.target.value));
});</pre>
<h3>toLowerCase() — зачем?</h3>
<p>Чтобы поиск "React" и "react" находил одинаковые результаты.</p>` },
    `<input type="text" id="search-input" placeholder="Пошук постів..." style="width:100%">
<div id="list" style="margin-top:12px"></div>`,
    `${BASE}`,
    `var POSTS = [
  { id: 1, title: 'Як я вивчила JavaScript за літо', excerpt: 'Розповідь про перші кроки у програмуванні.' },
  { id: 2, title: 'CSS Grid vs Flexbox', excerpt: 'Коли використовувати що і чому.' },
  { id: 3, title: 'Мій перший хакатон', excerpt: 'Враження від участі у шкільному хакатоні.' },
];

function renderPosts(posts) {
  document.getElementById('list').innerHTML = posts.length
    ? posts.map(function (p) { return '<div class="post-card"><div class="post-title">' + p.title + '</div><div class="post-meta">' + p.excerpt + '</div></div>'; }).join('')
    : '<p style="color:#64748b">Нічого не знайдено</p>';
}

function search(query) {
  var q = query.toLowerCase();
  return POSTS.filter(function (p) {
    return p.title.toLowerCase().indexOf(q) !== -1 || p.excerpt.toLowerCase().indexOf(q) !== -1;
  });
}

document.getElementById('search-input').addEventListener('input', function (e) {
  renderPosts(search(e.target.value));
});

renderPosts(POSTS);`,
    [
      { level:'easy',   uk:'Введи "хакатон" у пошук — переконайся, що показується лише третій пост.', ru:'Введи "хакатон" в поиск — убедись, что показывается только третий пост.' },
      { level:'medium', uk:'Введи щось, чого немає в жодному пості (наприклад "динозаври") — перевір повідомлення "Нічого не знайдено".', ru:'Введи что-то, чего нет ни в одном посте — проверь сообщение "Ничего не найдено".' },
      { level:'hard',   uk:'Введи "REACT" великими літерами — переконайся, що пошук все одно регістронезалежний (може не знайти нічого, якщо слова "react" немає в жодному пості — тоді спробуй "JAVASCRIPT").', ru:'Введи "REACT" заглавными буквами — убедись, что поиск регистронезависим (попробуй "JAVASCRIPT").' },
    ]
  );

  /* ─── 14-08: Пагінація — 5 постів на сторінку ──────────────────── */
  patch('14-08',
    { uk:`<h2>Пагінація: 5 постів на сторінку</h2>
<p>Коли постів багато, показувати всі одразу незручно. Розбиваємо список на сторінки по кілька постів.</p>
<h3>Математика пагінації</h3>
<pre>const perPage = 5;
let currentPage = 1;

function getPageItems(items, page) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

const totalPages = Math.ceil(POSTS.length / perPage);</pre>
<h3>Кнопки сторінок</h3>
<pre>for (let i = 1; i <= totalPages; i++) {
  const btn = document.createElement('button');
  btn.textContent = i;
  btn.addEventListener('click', () => { currentPage = i; render(); });
  pager.appendChild(btn);
}</pre>
<p><code>slice(start, start + perPage)</code> — стандартний спосіб "вирізати" шматок масиву для показу.</p>`,
      ru:`<h2>Пагинация: 5 постов на страницу</h2>
<p>Когда постов много, показывать все сразу неудобно. Разбиваем список на страницы.</p>
<h3>Математика пагинации</h3>
<pre>const perPage = 5;
let currentPage = 1;

function getPageItems(items, page) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

const totalPages = Math.ceil(POSTS.length / perPage);</pre>
<h3>Кнопки страниц</h3>
<pre>for (let i = 1; i <= totalPages; i++) {
  const btn = document.createElement('button');
  btn.textContent = i;
  btn.addEventListener('click', () => { currentPage = i; render(); });
  pager.appendChild(btn);
}</pre>` },
    `<div id="list"></div>
<div id="pager" style="margin-top:12px;display:flex;gap:6px"></div>`,
    `${BASE}
.page-btn.active{border-color:#a78bfa;color:#c4b5fd}`,
    `var POSTS = [];
for (var i = 1; i <= 12; i++) {
  POSTS.push({ id: i, title: 'Пост номер ' + i });
}
var perPage = 5;
var currentPage = 1;

function renderPosts() {
  var start = (currentPage - 1) * perPage;
  var items = POSTS.slice(start, start + perPage);
  document.getElementById('list').innerHTML = items.map(function (p) {
    return '<div class="post-card"><div class="post-title">' + p.title + '</div></div>';
  }).join('');
}

function renderPager() {
  var totalPages = Math.ceil(POSTS.length / perPage);
  var pager = document.getElementById('pager');
  pager.innerHTML = '';
  for (var i = 1; i <= totalPages; i++) {
    var btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    (function (page) {
      btn.addEventListener('click', function () {
        currentPage = page;
        renderPosts();
        renderPager();
      });
    })(i);
    pager.appendChild(btn);
  }
}

renderPosts();
renderPager();`,
    [
      { level:'easy',   uk:'Порахуй, скільки сторінок з\'явилось для 12 постів по 5 на сторінку (має бути 3).', ru:'Посчитай, сколько страниц появилось для 12 постов по 5 на страницу (должно быть 3).' },
      { level:'medium', uk:'Зміни <code>perPage</code> з 5 на 4 — переконайся, що кількість сторінок стала іншою.', ru:'Измени perPage с 5 на 4 — убедись, что количество страниц изменилось.' },
      { level:'hard',   uk:'Додай кнопки "← Попередня" і "Наступна →" по краях пагінації, які зменшують/збільшують <code>currentPage</code> (з перевіркою меж 1..totalPages).', ru:'Добавь кнопки "← Предыдущая" и "Следующая →" по краям пагинации.' },
    ]
  );

  /* ─── 14-09: Коментарі у localStorage ────────────────────────────── */
  patch('14-09',
    { uk:`<h2>Коментарі у localStorage</h2>
<p>Без бекенду коментарі не можна зберегти "для всіх відвідувачів" — але можна зберегти локально для конкретного браузера, прив'язавши їх до <code>id</code> поста.</p>
<h3>Ключ localStorage окремо для кожного поста</h3>
<pre>function getComments(postId) {
  return JSON.parse(localStorage.getItem('comments-' + postId) || '[]');
}

function addComment(postId, text) {
  const comments = getComments(postId);
  comments.push({ text, date: new Date().toLocaleString('uk') });
  localStorage.setItem('comments-' + postId, JSON.stringify(comments));
}</pre>
<h3>Чому окремий ключ на кожен пост?</h3>
<p>Якби всі коментарі зберігались під одним ключем "comments", довелось би фільтрувати весь масив щоразу. Окремий ключ <code>comments-1</code>, <code>comments-2</code>... одразу дає лише потрібні коментарі.</p>`,
      ru:`<h2>Комментарии в localStorage</h2>
<p>Без бэкенда комментарии нельзя сохранить "для всех посетителей" — но можно сохранить локально для конкретного браузера, привязав их к id поста.</p>
<h3>Ключ localStorage отдельно для каждого поста</h3>
<pre>function getComments(postId) {
  return JSON.parse(localStorage.getItem('comments-' + postId) || '[]');
}

function addComment(postId, text) {
  const comments = getComments(postId);
  comments.push({ text, date: new Date().toLocaleString('ru') });
  localStorage.setItem('comments-' + postId, JSON.stringify(comments));
}</pre>
<h3>Почему отдельный ключ на каждый пост?</h3>
<p>Отдельный ключ comments-1, comments-2... сразу даёт только нужные комментарии.</p>` },
    `<h2>Коментарі до поста #1</h2>
<textarea id="comment-input" rows="2" placeholder="Твій коментар..." style="width:100%;background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:9px;border-radius:8px;font-family:inherit"></textarea>
<button onclick="addCommentBtn()">💬 Додати коментар</button>
<div id="comments-list" style="margin-top:12px"></div>`,
    `${BASE}
.comment{background:#1e293b;border:1px solid #334155;border-radius:8px;padding:10px 14px;margin-bottom:8px;font-size:13px}
.comment-date{font-size:11px;color:#64748b;margin-top:4px}`,
    `var POST_ID = 1;

function getComments(postId) {
  return JSON.parse(localStorage.getItem('comments-' + postId) || '[]');
}
function addComment(postId, text) {
  var comments = getComments(postId);
  comments.push({ text: text, date: new Date().toLocaleString() });
  localStorage.setItem('comments-' + postId, JSON.stringify(comments));
}

function renderComments() {
  var comments = getComments(POST_ID);
  var box = document.getElementById('comments-list');
  box.innerHTML = comments.length
    ? comments.map(function (c) { return '<div class="comment">' + c.text + '<div class="comment-date">' + c.date + '</div></div>'; }).join('')
    : '<p style="color:#64748b;font-size:12.5px">Коментарів поки немає — будь першим!</p>';
}

function addCommentBtn() {
  var input = document.getElementById('comment-input');
  var text = input.value.trim();
  if (!text) return;
  addComment(POST_ID, text);
  input.value = '';
  renderComments();
}

renderComments();`,
    [
      { level:'easy',   uk:'Додай 2-3 коментарі і перезапусти прев\'ю (⟳) — переконайся, що коментарі збереглись.', ru:'Добавь 2-3 комментария и перезапусти превью — убедись, что комментарии сохранились.' },
      { level:'medium', uk:'Зміни <code>POST_ID</code> з 1 на 2 — переконайся, що для іншого поста показується порожній список (окремий ключ localStorage).', ru:'Измени POST_ID с 1 на 2 — убедись, что для другого поста показывается пустой список.' },
      { level:'hard',   uk:'Додай кнопку "🗑 Очистити коментарі", яка викликає <code>localStorage.removeItem(\'comments-\' + POST_ID)</code> і <code>renderComments()</code>.', ru:'Добавь кнопку "🗑 Очистить комментарии".' },
    ]
  );

  /* ─── 14-10: Лічильник переглядів у localStorage ─────────────────── */
  patch('14-10',
    { uk:`<h2>Лічильник переглядів у localStorage</h2>
<p>Кожного разу, коли пост відкривають, збільшуємо лічильник переглядів на 1 — і зберігаємо в localStorage окремо для кожного поста.</p>
<h3>Збільшення при завантаженні сторінки</h3>
<pre>function incrementViews(postId) {
  const key = 'views-' + postId;
  const current = Number(localStorage.getItem(key) || 0);
  localStorage.setItem(key, current + 1);
  return current + 1;
}

// Викликаємо один раз при показі поста:
const views = incrementViews(post.id);
viewsEl.textContent = views + ' переглядів';</pre>
<h3>Обережно з подвійним підрахунком</h3>
<p>Якщо викликати <code>incrementViews()</code> у функції, що запускається кілька разів (наприклад, при кожному <code>render()</code>), лічильник накрутиться неправильно. Викликай його лише один раз — коли пост дійсно відкривається вперше в цьому переході.</p>`,
      ru:`<h2>Счётчик просмотров в localStorage</h2>
<p>Каждый раз, когда пост открывают, увеличиваем счётчик просмотров на 1.</p>
<h3>Увеличение при загрузке страницы</h3>
<pre>function incrementViews(postId) {
  const key = 'views-' + postId;
  const current = Number(localStorage.getItem(key) || 0);
  localStorage.setItem(key, current + 1);
  return current + 1;
}

const views = incrementViews(post.id);
viewsEl.textContent = views + ' просмотров';</pre>
<h3>Осторожно с двойным подсчётом</h3>
<p>Если вызывать incrementViews() в функции, запускающейся несколько раз, счётчик накрутится неправильно.</p>` },
    `<div class="post-card">
  <div class="post-title">Як я вивчила JavaScript за літо</div>
  <div class="post-meta" id="views-line">👁 0 переглядів</div>
</div>
<button onclick="openPost()" style="margin-top:10px">📖 Відкрити пост (+1 перегляд)</button>`,
    `${BASE}`,
    `var POST_ID = 1;

function incrementViews(postId) {
  var key = 'views-' + postId;
  var current = Number(localStorage.getItem(key) || 0);
  var next = current + 1;
  localStorage.setItem(key, next);
  return next;
}
function getViews(postId) {
  return Number(localStorage.getItem('views-' + postId) || 0);
}

function updateViewsLine() {
  document.getElementById('views-line').textContent = '👁 ' + getViews(POST_ID) + ' переглядів';
}

function openPost() {
  var views = incrementViews(POST_ID);
  document.getElementById('views-line').textContent = '👁 ' + views + ' переглядів';
}

updateViewsLine();`,
    [
      { level:'easy',   uk:'Натисни "Відкрити пост" кілька разів і подивись, як росте лічильник.', ru:'Нажми "Открыть пост" несколько раз и посмотри, как растёт счётчик.' },
      { level:'medium', uk:'Перезапусти прев\'ю (⟳) — переконайся, що лічильник НЕ скинувся до нуля (значення в localStorage).', ru:'Перезапусти превью — убедись, что счётчик НЕ сбросился до нуля.' },
      { level:'hard',   uk:'Додай кнопку "Скинути перегляди", яка викликає <code>localStorage.removeItem(\'views-\' + POST_ID)</code> і <code>updateViewsLine()</code>.', ru:'Добавь кнопку "Сбросить просмотры".' },
    ]
  );

  /* ─── 14-11: Темна тема зі збереженням ───────────────────────────── */
  patch('14-11',
    { uk:`<h2>Темна тема зі збереженням</h2>
<p>Такий самий підхід, як у портфоліо (модуль 12) і квізі (модуль 11): CSS Custom Properties + <code>data-theme</code> + <code>localStorage</code>.</p>
<h3>Застосування теми при старті</h3>
<pre>const saved = localStorage.getItem('blog-theme') || 'dark';
document.body.dataset.theme = saved;</pre>
<h3>Перемикач</h3>
<pre>function toggleTheme() {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  localStorage.setItem('blog-theme', next);
}</pre>
<p>Оскільки ти вже писав це двічі раніше (портфоліо, квіз), спробуй написати цей код сам, підглядаючи в теорію лише за потреби.</p>`,
      ru:`<h2>Тёмная тема с сохранением</h2>
<p>Такой же подход, как в портфолио (модуль 12) и квизе (модуль 11): CSS Custom Properties + data-theme + localStorage.</p>
<h3>Применение темы при старте</h3>
<pre>const saved = localStorage.getItem('blog-theme') || 'dark';
document.body.dataset.theme = saved;</pre>
<h3>Переключатель</h3>
<pre>function toggleTheme() {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  localStorage.setItem('blog-theme', next);
}</pre>
<p>Так как ты уже писал это дважды раньше, попробуй написать этот код сам, подглядывая в теорию только при необходимости.</p>` },
    `<button onclick="toggleTheme()" id="theme-btn">🌙</button>
<div class="post-card" style="margin-top:12px">
  <div class="post-title">Як я вивчила JavaScript за літо</div>
  <div class="post-meta">Аліна · 1 липня</div>
</div>`,
    `:root{ --bg:#0f172a; --card:#1e293b; --text:#f1f5f9; --border:#334155; }
[data-theme="light"]{ --bg:#f8fafc; --card:#ffffff; --text:#0f172a; --border:#e2e8f0; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);padding:20px;transition:.3s}
#theme-btn{background:var(--card);border:1px solid var(--border);color:var(--text);padding:9px 14px;border-radius:8px;cursor:pointer;font-size:16px}
.post-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;transition:.3s}
.post-title{font-size:14px;font-weight:700;margin-bottom:4px}
.post-meta{font-size:11px;color:#64748b}`,
    `var saved = localStorage.getItem('blog-theme') || 'dark';
document.body.dataset.theme = saved;
document.getElementById('theme-btn').textContent = saved === 'dark' ? '🌙' : '☀️';

function toggleTheme() {
  var next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  document.getElementById('theme-btn').textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('blog-theme', next);
}`,
    [
      { level:'easy',   uk:'Перемкни тему і перезапусти прев\'ю — переконайся, що вибір зберігся.', ru:'Переключи тему и перезапусти превью — убедись, что выбор сохранился.' },
      { level:'medium', uk:'Додай третю CSS-змінну <code>--accent</code> і застосуй її до кольору заголовка поста.', ru:'Добавь третью CSS-переменную --accent и примени её к цвету заголовка поста.' },
      { level:'hard',   uk:'Порівняй свій код із кодом теми в портфоліо (модуль 12, урок 12-10) — чи є різниця в підході? Опиши одним реченням.', ru:'Сравни свой код с кодом темы в портфолио (модуль 12, урок 12-10) — есть ли разница в подходе?' },
    ]
  );

  /* ─── 14-12: RSS Feed у форматі XML ──────────────────────────────── */
  patch('14-12',
    { uk:`<h2>RSS Feed у форматі XML</h2>
<p><strong>RSS</strong> — стандартний XML-формат, що дозволяє читачам підписуватись на новий контент блогу через RSS-рідери (замість того, щоб щодня перевіряти сайт вручну).</p>
<h3>Структура RSS XML</h3>
<pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;rss version="2.0"&gt;
  &lt;channel&gt;
    &lt;title&gt;Мій Блог&lt;/title&gt;
    &lt;link&gt;https://alina-blog.dev&lt;/link&gt;
    &lt;item&gt;
      &lt;title&gt;Як я вивчила JavaScript&lt;/title&gt;
      &lt;link&gt;https://alina-blog.dev/#/post/1&lt;/link&gt;
      &lt;pubDate&gt;Wed, 01 Jul 2026 00:00:00 GMT&lt;/pubDate&gt;
    &lt;/item&gt;
  &lt;/channel&gt;
&lt;/rss&gt;</pre>
<h3>Генерація рядка XML з масиву постів</h3>
<pre>function generateRSS(posts) {
  const items = posts.map(p =>
    '  &lt;item&gt;\\n    &lt;title&gt;' + p.title + '&lt;/title&gt;\\n  &lt;/item&gt;'
  ).join('\\n');
  return '&lt;rss version="2.0"&gt;&lt;channel&gt;\\n' + items + '\\n&lt;/channel&gt;&lt;/rss&gt;';
}</pre>`,
      ru:`<h2>RSS Feed в формате XML</h2>
<p><strong>RSS</strong> — стандартный XML-формат, позволяющий читателям подписываться на новый контент блога через RSS-ридеры.</p>
<h3>Структура RSS XML</h3>
<pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;rss version="2.0"&gt;
  &lt;channel&gt;
    &lt;title&gt;Мой Блог&lt;/title&gt;
    &lt;link&gt;https://alina-blog.dev&lt;/link&gt;
    &lt;item&gt;
      &lt;title&gt;Как я выучила JavaScript&lt;/title&gt;
      &lt;link&gt;https://alina-blog.dev/#/post/1&lt;/link&gt;
    &lt;/item&gt;
  &lt;/channel&gt;
&lt;/rss&gt;</pre>
<h3>Генерация строки XML из массива постов</h3>
<pre>function generateRSS(posts) {
  const items = posts.map(p =>
    '  &lt;item&gt;\\n    &lt;title&gt;' + p.title + '&lt;/title&gt;\\n  &lt;/item&gt;'
  ).join('\\n');
  return '&lt;rss version="2.0"&gt;&lt;channel&gt;\\n' + items + '\\n&lt;/channel&gt;&lt;/rss&gt;';
}</pre>` },
    `<button onclick="generateFeed()">📡 Згенерувати RSS-стрічку</button>
<pre id="rss-out" style="margin-top:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:11.5px;white-space:pre-wrap;color:#94a3b8"></pre>`,
    `${BASE}`,
    `var POSTS = [
  { id: 1, title: 'Як я вивчила JavaScript за літо', date: '2026-07-01' },
  { id: 2, title: 'CSS Grid vs Flexbox', date: '2026-06-20' },
];

function generateRSS(posts) {
  var items = posts.map(function (p) {
    return '  <item>\\n    <title>' + p.title + '</title>\\n    <link>https://alina-blog.dev/#/post/' + p.id + '</link>\\n    <pubDate>' + p.date + '</pubDate>\\n  </item>';
  }).join('\\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\\n<rss version="2.0">\\n<channel>\\n  <title>Мій Блог</title>\\n' + items + '\\n</channel>\\n</rss>';
}

function generateFeed() {
  document.getElementById('rss-out').textContent = generateRSS(POSTS);
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись на згенерований RSS XML.', ru:'Нажми кнопку и посмотри на сгенерированный RSS XML.' },
      { level:'medium', uk:'Додай третій пост у масив POSTS і переконайся, що для нього теж з\'явився <code>&lt;item&gt;</code>.', ru:'Добавь третий пост в массив POSTS и убедись, что для него тоже появился <item>.' },
      { level:'hard',   uk:'Додай у кожен <code>&lt;item&gt;</code> ще й тег <code>&lt;description&gt;</code> з полем <code>excerpt</code> посту (додай це поле в об\'єкти POSTS).', ru:'Добавь в каждый <item> ещё и тег <description> с полем excerpt поста.' },
    ]
  );

  /* ─── 14-13: SEO — meta og: та JSON-LD для кожного посту ────────── */
  patch('14-13',
    { uk:`<h2>SEO: meta og: та JSON-LD для кожного посту</h2>
<p>На відміну від портфоліо (один набір тегів на весь сайт), блог потребує <strong>окремих</strong> SEO-тегів для кожного поста — щоб у пошуку й соцмережах показувалась саме назва й опис конкретної статті.</p>
<h3>Динамічна зміна тегів при відкритті поста</h3>
<pre>function updateSEO(post) {
  document.title = post.title + ' — Мій Блог';
  document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);
  document.querySelector('meta[property="og:title"]').setAttribute('content', post.title);
}</pre>
<h3>JSON-LD для статті (schema.org Article)</h3>
<pre>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Як я вивчила JavaScript за літо",
  "author": { "@type": "Person", "name": "Аліна Коваль" },
  "datePublished": "2026-07-01"
}</pre>
<p>Такі структуровані дані допомагають Google показати статтю з датою публікації і автором прямо у видачі пошуку.</p>`,
      ru:`<h2>SEO: meta og: и JSON-LD для каждого поста</h2>
<p>В отличие от портфолио, блог требует <strong>отдельных</strong> SEO-тегов для каждого поста.</p>
<h3>Динамическое изменение тегов при открытии поста</h3>
<pre>function updateSEO(post) {
  document.title = post.title + ' — Мой Блог';
  document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);
  document.querySelector('meta[property="og:title"]').setAttribute('content', post.title);
}</pre>
<h3>JSON-LD для статьи (schema.org Article)</h3>
<pre>{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Как я выучила JavaScript за лето",
  "author": { "@type": "Person", "name": "Алина Коваль" },
  "datePublished": "2026-07-01"
}</pre>` },
    `<h2>Генератор SEO для поста</h2>
<select id="post-select" style="width:100%;padding:9px;background:#1e293b;border:1px solid #334155;color:#f1f5f9;border-radius:8px">
  <option value="0">Як я вивчила JavaScript за літо</option>
  <option value="1">CSS Grid vs Flexbox</option>
</select>
<button onclick="generateSEO()" style="margin-top:10px">Згенерувати теги</button>
<pre id="seo-out" style="margin-top:12px;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:11.5px;white-space:pre-wrap;color:#94a3b8"></pre>`,
    `${BASE}`,
    `var POSTS = [
  { title: 'Як я вивчила JavaScript за літо', excerpt: 'Розповідь про перші кроки у програмуванні.', author: 'Аліна Коваль', date: '2026-07-01' },
  { title: 'CSS Grid vs Flexbox', excerpt: 'Коли використовувати що і чому.', author: 'Аліна Коваль', date: '2026-06-20' },
];

function generateSEO() {
  var idx = Number(document.getElementById('post-select').value);
  var p = POSTS[idx];
  document.getElementById('seo-out').textContent =
    '<title>' + p.title + ' — Мій Блог</title>\\n' +
    '<meta name="description" content="' + p.excerpt + '">\\n' +
    '<meta property="og:title" content="' + p.title + '">\\n\\n' +
    '<script type="application/ld+json">\\n{\\n  "@type": "BlogPosting",\\n  "headline": "' + p.title + '",\\n  "author": "' + p.author + '",\\n  "datePublished": "' + p.date + '"\\n}\\n</' + 'script>';
}
generateSEO();`,
    [
      { level:'easy',   uk:'Перемкни випадаючий список між двома постами і згенеруй теги для кожного.', ru:'Переключи выпадающий список между двумя постами и сгенерируй теги для каждого.' },
      { level:'medium', uk:'Додай третій пост у список <code>&lt;select&gt;</code> і в масив POSTS.', ru:'Добавь третий пост в список select и в массив POSTS.' },
      { level:'hard',   uk:'Додай перевірку: якщо <code>excerpt</code> довший за 160 символів, додай у вивід попередження "⚠ Опис задовгий для Google".', ru:'Добавь проверку: если excerpt длиннее 160 символов, выведи предупреждение.' },
    ]
  );

  /* ─── 14-14: Кнопки поширення в соціальних мережах ──────────────── */
  patch('14-14',
    { uk:`<h2>Кнопки поширення в соціальних мережах</h2>
<p>Найпростіший спосіб дати читачам поширити статтю — посилання із заздалегідь заповненими параметрами для кожної соцмережі.</p>
<h3>Формати посилань "поширити"</h3>
<pre>Telegram:  https://t.me/share/url?url=URL&text=TITLE
Twitter/X: https://twitter.com/intent/tweet?url=URL&text=TITLE
Facebook:  https://www.facebook.com/sharer/sharer.php?u=URL</pre>
<h3>Формування посилань у JS</h3>
<pre>function shareLinks(url, title) {
  const encUrl = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);
  return {
    telegram: 'https://t.me/share/url?url=' + encUrl + '&text=' + encTitle,
    twitter:  'https://twitter.com/intent/tweet?url=' + encUrl + '&text=' + encTitle,
  };
}</pre>
<h3>Web Share API — нативне вікно "поділитись" (на мобільних)</h3>
<pre>if (navigator.share) {
  navigator.share({ title: post.title, url: postUrl });
}</pre>`,
      ru:`<h2>Кнопки публикации в социальных сетях</h2>
<p>Простой способ дать читателям поделиться статьёй — ссылки с заранее заполненными параметрами для каждой соцсети.</p>
<h3>Форматы ссылок "поделиться"</h3>
<pre>Telegram:  https://t.me/share/url?url=URL&text=TITLE
Twitter/X: https://twitter.com/intent/tweet?url=URL&text=TITLE
Facebook:  https://www.facebook.com/sharer/sharer.php?u=URL</pre>
<h3>Формирование ссылок в JS</h3>
<pre>function shareLinks(url, title) {
  const encUrl = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);
  return {
    telegram: 'https://t.me/share/url?url=' + encUrl + '&text=' + encTitle,
    twitter:  'https://twitter.com/intent/tweet?url=' + encUrl + '&text=' + encTitle,
  };
}</pre>
<h3>Web Share API — нативное окно "поделиться" (на мобильных)</h3>
<pre>if (navigator.share) {
  navigator.share({ title: post.title, url: postUrl });
}</pre>` },
    `<h2>Як я вивчила JavaScript за літо</h2>
<p>Уривок статті для демонстрації кнопок поширення...</p>
<div class="btn-row" id="share-buttons"></div>`,
    `${BASE}`,
    `function shareLinks(url, title) {
  var encUrl = encodeURIComponent(url);
  var encTitle = encodeURIComponent(title);
  return {
    telegram: 'https://t.me/share/url?url=' + encUrl + '&text=' + encTitle,
    twitter:  'https://twitter.com/intent/tweet?url=' + encUrl + '&text=' + encTitle,
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encUrl
  };
}

function renderShareButtons() {
  var links = shareLinks('https://alina-blog.dev/#/post/1', 'Як я вивчила JavaScript за літо');
  var box = document.getElementById('share-buttons');
  box.innerHTML =
    '<a href="' + links.telegram + '" target="_blank" style="text-decoration:none"><button>📨 Telegram</button></a>' +
    '<a href="' + links.twitter + '" target="_blank" style="text-decoration:none"><button>🐦 Twitter/X</button></a>' +
    '<a href="' + links.facebook + '" target="_blank" style="text-decoration:none"><button>📘 Facebook</button></a>';
}
renderShareButtons();`,
    [
      { level:'easy',   uk:'Подивись на всі три кнопки і на URL, який формується для кожної (наведи мишку — побач посилання внизу браузера).', ru:'Посмотри на все три кнопки и на URL, формируемый для каждой.' },
      { level:'medium', uk:'Зміни заголовок статті в <code>renderShareButtons()</code> на власний і переконайся, що посилання оновились.', ru:'Измени заголовок статьи в renderShareButtons() на свой.' },
      { level:'hard',   uk:'Додай четверту кнопку "📋 Скопіювати посилання", яка викликає <code>navigator.clipboard.writeText(url)</code> і показує <code>alert(\'Скопійовано!\')</code>.', ru:'Добавь четвёртую кнопку "📋 Скопировать ссылку".' },
    ]
  );

  /* ─── 14-15: Оптимізація та аудит Lighthouse ────────────────────── */
  patch('14-15',
    { uk:`<h2>Оптимізація та аудит Lighthouse</h2>
<p>Так само, як у модулі 10 (Tooling), перед публікацією блогу варто прогнати аудит Lighthouse — особливо важливо для блогу з багатьма зображеннями в постах.</p>
<h3>Типові проблеми блогів</h3>
<ul>
  <li>Великі зображення без <code>loading="lazy"</code> і без стиснення</li>
  <li>Занадто багато шрифтів Google Fonts одразу</li>
  <li>Відсутні <code>alt</code>-атрибути в картинках статей</li>
  <li>Markdown-бібліотека (marked.js) вантажиться навіть на сторінках без Markdown</li>
</ul>
<h3>Швидкі перемоги (quick wins)</h3>
<pre>&lt;img src="cover.jpg" alt="Обкладинка статті про JS" loading="lazy" width="600" height="300"&gt;
&lt;link rel="preconnect" href="https://cdn.jsdelivr.net"&gt;</pre>
<p><code>preconnect</code> заздалегідь встановлює з'єднання з CDN, звідки завантажується marked.js — сторінка стартує швидше.</p>`,
      ru:`<h2>Оптимизация и аудит Lighthouse</h2>
<p>Так же, как в модуле 10 (Tooling), перед публикацией блога стоит прогнать аудит Lighthouse.</p>
<h3>Типичные проблемы блогов</h3>
<ul>
  <li>Большие изображения без loading="lazy" и без сжатия</li>
  <li>Слишком много шрифтов Google Fonts сразу</li>
  <li>Отсутствуют alt-атрибуты в картинках статей</li>
  <li>Markdown-библиотека грузится даже на страницах без Markdown</li>
</ul>
<h3>Быстрые победы (quick wins)</h3>
<pre>&lt;img src="cover.jpg" alt="Обложка статьи про JS" loading="lazy" width="600" height="300"&gt;
&lt;link rel="preconnect" href="https://cdn.jsdelivr.net"&gt;</pre>` },
    `<h2>Lighthouse: аудит блогу</h2>
<div id="scores" style="display:flex;gap:14px;flex-wrap:wrap;margin:14px 0"></div>
<button onclick="runAudit()">▶ Запустити аудит</button>
<ul id="tips" style="margin-top:12px;font-size:12.5px;color:#94a3b8;line-height:1.8"></ul>`,
    `${BASE}
.gauge{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#1e293b;border:1px solid #334155}
.gauge-num{font-size:20px;font-weight:900}
.gauge-label{font-size:9px;color:#64748b;text-transform:uppercase;margin-top:2px}
.g-good{color:#4ade80}.g-mid{color:#fbbf24}.g-bad{color:#f87171}`,
    `var CATS = [ { key:'perf', label:'Performance', target:64 }, { key:'a11y', label:'Accessibility', target:88 }, { key:'seo', label:'SEO', target:95 } ];

function gradeClass(v) { if (v >= 90) return 'g-good'; if (v >= 50) return 'g-mid'; return 'g-bad'; }

function renderGauges(values) {
  document.getElementById('scores').innerHTML = CATS.map(function (c) {
    var v = values[c.key] || 0;
    return '<div class="gauge"><div class="gauge-num ' + gradeClass(v) + '">' + v + '</div><div class="gauge-label">' + c.label + '</div></div>';
  }).join('');
}
renderGauges({ perf: 0, a11y: 0, seo: 0 });

function runAudit() {
  var step = 0;
  var values = { perf: 0, a11y: 0, seo: 0 };
  var timer = setInterval(function () {
    step += 5;
    CATS.forEach(function (c) { values[c.key] = Math.min(c.target, step); });
    renderGauges(values);
    if (step >= 100) {
      clearInterval(timer);
      document.getElementById('tips').innerHTML =
        '<li>⚠ Performance: зображення постів не стиснуті, немає loading="lazy"</li>' +
        '<li>⚠ Accessibility: 3 картинки без alt-тексту</li>' +
        '<li>✔ SEO: усі пости мають унікальний title і description</li>';
    }
  }, 60);
}`,
    [
      { level:'easy',   uk:'Натисни "▶ Запустити аудит" і подивись на результати трьох показників.', ru:'Нажми "▶ Запустить аудит" и посмотри на результаты трёх показателей.' },
      { level:'medium', uk:'Зміни <code>target</code> для Performance з 64 на 40 — переконайся, що число стає червоним.', ru:'Измени target для Performance с 64 на 40 — убедись, что число становится красным.' },
      { level:'hard',   uk:'Додай четверту категорію "Best Practices" з target:92 у масив CATS.', ru:'Добавь четвёртую категорию "Best Practices" с target:92 в массив CATS.' },
    ]
  );

  /* ─── 14-16: ФІНАЛ 4 — Блог-застосунок ───────────────────────────── */
  patch('14-16',
    { uk:`<h2>ФІНАЛ 4: Блог-застосунок</h2>
<p>Останній фінал курсу — повний блог, що поєднує все вивчене за 14 модулів: список постів, hash-роутинг на окремі сторінки, фільтр категорій, пошук, коментарі й перегляди в localStorage, тему і кнопки поширення.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ Список постів + сторінка окремого посту (#hash-роутинг)</li>
  <li>✅ Фільтр за категорією + пошук у реальному часі</li>
  <li>✅ Коментарі та лічильник переглядів (localStorage, окремо на пост)</li>
  <li>✅ Темна / світла тема зі збереженням</li>
  <li>✅ Кнопки поширення в соцмережі</li>
</ul>
<p>Це фінал не лише модуля, а й <strong>усього курсу "Веб-Розробник 10-14"</strong> — 170 з 170 уроків. Із таким набором навичок можна впевнено переходити до більш просунутого треку.</p>`,
      ru:`<h2>ФИНАЛ 4: Блог-приложение</h2>
<p>Последний финал курса — полный блог, объединяющий всё изученное за 14 модулей.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ Список постов + страница отдельного поста (#hash-роутинг)</li>
  <li>✅ Фильтр по категории + поиск в реальном времени</li>
  <li>✅ Комментарии и счётчик просмотров (localStorage, отдельно на пост)</li>
  <li>✅ Тёмная / светлая тема с сохранением</li>
  <li>✅ Кнопки публикации в соцсети</li>
</ul>
<p>Это финал не только модуля, а и <strong>всего курса "Веб-Разработчик 10-14"</strong> — 170 из 170 уроков.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<style>
:root{ --bg:#0f172a; --card:#1e293b; --text:#f1f5f9; --border:#334155; --accent:#a78bfa; }
[data-theme="light"]{ --bg:#f8fafc; --card:#ffffff; --text:#0f172a; --border:#e2e8f0; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);transition:.3s}
.topbar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--border)}
.logo{font-weight:700}
#theme-btn{background:var(--card);border:1px solid var(--border);color:var(--text);padding:6px 12px;border-radius:8px;cursor:pointer}
.wrap{max-width:480px;margin:0 auto;padding:20px}
input{width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:9px 12px;border-radius:8px;font-size:13px;margin-bottom:12px}
.filters{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.filter-btn{background:var(--card);border:1px solid var(--border);color:#94a3b8;padding:6px 14px;border-radius:20px;font-size:12px;cursor:pointer}
.filter-btn.active{border-color:var(--accent);color:#c4b5fd}
.post-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;margin-bottom:10px;cursor:pointer}
.post-title{font-size:14px;font-weight:700;margin-bottom:4px}
.post-meta{font-size:11px;color:#64748b}
.back-link{color:var(--accent);font-size:13px;text-decoration:none}
.comment{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:10px 14px;margin-bottom:8px;font-size:13px}
.comment-date{font-size:11px;color:#64748b;margin-top:4px}
button{background:var(--card);border:1px solid var(--border);color:var(--text);padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px}
textarea{width:100%;background:var(--card);border:1px solid var(--border);color:var(--text);padding:9px;border-radius:8px;font-family:inherit;margin-bottom:8px}
.share-row{display:flex;gap:8px;margin-top:14px}
</style>
</head>
<body>
<header class="topbar">
  <span class="logo">✨ Мій Блог</span>
  <button id="theme-btn">🌙</button>
</header>

<div class="wrap">
  <div id="app"></div>
</div>

<script>
var POSTS = [
  { id: 1, title: 'Як я вивчила JavaScript за літо', category: 'js', author: 'Аліна', date: '2026-07-01', excerpt: 'Розповідь про перші кроки у програмуванні.', content: 'Повний текст статті про те, як почати вивчати JavaScript з нуля.' },
  { id: 2, title: 'CSS Grid vs Flexbox', category: 'css', author: 'Аліна', date: '2026-06-20', excerpt: 'Коли використовувати що і чому.', content: 'Детальне порівняння CSS Grid і Flexbox з прикладами коду.' },
  { id: 3, title: 'Мій перший хакатон', category: 'life', author: 'Аліна', date: '2026-06-05', excerpt: 'Враження від участі у шкільному хакатоні.', content: 'Історія про 24 години без сну і команду мрії.' },
  { id: 4, title: 'Асинхронність у JS простими словами', category: 'js', author: 'Аліна', date: '2026-05-15', excerpt: 'Promise, async/await без зайвої складності.', content: 'Пояснення асинхронного JavaScript на простих прикладах.' }
];
var CATS = [ { key: 'all', label: 'Всі' }, { key: 'js', label: 'JS' }, { key: 'css', label: 'CSS' }, { key: 'life', label: 'Життя' } ];
var activeCategory = 'all';
var searchQuery = '';

function getComments(postId) { return JSON.parse(localStorage.getItem('comments-' + postId) || '[]'); }
function addComment(postId, text) {
  var comments = getComments(postId);
  comments.push({ text: text, date: new Date().toLocaleString() });
  localStorage.setItem('comments-' + postId, JSON.stringify(comments));
}
function incrementViews(postId) {
  var key = 'views-' + postId;
  var next = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, next);
  return next;
}
function getViews(postId) { return Number(localStorage.getItem('views-' + postId) || 0); }

function getFilteredPosts() {
  var list = activeCategory === 'all' ? POSTS : POSTS.filter(function (p) { return p.category === activeCategory; });
  if (searchQuery) {
    var q = searchQuery.toLowerCase();
    list = list.filter(function (p) { return p.title.toLowerCase().indexOf(q) !== -1 || p.excerpt.toLowerCase().indexOf(q) !== -1; });
  }
  return list;
}

function showList() {
  var posts = getFilteredPosts();
  var filtersHtml = CATS.map(function (c) {
    return '<button class="filter-btn' + (c.key === activeCategory ? ' active' : '') + '" onclick="setCategory(\\'' + c.key + '\\')">' + c.label + '</button>';
  }).join('');
  var postsHtml = posts.length
    ? posts.map(function (p) {
        return '<div class="post-card" onclick="location.hash=\\'#/post/' + p.id + '\\'"><div class="post-title">' + p.title + '</div><div class="post-meta">' + p.author + ' · ' + p.date + ' · 👁 ' + getViews(p.id) + '</div></div>';
      }).join('')
    : '<p style="color:#64748b">Нічого не знайдено</p>';

  document.getElementById('app').innerHTML =
    '<input type="text" id="search-input" placeholder="Пошук постів..." value="' + searchQuery + '">' +
    '<div class="filters">' + filtersHtml + '</div>' +
    postsHtml;

  document.getElementById('search-input').addEventListener('input', function (e) {
    searchQuery = e.target.value;
    showList();
  });
  document.getElementById('search-input').focus();
  document.getElementById('search-input').selectionStart = document.getElementById('search-input').value.length;
}

function setCategory(key) { activeCategory = key; showList(); }

function showPost(id) {
  var post = POSTS.find(function (p) { return p.id === id; });
  if (!post) { document.getElementById('app').innerHTML = '<p>Пост не знайдено</p><a class="back-link" href="#">← Всі пости</a>'; return; }
  var views = incrementViews(post.id);
  var comments = getComments(post.id);

  document.getElementById('app').innerHTML =
    '<a class="back-link" href="#">← Всі пости</a>' +
    '<h2 style="margin-top:10px">' + post.title + '</h2>' +
    '<div class="post-meta" style="margin-bottom:12px">' + post.author + ' · ' + post.date + ' · 👁 ' + views + '</div>' +
    '<p style="font-size:13px;color:#cbd5e1;line-height:1.7">' + post.content + '</p>' +
    '<div class="share-row">' +
    '<a href="https://t.me/share/url?url=https://alina-blog.dev&text=' + encodeURIComponent(post.title) + '" target="_blank" style="text-decoration:none"><button>📨 Telegram</button></a>' +
    '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(post.title) + '" target="_blank" style="text-decoration:none"><button>🐦 Twitter</button></a>' +
    '</div>' +
    '<h3 style="margin-top:20px;font-size:13px;color:#64748b;text-transform:uppercase">Коментарі (' + comments.length + ')</h3>' +
    '<div id="comments-list">' + (comments.length ? comments.map(function (c) { return '<div class="comment">' + c.text + '<div class="comment-date">' + c.date + '</div></div>'; }).join('') : '<p style="color:#64748b;font-size:12.5px">Будь першим!</p>') + '</div>' +
    '<textarea id="comment-input" rows="2" placeholder="Твій коментар..."></textarea>' +
    '<button onclick="submitComment(' + post.id + ')">💬 Додати коментар</button>';
}

function submitComment(postId) {
  var input = document.getElementById('comment-input');
  var text = input.value.trim();
  if (!text) return;
  addComment(postId, text);
  showPost(postId);
}

function render() {
  var hash = location.hash;
  var match = hash.match(/#\\/post\\/(\\d+)/);
  if (match) showPost(Number(match[1]));
  else showList();
}

var savedTheme = localStorage.getItem('blog-theme') || 'dark';
document.body.dataset.theme = savedTheme;
document.getElementById('theme-btn').textContent = savedTheme === 'dark' ? '🌙' : '☀️';
document.getElementById('theme-btn').addEventListener('click', function () {
  var next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  this.textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('blog-theme', next);
});

window.addEventListener('hashchange', render);
render();
<\/script>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Відкрий кілька постів, повернись назад, спробуй фільтри і пошук — перевір, що все працює разом.', ru:'Открой несколько постов, вернись назад, попробуй фильтры и поиск — проверь, что всё работает вместе.' },
      { level:'medium', uk:'Додай у масив POSTS п\'ятий пост зі своєю темою і категорією.', ru:'Добавь в массив POSTS пятый пост со своей темой и категорией.' },
      { level:'hard',   uk:'Додай новий фільтр-категорію в CATS (наприклад "web") і хоча б один пост із нею.', ru:'Добавь новую категорию-фильтр в CATS и хотя бы один пост с ней.' },
      { level:'extra',  uk:'Об\'єднай з уроком 14-05: підключи marked.js через CDN і виводь <code>post.content</code> через <code>marked.parse()</code> замість простого тексту, щоб підтримувався Markdown-синтаксис у статтях.', ru:'Объедини с уроком 14-05: подключи marked.js через CDN и выводи post.content через marked.parse().' },
    ]
  );

})();
