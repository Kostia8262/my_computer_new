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
const adminHistoryDb = require('./admin-history');
const adminLeaveDb   = require('./admin-leave');
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
        label: 'Головна сторінка (blog.mycomputer.school)',
        heading: 'Курс створення блогу та контенту для підлітків — My Computer Academy',
        text: 'Курс створення блогу та контенту для підлітків 10–18 років у My Computer Academy: Photoshop, Premiere Pro, After Effects та SMM-просування. Власний блог із відео та аудиторією. Малі групи до 5 осіб, перший урок безкоштовно.',
      },
    ],
  },
  faq: [
    { id:1, question:{ ua:'З якого віку можна починати?',       ru:'С какого возраста можно начинать?' },       answer:{ ua:'Приймаємо підлітків від 10 років. Для молодшої групи (10–14) — перші кроки в Photoshop, Premiere Pro та власний блог на готовій платформі, для старшої (14–18) — повноцінна робота з After Effects, SMM-просуванням і власним сайтом. Конкретну групу підберемо на безкоштовній консультації.', ru:'Принимаем подростков от 10 лет. Для младшей группы (10–14) — первые шаги в Photoshop, Premiere Pro и собственный блог на готовой платформе, для старшей (14–18) — полноценная работа с After Effects, SMM-продвижением и собственным сайтом. Конкретную группу подберём на бесплатной консультации.' } },
    { id:2, question:{ ua:'Чи потрібні художні навички?',       ru:'Нужны ли художественные навыки?' },          answer:{ ua:'Ні, жодного попереднього досвіду не потрібно. Всі курси починаються з нуля. Потрібен тільки комп\'ютер з інтернетом.', ru:'Нет, никакого предварительного опыта не нужно. Все курсы начинаются с нуля. Нужен только компьютер с интернетом.' } },
    { id:3, question:{ ua:'Як проходять онлайн-заняття?',       ru:'Как проходят онлайн-занятия?' },             answer:{ ua:'Заняття у Zoom або Google Meet. Викладач бачить екран дитини, допомагає в реальному часі. Групи до 5 осіб — кожен отримує увагу.', ru:'Занятия в Zoom или Google Meet. Преподаватель видит экран ребёнка, помогает в реальном времени. Группы до 5 человек — каждый получает внимание.' } },
    { id:4, question:{ ua:'Що якщо дитина пропустить заняття?', ru:'Что если ребёнок пропустит занятие?' },      answer:{ ua:'Всі заняття записуються. Пропущений урок можна відпрацювати у інший день, а викладач відповість на питання в чаті.', ru:'Все занятия записываются. Пропущенный урок можно отработать в другой день, а преподаватель ответит на вопросы в чате.' } },
    { id:5, question:{ ua:'Скільки коштують курси?',            ru:'Сколько стоят курсы?' },                     answer:{ ua:'Вартість залежить від курсу та формату. Залиш заявку — менеджер надішле прайс та розповість про знижки. Перший урок безкоштовно.', ru:'Стоимость зависит от курса и формата. Оставьте заявку — менеджер пришлёт прайс и расскажет о скидках. Первый урок бесплатно.' } },
    { id:6, question:{ ua:'Скільки тривають курси?',            ru:'Сколько длятся курсы?' },                    answer:{ ua:'Молодша група (10–14 років) навчається 14 місяців, старша (14–18) — 18 місяців при 1–2 заняттях на тиждень. Конкретна тривалість залежить від навантаження та темпу учня.', ru:'Младшая группа (10–14 лет) учится 14 месяцев, старшая (14–18) — 18 месяцев при 1–2 занятиях в неделю. Конкретная длительность зависит от нагрузки и темпа ученика.' } },
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
    if (!coursesDb.getAll().some(c => c.id === 'blog-10-14')) {
      const shared = { groupSize: 5, price: 3600, color: '#f97316', active: true };
      coursesDb.create({ id: 'blog-10-14', name: 'Створення контенту: перші кроки', name_ru: 'Создание контента: первые шаги', emoji: '📱', age: '10–14 років', age_group: '10-14', duration: '14 місяців', description: 'Photoshop, Premiere Pro, After Effects і перший блог — 20 тем · 120 занять', description_ru: 'Photoshop, Premiere Pro, After Effects и первый блог — 20 тем · 120 занятий', lessonsCount: 120, ...shared, curriculum: [
      { num: '01', title: 'Знайомство з блогерством та створенням контенту', desc: 'Що таке блогер, огляд платформ (YouTube, TikTok, Instagram), приклади цікавих блогів для однолітків.', title_ru: 'Знакомство с блогерством и созданием контента', desc_ru: 'Что такое блогер, обзор платформ (YouTube, TikTok, Instagram), примеры интересных блогов для сверстников.' },
      { num: '02', title: 'Основи Adobe Photoshop', desc: 'Інтерфейс та інструменти, перше знайомство з шарами, збереження файлів.', title_ru: 'Основы Adobe Photoshop', desc_ru: 'Интерфейс и инструменты, первое знакомство со слоями, сохранение файлов.' },
      { num: '03', title: 'Робота із шарами та простими інструментами', desc: 'Виділення, ластик, пензлик, найпростіші виправлення фотографій.', title_ru: 'Работа со слоями и простыми инструментами', desc_ru: 'Выделение, ластик, кисть, простейшие исправления фотографий.' },
      { num: '04', title: 'Обробка фото для соцмереж', desc: 'Яскравість, контраст, кадрування, підготовка фото для профілю та постів.', title_ru: 'Обработка фото для соцсетей', desc_ru: 'Яркость, контраст, кадрирование, подготовка фото для профиля и постов.' },
      { num: '05', title: 'Створення яскравих обкладинок і банерів', desc: 'Прості шаблони, текст на зображенні, підготовка обкладинки для відео.', title_ru: 'Создание ярких обложек и баннеров', desc_ru: 'Простые шаблоны, текст на изображении, подготовка обложки для видео.' },
      { num: '06', title: 'Основи Adobe Premiere Pro', desc: 'Імпорт відео, інтерфейс монтажу, перше знайомство з таймлайном.', title_ru: 'Основы Adobe Premiere Pro', desc_ru: 'Импорт видео, интерфейс монтажа, первое знакомство с таймлайном.' },
      { num: '07', title: 'Простий монтаж відео: обрізка та склейка', desc: 'Обрізка кадрів, склейка сцен, порядок кадрів в історії.', title_ru: 'Простой монтаж видео: обрезка и склейка', desc_ru: 'Обрезка кадров, склейка сцен, порядок кадров в истории.' },
      { num: '08', title: 'Додавання музики та звукових ефектів', desc: 'Підбір музики без авторських прав, гучність, прості звукові ефекти.', title_ru: 'Добавление музыки и звуковых эффектов', desc_ru: 'Подбор музыки без авторских прав, громкость, простые звуковые эффекты.' },
      { num: '09', title: 'Титри та прості переходи', desc: 'Текстові написи на відео, готові переходи між кадрами.', title_ru: 'Титры и простые переходы', desc_ru: 'Текстовые надписи на видео, готовые переходы между кадрами.' },
      { num: '10', title: 'Підготовка коротких відео для TikTok та Reels', desc: 'Вертикальний формат, тривалість ролика, перші секунди, які утримують глядача.', title_ru: 'Подготовка коротких видео для TikTok и Reels', desc_ru: 'Вертикальный формат, длительность ролика, первые секунды, которые удерживают зрителя.' },
      { num: '11', title: 'Основи Adobe After Effects', desc: 'Інтерфейс, перше знайомство з анімацією об\'єктів.', title_ru: 'Основы Adobe After Effects', desc_ru: 'Интерфейс, первое знакомство с анимацией объектов.' },
      { num: '12', title: 'Проста анімація тексту', desc: 'Текст, що з\'являється та рухається, готові анімовані написи.', title_ru: 'Простая анимация текста', desc_ru: 'Текст, появляющийся и двигающийся, готовые анимированные надписи.' },
      { num: '13', title: 'Анімовані стікери та емодзі', desc: 'Власні рухомі стікери для відео та історій.', title_ru: 'Анимированные стикеры и эмодзи', desc_ru: 'Собственные подвижные стикеры для видео и историй.' },
      { num: '14', title: 'Основи соцмереж: платформи та формати', desc: 'Чим відрізняються Instagram, TikTok, YouTube, який контент підходить кожній платформі.', title_ru: 'Основы соцсетей: платформы и форматы', desc_ru: 'Чем отличаются Instagram, TikTok, YouTube, какой контент подходит каждой платформе.' },
      { num: '15', title: 'Як придумати ідею для посту', desc: 'Пошук теми, яка цікава саме тобі, простий план публікації.', title_ru: 'Как придумать идею для поста', desc_ru: 'Поиск темы, которая интересна именно тебе, простой план публикации.' },
      { num: '16', title: 'Хештеги та підписи, які привертають увагу', desc: 'Як підбирати хештеги, короткий цікавий підпис до посту.', title_ru: 'Хештеги и подписи, которые привлекают внимание', desc_ru: 'Как подбирать хештеги, короткая интересная подпись к посту.' },
      { num: '17', title: 'Спілкування з підписниками', desc: 'Відповіді на коментарі, ввічливе спілкування, що робити з неприємними коментарями.', title_ru: 'Общение с подписчиками', desc_ru: 'Ответы на комментарии, вежливое общение, что делать с неприятными комментариями.' },
      { num: '18', title: 'Створення простого блогу на готовій платформі', desc: 'Реєстрація на безкоштовній платформі, вибір теми оформлення, перший запис.', title_ru: 'Создание простого блога на готовой платформе', desc_ru: 'Регистрация на бесплатной платформе, выбор темы оформления, первая запись.' },
      { num: '19', title: 'Безпека в інтернеті для блогера', desc: 'Приватність акаунту, чого не варто публікувати, спілкування з незнайомцями онлайн.', title_ru: 'Безопасность в интернете для блогера', desc_ru: 'Приватность аккаунта, что не стоит публиковать, общение с незнакомцами онлайн.' },
      { num: '🚀', title: 'Фінал: перший пост із фото, відео та підписом', desc: 'Учень самостійно готує обкладинку, коротке відео та підпис і публікує перший пост.', title_ru: 'Финал: первый пост с фото, видео и подписью', desc_ru: 'Ученик самостоятельно готовит обложку, короткое видео и подпись и публикует первый пост.' },
      ]});
      coursesDb.create({ id: 'blog-14-18', name: 'Створення блогу та сайту', name_ru: 'Создание блога и сайта', emoji: '✍️', age: '14–18 років', age_group: '14-18', duration: '18 місяців', description: 'Photoshop, Premiere Pro, After Effects і SMM-просування — 30 тем · 150 занять', description_ru: 'Photoshop, Premiere Pro, After Effects и SMM-продвижение — 30 тем · 150 занятий', lessonsCount: 150, ...shared, curriculum: [
      { num: '01', title: 'Введення в блогерство та особистий бренд', desc: 'Огляд платформ для блогерів, аналіз успішних кейсів, визначення ніші та цільової аудиторії, основи особистого бренду.', title_ru: 'Введение в блогерство и личный бренд', desc_ru: 'Обзор платформ для блогеров, анализ успешных кейсов, определение ниши и целевой аудитории, основы личного бренда.' },
      { num: '02', title: 'Основи Adobe Photoshop', desc: 'Інтерфейс та інструменти, шари і маски, базова кольорокорекція, ретушування, експорт зображень для вебу.', title_ru: 'Основы Adobe Photoshop', desc_ru: 'Интерфейс и инструменты, слои и маски, базовая цветокоррекция, ретуширование, экспорт изображений для веба.' },
      { num: '03', title: 'Шари, маски та кольорокорекція', desc: 'Режими накладання шарів, маски шарів і векторні маски, коригувальні шари, робота з кольором і тоном зображення.', title_ru: 'Слои, маски и цветокоррекция', desc_ru: 'Режимы наложения слоёв, слой-маски и векторные маски, корректирующие слои, работа с цветом и тоном изображения.' },
      { num: '04', title: 'Ретуш і обробка фото', desc: 'Точкове відновлення, частотне розкладання, ретуш портрету, робота з текстурами шкіри, збереження природності кадру.', title_ru: 'Ретушь и обработка фото', desc_ru: 'Точечное восстановление, частотное разложение, ретушь портрета, работа с текстурами кожи, сохранение естественности кадра.' },
      { num: '05', title: 'Просунутий Photoshop: фільтри, текст, автоматизація', desc: 'Фільтри та ефекти, робота з текстом і типографікою, генератори форм, запис і використання екшенів для рутинних задач.', title_ru: 'Продвинутый Photoshop: фильтры, текст, автоматизация', desc_ru: 'Фильтры и эффекты, работа с текстом и типографикой, генераторы форм, запись и использование экшенов для рутинных задач.' },
      { num: '06', title: 'Графіка для соцмереж у Photoshop', desc: 'Формати та розміри під різні платформи, шаблони постів і сторіз, підготовка обкладинок і банерів, пакетний експорт.', title_ru: 'Графика для соцсетей в Photoshop', desc_ru: 'Форматы и размеры под разные платформы, шаблоны постов и сторис, подготовка обложек и баннеров, пакетный экспорт.' },
      { num: '07', title: 'Основи Adobe Premiere Pro', desc: 'Імпорт медіафайлів, організація проєкту, монтаж на таймлайні, базові переходи, чорновий експорт відео.', title_ru: 'Основы Adobe Premiere Pro', desc_ru: 'Импорт медиафайлов, организация проекта, монтаж на таймлайне, базовые переходы, черновой экспорт видео.' },
      { num: '08', title: 'Робота зі звуком у Premiere Pro', desc: 'Синхронізація аудіо і відео, шумозаглушення, зведення рівнів гучності, підбір і накладання музики.', title_ru: 'Работа со звуком в Premiere Pro', desc_ru: 'Синхронизация аудио и видео, шумоподавление, сведение уровней громкости, подбор и наложение музыки.' },
      { num: '09', title: 'Кольорокорекція та градація в Premiere Pro', desc: 'Панель Lumetri Color, вирівнювання балансу білого, створення авторського кольорового стилю, робота зі скопами.', title_ru: 'Цветокоррекция и градация в Premiere Pro', desc_ru: 'Панель Lumetri Color, выравнивание баланса белого, создание авторского цветового стиля, работа со скопами.' },
      { num: '10', title: 'Переходи, ефекти та текстові титри', desc: 'Динамічні переходи, текстові титри й підписи, анімовані нижні треті, підготовка субтитрів для соцмереж.', title_ru: 'Переходы, эффекты и текстовые титры', desc_ru: 'Динамические переходы, текстовые титры и подписи, анимированные нижние трети, подготовка субтитров для соцсетей.' },
      { num: '11', title: 'Багатокамерний монтаж і оптимізація проєкту', desc: 'Синхронізація кількох камер, мультикам-редагування, проксі-файли, оптимізація важких проєктів для швидкого монтажу.', title_ru: 'Многокамерный монтаж и оптимизация проекта', desc_ru: 'Синхронизация нескольких камер, мультикам-редактирование, прокси-файлы, оптимизация тяжёлых проектов для быстрого монтажа.' },
      { num: '12', title: 'Підготовка відео для YouTube, Reels і TikTok', desc: 'Формати та тривалість під кожну платформу, вертикальний монтаж, обкладинки відео, підготовка до публікації.', title_ru: 'Подготовка видео для YouTube, Reels и TikTok', desc_ru: 'Форматы и длительность под каждую платформу, вертикальный монтаж, обложки видео, подготовка к публикации.' },
      { num: '13', title: 'Основи Adobe After Effects', desc: 'Інтерфейс і композиції, шари та ключові кадри, базова анімація властивостей, попередній перегляд і рендер.', title_ru: 'Основы Adobe After Effects', desc_ru: 'Интерфейс и композиции, слои и ключевые кадры, базовая анимация свойств, предпросмотр и рендер.' },
      { num: '14', title: 'Анімація тексту та форм', desc: 'Текстові аніматори, анімовані векторні форми, easing і криві швидкості, готові пресети анімації.', title_ru: 'Анимация текста и форм', desc_ru: 'Текстовые аниматоры, анимированные векторные формы, easing и кривые скорости, готовые пресеты анимации.' },
      { num: '15', title: 'Моушн-дизайн для соцмереж', desc: 'Анімовані обкладинки та інтро, сторітелінг рухом, підготовка циклічних анімацій для сторіз і Reels.', title_ru: 'Моушн-дизайн для соцсетей', desc_ru: 'Анимированные обложки и интро, сторителлинг движением, подготовка цикличных анимаций для сторис и Reels.' },
      { num: '16', title: 'Ефекти, трекінг і композитинг', desc: 'Хромакей і видалення фону, трекінг руху, шаблонні ефекти, багатошаровий композитинг у кадрі.', title_ru: 'Эффекты, трекинг и композитинг', desc_ru: 'Хромакей и удаление фона, трекинг движения, шаблонные эффекты, многослойный композитинг в кадре.' },
      { num: '17', title: '3D-шари, камери та вирази', desc: 'Робота з 3D-простором у After Effects, налаштування камер і світла, вирази (expressions) для автоматизації анімації.', title_ru: '3D-слои, камеры и выражения', desc_ru: 'Работа с 3D-пространством в After Effects, настройка камер и света, выражения (expressions) для автоматизации анимации.' },
      { num: '18', title: 'Анімована інфографіка та презентації', desc: 'Анімовані діаграми та графіки, презентаційні відеоролики, підготовка анімації для сайту й соцмереж.', title_ru: 'Анимированная инфографика и презентации', desc_ru: 'Анимированные диаграммы и графики, презентационные видеоролики, подготовка анимации для сайта и соцсетей.' },
      { num: '19', title: 'Основи SMM: платформи та алгоритми', desc: 'Специфіка Instagram, TikTok, YouTube та Facebook, принципи роботи алгоритмів, вибір платформ під нішу блогу.', title_ru: 'Основы SMM: платформы и алгоритмы', desc_ru: 'Специфика Instagram, TikTok, YouTube и Facebook, принципы работы алгоритмов, выбор платформ под нишу блога.' },
      { num: '20', title: 'Контент-план і редакційний календар', desc: 'Формати контенту, дослідження ключових слів і хештегів, побудова контент-плану на місяць наперед.', title_ru: 'Контент-план и редакционный календарь', desc_ru: 'Форматы контента, исследование ключевых слов и хештегов, построение контент-плана на месяц вперёд.' },
      { num: '21', title: 'Візуальний сторітелінг: Reels і Shorts', desc: 'Сценарій короткого відео, структура утримання уваги глядача, монтаж і озвучка вертикальних роликів.', title_ru: 'Визуальный сторителлинг: Reels и Shorts', desc_ru: 'Сценарий короткого видео, структура удержания внимания зрителя, монтаж и озвучка вертикальных роликов.' },
      { num: '22', title: 'Спільнота: хештеги, тренди та взаємодія', desc: 'Робота з хештегами і трендами, побудова спільноти навколо блогу, комунікація з аудиторією в коментарях і директі.', title_ru: 'Сообщество: хештеги, тренды и взаимодействие', desc_ru: 'Работа с хештегами и трендами, построение сообщества вокруг блога, коммуникация с аудиторией в комментариях и директе.' },
      { num: '23', title: 'Реклама в соціальних мережах', desc: 'Налаштування таргетованої реклами, підбір аудиторій і бюджетів, A/B-тестування рекламних креативів.', title_ru: 'Реклама в социальных сетях', desc_ru: 'Настройка таргетированной рекламы, подбор аудиторий и бюджетов, A/B-тестирование рекламных креативов.' },
      { num: '24', title: 'Аналітика SMM: метрики та звітність', desc: 'Ключові метрики охоплення й залучення, аналітика платформ, звітність і прийняття рішень на основі даних.', title_ru: 'Аналитика SMM: метрики и отчётность', desc_ru: 'Ключевые метрики охвата и вовлечённости, аналитика платформ, отчётность и принятие решений на основе данных.' },
      { num: '25', title: 'Планування блогу та вибір ніші', desc: 'Дослідження ніші й аудиторії, аналіз конкурентів, формування унікальної ідеї власного блогу.', title_ru: 'Планирование блога и выбор ниши', desc_ru: 'Исследование ниши и аудитории, анализ конкурентов, формирование уникальной идеи собственного блога.' },
      { num: '26', title: 'Створення та оформлення сайту блогу', desc: 'Вибір платформи, домен і хостинг, тема оформлення, структура і навігація сайту, адаптація під мобільні пристрої.', title_ru: 'Создание и оформление сайта блога', desc_ru: 'Выбор платформы, домен и хостинг, тема оформления, структура и навигация сайта, адаптация под мобильные устройства.' },
      { num: '27', title: 'SEO та оптимізація сайту', desc: 'Пошукова оптимізація, мета-теги й описи, оптимізація зображень, перелінковка, швидкість завантаження сторінок.', title_ru: 'SEO и оптимизация сайта', desc_ru: 'Поисковая оптимизация, мета-теги и описания, оптимизация изображений, перелинковка, скорость загрузки страниц.' },
      { num: '28', title: 'Монетизація блогу та соцмереж', desc: 'Рекламні мережі, партнерські програми, продаж власних продуктів і послуг, платний контент для підписників.', title_ru: 'Монетизация блога и соцсетей', desc_ru: 'Рекламные сети, партнёрские программы, продажа собственных продуктов и услуг, платный контент для подписчиков.' },
      { num: '29', title: 'Робота з клієнтами та фріланс', desc: 'Пошук клієнтів, комерційні пропозиції, платформи для фрилансерів, портфоліо, договори та оплата робіт.', title_ru: 'Работа с клиентами и фриланс', desc_ru: 'Поиск клиентов, коммерческие предложения, платформы для фрилансеров, портфолио, договоры и оплата работ.' },
      { num: '🚀', title: 'Підсумковий проєкт: блог із відео та просуванням', desc: 'Учень самостійно готує блог із власною графікою, відео та SMM-просуванням і презентує готовий результат.', title_ru: 'Итоговый проект: блог с видео и продвижением', desc_ru: 'Ученик самостоятельно готовит блог с собственной графикой, видео и SMM-продвижением и презентует готовый результат.' },
      ]});
      console.log('✅  Seeded blog age-group courses (10-14, 14-18)');
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
      adminsDb.create('Марія Гончар',    'teacher', { hourlyRate: 150, lessonDuration: 60, phone: '+380501234567', notes: 'Premiere Pro, After Effects, SMM' });
      adminsDb.create('Аліна Петренко',  'teacher', { hourlyRate: 130, lessonDuration: 60, phone: '+380671234568', notes: 'Photoshop, блогінг для підлітків' });
      console.log('✅  Seeded 2 test teachers');
    }
    if (!clientsDb.getAll().some(c => c.scheduleDays && c.scheduleDays.length > 0)) {
      [
        { name: 'Марко Тищенко',    age: 11, course: 'blog-10-14', phone: '+380501001001', status: 'active', teacher: 'Аліна Петренко', lessonType: 'group',      scheduleDays: [{day:'1',time:'15:00'},{day:'4',time:'15:00'}], schedule: 'Пн 15:00, Чт 15:00' },
        { name: 'Діана Коваль',     age: 15, course: 'blog-14-18', phone: '+380502002002', status: 'active', teacher: 'Марія Гончар',   lessonType: 'group',      scheduleDays: [{day:'2',time:'16:00'},{day:'5',time:'16:00'}], schedule: 'Вт 16:00, Пт 16:00' },
        { name: 'Артем Мороз',      age: 16, course: 'blog-14-18', phone: '+380503003003', status: 'active', teacher: 'Марія Гончар',   lessonType: 'individual', scheduleDays: [{day:'3',time:'17:00'}],                       schedule: 'Ср 17:00' },
        { name: 'Соня Петрик',      age: 10, course: 'blog-10-14', phone: '+380504004004', status: 'active', teacher: 'Аліна Петренко', lessonType: 'group',      scheduleDays: [{day:'3',time:'14:30'}],                       schedule: 'Ср 14:30' },
        { name: 'Данило Романів',   age: 12, course: 'blog-10-14', phone: '+380505005005', status: 'active', teacher: 'Аліна Петренко', lessonType: 'group',      scheduleDays: [{day:'6',time:'10:00'}],                       schedule: 'Сб 10:00' },
        { name: 'Вікторія Лисенко', age: 17, course: 'blog-14-18', phone: '+380506006006', status: 'active', teacher: 'Марія Гончар',   lessonType: 'group',      scheduleDays: [{day:'2',time:'18:00'}],                       schedule: 'Вт 18:00' },
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

// ── CANONICAL PATH REDIRECT ──────────────────────────────────────────────────
// /index.html served the same 200 content as / with no redirect — same
// duplicate-content crawl-budget waste found and fixed on main/design.
app.use((req, res, next) => {
  if (req.path === '/index.html') {
    const query = req.originalUrl.split('?')[1];
    return res.redirect(301, '/' + (query ? `?${query}` : ''));
  }
  next();
});

// ── SECURITY HEADERS (helmet) ────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://www.googletagmanager.com", "https://www.google-analytics.com", "https://t.contentsquare.net"],
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      imgSrc:      ["'self'", "data:", "https:"],
      connectSrc:  ["'self'", "https://www.google-analytics.com", "https://analytics.google.com", "https://stats.g.doubleclick.net", "https://*.contentsquare.net"],
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
    /^https:\/\/[a-z0-9-]+\.mycomputer\.(education|school)$/.test(origin)
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
const PYTHON_INDEX_TPL = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const PYTHON_META_RU = {
  title: 'Курс создания блога и контента для подростков — My Computer Academy',
  desc:  'Курс создания блога и контента для подростков 10–18 лет онлайн. Photoshop, Premiere Pro, After Effects и SMM-продвижение. Первый урок бесплатно.',
};
app.get(['/', '/index.html'], (req, res, next) => {
  if (req.query.lang !== 'ru') return next();
  const m = PYTHON_META_RU;
  const html = PYTHON_INDEX_TPL
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
  const base  = 'https://blog.mycomputer.school';
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

// ── LLMS.TXT ──────────────────────────────────────────────────────────────────
// Experimental convention (not a ratified standard, unlike robots.txt/
// sitemap.xml) — a plain-text/markdown digest for LLM crawlers (ChatGPT,
// Claude, Perplexity) that don't want to parse full HTML for key facts.
// Low-cost addition, not a substitute for real SSR content.
app.get('/llms.txt', (req, res) => {
  const base = 'https://blog.mycomputer.school';
  const courses = coursesDb.getActive();
  const articles = articlesDb.getActive();

  const coursesTxt = courses.map(c => `## ${c.name} (${c.age})
- Тривалість: ${c.duration}, ${c.lessonsCount} занять
- Формат: онлайн, групи до ${c.groupSize} осіб
- Вартість: від ${c.price} ₴/міс, перший урок безкоштовно
${c.description}`).join('\n\n');

  const articlesTxt = articles.map(a =>
    `- [${a.title}](${base}/articles/${a.slug}): ${a.excerpt}`
  ).join('\n');

  const txt = `# My Computer Academy — ${courses[0]?.name || 'курс'}

> Онлайн-школа комп'ютерних курсів для дітей від 6 до 18 років. Цей сайт — окремий лендинг курсу під доменом ${base}, частина мережі My Computer Academy.

## Курс

${coursesTxt}

## Статті

${articlesTxt || '(поки немає опублікованих статей)'}

## Контакти

Телефон: +38 (095) 462-46-72, +38 (068) 252-28-76
Email: my.computer.academy25@gmail.com
Формат навчання: онлайн по всій Україні (офіси: Дніпро)
Цей сайт: ${base}
Головний сайт мережі шкіл: https://mycomputer.school
`;

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(txt);
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
// would otherwise match admin.html first.
app.get('/admin', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});
app.get('/admin.html', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

// ── ARTICLES SSR ──────────────────────────────────────────────────────────────
// Mirrors client-side LABEL_MAP (js/main.js, articles/index.html) so
// server-rendered cards match what the JS re-renders on top of them.
const ARTICLE_LABEL_MAP = {
  '✍️': {label:'Блогінг',           cls:'cat-design'},
  '🎬': {label:'Відеомонтаж',       cls:'cat-design'},
  '📈': {label:'SMM',               cls:'cat-tips'},
  '🖌️': {label:'Photoshop',        cls:'cat-design'},
  '💡': {label:'Для батьків',       cls:'cat-parents'},
  '🎯': {label:'Вибір курсу',       cls:'cat-tips'},
  '💬': {label:'Гайди',             cls:'cat-guide'},
  '📖': {label:'Словник',           cls:'cat-dict'},
};
function pluralArticles(n, isRu) {
  const m = n % 10, m100 = n % 100;
  if (isRu) {
    if (n === 0) return 'статей не найдено';
    if (m === 1 && m100 !== 11) return n + ' статья';
    if (m >= 2 && m <= 4 && (m100 < 10 || m100 >= 20)) return n + ' статьи';
    return n + ' статей';
  }
  if (n === 0) return 'статей не знайдено';
  if (m === 1 && m100 !== 11) return n + ' стаття';
  if (m >= 2 && m <= 4 && (m100 < 10 || m100 >= 20)) return n + ' статті';
  return n + ' статей';
}
function tr(a, field, isRu) {
  if (isRu && a[field + '_ru']) return a[field + '_ru'];
  return a[field] || '';
}

// Server-render the article listing grid — previously the grid shipped empty
// and only filled in after a client-side fetch('/data/articles.json'), so
// this hub page carried zero real <a href="/articles/..."> links for
// crawlers (Google, and non-JS-executing AI crawlers like GPTBot/ClaudeBot/
// PerplexityBot alike), weakening internal linking to every post. Registered
// before express.static() so it takes precedence over the raw file on disk.
const ARTICLES_INDEX_TPL = fs.readFileSync(path.join(__dirname, '..', 'articles', 'index.html'), 'utf8');
app.get('/articles', (req, res) => {
  const isRu = req.query.lang === 'ru';
  const siteUrl = 'https://blog.mycomputer.school';
  const activeArticles = articlesDb.getActive();

  const cardsHtml = activeArticles.map(a => {
    const lbl = ARTICLE_LABEL_MAP[a.coverEmoji] || { label: escHtml(a.category || 'стаття'), cls: '' };
    const dateStr = a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
      : '';
    return `
    <a class="article-card" href="/articles/${escHtml(a.slug)}${isRu ? '?lang=ru' : ''}" aria-label="${escHtml(tr(a, 'title', isRu))}">
      <div class="article-card__top">
        <span class="article-card__emoji">${a.coverEmoji || '📄'}</span>
        <span class="article-card__cat ${lbl.cls}">${lbl.label}</span>
      </div>
      <div class="article-card__body">
        <h2 class="article-card__title">${escHtml(tr(a, 'title', isRu))}</h2>
        <p class="article-card__excerpt">${escHtml(tr(a, 'excerpt', isRu))}</p>
      </div>
      <div class="article-card__footer">
        <span class="article-card__date">${dateStr}</span>
        <span class="article-card__read">${isRu ? 'Читать →' : 'Читати →'}</span>
      </div>
    </a>`;
  }).join('');

  let html = ARTICLES_INDEX_TPL
    .replace(
      '<p class="listing-hero__sub" id="heroSub">Завантаження…</p>',
      `<p class="listing-hero__sub" id="heroSub">${pluralArticles(activeArticles.length, isRu)}</p>`
    )
    .replace(
      '<span class="listing-count" id="listingCount"></span>',
      `<span class="listing-count" id="listingCount">${pluralArticles(activeArticles.length, isRu)}</span>`
    )
    .replace(
      '<div class="listing-grid" id="listingGrid"></div>',
      `<div class="listing-grid" id="listingGrid">${cardsHtml}</div>`
    );

  const canonicalTag = `<link rel="canonical" href="${siteUrl}/articles${isRu ? '?lang=ru' : ''}"/>
  <link rel="alternate" hreflang="uk" href="${siteUrl}/articles"/>
  <link rel="alternate" hreflang="ru" href="${siteUrl}/articles?lang=ru"/>
  <link rel="alternate" hreflang="x-default" href="${siteUrl}/articles"/>`;
  html = html.replace(/<link rel="canonical"[^>]*\/>/, canonicalTag);

  if (isRu) html = html.replace('<html lang="uk">', '<html lang="ru">');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── STATIC FILES ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..'), {
  maxAge: '1d',           // cache versioned assets (css?v=, js?v=) 1 day
  etag: true,
  index: 'index.html',
  setHeaders(res, filePath) {
    // HTML files must never be cached so browsers always fetch the latest
    // version with updated ?v= query params pointing to new CSS/JS
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
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
  const before = adminsDb.getById(id);
  if (!before) return res.status(404).json({ error: 'Не знайдено' });
  const patch = {};
  const {
    name, hourlyRate, lessonDuration, notes, phone, paymentType, monthlyRate,
    fullName, city, jobTitle, hireDate, birthday,
    employmentType, probationUntil, qualifications, bankDetails,
  } = req.body;
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
  if (employmentType !== undefined) patch.employmentType = sanitize(employmentType);
  if (probationUntil !== undefined) patch.probationUntil = sanitize(probationUntil);
  if (qualifications !== undefined) patch.qualifications = Array.isArray(qualifications) ? qualifications.map(String).slice(0, 50) : [];
  if (bankDetails    !== undefined) patch.bankDetails    = sanitize(bankDetails);
  const admin = adminsDb.update(id, patch);
  if (!admin) return res.status(404).json({ error: 'Не знайдено' });
  // Retroactive-payroll audit trail — only log when a rate/pay-mode field actually changed.
  adminHistoryDb.logChange(id, 'paymentType', before.paymentType, admin.paymentType);
  adminHistoryDb.logChange(id, 'hourlyRate',  before.hourlyRate,  admin.hourlyRate);
  adminHistoryDb.logChange(id, 'monthlyRate', before.monthlyRate, admin.monthlyRate);
  res.json({ success: true, admin });
});

// Rate/pay-mode change history (superadmin only)
app.get('/api/admins/:id/history', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid ID' });
  res.json({ success: true, history: adminHistoryDb.getForAdmin(id) });
});

// Vacation/sick-leave tracker (superadmin only)
app.get('/api/admins/:id/leave', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid ID' });
  res.json({ success: true, leave: adminLeaveDb.getForAdmin(id) });
});

app.post('/api/admins/:id/leave', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid ID' });
  if (!adminsDb.getById(id)) return res.status(404).json({ error: 'Не знайдено' });
  const { type, startDate, endDate, notes } = req.body;
  if (!startDate || !endDate) return res.status(400).json({ error: 'Вкажіть дати' });
  const entry = adminLeaveDb.create({ adminId: id, type, startDate: sanitize(startDate), endDate: sanitize(endDate), notes: sanitize(notes) });
  res.status(201).json({ success: true, entry });
});

app.delete('/api/admins/:id/leave/:leaveId', adminLimiter, requireSuperAdmin, (req, res) => {
  const id      = parseInt(req.params.id);
  const leaveId = parseInt(req.params.leaveId);
  const ok = adminLeaveDb.delete(leaveId, id);
  if (!ok) return res.status(404).json({ error: 'Не знайдено' });
  res.json({ success: true });
});

// Per-day attendance summary for a teacher's compact calendar view (superadmin only)
app.get('/api/admins/:id/attendance-calendar', adminLimiter, requireSuperAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const admin = adminsDb.getById(id);
  if (!admin) return res.status(404).json({ error: 'Не знайдено' });
  const ym = req.query.ym || new Date().toISOString().slice(0, 7);
  const [year, month] = ym.split('-').map(Number);
  const teacherClients = clientsDb.getAll().filter(c => (c.teacher || '').trim() === (admin.name || '').trim());
  const attData = attendanceDb.getMonth(year, month);
  const days = {};
  teacherClients.forEach(c => {
    const clientAtt = attData[String(c.id)] || {};
    Object.entries(clientAtt).forEach(([date, status]) => {
      if (!days[date]) days[date] = { present: 0, absent: 0, makeup: 0, cancelled: 0 };
      if (days[date][status] !== undefined) days[date][status]++;
    });
  });
  res.json({ success: true, ym, days });
});

// "Who's teaching today" — compact list for the staff table (superadmin only)
app.get('/api/admins/teaching-today', adminLimiter, requireSuperAdmin, (req, res) => {
  const today = new Date();
  let dow = today.getDay();
  if (dow === 0) dow = 7; // 1=Mon..7=Sun, matching scheduleDays
  const allClients = clientsDb.getAll();
  const byTeacher = {};
  allClients.forEach(c => {
    if (!c.teacher || c.status !== 'active') return;
    (c.scheduleDays || []).forEach(slot => {
      if (parseInt(slot.day) !== dow) return;
      const key = c.teacher.trim();
      if (!byTeacher[key]) byTeacher[key] = [];
      byTeacher[key].push({ time: slot.time || '', clientName: c.name });
    });
  });
  Object.values(byTeacher).forEach(list => list.sort((a, b) => a.time.localeCompare(b.time)));
  res.json({ success: true, byTeacher });
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
      source:     'blog.mycomputer.school',
    };

    const result = db.insertLead(sanitized);
    console.log(`[LEAD #${result.id}] ${sanitized.child_name} | ${sanitized.phone} | ${sanitized.course || '—'}`);

    // Forward to main admin panel (non-blocking)
    if (process.env.MAIN_ADMIN_TOKEN) {
      fetch('https://mycomputer.education/api/leads/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': process.env.MAIN_ADMIN_TOKEN },
        body: JSON.stringify({ ...sanitized, course: sanitized.course || 'Створення блогу (лендинг)', notes: 'Заявка з blog.mycomputer.school' }),
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
app.post('/api/leads/admin', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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
app.patch('/api/leads/:id', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
  const id = parseInt(req.params.id);
  const { status, notes, child_name, phone, age, course, email, teacher, schedule, scheduleDays, lessonType } = req.body;
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
    if (scheduleDays !== undefined) fieldPatch.schedule_days = JSON.stringify(Array.isArray(scheduleDays) ? scheduleDays : []);
    if (lessonType   !== undefined) fieldPatch.lesson_type   = sanitize(lessonType) || null;
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
    certificateNumber: s(body.certificateNumber) || null,
    certificateDate:   s(body.certificateDate) || null,
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
  if ('certificateNumber' in body) p.certificateNumber = s(body.certificateNumber) || null;
  if ('certificateDate'   in body) p.certificateDate   = s(body.certificateDate) || null;
  return p;
}

app.get('/api/clients', adminLimiter, requireAdmin, (req, res) => {
  res.json({ success: true, clients: clientsDb.getAll(), stats: clientsDb.getStats() });
});

app.post('/api/clients', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
  const data = sanitizeClient(req.body);
  if (!data.name || data.name.length < 2) return res.status(400).json({ error: 'Вкажіть ім\'я' });
  const client = clientsDb.create(data);
  res.status(201).json({ success: true, client });
});

app.patch('/api/clients/:id', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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
app.post('/api/leads/import', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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

app.post('/api/clients/import', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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

app.post('/api/payments', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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

app.delete('/api/payments/:id', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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

app.post('/api/monthly-payments/:ym', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
  const { ym } = req.params;
  if (!/^\d{4}-\d{2}$/.test(ym)) return res.status(400).json({ error: 'Format: YYYY-MM' });
  if (!Array.isArray(req.body.records)) return res.status(400).json({ error: 'records[] required' });
  const result = monthlyPayDb.createMonth(ym, req.body.records);
  res.status(result.alreadyExists ? 200 : 201).json({ success: true, ...result });
});

app.patch('/api/monthly-payments/:ym/:clientId', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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
app.put('/api/monthly-payments/:ym/:clientId', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
  const { ym, clientId } = req.params;
  if (!monthlyPayDb.getMonth(ym)) return res.status(404).json({ error: 'Month not found' });
  const client = clientsDb.getById(parseInt(clientId));
  // Always take clientName from DB if available — prevents stale/garbled values from client
  const data = { ...req.body, clientName: client?.name || req.body.clientName || '' };
  const record = monthlyPayDb.upsertRecord(ym, clientId, data);
  if (!record) return res.status(404).json({ error: 'Month not found' });
  res.status(200).json({ success: true, record });
});

app.delete('/api/monthly-payments/:ym/:clientId', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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
app.put('/api/content/:section', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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

app.post('/api/courses', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
  const course = coursesDb.create(req.body);
  if (!course) return res.status(409).json({ error: 'ID вже існує' });
  res.status(201).json({ success: true, course });
});

app.patch('/api/courses/:id', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
  if (!SAFE_ID_RE.test(req.params.id)) return res.status(400).json({ error: 'Invalid course ID' });
  const course = coursesDb.update(req.params.id, req.body);
  if (!course) return res.status(404).json({ error: 'Курс не знайдено' });
  res.json({ success: true, course });
});

app.delete('/api/courses/:id', adminLimiter, requireSuperAdmin, (req, res) => {
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

app.post('/api/articles', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
  const article = articlesDb.create(req.body);
  if (!article) return res.status(409).json({ error: 'Slug вже існує' });
  res.status(201).json({ success: true, article });
});

app.patch('/api/articles/:id', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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

app.post('/api/reviews', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
  const { name, initials, role, text, rating, active } = req.body;
  if (!name || !text) return res.status(400).json({ error: 'name та text обов\'язкові' });
  const review = reviewsDb.create({ name: sanitize(name), initials: sanitize(initials), role: sanitize(role), text: sanitize(text), rating, active });
  res.status(201).json({ success: true, review });
});

app.patch('/api/reviews/:id', adminLimiter, requireAdmin, requireNotTeacher, (req, res) => {
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
const ARTICLE_HTML_TPL_PY = fs.readFileSync(path.join(__dirname, '..', 'article.html'), 'utf8');

app.get('/articles/:slug', (req, res) => {
  const { slug } = req.params;
  if (!SAFE_ID_RE.test(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));

  const article = articlesDb.getBySlug(slug);
  if (!article) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));

  const isRu      = req.query.lang === 'ru';
  const title     = tr(article, 'title', isRu) || 'Стаття';
  const excerpt   = tr(article, 'excerpt', isRu).slice(0, 160);
  const content   = tr(article, 'content', isRu);
  const siteUrl   = 'https://blog.mycomputer.school';
  const pageUrl   = `${siteUrl}/articles/${slug}`;
  const fullTitle = `${title} — My Computer Academy`;

  const publishedIso = article.publishedAt
    ? new Date(article.publishedAt).toISOString() : new Date().toISOString();

  // Server-render the real article body too — previously only SEO meta was
  // injected server-side while the actual content only appeared after a
  // client-side fetch('/data/articles.json') populated #pageContent, so
  // crawlers that don't execute JS (Google's non-JS pass, and most AI
  // crawlers — GPTBot, ClaudeBot, PerplexityBot, etc.) saw an empty
  // "Завантаження..." placeholder instead of the article text.
  const dateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const related = articlesDb.getActive().filter(a => a.id !== article.id).slice(0, 4);
  const relatedHtml = related.length ? `
          <div class="sidebar-card">
            <h3>${isRu ? 'Читайте также' : 'Читайте також'}</h3>
            ${related.map(r => `<a class="sidebar-link" href="/articles/${escHtml(r.slug)}${isRu ? '?lang=ru' : ''}">${r.coverEmoji || '📄'} ${escHtml(tr(r, 'title', isRu))}</a>`).join('')}
          </div>` : '';
  const bodyHtml = content || `<p>${escHtml(excerpt || '')}</p>`;

  const pageContentHtml = `<div id="pageContent">
    <section class="article-hero">
      <div class="container">
        <nav class="article-breadcrumb" aria-label="Навігація">
          <a href="/">${isRu ? 'Главная' : 'Головна'}</a>
          <span class="article-breadcrumb-sep">›</span>
          <a href="/articles">${isRu ? 'Статьи' : 'Статті'}</a>
        </nav>
        <div class="article-hero__badge">${article.coverEmoji || '📄'} ${escHtml(article.category || 'навчання')}</div>
        <h1 class="article-hero__title">${escHtml(title)}</h1>
        <div class="article-hero__meta">
          <span>✍️ ${escHtml(article.author || 'My Computer Academy')}</span>
          <span>📅 ${dateStr}</span>
        </div>
      </div>
    </section>

    <section class="article-body">
      <div class="article-container">
        <main class="article-content">
          ${bodyHtml}
        </main>
        <aside class="article-sidebar">
          <div class="sidebar-cta">
            <h3>${isRu ? 'Запишите ребёнка на курс' : 'Запишіть дитину на курс'}</h3>
            <p>${isRu ? 'Первый урок бесплатно — попробуйте без обязательств!' : "Перший урок безкоштовно — спробуйте без зобов'язань!"}</p>
            <button type="button" onclick="openArtModal()">${isRu ? 'Записаться сейчас →' : 'Записатись зараз →'}</button>
          </div>${relatedHtml}
        </aside>
      </div>
    </section>
  </div>`;

  const articleJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: title,
        description: excerpt,
        image: `${siteUrl}/og-image.png?v=2`,
        datePublished: publishedIso,
        dateModified: publishedIso,
        inLanguage: isRu ? 'ru' : 'uk',
        author: { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: article.author || 'My Computer Academy' },
        publisher: {
          '@type': 'Organization', name: 'My Computer Academy',
          logo: { '@type': 'ImageObject', url: `${siteUrl}/android-chrome-192x192.png`, width: 192, height: 192 },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isRu ? 'Главная' : 'Головна', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: isRu ? 'Статьи' : 'Статті', item: `${siteUrl}/articles` },
          { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
        ],
      },
    ],
  });

  const hreflangBlock = `
  <link rel="alternate" hreflang="uk" href="${pageUrl}"/>
  <link rel="alternate" hreflang="ru" href="${pageUrl}?lang=ru"/>
  <link rel="alternate" hreflang="x-default" href="${pageUrl}"/>`;

  let html = ARTICLE_HTML_TPL_PY
    .replace('<title id="pageTitle">Стаття — My Computer Academy</title>',
             `<title id="pageTitle">${escHtml(fullTitle)}</title>`)
    .replace('<meta name="description" id="pageDesc" content="Корисні статті про створення блогу для підлітків від My Computer Academy"/>',
             `<meta name="description" id="pageDesc" content="${escHtml(excerpt) || 'Корисні статті про створення блогу для підлітків від My Computer Academy'}"/>
  <link rel="canonical" href="${pageUrl}${isRu ? '?lang=ru' : ''}"/>${hreflangBlock}
  <meta property="og:title" content="${escHtml(fullTitle)}"/>
  <meta property="og:description" content="${escHtml(excerpt)}"/>
  <meta property="og:url" content="${pageUrl}"/>
  <meta property="og:type" content="article"/>
  <meta property="og:image" content="https://blog.mycomputer.school/og-image.png?v=2"/>
  <meta property="og:locale" content="${isRu ? 'ru_RU' : 'uk_UA'}"/>
  <script type="application/ld+json">${articleJsonLd}</script>`)
    .replace(
      `<div id="pageContent">
  <div style="text-align:center;padding:100px 20px;color:#888">Завантаження...</div>
</div>`,
      pageContentHtml
    );

  if (isRu) html = html.replace('<html lang="uk">', '<html lang="ru">');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// ── COURSE PAGES ──────────────────────────────────────────────────────────────
// Server-render title/description/canonical/hreflang/OG/JSON-LD for
// /courses/:slug — previously a bare static sendFile with everything set by
// client JS only (renderCourse() in course.html), so crawlers that don't
// execute JS saw the literal placeholder "Курс — My Computer Academy" for
// every course. The visible curriculum/pricing/FAQ body is still rendered by
// that same client JS — this only fixes the head + structured data, matching
// the pattern already shipped on main/design's /courses/:slug route.
const COURSE_SLUGS = ['blog-10-14', 'blog-14-18'];
const COURSE_HTML_TPL = fs.readFileSync(path.join(__dirname, '..', 'course.html'), 'utf8');
app.get('/courses/:slug', (req, res) => {
  const { slug } = req.params;
  if (!SAFE_ID_RE.test(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
  const course = coursesDb.getAll().find(c => c.id === slug);
  if (!course && !COURSE_SLUGS.includes(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
  if (!course) return res.sendFile(path.join(__dirname, '..', 'course.html'));

  const isRu    = req.query.lang === 'ru';
  const name    = (isRu && course.name_ru) ? course.name_ru : course.name;
  const rawDesc = (isRu && course.description_ru) ? course.description_ru : (course.description || 'Детальна інформація про курс створення блогу та контенту для підлітків у My Computer Academy');
  const desc    = rawDesc.slice(0, 160);
  const title   = `${name} — My Computer Academy`;
  const siteUrl = 'https://blog.mycomputer.school';
  const pageUrl = `${siteUrl}/courses/${slug}`;

  const activeReviews = reviewsDb.getActive();
  const reviewCount = activeReviews.length;
  const ratingValue = reviewCount
    ? (activeReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviewCount).toFixed(1)
    : null;
  const durationMonths = course.duration ? parseInt(course.duration) || null : null;
  const isoPeriod = durationMonths ? `P${durationMonths}M` : null;
  const hasRu = !!(course.name_ru || course.description_ru);

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: title,
        description: desc,
        inLanguage: isRu ? 'ru' : 'uk',
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, item: { '@id': `${siteUrl}/`, name: isRu ? 'Главная' : 'Головна' } },
          { '@type': 'ListItem', position: 2, item: { '@id': `${siteUrl}/#courses`, name: isRu ? 'Курс' : 'Курс' } },
          { '@type': 'ListItem', position: 3, item: { '@id': pageUrl, name } },
        ],
      },
      {
        '@type': 'Course',
        '@id': `${pageUrl}/#course`,
        name,
        description: rawDesc,
        url: pageUrl,
        inLanguage: isRu ? 'ru' : 'uk',
        educationalLevel: 'Beginner',
        ...(course.age ? { typicalAgeRange: course.age } : {}),
        provider: { '@id': `${siteUrl}/#organization` },
        ...(isoPeriod ? {
          hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', duration: isoPeriod, inLanguage: isRu ? 'ru' : 'uk' },
        } : {}),
        offers: { '@type': 'Offer', priceCurrency: 'UAH', availability: 'https://schema.org/InStock', url: `${siteUrl}/#contact` },
        ...(ratingValue ? {
          aggregateRating: { '@type': 'AggregateRating', ratingValue, bestRating: '5', worstRating: '1', reviewCount: String(reviewCount) },
        } : {}),
      },
    ],
  });

  const hreflangBlock = hasRu ? `
  <link rel="alternate" hreflang="uk" href="${pageUrl}"/>
  <link rel="alternate" hreflang="ru" href="${pageUrl}?lang=ru"/>
  <link rel="alternate" hreflang="x-default" href="${pageUrl}"/>` : '';
  const canonicalUrl = `${pageUrl}${isRu ? '?lang=ru' : ''}`;

  let html = COURSE_HTML_TPL
    .replace('<title>Курс — My Computer Academy</title>', `<title>${escHtml(title)}</title>`)
    .replace(
      '<meta name="description" content="Детальна інформація про курс створення блогу та контенту для підлітків у My Computer Academy"/>',
      `<meta name="description" content="${escHtml(desc)}"/>
  <link rel="canonical" href="${canonicalUrl}"/>${hreflangBlock}
  <meta property="og:title" content="${escHtml(title)}"/>
  <meta property="og:description" content="${escHtml(desc)}"/>
  <meta property="og:url" content="${pageUrl}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="${siteUrl}/og-image.png?v=2"/>
  <meta property="og:locale" content="${isRu ? 'ru_RU' : 'uk_UA'}"/>
  <script type="application/ld+json">${jsonLd}</script>`
    );

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
