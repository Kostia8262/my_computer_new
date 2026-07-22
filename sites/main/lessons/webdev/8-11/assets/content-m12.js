/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 12 — Фінальне Портфоліо · 8–11 Веб-Старт
   ═══════════════════════════════════════════════════════════ */
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
body{font-family:'Segoe UI',Arial,sans-serif;background:#030712;color:#f9fafb;padding:20px}
h2{font-size:20px;margin-bottom:14px}
h3{font-size:14px;color:#9ca3af;margin-bottom:8px}
button{background:#111827;border:1px solid #374151;color:#f9fafb;padding:9px 18px;border-radius:8px;cursor:pointer;font-size:14px;transition:.2s}
button:hover{border-color:#6366f1;color:#a5b4fc}
input,textarea{background:#030712;border:1px solid #1f2937;color:#f9fafb;padding:10px 14px;border-radius:8px;font-size:14px;font-family:inherit;width:100%;transition:.2s}
input:focus,textarea:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}`;

  /* ─── 12-01 ──────────────────────────────────────────────── */
  patch('12-01',
    { uk:`<h2>Що входить у фінальне портфоліо</h2>
<p>Портфоліо — це твоя «цифрова візитка» для роботодавців і замовників. Воно показує не тільки що ти вмієш, а й хто ти є.</p>
<h3>Обов'язкові секції</h3>
<ul>
  <li>👤 <strong>Header</strong> — ім'я, аватар, навігація</li>
  <li>🎯 <strong>Hero</strong> — короткий вступ, CTA-кнопки</li>
  <li>💡 <strong>Навички</strong> — технології, прогрес-бари</li>
  <li>🗂 <strong>Проекти</strong> — картки з посиланнями</li>
  <li>📧 <strong>Контакти</strong> — форма або посилання</li>
</ul>
<h3>Структура нашого фінального портфоліо</h3>
<pre>index.html
 ├── &lt;header&gt; — sticky nav
 ├── &lt;section id="hero"&gt;
 ├── &lt;section id="skills"&gt;
 ├── &lt;section id="projects"&gt;
 ├── &lt;section id="contact"&gt;
 └── &lt;footer&gt;</pre>
<h3>Чим добре портфоліо відрізняється від поганого</h3>
<ul>
  <li>✅ Адаптивне (мобайл + десктоп)</li>
  <li>✅ Швидке завантаження</li>
  <li>✅ Реальні проекти з посиланнями</li>
  <li>❌ Без помилок у консолі</li>
  <li>❌ Без lorem ipsum тексту</li>
</ul>`,
      ru:`<h2>Что входит в финальное портфолио</h2>
<h3>Обязательные секции</h3>
<ul>
  <li>👤 <strong>Header</strong> — имя, аватар, навигация</li>
  <li>🎯 <strong>Hero</strong> — краткое вступление, CTA-кнопки</li>
  <li>💡 <strong>Навыки</strong> — технологии, прогресс-бары</li>
  <li>🗂 <strong>Проекты</strong> — карточки со ссылками</li>
  <li>📧 <strong>Контакты</strong> — форма или ссылки</li>
</ul>
<pre>index.html
 ├── &lt;header&gt; — sticky nav
 ├── &lt;section id="hero"&gt;
 ├── &lt;section id="skills"&gt;
 ├── &lt;section id="projects"&gt;
 ├── &lt;section id="contact"&gt;
 └── &lt;footer&gt;</pre>` },
    `<div class="pf-overview">
  <h2>📋 Структура фінального портфоліо</h2>

  <div class="sections-map">
    <div class="sm-item" onclick="explain(this,'header')">
      <div class="sm-icon">🏠</div>
      <div class="sm-info"><b>Header</b><span>Sticky · 60px</span></div>
      <div class="sm-arrow">→</div>
    </div>
    <div class="sm-item" onclick="explain(this,'hero')">
      <div class="sm-icon">🎯</div>
      <div class="sm-info"><b>Hero</b><span>100vh · flex</span></div>
      <div class="sm-arrow">→</div>
    </div>
    <div class="sm-item" onclick="explain(this,'skills')">
      <div class="sm-icon">💡</div>
      <div class="sm-info"><b>Skills</b><span>Grid · auto-fill</span></div>
      <div class="sm-arrow">→</div>
    </div>
    <div class="sm-item" onclick="explain(this,'projects')">
      <div class="sm-icon">🗂</div>
      <div class="sm-info"><b>Projects</b><span>Grid 3 col</span></div>
      <div class="sm-arrow">→</div>
    </div>
    <div class="sm-item" onclick="explain(this,'contact')">
      <div class="sm-icon">📧</div>
      <div class="sm-info"><b>Contact</b><span>Flex · form</span></div>
      <div class="sm-arrow">→</div>
    </div>
    <div class="sm-item" onclick="explain(this,'footer')">
      <div class="sm-icon">📄</div>
      <div class="sm-info"><b>Footer</b><span>© рік</span></div>
      <div class="sm-arrow">→</div>
    </div>
  </div>

  <div class="sm-explain" id="sm-explain">← Клікни на секцію щоб дізнатись більше</div>

  <div class="checklist-mini">
    <h3>Мій план роботи:</h3>
    <label><input type="checkbox"> Зберу 3 найкращі проекти</label>
    <label><input type="checkbox"> Напишу короткий "Про себе"</label>
    <label><input type="checkbox"> Підготую список навичок</label>
    <label><input type="checkbox"> Зроблю скріншоти проектів</label>
    <label><input type="checkbox"> Опублікую на GitHub Pages</label>
  </div>
</div>`,
    `${BASE}
.pf-overview{max-width:500px}
.sections-map{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.sm-item{background:#111827;border:1px solid #1f2937;border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:.2s}
.sm-item:hover{border-color:#6366f1;background:rgba(99,102,241,.08)}
.sm-item.active{border-color:#6366f1;background:rgba(99,102,241,.12)}
.sm-icon{font-size:22px;flex-shrink:0}
.sm-info{flex:1}
.sm-info b{display:block;font-size:14px;margin-bottom:2px}
.sm-info span{font-size:11px;color:#6b7280;font-family:monospace}
.sm-arrow{color:#6366f1;font-size:18px}
.sm-explain{background:#111827;border:1px solid #374151;border-radius:10px;padding:14px;font-size:13px;color:#9ca3af;margin-bottom:16px;min-height:50px}
.checklist-mini{background:#111827;border:1px solid #1f2937;border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:8px}
.checklist-mini h3{color:#9ca3af;margin-bottom:4px}
.checklist-mini label{display:flex;align-items:center;gap:10px;font-size:14px;cursor:pointer;padding:4px 0}
.checklist-mini input[type=checkbox]{width:16px;height:16px;accent-color:#6366f1;cursor:pointer;flex-shrink:0;margin:0}`,
    `const EXPLAINS = {
  header:   '🏠 Header: sticky, висота 60px. Містить логотип/ім\'я, навігацію (flex), кнопку теми. position:sticky; top:0; z-index:100.',
  hero:     '🎯 Hero: займає весь екран (min-height:100vh). Flex або Grid. Текст зліва, аватар справа. Заголовок з анімацією.',
  skills:   '💡 Skills: решітка навичок через Grid auto-fill. Кожна картка — іконка + назва + прогрес-бар. Анімуємо при прокрутці.',
  projects: '🗂 Projects: 3 колонки на десктопі, 1 на мобайлі. Картка: зображення + назва + опис + кнопка. Hover-ефект overlay.',
  contact:  '📧 Contact: flex-row (інфо + форма). Поля: Ім\'я, Email, Повідомлення. preventDefault + JS-валідація.',
  footer:   '📄 Footer: текст по центру. © 2024 Ім\'я. Посилання на GitHub/LinkedIn. border-top для відділення.',
};

function explain(item, key) {
  document.querySelectorAll('.sm-item').forEach(i=>i.classList.remove('active'));
  item.classList.add('active');
  document.getElementById('sm-explain').textContent = EXPLAINS[key];
}`,
    [
      { level:'easy',   uk:'Клікни на кожну секцію і прочитай опис. Які CSS-техніки використовує Hero?',  ru:'Кликни на каждую секцию и прочитай описание. Какие CSS-техники использует Hero?' },
      { level:'medium', uk:'Відмічай пункти плану роботи по мірі виконання. Пройдись по модулю до кінця і заверши всі пункти.',  ru:'Отмечай пункты плана работы по мере выполнения.' },
      { level:'hard',   uk:'Додай секцію "Відгуки" до sections-map зі своїм поясненням у EXPLAINS.',  ru:'Добавь секцию "Отзывы" в sections-map со своим пояснением в EXPLAINS.' },
    ]
  );

  /* ─── 12-02 ──────────────────────────────────────────────── */
  patch('12-02',
    { uk:`<h2>Вибір і підготовка 3 кращих проектів</h2>
<p>Якість важливіша за кількість. Три сильних проекти кращі за десять слабких.</p>
<h3>Критерії відбору</h3>
<ul>
  <li>✅ Робочий код без явних помилок</li>
  <li>✅ Цікава ідея або реальна задача</li>
  <li>✅ Гарний вигляд (дизайн, кольори)</li>
  <li>✅ Адаптивність (телефон + десктоп)</li>
  <li>✅ Інтерактивність (JS-функції)</li>
</ul>
<h3>Що підготувати для кожного проекту</h3>
<pre>1. Назва і короткий опис (1-2 речення)
2. Список технологій: HTML, CSS Grid, JS, localStorage...
3. Посилання: GitHub + Live Demo
4. Скріншот або GIF-анімація
5. "Що я навчився": 1-2 пункти</pre>
<h3>Проекти з курсу на вибір</h3>
<ul>
  <li>🗂 Модуль 7 — Портфоліо</li>
  <li>🎮 Модуль 11 — Ігровий сайт</li>
  <li>✅ Модуль 9 — ToDo зі списком</li>
  <li>🧮 Модуль 8 — Калькулятор + вікторина</li>
</ul>`,
      ru:`<h2>Выбор и подготовка 3 лучших проектов</h2>
<h3>Критерии отбора</h3>
<ul>
  <li>✅ Рабочий код без явных ошибок</li>
  <li>✅ Интересная идея или реальная задача</li>
  <li>✅ Красивый дизайн</li>
  <li>✅ Адаптивность (телефон + десктоп)</li>
  <li>✅ Интерактивность (JS-функции)</li>
</ul>
<h3>Что подготовить для каждого проекта</h3>
<pre>1. Название и краткое описание
2. Список технологий: HTML, CSS Grid, JS...
3. Ссылки: GitHub + Live Demo
4. Скриншот или GIF
5. "Что я научился": 1-2 пункта</pre>` },
    `<div class="proj-select">
  <h2>🗂 Мої 3 проекти</h2>

  <div class="proj-cards" id="proj-cards">
    <div class="proj-card" id="pc-1">
      <div class="pc-num">1</div>
      <div class="pc-body">
        <input type="text" class="pc-name" placeholder="Назва проекту..." value="Ігровий сайт Pixel Quest">
        <textarea class="pc-desc" rows="2" placeholder="Короткий опис...">RPG-сайт з персонажами, таймером і таблицею рекордів</textarea>
        <div class="pc-tech" id="tech-1">
          <span class="tech-tag">HTML5</span>
          <span class="tech-tag">CSS Grid</span>
          <span class="tech-tag">JS DOM</span>
          <span class="tech-tag">Canvas</span>
          <span class="tech-tag">localStorage</span>
        </div>
        <input type="text" class="pc-link" placeholder="🔗 Посилання на GitHub..." value="https://github.com/user/pixel-quest">
        <div class="pc-rating">
          Моя оцінка: <span class="rating-stars" data-card="1">⭐⭐⭐⭐⭐</span>
        </div>
      </div>
    </div>

    <div class="proj-card" id="pc-2">
      <div class="pc-num">2</div>
      <div class="pc-body">
        <input type="text" class="pc-name" placeholder="Назва проекту..." value="ToDo-список">
        <textarea class="pc-desc" rows="2" placeholder="Короткий опис...">Список завдань з LocalStorage, фільтрами і анімацією</textarea>
        <div class="pc-tech" id="tech-2">
          <span class="tech-tag">HTML</span>
          <span class="tech-tag">CSS Flexbox</span>
          <span class="tech-tag">JavaScript</span>
          <span class="tech-tag">localStorage</span>
        </div>
        <input type="text" class="pc-link" placeholder="🔗 Посилання..." value="https://github.com/user/todo-app">
        <div class="pc-rating">Моя оцінка: <span class="rating-stars" data-card="2">⭐⭐⭐⭐</span></div>
      </div>
    </div>

    <div class="proj-card" id="pc-3">
      <div class="pc-num">3</div>
      <div class="pc-body">
        <input type="text" class="pc-name" placeholder="Назва проекту..." value="">
        <textarea class="pc-desc" rows="2" placeholder="Короткий опис..."></textarea>
        <div class="pc-tech" id="tech-3">
          <span class="tech-tag add-tag" onclick="addTag(3)">+ Технологія</span>
        </div>
        <input type="text" class="pc-link" placeholder="🔗 Посилання...">
        <div class="pc-rating">Моя оцінка: <span class="rating-stars" data-card="3">☆☆☆☆☆</span></div>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.proj-select{max-width:520px}
.proj-cards{display:flex;flex-direction:column;gap:12px}
.proj-card{background:#111827;border:2px solid #1f2937;border-radius:14px;padding:16px;display:flex;gap:14px}
.proj-card:hover{border-color:#6366f1}
.pc-num{width:32px;height:32px;border-radius:50%;background:#6366f1;color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.pc-body{flex:1;display:flex;flex-direction:column;gap:8px}
.pc-name{font-size:15px;font-weight:700;background:transparent;border:none;border-bottom:1px solid #374151;border-radius:0;padding:4px 0;color:#f9fafb;margin:0}
.pc-name:focus{border-bottom-color:#6366f1;box-shadow:none}
.pc-desc{font-size:13px;background:#030712;resize:vertical;margin:0}
.pc-tech{display:flex;flex-wrap:wrap;gap:6px}
.tech-tag{background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.3);color:#a5b4fc;padding:3px 10px;border-radius:20px;font-size:11px}
.add-tag{cursor:pointer;border-style:dashed;color:#6b7280}
.add-tag:hover{border-color:#6366f1;color:#a5b4fc}
.pc-link{font-size:12px;color:#6b7280;margin:0}
.pc-rating{font-size:13px;color:#9ca3af}
.rating-stars{cursor:pointer;font-size:16px}`,
    `document.querySelectorAll('.rating-stars').forEach(el => {
  el.addEventListener('click', e => {
    const stars = ['☆☆☆☆☆','⭐☆☆☆☆','⭐⭐☆☆☆','⭐⭐⭐☆☆','⭐⭐⭐⭐☆','⭐⭐⭐⭐⭐'];
    const cur = stars.indexOf(el.textContent);
    el.textContent = stars[(cur + 1) % stars.length];
  });
});

function addTag(n) {
  const tech = document.getElementById('tech-' + n);
  const name = prompt('Введи назву технології:');
  if (!name) return;
  const tag = document.createElement('span');
  tag.className = 'tech-tag';
  tag.textContent = name;
  tech.insertBefore(tag, tech.querySelector('.add-tag'));
}`,
    [
      { level:'easy',   uk:'Заповни поля для свого третього проекту: назва, опис і посилання.',  ru:'Заполни поля для своего третьего проекта: название, описание и ссылку.' },
      { level:'medium', uk:'Натисни на зірочки рейтингу проекту 3 — виставляй оцінку. Потім додай 2 технології через кнопку "+ Технологія".',  ru:'Кликни на звёздочки рейтинга проекта 3 — выставляй оценку. Потом добавь 2 технологии через кнопку "+ Технологія".' },
      { level:'hard',   uk:'Додай поле "Що навчився" (textarea.pc-learned, placeholder="Що я навчився...") до кожної proj-card.',  ru:'Добавь поле "Что научился" (textarea.pc-learned) к каждой proj-card.' },
    ]
  );

  /* ─── 12-03 ──────────────────────────────────────────────── */
  patch('12-03',
    { uk:`<h2>Єдина кольорова тема: CSS-змінні</h2>
<p>Весь портфоліо-сайт будується на одній палітрі. CSS-змінні дозволяють змінити всі кольори одним рядком.</p>
<h3>Система кольорів портфоліо</h3>
<pre>:root {
  /* Фони */
  --bg:      #030712;   /* основний фон */
  --bg2:     #111827;   /* картки, хедер */
  --bg3:     #1f2937;   /* рамки, роздільники */

  /* Текст */
  --text:    #f9fafb;   /* основний */
  --muted:   #9ca3af;   /* другорядний */

  /* Акценти */
  --accent:  #6366f1;   /* indigo – головний */
  --accent2: #ec4899;   /* pink – другорядний */

  /* Утилітарні */
  --radius:  12px;
  --shadow:  0 4px 24px rgba(0,0,0,.4);
}</pre>
<h3>Зміна палітри в одному місці</h3>
<pre>/* Зелена тема замість індиго: */
:root { --accent: #059669; --accent2: #10b981; }</pre>`,
      ru:`<h2>Единая цветовая тема: CSS-переменные</h2>
<pre>:root {
  --bg:      #030712;
  --bg2:     #111827;
  --bg3:     #1f2937;
  --text:    #f9fafb;
  --muted:   #9ca3af;
  --accent:  #6366f1;
  --accent2: #ec4899;
  --radius:  12px;
}</pre>` },
    `<div class="theme-builder">
  <h2>🎨 Конструктор теми</h2>

  <div class="tb-controls">
    <div class="tb-row">
      <label>Основний акцент (--accent)</label>
      <div class="color-row">
        <input type="color" id="c-accent" value="#6366f1">
        <span class="color-val" id="cv-accent">#6366f1</span>
      </div>
    </div>
    <div class="tb-row">
      <label>Другорядний акцент (--accent2)</label>
      <div class="color-row">
        <input type="color" id="c-accent2" value="#ec4899">
        <span class="color-val" id="cv-accent2">#ec4899</span>
      </div>
    </div>
    <div class="tb-row">
      <label>Фон карток (--bg2)</label>
      <div class="color-row">
        <input type="color" id="c-bg2" value="#111827">
        <span class="color-val" id="cv-bg2">#111827</span>
      </div>
    </div>
  </div>

  <div class="tb-presets">
    <button onclick="applyPreset('indigo')">💜 Indigo</button>
    <button onclick="applyPreset('emerald')">💚 Emerald</button>
    <button onclick="applyPreset('rose')">🌹 Rose</button>
    <button onclick="applyPreset('amber')">🟡 Amber</button>
  </div>

  <div class="tb-preview" id="tb-preview">
    <div class="prev-header">
      <div class="prev-logo">АК<span>.dev</span></div>
      <nav class="prev-nav">
        <a href="#">Навички</a>
        <a href="#">Проекти</a>
        <a href="#" class="prev-active">Контакти</a>
      </nav>
    </div>
    <div class="prev-hero">
      <h3>Привіт, я <span class="prev-accent">Аліна!</span></h3>
      <p>Junior Web Developer</p>
      <div class="prev-btns">
        <button class="prev-btn-main">Мої проекти</button>
        <button class="prev-btn-out">Написати</button>
      </div>
    </div>
    <div class="prev-skill">
      <div class="ps-label">HTML5</div>
      <div class="ps-bar"><div class="ps-fill" id="ps-fill1" style="width:95%"></div></div>
    </div>
    <div class="prev-skill">
      <div class="ps-label">JavaScript</div>
      <div class="ps-bar"><div class="ps-fill" id="ps-fill2" style="width:75%"></div></div>
    </div>
  </div>
</div>`,
    `:root{--accent:#6366f1;--accent2:#ec4899;--bg2:#111827}
${BASE}
.theme-builder{max-width:520px}
.tb-controls{background:var(--bg2);border-radius:12px;padding:16px;margin-bottom:12px;display:flex;flex-direction:column;gap:10px}
.tb-row label{font-size:12px;color:#9ca3af;display:block;margin-bottom:6px}
.color-row{display:flex;align-items:center;gap:10px}
input[type=color]{width:44px;height:36px;border:1px solid #374151;border-radius:8px;cursor:pointer;padding:2px;background:transparent}
.color-val{font-family:monospace;font-size:13px;color:var(--accent)}
.tb-presets{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.tb-preview{background:var(--bg2);border:1px solid #374151;border-radius:14px;overflow:hidden}
.prev-header{background:#030712;display:flex;align-items:center;justify-content:space-between;padding:12px 16px}
.prev-logo{font-weight:900;color:var(--accent);font-size:15px}
.prev-logo span{color:#9ca3af;font-weight:400}
.prev-nav{display:flex;gap:12px;font-size:12px}
.prev-nav a{color:#9ca3af;text-decoration:none}
.prev-active{color:var(--accent)!important}
.prev-hero{padding:20px 16px 16px;border-bottom:1px solid #1f2937}
.prev-hero h3{font-size:18px;margin-bottom:4px}
.prev-accent{color:var(--accent)}
.prev-hero p{font-size:13px;color:#9ca3af;margin-bottom:12px}
.prev-btns{display:flex;gap:8px}
.prev-btn-main{background:var(--accent);border:none;color:#fff;padding:8px 16px;border-radius:8px;font-size:13px;cursor:default}
.prev-btn-out{background:none;border:2px solid var(--accent);color:var(--accent);padding:6px 14px;border-radius:8px;font-size:13px;cursor:default}
.prev-skill{display:flex;align-items:center;gap:10px;padding:8px 16px;font-size:12px;color:#9ca3af}
.ps-label{width:80px;flex-shrink:0}
.ps-bar{flex:1;background:#1f2937;border-radius:4px;height:6px}
.ps-fill{height:100%;border-radius:4px;background:linear-gradient(to right,var(--accent),var(--accent2))}`,
    `const PRESETS = {
  indigo:  { accent:'#6366f1', accent2:'#ec4899', bg2:'#111827' },
  emerald: { accent:'#059669', accent2:'#10b981', bg2:'#0d1f18' },
  rose:    { accent:'#e11d48', accent2:'#fb7185', bg2:'#1c0f12' },
  amber:   { accent:'#d97706', accent2:'#f59e0b', bg2:'#1c1400' },
};

function apply(vars) {
  const r = document.documentElement.style;
  r.setProperty('--accent',  vars.accent);
  r.setProperty('--accent2', vars.accent2);
  r.setProperty('--bg2',     vars.bg2);
  document.getElementById('c-accent').value   = vars.accent;
  document.getElementById('c-accent2').value  = vars.accent2;
  document.getElementById('c-bg2').value      = vars.bg2;
  document.getElementById('cv-accent').textContent  = vars.accent;
  document.getElementById('cv-accent2').textContent = vars.accent2;
  document.getElementById('cv-bg2').textContent     = vars.bg2;
}

function applyPreset(name) { apply(PRESETS[name]); }

['accent','accent2','bg2'].forEach(key => {
  document.getElementById('c-'+key).addEventListener('input', function() {
    document.documentElement.style.setProperty('--'+key, this.value);
    document.getElementById('cv-'+key).textContent = this.value;
  });
});`,
    [
      { level:'easy',   uk:'Натискай кнопки пресетів Indigo/Emerald/Rose/Amber і дивись як тема порторфоліо змінюється.',  ru:'Нажимай кнопки пресетов и смотри как тема портфолио меняется.' },
      { level:'medium', uk:'Підбери свою унікальну палітру через color-picker. Запиши значення --accent у нотатнику.',  ru:'Подбери свою уникальную палитру через color-picker. Запиши значение --accent.' },
      { level:'hard',   uk:'Додай 5-й пресет "Ocean": accent:#0ea5e9, accent2:#38bdf8, bg2:#0c1a2a.',  ru:'Добавь 5-й пресет "Ocean": accent:#0ea5e9, accent2:#38bdf8, bg2:#0c1a2a.' },
    ]
  );

  /* ─── 12-04 ──────────────────────────────────────────────── */
  patch('12-04',
    { uk:`<h2>Шапка з іменем та аватаром</h2>
<p>Header — перше що бачить відвідувач. Він повинен містити ім'я, навігацію і бути sticky.</p>
<h3>Структура Header</h3>
<pre>&lt;header class="site-header"&gt;
  &lt;div class="container"&gt;
    &lt;div class="logo"&gt;
      &lt;span class="logo-av"&gt;👩‍💻&lt;/span&gt;
      &lt;div&gt;
        &lt;span class="logo-name"&gt;Аліна Коваленко&lt;/span&gt;
        &lt;span class="logo-role"&gt;Web Developer&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;nav&gt;...посилання...&lt;/nav&gt;
    &lt;button class="theme-btn"&gt;🌙&lt;/button&gt;
  &lt;/div&gt;
&lt;/header&gt;</pre>
<h3>Sticky Header + тінь при прокрутці</h3>
<pre>.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  transition: box-shadow .3s;
}
.site-header.scrolled {
  box-shadow: 0 2px 20px rgba(0,0,0,.3);
}</pre>`,
      ru:`<h2>Шапка с именем и аватаром</h2>
<pre>.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}
.site-header.scrolled {
  box-shadow: 0 2px 20px rgba(0,0,0,.3);
}</pre>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Портфоліо — Header</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a href="#" class="logo">
        <div class="logo-av">👩‍💻</div>
        <div class="logo-txt">
          <span class="logo-name">Аліна Коваленко</span>
          <span class="logo-role">Web Developer</span>
        </div>
      </a>
      <nav class="site-nav" id="site-nav">
        <a href="#skills"   class="nav-a">Навички</a>
        <a href="#projects" class="nav-a">Проекти</a>
        <a href="#contact"  class="nav-a">Контакти</a>
      </nav>
      <div class="hdr-right">
        <button class="theme-btn" id="theme-btn" title="Змінити тему">🌙</button>
        <button class="burger" id="burger">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Контент для демонстрації sticky -->
  <main style="padding:24px 20px;max-width:700px;margin:0 auto">
    <h1 style="margin-bottom:16px">Прокручуй сторінку вниз ↓</h1>
    <p style="color:#9ca3af;line-height:1.7">Поспостерігай: шапка залишається зверху (sticky), і при прокрутці з'являється тінь.<br><br>
    Спробуй кнопку 🌙 для перемикання теми і ☰ для мобільного меню.</p>
    <div style="height:600px;display:flex;align-items:center;justify-content:center;color:#374151;font-size:48px">↓</div>
    <p style="color:#9ca3af">Ти доскролив до кінця! Шапка весь час була зверху.</p>
  </main>
  <script src="script.js"></script>
</body>
</html>`,
    `:root{--bg:#030712;--bg2:#111827;--border:#1f2937;--text:#f9fafb;--muted:#9ca3af;--accent:#6366f1}
[data-theme=light]{--bg:#f9fafb;--bg2:#fff;--border:#e5e7eb;--text:#030712;--muted:#6b7280;--accent:#6366f1}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);transition:background .3s,color .3s}
.container{max-width:900px;margin:0 auto;padding:0 20px}
.site-header{position:sticky;top:0;z-index:100;background:rgba(3,7,18,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:box-shadow .3s}
.site-header.scrolled{box-shadow:0 2px 24px rgba(0,0,0,.4)}
.header-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 20px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--text)}
.logo-av{font-size:28px;line-height:1}
.logo-name{display:block;font-weight:700;font-size:15px}
.logo-role{display:block;font-size:11px;color:var(--accent)}
.site-nav{display:none;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--bg2);border-bottom:1px solid var(--border);padding:10px 20px;gap:4px}
.site-nav.open{display:flex}
.nav-a{color:var(--muted);text-decoration:none;padding:10px 12px;border-radius:8px;font-size:14px;transition:.2s}
.nav-a:hover{color:var(--accent);background:rgba(99,102,241,.08)}
.hdr-right{display:flex;gap:8px;align-items:center}
.theme-btn{background:none;border:1px solid var(--border);color:var(--text);width:36px;height:36px;border-radius:8px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:.2s}
.theme-btn:hover{border-color:var(--accent)}
.burger{background:none;border:none;cursor:pointer;padding:6px;display:flex;flex-direction:column;gap:5px}
.burger span{display:block;width:20px;height:2px;background:var(--text);border-radius:2px;transition:.3s}
.burger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.burger.open span:nth-child(2){opacity:0}
.burger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
@media(min-width:640px){
  .site-nav{display:flex;flex-direction:row;position:static;background:none;border:none;padding:0}
  .burger{display:none}
}`,
    `// Sticky shadow
window.addEventListener('scroll', () => {
  document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 10);
});

// Burger
const burger = document.getElementById('burger');
const nav    = document.getElementById('site-nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Theme
document.getElementById('theme-btn').addEventListener('click', function () {
  const isDark = !document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = isDark ? 'light' : '';
  this.textContent = isDark ? '🌑' : '🌙';
});`,
    [
      { level:'easy',   uk:'Прокрути сторінку вниз і поспостерігай за тінню header. Натисни 🌙 для зміни теми.',  ru:'Прокрути страницу вниз и понаблюдай за тенью header. Нажми 🌙 для смены темы.' },
      { level:'medium', uk:'Змін .logo-av на свої ініціали: замість emoji поклади div з background:var(--accent), ширина/висота 38px, border-radius:50%, color:#fff.',  ru:'Замени .logo-av на свои инициалы: div с background:var(--accent), width/height:38px, border-radius:50%.' },
      { level:'hard',   uk:'Додай підсвітку активного посилання: при прокрутці до секції знаходь відповідне nav-a і додавай клас .active (color:var(--accent)).',  ru:'Добавь подсветку активной ссылки: при прокрутке к секции находи соответствующее nav-a и добавляй класс .active.' },
    ]
  );

  /* ─── 12-05 ──────────────────────────────────────────────── */
  patch('12-05',
    { uk:`<h2>Hero із коротким вступом та кнопками CTA</h2>
<p>Hero-секція — «обличчя» портфоліо. Вона повинна відповісти на питання: «Хто ти і що ти вмієш?» — за 3 секунди.</p>
<h3>Ефект печатної машинки (typewriter)</h3>
<pre>const roles = ['Web Developer', 'HTML+CSS Master', 'JS Enthusiast'];
let ri = 0, ci = 0, del = false;

function type() {
  const word = roles[ri];
  if (!del && ci < word.length) { ci++; }
  else if (!del)                { del = true; setTimeout(type, 1500); return; }
  else if (del && ci > 0)       { ci--; }
  else { del = false; ri = (ri + 1) % roles.length; }

  el.textContent = word.slice(0, ci) + '|';
  setTimeout(type, del ? 60 : 120);
}</pre>
<h3>Плавний scroll до секції</h3>
<pre>document.querySelector('a[href="#projects"]')
  .addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  });</pre>`,
      ru:`<h2>Hero с коротким вступлением и кнопками CTA</h2>
<h3>Эффект печатной машинки (typewriter)</h3>
<pre>const roles = ['Web Developer', 'HTML+CSS Master', 'JS Enthusiast'];
let ri = 0, ci = 0, del = false;
function type() {
  const word = roles[ri];
  if (!del && ci < word.length) ci++;
  else if (!del) { del=true; setTimeout(type,1500); return; }
  else if (del && ci > 0) ci--;
  else { del=false; ri=(ri+1)%roles.length; }
  el.textContent = word.slice(0,ci) + '|';
  setTimeout(type, del?60:120);
}</pre>` },
    `<section class="hero-section">
  <div class="hero-inner">
    <div class="hero-text">
      <p class="hero-eyebrow">👋 Привіт, я</p>
      <h1 class="hero-name">Аліна Коваленко</h1>
      <p class="hero-role">— <span class="typewriter" id="typewriter">Web Developer|</span></p>
      <p class="hero-desc">Створюю красиві та зручні сайти, що однаково добре виглядають на телефоні і ноутбуці.</p>
      <div class="hero-ctas">
        <a href="#projects" class="btn-main" onclick="smoothScroll(event,'#projects')">🗂 Мої проекти</a>
        <a href="#contact"  class="btn-out"  onclick="smoothScroll(event,'#contact')">📧 Зв'язатись</a>
      </div>
      <div class="hero-badges">
        <span class="hbadge">HTML</span>
        <span class="hbadge">CSS</span>
        <span class="hbadge">JavaScript</span>
        <span class="hbadge">Адаптив</span>
      </div>
    </div>
    <div class="hero-av-wrap">
      <div class="hero-av-ring"></div>
      <div class="hero-av">👩‍💻</div>
    </div>
  </div>
</section>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#030712;color:#f9fafb;min-height:100vh}
.hero-section{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:40px 20px;background:radial-gradient(ellipse at 60% 50%,rgba(99,102,241,.12) 0%,transparent 60%)}
.hero-inner{display:flex;flex-direction:column;align-items:center;gap:32px;text-align:center;max-width:800px;width:100%}
.hero-eyebrow{font-size:16px;color:#9ca3af;margin-bottom:4px}
.hero-name{font-size:clamp(32px,6vw,56px);font-weight:900;background:linear-gradient(135deg,#f9fafb,#a5b4fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px}
.hero-role{font-size:18px;color:#9ca3af;margin-bottom:16px}
.typewriter{color:#6366f1;font-family:monospace;font-size:20px}
.hero-desc{font-size:15px;color:#9ca3af;max-width:440px;line-height:1.7;margin:0 auto 24px}
.hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px}
.btn-main{background:#6366f1;color:#fff;text-decoration:none;padding:13px 28px;border-radius:10px;font-size:15px;font-weight:700;transition:.2s;display:inline-block}
.btn-main:hover{filter:brightness(1.1);transform:translateY(-2px)}
.btn-out{color:#6366f1;border:2px solid #6366f1;text-decoration:none;padding:11px 24px;border-radius:10px;font-size:14px;font-weight:600;transition:.2s;display:inline-block}
.btn-out:hover{background:rgba(99,102,241,.1)}
.hero-badges{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.hbadge{background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.3);color:#a5b4fc;padding:4px 14px;border-radius:20px;font-size:12px}
.hero-av-wrap{position:relative;width:200px;height:200px;flex-shrink:0}
.hero-av{font-size:100px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-10px)}}
.hero-av-ring{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(99,102,241,.25);animation:spin 10s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
@media(min-width:640px){
  .hero-inner{flex-direction:row;text-align:left}
  .hero-ctas,.hero-badges{justify-content:flex-start}
  .hero-desc{margin:0 0 24px}
}`,
    `const roles = ['Web Developer','HTML+CSS Master','JS Enthusiast','UI Designer'];
const el = document.getElementById('typewriter');
let ri=0, ci=0, del=false;

function type() {
  const word = roles[ri];
  if (!del && ci < word.length)  { ci++; }
  else if (!del)                  { del=true; setTimeout(type,1500); return; }
  else if (del && ci > 0)         { ci--; }
  else                            { del=false; ri=(ri+1)%roles.length; }
  el.textContent = word.slice(0,ci) + '|';
  setTimeout(type, del ? 60 : 120);
}
type();

function smoothScroll(e, sel) {
  e.preventDefault();
  document.querySelector(sel)?.scrollIntoView({behavior:'smooth'});
}`,
    [
      { level:'easy',   uk:'Поспостерігай за анімацією друкарської машинки — скільки ролей вона виводить?',  ru:'Понаблюдай за анимацией печатной машинки — сколько ролей она выводит?' },
      { level:'medium', uk:'Додай свою роль у масив roles, наприклад "CSS Animation Expert".',  ru:'Добавь свою роль в массив roles, например "CSS Animation Expert".' },
      { level:'hard',   uk:'Додай зовнішнє кільце-орбіта: другий .hero-av-ring з border:2px solid rgba(236,72,153,.2) і animation:spin 6s linear infinite reverse.',  ru:'Добавь внешнее кольцо-орбиту: второй .hero-av-ring с border rgba(236,72,153,.2) и animation reverse.' },
    ]
  );

  /* ─── 12-06 ──────────────────────────────────────────────── */
  patch('12-06',
    { uk:`<h2>Секція «Навички»: теги та progress-bar</h2>
<p>Секція навичок показує роботодавцю з якими технологіями ти працюєш і наскільки добре.</p>
<h3>Анімація прогрес-барів при прокрутці</h3>
<pre>// IntersectionObserver — спостерігає коли елемент стає видимим
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.val + '%';
      observer.unobserve(bar); // більше не стежити
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(b => observer.observe(b));</pre>
<h3>Групування по категоріях</h3>
<pre>const skills = {
  'Frontend':  [{ name:'HTML5', val:95 }, { name:'CSS3', val:85 }],
  'Інструменти': [{ name:'Git', val:70 }],
};</pre>`,
      ru:`<h2>Секция «Навыки»: теги и progress-bar</h2>
<h3>Анимация прогресс-баров при прокрутке</h3>
<pre>const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.val + '%';
      observer.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(b => observer.observe(b));</pre>` },
    `<section class="skills-section" id="skills">
  <div class="container">
    <h2 class="sec-title">💡 Мої навички</h2>

    <div class="skill-groups">
      <div class="skill-group">
        <h3>Frontend</h3>
        <div class="skill-bars">
          <div class="skill-row">
            <div class="skill-meta"><span>HTML5</span><span class="skill-pct">95%</span></div>
            <div class="skill-bar-track"><div class="skill-fill" data-val="95" style="width:0;background:linear-gradient(to right,#f97316,#fb923c)"></div></div>
          </div>
          <div class="skill-row">
            <div class="skill-meta"><span>CSS3 / Flexbox / Grid</span><span class="skill-pct">85%</span></div>
            <div class="skill-bar-track"><div class="skill-fill" data-val="85" style="width:0;background:linear-gradient(to right,#3b82f6,#60a5fa)"></div></div>
          </div>
          <div class="skill-row">
            <div class="skill-meta"><span>JavaScript (ES6+)</span><span class="skill-pct">70%</span></div>
            <div class="skill-bar-track"><div class="skill-fill" data-val="70" style="width:0;background:linear-gradient(to right,#f59e0b,#fbbf24)"></div></div>
          </div>
          <div class="skill-row">
            <div class="skill-meta"><span>Адаптивна верстка</span><span class="skill-pct">80%</span></div>
            <div class="skill-bar-track"><div class="skill-fill" data-val="80" style="width:0;background:linear-gradient(to right,#6366f1,#a5b4fc)"></div></div>
          </div>
        </div>
      </div>

      <div class="skill-group">
        <h3>Інструменти</h3>
        <div class="skill-tags">
          <span class="sk-tag">🎨 Figma</span>
          <span class="sk-tag">🐙 Git / GitHub</span>
          <span class="sk-tag">🔬 Chrome DevTools</span>
          <span class="sk-tag">💾 localStorage</span>
          <span class="sk-tag">🖼 Canvas API</span>
          <span class="sk-tag">🎵 Web Audio API</span>
          <span class="sk-tag">📱 Adaptive Design</span>
        </div>
      </div>
    </div>
  </div>
</section>`,
    `${BASE}
.skills-section{padding:60px 20px}
.container{max-width:700px;margin:0 auto}
.sec-title{font-size:24px;margin-bottom:28px}
.skill-groups{display:flex;flex-direction:column;gap:28px}
.skill-group h3{font-size:13px;letter-spacing:.08em;color:#6366f1;text-transform:uppercase;margin-bottom:16px}
.skill-bars{display:flex;flex-direction:column;gap:14px}
.skill-row{}
.skill-meta{display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;color:#d1d5db}
.skill-pct{color:#9ca3af}
.skill-bar-track{background:#1f2937;border-radius:6px;height:8px;overflow:hidden}
.skill-fill{height:100%;border-radius:6px;width:0;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.skill-tags{display:flex;flex-wrap:wrap;gap:8px}
.sk-tag{background:#111827;border:1px solid #374151;color:#d1d5db;padding:7px 16px;border-radius:8px;font-size:13px;transition:.2s}
.sk-tag:hover{border-color:#6366f1;color:#a5b4fc}`,
    `const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.val + '%';
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-fill').forEach(b => obs.observe(b));`,
    [
      { level:'easy',   uk:'Прокрути до секції навичок — поспостерігай за анімацією прогрес-барів.',  ru:'Прокрути до секции навыков — понаблюдай за анимацией прогресс-баров.' },
      { level:'medium', uk:'Додай новий skill-row "React.js" зі значенням data-val="40" і градієнтом #06b6d4→#22d3ee.',  ru:'Добавь новый skill-row "React.js" со значением data-val="40" и градиентом #06b6d4→#22d3ee.' },
      { level:'hard',   uk:'Додай emoji-іконку до кожного рядка: в .skill-meta перед назвою додай span.sk-emoji (📝,🎨,⚡,📱).',  ru:'Добавь emoji-иконку к каждой строке: в .skill-meta перед названием добавь span.sk-emoji (📝,🎨,⚡,📱).' },
    ]
  );

  /* ─── 12-07 ──────────────────────────────────────────────── */
  patch('12-07',
    { uk:`<h2>Секція «Проекти»: картки з посиланнями</h2>
<p>Секція проектів — найважливіша. Саме тут роботодавець вирішує чи хоче він з тобою поговорити.</p>
<h3>Структура картки проекту</h3>
<pre>&lt;div class="proj-card"&gt;
  &lt;div class="proj-thumb"&gt;🎮&lt;/div&gt;
  &lt;div class="proj-body"&gt;
    &lt;h3&gt;Pixel Quest&lt;/h3&gt;
    &lt;p&gt;Ігровий RPG-сайт...&lt;/p&gt;
    &lt;div class="proj-tags"&gt;
      &lt;span&gt;JS&lt;/span&gt;&lt;span&gt;Canvas&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class="proj-links"&gt;
      &lt;a href="#"&gt;GitHub&lt;/a&gt;
      &lt;a href="#"&gt;Live Demo&lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>`,
      ru:`<h2>Секция «Проекты»: карточки со ссылками</h2>
<pre>&lt;div class="proj-card"&gt;
  &lt;div class="proj-thumb"&gt;🎮&lt;/div&gt;
  &lt;div class="proj-body"&gt;
    &lt;h3&gt;Pixel Quest&lt;/h3&gt;
    &lt;p&gt;Описание...&lt;/p&gt;
    &lt;div class="proj-tags"&gt;&lt;span&gt;JS&lt;/span&gt;&lt;/div&gt;
    &lt;div class="proj-links"&gt;
      &lt;a href="#"&gt;GitHub&lt;/a&gt;
      &lt;a href="#"&gt;Live Demo&lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>` },
    `<section class="projects-section" id="projects">
  <div class="container">
    <h2 class="sec-title">🗂 Мої проекти</h2>
    <div class="proj-grid">

      <div class="proj-card">
        <div class="proj-thumb" style="background:linear-gradient(135deg,#1e1b4b,#4c1d95)">
          <span>⚔️</span><span class="pt-label">Pixel Quest</span>
        </div>
        <div class="proj-body">
          <h3>Pixel Quest</h3>
          <p>Ігровий RPG-сайт з персонажами, таймером, таблицею рекордів і Canvas-фоном.</p>
          <div class="proj-tags">
            <span>HTML5</span><span>CSS Grid</span><span>JavaScript</span><span>Canvas</span><span>localStorage</span>
          </div>
          <div class="proj-links">
            <a href="#" class="pl-gh">GitHub 🐙</a>
            <a href="#" class="pl-live">Live Demo →</a>
          </div>
        </div>
      </div>

      <div class="proj-card">
        <div class="proj-thumb" style="background:linear-gradient(135deg,#064e3b,#065f46)">
          <span>✅</span><span class="pt-label">ToDo App</span>
        </div>
        <div class="proj-body">
          <h3>ToDo-список</h3>
          <p>Додаток для завдань з localStorage, фільтрами, анімацією і редагуванням.</p>
          <div class="proj-tags">
            <span>HTML</span><span>CSS Flex</span><span>JavaScript</span><span>localStorage</span>
          </div>
          <div class="proj-links">
            <a href="#" class="pl-gh">GitHub 🐙</a>
            <a href="#" class="pl-live">Live Demo →</a>
          </div>
        </div>
      </div>

      <div class="proj-card">
        <div class="proj-thumb" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8)">
          <span>👩‍💻</span><span class="pt-label">Портфоліо</span>
        </div>
        <div class="proj-body">
          <h3>Особисте портфоліо</h3>
          <p>Адаптивний сайт-візитка з темою, анімаціями прокрутки і формою контактів.</p>
          <div class="proj-tags">
            <span>HTML5</span><span>CSS Var</span><span>JS DOM</span><span>Adaptive</span>
          </div>
          <div class="proj-links">
            <a href="#" class="pl-gh">GitHub 🐙</a>
            <a href="#" class="pl-live">Live Demo →</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>`,
    `${BASE}
.projects-section{padding:60px 20px}
.container{max-width:800px;margin:0 auto}
.sec-title{font-size:24px;margin-bottom:28px}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.proj-card{background:#111827;border:1px solid #1f2937;border-radius:14px;overflow:hidden;transition:.25s}
.proj-card:hover{border-color:#6366f1;transform:translateY(-4px);box-shadow:0 8px 32px rgba(99,102,241,.15)}
.proj-thumb{height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:48px;gap:6px;transition:.3s}
.pt-label{font-size:13px;font-weight:700;color:rgba(255,255,255,.7);letter-spacing:.05em}
.proj-body{padding:16px}
.proj-body h3{font-size:15px;font-weight:700;margin-bottom:6px}
.proj-body p{font-size:13px;color:#9ca3af;line-height:1.6;margin-bottom:12px}
.proj-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.proj-tags span{background:#1f2937;color:#9ca3af;padding:3px 10px;border-radius:20px;font-size:11px}
.proj-links{display:flex;gap:8px}
.pl-gh{background:#1f2937;color:#d1d5db;text-decoration:none;padding:7px 14px;border-radius:8px;font-size:12px;transition:.2s}
.pl-gh:hover{background:#374151}
.pl-live{background:#6366f1;color:#fff;text-decoration:none;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:600;transition:.2s}
.pl-live:hover{filter:brightness(1.1)}`,
    ``,
    [
      { level:'easy',   uk:'Наведи мишку на кожну картку — поспостерігай за hover-ефектом (translateY + тінь).',  ru:'Наведи мышку на каждую карточку — понаблюдай за hover-эффектом.' },
      { level:'medium', uk:'Заміни "Портфоліо" на свій третій реальний проект: назва, опис, теги і посилання.',  ru:'Замени "Портфоліо" на свой третий реальный проект: название, описание, теги и ссылки.' },
      { level:'hard',   uk:'Додай числовий лічильник "Проектів: X" що оновлюється автоматично: document.querySelectorAll(".proj-card").length.',  ru:'Добавь числовой счётчик "Проектов: X" который обновляется автоматически.' },
    ]
  );

  /* ─── 12-08 ──────────────────────────────────────────────── */
  patch('12-08',
    { uk:`<h2>Hover-ефект на картці проекту</h2>
<p>Hover-ефект робить картки живими і показує більше інформації при наведенні.</p>
<h3>Overlay-ефект</h3>
<pre>.proj-thumb { position: relative; overflow: hidden; }

/* Накладка з'являється при hover */
.proj-overlay {
  position: absolute;
  inset: 0;
  background: rgba(99,102,241,.85);
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  transition: opacity .3s;
}
.proj-card:hover .proj-overlay { opacity: 1; }</pre>
<h3>Zoom зображення</h3>
<pre>.proj-thumb img {
  width: 100%;
  transition: transform .4s;
}
.proj-card:hover .proj-thumb img {
  transform: scale(1.08);
}</pre>`,
      ru:`<h2>Hover-эффект на карточке проекта</h2>
<pre>.proj-overlay {
  position: absolute;
  inset: 0;
  background: rgba(99,102,241,.85);
  opacity: 0;
  transition: opacity .3s;
}
.proj-card:hover .proj-overlay { opacity: 1; }</pre>` },
    `<div class="hover-demo">
  <h2>Hover на картки проектів</h2>
  <div class="hdemo-grid">

    <div class="hproj-card">
      <div class="hproj-thumb" style="background:linear-gradient(135deg,#1e1b4b,#4c1d95)">
        <span class="ht-emoji">⚔️</span>
        <div class="hproj-overlay">
          <div class="ov-content">
            <p>🎮 RPG-гра</p>
            <a href="#" class="ov-btn">Переглянути →</a>
          </div>
        </div>
      </div>
      <div class="hproj-info">
        <h3>Pixel Quest</h3>
        <p>Ігровий сайт з Canvas</p>
      </div>
    </div>

    <div class="hproj-card">
      <div class="hproj-thumb" style="background:linear-gradient(135deg,#064e3b,#065f46)">
        <span class="ht-emoji">✅</span>
        <div class="hproj-overlay" style="background:rgba(5,150,105,.85)">
          <div class="ov-content">
            <p>📋 Продуктивність</p>
            <a href="#" class="ov-btn">Переглянути →</a>
          </div>
        </div>
      </div>
      <div class="hproj-info">
        <h3>ToDo App</h3>
        <p>Список завдань</p>
      </div>
    </div>

    <div class="hproj-card">
      <div class="hproj-thumb" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8)">
        <span class="ht-emoji">👩‍💻</span>
        <div class="hproj-overlay" style="background:rgba(29,78,216,.85)">
          <div class="ov-content">
            <p>🌐 Особистий сайт</p>
            <a href="#" class="ov-btn">Переглянути →</a>
          </div>
        </div>
      </div>
      <div class="hproj-info">
        <h3>Портфоліо</h3>
        <p>Адаптивний сайт-візитка</p>
      </div>
    </div>
  </div>
</div>`,
    `${BASE}
.hover-demo{max-width:560px}
.hdemo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-top:16px}
.hproj-card{background:#111827;border:1px solid #1f2937;border-radius:14px;overflow:hidden;transition:.25s;cursor:pointer}
.hproj-card:hover{border-color:#6366f1;box-shadow:0 6px 28px rgba(99,102,241,.2)}
.hproj-thumb{height:130px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.ht-emoji{font-size:48px;transition:transform .4s}
.hproj-card:hover .ht-emoji{transform:scale(1.15)}
.hproj-overlay{position:absolute;inset:0;background:rgba(99,102,241,.88);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(2px)}
.hproj-card:hover .hproj-overlay{opacity:1}
.ov-content{text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px}
.ov-content p{font-size:13px;color:rgba(255,255,255,.9)}
.ov-btn{background:#fff;color:#6366f1;text-decoration:none;padding:7px 16px;border-radius:8px;font-size:12px;font-weight:700;transition:.2s}
.ov-btn:hover{background:#f0f0ff}
.hproj-info{padding:12px 14px}
.hproj-info h3{font-size:14px;font-weight:700;margin-bottom:3px}
.hproj-info p{font-size:12px;color:#9ca3af}`,
    ``,
    [
      { level:'easy',   uk:'Наведи мишку на кожну картку — з\'являється overlay з кнопкою.',  ru:'Наведи мышку на каждую карточку — появляется overlay с кнопкой.' },
      { level:'medium', uk:'Додай transform до .hproj-thumb: при hover масштабуй фон через scale(1.08) (CSS-transition scale на самому thumb-div).',  ru:'Добавь transform к .hproj-thumb: при hover масштабируй фон через scale(1.08).' },
      { level:'hard',   uk:'Зроби "tilt-ефект": addEventListener("mousemove") на .hproj-card і встановлюй style.transform = rotateX/rotateY залежно від позиції миші.',  ru:'Сделай "tilt-эффект": addEventListener("mousemove") на .hproj-card и устанавливай style.transform = rotateX/rotateY.' },
    ]
  );

  /* ─── 12-09 ──────────────────────────────────────────────── */
  patch('12-09',
    { uk:`<h2>Секція «Контакти» із формою</h2>
<p>Форма контактів — це заклик до дії. Зроби її простою і привабливою.</p>
<h3>Структура секції</h3>
<pre>&lt;section id="contact"&gt;
  &lt;div class="contact-wrap"&gt;
    &lt;!-- Ліворуч: інформація --&gt;
    &lt;div class="contact-info"&gt;
      &lt;h3&gt;Давай познайомимось!&lt;/h3&gt;
      &lt;p&gt;...&lt;/p&gt;
      &lt;div class="contact-links"&gt;...&lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- Праворуч: форма --&gt;
    &lt;form class="contact-form"&gt;...&lt;/form&gt;
  &lt;/div&gt;
&lt;/section&gt;</pre>
<h3>UX-деталі форми</h3>
<ul>
  <li>Поля: Ім'я, Email, Тема (необов'язково), Повідомлення</li>
  <li>Focus-стиль з glow-ефектом</li>
  <li>Кнопка відправки змінює текст на "Надсилаю..."</li>
  <li>Успішне відправлення — зелений toast</li>
</ul>`,
      ru:`<h2>Секция «Контакты» с формой</h2>
<h3>UX-детали формы</h3>
<ul>
  <li>Поля: Имя, Email, Тема, Сообщение</li>
  <li>Focus-стиль с glow-эффектом</li>
  <li>Кнопка меняет текст на "Отправляю..."</li>
  <li>Успешная отправка — зелёный toast</li>
</ul>` },
    `<section class="contact-section" id="contact">
  <div class="container">
    <h2 class="sec-title">📧 Зв'яжись зі мною</h2>

    <div class="contact-wrap">
      <div class="contact-info">
        <h3>Давай познайомимось!</h3>
        <p>Відкрита до нових проектів, стажування і просто цікавого спілкування. Пиши — відповім!</p>

        <div class="ci-links">
          <a href="mailto:alina@example.com" class="ci-link">
            <span>📧</span><span>alina@example.com</span>
          </a>
          <a href="#" class="ci-link">
            <span>🐙</span><span>github.com/alina-dev</span>
          </a>
          <a href="#" class="ci-link">
            <span>💼</span><span>linkedin.com/in/alina</span>
          </a>
          <a href="#" class="ci-link">
            <span>📍</span><span>Київ, Україна · Remote OK</span>
          </a>
        </div>
      </div>

      <form class="contact-form" id="contact-form" onsubmit="sendMsg(event)">
        <div class="cf-field">
          <label>Ваше ім'я *</label>
          <input type="text" id="cf-name" placeholder="Іван Петренко" required>
        </div>
        <div class="cf-field">
          <label>Email *</label>
          <input type="email" id="cf-email" placeholder="ivan@example.com" required>
        </div>
        <div class="cf-field">
          <label>Тема</label>
          <input type="text" id="cf-subj" placeholder="Пропозиція про співпрацю...">
        </div>
        <div class="cf-field">
          <label>Повідомлення *</label>
          <textarea id="cf-msg" rows="4" placeholder="Ваше повідомлення..." required></textarea>
        </div>
        <button type="submit" class="cf-submit" id="cf-submit">📨 Надіслати</button>
      </form>
    </div>
  </div>

  <div class="toast" id="toast"></div>
</section>`,
    `${BASE}
.contact-section{padding:60px 20px}
.container{max-width:800px;margin:0 auto}
.sec-title{font-size:24px;margin-bottom:28px}
.contact-wrap{display:flex;flex-direction:column;gap:28px}
@media(min-width:640px){.contact-wrap{flex-direction:row;gap:32px}.contact-info{flex:1}.contact-form{flex:1.4}}
.contact-info h3{font-size:18px;margin-bottom:10px}
.contact-info p{font-size:14px;color:#9ca3af;line-height:1.7;margin-bottom:20px}
.ci-links{display:flex;flex-direction:column;gap:10px}
.ci-link{display:flex;align-items:center;gap:10px;color:#9ca3af;text-decoration:none;font-size:14px;padding:10px 14px;background:#111827;border:1px solid #1f2937;border-radius:10px;transition:.2s}
.ci-link:hover{border-color:#6366f1;color:#a5b4fc}
.cf-field{margin-bottom:14px}
.cf-field label{display:block;font-size:12px;color:#9ca3af;margin-bottom:6px;letter-spacing:.03em}
.cf-field input,.cf-field textarea{margin:0;resize:vertical}
.cf-submit{width:100%;background:#6366f1;border:none;color:#fff;padding:13px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:.2s}
.cf-submit:hover{filter:brightness(1.1)}
.cf-submit:disabled{opacity:.6;cursor:not-allowed}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(100px);background:#059669;color:#fff;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;transition:.4s;z-index:999;opacity:0}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1}`,
    `function sendMsg(e) {
  e.preventDefault();
  const name  = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg   = document.getElementById('cf-msg').value.trim();

  if (!name || !email || !msg) return;

  const btn = document.getElementById('cf-submit');
  btn.textContent = '⏳ Надсилаю...';
  btn.disabled = true;

  // Імітація відправки (насправді потрібен backend)
  setTimeout(() => {
    btn.textContent = '✅ Надіслано!';
    showToast('✅ Повідомлення надіслано! Відповім протягом 24 годин.');
    document.getElementById('contact-form').reset();
    setTimeout(() => { btn.textContent='📨 Надіслати'; btn.disabled=false; }, 2000);
  }, 1500);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}`,
    [
      { level:'easy',   uk:'Заповни форму і натисни "Надіслати" — поспостерігай за анімацією кнопки і toast.',  ru:'Заполни форму и нажми "Надіслати" — понаблюдай за анимацией кнопки и toast.' },
      { level:'medium', uk:'Додай лічильник символів для textarea: під полем виводь "X / 500 символів" і при перевищенні 500 — підсвічуй червоним.',  ru:'Добавь счётчик символов для textarea: под полем выводи "X / 500 символов".' },
      { level:'hard',   uk:'Додай реальну валідацію email: перевіряй що рядок містить "@" і "." після "@". Показуй inline-помилку під полем.',  ru:'Добавь реальную валидацию email: проверяй что строка содержит "@" и "." после "@".' },
    ]
  );

  /* ─── 12-10 ──────────────────────────────────────────────── */
  patch('12-10',
    { uk:`<h2>Анімація заголовків при прокрутці</h2>
<p>Елементи що «з'являються» при прокрутці роблять сайт живим. Для цього використовується <strong>IntersectionObserver</strong>.</p>
<h3>Як це працює</h3>
<pre>// 1. Початковий стан — невидимий і зміщений вниз:
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .7s ease, transform .7s ease;
}
// 2. При появі у вікні — анімуємо:
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}</pre>
<pre>// 3. JS-спостерігач:
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll')
  .forEach(el => obs.observe(el));</pre>`,
      ru:`<h2>Анимация заголовков при прокрутке</h2>
<pre>/* Начальный стиль: */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .7s ease, transform .7s ease;
}
/* При появлении: */
.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}</pre>
<pre>const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });</pre>` },
    `<div class="scroll-anim-demo">
  <div class="demo-hint">↓ Прокрути вниз — елементи анімуються при появі</div>

  <section class="sa-section">
    <h2 class="animate-on-scroll delay-0">🎯 Секція навичок</h2>
    <div class="sa-cards">
      <div class="sa-card animate-on-scroll delay-1" style="background:linear-gradient(135deg,#1e1b4b,#312e81)">
        <div class="sa-icon">⚡</div>
        <h3>JavaScript</h3>
        <p>DOM, Events, APIs</p>
      </div>
      <div class="sa-card animate-on-scroll delay-2" style="background:linear-gradient(135deg,#1a2e22,#14532d)">
        <div class="sa-icon">🎨</div>
        <h3>CSS Grid</h3>
        <p>Layout mastery</p>
      </div>
      <div class="sa-card animate-on-scroll delay-3" style="background:linear-gradient(135deg,#1e3a5f,#1e40af)">
        <div class="sa-icon">📱</div>
        <h3>Adaptive</h3>
        <p>Mobile-first</p>
      </div>
    </div>
  </section>

  <section class="sa-section">
    <h2 class="animate-on-scroll delay-0">🗂 Мої проекти</h2>
    <div class="sa-proj-row">
      <div class="sa-proj animate-on-scroll delay-1">⚔️ Pixel Quest</div>
      <div class="sa-proj animate-on-scroll delay-2">✅ ToDo App</div>
      <div class="sa-proj animate-on-scroll delay-3">👩‍💻 Портфоліо</div>
    </div>
  </section>

  <section class="sa-section">
    <h2 class="animate-on-scroll delay-0">📧 Контакти</h2>
    <p class="animate-on-scroll delay-1" style="color:#9ca3af;margin-top:8px">Готова до нових проектів і співпраці!</p>
  </section>
</div>`,
    `${BASE}
.scroll-anim-demo{max-width:560px}
.demo-hint{background:#111827;border:1px solid #374151;border-radius:10px;padding:12px 16px;font-size:13px;color:#9ca3af;text-align:center;margin-bottom:20px}
.sa-section{padding:32px 0;border-bottom:1px solid #1f2937}
.sa-section:last-child{border-bottom:none}
h2.animate-on-scroll{font-size:22px;margin-bottom:16px}
.sa-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.sa-card{border-radius:12px;padding:20px;text-align:center;transition:.2s}
.sa-icon{font-size:28px;margin-bottom:8px}
.sa-card h3{font-size:14px;margin-bottom:4px}
.sa-card p{font-size:12px;color:rgba(255,255,255,.6)}
.sa-proj-row{display:flex;gap:10px;flex-wrap:wrap}
.sa-proj{background:#111827;border:1px solid #374151;border-radius:10px;padding:12px 20px;font-size:14px;transition:.2s}
.sa-proj:hover{border-color:#6366f1;color:#a5b4fc}

/* ── Анімація ── */
.animate-on-scroll{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}
.animate-on-scroll.visible{opacity:1;transform:translateY(0)}
.delay-1{transition-delay:.1s}
.delay-2{transition-delay:.2s}
.delay-3{transition-delay:.3s}`,
    `const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));`,
    [
      { level:'easy',   uk:'Прокрути сторінку вниз і поспостерігай як кожен елемент плавно з\'являється.',  ru:'Прокрути страницу вниз и понаблюдай как каждый элемент плавно появляется.' },
      { level:'medium', uk:'Додай .delay-4{transition-delay:.4s} і застосуй її до нового елемента.',  ru:'Добавь .delay-4{transition-delay:.4s} и примени её к новому элементу.' },
      { level:'hard',   uk:'Додай другий тип анімації: .animate-left{transform:translateX(-40px)} і .animate-right{transform:translateX(40px)} для горизонтального ефекту.',  ru:'Добавь второй тип анимации: .animate-left{transform:translateX(-40px)} для горизонтального эффекта.' },
    ]
  );

  /* ─── 12-11 ──────────────────────────────────────────────── */
  patch('12-11',
    { uk:`<h2>Кнопка «Прокрутити нагору»</h2>
<p>Back-to-top кнопка — зручна деталь для довгих сторінок. З'являється після прокрутки і плавно повертає на початок.</p>
<h3>HTML</h3>
<pre>&lt;button class="back-top" id="back-top" onclick="scrollTop()"&gt;↑&lt;/button&gt;</pre>
<h3>CSS</h3>
<pre>.back-top {
  position: fixed;
  bottom: 24px; right: 24px;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #6366f1;
  color: #fff;
  font-size: 20px;
  border: none;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .3s, transform .3s;
  z-index: 99;
}
.back-top.visible {
  opacity: 1;
  transform: translateY(0);
}</pre>
<h3>JS</h3>
<pre>window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-top');
  btn.classList.toggle('visible', window.scrollY > 300);
});

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}</pre>`,
      ru:`<h2>Кнопка «Прокрутить вверх»</h2>
<pre>.back-top {
  position: fixed;
  bottom: 24px; right: 24px;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #6366f1;
  opacity: 0;
  transition: opacity .3s, transform .3s;
}
.back-top.visible { opacity: 1; }</pre>
<pre>window.addEventListener('scroll', () => {
  document.getElementById('back-top')
    .classList.toggle('visible', window.scrollY > 300);
});</pre>` },
    `<div class="btt-demo">
  <div class="btt-page-content" id="btt-content">
    <h2>↓ Прокрути вниз — з'явиться кнопка ↑</h2>

    <div class="btt-sections">
      <div class="btt-sec">📋 Секція: Про мене<br><small>Lorem ipsum dolor sit amet consectetur adipiscing elit</small></div>
      <div class="btt-sec">💡 Секція: Навички<br><small>HTML, CSS, JavaScript, Grid, Flexbox, DOM, Canvas</small></div>
      <div class="btt-sec">🗂 Секція: Проекти<br><small>Pixel Quest, ToDo App, Портфоліо-сайт</small></div>
      <div class="btt-sec">📧 Секція: Контакти<br><small>alina@example.com · GitHub · LinkedIn</small></div>
    </div>

    <div class="scroll-indicator" id="scroll-pct">Прокрутка: 0%</div>
  </div>

  <!-- Кнопка back-to-top -->
  <button class="back-top" id="back-top" onclick="scrollToTop()">↑</button>
</div>`,
    `${BASE}
.btt-demo{max-width:520px;position:relative}
.btt-page-content{max-height:400px;overflow-y:auto;padding-right:8px}
h2{font-size:18px;margin-bottom:16px}
.btt-sections{display:flex;flex-direction:column;gap:12px;margin-bottom:16px}
.btt-sec{background:#111827;border:1px solid #374151;border-radius:12px;padding:20px;font-size:14px}
.btt-sec small{color:#6b7280;font-size:12px;display:block;margin-top:4px}
.scroll-indicator{background:#111827;border:1px solid #374151;border-radius:8px;padding:10px;text-align:center;font-size:13px;color:#9ca3af}

.back-top{position:absolute;bottom:12px;right:12px;width:44px;height:44px;border-radius:50%;background:#6366f1;color:#fff;font-size:20px;border:none;cursor:pointer;opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s;z-index:9;box-shadow:0 4px 14px rgba(99,102,241,.4)}
.back-top.visible{opacity:1;transform:translateY(0)}
.back-top:hover{filter:brightness(1.15)}`,
    `const content = document.getElementById('btt-content');
const btn     = document.getElementById('back-top');
const pctEl   = document.getElementById('scroll-pct');

content.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = content;
  const pct = Math.round(scrollTop / (scrollHeight - clientHeight) * 100);
  pctEl.textContent = 'Прокрутка: ' + pct + '%';
  btn.classList.toggle('visible', scrollTop > 60);
});

function scrollToTop() {
  content.scrollTo({ top: 0, behavior: 'smooth' });
}`,
    [
      { level:'easy',   uk:'Прокрути блок вниз — з\'явиться кнопка ↑. Натисни її — плавно повернешся нагору.',  ru:'Прокрути блок вниз — появится кнопка ↑. Нажми её — плавно вернёшься наверх.' },
      { level:'medium', uk:'Додай прогрес-бар прокрутки: фіксований div зверху з width:pct+"%", height:3px, background:#6366f1.',  ru:'Добавь прогресс-бар прокрутки: fixed div сверху с width:pct+"%" и background:#6366f1.' },
      { level:'hard',   uk:'Зміни кнопку: при натисканні вона повертається на 360deg (classList.add("spinning"), CSS @keyframes spin360).',  ru:'Измени кнопку: при нажатии она поворачивается на 360deg через CSS @keyframes.' },
    ]
  );

  /* ─── 12-12 ──────────────────────────────────────────────── */
  patch('12-12',
    { uk:`<h2>Перевірка на мобільному (Chrome DevTools)</h2>
<p>Перш ніж публікувати — обов'язково перевір сайт на різних розмірах екранів.</p>
<h3>Як відкрити режим пристрою</h3>
<ol>
  <li>Натисни <kbd>F12</kbd> → іконка 📱 зверху ліворуч</li>
  <li>Або <kbd>Ctrl+Shift+M</kbd></li>
</ol>
<h3>Що перевірити (Портфоліо-чеклист)</h3>
<ul>
  <li>📱 375px — iPhone SE: читається текст? кнопки доступні?</li>
  <li>📲 768px — iPad: layout правильний?</li>
  <li>💻 1280px — ноутбук: повний дизайн?</li>
  <li>🚫 Горизонтальний скрол відсутній?</li>
  <li>🔘 Кнопки ≥44px для тапу?</li>
  <li>🎨 Тема перемикається?</li>
  <li>⚡ Форма валідує коректно?</li>
  <li>📊 Консоль без помилок?</li>
</ul>`,
      ru:`<h2>Проверка на мобильном (Chrome DevTools)</h2>
<ol>
  <li>Нажми <kbd>F12</kbd> → иконка 📱</li>
  <li>Или <kbd>Ctrl+Shift+M</kbd></li>
</ol>
<h3>Что проверить</h3>
<ul>
  <li>📱 375px — iPhone SE</li>
  <li>📲 768px — iPad</li>
  <li>💻 1280px — ноутбук</li>
  <li>🚫 Горизонтальный скролл отсутствует?</li>
  <li>🔘 Кнопки ≥44px?</li>
  <li>📊 Консоль без ошибок?</li>
</ul>` },
    `<div class="mob-check">
  <h2>📱 Мобільна перевірка портфоліо</h2>

  <div class="device-tabs">
    <button class="dt-btn active" onclick="setDevice(375,'iPhone SE',this)">📱 375px</button>
    <button class="dt-btn" onclick="setDevice(768,'iPad',this)">📲 768px</button>
    <button class="dt-btn" onclick="setDevice(1024,'Ноутбук',this)">💻 1024px</button>
  </div>

  <div class="device-frame" id="device-frame">
    <div class="df-bar">
      <span class="df-dots">●●●</span>
      <span id="df-label">iPhone SE · 375px</span>
    </div>
    <div class="df-content" id="df-content">
      <!-- Міні-версія портфоліо для перегляду -->
      <div class="mini-pf">
        <div class="mini-header">
          <span>👩‍💻 АК</span>
          <span id="mini-burger">☰</span>
        </div>
        <div class="mini-hero" id="mini-hero">
          <div class="mini-av">👩‍💻</div>
          <div>
            <h3>Аліна К.</h3>
            <p>Web Developer</p>
            <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
              <button class="mini-btn1">Проекти</button>
              <button class="mini-btn2">Контакт</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="check-grid" id="check-grid">
    <div class="cg-item"><input type="checkbox" id="ck-1"><label for="ck-1">Текст читається на 375px</label></div>
    <div class="cg-item"><input type="checkbox" id="ck-2"><label for="ck-2">Немає горизонтального скролу</label></div>
    <div class="cg-item"><input type="checkbox" id="ck-3"><label for="ck-3">Гамбургер відкриває nav</label></div>
    <div class="cg-item"><input type="checkbox" id="ck-4"><label for="ck-4">Кнопки зручні для тапу (≥44px)</label></div>
    <div class="cg-item"><input type="checkbox" id="ck-5"><label for="ck-5">Картки проектів в 1 колонку</label></div>
    <div class="cg-item"><input type="checkbox" id="ck-6"><label for="ck-6">Форма працює на телефоні</label></div>
    <div class="cg-item"><input type="checkbox" id="ck-7"><label for="ck-7">Тема перемикається</label></div>
    <div class="cg-item"><input type="checkbox" id="ck-8"><label for="ck-8">Консоль без помилок</label></div>
  </div>
  <div class="ck-result" id="ck-result">0 / 8 перевірено</div>
</div>`,
    `${BASE}
.mob-check{max-width:500px}
.device-tabs{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.dt-btn{padding:7px 14px;font-size:13px}
.dt-btn.active{border-color:#6366f1;color:#a5b4fc;background:rgba(99,102,241,.1)}
.device-frame{border:2px solid #374151;border-radius:12px;overflow:hidden;margin-bottom:16px;transition:max-width .4s}
.df-bar{background:#111827;padding:10px 14px;display:flex;align-items:center;gap:10px;font-size:12px;color:#6b7280}
.df-dots{color:#ef4444;letter-spacing:-2px;font-size:16px}
.df-content{background:#030712;min-height:200px;padding:0}
.mini-pf{}
.mini-header{background:#111827;display:flex;justify-content:space-between;align-items:center;padding:10px 14px;font-size:14px;font-weight:700}
.mini-hero{padding:16px;display:flex;align-items:flex-start;gap:12px}
.mini-av{font-size:36px}
.mini-hero h3{font-size:15px;font-weight:700;margin-bottom:2px}
.mini-hero p{font-size:12px;color:#9ca3af}
.mini-btn1{background:#6366f1;border:none;color:#fff;padding:7px 14px;border-radius:7px;font-size:12px;cursor:pointer}
.mini-btn2{background:none;border:2px solid #6366f1;color:#6366f1;padding:5px 12px;border-radius:7px;font-size:12px;cursor:pointer}
.check-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px}
.cg-item{background:#111827;border:1px solid #1f2937;border-radius:8px;padding:10px 12px;display:flex;align-items:center;gap:8px;font-size:12px}
.cg-item input[type=checkbox]{accent-color:#6366f1;cursor:pointer;width:15px;height:15px;margin:0;flex-shrink:0}
.cg-item label{cursor:pointer;color:#9ca3af;line-height:1.3}
.cg-item input:checked+label{color:#4ade80}
.ck-result{background:#111827;border:1px solid #374151;border-radius:8px;padding:10px;text-align:center;font-size:13px;font-weight:600}`,
    `function setDevice(w, label, btn) {
  document.querySelectorAll('.dt-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const frame = document.getElementById('device-frame');
  frame.style.maxWidth = w < 600 ? w+'px' : '100%';
  document.getElementById('df-label').textContent = label + ' · ' + w + 'px';

  // Адаптуємо міні-hero
  const hero = document.getElementById('mini-hero');
  hero.style.flexDirection = w < 480 ? 'column' : 'row';
}

document.querySelectorAll('.cg-item input').forEach(cb => {
  cb.addEventListener('change', updateCK);
});

function updateCK() {
  const done  = document.querySelectorAll('.cg-item input:checked').length;
  const total = document.querySelectorAll('.cg-item input').length;
  const res   = document.getElementById('ck-result');
  res.textContent = done + ' / ' + total + ' перевірено';
  if (done === total) { res.style.color='#4ade80'; res.textContent='🎉 Мобільна перевірка пройдена!'; }
}`,
    [
      { level:'easy',   uk:'Клікай на кнопки 375px/768px/1024px і дивись як змінюється рамка пристрою. Відмічай пройдені пункти.',  ru:'Кликай на кнопки 375px/768px/1024px и смотри как меняется рамка. Отмечай пройденные пункты.' },
      { level:'medium', uk:'Додай кнопку "320px" (дуже маленький телефон) і перевір чи все вміщується.',  ru:'Добавь кнопку "320px" (очень маленький телефон) и проверь всё ли вмещается.' },
      { level:'hard',   uk:'Збережи стан чеклисту у localStorage: ключ "mob-check", значення — масив id відмічених чекбоксів.',  ru:'Сохрани состояние чеклиста в localStorage: ключ "mob-check".' },
    ]
  );

  /* ─── 12-13 ──────────────────────────────────────────────── */
  patch('12-13',
    { uk:`<h2>Lighthouse: продуктивність та доступність</h2>
<p>Lighthouse — безкоштовний інструмент Google у Chrome DevTools для аудиту якості сайту.</p>
<h3>Як запустити</h3>
<ol>
  <li>F12 → вкладка "Lighthouse"</li>
  <li>Вибери: Performance, Accessibility, Best Practices, SEO</li>
  <li>Натисни "Analyze page load"</li>
</ol>
<h3>4 показники (0-100)</h3>
<ul>
  <li>⚡ <strong>Performance</strong> — швидкість завантаження. Ціль: ≥90</li>
  <li>♿ <strong>Accessibility</strong> — доступність для людей з обмеженими можливостями. Ціль: 100</li>
  <li>✅ <strong>Best Practices</strong> — дотримання стандартів. Ціль: ≥90</li>
  <li>🔍 <strong>SEO</strong> — оптимізація для пошукових систем. Ціль: 100</li>
</ul>
<h3>Часті рекомендації Lighthouse</h3>
<pre>// ♿ Accessibility:
&lt;img src="photo.jpg" alt="Опис"&gt;  // alt завжди!
&lt;button aria-label="Закрити"&gt;✕&lt;/button&gt;

// 🔍 SEO:
&lt;meta name="description" content="..."&gt;
&lt;html lang="uk"&gt;  // атрибут мови!

// ⚡ Performance:
&lt;img loading="lazy" src="..."&gt;  // ліниве завантаження</pre>`,
      ru:`<h2>Lighthouse: производительность и доступность</h2>
<h3>Как запустить</h3>
<ol>
  <li>F12 → вкладка "Lighthouse"</li>
  <li>Нажми "Analyze page load"</li>
</ol>
<h3>4 показателя</h3>
<ul>
  <li>⚡ Performance ≥90</li>
  <li>♿ Accessibility = 100</li>
  <li>✅ Best Practices ≥90</li>
  <li>🔍 SEO = 100</li>
</ul>
<pre>&lt;img alt="Опис"&gt;
&lt;html lang="uk"&gt;
&lt;meta name="description" content="..."&gt;</pre>` },
    `<div class="lh-demo">
  <h2>🔍 Симулятор Lighthouse</h2>
  <p>Перевір свій "сайт" за критеріями Lighthouse:</p>

  <div class="lh-checks">
    <div class="lhc-group">
      <h3>⚡ Performance</h3>
      <div class="lhc-item"><input type="checkbox" id="lh-1"><label for="lh-1">Зображення: loading="lazy"</label></div>
      <div class="lhc-item"><input type="checkbox" id="lh-2"><label for="lh-2">CSS і JS мінімальні (немає зайвого)</label></div>
      <div class="lhc-item"><input type="checkbox" id="lh-3"><label for="lh-3">Немає великих зображень (>500KB)</label></div>
    </div>

    <div class="lhc-group">
      <h3>♿ Accessibility</h3>
      <div class="lhc-item"><input type="checkbox" id="lh-4"><label for="lh-4">Всі img мають атрибут alt=""</label></div>
      <div class="lhc-item"><input type="checkbox" id="lh-5"><label for="lh-5">Кнопки мають aria-label або текст</label></div>
      <div class="lhc-item"><input type="checkbox" id="lh-6"><label for="lh-6">Контраст тексту до фону ≥4.5:1</label></div>
    </div>

    <div class="lhc-group">
      <h3>🔍 SEO</h3>
      <div class="lhc-item"><input type="checkbox" id="lh-7"><label for="lh-7">&lt;html lang="uk"&gt; є</label></div>
      <div class="lhc-item"><input type="checkbox" id="lh-8"><label for="lh-8">&lt;meta name="description"&gt; є</label></div>
      <div class="lhc-item"><input type="checkbox" id="lh-9"><label for="lh-9">&lt;title&gt; описовий і унікальний</label></div>
    </div>

    <div class="lhc-group">
      <h3>✅ Best Practices</h3>
      <div class="lhc-item"><input type="checkbox" id="lh-10"><label for="lh-10">HTTPS (на GitHub Pages є автоматично)</label></div>
      <div class="lhc-item"><input type="checkbox" id="lh-11"><label for="lh-11">Viewport meta-тег є</label></div>
      <div class="lhc-item"><input type="checkbox" id="lh-12"><label for="lh-12">Немає помилок у консолі</label></div>
    </div>
  </div>

  <div class="lh-score-panel" id="lh-score-panel">
    <div class="lh-score" id="lh-perf"><div class="ls-num">0</div><div class="ls-lbl">Performance</div></div>
    <div class="lh-score" id="lh-acc"><div class="ls-num">0</div><div class="ls-lbl">Accessibility</div></div>
    <div class="lh-score" id="lh-seo"><div class="ls-num">0</div><div class="ls-lbl">SEO</div></div>
    <div class="lh-score" id="lh-bp"><div class="ls-num">0</div><div class="ls-lbl">Best Practices</div></div>
  </div>
</div>`,
    `${BASE}
.lh-demo{max-width:520px}
p{font-size:13px;color:#9ca3af;margin-bottom:16px}
.lh-checks{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.lhc-group{background:#111827;border:1px solid #1f2937;border-radius:12px;padding:14px}
.lhc-group h3{font-size:13px;margin-bottom:10px}
.lhc-item{display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid #1f2937;font-size:12px}
.lhc-item:last-child{border-bottom:none;padding-bottom:0}
.lhc-item input[type=checkbox]{accent-color:#6366f1;cursor:pointer;margin:2px 0 0;flex-shrink:0;width:14px;height:14px}
.lhc-item label{cursor:pointer;color:#9ca3af;line-height:1.4}
.lhc-item input:checked+label{color:#4ade80}
.lh-score-panel{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.lh-score{background:#111827;border:2px solid #1f2937;border-radius:12px;padding:14px;text-align:center;transition:.4s}
.ls-num{font-size:28px;font-weight:900;font-family:monospace;margin-bottom:4px;transition:color .4s}
.ls-lbl{font-size:10px;color:#6b7280;letter-spacing:.05em}`,
    `const MAPPING = {
  perf: [1,2,3], acc: [4,5,6], seo: [7,8,9], bp: [10,11,12]
};

function updateScores() {
  Object.entries(MAPPING).forEach(([key, ids]) => {
    const done = ids.filter(id => document.getElementById('lh-'+id).checked).length;
    const score = Math.round(done / ids.length * 100);
    const el = document.getElementById('lh-'+key);
    const num = el.querySelector('.ls-num');
    num.textContent = score;
    const color = score >= 90 ? '#4ade80' : score >= 50 ? '#fbbf24' : '#f87171';
    num.style.color = color;
    el.style.borderColor = color;
  });
}

document.querySelectorAll('.lhc-item input').forEach(cb => {
  cb.addEventListener('change', updateScores);
});
updateScores();`,
    [
      { level:'easy',   uk:'Відмічай критерії по одному і дивись як зростають "бали" Lighthouse.',  ru:'Отмечай критерии по одному и смотри как растут "баллы" Lighthouse.' },
      { level:'medium', uk:'Відкрий реальний Lighthouse у Chrome DevTools і запусти аудит будь-якого свого сайту.',  ru:'Открой реальный Lighthouse в Chrome DevTools и запусти аудит любого своего сайта.' },
      { level:'hard',   uk:'Додай до code-прикладів у теорії кнопку "Скопіювати" (clipboard API): navigator.clipboard.writeText(text).',  ru:'Добавь к примерам кода кнопку "Скопировать" через navigator.clipboard.writeText(text).' },
    ]
  );

  /* ─── 12-14 ──────────────────────────────────────────────── */
  patch('12-14',
    { uk:`<h2>Оптимізація зображень: стиснення та формат WebP</h2>
<p>Зображення — найбільша причина повільного завантаження. Правильна оптимізація прискорює сайт у 2-5 разів.</p>
<h3>Формати зображень</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:10px 0">
  <tr style="color:#9ca3af"><th style="padding:6px;text-align:left">Формат</th><th>Де використовувати</th><th>Розмір</th></tr>
  <tr><td style="padding:6px"><code>WebP</code></td><td>Фото, скріншоти (2024)</td><td>✅ Найменший</td></tr>
  <tr style="background:rgba(99,102,241,.06)"><td style="padding:6px"><code>JPG</code></td><td>Фото, реалістичні зображення</td><td>⚠️ Середній</td></tr>
  <tr><td style="padding:6px"><code>PNG</code></td><td>Прозорість, скріншоти</td><td>❌ Великий</td></tr>
  <tr style="background:rgba(99,102,241,.06)"><td style="padding:6px"><code>SVG</code></td><td>Іконки, логотипи, ілюстрації</td><td>✅ Мінімальний</td></tr>
</table>
<h3>Корисні інструменти (безкоштовні)</h3>
<ul>
  <li>🔧 <strong>Squoosh</strong> (squoosh.app) — стиснення у браузері</li>
  <li>🔧 <strong>TinyPNG</strong> (tinypng.com) — пакетне стиснення PNG/JPG</li>
  <li>🔧 <strong>SVGOMG</strong> (jakearchibald.github.io/svgomg) — мінімізація SVG</li>
</ul>
<h3>HTML атрибути для оптимізації</h3>
<pre>&lt;img
  src="photo.webp"         // WebP формат
  alt="Опис фото"          // доступність
  loading="lazy"           // лінь-завантаження
  width="800" height="600" // зарезервує місце
&gt;</pre>`,
      ru:`<h2>Оптимизация изображений: сжатие и формат WebP</h2>
<table style="width:100%;border-collapse:collapse;font-size:13px">
  <tr style="color:#9ca3af"><th style="padding:6px;text-align:left">Формат</th><th>Где использовать</th></tr>
  <tr><td style="padding:6px">WebP</td><td>✅ Фото — самый маленький</td></tr>
  <tr><td style="padding:6px">JPG</td><td>⚠️ Реалистичные изображения</td></tr>
  <tr><td style="padding:6px">PNG</td><td>❌ Прозрачность — большой</td></tr>
  <tr><td style="padding:6px">SVG</td><td>✅ Иконки — минимальный</td></tr>
</table>
<pre>&lt;img src="photo.webp" alt="Опис" loading="lazy" width="800" height="600"&gt;</pre>` },
    `<div class="img-opt-demo">
  <h2>🖼 Оптимізація зображень</h2>

  <div class="size-compare">
    <h3>Розмір одного і того ж фото:</h3>
    <div class="sc-bars">
      <div class="sc-row">
        <div class="sc-label">PNG <span class="sc-tag bad">Велике</span></div>
        <div class="sc-bar-wrap"><div class="sc-bar" style="width:100%;background:#ef4444">2.4 MB</div></div>
      </div>
      <div class="sc-row">
        <div class="sc-label">JPG 80% <span class="sc-tag warn">Середнє</span></div>
        <div class="sc-bar-wrap"><div class="sc-bar" style="width:37.5%;background:#f59e0b">900 KB</div></div>
      </div>
      <div class="sc-row">
        <div class="sc-label">WebP <span class="sc-tag good">Найкраще</span></div>
        <div class="sc-bar-wrap"><div class="sc-bar" style="width:20.8%;background:#059669">500 KB</div></div>
      </div>
      <div class="sc-row">
        <div class="sc-label">WebP+Squoosh <span class="sc-tag good">Ідеал</span></div>
        <div class="sc-bar-wrap"><div class="sc-bar" style="width:8.3%;background:#6366f1">200 KB</div></div>
      </div>
    </div>
  </div>

  <div class="checklist-opt">
    <h3>Чеклист оптимізації зображень:</h3>
    <label><input type="checkbox"> Конвертував PNG → WebP (зекономив ~70%)</label>
    <label><input type="checkbox"> Додав loading="lazy" до всіх img</label>
    <label><input type="checkbox"> Додав alt="" до кожного зображення</label>
    <label><input type="checkbox"> Вказав width і height атрибути</label>
    <label><input type="checkbox"> Іконки — SVG замість PNG</label>
    <label><input type="checkbox"> Стиснув через Squoosh або TinyPNG</label>
  </div>

  <div class="load-demo">
    <h3>Демо: lazy loading</h3>
    <div class="ld-hint">Зображення нижче завантажується лише коли потрапляє у вікно (loading="lazy"):</div>
    <div class="lazy-placeholder" id="lazy-ph">
      <div class="lp-spinner"></div>
      <span>🖼 Зображення завантажується...</span>
    </div>
    <button onclick="simulateLazy()">↓ Симулювати появу</button>
  </div>
</div>`,
    `${BASE}
.img-opt-demo{max-width:520px}
.size-compare{background:#111827;border-radius:12px;padding:16px;margin-bottom:16px}
.sc-bars{display:flex;flex-direction:column;gap:10px;margin-top:10px}
.sc-row{display:flex;align-items:center;gap:10px}
.sc-label{min-width:160px;font-size:12px;color:#d1d5db;display:flex;align-items:center;gap:6px;flex-shrink:0}
.sc-tag{padding:2px 8px;border-radius:20px;font-size:10px}
.bad{background:rgba(239,68,68,.15);color:#f87171}
.warn{background:rgba(245,158,11,.15);color:#fbbf24}
.good{background:rgba(5,150,105,.15);color:#4ade80}
.sc-bar-wrap{flex:1;background:#1f2937;border-radius:4px;height:24px;overflow:hidden}
.sc-bar{height:100%;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;font-size:11px;color:#fff;font-weight:600;border-radius:4px;white-space:nowrap}
.checklist-opt{background:#111827;border-radius:12px;padding:16px;margin-bottom:16px;display:flex;flex-direction:column;gap:8px}
.checklist-opt label{display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer;color:#9ca3af;padding:4px 0}
.checklist-opt input[type=checkbox]{accent-color:#6366f1;margin:0;cursor:pointer;width:15px;height:15px;flex-shrink:0}
.load-demo{background:#111827;border-radius:12px;padding:16px}
.ld-hint{font-size:12px;color:#6b7280;margin-bottom:12px}
.lazy-placeholder{background:#1f2937;border:2px dashed #374151;border-radius:10px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#9ca3af;font-size:13px;margin-bottom:10px;transition:all .4s}
.lazy-placeholder.loaded{background:linear-gradient(135deg,#1e1b4b,#4c1d95);border-style:solid;border-color:#6366f1;color:#f9fafb;font-size:32px}
@keyframes spin360{to{transform:rotate(360deg)}}
.lp-spinner{width:24px;height:24px;border-radius:50%;border:3px solid #374151;border-top-color:#6366f1;animation:spin360 .8s linear infinite}`,
    `function simulateLazy() {
  const ph = document.getElementById('lazy-ph');
  ph.innerHTML = '<div class="lp-spinner"></div><span>Завантаження...</span>';
  setTimeout(() => {
    ph.classList.add('loaded');
    ph.innerHTML = '🖼<br><small style="font-size:13px">photo.webp · 200KB · lazy</small>';
  }, 800);
}`,
    [
      { level:'easy',   uk:'Натисни "Симулювати появу" і поспостерігай за lazy-loading. Відмічай пункти чеклисту.',  ru:'Нажми "Симулировать появу" и понаблюдай за lazy-loading. Отмечай пункты чеклиста.' },
      { level:'medium', uk:'Знайди в проекті Pixel Quest або ToDo будь-яке зображення чи emoji, і додай до нього атрибути alt="" і loading="lazy".',  ru:'Найди в любом своём проекте изображение и добавь к нему alt="" и loading="lazy".' },
      { level:'hard',   uk:'Зроби реальний IntersectionObserver для .lazy-placeholder: при появі у вікні автоматично викликай simulateLazy().',  ru:'Сделай реальный IntersectionObserver для .lazy-placeholder: при появлении в окне автоматически вызывай simulateLazy().' },
    ]
  );

  /* ─── 12-15 ──────────────────────────────────────────────── */
  patch('12-15',
    { uk:`<h2>GitHub Pages: публікація сайту безкоштовно</h2>
<p>GitHub Pages дозволяє опублікувати HTML-сайт безкоштовно і отримати посилання виду <code>username.github.io/project</code>.</p>
<h3>Кроки публікації</h3>
<ol>
  <li>Зареєструйся на <strong>github.com</strong></li>
  <li>Створи новий репозиторій (Repository → New)</li>
  <li>Завантаж файли свого сайту (Upload files)</li>
  <li>Settings → Pages → Source: Deploy from branch → main</li>
  <li>Чекай 1-2 хвилини → з'явиться посилання!</li>
</ol>
<h3>Або через Git (для досвідчених)</h3>
<pre>git init
git add .
git commit -m "Мій портфоліо"
git remote add origin https://github.com/user/portfolio.git
git push -u origin main</pre>
<h3>Важливо</h3>
<ul>
  <li>Головний файл: <code>index.html</code> (обов'язково!)</li>
  <li>HTTPS автоматично — безкоштовно</li>
  <li>Кастомний домен: можна додати (Settings → Pages → Custom domain)</li>
</ul>`,
      ru:`<h2>GitHub Pages: публикация сайта бесплатно</h2>
<ol>
  <li>Зарегистрируйся на github.com</li>
  <li>Создай новый репозиторий</li>
  <li>Загрузи файлы сайта (Upload files)</li>
  <li>Settings → Pages → Source: main</li>
  <li>Жди 1-2 минуты → появится ссылка!</li>
</ol>
<pre>git init; git add .; git commit -m "Портфоліо"
git push -u origin main</pre>` },
    `<div class="ghp-guide">
  <h2>🚀 Публікуємо на GitHub Pages</h2>

  <div class="ghp-steps">
    <div class="ghp-step" id="gs-1">
      <div class="gs-num active">1</div>
      <div class="gs-body">
        <h3>Реєстрація на GitHub</h3>
        <p>Перейди на <b>github.com</b> → Sign up → заповни форму → підтверди email.</p>
        <div class="gs-url">🔗 github.com/signup</div>
        <button class="gs-done" onclick="stepDone(1)">✅ Готово</button>
      </div>
    </div>

    <div class="ghp-step" id="gs-2">
      <div class="gs-num">2</div>
      <div class="gs-body">
        <h3>Новий репозиторій</h3>
        <p>Клікни "+" → "New repository" → Назва: <code>portfolio</code> → Public → Create.</p>
        <button class="gs-done" onclick="stepDone(2)">✅ Готово</button>
      </div>
    </div>

    <div class="ghp-step" id="gs-3">
      <div class="gs-num">3</div>
      <div class="gs-body">
        <h3>Завантаж файли</h3>
        <p>У репозиторії: "Add file" → "Upload files" → перетягни всі файли → Commit changes.</p>
        <div class="gs-files">
          <span class="gf">index.html</span>
          <span class="gf">style.css</span>
          <span class="gf">script.js</span>
        </div>
        <button class="gs-done" onclick="stepDone(3)">✅ Готово</button>
      </div>
    </div>

    <div class="ghp-step" id="gs-4">
      <div class="gs-num">4</div>
      <div class="gs-body">
        <h3>Увімкни GitHub Pages</h3>
        <p>Settings → Pages → Source: "Deploy from branch" → Branch: main → Save.</p>
        <div class="gs-img">⚙️ Settings → 📄 Pages → main → Save</div>
        <button class="gs-done" onclick="stepDone(4)">✅ Готово</button>
      </div>
    </div>

    <div class="ghp-step" id="gs-5">
      <div class="gs-num">5</div>
      <div class="gs-body">
        <h3>Твій сайт онлайн! 🎉</h3>
        <p>Через 1-2 хвилини з'явиться посилання:</p>
        <div class="gs-url" id="gs-link">https://username.github.io/portfolio</div>
        <button class="gs-done" onclick="stepDone(5)" style="background:linear-gradient(135deg,#059669,#10b981)">🚀 Опубліковано!</button>
      </div>
    </div>
  </div>

  <div class="ghp-progress">
    <div class="gp-bar"><div class="gp-fill" id="gp-fill" style="width:0"></div></div>
    <div class="gp-label" id="gp-label">0 / 5 кроків</div>
  </div>
</div>`,
    `${BASE}
.ghp-guide{max-width:500px}
.ghp-steps{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}
.ghp-step{display:flex;gap:14px;background:#111827;border:1px solid #1f2937;border-radius:12px;padding:16px;transition:.3s}
.ghp-step.done{border-color:#059669;background:rgba(5,150,105,.06)}
.gs-num{width:32px;height:32px;border-radius:50%;background:#1f2937;border:2px solid #374151;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;transition:.3s}
.gs-num.active{border-color:#6366f1;background:rgba(99,102,241,.15);color:#a5b4fc}
.gs-num.done{border-color:#059669;background:rgba(5,150,105,.2);color:#4ade80}
.gs-body h3{font-size:14px;margin-bottom:6px}
.gs-body p{font-size:13px;color:#9ca3af;margin-bottom:8px;line-height:1.5}
.gs-url{background:#1f2937;border-radius:6px;padding:6px 10px;font-size:12px;font-family:monospace;color:#a5b4fc;margin-bottom:8px}
.gs-files{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.gf{background:#1f2937;border:1px solid #374151;border-radius:6px;padding:3px 10px;font-size:11px;font-family:monospace;color:#d1d5db}
.gs-img{background:#1f2937;border-radius:6px;padding:8px 12px;font-size:12px;color:#9ca3af;margin-bottom:8px}
.gs-done{background:#111827;border:1px solid #374151;color:#9ca3af;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
.gs-done:hover{border-color:#059669;color:#4ade80}
.ghp-progress{background:#111827;border-radius:10px;padding:14px}
.gp-bar{background:#1f2937;border-radius:6px;height:8px;overflow:hidden;margin-bottom:6px}
.gp-fill{height:100%;background:linear-gradient(to right,#6366f1,#059669);transition:width .5s}
.gp-label{font-size:13px;color:#9ca3af;text-align:center}`,
    `let doneCount = 0;
function stepDone(n) {
  const step = document.getElementById('gs-' + n);
  step.classList.add('done');
  step.querySelector('.gs-num').className = 'gs-num done';
  if (n < 5) document.querySelector('#gs-' + (n+1) + ' .gs-num').classList.add('active');
  if (!step.dataset.counted) { step.dataset.counted='1'; doneCount++; }
  const pct = doneCount / 5 * 100;
  document.getElementById('gp-fill').style.width = pct + '%';
  document.getElementById('gp-label').textContent = doneCount + ' / 5 кроків' + (doneCount===5?' · 🎉 Сайт опубліковано!':'');
}`,
    [
      { level:'easy',   uk:'Пройди покроковий гід — натискай "✅ Готово" після кожного кроку.',  ru:'Пройди пошаговый гайд — нажимай "✅ Готово" после каждого шага.' },
      { level:'medium', uk:'Зміни URL у #gs-link на свій реальний GitHub username: https://ТВІЙ_НІК.github.io/portfolio.',  ru:'Измени URL в #gs-link на свой реальный GitHub username: https://ТВІй_НІК.github.io/portfolio.' },
      { level:'hard',   uk:'Додай кнопку "Скопіювати URL" що копіює текст gs-link у буфер обміну: navigator.clipboard.writeText(url).',  ru:'Добавь кнопку "Скопировать URL" через navigator.clipboard.writeText(url).' },
    ]
  );

  /* ─── 12-16 ──────────────────────────────────────────────── */
  patch('12-16',
    { uk:`<h2>Підготовка до захисту: план презентації</h2>
<p>Захист портфоліо — це коротка (3-5 хвилин) презентація де ти показуєш і розповідаєш про свій сайт.</p>
<h3>Структура презентації (3 хвилини)</h3>
<ol>
  <li>⏱ <strong>0:00–0:30</strong> — Привітання і представлення</li>
  <li>⏱ <strong>0:30–1:30</strong> — Показ сайту (live demo)</li>
  <li>⏱ <strong>1:30–2:30</strong> — Пояснення технічних рішень</li>
  <li>⏱ <strong>2:30–3:00</strong> — Що навчився і плани</li>
</ol>
<h3>Корисні фрази для захисту</h3>
<ul>
  <li>"Я використав <code>CSS Grid</code> для адаптивної сітки карток..."</li>
  <li>"Дані зберігаються у <code>localStorage</code> навіть після закриття..."</li>
  <li>"Найважче було реалізувати <code>IntersectionObserver</code>..."</li>
  <li>"Я навчився як працює <code>Canvas API</code>..."</li>
</ul>`,
      ru:`<h2>Подготовка к защите: план презентации</h2>
<h3>Структура (3 минуты)</h3>
<ol>
  <li>0:00–0:30 — Приветствие и представление</li>
  <li>0:30–1:30 — Показ сайта (live demo)</li>
  <li>1:30–2:30 — Объяснение технических решений</li>
  <li>2:30–3:00 — Что научился и планы</li>
</ol>` },
    `<div class="pres-prep">
  <h2>🎤 Підготовка до захисту</h2>

  <div class="pres-timer">
    <div class="pt-display" id="pt-display">3:00</div>
    <div class="pt-label">Таймер для репетиції</div>
    <div class="pt-btns">
      <button onclick="startPT()">▶ Старт</button>
      <button onclick="resetPT()">🔄 Скинути</button>
    </div>
  </div>

  <div class="pres-script">
    <h3>📝 Мій сценарій (заповни):</h3>
    <div class="ps-block">
      <div class="psb-num">1</div>
      <div>
        <div class="psb-title">Привітання (0:00–0:30)</div>
        <textarea class="psb-text" id="pt-1" placeholder="Привіт! Мене звати ___ і я хочу представити своє портфоліо-сайт..." rows="2"></textarea>
      </div>
    </div>
    <div class="ps-block">
      <div class="psb-num">2</div>
      <div>
        <div class="psb-title">Live Demo (0:30–1:30)</div>
        <textarea class="psb-text" id="pt-2" placeholder="Ось мій сайт. Тут є секція Hero з анімацією, потім навички..." rows="2"></textarea>
      </div>
    </div>
    <div class="ps-block">
      <div class="psb-num">3</div>
      <div>
        <div class="psb-title">Технічні рішення (1:30–2:30)</div>
        <textarea class="psb-text" id="pt-3" placeholder="Я використав CSS Grid для карток, localStorage для рекордів..." rows="2"></textarea>
      </div>
    </div>
    <div class="ps-block">
      <div class="psb-num">4</div>
      <div>
        <div class="psb-title">Висновок (2:30–3:00)</div>
        <textarea class="psb-text" id="pt-4" placeholder="Найважчим було... Я навчився... Далі хочу вивчити..." rows="2"></textarea>
      </div>
    </div>
    <button onclick="saveScript()">💾 Зберегти сценарій</button>
  </div>
</div>`,
    `${BASE}
.pres-prep{max-width:500px}
.pres-timer{background:#111827;border:2px solid #6366f1;border-radius:14px;padding:20px;text-align:center;margin-bottom:20px}
.pt-display{font-size:52px;font-weight:900;font-family:monospace;color:#a5b4fc;margin-bottom:4px;transition:color .3s}
.pt-display.warn{color:#fbbf24;animation:pulse .5s ease infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.pt-label{font-size:13px;color:#6b7280;margin-bottom:12px}
.pt-btns{display:flex;gap:10px;justify-content:center}
.pres-script{background:#111827;border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:12px}
.pres-script h3{font-size:14px;color:#9ca3af;margin-bottom:4px}
.ps-block{display:flex;gap:10px;align-items:flex-start}
.psb-num{width:28px;height:28px;border-radius:50%;background:#6366f1;color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.psb-title{font-size:12px;color:#6366f1;margin-bottom:4px;font-weight:600}
.psb-text{background:#1f2937;border:1px solid #374151;color:#f9fafb;padding:8px 12px;border-radius:8px;font-size:13px;font-family:inherit;resize:vertical;width:100%;margin-bottom:0}
.psb-text:focus{outline:none;border-color:#6366f1}`,
    `let ptLeft = 180, ptTimer = null, ptRunning = false;
const ptEl = document.getElementById('pt-display');

function startPT() {
  if (ptRunning) return;
  ptRunning = true;
  ptTimer = setInterval(() => {
    ptLeft--;
    const m = Math.floor(ptLeft / 60);
    const s = String(ptLeft % 60).padStart(2,'0');
    ptEl.textContent = m + ':' + s;
    ptEl.className = 'pt-display' + (ptLeft <= 30 ? ' warn' : '');
    if (ptLeft <= 0) { clearInterval(ptTimer); ptRunning=false; ptEl.textContent='⏰'; }
  }, 1000);
}

function resetPT() {
  clearInterval(ptTimer); ptRunning=false; ptLeft=180;
  ptEl.textContent='3:00'; ptEl.className='pt-display';
}

function saveScript() {
  const data = {
    p1: document.getElementById('pt-1').value,
    p2: document.getElementById('pt-2').value,
    p3: document.getElementById('pt-3').value,
    p4: document.getElementById('pt-4').value,
  };
  localStorage.setItem('pf-pres-script', JSON.stringify(data));
  alert('✅ Сценарій збережено!');
}

// Відновлення
const saved = localStorage.getItem('pf-pres-script');
if (saved) {
  const d = JSON.parse(saved);
  ['1','2','3','4'].forEach(n => {
    if (d['p'+n]) document.getElementById('pt-'+n).value = d['p'+n];
  });
}`,
    [
      { level:'easy',   uk:'Запусти таймер і спробуй вимовити вголос своє привітання за 30 секунд.',  ru:'Запусти таймер и попробуй вслух произнести своё приветствие за 30 секунд.' },
      { level:'medium', uk:'Заповни всі 4 поля сценарію і натисни "Зберегти". Перезавантаж — сценарій збережено!',  ru:'Заполни все 4 поля сценария и нажми "Зберегти". Перезагрузи — сценарий сохранён!' },
      { level:'hard',   uk:'Додай кнопку "Надіслати вчителю" яка формує mailto-посилання з усіма полями сценарію: window.location.href="mailto:teacher@school.com?subject=Сценарій&body=...".',  ru:'Добавь кнопку "Отправить учителю" которая формирует mailto-ссылку со всеми полями сценария.' },
    ]
  );

  /* ─── 12-17 (ФІНАЛ) ─────────────────────────────────────── */
  patch('12-17',
    { uk:`<h2>ФІНАЛ 3: Захист портфоліо</h2>
<p>🎓 Ти досяг фінального рівня курсу «Веб-Старт»! Перед тобою — твоє повноцінне портфоліо-сайт із усіма навичками.</p>
<h3>Що ти вивчив за курс</h3>
<ul>
  <li>📄 Модулі 1-3 — HTML5 і CSS3, інтерактивність</li>
  <li>📐 Модулі 4-5 — Flexbox і CSS Grid</li>
  <li>✨ Модуль 6 — CSS Анімації</li>
  <li>🗂 Модуль 7 — Проект 1: Портфоліо</li>
  <li>⚡ Модулі 8-9 — JavaScript і DOM</li>
  <li>📱 Модуль 10 — Адаптивний дизайн</li>
  <li>🎮 Модуль 11 — Проект 2: Ігровий сайт</li>
  <li>🚀 Модуль 12 — Фінальне портфоліо</li>
</ul>
<p>Вивчи код у style.css і script.js — там зібрані всі техніки курсу в одному сайті!</p>`,
      ru:`<h2>ФИНАЛ 3: Защита портфолио</h2>
<p>🎓 Ты достиг финального уровня курса «Веб-Старт»!</p>
<h3>Что ты изучил за курс</h3>
<ul>
  <li>📄 Модули 1-3 — HTML5 и CSS3</li>
  <li>📐 Модули 4-5 — Flexbox и Grid</li>
  <li>✨ Модуль 6 — CSS Анимации</li>
  <li>🗂 Модуль 7 — Проект 1: Портфолио</li>
  <li>⚡ Модули 8-9 — JavaScript и DOM</li>
  <li>📱 Модуль 10 — Адаптив</li>
  <li>🎮 Модуль 11 — Игровой сайт</li>
  <li>🚀 Модуль 12 — Финальное портфолио</li>
</ul>` },
    `<!DOCTYPE html>
<html lang="uk" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Портфоліо — Аліна Коваленко, Junior Web Developer">
  <title>Аліна Коваленко | Web Developer</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Back to top -->
  <button class="back-top" id="back-top" aria-label="Прокрутити нагору">↑</button>

  <!-- Header -->
  <header class="header" id="header">
    <div class="container header-inner">
      <a href="#" class="logo">
        <div class="logo-av">AK</div>
        <div><span class="logo-nm">Аліна Коваленко</span><span class="logo-rl">Web Developer</span></div>
      </a>
      <nav class="nav" id="nav">
        <a href="#skills"   class="na" onclick="closeNav()">Навички</a>
        <a href="#projects" class="na" onclick="closeNav()">Проекти</a>
        <a href="#contact"  class="na" onclick="closeNav()">Контакти</a>
      </nav>
      <div class="hdr-r">
        <button class="theme-btn" id="theme-btn" aria-label="Тема">🌙</button>
        <button class="burger" id="burger" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-txt">
        <p class="hero-ey">👋 Привіт, я</p>
        <h1 class="hero-nm">Аліна Коваленко</h1>
        <p class="hero-rl">— <span class="typewr" id="typewr"></span></p>
        <p class="hero-desc">Створюю красиві та адаптивні сайти. 150 уроків курсу «Веб-Старт» — позаду!</p>
        <div class="hero-acts">
          <a href="#projects" class="btn-pr" onclick="scroll2(event,'#projects')">🗂 Мої проекти</a>
          <a href="#contact"  class="btn-sc" onclick="scroll2(event,'#contact')">📧 Зв'язатись</a>
        </div>
      </div>
      <div class="hero-av-w">
        <div class="hero-av">👩‍💻</div>
        <div class="hero-ring r1"></div>
        <div class="hero-ring r2"></div>
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section class="section bg2" id="skills">
    <div class="container">
      <h2 class="sec-h aos">💡 Мої навички</h2>
      <div class="skills-wrap">
        <div class="skill-bars-col">
          <div class="skill-r aos"><span>HTML5</span><div class="sb-tr"><div class="sb-fl" data-v="95" style="background:linear-gradient(to right,#f97316,#fb923c)"></div></div><span>95%</span></div>
          <div class="skill-r aos"><span>CSS3+Grid</span><div class="sb-tr"><div class="sb-fl" data-v="85" style="background:linear-gradient(to right,#3b82f6,#60a5fa)"></div></div><span>85%</span></div>
          <div class="skill-r aos"><span>JavaScript</span><div class="sb-tr"><div class="sb-fl" data-v="72" style="background:linear-gradient(to right,#f59e0b,#fbbf24)"></div></div><span>72%</span></div>
          <div class="skill-r aos"><span>Адаптив</span><div class="sb-tr"><div class="sb-fl" data-v="82" style="background:linear-gradient(to right,#6366f1,#a5b4fc)"></div></div><span>82%</span></div>
        </div>
        <div class="skill-tags-col">
          <span class="skt">🎨 Figma</span><span class="skt">🐙 Git</span>
          <span class="skt">💾 localStorage</span><span class="skt">🖼 Canvas</span>
          <span class="skt">🎵 Web Audio</span><span class="skt">📱 Adaptive</span>
          <span class="skt">♿ a11y</span><span class="skt">🔍 SEO basics</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects -->
  <section class="section" id="projects">
    <div class="container">
      <h2 class="sec-h aos">🗂 Мої проекти</h2>
      <div class="proj-grid">
        <div class="proj-c aos">
          <div class="proj-th" style="background:linear-gradient(135deg,#1e1b4b,#4c1d95)"><span class="pth-em">⚔️</span><div class="proj-ov"><a href="#" class="pov-btn">Live Demo →</a></div></div>
          <div class="proj-bd"><h3>Pixel Quest</h3><p>Ігровий RPG-сайт з Canvas, localStorage, таймером</p><div class="pt"><span>JS</span><span>Canvas</span><span>localStorage</span></div><div class="pls"><a href="#" class="pl-g">GitHub</a><a href="#" class="pl-l">Live →</a></div></div>
        </div>
        <div class="proj-c aos">
          <div class="proj-th" style="background:linear-gradient(135deg,#064e3b,#065f46)"><span class="pth-em">✅</span><div class="proj-ov" style="background:rgba(5,150,105,.88)"><a href="#" class="pov-btn">Live Demo →</a></div></div>
          <div class="proj-bd"><h3>ToDo App</h3><p>Список завдань з фільтрами, анімацією і localStorage</p><div class="pt"><span>HTML</span><span>CSS Flex</span><span>JS DOM</span></div><div class="pls"><a href="#" class="pl-g">GitHub</a><a href="#" class="pl-l">Live →</a></div></div>
        </div>
        <div class="proj-c aos">
          <div class="proj-th" style="background:linear-gradient(135deg,#1e3a5f,#1d4ed8)"><span class="pth-em">👩‍💻</span><div class="proj-ov" style="background:rgba(29,78,216,.88)"><a href="#" class="pov-btn">Live Demo →</a></div></div>
          <div class="proj-bd"><h3>Це Портфоліо</h3><p>Адаптивний сайт-візитка, scroll-анімації, теми</p><div class="pt"><span>HTML5</span><span>CSS Var</span><span>JS</span><span>Adaptive</span></div><div class="pls"><a href="#" class="pl-g">GitHub</a><a href="#" class="pl-l">Live →</a></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="section bg2" id="contact">
    <div class="container">
      <h2 class="sec-h aos">📧 Зв'яжись зі мною</h2>
      <div class="cont-w">
        <div class="cont-i aos">
          <p>Відкрита до нових проектів і стажування!</p>
          <div class="ci"><a href="mailto:alina@example.com" class="cl">📧 alina@example.com</a><a href="#" class="cl">🐙 github.com/alina</a><a href="#" class="cl">📍 Київ · Remote OK</a></div>
        </div>
        <form class="cont-f aos" onsubmit="sendF(event)">
          <input type="text"  id="fn" placeholder="Ваше ім'я *" required>
          <input type="email" id="fe" placeholder="Email *" required>
          <textarea id="fm" rows="3" placeholder="Повідомлення *" required></textarea>
          <button type="submit" id="fsb">📨 Надіслати</button>
        </form>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">© 2024 Аліна Коваленко · Зроблено на курсі Web Academy 8–11</div>
  </footer>

  <div class="toast" id="toast"></div>
  <script src="script.js"></script>
</body>
</html>`,
    `:root{--bg:#030712;--bg2:#111827;--br:#1f2937;--tx:#f9fafb;--mt:#9ca3af;--ac:#6366f1;--ag:rgba(99,102,241,.12)}
[data-theme=light]{--bg:#f9fafb;--bg2:#fff;--br:#e5e7eb;--tx:#030712;--mt:#6b7280;--ac:#6366f1;--ag:rgba(99,102,241,.08)}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--tx);transition:background .3s,color .3s}
.container{max-width:900px;margin:0 auto;padding:0 20px}
a{color:inherit}

/* Back to top */
.back-top{position:fixed;bottom:24px;right:24px;width:44px;height:44px;border-radius:50%;background:var(--ac);border:none;color:#fff;font-size:20px;cursor:pointer;opacity:0;transform:translateY(20px);transition:.3s;z-index:99;box-shadow:0 4px 16px rgba(99,102,241,.35)}
.back-top.vis{opacity:1;transform:translateY(0)}

/* Header */
.header{position:sticky;top:0;z-index:100;background:rgba(3,7,18,.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--br);transition:box-shadow .3s}
.header.sd{box-shadow:0 2px 20px rgba(0,0,0,.3)}
.header-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 20px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.logo-av{width:36px;height:36px;border-radius:50%;background:var(--ac);color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center;font-size:13px}
.logo-nm{display:block;font-weight:700;font-size:15px;color:var(--tx)}
.logo-rl{display:block;font-size:11px;color:var(--ac)}
.nav{display:none;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--bg2);border-bottom:1px solid var(--br);padding:10px 20px;gap:4px}
.nav.open{display:flex}
.na{color:var(--mt);text-decoration:none;padding:10px 12px;border-radius:8px;font-size:14px;transition:.2s}
.na:hover{color:var(--ac);background:var(--ag)}
.hdr-r{display:flex;gap:8px;align-items:center}
.theme-btn{background:none;border:1px solid var(--br);color:var(--tx);width:36px;height:36px;border-radius:8px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:.2s}
.theme-btn:hover{border-color:var(--ac)}
.burger{background:none;border:none;cursor:pointer;padding:6px;display:flex;flex-direction:column;gap:5px}
.burger span{display:block;width:20px;height:2px;background:var(--tx);border-radius:2px;transition:.3s}
.burger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.burger.open span:nth-child(2){opacity:0}
.burger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* Hero */
.hero{min-height:100vh;display:flex;align-items:center;background:radial-gradient(ellipse at 65% 50%,rgba(99,102,241,.1) 0%,transparent 60%);padding:40px 0}
.hero-inner{display:flex;flex-direction:column;align-items:center;gap:32px;text-align:center}
.hero-ey{font-size:15px;color:var(--mt);margin-bottom:4px}
.hero-nm{font-size:clamp(30px,6vw,54px);font-weight:900;background:linear-gradient(135deg,var(--tx),#a5b4fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px;line-height:1.2}
.hero-rl{font-size:17px;color:var(--mt);margin-bottom:14px}
.typewr{color:var(--ac);font-family:monospace;font-size:19px}
.hero-desc{font-size:14px;color:var(--mt);max-width:420px;line-height:1.7;margin:0 auto 22px}
.hero-acts{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-pr{background:var(--ac);color:#fff;text-decoration:none;padding:12px 26px;border-radius:10px;font-size:14px;font-weight:700;transition:.2s}
.btn-pr:hover{filter:brightness(1.1);transform:translateY(-2px)}
.btn-sc{color:var(--ac);border:2px solid var(--ac);text-decoration:none;padding:10px 22px;border-radius:10px;font-size:14px;font-weight:600;transition:.2s}
.btn-sc:hover{background:var(--ag)}
.hero-av-w{position:relative;width:180px;height:180px;flex-shrink:0}
.hero-av{font-size:90px;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;animation:fl 3s ease-in-out infinite}
@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.hero-ring{position:absolute;border-radius:50%;border:2px solid rgba(99,102,241,.2);animation:sp 10s linear infinite}
.r1{inset:0}.r2{inset:-20px;animation-duration:14s;animation-direction:reverse}
@keyframes sp{to{transform:rotate(360deg)}}

/* Sections */
.section{padding:64px 0}
.bg2{background:var(--bg2)}
.sec-h{font-size:26px;margin-bottom:28px}

/* Skills */
.skills-wrap{display:flex;flex-direction:column;gap:24px}
.skill-bars-col{display:flex;flex-direction:column;gap:14px}
.skill-r{display:grid;grid-template-columns:110px 1fr 40px;align-items:center;gap:10px;font-size:13px;color:var(--mt)}
.sb-tr{background:var(--br);border-radius:6px;height:8px;overflow:hidden}
.sb-fl{height:100%;border-radius:6px;width:0;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.skill-tags-col{display:flex;flex-wrap:wrap;gap:8px}
.skt{background:var(--bg);border:1px solid var(--br);color:var(--mt);padding:7px 14px;border-radius:8px;font-size:13px;transition:.2s}
.skt:hover{border-color:var(--ac);color:var(--tx)}

/* Projects */
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.proj-c{background:var(--bg2);border:1px solid var(--br);border-radius:14px;overflow:hidden;transition:.25s}
.proj-c:hover{border-color:var(--ac);transform:translateY(-4px);box-shadow:0 8px 32px rgba(99,102,241,.12)}
.proj-th{height:140px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
.pth-em{font-size:52px;transition:transform .4s}
.proj-c:hover .pth-em{transform:scale(1.1)}
.proj-ov{position:absolute;inset:0;background:rgba(99,102,241,.88);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s;backdrop-filter:blur(2px)}
.proj-c:hover .proj-ov{opacity:1}
.pov-btn{background:#fff;color:var(--ac);text-decoration:none;padding:8px 18px;border-radius:8px;font-size:13px;font-weight:700}
.proj-bd{padding:16px}
.proj-bd h3{font-size:15px;font-weight:700;margin-bottom:6px}
.proj-bd p{font-size:13px;color:var(--mt);line-height:1.6;margin-bottom:10px}
.pt{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
.pt span{background:var(--br);color:var(--mt);padding:3px 10px;border-radius:20px;font-size:11px}
.pls{display:flex;gap:8px}
.pl-g{background:var(--br);color:var(--mt);text-decoration:none;padding:7px 14px;border-radius:8px;font-size:12px;transition:.2s}
.pl-g:hover{background:var(--bg)}
.pl-l{background:var(--ac);color:#fff;text-decoration:none;padding:7px 14px;border-radius:8px;font-size:12px;font-weight:600}
.pl-l:hover{filter:brightness(1.1)}

/* Contact */
.cont-w{display:flex;flex-direction:column;gap:24px}
.cont-i p{font-size:14px;color:var(--mt);margin-bottom:16px;line-height:1.6}
.ci{display:flex;flex-direction:column;gap:8px}
.cl{display:flex;align-items:center;gap:10px;color:var(--mt);text-decoration:none;padding:10px 14px;background:var(--bg);border:1px solid var(--br);border-radius:10px;font-size:14px;transition:.2s}
.cl:hover{border-color:var(--ac);color:var(--ac)}
.cont-f{display:flex;flex-direction:column;gap:10px}
.cont-f input,.cont-f textarea{background:var(--bg);border:1px solid var(--br);color:var(--tx);padding:11px 14px;border-radius:8px;font-size:14px;font-family:inherit;resize:vertical}
.cont-f input:focus,.cont-f textarea:focus{outline:none;border-color:var(--ac);box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.cont-f button{background:var(--ac);border:none;color:#fff;padding:13px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:.2s}
.cont-f button:hover{filter:brightness(1.1)}

/* Footer */
.footer{background:var(--bg2);border-top:1px solid var(--br);padding:20px;text-align:center;font-size:13px;color:var(--mt)}

/* Toast */
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(100px);background:#059669;color:#fff;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;transition:.4s;z-index:999;opacity:0;pointer-events:none}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1}

/* AOS */
.aos{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
.aos.vis{opacity:1;transform:translateY(0)}

/* Responsive */
@media(min-width:640px){
  .nav{display:flex;flex-direction:row;gap:4px;position:static;background:none;border:none;padding:0}
  .burger{display:none}
  .hero-inner{flex-direction:row;text-align:left;gap:40px}
  .hero-acts{justify-content:flex-start}
  .hero-desc{margin:0 0 22px}
  .skills-wrap{flex-direction:row;gap:32px}
  .skill-bars-col{flex:1}
  .cont-w{flex-direction:row;gap:32px}
  .cont-i{flex:1}.cont-f{flex:1.4}
}`,
    `// ── Typewriter ──
const roles = ['Web Developer','HTML+CSS Master','JS Enthusiast','Canvas Artist'];
const twEl  = document.getElementById('typewr');
let ri=0,ci=0,del=false;
function tw(){const w=roles[ri];if(!del&&ci<w.length)ci++;else if(!del){del=true;setTimeout(tw,1500);return;}else if(del&&ci>0)ci--;else{del=false;ri=(ri+1)%roles.length;}twEl.textContent=w.slice(0,ci)+'|';setTimeout(tw,del?60:120);}
tw();

// ── Header scroll ──
window.addEventListener('scroll',()=>{
  document.getElementById('header').classList.toggle('sd',scrollY>10);
  document.getElementById('back-top').classList.toggle('vis',scrollY>300);
});

// ── Back to top ──
document.getElementById('back-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// ── Burger ──
const bg=document.getElementById('burger'),nv=document.getElementById('nav');
bg.addEventListener('click',()=>{bg.classList.toggle('open');nv.classList.toggle('open');});
function closeNav(){bg.classList.remove('open');nv.classList.remove('open');}

// ── Theme ──
const tBtn=document.getElementById('theme-btn');
const saved=localStorage.getItem('pf-theme')||'dark';
document.documentElement.dataset.theme=saved;
tBtn.textContent=saved==='light'?'🌑':'🌙';
tBtn.addEventListener('click',()=>{
  const n=document.documentElement.dataset.theme==='dark'?'light':'dark';
  document.documentElement.dataset.theme=n;
  localStorage.setItem('pf-theme',n);
  tBtn.textContent=n==='light'?'🌑':'🌙';
});

// ── AOS (Animate on Scroll) ──
const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('vis');obs.unobserve(en.target);}}),{threshold:.15});
document.querySelectorAll('.aos').forEach(el=>obs.observe(el));

// ── Skill bars AOS ──
const sbObs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting){en.target.style.width=en.target.dataset.v+'%';sbObs.unobserve(en.target);}}),{threshold:.3});
document.querySelectorAll('.sb-fl').forEach(b=>sbObs.observe(b));

// ── Smooth scroll ──
function scroll2(e,sel){e.preventDefault();document.querySelector(sel)?.scrollIntoView({behavior:'smooth'});}

// ── Contact form ──
function sendF(e){
  e.preventDefault();
  const btn=document.getElementById('fsb');
  btn.textContent='⏳ Надсилаю...'; btn.disabled=true;
  setTimeout(()=>{
    showToast('✅ Повідомлення надіслано!');
    e.target.reset();
    btn.textContent='📨 Надіслати'; btn.disabled=false;
  },1500);
}
function showToast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4000);}`,
    [
      { level:'easy',   uk:'Прокрути повне портфоліо від початку до кінця. Переключи тему. Відправ тестовий контакт.',  ru:'Прокрути полное портфолио от начала до конца. Переключи тему. Отправь тестовый контакт.' },
      { level:'medium', uk:'Заміни "Аліна Коваленко" на своє ім\'я скрізь у HTML. Оновити ініціали у .logo-av.',  ru:'Замени "Аліна Коваленко" на своё имя везде в HTML. Обнови инициалы в .logo-av.' },
      { level:'hard',   uk:'Заміни проект "ToDo App" на свій реальний третій проект: змін назву, опис, теги і посилання на GitHub.',  ru:'Замени проект "ToDo App" на свой реальный третий проект: измени название, описание, теги и ссылки.' },
      { level:'extra',  uk:'Опублікуй портфоліо на GitHub Pages! Створи репозиторій, завантаж файли і отримай посилання виду username.github.io/portfolio. Поділись посиланням з вчителем!',  ru:'Опубликуй портфолио на GitHub Pages! Создай репозиторий, загрузи файлы и получи ссылку username.github.io/portfolio. Поделись ссылкой с учителем!' },
    ]
  );

})();
