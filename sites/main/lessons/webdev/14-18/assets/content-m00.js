/* ═══ Модуль 00 — Старт · 14-18 Фулстек-Про ═══ */
(function () {
  'use strict';
  function patch(id, theory) {
    var l = WEB_LESSONS.find(function(x){ return x.id === id; });
    if (!l) return;
    l.theory = theory;
  }

  /* ── 00-01 Ласкаво просимо до Fullstack / Добро пожаловать в Fullstack ── */
  patch('00-01', {
    uk: `<style>
.p1w{--acc:#7c3aed;--a2:#5b21b6;font-family:inherit;max-width:840px;margin:0 auto;padding:20px 16px;}
.p1hero{background:linear-gradient(135deg,#3b0764 0%,#5b21b6 50%,#7c3aed 100%);border-radius:20px;padding:44px 32px;color:#fff;margin-bottom:20px;position:relative;overflow:hidden;}
.p1hero::before{content:'';position:absolute;width:320px;height:320px;background:rgba(255,255,255,.04);border-radius:50%;right:-100px;top:-130px;pointer-events:none;}
.p1badge{display:inline-block;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:6px;padding:4px 12px;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;margin-bottom:16px;}
.p1hero h1{font-size:clamp(19px,4vw,32px);font-weight:800;margin:0 0 10px;line-height:1.3;}
.p1hero p{font-size:15px;color:rgba(255,255,255,.88);margin:0;max-width:520px;}
.p1pre{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px 24px;margin-bottom:18px;}
.p1pre h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 12px;}
.p1ul{list-style:none;padding:0;margin:0;display:grid;gap:8px;}
.p1ul li{display:flex;align-items:flex-start;gap:10px;font-size:14px;line-height:1.5;color:#1e293b;}
.p1ul li::before{content:'→';color:var(--acc);font-weight:700;flex-shrink:0;margin-top:1px;}
.p1stack{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px 24px;margin-bottom:18px;}
.p1stack h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 14px;}
.p1scols{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media(max-width:500px){.p1scols{grid-template-columns:1fr;}}
.p1scol{border-radius:12px;padding:16px 18px;background:#ede9fe;border:1px solid #c4b5fd;}
.p1scol h3{font-size:13px;font-weight:700;color:#5b21b6;margin:0 0 10px;text-transform:uppercase;letter-spacing:.5px;}
.p1stags{display:flex;flex-wrap:wrap;gap:7px;}
.p1stag{background:#ddd6fe;border:1px solid #c4b5fd;color:#5b21b6;border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;}
.p1msec{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px 24px;}
.p1msec h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 14px;}
.p1miles{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;}
.p1mile{border-radius:14px;padding:18px 16px;background:#ede9fe;border:1px solid #c4b5fd;transition:transform .2s,box-shadow .2s;cursor:default;}
.p1mile:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(124,58,237,.15);}
.p1me{font-size:30px;display:block;margin-bottom:10px;}
.p1mile h3{font-size:14px;font-weight:700;color:var(--acc);margin:0 0 4px;}
.p1mile p{font-size:12px;color:#374151;margin:0;line-height:1.4;}
</style>
<div class="p1w">
  <div class="p1hero">
    <span class="p1badge">14–18 · Fullstack Pro</span>
    <h1>Fullstack Pro — від браузера до сервера і назад</h1>
    <p>Побудуй production-ready застосунки з React, Node.js, Python і DevOps</p>
  </div>

  <div class="p1pre">
    <h2>📋 Що потрібно вміти перед стартом</h2>
    <ul class="p1ul">
      <li>HTML і CSS — структура та стилізація веб-сторінок</li>
      <li>Базовий JavaScript — змінні, функції, умови, цикли</li>
      <li>Розуміння DOM — що таке елементи та події</li>
      <li>Вміти користуватися браузером і базовим DevTools</li>
    </ul>
  </div>

  <div class="p1stack">
    <h2>🏗️ Технологічний стек</h2>
    <div class="p1scols">
      <div class="p1scol">
        <h3>🌐 Frontend</h3>
        <div class="p1stags">
          <span class="p1stag">JavaScript</span>
          <span class="p1stag">TypeScript</span>
          <span class="p1stag">React</span>
          <span class="p1stag">Redux</span>
          <span class="p1stag">CSS / Tailwind</span>
        </div>
      </div>
      <div class="p1scol">
        <h3>⚙️ Backend</h3>
        <div class="p1stags">
          <span class="p1stag">Node.js</span>
          <span class="p1stag">Python</span>
          <span class="p1stag">Flask</span>
          <span class="p1stag">Django</span>
          <span class="p1stag">PostgreSQL</span>
        </div>
      </div>
    </div>
  </div>

  <div class="p1msec">
    <h2>🎯 Твої майлстоуни</h2>
    <div class="p1miles">
      <div class="p1mile">
        <span class="p1me">💻</span>
        <h3>Junior Frontend</h3>
        <p>React + TypeScript + REST API</p>
      </div>
      <div class="p1mile">
        <span class="p1me">⚙️</span>
        <h3>Junior Backend</h3>
        <p>Node.js + Python + PostgreSQL</p>
      </div>
      <div class="p1mile">
        <span class="p1me">🔄</span>
        <h3>Fullstack</h3>
        <p>Повний цикл від UI до бази даних</p>
      </div>
      <div class="p1mile">
        <span class="p1me">🐳</span>
        <h3>DevOps basics</h3>
        <p>Docker, CI/CD, деплой на сервер</p>
      </div>
    </div>
  </div>
</div>`,

    ru: `<style>
.p1w{--acc:#7c3aed;--a2:#5b21b6;font-family:inherit;max-width:840px;margin:0 auto;padding:20px 16px;}
.p1hero{background:linear-gradient(135deg,#3b0764 0%,#5b21b6 50%,#7c3aed 100%);border-radius:20px;padding:44px 32px;color:#fff;margin-bottom:20px;position:relative;overflow:hidden;}
.p1hero::before{content:'';position:absolute;width:320px;height:320px;background:rgba(255,255,255,.04);border-radius:50%;right:-100px;top:-130px;pointer-events:none;}
.p1badge{display:inline-block;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:6px;padding:4px 12px;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;margin-bottom:16px;}
.p1hero h1{font-size:clamp(19px,4vw,32px);font-weight:800;margin:0 0 10px;line-height:1.3;}
.p1hero p{font-size:15px;color:rgba(255,255,255,.88);margin:0;max-width:520px;}
.p1pre{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px 24px;margin-bottom:18px;}
.p1pre h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 12px;}
.p1ul{list-style:none;padding:0;margin:0;display:grid;gap:8px;}
.p1ul li{display:flex;align-items:flex-start;gap:10px;font-size:14px;line-height:1.5;color:#1e293b;}
.p1ul li::before{content:'→';color:var(--acc);font-weight:700;flex-shrink:0;margin-top:1px;}
.p1stack{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px 24px;margin-bottom:18px;}
.p1stack h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 14px;}
.p1scols{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media(max-width:500px){.p1scols{grid-template-columns:1fr;}}
.p1scol{border-radius:12px;padding:16px 18px;background:#ede9fe;border:1px solid #c4b5fd;}
.p1scol h3{font-size:13px;font-weight:700;color:#5b21b6;margin:0 0 10px;text-transform:uppercase;letter-spacing:.5px;}
.p1stags{display:flex;flex-wrap:wrap;gap:7px;}
.p1stag{background:#ddd6fe;border:1px solid #c4b5fd;color:#5b21b6;border-radius:6px;padding:4px 10px;font-size:12px;font-weight:600;}
.p1msec{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px 24px;}
.p1msec h2{color:var(--acc);font-size:17px;font-weight:700;margin:0 0 14px;}
.p1miles{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;}
.p1mile{border-radius:14px;padding:18px 16px;background:#ede9fe;border:1px solid #c4b5fd;transition:transform .2s,box-shadow .2s;cursor:default;}
.p1mile:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(124,58,237,.15);}
.p1me{font-size:30px;display:block;margin-bottom:10px;}
.p1mile h3{font-size:14px;font-weight:700;color:var(--acc);margin:0 0 4px;}
.p1mile p{font-size:12px;color:#374151;margin:0;line-height:1.4;}
</style>
<div class="p1w">
  <div class="p1hero">
    <span class="p1badge">14–18 · Fullstack Pro</span>
    <h1>Fullstack Pro — от браузера до сервера и обратно</h1>
    <p>Построй production-ready приложения с React, Node.js, Python и DevOps</p>
  </div>

  <div class="p1pre">
    <h2>📋 Что нужно уметь перед стартом</h2>
    <ul class="p1ul">
      <li>HTML и CSS — структура и стилизация веб-страниц</li>
      <li>Базовый JavaScript — переменные, функции, условия, циклы</li>
      <li>Понимание DOM — что такое элементы и события</li>
      <li>Уметь пользоваться браузером и базовым DevTools</li>
    </ul>
  </div>

  <div class="p1stack">
    <h2>🏗️ Технологический стек</h2>
    <div class="p1scols">
      <div class="p1scol">
        <h3>🌐 Frontend</h3>
        <div class="p1stags">
          <span class="p1stag">JavaScript</span>
          <span class="p1stag">TypeScript</span>
          <span class="p1stag">React</span>
          <span class="p1stag">Redux</span>
          <span class="p1stag">CSS / Tailwind</span>
        </div>
      </div>
      <div class="p1scol">
        <h3>⚙️ Backend</h3>
        <div class="p1stags">
          <span class="p1stag">Node.js</span>
          <span class="p1stag">Python</span>
          <span class="p1stag">Flask</span>
          <span class="p1stag">Django</span>
          <span class="p1stag">PostgreSQL</span>
        </div>
      </div>
    </div>
  </div>

  <div class="p1msec">
    <h2>🎯 Твои майлстоуны</h2>
    <div class="p1miles">
      <div class="p1mile">
        <span class="p1me">💻</span>
        <h3>Junior Frontend</h3>
        <p>React + TypeScript + REST API</p>
      </div>
      <div class="p1mile">
        <span class="p1me">⚙️</span>
        <h3>Junior Backend</h3>
        <p>Node.js + Python + PostgreSQL</p>
      </div>
      <div class="p1mile">
        <span class="p1me">🔄</span>
        <h3>Fullstack</h3>
        <p>Полный цикл от UI до базы данных</p>
      </div>
      <div class="p1mile">
        <span class="p1me">🐳</span>
        <h3>DevOps basics</h3>
        <p>Docker, CI/CD, деплой на сервер</p>
      </div>
    </div>
  </div>
</div>`
  });

  /* ── 00-02 Технологічний стек і проекти / Технологический стек и проекты ── */
  patch('00-02', {
    uk: `<style>
.p2w{--acc:#7c3aed;font-family:inherit;max-width:840px;margin:0 auto;padding:20px 16px;}
.p2stats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px;justify-content:center;}
.p2stat{background:#ede9fe;border:1px solid #c4b5fd;border-radius:12px;padding:14px 22px;text-align:center;flex:1 1 130px;}
.p2sn{font-size:26px;font-weight:800;color:var(--acc);display:block;}
.p2sl{font-size:12px;color:#374151;}
.p2mods{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px 22px;margin-bottom:20px;}
.p2mods h2{color:var(--acc);font-size:18px;font-weight:700;margin:0 0 14px;}
.p2list{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:8px;list-style:none;padding:0;margin:0;}
.p2li{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;background:#ede9fe;border:1px solid #c4b5fd;line-height:1.4;}
.p2num{font-size:11px;font-weight:700;background:var(--acc);color:#fff;border-radius:6px;padding:2px 7px;flex-shrink:0;}
.p2ic{font-size:17px;flex-shrink:0;}
.p2li b{color:#5b21b6;font-size:13px;}
.p2li span{color:#374151;font-size:12px;}
.p2projs{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:20px;}
.p2proj{border-radius:14px;padding:18px 16px;background:#ede9fe;border:1px solid #c4b5fd;transition:transform .2s,box-shadow .2s;cursor:default;}
.p2proj:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(124,58,237,.18);}
.p2pe{font-size:30px;display:block;margin-bottom:10px;}
.p2proj h3{font-size:14px;font-weight:700;color:#5b21b6;margin:0 0 4px;}
.p2proj p{font-size:12px;color:#374151;margin:0 0 7px;line-height:1.4;}
.p2tech{font-size:11px;color:#6d28d9;font-weight:600;}
.p2career{background:linear-gradient(135deg,#3b0764,#5b21b6);border-radius:16px;padding:24px 24px;color:#fff;}
.p2career h2{font-size:17px;font-weight:700;margin:0 0 14px;color:#e9d5ff;}
.p2clist{list-style:none;padding:0;margin:0;display:grid;gap:9px;}
.p2clist li{display:flex;align-items:flex-start;gap:10px;font-size:14px;line-height:1.5;color:#fff;}
.p2clist li::before{content:'✓';color:#a78bfa;font-weight:700;flex-shrink:0;margin-top:2px;}
</style>
<div class="p2w">
  <div class="p2stats">
    <div class="p2stat"><span class="p2sn">12</span><span class="p2sl">модулів</span></div>
    <div class="p2stat"><span class="p2sn">170</span><span class="p2sl">уроків</span></div>
    <div class="p2stat"><span class="p2sn">4</span><span class="p2sl">production-ready проекти</span></div>
  </div>

  <div class="p2mods">
    <h2>📋 12 модулів — повний шлях</h2>
    <ul class="p2list">
      <li class="p2li"><span class="p2num">01</span><span class="p2ic">⚡</span><div><b>JS Pro</b> <span>— замикання, прототипи, патерни проектування</span></div></li>
      <li class="p2li"><span class="p2num">02</span><span class="p2ic">🔷</span><div><b>TypeScript</b> <span>— типізація, інтерфейси, generics</span></div></li>
      <li class="p2li"><span class="p2num">03</span><span class="p2ic">⚛️</span><div><b>React</b> <span>— компоненти, стан, хуки, JSX</span></div></li>
      <li class="p2li"><span class="p2num">04</span><span class="p2ic">🚀</span><div><b>React Advanced</b> <span>— Context, Redux, роутинг, оптимізація</span></div></li>
      <li class="p2li"><span class="p2num">05</span><span class="p2ic">🟩</span><div><b>Node.js</b> <span>— сервер, REST API, Express, middleware</span></div></li>
      <li class="p2li"><span class="p2num">06</span><span class="p2ic">🐍</span><div><b>Python Flask</b> <span>— мікрофреймворк, маршрути, шаблони</span></div></li>
      <li class="p2li"><span class="p2num">07</span><span class="p2ic">🦄</span><div><b>Django+DRF</b> <span>— повний фреймворк, ORM, REST</span></div></li>
      <li class="p2li"><span class="p2num">08</span><span class="p2ic">🗄️</span><div><b>Databases</b> <span>— PostgreSQL, SQL запити, Redis, міграції</span></div></li>
      <li class="p2li"><span class="p2num">09</span><span class="p2ic">💪</span><div><b>Gym Tracker</b> <span>— Проект: трекер тренувань (React + Node.js)</span></div></li>
      <li class="p2li"><span class="p2num">10</span><span class="p2ic">🎓</span><div><b>Навч. платформа</b> <span>— Проект: навчальний сайт (React + Django)</span></div></li>
      <li class="p2li"><span class="p2num">11</span><span class="p2ic">🛒</span><div><b>E-commerce</b> <span>— Проект: інтернет-магазин (full stack)</span></div></li>
      <li class="p2li"><span class="p2num">12</span><span class="p2ic">🐳</span><div><b>DevOps</b> <span>— Docker, CI/CD, GitHub Actions, деплой</span></div></li>
    </ul>
  </div>

  <div class="p2projs">
    <div class="p2proj">
      <span class="p2pe">💪</span>
      <h3>Gym Tracker</h3>
      <p>Трекер тренувань з прогресом і статистикою</p>
      <span class="p2tech">React + Node.js + PostgreSQL</span>
    </div>
    <div class="p2proj">
      <span class="p2pe">🎓</span>
      <h3>Learning Platform</h3>
      <p>Навчальна платформа з курсами та уроками</p>
      <span class="p2tech">React + Django + DRF</span>
    </div>
    <div class="p2proj">
      <span class="p2pe">🛒</span>
      <h3>E-commerce</h3>
      <p>Інтернет-магазин з кошиком та оплатою</p>
      <span class="p2tech">React + Node.js + PostgreSQL</span>
    </div>
    <div class="p2proj">
      <span class="p2pe">🐳</span>
      <h3>DevOps Pipeline</h3>
      <p>Автоматичний деплой з GitHub Actions</p>
      <span class="p2tech">Docker + GitHub Actions</span>
    </div>
  </div>

  <div class="p2career">
    <h2>🏆 Після курсу ти зможеш…</h2>
    <ul class="p2clist">
      <li>Скласти портфоліо з 4 production-ready проектів на GitHub</li>
      <li>Пройти технічне інтерв'ю на позицію Junior Full Stack Developer</li>
      <li>Брати фриланс замовлення і заробляти перші гроші в IT</li>
      <li>Самостійно розгортати застосунки на хмарних серверах</li>
    </ul>
  </div>
</div>`,

    ru: `<style>
.p2w{--acc:#7c3aed;font-family:inherit;max-width:840px;margin:0 auto;padding:20px 16px;}
.p2stats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px;justify-content:center;}
.p2stat{background:#ede9fe;border:1px solid #c4b5fd;border-radius:12px;padding:14px 22px;text-align:center;flex:1 1 130px;}
.p2sn{font-size:26px;font-weight:800;color:var(--acc);display:block;}
.p2sl{font-size:12px;color:#374151;}
.p2mods{background:#f5f3ff;border:1px solid #ddd6fe;border-radius:16px;padding:20px 22px;margin-bottom:20px;}
.p2mods h2{color:var(--acc);font-size:18px;font-weight:700;margin:0 0 14px;}
.p2list{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:8px;list-style:none;padding:0;margin:0;}
.p2li{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;background:#ede9fe;border:1px solid #c4b5fd;line-height:1.4;}
.p2num{font-size:11px;font-weight:700;background:var(--acc);color:#fff;border-radius:6px;padding:2px 7px;flex-shrink:0;}
.p2ic{font-size:17px;flex-shrink:0;}
.p2li b{color:#5b21b6;font-size:13px;}
.p2li span{color:#374151;font-size:12px;}
.p2projs{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:20px;}
.p2proj{border-radius:14px;padding:18px 16px;background:#ede9fe;border:1px solid #c4b5fd;transition:transform .2s,box-shadow .2s;cursor:default;}
.p2proj:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(124,58,237,.18);}
.p2pe{font-size:30px;display:block;margin-bottom:10px;}
.p2proj h3{font-size:14px;font-weight:700;color:#5b21b6;margin:0 0 4px;}
.p2proj p{font-size:12px;color:#374151;margin:0 0 7px;line-height:1.4;}
.p2tech{font-size:11px;color:#6d28d9;font-weight:600;}
.p2career{background:linear-gradient(135deg,#3b0764,#5b21b6);border-radius:16px;padding:24px 24px;color:#fff;}
.p2career h2{font-size:17px;font-weight:700;margin:0 0 14px;color:#e9d5ff;}
.p2clist{list-style:none;padding:0;margin:0;display:grid;gap:9px;}
.p2clist li{display:flex;align-items:flex-start;gap:10px;font-size:14px;line-height:1.5;color:#fff;}
.p2clist li::before{content:'✓';color:#a78bfa;font-weight:700;flex-shrink:0;margin-top:2px;}
</style>
<div class="p2w">
  <div class="p2stats">
    <div class="p2stat"><span class="p2sn">12</span><span class="p2sl">модулей</span></div>
    <div class="p2stat"><span class="p2sn">170</span><span class="p2sl">уроков</span></div>
    <div class="p2stat"><span class="p2sn">4</span><span class="p2sl">production-ready проекта</span></div>
  </div>

  <div class="p2mods">
    <h2>📋 12 модулей — полный путь</h2>
    <ul class="p2list">
      <li class="p2li"><span class="p2num">01</span><span class="p2ic">⚡</span><div><b>JS Pro</b> <span>— замыкания, прототипы, паттерны проектирования</span></div></li>
      <li class="p2li"><span class="p2num">02</span><span class="p2ic">🔷</span><div><b>TypeScript</b> <span>— типизация, интерфейсы, generics</span></div></li>
      <li class="p2li"><span class="p2num">03</span><span class="p2ic">⚛️</span><div><b>React</b> <span>— компоненты, состояние, хуки, JSX</span></div></li>
      <li class="p2li"><span class="p2num">04</span><span class="p2ic">🚀</span><div><b>React Advanced</b> <span>— Context, Redux, роутинг, оптимизация</span></div></li>
      <li class="p2li"><span class="p2num">05</span><span class="p2ic">🟩</span><div><b>Node.js</b> <span>— сервер, REST API, Express, middleware</span></div></li>
      <li class="p2li"><span class="p2num">06</span><span class="p2ic">🐍</span><div><b>Python Flask</b> <span>— микрофреймворк, маршруты, шаблоны</span></div></li>
      <li class="p2li"><span class="p2num">07</span><span class="p2ic">🦄</span><div><b>Django+DRF</b> <span>— полный фреймворк, ORM, REST</span></div></li>
      <li class="p2li"><span class="p2num">08</span><span class="p2ic">🗄️</span><div><b>Databases</b> <span>— PostgreSQL, SQL запросы, Redis, миграции</span></div></li>
      <li class="p2li"><span class="p2num">09</span><span class="p2ic">💪</span><div><b>Gym Tracker</b> <span>— Проект: трекер тренировок (React + Node.js)</span></div></li>
      <li class="p2li"><span class="p2num">10</span><span class="p2ic">🎓</span><div><b>Учебная платформа</b> <span>— Проект: учебный сайт (React + Django)</span></div></li>
      <li class="p2li"><span class="p2num">11</span><span class="p2ic">🛒</span><div><b>E-commerce</b> <span>— Проект: интернет-магазин (full stack)</span></div></li>
      <li class="p2li"><span class="p2num">12</span><span class="p2ic">🐳</span><div><b>DevOps</b> <span>— Docker, CI/CD, GitHub Actions, деплой</span></div></li>
    </ul>
  </div>

  <div class="p2projs">
    <div class="p2proj">
      <span class="p2pe">💪</span>
      <h3>Gym Tracker</h3>
      <p>Трекер тренировок с прогрессом и статистикой</p>
      <span class="p2tech">React + Node.js + PostgreSQL</span>
    </div>
    <div class="p2proj">
      <span class="p2pe">🎓</span>
      <h3>Learning Platform</h3>
      <p>Учебная платформа с курсами и уроками</p>
      <span class="p2tech">React + Django + DRF</span>
    </div>
    <div class="p2proj">
      <span class="p2pe">🛒</span>
      <h3>E-commerce</h3>
      <p>Интернет-магазин с корзиной и оплатой</p>
      <span class="p2tech">React + Node.js + PostgreSQL</span>
    </div>
    <div class="p2proj">
      <span class="p2pe">🐳</span>
      <h3>DevOps Pipeline</h3>
      <p>Автоматический деплой с GitHub Actions</p>
      <span class="p2tech">Docker + GitHub Actions</span>
    </div>
  </div>

  <div class="p2career">
    <h2>🏆 После курса ты сможешь…</h2>
    <ul class="p2clist">
      <li>Собрать портфолио из 4 production-ready проектов на GitHub</li>
      <li>Пройти техническое интервью на позицию Junior Full Stack Developer</li>
      <li>Брать фриланс заказы и зарабатывать первые деньги в IT</li>
      <li>Самостоятельно разворачивать приложения на облачных серверах</li>
    </ul>
  </div>
</div>`
  });
})();
