/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 4 — Flexbox · 8–11 Веб-Старт
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

  /* ─── 04-01 ─────────────────────────────────────────────── */
  patch('04-01',
    {
      uk: `<h2>display: flex — перший контейнер</h2>
<p>До Flexbox блоки стояли один під одним. Щоб розмістити їх в рядок, доводилося використовувати хаки. Flexbox вирішує цю проблему однією властивістю.</p>
<pre>/* Батьківський елемент стає flex-контейнером */
.container {
  display: flex;
}
/* Усі прямі нащадки — flex-елементи (items) */</pre>
<h3>Що відбувається після display: flex</h3>
<ul>
  <li>Дочірні елементи вишиковуються в <strong>рядок</strong> (за замовчуванням).</li>
  <li>Вони займають стільки місця, скільки потрібно їхньому вмісту.</li>
  <li>Вони однакової висоти (рівні до найвищого).</li>
</ul>
<h3>Дві ролі у Flexbox</h3>
<ul>
  <li><strong>Flex-контейнер</strong> — елемент, якому задано display: flex. Керує розташуванням дітей.</li>
  <li><strong>Flex-елемент (item)</strong> — прямий нащадок контейнера.</li>
</ul>`,
      ru: `<h2>display: flex — первый контейнер</h2>
<p>До Flexbox блоки стояли один под другим. Чтобы разместить их в строку, приходилось использовать хаки. Flexbox решает эту проблему одним свойством.</p>
<pre>/* Родительский элемент становится flex-контейнером */
.container {
  display: flex;
}
/* Все прямые потомки — flex-элементы (items) */</pre>
<h3>Что происходит после display: flex</h3>
<ul>
  <li>Дочерние элементы выстраиваются в <strong>строку</strong> (по умолчанию).</li>
  <li>Они занимают столько места, сколько нужно их содержимому.</li>
  <li>Они одинаковой высоты (равны самому высокому).</li>
</ul>
<h3>Две роли во Flexbox</h3>
<ul>
  <li><strong>Flex-контейнер</strong> — элемент, которому задано display: flex. Управляет расположением детей.</li>
  <li><strong>Flex-элемент (item)</strong> — прямой потомок контейнера.</li>
</ul>`
    },
    `<h2>Без flex (блоки один під одним)</h2>
<div class="no-flex">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>

<h2>З display: flex (в рядок!)</h2>
<div class="with-flex">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 24px; background: #f8fafc; }
h2 { font-size: 15px; color: #475569; margin: 20px 0 10px; }

.box {
  width: 70px; height: 70px;
  background: #3b82f6;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 4px;
}

/* Без flex — блоки йдуть вниз */
.no-flex { background: #fee2e2; padding: 10px; border-radius: 8px; margin-bottom: 4px; }

/* З flex — блоки в рядок */
.with-flex {
  display: flex;
  background: #dcfce7;
  padding: 10px;
  border-radius: 8px;
}`,
    [
      { level: 'easy',   uk: 'Прибери display: flex з .with-flex і подивись — блоки знову стануть вертикальними.',              ru: 'Убери display: flex из .with-flex и посмотри — блоки снова станут вертикальными.' },
      { level: 'medium', uk: 'Додай четвертий блок &lt;div class="box"&gt;4&lt;/div&gt; у .with-flex і переконайся, що він автоматично встав у рядок.', ru: 'Добавь четвёртый блок &lt;div class="box"&gt;4&lt;/div&gt; в .with-flex и убедись, что он автоматически встал в строку.' },
      { level: 'hard',   uk: 'Додай display: flex до .no-flex і зверни увагу: тепер обидві секції однакові. Яка різниця між ними зникла?', ru: 'Добавь display: flex к .no-flex и обрати внимание: теперь обе секции одинаковые. Какая разница между ними исчезла?' },
    ]
  );

  /* ─── 04-02 ─────────────────────────────────────────────── */
  patch('04-02',
    {
      uk: `<h2>flex-direction: рядок чи колонка</h2>
<p><code>flex-direction</code> визначає <strong>головну вісь</strong> — напрямок, вздовж якого розміщуються flex-елементи.</p>
<pre>flex-direction: row;            /* → рядок (за замовчуванням) */
flex-direction: row-reverse;    /* ← рядок навпаки */
flex-direction: column;         /* ↓ колонка */
flex-direction: column-reverse; /* ↑ колонка навпаки */</pre>
<h3>Головна і поперечна вісь</h3>
<p>Це дуже важлива концепція Flexbox:</p>
<ul>
  <li>При <code>row</code> — головна вісь горизонтальна (→), поперечна — вертикальна (↓).</li>
  <li>При <code>column</code> — головна вісь вертикальна (↓), поперечна — горизонтальна (→).</li>
</ul>
<p>Властивості <code>justify-content</code> і <code>align-items</code> завжди прив'язані до головної і поперечної осей відповідно — тому їхня поведінка змінюється разом із flex-direction!</p>`,
      ru: `<h2>flex-direction: строка или колонка</h2>
<p><code>flex-direction</code> определяет <strong>главную ось</strong> — направление, вдоль которого размещаются flex-элементы.</p>
<pre>flex-direction: row;            /* → строка (по умолчанию) */
flex-direction: row-reverse;    /* ← строка наоборот */
flex-direction: column;         /* ↓ колонка */
flex-direction: column-reverse; /* ↑ колонка наоборот */</pre>
<h3>Главная и поперечная ось</h3>
<p>Это очень важная концепция Flexbox:</p>
<ul>
  <li>При <code>row</code> — главная ось горизонтальная (→), поперечная — вертикальная (↓).</li>
  <li>При <code>column</code> — главная ось вертикальная (↓), поперечная — горизонтальная (→).</li>
</ul>
<p>Свойства <code>justify-content</code> и <code>align-items</code> всегда привязаны к главной и поперечной осям — поэтому их поведение меняется вместе с flex-direction!</p>`
    },
    `<div class="demo">
  <h3>row (за замовчуванням)</h3>
  <div class="flex-row">
    <div class="box a">A</div>
    <div class="box b">B</div>
    <div class="box c">C</div>
  </div>
</div>

<div class="demo">
  <h3>row-reverse</h3>
  <div class="flex-row-rev">
    <div class="box a">A</div>
    <div class="box b">B</div>
    <div class="box c">C</div>
  </div>
</div>

<div class="demo">
  <h3>column</h3>
  <div class="flex-col">
    <div class="box a">A</div>
    <div class="box b">B</div>
    <div class="box c">C</div>
  </div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #f1f5f9; }
.demo { background: #fff; border-radius: 10px; padding: 14px; margin-bottom: 14px; }
h3 { font-size: 13px; color: #64748b; margin: 0 0 10px; font-family: monospace; }

.box {
  width: 52px; height: 52px;
  color: #fff; font-size: 18px; font-weight: bold;
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px;
}
.a { background: #3b82f6; }
.b { background: #8b5cf6; }
.c { background: #ec4899; }

.flex-row     { display: flex; flex-direction: row;            gap: 8px; }
.flex-row-rev { display: flex; flex-direction: row-reverse;    gap: 8px; }
.flex-col     { display: flex; flex-direction: column;         gap: 8px; width: fit-content; }`,
    [
      { level: 'easy',   uk: 'Зміни .flex-col на flex-direction: column-reverse і подивись, як блоки перевернуться.',           ru: 'Измени .flex-col на flex-direction: column-reverse и посмотри, как блоки перевернутся.' },
      { level: 'medium', uk: 'Зміни .flex-row на column і переконайся, що тепер блоки йдуть вниз.',                             ru: 'Измени .flex-row на column и убедись, что теперь блоки идут вниз.' },
      { level: 'hard',   uk: 'Додай четвертий блок D у всі три контейнери і подивись, як він поводиться в кожному напрямку.', ru: 'Добавь четвёртый блок D во все три контейнера и посмотри, как он ведёт себя в каждом направлении.' },
    ]
  );

  /* ─── 04-03 ─────────────────────────────────────────────── */
  patch('04-03',
    {
      uk: `<h2>justify-content: вирівнювання по головній осі</h2>
<p><code>justify-content</code> розподіляє flex-елементи вздовж <strong>головної осі</strong> (горизонталь при row, вертикаль при column).</p>
<pre>justify-content: flex-start;    /* притиснути на початок */
justify-content: flex-end;      /* притиснути в кінець */
justify-content: center;        /* по центру */
justify-content: space-between; /* перший і останній по краях, простір між */
justify-content: space-around;  /* рівний простір навколо кожного */
justify-content: space-evenly;  /* абсолютно рівний простір між усіма */</pre>
<h3>Найчастіше використовується</h3>
<ul>
  <li><code>space-between</code> — для навігаційних панелей (логотип ліворуч, меню праворуч).</li>
  <li><code>center</code> — для hero-секцій і центральних блоків.</li>
  <li><code>space-evenly</code> — для карток однакової ширини з рівними відступами.</li>
</ul>`,
      ru: `<h2>justify-content: выравнивание по главной оси</h2>
<p><code>justify-content</code> распределяет flex-элементы вдоль <strong>главной оси</strong> (горизонталь при row, вертикаль при column).</p>
<pre>justify-content: flex-start;    /* прижать к началу */
justify-content: flex-end;      /* прижать к концу */
justify-content: center;        /* по центру */
justify-content: space-between; /* первый и последний по краям, пространство между */
justify-content: space-around;  /* равное пространство вокруг каждого */
justify-content: space-evenly;  /* абсолютно равное пространство между всеми */</pre>
<h3>Чаще всего используется</h3>
<ul>
  <li><code>space-between</code> — для навигационных панелей (логотип слева, меню справа).</li>
  <li><code>center</code> — для hero-секций и центральных блоков.</li>
  <li><code>space-evenly</code> — для карточек одинаковой ширины с равными отступами.</li>
</ul>`
    },
    `<div class="demo">
  <span class="label">flex-start</span>
  <div class="flex jc-start"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>
</div>
<div class="demo">
  <span class="label">center</span>
  <div class="flex jc-center"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>
</div>
<div class="demo">
  <span class="label">flex-end</span>
  <div class="flex jc-end"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>
</div>
<div class="demo">
  <span class="label">space-between</span>
  <div class="flex jc-between"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>
</div>
<div class="demo">
  <span class="label">space-evenly</span>
  <div class="flex jc-evenly"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 16px; background: #0f172a; }
.demo { background: #1e293b; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
.label { font-size: 11px; font-family: monospace; color: #94a3b8; display: block; margin-bottom: 8px; }

.flex { display: flex; background: #0f172a; border-radius: 6px; padding: 6px; }
.b {
  width: 44px; height: 44px; border-radius: 6px;
  background: #3b82f6; color: #fff;
  font-size: 16px; font-weight: bold;
  display: flex; align-items: center; justify-content: center;
}

.jc-start   { justify-content: flex-start; }
.jc-center  { justify-content: center; }
.jc-end     { justify-content: flex-end; }
.jc-between { justify-content: space-between; }
.jc-evenly  { justify-content: space-evenly; }`,
    [
      { level: 'easy',   uk: 'Зміни .jc-start на justify-content: space-around і подивись, як з\'явиться простір навколо блоків.',   ru: 'Измени .jc-start на justify-content: space-around и посмотри, как появится пространство вокруг блоков.' },
      { level: 'medium', uk: 'Додай четвертий .b до рядка jc-between. Що змінилося у розподілі простору?',                           ru: 'Добавь четвёртый .b в строку jc-between. Что изменилось в распределении пространства?' },
      { level: 'hard',   uk: 'Зроби просту навігацію: &lt;nav class="nav"&gt;&lt;span&gt;Логотип&lt;/span&gt;&lt;div&gt;...посилання...&lt;/div&gt;&lt;/nav&gt; з justify-content: space-between.', ru: 'Сделай простую навигацию: &lt;nav class="nav"&gt;&lt;span&gt;Логотип&lt;/span&gt;&lt;div&gt;...ссылки...&lt;/div&gt;&lt;/nav&gt; с justify-content: space-between.' },
    ]
  );

  /* ─── 04-04 ─────────────────────────────────────────────── */
  patch('04-04',
    {
      uk: `<h2>align-items: вирівнювання по поперечній осі</h2>
<p><code>align-items</code> керує вирівнюванням вздовж <strong>поперечної осі</strong> (вертикаль при row, горизонталь при column).</p>
<pre>align-items: stretch;     /* розтягнути до висоти контейнера (за замовч.) */
align-items: flex-start;  /* по верхньому краю */
align-items: flex-end;    /* по нижньому краю */
align-items: center;      /* по центру висоти */
align-items: baseline;    /* по базовій лінії тексту */</pre>
<h3>Найкорисніший трюк: вертикальне центрування</h3>
<p>Роками в CSS не було простого способу відцентрувати блок по вертикалі. Flexbox вирішив це двома рядками:</p>
<pre>.container {
  display: flex;
  align-items: center;      /* по вертикалі */
  justify-content: center;  /* по горизонталі */
  height: 300px;
}</pre>`,
      ru: `<h2>align-items: выравнивание по поперечной оси</h2>
<p><code>align-items</code> управляет выравниванием вдоль <strong>поперечной оси</strong> (вертикаль при row, горизонталь при column).</p>
<pre>align-items: stretch;     /* растянуть до высоты контейнера (по умолч.) */
align-items: flex-start;  /* по верхнему краю */
align-items: flex-end;    /* по нижнему краю */
align-items: center;      /* по центру высоты */
align-items: baseline;    /* по базовой линии текста */</pre>
<h3>Самый полезный трюк: вертикальное центрирование</h3>
<p>Годами в CSS не было простого способа отцентрировать блок по вертикали. Flexbox решил это двумя строками:</p>
<pre>.container {
  display: flex;
  align-items: center;      /* по вертикали */
  justify-content: center;  /* по горизонтали */
  height: 300px;
}</pre>`
    },
    `<div class="demo">
  <span class="label">stretch (за замовч.)</span>
  <div class="flex ai-stretch">
    <div class="b short">Маленький</div>
    <div class="b tall">Великий блок з довшим текстом</div>
    <div class="b short">Маленький</div>
  </div>
</div>
<div class="demo">
  <span class="label">flex-start</span>
  <div class="flex ai-start">
    <div class="b short">1</div><div class="b tall">2</div><div class="b short">3</div>
  </div>
</div>
<div class="demo">
  <span class="label">center</span>
  <div class="flex ai-center">
    <div class="b short">1</div><div class="b tall">2</div><div class="b short">3</div>
  </div>
</div>
<div class="demo">
  <span class="label">flex-end</span>
  <div class="flex ai-end">
    <div class="b short">1</div><div class="b tall">2</div><div class="b short">3</div>
  </div>
</div>

<div class="centered-demo">
  🎯 Я в центрі по обох осях!
</div>`,
    `body { font-family: Arial, sans-serif; padding: 16px; background: #0f172a; }
.demo { background: #1e293b; border-radius: 10px; padding: 10px 14px; margin-bottom: 10px; }
.label { font-size: 11px; font-family: monospace; color: #94a3b8; display: block; margin-bottom: 8px; }

.flex { display: flex; gap: 8px; background: #0f172a; padding: 6px; border-radius: 6px; min-height: 80px; }
.b {
  background: #7c3aed; color: #fff; font-size: 13px; border-radius: 6px;
  padding: 8px 12px; display: flex; align-items: center; justify-content: center; text-align: center;
}
.short { }
.tall  { padding: 20px 12px; }

.ai-stretch { align-items: stretch; }
.ai-start   { align-items: flex-start; }
.ai-center  { align-items: center; }
.ai-end     { align-items: flex-end; }

.centered-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background: linear-gradient(135deg, #059669, #3b82f6);
  border-radius: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}`,
    [
      { level: 'easy',   uk: 'Зміни .ai-center на align-items: baseline і подивись, як блоки вирівнюються по тексту.',           ru: 'Измени .ai-center на align-items: baseline и посмотри, как блоки выравниваются по тексту.' },
      { level: 'medium', uk: 'Зміни висоту .centered-demo з 100px на 200px — блок залишиться по центру?',                        ru: 'Измени высоту .centered-demo со 100px на 200px — блок останется по центру?' },
      { level: 'hard',   uk: 'Зроби «картку профілю»: flex-контейнер з align-items:center, ліворуч — коло-аватар, праворуч — ім\'я і посада.', ru: 'Сделай «карточку профиля»: flex-контейнер с align-items:center, слева — круг-аватар, справа — имя и должность.' },
    ]
  );

  /* ─── 04-05 ─────────────────────────────────────────────── */
  patch('04-05',
    {
      uk: `<h2>gap: відстань між flex-елементами</h2>
<p><code>gap</code> задає проміжки між flex-елементами. Це набагато зручніше, ніж додавати margin до кожного елемента вручну.</p>
<pre>.container {
  display: flex;
  gap: 16px;           /* однаковий проміжок між усіма */
}

gap: 16px 24px;        /* рядковий gap | стовпчиковий gap */
row-gap: 12px;         /* лише між рядками */
column-gap: 24px;      /* лише між стовпцями */</pre>
<h3>Переваги gap перед margin</h3>
<ul>
  <li>Не додає зайвий відступ до першого і останнього елементів.</li>
  <li>Легко змінювати — одна властивість замість кількох.</li>
  <li>Працює і у Flexbox, і у Grid.</li>
</ul>`,
      ru: `<h2>gap: расстояние между flex-элементами</h2>
<p><code>gap</code> задаёт промежутки между flex-элементами. Это намного удобнее, чем добавлять margin к каждому элементу вручную.</p>
<pre>.container {
  display: flex;
  gap: 16px;           /* одинаковый промежуток между всеми */
}

gap: 16px 24px;        /* строковый gap | столбцовый gap */
row-gap: 12px;         /* только между строками */
column-gap: 24px;      /* только между столбцами */</pre>
<h3>Преимущества gap перед margin</h3>
<ul>
  <li>Не добавляет лишний отступ к первому и последнему элементам.</li>
  <li>Легко менять — одно свойство вместо нескольких.</li>
  <li>Работает и во Flexbox, и в Grid.</li>
</ul>`
    },
    `<h2>gap: 0 — без проміжків</h2>
<div class="flex g0">
  <div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div>
</div>

<h2>gap: 8px</h2>
<div class="flex g8">
  <div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div>
</div>

<h2>gap: 24px</h2>
<div class="flex g24">
  <div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div>
</div>

<h2>Картки з gap</h2>
<div class="card-row">
  <div class="card">🍕 Піца</div>
  <div class="card">🍔 Бургер</div>
  <div class="card">🍜 Рамен</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
h2 { font-size: 14px; color: #64748b; margin: 16px 0 8px; font-family: monospace; }

.flex { display: flex; background: #e2e8f0; padding: 8px; border-radius: 8px; margin-bottom: 4px; }
.b {
  width: 56px; height: 56px; background: #3b82f6; color: #fff;
  font-size: 18px; font-weight: bold; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}

.g0  { gap: 0; }
.g8  { gap: 8px; }
.g24 { gap: 24px; }

.card-row {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}
.card {
  flex: 1;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #374151;
}`,
    [
      { level: 'easy',   uk: 'Зміни gap у .card-row з 16px на 32px і потім на 4px — порівняй.',                                  ru: 'Измени gap у .card-row с 16px на 32px и потом на 4px — сравни.' },
      { level: 'medium', uk: 'Додай четверту картку .card і переконайся, що gap автоматично застосовується до неї.',              ru: 'Добавь четвёртую карточку .card и убедись, что gap автоматически применяется к ней.' },
      { level: 'hard',   uk: 'Зміни gap у .g8 на gap: 8px 32px (різні вертикальний і горизонтальний) і додай flex-wrap: wrap, щоб побачити різницю між row-gap і column-gap.', ru: 'Измени gap у .g8 на gap: 8px 32px (разные вертикальный и горизонтальный) и добавь flex-wrap: wrap, чтобы увидеть разницу между row-gap и column-gap.' },
    ]
  );

  /* ─── 04-06 ─────────────────────────────────────────────── */
  patch('04-06',
    {
      uk: `<h2>flex-wrap: перенос на новий рядок</h2>
<p>За замовчуванням усі flex-елементи намагаються вміститися в один рядок і можуть зменшуватися. <code>flex-wrap: wrap</code> дозволяє переносити елементи на новий рядок, коли їм не вистачає місця.</p>
<pre>flex-wrap: nowrap;        /* не переносити (за замовч.) */
flex-wrap: wrap;          /* переносити вниз */
flex-wrap: wrap-reverse;  /* переносити вгору */</pre>
<h3>Типове використання</h3>
<p>Сітка карток без Grid: задай кожній картці фіксовану ширину і дозволь переносити — браузер сам розкладе їх по рядках:</p>
<pre>.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  width: 200px; /* картка займає 200px, решта переноситься */
}</pre>`,
      ru: `<h2>flex-wrap: перенос на новую строку</h2>
<p>По умолчанию все flex-элементы стараются уместиться в одну строку и могут уменьшаться. <code>flex-wrap: wrap</code> позволяет переносить элементы на новую строку, когда им не хватает места.</p>
<pre>flex-wrap: nowrap;        /* не переносить (по умолч.) */
flex-wrap: wrap;          /* переносить вниз */
flex-wrap: wrap-reverse;  /* переносить вверх */</pre>
<h3>Типичное использование</h3>
<p>Сетка карточек без Grid: задай каждой карточке фиксированную ширину и разреши переносить — браузер сам разложит их по строкам:</p>
<pre>.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  width: 200px;
}</pre>`
    },
    `<h2>nowrap — стискаються, не переносяться</h2>
<div class="flex nowrap">
  <div class="b">Елемент 1</div><div class="b">Елемент 2</div>
  <div class="b">Елемент 3</div><div class="b">Елемент 4</div>
  <div class="b">Елемент 5</div>
</div>

<h2>wrap — переносяться на новий рядок</h2>
<div class="flex wrap">
  <div class="b">Елемент 1</div><div class="b">Елемент 2</div>
  <div class="b">Елемент 3</div><div class="b">Елемент 4</div>
  <div class="b">Елемент 5</div>
</div>

<h2>Галерея тегів (wrap)</h2>
<div class="tags">
  <span class="tag">HTML</span><span class="tag">CSS</span>
  <span class="tag">JavaScript</span><span class="tag">React</span>
  <span class="tag">Python</span><span class="tag">Git</span>
  <span class="tag">Flexbox</span><span class="tag">Grid</span>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #f1f5f9; }
h2 { font-size: 14px; color: #64748b; margin: 16px 0 8px; font-family: monospace; }

.flex { display: flex; gap: 8px; background: #e2e8f0; padding: 10px; border-radius: 8px; margin-bottom: 10px; }
.b {
  background: #6d28d9; color: #fff; padding: 10px 14px;
  border-radius: 6px; font-size: 13px; white-space: nowrap;
}

.nowrap { flex-wrap: nowrap; }
.wrap   { flex-wrap: wrap; }

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.tag {
  background: #ede9fe; color: #5b21b6;
  padding: 6px 14px; border-radius: 20px;
  font-size: 13px; font-weight: 600;
  border: 1px solid #c4b5fd;
}`,
    [
      { level: 'easy',   uk: 'Зміни .nowrap на flex-wrap: wrap і подивись, як блоки перестануть стискатися.',                    ru: 'Измени .nowrap на flex-wrap: wrap и посмотри, как блоки перестанут сжиматься.' },
      { level: 'medium', uk: 'Додай ще 4 теги до .tags і переконайся, що вони автоматично переносяться на новий рядок.',         ru: 'Добавь ещё 4 тега к .tags и убедись, что они автоматически переносятся на новую строку.' },
      { level: 'hard',   uk: 'Зміни .wrap на flex-wrap: wrap-reverse і порівняй — нові рядки тепер з\'являються зверху, а не знизу.', ru: 'Измени .wrap на flex-wrap: wrap-reverse и сравни — новые строки теперь появляются сверху, а не снизу.' },
    ]
  );

  /* ─── 04-07 ─────────────────────────────────────────────── */
  patch('04-07',
    {
      uk: `<h2>flex-grow: розтягування елемента</h2>
<p><code>flex-grow</code> задається на <strong>flex-елементі</strong> (не контейнері) і визначає, яку частку вільного простору він займе.</p>
<pre>/* За замовчуванням flex-grow: 0 — не розтягуватись */

.item { flex-grow: 1; } /* займає всі вільні місце */

/* Якщо два елементи мають flex-grow: 1 і flex-grow: 2 —
   другий отримає вдвічі більше вільного простору */</pre>
<h3>Типові використання</h3>
<ul>
  <li>Поле вводу в рядку пошуку займає весь простір між іконкою і кнопкою: <code>flex-grow: 1</code>.</li>
  <li>Основний контент займає весь простір між сайдбарами.</li>
  <li>Одна картка «ширша» за інші.</li>
</ul>`,
      ru: `<h2>flex-grow: растягивание элемента</h2>
<p><code>flex-grow</code> задаётся на <strong>flex-элементе</strong> (не контейнере) и определяет, какую долю свободного пространства он займёт.</p>
<pre>/* По умолчанию flex-grow: 0 — не растягиваться */

.item { flex-grow: 1; } /* занимает всё свободное место */

/* Если два элемента имеют flex-grow: 1 и flex-grow: 2 —
   второй получит вдвое больше свободного пространства */</pre>
<h3>Типичные использования</h3>
<ul>
  <li>Поле ввода в строке поиска занимает всё пространство между иконкой и кнопкой: <code>flex-grow: 1</code>.</li>
  <li>Основной контент занимает всё пространство между сайдбарами.</li>
  <li>Одна карточка «шире» других.</li>
</ul>`
    },
    `<h2>Рядок пошуку</h2>
<div class="search-bar">
  <span class="icon">🔍</span>
  <input type="text" placeholder="Пошук...">
  <button>Знайти</button>
</div>

<h2>Колонки з різним flex-grow</h2>
<div class="columns">
  <div class="col sidebar">Сайдбар (grow: 0)</div>
  <div class="col main">Основний контент (grow: 1)</div>
  <div class="col sidebar">Сайдбар (grow: 0)</div>
</div>

<h2>Три картки: 1 : 2 : 1</h2>
<div class="cards">
  <div class="card g1">grow: 1</div>
  <div class="card g2">grow: 2 (удвічі ширша)</div>
  <div class="card g1">grow: 1</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
h2 { font-size: 14px; color: #64748b; margin: 16px 0 8px; }

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 4px;
}
.icon { font-size: 18px; flex-shrink: 0; }
.search-bar input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: #374151;
}
.search-bar button {
  background: #3b82f6; color: #fff;
  border: none; padding: 7px 16px;
  border-radius: 7px; cursor: pointer; font-size: 14px;
  flex-shrink: 0;
}

.columns {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.col { padding: 16px 12px; border-radius: 8px; font-size: 13px; text-align: center; }
.sidebar { background: #e0f2fe; color: #0369a1; flex-grow: 0; width: 100px; }
.main    { background: #dcfce7; color: #166534; flex-grow: 1; }

.cards { display: flex; gap: 10px; }
.card  { padding: 16px 10px; border-radius: 8px; text-align: center; font-size: 13px; color: #fff; }
.g1 { flex-grow: 1; background: #6d28d9; }
.g2 { flex-grow: 2; background: #059669; }`,
    [
      { level: 'easy',   uk: 'Зміни flex-grow у .main з 1 на 3 і подивись, як основний контент стане ширшим.',                   ru: 'Измени flex-grow у .main с 1 на 3 и посмотри, как основной контент станет шире.' },
      { level: 'medium', uk: 'Зміни flex-grow у .g2 з 2 на 4 — вона стане вчетверо ширшою за .g1.',                             ru: 'Измени flex-grow у .g2 с 2 на 4 — она станет вчетверо шире .g1.' },
      { level: 'hard',   uk: 'Задай flex-grow: 1 усім трьом .card. Що станеться? Чому всі вони стали однакової ширини?',        ru: 'Задай flex-grow: 1 всем трём .card. Что произойдёт? Почему все они стали одинаковой ширины?' },
    ]
  );

  /* ─── 04-08 ─────────────────────────────────────────────── */
  patch('04-08',
    {
      uk: `<h2>flex-shrink та flex-basis</h2>
<p>Разом з flex-grow ці дві властивості утворюють «трійку» Flexbox. Їх часто об'єднують у скорочений запис <code>flex</code>.</p>
<h3>flex-basis — початкова ширина</h3>
<p>Задає <strong>базовий розмір</strong> елемента до розподілу вільного простору. Це як width, але для flex-елементів:</p>
<pre>flex-basis: 200px; /* починає з 200px, потім grow/shrink */
flex-basis: auto;  /* розмір за вмістом (за замовч.) */
flex-basis: 0;     /* нульова база — весь розмір від flex-grow */</pre>
<h3>flex-shrink — стискання</h3>
<p>Коли елементів забагато для контейнера, flex-shrink визначає, наскільки елемент може стиснутися:</p>
<pre>flex-shrink: 1;  /* може стискатися (за замовч.) */
flex-shrink: 0;  /* не стискається ніколи */</pre>
<h3>Скорочення flex</h3>
<pre>flex: grow shrink basis;
flex: 1 1 200px;   /* росте, стискається, база 200px */
flex: 1;           /* = flex: 1 1 0 — рівний розподіл */
flex: none;        /* = flex: 0 0 auto — не росте, не стискається */</pre>`,
      ru: `<h2>flex-shrink и flex-basis</h2>
<p>Вместе с flex-grow эти два свойства образуют «тройку» Flexbox. Их часто объединяют в сокращённую запись <code>flex</code>.</p>
<h3>flex-basis — начальная ширина</h3>
<p>Задаёт <strong>базовый размер</strong> элемента до распределения свободного пространства. Это как width, но для flex-элементов:</p>
<pre>flex-basis: 200px; /* начинает с 200px, потом grow/shrink */
flex-basis: auto;  /* размер по содержимому (по умолч.) */
flex-basis: 0;     /* нулевая база — весь размер от flex-grow */</pre>
<h3>flex-shrink — сжатие</h3>
<p>Когда элементов слишком много для контейнера, flex-shrink определяет, насколько элемент может сжаться:</p>
<pre>flex-shrink: 1;  /* может сжиматься (по умолч.) */
flex-shrink: 0;  /* не сжимается никогда */</pre>
<h3>Сокращение flex</h3>
<pre>flex: grow shrink basis;
flex: 1 1 200px;   /* растёт, сжимается, база 200px */
flex: 1;           /* = flex: 1 1 0 — равный раздел */
flex: none;        /* = flex: 0 0 auto — не растёт, не сжимается */</pre>`
    },
    `<h2>flex-basis: різна початкова ширина</h2>
<div class="row">
  <div class="b basis-100">basis: 100px</div>
  <div class="b basis-200">basis: 200px</div>
  <div class="b basis-150">basis: 150px</div>
</div>

<h2>flex: 1 — рівний розподіл</h2>
<div class="row">
  <div class="b eq">flex: 1</div>
  <div class="b eq">flex: 1</div>
  <div class="b eq">flex: 1</div>
</div>

<h2>flex-shrink: 0 — не стискається</h2>
<div class="row narrow">
  <div class="b shrink-yes">shrink: 1 (стискається)</div>
  <div class="b shrink-no">shrink: 0 (ні!)</div>
  <div class="b shrink-yes">shrink: 1 (стискається)</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
h2 { font-size: 14px; color: #64748b; margin: 16px 0 8px; }

.row {
  display: flex;
  gap: 8px;
  background: #e2e8f0;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
}
.narrow { width: 320px; }

.b {
  background: #3b82f6; color: #fff; padding: 14px 10px;
  border-radius: 6px; font-size: 12px; text-align: center;
}

.basis-100 { flex-basis: 100px; background: #6d28d9; }
.basis-200 { flex-basis: 200px; background: #059669; }
.basis-150 { flex-basis: 150px; background: #dc2626; }

.eq { flex: 1; background: #0369a1; }

.shrink-yes { flex-shrink: 1; background: #059669; flex-basis: 160px; }
.shrink-no  { flex-shrink: 0; background: #dc2626; flex-basis: 120px; }`,
    [
      { level: 'easy',   uk: 'Зміни flex-basis у .basis-100 на 250px і подивись, як перший блок стане найширшим.',               ru: 'Измени flex-basis у .basis-100 на 250px и посмотри, как первый блок станет самым широким.' },
      { level: 'medium', uk: 'Зміни .shrink-no на flex-shrink: 1 — всі блоки тепер стискаються однаково.',                       ru: 'Измени .shrink-no на flex-shrink: 1 — все блоки теперь сжимаются одинаково.' },
      { level: 'hard',   uk: 'Заміни всі три властивості .shrink-yes на скорочення flex: 1 1 160px і перевір, що поведінка не змінилася.', ru: 'Замени все три свойства .shrink-yes на сокращение flex: 1 1 160px и проверь, что поведение не изменилось.' },
    ]
  );

  /* ─── 04-09 ─────────────────────────────────────────────── */
  patch('04-09',
    {
      uk: `<h2>order: зміна порядку без HTML</h2>
<p>Властивість <code>order</code> задається на flex-елементі і дозволяє змінювати порядок відображення, <strong>не змінюючи HTML-структуру</strong>.</p>
<pre>/* За замовч. — усі мають order: 0 */
.item-1 { order: 2; }  /* відображатиметься третім */
.item-2 { order: 1; }  /* відображатиметься другим */
.item-3 { order: 0; }  /* відображатиметься першим */</pre>
<p>Менше значення order → раніше відображається. При однаковому order — за HTML-порядком.</p>
<h3>Коли це корисно</h3>
<ul>
  <li>На мобільних пристроях потрібно показати важливий блок першим, хоча у HTML він стоїть після.</li>
  <li>Зміна візуального порядку навігаційних пунктів без правки шаблону.</li>
</ul>
<p>⚠️ <strong>Обережно:</strong> order змінює лише <em>візуальний</em> порядок. Для скрін-рідерів і Tab-навігації порядок залишається HTML-шним.</p>`,
      ru: `<h2>order: изменение порядка без HTML</h2>
<p>Свойство <code>order</code> задаётся на flex-элементе и позволяет менять порядок отображения, <strong>не меняя HTML-структуру</strong>.</p>
<pre>/* По умолч. — все имеют order: 0 */
.item-1 { order: 2; }  /* отобразится третьим */
.item-2 { order: 1; }  /* отобразится вторым */
.item-3 { order: 0; }  /* отобразится первым */</pre>
<p>Меньшее значение order → раньше отображается. При одинаковом order — по HTML-порядку.</p>
<h3>Когда это полезно</h3>
<ul>
  <li>На мобильных устройствах нужно показать важный блок первым, хотя в HTML он стоит после.</li>
  <li>Изменение визуального порядка навигационных пунктов без правки шаблона.</li>
</ul>
<p>⚠️ <strong>Осторожно:</strong> order меняет только <em>визуальный</em> порядок. Для скрин-ридеров и Tab-навигации порядок остаётся HTML-шным.</p>`
    },
    `<h2>HTML-порядок: 1 → 2 → 3 → 4 → 5</h2>
<div class="row">
  <div class="b o-default" data-html="1">HTML: 1</div>
  <div class="b o-default" data-html="2">HTML: 2</div>
  <div class="b o-default" data-html="3">HTML: 3</div>
  <div class="b o-default" data-html="4">HTML: 4</div>
  <div class="b o-default" data-html="5">HTML: 5</div>
</div>

<h2>Те саме, але order змінено</h2>
<div class="row">
  <div class="b ord-1">HTML: 1 / order: 3</div>
  <div class="b ord-2">HTML: 2 / order: 1</div>
  <div class="b ord-3">HTML: 3 / order: 5</div>
  <div class="b ord-4">HTML: 4 / order: 2</div>
  <div class="b ord-5">HTML: 5 / order: 4</div>
</div>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; }
h2 { font-size: 14px; color: #64748b; margin: 16px 0 8px; }

.row {
  display: flex;
  gap: 8px;
  background: #e2e8f0;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
}
.b {
  flex: 1;
  padding: 12px 6px;
  border-radius: 6px;
  color: #fff;
  font-size: 11px;
  text-align: center;
  font-weight: bold;
}
.o-default { background: #6d28d9; }

.ord-1 { order: 3; background: #dc2626; }
.ord-2 { order: 1; background: #059669; }
.ord-3 { order: 5; background: #d97706; }
.ord-4 { order: 2; background: #0369a1; }
.ord-5 { order: 4; background: #7c3aed; }`,
    [
      { level: 'easy',   uk: 'Зміни order у .ord-1 на -1 — він перейде на самий початок рядка.',                                 ru: 'Измени order у .ord-1 на -1 — он переместится в самое начало строки.' },
      { level: 'medium', uk: 'Зроби так, щоб .ord-3 (HTML: 3) відображався першим, не змінюючи HTML.',                          ru: 'Сделай так, чтобы .ord-3 (HTML: 3) отображался первым, не меняя HTML.' },
      { level: 'hard',   uk: 'Переверни весь порядок: HTML 1→5, а відображається 5→1 через order.',                              ru: 'Переверни весь порядок: HTML 1→5, а отображается 5→1 через order.' },
    ]
  );

  /* ─── 04-10 ─────────────────────────────────────────────── */
  patch('04-10',
    {
      uk: `<h2>align-self: вирівнювання окремого елемента</h2>
<p><code>align-self</code> — це те саме, що <code>align-items</code>, але задається на конкретному flex-<strong>елементі</strong>, а не на контейнері. Дозволяє «вибитися з ладу».</p>
<pre>/* На контейнері — для всіх */
.container { align-items: center; }

/* На окремому елементі — тільки для нього */
.special { align-self: flex-end; }
.another { align-self: flex-start; }</pre>
<h3>Значення align-self</h3>
<ul>
  <li><code>auto</code> — успадковує align-items контейнера (за замовч.)</li>
  <li><code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>stretch</code>, <code>baseline</code> — самостійне вирівнювання</li>
</ul>
<h3>Коли використовувати</h3>
<p>Уяви навігаційний рядок: всі пункти по центру, але кнопка «Увійти» — по правому нижньому краю. Замість окремого контейнера просто використовуєш align-self.</p>`,
      ru: `<h2>align-self: выравнивание отдельного элемента</h2>
<p><code>align-self</code> — то же самое, что <code>align-items</code>, но задаётся на конкретном flex-<strong>элементе</strong>, а не на контейнере. Позволяет «выбиться из строя».</p>
<pre>/* На контейнере — для всех */
.container { align-items: center; }

/* На отдельном элементе — только для него */
.special { align-self: flex-end; }
.another { align-self: flex-start; }</pre>
<h3>Значения align-self</h3>
<ul>
  <li><code>auto</code> — наследует align-items контейнера (по умолч.)</li>
  <li><code>flex-start</code>, <code>flex-end</code>, <code>center</code>, <code>stretch</code>, <code>baseline</code> — самостоятельное выравнивание</li>
</ul>
<h3>Когда использовать</h3>
<p>Представь навигационную строку: все пункты по центру, но кнопка «Войти» — по правому нижнему краю. Вместо отдельного контейнера просто используешь align-self.</p>`
    },
    `<div class="row">
  <div class="b auto">auto (center)</div>
  <div class="b start">flex-start</div>
  <div class="b end">flex-end</div>
  <div class="b stretch">stretch</div>
  <div class="b center-self">center</div>
</div>

<h2>Реальний приклад: шапка сайту</h2>
<header class="site-header">
  <div class="logo">🌐 Академія</div>
  <nav class="nav-links">
    <a href="#">Курси</a>
    <a href="#">Про нас</a>
    <a href="#">Блог</a>
  </nav>
  <button class="login-btn">Увійти</button>
</header>`,
    `body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #e2e8f0; }
h2 { font-size: 14px; color: #94a3b8; margin: 20px 0 8px; }

.row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1e293b;
  padding: 12px;
  border-radius: 10px;
  min-height: 120px;
  margin-bottom: 14px;
}
.b {
  background: #3b82f6; color: #fff; padding: 10px 12px;
  border-radius: 6px; font-size: 12px; text-align: center; font-weight: bold;
}

.auto    { align-self: auto; }
.start   { align-self: flex-start;  background: #059669; }
.end     { align-self: flex-end;    background: #dc2626; }
.stretch { align-self: stretch;     background: #7c3aed; }
.center-self { align-self: center;  background: #d97706; }

.site-header {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #1e293b;
  padding: 12px 20px;
  border-radius: 12px;
}
.logo { font-size: 18px; font-weight: bold; color: #f8fafc; }
.nav-links { display: flex; gap: 16px; flex: 1; justify-content: center; }
.nav-links a { color: #94a3b8; text-decoration: none; font-size: 14px; }
.nav-links a:hover { color: #f8fafc; }
.login-btn {
  align-self: flex-end;
  background: #059669; color: #fff;
  border: none; padding: 8px 18px;
  border-radius: 8px; cursor: pointer; font-size: 14px;
}`,
    [
      { level: 'easy',   uk: 'Зміни align-self у .start на flex-end і у .end на flex-start — поміняй їх місцями по вертикалі.',   ru: 'Измени align-self у .start на flex-end и у .end на flex-start — поменяй их местами по вертикали.' },
      { level: 'medium', uk: 'Зміни .login-btn на align-self: flex-start і подивись, де тепер з\'явиться кнопка «Увійти».',       ru: 'Измени .login-btn на align-self: flex-start и посмотри, где теперь появится кнопка «Войти».' },
      { level: 'hard',   uk: 'Задай різні align-self усім п\'яти блокам у .row та змалюй (словами), що відбулося.',               ru: 'Задай разные align-self всем пяти блокам в .row и опиши (словами), что произошло.' },
    ]
  );

  /* ─── 04-11 ─────────────────────────────────────────────── */
  patch('04-11',
    {
      uk: `<h2>Вкладений flex: flex всередині flex</h2>
<p>Flex-елемент сам може бути flex-контейнером для своїх дітей. Це потужна техніка для складних макетів.</p>
<pre>.card {
  display: flex;          /* картка — flex-контейнер */
  flex-direction: column; /* діти вертикально */
}

.card-body {
  display: flex;          /* тіло картки — теж контейнер */
  gap: 12px;
  align-items: center;
}</pre>
<h3>Класичний приклад: картка з кнопкою внизу</h3>
<p>Часто потрібно, щоб кнопка завжди була внизу картки, навіть якщо текст короткий. Рішення — flex + margin-top: auto:</p>
<pre>.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card-button {
  margin-top: auto; /* «виштовхує» кнопку в кінець */
}</pre>`,
      ru: `<h2>Вложенный flex: flex внутри flex</h2>
<p>Flex-элемент сам может быть flex-контейнером для своих детей. Это мощная техника для сложных макетов.</p>
<pre>.card {
  display: flex;          /* карточка — flex-контейнер */
  flex-direction: column; /* дети вертикально */
}

.card-body {
  display: flex;          /* тело карточки — тоже контейнер */
  gap: 12px;
  align-items: center;
}</pre>
<h3>Классический пример: карточка с кнопкой внизу</h3>
<p>Часто нужно, чтобы кнопка всегда была внизу карточки, даже если текст короткий. Решение — flex + margin-top: auto:</p>
<pre>.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card-button {
  margin-top: auto; /* «выталкивает» кнопку в конец */
}</pre>`
    },
    `<div class="page-layout">

  <aside class="sidebar">
    <div class="avatar">🧑‍💻</div>
    <h3>Іван Кодер</h3>
    <p>Веб-розробник</p>
    <nav>
      <a href="#">Профіль</a>
      <a href="#">Курси</a>
      <a href="#">Сертифікати</a>
    </nav>
  </aside>

  <main class="content">

    <div class="cards">
      <div class="card">
        <div class="card-icon">🌐</div>
        <h4>HTML та CSS</h4>
        <p>Основа будь-якого сайту. Навчись будувати красиві сторінки.</p>
        <button class="btn">Розпочати</button>
      </div>
      <div class="card">
        <div class="card-icon">⚡</div>
        <h4>JavaScript</h4>
        <p>Зроби свій сайт живим: анімації, кліки, динамічний контент та ігри.</p>
        <button class="btn">Розпочати</button>
      </div>
      <div class="card">
        <div class="card-icon">🐍</div>
        <h4>Python</h4>
        <p>Автоматизація та аналіз даних.</p>
        <button class="btn">Розпочати</button>
      </div>
    </div>

  </main>
</div>`,
    `* { box-sizing: border-box; }
body { font-family: Arial, sans-serif; margin: 0; background: #0f172a; color: #e2e8f0; padding: 20px; }

/* Зовнішній flex: sidebar | content */
.page-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

/* Sidebar — теж flex (колонка) */
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: #1e293b;
  border-radius: 14px;
  padding: 24px 16px;
  width: 160px;
  flex-shrink: 0;
}
.avatar { font-size: 48px; }
.sidebar h3 { margin: 0; font-size: 15px; color: #f8fafc; }
.sidebar p  { margin: 0; font-size: 12px; color: #94a3b8; }
.sidebar nav { display: flex; flex-direction: column; gap: 4px; width: 100%; margin-top: 8px; }
.sidebar nav a { color: #94a3b8; text-decoration: none; font-size: 13px; padding: 6px 10px; border-radius: 6px; }
.sidebar nav a:hover { background: #334155; color: #f8fafc; }

.content { flex: 1; }

/* Ряд карток — flex зі wrap */
.cards {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

/* Картка — flex-колонка з кнопкою внизу */
.card {
  display: flex;
  flex-direction: column;
  background: #1e293b;
  border-radius: 12px;
  padding: 20px;
  flex: 1;
  min-width: 160px;
}
.card-icon { font-size: 32px; margin-bottom: 10px; }
.card h4   { margin: 0 0 8px; color: #f8fafc; font-size: 15px; }
.card p    { font-size: 13px; color: #94a3b8; line-height: 1.5; margin: 0; flex: 1; }
.btn {
  margin-top: auto;   /* кнопка завжди внизу! */
  padding-top: 14px;
  background: #059669; color: #fff;
  border: none; padding: 9px; border-radius: 8px;
  cursor: pointer; font-size: 13px; margin-top: 14px;
}`,
    [
      { level: 'easy',   uk: 'Додай четверту картку «React» з іконкою ⚛️ та коротким описом.',                                   ru: 'Добавь четвёртую карточку «React» с иконкой ⚛️ и кратким описанием.' },
      { level: 'medium', uk: 'Зроби картку «Python» вдвічі ширшою за інші через flex: 2 (або flex-grow: 2).',                    ru: 'Сделай карточку «Python» вдвое шире других через flex: 2 (или flex-grow: 2).' },
      { level: 'hard',   uk: 'Зміни .page-layout на flex-direction: column на мобільній ширині — додай media query @media(max-width:600px){ .page-layout{flex-direction:column} .sidebar{width:100%} }', ru: 'Измени .page-layout на flex-direction: column на мобильной ширине — добавь media query @media(max-width:600px){ .page-layout{flex-direction:column} .sidebar{width:100%} }' },
    ]
  );

  /* ─── 04-12 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('04-12',
    {
      uk: `<h2>🧭 Проект: Навігаційне меню і картки продуктів</h2>
<p>Час зібрати весь Flexbox в один реальний макет! Ти зробиш повноцінний лендинг із навігацією, hero-секцією і карткою продуктів.</p>
<h3>Структура сторінки</h3>
<ul>
  <li><strong>Шапка (header)</strong> — логотип ліворуч, навігація по центру, кнопка праворуч. Використай <code>justify-content: space-between</code>.</li>
  <li><strong>Hero-секція</strong> — великий заголовок і кнопка по центру. Використай <code>align-items: center</code> і <code>justify-content: center</code> з фіксованою висотою.</li>
  <li><strong>Секція карток</strong> — 3–4 картки продуктів у flex-ряді з <code>flex-wrap: wrap</code>. Кнопка кожної картки — внизу через <code>margin-top: auto</code>.</li>
</ul>
<h3>Вимоги до карток</h3>
<ul>
  <li>Іконка або emoji зверху</li>
  <li>Назва і опис продукту</li>
  <li>Ціна</li>
  <li>Кнопка «Купити» завжди внизу (flex-column + margin-top: auto)</li>
  <li>Ефект hover (піднімається через transform)</li>
</ul>`,
      ru: `<h2>🧭 Проект: Навигационное меню и карточки продуктов</h2>
<p>Время собрать весь Flexbox в один реальный макет! Ты сделаешь полноценный лендинг с навигацией, hero-секцией и карточками продуктов.</p>
<h3>Структура страницы</h3>
<ul>
  <li><strong>Шапка (header)</strong> — логотип слева, навигация по центру, кнопка справа. Используй <code>justify-content: space-between</code>.</li>
  <li><strong>Hero-секция</strong> — большой заголовок и кнопка по центру. Используй <code>align-items: center</code> и <code>justify-content: center</code> с фиксированной высотой.</li>
  <li><strong>Секция карточек</strong> — 3–4 карточки продуктов в flex-ряду с <code>flex-wrap: wrap</code>. Кнопка каждой карточки — внизу через <code>margin-top: auto</code>.</li>
</ul>
<h3>Требования к карточкам</h3>
<ul>
  <li>Иконка или emoji сверху</li>
  <li>Название и описание продукта</li>
  <li>Цена</li>
  <li>Кнопка «Купить» всегда внизу (flex-column + margin-top: auto)</li>
  <li>Эффект hover (поднимается через transform)</li>
</ul>`
    },
    `<header class="header">
  <div class="logo">🛒 ShopFlex</div>
  <nav class="nav">
    <a href="#">Головна</a>
    <a href="#">Каталог</a>
    <a href="#">Акції</a>
    <a href="#">Контакти</a>
  </nav>
  <button class="header-btn">Увійти</button>
</header>

<section class="hero">
  <div class="hero-inner">
    <h1>Найкращі товари для тебе</h1>
    <p>Обирай з сотень пропозицій за найкращими цінами</p>
    <button class="hero-btn">Переглянути каталог →</button>
  </div>
</section>

<section class="products">
  <h2>Популярні товари</h2>
  <div class="cards">

    <div class="card">
      <div class="card-icon">🎧</div>
      <h3>Навушники Pro</h3>
      <p>Бездротові з шумозаглушенням. До 30 годин роботи.</p>
      <div class="price">1 299 грн</div>
      <button class="buy-btn">Купити</button>
    </div>

    <div class="card">
      <div class="card-icon">⌨️</div>
      <h3>Механічна клавіатура</h3>
      <p>RGB підсвітка, тихі перемикачі. Ідеально для навчання і роботи.</p>
      <div class="price">2 150 грн</div>
      <button class="buy-btn">Купити</button>
    </div>

    <div class="card">
      <div class="card-icon">🖱️</div>
      <h3>Ігрова мишка</h3>
      <p>6 кнопок, 16000 DPI. Для ігор і точної роботи.</p>
      <div class="price">850 грн</div>
      <button class="buy-btn">Купити</button>
    </div>

    <div class="card">
      <div class="card-icon">💡</div>
      <h3>LED-лампа</h3>
      <p>Регульована яскравість. Захищає очі під час роботи за монітором.</p>
      <div class="price">460 грн</div>
      <button class="buy-btn">Купити</button>
    </div>

  </div>
</section>`,
    `* { box-sizing: border-box; }
body { font-family: Arial, sans-serif; margin: 0; background: #f1f5f9; color: #1e293b; }

/* ── Header ── */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  background: #0f172a;
}
.logo { font-size: 20px; font-weight: bold; color: #fff; }
.nav { display: flex; gap: 24px; }
.nav a { color: #94a3b8; text-decoration: none; font-size: 14px; }
.nav a:hover { color: #fff; }
.header-btn {
  background: #059669; color: #fff;
  border: none; padding: 8px 20px;
  border-radius: 8px; cursor: pointer; font-size: 14px;
}

/* ── Hero ── */
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a5f, #0f172a);
  min-height: 240px;
  padding: 40px 32px;
}
.hero-inner { text-align: center; }
.hero-inner h1 { color: #fff; font-size: 28px; margin: 0 0 12px; }
.hero-inner p  { color: #94a3b8; margin: 0 0 20px; font-size: 15px; }
.hero-btn {
  background: #059669; color: #fff;
  border: none; padding: 12px 28px;
  border-radius: 10px; cursor: pointer; font-size: 16px;
}

/* ── Products ── */
.products { padding: 32px; max-width: 900px; margin: 0 auto; }
.products h2 { margin: 0 0 20px; font-size: 20px; }

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 180px;
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,.07);
  transition: transform .25s ease, box-shadow .25s ease;
}
.card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,.12); }

.card-icon { font-size: 36px; margin-bottom: 12px; }
.card h3   { margin: 0 0 8px; font-size: 15px; color: #1e293b; }
.card p    { font-size: 13px; color: #64748b; line-height: 1.5; margin: 0; flex: 1; }
.price     { font-size: 18px; font-weight: bold; color: #059669; margin-top: 12px; }

.buy-btn {
  margin-top: auto;
  background: #0f172a; color: #fff;
  border: none; padding: 10px;
  border-radius: 8px; cursor: pointer; font-size: 14px;
  margin-top: 14px;
  transition: background .2s;
}
.buy-btn:hover { background: #059669; }`,
    [
      { level: 'easy',   uk: 'Зміни ціни і назви товарів на власні (реальні або вигадані).',                                     ru: 'Измени цены и названия товаров на свои (реальные или вымышленные).' },
      { level: 'medium', uk: 'Додай п\'яту картку товару і перевір, що flex-wrap переносить її на новий рядок.',                  ru: 'Добавь пятую карточку товара и проверь, что flex-wrap переносит её на новую строку.' },
      { level: 'hard',   uk: 'Додай до кожної картки тег-бейдж (як у проекті модуля 3): &lt;span class="badge"&gt;Хіт&lt;/span&gt; через ::before або окремий span із position: absolute.',  ru: 'Добавь к каждой карточке тег-бейдж (как в проекте модуля 3): &lt;span class="badge"&gt;Хит&lt;/span&gt; через ::before или отдельный span с position: absolute.' },
      { level: 'extra',  uk: 'Зроби footer: flex-рядок із логотипом ліворуч і трьома колонками посилань. Використай justify-content: space-between.', ru: 'Сделай footer: flex-строка с логотипом слева и тремя колонками ссылок. Используй justify-content: space-between.' },
    ]
  );

})();
