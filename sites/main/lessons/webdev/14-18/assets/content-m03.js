/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 03 — React: Основи · 14–18
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
body{font-family:'Segoe UI',Arial,sans-serif;background:#0b1120;color:#e2e8f0;padding:20px}
h2{font-size:18px;font-weight:700;margin-bottom:12px;color:#fff}
h3{font-size:11px;color:#64748b;margin-bottom:8px;letter-spacing:.04em;text-transform:uppercase}
p{font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:8px}
button{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-family:inherit;transition:.2s}
button:hover{border-color:#61dafb;color:#61dafb}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:Consolas,monospace;font-size:12px;color:#7dd3fc}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
#app{background:#fff;color:#0f172a;border-radius:10px;padding:16px;margin-top:12px;min-height:60px;font-family:'Segoe UI',Arial,sans-serif}
.console{background:#000;border:1px solid #334155;border-radius:10px;padding:14px;font-family:Consolas,monospace;font-size:12.5px;color:#a3e635;min-height:60px;max-height:220px;overflow-y:auto;white-space:pre-wrap;line-height:1.7;margin-top:10px}
.c-ok{color:#4ade80}
.c-dim{color:#64748b}
.rx-card{border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin:6px 0}
.rx-btn{background:#61dafb;color:#0f172a;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
input.rx-input{border:1px solid #cbd5e1;border-radius:6px;padding:6px 10px;font-size:13px;width:100%}`;

  const REACT_CDN = '<script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>\n<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>';

  const APP_HTML = `<h2 id="lesson-h2"></h2>
${REACT_CDN}
<div id="app"></div>
<div class="console" id="out"></div>`;

  /* ─── 03-01: Що таке React ────────────────────────────────────── */
  patch('03-01',
    { uk:`<h2>Що таке React: компоненти, JSX, Virtual DOM</h2>
<p>React — бібліотека для побудови інтерфейсів через <strong>компоненти</strong> — незалежні, повторно використовувані шматки UI, кожен зі своєю логікою й розміткою.</p>
<h3>JSX — HTML-подібний синтаксис усередині JS</h3>
<pre>function Welcome() {
  return &lt;h1&gt;Привіт, світ!&lt;/h1&gt;;
}</pre>
<p>JSX — не HTML і не рядок. Це синтаксичний цукор, який компілятор (Babel) перетворює на звичайні виклики функцій:</p>
<pre>// JSX:
&lt;h1 className="title"&gt;Привіт&lt;/h1&gt;

// компілюється у:
React.createElement('h1', { className: 'title' }, 'Привіт')</pre>
<h3>У цій пісочниці ми пишемо через createElement напряму</h3>
<p>Оскільки тут немає кроку компіляції JSX, усі демо в цьому модулі використовують <code>React.createElement</code> — це те саме, у що JSX перетворюється "під капотом", тож ви бачите React у найчистішому вигляді.</p>
<h3>Virtual DOM — навіщо він потрібен</h3>
<p>Замість того, щоб напряму змінювати справжній DOM (що повільно), React будує легкий "віртуальний" опис дерева елементів у пам'яті. Коли стан змінюється, React порівнює нове віртуальне дерево зі старим (diffing) і оновлює в реальному DOM лише те, що справді змінилося.</p>`,
      ru:`<h2>Что такое React: компоненты, JSX, Virtual DOM</h2>
<p>React — библиотека для построения интерфейсов через <strong>компоненты</strong> — независимые, переиспользуемые куски UI.</p>
<h3>JSX — HTML-подобный синтаксис внутри JS</h3>
<pre>function Welcome() {
  return &lt;h1&gt;Привет, мир!&lt;/h1&gt;;
}</pre>
<p>JSX компилируется Babel в обычные вызовы функций:</p>
<pre>// JSX:
&lt;h1 className="title"&gt;Привет&lt;/h1&gt;

// компилируется в:
React.createElement('h1', { className: 'title' }, 'Привет')</pre>
<h3>В этой песочнице мы пишем через createElement напрямую</h3>
<p>Поскольку здесь нет шага компиляции JSX, все демо используют React.createElement — то же самое, во что превращается JSX "под капотом".</p>
<h3>Virtual DOM — зачем он нужен</h3>
<p>React строит лёгкое "виртуальное" дерево элементов в памяти, сравнивает его со старым (diffing) и обновляет в реальном DOM только то, что действительно изменилось.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'React.createElement у дії';

var e = React.createElement;
var root = ReactDOM.createRoot(document.getElementById('app'));

function Welcome() {
  return e('h1', { style: { color: '#0f172a' } }, 'Привіт, світ React!');
}

root.render(e(Welcome));

var out = document.getElementById('out');
out.textContent = 'React.createElement(Welcome) відрендерив справжній DOM-елемент <h1> у #app.\\nЦе саме React робить "під капотом" з кожним JSX-тегом.';`,
    [
      { level:'easy',   uk:'Подивись, як <code>React.createElement</code> малює справжній заголовок у білому блоці вище консолі.', ru:'Посмотри, как React.createElement рисует настоящий заголовок в белом блоке над консолью.' },
      { level:'medium', uk:'Зміни текст усередині <code>Welcome</code> на власне вітання і зміни колір через <code>style: { color: \'#2563eb\' }</code>.', ru:'Измени текст внутри Welcome и цвет через style: { color: \'#2563eb\' }.' },
      { level:'hard',   uk:'Додай другий компонент <code>function Subtitle() { return e(\'p\', null, \'Це підзаголовок\'); }</code> і зроби так, щоб <code>root.render</code> малював ОБИДВА компоненти одразу (підказка: <code>e(\'div\', null, e(Welcome), e(Subtitle))</code>).', ru:'Добавь компонент Subtitle и отрендери оба компонента через обёртку div.' },
    ]
  );

  /* ─── 03-02: Перший функціональний компонент ─────────────────────── */
  patch('03-02',
    { uk:`<h2>Перший функціональний компонент та структура проекту</h2>
<h3>Функціональний компонент — це просто функція, що повертає елементи</h3>
<pre>function ProfileCard({ name, role }) {
  return React.createElement('div', { className: 'card' },
    React.createElement('h3', null, name),
    React.createElement('p', null, role)
  );
}</pre>
<h3>Типова структура реального React-проекту (Vite)</h3>
<pre>my-app/
├── src/
│   ├── components/
│   │   ├── ProfileCard.jsx
│   │   └── Header.jsx
│   ├── App.jsx
│   └── main.jsx      ← точка входу: ReactDOM.createRoot(...).render(&lt;App /&gt;)
├── index.html
└── package.json</pre>
<h3>Композиція компонентів — збірка інтерфейсу з менших частин</h3>
<pre>function App() {
  return React.createElement('div', null,
    React.createElement(Header),
    React.createElement(ProfileCard, { name: 'Аліна', role: 'Розробниця' })
  );
}</pre>
<p>Великі інтерфейси в React будуються не як один величезний файл, а як дерево маленьких, незалежно тестованих компонентів — кожен відповідає за свою частину екрана.</p>`,
      ru:`<h2>Первый функциональный компонент и структура проекта</h2>
<h3>Функциональный компонент — это просто функция, возвращающая элементы</h3>
<pre>function ProfileCard({ name, role }) {
  return React.createElement('div', { className: 'card' },
    React.createElement('h3', null, name),
    React.createElement('p', null, role)
  );
}</pre>
<h3>Типовая структура реального React-проекта (Vite)</h3>
<pre>my-app/
├── src/
│   ├── components/
│   │   ├── ProfileCard.jsx
│   │   └── Header.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json</pre>
<h3>Композиция компонентов</h3>
<pre>function App() {
  return React.createElement('div', null,
    React.createElement(Header),
    React.createElement(ProfileCard, { name: 'Алина', role: 'Разработчица' })
  );
}</pre>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Компоненти та композиція';
var e = React.createElement;

function Header() {
  return e('div', { style: { background: '#0f172a', color: '#fff', padding: '8px 12px', borderRadius: '6px', marginBottom: '10px' } }, 'Моя перша React-програма');
}

function ProfileCard(props) {
  return e('div', { className: 'rx-card' },
    e('h3', null, props.name),
    e('p', null, props.role)
  );
}

function App() {
  return e('div', null,
    e(Header),
    e(ProfileCard, { name: 'Аліна', role: 'Розробниця' }),
    e(ProfileCard, { name: 'Марко', role: 'Дизайнер' })
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));

document.getElementById('out').textContent = 'App збирається з менших компонентів: Header + два ProfileCard.\\nКожен компонент — окрема функція зі своєю відповідальністю.';`,
    [
      { level:'easy',   uk:'Подивись, як три окремі компоненти (<code>Header</code>, два <code>ProfileCard</code>) складаються в один інтерфейс.', ru:'Посмотри, как три отдельных компонента складываются в один интерфейс.' },
      { level:'medium', uk:'Додай третю картку <code>ProfileCard</code> з новим ім\'ям і роллю.', ru:'Добавь третью карточку ProfileCard с новым именем и ролью.' },
      { level:'hard',   uk:'Створи новий компонент <code>Footer</code>, що виводить рядок "© 2026", і додай його в кінець <code>App</code> після всіх карток.', ru:'Создай компонент Footer с текстом "© 2026" и добавь его в конец App.' },
    ]
  );

  /* ─── 03-03: Props ────────────────────────────────────────────────── */
  patch('03-03',
    { uk:`<h2>Props: передача, деструктуризація, defaultProps</h2>
<h3>Props — "аргументи" компонента, лише для читання</h3>
<pre>function Greeting(props) {
  return React.createElement('p', null, 'Привіт, ' + props.name + '!');
}
React.createElement(Greeting, { name: 'Кіра' }); // props = { name: 'Кіра' }</pre>
<h3>Деструктуризація — читабельніше</h3>
<pre>function Greeting({ name, age }) {
  return React.createElement('p', null, name + ', ' + age + ' років');
}</pre>
<h3>Значення за замовчуванням</h3>
<pre>function Greeting({ name = 'Гість', age = 0 }) {
  return React.createElement('p', null, name + ', ' + age);
}
React.createElement(Greeting); // props відсутні — використає значення за замовчуванням</pre>
<h3>props.children — усе, що вкладено всередину компонента</h3>
<pre>function Card({ children }) {
  return React.createElement('div', { className: 'card' }, children);
}
React.createElement(Card, null, React.createElement('p', null, 'Вміст картки'));</pre>
<h3>Важливо: props незмінні (immutable)</h3>
<p>Компонент НІКОЛИ не повинен змінювати власні props напряму (<code>props.name = 'інше'</code> — так не можна). Якщо потрібна зміна — вона відбувається через <strong>стан</strong> (наступний урок) або передається "нагору" через callback.</p>`,
      ru:`<h2>Props: передача, деструктуризация, defaultProps</h2>
<h3>Props — "аргументы" компонента, только для чтения</h3>
<pre>function Greeting(props) {
  return React.createElement('p', null, 'Привет, ' + props.name + '!');
}</pre>
<h3>Деструктуризация</h3>
<pre>function Greeting({ name, age }) {
  return React.createElement('p', null, name + ', ' + age + ' лет');
}</pre>
<h3>Значения по умолчанию</h3>
<pre>function Greeting({ name = 'Гость', age = 0 }) {
  return React.createElement('p', null, name + ', ' + age);
}</pre>
<h3>props.children</h3>
<pre>function Card({ children }) {
  return React.createElement('div', { className: 'card' }, children);
}</pre>
<h3>Важно: props неизменны (immutable)</h3>
<p>Компонент НИКОГДА не должен менять свои props напрямую. Изменение происходит через состояние (следующий урок) или колбек "наверх".</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Props та значення за замовчуванням';
var e = React.createElement;

function Greeting(props) {
  var name = props.name === undefined ? 'Гість' : props.name;
  var age = props.age === undefined ? 0 : props.age;
  return e('p', null, name + ', ' + age + ' років');
}

function Card(props) {
  return e('div', { className: 'rx-card' }, props.children);
}

function App() {
  return e('div', null,
    e(Greeting, { name: 'Аліна', age: 15 }),
    e(Greeting, { name: 'Марко' }),
    e(Greeting),
    e(Card, null, e('strong', null, 'Це children — вкладений вміст картки'))
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));

document.getElementById('out').textContent = 'Три Greeting з різним набором props: повний, частковий (age за замовчуванням) і жоден (усе за замовчуванням).';`,
    [
      { level:'easy',   uk:'Подивись, як компонент <code>Greeting</code> без переданого <code>age</code> все одно коректно рендериться завдяки значенню за замовчуванням.', ru:'Посмотри, как Greeting без переданного age всё равно корректно рендерится.' },
      { level:'medium', uk:'Додай новий проп <code>city</code> зі значенням за замовчуванням <code>\'Київ\'</code> і виведи його в тексті.', ru:'Добавь проп city со значением по умолчанию \'Киев\' и выведи его.' },
      { level:'hard',   uk:'Створи новий компонент <code>Badge({ text, color })</code>, що рендерить <code>span</code> із заданим кольором фону, і використай його як <code>children</code> усередині одного з <code>Card</code>.', ru:'Создай компонент Badge({ text, color }) и используй его как children внутри Card.' },
    ]
  );

  /* ─── 03-04: useState ────────────────────────────────────────────── */
  patch('03-04',
    { uk:`<h2>useState: локальний стан та re-render</h2>
<p><code>useState</code> — хук, що додає функціональному компоненту "пам'ять" між рендерами. Коли стан змінюється, React автоматично перемальовує компонент.</p>
<h3>Базовий синтаксис</h3>
<pre>function Counter() {
  const [count, setCount] = React.useState(0); // 0 — початкове значення

  return React.createElement('button',
    { onClick: () => setCount(count + 1) },
    'Натиснуто: ' + count
  );
}</pre>
<h3>Функціональне оновлення — коли новий стан залежить від старого</h3>
<pre>setCount(count + 1);              // може "загубити" оновлення при швидких кліках
setCount(prev => prev + 1);       // безпечніше: React гарантує актуальне prev</pre>
<h3>Кожен useState — окремий "слот" пам'яті</h3>
<pre>function Form() {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);
  // name та age живуть незалежно одне від одного
}</pre>
<h3>Важливо: setState асинхронний і викликає re-render, а не мутацію</h3>
<p>Виклик <code>setCount(5)</code> не змінює <code>count</code> "на місці" — він каже React: "перерендери цей компонент із новим значенням". Саме тому не можна робити <code>count++</code> напряму — це не спричинить оновлення інтерфейсу.</p>`,
      ru:`<h2>useState: локальное состояние и re-render</h2>
<p>useState — хук, добавляющий функциональному компоненту "память" между рендерами.</p>
<h3>Базовый синтаксис</h3>
<pre>function Counter() {
  const [count, setCount] = React.useState(0);

  return React.createElement('button',
    { onClick: () => setCount(count + 1) },
    'Нажато: ' + count
  );
}</pre>
<h3>Функциональное обновление</h3>
<pre>setCount(count + 1);
setCount(prev => prev + 1); // безопаснее</pre>
<h3>Каждый useState — отдельный "слот" памяти</h3>
<pre>function Form() {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);
}</pre>
<h3>Важно: setState асинхронный и вызывает re-render, а не мутацию</h3>
<p>count++ напрямую не вызовет обновление интерфейса.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'useState: лічильник';
var e = React.createElement;
var useState = React.useState;

function Counter() {
  var state = useState(0);
  var count = state[0];
  var setCount = state[1];

  return e('div', null,
    e('p', null, 'Натиснуто: ' + count + ' разів'),
    e('button', { className: 'rx-btn', onClick: function () { setCount(count + 1); } }, '+1'),
    ' ',
    e('button', { className: 'rx-btn', onClick: function () { setCount(function (prev) { return prev - 1; }); } }, '-1')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(Counter));

document.getElementById('out').textContent = 'Кожен клік викликає setCount — React перерендерює Counter із новим значенням count.';`,
    [
      { level:'easy',   uk:'Натисни +1 і -1 кілька разів і подивись, як компонент перерендерюється з новим числом.', ru:'Нажми +1 и -1 несколько раз и посмотри, как компонент перерендеривается.' },
      { level:'medium', uk:'Додай третю кнопку "Скинути", що викликає <code>setCount(0)</code>.', ru:'Добавь третью кнопку "Сбросить", вызывающую setCount(0).' },
      { level:'hard',   uk:'Додай другий <code>useState</code> для кроку інкременту (<code>step</code>, за замовчуванням 1) і поле <code>input type="number"</code>, що змінює цей крок — кнопка +1 має додавати саме <code>step</code>, а не завжди 1.', ru:'Добавь второй useState для шага инкремента и input, изменяющий этот шаг.' },
    ]
  );

  /* ─── 03-05: useEffect ───────────────────────────────────────────── */
  patch('03-05',
    { uk:`<h2>useEffect: side effects, залежності та cleanup</h2>
<p><code>useEffect</code> дозволяє виконувати "побічні ефекти" — дії, що виходять за межі чистого рендерингу: запити до сервера, підписки, таймери, робота з DOM напряму.</p>
<h3>Базовий синтаксис — виконується після кожного рендеру</h3>
<pre>React.useEffect(() => {
  console.log('Компонент відрендерився');
});</pre>
<h3>Масив залежностей — контроль, КОЛИ ефект спрацьовує</h3>
<pre>React.useEffect(() => {
  console.log('Виконається лише при монтуванні (перший рендер)');
}, []); // порожній масив — 0 залежностей

React.useEffect(() => {
  console.log('Виконається при монтуванні І кожного разу, коли count зміниться');
}, [count]);</pre>
<h3>Cleanup-функція — прибирання за собою</h3>
<pre>React.useEffect(() => {
  const timer = setInterval(() => console.log('тік'), 1000);
  return () => clearInterval(timer); // спрацює перед наступним ефектом або при розмонтуванні
}, []);</pre>
<h3>Типова помилка — забути масив залежностей</h3>
<p>Без другого аргументу ефект виконується <strong>після кожного рендеру</strong>, що для запитів до сервера часто спричиняє нескінченний цикл (fetch → setState → re-render → fetch → ...). Завжди явно вказуй, від чого залежить ефект.</p>`,
      ru:`<h2>useEffect: side effects, зависимости и cleanup</h2>
<p>useEffect позволяет выполнять "побочные эффекты": запросы к серверу, подписки, таймеры, работу с DOM напрямую.</p>
<h3>Базовый синтаксис</h3>
<pre>React.useEffect(() => {
  console.log('Компонент отрендерился');
});</pre>
<h3>Массив зависимостей</h3>
<pre>React.useEffect(() => {
  console.log('Выполнится только при монтировании');
}, []);

React.useEffect(() => {
  console.log('Выполнится при монтировании И при каждом изменении count');
}, [count]);</pre>
<h3>Cleanup-функция</h3>
<pre>React.useEffect(() => {
  const timer = setInterval(() => console.log('тик'), 1000);
  return () => clearInterval(timer);
}, []);</pre>
<h3>Типичная ошибка — забыть массив зависимостей</h3>
<p>Без второго аргумента эффект выполняется после КАЖДОГО рендера, что часто вызывает бесконечный цикл при запросах к серверу.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'useEffect: таймер із cleanup';
var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

function logOut(text) {
  var out = document.getElementById('out');
  out.textContent += (out.textContent ? '\\n' : '') + text;
}

function Timer() {
  var state = useState(0);
  var seconds = state[0];
  var setSeconds = state[1];
  var runState = useState(true);
  var running = runState[0];
  var setRunning = runState[1];

  useEffect(function () {
    if (!running) return;
    var id = setInterval(function () { setSeconds(function (s) { return s + 1; }); }, 1000);
    logOut('useEffect: таймер запущено (setInterval)');
    return function () {
      clearInterval(id);
      logOut('cleanup: таймер зупинено (clearInterval)');
    };
  }, [running]);

  return e('div', null,
    e('p', null, 'Секунд минуло: ' + seconds),
    e('button', { className: 'rx-btn', onClick: function () { setRunning(!running); } }, running ? 'Пауза' : 'Продовжити')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(Timer));`,
    [
      { level:'easy',   uk:'Дай таймеру попрацювати кілька секунд, потім натисни "Пауза" — подивись у консолі, як спрацьовує cleanup.', ru:'Дай таймеру поработать несколько секунд, потом нажми "Пауза" — посмотри на cleanup в консоли.' },
      { level:'medium', uk:'Додай кнопку "Скинути", що зупиняє таймер і встановлює <code>seconds</code> назад у 0.', ru:'Добавь кнопку "Сбросить", останавливающую таймер и обнуляющую seconds.' },
      { level:'hard',   uk:'Додай другий <code>useEffect</code> із порожнім масивом залежностей <code>[]</code>, що один раз при монтуванні виводить у консоль "Компонент Timer змонтовано" — переконайся, що він НЕ повторюється при паузі/відновленні (на відміну від першого ефекту).', ru:'Добавь второй useEffect с пустым массивом зависимостей, логирующий монтирование один раз.' },
    ]
  );

  /* ─── 03-06: Умовний рендеринг ───────────────────────────────────── */
  patch('03-06',
    { uk:`<h2>Умовний рендеринг: &&, ternary, switch, early return</h2>
<h3>&& — показати щось, лише якщо умова істинна</h3>
<pre>function Notification({ hasNew }) {
  return React.createElement('div', null,
    hasNew && React.createElement('span', { className: 'badge' }, 'Нове!')
  );
}</pre>
<p>Пастка: <code>count &amp;&amp; &lt;Elem /&gt;</code> при <code>count === 0</code> виведе на екран саме "0" (число, а не порожньо!), бо <code>0</code> — falsy, і вираз повертає сам <code>0</code>. Треба писати <code>count &gt; 0 &amp;&amp; ...</code>.</p>
<h3>Ternary (?:) — вибір з-поміж двох варіантів</h3>
<pre>function Status({ isOnline }) {
  return React.createElement('span', null, isOnline ? '🟢 Онлайн' : '⚪ Офлайн');
}</pre>
<h3>switch — коли варіантів більше двох</h3>
<pre>function StatusIcon({ status }) {
  switch (status) {
    case 'loading': return React.createElement('span', null, '⏳');
    case 'error':   return React.createElement('span', null, '❌');
    case 'success': return React.createElement('span', null, '✅');
    default:        return null;
  }
}</pre>
<h3>Early return — вийти з функції компонента раніше</h3>
<pre>function UserCard({ user }) {
  if (!user) return React.createElement('p', null, 'Користувача не знайдено');
  return React.createElement('h3', null, user.name);
}</pre>`,
      ru:`<h2>Условный рендеринг: &&, ternary, switch, early return</h2>
<h3>&& — показать что-то только если условие истинно</h3>
<pre>function Notification({ hasNew }) {
  return React.createElement('div', null,
    hasNew && React.createElement('span', { className: 'badge' }, 'Новое!')
  );
}</pre>
<p>Ловушка: count && &lt;Elem /&gt; при count === 0 выведет "0" на экран (число, не пусто!). Нужно писать count &gt; 0 && ...</p>
<h3>Ternary (?:) — выбор из двух вариантов</h3>
<pre>function Status({ isOnline }) {
  return React.createElement('span', null, isOnline ? '🟢 Онлайн' : '⚪ Офлайн');
}</pre>
<h3>switch — когда вариантов больше двух</h3>
<pre>function StatusIcon({ status }) {
  switch (status) {
    case 'loading': return React.createElement('span', null, '⏳');
    case 'error':   return React.createElement('span', null, '❌');
    case 'success': return React.createElement('span', null, '✅');
    default:        return null;
  }
}</pre>
<h3>Early return</h3>
<pre>function UserCard({ user }) {
  if (!user) return React.createElement('p', null, 'Пользователь не найден');
  return React.createElement('h3', null, user.name);
}</pre>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Умовний рендеринг: чотири підходи';
var e = React.createElement;
var useState = React.useState;

function StatusIcon(props) {
  if (props.status === 'loading') return e('span', null, '⏳ завантаження');
  if (props.status === 'error') return e('span', null, '❌ помилка');
  if (props.status === 'success') return e('span', null, '✅ готово');
  return e('span', null, '—');
}

function App() {
  var state = useState(0);
  var notifications = state[0];
  var setNotifications = state[1];
  var onlineState = useState(true);
  var isOnline = onlineState[0];
  var setOnline = onlineState[1];

  return e('div', null,
    e('p', null, 'Сповіщень: ' + notifications, ' ', notifications > 0 && e('span', { className: 'rx-card' }, '🔔 Є нові!')),
    e('button', { className: 'rx-btn', onClick: function () { setNotifications(notifications + 1); } }, 'Додати сповіщення'),
    e('p', null, 'Статус: ', isOnline ? '🟢 Онлайн' : '⚪ Офлайн'),
    e('button', { className: 'rx-btn', onClick: function () { setOnline(!isOnline); } }, 'Перемкнути статус'),
    e('p', null, 'Іконка: ', e(StatusIcon, { status: 'success' }))
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Натисни кнопки і подивись, як умовний рендеринг перемикає різні шматки інтерфейсу.', ru:'Нажми кнопки и посмотри, как условный рендеринг переключает разные куски интерфейса.' },
      { level:'medium', uk:'Зроби так, щоб при <code>notifications === 0</code> НЕ показувалось число "0" поруч зі словом "Сповіщень" (виправ пастку з <code>&&</code>, описану в теорії).', ru:'Исправь ловушку с && так, чтобы при 0 не показывалось число "0".' },
      { level:'hard',   uk:'Додай у <code>StatusIcon</code> новий статус <code>\'idle\'</code>, що показує "😴 очікування", і додай у <code>App</code> кнопку, яка перемикає статус іконки між усіма чотирма варіантами по колу.', ru:'Добавь статус idle в StatusIcon и кнопку, переключающую статус по кругу.' },
    ]
  );

  /* ─── 03-07: Списки та ключі ─────────────────────────────────────── */
  patch('03-07',
    { uk:`<h2>Списки та ключі: map + key та React.Fragment</h2>
<h3>.map() — перетворення масиву даних на масив елементів</h3>
<pre>const fruits = ['Яблуко', 'Банан', 'Вишня'];

function FruitList() {
  return React.createElement('ul', null,
    fruits.map(fruit => React.createElement('li', { key: fruit }, fruit))
  );
}</pre>
<h3>Навіщо потрібен key</h3>
<p><code>key</code> допомагає React зрозуміти, який саме елемент списку додано, видалено чи переставлено місцями — без цього React може переплутати елементи при оновленні й "заплутати" внутрішній стан компонентів усередині списку.</p>
<h3>Чому НЕ можна використовувати індекс масиву як key (у більшості випадків)</h3>
<pre>items.map((item, index) => React.createElement('li', { key: index }, item.text));
// Якщо порядок items зміниться (сортування, видалення) — key "зʼїде",
// і React може показати старий стан для НЕ того елемента</pre>
<p>Правильно — використовувати стабільний унікальний ідентифікатор із самих даних: <code>key={item.id}</code>.</p>
<h3>React.Fragment — групування без зайвого DOM-вузла</h3>
<pre>function Row() {
  return React.createElement(React.Fragment, null,
    React.createElement('td', null, 'Аліна'),
    React.createElement('td', null, '15')
  ); // не додає зайвий &lt;div&gt;, що важливо всередині &lt;table&gt;
}</pre>`,
      ru:`<h2>Списки и ключи: map + key и React.Fragment</h2>
<h3>.map() — превращение массива данных в массив элементов</h3>
<pre>const fruits = ['Яблоко', 'Банан', 'Вишня'];

function FruitList() {
  return React.createElement('ul', null,
    fruits.map(fruit => React.createElement('li', { key: fruit }, fruit))
  );
}</pre>
<h3>Зачем нужен key</h3>
<p>key помогает React понять, какой именно элемент списка добавлен, удалён или переставлен.</p>
<h3>Почему НЕ стоит использовать индекс массива как key</h3>
<pre>items.map((item, index) => React.createElement('li', { key: index }, item.text));
// Если порядок items изменится — key "съедет"</pre>
<h3>React.Fragment — группировка без лишнего DOM-узла</h3>
<pre>function Row() {
  return React.createElement(React.Fragment, null,
    React.createElement('td', null, 'Алина'),
    React.createElement('td', null, '15')
  );
}</pre>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Списки, key та Fragment';
var e = React.createElement;
var useState = React.useState;
var F = React.Fragment;

function App() {
  var state = useState([
    { id: 1, text: 'Вивчити useState' },
    { id: 2, text: 'Вивчити useEffect' },
    { id: 3, text: 'Написати перший компонент' }
  ]);
  var todos = state[0];
  var setTodos = state[1];

  function removeTodo(id) {
    setTodos(todos.filter(function (t) { return t.id !== id; }));
  }

  return e('div', null,
    e('ul', null, todos.map(function (todo) {
      return e('li', { key: todo.id },
        todo.text, ' ',
        e('button', { className: 'rx-btn', onClick: function () { removeTodo(todo.id); } }, 'Видалити')
      );
    })),
    e(F, null,
      e('p', null, 'Fragment: два елементи без обгортки div'),
      e('small', null, 'Разом задач: ' + todos.length)
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Видали кілька задач і подивись, як список коректно оновлюється завдяки стабільним <code>key</code>.', ru:'Удали несколько задач и посмотри, как список корректно обновляется благодаря стабильным key.' },
      { level:'medium', uk:'Додай кнопку "Додати задачу", що додає новий об\'єкт у масив <code>todos</code> з новим унікальним <code>id</code> (наприклад, <code>Date.now()</code>).', ru:'Добавь кнопку "Добавить задачу" с новым уникальным id (например, Date.now()).' },
      { level:'hard',   uk:'Додай у кожен елемент списку <code>checkbox</code>, що позначає задачу виконаною (додай поле <code>done: false</code> у дані та перемикай його через <code>setTodos</code> з <code>map</code>), і застосуй закреслений стиль тексту для виконаних задач.', ru:'Добавь checkbox для отметки задачи выполненной и зачёркнутый стиль для done.' },
    ]
  );

  /* ─── 03-08: Форми ───────────────────────────────────────────────── */
  patch('03-08',
    { uk:`<h2>Форми: controlled та uncontrolled components</h2>
<h3>Controlled component — React повністю керує значенням</h3>
<pre>function NameInput() {
  const [name, setName] = React.useState('');
  return React.createElement('input', {
    value: name,                              // значення ЗАВЖДИ з state
    onChange: e => setName(e.target.value)     // будь-яка зміна оновлює state
  });
}</pre>
<p>"Джерело правди" — <code>state</code>, а не сам DOM-елемент. Це дозволяє валідувати, форматувати чи блокувати ввід у реальному часі.</p>
<h3>Uncontrolled component — DOM сам зберігає значення</h3>
<pre>function NameInput() {
  const inputRef = React.useRef(null);
  function handleSubmit() {
    alert('Значення: ' + inputRef.current.value); // читаємо напряму з DOM лише коли треба
  }
  return React.createElement('input', { ref: inputRef, defaultValue: '' });
}</pre>
<h3>Коли що обирати</h3>
<p><strong>Controlled</strong> — коли потрібна валідація в реальному часі, форматування, або значення одного поля впливає на інші. <strong>Uncontrolled</strong> — простіші форми, де значення потрібне лише один раз при відправці (менше ре-рендерів).</p>
<h3>Обробка відправки форми</h3>
<pre>function Form() {
  function handleSubmit(e) {
    e.preventDefault(); // забороняє браузеру перезавантажити сторінку
    // ...обробка даних
  }
  return React.createElement('form', { onSubmit: handleSubmit }, /* ... */);
}</pre>`,
      ru:`<h2>Формы: controlled и uncontrolled components</h2>
<h3>Controlled component — React полностью управляет значением</h3>
<pre>function NameInput() {
  const [name, setName] = React.useState('');
  return React.createElement('input', {
    value: name,
    onChange: e => setName(e.target.value)
  });
}</pre>
<h3>Uncontrolled component — DOM сам хранит значение</h3>
<pre>function NameInput() {
  const inputRef = React.useRef(null);
  function handleSubmit() {
    alert('Значение: ' + inputRef.current.value);
  }
  return React.createElement('input', { ref: inputRef, defaultValue: '' });
}</pre>
<h3>Когда что выбирать</h3>
<p>Controlled — для валидации в реальном времени. Uncontrolled — для простых форм.</p>
<h3>Обработка отправки формы</h3>
<pre>function Form() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return React.createElement('form', { onSubmit: handleSubmit });
}</pre>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Controlled форма';
var e = React.createElement;
var useState = React.useState;

function App() {
  var nameState = useState('');
  var name = nameState[0];
  var setName = nameState[1];
  var submittedState = useState(null);
  var submitted = submittedState[0];
  var setSubmitted = submittedState[1];

  function handleSubmit(ev) {
    ev.preventDefault();
    setSubmitted(name);
  }

  return e('form', { onSubmit: handleSubmit },
    e('input', {
      className: 'rx-input',
      value: name,
      placeholder: 'Введи своє імʼя',
      onChange: function (ev) { setName(ev.target.value); }
    }),
    e('p', null, 'Довжина введеного тексту: ' + name.length + ' символів'),
    e('button', { className: 'rx-btn', type: 'submit' }, 'Відправити'),
    submitted !== null && e('p', null, 'Востаннє відправлено: "' + submitted + '"')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Друкуй у полі й подивись, як лічильник символів оновлюється в реальному часі — це і є controlled-компонент.', ru:'Печатай в поле и посмотри, как счётчик символов обновляется в реальном времени.' },
      { level:'medium', uk:'Додай перевірку: якщо поле порожнє, кнопка "Відправити" має бути неактивною (<code>disabled: name.length === 0</code>).', ru:'Добавь проверку: если поле пустое, кнопка "Отправить" неактивна.' },
      { level:'hard',   uk:'Додай друге controlled-поле <code>email</code> зі своїм <code>useState</code> і простою валідацією — показуй попередження червоним текстом, якщо в email немає символу "@".', ru:'Добавь второе controlled-поле email со своим useState и простой валидацией на "@".' },
    ]
  );

  /* ─── 03-09: Lifting state up ────────────────────────────────────── */
  patch('03-09',
    { uk:`<h2>Lifting state up та зворотні колбеки</h2>
<p>Коли двом сусіднім компонентам потрібен доступ до одного й того самого стану, стан "піднімають" у їхнього спільного батька — і передають вниз через props, а зміни повертають нагору через callback-функції.</p>
<h3>Проблема: два незалежних компоненти не можуть "спілкуватися" напряму</h3>
<pre>function TemperatureInput() { /* власний useState — ізольований */ }
function TemperatureDisplay() { /* не бачить стан сусіда */ }</pre>
<h3>Рішення — підняти стан у спільного батька</h3>
<pre>function Parent() {
  const [temperature, setTemperature] = React.useState(20);

  return React.createElement('div', null,
    React.createElement(TemperatureInput, { value: temperature, onChange: setTemperature }),
    React.createElement(TemperatureDisplay, { value: temperature })
  );
}

function TemperatureInput({ value, onChange }) {
  return React.createElement('input', {
    value,
    onChange: e => onChange(Number(e.target.value))
  });
}

function TemperatureDisplay({ value }) {
  return React.createElement('p', null, value + '°C');
}</pre>
<h3>Дані течуть вниз, події течуть вгору</h3>
<p>Це ключовий принцип React: <strong>props течуть від батька до дітей</strong> (односторонньо), а <strong>події (виклики callback) течуть від дітей до батька</strong>. Такий однонапрямлений потік даних (unidirectional data flow) робить код передбачуванішим за двосторонню прив'язку (two-way binding).</p>`,
      ru:`<h2>Lifting state up и обратные колбеки</h2>
<p>Когда двум соседним компонентам нужен доступ к одному состоянию, состояние "поднимают" в их общего родителя.</p>
<h3>Проблема: два независимых компонента не могут "общаться" напрямую</h3>
<pre>function TemperatureInput() { }
function TemperatureDisplay() { }</pre>
<h3>Решение — поднять состояние в общего родителя</h3>
<pre>function Parent() {
  const [temperature, setTemperature] = React.useState(20);

  return React.createElement('div', null,
    React.createElement(TemperatureInput, { value: temperature, onChange: setTemperature }),
    React.createElement(TemperatureDisplay, { value: temperature })
  );
}</pre>
<h3>Данные текут вниз, события текут вверх</h3>
<p>props текут от родителя к детям, а события (вызовы callback) текут от детей к родителю — однонаправленный поток данных.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Lifting state up: температура';
var e = React.createElement;
var useState = React.useState;

function TemperatureInput(props) {
  return e('input', {
    className: 'rx-input',
    type: 'number',
    value: props.value,
    onChange: function (ev) { props.onChange(Number(ev.target.value)); }
  });
}

function TemperatureDisplay(props) {
  var c = props.value;
  var f = Math.round(c * 9 / 5 + 32);
  return e('p', null, c + '°C = ' + f + '°F');
}

function App() {
  var state = useState(20);
  var temperature = state[0];
  var setTemperature = state[1];

  return e('div', null,
    e(TemperatureInput, { value: temperature, onChange: setTemperature }),
    e(TemperatureDisplay, { value: temperature })
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Зміни число в полі й подивись, як <code>TemperatureDisplay</code> (сусідній, незалежний компонент) одразу оновлюється завдяки спільному стану в <code>App</code>.', ru:'Измени число в поле и посмотри, как TemperatureDisplay сразу обновляется.' },
      { level:'medium', uk:'Додай третій компонент <code>TemperatureWarning</code>, що показує "🔥 Дуже жарко!", якщо <code>value &gt; 30</code>.', ru:'Добавь компонент TemperatureWarning, показывающий предупреждение при value > 30.' },
      { level:'hard',   uk:'Перероби <code>TemperatureInput</code> на повзунок (<code>input type="range"</code> від -20 до 40) замість числового поля, зберігаючи той самий принцип lifting state up.', ru:'Переделай TemperatureInput в слайдер (input type="range") с тем же принципом lifting state up.' },
    ]
  );

  /* ─── 03-10: Composition ─────────────────────────────────────────── */
  patch('03-10',
    { uk:`<h2>Composition: children, render props та слоти</h2>
<h3>children — найпростіший спосіб композиції</h3>
<pre>function Panel({ title, children }) {
  return React.createElement('div', { className: 'panel' },
    React.createElement('h3', null, title),
    children
  );
}
React.createElement(Panel, { title: 'Налаштування' },
  React.createElement('p', null, 'Будь-який вміст усередині')
);</pre>
<h3>Render props — компонент передає ФУНКЦІЮ, що повертає JSX</h3>
<pre>function DataProvider({ render }) {
  const data = { name: 'Аліна', score: 95 };
  return render(data); // батько вирішує, ЯК саме показати дані
}
React.createElement(DataProvider, {
  render: data => React.createElement('p', null, data.name + ': ' + data.score)
});</pre>
<h3>Іменовані "слоти" через кілька props</h3>
<pre>function Layout({ header, sidebar, content }) {
  return React.createElement('div', { className: 'layout' },
    React.createElement('header', null, header),
    React.createElement('aside', null, sidebar),
    React.createElement('main', null, content)
  );
}</pre>
<h3>Composition замість наслідування</h3>
<p>У React перевага надається <strong>композиції</strong> (складання з менших частин через props/children), а не класичному ООП-наслідуванню — React-документація прямо радить "collocate, don't inherit".</p>`,
      ru:`<h2>Composition: children, render props и слоты</h2>
<h3>children — простейший способ композиции</h3>
<pre>function Panel({ title, children }) {
  return React.createElement('div', { className: 'panel' },
    React.createElement('h3', null, title),
    children
  );
}</pre>
<h3>Render props — компонент передаёт ФУНКЦИЮ, возвращающую JSX</h3>
<pre>function DataProvider({ render }) {
  const data = { name: 'Алина', score: 95 };
  return render(data);
}</pre>
<h3>Именованные "слоты" через несколько props</h3>
<pre>function Layout({ header, sidebar, content }) {
  return React.createElement('div', { className: 'layout' },
    React.createElement('header', null, header),
    React.createElement('aside', null, sidebar),
    React.createElement('main', null, content)
  );
}</pre>
<h3>Composition вместо наследования</h3>
<p>В React предпочтение отдаётся композиции, а не классическому ООП-наследованию.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Composition: children та render props';
var e = React.createElement;

function Panel(props) {
  return e('div', { className: 'rx-card' },
    e('h3', null, props.title),
    props.children
  );
}

function DataProvider(props) {
  var data = { name: 'Аліна', score: 95 };
  return props.render(data);
}

function App() {
  return e('div', null,
    e(Panel, { title: 'Через children' },
      e('p', null, 'Цей вміст переданий як children — Panel не знає наперед, що саме тут буде.')
    ),
    e(Panel, { title: 'Через render props' },
      e(DataProvider, { render: function (data) {
        return e('p', null, data.name + ': ' + data.score + ' балів');
      } })
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Подивись, як один і той самий компонент <code>Panel</code> показує зовсім різний вміст завдяки <code>children</code>.', ru:'Посмотри, как один и тот же компонент Panel показывает разный контент благодаря children.' },
      { level:'medium', uk:'Додай третій <code>Panel</code> із заголовком "Список" і вкладеним <code>ul</code> із трьома <code>li</code> як children.', ru:'Добавь третий Panel с заголовком "Список" и вложенным ul с тремя li.' },
      { level:'hard',   uk:'Зміни <code>DataProvider</code> так, щоб він приймав дані через проп <code>data</code>, а не хардкодив їх усередині, і використай його двічі з РІЗНИМИ даними і різними функціями <code>render</code>.', ru:'Измени DataProvider так, чтобы он принимал данные через проп data, и используй его дважды с разными данными.' },
    ]
  );

  /* ─── 03-11: React Router 6 ──────────────────────────────────────── */
  patch('03-11',
    { uk:`<h2>React Router 6: Route, Link, useNavigate, useParams</h2>
<p>У реальному проекті навігацію між "сторінками" SPA (Single Page Application) реалізує бібліотека <code>react-router-dom</code>. У ЦІЙ пісочниці немає бандлера й реального URL, тож нижче — власна спрощена реалізація тих самих ідей на <code>useState</code>, а тут — справжній синтаксис бібліотеки для довідки.</p>
<h3>Реальний синтаксис react-router-dom (поза пісочницею)</h3>
<pre>import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;Link to="/"&gt;Головна&lt;/Link&gt;
      &lt;Link to="/profile/42"&gt;Профіль&lt;/Link&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/profile/:id" element={&lt;Profile /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/BrowserRouter&gt;
  );
}

function Profile() {
  const { id } = useParams();          // читає :id з URL
  const navigate = useNavigate();
  return &lt;button onClick={() =&gt; navigate('/')}&gt;Профіль #{id}, назад&lt;/button&gt;;
}</pre>
<h3>Спрощена версія в цій пісочниці</h3>
<p>Замість справжнього URL використовуємо змінну стану <code>route</code> — принцип (яка "сторінка" показана і як між ними переходити) той самий, лише без залежності від реального браузерного адресного рядка.</p>`,
      ru:`<h2>React Router 6: Route, Link, useNavigate, useParams</h2>
<p>В реальном проекте навигацию реализует библиотека react-router-dom. В этой песочнице нет бандлера и реального URL, поэтому ниже — упрощённая реализация тех же идей на useState, а здесь — настоящий синтаксис для справки.</p>
<h3>Реальный синтаксис react-router-dom (вне песочницы)</h3>
<pre>import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function App() {
  return (
    &lt;BrowserRouter&gt;
      &lt;Link to="/"&gt;Главная&lt;/Link&gt;
      &lt;Link to="/profile/42"&gt;Профиль&lt;/Link&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/profile/:id" element={&lt;Profile /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/BrowserRouter&gt;
  );
}

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  return &lt;button onClick={() =&gt; navigate('/')}&gt;Профиль #{id}, назад&lt;/button&gt;;
}</pre>
<h3>Упрощённая версия в этой песочнице</h3>
<p>Вместо настоящего URL используем переменную состояния route — принцип тот же.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Спрощений роутинг (принцип react-router-dom)';
var e = React.createElement;
var useState = React.useState;

function Home() {
  return e('p', null, 'Це головна сторінка.');
}

function Profile(props) {
  return e('div', null,
    e('p', null, 'Профіль користувача #' + props.id),
    e('button', { className: 'rx-btn', onClick: props.onBack }, '← Назад (аналог navigate("/"))')
  );
}

function App() {
  var state = useState('/');
  var route = state[0];
  var setRoute = state[1];

  return e('div', null,
    e('nav', { className: 'btn-row' },
      e('a', { href: '#', className: 'rx-btn', onClick: function (ev) { ev.preventDefault(); setRoute('/'); } }, 'Головна'),
      e('a', { href: '#', className: 'rx-btn', onClick: function (ev) { ev.preventDefault(); setRoute('/profile/42'); } }, 'Профіль #42')
    ),
    e('div', { className: 'rx-card' },
      route === '/' ? e(Home) : e(Profile, { id: '42', onBack: function () { setRoute('/'); } })
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Перемикайся між "Головна" і "Профіль" — це той самий принцип, що й <code>Routes</code>/<code>Route</code> у справжньому react-router-dom, лише без URL.', ru:'Переключайся между "Главная" и "Профиль" — тот же принцип, что и Routes/Route.' },
      { level:'medium', uk:'Додай третій "маршрут" <code>/about</code> з власним компонентом <code>About</code> і кнопкою навігації до нього.', ru:'Добавь третий "маршрут" /about со своим компонентом About.' },
      { level:'hard',   uk:'Зроби так, щоб <code>Profile</code> приймав різний <code>id</code> залежно від того, яку з ДВОХ різних кнопок профілю (наприклад, #42 і #7) натиснули — імітуй <code>useParams()</code>, зберігаючи id в <code>route</code> як <code>"/profile/" + id</code>.', ru:'Сделай так, чтобы Profile принимал разный id в зависимости от нажатой кнопки.' },
    ]
  );

  /* ─── 03-12: useSearchParams та навігація зі станом ──────────────── */
  patch('03-12',
    { uk:`<h2>useSearchParams та навігація зі станом</h2>
<h3>Реальний синтаксис (поза пісочницею)</h3>
<pre>import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all'; // ?category=shoes

  function selectCategory(cat) {
    setSearchParams({ category: cat }); // оновлює URL БЕЗ перезавантаження сторінки
  }
  // ...
}</pre>
<h3>Навіщо саме query-параметри, а не просто useState</h3>
<p>Query-параметри роблять стан <strong>частиною URL</strong> — сторінку з фільтром <code>?category=shoes&sort=price</code> можна зберегти в закладки, переслати другові, і вона відкриється у ТОМУ САМОМУ стані. Звичайний <code>useState</code> губиться при перезавантаженні сторінки.</p>
<h3>Навігація зі станом — передача даних між "сторінками" без query-рядка</h3>
<pre>import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
  function openDetails() {
    navigate('/product/' + product.id, { state: { fromCategory: 'shoes' } });
  }
}

// на сторінці призначення:
import { useLocation } from 'react-router-dom';
const location = useLocation();
console.log(location.state.fromCategory); // 'shoes'</pre>`,
      ru:`<h2>useSearchParams и навигация с состоянием</h2>
<h3>Реальный синтаксис (вне песочницы)</h3>
<pre>import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';

  function selectCategory(cat) {
    setSearchParams({ category: cat });
  }
}</pre>
<h3>Зачем именно query-параметры, а не просто useState</h3>
<p>Query-параметры делают состояние частью URL — страницу можно сохранить в закладки и переслать другу.</p>
<h3>Навигация с состоянием</h3>
<pre>import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
  function openDetails() {
    navigate('/product/' + product.id, { state: { fromCategory: 'shoes' } });
  }
}</pre>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Симуляція useSearchParams';
var e = React.createElement;
var useState = React.useState;

var PRODUCTS = [
  { id: 1, name: 'Кросівки', category: 'shoes' },
  { id: 2, name: 'Футболка', category: 'clothes' },
  { id: 3, name: 'Черевики', category: 'shoes' },
  { id: 4, name: 'Куртка', category: 'clothes' }
];

function App() {
  var state = useState('all');
  var category = state[0];
  var setCategory = state[1];
  var urlState = useState('?category=all');
  var fakeUrl = urlState[0];
  var setFakeUrl = urlState[1];

  function selectCategory(cat) {
    setCategory(cat);
    setFakeUrl('?category=' + cat);
  }

  var filtered = category === 'all' ? PRODUCTS : PRODUCTS.filter(function (p) { return p.category === category; });

  return e('div', null,
    e('p', null, e('code', null, 'window.location.search = "' + fakeUrl + '"'), ' (симуляція)'),
    e('div', { className: 'btn-row' },
      e('button', { className: 'rx-btn', onClick: function () { selectCategory('all'); } }, 'Всі'),
      e('button', { className: 'rx-btn', onClick: function () { selectCategory('shoes'); } }, 'Взуття'),
      e('button', { className: 'rx-btn', onClick: function () { selectCategory('clothes'); } }, 'Одяг')
    ),
    e('ul', null, filtered.map(function (p) {
      return e('li', { key: p.id }, p.name);
    }))
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Перемикай категорії й подивись, як "URL" (симульований рядок) і список товарів синхронно оновлюються.', ru:'Переключай категории и посмотри, как "URL" и список товаров синхронно обновляются.' },
      { level:'medium', uk:'Додай четверту категорію "accessories" з новими товарами і кнопку для неї.', ru:'Добавь четвёртую категорию "accessories" с новыми товарами и кнопку для неё.' },
      { level:'hard',   uk:'Додай другий "query-параметр" — сортування (<code>sort=name</code> або <code>sort=id</code>) — з власною кнопкою, що змінює порядок відображення списку, і онови симульований URL так, щоб він показував ОБИДВА параметри одразу (наприклад, <code>?category=shoes&sort=name</code>).', ru:'Добавь второй query-параметр sort и покажи оба параметра в симулированном URL.' },
    ]
  );

  /* ─── 03-13: Lazy loading маршрутів ───────────────────────────────── */
  patch('03-13',
    { uk:`<h2>Lazy loading маршрутів: Suspense + lazy()</h2>
<p>У великих застосунках весь код не варто завантажувати одразу — <code>React.lazy()</code> дозволяє завантажувати код компонента лише тоді, коли він реально потрібен (наприклад, при переході на конкретний маршрут).</p>
<h3>Реальний синтаксис (поза пісочницею, з бандлером)</h3>
<pre>import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard')); // окремий JS-чанк, довантажується "на льоту"

function App() {
  return (
    &lt;Suspense fallback={&lt;p&gt;Завантаження...&lt;/p&gt;}&gt;
      &lt;Dashboard /&gt;
    &lt;/Suspense&gt;
  );
}</pre>
<h3>Навіщо це потрібно</h3>
<p>Без lazy loading браузер завантажує ВЕСЬ JS-бандл застосунку одразу при першому відкритті — навіть код сторінок, які користувач може ніколи не відвідати. <code>lazy()</code> розбиває бандл на частини (code splitting), прискорюючи перше завантаження.</p>
<h3>Suspense — "заглушка" на час завантаження</h3>
<p><code>Suspense</code> показує <code>fallback</code>, поки лінивий компонент довантажується з мережі — той самий механізм також використовується для завантаження даних (Suspense for data fetching, більш просунута тема).</p>
<h3>Симуляція в цій пісочниці</h3>
<p>Node.js та бандлера тут немає, тож справжній динамічний <code>import()</code> не спрацює. Нижче — симуляція через <code>setTimeout</code>, що показує ТОЧНО той самий UX-патерн: спочатку fallback, потім готовий компонент.</p>`,
      ru:`<h2>Lazy loading маршрутов: Suspense + lazy()</h2>
<p>React.lazy() позволяет загружать код компонента только тогда, когда он реально нужен.</p>
<h3>Реальный синтаксис (вне песочницы, с бандлером)</h3>
<pre>import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    &lt;Suspense fallback={&lt;p&gt;Загрузка...&lt;/p&gt;}&gt;
      &lt;Dashboard /&gt;
    &lt;/Suspense&gt;
  );
}</pre>
<h3>Зачем это нужно</h3>
<p>Без lazy loading браузер загружает ВЕСЬ JS-бандл сразу. lazy() разбивает бандл на части (code splitting).</p>
<h3>Suspense — "заглушка" на время загрузки</h3>
<p>Suspense показывает fallback, пока ленивый компонент догружается из сети.</p>
<h3>Симуляция в этой песочнице</h3>
<p>Node.js и бандлера здесь нет, поэтому настоящий динамический import() не сработает. Ниже — симуляция через setTimeout с тем же UX-паттерном.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Симуляція lazy() + Suspense';
var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

function Dashboard() {
  return e('div', { className: 'rx-card' }, '📊 Dashboard завантажено! (це і є "лінивий" компонент)');
}

function LazyLoader(props) {
  var state = useState(false);
  var loaded = state[0];
  var setLoaded = state[1];

  useEffect(function () {
    var timer = setTimeout(function () { setLoaded(true); }, 1200);
    return function () { clearTimeout(timer); };
  }, []);

  if (!loaded) return e('p', null, '⏳ ' + props.fallback);
  return e(Dashboard);
}

function App() {
  var state = useState(false);
  var show = state[0];
  var setShow = state[1];

  return e('div', null,
    e('button', { className: 'rx-btn', onClick: function () { setShow(true); } }, 'Перейти на /dashboard'),
    show && e(LazyLoader, { fallback: 'Завантаження Dashboard...' })
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись на коротку затримку (симуляція завантаження чанка) перед появою Dashboard.', ru:'Нажми кнопку и посмотри на короткую задержку перед появлением Dashboard.' },
      { level:'medium', uk:'Зміни затримку в <code>setTimeout</code> з 1200 на 3000 мс і онови текст fallback на "Завантажуємо великий модуль...".', ru:'Измени задержку с 1200 на 3000 мс и обнови текст fallback.' },
      { level:'hard',   uk:'Створи другий "лінивий" маршрут <code>Settings</code> за тим самим принципом (окрема кнопка "Перейти на /settings", свій <code>LazyLoader</code> з іншим fallback) і зроби так, щоб одночасно міг бути показаний лише ОДИН з двох лінивих компонентів.', ru:'Создай второй "ленивый" маршрут Settings по тому же принципу с отдельной кнопкой.' },
    ]
  );

  /* ─── 03-14: Custom hooks ─────────────────────────────────────────── */
  patch('03-14',
    { uk:`<h2>Custom hooks: useFetch, useLocalStorage, useDebounce</h2>
<p>Кастомний хук — звичайна функція, назва якої починається з <code>use</code>, що всередині викликає інші хуки. Це головний спосіб перевикористовувати логіку з station між компонентами.</p>
<h3>useLocalStorage — стан, що переживає перезавантаження сторінки</h3>
<pre>function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Використання — точно як звичайний useState:
const [theme, setTheme] = useLocalStorage('theme', 'light');</pre>
<h3>useDebounce — затримка перед реакцією на швидку зміну</h3>
<pre>function useDebounce(value, delay) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}</pre>
<h3>Правило хуків</h3>
<p>Кастомні хуки (як і вбудовані) мають викликатись <strong>на верхньому рівні компонента</strong>, не всередині <code>if</code>, циклів чи вкладених функцій — React відстежує хуки за порядком їх виклику.</p>`,
      ru:`<h2>Custom hooks: useFetch, useLocalStorage, useDebounce</h2>
<p>Кастомный хук — обычная функция с именем, начинающимся на use, вызывающая внутри другие хуки.</p>
<h3>useLocalStorage — состояние, переживающее перезагрузку страницы</h3>
<pre>function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}</pre>
<h3>useDebounce — задержка перед реакцией на быстрое изменение</h3>
<pre>function useDebounce(value, delay) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}</pre>
<h3>Правило хуков</h3>
<p>Кастомные хуки должны вызываться на верхнем уровне компонента, не внутри if, циклов или вложенных функций.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Кастомні хуки: useLocalStorage + useDebounce';
var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

function useLocalStorage(key, initialValue) {
  var state = useState(function () {
    var saved = null;
    try { saved = localStorage.getItem(key); } catch (err) { saved = null; }
    return saved !== null ? JSON.parse(saved) : initialValue;
  });
  var value = state[0];
  var setValue = state[1];

  useEffect(function () {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) {}
  }, [key, value]);

  return [value, setValue];
}

function useDebounce(value, delay) {
  var state = useState(value);
  var debounced = state[0];
  var setDebounced = state[1];

  useEffect(function () {
    var timer = setTimeout(function () { setDebounced(value); }, delay);
    return function () { clearTimeout(timer); };
  }, [value, delay]);

  return debounced;
}

function App() {
  var themeState = useLocalStorage('rx-lesson-theme', 'light');
  var theme = themeState[0];
  var setTheme = themeState[1];

  var textState = useState('');
  var text = textState[0];
  var setText = textState[1];
  var debouncedText = useDebounce(text, 600);

  return e('div', null,
    e('p', null, 'Тема (збережена в localStorage): ' + theme),
    e('button', { className: 'rx-btn', onClick: function () { setTheme(theme === 'light' ? 'dark' : 'light'); } }, 'Перемкнути тему'),
    e('p', null, 'Онови сторінку — тема НЕ скинеться!'),
    e('input', { className: 'rx-input', value: text, placeholder: 'Друкуй тут...', onChange: function (ev) { setText(ev.target.value); } }),
    e('p', null, 'Debounced-значення (з\'являється через 600мс паузи): "' + debouncedText + '"')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Перемкни тему кілька разів, потім онови вкладку (кнопка "Скинути" редактора) — переконайся, що тема зберіглась завдяки <code>useLocalStorage</code>.', ru:'Переключи тему несколько раз, затем обнови вкладку — убедись, что тема сохранилась.' },
      { level:'medium', uk:'Зміни затримку в <code>useDebounce(text, 600)</code> на 1000 мс і подивись на різницю.', ru:'Измени задержку useDebounce(text, 600) на 1000 мс.' },
      { level:'medium', uk:'Додай до демо кастомний хук <code>useWindowSize()</code> що повертає <code>{ width, height }</code> поточного вікна і підписується на подію <code>resize</code>. Відобрази розміри на сторінці.', ru:'Добавь хук useWindowSize(), возвращающий { width, height } текущего окна с подпиской на resize. Отобрази размеры на странице.' },
      { level:'hard',   uk:'Створи кастомний хук <code>useCounter(initial)</code>, що повертає <code>[count, increment, decrement, reset]</code>, і використай його в новому лічильнику поруч із існуючим інтерфейсом.', ru:'Создай хук useCounter(initial), возвращающий [count, increment, decrement, reset], и используй его в новом счётчике.' },
      { level:'hard',   uk:'Реалізуй хук <code>useFetch(url)</code>, що повертає <code>{ data, loading, error }</code>. Використай його для завантаження публічного JSON (наприклад <code>https://jsonplaceholder.typicode.com/todos/1</code>) і відображення результату.', ru:'Реализуй хук useFetch(url), возвращающий { data, loading, error }. Загрузи публичный JSON и отобрази результат.' },
      { level:'extra',  uk:'Збери всі три хуки (<code>useLocalStorage</code>, <code>useDebounce</code>, <code>useFetch</code>) в окремий файл-бібліотеку і продемонструй їх спільну роботу: поле пошуку з debounce, що запускає fetch-запит і зберігає останній успішний результат у localStorage.', ru:'Объедини все три хука (useLocalStorage, useDebounce, useFetch) в библиотеку и продемонстрируй совместную работу: поиск с debounce, fetch-запросом и сохранением в localStorage.' },
    ]
  );

  /* ─── 03-15: useRef ──────────────────────────────────────────────── */
  patch('03-15',
    { uk:`<h2>useRef: DOM-посилання та зберігання між рендерами</h2>
<h3>Пряме посилання на DOM-елемент</h3>
<pre>function TextInput() {
  const inputRef = React.useRef(null);
  function focusInput() {
    inputRef.current.focus(); // напряму керуємо DOM, в обхід React
  }
  return React.createElement('div', null,
    React.createElement('input', { ref: inputRef }),
    React.createElement('button', { onClick: focusInput }, 'Фокус')
  );
}</pre>
<h3>Друге призначення — "змінна", що НЕ спричиняє re-render</h3>
<pre>function Timer() {
  const renderCount = React.useRef(0);
  renderCount.current++; // змінюється, але НЕ викликає перемалювання

  React.useEffect(() => {
    console.log('Компонент відрендерився ' + renderCount.current + ' разів');
  });
}</pre>
<h3>useRef vs useState — головна відмінність</h3>
<p>Зміна <code>useState</code> завжди спричиняє re-render компонента. Зміна <code>useRef.current</code> — <strong>ніколи</strong> не спричиняє re-render, значення просто "живе" між рендерами. Використовуй <code>useRef</code> для даних, які потрібно зберігати, але не показувати напряму в UI (id таймера, попереднє значення, лічильник рендерів).</p>`,
      ru:`<h2>useRef: DOM-ссылки и хранение между рендерами</h2>
<h3>Прямая ссылка на DOM-элемент</h3>
<pre>function TextInput() {
  const inputRef = React.useRef(null);
  function focusInput() {
    inputRef.current.focus();
  }
  return React.createElement('div', null,
    React.createElement('input', { ref: inputRef }),
    React.createElement('button', { onClick: focusInput }, 'Фокус')
  );
}</pre>
<h3>Второе назначение — "переменная", НЕ вызывающая re-render</h3>
<pre>function Timer() {
  const renderCount = React.useRef(0);
  renderCount.current++;
}</pre>
<h3>useRef vs useState</h3>
<p>Изменение useState всегда вызывает re-render. Изменение useRef.current — никогда не вызывает re-render.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'useRef: фокус та лічильник рендерів';
var e = React.createElement;
var useState = React.useState;
var useRef = React.useRef;
var useEffect = React.useEffect;

function App() {
  var inputRef = useRef(null);
  var renderCount = useRef(0);
  var state = useState('');
  var text = state[0];
  var setText = state[1];

  renderCount.current = renderCount.current + 1;

  function focusInput() {
    inputRef.current.focus();
  }

  return e('div', null,
    e('input', { className: 'rx-input', ref: inputRef, value: text, onChange: function (ev) { setText(ev.target.value); }, placeholder: 'Натисни кнопку, щоб сфокусуватись тут' }),
    e('button', { className: 'rx-btn', onClick: focusInput }, 'Фокус на полі'),
    e('p', null, 'Компонент перерендерився ' + renderCount.current + ' разів (лічильник у useRef, сам НЕ викликає re-render)')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Натисни "Фокус на полі" і подивись, як через <code>ref</code> можна керувати DOM напряму.', ru:'Нажми "Фокус на поле" и посмотри, как через ref можно управлять DOM напрямую.' },
      { level:'medium', uk:'Додай кнопку "Очистити", що встановлює <code>text</code> у порожній рядок і одразу викликає <code>focusInput()</code>.', ru:'Добавь кнопку "Очистить", устанавливающую text в пустую строку и вызывающую focusInput().' },
      { level:'hard',   uk:'Додай другий <code>useRef</code> — <code>previousText</code>, що зберігає ПОПЕРЕДНЄ значення <code>text</code> (онови його всередині <code>useEffect</code> із залежністю <code>[text]</code>, ПІСЛЯ виводу в консоль), і виведи в інтерфейсі "Попереднє значення: ...".', ru:'Добавь второй useRef previousText, хранящий предыдущее значение text.' },
    ]
  );

  /* ─── 03-16: forwardRef та useImperativeHandle ───────────────────── */
  patch('03-16',
    { uk:`<h2>forwardRef та useImperativeHandle</h2>
<p>За замовчуванням функціональні компоненти НЕ можуть отримувати <code>ref</code> напряму (він не є звичайним props) — <code>forwardRef</code> дозволяє "прокинути" ref усередину компонента, до конкретного DOM-вузла чи об'єкта методів.</p>
<h3>forwardRef — передача ref у дочірній компонент</h3>
<pre>const FancyInput = React.forwardRef((props, ref) => {
  return React.createElement('input', { ref, className: 'fancy' });
});

function Parent() {
  const inputRef = React.useRef(null);
  return React.createElement(FancyInput, { ref: inputRef });
  // тепер inputRef.current вказує на реальний &lt;input&gt; усередині FancyInput
}</pre>
<h3>useImperativeHandle — контроль над тим, ЩО саме видно через ref</h3>
<pre>const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
    // батько бачить ЛИШЕ ці два методи, а не весь DOM-вузол
  }));

  return React.createElement('input', { ref: inputRef });
});</pre>
<h3>Коли це реально потрібно</h3>
<p>Переважно React уникає "імперативного" керування (кажи ЩО показати, а не ЯК), але для речей на кшталт фокусу, скролу чи відео-плеєра (play/pause) імперативний доступ через ref — прийнятий і задокументований виняток.</p>`,
      ru:`<h2>forwardRef и useImperativeHandle</h2>
<p>По умолчанию функциональные компоненты не могут получать ref напрямую — forwardRef позволяет "прокинуть" ref внутрь компонента.</p>
<h3>forwardRef — передача ref в дочерний компонент</h3>
<pre>const FancyInput = React.forwardRef((props, ref) => {
  return React.createElement('input', { ref, className: 'fancy' });
});

function Parent() {
  const inputRef = React.useRef(null);
  return React.createElement(FancyInput, { ref: inputRef });
}</pre>
<h3>useImperativeHandle — контроль над тем, что видно через ref</h3>
<pre>const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));

  return React.createElement('input', { ref: inputRef });
});</pre>
<h3>Когда это реально нужно</h3>
<p>Для фокуса, скролла или видео-плеера (play/pause) императивный доступ через ref — принятое исключение.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'forwardRef + useImperativeHandle';
var e = React.createElement;
var useRef = React.useRef;
var forwardRef = React.forwardRef;
var useImperativeHandle = React.useImperativeHandle;

var FancyInput = forwardRef(function (props, ref) {
  var inputRef = useRef(null);

  useImperativeHandle(ref, function () {
    return {
      focus: function () { inputRef.current.focus(); },
      clear: function () { inputRef.current.value = ''; }
    };
  });

  return e('input', { className: 'rx-input', ref: inputRef, placeholder: 'FancyInput всередині' });
});

function App() {
  var fancyRef = useRef(null);

  return e('div', null,
    e(FancyInput, { ref: fancyRef }),
    e('div', { className: 'btn-row' },
      e('button', { className: 'rx-btn', onClick: function () { fancyRef.current.focus(); } }, 'focus()'),
      e('button', { className: 'rx-btn', onClick: function () { fancyRef.current.clear(); } }, 'clear()')
    ),
    e('p', null, 'Parent бачить ЛИШЕ методи focus/clear — не весь DOM-вузол input.')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Натисни <code>focus()</code> і <code>clear()</code> і подивись, як батьківський компонент керує внутрішнім input через обмежений набір методів.', ru:'Нажми focus() и clear() и посмотри, как родительский компонент управляет внутренним input.' },
      { level:'medium', uk:'Додай у <code>useImperativeHandle</code> третій метод <code>setValue: (v) => { inputRef.current.value = v; }</code> і кнопку, що викликає його з якимось текстом.', ru:'Добавь третий метод setValue и кнопку, вызывающую его с текстом.' },
      { level:'hard',   uk:'Створи другий <code>FancyInput</code> з окремим <code>ref</code> і покажи, що методи <code>focus/clear</code> кожного з них керують СВОЇМ власним input незалежно від іншого.', ru:'Создай второй FancyInput с отдельным ref и покажи независимость управления.' },
    ]
  );

  /* ─── 03-17: Portals ─────────────────────────────────────────────── */
  patch('03-17',
    { uk:`<h2>Portals: рендеринг за межами дерева</h2>
<p><code>ReactDOM.createPortal</code> дозволяє відрендерити дочірні елементи в ІНШИЙ DOM-вузол, ніж той, де фізично розташований батьківський компонент у дереві React — часто використовується для модальних вікон, тултипів, спливаючих меню.</p>
<h3>Навіщо це потрібно</h3>
<p>Модальне вікно логічно є частиною компонента, що його викликав, але візуально повинно "вирватись" з-під <code>overflow: hidden</code> чи <code>z-index</code> батьківських контейнерів — портал вирішує цю проблему.</p>
<h3>Синтаксис</h3>
<pre>function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    React.createElement('div', { className: 'modal-overlay', onClick: onClose },
      React.createElement('div', { className: 'modal-box' }, children)
    ),
    document.getElementById('modal-root') // рендериться СЮДИ, а не в звичайне дерево
  );
}</pre>
<h3>Події все одно "спливають" по React-дереву</h3>
<p>Хоча портал рендериться в іншому місці DOM, події (onClick тощо) продовжують спливати через React-дерево так, ніби портал перебуває на своєму логічному місці — це важлива відмінність від звичайного DOM bubbling.</p>`,
      ru:`<h2>Portals: рендеринг вне дерева</h2>
<p>ReactDOM.createPortal позволяет отрендерить дочерние элементы в ДРУГОЙ DOM-узел — часто используется для модальных окон, тултипов, всплывающих меню.</p>
<h3>Зачем это нужно</h3>
<p>Модальное окно должно визуально "вырваться" из-под overflow:hidden или z-index родительских контейнеров.</p>
<h3>Синтаксис</h3>
<pre>function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    React.createElement('div', { className: 'modal-overlay', onClick: onClose },
      React.createElement('div', { className: 'modal-box' }, children)
    ),
    document.getElementById('modal-root')
  );
}</pre>
<h3>События всё равно "всплывают" по React-дереву</h3>
<p>События продолжают всплывать через React-дерево, как будто портал находится на своём логическом месте.</p>` },
    `<h2 id="lesson-h2"></h2>
${REACT_CDN}
<div id="app"></div>
<div id="modal-root"></div>
<div class="console" id="out"></div>`,
    `${BASE}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}
.modal-box{background:#fff;color:#0f172a;padding:20px;border-radius:10px;min-width:220px}`,
    `document.getElementById('lesson-h2').textContent = 'Portal: модальне вікно';
var e = React.createElement;
var useState = React.useState;
var createPortal = ReactDOM.createPortal;

function Modal(props) {
  return createPortal(
    e('div', { className: 'modal-overlay', onClick: props.onClose },
      e('div', { className: 'modal-box', onClick: function (ev) { ev.stopPropagation(); } },
        e('h3', null, 'Це модальне вікно'),
        e('p', null, 'Відрендерено через createPortal у #modal-root, а НЕ всередині #app.'),
        e('button', { className: 'rx-btn', onClick: props.onClose }, 'Закрити')
      )
    ),
    document.getElementById('modal-root')
  );
}

function App() {
  var state = useState(false);
  var open = state[0];
  var setOpen = state[1];

  return e('div', null,
    e('button', { className: 'rx-btn', onClick: function () { setOpen(true); } }, 'Відкрити модальне вікно'),
    open && e(Modal, { onClose: function () { setOpen(false); } })
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Відкрий і закрий модальне вікно — воно рендериться в окремий DOM-вузол <code>#modal-root</code>, а не всередину <code>#app</code>.', ru:'Открой и закрой модальное окно — оно рендерится в отдельный DOM-узел #modal-root.' },
      { level:'medium', uk:'Додай можливість закрити вікно клавішею Escape (підпишись на <code>keydown</code> через <code>useEffect</code> усередині <code>Modal</code>).', ru:'Добавь закрытие окна клавишей Escape через useEffect внутри Modal.' },
      { level:'hard',   uk:'Створи другий тип порталу — тултип, що зʼявляється при наведенні на кнопку (через <code>onMouseEnter</code>/<code>onMouseLeave</code>) і рендериться в той самий <code>#modal-root</code>.', ru:'Создай второй тип портала — тултип, появляющийся при наведении.' },
    ]
  );

  /* ─── 03-18: Error Boundaries ─────────────────────────────────────── */
  patch('03-18',
    { uk:`<h2>Error Boundaries та graceful degradation</h2>
<p>Error Boundary — спеціальний компонент-клас, що "ловить" помилки JavaScript у дереві дочірніх компонентів і показує запасний UI замість того, щоб зламати весь застосунок білим екраном.</p>
<h3>Чому лише клас (поки що)</h3>
<p>Error Boundaries досі можна реалізувати ЛИШЕ через компонент-клас — спеціальні методи життєвого циклу (<code>getDerivedStateFromError</code>, <code>componentDidCatch</code>) не мають еквівалента-хука для функціональних компонентів.</p>
<h3>Реалізація</h3>
<pre>class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // наступний рендер покаже запасний UI
  }

  componentDidCatch(error, info) {
    console.error('Впіймано помилку:', error, info);
    // тут зазвичай відправляють помилку в сервіс на кшталт Sentry
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('p', null, 'Щось пішло не так 😔');
    }
    return this.props.children;
  }
}

React.createElement(ErrorBoundary, null, React.createElement(RiskyComponent));</pre>
<h3>Чого Error Boundary НЕ ловить</h3>
<p>Помилки всередині обробників подій (onClick тощо), асинхронний код (setTimeout, fetch), помилки на сервері (SSR) і помилки в самому Error Boundary — для цих випадків потрібен звичайний <code>try/catch</code>.</p>`,
      ru:`<h2>Error Boundaries и graceful degradation</h2>
<p>Error Boundary — специальный компонент-класс, "ловящий" ошибки JavaScript в дереве дочерних компонентов и показывающий запасной UI.</p>
<h3>Почему только класс (пока что)</h3>
<p>Error Boundaries пока можно реализовать только через компонент-класс.</p>
<h3>Реализация</h3>
<pre>class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Поймана ошибка:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('p', null, 'Что-то пошло не так 😔');
    }
    return this.props.children;
  }
}</pre>
<h3>Чего Error Boundary НЕ ловит</h3>
<p>Ошибки в обработчиках событий, асинхронный код, ошибки SSR и ошибки в самом Error Boundary.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Error Boundary';
var e = React.createElement;
var useState = React.useState;

function log(text) {
  var out = document.getElementById('out');
  out.textContent += (out.textContent ? '\\n' : '') + text;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    log('componentDidCatch спіймав: ' + error.message);
  }
  render() {
    if (this.state.hasError) {
      return e('p', { className: 'rx-card' }, '😔 Щось пішло не так у RiskyComponent, але решта застосунку жива.');
    }
    return this.props.children;
  }
}

function RiskyComponent(props) {
  if (props.crash) {
    throw new Error('Навмисна тестова помилка!');
  }
  return e('p', { className: 'rx-card' }, '✅ RiskyComponent працює нормально.');
}

function App() {
  var state = useState(false);
  var crash = state[0];
  var setCrash = state[1];

  return e('div', null,
    e('button', { className: 'rx-btn', onClick: function () { setCrash(true); } }, 'Викликати помилку'),
    e(ErrorBoundary, null, e(RiskyComponent, { crash: crash }))
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Натисни "Викликати помилку" і подивись, як <code>ErrorBoundary</code> ловить збій і показує запасний UI замість білого екрана.', ru:'Нажми "Вызвать ошибку" и посмотри, как ErrorBoundary ловит сбой.' },
      { level:'medium', uk:'Додай кнопку "Спробувати знову", що скидає <code>this.state.hasError</code> назад у <code>false</code> (додай метод <code>reset</code> у клас <code>ErrorBoundary</code>).', ru:'Добавь кнопку "Попробовать снова", сбрасывающую hasError обратно в false.' },
      { level:'hard',   uk:'Обгорни ДВА окремих <code>RiskyComponent</code> у ДВА окремих <code>ErrorBoundary</code> — переконайся, що падіння одного не ламає інший (ізоляція помилок по частинах інтерфейсу).', ru:'Оберни два отдельных RiskyComponent в два отдельных ErrorBoundary — убедись в изоляции ошибок.' },
    ]
  );

  /* ─── 03-19: React DevTools та профілювання ──────────────────────── */
  patch('03-19',
    { uk:`<h2>React DevTools та профілювання</h2>
<p>React DevTools — офіційне розширення для браузера, що додає дві вкладки в інструменти розробника: <strong>Components</strong> (дерево компонентів, props, state у реальному часі) і <strong>Profiler</strong> (вимірювання швидкості рендерингу).</p>
<h3>Вкладка Components</h3>
<p>Показує повне дерево React-компонентів (а не HTML-тегів), дозволяє на льоту редагувати <code>props</code> і <code>state</code> будь-якого компонента й одразу бачити результат — без зміни коду.</p>
<h3>Вкладка Profiler — пошук зайвих ре-рендерів</h3>
<p>Записує "сесію" взаємодії з застосунком і показує, які компоненти рендерились, скільки це зайняло часу, і <strong>чому</strong> компонент перерендерився (зміна props, зміна state, ре-рендер батька).</p>
<h3>React.memo — запобігання зайвим ре-рендерам</h3>
<pre>const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  console.log('ExpensiveList рендериться');
  return React.createElement('ul', null, items.map(i => React.createElement('li', { key: i }, i)));
});
// Перерендериться ЛИШЕ якщо items реально змінився (поверхневе порівняння props)</pre>
<h3>useMemo та useCallback — кешування обчислень і функцій</h3>
<pre>const sorted = React.useMemo(() => [...items].sort(), [items]); // не пересортовує, якщо items той самий
const handleClick = React.useCallback(() => doSomething(id), [id]); // стабільне посилання на функцію</pre>`,
      ru:`<h2>React DevTools и профилирование</h2>
<p>React DevTools добавляет вкладки Components (дерево компонентов, props, state в реальном времени) и Profiler (измерение скорости рендеринга).</p>
<h3>Вкладка Components</h3>
<p>Показывает дерево React-компонентов, позволяет на лету редактировать props и state.</p>
<h3>Вкладка Profiler</h3>
<p>Показывает, какие компоненты рендерились, сколько это заняло времени и почему.</p>
<h3>React.memo — предотвращение лишних ре-рендеров</h3>
<pre>const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  console.log('ExpensiveList рендерится');
  return React.createElement('ul', null, items.map(i => React.createElement('li', { key: i }, i)));
});</pre>
<h3>useMemo и useCallback</h3>
<pre>const sorted = React.useMemo(() => [...items].sort(), [items]);
const handleClick = React.useCallback(() => doSomething(id), [id]);</pre>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'React.memo: зайві ре-рендери';
var e = React.createElement;
var useState = React.useState;
var memo = React.memo;

function log(text) {
  var out = document.getElementById('out');
  out.textContent += (out.textContent ? '\\n' : '') + text;
}

var ExpensiveList = memo(function (props) {
  log('ExpensiveList рендериться (items.length=' + props.items.length + ')');
  return e('ul', null, props.items.map(function (item) { return e('li', { key: item }, item); }));
});

function App() {
  var itemsState = useState(['Перший', 'Другий', 'Третій']);
  var items = itemsState[0];
  var setItems = itemsState[1];
  var counterState = useState(0);
  var counter = counterState[0];
  var setCounter = counterState[1];

  return e('div', null,
    e('p', null, 'Лічильник (не повʼязаний зі списком): ' + counter),
    e('button', { className: 'rx-btn', onClick: function () { setCounter(counter + 1); } }, 'Збільшити лічильник'),
    e('p', null, 'Список (обгорнутий у React.memo):'),
    e(ExpensiveList, { items: items }),
    e('button', { className: 'rx-btn', onClick: function () { setItems(items.concat('Новий ' + (items.length + 1))); } }, 'Додати елемент у список')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Натисни "Збільшити лічильник" кілька разів і подивись у консолі — <code>ExpensiveList</code> НЕ рендериться повторно, бо <code>items</code> не змінився (React.memo спрацював).', ru:'Нажми "Увеличить счётчик" несколько раз — ExpensiveList не рендерится повторно.' },
      { level:'medium', uk:'Натисни "Додати елемент у список" і подивись, що ТЕПЕР <code>ExpensiveList</code> рендериться — бо <code>items</code> справді змінився.', ru:'Нажми "Добавить элемент" и посмотри, что теперь ExpensiveList рендерится.' },
      { level:'hard',   uk:'Прибери <code>memo(...)</code> навколо <code>ExpensiveList</code> (залиш звичайну функцію) і переконайся, що тепер список рендериться НАВІТЬ при натисканні "Збільшити лічильник" — поясни своїми словами різницю в консольному логу.', ru:'Убери memo(...) вокруг ExpensiveList и убедись, что список рендерится даже при увеличении счётчика — объясни разницу.' },
    ]
  );

  /* ─── 03-20: ФІНАЛ — SPA-застосунок із роутингом та TypeScript ────── */
  patch('03-20',
    { uk:`<h2>ПРОЕКТ: SPA-застосунок із роутингом та TypeScript</h2>
<p>Фінальний проект модуля — міні-SPA "Каталог книг", що поєднує все вивчене: компоненти, props, useState/useEffect, умовний рендеринг, списки з key, підняття стану, спрощений роутинг і кастомні хуки. Реалізовано на чистому <code>React.createElement</code>, з коментарями, як виглядав би той самий код із JSX та TypeScript-типами у реальному Vite-проекті.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ Компоненти <code>BookList</code>, <code>BookDetails</code>, <code>SearchBar</code></li>
  <li>✅ Спрощений роутинг між "списком" і "деталями книги" (принцип React Router)</li>
  <li>✅ <code>useState</code> + lifting state up для пошукового запиту</li>
  <li>✅ Кастомний хук <code>useLocalStorage</code> для обраних книг (favorites)</li>
  <li>✅ Умовний рендеринг і списки з коректними <code>key</code></li>
</ul>
<h3>Як виглядав би тип даних у TypeScript (з модуля 02)</h3>
<pre>interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}</pre>`,
      ru:`<h2>ПРОЕКТ: SPA-приложение с роутингом и TypeScript</h2>
<p>Финальный проект модуля — мини-SPA "Каталог книг", объединяющая всё изученное. Реализовано на чистом React.createElement.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ Компоненты BookList, BookDetails, SearchBar</li>
  <li>✅ Упрощённый роутинг между "списком" и "деталями книги"</li>
  <li>✅ useState + lifting state up для поискового запроса</li>
  <li>✅ Кастомный хук useLocalStorage для избранных книг</li>
  <li>✅ Условный рендеринг и списки с корректными key</li>
</ul>
<h3>Как выглядел бы тип данных в TypeScript</h3>
<pre>interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}</pre>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Каталог книг — фінальний SPA-проект';
var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

/* interface Book { id: number; title: string; author: string; year: number; } */
var BOOKS = [
  { id: 1, title: 'Кобзар', author: 'Тарас Шевченко', year: 1840 },
  { id: 2, title: '1984', author: 'Джордж Орвелл', year: 1949 },
  { id: 3, title: 'Тіні забутих предків', author: 'Михайло Коцюбинський', year: 1911 },
  { id: 4, title: 'Гаррі Поттер', author: 'Дж. К. Ролінг', year: 1997 }
];

function useLocalStorage(key, initialValue) {
  var state = useState(function () {
    var saved = null;
    try { saved = localStorage.getItem(key); } catch (err) {}
    return saved !== null ? JSON.parse(saved) : initialValue;
  });
  var value = state[0];
  var setValue = state[1];
  useEffect(function () {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) {}
  }, [key, value]);
  return [value, setValue];
}

function SearchBar(props) {
  return e('input', {
    className: 'rx-input',
    value: props.query,
    placeholder: 'Пошук за назвою...',
    onChange: function (ev) { props.onChange(ev.target.value); }
  });
}

function BookList(props) {
  var filtered = props.books.filter(function (b) {
    return b.title.toLowerCase().indexOf(props.query.toLowerCase()) !== -1;
  });
  if (filtered.length === 0) return e('p', null, 'Нічого не знайдено.');
  return e('ul', null, filtered.map(function (book) {
    var isFav = props.favorites.indexOf(book.id) !== -1;
    return e('li', { key: book.id, className: 'rx-card' },
      e('a', { href: '#', onClick: function (ev) { ev.preventDefault(); props.onOpen(book.id); } }, book.title),
      ' — ' + book.author + ' (' + book.year + ') ',
      e('button', { className: 'rx-btn', onClick: function () { props.onToggleFav(book.id); } }, isFav ? '★ обране' : '☆ додати')
    );
  }));
}

function BookDetails(props) {
  var book = props.books.find(function (b) { return b.id === props.id; });
  if (!book) return e('p', null, 'Книгу не знайдено.');
  return e('div', { className: 'rx-card' },
    e('h3', null, book.title),
    e('p', null, 'Автор: ' + book.author),
    e('p', null, 'Рік: ' + book.year),
    e('button', { className: 'rx-btn', onClick: props.onBack }, '← До списку')
  );
}

function App() {
  var queryState = useState('');
  var query = queryState[0];
  var setQuery = queryState[1];
  var routeState = useState({ page: 'list' });
  var route = routeState[0];
  var setRoute = routeState[1];
  var favState = useLocalStorage('rx-book-favorites', []);
  var favorites = favState[0];
  var setFavorites = favState[1];

  function toggleFav(id) {
    if (favorites.indexOf(id) !== -1) {
      setFavorites(favorites.filter(function (f) { return f !== id; }));
    } else {
      setFavorites(favorites.concat(id));
    }
  }

  if (route.page === 'details') {
    return e(BookDetails, { books: BOOKS, id: route.id, onBack: function () { setRoute({ page: 'list' }); } });
  }

  return e('div', null,
    e(SearchBar, { query: query, onChange: setQuery }),
    e('p', null, 'Обраних книг: ' + favorites.length),
    e(BookList, {
      books: BOOKS, query: query, favorites: favorites,
      onOpen: function (id) { setRoute({ page: 'details', id: id }); },
      onToggleFav: toggleFav
    })
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Пошукай книгу, відкрий деталі, додай пару книг в обране — переконайся, що все працює разом.', ru:'Найди книгу, открой детали, добавь пару книг в избранное — убедись, что всё работает вместе.' },
      { level:'medium', uk:'Додай у масив <code>BOOKS</code> ще дві нові книги зі своїми <code>id</code>, <code>title</code>, <code>author</code>, <code>year</code>.', ru:'Добавь в массив BOOKS ещё две новые книги.' },
      { level:'hard',   uk:'Додай нову "сторінку" <code>route.page === \'favorites\'</code>, що показує лише книги з масиву <code>favorites</code> (окремий компонент <code>FavoritesList</code>), і кнопку переходу до неї з головного екрана.', ru:'Добавь страницу favorites, показывающую только книги из избранного, с отдельным компонентом FavoritesList.' },
    ]
  );

})();
