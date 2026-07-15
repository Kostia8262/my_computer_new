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
const crypto       = require('crypto');
const sqliteDb       = require('./db');
require('./migrate-json-to-sqlite').run(); // one-time JSON→SQLite import, no-op after first boot
const db             = require('./database');
const adminsDb       = require('./admins');
const clientsDb      = require('./clients');
const paymentsDb     = require('./payments');
const attendanceDb   = require('./attendance');
const monthlyPayDb   = require('./monthly-payments');
const coursesDb      = require('./courses');
const articlesDb     = require('./articles');
const reviewsDb      = require('./reviews');
const { sendLeadNotification } = require('./mailer');
const monoPay = require('./mono-pay');
const wfp     = require('./wayforpay');

// Defined here (not further down where they used to live as plain fs
// functions) because the startup seed IIFE below calls loadContent()/
// saveContent() before that later point in the file would have run —
// a const in the temporal dead zone throws if referenced first.
const selContent = sqliteDb.prepare('SELECT data FROM content_kv WHERE id = 1');
const upsertContent = sqliteDb.prepare(`INSERT INTO content_kv (id, data) VALUES (1, ?)
  ON CONFLICT(id) DO UPDATE SET data = excluded.data`);
function loadContent() {
  const row = selContent.get();
  try { return row ? JSON.parse(row.data) : {}; } catch { return {}; }
}
function saveContent(data) { upsertContent.run(JSON.stringify(data)); }

// ── CONTENT SEED DATA (matches what's already live in index.html) ────────────
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
        label: 'Головна сторінка (roblox.mycomputer.education)',
        heading: 'Курс Roblox Studio для дітей — My Computer Academy',
        text: 'Курс розробки ігор у Roblox Studio для дітей 9–14 років у My Computer Academy: мова Lua, 3D-світи, публікація власної гри. Малі групи до 5 осіб, перший урок безкоштовно.',
      },
    ],
  },
  faq: [
    { id:1, question:{ ua:'З якого віку починають курс Roblox Studio?', ru:'С какого возраста начинают курс Roblox Studio?' }, answer:{ ua:'Roblox Studio — для дітей від 9 до 14 років. Для 9–11 — будуємо ігровий світ та перші скрипти на Lua. Для 11–14 — DataStore, монетизація та публікація власної гри. Дитина публікує свою гру вже в середині курсу!', ru:'Roblox Studio — для детей от 9 до 14 лет. Для 9–11 — строим игровой мир и первые скрипты на Lua. Для 11–14 — DataStore, монетизация и публикация собственной игры. Ребёнок публикует свою игру уже в середине курса!' } },
    { id:2, question:{ ua:'Чи потрібні знання програмування?',  ru:'Нужны ли знания программирования?' },        answer:{ ua:'Абсолютно ніяких. Всі курси починаються з нуля. Потрібен тільки комп\'ютер з інтернетом.', ru:'Абсолютно никаких. Все курсы начинаются с нуля. Нужен только компьютер с интернетом.' } },
    { id:3, question:{ ua:'Як проходять онлайн-заняття?',       ru:'Как проходят онлайн-занятия?' },             answer:{ ua:'Заняття у Zoom або Google Meet. Викладач бачить екран дитини, допомагає в реальному часі. Групи до 5 осіб — кожен отримує увагу.', ru:'Занятия в Zoom или Google Meet. Преподаватель видит экран ребёнка, помогает в реальном времени. Группы до 5 человек — каждый получает внимание.' } },
    { id:4, question:{ ua:'Що якщо дитина пропустить заняття?', ru:'Что если ребёнок пропустит занятие?' },      answer:{ ua:'Всі заняття записуються. Пропущений урок можна відпрацювати у інший день, а викладач відповість на питання в чаті.', ru:'Все занятия записываются. Пропущенный урок можно отработать в другой день, а преподаватель ответит на вопросы в чате.' } },
    { id:5, question:{ ua:'Скільки коштують курси?',            ru:'Сколько стоят курсы?' },                     answer:{ ua:'Вартість залежить від курсу та формату. Залиш заявку — менеджер надішле прайс та розповість про знижки. Перший урок безкоштовно.', ru:'Стоимость зависит от курса и формата. Оставьте заявку — менеджер пришлёт прайс и расскажет о скидках. Первый урок бесплатно.' } },
    { id:6, question:{ ua:'Скільки тривають курси?',            ru:'Сколько длятся курсы?' },                    answer:{ ua:'Дитячі курси тривають 9–18 місяців при 1–2 заняттях на тиждень. Конкретна тривалість залежить від напрямку та навантаження.', ru:'Детские курсы длятся 9–18 месяцев при 1–2 занятиях в неделю. Конкретная длительность зависит от направления и нагрузки.' } },
    { id:7, question:{ ua:'Які є варіанти оплати?',             ru:'Какие есть варианты оплаты?' },              answer:{ ua:'Ви можете скористатись прямою оплатою на рахунок ФОП, оплатою через Google Pay, Apple Pay, переказом через платіжний шлюз. Якщо ви за кордоном — розрахуємо вартість у зручній валюті.', ru:'Вы можете воспользоваться прямой оплатой на счет ФЛП, оплатой через Google Pay, Apple Pay, переводом через платежный шлюз. Если вы за границей – рассчитаем стоимость в удобной валюте.' } },
  ],
  modules: {
    hero: true, courses: true, 'how-it-works': true, about: true, stats: true,
    pricing: true, certificate: true, partners: true, reviews: true,
    articles: true, faq: true, contact: true,
  },
};

// ── STARTUP SEED (teachers + clients + course) ────────────────────────────────
(function seedTestData() {
  try {
    if (!coursesDb.getAll().length) {
      coursesDb.create({ id: 'roblox', name: 'Roblox: розробка ігор', emoji: '🎮', age: '9–14 років', age_group: '10-14', duration: '3 місяці', lessonsCount: 24, groupSize: 5, price: 3600, color: '#ef4444', description: 'Мова Lua, 3D-дизайн власних світів та публікація гри для мільйонів гравців платформи.' });
      console.log('✅  Seeded roblox course');
    }
    if (!coursesDb.getAll().some(c => c.id === 'roblox-9-11')) {
      const shared = { duration: '3 місяці', groupSize: 5, price: 3600, color: '#ef4444', active: true };
      coursesDb.create({ id: 'roblox-9-11', name: 'Roblox Старт → Будівник', emoji: '🌍', age: '9–11 років', age_group: '9-11', description: 'Від першого об\'єкта до власної публічної гри з механіками', lessonsCount: 31, ...shared, curriculum: [
        { num: '01', title: 'Знайомство з Roblox Studio', desc: 'Інтерфейс, BaseParts, матеріали, освітлення, перший об\'єкт.' },
        { num: '02', title: 'Будуємо ігровий світ', desc: 'Terrain, вода, ліс, острів — перша власна карта у Roblox.' },
        { num: '03', title: 'Деталі та декор', desc: 'Grouping, Union, Negate — складні форми. Кольорові теми та стилізація.' },
        { num: '04', title: 'Перший скрипт у Lua', desc: 'Script vs LocalScript, print(), змінні, перший автоматичний об\'єкт.' },
        { num: '05', title: 'Умови та цикли в Lua', desc: 'if/then/else, for, while — логіка для ігрових механік.' },
        { num: '06', title: 'Взаємодія гравця з об\'єктами', desc: 'Торкнутися частини → подія. Кнопки, двері, пастки з ефектами.' },
        { num: '07', title: 'Звук та ParticleEmitter', desc: 'Додаємо звуки подій, вогонь, дощ, іскри — атмосфера гри.' },
        { num: '08', title: 'GUI: інтерфейс гравця', desc: 'ScreenGui, TextLabel, ImageLabel — перший ігровий HUD.' },
        { num: '09', title: 'Очки та лідерборд', desc: 'IntValue, leaderboard, збереження очок під час сесії.' },
        { num: '10', title: 'Функції та модульність', desc: 'Пишемо власні функції, ділимо код на частини, уникаємо повторень.' },
        { num: '11', title: 'Checkpoint та SpawnLocation', desc: 'Контрольні точки, збереження позиції, старт-зони на карті.' },
        { num: '12', title: 'NPC та анімації', desc: 'Humanoid, простий NPC-охоронець, патрулювання без плагінів.' },
        { num: '13', title: 'Зброя та шкода', desc: 'Tool, нанесення Humanoid.Health, ефекти удару та смерті.' },
        { num: '14', title: 'Збирання предметів', desc: 'Pickup-механіка, інвентар у таблиці, відображення у GUI.' },
        { num: '15', title: 'Таймер та раунди', desc: 'Countdown у GUI, переможець раунду, перезапуск карти.' },
        { num: '16', title: 'Телепортація та зони', desc: 'TeleportService, перехід між регіонами, секретні кімнати.' },
        { num: '17', title: 'Команди та кольори гравців', desc: 'Teams, BrickColor по команді, підрахунок очок команд.' },
        { num: '18', title: 'Погода та день/ніч', desc: 'Lighting, ClockTime, динамічна зміна атмосфери за скриптом.' },
        { num: '19', title: 'Магазин за очки', desc: 'Внутрішня валюта, GUI-магазин, купівля предметів без DevProducts.' },
        { num: '20', title: 'Таблиці лідерів (багатокористувацька)', desc: 'Sync очок між гравцями, топ-5 на екрані, оновлення в реальному часі.' },
        { num: '21', title: 'Карта пригод: планування', desc: 'Ескіз власної гри: жанр, механіки, персонажі. Структура проекту.' },
        { num: '22', title: 'Карта пригод: світ та рівні', desc: 'Будуємо три зони карти, розставляємо NPC та предмети.' },
        { num: '23', title: 'Карта пригод: ігрова логіка', desc: 'Скрипти завдань, прогрес гравця, кінцева умова перемоги.' },
        { num: '24', title: 'Карта пригод: GUI та атмосфера', desc: 'Екран завантаження, HUD, звуки, ефекти частинок.' },
        { num: '25', title: 'Тестування та виправлення', desc: 'Playtest у Studio, пошук багів, рефакторинг скриптів.' },
        { num: '26', title: 'Оптимізація', desc: 'Anchored, стримінг, видалення зайвих об\'єктів — гра без лагів.' },
        { num: '27', title: 'Опис та іконка гри', desc: 'Game Page: назва, опис, thumbnail, жанр, вікові обмеження.' },
        { num: '28', title: 'Соціальні механіки', desc: 'Подяки, значки (Badges), запрошення друзів, Share-посилання.' },
        { num: '29', title: 'Резервний та кодревʼю', desc: 'Розбираємо помилки, чистимо код, питання від учнів.' },
        { num: '30', title: 'Захист фінального проекту', desc: 'Презентація гри однокласникам, відповіді на питання, фідбек.' },
        { num: '🚀', title: 'Публікація та старт', desc: 'Гра виходить у публічний доступ. Ділимось посиланням, запускаємо гравців.' },
      ]});
      coursesDb.create({ id: 'roblox-11-14', name: 'Roblox Studio: Pro Developer', emoji: '⚙️', age: '11–14 років', age_group: '11-14', description: 'Lua глибше, клієнт-сервер, DataStore, монетизація та портфоліо', lessonsCount: 32, ...shared, curriculum: [
        { num: '01', title: 'Lua: функції, замикання, рекурсія', desc: 'Вищий порядок функцій, анонімні колбеки, рекурсивні алгоритми.' },
        { num: '02', title: 'Таблиці та ООП у Lua', desc: 'Метатаблиці, __index, __newindex — ООП без класів та зі своїм класом.' },
        { num: '03', title: 'ModuleScript: архітектура проекту', desc: 'Розбиваємо гру на модулі, require(), спільний стан між скриптами.' },
        { num: '04', title: 'Клієнт-сервер архітектура', desc: 'RemoteEvent, RemoteFunction, FireServer / FireClient — безпечний обмін.' },
        { num: '05', title: 'DataStore: збереження прогресу', desc: 'DataStoreService, збереження монет, рівня та інвентарю між сесіями.' },
        { num: '06', title: 'DataStore: захист від втрат', desc: 'pcall, retry-логіка, обробка помилок при save/load без втрати даних.' },
        { num: '07', title: 'TweenService: анімації', desc: 'EasingStyle, EasingDirection, ланцюжки Tween — плавні двері, ліфти, атаки.' },
        { num: '08', title: 'Фізика та Constraints', desc: 'SpringConstraint, HingeConstraint, транспорт, VerlocityConstraint.' },
        { num: '09', title: 'Система раундів', desc: 'MatchService, таймер, вибір випадкової карти, ServerStorage між раундами.' },
        { num: '10', title: 'Spawner та хвилі ворогів', desc: 'Процедурний spawn NPC, зростання складності, boss-хвиля.' },
        { num: '11', title: 'Pathfinding: розумний NPC', desc: 'PathfindingService, NPC переслідує гравця по карті, обхід перешкод.' },
        { num: '12', title: 'Ігровий магазин: UI', desc: 'ScrollingFrame, товари з іконками та цінами, кнопки купівлі з підтвердженням.' },
        { num: '13', title: 'Ігровий магазин: логіка', desc: 'Перевірка балансу на сервері, видача предмета, захист від читів.' },
        { num: '14', title: 'Система рівнів та XP', desc: 'XP-формула, підвищення рівня, розблокування нового контенту по рівню.' },
        { num: '15', title: 'Глобальний лідерборд', desc: 'OrderedDataStore, топ-100 гравців, оновлення раз на хвилину.' },
        { num: '16', title: 'Бейджі та досягнення', desc: 'BadgeService, видача бейджа за умовою, achievement-система.' },
        { num: '17', title: 'Game Passes: монетизація', desc: 'MarketplaceService, перевірка Pass, вічні бонуси для власників.' },
        { num: '18', title: 'Developer Products: донат', desc: 'ProcessReceipt, поповнення монет, захист від подвійних нарахувань.' },
        { num: '19', title: 'Приватні сервери', desc: 'ReservedServer, PrivateServerId, продаж доступу до власного сервера.' },
        { num: '20', title: 'Анти-чит та безпека', desc: 'Валідація на сервері, sanity-check швидкості, захист RemoteEvent.' },
        { num: '21', title: 'Портфоліо-гра: концепт', desc: 'Жанр, core loop, монетизаційна модель. Game Design Document (GDD).' },
        { num: '22', title: 'Портфоліо-гра: архітектура', desc: 'Структура папок, ModuleScript-схема, клієнт-серверний план.' },
        { num: '23', title: 'Портфоліо-гра: core mechanics', desc: 'Основна ігрова механіка — прогрес, ресурси, взаємодія гравців.' },
        { num: '24', title: 'Портфоліо-гра: DataStore + магазин', desc: 'Повна система збереження, магазин з Game Pass та Developer Products.' },
        { num: '25', title: 'Портфоліо-гра: UI/UX', desc: 'Головне меню, налаштування, адаптивний HUD для мобільних пристроїв.' },
        { num: '26', title: 'Портфоліо-гра: тестування', desc: 'Playtest-сесія з іншими учнями, таблиця багів, пріоритет фіксів.' },
        { num: '27', title: 'Оптимізація та LOD', desc: 'Streaming Enabled, Level of Detail, union vs mesh, FPS-профайлер.' },
        { num: '28', title: 'Маркетинг гри', desc: 'SEO у Roblox (назва, теги), thumbnail-стратегія, опис для пошуку.' },
        { num: '29', title: 'Аналітика та монетизаційна статистика', desc: 'Developer Stats, Revenue Dashboard, A/B-тест цін на Game Pass.' },
        { num: '30', title: 'Резерв та кодревʼю', desc: 'Розбір складних місць, питання від учнів, рефакторинг архітектури.' },
        { num: '31', title: 'Захист проекту', desc: 'Презентація гри: core loop, монетизація, складнощі — відповіді на питання.' },
        { num: '🚀', title: 'Публікація та перший заробіток', desc: 'Гра у публічному доступі з монетизацією. Перший Robux від гравців.' },
      ]});
      console.log('✅  Seeded roblox age-group courses (9-11, 11-14)');
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
    if (!adminsDb.getAll().some(a => a.role === 'teacher')) {
      adminsDb.create('Богдан Коваль',   'teacher', { hourlyRate: 150, lessonDuration: 60, phone: '+380501234567', notes: 'Веб-розробка, Python' });
      adminsDb.create('Аліна Петренко',  'teacher', { hourlyRate: 130, lessonDuration: 60, phone: '+380671234568', notes: 'Scratch, Roblox' });
      console.log('✅  Seeded 2 test teachers');
    }
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

const app            = express();
app.set('trust proxy', 1);
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
      connectSrc:  ["'self'", "https://www.google-analytics.com", "https://analytics.google.com", "https://stats.g.doubleclick.net", "https://mycomputer.education"],
      frameSrc:    ["https://www.googletagmanager.com"],
      objectSrc:      ["'none'"],
      scriptSrcAttr:  ["'unsafe-inline'"],
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
app.use(cors({
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-token'],
}));

// ── BODY PARSING ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: false, limit: '12mb' }));

// ── RATE LIMITING ─────────────────────────────────────────────────────────────
// Public: 10 form submissions per 15 minutes per IP
const leadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Забагато запитів. Спробуйте через 15 хвилин.' },
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
const ROBLOX_INDEX_TPL = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const ROBLOX_META_RU = {
  title: 'Курс Roblox Studio для детей и подростков — My Computer Academy, разработка игр онлайн',
  desc:  'Курс Roblox Studio для детей 9–14 лет онлайн. Разработка игр в Roblox: скриптинг на Lua, 3D-дизайн, публикация игры для миллионов игроков. Малые группы до 5 человек. Первый урок бесплатно.',
};
app.get(['/', '/index.html'], (req, res, next) => {
  if (req.query.lang !== 'ru') return next();
  const m = ROBLOX_META_RU;
  const html = ROBLOX_INDEX_TPL
    .replace(/<html lang="uk">/, '<html lang="ru">')
    .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(m.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escHtml(m.title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${escHtml(m.title)}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${escHtml(m.desc)}"`);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── DYNAMIC SITEMAP ───────────────────────────────────────────────────────────
app.get('/sitemap.xml', (req, res) => {
  const base  = 'https://roblox.mycomputer.education';
  const today = new Date().toISOString().slice(0, 10);
  const courseUrls = coursesDb.getActive().map(c => {
    return `  <url>\n    <loc>${base}/courses/${c.id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>`;
  }).join('\n');
  const artUrls = articlesDb.getActive().map(a => {
    const lm = (a.publishedAt || today).slice(0, 10);
    return `  <url>\n    <loc>${base}/articles/${a.slug}</loc>\n    <lastmod>${lm}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
  }).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="uk" href="${base}/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${base}/?lang=ru"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}/"/>
  </url>
${courseUrls ? '\n' + courseUrls + '\n' : ''}
${artUrls ? '\n' + artUrls + '\n' : ''}
  <url>
    <loc>${base}/docs/privacy-policy.html</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${base}/docs/public-offer.html</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${base}/docs/terms.html</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${base}/docs/refund-policy.html</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${base}/docs/cookie-policy.html</loc>
    <lastmod>2026-06-08</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.send(xml);
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

// The frontend (js/main.js, article.html, articles/index.html) fetches
// /data/articles.json directly rather than through an API endpoint — now that
// articles live in SQLite, that path has to be generated dynamically instead
// of served as a static file, or it would go stale the moment SQLite took
// over as the source of truth. Registered before express.static() so it
// takes precedence over the (now-frozen) file on disk.
app.get('/data/articles.json', (req, res) => {
  res.json(articlesDb.getAll());
});

// Admin panel — no-store so updates apply immediately. Registered before
// express.static() so it takes precedence over the static handler, which
// would otherwise match admin.html first and serve it with the site-wide
// 1-day cache meant for marketing assets, not the admin panel.
app.get('/admin', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});
app.get('/admin.html', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

// ── STATIC FILES ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..'), {
  maxAge: '1d',           // cache static assets 1 day
  etag: true,
  index: 'index.html',
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

// Constant-time token comparison — avoids leaking token length/prefix via
// response-time differences on a plain === string compare.
function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Returns 'superadmin' | 'admin' | null
function getRole(token) {
  if (!token) return null;
  if (SUPERADMIN_TOKEN && safeCompare(token, SUPERADMIN_TOKEN)) return 'superadmin';
  if (process.env.MAIN_ADMIN_TOKEN && safeCompare(token, process.env.MAIN_ADMIN_TOKEN)) return 'superadmin';
  if (adminsDb.findByToken(token)) return 'admin';
  return null;
}

// Safe ID pattern — prevents path traversal / injection
const SAFE_ID_RE = /^[a-z0-9_-]{1,64}$/i;

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
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
  const ok = (SUPERADMIN_TOKEN && safeCompare(token, SUPERADMIN_TOKEN)) ||
             (process.env.MAIN_ADMIN_TOKEN && safeCompare(token, process.env.MAIN_ADMIN_TOKEN));
  if (!ok) {
    return res.status(403).json({ error: 'Forbidden: superadmin only' });
  }
  req.role  = 'superadmin';
  req.token = token;
  next();
}

function requireNotTeacher(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (SUPERADMIN_TOKEN && safeCompare(token, SUPERADMIN_TOKEN)) return next();
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
  if (!token || (SUPERADMIN_TOKEN && safeCompare(token, SUPERADMIN_TOKEN))) return next();
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
  const { name, hourlyRate, lessonDuration, notes, phone, paymentType, monthlyRate, fullName, city, jobTitle, hireDate, birthday } = req.body;
  if (name           !== undefined) patch.name           = sanitize(name);
  if (hourlyRate     !== undefined) patch.hourlyRate     = parseFloat(hourlyRate)    || 0;
  if (lessonDuration !== undefined) patch.lessonDuration = parseInt(lessonDuration)  || 60;
  if (notes          !== undefined) patch.notes          = sanitize(notes);
  if (phone          !== undefined) patch.phone          = sanitize(phone);
  if (paymentType    !== undefined) patch.paymentType    = sanitize(paymentType);
  if (monthlyRate    !== undefined) patch.monthlyRate    = parseFloat(monthlyRate)   || 0;
  if (fullName       !== undefined) patch.fullName       = sanitize(fullName);
  if (city           !== undefined) patch.city           = sanitize(city);
  if (jobTitle       !== undefined) patch.jobTitle       = sanitize(jobTitle);
  if (hireDate       !== undefined) patch.hireDate       = sanitize(hireDate);
  if (birthday       !== undefined) patch.birthday       = sanitize(birthday);
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
      source:     'roblox.mycomputer.education',
    };

    const result = db.insertLead(sanitized);
    console.log(`[LEAD #${result.id}] ${sanitized.child_name} | ${sanitized.phone} | ${sanitized.course || '—'}`);

    // Forward to main admin panel (non-blocking)
    if (process.env.MAIN_ADMIN_TOKEN) {
      fetch('https://mycomputer.education/api/leads/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': process.env.MAIN_ADMIN_TOKEN },
        body: JSON.stringify({ ...sanitized, course: sanitized.course || 'Roblox (лендінг)', notes: 'Заявка з roblox.mycomputer.education' }),
      }).catch(() => {});
    }

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
  const { child_name, age, phone, course, email, teacher, notes } = req.body;
  if (!child_name || child_name.trim().length < 2) return res.status(400).json({ error: 'Вкажіть ім\'я (мін. 2 символи)' });
  if (!phone || String(phone).replace(/\D/g,'').length < 10) return res.status(400).json({ error: 'Невірний формат телефону' });
  try {
    const result = db.insertLead({
      child_name: sanitize(child_name),
      age:        age ? parseInt(age) || null : null,
      course:     sanitize(course || '') || null,
      phone:      sanitize(phone),
      email:      sanitize(email || '') || null,
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
  const allowed = ['pricing', 'faq', 'courses', 'modules'];
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
  const isAdmin = (SUPERADMIN_TOKEN && safeCompare(token, SUPERADMIN_TOKEN)) ||
    (process.env.MAIN_ADMIN_TOKEN && safeCompare(token, process.env.MAIN_ADMIN_TOKEN)) || !!adminsDb.findByToken(token);
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

// ── ARTICLE PAGES ─────────────────────────────────────────────────────────────
const ARTICLE_HTML_TPL_RB = fs.readFileSync(path.join(__dirname, '..', 'article.html'), 'utf8');

app.get('/articles/:slug', (req, res) => {
  const { slug } = req.params;
  if (!SAFE_ID_RE.test(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));

  const article = articlesDb.getBySlug(slug);
  if (!article) return res.sendFile(path.join(__dirname, '..', 'article.html'));

  const title     = article.title || 'Стаття';
  const excerpt   = (article.excerpt || '').slice(0, 160);
  const siteUrl   = 'https://roblox.mycomputer.education';
  const pageUrl   = `${siteUrl}/articles/${slug}`;
  const fullTitle = `${title} — My Computer Academy`;

  const html = ARTICLE_HTML_TPL_RB
    .replace('<title id="pageTitle">Стаття — My Computer Academy</title>',
             `<title id="pageTitle">${escHtml(fullTitle)}</title>`)
    .replace('<meta name="description" id="pageDesc" content="Корисні статті про програмування для дітей від My Computer Academy"/>',
             `<meta name="description" id="pageDesc" content="${escHtml(excerpt) || 'Корисні статті про програмування для дітей від My Computer Academy'}"/>
  <link rel="canonical" href="${pageUrl}"/>
  <meta property="og:title" content="${escHtml(fullTitle)}"/>
  <meta property="og:description" content="${escHtml(excerpt)}"/>
  <meta property="og:url" content="${pageUrl}"/>
  <meta property="og:type" content="article"/>
  <meta property="og:image" content="https://roblox.mycomputer.education/og-image.png?v=2"/>
  <meta property="og:locale" content="uk_UA"/>`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── COURSE PAGES ──────────────────────────────────────────────────────────────
// Serve the single course.html for all /courses/:slug SEO URLs
const COURSE_SLUGS = ['scratch', 'python', 'roblox', 'web'];
app.get('/courses/:slug', (req, res) => {
  const { slug } = req.params;
  if (!SAFE_ID_RE.test(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
  const known = COURSE_SLUGS.includes(slug) || coursesDb.getAll().some(c => c.id === slug);
  if (!known) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
  res.sendFile(path.join(__dirname, '..', 'course.html'));
});

// ── TEST / DEBUG ROUTES ───────────────────────────────────────────────────────
app.get('/503', (req, res) => {
  res.status(503).sendFile(path.join(__dirname, '..', '503.html'));
});
app.get('/test-500', (req, res, next) => {
  next(new Error('Test 500 error'));
});

// ── ONLINE PAYMENT ───────────────────────────────────────────────────────────
app.post('/api/payment/create', async (req, res) => {
  const amount = parseFloat(req.body && req.body.amount);
  if (!amount || amount < 1 || amount > 100000) return res.status(400).json({ error: 'Невірна сума. Від 1 до 100 000 грн.' });
  try {
    const invoice = await monoPay.createInvoice({ amountUah: amount, description: req.body.description || 'Оплата навчання My Computer Academy' });
    res.json({ pageUrl: invoice.pageUrl });
  } catch (e) { res.status(502).json({ error: 'Не вдалося створити платіж. Спробуйте ще раз.' }); }
});
app.post('/api/payment/wfp-create', async (req, res) => {
  const amount = parseFloat(req.body && req.body.amount);
  if (!amount || amount < 1 || amount > 100000) return res.status(400).json({ error: 'Невірна сума. Від 1 до 100 000 грн.' });
  try {
    const result = await wfp.createInvoice({ amountUah: amount, description: req.body.description || 'Оплата навчання My Computer Academy', orderRef: `wfp-${Date.now()}` });
    res.json({ pageUrl: result.invoiceUrl });
  } catch (e) { res.status(502).json({ error: e.message || 'Помилка WayForPay' }); }
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

