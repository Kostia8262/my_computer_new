/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 7 — Проект 1: Портфоліо · 8–11 Веб-Старт
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

  /* ─── Спільний CSS портфоліо (базова тема) ─────────────────
     Кожен урок наслідує і розширює цей стиль.
  ──────────────────────────────────────────────────────────── */
  const BASE_CSS = `* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --clr-bg:      #0f172a;
  --clr-surface: #1e293b;
  --clr-border:  #334155;
  --clr-text:    #f8fafc;
  --clr-muted:   #94a3b8;
  --clr-accent:  #059669;
  --clr-accent2: #3b82f6;
}
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: var(--clr-bg);
  color: var(--clr-text);
  line-height: 1.6;
}
a { color: var(--clr-accent2); text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; border-radius: 8px; }`;

  /* ─── 07-01 ─────────────────────────────────────────────── */
  patch('07-01',
    {
      uk: `<h2>Wireframe: ескіз сайту до коду</h2>
<p>Перед тим як писати код, досвідчені розробники малюють <strong>wireframe</strong> — схематичний ескіз сторінки. Це як скелет без м'язів: тільки прямокутники, лінії та підписи.</p>
<h3>Навіщо wireframe</h3>
<ul>
  <li>Ти бачиш, скільки секцій потрібно, ще до написання коду.</li>
  <li>Легко змінити план — стерти і намалювати, а не переписувати CSS.</li>
  <li>Ти вже знаєш структуру HTML перед її написанням.</li>
</ul>
<h3>Що буде в нашому портфоліо</h3>
<ul>
  <li>📌 <strong>Header</strong> — логотип/ім'я + навігація</li>
  <li>🦸 <strong>Hero</strong> — великий заголовок + фото + кнопки</li>
  <li>👤 <strong>Про мене</strong> — фото + текст</li>
  <li>🛠 <strong>Навички</strong> — бейджики/теги</li>
  <li>💼 <strong>Мої роботи</strong> — картки проектів у Grid</li>
  <li>💬 <strong>Відгук</strong> — цитата або відгук</li>
  <li>📬 <strong>Контакти</strong> — форма зворотного зв'язку</li>
  <li>🔗 <strong>Footer</strong> — посилання + copyright</li>
</ul>
<p>В редакторі ти бачиш CSS-wireframe — прямокутники замість секцій. Вивчи структуру і переходь до наступного уроку, де ми почнемо писати HTML.</p>`,
      ru: `<h2>Wireframe: эскиз сайта до кода</h2>
<p>Перед тем как писать код, опытные разработчики рисуют <strong>wireframe</strong> — схематический эскиз страницы. Это как скелет без мышц: только прямоугольники, линии и подписи.</p>
<h3>Зачем wireframe</h3>
<ul>
  <li>Ты видишь, сколько секций нужно, ещё до написания кода.</li>
  <li>Легко изменить план — стереть и нарисовать, а не переписывать CSS.</li>
  <li>Ты уже знаешь структуру HTML перед её написанием.</li>
</ul>
<h3>Что будет в нашем портфолио</h3>
<ul>
  <li>📌 <strong>Header</strong> — логотип/имя + навигация</li>
  <li>🦸 <strong>Hero</strong> — большой заголовок + фото + кнопки</li>
  <li>👤 <strong>Обо мне</strong> — фото + текст</li>
  <li>🛠 <strong>Навыки</strong> — бейджики/теги</li>
  <li>💼 <strong>Мои работы</strong> — карточки проектов в Grid</li>
  <li>💬 <strong>Отзыв</strong> — цитата или отзыв</li>
  <li>📬 <strong>Контакты</strong> — форма обратной связи</li>
  <li>🔗 <strong>Footer</strong> — ссылки + copyright</li>
</ul>
<p>В редакторе ты видишь CSS-wireframe — прямоугольники вместо секций. Изучи структуру и переходи к следующему уроку, где мы начнём писать HTML.</p>`
    },
    `<!-- Wireframe портфоліо -->
<div class="wireframe">
  <div class="wf-block wf-header">📌 Header — ім'я + навігація</div>
  <div class="wf-block wf-hero">
    🦸 Hero<br>
    <small>Великий заголовок · Фото · Кнопки</small>
  </div>
  <div class="wf-row">
    <div class="wf-block wf-about">👤 Про мене<br><small>фото + текст</small></div>
    <div class="wf-block wf-skills">🛠 Навички<br><small>бейджики</small></div>
  </div>
  <div class="wf-block wf-works">
    💼 Мої роботи
    <div class="wf-cards">
      <div class="wf-card">Проект 1</div>
      <div class="wf-card">Проект 2</div>
      <div class="wf-card">Проект 3</div>
    </div>
  </div>
  <div class="wf-block wf-quote">💬 Відгук / Цитата</div>
  <div class="wf-block wf-contact">📬 Контакти — форма</div>
  <div class="wf-block wf-footer">🔗 Footer</div>
</div>`,
    `* { box-sizing: border-box; }
body { font-family: Arial, sans-serif; padding: 20px; background: #1e293b; color: #e2e8f0; }

.wireframe { display: flex; flex-direction: column; gap: 10px; max-width: 600px; margin: 0 auto; }
.wf-block {
  border: 2px dashed #475569;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  font-weight: bold;
  color: #94a3b8;
  text-align: center;
}
.wf-block small { font-weight: normal; font-size: 12px; color: #64748b; }

.wf-header { background: #0f172a; min-height: 50px; }
.wf-hero   { background: #0c1a2e; min-height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
.wf-row { display: flex; gap: 10px; }
.wf-about  { flex: 1; background: #112; min-height: 100px; }
.wf-skills { flex: 1; background: #121; min-height: 100px; }
.wf-works  { background: #112; min-height: 120px; }
.wf-cards  { display: flex; gap: 8px; margin-top: 12px; }
.wf-card   { flex: 1; border: 1px dashed #475569; padding: 12px; border-radius: 6px; font-size: 12px; text-align: center; }
.wf-quote  { background: #0c0f1a; min-height: 80px; }
.wf-contact{ background: #0f172a; min-height: 100px; }
.wf-footer { background: #080d18; min-height: 50px; }`,
    [
      { level: 'easy',   uk: 'Намалюй свій wireframe на папері — намалюй прямокутники і підпиши кожну секцію.',                   ru: 'Нарисуй свой wireframe на бумаге — нарисуй прямоугольники и подпиши каждую секцию.' },
      { level: 'medium', uk: 'Додай до wireframe нову секцію .wf-services «Мої послуги» між «Навички» та «Мої роботи».',          ru: 'Добавь к wireframe новую секцию .wf-services «Мои услуги» между «Навыки» и «Мои работы».' },
      { level: 'hard',   uk: 'Зміни wireframe так, щоб «Про мене» було у дві колонки — ліворуч фото-заглушка, праворуч текст.',  ru: 'Измени wireframe так, чтобы «Обо мне» было в две колонки — слева фото-заглушка, справа текст.' },
    ]
  );

  /* ─── 07-02 ─────────────────────────────────────────────── */
  patch('07-02',
    {
      uk: `<h2>HTML-структура сторінки-портфоліо</h2>
<p>Тепер перетворимо wireframe у реальний HTML-скелет. Це основа, на яку ми будемо «наносити» CSS урок за уроком.</p>
<h3>Семантична структура</h3>
<p>Ми використовуємо семантичні теги — вони описують <em>сенс</em> вмісту, а не лише зовнішній вигляд:</p>
<ul>
  <li><code>&lt;header&gt;</code> — шапка сайту</li>
  <li><code>&lt;nav&gt;</code> — навігація</li>
  <li><code>&lt;main&gt;</code> — основний контент</li>
  <li><code>&lt;section&gt;</code> — окремі секції</li>
  <li><code>&lt;article&gt;</code> — самостійний блок (відгук)</li>
  <li><code>&lt;footer&gt;</code> — підвал сайту</li>
</ul>
<p>Поки що CSS мінімальний — ми побачимо «голий» HTML. Це нормально! В наступних уроках додамо стилі до кожної секції.</p>`,
      ru: `<h2>HTML-структура страницы-портфолио</h2>
<p>Теперь превратим wireframe в реальный HTML-скелет. Это основа, на которую мы будем «наносить» CSS урок за уроком.</p>
<h3>Семантическая структура</h3>
<p>Мы используем семантические теги — они описывают <em>смысл</em> содержимого, а не только внешний вид:</p>
<ul>
  <li><code>&lt;header&gt;</code> — шапка сайта</li>
  <li><code>&lt;nav&gt;</code> — навигация</li>
  <li><code>&lt;main&gt;</code> — основной контент</li>
  <li><code>&lt;section&gt;</code> — отдельные секции</li>
  <li><code>&lt;article&gt;</code> — самостоятельный блок (отзыв)</li>
  <li><code>&lt;footer&gt;</code> — подвал сайта</li>
</ul>
<p>Пока что CSS минимальный — мы увидим «голый» HTML. Это нормально! В следующих уроках добавим стили к каждой секции.</p>`
    },
    `<!--- Це тільки структура —>
<header id="header">
  <div class="logo">Аліна Коваль</div>
  <nav>
    <a href="#about">Про мене</a>
    <a href="#skills">Навички</a>
    <a href="#works">Роботи</a>
    <a href="#contact">Контакти</a>
  </nav>
</header>

<main>
  <section id="hero">
    <h1>Привіт, я Аліна! 👋</h1>
    <p>Юний веб-розробник · Люблю CSS і JavaScript</p>
    <div class="hero-btns">
      <a href="#works" class="btn-primary">Мої роботи</a>
      <a href="#contact" class="btn-outline">Написати мені</a>
    </div>
  </section>

  <section id="about">
    <h2>Про мене</h2>
    <div class="about-grid">
      <img src="https://picsum.photos/seed/avatar1/200/200" alt="Моє фото">
      <div>
        <p>Привіт! Мене звати Аліна, мені 10 років. Я навчаюся у 4-А класі і захоплююся програмуванням вже рік.</p>
        <p>У вільний час роблю сайти і малюю.</p>
      </div>
    </div>
  </section>

  <section id="skills">
    <h2>Мої навички</h2>
    <div class="skills-list">
      <span>HTML</span><span>CSS</span><span>Flexbox</span>
      <span>Grid</span><span>JavaScript</span><span>Git</span>
    </div>
  </section>

  <section id="works">
    <h2>Мої роботи</h2>
    <div class="works-grid">
      <article class="work-card">
        <h3>Сайт про природу</h3>
        <p>Мій перший HTML-сайт про тварин і рослини.</p>
      </article>
      <article class="work-card">
        <h3>Калькулятор</h3>
        <p>Простий калькулятор на JavaScript.</p>
      </article>
      <article class="work-card">
        <h3>Фотогалерея</h3>
        <p>Галерея на CSS Grid з hover-ефектами.</p>
      </article>
    </div>
  </section>

  <article id="testimonial">
    <blockquote>
      «Аліна дуже швидко навчається! За три місяці вона вже може самостійно верстати сторінки.»
      <cite>— Олег Петрович, вчитель інформатики</cite>
    </blockquote>
  </article>

  <section id="contact">
    <h2>Написати мені</h2>
    <form>
      <input type="text" placeholder="Твоє ім'я">
      <input type="email" placeholder="Твій email">
      <textarea placeholder="Повідомлення"></textarea>
      <button type="submit">Надіслати</button>
    </form>
  </section>
</main>

<footer id="footer">
  <p>© 2025 Аліна Коваль · Зроблено з ❤️</p>
  <div class="footer-links">
    <a href="#">GitHub</a>
    <a href="#">Instagram</a>
    <a href="#">Telegram</a>
  </div>
</footer>`,
    `${BASE_CSS}
/* Мінімальний стиль — просто щоб можна було читати */
body { padding: 20px; max-width: 800px; margin: 0 auto; }
header { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid var(--clr-border); margin-bottom: 20px; }
nav a { margin-left: 16px; color: var(--clr-muted); font-size: 14px; }
section, article { padding: 24px 0; border-bottom: 1px solid var(--clr-border); }
h1 { font-size: 28px; margin-bottom: 8px; }
h2 { font-size: 20px; margin-bottom: 16px; color: var(--clr-muted); }
.about-grid { display: flex; gap: 20px; align-items: center; }
.about-grid img { width: 100px; height: 100px; object-fit: cover; border-radius: 50%; }
.skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
.skills-list span { background: var(--clr-surface); padding: 6px 14px; border-radius: 20px; font-size: 13px; }
.works-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
.work-card { background: var(--clr-surface); padding: 16px; border-radius: 8px; }
.work-card h3 { font-size: 15px; margin-bottom: 6px; }
.work-card p { font-size: 13px; color: var(--clr-muted); }
blockquote { border-left: 4px solid var(--clr-accent); padding-left: 16px; font-style: italic; }
cite { display: block; margin-top: 8px; font-size: 13px; color: var(--clr-muted); font-style: normal; }
form { display: flex; flex-direction: column; gap: 10px; max-width: 400px; }
form input, form textarea { background: var(--clr-surface); border: 1px solid var(--clr-border); color: var(--clr-text); padding: 10px; border-radius: 6px; font-size: 14px; }
form textarea { height: 80px; resize: vertical; }
form button { background: var(--clr-accent); color: #fff; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-size: 15px; }
footer { display: flex; justify-content: space-between; padding: 20px 0; color: var(--clr-muted); font-size: 13px; }
.footer-links a { margin-left: 16px; }`,
    [
      { level: 'easy',   uk: 'Заміни «Аліна Коваль» на своє ім\'я в усіх місцях де воно є.',                                     ru: 'Замени «Алина Коваль» на своё имя везде, где оно есть.' },
      { level: 'medium', uk: 'Додай четверту .work-card «Анімована сторінка» з описом.',                                         ru: 'Добавь четвёртую .work-card «Анимированная страница» с описанием.' },
      { level: 'hard',   uk: 'Додай нову секцію &lt;section id="services"&gt; між #skills і #works з переліком того, що ти вмієш робити.', ru: 'Добавь новую секцию &lt;section id="services"&gt; между #skills и #works с перечнем того, что ты умеешь делать.' },
    ]
  );

  /* ─── 07-03 ─────────────────────────────────────────────── */
  patch('07-03',
    {
      uk: `<h2>Шапка з логотипом та навігацією (Flexbox)</h2>
<p>Шапка — перше, що бачить відвідувач. Вона має бути на <strong>всіх сторінках</strong>, завжди залишатись нагорі (position: sticky) і чітко показувати, де знаходиться людина.</p>
<h3>Анатомія шапки</h3>
<ul>
  <li><code>.logo</code> — ім'я або логотип ліворуч.</li>
  <li><code>nav</code> — посилання по центру або праворуч.</li>
  <li>Кнопка дії (CTA) — праворуч (не обов'язково).</li>
</ul>
<pre>.header {
  display: flex;
  justify-content: space-between; /* логотип ← → навігація */
  align-items: center;
  position: sticky; /* залишається зверху при прокрутці */
  top: 0;
  backdrop-filter: blur(12px); /* матове скло */
  z-index: 100;
}</pre>
<h3>Активне посилання</h3>
<p>Щоб показати на якій сторінці ти знаходишся — додають клас <code>active</code> до відповідного посилання.</p>`,
      ru: `<h2>Шапка с логотипом и навигацией (Flexbox)</h2>
<p>Шапка — первое, что видит посетитель. Она должна быть на <strong>всех страницах</strong>, всегда оставаться наверху (position: sticky) и чётко показывать, где находится человек.</p>
<h3>Анатомия шапки</h3>
<ul>
  <li><code>.logo</code> — имя или логотип слева.</li>
  <li><code>nav</code> — ссылки по центру или справа.</li>
  <li>Кнопка действия (CTA) — справа (необязательно).</li>
</ul>
<pre>.header {
  display: flex;
  justify-content: space-between; /* логотип ← → навигация */
  align-items: center;
  position: sticky; /* остаётся вверху при прокрутке */
  top: 0;
  backdrop-filter: blur(12px); /* матовое стекло */
  z-index: 100;
}</pre>
<h3>Активная ссылка</h3>
<p>Чтобы показать на какой странице ты находишься — добавляют класс <code>active</code> к соответствующей ссылке.</p>`
    },
    `<header class="header">
  <div class="logo">
    <span class="logo-icon">✨</span>
    Аліна Коваль
  </div>
  <nav class="nav">
    <a href="#about" class="nav-link active">Про мене</a>
    <a href="#skills" class="nav-link">Навички</a>
    <a href="#works" class="nav-link">Роботи</a>
    <a href="#contact" class="nav-link">Контакти</a>
  </nav>
  <a href="#contact" class="header-cta">Написати 💬</a>
</header>

<!-- Решта сторінки (заглушка) -->
<main style="padding: 40px; text-align: center; color: #64748b;">
  <p>↑ Шапка готова! Прокрути вниз — вона залишатиметься нагорі.</p>
  <div style="height: 200vh; display: flex; align-items: center; justify-content: center; font-size: 14px;">
    (Тут буде решта сторінки)
  </div>
</main>`,
    `${BASE_CSS}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  position: sticky;
  top: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--clr-border);
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--clr-text);
}
.logo-icon { font-size: 20px; }

.nav {
  display: flex;
  gap: 6px;
}
.nav-link {
  color: var(--clr-muted);
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: color .2s, background .2s;
}
.nav-link:hover {
  color: var(--clr-text);
  background: var(--clr-surface);
  text-decoration: none;
}
.nav-link.active {
  color: var(--clr-accent);
  background: rgba(5,150,105,.12);
}

.header-cta {
  background: var(--clr-accent);
  color: #fff;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  transition: opacity .2s;
}
.header-cta:hover { opacity: .85; text-decoration: none; }`,
    [
      { level: 'easy',   uk: 'Зміни «Аліна Коваль» і іконку ✨ на своє ім\'я та улюблений emoji.',                               ru: 'Измени «Алина Коваль» и иконку ✨ на своё имя и любимый emoji.' },
      { level: 'medium', uk: 'Зроби так, щоб .nav-link «Роботи» мав клас active (переміщуй клас між посиланнями).',              ru: 'Сделай так, чтобы .nav-link «Роботи» имел класс active (перемещай класс между ссылками).' },
      { level: 'hard',   uk: 'Змін кольорову тему шапки: зроби --clr-accent фіолетовим (#7c3aed) і перевір, чи оновилось все правильно.',  ru: 'Измени цветовую тему шапки: сделай --clr-accent фиолетовым (#7c3aed) и проверь, обновилось ли всё правильно.' },
    ]
  );

  /* ─── 07-04 ─────────────────────────────────────────────── */
  patch('07-04',
    {
      uk: `<h2>Hero-секція: великий заголовок і кнопка</h2>
<p>Hero — перша велика секція, яку бачать відвідувачі. Вона задає «настрій» всього сайту. Завдання hero — за 3 секунди пояснити, хто ти і що робиш.</p>
<h3>Складники хорошого hero</h3>
<ul>
  <li><strong>Великий заголовок</strong> — хто ти (ім'я і роль).</li>
  <li><strong>Підзаголовок</strong> — що ти пропонуєш або що любиш.</li>
  <li><strong>CTA-кнопки</strong> — куди піти далі (наприклад «Мої роботи»).</li>
  <li><strong>Аватар або ілюстрація</strong> — людяний елемент.</li>
</ul>
<h3>Технічно</h3>
<pre>.hero {
  min-height: 100vh;       /* на весь екран */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Градієнтний фон */
background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);</pre>`,
      ru: `<h2>Hero-секция: большой заголовок и кнопка</h2>
<p>Hero — первая большая секция, которую видят посетители. Она задаёт «настроение» всего сайта. Задача hero — за 3 секунды объяснить, кто ты и что делаешь.</p>
<h3>Составляющие хорошего hero</h3>
<ul>
  <li><strong>Большой заголовок</strong> — кто ты (имя и роль).</li>
  <li><strong>Подзаголовок</strong> — что ты предлагаешь или что любишь.</li>
  <li><strong>CTA-кнопки</strong> — куда идти дальше (например «Мои работы»).</li>
  <li><strong>Аватар или иллюстрация</strong> — человеческий элемент.</li>
</ul>
<h3>Технически</h3>
<pre>.hero {
  min-height: 100vh;       /* на весь экран */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Градиентный фон */
background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);</pre>`
    },
    `<header class="header">
  <div class="logo">✨ Аліна Коваль</div>
  <nav class="nav">
    <a href="#" class="nav-link active">Про мене</a>
    <a href="#" class="nav-link">Навички</a>
    <a href="#" class="nav-link">Роботи</a>
    <a href="#" class="nav-link">Контакти</a>
  </nav>
</header>

<section class="hero">
  <div class="hero-inner">
    <img class="hero-avatar" src="https://picsum.photos/seed/girl42/200/200" alt="Аліна">
    <div class="hero-badge">👩‍💻 Юний веб-розробник</div>
    <h1 class="hero-title">Привіт, я <span class="accent">Аліна!</span></h1>
    <p class="hero-sub">Я роблю красиві сайти і обожнюю CSS-анімації</p>
    <div class="hero-btns">
      <a href="#works" class="btn-primary">Переглянути роботи →</a>
      <a href="#contact" class="btn-outline">Написати мені</a>
    </div>
    <div class="hero-scroll">↓ прокрути вниз</div>
  </div>
</section>`,
    `${BASE_CSS}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px;
  position: sticky; top: 0; z-index: 100;
  background: rgba(15,23,42,.85); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--clr-border);
}
.logo { font-size: 17px; font-weight: 700; color: var(--clr-text); }
.nav { display: flex; gap: 4px; }
.nav-link { color: var(--clr-muted); padding: 7px 14px; border-radius: 8px; font-size: 14px; transition: color .2s, background .2s; }
.nav-link:hover, .nav-link.active { color: var(--clr-accent); background: rgba(5,150,105,.1); text-decoration: none; }

/* Hero */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(ellipse at 50% 30%, #1e3a5f 0%, #0f172a 70%);
  padding: 60px 24px;
}
.hero-inner { max-width: 640px; }

.hero-avatar {
  width: 120px; height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--clr-accent);
  margin-bottom: 20px;
  box-shadow: 0 0 0 8px rgba(5,150,105,.15);
}

.hero-badge {
  display: inline-block;
  background: rgba(5,150,105,.15);
  border: 1px solid rgba(5,150,105,.4);
  color: var(--clr-accent);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 52px;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 16px;
}
.accent { color: var(--clr-accent); }

.hero-sub {
  font-size: 17px;
  color: var(--clr-muted);
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  background: var(--clr-accent); color: #fff;
  padding: 13px 28px; border-radius: 10px;
  font-size: 15px; font-weight: 600;
  transition: opacity .2s, transform .2s;
}
.btn-primary:hover { opacity: .88; transform: translateY(-2px); text-decoration: none; }

.btn-outline {
  border: 2px solid var(--clr-border); color: var(--clr-text);
  padding: 11px 28px; border-radius: 10px;
  font-size: 15px; font-weight: 600;
  transition: border-color .2s, background .2s;
}
.btn-outline:hover { border-color: var(--clr-accent2); background: rgba(59,130,246,.1); text-decoration: none; }

.hero-scroll { margin-top: 48px; color: var(--clr-muted); font-size: 13px; animation: bounce 2s ease infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }`,
    [
      { level: 'easy',   uk: 'Заміни фото-аватар: зміни seed у URL picsum на будь-яке слово.',                                    ru: 'Замени фото-аватар: измени seed в URL picsum на любое слово.' },
      { level: 'medium', uk: 'Зміни колір --clr-accent на #7c3aed (фіолетовий) і перевір, як змінились кнопки, аватар і текст.', ru: 'Измени цвет --clr-accent на #7c3aed (фиолетовый) и проверь, как изменились кнопки, аватар и текст.' },
      { level: 'hard',   uk: 'Додай анімацію появи до .hero-inner: slideUp 0.8s ease-out both. Додай @keyframes slideUp (from translateY(40px) opacity 0).',  ru: 'Добавь анимацию появления к .hero-inner: slideUp 0.8s ease-out both. Добавь @keyframes slideUp (from translateY(40px) opacity 0).' },
    ]
  );

  /* ─── 07-05 ─────────────────────────────────────────────── */
  patch('07-05',
    {
      uk: `<h2>Секція «Про мене»: фото + текст у Flex</h2>
<p>Секція «Про мене» робить сайт особистим — відвідувач бачить, хто стоїть за сайтом. Класична верстка: фото ліворуч, текст праворуч у Flex-рядку.</p>
<pre>.about-grid {
  display: flex;
  gap: 40px;
  align-items: center;
}
.about-photo { flex-shrink: 0; width: 260px; }
.about-text  { flex: 1; }</pre>
<h3>Ефект «скошеного» фото</h3>
<p>Замість звичайного прямокутника можна зробити цікавий контейнер для фото:</p>
<pre>.photo-wrap {
  position: relative;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  overflow: hidden;
}</pre>
<h3>Факти у рядку</h3>
<p>Невеликі «лічильники» з фактами про тебе (вік, років кодинг, проектів) у flex-рядку додають динаміку.</p>`,
      ru: `<h2>Секция «Обо мне»: фото + текст в Flex</h2>
<p>Секция «Обо мне» делает сайт личным — посетитель видит, кто стоит за сайтом. Классическая вёрстка: фото слева, текст справа в Flex-строке.</p>
<pre>.about-grid {
  display: flex;
  gap: 40px;
  align-items: center;
}
.about-photo { flex-shrink: 0; width: 260px; }
.about-text  { flex: 1; }</pre>
<h3>Эффект «скошенного» фото</h3>
<p>Вместо обычного прямоугольника можно сделать интересный контейнер для фото:</p>
<pre>.photo-wrap {
  position: relative;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  overflow: hidden;
}</pre>
<h3>Факты в строке</h3>
<p>Небольшие «счётчики» с фактами о тебе (возраст, лет кодинг, проектов) в flex-строке добавляют динамику.</p>`
    },
    `<section class="about section-pad">
  <div class="section-inner">
    <h2 class="section-title">Про мене <span class="accent">👤</span></h2>

    <div class="about-grid">
      <div class="about-photo">
        <div class="photo-wrap">
          <img src="https://picsum.photos/seed/student7/400/480" alt="Моє фото">
        </div>
      </div>

      <div class="about-text">
        <h3>Привіт! Я Аліна 👋</h3>
        <p>Мені 10 років, я навчаюся у школі і вже рік займаюся веб-розробкою. Почала з простих HTML-сторінок, а тепер роблю справжні сайти з CSS-анімаціями та JavaScript.</p>
        <p>Найбільше мені подобається CSS — там можна зробити стільки красивого навіть без коду!</p>

        <div class="about-facts">
          <div class="fact">
            <div class="fact-num">10</div>
            <div class="fact-label">років</div>
          </div>
          <div class="fact">
            <div class="fact-num">1</div>
            <div class="fact-label">рік кодингу</div>
          </div>
          <div class="fact">
            <div class="fact-num">5</div>
            <div class="fact-label">проектів</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    `${BASE_CSS}
.section-pad { padding: 80px 0; }
.section-inner { max-width: 900px; margin: 0 auto; padding: 0 24px; }
.section-title { font-size: 28px; font-weight: 800; margin-bottom: 40px; }
.accent { color: var(--clr-accent); }

.about-grid {
  display: flex;
  gap: 48px;
  align-items: center;
}

.about-photo { flex-shrink: 0; width: 260px; }
.photo-wrap {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  overflow: hidden;
  border: 4px solid var(--clr-accent);
  box-shadow: 8px 8px 0 var(--clr-surface), 16px 16px 0 rgba(5,150,105,.2);
}
.photo-wrap img { width: 100%; display: block; }

.about-text { flex: 1; }
.about-text h3 { font-size: 22px; margin-bottom: 14px; }
.about-text p  { color: var(--clr-muted); line-height: 1.7; margin-bottom: 14px; }

.about-facts {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}
.fact {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 12px;
  padding: 16px 22px;
  text-align: center;
}
.fact-num   { font-size: 30px; font-weight: 900; color: var(--clr-accent); }
.fact-label { font-size: 12px; color: var(--clr-muted); margin-top: 4px; }`,
    [
      { level: 'easy',   uk: 'Заміни текст «Про мене» на власний опис — вік, хобі, що подобається в кодингу.',                   ru: 'Замени текст «Обо мне» на собственное описание — возраст, хобби, что нравится в кодинге.' },
      { level: 'medium', uk: 'Зміни цифри у .fact на свої реальні дані і додай четвертий .fact «Зірок на GitHub».',               ru: 'Измени цифры в .fact на свои реальные данные и добавь четвёртый .fact «Звёзд на GitHub».' },
      { level: 'hard',   uk: 'Зміни border-radius у .photo-wrap: спробуй 50% (коло), потім 20% (м\'яко), потім поверни оригінальний нерівний.',  ru: 'Измени border-radius у .photo-wrap: попробуй 50% (круг), потом 20% (мягко), потом верни оригинальный неровный.' },
    ]
  );

  /* ─── 07-06 ─────────────────────────────────────────────── */
  patch('07-06',
    {
      uk: `<h2>Навички: бейджики та прогрес-бари</h2>
<p>Секція «Навички» показує що ти вмієш. Є два популярних способи показати навички:</p>
<h3>1. Бейджики-теги</h3>
<p>Кольорові таблички з назвами технологій. Прості та не брехуть про рівень:</p>
<pre>.tag { background: rgba(59,130,246,.15); border: 1px solid #3b82f6; padding: 6px 14px; border-radius: 20px; }</pre>
<h3>2. Прогрес-бари</h3>
<p>Показують рівень, але будь обережний — 95% у JavaScript виглядатиме неправдоподібно. Краще чесне 60%:</p>
<pre>.bar-fill {
  height: 8px;
  background: var(--clr-accent);
  border-radius: 4px;
  width: 75%; /* відсоток рівня */
  transition: width 1s ease;
}</pre>
<h3>Групування по категоріях</h3>
<p>Можна розбити навички на категорії: Frontend / Backend / Інструменти — це виглядає структурованіше.</p>`,
      ru: `<h2>Навыки: бейджики и прогресс-бары</h2>
<p>Секция «Навыки» показывает что ты умеешь. Есть два популярных способа показать навыки:</p>
<h3>1. Бейджики-теги</h3>
<p>Цветные таблички с названиями технологий. Простые и не врут об уровне:</p>
<pre>.tag { background: rgba(59,130,246,.15); border: 1px solid #3b82f6; padding: 6px 14px; border-radius: 20px; }</pre>
<h3>2. Прогресс-бары</h3>
<p>Показывают уровень, но будь осторожен — 95% в JavaScript выглядит неправдоподобно. Лучше честные 60%:</p>
<pre>.bar-fill {
  height: 8px;
  background: var(--clr-accent);
  border-radius: 4px;
  width: 75%; /* процент уровня */
  transition: width 1s ease;
}</pre>
<h3>Группировка по категориям</h3>
<p>Можно разбить навыки на категории: Frontend / Backend / Инструменты — это выглядит структурированнее.</p>`
    },
    `<section class="skills section-pad">
  <div class="section-inner">
    <h2 class="section-title">Мої навички <span class="accent">🛠</span></h2>

    <div class="skills-layout">

      <div class="skill-group">
        <h3>Frontend</h3>
        <div class="tags">
          <span class="tag tag-html">HTML5</span>
          <span class="tag tag-css">CSS3</span>
          <span class="tag tag-flex">Flexbox</span>
          <span class="tag tag-grid">Grid</span>
          <span class="tag tag-anim">Анімації</span>
        </div>
      </div>

      <div class="skill-group">
        <h3>Скрипти</h3>
        <div class="tags">
          <span class="tag tag-js">JavaScript</span>
          <span class="tag tag-dom">DOM API</span>
        </div>
      </div>

      <div class="skill-group">
        <h3>Інструменти</h3>
        <div class="tags">
          <span class="tag tag-git">Git</span>
          <span class="tag tag-vsc">VS Code</span>
          <span class="tag tag-fig">Figma</span>
        </div>
      </div>

    </div>

    <div class="progress-section">
      <h3>Рівень знань</h3>
      <div class="prog-list">
        <div class="prog-item">
          <div class="prog-head"><span>HTML / CSS</span><span class="prog-pct">85%</span></div>
          <div class="prog-bar"><div class="prog-fill" style="width:85%"></div></div>
        </div>
        <div class="prog-item">
          <div class="prog-head"><span>Flexbox / Grid</span><span class="prog-pct">70%</span></div>
          <div class="prog-bar"><div class="prog-fill pf-blue" style="width:70%"></div></div>
        </div>
        <div class="prog-item">
          <div class="prog-head"><span>JavaScript</span><span class="prog-pct">45%</span></div>
          <div class="prog-bar"><div class="prog-fill pf-purple" style="width:45%"></div></div>
        </div>
        <div class="prog-item">
          <div class="prog-head"><span>Git</span><span class="prog-pct">40%</span></div>
          <div class="prog-bar"><div class="prog-fill pf-orange" style="width:40%"></div></div>
        </div>
      </div>
    </div>
  </div>
</section>`,
    `${BASE_CSS}
.section-pad { padding: 80px 0; }
.section-inner { max-width: 900px; margin: 0 auto; padding: 0 24px; }
.section-title { font-size: 28px; font-weight: 800; margin-bottom: 40px; }
.accent { color: var(--clr-accent); }

.skills-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: 48px;
}
.skill-group { min-width: 200px; }
.skill-group h3 { font-size: 13px; color: var(--clr-muted); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 12px; }

.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid;
}
.tag-html { background: rgba(239,68,68,.1);   border-color: #ef4444; color: #ef4444; }
.tag-css  { background: rgba(59,130,246,.1);  border-color: #3b82f6; color: #3b82f6; }
.tag-flex { background: rgba(5,150,105,.1);   border-color: #059669; color: #059669; }
.tag-grid { background: rgba(124,58,237,.1);  border-color: #7c3aed; color: #7c3aed; }
.tag-anim { background: rgba(236,72,153,.1);  border-color: #ec4899; color: #ec4899; }
.tag-js   { background: rgba(245,158,11,.1);  border-color: #f59e0b; color: #f59e0b; }
.tag-dom  { background: rgba(14,165,233,.1);  border-color: #0ea5e9; color: #0ea5e9; }
.tag-git  { background: rgba(239,68,68,.1);   border-color: #ef4444; color: #ef4444; }
.tag-vsc  { background: rgba(59,130,246,.1);  border-color: #3b82f6; color: #3b82f6; }
.tag-fig  { background: rgba(124,58,237,.1);  border-color: #7c3aed; color: #7c3aed; }

.progress-section { border-top: 1px solid var(--clr-border); padding-top: 32px; }
.progress-section h3 { font-size: 16px; margin-bottom: 20px; }
.prog-list { display: flex; flex-direction: column; gap: 16px; }
.prog-head { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px; }
.prog-pct { color: var(--clr-accent); font-weight: 700; }
.prog-bar { background: var(--clr-surface); border-radius: 4px; height: 8px; overflow: hidden; }
.prog-fill { height: 100%; background: var(--clr-accent); border-radius: 4px; }
.pf-blue   { background: var(--clr-accent2); }
.pf-purple { background: #7c3aed; }
.pf-orange { background: #f59e0b; }`,
    [
      { level: 'easy',   uk: 'Зміни відсотки в progress-барах на свої реальні рівні (чесно!).',                                  ru: 'Измени проценты в progress-барах на свои реальные уровни (честно!).' },
      { level: 'medium', uk: 'Додай четверту групу «Дизайн» з тегами: .tag-ps «Photoshop» та .tag-canva «Canva» із власними кольорами.', ru: 'Добавь четвёртую группу «Дизайн» с тегами: .tag-ps «Photoshop» и .tag-canva «Canva» с собственными цветами.' },
      { level: 'hard',   uk: 'Зроби .prog-fill анімованим: @keyframes growBar від width:0% до width:var(--w), де --w задається inline стилем.',  ru: 'Сделай .prog-fill анимированным: @keyframes growBar от width:0% до width:var(--w), где --w задаётся inline стилем.' },
    ]
  );

  /* ─── 07-07 ─────────────────────────────────────────────── */
  patch('07-07',
    {
      uk: `<h2>Секція «Мої роботи»: картки у Grid</h2>
<p>Секція з проектами — найважливіша частина портфоліо. Відвідувач хоче побачити, що ти реально зробив, а не просто прочитати про це.</p>
<h3>Структура картки проекту</h3>
<ul>
  <li>Скріншот або зображення проекту (picsum / своє фото).</li>
  <li>Назва і короткий опис.</li>
  <li>Теги технологій.</li>
  <li>Посилання «Переглянути» і «GitHub».</li>
</ul>
<pre>.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.work-card {
  display: flex;
  flex-direction: column;
  background: var(--clr-surface);
  border-radius: 16px;
  overflow: hidden; /* щоб зображення не виступало за кути */
}</pre>`,
      ru: `<h2>Секция «Мои работы»: карточки в Grid</h2>
<p>Секция с проектами — важнейшая часть портфолио. Посетитель хочет увидеть, что ты реально сделал, а не просто прочитать об этом.</p>
<h3>Структура карточки проекта</h3>
<ul>
  <li>Скриншот или изображение проекта (picsum / своё фото).</li>
  <li>Название и краткое описание.</li>
  <li>Теги технологий.</li>
  <li>Ссылки «Просмотреть» и «GitHub».</li>
</ul>
<pre>.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.work-card {
  display: flex;
  flex-direction: column;
  background: var(--clr-surface);
  border-radius: 16px;
  overflow: hidden;
}</pre>`
    },
    `<section class="works section-pad">
  <div class="section-inner">
    <h2 class="section-title">Мої роботи <span class="accent">💼</span></h2>

    <div class="works-grid">

      <article class="work-card">
        <div class="card-img">
          <img src="https://picsum.photos/seed/nature99/600/340" alt="Проект природа">
          <div class="card-tags">
            <span class="ctag">HTML</span>
            <span class="ctag">CSS</span>
          </div>
        </div>
        <div class="card-body">
          <h3>Сайт про природу</h3>
          <p>Мій перший HTML-сайт. Розповідь про тварин і рослини України.</p>
          <div class="card-links">
            <a href="#" class="card-link-view">Переглянути →</a>
            <a href="#" class="card-link-gh">GitHub</a>
          </div>
        </div>
      </article>

      <article class="work-card">
        <div class="card-img">
          <img src="https://picsum.photos/seed/calc42/600/340" alt="Калькулятор">
          <div class="card-tags">
            <span class="ctag ctag-js">JS</span>
            <span class="ctag">CSS</span>
          </div>
        </div>
        <div class="card-body">
          <h3>Калькулятор</h3>
          <p>Простий калькулятор на JavaScript з анімованими кнопками.</p>
          <div class="card-links">
            <a href="#" class="card-link-view">Переглянути →</a>
            <a href="#" class="card-link-gh">GitHub</a>
          </div>
        </div>
      </article>

      <article class="work-card">
        <div class="card-img">
          <img src="https://picsum.photos/seed/gallery88/600/340" alt="Галерея">
          <div class="card-tags">
            <span class="ctag ctag-grid">Grid</span>
            <span class="ctag">CSS</span>
          </div>
        </div>
        <div class="card-body">
          <h3>Фотогалерея</h3>
          <p>Pinterest-стиль галерея на CSS Grid з overlay при наведенні.</p>
          <div class="card-links">
            <a href="#" class="card-link-view">Переглянути →</a>
            <a href="#" class="card-link-gh">GitHub</a>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>`,
    `${BASE_CSS}
.section-pad { padding: 80px 0; }
.section-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; }
.section-title { font-size: 28px; font-weight: 800; margin-bottom: 40px; }
.accent { color: var(--clr-accent); }

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.work-card {
  display: flex;
  flex-direction: column;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 16px;
  overflow: hidden;
  transition: transform .25s ease, box-shadow .25s ease;
}

.card-img { position: relative; }
.card-img img { width: 100%; height: 200px; object-fit: cover; display: block; border-radius: 0; }

.card-tags {
  position: absolute;
  top: 10px; left: 10px;
  display: flex; gap: 6px;
}
.ctag {
  background: rgba(15,23,42,.8);
  color: var(--clr-accent);
  font-size: 11px; font-weight: 700;
  padding: 3px 10px; border-radius: 20px;
  border: 1px solid var(--clr-accent);
  backdrop-filter: blur(4px);
}
.ctag-js   { color: #f59e0b; border-color: #f59e0b; }
.ctag-grid { color: #7c3aed; border-color: #7c3aed; }

.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}
.card-body h3 { font-size: 17px; margin-bottom: 8px; }
.card-body p  { color: var(--clr-muted); font-size: 14px; line-height: 1.5; flex: 1; margin: 0; }

.card-links {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  align-items: center;
}
.card-link-view {
  background: var(--clr-accent); color: #fff;
  padding: 8px 16px; border-radius: 8px;
  font-size: 13px; font-weight: 600;
  transition: opacity .2s;
}
.card-link-view:hover { opacity: .85; text-decoration: none; }
.card-link-gh {
  color: var(--clr-muted); font-size: 13px;
  border: 1px solid var(--clr-border);
  padding: 7px 14px; border-radius: 8px;
  transition: color .2s, border-color .2s;
}
.card-link-gh:hover { color: var(--clr-text); border-color: var(--clr-accent2); text-decoration: none; }`,
    [
      { level: 'easy',   uk: 'Заміни seed у URL зображень (nature99 → moretrees, calc42 → myapp) — отримай нові фото.',            ru: 'Замени seed в URL изображений (nature99 → moretrees, calc42 → myapp) — получи новые фото.' },
      { level: 'medium', uk: 'Додай четверту картку з власним проектом (реальним або вигаданим).',                                 ru: 'Добавь четвёртую карточку с собственным проектом (реальным или вымышленным).' },
      { level: 'hard',   uk: 'Зроби першу картку «вибраним» — додай клас .featured, grid-column: span 2 і більшу висоту зображення (280px).', ru: 'Сделай первую карточку «избранной» — добавь класс .featured, grid-column: span 2 и большую высоту изображения (280px).' },
    ]
  );

  /* ─── 07-08 ─────────────────────────────────────────────── */
  patch('07-08',
    {
      uk: `<h2>Картки з ефектом при наведенні</h2>
<p>В попередньому уроці ми зробили картки, але вони «мертві» — не реагують на мишку. Час оживити їх!</p>
<h3>Базовий підйом при hover</h3>
<pre>.work-card {
  transition: transform .25s ease, box-shadow .25s ease;
}
.work-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,.3);
}</pre>
<h3>Overlay на зображенні</h3>
<p>Ефект накладки з посиланням, яке з'являється при наведенні на зображення:</p>
<pre>.card-img { position: relative; overflow: hidden; }
.img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5,150,105,.8);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity .3s;
}
.card-img:hover .img-overlay { opacity: 1; }</pre>`,
      ru: `<h2>Карточки с эффектом при наведении</h2>
<p>В предыдущем уроке мы сделали карточки, но они «мёртвые» — не реагируют на мышку. Время оживить их!</p>
<h3>Базовый подъём при hover</h3>
<pre>.work-card {
  transition: transform .25s ease, box-shadow .25s ease;
}
.work-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,.3);
}</pre>
<h3>Overlay на изображении</h3>
<p>Эффект наложения со ссылкой, которая появляется при наведении на изображение:</p>
<pre>.card-img { position: relative; overflow: hidden; }
.img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5,150,105,.8);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity .3s;
}
.card-img:hover .img-overlay { opacity: 1; }</pre>`
    },
    `<div class="works-grid">

  <article class="work-card">
    <div class="card-img">
      <img src="https://picsum.photos/seed/nature99/600/340" alt="Природа">
      <div class="img-overlay">
        <a href="#" class="overlay-link">Переглянути →</a>
      </div>
      <div class="card-tags"><span class="ctag">HTML</span><span class="ctag">CSS</span></div>
    </div>
    <div class="card-body">
      <h3>Сайт про природу</h3>
      <p>Мій перший HTML-сайт про тварин і рослини України.</p>
      <div class="card-links">
        <a href="#" class="card-link-view">Переглянути →</a>
        <a href="#" class="card-link-gh">GitHub</a>
      </div>
    </div>
  </article>

  <article class="work-card">
    <div class="card-img">
      <img src="https://picsum.photos/seed/calc42/600/340" alt="Калькулятор">
      <div class="img-overlay">
        <a href="#" class="overlay-link">Переглянути →</a>
      </div>
      <div class="card-tags"><span class="ctag ctag-js">JS</span></div>
    </div>
    <div class="card-body">
      <h3>Калькулятор</h3>
      <p>Простий калькулятор на JavaScript з анімованими кнопками.</p>
      <div class="card-links">
        <a href="#" class="card-link-view">Переглянути →</a>
        <a href="#" class="card-link-gh">GitHub</a>
      </div>
    </div>
  </article>

  <article class="work-card">
    <div class="card-img">
      <img src="https://picsum.photos/seed/gallery88/600/340" alt="Галерея">
      <div class="img-overlay">
        <a href="#" class="overlay-link">Переглянути →</a>
      </div>
      <div class="card-tags"><span class="ctag ctag-grid">Grid</span></div>
    </div>
    <div class="card-body">
      <h3>Фотогалерея</h3>
      <p>Pinterest-стиль галерея на CSS Grid.</p>
      <div class="card-links">
        <a href="#" class="card-link-view">Переглянути →</a>
        <a href="#" class="card-link-gh">GitHub</a>
      </div>
    </div>
  </article>

</div>`,
    `${BASE_CSS}
body { padding: 20px; }
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
.work-card {
  display: flex; flex-direction: column;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 16px; overflow: hidden;
  transition: transform .25s ease, box-shadow .25s ease;
}
.work-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px rgba(0,0,0,.35);
}

.card-img { position: relative; overflow: hidden; }
.card-img img { width: 100%; height: 200px; object-fit: cover; display: block; transition: transform .4s ease; }
.work-card:hover .card-img img { transform: scale(1.06); }

.img-overlay {
  position: absolute; inset: 0;
  background: rgba(5,150,105,.85);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity .3s ease;
}
.work-card:hover .img-overlay { opacity: 1; }
.overlay-link {
  color: #fff; font-size: 15px; font-weight: 700;
  border: 2px solid #fff; padding: 10px 22px; border-radius: 8px;
  transition: background .2s;
}
.overlay-link:hover { background: rgba(255,255,255,.2); text-decoration: none; }

.card-tags { position: absolute; top: 10px; left: 10px; display: flex; gap: 6px; }
.ctag { background: rgba(15,23,42,.8); color: var(--clr-accent); font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; border: 1px solid var(--clr-accent); }
.ctag-js { color: #f59e0b; border-color: #f59e0b; }
.ctag-grid { color: #7c3aed; border-color: #7c3aed; }

.card-body { display: flex; flex-direction: column; flex: 1; padding: 20px; }
.card-body h3 { font-size: 17px; margin-bottom: 8px; }
.card-body p  { color: var(--clr-muted); font-size: 14px; line-height: 1.5; flex: 1; margin: 0; }
.card-links { display: flex; gap: 12px; margin-top: 16px; align-items: center; }
.card-link-view { background: var(--clr-accent); color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; }
.card-link-view:hover { opacity: .85; text-decoration: none; }
.card-link-gh { color: var(--clr-muted); font-size: 13px; border: 1px solid var(--clr-border); padding: 7px 14px; border-radius: 8px; }
.card-link-gh:hover { color: var(--clr-text); border-color: var(--clr-accent2); text-decoration: none; }`,
    [
      { level: 'easy',   uk: 'Наведи мишку на кожну картку і переконайся, що overlay і підйом працюють.',                        ru: 'Наведи мышку на каждую карточку и убедись, что overlay и подъём работают.' },
      { level: 'medium', uk: 'Зміни .img-overlay: background: rgba(124,58,237,.85) — overlay стане фіолетовим.',                  ru: 'Измени .img-overlay: background: rgba(124,58,237,.85) — overlay станет фиолетовым.' },
      { level: 'hard',   uk: 'Зміни ефект при hover на .work-card: замість translateY зроби rotate(-2deg) scale(1.03) — картка «нахиляється».', ru: 'Измени эффект при hover на .work-card: вместо translateY сделай rotate(-2deg) scale(1.03) — карточка «наклоняется».' },
    ]
  );

  /* ─── 07-09 ─────────────────────────────────────────────── */
  patch('07-09',
    {
      uk: `<h2>Блок цитати або відгуку</h2>
<p>Відгук або мотиваційна цитата підвищують довіру до автора сайту. Для портфоліо — це може бути відгук від вчителя, батьків або просто твоя улюблена цитата про програмування.</p>
<h3>HTML тег blockquote</h3>
<p><code>&lt;blockquote&gt;</code> — семантичний тег для цитат. Всередині — текст цитати і <code>&lt;cite&gt;</code> з іменем автора.</p>
<pre>&lt;blockquote&gt;
  «Кожен може навчитись програмувати.»
  &lt;cite&gt;— Стів Джобс&lt;/cite&gt;
&lt;/blockquote&gt;</pre>
<h3>Кілька відгуків (слайдер-вигляд)</h3>
<p>Можна зробити ряд відгуків у Flex або Grid і додати прокрутку через overflow-x: auto.</p>
<pre>.quotes-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto; /* горизонтальна прокрутка на мобільному */
}</pre>`,
      ru: `<h2>Блок цитаты или отзыва</h2>
<p>Отзыв или мотивационная цитата повышают доверие к автору сайта. Для портфолио — это может быть отзыв от учителя, родителей или просто твоя любимая цитата о программировании.</p>
<h3>HTML тег blockquote</h3>
<p><code>&lt;blockquote&gt;</code> — семантический тег для цитат. Внутри — текст цитаты и <code>&lt;cite&gt;</code> с именем автора.</p>
<pre>&lt;blockquote&gt;
  «Каждый может научиться программировать.»
  &lt;cite&gt;— Стив Джобс&lt;/cite&gt;
&lt;/blockquote&gt;</pre>
<h3>Несколько отзывов (вид слайдера)</h3>
<p>Можно сделать ряд отзывов в Flex или Grid и добавить прокрутку через overflow-x: auto.</p>
<pre>.quotes-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
}</pre>`
    },
    `<section class="testimonials section-pad">
  <div class="section-inner">
    <h2 class="section-title">Що кажуть про мене <span class="accent">💬</span></h2>

    <div class="quotes-grid">

      <article class="quote-card">
        <div class="quote-mark">❝</div>
        <blockquote>
          Аліна вражає своєю самостійністю. За 3 місяці вона вже може розробляти повноцінні веб-сторінки — це дуже вражає для її віку!
        </blockquote>
        <footer class="quote-footer">
          <img class="q-avatar" src="https://picsum.photos/seed/teacher1/60/60" alt="Олег Петрович">
          <div>
            <div class="q-name">Олег Петрович</div>
            <div class="q-role">Вчитель інформатики</div>
          </div>
        </footer>
      </article>

      <article class="quote-card quote-featured">
        <div class="quote-mark">❝</div>
        <blockquote>
          Моя донька почала робити сайти з нуля і вже опублікувала перший проект в Інтернеті! Ми дуже пишаємося нею.
        </blockquote>
        <footer class="quote-footer">
          <img class="q-avatar" src="https://picsum.photos/seed/mom5/60/60" alt="Тетяна">
          <div>
            <div class="q-name">Тетяна</div>
            <div class="q-role">Мама Аліни</div>
          </div>
        </footer>
      </article>

      <article class="quote-card">
        <div class="quote-mark">❝</div>
        <blockquote>
          Без CSS ти не веб-розробник — ти просто HTML-тегоукладач.
        </blockquote>
        <footer class="quote-footer">
          <div class="q-emoji">✨</div>
          <div>
            <div class="q-name">Аліна Коваль</div>
            <div class="q-role">Улюблена цитата</div>
          </div>
        </footer>
      </article>

    </div>
  </div>
</section>`,
    `${BASE_CSS}
.section-pad { padding: 80px 0; }
.section-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; }
.section-title { font-size: 28px; font-weight: 800; margin-bottom: 40px; }
.accent { color: var(--clr-accent); }

.quotes-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
}
.quotes-grid::-webkit-scrollbar { height: 4px; }
.quotes-grid::-webkit-scrollbar-thumb { background: var(--clr-border); border-radius: 2px; }

.quote-card {
  flex: 0 0 320px;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color .2s;
}
.quote-card:hover { border-color: var(--clr-accent); }

.quote-featured {
  border-color: var(--clr-accent);
  background: rgba(5,150,105,.07);
}

.quote-mark {
  font-size: 40px;
  color: var(--clr-accent);
  line-height: 1;
  opacity: .7;
}

blockquote {
  font-size: 15px;
  color: var(--clr-muted);
  line-height: 1.7;
  font-style: italic;
  flex: 1;
}

.quote-footer {
  display: flex;
  align-items: center;
  gap: 12px;
}
.q-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--clr-accent); }
.q-emoji  { width: 44px; height: 44px; border-radius: 50%; background: var(--clr-accent); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.q-name   { font-size: 14px; font-weight: 700; }
.q-role   { font-size: 12px; color: var(--clr-muted); margin-top: 2px; }`,
    [
      { level: 'easy',   uk: 'Заміни цитати і імена на власні — наприклад, відгук від друга або улюблена цитата про технології.', ru: 'Замени цитаты и имена на свои — например, отзыв от друга или любимая цитата о технологиях.' },
      { level: 'medium', uk: 'Додай четверту картку .quote-card з відгуком від однокласника або брата/сестри.',                   ru: 'Добавь четвёртую карточку .quote-card с отзывом от одноклассника или брата/сестры.' },
      { level: 'hard',   uk: 'Зроби горизонтальний скрол «засіченим»: додай scroll-snap-type: x mandatory до .quotes-grid і scroll-snap-align: start до .quote-card.',  ru: 'Сделай горизонтальный скролл «засечённым»: добавь scroll-snap-type: x mandatory к .quotes-grid и scroll-snap-align: start к .quote-card.' },
    ]
  );

  /* ─── 07-10 ─────────────────────────────────────────────── */
  patch('07-10',
    {
      uk: `<h2>Форма зворотного зв'язку зі стилями</h2>
<p>Форма — єдиний спосіб для відвідувача зв'язатися з тобою прямо зі сторінки. Навіть якщо форма поки не відправляє листи — вона виглядає професійно.</p>
<h3>Добра форма</h3>
<ul>
  <li>Кожне поле має <code>&lt;label&gt;</code> зверху — для зрозумілості.</li>
  <li>Поля достатньо великі і зручні для кліку.</li>
  <li>Кнопка чітко показує що станеться.</li>
  <li>Стан :focus — колір рамки змінюється, щоб показати активне поле.</li>
</ul>
<pre>input:focus, textarea:focus {
  outline: none;
  border-color: var(--clr-accent);
  box-shadow: 0 0 0 3px rgba(5,150,105,.2);
}</pre>`,
      ru: `<h2>Форма обратной связи со стилями</h2>
<p>Форма — единственный способ для посетителя связаться с тобой прямо со страницы. Даже если форма пока не отправляет письма — она выглядит профессионально.</p>
<h3>Хорошая форма</h3>
<ul>
  <li>У каждого поля есть <code>&lt;label&gt;</code> сверху — для понятности.</li>
  <li>Поля достаточно большие и удобные для клика.</li>
  <li>Кнопка чётко показывает что произойдёт.</li>
  <li>Состояние :focus — цвет рамки меняется, чтобы показать активное поле.</li>
</ul>
<pre>input:focus, textarea:focus {
  outline: none;
  border-color: var(--clr-accent);
  box-shadow: 0 0 0 3px rgba(5,150,105,.2);
}</pre>`
    },
    `<section class="contact section-pad">
  <div class="section-inner">
    <h2 class="section-title">Написати мені <span class="accent">📬</span></h2>

    <div class="contact-layout">

      <div class="contact-info">
        <h3>Зв'яжись зі мною</h3>
        <p>Маєш питання про мої роботи або хочеш разом поробити якийсь проект? Пиши!</p>

        <div class="contact-items">
          <div class="contact-item">
            <span class="ci-icon">📧</span>
            <div>
              <div class="ci-label">Email</div>
              <div class="ci-val">alina@example.com</div>
            </div>
          </div>
          <div class="contact-item">
            <span class="ci-icon">💬</span>
            <div>
              <div class="ci-label">Telegram</div>
              <div class="ci-val">@alina_codes</div>
            </div>
          </div>
          <div class="contact-item">
            <span class="ci-icon">🐙</span>
            <div>
              <div class="ci-label">GitHub</div>
              <div class="ci-val">github.com/alina</div>
            </div>
          </div>
        </div>
      </div>

      <form class="contact-form" onsubmit="return false;">
        <div class="form-group">
          <label for="name">Твоє ім'я</label>
          <input type="text" id="name" placeholder="Іванко Петренко">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="example@gmail.com">
        </div>
        <div class="form-group">
          <label for="subject">Тема</label>
          <input type="text" id="subject" placeholder="Хочу дізнатись про...">
        </div>
        <div class="form-group">
          <label for="message">Повідомлення</label>
          <textarea id="message" rows="5" placeholder="Пишіть..."></textarea>
        </div>
        <button type="submit" class="submit-btn">
          Надіслати повідомлення ✉️
        </button>
      </form>

    </div>
  </div>
</section>`,
    `${BASE_CSS}
.section-pad { padding: 80px 0; }
.section-inner { max-width: 960px; margin: 0 auto; padding: 0 24px; }
.section-title { font-size: 28px; font-weight: 800; margin-bottom: 40px; }
.accent { color: var(--clr-accent); }

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 48px;
  align-items: start;
}

.contact-info h3 { font-size: 18px; margin-bottom: 12px; }
.contact-info p  { color: var(--clr-muted); font-size: 14px; line-height: 1.7; margin-bottom: 28px; }

.contact-items { display: flex; flex-direction: column; gap: 16px; }
.contact-item {
  display: flex; align-items: center; gap: 14px;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 12px; padding: 14px;
}
.ci-icon { font-size: 24px; flex-shrink: 0; }
.ci-label { font-size: 11px; color: var(--clr-muted); text-transform: uppercase; letter-spacing: .06em; }
.ci-val   { font-size: 14px; font-weight: 600; margin-top: 2px; }

.contact-form { background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 16px; padding: 32px; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.form-group label { font-size: 13px; font-weight: 600; color: var(--clr-muted); }
.form-group input,
.form-group textarea {
  background: var(--clr-bg);
  border: 1px solid var(--clr-border);
  color: var(--clr-text);
  padding: 11px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color .2s, box-shadow .2s;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--clr-accent);
  box-shadow: 0 0 0 3px rgba(5,150,105,.2);
}
.form-group input::placeholder,
.form-group textarea::placeholder { color: #475569; }

.submit-btn {
  width: 100%;
  background: var(--clr-accent);
  color: #fff;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: opacity .2s, transform .2s;
}
.submit-btn:hover { opacity: .88; transform: translateY(-2px); }`,
    [
      { level: 'easy',   uk: 'Заміни email, Telegram і GitHub в .contact-items на свої власні дані.',                             ru: 'Замени email, Telegram и GitHub в .contact-items на свои собственные данные.' },
      { level: 'medium', uk: 'Додай четвертий .contact-item з іконкою 📸 і Instagram-нікнеймом.',                                 ru: 'Добавь четвёртый .contact-item с иконкой 📸 и Instagram-ником.' },
      { level: 'hard',   uk: 'Зміни --clr-accent на #3b82f6 і перевір як змінились focus-стани полів та кнопка надсилання.',     ru: 'Измени --clr-accent на #3b82f6 и проверь как изменились focus-состояния полей и кнопка отправки.' },
    ]
  );

  /* ─── 07-11 ─────────────────────────────────────────────── */
  patch('07-11',
    {
      uk: `<h2>Футер із посиланнями</h2>
<p>Footer (підвал) — остання секція сторінки. Там зазвичай розміщують:</p>
<ul>
  <li>Copyright рядок (© 2025 Аліна Коваль).</li>
  <li>Посилання на соціальні мережі або GitHub.</li>
  <li>Навігацію (повторення шапки).</li>
  <li>Інколи — цікавий слоган або кнопку «Нагору».</li>
</ul>
<h3>Кнопка «Прокрутити нагору»</h3>
<pre>&lt;a href="#" class="back-top"&gt;↑ Нагору&lt;/a&gt;

.back-top {
  position: fixed;
  bottom: 24px; right: 24px;
  background: var(--clr-accent);
  color: #fff;
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}</pre>`,
      ru: `<h2>Футер со ссылками</h2>
<p>Footer (подвал) — последняя секция страницы. Там обычно размещают:</p>
<ul>
  <li>Copyright строку (© 2025 Алина Коваль).</li>
  <li>Ссылки на социальные сети или GitHub.</li>
  <li>Навигацию (повторение шапки).</li>
  <li>Иногда — интересный слоган или кнопку «Наверх».</li>
</ul>
<h3>Кнопка «Прокрутить наверх»</h3>
<pre>&lt;a href="#" class="back-top"&gt;↑ Наверх&lt;/a&gt;

.back-top {
  position: fixed;
  bottom: 24px; right: 24px;
  background: var(--clr-accent);
  color: #fff;
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}</pre>`
    },
    `<a href="#" class="back-top" title="Нагору">↑</a>

<footer class="footer">
  <div class="footer-inner">

    <div class="footer-brand">
      <div class="footer-logo">✨ Аліна Коваль</div>
      <p class="footer-tagline">Роблю сайти, які дивують.</p>
      <div class="social-links">
        <a href="#" class="social-link" aria-label="GitHub">🐙</a>
        <a href="#" class="social-link" aria-label="Telegram">💬</a>
        <a href="#" class="social-link" aria-label="Instagram">📸</a>
      </div>
    </div>

    <div class="footer-nav">
      <h4>Навігація</h4>
      <ul>
        <li><a href="#about">Про мене</a></li>
        <li><a href="#skills">Навички</a></li>
        <li><a href="#works">Роботи</a></li>
        <li><a href="#contact">Контакти</a></li>
      </ul>
    </div>

    <div class="footer-nav">
      <h4>Технології</h4>
      <ul>
        <li><a href="#">HTML / CSS</a></li>
        <li><a href="#">Flexbox / Grid</a></li>
        <li><a href="#">JavaScript</a></li>
        <li><a href="#">CSS Анімації</a></li>
      </ul>
    </div>

  </div>

  <div class="footer-bottom">
    <p>© 2025 Аліна Коваль · Зроблено з ❤️ та CSS</p>
    <p class="footer-sub">Розроблено у рамках Веб-Академії</p>
  </div>
</footer>`,
    `${BASE_CSS}
body { padding-bottom: 0; }

.back-top {
  position: fixed;
  bottom: 24px; right: 24px;
  width: 44px; height: 44px;
  background: var(--clr-accent);
  color: #fff; font-size: 18px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(5,150,105,.4);
  transition: transform .2s, opacity .2s;
  z-index: 50;
}
.back-top:hover { transform: translateY(-3px); opacity: .9; }

.footer {
  background: var(--clr-surface);
  border-top: 1px solid var(--clr-border);
}

.footer-inner {
  max-width: 960px; margin: 0 auto;
  padding: 48px 24px 32px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 40px;
}

.footer-logo { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
.footer-tagline { color: var(--clr-muted); font-size: 14px; margin-bottom: 20px; }
.social-links { display: flex; gap: 10px; }
.social-link {
  width: 38px; height: 38px; border-radius: 10px;
  background: var(--clr-bg); border: 1px solid var(--clr-border);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; text-decoration: none;
  transition: border-color .2s, background .2s;
}
.social-link:hover { border-color: var(--clr-accent); background: rgba(5,150,105,.1); }

.footer-nav h4 { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--clr-muted); margin-bottom: 16px; }
.footer-nav ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.footer-nav a  { color: var(--clr-muted); font-size: 14px; transition: color .2s; }
.footer-nav a:hover { color: var(--clr-accent); text-decoration: none; }

.footer-bottom {
  border-top: 1px solid var(--clr-border);
  padding: 20px 24px;
  max-width: 960px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-bottom p { font-size: 13px; color: var(--clr-muted); }
.footer-sub { font-size: 12px; }`,
    [
      { level: 'easy',   uk: 'Заміни «Аліна Коваль» на своє ім\'я і слоган на власний.',                                         ru: 'Замени «Алина Коваль» на своё имя и слоган на собственный.' },
      { level: 'medium', uk: 'Додай четверте посилання в .social-links: .social-link з іконкою 🎥 (YouTube або TikTok).',        ru: 'Добавь четвёртую ссылку в .social-links: .social-link с иконкой 🎥 (YouTube или TikTok).' },
      { level: 'hard',   uk: 'Зроби .back-top анімованим: при прокрутці сторінки вниз він має з\'являтися (animation: fadeIn). Поки без JS — просто зроби його завжди видимим зі стилями.',  ru: 'Сделай .back-top анимированным: при прокрутке страницы вниз он должен появляться (animation: fadeIn). Пока без JS — просто сделай его всегда видимым со стилями.' },
    ]
  );

  /* ─── 07-12 ─────────────────────────────────────────────── */
  patch('07-12',
    {
      uk: `<h2>CSS-змінні: кольорова тема сайту</h2>
<p>Ми вже використовуємо CSS-змінні в нашому портфоліо. Тепер розберемо їх силу детальніше і зробимо легку зміну теми.</p>
<h3>Як змінити акцентний колір всього сайту</h3>
<p>Завдяки змінним — одна правка у :root змінює всі кнопки, підсвічення, посилання і акценти одночасно:</p>
<pre>:root {
  --clr-accent: #059669; /* зелений */
}
/* Змінити на фіолетовий: */
:root {
  --clr-accent: #7c3aed;
}</pre>
<h3>Темна і світла теми</h3>
<pre>:root { --clr-bg: #0f172a; --clr-text: #f8fafc; }

/* Світла тема */
[data-theme="light"] {
  --clr-bg: #f8fafc;
  --clr-text: #0f172a;
  --clr-surface: #fff;
  --clr-border: #e2e8f0;
  --clr-muted: #64748b;
}</pre>`,
      ru: `<h2>CSS-переменные: цветовая тема сайта</h2>
<p>Мы уже используем CSS-переменные в нашем портфолио. Теперь разберём их силу детальнее и сделаем лёгкую смену темы.</p>
<h3>Как изменить акцентный цвет всего сайта</h3>
<p>Благодаря переменным — одна правка в :root меняет все кнопки, подсветки, ссылки и акценты одновременно:</p>
<pre>:root {
  --clr-accent: #059669; /* зелёный */
}
/* Изменить на фиолетовый: */
:root {
  --clr-accent: #7c3aed;
}</pre>
<h3>Тёмная и светлая темы</h3>
<pre>:root { --clr-bg: #0f172a; --clr-text: #f8fafc; }

/* Светлая тема */
[data-theme="light"] {
  --clr-bg: #f8fafc;
  --clr-text: #0f172a;
  --clr-surface: #fff;
  --clr-border: #e2e8f0;
  --clr-muted: #64748b;
}</pre>`
    },
    `<div class="theme-demo">

  <h2>Спробуй теми:</h2>
  <div class="theme-btns">
    <button onclick="setTheme('dark')"   class="tbtn tbtn-dark">🌙 Темна</button>
    <button onclick="setTheme('light')"  class="tbtn tbtn-light">☀️ Світла</button>
    <button onclick="setAccent('green')" class="tbtn tbtn-green">🟢 Зелена</button>
    <button onclick="setAccent('blue')"  class="tbtn tbtn-blue">🔵 Синя</button>
    <button onclick="setAccent('purple')"class="tbtn tbtn-purple">🟣 Фіолетова</button>
    <button onclick="setAccent('pink')"  class="tbtn tbtn-pink">🩷 Рожева</button>
  </div>

  <div class="preview-cards">
    <div class="pc">
      <h3>Заголовок</h3>
      <p>Текст картки. Дивись як змінюється колір.</p>
      <button class="pc-btn">Кнопка CTA</button>
    </div>
    <div class="pc pc-featured">
      <h3>Акцентна картка</h3>
      <p>Ця картка використовує --clr-accent напряму.</p>
      <button class="pc-btn">Натисни мене</button>
    </div>
    <div class="pc">
      <h3>Навички</h3>
      <div class="tag-row">
        <span class="stag">HTML</span>
        <span class="stag">CSS</span>
        <span class="stag">JS</span>
      </div>
    </div>
  </div>

</div>

<script>
function setTheme(t){ document.documentElement.setAttribute('data-theme',t); }
function setAccent(c){
  const accents = {green:'#059669',blue:'#3b82f6',purple:'#7c3aed',pink:'#ec4899'};
  document.documentElement.style.setProperty('--clr-accent', accents[c]);
}
</script>`,
    `${BASE_CSS}
[data-theme="light"] {
  --clr-bg:      #f8fafc;
  --clr-surface: #fff;
  --clr-border:  #e2e8f0;
  --clr-text:    #0f172a;
  --clr-muted:   #64748b;
}

body { background: var(--clr-bg); color: var(--clr-text); padding: 24px; transition: background .3s, color .3s; }

h2 { font-size: 18px; margin-bottom: 16px; }

.theme-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
.tbtn {
  padding: 9px 18px; border-radius: 10px; border: none;
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: opacity .2s, transform .2s;
}
.tbtn:hover { opacity: .85; transform: translateY(-2px); }
.tbtn-dark   { background: #0f172a; color: #fff; border: 1px solid #334155; }
.tbtn-light  { background: #f8fafc; color: #0f172a; border: 1px solid #e2e8f0; }
.tbtn-green  { background: rgba(5,150,105,.2);  color: #059669; border: 1px solid #059669; }
.tbtn-blue   { background: rgba(59,130,246,.2); color: #3b82f6; border: 1px solid #3b82f6; }
.tbtn-purple { background: rgba(124,58,237,.2); color: #7c3aed; border: 1px solid #7c3aed; }
.tbtn-pink   { background: rgba(236,72,153,.2); color: #ec4899; border: 1px solid #ec4899; }

.preview-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.pc {
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 14px; padding: 20px;
  transition: background .3s, border-color .3s;
}
.pc-featured { border-color: var(--clr-accent); background: rgba(5,150,105,.06); }
.pc h3 { font-size: 15px; margin-bottom: 8px; color: var(--clr-text); }
.pc p  { font-size: 13px; color: var(--clr-muted); margin-bottom: 14px; }
.pc-btn {
  background: var(--clr-accent); color: #fff;
  border: none; padding: 8px 16px; border-radius: 8px;
  font-size: 13px; cursor: pointer; transition: background .3s;
}
.tag-row { display: flex; gap: 8px; margin-top: 12px; }
.stag {
  background: rgba(5,150,105,.12);
  border: 1px solid var(--clr-accent);
  color: var(--clr-accent);
  padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
  transition: background .3s, border-color .3s, color .3s;
}`,
    [
      { level: 'easy',   uk: 'Натисни всі кнопки тем і акцентів — поспостерігай як змінюється весь дизайн одночасно.',            ru: 'Нажми все кнопки тем и акцентов — понаблюдай как меняется весь дизайн одновременно.' },
      { level: 'medium', uk: 'Додай сьому кнопку .tbtn-orange з акцентом #f59e0b (помаранчевий).',                               ru: 'Добавь седьмую кнопку .tbtn-orange с акцентом #f59e0b (оранжевый).' },
      { level: 'hard',   uk: 'Додай CSS-змінну --clr-accent2 і використовуй її у .pc-featured замість --clr-accent. Зроби окрему кнопку яка змінює лише --clr-accent2.', ru: 'Добавь CSS-переменную --clr-accent2 и используй её в .pc-featured вместо --clr-accent. Сделай отдельную кнопку которая меняет только --clr-accent2.' },
    ]
  );

  /* ─── 07-13 ─────────────────────────────────────────────── */
  patch('07-13',
    {
      uk: `<h2>Адаптивна шапка для мобільного</h2>
<p>На мобільному телефоні шапка з усіма пунктами навігації займає забагато місця. Рішення — <strong>гамбургер-меню</strong>: на мобільному показуємо лише кнопку ☰, при кліку — розгортаємо меню.</p>
<h3>CSS-частина (без JS)</h3>
<pre>/* Ховаємо кнопку на десктопі */
.burger { display: none; }

@media (max-width: 768px) {
  .nav { display: none; }          /* ховаємо меню */
  .burger { display: block; }      /* показуємо кнопку */

  .nav.open { display: flex; flex-direction: column; }
}</pre>
<h3>JS-частина (toggle класу)</h3>
<pre>const burger = document.querySelector('.burger');
const nav    = document.querySelector('.nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});</pre>`,
      ru: `<h2>Адаптивная шапка для мобильного</h2>
<p>На мобильном телефоне шапка со всеми пунктами навигации занимает слишком много места. Решение — <strong>гамбургер-меню</strong>: на мобильном показываем только кнопку ☰, при клике — разворачиваем меню.</p>
<h3>CSS-часть (без JS)</h3>
<pre>/* Скрываем кнопку на десктопе */
.burger { display: none; }

@media (max-width: 768px) {
  .nav { display: none; }          /* скрываем меню */
  .burger { display: block; }      /* показываем кнопку */

  .nav.open { display: flex; flex-direction: column; }
}</pre>
<h3>JS-часть (toggle класса)</h3>
<pre>const burger = document.querySelector('.burger');
const nav    = document.querySelector('.nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});</pre>`
    },
    `<header class="header">
  <div class="logo">✨ Аліна Коваль</div>
  <nav class="nav" id="nav">
    <a href="#" class="nav-link active">Про мене</a>
    <a href="#" class="nav-link">Навички</a>
    <a href="#" class="nav-link">Роботи</a>
    <a href="#" class="nav-link">Контакти</a>
  </nav>
  <button class="burger" id="burger" aria-label="Меню">
    <span></span><span></span><span></span>
  </button>
</header>

<main style="padding: 32px; color: #94a3b8; font-size: 14px;">
  <p>🖥️ На широкому екрані: всі посилання видно.</p>
  <p>📱 Зменш вікно браузера до &lt;768px або натисни ☰ — з'явиться гамбургер-меню!</p>
</main>

<script>
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});
</script>`,
    `${BASE_CSS}
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px;
  position: sticky; top: 0; z-index: 100;
  background: rgba(15,23,42,.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--clr-border);
}
.logo { font-size: 17px; font-weight: 700; }
.nav { display: flex; gap: 4px; }
.nav-link {
  color: var(--clr-muted); padding: 7px 14px; border-radius: 8px;
  font-size: 14px; transition: color .2s, background .2s;
}
.nav-link:hover, .nav-link.active { color: var(--clr-accent); background: rgba(5,150,105,.1); text-decoration: none; }

/* ── Гамбургер ── */
.burger {
  display: none;
  flex-direction: column; justify-content: center;
  gap: 5px; width: 36px; height: 36px;
  background: none; border: none; cursor: pointer; padding: 4px;
}
.burger span {
  display: block; height: 2px;
  background: var(--clr-text); border-radius: 2px;
  transition: transform .3s, opacity .3s;
}
.burger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger.active span:nth-child(2) { opacity: 0; }
.burger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── Мобільна адаптація ── */
@media (max-width: 768px) {
  .header { padding: 14px 20px; }
  .nav { display: none; }
  .burger { display: flex; }

  .nav.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%; left: 0; right: 0;
    background: rgba(15,23,42,.98);
    border-bottom: 1px solid var(--clr-border);
    padding: 12px;
    gap: 4px;
  }
  .nav.open .nav-link { padding: 12px 16px; border-radius: 8px; }
}`,
    [
      { level: 'easy',   uk: 'Зменш вікно браузера нижче 768px і натисни ☰ — перевір що меню відкривається і закривається.',    ru: 'Уменьши окно браузера ниже 768px и нажми ☰ — проверь что меню открывается и закрывается.' },
      { level: 'medium', uk: 'Додай до .nav.open анімацію появи: slideDown 0.3s ease-out both.',                                  ru: 'Добавь к .nav.open анимацию появления: slideDown 0.3s ease-out both.' },
      { level: 'hard',   uk: 'Зроби так, щоб при відкриттому мобільному меню фон сторінки затемнявся: overlay div position:fixed opacity:0.5 background:#000.',  ru: 'Сделай так, чтобы при открытом мобильном меню фон страницы затемнялся: overlay div position:fixed opacity:0.5 background:#000.' },
    ]
  );

  /* ─── 07-14 ─────────────────────────────────────────────── */
  patch('07-14',
    {
      uk: `<h2>Перевірка якості: Lighthouse та HTML Validator</h2>
<p>Перед публікацією сайт треба перевірити — чи немає помилок і чи він швидко завантажується.</p>
<h3>HTML Validator (validator.w3.org)</h3>
<ul>
  <li>Вставляємо HTML-код і перевіряємо на помилки.</li>
  <li>Часті помилки: незакриті теги, неправильні атрибути, дублюючі id.</li>
  <li>Після виправлення — зелена позначка ✅</li>
</ul>
<h3>Chrome Lighthouse</h3>
<p>Відкрий DevTools (F12) → вкладка «Lighthouse» → «Analyze page load». Він перевіряє:</p>
<ul>
  <li><strong>Performance</strong> — наскільки швидко завантажується сторінка.</li>
  <li><strong>Accessibility</strong> — чи зручно для людей з обмеженими можливостями (alt у img, label у form).</li>
  <li><strong>Best Practices</strong> — чи немає застарілих практик.</li>
  <li><strong>SEO</strong> — чи знайде сайт Google.</li>
</ul>
<h3>Чек-лист портфоліо</h3>
<ul>
  <li>✅ Всі зображення мають alt-текст.</li>
  <li>✅ Всі поля форми мають &lt;label&gt;.</li>
  <li>✅ h1 — один на сторінці.</li>
  <li>✅ Шрифт читабельний (мін. 14px).</li>
  <li>✅ Кнопки достатньо великі для кліку (мін. 44px).</li>
</ul>`,
      ru: `<h2>Проверка качества: Lighthouse и HTML Validator</h2>
<p>Перед публикацией сайт нужно проверить — нет ли ошибок и быстро ли он загружается.</p>
<h3>HTML Validator (validator.w3.org)</h3>
<ul>
  <li>Вставляем HTML-код и проверяем на ошибки.</li>
  <li>Частые ошибки: незакрытые теги, неправильные атрибуты, дублирующие id.</li>
  <li>После исправления — зелёная отметка ✅</li>
</ul>
<h3>Chrome Lighthouse</h3>
<p>Открой DevTools (F12) → вкладка «Lighthouse» → «Analyze page load». Он проверяет:</p>
<ul>
  <li><strong>Performance</strong> — насколько быстро загружается страница.</li>
  <li><strong>Accessibility</strong> — удобно ли для людей с ограниченными возможностями (alt у img, label у form).</li>
  <li><strong>Best Practices</strong> — нет ли устаревших практик.</li>
  <li><strong>SEO</strong> — найдёт ли сайт Google.</li>
</ul>
<h3>Чек-лист портфолио</h3>
<ul>
  <li>✅ Все изображения имеют alt-текст.</li>
  <li>✅ Все поля формы имеют &lt;label&gt;.</li>
  <li>✅ h1 — один на странице.</li>
  <li>✅ Шрифт читаемый (мин. 14px).</li>
  <li>✅ Кнопки достаточно большие для клика (мин. 44px).</li>
</ul>`
    },
    `<div class="audit-page">
  <h1>Чек-лист портфоліо</h1>

  <div class="checklist">

    <div class="check-section">
      <h2>✅ HTML-якість</h2>
      <div class="checks">
        <label class="check-item"><input type="checkbox"> Всі теги закриті правильно</label>
        <label class="check-item"><input type="checkbox"> Є &lt;!DOCTYPE html&gt;</label>
        <label class="check-item"><input type="checkbox"> Є &lt;meta charset="UTF-8"&gt;</label>
        <label class="check-item"><input type="checkbox"> &lt;title&gt; заповнений</label>
        <label class="check-item"><input type="checkbox"> Тільки один &lt;h1&gt; на сторінці</label>
        <label class="check-item"><input type="checkbox"> Семантичні теги: header, main, footer, section</label>
      </div>
    </div>

    <div class="check-section">
      <h2>🖼 Доступність</h2>
      <div class="checks">
        <label class="check-item"><input type="checkbox"> Всі &lt;img&gt; мають alt=""</label>
        <label class="check-item"><input type="checkbox"> Всі поля форми мають &lt;label&gt;</label>
        <label class="check-item"><input type="checkbox"> Кнопки мають зрозумілий текст</label>
        <label class="check-item"><input type="checkbox"> Контраст тексту достатній</label>
      </div>
    </div>

    <div class="check-section">
      <h2>🎨 CSS-якість</h2>
      <div class="checks">
        <label class="check-item"><input type="checkbox"> Кольорова тема через CSS-змінні</label>
        <label class="check-item"><input type="checkbox"> Hover-ефекти на кнопках і картках</label>
        <label class="check-item"><input type="checkbox"> Шрифт ≥ 14px</label>
        <label class="check-item"><input type="checkbox"> Мінімальна адаптивність (шапка)</label>
      </div>
    </div>

    <div class="check-section">
      <h2>📱 Мобільний вигляд</h2>
      <div class="checks">
        <label class="check-item"><input type="checkbox"> &lt;meta name="viewport"&gt; є у head</label>
        <label class="check-item"><input type="checkbox"> Шапка адаптивна (гамбургер)</label>
        <label class="check-item"><input type="checkbox"> Картки переносяться на новий рядок</label>
      </div>
    </div>

  </div>

  <div class="score-box" id="score">Відмічай пункти →</div>
</div>

<script>
const checks = document.querySelectorAll('input[type=checkbox]');
const score = document.getElementById('score');
function updateScore(){
  const done = [...checks].filter(c=>c.checked).length;
  const total = checks.length;
  const pct = Math.round(done/total*100);
  score.textContent = \`Виконано: \${done}/\${total} (\${pct}%)\`;
  score.style.background = pct >= 80 ? '#059669' : pct >= 50 ? '#f59e0b' : '#dc2626';
}
checks.forEach(c => c.addEventListener('change', updateScore));
</script>`,
    `${BASE_CSS}
body { padding: 24px; max-width: 700px; margin: 0 auto; }
h1 { font-size: 24px; margin-bottom: 24px; }

.checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
.check-section { background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 14px; padding: 20px; }
.check-section h2 { font-size: 15px; margin-bottom: 14px; }
.checks { display: flex; flex-direction: column; gap: 10px; }
.check-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13px; color: var(--clr-muted); cursor: pointer;
  line-height: 1.4;
}
.check-item input { margin-top: 2px; accent-color: var(--clr-accent); width: 16px; height: 16px; flex-shrink: 0; }
.check-item:has(input:checked) { color: var(--clr-text); }

.score-box {
  background: var(--clr-surface);
  border-radius: 10px; padding: 16px 24px;
  font-size: 16px; font-weight: 700;
  text-align: center;
  transition: background .3s;
}`,
    [
      { level: 'easy',   uk: 'Відмічай пункти чек-листу і стеж за тим, як змінюється колір рядка результату.',                   ru: 'Отмечай пункты чек-листа и следи за тем, как меняется цвет строки результата.' },
      { level: 'medium', uk: 'Додай новий .check-section «🚀 Продуктивність» з 3-4 власними пунктами (наприклад, «Зображення оптимізовані», «Немає зайвих шрифтів»).', ru: 'Добавь новый .check-section «🚀 Продуктивность» с 3-4 собственными пунктами (например, «Изображения оптимизированы», «Нет лишних шрифтов»).' },
      { level: 'hard',   uk: 'Зроби кольори результату CSS-змінними: --score-good, --score-ok, --score-bad і застосовуй через JS style.setProperty.',  ru: 'Сделай цвета результата CSS-переменными: --score-good, --score-ok, --score-bad и применяй через JS style.setProperty.' },
    ]
  );

  /* ─── 07-15 (ФІНАЛ) ─────────────────────────────────────── */
  patch('07-15',
    {
      uk: `<h2>🏆 ФІНАЛ 1: Особистий сайт-портфоліо</h2>
<p>Вітаємо! Ти пройшов увесь шлях від wireframe до готового сайту. Цей урок — збірка всього, що ти зробив у модулі 7. Разом — це твоє справжнє онлайн-портфоліо.</p>
<h3>Що ти зробив:</h3>
<ul>
  <li>✅ Спланував сайт через wireframe</li>
  <li>✅ Написав семантичний HTML-скелет</li>
  <li>✅ Шапка з логотипом, навігацією і sticky position</li>
  <li>✅ Hero-секція з аватаром, заголовком і кнопками</li>
  <li>✅ Секція «Про мене» з фото у flex</li>
  <li>✅ Навички: теги і прогрес-бари</li>
  <li>✅ Картки проектів у Grid з hover-ефектами і overlay</li>
  <li>✅ Блок відгуків/цитат</li>
  <li>✅ Форма зворотного зв'язку</li>
  <li>✅ Footer з посиланнями і кнопкою «нагору»</li>
  <li>✅ CSS-змінні для легкої зміни теми</li>
  <li>✅ Адаптивна шапка з гамбургер-меню</li>
</ul>
<h3>Наступні кроки</h3>
<p>Зберери всі секції разом в один файл. Зміни всі дані на свої справжні. Опублікуй на <strong>GitHub Pages</strong> — це безкоштовно! (Модуль 12, урок 15.)</p>`,
      ru: `<h2>🏆 ФИНАЛ 1: Личный сайт-портфолио</h2>
<p>Поздравляем! Ты прошёл весь путь от wireframe до готового сайта. Этот урок — сборка всего, что ты сделал в модуле 7. Вместе — это твоё настоящее онлайн-портфолио.</p>
<h3>Что ты сделал:</h3>
<ul>
  <li>✅ Спланировал сайт через wireframe</li>
  <li>✅ Написал семантический HTML-скелет</li>
  <li>✅ Шапка с логотипом, навигацией и sticky position</li>
  <li>✅ Hero-секция с аватаром, заголовком и кнопками</li>
  <li>✅ Секция «Обо мне» с фото во flex</li>
  <li>✅ Навыки: теги и прогресс-бары</li>
  <li>✅ Карточки проектов в Grid с hover-эффектами и overlay</li>
  <li>✅ Блок отзывов/цитат</li>
  <li>✅ Форма обратной связи</li>
  <li>✅ Footer со ссылками и кнопкой «наверх»</li>
  <li>✅ CSS-переменные для лёгкой смены темы</li>
  <li>✅ Адаптивная шапка с гамбургер-меню</li>
</ul>
<h3>Следующие шаги</h3>
<p>Собери все секции вместе в один файл. Замени все данные на свои настоящие. Опубликуй на <strong>GitHub Pages</strong> — это бесплатно! (Модуль 12, урок 15.)</p>`
    },
    `<!-- ╔══════════════════════════════════════╗
     ║  ФІНАЛЬНЕ ПОРТФОЛІО — всі секції    ║
     ╚══════════════════════════════════════╝ -->

<a href="#" class="back-top">↑</a>

<header class="header" id="top">
  <div class="logo">✨ Аліна Коваль</div>
  <nav class="nav" id="nav">
    <a href="#about"   class="nav-link">Про мене</a>
    <a href="#skills"  class="nav-link">Навички</a>
    <a href="#works"   class="nav-link">Роботи</a>
    <a href="#contact" class="nav-link">Контакти</a>
  </nav>
  <button class="burger" id="burger"><span></span><span></span><span></span></button>
</header>

<section class="hero" id="hero">
  <div class="hero-inner">
    <img class="hero-avatar" src="https://picsum.photos/seed/girl42/200/200" alt="Аліна">
    <div class="hero-badge">👩‍💻 Юний веб-розробник</div>
    <h1 class="hero-title">Привіт, я <span class="accent">Аліна!</span></h1>
    <p class="hero-sub">Я роблю красиві сайти і обожнюю CSS-анімації</p>
    <div class="hero-btns">
      <a href="#works" class="btn-primary">Переглянути роботи →</a>
      <a href="#contact" class="btn-outline">Написати мені</a>
    </div>
  </div>
</section>

<section class="about section-pad" id="about">
  <div class="section-inner">
    <h2 class="section-title">Про мене <span class="accent">👤</span></h2>
    <div class="about-grid">
      <div class="about-photo"><div class="photo-wrap"><img src="https://picsum.photos/seed/student7/400/480" alt="Фото"></div></div>
      <div class="about-text">
        <h3>Привіт! Я Аліна 👋</h3>
        <p>Мені 10 років. Я вже рік займаюся веб-розробкою і зробила 5 проектів.</p>
        <div class="about-facts">
          <div class="fact"><div class="fact-num">10</div><div class="fact-label">років</div></div>
          <div class="fact"><div class="fact-num">1</div><div class="fact-label">рік кодингу</div></div>
          <div class="fact"><div class="fact-num">5</div><div class="fact-label">проектів</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="skills section-pad" id="skills">
  <div class="section-inner">
    <h2 class="section-title">Навички <span class="accent">🛠</span></h2>
    <div class="tags-row">
      <span class="tag tag-html">HTML5</span>
      <span class="tag tag-css">CSS3</span>
      <span class="tag tag-flex">Flexbox</span>
      <span class="tag tag-grid">Grid</span>
      <span class="tag tag-anim">Анімації</span>
      <span class="tag tag-js">JavaScript</span>
      <span class="tag tag-git">Git</span>
    </div>
  </div>
</section>

<section class="works section-pad" id="works">
  <div class="section-inner">
    <h2 class="section-title">Мої роботи <span class="accent">💼</span></h2>
    <div class="works-grid">
      <article class="work-card">
        <div class="card-img"><img src="https://picsum.photos/seed/nature99/600/340" alt="Природа"><div class="img-overlay"><a href="#" class="overlay-link">Переглянути →</a></div></div>
        <div class="card-body"><h3>Сайт про природу</h3><p>HTML + CSS</p><a href="#" class="card-link-view">Переглянути</a></div>
      </article>
      <article class="work-card">
        <div class="card-img"><img src="https://picsum.photos/seed/calc42/600/340" alt="Calc"><div class="img-overlay"><a href="#" class="overlay-link">Переглянути →</a></div></div>
        <div class="card-body"><h3>Калькулятор</h3><p>JavaScript</p><a href="#" class="card-link-view">Переглянути</a></div>
      </article>
      <article class="work-card">
        <div class="card-img"><img src="https://picsum.photos/seed/gallery88/600/340" alt="Gallery"><div class="img-overlay"><a href="#" class="overlay-link">Переглянути →</a></div></div>
        <div class="card-body"><h3>Галерея</h3><p>CSS Grid</p><a href="#" class="card-link-view">Переглянути</a></div>
      </article>
    </div>
  </div>
</section>

<section class="contact section-pad" id="contact">
  <div class="section-inner">
    <h2 class="section-title">Контакти <span class="accent">📬</span></h2>
    <form class="mini-form" onsubmit="return false;">
      <input type="text" placeholder="Ім'я">
      <input type="email" placeholder="Email">
      <textarea rows="4" placeholder="Повідомлення"></textarea>
      <button type="submit" class="btn-primary">Надіслати ✉️</button>
    </form>
  </div>
</section>

<footer class="footer">
  <div class="footer-bottom">
    <span>© 2025 Аліна Коваль · Зроблено з ❤️</span>
    <div class="social-links">
      <a href="#" class="social-link">🐙</a>
      <a href="#" class="social-link">💬</a>
    </div>
  </div>
</footer>

<script>
document.getElementById('burger').addEventListener('click', function(){
  this.classList.toggle('active');
  document.getElementById('nav').classList.toggle('open');
});
</script>`,
    `${BASE_CSS}
/* ═══ Шапка ═══ */
.header { display:flex; align-items:center; justify-content:space-between; padding:14px 32px; position:sticky; top:0; z-index:100; background:rgba(15,23,42,.9); backdrop-filter:blur(12px); border-bottom:1px solid var(--clr-border); }
.logo { font-size:17px; font-weight:700; }
.nav { display:flex; gap:4px; }
.nav-link { color:var(--clr-muted); padding:7px 14px; border-radius:8px; font-size:14px; transition:.2s; }
.nav-link:hover { color:var(--clr-accent); background:rgba(5,150,105,.1); text-decoration:none; }
.burger { display:none; flex-direction:column; gap:5px; width:36px; height:36px; background:none; border:none; cursor:pointer; padding:4px; }
.burger span { display:block; height:2px; background:var(--clr-text); border-radius:2px; transition:.3s; }
.burger.active span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
.burger.active span:nth-child(2){ opacity:0; }
.burger.active span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
@media(max-width:768px){ .nav{display:none;} .burger{display:flex;} .nav.open{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(15,23,42,.98);border-bottom:1px solid var(--clr-border);padding:12px;gap:4px;} }

/* ═══ Hero ═══ */
.hero { min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; background:radial-gradient(ellipse at 50% 30%,#1e3a5f,#0f172a); padding:60px 24px; }
.hero-inner { max-width:600px; }
.hero-avatar { width:100px; height:100px; border-radius:50%; border:4px solid var(--clr-accent); object-fit:cover; margin-bottom:18px; }
.hero-badge { display:inline-block; background:rgba(5,150,105,.15); border:1px solid rgba(5,150,105,.4); color:var(--clr-accent); padding:6px 16px; border-radius:20px; font-size:13px; margin-bottom:16px; }
.hero-title { font-size:46px; font-weight:900; margin-bottom:12px; }
.accent { color:var(--clr-accent); }
.hero-sub { color:var(--clr-muted); font-size:16px; margin-bottom:28px; }
.hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.btn-primary { background:var(--clr-accent); color:#fff; padding:12px 26px; border-radius:10px; font-size:14px; font-weight:600; transition:.2s; }
.btn-primary:hover { opacity:.88; transform:translateY(-2px); text-decoration:none; }
.btn-outline { border:2px solid var(--clr-border); color:var(--clr-text); padding:10px 26px; border-radius:10px; font-size:14px; font-weight:600; transition:.2s; }
.btn-outline:hover { border-color:var(--clr-accent2); text-decoration:none; }

/* ═══ Загальні секції ═══ */
.section-pad { padding:64px 0; }
.section-inner { max-width:900px; margin:0 auto; padding:0 24px; }
.section-title { font-size:26px; font-weight:800; margin-bottom:32px; }

/* ═══ About ═══ */
.about-grid { display:flex; gap:40px; align-items:center; }
.about-photo { flex-shrink:0; width:220px; }
.photo-wrap { border-radius:30% 70% 70% 30%/30% 30% 70% 70%; overflow:hidden; border:4px solid var(--clr-accent); }
.photo-wrap img { width:100%; display:block; }
.about-text h3 { font-size:20px; margin-bottom:10px; }
.about-text p  { color:var(--clr-muted); font-size:14px; line-height:1.7; }
.about-facts { display:flex; gap:16px; margin-top:20px; }
.fact { background:var(--clr-surface); border:1px solid var(--clr-border); border-radius:12px; padding:14px 18px; text-align:center; }
.fact-num { font-size:26px; font-weight:900; color:var(--clr-accent); }
.fact-label { font-size:11px; color:var(--clr-muted); margin-top:2px; }

/* ═══ Skills ═══ */
.tags-row { display:flex; flex-wrap:wrap; gap:10px; }
.tag { padding:6px 14px; border-radius:20px; font-size:13px; font-weight:600; border:1px solid; }
.tag-html{background:rgba(239,68,68,.1); border-color:#ef4444; color:#ef4444;}
.tag-css {background:rgba(59,130,246,.1); border-color:#3b82f6; color:#3b82f6;}
.tag-flex{background:rgba(5,150,105,.1);  border-color:#059669; color:#059669;}
.tag-grid{background:rgba(124,58,237,.1); border-color:#7c3aed; color:#7c3aed;}
.tag-anim{background:rgba(236,72,153,.1); border-color:#ec4899; color:#ec4899;}
.tag-js  {background:rgba(245,158,11,.1); border-color:#f59e0b; color:#f59e0b;}
.tag-git {background:rgba(239,68,68,.1);  border-color:#ef4444; color:#ef4444;}

/* ═══ Works ═══ */
.works-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px; }
.work-card { display:flex; flex-direction:column; background:var(--clr-surface); border:1px solid var(--clr-border); border-radius:14px; overflow:hidden; transition:.25s; }
.work-card:hover { transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,.3); }
.card-img { position:relative; overflow:hidden; }
.card-img img { width:100%; height:180px; object-fit:cover; display:block; transition:transform .4s; }
.work-card:hover .card-img img { transform:scale(1.05); }
.img-overlay { position:absolute; inset:0; background:rgba(5,150,105,.85); display:flex; align-items:center; justify-content:center; opacity:0; transition:.3s; }
.work-card:hover .img-overlay { opacity:1; }
.overlay-link { color:#fff; font-weight:700; border:2px solid #fff; padding:8px 18px; border-radius:8px; font-size:14px; text-decoration:none; }
.card-body { padding:16px; display:flex; flex-direction:column; flex:1; }
.card-body h3 { font-size:16px; margin-bottom:6px; }
.card-body p  { color:var(--clr-muted); font-size:13px; flex:1; }
.card-link-view { display:inline-block; margin-top:12px; background:var(--clr-accent); color:#fff; padding:8px 16px; border-radius:8px; font-size:13px; font-weight:600; text-decoration:none; }

/* ═══ Contact ═══ */
.mini-form { max-width:480px; display:flex; flex-direction:column; gap:12px; }
.mini-form input, .mini-form textarea { background:var(--clr-surface); border:1px solid var(--clr-border); color:var(--clr-text); padding:11px 14px; border-radius:8px; font-size:14px; font-family:inherit; resize:vertical; transition:.2s; }
.mini-form input:focus, .mini-form textarea:focus { outline:none; border-color:var(--clr-accent); box-shadow:0 0 0 3px rgba(5,150,105,.2); }

/* ═══ Footer ═══ */
.footer { background:var(--clr-surface); border-top:1px solid var(--clr-border); }
.footer-bottom { max-width:900px; margin:0 auto; padding:20px 24px; display:flex; justify-content:space-between; align-items:center; font-size:13px; color:var(--clr-muted); }
.social-links { display:flex; gap:10px; }
.social-link { width:36px; height:36px; border-radius:8px; background:var(--clr-bg); border:1px solid var(--clr-border); display:flex; align-items:center; justify-content:center; font-size:17px; text-decoration:none; transition:.2s; }
.social-link:hover { border-color:var(--clr-accent); }

/* ═══ Back to top ═══ */
.back-top { position:fixed; bottom:24px; right:24px; width:42px; height:42px; background:var(--clr-accent); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; text-decoration:none; box-shadow:0 4px 14px rgba(5,150,105,.4); transition:.2s; z-index:50; }
.back-top:hover { transform:translateY(-3px); }`,
    [
      { level: 'easy',   uk: 'Заміни всі дані (ім\'я, фото, опис, проекти) на власні — зроби це СПРАВЖНЄ твоє портфоліо!',       ru: 'Замени все данные (имя, фото, описание, проекты) на свои — сделай это НАСТОЯЩЕЕ твоё портфолио!' },
      { level: 'medium', uk: 'Додай анімацію появи секцій: .hero-inner, .about-grid і .works-grid — slideUp 0.8s ease-out both.',  ru: 'Добавь анимацию появления секций: .hero-inner, .about-grid и .works-grid — slideUp 0.8s ease-out both.' },
      { level: 'hard',   uk: 'Зміни --clr-accent на свій улюблений колір і переконайся, що весь дизайн оновився гармонійно.',     ru: 'Измени --clr-accent на свой любимый цвет и убедись, что весь дизайн обновился гармонично.' },
      { level: 'extra',  uk: 'Додай темну/світлу кнопку в шапку: при кліку перемикає data-theme="light" / data-theme="dark" і оновлює CSS-змінні (як у уроці 07-12).', ru: 'Добавь кнопку тёмной/светлой темы в шапку: при клике переключает data-theme="light" / data-theme="dark" и обновляет CSS-переменные (как в уроке 07-12).' },
    ]
  );

})();
