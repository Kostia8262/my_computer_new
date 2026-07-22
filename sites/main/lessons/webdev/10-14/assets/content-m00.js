/* ═══ Модуль 00 — Старт · 10-14 Веб-Розробник ═══ */
(function () {
  'use strict';
  function patch(id, theory) {
    var l = WEB_LESSONS.find(function(x){ return x.id === id; });
    if (!l) return;
    l.theory = theory;
  }

  /* ── 00-01 Твій старт / Твой старт ── */
  patch('00-01', {
    uk: `<style>
.t1w{--acc:#3b82f6;--a2:#1d4ed8;font-family:inherit;max-width:840px;margin:0 auto;padding:20px 16px;}
.t1hero{background:linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 50%,#3b82f6 100%);border-radius:20px;padding:42px 32px;color:#fff;margin-bottom:20px;position:relative;overflow:hidden;}
.t1hero::before{content:'';position:absolute;width:300px;height:300px;background:rgba(255,255,255,.05);border-radius:50%;right:-90px;top:-110px;pointer-events:none;}
.t1badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:8px;padding:4px 12px;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:14px;}
.t1hero h1{font-size:clamp(19px,4vw,32px);font-weight:800;margin:0 0 10px;line-height:1.25;}
.t1hero p{font-size:15px;color:rgba(255,255,255,.92);margin:0;max-width:500px;}
.t1cols{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px;}
@media(max-width:540px){.t1cols{grid-template-columns:1fr;}}
.t1card{background:#eef3ff;border:1px solid #c7d9ff;border-radius:16px;padding:20px 22px;}
.t1card h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 12px;}
.t1ul{list-style:none;padding:0;margin:0;display:grid;gap:8px;}
.t1ul li{display:flex;align-items:flex-start;gap:9px;font-size:14px;line-height:1.5;color:#1e293b;}
.t1ul li::before{content:'✓';color:var(--acc);font-weight:700;flex-shrink:0;margin-top:1px;}
.t1skills{display:flex;flex-wrap:wrap;gap:8px;padding:0;margin:0;list-style:none;}
.t1skill{background:#dbeafe;border:1px solid #93c5fd;color:#1e40af;border-radius:20px;padding:6px 14px;font-size:13px;font-weight:600;}
.t1tech{background:#eef3ff;border:1px solid #c7d9ff;border-radius:16px;padding:20px 22px;margin-bottom:18px;}
.t1tech h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 12px;}
.t1tags{display:flex;flex-wrap:wrap;gap:8px;}
.t1tag{display:inline-flex;align-items:center;gap:6px;background:#dbeafe;border:1px solid #93c5fd;border-radius:8px;padding:6px 14px;font-size:13px;font-weight:600;color:#1e40af;}
.t1prog{background:#eef3ff;border:1px solid #c7d9ff;border-radius:16px;padding:20px 22px;}
.t1prog h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 16px;}
.t1bar{display:flex;align-items:center;overflow-x:auto;padding-bottom:6px;gap:0;}
.t1step{flex:0 0 auto;text-align:center;padding:0 6px;}
.t1dot{width:36px;height:36px;border-radius:50%;background:#dbeafe;border:2px solid #93c5fd;display:flex;align-items:center;justify-content:center;font-size:14px;margin:0 auto 6px;}
.t1dot.on{background:var(--acc);border-color:var(--acc);}
.t1dot.end{background:#bfdbfe;border-color:var(--acc);}
.t1step span{font-size:10px;color:#374151;display:block;white-space:nowrap;}
.t1arr{color:#bfdbfe;font-size:16px;flex:0 0 auto;padding:0 2px;margin-bottom:20px;line-height:1;}
</style>
<div class="t1w">
  <div class="t1hero">
    <span class="t1badge">10–14 · Веб-Розробник</span>
    <h1>Від HTML до справжнього веб-розробника</h1>
    <p>Тут ти освоїш сучасний стек технологій і побудуєш реальні проекти з нуля до деплою</p>
  </div>

  <div class="t1cols">
    <div class="t1card">
      <h2>✅ Що ти вже знаєш?</h2>
      <ul class="t1ul">
        <li>HTML — теги, структура сторінки</li>
        <li>CSS — базові стилі та селектори</li>
        <li>Вмієш користуватися браузером і DevTools</li>
        <li>Знаєш що таке сайт і як він відкривається</li>
      </ul>
    </div>
    <div class="t1card">
      <h2>🚀 Що ти освоїш?</h2>
      <ul class="t1skills">
        <li class="t1skill">Сучасний CSS</li>
        <li class="t1skill">JavaScript</li>
        <li class="t1skill">DOM</li>
        <li class="t1skill">Адаптивність</li>
        <li class="t1skill">ES6+</li>
        <li class="t1skill">Fetch API</li>
        <li class="t1skill">Git</li>
        <li class="t1skill">Bootstrap</li>
      </ul>
    </div>
  </div>

  <div class="t1tech">
    <h2>🛠️ Технології курсу</h2>
    <div class="t1tags">
      <span class="t1tag">🧱 HTML5</span>
      <span class="t1tag">🎨 CSS3</span>
      <span class="t1tag">⚡ JavaScript ES6+</span>
      <span class="t1tag">🌐 Fetch API</span>
      <span class="t1tag">📦 Bootstrap</span>
      <span class="t1tag">🌿 Git</span>
      <span class="t1tag">🖱️ DOM API</span>
      <span class="t1tag">🛠️ npm / Vite</span>
    </div>
  </div>

  <div class="t1prog">
    <h2>📍 Твій шлях до Junior Frontend</h2>
    <div class="t1bar">
      <div class="t1step">
        <div class="t1dot on">📍</div>
        <span>Ти тут</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot">🧱</div>
        <span>HTML+CSS</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot">⚡</div>
        <span>JavaScript</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot">🖱️</div>
        <span>DOM</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot">🚀</div>
        <span>ES6+ / API</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot end">🏆</div>
        <span>Junior Frontend</span>
      </div>
    </div>
  </div>
</div>`,

    ru: `<style>
.t1w{--acc:#3b82f6;--a2:#1d4ed8;font-family:inherit;max-width:840px;margin:0 auto;padding:20px 16px;}
.t1hero{background:linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 50%,#3b82f6 100%);border-radius:20px;padding:42px 32px;color:#fff;margin-bottom:20px;position:relative;overflow:hidden;}
.t1hero::before{content:'';position:absolute;width:300px;height:300px;background:rgba(255,255,255,.05);border-radius:50%;right:-90px;top:-110px;pointer-events:none;}
.t1badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);border-radius:8px;padding:4px 12px;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;margin-bottom:14px;}
.t1hero h1{font-size:clamp(19px,4vw,32px);font-weight:800;margin:0 0 10px;line-height:1.25;}
.t1hero p{font-size:15px;color:rgba(255,255,255,.92);margin:0;max-width:500px;}
.t1cols{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px;}
@media(max-width:540px){.t1cols{grid-template-columns:1fr;}}
.t1card{background:#eef3ff;border:1px solid #c7d9ff;border-radius:16px;padding:20px 22px;}
.t1card h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 12px;}
.t1ul{list-style:none;padding:0;margin:0;display:grid;gap:8px;}
.t1ul li{display:flex;align-items:flex-start;gap:9px;font-size:14px;line-height:1.5;color:#1e293b;}
.t1ul li::before{content:'✓';color:var(--acc);font-weight:700;flex-shrink:0;margin-top:1px;}
.t1skills{display:flex;flex-wrap:wrap;gap:8px;padding:0;margin:0;list-style:none;}
.t1skill{background:#dbeafe;border:1px solid #93c5fd;color:#1e40af;border-radius:20px;padding:6px 14px;font-size:13px;font-weight:600;}
.t1tech{background:#eef3ff;border:1px solid #c7d9ff;border-radius:16px;padding:20px 22px;margin-bottom:18px;}
.t1tech h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 12px;}
.t1tags{display:flex;flex-wrap:wrap;gap:8px;}
.t1tag{display:inline-flex;align-items:center;gap:6px;background:#dbeafe;border:1px solid #93c5fd;border-radius:8px;padding:6px 14px;font-size:13px;font-weight:600;color:#1e40af;}
.t1prog{background:#eef3ff;border:1px solid #c7d9ff;border-radius:16px;padding:20px 22px;}
.t1prog h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 16px;}
.t1bar{display:flex;align-items:center;overflow-x:auto;padding-bottom:6px;gap:0;}
.t1step{flex:0 0 auto;text-align:center;padding:0 6px;}
.t1dot{width:36px;height:36px;border-radius:50%;background:#dbeafe;border:2px solid #93c5fd;display:flex;align-items:center;justify-content:center;font-size:14px;margin:0 auto 6px;}
.t1dot.on{background:var(--acc);border-color:var(--acc);}
.t1dot.end{background:#bfdbfe;border-color:var(--acc);}
.t1step span{font-size:10px;color:#374151;display:block;white-space:nowrap;}
.t1arr{color:#bfdbfe;font-size:16px;flex:0 0 auto;padding:0 2px;margin-bottom:20px;line-height:1;}
</style>
<div class="t1w">
  <div class="t1hero">
    <span class="t1badge">10–14 · Веб-Разработчик</span>
    <h1>От HTML до настоящего веб-разработчика</h1>
    <p>Здесь ты освоишь современный стек технологий и построишь реальные проекты с нуля до деплоя</p>
  </div>

  <div class="t1cols">
    <div class="t1card">
      <h2>✅ Что ты уже знаешь?</h2>
      <ul class="t1ul">
        <li>HTML — теги, структура страницы</li>
        <li>CSS — базовые стили и селекторы</li>
        <li>Умеешь пользоваться браузером и DevTools</li>
        <li>Знаешь что такое сайт и как он открывается</li>
      </ul>
    </div>
    <div class="t1card">
      <h2>🚀 Что ты освоишь?</h2>
      <ul class="t1skills">
        <li class="t1skill">Современный CSS</li>
        <li class="t1skill">JavaScript</li>
        <li class="t1skill">DOM</li>
        <li class="t1skill">Адаптивность</li>
        <li class="t1skill">ES6+</li>
        <li class="t1skill">Fetch API</li>
        <li class="t1skill">Git</li>
        <li class="t1skill">Bootstrap</li>
      </ul>
    </div>
  </div>

  <div class="t1tech">
    <h2>🛠️ Технологии курса</h2>
    <div class="t1tags">
      <span class="t1tag">🧱 HTML5</span>
      <span class="t1tag">🎨 CSS3</span>
      <span class="t1tag">⚡ JavaScript ES6+</span>
      <span class="t1tag">🌐 Fetch API</span>
      <span class="t1tag">📦 Bootstrap</span>
      <span class="t1tag">🌿 Git</span>
      <span class="t1tag">🖱️ DOM API</span>
      <span class="t1tag">🛠️ npm / Vite</span>
    </div>
  </div>

  <div class="t1prog">
    <h2>📍 Твой путь к Junior Frontend</h2>
    <div class="t1bar">
      <div class="t1step">
        <div class="t1dot on">📍</div>
        <span>Ты здесь</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot">🧱</div>
        <span>HTML+CSS</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot">⚡</div>
        <span>JavaScript</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot">🖱️</div>
        <span>DOM</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot">🚀</div>
        <span>ES6+ / API</span>
      </div>
      <span class="t1arr">──</span>
      <div class="t1step">
        <div class="t1dot end">🏆</div>
        <span>Junior Frontend</span>
      </div>
    </div>
  </div>
</div>`
  });

  /* ── 00-02 Дорожня карта / Дорожная карта ── */
  patch('00-02', {
    uk: `<style>
.t2w{--acc:#3b82f6;font-family:inherit;max-width:840px;margin:0 auto;padding:20px 16px;}
.t2stats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px;justify-content:center;}
.t2stat{background:#dbeafe;border:1px solid #93c5fd;border-radius:12px;padding:14px 22px;text-align:center;flex:1 1 130px;}
.t2sn{font-size:26px;font-weight:800;color:var(--acc);display:block;}
.t2sl{font-size:12px;color:#374151;}
.t2mods{background:#eef3ff;border:1px solid #c7d9ff;border-radius:16px;padding:20px 22px;margin-bottom:20px;}
.t2mods h2{color:var(--acc);font-size:18px;font-weight:700;margin:0 0 14px;}
.t2list{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:8px;list-style:none;padding:0;margin:0;}
.t2li{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;background:#dbeafe;border:1px solid #93c5fd;line-height:1.4;}
.t2num{font-size:11px;font-weight:700;background:var(--acc);color:#fff;border-radius:6px;padding:2px 7px;flex-shrink:0;}
.t2ic{font-size:17px;flex-shrink:0;}
.t2li b{color:#1e40af;font-size:13px;}
.t2li span{color:#374151;font-size:12px;}
.t2projs{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:12px;margin-bottom:20px;}
.t2proj{border-radius:14px;padding:18px 16px;background:#dbeafe;border:1px solid #93c5fd;transition:transform .2s,box-shadow .2s;cursor:default;}
.t2proj:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(59,130,246,.2);}
.t2pe{font-size:32px;display:block;margin-bottom:10px;}
.t2proj h3{font-size:14px;font-weight:700;color:#1e40af;margin:0 0 5px;}
.t2proj p{font-size:12px;color:#374151;margin:0;line-height:1.4;}
.t2foot{background:linear-gradient(135deg,#1d4ed8,#3b82f6);border-radius:14px;padding:22px 24px;text-align:center;color:#fff;}
.t2foot p{margin:0;font-size:17px;font-weight:600;}
</style>
<div class="t2w">
  <div class="t2stats">
    <div class="t2stat"><span class="t2sn">14</span><span class="t2sl">модулів</span></div>
    <div class="t2stat"><span class="t2sn">170</span><span class="t2sl">уроків</span></div>
    <div class="t2stat"><span class="t2sn">4</span><span class="t2sl">реальних проекти</span></div>
  </div>

  <div class="t2mods">
    <h2>📋 14 модулів — повний шлях</h2>
    <ul class="t2list">
      <li class="t2li"><span class="t2num">01</span><span class="t2ic">🧱</span><div><b>HTML5 Семантика</b> <span>— правильна структура документу</span></div></li>
      <li class="t2li"><span class="t2num">02</span><span class="t2ic">🎨</span><div><b>CSS3 Майстерність</b> <span>— селектори, псевдокласи, каскад</span></div></li>
      <li class="t2li"><span class="t2num">03</span><span class="t2ic">✨</span><div><b>Анімації</b> <span>— keyframes, transitions, ефекти</span></div></li>
      <li class="t2li"><span class="t2num">04</span><span class="t2ic">⚡</span><div><b>JavaScript</b> <span>— змінні, функції, умови, цикли</span></div></li>
      <li class="t2li"><span class="t2num">05</span><span class="t2ic">🖱️</span><div><b>DOM</b> <span>— маніпуляції та події на сторінці</span></div></li>
      <li class="t2li"><span class="t2num">06</span><span class="t2ic">📱</span><div><b>Адаптивність</b> <span>— media queries, мобільний дизайн</span></div></li>
      <li class="t2li"><span class="t2num">07</span><span class="t2ic">🔧</span><div><b>ES6+</b> <span>— сучасний синтаксис JavaScript</span></div></li>
      <li class="t2li"><span class="t2num">08</span><span class="t2ic">🌐</span><div><b>Fetch API</b> <span>— запити до серверів та async/await</span></div></li>
      <li class="t2li"><span class="t2num">09</span><span class="t2ic">🎯</span><div><b>Bootstrap</b> <span>— UI-фреймворк і готові компоненти</span></div></li>
      <li class="t2li"><span class="t2num">10</span><span class="t2ic">🛠️</span><div><b>Tooling</b> <span>— Git, npm, Vite, DevTools</span></div></li>
      <li class="t2li"><span class="t2num">11</span><span class="t2ic">🎮</span><div><b>Квіз-гра</b> <span>— Проект: браузерна вікторина</span></div></li>
      <li class="t2li"><span class="t2num">12</span><span class="t2ic">🎭</span><div><b>Портфоліо</b> <span>— Проект: персональне портфоліо</span></div></li>
      <li class="t2li"><span class="t2num">13</span><span class="t2ic">🌤️</span><div><b>Погода+API</b> <span>— Проект: погодний застосунок</span></div></li>
      <li class="t2li"><span class="t2num">14</span><span class="t2ic">📝</span><div><b>Блог</b> <span>— Проект: повноцінний блог із контентом</span></div></li>
    </ul>
  </div>

  <div class="t2projs">
    <div class="t2proj">
      <span class="t2pe">🎮</span>
      <h3>Квіз-гра</h3>
      <p>Браузерна вікторина з питаннями та таймером</p>
    </div>
    <div class="t2proj">
      <span class="t2pe">🎭</span>
      <h3>Портфоліо</h3>
      <p>Персональний сайт з твоїми проектами</p>
    </div>
    <div class="t2proj">
      <span class="t2pe">🌤️</span>
      <h3>Погода+API</h3>
      <p>Погодний застосунок з реальними даними</p>
    </div>
    <div class="t2proj">
      <span class="t2pe">📝</span>
      <h3>Блог</h3>
      <p>Повноцінний блог з публікаціями</p>
    </div>
  </div>

  <div class="t2foot">
    <p>Кожен модуль = нова суперсила 💪</p>
  </div>
</div>`,

    ru: `<style>
.t2w{--acc:#3b82f6;font-family:inherit;max-width:840px;margin:0 auto;padding:20px 16px;}
.t2stats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px;justify-content:center;}
.t2stat{background:#dbeafe;border:1px solid #93c5fd;border-radius:12px;padding:14px 22px;text-align:center;flex:1 1 130px;}
.t2sn{font-size:26px;font-weight:800;color:var(--acc);display:block;}
.t2sl{font-size:12px;color:#374151;}
.t2mods{background:#eef3ff;border:1px solid #c7d9ff;border-radius:16px;padding:20px 22px;margin-bottom:20px;}
.t2mods h2{color:var(--acc);font-size:18px;font-weight:700;margin:0 0 14px;}
.t2list{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:8px;list-style:none;padding:0;margin:0;}
.t2li{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;background:#dbeafe;border:1px solid #93c5fd;line-height:1.4;}
.t2num{font-size:11px;font-weight:700;background:var(--acc);color:#fff;border-radius:6px;padding:2px 7px;flex-shrink:0;}
.t2ic{font-size:17px;flex-shrink:0;}
.t2li b{color:#1e40af;font-size:13px;}
.t2li span{color:#374151;font-size:12px;}
.t2projs{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:12px;margin-bottom:20px;}
.t2proj{border-radius:14px;padding:18px 16px;background:#dbeafe;border:1px solid #93c5fd;transition:transform .2s,box-shadow .2s;cursor:default;}
.t2proj:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(59,130,246,.2);}
.t2pe{font-size:32px;display:block;margin-bottom:10px;}
.t2proj h3{font-size:14px;font-weight:700;color:#1e40af;margin:0 0 5px;}
.t2proj p{font-size:12px;color:#374151;margin:0;line-height:1.4;}
.t2foot{background:linear-gradient(135deg,#1d4ed8,#3b82f6);border-radius:14px;padding:22px 24px;text-align:center;color:#fff;}
.t2foot p{margin:0;font-size:17px;font-weight:600;}
</style>
<div class="t2w">
  <div class="t2stats">
    <div class="t2stat"><span class="t2sn">14</span><span class="t2sl">модулей</span></div>
    <div class="t2stat"><span class="t2sn">170</span><span class="t2sl">уроков</span></div>
    <div class="t2stat"><span class="t2sn">4</span><span class="t2sl">реальных проекта</span></div>
  </div>

  <div class="t2mods">
    <h2>📋 14 модулей — полный путь</h2>
    <ul class="t2list">
      <li class="t2li"><span class="t2num">01</span><span class="t2ic">🧱</span><div><b>HTML5 Семантика</b> <span>— правильная структура документа</span></div></li>
      <li class="t2li"><span class="t2num">02</span><span class="t2ic">🎨</span><div><b>CSS3 Мастерство</b> <span>— селекторы, псевдоклассы, каскад</span></div></li>
      <li class="t2li"><span class="t2num">03</span><span class="t2ic">✨</span><div><b>Анимации</b> <span>— keyframes, transitions, эффекты</span></div></li>
      <li class="t2li"><span class="t2num">04</span><span class="t2ic">⚡</span><div><b>JavaScript</b> <span>— переменные, функции, условия, циклы</span></div></li>
      <li class="t2li"><span class="t2num">05</span><span class="t2ic">🖱️</span><div><b>DOM</b> <span>— манипуляции и события на странице</span></div></li>
      <li class="t2li"><span class="t2num">06</span><span class="t2ic">📱</span><div><b>Адаптивность</b> <span>— media queries, мобильный дизайн</span></div></li>
      <li class="t2li"><span class="t2num">07</span><span class="t2ic">🔧</span><div><b>ES6+</b> <span>— современный синтаксис JavaScript</span></div></li>
      <li class="t2li"><span class="t2num">08</span><span class="t2ic">🌐</span><div><b>Fetch API</b> <span>— запросы к серверам и async/await</span></div></li>
      <li class="t2li"><span class="t2num">09</span><span class="t2ic">🎯</span><div><b>Bootstrap</b> <span>— UI-фреймворк и готовые компоненты</span></div></li>
      <li class="t2li"><span class="t2num">10</span><span class="t2ic">🛠️</span><div><b>Tooling</b> <span>— Git, npm, Vite, DevTools</span></div></li>
      <li class="t2li"><span class="t2num">11</span><span class="t2ic">🎮</span><div><b>Квиз-игра</b> <span>— Проект: браузерная викторина</span></div></li>
      <li class="t2li"><span class="t2num">12</span><span class="t2ic">🎭</span><div><b>Портфолио</b> <span>— Проект: персональное портфолио</span></div></li>
      <li class="t2li"><span class="t2num">13</span><span class="t2ic">🌤️</span><div><b>Погода+API</b> <span>— Проект: погодное приложение</span></div></li>
      <li class="t2li"><span class="t2num">14</span><span class="t2ic">📝</span><div><b>Блог</b> <span>— Проект: полноценный блог с контентом</span></div></li>
    </ul>
  </div>

  <div class="t2projs">
    <div class="t2proj">
      <span class="t2pe">🎮</span>
      <h3>Квиз-игра</h3>
      <p>Браузерная викторина с вопросами и таймером</p>
    </div>
    <div class="t2proj">
      <span class="t2pe">🎭</span>
      <h3>Портфолио</h3>
      <p>Персональный сайт с твоими проектами</p>
    </div>
    <div class="t2proj">
      <span class="t2pe">🌤️</span>
      <h3>Погода+API</h3>
      <p>Погодное приложение с реальными данными</p>
    </div>
    <div class="t2proj">
      <span class="t2pe">📝</span>
      <h3>Блог</h3>
      <p>Полноценный блог с публикациями</p>
    </div>
  </div>

  <div class="t2foot">
    <p>Каждый модуль = новая суперсила 💪</p>
  </div>
</div>`
  });
})();
