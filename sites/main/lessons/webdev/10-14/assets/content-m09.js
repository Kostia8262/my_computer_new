/* ═══════════════════════════════════════════════════════════════
   Контент · Модуль 09 — CSS Архітектура + Bootstrap · 10–14
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
code{background:#1e293b;border:1px solid #334155;border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#7dd3fc}`;

  /* ─── 09-01: BEM ─────────────────────────────────────────── */
  patch('09-01',
    { uk:`<h2>BEM: Блок__Елемент--Модифікатор</h2>
<p>Коли CSS-класів стає багато, легко заплутатись: <code>.title</code>, <code>.title-2</code>, <code>.red-title</code>... <strong>BEM</strong> (Block Element Modifier) — це домовленість про іменування класів, яка робить структуру зрозумілою просто з назви класу, без погляду на HTML.</p>
<h3>Три частини</h3>
<pre>.card            → Блок (незалежний, самодостатній компонент)
.card__title     → Елемент (частина блоку, через два підкреслення __)
.card--featured  → Модифікатор (варіант блоку, через два дефіси --)
.card__title--accent → модифікатор елемента</pre>
<h3>Головне правило BEM</h3>
<p>Кожен клас — <strong>плаский і самодостатній</strong>. Ти ніколи не пишеш <code>.card .title</code> або <code>.card > div > span</code>. Замість вкладених селекторів — окремий клас на кожному елементі:</p>
<pre>&lt;div class="card card--featured"&gt;
  &lt;img class="card__image"&gt;
  &lt;h3 class="card__title"&gt;...&lt;/h3&gt;
  &lt;button class="card__button card__button--primary"&gt;...&lt;/button&gt;
&lt;/div&gt;</pre>
<h3>Навіщо це?</h3>
<ul>
  <li>Назва класу одразу каже, що це і до чого належить — не треба лізти в HTML.</li>
  <li>Немає "війни специфічності" — всі селектори мають однакову вагу (один клас).</li>
  <li>Стилі блоку не "протікають" на інші блоки, навіть якщо він вкладений в інший.</li>
</ul>`,
      ru:`<h2>BEM: Блок__Элемент--Модификатор</h2>
<p>Когда CSS-классов становится много, легко запутаться: <code>.title</code>, <code>.title-2</code>, <code>.red-title</code>... <strong>BEM</strong> (Block Element Modifier) — соглашение об именовании классов, которое делает структуру понятной прямо из названия класса.</p>
<h3>Три части</h3>
<pre>.card            → Блок (независимый, самодостаточный компонент)
.card__title     → Элемент (часть блока, через два подчёркивания __)
.card--featured  → Модификатор (вариант блока, через два дефиса --)
.card__title--accent → модификатор элемента</pre>
<h3>Главное правило BEM</h3>
<p>Каждый класс — <strong>плоский и самодостаточный</strong>. Никогда не пишешь <code>.card .title</code> или <code>.card > div > span</code>. Вместо вложенных селекторов — отдельный класс на каждом элементе.</p>
<h3>Зачем это?</h3>
<ul>
  <li>Имя класса сразу говорит, что это и к чему принадлежит.</li>
  <li>Нет "войны специфичности" — все селекторы одного веса (один класс).</li>
  <li>Стили блока не "протекают" на другие блоки, даже если он вложен в другой.</li>
</ul>` },
    `<div class="cards">
  <div class="card card--featured" id="card1">
    <div class="card__badge">🔥 Хіт</div>
    <div class="card__image">🎮</div>
    <div class="card__body">
      <h3 class="card__title">Ігрова миша Pro</h3>
      <p class="card__text">RGB-підсвітка, 8 кнопок, сенсор 16000 DPI.</p>
      <div class="card__footer">
        <span class="card__price">899 ₴</span>
        <button class="card__button card__button--primary">Купити</button>
      </div>
    </div>
  </div>

  <div class="card" id="card2">
    <div class="card__image">⌨️</div>
    <div class="card__body">
      <h3 class="card__title">Клавіатура Mini</h3>
      <p class="card__text">Компактна механічна клавіатура, 60%.</p>
      <div class="card__footer">
        <span class="card__price">1299 ₴</span>
        <button class="card__button card__button--ghost">До кошика</button>
      </div>
    </div>
  </div>
</div>

<button id="toggle-btn" style="margin-top:16px">⭐ Toggle card--featured на другій картці</button>`,
    `${BASE}
.cards{display:flex;gap:14px;flex-wrap:wrap}
.card{position:relative;width:200px;background:#1e293b;border:1px solid #334155;border-radius:14px;overflow:hidden}
.card--featured{border-color:#f59e0b;box-shadow:0 0 0 1px #f59e0b}
.card__badge{position:absolute;top:8px;right:8px;background:#f59e0b;color:#1a1a2e;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px}
.card__image{height:90px;display:flex;align-items:center;justify-content:center;font-size:38px;background:#0f172a}
.card__body{padding:12px}
.card__title{font-size:14px;color:#fff;margin-bottom:4px}
.card__text{font-size:12px;color:#94a3b8;line-height:1.4;margin-bottom:10px}
.card__footer{display:flex;align-items:center;justify-content:space-between}
.card__price{font-size:14px;font-weight:700;color:#4ade80}
.card__button{padding:6px 12px;border-radius:8px;font-size:12px;border:1px solid #334155;cursor:pointer}
.card__button--primary{background:#f59e0b;color:#1a1a2e;font-weight:700;border:none}
.card__button--ghost{background:transparent;color:#e2e8f0}`,
    `document.getElementById('toggle-btn').addEventListener('click', () => {
  document.getElementById('card2').classList.toggle('card--featured');
});`,
    [
      { level:'easy',   uk:'Зміни назву товару (card__title) і ціну (card__price) у першій картці.', ru:'Измени название товара (card__title) и цену (card__price) в первой карточке.' },
      { level:'easy',   uk:'Натисни кнопку "Toggle" внизу і подивись, як клас-модифікатор --featured змінює вигляд другої картки без жодного рядка нового HTML.', ru:'Нажми кнопку "Toggle" внизу и посмотри, как класс-модификатор --featured меняет вид второй карточки без единой строки нового HTML.' },
      { level:'medium', uk:'Додай новий модифікатор <code>.card--sold-out</code> (сіра, opacity:.5, курсор not-allowed) і застосуй його до другої картки.', ru:'Добавь новый модификатор <code>.card--sold-out</code> (серая, opacity:.5, курсор not-allowed) и примени ко второй карточке.' },
      { level:'hard',   uk:'Ось "поганий" CSS без BEM: <code>.block .item.big span{color:red}</code>. Перепиши цей фрагмент розмітки і стилів за правилами BEM — придумай блок/елемент/модифікатор.', ru:'Вот "плохой" CSS без BEM: <code>.block .item.big span{color:red}</code>. Перепиши эту разметку и стили по правилам BEM.' },
    ]
  );

  /* ─── 09-02: SCSS змінні, вкладеність, & ────────────────────── */
  patch('09-02',
    { uk:`<h2>SCSS: змінні, вкладеність та ampersand &</h2>
<p><strong>SCSS (Sass)</strong> — це "розширений CSS": ти пишеш файл <code>.scss</code>, а спеціальний компілятор (Dart Sass, або збірник типу Vite — побачимо в модулі 10) перетворює його на звичайний <code>.css</code>, який розуміє браузер. У нашій оболонці немає SCSS-компілятора, тому нижче показано вихідний SCSS і поруч — вже <strong>скомпільований CSS</strong>, який реально виконується в редакторі.</p>
<h3>Змінні $</h3>
<pre>// SCSS
$primary: #6366f1;
$radius: 10px;

.btn { background: $primary; border-radius: $radius; }
.link { color: $primary; }</pre>
<h3>Вкладеність та &</h3>
<pre>// SCSS
.nav {
  display: flex;
  & > li { list-style: none; }
  &:hover { opacity: .9; }
  &.active { font-weight: 700; }
}

/* Компілюється у: */
.nav { display: flex; }
.nav > li { list-style: none; }
.nav:hover { opacity: .9; }
.nav.active { font-weight: 700; }</pre>
<p>Символ <code>&</code> означає "батьківський селектор". Це дозволяє писати hover/active стани та вкладені елементи не виходячи за межі блоку <code>{ }</code>.</p>
<h3>Головна проблема без змінних</h3>
<p>Подивись на CSS праворуч: колір <code>#6366f1</code> повторюється 4 рази. Якщо дизайнер попросить змінити фірмовий колір — доведеться міняти вручну у кожному місці. У SCSS достатньо змінити <code>$primary</code> один раз.</p>`,
      ru:`<h2>SCSS: переменные, вложенность и ampersand &</h2>
<p><strong>SCSS (Sass)</strong> — это "расширенный CSS": пишешь файл <code>.scss</code>, а компилятор (Dart Sass, или сборщик типа Vite — увидим в модуле 10) превращает его в обычный <code>.css</code>. В нашей оболочке нет SCSS-компилятора, поэтому ниже показан исходный SCSS, а рядом — уже <strong>скомпилированный CSS</strong>, который реально выполняется.</p>
<h3>Переменные $</h3>
<pre>$primary: #6366f1;
$radius: 10px;
.btn { background: $primary; border-radius: $radius; }</pre>
<h3>Вложенность и &</h3>
<pre>.nav {
  & > li { list-style: none; }
  &:hover { opacity: .9; }
  &.active { font-weight: 700; }
}
/* Компилируется в: */
.nav > li { list-style: none; }
.nav:hover { opacity: .9; }
.nav.active { font-weight: 700; }</pre>
<h3>Главная проблема без переменных</h3>
<p>Цвет <code>#6366f1</code> справа повторяется 4 раза. Если дизайнер попросит поменять фирменный цвет — придётся искать вручную. В SCSS достаточно поменять <code>$primary</code> один раз.</p>` },
    `<nav class="nav">
  <li class="nav__item nav__item--active">Головна</li>
  <li class="nav__item">Каталог</li>
  <li class="nav__item">Про нас</li>
  <li class="nav__item">Контакти</li>
</nav>
<button class="btn">Замовити дзвінок</button>
<a class="link" href="#">Умови доставки →</a>`,
    `${BASE}
/* ── Скомпільовано з SCSS (колір $primary = #6366f1 повторюється, бо це вже CSS) ── */
.nav{display:flex;gap:18px;list-style:none;margin-bottom:16px}
.nav__item{color:#94a3b8;cursor:pointer;padding-bottom:4px;border-bottom:2px solid transparent}
.nav__item:hover{opacity:.9;color:#e2e8f0}
.nav__item--active{font-weight:700;color:#6366f1;border-bottom-color:#6366f1}
.btn{background:#6366f1;border-radius:10px;border:none;color:#fff;padding:10px 18px;font-size:13px;display:block;margin-bottom:10px}
.link{color:#6366f1;font-size:13px;text-decoration:none}
.link:hover{text-decoration:underline}`,
    ``,
    [
      { level:'easy',   uk:'У CSS змінено колір <code>#6366f1</code> на новий — тобі доведеться замінити його вручну у 4 місцях (.nav__item--active двічі, .btn, .link). Спробуй і порахуй, скільки правок зробив.', ru:'Замени цвет <code>#6366f1</code> на новый вручную во всех 4 местах (.nav__item--active дважды, .btn, .link). Посчитай, сколько правок сделал.' },
      { level:'medium', uk:'Додай п\'ятий пункт меню <code>.nav__item</code> з текстом "Блог" і зроби його активним (<code>--active</code>) замість першого.', ru:'Добавь пятый пункт меню <code>.nav__item</code> с текстом "Блог" и сделай его активным (<code>--active</code>) вместо первого.' },
      { level:'hard',   uk:'У теорії є SCSS-фрагмент з <code>&.active</code>. Напиши (просто текстом у відповіді, не в редакторі), як виглядатиме скомпільований CSS-селектор для <code>&::before</code> всередині <code>.nav__item</code>.', ru:'В теории есть SCSS-фрагмент с <code>&.active</code>. Напиши текстом, как будет выглядеть скомпилированный CSS-селектор для <code>&::before</code> внутри <code>.nav__item</code>.' },
    ]
  );

  /* ─── 09-03: SCSS @mixin, @include, @extend ─────────────────── */
  patch('09-03',
    { uk:`<h2>SCSS: @mixin, @include та @extend</h2>
<h3>@mixin — шаблон стилів, що приймає параметри</h3>
<pre>@mixin button($bg, $color: #fff) {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: $bg;
  color: $color;
}

.btn-primary { @include button(#6366f1); }
.btn-success { @include button(#22c55e); }
.btn-danger  { @include button(#ef4444); }

/* Компілюється у 3 ОКРЕМІ блоки — код КОПІЮЄТЬСЯ у кожен: */
.btn-primary { padding:10px 20px; border-radius:8px; border:none; background:#6366f1; color:#fff; }
.btn-success { padding:10px 20px; border-radius:8px; border:none; background:#22c55e; color:#fff; }
.btn-danger  { padding:10px 20px; border-radius:8px; border:none; background:#ef4444; color:#fff; }</pre>
<h3>@extend — успадкування селектора (без копіювання)</h3>
<pre>%btn-base { padding: 10px 20px; border-radius: 8px; border: none; }
.btn-primary { @extend %btn-base; background: #6366f1; }
.btn-success { @extend %btn-base; background: #22c55e; }

/* Компілюється у СПІЛЬНИЙ селектор для однакової частини: */
.btn-primary, .btn-success { padding:10px 20px; border-radius:8px; border:none; }
.btn-primary { background:#6366f1; }
.btn-success { background:#22c55e; }</pre>
<h3>У чому різниця?</h3>
<p><code>@include</code> (mixin) — <strong>копіює</strong> код у кожне місце виклику: більше CSS, але можна передавати параметри. <code>@extend</code> — <strong>об'єднує</strong> селектори в один спільний блок: менше CSS, але без параметрів. У редакторі праворуч — вже скомпільований варіант з mixin.</p>`,
      ru:`<h2>SCSS: @mixin, @include и @extend</h2>
<h3>@mixin — шаблон стилей с параметрами</h3>
<pre>@mixin button($bg, $color: #fff) {
  padding: 10px 20px; border-radius: 8px; border: none;
  background: $bg; color: $color;
}
.btn-primary { @include button(#6366f1); }
.btn-success { @include button(#22c55e); }
/* Компилируется в ОТДЕЛЬНЫЕ блоки — код КОПИРУЕТСЯ: */
.btn-primary { padding:10px 20px; background:#6366f1; color:#fff; }
.btn-success { padding:10px 20px; background:#22c55e; color:#fff; }</pre>
<h3>@extend — наследование селектора</h3>
<pre>%btn-base { padding: 10px 20px; border-radius: 8px; }
.btn-primary { @extend %btn-base; background: #6366f1; }
/* Компилируется в ОБЩИЙ селектор: */
.btn-primary, .btn-success { padding:10px 20px; border-radius:8px; }</pre>
<h3>В чём разница?</h3>
<p><code>@include</code> — <strong>копирует</strong> код в каждое место: больше CSS, но с параметрами. <code>@extend</code> — <strong>объединяет</strong> селекторы в общий блок: меньше CSS, но без параметров.</p>` },
    `<button class="btn-primary">Зберегти</button>
<button class="btn-success">Підтвердити</button>
<button class="btn-danger">Видалити</button>`,
    `${BASE}
button{display:inline-block;margin-right:8px}
/* Скомпільовано з @mixin button($bg,$color) — зверни увагу, padding/border-radius повторюються у кожному блоці */
.btn-primary{padding:10px 20px;border-radius:8px;border:none;background:#6366f1;color:#fff;font-size:13px;cursor:pointer}
.btn-success{padding:10px 20px;border-radius:8px;border:none;background:#22c55e;color:#fff;font-size:13px;cursor:pointer}
.btn-danger{padding:10px 20px;border-radius:8px;border:none;background:#ef4444;color:#fff;font-size:13px;cursor:pointer}`,
    ``,
    [
      { level:'easy',   uk:'Порахуй: скільки разів у CSS повторюється <code>padding:10px 20px;border-radius:8px;border:none;</code>? Саме ці рядки mixin "розмножив" по копіях.', ru:'Посчитай: сколько раз в CSS повторяется <code>padding:10px 20px;border-radius:8px;border:none;</code>? Именно эти строки mixin "размножил" по копиям.' },
      { level:'medium', uk:'Додай четверту кнопку <code>.btn-warning</code> (жовтий фон #f59e0b) — скопіюй патерн вручну, як це зробив би компілятор mixin.', ru:'Добавь четвёртую кнопку <code>.btn-warning</code> (жёлтый фон #f59e0b) — скопируй паттерн вручную, как это сделал бы компилятор mixin.' },
      { level:'hard',   uk:'Уяви, що замість mixin використали <code>@extend %btn-base</code> для всіх чотирьох кнопок. Опиши текстом, чим відрізнявся б результуючий CSS (скільки б було спільних селекторів, скільки — окремих).', ru:'Представь, что вместо mixin использовали <code>@extend %btn-base</code> для всех четырёх кнопок. Опиши текстом, чем отличался бы итоговый CSS.' },
    ]
  );

  /* ─── 09-04: SCSS функції, @for, @each, @while ───────────────── */
  patch('09-04',
    { uk:`<h2>SCSS: функції, @for, @each, @while</h2>
<p>SCSS вміє генерувати багато схожого CSS-коду циклами — це особливо зручно для <strong>utility-класів</strong> (маленьких класів на кшталт <code>.mt-1</code>, <code>.p-2</code>, які роблять одну річ).</p>
<h3>@for — цикл з лічильником</h3>
<pre>@for $i from 1 through 5 {
  .p-#{$i} { padding: #{$i * 8}px; }
  .mt-#{$i} { margin-top: #{$i * 8}px; }
}
/* Компілюється у 10 класів: */
.p-1{padding:8px} .p-2{padding:16px} .p-3{padding:24px} ...
.mt-1{margin-top:8px} .mt-2{margin-top:16px} ...</pre>
<h3>@each — цикл по списку значень</h3>
<pre>$colors: (primary: #6366f1, success: #22c55e, danger: #ef4444);
@each $name, $hex in $colors {
  .text-#{$name} { color: $hex; }
  .bg-#{$name}   { background: $hex; }
}</pre>
<h3>Функції</h3>
<pre>@function rem($px) { @return $px / 16 * 1rem; }
.title { font-size: rem(24); } // → 1.5rem</pre>
<p>У редакторі праворуч — вже <strong>згенерований</strong> (скомпільований) результат такого циклу: набір готових utility-класів <code>.p-1</code>…<code>.p-5</code> та <code>.text-*</code>/<code>.bg-*</code>.</p>`,
      ru:`<h2>SCSS: функции, @for, @each, @while</h2>
<p>SCSS умеет генерировать много похожего CSS циклами — удобно для <strong>utility-классов</strong> вроде <code>.mt-1</code>, <code>.p-2</code>.</p>
<h3>@for — цикл со счётчиком</h3>
<pre>@for $i from 1 through 5 {
  .p-#{$i} { padding: #{$i * 8}px; }
}
/* → .p-1{padding:8px} .p-2{padding:16px} ... */</pre>
<h3>@each — цикл по списку значений</h3>
<pre>$colors: (primary: #6366f1, success: #22c55e, danger: #ef4444);
@each $name, $hex in $colors {
  .text-#{$name} { color: $hex; }
  .bg-#{$name}   { background: $hex; }
}</pre>
<h3>Функции</h3>
<pre>@function rem($px) { @return $px / 16 * 1rem; }
.title { font-size: rem(24); } // → 1.5rem</pre>
<p>Справа — уже <strong>сгенерированный</strong> результат такого цикла: готовые utility-классы.</p>` },
    `<div class="box p-1 bg-primary text-white">p-1</div>
<div class="box p-2 bg-success text-white">p-2</div>
<div class="box p-3 bg-danger text-white">p-3</div>
<div class="box p-5 mt-3" style="background:#334155">p-5 + mt-3</div>`,
    `${BASE}
.box{display:inline-block;border-radius:8px;font-size:12px;font-family:monospace;margin-right:8px}
.text-white{color:#fff}
/* Згенеровано циклом @for $i from 1 through 5 */
.p-1{padding:8px} .p-2{padding:16px} .p-3{padding:24px} .p-4{padding:32px} .p-5{padding:40px}
.mt-1{margin-top:8px} .mt-2{margin-top:16px} .mt-3{margin-top:24px} .mt-4{margin-top:32px} .mt-5{margin-top:40px}
/* Згенеровано циклом @each по мапі $colors */
.bg-primary{background:#6366f1} .bg-success{background:#22c55e} .bg-danger{background:#ef4444}
.text-primary{color:#6366f1} .text-success{color:#22c55e} .text-danger{color:#ef4444}`,
    ``,
    [
      { level:'easy',   uk:'Застав четвертий блок використати клас <code>p-4</code> замість <code>p-5</code> і подивись різницю у відступах.', ru:'Поставь четвёртому блоку класс <code>p-4</code> вместо <code>p-5</code> и посмотри разницу в отступах.' },
      { level:'medium', uk:'У SCSS-циклі було <code>@for $i from 1 through 5</code>. Допиши вручну класи <code>.p-6</code> та <code>.mt-6</code>, продовжуючи формулу <code>$i * 8</code>.', ru:'В SCSS-цикле было <code>@for $i from 1 through 5</code>. Допиши вручную классы <code>.p-6</code> и <code>.mt-6</code>, продолжая формулу <code>$i * 8</code>.' },
      { level:'hard',   uk:'Додай у мапу кольорів (текстом опиши зміну SCSS) новий колір <code>warning: #f59e0b</code>, а потім вручну допиши у CSS класи <code>.bg-warning</code> і <code>.text-warning</code>, які згенерував би @each.', ru:'Добавь в карту цветов новый цвет <code>warning: #f59e0b</code>, а затем вручную допиши <code>.bg-warning</code> и <code>.text-warning</code>.' },
    ]
  );

  /* ─── 09-05: PostCSS autoprefixer, cssnano ──────────────────── */
  patch('09-05',
    { uk:`<h2>PostCSS: autoprefixer та cssnano</h2>
<p><strong>PostCSS</strong> — це не мова (як SCSS), а інструмент, що обробляє звичайний CSS через плагіни. Два найпопулярніші плагіни:</p>
<h3>Autoprefixer — сам додає вендорні префікси</h3>
<pre>/* Ти пишеш: */
.box {
  display: flex;
  user-select: none;
  backdrop-filter: blur(8px);
}

/* Autoprefixer перетворює (залежно від browserslist) на: */
.box {
  display: -webkit-box; display: -ms-flexbox; display: flex;
  -webkit-user-select: none; -moz-user-select: none; user-select: none;
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}</pre>
<p>Тобі більше <strong>не треба пам'ятати</strong>, які властивості потребують <code>-webkit-</code>/<code>-moz-</code>/<code>-ms-</code> — інструмент робить це автоматично під час збірки проєкту.</p>
<h3>cssnano — стискає CSS для продакшну</h3>
<pre>/* До: */
.title {
  color: #ffffff;
  margin-top: 20px;
}

/* Після cssnano (мінімізовано): */
.title{color:#fff;margin-top:20px}</pre>
<p>Прибирає пробіли/коментарі, скорочує кольори (<code>#ffffff</code> → <code>#fff</code>), об'єднує однакові правила. Файл важить менше — сайт швидше вантажиться.</p>`,
      ru:`<h2>PostCSS: autoprefixer и cssnano</h2>
<p><strong>PostCSS</strong> — не язык (как SCSS), а инструмент, обрабатывающий обычный CSS через плагины.</p>
<h3>Autoprefixer — сам добавляет вендорные префиксы</h3>
<pre>/* Пишешь: */
.box { display: flex; user-select: none; backdrop-filter: blur(8px); }

/* Autoprefixer превращает в: */
.box {
  display: -webkit-box; display: -ms-flexbox; display: flex;
  -webkit-user-select: none; user-select: none;
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}</pre>
<p>Больше <strong>не нужно помнить</strong>, каким свойствам нужны префиксы — инструмент делает это автоматически при сборке.</p>
<h3>cssnano — сжимает CSS для продакшна</h3>
<pre>/* До: */
.title { color: #ffffff; margin-top: 20px; }
/* После cssnano: */
.title{color:#fff;margin-top:20px}</pre>
<p>Убирает пробелы/комментарии, сокращает цвета, объединяет правила. Файл весит меньше — сайт быстрее грузится.</p>` },
    `<div class="glass">
  <h3 style="color:#fff;margin-bottom:6px">Glass-картка</h3>
  <p style="margin:0">Ефект скла: backdrop-filter потребує префікс -webkit- у Safari.</p>
</div>
<button class="select-demo">Спробуй виділити цей текст (user-select:none)</button>`,
    `${BASE}
body{background:linear-gradient(135deg,#1e293b,#334155)}
.glass{
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.15);
  border-radius:14px;padding:18px;margin-bottom:14px;
  -webkit-backdrop-filter:blur(8px);
  backdrop-filter:blur(8px);
}
.select-demo{
  -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;
}`,
    ``,
    [
      { level:'easy',   uk:'Прибери рядок <code>-webkit-backdrop-filter</code> і подивись — у сучасному Chrome різниці не буде, але у старому Safari ефект скла зникне. Поверни рядок назад.', ru:'Убери строку <code>-webkit-backdrop-filter</code> — в современном Chrome разницы нет, но в старом Safari эффект стекла исчезнет. Верни строку.' },
      { level:'medium', uk:'Додай властивість <code>backdrop-filter: blur(4px) saturate(150%)</code> разом з відповідним -webkit- варіантом до нового елемента.', ru:'Добавь свойство <code>backdrop-filter: blur(4px) saturate(150%)</code> вместе с -webkit- вариантом к новому элементу.' },
      { level:'hard',   uk:'"Мінімізуй вручну" (як зробив би cssnano) правило <code>.glass{ background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); }</code> — запиши його одним рядком без зайвих пробілів.', ru:'"Минимизируй вручную" правило <code>.glass{...}</code> — запиши его одной строкой без лишних пробелов.' },
    ]
  );

  /* ─── 09-06: Bootstrap 5 grid/components/utilities ──────────── */
  patch('09-06',
    { uk:`<h2>Bootstrap 5: сітка, компоненти та утиліти</h2>
<p><strong>Bootstrap</strong> — готова CSS-бібліотека: підключаєш один файл через CDN — і отримуєш сітку, кнопки, картки, alert'и, які вже добре виглядають.</p>
<h3>Підключення (уже зроблено в редакторі)</h3>
<pre>&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"&gt;</pre>
<h3>Сітка 12 колонок</h3>
<pre>&lt;div class="container"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-md-4"&gt;...&lt;/div&gt;  &lt;!-- 4 з 12 на md+ --&gt;
    &lt;div class="col-md-8"&gt;...&lt;/div&gt;  &lt;!-- 8 з 12 на md+ --&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
<p>Брейкпоінти: <code>col-</code> (завжди), <code>col-sm-</code> (≥576px), <code>col-md-</code> (≥768px), <code>col-lg-</code> (≥992px). Сума колонок у рядку — 12.</p>
<h3>Готові компоненти й утиліти</h3>
<pre>&lt;button class="btn btn-primary"&gt;Кнопка&lt;/button&gt;
&lt;div class="alert alert-success"&gt;Успішно!&lt;/div&gt;
&lt;div class="d-flex justify-content-between mt-3 p-2"&gt;...&lt;/div&gt;</pre>
<p><code>d-flex</code>, <code>mt-3</code>, <code>p-2</code>, <code>text-center</code> — це utility-класи: одна властивість = один клас, точно як у SCSS-циклах з минулого уроку (Bootstrap їх теж генерує циклами під час збірки).</p>`,
      ru:`<h2>Bootstrap 5: сетка, компоненты и утилиты</h2>
<p><strong>Bootstrap</strong> — готовая CSS-библиотека: подключаешь файл через CDN — получаешь сетку, кнопки, карточки, alert'ы.</p>
<h3>Подключение (уже сделано в редакторе)</h3>
<pre>&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"&gt;</pre>
<h3>Сетка 12 колонок</h3>
<pre>&lt;div class="row"&gt;
  &lt;div class="col-md-4"&gt;...&lt;/div&gt;
  &lt;div class="col-md-8"&gt;...&lt;/div&gt;
&lt;/div&gt;</pre>
<p>Брейкпоинты: col- (всегда), col-sm- (≥576px), col-md- (≥768px), col-lg- (≥992px). Сумма колонок в ряду — 12.</p>
<h3>Готовые компоненты и утилиты</h3>
<pre>&lt;button class="btn btn-primary"&gt;Кнопка&lt;/button&gt;
&lt;div class="alert alert-success"&gt;Успешно!&lt;/div&gt;</pre>
<p><code>d-flex</code>, <code>mt-3</code>, <code>p-2</code> — utility-классы, как в SCSS-циклах из прошлого урока.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-dark text-light p-4">
  <div class="container">
    <div class="row g-3">
      <div class="col-md-4">
        <div class="card bg-secondary text-white h-100">
          <div class="card-body">
            <h5 class="card-title">Тариф Старт</h5>
            <p class="card-text">Базові можливості для початку.</p>
            <button class="btn btn-outline-light">Обрати</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-primary text-white h-100">
          <div class="card-body">
            <h5 class="card-title">Тариф Pro</h5>
            <p class="card-text">Найпопулярніший вибір.</p>
            <button class="btn btn-light">Обрати</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-secondary text-white h-100">
          <div class="card-body">
            <h5 class="card-title">Тариф Max</h5>
            <p class="card-text">Все можливості без обмежень.</p>
            <button class="btn btn-outline-light">Обрати</button>
          </div>
        </div>
      </div>
    </div>
    <div class="alert alert-success mt-4 d-flex justify-content-between align-items-center">
      <span>✅ Це Bootstrap alert-компонент — жодного власного CSS!</span>
      <button class="btn btn-sm btn-success">OK</button>
    </div>
  </div>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Зміни <code>col-md-4</code> на <code>col-md-6</code> у всіх трьох картках — і подивись, як тепер вони діляться по 2 в ряду замість 3.', ru:'Замени <code>col-md-4</code> на <code>col-md-6</code> во всех трёх карточках — теперь их 2 в ряду вместо 3.' },
      { level:'medium', uk:'Додай четверту картку <code>col-md-4</code> "Enterprise" в той самий <code>.row</code>.', ru:'Добавь четвёртую карточку <code>col-md-4</code> "Enterprise" в тот же <code>.row</code>.' },
      { level:'hard',   uk:'Зроби сітку по-різному адаптивною: <code>col-12 col-sm-6 col-lg-4</code> — по одній колонці на телефоні, по дві на планшеті, по три на десктопі. Перевір, змінюючи розмір вікна попереднього перегляду.', ru:'Сделай сетку разной по брейкпоинтам: <code>col-12 col-sm-6 col-lg-4</code> — одна колонка на телефоне, две на планшете, три на десктопе.' },
    ]
  );

  /* ─── 09-07: Bootstrap 5 кастомізація через змінні ──────────── */
  patch('09-07',
    { uk:`<h2>Bootstrap 5: кастомізація через SCSS-змінні</h2>
<p>"По-справжньому" Bootstrap кастомізують так: підключають його вихідний <code>.scss</code>, переозначають змінні (<code>$primary: #7c3aed;</code>) <strong>до</strong> імпорту Bootstrap, і компілюють все разом збірником (Vite — модуль 10). Це потребує Node.js-проєкту, тож у браузерній оболонці такий шлях недоступний.</p>
<h3>Але є прийом без компіляції!</h3>
<p>Bootstrap 5.2+ сам побудований на <strong>CSS Custom Properties</strong> (<code>--bs-*</code>) — і їх можна перевизначити прямо у звичайному CSS, без жодного SCSS-компілятора:</p>
<pre>:root {
  --bs-primary: #7c3aed;
  --bs-primary-rgb: 124, 58, 237;
  --bs-border-radius: 16px;
}
.btn-primary {
  --bs-btn-bg: var(--bs-primary);
  --bs-btn-border-color: var(--bs-primary);
}</pre>
<p>Це технічно не те саме, що змінна SCSS (<code>--bs-primary</code> — жива CSS-змінна в браузері, а <code>$primary</code> — існує лише під час компіляції), але дає той самий візуальний результат: одна зміна в <code>:root</code> перефарбовує всі компоненти, які на неї посилаються.</p>`,
      ru:`<h2>Bootstrap 5: кастомизация через SCSS-переменные</h2>
<p>"По-настоящему" Bootstrap кастомизируют так: подключают исходный <code>.scss</code>, переопределяют переменные (<code>$primary: #7c3aed;</code>) <strong>до</strong> импорта Bootstrap и компилируют сборщиком (Vite — модуль 10). Это требует Node.js-проекта, поэтому в браузерной оболочке недоступно.</p>
<h3>Но есть приём без компиляции!</h3>
<p>Bootstrap 5.2+ построен на <strong>CSS Custom Properties</strong> (<code>--bs-*</code>) — их можно переопределить прямо в обычном CSS:</p>
<pre>:root {
  --bs-primary: #7c3aed;
  --bs-border-radius: 16px;
}
.btn-primary {
  --bs-btn-bg: var(--bs-primary);
}</pre>
<p>Технически это не то же самое, что переменная SCSS, но даёт тот же визуальный результат: одно изменение в <code>:root</code> перекрашивает все компоненты.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
:root{
  --bs-primary: #7c3aed;
  --bs-primary-rgb: 124, 58, 237;
  --bs-border-radius: 16px;
}
.btn-primary{ --bs-btn-bg: var(--bs-primary); --bs-btn-border-color: var(--bs-primary); --bs-btn-hover-bg:#6d28d9; --bs-btn-hover-border-color:#6d28d9; }
.card{ border-radius: var(--bs-border-radius); }
</style>
</head>
<body class="bg-dark text-light p-4">
  <div class="card text-white p-3 mb-3" style="max-width:360px">
    <h5>Своя тема без SCSS-компілятора</h5>
    <p class="text-white-50">Фіолетовий колір і заокруглені кути задані через --bs-* змінні у &lt;style&gt;.</p>
    <button class="btn btn-primary">Кастомна кнопка</button>
  </div>
  <span class="badge text-bg-primary">Badge теж перефарбувався</span>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Зміни <code>--bs-primary</code> на інший колір (наприклад <code>#ec4899</code>) — подивись, як одразу перефарбувались і кнопка, і badge.', ru:'Измени <code>--bs-primary</code> на другой цвет (например <code>#ec4899</code>) — посмотри, как сразу перекрасились и кнопка, и badge.' },
      { level:'medium', uk:'Зміни <code>--bs-border-radius</code> на <code>4px</code> (гострі кути) або <code>28px</code> (дуже круглі) і подивись на картку.', ru:'Измени <code>--bs-border-radius</code> на <code>4px</code> (острые углы) или <code>28px</code> (очень круглые) и посмотри на карточку.' },
      { level:'hard',   uk:'Створи повністю "темну неонову" тему: onmouse кнопки --bs-btn-hover-bg на яскраво-зелений, --bs-primary на #10b981, і додай другу кнопку <code>btn-outline-primary</code>.', ru:'Создай "тёмную неоновую" тему: --bs-btn-hover-bg на ярко-зелёный, --bs-primary на #10b981, и добавь вторую кнопку <code>btn-outline-primary</code>.' },
    ]
  );

  /* ─── 09-08: Tailwind CSS utility-first ─────────────────────── */
  patch('09-08',
    { uk:`<h2>Tailwind CSS: utility-first підхід</h2>
<p><strong>Tailwind</strong> — це набір тисяч маленьких utility-класів. Замість того щоб писати свій CSS-клас <code>.card</code> і всередині нього властивості, ти складаєш вигляд просто з готових класів прямо в HTML.</p>
<h3>Приклад: одна й та сама картка</h3>
<pre>/* Свій CSS: */
.card { background:#1e293b; border-radius:12px; padding:16px; }
.card__title { font-size:18px; font-weight:700; color:#fff; }

/* Tailwind: жодного CSS-файлу, все класами в HTML */
&lt;div class="bg-slate-800 rounded-xl p-4"&gt;
  &lt;h3 class="text-lg font-bold text-white"&gt;...&lt;/h3&gt;
&lt;/div&gt;</pre>
<h3>Шпаргалка найпопулярніших класів</h3>
<pre>Відступи:    p-4 (padding), m-2 (margin), gap-3
Flex/Grid:   flex, grid, items-center, justify-between
Розмір:      w-full, h-40, max-w-sm
Колір:       bg-blue-500, text-white, border-slate-700
Заокруглення: rounded, rounded-xl, rounded-full
Тінь:        shadow, shadow-lg
Стани:       hover:bg-blue-600, focus:ring-2
Адаптив:     md:flex-row (тільки від 768px)</pre>
<p>Числа після кольору (500, 600...) — це відтінок: чим більше число, тим темніше. У редакторі підключено <code>&lt;script src="cdn.tailwindcss.com"&gt;</code> — він на льоту читає твої класи й генерує потрібний CSS.</p>`,
      ru:`<h2>Tailwind CSS: utility-first подход</h2>
<p><strong>Tailwind</strong> — набор тысяч маленьких utility-классов. Вместо своего класса <code>.card</code> ты собираешь вид прямо из готовых классов в HTML.</p>
<h3>Пример: одна и та же карточка</h3>
<pre>/* Свой CSS: */
.card { background:#1e293b; border-radius:12px; padding:16px; }
/* Tailwind: */
&lt;div class="bg-slate-800 rounded-xl p-4"&gt;...&lt;/div&gt;</pre>
<h3>Шпаргалка</h3>
<pre>Отступы: p-4, m-2, gap-3
Flex/Grid: flex, items-center, justify-between
Цвет: bg-blue-500, text-white
Скругление: rounded-xl
Тень: shadow-lg
Состояния: hover:bg-blue-600
Адаптив: md:flex-row (от 768px)</pre>
<p>Число после цвета (500, 600...) — оттенок: больше число — темнее. В редакторе подключён <code>&lt;script src="cdn.tailwindcss.com"&gt;</code> — он на лету генерирует нужный CSS по твоим классам.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 p-6">
  <div class="max-w-sm mx-auto bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-700">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-lg font-bold text-white">Профіль учня</h3>
      <span class="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">Online</span>
    </div>
    <p class="text-slate-400 text-sm mb-4">10-14 років · Веб-Розробник · Модуль 9</p>
    <div class="flex gap-2">
      <button class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm py-2 rounded-lg transition">
        Профіль
      </button>
      <button class="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm py-2 rounded-lg transition">
        Налаштування
      </button>
    </div>
  </div>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Зміни <code>bg-emerald-500</code> на <code>bg-red-500</code> у бейджику "Online" — стане "офлайн"-червоним.', ru:'Замени <code>bg-emerald-500</code> на <code>bg-red-500</code> в бейджике "Online" — станет "оффлайн"-красным.' },
      { level:'medium', uk:'Додай кнопкам ефект при наведенні через <code>hover:</code> (вже є) — а тепер додай ще <code>md:flex-row</code> логіку: заміни зовнішній <code>div</code> картки на <code>md:max-w-md</code>, щоб на планшетах картка була ширшою.', ru:'У кнопок уже есть hover: — добавь ещё <code>md:max-w-md</code> внешнему div карточки, чтобы на планшетах карточка была шире.' },
      { level:'hard',   uk:'Ось "свій CSS": <code>.tag{background:#334155;color:#e2e8f0;padding:4px 10px;border-radius:9999px;font-size:12px}</code>. Перепиши це у вигляді Tailwind-класів і додай такий тег-бейдж "Python" в картку.', ru:'Вот "свой CSS": <code>.tag{...}</code>. Перепиши в виде Tailwind-классов и добавь такой бейдж "Python" в карточку.' },
    ]
  );

  /* ─── 09-09: CSS-in-JS Styled Components ────────────────────── */
  patch('09-09',
    { uk:`<h2>CSS-in-JS: Styled Components — базові поняття</h2>
<p>У React-проєктах іноді пишуть CSS прямо всередині JavaScript-файлу за допомогою бібліотеки <strong>styled-components</strong>. Стилі "приклеєні" до конкретного компонента і ніколи не конфліктують з іншими.</p>
<h3>Як це виглядає</h3>
<pre>import styled from 'styled-components';

const Button = styled.button\`
  background: \${props => props.primary ? '#6366f1' : '#334155'};
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
\`;

function App() {
  return &lt;Button primary&gt;Зберегти&lt;/Button&gt;;
}</pre>
<h3>Головні ідеї</h3>
<ul>
  <li><code>styled.button\`...\`</code> — функція-тег, яка створює новий React-компонент з власними стилями.</li>
  <li>Всередині шаблонного рядка можна використовувати <code>props</code>, щоб стиль <strong>залежав від даних</strong> — щось на кшталт модифікаторів BEM, тільки через JS-логіку, а не окремий CSS-клас.</li>
  <li>Кожен styled-компонент отримує унікальний згенерований клас — назви ніколи не перетинаються (як і BEM, тільки автоматично).</li>
</ul>
<p>У редакторі підключено React + Babel + styled-components через CDN, щоб приклад працював просто у браузері без збірника.</p>`,
      ru:`<h2>CSS-in-JS: Styled Components — базовые понятия</h2>
<p>В React-проектах иногда пишут CSS прямо внутри JS-файла с помощью <strong>styled-components</strong>. Стили "приклеены" к конкретному компоненту и никогда не конфликтуют с другими.</p>
<h3>Как это выглядит</h3>
<pre>const Button = styled.button\`
  background: \${props => props.primary ? '#6366f1' : '#334155'};
  color: white; padding: 10px 20px; border-radius: 8px; border: none;
\`;
&lt;Button primary&gt;Сохранить&lt;/Button&gt;</pre>
<h3>Главные идеи</h3>
<ul>
  <li><code>styled.button\`...\`</code> создаёт новый React-компонент со своими стилями.</li>
  <li>Внутри шаблонной строки можно использовать <code>props</code>, чтобы стиль <strong>зависел от данных</strong> — как модификаторы BEM, только через JS.</li>
  <li>Каждый styled-компонент получает уникальный сгенерированный класс — имена никогда не пересекаются.</li>
</ul>
<p>В редакторе подключены React + Babel + styled-components через CDN.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/styled-components@5/dist/styled-components.min.js"></script>
<style>body{background:#0f172a;padding:20px;font-family:'Segoe UI',sans-serif}</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react">
    const { styled } = window;

    const Card = styled.div\`
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 14px;
      padding: 18px;
      max-width: 300px;
      color: #f1f5f9;
    \`;

    const Button = styled.button\`
      background: \${props => (props.primary ? '#6366f1' : '#334155')};
      color: white;
      padding: 8px 18px;
      border-radius: 8px;
      border: none;
      font-size: 13px;
      margin-right: 8px;
      cursor: pointer;
    \`;

    function App() {
      const [count, setCount] = React.useState(0);
      return (
        <Card>
          <h3 style={{marginBottom:'10px'}}>Лічильник: {count}</h3>
          <Button primary onClick={() => setCount(count + 1)}>+1 (primary)</Button>
          <Button onClick={() => setCount(0)}>Скинути</Button>
        </Card>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Зміни колір <code>primary</code>-кнопки з <code>#6366f1</code> на будь-який інший прямо у styled-шаблоні Button.', ru:'Измени цвет primary-кнопки с <code>#6366f1</code> на любой другой прямо в styled-шаблоне Button.' },
      { level:'medium', uk:'Додай новий пропс <code>size</code>: якщо <code>size="lg"</code> — padding має бути більший (<code>14px 26px</code>) і font-size 16px.', ru:'Добавь новый проп <code>size</code>: если <code>size="lg"</code> — padding больше (<code>14px 26px</code>) и font-size 16px.' },
      { level:'hard',   uk:'Створи ще один styled-компонент <code>Badge</code> (styled.span) із залежністю кольору фону від пропса <code>status</code> ("ok" → зелений, "warn" → жовтий) і виведи його всередині Card поруч із лічильником.', ru:'Создай ещё один styled-компонент <code>Badge</code> с зависимостью цвета фона от пропса <code>status</code> ("ok" → зелёный, "warn" → жёлтый) и выведи внутри Card.' },
    ]
  );

  /* ─── 09-10: ПРОЕКТ — Bootstrap + власна SCSS-тема ──────────── */
  patch('09-10',
    { uk:`<h2>ПРОЕКТ: Bootstrap + власна SCSS-тема</h2>
<p>Фінальне завдання модуля — зібрати все, що вивчили: сітку і компоненти Bootstrap, власну кольорову тему через <code>--bs-*</code> змінні (як у 09-07) та власні BEM-названі блоки там, де Bootstrap не підходить (наприклад секція відгуків).</p>
<h3>Що вже є в шаблоні</h3>
<ul>
  <li>Підключений Bootstrap 5 + власний блок <code>:root</code> з кастомною темою.</li>
  <li>Навбар і Hero-секція на сітці Bootstrap.</li>
  <li>Три картки з послугами (<code>col-md-4</code>).</li>
</ul>
<h3>Що потрібно доробити (дивись завдання)</h3>
<p>Секцію відгуків зроблено власними BEM-класами <code>testimonial</code>/<code>testimonial__*</code> навмисно — не всі частини сайту зручно робити через Bootstrap, іноді свій маленький BEM-блок простіший і легший.</p>`,
      ru:`<h2>ПРОЕКТ: Bootstrap + собственная SCSS-тема</h2>
<p>Финальное задание модуля — собрать всё изученное: сетку и компоненты Bootstrap, свою цветовую тему через <code>--bs-*</code> переменные (как в 09-07) и собственные BEM-блоки там, где Bootstrap не подходит (например секция отзывов).</p>
<h3>Что уже есть в шаблоне</h3>
<ul>
  <li>Подключённый Bootstrap 5 + свой блок <code>:root</code> с кастомной темой.</li>
  <li>Навбар и Hero-секция на сетке Bootstrap.</li>
  <li>Три карточки с услугами (<code>col-md-4</code>).</li>
</ul>
<h3>Что нужно доделать (смотри задания)</h3>
<p>Секция отзывов сделана собственными BEM-классами <code>testimonial</code>/<code>testimonial__*</code> намеренно — не всё удобно делать через Bootstrap.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
:root{ --bs-primary:#0ea5e9; --bs-primary-rgb:14,165,233; --bs-border-radius:14px; }
.btn-primary{ --bs-btn-bg:var(--bs-primary); --bs-btn-border-color:var(--bs-primary); --bs-btn-hover-bg:#0284c7; --bs-btn-hover-border-color:#0284c7; }
.hero{ background:linear-gradient(135deg,#0c4a6e,#0f172a); border-radius:0 0 24px 24px; }

.testimonial{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:16px;color:#f1f5f9}
.testimonial__quote{font-size:13px;color:#94a3b8;line-height:1.5;margin-bottom:10px}
.testimonial__author{display:flex;align-items:center;gap:8px}
.testimonial__avatar{width:32px;height:32px;border-radius:50%;background:var(--bs-primary);display:flex;align-items:center;justify-content:center;font-size:14px}
.testimonial__name{font-size:13px;font-weight:700}
.testimonial__role{font-size:11px;color:#64748b}
</style>
</head>
<body class="bg-dark text-light">
  <nav class="navbar navbar-dark bg-black px-4">
    <span class="navbar-brand">🌐 WebDev School</span>
    <button class="btn btn-primary btn-sm">Записатись</button>
  </nav>

  <section class="hero text-center text-white py-5">
    <h1 class="fw-bold">Стань веб-розробником</h1>
    <p class="text-white-50">Практичні курси для дітей 10–14 років</p>
    <button class="btn btn-primary btn-lg mt-2">Почати навчання</button>
  </section>

  <div class="container py-5">
    <div class="row g-3 mb-5">
      <div class="col-md-4">
        <div class="card bg-secondary text-white h-100">
          <div class="card-body">
            <h5 class="card-title">HTML/CSS</h5>
            <p class="card-text">Основи вёрстки з нуля.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-secondary text-white h-100">
          <div class="card-body">
            <h5 class="card-title">JavaScript</h5>
            <p class="card-text">Інтерактивність та логіка.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-secondary text-white h-100">
          <div class="card-body">
            <h5 class="card-title">React</h5>
            <p class="card-text">Сучасні веб-застосунки.</p>
          </div>
        </div>
      </div>
    </div>

    <h3 class="mb-3">Відгуки</h3>
    <div class="row g-3">
      <div class="col-md-6">
        <div class="testimonial">
          <p class="testimonial__quote">"Дуже подобається, як пояснюють — все зрозуміло навіть без досвіду!"</p>
          <div class="testimonial__author">
            <div class="testimonial__avatar">М</div>
            <div>
              <div class="testimonial__name">Максим, 12 років</div>
              <div class="testimonial__role">Учень курсу</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Зміни <code>--bs-primary</code> на свій улюблений колір — переконайся, що перефарбувались і навбар-кнопка, і Hero-кнопка.', ru:'Измени <code>--bs-primary</code> на свой любимый цвет — убедись, что перекрасились и кнопка навбара, и кнопка Hero.' },
      { level:'medium', uk:'Додай другу картку відгуку поруч (<code>col-md-6</code>) з іншим іменем, роллю та текстом — використовуй ті самі BEM-класи <code>testimonial__*</code>.', ru:'Добавь вторую карточку отзыва рядом (<code>col-md-6</code>) с другим именем, ролью и текстом — используй те же BEM-классы.' },
      { level:'medium', uk:'Додай футер: <code>&lt;footer class="bg-black text-center text-white-50 py-3"&gt;</code> з текстом "© 2026 WebDev School".', ru:'Добавь футер: <code>&lt;footer class="bg-black text-center text-white-50 py-3"&gt;</code> с текстом "© 2026 WebDev School".' },
      { level:'hard',   uk:'Додай модифікатор <code>.testimonial--featured</code> (яскравіша рамка кольору --bs-primary + невеликий бейдж "★ Топ відгук") і застався його до одного з відгуків.', ru:'Добавь модификатор <code>.testimonial--featured</code> (яркая рамка цвета --bs-primary + бейдж "★ Топ отзыв") и примени к одному из отзывов.' },
      { level:'extra',  uk:'Зроби картки послуг (HTML/CSS, JavaScript, React) клікабельними: по кліку картка отримує клас <code>border border-primary</code> (виділення вибраного тарифу) — знадобиться трохи JS.', ru:'Сделай карточки услуг кликабельными: по клику карточка получает класс <code>border border-primary</code> — понадобится немного JS.' },
    ]
  );

})();
