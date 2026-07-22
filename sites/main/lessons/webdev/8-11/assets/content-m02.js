/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 2 — CSS: Перші стилі · 8–11 Веб-Старт
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

  /* ─── 02-01 ─────────────────────────────────────────────── */
  patch('02-01',
    {
      uk: `<h2>Як підключити CSS</h2>
<p>CSS (Cascading Style Sheets) — мова стилів. Вона відповідає за кольори, розміри, відступи та все, що робить сторінку красивою. Є три способи додати CSS до HTML.</p>
<h3>Спосіб 1 — атрибут style (вбудований)</h3>
<p>Стиль прямо у тезі. Зручно для швидкої перевірки, але погано підходить для великих проектів:</p>
<pre>&lt;p style="color: red; font-size: 20px;"&gt;Текст&lt;/p&gt;</pre>
<h3>Спосіб 2 — тег &lt;style&gt; у &lt;head&gt;</h3>
<p>Всі стилі в одному місці всередині HTML-файлу:</p>
<pre>&lt;head&gt;
  &lt;style&gt;
    p { color: red; }
  &lt;/style&gt;
&lt;/head&gt;</pre>
<h3>Спосіб 3 — зовнішній файл (найкращий!)</h3>
<p>Стилі в окремому файлі <code>style.css</code>, підключеному через &lt;link&gt;:</p>
<pre>&lt;link rel="stylesheet" href="style.css"&gt;</pre>
<p>У нашій веб-оболонці HTML і CSS редактори вже пов'язані — саме це і є третій спосіб у дії!</p>`,
      ru: `<h2>Как подключить CSS</h2>
<p>CSS (Cascading Style Sheets) — язык стилей. Он отвечает за цвета, размеры, отступы и всё, что делает страницу красивой. Есть три способа добавить CSS к HTML.</p>
<h3>Способ 1 — атрибут style (встроенный)</h3>
<p>Стиль прямо в теге. Удобно для быстрой проверки, но плохо подходит для больших проектов:</p>
<pre>&lt;p style="color: red; font-size: 20px;"&gt;Текст&lt;/p&gt;</pre>
<h3>Способ 2 — тег &lt;style&gt; в &lt;head&gt;</h3>
<p>Все стили в одном месте внутри HTML-файла:</p>
<pre>&lt;head&gt;
  &lt;style&gt;
    p { color: red; }
  &lt;/style&gt;
&lt;/head&gt;</pre>
<h3>Способ 3 — внешний файл (лучший!)</h3>
<p>Стили в отдельном файле <code>style.css</code>, подключённом через &lt;link&gt;:</p>
<pre>&lt;link rel="stylesheet" href="style.css"&gt;</pre>
<p>В нашей веб-оболочке HTML и CSS редакторы уже связаны — это и есть третий способ в действии!</p>`
    },
    `<h1>Привіт, CSS!</h1>

<p>Цей абзац стилізовано через CSS-редактор.</p>

<p style="color: orange; font-size: 18px;">
  А цей абзац стилізовано прямо в HTML
  через атрибут style.
</p>

<p>Знайди різницю між ними!</p>`,
    `/* Стилі з CSS-редактора */
body {
  font-family: Arial, sans-serif;
  padding: 28px;
  background: #f0f9ff;
}

h1 {
  color: #0369a1;
  font-size: 28px;
}

p {
  color: #334155;
  font-size: 16px;
  margin-bottom: 12px;
}`,
    [
      { level: 'easy',   uk: 'Зміни колір заголовка h1 у CSS-редакторі на будь-який інший.',                                     ru: 'Измени цвет заголовка h1 в CSS-редакторе на любой другой.' },
      { level: 'medium', uk: 'Додай до другого абзацу (через атрибут style) ще одну властивість: background-color: yellow.',      ru: 'Добавь ко второму абзацу (через атрибут style) ещё одно свойство: background-color: yellow.' },
      { level: 'hard',   uk: 'Перенеси стиль з атрибута style другого абзацу у CSS-редактор, використовуючи клас. Додай &lt;p class="orange-text"&gt; у HTML та .orange-text { ... } у CSS.', ru: 'Перенеси стиль из атрибута style второго абзаца в CSS-редактор, используя класс. Добавь &lt;p class="orange-text"&gt; в HTML и .orange-text { ... } в CSS.' },
    ]
  );

  /* ─── 02-02 ─────────────────────────────────────────────── */
  patch('02-02',
    {
      uk: `<h2>Колір тексту та фону</h2>
<p>Дві найпростіші CSS-властивості, з яких починається будь-який дизайн.</p>
<h3>color — колір тексту</h3>
<pre>h1 { color: red; }</pre>
<h3>background-color — колір фону</h3>
<pre>body { background-color: #f0f9ff; }</pre>
<h3>Три способи задати колір</h3>
<ul>
  <li><strong>Назва:</strong> <code>red</code>, <code>blue</code>, <code>coral</code>, <code>gold</code>, <code>tomato</code>, <code>teal</code> — є 140+ назв.</li>
  <li><strong>Hex-код:</strong> <code>#ff0000</code> (червоний), <code>#3b82f6</code> (синій). Перші два символи — червоний, наступні — зелений, останні — синій.</li>
  <li><strong>RGB:</strong> <code>rgb(255, 0, 0)</code> — три числа від 0 до 255 для червоного, зеленого, синього.</li>
</ul>
<p>Порада: у VS Code і більшості редакторів є <strong>вбудований палітровий вибирач кольору</strong> — клікни на квадрат кольору і вибери!</p>`,
      ru: `<h2>Цвет текста и фона</h2>
<p>Два простейших CSS-свойства, с которых начинается любой дизайн.</p>
<h3>color — цвет текста</h3>
<pre>h1 { color: red; }</pre>
<h3>background-color — цвет фона</h3>
<pre>body { background-color: #f0f9ff; }</pre>
<h3>Три способа задать цвет</h3>
<ul>
  <li><strong>Название:</strong> <code>red</code>, <code>blue</code>, <code>coral</code>, <code>gold</code>, <code>tomato</code>, <code>teal</code> — есть 140+ названий.</li>
  <li><strong>Hex-код:</strong> <code>#ff0000</code> (красный), <code>#3b82f6</code> (синий). Первые два символа — красный, следующие — зелёный, последние — синий.</li>
  <li><strong>RGB:</strong> <code>rgb(255, 0, 0)</code> — три числа от 0 до 255 для красного, зелёного, синего.</li>
</ul>
<p>Совет: в VS Code и большинстве редакторов есть <strong>встроенный выбор цвета</strong> — кликни на квадрат цвета и выбери!</p>`
    },
    `<h1>🎨 Палітра кольорів</h1>

<p class="named">Колір за назвою: tomato</p>
<p class="hex">Колір hex-кодом: #3b82f6</p>
<p class="rgb">Колір через rgb()</p>
<p class="bg-demo">Цей блок має кольоровий фон</p>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background-color: #1e1b4b;
}

h1 { color: #ffffff; margin-bottom: 20px; }

p {
  font-size: 17px;
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 6px;
}

.named  { color: tomato;   background-color: #1c1917; }
.hex    { color: #3b82f6;  background-color: #1c1917; }
.rgb    { color: rgb(74, 222, 128); background-color: #1c1917; }
.bg-demo {
  color: #1e1b4b;
  background-color: gold;
  font-weight: bold;
}`,
    [
      { level: 'easy',   uk: 'Зміни колір класу .named на свій улюблений — спробуй назву кольору англійською (наприклад coral, lime, orchid).', ru: 'Измени цвет класса .named на свой любимый — попробуй название цвета по-английски (например coral, lime, orchid).' },
      { level: 'medium', uk: 'Зміни background-color у .bg-demo з gold на будь-який hex-код (#xxxxxx). Поекспериментуй!', ru: 'Измени background-color у .bg-demo с gold на любой hex-код (#xxxxxx). Поэкспериментируй!' },
      { level: 'hard',   uk: 'Зміни фон всієї сторінки (body) на rgb-колір: спробуй rgb(30, 58, 138). Потім підбери кольори тексту так, щоб він добре читався.',ru: 'Измени фон всей страницы (body) на rgb-цвет: попробуй rgb(30, 58, 138). Затем подбери цвета текста так, чтобы он хорошо читался.' },
    ]
  );

  /* ─── 02-03 ─────────────────────────────────────────────── */
  patch('02-03',
    {
      uk: `<h2>Шрифти: font-family, font-size, font-weight</h2>
<p>Шрифт визначає характер тексту. Правильний вибір шрифту робить сторінку зручнішою і привабливішою.</p>
<h3>font-family — гарнітура</h3>
<p>Задає шрифт. Завжди вказуй кілька через кому — «резервний ланцюжок»:</p>
<pre>p { font-family: Arial, Helvetica, sans-serif; }</pre>
<p>Браузер бере перший шрифт. Якщо не знайде — переходить до наступного. <code>sans-serif</code> або <code>serif</code> в кінці — системний резерв.</p>
<h3>font-size — розмір</h3>
<ul>
  <li><code>px</code> — пікселі: <code>font-size: 18px</code>. Точний і простий.</li>
  <li><code>em</code> — відносний до батьківського: <code>1.2em</code> = 120% від батьківського розміру.</li>
</ul>
<h3>font-weight — жирність</h3>
<p>Від <code>100</code> (тонкий) до <code>900</code> (жирний). Або <code>normal</code> (400) та <code>bold</code> (700).</p>
<h3>font-style — нахил</h3>
<p><code>font-style: italic</code> — курсив. <code>normal</code> — звичайний.</p>`,
      ru: `<h2>Шрифты: font-family, font-size, font-weight</h2>
<p>Шрифт определяет характер текста. Правильный выбор шрифта делает страницу удобнее и привлекательнее.</p>
<h3>font-family — гарнитура</h3>
<p>Задаёт шрифт. Всегда указывай несколько через запятую — «резервная цепочка»:</p>
<pre>p { font-family: Arial, Helvetica, sans-serif; }</pre>
<p>Браузер берёт первый шрифт. Если не найдёт — переходит к следующему. <code>sans-serif</code> или <code>serif</code> в конце — системный резерв.</p>
<h3>font-size — размер</h3>
<ul>
  <li><code>px</code> — пиксели: <code>font-size: 18px</code>. Точный и простой.</li>
  <li><code>em</code> — относительный к родительскому: <code>1.2em</code> = 120% от родительского размера.</li>
</ul>
<h3>font-weight — жирность</h3>
<p>От <code>100</code> (тонкий) до <code>900</code> (жирный). Или <code>normal</code> (400) и <code>bold</code> (700).</p>
<h3>font-style — наклон</h3>
<p><code>font-style: italic</code> — курсив. <code>normal</code> — обычный.</p>`
    },
    `<h1>Порівняння шрифтів</h1>

<p class="sans">Arial, sans-serif — без засічок, сучасний</p>
<p class="serif">Georgia, serif — з засічками, класичний</p>
<p class="mono">Courier New, monospace — моноширинний, для коду</p>

<h2>Розміри</h2>
<p class="small">Малий текст — 12px</p>
<p class="normal">Звичайний — 16px</p>
<p class="large">Великий — 24px</p>

<h2>Жирність</h2>
<p class="thin">Тонкий: font-weight 300</p>
<p class="bold-text">Жирний: font-weight 700</p>
<p class="black-text">Чорний: font-weight 900</p>`,
    `body { padding: 24px; background: #fafafa; }

h1, h2 { color: #111827; margin: 16px 0 10px; font-size: 20px; }

.sans  { font-family: Arial, Helvetica, sans-serif; color: #1d4ed8; font-size: 16px; margin: 6px 0; }
.serif { font-family: Georgia, 'Times New Roman', serif; color: #7c3aed; font-size: 16px; margin: 6px 0; }
.mono  { font-family: 'Courier New', Courier, monospace; color: #059669; font-size: 16px; margin: 6px 0; }

.small  { font-size: 12px; color: #6b7280; }
.normal { font-size: 16px; color: #374151; }
.large  { font-size: 24px; color: #111827; }

.thin       { font-weight: 300; color: #9ca3af; font-size: 18px; font-family: Arial, sans-serif; }
.bold-text  { font-weight: 700; color: #374151; font-size: 18px; font-family: Arial, sans-serif; }
.black-text { font-weight: 900; color: #111827; font-size: 18px; font-family: Arial, sans-serif; }`,
    [
      { level: 'easy',   uk: 'Зміни font-family у класі .sans на Georgia і подивись, як текст стане схожим на газетний.',          ru: 'Измени font-family в классе .sans на Georgia и посмотри, как текст станет похожим на газетный.' },
      { level: 'medium', uk: 'Збільш font-size класу .large до 36px і додай font-style: italic.',                                   ru: 'Увеличь font-size класса .large до 36px и добавь font-style: italic.' },
      { level: 'hard',   uk: 'Створи новий клас .custom-text і застосуй його до нового абзацу в HTML. Задай шрифт Georgia, розмір 20px, жирність 700 і курсив.', ru: 'Создай новый класс .custom-text и примени его к новому абзацу в HTML. Задай шрифт Georgia, размер 20px, жирность 700 и курсив.' },
    ]
  );

  /* ─── 02-04 ─────────────────────────────────────────────── */
  patch('02-04',
    {
      uk: `<h2>Текст: text-align, line-height, letter-spacing</h2>
<p>Ці властивості відповідають за те, як текст розташований і як він «дихає» на сторінці.</p>
<h3>text-align — вирівнювання</h3>
<ul>
  <li><code>left</code> — за лівим краєм (за замовчуванням)</li>
  <li><code>center</code> — по центру</li>
  <li><code>right</code> — за правим краєм</li>
  <li><code>justify</code> — розтягнути до обох країв (як у газеті)</li>
</ul>
<h3>line-height — міжрядковий інтервал</h3>
<p>Чим більше значення, тим «повітряніше» текст. Рекомендовано <code>1.5</code>–<code>1.8</code> для основного тексту:</p>
<pre>p { line-height: 1.6; }</pre>
<h3>letter-spacing — відстань між літерами</h3>
<pre>h1 { letter-spacing: 3px; }</pre>
<h3>text-decoration — прикраси тексту</h3>
<p><code>underline</code> — підкреслення, <code>none</code> — прибрати (часто використовують для посилань), <code>line-through</code> — закреслення.</p>
<h3>text-transform — регістр</h3>
<p><code>uppercase</code> — ВСЕ ВЕЛИКИМИ, <code>lowercase</code> — всі малими, <code>capitalize</code> — Перша Велика.</p>`,
      ru: `<h2>Текст: text-align, line-height, letter-spacing</h2>
<p>Эти свойства отвечают за то, как текст расположен и как он «дышит» на странице.</p>
<h3>text-align — выравнивание</h3>
<ul>
  <li><code>left</code> — по левому краю (по умолчанию)</li>
  <li><code>center</code> — по центру</li>
  <li><code>right</code> — по правому краю</li>
  <li><code>justify</code> — растянуть до обоих краёв (как в газете)</li>
</ul>
<h3>line-height — межстрочный интервал</h3>
<p>Чем больше значение, тем «воздушнее» текст. Рекомендуется <code>1.5</code>–<code>1.8</code> для основного текста:</p>
<pre>p { line-height: 1.6; }</pre>
<h3>letter-spacing — расстояние между буквами</h3>
<pre>h1 { letter-spacing: 3px; }</pre>
<h3>text-decoration — украшения текста</h3>
<p><code>underline</code> — подчёркивание, <code>none</code> — убрать (часто для ссылок), <code>line-through</code> — зачёркивание.</p>
<h3>text-transform — регистр</h3>
<p><code>uppercase</code> — ВСЁ ЗАГЛАВНЫМИ, <code>lowercase</code> — все строчными, <code>capitalize</code> — Первая Заглавная.</p>`
    },
    `<h1>Заголовок по центру</h1>

<p class="left-text">
  Вирівнювання ліворуч. Це найзвичайніший варіант
  для звичайного тексту на сайтах.
</p>

<p class="justify-text">
  Вирівнювання justify — текст розтягується до обох країв,
  як у книзі або газеті. Добре виглядає у довгих абзацах.
</p>

<p class="spaced">
  Широкий міжрядковий інтервал і відстань між літерами.
  Текст стає легшим для читання.
</p>

<p class="uppercase-text">цей текст — малими у html, великими у css</p>`,
    `body {
  font-family: Arial, sans-serif;
  max-width: 560px;
  margin: 0 auto;
  padding: 28px;
  background: #fffbeb;
}

h1 {
  text-align: center;
  letter-spacing: 4px;
  text-transform: uppercase;
  font-size: 20px;
  color: #92400e;
}

.left-text {
  text-align: left;
  line-height: 1.4;
  color: #374151;
  margin-bottom: 14px;
}

.justify-text {
  text-align: justify;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 14px;
}

.spaced {
  line-height: 2.2;
  letter-spacing: 1.5px;
  color: #6d28d9;
}

.uppercase-text {
  text-transform: uppercase;
  letter-spacing: 6px;
  font-size: 13px;
  color: #b45309;
  text-align: center;
  margin-top: 16px;
}`,
    [
      { level: 'easy',   uk: 'Зміни text-align заголовка з center на right і подивись результат.',                                     ru: 'Измени text-align заголовка с center на right и посмотри результат.' },
      { level: 'medium', uk: 'Збільш letter-spacing у .spaced до 4px і line-height до 3. Що стало зручнішим для читання?',              ru: 'Увеличь letter-spacing в .spaced до 4px и line-height до 3. Что стало удобнее для чтения?' },
      { level: 'hard',   uk: 'Додай новий абзац з класом .right-text, вирівняй його праворуч і додай text-decoration: underline.',       ru: 'Добавь новый абзац с классом .right-text, выровняй его вправо и добавь text-decoration: underline.' },
    ]
  );

  /* ─── 02-05 ─────────────────────────────────────────────── */
  patch('02-05',
    {
      uk: `<h2>Відступи ззовні: margin</h2>
<p><code>margin</code> — простір <strong>зовні</strong> елемента, між ним і сусідніми елементами. Уяви коробку: margin — це повітря навколо неї.</p>
<h3>Скорочений запис</h3>
<pre>/* Всі чотири сторони однаково */
margin: 20px;

/* Вертикальні | Горизонтальні */
margin: 10px 30px;

/* Верх | Право | Низ | Ліво (за годинниковою стрілкою) */
margin: 10px 20px 30px 40px;</pre>
<h3>Окремі сторони</h3>
<pre>margin-top: 20px;
margin-right: 10px;
margin-bottom: 20px;
margin-left: 10px;</pre>
<h3>Хитрість: margin: 0 auto</h3>
<p>Щоб центрувати блок по горизонталі, встанови <code>margin: 0 auto</code> і задай йому ширину:</p>
<pre>.card {
  width: 400px;
  margin: 0 auto; /* блок по центру! */
}</pre>`,
      ru: `<h2>Внешние отступы: margin</h2>
<p><code>margin</code> — пространство <strong>снаружи</strong> элемента, между ним и соседними элементами. Представь коробку: margin — это воздух вокруг неё.</p>
<h3>Сокращённая запись</h3>
<pre>/* Все четыре стороны одинаково */
margin: 20px;

/* Вертикальные | Горизонтальные */
margin: 10px 30px;

/* Верх | Право | Низ | Лево (по часовой стрелке) */
margin: 10px 20px 30px 40px;</pre>
<h3>Отдельные стороны</h3>
<pre>margin-top: 20px;
margin-right: 10px;
margin-bottom: 20px;
margin-left: 10px;</pre>
<h3>Хитрость: margin: 0 auto</h3>
<p>Чтобы центрировать блок по горизонтали, установи <code>margin: 0 auto</code> и задай ему ширину:</p>
<pre>.card {
  width: 400px;
  margin: 0 auto; /* блок по центру! */
}</pre>`
    },
    `<div class="demo-wrap">

  <div class="box box-a">Маленький margin: 5px</div>
  <div class="box box-b">Середній margin: 20px</div>
  <div class="box box-c">Великий margin: 50px</div>

</div>

<div class="centered-card">
  Цей блок — по центру завдяки margin: 0 auto
</div>`,
    `body {
  font-family: Arial, sans-serif;
  background: #f1f5f9;
  padding: 16px;
}

.demo-wrap {
  background: #e2e8f0;
  padding: 4px;
}

.box {
  background: #3b82f6;
  color: #fff;
  font-size: 14px;
  padding: 10px 14px;
  border-radius: 6px;
}

.box-a { margin: 5px;  background: #3b82f6; }
.box-b { margin: 20px; background: #6d28d9; }
.box-c { margin: 50px; background: #059669; }

.centered-card {
  width: 300px;
  margin: 30px auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 15px;
  color: #374151;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}`,
    [
      { level: 'easy',   uk: 'Зміни margin у .box-a на 30px і подивись, як блок відсунеться від сусідів.',                              ru: 'Измени margin у .box-a на 30px и посмотри, как блок отодвинется от соседей.' },
      { level: 'medium', uk: 'Зміни ширину .centered-card на 450px і переконайся, що він залишається по центру.',                        ru: 'Измени ширину .centered-card на 450px и убедись, что он остаётся по центру.' },
      { level: 'hard',   uk: 'Задай для .box-b різні відступи на кожну сторону: margin-top: 10px, margin-right: 40px, margin-bottom: 30px, margin-left: 0.', ru: 'Задай для .box-b разные отступы на каждую сторону: margin-top: 10px, margin-right: 40px, margin-bottom: 30px, margin-left: 0.' },
    ]
  );

  /* ─── 02-06 ─────────────────────────────────────────────── */
  patch('02-06',
    {
      uk: `<h2>Відступи всередині: padding</h2>
<p><code>padding</code> — простір <strong>всередині</strong> елемента, між його вмістом і краєм (границею). Якщо margin — повітря навколо коробки, то padding — м'яка підкладка всередині.</p>
<h3>Синтаксис — такий самий, як у margin</h3>
<pre>padding: 20px;                    /* всі сторони */
padding: 10px 20px;               /* вертик. | горизонт. */
padding: 10px 20px 30px 40px;     /* верх право низ ліво */
padding-top: 10px;
padding-left: 24px;</pre>
<h3>Ключова різниця: padding vs margin</h3>
<ul>
  <li><code>margin</code> — простір <em>поза</em> фоном елемента. Фон там не видно.</li>
  <li><code>padding</code> — простір <em>усередині</em> фону. Якщо у блока є background-color, то padding теж фарбується.</li>
</ul>
<h3>Блочна модель (box model)</h3>
<p>Кожен елемент = вміст + padding + border + margin. Розуміння цього — ключ до точного верстання.</p>`,
      ru: `<h2>Внутренние отступы: padding</h2>
<p><code>padding</code> — пространство <strong>внутри</strong> элемента, между его содержимым и краем (границей). Если margin — воздух вокруг коробки, то padding — мягкая подкладка внутри.</p>
<h3>Синтаксис — такой же, как у margin</h3>
<pre>padding: 20px;                    /* все стороны */
padding: 10px 20px;               /* верт. | горизонт. */
padding: 10px 20px 30px 40px;     /* верх право низ лево */
padding-top: 10px;
padding-left: 24px;</pre>
<h3>Ключевое отличие: padding vs margin</h3>
<ul>
  <li><code>margin</code> — пространство <em>за пределами</em> фона элемента. Фон там не виден.</li>
  <li><code>padding</code> — пространство <em>внутри</em> фона. Если у блока есть background-color, то padding тоже окрашивается.</li>
</ul>
<h3>Блочная модель (box model)</h3>
<p>Каждый элемент = содержимое + padding + border + margin. Понимание этого — ключ к точной вёрстке.</p>`
    },
    `<h2>Padding vs Margin</h2>

<div class="card no-padding">
  Без padding — текст притиснутий до краю
</div>

<div class="card small-padding">
  Малий padding: 8px — трохи вільніше
</div>

<div class="card big-padding">
  Великий padding: 32px — просторо!
</div>

<div class="card asymmetric">
  Асиметричний: padding 8px зверху/знизу,
  40px ліворуч/праворуч
</div>`,
    `body {
  font-family: Arial, sans-serif;
  background: #f0fdf4;
  padding: 20px;
}

h2 { color: #065f46; margin-bottom: 16px; }

.card {
  background: #059669;
  color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 15px;
}

.no-padding    { padding: 0; }
.small-padding { padding: 8px; }
.big-padding   { padding: 32px; }
.asymmetric    { padding: 8px 40px; background: #7c3aed; }`,
    [
      { level: 'easy',   uk: 'Зміни padding у .small-padding на 20px і порівняй з .big-padding.',                                     ru: 'Измени padding в .small-padding на 20px и сравни с .big-padding.' },
      { level: 'medium', uk: 'Додай padding-left: 60px до класу .no-padding — не змінюючи інші відступи.',                            ru: 'Добавь padding-left: 60px к классу .no-padding — не изменяя другие отступы.' },
      { level: 'hard',   uk: 'Задай для .asymmetric padding-top: 24px, padding-right: 12px, padding-bottom: 48px, padding-left: 12px окремими властивостями.', ru: 'Задай для .asymmetric padding-top: 24px, padding-right: 12px, padding-bottom: 48px, padding-left: 12px отдельными свойствами.' },
    ]
  );

  /* ─── 02-07 ─────────────────────────────────────────────── */
  patch('02-07',
    {
      uk: `<h2>Рамка: border</h2>
<p>Рамка — це лінія навколо елемента. Вона знаходиться між padding та margin у блочній моделі.</p>
<h3>Скорочений запис border</h3>
<pre>border: товщина стиль колір;
/* наприклад: */
border: 2px solid #000;
border: 4px dashed tomato;</pre>
<h3>Стилі рамки (border-style)</h3>
<ul>
  <li><code>solid</code> — суцільна лінія</li>
  <li><code>dashed</code> — штрихова</li>
  <li><code>dotted</code> — пунктирна</li>
  <li><code>double</code> — подвійна</li>
  <li><code>none</code> — немає рамки</li>
</ul>
<h3>Окремі сторони</h3>
<pre>border-top: 3px solid red;
border-left: 5px solid blue;
border-bottom: none;</pre>
<p>Популярний прийом дизайну — <strong>кольорова ліворуча рамка</strong> для виділення блоку цитати або примітки.</p>`,
      ru: `<h2>Рамка: border</h2>
<p>Рамка — это линия вокруг элемента. Она находится между padding и margin в блочной модели.</p>
<h3>Сокращённая запись border</h3>
<pre>border: толщина стиль цвет;
/* например: */
border: 2px solid #000;
border: 4px dashed tomato;</pre>
<h3>Стили рамки (border-style)</h3>
<ul>
  <li><code>solid</code> — сплошная линия</li>
  <li><code>dashed</code> — штриховая</li>
  <li><code>dotted</code> — пунктирная</li>
  <li><code>double</code> — двойная</li>
  <li><code>none</code> — нет рамки</li>
</ul>
<h3>Отдельные стороны</h3>
<pre>border-top: 3px solid red;
border-left: 5px solid blue;
border-bottom: none;</pre>
<p>Популярный приём дизайна — <strong>цветная левая рамка</strong> для выделения блока цитаты или примечания.</p>`
    },
    `<h2>Типи рамок</h2>

<div class="box solid">border: 3px solid #3b82f6</div>
<div class="box dashed">border: 3px dashed tomato</div>
<div class="box dotted">border: 3px dotted #059669</div>
<div class="box double">border: 6px double #7c3aed</div>

<h2>Часткові рамки</h2>

<div class="box top-only">Тільки верхня рамка</div>
<div class="box left-accent">
  Акцент ліворуч — стиль для цитати або примітки
</div>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f8fafc;
}

h2 { color: #1e293b; margin: 16px 0 10px; font-size: 17px; }

.box {
  padding: 14px 18px;
  margin-bottom: 10px;
  background: #fff;
  font-size: 15px;
  color: #374151;
  border-radius: 4px;
}

.solid   { border: 3px solid #3b82f6; }
.dashed  { border: 3px dashed tomato; }
.dotted  { border: 3px dotted #059669; }
.double  { border: 6px double #7c3aed; }

.top-only   { border: none; border-top: 4px solid #f59e0b; }
.left-accent {
  border: none;
  border-left: 5px solid #059669;
  padding-left: 20px;
  background: #f0fdf4;
  font-style: italic;
  color: #065f46;
}`,
    [
      { level: 'easy',   uk: 'Зміни стиль рамки .dashed на dotted і колір на синій (#3b82f6).',                                        ru: 'Измени стиль рамки .dashed на dotted и цвет на синий (#3b82f6).' },
      { level: 'medium', uk: 'Додай до .top-only ще й нижню рамку: border-bottom: 4px solid #f59e0b.',                                 ru: 'Добавь к .top-only ещё и нижнюю рамку: border-bottom: 4px solid #f59e0b.' },
      { level: 'hard',   uk: 'Створи новий блок .thick-border з різною товщиною рамки на кожній стороні: 1px зверху, 4px праворуч, 8px знизу, 2px ліворуч.', ru: 'Создай новый блок .thick-border с разной толщиной рамки на каждой стороне: 1px сверху, 4px справа, 8px снизу, 2px слева.' },
    ]
  );

  /* ─── 02-08 ─────────────────────────────────────────────── */
  patch('02-08',
    {
      uk: `<h2>Заокруглення: border-radius</h2>
<p><code>border-radius</code> — мабуть, найприємніша CSS-властивість. Вона заокруглює кути елемента і перетворює квадрати на плавні картки, кнопки або навіть кола.</p>
<h3>Базовий синтаксис</h3>
<pre>/* Всі кути однаково */
border-radius: 10px;

/* Коло — якщо ширина = висота */
border-radius: 50%;

/* Таблетка (pill) */
border-radius: 999px;</pre>
<h3>Окремі кути</h3>
<pre>/* верх-ліво | верх-право | низ-право | низ-ліво */
border-radius: 20px 0 20px 0;</pre>
<p>Зверни увагу: щоб отримати ідеальне коло, елемент має бути <strong>квадратним</strong> (однакові width і height).</p>`,
      ru: `<h2>Скругление: border-radius</h2>
<p><code>border-radius</code> — пожалуй, самое приятное CSS-свойство. Оно скругляет углы элемента и превращает квадраты в плавные карточки, кнопки или даже круги.</p>
<h3>Базовый синтаксис</h3>
<pre>/* Все углы одинаково */
border-radius: 10px;

/* Круг — если ширина = высота */
border-radius: 50%;

/* Таблетка (pill) */
border-radius: 999px;</pre>
<h3>Отдельные углы</h3>
<pre>/* верх-лево | верх-право | низ-право | низ-лево */
border-radius: 20px 0 20px 0;</pre>
<p>Обрати внимание: чтобы получить идеальный круг, элемент должен быть <strong>квадратным</strong> (одинаковые width и height).</p>`
    },
    `<h2>Форми з border-radius</h2>

<div class="shapes">
  <div class="shape square">0px — квадрат</div>
  <div class="shape rounded">12px — картка</div>
  <div class="shape pill">999px — таблетка</div>
  <div class="shape circle">50% — коло</div>
</div>

<h2>Асиметричні кути</h2>
<div class="asymm">Різні кути: 40px 0 40px 0</div>

<h2>Аватар</h2>
<img src="https://picsum.photos/seed/avatar/100/100"
     class="avatar" alt="Аватар">`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #faf5ff;
}

h2 { color: #6d28d9; margin: 18px 0 12px; font-size: 16px; }

.shapes {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.shape {
  width: 110px;
  height: 80px;
  background: #7c3aed;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8px;
}

.square  { border-radius: 0; }
.rounded { border-radius: 12px; }
.pill    { border-radius: 999px; }
.circle  {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.asymm {
  background: #059669;
  color: #fff;
  padding: 16px 24px;
  border-radius: 40px 0 40px 0;
  display: inline-block;
  font-size: 15px;
}

.avatar {
  border-radius: 50%;
  border: 4px solid #7c3aed;
  display: block;
  margin-top: 8px;
}`,
    [
      { level: 'easy',   uk: 'Зміни border-radius у .rounded з 12px на 30px і подивись, як картка стає ще м\'якшою.',                ru: 'Измени border-radius у .rounded с 12px на 30px и посмотри, как карточка становится ещё мягче.' },
      { level: 'medium', uk: 'Зміни розмір .circle: зроби width і height по 120px. Чи залишається воно круглим?',                    ru: 'Измени размер .circle: сделай width и height по 120px. Остаётся ли оно круглым?' },
      { level: 'hard',   uk: 'Задай для .asymm border-radius: 0 40px 0 40px (протилежні кути) і порівняй з поточним ефектом.',       ru: 'Задай для .asymm border-radius: 0 40px 0 40px (противоположные углы) и сравни с текущим эффектом.' },
    ]
  );

  /* ─── 02-09 ─────────────────────────────────────────────── */
  patch('02-09',
    {
      uk: `<h2>Тіні: box-shadow та text-shadow</h2>
<p>Тіні додають глибину і «підіймають» елементи над сторінкою. Саме тому картки у гарних дизайнах виглядають об'ємними.</p>
<h3>box-shadow — тінь блока</h3>
<pre>box-shadow: X Y blur spread color;
/* наприклад: */
box-shadow: 2px 4px 12px 0px rgba(0,0,0,0.15);</pre>
<ul>
  <li><strong>X</strong> — зміщення по горизонталі (+ праворуч, − ліворуч)</li>
  <li><strong>Y</strong> — зміщення по вертикалі (+ вниз, − вгору)</li>
  <li><strong>blur</strong> — розмиття (0 = чітка, велике = м'яка)</li>
  <li><strong>spread</strong> — розширення тіні</li>
  <li><strong>color</strong> — колір (rgba для прозорості)</li>
</ul>
<h3>text-shadow — тінь тексту</h3>
<pre>text-shadow: X Y blur color;
h1 { text-shadow: 2px 2px 6px rgba(0,0,0,0.3); }</pre>
<h3>Кілька тіней через кому</h3>
<pre>box-shadow: 0 2px 4px rgba(0,0,0,.1),
            0 8px 24px rgba(0,0,0,.15);</pre>`,
      ru: `<h2>Тени: box-shadow и text-shadow</h2>
<p>Тени добавляют глубину и «поднимают» элементы над страницей. Именно поэтому карточки в красивых дизайнах выглядят объёмными.</p>
<h3>box-shadow — тень блока</h3>
<pre>box-shadow: X Y blur spread color;
/* например: */
box-shadow: 2px 4px 12px 0px rgba(0,0,0,0.15);</pre>
<ul>
  <li><strong>X</strong> — смещение по горизонтали (+ вправо, − влево)</li>
  <li><strong>Y</strong> — смещение по вертикали (+ вниз, − вверх)</li>
  <li><strong>blur</strong> — размытие (0 = чёткая, большое = мягкая)</li>
  <li><strong>spread</strong> — расширение тени</li>
  <li><strong>color</strong> — цвет (rgba для прозрачности)</li>
</ul>
<h3>text-shadow — тень текста</h3>
<pre>text-shadow: X Y blur color;
h1 { text-shadow: 2px 2px 6px rgba(0,0,0,0.3); }</pre>
<h3>Несколько теней через запятую</h3>
<pre>box-shadow: 0 2px 4px rgba(0,0,0,.1),
            0 8px 24px rgba(0,0,0,.15);</pre>`
    },
    `<h1>Тіні у дизайні</h1>

<div class="card flat">Без тіні (flat)</div>
<div class="card soft">М'яка тінь</div>
<div class="card deep">Глибока тінь</div>
<div class="card colored">Кольорова тінь</div>
<div class="card lifted">Подвійна тінь — ефект підйому</div>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 32px;
  background: #f1f5f9;
}

h1 {
  font-size: 26px;
  color: #0f172a;
  margin-bottom: 24px;
  text-shadow: 1px 2px 6px rgba(0,0,0,0.2);
}

.card {
  background: #fff;
  padding: 18px 22px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 15px;
  color: #334155;
}

.flat    { box-shadow: none; border: 1px solid #e2e8f0; }
.soft    { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.deep    { box-shadow: 0 8px 30px rgba(0,0,0,0.18); }
.colored { box-shadow: 4px 4px 16px rgba(109,40,217,0.3); }
.lifted  { box-shadow: 0 2px 4px rgba(0,0,0,0.08),
                       0 12px 32px rgba(0,0,0,0.14); }`,
    [
      { level: 'easy',   uk: 'Зміни тінь у .soft — збільш blur з 8px до 24px і подивись різницю.',                                      ru: 'Измени тень у .soft — увеличь blur с 8px до 24px и посмотри разницу.' },
      { level: 'medium', uk: 'Зміни колір тіні .colored на rgba(5,150,105,0.4) — зелений відтінок.',                                     ru: 'Измени цвет тени .colored на rgba(5,150,105,0.4) — зелёный оттенок.' },
      { level: 'hard',   uk: 'Додай до h1 текстову тінь: text-shadow: 0 0 20px rgba(109,40,217,0.6) — «світіння» навколо тексту.',       ru: 'Добавь к h1 текстовую тень: text-shadow: 0 0 20px rgba(109,40,217,0.6) — «свечение» вокруг текста.' },
    ]
  );

  /* ─── 02-10 ─────────────────────────────────────────────── */
  patch('02-10',
    {
      uk: `<h2>Фони: background-image та градієнти</h2>
<p>Крім суцільного кольору фону, CSS дозволяє ставити зображення і красиві градієнти.</p>
<h3>background-image</h3>
<pre>div { background-image: url('фото.jpg'); }</pre>
<h3>Лінійний градієнт</h3>
<pre>background-image: linear-gradient(напрямок, колір1, колір2);

/* Зверху вниз (за замовчуванням) */
background-image: linear-gradient(#667eea, #764ba2);

/* Під кутом */
background-image: linear-gradient(135deg, #f093fb, #f5576c);</pre>
<h3>background-size</h3>
<ul>
  <li><code>cover</code> — зображення заповнює весь блок (може обрізатись)</li>
  <li><code>contain</code> — зображення повністю видно (можуть бути поля)</li>
  <li><code>100% 100%</code> — розтягнути точно по розміру</li>
</ul>
<h3>background-position</h3>
<pre>background-position: center;
background-position: top right;</pre>`,
      ru: `<h2>Фоны: background-image и градиенты</h2>
<p>Кроме сплошного цвета фона, CSS позволяет ставить изображения и красивые градиенты.</p>
<h3>background-image</h3>
<pre>div { background-image: url('фото.jpg'); }</pre>
<h3>Линейный градиент</h3>
<pre>background-image: linear-gradient(направление, цвет1, цвет2);

/* Сверху вниз (по умолчанию) */
background-image: linear-gradient(#667eea, #764ba2);

/* Под углом */
background-image: linear-gradient(135deg, #f093fb, #f5576c);</pre>
<h3>background-size</h3>
<ul>
  <li><code>cover</code> — изображение заполняет весь блок (может обрезаться)</li>
  <li><code>contain</code> — изображение полностью видно (могут быть поля)</li>
  <li><code>100% 100%</code> — растянуть точно по размеру</li>
</ul>
<h3>background-position</h3>
<pre>background-position: center;
background-position: top right;</pre>`
    },
    `<div class="hero">
  <h1>Ласкаво просимо!</h1>
  <p>Градієнтний фон — без жодного зображення</p>
</div>

<div class="cards">
  <div class="card grad-1">Захід сонця</div>
  <div class="card grad-2">Океан</div>
  <div class="card grad-3">Ліс</div>
</div>

<div class="photo-bg">
  <p>Фон — реальне зображення</p>
</div>`,
    `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background: #0f172a;
}

.hero {
  background-image: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  text-align: center;
  padding: 48px 24px;
  border-radius: 14px;
  margin-bottom: 20px;
}

.hero h1 { margin: 0 0 8px; font-size: 28px; }
.hero p  { margin: 0; opacity: .85; }

.cards { display: flex; gap: 12px; margin-bottom: 20px; }

.card {
  flex: 1;
  height: 90px;
  border-radius: 10px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.grad-1 { background-image: linear-gradient(135deg, #f093fb, #f5576c); }
.grad-2 { background-image: linear-gradient(135deg, #4facfe, #00f2fe); }
.grad-3 { background-image: linear-gradient(135deg, #43e97b, #38f9d7); }

.photo-bg {
  background-image: url('https://picsum.photos/seed/forest/800/200');
  background-size: cover;
  background-position: center;
  height: 120px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-bg p {
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-shadow: 0 2px 6px rgba(0,0,0,.6);
  margin: 0;
}`,
    [
      { level: 'easy',   uk: 'Зміни кольори градієнта у .hero на будь-які інші два кольори.',                                           ru: 'Измени цвета градиента у .hero на любые другие два цвета.' },
      { level: 'medium', uk: 'Зміни кут градієнта .hero зі 135deg на 45deg і на 0deg — порівняй результати.',                           ru: 'Измени угол градиента .hero со 135deg на 45deg и на 0deg — сравни результаты.' },
      { level: 'hard',   uk: 'Додай до .photo-bg темний градієнт-оверлей поверх фото за допомогою двох фонів: background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(\'...\');', ru: 'Добавь к .photo-bg тёмный градиент-оверлей поверх фото с помощью двух фонов: background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(\'...\');' },
    ]
  );

  /* ─── 02-11 ─────────────────────────────────────────────── */
  patch('02-11',
    {
      uk: `<h2>Прозорість: opacity та rgba()</h2>
<p>Іноді потрібно зробити елемент напівпрозорим — наприклад, оверлей поверх фото або ефект при наведенні.</p>
<h3>opacity</h3>
<pre>div { opacity: 0.5; } /* 50% прозорості */</pre>
<ul>
  <li><code>0</code> — абсолютно прозорий (невидимий)</li>
  <li><code>0.5</code> — напівпрозорий</li>
  <li><code>1</code> — повністю непрозорий (за замовчуванням)</li>
</ul>
<p>⚠️ <strong>Нюанс:</strong> opacity впливає на <em>весь елемент</em> — і на текст всередині теж!</p>
<h3>rgba() — прозорість тільки кольору</h3>
<pre>background-color: rgba(0, 0, 0, 0.4);
/* r=0, g=0, b=0, alpha=0.4 */</pre>
<p>Четверте число (0–1) — alpha-канал, тобто прозорість. Перевага над opacity: текст всередині <strong>залишається непрозорим</strong>.</p>
<h3>Коли що використовувати</h3>
<ul>
  <li><code>opacity</code> — ефект зникнення всього елемента (hover, анімація)</li>
  <li><code>rgba()</code> — прозорий фон або рамка без впливу на текст</li>
</ul>`,
      ru: `<h2>Прозрачность: opacity и rgba()</h2>
<p>Иногда нужно сделать элемент полупрозрачным — например, оверлей поверх фото или эффект при наведении.</p>
<h3>opacity</h3>
<pre>div { opacity: 0.5; } /* 50% прозрачности */</pre>
<ul>
  <li><code>0</code> — абсолютно прозрачный (невидимый)</li>
  <li><code>0.5</code> — полупрозрачный</li>
  <li><code>1</code> — полностью непрозрачный (по умолчанию)</li>
</ul>
<p>⚠️ <strong>Нюанс:</strong> opacity влияет на <em>весь элемент</em> — и на текст внутри тоже!</p>
<h3>rgba() — прозрачность только цвета</h3>
<pre>background-color: rgba(0, 0, 0, 0.4);
/* r=0, g=0, b=0, alpha=0.4 */</pre>
<p>Четвёртое число (0–1) — alpha-канал, то есть прозрачность. Преимущество перед opacity: текст внутри <strong>остаётся непрозрачным</strong>.</p>
<h3>Когда что использовать</h3>
<ul>
  <li><code>opacity</code> — эффект исчезновения всего элемента (hover, анимация)</li>
  <li><code>rgba()</code> — прозрачный фон или рамка без влияния на текст</li>
</ul>`
    },
    `<h2>opacity — впливає на все</h2>

<div class="box op-100">opacity: 1.0 — повна непрозорість</div>
<div class="box op-70">opacity: 0.7 — текст теж блідіє!</div>
<div class="box op-30">opacity: 0.3 — ледве видно</div>

<h2>rgba() — тільки фон</h2>

<div class="box-photo">
  <div class="overlay rgba-overlay">
    rgba(0,0,0,0.4) — текст чіткий!
  </div>
</div>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #0f172a;
  color: #e2e8f0;
}

h2 { margin: 20px 0 10px; font-size: 16px; color: #94a3b8; }

.box {
  background: #3b82f6;
  color: #fff;
  padding: 14px 18px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 15px;
}

.op-100 { opacity: 1.0; }
.op-70  { opacity: 0.7; }
.op-30  { opacity: 0.3; }

.box-photo {
  background-image: url('https://picsum.photos/seed/city2/600/160');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
}

.overlay {
  padding: 24px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.rgba-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}`,
    [
      { level: 'easy',   uk: 'Зміни opacity у .op-70 на 0.5 і у .op-30 на 0.1. Що стало краще читатись?',                              ru: 'Измени opacity у .op-70 на 0.5 и у .op-30 на 0.1. Что стало лучше читаться?' },
      { level: 'medium', uk: 'Зміни четверте число в rgba() оверлея з 0.4 на 0.8 — фото майже зникне. Потім спробуй 0.1.',             ru: 'Измени четвёртое число в rgba() оверлея с 0.4 на 0.8 — фото почти исчезнет. Затем попробуй 0.1.' },
      { level: 'hard',   uk: 'Змінй колір у rgba() на rgba(109, 40, 217, 0.6) — фіолетовий оверлей. Чи добре читається білий текст?',  ru: 'Измени цвет в rgba() на rgba(109, 40, 217, 0.6) — фиолетовый оверлей. Хорошо ли читается белый текст?' },
    ]
  );

  /* ─── 02-12 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('02-12',
    {
      uk: `<h2>🎨 Проект: Стильна листівка або вітальна картка</h2>
<p>Час поєднати все, що вивчив у Модулі 2! Ти створиш красиву вітальну листівку за допомогою HTML і CSS.</p>
<h3>Що має бути на листівці?</h3>
<ul>
  <li><strong>Градієнтний або кольоровий фон</strong> — background-image / background-color</li>
  <li><strong>Заголовок-привітання</strong> — з великим шрифтом, тінню тексту</li>
  <li><strong>Ім'я отримувача</strong> — виділене через color і font-weight</li>
  <li><strong>Текст листівки</strong> — кілька рядків із правильним line-height</li>
  <li><strong>Кольоровий блок підпису</strong> — із рамкою або заокругленням</li>
</ul>
<h3>Підказки</h3>
<ul>
  <li>Центруй текст через <code>text-align: center</code>.</li>
  <li>Використовуй <code>margin: 0 auto</code> та фіксовану ширину для картки.</li>
  <li>Тінь (<code>box-shadow</code>) зробить картку «об'ємною».</li>
  <li>rgba() для напівпрозорого фону підпису — гарний штрих!</li>
</ul>
<p>Покажи готову листівку вчителю або другу 🎉</p>`,
      ru: `<h2>🎨 Проект: Стильная открытка или поздравительная карточка</h2>
<p>Время объединить всё, что изучил в Модуле 2! Ты создашь красивую поздравительную открытку с помощью HTML и CSS.</p>
<h3>Что должно быть на открытке?</h3>
<ul>
  <li><strong>Градиентный или цветной фон</strong> — background-image / background-color</li>
  <li><strong>Заголовок-поздравление</strong> — с большим шрифтом, тенью текста</li>
  <li><strong>Имя получателя</strong> — выделенное через color и font-weight</li>
  <li><strong>Текст открытки</strong> — несколько строк с правильным line-height</li>
  <li><strong>Цветной блок подписи</strong> — с рамкой или скруглением</li>
</ul>
<h3>Подсказки</h3>
<ul>
  <li>Центрируй текст через <code>text-align: center</code>.</li>
  <li>Используй <code>margin: 0 auto</code> и фиксированную ширину для карточки.</li>
  <li>Тень (<code>box-shadow</code>) сделает карточку «объёмной».</li>
  <li>rgba() для полупрозрачного фона подписи — красивый штрих!</li>
</ul>
<p>Покажи готовую открытку учителю или другу 🎉</p>`
    },
    `<!-- 🎨 ПРОЕКТ: Вітальна листівка -->

<div class="card">
  <div class="card-top">
    <p class="greeting-label">🎉 Вітаємо!</p>
    <h1>З Днем народження,</h1>
    <h2 class="recipient">Олено!</h2>
  </div>

  <div class="card-body">
    <p>
      Нехай цей день буде наповнений
      радістю, сміхом і теплом близьких!
    </p>
    <p>
      Бажаємо здоров'я, натхнення
      і нових перемог! 🌟
    </p>
  </div>

  <div class="card-footer">
    <p>З любов'ю,<br><strong>Твої друзі</strong></p>
  </div>
</div>`,
    `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(135deg, #667eea, #764ba2);
  font-family: Georgia, serif;
  padding: 24px;
}

.card {
  width: 380px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.card-top {
  background-image: linear-gradient(135deg, #f093fb, #f5576c);
  padding: 36px 28px 28px;
  text-align: center;
  color: #fff;
}

.greeting-label {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: .85;
  margin-bottom: 10px;
}

.card-top h1 {
  font-size: 22px;
  font-weight: 400;
  line-height: 1.4;
  text-shadow: 0 2px 8px rgba(0,0,0,.2);
}

.recipient {
  font-size: 34px;
  font-weight: 700;
  margin-top: 6px;
  text-shadow: 0 2px 10px rgba(0,0,0,.25);
}

.card-body {
  padding: 28px;
  text-align: center;
}

.card-body p {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 10px;
}

.card-footer {
  background: rgba(240, 147, 251, 0.12);
  border-top: 1px solid rgba(240, 147, 251, 0.3);
  padding: 18px 28px;
  text-align: center;
  font-size: 15px;
  color: #6d28d9;
  line-height: 1.7;
}`,
    [
      { level: 'easy',   uk: 'Зміни ім\'я отримувача (.recipient) на власне і відредагуй текст листівки.',                               ru: 'Измени имя получателя (.recipient) на своё и отредактируй текст открытки.' },
      { level: 'medium', uk: 'Зміни кольори градієнта .card-top на свій улюблений і підбери колір тексту так, щоб він добре читався.',   ru: 'Измени цвета градиента .card-top на свой любимый и подбери цвет текста так, чтобы он хорошо читался.' },
      { level: 'hard',   uk: 'Додай поле відправника: нову секцію .card-from після .card-footer з текстом «Від:» і полем для вводу імені (&lt;input type="text"&gt;). Стилізуй у тому ж дусі.', ru: 'Добавь поле отправителя: новую секцию .card-from после .card-footer с текстом «От:» и полем ввода имени (&lt;input type="text"&gt;). Стилизуй в том же духе.' },
      { level: 'extra',  uk: 'Зроби свою унікальну листівку «з нуля» — інший привід (Новий рік, вітання з успіхом), інші кольори, додай зображення з picsum.photos.', ru: 'Сделай свою уникальную открытку «с нуля» — другой повод (Новый год, поздравление с успехом), другие цвета, добавь изображение с picsum.photos.' },
    ]
  );

})();
