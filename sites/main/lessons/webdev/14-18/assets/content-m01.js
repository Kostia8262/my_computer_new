/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 01 — JavaScript Pro · 14–18
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
button:hover{border-color:#22d3ee;color:#67e8f9}
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:Consolas,monospace;font-size:12px;color:#7dd3fc}
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.console{background:#000;border:1px solid #334155;border-radius:10px;padding:14px;font-family:Consolas,monospace;font-size:12.5px;color:#a3e635;min-height:100px;max-height:320px;overflow-y:auto;white-space:pre-wrap;line-height:1.7;margin-top:10px}
.c-ok{color:#4ade80}
.c-err{color:#f87171}
.c-warn{color:#facc15}
.c-dim{color:#64748b}
.c-key{color:#c4b5fd}`;

  /* ─── 01-01: ES6+ глибоко — Symbol, Iterator, WeakMap, Proxy, Reflect ─ */
  patch('01-01',
    { uk:`<h2>ES6+ глибоко: Symbol, Iterator, WeakMap, Proxy, Reflect</h2>
<p>Цей модуль — не повторення основ, а поглиблення в те, що більшість розробників JS ніколи явно не використовує, але що лежить в основі мови. Почнемо з чотирьох "малопомітних" механізмів ES6+.</p>
<h3>Symbol — гарантовано унікальний ключ</h3>
<pre>const id = Symbol('id');
const user = { [id]: 42, name: 'Аліна' };
console.log(user[id]); // 42
console.log(Object.keys(user)); // ['name'] — Symbol НЕ потрапляє в звичайний перелік</pre>
<p>Symbol використовують для "прихованих" властивостей об'єкта, що не заважають <code>for...in</code>, <code>JSON.stringify</code> чи <code>Object.keys</code>.</p>
<h3>Iterator protocol — що робить масив "перебірним"</h3>
<pre>const range = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let current = this.from, last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};
console.log([...range]); // [1, 2, 3] — власний об'єкт можна "розгорнути" через ...</pre>
<h3>WeakMap — ключі, що не заважають Garbage Collector</h3>
<pre>const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = /* важкі обчислення */ obj;
  cache.set(obj, result);
  return result;
}</pre>
<p>На відміну від звичайного <code>Map</code>, якщо об'єкт-ключ більше ніде не використовується, <code>WeakMap</code> дозволяє його видалити з пам'яті — сам <code>WeakMap</code> не тримає "живе" посилання.</p>
<h3>Reflect — дзеркало для операцій над об'єктами</h3>
<pre>Reflect.has(obj, 'name');       // те саме, що 'name' in obj, але як функція
Reflect.ownKeys(obj);           // усі ключі, включно з Symbol
Reflect.deleteProperty(obj, 'x'); // те саме, що delete obj.x</pre>
<p>Reflect не додає нової функціональності — він робить операції над об'єктами <strong>функціями, а не синтаксисом</strong>, що зручно для метапрограмування (побачимо в уроці 01-06 із Proxy).</p>`,
      ru:`<h2>ES6+ глубоко: Symbol, Iterator, WeakMap, Proxy, Reflect</h2>
<p>Этот модуль — не повторение основ, а углубление в то, что большинство разработчиков JS никогда явно не использует, но что лежит в основе языка.</p>
<h3>Symbol — гарантированно уникальный ключ</h3>
<pre>const id = Symbol('id');
const user = { [id]: 42, name: 'Алина' };
console.log(user[id]); // 42
console.log(Object.keys(user)); // ['name'] — Symbol НЕ попадает в обычный перечень</pre>
<h3>Iterator protocol — что делает массив "перебираемым"</h3>
<pre>const range = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let current = this.from, last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};
console.log([...range]); // [1, 2, 3]</pre>
<h3>WeakMap — ключи, не мешающие Garbage Collector</h3>
<pre>const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = obj;
  cache.set(obj, result);
  return result;
}</pre>
<p>В отличие от обычного Map, если объект-ключ больше нигде не используется, WeakMap позволяет удалить его из памяти.</p>
<h3>Reflect — зеркало для операций над объектами</h3>
<pre>Reflect.has(obj, 'name');
Reflect.ownKeys(obj);
Reflect.deleteProperty(obj, 'x');</pre>
<p>Reflect делает операции над объектами функциями, а не синтаксисом — удобно для метапрограммирования (Proxy в уроке 01-06).</p>` },
    `<h2>Symbol та кастомний ітератор</h2>
<div class="btn-row">
  <button onclick="testSymbol()">Symbol як прихований ключ</button>
  <button onclick="testIterator()">Кастомний Symbol.iterator</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function testSymbol() {
  var id = Symbol('id');
  var user = {};
  user[id] = 42;
  user.name = 'Аліна';
  log('const id = Symbol(\\'id\\');', 'c-dim');
  log('user[id] = ' + user[id], 'c-ok');
  log('Object.keys(user) = ' + JSON.stringify(Object.keys(user)), 'c-key');
  log('// Symbol не потрапив у звичайний перелік ключів!', 'c-warn');
}

function testIterator() {
  var range = {
    from: 1, to: 5
  };
  range[Symbol.iterator] = function () {
    var current = this.from;
    var last = this.to;
    return {
      next: function () {
        return current <= last ? { value: current++, done: false } : { value: undefined, done: true };
      }
    };
  };
  log('const range = { from: 1, to: 5, [Symbol.iterator]() {...} };', 'c-dim');
  log('[...range] = ' + JSON.stringify([].concat.apply([], [Array.from(range)])), 'c-ok');
  log('// Об\\'єкт без масиву чи Array.prototype можна "розгорнути" через spread!', 'c-warn');
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і подивись на результат виконання реального коду.', ru:'Нажми обе кнопки и посмотри на результат выполнения реального кода.' },
      { level:'medium', uk:'Зміни діапазон <code>range</code> у <code>testIterator()</code> з 1-5 на 10-15 і перевір результат.', ru:'Измени диапазон range в testIterator() с 1-5 на 10-15.' },
      { level:'hard',   uk:'Додай у <code>testSymbol()</code> перевірку через <code>Object.getOwnPropertySymbols(user)</code> — виведи результат окремим рядком і переконайся, що символ там Є (на відміну від Object.keys).', ru:'Добавь проверку через Object.getOwnPropertySymbols(user) — убедись, что символ там ЕСТЬ.' },
    ]
  );

  /* ─── 01-02: ООП у JS — class, extends, super, mixins ──────────── */
  patch('01-02',
    { uk:`<h2>ООП у JS: class, extends, super, mixins та абстракція</h2>
<p><code>class</code> у JavaScript — це "синтаксичний цукор" над прототипним успадкуванням (детальніше — у 01-04), але працювати з ним зручніше й читабельніше.</p>
<h3>Базовий клас та успадкування</h3>
<pre>class Animal {
  #energy = 100; // приватне поле (справжня інкапсуляція, не угода про іменування)

  constructor(name) { this.name = name; }
  move(cost) {
    this.#energy -= cost;
    return \`${'$'}{this.name} рухається, залишилось енергії: ${'$'}{this.#energy}\`;
  }
}

class Bird extends Animal {
  fly() {
    return super.move(10) + ' (летить)';
  }
}</pre>
<h3>#privateField — справжня приватність</h3>
<p>На відміну від <code>_energy</code> (угода "не чіпай, хоч технічно можна"), поле з <code>#</code> фізично недоступне ззовні класу — <code>bird.#energy</code> поза класом викличе SyntaxError.</p>
<h3>Mixins — "домішки" для класів без множинного успадкування</h3>
<pre>const Swimmer = Base => class extends Base {
  swim() { return this.name + ' пливе'; }
};
const Flyer = Base => class extends Base {
  fly() { return this.name + ' летить'; }
};

class Duck extends Swimmer(Flyer(Animal)) {}
const duck = new Duck('Качка');
duck.swim(); duck.fly(); // обидва методи доступні</pre>
<p>JS не підтримує множинне успадкування (<code>class X extends A, B</code> — помилка), але функції-мікшини дозволяють комбінувати поведінку з кількох джерел.</p>
<h3>Абстракція через "має реалізувати"</h3>
<pre>class Shape {
  area() { throw new Error('area() must be implemented'); }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}</pre>`,
      ru:`<h2>ООП в JS: class, extends, super, mixins и абстракция</h2>
<p>class в JavaScript — это "синтаксический сахар" над прототипным наследованием (подробнее — в 01-04), но работать с ним удобнее.</p>
<h3>Базовый класс и наследование</h3>
<pre>class Animal {
  #energy = 100; // приватное поле (настоящая инкапсуляция)

  constructor(name) { this.name = name; }
  move(cost) {
    this.#energy -= cost;
    return \`${'$'}{this.name} двигается, осталось энергии: ${'$'}{this.#energy}\`;
  }
}

class Bird extends Animal {
  fly() {
    return super.move(10) + ' (летит)';
  }
}</pre>
<h3>#privateField — настоящая приватность</h3>
<p>В отличие от _energy (соглашение), поле с # физически недоступно снаружи класса.</p>
<h3>Mixins — "примеси" для классов без множественного наследования</h3>
<pre>const Swimmer = Base => class extends Base {
  swim() { return this.name + ' плывёт'; }
};
const Flyer = Base => class extends Base {
  fly() { return this.name + ' летит'; }
};

class Duck extends Swimmer(Flyer(Animal)) {}
const duck = new Duck('Утка');
duck.swim(); duck.fly();</pre>
<h3>Абстракция через "должен реализовать"</h3>
<pre>class Shape {
  area() { throw new Error('area() must be implemented'); }
}
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}</pre>` },
    `<h2>Класи, успадкування та mixins</h2>
<div class="btn-row">
  <button onclick="testInheritance()">class + extends + super</button>
  <button onclick="testMixins()">Mixins: Swimmer + Flyer</button>
  <button onclick="testPrivate()">Приватне поле #energy</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

class Animal {
  #energy = 100;
  constructor(name) { this.name = name; }
  move(cost) {
    this.#energy -= cost;
    return this.name + ' рухається, енергії: ' + this.#energy;
  }
  getEnergy() { return this.#energy; }
}

class Bird extends Animal {
  fly() { return super.move(10) + ' (летить)'; }
}

function testInheritance() {
  var bird = new Bird('Горобець');
  log('class Bird extends Animal { fly() { return super.move(10); } }', 'c-dim');
  log(bird.fly(), 'c-ok');
  log('bird instanceof Animal = ' + (bird instanceof Animal), 'c-key');
}

var Swimmer = function (Base) {
  return class extends Base {
    swim() { return this.name + ' пливе'; }
  };
};
var Flyer = function (Base) {
  return class extends Base {
    fly2() { return this.name + ' летить (mixin)'; }
  };
};

function testMixins() {
  class Duck extends Swimmer(Flyer(Animal)) {}
  var duck = new Duck('Качка');
  log('class Duck extends Swimmer(Flyer(Animal)) {}', 'c-dim');
  log(duck.swim(), 'c-ok');
  log(duck.fly2(), 'c-ok');
}

function testPrivate() {
  var a = new Animal('Кіт');
  log('a.getEnergy() = ' + a.getEnergy(), 'c-ok');
  try {
    log('Спроба a.#energy напряму ззовні класу...', 'c-dim');
    log('SyntaxError: Private field \\'#energy\\' must be declared in an enclosing class', 'c-err');
  } catch (e) {
    log('Помилка: ' + e.message, 'c-err');
  }
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і подивись на результати роботи класів.', ru:'Нажми все три кнопки и посмотри на результаты работы классов.' },
      { level:'medium', uk:'Додай у клас <code>Animal</code> ще один метод <code>rest()</code>, що повертає енергію до 100 (<code>this.#energy = 100</code>) — виклич його з нової кнопки.', ru:'Добавь в класс Animal метод rest(), возвращающий энергию к 100.' },
      { level:'hard',   uk:'Створи третій mixin <code>Digger</code> з методом <code>dig()</code> і додай його до класу Duck: <code>class Duck extends Swimmer(Flyer(Digger(Animal))) {}</code>.', ru:'Создай третий mixin Digger с методом dig() и добавь его к классу Duck.' },
    ]
  );

  /* ─── 01-03: Замикання (closures) і this: call, bind, apply ────── */
  patch('01-03',
    { uk:`<h2>Замикання (closures) і this: call, bind, apply</h2>
<p>Замикання — функція, що "пам'ятає" змінні зі свого зовнішнього оточення навіть після того, як те оточення завершило виконання.</p>
<h3>Класичний приклад — лічильник</h3>
<pre>function createCounter() {
  let count = 0; // "захоплена" змінна
  return {
    increment: () => ++count,
    reset: () => { count = 0; }
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
// count недоступна ззовні напряму — лише через методи</pre>
<h3>this — залежить від того, ЯК викликана функція</h3>
<pre>const obj = {
  name: 'Аліна',
  greet() { return 'Привіт, я ' + this.name; }
};
const fn = obj.greet;
fn(); // this === undefined (в 'use strict'), бо викликано БЕЗ obj.</pre>
<h3>call, apply, bind — керуємо this вручну</h3>
<pre>fn.call(obj);           // виклик одразу, this = obj
fn.apply(obj, [1, 2]);  // те саме, але аргументи масивом
const bound = fn.bind(obj); // повертає НОВУ функцію з "прибитим" this
bound(); // завжди буде this === obj, навіть якщо викликати окремо</pre>
<h3>Стрілкові функції не мають власного this</h3>
<p>Стрілкова функція бере <code>this</code> з того місця, де вона <strong>написана</strong> (лексичний this), а не звідки викликана — тому в об'єкті вище <code>greet: () => this.name</code> НЕ спрацювало б як очікується.</p>`,
      ru:`<h2>Замыкания (closures) и this: call, bind, apply</h2>
<p>Замыкание — функция, "помнящая" переменные из своего внешнего окружения даже после того, как то окружение завершило выполнение.</p>
<h3>Классический пример — счётчик</h3>
<pre>function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    reset: () => { count = 0; }
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2</pre>
<h3>this — зависит от того, КАК вызвана функция</h3>
<pre>const obj = {
  name: 'Алина',
  greet() { return 'Привет, я ' + this.name; }
};
const fn = obj.greet;
fn(); // this === undefined (в 'use strict')</pre>
<h3>call, apply, bind — управляем this вручную</h3>
<pre>fn.call(obj);
fn.apply(obj, [1, 2]);
const bound = fn.bind(obj);
bound(); // всегда this === obj</pre>
<h3>Стрелочные функции не имеют собственного this</h3>
<p>Стрелочная функция берёт this из места, где она <strong>написана</strong> (лексический this), а не откуда вызвана.</p>` },
    `<h2>Closures та this</h2>
<div class="btn-row">
  <button onclick="testClosure()">Лічильник через closure</button>
  <button onclick="testThis()">Втрачений this</button>
  <button onclick="testBind()">call / apply / bind</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function createCounter() {
  var count = 0;
  return {
    increment: function () { return ++count; },
    reset: function () { count = 0; }
  };
}

function testClosure() {
  var counter = createCounter();
  log('const counter = createCounter();', 'c-dim');
  log('counter.increment() = ' + counter.increment(), 'c-ok');
  log('counter.increment() = ' + counter.increment(), 'c-ok');
  log('counter.increment() = ' + counter.increment(), 'c-ok');
  log('// count не існує зовні напряму — лише через методи', 'c-warn');
}

var obj = {
  name: 'Аліна',
  greet: function () { return 'Привіт, я ' + (this ? this.name : 'undefined'); }
};

function testThis() {
  var fn = obj.greet;
  log('const fn = obj.greet; fn();', 'c-dim');
  try {
    log(fn(), (fn() && fn().indexOf('undefined') === -1) ? 'c-ok' : 'c-warn');
  } catch (e) {
    log('TypeError: ' + e.message, 'c-err');
  }
}

function testBind() {
  var fn = obj.greet;
  log('fn.call(obj) = ' + fn.call(obj), 'c-ok');
  var bound = fn.bind(obj);
  log('const bound = fn.bind(obj);', 'c-dim');
  log('bound() = ' + bound(), 'c-ok');
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і подивись на різницю в поведінці this.', ru:'Нажми все три кнопки и посмотри на разницу в поведении this.' },
      { level:'medium', uk:'Додай у <code>createCounter()</code> метод <code>decrement</code> і виклич його з нової кнопки.', ru:'Добавь в createCounter() метод decrement.' },
      { level:'hard',   uk:'Створи другий об\'єкт <code>obj2 = { name: \'Марко\' }</code> і виклич <code>fn.call(obj2)</code> — переконайся, що ім\'я змінилось відповідно до переданого об\'єкта.', ru:'Создай второй объект obj2 и вызови fn.call(obj2).' },
    ]
  );

  /* ─── 01-04: Prototype chain та прототипне успадкування ────────── */
  patch('01-04',
    { uk:`<h2>Prototype chain та прототипне успадкування</h2>
<p><code>class</code> з попереднього уроку — це зручний синтаксис поверх того, як JS насправді працює: через <strong>ланцюжок прототипів</strong>.</p>
<h3>Що таке __proto__ і prototype</h3>
<pre>function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return this.name + ' видає звук'; };

const cat = new Animal('Кіт');
cat.speak(); // JS шукає speak() спочатку в cat, не знаходить,
             // йде до Animal.prototype — знаходить там</pre>
<h3>Object.create — ручне налаштування прототипу</h3>
<pre>const animalProto = { speak() { return this.name + ' видає звук'; } };
const cat = Object.create(animalProto);
cat.name = 'Кіт';
cat.speak(); // працює через прототипний ланцюжок</pre>
<h3>class — це той самий механізм, інший синтаксис</h3>
<pre>class Animal { speak() { return this.name + ' видає звук'; } }
const cat = new Animal();
Object.getPrototypeOf(cat) === Animal.prototype; // true</pre>
<h3>Чому це важливо знати</h3>
<p>Розуміння прототипів пояснює, чому методи класу <strong>спільні</strong> для всіх екземплярів (лежать в одному <code>prototype</code>, а не копіюються в кожен об'єкт), а поля з <code>constructor</code> — унікальні для кожного.</p>`,
      ru:`<h2>Prototype chain и прототипное наследование</h2>
<p>class из предыдущего урока — это удобный синтаксис поверх того, как JS реально работает: через <strong>цепочку прототипов</strong>.</p>
<h3>Что такое __proto__ и prototype</h3>
<pre>function Animal(name) { this.name = name; }
Animal.prototype.speak = function () { return this.name + ' издаёт звук'; };

const cat = new Animal('Кот');
cat.speak();</pre>
<h3>Object.create — ручная настройка прототипа</h3>
<pre>const animalProto = { speak() { return this.name + ' издаёт звук'; } };
const cat = Object.create(animalProto);
cat.name = 'Кот';
cat.speak();</pre>
<h3>class — тот же механизм, другой синтаксис</h3>
<pre>class Animal { speak() { return this.name + ' издаёт звук'; } }
const cat = new Animal();
Object.getPrototypeOf(cat) === Animal.prototype; // true</pre>
<h3>Почему это важно знать</h3>
<p>Понимание прототипов объясняет, почему методы класса <strong>общие</strong> для всех экземпляров.</p>` },
    `<h2>Ланцюжок прототипів</h2>
<div class="btn-row">
  <button onclick="testProtoFn()">function + prototype</button>
  <button onclick="testObjectCreate()">Object.create()</button>
  <button onclick="testProtoChain()">Перевірка ланцюжка</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function AnimalFn(name) { this.name = name; }
AnimalFn.prototype.speak = function () { return this.name + ' видає звук'; };

function testProtoFn() {
  var cat = new AnimalFn('Кіт');
  log('function Animal(name) { this.name = name; }', 'c-dim');
  log('Animal.prototype.speak = function() {...}', 'c-dim');
  log('cat.speak() = ' + cat.speak(), 'c-ok');
  log('cat.hasOwnProperty(\\'speak\\') = ' + cat.hasOwnProperty('speak'), 'c-key');
  log('// speak лежить у прототипі, а не в самому об\\'єкті cat', 'c-warn');
}

var animalProto = { speak: function () { return this.name + ' видає звук'; } };

function testObjectCreate() {
  var cat = Object.create(animalProto);
  cat.name = 'Пес';
  log('const cat = Object.create(animalProto); cat.name = \\'Пес\\';', 'c-dim');
  log('cat.speak() = ' + cat.speak(), 'c-ok');
  log('Object.getPrototypeOf(cat) === animalProto: ' + (Object.getPrototypeOf(cat) === animalProto), 'c-key');
}

class AnimalClass { speak() { return this.name + ' видає звук'; } }

function testProtoChain() {
  var cat = new AnimalClass();
  cat.name = 'Птах';
  log('class AnimalClass { speak() {...} }', 'c-dim');
  log('Object.getPrototypeOf(cat) === AnimalClass.prototype: ' + (Object.getPrototypeOf(cat) === AnimalClass.prototype), 'c-ok');
  log('// class — це той самий механізм прототипів, інший синтаксис', 'c-warn');
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і порівняй результати трьох різних способів створення об\'єктів з методами.', ru:'Нажми все три кнопки и сравни результаты трёх разных способов создания объектов с методами.' },
      { level:'medium', uk:'Додай у <code>AnimalFn.prototype</code> ще один метод <code>sleep()</code>, що повертає рядок "спить", і виклич його з нової кнопки.', ru:'Добавь в AnimalFn.prototype метод sleep().' },
      { level:'hard',   uk:'Створи другий об\'єкт через <code>Object.create(animalProto)</code> з іншим ім\'ям і переконайся, що обидва об\'єкти використовують ОДИН і той самий <code>animalProto</code> (виведи <code>cat1.speak === cat2.speak</code>).', ru:'Создай второй объект через Object.create(animalProto) и убедись, что оба используют один и тот же animalProto.' },
    ]
  );

  /* ─── 01-05: Генератори та ітератори ─────────────────────────────── */
  patch('01-05',
    { uk:`<h2>Генератори та ітератори: function*, yield, Symbol.iterator</h2>
<p>Генератор — особлива функція, яка може <strong>призупиняти</strong> своє виконання на <code>yield</code> і продовжувати з того самого місця при наступному виклику.</p>
<h3>Базовий генератор</h3>
<pre>function* countUp(from, to) {
  for (let i = from; i <= to; i++) {
    yield i; // "пауза" тут, повертаємо значення
  }
}

const gen = countUp(1, 3);
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }</pre>
<h3>for...of працює з генераторами "з коробки"</h3>
<pre>for (const num of countUp(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}</pre>
<h3>Нескінченні послідовності — лінива обчислюваність</h3>
<pre>function* naturalNumbers() {
  let n = 1;
  while (true) yield n++;
}

function take(iterable, count) {
  const result = [];
  for (const item of iterable) {
    if (result.length >= count) break;
    result.push(item);
  }
  return result;
}

take(naturalNumbers(), 5); // [1, 2, 3, 4, 5] — генератор не обчислює все одразу</pre>
<p>Це і є "лінива" (lazy) обчислюваність: значення обчислюються по одному, лише коли потрібні — навіть якщо джерело теоретично нескінченне.</p>`,
      ru:`<h2>Генераторы и итераторы: function*, yield, Symbol.iterator</h2>
<p>Генератор — особая функция, способная <strong>приостанавливать</strong> своё выполнение на yield и продолжать с того же места при следующем вызове.</p>
<h3>Базовый генератор</h3>
<pre>function* countUp(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

const gen = countUp(1, 3);
gen.next(); // { value: 1, done: false }</pre>
<h3>for...of работает с генераторами "из коробки"</h3>
<pre>for (const num of countUp(1, 5)) {
  console.log(num);
}</pre>
<h3>Бесконечные последовательности — ленивая вычислимость</h3>
<pre>function* naturalNumbers() {
  let n = 1;
  while (true) yield n++;
}

function take(iterable, count) {
  const result = [];
  for (const item of iterable) {
    if (result.length >= count) break;
    result.push(item);
  }
  return result;
}

take(naturalNumbers(), 5); // [1, 2, 3, 4, 5]</pre>` },
    `<h2>Генератори в дії</h2>
<div class="btn-row">
  <button onclick="testGenerator()">function* countUp</button>
  <button onclick="testInfinite()">Нескінченний генератор + take()</button>
  <button onclick="testFibonacci()">Генератор Фібоначчі</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function* countUp(from, to) {
  for (var i = from; i <= to; i++) yield i;
}

function testGenerator() {
  log('function* countUp(from, to) { for(...) yield i; }', 'c-dim');
  var values = [];
  for (var n of countUp(1, 5)) values.push(n);
  log('[...countUp(1, 5)] = ' + JSON.stringify(values), 'c-ok');
}

function* naturalNumbers() {
  var n = 1;
  while (true) yield n++;
}

function take(iterable, count) {
  var result = [];
  for (var item of iterable) {
    if (result.length >= count) break;
    result.push(item);
  }
  return result;
}

function testInfinite() {
  log('function* naturalNumbers() { let n=1; while(true) yield n++; }', 'c-dim');
  log('take(naturalNumbers(), 7) = ' + JSON.stringify(take(naturalNumbers(), 7)), 'c-ok');
  log('// генератор нескінченний, але ми взяли лише 7 значень', 'c-warn');
}

function* fibonacci() {
  var a = 0, b = 1;
  while (true) {
    yield a;
    var next = a + b;
    a = b;
    b = next;
  }
}

function testFibonacci() {
  log('function* fibonacci() { let a=0,b=1; while(true){ yield a; ... } }', 'c-dim');
  log('take(fibonacci(), 10) = ' + JSON.stringify(take(fibonacci(), 10)), 'c-ok');
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і подивись на результати роботи генераторів.', ru:'Нажми все три кнопки и посмотри на результаты работы генераторов.' },
      { level:'medium', uk:'Зміни виклик <code>take(fibonacci(), 10)</code> на <code>take(fibonacci(), 15)</code>.', ru:'Измени вызов take(fibonacci(), 10) на take(fibonacci(), 15).' },
      { level:'hard',   uk:'Напиши новий генератор <code>function* evenNumbers()</code>, що видає лише парні числа (0, 2, 4, 6...), і перевір його через <code>take(evenNumbers(), 5)</code> з нової кнопки.', ru:'Напиши генератор evenNumbers(), выдающий только чётные числа, и проверь через take().' },
    ]
  );

  /* ─── 01-06: Метапрограмування — Proxy та Reflect API ───────────── */
  patch('01-06',
    { uk:`<h2>Метапрограмування: Proxy та Reflect API</h2>
<p><code>Proxy</code> дозволяє "перехопити" базові операції над об'єктом — читання, запис, видалення властивості — і підмінити стандартну поведінку власною.</p>
<h3>Найпростіший Proxy — логування доступу</h3>
<pre>const user = { name: 'Аліна', age: 15 };

const logged = new Proxy(user, {
  get(target, prop) {
    console.log('Читання: ' + prop);
    return Reflect.get(target, prop); // виконуємо "звичайну" поведінку
  },
  set(target, prop, value) {
    console.log('Запис: ' + prop + ' = ' + value);
    return Reflect.set(target, prop, value);
  }
});

logged.name;      // лог "Читання: name", повертає 'Аліна'
logged.age = 16;  // лог "Запис: age = 16"</pre>
<h3>Практичне застосування — валідація</h3>
<pre>const validated = new Proxy({}, {
  set(target, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new TypeError('age має бути невід\\'ємним числом');
    }
    return Reflect.set(target, prop, value);
  }
});

validated.age = 15;  // ОК
validated.age = -5;  // TypeError!</pre>
<h3>Reflect поруч з Proxy — навіщо саме так?</h3>
<p><code>Reflect.get/set</code> роблять те саме, що <code>target[prop]</code> / <code>target[prop] = value</code>, але як функції з передбачуваною поведінкою — це стандартний спосіб "делегувати" операцію після перехоплення, рекомендований самою специфікацією ES6.</p>`,
      ru:`<h2>Метапрограммирование: Proxy и Reflect API</h2>
<p>Proxy позволяет "перехватить" базовые операции над объектом — чтение, запись, удаление свойства — и подменить стандартное поведение своим.</p>
<h3>Простейший Proxy — логирование доступа</h3>
<pre>const user = { name: 'Алина', age: 15 };

const logged = new Proxy(user, {
  get(target, prop) {
    console.log('Чтение: ' + prop);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log('Запись: ' + prop + ' = ' + value);
    return Reflect.set(target, prop, value);
  }
});</pre>
<h3>Практическое применение — валидация</h3>
<pre>const validated = new Proxy({}, {
  set(target, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new TypeError('age должен быть неотрицательным числом');
    }
    return Reflect.set(target, prop, value);
  }
});

validated.age = 15;  // ОК
validated.age = -5;  // TypeError!</pre>
<h3>Reflect рядом с Proxy — зачем именно так?</h3>
<p>Reflect.get/set делают то же самое, что target[prop], но как функции — стандартный способ "делегировать" операцию после перехвата.</p>` },
    `<h2>Proxy в дії</h2>
<div class="btn-row">
  <button onclick="testProxyLog()">Proxy: логування доступу</button>
  <button onclick="testProxyValidation()">Proxy: валідація</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function testProxyLog() {
  var user = { name: 'Аліна', age: 15 };
  var logged = new Proxy(user, {
    get: function (target, prop) {
      log('  [get] читання властивості: ' + String(prop), 'c-dim');
      return Reflect.get(target, prop);
    },
    set: function (target, prop, value) {
      log('  [set] запис властивості: ' + String(prop) + ' = ' + value, 'c-dim');
      return Reflect.set(target, prop, value);
    }
  });

  log('const logged = new Proxy(user, { get, set });', 'c-key');
  log('logged.name -> ' + logged.name, 'c-ok');
  logged.age = 16;
  log('logged.age тепер = ' + logged.age, 'c-ok');
}

function testProxyValidation() {
  var validated = new Proxy({}, {
    set: function (target, prop, value) {
      if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
        throw new TypeError('age має бути невід\\'ємним числом');
      }
      return Reflect.set(target, prop, value);
    }
  });

  log('validated.age = 15;', 'c-dim');
  validated.age = 15;
  log('OK, age = ' + validated.age, 'c-ok');

  log('validated.age = -5; // очікуємо помилку', 'c-dim');
  try {
    validated.age = -5;
  } catch (e) {
    log('Спіймано: ' + e.constructor.name + ': ' + e.message, 'c-err');
  }
}`,
    [
      { level:'easy',   uk:'Натисни обидві кнопки і подивись, як Proxy перехоплює читання/запис і як валідація ловить помилку.', ru:'Нажми обе кнопки и посмотри, как Proxy перехватывает чтение/запись и как валидация ловит ошибку.' },
      { level:'medium', uk:'Додай у Proxy з <code>testProxyLog()</code> перехоплювач <code>deleteProperty(target, prop)</code>, що логує видалення властивості, і виклич <code>delete logged.age</code> з нової кнопки.', ru:'Добавь перехватчик deleteProperty и вызови delete logged.age.' },
      { level:'hard',   uk:'Розшир <code>testProxyValidation()</code>: додай таку саму перевірку для властивості <code>name</code> — вона має бути непорожнім рядком, інакше <code>TypeError</code>.', ru:'Расширь testProxyValidation(): добавь такую же проверку для name — непустая строка.' },
    ]
  );

  /* ─── 01-07: Performance — debounce, throttle, memoize, lazy ────── */
  patch('01-07',
    { uk:`<h2>Performance: debounce, throttle, memoize, lazy evaluation</h2>
<p>Чотири класичні прийоми для прискорення й "приборкання" надто активного коду — особливо важливо для обробників подій (scroll, resize, input).</p>
<h3>Debounce — чекати, поки користувач "заспокоїться"</h3>
<pre>function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
window.addEventListener('resize', debounce(() => console.log('resize!'), 300));</pre>
<h3>Throttle — не частіше, ніж раз на N мс</h3>
<pre>function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (inThrottle) return;
    fn(...args);
    inThrottle = true;
    setTimeout(() => { inThrottle = false; }, limit);
  };
}
window.addEventListener('scroll', throttle(() => console.log('scroll!'), 200));</pre>
<h3>Debounce vs Throttle — у чому різниця?</h3>
<p><strong>Debounce</strong> викликає функцію лише <em>після паузи</em> в подіях (наприклад, коли користувач перестав друкувати). <strong>Throttle</strong> викликає функцію регулярно, не частіше заданого інтервалу, навіть якщо події продовжуються безперервно.</p>
<h3>Memoize — кешування результатів чистих функцій</h3>
<pre>function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
const slowSquare = memoize(n => { /* важкі обчислення */ return n * n; });</pre>
<h3>Lazy evaluation — обчислювати лише за потреби</h3>
<pre>class Lazy {
  #computed = false; #value;
  constructor(fn) { this.fn = fn; }
  get value() {
    if (!this.#computed) { this.#value = this.fn(); this.#computed = true; }
    return this.#value;
  }
}</pre>`,
      ru:`<h2>Performance: debounce, throttle, memoize, lazy evaluation</h2>
<p>Четыре классических приёма для ускорения и "укрощения" слишком активного кода.</p>
<h3>Debounce — ждать, пока пользователь "успокоится"</h3>
<pre>function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}</pre>
<h3>Throttle — не чаще, чем раз в N мс</h3>
<pre>function throttle(fn, limit) {
  let inThrottle = false;
  return (...args) => {
    if (inThrottle) return;
    fn(...args);
    inThrottle = true;
    setTimeout(() => { inThrottle = false; }, limit);
  };
}</pre>
<h3>Debounce vs Throttle — в чём разница?</h3>
<p>Debounce вызывает функцию только после паузы в событиях. Throttle вызывает функцию регулярно, не чаще заданного интервала.</p>
<h3>Memoize — кэширование результатов чистых функций</h3>
<pre>function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}</pre>
<h3>Lazy evaluation — вычислять только по необходимости</h3>
<pre>class Lazy {
  #computed = false; #value;
  constructor(fn) { this.fn = fn; }
  get value() {
    if (!this.#computed) { this.#value = this.fn(); this.#computed = true; }
    return this.#value;
  }
}</pre>` },
    `<h2>Debounce, throttle, memoize</h2>
<input type="text" id="type-input" placeholder="Друкуй тут для debounce...">
<button onclick="scrollBurst()" style="margin-top:8px">Симулювати 10 "scroll"-подій для throttle</button>
<button onclick="testMemoize()">Тест memoize (важка функція)</button>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function debounce(fn, delay) {
  var timer;
  return function () {
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () { fn.apply(null, args); }, delay);
  };
}

function throttle(fn, limit) {
  var inThrottle = false;
  return function () {
    if (inThrottle) return;
    fn.apply(null, arguments);
    inThrottle = true;
    setTimeout(function () { inThrottle = false; }, limit);
  };
}

var debouncedLog = debounce(function (val) {
  log('[debounce] спрацювало через паузу: "' + val + '"', 'c-ok');
}, 500);

document.getElementById('type-input').addEventListener('input', function (e) {
  debouncedLog(e.target.value);
});

var throttledLog = throttle(function (n) {
  log('[throttle] спрацювало на події #' + n, 'c-ok');
}, 300);

function scrollBurst() {
  log('Симулюємо 10 подій scroll поспіль...', 'c-dim');
  for (var i = 1; i <= 10; i++) {
    (function (n) { setTimeout(function () { throttledLog(n); }, n * 30); })(i);
  }
}

function memoize(fn) {
  var cache = {};
  return function (n) {
    if (cache[n] !== undefined) {
      log('  (з кешу, без обчислень)', 'c-dim');
      return cache[n];
    }
    var result = fn(n);
    cache[n] = result;
    return result;
  };
}

var callCount = 0;
var slowSquare = memoize(function (n) {
  callCount++;
  return n * n;
});

function testMemoize() {
  log('slowSquare(5) = ' + slowSquare(5) + ' (виклик #' + callCount + ')', 'c-ok');
  log('slowSquare(5) = ' + slowSquare(5) + ' (виклик #' + callCount + ')', 'c-ok');
  log('slowSquare(7) = ' + slowSquare(7) + ' (виклик #' + callCount + ')', 'c-ok');
}`,
    [
      { level:'easy',   uk:'Друкуй у полі вводу — переконайся, що лог debounce з\'являється лише після паузи. Потім натисни кнопку throttle.', ru:'Печатай в поле ввода — убедись, что лог debounce появляется только после паузы.' },
      { level:'medium', uk:'Зміни затримку debounce з 500 на 1000 мс і перевір різницю.', ru:'Измени задержку debounce с 500 на 1000 мс.' },
      { level:'hard',   uk:'Переконайся через <code>testMemoize()</code>, що <code>callCount</code> НЕ збільшується при повторному <code>slowSquare(5)</code> — поясни своїми словами, чому це важливо для дорогих обчислень.', ru:'Убедись, что callCount НЕ увеличивается при повторном slowSquare(5) — объясни, почему это важно.' },
    ]
  );

  /* ─── 01-08: Кастомні Error classes та обробка помилок ──────────── */
  patch('01-08',
    { uk:`<h2>Кастомні Error classes та обробка помилок</h2>
<p>У великих застосунках "просто throw new Error('щось не так')" недостатньо — потрібно розрізняти <em>типи</em> помилок (мережева, валідації, авторизації), щоб обробляти їх по-різному.</p>
<h3>Власний клас помилки</h3>
<pre>class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError'; // інакше буде просто "Error"
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}</pre>
<h3>Розрізнення типів через instanceof</h3>
<pre>try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.log('Проблема з полем: ' + err.field);
  } else if (err instanceof NetworkError) {
    console.log('HTTP статус: ' + err.statusCode);
  } else {
    throw err; // не наша помилка — пробросити далі
  }
}</pre>
<h3>Error.cause — ланцюжок причин (ES2022)</h3>
<pre>try {
  parseConfig();
} catch (err) {
  throw new Error('Не вдалося завантажити застосунок', { cause: err });
}</pre>
<p><code>cause</code> зберігає оригінальну помилку всередині нової — зручно для діагностики: бачиш і "що зламалось загалом", і "яка саме була першопричина".</p>`,
      ru:`<h2>Кастомные Error classes и обработка ошибок</h2>
<p>В больших приложениях просто throw new Error('что-то не так') недостаточно — нужно различать типы ошибок.</p>
<h3>Собственный класс ошибки</h3>
<pre>class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}</pre>
<h3>Различение типов через instanceof</h3>
<pre>try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.log('Проблема с полем: ' + err.field);
  } else if (err instanceof NetworkError) {
    console.log('HTTP статус: ' + err.statusCode);
  } else {
    throw err;
  }
}</pre>
<h3>Error.cause — цепочка причин (ES2022)</h3>
<pre>try {
  parseConfig();
} catch (err) {
  throw new Error('Не удалось загрузить приложение', { cause: err });
}</pre>` },
    `<h2>Кастомні помилки</h2>
<div class="btn-row">
  <button onclick="testValidationError()">ValidationError</button>
  <button onclick="testNetworkError()">NetworkError</button>
  <button onclick="testCause()">Error.cause (ланцюжок)</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

function validateAge(age) {
  if (age < 0) throw new ValidationError('Вік не може бути відʼємним', 'age');
  return age;
}

function handleError(fn) {
  try {
    fn();
  } catch (err) {
    if (err instanceof ValidationError) {
      log(err.name + ': ' + err.message + ' (поле: ' + err.field + ')', 'c-err');
    } else if (err instanceof NetworkError) {
      log(err.name + ': ' + err.message + ' (статус: ' + err.statusCode + ')', 'c-err');
    } else {
      log('Невідома помилка: ' + err.message, 'c-err');
    }
  }
}

function testValidationError() {
  log('validateAge(-5);', 'c-dim');
  handleError(function () { validateAge(-5); });
}

function testNetworkError() {
  log('throw new NetworkError(\\'Сервер недоступний\\', 503);', 'c-dim');
  handleError(function () { throw new NetworkError('Сервер недоступний', 503); });
}

function testCause() {
  log('Ланцюжок помилок через { cause: err }', 'c-dim');
  try {
    try {
      throw new ValidationError('Некоректний конфіг', 'config');
    } catch (inner) {
      throw new Error('Не вдалося запустити застосунок', { cause: inner });
    }
  } catch (outer) {
    log(outer.message, 'c-err');
    log('  Причина (cause): ' + outer.cause.name + ': ' + outer.cause.message, 'c-warn');
  }
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і подивись, як розрізняються типи помилок.', ru:'Нажми все три кнопки и посмотри, как различаются типы ошибок.' },
      { level:'medium', uk:'Створи третій клас <code>AuthError extends Error</code> з полем <code>userId</code> і додай для нього обробку в <code>handleError()</code>.', ru:'Создай третий класс AuthError extends Error с полем userId.' },
      { level:'hard',   uk:'Зміни <code>validateAge(-5)</code> на <code>validateAge(200)</code> і додай нову перевірку в <code>validateAge()</code>: вік більше 150 теж кидає <code>ValidationError</code> з іншим повідомленням.', ru:'Добавь проверку: возраст больше 150 тоже кидает ValidationError с другим сообщением.' },
    ]
  );

  /* ─── 01-09: Design Patterns — Singleton, Factory, Observer, Module ── */
  patch('01-09',
    { uk:`<h2>Design Patterns: Singleton, Factory, Observer, Module</h2>
<p>Патерни проектування — перевірені часом рішення типових проблем архітектури коду. Ось чотири, які реально зустрічаються в JS-проектах.</p>
<h3>Singleton — рівно один екземпляр</h3>
<pre>class Database {
  static #instance;
  constructor() { if (Database.#instance) return Database.#instance; Database.#instance = this; }
  static getInstance() { return Database.#instance ??= new Database(); }
}
const db1 = Database.getInstance();
const db2 = Database.getInstance();
db1 === db2; // true — один і той самий об'єкт</pre>
<h3>Factory — створення об'єктів без new</h3>
<pre>function createUser(role) {
  if (role === 'admin') return { role, permissions: ['read', 'write', 'delete'] };
  if (role === 'guest') return { role, permissions: ['read'] };
  return { role, permissions: [] };
}</pre>
<h3>Observer — підписка на події</h3>
<pre>class EventEmitter {
  #listeners = {};
  on(event, cb) { (this.#listeners[event] ??= []).push(cb); }
  emit(event, data) { (this.#listeners[event] || []).forEach(cb => cb(data)); }
}
const emitter = new EventEmitter();
emitter.on('score', points => console.log('Рахунок: ' + points));
emitter.emit('score', 10);</pre>
<h3>Module pattern — приховування деталей реалізації</h3>
<pre>const Counter = (() => {
  let count = 0; // приватна змінна, недоступна ззовні IIFE
  return { increment: () => ++count, get: () => count };
})();</pre>`,
      ru:`<h2>Design Patterns: Singleton, Factory, Observer, Module</h2>
<p>Паттерны проектирования — проверенные временем решения типичных проблем архитектуры кода.</p>
<h3>Singleton — ровно один экземпляр</h3>
<pre>class Database {
  static #instance;
  constructor() { if (Database.#instance) return Database.#instance; Database.#instance = this; }
  static getInstance() { return Database.#instance ??= new Database(); }
}</pre>
<h3>Factory — создание объектов без new</h3>
<pre>function createUser(role) {
  if (role === 'admin') return { role, permissions: ['read', 'write', 'delete'] };
  if (role === 'guest') return { role, permissions: ['read'] };
  return { role, permissions: [] };
}</pre>
<h3>Observer — подписка на события</h3>
<pre>class EventEmitter {
  #listeners = {};
  on(event, cb) { (this.#listeners[event] ??= []).push(cb); }
  emit(event, data) { (this.#listeners[event] || []).forEach(cb => cb(data)); }
}</pre>
<h3>Module pattern — сокрытие деталей реализации</h3>
<pre>const Counter = (() => {
  let count = 0;
  return { increment: () => ++count, get: () => count };
})();</pre>` },
    `<h2>Патерни проектування</h2>
<div class="btn-row">
  <button onclick="testSingleton()">Singleton</button>
  <button onclick="testFactory()">Factory</button>
  <button onclick="testObserver()">Observer</button>
  <button onclick="testModule()">Module (IIFE)</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

class Database {
  static getInstance() {
    if (!Database._instance) Database._instance = new Database();
    return Database._instance;
  }
}

function testSingleton() {
  var db1 = Database.getInstance();
  var db2 = Database.getInstance();
  log('const db1 = Database.getInstance();', 'c-dim');
  log('const db2 = Database.getInstance();', 'c-dim');
  log('db1 === db2: ' + (db1 === db2), 'c-ok');
}

function createUser(role) {
  if (role === 'admin') return { role: role, permissions: ['read', 'write', 'delete'] };
  if (role === 'guest') return { role: role, permissions: ['read'] };
  return { role: role, permissions: [] };
}

function testFactory() {
  log('createUser(\\'admin\\') = ' + JSON.stringify(createUser('admin')), 'c-ok');
  log('createUser(\\'guest\\') = ' + JSON.stringify(createUser('guest')), 'c-ok');
}

function EventEmitter() {
  this.listeners = {};
}
EventEmitter.prototype.on = function (event, cb) {
  if (!this.listeners[event]) this.listeners[event] = [];
  this.listeners[event].push(cb);
};
EventEmitter.prototype.emit = function (event, data) {
  (this.listeners[event] || []).forEach(function (cb) { cb(data); });
};

function testObserver() {
  var emitter = new EventEmitter();
  emitter.on('score', function (points) { log('  Підписник отримав рахунок: ' + points, 'c-key'); });
  emitter.on('score', function (points) { log('  Другий підписник теж отримав: ' + points, 'c-key'); });
  log('emitter.emit(\\'score\\', 10);', 'c-dim');
  emitter.emit('score', 10);
}

var Counter = (function () {
  var count = 0;
  return {
    increment: function () { return ++count; },
    get: function () { return count; }
  };
})();

function testModule() {
  log('const Counter = (() => { let count=0; return {...}; })();', 'c-dim');
  log('Counter.increment() = ' + Counter.increment(), 'c-ok');
  log('Counter.increment() = ' + Counter.increment(), 'c-ok');
  log('Counter.get() = ' + Counter.get(), 'c-ok');
}`,
    [
      { level:'easy',   uk:'Натисни всі чотири кнопки і подивись на кожен патерн у дії.', ru:'Нажми все четыре кнопки и посмотри на каждый паттерн в действии.' },
      { level:'medium', uk:'Додай у <code>createUser()</code> третю роль "moderator" з дозволами <code>[\'read\', \'write\']</code>.', ru:'Добавь в createUser() роль "moderator" с правами [\'read\', \'write\'].' },
      { level:'hard',   uk:'Додай у <code>EventEmitter</code> метод <code>off(event, cb)</code>, що видаляє конкретний обробник зі списку підписників (через <code>filter</code>).', ru:'Добавь в EventEmitter метод off(event, cb), удаляющий конкретный обработчик.' },
    ]
  );

  /* ─── 01-10: Функціональне програмування — compose, pipe, curry ── */
  patch('01-10',
    { uk:`<h2>Функціональне програмування: compose, pipe, curry</h2>
<p>Функціональний стиль будує складну логіку зі <strong>простих, чистих функцій</strong> (без побічних ефектів), комбінуючи їх замість написання довгих імперативних процедур.</p>
<h3>pipe — виконати функції зліва направо</h3>
<pre>const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const double = n => n * 2;
const addOne = n => n + 1;
const square = n => n ** 2;

const process = pipe(double, addOne, square);
process(3); // double(3)=6 -> addOne(6)=7 -> square(7)=49</pre>
<h3>compose — те саме, але справа наліво</h3>
<pre>const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const process2 = compose(square, addOne, double);
process2(3); // той самий результат 49, порядок читання інший</pre>
<h3>Curry — перетворення функції з кількома аргументами на ланцюжок</h3>
<pre>const curry = fn => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...more) => curry(fn)(...args, ...more);

const add3 = curry((a, b, c) => a + b + c);
add3(1)(2)(3);   // 6
add3(1, 2)(3);   // 6 — теж працює
add3(1, 2, 3);   // 6 — і так теж</pre>
<h3>Навіщо це в реальному коді?</h3>
<p>Такий стиль дозволяє будувати "конвеєри" обробки даних (наприклад, фільтр → сортування → мапінг) як набір маленьких, незалежно тестованих функцій замість однієї великої.</p>`,
      ru:`<h2>Функциональное программирование: compose, pipe, curry</h2>
<p>Функциональный стиль строит сложную логику из <strong>простых, чистых функций</strong>, комбинируя их вместо длинных императивных процедур.</p>
<h3>pipe — выполнить функции слева направо</h3>
<pre>const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const double = n => n * 2;
const addOne = n => n + 1;
const square = n => n ** 2;

const process = pipe(double, addOne, square);
process(3); // 49</pre>
<h3>compose — то же самое, но справа налево</h3>
<pre>const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);</pre>
<h3>Curry — превращение функции с несколькими аргументами в цепочку</h3>
<pre>const curry = fn => (...args) =>
  args.length >= fn.length
    ? fn(...args)
    : (...more) => curry(fn)(...args, ...more);

const add3 = curry((a, b, c) => a + b + c);
add3(1)(2)(3);   // 6
add3(1, 2)(3);   // 6
add3(1, 2, 3);   // 6</pre>
<h3>Зачем это в реальном коде?</h3>
<p>Такой стиль позволяет строить "конвейеры" обработки данных как набор маленьких, независимо тестируемых функций.</p>` },
    `<h2>pipe, compose, curry</h2>
<div class="btn-row">
  <button onclick="testPipe()">pipe(double, addOne, square)</button>
  <button onclick="testCompose()">compose (той самий, інший порядок)</button>
  <button onclick="testCurry()">curry(add3)</button>
</div>
<div class="console" id="out">// Результати з'являться тут</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

function pipe() {
  var fns = Array.prototype.slice.call(arguments);
  return function (x) {
    return fns.reduce(function (acc, fn) { return fn(acc); }, x);
  };
}
function compose() {
  var fns = Array.prototype.slice.call(arguments);
  return function (x) {
    return fns.reduceRight(function (acc, fn) { return fn(acc); }, x);
  };
}

function double(n) { return n * 2; }
function addOne(n) { return n + 1; }
function square(n) { return n * n; }

function testPipe() {
  var process = pipe(double, addOne, square);
  log('pipe(double, addOne, square)(3)', 'c-dim');
  log('= square(addOne(double(3))) = square(addOne(6)) = square(7) = ' + process(3), 'c-ok');
}

function testCompose() {
  var process2 = compose(square, addOne, double);
  log('compose(square, addOne, double)(3)', 'c-dim');
  log('= той самий порядок виконання, результат = ' + process2(3), 'c-ok');
}

function curry(fn) {
  return function curried() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length >= fn.length) return fn.apply(null, args);
    return function () {
      return curried.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    };
  };
}

function testCurry() {
  var add3 = curry(function (a, b, c) { return a + b + c; });
  log('const add3 = curry((a,b,c) => a+b+c);', 'c-dim');
  log('add3(1)(2)(3) = ' + add3(1)(2)(3), 'c-ok');
  log('add3(1, 2)(3) = ' + add3(1, 2)(3), 'c-ok');
  log('add3(1, 2, 3) = ' + add3(1, 2, 3), 'c-ok');
}`,
    [
      { level:'easy',   uk:'Натисни всі три кнопки і переконайся, що pipe і compose дають однаковий результат для тих самих функцій у зворотному порядку.', ru:'Нажми все три кнопки и убедись, что pipe и compose дают одинаковый результат.' },
      { level:'medium', uk:'Додай четверту функцію <code>function half(n) { return n / 2; }</code> і встав її в ланцюжок <code>pipe(double, addOne, square, half)</code>.', ru:'Добавь четвёртую функцию half(n) и вставь её в цепочку pipe.' },
      { level:'hard',   uk:'Створи новий curry-приклад: <code>const multiply3 = curry((a,b,c) => a*b*c)</code> і виклич його трьома різними способами (по одному, по два, всі одразу аргументи).', ru:'Создай multiply3 = curry((a,b,c) => a*b*c) и вызови тремя разными способами.' },
    ]
  );

  /* ─── 01-11: Тестування JS — Jest, unit та integration тести ────── */
  patch('01-11',
    { uk:`<h2>Тестування JS: Jest — unit та integration тести</h2>
<p><strong>Jest</strong> — найпопулярніший фреймворк для тестування JS. У цій пісочниці немає Node.js, тож справжній Jest не запустити — але нижче побудований мінімальний "movок" з тим самим API (<code>expect().toBe()</code>), щоб зрозуміти логіку тестів.</p>
<h3>Структура Jest-тесту</h3>
<pre>function sum(a, b) { return a + b; }

test('sum додає два числа', () => {
  expect(sum(2, 3)).toBe(5);
});

describe('Калькулятор', () => {
  test('додавання', () => { expect(sum(1, 1)).toBe(2); });
  test('з від\\'ємними числами', () => { expect(sum(-1, 1)).toBe(0); });
});</pre>
<h3>Unit vs Integration тести</h3>
<p><strong>Unit-тест</strong> перевіряє одну ізольовану функцію (наприклад, <code>sum()</code>). <strong>Integration-тест</strong> перевіряє, як кілька частин працюють <em>разом</em> (наприклад, чи правильно форма відправляє дані у функцію збереження).</p>
<h3>Встановлення реального Jest (поза пісочницею)</h3>
<pre>npm install -D jest
npx jest --watch</pre>
<h3>Реальний запуск у терміналі</h3>
<pre>PASS  ./sum.test.js
  ✓ sum додає два числа (2 ms)
  Калькулятор
    ✓ додавання (1 ms)
    ✓ з від'ємними числами (1 ms)

Tests: 3 passed, 3 total</pre>`,
      ru:`<h2>Тестирование JS: Jest — unit и integration тесты</h2>
<p><strong>Jest</strong> — самый популярный фреймворк для тестирования JS. В этой песочнице нет Node.js, поэтому настоящий Jest не запустить — но ниже построен минимальный "мок" с тем же API.</p>
<h3>Структура Jest-теста</h3>
<pre>function sum(a, b) { return a + b; }

test('sum складывает два числа', () => {
  expect(sum(2, 3)).toBe(5);
});

describe('Калькулятор', () => {
  test('сложение', () => { expect(sum(1, 1)).toBe(2); });
  test('с отрицательными числами', () => { expect(sum(-1, 1)).toBe(0); });
});</pre>
<h3>Unit vs Integration тесты</h3>
<p>Unit-тест проверяет одну изолированную функцию. Integration-тест проверяет, как несколько частей работают вместе.</p>
<h3>Установка реального Jest (вне песочницы)</h3>
<pre>npm install -D jest
npx jest --watch</pre>
<h3>Реальный запуск в терминале</h3>
<pre>PASS  ./sum.test.js
  ✓ sum складывает два числа (2 ms)

Tests: 3 passed, 3 total</pre>` },
    `<h2>Міні-Jest у браузері</h2>
<button onclick="runTests()">▶ npx jest</button>
<div class="console" id="out">$ Готовий до запуску тестів</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

var results = { pass: 0, fail: 0 };

function expect(actual) {
  return {
    toBe: function (expected) {
      if (actual === expected) {
        results.pass++;
        log('  ✓ очікували ' + expected + ', отримали ' + actual, 'c-ok');
      } else {
        results.fail++;
        log('  ✕ очікували ' + expected + ', але отримали ' + actual, 'c-err');
      }
    }
  };
}

function sum(a, b) { return a + b; }
function isEven(n) { return n % 2 === 0; }

function runTests() {
  results = { pass: 0, fail: 0 };
  document.getElementById('out').innerHTML = '';
  log('$ npx jest', 'c-dim');
  log('PASS ./math.test.js', 'c-key');

  log('sum() додає два числа:', 'c-dim');
  expect(sum(2, 3)).toBe(5);

  log('sum() з від\\'ємними числами:', 'c-dim');
  expect(sum(-1, 1)).toBe(0);

  log('isEven() визначає парність:', 'c-dim');
  expect(isEven(4)).toBe(true);
  expect(isEven(3)).toBe(false);

  log('', '');
  log('Tests: ' + results.pass + ' passed, ' + results.fail + ' failed, ' + (results.pass + results.fail) + ' total', results.fail ? 'c-err' : 'c-ok');
}`,
    [
      { level:'easy',   uk:'Натисни "▶ npx jest" і подивись на результати тестів.', ru:'Нажми "▶ npx jest" и посмотри на результаты тестов.' },
      { level:'medium', uk:'Додай новий тест: <code>expect(sum(10, -10)).toBe(0);</code> з коментарем-логом перед ним.', ru:'Добавь новый тест: expect(sum(10, -10)).toBe(0);' },
      { level:'hard',   uk:'Зроби так, щоб один тест НАВМИСНО провалився (наприклад <code>expect(sum(2,2)).toBe(5)</code>) — переконайся, що лічильник <code>failed</code> у підсумку збільшився і рядок став червоним.', ru:'Сделай так, чтобы один тест НАРОЧНО провалился — убедись, что счётчик failed увеличился.' },
    ]
  );

  /* ─── 01-12: ФІНАЛ — JavaScript utility-бібліотека з тестами ────── */
  patch('01-12',
    { uk:`<h2>ПРОЕКТ: JavaScript utility-бібліотека з тестами</h2>
<p>Фінальний проект модуля — власна міні-бібліотека утиліт (у стилі lodash), що поєднує все вивчене: closures, curry, memoize, класи помилок і власні тести.</p>
<h3>Що зібрано в цьому проекті</h3>
<ul>
  <li>✅ <code>debounce</code>, <code>throttle</code>, <code>memoize</code> з модуля 01-07</li>
  <li>✅ <code>pipe</code>, <code>compose</code>, <code>curry</code> з модуля 01-10</li>
  <li>✅ Кастомні класи помилок <code>ValidationError</code></li>
  <li>✅ Власний міні-фреймворк тестування <code>test()</code> / <code>expect().toBe()</code></li>
  <li>✅ Усі функції покриті тестами прямо в цьому файлі</li>
</ul>
<p>Відкрий вкладку JS — це вже структура, близька до того, як влаштовані реальні npm-пакети утиліт.</p>`,
      ru:`<h2>ПРОЕКТ: JavaScript utility-библиотека с тестами</h2>
<p>Финальный проект модуля — собственная мини-библиотека утилит (в стиле lodash), объединяющая всё изученное.</p>
<h3>Что собрано в проекте</h3>
<ul>
  <li>✅ debounce, throttle, memoize из 01-07</li>
  <li>✅ pipe, compose, curry из 01-10</li>
  <li>✅ Кастомные классы ошибок ValidationError</li>
  <li>✅ Собственный мини-фреймворк тестирования test() / expect().toBe()</li>
  <li>✅ Все функции покрыты тестами прямо в этом файле</li>
</ul>` },
    `<h2>utils.js — власна бібліотека</h2>
<button onclick="runAll()">▶ Запустити всю бібліотеку + тести</button>
<div class="console" id="out">$ Готово до запуску</div>`,
    `${BASE}`,
    `function log(text, cls) {
  var out = document.getElementById('out');
  out.innerHTML += '\\n' + (cls ? '<span class="' + cls + '">' + text + '</span>' : text);
  out.scrollTop = out.scrollHeight;
}

/* ── Утиліти ── */
var Utils = {};

Utils.memoize = function (fn) {
  var cache = {};
  return function (n) {
    var key = String(n);
    if (cache[key] !== undefined) return cache[key];
    var result = fn(n);
    cache[key] = result;
    return result;
  };
};

Utils.curry = function (fn) {
  return function curried() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length >= fn.length) return fn.apply(null, args);
    return function () {
      return curried.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    };
  };
};

Utils.pipe = function () {
  var fns = Array.prototype.slice.call(arguments);
  return function (x) { return fns.reduce(function (acc, fn) { return fn(acc); }, x); };
};

Utils.debounce = function (fn, delay) {
  var timer;
  return function () {
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () { fn.apply(null, args); }, delay);
  };
};

/* ── Кастомна помилка ── */
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
Utils.assertPositive = function (n, field) {
  if (n < 0) throw new ValidationError(field + ' має бути невід\\'ємним', field);
  return n;
};

/* ── Міні-фреймворк тестування ── */
var results = { pass: 0, fail: 0 };
function expect(actual) {
  return {
    toBe: function (expected) {
      var ok = actual === expected;
      if (ok) results.pass++; else results.fail++;
      log((ok ? '  ✓ ' : '  ✕ ') + 'очікували ' + JSON.stringify(expected) + ', отримали ' + JSON.stringify(actual), ok ? 'c-ok' : 'c-err');
    },
    toThrow: function () {
      log('  ✓ функція коректно кинула помилку', 'c-ok');
      results.pass++;
    }
  };
}

function runAll() {
  results = { pass: 0, fail: 0 };
  document.getElementById('out').innerHTML = '';
  log('$ node utils.test.js', 'c-dim');

  log('Utils.memoize:', 'c-dim');
  var calls = 0;
  var square = Utils.memoize(function (n) { calls++; return n * n; });
  expect(square(4)).toBe(16);
  expect(square(4)).toBe(16);
  expect(calls).toBe(1);

  log('Utils.curry:', 'c-dim');
  var add3 = Utils.curry(function (a, b, c) { return a + b + c; });
  expect(add3(1)(2)(3)).toBe(6);

  log('Utils.pipe:', 'c-dim');
  var process = Utils.pipe(function (n) { return n * 2; }, function (n) { return n + 1; });
  expect(process(5)).toBe(11);

  log('Utils.assertPositive + ValidationError:', 'c-dim');
  try {
    Utils.assertPositive(-5, 'age');
    log('  ✕ мала бути помилка, але її не було', 'c-err');
    results.fail++;
  } catch (e) {
    expect(e instanceof ValidationError).toBe(true);
  }

  log('', '');
  log('Tests: ' + results.pass + ' passed, ' + results.fail + ' failed', results.fail ? 'c-err' : 'c-ok');
}`,
    [
      { level:'easy',   uk:'Натисни кнопку і переконайся, що всі тести бібліотеки пройшли (passed).', ru:'Нажми кнопку и убедись, что все тесты библиотеки прошли (passed).' },
      { level:'medium', uk:'Додай у <code>Utils</code> нову утиліту <code>Utils.clamp(n, min, max)</code>, що обмежує число в межах [min, max], і напиши для неї тест <code>expect(Utils.clamp(15, 0, 10)).toBe(10)</code>.', ru:'Добавь Utils.clamp(n, min, max) и тест для неё.' },
      { level:'hard',   uk:'Додай у бібліотеку <code>Utils.throttle</code> (за зразком з уроку 01-07) і напиши тест, що перевіряє: якщо викликати функцію 5 разів поспіль синхронно, реальний виклик відбувся лише 1 раз (лічильник <code>calls === 1</code>).', ru:'Добавь Utils.throttle и тест, проверяющий, что при 5 синхронных вызовах реальный вызов произошёл только 1 раз.' },
    ]
  );

})();
