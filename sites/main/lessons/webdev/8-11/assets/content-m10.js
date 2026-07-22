/* ═══════════════════════════════════════════════════════════
   Контент · Модуль 10 — Адаптивний дизайн · 8–11 Веб-Старт
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
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f8fafc;padding:20px}
button{background:#1e293b;border:1px solid #334155;color:#f8fafc;padding:9px 18px;border-radius:8px;cursor:pointer;font-size:14px;transition:.2s}
button:hover{border-color:#059669;color:#4ade80}
h2{font-size:20px;margin-bottom:14px}
h3{font-size:15px;color:#94a3b8;margin-bottom:8px}
.card{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:18px;margin-bottom:12px}
.tag{display:inline-block;background:rgba(5,150,105,.15);border:1px solid #059669;color:#4ade80;padding:3px 12px;border-radius:20px;font-size:12px}`;

  /* ─── 10-01 ─────────────────────────────────────────────── */
  patch('10-01',
    { uk:`<h2>Мета-тег viewport та адаптивна верстка</h2>
<p>Щоб сторінка нормально виглядала на телефоні, потрібен один рядок у <code>&lt;head&gt;</code>:</p>
<pre>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</pre>
<h3>Що означають параметри</h3>
<ul>
  <li><code>width=device-width</code> — ширина сторінки = ширині екрану пристрою</li>
  <li><code>initial-scale=1.0</code> — початковий масштаб 100% (не зум)</li>
</ul>
<h3>Без viewport — з viewport</h3>
<p>Без цього тегу браузер на телефоні «думає», що сторінка має ширину 980px і масштабує її вниз — текст стає дрібним. З тегом — ширина підлаштовується під екран.</p>
<h3>Адаптивна верстка</h3>
<p>Адаптивна (responsive) верстка — це коли сайт виглядає добре і на телефоні, і на планшеті, і на ноутбуці. Viewport meta — перший крок.</p>`,
      ru:`<h2>Мета-тег viewport и адаптивная вёрстка</h2>
<pre>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</pre>
<h3>Что означают параметры</h3>
<ul>
  <li><code>width=device-width</code> — ширина страницы = ширине экрана устройства</li>
  <li><code>initial-scale=1.0</code> — начальный масштаб 100%</li>
</ul>
<h3>Без viewport — с viewport</h3>
<p>Без тега браузер на телефоне считает, что страница шириной 980px и масштабирует её вниз. С тегом — ширина подстраивается под экран.</p>` },
    `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <!-- 👆 Спробуй прибрати або додати цей рядок: -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viewport Demo</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc; }
    .phone { border: 3px solid #059669; border-radius: 20px; width: 320px; min-height: 480px; padding: 20px; background: #1e293b; }
    .phone h2 { font-size: 18px; color: #4ade80; margin-bottom: 12px; }
    .phone p  { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 10px; }
    .phone .btn { background: #059669; color: #fff; border: none; padding: 10px 20px;
                  border-radius: 8px; font-size: 14px; cursor: pointer; display: block; width: 100%; margin-top: 8px; }
    .label { color: #4ade80; font-size: 12px; margin-bottom: 6px; }
  </style>
</head>
<body>
  <p class="label">📱 Так виглядає телефон (320px):</p>
  <div class="phone">
    <h2>🌐 Мій перший сайт</h2>
    <p>Цей текст читається зручно, бо є мета-тег viewport. Ширина адаптована під телефон.</p>
    <p>Спробуй: прибери тег viewport з &lt;head&gt; і подивись що стане з розміром.</p>
    <button class="btn">Натисни мене!</button>
    <button class="btn" style="background:#1e40af;margin-top:6px">Ще кнопка</button>
  </div>
</body>
</html>`,
    ``,
    ``,
    [
      { level:'easy',   uk:'Знайди мета-тег viewport у коді та прочитай кожен параметр.',  ru:'Найди мета-тег viewport в коде и прочитай каждый параметр.' },
      { level:'medium', uk:'Додай другий мета-тег: <meta name="description" content="Мій адаптивний сайт">. Це SEO-опис сторінки.',  ru:'Добавь второй мета-тег: <meta name="description" content="Мой адаптивный сайт">.' },
      { level:'hard',   uk:'Додай на "телефон" 3 картки товарів з flex: div.card {width:100%; background:#0f172a; border-radius:8px; padding:12px; margin-bottom:8px}',  ru:'Добавь на "телефон" 3 карточки товаров с flex: div.card {width:100%; background:#0f172a; border-radius:8px; padding:12px; margin-bottom:8px}' },
    ]
  );

  /* ─── 10-02 ─────────────────────────────────────────────── */
  patch('10-02',
    { uk:`<h2>Відносні одиниці: %, em, rem, vw, vh</h2>
<p>В адаптивній верстці важливо уникати фіксованих пікселів і використовувати відносні одиниці.</p>
<h3>Порівняння одиниць</h3>
<table style="width:100%;border-collapse:collapse;font-size:13px">
  <tr style="color:#94a3b8"><th style="padding:6px;text-align:left">Одиниця</th><th>Від чого залежить</th><th>Приклад</th></tr>
  <tr><td style="padding:6px"><code>px</code></td><td>Фіксовані пікселі</td><td>font-size: 16px</td></tr>
  <tr style="background:rgba(5,150,105,.08)"><td style="padding:6px"><code>%</code></td><td>Батьківського елемента</td><td>width: 50%</td></tr>
  <tr><td style="padding:6px"><code>em</code></td><td>Font-size батька</td><td>padding: 1.5em</td></tr>
  <tr style="background:rgba(5,150,105,.08)"><td style="padding:6px"><code>rem</code></td><td>Font-size &lt;html&gt; (16px)</td><td>font-size: 1.25rem</td></tr>
  <tr><td style="padding:6px"><code>vw</code></td><td>1% ширини вікна</td><td>width: 50vw</td></tr>
  <tr style="background:rgba(5,150,105,.08)"><td style="padding:6px"><code>vh</code></td><td>1% висоти вікна</td><td>height: 100vh</td></tr>
</table>
<h3>Золоте правило</h3>
<p>Для розмірів тексту — <code>rem</code>. Для ширини блоків — <code>%</code> або <code>vw</code>. Для відступів — <code>em</code> або <code>rem</code>.</p>`,
      ru:`<h2>Относительные единицы: %, em, rem, vw, vh</h2>
<table style="width:100%;border-collapse:collapse;font-size:13px">
  <tr style="color:#94a3b8"><th style="padding:6px;text-align:left">Единица</th><th>Зависит от</th><th>Пример</th></tr>
  <tr><td style="padding:6px"><code>%</code></td><td>Родительского элемента</td><td>width: 50%</td></tr>
  <tr style="background:rgba(5,150,105,.08)"><td style="padding:6px"><code>rem</code></td><td>Font-size &lt;html&gt; (16px)</td><td>font-size: 1.25rem</td></tr>
  <tr><td style="padding:6px"><code>vw/vh</code></td><td>Ширины/высоты окна</td><td>width: 50vw</td></tr>
</table>
<p>Для текста — <code>rem</code>. Для ширины блоков — <code>%</code> или <code>vw</code>.</p>` },
    `<div class="units-demo">
  <h2>Інтерактивні одиниці</h2>

  <div class="control-row">
    <label>rem (font-size): <b id="rem-val">1.5</b>rem</label>
    <input type="range" id="rem-range" min="0.5" max="4" step="0.1" value="1.5">
  </div>
  <div class="control-row">
    <label>% ширини блока: <b id="pct-val">70</b>%</label>
    <input type="range" id="pct-range" min="10" max="100" step="5" value="70">
  </div>
  <div class="control-row">
    <label>vw ширини: <b id="vw-val">40</b>vw</label>
    <input type="range" id="vw-range" min="5" max="90" step="5" value="40">
  </div>

  <div class="boxes">
    <div class="box px-box">px: 200px фіксовано</div>
    <div class="box rem-box" id="rem-box">rem: 1.5rem текст</div>
    <div class="box pct-box" id="pct-box">%: 70% ширини</div>
    <div class="box vw-box"  id="vw-box">vw: 40vw ширини</div>
  </div>
</div>`,
    `${BASE}
.units-demo{max-width:560px}
.control-row{background:#1e293b;border-radius:10px;padding:12px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px}
.control-row label{font-size:13px;color:#94a3b8;min-width:180px}
.control-row b{color:#4ade80}
input[type=range]{flex:1;accent-color:#059669;cursor:pointer}
.boxes{display:flex;flex-direction:column;gap:8px;margin-top:14px}
.box{padding:12px 16px;border-radius:10px;font-size:14px;border:1px solid #334155;transition:all .25s;overflow:hidden;white-space:nowrap}
.px-box{width:200px;background:#1e3a5f;border-color:#3b82f6;color:#60a5fa}
.rem-box{background:#1a2e22;border-color:#059669;color:#4ade80}
.pct-box{background:#2d1e0f;border-color:#f59e0b;color:#fbbf24}
.vw-box{background:#2a1033;border-color:#8b5cf6;color:#a78bfa}`,
    `const remBox   = document.getElementById('rem-box');
const pctBox   = document.getElementById('pct-box');
const vwBox    = document.getElementById('vw-box');

document.getElementById('rem-range').addEventListener('input', e => {
  const v = e.target.value;
  document.getElementById('rem-val').textContent = v;
  remBox.style.fontSize = v + 'rem';
  remBox.textContent = 'rem: ' + v + 'rem текст';
});

document.getElementById('pct-range').addEventListener('input', e => {
  const v = e.target.value;
  document.getElementById('pct-val').textContent = v;
  pctBox.style.width = v + '%';
  pctBox.textContent = '%: ' + v + '% ширини';
});

document.getElementById('vw-range').addEventListener('input', e => {
  const v = e.target.value;
  document.getElementById('vw-val').textContent = v;
  vwBox.style.width = v + 'vw';
  vwBox.textContent = 'vw: ' + v + 'vw ширини';
});`,
    [
      { level:'easy',   uk:'Потягни повзунки і поспостерігай як змінюються блоки. Який блок не змінюється? Чому?',  ru:'Потяни ползунки и понаблюдай как меняются блоки. Какой блок не меняется? Почему?' },
      { level:'medium', uk:'Додай 4-й повзунок для vh (висота) від 5 до 90. Зроби новий .vh-box і встановлюй його висоту через vhBox.style.height.',  ru:'Добавь 4-й ползунок для vh (высота) от 5 до 90. Сделай новый .vh-box и устанавливай его height через vhBox.style.height.' },
      { level:'hard',   uk:'Встанови rem-box.style.padding = v + "rem" разом із fontSize. Поспостерігай як відступи масштабуються разом із шрифтом.',  ru:'Установи rem-box.style.padding = v + "rem" вместе с fontSize. Понаблюдай как отступы масштабируются вместе со шрифтом.' },
    ]
  );

  /* ─── 10-03 ─────────────────────────────────────────────── */
  patch('10-03',
    { uk:`<h2>Media queries: @media (max-width)</h2>
<p>Media queries дозволяють застосовувати різні CSS-стилі залежно від ширини вікна.</p>
<h3>Синтаксис</h3>
<pre>/* Стиль за замовчуванням (десктоп або mobile-first): */
.container { width: 800px; }

/* Якщо вікно ≤ 768px (планшет): */
@media (max-width: 768px) {
  .container { width: 100%; padding: 0 20px; }
}

/* Якщо вікно ≤ 480px (телефон): */
@media (max-width: 480px) {
  .container { padding: 0 12px; }
  h1 { font-size: 22px; }
}</pre>
<h3>Стандартні брейкпоінти</h3>
<ul>
  <li>📱 <code>480px</code> — смартфон</li>
  <li>📲 <code>768px</code> — планшет</li>
  <li>💻 <code>1024px</code> — ноутбук</li>
  <li>🖥 <code>1280px</code> — широкий монітор</li>
</ul>`,
      ru:`<h2>Media queries: @media (max-width)</h2>
<pre>/* Десктоп */
.container { width: 800px; }

/* Планшет (≤ 768px) */
@media (max-width: 768px) {
  .container { width: 100%; }
}

/* Телефон (≤ 480px) */
@media (max-width: 480px) {
  h1 { font-size: 22px; }
}</pre>
<h3>Стандартные брейкпоинты</h3>
<ul>
  <li>📱 480px — смартфон</li>
  <li>📲 768px — планшет</li>
  <li>💻 1024px — ноутбук</li>
</ul>` },
    `<div class="mq-demo">
  <div class="bp-indicator" id="bp">Змін розмір редактора →</div>

  <div class="mq-layout">
    <header class="mq-header">
      <div class="logo">🌐 Мій Сайт</div>
      <nav class="mq-nav">
        <a href="#">Головна</a>
        <a href="#">Про нас</a>
        <a href="#">Контакти</a>
      </nav>
    </header>

    <main class="mq-main">
      <div class="mq-sidebar">📋 Sidebar</div>
      <div class="mq-content">
        <h2>Адаптивний макет</h2>
        <p>Цей макет перебудовується залежно від ширини екрану. Спробуй змінити розмір вікна попереднього перегляду!</p>
        <div class="mq-cards">
          <div class="mq-card">🎨 Дизайн</div>
          <div class="mq-card">💻 Код</div>
          <div class="mq-card">📱 Адаптив</div>
        </div>
      </div>
    </main>
  </div>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f8fafc;padding:12px}

.bp-indicator{background:#059669;color:#fff;text-align:center;padding:8px;border-radius:8px;margin-bottom:12px;font-size:13px;font-weight:600}

/* Desktop */
.mq-header{display:flex;justify-content:space-between;align-items:center;background:#1e293b;padding:12px 20px;border-radius:10px;margin-bottom:12px}
.logo{font-weight:700;color:#4ade80}
.mq-nav{display:flex;gap:16px}
.mq-nav a{color:#94a3b8;text-decoration:none;font-size:14px;transition:.2s}
.mq-nav a:hover{color:#4ade80}

.mq-main{display:flex;gap:12px}
.mq-sidebar{background:#1e293b;border-radius:10px;padding:16px;width:180px;flex-shrink:0;font-size:13px;color:#94a3b8}
.mq-content{flex:1;background:#1e293b;border-radius:10px;padding:16px}
.mq-content h2{font-size:18px;margin-bottom:10px}
.mq-content p{font-size:14px;color:#94a3b8;margin-bottom:14px}

.mq-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.mq-card{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:16px;text-align:center;font-size:13px}

/* Tablet: ≤ 768px */
@media (max-width: 768px) {
  .bp-indicator{background:#f59e0b;content:'📲 Планшет'}
  .mq-main{flex-direction:column}
  .mq-sidebar{width:100%}
  .mq-cards{grid-template-columns:1fr 1fr}
}

/* Phone: ≤ 480px */
@media (max-width: 480px) {
  .bp-indicator{background:#3b82f6}
  .mq-nav{display:none}
  .mq-cards{grid-template-columns:1fr}
  .mq-content h2{font-size:15px}
}`,
    `// Показуємо поточний брейкпоінт
function checkBP() {
  const w   = window.innerWidth;
  const el  = document.getElementById('bp');
  if (w <= 480) {
    el.textContent = '📱 Телефон (' + w + 'px) — nav прихована, 1 колонка';
    el.style.background = '#3b82f6';
  } else if (w <= 768) {
    el.textContent = '📲 Планшет (' + w + 'px) — sidebar вгорі, 2 колонки';
    el.style.background = '#f59e0b';
  } else {
    el.textContent = '💻 Десктоп (' + w + 'px) — повний макет, 3 колонки';
    el.style.background = '#059669';
  }
}
checkBP();
window.addEventListener('resize', checkBP);`,
    [
      { level:'easy',   uk:'Змін розмір попереднього перегляду і спостерігай як макет перебудовується.',  ru:'Измени размер предпросмотра и наблюдай как макет перестраивается.' },
      { level:'medium', uk:'Додай @media (max-width: 320px) де .mq-card {font-size:11px; padding:10px} — для дуже маленьких екранів.',  ru:'Добавь @media (max-width: 320px) где .mq-card {font-size:11px; padding:10px}.' },
      { level:'hard',   uk:'Додай четвертий брейкпоінт 1024px для ноутбука: .mq-cards{grid-template-columns:1fr 1fr} і оновіть JS-індикатор.',  ru:'Добавь четвёртый брейкпоинт 1024px для ноутбука: .mq-cards{grid-template-columns:1fr 1fr} и обнови JS-индикатор.' },
    ]
  );

  /* ─── 10-04 ─────────────────────────────────────────────── */
  patch('10-04',
    { uk:`<h2>Mobile-first підхід</h2>
<p>Є два підходи до адаптивної верстки:</p>
<table style="width:100%;border-collapse:collapse;font-size:13px;margin:10px 0">
  <tr style="color:#94a3b8"><th style="padding:6px;text-align:left">Desktop-first</th><th>Mobile-first</th></tr>
  <tr><td style="padding:6px">Пишемо для ноутбука</td><td>Пишемо для телефона</td></tr>
  <tr style="background:rgba(5,150,105,.08)"><td style="padding:6px">Зменшуємо через <code>max-width</code></td><td>Збільшуємо через <code>min-width</code></td></tr>
  <tr><td style="padding:6px">Старий підхід</td><td>✅ Рекомендований</td></tr>
</table>
<h3>Mobile-first CSS</h3>
<pre>/* Базовий стиль — для телефону: */
.nav { flex-direction: column; }

/* Для планшета та більше: */
@media (min-width: 768px) {
  .nav { flex-direction: row; }
}

/* Для десктопу: */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}</pre>
<h3>Чому mobile-first кращий</h3>
<ul>
  <li>Більше людей переглядає сайти з телефону</li>
  <li>Google ранжує сайти за мобільною версією</li>
  <li>Простіше додати ніж прибрати</li>
</ul>`,
      ru:`<h2>Mobile-first подход</h2>
<p>Пишем сначала для телефона, потом расширяем через <code>min-width</code>.</p>
<pre>/* Базово — для телефона: */
.nav { flex-direction: column; }

/* Планшет и больше: */
@media (min-width: 768px) {
  .nav { flex-direction: row; }
}

/* Десктоп: */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}</pre>
<p>✅ Google ранжирует сайты по мобильной версии. Mobile-first — рекомендованный подход.</p>` },
    `<div class="mf-demo">
  <div class="bp-bar" id="bp-bar">📱 Телефон</div>

  <!-- Картка профілю — повністю mobile-first -->
  <div class="profile-card">
    <div class="profile-avatar">👩‍💻</div>
    <div class="profile-info">
      <h2 class="profile-name">Аліна Коваленко</h2>
      <p class="profile-role">Junior Web Developer</p>
      <div class="profile-tags">
        <span class="ptag">HTML</span>
        <span class="ptag">CSS</span>
        <span class="ptag">JS</span>
        <span class="ptag">React</span>
      </div>
    </div>
    <div class="profile-stats">
      <div class="stat"><b>42</b><span>Проекти</span></div>
      <div class="stat"><b>128</b><span>Коміти</span></div>
      <div class="stat"><b>⭐5</b><span>Рейтинг</span></div>
    </div>
  </div>

  <div class="code-hint">
    <pre>/* Mobile-first: спочатку стилі для телефону */
.profile-card { flex-direction: column; }

/* Потім розширюємо */
@media (min-width: 600px) {
  .profile-card { flex-direction: row; }
}</pre>
  </div>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f8fafc;padding:16px}

.bp-bar{background:#059669;color:#fff;text-align:center;padding:8px;border-radius:8px;margin-bottom:14px;font-weight:600;font-size:13px;transition:.3s}

/* ── Mobile-first базові стилі ── */
.profile-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:20px;display:flex;flex-direction:column;align-items:center;gap:16px;text-align:center}
.profile-avatar{font-size:60px;line-height:1}
.profile-name{font-size:18px;margin-bottom:6px}
.profile-role{font-size:13px;color:#94a3b8;margin-bottom:12px}
.profile-tags{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.ptag{background:rgba(59,130,246,.15);border:1px solid #3b82f6;color:#60a5fa;padding:3px 10px;border-radius:20px;font-size:12px}
.profile-stats{display:flex;gap:20px}
.stat{display:flex;flex-direction:column;align-items:center;gap:2px}
.stat b{font-size:20px}
.stat span{font-size:11px;color:#94a3b8}

/* ── @media (min-width) — розширення ── */
@media (min-width: 600px) {
  .profile-card{flex-direction:row;text-align:left;align-items:flex-start}
  .profile-tags{justify-content:flex-start}
  .profile-avatar{font-size:72px}
}
@media (min-width: 900px) {
  .profile-card{padding:28px 32px;gap:24px}
  .profile-name{font-size:22px}
}

.code-hint{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:14px;margin-top:14px}
.code-hint pre{font-size:12px;color:#94a3b8;white-space:pre-wrap}`,
    `function checkW() {
  const w  = window.innerWidth;
  const bp = document.getElementById('bp-bar');
  if (w >= 900) {
    bp.textContent = '💻 Широкий ('+ w +'px) · min-width:900px';
    bp.style.background = '#7c3aed';
  } else if (w >= 600) {
    bp.textContent = '📲 Планшет ('+ w +'px) · min-width:600px';
    bp.style.background = '#f59e0b';
  } else {
    bp.textContent = '📱 Телефон ('+ w +'px) · базовий стиль';
    bp.style.background = '#059669';
  }
}
checkW();
window.addEventListener('resize', checkW);`,
    [
      { level:'easy',   uk:'Змін розмір вікна попереднього перегляду і спостерігай як картка перебудовується.',  ru:'Измени размер окна предпросмотра и наблюдай как карточка перестраивается.' },
      { level:'medium', uk:'Додай @media (min-width:480px) де .stat b {font-size:26px} — на планшеті числа більші.',  ru:'Добавь @media (min-width:480px) где .stat b {font-size:26px} — на планшете числа крупнее.' },
      { level:'hard',   uk:'Додай кнопку "Редагувати профіль" — на мобайлі вона займає всю ширину (width:100%), а на планшеті — автоматичну (width:auto).',  ru:'Добавь кнопку "Редагувати профіль" — на мобайле она занимает всю ширину (width:100%), а на планшете — автоматическую (width:auto).' },
    ]
  );

  /* ─── 10-05 ─────────────────────────────────────────────── */
  patch('10-05',
    { uk:`<h2>Адаптивні зображення: max-width: 100%</h2>
<p>Щоб зображення не виходило за межі контейнера на маленьких екранах:</p>
<pre>img {
  max-width: 100%;  /* не ширше батьківського блоку */
  height: auto;     /* зберігати пропорції */
  display: block;   /* прибрати пробіл знизу */
}</pre>
<h3>object-fit — як зображення вписується в рамку</h3>
<pre>.thumbnail {
  width: 200px;
  height: 200px;
  object-fit: cover;  /* заповнити, обрізавши зайве */
  /* contain — вписати повністю (може бути порожнє) */
  /* fill — розтягнути (спотворює) */
}</pre>
<h3>Оптимізація зображень</h3>
<ul>
  <li>Формат WebP — менший розмір файлу ніж JPG</li>
  <li><code>loading="lazy"</code> — зображення завантажуються коли потрапляють у видимість</li>
  <li><code>srcset</code> — різні версії для різних екранів</li>
</ul>
<pre>&lt;img src="photo.jpg" loading="lazy" alt="Опис"&gt;</pre>`,
      ru:`<h2>Адаптивные изображения: max-width: 100%</h2>
<pre>img {
  max-width: 100%;
  height: auto;
  display: block;
}</pre>
<h3>object-fit</h3>
<pre>.thumbnail {
  width: 200px;
  height: 200px;
  object-fit: cover;
}</pre>
<ul>
  <li><code>cover</code> — заполнить, обрезав лишнее</li>
  <li><code>contain</code> — вписать полностью</li>
  <li><code>fill</code> — растянуть (искажает)</li>
</ul>` },
    `<div class="img-demo">
  <h2>Демо: object-fit</h2>

  <div class="fit-controls">
    <label>object-fit:</label>
    <div class="fit-btns">
      <button onclick="setFit('cover')"   class="fit-btn active" id="btn-cover">cover</button>
      <button onclick="setFit('contain')" class="fit-btn" id="btn-contain">contain</button>
      <button onclick="setFit('fill')"    class="fit-btn" id="btn-fill">fill</button>
      <button onclick="setFit('none')"    class="fit-btn" id="btn-none">none</button>
    </div>
  </div>

  <div class="fit-preview">
    <div class="fit-frame" id="fit-frame">
      <!-- SVG-зображення замість реального файлу -->
      <svg id="fit-img" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
        <rect width="400" height="280" fill="#1e3a5f"/>
        <circle cx="200" cy="140" r="80" fill="#3b82f6" opacity=".6"/>
        <rect x="60" y="60" width="80" height="80" rx="8" fill="#059669" opacity=".7"/>
        <rect x="260" y="140" width="80" height="80" rx="8" fill="#f59e0b" opacity=".7"/>
        <text x="200" y="250" text-anchor="middle" fill="#f8fafc" font-size="18" font-family="Arial">🖼 Тестове фото</text>
      </svg>
    </div>
    <p class="fit-label" id="fit-label">object-fit: cover</p>
  </div>

  <div class="responsive-gallery">
    <h3>Адаптивна галерея (max-width:100%)</h3>
    <div class="gallery">
      <div class="g-item" style="background:linear-gradient(135deg,#1e3a5f,#3b82f6)">🌊</div>
      <div class="g-item" style="background:linear-gradient(135deg,#1a2e22,#059669)">🌿</div>
      <div class="g-item" style="background:linear-gradient(135deg,#2d1e0f,#f59e0b)">🔥</div>
      <div class="g-item" style="background:linear-gradient(135deg,#2a1033,#8b5cf6)">🌌</div>
    </div>
  </div>
</div>`,
    `${BASE}
.img-demo{max-width:520px}
.fit-controls{background:#1e293b;border-radius:10px;padding:14px;margin-bottom:14px;display:flex;align-items:center;gap:12px}
.fit-controls label{font-size:13px;color:#94a3b8;white-space:nowrap}
.fit-btns{display:flex;gap:6px;flex-wrap:wrap}
.fit-btn{padding:6px 14px;font-size:12px}
.fit-btn.active{border-color:#059669;color:#4ade80}
.fit-frame{width:100%;height:200px;background:#0f172a;border:2px solid #334155;border-radius:10px;overflow:hidden}
.fit-label{text-align:center;font-size:13px;color:#94a3b8;margin-top:8px;margin-bottom:14px;font-family:monospace}
.gallery{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.g-item{border-radius:10px;height:80px;display:flex;align-items:center;justify-content:center;font-size:32px;max-width:100%}
@media(min-width:480px){.gallery{grid-template-columns:1fr 1fr 1fr 1fr}}`,
    `function setFit(val) {
  const img = document.getElementById('fit-img');
  img.style.objectFit = val;

  document.querySelectorAll('.fit-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + val).classList.add('active');
  document.getElementById('fit-label').textContent = 'object-fit: ' + val;
}`,
    [
      { level:'easy',   uk:'Натисни кожну кнопку object-fit і подивись як зображення реагує.',  ru:'Нажми каждую кнопку object-fit и посмотри как изображение реагирует.' },
      { level:'medium', uk:'Додай кнопку "Широке фото 16:9" яка змінює viewBox SVG на "0 0 640 360" і кнопку "Квадрат 1:1" → "0 0 300 300".',  ru:'Добавь кнопку "Широкое фото 16:9" которая меняет viewBox SVG на "0 0 640 360" и кнопку "Квадрат 1:1" → "0 0 300 300".' },
      { level:'hard',   uk:'Додай range-повзунок для зміни висоти .fit-frame від 100px до 400px через fitFrame.style.height = v + "px".',  ru:'Добавь range-ползунок для изменения высоты .fit-frame от 100px до 400px через fitFrame.style.height = v + "px".' },
    ]
  );

  /* ─── 10-06 ─────────────────────────────────────────────── */
  patch('10-06',
    { uk:`<h2>Адаптивна навігація: показати / сховати</h2>
<p>На широких екранах навігація горизонтальна і завжди видима. На вузьких — її ховають і показують кнопкою.</p>
<h3>CSS-підхід: display: none / flex</h3>
<pre>/* Телефон — ховаємо nav */
.nav-links { display: none; }
.nav-toggle { display: block; }

/* Планшет і більше — показуємо */
@media (min-width: 768px) {
  .nav-links { display: flex; gap: 20px; }
  .nav-toggle { display: none; }
}</pre>
<h3>JS відкриває / закриває</h3>
<pre>const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');

btn.addEventListener('click', () => {
  nav.classList.toggle('open');
});</pre>
<p>У CSS додаємо <code>.nav-links.open { display: flex; }</code> — тепер клас керує видимістю.</p>`,
      ru:`<h2>Адаптивная навигация: показать / скрыть</h2>
<pre>/* Телефон */
.nav-links { display: none; }
.nav-toggle { display: block; }

/* Планшет+ */
@media (min-width: 768px) {
  .nav-links { display: flex; gap: 20px; }
  .nav-toggle { display: none; }
}</pre>
<pre>btn.addEventListener('click', () => {
  nav.classList.toggle('open');
});</pre>` },
    `<div class="nav-demo">
  <!-- Адаптивний header -->
  <header class="rsp-header">
    <div class="rsp-logo">🚀 Мій Сайт</div>

    <nav class="rsp-nav" id="rsp-nav">
      <a href="#" class="nav-link active">Головна</a>
      <a href="#" class="nav-link">Каталог</a>
      <a href="#" class="nav-link">Блог</a>
      <a href="#" class="nav-link">Контакти</a>
    </nav>

    <button class="nav-toggle" id="nav-toggle" onclick="toggleNav()">☰</button>
  </header>

  <!-- Контент -->
  <main class="rsp-main">
    <h2>Адаптивна навігація</h2>
    <p>Зміни розмір вікна — nav переходить у вертикальне меню на вузьких екранах.</p>
    <div class="bp-note" id="bp-note"></div>
  </main>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f8fafc}

.nav-demo{min-height:200px}

/* ── Header ── */
.rsp-header{background:#1e293b;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;position:relative}
.rsp-logo{font-weight:700;color:#4ade80;font-size:16px}

/* ── Nav Links ── */
.rsp-nav{display:none;flex-direction:column;gap:4px;
  position:absolute;top:100%;left:0;right:0;
  background:#1e293b;border-top:1px solid #334155;padding:12px 20px;z-index:10}
.rsp-nav.open{display:flex}
.nav-link{color:#94a3b8;text-decoration:none;padding:10px 12px;border-radius:8px;font-size:14px;transition:.2s}
.nav-link:hover,.nav-link.active{background:rgba(5,150,105,.15);color:#4ade80}

/* ── Кнопка-гамбургер ── */
.nav-toggle{background:none;border:1px solid #334155;color:#f8fafc;padding:7px 12px;border-radius:6px;font-size:18px;cursor:pointer;line-height:1}
.nav-toggle:hover{border-color:#059669;color:#4ade80}

/* ── Main ── */
.rsp-main{padding:20px}
.rsp-main h2{font-size:18px;margin-bottom:10px}
.rsp-main p{font-size:14px;color:#94a3b8;margin-bottom:12px}
.bp-note{background:#1e293b;border-radius:8px;padding:12px;font-size:13px;color:#94a3b8}

/* ── Desktop ≥ 768px ── */
@media (min-width: 768px) {
  .rsp-nav{display:flex;flex-direction:row;gap:4px;position:static;background:none;border:none;padding:0}
  .nav-toggle{display:none}
}`,
    `function toggleNav() {
  const nav = document.getElementById('rsp-nav');
  const btn = document.getElementById('nav-toggle');
  nav.classList.toggle('open');
  btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
}

// Закриваємо меню при кліку на посилання
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
    a.classList.add('active');
    // Закрити на мобайлі
    const nav = document.getElementById('rsp-nav');
    nav.classList.remove('open');
    document.getElementById('nav-toggle').textContent = '☰';
  });
});

function checkBP() {
  const w  = window.innerWidth;
  const el = document.getElementById('bp-note');
  el.textContent = w >= 768
    ? '💻 Десктоп (' + w + 'px) — nav горизонтальна, кнопка прихована'
    : '📱 Мобайл (' + w + 'px) — nav прихована, клікни ☰';
}
checkBP();
window.addEventListener('resize', checkBP);`,
    [
      { level:'easy',   uk:'Натисни кнопку ☰ і подивись як відкривається меню. Натисни ще раз — закриється.',  ru:'Нажми кнопку ☰ и посмотри как открывается меню. Нажми ещё раз — закроется.' },
      { level:'medium', uk:'Додай анімацію відкриття: .rsp-nav { max-height:0; overflow:hidden; transition:.3s } .rsp-nav.open { max-height:300px }.',  ru:'Добавь анимацию открытия: .rsp-nav { max-height:0; overflow:hidden; transition:.3s } .rsp-nav.open { max-height:300px }.' },
      { level:'hard',   uk:'Закрий меню при кліку поза nav: document.addEventListener("click", e => { if (!e.target.closest(".rsp-header")) nav.classList.remove("open") }).',  ru:'Закрой меню при клике вне nav: document.addEventListener("click", e => { if (!e.target.closest(".rsp-header")) nav.classList.remove("open") }).' },
    ]
  );

  /* ─── 10-07 ─────────────────────────────────────────────── */
  patch('10-07',
    { uk:`<h2>Гамбургер-меню на JS</h2>
<p>«Гамбургер» — три горизонтальні риски ☰ — стандартна іконка мобільного меню. При відкритті вона перетворюється на ✕.</p>
<h3>HTML-структура</h3>
<pre>&lt;button class="burger" id="burger"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/button&gt;</pre>
<h3>CSS-анімація ☰ → ✕</h3>
<pre>.burger span { display:block; width:24px; height:2px; background:#fff;
               transition:transform .3s, opacity .3s; }

.burger.open span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
.burger.open span:nth-child(2) { opacity: 0; }
.burger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }</pre>`,
      ru:`<h2>Гамбургер-меню на JS</h2>
<p>Три горизонтальные риски ☰ — стандартная иконка мобильного меню.</p>
<h3>CSS-анимация ☰ → ✕</h3>
<pre>.burger.open span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
.burger.open span:nth-child(2) { opacity: 0; }
.burger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }</pre>` },
    `<div class="hb-demo">
  <header class="hb-header">
    <div class="hb-logo">🎮 GameSite</div>

    <button class="burger" id="burger">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <div class="hb-nav-wrap" id="hb-nav">
    <nav class="hb-nav">
      <a href="#" class="hb-link">🏠 Головна</a>
      <a href="#" class="hb-link">🎮 Ігри</a>
      <a href="#" class="hb-link">🏆 Рекорди</a>
      <a href="#" class="hb-link">👥 Спільнота</a>
      <a href="#" class="hb-link">📧 Контакти</a>
    </nav>
  </div>

  <main class="hb-main">
    <h2>Повноцінне гамбургер-меню</h2>
    <p>Три риски анімуються в ✕ через CSS transition. Навігація відкривається зверху вниз.</p>
  </main>
</div>`,
    `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#f8fafc}

.hb-header{background:#1e293b;display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid #334155}
.hb-logo{font-weight:700;color:#4ade80;font-size:16px}

/* Гамбургер */
.burger{background:none;border:none;cursor:pointer;padding:8px;display:flex;flex-direction:column;gap:5px;border-radius:6px;transition:.2s}
.burger:hover{background:rgba(255,255,255,.06)}
.burger span{display:block;width:24px;height:2px;background:#f8fafc;border-radius:2px;transition:transform .3s ease, opacity .3s ease}
.burger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.burger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.burger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* Nav */
.hb-nav-wrap{max-height:0;overflow:hidden;transition:max-height .35s ease, opacity .35s ease;opacity:0;background:#1e293b;border-bottom:1px solid #334155}
.hb-nav-wrap.open{max-height:400px;opacity:1}
.hb-nav{display:flex;flex-direction:column;padding:8px}
.hb-link{color:#94a3b8;text-decoration:none;padding:12px 16px;border-radius:8px;font-size:14px;transition:.2s;display:flex;align-items:center;gap:8px}
.hb-link:hover{background:rgba(5,150,105,.15);color:#4ade80}

.hb-main{padding:20px}
.hb-main h2{font-size:18px;margin-bottom:10px}
.hb-main p{font-size:14px;color:#94a3b8}`,
    `const burger = document.getElementById('burger');
const nav    = document.getElementById('hb-nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Закрити при кліку на посилання
document.querySelectorAll('.hb-link').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    burger.classList.remove('open');
    nav.classList.remove('open');
  });
});`,
    [
      { level:'easy',   uk:'Натисни гамбургер ☰ кілька разів і поспостерігай за анімацією перетворення у ✕.',  ru:'Нажми гамбургер ☰ несколько раз и понаблюдай за анимацией превращения в ✕.' },
      { level:'medium', uk:'Додай до .hb-link.active стиль background:rgba(5,150,105,.2) і color:#4ade80. В JS при кліку: спочатку видали active з усіх, потім додай поточному.',  ru:'Добавь к .hb-link.active стиль и в JS при клике: сначала удали active у всех, потом добавь текущему.' },
      { level:'hard',   uk:'Додай overlay: при відкритті меню з\'являється напівпрозоре поле позаду. При кліку на нього — меню закривається.',  ru:'Добавь overlay: при открытии меню появляется полупрозрачное поле позади. При клике на него — меню закрывается.' },
    ]
  );

  /* ─── 10-08 ─────────────────────────────────────────────── */
  patch('10-08',
    { uk:`<h2>Адаптивний Grid: auto-fill та minmax</h2>
<p>CSS Grid має магічну властивість: картки самі визначають скільки їх поміщається у рядку!</p>
<h3>Магічна формула</h3>
<pre>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}</pre>
<p>Розшифровка:</p>
<ul>
  <li><code>auto-fill</code> — заповнити рядок стільки колонками скільки влізе</li>
  <li><code>minmax(200px, 1fr)</code> — кожна колонка мінімум 200px, максимум 1fr</li>
</ul>
<h3>auto-fill vs auto-fit</h3>
<pre>/* auto-fill: порожні колонки займають місце */
repeat(auto-fill, minmax(200px, 1fr))

/* auto-fit: порожні колонки колапсуються (краще для малої к-сті) */
repeat(auto-fit, minmax(200px, 1fr))</pre>`,
      ru:`<h2>Адаптивный Grid: auto-fill и minmax</h2>
<h3>Магическая формула</h3>
<pre>.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}</pre>
<ul>
  <li><code>auto-fill</code> — заполнить строку максимум колонок</li>
  <li><code>minmax(200px, 1fr)</code> — каждая колонка мин. 200px, макс. 1fr</li>
</ul>` },
    `<div class="grid-demo">
  <div class="controls">
    <div class="ctrl">
      <label>Мінімальна ширина картки: <b id="min-val">180</b>px</label>
      <input type="range" id="min-range" min="80" max="320" value="180" step="10">
    </div>
    <div class="ctrl">
      <label>Gap: <b id="gap-val">12</b>px</label>
      <input type="range" id="gap-range" min="0" max="40" value="12" step="4">
    </div>
    <div class="ctrl">
      <label style="margin-bottom:6px;display:block">auto-fill vs auto-fit:</label>
      <div class="seg">
        <button id="fill-btn" class="seg-btn active" onclick="setMode('auto-fill')">auto-fill</button>
        <button id="fit-btn"  class="seg-btn"        onclick="setMode('auto-fit')">auto-fit</button>
      </div>
    </div>
  </div>

  <div class="ag-grid" id="ag-grid">
    <div class="ag-card" style="background:linear-gradient(135deg,#1e3a5f,#3b82f6)">🌊 Картка 1</div>
    <div class="ag-card" style="background:linear-gradient(135deg,#1a2e22,#059669)">🌿 Картка 2</div>
    <div class="ag-card" style="background:linear-gradient(135deg,#2d1e0f,#f59e0b)">🔥 Картка 3</div>
    <div class="ag-card" style="background:linear-gradient(135deg,#2a1033,#8b5cf6)">🌌 Картка 4</div>
    <div class="ag-card" style="background:linear-gradient(135deg,#1e293b,#ef4444)">⚡ Картка 5</div>
  </div>

  <div class="grid-formula" id="grid-formula">
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))
  </div>
</div>`,
    `${BASE}
.grid-demo{max-width:620px}
.controls{background:#1e293b;border-radius:12px;padding:16px;margin-bottom:14px;display:flex;flex-direction:column;gap:12px}
.ctrl label{font-size:13px;color:#94a3b8;display:block;margin-bottom:6px}
.ctrl b{color:#4ade80}
input[type=range]{width:100%;accent-color:#059669;cursor:pointer}
.seg{display:flex;gap:6px}
.seg-btn{padding:6px 14px;font-size:13px}
.seg-btn.active{border-color:#059669;color:#4ade80}
.ag-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:12px}
.ag-card{padding:20px 16px;border-radius:12px;font-size:15px;font-weight:600;color:#f8fafc;min-height:80px;display:flex;align-items:center;transition:.3s}
.grid-formula{background:#0f172a;border:1px solid #334155;border-radius:8px;padding:12px 16px;font-family:monospace;font-size:13px;color:#94a3b8;overflow-x:auto}`,
    `let mode = 'auto-fill';
const grid = document.getElementById('ag-grid');

function update() {
  const minW = document.getElementById('min-range').value;
  const gap  = document.getElementById('gap-range').value;
  document.getElementById('min-val').textContent = minW;
  document.getElementById('gap-val').textContent = gap;
  grid.style.gridTemplateColumns = \`repeat(\${mode}, minmax(\${minW}px, 1fr))\`;
  grid.style.gap = gap + 'px';
  document.getElementById('grid-formula').textContent =
    \`grid-template-columns: repeat(\${mode}, minmax(\${minW}px, 1fr))\`;
}

document.getElementById('min-range').addEventListener('input', update);
document.getElementById('gap-range').addEventListener('input', update);

function setMode(m) {
  mode = m;
  document.getElementById('fill-btn').classList.toggle('active', m === 'auto-fill');
  document.getElementById('fit-btn').classList.toggle('active',  m === 'auto-fit');
  update();
}`,
    [
      { level:'easy',   uk:'Потягни повзунок мінімальної ширини і поспостерігай як картки перегруповуються.',  ru:'Потяни ползунок минимальной ширины и понаблюдай как карточки перегруппируются.' },
      { level:'medium', uk:'Додай кнопку "+ Картка" (onclick="addCard()") і функцію addCard яка createElement("div").className="ag-card" і appendChild до grid.',  ru:'Добавь кнопку "+ Карточка" (onclick="addCard()") и функцию addCard которая createElement("div").className="ag-card" и appendChild к grid.' },
      { level:'hard',   uk:'Додай повзунок для кількості карток: видали всі .ag-card і створи N нових у forLoop.',  ru:'Добавь ползунок для количества карточек: удали все .ag-card и создай N новых в for-цикле.' },
    ]
  );

  /* ─── 10-09 ─────────────────────────────────────────────── */
  patch('10-09',
    { uk:`<h2>Тестування у Chrome DevTools: режим пристрою</h2>
<p>Chrome DevTools — безкоштовний інструмент для тестування адаптивного дизайну прямо у браузері.</p>
<h3>Як відкрити режим пристрою</h3>
<ol>
  <li>Відкрий Chrome і натисни <kbd>F12</kbd> або <kbd>Ctrl+Shift+I</kbd></li>
  <li>Знайди іконку 📱 (Toggle Device Toolbar) або натисни <kbd>Ctrl+Shift+M</kbd></li>
  <li>Вгорі з'явиться панель де можна вибрати пристрій або вказати ширину вручну</li>
</ol>
<h3>Корисні функції DevTools</h3>
<ul>
  <li>📐 <strong>Вибір пристрою</strong> — iPhone, Galaxy, iPad і т.д.</li>
  <li>↔️ <strong>Ручна ширина</strong> — вказати 375px, 768px, 1024px</li>
  <li>🔍 <strong>Inspect</strong> — клік на елемент → побачити CSS стилі</li>
  <li>📊 <strong>Console</strong> — вивід console.log, помилки</li>
  <li>🎨 <strong>Edit CSS</strong> — змінювати стилі прямо у браузері (тимчасово)</li>
</ul>`,
      ru:`<h2>Тестирование в Chrome DevTools: режим устройства</h2>
<ol>
  <li>Нажми <kbd>F12</kbd> или <kbd>Ctrl+Shift+I</kbd></li>
  <li>Найди иконку 📱 или нажми <kbd>Ctrl+Shift+M</kbd></li>
  <li>Вверху появится панель выбора устройства или ширины вручную</li>
</ol>
<h3>Полезные функции</h3>
<ul>
  <li>📐 Выбор устройства — iPhone, Galaxy, iPad</li>
  <li>↔️ Ручная ширина — 375px, 768px, 1024px</li>
  <li>🔍 Inspect — клик на элемент → увидеть CSS</li>
  <li>📊 Console — вывод console.log, ошибки</li>
</ul>` },
    `<div class="guide-demo">
  <h2>🛠 Чеклист тестування</h2>
  <p>Перевір свій сайт за цим списком:</p>

  <div class="checklist" id="checklist">
    <div class="check-item" data-ok="false">
      <div class="ck-icon" onclick="toggleCheck(this)">⬜</div>
      <div class="ck-text">
        <b>Viewport meta-тег</b>
        <span>Є &lt;meta name="viewport"&gt; у &lt;head&gt;</span>
      </div>
    </div>
    <div class="check-item" data-ok="false">
      <div class="ck-icon" onclick="toggleCheck(this)">⬜</div>
      <div class="ck-text"><b>Перевірено на 375px</b><span>Симулятор iPhone SE у DevTools</span></div>
    </div>
    <div class="check-item" data-ok="false">
      <div class="ck-icon" onclick="toggleCheck(this)">⬜</div>
      <div class="ck-text"><b>Перевірено на 768px</b><span>Симулятор iPad у DevTools</span></div>
    </div>
    <div class="check-item" data-ok="false">
      <div class="ck-icon" onclick="toggleCheck(this)">⬜</div>
      <div class="ck-text"><b>Зображення не виходять</b><span>img { max-width:100% } встановлено</span></div>
    </div>
    <div class="check-item" data-ok="false">
      <div class="ck-icon" onclick="toggleCheck(this)">⬜</div>
      <div class="ck-text"><b>Кнопки зручні для тапу</b><span>Мінімальна висота кнопок 44px</span></div>
    </div>
    <div class="check-item" data-ok="false">
      <div class="ck-icon" onclick="toggleCheck(this)">⬜</div>
      <div class="ck-text"><b>Горизонтальний скрол відсутній</b><span>Сторінка не ширша за viewport</span></div>
    </div>
    <div class="check-item" data-ok="false">
      <div class="ck-icon" onclick="toggleCheck(this)">⬜</div>
      <div class="ck-text"><b>Навігація на мобайлі</b><span>Гамбургер або нижня панель</span></div>
    </div>
  </div>

  <div class="ck-result" id="ck-result">0 / 7 виконано</div>
</div>`,
    `${BASE}
.guide-demo{max-width:520px}
h2{font-size:18px;margin-bottom:6px}
p{font-size:13px;color:#94a3b8;margin-bottom:14px}
.checklist{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.check-item{background:#1e293b;border:1px solid #334155;border-radius:10px;padding:14px;display:flex;gap:14px;align-items:flex-start;transition:border-color .3s}
.check-item[data-ok="true"]{border-color:#059669;background:rgba(5,150,105,.07)}
.ck-icon{font-size:22px;cursor:pointer;flex-shrink:0;user-select:none;transition:.2s;line-height:1}
.ck-icon:hover{transform:scale(1.15)}
.ck-text{display:flex;flex-direction:column;gap:3px}
.ck-text b{font-size:14px}
.ck-text span{font-size:12px;color:#64748b}
.check-item[data-ok="true"] .ck-text b{color:#4ade80}
.ck-result{background:#0f172a;border:1px solid #334155;border-radius:10px;padding:14px;text-align:center;font-weight:700;font-size:16px;transition:all .3s}`,
    `function toggleCheck(icon) {
  const item = icon.closest('.check-item');
  const done = item.dataset.ok === 'true';
  item.dataset.ok = done ? 'false' : 'true';
  icon.textContent = done ? '⬜' : '✅';
  updateResult();
}

function updateResult() {
  const all  = document.querySelectorAll('.check-item').length;
  const done = document.querySelectorAll('.check-item[data-ok="true"]').length;
  const res  = document.getElementById('ck-result');
  res.textContent = done + ' / ' + all + ' виконано';
  if (done === all) {
    res.style.borderColor = '#059669';
    res.style.color = '#4ade80';
    res.textContent = '🎉 Все ' + all + ' пунктів виконано! Сайт готовий!';
  } else {
    res.style.borderColor = '#334155';
    res.style.color = '#f8fafc';
  }
}`,
    [
      { level:'easy',   uk:'Відмічай пункти чеклисту один за одним і спостерігай як змінюється результат.',  ru:'Отмечай пункты чеклиста один за одним и наблюдай как меняется результат.' },
      { level:'medium', uk:'Додай новий пункт у checklist: "Шрифт читається на мобайлі (мін. 14px)".',  ru:'Добавь новый пункт в checklist: "Шрифт читается на мобайле (мин. 14px)".' },
      { level:'hard',   uk:'Збережи стан чеклисту у localStorage: при виході і поверненні стан відновлюється.',  ru:'Сохрани состояние чеклиста в localStorage: при выходе и возврате состояние восстанавливается.' },
    ]
  );

  /* ─── 10-10 (ПРОЕКТ) ─────────────────────────────────────── */
  patch('10-10',
    { uk:`<h2>ПРОЕКТ: Адаптивна сторінка-візитка</h2>
<p>Фінальний проект модуля 10 — повна адаптивна сторінка-візитка з усіма техніками розділу.</p>
<h3>Що реалізовано</h3>
<ul>
  <li>✅ Viewport meta та mobile-first CSS</li>
  <li>✅ Гамбургер-меню з анімацією ☰→✕</li>
  <li>✅ Grid-сітка навичок з auto-fill/minmax</li>
  <li>✅ Адаптивна секція контактів (Flex → колонка)</li>
  <li>✅ Media queries: 480px / 768px / 1024px</li>
  <li>✅ Переключатель теми (Dark/Light) через classList</li>
</ul>
<p>Вивчи CSS у вкладці style.css — знайди всі @media блоки. Зміни розмір вікна перегляду і спостерігай за адаптацією!</p>`,
      ru:`<h2>ПРОЕКТ: Адаптивная страница-визитка</h2>
<ul>
  <li>✅ Viewport meta и mobile-first CSS</li>
  <li>✅ Гамбургер-меню с анимацией ☰→✕</li>
  <li>✅ Grid навыков с auto-fill/minmax</li>
  <li>✅ Адаптивные секции (Flex → колонка)</li>
  <li>✅ Media queries: 480px / 768px / 1024px</li>
  <li>✅ Переключатель темы Dark/Light</li>
</ul>` },
    `<!DOCTYPE html>
<html lang="uk" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Аліна Коваленко — Веб-Розробник</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Header -->
  <header class="site-header">
    <div class="container header-inner">
      <div class="logo">AK<span>.dev</span></div>
      <nav class="site-nav" id="site-nav">
        <a href="#about">Про мене</a>
        <a href="#skills">Навички</a>
        <a href="#works">Роботи</a>
        <a href="#contact">Контакт</a>
      </nav>
      <div class="header-actions">
        <button class="theme-btn" id="theme-btn" title="Змінити тему">🌙</button>
        <button class="burger" id="burger">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <div class="hero-inner">
        <div class="hero-text">
          <p class="hero-sub">👋 Привіт, я</p>
          <h1>Аліна Коваленко</h1>
          <p class="hero-role">Junior Web Developer</p>
          <p class="hero-desc">Роблю сайти, які виглядають чудово на будь-якому пристрої.</p>
          <div class="hero-btns">
            <button class="btn-primary">Мої роботи</button>
            <button class="btn-outline">Написати мені</button>
          </div>
        </div>
        <div class="hero-avatar">👩‍💻</div>
      </div>
    </div>
  </section>

  <!-- Skills -->
  <section class="section" id="skills">
    <div class="container">
      <h2 class="section-title">Навички</h2>
      <div class="skills-grid">
        <div class="skill-card"><span class="sk-icon">🌐</span><b>HTML5</b></div>
        <div class="skill-card"><span class="sk-icon">🎨</span><b>CSS3</b></div>
        <div class="skill-card"><span class="sk-icon">⚡</span><b>JavaScript</b></div>
        <div class="skill-card"><span class="sk-icon">📱</span><b>Adaptive</b></div>
        <div class="skill-card"><span class="sk-icon">🎯</span><b>Figma</b></div>
        <div class="skill-card"><span class="sk-icon">🔧</span><b>Git</b></div>
      </div>
    </div>
  </section>

  <!-- Works -->
  <section class="section section-alt" id="works">
    <div class="container">
      <h2 class="section-title">Мої роботи</h2>
      <div class="works-grid">
        <div class="work-card">
          <div class="work-img" style="background:linear-gradient(135deg,#1e3a5f,#3b82f6)">🌊</div>
          <div class="work-info"><h3>Сайт кафе</h3><p>HTML + CSS + JS</p></div>
        </div>
        <div class="work-card">
          <div class="work-img" style="background:linear-gradient(135deg,#1a2e22,#059669)">🌿</div>
          <div class="work-info"><h3>Магазин рослин</h3><p>Flexbox + Grid</p></div>
        </div>
        <div class="work-card">
          <div class="work-img" style="background:linear-gradient(135deg,#2d1e0f,#f59e0b)">🔥</div>
          <div class="work-info"><h3>Портфоліо</h3><p>CSS Animations</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section class="section" id="contact">
    <div class="container">
      <h2 class="section-title">Контакт</h2>
      <div class="contact-row">
        <div class="contact-info">
          <div class="contact-item">📧 alina@example.com</div>
          <div class="contact-item">📱 +38 (050) 123-45-67</div>
          <div class="contact-item">📍 Київ, Україна</div>
        </div>
        <form class="contact-form" onsubmit="sendForm(event)">
          <input type="text"  placeholder="Ваше ім'я" required>
          <input type="email" placeholder="Email" required>
          <textarea placeholder="Повідомлення..." rows="3"></textarea>
          <button type="submit" class="btn-primary">Надіслати</button>
        </form>
      </div>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>`,
    `/* ── Reset ── */
*{box-sizing:border-box;margin:0;padding:0}

/* ── Tokens ── */
:root{
  --bg:#0f172a; --bg2:#1e293b; --border:#334155;
  --text:#f8fafc; --muted:#94a3b8; --accent:#059669;
  --accent-glow:rgba(5,150,105,.15);
}
[data-theme="light"]{
  --bg:#f8fafc; --bg2:#fff; --border:#e2e8f0;
  --text:#0f172a; --muted:#64748b; --accent:#059669;
  --accent-glow:rgba(5,150,105,.1);
}

body{font-family:'Segoe UI',Arial,sans-serif;background:var(--bg);color:var(--text);transition:background .3s,color .3s}

/* ── Container ── */
.container{width:100%;padding:0 16px;margin:0 auto}

/* ── Header ── */
.site-header{background:var(--bg2);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100}
.header-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 16px}
.logo{font-size:20px;font-weight:900;color:var(--accent)}
.logo span{color:var(--muted);font-weight:400}

.site-nav{display:none;flex-direction:column;gap:4px;
  position:absolute;top:100%;left:0;right:0;
  background:var(--bg2);border-bottom:1px solid var(--border);padding:10px 16px}
.site-nav.open{display:flex}
.site-nav a{color:var(--muted);text-decoration:none;padding:10px 12px;border-radius:8px;font-size:14px;transition:.2s}
.site-nav a:hover{color:var(--accent);background:var(--accent-glow)}

.header-actions{display:flex;gap:6px;align-items:center}
.theme-btn{background:none;border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:7px;cursor:pointer;font-size:16px;transition:.2s}
.theme-btn:hover{border-color:var(--accent)}

/* Burger */
.burger{background:none;border:none;cursor:pointer;padding:7px;display:flex;flex-direction:column;gap:5px}
.burger span{display:block;width:22px;height:2px;background:var(--text);border-radius:2px;transition:.3s}
.burger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.burger.open span:nth-child(2){opacity:0}
.burger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* ── Hero ── */
.hero{padding:40px 0}
.hero-inner{display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center}
.hero-sub{font-size:14px;color:var(--muted);margin-bottom:6px}
.hero-inner h1{font-size:28px;font-weight:900;margin-bottom:8px}
.hero-role{color:var(--accent);font-size:15px;margin-bottom:10px}
.hero-desc{font-size:14px;color:var(--muted);margin-bottom:20px;max-width:360px}
.hero-avatar{font-size:80px;line-height:1}
.hero-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.btn-primary{background:var(--accent);border:none;color:#fff;padding:11px 22px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600;transition:.2s}
.btn-primary:hover{filter:brightness(1.1)}
.btn-outline{background:none;border:2px solid var(--accent);color:var(--accent);padding:9px 20px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600;transition:.2s}
.btn-outline:hover{background:var(--accent-glow)}

/* ── Sections ── */
.section{padding:40px 0}
.section-alt{background:var(--bg2)}
.section-title{font-size:22px;font-weight:800;margin-bottom:20px;text-align:center}

/* ── Skills Grid ── */
.skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px}
.skill-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center;transition:.2s}
.skill-card:hover{border-color:var(--accent);background:var(--accent-glow)}
.sk-icon{font-size:28px;display:block;margin-bottom:6px}
.skill-card b{font-size:13px}

/* ── Works ── */
.works-grid{display:grid;grid-template-columns:1fr;gap:14px}
.work-card{background:var(--bg);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:.25s}
.work-card:hover{border-color:var(--accent);transform:translateY(-3px)}
.work-img{height:140px;display:flex;align-items:center;justify-content:center;font-size:48px}
.work-info{padding:14px}
.work-info h3{font-size:15px;margin-bottom:4px}
.work-info p{font-size:12px;color:var(--muted)}

/* ── Contact ── */
.contact-row{display:flex;flex-direction:column;gap:20px}
.contact-info{display:flex;flex-direction:column;gap:10px}
.contact-item{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:14px}
.contact-form{display:flex;flex-direction:column;gap:10px}
.contact-form input,.contact-form textarea{background:var(--bg2);border:1px solid var(--border);color:var(--text);padding:11px 14px;border-radius:8px;font-size:14px;font-family:inherit;transition:.2s}
.contact-form input:focus,.contact-form textarea:focus{outline:none;border-color:var(--accent)}

/* ── Media Queries ── */
@media(min-width:480px){
  .works-grid{grid-template-columns:1fr 1fr}
  .hero-inner h1{font-size:32px}
}
@media(min-width:768px){
  .container{max-width:780px}
  .site-nav{display:flex;flex-direction:row;gap:4px;position:static;background:none;border:none;padding:0}
  .burger{display:none}
  .hero-inner{flex-direction:row;text-align:left;gap:40px}
  .hero-btns{justify-content:flex-start}
  .hero-desc{max-width:100%}
  .hero-avatar{font-size:100px;flex-shrink:0}
  .works-grid{grid-template-columns:1fr 1fr 1fr}
  .contact-row{flex-direction:row}
  .contact-info{flex:1}.contact-form{flex:2}
}
@media(min-width:1024px){
  .container{max-width:1000px}
  .hero-inner h1{font-size:42px}
}`,
    `// ── Burger ──
const burger  = document.getElementById('burger');
const siteNav = document.getElementById('site-nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  siteNav.classList.toggle('open');
});

document.querySelectorAll('.site-nav a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    siteNav.classList.remove('open');
  });
});

// ── Тема ──
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
  const html  = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme  = isDark ? 'light' : 'dark';
  themeBtn.textContent = isDark ? '☀️' : '🌙';
});

// ── Форма ──
function sendForm(e) {
  e.preventDefault();
  alert('✅ Повідомлення надіслано! (демо-версія)');
  e.target.reset();
}`,
    [
      { level:'easy',   uk:'Відкрий гамбургер-меню і перевір навігацію. Перемкни темну/світлу тему кнопкою 🌙.',  ru:'Открой гамбургер-меню и проверь навигацию. Переключи тёмную/светлую тему кнопкой 🌙.' },
      { level:'medium', uk:'Змін колір акценту: у :root встанови --accent:#3b82f6. Подивись як змінюються всі кольори одночасно.',  ru:'Измени цвет акцента: в :root установи --accent:#3b82f6. Посмотри как меняются все цвета одновременно.' },
      { level:'hard',   uk:'Додай 4-ту роботу у .works-grid з іншим градієнтом, іконкою і описом.',  ru:'Добавь 4-ю работу в .works-grid с другим градиентом, иконкой и описанием.' },
      { level:'extra',  uk:'Додай секцію "Відгуки" між Works і Contact: 3 картки з аватаром emoji, ім\'ям, зіркою (⭐) та текстом відгуку.', ru:'Добавь секцию "Отзывы" между Works и Contact: 3 карточки с аватаром emoji, именем, звёздой (⭐) и текстом отзыва.' },
    ]
  );

})();
