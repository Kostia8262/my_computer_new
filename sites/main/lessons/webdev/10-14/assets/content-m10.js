/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 10 — Tooling та оточення · 10–14
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
button:hover{border-color:#3b82f6;color:#93c5fd}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}
.term{background:#000;border:1px solid #334155;border-radius:10px;padding:14px;font-family:Consolas,monospace;font-size:12.5px;color:#a3e635;min-height:120px;max-height:280px;overflow-y:auto;white-space:pre-wrap;line-height:1.7;margin-top:10px}
.term-prompt{color:#38bdf8}
.term-err{color:#f87171}
.term-ok{color:#4ade80}
.term-dim{color:#64748b}
.term-file{color:#fbbf24}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}`;

  /* ─── 10-01: npm — пакети, package.json, scripts ────────────── */
  patch('10-01',
    { uk:`<h2>npm: пакети, package.json, scripts</h2>
<p><strong>npm</strong> (Node Package Manager) — менеджер пакетів для JavaScript. Він встановлює бібліотеки (пакети), яких немає у стандартному JS, і керує ними через один файл — <code>package.json</code>.</p>
<h3>package.json</h3>
<pre>{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": { "axios": "^1.6.0" },
  "devDependencies": { "eslint": "^9.0.0" }
}</pre>
<h3>Основні команди</h3>
<pre>npm init -y          # створити package.json
npm install axios    # встановити пакет (dependencies)
npm install -D eslint # встановити dev-пакет (devDependencies)
npm run dev          # запустити script "dev"
npm uninstall axios  # видалити пакет</pre>
<h3>Semver: ^1.6.0 та ~1.6.0</h3>
<p><code>^1.6.0</code> — дозволяє оновлення до 1.x.x (не 2.0.0). <code>~1.6.0</code> — дозволяє лише патчі 1.6.x. Точна версія <code>1.6.0</code> — без апгрейдів.</p>
<h3>dependencies vs devDependencies</h3>
<p><strong>dependencies</strong> — потрібні у продакшні (наприклад, бібліотека для дат). <strong>devDependencies</strong> — потрібні лише під час розробки (лінтер, бандлер, тести).</p>`,
      ru:`<h2>npm: пакеты, package.json, scripts</h2>
<p><strong>npm</strong> (Node Package Manager) — менеджер пакетов для JavaScript. Он устанавливает библиотеки (пакеты), которых нет в стандартном JS, и управляет ими через один файл — <code>package.json</code>.</p>
<h3>package.json</h3>
<pre>{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": { "axios": "^1.6.0" },
  "devDependencies": { "eslint": "^9.0.0" }
}</pre>
<h3>Основные команды</h3>
<pre>npm init -y          # создать package.json
npm install axios    # установить пакет (dependencies)
npm install -D eslint # установить dev-пакет (devDependencies)
npm run dev          # запустить script "dev"
npm uninstall axios  # удалить пакет</pre>
<h3>Semver: ^1.6.0 и ~1.6.0</h3>
<p><code>^1.6.0</code> — разрешает обновления до 1.x.x (не 2.0.0). <code>~1.6.0</code> — разрешает только патчи 1.6.x.</p>
<h3>dependencies vs devDependencies</h3>
<p><strong>dependencies</strong> — нужны в продакшне. <strong>devDependencies</strong> — нужны только при разработке (линтер, бандлер, тесты).</p>` },
    `<h2>npm sandbox — package.json</h2>
<pre class="term-file" id="pkg-view">{
  "name": "quiz-game",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {},
  "devDependencies": {}
}</pre>
<div class="btn-row">
  <button onclick="npmInstall('axios')">npm install axios</button>
  <button onclick="npmInstallDev('eslint')">npm install -D eslint</button>
  <button onclick="npmRun('dev')">npm run dev</button>
</div>
<div class="term" id="t1">$ Готовий до команд...</div>`,
    `${BASE}
#pkg-view{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;font-size:12px;color:#e2e8f0;white-space:pre-wrap}`,
    `let deps = {};
let devDeps = {};

function renderPkg() {
  const depsStr = Object.keys(deps).length
    ? Object.entries(deps).map(([k, v]) => '    "' + k + '": "' + v + '"').join(',\\n')
    : '';
  const devStr = Object.keys(devDeps).length
    ? Object.entries(devDeps).map(([k, v]) => '    "' + k + '": "' + v + '"').join(',\\n')
    : '';
  document.getElementById('pkg-view').textContent =
    '{\\n  "name": "quiz-game",\\n  "version": "1.0.0",\\n  "scripts": {\\n    "dev": "vite",\\n    "build": "vite build"\\n  },\\n  "dependencies": {\\n' +
    depsStr + '\\n  },\\n  "devDependencies": {\\n' + devStr + '\\n  }\\n}';
}

function log(id, text, cls) {
  const t = document.getElementById(id);
  const span = cls ? '<span class="' + cls + '">' + text + '</span>' : text;
  t.innerHTML += '\\n' + span;
  t.scrollTop = t.scrollHeight;
}

function npmInstall(pkg) {
  log('t1', '<span class="term-prompt">$</span> npm install ' + pkg);
  log('t1', 'added 1 package in 0.8s', 'term-ok');
  deps[pkg] = '^1.6.0';
  renderPkg();
}
function npmInstallDev(pkg) {
  log('t1', '<span class="term-prompt">$</span> npm install -D ' + pkg);
  log('t1', 'added 1 package in 0.6s', 'term-ok');
  devDeps[pkg] = '^9.0.0';
  renderPkg();
}
function npmRun(script) {
  log('t1', '<span class="term-prompt">$</span> npm run ' + script);
  log('t1', '  VITE ready in 214 ms', 'term-ok');
  log('t1', '  Local: http://localhost:5173/', 'term-dim');
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки по черзі і подивись, як змінюється package.json та термінал.', ru:'Нажми все три кнопки по очереди и посмотри, как меняется package.json и терминал.' },
      { level:'medium', uk:'Додай четверту кнопку "npm install dayjs", яка так само встановлює пакет через <code>npmInstall(\'dayjs\')</code>.', ru:'Добавь четвёртую кнопку "npm install dayjs", которая так же устанавливает пакет через <code>npmInstall(\'dayjs\')</code>.' },
      { level:'hard',   uk:'Додай кнопку "npm uninstall axios", яка видаляє ключ <code>axios</code> з об\'єкта <code>deps</code> (delete deps.axios) і викликає <code>renderPkg()</code>.', ru:'Добавь кнопку "npm uninstall axios", которая удаляет ключ <code>axios</code> из объекта <code>deps</code> (delete deps.axios) и вызывает <code>renderPkg()</code>.' },
    ]
  );

  /* ─── 10-02: Vite — швидкий бандлер і dev-сервер ────────────── */
  patch('10-02',
    { uk:`<h2>Vite: швидкий бандлер і dev-сервер</h2>
<p><strong>Vite</strong> (франц. «швидкий») — сучасний інструмент для запуску і збірки JS-проектів. На відміну від старих бандлерів, Vite використовує нативні ES-модулі браузера під час розробки — тому сервер стартує майже миттєво.</p>
<h3>Створення проекту</h3>
<pre>npm create vite@latest my-app
cd my-app
npm install
npm run dev</pre>
<h3>Що таке HMR (Hot Module Replacement)</h3>
<p>Коли ти зберігаєш файл, Vite оновлює <strong>лише змінений модуль</strong> у браузері — без перезавантаження всієї сторінки. Стан застосунку (наприклад, введений текст у полі) зберігається.</p>
<h3>vite.config.js</h3>
<pre>import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 3000 },
  build:  { outDir: 'dist' }
});</pre>
<h3>npm run build</h3>
<p>Створює оптимізовану папку <code>dist/</code> — мінімізований, готовий до публікації код.</p>`,
      ru:`<h2>Vite: быстрый бандлер и dev-сервер</h2>
<p><strong>Vite</strong> (франц. «быстрый») — современный инструмент для запуска и сборки JS-проектов. Vite использует нативные ES-модули браузера при разработке — поэтому сервер стартует почти мгновенно.</p>
<h3>Создание проекта</h3>
<pre>npm create vite@latest my-app
cd my-app
npm install
npm run dev</pre>
<h3>Что такое HMR (Hot Module Replacement)</h3>
<p>Когда ты сохраняешь файл, Vite обновляет <strong>только изменённый модуль</strong> в браузере — без перезагрузки всей страницы. Состояние приложения сохраняется.</p>
<h3>vite.config.js</h3>
<pre>import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 3000 },
  build:  { outDir: 'dist' }
});</pre>
<h3>npm run build</h3>
<p>Создаёт оптимизированную папку <code>dist/</code> — минимизированный, готовый к публикации код.</p>` },
    `<h2>HMR у дії (симуляція)</h2>
<p>Зміни текст нижче — «Vite dev-сервер» оновить прев'ю миттєво, без перезавантаження:</p>
<textarea id="src-file" rows="3" style="width:100%;background:#1e293b;border:1px solid #334155;color:#f1f5f9;padding:10px;border-radius:8px;font-family:monospace;font-size:13px">export default function App() {
  return "Привіт, Vite!";
}</textarea>
<div id="hmr-preview">Привіт, Vite!</div>
<div class="term" id="t2">$ npm run dev
  VITE v5.2.0  ready in 214 ms
  ➜  Local:   http://localhost:5173/</div>`,
    `${BASE}
#hmr-preview{margin-top:14px;background:#1e293b;border:1px solid #4ade80;border-radius:10px;padding:20px;font-size:20px;font-weight:700;text-align:center;transition:.2s}`,
    `const srcFile = document.getElementById('src-file');
const preview = document.getElementById('hmr-preview');
const term    = document.getElementById('t2');

srcFile.addEventListener('input', () => {
  const match = srcFile.value.match(/return "(.*)"/);
  const text  = match ? match[1] : '...';
  preview.textContent = text;
  preview.style.borderColor = '#fbbf24';
  setTimeout(() => { preview.style.borderColor = '#4ade80'; }, 250);

  term.innerHTML += '\\n<span class="term-dim">[hmr]</span> App.jsx оновлено — module hot-reloaded';
  term.scrollTop = term.scrollHeight;
});`,
    [
      { level:'easy',   uk:'Зміни текст у лапках return "..." і подивись, як прев\'ю оновлюється без перезавантаження.', ru:'Измени текст в кавычках return "..." и посмотри, как превью обновляется без перезагрузки.' },
      { level:'medium', uk:'Додай у термінал повідомлення при першому завантаженні сторінки: "[vite] connected." (до обробника input).', ru:'Добавь в терминал сообщение при первой загрузке страницы: "[vite] connected." (до обработчика input).' },
      { level:'hard',   uk:'Зроби так, щоб при помилці в регулярному виразі (текст без return "...") прев\'ю показувало "Помилка компіляції" червоним кольором замість "...".', ru:'Сделай так, чтобы при ошибке (текст без return "...") превью показывало "Ошибка компиляции" красным цветом вместо "...".' },
    ]
  );

  /* ─── 10-03: ESLint та Prettier ──────────────────────────────── */
  patch('10-03',
    { uk:`<h2>ESLint та Prettier: якість та форматування коду</h2>
<p><strong>ESLint</strong> шукає помилки і небезпечні місця в коді (наприклад, невикористану змінну чи <code>==</code> замість <code>===</code>). <strong>Prettier</strong> автоматично форматує код — відступи, лапки, крапки з комою — щоб весь проект виглядав однаково.</p>
<h3>Типові правила ESLint</h3>
<pre>{
  "rules": {
    "no-unused-vars": "warn",
    "eqeqeq": "error",
    "no-console": "off"
  }
}</pre>
<h3>Команди</h3>
<pre>npx eslint src/           # перевірити файли
npx eslint src/ --fix     # виправити те, що можна автоматично
npx prettier --write src/ # відформатувати весь код</pre>
<h3>ESLint + Prettier разом</h3>
<p>ESLint стежить за <em>логікою і якістю</em> (невикористані змінні, забутий <code>break</code>). Prettier стежить лише за <em>виглядом</em> (відступи, лапки). Разом вони покривають і те, і те.</p>`,
      ru:`<h2>ESLint и Prettier: качество и форматирование кода</h2>
<p><strong>ESLint</strong> ищет ошибки и опасные места в коде (например, неиспользуемую переменную или <code>==</code> вместо <code>===</code>). <strong>Prettier</strong> автоматически форматирует код — отступы, кавычки, точки с запятой.</p>
<h3>Типичные правила ESLint</h3>
<pre>{
  "rules": {
    "no-unused-vars": "warn",
    "eqeqeq": "error",
    "no-console": "off"
  }
}</pre>
<h3>Команды</h3>
<pre>npx eslint src/           # проверить файлы
npx eslint src/ --fix     # исправить то, что можно автоматически
npx prettier --write src/ # отформатировать весь код</pre>
<h3>ESLint + Prettier вместе</h3>
<p>ESLint следит за <em>логикой и качеством</em>. Prettier следит только за <em>внешним видом</em>. Вместе они покрывают обе задачи.</p>` },
    `<h2>«Брудний» код</h2>
<pre id="dirty" style="background:#1e293b;border:1px solid #f87171;border-radius:10px;padding:14px;font-size:12.5px;white-space:pre-wrap">function calc(a,b) {
    var result = a+b
    var unused = 42
    if (result == 10) {
        console.log('ten')
    }
    return result
}</pre>
<div class="btn-row">
  <button onclick="runEslint()">npx eslint --fix</button>
  <button onclick="runPrettier()">npx prettier --write</button>
</div>
<div class="term" id="t3">$ Код вище має 3 проблеми — спробуй виправити</div>`,
    `${BASE}
#clean{margin-top:12px;background:#1e293b;border:1px solid #4ade80;border-radius:10px;padding:14px;font-size:12.5px;white-space:pre-wrap;display:none}`,
    `function runEslint() {
  const t = document.getElementById('t3');
  t.innerHTML +=
    '\\n<span class="term-prompt">$</span> npx eslint src/app.js --fix' +
    '\\n<span class="term-err">warn</span>  \\'unused\\' is assigned a value but never used  no-unused-vars' +
    '\\n<span class="term-err">error</span> Expected \\'===\\' and instead saw \\'==\\'          eqeqeq' +
    '\\n<span class="term-ok">✔ 1 problem auto-fixed, 1 warning remains</span>';
  t.scrollTop = t.scrollHeight;
}

function runPrettier() {
  const t = document.getElementById('t3');
  t.innerHTML += '\\n<span class="term-prompt">$</span> npx prettier --write src/app.js' +
    '\\n<span class="term-ok">src/app.js 32ms</span>';
  t.scrollTop = t.scrollHeight;

  let clean = document.getElementById('clean');
  if (!clean) {
    clean = document.createElement('pre');
    clean.id = 'clean';
    document.getElementById('dirty').after(clean);
  }
  clean.style.display = 'block';
  clean.textContent =
    'function calc(a, b) {\\n' +
    '  const result = a + b;\\n' +
    '  if (result === 10) {\\n' +
    "    console.log('ten');\\n" +
    '  }\\n' +
    '  return result;\\n' +
    '}';
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і порівняй «брудний» код із результатом Prettier.', ru:'Нажми обе кнопки и сравни «грязный» код с результатом Prettier.' },
      { level:'medium', uk:'Додай у список ESLint-повідомлень ще одне: "warn  Missing semicolon  semi" (третій рядок у виводі).', ru:'Добавь в список ESLint-сообщений ещё одно: "warn  Missing semicolon  semi".' },
      { level:'hard',   uk:'Зроби так, щоб <code>unused</code> зникав з очищеного коду в <code>runPrettier()</code> повністю (адже ESLint позначив його як невикористаний).', ru:'Сделай так, чтобы <code>unused</code> исчезал из очищенного кода в <code>runPrettier()</code> полностью.' },
    ]
  );

  /* ─── 10-04: Git — init, add, commit, push ──────────────────── */
  patch('10-04',
    { uk:`<h2>Git: init, add, commit, push — перші кроки</h2>
<p><strong>Git</strong> — система контролю версій: він запам'ятовує кожну зміну у твоєму проекті, тому ти завжди можеш повернутись до попередньої версії.</p>
<h3>Три зони Git</h3>
<pre>Working Directory  →  Staging Area  →  Repository (commit)
  (твої файли)         (git add)         (git commit)</pre>
<h3>Базові команди</h3>
<pre>git init                 # почати новий репозиторій
git status               # що змінилось
git add index.html       # додати файл у staging
git add .                # додати всі файли
git commit -m "Опис"     # зберегти знімок (commit)
git log                  # історія commit'ів
git push                 # відправити на GitHub</pre>
<h3>Гарний commit message</h3>
<p>Короткий, у теперішньому часі: <code>"Add quiz score counter"</code>, а не <code>"fixed stuff"</code>.</p>`,
      ru:`<h2>Git: init, add, commit, push — первые шаги</h2>
<p><strong>Git</strong> — система контроля версий: он запоминает каждое изменение в твоём проекте, поэтому ты всегда можешь вернуться к предыдущей версии.</p>
<h3>Три зоны Git</h3>
<pre>Working Directory  →  Staging Area  →  Repository (commit)
  (твои файлы)         (git add)         (git commit)</pre>
<h3>Базовые команды</h3>
<pre>git init                 # начать новый репозиторий
git status               # что изменилось
git add index.html       # добавить файл в staging
git add .                # добавить все файлы
git commit -m "Описание" # сохранить снимок (commit)
git log                  # история commit'ов
git push                 # отправить на GitHub</pre>
<h3>Хороший commit message</h3>
<p>Короткий, в настоящем времени: <code>"Add quiz score counter"</code>, а не <code>"fixed stuff"</code>.</p>` },
    `<h2>Git-пісочниця</h2>
<p>Файли в проекті:</p>
<ul id="files" style="font-size:13px;color:#94a3b8;line-height:2;list-style:none;padding-left:0"></ul>
<div class="btn-row">
  <button onclick="gitInit()">git init</button>
  <button onclick="gitAdd()">git add .</button>
  <button onclick="gitCommit()">git commit -m "Initial commit"</button>
  <button onclick="gitPush()">git push</button>
</div>
<div class="term" id="t4">$ Почни з git init...</div>`,
    `${BASE}
.file-staged{color:#4ade80}
.file-unstaged{color:#fbbf24}`,
    `const filesData = [
  { name: 'index.html', staged: false },
  { name: 'style.css',  staged: false },
  { name: 'script.js',  staged: false },
];
let inited = false;

function renderFiles() {
  document.getElementById('files').innerHTML = filesData.map(f =>
    '<li class="' + (f.staged ? 'file-staged' : 'file-unstaged') + '">' +
    (f.staged ? '✔ staged' : '● modified') + ' — ' + f.name + '</li>'
  ).join('');
}
renderFiles();

function log(text, cls) {
  const t = document.getElementById('t4');
  t.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  t.scrollTop = t.scrollHeight;
}

function gitInit() {
  if (inited) { log('Reinitialized existing Git repository', 'term-dim'); return; }
  inited = true;
  log('<span class="term-prompt">$</span> git init');
  log('Initialized empty Git repository in .git/', 'term-ok');
}
function gitAdd() {
  if (!inited) { log('fatal: not a git repository', 'term-err'); return; }
  log('<span class="term-prompt">$</span> git add .');
  filesData.forEach(f => f.staged = true);
  renderFiles();
  log(filesData.length + ' files staged', 'term-ok');
}
function gitCommit() {
  if (!filesData.every(f => f.staged)) { log('nothing to commit', 'term-err'); return; }
  log('<span class="term-prompt">$</span> git commit -m "Initial commit"');
  log('[main a1b2c3d] Initial commit', 'term-ok');
  log((filesData.length) + ' files changed', 'term-dim');
}
function gitPush() {
  log('<span class="term-prompt">$</span> git push origin main');
  log('Enumerating objects: done.', 'term-dim');
  log('To github.com:user/quiz-game.git', 'term-dim');
  log('main -> main', 'term-ok');
}`,
    [
      { level:'easy',   uk:'Натисни всі 4 кнопки по порядку: init → add → commit → push.', ru:'Нажми все 4 кнопки по порядку: init → add → commit → push.' },
      { level:'medium', uk:'Спробуй натиснути "git add ." одразу після "git commit" — переконайся що термінал каже, що додавати нічого (усі файли вже staged).', ru:'Попробуй нажать "git add ." сразу после "git commit" — убедись что терминал говорит, что добавлять нечего.' },
      { level:'hard',   uk:'Додай новий файл у масив <code>filesData</code> — <code>{ name: "README.md", staged: false }</code> — і переконайся, що він теж бере участь у add/commit.', ru:'Добавь новый файл в массив <code>filesData</code> — <code>{ name: "README.md", staged: false }</code> — и убедись, что он тоже участвует в add/commit.' },
    ]
  );

  /* ─── 10-05: Git — branch, merge, pull request ──────────────── */
  patch('10-05',
    { uk:`<h2>Git: branch, merge, pull request</h2>
<p><strong>Гілка (branch)</strong> — незалежна лінія розробки. Головна гілка зазвичай зветься <code>main</code>. Нову функцію розробляють в окремій гілці, щоб не зламати робочий код.</p>
<h3>Команди</h3>
<pre>git branch                  # список гілок
git checkout -b feature/quiz # створити і перейти в нову гілку
git checkout main            # повернутись на main
git merge feature/quiz       # злити гілку в main</pre>
<h3>Merge conflict</h3>
<p>Виникає, коли дві гілки змінили один і той самий рядок коду. Git не може вирішити сам — потрібно обрати варіант вручну і зробити новий commit.</p>
<h3>Pull Request (PR)</h3>
<p>Це не команда Git, а функція <strong>GitHub</strong>: пропозиція злити твою гілку в main із можливістю code review — колеги можуть залишити коментарі перед тим, як код потрапить у головну гілку.</p>`,
      ru:`<h2>Git: branch, merge, pull request</h2>
<p><strong>Ветка (branch)</strong> — независимая линия разработки. Главная ветка обычно называется <code>main</code>. Новую функцию разрабатывают в отдельной ветке, чтобы не сломать рабочий код.</p>
<h3>Команды</h3>
<pre>git branch                  # список веток
git checkout -b feature/quiz # создать и перейти в новую ветку
git checkout main            # вернуться на main
git merge feature/quiz       # слить ветку в main</pre>
<h3>Merge conflict</h3>
<p>Возникает, когда две ветки изменили одну и ту же строку кода. Git не может решить сам — нужно выбрать вариант вручную и сделать новый commit.</p>
<h3>Pull Request (PR)</h3>
<p>Это не команда Git, а функция <strong>GitHub</strong>: предложение слить твою ветку в main с возможностью code review.</p>` },
    `<h2>Граф гілок</h2>
<div id="graph" style="display:flex;flex-direction:column;gap:6px;font-family:monospace;font-size:13px;color:#94a3b8;min-height:80px"></div>
<div class="btn-row">
  <button onclick="createBranch()">git checkout -b feature/quiz</button>
  <button onclick="commitOnBranch()">commit на feature/quiz</button>
  <button onclick="mergeBranch()">git merge feature/quiz</button>
</div>
<div class="term" id="t5">$ Гілка main готова</div>`,
    `${BASE}
.branch-main{color:#38bdf8}
.branch-feature{color:#fbbf24}`,
    `let hasFeature = false;
let featureCommits = 0;
let merged = false;

function renderGraph() {
  const g = document.getElementById('graph');
  let lines = ['<span class="branch-main">●─── main</span>'];
  if (hasFeature) {
    lines.push('<span class="branch-feature">└─●' + '─●'.repeat(featureCommits) + ' feature/quiz</span>');
  }
  if (merged) {
    lines.push('<span class="branch-main">●─── main (злито з feature/quiz)</span>');
  }
  g.innerHTML = lines.join('<br>');
}
renderGraph();

function log(text, cls) {
  const t = document.getElementById('t5');
  t.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  t.scrollTop = t.scrollHeight;
}

function createBranch() {
  if (hasFeature) { log('fatal: branch already exists', 'term-err'); return; }
  hasFeature = true;
  renderGraph();
  log('<span class="term-prompt">$</span> git checkout -b feature/quiz');
  log("Switched to a new branch 'feature/quiz'", 'term-ok');
}
function commitOnBranch() {
  if (!hasFeature) { log('спочатку створи гілку', 'term-err'); return; }
  featureCommits++;
  renderGraph();
  log('<span class="term-prompt">$</span> git commit -m "Add question renderer"');
  log('[feature/quiz] commit ' + featureCommits, 'term-ok');
}
function mergeBranch() {
  if (!hasFeature || featureCommits === 0) { log('нема що зливати', 'term-err'); return; }
  merged = true;
  renderGraph();
  log('<span class="term-prompt">$</span> git checkout main && git merge feature/quiz');
  log('Fast-forward', 'term-dim');
  log(featureCommits + ' commits merged into main', 'term-ok');
}`,
    [
      { level:'easy',   uk:'Пройди весь цикл: створи гілку → зроби 2 коміти → злий у main.', ru:'Пройди весь цикл: создай ветку → сделай 2 коммита → слей в main.' },
      { level:'medium', uk:'Спробуй викликати "git merge" ДО того як зробиш хоча б один коміт на feature/quiz — переконайся, що термінал каже "нема що зливати".', ru:'Попробуй вызвать "git merge" ДО того как сделаешь хотя бы один коммит — убедись, что терминал говорит "нечего сливать".' },
      { level:'hard',   uk:'Додай другу кнопку "git branch" яка виводить у термінал список гілок: "* main" і, якщо є, "  feature/quiz".', ru:'Добавь вторую кнопку "git branch", которая выводит в терминал список веток: "* main" и, если есть, "  feature/quiz".' },
    ]
  );

  /* ─── 10-06: GitHub — репозиторій та GitHub Pages ───────────── */
  patch('10-06',
    { uk:`<h2>GitHub: репозиторій та GitHub Pages</h2>
<p><strong>GitHub</strong> — хмарний сервіс для зберігання Git-репозиторіїв. Це не те саме, що Git: Git працює локально на твоєму комп'ютері, а GitHub — це "хмара", де можна зберігати код і працювати командою.</p>
<h3>Створення репозиторію</h3>
<pre>1. github.com → New repository
2. Вкажи назву (наприклад quiz-game)
3. git remote add origin https://github.com/user/quiz-game.git
4. git push -u origin main</pre>
<h3>GitHub Pages</h3>
<p>Безкоштовний хостинг для статичних сайтів прямо з репозиторію: Settings → Pages → обери гілку <code>main</code> → сайт з'явиться за адресою <code>https://user.github.io/quiz-game/</code>.</p>
<h3>README.md</h3>
<p>Файл, що показується на головній сторінці репозиторію — опис проекту, як його запустити, скріншоти.</p>`,
      ru:`<h2>GitHub: репозиторий и GitHub Pages</h2>
<p><strong>GitHub</strong> — облачный сервис для хранения Git-репозиториев. Git работает локально на твоём компьютере, а GitHub — это "облако", где можно хранить код и работать командой.</p>
<h3>Создание репозитория</h3>
<pre>1. github.com → New repository
2. Укажи название (например quiz-game)
3. git remote add origin https://github.com/user/quiz-game.git
4. git push -u origin main</pre>
<h3>GitHub Pages</h3>
<p>Бесплатный хостинг для статических сайтов прямо из репозитория: Settings → Pages → выбери ветку <code>main</code> → сайт появится по адресу <code>https://user.github.io/quiz-game/</code>.</p>
<h3>README.md</h3>
<p>Файл, показываемый на главной странице репозитория — описание проекта, как запустить, скриншоты.</p>` },
    `<div id="repo-card" style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:16px;max-width:420px">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
    <span style="font-size:20px">📦</span>
    <strong style="font-size:15px">user / quiz-game</strong>
  </div>
  <p style="font-size:12px;color:#94a3b8;margin-bottom:10px">Квіз-гра на JavaScript для навчання 🎮</p>
  <div style="display:flex;gap:14px;font-size:12px;color:#64748b">
    <span>⭐ <span id="stars">0</span></span>
    <span>🍴 <span id="forks">0</span></span>
    <span id="pages-status">🔴 Pages: вимкнено</span>
  </div>
</div>
<div class="btn-row">
  <button onclick="starRepo()">⭐ Star</button>
  <button onclick="forkRepo()">🍴 Fork</button>
  <button onclick="enablePages()">Enable GitHub Pages</button>
</div>
<div class="term" id="t6">$ Репозиторій quiz-game створено</div>`,
    `${BASE}`,
    `let stars = 0, forks = 0;

function log(text, cls) {
  const t = document.getElementById('t6');
  t.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  t.scrollTop = t.scrollHeight;
}

function starRepo() {
  stars++;
  document.getElementById('stars').textContent = stars;
  log('⭐ Хтось поставив зірку репозиторію!', 'term-ok');
}
function forkRepo() {
  forks++;
  document.getElementById('forks').textContent = forks;
  log('🍴 Репозиторій форкнули', 'term-dim');
}
function enablePages() {
  document.getElementById('pages-status').textContent = '🟢 Pages: увімкнено';
  log('<span class="term-prompt">$</span> Settings → Pages → Branch: main');
  log('Your site is live at https://user.github.io/quiz-game/', 'term-ok');
}`,
    [
      { level:'easy',   uk:'Натисни ⭐ Star кілька разів і Enable GitHub Pages — подивись на зміну статусу.', ru:'Нажми ⭐ Star несколько раз и Enable GitHub Pages — посмотри на изменение статуса.' },
      { level:'medium', uk:'Додай в картку репозиторію рядок з мовою проекту: <code>&lt;span&gt;💻 JavaScript&lt;/span&gt;</code> поруч зі stars/forks.', ru:'Добавь в карточку репозитория строку с языком проекта: <code>&lt;span&gt;💻 JavaScript&lt;/span&gt;</code> рядом со stars/forks.' },
      { level:'hard',   uk:'Зроби так, щоб кнопка "Enable GitHub Pages" ставала неактивною (<code>disabled</code>) після першого натискання — повторно вмикати не можна.', ru:'Сделай так, чтобы кнопка "Enable GitHub Pages" становилась неактивной (<code>disabled</code>) после первого нажатия.' },
    ]
  );

  /* ─── 10-07: Chrome DevTools — debugging та профілювання ────── */
  patch('10-07',
    { uk:`<h2>Chrome DevTools: debugging JS і профілювання</h2>
<p>DevTools відкривається через <kbd>F12</kbd> або <kbd>Ctrl+Shift+I</kbd>. Найважливіші вкладки:</p>
<h3>Панелі</h3>
<ul>
  <li><strong>Elements</strong> — HTML/CSS дерево сторінки в реальному часі.</li>
  <li><strong>Console</strong> — вивід <code>console.log</code>, помилки, ручне виконання JS.</li>
  <li><strong>Sources</strong> — перегляд файлів і <strong>breakpoints</strong> (точки зупинки).</li>
  <li><strong>Network</strong> — усі запити (fetch, зображення, скрипти) і їх час завантаження.</li>
  <li><strong>Performance</strong> — запис і аналіз швидкодії сторінки.</li>
</ul>
<h3>Методи console</h3>
<pre>console.log('звичайне повідомлення');
console.warn('попередження');
console.error('помилка');
console.table([{id:1,name:'A'},{id:2,name:'B'}]);
console.group('Група'); console.log('всередині'); console.groupEnd();</pre>
<h3>debugger</h3>
<p>Рядок <code>debugger;</code> у коді зупиняє виконання в DevTools так само, як breakpoint, поставлений мишкою.</p>`,
      ru:`<h2>Chrome DevTools: debugging JS и профилирование</h2>
<p>DevTools открывается через <kbd>F12</kbd> или <kbd>Ctrl+Shift+I</kbd>. Важнейшие вкладки:</p>
<h3>Панели</h3>
<ul>
  <li><strong>Elements</strong> — HTML/CSS дерево страницы в реальном времени.</li>
  <li><strong>Console</strong> — вывод <code>console.log</code>, ошибки, ручное выполнение JS.</li>
  <li><strong>Sources</strong> — просмотр файлов и <strong>breakpoints</strong> (точки останова).</li>
  <li><strong>Network</strong> — все запросы и их время загрузки.</li>
  <li><strong>Performance</strong> — запись и анализ производительности страницы.</li>
</ul>
<h3>Методы console</h3>
<pre>console.log('обычное сообщение');
console.warn('предупреждение');
console.error('ошибка');
console.table([{id:1,name:'A'},{id:2,name:'B'}]);
console.group('Группа'); console.log('внутри'); console.groupEnd();</pre>
<h3>debugger</h3>
<p>Строка <code>debugger;</code> в коде останавливает выполнение в DevTools так же, как breakpoint.</p>` },
    `<h2>Консоль-симулятор</h2>
<div class="btn-row">
  <button onclick="run('log')">console.log()</button>
  <button onclick="run('warn')">console.warn()</button>
  <button onclick="run('error')">console.error()</button>
  <button onclick="run('table')">console.table()</button>
</div>
<div id="console-panel" style="margin-top:12px;background:#1a1a2e;border:1px solid #334155;border-radius:10px;padding:10px;font-family:Consolas,monospace;font-size:12.5px;min-height:140px"></div>`,
    `${BASE}
.c-log{color:#e2e8f0;padding:4px 8px;border-bottom:1px solid #22303f}
.c-warn{color:#facc15;background:rgba(250,204,21,.08);padding:4px 8px;border-bottom:1px solid #22303f}
.c-error{color:#f87171;background:rgba(248,113,113,.08);padding:4px 8px;border-bottom:1px solid #22303f}
.c-table{width:100%;border-collapse:collapse;margin:6px 0;font-size:11.5px}
.c-table td,.c-table th{border:1px solid #334155;padding:4px 8px;color:#cbd5e1}`,
    `function run(type) {
  const panel = document.getElementById('console-panel');

  if (type === 'log') {
    panel.innerHTML += '<div class="c-log">▶ Квіз завантажено, питань: 10</div>';
  } else if (type === 'warn') {
    panel.innerHTML += '<div class="c-warn">⚠ Таймер не зупинено перед переходом до наступного питання</div>';
  } else if (type === 'error') {
    panel.innerHTML += '<div class="c-error">✖ Uncaught TypeError: questions[10] is undefined</div>';
  } else if (type === 'table') {
    panel.innerHTML +=
      '<table class="c-table"><tr><th>#</th><th>Питання</th><th>Правильно</th></tr>' +
      '<tr><td>1</td><td>Столиця Франції?</td><td>так</td></tr>' +
      '<tr><td>2</td><td>2 + 2 = ?</td><td>ні</td></tr></table>';
  }
  panel.scrollTop = panel.scrollHeight;
}`,
    [
      { level:'easy',   uk:'Натисни всі 4 кнопки і подивись, як по-різному виглядають типи повідомлень у консолі.', ru:'Нажми все 4 кнопки и посмотри, как по-разному выглядят типы сообщений в консоли.' },
      { level:'medium', uk:'Додай п\'яту кнопку "console.clear()" з функцією, яка очищує <code>console-panel.innerHTML = \'\'</code>.', ru:'Добавь пятую кнопку "console.clear()" с функцией, которая очищает <code>console-panel.innerHTML = \'\'</code>.' },
      { level:'hard',   uk:'Додай до <code>console.table()</code> ще один рядок з новим питанням і зроби так, щоб при кожному натисканні кнопки таблиця перебудовувалась заново (не додавалась вдруге).', ru:'Добавь в <code>console.table()</code> ещё одну строку и сделай так, чтобы при каждом нажатии кнопки таблица перестраивалась заново (не добавлялась второй раз).' },
    ]
  );

  /* ─── 10-08: Lighthouse — продуктивність, SEO, доступність ──── */
  patch('10-08',
    { uk:`<h2>Lighthouse: продуктивність, SEO, доступність</h2>
<p><strong>Lighthouse</strong> — вбудований у Chrome DevTools інструмент аудиту сайту. Запускається у вкладці <strong>Lighthouse</strong>, оцінює 4 категорії від 0 до 100.</p>
<h3>4 категорії</h3>
<ul>
  <li><strong>Performance</strong> — швидкість завантаження (розмір зображень, JS, час до інтерактивності).</li>
  <li><strong>Accessibility</strong> — контраст кольорів, alt-атрибути, aria-мітки.</li>
  <li><strong>Best Practices</strong> — HTTPS, відсутність застарілих API, консольні помилки.</li>
  <li><strong>SEO</strong> — meta-теги, правильні заголовки, мобільна адаптивність.</li>
</ul>
<h3>Типові поради (fix suggestions)</h3>
<pre>❌ &lt;img src="cat.jpg"&gt;
✅ &lt;img src="cat.jpg" alt="Рудий кіт спить на дивані"&gt;

❌ color: #999 на білому фоні (низький контраст)
✅ color: #595959 (контраст ≥ 4.5:1)</pre>
<p>Мета — score 90+ у всіх категоріях перед публікацією сайту.</p>`,
      ru:`<h2>Lighthouse: производительность, SEO, доступность</h2>
<p><strong>Lighthouse</strong> — встроенный в Chrome DevTools инструмент аудита сайта. Оценивает 4 категории от 0 до 100.</p>
<h3>4 категории</h3>
<ul>
  <li><strong>Performance</strong> — скорость загрузки.</li>
  <li><strong>Accessibility</strong> — контраст цветов, alt-атрибуты, aria-метки.</li>
  <li><strong>Best Practices</strong> — HTTPS, отсутствие устаревших API, ошибки в консоли.</li>
  <li><strong>SEO</strong> — meta-теги, правильные заголовки, мобильная адаптивность.</li>
</ul>
<h3>Типичные советы (fix suggestions)</h3>
<pre>❌ &lt;img src="cat.jpg"&gt;
✅ &lt;img src="cat.jpg" alt="Рыжий кот спит на диване"&gt;

❌ color: #999 на белом фоне (низкий контраст)
✅ color: #595959 (контраст ≥ 4.5:1)</pre>
<p>Цель — score 90+ во всех категориях перед публикацией сайта.</p>` },
    `<h2>Lighthouse Report</h2>
<div id="scores" style="display:flex;gap:16px;flex-wrap:wrap;margin:14px 0"></div>
<button onclick="runAudit()">▶ Запустити аудит</button>
<ul id="suggestions" style="margin-top:12px;font-size:12.5px;color:#94a3b8;line-height:1.8"></ul>`,
    `${BASE}
.gauge{width:88px;height:88px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#1e293b;border:1px solid #334155}
.gauge-num{font-size:22px;font-weight:900}
.gauge-label{font-size:9px;color:#64748b;text-transform:uppercase;margin-top:2px;text-align:center}
.g-good{color:#4ade80}.g-mid{color:#fbbf24}.g-bad{color:#f87171}`,
    `const CATS = [
  { key:'perf',  label:'Performance',     target:78 },
  { key:'a11y',  label:'Accessibility',   target:92 },
  { key:'bp',    label:'Best Practices',  target:96 },
  { key:'seo',   label:'SEO',             target:100 },
];

function gradeClass(v) {
  if (v >= 90) return 'g-good';
  if (v >= 50) return 'g-mid';
  return 'g-bad';
}

function renderGauges(values) {
  document.getElementById('scores').innerHTML = CATS.map(c => {
    const v = values[c.key] || 0;
    return '<div class="gauge"><div class="gauge-num ' + gradeClass(v) + '">' + v +
      '</div><div class="gauge-label">' + c.label + '</div></div>';
  }).join('');
}
renderGauges({ perf:0, a11y:0, bp:0, seo:0 });

function runAudit() {
  let step = 0;
  const values = { perf:0, a11y:0, bp:0, seo:0 };
  const timer = setInterval(() => {
    step += 4;
    CATS.forEach(c => { values[c.key] = Math.min(c.target, step); });
    renderGauges(values);
    if (step >= 100) {
      clearInterval(timer);
      document.getElementById('suggestions').innerHTML =
        '<li>⚠ Performance: зображення не оптимізовані (webp замість jpg)</li>' +
        '<li>⚠ Accessibility: 2 кнопки без aria-label</li>' +
        '<li>✔ Best Practices: HTTPS увімкнено, помилок консолі нема</li>' +
        '<li>✔ SEO: усі meta-теги на місці</li>';
    }
  }, 60);
}`,
    [
      { level:'easy',   uk:'Натисни "▶ Запустити аудит" і подивись, як заповнюються всі 4 показники.', ru:'Нажми "▶ Запустить аудит" и посмотри, как заполняются все 4 показателя.' },
      { level:'medium', uk:'Зміни <code>target</code> для Performance на 45 — переконайся, що число стає червоним (<code>g-bad</code>), а не жовтим.', ru:'Измени <code>target</code> для Performance на 45 — убедись, что число становится красным (<code>g-bad</code>).' },
      { level:'hard',   uk:'Додай п\'яту категорію "PWA" з target:60 у масив <code>CATS</code> — переконайся, що з\'явився ще один gauge і що аудит її теж рахує.', ru:'Добавь пятую категорию "PWA" с target:60 в массив <code>CATS</code> — убедись, что появился ещё один gauge.' },
    ]
  );

  /* ─── 10-09: Responsive testing tools та BrowserStack ──────── */
  patch('10-09',
    { uk:`<h2>Responsive testing tools та BrowserStack</h2>
<p>Сайт має однаково добре виглядати на телефоні, планшеті й комп'ютері. Для перевірки використовують кілька рівнів інструментів.</p>
<h3>1. Chrome DevTools Device Toolbar</h3>
<p><kbd>Ctrl+Shift+M</kbd> — перемикає режим адаптивного перегляду прямо в браузері: можна обрати iPhone, iPad, Galaxy S20 або задати власний розмір.</p>
<h3>2. Реальні пристрої</h3>
<p>Емулятор не показує все — справжній дотик, продуктивність старого телефону, специфічні браузери (Safari на iOS) можуть відрізнятись.</p>
<h3>3. BrowserStack / LambdaTest</h3>
<p>Хмарні сервіси, що дають доступ до <strong>реальних</strong> пристроїв і браузерів через інтернет — корисно для тестування на рідкісних комбінаціях (наприклад, старий Android + Samsung Internet).</p>
<h3>Що перевіряти</h3>
<ul>
  <li>Чи не з'їжджає верстка на вузьких екранах (320px)</li>
  <li>Чи достатньо великі кнопки для пальця (мінімум 44×44px)</li>
  <li>Чи читабельний текст без збільшення</li>
</ul>`,
      ru:`<h2>Responsive testing tools и BrowserStack</h2>
<p>Сайт должен одинаково хорошо выглядеть на телефоне, планшете и компьютере. Для проверки используют несколько уровней инструментов.</p>
<h3>1. Chrome DevTools Device Toolbar</h3>
<p><kbd>Ctrl+Shift+M</kbd> — переключает режим адаптивного просмотра прямо в браузере.</p>
<h3>2. Реальные устройства</h3>
<p>Эмулятор не показывает всё — настоящее касание, производительность старого телефона, специфичные браузеры могут отличаться.</p>
<h3>3. BrowserStack / LambdaTest</h3>
<p>Облачные сервисы, дающие доступ к <strong>реальным</strong> устройствам и браузерам через интернет.</p>
<h3>Что проверять</h3>
<ul>
  <li>Не съезжает ли вёрстка на узких экранах (320px)</li>
  <li>Достаточно ли большие кнопки для пальца (минимум 44×44px)</li>
  <li>Читаем ли текст без увеличения</li>
</ul>` },
    `<h2>Device Toolbar — симуляція</h2>
<div class="btn-row">
  <button onclick="setDevice('phone')">📱 iPhone SE (375px)</button>
  <button onclick="setDevice('tablet')">📱 iPad (768px)</button>
  <button onclick="setDevice('desktop')">💻 Desktop (100%)</button>
</div>
<div id="device-frame">
  <div class="quiz-preview">
    <h3>Питання 3 / 10</h3>
    <p>Яка планета найбільша в Сонячній системі?</p>
    <button class="ans">Марс</button>
    <button class="ans">Юпітер</button>
    <button class="ans">Земля</button>
  </div>
</div>`,
    `${BASE}
#device-frame{margin-top:14px;border:2px solid #334155;border-radius:12px;background:#0b1220;padding:16px;transition:width .3s ease;width:100%;overflow:hidden}
.quiz-preview{max-width:100%}
.quiz-preview h3{font-size:13px;color:#64748b;margin-bottom:6px}
.quiz-preview p{font-size:15px;color:#f1f5f9;margin-bottom:10px}
.ans{display:block;width:100%;margin-bottom:6px;text-align:left}`,
    `function setDevice(kind) {
  const frame = document.getElementById('device-frame');
  if (kind === 'phone')   frame.style.width = '375px';
  if (kind === 'tablet')  frame.style.width = '768px';
  if (kind === 'desktop') frame.style.width = '100%';
}`,
    [
      { level:'easy',   uk:'Перемкни всі три розміри і подивись, як питання квізу переформатовується (кнопки-відповіді стають на всю ширину).', ru:'Переключи все три размера и посмотри, как вопрос квиза переформатируется.' },
      { level:'medium', uk:'Додай четверту кнопку "📱 Galaxy Fold (280px)" — переконайся, що текст питання все ще читабельний на такому вузькому екрані.', ru:'Добавь четвёртую кнопку "📱 Galaxy Fold (280px)" — убедись, что текст вопроса читаем на таком узком экране.' },
      { level:'hard',   uk:'Додай CSS-медіа-запит <code>@media (max-width:400px)</code>, який зменшує <code>.quiz-preview p</code> до 13px — перевір на розмірі iPhone SE.', ru:'Добавь CSS-медиа-запрос <code>@media (max-width:400px)</code>, уменьшающий <code>.quiz-preview p</code> до 13px.' },
    ]
  );

  /* ─── 10-10: ПРОЕКТ — Налаштування Vite-проекту з SCSS/ESLint ─ */
  patch('10-10',
    { uk:`<h2>ПРОЕКТ: Налаштування Vite-проекту з SCSS та ESLint</h2>
<p>Фінал модуля — зібрати весь інструментарій в один робочий рецепт: від порожньої папки до готового до розробки проекту з Vite, SCSS та лінтером.</p>
<h3>Повний рецепт</h3>
<pre>npm create vite@latest quiz-game -- --template vanilla
cd quiz-game
npm install
npm install -D sass eslint prettier eslint-config-prettier

# vite.config.js — без змін, Vite сам розуміє .scss
# src/style.scss замість style.css
# package.json → "scripts": { "dev": "vite", "build": "vite build", "lint": "eslint src" }

npm run dev</pre>
<h3>Структура готового проекту</h3>
<pre>quiz-game/
├── index.html
├── package.json
├── vite.config.js
├── .eslintrc.json
└── src/
    ├── main.js
    └── style.scss</pre>
<p>Це саме та структура, яку реальні розробники використовують для будь-якого нового JS-проекту — включно з квіз-грою, яку ти будеш робити в наступному модулі!</p>`,
      ru:`<h2>ПРОЕКТ: Настройка Vite-проекта с SCSS и ESLint</h2>
<p>Финал модуля — собрать весь инструментарий в один рабочий рецепт: от пустой папки до готового к разработке проекта с Vite, SCSS и линтером.</p>
<h3>Полный рецепт</h3>
<pre>npm create vite@latest quiz-game -- --template vanilla
cd quiz-game
npm install
npm install -D sass eslint prettier eslint-config-prettier

npm run dev</pre>
<h3>Структура готового проекта</h3>
<pre>quiz-game/
├── index.html
├── package.json
├── vite.config.js
├── .eslintrc.json
└── src/
    ├── main.js
    └── style.scss</pre>
<p>Это именно та структура, которую реальные разработчики используют для любого нового JS-проекта — включая квиз-игру, которую ты будешь делать в следующем модуле!</p>` },
    `<h2>Крок за кроком: збери проект</h2>
<div id="steps" style="display:flex;flex-direction:column;gap:6px;font-size:13px;color:#64748b;margin-bottom:12px"></div>
<button onclick="nextStep()" id="step-btn">▶ Виконати наступний крок</button>
<div class="term" id="t10">$ Проект ще не створено</div>`,
    `${BASE}
.step-done{color:#4ade80}
.step-active{color:#fbbf24}`,
    `const STEPS = [
  'npm create vite@latest quiz-game',
  'cd quiz-game && npm install',
  'npm install -D sass eslint prettier',
  'створити src/style.scss',
  'налаштувати .eslintrc.json',
  'npm run dev',
];
let stepIdx = 0;

function renderSteps() {
  document.getElementById('steps').innerHTML = STEPS.map((s, i) => {
    const cls = i < stepIdx ? 'step-done' : (i === stepIdx ? 'step-active' : '');
    const mark = i < stepIdx ? '✔' : (i === stepIdx ? '▶' : '○');
    return '<div class="' + cls + '">' + mark + ' ' + s + '</div>';
  }).join('');
}
renderSteps();

function log(text, cls) {
  const t = document.getElementById('t10');
  t.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  t.scrollTop = t.scrollHeight;
}

function nextStep() {
  if (stepIdx >= STEPS.length) { log('Проект повністю готовий! 🎉', 'term-ok'); return; }
  log('<span class="term-prompt">$</span> ' + STEPS[stepIdx]);
  log('готово ✔', 'term-ok');
  stepIdx++;
  renderSteps();
  if (stepIdx === STEPS.length) {
    document.getElementById('step-btn').textContent = '🎉 Проект готовий';
  }
}`,
    [
      { level:'easy',   uk:'Натискай кнопку, поки всі 6 кроків не стануть зеленими.', ru:'Нажимай кнопку, пока все 6 шагов не станут зелёными.' },
      { level:'medium', uk:'Додай сьомий крок у масив STEPS: "git init && git add . && git commit -m \'Initial setup\'".', ru:'Добавь седьмой шаг в массив STEPS: "git init && git add . && git commit -m \'Initial setup\'".' },
      { level:'hard',   uk:'Зроби так, щоб при кроці "npm run dev" (останній крок) термінал додатково виводив рядок "Local: http://localhost:5173/" другим кольором (term-dim).', ru:'Сделай так, чтобы на шаге "npm run dev" терминал дополнительно выводил строку "Local: http://localhost:5173/" другим цветом (term-dim).' },
      { level:'extra',  uk:'Додай кнопку "↺ Скинути" яка обнуляє <code>stepIdx = 0</code>, очищує термінал і перемальовує кроки — щоб пройти демонстрацію знову.', ru:'Добавь кнопку "↺ Сбросить", которая обнуляет <code>stepIdx = 0</code>, очищает терминал и перерисовывает шаги.' },
    ]
  );

})();
