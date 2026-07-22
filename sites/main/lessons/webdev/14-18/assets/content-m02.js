/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 02 — TypeScript · 14–18
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
body{font-family:'JetBrains Mono',Consolas,'Segoe UI',monospace;background:#0b1120;color:#e2e8f0;padding:20px}
h2{font-family:'Segoe UI',Arial,sans-serif;font-size:18px;font-weight:700;margin-bottom:12px;color:#fff}
h3{font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:#64748b;margin-bottom:8px;letter-spacing:.04em;text-transform:uppercase}
p{font-family:'Segoe UI',Arial,sans-serif;font-size:13px;color:#94a3b8;line-height:1.6;margin-bottom:8px}
button{background:#1e293b;border:1px solid #334155;color:#e2e8f0;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-family:inherit;transition:.2s}
button:hover{border-color:#3b82f6;color:#93c5fd}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:Consolas,monospace;font-size:12px;color:#7dd3fc}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.console{background:#000;border:1px solid #334155;border-radius:10px;padding:14px;font-family:Consolas,monospace;font-size:12.5px;color:#a3e635;min-height:100px;max-height:340px;overflow-y:auto;white-space:pre-wrap;line-height:1.7;margin-top:10px}
.c-ok{color:#4ade80}
.c-err{color:#f87171}
.c-warn{color:#facc15}
.c-dim{color:#64748b}
.c-ts{color:#60a5fa}`;

  /* CDN TypeScript compiler — потрібен у кожному уроці, де відбувається реальна компіляція */
  const TS_CDN = '<script src="https://cdnjs.cloudflare.com/ajax/libs/typescript/5.4.5/typescript.min.js"><\/script>';

  /* ─── 02-01: TypeScript — навіщо, встановлення, tsconfig.json ─── */
  patch('02-01',
    { uk:`<h2>TypeScript: навіщо, встановлення, tsconfig.json</h2>
<p>TypeScript — це JavaScript із доданою системою <strong>статичних типів</strong>. Код на TS ніколи не виконується напряму: компілятор <code>tsc</code> перетворює його на звичайний JS, попередньо перевіряючи типи й ловлячи цілий клас помилок ще до запуску.</p>
<h3>Навіщо це потрібно на практиці</h3>
<pre>function getDiscount(price, isMember) {
  return isMember ? price * 0.9 : price;
}
getDiscount("100", true); // JS мовчки поверне "10010" — рядок!
                          // TS покаже помилку ще на етапі написання коду</pre>
<h3>Встановлення (поза цією пісочницею)</h3>
<pre>npm install -D typescript
npx tsc --init   // створює tsconfig.json</pre>
<h3>tsconfig.json — основні опції</h3>
<pre>{
  "compilerOptions": {
    "target": "ES2020",       // на яку версію JS компілювати
    "strict": true,           // увімкнути всі суворі перевірки типів
    "module": "ESNext",
    "outDir": "./dist",
    "noImplicitAny": true     // забороняє неявний тип 'any'
  }
}</pre>
<h3>Компіляція та запуск у цій пісочниці</h3>
<p>Node.js тут немає, тож справжній <code>tsc</code> з командного рядка не запустити. Але нижче підключений <strong>реальний компілятор TypeScript</strong> (той самий, що працює в <code>tsc</code>) прямо в браузері через <code>ts.transpileModule()</code> — це не імітація, а справжня компіляція TS → JS з перевіркою типів.</p>`,
      ru:`<h2>TypeScript: зачем, установка, tsconfig.json</h2>
<p>TypeScript — это JavaScript с добавленной системой <strong>статических типов</strong>. Код на TS никогда не выполняется напрямую: компилятор tsc превращает его в обычный JS, предварительно проверяя типы.</p>
<h3>Зачем это нужно на практике</h3>
<pre>function getDiscount(price, isMember) {
  return isMember ? price * 0.9 : price;
}
getDiscount("100", true); // JS молча вернёт "10010" — строку!
                          // TS покажет ошибку ещё на этапе написания кода</pre>
<h3>Установка (вне этой песочницы)</h3>
<pre>npm install -D typescript
npx tsc --init</pre>
<h3>tsconfig.json — основные опции</h3>
<pre>{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "module": "ESNext",
    "outDir": "./dist",
    "noImplicitAny": true
  }
}</pre>
<h3>Компиляция и запуск в этой песочнице</h3>
<p>Node.js здесь нет, поэтому настоящий tsc из командной строки не запустить. Но ниже подключён <strong>реальный компилятор TypeScript</strong> прямо в браузере через ts.transpileModule() — это не имитация, а настоящая компиляция TS → JS с проверкой типов.</p>` },
    `<h2>Перша компіляція TS → JS</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testCompile()">Скомпілювати рядок TS-коду</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function testCompile() {
  var source = 'function getDiscount(price: number, isMember: boolean): number {\\n' +
    '  return isMember ? price * 0.9 : price;\\n' +
    '}\\n' +
    'console.log(getDiscount(100, true));';

  log('Вихідний TypeScript-код:', 'c-dim');
  log(source, 'c-ts');

  var result = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2017, strict: true }
  });

  log('', '');
  log('Скомпільований JavaScript (реальний ts.transpileModule):', 'c-dim');
  log(result.outputText, 'c-ok');

  try {
    eval(result.outputText);
  } catch (e) {
    log('Помилка виконання: ' + e.message, 'c-err');
  }
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись, як реальний TypeScript-компілятор перетворює типізований код на звичайний JS.', ru:'Нажми кнопку и посмотри, как реальный компилятор TypeScript превращает типизированный код в обычный JS.' },
      { level:'medium', uk:'Зміни виклик у рядку <code>source</code> на <code>getDiscount("100", true)</code> (рядок замість числа) — зверни увагу, що <code>transpileModule</code> у single-file режимі НЕ завжди ловить цю помилку (на відміну від повного <code>tsc</code>), і поясни своїми словами різницю.', ru:'Измени вызов на getDiscount("100", true) и объясни разницу с полным tsc.' },
      { level:'hard',   uk:'Додай у <code>source</code> другу функцію <code>function double(n: number): number { return n * 2; }</code> і виклич <code>console.log(double(21))</code> одразу після першого виклику.', ru:'Добавь вторую функцию double(n: number): number и вызови её.' },
    ]
  );

  /* ─── 02-02: Базові типи ─────────────────────────────────────────── */
  patch('02-02',
    { uk:`<h2>Базові типи: string, number, boolean, union, intersection</h2>
<h3>Прості типи</h3>
<pre>let age: number = 15;
let name: string = "Аліна";
let isStudent: boolean = true;
let scores: number[] = [90, 85, 100];
let tuple: [string, number] = ["Марко", 16]; // фіксована структура</pre>
<h3>Union types (|) — "або те, або те"</h3>
<pre>function formatId(id: string | number): string {
  return "ID-" + id;
}
formatId(42);      // OK
formatId("42");    // OK
formatId(true);    // Помилка компіляції: boolean не входить в union</pre>
<h3>Intersection types (&) — "і те, і те одночасно"</h3>
<pre>type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge; // повинен мати ОБИДВІ властивості

const p: Person = { name: "Кіра", age: 15 }; // OK
const bad: Person = { name: "Кіра" };        // Помилка: бракує age</pre>
<h3>literal-типи для точних значень</h3>
<pre>type Direction = "up" | "down" | "left" | "right"; // тільки ці 4 рядки і жодні інші
function move(dir: Direction) { /* ... */ }
move("up");       // OK
move("diagonal"); // Помилка компіляції</pre>`,
      ru:`<h2>Базовые типы: string, number, boolean, union, intersection</h2>
<h3>Простые типы</h3>
<pre>let age: number = 15;
let name: string = "Алина";
let isStudent: boolean = true;
let scores: number[] = [90, 85, 100];
let tuple: [string, number] = ["Марк", 16];</pre>
<h3>Union types (|) — "или то, или то"</h3>
<pre>function formatId(id: string | number): string {
  return "ID-" + id;
}
formatId(42);
formatId("42");
formatId(true); // Ошибка компиляции</pre>
<h3>Intersection types (&) — "и то, и то одновременно"</h3>
<pre>type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const p: Person = { name: "Кира", age: 15 }; // OK
const bad: Person = { name: "Кира" };        // Ошибка</pre>
<h3>literal-типы для точных значений</h3>
<pre>type Direction = "up" | "down" | "left" | "right";
function move(dir: Direction) { }
move("up");
move("diagonal"); // Ошибка компиляции</pre>` },
    `<h2>Union та Intersection типи</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testUnion()">Union: string | number</button>
  <button onclick="testIntersection()">Intersection: HasName & HasAge</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function compile(source) {
  var result = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2017, strict: true }
  });
  if (result.diagnostics && result.diagnostics.length) {
    result.diagnostics.forEach(function (d) {
      log('  TS-діагностика: ' + ts.flattenDiagnosticMessageText(d.messageText, ' '), 'c-warn');
    });
  }
  return result.outputText;
}

function testUnion() {
  var source = 'function formatId(id: string | number): string {\\n' +
    '  return "ID-" + id;\\n' +
    '}\\n' +
    'console.log(formatId(42));\\n' +
    'console.log(formatId("42"));';
  log('Union type: string | number', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testIntersection() {
  var source = 'type HasName = { name: string };\\n' +
    'type HasAge = { age: number };\\n' +
    'type Person = HasName & HasAge;\\n' +
    'const p: Person = { name: "Кіра", age: 15 };\\n' +
    'console.log(JSON.stringify(p));';
  log('Intersection type: HasName & HasAge', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і подивись на скомпільований JS та результат виконання.', ru:'Нажми обе кнопки и посмотри на скомпилированный JS и результат выполнения.' },
      { level:'medium', uk:'У <code>testUnion()</code> додай третій виклик <code>formatId(true)</code> — подивись, чи компілятор його пропускає у режимі однофайлового транспайлу.', ru:'Добавь вызов formatId(true) и проверь поведение компилятора.' },
      { level:'hard',   uk:'У <code>testIntersection()</code> додай третій тип <code>type HasCity = { city: string };</code> і створи <code>type FullPerson = HasName & HasAge & HasCity;</code> — виведи об\'єкт з усіма трьома полями.', ru:'Добавь третий тип HasCity и создай FullPerson = HasName & HasAge & HasCity.' },
    ]
  );

  /* ─── 02-03: Type aliases vs interfaces ──────────────────────────── */
  patch('02-03',
    { uk:`<h2>Type aliases та interfaces: в чому різниця?</h2>
<h3>Обидва описують форму об'єкта</h3>
<pre>type UserType = { name: string; age: number };
interface UserInterface { name: string; age: number; }</pre>
<h3>Головні відмінності</h3>
<p><strong>interface</strong> можна "доповнювати" повторним оголошенням (declaration merging), а <strong>type</strong> — ні:</p>
<pre>interface Window { myGlobal: string; } // можна оголосити ще раз і додати поле
interface Window { anotherField: number; } // об'єднається з попереднім автоматично

type Config = { debug: boolean };
type Config = { verbose: boolean }; // Помилка: Duplicate identifier 'Config'</pre>
<p><strong>type</strong> вміє те, чого не вміє interface — union, intersection, primitives, tuples:</p>
<pre>type ID = string | number;      // interface так не може
type Point = [number, number];  // кортеж</pre>
<h3>Практичне правило</h3>
<p>Для об'єктів/класів, які можуть розширюватись іншими розробниками (публічні API, бібліотеки) — частіше обирають <code>interface</code>. Для union-типів, кортежів і складних комбінацій — обирають <code>type</code>. В командних проектах зазвичай є домовленість, якого стилю дотримуватись.</p>`,
      ru:`<h2>Type aliases и interfaces: в чём разница?</h2>
<h3>Оба описывают форму объекта</h3>
<pre>type UserType = { name: string; age: number };
interface UserInterface { name: string; age: number; }</pre>
<h3>Главные отличия</h3>
<p>interface можно "дополнять" повторным объявлением (declaration merging), а type — нет:</p>
<pre>interface Window { myGlobal: string; }
interface Window { anotherField: number; } // объединится автоматически

type Config = { debug: boolean };
type Config = { verbose: boolean }; // Ошибка: Duplicate identifier</pre>
<p>type умеет то, чего не умеет interface — union, intersection, primitives, tuples:</p>
<pre>type ID = string | number;
type Point = [number, number];</pre>
<h3>Практическое правило</h3>
<p>Для объектов/классов, которые могут расширяться — чаще выбирают interface. Для union-типов и сложных комбинаций — type.</p>` },
    `<h2>type vs interface</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testMerging()">Declaration merging (interface)</button>
  <button onclick="testUnionType()">type для union (interface так не вміє)</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function compile(source) {
  var result = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2017 } });
  return result.outputText;
}

function testMerging() {
  var source = 'interface Config { debug: boolean; }\\n' +
    'interface Config { verbose: boolean; }\\n' +
    'const cfg: Config = { debug: true, verbose: false };\\n' +
    'console.log(JSON.stringify(cfg));';
  log('interface Config оголошено ДВІЧІ — об\\'єднається автоматично', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testUnionType() {
  var source = 'type ID = string | number;\\n' +
    'function printId(id: ID) { console.log("ID = " + id); }\\n' +
    'printId(101);\\n' +
    'printId("abc-101");';
  log('type ID = string | number; (interface так не може)', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і подивись на результат обох підходів.', ru:'Нажми обе кнопки и посмотри на результат обоих подходов.' },
      { level:'medium', uk:'Додай у <code>testMerging()</code> третє оголошення <code>interface Config { locale: string; }</code> і додай поле <code>locale</code> в об\'єкт <code>cfg</code>.', ru:'Добавь третье объявление interface Config { locale: string; }.' },
      { level:'hard',   uk:'У <code>testUnionType()</code> створи <code>type Point = [number, number];</code> (кортеж) і виведи через <code>console.log</code> точку <code>[10, 20]</code> з поясненням, що це не звичайний масив, а фіксована структура.', ru:'Создай type Point = [number, number] и выведи точку [10, 20].' },
    ]
  );

  /* ─── 02-04: Generics ────────────────────────────────────────────── */
  patch('02-04',
    { uk:`<h2>Generics: функції, інтерфейси та класи з параметрами типів</h2>
<p>Generics дозволяють писати код, що працює з <strong>будь-яким типом</strong>, зберігаючи при цьому перевірку типів (на відміну від <code>any</code>, який просто вимикає перевірку).</p>
<h3>Проблема без generics</h3>
<pre>function firstElement(arr: any[]): any {
  return arr[0];
}
const num = firstElement([1, 2, 3]);   // тип num стає 'any' — втрачена інформація</pre>
<h3>Рішення через generic-параметр &lt;T&gt;</h3>
<pre>function firstElement<T>(arr: T[]): T {
  return arr[0];
}
const num = firstElement([1, 2, 3]);       // TS сам виводить T = number
const str = firstElement(["a", "b"]);      // T = string, тип збережено!</pre>
<h3>Generic-інтерфейси</h3>
<pre>interface Box<T> {
  value: T;
}
const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "текст" };</pre>
<h3>Обмеження generic-типів (constraints)</h3>
<pre>function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
getLength("hello");    // OK, у рядка є length
getLength([1, 2, 3]);  // OK, у масиву є length
getLength(42);          // Помилка: у числа немає length</pre>`,
      ru:`<h2>Generics: функции, интерфейсы и классы с параметрами типов</h2>
<p>Generics позволяют писать код, работающий с любым типом, сохраняя проверку типов (в отличие от any).</p>
<h3>Проблема без generics</h3>
<pre>function firstElement(arr: any[]): any {
  return arr[0];
}
const num = firstElement([1, 2, 3]); // тип num становится 'any'</pre>
<h3>Решение через generic-параметр &lt;T&gt;</h3>
<pre>function firstElement<T>(arr: T[]): T {
  return arr[0];
}
const num = firstElement([1, 2, 3]);
const str = firstElement(["a", "b"]); // тип сохранён!</pre>
<h3>Generic-интерфейсы</h3>
<pre>interface Box<T> {
  value: T;
}
const numberBox: Box<number> = { value: 42 };</pre>
<h3>Ограничения generic-типов (constraints)</h3>
<pre>function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
getLength("hello");
getLength(42); // Ошибка: у числа нет length</pre>` },
    `<h2>Generics у дії</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testGenericFn()">firstElement&lt;T&gt;</button>
  <button onclick="testGenericBox()">Box&lt;T&gt;</button>
  <button onclick="testConstraint()">extends { length: number }</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function compile(source) {
  return ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2017 } }).outputText;
}

function testGenericFn() {
  var source = 'function firstElement<T>(arr: T[]): T {\\n' +
    '  return arr[0];\\n' +
    '}\\n' +
    'console.log(firstElement([1, 2, 3]));\\n' +
    'console.log(firstElement(["a", "b", "c"]));';
  log('function firstElement<T>(arr: T[]): T {...}', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testGenericBox() {
  var source = 'interface Box<T> { value: T; }\\n' +
    'const numberBox: Box<number> = { value: 42 };\\n' +
    'const stringBox: Box<string> = { value: "текст" };\\n' +
    'console.log(numberBox.value, stringBox.value);';
  log('interface Box<T> { value: T; }', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testConstraint() {
  var source = 'function getLength<T extends { length: number }>(item: T): number {\\n' +
    '  return item.length;\\n' +
    '}\\n' +
    'console.log(getLength("hello"));\\n' +
    'console.log(getLength([1, 2, 3, 4]));';
  log('function getLength<T extends {length:number}>(item: T): number', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і подивись, як параметр <code>&lt;T&gt;</code> зникає при компіляції в JS (типи існують лише "на папері", під час компіляції).', ru:'Нажми все три кнопки и посмотри, как параметр <T> исчезает при компиляции.' },
      { level:'medium', uk:'У <code>testGenericBox()</code> додай третій <code>Box&lt;boolean&gt;</code> зі значенням <code>true</code> і виведи його.', ru:'Добавь третий Box<boolean> со значением true.' },
      { level:'hard',   uk:'Напиши нову функцію <code>function pair&lt;A, B&gt;(a: A, b: B): [A, B] { return [a, b]; }</code> з ДВОМА generic-параметрами і виклич <code>pair(1, "один")</code> у новому тесті.', ru:'Напиши функцию pair<A, B> с двумя generic-параметрами.' },
    ]
  );

  /* ─── 02-05: Enums, literal types, template literal types ────────── */
  patch('02-05',
    { uk:`<h2>Enums, literal types та template literal types</h2>
<h3>Enum — іменований набір констант</h3>
<pre>enum Role { Admin, Moderator, User }
const myRole: Role = Role.Admin;
console.log(myRole); // 0 — за замовчуванням enum нумерується з нуля</pre>
<h3>String enum — коли важливе саме значення, а не індекс</h3>
<pre>enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Banned = "BANNED"
}
console.log(Status.Active); // "ACTIVE", а не 0</pre>
<h3>Literal types — альтернатива enum для простих випадків</h3>
<pre>type Theme = "light" | "dark" | "system";
let current: Theme = "dark";
current = "blue"; // Помилка компіляції — "blue" не входить в дозволені значення</pre>
<h3>Template literal types (ES2022+ / TS 4.1+)</h3>
<p>Дозволяють будувати типи-рядки за шаблоном, як звичайні template literals, але на рівні типів:</p>
<pre>type Lang = "uk" | "ru" | "en";
type LocaleKey = \`greeting_${'$'}{Lang}\`;
// LocaleKey = "greeting_uk" | "greeting_ru" | "greeting_en"

type EventName<T extends string> = \`on${'$'}{Capitalize<T>}\`;
type ClickEvent = EventName<"click">; // "onClick"</pre>`,
      ru:`<h2>Enums, literal types и template literal types</h2>
<h3>Enum — именованный набор констант</h3>
<pre>enum Role { Admin, Moderator, User }
const myRole: Role = Role.Admin;
console.log(myRole); // 0</pre>
<h3>String enum — когда важно само значение, а не индекс</h3>
<pre>enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Banned = "BANNED"
}
console.log(Status.Active); // "ACTIVE"</pre>
<h3>Literal types — альтернатива enum для простых случаев</h3>
<pre>type Theme = "light" | "dark" | "system";
let current: Theme = "dark";
current = "blue"; // Ошибка компиляции</pre>
<h3>Template literal types (TS 4.1+)</h3>
<pre>type Lang = "uk" | "ru" | "en";
type LocaleKey = \`greeting_${'$'}{Lang}\`;

type EventName<T extends string> = \`on${'$'}{Capitalize<T>}\`;
type ClickEvent = EventName<"click">; // "onClick"</pre>` },
    `<h2>Enum та literal types</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testNumericEnum()">Числовий enum</button>
  <button onclick="testStringEnum()">Рядковий enum</button>
  <button onclick="testLiteralType()">Literal type: "light"|"dark"</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function compile(source) {
  return ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2017 } }).outputText;
}

function testNumericEnum() {
  var source = 'enum Role { Admin, Moderator, User }\\n' +
    'const myRole: Role = Role.Admin;\\n' +
    'console.log("Role.Admin =", myRole);\\n' +
    'console.log("Role.User =", Role.User);';
  log('enum Role { Admin, Moderator, User }', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testStringEnum() {
  var source = 'enum Status { Active = "ACTIVE", Inactive = "INACTIVE", Banned = "BANNED" }\\n' +
    'console.log("Status.Active =", Status.Active);\\n' +
    'console.log("Status.Banned =", Status.Banned);';
  log('enum Status { Active = "ACTIVE", ... }', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testLiteralType() {
  var source = 'type Theme = "light" | "dark" | "system";\\n' +
    'let current: Theme = "dark";\\n' +
    'console.log("Поточна тема:", current);';
  log('type Theme = "light" | "dark" | "system";', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і порівняй, як числовий і рядковий enum виглядають після компіляції в JS.', ru:'Нажми все три кнопки и сравни, как числовой и строковый enum выглядят после компиляции.' },
      { level:'medium', uk:'У <code>testNumericEnum()</code> виведи ще й <code>Role.Moderator</code> — переконайся, що це 1 (нумерація з нуля).', ru:'Выведи Role.Moderator — убедись, что это 1.' },
      { level:'hard',   uk:'Створи новий рядковий enum <code>enum Direction { Up = "UP", Down = "DOWN" }</code> і напиши функцію <code>function move(d: Direction) { console.log("рух: " + d); }</code>, виклич її з <code>Direction.Up</code>.', ru:'Создай enum Direction и функцию move(d: Direction), вызови её.' },
    ]
  );

  /* ─── 02-06: Utility types ───────────────────────────────────────── */
  patch('02-06',
    { uk:`<h2>Utility types: Partial, Required, Readonly, Pick, Omit</h2>
<p>TypeScript має вбудовані "утилітарні типи", що трансформують існуючі типи без повторного написання їх з нуля.</p>
<h3>Partial&lt;T&gt; — усі поля стають необов'язковими</h3>
<pre>interface User { name: string; age: number; email: string; }

function updateUser(id: number, changes: Partial<User>) {
  // changes може містити лише ЧАСТИНУ полів User
}
updateUser(1, { age: 16 }); // OK — не потрібно передавати name і email</pre>
<h3>Required&lt;T&gt; — навпаки, усі поля обов'язкові</h3>
<pre>interface Config { debug?: boolean; verbose?: boolean; }
const fullConfig: Required<Config> = { debug: true, verbose: false }; // обидва обов'язкові</pre>
<h3>Readonly&lt;T&gt; — заборона зміни після створення</h3>
<pre>const user: Readonly<User> = { name: "Аліна", age: 15, email: "a@x.com" };
user.age = 16; // Помилка компіляції: Cannot assign to 'age' — readonly</pre>
<h3>Pick&lt;T, Keys&gt; — вибрати лише потрібні поля</h3>
<pre>type UserPreview = Pick<User, "name" | "age">; // { name: string; age: number }</pre>
<h3>Omit&lt;T, Keys&gt; — навпаки, виключити поля</h3>
<pre>type PublicUser = Omit<User, "email">; // усе, крім email</pre>`,
      ru:`<h2>Utility types: Partial, Required, Readonly, Pick, Omit</h2>
<p>TypeScript имеет встроенные "утилитарные типы", трансформирующие существующие типы без повторного написания с нуля.</p>
<h3>Partial&lt;T&gt; — все поля становятся необязательными</h3>
<pre>interface User { name: string; age: number; email: string; }

function updateUser(id: number, changes: Partial<User>) { }
updateUser(1, { age: 16 });</pre>
<h3>Required&lt;T&gt; — наоборот, все поля обязательны</h3>
<pre>interface Config { debug?: boolean; verbose?: boolean; }
const fullConfig: Required<Config> = { debug: true, verbose: false };</pre>
<h3>Readonly&lt;T&gt; — запрет изменения после создания</h3>
<pre>const user: Readonly<User> = { name: "Алина", age: 15, email: "a@x.com" };
user.age = 16; // Ошибка компиляции</pre>
<h3>Pick&lt;T, Keys&gt; — выбрать только нужные поля</h3>
<pre>type UserPreview = Pick<User, "name" | "age">;</pre>
<h3>Omit&lt;T, Keys&gt; — наоборот, исключить поля</h3>
<pre>type PublicUser = Omit<User, "email">;</pre>` },
    `<h2>Utility types</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testPartial()">Partial&lt;User&gt;</button>
  <button onclick="testPickOmit()">Pick / Omit</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function compile(source) {
  return ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2017 } }).outputText;
}

function testPartial() {
  var source = 'interface User { name: string; age: number; email: string; }\\n' +
    'function updateUser(current: User, changes: Partial<User>): User {\\n' +
    '  return Object.assign({}, current, changes);\\n' +
    '}\\n' +
    'const u: User = { name: "Аліна", age: 15, email: "a@x.com" };\\n' +
    'const updated = updateUser(u, { age: 16 });\\n' +
    'console.log(JSON.stringify(updated));';
  log('function updateUser(current: User, changes: Partial<User>): User', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testPickOmit() {
  var source = 'interface User { name: string; age: number; email: string; }\\n' +
    'const u: User = { name: "Марко", age: 16, email: "m@x.com" };\\n' +
    'const preview: Pick<User, "name" | "age"> = { name: u.name, age: u.age };\\n' +
    'const publicUser: Omit<User, "email"> = { name: u.name, age: u.age };\\n' +
    'console.log("Pick:", JSON.stringify(preview));\\n' +
    'console.log("Omit:", JSON.stringify(publicUser));';
  log('Pick<User, "name"|"age"> та Omit<User, "email">', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і подивись на результати роботи утилітарних типів.', ru:'Нажми обе кнопки и посмотри на результаты работы утилитарных типов.' },
      { level:'medium', uk:'У <code>testPartial()</code> зміни <code>changes</code> так, щоб оновити одразу два поля: <code>{ age: 17, email: "new@x.com" }</code>.', ru:'Измени changes так, чтобы обновить сразу два поля: age и email.' },
      { level:'hard',   uk:'Додай у <code>testPickOmit()</code> третій приклад — <code>Readonly&lt;User&gt;</code> — створи об\'єкт із цим типом і додай коментар-лог, що спроба <code>user.age = 99</code> викликала б помилку компіляції (не виконуй її насправді, просто задокументуй у лозі рядком).', ru:'Добавь пример Readonly<User> с комментарием об ошибке компиляции при попытке изменения.' },
    ]
  );

  /* ─── 02-07: Classes у TypeScript ─────────────────────────────────── */
  patch('02-07',
    { uk:`<h2>Classes у TypeScript: private, protected, abstract</h2>
<h3>Модифікатори доступу</h3>
<pre>class BankAccount {
  private balance: number = 0;      // доступно лише всередині класу
  protected owner: string;          // доступно в класі і в нащадках
  public accountNumber: string;     // доступно звідусіль (за замовчуванням)

  constructor(owner: string, accountNumber: string) {
    this.owner = owner;
    this.accountNumber = accountNumber;
  }

  deposit(amount: number) { this.balance += amount; }
  getBalance(): number { return this.balance; }
}

const acc = new BankAccount("Аліна", "UA001");
acc.deposit(100);
acc.balance; // Помилка компіляції: 'balance' — private</pre>
<h3>Скорочений синтаксис через параметри конструктора</h3>
<pre>class Point {
  constructor(private x: number, private y: number) {}
  toString() { return \`(${'$'}{this.x}, ${'$'}{this.y})\`; }
}</pre>
<h3>Абстрактні класи — не можна створити напряму</h3>
<pre>abstract class Shape {
  abstract area(): number; // нащадки ЗОБОВ'ЯЗАНІ реалізувати
  describe(): string { return "Площа: " + this.area(); }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}

new Shape();          // Помилка: не можна створити екземпляр abstract class
new Circle(5).area(); // OK</pre>`,
      ru:`<h2>Classes в TypeScript: private, protected, abstract</h2>
<h3>Модификаторы доступа</h3>
<pre>class BankAccount {
  private balance: number = 0;
  protected owner: string;
  public accountNumber: string;

  constructor(owner: string, accountNumber: string) {
    this.owner = owner;
    this.accountNumber = accountNumber;
  }

  deposit(amount: number) { this.balance += amount; }
  getBalance(): number { return this.balance; }
}</pre>
<h3>Сокращённый синтаксис через параметры конструктора</h3>
<pre>class Point {
  constructor(private x: number, private y: number) {}
  toString() { return \`(${'$'}{this.x}, ${'$'}{this.y})\`; }
}</pre>
<h3>Абстрактные классы — нельзя создать напрямую</h3>
<pre>abstract class Shape {
  abstract area(): number;
  describe(): string { return "Площадь: " + this.area(); }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}

new Shape();          // Ошибка
new Circle(5).area(); // OK</pre>` },
    `<h2>private, protected, abstract</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testAccessModifiers()">private / protected</button>
  <button onclick="testAbstract()">abstract class Shape</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function compile(source) {
  return ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2017 } }).outputText;
}

function testAccessModifiers() {
  var source = 'class BankAccount {\\n' +
    '  private balance: number = 0;\\n' +
    '  constructor(public owner: string) {}\\n' +
    '  deposit(amount: number) { this.balance += amount; }\\n' +
    '  getBalance(): number { return this.balance; }\\n' +
    '}\\n' +
    'const acc = new BankAccount("Аліна");\\n' +
    'acc.deposit(100);\\n' +
    'console.log(acc.owner + ": " + acc.getBalance());';
  log('class BankAccount { private balance; constructor(public owner)... }', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testAbstract() {
  var source = 'abstract class Shape {\\n' +
    '  abstract area(): number;\\n' +
    '  describe(): string { return "Площа: " + this.area(); }\\n' +
    '}\\n' +
    'class Circle extends Shape {\\n' +
    '  constructor(private radius: number) { super(); }\\n' +
    '  area(): number { return Math.PI * this.radius * this.radius; }\\n' +
    '}\\n' +
    'const c = new Circle(5);\\n' +
    'console.log(c.describe());';
  log('abstract class Shape { abstract area(): number; ... }', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і подивись, як абстрактний клас реалізовується в JS (JS не має власного abstract — TS лише перевіряє це на етапі компіляції).', ru:'Нажми обе кнопки и посмотри, как абстрактный класс реализуется в JS.' },
      { level:'medium', uk:'Додай у <code>BankAccount</code> метод <code>withdraw(amount: number)</code>, що зменшує <code>balance</code> (з перевіркою, що баланс не стане відʼємним), і виклич його.', ru:'Добавь метод withdraw(amount: number) с проверкой на отрицательный баланс.' },
      { level:'hard',   uk:'Створи другий клас <code>class Square extends Shape</code> зі стороною <code>side: number</code> і реалізуй <code>area()</code> — виклич <code>describe()</code> для обох фігур і порівняй результати.', ru:'Создай Square extends Shape со стороной side и реализуй area().' },
    ]
  );

  /* ─── 02-08: Type guards та narrowing ────────────────────────────── */
  patch('02-08',
    { uk:`<h2>Type guards та narrowing: in, typeof, instanceof</h2>
<p>"Звуження типу" (narrowing) — коли TS автоматично звужує union-тип до конкретнішого всередині перевірки <code>if</code>.</p>
<h3>typeof — для примітивів</h3>
<pre>function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // тут TS знає, що value — це string
  } else {
    console.log(value.toFixed(2));    // тут TS знає, що value — це number
  }
}</pre>
<h3>instanceof — для класів</h3>
<pre>class Dog { bark() { return "Гав!"; } }
class Cat { meow() { return "Няв!"; } }

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    console.log(animal.bark());
  } else {
    console.log(animal.meow());
  }
}</pre>
<h3>in — для перевірки наявності властивості</h3>
<pre>interface Bird { fly(): void; }
interface Fish { swim(): void; }

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}</pre>
<h3>Власні type predicates (is)</h3>
<pre>function isString(value: unknown): value is string {
  return typeof value === "string";
}
function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // TS довіряє isString і звужує тип
  }
}</pre>`,
      ru:`<h2>Type guards и narrowing: in, typeof, instanceof</h2>
<h3>typeof — для примитивов</h3>
<pre>function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}</pre>
<h3>instanceof — для классов</h3>
<pre>class Dog { bark() { return "Гав!"; } }
class Cat { meow() { return "Мяу!"; } }

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    console.log(animal.bark());
  } else {
    console.log(animal.meow());
  }
}</pre>
<h3>in — для проверки наличия свойства</h3>
<pre>interface Bird { fly(): void; }
interface Fish { swim(): void; }

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}</pre>
<h3>Собственные type predicates (is)</h3>
<pre>function isString(value: unknown): value is string {
  return typeof value === "string";
}</pre>` },
    `<h2>Type guards</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testTypeof()">typeof narrowing</button>
  <button onclick="testInstanceof()">instanceof narrowing</button>
  <button onclick="testPredicate()">Власний predicate: value is string</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function compile(source) {
  return ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2017 } }).outputText;
}

function testTypeof() {
  var source = 'function printValue(value: string | number) {\\n' +
    '  if (typeof value === "string") {\\n' +
    '    console.log("рядок у верхньому регістрі: " + value.toUpperCase());\\n' +
    '  } else {\\n' +
    '    console.log("число з 2 знаками: " + value.toFixed(2));\\n' +
    '  }\\n' +
    '}\\n' +
    'printValue("привіт");\\n' +
    'printValue(3.14159);';
  log('typeof value === "string" звужує union-тип', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testInstanceof() {
  var source = 'class Dog { bark() { return "Гав!"; } }\\n' +
    'class Cat { meow() { return "Няв!"; } }\\n' +
    'function speak(animal: Dog | Cat) {\\n' +
    '  if (animal instanceof Dog) { console.log(animal.bark()); }\\n' +
    '  else { console.log(animal.meow()); }\\n' +
    '}\\n' +
    'speak(new Dog());\\n' +
    'speak(new Cat());';
  log('animal instanceof Dog звужує тип до Dog | Cat', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testPredicate() {
  var source = 'function isString(value: unknown): value is string {\\n' +
    '  return typeof value === "string";\\n' +
    '}\\n' +
    'function process(value: unknown) {\\n' +
    '  if (isString(value)) { console.log("це рядок: " + value.toUpperCase()); }\\n' +
    '  else { console.log("не рядок"); }\\n' +
    '}\\n' +
    'process("hello");\\n' +
    'process(123);';
  log('function isString(value: unknown): value is string', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і подивись, як звуження типу дозволяє безпечно викликати різні методи.', ru:'Нажми все три кнопки и посмотри, как сужение типа позволяет безопасно вызывать разные методы.' },
      { level:'medium', uk:'У <code>testInstanceof()</code> додай третій клас <code>class Bird { fly() { return "Летить!"; } }</code> і розшир union до <code>Dog | Cat | Bird</code> з відповідною гілкою <code>else if</code>.', ru:'Добавь класс Bird и расширь union до Dog | Cat | Bird.' },
      { level:'hard',   uk:'Створи власний predicate <code>function isNumberArray(value: unknown): value is number[]</code>, що перевіряє через <code>Array.isArray</code> і <code>every</code>, чи всі елементи — числа, і протестуй його на <code>[1,2,3]</code> та <code>["a","b"]</code>.', ru:'Создай isNumberArray(value): value is number[] и протестируй на двух массивах.' },
    ]
  );

  /* ─── 02-09: Декоратори та Reflect Metadata ──────────────────────── */
  patch('02-09',
    { uk:`<h2>Декоратори (decorators) та Reflect Metadata</h2>
<p>Декоратори — спеціальні функції, що "обгортають" клас, метод чи властивість, додаючи поведінку без зміни їхнього коду. Широко використовуються у фреймворках на кшталт Angular та NestJS.</p>
<h3>Декоратор класу</h3>
<pre>function Logger(constructor: Function) {
  console.log("Створюється клас: " + constructor.name);
}

@Logger
class Product {
  constructor(public name: string) {}
}
// При виконанні new Product(...) спершу спрацює Logger</pre>
<h3>Декоратор методу</h3>
<pre>function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("Виклик " + propertyKey + " з аргументами: " + JSON.stringify(args));
    return original.apply(this, args);
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number) { return a + b; }
}</pre>
<h3>Увімкнення декораторів у tsconfig.json</h3>
<pre>{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}</pre>
<p>Декоратори — досі експериментальна (хоч і дуже поширена) фіча TypeScript, тому потребує явного увімкнення в конфігурації.</p>`,
      ru:`<h2>Декораторы (decorators) и Reflect Metadata</h2>
<p>Декораторы — специальные функции, "обёртывающие" класс, метод или свойство, добавляя поведение без изменения их кода. Широко используются в Angular и NestJS.</p>
<h3>Декоратор класса</h3>
<pre>function Logger(constructor: Function) {
  console.log("Создаётся класс: " + constructor.name);
}

@Logger
class Product {
  constructor(public name: string) {}
}</pre>
<h3>Декоратор метода</h3>
<pre>function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("Вызов " + propertyKey);
    return original.apply(this, args);
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number) { return a + b; }
}</pre>
<h3>Включение декораторов в tsconfig.json</h3>
<pre>{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}</pre>` },
    `<h2>Декоратори класів і методів</h2>
${TS_CDN}
<div class="btn-row">
  <button onclick="testClassDecorator()">Декоратор класу</button>
  <button onclick="testMethodDecorator()">Декоратор методу</button>
</div>
<div class="console" id="out">// Результат з'явиться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function compile(source) {
  return ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2017, experimentalDecorators: true }
  }).outputText;
}

function testClassDecorator() {
  var source = 'function Logger(constructor: Function) {\\n' +
    '  console.log("Створюється клас: " + constructor.name);\\n' +
    '}\\n' +
    '@Logger\\n' +
    'class Product {\\n' +
    '  constructor(public name: string) {}\\n' +
    '}\\n' +
    'const p = new Product("Ноутбук");\\n' +
    'console.log("Готово: " + p.name);';
  log('@Logger class Product {...}', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}

function testMethodDecorator() {
  var source = 'function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {\\n' +
    '  const original = descriptor.value;\\n' +
    '  descriptor.value = function (...args: any[]) {\\n' +
    '    console.log("Виклик " + propertyKey + " з " + JSON.stringify(args));\\n' +
    '    return original.apply(this, args);\\n' +
    '  };\\n' +
    '}\\n' +
    'class Calculator {\\n' +
    '  @LogMethod\\n' +
    '  add(a: number, b: number) { return a + b; }\\n' +
    '}\\n' +
    'const calc = new Calculator();\\n' +
    'console.log("Результат: " + calc.add(3, 4));';
  log('@LogMethod add(a, b) {...}', 'c-dim');
  var js = compile(source);
  log(js, 'c-ts');
  eval(js);
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і подивись, як декоратор автоматично "обгортає" поведінку класу й методу.', ru:'Нажми обе кнопки и посмотри, как декоратор автоматически "оборачивает" поведение класса и метода.' },
      { level:'medium', uk:'У <code>testMethodDecorator()</code> додай у <code>Calculator</code> ще один метод <code>@LogMethod multiply(a, b) { return a * b; }</code> і виклич його.', ru:'Добавь метод multiply(a, b) с @LogMethod и вызови его.' },
      { level:'hard',   uk:'Створи новий декоратор властивості <code>function ReadOnly(target, key) {...}</code>, що логує повідомлення "поле стало readonly", і застосуй його до якогось поля нового класу за зразком.', ru:'Создай декоратор свойства ReadOnly и примени его к полю нового класса.' },
    ]
  );

  /* ─── 02-10: ФІНАЛ — TypeScript-застосунок із реальними типами ──── */
  patch('02-10',
    { uk:`<h2>ПРОЕКТ: TypeScript-застосунок із реальними типами</h2>
<p>Фінальний проект модуля — міні-система керування задачами (todo-трекер), що поєднує все вивчене в модулі: interfaces, generics, enum, utility types, type guards і класи з модифікаторами доступу.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ <code>interface Task</code> з <code>enum Priority</code></li>
  <li>✅ Generic-клас <code>Repository&lt;T&gt;</code> для зберігання будь-яких сутностей</li>
  <li>✅ <code>Partial&lt;Task&gt;</code> для часткового оновлення задач</li>
  <li>✅ Type guard <code>isOverdue(task): boolean</code></li>
  <li>✅ Реальна компіляція через <code>ts.transpileModule</code> прямо в браузері</li>
</ul>
<p>Відкрий вкладку JS — там повна структура застосунку, побудована по-справжньому на TypeScript.</p>`,
      ru:`<h2>ПРОЕКТ: TypeScript-приложение с реальными типами</h2>
<p>Финальный проект модуля — мини-система управления задачами (todo-трекер), объединяющая всё изученное: interfaces, generics, enum, utility types, type guards и классы с модификаторами доступа.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ interface Task с enum Priority</li>
  <li>✅ Generic-класс Repository&lt;T&gt; для хранения любых сущностей</li>
  <li>✅ Partial&lt;Task&gt; для частичного обновления задач</li>
  <li>✅ Type guard isOverdue(task): boolean</li>
  <li>✅ Реальная компиляция через ts.transpileModule прямо в браузере</li>
</ul>` },
    `<h2>Todo-трекер на TypeScript</h2>
${TS_CDN}
<button onclick="runApp()">▶ Скомпілювати та запустити застосунок</button>
<div class="console" id="out">$ Готово до запуску</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function runApp() {
  document.getElementById('out').innerHTML = '';
  log('$ tsc todo-app.ts --strict', 'c-dim');

  var source =
    'enum Priority { Low = "LOW", Medium = "MEDIUM", High = "HIGH" }\\n' +
    '\\n' +
    'interface Task {\\n' +
    '  id: number;\\n' +
    '  title: string;\\n' +
    '  priority: Priority;\\n' +
    '  done: boolean;\\n' +
    '  dueDate: string;\\n' +
    '}\\n' +
    '\\n' +
    'class Repository<T extends { id: number }> {\\n' +
    '  private items: T[] = [];\\n' +
    '  add(item: T): void { this.items.push(item); }\\n' +
    '  update(id: number, changes: Partial<T>): void {\\n' +
    '    const item = this.items.find(function (i) { return i.id === id; });\\n' +
    '    if (item) Object.assign(item, changes);\\n' +
    '  }\\n' +
    '  getAll(): T[] { return this.items; }\\n' +
    '}\\n' +
    '\\n' +
    'function isOverdue(task: Task, today: string): boolean {\\n' +
    '  return !task.done && task.dueDate < today;\\n' +
    '}\\n' +
    '\\n' +
    'const repo = new Repository<Task>();\\n' +
    'repo.add({ id: 1, title: "Здати проєкт", priority: Priority.High, done: false, dueDate: "2026-07-01" });\\n' +
    'repo.add({ id: 2, title: "Прочитати книгу", priority: Priority.Low, done: false, dueDate: "2026-12-01" });\\n' +
    '\\n' +
    'repo.update(1, { done: true });\\n' +
    '\\n' +
    'var today = "2026-07-11";\\n' +
    'repo.getAll().forEach(function (task) {\\n' +
    '  var status = task.done ? "виконано" : (isOverdue(task, today) ? "ПРОСТРОЧЕНО" : "у процесі");\\n' +
    '  console.log("[" + task.priority + "] " + task.title + " — " + status);\\n' +
    '});';

  log('Вихідний TypeScript (interface + generic + enum + utility types):', 'c-dim');

  var result = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2017, strict: true }
  });

  log('', '');
  log('Скомпільований JavaScript:', 'c-dim');
  log(result.outputText, 'c-ts');

  log('', '');
  log('Виконання застосунку:', 'c-dim');
  try {
    eval(result.outputText);
  } catch (e) {
    log('Помилка виконання: ' + e.message, 'c-err');
  }
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і подивись на реальну компіляцію та виконання todo-трекера на TypeScript.', ru:'Нажми кнопку и посмотри на реальную компиляцию и выполнение todo-трекера на TypeScript.' },
      { level:'medium', uk:'Додай третю задачу через <code>repo.add({...})</code> з <code>priority: Priority.Medium</code> і минулою датою (щоб вона стала "ПРОСТРОЧЕНО").', ru:'Добавь третью задачу с priority Medium и просроченной датой.' },
      { level:'hard',   uk:'Додай у <code>Repository&lt;T&gt;</code> новий метод <code>remove(id: number): void</code>, що видаляє елемент за id через <code>filter</code>, і продемонструй його роботу — видали задачу #2 і виведи список, що залишився.', ru:'Добавь метод remove(id: number): void в Repository<T> и продемонстрируй его работу.' },
    ]
  );

})();
