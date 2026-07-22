/* ═══ Модуль 00 — Старт · 8-11 Веб-Старт ═══ */
(function () {
  'use strict';
  function patch(id, theory) {
    var l = WEB_LESSONS.find(function(x){ return x.id === id; });
    if (!l) return;
    l.theory = theory;
  }

  /* ── 00-01 Ласкаво просимо / Добро пожаловать ── */
  patch('00-01', {
    uk: `<style>
.k1w{--acc:#059669;font-family:inherit;max-width:820px;margin:0 auto;padding:20px 16px;}
@keyframes k1fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.k1hero{background:linear-gradient(135deg,#047857 0%,#059669 55%,#10b981 100%);border-radius:22px;padding:40px 28px 36px;text-align:center;color:#fff;margin-bottom:20px;position:relative;overflow:hidden;}
.k1hero::after{content:'';position:absolute;width:220px;height:220px;background:rgba(255,255,255,.07);border-radius:50%;right:-60px;bottom:-70px;pointer-events:none;}
.k1em{font-size:62px;display:block;margin-bottom:14px;animation:k1fl 2.2s ease-in-out infinite;}
.k1hero h1{font-size:clamp(19px,4.5vw,33px);font-weight:900;margin:0 0 12px;line-height:1.25;}
.k1hero p{font-size:clamp(13px,2.5vw,16px);margin:0 auto;color:rgba(255,255,255,.92);max-width:520px;}
.k1card{background:#f0fdf4;border:1px solid #a7f3d0;border-radius:16px;padding:22px 24px;margin-bottom:18px;}
.k1card>h2{color:var(--acc);font-size:19px;font-weight:700;margin:0 0 12px;}
.k1sub{font-size:13.5px;color:#64748b;margin:0 0 14px;}
.k1trio{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:12px;}
.k1tri{border-radius:14px;padding:20px 14px;text-align:center;background:#d1fae5;border:1px solid #6ee7b7;transition:transform .2s,box-shadow .2s;cursor:default;}
.k1tri:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(5,150,105,.18);}
.k1ti{font-size:38px;display:block;margin-bottom:10px;}
.k1tri b{display:block;color:#065f46;font-size:15px;font-weight:700;margin-bottom:5px;}
.k1tri span{font-size:13px;color:#374151;line-height:1.4;}
.k1ul{list-style:none;padding:0;margin:0;display:grid;gap:10px;}
.k1ul li{display:flex;align-items:flex-start;gap:10px;font-size:15px;line-height:1.5;color:#1e293b;}
.k1ul li::before{content:'✅';flex-shrink:0;font-size:17px;margin-top:1px;}
.k1cta{background:linear-gradient(135deg,#059669,#10b981);border-radius:18px;padding:34px 28px;text-align:center;color:#fff;}
.k1cta h2{font-size:clamp(18px,3.5vw,26px);margin:0 0 8px;font-weight:800;}
.k1cta p{margin:0 0 18px;color:rgba(255,255,255,.92);font-size:15px;}
.k1btn{display:inline-block;background:#fff;color:#047857;font-weight:900;font-size:17px;padding:13px 38px;border-radius:50px;box-shadow:0 4px 20px rgba(0,0,0,.15);}
</style>
<div class="k1w">
  <div class="k1hero">
    <span class="k1em">🎉</span>
    <h1>Привіт! Ти тут, щоб стати веб-розробником! 🚀</h1>
    <p>Ласкаво просимо до Веб-Старт — твого першого кроку у світ коду!</p>
  </div>

  <div class="k1card">
    <h2>🌐 Що таке веб?</h2>
    <p class="k1sub">Кожен сайт у браузері зроблений із трьох речей. Уяви живу людину:</p>
    <div class="k1trio">
      <div class="k1tri">
        <span class="k1ti">🦴</span>
        <b>HTML</b>
        <span>Кістяк — структура: текст, картинки, кнопки</span>
      </div>
      <div class="k1tri">
        <span class="k1ti">👗</span>
        <b>CSS</b>
        <span>Одяг — кольори, шрифти, краса сторінки</span>
      </div>
      <div class="k1tri">
        <span class="k1ti">🕺</span>
        <b>JavaScript</b>
        <span>Рухи — анімації, ігри, кнопки що реагують</span>
      </div>
    </div>
  </div>

  <div class="k1card">
    <h2>😎 Що ти вже вмієш?</h2>
    <ul class="k1ul">
      <li>Вмієш користуватися браузером та заходити на сайти</li>
      <li>Вмієш набирати текст на клавіатурі</li>
      <li>Маєш бажання навчитися — це найголовніше!</li>
      <li>Нічого більше не потрібно — починаємо з нуля 🎯</li>
    </ul>
  </div>

  <div class="k1cta">
    <h2>Готовий розпочати? 🎉</h2>
    <p>Тисни на наступний урок — і твій перший рядок коду вже чекає!</p>
    <span class="k1btn">Починаємо! →</span>
  </div>
</div>`,

    ru: `<style>
.k1w{--acc:#059669;font-family:inherit;max-width:820px;margin:0 auto;padding:20px 16px;}
@keyframes k1fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.k1hero{background:linear-gradient(135deg,#047857 0%,#059669 55%,#10b981 100%);border-radius:22px;padding:40px 28px 36px;text-align:center;color:#fff;margin-bottom:20px;position:relative;overflow:hidden;}
.k1hero::after{content:'';position:absolute;width:220px;height:220px;background:rgba(255,255,255,.07);border-radius:50%;right:-60px;bottom:-70px;pointer-events:none;}
.k1em{font-size:62px;display:block;margin-bottom:14px;animation:k1fl 2.2s ease-in-out infinite;}
.k1hero h1{font-size:clamp(19px,4.5vw,33px);font-weight:900;margin:0 0 12px;line-height:1.25;}
.k1hero p{font-size:clamp(13px,2.5vw,16px);margin:0 auto;color:rgba(255,255,255,.92);max-width:520px;}
.k1card{background:#f0fdf4;border:1px solid #a7f3d0;border-radius:16px;padding:22px 24px;margin-bottom:18px;}
.k1card>h2{color:var(--acc);font-size:19px;font-weight:700;margin:0 0 12px;}
.k1sub{font-size:13.5px;color:#64748b;margin:0 0 14px;}
.k1trio{display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:12px;}
.k1tri{border-radius:14px;padding:20px 14px;text-align:center;background:#d1fae5;border:1px solid #6ee7b7;transition:transform .2s,box-shadow .2s;cursor:default;}
.k1tri:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(5,150,105,.18);}
.k1ti{font-size:38px;display:block;margin-bottom:10px;}
.k1tri b{display:block;color:#065f46;font-size:15px;font-weight:700;margin-bottom:5px;}
.k1tri span{font-size:13px;color:#374151;line-height:1.4;}
.k1ul{list-style:none;padding:0;margin:0;display:grid;gap:10px;}
.k1ul li{display:flex;align-items:flex-start;gap:10px;font-size:15px;line-height:1.5;color:#1e293b;}
.k1ul li::before{content:'✅';flex-shrink:0;font-size:17px;margin-top:1px;}
.k1cta{background:linear-gradient(135deg,#059669,#10b981);border-radius:18px;padding:34px 28px;text-align:center;color:#fff;}
.k1cta h2{font-size:clamp(18px,3.5vw,26px);margin:0 0 8px;font-weight:800;}
.k1cta p{margin:0 0 18px;color:rgba(255,255,255,.92);font-size:15px;}
.k1btn{display:inline-block;background:#fff;color:#047857;font-weight:900;font-size:17px;padding:13px 38px;border-radius:50px;box-shadow:0 4px 20px rgba(0,0,0,.15);}
</style>
<div class="k1w">
  <div class="k1hero">
    <span class="k1em">🎉</span>
    <h1>Привет! Ты здесь, чтобы стать веб-разработчиком! 🚀</h1>
    <p>Добро пожаловать в Веб-Старт — твой первый шаг в мир кода!</p>
  </div>

  <div class="k1card">
    <h2>🌐 Что такое веб?</h2>
    <p class="k1sub">Каждый сайт в браузере состоит из трёх вещей. Представь живого человека:</p>
    <div class="k1trio">
      <div class="k1tri">
        <span class="k1ti">🦴</span>
        <b>HTML</b>
        <span>Скелет — структура: текст, картинки, кнопки</span>
      </div>
      <div class="k1tri">
        <span class="k1ti">👗</span>
        <b>CSS</b>
        <span>Одежда — цвета, шрифты, красота страницы</span>
      </div>
      <div class="k1tri">
        <span class="k1ti">🕺</span>
        <b>JavaScript</b>
        <span>Движения — анимации, игры, кнопки что реагируют</span>
      </div>
    </div>
  </div>

  <div class="k1card">
    <h2>😎 Что ты уже умеешь?</h2>
    <ul class="k1ul">
      <li>Умеешь пользоваться браузером и заходить на сайты</li>
      <li>Умеешь набирать текст на клавиатуре</li>
      <li>Хочешь научиться — это самое главное!</li>
      <li>Ничего больше не нужно — начинаем с нуля 🎯</li>
    </ul>
  </div>

  <div class="k1cta">
    <h2>Готов начать? 🎉</h2>
    <p>Нажми на следующий урок — и твоя первая строчка кода уже ждёт!</p>
    <span class="k1btn">Начинаем! →</span>
  </div>
</div>`
  });

  /* ── 00-02 Що ти побудуєш / Что ты построишь ── */
  patch('00-02', {
    uk: `<style>
.k2w{--acc:#059669;font-family:inherit;max-width:820px;margin:0 auto;padding:20px 16px;}
.k2head{text-align:center;margin-bottom:22px;}
.k2head h1{font-size:clamp(19px,4vw,30px);font-weight:900;color:var(--acc);margin:0 0 6px;}
.k2head p{font-size:14px;color:#64748b;margin:0;}
.k2projs{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:22px;}
.k2proj{border-radius:16px;padding:24px 20px;background:#d1fae5;border:1px solid #6ee7b7;transition:transform .2s,box-shadow .2s;cursor:default;}
.k2proj:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(5,150,105,.18);}
.k2pe{font-size:44px;display:block;margin-bottom:12px;}
.k2proj h3{font-size:17px;font-weight:700;color:#065f46;margin:0 0 7px;}
.k2proj p{font-size:13px;color:#374151;margin:0;line-height:1.45;}
.k2road{background:#f0fdf4;border:1px solid #a7f3d0;border-radius:16px;padding:22px 24px;margin-bottom:20px;}
.k2road h2{font-size:18px;font-weight:700;color:var(--acc);margin:0 0 14px;}
.k2pills{display:flex;flex-wrap:wrap;gap:8px;}
.k2pill{display:inline-flex;align-items:center;gap:5px;background:#d1fae5;border:1px solid #6ee7b7;color:#047857;border-radius:20px;padding:5px 12px;font-size:12px;font-weight:600;}
.k2pn{background:var(--acc);color:#fff;border-radius:10px;padding:1px 6px;font-size:10px;font-weight:700;}
.k2close{background:linear-gradient(135deg,#047857,#10b981);border-radius:16px;padding:28px 24px;text-align:center;color:#fff;}
.k2close h2{font-size:clamp(18px,3vw,24px);font-weight:800;margin:0 0 8px;}
.k2close p{font-size:14px;color:rgba(255,255,255,.9);margin:0;}
</style>
<div class="k2w">
  <div class="k2head">
    <h1>🏆 За цей курс ти побудуєш 3 справжніх сайти!</h1>
    <p>Кожен проект — реальний сайт, яким можна пишатися</p>
  </div>

  <div class="k2projs">
    <div class="k2proj">
      <span class="k2pe">🎭</span>
      <h3>Портфоліо-сайт</h3>
      <p>Розкажи всьому світу про себе — твоя перша справжня сторінка в інтернеті</p>
    </div>
    <div class="k2proj">
      <span class="k2pe">🎮</span>
      <h3>Ігровий сайт</h3>
      <p>Справжня браузерна гра «Камінь-Ножиці-Папір» — і ти сам її запрограмуєш!</p>
    </div>
    <div class="k2proj">
      <span class="k2pe">💼</span>
      <h3>Фінальне Портфоліо</h3>
      <p>Твій перший реальний сайт для CV — покажи, на що ти здатен!</p>
    </div>
  </div>

  <div class="k2road">
    <h2>🗺️ Твій шлях: 12 модулів</h2>
    <div class="k2pills">
      <span class="k2pill"><span class="k2pn">01</span>HTML</span>
      <span class="k2pill"><span class="k2pn">02</span>CSS Стилі</span>
      <span class="k2pill"><span class="k2pn">03</span>Інтерактивність</span>
      <span class="k2pill"><span class="k2pn">04</span>Flexbox</span>
      <span class="k2pill"><span class="k2pn">05</span>CSS Grid</span>
      <span class="k2pill"><span class="k2pn">06</span>Анімації</span>
      <span class="k2pill"><span class="k2pn">07</span>Портфоліо 🎭</span>
      <span class="k2pill"><span class="k2pn">08</span>JavaScript</span>
      <span class="k2pill"><span class="k2pn">09</span>DOM</span>
      <span class="k2pill"><span class="k2pn">10</span>Адаптивність</span>
      <span class="k2pill"><span class="k2pn">11</span>Ігровий сайт 🎮</span>
      <span class="k2pill"><span class="k2pn">12</span>Фінал 💼</span>
    </div>
  </div>

  <div class="k2close">
    <h2>Готовий? Тисни → і вперед! 🚀</h2>
    <p>Кожен урок — один маленький крок до великих умінь!</p>
  </div>
</div>`,

    ru: `<style>
.k2w{--acc:#059669;font-family:inherit;max-width:820px;margin:0 auto;padding:20px 16px;}
.k2head{text-align:center;margin-bottom:22px;}
.k2head h1{font-size:clamp(19px,4vw,30px);font-weight:900;color:var(--acc);margin:0 0 6px;}
.k2head p{font-size:14px;color:#64748b;margin:0;}
.k2projs{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-bottom:22px;}
.k2proj{border-radius:16px;padding:24px 20px;background:#d1fae5;border:1px solid #6ee7b7;transition:transform .2s,box-shadow .2s;cursor:default;}
.k2proj:hover{transform:translateY(-5px);box-shadow:0 10px 30px rgba(5,150,105,.18);}
.k2pe{font-size:44px;display:block;margin-bottom:12px;}
.k2proj h3{font-size:17px;font-weight:700;color:#065f46;margin:0 0 7px;}
.k2proj p{font-size:13px;color:#374151;margin:0;line-height:1.45;}
.k2road{background:#f0fdf4;border:1px solid #a7f3d0;border-radius:16px;padding:22px 24px;margin-bottom:20px;}
.k2road h2{font-size:18px;font-weight:700;color:var(--acc);margin:0 0 14px;}
.k2pills{display:flex;flex-wrap:wrap;gap:8px;}
.k2pill{display:inline-flex;align-items:center;gap:5px;background:#d1fae5;border:1px solid #6ee7b7;color:#047857;border-radius:20px;padding:5px 12px;font-size:12px;font-weight:600;}
.k2pn{background:var(--acc);color:#fff;border-radius:10px;padding:1px 6px;font-size:10px;font-weight:700;}
.k2close{background:linear-gradient(135deg,#047857,#10b981);border-radius:16px;padding:28px 24px;text-align:center;color:#fff;}
.k2close h2{font-size:clamp(18px,3vw,24px);font-weight:800;margin:0 0 8px;}
.k2close p{font-size:14px;color:rgba(255,255,255,.9);margin:0;}
</style>
<div class="k2w">
  <div class="k2head">
    <h1>🏆 За этот курс ты построишь 3 настоящих сайта!</h1>
    <p>Каждый проект — реальный сайт, которым можно гордиться</p>
  </div>

  <div class="k2projs">
    <div class="k2proj">
      <span class="k2pe">🎭</span>
      <h3>Сайт-портфолио</h3>
      <p>Расскажи всему миру о себе — твоя первая настоящая страница в интернете</p>
    </div>
    <div class="k2proj">
      <span class="k2pe">🎮</span>
      <h3>Игровой сайт</h3>
      <p>Настоящая браузерная игра «Камень-Ножницы-Бумага» — и ты сам её запрограммируешь!</p>
    </div>
    <div class="k2proj">
      <span class="k2pe">💼</span>
      <h3>Финальное Портфолио</h3>
      <p>Твой первый реальный сайт для резюме — покажи, на что ты способен!</p>
    </div>
  </div>

  <div class="k2road">
    <h2>🗺️ Твой путь: 12 модулей</h2>
    <div class="k2pills">
      <span class="k2pill"><span class="k2pn">01</span>HTML</span>
      <span class="k2pill"><span class="k2pn">02</span>CSS Стили</span>
      <span class="k2pill"><span class="k2pn">03</span>Интерактивность</span>
      <span class="k2pill"><span class="k2pn">04</span>Flexbox</span>
      <span class="k2pill"><span class="k2pn">05</span>CSS Grid</span>
      <span class="k2pill"><span class="k2pn">06</span>Анимации</span>
      <span class="k2pill"><span class="k2pn">07</span>Портфолио 🎭</span>
      <span class="k2pill"><span class="k2pn">08</span>JavaScript</span>
      <span class="k2pill"><span class="k2pn">09</span>DOM</span>
      <span class="k2pill"><span class="k2pn">10</span>Адаптивность</span>
      <span class="k2pill"><span class="k2pn">11</span>Игровой сайт 🎮</span>
      <span class="k2pill"><span class="k2pn">12</span>Финал 💼</span>
    </div>
  </div>

  <div class="k2close">
    <h2>Готов? Жми → и вперёд! 🚀</h2>
    <p>Каждый урок — один маленький шаг к большим умениям!</p>
  </div>
</div>`
  });
})();
