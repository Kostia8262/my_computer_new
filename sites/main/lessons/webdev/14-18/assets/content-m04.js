/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 04 — React Advanced · 14–18
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
.c-err{color:#f87171}
.c-dim{color:#64748b}
.rx-card{border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin:6px 0}
.rx-btn{background:#61dafb;color:#0f172a;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600}
input.rx-input{border:1px solid #cbd5e1;border-radius:6px;padding:6px 10px;font-size:13px;width:100%}
.rx-drag{border:2px dashed #94a3b8;border-radius:8px;padding:10px;margin:6px 0;background:#f8fafc;cursor:grab}
.rx-drop{border:2px dashed #61dafb;border-radius:8px;padding:10px;min-height:50px;background:#f0f9ff}`;

  const REACT_CDN = '<script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>\n<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>';

  const APP_HTML = `<h2 id="lesson-h2"></h2>
${REACT_CDN}
<div id="app"></div>
<div class="console" id="out"></div>`;

  const TS_CDN = '<script src="https://cdnjs.cloudflare.com/ajax/libs/typescript/5.4.5/typescript.min.js"><\/script>';

  /* ─── 04-01: Context API та useContext ───────────────────────────── */
  patch('04-01',
    { uk:`<h2>Context API та useContext: глобальний стан</h2>
<p>Коли дані потрібні багатьом компонентам на різних рівнях дерева, передавати їх через props "по ланцюжку" (prop drilling) стає незручно. <code>Context</code> дозволяє "прокинути" дані одразу в будь-яке місце дерева без проміжних props.</p>
<h3>Створення й використання Context</h3>
<pre>const ThemeContext = React.createContext('light'); // 'light' — значення за замовчуванням

function App() {
  return React.createElement(ThemeContext.Provider, { value: 'dark' },
    React.createElement(Toolbar)
  );
}

function Toolbar() {
  return React.createElement(ThemedButton); // Toolbar НЕ передає theme напряму
}

function ThemedButton() {
  const theme = React.useContext(ThemeContext); // читає theme напряму з Provider вище
  return React.createElement('button', { className: theme }, 'Кнопка');
}</pre>
<h3>Проблема prop drilling, яку вирішує Context</h3>
<pre>// Без Context: theme проходить через КОЖЕН компонент, навіть якщо він його не використовує
&lt;App theme={theme}&gt;
  &lt;Toolbar theme={theme}&gt;
    &lt;ThemedButton theme={theme} /&gt;
  &lt;/Toolbar&gt;
&lt;/App&gt;</pre>
<h3>Коли НЕ варто використовувати Context</h3>
<p>Context підходить для рідко змінюваних "глобальних" даних (тема, мова, авторизований користувач). Для часто змінюваного стану (наприклад, кожен символ введеного тексту) Context може спричиняти зайві ре-рендери у всіх споживачів — для цього краще підходять локальний <code>useState</code> або спеціалізовані менеджери стану (Zustand, наступний урок).</p>`,
      ru:`<h2>Context API и useContext: глобальное состояние</h2>
<p>Когда данные нужны многим компонентам на разных уровнях дерева, передавать их через props "по цепочке" (prop drilling) неудобно. Context позволяет "прокинуть" данные сразу в любое место дерева без промежуточных props.</p>
<h3>Создание и использование Context</h3>
<pre>const ThemeContext = React.createContext('light');

function App() {
  return React.createElement(ThemeContext.Provider, { value: 'dark' },
    React.createElement(Toolbar)
  );
}

function Toolbar() {
  return React.createElement(ThemedButton);
}

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return React.createElement('button', { className: theme }, 'Кнопка');
}</pre>
<h3>Проблема prop drilling</h3>
<pre>&lt;App theme={theme}&gt;
  &lt;Toolbar theme={theme}&gt;
    &lt;ThemedButton theme={theme} /&gt;
  &lt;/Toolbar&gt;
&lt;/App&gt;</pre>
<h3>Когда НЕ стоит использовать Context</h3>
<p>Context подходит для редко меняющихся "глобальных" данных. Для часто меняющегося состояния лучше подходит локальный useState или Zustand (следующий урок).</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Context API: тема без prop drilling';
var e = React.createElement;
var useContext = React.useContext;
var useState = React.useState;

var ThemeContext = React.createContext('light');

function ThemedButton() {
  var theme = useContext(ThemeContext);
  var style = theme === 'dark'
    ? { background: '#0f172a', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px' }
    : { background: '#e2e8f0', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: '6px' };
  return e('button', { style: style }, 'Тема: ' + theme);
}

function Toolbar() {
  return e('div', { className: 'rx-card' }, e(ThemedButton));
}

function App() {
  var state = useState('light');
  var theme = state[0];
  var setTheme = state[1];

  return e(ThemeContext.Provider, { value: theme },
    e('button', { className: 'rx-btn', onClick: function () { setTheme(theme === 'light' ? 'dark' : 'light'); } }, 'Перемкнути тему'),
    e(Toolbar)
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));

document.getElementById('out').textContent = 'Toolbar ЖОДНОГО РАЗУ не отримує theme у props — ThemedButton читає його напряму через useContext.';`,
    [
      { level:'easy',   uk:'Перемкни тему й подивись, як <code>ThemedButton</code> усередині <code>Toolbar</code> оновлюється, хоча <code>Toolbar</code> взагалі не знає про theme.', ru:'Переключи тему и посмотри, как ThemedButton внутри Toolbar обновляется, хотя Toolbar вообще не знает о theme.' },
      { level:'medium', uk:'Додай третій рівень вкладеності — компонент <code>Sidebar</code>, що також рендерить <code>ThemedButton</code>, і переконайся, що тема синхронна для обох кнопок.', ru:'Добавь компонент Sidebar, тоже рендерящий ThemedButton, и убедись в синхронности темы.' },
      { level:'hard',   uk:'Створи другий Context — <code>LangContext</code> з мовою (<code>\'uk\'</code>/<code>\'en\'</code>), обгорни <code>App</code> у ДВА Provider одночасно (Theme і Lang), і зроби так, щоб <code>ThemedButton</code> показував текст кнопки різними мовами залежно від <code>LangContext</code>.', ru:'Создай второй Context LangContext и оберни App в два Provider одновременно.' },
    ]
  );

  /* ─── 04-02: useReducer ──────────────────────────────────────────── */
  patch('04-02',
    { uk:`<h2>useReducer: Redux-патерн без Redux</h2>
<p><code>useReducer</code> — альтернатива <code>useState</code> для складнішого стану: замість окремих <code>setX</code>-функцій, усі зміни стану проходять через одну функцію-reducer, яка отримує поточний стан і "дію" (action) та повертає новий стан.</p>
<h3>Базовий синтаксис</h3>
<pre>function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':     return { count: 0 };
    default: throw new Error('Невідома дія: ' + action.type);
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return React.createElement('button',
    { onClick: () => dispatch({ type: 'increment' }) },
    'Рахунок: ' + state.count
  );
}</pre>
<h3>Чому це схоже на Redux</h3>
<p>Redux побудований саме на цьому патерні: єдине джерело правди (state), чисті функції-редюсери, і зміни ЛИШЕ через диспатч описаних дій (actions) — ніколи напряму. <code>useReducer</code> дає той самий підхід вбудовано, без встановлення бібліотеки.</p>
<h3>useReducer vs useState — коли що обирати</h3>
<p><strong>useState</strong> — коли стан простий (число, рядок, булеве значення) і оновлення незалежні. <strong>useReducer</strong> — коли наступний стан залежить від типу дії й попереднього стану складним чином, або коли кілька полів стану змінюються разом за одним правилом.</p>`,
      ru:`<h2>useReducer: Redux-паттерн без Redux</h2>
<p>useReducer — альтернатива useState для сложного состояния: все изменения проходят через одну функцию-редьюсер.</p>
<h3>Базовый синтаксис</h3>
<pre>function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':     return { count: 0 };
    default: throw new Error('Неизвестное действие: ' + action.type);
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 });
  return React.createElement('button',
    { onClick: () => dispatch({ type: 'increment' }) },
    'Счёт: ' + state.count
  );
}</pre>
<h3>Почему это похоже на Redux</h3>
<p>Redux построен именно на этом паттерне: единый источник правды, чистые функции-редьюсеры, изменения только через dispatch.</p>
<h3>useReducer vs useState</h3>
<p>useState — для простого состояния. useReducer — когда следующее состояние сложно зависит от типа действия.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'useReducer: лічильник з журналом дій';
var e = React.createElement;
var useReducer = React.useReducer;

function log(text) {
  var out = document.getElementById('out');
  out.textContent += (out.textContent ? '\\n' : '') + text;
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
    default: throw new Error('Невідома дія: ' + action.type);
  }
}

function Counter() {
  var reducerState = useReducer(reducer, { count: 0 });
  var state = reducerState[0];
  var dispatch = reducerState[1];

  function handle(type) {
    log('dispatch({ type: "' + type + '" })');
    dispatch({ type: type });
  }

  return e('div', null,
    e('p', null, 'Рахунок: ' + state.count),
    e('div', { className: 'btn-row' },
      e('button', { className: 'rx-btn', onClick: function () { handle('increment'); } }, '+1'),
      e('button', { className: 'rx-btn', onClick: function () { handle('decrement'); } }, '-1'),
      e('button', { className: 'rx-btn', onClick: function () { handle('reset'); } }, 'Скинути')
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(Counter));`,
    [
      { level:'easy',   uk:'Натискай кнопки й дивись у консолі, як кожна дія логується перед тим, як reducer обчислює новий стан.', ru:'Нажимай кнопки и смотри в консоли, как каждое действие логируется перед вычислением нового состояния.' },
      { level:'medium', uk:'Додай нову дію <code>\'incrementBy5\'</code> у <code>reducer</code>, що збільшує <code>count</code> одразу на 5, і кнопку для неї.', ru:'Добавь действие \'incrementBy5\', увеличивающее count сразу на 5.' },
      { level:'hard',   uk:'Розшир стан до <code>{ count: 0, history: [] }</code> — при кожній дії (крім reset) додавай новий запис у <code>history</code> (масив попередніх значень count), і виведи цю історію під лічильником.', ru:'Расширь состояние до { count: 0, history: [] } и выводи историю значений под счётчиком.' },
    ]
  );

  /* ─── 04-03: Zustand ─────────────────────────────────────────────── */
  patch('04-03',
    { uk:`<h2>Zustand: легкий менеджер стану</h2>
<p>Zustand — популярна бібліотека для глобального стану, значно простіша за Redux: без reducers, actions чи Provider-обгорток. У цій пісочниці немає npm/бандлера, тож нижче показано справжній API бібліотеки для довідки, а демо реалізує ідентичний за поведінкою "магазин" (store) на чистому React, щоб побачити механізм зсередини.</p>
<h3>Реальний синтаксис Zustand (поза пісочницею)</h3>
<pre>import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clear: () => set({ items: [] })
}));

// Використання в БУДЬ-ЯКОМУ компоненті, без Provider:
function Cart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  return React.createElement('p', null, 'Товарів: ' + items.length);
}</pre>
<h3>Головна перевага перед Context + useReducer</h3>
<p>Zustand не потребує обгортати застосунок у <code>&lt;Provider&gt;</code>, і, що важливіше, компонент, який підписаний лише на ЧАСТИНУ стану (<code>state.items</code>), НЕ перерендерюється, коли змінюється інша частина того самого store — на відміну від Context, де ЛЮБА зміна value перерендерює ВСІХ споживачів.</p>
<h3>DIY-реалізація зсередини (те, що демонструє демо нижче)</h3>
<p>По суті, "магазин" — це об'єкт зі станом плюс набір підписників (listeners), яких сповіщають при зміні. Це і є спрощена версія того, як Zustand влаштований під капотом.</p>`,
      ru:`<h2>Zustand: лёгкий менеджер состояния</h2>
<p>Zustand — популярная библиотека для глобального состояния, значительно проще Redux: без reducers, actions и Provider-обёрток. Здесь нет npm/бандлера, поэтому ниже — настоящий API библиотеки для справки, а демо реализует идентичный по поведению "магазин" на чистом React.</p>
<h3>Реальный синтаксис Zustand (вне песочницы)</h3>
<pre>import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clear: () => set({ items: [] })
}));

function Cart() {
  const items = useCartStore((state) => state.items);
  return React.createElement('p', null, 'Товаров: ' + items.length);
}</pre>
<h3>Главное преимущество перед Context + useReducer</h3>
<p>Zustand не требует Provider, и компонент, подписанный лишь на ЧАСТЬ состояния, не перерендеривается при изменении другой части store.</p>
<h3>DIY-реализация изнутри</h3>
<p>По сути, "магазин" — объект с состоянием плюс набор подписчиков (listeners), которых уведомляют при изменении.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Мінімальний Zustand-подібний store';
var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

function createStore(initializer) {
  var state = {};
  var listeners = [];

  function setState(partial) {
    var next = typeof partial === 'function' ? partial(state) : partial;
    state = Object.assign({}, state, next);
    listeners.forEach(function (listener) { listener(state); });
  }

  function getState() { return state; }

  function subscribe(listener) {
    listeners.push(listener);
    return function () { listeners = listeners.filter(function (l) { return l !== listener; }); };
  }

  state = initializer(setState, getState);
  return { getState: getState, setState: setState, subscribe: subscribe };
}

function useStore(store) {
  var stateHolder = useState(store.getState());
  var value = stateHolder[0];
  var setValue = stateHolder[1];

  useEffect(function () {
    var unsubscribe = store.subscribe(function (newState) { setValue(newState); });
    return unsubscribe;
  }, [store]);

  return value;
}

var cartStore = createStore(function (set) {
  return {
    items: [],
    addItem: function (item) { set(function (state) { return { items: state.items.concat(item) }; }); },
    clear: function () { set({ items: [] }); }
  };
});

function CartBadge() {
  var state = useStore(cartStore);
  return e('p', null, '🛒 Товарів у кошику: ' + state.items.length);
}

function AddItemButton() {
  var state = useStore(cartStore);
  var counter = React.useRef(1);
  return e('button', { className: 'rx-btn', onClick: function () {
    state.addItem('Товар #' + counter.current);
    counter.current++;
  } }, 'Додати товар');
}

function App() {
  return e('div', null,
    e(CartBadge),
    e(AddItemButton),
    e('button', { className: 'rx-btn', onClick: function () { cartStore.getState().clear(); } }, 'Очистити кошик')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Додай кілька товарів і подивись, як <code>CartBadge</code> і <code>AddItemButton</code> — два РІЗНІ компоненти — читають ОДИН і той самий store без Context Provider.', ru:'Добавь несколько товаров и посмотри, как CartBadge и AddItemButton читают один store без Context Provider.' },
      { level:'medium', uk:'Додай у <code>cartStore</code> новий метод <code>removeLast</code>, що видаляє останній доданий товар, і кнопку для нього.', ru:'Добавь метод removeLast, удаляющий последний добавленный товар.' },
      { level:'hard',   uk:'Додай у store друге поле — <code>total</code> (сума), і метод <code>addItemWithPrice(name, price)</code>, що одночасно додає товар у <code>items</code> ТА оновлює <code>total</code> — виведи загальну суму в інтерфейсі.', ru:'Добавь поле total и метод addItemWithPrice(name, price), обновляющий оба поля одновременно.' },
    ]
  );

  /* ─── 04-04: TanStack Query ──────────────────────────────────────── */
  patch('04-04',
    { uk:`<h2>TanStack Query: data fetching, cache та mutations</h2>
<p>TanStack Query (раніше React Query) вирішує біль ручного <code>useEffect + fetch + useState(loading/error/data)</code> — дає готові <code>loading</code>, <code>error</code>, кешування, автоматичне повторне завантаження й інвалідацію кешу після змін.</p>
<h3>Реальний синтаксис (поза пісочницею)</h3>
<pre>import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(r => r.json())
  });

  const queryClient = useQueryClient();
  const addTodo = useMutation({
    mutationFn: (todo) => fetch('/api/todos', { method: 'POST', body: JSON.stringify(todo) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }) // авто-оновлення після мутації
  });

  if (isLoading) return React.createElement('p', null, 'Завантаження...');
  if (error) return React.createElement('p', null, 'Помилка!');
  return React.createElement('ul', null, data.map(t => React.createElement('li', { key: t.id }, t.title)));
}</pre>
<h3>Чому не просто useEffect</h3>
<p>Без бібліотеки кожен компонент, якому потрібні ті самі дані, робить СВІЙ окремий запит. TanStack Query кешує за <code>queryKey</code> — другий компонент з тим самим ключем отримує дані миттєво з кешу, без повторного запиту.</p>
<h3>DIY-версія в цій пісочниці</h3>
<p>Демо нижче реалізує спрощений <code>useQuery</code>-подібний хук із власним кешем — та сама ідея (loading/error/data + кеш за ключем), без реальної бібліотеки.</p>`,
      ru:`<h2>TanStack Query: data fetching, cache и mutations</h2>
<p>TanStack Query решает боль ручного useEffect + fetch + useState(loading/error/data) — даёт готовые loading, error, кэширование, автоматическую инвалидацию кэша.</p>
<h3>Реальный синтаксис (вне песочницы)</h3>
<pre>import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(r => r.json())
  });

  const queryClient = useQueryClient();
  const addTodo = useMutation({
    mutationFn: (todo) => fetch('/api/todos', { method: 'POST', body: JSON.stringify(todo) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  });
}</pre>
<h3>Почему не просто useEffect</h3>
<p>TanStack Query кэширует по queryKey — второй компонент с тем же ключом получает данные мгновенно из кэша.</p>
<h3>DIY-версия в этой песочнице</h3>
<p>Демо реализует упрощённый useQuery-подобный хук со своим кэшем.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Мінімальний useQuery-подібний хук';
var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

var queryCache = {};

function fakeFetchTodos() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve([{ id: 1, title: 'Вивчити TanStack Query' }, { id: 2, title: 'Написати демо' }]);
    }, 900);
  });
}

function useQuery(key, queryFn) {
  var stateHolder = useState(function () {
    return queryCache[key] ? { data: queryCache[key], isLoading: false, error: null } : { data: null, isLoading: true, error: null };
  });
  var state = stateHolder[0];
  var setState = stateHolder[1];

  useEffect(function () {
    if (queryCache[key]) return;
    setState({ data: null, isLoading: true, error: null });
    queryFn().then(function (data) {
      queryCache[key] = data;
      setState({ data: data, isLoading: false, error: null });
    }).catch(function (err) {
      setState({ data: null, isLoading: false, error: err });
    });
  }, [key]);

  return state;
}

function TodosView() {
  var query = useQuery('todos', fakeFetchTodos);

  if (query.isLoading) return e('p', null, '⏳ Завантаження todos...');
  if (query.error) return e('p', null, '❌ Помилка завантаження');
  return e('ul', null, query.data.map(function (t) { return e('li', { key: t.id }, t.title); }));
}

function App() {
  return e('div', null,
    e('p', null, 'Компонент №1 (запускає запит):'),
    e(TodosView),
    e('p', null, 'Компонент №2 (той самий queryKey — бере з кешу):'),
    e(TodosView)
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Подивись, як обидва <code>TodosView</code> зрештою показують ті самі дані — другий міг би взяти їх з кешу миттєво, якби перший уже завершив запит раніше.', ru:'Посмотри, как оба TodosView показывают одни данные — второй мог бы взять их из кэша мгновенно.' },
      { level:'medium', uk:'Додай кнопку "Скинути кеш", що очищає <code>queryCache</code> і примусово перемонтовує <code>App</code> (через зміну <code>key</code> у React або простий стан-тригер перерендеру).', ru:'Добавь кнопку "Сбросить кэш", очищающую queryCache.' },
      { level:'hard',   uk:'Реалізуй просту "мутацію" — функцію <code>addTodo(title)</code>, що додає новий todo в <code>queryCache[\'todos\']</code> і примусово оновлює всі компоненти, підписані на цей ключ (імітація <code>invalidateQueries</code>).', ru:'Реализуй мутацию addTodo(title), добавляющую todo и обновляющую все подписанные компоненты.' },
    ]
  );

  /* ─── 04-05: React.memo, useMemo, useCallback ────────────────────── */
  patch('04-05',
    { uk:`<h2>React.memo, useMemo та useCallback</h2>
<p>Три інструменти оптимізації продуктивності, що працюють РАЗОМ: <code>React.memo</code> запобігає ре-рендеру компонента, якщо його props не змінились; <code>useMemo</code> кешує РЕЗУЛЬТАТ обчислення; <code>useCallback</code> кешує саму ФУНКЦІЮ (щоб не створювати нову при кожному рендері).</p>
<h3>Проблема, яку вирішує useCallback</h3>
<pre>function Parent() {
  const [count, setCount] = React.useState(0);
  const handleClick = () => console.log('клік'); // НОВА функція при КОЖНОМУ рендері Parent!
  return React.createElement(Child, { onClick: handleClick });
  // Child обгорнутий у React.memo, але все одно перерендериться,
  // бо onClick завжди "новий" за посиланням
}</pre>
<h3>Рішення — useCallback</h3>
<pre>const handleClick = React.useCallback(() => console.log('клік'), []); // те саме посилання між рендерами
const MemoChild = React.memo(Child); // тепер дійсно НЕ перерендериться, якщо onClick стабільний</pre>
<h3>useMemo — кешування важких обчислень</h3>
<pre>const sortedList = React.useMemo(() => {
  console.log('Сортування...'); // виконається лише коли items реально змінився
  return [...items].sort((a, b) => a.price - b.price);
}, [items]);</pre>
<h3>Важливе попередження</h3>
<p>Не варто обгортати ВСЕ в <code>memo</code>/<code>useMemo</code>/<code>useCallback</code> "про всяк випадок" — саме порівняння залежностей теж має свою вартість. Використовуй ці інструменти там, де профайлер (React DevTools Profiler) реально показав зайві ре-рендери чи повільні обчислення.</p>`,
      ru:`<h2>React.memo, useMemo и useCallback</h2>
<p>Три инструмента оптимизации, работающие вместе: React.memo предотвращает ре-рендер при неизменных props; useMemo кэширует результат вычисления; useCallback кэширует саму функцию.</p>
<h3>Проблема, которую решает useCallback</h3>
<pre>function Parent() {
  const [count, setCount] = React.useState(0);
  const handleClick = () => console.log('клик'); // НОВАЯ функция при КАЖДОМ рендере!
  return React.createElement(Child, { onClick: handleClick });
}</pre>
<h3>Решение — useCallback</h3>
<pre>const handleClick = React.useCallback(() => console.log('клик'), []);
const MemoChild = React.memo(Child);</pre>
<h3>useMemo — кэширование тяжёлых вычислений</h3>
<pre>const sortedList = React.useMemo(() => {
  console.log('Сортировка...');
  return [...items].sort((a, b) => a.price - b.price);
}, [items]);</pre>
<h3>Важное предупреждение</h3>
<p>Не стоит оборачивать ВСЁ в memo/useMemo/useCallback "на всякий случай" — само сравнение зависимостей тоже стоит ресурсов.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'useCallback + React.memo разом';
var e = React.createElement;
var useState = React.useState;
var useCallback = React.useCallback;
var memo = React.memo;

function log(text) {
  var out = document.getElementById('out');
  out.textContent += (out.textContent ? '\\n' : '') + text;
}

var Child = memo(function (props) {
  log('Child рендериться');
  return e('button', { className: 'rx-btn', onClick: props.onClick }, 'Дочірня кнопка');
});

function App() {
  var state = useState(0);
  var count = state[0];
  var setCount = state[1];
  var useCallbackState = useState(true);
  var useStable = useCallbackState[0];
  var setUseStable = useCallbackState[1];

  var stableClick = useCallback(function () { log('Клік по дочірній кнопці'); }, []);
  var unstableClick = function () { log('Клік по дочірній кнопці (нестабільна функція)'); };

  return e('div', null,
    e('p', null, 'Лічильник Parent: ' + count),
    e('button', { className: 'rx-btn', onClick: function () { setCount(count + 1); } }, 'Збільшити лічильник Parent'),
    e('p', null, 'Режим: ' + (useStable ? 'useCallback (стабільна функція)' : 'звичайна функція (нестабільна)')),
    e('button', { className: 'rx-btn', onClick: function () { setUseStable(!useStable); } }, 'Перемкнути режим'),
    e(Child, { onClick: useStable ? stableClick : unstableClick })
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'У режимі "useCallback" натисни "Збільшити лічильник Parent" кілька разів — подивись, що <code>Child</code> НЕ рендериться повторно (в консолі тиша).', ru:'В режиме useCallback нажми "Увеличить счётчик Parent" — Child не рендерится повторно.' },
      { level:'medium', uk:'Перемкни на "звичайна функція" і натисни "Збільшити лічильник Parent" знову — подивись, що ТЕПЕР <code>Child рендериться</code> зʼявляється в консолі щоразу.', ru:'Переключи на "обычная функция" и снова нажми на счётчик — теперь Child рендерится каждый раз.' },
      { level:'hard',   uk:'Додай <code>useMemo</code> для важкого обчислення — наприклад, <code>const doubled = useMemo(() => { /* лог + count*2 */ }, [count])</code> — і виведи його результат в інтерфейсі, підтвердивши логом, що обчислення не повторюється при перемиканні режиму (лише при зміні <code>count</code>).', ru:'Добавь useMemo для тяжёлого вычисления, зависящего от count, и подтверди логом, что оно не повторяется при переключении режима.' },
    ]
  );

  /* ─── 04-06: Code splitting та динамічні імпорти ─────────────────── */
  patch('04-06',
    { uk:`<h2>Code splitting та динамічні імпорти</h2>
<p>Продовжуємо тему з модуля 03 (lazy + Suspense), тепер глибше: як РЕАЛЬНО розбивається бандл на частини (чанки) у Vite/Webpack, і що саме відбувається в мережі при переході на "лінивий" маршрут.</p>
<h3>Динамічний import() — точка розбиття</h3>
<pre>// Статичний import — компонент потрапляє в ГОЛОВНИЙ бандл:
import Dashboard from './Dashboard';

// Динамічний import() — Vite/Webpack автоматично виносить Dashboard в ОКРЕМИЙ файл-чанк:
const Dashboard = React.lazy(() => import('./Dashboard'));</pre>
<h3>Що видно в мережевій вкладці браузера</h3>
<pre>При першому завантаженні сторінки:
  main.js       (150 KB) — завантажується одразу

При переході на /dashboard:
  Dashboard-a3f21.js  (40 KB) — довантажується ЛИШЕ ЗАРАЗ, окремим запитом</pre>
<h3>Named chunks — контроль над назвами файлів (Vite)</h3>
<pre>const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './Dashboard')
);</pre>
<h3>Коли варто розбивати бандл</h3>
<p>Головні кандидати — маршрути, які відвідує НЕ кожен користувач (адмінка, налаштування, рідкісні модальні вікна з важкими бібліотеками на кшталт редакторів чи графіків). Компоненти, потрібні одразу при відкритті сторінки, розбивати не варто — це лише додасть зайвий мережевий запит.</p>`,
      ru:`<h2>Code splitting и динамические импорты</h2>
<p>Продолжаем тему из модуля 03, теперь глубже: как РЕАЛЬНО разбивается бандл на части (чанки) в Vite/Webpack.</p>
<h3>Динамический import() — точка разбиения</h3>
<pre>import Dashboard from './Dashboard'; // статический — попадает в главный бандл

const Dashboard = React.lazy(() => import('./Dashboard')); // динамический — отдельный чанк</pre>
<h3>Что видно в сетевой вкладке браузера</h3>
<pre>При первой загрузке:
  main.js       (150 KB)

При переходе на /dashboard:
  Dashboard-a3f21.js  (40 KB) — догружается отдельным запросом</pre>
<h3>Named chunks (Vite/Webpack)</h3>
<pre>const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './Dashboard')
);</pre>
<h3>Когда стоит разбивать бандл</h3>
<p>Главные кандидаты — маршруты, которые посещает не каждый пользователь.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Симуляція мережі при code splitting';
var e = React.createElement;
var useState = React.useState;

function log(text) {
  var out = document.getElementById('out');
  out.textContent += (out.textContent ? '\\n' : '') + text;
}

var CHUNKS = {
  dashboard: { size: '40 KB', delay: 900 },
  settings: { size: '18 KB', delay: 500 },
  editor: { size: '120 KB', delay: 1500 }
};

function loadChunk(name) {
  log('→ Мережевий запит: ' + name + '-[hash].js (' + CHUNKS[name].size + ')');
  return new Promise(function (resolve) {
    setTimeout(function () {
      log('✓ Чанк "' + name + '" завантажено та виконано');
      resolve();
    }, CHUNKS[name].delay);
  });
}

function App() {
  var state = useState(null);
  var loading = state[0];
  var setLoading = state[1];

  function open(name) {
    setLoading(name);
    loadChunk(name).then(function () { setLoading(null); });
  }

  return e('div', null,
    e('p', null, 'При завантаженні сторінки: тільки main.js (150 KB) — маршрути нижче ще НЕ завантажені.'),
    e('div', { className: 'btn-row' },
      e('button', { className: 'rx-btn', onClick: function () { open('dashboard'); } }, 'Перейти на /dashboard'),
      e('button', { className: 'rx-btn', onClick: function () { open('settings'); } }, 'Перейти на /settings'),
      e('button', { className: 'rx-btn', onClick: function () { open('editor'); } }, 'Перейти на /editor (важкий)')
    ),
    loading && e('p', null, '⏳ Довантажуємо чанк "' + loading + '"...')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Відкрий кожен "маршрут" і подивись у консолі симуляцію окремих мережевих запитів за різними чанками різного розміру.', ru:'Открой каждый "маршрут" и посмотри симуляцию отдельных сетевых запросов за разными чанками.' },
      { level:'medium', uk:'Додай новий чанк <code>\'reports\'</code> у <code>CHUNKS</code> (свій розмір і затримка) і кнопку для нього.', ru:'Добавь новый чанк \'reports\' в CHUNKS и кнопку для него.' },
      { level:'hard',   uk:'Додай простий кеш завантажених чанків (об\'єкт <code>loadedChunks = {}</code>) — якщо чанк вже завантажений раніше, <code>loadChunk</code> має одразу логувати "✓ Чанк вже в кеші, повторний запит НЕ виконується" без затримки.', ru:'Добавь кеш загруженных чанков — повторный переход не должен делать новый сетевой запрос.' },
    ]
  );

  /* ─── 04-07: Virtualized lists ────────────────────────────────────── */
  patch('04-07',
    { uk:`<h2>Virtualized lists: react-window та react-virtual</h2>
<p>Якщо список має тисячі елементів, рендерити ВСІ DOM-вузли одразу — повільно й витрачає багато пам'яті. Віртуалізація рендерить у DOM ЛИШЕ ті елементи, які реально видно на екрані (плюс невеликий запас), а решту імітує порожнім простором.</p>
<h3>Реальний синтаксис react-window (поза пісочницею)</h3>
<pre>import { FixedSizeList } from 'react-window';

function BigList({ items }) {
  const Row = ({ index, style }) =>
    React.createElement('div', { style }, items[index]);

  return React.createElement(FixedSizeList, {
    height: 400, itemCount: items.length, itemSize: 35, width: '100%'
  }, Row);
}</pre>
<h3>Принцип роботи (реалізовано в демо нижче вручну)</h3>
<pre>1. Знаємо висоту одного елемента (itemSize) і висоту видимої області (height)
2. За позицією скролу обчислюємо: startIndex = Math.floor(scrollTop / itemSize)
3. Рендеримо лише elements[startIndex .. startIndex + visibleCount]
4. Додаємо "проставки" (spacers) зверху й знизу, щоб скролбар мав правильну загальну висоту</pre>
<h3>Навіщо це реально потрібно</h3>
<p>Список зі 100 000 рядків БЕЗ віртуалізації створить 100 000 DOM-вузлів — браузер може "зависнути". З віртуалізацією в DOM одночасно лише ~20 рядків, незалежно від загальної довжини списку.</p>`,
      ru:`<h2>Virtualized lists: react-window и react-virtual</h2>
<p>Если список содержит тысячи элементов, рендерить ВСЕ DOM-узлы сразу — медленно. Виртуализация рендерит в DOM только видимые элементы.</p>
<h3>Реальный синтаксис react-window (вне песочницы)</h3>
<pre>import { FixedSizeList } from 'react-window';

function BigList({ items }) {
  const Row = ({ index, style }) =>
    React.createElement('div', { style }, items[index]);

  return React.createElement(FixedSizeList, {
    height: 400, itemCount: items.length, itemSize: 35, width: '100%'
  }, Row);
}</pre>
<h3>Принцип работы (реализовано в демо вручную)</h3>
<pre>1. Знаем высоту элемента (itemSize) и высоту видимой области (height)
2. По позиции скролла вычисляем: startIndex = Math.floor(scrollTop / itemSize)
3. Рендерим только elements[startIndex .. startIndex + visibleCount]
4. Добавляем "проставки" сверху и снизу для правильной высоты скроллбара</pre>
<h3>Зачем это реально нужно</h3>
<p>Список из 100 000 строк без виртуализации создаст 100 000 DOM-узлов. С виртуализацией — одновременно ~20 строк.</p>` },
    APP_HTML,
    `${BASE}
.vlist{height:220px;overflow-y:auto;border:1px solid #cbd5e1;border-radius:8px}
.vrow{height:32px;display:flex;align-items:center;padding:0 10px;border-bottom:1px solid #f1f5f9;font-size:13px}`,
    `document.getElementById('lesson-h2').textContent = 'Ручна віртуалізація списку з 10 000 елементів';
var e = React.createElement;
var useState = React.useState;
var useRef = React.useRef;

var TOTAL = 10000;
var ITEM_HEIGHT = 32;
var VISIBLE_HEIGHT = 220;
var ITEMS = [];
for (var i = 0; i < TOTAL; i++) { ITEMS.push('Елемент #' + i); }

function log(text) {
  var out = document.getElementById('out');
  out.textContent = text;
}

function VirtualList() {
  var state = useState(0);
  var scrollTop = state[0];
  var setScrollTop = state[1];

  var startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 2);
  var visibleCount = Math.ceil(VISIBLE_HEIGHT / ITEM_HEIGHT) + 4;
  var endIndex = Math.min(TOTAL, startIndex + visibleCount);

  var visibleItems = ITEMS.slice(startIndex, endIndex);

  log('Всього елементів: ' + TOTAL + '. Реально в DOM зараз: ' + visibleItems.length + ' (з ' + startIndex + ' по ' + endIndex + ')');

  return e('div', {
    className: 'vlist',
    onScroll: function (ev) { setScrollTop(ev.target.scrollTop); }
  },
    e('div', { style: { height: (TOTAL * ITEM_HEIGHT) + 'px', position: 'relative' } },
      e('div', { style: { position: 'absolute', top: (startIndex * ITEM_HEIGHT) + 'px', left: 0, right: 0 } },
        visibleItems.map(function (item, i) {
          return e('div', { key: startIndex + i, className: 'vrow' }, item);
        })
      )
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(VirtualList));`,
    [
      { level:'easy',   uk:'Прокрути список і подивись у консолі, що в DOM завжди лише ~10-12 елементів, незалежно від того, що список має 10 000 записів.', ru:'Прокрути список и посмотри в консоли, что в DOM всегда лишь ~10-12 элементов из 10 000.' },
      { level:'medium', uk:'Зміни <code>TOTAL</code> на 100000 і переконайся, що список все одно прокручується плавно (бо кількість реальних DOM-вузлів не залежить від TOTAL).', ru:'Измени TOTAL на 100000 и убедись, что список всё равно прокручивается плавно.' },
      { level:'hard',   uk:'Зроби висоту рядків змінною (наприклад, кожен 5-й елемент — 60px замість 32px) — це ускладнює обчислення <code>startIndex</code>, тому просто задокументуй у коментарі, чому <code>FixedSizeList</code> не підходить для цього випадку і знадобився б <code>VariableSizeList</code>.', ru:'Сделай высоту строк переменной и задокументируй в комментарии, почему потребовался бы VariableSizeList.' },
    ]
  );

  /* ─── 04-08: Drag and Drop ───────────────────────────────────────── */
  patch('04-08',
    { uk:`<h2>Drag and Drop у React: dnd-kit</h2>
<p><code>dnd-kit</code> — сучасна бібліотека для drag-and-drop у React, побудована на тих самих базових браузерних подіях (Pointer Events), що показані нижче, але з готовою підтримкою доступності (клавіатура, screen readers) і плавних анімацій.</p>
<h3>Реальний синтаксис dnd-kit (поза пісочницею)</h3>
<pre>import { DndContext } from '@dnd-kit/core';

function App() {
  function handleDragEnd(event) {
    console.log('Перетягнуто:', event.active.id, 'на', event.over?.id);
  }
  return React.createElement(DndContext, { onDragEnd: handleDragEnd },
    React.createElement(Draggable, { id: 'item-1' }),
    React.createElement(Droppable, { id: 'zone-1' })
  );
}</pre>
<h3>Базовий рівень — нативний HTML5 Drag and Drop API</h3>
<pre>&lt;div draggable="true" onDragStart={e =&gt; e.dataTransfer.setData('text', itemId)}&gt;
  Перетягни мене
&lt;/div&gt;

&lt;div onDragOver={e =&gt; e.preventDefault()} onDrop={e =&gt; {
  const itemId = e.dataTransfer.getData('text');
  // ...обробка
}}&gt;
  Кинь сюди
&lt;/div&gt;</pre>
<h3>Чому dnd-kit, а не просто нативний API</h3>
<p>Нативний HTML5 DnD погано працює на тач-екранах і незручний для клавіатурної навігації. <code>dnd-kit</code> будує власну систему на Pointer Events, що працює однаково на мишці, тачпаді й сенсорному екрані, плюс підтримує керування списками через клавіатуру для доступності.</p>`,
      ru:`<h2>Drag and Drop в React: dnd-kit</h2>
<p>dnd-kit — современная библиотека для drag-and-drop в React, построенная на тех же базовых событиях, что показаны ниже, но с поддержкой доступности.</p>
<h3>Реальный синтаксис dnd-kit (вне песочницы)</h3>
<pre>import { DndContext } from '@dnd-kit/core';

function App() {
  function handleDragEnd(event) {
    console.log('Перетащено:', event.active.id, 'на', event.over?.id);
  }
  return React.createElement(DndContext, { onDragEnd: handleDragEnd },
    React.createElement(Draggable, { id: 'item-1' }),
    React.createElement(Droppable, { id: 'zone-1' })
  );
}</pre>
<h3>Базовый уровень — нативный HTML5 Drag and Drop API</h3>
<pre>&lt;div draggable="true" onDragStart={e =&gt; e.dataTransfer.setData('text', itemId)}&gt;
  Перетащи меня
&lt;/div&gt;

&lt;div onDragOver={e =&gt; e.preventDefault()} onDrop={e =&gt; {
  const itemId = e.dataTransfer.getData('text');
}}&gt;
  Брось сюда
&lt;/div&gt;</pre>
<h3>Почему dnd-kit, а не просто нативный API</h3>
<p>Нативный HTML5 DnD плохо работает на тач-экранах. dnd-kit строит систему на Pointer Events.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Нативний Drag and Drop (принцип dnd-kit)';
var e = React.createElement;
var useState = React.useState;

function log(text) {
  var out = document.getElementById('out');
  out.textContent = text;
}

function App() {
  var state = useState(['Завдання А', 'Завдання Б', 'Завдання В']);
  var pool = state[0];
  var setPool = state[1];
  var doneState = useState([]);
  var done = doneState[0];
  var setDone = doneState[1];

  function handleDragStart(ev, item) {
    ev.dataTransfer.setData('text/plain', item);
  }

  function handleDrop(ev) {
    ev.preventDefault();
    var item = ev.dataTransfer.getData('text/plain');
    if (pool.indexOf(item) === -1) return;
    setPool(pool.filter(function (i) { return i !== item; }));
    setDone(done.concat(item));
    log('Перетягнуто "' + item + '" у зону "Виконано"');
  }

  return e('div', null,
    e('h3', null, 'Перетягни завдання в зону нижче'),
    e('div', null, pool.map(function (item) {
      return e('div', {
        key: item, className: 'rx-drag', draggable: true,
        onDragStart: function (ev) { handleDragStart(ev, item); }
      }, item);
    })),
    e('div', {
      className: 'rx-drop',
      onDragOver: function (ev) { ev.preventDefault(); },
      onDrop: handleDrop
    },
      done.length === 0 ? e('em', null, 'Зона для скидання (drop zone)') : done.map(function (item) {
        return e('div', { key: item, className: 'rx-card' }, '✅ ' + item);
      })
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Перетягни всі три завдання у нижню зону мишкою і подивись, як вони переміщуються з "пулу" у "виконано".', ru:'Перетащи все три задачи в нижнюю зону мышью.' },
      { level:'medium', uk:'Додай кнопку "Скинути", що повертає всі завдання назад у <code>pool</code> і очищає <code>done</code>.', ru:'Добавь кнопку "Сбросить", возвращающую все задачи обратно в pool.' },
      { level:'hard',   uk:'Додай ДРУГУ зону скидання "В процесі" (окремий <code>onDrop</code>, окремий масив стану) — перетягнуті завдання повинні потрапляти в ТУ зону, куди їх реально кинули, а не завжди в "Виконано".', ru:'Добавь вторую зону сброса "В процессе" с отдельным состоянием.' },
    ]
  );

  /* ─── 04-09: react-hook-form + Zod ────────────────────────────────── */
  patch('04-09',
    { uk:`<h2>Форми з react-hook-form та Zod-валідацією</h2>
<p><code>react-hook-form</code> керує станом форми через некеровані (uncontrolled) поля й <code>ref</code>, уникаючи зайвих ре-рендерів при кожному натисканні клавіші. <code>Zod</code> описує схему валідації декларативно й генерує зрозумілі помилки.</p>
<h3>Реальний синтаксис (поза пісочницею)</h3>
<pre>import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Некоректний email'),
  age: z.number().min(14, 'Мінімум 14 років')
});

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  function onSubmit(data) { console.log('Валідні дані:', data); }

  return React.createElement('form', { onSubmit: handleSubmit(onSubmit) },
    React.createElement('input', { ...register('email') }),
    errors.email && React.createElement('span', null, errors.email.message)
  );
}</pre>
<h3>Чому саме Zod для схем</h3>
<p>Схема пишеться ОДИН раз і використовується як для валідації форми на клієнті, так і (та сама схема!) для валідації тіла запиту на сервері Express (модуль 05) — TypeScript навіть може вивести тип даних напряму зі схеми через <code>z.infer&lt;typeof schema&gt;</code>.</p>
<h3>DIY-версія в демо нижче</h3>
<p>Оскільки бібліотек тут немає, демо реалізує ідентичний за духом принцип: декларативний об'єкт правил валідації + функція, яка перевіряє дані форми на відповідність цим правилам.</p>`,
      ru:`<h2>Формы с react-hook-form и Zod-валидацией</h2>
<p>react-hook-form управляет состоянием формы через неконтролируемые поля и ref. Zod описывает схему валидации декларативно.</p>
<h3>Реальный синтаксис (вне песочницы)</h3>
<pre>import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Некорректный email'),
  age: z.number().min(14, 'Минимум 14 лет')
});

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  function onSubmit(data) { console.log('Валидные данные:', data); }
}</pre>
<h3>Почему именно Zod для схем</h3>
<p>Схема пишется один раз и используется и для клиента, и для сервера Express (модуль 05).</p>
<h3>DIY-версия в демо ниже</h3>
<p>Демо реализует похожий по духу принцип: декларативный объект правил + функция проверки.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Форма з декларативною валідацією (принцип Zod)';
var e = React.createElement;
var useState = React.useState;

/* Спрощений аналог схеми Zod */
var schema = {
  email: function (value) {
    if (!value) return 'Email обовʼязковий';
    if (value.indexOf('@') === -1) return 'Некоректний email';
    return null;
  },
  age: function (value) {
    var n = Number(value);
    if (!value) return 'Вік обовʼязковий';
    if (isNaN(n) || n < 14) return 'Мінімум 14 років';
    return null;
  }
};

function validate(data) {
  var errors = {};
  Object.keys(schema).forEach(function (key) {
    var error = schema[key](data[key]);
    if (error) errors[key] = error;
  });
  return errors;
}

function App() {
  var formState = useState({ email: '', age: '' });
  var form = formState[0];
  var setForm = formState[1];
  var errorState = useState({});
  var errors = errorState[0];
  var setErrors = errorState[1];
  var submittedState = useState(null);
  var submitted = submittedState[0];
  var setSubmitted = submittedState[1];

  function handleSubmit(ev) {
    ev.preventDefault();
    var validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(form);
    } else {
      setSubmitted(null);
    }
  }

  function updateField(field, value) {
    setForm(Object.assign({}, form, [field].reduce(function (acc, k) { acc[k] = value; return acc; }, {})));
  }

  return e('form', { onSubmit: handleSubmit },
    e('input', { className: 'rx-input', placeholder: 'Email', value: form.email, onChange: function (ev) { updateField('email', ev.target.value); } }),
    errors.email && e('p', { style: { color: '#dc2626' } }, errors.email),
    e('input', { className: 'rx-input', placeholder: 'Вік', value: form.age, onChange: function (ev) { updateField('age', ev.target.value); } }),
    errors.age && e('p', { style: { color: '#dc2626' } }, errors.age),
    e('button', { className: 'rx-btn', type: 'submit' }, 'Відправити'),
    submitted && e('p', { style: { color: '#16a34a' } }, '✅ Валідні дані: ' + JSON.stringify(submitted))
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Спробуй відправити форму з порожніми полями, потім з некоректним email, і нарешті з валідними даними.', ru:'Попробуй отправить форму с пустыми полями, затем с некорректным email, и наконец с валидными данными.' },
      { level:'medium', uk:'Додай у <code>schema</code> третє поле <code>name</code> з правилом "мінімум 2 символи" і відповідне поле вводу у форму.', ru:'Добавь в schema поле name с правилом "минимум 2 символа".' },
      { level:'hard',   uk:'Зроби валідацію email суворішою — правило має перевіряти наявність символу "@" І крапки ПІСЛЯ "@" (простий regex), і виведи більш конкретне повідомлення про помилку для кожного випадку окремо.', ru:'Сделай валидацию email строже — проверка "@" и точки после него — с более конкретными сообщениями об ошибках.' },
    ]
  );

  /* ─── 04-10: Framer Motion ────────────────────────────────────────── */
  patch('04-10',
    { uk:`<h2>Анімації: Framer Motion</h2>
<p>Framer Motion — бібліотека декларативних анімацій для React: замість ручного керування CSS-класами, описуєш "стани" (initial/animate/exit), а бібліотека сама інтерполює значення між ними.</p>
<h3>Реальний синтаксис (поза пісочницею)</h3>
<pre>import { motion, AnimatePresence } from 'framer-motion';

function FadeInBox() {
  return React.createElement(motion.div, {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }, 'Зʼявляється плавно');
}

function List({ items }) {
  return React.createElement(AnimatePresence, null,
    items.map(item => React.createElement(motion.li, {
      key: item.id,
      initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }
    }, item.text))
  ); // AnimatePresence анімує навіть ВИДАЛЕННЯ елементів зі списку
}</pre>
<h3>DIY-версія — CSS transitions + React state (демо нижче)</h3>
<p>Без бібліотеки ту саму ідею "анімувати між станами" можна реалізувати через CSS-клас, що перемикається залежно від стану React, і CSS-властивість <code>transition</code>, яка анімує зміну.</p>
<h3>Ключова відмінність Framer Motion від "просто CSS"</h3>
<p>Framer Motion вміє анімувати ВИХІД елемента з DOM (elements exit animation) — річ, яку чистий CSS <code>transition</code> зробити не може, бо елемент видаляється з DOM миттєво, до завершення transition.</p>`,
      ru:`<h2>Анимации: Framer Motion</h2>
<p>Framer Motion — библиотека декларативных анимаций: вместо ручного управления CSS-классами описываешь "состояния" (initial/animate/exit).</p>
<h3>Реальный синтаксис (вне песочницы)</h3>
<pre>import { motion, AnimatePresence } from 'framer-motion';

function FadeInBox() {
  return React.createElement(motion.div, {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }, 'Появляется плавно');
}</pre>
<h3>DIY-версия — CSS transitions + React state (демо ниже)</h3>
<p>Без библиотеки можно реализовать ту же идею через CSS-класс, переключаемый в зависимости от состояния React.</p>
<h3>Ключевое отличие Framer Motion от "просто CSS"</h3>
<p>Framer Motion умеет анимировать выход элемента из DOM — то, что чистый CSS transition сделать не может.</p>` },
    APP_HTML,
    `${BASE}
.fm-box{padding:16px;background:#61dafb;color:#0f172a;border-radius:10px;transition:opacity .4s, transform .4s;opacity:0;transform:translateY(20px)}
.fm-box.fm-visible{opacity:1;transform:translateY(0)}`,
    `document.getElementById('lesson-h2').textContent = 'CSS-анімація за принципом Framer Motion';
var e = React.createElement;
var useState = React.useState;

function App() {
  var state = useState(false);
  var visible = state[0];
  var setVisible = state[1];

  return e('div', null,
    e('button', { className: 'rx-btn', onClick: function () { setVisible(!visible); } }, visible ? 'Сховати' : 'Показати'),
    e('div', { className: 'fm-box' + (visible ? ' fm-visible' : '') }, 'Ця коробка анімується через opacity + transform')
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));

document.getElementById('out').textContent = 'initial = { opacity: 0, y: 20 } → animate = { opacity: 1, y: 0 }, transition: 0.4s (реалізовано через CSS-клас fm-visible)';`,
    [
      { level:'easy',   uk:'Натисни кнопку кілька разів і подивись на плавну анімацію появи/зникнення коробки.', ru:'Нажми кнопку несколько раз и посмотри на плавную анимацию появления/исчезновения.' },
      { level:'medium', uk:'Зміни тривалість анімації в CSS з 0.4s на 1.2s і додай ефект масштабування (<code>transform: scale(.8)</code> у прихованому стані).', ru:'Измени длительность анимации с 0.4s на 1.2s и добавь эффект масштабирования.' },
      { level:'hard',   uk:'Реалізуй список карток, де кожна нова картка додається з анімацією появи (клас <code>fm-visible</code> додається через невеликий <code>setTimeout</code> ПІСЛЯ монтування, а не одразу) — це імітує <code>initial</code>→<code>animate</code> перехід Framer Motion для елементів, що динамічно додаються.', ru:'Реализуй список карточек, где каждая новая добавляется с анимацией появления через setTimeout после монтирования.' },
    ]
  );

  /* ─── 04-11: Тестування React ─────────────────────────────────────── */
  patch('04-11',
    { uk:`<h2>Тестування React: Jest + React Testing Library</h2>
<p>React Testing Library (RTL) тестує компоненти так, як їх "бачить" користувач — через текст, ролі та доступність, а не через внутрішню структуру компонента чи його state.</p>
<h3>Реальний синтаксис (поза пісочницею)</h3>
<pre>import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('лічильник збільшується при кліку', () => {
  render(&lt;Counter /&gt;);
  const button = screen.getByText('Натисни мене');
  fireEvent.click(button);
  expect(screen.getByText('Рахунок: 1')).toBeInTheDocument();
});</pre>
<h3>Філософія RTL: "тестуй як користувач"</h3>
<p>RTL навмисно НЕ дає легкого доступу до внутрішнього <code>state</code> компонента — тест має перевіряти те, що бачить і робить реальний користувач (текст на екрані, клік по кнопці), а не деталі реалізації, які можуть змінитись при рефакторингу.</p>
<h3>DIY-версія в цій пісочниці</h3>
<p>Демо нижче рендерить справжній React-компонент у справжній DOM, а потім використовує звичайні <code>document.querySelector</code> і симуляцію кліку — той самий принцип "перевіряй DOM, а не внутрішній стан", лише без самої бібліотеки RTL.</p>`,
      ru:`<h2>Тестирование React: Jest + React Testing Library</h2>
<p>React Testing Library (RTL) тестирует компоненты так, как их видит пользователь.</p>
<h3>Реальный синтаксис (вне песочницы)</h3>
<pre>import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('счётчик увеличивается при клике', () => {
  render(&lt;Counter /&gt;);
  const button = screen.getByText('Нажми меня');
  fireEvent.click(button);
  expect(screen.getByText('Счёт: 1')).toBeInTheDocument();
});</pre>
<h3>Философия RTL: "тестируй как пользователь"</h3>
<p>RTL намеренно не даёт лёгкого доступа к внутреннему state — тест должен проверять то, что видит и делает реальный пользователь.</p>
<h3>DIY-версия в этой песочнице</h3>
<p>Демо рендерит настоящий React-компонент в настоящий DOM и использует querySelector и симуляцию клика.</p>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Мінімальний тест у стилі RTL';
var e = React.createElement;
var useState = React.useState;

function log(text, ok) {
  var out = document.getElementById('out');
  out.innerHTML += (out.innerHTML ? '\\n' : '') + (ok === false ? '<span style="color:#f87171">' + text + '</span>' : '<span style="color:#4ade80">' + text + '</span>');
}

function Counter() {
  var state = useState(0);
  var count = state[0];
  var setCount = state[1];
  return e('div', null,
    e('button', { onClick: function () { setCount(count + 1); } }, 'Натисни мене'),
    e('p', null, 'Рахунок: ' + count)
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(Counter));

function runTests() {
  document.getElementById('out').innerHTML = '';
  log('test("лічильник збільшується при кліку")', null);

  var button = Array.from(document.querySelectorAll('button')).find(function (b) { return b.textContent === 'Натисни мене'; });
  if (!button) { log('✕ getByText("Натисни мене") — кнопку не знайдено', false); return; }
  log('✓ screen.getByText("Натисни мене") знайшов кнопку', true);

  button.click();
  button.click();

  setTimeout(function () {
    var p = Array.from(document.querySelectorAll('p')).find(function (el) { return el.textContent.indexOf('Рахунок: 2') !== -1; });
    if (p) { log('✓ Після двох кліків знайдено текст "Рахунок: 2"', true); }
    else { log('✕ Текст "Рахунок: 2" не знайдено', false); }
  }, 50);
}

var runBtn = document.createElement('button');
runBtn.className = 'rx-btn';
runBtn.textContent = '▶ Запустити тест';
runBtn.onclick = runTests;
document.getElementById('app').appendChild(runBtn);`,
    [
      { level:'easy',   uk:'Натисни "▶ Запустити тест" і подивись, як тест перевіряє поведінку компонента через реальний DOM, а не внутрішній state.', ru:'Нажми "▶ Запустить тест" и посмотри, как тест проверяет поведение через реальный DOM.' },
      { level:'medium', uk:'Зміни тест так, щоб він клікав ТРИЧІ замість двічі, і перевіряв "Рахунок: 3".', ru:'Измени тест так, чтобы он кликал трижды и проверял "Счёт: 3".' },
      { level:'hard',   uk:'Додай другий тест-функцію <code>testInitialState()</code>, що перевіряє: одразу після рендеру (до будь-яких кліків) текст має бути "Рахунок: 0" — виклич обидва тести і виведи два окремі результати.', ru:'Добавь второй тест testInitialState(), проверяющий начальное состояние "Счёт: 0".' },
    ]
  );

  /* ─── 04-12: Storybook ───────────────────────────────────────────── */
  patch('04-12',
    { uk:`<h2>Storybook: документування та ізоляція компонентів</h2>
<p>Storybook — інструмент для розробки й показу компонентів ІЗОЛЬОВАНО від решти застосунку — кожен "story" показує один компонент в одному конкретному стані (наприклад, кнопка: default/hover/disabled/loading), без потреби запускати весь застосунок.</p>
<h3>Реальний синтаксис (поза пісочницею)</h3>
<pre>// Button.stories.js
export default { component: Button };

export const Primary = { args: { variant: 'primary', children: 'Зберегти' } };
export const Disabled = { args: { variant: 'primary', children: 'Зберегти', disabled: true } };
export const Loading = { args: { variant: 'primary', children: 'Завантаження...', loading: true } };</pre>
<h3>Навіщо це потрібно команді</h3>
<p>Дизайнер і розробник можуть побачити ВСІ можливі стани компонента одночасно (галерея), не клікаючи вручну по застосунку, щоб довести кнопку до стану "disabled" чи "помилка". Це також слугує живою документацією UI-бібліотеки.</p>
<h3>DIY-галерея станів (демо нижче)</h3>
<p>Реалізовано спрощений аналог: один компонент <code>Button</code>, показаний одразу в кількох "stories" (варіантах пропсів) поруч, як у справжньому Storybook.</p>`,
      ru:`<h2>Storybook: документирование и изоляция компонентов</h2>
<p>Storybook — инструмент для разработки и показа компонентов изолированно — каждый "story" показывает один компонент в одном конкретном состоянии.</p>
<h3>Реальный синтаксис (вне песочницы)</h3>
<pre>// Button.stories.js
export default { component: Button };

export const Primary = { args: { variant: 'primary', children: 'Сохранить' } };
export const Disabled = { args: { variant: 'primary', children: 'Сохранить', disabled: true } };
export const Loading = { args: { variant: 'primary', children: 'Загрузка...', loading: true } };</pre>
<h3>Зачем это нужно команде</h3>
<p>Дизайнер и разработчик видят ВСЕ возможные состояния компонента одновременно.</p>
<h3>DIY-галерея состояний (демо ниже)</h3>
<p>Реализован упрощённый аналог: один компонент Button, показанный сразу в нескольких "историях".</p>` },
    APP_HTML,
    `${BASE}
.story-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px}
.story-item{border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center}
.story-label{font-size:11px;color:#64748b;margin-bottom:8px}`,
    `document.getElementById('lesson-h2').textContent = 'Storybook-подібна галерея станів кнопки';
var e = React.createElement;

function Button(props) {
  var style = {
    padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', cursor: props.disabled ? 'not-allowed' : 'pointer',
    background: props.disabled ? '#cbd5e1' : (props.variant === 'danger' ? '#ef4444' : '#61dafb'),
    color: props.disabled ? '#64748b' : '#0f172a',
    opacity: props.loading ? 0.6 : 1
  };
  return e('button', { style: style, disabled: props.disabled || props.loading },
    props.loading ? '⏳ ' + props.children : props.children
  );
}

var stories = [
  { label: 'Primary', props: { variant: 'primary', children: 'Зберегти' } },
  { label: 'Disabled', props: { variant: 'primary', children: 'Зберегти', disabled: true } },
  { label: 'Loading', props: { variant: 'primary', children: 'Зберегти', loading: true } },
  { label: 'Danger', props: { variant: 'danger', children: 'Видалити' } }
];

function StoryGallery() {
  return e('div', { className: 'story-grid' }, stories.map(function (story) {
    return e('div', { key: story.label, className: 'story-item' },
      e('div', { className: 'story-label' }, story.label),
      e(Button, story.props)
    );
  }));
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(StoryGallery));`,
    [
      { level:'easy',   uk:'Подивись на всі чотири "історії" одного й того самого компонента <code>Button</code> одночасно — саме так це виглядає в реальному Storybook.', ru:'Посмотри на все четыре "истории" одного компонента Button одновременно.' },
      { level:'medium', uk:'Додай пʼяту story <code>\'Small\'</code> з новим пропом <code>size: \'small\'</code>, що зменшує <code>padding</code> та <code>font-size</code> кнопки.', ru:'Добавь пятую story \'Small\' с пропом size: \'small\'.' },
      { level:'hard',   uk:'Створи ДРУГИЙ компонент <code>Badge({ text, color })</code> і додай для нього окрему секцію з 3 власними stories (наприклад "Success", "Warning", "Error") у ту саму галерею, розділивши секції заголовками.', ru:'Создай второй компонент Badge и добавь для него отдельную секцию с 3 своими stories.' },
    ]
  );

  /* ─── 04-13: TypeScript + React ───────────────────────────────────── */
  patch('04-13',
    { uk:`<h2>TypeScript + React: типізація props, hooks та context</h2>
<p>Поєднуємо модуль 02 (TypeScript) із React: типізація робить компоненти самодокументованими — редактор одразу підкаже, які props очікує компонент і якого вони типу.</p>
<h3>Типізація props через interface</h3>
<pre>interface ButtonProps {
  variant: 'primary' | 'danger';
  children: string;
  onClick?: () => void; // необовʼязковий проп
}

function Button({ variant, children, onClick }: ButtonProps) {
  return React.createElement('button', { className: variant, onClick }, children);
}</pre>
<h3>Типізація useState через generics</h3>
<pre>const [user, setUser] = React.useState<User | null>(null); // явно кажемо: або User, або null
const [items, setItems] = React.useState<string[]>([]);    // масив рядків, навіть якщо спершу порожній</pre>
<h3>Типізація Context</h3>
<pre>interface ThemeContextValue { theme: 'light' | 'dark'; toggle: () => void; }
const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme має використовуватись усередині ThemeProvider');
  return context; // TS знає, що тут context НЕ undefined завдяки перевірці вище
}</pre>
<h3>Типізація власних хуків</h3>
<pre>function useCounter(initial: number): [number, () => void] {
  const [count, setCount] = React.useState(initial);
  const increment = () => setCount(c => c + 1);
  return [count, increment];
}</pre>`,
      ru:`<h2>TypeScript + React: типизация props, hooks и context</h2>
<p>Объединяем модуль 02 (TypeScript) с React: типизация делает компоненты самодокументированными.</p>
<h3>Типизация props через interface</h3>
<pre>interface ButtonProps {
  variant: 'primary' | 'danger';
  children: string;
  onClick?: () => void;
}

function Button({ variant, children, onClick }: ButtonProps) {
  return React.createElement('button', { className: variant, onClick }, children);
}</pre>
<h3>Типизация useState через generics</h3>
<pre>const [user, setUser] = React.useState<User | null>(null);
const [items, setItems] = React.useState<string[]>([]);</pre>
<h3>Типизация Context</h3>
<pre>interface ThemeContextValue { theme: 'light' | 'dark'; toggle: () => void; }
const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme должен использоваться внутри ThemeProvider');
  return context;
}</pre>
<h3>Типизация собственных хуков</h3>
<pre>function useCounter(initial: number): [number, () => void] {
  const [count, setCount] = React.useState(initial);
  const increment = () => setCount(c => c + 1);
  return [count, increment];
}</pre>` },
    `<h2 id="lesson-h2"></h2>
${TS_CDN}
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Компіляція типізованого React-коду (без JSX)';
function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span style="color:' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

var source =
  'interface CounterProps {\\n' +
  '  initial: number;\\n' +
  '  label: string;\\n' +
  '}\\n' +
  '\\n' +
  'function useTypedCounter(initial: number): [number, () => void] {\\n' +
  '  let count = initial;\\n' +
  '  function increment(): void { count = count + 1; console.log("count тепер: " + count); }\\n' +
  '  return [count, increment];\\n' +
  '}\\n' +
  '\\n' +
  'const result = useTypedCounter(0);\\n' +
  'const increment = result[1];\\n' +
  'increment();\\n' +
  'increment();\\n' +
  'console.log("Готово: типізована функція-хук відпрацювала без помилок компіляції.");';

log('Вихідний TypeScript (interface CounterProps + типізований кастомний хук):', '#64748b');
log(source, '#7dd3fc');

var result = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2017, strict: true } });

log('', '');
log('Скомпільований JavaScript:', '#64748b');
log(result.outputText, '#4ade80');

log('', '');
log('Виконання:', '#64748b');
eval(result.outputText);`,
    [
      { level:'easy',   uk:'Подивись, як типи (<code>interface</code>, <code>number</code>, <code>void</code>) повністю зникають при компіляції в звичайний JS — вони існують лише для перевірки під час розробки.', ru:'Посмотри, как типы полностью исчезают при компиляции в обычный JS.' },
      { level:'medium', uk:'Додай у <code>source</code> функцію <code>function formatCount(count: number): string { return "Рахунок: " + count; }</code> і виклич її після <code>increment()</code>.', ru:'Добавь функцию formatCount(count: number): string и вызови её.' },
      { level:'hard',   uk:'Створи типізований union <code>type Status = "idle" | "loading" | "done";</code> і функцію <code>function describe(status: Status): string</code> із <code>switch</code> для кожного варіанта — виклич її для всіх трьох значень.', ru:'Создай union type Status и функцию describe(status: Status): string со switch для каждого варианта.' },
    ]
  );

  /* ─── 04-14: ФІНАЛ — React Dashboard з TypeScript та Zustand ─────── */
  patch('04-14',
    { uk:`<h2>ПРОЕКТ: React Dashboard з TypeScript та Zustand</h2>
<p>Фінальний проект модуля — панель керування задачами з лічильниками статистики, що поєднує все вивчене: Context, useReducer/Zustand-подібний store, memo, кастомні хуки, і типізовані структури даних (задокументовані як TypeScript-interface).</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ Zustand-подібний <code>store</code> для списку задач (з модуля 04-03)</li>
  <li>✅ <code>useReducer</code> для статистики (виконано/у процесі/усього)</li>
  <li>✅ <code>React.memo</code> для карток статистики (не рендеряться при додаванні задач, якщо їхні числа не змінились)</li>
  <li>✅ Типи даних, задокументовані як TypeScript-<code>interface Task</code></li>
</ul>
<h3>Тип даних (TypeScript, для довідки)</h3>
<pre>interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
}</pre>`,
      ru:`<h2>ПРОЕКТ: React Dashboard с TypeScript и Zustand</h2>
<p>Финальный проект модуля — панель управления задачами со статистикой, объединяющая всё изученное.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ Zustand-подобный store для списка задач</li>
  <li>✅ useReducer для статистики</li>
  <li>✅ React.memo для карточек статистики</li>
  <li>✅ Типы данных, задокументированные как TypeScript interface Task</li>
</ul>
<h3>Тип данных (TypeScript, для справки)</h3>
<pre>interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
}</pre>` },
    APP_HTML,
    `${BASE}`,
    `document.getElementById('lesson-h2').textContent = 'Dashboard задач — фінальний проект модуля';
var e = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;
var useReducer = React.useReducer;
var memo = React.memo;

/* interface Task { id: number; title: string; done: boolean; priority: 'low'|'medium'|'high'; } */

function createStore(initializer) {
  var state = {};
  var listeners = [];
  function setState(partial) {
    var next = typeof partial === 'function' ? partial(state) : partial;
    state = Object.assign({}, state, next);
    listeners.forEach(function (l) { l(state); });
  }
  function getState() { return state; }
  function subscribe(listener) {
    listeners.push(listener);
    return function () { listeners = listeners.filter(function (l) { return l !== listener; }); };
  }
  state = initializer(setState, getState);
  return { getState: getState, setState: setState, subscribe: subscribe };
}

function useStore(store) {
  var stateHolder = useState(store.getState());
  var value = stateHolder[0];
  var setValue = stateHolder[1];
  useEffect(function () {
    return store.subscribe(function (s) { setValue(s); });
  }, [store]);
  return value;
}

var taskStore = createStore(function (set) {
  return {
    tasks: [
      { id: 1, title: 'Налаштувати проект', done: true, priority: 'high' },
      { id: 2, title: 'Написати компоненти', done: false, priority: 'medium' },
      { id: 3, title: 'Додати тести', done: false, priority: 'low' }
    ],
    toggleTask: function (id) {
      set(function (state) {
        return { tasks: state.tasks.map(function (t) { return t.id === id ? Object.assign({}, t, { done: !t.done }) : t; }) };
      });
    },
    addTask: function (title) {
      set(function (state) {
        var newId = Math.max.apply(null, state.tasks.map(function (t) { return t.id; }).concat(0)) + 1;
        return { tasks: state.tasks.concat({ id: newId, title: title, done: false, priority: 'medium' }) };
      });
    }
  };
});

function statsReducer(state, action) {
  switch (action.type) {
    case 'recalculate':
      return { total: action.tasks.length, done: action.tasks.filter(function (t) { return t.done; }).length };
    default: return state;
  }
}

var StatCard = memo(function (props) {
  return e('div', { className: 'rx-card' }, e('strong', null, props.value), ' ' + props.label);
});

function StatsBar(props) {
  var stats = props.stats;
  return e('div', { className: 'btn-row' },
    e(StatCard, { label: 'усього задач', value: stats.total }),
    e(StatCard, { label: 'виконано', value: stats.done })
  );
}

function TaskList() {
  var state = useStore(taskStore);
  return e('ul', null, state.tasks.map(function (task) {
    return e('li', { key: task.id },
      e('label', null,
        e('input', { type: 'checkbox', checked: task.done, onChange: function () { taskStore.getState().toggleTask(task.id); } }),
        ' ' + task.title + ' [' + task.priority + ']'
      )
    );
  }));
}

function App() {
  var state = useStore(taskStore);
  var reducerState = useReducer(statsReducer, { total: 0, done: 0 });
  var stats = reducerState[0];
  var dispatch = reducerState[1];
  var inputState = useState('');
  var newTitle = inputState[0];
  var setNewTitle = inputState[1];

  useEffect(function () {
    dispatch({ type: 'recalculate', tasks: state.tasks });
  }, [state.tasks]);

  function handleAdd() {
    if (!newTitle.trim()) return;
    taskStore.getState().addTask(newTitle);
    setNewTitle('');
  }

  return e('div', null,
    e(StatsBar, { stats: stats }),
    e(TaskList),
    e('div', { className: 'btn-row' },
      e('input', { className: 'rx-input', value: newTitle, placeholder: 'Нова задача...', onChange: function (ev) { setNewTitle(ev.target.value); } }),
      e('button', { className: 'rx-btn', onClick: handleAdd }, 'Додати')
    )
  );
}

var root = ReactDOM.createRoot(document.getElementById('app'));
root.render(e(App));`,
    [
      { level:'easy',   uk:'Познач кілька задач виконаними й додай нову — подивись, як статистика (useReducer) автоматично перераховується щоразу, коли змінюється store.', ru:'Отметь несколько задач выполненными и добавь новую — посмотри, как статистика автоматически пересчитывается.' },
      { level:'medium', uk:'Додай у форму додавання задачі вибір пріоритету (<code>select</code> з low/medium/high) замість завжди <code>\'medium\'</code>.', ru:'Добавь в форму добавления задачи выбор приоритета вместо всегда \'medium\'.' },
      { level:'hard',   uk:'Додай третю статистику "у процесі" (total - done) через <code>statsReducer</code> і третій <code>StatCard</code>, а також кнопку "Видалити виконані", що прибирає з <code>taskStore</code> усі задачі з <code>done: true</code>.', ru:'Добавь третью статистику "в процессе" и кнопку "Удалить выполненные".' },
    ]
  );

})();
