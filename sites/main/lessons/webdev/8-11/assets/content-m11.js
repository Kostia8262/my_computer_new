/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 11 — Проект 2: Ігровий сайт · 8–11 Веб-Старт
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

  /* Базова ігрова тема */
  const GAME_BASE = `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0a0a1a;color:#f0f0ff;padding:16px}
h2{font-size:20px;margin-bottom:12px;color:#f0f0ff}
h3{font-size:14px;color:#a0a0c0;margin-bottom:8px}
button{background:#1e1b4b;border:1px solid #4c1d95;color:#f0f0ff;padding:9px 18px;border-radius:8px;cursor:pointer;font-size:14px;transition:.2s}
button:hover{border-color:#7c3aed;color:#c4b5fd}
input,textarea{background:#0a0a1a;border:1px solid #2d2b5a;color:#f0f0ff;padding:10px;border-radius:8px;font-size:14px;font-family:inherit;width:100%;margin-bottom:8px}
input:focus,textarea:focus{outline:none;border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.2)}`;

  /* ─── 11-01 ─────────────────────────────────────────────── */
  patch('11-01',
    { uk:`<h2>Ідея та планування ігрового сайту</h2>
<p>Перш ніж писати код — план! Хороший план заощаджує час і запобігає помилкам.</p>
<h3>Наш проект: «Pixel Quest» 🎮</h3>
<p>Сайт для фентезі-гри зі сторінками:</p>
<ul>
  <li>🏠 <strong>Головна</strong> — яскравий банер, кнопки CTA</li>
  <li>👥 <strong>Персонажі</strong> — картки з фільтрацією</li>
  <li>📖 <strong>Як грати</strong> — кроки, підказки</li>
  <li>🏆 <strong>Рекорди</strong> — таблиця з localStorage</li>
</ul>
<h3>Вайрфрейм — скелет сторінки</h3>
<p>Вайрфрейм — це схема розміщення блоків без кольорів і тексту. Дизайнери малюють його перед версткою.</p>
<h3>Інструменти планування</h3>
<ul>
  <li>✏️ Папір і ручка (найшвидше!)</li>
  <li>🎨 Figma — онлайн-редактор макетів</li>
  <li>📋 HTML-коментарі як структурний план</li>
</ul>`,
      ru:`<h2>Идея и планирование игрового сайта</h2>
<h3>Наш проект: «Pixel Quest» 🎮</h3>
<p>Сайт для фэнтези-игры со страницами:</p>
<ul>
  <li>🏠 <strong>Главная</strong> — яркий баннер, кнопки CTA</li>
  <li>👥 <strong>Персонажи</strong> — карточки с фильтрацией</li>
  <li>📖 <strong>Как играть</strong> — шаги и подсказки</li>
  <li>🏆 <strong>Рекорды</strong> — таблица с localStorage</li>
</ul>
<h3>Вайрфрейм — скелет страницы</h3>
<p>Вайрфрейм — схема размещения блоков без цветов и текста.</p>` },
    `<div class="wireframe">
  <!-- 🎯 Вайрфрейм нашого ігрового сайту -->
  <!-- Кожен div — це блок майбутнього сайту -->

  <div class="wf-header">
    <div class="wf-logo">[ LOGO ]</div>
    <div class="wf-nav">[ NAV: Головна | Персонажі | Як грати | Рекорди ]</div>
  </div>

  <div class="wf-hero">
    <div class="wf-hero-text">
      <div class="wf-h1">[ ЗАГОЛОВОК ГРАВЦЯ ]</div>
      <div class="wf-sub">[ підзаголовок і опис ]</div>
      <div class="wf-btns">[ Грати ] [ Рекорди ]</div>
    </div>
    <div class="wf-hero-img">[ ГЕРОЙ ГРАВЦЯ 🧙‍♂️ ]</div>
  </div>

  <div class="wf-section">
    <div class="wf-section-title">[ Наші персонажі ]</div>
    <div class="wf-cards">
      <div class="wf-card">[ Воїн ⚔️ ]</div>
      <div class="wf-card">[ Маг 🔮 ]</div>
      <div class="wf-card">[ Лучник 🏹 ]</div>
    </div>
  </div>

  <div class="wf-footer">
    [ FOOTER: © 2024 Pixel Quest ]
  </div>
</div>`,
    `${GAME_BASE}
.wireframe{max-width:580px;font-size:12px;color:#6b7280}
.wf-header{display:flex;justify-content:space-between;align-items:center;border:2px dashed #374151;border-radius:8px;padding:10px 14px;margin-bottom:8px;background:#111827}
.wf-logo{background:#1f2937;padding:6px 12px;border-radius:6px}
.wf-nav{background:#1f2937;padding:6px 12px;border-radius:6px}
.wf-hero{display:flex;gap:12px;border:2px dashed #374151;border-radius:8px;padding:16px;margin-bottom:8px;min-height:100px;background:#111827}
.wf-hero-text{flex:2;display:flex;flex-direction:column;gap:6px}
.wf-hero-img{flex:1;border:2px dashed #4b5563;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;color:#4b5563}
.wf-h1,.wf-sub,.wf-btns,.wf-section-title{background:#1f2937;border-radius:6px;padding:6px 10px}
.wf-section{border:2px dashed #374151;border-radius:8px;padding:14px;margin-bottom:8px;background:#111827}
.wf-section-title{margin-bottom:10px}
.wf-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.wf-card{background:#1f2937;border:2px dashed #4b5563;border-radius:8px;padding:20px;text-align:center}
.wf-footer{border:2px dashed #374151;border-radius:8px;padding:10px 14px;text-align:center;background:#111827}`,
    ``,
    [
      { level:'easy',   uk:'Вивчи вайрфрейм. Скільки основних секцій на сайті? Знайди header, hero, cards, footer.',  ru:'Изучи вайрфрейм. Сколько основных секций на сайте? Найди header, hero, cards, footer.' },
      { level:'medium', uk:'Додай до .wf-section ще одну секцію "[ Як грати ]" з 3-ма wf-step div-ами (Step 1, Step 2, Step 3) у flex-row.',  ru:'Добавь к .wf-section ещё одну секцию "[ Как играть ]" с 3 wf-step div-ами в flex-row.' },
      { level:'hard',   uk:'Додай HTML-коментарі до кожного блоку: <!-- HERO: 2 колонки, flex-row, висота 300px --> і т.д.',  ru:'Добавь HTML-комментарии к каждому блоку: <!-- HERO: 2 колонки, flex-row, высота 300px --> и т.д.' },
    ]
  );

  /* ─── 11-02 ─────────────────────────────────────────────── */
  patch('11-02',
    { uk:`<h2>Головна сторінка: яскравий банер</h2>
<p>Hero-секція — перше що бачить відвідувач. Вона має «зачепити» і змусити залишитись.</p>
<h3>Складові Hero</h3>
<ul>
  <li>🎯 <strong>Заголовок</strong> — коротко і ясно про що сайт</li>
  <li>📝 <strong>Підзаголовок</strong> — деталі та переваги</li>
  <li>🔘 <strong>CTA-кнопки</strong> (Call To Action) — що зробити далі</li>
  <li>🖼 <strong>Ілюстрація/фото</strong> — візуальний акцент</li>
</ul>
<h3>CSS-техніки для Hero</h3>
<pre>/* Градієнтний фон */
.hero { background: linear-gradient(135deg, #0a0a1a, #1e1b4b); }

/* Великий текст */
.hero h1 { font-size: clamp(28px, 5vw, 60px); }
/* clamp(min, preferred, max) — масштабується з вікном */

/* Анімований блиск */
@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px #7c3aed; }
  50% { text-shadow: 0 0 40px #7c3aed, 0 0 60px #a855f7; }
}</pre>`,
      ru:`<h2>Главная страница: яркий баннер</h2>
<h3>Составляющие Hero</h3>
<ul>
  <li>🎯 Заголовок — коротко о чём сайт</li>
  <li>📝 Подзаголовок — детали и преимущества</li>
  <li>🔘 CTA-кнопки (Call To Action)</li>
  <li>🖼 Иллюстрация/фото</li>
</ul>
<h3>CSS-техники</h3>
<pre>.hero { background: linear-gradient(135deg, #0a0a1a, #1e1b4b); }
.hero h1 { font-size: clamp(28px, 5vw, 60px); }
@keyframes glow {
  0%,100% { text-shadow: 0 0 20px #7c3aed; }
  50% { text-shadow: 0 0 60px #a855f7; }
}</pre>` },
    `<div class="game-hero">
  <div class="stars" id="stars"></div>

  <header class="g-header">
    <div class="g-logo">⚔️ Pixel Quest</div>
    <nav class="g-nav">
      <a href="#">Персонажі</a>
      <a href="#">Як грати</a>
      <a href="#">Рекорди</a>
    </nav>
  </header>

  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-badge">🎮 RPG ADVENTURE</div>
      <h1 class="hero-title">Вирушай у<br><span class="glow-text">Pixel Quest!</span></h1>
      <p class="hero-sub">Обери свого героя, проходь рівні та встанови рекорд серед друзів!</p>
      <div class="hero-btns">
        <button class="btn-play" onclick="startGame()">▶ Грати зараз</button>
        <button class="btn-sec">🏆 Рекорди</button>
      </div>
    </div>
    <div class="hero-art">
      <div class="hero-char" id="hero-char">🧙‍♂️</div>
      <div class="hero-ring"></div>
    </div>
  </section>
</div>`,
    `${GAME_BASE}
body{padding:0;min-height:100vh}

.game-hero{background:linear-gradient(135deg,#0a0a1a 0%,#1e1b4b 50%,#0a0a1a 100%);min-height:100vh;position:relative;overflow:hidden}
.stars{position:absolute;inset:0;pointer-events:none}
.star{position:absolute;border-radius:50%;background:#fff;animation:twinkle var(--d) ease-in-out infinite}
@keyframes twinkle{0%,100%{opacity:.3}50%{opacity:1}}

.g-header{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;position:relative;z-index:2}
.g-logo{font-size:18px;font-weight:900;color:#c4b5fd}
.g-nav{display:flex;gap:16px}
.g-nav a{color:#a0a0c0;text-decoration:none;font-size:13px;transition:.2s}
.g-nav a:hover{color:#c4b5fd}

.hero-section{display:flex;align-items:center;justify-content:space-between;padding:40px 24px;position:relative;z-index:2;gap:24px;flex-wrap:wrap}
.hero-content{flex:1;min-width:260px}
.hero-badge{display:inline-block;background:rgba(124,58,237,.2);border:1px solid #7c3aed;color:#c4b5fd;padding:4px 14px;border-radius:20px;font-size:12px;letter-spacing:.1em;margin-bottom:16px}
.hero-title{font-size:clamp(28px,5vw,52px);font-weight:900;line-height:1.15;margin-bottom:14px}
.glow-text{color:#c4b5fd;animation:glow 2s ease-in-out infinite}
@keyframes glow{0%,100%{text-shadow:0 0 20px #7c3aed}50%{text-shadow:0 0 40px #7c3aed,0 0 60px #a855f7}}
.hero-sub{font-size:15px;color:#a0a0c0;margin-bottom:24px;max-width:380px;line-height:1.6}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.btn-play{background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;color:#fff;padding:13px 28px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:.2s}
.btn-play:hover{filter:brightness(1.15);transform:translateY(-2px)}
.btn-sec{padding:11px 22px;font-size:14px}

.hero-art{position:relative;display:flex;align-items:center;justify-content:center;width:200px;flex-shrink:0;height:200px}
.hero-char{font-size:80px;position:relative;z-index:2;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.hero-ring{position:absolute;width:160px;height:160px;border-radius:50%;border:2px solid rgba(124,58,237,.3);animation:spin 8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}`,
    `// Зірки
const starsEl = document.getElementById('stars');
for (let i = 0; i < 60; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const sz = Math.random() * 3 + 1;
  s.style.cssText = \`
    width:\${sz}px;height:\${sz}px;
    top:\${Math.random()*100}%;
    left:\${Math.random()*100}%;
    --d:\${2 + Math.random()*3}s;
    animation-delay:\${Math.random()*3}s\`;
  starsEl.appendChild(s);
}

// Зміна персонажа
const chars = ['🧙‍♂️','⚔️🧝','🏹🧝‍♀️','🛡️🧙','🗡️🧛'];
let ci = 0;
const charEl = document.getElementById('hero-char');

function startGame() {
  ci = (ci + 1) % chars.length;
  charEl.style.transform = 'scale(0)';
  setTimeout(() => {
    charEl.textContent = chars[ci];
    charEl.style.transform = 'scale(1)';
    charEl.style.transition = 'transform .3s';
  }, 200);
}`,
    [
      { level:'easy',   uk:'Натисни "▶ Грати зараз" кілька разів — персонаж змінюється. Порахуй скільки є варіантів.',  ru:'Нажми "▶ Грати зараз" несколько раз — персонаж меняется. Посчитай сколько вариантов.' },
      { level:'medium', uk:'Додай ще 3 emoji-персонажі у масив chars. Змін --d зірок на .5s щоб вони миготіли швидше.',  ru:'Добавь ещё 3 emoji-персонажа в массив chars. Измени --d звёзд на .5s чтобы они мигали быстрее.' },
      { level:'hard',   uk:'Замість alert при startGame покажи тост-повідомлення: createElement("div") з текстом "Персонаж обраний!" що зникає через 2 секунди.',  ru:'Вместо startGame с alert покажи тост: createElement("div") с текстом "Персонаж обран!" который исчезает через 2 секунды.' },
    ]
  );

  /* ─── 11-03 ─────────────────────────────────────────────── */
  patch('11-03',
    { uk:`<h2>Сторінка «Персонажі»: картки у Grid</h2>
<p>Сторінка персонажів — це галерея карток. Кожна картка показує базову інформацію про героя.</p>
<h3>Структура картки персонажа</h3>
<pre>&lt;div class="char-card" data-class="warrior"&gt;
  &lt;div class="char-avatar"&gt;⚔️&lt;/div&gt;
  &lt;h3&gt;Воїн&lt;/h3&gt;
  &lt;p class="char-role"&gt;Ближній бій&lt;/p&gt;
  &lt;div class="char-stats"&gt;
    &lt;div class="stat-bar" data-val="90"&gt;Сила&lt;/div&gt;
    &lt;div class="stat-bar" data-val="40"&gt;Магія&lt;/div&gt;
    &lt;div class="stat-bar" data-val="70"&gt;Захист&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
<h3>data-атрибути</h3>
<p><code>data-class="warrior"</code> — власний атрибут для фільтрації JS (наступний урок).</p>`,
      ru:`<h2>Страница «Персонажи»: карточки в Grid</h2>
<h3>Структура карточки</h3>
<pre>&lt;div class="char-card" data-class="warrior"&gt;
  &lt;div class="char-avatar"&gt;⚔️&lt;/div&gt;
  &lt;h3&gt;Воин&lt;/h3&gt;
  &lt;p class="char-role"&gt;Ближний бой&lt;/p&gt;
&lt;/div&gt;</pre>
<p><code>data-class</code> — кастомный атрибут для JS-фильтрации.</p>` },
    `<div class="chars-page">
  <h2>⚔️ Оберіть персонажа</h2>
  <p class="chars-sub">Кожен герой має унікальні здібності та стиль гри.</p>

  <div class="chars-grid">
    <div class="char-card" data-class="warrior" onclick="selectChar(this)">
      <div class="char-avatar" style="background:linear-gradient(135deg,#1e3a5f,#3b82f6)">⚔️</div>
      <h3>Воїн</h3>
      <p class="char-role">Ближній бій · Танк</p>
      <div class="char-stats">
        <div class="stat-row"><span>Сила</span><div class="sbar"><div class="sbar-fill" style="width:90%;background:#ef4444"></div></div><span>90</span></div>
        <div class="stat-row"><span>Магія</span><div class="sbar"><div class="sbar-fill" style="width:20%;background:#8b5cf6"></div></div><span>20</span></div>
        <div class="stat-row"><span>Захист</span><div class="sbar"><div class="sbar-fill" style="width:80%;background:#3b82f6"></div></div><span>80</span></div>
      </div>
      <div class="char-tags"><span class="ctag">⚔️ Зброя</span><span class="ctag">🛡 Щит</span></div>
    </div>

    <div class="char-card" data-class="mage" onclick="selectChar(this)">
      <div class="char-avatar" style="background:linear-gradient(135deg,#2a1033,#8b5cf6)">🔮</div>
      <h3>Маг</h3>
      <p class="char-role">Магічні атаки · DPS</p>
      <div class="char-stats">
        <div class="stat-row"><span>Сила</span><div class="sbar"><div class="sbar-fill" style="width:30%;background:#ef4444"></div></div><span>30</span></div>
        <div class="stat-row"><span>Магія</span><div class="sbar"><div class="sbar-fill" style="width:95%;background:#8b5cf6"></div></div><span>95</span></div>
        <div class="stat-row"><span>Захист</span><div class="sbar"><div class="sbar-fill" style="width:40%;background:#3b82f6"></div></div><span>40</span></div>
      </div>
      <div class="char-tags"><span class="ctag">🔮 Посох</span><span class="ctag">📖 Книга</span></div>
    </div>

    <div class="char-card" data-class="archer" onclick="selectChar(this)">
      <div class="char-avatar" style="background:linear-gradient(135deg,#1a2e22,#059669)">🏹</div>
      <h3>Лучник</h3>
      <p class="char-role">Далній бій · Швидкість</p>
      <div class="char-stats">
        <div class="stat-row"><span>Сила</span><div class="sbar"><div class="sbar-fill" style="width:60%;background:#ef4444"></div></div><span>60</span></div>
        <div class="stat-row"><span>Магія</span><div class="sbar"><div class="sbar-fill" style="width:50%;background:#8b5cf6"></div></div><span>50</span></div>
        <div class="stat-row"><span>Захист</span><div class="sbar"><div class="sbar-fill" style="width:55%;background:#3b82f6"></div></div><span>55</span></div>
      </div>
      <div class="char-tags"><span class="ctag">🏹 Лук</span><span class="ctag">🗡 Кинджал</span></div>
    </div>

    <div class="char-card" data-class="warrior" onclick="selectChar(this)">
      <div class="char-avatar" style="background:linear-gradient(135deg,#2d1e0f,#f59e0b)">🪄</div>
      <h3>Паладин</h3>
      <p class="char-role">Бій і захист · Підтримка</p>
      <div class="char-stats">
        <div class="stat-row"><span>Сила</span><div class="sbar"><div class="sbar-fill" style="width:70%;background:#ef4444"></div></div><span>70</span></div>
        <div class="stat-row"><span>Магія</span><div class="sbar"><div class="sbar-fill" style="width:65%;background:#8b5cf6"></div></div><span>65</span></div>
        <div class="stat-row"><span>Захист</span><div class="sbar"><div class="sbar-fill" style="width:75%;background:#3b82f6"></div></div><span>75</span></div>
      </div>
      <div class="char-tags"><span class="ctag">🪄 Жезл</span><span class="ctag">🛡 Щит</span></div>
    </div>
  </div>

  <div class="char-selected" id="char-selected">← Клікни на персонажа щоб вибрати</div>
</div>`,
    `${GAME_BASE}
.chars-page{max-width:600px}
.chars-sub{font-size:13px;color:#a0a0c0;margin-bottom:16px}
.chars-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-bottom:16px}
.char-card{background:#0e0c24;border:2px solid #2d2b5a;border-radius:14px;padding:18px;cursor:pointer;transition:.2s}
.char-card:hover{border-color:#7c3aed;transform:translateY(-3px)}
.char-card.active{border-color:#f59e0b;box-shadow:0 0 20px rgba(245,158,11,.2)}
.char-avatar{width:70px;height:70px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 12px}
h3{text-align:center;font-size:16px;margin-bottom:4px}
.char-role{text-align:center;font-size:12px;color:#a0a0c0;margin-bottom:12px}
.char-stats{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
.stat-row{display:grid;grid-template-columns:50px 1fr 30px;align-items:center;gap:8px;font-size:11px;color:#a0a0c0}
.sbar{background:#1e1b4b;border-radius:4px;height:6px;overflow:hidden}
.sbar-fill{height:100%;border-radius:4px;transition:.5s}
.char-tags{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.ctag{background:rgba(124,58,237,.15);border:1px solid #4c1d95;color:#c4b5fd;padding:2px 10px;border-radius:20px;font-size:11px}
.char-selected{background:#0e0c24;border:1px solid #2d2b5a;border-radius:10px;padding:14px;font-size:14px;color:#a0a0c0;text-align:center}`,
    `function selectChar(card) {
  document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  const name  = card.querySelector('h3').textContent;
  const role  = card.querySelector('.char-role').textContent;
  const cls   = card.dataset.class;
  document.getElementById('char-selected').innerHTML =
    \`✅ Обрано: <b style="color:#f59e0b">\${name}</b> · \${role} · Клас: \${cls}\`;
}`,
    [
      { level:'easy',   uk:'Клікни на кожного персонажа і прочитай його характеристики. Хто найсильніший у магії?',  ru:'Кликни на каждого персонажа и прочитай его характеристики. Кто самый сильный в магии?' },
      { level:'medium', uk:'Додай п\'ятого персонажа "Некромант 💀" з data-class="mage" і своїми характеристиками.',  ru:'Добавь пятого персонажа "Некромант 💀" с data-class="mage" и своими характеристиками.' },
      { level:'hard',   uk:'Зроби анімацію stat-fill: при завантаженні sbar-fill.style.width = "0" потім через setTimeout sbar-fill.style.width = оригінальне значення.',  ru:'Сделай анимацию stat-fill: при загрузке sbar-fill.style.width = "0" потом через setTimeout восстанови исходное значение.' },
    ]
  );

  /* ─── 11-04 ─────────────────────────────────────────────── */
  patch('11-04',
    { uk:`<h2>Фільтрація карток на JS</h2>
<p>Фільтр дозволяє показувати лише картки певного типу без перезавантаження сторінки.</p>
<h3>Алгоритм фільтра</h3>
<pre>function filter(type) {
  const cards = document.querySelectorAll('.char-card');
  cards.forEach(card => {
    if (type === 'all' || card.dataset.class === type) {
      card.style.display = '';       // показати
    } else {
      card.style.display = 'none';   // сховати
    }
  });
}</pre>
<h3>Або через classList</h3>
<pre>card.classList.toggle('hidden', card.dataset.class !== type);</pre>
<pre>/* CSS: */
.hidden { display: none; }</pre>
<p><code>toggle(cls, умова)</code> — додає клас якщо умова <code>true</code>, видаляє якщо <code>false</code>.</p>`,
      ru:`<h2>Фильтрация карточек на JS</h2>
<h3>Алгоритм фильтра</h3>
<pre>function filter(type) {
  document.querySelectorAll('.char-card').forEach(card => {
    if (type === 'all' || card.dataset.class === type) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}</pre>` },
    `<div class="filter-page">
  <h2>👥 Персонажі</h2>

  <div class="filter-bar">
    <button class="f-btn active" data-f="all"     onclick="applyFilter('all',this)">⚔️ Всі</button>
    <button class="f-btn" data-f="warrior" onclick="applyFilter('warrior',this)">🛡 Воїни</button>
    <button class="f-btn" data-f="mage"    onclick="applyFilter('mage',this)">🔮 Маги</button>
    <button class="f-btn" data-f="archer"  onclick="applyFilter('archer',this)">🏹 Лучники</button>
  </div>

  <div class="f-count" id="f-count"></div>

  <div class="chars-grid" id="chars-grid">
    <div class="char-card" data-class="warrior"><div class="cav" style="background:linear-gradient(135deg,#1e3a5f,#3b82f6)">⚔️</div><h3>Воїн</h3><p class="crole">Танк</p></div>
    <div class="char-card" data-class="mage"><div class="cav" style="background:linear-gradient(135deg,#2a1033,#8b5cf6)">🔮</div><h3>Маг</h3><p class="crole">Маг</p></div>
    <div class="char-card" data-class="archer"><div class="cav" style="background:linear-gradient(135deg,#1a2e22,#059669)">🏹</div><h3>Лучник</h3><p class="crole">Стрілець</p></div>
    <div class="char-card" data-class="warrior"><div class="cav" style="background:linear-gradient(135deg,#2d1e0f,#f59e0b)">🪄</div><h3>Паладин</h3><p class="crole">Підтримка</p></div>
    <div class="char-card" data-class="mage"><div class="cav" style="background:linear-gradient(135deg,#1a1a2e,#e11d48)">💀</div><h3>Некромант</h3><p class="crole">Темна магія</p></div>
    <div class="char-card" data-class="archer"><div class="cav" style="background:linear-gradient(135deg,#0f1a0f,#65a30d)">🗡</div><h3>Рейнджер</h3><p class="crole">Виживання</p></div>
  </div>
</div>`,
    `${GAME_BASE}
.filter-page{max-width:560px}
.filter-bar{display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap}
.f-btn{padding:7px 16px;font-size:13px}
.f-btn.active{border-color:#7c3aed;color:#c4b5fd;background:rgba(124,58,237,.15)}
.f-count{font-size:13px;color:#a0a0c0;margin-bottom:14px;min-height:20px}
.chars-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.char-card{background:#0e0c24;border:2px solid #2d2b5a;border-radius:14px;padding:16px;text-align:center;transition:.3s;cursor:pointer}
.char-card:hover{border-color:#7c3aed;transform:translateY(-3px)}
.char-card.hidden{display:none}
.cav{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 10px}
h3{font-size:15px;margin-bottom:4px}
.crole{font-size:12px;color:#a0a0c0}`,
    `let currentFilter = 'all';

function applyFilter(type, btn) {
  currentFilter = type;

  // Кнопки
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Картки
  const cards = document.querySelectorAll('.char-card');
  let visible = 0;

  cards.forEach(card => {
    const show = type === 'all' || card.dataset.class === type;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  // Лічильник
  const total = cards.length;
  const label = { all:'Всі', warrior:'Воїни', mage:'Маги', archer:'Лучники' };
  document.getElementById('f-count').textContent =
    \`\${label[type]}: \${visible} з \${total} персонажів\`;
}

// Запуск
applyFilter('all', document.querySelector('.f-btn.active'));`,
    [
      { level:'easy',   uk:'Клікни на кожну кнопку фільтра і поспостерігай які картки показуються.',  ru:'Кликни на каждую кнопку фильтра и понаблюдай какие карточки показываются.' },
      { level:'medium', uk:'Додай сьомого персонажа "Шаман 🌀" data-class="mage" і перевір що фільтр "Маги" показує його.',  ru:'Добавь седьмого персонажа "Шаман 🌀" data-class="mage" и проверь что фильтр "Маги" показывает его.' },
      { level:'hard',   uk:'Додай анімацію для карток що з\'являються: замість display:none використовуй opacity:0 + scale(.8) з transition, потім opacity:1 + scale(1).',  ru:'Добавь анимацию для карточек которые появляются: вместо display:none используй opacity:0 + scale(.8) с transition.' },
    ]
  );

  /* ─── 11-05 ─────────────────────────────────────────────── */
  patch('11-05',
    { uk:`<h2>Сторінка «Як грати»: кроки у Flex</h2>
<p>Секція «Як грати» пояснює механіку гри через пронумеровані кроки.</p>
<h3>Горизонтальна стрічка кроків</h3>
<pre>.steps { display: flex; gap: 0; }
.step  { flex: 1; position: relative; }

/* Лінія між кроками: */
.step::before {
  content: '';
  position: absolute;
  top: 20px; left: 50%; right: -50%;
  height: 2px;
  background: #7c3aed;
}</pre>
<h3>Нумерація через CSS counter</h3>
<pre>.steps { counter-reset: step-counter; }
.step-num::before {
  counter-increment: step-counter;
  content: counter(step-counter);
}</pre>`,
      ru:`<h2>Страница «Как играть»: шаги в Flex</h2>
<h3>Горизонтальная лента шагов</h3>
<pre>.steps { display: flex; gap: 0; }
.step  { flex: 1; position: relative; }

/* Линия между шагами: */
.step::before {
  content: '';
  position: absolute;
  top: 20px; left: 50%; right: -50%;
  height: 2px;
  background: #7c3aed;
}</pre>` },
    `<div class="howto-page">
  <h2>📖 Як грати у Pixel Quest</h2>

  <div class="steps" id="steps">
    <div class="step" data-step="1">
      <div class="step-circle" onclick="activateStep(this)">1</div>
      <div class="step-body">
        <h3>Оберіть героя</h3>
        <p>Воїн, Маг або Лучник — кожен з унікальними здібностями.</p>
      </div>
    </div>
    <div class="step" data-step="2">
      <div class="step-circle" onclick="activateStep(this)">2</div>
      <div class="step-body">
        <h3>Дослідіть карту</h3>
        <p>Подорожуйте по підземеллях, лісах і замках.</p>
      </div>
    </div>
    <div class="step" data-step="3">
      <div class="step-circle" onclick="activateStep(this)">3</div>
      <div class="step-body">
        <h3>Перемагайте ворогів</h3>
        <p>Битви у покроковому режимі — думайте стратегічно!</p>
      </div>
    </div>
    <div class="step" data-step="4">
      <div class="step-circle" onclick="activateStep(this)">4</div>
      <div class="step-body">
        <h3>Встановіть рекорд</h3>
        <p>Зберіть найбільше очок і потрапте у таблицю лідерів!</p>
      </div>
    </div>
  </div>

  <div class="tips-section">
    <h3>💡 Поради</h3>
    <div class="tips-grid">
      <div class="tip">🧪 Збирайте зілля для відновлення HP</div>
      <div class="tip">🗝 Шукайте приховані кімнати</div>
      <div class="tip">📖 Прокачуйте навички між рівнями</div>
      <div class="tip">👥 Грайте з другом у Co-op режимі</div>
    </div>
  </div>
</div>`,
    `${GAME_BASE}
.howto-page{max-width:640px}
h2{margin-bottom:24px}

/* Steps */
.steps{display:flex;gap:0;margin-bottom:28px;overflow-x:auto;padding-bottom:8px}
.step{flex:1;min-width:130px;display:flex;flex-direction:column;align-items:center;position:relative}
.step:not(:last-child)::after{content:'';position:absolute;top:22px;left:50%;width:100%;height:2px;background:#2d2b5a;z-index:0}
.step.done::after,.step.active::after{background:linear-gradient(to right,#7c3aed,#2d2b5a)}
.step-circle{width:44px;height:44px;border-radius:50%;background:#1e1b4b;border:2px solid #4c1d95;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;cursor:pointer;position:relative;z-index:1;transition:.3s;flex-shrink:0}
.step-circle:hover{border-color:#7c3aed;background:rgba(124,58,237,.2)}
.step.active .step-circle{background:#7c3aed;border-color:#a855f7;box-shadow:0 0 16px rgba(124,58,237,.5)}
.step.done .step-circle{background:#059669;border-color:#4ade80;color:#fff}
.step-body{text-align:center;padding:10px 8px 0}
.step-body h3{font-size:13px;margin-bottom:4px}
.step-body p{font-size:11px;color:#a0a0c0;line-height:1.4}

/* Tips */
.tips-section h3{font-size:14px;color:#a0a0c0;margin-bottom:10px}
.tips-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.tip{background:#0e0c24;border:1px solid #2d2b5a;border-radius:10px;padding:12px;font-size:13px;color:#a0a0c0}`,
    `let current = 0;

function activateStep(circle) {
  const step = circle.closest('.step');
  const num  = parseInt(step.dataset.step);

  // Позначаємо попередні кроки як done
  document.querySelectorAll('.step').forEach(s => {
    const n = parseInt(s.dataset.step);
    s.classList.toggle('done',   n < num);
    s.classList.toggle('active', n === num);
  });
  current = num;
}

// Автопрогрес при завантаженні
let autoStep = 1;
const auto = setInterval(() => {
  const circle = document.querySelector(\`.step[data-step="\${autoStep}"] .step-circle\`);
  if (circle) activateStep(circle);
  autoStep++;
  if (autoStep > 4) clearInterval(auto);
}, 800);`,
    [
      { level:'easy',   uk:'Клікни на кожне коло кроку — поспостерігай за зміною кольорів і прогресом.',  ru:'Кликни на каждый круг шага — понаблюдай за изменением цветов и прогрессом.' },
      { level:'medium', uk:'Додай кнопки "← Назад" і "Далі →" що автоматично активують попередній/наступний крок.',  ru:'Добавь кнопки "← Назад" и "Далее →" которые автоматически активируют предыдущий/следующий шаг.' },
      { level:'hard',   uk:'Додай п\'ятий крок "Поширте результат 🎉" і нову пораду у tips-grid.',  ru:'Добавь пятый шаг "Поделитесь результатом 🎉" и новый совет в tips-grid.' },
    ]
  );

  /* ─── 11-06 ─────────────────────────────────────────────── */
  patch('11-06',
    { uk:`<h2>Лічильник очок: JS + DOM</h2>
<p>Лічильник очок — основна механіка ігрового сайту. Очки накопичуються, змінюють колір і зберігаються.</p>
<h3>Базовий лічильник</h3>
<pre>let score = 0;

function addPoints(n) {
  score += n;
  document.getElementById('score').textContent = score;
}
function resetScore() {
  score = 0;
  document.getElementById('score').textContent = 0;
}</pre>
<h3>Анімація числа (count-up)</h3>
<pre>function countUp(from, to, el, duration) {
  const step = (to - from) / (duration / 16);
  let current = from;
  const timer = setInterval(() => {
    current += step;
    if (current >= to) { current = to; clearInterval(timer); }
    el.textContent = Math.round(current);
  }, 16);
}</pre>`,
      ru:`<h2>Счётчик очков: JS + DOM</h2>
<h3>Базовый счётчик</h3>
<pre>let score = 0;

function addPoints(n) {
  score += n;
  document.getElementById('score').textContent = score;
}
function resetScore() {
  score = 0;
  document.getElementById('score').textContent = 0;
}</pre>
<h3>Анимация числа (count-up)</h3>
<pre>function countUp(from, to, el, duration) {
  const step = (to - from) / (duration / 16);
  let current = from;
  const timer = setInterval(() => {
    current += step;
    if (current >= to) { current = to; clearInterval(timer); }
    el.textContent = Math.round(current);
  }, 16);
}</pre>` },
    `<div class="score-page">
  <div class="score-panel">
    <div class="score-label">ОЧКИ</div>
    <div class="score-display" id="score">0</div>
    <div class="level-display" id="level-display">Рівень 1</div>
  </div>

  <div class="score-actions">
    <button class="s-btn" onclick="addPoints(10)" style="border-color:#4ade80;color:#4ade80">+10 Монета</button>
    <button class="s-btn" onclick="addPoints(50)" style="border-color:#f59e0b;color:#f59e0b">+50 Скарб</button>
    <button class="s-btn" onclick="addPoints(100)" style="border-color:#f87171;color:#f87171">+100 Боc!</button>
    <button class="s-btn" onclick="addPoints(-25)" style="border-color:#94a3b8;color:#94a3b8">−25 Удар</button>
  </div>

  <div class="score-log" id="score-log"></div>

  <div class="level-bar-wrap">
    <div class="lb-label"><span>Прогрес до наступного рівня</span><span id="lb-pct">0%</span></div>
    <div class="lb-track"><div class="lb-fill" id="lb-fill"></div></div>
  </div>

  <button class="reset-btn" onclick="resetScore()">🔄 Новий раунд</button>
</div>`,
    `${GAME_BASE}
.score-page{max-width:440px}
.score-panel{background:#0e0c24;border:2px solid #7c3aed;border-radius:16px;padding:24px;text-align:center;margin-bottom:16px;box-shadow:0 0 30px rgba(124,58,237,.2)}
.score-label{font-size:11px;letter-spacing:.2em;color:#a0a0c0;margin-bottom:8px}
.score-display{font-size:64px;font-weight:900;font-family:monospace;background:linear-gradient(135deg,#c4b5fd,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;transition:transform .15s}
.score-display.pop{transform:scale(1.15)}
.level-display{font-size:14px;color:#a0a0c0;margin-top:8px}
.score-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.s-btn{background:#0e0c24;border-width:2px;font-weight:700;padding:12px}
.score-log{background:#0e0c24;border-radius:10px;padding:12px;min-height:60px;max-height:100px;overflow-y:auto;margin-bottom:14px;display:flex;flex-direction:column-reverse;gap:4px}
.log-item{font-size:12px;color:#a0a0c0;padding:2px 0;border-bottom:1px solid #1e1b4b}
.lb-label{display:flex;justify-content:space-between;font-size:12px;color:#a0a0c0;margin-bottom:6px}
.lb-track{background:#1e1b4b;border-radius:8px;height:10px;overflow:hidden;margin-bottom:12px}
.lb-fill{height:100%;background:linear-gradient(to right,#7c3aed,#f59e0b);border-radius:8px;width:0;transition:.4s}
.reset-btn{width:100%;background:#1e1b4b;border-color:#4c1d95}`,
    `let score = 0;
let best  = 0;
const LEVEL_POINTS = 200;

const scoreEl = document.getElementById('score');

function countUp(from, to) {
  const dur  = 300;
  const step = (to - from) / (dur / 16);
  let cur    = from;
  const t    = setInterval(() => {
    cur += step;
    if ((step > 0 && cur >= to) || (step < 0 && cur <= to)) {
      cur = to;
      clearInterval(t);
    }
    scoreEl.textContent = Math.round(cur);
    updateLevel(Math.round(cur));
  }, 16);
}

function addPoints(n) {
  const prev = score;
  score = Math.max(0, score + n);
  if (score > best) best = score;

  // Анімація
  scoreEl.classList.remove('pop');
  void scoreEl.offsetWidth;
  scoreEl.classList.add('pop');
  setTimeout(() => scoreEl.classList.remove('pop'), 200);

  countUp(prev, score);

  // Лог
  const log  = document.getElementById('score-log');
  const item = document.createElement('div');
  item.className = 'log-item';
  item.textContent = (n > 0 ? '+' : '') + n + ' очок · Загалом: ' + score;
  item.style.color = n > 0 ? '#4ade80' : '#f87171';
  log.prepend(item);
}

function updateLevel(pts) {
  const level = Math.floor(pts / LEVEL_POINTS) + 1;
  const pct   = ((pts % LEVEL_POINTS) / LEVEL_POINTS * 100).toFixed(0);
  document.getElementById('level-display').textContent = 'Рівень ' + level;
  document.getElementById('lb-fill').style.width = pct + '%';
  document.getElementById('lb-pct').textContent  = pct + '%';
}

function resetScore() {
  const prev = score;
  score = 0;
  countUp(prev, 0);
  document.getElementById('score-log').innerHTML = '';
}`,
    [
      { level:'easy',   uk:'Клікай на кнопки очок і стеж за лічильником та прогрес-баром рівня.',  ru:'Кликай на кнопки очков и следи за счётчиком и прогресс-баром уровня.' },
      { level:'medium', uk:'Додай відображення рекорду: let best = 0; і при addPoints, якщо score > best: best = score і виводь його в div#best.',  ru:'Добавь отображение рекорда: let best = 0; и при addPoints если score > best: best = score и выводи его в div#best.' },
      { level:'hard',   uk:'Збережи score і best у localStorage та відновлюй при завантаженні.',  ru:'Сохрани score и best в localStorage и восстанавливай при загрузке.' },
    ]
  );

  /* ─── 11-07 ─────────────────────────────────────────────── */
  patch('11-07',
    { uk:`<h2>Анімований таймер зворотного відліку</h2>
<p>Таймер — невід'ємна частина ігрового сайту. Він створює напругу і мотивує гравця.</p>
<h3>SVG-коло прогресу</h3>
<pre>&lt;svg&gt;
  &lt;circle class="track" .../&gt;
  &lt;circle class="progress" .../&gt;
&lt;/svg&gt;</pre>
<pre>// stroke-dasharray — довжина штриха (= довжина кола 2πr)
// stroke-dashoffset — зсув штриха (збільшуємо щоб "відкушувати" коло)
const circ = 2 * Math.PI * 45; // r=45
progressEl.style.strokeDasharray  = circ;
progressEl.style.strokeDashoffset = circ * (1 - percent / 100);</pre>`,
      ru:`<h2>Анимированный таймер обратного отсчёта</h2>
<h3>SVG-круг прогресса</h3>
<pre>// stroke-dasharray = 2πr (длина окружности)
// stroke-dashoffset — увеличиваем чтобы "откусывать" круг
const circ = 2 * Math.PI * 45;
progressEl.style.strokeDasharray  = circ;
progressEl.style.strokeDashoffset = circ * (1 - percent / 100);</pre>` },
    `<div class="timer-page">
  <h2>⏳ Ігровий таймер</h2>

  <div class="timer-wrap">
    <svg class="timer-svg" viewBox="0 0 120 120">
      <circle class="t-track"    cx="60" cy="60" r="50" />
      <circle class="t-progress" cx="60" cy="60" r="50" id="t-progress"/>
    </svg>
    <div class="timer-center">
      <div class="timer-num" id="timer-num">60</div>
      <div class="timer-label" id="timer-label">сек</div>
    </div>
  </div>

  <div class="timer-presets">
    <button onclick="setTimer(30)">30 с</button>
    <button onclick="setTimer(60)">60 с</button>
    <button onclick="setTimer(90)">90 с</button>
  </div>

  <div class="timer-controls">
    <button id="btn-start" onclick="startTimer()">▶ Старт</button>
    <button id="btn-pause" onclick="pauseTimer()">⏸ Пауза</button>
    <button id="btn-reset" onclick="resetTimer()">🔄 Скинути</button>
  </div>

  <div class="timer-msg" id="timer-msg"></div>
</div>`,
    `${GAME_BASE}
.timer-page{max-width:400px;text-align:center}
h2{margin-bottom:20px}
.timer-wrap{position:relative;width:180px;height:180px;margin:0 auto 20px}
.timer-svg{transform:rotate(-90deg);width:100%;height:100%}
.t-track{fill:none;stroke:#1e1b4b;stroke-width:8}
.t-progress{fill:none;stroke:#7c3aed;stroke-width:8;stroke-linecap:round;transition:stroke-dashoffset .9s linear,stroke .3s}
.timer-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.timer-num{font-size:48px;font-weight:900;font-family:monospace;color:#c4b5fd;line-height:1}
.timer-label{font-size:12px;color:#a0a0c0;letter-spacing:.1em}
.timer-presets{display:flex;gap:8px;justify-content:center;margin-bottom:12px}
.timer-presets button{padding:6px 16px;font-size:13px}
.timer-controls{display:flex;gap:8px;justify-content:center;margin-bottom:14px}
.timer-msg{min-height:36px;font-size:16px;font-weight:700;color:#f59e0b}`,
    `const CIRC = 2 * Math.PI * 50;
const prog   = document.getElementById('t-progress');
const numEl  = document.getElementById('timer-num');
const msgEl  = document.getElementById('timer-msg');

let total = 60, left = 60, running = false, timer = null;

prog.style.strokeDasharray  = CIRC;
prog.style.strokeDashoffset = 0;

function draw() {
  const pct = left / total;
  prog.style.strokeDashoffset = CIRC * (1 - pct);
  prog.style.stroke = pct > .5 ? '#7c3aed' : pct > .25 ? '#f59e0b' : '#ef4444';
  numEl.textContent = left;
}

function setTimer(secs) {
  resetTimer();
  total = left = secs;
  draw();
}

function startTimer() {
  if (running) return;
  running = true;
  msgEl.textContent = '';
  timer = setInterval(() => {
    left--;
    draw();
    if (left <= 0) {
      clearInterval(timer);
      running = false;
      numEl.textContent  = '⏰';
      msgEl.textContent  = '🏆 Час вийшов! Підрахуй очки!';
      prog.style.stroke  = '#ef4444';
    }
  }, 1000);
}

function pauseTimer() {
  if (running) { clearInterval(timer); running = false; msgEl.textContent = '⏸ Паузу активовано'; }
  else { startTimer(); msgEl.textContent = ''; }
}

function resetTimer() {
  clearInterval(timer); running = false;
  left = total; draw();
  msgEl.textContent = '';
}`,
    [
      { level:'easy',   uk:'Запусти таймер на 30 сек і поспостерігай за кільцем та зміною кольорів.',  ru:'Запусти таймер на 30 сек и понаблюдай за кольцом и изменением цветов.' },
      { level:'medium', uk:'Додай кнопку "120 с" у timer-presets і перевір що вона правильно встановлює таймер.',  ru:'Добавь кнопку "120 с" в timer-presets и проверь что она правильно устанавливает таймер.' },
      { level:'hard',   uk:'Додай звуковий сигнал при закінченні: const ctx = new AudioContext(); потім при left === 0 виклич функцію що грає короткий beep.',  ru:'Добавь звуковой сигнал при окончании: const ctx = new AudioContext(); потом при left === 0 вызови функцию играющую короткий beep.' },
    ]
  );

  /* ─── 11-08 ─────────────────────────────────────────────── */
  patch('11-08',
    { uk:`<h2>Форма реєстрації із JS-валідацією</h2>
<p>Валідація — перевірка що користувач ввів коректні дані, ДО відправки на сервер.</p>
<h3>Правила валідації</h3>
<pre>function validate() {
  const нік = document.getElementById('nick').value.trim();

  if (нік.length < 3) {
    showError('nick', 'Мінімум 3 символи!');
    return false;
  }
  if (нік.length > 20) {
    showError('nick', 'Максимум 20 символів!');
    return false;
  }
  // Лише букви, цифри, підкреслення:
  if (!/^[a-zA-Z0-9_А-Яа-яЄєІіЇї]+$/.test(нік)) {
    showError('nick', 'Тільки букви, цифри і _');
    return false;
  }
  return true; // все ок
}</pre>`,
      ru:`<h2>Форма регистрации с JS-валидацией</h2>
<h3>Правила валидации</h3>
<pre>function validate() {
  const ник = document.getElementById('nick').value.trim();

  if (ник.length < 3) {
    showError('nick', 'Минимум 3 символа!');
    return false;
  }
  if (!/^[a-zA-Z0-9_А-Яа-яЄєІіЇї]+$/.test(ник)) {
    showError('nick', 'Только буквы, цифры и _');
    return false;
  }
  return true;
}</pre>` },
    `<div class="reg-page">
  <div class="reg-card">
    <div class="reg-header">
      <div class="reg-logo">⚔️</div>
      <h2>Реєстрація гравця</h2>
      <p>Приєднуйся до Pixel Quest!</p>
    </div>

    <form id="reg-form" onsubmit="submitForm(event)">
      <div class="field">
        <label>Нікнейм</label>
        <input type="text" id="nick" placeholder="CooolPlayer_99">
        <div class="err" id="err-nick"></div>
        <div class="hint">Від 3 до 20 символів, лише букви/цифри/_</div>
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" id="email" placeholder="player@game.com">
        <div class="err" id="err-email"></div>
      </div>
      <div class="field">
        <label>Пароль</label>
        <input type="password" id="pass" placeholder="Мінімум 6 символів">
        <div class="err" id="err-pass"></div>
        <div class="pass-strength" id="pass-strength"></div>
      </div>
      <div class="field">
        <label>Клас персонажа</label>
        <select id="char-class">
          <option value="">— Оберіть —</option>
          <option value="warrior">⚔️ Воїн</option>
          <option value="mage">🔮 Маг</option>
          <option value="archer">🏹 Лучник</option>
        </select>
        <div class="err" id="err-class"></div>
      </div>
      <div class="check-row">
        <input type="checkbox" id="agree">
        <label for="agree">Погоджуюсь з правилами гри</label>
      </div>
      <button type="submit" class="reg-btn">⚔️ Приєднатись!</button>
    </form>

    <div class="reg-success hidden" id="reg-success"></div>
  </div>
</div>`,
    `${GAME_BASE}
.reg-page{max-width:420px}
.reg-card{background:#0e0c24;border:1px solid #2d2b5a;border-radius:16px;padding:24px}
.reg-header{text-align:center;margin-bottom:20px}
.reg-logo{font-size:40px;margin-bottom:8px}
.reg-header h2{font-size:20px;margin-bottom:4px}
.reg-header p{font-size:13px;color:#a0a0c0}
.field{margin-bottom:14px}
.field label{display:block;font-size:13px;color:#a0a0c0;margin-bottom:6px}
.field input,.field select{margin:0;background:#0a0a1a;border:1px solid #2d2b5a;transition:.2s}
.field input.ok{border-color:#059669}
.field input.bad{border-color:#ef4444}
.err{font-size:11px;color:#f87171;margin-top:4px;min-height:16px}
.hint{font-size:11px;color:#4c1d95;margin-top:3px}
select{background:#0a0a1a;border:1px solid #2d2b5a;color:#f0f0ff;padding:10px;border-radius:8px;width:100%;font-size:14px;cursor:pointer}
.check-row{display:flex;align-items:center;gap:10px;margin-bottom:16px;font-size:13px}
.check-row input{width:18px;height:18px;accent-color:#7c3aed;margin:0;flex-shrink:0;cursor:pointer}
.reg-btn{width:100%;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;color:#fff;padding:13px;font-size:15px;font-weight:700;border-radius:10px;cursor:pointer;transition:.2s}
.reg-btn:hover{filter:brightness(1.1)}
.pass-strength{height:4px;border-radius:4px;margin-top:6px;transition:width .3s,background .3s;width:0}
.reg-success{background:rgba(5,150,105,.15);border:1px solid #059669;border-radius:10px;padding:16px;text-align:center;color:#4ade80;font-weight:600;margin-top:12px}
.hidden{display:none}`,
    `function showError(id, msg) {
  const inp = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  inp.classList.add('bad'); inp.classList.remove('ok');
  err.textContent = msg;
}
function clearError(id) {
  const inp = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  inp.classList.remove('bad'); inp.classList.add('ok');
  err.textContent = '';
}

// Сила пароля
document.getElementById('pass').addEventListener('input', function () {
  const v = this.value;
  const s = document.getElementById('pass-strength');
  const strength = [/[A-Z]/, /[0-9]/, /[!@#$%^&*]/, /.{8}/].filter(r=>r.test(v)).length;
  const colors = ['#ef4444','#f59e0b','#3b82f6','#059669'];
  const widths = ['25%','50%','75%','100%'];
  s.style.width      = strength ? widths[strength-1] : '0';
  s.style.background = colors[strength-1] || '#ef4444';
});

function submitForm(e) {
  e.preventDefault();
  let ok = true;

  const нік    = document.getElementById('nick').value.trim();
  const email  = document.getElementById('email').value.trim();
  const pass   = document.getElementById('pass').value;
  const cls    = document.getElementById('char-class').value;
  const agree  = document.getElementById('agree').checked;

  if (нік.length < 3)          { showError('nick', 'Мінімум 3 символи!'); ok = false; } else clearError('nick');
  if (!email.includes('@'))    { showError('email', 'Введи коректний email!'); ok = false; } else clearError('email');
  if (pass.length < 6)         { showError('pass', 'Мінімум 6 символів!'); ok = false; } else clearError('pass');
  if (!cls)                    { showError('class', 'Оберіть клас!'); ok = false; }
  if (!agree) { alert('Погодьтесь з правилами!'); ok = false; }

  if (ok) {
    document.getElementById('reg-form').style.display = 'none';
    const succ = document.getElementById('reg-success');
    succ.classList.remove('hidden');
    succ.innerHTML = \`🎉 Вітаємо, <b>\${нік}</b>! Ваш обліковий запис створено!<br>Клас: \${cls}\`;
  }
}`,
    [
      { level:'easy',   uk:'Спробуй відправити порожню форму — перевір які помилки з\'являються.',  ru:'Попробуй отправить пустую форму — проверь какие ошибки появляются.' },
      { level:'medium', uk:'Додай у форму поле "Вік" (input type=number, min=6 max=99). Валідуй: якщо < 6 або > 99 — покажи помилку.',  ru:'Добавь в форму поле "Возраст" (input type=number, min=6 max=99). Валидируй: если < 6 или > 99 — покажи ошибку.' },
      { level:'hard',   uk:'Збережи дані гравця у localStorage при успішній реєстрації: localStorage.setItem("player", JSON.stringify({нік, cls})).',  ru:'Сохрани данные игрока в localStorage при успешной регистрации: localStorage.setItem("player", JSON.stringify({ник, cls})).' },
    ]
  );

  /* ─── 11-09 ─────────────────────────────────────────────── */
  patch('11-09',
    { uk:`<h2>Таблиця рекордів у localStorage</h2>
<p>Таблиця лідерів зберігає найкращі результати і показує їх при кожному візиті.</p>
<h3>Структура даних</h3>
<pre>// Масив записів:
const leaders = [
  { name: 'Аліна',  score: 1500, class: 'mage',    date: '2024-01-15' },
  { name: 'Богдан', score: 1200, class: 'warrior',  date: '2024-01-14' },
];

// Зберегти:
localStorage.setItem('leaders', JSON.stringify(leaders));

// Завантажити:
const leaders = JSON.parse(localStorage.getItem('leaders') || '[]');</pre>
<h3>Сортування перед відображенням</h3>
<pre>leaders.sort((a, b) => b.score - a.score); // за спаданням
const top10 = leaders.slice(0, 10);         // топ-10</pre>`,
      ru:`<h2>Таблица рекордов в localStorage</h2>
<h3>Структура данных</h3>
<pre>const leaders = [
  { name: 'Алина', score: 1500, class: 'mage', date: '2024-01-15' },
];
localStorage.setItem('leaders', JSON.stringify(leaders));</pre>
<h3>Сортировка</h3>
<pre>leaders.sort((a, b) => b.score - a.score);
const top10 = leaders.slice(0, 10);</pre>` },
    `<div class="lb-page">
  <h2>🏆 Таблиця рекордів</h2>

  <div class="add-score">
    <h3>Додати результат:</h3>
    <div class="add-row">
      <input type="text"   id="lb-name"  placeholder="Нік гравця">
      <input type="number" id="lb-score" placeholder="Очки" min="0">
      <select id="lb-class">
        <option value="warrior">⚔️ Воїн</option>
        <option value="mage">🔮 Маг</option>
        <option value="archer">🏹 Лучник</option>
      </select>
      <button onclick="addRecord()">+ Додати</button>
    </div>
  </div>

  <div class="lb-table-wrap">
    <table class="lb-table" id="lb-table">
      <thead>
        <tr><th>#</th><th>Гравець</th><th>Клас</th><th>Очки</th><th>Дата</th></tr>
      </thead>
      <tbody id="lb-body"></tbody>
    </table>
    <div class="lb-empty" id="lb-empty">Поки що немає рекордів. Будь першим!</div>
  </div>

  <button onclick="clearRecords()" class="clear-btn">🗑 Очистити таблицю</button>
</div>`,
    `${GAME_BASE}
.lb-page{max-width:580px}
.add-score{background:#0e0c24;border:1px solid #2d2b5a;border-radius:12px;padding:16px;margin-bottom:16px}
h3{font-size:14px;color:#a0a0c0;margin-bottom:10px}
.add-row{display:grid;grid-template-columns:1fr auto auto auto;gap:8px;align-items:center}
.add-row input{margin:0}
.add-row select{background:#0a0a1a;border:1px solid #2d2b5a;color:#f0f0ff;padding:10px;border-radius:8px;font-size:14px;height:42px;cursor:pointer}
.lb-table-wrap{overflow-x:auto;margin-bottom:12px}
.lb-table{width:100%;border-collapse:collapse}
.lb-table th{background:#1e1b4b;padding:10px 12px;text-align:left;font-size:12px;letter-spacing:.05em;color:#a0a0c0}
.lb-table td{padding:10px 12px;border-bottom:1px solid #1e1b4b;font-size:13px;transition:.2s}
.lb-table tr:hover td{background:rgba(124,58,237,.08)}
.lb-table tr:nth-child(1) td{color:#f59e0b;font-weight:700}
.lb-table tr:nth-child(2) td{color:#94a3b8}
.lb-table tr:nth-child(3) td{color:#92400e}
.rank-badge{display:inline-block;width:24px;height:24px;border-radius:50%;background:#1e1b4b;text-align:center;line-height:24px;font-size:12px;font-weight:700}
.lb-empty{background:#0e0c24;border:1px solid #2d2b5a;border-radius:10px;padding:24px;text-align:center;color:#4c1d95;font-size:14px}
.clear-btn{background:#1e1b4b;border-color:#4c1d95;font-size:12px;padding:7px 14px;color:#a0a0c0}
.clear-btn:hover{border-color:#ef4444;color:#f87171}`,
    `const ICONS = { warrior:'⚔️', mage:'🔮', archer:'🏹' };
let records = JSON.parse(localStorage.getItem('pq-leaders') || '[]');

// Демо-дані якщо порожньо
if (records.length === 0) {
  records = [
    { name:'SuperMage',   score:2400, cls:'mage',    date:'2024-01-10' },
    { name:'DragonSlayer',score:1800, cls:'warrior',  date:'2024-01-11' },
    { name:'ShadowArrow', score:1500, cls:'archer',   date:'2024-01-12' },
  ];
  localStorage.setItem('pq-leaders', JSON.stringify(records));
}

function render() {
  records.sort((a, b) => b.score - a.score);
  const top = records.slice(0, 10);
  const body = document.getElementById('lb-body');
  const empty = document.getElementById('lb-empty');

  if (top.length === 0) {
    body.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  const medals = ['🥇','🥈','🥉'];
  body.innerHTML = top.map((r, i) => \`
    <tr>
      <td><span class="rank-badge">\${medals[i] || (i+1)}</span></td>
      <td><b>\${r.name}</b></td>
      <td>\${ICONS[r.cls] || ''} \${r.cls}</td>
      <td><b>\${r.score.toLocaleString()}</b></td>
      <td style="color:#4c1d95">\${r.date}</td>
    </tr>\`).join('');
}

function addRecord() {
  const name  = document.getElementById('lb-name').value.trim();
  const score = parseInt(document.getElementById('lb-score').value);
  const cls   = document.getElementById('lb-class').value;
  if (!name || isNaN(score) || score < 0) return;
  records.push({ name, score, cls, date: new Date().toISOString().slice(0,10) });
  localStorage.setItem('pq-leaders', JSON.stringify(records));
  render();
  document.getElementById('lb-name').value = '';
  document.getElementById('lb-score').value = '';
}

function clearRecords() {
  if (confirm('Видалити всі рекорди?')) {
    records = [];
    localStorage.removeItem('pq-leaders');
    render();
  }
}

render();`,
    [
      { level:'easy',   uk:'Додай кілька результатів і переконайся що таблиця сортується за очками.',  ru:'Добавь несколько результатов и убедись что таблица сортируется по очкам.' },
      { level:'medium', uk:'Додай кнопку "Видалити" у кожен рядок таблиці: при кліку знаходь запис за name+score і видаляй з масиву.',  ru:'Добавь кнопку "Удалить" в каждую строку таблицы: при клике находи запись по name+score и удаляй из массива.' },
      { level:'hard',   uk:'Додай пошук по полю input#search: при введенні тексту фільтруй рядки де name.toLowerCase().includes(query).',  ru:'Добавь поиск по полю input#search: при вводе текста фильтруй строки где name.toLowerCase().includes(query).' },
    ]
  );

  /* ─── 11-10 ─────────────────────────────────────────────── */
  patch('11-10',
    { uk:`<h2>Темна тема: JS + CSS-змінні</h2>
<p>Перемикач теми через CSS custom properties — найелегантніший спосіб підтримувати темний і світлий режими.</p>
<h3>Як це працює</h3>
<pre>/* 1. Оголошуємо токени */
:root {
  --bg: #0a0a1a;
  --text: #f0f0ff;
  --card: #0e0c24;
  --accent: #7c3aed;
}

/* 2. Світла тема перевизначає токени */
[data-theme="light"] {
  --bg: #f8fafc;
  --text: #0f172a;
  --card: #ffffff;
  --accent: #7c3aed;
}

/* 3. Стилі використовують токени */
body { background: var(--bg); color: var(--text); }</pre>
<pre>// 4. JS перемикає атрибут
function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', html.dataset.theme);
}</pre>`,
      ru:`<h2>Тёмная тема: JS + CSS-переменные</h2>
<pre>:root { --bg: #0a0a1a; --text: #f0f0ff; }
[data-theme="light"] { --bg: #f8fafc; --text: #0f172a; }

body { background: var(--bg); color: var(--text); }</pre>
<pre>function toggleTheme() {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', html.dataset.theme);
}</pre>` },
    `<!DOCTYPE html>
<html lang="uk" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pixel Quest — Тема</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="theme-demo">
    <header class="td-header">
      <div class="td-logo">⚔️ Pixel Quest</div>
      <button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()">🌙 Темна</button>
    </header>

    <div class="td-cards">
      <div class="td-card accent">
        <div class="tc-icon">⚔️</div>
        <h3>Поточна тема</h3>
        <p id="theme-name">Темна</p>
      </div>
      <div class="td-card">
        <div class="tc-icon">🎨</div>
        <h3>CSS змінні</h3>
        <p>Всі кольори через var(--назва)</p>
      </div>
      <div class="td-card">
        <div class="tc-icon">💾</div>
        <h3>localStorage</h3>
        <p>Тема зберігається між сесіями</p>
      </div>
    </div>

    <div class="td-palette">
      <h3>Поточна палітра:</h3>
      <div class="pal-row">
        <div class="pal-item" id="pal-bg">--bg</div>
        <div class="pal-item" id="pal-text" style="color:var(--text)">--text</div>
        <div class="pal-item" id="pal-accent" style="color:var(--accent)">--accent</div>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
    `:root {
  --bg: #0a0a1a;
  --bg2: #0e0c24;
  --border: #2d2b5a;
  --text: #f0f0ff;
  --muted: #a0a0c0;
  --accent: #7c3aed;
  --accent-light: rgba(124,58,237,.15);
}
[data-theme="light"] {
  --bg: #f8fafc;
  --bg2: #ffffff;
  --border: #e2e8f0;
  --text: #0f172a;
  --muted: #64748b;
  --accent: #7c3aed;
  --accent-light: rgba(124,58,237,.08);
}

*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);transition:background .3s,color .3s;padding:16px}

.theme-demo{max-width:500px}

.td-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border)}
.td-logo{font-weight:700;font-size:16px;color:var(--accent)}
.theme-toggle{background:var(--bg2);border:1px solid var(--border);color:var(--text);padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;transition:.3s}
.theme-toggle:hover{border-color:var(--accent)}

.td-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px}
.td-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center;transition:background .3s,border-color .3s}
.td-card.accent{border-color:var(--accent);background:var(--accent-light)}
.tc-icon{font-size:28px;margin-bottom:8px}
.td-card h3{font-size:13px;margin-bottom:6px}
.td-card p{font-size:11px;color:var(--muted)}

.td-palette h3{font-size:13px;color:var(--muted);margin-bottom:10px}
.pal-row{display:flex;gap:8px}
.pal-item{flex:1;background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;font-size:12px;font-family:monospace;transition:.3s}`,
    `// Відновити збережену тему
const saved = localStorage.getItem('pq-theme') || 'dark';
document.documentElement.dataset.theme = saved;
updateBtn(saved);

function toggleTheme() {
  const html   = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  const next   = isDark ? 'light' : 'dark';
  html.dataset.theme = next;
  localStorage.setItem('pq-theme', next);
  updateBtn(next);
}

function updateBtn(theme) {
  const btn = document.getElementById('theme-toggle');
  const nm  = document.getElementById('theme-name');
  if (theme === 'dark') {
    btn.textContent = '☀️ Світла';
    if (nm) nm.textContent = 'Темна 🌙';
  } else {
    btn.textContent = '🌙 Темна';
    if (nm) nm.textContent = 'Світла ☀️';
  }
}`,
    [
      { level:'easy',   uk:'Натисни кнопку теми і поспостерігай як всі кольори змінюються одночасно. Оновити сторінку — тема збережена!',  ru:'Нажми кнопку темы и понаблюдай как все цвета меняются одновременно. Обнови страницу — тема сохранена!' },
      { level:'medium', uk:'Додай третю тему "Фіолетова": [data-theme="purple"] { --bg:#120829; --bg2:#1a0e3d; --accent:#f59e0b }.',  ru:'Добавь третью тему "Фиолетовая": [data-theme="purple"] { --bg:#120829; --bg2:#1a0e3d; --accent:#f59e0b }.' },
      { level:'hard',   uk:'Зроби автоматичне визначення теми за ОС: if (window.matchMedia("(prefers-color-scheme:dark)").matches) при першому візиті.',  ru:'Сделай автоматическое определение темы по ОС: if (window.matchMedia("(prefers-color-scheme:dark)").matches) при первом визите.' },
    ]
  );

  /* ─── 11-11 ─────────────────────────────────────────────── */
  patch('11-11',
    { uk:`<h2>Адаптивна мобільна версія</h2>
<p>Ігровий сайт теж повинен виглядати бездоганно на телефоні. Застосовуємо всі техніки з модуля 10.</p>
<h3>Чеклист адаптиву для ігрового сайту</h3>
<ul>
  <li>📱 Viewport meta-тег у &lt;head&gt;</li>
  <li>🍔 Гамбургер-меню на вузьких екранах</li>
  <li>📐 auto-fill/minmax для карток персонажів</li>
  <li>🔤 clamp() для заголовка hero</li>
  <li>🖼 Таблиця рекордів: overflow-x: auto</li>
  <li>🔘 Кнопки мінімум 44px висоти</li>
</ul>
<h3>Ключові медіазапити</h3>
<pre>/* Телефон — base */
.chars-grid { grid-template-columns: 1fr; }

/* Планшет */
@media (min-width: 600px) {
  .chars-grid { grid-template-columns: 1fr 1fr; }
}

/* Десктоп */
@media (min-width: 960px) {
  .chars-grid { grid-template-columns: repeat(3, 1fr); }
  .hero-section { flex-direction: row; }
}</pre>`,
      ru:`<h2>Адаптивная мобильная версия</h2>
<h3>Чеклист адаптива для игрового сайта</h3>
<ul>
  <li>📱 Viewport meta-тег</li>
  <li>🍔 Гамбургер-меню</li>
  <li>📐 auto-fill/minmax для карточек</li>
  <li>🔤 clamp() для заголовка hero</li>
  <li>🖼 overflow-x: auto для таблицы</li>
</ul>
<pre>/* Base (mobile) */
.chars-grid { grid-template-columns: 1fr; }

@media (min-width: 600px) {
  .chars-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 960px) {
  .chars-grid { grid-template-columns: repeat(3, 1fr); }
}</pre>` },
    `<div class="rsp-game-demo">
  <div class="bp-bar" id="bp-bar">Перевір ширину...</div>

  <!-- Мобільний header з гамбургером -->
  <header class="rg-header">
    <div class="rg-logo">⚔️ PQ</div>
    <nav class="rg-nav" id="rg-nav">
      <a href="#">Персонажі</a>
      <a href="#">Рекорди</a>
      <a href="#">Грати</a>
    </nav>
    <button class="rg-burger" id="rg-burger">
      <span></span><span></span><span></span>
    </button>
  </header>

  <!-- Hero -->
  <section class="rg-hero">
    <div class="rg-hero-txt">
      <h1>Pixel Quest</h1>
      <p>Пригоди у кожному пікселі!</p>
      <button class="rg-play">▶ Грати</button>
    </div>
    <div class="rg-hero-art">🎮</div>
  </section>

  <!-- Адаптивні картки -->
  <section class="rg-section">
    <h3>Персонажі</h3>
    <div class="rg-chars">
      <div class="rg-char" style="background:linear-gradient(135deg,#1e3a5f,#3b82f6)">⚔️<b>Воїн</b></div>
      <div class="rg-char" style="background:linear-gradient(135deg,#2a1033,#8b5cf6)">🔮<b>Маг</b></div>
      <div class="rg-char" style="background:linear-gradient(135deg,#1a2e22,#059669)">🏹<b>Лучник</b></div>
    </div>
  </section>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0a0a1a;color:#f0f0ff}

.bp-bar{background:#7c3aed;padding:8px;text-align:center;font-size:13px;font-weight:600}

/* ── Header ── */
.rg-header{background:#0e0c24;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #2d2b5a;position:relative}
.rg-logo{font-weight:900;font-size:18px;color:#c4b5fd}
.rg-nav{display:none;flex-direction:column;gap:4px;position:absolute;top:100%;left:0;right:0;background:#0e0c24;padding:10px 16px;border-bottom:1px solid #2d2b5a}
.rg-nav.open{display:flex}
.rg-nav a{color:#a0a0c0;text-decoration:none;padding:10px;border-radius:8px;font-size:14px}
.rg-nav a:hover{color:#c4b5fd;background:rgba(124,58,237,.15)}
.rg-burger{background:none;border:none;cursor:pointer;padding:7px;display:flex;flex-direction:column;gap:5px}
.rg-burger span{display:block;width:22px;height:2px;background:#f0f0ff;border-radius:2px;transition:.3s}
.rg-burger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.rg-burger.open span:nth-child(2){opacity:0}
.rg-burger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* ── Hero (Mobile first) ── */
.rg-hero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:24px 16px;gap:20px;background:linear-gradient(135deg,#0a0a1a,#1e1b4b)}
.rg-hero-txt h1{font-size:clamp(22px,6vw,42px);font-weight:900;margin-bottom:8px;color:#c4b5fd}
.rg-hero-txt p{font-size:14px;color:#a0a0c0;margin-bottom:16px}
.rg-play{background:#7c3aed;border:none;color:#fff;padding:12px 28px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;min-height:44px}
.rg-hero-art{font-size:64px;line-height:1}

/* ── Cards ── */
.rg-section{padding:16px}
.rg-section h3{font-size:14px;color:#a0a0c0;margin-bottom:12px}
.rg-chars{display:grid;grid-template-columns:1fr;gap:10px}
.rg-char{border-radius:12px;padding:16px;display:flex;align-items:center;gap:10px;font-size:24px}
.rg-char b{font-size:15px}

/* ── Tablet ── */
@media(min-width:600px){
  .rg-nav{display:flex;flex-direction:row;gap:4px;position:static;background:none;border:none;padding:0}
  .rg-burger{display:none}
  .rg-chars{grid-template-columns:1fr 1fr}
}
/* ── Desktop ── */
@media(min-width:960px){
  .rg-hero{flex-direction:row;text-align:left;padding:32px 24px}
  .rg-hero-art{font-size:100px}
  .rg-chars{grid-template-columns:repeat(3,1fr)}
}`,
    `const burger = document.getElementById('rg-burger');
const nav    = document.getElementById('rg-nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});

function checkBP() {
  const w  = window.innerWidth;
  const bp = document.getElementById('bp-bar');
  if (w >= 960) { bp.textContent = '💻 Десктоп ('+w+'px)'; bp.style.background='#059669'; }
  else if (w >= 600) { bp.textContent = '📲 Планшет ('+w+'px)'; bp.style.background='#f59e0b'; }
  else { bp.textContent = '📱 Мобайл ('+w+'px)'; bp.style.background='#7c3aed'; }
}
checkBP();
window.addEventListener('resize', checkBP);`,
    [
      { level:'easy',   uk:'Поміняй розмір вікна і спостерігай за адаптацією. При якій ширині hero виходить у 2 колонки?',  ru:'Поменяй размер окна и наблюдай за адаптацией. При какой ширине hero выходит в 2 колонки?' },
      { level:'medium', uk:'Додай четверту rg-char "Паладин 🪄" і перевір що при mobile-ширині він виводиться у окремому рядку.',  ru:'Добавь четвёртую rg-char "Паладин 🪄" и проверь что при mobile-ширине он выводится в отдельной строке.' },
      { level:'hard',   uk:'Зроби нижню навігацію для мобайлу: fixed position внизу екрану з 3-4 іконками, відображається лише при width < 600px.',  ru:'Сделай нижнюю навигацию для мобайла: fixed position внизу экрана с 3-4 иконками, отображается только при width < 600px.' },
    ]
  );

  /* ─── 11-12 ─────────────────────────────────────────────── */
  patch('11-12',
    { uk:`<h2>Canvas: малюємо фон гри</h2>
<p>HTML5 Canvas — це «полотно» де можна малювати фігури, анімації і навіть ігри через JavaScript.</p>
<h3>Базовий Canvas</h3>
<pre>&lt;canvas id="c" width="600" height="300"&gt;&lt;/canvas&gt;</pre>
<pre>const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d'); // 2D-контекст

// Прямокутник:
ctx.fillStyle = '#7c3aed';
ctx.fillRect(10, 10, 100, 50); // x, y, width, height

// Коло:
ctx.beginPath();
ctx.arc(200, 100, 40, 0, Math.PI * 2); // x, y, r, startAngle, endAngle
ctx.fillStyle = '#f59e0b';
ctx.fill();</pre>
<h3>Анімація через requestAnimationFrame</h3>
<pre>function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // малюємо кожен кадр...
  requestAnimationFrame(animate); // наступний кадр
}
animate();</pre>`,
      ru:`<h2>Canvas: рисуем фон игры</h2>
<pre>const ctx = canvas.getContext('2d');

ctx.fillStyle = '#7c3aed';
ctx.fillRect(10, 10, 100, 50);

ctx.beginPath();
ctx.arc(200, 100, 40, 0, Math.PI * 2);
ctx.fill();</pre>
<h3>Анимация через requestAnimationFrame</h3>
<pre>function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
}
animate();</pre>` },
    `<div class="canvas-demo">
  <canvas id="game-canvas"></canvas>

  <div class="canvas-controls">
    <button onclick="toggleStars()">✨ Зірки</button>
    <button onclick="togglePlanets()">🪐 Планети</button>
    <button onclick="toggleShoot()">⭐ Метеори</button>
    <button onclick="changeTheme()">🎨 Тема</button>
  </div>
</div>`,
    `${GAME_BASE}
body{padding:0}
.canvas-demo{display:flex;flex-direction:column;height:100vh}
#game-canvas{flex:1;display:block}
.canvas-controls{background:#0e0c24;display:flex;gap:8px;padding:10px 16px;flex-wrap:wrap}
.canvas-controls button{padding:7px 14px;font-size:13px}`,
    `const canvas = document.getElementById('game-canvas');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

// ── Зірки ──
const stars = Array.from({length:120}, () => ({
  x: Math.random(), y: Math.random(),
  r: Math.random()*2+.5, speed: Math.random()*.3+.1,
  opacity: Math.random()
}));
let showStars = true, showPlanets = true, showShoot = true;

const themes = ['#0a0a1a','#0a1a0a','#1a0a0a','#0a0a2a'];
let themeIdx = 0;

// ── Планети ──
const planets = [
  {x:.2, y:.3, r:28, color:'#3b82f6', speed:.0003, angle:0},
  {x:.7, y:.6, r:18, color:'#f59e0b', speed:.0005, angle:2},
  {x:.5, y:.2, r:14, color:'#059669', speed:.0007, angle:4},
];

// ── Метеори ──
const meteors = Array.from({length:5}, createMeteor);
function createMeteor() {
  return { x:Math.random(), y:0, vx:Math.random()*.003+.001, vy:Math.random()*.004+.002, alpha:1 };
}

let frame = 0;
function animate() {
  const W = canvas.width, H = canvas.height;
  frame++;

  // Фон
  ctx.fillStyle = themes[themeIdx];
  ctx.fillRect(0, 0, W, H);

  // Зірки
  if (showStars) {
    stars.forEach(s => {
      s.opacity += .02 * s.speed;
      ctx.globalAlpha = Math.abs(Math.sin(s.opacity));
      ctx.beginPath();
      ctx.arc(s.x*W, s.y*H, s.r, 0, Math.PI*2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  // Планети
  if (showPlanets) {
    planets.forEach(p => {
      p.angle += p.speed;
      const cx = p.x*W + Math.cos(p.angle)*30;
      const cy = p.y*H + Math.sin(p.angle)*20;
      const g  = ctx.createRadialGradient(cx-p.r*.3, cy-p.r*.3, 0, cx, cy, p.r);
      g.addColorStop(0, p.color+'ff');
      g.addColorStop(1, p.color+'44');
      ctx.beginPath(); ctx.arc(cx, cy, p.r, 0, Math.PI*2);
      ctx.fillStyle = g; ctx.fill();
      // Кільце
      ctx.beginPath(); ctx.ellipse(cx, cy, p.r*1.8, p.r*.5, .4, 0, Math.PI*2);
      ctx.strokeStyle = p.color+'66'; ctx.lineWidth = 2; ctx.stroke();
    });
  }

  // Метеори
  if (showShoot) {
    meteors.forEach((m, i) => {
      m.x += m.vx; m.y += m.vy; m.alpha -= .008;
      if (m.alpha <= 0 || m.x > 1) meteors[i] = createMeteor();
      ctx.globalAlpha = m.alpha;
      ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x*W, m.y*H);
      ctx.lineTo((m.x - m.vx*30)*W, (m.y - m.vy*30)*H);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  requestAnimationFrame(animate);
}
animate();

function toggleStars()   { showStars   = !showStars; }
function togglePlanets() { showPlanets = !showPlanets; }
function toggleShoot()   { showShoot   = !showShoot; }
function changeTheme()   { themeIdx = (themeIdx+1) % themes.length; }`,
    [
      { level:'easy',   uk:'Натисни кнопки щоб увімкнути/вимкнути зірки, планети і метеори. Спробуй кнопку Тема.',  ru:'Нажми кнопки чтобы включить/выключить звёзды, планеты и метеоры. Попробуй кнопку Тема.' },
      { level:'medium', uk:'Додай четверту планету з власним кольором (наприклад #ef4444) і радіусом 20.',  ru:'Добавь четвёртую планету с собственным цветом (например #ef4444) и радиусом 20.' },
      { level:'hard',   uk:'Додай анімацію "зоряний дощ": при кліку на Canvas в тій точці з\'являються 10 розліт-частинок що розлітаються і зникають.',  ru:'Добавь анимацию "звёздный дождь": при клике на Canvas в той точке появляются 10 частиц которые разлетаются и исчезают.' },
    ]
  );

  /* ─── 11-13 ─────────────────────────────────────────────── */
  patch('11-13',
    { uk:`<h2>Аудіо: Web Audio API — звуки кнопок</h2>
<p>Web Audio API дозволяє генерувати та відтворювати звуки прямо у браузері без файлів.</p>
<h3>AudioContext — основа</h3>
<pre>const ctx = new AudioContext(); // один на сторінку</pre>
<h3>Генерація тону</h3>
<pre>function playTone(freq, duration, type = 'sine') {
  const osc  = ctx.createOscillator(); // генератор хвилі
  const gain = ctx.createGain();       // гучність

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.frequency.value = freq;  // Гц (440 = нота Ля)
  osc.type = type;              // 'sine','square','sawtooth','triangle'

  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}</pre>`,
      ru:`<h2>Аудио: Web Audio API — звуки кнопок</h2>
<pre>const ctx = new AudioContext();

function playTone(freq, duration, type = 'sine') {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = type;
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}</pre>` },
    `<div class="audio-demo">
  <h2>🎵 Ігрові звуки</h2>
  <p>Клікай на кнопки — кожна відтворює унікальний звук!</p>

  <div class="sound-grid">
    <button class="snd-btn" onclick="playClick()" style="border-color:#4ade80">
      <span>🖱 Клік</span><small>click</small>
    </button>
    <button class="snd-btn" onclick="playSuccess()" style="border-color:#f59e0b">
      <span>✅ Успіх</span><small>success</small>
    </button>
    <button class="snd-btn" onclick="playError()" style="border-color:#f87171">
      <span>❌ Помилка</span><small>error</small>
    </button>
    <button class="snd-btn" onclick="playLevel()" style="border-color:#60a5fa">
      <span>🎮 Рівень</span><small>level up</small>
    </button>
    <button class="snd-btn" onclick="playCoin()" style="border-color:#fbbf24">
      <span>🪙 Монета</span><small>coin</small>
    </button>
    <button class="snd-btn" onclick="playBoss()" style="border-color:#c4b5fd">
      <span>👹 Бос</span><small>boss</small>
    </button>
  </div>

  <div class="waveform-wrap">
    <h3>Хвилі тонів:</h3>
    <div class="wave-btns">
      <button onclick="playWave('sine')"     class="wbtn">Sine 〜</button>
      <button onclick="playWave('square')"   class="wbtn">Square ⊓</button>
      <button onclick="playWave('sawtooth')" class="wbtn">Saw /</button>
      <button onclick="playWave('triangle')" class="wbtn">Tri △</button>
    </div>
    <input type="range" id="freq-range" min="100" max="2000" value="440" step="10">
    <div class="freq-label" id="freq-label">440 Гц (нота Ля)</div>
  </div>

  <div class="vol-row">
    <label>Гучність: <b id="vol-val">50</b>%</label>
    <input type="range" id="vol-range" min="0" max="100" value="50">
  </div>
</div>`,
    `${GAME_BASE}
.audio-demo{max-width:500px}
p{font-size:13px;color:#a0a0c0;margin-bottom:16px}
.sound-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:20px}
.snd-btn{background:#0e0c24;border-width:2px;padding:16px 8px;display:flex;flex-direction:column;align-items:center;gap:4px}
.snd-btn span{font-size:14px;font-weight:600}
.snd-btn small{font-size:10px;color:#a0a0c0;font-family:monospace}
.waveform-wrap{background:#0e0c24;border:1px solid #2d2b5a;border-radius:12px;padding:16px;margin-bottom:14px}
h3{font-size:13px;color:#a0a0c0;margin-bottom:10px}
.wave-btns{display:flex;gap:6px;margin-bottom:10px}
.wbtn{padding:6px 12px;font-size:12px;font-family:monospace}
input[type=range]{width:100%;accent-color:#7c3aed;cursor:pointer;margin-bottom:6px}
.freq-label{font-size:12px;color:#a0a0c0;font-family:monospace}
.vol-row{background:#0e0c24;border:1px solid #2d2b5a;border-radius:10px;padding:12px}
.vol-row label{font-size:13px;color:#a0a0c0;display:block;margin-bottom:6px}
.vol-row b{color:#c4b5fd}`,
    `let audioCtx = null;
let masterVol = 0.5;

function getCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(freq, dur, type, vol) {
  const ctx  = getCtx();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = type || 'sine';
  const v = (vol || .5) * masterVol;
  gain.gain.setValueAtTime(v, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + dur);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + dur);
}

function playClick()   { tone(600, .05, 'square', .4); }
function playSuccess() {
  tone(523, .1,'sine'); tone(659, .1,'sine'); setTimeout(()=>tone(784,.2,'sine'), 100);
}
function playError()   { tone(200, .15,'square',.6); setTimeout(()=>tone(150,.2,'sawtooth',.5), 150); }
function playLevel()   {
  [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.15,'sine',.7),i*120));
}
function playCoin()    { tone(1000,.05,'square',.3); setTimeout(()=>tone(1400,.1,'square',.3),60); }
function playBoss()    { tone(80,.4,'sawtooth',.8); setTimeout(()=>tone(60,.5,'sawtooth',.8),400); }

function playWave(type) {
  const freq = parseInt(document.getElementById('freq-range').value);
  tone(freq, .4, type);
}

document.getElementById('freq-range').addEventListener('input', function () {
  const notes = {261:'До',294:'Ре',330:'Мі',349:'Фа',392:'Соль',440:'Ля',494:'Сі',523:'До+'};
  const f = parseInt(this.value);
  const note = Object.entries(notes).find(([hz])=>Math.abs(hz-f)<20);
  document.getElementById('freq-label').textContent = f + ' Гц' + (note?' (нота '+note[1]+')':'');
});

document.getElementById('vol-range').addEventListener('input', function () {
  masterVol = this.value / 100;
  document.getElementById('vol-val').textContent = this.value;
});`,
    [
      { level:'easy',   uk:'Натисни всі 6 ігрових кнопок і порівняй звуки. Який звук тобі найбільше подобається?',  ru:'Нажми все 6 игровых кнопок и сравни звуки. Какой звук тебе больше всего нравится?' },
      { level:'medium', uk:'Додай кнопку "🎵 Мелодія" яка грає 5 нот по черзі: [262,330,392,523,659] кожна через 200мс.',  ru:'Добавь кнопку "🎵 Мелодия" которая играет 5 нот по очереди: [262,330,392,523,659] каждая через 200мс.' },
      { level:'hard',   uk:'Зроби "піано": 8 кнопок з нотами До-До+ (262,294,330,349,392,440,494,523). При наведенні підсвічуй, при кліку — грай ноту.',  ru:'Сделай "пианино": 8 кнопок с нотами До-До+ (262,294,330,349,392,440,494,523). При клике играй ноту.' },
    ]
  );

  /* ─── 11-14 ─────────────────────────────────────────────── */
  patch('11-14',
    { uk:`<h2>Фінальна перевірка та виправлення</h2>
<p>Перш ніж показати сайт іншим — перевір всі деталі. Дрібниці роблять різницю між "ок" і "вау"!</p>
<h3>Що перевіряємо</h3>
<ul>
  <li>✅ Всі посилання у навігації працюють</li>
  <li>✅ Форма реєстрації валідує всі поля</li>
  <li>✅ Таблиця рекордів сортується правильно</li>
  <li>✅ Тема зберігається після перезавантаження</li>
  <li>✅ Гамбургер-меню відкривається на мобайлі</li>
  <li>✅ Canvas анімація не "гальмує" (60 fps)</li>
</ul>
<h3>Типові помилки</h3>
<pre>// ❌ Погано: getElementById без перевірки
const el = document.getElementById('box');
el.style.color = 'red'; // ReferenceError якщо null!

// ✅ Добре: перевірка перед використанням
const el = document.getElementById('box');
if (el) el.style.color = 'red';</pre>
<h3>Chrome DevTools — Перевірка консолі</h3>
<p>Відкрий DevTools → Console. Жодної червоної помилки не повинно бути!</p>`,
      ru:`<h2>Финальная проверка и исправления</h2>
<h3>Что проверяем</h3>
<ul>
  <li>✅ Все ссылки в навигации работают</li>
  <li>✅ Форма регистрации валидирует все поля</li>
  <li>✅ Таблица рекордов сортируется правильно</li>
  <li>✅ Тема сохраняется после перезагрузки</li>
  <li>✅ Гамбургер-меню открывается на мобайле</li>
</ul>
<h3>Типичные ошибки</h3>
<pre>// ❌ Плохо:
document.getElementById('box').style.color = 'red';

// ✅ Хорошо:
const el = document.getElementById('box');
if (el) el.style.color = 'red';</pre>` },
    `<div class="check-page">
  <h2>🛠 Чеклист фінальної перевірки</h2>
  <p>Постав ✅ на кожен пункт після перевірки:</p>

  <div class="section-checks">
    <div class="sc-group">
      <h3>HTML та структура</h3>
      <div class="cl-item"><input type="checkbox" id="c1"><label for="c1">viewport meta-тег у &lt;head&gt;</label></div>
      <div class="cl-item"><input type="checkbox" id="c2"><label for="c2">Всі зображення мають атрибут alt=""</label></div>
      <div class="cl-item"><input type="checkbox" id="c3"><label for="c3">Теги закриті коректно</label></div>
    </div>
    <div class="sc-group">
      <h3>CSS та вигляд</h3>
      <div class="cl-item"><input type="checkbox" id="c4"><label for="c4">Сайт виглядає на 375px (телефон)</label></div>
      <div class="cl-item"><input type="checkbox" id="c5"><label for="c5">Немає горизонтального скролу</label></div>
      <div class="cl-item"><input type="checkbox" id="c6"><label for="c6">Теми Dark/Light перемикаються</label></div>
    </div>
    <div class="sc-group">
      <h3>JavaScript</h3>
      <div class="cl-item"><input type="checkbox" id="c7"><label for="c7">Консоль DevTools без помилок</label></div>
      <div class="cl-item"><input type="checkbox" id="c8"><label for="c8">Форма валідує всі поля</label></div>
      <div class="cl-item"><input type="checkbox" id="c9"><label for="c9">localStorage зберігає рекорди</label></div>
      <div class="cl-item"><input type="checkbox" id="c10"><label for="c10">Фільтр персонажів працює</label></div>
    </div>
    <div class="sc-group">
      <h3>Продуктивність</h3>
      <div class="cl-item"><input type="checkbox" id="c11"><label for="c11">Canvas анімація плавна</label></div>
      <div class="cl-item"><input type="checkbox" id="c12"><label for="c12">Зображення мають max-width:100%</label></div>
    </div>
  </div>

  <div class="check-result" id="check-result">0 / 12 пунктів</div>
</div>`,
    `${GAME_BASE}
.check-page{max-width:520px}
p{font-size:13px;color:#a0a0c0;margin-bottom:16px}
.section-checks{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.sc-group{background:#0e0c24;border:1px solid #2d2b5a;border-radius:12px;padding:14px}
.sc-group h3{font-size:13px;color:#a0a0c0;margin-bottom:10px}
.cl-item{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #1e1b4b;font-size:13px}
.cl-item:last-child{border-bottom:none}
.cl-item input[type=checkbox]{width:16px;height:16px;accent-color:#7c3aed;cursor:pointer;flex-shrink:0;margin:0}
.cl-item label{cursor:pointer;color:#a0a0c0;transition:.2s;line-height:1.3}
.cl-item input:checked+label{color:#4ade80;text-decoration:line-through;opacity:.7}
.check-result{background:#0e0c24;border:2px solid #2d2b5a;border-radius:10px;padding:14px;text-align:center;font-size:15px;font-weight:700;transition:.3s}`,
    `const boxes = document.querySelectorAll('.cl-item input[type=checkbox]');
const res   = document.getElementById('check-result');

boxes.forEach(cb => {
  cb.addEventListener('change', updateResult);
});

function updateResult() {
  const total = boxes.length;
  const done  = document.querySelectorAll('.cl-item input:checked').length;
  const pct   = Math.round(done / total * 100);
  res.textContent = done + ' / ' + total + ' пунктів (' + pct + '%)';
  if (done === total) {
    res.style.borderColor = '#059669';
    res.style.color = '#4ade80';
    res.textContent = '🎉 Відмінно! Всі ' + total + ' пунктів виконано! Сайт готовий!';
  } else if (pct >= 75) {
    res.style.borderColor = '#f59e0b';
    res.style.color = '#fbbf24';
  } else {
    res.style.borderColor = '#2d2b5a';
    res.style.color = '#f0f0ff';
  }
}`,
    [
      { level:'easy',   uk:'Пройдись по всіх пунктах чеклисту і відзнач ті що вже виконані.',  ru:'Пройдись по всем пунктам чеклиста и отметь те что уже выполнены.' },
      { level:'medium', uk:'Додай 3 нові пункти у відповідну sc-group: "Звуки кнопок працюють", "Canvas без гальм", "Нікнейм гравця зберігається".',  ru:'Добавь 3 новых пункта в подходящую sc-group: "Звуки кнопок работают", "Canvas без лагов", "Никнейм игрока сохраняется".' },
      { level:'hard',   uk:'Збережи стан чеклисту у localStorage: при закритті відновлюй позначені пункти (серіалізуй масив id відмічених чекбоксів).',  ru:'Сохрани состояние чеклиста в localStorage: при закрытии восстанавливай отмеченные пункты.' },
    ]
  );

  /* ─── 11-15 (ФІНАЛ) ─────────────────────────────────────── */
  patch('11-15',
    { uk:`<h2>ФІНАЛ 2: Повний ігровий сайт «Pixel Quest»</h2>
<p>Усі компоненти зібрані разом! Це повноцінний ігровий сайт з усіма функціями що ти вивчив у модулях 7–11.</p>
<h3>Що реалізовано</h3>
<ul>
  <li>✅ Адаптивний header з гамбургером</li>
  <li>✅ Hero-секція з анімованим Canvas-фоном</li>
  <li>✅ Фільтрована галерея персонажів</li>
  <li>✅ Кроки «Як грати» з анімацією</li>
  <li>✅ Лічильник очок + таймер</li>
  <li>✅ Форма реєстрації з валідацією</li>
  <li>✅ Таблиця рекордів у localStorage</li>
  <li>✅ Dark/Light тема + CSS-змінні</li>
  <li>✅ Ігрові звуки через Web Audio API</li>
</ul>
<p>🎓 <strong>Вітаємо!</strong> Ти завершив Модуль 11 і весь курс «Веб-Старт»! Тепер ти вмієш будувати справжні сайти.</p>`,
      ru:`<h2>ФИНАЛ 2: Полный игровой сайт «Pixel Quest»</h2>
<ul>
  <li>✅ Адаптивный header с гамбургером</li>
  <li>✅ Hero с анимированным Canvas-фоном</li>
  <li>✅ Фильтрованная галерея персонажей</li>
  <li>✅ Шаги «Как играть» с анимацией</li>
  <li>✅ Счётчик очков + таймер</li>
  <li>✅ Форма регистрации с валидацией</li>
  <li>✅ Таблица рекордов в localStorage</li>
  <li>✅ Dark/Light тема + CSS-переменные</li>
  <li>✅ Игровые звуки через Web Audio API</li>
</ul>
<p>🎓 <strong>Поздравляем!</strong> Ты завершил Модуль 11 и весь курс «Веб-Старт»!</p>` },
    `<!DOCTYPE html>
<html lang="uk" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pixel Quest — Ігровий Сайт</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Canvas фон -->
  <canvas id="bg-canvas"></canvas>

  <!-- Header -->
  <header class="pq-header">
    <div class="pq-logo">⚔️ <span>Pixel Quest</span></div>
    <nav class="pq-nav" id="pq-nav">
      <a href="#chars" onclick="closeNav()">Персонажі</a>
      <a href="#howto" onclick="closeNav()">Як грати</a>
      <a href="#records" onclick="closeNav()">Рекорди</a>
      <a href="#play" onclick="closeNav()">Грати!</a>
    </nav>
    <div class="pq-hdr-right">
      <button class="pq-theme-btn" id="pq-theme-btn" onclick="toggleTheme()">🌙</button>
      <button class="pq-burger" id="pq-burger" onclick="toggleNav()">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <!-- Hero -->
  <section class="pq-hero">
    <div class="pq-hero-txt">
      <div class="pq-badge">🎮 RPG ADVENTURE 2024</div>
      <h1>Поринь у світ<br><span class="pq-glow">Pixel Quest!</span></h1>
      <p>Обери героя, перемагай ворогів та встанови рекорд серед друзів!</p>
      <div class="pq-hero-btns">
        <button class="pq-btn-main" onclick="scrollTo('#play')">▶ Грати зараз</button>
        <button class="pq-btn-out" onclick="scrollTo('#records')">🏆 Рекорди</button>
      </div>
    </div>
    <div class="pq-hero-art">
      <div class="pq-char-big" id="pq-hero-char">🧙‍♂️</div>
    </div>
  </section>

  <!-- Персонажі -->
  <section class="pq-section" id="chars">
    <h2>👥 Оберіть персонажа</h2>
    <div class="pq-filters">
      <button class="pq-f active" data-f="all"     onclick="filterChars('all',this)">Всі</button>
      <button class="pq-f" data-f="warrior" onclick="filterChars('warrior',this)">⚔️ Воїни</button>
      <button class="pq-f" data-f="mage"    onclick="filterChars('mage',this)">🔮 Маги</button>
      <button class="pq-f" data-f="archer"  onclick="filterChars('archer',this)">🏹 Лучники</button>
    </div>
    <div class="pq-chars" id="pq-chars">
      <div class="pq-char-card" data-class="warrior" onclick="pickChar(this,'Воїн','⚔️')">
        <div class="pcc-av" style="background:linear-gradient(135deg,#1e3a5f,#3b82f6)">⚔️</div>
        <b>Воїн</b><span>Танк · Сила</span>
      </div>
      <div class="pq-char-card" data-class="mage" onclick="pickChar(this,'Маг','🔮')">
        <div class="pcc-av" style="background:linear-gradient(135deg,#2a1033,#8b5cf6)">🔮</div>
        <b>Маг</b><span>DPS · Магія</span>
      </div>
      <div class="pq-char-card" data-class="archer" onclick="pickChar(this,'Лучник','🏹')">
        <div class="pcc-av" style="background:linear-gradient(135deg,#1a2e22,#059669)">🏹</div>
        <b>Лучник</b><span>DPS · Швидкість</span>
      </div>
      <div class="pq-char-card" data-class="warrior" onclick="pickChar(this,'Паладин','🪄')">
        <div class="pcc-av" style="background:linear-gradient(135deg,#2d1e0f,#f59e0b)">🪄</div>
        <b>Паладин</b><span>Підтримка</span>
      </div>
    </div>
  </section>

  <!-- Як грати -->
  <section class="pq-section pq-alt" id="howto">
    <h2>📖 Як грати</h2>
    <div class="pq-steps">
      <div class="pq-step"><div class="pqs-num">1</div><h3>Обери героя</h3><p>Воїн, Маг або Лучник</p></div>
      <div class="pq-step"><div class="pqs-num">2</div><h3>Дослідь карту</h3><p>Підземелля і замки</p></div>
      <div class="pq-step"><div class="pqs-num">3</div><h3>Перемагай</h3><p>Покрокові битви</p></div>
      <div class="pq-step"><div class="pqs-num">4</div><h3>Рекорд!</h3><p>Таблиця лідерів</p></div>
    </div>
  </section>

  <!-- Міні-гра -->
  <section class="pq-section" id="play">
    <h2>🎮 Міні-гра: Збирай зірки!</h2>
    <div class="minigame">
      <div class="mg-stats">
        <span>⭐ Очки: <b id="mg-score">0</b></span>
        <span>⏱ Час: <b id="mg-time">30</b>с</span>
        <span id="mg-char-name">Герой: —</span>
      </div>
      <div class="mg-field" id="mg-field">
        <div class="mg-start" id="mg-start">
          <p>Обери персонажа вище</p>
          <p>потім натисни</p>
          <button onclick="startMG()">▶ Старт</button>
        </div>
      </div>
      <button onclick="saveRecord()" class="pq-btn-out" style="width:100%;margin-top:10px">💾 Зберегти рекорд</button>
    </div>
  </section>

  <!-- Рекорди -->
  <section class="pq-section pq-alt" id="records">
    <h2>🏆 Таблиця рекордів</h2>
    <div class="pq-lb" id="pq-lb"></div>
    <button onclick="clearLB()" style="font-size:12px;margin-top:10px;color:#a0a0c0">🗑 Очистити</button>
  </section>

  <footer class="pq-footer">
    <div>⚔️ Pixel Quest · 2024 · Зроблено у Web Academy 8–11</div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
    `/* ── TOKENS ── */
:root{
  --bg:#0a0a1a;--bg2:#0e0c24;--border:#2d2b5a;
  --text:#f0f0ff;--muted:#a0a0c0;
  --accent:#7c3aed;--gold:#f59e0b;
  --accent-glow:rgba(124,58,237,.15);
}
[data-theme="light"]{
  --bg:#f0f0ff;--bg2:#fff;--border:#e2e8f0;
  --text:#0a0a1a;--muted:#64748b;
  --accent:#7c3aed;--gold:#d97706;
  --accent-glow:rgba(124,58,237,.08);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);transition:background .3s,color .3s}

/* Canvas BG */
#bg-canvas{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.35}

/* Header */
.pq-header{position:sticky;top:0;z-index:100;background:rgba(10,10,26,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:12px 20px}
.pq-logo{font-weight:900;font-size:16px;color:var(--accent)}
.pq-logo span{color:var(--muted);font-weight:400}
.pq-nav{display:none;flex-direction:column;gap:4px;position:absolute;top:100%;left:0;right:0;background:var(--bg2);border-bottom:1px solid var(--border);padding:10px 20px}
.pq-nav.open{display:flex}
.pq-nav a{color:var(--muted);text-decoration:none;padding:10px;border-radius:8px;font-size:14px;transition:.2s}
.pq-nav a:hover{color:var(--accent);background:var(--accent-glow)}
.pq-hdr-right{display:flex;gap:8px;align-items:center}
.pq-theme-btn{background:none;border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:7px;cursor:pointer;font-size:16px}
.pq-burger{background:none;border:none;cursor:pointer;padding:7px;display:flex;flex-direction:column;gap:5px}
.pq-burger span{display:block;width:22px;height:2px;background:var(--text);border-radius:2px;transition:.3s}
.pq-burger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.pq-burger.open span:nth-child(2){opacity:0}
.pq-burger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* Sections */
.pq-section{position:relative;z-index:1;padding:32px 16px;max-width:700px;margin:0 auto}
.pq-alt{background:rgba(14,12,36,.7);margin:0;max-width:100%;padding:32px}
.pq-alt .pq-section{padding:0;max-width:700px;margin:0 auto}
.pq-section h2{font-size:22px;margin-bottom:16px}

/* Hero */
.pq-hero{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;padding:40px 16px;gap:24px;background:linear-gradient(135deg,rgba(10,10,26,.9),rgba(30,27,75,.8))}
.pq-badge{display:inline-block;background:var(--accent-glow);border:1px solid var(--accent);color:#c4b5fd;padding:4px 14px;border-radius:20px;font-size:12px;letter-spacing:.1em;margin-bottom:14px}
.pq-hero-txt h1{font-size:clamp(26px,6vw,48px);font-weight:900;margin-bottom:10px;line-height:1.2}
.pq-glow{color:#c4b5fd;animation:glow 2s ease-in-out infinite}
@keyframes glow{0%,100%{text-shadow:0 0 20px #7c3aed}50%{text-shadow:0 0 40px #7c3aed,0 0 60px #a855f7}}
.pq-hero-txt p{font-size:14px;color:var(--muted);margin-bottom:20px;max-width:360px}
.pq-hero-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.pq-btn-main{background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;color:#fff;padding:12px 26px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:.2s}
.pq-btn-main:hover{filter:brightness(1.1);transform:translateY(-2px)}
.pq-btn-out{background:none;border:2px solid var(--accent);color:var(--accent);padding:10px 22px;border-radius:10px;font-size:14px;cursor:pointer;transition:.2s}
.pq-btn-out:hover{background:var(--accent-glow)}
.pq-char-big{font-size:80px;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}

/* Chars */
.pq-filters{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.pq-f{background:var(--bg2);border:1px solid var(--border);color:var(--muted);padding:7px 14px;border-radius:8px;cursor:pointer;font-size:13px;transition:.2s}
.pq-f.active,.pq-f:hover{border-color:var(--accent);color:#c4b5fd}
.pq-chars{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-bottom:8px}
.pq-char-card{background:var(--bg2);border:2px solid var(--border);border-radius:12px;padding:16px;text-align:center;cursor:pointer;transition:.2s;display:flex;flex-direction:column;align-items:center;gap:6px}
.pq-char-card:hover,.pq-char-card.active{border-color:var(--gold);transform:translateY(-3px)}
.pcc-av{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px}
.pq-char-card b{font-size:14px}
.pq-char-card span{font-size:11px;color:var(--muted)}
.pq-char-card.hidden{display:none}

/* Steps */
.pq-steps{display:flex;gap:0;overflow-x:auto;padding-bottom:8px}
.pq-step{flex:1;min-width:120px;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 8px}
.pqs-num{width:40px;height:40px;border-radius:50%;background:var(--accent);color:#fff;font-size:18px;font-weight:900;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
.pq-step h3{font-size:13px;margin-bottom:4px}
.pq-step p{font-size:11px;color:var(--muted)}

/* Minigame */
.minigame{background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:16px}
.mg-stats{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px;font-size:13px;color:var(--muted)}
.mg-stats b{color:var(--text)}
.mg-field{background:var(--bg);border:1px solid var(--border);border-radius:10px;min-height:180px;position:relative;overflow:hidden}
.mg-start{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--muted);font-size:14px}
.mg-star{position:absolute;font-size:28px;cursor:pointer;transition:transform .1s;user-select:none}
.mg-star:hover{transform:scale(1.2)}

/* Leaderboard */
.pq-lb{overflow-x:auto}
.pq-lb table{width:100%;border-collapse:collapse;font-size:13px}
.pq-lb th{background:var(--bg2);padding:10px;text-align:left;color:var(--muted);font-size:11px}
.pq-lb td{padding:10px;border-bottom:1px solid var(--border)}
.pq-lb tr:nth-child(1) td{color:var(--gold);font-weight:700}

/* Footer */
.pq-footer{position:relative;z-index:1;background:var(--bg2);border-top:1px solid var(--border);padding:16px;text-align:center;font-size:13px;color:var(--muted)}

/* Responsive */
@media(min-width:640px){
  .pq-nav{display:flex;flex-direction:row;gap:4px;position:static;background:none;border:none;padding:0}
  .pq-burger{display:none}
  .pq-hero{flex-direction:row;text-align:left;padding:48px 24px}
  .pq-hero-btns{justify-content:flex-start}
  .pq-char-big{font-size:120px}
}`,
    `// ── Canvas Background ──
const bgc = document.getElementById('bg-canvas');
const bgx = bgc.getContext('2d');
function resizeBG(){ bgc.width=innerWidth; bgc.height=innerHeight; }
resizeBG(); window.addEventListener('resize', resizeBG);
const bgStars = Array.from({length:100},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.5+.5,op:Math.random()}));
function animBG(){
  bgx.clearRect(0,0,bgc.width,bgc.height);
  bgStars.forEach(s=>{
    s.op+=.01; bgx.globalAlpha=Math.abs(Math.sin(s.op))*.8;
    bgx.beginPath(); bgx.arc(s.x*bgc.width,s.y*bgc.height,s.r,0,Math.PI*2);
    bgx.fillStyle='#fff'; bgx.fill();
  });
  bgx.globalAlpha=1; requestAnimationFrame(animBG);
}
animBG();

// ── Nav ──
const burger = document.getElementById('pq-burger');
const nav    = document.getElementById('pq-nav');
function toggleNav() { burger.classList.toggle('open'); nav.classList.toggle('open'); }
function closeNav()  { burger.classList.remove('open'); nav.classList.remove('open'); }

// ── Theme ──
const savedTheme = localStorage.getItem('pq-theme') || 'dark';
document.documentElement.dataset.theme = savedTheme;
function toggleTheme() {
  const n = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = n;
  localStorage.setItem('pq-theme', n);
  document.getElementById('pq-theme-btn').textContent = n==='dark'?'☀️':'🌙';
}

// ── Char filter ──
function filterChars(type, btn) {
  document.querySelectorAll('.pq-f').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.pq-char-card').forEach(c=>{
    c.classList.toggle('hidden', type!=='all' && c.dataset.class!==type);
  });
}

let chosenChar = '', chosenEmoji = '🧙‍♂️';
function pickChar(card, name, emoji) {
  document.querySelectorAll('.pq-char-card').forEach(c=>c.classList.remove('active'));
  card.classList.add('active');
  chosenChar = name; chosenEmoji = emoji;
  document.getElementById('pq-hero-char').textContent = emoji;
  document.getElementById('mg-char-name').textContent = 'Герой: ' + emoji + ' ' + name;
}

// ── Mini-game ──
let mgScore=0, mgTimer=null, mgLeft=30, mgRunning=false;

function startMG() {
  if (!chosenChar) { alert('Спочатку обери персонажа!'); return; }
  if (mgRunning) return;
  mgRunning=true; mgScore=0; mgLeft=30;
  document.getElementById('mg-score').textContent=0;
  const field = document.getElementById('mg-field');
  field.innerHTML='';
  spawnStar(); spawnStar(); spawnStar();
  mgTimer = setInterval(()=>{
    mgLeft--;
    document.getElementById('mg-time').textContent = mgLeft;
    if (mgLeft<=0){ clearInterval(mgTimer); mgRunning=false; field.innerHTML='<div class="mg-start"><p>⭐ '+mgScore+' очок!</p><button onclick="startMG()">Ще раз</button></div>'; }
    else spawnStar();
  },1000);
}

function spawnStar() {
  const field = document.getElementById('mg-field');
  const star  = document.createElement('div');
  star.className='mg-star'; star.textContent='⭐';
  const W=field.clientWidth||280, H=field.clientHeight||180;
  star.style.left = (10+Math.random()*(W-50))+'px';
  star.style.top  = (10+Math.random()*(H-50))+'px';
  star.addEventListener('click',()=>{
    mgScore+=10;
    document.getElementById('mg-score').textContent=mgScore;
    star.remove(); if(mgRunning) spawnStar();
  });
  field.appendChild(star);
  setTimeout(()=>{ if(star.parentNode) star.remove(); },2500);
}

// ── Records ──
let records = JSON.parse(localStorage.getItem('pq-records')||'[]');
function renderLB(){
  records.sort((a,b)=>b.score-a.score);
  const top=records.slice(0,8);
  if(top.length===0){ document.getElementById('pq-lb').innerHTML='<p style="color:#a0a0c0;padding:16px">Поки що немає рекордів!</p>'; return; }
  const medals=['🥇','🥈','🥉'];
  document.getElementById('pq-lb').innerHTML='<table><thead><tr><th>#</th><th>Гравець</th><th>Очки</th><th>Дата</th></tr></thead><tbody>'+
    top.map((r,i)=>\`<tr><td>\${medals[i]||i+1}</td><td>\${r.char||'—'} \${r.name}</td><td><b>\${r.score}</b></td><td>\${r.date}</td></tr>\`).join('')+
    '</tbody></table>';
}
function saveRecord(){
  const name = chosenChar || 'Анонім';
  records.push({name,char:chosenEmoji,score:mgScore,date:new Date().toLocaleDateString('uk')});
  localStorage.setItem('pq-records',JSON.stringify(records));
  renderLB();
  alert(\`✅ Рекорд \${mgScore} очок збережено!\`);
}
function clearLB(){ if(confirm('Видалити всі рекорди?')){ records=[];localStorage.removeItem('pq-records');renderLB();} }
function scrollTo(sel){ document.querySelector(sel).scrollIntoView({behavior:'smooth'}); }

renderLB();`,
    [
      { level:'easy',   uk:'Обери персонажа, натисни "Старт", збирай зірки і збережи рекорд.',  ru:'Выбери персонажа, нажми "Старт", собирай звёзды и сохрани рекорд.' },
      { level:'medium', uk:'Додай відображення обраного персонажа у міні-грі: його emoji з\'являється у куті поля .mg-field.',  ru:'Добавь отображение выбранного персонажа в мини-игре: его emoji появляется в углу поля .mg-field.' },
      { level:'hard',   uk:'Зроби бонусні зірки: кожні 10 секунд з\'являється ⭐⭐ (подвійна зірка) що дає +30 очок.',  ru:'Сделай бонусные звёзды: каждые 10 секунд появляется ⭐⭐ (двойная звезда) дающая +30 очков.' },
      { level:'extra',  uk:'Додай звукові ефекти через Web Audio API: при зборі зірки playTone(880,.05), при закінченні часу — playTone(220,.3,"sawtooth").',  ru:'Добавь звуковые эффекты: при сборе звезды playTone(880,.05), при окончании времени — playTone(220,.3,"sawtooth").' },
    ]
  );

})();
