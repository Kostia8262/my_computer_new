/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 1 — HTML: Перші теги · 8–11 Веб-Старт
   Патчить WEB_LESSONS після завантаження lessons.js
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

  /* ─── 01-01 ─────────────────────────────────────────────── */
  patch('01-01',
    {
      uk: `<h2>Як влаштований сайт</h2>
<p>Уяви, що сайт — це будинок. <strong>HTML</strong> — це цеглини і стіни (структура). <strong>CSS</strong> — це фарба і декор (зовнішній вигляд). А <strong>браузер</strong> (Chrome, Firefox, Edge) — це будівельник, який читає твій код і показує готову сторінку.</p>
<h3>Що таке тег?</h3>
<p>HTML складається з <strong>тегів</strong>. Тег — це команда для браузера. Більшість тегів мають відкривальну та закривальну частину:</p>
<pre>&lt;p&gt;Це абзац тексту&lt;/p&gt;</pre>
<p><code>&lt;p&gt;</code> — відкривальний тег, <code>&lt;/p&gt;</code> — закривальний (з косою рискою). Між ними — вміст, який побачить користувач.</p>
<h3>Перші два теги</h3>
<p><code>&lt;h1&gt;</code> — великий заголовок сторінки. <code>&lt;p&gt;</code> — звичайний абзац тексту. Подивись на код у редакторі праворуч і спробуй його змінити!</p>`,
      ru: `<h2>Как устроен сайт</h2>
<p>Представь, что сайт — это дом. <strong>HTML</strong> — это кирпичики и стены (структура). <strong>CSS</strong> — это краска и декор (внешний вид). А <strong>браузер</strong> (Chrome, Firefox, Edge) — это строитель, который читает твой код и показывает готовую страницу.</p>
<h3>Что такое тег?</h3>
<p>HTML состоит из <strong>тегов</strong>. Тег — это команда для браузера. У большинства тегов есть открывающая и закрывающая части:</p>
<pre>&lt;p&gt;Это абзац текста&lt;/p&gt;</pre>
<p><code>&lt;p&gt;</code> — открывающий тег, <code>&lt;/p&gt;</code> — закрывающий (с косой чертой). Между ними — содержимое, которое увидит пользователь.</p>
<h3>Первые два тега</h3>
<p><code>&lt;h1&gt;</code> — большой заголовок страницы. <code>&lt;p&gt;</code> — обычный абзац текста. Посмотри на код в редакторе справа и попробуй его изменить!</p>`
    },
    `<!-- Привіт! Це HTML — мова для побудови сторінок -->
<h1>🌐 Мій перший сайт!</h1>
<p>HTML — це скелет сторінки.</p>
<p>CSS — це її зовнішній вигляд.</p>
<p>Браузер читає код і показує результат.</p>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f0fdf4;
}
h1 {
  color: #059669;
  font-size: 28px;
}
p {
  color: #374151;
  font-size: 16px;
  margin-bottom: 10px;
}`,
    [
      { level: 'easy',   uk: 'Зміни текст у тезі &lt;h1&gt; — напиши своє ім\'я.',        ru: 'Измени текст в теге &lt;h1&gt; — напиши своё имя.' },
      { level: 'easy',   uk: 'Зміни один з тегів &lt;p&gt; — напиши, яке твоє улюблене хобі.',  ru: 'Измени один из тегов &lt;p&gt; — напиши, какое твоё любимое хобби.' },
      { level: 'medium', uk: 'Додай ще один тег &lt;p&gt; з будь-яким текстом нижче за наявні.', ru: 'Добавь ещё один тег &lt;p&gt; с любым текстом ниже существующих.' },
    ]
  );

  /* ─── 01-02 ─────────────────────────────────────────────── */
  patch('01-02',
    {
      uk: `<h2>Перша сторінка: DOCTYPE, html, head, body</h2>
<p>Кожна HTML-сторінка має однакову «скелетну» структуру — чотири обов'язкові частини.</p>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="uk"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Назва вкладки&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Вміст сторінки тут&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
<h3>Що означає кожна частина?</h3>
<ul>
  <li><code>&lt;!DOCTYPE html&gt;</code> — каже браузеру: «це сучасний HTML».</li>
  <li><code>&lt;html&gt;</code> — корінь всього документа.</li>
  <li><code>&lt;head&gt;</code> — невидима «голова»: мета-дані, заголовок вкладки, підключення CSS.</li>
  <li><code>&lt;body&gt;</code> — всі елементи, які ти бачиш на екрані.</li>
</ul>
<p>У нашій веб-оболонці DOCTYPE і html/head/body вже додаються автоматично, але знати структуру необхідно!</p>`,
      ru: `<h2>Первая страница: DOCTYPE, html, head, body</h2>
<p>Каждая HTML-страница имеет одинаковую «скелетную» структуру — четыре обязательные части.</p>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Название вкладки&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Содержимое страницы здесь&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
<h3>Что означает каждая часть?</h3>
<ul>
  <li><code>&lt;!DOCTYPE html&gt;</code> — говорит браузеру: «это современный HTML».</li>
  <li><code>&lt;html&gt;</code> — корень всего документа.</li>
  <li><code>&lt;head&gt;</code> — невидимая «голова»: мета-данные, заголовок вкладки, подключение CSS.</li>
  <li><code>&lt;body&gt;</code> — все элементы, которые ты видишь на экране.</li>
</ul>
<p>В нашей веб-оболочке DOCTYPE и html/head/body уже добавляются автоматически, но знать структуру необходимо!</p>`
    },
    `<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8">
    <title>Мій сайт</title>
  </head>
  <body>
    <h1>Привіт, світе! 👋</h1>
    <p>Це моя перша повноцінна HTML-сторінка.</p>
    <p>Вона має правильну структуру з head і body.</p>
  </body>
</html>`,
    `body {
  font-family: 'Segoe UI', Arial, sans-serif;
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  background: #fffbeb;
}
h1 { color: #b45309; }
p  { color: #374151; line-height: 1.6; }`,
    [
      { level: 'easy',   uk: 'Зміни текст всередині тегу &lt;title&gt; — це назва вкладки в браузері.',  ru: 'Измени текст внутри тега &lt;title&gt; — это название вкладки в браузере.' },
      { level: 'medium', uk: 'Додай другий абзац &lt;p&gt; всередині &lt;body&gt; з будь-яким текстом.', ru: 'Добавь второй абзац &lt;p&gt; внутри &lt;body&gt; с любым текстом.' },
      { level: 'hard',   uk: 'Додай у &lt;head&gt; тег &lt;meta name="description" content="Мій перший сайт"&gt;. Сторінка виглядатиме так само, але Google зміг би її описати!', ru: 'Добавь в &lt;head&gt; тег &lt;meta name="description" content="Мой первый сайт"&gt;. Страница будет выглядеть так же, но Google смог бы её описать!' },
    ]
  );

  /* ─── 01-03 ─────────────────────────────────────────────── */
  patch('01-03',
    {
      uk: `<h2>Заголовки h1–h6: ієрархія тексту</h2>
<p>HTML має шість рівнів заголовків — від найбільшого <code>&lt;h1&gt;</code> до найменшого <code>&lt;h6&gt;</code>. Думай про них як про розділи книги: h1 — назва книги, h2 — розділ, h3 — підрозділ.</p>
<pre>&lt;h1&gt;Назва сайту (найбільший)&lt;/h1&gt;
&lt;h2&gt;Розділ&lt;/h2&gt;
&lt;h3&gt;Підрозділ&lt;/h3&gt;
&lt;h4&gt;Ще менше&lt;/h4&gt;
&lt;h5&gt;Зовсім маленький&lt;/h5&gt;
&lt;h6&gt;Найменший&lt;/h6&gt;</pre>
<h3>Важливі правила</h3>
<ul>
  <li>На кожній сторінці має бути <strong>лише один</strong> тег &lt;h1&gt; — головний заголовок.</li>
  <li>Не пропускай рівні: після h1 йде h2, а не h3.</li>
  <li>Заголовки допомагають пошуковикам (Google) розуміти зміст сторінки.</li>
</ul>`,
      ru: `<h2>Заголовки h1–h6: иерархия текста</h2>
<p>В HTML есть шесть уровней заголовков — от самого большого <code>&lt;h1&gt;</code> до самого маленького <code>&lt;h6&gt;</code>. Думай о них как о разделах книги: h1 — название книги, h2 — глава, h3 — подраздел.</p>
<pre>&lt;h1&gt;Название сайта (самый большой)&lt;/h1&gt;
&lt;h2&gt;Раздел&lt;/h2&gt;
&lt;h3&gt;Подраздел&lt;/h3&gt;
&lt;h4&gt;Ещё меньше&lt;/h4&gt;
&lt;h5&gt;Совсем маленький&lt;/h5&gt;
&lt;h6&gt;Самый маленький&lt;/h6&gt;</pre>
<h3>Важные правила</h3>
<ul>
  <li>На каждой странице должен быть <strong>только один</strong> тег &lt;h1&gt; — главный заголовок.</li>
  <li>Не пропускай уровни: после h1 идёт h2, а не h3.</li>
  <li>Заголовки помогают поисковикам (Google) понимать содержимое страницы.</li>
</ul>`
    },
    `<h1>🦁 Тварини</h1>

<h2>Дикі тварини</h2>

<h3>Кішки</h3>
<p>Леви живуть у савані.</p>

<h3>Псові</h3>
<p>Вовки живуть зграями.</p>

<h2>Домашні тварини</h2>

<h3>Кіт</h3>
<p>Пухнасті і незалежні.</p>

<h3>Пес</h3>
<p>Найкращі друзі людини.</p>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  max-width: 560px;
  background: #fefce8;
}
h1 { color: #713f12; font-size: 32px; border-bottom: 3px solid #eab308; padding-bottom: 8px; }
h2 { color: #92400e; font-size: 22px; margin-top: 20px; }
h3 { color: #b45309; font-size: 16px; }
p  { color: #374151; }`,
    [
      { level: 'easy',   uk: 'Зміни тему: замість «Тварини» напиши будь-яку іншу (наприклад «Ігри» або «Їжа»). Оновлюй усі заголовки відповідно.', ru: 'Смени тему: вместо «Животные» напиши любую другую (например «Игры» или «Еда»). Обнови все заголовки соответственно.' },
      { level: 'medium', uk: 'Додай новий &lt;h2&gt; розділ «Морські мешканці» і під ним &lt;h3&gt; з двома тваринами.', ru: 'Добавь новый &lt;h2&gt; раздел «Морские жители» и под ним &lt;h3&gt; с двумя животными.' },
      { level: 'hard',   uk: 'Додай усі шість рівнів заголовків (h1–h6) в один блок і подивись, як вони відрізняються за розміром.', ru: 'Добавь все шесть уровней заголовков (h1–h6) в один блок и посмотри, как они различаются по размеру.' },
    ]
  );

  /* ─── 01-04 ─────────────────────────────────────────────── */
  patch('01-04',
    {
      uk: `<h2>Параграфи та переноси: p, br, hr</h2>
<p>Три простих, але дуже корисних теги для роботи з текстом.</p>
<h3>&lt;p&gt; — абзац</h3>
<p>Тег <code>&lt;p&gt;</code> (від слова paragraph) — це окремий абзац. Браузер автоматично додає порожній рядок до і після нього.</p>
<pre>&lt;p&gt;Перший абзац.&lt;/p&gt;
&lt;p&gt;Другий абзац.&lt;/p&gt;</pre>
<h3>&lt;br&gt; — перенос рядка</h3>
<p>Тег <code>&lt;br&gt;</code> переносить текст на новий рядок <em>всередині</em> абзацу. Він <strong>самозакривний</strong> — не потребує закривального тегу:</p>
<pre>&lt;p&gt;Вулиця Шевченка, 12,&lt;br&gt;
м. Київ, 01001&lt;/p&gt;</pre>
<h3>&lt;hr&gt; — горизонтальна лінія</h3>
<p>Тег <code>&lt;hr&gt;</code> малює горизонтальну лінію-розділювач. Теж самозакривний.</p>`,
      ru: `<h2>Абзацы и переносы: p, br, hr</h2>
<p>Три простых, но очень полезных тега для работы с текстом.</p>
<h3>&lt;p&gt; — абзац</h3>
<p>Тег <code>&lt;p&gt;</code> (от слова paragraph) — это отдельный абзац. Браузер автоматически добавляет пустую строку до и после него.</p>
<pre>&lt;p&gt;Первый абзац.&lt;/p&gt;
&lt;p&gt;Второй абзац.&lt;/p&gt;</pre>
<h3>&lt;br&gt; — перенос строки</h3>
<p>Тег <code>&lt;br&gt;</code> переносит текст на новую строку <em>внутри</em> абзаца. Он <strong>самозакрывающийся</strong> — не требует закрывающего тега:</p>
<pre>&lt;p&gt;Улица Шевченко, 12,&lt;br&gt;
г. Киев, 01001&lt;/p&gt;</pre>
<h3>&lt;hr&gt; — горизонтальная линия</h3>
<p>Тег <code>&lt;hr&gt;</code> рисует горизонтальную линию-разделитель. Тоже самозакрывающийся.</p>`
    },
    `<h1>🍕 Рецепт піци</h1>

<p>Піца — одна з найпопулярніших страв у світі.
Її придумали в Неаполі, Італія.</p>

<p>Тісто, томатний соус і сир —
ось три секрети справжньої піци.</p>

<hr>

<h2>Адреса піцерії</h2>
<p>
  вул. Хрещатик, 1,<br>
  м. Київ,<br>
  тел: 044-123-45-67
</p>`,
    `body {
  font-family: Arial, sans-serif;
  max-width: 520px;
  margin: 0 auto;
  padding: 24px;
  background: #fff7ed;
}
h1 { color: #c2410c; }
h2 { color: #9a3412; font-size: 18px; }
p  { color: #374151; line-height: 1.7; }
hr { border: none; border-top: 2px dashed #fed7aa; margin: 20px 0; }`,
    [
      { level: 'easy',   uk: 'Зміни рецепт: замість піци напиши про своє улюблене блюдо. Оновлюй заголовки та текст.',       ru: 'Смени рецепт: вместо пиццы напиши о своём любимом блюде. Обнови заголовки и текст.' },
      { level: 'medium', uk: 'Використай &lt;br&gt; щоб написати список інгредієнтів в одному абзаці, кожен з нового рядка.', ru: 'Используй &lt;br&gt; чтобы написать список ингредиентов в одном абзаце, каждый с новой строки.' },
      { level: 'hard',   uk: 'Додай другий &lt;hr&gt; і після нього секцію «Час приготування» з абзацом тексту.',             ru: 'Добавь второй &lt;hr&gt; и после него секцию «Время приготовления» с абзацем текста.' },
    ]
  );

  /* ─── 01-05 ─────────────────────────────────────────────── */
  patch('01-05',
    {
      uk: `<h2>Виділення тексту: strong, em, mark, del</h2>
<p>HTML дозволяє виділяти окремі слова або фрази всередині абзацу. Ці теги — «рядкові» (inline), тобто вони не починають новий рядок.</p>
<h3>Теги виділення</h3>
<ul>
  <li><code>&lt;strong&gt;</code> — <strong>важливий жирний текст</strong>. Не просто вигляд, а смислова важливість.</li>
  <li><code>&lt;em&gt;</code> — <em>підкреслена увага, курсив</em>.</li>
  <li><code>&lt;mark&gt;</code> — <mark>підсвічений текст</mark> (жовте тло).</li>
  <li><code>&lt;del&gt;</code> — <del>закреслений текст</del> (наприклад, стара ціна).</li>
</ul>
<h3>Їх можна вкладати!</h3>
<pre>&lt;p&gt;Ціна: &lt;del&gt;500 грн&lt;/del&gt;
&lt;strong&gt;&lt;mark&gt;250 грн&lt;/mark&gt;&lt;/strong&gt;&lt;/p&gt;</pre>`,
      ru: `<h2>Выделение текста: strong, em, mark, del</h2>
<p>HTML позволяет выделять отдельные слова или фразы внутри абзаца. Эти теги — «строчные» (inline), то есть они не начинают новую строку.</p>
<h3>Теги выделения</h3>
<ul>
  <li><code>&lt;strong&gt;</code> — <strong>важный жирный текст</strong>. Не просто вид, а смысловая важность.</li>
  <li><code>&lt;em&gt;</code> — <em>подчёркнутое внимание, курсив</em>.</li>
  <li><code>&lt;mark&gt;</code> — <mark>подсвеченный текст</mark> (жёлтый фон).</li>
  <li><code>&lt;del&gt;</code> — <del>зачёркнутый текст</del> (например, старая цена).</li>
</ul>
<h3>Их можно вкладывать!</h3>
<pre>&lt;p&gt;Цена: &lt;del&gt;500 грн&lt;/del&gt;
&lt;strong&gt;&lt;mark&gt;250 грн&lt;/mark&gt;&lt;/strong&gt;&lt;/p&gt;</pre>`
    },
    `<h1>📖 Оголошення</h1>

<p>
  <strong>Увага!</strong> Починаємо набір до гуртка
  <em>«Веб-розробка для школярів»</em>.
</p>

<p>
  Заняття проходять <strong>щосереди о 16:00</strong>.
  Вступний внесок: <del>500 грн</del>
  <mark><strong>безкоштовно!</strong></mark>
</p>

<p>
  Реєстрація за посиланням або
  зверніться до <em>вчителя інформатики</em>.
</p>`,
    `body {
  font-family: Arial, sans-serif;
  max-width: 520px;
  margin: 0 auto;
  padding: 24px;
  background: #f0f9ff;
}
h1   { color: #0369a1; }
p    { font-size: 16px; line-height: 1.8; color: #1e293b; }
mark { background: #fef08a; padding: 1px 4px; border-radius: 3px; }`,
    [
      { level: 'easy',   uk: 'Виділи слово <strong>strong</strong> жирним у будь-якому абзаці.',                         ru: 'Выдели слово жирным тегом &lt;strong&gt; в любом абзаце.' },
      { level: 'easy',   uk: 'Підсвіти важливу фразу за допомогою &lt;mark&gt;.',                                         ru: 'Подсвети важную фразу с помощью &lt;mark&gt;.' },
      { level: 'medium', uk: 'Додай новий абзац із старою ціною (закресли за допомогою &lt;del&gt;) і новою ціною у &lt;strong&gt;.', ru: 'Добавь новый абзац со старой ценой (зачеркни с помощью &lt;del&gt;) и новой ценой в &lt;strong&gt;.' },
      { level: 'hard',   uk: 'Вклади теги один в одного: зроби текст одночасно жирним (&lt;strong&gt;) і курсивним (&lt;em&gt;).', ru: 'Вложи теги друг в друга: сделай текст одновременно жирным (&lt;strong&gt;) и курсивным (&lt;em&gt;).' },
    ]
  );

  /* ─── 01-06 ─────────────────────────────────────────────── */
  patch('01-06',
    {
      uk: `<h2>Посилання: тег &lt;a&gt;</h2>
<p>Тег <code>&lt;a&gt;</code> (від англ. anchor — «якір») перетворює текст або зображення на посилання, за яким можна клікнути.</p>
<pre>&lt;a href="https://google.com"&gt;Перейти в Google&lt;/a&gt;</pre>
<h3>Головні атрибути</h3>
<ul>
  <li><code>href</code> — адреса, куди веде посилання. Обов'язковий!</li>
  <li><code>target="_blank"</code> — відкриває посилання у <strong>новій вкладці</strong>.</li>
</ul>
<h3>Різні види посилань</h3>
<pre>&lt;!-- Зовнішній сайт --&gt;
&lt;a href="https://wikipedia.org" target="_blank"&gt;Вікіпедія&lt;/a&gt;

&lt;!-- Перехід на розділ сторінки --&gt;
&lt;a href="#contacts"&gt;Контакти&lt;/a&gt;

&lt;!-- Надіслати email --&gt;
&lt;a href="mailto:hello@example.com"&gt;Написати нам&lt;/a&gt;</pre>`,
      ru: `<h2>Ссылки: тег &lt;a&gt;</h2>
<p>Тег <code>&lt;a&gt;</code> (от англ. anchor — «якорь») превращает текст или изображение в ссылку, по которой можно кликнуть.</p>
<pre>&lt;a href="https://google.com"&gt;Перейти в Google&lt;/a&gt;</pre>
<h3>Главные атрибуты</h3>
<ul>
  <li><code>href</code> — адрес, куда ведёт ссылка. Обязательный!</li>
  <li><code>target="_blank"</code> — открывает ссылку в <strong>новой вкладке</strong>.</li>
</ul>
<h3>Разные виды ссылок</h3>
<pre>&lt;!-- Внешний сайт --&gt;
&lt;a href="https://wikipedia.org" target="_blank"&gt;Википедия&lt;/a&gt;

&lt;!-- Переход к разделу страницы --&gt;
&lt;a href="#contacts"&gt;Контакты&lt;/a&gt;

&lt;!-- Отправить email --&gt;
&lt;a href="mailto:hello@example.com"&gt;Написать нам&lt;/a&gt;</pre>`
    },
    `<h1>🔗 Мої улюблені сайти</h1>

<p>Ось кілька корисних ресурсів для навчання:</p>

<p>
  <a href="https://www.google.com" target="_blank">Google</a> —
  пошукова система №1.
</p>

<p>
  <a href="https://uk.wikipedia.org" target="_blank">Вікіпедія</a> —
  безкоштовна енциклопедія.
</p>

<p>
  <a href="https://www.youtube.com" target="_blank">YouTube</a> —
  відео на будь-яку тему.
</p>

<p>Є питання? <a href="mailto:teacher@school.ua">Напиши вчителю</a>.</p>`,
    `body {
  font-family: Arial, sans-serif;
  max-width: 520px;
  margin: 0 auto;
  padding: 24px;
  background: #f8fafc;
}
h1 { color: #1d4ed8; }
p  { font-size: 16px; line-height: 1.7; color: #334155; }
a  { color: #2563eb; font-weight: bold; }
a:hover { color: #1d4ed8; text-decoration: underline; }`,
    [
      { level: 'easy',   uk: 'Зміни адресу першого посилання на свій улюблений сайт.',                                            ru: 'Измени адрес первой ссылки на свой любимый сайт.' },
      { level: 'medium', uk: 'Додай атрибут target="_blank" до посилання, якого ще немає — щоб воно відкривалося у новій вкладці.', ru: 'Добавь атрибут target="_blank" к ссылке, у которой его нет — чтобы она открывалась в новой вкладке.' },
      { level: 'hard',   uk: 'Додай посилання-email у форматі &lt;a href="mailto:YOUR@email.com"&gt; та перевір, що воно відкриває поштову програму.',ru: 'Добавь ссылку-email в формате &lt;a href="mailto:YOUR@email.com"&gt; и проверь, что она открывает почтовую программу.' },
    ]
  );

  /* ─── 01-07 ─────────────────────────────────────────────── */
  patch('01-07',
    {
      uk: `<h2>Зображення: тег &lt;img&gt;</h2>
<p>Тег <code>&lt;img&gt;</code> вставляє зображення. Він <strong>самозакривний</strong> — не потребує закривального тегу.</p>
<pre>&lt;img src="фото.jpg" alt="Опис фото" width="300"&gt;</pre>
<h3>Обов'язкові атрибути</h3>
<ul>
  <li><code>src</code> — шлях до файлу або URL зображення.</li>
  <li><code>alt</code> — альтернативний текст. Показується, якщо картинка не завантажилась, і допомагає людям із вадами зору. <strong>Завжди вказуй!</strong></li>
</ul>
<h3>Додаткові атрибути</h3>
<ul>
  <li><code>width="300"</code> — ширина в пікселях (висота масштабується автоматично).</li>
  <li><code>height="200"</code> — задає висоту.</li>
</ul>
<p>У прикладі ми використовуємо сервіс <em>picsum.photos</em>, який надає випадкові красиві фото за розміром.</p>`,
      ru: `<h2>Изображения: тег &lt;img&gt;</h2>
<p>Тег <code>&lt;img&gt;</code> вставляет изображение. Он <strong>самозакрывающийся</strong> — не требует закрывающего тега.</p>
<pre>&lt;img src="фото.jpg" alt="Описание фото" width="300"&gt;</pre>
<h3>Обязательные атрибуты</h3>
<ul>
  <li><code>src</code> — путь к файлу или URL изображения.</li>
  <li><code>alt</code> — альтернативный текст. Показывается, если картинка не загрузилась, и помогает людям с ограниченным зрением. <strong>Всегда указывай!</strong></li>
</ul>
<h3>Дополнительные атрибуты</h3>
<ul>
  <li><code>width="300"</code> — ширина в пикселях (высота масштабируется автоматически).</li>
  <li><code>height="200"</code> — задаёт высоту.</li>
</ul>
<p>В примере мы используем сервис <em>picsum.photos</em>, который предоставляет случайные красивые фото по размеру.</p>`
    },
    `<h1>🖼️ Фотогалерея</h1>

<p>Природа:</p>
<img src="https://picsum.photos/seed/nature/400/250"
     alt="Красива природа"
     width="400">

<p>Місто:</p>
<img src="https://picsum.photos/seed/city/400/250"
     alt="Вечірнє місто"
     width="400">`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #0f172a;
  color: #e2e8f0;
}
h1  { color: #f8fafc; }
p   { color: #94a3b8; margin: 12px 0 6px; }
img { display: block; border-radius: 10px; margin-bottom: 16px; max-width: 100%; }`,
    [
      { level: 'easy',   uk: 'Зміни атрибут alt у кожного зображення на власний опис.',                          ru: 'Измени атрибут alt у каждого изображения на собственное описание.' },
      { level: 'medium', uk: 'Зменш ширину першого зображення до 200px і подивись як воно стиснеться.',           ru: 'Уменьши ширину первого изображения до 200px и посмотри, как оно сожмётся.' },
      { level: 'hard',   uk: 'Додай третє зображення зі словом seed/animals у URL. Обгорни кожне зображення в тег &lt;a&gt; так, щоб кліком воно відкривалось у новій вкладці.', ru: 'Добавь третье изображение со словом seed/animals в URL. Оберни каждое изображение в тег &lt;a&gt; так, чтобы по клику оно открывалось в новой вкладке.' },
    ]
  );

  /* ─── 01-08 ─────────────────────────────────────────────── */
  patch('01-08',
    {
      uk: `<h2>Списки: ul, ol, li</h2>
<p>Списки — один із найпоширеніших способів організувати інформацію на сторінці.</p>
<h3>Ненумерований список &lt;ul&gt;</h3>
<p>Від англ. «unordered list» — елементи відображаються з кружечками (•).</p>
<pre>&lt;ul&gt;
  &lt;li&gt;Молоко&lt;/li&gt;
  &lt;li&gt;Хліб&lt;/li&gt;
  &lt;li&gt;Сир&lt;/li&gt;
&lt;/ul&gt;</pre>
<h3>Нумерований список &lt;ol&gt;</h3>
<p>Від «ordered list» — елементи нумеруються автоматично (1, 2, 3…).</p>
<pre>&lt;ol&gt;
  &lt;li&gt;Відкрити редактор&lt;/li&gt;
  &lt;li&gt;Написати код&lt;/li&gt;
  &lt;li&gt;Зберегти і перевірити&lt;/li&gt;
&lt;/ol&gt;</pre>
<h3>Вкладені списки</h3>
<p>Можна розмістити список всередині іншого <code>&lt;li&gt;</code>. Браузер автоматично зробить відступ.</p>`,
      ru: `<h2>Списки: ul, ol, li</h2>
<p>Списки — один из самых распространённых способов организовать информацию на странице.</p>
<h3>Ненумерованный список &lt;ul&gt;</h3>
<p>От англ. «unordered list» — элементы отображаются с кружочками (•).</p>
<pre>&lt;ul&gt;
  &lt;li&gt;Молоко&lt;/li&gt;
  &lt;li&gt;Хлеб&lt;/li&gt;
  &lt;li&gt;Сыр&lt;/li&gt;
&lt;/ul&gt;</pre>
<h3>Нумерованный список &lt;ol&gt;</h3>
<p>От «ordered list» — элементы нумеруются автоматически (1, 2, 3…).</p>
<pre>&lt;ol&gt;
  &lt;li&gt;Открыть редактор&lt;/li&gt;
  &lt;li&gt;Написать код&lt;/li&gt;
  &lt;li&gt;Сохранить и проверить&lt;/li&gt;
&lt;/ol&gt;</pre>
<h3>Вложенные списки</h3>
<p>Можно разместить список внутри другого <code>&lt;li&gt;</code>. Браузер автоматически сделает отступ.</p>`
    },
    `<h1>🛒 Список покупок</h1>
<ul>
  <li>Молоко</li>
  <li>Хліб</li>
  <li>
    Фрукти
    <ul>
      <li>Яблука</li>
      <li>Банани</li>
    </ul>
  </li>
  <li>Сир</li>
</ul>

<h2>🏆 Топ-3 фільми</h2>
<ol>
  <li>Король Лев</li>
  <li>Головоломка</li>
  <li>Зоотрополіс</li>
</ol>`,
    `body {
  font-family: Arial, sans-serif;
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
  background: #fff1f2;
}
h1, h2 { color: #be123c; }
ul, ol  { padding-left: 22px; }
li      { font-size: 16px; margin-bottom: 6px; color: #1e293b; }
ul ul   { margin-top: 6px; }`,
    [
      { level: 'easy',   uk: 'Додай ще 2 продукти до списку покупок.',                                                         ru: 'Добавь ещё 2 продукта в список покупок.' },
      { level: 'medium', uk: 'Зміни &lt;ul&gt; списку покупок на &lt;ol&gt; і подивись, що числа з\'являться автоматично.',    ru: 'Измени &lt;ul&gt; списка покупок на &lt;ol&gt; и посмотри, что числа появятся автоматически.' },
      { level: 'hard',   uk: 'Додай ще один вкладений список до пункту «Молочні продукти» з двома підпунктами.',               ru: 'Добавь ещё один вложенный список к пункту «Молочные продукты» с двумя подпунктами.' },
    ]
  );

  /* ─── 01-09 ─────────────────────────────────────────────── */
  patch('01-09',
    {
      uk: `<h2>Таблиці: table, tr, td, th</h2>
<p>Таблиці дозволяють організовувати дані у рядки та стовпці — як в Excel.</p>
<h3>Базова структура</h3>
<pre>&lt;table&gt;
  &lt;tr&gt;           &lt;!-- рядок --&gt;
    &lt;th&gt;Ім'я&lt;/th&gt;  &lt;!-- заголовок стовпця --&gt;
    &lt;th&gt;Оцінка&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Олег&lt;/td&gt;  &lt;!-- комірка з даними --&gt;
    &lt;td&gt;12&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
<h3>Colspan і rowspan</h3>
<ul>
  <li><code>colspan="2"</code> — комірка займає 2 стовпці.</li>
  <li><code>rowspan="2"</code> — комірка займає 2 рядки.</li>
</ul>`,
      ru: `<h2>Таблицы: table, tr, td, th</h2>
<p>Таблицы позволяют организовывать данные в строки и столбцы — как в Excel.</p>
<h3>Базовая структура</h3>
<pre>&lt;table&gt;
  &lt;tr&gt;             &lt;!-- строка --&gt;
    &lt;th&gt;Имя&lt;/th&gt;  &lt;!-- заголовок столбца --&gt;
    &lt;th&gt;Оценка&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Олег&lt;/td&gt;  &lt;!-- ячейка с данными --&gt;
    &lt;td&gt;12&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
<h3>Colspan и rowspan</h3>
<ul>
  <li><code>colspan="2"</code> — ячейка занимает 2 столбца.</li>
  <li><code>rowspan="2"</code> — ячейка занимает 2 строки.</li>
</ul>`
    },
    `<h1>📅 Розклад на тиждень</h1>

<table>
  <tr>
    <th>День</th>
    <th>1 урок</th>
    <th>2 урок</th>
    <th>3 урок</th>
  </tr>
  <tr>
    <td>Понеділок</td>
    <td>Математика</td>
    <td>Укр. мова</td>
    <td>Фізика</td>
  </tr>
  <tr>
    <td>Вівторок</td>
    <td>Англійська</td>
    <td>Інформатика</td>
    <td>Хімія</td>
  </tr>
  <tr>
    <td>Середа</td>
    <td colspan="2">Фізкультура (2 год.)</td>
    <td>Біологія</td>
  </tr>
  <tr>
    <td>Четвер</td>
    <td>Географія</td>
    <td>Математика</td>
    <td>Музика</td>
  </tr>
</table>`,
    `body {
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f0f9ff;
}
h1     { color: #0c4a6e; }
table  { border-collapse: collapse; width: 100%; margin-top: 12px; }
th, td { border: 1px solid #bae6fd; padding: 10px 14px; text-align: left; }
th     { background: #0ea5e9; color: #fff; font-weight: 700; }
tr:nth-child(even) td { background: #e0f2fe; }`,
    [
      { level: 'easy',   uk: 'Заміни предмети у таблиці своїм розкладом на тиждень.',                                                   ru: 'Замени предметы в таблице своим расписанием на неделю.' },
      { level: 'medium', uk: 'Додай рядок для п\'ятниці з трьома предметами.',                                                           ru: 'Добавь строку для пятницы с тремя предметами.' },
      { level: 'hard',   uk: 'Додай стовпець «Домашнє завдання» і заповни його для кожного дня. Поєднай дві клітинки за допомогою colspan.', ru: 'Добавь столбец «Домашнее задание» и заполни его для каждого дня. Объедини две ячейки с помощью colspan.' },
    ]
  );

  /* ─── 01-10 ─────────────────────────────────────────────── */
  patch('01-10',
    {
      uk: `<h2>Форми: input, textarea, select, button</h2>
<p>Форми — це те, через що користувачі вводять дані: реєстрація, пошук, коментарі тощо.</p>
<h3>Тег &lt;input&gt;</h3>
<p>Самозакривний тег. Тип задається атрибутом <code>type</code>:</p>
<ul>
  <li><code>type="text"</code> — рядок тексту</li>
  <li><code>type="email"</code> — email (перевіряє формат)</li>
  <li><code>type="password"</code> — приховує символи</li>
  <li><code>type="number"</code> — тільки цифри</li>
  <li><code>type="checkbox"</code> — прапорець</li>
  <li><code>type="date"</code> — вибір дати</li>
</ul>
<h3>Інші елементи форми</h3>
<ul>
  <li><code>&lt;textarea&gt;</code> — великий текстовий блок.</li>
  <li><code>&lt;select&gt;&lt;option&gt;</code> — випадаючий список.</li>
  <li><code>&lt;button&gt;</code> або <code>&lt;input type="submit"&gt;</code> — кнопка відправки.</li>
</ul>
<p><strong>Порада:</strong> завжди пов'язуй мітку з полем через <code>&lt;label for="id"&gt;</code> і <code>id="id"</code>.</p>`,
      ru: `<h2>Формы: input, textarea, select, button</h2>
<p>Формы — это то, через что пользователи вводят данные: регистрация, поиск, комментарии и т.д.</p>
<h3>Тег &lt;input&gt;</h3>
<p>Самозакрывающийся тег. Тип задаётся атрибутом <code>type</code>:</p>
<ul>
  <li><code>type="text"</code> — строка текста</li>
  <li><code>type="email"</code> — email (проверяет формат)</li>
  <li><code>type="password"</code> — скрывает символы</li>
  <li><code>type="number"</code> — только цифры</li>
  <li><code>type="checkbox"</code> — флажок</li>
  <li><code>type="date"</code> — выбор даты</li>
</ul>
<h3>Другие элементы формы</h3>
<ul>
  <li><code>&lt;textarea&gt;</code> — большой текстовый блок.</li>
  <li><code>&lt;select&gt;&lt;option&gt;</code> — выпадающий список.</li>
  <li><code>&lt;button&gt;</code> или <code>&lt;input type="submit"&gt;</code> — кнопка отправки.</li>
</ul>
<p><strong>Совет:</strong> всегда связывай метку с полем через <code>&lt;label for="id"&gt;</code> и <code>id="id"&gt;</code>.</p>`
    },
    `<h1>📬 Форма зворотного зв'язку</h1>

<form>
  <label for="name">Ім'я:</label><br>
  <input type="text" id="name" placeholder="Твоє ім'я"><br><br>

  <label for="email">Email:</label><br>
  <input type="email" id="email" placeholder="example@mail.com"><br><br>

  <label for="topic">Тема:</label><br>
  <select id="topic">
    <option>Питання</option>
    <option>Скарга</option>
    <option>Подяка</option>
  </select><br><br>

  <label for="msg">Повідомлення:</label><br>
  <textarea id="msg" rows="4" placeholder="Напиши тут..."></textarea><br><br>

  <label>
    <input type="checkbox"> Я погоджуюсь з правилами
  </label><br><br>

  <button type="submit">Надіслати ✉️</button>
</form>`,
    `body {
  font-family: Arial, sans-serif;
  max-width: 460px;
  margin: 0 auto;
  padding: 24px;
  background: #fafafa;
}
h1       { color: #6d28d9; }
label    { font-size: 14px; font-weight: bold; color: #374151; }
input, textarea, select {
  width: 100%; padding: 8px 12px;
  border: 1px solid #d1d5db; border-radius: 6px;
  font-size: 15px; box-sizing: border-box;
}
input:focus, textarea:focus, select:focus { outline: 2px solid #6d28d9; }
button {
  background: #6d28d9; color: #fff;
  border: none; padding: 10px 24px;
  border-radius: 8px; font-size: 15px;
  cursor: pointer;
}
button:hover { background: #5b21b6; }`,
    [
      { level: 'easy',   uk: 'Зміни placeholder у полі імені на «Вкажи своє ім\'я».',                                        ru: 'Измени placeholder в поле имени на «Укажи своё имя».' },
      { level: 'medium', uk: 'Додай нове поле type="tel" з міткою «Телефон:» після поля email.',                             ru: 'Добавь новое поле type="tel" с меткой «Телефон:» после поля email.' },
      { level: 'hard',   uk: 'Додай поле type="date" для вибору дати з міткою «Бажана дата відповіді:» перед кнопкою.',      ru: 'Добавь поле type="date" для выбора даты с меткой «Желаемая дата ответа:» перед кнопкой.' },
    ]
  );

  /* ─── 01-11 ─────────────────────────────────────────────── */
  patch('01-11',
    {
      uk: `<h2>Семантична структура сторінки</h2>
<p><strong>Семантика</strong> — це значення. Семантичні теги кажуть браузеру і пошуковику не тільки <em>що</em> відображати, а й <em>що це означає</em>.</p>
<h3>Основні семантичні теги</h3>
<ul>
  <li><code>&lt;header&gt;</code> — шапка сторінки (логотип, заголовок, меню).</li>
  <li><code>&lt;nav&gt;</code> — навігаційне меню.</li>
  <li><code>&lt;main&gt;</code> — основний унікальний контент (лише один на сторінці).</li>
  <li><code>&lt;section&gt;</code> — тематичний розділ всередині main.</li>
  <li><code>&lt;article&gt;</code> — самостійний незалежний матеріал (новина, пост).</li>
  <li><code>&lt;aside&gt;</code> — бокова панель (виноски, реклама, посилання).</li>
  <li><code>&lt;footer&gt;</code> — підвал (копірайт, контакти).</li>
</ul>
<h3>Чому це важливо?</h3>
<p>Скрін-рідери для незрячих людей орієнтуються за цими тегами. Google краще індексує сторінки з правильною структурою. Код стає зрозумілим без зайвих коментарів.</p>`,
      ru: `<h2>Семантическая структура страницы</h2>
<p><strong>Семантика</strong> — это значение. Семантические теги говорят браузеру и поисковику не только <em>что</em> отображать, но и <em>что это означает</em>.</p>
<h3>Основные семантические теги</h3>
<ul>
  <li><code>&lt;header&gt;</code> — шапка страницы (логотип, заголовок, меню).</li>
  <li><code>&lt;nav&gt;</code> — навигационное меню.</li>
  <li><code>&lt;main&gt;</code> — основной уникальный контент (только один на странице).</li>
  <li><code>&lt;section&gt;</code> — тематический раздел внутри main.</li>
  <li><code>&lt;article&gt;</code> — самостоятельный независимый материал (новость, пост).</li>
  <li><code>&lt;aside&gt;</code> — боковая панель (выноски, реклама, ссылки).</li>
  <li><code>&lt;footer&gt;</code> — подвал (копирайт, контакты).</li>
</ul>
<h3>Почему это важно?</h3>
<p>Скрин-ридеры для незрячих людей ориентируются по этим тегам. Google лучше индексирует страницы с правильной структурой. Код становится понятным без лишних комментариев.</p>`
    },
    `<header>
  <h1>🌟 Моя школа</h1>
  <nav>
    <a href="#">Головна</a> |
    <a href="#">Про нас</a> |
    <a href="#">Контакти</a>
  </nav>
</header>

<main>
  <section>
    <h2>Про школу</h2>
    <p>Ми навчаємо дітей із задоволенням з 1995 року.</p>
  </section>

  <section>
    <h2>Новини</h2>
    <article>
      <h3>Олімпіада з математики</h3>
      <p>Наш учень Олег посів 1 місце!</p>
    </article>
    <article>
      <h3>День науки</h3>
      <p>Запрошуємо всіх 15 травня.</p>
    </article>
  </section>
</main>

<footer>
  <p>© 2025 Моя школа · вул. Шевченка, 1</p>
</footer>`,
    `* { box-sizing: border-box; }
body   { font-family: Arial, sans-serif; margin: 0; background: #f8fafc; }
header { background: #1e3a5f; color: #fff; padding: 16px 24px; }
header h1  { margin: 0 0 8px; font-size: 22px; }
nav a      { color: #93c5fd; text-decoration: none; font-size: 14px; }
nav a:hover{ text-decoration: underline; }
main   { max-width: 680px; margin: 24px auto; padding: 0 20px; }
section{ margin-bottom: 28px; }
h2     { color: #1e3a5f; border-bottom: 2px solid #dbeafe; padding-bottom: 6px; }
h3     { color: #1e40af; font-size: 15px; }
article{ background: #fff; border-left: 4px solid #3b82f6; padding: 12px 16px; margin-bottom: 10px; border-radius: 0 8px 8px 0; }
footer { background: #1e293b; color: #94a3b8; text-align: center; padding: 14px; font-size: 13px; }`,
    [
      { level: 'easy',   uk: 'Додай ще одне посилання до навігації (наприклад «Розклад»).',                                     ru: 'Добавь ещё одну ссылку в навигацию (например «Расписание»).' },
      { level: 'medium', uk: 'Додай нову &lt;section&gt; «Наші вчителі» після секції новин з одним параграфом тексту.',         ru: 'Добавь новую &lt;section&gt; «Наши учителя» после секции новостей с одним абзацем текста.' },
      { level: 'hard',   uk: 'Додай &lt;aside&gt; всередині &lt;main&gt; після секцій з текстом «Корисне посилання» і посиланням.', ru: 'Добавь &lt;aside&gt; внутри &lt;main&gt; после секций с текстом «Полезная ссылка» и ссылкой.' },
    ]
  );

  /* ─── 01-12 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('01-12',
    {
      uk: `<h2>🏆 Проект: Сторінка мого класу або гуртка</h2>
<p>Час застосувати все, що ти вивчив у Модулі 1! Ти створиш справжню HTML-сторінку для свого класу, гуртка або команди.</p>
<h3>Що має бути на сторінці?</h3>
<ul>
  <li><strong>&lt;header&gt;</strong> — назва класу/гуртка і навігація.</li>
  <li><strong>&lt;section&gt;</strong> «Про нас» — хто ми і чим займаємось.</li>
  <li><strong>Список</strong> (&lt;ul&gt; або &lt;ol&gt;) учасників або правил.</li>
  <li><strong>Таблиця</strong> — розклад або результати.</li>
  <li><strong>Форма</strong> — для вступу або контакту.</li>
  <li><strong>&lt;footer&gt;</strong> — контакти або копірайт.</li>
</ul>
<h3>Підказки</h3>
<ul>
  <li>Почни з &lt;h1&gt; — назва проекту.</li>
  <li>Використовуй семантичні теги: header, main, section, footer.</li>
  <li>Перевіряй, чи всі теги закриті!</li>
</ul>
<p>Не намагайся зробити все ідеально за раз — заповнюй секцію за секцією. В наступному модулі ти додаси CSS і все стане набагато красивішим! 🎨</p>`,
      ru: `<h2>🏆 Проект: Страница моего класса или кружка</h2>
<p>Время применить всё, что ты изучил в Модуле 1! Ты создашь настоящую HTML-страницу для своего класса, кружка или команды.</p>
<h3>Что должно быть на странице?</h3>
<ul>
  <li><strong>&lt;header&gt;</strong> — название класса/кружка и навигация.</li>
  <li><strong>&lt;section&gt;</strong> «О нас» — кто мы и чем занимаемся.</li>
  <li><strong>Список</strong> (&lt;ul&gt; или &lt;ol&gt;) участников или правил.</li>
  <li><strong>Таблица</strong> — расписание или результаты.</li>
  <li><strong>Форма</strong> — для вступления или контакта.</li>
  <li><strong>&lt;footer&gt;</strong> — контакты или копирайт.</li>
</ul>
<h3>Подсказки</h3>
<ul>
  <li>Начни с &lt;h1&gt; — название проекта.</li>
  <li>Используй семантические теги: header, main, section, footer.</li>
  <li>Проверяй, все ли теги закрыты!</li>
</ul>
<p>Не пытайся сделать всё идеально сразу — заполняй секцию за секцией. В следующем модуле ты добавишь CSS и всё станет намного красивее! 🎨</p>`
    },
    `<!-- 🏆 ПРОЕКТ: Сторінка мого класу/гуртка -->
<!-- Заповни кожну секцію своїм контентом! -->

<header>
  <h1>🎓 7-А клас, школа №5</h1>
  <nav>
    <a href="#about">Про нас</a> |
    <a href="#members">Учні</a> |
    <a href="#schedule">Розклад</a> |
    <a href="#contact">Контакт</a>
  </nav>
</header>

<main>
  <section id="about">
    <h2>Про наш клас</h2>
    <p>Ми — дружній клас із <strong>28 учнів</strong>. Наш улюблений предмет — інформатика!</p>
  </section>

  <section id="members">
    <h2>Наші учні</h2>
    <ul>
      <li>Олег Коваленко — <em>відповідальний за чистоту</em></li>
      <li>Аня Петрова — <em>стариста</em></li>
      <li>Максим Бойко — <em>капітан команди</em></li>
    </ul>
  </section>

  <section id="schedule">
    <h2>Розклад гуртка</h2>
    <table>
      <tr><th>День</th><th>Час</th><th>Кабінет</th></tr>
      <tr><td>Вівторок</td><td>16:00</td><td>Каб. 204</td></tr>
      <tr><td>Четвер</td><td>16:00</td><td>Каб. 204</td></tr>
    </table>
  </section>

  <section id="contact">
    <h2>Вступити до гуртка</h2>
    <form>
      <label for="n">Ім'я:</label><br>
      <input type="text" id="n" placeholder="Твоє ім'я"><br><br>
      <label for="e">Email:</label><br>
      <input type="email" id="e" placeholder="email@school.ua"><br><br>
      <button type="submit">Записатись ✏️</button>
    </form>
  </section>
</main>

<footer>
  <p>© 2025 · 7-А клас · Школа №5 · м. Київ</p>
</footer>`,
    `* { box-sizing: border-box; }
body   { font-family: Arial, sans-serif; margin: 0; color: #1e293b; background: #f8fafc; }
header { background: #065f46; color: #fff; padding: 20px 28px; }
header h1 { margin: 0 0 10px; font-size: 24px; }
nav a  { color: #6ee7b7; text-decoration: none; margin-right: 8px; }
nav a:hover { text-decoration: underline; }
main   { max-width: 700px; margin: 28px auto; padding: 0 20px; }
section{ margin-bottom: 32px; }
h2     { color: #065f46; border-bottom: 2px solid #a7f3d0; padding-bottom: 6px; }
ul li  { margin-bottom: 6px; font-size: 15px; }
table  { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #a7f3d0; padding: 9px 14px; }
th     { background: #059669; color: #fff; }
tr:nth-child(even) td { background: #ecfdf5; }
input  { padding: 8px; border: 1px solid #ccc; border-radius: 6px; width: 100%; margin-top: 4px; }
button { background: #059669; color: #fff; border: none; padding: 10px 22px; border-radius: 8px; cursor: pointer; margin-top: 8px; font-size: 15px; }
button:hover { background: #047857; }
footer { background: #0f172a; color: #64748b; text-align: center; padding: 14px; font-size: 13px; }`,
    [
      { level: 'easy',   uk: 'Заміни назву класу і школи на свою реальну.',                                                  ru: 'Замени название класса и школы на своё реальное.' },
      { level: 'easy',   uk: 'Заповни список учнів справжніми іменами (або вигаданими персонажами).',                        ru: 'Заполни список учеников настоящими именами (или вымышленными персонажами).' },
      { level: 'medium', uk: 'Додай секцію «🏅 Наші досягнення» з нумерованим списком &lt;ol&gt; (мінімум 3 пункти).',     ru: 'Добавь секцию «🏅 Наши достижения» с нумерованным списком &lt;ol&gt; (минимум 3 пункта).' },
      { level: 'hard',   uk: 'Додай зображення &lt;img&gt; — фото або заглушку з picsum.photos — поруч із секцією «Про нас».', ru: 'Добавь изображение &lt;img&gt; — фото или заглушку с picsum.photos — рядом с секцией «О нас».' },
    ]
  );

})();
