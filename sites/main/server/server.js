/**
 * MY COMPUTER ACADEMY — Express Server (production-ready)
 *
 * Endpoints:
 *   POST   /api/leads        — save lead from form
 *   GET    /api/leads        — list leads (ADMIN_TOKEN required)
 *   GET    /api/leads/stats  — stats (ADMIN_TOKEN required)
 *   PATCH  /api/leads/:id    — update status/notes
 *   DELETE /api/leads/:id    — delete lead
 *
 * Start: npm start
 * Dev:   npm run dev
 */

'use strict';

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const rateLimit    = require('express-rate-limit');
const path         = require('path');
const fs           = require('fs');
const db             = require('./database');
const adminsDb       = require('./admins');
const clientsDb      = require('./clients');
const paymentsDb     = require('./payments');
const attendanceDb   = require('./attendance');
const monthlyPayDb   = require('./monthly-payments');
const coursesDb      = require('./courses');
const articlesDb     = require('./articles');
const CURRICULA      = require('./curricula');
const reviewsDb      = require('./reviews');
const {
  ARTICLES_RU, COURSES_RU, COURSE_SEO_TITLES_RU, COURSE_SEO_DESCS_RU,
  COURSE_SEO_TEXTS_RU, CURRICULA_RU, DOCS_SEO_RU, ARTICLES_INDEX_RU,
} = require('./content-ru');
const { sendLeadNotification, sendPaymentNotification } = require('./mailer');
const monoPay        = require('./mono-pay');
const monoInvoicesDb = require('./mono-invoices');
const wfp            = require('./wayforpay');

const CONTENT_FILE = path.join(__dirname, '..', 'data', 'content.json');

// ── CONTENT SEED DATA ─────────────────────────────────────────────────────────
const CONTENT_SEED = {
  pricing: [
    {
      featured: false,
      badge:    { ua: 'ДЛЯ СТАРТУ',  ru: 'ДЛЯ СТАРТА' },
      title:    { ua: 'Одинарні дитячі групи', ru: 'Одинарные детские группы' },
      features: [
        { ua: '9–18 місяців, один раз на тиждень, 90 хв', ru: '9–18 месяцев, один раз в неделю, 90 мин' },
        { ua: 'Доступ до матеріалів назавжди',            ru: 'Доступ к материалам навсегда' },
        { ua: 'Мала група до 5 дітей',                    ru: 'Малая группа до 5 детей' },
      ],
      price: '1 800', oldPrice: null,
      priceUnit: { ua: 'грн/міс', ru: 'грн/мес' },
    },
    {
      featured: true,
      badge:    { ua: 'ОПТИМАЛЬНИЙ', ru: 'ОПТИМАЛЬНЫЙ' },
      title:    { ua: 'Подвійні групи та інд. навчання', ru: 'Двойные группы и инд. обучение' },
      features: [
        { ua: '9–18 місяців, два рази на тиждень, по 90 хв', ru: '9–18 месяцев, два раза в неделю, по 90 минут' },
        { ua: 'Мала група до 5 дітей',                       ru: 'Малая группа до 5 детей' },
        { ua: 'Доступ до матеріалів назавжди',               ru: 'Доступ к материалам навсегда' },
      ],
      price: '3 600', oldPrice: null,
      priceUnit: { ua: 'грн/міс', ru: 'грн/мес' },
    },
    {
      featured: false,
      badge:    { ua: 'ДЛЯ ДОРОСЛИХ', ru: 'ДЛЯ ВЗРОСЛЫХ' },
      title:    { ua: 'Індивідуальний дорослий курс', ru: 'Индивидуальный взрослый курс' },
      features: [
        { ua: 'Індивідуально 2–3 рази на тиждень',    ru: 'Индивидуально 2–3 раза в неделю' },
        { ua: 'Доступ до матеріалів курсу назавжди',  ru: 'Доступ к материалам курса навсегда' },
        { ua: 'Від півтора до восьми місяців',        ru: 'От полутора до восьми месяцев' },
      ],
      price: '9 450', oldPrice: '12 000',
      priceUnit: { ua: 'грн/курс', ru: 'грн/курс' },
    },
  ],
  seo: {
    pages: [
      {
        id: 'main',
        label: 'Головна сторінка (mycomputer.education)',
        heading: 'Школа програмування для дітей у Дніпрі — My Computer Academy',
        text: 'My Computer Academy — це онлайн та офлайн школа програмування для дітей від 6 до 18 років у Дніпрі. Scratch, Python, Roblox Studio, Веб-розробка HTML CSS JS. Перший пробний урок безкоштовно.',
      },
    ],
  },
  faq: [
    { id:1, question:{ ua:'З якого віку можна починати?',       ru:'С какого возраста можно начинать?' },       answer:{ ua:'Приймаємо дітей від 6 років. Для малюків — Scratch, для дітей старшого віку — Python, Roblox, Web розробка. Конкретний курс підберемо на безкоштовній консультації.', ru:'Принимаем детей от 6 лет. Для малышей — Scratch, для детей постарше — Python, Roblox, Web разработка. Конкретный курс подберём на бесплатной консультации.' } },
    { id:2, question:{ ua:'Чи потрібні знання програмування?',  ru:'Нужны ли знания программирования?' },        answer:{ ua:'Абсолютно ніяких. Всі курси починаються з нуля. Потрібен тільки комп\'ютер з інтернетом.', ru:'Абсолютно никаких. Все курсы начинаются с нуля. Нужен только компьютер с интернетом.' } },
    { id:3, question:{ ua:'Як проходять онлайн-заняття?',       ru:'Как проходят онлайн-занятия?' },             answer:{ ua:'Заняття у Zoom або Google Meet. Викладач бачить екран дитини, допомагає в реальному часі. Групи до 5 осіб — кожен отримує увагу.', ru:'Занятия в Zoom или Google Meet. Преподаватель видит экран ребёнка, помогает в реальном времени. Группы до 5 человек — каждый получает внимание.' } },
    { id:4, question:{ ua:'Що якщо дитина пропустить заняття?', ru:'Что если ребёнок пропустит занятие?' },      answer:{ ua:'Всі заняття записуються. Пропущений урок можна відпрацювати у інший день, а викладач відповість на питання в чаті.', ru:'Все занятия записываются. Пропущенный урок можно отработать в другой день, а преподаватель ответит на вопросы в чате.' } },
    { id:5, question:{ ua:'Скільки коштують курси?',            ru:'Сколько стоят курсы?' },                     answer:{ ua:'Вартість залежить від курсу та формату. Залиш заявку — менеджер надішле прайс та розповість про знижки. Перший урок безкоштовно.', ru:'Стоимость зависит от курса и формата. Оставьте заявку — менеджер пришлёт прайс и расскажет о скидках. Первый урок бесплатно.' } },
    { id:6, question:{ ua:'Скільки тривають курси?',            ru:'Сколько длятся курсы?' },                    answer:{ ua:'Дитячі курси тривають 9–18 місяців при 1–2 заняттях на тиждень. Конкретна тривалість залежить від напрямку та навантаження.', ru:'Детские курсы длятся 9–18 месяцев при 1–2 занятиях в неделю. Конкретная длительность зависит от направления и нагрузки.' } },
    { id:7, question:{ ua:'Які є варіанти оплати?',             ru:'Какие есть варианты оплаты?' },              answer:{ ua:'Ви можете скористатись прямою оплатою на рахунок ФОП, оплатою через Google Pay, Apple Pay, переказом через платіжний шлюз. Якщо ви за кордоном — розрахуємо вартість у зручній валюті.', ru:'Вы можете воспользоваться прямой оплатой на счет ФЛП, оплатой через Google Pay, Apple Pay, переводом через платежный шлюз. Если вы за границей – рассчитаем стоимость в удобной валюте.' } },
  ],
};

// ── COURSE SEED DATA ──────────────────────────────────────────────────────────
const COURSE_SEED = [
  { id: 'scratch',   name: 'Scratch: візуальне програмування',  emoji: '🧩', age: '6–10 років',  age_group: '6-10',  duration: '3 місяці',  lessonsCount: 24, groupSize: 5, price: 3600, color: '#f59e0b', popular: false,
    description: 'Перший крок у програмування через гру. Діти створюють анімації, інтерактивні історії та прості ігри за допомогою блочного коду.',
    features: [{ua:'✓ Створення персонажів і сцен',     ru:'✓ Создание персонажей и сцен'},{ua:'✓ Логіка та алгоритми через гру',  ru:'✓ Логика и алгоритмы через игру'},{ua:'✓ Власна гра у фіналі курсу',      ru:'✓ Собственная игра в финале курса'}] },
  { id: 'graphic',   name: 'Графіка та анімація',               emoji: '🎨', age: '6–12 років',  age_group: '6-10',  duration: '3 місяці',  lessonsCount: 24, groupSize: 5, price: 3600, color: '#ec4899', popular: false,
    description: 'Цифровий малюнок, анімація персонажів та основи дизайну. Курс для тих, хто хоче поєднати творчість і технології.',
    features: [{ua:'✓ Цифровий малюнок та кольорознавство', ru:'✓ Цифровой рисунок и цветоведение'},{ua:'✓ Анімація кадр за кадром',            ru:'✓ Анимация кадр за кадром'},{ua:'✓ Власний анімований проєкт у фіналі', ru:'✓ Собственный анимированный проект в финале'}] },
  { id: 'pc',        name: 'Базовий курс роботи з ПК',          emoji: '💻', age: '6–10 років',  age_group: '6-10',  duration: '2 місяці',  lessonsCount: 16, groupSize: 5, price: 3600, color: '#64748b', popular: false,
    description: 'Перший крок у світ комп\'ютерів. Діти освоюють клавіатуру, мишу, файлову систему, текстові редактори та безпечний інтернет.',
    features: [{ua:'✓ Швидкий набір тексту (сліпий метод)', ru:'✓ Быстрый набор текста (слепой метод)'},{ua:'✓ Word, Paint, базові програми',         ru:'✓ Word, Paint, базовые программы'},{ua:'✓ Безпека в інтернеті',                  ru:'✓ Безопасность в интернете'}] },
  { id: 'python',    name: 'Python: справжнє програмування',    emoji: '🐍', age: '10–14 років', age_group: '10-14', duration: '4 місяці',  lessonsCount: 32, groupSize: 5, price: 3600, color: '#3b82f6', popular: true,
    description: 'Один з найпопулярніших мов у світі. Діти пишуть реальний код: ігри, боти, автоматизацію — і починають думати як розробники.',
    features: [{ua:'✓ Змінні, функції, цикли',          ru:'✓ Переменные, функции, циклы'},{ua:'✓ Pygame — розробка ігор',           ru:'✓ Pygame — разработка игр'},{ua:'✓ Telegram-бот у фіналі курсу',     ru:'✓ Telegram-бот в финале курса'}] },
  { id: 'roblox',    name: 'Roblox: розробка ігор',             emoji: '🎮', age: '9–14 років',  age_group: '10-14', duration: '3 місяці',  lessonsCount: 24, groupSize: 5, price: 3600, color: '#ef4444', popular: false,
    description: 'Любиш Roblox? Навчись його створювати! Діти вивчають Lua, будують власні світи та публікують ігри для мільйонів гравців.',
    features: [{ua:'✓ Lua — мова для Roblox Studio',    ru:'✓ Lua — язык для Roblox Studio'},{ua:'✓ 3D-дизайн та фізика ігор',         ru:'✓ 3D-дизайн и физика игр'},{ua:'✓ Публікація гри в Roblox',          ru:'✓ Публикация игры в Roblox'}] },
  { id: 'minecraft', name: 'Minecraft: програмування в грі',    emoji: '⛏️', age: '9–14 років',  age_group: '10-14', duration: '3 місяці',  lessonsCount: 24, groupSize: 5, price: 3600, color: '#22c55e', popular: false,
    description: 'Любиш будувати в Minecraft? Навчись створювати моди та міні-ігри! Діти вивчають Python та логіку програмування через улюблену гру.',
    features: [{ua:'✓ Python для Minecraft (mcpi)',      ru:'✓ Python для Minecraft (mcpi)'},{ua:'✓ Автоматизація будівництва',         ru:'✓ Автоматизация строительства'},{ua:'✓ Власний мод у фіналі курсу',       ru:'✓ Собственный мод в финале'}] },
  { id: 'construct', name: 'Construct: розробка ігор без коду', emoji: '🕹️', age: '10–14 років', age_group: '10-14', duration: '3 місяці',  lessonsCount: 24, groupSize: 5, price: 3600, color: '#8b5cf6', popular: false,
    description: 'Створюй справжні ігри без програмування. Construct дозволяє зробити платформер, стрілялку або аркаду — і одразу опублікувати в інтернеті.',
    features: [{ua:'✓ Ігрова логіка через події та дії', ru:'✓ Игровая логика через события и действия'},{ua:'✓ Фізика, анімація, звукові ефекти',  ru:'✓ Физика, анимация, звуковые эффекты'},{ua:'✓ Публікація гри онлайн у фіналі',   ru:'✓ Публикация игры онлайн в финале'}] },
  { id: 'web',       name: 'Розробка сайтів: HTML, CSS, JS',    emoji: '🌐', age: '12–16 років', age_group: '14-18', duration: '5 місяців', lessonsCount: 40, groupSize: 5, price: 3600, color: '#6c47ff', popular: false,
    description: 'Створюй сайти з нуля. Від першої сторінки до повноцінного адаптивного проекту — все покроково з реальними задачами.',
    features: [{ua:'✓ HTML5, CSS3, Flexbox/Grid',        ru:'✓ HTML5, CSS3, Flexbox/Grid'},{ua:'✓ JavaScript — інтерактивність',     ru:'✓ JavaScript — интерактивность'},{ua:'✓ Персональний сайт-портфоліо',      ru:'✓ Персональный сайт-портфолио'}] },
  { id: 'blog',      name: 'Створення блогу та сайту',          emoji: '✍️', age: '12–17 років', age_group: '14-18', duration: '2 місяці',  lessonsCount: 16, groupSize: 5, price: 3600, color: '#f97316', popular: false,
    description: 'Від ідеї до власного онлайн-простору. Учні створюють блог або портфоліо з нуля — без фреймворків, лише HTML, CSS і натхнення.',
    features: [{ua:'✓ Структура та дизайн сторінки',    ru:'✓ Структура и дизайн страницы'},{ua:'✓ Контент, SEO-основи, домен',        ru:'✓ Контент, SEO-основы, домен'},{ua:'✓ Публікація власного сайту',        ru:'✓ Публикация собственного сайта'}] },
];

// Merge RU name/description onto each seed entry (also used to patch existing live records)
COURSE_SEED.forEach(c => {
  const ru = COURSES_RU[c.id];
  if (ru) { c.name_ru = ru.name; c.description_ru = ru.description; }
});

// ── ARTICLES SEED ─────────────────────────────────────────────────────────────
const ARTICLES_SEED = [
  {
    slug: 'kursy-prohramuvannia-dlia-ditei',
    title: 'Курси програмування для дітей — як вибрати ІТ-школу і не помилитися',
    excerpt: 'Ви шукаєте курси програмування для дітей, але не знаєте з чого почати? Ось практичний гід: на що дивитися при виборі ІТ-школи, які питання ставити і яких помилок уникати.',
    category: 'поради батькам',
    coverEmoji: '💻',
    author: 'My Computer Academy',
    publishedAt: '2026-07-03',
    active: true,
    content: `<h2>Що шукають батьки, коли набирають "курси програмування для дітей"</h2>
<p>Кожен місяць тисячі батьків в Україні шукають ІТ-курси для своїх дітей. Хтось хоче дати дитині корисне хобі, хтось думає про майбутню професію, а хтось просто хоче, щоб дитина проводила час з користю, а не в TikTok. Запит один — "курси програмування для дітей" — але відповідей сотні. Як не загубитися?</p>

<h2>На що насправді звертати увагу</h2>
<h3>1. Розмір групи</h3>
<p>Найпоширеніша помилка — записати дитину в групу з 10–15 учнів, де викладач фізично не встигає перевірити кожного. У програмуванні дуже важливо, щоб вчитель бачив помилки в коді одразу. Оптимальна група — до 5 осіб. Саме так організовані заняття в My Computer Academy.</p>

<h3>2. Реальні проєкти, а не лише теорія</h3>
<p>Питайте у школи: що дитина зробить після закінчення курсу? Якщо відповідь розмита — це поганий знак. Дитина має виходити з курсу з конкретним результатом: власною грою, Telegram-ботом, сайтом або анімацією. Сертифікат без проєкту — це просто папірець.</p>

<h3>3. Вік і програма</h3>
<p>Не всі курси підходять для всіх вікових груп. Для дітей 6–9 років найкраще підходить Scratch — візуальне програмування через блоки. З 9–10 років можна переходити на Python, Roblox Studio або Minecraft Education. Веб-розробка та складніші мови — з 12 років. Гарна школа завжди проводить консультацію і допомагає обрати курс під конкретну дитину.</p>

<h3>4. Онлайн чи офлайн</h3>
<p>Обидва формати працюють, якщо школа серйозна. Онлайн — зручно, не треба їхати, можна займатись з будь-якого міста. Офлайн — дитина менше відволікається, є жива комунікація. В ідеалі — школа пропонує обидва варіанти і дозволяє переходити між ними.</p>

<h3>5. Пробний урок</h3>
<p>Будь-яка чесна школа пропонує перший пробний урок безкоштовно. Це можливість для дитини познайомитися з форматом, а для батьків — побачити, як поводиться викладач. Якщо пробного уроку немає — запитайте чому.</p>

<h2>Які курси програмування існують для дітей</h2>
<p>Сьогодні діти можуть навчатися програмуванню через різні напрямки:</p>
<ul>
  <li><strong>Scratch</strong> — ідеально для початку, 6–10 років. Блоки замість коду, анімації та прості ігри.</li>
  <li><strong>Python</strong> — одна з найпопулярніших мов у світі. Підходить дітям від 10 років.</li>
  <li><strong>Roblox Studio / Lua</strong> — розробка ігор для фанатів Roblox, 9–14 років.</li>
  <li><strong>Minecraft Education + Python</strong> — програмування через улюблену гру.</li>
  <li><strong>Веб-розробка (HTML, CSS, JS)</strong> — створення сайтів, від 12 років.</li>
  <li><strong>Construct 3</strong> — розробка ігор без коду, 10–14 років.</li>
  <li><strong>Цифрова графіка</strong> — для юних художників і дизайнерів, від 6 років.</li>
</ul>

<h2>Висновок</h2>
<p>Найкращі курси програмування для дітей — це ті, де дитина виходить із конкретним результатом, де є жива взаємодія з викладачем і де група невелика. Не гонитесь за низькою ціною — в програмуванні якість навчання напряму залежить від уваги, яку отримує кожен учень.</p>
<p>В <a href="/">My Computer Academy</a> ми проводимо безкоштовну консультацію і перший пробний урок — щоб ви могли впевнитись самостійно.</p>`,
  },
  {
    slug: 'scratch-python-chy-roblox',
    title: 'Scratch, Python чи Roblox — який курс підійде вашій дитині?',
    excerpt: 'Scratch, Python, Roblox, Minecraft — батьки часто губляться серед назв. Пояснюємо різницю між курсами програмування простою мовою, без технічного жаргону.',
    category: 'вибір курсу',
    coverEmoji: '🎮',
    author: 'My Computer Academy',
    publishedAt: '2026-07-03',
    active: true,
    content: `<h2>Чому дітям потрібні різні курси програмування</h2>
<p>Не існує одного "найкращого" курсу програмування для всіх дітей. Дитина в 7 років і підліток у 14 — це абсолютно різні учні з різними інтересами, здібностями і цілями. Гарна ІТ-школа не відправляє всіх на один і той самий курс — вона допомагає обрати правильний напрямок.</p>
<p>Ось практичне порівняння найпопулярніших курсів для дітей.</p>

<h2>Scratch — перший крок у програмування</h2>
<p><strong>Вік:</strong> 6–10 років · <strong>Складність:</strong> початковий рівень</p>
<p>Scratch — це візуальне середовище програмування від MIT, де замість написання коду дитина збирає блоки, як конструктор. Жодних синтаксичних помилок, жодного стресу. Дитина одразу бачить результат: персонаж рухається, відтворює звук, змінює костюм.</p>
<p>Scratch вчить головне — логіку та алгоритмічне мислення. Це фундамент, на якому пізніше будується Python, JavaScript та будь-яка інша мова.</p>
<p><strong>Підходить, якщо:</strong> дитина 6–9 років, ніколи не стикалась з програмуванням, любить малювання та анімацію.</p>

<h2>Python — справжнє програмування для дітей</h2>
<p><strong>Вік:</strong> 10–16 років · <strong>Складність:</strong> початковий–середній рівень</p>
<p>Python — одна з найпопулярніших мов програмування у світі. Нею користуються Google, Netflix, NASA. При цьому Python зчитується майже як звичайний текст — саме тому він вважається найкращою першою "справжньою" мовою для дітей.</p>
<p>На курсі Python діти пишуть реальний код: ігри на Pygame, автоматизацію, а у фіналі — Telegram-бот. Це той момент, коли дитина вперше розуміє: "Я можу створити щось, чим користуватимуться інші люди."</p>
<p><strong>Підходить, якщо:</strong> дитині 10+ років, цікавиться технологіями, хоче писати програми, а не просто "натискати кнопки".</p>

<h2>Roblox Studio — розробка ігор для фанатів Roblox</h2>
<p><strong>Вік:</strong> 9–14 років · <strong>Складність:</strong> початковий–середній рівень</p>
<p>Якщо дитина годинами грає в Roblox — чому б не навчити її створювати власні ігри? Roblox Studio — це професійний інструмент для розробки ігор, де навчання відбувається через мову програмування Lua.</p>
<p>Діти будують власні 3D-світи, додають фізику, скрипти та персонажів. У фіналі курсу — готова гра, яку можна опублікувати на платформі Roblox з мільярдною аудиторією.</p>
<p><strong>Підходить, якщо:</strong> дитина захоплена Roblox, любить конструктори та будівництво, хоче розробляти ігри.</p>

<h2>Minecraft Education — програмування через гру</h2>
<p><strong>Вік:</strong> 9–14 років · <strong>Складність:</strong> початковий–середній рівень</p>
<p>Minecraft Education — це спеціальна версія улюбленої гри для навчання. За допомогою бібліотеки mcpi та Python діти автоматизують будівництво, пишуть власні скрипти та вивчають алгоритми через знайоме середовище.</p>
<p>Це чудовий спосіб зробити перший крок у Python для дітей, яких складно відірвати від Minecraft.</p>
<p><strong>Підходить, якщо:</strong> дитина фанат Minecraft, хоче навчитись Python, але не готова до "нудних" прикладів із підручника.</p>

<h2>Як обрати правильно</h2>
<ul>
  <li>Дитині <strong>6–9 років</strong>? → Scratch або Цифрова графіка</li>
  <li>Дитині <strong>9–12 років</strong>, любить ігри? → Roblox Studio або Minecraft</li>
  <li>Дитині <strong>10–14 років</strong>, цікавиться технологіями? → Python</li>
  <li>Дитині <strong>12+ років</strong>, хоче створювати сайти? → Веб-розробка</li>
  <li>Не знаєте? → Запишіться на безкоштовну консультацію, ми допоможемо</li>
</ul>
<p>В <a href="/">My Computer Academy</a> ми проводимо безкоштовну консультацію перед записом на будь-який курс — щоб дитина потрапила саме туди, де їй буде цікаво.</p>`,
  },
  {
    slug: 'minecraft-ta-python-prohramuvannia-dlia-ditei',
    title: 'Minecraft і Python: як улюблена гра стає першим кроком у програмуванні',
    excerpt: 'Якщо дитина не може відірватись від Minecraft — це не проблема, це можливість. Розповідаємо, як Minecraft Education та Python перетворюють гравця на розробника.',
    category: 'курси',
    coverEmoji: '⛏️',
    author: 'My Computer Academy',
    publishedAt: '2026-07-03',
    active: true,
    content: `<h2>Проблема, яку знають усі батьки</h2>
<p>"Знову сидить в Майнкрафті" — цю фразу чули мільйони батьків по всьому світу. Дитина може годинами будувати замки, прокладати шляхи, облаштовувати підземелля. І замість того, щоб забороняти — можна спрямувати цей інтерес у корисне русло.</p>
<p>Minecraft Education — це не просто гра. Це освітня платформа, яку використовують школи у 115 країнах світу для навчання математики, фізики, географії та — так — програмування.</p>

<h2>Що таке Minecraft Education і mcpi</h2>
<p>Minecraft Education Edition — це спеціальна версія Minecraft для навчальних цілей. А бібліотека <strong>mcpi (Minecraft Pi API)</strong> — це інструмент, який дозволяє керувати грою через Python-код.</p>
<p>Замість того, щоб вручну ставити блоки один за одним, дитина пише кілька рядків коду — і Python будує цілий будинок, фортецю або лабіринт автоматично.</p>

<h2>Як виглядає перший код у Minecraft</h2>
<p>Ось найпростіший приклад — будуємо стіну з каменю:</p>
<pre><code>from mcpi.minecraft import Minecraft

mc = Minecraft.create()
pos = mc.player.getTilePos()

mc.setBlocks(
    pos.x, pos.y, pos.z,
    pos.x + 10, pos.y + 5, pos.z,
    4  # 4 = Cobblestone
)</code></pre>
<p>Всього 7 рядків — і в грі з'являється стіна 10×5 блоків із каменю. Дитина бачить результат своєї програми в режимі реального часу, в середовищі, яке вже знає і любить.</p>

<h2>Чому це краще, ніж звичайний підручник з Python</h2>
<p>Класична проблема навчання програмування дітей — абстрактність. "Напиши програму, яка виводить числа від 1 до 10" — нудно. Але "напиши код, який побудує твою базу в Minecraft" — це вже інша справа.</p>
<p>Через Minecraft діти природньо вивчають:</p>
<ul>
  <li><strong>Змінні та координати</strong> — позиція гравця, розміри будівлі</li>
  <li><strong>Цикли</strong> — повторення блоків, патерни</li>
  <li><strong>Умовні оператори</strong> — якщо блок є — замінити, якщо немає — поставити</li>
  <li><strong>Функції</strong> — "будуй будинок", "будуй стіну", "будуй башту"</li>
</ul>

<h2>Що діти роблять на курсі Minecraft у My Computer Academy</h2>
<p>Протягом 3 місяців (24 заняття по 90 хвилин) учні проходять шлях від нуля до власного міні-мода:</p>
<ol>
  <li>Перші кроки в Python: змінні, цикли, функції через Minecraft</li>
  <li>Автоматизація будівництва: будинки, дороги, мости одним скриптом</li>
  <li>Взаємодія з грою: телепортація, зміна часу доби, погода</li>
  <li>Фінальний проєкт: власний мод або міні-гра всередині Minecraft</li>
</ol>

<h2>Для кого підходить курс</h2>
<p>Курс Minecraft Education ідеально підходить для дітей <strong>9–14 років</strong>, які:</p>
<ul>
  <li>Люблять Minecraft і проводять у ньому багато часу</li>
  <li>Ще не мають досвіду програмування (або мають мінімальний)</li>
  <li>Хочуть навчитися Python через щось знайоме і цікаве</li>
</ul>
<p>По завершенні курсу дитина матиме базові навички Python, які можна продовжити на курсі "Python: справжнє програмування" або у напрямку Telegram-ботів та ігор на Pygame.</p>

<h2>Висновок</h2>
<p>Minecraft — це не проблема і не "марна трата часу". Це середовище, де дитина вже мотивована, вже знає правила, вже хоче будувати. Завдання хорошого курсу — підхопити цей інтерес і перетворити його на реальну навичку.</p>
<p>Запишіть дитину на безкоштовний пробний урок з <a href="/courses/minecraft">курсу Minecraft у My Computer Academy</a> — і подивіться на її реакцію, коли вона вперше побудує будинок за допомогою свого коду.</p>`,
  },
];

// Merge RU title/excerpt/content onto each seed entry (also used to patch existing live records)
ARTICLES_SEED.forEach(a => {
  const ru = ARTICLES_RU[a.slug];
  if (ru) { a.title_ru = ru.title; a.excerpt_ru = ru.excerpt; a.content_ru = ru.content; }
});

// ── STARTUP SEED (test teachers + demo clients) ───────────────────────────────
(function seedTestData() {
  try {
    if (!adminsDb.getAll().some(a => a.role === 'teacher')) {
      adminsDb.create('Богдан Коваль',   'teacher', { hourlyRate: 150, lessonDuration: 60, phone: '+380501234567', notes: 'Веб-розробка, Python' });
      adminsDb.create('Аліна Петренко',  'teacher', { hourlyRate: 130, lessonDuration: 60, phone: '+380671234568', notes: 'Scratch, Roblox' });
      console.log('✅  Seeded 2 test teachers');
    }
    const _cnt = loadContent();
    if (!_cnt.pricing || !_cnt.pricing.length || !_cnt.faq || !_cnt.faq.length) {
      saveContent({ ..._cnt, ...CONTENT_SEED });
      console.log('✅  Seeded pricing + FAQ content');
    }
    if (!_cnt.seo) {
      saveContent({ ...loadContent(), seo: CONTENT_SEED.seo });
      console.log('✅  Seeded SEO content');
    }
    if (!coursesDb.getAll().length) {
      COURSE_SEED.forEach(c => coursesDb.create({ ...c, curriculum: CURRICULA[c.id] || [] }));
      console.log('✅  Seeded 9 courses');
    } else {
      let patched = 0;
      coursesDb.getAll().forEach(c => {
        const seed = COURSE_SEED.find(s => s.id === c.id);
        const patch = {};
        if (seed && (!c.features || !c.features.length)) {
          patch.features = seed.features;
          patch.popular  = seed.popular || false;
        }
        if (seed && seed.name_ru && (c.name_ru !== seed.name_ru || c.description_ru !== seed.description_ru)) {
          patch.name_ru        = seed.name_ru;
          patch.description_ru = seed.description_ru;
        }
        const hasPlaceholder = !c.curriculum || !c.curriculum.length ||
          c.curriculum.some(m => m.num === 'Фінал' || (m.num && m.num.startsWith('Модуль')));
        if (hasPlaceholder && CURRICULA[c.id]) {
          patch.curriculum = CURRICULA[c.id];
        }
        if (Object.keys(patch).length) {
          coursesDb.update(c.id, patch);
          patched++;
        }
      });
      if (patched) console.log(`✅  Patched ${patched} courses (features/popular/curriculum)`);
    }

    // Live courses.json predates some COURSE_SEED entries (e.g. construct/blog were
    // added to the source later) — create any course that's in the seed but missing live.
    let addedCourses = 0;
    COURSE_SEED.forEach(c => {
      if (!coursesDb.getAll().some(x => x.id === c.id)) {
        coursesDb.create({ ...c, curriculum: CURRICULA[c.id] || [] });
        addedCourses++;
      }
    });
    if (addedCourses) console.log(`✅  Added ${addedCourses} missing courses from seed`);

    let articlesSeeded = 0;
    let articlesPatched = 0;
    ARTICLES_SEED.forEach(a => {
      const existing = articlesDb.getBySlug(a.slug);
      if (!existing) { articlesDb.create(a); articlesSeeded++; }
      else if (a.title_ru && existing.title_ru !== a.title_ru) {
        articlesDb.update(existing.id, { title_ru: a.title_ru, excerpt_ru: a.excerpt_ru, content_ru: a.content_ru });
        articlesPatched++;
      }
    });
    // ARTICLES_RU also covers live-only articles that were never added to ARTICLES_SEED
    // (most were published directly via the admin API) — patch those by slug too.
    Object.keys(ARTICLES_RU).forEach(slug => {
      const existing = articlesDb.getBySlug(slug);
      const ru = ARTICLES_RU[slug];
      if (existing && ru.title && existing.title_ru !== ru.title) {
        articlesDb.update(existing.id, { title_ru: ru.title, excerpt_ru: ru.excerpt, content_ru: ru.content });
        articlesPatched++;
      }
    });
    if (articlesSeeded) console.log(`✅  Seeded ${articlesSeeded} articles`);
    if (articlesPatched) console.log(`✅  Patched ${articlesPatched} articles (RU translation)`);

    if (!clientsDb.getAll().some(c => c.scheduleDays && c.scheduleDays.length > 0)) {
      [
        { name: 'Марко Тищенко',    age: 10, course: 'scratch', phone: '+380501001001', status: 'active', teacher: 'Аліна Петренко', lessonType: 'group',      scheduleDays: [{day:'1',time:'15:00'},{day:'4',time:'15:00'}], schedule: 'Пн 15:00, Чт 15:00' },
        { name: 'Діана Коваль',     age: 12, course: 'python',  phone: '+380502002002', status: 'active', teacher: 'Богдан Коваль',  lessonType: 'group',      scheduleDays: [{day:'2',time:'16:00'},{day:'5',time:'16:00'}], schedule: 'Вт 16:00, Пт 16:00' },
        { name: 'Артем Мороз',      age: 14, course: 'web',     phone: '+380503003003', status: 'active', teacher: 'Богдан Коваль',  lessonType: 'individual', scheduleDays: [{day:'3',time:'17:00'}],                       schedule: 'Ср 17:00' },
        { name: 'Соня Петрик',      age: 11, course: 'roblox',  phone: '+380504004004', status: 'active', teacher: 'Аліна Петренко', lessonType: 'group',      scheduleDays: [{day:'3',time:'14:30'}],                       schedule: 'Ср 14:30' },
        { name: 'Данило Романів',   age:  9, course: 'scratch', phone: '+380505005005', status: 'active', teacher: 'Аліна Петренко', lessonType: 'group',      scheduleDays: [{day:'6',time:'10:00'}],                       schedule: 'Сб 10:00' },
        { name: 'Вікторія Лисенко', age: 13, course: 'python',  phone: '+380506006006', status: 'active', teacher: 'Богдан Коваль',  lessonType: 'group',      scheduleDays: [{day:'2',time:'18:00'}],                       schedule: 'Вт 18:00' },
      ].forEach(c => clientsDb.create(c));
      console.log('✅  Seeded 6 test clients with schedule data');
    }
  } catch(e) { console.warn('Seed warning:', e.message); }
})();

function loadContent() {
  try { return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8')); } catch { return {}; }
}
function saveContent(data) { fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8'); }

const app            = express();
app.set('trust proxy', 1); // behind nginx reverse proxy
const PORT           = process.env.PORT || 3000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
// Support both SUPERADMIN_TOKEN (new) and ADMIN_TOKEN (legacy)
const SUPERADMIN_TOKEN = process.env.SUPERADMIN_TOKEN || process.env.ADMIN_TOKEN;

if (!SUPERADMIN_TOKEN) {
  console.warn('⚠️  WARNING: SUPERADMIN_TOKEN / ADMIN_TOKEN is not set in .env!');
}

// ── SECURITY HEADERS (helmet) ────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      imgSrc:      ["'self'", "data:", "https:"],
      connectSrc:  ["'self'", "https://www.google-analytics.com", "https://analytics.google.com", "https://stats.g.doubleclick.net", "https://mycomputer.school", "https://webdesign.mycomputer.education", "https://python.mycomputer.education", "https://minecraft.mycomputer.education", "https://roblox.mycomputer.education"],
      frameSrc:       ["'none'"],
      objectSrc:      ["'none'"],
      scriptSrcAttr:  ["'unsafe-inline'"], // allow onclick/onchange in admin panel
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // needed for Google Fonts
}));

// ── CORS ─────────────────────────────────────────────────────────────────────
function corsOrigin(origin, callback) {
  if (!origin) return callback(null, true);
  if (
    ALLOWED_ORIGIN === '*' ||
    origin === 'https://mycomputer.education' ||
    origin === 'https://mycomputer.school' ||
    /^https:\/\/[a-z0-9-]+\.mycomputer\.education$/.test(origin)
  ) return callback(null, true);
  const allowed = ALLOWED_ORIGIN.split(',').map(s => s.trim()).filter(Boolean);
  callback(allowed.includes(origin) ? null : new Error('CORS'), allowed.includes(origin));
}
const corsOpts = {
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-token'],
};
app.options('*', cors(corsOpts));
app.use(cors(corsOpts));

// ── BODY PARSING ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '12mb', verify: (req, _res, buf) => { req.rawBody = buf; } }));
app.use(express.urlencoded({ extended: false, limit: '12mb' }));

// ── RATE LIMITING ─────────────────────────────────────────────────────────────
// Public: 10 form submissions per 15 minutes per IP
const leadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Забагато запитів. Спробуйте через 15 хвилин.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 6,
  message: { error: 'Забагато запитів. Зачекайте хвилину.' },
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
});

// Admin: dashboard makes ~11 requests per load (parallel monthly-payments fetches).
// 500/15min gives ~45 full dashboard reloads before limiting — plenty for normal use.
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: 'Too many requests.' },
});

// ── HOMEPAGE LANGUAGE SSR ─────────────────────────────────────────────────────
const MAIN_INDEX_TPL = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const MAIN_META_RU = {
  title: 'Школа программирования и IT-курсов для детей — My Computer Academy | Minecraft, Scratch, Python, Roblox',
  desc:  'Компьютерные курсы для детей от 6 до 18 лет по всей Украине. Scratch, Python, Roblox Studio, Веб-разработка. Малые группы до 5 человек. Первый урок бесплатно.',
};
app.get(['/', '/index.html'], (req, res) => {
  // Build SEO block from content.json
  const seoPages = loadContent().seo?.pages || [];
  const mainSeo  = seoPages.find(p => p.id === 'main') || {};
  const seoBlock = (mainSeo.heading || mainSeo.text)
    ? `<div class="visually-hidden" aria-hidden="true">${mainSeo.heading ? `<h2>${escHtml(mainSeo.heading)}</h2>` : ''}${mainSeo.text ? `<p>${escHtml(mainSeo.text)}</p>` : ''}</div>`
    : '';

  let html = MAIN_INDEX_TPL.replace('<!-- SEO_BLOCK_MAIN -->', seoBlock);

  if (req.query.lang === 'ru') {
    const m = MAIN_META_RU;
    html = html
      .replace(/<html lang="uk">/, '<html lang="ru">')
      .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(m.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`)
      .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escHtml(m.title)}"`)
      .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`)
      .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${escHtml(m.title)}"`)
      .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`);
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── ARTICLES LISTING LANGUAGE SSR ─────────────────────────────────────────────
const ARTICLES_INDEX_TPL = fs.readFileSync(path.join(__dirname, '..', 'articles', 'index.html'), 'utf8');
app.get('/articles', (req, res) => {
  const isRu = req.query.lang === 'ru';
  const hasRu = !!ARTICLES_INDEX_RU.title;
  const siteUrl = 'https://mycomputer.education';
  let html = ARTICLES_INDEX_TPL;
  if (hasRu) {
    html = html.replace(
      '<link rel="canonical" href="https://mycomputer.education/articles"/>',
      `<link rel="canonical" href="${siteUrl}/articles${isRu ? '?lang=ru' : ''}"/>
  <link rel="alternate" hreflang="uk" href="${siteUrl}/articles"/>
  <link rel="alternate" hreflang="ru" href="${siteUrl}/articles?lang=ru"/>
  <link rel="alternate" hreflang="x-default" href="${siteUrl}/articles"/>`
    );
  }
  if (isRu && hasRu) {
    const m = ARTICLES_INDEX_RU;
    html = html
      .replace('<html lang="uk">', '<html lang="ru">')
      .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(m.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`)
      .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escHtml(m.title)}"`)
      .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`);
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── DOCS (legal pages) LANGUAGE SSR ────────────────────────────────────────────
const DOCS_IDS = ['privacy-policy', 'terms', 'public-offer', 'refund-policy', 'cookie-policy'];
const DOCS_TPLS = {};
DOCS_IDS.forEach(id => {
  DOCS_TPLS[id] = fs.readFileSync(path.join(__dirname, '..', 'docs', `${id}.html`), 'utf8');
});
app.get('/docs/:id.html', (req, res, next) => {
  const id = req.params.id;
  const tpl = DOCS_TPLS[id];
  if (!tpl) return next();
  const isRu = req.query.lang === 'ru';
  const m = DOCS_SEO_RU[id];
  const siteUrl = 'https://mycomputer.education';
  const pageUrl = `${siteUrl}/docs/${id}.html`;
  let html = tpl;
  if (m) {
    html = html.replace(
      /<meta name="description" content="[^"]*"\/>/,
      (match) => `${match}
  <link rel="canonical" href="${pageUrl}${isRu ? '?lang=ru' : ''}"/>
  <link rel="alternate" hreflang="uk" href="${pageUrl}"/>
  <link rel="alternate" hreflang="ru" href="${pageUrl}?lang=ru"/>
  <link rel="alternate" hreflang="x-default" href="${pageUrl}"/>`
    );
  }
  if (isRu && m) {
    html = html
      .replace('<html lang="uk">', '<html lang="ru">')
      .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(m.title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`);
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── SECURITY: never serve source code or raw data files as static assets ──────
const STATIC_DATA_ALLOWLIST = new Set(['articles.json', 'content.json']); // only files client JS fetches directly
app.use((req, res, next) => {
  const p = req.path;
  if (/^\/server(\/|$)/i.test(p) || /^\/node_modules(\/|$)/i.test(p) || /^\/(package(-lock)?\.json|\.env|\.git)/i.test(p)) {
    return res.status(404).end();
  }
  const dataMatch = p.match(/^\/data\/([^/]+)$/i);
  if (dataMatch && !STATIC_DATA_ALLOWLIST.has(dataMatch[1])) {
    return res.status(404).end();
  }
  next();
});

// ── STATIC FILES ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..'), {
  maxAge: 0,
  etag: true,
  index: 'index.html',
  setHeaders(res, filePath) {
    if (/\.(png|jpe?g|gif|webp|svg|ico|woff2?|ttf|otf)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
    } else if (/\.(css|js)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=604800');              // 1 week
    } else if (/\.html$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'no-cache');                            // always fresh
    }
  },
}));

// ── HELPERS ───────────────────────────────────────────────────────────────────
function sanitize(str) {
  if (!str) return '';
  return String(str).trim().slice(0, 500).replace(/[<>]/g, '');
}

function validateLead(data) {
  const errors = [];
  if (!data.child_name || data.child_name.trim().length < 2) {
    errors.push('child_name: мінімум 2 символи');
  }
  const phoneDigits = (data.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    errors.push('phone: невірний формат');
  }
  if (data.age && (isNaN(data.age) || data.age < 5 || data.age > 18)) {
    errors.push('age: від 5 до 18');
  }
  return errors;
}

// Returns 'superadmin' | 'admin' | null
function getRole(token) {
  if (!token) return null;
  if (SUPERADMIN_TOKEN && token === SUPERADMIN_TOKEN) return 'superadmin';
  if (adminsDb.findByToken(token)) return 'admin';
  return null;
}

// Safe ID pattern — prevents path traversal / injection
const SAFE_ID_RE = /^[a-z0-9_-]{1,64}$/i;

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Truncate to maxLen without cutting a word in half (for meta descriptions)
function truncateAtWord(str, maxLen) {
  str = String(str || '');
  if (str.length <= maxLen) return str;
  const cut = str.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}

function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  const role  = getRole(token);
  if (!role) return res.status(401).json({ error: 'Unauthorized' });
  req.role  = role;
  req.token = token;
  next();
}

function requireSuperAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (!SUPERADMIN_TOKEN || token !== SUPERADMIN_TOKEN) {
    return res.status(403).json({ error: 'Forbidden: superadmin only' });
  }
  req.role  = 'superadmin';
  req.token = token;
  next();
}

function requireNotTeacher(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (SUPERADMIN_TOKEN && token === SUPERADMIN_TOKEN) return next();
  const admin = adminsDb.findByToken(token);
  if (admin && admin.role === 'teacher') {
    return res.status(403).json({ error: 'Forbidden: teacher access restricted' });
  }
  next();
}

// Teacher-role guard: allow only attendance + client read + me + alerts
// req.path inside app.use('/api', ...) is relative to /api (e.g. '/me', '/clients')
const TEACHER_ALLOWED = ['/me', '/health', '/attendance', '/clients', '/alerts', '/teachers'];
app.use('/api', (req, res, next) => {
  const token = req.headers['x-admin-token'];
  if (!token || (SUPERADMIN_TOKEN && token === SUPERADMIN_TOKEN)) return next();
  const admin = adminsDb.findByToken(token);
  if (!admin || admin.role !== 'teacher') return next();
  const allowed = TEACHER_ALLOWED.some(p => req.path === p || req.path.startsWith(p + '/') || req.path.startsWith(p + '?'));
  if (!allowed) return res.status(403).json({ error: 'Forbidden: teacher access restricted' });
  if (req.path.startsWith('/clients') && req.method !== 'GET') {
    return res.status(403).json({ error: 'Forbidden: teacher access restricted' });
  }
  next();
});

// ── ROUTES ────────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET /api/me — returns current user role
app.get('/api/me', adminLimiter, requireAdmin, (req, res) => {
  if (req.role === 'superadmin') {
    return res.json({ success: true, role: 'superadmin', name: 'Супер-адмін' });
  }
  const a = adminsDb.findByToken(req.token);
  res.json({ success: true, role: a?.role || 'administrator', name: a?.name || 'Адмін' });
});

// ── ADMIN MANAGEMENT (superadmin only) ───────────────────────────────────────
app.get('/api/admins', adminLimiter, requireSuperAdmin, (req, res) => {
  res.json({ success: true, admins: adminsDb.getAll() });
});

// GET /api/teachers — list active teachers (any admin; no tokens exposed)
app.get('/api/teachers', adminLimiter, requireAdmin, (req, res) => {
  const teachers = adminsDb.getAll()
    .filter(a => a.role === 'teacher' && a.active)
    .map(a => ({ id: a.id, name: a.name }));
  res.json({ success: true, teachers });
});

app.post('/api/admins', adminLimiter, requireSuperAdmin, (req, res) => {
  const name = sanitize(req.body.name || '');
  const role = sanitize(req.body.role || 'administrator');
  if (!name || name.length < 2) return res.status(400).json({ error: 'Вкажіть ім\'я адміністратора' });
  // Security: never allow creating superadmin via API
  if (!adminsDb.ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ error: 'Недійсна роль' });
  }
  const admin = adminsDb.create(name, role);
  res.status(201).json({ success: true, admin });
});

app.patch('/api/admins/:id/revoke', adminLimiter, requireSuperAdmin, (req, res) => {
  const admin = adminsDb.revoke(parseInt(req.params.id));
  if (!admin) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true, admin });
});

app.delete('/api/admins/:id', adminLimiter, requireSuperAdmin, (req, res) => {
  const ok = adminsDb.delete(parseInt(req.params.id));
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// Teacher profile update (superadmin only)
app.patch('/api/admins/:id/profile', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid ID' });
  const patch = {};
  const { name, hourlyRate, lessonDuration, notes, phone, paymentType, monthlyRate } = req.body;
  if (name           !== undefined) patch.name           = sanitize(name);
  if (hourlyRate     !== undefined) patch.hourlyRate     = parseFloat(hourlyRate)    || 0;
  if (lessonDuration !== undefined) patch.lessonDuration = parseInt(lessonDuration)  || 60;
  if (notes          !== undefined) patch.notes          = sanitize(notes);
  if (phone          !== undefined) patch.phone          = sanitize(phone);
  if (paymentType    !== undefined) patch.paymentType    = sanitize(paymentType);
  if (monthlyRate    !== undefined) patch.monthlyRate    = parseFloat(monthlyRate)   || 0;
  const admin = adminsDb.update(id, patch);
  if (!admin) return res.status(404).json({ error: 'Не знайдено' });
  res.json({ success: true, admin });
});

// Regenerate token for revoked admin (superadmin only)
app.post('/api/admins/:id/regenerate-token', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid ID' });
  const admin = adminsDb.regenerateToken(id);
  if (!admin) return res.status(404).json({ error: 'Не знайдено' });
  res.json({ success: true, admin });
});

// Staff document upload (base64 JSON) — superadmin only
const STAFF_DOCS_DIR = path.join(__dirname, '..', 'data', 'staff-docs');

app.post('/api/admins/:id/docs', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid ID' });
  const { name: fileName, data: b64 } = req.body;
  if (!fileName || !b64) return res.status(400).json({ error: 'Потрібні name і data' });
  const safeName = sanitize(fileName).replace(/[^a-zA-Z0-9_\-\.а-яА-ЯіІїЇєЄ]/gu, '_').slice(0, 120);
  if (!safeName) return res.status(400).json({ error: 'Недійсна назва файлу' });
  try {
    const dir = path.join(STAFF_DOCS_DIR, String(id));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const buf = Buffer.from(b64, 'base64');
    if (buf.length > 8 * 1024 * 1024) return res.status(400).json({ error: 'Файл завеликий (макс 8 МБ)' });
    fs.writeFileSync(path.join(dir, safeName), buf);
    res.json({ success: true, name: safeName });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/admins/:id/docs', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid ID' });
  const dir = path.join(STAFF_DOCS_DIR, String(id));
  if (!fs.existsSync(dir)) return res.json({ success: true, docs: [] });
  const docs = fs.readdirSync(dir).filter(f => !f.startsWith('.')).map(f => {
    const stat = fs.statSync(path.join(dir, f));
    return { name: f, size: stat.size, mtime: stat.mtime };
  });
  res.json({ success: true, docs });
});

app.delete('/api/admins/:id/docs/:filename', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const filename = req.params.filename;
  if (!id || !filename) return res.status(400).json({ error: 'Invalid params' });
  const filePath = path.join(STAFF_DOCS_DIR, String(id), filename);
  if (!filePath.startsWith(STAFF_DOCS_DIR)) return res.status(400).json({ error: 'Invalid path' });
  try {
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/admins/:id/docs/:filename', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const filename = req.params.filename;
  if (!id || !filename) return res.status(400).json({ error: 'Invalid params' });
  const filePath = path.join(STAFF_DOCS_DIR, String(id), filename);
  if (!filePath.startsWith(STAFF_DOCS_DIR)) return res.status(400).json({ error: 'Invalid path' });
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
  res.download(filePath, filename);
});

// Count scheduled lesson slots for a given year/month from scheduleDays [{day,time}]
// day: 1=Mon..7=Sun (matching the schedule system)
function countScheduledLessons(scheduleDays, year, month) {
  if (!scheduleDays || !scheduleDays.length) return 0;
  const daysInMonth = new Date(year, month, 0).getDate();
  const dowCount = {};
  for (let d = 1; d <= daysInMonth; d++) {
    let dow = new Date(year, month - 1, d).getDay(); // 0=Sun..6=Sat
    if (dow === 0) dow = 7; // 1=Mon..7=Sun
    dowCount[dow] = (dowCount[dow] || 0) + 1;
  }
  return scheduleDays.reduce((s, slot) => s + (dowCount[parseInt(slot.day)] || 0), 0);
}

// Teacher salary calculation (superadmin only)
app.get('/api/admins/:id/salary', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const admin = adminsDb.getById(id);
  if (!admin) return res.status(404).json({ error: 'Не знайдено' });
  const ym = req.query.ym || new Date().toISOString().slice(0, 7);
  const [year, month] = ym.split('-').map(Number);
  const allClients     = clientsDb.getAll();
  const teacherClients = allClients.filter(c => (c.teacher || '').trim() === (admin.name || '').trim());
  const attData        = attendanceDb.getMonth(year, month);
  const breakdown = [];
  let totalScheduled = 0;
  let totalConducted = 0;
  teacherClients.forEach(c => {
    const clientAtt = attData[String(c.id)] || {};
    const conducted = Object.values(clientAtt).filter(v => ['present', 'makeup'].includes(v)).length;
    const absent    = Object.values(clientAtt).filter(v => v === 'absent').length;
    const cancelled = Object.values(clientAtt).filter(v => v === 'cancelled').length;
    const scheduled = countScheduledLessons(c.scheduleDays || [], year, month);
    totalScheduled += scheduled;
    totalConducted += conducted;
    breakdown.push({ clientId: c.id, clientName: c.name, scheduled, conducted, absent, cancelled });
  });
  // Salary based on conducted; fall back to scheduled if attendance not filled in
  const billableLessons = totalConducted > 0 ? totalConducted : totalScheduled;
  const hourlyRate     = admin.hourlyRate     || 0;
  const lessonDuration = admin.lessonDuration || 60;
  const totalHours     = (billableLessons * lessonDuration) / 60;
  const totalSalary    = Math.round(totalHours * hourlyRate);
  res.json({
    success: true, admin, ym,
    totalLessons: billableLessons, totalScheduled, totalConducted,
    totalHours, totalSalary, hourlyRate, lessonDuration, breakdown,
  });
});

// POST /api/leads — submit lead (rate-limited)
app.post('/api/leads', leadsLimiter, (req, res) => {
  const { child_name, age, course, phone } = req.body;

  const errors = validateLead({ child_name, phone, age });
  if (errors.length) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  try {
    const { email } = req.body;
    const sanitized = {
      child_name: sanitize(child_name),
      age:        age ? parseInt(age) : null,
      course:     sanitize(course) || null,
      phone:      sanitize(phone),
      email:      sanitize(email) || null,
      source:     'mycomputer.education',
    };

    const result = db.insertLead(sanitized);
    console.log(`[LEAD #${result.id}] ${sanitized.child_name} | ${sanitized.phone} | ${sanitized.course || '—'}`);

    // Send email notification (non-blocking — lead is saved regardless)
    sendLeadNotification({ ...sanitized, id: result.id }).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Заявку прийнято! Ми передзвонимо протягом 30 хвилин.',
      id: result.id,
    });
  } catch (err) {
    console.error('[LEAD ERROR]', err.message);
    res.status(500).json({ error: 'Помилка сервера. Зателефонуйте нам.' });
  }
});

// POST /api/leads/admin — admin-only lead creation (no public rate limit)
app.post('/api/leads/admin', adminLimiter, requireAdmin, (req, res) => {
  const { child_name, age, phone, course, email, teacher, notes, source } = req.body;
  if (!child_name || child_name.trim().length < 2) return res.status(400).json({ error: 'Вкажіть ім\'я (мін. 2 символи)' });
  if (!phone || String(phone).replace(/\D/g,'').length < 10) return res.status(400).json({ error: 'Невірний формат телефону' });
  try {
    const result = db.insertLead({
      child_name: sanitize(child_name),
      age:        age ? parseInt(age) || null : null,
      course:     sanitize(course || '') || null,
      phone:      sanitize(phone),
      email:      sanitize(email || '') || null,
      source:     sanitize(source || '') || 'mycomputer.education',
    });
    const lead = db.getLeadById(result.id);
    if (teacher) db.updateFields(result.id, { teacher: sanitize(teacher) });
    if (notes)   db.updateNotes(result.id, sanitize(notes));
    const fresh = db.getLeadById(result.id);
    res.status(201).json({ success: true, lead: fresh });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/leads — admin only
app.get('/api/leads', adminLimiter, requireAdmin, (req, res) => {
  try {
    const leads = db.getAllLeads();
    res.json({ success: true, count: leads.length, leads });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/leads/stats
app.get('/api/leads/stats', adminLimiter, requireAdmin, (req, res) => {
  try {
    res.json({ success: true, stats: db.getStats() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/leads/:id
app.get('/api/leads/:id', adminLimiter, requireAdmin, (req, res) => {
  const lead = db.getLeadById(parseInt(req.params.id));
  if (!lead) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true, lead });
});

// PATCH /api/leads/:id
app.patch('/api/leads/:id', adminLimiter, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const { status, notes, child_name, phone, age, course, email, teacher, schedule } = req.body;
  const valid = ['new', 'contacted', 'trial_scheduled', 'enrolled', 'rejected'];
  try {
    // Update editable fields
    const fieldPatch = {};
    if (child_name !== undefined) fieldPatch.child_name = sanitize(child_name);
    if (phone      !== undefined) fieldPatch.phone      = sanitize(phone);
    if (age        !== undefined) fieldPatch.age        = age ? parseInt(age) || null : null;
    if (course     !== undefined) fieldPatch.course     = sanitize(course) || null;
    if (email      !== undefined) fieldPatch.email      = sanitize(email) || null;
    if (teacher    !== undefined) fieldPatch.teacher    = sanitize(teacher) || null;
    if (schedule   !== undefined) fieldPatch.schedule   = sanitize(schedule) || null;
    if (Object.keys(fieldPatch).length) db.updateFields(id, fieldPatch);

    if (status) {
      if (!valid.includes(status)) return res.status(400).json({ error: `Статус: ${valid.join(', ')}` });
      db.updateStatus(id, status);

      // Auto-create client when lead is enrolled.
      // Dedup by sourceLeadId so each lead gets exactly one client even when
      // two leads share the same phone number.
      if (status === 'enrolled') {
        try {
          const lead = db.getLeadById(id);
          if (lead) {
            const alreadyLinked = clientsDb.getAll().find(c => c.sourceLeadId === id);
            if (!alreadyLinked) {
              const today = new Date().toISOString().slice(0, 10);
              const newClient = clientsDb.create({
                name:         lead.child_name,
                age:          lead.age,
                course:       lead.course || null,
                phone:        lead.phone,
                email:        lead.email || null,
                status:       'active',
                source:       'website',
                enrolledDate: today,
                notes:        lead.notes || '',
                teacher:      lead.teacher || null,
                schedule:     lead.schedule || null,
                sourceLeadId: id,
              });
              const ym = new Date().toISOString().slice(0, 7);
              const monthData = monthlyPayDb.getMonth(ym);
              if (monthData) {
                monthlyPayDb.addRecord(ym, {
                  clientId:       newClient.id,
                  clientName:     newClient.name,
                  expectedAmount: 0,
                  paidAmount:     0,
                  status:         'pending',
                  paidDate:       null,
                  method:         null,
                  note:           'Автоматично з заявки #' + lead.id,
                });
              }
              console.log(`[AUTO-CLIENT] Created client #${newClient.id} from lead #${lead.id}`);
            } else {
              console.log(`[AUTO-CLIENT] Lead #${id} already has client #${alreadyLinked.id}, skipping`);
            }
          }
        } catch (autoErr) {
          console.error('[AUTO-CLIENT]', autoErr.message);
        }
      }
    }
    if (notes !== undefined) db.updateNotes(id, sanitize(notes));

    // Sync field changes from lead to its linked client (by sourceLeadId first, phone as fallback)
    if (fieldPatch.child_name || fieldPatch.phone || fieldPatch.teacher || fieldPatch.schedule) {
      try {
        const updatedLead = db.getLeadById(id);
        if (updatedLead) {
          const matchClient = clientsDb.getAll().find(c => c.sourceLeadId === id)
            || (updatedLead.phone ? clientsDb.getAll().find(c => c.phone === updatedLead.phone) : null);
          if (matchClient) {
            const clientPatch = {};
            if (fieldPatch.child_name) clientPatch.name     = fieldPatch.child_name;
            if (fieldPatch.phone)      clientPatch.phone    = fieldPatch.phone;
            if (fieldPatch.teacher)    clientPatch.teacher  = fieldPatch.teacher;
            if (fieldPatch.schedule)   clientPatch.schedule = fieldPatch.schedule;
            const updated = clientsDb.update(matchClient.id, clientPatch);
            if (updated && clientPatch.name) {
              monthlyPayDb.syncClientName(matchClient.id, clientPatch.name);
            }
          }
        }
      } catch (syncErr) {
        console.error('[SYNC lead→client]', syncErr.message);
      }
    }

    res.json({ success: true, lead: db.getLeadById(id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/leads/:id — superadmin only
app.delete('/api/leads/:id', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const r = db.deleteLead(id);
    if (r.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, message: `Lead #${id} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin panel — no cache so updates apply immediately
app.get('/admin', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});
app.get('/admin.html', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

// Known single-page routes → index.html
const SPA_ROUTES = ['/', '/index.html'];
SPA_ROUTES.forEach(r => app.get(r, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
}));

// ── CLIENTS CRM API ──────────────────────────────────────────────────────────

// Full sanitize — used for POST (create). Always returns all fields.
function sanitizeClient(body) {
  const s = v => sanitize(v);
  return {
    name:         s(body.name),
    age:          body.age ? parseInt(body.age) || null : null,
    course:       s(body.course) || null,
    phone:        s(body.phone),
    email:        s(body.email) || null,
    status:       s(body.status),
    source:       s(body.source),
    enrolledDate: s(body.enrolledDate) || null,
    trialDate:    s(body.trialDate) || null,
    lastContact:  s(body.lastContact) || null,
    nextContact:  s(body.nextContact) || null,
    monthlyFee:   body.monthlyFee != null ? parseFloat(body.monthlyFee) || null : null,
    totalPaid:    body.totalPaid != null ? parseFloat(body.totalPaid) || null : null,
    notes:        s(body.notes),
    manager:      s(body.manager),
    teacher:      s(body.teacher),
    schedule:     s(body.schedule),
    scheduleDays: Array.isArray(body.scheduleDays) ? body.scheduleDays : [],
    lessonType:   s(body.lessonType) || null,
    city:         s(body.city),
  };
}

// Partial sanitize — used for PATCH. Only processes fields actually present in body,
// so a single-field inline save does not overwrite every other field.
function sanitizeClientPatch(body) {
  const s = v => sanitize(v);
  const p = {};
  if ('name'         in body) p.name         = s(body.name);
  if ('age'          in body) p.age          = body.age !== '' && body.age != null ? parseInt(body.age) || null : null;
  if ('course'       in body) p.course       = s(body.course) || null;
  if ('phone'        in body) p.phone        = s(body.phone);
  if ('email'        in body) p.email        = s(body.email) || null;
  if ('status'       in body) p.status       = s(body.status);
  if ('source'       in body) p.source       = s(body.source);
  if ('enrolledDate' in body) p.enrolledDate = s(body.enrolledDate) || null;
  if ('trialDate'    in body) p.trialDate    = s(body.trialDate) || null;
  if ('lastContact'  in body) p.lastContact  = s(body.lastContact) || null;
  if ('nextContact'  in body) p.nextContact  = s(body.nextContact) || null;
  if ('monthlyFee'   in body) p.monthlyFee   = body.monthlyFee !== '' && body.monthlyFee != null ? parseFloat(body.monthlyFee) || null : null;
  if ('totalPaid'    in body) p.totalPaid    = body.totalPaid !== '' && body.totalPaid != null ? parseFloat(body.totalPaid) || null : null;
  if ('notes'        in body) p.notes        = s(body.notes);
  if ('manager'      in body) p.manager      = s(body.manager);
  if ('teacher'      in body) p.teacher      = s(body.teacher);
  if ('schedule'     in body) p.schedule     = s(body.schedule);
  if ('scheduleDays' in body) p.scheduleDays = Array.isArray(body.scheduleDays) ? body.scheduleDays : [];
  if ('lessonType'   in body) p.lessonType   = s(body.lessonType) || null;
  if ('city'         in body) p.city         = s(body.city);
  return p;
}

app.get('/api/clients', adminLimiter, requireAdmin, (req, res) => {
  res.json({ success: true, clients: clientsDb.getAll(), stats: clientsDb.getStats() });
});

app.post('/api/clients', adminLimiter, requireAdmin, (req, res) => {
  const data = sanitizeClient(req.body);
  if (!data.name || data.name.length < 2) return res.status(400).json({ error: 'Вкажіть ім\'я' });
  const client = clientsDb.create(data);
  res.status(201).json({ success: true, client });
});

app.patch('/api/clients/:id', adminLimiter, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const before = clientsDb.getById(id);
  if (!before) return res.status(404).json({ error: 'Not found' });
  const data = sanitizeClientPatch(req.body);
  const client = clientsDb.update(id, data);
  if (!client) return res.status(404).json({ error: 'Not found' });

  // Sync name change → monthly-payments + matching lead
  if (data.name && data.name !== before.name) {
    try {
      monthlyPayDb.syncClientName(id, data.name);
    } catch (e) { console.error('[SYNC client→payments]', e.message); }
    try {
      const matchPhone = client.phone || '';
      const matchLead = matchPhone ? db.getByPhone(matchPhone) : null;
      if (matchLead) db.updateFields(matchLead.id, { child_name: data.name });
    } catch (e) { console.error('[SYNC client→lead]', e.message); }
  }
  // Sync phone change → matching lead
  if (data.phone && data.phone !== before.phone) {
    try {
      const matchLead = db.getByPhone(before.phone);
      if (matchLead) db.updateFields(matchLead.id, { phone: data.phone });
    } catch (e) { console.error('[SYNC client phone→lead]', e.message); }
  }

  res.json({ success: true, client });
});

app.delete('/api/clients/:id', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const ok = clientsDb.delete(id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// ── ALERTS API ────────────────────────────────────────────────────────────────
function parseUkDate(s) {
  if (!s) return null;
  const [datePart, timePart] = String(s).split(', ');
  if (!datePart) return null;
  const [day, month, year] = datePart.split('.');
  if (!year) return null;
  return new Date(`${year}-${month}-${day}T${timePart || '00:00:00'}`);
}

app.get('/api/alerts', adminLimiter, requireAdmin, (req, res) => {
  const leads   = db.getAllLeads();
  const clients = clientsDb.getAll();
  const now     = Date.now();
  const H2      = 2  * 60 * 60 * 1000;
  const D3      = 3  * 24 * 60 * 60 * 1000;
  const D7      = 7  * 24 * 60 * 60 * 1000;
  const D30     = 30 * 24 * 60 * 60 * 1000;
  const alerts  = [];

  // 1. New leads not contacted > 2h
  const uncontacted = leads.filter(l => {
    if (l.status !== 'new') return false;
    const d = parseUkDate(l.created_at);
    return d && (now - d.getTime()) > H2;
  });
  if (uncontacted.length) alerts.push({
    type: 'leads_uncontacted', severity: 'high', count: uncontacted.length,
    message: `${uncontacted.length} нових заявок не прозвонені більше 2 годин`,
    hint: 'Зателефонуйте негайно — шанс конверсії падає з кожною годиною',
    ids: uncontacted.map(l => l.id), tab: 'leads',
  });

  // 2. Leads in contacted/trial_scheduled > 3 days without update
  const stale = leads.filter(l => {
    if (!['contacted', 'trial_scheduled'].includes(l.status)) return false;
    const d = parseUkDate(l.updated_at);
    return d && (now - d.getTime()) > D3;
  });
  if (stale.length) alerts.push({
    type: 'leads_stale', severity: 'medium', count: stale.length,
    message: `${stale.length} заявок без оновлення більше 3 днів`,
    hint: 'Перенабрати — можливо, клієнт передумав або забув',
    ids: stale.map(l => l.id), tab: 'leads',
  });

  // 3. Trial scheduled > 7 days not moved to enrolled
  const trialPending = leads.filter(l => {
    if (l.status !== 'trial_scheduled') return false;
    const d = parseUkDate(l.updated_at);
    return d && (now - d.getTime()) > D7;
  });
  if (trialPending.length) alerts.push({
    type: 'leads_trial_pending', severity: 'medium', count: trialPending.length,
    message: `${trialPending.length} пробних уроків не завершено записом`,
    hint: 'З\'ясуйте результат пробного уроку та запропонуйте запис',
    ids: trialPending.map(l => l.id), tab: 'leads',
  });

  // 4. Clients with overdue nextContact
  const overdueClients = clients.filter(c => {
    if (!c.nextContact || !['active','trial','paused'].includes(c.status)) return false;
    return new Date(c.nextContact) < new Date();
  });
  if (overdueClients.length) alerts.push({
    type: 'clients_overdue', severity: 'medium', count: overdueClients.length,
    message: `${overdueClients.length} клієнтів — прострочений дзвінок`,
    hint: 'Дата наступного контакту вже минула — зателефонуйте сьогодні',
    ids: overdueClients.map(c => c.id), tab: 'clients',
  });

  // 5. Paused clients > 30 days
  const longPaused = clients.filter(c => {
    if (c.status !== 'paused') return false;
    const d = new Date(c.updatedAt);
    return !isNaN(d) && (now - d.getTime()) > D30;
  });
  if (longPaused.length) alerts.push({
    type: 'clients_paused', severity: 'low', count: longPaused.length,
    message: `${longPaused.length} клієнтів на паузі більше 30 днів`,
    hint: 'Нагадайте про себе — після відпустки або канікул добре "утеплити" контакт',
    ids: longPaused.map(c => c.id), tab: 'clients',
  });

  const total = alerts.reduce((s, a) => s + a.count, 0);
  res.json({ success: true, alerts, total });
});

// ── CSV IMPORT API ────────────────────────────────────────────────────────────
app.post('/api/leads/import', adminLimiter, requireAdmin, (req, res) => {
  const rows = req.body;
  if (!Array.isArray(rows)) return res.status(400).json({ error: 'Expected array' });
  let imported = 0;
  const errors = [];
  rows.forEach((row, i) => {
    try {
      const name = sanitize(row.name || row.child_name || '');
      const phone = sanitize(row.phone || '');
      if (name.length >= 2 && phone) {
        db.insertLead({
          child_name: name,
          age:    row.age ? parseInt(row.age) || null : null,
          course: sanitize(row.course) || null,
          phone,
          email:  sanitize(row.email) || null,
        });
        imported++;
      }
    } catch (e) { errors.push(`Row ${i}: ${e.message}`); }
  });
  res.json({ success: true, imported, errors });
});

app.post('/api/clients/import', adminLimiter, requireAdmin, (req, res) => {
  const rows = req.body;
  if (!Array.isArray(rows)) return res.status(400).json({ error: 'Expected array' });
  let imported = 0;
  const errors = [];
  rows.forEach((row, i) => {
    try {
      const name = sanitize(row.name || row.child_name || '');
      const phone = sanitize(row.phone || '');
      if (name.length >= 2 && phone) {
        clientsDb.create(sanitizeClient({ ...row, name, phone }));
        imported++;
      }
    } catch (e) { errors.push(`Row ${i}: ${e.message}`); }
  });
  res.json({ success: true, imported, errors });
});

// ── PAYMENTS API ─────────────────────────────────────────────────────────────
app.get('/api/payments', adminLimiter, requireAdmin, (req, res) => {
  const clientId = req.query.clientId ? parseInt(req.query.clientId) : null;
  res.json({ success: true, payments: paymentsDb.getAll(clientId) });
});

app.post('/api/payments', adminLimiter, requireAdmin, (req, res) => {
  const { clientId, amount, date, method, note } = req.body;
  if (!clientId) return res.status(400).json({ error: 'clientId обов\'язковий' });
  if (!amount || parseFloat(amount) <= 0) return res.status(400).json({ error: 'Сума має бути більше 0' });
  const payment = paymentsDb.create({
    clientId, amount, date: date || new Date().toISOString().slice(0, 10),
    method: sanitize(method || 'other'),
    note: sanitize(note || ''),
  });
  // Recalculate totalPaid for client from payment history
  const total = paymentsDb.getTotalForClient(parseInt(clientId));
  clientsDb.update(parseInt(clientId), { totalPaid: total });
  res.status(201).json({ success: true, payment });
});

app.delete('/api/payments/:id', adminLimiter, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const payment = paymentsDb.getById(id);
  if (!payment) return res.status(404).json({ error: 'Not found' });
  paymentsDb.delete(id);
  const total = paymentsDb.getTotalForClient(payment.clientId);
  clientsDb.update(payment.clientId, { totalPaid: total });
  res.json({ success: true });
});

// ── MONTHLY PAYMENTS API ─────────────────────────────────────────────────────
app.get('/api/monthly-payments', adminLimiter, requireAdmin, (req, res) => {
  res.json({ success: true, months: monthlyPayDb.getAllMonths() });
});

app.get('/api/monthly-payments/:ym', adminLimiter, requireAdmin, (req, res) => {
  const { ym } = req.params;
  if (!/^\d{4}-\d{2}$/.test(ym)) return res.status(400).json({ error: 'Format: YYYY-MM' });
  const records = monthlyPayDb.getMonth(ym);
  res.json({ success: true, ym, records: records || [] });
});

app.post('/api/monthly-payments/:ym', adminLimiter, requireAdmin, (req, res) => {
  const { ym } = req.params;
  if (!/^\d{4}-\d{2}$/.test(ym)) return res.status(400).json({ error: 'Format: YYYY-MM' });
  if (!Array.isArray(req.body.records)) return res.status(400).json({ error: 'records[] required' });
  const result = monthlyPayDb.createMonth(ym, req.body.records);
  res.status(result.alreadyExists ? 200 : 201).json({ success: true, ...result });
});

app.patch('/api/monthly-payments/:ym/:clientId', adminLimiter, requireAdmin, (req, res) => {
  const { ym, clientId } = req.params;
  const monthData = monthlyPayDb.getMonth(ym);
  if (!monthData) return res.status(404).json({ error: 'Month not found' });
  let record = monthlyPayDb.updateRecord(ym, clientId, req.body);
  if (!record) {
    // Record missing (client not yet in this month) — upsert it
    const client = clientsDb.getById(parseInt(clientId));
    record = monthlyPayDb.upsertRecord(ym, clientId, { clientName: client?.name || '', ...req.body });
  }
  if (!record) return res.status(500).json({ error: 'Failed' });
  res.json({ success: true, record });
});

// Upsert: create record if missing, update if exists (used for "virtual" rows added client-side)
app.put('/api/monthly-payments/:ym/:clientId', adminLimiter, requireAdmin, (req, res) => {
  const { ym, clientId } = req.params;
  if (!monthlyPayDb.getMonth(ym)) return res.status(404).json({ error: 'Month not found' });
  const client = clientsDb.getById(parseInt(clientId));
  // Always take clientName from DB if available — prevents stale/garbled values from client
  const data = { ...req.body, clientName: client?.name || req.body.clientName || '' };
  const record = monthlyPayDb.upsertRecord(ym, clientId, data);
  if (!record) return res.status(404).json({ error: 'Month not found' });
  res.status(200).json({ success: true, record });
});

app.delete('/api/monthly-payments/:ym/:clientId', adminLimiter, requireAdmin, (req, res) => {
  const { ym, clientId } = req.params;
  const ok = monthlyPayDb.removeRecord(ym, parseInt(clientId));
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// ── ATTENDANCE API ────────────────────────────────────────────────────────────
app.get('/api/attendance', adminLimiter, requireAdmin, (req, res) => {
  const year  = parseInt(req.query.year)  || new Date().getFullYear();
  const month = parseInt(req.query.month) || (new Date().getMonth() + 1);
  res.json({ success: true, year, month, data: attendanceDb.getMonth(year, month) });
});

app.post('/api/attendance', adminLimiter, requireAdmin, (req, res) => {
  const { clientId, date, status } = req.body;
  if (!clientId || !date) return res.status(400).json({ error: 'clientId та date обов\'язкові' });
  const ok = attendanceDb.setRecord(clientId, date, status || '');
  if (ok === false) return res.status(400).json({ error: 'Невірний статус' });
  res.json({ success: true });
});

// ── CONTENT CMS API ──────────────────────────────────────────────────────────
// Public: read all content
app.get('/api/content', (req, res) => {
  res.json(loadContent());
});

// Admin: update a section (pricing | faq | courses | modules)
app.put('/api/content/:section', adminLimiter, requireAdmin, (req, res) => {
  const { section } = req.params;
  const allowed = ['pricing', 'faq', 'courses', 'modules', 'seo'];
  if (!allowed.includes(section)) return res.status(400).json({ error: 'Unknown section' });
  const data = loadContent();
  data[section] = req.body;
  saveContent(data);
  res.json({ success: true, section });
});

// ── COURSES API ───────────────────────────────────────────────────────────────
// Public endpoint — landing page fetches it without auth
app.get('/api/courses', (req, res) => {
  const all = req.query.all === '1';
  res.json({ success: true, courses: all ? coursesDb.getAll() : coursesDb.getActive() });
});

app.post('/api/courses', adminLimiter, requireAdmin, (req, res) => {
  const course = coursesDb.create(req.body);
  if (!course) return res.status(409).json({ error: 'ID вже існує' });
  res.status(201).json({ success: true, course });
});

app.patch('/api/courses/:id', adminLimiter, requireAdmin, (req, res) => {
  if (!SAFE_ID_RE.test(req.params.id)) return res.status(400).json({ error: 'Invalid course ID' });
  const course = coursesDb.update(req.params.id, req.body);
  if (!course) return res.status(404).json({ error: 'Курс не знайдено' });
  res.json({ success: true, course });
});

app.delete('/api/courses/:id', adminLimiter, requireAdmin, (req, res) => {
  if (!SAFE_ID_RE.test(req.params.id)) return res.status(400).json({ error: 'Invalid course ID' });
  const ok = coursesDb.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Курс не знайдено' });
  res.json({ success: true });
});

// ── ARTICLES API ─────────────────────────────────────────────────────────────
// Public: latest active articles (for homepage + article pages)
app.get('/api/articles', (req, res) => {
  const all = req.query.all === '1';
  const list = all ? articlesDb.getAll() : articlesDb.getActive();
  res.json({ success: true, articles: list });
});

app.get('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const all = articlesDb.getAll();
  const article = all.find(a => a.id === id);
  if (!article) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true, article });
});

app.post('/api/articles', adminLimiter, requireAdmin, (req, res) => {
  const article = articlesDb.create(req.body);
  if (!article) return res.status(409).json({ error: 'Slug вже існує' });
  res.status(201).json({ success: true, article });
});

app.patch('/api/articles/:id', adminLimiter, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const article = articlesDb.update(id, req.body);
  if (!article) return res.status(404).json({ error: 'Статтю не знайдено' });
  res.json({ success: true, article });
});

app.delete('/api/articles/:id', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const ok = articlesDb.delete(id);
  if (!ok) return res.status(404).json({ error: 'Статтю не знайдено' });
  res.json({ success: true });
});

// ── REVIEWS API ───────────────────────────────────────────────────────────────
app.get('/api/reviews', (req, res) => {
  const token = req.headers['x-admin-token'];
  const isAdmin = (SUPERADMIN_TOKEN && token === SUPERADMIN_TOKEN) || !!adminsDb.findByToken(token);
  const reviews = isAdmin ? reviewsDb.getAll() : reviewsDb.getActive();
  res.json({ success: true, reviews });
});

app.post('/api/reviews', adminLimiter, requireAdmin, (req, res) => {
  const { name, initials, role, text, rating, active } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'name та text обов\'язкові' });
  const review = reviewsDb.create({ name: sanitize(name), initials: sanitize(initials), role: sanitize(role), text: sanitize(text), rating, active });
  res.status(201).json({ success: true, review });
});

app.patch('/api/reviews/:id', adminLimiter, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const { name, initials, role, text, rating, active } = req.body;
  const patch = {};
  if (name     !== undefined) patch.name     = sanitize(name);
  if (initials !== undefined) patch.initials = sanitize(initials);
  if (role     !== undefined) patch.role     = sanitize(role);
  if (text     !== undefined) patch.text     = sanitize(text);
  if (rating   !== undefined) patch.rating   = rating;
  if (active   !== undefined) patch.active   = active;
  const review = reviewsDb.update(id, patch);
  if (!review) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true, review });
});

app.delete('/api/reviews/:id', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id) || 0;
  const ok = reviewsDb.delete(id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

// ── MONOBANK PAYMENT ─────────────────────────────────────────────────────────

app.post('/api/payment/create', paymentLimiter, async (req, res) => {
  const amount = parseFloat(req.body.amount);
  if (!amount || amount < 1 || amount > 100000) {
    return res.status(400).json({ error: 'Невірна сума. Від 1 до 100 000 грн.' });
  }
  const description = sanitize(req.body.description) || 'Оплата навчання My Computer Academy';
  try {
    const invoice = await monoPay.createInvoice({ amountUah: amount, description });
    monoInvoicesDb.create({ invoiceId: invoice.invoiceId, amount, description });
    res.json({ success: true, pageUrl: invoice.pageUrl, invoiceId: invoice.invoiceId });
  } catch (err) {
    console.error('[PAYMENT CREATE]', err.message);
    res.status(502).json({ error: 'Не вдалося створити платіж. Спробуйте ще раз.' });
  }
});

app.post('/api/payment/webhook', (req, res) => {
  // Always acknowledge immediately — Monobank retries if no 2xx within 30s
  res.json({ status: 'ok' });

  const xSign = req.headers['x-sign'];
  const body  = req.body || {};

  // Signature verification
  const valid = monoPay.verifyWebhook(req.rawBody, xSign);
  if (!valid) {
    console.warn(`[MONO WEBHOOK] ⚠️  Invalid signature — invoiceId=${body.invoiceId}`);
    // Log but don't reject: may be first call before pubkey is cached
  }

  const { invoiceId, status, amount, finalAmount, reference } = body;
  const uah = (((finalAmount ?? amount) || 0) / 100).toFixed(2);

  console.log(`[MONO WEBHOOK] invoiceId=${invoiceId} status=${status} amount=${uah} UAH sign=${valid ? 'OK' : 'WARN'}`);

  // Persist all statuses
  const KNOWN = ['created', 'processing', 'hold', 'success', 'failure', 'expired', 'reversed'];
  if (invoiceId && KNOWN.includes(status)) {
    const rec = monoInvoicesDb.upsert({ invoiceId, status, amount, finalAmount, reference });
    if (status === 'success') {
      sendPaymentNotification({
        provider: 'mono',
        amount: finalAmount ?? amount,
        description: rec && rec.description,
        orderId: invoiceId,
        status,
      }).catch(() => {});
    }
  }
});

app.get('/payment/success', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'payment-success.html'));
});
app.get('/payment/fail', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'payment-fail.html'));
});

// ── WAYFORPAY ─────────────────────────────────────────────────────────────────

// Creates WayForPay invoice server-side and returns invoiceUrl; client redirects to it
app.post('/api/payment/wfp-create', paymentLimiter, async (req, res) => {
  const amount = parseFloat(req.body && req.body.amount);
  console.log(`[WFP CREATE] amount=${amount} body=${JSON.stringify(req.body)}`);
  if (!amount || amount < 1 || amount > 100000) {
    return res.status(400).json({ error: 'Невірна сума. Від 1 до 100 000 грн.' });
  }
  const description = sanitize(req.body.description) || 'Оплата навчання My Computer Academy';
  const orderRef    = `mca-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  try {
    const { invoiceUrl } = await wfp.createInvoice({ amountUah: amount, description, orderRef });
    res.json({ success: true, pageUrl: invoiceUrl });
  } catch (err) {
    console.error('[WFP CREATE ERROR]', err.message);
    res.status(502).json({ error: err.message });
  }
});

// WayForPay webhook (service URL)
app.post('/api/payment/wfp-webhook', (req, res) => {
  const body   = req.body || {};
  const valid  = wfp.verifyWebhook(body);
  const { orderReference, transactionStatus, amount, productName, reasonCode } = body;
  console.log(`[WFP WEBHOOK] order=${orderReference} status=${transactionStatus} amount=${amount} sign=${valid ? 'OK' : 'WARN'}`);
  // WayForPay requires a signed response
  res.json(wfp.buildWebhookResponse(orderReference, 'accept'));
  if (transactionStatus === 'Approved') {
    const desc = Array.isArray(productName) ? productName[0] : (productName || '');
    sendPaymentNotification({
      provider: 'wfp',
      amount: parseFloat(amount),
      description: desc,
      orderId: orderReference,
      status: transactionStatus,
    }).catch(() => {});
  }
});

// ── ARTICLE PAGES ─────────────────────────────────────────────────────────────
const ARTICLE_HTML_TPL = fs.readFileSync(path.join(__dirname, '..', 'article.html'), 'utf8');

app.get('/articles/:slug', (req, res) => {
  const { slug } = req.params;
  if (!SAFE_ID_RE.test(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));

  const article  = articlesDb.getBySlug(slug);
  if (!article) return res.sendFile(path.join(__dirname, '..', 'article.html'));

  const isRu     = req.query.lang === 'ru';
  const ru       = ARTICLES_RU[slug];
  const title    = (isRu && ru?.title) || article.title || 'Стаття';
  const excerpt  = truncateAtWord((isRu && ru?.excerpt) || article.excerpt, 160);
  const siteUrl  = 'https://mycomputer.education';
  const pageUrl  = `${siteUrl}/articles/${slug}`;
  const fullTitle = `${title} — My Computer Academy`;

  const publishedIso = article.publishedAt
    ? new Date(article.publishedAt).toISOString() : new Date().toISOString();

  const articleJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: fullTitle,
        description: excerpt,
        inLanguage: isRu ? 'ru' : 'uk',
        isPartOf: { '@id': `${siteUrl}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, item: { '@id': `${siteUrl}/`, name: 'Головна' } },
          { '@type': 'ListItem', position: 2, item: { '@id': `${siteUrl}/articles`, name: 'Статті' } },
          { '@type': 'ListItem', position: 3, item: { '@id': pageUrl, name: title } },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: title,
        description: excerpt,
        url: pageUrl,
        inLanguage: isRu ? 'ru' : 'uk',
        datePublished: publishedIso,
        dateModified: publishedIso,
        author: {
          '@type': 'Organization',
          name: article.author || 'My Computer Academy',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${siteUrl}/#organization`,
          name: 'My Computer Academy',
          url: siteUrl,
          logo: { '@type': 'ImageObject', url: `${siteUrl}/android-chrome-192x192.png` },
        },
        isPartOf: { '@id': `${pageUrl}#webpage` },
        image: `${siteUrl}/og-image.png`,
      },
    ],
  });

  const hreflangBlock = ru ? `
  <link rel="alternate" hreflang="uk" href="${pageUrl}"/>
  <link rel="alternate" hreflang="ru" href="${pageUrl}?lang=ru"/>
  <link rel="alternate" hreflang="x-default" href="${pageUrl}"/>` : '';

  let html = ARTICLE_HTML_TPL
    .replace(
      '<title id="pageTitle">Стаття — My Computer Academy</title>',
      `<title id="pageTitle">${escHtml(fullTitle)}</title>`
    )
    .replace(
      '<meta name="description" id="pageDesc" content="Корисні статті про програмування для дітей від My Computer Academy"/>',
      `<meta name="description" id="pageDesc" content="${escHtml(excerpt) || 'Корисні статті про програмування для дітей від My Computer Academy'}"/>
  <link rel="canonical" href="${pageUrl}${isRu ? '?lang=ru' : ''}"/>${hreflangBlock}
  <meta property="og:title" content="${escHtml(fullTitle)}"/>
  <meta property="og:description" content="${escHtml(excerpt)}"/>
  <meta property="og:url" content="${pageUrl}"/>
  <meta property="og:type" content="article"/>
  <meta property="og:image" content="https://mycomputer.education/og-image.png"/>
  <meta property="og:locale" content="${isRu ? 'ru_RU' : 'uk_UA'}"/>
  <script type="application/ld+json">${articleJsonLd}</script>`
    )
    .replace(
      '>Стаття — My Computer Academy</h1>',
      `>${escHtml(title)}</h1>`
    );

  if (isRu) html = html.replace('<html lang="uk">', '<html lang="ru">');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── COURSE PAGES ──────────────────────────────────────────────────────────────
const DYNAMIC_COURSE_SLUGS = new Set(['scratch', 'python', 'roblox', 'web', 'construct', 'graphic', 'pc', 'blog', 'minecraft']);
const COURSE_HTML_TPL = fs.readFileSync(path.join(__dirname, '..', 'course.html'), 'utf8');

const COURSE_SEO_TITLES = {
  scratch:   'Курс Scratch для дітей — My Computer Academy',
  python:    'Курс Python для дітей — My Computer Academy',
  roblox:    'Курс Roblox Studio для дітей — My Computer Academy',
  minecraft: 'Курс Minecraft для дітей — My Computer Academy',
  web:       'Курс Веб-розробки для підлітків — My Computer Academy',
  construct: 'Курс розробки ігор Construct 3 — My Computer Academy',
  graphic:   'Курс Графіки та анімації — My Computer Academy',
  pc:        'Базовий курс ПК для дітей — My Computer Academy',
  blog:      'Курс Створення блогу та сайту — My Computer Academy',
};

// ── COURSE SEO DESCRIPTIONS (140-160 chars) ───────────────────────────────────
const COURSE_SEO_DESCS = {
  scratch:   'Курс Scratch для дітей 6–10 років у Дніпрі. Ігрове програмування: анімації, ігри, логіка. Онлайн та офлайн у малих групах до 5 учнів. Перший урок безкоштовно.',
  python:    'Курс Python для дітей 10–14 років у Дніпрі. Ігри на Pygame, Telegram-боти, реальний код. Онлайн та офлайн у малих групах до 5 учнів. Перший урок безкоштовно.',
  roblox:    'Курс Roblox Studio для дітей 9–14 років у Дніпрі. Lua, 3D-дизайн, власна гра для мільйонів. Онлайн та офлайн у малих групах до 5 учнів. Перший урок безкоштовно.',
  minecraft: 'Курс Minecraft Education для дітей 9–14 років у Дніпрі. Python для Minecraft, автобудівництво, власний мод. Онлайн та офлайн у групах до 5 учнів. Перший урок безкоштовно.',
  web:       'Курс веб-розробки HTML, CSS, JavaScript для підлітків 12–16 років у Дніпрі. Від першої сторінки до портфоліо-сайту. Онлайн та офлайн у групах до 5 учнів.',
  construct: 'Курс Construct 3 для дітей 10–14 років у Дніпрі. Платформери та аркади без коду, публікація гри онлайн. Онлайн та офлайн у малих групах до 5 учнів.',
  graphic:   'Курс цифрової графіки та анімації для дітей 6–12 років у Дніпрі. Растрова та векторна графіка, 3D, анімація персонажів. Онлайн та офлайн у групах до 5 учнів.',
  pc:        'Базовий курс комп\'ютерної грамотності для дітей 6–10 років у Дніпрі. Клавіатура, Word, безпека в інтернеті. Онлайн та офлайн у малих групах до 5 учнів.',
  blog:      'Курс створення блогу та сайту для підлітків 12–17 років у Дніпрі. HTML, CSS, SEO, публікація з доменом. Онлайн та офлайн у малих групах до 5 учнів.',
};

// ── COURSE SEO TEXT BLOCKS (visually-hidden, crawler-visible) ─────────────────
const COURSE_SEO_TEXTS = {
  scratch:   'Курс Scratch для дітей у Дніпрі від школи програмування My Computer Academy. Scratch — ідеальна перша мова для дітей від 6 років: блоки замість коду, анімовані персонажі, власні ігри та інтерактивні проєкти. Учні розвивають алгоритмічне мислення, логіку та творчість одночасно. Заняття в малих групах до 5 учнів гарантують індивідуальну увагу. Зручний розклад: 1–2 рази на тиждень по 90 хвилин. Онлайн через Zoom або офлайн у Дніпрі. Курс для дітей 6–10 років, тривалість 3 місяці, 24 заняття. Перший урок безкоштовно — запишіться вже сьогодні.',
  python:    'Курс Python для дітей та підлітків у Дніпрі від My Computer Academy. Python — одна з найпопулярніших мов у світі, яку використовують Google, NASA та Instagram. Учні 10–14 років пишуть реальний код: ігри на Pygame, автоматизація, Telegram-бот у фіналі. Алгоритми, функції, цикли, робота з файлами та API. Мала група до 5 учнів, онлайн та офлайн у Дніпрі. Тривалість — 4 місяці, 32 заняття. Перший урок безкоштовно.',
  roblox:    'Курс Roblox Studio для дітей у Дніпрі від My Computer Academy. Roblox — платформа з мільярдами гравців. Учні 9–14 років вивчають Lua, будують 3D-світи з фізикою та у фіналі публікують гру для реальних гравців. Курс розвиває просторове мислення та логіку. Мала група до 5 учнів, 24 уроки за 3 місяці. Онлайн та офлайн у Дніпрі. Перший урок безкоштовно.',
  minecraft: 'Курс Minecraft Education для дітей у Дніпрі від My Computer Academy. Учні 9–14 років, які люблять Minecraft, навчаються Python через улюблену гру. Бібліотека mcpi: автоматизація будівництва, структури кодом, алгоритми. Власний мод у фіналі курсу. Шлях від гравця до розробника. Мала група до 5 учнів, 24 заняття за 3 місяці. Онлайн та офлайн у Дніпрі. Перший урок безкоштовно.',
  web:       'Курс веб-розробки для підлітків у Дніпрі від My Computer Academy. Учні 12–16 років навчаються HTML5, CSS3, Flexbox, Grid, JavaScript з нуля. Від першої сторінки до адаптивного портфоліо-сайту з інтерактивними елементами. Реальні проєкти на кожному занятті. Веб-розробка — одна з найбільш затребуваних IT-спеціальностей. Онлайн та офлайн у Дніпрі, мала група до 5 учнів, 40 занять за 5 місяців. Перший урок безкоштовно.',
  construct: 'Курс розробки ігор на Construct 3 для дітей у Дніпрі від My Computer Academy. Учні 10–14 років створюють платформери, аркади та стрілялки через систему подій і дій — без написання коду. Ігрова логіка, фізика, анімація та звукові ефекти. У фіналі — власна гра опублікована в інтернеті. Онлайн та офлайн у Дніпрі, групи до 5 учнів, 24 уроки за 3 місяці. Перший урок безкоштовно.',
  graphic:   'Курс цифрової графіки та анімації для дітей у Дніпрі від My Computer Academy. Учні 6–12 років вивчають растрову та векторну графіку, цифровий малюнок, кольорознавство, анімацію кадр за кадром та основи 3D. Курс для юних художників і дизайнерів. Власний анімований проєкт у фіналі. Онлайн та офлайн у Дніпрі, мала група до 5 учнів, 24 уроки за 3 місяці. Перший урок безкоштовно.',
  pc:        'Базовий курс роботи з комп\'ютером для дітей у Дніпрі від My Computer Academy. Курс для дітей 6–10 років: клавіатура, миша, файлова система Windows, Word, Paint, безпека в інтернеті, захист від шкідливих сайтів. Швидкий набір тексту сліпим методом. Ідеальний старт у світ цифрових технологій. Онлайн та офлайн у Дніпрі, мала група до 5 учнів, 16 занять за 2 місяці. Перший урок безкоштовно.',
  blog:      'Курс створення блогу та особистого сайту для підлітків у Дніпрі від My Computer Academy. Учні 12–17 років навчаються HTML, CSS та основам SEO, щоб створити власний онлайн-простір: блог, портфоліо або творчу сторінку. Без складних фреймворків — чистий HTML і CSS, структура, дизайн, публікація з доменом. Онлайн та офлайн у Дніпрі, мала група до 5 учнів, 16 занять за 2 місяці. Перший урок безкоштовно.',
};

app.get('/courses/:slug', (req, res) => {
  const { slug } = req.params;
  if (!SAFE_ID_RE.test(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));

  const course = coursesDb.getAll().find(c => c.id === slug);
  if (!course && !DYNAMIC_COURSE_SLUGS.has(slug)) {
    // Unknown slug: try static file fallback, then 404
    const staticPath = path.join(__dirname, '..', 'courses', `${slug}.html`);
    if (fs.existsSync(staticPath)) return res.sendFile(staticPath);
    return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
  }

  const isRu = req.query.lang === 'ru';
  const name      = isRu
    ? (course ? (course.name_ru || COURSES_RU[slug]?.name || course.name) : 'Курс')
    : (course ? course.name : 'Курс');
  const seoTitle  = isRu
    ? (COURSE_SEO_TITLES_RU[slug] || `${name} — My Computer Academy`)
    : (COURSE_SEO_TITLES[slug] || `${name} — My Computer Academy`);
  const rawDesc = course && course.description
    ? (isRu ? (course.description_ru || COURSES_RU[slug]?.description || course.description) : course.description)
    : (isRu ? 'Детальная информация о курсе программирования для детей в My Computer Academy' : 'Детальна інформація про курс програмування для дітей у My Computer Academy');
  // Use hardcoded SEO desc (140-160 chars) when DB description is too short
  const desc = rawDesc.length >= 130
    ? truncateAtWord(rawDesc, 160)
    : ((isRu ? COURSE_SEO_DESCS_RU[slug] : COURSE_SEO_DESCS[slug]) || truncateAtWord(rawDesc, 160));
  const siteUrl = 'https://mycomputer.education';
  const pageUrl = `${siteUrl}/courses/${slug}`;
  const hasRuCourse = !!(COURSES_RU[slug] || CURRICULA_RU[slug]);

  const durationMonths = course && course.duration
    ? parseInt(course.duration) || null : null;
  const isoPeriod = durationMonths ? `P${durationMonths}M` : null;

  const faqData = loadContent().faq || [];
  const graphItems = [
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}/#webpage`,
      url: pageUrl,
      name: seoTitle,
      description: desc,
      inLanguage: isRu ? 'ru' : 'uk',
      isPartOf: { '@id': `${siteUrl}/#website` },
      breadcrumb: { '@id': `${pageUrl}/#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, item: { '@id': siteUrl + '/', name: isRu ? 'Главная' : 'Головна' } },
        { '@type': 'ListItem', position: 2, item: { '@id': siteUrl + '/#courses', name: isRu ? 'Курсы' : 'Курси' } },
        { '@type': 'ListItem', position: 3, item: { '@id': pageUrl, name } },
      ],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'My Computer Academy',
      url: siteUrl,
      telephone: '+380954624672',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'просп. Олександра Поля, 28',
        addressLocality: 'Дніпро',
        postalCode: '49101',
        addressCountry: 'UA',
      },
    },
    {
      '@type': 'Course',
      '@id': `${pageUrl}/#course`,
      name,
      description: rawDesc,
      url: pageUrl,
      inLanguage: isRu ? 'ru' : 'uk',
      educationalLevel: 'Beginner',
      ...(course && course.age ? { typicalAgeRange: course.age } : {}),
      provider: { '@id': `${siteUrl}/#organization` },
      ...(isoPeriod ? {
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          duration: isoPeriod,
          inLanguage: isRu ? 'ru' : 'uk',
        }
      } : {}),
      offers: {
        '@type': 'Offer',
        priceCurrency: 'UAH',
        availability: 'https://schema.org/InStock',
        url: `${siteUrl}/#contact`,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        reviewCount: '127',
      },
    },
  ];

  if (faqData.length) {
    graphItems.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: faqData.slice(0, 5).map(f => ({
        '@type': 'Question',
        name: f.question.ua,
        acceptedAnswer: { '@type': 'Answer', text: f.answer.ua },
      })),
    });
  }

  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graphItems });

  const hreflangBlock = hasRuCourse ? `
  <link rel="alternate" hreflang="uk" href="${pageUrl}"/>
  <link rel="alternate" hreflang="ru" href="${pageUrl}?lang=ru"/>
  <link rel="alternate" hreflang="x-default" href="${pageUrl}"/>` : '';

  let html = COURSE_HTML_TPL
    .replace(
      '<title>Курс — My Computer Academy</title>',
      `<title>${escHtml(seoTitle)}</title>`
    )
    .replace(
      '<meta name="description" content="Детальна інформація про курс програмування для дітей у My Computer Academy"/>',
      `<meta name="description" content="${escHtml(desc)}"/>
  <link rel="canonical" href="${pageUrl}${isRu ? '?lang=ru' : ''}"/>${hreflangBlock}
  <meta property="og:title" content="${escHtml(seoTitle)}"/>
  <meta property="og:description" content="${escHtml(desc)}"/>
  <meta property="og:url" content="${pageUrl}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="https://mycomputer.education/og-image.png"/>
  <meta property="og:locale" content="${isRu ? 'ru_RU' : 'uk_UA'}"/>`
    )
    .replace(
      '>Курс програмування для дітей — My Computer Academy</h1>',
      `>${escHtml(name)}</h1>`
    )
    .replace(
      '<!-- SEO_BLOCK_COURSE -->',
      (() => {
        const seoTextSrc = isRu ? COURSE_SEO_TEXTS_RU[slug] : COURSE_SEO_TEXTS[slug];
        const seoText = seoTextSrc ? `<p>${escHtml(seoTextSrc)}</p>` : '';
        const uaItems = CURRICULA[slug] || [];
        const currHtml = uaItems.length
          ? `<ul>${uaItems.map((m, i) => {
              const ruItem = isRu ? CURRICULA_RU[slug]?.[i] : null;
              const num   = isRu ? (m.num === 'Фінал' ? 'Финал' : m.num) : m.num;
              const title = ruItem?.title || m.title;
              const desc  = ruItem?.desc  || m.desc;
              return `<li><strong>${escHtml(num)}: ${escHtml(title)}</strong> — ${escHtml(desc)}</li>`;
            }).join('')}</ul>`
          : '';
        return (seoText || currHtml)
          ? `<div class="vh-seo" aria-hidden="true">${seoText}${currHtml}</div>`
          : '';
      })()
    )
    .replace('</head>', `  <script type="application/ld+json">${jsonLd}</script>\n</head>`);

  if (isRu) html = html.replace('<html lang="uk">', '<html lang="ru">');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── TEST / DEBUG ROUTES ───────────────────────────────────────────────────────
app.get('/503', (req, res) => {
  res.status(503).sendFile(path.join(__dirname, '..', '503.html'));
});
app.get('/test-500', (req, res, next) => {
  next(new Error('Test 500 error'));
});

// Redirect legacy /course/:id URLs (old URL pattern) to homepage
app.get(['/course/:id', '/course/:id/'], (req, res) => {
  res.redirect(301, '/');
});

// 404 — everything else that wasn't caught by static files or API
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
});

// 500 — unhandled server errors
app.use((err, req, res, _next) => {
  console.error('[SERVER ERROR]', err);
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: 'Internal server error' });
  }
  res.status(500).sendFile(path.join(__dirname, '..', '500.html'));
});

// ── START ─────────────────────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`\n  ╔═══════════════════════════════════╗`);
  console.log(`  ║  My Computer Academy              ║`);
  console.log(`  ║  http://localhost:${PORT}             ║`);
  console.log(`  ╚═══════════════════════════════════╝\n`);
  console.log(`  Admin UI: http://localhost:${PORT}/admin`);
  console.log(`  Leads: POST /api/leads\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  ❌ Порт ${PORT} уже занят другим процессом.`);
    console.error(`  Завершите его командой:`);
    console.error(`  PowerShell: Get-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess | Stop-Process -Force`);
    console.error(`  Затем запустите npm start снова.\n`);
    process.exit(1);
  } else {
    throw err;
  }
});

process.on('SIGINT',  () => { db.close(); process.exit(0); });
process.on('SIGTERM', () => { db.close(); process.exit(0); });
