/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 3 — CSS: Інтерактивність · 8–11 Веб-Старт
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  function patch(id, theory, html, css, tasks) {
    const l = WEB_LESSONS.find(x => x.id === id);
    if (!l) return;
    l.theory = theory;
    l.starterCode.html = html;
    l.starterCode.css  = css;
    l.tasks = tasks;
  }

  /* ─── 03-01 ─────────────────────────────────────────────── */
  patch('03-01',
    {
      uk: `<h2>Псевдоклас :hover</h2>
<p>Псевдокласи — це спеціальні CSS-селектори, що спрацьовують у певний момент, а не завжди. <code>:hover</code> застосовується, коли користувач <strong>наводить мишку</strong> на елемент.</p>
<pre>button:hover {
  background-color: #2563eb;
  color: #fff;
}</pre>
<p>Двокрапка перед <code>hover</code> — це і є псевдоклас. Стилі всередині спрацюють лише при наведенні, а після того, як прибрати мишку — зникнуть.</p>
<h3>Можна застосовувати до будь-якого елемента</h3>
<pre>a:hover     { text-decoration: underline; }
div:hover   { background: #f0fdf4; }
li:hover    { color: #059669; }
img:hover   { opacity: 0.8; }</pre>
<p>⚠️ Без CSS transitions зміна відбувається <em>миттєво</em>. У наступних уроках навчимося робити плавний перехід.</p>`,
      ru: `<h2>Псевдокласс :hover</h2>
<p>Псевдоклассы — это специальные CSS-селекторы, которые срабатывают в определённый момент, а не всегда. <code>:hover</code> применяется, когда пользователь <strong>наводит мышку</strong> на элемент.</p>
<pre>button:hover {
  background-color: #2563eb;
  color: #fff;
}</pre>
<p>Двоеточие перед <code>hover</code> — это и есть псевдокласс. Стили внутри сработают только при наведении, а после того, как убрать мышь — исчезнут.</p>
<h3>Можно применять к любому элементу</h3>
<pre>a:hover     { text-decoration: underline; }
div:hover   { background: #f0fdf4; }
li:hover    { color: #059669; }
img:hover   { opacity: 0.8; }</pre>
<p>⚠️ Без CSS transitions изменение происходит <em>мгновенно</em>. В следующих уроках научимся делать плавный переход.</p>`
    },
    `<h1>Наводь мишку на елементи!</h1>

<button class="btn">Натисни мене</button>
<button class="btn btn-outline">Ще кнопка</button>

<ul class="menu">
  <li>Головна</li>
  <li>Про нас</li>
  <li>Портфоліо</li>
  <li>Контакти</li>
</ul>

<div class="card">
  Наведи мишку на цю картку
</div>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 28px;
  background: #f8fafc;
}

h1 { color: #1e293b; font-size: 20px; margin-bottom: 20px; }

.btn {
  background: #e2e8f0;
  color: #374151;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 20px;
}

.btn:hover {
  background: #059669;
  color: #fff;
}

.btn-outline {
  background: transparent;
  border: 2px solid #059669;
  color: #059669;
}

.btn-outline:hover {
  background: #059669;
  color: #fff;
}

.menu { list-style: none; padding: 0; margin-bottom: 20px; }
.menu li {
  padding: 10px 16px;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  color: #374151;
}
.menu li:hover {
  background: #f0fdf4;
  color: #059669;
  padding-left: 24px;
}

.card {
  background: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  color: #64748b;
  font-size: 15px;
  cursor: pointer;
}

.card:hover {
  border-color: #059669;
  background: #f0fdf4;
  color: #065f46;
}`,
    [
      { level: 'easy',   uk: 'Зміни колір кнопки .btn при наведенні на синій (#3b82f6) замість зеленого.',                              ru: 'Измени цвет кнопки .btn при наведении на синий (#3b82f6) вместо зелёного.' },
      { level: 'medium', uk: 'Додай до .card:hover властивість box-shadow: 0 8px 24px rgba(0,0,0,0.12) — картка «підніметься».',        ru: 'Добавь к .card:hover свойство box-shadow: 0 8px 24px rgba(0,0,0,0.12) — карточка «поднимется».' },
      { level: 'hard',   uk: 'Додай новий пункт до меню і створи для нього :hover з іншим кольором фону, ніж у решти пунктів.',         ru: 'Добавь новый пункт в меню и создай для него :hover с другим цветом фона, чем у остальных пунктов.' },
    ]
  );

  /* ─── 03-02 ─────────────────────────────────────────────── */
  patch('03-02',
    {
      uk: `<h2>Псевдоклас :focus</h2>
<p><code>:focus</code> спрацьовує, коли елемент <strong>отримує фокус</strong> — наприклад, коли клікаєш на поле вводу або переходиш до нього клавішею Tab.</p>
<pre>input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}</pre>
<h3>Навіщо це потрібно?</h3>
<p>По-перше, це підказка користувачу: «ти зараз вводиш у це поле». По-друге, це важливо для доступності — люди, які керують сайтом із клавіатури, орієнтуються саме по фокусу.</p>
<h3>outline vs box-shadow</h3>
<ul>
  <li><code>outline: none</code> — прибирає стандартний браузерний контур (часто некрасивий).</li>
  <li>Замість нього ставимо свій красивий <code>box-shadow</code> — «ореол» навколо поля.</li>
</ul>
<p>⚠️ Не прибирай фокус повністю без заміни — це погіршує доступність.</p>`,
      ru: `<h2>Псевдокласс :focus</h2>
<p><code>:focus</code> срабатывает, когда элемент <strong>получает фокус</strong> — например, когда кликаешь на поле ввода или переходишь к нему клавишей Tab.</p>
<pre>input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}</pre>
<h3>Зачем это нужно?</h3>
<p>Во-первых, это подсказка пользователю: «ты сейчас вводишь в это поле». Во-вторых, это важно для доступности — люди, управляющие сайтом с клавиатуры, ориентируются именно по фокусу.</p>
<h3>outline vs box-shadow</h3>
<ul>
  <li><code>outline: none</code> — убирает стандартный браузерный контур (часто некрасивый).</li>
  <li>Вместо него ставим свой красивый <code>box-shadow</code> — «ореол» вокруг поля.</li>
</ul>
<p>⚠️ Не убирай фокус полностью без замены — это ухудшает доступность.</p>`
    },
    `<h1>Форма з красивим фокусом</h1>

<form>
  <div class="field">
    <label for="name">Ім'я</label>
    <input type="text" id="name" placeholder="Твоє ім'я">
  </div>

  <div class="field">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="example@mail.com">
  </div>

  <div class="field">
    <label for="msg">Повідомлення</label>
    <textarea id="msg" rows="3" placeholder="Напиши щось..."></textarea>
  </div>

  <button type="submit" class="btn">Надіслати</button>
</form>`,
    `body {
  font-family: Arial, sans-serif;
  max-width: 440px;
  margin: 0 auto;
  padding: 28px;
  background: #f1f5f9;
}

h1 { color: #1e293b; font-size: 20px; margin-bottom: 20px; }

.field { margin-bottom: 16px; }

label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  background: #fff;
  color: #1e293b;
  transition: border-color .2s, box-shadow .2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 11px 28px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

.btn:hover  { background: #2563eb; }
.btn:focus  { outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,.4); }`,
    [
      { level: 'easy',   uk: 'Зміни колір фокус-рамки з синього (#3b82f6) на фіолетовий (#7c3aed) і оновлений rgba() відповідно.',    ru: 'Измени цвет фокус-рамки с синего (#3b82f6) на фиолетовый (#7c3aed) и обнови rgba() соответственно.' },
      { level: 'medium', uk: 'Додай до input:focus збільшення: background: #eff6ff — блакитний фон при фокусі.',                         ru: 'Добавь к input:focus изменение фона: background: #eff6ff — голубой фон при фокусе.' },
      { level: 'hard',   uk: 'Додай новий стан input:focus + label (CSS sibling selector не підтримується, тому просто змінюй border-left: 4px solid #7c3aed у textarea:focus окремо від input:focus).', ru: 'Добавь textarea:focus отдельный стиль: border-left: 4px solid #7c3aed и background: #faf5ff — чтобы textarea выглядела иначе чем input при фокусе.' },
    ]
  );

  /* ─── 03-03 ─────────────────────────────────────────────── */
  patch('03-03',
    {
      uk: `<h2>:nth-child — стилізація N-го елемента</h2>
<p>Псевдоклас <code>:nth-child()</code> дозволяє вибирати елементи за їх порядковим номером серед братів і сестер.</p>
<h3>Синтаксис</h3>
<pre>li:nth-child(2)    { ... } /* лише другий елемент */
li:nth-child(odd)  { ... } /* непарні: 1, 3, 5... */
li:nth-child(even) { ... } /* парні: 2, 4, 6... */
li:nth-child(3n)   { ... } /* кожен третій: 3, 6, 9... */
li:nth-child(3n+1) { ... } /* 1, 4, 7, 10... */</pre>
<h3>Найчастіше використання</h3>
<p>«Зебра» у таблицях і списках — рядки почергово світлі та темні — робиться саме через <code>:nth-child(even)</code> або <code>:nth-child(odd)</code>:</p>
<pre>tr:nth-child(even) { background: #f0fdf4; }
tr:nth-child(odd)  { background: #fff; }</pre>`,
      ru: `<h2>:nth-child — стилизация N-го элемента</h2>
<p>Псевдокласс <code>:nth-child()</code> позволяет выбирать элементы по их порядковому номеру среди братьев и сестёр.</p>
<h3>Синтаксис</h3>
<pre>li:nth-child(2)    { ... } /* только второй элемент */
li:nth-child(odd)  { ... } /* нечётные: 1, 3, 5... */
li:nth-child(even) { ... } /* чётные: 2, 4, 6... */
li:nth-child(3n)   { ... } /* каждый третий: 3, 6, 9... */
li:nth-child(3n+1) { ... } /* 1, 4, 7, 10... */</pre>
<h3>Самое частое использование</h3>
<p>«Зебра» в таблицах и списках — строки поочерёдно светлые и тёмные — делается именно через <code>:nth-child(even)</code> или <code>:nth-child(odd)</code>:</p>
<pre>tr:nth-child(even) { background: #f0fdf4; }
tr:nth-child(odd)  { background: #fff; }</pre>`
    },
    `<h2>Список учнів</h2>
<ul class="students">
  <li>Олег Коваленко</li>
  <li>Аня Петрова</li>
  <li>Максим Бойко</li>
  <li>Соня Лисенко</li>
  <li>Кирил Мороз</li>
  <li>Дарина Савченко</li>
</ul>

<h2>Таблиця оцінок</h2>
<table>
  <tr><th>Учень</th><th>Математика</th><th>Англійська</th></tr>
  <tr><td>Олег</td><td>11</td><td>10</td></tr>
  <tr><td>Аня</td><td>12</td><td>12</td></tr>
  <tr><td>Максим</td><td>9</td><td>11</td></tr>
  <tr><td>Соня</td><td>12</td><td>12</td></tr>
  <tr><td>Кирил</td><td>10</td><td>9</td></tr>
</table>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f8fafc;
  max-width: 520px;
}

h2 { color: #1e293b; margin: 20px 0 10px; font-size: 17px; }

.students {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.students li {
  padding: 10px 16px;
  font-size: 15px;
  color: #374151;
}

/* Парні — темніші */
.students li:nth-child(even) { background: #e0f2fe; }
.students li:nth-child(odd)  { background: #fff; }

/* Перший — особливий */
.students li:nth-child(1) {
  font-weight: bold;
  color: #0369a1;
  background: #bae6fd;
}

table { border-collapse: collapse; width: 100%; }
th, td { padding: 10px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
th { background: #1e293b; color: #fff; }

/* «Зебра» у таблиці */
tr:nth-child(even) td { background: #f0fdf4; }
tr:nth-child(odd)  td { background: #fff; }`,
    [
      { level: 'easy',   uk: 'Зміни кольори «зебри» у списку: парні — #fef9c3 (жовтий), непарні — #fff.',                              ru: 'Измени цвета «зебры» в списке: чётные — #fef9c3 (жёлтый), нечётные — #fff.' },
      { level: 'medium', uk: 'Додай стиль для кожного третього учня: .students li:nth-child(3n) { font-style: italic; color: #7c3aed; }', ru: 'Добавь стиль для каждого третьего ученика: .students li:nth-child(3n) { font-style: italic; color: #7c3aed; }' },
      { level: 'hard',   uk: 'Виділи останній рядок таблиці жирним і іншим кольором фону за допомогою :nth-child(5) (або спробуй :last-child на tr).',  ru: 'Выдели последнюю строку таблицы жирным и другим цветом фона с помощью :nth-child(5) (или попробуй :last-child на tr).' },
    ]
  );

  /* ─── 03-04 ─────────────────────────────────────────────── */
  patch('03-04',
    {
      uk: `<h2>:first-child та :last-child</h2>
<p>Два зручних псевдокласи, які вибирають перший і останній дочірні елементи серед братів.</p>
<pre>li:first-child { font-weight: bold; }   /* перший */
li:last-child  { border-bottom: none; } /* останній */</pre>
<h3>Типові застосування</h3>
<ul>
  <li>Прибрати рамку в останнього пункту списку.</li>
  <li>Виділити перший елемент навігації.</li>
  <li>Закруглити кути тільки верхнього або нижнього блоку.</li>
</ul>
<h3>Споріднені псевдокласи</h3>
<ul>
  <li><code>:first-of-type</code> — перший серед елементів <em>свого типу</em> (наприклад, перший &lt;p&gt; серед різних тегів).</li>
  <li><code>:last-of-type</code> — останній свого типу.</li>
  <li><code>:only-child</code> — якщо він єдиний дочірній елемент.</li>
</ul>`,
      ru: `<h2>:first-child и :last-child</h2>
<p>Два удобных псевдокласса, которые выбирают первый и последний дочерние элементы среди братьев.</p>
<pre>li:first-child { font-weight: bold; }   /* первый */
li:last-child  { border-bottom: none; } /* последний */</pre>
<h3>Типичные применения</h3>
<ul>
  <li>Убрать рамку у последнего пункта списка.</li>
  <li>Выделить первый элемент навигации.</li>
  <li>Скруглить углы только верхнего или нижнего блока.</li>
</ul>
<h3>Родственные псевдоклассы</h3>
<ul>
  <li><code>:first-of-type</code> — первый среди элементов <em>своего типа</em> (например, первый &lt;p&gt; среди разных тегов).</li>
  <li><code>:last-of-type</code> — последний своего типа.</li>
  <li><code>:only-child</code> — если он единственный дочерний элемент.</li>
</ul>`
    },
    `<nav class="nav">
  <a href="#">Головна</a>
  <a href="#">Курси</a>
  <a href="#">Проекти</a>
  <a href="#">Блог</a>
  <a href="#">Контакти</a>
</nav>

<ul class="steps">
  <li>Встанови редактор коду</li>
  <li>Вивчи HTML</li>
  <li>Вивчи CSS</li>
  <li>Вивчи JavaScript</li>
  <li>Зроби свій перший проект!</li>
</ul>

<div class="blocks">
  <div class="block">Верхній</div>
  <div class="block">Середній</div>
  <div class="block">Нижній</div>
</div>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f8fafc;
  max-width: 480px;
}

/* Навігація */
.nav { display: flex; gap: 2px; margin-bottom: 24px; }
.nav a {
  padding: 9px 16px;
  text-decoration: none;
  background: #e2e8f0;
  color: #374151;
  font-size: 14px;
}
.nav a:first-child { border-radius: 8px 0 0 8px; background: #059669; color: #fff; }
.nav a:last-child  { border-radius: 0 8px 8px 0; }
.nav a:hover { background: #cbd5e1; }

/* Кроки */
.steps { padding: 0; list-style: none; margin-bottom: 24px; }
.steps li {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 15px;
  color: #374151;
  counter-increment: step;
}
.steps li:first-child { color: #059669; font-weight: bold; }
.steps li:last-child  { border-bottom: none; color: #7c3aed; font-weight: bold; }

/* Блоки */
.block {
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 14px 18px;
  font-size: 15px;
  color: #374151;
  text-align: center;
}
.block:first-child { border-radius: 10px 10px 0 0; background: #dbeafe; color: #1d4ed8; font-weight: bold; }
.block:last-child  { border-radius: 0 0 10px 10px; background: #fce7f3; color: #9d174d; font-weight: bold; }`,
    [
      { level: 'easy',   uk: 'Зміни колір першого посилання у навігації з зеленого (#059669) на фіолетовий (#7c3aed).',               ru: 'Измени цвет первого посилання в навигации с зелёного (#059669) на фиолетовый (#7c3aed).' },
      { level: 'medium', uk: 'Додай .steps li:nth-child(3) особливий стиль — виділи його як «поточний крок» іншим кольором фону.',    ru: 'Добавь .steps li:nth-child(3) особый стиль — выдели его как «текущий шаг» другим цветом фона.' },
      { level: 'hard',   uk: 'Додай четвертий .block до HTML і переконайся, що :first-child і :last-child автоматично перемістилися.', ru: 'Добавь четвёртый .block в HTML и убедись, что :first-child и :last-child автоматически переместились.' },
    ]
  );

  /* ─── 03-05 ─────────────────────────────────────────────── */
  patch('03-05',
    {
      uk: `<h2>Псевдоелемент ::before</h2>
<p>Псевдоелементи — це «уявні» елементи, які CSS додає до сторінки <em>без змін у HTML</em>. <code>::before</code> вставляє вміст <strong>перед</strong> текстом або вмістом реального елемента.</p>
<pre>h2::before {
  content: "🌟 ";
}</pre>
<p>Властивість <code>content</code> — обов'язкова для ::before і ::after. Навіть якщо нічого не хочеш вставляти — напиши <code>content: ""</code>.</p>
<h3>Що можна вставляти?</h3>
<ul>
  <li>Текст або символ: <code>content: "→ ";</code></li>
  <li>Emoji: <code>content: "🔥 ";</code></li>
  <li>Порожній блок (для декоративних ліній): <code>content: "";</code></li>
</ul>
<h3>::before — це повноцінний блок</h3>
<p>Йому можна задавати display, width, height, background, position і будь-які інші CSS-властивості.</p>`,
      ru: `<h2>Псевдоэлемент ::before</h2>
<p>Псевдоэлементы — это «воображаемые» элементы, которые CSS добавляет на страницу <em>без изменений в HTML</em>. <code>::before</code> вставляет содержимое <strong>перед</strong> текстом или содержимым реального элемента.</p>
<pre>h2::before {
  content: "🌟 ";
}</pre>
<p>Свойство <code>content</code> — обязательно для ::before и ::after. Даже если ничего не хочешь вставлять — напиши <code>content: ""</code>.</p>
<h3>Что можно вставлять?</h3>
<ul>
  <li>Текст или символ: <code>content: "→ ";</code></li>
  <li>Emoji: <code>content: "🔥 ";</code></li>
  <li>Пустой блок (для декоративных линий): <code>content: "";</code></li>
</ul>
<h3>::before — это полноценный блок</h3>
<p>Ему можно задавать display, width, height, background, position и любые другие CSS-свойства.</p>`
    },
    `<h2>Розділи уроку</h2>

<ul class="lesson-list">
  <li>Вступ до теми</li>
  <li>Основна теорія</li>
  <li>Практика</li>
  <li>Проект</li>
</ul>

<div class="alert">Важливо запам'ятати!</div>
<div class="alert alert-ok">Завдання виконано!</div>
<div class="alert alert-tip">Порада: зберігай файли частіше</div>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 28px;
  background: #f8fafc;
  max-width: 480px;
}

h2 { color: #1e293b; margin-bottom: 12px; }
h2::before { content: "📚 "; }

.lesson-list { list-style: none; padding: 0; margin-bottom: 20px; }
.lesson-list li {
  padding: 10px 14px;
  font-size: 15px;
  color: #374151;
  border-bottom: 1px solid #e2e8f0;
}
.lesson-list li::before {
  content: "▸ ";
  color: #059669;
  font-weight: bold;
}

.alert {
  padding: 13px 16px 13px 44px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 10px;
  position: relative;
  background: #fef3c7;
  color: #92400e;
}
.alert::before {
  content: "⚠️";
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
}
.alert-ok { background: #dcfce7; color: #166534; }
.alert-ok::before { content: "✅"; }
.alert-tip { background: #eff6ff; color: #1d4ed8; }
.alert-tip::before { content: "💡"; }`,
    [
      { level: 'easy',   uk: 'Зміни символ ::before у .lesson-list li з «▸» на «★» або будь-який інший символ.',                       ru: 'Измени символ ::before у .lesson-list li с «▸» на «★» или любой другой символ.' },
      { level: 'medium', uk: 'Додай новий блок .alert з класом alert-error (червоний) і ::before зі знаком «❌».',                       ru: 'Добавь новый блок .alert с классом alert-error (красный) и ::before со знаком «❌».' },
      { level: 'hard',   uk: 'Перероби .lesson-list li::before на порожній квадратик: content: ""; display: inline-block; width: 8px; height: 8px; background: #059669; margin-right: 10px; border-radius: 2px.', ru: 'Переделай .lesson-list li::before в пустой квадратик: content: ""; display: inline-block; width: 8px; height: 8px; background: #059669; margin-right: 10px; border-radius: 2px.' },
    ]
  );

  /* ─── 03-06 ─────────────────────────────────────────────── */
  patch('03-06',
    {
      uk: `<h2>Псевдоелемент ::after</h2>
<p><code>::after</code> — дзеркало <code>::before</code>: вставляє вміст <strong>після</strong> елемента. Логіка і синтаксис повністю ідентичні.</p>
<pre>h2::after {
  content: "";
  display: block;
  width: 40px;
  height: 3px;
  background: #059669;
  margin-top: 6px;
}</pre>
<p>Це популярний прийом — кольорова лінія-підкреслення під заголовком. Вона не залежить від border-bottom і дає більше свободи (ширина, колір, відступ).</p>
<h3>Інші популярні застосування ::after</h3>
<ul>
  <li>Значок «↗» після зовнішніх посилань.</li>
  <li>Крапка після пунктів нумерованого списку.</li>
  <li>Декоративна плашка у правому верхньому куті картки.</li>
  <li>Очищення потоку в старих Flexbox-хаках (clearfix).</li>
</ul>`,
      ru: `<h2>Псевдоэлемент ::after</h2>
<p><code>::after</code> — зеркало <code>::before</code>: вставляет содержимое <strong>после</strong> элемента. Логика и синтаксис полностью идентичны.</p>
<pre>h2::after {
  content: "";
  display: block;
  width: 40px;
  height: 3px;
  background: #059669;
  margin-top: 6px;
}</pre>
<p>Это популярный приём — цветная линия-подчёркивание под заголовком. Она не зависит от border-bottom и даёт больше свободы (ширина, цвет, отступ).</p>
<h3>Другие популярные применения ::after</h3>
<ul>
  <li>Значок «↗» после внешних ссылок.</li>
  <li>Точка после пунктов нумерованного списка.</li>
  <li>Декоративная плашка в правом верхнем углу карточки.</li>
  <li>Очистка потока в старых Flexbox-хаках (clearfix).</li>
</ul>`
    },
    `<h2>Про нас</h2>
<p>Ми — команда розробників, яка створює цікаві проекти для дітей.</p>

<h2>Наші курси</h2>
<p>HTML, CSS, JavaScript, Python — усе в одному місці.</p>

<a href="#" class="ext-link">Офіційний сайт</a>
<a href="#" class="ext-link">GitHub</a>

<div class="card-badge">
  <span class="badge">NEW</span>
  Новий курс із React!
</div>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 28px;
  max-width: 500px;
  background: #f8fafc;
}
p { color: #374151; line-height: 1.6; margin-bottom: 20px; }

/* Лінія під заголовком через ::after */
h2 {
  color: #1e293b;
  margin-bottom: 6px;
  display: inline-block;
}
h2::after {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #059669, transparent);
  margin-top: 4px;
  margin-bottom: 10px;
  border-radius: 2px;
}

/* Зовнішні посилання зі стрілкою */
.ext-link {
  display: inline-block;
  color: #2563eb;
  text-decoration: none;
  font-size: 15px;
  margin-right: 16px;
  margin-bottom: 20px;
}
.ext-link::after {
  content: " ↗";
  font-size: 12px;
  opacity: .6;
}
.ext-link:hover { text-decoration: underline; }

/* Картка з плашкою */
.card-badge {
  position: relative;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 18px 20px;
  font-size: 15px;
  color: #374151;
  overflow: hidden;
}
.badge {
  background: #f59e0b;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 4px;
  margin-right: 8px;
}`,
    [
      { level: 'easy',   uk: 'Зміни градієнт лінії ::after у h2 на суцільний колір: background: #3b82f6.',                              ru: 'Измени градиент линии ::after у h2 на сплошной цвет: background: #3b82f6.' },
      { level: 'medium', uk: 'Зміни символ ::after у .ext-link з «↗» на «→» і додай color: #059669.',                                   ru: 'Измени символ ::after у .ext-link с «↗» на «→» и добавь color: #059669.' },
      { level: 'hard',   uk: 'Зроби кольорову кутову плашку через ::after у .card-badge: position:absolute; top:0; right:0; content:"✨"; background:#7c3aed; color:#fff; padding:4px 8px; border-radius:0 10px 0 10px; font-size:12px.', ru: 'Сделай цветной угловой бейдж через ::after у .card-badge: position:absolute; top:0; right:0; content:"✨"; background:#7c3aed; color:#fff; padding:4px 8px; border-radius:0 10px 0 10px; font-size:12px.' },
    ]
  );

  /* ─── 03-07 ─────────────────────────────────────────────── */
  patch('03-07',
    {
      uk: `<h2>CSS-змінні: var()</h2>
<p>CSS-змінні (або CSS Custom Properties) дозволяють зберігати значення в одному місці і використовувати їх скрізь. Якщо захочеш змінити головний колір — зміниш лише в одному рядку!</p>
<h3>Оголошення змінних</h3>
<p>Змінні оголошуються у псевдоелементі <code>:root</code> (або всередині будь-якого селектора). Назва завжди починається з двох дефісів:</p>
<pre>:root {
  --primary: #059669;
  --text: #1e293b;
  --bg: #f0fdf4;
  --radius: 10px;
}</pre>
<h3>Використання через var()</h3>
<pre>button {
  background: var(--primary);
  color: #fff;
  border-radius: var(--radius);
}</pre>
<h3>Переваги</h3>
<ul>
  <li>Зміни одну змінну — весь сайт оновиться.</li>
  <li>Темна/світла тема — просто перевизначай змінні.</li>
  <li>Код стає читабельнішим: <code>var(--primary)</code> зрозуміліше, ніж <code>#059669</code>.</li>
</ul>`,
      ru: `<h2>CSS-переменные: var()</h2>
<p>CSS-переменные (или CSS Custom Properties) позволяют хранить значения в одном месте и использовать их везде. Если захочешь изменить главный цвет — изменишь только в одной строке!</p>
<h3>Объявление переменных</h3>
<p>Переменные объявляются в псевдоэлементе <code>:root</code> (или внутри любого селектора). Имя всегда начинается с двух дефисов:</p>
<pre>:root {
  --primary: #059669;
  --text: #1e293b;
  --bg: #f0fdf4;
  --radius: 10px;
}</pre>
<h3>Использование через var()</h3>
<pre>button {
  background: var(--primary);
  color: #fff;
  border-radius: var(--radius);
}</pre>
<h3>Преимущества</h3>
<ul>
  <li>Измени одну переменную — весь сайт обновится.</li>
  <li>Тёмная/светлая тема — просто переопределяй переменные.</li>
  <li>Код становится читабельнее: <code>var(--primary)</code> понятнее, чем <code>#059669</code>.</li>
</ul>`
    },
    `<div class="page">
  <h1>Мій дизайн</h1>
  <p>Всі кольори і розміри беруться з CSS-змінних.
     Спробуй змінити змінні у CSS!</p>

  <button class="btn">Основна кнопка</button>
  <button class="btn btn-secondary">Вторинна</button>

  <div class="card">
    <h3>Картка</h3>
    <p>Теж використовує var(--radius) і var(--primary).</p>
  </div>
</div>`,
    `:root {
  --primary:    #059669;
  --secondary:  #6d28d9;
  --text:       #1e293b;
  --text-light: #64748b;
  --bg:         #f0fdf4;
  --card-bg:    #ffffff;
  --radius:     12px;
  --shadow:     0 4px 16px rgba(0,0,0,0.08);
}

body {
  font-family: Arial, sans-serif;
  background: var(--bg);
  margin: 0;
  padding: 0;
}

.page {
  max-width: 480px;
  margin: 0 auto;
  padding: 32px 24px;
}

h1 { color: var(--primary); margin-bottom: 10px; }
p  { color: var(--text-light); line-height: 1.6; margin-bottom: 20px; }

.btn {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 11px 24px;
  border-radius: var(--radius);
  font-size: 15px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 20px;
}
.btn:hover { opacity: .85; }

.btn-secondary { background: var(--secondary); }

.card {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow);
}
.card h3 { color: var(--text); margin: 0 0 8px; }
.card p  { margin: 0; font-size: 14px; }`,
    [
      { level: 'easy',   uk: 'Зміни змінну --primary з зеленого (#059669) на синій (#2563eb). Подивись — усі елементи зміняться одразу!', ru: 'Измени переменную --primary с зелёного (#059669) на синий (#2563eb). Посмотри — все элементы изменятся сразу!' },
      { level: 'medium', uk: 'Зміни --bg на тёмний колір (#0f172a), --card-bg на #1e293b і --text-light на #94a3b8 — вийде темна тема.', ru: 'Измени --bg на тёмный (#0f172a), --card-bg на #1e293b и --text-light на #94a3b8 — получится тёмная тема.' },
      { level: 'hard',   uk: 'Додай нову змінну --font-size: 16px і використай її у p { font-size: var(--font-size); }. Потім зміни змінну і переконайся, що всі абзаци змінилися.', ru: 'Добавь новую переменную --font-size: 16px и используй её в p { font-size: var(--font-size); }. Затем измени переменную и убедись, что все абзацы изменились.' },
    ]
  );

  /* ─── 03-08 ─────────────────────────────────────────────── */
  patch('03-08',
    {
      uk: `<h2>CSS transitions: плавна зміна стилів</h2>
<p>До цього при :hover стилі змінювались миттєво. Властивість <code>transition</code> робить перехід <strong>плавним</strong>.</p>
<pre>button {
  background: #e2e8f0;
  transition: background 0.3s ease;
}
button:hover {
  background: #059669;
}</pre>
<h3>Синтаксис transition</h3>
<pre>transition: властивість тривалість функція затримка;

transition: background 0.3s ease;
transition: all 0.2s ease-in-out;
transition: color 0.2s, background 0.3s, transform 0.4s;</pre>
<h3>Функції плавності (easing)</h3>
<ul>
  <li><code>ease</code> — починає і закінчує повільно, швидше посередині (за замовчуванням)</li>
  <li><code>linear</code> — рівномірна швидкість</li>
  <li><code>ease-in</code> — починає повільно, прискорюється</li>
  <li><code>ease-out</code> — починає швидко, сповільнюється</li>
  <li><code>ease-in-out</code> — повільно на початку і в кінці</li>
</ul>
<p>Правило: <code>transition</code> пишеться на <strong>базовому</strong> стані елемента, а не в :hover.</p>`,
      ru: `<h2>CSS transitions: плавное изменение стилей</h2>
<p>До этого при :hover стили менялись мгновенно. Свойство <code>transition</code> делает переход <strong>плавным</strong>.</p>
<pre>button {
  background: #e2e8f0;
  transition: background 0.3s ease;
}
button:hover {
  background: #059669;
}</pre>
<h3>Синтаксис transition</h3>
<pre>transition: свойство длительность функция задержка;

transition: background 0.3s ease;
transition: all 0.2s ease-in-out;
transition: color 0.2s, background 0.3s, transform 0.4s;</pre>
<h3>Функции плавности (easing)</h3>
<ul>
  <li><code>ease</code> — начинает и заканчивает медленно (по умолчанию)</li>
  <li><code>linear</code> — равномерная скорость</li>
  <li><code>ease-in</code> — начинает медленно, ускоряется</li>
  <li><code>ease-out</code> — начинает быстро, замедляется</li>
  <li><code>ease-in-out</code> — медленно в начале и в конце</li>
</ul>
<p>Правило: <code>transition</code> пишется на <strong>базовом</strong> состоянии элемента, а не в :hover.</p>`
    },
    `<h2>Наводь мишку — тепер плавно!</h2>

<button class="btn">Кнопка з transition</button>

<div class="cards">
  <div class="card">Картка 1</div>
  <div class="card">Картка 2</div>
  <div class="card">Картка 3</div>
</div>

<a href="#" class="link">Посилання з плавним підкресленням</a>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 28px;
  background: #f8fafc;
}
h2 { color: #1e293b; margin-bottom: 20px; font-size: 18px; }

.btn {
  background: #e2e8f0;
  color: #374151;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 24px;
  /* transition тут, не у :hover! */
  transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;
}
.btn:hover {
  background: #059669;
  color: #fff;
  transform: translateY(-2px);
}

.cards {
  display: flex;
  gap: 14px;
  margin-bottom: 24px;
}
.card {
  flex: 1;
  background: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  padding: 24px 14px;
  text-align: center;
  font-size: 15px;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
}
.card:hover {
  border-color: #059669;
  background: #f0fdf4;
  box-shadow: 0 6px 20px rgba(5,150,105,.15);
}

.link {
  color: #2563eb;
  text-decoration: none;
  font-size: 16px;
  position: relative;
}
.link::after {
  content: "";
  position: absolute;
  left: 0; bottom: -2px;
  width: 0; height: 2px;
  background: #2563eb;
  transition: width 0.3s ease;
}
.link:hover::after { width: 100%; }`,
    [
      { level: 'easy',   uk: 'Зміни тривалість transition у .btn з 0.3s на 1s — рух стане повільним. Потім поверни 0.3s.',              ru: 'Измени длительность transition у .btn с 0.3s на 1s — движение станет медленным. Потом верни 0.3s.' },
      { level: 'medium', uk: 'Додай до .card transition для color і зміни колір тексту при наведенні: color: #065f46.',                  ru: 'Добавь к .card transition для color и измени цвет текста при наведении: color: #065f46.' },
      { level: 'hard',   uk: 'Зміни функцію плавності у кнопці з ease на ease-in-out, а у картках — на linear. Відчуй різницю!',         ru: 'Измени функцию плавности у кнопки с ease на ease-in-out, а у карточек — на linear. Почувствуй разницу!' },
    ]
  );

  /* ─── 03-09 ─────────────────────────────────────────────── */
  patch('03-09',
    {
      uk: `<h2>transform: translate, rotate, scale</h2>
<p>Властивість <code>transform</code> переміщує, повертає або масштабує елемент <strong>без зміни потоку документа</strong> — сусідні елементи не зрушуються.</p>
<h3>Основні функції</h3>
<pre>/* Переміщення */
transform: translate(20px, 10px);  /* праворуч 20px, вниз 10px */
transform: translateX(30px);       /* лише по горизонталі */
transform: translateY(-10px);      /* лише по вертикалі */

/* Поворот */
transform: rotate(45deg);    /* за годинниковою стрілкою */
transform: rotate(-30deg);   /* проти годинникової */

/* Масштаб */
transform: scale(1.2);   /* збільшити на 20% */
transform: scale(0.8);   /* зменшити до 80% */

/* Комбінування */
transform: scale(1.05) translateY(-4px) rotate(2deg);</pre>
<h3>Разом із transition</h3>
<p>transform без transition — миттєво. З transition — плавна анімація:</p>
<pre>.card { transition: transform 0.3s ease; }
.card:hover { transform: scale(1.05) translateY(-4px); }</pre>`,
      ru: `<h2>transform: translate, rotate, scale</h2>
<p>Свойство <code>transform</code> перемещает, поворачивает или масштабирует элемент <strong>без изменения потока документа</strong> — соседние элементы не сдвигаются.</p>
<h3>Основные функции</h3>
<pre>/* Перемещение */
transform: translate(20px, 10px);  /* вправо 20px, вниз 10px */
transform: translateX(30px);       /* только по горизонтали */
transform: translateY(-10px);      /* только по вертикали */

/* Поворот */
transform: rotate(45deg);    /* по часовой стрелке */
transform: rotate(-30deg);   /* против часовой */

/* Масштаб */
transform: scale(1.2);   /* увеличить на 20% */
transform: scale(0.8);   /* уменьшить до 80% */

/* Комбинирование */
transform: scale(1.05) translateY(-4px) rotate(2deg);</pre>
<h3>Вместе с transition</h3>
<p>transform без transition — мгновенно. С transition — плавная анимация:</p>
<pre>.card { transition: transform 0.3s ease; }
.card:hover { transform: scale(1.05) translateY(-4px); }</pre>`
    },
    `<h2>Грай з transform!</h2>

<div class="demo-row">
  <div class="box translate-demo">translate</div>
  <div class="box rotate-demo">rotate</div>
  <div class="box scale-demo">scale</div>
</div>

<h2>Наводь мишку на картки</h2>
<div class="cards">
  <div class="card card-lift">
    <div class="card-icon">🚀</div>
    <p>Підйом</p>
  </div>
  <div class="card card-zoom">
    <div class="card-icon">🔍</div>
    <p>Збільшення</p>
  </div>
  <div class="card card-tilt">
    <div class="card-icon">🎲</div>
    <p>Нахил</p>
  </div>
</div>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 28px;
  background: #0f172a;
  color: #e2e8f0;
}
h2 { font-size: 17px; margin: 0 0 20px; color: #94a3b8; }

.demo-row {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px;
  background: #1e293b;
  border-radius: 12px;
}

.box {
  width: 90px; height: 90px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: transform 0.4s ease;
}

.translate-demo { background: #3b82f6; }
.translate-demo:hover { transform: translate(15px, -15px); }

.rotate-demo { background: #f59e0b; }
.rotate-demo:hover { transform: rotate(180deg); }

.scale-demo { background: #ec4899; }
.scale-demo:hover { transform: scale(1.4); }

.cards { display: flex; gap: 16px; }

.card {
  flex: 1;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 14px;
  padding: 28px 16px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card p { margin: 8px 0 0; font-size: 14px; color: #94a3b8; }
.card-icon { font-size: 32px; }

.card-lift:hover  { transform: translateY(-12px); box-shadow: 0 16px 40px rgba(0,0,0,.4); }
.card-zoom:hover  { transform: scale(1.08); box-shadow: 0 8px 30px rgba(59,130,246,.3); }
.card-tilt:hover  { transform: rotate(-5deg) scale(1.05); }`,
    [
      { level: 'easy',   uk: 'Збільш кут повороту у .rotate-demo з 180deg до 360deg — повний оберт!',                                   ru: 'Увеличь угол поворота у .rotate-demo с 180deg до 360deg — полный оборот!' },
      { level: 'medium', uk: 'Зміни підйом у .card-lift з translateY(-12px) на translateY(-20px) і відчуй різницю.',                     ru: 'Измени подъём у .card-lift с translateY(-12px) на translateY(-20px) и почувствуй разницу.' },
      { level: 'hard',   uk: 'Додай до .scale-demo комбінований transform при наведенні: scale(1.3) rotate(10deg) translateY(-10px).', ru: 'Добавь к .scale-demo комбинированный transform при наведении: scale(1.3) rotate(10deg) translateY(-10px).' },
    ]
  );

  /* ─── 03-10 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('03-10',
    {
      uk: `<h2>🃏 Проект: Картка з ефектами при наведенні</h2>
<p>Час зібрати все, що вивчив у Модулі 3: :hover, transition, transform, ::before/::after і CSS-змінні — і створити ефектну інтерактивну картку.</p>
<h3>Що має бути на картці?</h3>
<ul>
  <li><strong>Зображення або велика іконка</strong> — візуальний центр</li>
  <li><strong>Заголовок і опис</strong></li>
  <li><strong>Тег або плашка</strong> через ::before або ::after</li>
  <li><strong>Кнопка «Детальніше»</strong></li>
  <li><strong>Ефекти при наведенні на картку:</strong>
    <ul>
      <li>підйом через transform: translateY()</li>
      <li>поглиблення тіні box-shadow</li>
      <li>плавний перехід через transition</li>
    </ul>
  </li>
</ul>
<h3>Ідеї для теми</h3>
<p>Гра, фільм, книга, музичний гурт, улюблений герой, рецепт, місто — будь-що!</p>`,
      ru: `<h2>🃏 Проект: Карточка с эффектами при наведении</h2>
<p>Время собрать всё, что изучил в Модуле 3: :hover, transition, transform, ::before/::after и CSS-переменные — и создать эффектную интерактивную карточку.</p>
<h3>Что должно быть на карточке?</h3>
<ul>
  <li><strong>Изображение или большая иконка</strong> — визуальный центр</li>
  <li><strong>Заголовок и описание</strong></li>
  <li><strong>Тег или плашка</strong> через ::before или ::after</li>
  <li><strong>Кнопка «Подробнее»</strong></li>
  <li><strong>Эффекты при наведении на карточку:</strong>
    <ul>
      <li>подъём через transform: translateY()</li>
      <li>углубление тени box-shadow</li>
      <li>плавный переход через transition</li>
    </ul>
  </li>
</ul>
<h3>Идеи для темы</h3>
<p>Игра, фильм, книга, музыкальная группа, любимый герой, рецепт, город — что угодно!</p>`
    },
    `<div class="scene">

  <div class="card">
    <div class="card-image">🎮</div>
    <div class="card-body">
      <h2>Minecraft</h2>
      <p>Будуй, досліджуй і виживай у кубічному світі без меж!</p>
      <div class="tags">
        <span class="tag">Пригоди</span>
        <span class="tag">Творчість</span>
      </div>
      <button class="btn">Детальніше →</button>
    </div>
  </div>

  <div class="card card-alt">
    <div class="card-image">🎵</div>
    <div class="card-body">
      <h2>Улюблена музика</h2>
      <p>Тут можна написати про свій улюблений альбом або виконавця.</p>
      <div class="tags">
        <span class="tag">Музика</span>
        <span class="tag">Рок</span>
      </div>
      <button class="btn">Слухати →</button>
    </div>
  </div>

</div>`,
    `:root {
  --accent: #059669;
  --radius: 16px;
  --shadow-base: 0 4px 16px rgba(0,0,0,.25);
  --shadow-hover: 0 20px 48px rgba(0,0,0,.4);
}

* { box-sizing: border-box; }
body {
  font-family: Arial, sans-serif;
  background: #0f172a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.scene {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 240px;
  background: #1e293b;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-base);
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  position: relative;
}
.card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: var(--shadow-hover);
}

/* Плашка «Топ» через ::before */
.card::before {
  content: "★ Топ";
  position: absolute;
  top: 12px; right: 12px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 20px;
}
.card-alt::before { content: "♥ Улюблене"; background: #ec4899; }

.card-image {
  font-size: 64px;
  text-align: center;
  padding: 28px 0 20px;
  background: linear-gradient(135deg, #1e3a5f, #0f172a);
}

.card-body { padding: 18px; }

.card-body h2 {
  margin: 0 0 8px;
  font-size: 18px;
  color: #f1f5f9;
}
.card-body p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0 0 14px;
}

.tags { display: flex; gap: 6px; margin-bottom: 14px; flex-wrap: wrap; }
.tag {
  background: rgba(5,150,105,.2);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 20px;
  border: 1px solid rgba(5,150,105,.3);
}

.btn {
  width: 100%;
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity .2s;
}
.btn:hover { opacity: .85; }`,
    [
      { level: 'easy',   uk: 'Зміни тему першої картки: інша іконка, заголовок і текст (улюблена гра, фільм або книга).',               ru: 'Смени тему первой карточки: другая иконка, заголовок и текст (любимая игра, фильм или книга).' },
      { level: 'medium', uk: 'Зміни CSS-змінну --accent на інший колір і подивись, як одразу зміняться плашка, теги і кнопки.',         ru: 'Измени CSS-переменную --accent на другой цвет и посмотри, как сразу изменятся плашка, теги и кнопки.' },
      { level: 'hard',   uk: 'Додай третю картку на свою тему з нуля: нова іконка, заголовок, опис, 2 теги, кнопка і свій колір ::before.', ru: 'Добавь третью карточку на свою тему с нуля: новая иконка, заголовок, описание, 2 тега, кнопка и свой цвет ::before.' },
      { level: 'extra',  uk: 'Зміни ефект наведення: замість підйому зроби легкий поворот — transform: rotate(2deg) scale(1.03).', ru: 'Измени эффект наведения: вместо подъёма сделай лёгкий поворот — transform: rotate(2deg) scale(1.03).' },
    ]
  );

})();
