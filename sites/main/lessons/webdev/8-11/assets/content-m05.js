/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 5 — CSS Grid · 8–11 Веб-Старт
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

  /* ─── 05-01 ─────────────────────────────────────────────── */
  patch('05-01',
    {
      uk: `<h2>display: grid і перші колонки</h2>
<p>CSS Grid — це двовимірна система розмітки. На відміну від Flexbox (одна вісь), Grid керує одночасно рядками <strong>і</strong> колонками.</p>
<pre>.container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* 3 колонки по 200px */
}</pre>
<h3>Ключові поняття Grid</h3>
<ul>
  <li><strong>Grid-контейнер</strong> — елемент з <code>display: grid</code>.</li>
  <li><strong>Grid-елементи</strong> — прямі нащадки контейнера.</li>
  <li><strong>Grid-лінії</strong> — невидимі лінії, що ділять сітку на стовпці і рядки.</li>
  <li><strong>Grid-клітинка</strong> — перетин рядка і стовпця.</li>
  <li><strong>Grid-область</strong> — одна або кілька клітинок разом.</li>
</ul>
<h3>Grid vs Flexbox</h3>
<ul>
  <li>Flexbox — <strong>один вимір</strong>: або рядок, або колонка.</li>
  <li>Grid — <strong>два виміри</strong>: рядки і колонки одночасно.</li>
  <li>Використовуй Grid для загального макету сторінки, Flexbox — для вирівнювання елементів всередині.</li>
</ul>`,
      ru: `<h2>display: grid и первые колонки</h2>
<p>CSS Grid — это двумерная система разметки. В отличие от Flexbox (одна ось), Grid управляет одновременно строками <strong>и</strong> столбцами.</p>
<pre>.container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* 3 колонки по 200px */
}</pre>
<h3>Ключевые понятия Grid</h3>
<ul>
  <li><strong>Grid-контейнер</strong> — элемент с <code>display: grid</code>.</li>
  <li><strong>Grid-элементы</strong> — прямые потомки контейнера.</li>
  <li><strong>Grid-линии</strong> — невидимые линии, делящие сетку на столбцы и строки.</li>
  <li><strong>Grid-ячейка</strong> — пересечение строки и столбца.</li>
  <li><strong>Grid-область</strong> — одна или несколько ячеек вместе.</li>
</ul>
<h3>Grid vs Flexbox</h3>
<ul>
  <li>Flexbox — <strong>один измерение</strong>: либо строка, либо колонка.</li>
  <li>Grid — <strong>два измерения</strong>: строки и столбцы одновременно.</li>
  <li>Используй Grid для общего макета страницы, Flexbox — для выравнивания элементов внутри.</li>
</ul>`
    },
    `<h2>Без grid — блоки один під одним</h2>
<div class="no-grid">
  <div class="cell">1</div><div class="cell">2</div>
  <div class="cell">3</div><div class="cell">4</div>
  <div class="cell">5</div><div class="cell">6</div>
</div>

<h2>З display: grid — 3 колонки</h2>
<div class="with-grid">
  <div class="cell">1</div><div class="cell">2</div>
  <div class="cell">3</div><div class="cell">4</div>
  <div class="cell">5</div><div class="cell">6</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
h2 { font-size: 14px; color: #64748b; margin: 16px 0 8px; }

.cell {
  background: #7c3aed; color: #fff;
  padding: 20px; border-radius: 8px;
  font-size: 20px; font-weight: bold;
  text-align: center;
}

.no-grid { background: #fee2e2; padding: 10px; border-radius: 8px; margin-bottom: 10px; }

.with-grid {
  display: grid;
  grid-template-columns: 150px 150px 150px;
  gap: 8px;
  background: #dcfce7;
  padding: 10px;
  border-radius: 8px;
}`,
    [
      { level: 'easy',   uk: 'Зміни .with-grid на 2 колонки (видали третю 150px з grid-template-columns).',                      ru: 'Измени .with-grid на 2 колонки (удали третью 150px из grid-template-columns).' },
      { level: 'medium', uk: 'Додай четвертий аргумент до grid-template-columns: 200px 100px 150px 200px — зроби 4 колонки різної ширини.', ru: 'Добавь четвёртый аргумент к grid-template-columns: 200px 100px 150px 200px — сделай 4 колонки разной ширины.' },
      { level: 'hard',   uk: 'Додай до .no-grid display: grid і grid-template-columns: 150px 150px 150px — що змінилося? Чи стали вони однаковими?', ru: 'Добавь к .no-grid display: grid и grid-template-columns: 150px 150px 150px — что изменилось? Стали ли они одинаковыми?' },
    ]
  );

  /* ─── 05-02 ─────────────────────────────────────────────── */
  patch('05-02',
    {
      uk: `<h2>grid-template-columns: repeat() та fr</h2>
<p>Два найважливіші інструменти CSS Grid: <code>repeat()</code> скорочує запис повторюваних колонок, а <code>fr</code> (fraction — частка) розподіляє вільний простір.</p>
<h3>repeat()</h3>
<pre>/* Довга форма */
grid-template-columns: 1fr 1fr 1fr 1fr;

/* Коротка форма через repeat */
grid-template-columns: repeat(4, 1fr); /* 4 рівні колонки */
grid-template-columns: repeat(3, 200px); /* 3 колонки по 200px */</pre>
<h3>Одиниця fr (fraction)</h3>
<p>fr — частка <strong>вільного простору</strong> після fixed-колонок:</p>
<pre>grid-template-columns: 250px 1fr 1fr;
/* 250px — фіксована, потім 2 рівні частки від того, що залишилося */

grid-template-columns: 1fr 2fr 1fr;
/* Центральна вдвічі ширша за бокові */</pre>`,
      ru: `<h2>grid-template-columns: repeat() и fr</h2>
<p>Два важнейших инструмента CSS Grid: <code>repeat()</code> сокращает запись повторяющихся колонок, а <code>fr</code> (fraction — доля) распределяет свободное пространство.</p>
<h3>repeat()</h3>
<pre>/* Длинная форма */
grid-template-columns: 1fr 1fr 1fr 1fr;

/* Короткая форма через repeat */
grid-template-columns: repeat(4, 1fr); /* 4 равные колонки */
grid-template-columns: repeat(3, 200px); /* 3 колонки по 200px */</pre>
<h3>Единица fr (fraction)</h3>
<p>fr — доля <strong>свободного пространства</strong> после fixed-колонок:</p>
<pre>grid-template-columns: 250px 1fr 1fr;
/* 250px — фиксированная, затем 2 равные доли от оставшегося */

grid-template-columns: 1fr 2fr 1fr;
/* Центральная вдвое шире боковых */</pre>`
    },
    `<h2>repeat(3, 1fr) — 3 рівні колонки</h2>
<div class="grid g-equal">
  <div class="cell a">1fr</div><div class="cell b">1fr</div><div class="cell c">1fr</div>
</div>

<h2>1fr 2fr 1fr — центральна вдвічі ширша</h2>
<div class="grid g-wide-center">
  <div class="cell a">1fr</div><div class="cell b">2fr (ширша)</div><div class="cell c">1fr</div>
</div>

<h2>250px + 1fr + 1fr — сайдбар + 2 колонки</h2>
<div class="grid g-sidebar">
  <div class="cell a">250px (sidebar)</div>
  <div class="cell b">1fr</div>
  <div class="cell c">1fr</div>
</div>

<h2>repeat(4, 1fr) — 4 рівні колонки</h2>
<div class="grid g-four">
  <div class="cell a">1</div><div class="cell b">2</div>
  <div class="cell c">3</div><div class="cell a">4</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 13px; color: #94a3b8; margin: 16px 0 8px; font-family: monospace; }

.grid { gap: 8px; margin-bottom: 10px; }
.cell {
  padding: 16px 10px; border-radius: 8px;
  color: #fff; font-size: 13px; text-align: center; font-weight: bold;
}
.a { background: #7c3aed; }
.b { background: #059669; }
.c { background: #0369a1; }

.g-equal       { display: grid; grid-template-columns: repeat(3, 1fr); }
.g-wide-center { display: grid; grid-template-columns: 1fr 2fr 1fr; }
.g-sidebar     { display: grid; grid-template-columns: 250px 1fr 1fr; }
.g-four        { display: grid; grid-template-columns: repeat(4, 1fr); }`,
    [
      { level: 'easy',   uk: 'Зміни .g-four на repeat(5, 1fr) і додай п\'ятий .cell до відповідної секції.',                     ru: 'Измени .g-four на repeat(5, 1fr) и добавь пятый .cell в соответствующую секцию.' },
      { level: 'medium', uk: 'Зміни .g-wide-center на 1fr 3fr 1fr — центральна стане вчетверо ширшою за крайні.',                ru: 'Измени .g-wide-center на 1fr 3fr 1fr — центральная станет вчетверо шире крайних.' },
      { level: 'hard',   uk: 'Зміни .g-sidebar: sidebar має бути 200px, потім 2fr і 1fr (а не 1fr і 1fr). Яка візуальна різниця?', ru: 'Измени .g-sidebar: sidebar должен быть 200px, затем 2fr и 1fr (а не 1fr и 1fr). Какая визуальная разница?' },
    ]
  );

  /* ─── 05-03 ─────────────────────────────────────────────── */
  patch('05-03',
    {
      uk: `<h2>grid-template-rows: висота рядків</h2>
<p><code>grid-template-rows</code> задає висоту рядків сітки — так само, як grid-template-columns задає ширину стовпців.</p>
<pre>grid-template-rows: 100px 200px 100px;
/* 3 рядки: перший і третій по 100px, другий — 200px */

grid-template-rows: repeat(3, 80px);
/* 3 однакові рядки по 80px */

grid-template-rows: auto 1fr auto;
/* Верхній і нижній — за вмістом, середній — весь вільний простір */</pre>
<h3>Значення auto</h3>
<p><code>auto</code> — рядок підлаштовує висоту під свій вміст. Корисно для header і footer, коли основний вміст має заповнювати весь простір між ними.</p>
<pre>body {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto; /* header | main | footer */
}</pre>`,
      ru: `<h2>grid-template-rows: высота строк</h2>
<p><code>grid-template-rows</code> задаёт высоту строк сетки — так же, как grid-template-columns задаёт ширину столбцов.</p>
<pre>grid-template-rows: 100px 200px 100px;
/* 3 строки: первая и третья по 100px, вторая — 200px */

grid-template-rows: repeat(3, 80px);
/* 3 одинаковые строки по 80px */

grid-template-rows: auto 1fr auto;
/* Верхняя и нижняя — по содержимому, средняя — всё свободное пространство */</pre>
<h3>Значение auto</h3>
<p><code>auto</code> — строка подстраивает высоту под своё содержимое. Полезно для header и footer, когда основной контент должен занимать всё пространство между ними.</p>
<pre>body {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto; /* header | main | footer */
}</pre>`
    },
    `<div class="page">
  <header class="hdr">🌐 Шапка (auto — висота за вмістом)</header>
  <main class="main">
    <div class="page-grid">
      <div class="cell r1">Рядок 1: 60px</div>
      <div class="cell r2">Рядок 2: 120px (вищий)</div>
      <div class="cell r3">Рядок 3: 60px</div>
    </div>
    Основний контент (1fr — займає весь вільний простір)
  </main>
  <footer class="ftr">Підвал (auto — висота за вмістом)</footer>
</div>`,
    `* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; }

.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.hdr {
  background: #1e293b;
  padding: 18px 24px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #334155;
}
.ftr {
  background: #1e293b;
  padding: 14px 24px;
  font-size: 13px;
  color: #64748b;
  border-top: 2px solid #334155;
  text-align: center;
}

.main {
  padding: 20px;
  font-size: 14px;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.page-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 120px 60px;
  gap: 8px;
}
.cell {
  background: #7c3aed; color: #fff;
  border-radius: 8px; padding: 10px 16px;
  font-size: 14px; font-weight: bold;
  display: flex; align-items: center;
}
.r1 { background: #7c3aed; }
.r2 { background: #059669; }
.r3 { background: #0369a1; }`,
    [
      { level: 'easy',   uk: 'Зміни grid-template-rows у .page-grid на repeat(3, 80px) — всі три клітинки стануть однакової висоти.', ru: 'Измени grid-template-rows у .page-grid на repeat(3, 80px) — все три ячейки станут одинаковой высоты.' },
      { level: 'medium', uk: 'Зміни .page-grid: зроби 2 колонки і 2 рядки (grid-template-columns: 1fr 1fr; grid-template-rows: 80px 80px). Додай четверту клітинку .cell.',                     ru: 'Измени .page-grid: сделай 2 колонки и 2 строки (grid-template-columns: 1fr 1fr; grid-template-rows: 80px 80px). Добавь четвёртую ячейку .cell.' },
      { level: 'hard',   uk: 'Поекспериментуй з grid-template-rows у .page: замість auto 1fr auto зроби 80px 1fr 60px. Чим це відрізняється від auto?',                                       ru: 'Поэкспериментируй с grid-template-rows у .page: вместо auto 1fr auto сделай 80px 1fr 60px. Чем это отличается от auto?' },
    ]
  );

  /* ─── 05-04 ─────────────────────────────────────────────── */
  patch('05-04',
    {
      uk: `<h2>gap та column-gap / row-gap</h2>
<p>Як і у Flexbox, <code>gap</code> задає проміжки між клітинками Grid. Але тут ти можеш незалежно керувати горизонтальними і вертикальними проміжками.</p>
<pre>.grid {
  display: grid;
  gap: 16px;          /* однаковий в обох напрямках */
  gap: 20px 40px;     /* row-gap | column-gap */
  row-gap: 20px;      /* лише між рядками */
  column-gap: 40px;   /* лише між стовпцями */
}</pre>
<h3>Застосування</h3>
<ul>
  <li>Галерея зображень — квадратний gap для рівних відступів.</li>
  <li>Сітка карток — більший column-gap (візуально відокремлює карток), менший row-gap (рядки ближче).</li>
  <li>Макет сторінки — нульовий gap між блоками шапки/підвалу і великий для карток.</li>
</ul>`,
      ru: `<h2>gap и column-gap / row-gap</h2>
<p>Как и во Flexbox, <code>gap</code> задаёт промежутки между ячейками Grid. Но здесь можно независимо управлять горизонтальными и вертикальными промежутками.</p>
<pre>.grid {
  display: grid;
  gap: 16px;          /* одинаковый в обоих направлениях */
  gap: 20px 40px;     /* row-gap | column-gap */
  row-gap: 20px;      /* только между строками */
  column-gap: 40px;   /* только между столбцами */
}</pre>
<h3>Применение</h3>
<ul>
  <li>Галерея изображений — квадратный gap для равных отступов.</li>
  <li>Сетка карточек — больший column-gap (визуально разделяет карточки), меньший row-gap (строки ближе).</li>
  <li>Макет страницы — нулевой gap между блоками шапки/подвала и большой для карточек.</li>
</ul>`
    },
    `<h2>gap: 0</h2>
<div class="grid g0">
  <div class="c">A</div><div class="c">B</div><div class="c">C</div>
  <div class="c">D</div><div class="c">E</div><div class="c">F</div>
</div>

<h2>gap: 8px (квадратний)</h2>
<div class="grid g8">
  <div class="c">A</div><div class="c">B</div><div class="c">C</div>
  <div class="c">D</div><div class="c">E</div><div class="c">F</div>
</div>

<h2>gap: 4px 24px (маленький row, великий column)</h2>
<div class="grid g-asym">
  <div class="c">A</div><div class="c">B</div><div class="c">C</div>
  <div class="c">D</div><div class="c">E</div><div class="c">F</div>
</div>

<h2>gap: 24px (великий)</h2>
<div class="grid g24">
  <div class="c">A</div><div class="c">B</div><div class="c">C</div>
  <div class="c">D</div><div class="c">E</div><div class="c">F</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
h2 { font-size: 13px; color: #64748b; margin: 16px 0 8px; font-family: monospace; }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); background: #e2e8f0; padding: 8px; border-radius: 8px; margin-bottom: 10px; }
.c {
  background: #059669; color: #fff; padding: 14px;
  border-radius: 6px; font-size: 18px; font-weight: bold; text-align: center;
}

.g0    { gap: 0; }
.g8    { gap: 8px; }
.g-asym{ gap: 4px 24px; }
.g24   { gap: 24px; }`,
    [
      { level: 'easy',   uk: 'Зміни .g8 на gap: 20px і подивись, як збільшаться відступи.',                                      ru: 'Измени .g8 на gap: 20px и посмотри, как увеличатся отступы.' },
      { level: 'medium', uk: 'Зміни .g-asym на row-gap: 20px; column-gap: 4px (протилежне) і порівняй результат.',              ru: 'Измени .g-asym на row-gap: 20px; column-gap: 4px (противоположное) и сравни результат.' },
      { level: 'hard',   uk: 'Зроби галерею зображень 3×3 з gap: 4px: додай 9 клітинок .c і зроби їх квадратними через padding-bottom: 100%.',   ru: 'Сделай галерею изображений 3×3 с gap: 4px: добавь 9 ячеек .c и сделай их квадратными через padding-bottom: 100%.' },
    ]
  );

  /* ─── 05-05 ─────────────────────────────────────────────── */
  patch('05-05',
    {
      uk: `<h2>grid-column та grid-row: охоплення клітинок</h2>
<p>За замовчуванням кожен grid-елемент займає одну клітинку. Але ти можеш змусити елемент охопити кілька стовпців або рядків — як у таблиці через colspan/rowspan.</p>
<pre>/* Охопити 2 стовпці (від лінії 1 до лінії 3) */
.wide { grid-column: 1 / 3; }

/* Скорочення через span */
.wide { grid-column: span 2; } /* займає 2 стовпці */
.tall { grid-row: span 2; }    /* займає 2 рядки */

/* Конкретна позиція */
.item { grid-column: 2 / 4; grid-row: 1 / 3; }</pre>
<h3>Як рахувати лінії Grid</h3>
<p>Сітка 3 колонки має 4 вертикальні лінії (1, 2, 3, 4). Щоб охопити всі 3 стовпці: <code>grid-column: 1 / 4</code>.</p>
<p>Лінія -1 означає «до кінця»: <code>grid-column: 1 / -1</code> охоплює всі стовпці.</p>`,
      ru: `<h2>grid-column и grid-row: охват ячеек</h2>
<p>По умолчанию каждый grid-элемент занимает одну ячейку. Но можно заставить элемент охватить несколько столбцов или строк — как в таблице через colspan/rowspan.</p>
<pre>/* Охватить 2 столбца (от линии 1 до линии 3) */
.wide { grid-column: 1 / 3; }

/* Сокращение через span */
.wide { grid-column: span 2; } /* занимает 2 столбца */
.tall { grid-row: span 2; }    /* занимает 2 строки */

/* Конкретная позиция */
.item { grid-column: 2 / 4; grid-row: 1 / 3; }</pre>
<h3>Как считать линии Grid</h3>
<p>Сетка 3 колонки имеет 4 вертикальные линии (1, 2, 3, 4). Чтобы охватить все 3 столбца: <code>grid-column: 1 / 4</code>.</p>
<p>Линия -1 означает «до конца»: <code>grid-column: 1 / -1</code> охватывает все столбцы.</p>`
    },
    `<div class="grid">
  <div class="cell header">Шапка (grid-column: 1 / -1)</div>

  <div class="cell featured">Великий блок (span 2 col + span 2 row)</div>
  <div class="cell side-1">Правий 1</div>
  <div class="cell side-2">Правий 2</div>

  <div class="cell bottom-1">Низ 1</div>
  <div class="cell bottom-2">Низ 2</div>
  <div class="cell bottom-3">Низ 3</div>

  <div class="cell footer">Підвал (1 / -1)</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #fff; }

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.cell {
  background: #1e293b;
  padding: 20px 16px;
  border-radius: 10px;
  font-size: 13px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 70px;
}

.header   { grid-column: 1 / -1; background: #7c3aed; color: #fff; font-weight: bold; font-size: 15px; }
.featured { grid-column: span 2; grid-row: span 2; background: #059669; color: #fff; font-size: 14px; font-weight: bold; }
.side-1   { background: #0369a1; color: #fff; }
.side-2   { background: #0369a1; color: #fff; }
.bottom-1 { background: #b45309; color: #fff; }
.bottom-2 { background: #b45309; color: #fff; }
.bottom-3 { background: #b45309; color: #fff; }
.footer   { grid-column: 1 / -1; background: #334155; color: #94a3b8; }`,
    [
      { level: 'easy',   uk: 'Зміни .featured на grid-column: span 1 і подивись, як він стане звичайним одним блоком.',          ru: 'Измени .featured на grid-column: span 1 и посмотри, как он станет обычным одним блоком.' },
      { level: 'medium', uk: 'Зроби .bottom-2 широким на 2 клітинки через grid-column: span 2. Що трапиться з .bottom-3?',       ru: 'Сделай .bottom-2 широким на 2 ячейки через grid-column: span 2. Что произойдёт с .bottom-3?' },
      { level: 'hard',   uk: 'Додай новий блок .special з grid-column: 2 / 4 і grid-row: 2 / 4 — поекспериментуй де він з\'явиться в сітці.', ru: 'Добавь новый блок .special с grid-column: 2 / 4 и grid-row: 2 / 4 — поэкспериментируй, где он появится в сетке.' },
    ]
  );

  /* ─── 05-06 ─────────────────────────────────────────────── */
  patch('05-06',
    {
      uk: `<h2>grid-template-areas: іменовані зони макету</h2>
<p>Замість числових ліній можна дати зонам Grid <strong>імена</strong> і будувати макет як «карту»:</p>
<pre>.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }</pre>
<h3>Правила</h3>
<ul>
  <li>Кожен рядок — рядок у лапках, клітинки розділені пробілами.</li>
  <li>Однакове ім'я = одна зона, що охоплює кілька клітинок.</li>
  <li>Крапка <code>.</code> — порожня клітинка.</li>
  <li>Всі рядки мають мати однакову кількість стовпців.</li>
</ul>`,
      ru: `<h2>grid-template-areas: именованные зоны макета</h2>
<p>Вместо числовых линий можно дать зонам Grid <strong>имена</strong> и строить макет как «карту»:</p>
<pre>.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }</pre>
<h3>Правила</h3>
<ul>
  <li>Каждая строка — строка в кавычках, ячейки разделены пробелами.</li>
  <li>Одинаковое имя = одна зона, охватывающая несколько ячеек.</li>
  <li>Точка <code>.</code> — пустая ячейка.</li>
  <li>Все строки должны иметь одинаковое количество столбцов.</li>
</ul>`
    },
    `<div class="page">
  <header class="header">🌐 Шапка (header)</header>
  <aside class="sidebar">
    📋 Сайдбар
    <nav>
      <a href="#">Головна</a>
      <a href="#">Курси</a>
      <a href="#">Про нас</a>
    </nav>
  </aside>
  <main class="main">
    <h2>Основний контент (main)</h2>
    <p>Тут розміщується основна стаття, картки або будь-який інший вміст сторінки.</p>
    <p>Зверни увагу, як grid-template-areas дозволяє «намалювати» макет у CSS — це дуже читабельно!</p>
  </main>
  <footer class="footer">© 2025 Веб-Академія</footer>
</div>`,
    `* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; }

.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 10px;
  padding: 10px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}

.header  { grid-area: header;  background: #7c3aed; padding: 16px 24px; border-radius: 10px; font-size: 18px; font-weight: bold; color: #fff; }
.sidebar {
  grid-area: sidebar;
  background: #1e293b;
  padding: 20px 16px;
  border-radius: 10px;
}
.sidebar nav { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
.sidebar nav a { color: #94a3b8; text-decoration: none; font-size: 14px; padding: 8px 10px; border-radius: 6px; }
.sidebar nav a:hover { background: #334155; color: #f8fafc; }
.main    {
  grid-area: main;
  background: #1e293b;
  padding: 24px;
  border-radius: 10px;
}
.main h2 { margin: 0 0 12px; color: #f8fafc; font-size: 18px; }
.main p  { color: #94a3b8; line-height: 1.6; margin: 0 0 10px; }
.footer  { grid-area: footer; background: #1e293b; padding: 14px 24px; border-radius: 10px; color: #64748b; font-size: 13px; text-align: center; }`,
    [
      { level: 'easy',   uk: 'Поміняй sidebar і main місцями в grid-template-areas (sidebar праворуч, main ліворуч) — не змінюй HTML!', ru: 'Поменяй sidebar и main местами в grid-template-areas (sidebar справа, main слева) — не меняй HTML!' },
      { level: 'medium', uk: 'Зміни макет: прибери sidebar і зроби main на всю ширину через "header header" / "main main" / "footer footer".', ru: 'Измени макет: убери sidebar и сделай main на всю ширину через "header header" / "main main" / "footer footer".' },
      { level: 'hard',   uk: 'Додай третю колонку: "header header header" / "sidebar main aside" / "footer footer footer". Створи &lt;aside class="aside"&gt; з grid-area: aside.', ru: 'Добавь третью колонку: "header header header" / "sidebar main aside" / "footer footer footer". Создай &lt;aside class="aside"&gt; с grid-area: aside.' },
    ]
  );

  /* ─── 05-07 ─────────────────────────────────────────────── */
  patch('05-07',
    {
      uk: `<h2>auto-fill та auto-fit: адаптивні колонки</h2>
<p>Найпотужніша можливість Grid для адаптивних макетів — автоматичне визначення кількості колонок залежно від ширини контейнера.</p>
<h3>auto-fill</h3>
<p>Створює стільки колонок, скільки вміщається, навіть якщо деякі порожні:</p>
<pre>grid-template-columns: repeat(auto-fill, 200px);</pre>
<h3>auto-fit</h3>
<p>Те саме, але розтягує наявні елементи, щоб заповнити порожні колонки:</p>
<pre>grid-template-columns: repeat(auto-fit, 200px);</pre>
<h3>З minmax — найпопулярніша техніка</h3>
<pre>/* Картки мінімум 250px, але ростуть до 1fr */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));</pre>
<p>Це «магічна рядок» — один рядок CSS створює адаптивну сітку без media queries!</p>`,
      ru: `<h2>auto-fill и auto-fit: адаптивные колонки</h2>
<p>Самая мощная возможность Grid для адаптивных макетов — автоматическое определение количества колонок в зависимости от ширины контейнера.</p>
<h3>auto-fill</h3>
<p>Создаёт столько колонок, сколько помещается, даже если некоторые пустые:</p>
<pre>grid-template-columns: repeat(auto-fill, 200px);</pre>
<h3>auto-fit</h3>
<p>То же самое, но растягивает имеющиеся элементы, чтобы заполнить пустые колонки:</p>
<pre>grid-template-columns: repeat(auto-fit, 200px);</pre>
<h3>С minmax — самая популярная техника</h3>
<pre>/* Карточки минимум 250px, но растут до 1fr */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));</pre>
<p>Это «магическая строка» — одна строка CSS создаёт адаптивную сетку без media queries!</p>`
    },
    `<h2>auto-fill: 150px</h2>
<div class="grid fill">
  <div class="c">1</div><div class="c">2</div>
  <div class="c">3</div>
</div>

<h2>auto-fit: 150px</h2>
<div class="grid fit">
  <div class="c">1</div><div class="c">2</div>
  <div class="c">3</div>
</div>

<h2>auto-fit + minmax(180px, 1fr) — АДАПТИВНО!</h2>
<div class="grid adaptive">
  <div class="card">🎧 Навушники<br><small>1 299 грн</small></div>
  <div class="card">⌨️ Клавіатура<br><small>2 150 грн</small></div>
  <div class="card">🖱️ Мишка<br><small>850 грн</small></div>
  <div class="card">💡 Лампа<br><small>460 грн</small></div>
  <div class="card">🖥️ Монітор<br><small>8 500 грн</small></div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 13px; color: #94a3b8; margin: 16px 0 8px; font-family: monospace; }

.grid { background: #1e293b; padding: 10px; border-radius: 10px; margin-bottom: 14px; gap: 8px; }
.c {
  background: #7c3aed; color: #fff;
  padding: 14px; border-radius: 6px; font-size: 18px; font-weight: bold; text-align: center;
}

.fill { display: grid; grid-template-columns: repeat(auto-fill, 150px); }
.fit  { display: grid; grid-template-columns: repeat(auto-fit,  150px); }

.adaptive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  background: transparent;
  padding: 0;
}
.card {
  background: #1e293b;
  border-radius: 12px;
  padding: 20px;
  font-size: 15px;
  text-align: center;
  color: #f8fafc;
}
.card small { color: #059669; font-size: 14px; font-weight: bold; display: block; margin-top: 8px; }`,
    [
      { level: 'easy',   uk: 'Зміни minmax(180px, 1fr) на minmax(250px, 1fr) і подивись, чи поміщаються всі 5 карток в рядок.',  ru: 'Измени minmax(180px, 1fr) на minmax(250px, 1fr) и посмотри, помещаются ли все 5 карточек в строку.' },
      { level: 'medium', uk: 'Додай 3 ще картки до .adaptive і переконайся, що сітка автоматично переносить їх.',                ru: 'Добавь ещё 3 карточки к .adaptive и убедись, что сетка автоматически переносит их.' },
      { level: 'hard',   uk: 'Порівняй .fill і .fit з 3 елементами: відкрий DevTools (F12), зменш ширину вікна і поспостерігай різницю між auto-fill і auto-fit.', ru: 'Сравни .fill и .fit с 3 элементами: открой DevTools (F12), уменьши ширину окна и понаблюдай разницу между auto-fill и auto-fit.' },
    ]
  );

  /* ─── 05-08 ─────────────────────────────────────────────── */
  patch('05-08',
    {
      uk: `<h2>minmax(): мінімальна та максимальна ширина</h2>
<p><code>minmax(min, max)</code> задає діапазон розміру клітинки: вона ніколи не буде меншою за min і більшою за max.</p>
<pre>grid-template-columns: minmax(100px, 300px) 1fr;
/* Перша колонка: мін 100px, макс 300px */
/* Друга колонка: займає весь простір, що залишився */

minmax(200px, 1fr)
/* мін 200px, але росте якщо місця більше */

minmax(auto, 400px)
/* мін = вміст, макс = 400px */</pre>
<h3>Комбінації</h3>
<pre>/* Класичний сайдбар: мін 160px, макс 260px */
grid-template-columns: minmax(160px, 260px) 1fr;

/* Адаптивна сітка */
repeat(auto-fit, minmax(220px, 1fr))</pre>
<h3>Чим відрізняється від fr</h3>
<ul>
  <li><code>1fr</code> — просто «одна частка», без обмежень.</li>
  <li><code>minmax(200px, 1fr)</code> — одна частка, але не менше 200px.</li>
</ul>`,
      ru: `<h2>minmax(): минимальная и максимальная ширина</h2>
<p><code>minmax(min, max)</code> задаёт диапазон размера ячейки: она никогда не будет меньше min и больше max.</p>
<pre>grid-template-columns: minmax(100px, 300px) 1fr;
/* Первая колонка: мин 100px, макс 300px */
/* Вторая колонка: занимает весь оставшийся простор */

minmax(200px, 1fr)
/* мин 200px, но растёт если места больше */

minmax(auto, 400px)
/* мин = содержимое, макс = 400px */</pre>
<h3>Комбинации</h3>
<pre>/* Классический сайдбар: мин 160px, макс 260px */
grid-template-columns: minmax(160px, 260px) 1fr;

/* Адаптивная сетка */
repeat(auto-fit, minmax(220px, 1fr))</pre>
<h3>Чем отличается от fr</h3>
<ul>
  <li><code>1fr</code> — просто «одна доля», без ограничений.</li>
  <li><code>minmax(200px, 1fr)</code> — одна доля, но не меньше 200px.</li>
</ul>`
    },
    `<h2>Без minmax: колонки можуть стиснутися до нуля</h2>
<div class="grid no-mm">
  <div class="c sidebar-c">Сайдбар (1fr)</div>
  <div class="c main-c">Основний контент (1fr)</div>
</div>

<h2>З minmax: сайдбар не менше 150px, не більше 280px</h2>
<div class="grid with-mm">
  <div class="c sidebar-c">Сайдбар minmax(150px, 280px)</div>
  <div class="c main-c">Основний контент (1fr)</div>
</div>

<h2>Адаптивна сітка: minmax(160px, 1fr)</h2>
<div class="grid adaptive-mm">
  <div class="item">🌐 HTML</div>
  <div class="item">🎨 CSS</div>
  <div class="item">⚡ JS</div>
  <div class="item">🐍 Python</div>
  <div class="item">⚛️ React</div>
  <div class="item">🔧 Git</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 13px; color: #94a3b8; margin: 16px 0 8px; font-family: monospace; }

.grid { margin-bottom: 14px; gap: 10px; }
.c { padding: 20px 16px; border-radius: 8px; font-size: 13px; }
.sidebar-c { background: #7c3aed; color: #fff; }
.main-c    { background: #1e293b; color: #94a3b8; }

.no-mm   { display: grid; grid-template-columns: 1fr 1fr; }
.with-mm { display: grid; grid-template-columns: minmax(150px, 280px) 1fr; }

.adaptive-mm {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}
.item {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 18px;
  text-align: center;
  font-size: 16px;
  color: #f8fafc;
}`,
    [
      { level: 'easy',   uk: 'Зміни .with-mm: збільш мінімум до 250px і максимум до 400px. Що змінилося?',                       ru: 'Измени .with-mm: увеличь минимум до 250px и максимум до 400px. Что изменилось?' },
      { level: 'medium', uk: 'Зміни .no-mm: перша колонка — minmax(200px, 1fr), друга — minmax(400px, 2fr). Яка ширина колонок?', ru: 'Измени .no-mm: первая колонка — minmax(200px, 1fr), вторая — minmax(400px, 2fr). Какова ширина колонок?' },
      { level: 'hard',   uk: 'Збільш мінімум .adaptive-mm до minmax(250px, 1fr) — скільки технологій вміщається в рядок тепер? Спробуй minmax(100px, 1fr).', ru: 'Увеличь минимум .adaptive-mm до minmax(250px, 1fr) — сколько технологий помещается в строку теперь? Попробуй minmax(100px, 1fr).' },
    ]
  );

  /* ─── 05-09 ─────────────────────────────────────────────── */
  patch('05-09',
    {
      uk: `<h2>Комбінування Grid і Flexbox</h2>
<p>Grid і Flexbox — не конкуренти, а доповнення одне одного. Правило просте:</p>
<ul>
  <li><strong>Grid</strong> — для загального макету сторінки (де розміщені блоки).</li>
  <li><strong>Flexbox</strong> — для вмісту всередині блоків (як елементи вирівнюються в компоненті).</li>
</ul>
<h3>Типова архітектура</h3>
<pre>/* Grid: загальна розмітка */
.page {
  display: grid;
  grid-template-areas: "header" "main" "footer";
}

/* Flexbox: шапка всередині */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid: сітка карток */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Flexbox: вміст картки */
.card {
  display: flex;
  flex-direction: column;
}
.card-btn { margin-top: auto; }</pre>`,
      ru: `<h2>Комбинирование Grid и Flexbox</h2>
<p>Grid и Flexbox — не конкуренты, а дополнение друг друга. Правило простое:</p>
<ul>
  <li><strong>Grid</strong> — для общего макета страницы (где размещены блоки).</li>
  <li><strong>Flexbox</strong> — для содержимого внутри блоков (как элементы выравниваются в компоненте).</li>
</ul>
<h3>Типичная архитектура</h3>
<pre>/* Grid: общая разметка */
.page {
  display: grid;
  grid-template-areas: "header" "main" "footer";
}

/* Flexbox: шапка внутри */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid: сетка карточек */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Flexbox: содержимое карточки */
.card {
  display: flex;
  flex-direction: column;
}
.card-btn { margin-top: auto; }</pre>`
    },
    `<div class="page">

  <!-- GRID зона: header. FLEX всередині -->
  <header class="header">
    <div class="logo">🌐 GridFlex</div>
    <nav class="nav">
      <a href="#">Курси</a>
      <a href="#">Проєкти</a>
      <a href="#">Спільнота</a>
    </nav>
    <button class="login">Увійти</button>
  </header>

  <!-- GRID зона: main. GRID для карток -->
  <main class="main">
    <h2>Наші курси</h2>
    <div class="cards">

      <div class="card">
        <div class="card-top">
          <span class="icon">🌐</span>
          <span class="badge">Популярний</span>
        </div>
        <h3>HTML та CSS</h3>
        <p>Основа будь-якого сайту. 40 уроків від нуля до верстки.</p>
        <div class="price">Безкоштовно</div>
        <button class="card-btn">Розпочати →</button>
      </div>

      <div class="card">
        <div class="card-top">
          <span class="icon">⚡</span>
          <span class="badge new">Новий</span>
        </div>
        <h3>JavaScript</h3>
        <p>Оживи свій сайт. Анімації, події, API та ігри за 60 уроків.</p>
        <div class="price">499 грн/міс</div>
        <button class="card-btn">Розпочати →</button>
      </div>

      <div class="card">
        <div class="card-top">
          <span class="icon">🐍</span>
          <span class="badge pro">Про</span>
        </div>
        <h3>Python + Flask</h3>
        <p>Бекенд, API, бази даних. Для тих, хто хоче будувати сервери.</p>
        <div class="price">799 грн/міс</div>
        <button class="card-btn">Розпочати →</button>
      </div>

    </div>
  </main>

  <!-- GRID зона: footer. FLEX всередині -->
  <footer class="footer">
    <span>© 2025 GridFlex Academy</span>
    <div class="footer-links">
      <a href="#">Умови</a>
      <a href="#">Приватність</a>
      <a href="#">Контакти</a>
    </div>
  </footer>

</div>`,
    `* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; background: #f1f5f9; color: #1e293b; }

/* ── GRID: загальний макет ── */
.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

/* ── FLEX: шапка ── */
.header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  background: #0f172a;
}
.logo  { font-size: 20px; font-weight: bold; color: #fff; }
.nav   { display: flex; gap: 24px; }
.nav a { color: #94a3b8; text-decoration: none; font-size: 14px; }
.nav a:hover { color: #fff; }
.login {
  background: #059669; color: #fff;
  border: none; padding: 8px 20px;
  border-radius: 8px; cursor: pointer; font-size: 14px;
}

/* ── MAIN + GRID: картки ── */
.main {
  grid-area: main;
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}
.main h2 { margin: 0 0 20px; font-size: 22px; color: #0f172a; }

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

/* ── FLEX: кожна картка ── */
.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 2px 12px rgba(0,0,0,.07);
  transition: transform .25s ease, box-shadow .25s ease;
}
.card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(0,0,0,.12); }

.card-top {
  display: flex;           /* flex: іконка + бейдж */
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.icon  { font-size: 32px; }
.badge { background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 20px; }
.badge.new { background: #dcfce7; color: #15803d; }
.badge.pro { background: #ede9fe; color: #5b21b6; }

.card h3 { margin: 0 0 8px; font-size: 17px; color: #0f172a; }
.card p  { font-size: 13px; color: #64748b; line-height: 1.5; margin: 0; flex: 1; }
.price   { font-size: 16px; font-weight: bold; color: #059669; margin: 12px 0 0; }
.card-btn {
  margin-top: 14px;        /* flex: кнопка внизу */
  background: #0f172a; color: #fff;
  border: none; padding: 10px;
  border-radius: 8px; cursor: pointer; font-size: 14px;
  transition: background .2s;
}
.card-btn:hover { background: #059669; }

/* ── FLEX: підвал ── */
.footer {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #0f172a;
  color: #64748b;
  font-size: 13px;
}
.footer-links { display: flex; gap: 20px; }
.footer-links a { color: #64748b; text-decoration: none; }
.footer-links a:hover { color: #fff; }`,
    [
      { level: 'easy',   uk: 'Додай четверту картку «React ⚛️» з власним описом і ціною.',                                       ru: 'Добавь четвёртую карточку «React ⚛️» с собственным описанием и ценой.' },
      { level: 'medium', uk: 'Зміни grid-template-columns .cards на repeat(auto-fit, minmax(300px, 1fr)) і подивись, скільки карток вміщається в рядок.', ru: 'Измени grid-template-columns .cards на repeat(auto-fit, minmax(300px, 1fr)) и посмотри, сколько карточек помещается в строку.' },
      { level: 'hard',   uk: 'Додай до шапки прапорці мов UA/RU у вигляді кнопок (flex-контейнер між nav і login). Стилізуй їх схоже на кнопки в app.js.', ru: 'Добавь в шапку флаги языков UA/RU в виде кнопок (flex-контейнер между nav и login). Стилизуй их похоже на кнопки в app.js.' },
    ]
  );

  /* ─── 05-10 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('05-10',
    {
      uk: `<h2>📸 Проект: Фотогалерея у CSS Grid</h2>
<p>Побудуй повноцінну галерею з нерівномірним розміщенням фото — як у Pinterest! Деякі фото займають більше клітинок по висоті або ширині.</p>
<h3>Що потрібно зробити</h3>
<ul>
  <li>Сітка 4 колонки через <code>repeat(4, 1fr)</code>.</li>
  <li>«Великі» фото займають <code>grid-column: span 2</code> і/або <code>grid-row: span 2</code>.</li>
  <li>Ефект hover: overlay з назвою фото (position: absolute, opacity: 0 → 1).</li>
  <li>Підпис під кожним фото з іменем категорії.</li>
  <li>gap між фото — 8–12px.</li>
</ul>
<h3>Використай picsum.photos</h3>
<pre>&lt;img src="https://picsum.photos/seed/nature1/400/300"&gt;
&lt;img src="https://picsum.photos/seed/city2/400/600"&gt;</pre>
<p>Змінюй «seed» щоб отримувати різні фото, та ширину/висоту для пропорцій.</p>`,
      ru: `<h2>📸 Проект: Фотогалерея в CSS Grid</h2>
<p>Построй полноценную галерею с неравномерным размещением фото — как в Pinterest! Некоторые фото занимают больше ячеек по высоте или ширине.</p>
<h3>Что нужно сделать</h3>
<ul>
  <li>Сетка 4 колонки через <code>repeat(4, 1fr)</code>.</li>
  <li>«Большие» фото занимают <code>grid-column: span 2</code> и/или <code>grid-row: span 2</code>.</li>
  <li>Эффект hover: overlay с названием фото (position: absolute, opacity: 0 → 1).</li>
  <li>Подпись под каждым фото с именем категории.</li>
  <li>gap между фото — 8–12px.</li>
</ul>
<h3>Используй picsum.photos</h3>
<pre>&lt;img src="https://picsum.photos/seed/nature1/400/300"&gt;
&lt;img src="https://picsum.photos/seed/city2/400/600"&gt;</pre>
<p>Меняй «seed» чтобы получать разные фото, и ширину/высоту для пропорций.</p>`
    },
    `<h1 class="gallery-title">🌍 Галерея природи</h1>

<div class="gallery">

  <!-- Велике фото: 2 колонки + 2 рядки -->
  <div class="photo big-square">
    <img src="https://picsum.photos/seed/forest1/600/600" alt="Ліс">
    <div class="overlay"><span>🌲 Ліс</span></div>
  </div>

  <!-- Широке фото: 2 колонки -->
  <div class="photo wide">
    <img src="https://picsum.photos/seed/ocean2/600/300" alt="Океан">
    <div class="overlay"><span>🌊 Океан</span></div>
  </div>

  <!-- Звичайне -->
  <div class="photo">
    <img src="https://picsum.photos/seed/mountain3/300/300" alt="Гори">
    <div class="overlay"><span>⛰️ Гори</span></div>
  </div>

  <!-- Звичайне -->
  <div class="photo">
    <img src="https://picsum.photos/seed/sunset4/300/300" alt="Захід сонця">
    <div class="overlay"><span>🌅 Захід</span></div>
  </div>

  <!-- Звичайне -->
  <div class="photo">
    <img src="https://picsum.photos/seed/flowers5/300/300" alt="Квіти">
    <div class="overlay"><span>🌸 Квіти</span></div>
  </div>

  <!-- Високе фото: 2 рядки -->
  <div class="photo tall">
    <img src="https://picsum.photos/seed/waterfall6/300/600" alt="Водоспад">
    <div class="overlay"><span>💧 Водоспад</span></div>
  </div>

  <!-- Звичайне -->
  <div class="photo">
    <img src="https://picsum.photos/seed/desert7/300/300" alt="Пустеля">
    <div class="overlay"><span>🏜️ Пустеля</span></div>
  </div>

  <!-- Широке -->
  <div class="photo wide">
    <img src="https://picsum.photos/seed/lake8/600/300" alt="Озеро">
    <div class="overlay"><span>🏞️ Озеро</span></div>
  </div>

  <!-- Звичайне -->
  <div class="photo">
    <img src="https://picsum.photos/seed/snow9/300/300" alt="Сніг">
    <div class="overlay"><span>❄️ Сніг</span></div>
  </div>

</div>`,
    `* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0f172a;
  padding: 24px;
}
.gallery-title {
  color: #f8fafc;
  text-align: center;
  margin: 0 0 24px;
  font-size: 24px;
}

/* ── CSS Grid Галерея ── */
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

/* ── Фото-блок ── */
.photo {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .4s ease;
}
.photo:hover img { transform: scale(1.06); }

/* ── Overlay з назвою ── */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,.55);
  display: flex;
  align-items: flex-end;
  padding: 14px;
  opacity: 0;
  transition: opacity .3s ease;
}
.photo:hover .overlay { opacity: 1; }
.overlay span {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  text-shadow: 0 1px 4px rgba(0,0,0,.8);
}

/* ── Спеціальні розміри ── */
.big-square { grid-column: span 2; grid-row: span 2; }
.wide       { grid-column: span 2; }
.tall       { grid-row: span 2; }`,
    [
      { level: 'easy',   uk: 'Поміняй seed у будь-якому URL picsum щоб отримати інше фото (наприклад forest1 → forest99).',       ru: 'Поменяй seed в любом URL picsum чтобы получить другое фото (например forest1 → forest99).' },
      { level: 'medium', uk: 'Зроби .overlay синьо-фіолетовим градієнтом замість чорного: background: linear-gradient(to top, rgba(99,102,241,.8), transparent).',  ru: 'Сделай .overlay сине-фиолетовым градиентом вместо чёрного: background: linear-gradient(to top, rgba(99,102,241,.8), transparent).' },
      { level: 'hard',   uk: 'Додай заголовок і фільтри-кнопки над галереєю: «Всі / Природа / Місто / Архітектура» — стилізуй їх через Flexbox (justify-content: center, gap).',  ru: 'Добавь заголовок и кнопки-фильтры над галереей: «Все / Природа / Город / Архитектура» — стилизуй их через Flexbox (justify-content: center, gap).' },
      { level: 'extra',  uk: 'Зроби сітку адаптивною: на мобільній ширині (max-width: 600px) — 2 колонки замість 4, а .big-square — span 2 (але не span 2 по рядках).', ru: 'Сделай сетку адаптивной: на мобильной ширине (max-width: 600px) — 2 колонки вместо 4, а .big-square — span 2 (но не span 2 по строкам).' },
    ]
  );

})();
