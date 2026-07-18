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
        { ua: 'Мала група до 6 дітей',                    ru: 'Малая группа до 6 детей' },
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
        { ua: 'Мала група до 6 дітей',                       ru: 'Малая группа до 6 детей' },
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
        label: 'Головна сторінка (webdesign.mycomputer.education)',
        heading: 'Курс веб-дизайну для дітей — My Computer Academy',
        text: 'Курс веб-дизайну для дітей та підлітків 6–18 років у My Computer Academy: Photoshop, Illustrator, Figma, UI/UX. Малі групи до 6 осіб, перший урок безкоштовно.',
      },
    ],
  },
  faq: [
    { id:1, question:{ ua:'З якого віку починають курс Веб-дизайну?', ru:'С какого возраста начинают курс Веб-дизайна?' }, answer:{ ua:'Веб-дизайн — для дітей та підлітків від 6 до 18 років. Для 6–10 — Фотошоп, Ілюстратор, Анімація, кольорознавство та основи композиції. Для 10–14 — все з попереднього + Figma, UI-компоненти та дизайн сайтів, ігор, додатків. Для 14–18 — все з попередніх + UX-дослідження, прототипи та кар\'єра дизайнера. Перший макет — вже на другому занятті!', ru:'Веб-дизайн — для детей и подростков от 6 до 18 лет. Для 6–10 — Фотошоп, Иллюстратор, Анимация, цветоведение и основы композиции. Для 10–14 — всё из предыдущего + Figma, UI-компоненты и дизайн сайтов, игр, приложений. Для 14–18 — всё из предыдущих + UX-исследования, прототипы и карьера дизайнера. Первый макет — уже на втором занятии!' } },
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

// ── STARTUP SEED (test teachers + demo clients) ───────────────────────────────
(function seedTestData() {
  try {
    if (!coursesDb.getAll().some(c => c.id === 'webdesign-6-12')) {
      const shared = { duration: '18 місяців', groupSize: 6, price: 3600, color: '#ec4899', active: true };
      coursesDb.create({ id: 'webdesign-6-12', name: 'Графіка та дизайн: Photoshop + Illustrator', name_ru: 'Графика и дизайн: Photoshop + Illustrator', emoji: '🎨', age: '6–12 років', age_group: '6-12', description: 'Від растру до вектору, від ретуші до брендингу — 30 тем · 156 занять', description_ru: 'От растра до вектора, от ретуши до брендинга — 30 тем · 156 занятий', lessonsCount: 156, ...shared, curriculum: [
        { num: '01', title: 'Знайомство з Adobe Photoshop', desc: 'Растрова та векторна графіка: відмінності. Колірні моделі RGB/CMYK. Створення та збереження файлів.', title_ru: 'Знакомство с Adobe Photoshop', desc_ru: 'Растровая и векторная графика: отличия. Цветовые модели RGB/CMYK. Создание и сохранение файлов.' },
        { num: '02', title: 'Інструменти виділення', desc: 'Чарівна паличка, ласо, маска, колірний діапазон. Трансформація, доповнення та перетин областей виділення.', title_ru: 'Инструменты выделения', desc_ru: 'Волшебная палочка, лассо, маска, цветовой диапазон. Трансформация, добавление и пересечение областей выделения.' },
        { num: '03', title: 'Шари, штамп та ретуш фотографії', desc: 'Поняття шарів та їх параметри. Стилі шарів. Ретуш портрету: Clone Stamp, Healing Brush, Liquify.', title_ru: 'Слои, штамп и ретушь фотографии', desc_ru: 'Понятие слоёв и их параметры. Стили слоёв. Ретушь портрета: Clone Stamp, Healing Brush, Liquify.' },
        { num: '04', title: 'Робота з текстом у Photoshop', desc: 'Текстові шари, деформація напису, ефекти: вогняний текст, залізний текст, стилі.', title_ru: 'Работа с текстом в Photoshop', desc_ru: 'Текстовые слои, деформация надписи, эффекты: огненный текст, железный текст, стили.' },
        { num: '05', title: 'Мокапи. Смарт-фільтри. Брендинг', desc: 'Що таке мокап, створення власного. Смарт-фільтри. Логотип на шкірі, дереві, металі.', title_ru: 'Мокапы. Смарт-фильтры. Брендинг', desc_ru: 'Что такое мокап, создание собственного. Смарт-фильтры. Логотип на коже, дереве, металле.' },
        { num: '06', title: 'Художня обробка фото', desc: 'Макіяж, фотоколаж, тіні та світло, Color Balance, ретуш пейзажу, корекція перспективи.', title_ru: 'Художественная обработка фото', desc_ru: 'Макияж, фотоколлаж, тени и свет, Color Balance, ретушь пейзажа, коррекция перспективы.' },
        { num: '07', title: 'Корекція кольору. Маски шару', desc: 'Базова корекція, коригувальні шари, тонові криві Curves, конвертація у чорно-біле, складний колаж.', title_ru: 'Коррекция цвета. Маски слоя', desc_ru: 'Базовая коррекция, корректирующие слои, тоновые кривые Curves, конвертация в чёрно-белое, сложный коллаж.' },
        { num: '08', title: 'Малюємо у Photoshop', desc: 'Цифрове малювання без планшета. Графічний планшет. Крива Безьє, контури, векторні фігури.', title_ru: 'Рисуем в Photoshop', desc_ru: 'Цифровое рисование без планшета. Графический планшет. Кривая Безье, контуры, векторные фигуры.' },
        { num: '09', title: 'Анімація у Photoshop', desc: 'Шкала часу, створення слайдів. Анімація батареї та годинника з незалежними стрілками.', title_ru: 'Анимация в Photoshop', desc_ru: 'Шкала времени, создание слайдов. Анимация батарейки и часов с независимыми стрелками.' },
        { num: '10', title: 'Спецефекти та окремі випадки', desc: 'Подвійна експозиція, зображення що розсипається, 3D-графіка, акварельний ефект, відновлення фото.', title_ru: 'Спецэффекты и особые случаи', desc_ru: 'Двойная экспозиция, эффект рассыпающегося изображения, 3D-графика, акварельный эффект, восстановление фото.' },
        { num: '11', title: 'Вступ до Adobe Illustrator', desc: 'Векторна графіка та її застосування. Інтерфейс Illustrator, документи, шаблони, навігація.', title_ru: 'Введение в Adobe Illustrator', desc_ru: 'Векторная графика и её применение. Интерфейс Illustrator, документы, шаблоны, навигация.' },
        { num: '12', title: 'Маніпуляції з об\'єктами та контурами', desc: 'Копіювання, вирівнювання, групування. Малювання ліній, типи кистей, інструмент Безьє.', title_ru: 'Манипуляции с объектами и контурами', desc_ru: 'Копирование, выравнивание, группировка. Рисование линий, типы кистей, инструмент Безье.' },
        { num: '13', title: 'Прості фігури та трансформація', desc: 'Прямокутники, еліпси, зірки, спіралі, сітки. Виділення та трансформація об\'єктів, перетікання.', title_ru: 'Простые фигуры и трансформация', desc_ru: 'Прямоугольники, эллипсы, звёзды, спирали, сетки. Выделение и трансформация объектов, перетекание.' },
        { num: '14', title: 'Колір, текстури та фільтри', desc: 'Заливки, градієнти, градієнтна сітка, текстури. Прозорість, режими змішування, ефекти.', title_ru: 'Цвет, текстуры и фильтры', desc_ru: 'Заливки, градиенты, градиентная сетка, текстуры. Прозрачность, режимы смешивания, эффекты.' },
        { num: '15', title: 'Шари та маски в Illustrator', desc: 'Робота з палітрою Layers, типи масок, маски непрозорості. Точний контроль видимості об\'єктів.', title_ru: 'Слои и маски в Illustrator', desc_ru: 'Работа с палитрой Layers, типы масок, маски непрозрачности. Точный контроль видимости объектов.' },
        { num: '16', title: 'Допоміжні засоби Illustrator', desc: 'Лінійки, направляючі, смарт-направляючі, прив\'язка до сітки — точне малювання.', title_ru: 'Вспомогательные средства Illustrator', desc_ru: 'Линейки, направляющие, смарт-направляющие, привязка к сетке — точное рисование.' },
        { num: '17', title: 'Текст в Illustrator', desc: 'Шрифт та атрибути, текст вздовж кривої, перетворення у криві, неоновий ефект, візитка.', title_ru: 'Текст в Illustrator', desc_ru: 'Шрифт и атрибуты, текст вдоль кривой, преобразование в кривые, неоновый эффект, визитка.' },
        { num: '18', title: 'Спеціальні засоби Illustrator', desc: 'Кисті для складних обводок, оболонки деформації, символи, діаграми, вітальна листівка.', title_ru: 'Специальные средства Illustrator', desc_ru: 'Кисти для сложных обводок, оболочки деформации, символы, диаграммы, поздравительная открытка.' },
        { num: '19', title: 'Об\'ємні зображення. 3D в Illustrator', desc: 'Обертання та витягування об\'єктів, 3D-ефекти, будівлі, прототип телефону, рендеринг, трасування.', title_ru: 'Объёмные изображения. 3D в Illustrator', desc_ru: 'Вращение и вытягивание объектов, 3D-эффекты, здания, прототип телефона, рендеринг, трассировка.' },
        { num: '20', title: 'Растрові зображення в Illustrator', desc: 'Розміщення, трансформація, конвертація растр↔вектор. Live Paint, палітра Links, кадрування.', title_ru: 'Растровые изображения в Illustrator', desc_ru: 'Размещение, трансформация, конвертация растр↔вектор. Live Paint, палитра Links, кадрирование.' },
        { num: '21', title: 'Підготовка до друку та експорт', desc: 'Вильоти, відступи, перевірка кольору. Вимоги друкарні, підготовка макета, параметри друку, експорт.', title_ru: 'Подготовка к печати и экспорт', desc_ru: 'Вылеты, отступы, проверка цвета. Требования типографии, подготовка макета, параметры печати, экспорт.' },
        { num: '22', title: 'Підготовка для Web', desc: 'Команди Slice, експорт у JPEG, GIF, PNG, SVG. Діалогове вікно Save for Web.', title_ru: 'Подготовка для Web', desc_ru: 'Команды Slice, экспорт в JPEG, GIF, PNG, SVG. Диалоговое окно Save for Web.' },
        { num: '23', title: 'Практичні кейси', desc: 'Гірський пейзаж, набір іконок для продажу, флет-дизайн, іконки для сайту.', title_ru: 'Практические кейсы', desc_ru: 'Горный пейзаж, набор иконок для продажи, флэт-дизайн, иконки для сайта.' },
        { num: '24', title: 'Як отримати роботу дизайнером', desc: 'Портфоліо, в чому себе спробувати, професійні ресурси, авторське право, робота зі стоком.', title_ru: 'Как получить работу дизайнером', desc_ru: 'Портфолио, в чём себя попробовать, профессиональные ресурсы, авторское право, работа со стоком.' },
        { num: '25', title: 'Поліграфія. Розробка візитки', desc: 'Види поліграфії, розміри та правила. Робота з клієнтом і друкарнею, колірні профілі, практика.', title_ru: 'Полиграфия. Разработка визитки', desc_ru: 'Виды полиграфии, размеры и правила. Работа с клиентом и типографией, цветовые профили, практика.' },
        { num: '26', title: 'Брендбук та гайдлайн', desc: 'Загальні правила створення, розробка брендбуку на задану тематику. Передрукова підготовка.', title_ru: 'Брендбук и гайдлайн', desc_ru: 'Общие правила создания, разработка брендбука на заданную тематику. Допечатная подготовка.' },
        { num: '27', title: 'Флаєри, буклети, оголошення', desc: 'Теорія поліграфії та передрукової підготовки. Створення власних макетів за зразком.', title_ru: 'Флаеры, буклеты, объявления', desc_ru: 'Теория полиграфии и допечатной подготовки. Создание собственных макетов по образцу.' },
        { num: '28', title: 'Створення логотипу', desc: 'Розробка логотипу в Illustrator. Створення 6 варіантів реалізації одного логотипу.', title_ru: 'Создание логотипа', desc_ru: 'Разработка логотипа в Illustrator. Создание 6 вариантов реализации одного логотипа.' },
        { num: '29', title: 'Модерація соціальних мереж', desc: 'Роль соцмереж у сучасних продажах, практичне використання, створення та брендування акаунтів.', title_ru: 'Модерация социальных сетей', desc_ru: 'Роль соцсетей в современных продажах, практическое использование, создание и брендирование аккаунтов.' },
        { num: '🚀', title: 'Мобільні ігри: дизайн та проектування', desc: 'Теорія геймдизайну, кнопки, меню, шкали. Розробка маджонгу, пазлів, гонок, монетизація.', title_ru: 'Мобильные игры: дизайн и проектирование', desc_ru: 'Теория геймдизайна, кнопки, меню, шкалы. Разработка маджонга, пазлов, гонок, монетизация.' },
      ]});
      coursesDb.create({ id: 'webdesign-12-18', name: 'Веб-дизайн та UI/UX: від верстки до портфоліо', name_ru: 'Веб-дизайн и UI/UX: от вёрстки до портфолио', emoji: '💼', age: '12–18 років', age_group: '12-18', description: 'HTML, CSS, JS, Figma, анімація та перший фріланс — 28 тем · 156 занять', description_ru: 'HTML, CSS, JS, Figma, анимация и первый фриланс — 28 тем · 156 занятий', lessonsCount: 156, ...shared, curriculum: [
        { num: '01', title: 'Вступ до веб-розробки', desc: 'Як працюють сайти, backend і frontend. Sublime Text, перша HTML-сторінка, теги, атрибути, CSS-стилі.', title_ru: 'Введение в веб-разработку', desc_ru: 'Как работают сайты, backend и frontend. Sublime Text, первая HTML-страница, теги, атрибуты, CSS-стили.' },
        { num: '02', title: 'Мова HTML', desc: 'Структура HTML5, основні теги, веб-форми, валідація, таблиці, семантична верстка та стандарти.', title_ru: 'Язык HTML', desc_ru: 'Структура HTML5, основные теги, веб-формы, валидация, таблицы, семантическая вёрстка и стандарты.' },
        { num: '03', title: 'Історія та стандарти', desc: 'Розвиток інтернету, WWW, XHTML, блокові та лінійні елементи, заголовки H1-H6, редактори та браузери.', title_ru: 'История и стандарты', desc_ru: 'Развитие интернета, WWW, XHTML, блочные и линейные элементы, заголовки H1-H6, редакторы и браузеры.' },
        { num: '04', title: 'Основи CSS', desc: 'Синтаксис CSS, правила каскадності, групування та успадкування стилів, пріоритети.', title_ru: 'Основы CSS', desc_ru: 'Синтаксис CSS, правила каскадности, группировка и наследование стилей, приоритеты.' },
        { num: '05', title: 'Селектори CSS', desc: 'Комбіновані селектори, групування та успадкування, пріоритети стилів у CSS.', title_ru: 'Селекторы CSS', desc_ru: 'Комбинированные селекторы, группировка и наследование, приоритеты стилей в CSS.' },
        { num: '06', title: 'Посилання та шляхи', desc: 'Тег посилання, відносні та абсолютні шляхи, URL/URN, фрагменти сторінки, іменування папок.', title_ru: 'Ссылки и пути', desc_ru: 'Тег ссылки, относительные и абсолютные пути, URL/URN, фрагменты страницы, именование папок.' },
        { num: '07', title: 'Списки, символи, метадані', desc: 'Марковані та нумеровані списки, Unicode, MIME-типи, метадані KEYWORDS та DESCRIPTION, SEO-основи.', title_ru: 'Списки, символы, метаданные', desc_ru: 'Маркированные и нумерованные списки, Unicode, MIME-типы, метаданные KEYWORDS и DESCRIPTION, SEO-основы.' },
        { num: '08', title: 'CSS. Блокова модель та позиціонування', desc: 'Box model, border/margin/padding, обтікання, навігація, Relative/Absolute/Flex/Fixed.', title_ru: 'CSS. Блочная модель и позиционирование', desc_ru: 'Box model, border/margin/padding, обтекание, навигация, Relative/Absolute/Flex/Fixed.' },
        { num: '09', title: 'Шрифти та текст', desc: 'Шрифтове та текстове оформлення, вирівнювання, інтерліньяж, кернінг, колір, написання текстів для Web.', title_ru: 'Шрифты и текст', desc_ru: 'Шрифтовое и текстовое оформление, выравнивание, интерлиньяж, кернинг, цвет, написание текстов для Web.' },
        { num: '10', title: 'Кольори та зображення', desc: 'Колірні моделі в CSS, формати JPEG/GIF/PNG, фонові зображення, градієнт, тіні, UI-генератори.', title_ru: 'Цвета и изображения', desc_ru: 'Цветовые модели в CSS, форматы JPEG/GIF/PNG, фоновые изображения, градиент, тени, UI-генераторы.' },
        { num: '11', title: 'Розташування елементів (CSS)', desc: 'Relative/Absolute, z-index, селектори по ієрархії, класи та ідентифікатори, зовнішні таблиці стилів.', title_ru: 'Расположение элементов (CSS)', desc_ru: 'Relative/Absolute, z-index, селекторы по иерархии, классы и идентификаторы, внешние таблицы стилей.' },
        { num: '12', title: 'Таблиці', desc: 'Структура таблиці, об\'єднання комірок, оформлення класами, карти посилань, застаріла таблична верстка.', title_ru: 'Таблицы', desc_ru: 'Структура таблицы, объединение ячеек, оформление классами, карты ссылок, устаревшая табличная вёрстка.' },
        { num: '13', title: 'Медіазапити', desc: 'Синтаксис медіазапитів, логічні оператори, viewport, стратегії адаптивності, орієнтири по розмірах екрану.', title_ru: 'Медиазапросы', desc_ru: 'Синтаксис медиазапросов, логические операторы, viewport, стратегии адаптивности, ориентиры по размерам экрана.' },
        { num: '14', title: 'Псевдокласи та анімації CSS', desc: 'Псевдокласи тексту, посилань, кнопок, оформлення списків, бібліотека Animate.css, практика блоків.', title_ru: 'Псевдоклассы и анимации CSS', desc_ru: 'Псевдоклассы текста, ссылок, кнопок, оформление списков, библиотека Animate.css, практика блоков.' },
        { num: '15', title: 'Підсумки базової верстки', desc: 'Розподіл наповнення та оформлення, ініціатива доступності Web, розміщення сторінок в інтернеті.', title_ru: 'Итоги базовой вёрстки', desc_ru: 'Распределение наполнения и оформления, инициатива доступности Web, размещение страниц в интернете.' },
        { num: '16', title: 'Адаптивність та кросбраузерність', desc: 'Гумовий сайт, media-запити, Flexbox, сітки, особливості браузерів, інструменти перевірки.', title_ru: 'Адаптивность и кроссбраузерность', desc_ru: 'Резиновый сайт, media-запросы, Flexbox, сетки, особенности браузеров, инструменты проверки.' },
        { num: '17', title: 'Flexbox', desc: 'Гнучкий контейнер, осі, порядок елементів, багаторядковість, коефіцієнти зростання/стиснення, вирівнювання.', title_ru: 'Flexbox', desc_ru: 'Гибкий контейнер, оси, порядок элементов, многострочность, коэффициенты роста/сжатия, выравнивание.' },
        { num: '18', title: 'Advanced CSS', desc: 'Складні селектори, !important, псевдо-елементи, трансформації, БЕМ, Bootstrap, SASS/LESS.', title_ru: 'Advanced CSS', desc_ru: 'Сложные селекторы, !important, псевдо-элементы, трансформации, БЭМ, Bootstrap, SASS/LESS.' },
        { num: '19', title: 'Основи JavaScript', desc: 'Підключення JS, jQuery, обробка подій, показ/приховання елементів, робота з мережею, JS-фреймворки.', title_ru: 'Основы JavaScript', desc_ru: 'Подключение JS, jQuery, обработка событий, показ/скрытие элементов, работа с сетью, JS-фреймворки.' },
        { num: '20', title: 'Оформлення веб-проекту', desc: 'Фон, градієнти, тіні, типографіка, спецсимволи, формати зображень, Favicon, SVG та Canvas.', title_ru: 'Оформление веб-проекта', desc_ru: 'Фон, градиенты, тени, типографика, спецсимволы, форматы изображений, Favicon, SVG и Canvas.' },
        { num: '21', title: 'Знайомство з Figma', desc: 'Фрейми, компоненти, Auto Layout, стилі — сучасний інструмент UI-дизайнера та верстальника.', title_ru: 'Знакомство с Figma', desc_ru: 'Фреймы, компоненты, Auto Layout, стили — современный инструмент UI-дизайнера и верстальщика.' },
        { num: '22', title: 'UI-кіт та прототип у Figma', desc: 'Design System, кольорові токени, варіанти компонентів, інтерактивний прототип для клієнта.', title_ru: 'UI-кит и прототип в Figma', desc_ru: 'Design System, цветовые токены, варианты компонентов, интерактивный прототип для клиента.' },
        { num: '23', title: 'UX Research та проектування', desc: 'User Persona, Customer Journey Map, wireframes, usability testing — думаємо як користувач.', title_ru: 'UX Research и проектирование', desc_ru: 'User Persona, Customer Journey Map, wireframes, usability testing — думаем как пользователь.' },
        { num: '24', title: 'Анімація CSS та JavaScript', desc: 'Keyframes, transitions, GSAP, Lottie — живі ефекти на сайті без Flash та додаткових плагінів.', title_ru: 'Анимация CSS и JavaScript', desc_ru: 'Keyframes, transitions, GSAP, Lottie — живые эффекты на сайте без Flash и дополнительных плагинов.' },
        { num: '25', title: 'Adobe Photoshop для Web', desc: 'Нарізка макету, оптимізація зображень для завантаження, мокапи, ретуш для сайту.', title_ru: 'Adobe Photoshop для Web', desc_ru: 'Нарезка макета, оптимизация изображений для загрузки, мокапы, ретушь для сайта.' },
        { num: '26', title: 'Motion Design: анімація інтерфейсів', desc: 'Smart Animate у Figma, мікроанімації, After Effects для лого — як зробити дизайн живим.', title_ru: 'Motion Design: анимация интерфейсов', desc_ru: 'Smart Animate в Figma, микроанимации, After Effects для лого — как сделать дизайн живым.' },
        { num: '27', title: 'Ведення власних проектів та фріланс', desc: 'Upwork, Behance, GitHub Pages — портфоліо, ставки, NDA, перший контракт на веб-дизайн.', title_ru: 'Ведение собственных проектов и фриланс', desc_ru: 'Upwork, Behance, GitHub Pages — портфолио, ставки, NDA, первый контракт на веб-дизайн.' },
        { num: '🚀', title: 'Інструменти верстальника. Дипломна робота', desc: 'Домен та хостинг, Git, таск-трекери, збирачі, мініфікатори. Публікація власного сайту.', title_ru: 'Инструменты верстальщика. Дипломная работа', desc_ru: 'Домен и хостинг, Git, таск-трекеры, сборщики, минификаторы. Публикация собственного сайта.' },
      ]});
      console.log('✅  Seeded webdesign age-group courses (6-12, 12-18)');
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
app.set('trust proxy', 1); // behind LiteSpeed/Nginx reverse proxy
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
      scriptSrc:   ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://www.googletagmanager.com", "https://www.google-analytics.com", "https://t.contentsquare.net"],
      styleSrc:    ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      fontSrc:     ["'self'", "https://fonts.gstatic.com"],
      imgSrc:      ["'self'", "data:", "https:"],
      connectSrc:     ["'self'", "https://www.google-analytics.com", "https://analytics.google.com", "https://stats.g.doubleclick.net", "https://*.contentsquare.net"],
      frameSrc:       ["https://www.googletagmanager.com"],
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
});

// Admin: dashboard makes ~11 requests per load (parallel monthly-payments fetches).
// 500/15min gives ~45 full dashboard reloads before limiting — plenty for normal use.
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: 'Too many requests.' },
});

// ── DYNAMIC SITEMAP ───────────────────────────────────────────────────────────
app.get('/sitemap.xml', (req, res) => {
  const base  = 'https://webdesign.mycomputer.education';
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
  const base = 'https://webdesign.mycomputer.education';
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
Місто: Дніпро, Україна
Цей сайт: ${base}
Головний сайт мережі шкіл: https://mycomputer.education
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

// ── ARTICLE PAGES ─────────────────────────────────────────────────────────────
// ── ARTICLES SSR ──────────────────────────────────────────────────────────────
// Previously /articles and /articles/:slug just served the raw static files —
// no SEO meta injection at all, and the article body / listing grid were only
// ever filled in by client JS fetching /data/articles.json. A crawler that
// doesn't execute JS (Google's non-JS pass, and most AI crawlers — GPTBot,
// ClaudeBot, PerplexityBot, etc.) saw an empty "Завантаження..." placeholder
// and zero real <a href="/articles/..."> links. Mirrors client-side LABEL_MAP
// (js/main.js, articles/index.html) so server-rendered cards match what the
// JS re-renders on top of them. Registered before express.static() so these
// routes take precedence over the raw files on disk.
const ARTICLE_LABEL_MAP = {
  '🎨': {label:'Курси',         cls:'cat-design'},
  '🖌️': {label:'Для батьків',   cls:'cat-parents'},
  '🧭': {label:'UI/UX дизайн',  cls:'cat-design'},
  '💡': {label:'Для батьків',   cls:'cat-parents'},
  '🎯': {label:'Вибір курсу',   cls:'cat-tips'},
  '💬': {label:'Гайди',         cls:'cat-guide'},
  '📖': {label:'Словник',       cls:'cat-dict'},
};
function pluralArticlesWd(n, isRu) {
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
function trWd(a, field, isRu) {
  if (isRu && a[field + '_ru']) return a[field + '_ru'];
  return a[field] || '';
}
// webdesign never had an HTML-escaping helper (its API routes only ever
// returned JSON), so the SSR templates below need their own.
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const ARTICLES_INDEX_TPL_WD = fs.readFileSync(path.join(__dirname, '..', 'articles', 'index.html'), 'utf8');
function renderArticlesListing(req, res) {
  const isRu = req.query.lang === 'ru';
  const siteUrl = 'https://webdesign.mycomputer.education';
  const activeArticles = articlesDb.getActive();

  const cardsHtml = activeArticles.map(a => {
    const lbl = ARTICLE_LABEL_MAP[a.coverEmoji] || { label: escHtml(a.category || 'стаття'), cls: '' };
    const dateStr = a.publishedAt
      ? new Date(a.publishedAt).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
      : '';
    return `
    <a class="article-card" href="/articles/${escHtml(a.slug)}${isRu ? '?lang=ru' : ''}" aria-label="${escHtml(trWd(a, 'title', isRu))}">
      <div class="article-card__top">
        <span class="article-card__emoji">${a.coverEmoji || '📄'}</span>
        <span class="article-card__cat ${lbl.cls}">${lbl.label}</span>
      </div>
      <div class="article-card__body">
        <h2 class="article-card__title">${escHtml(trWd(a, 'title', isRu))}</h2>
        <p class="article-card__excerpt">${escHtml(trWd(a, 'excerpt', isRu))}</p>
      </div>
      <div class="article-card__footer">
        <span class="article-card__date">${dateStr}</span>
        <span class="article-card__read">${isRu ? 'Читать →' : 'Читати →'}</span>
      </div>
    </a>`;
  }).join('');

  let html = ARTICLES_INDEX_TPL_WD
    .replace(
      '<p class="listing-hero__sub" id="heroSub">Завантаження…</p>',
      `<p class="listing-hero__sub" id="heroSub">${pluralArticlesWd(activeArticles.length, isRu)}</p>`
    )
    .replace(
      '<span class="listing-count" id="listingCount"></span>',
      `<span class="listing-count" id="listingCount">${pluralArticlesWd(activeArticles.length, isRu)}</span>`
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
}
app.get('/articles', renderArticlesListing);
app.get('/articles/', renderArticlesListing);

const ARTICLE_HTML_TPL_WD = fs.readFileSync(path.join(__dirname, '..', 'article.html'), 'utf8');
app.get('/articles/:slug', (req, res) => {
  const { slug } = req.params;
  if (!SAFE_ID_RE.test(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));

  const article = articlesDb.getBySlug(slug);
  if (!article) return res.sendFile(path.join(__dirname, '..', 'article.html'));

  const isRu      = req.query.lang === 'ru';
  const title     = trWd(article, 'title', isRu) || 'Стаття';
  const excerpt   = trWd(article, 'excerpt', isRu).slice(0, 160);
  const content   = trWd(article, 'content', isRu);
  const siteUrl   = 'https://webdesign.mycomputer.education';
  const pageUrl   = `${siteUrl}/articles/${slug}`;
  const fullTitle = `${title} — My Computer Academy`;

  const publishedIso = article.publishedAt
    ? new Date(article.publishedAt).toISOString() : new Date().toISOString();

  const dateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const related = articlesDb.getActive().filter(a => a.id !== article.id).slice(0, 4);
  const relatedHtml = related.length ? `
          <div class="sidebar-card">
            <h3>${isRu ? 'Читайте также' : 'Читайте також'}</h3>
            ${related.map(r => `<a class="sidebar-link" href="/articles/${escHtml(r.slug)}${isRu ? '?lang=ru' : ''}">${r.coverEmoji || '📄'} ${escHtml(trWd(r, 'title', isRu))}</a>`).join('')}
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

  let html = ARTICLE_HTML_TPL_WD
    .replace('<title id="pageTitle">Стаття — My Computer Academy</title>',
             `<title id="pageTitle">${escHtml(fullTitle)}</title>`)
    .replace('<meta name="description" id="pageDesc" content="Корисні статті про веб-дизайн для дітей від My Computer Academy"/>',
             `<meta name="description" id="pageDesc" content="${escHtml(excerpt) || 'Корисні статті про веб-дизайн для дітей від My Computer Academy'}"/>
  <link rel="canonical" href="${pageUrl}${isRu ? '?lang=ru' : ''}"/>${hreflangBlock}
  <meta property="og:title" content="${escHtml(fullTitle)}"/>
  <meta property="og:description" content="${escHtml(excerpt)}"/>
  <meta property="og:url" content="${pageUrl}"/>
  <meta property="og:type" content="article"/>
  <meta property="og:image" content="https://webdesign.mycomputer.education/og-image.png?v=2"/>
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
      source:     'webdesign.mycomputer.education',
    };

    const result = db.insertLead(sanitized);
    console.log(`[LEAD #${result.id}] ${sanitized.child_name} | ${sanitized.phone} | ${sanitized.course || '—'}`);

    // Forward to main admin panel (non-blocking)
    if (process.env.MAIN_ADMIN_TOKEN) {
      fetch('https://mycomputer.education/api/leads/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': process.env.MAIN_ADMIN_TOKEN },
        body: JSON.stringify({ ...sanitized, course: sanitized.course || 'Веб-дизайн (лендинг)', notes: 'Заявка з webdesign.mycomputer.education' }),
      }).then(r => {
        if (!r.ok) r.text().then(t => console.error(`[FORWARD] HTTP ${r.status}: ${t.slice(0, 200)}`));
        else console.log(`[FORWARD] Lead forwarded to main admin OK`);
      }).catch(err => console.error('[FORWARD] fetch error:', err.message));
    } else {
      console.warn('[FORWARD] MAIN_ADMIN_TOKEN not set — lead not forwarded to main admin');
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

// ── COURSE PAGES ──────────────────────────────────────────────────────────────
// Server-render title/description/canonical/hreflang/OG/JSON-LD for
// /courses/:slug — previously a bare static sendFile with everything set by
// client JS only (renderCourse() in course.html), so crawlers that don't
// execute JS saw the literal placeholder "Курс — My Computer Academy" for
// every course. The visible curriculum/pricing/FAQ body is still rendered by
// that same client JS — this only fixes the head + structured data, matching
// the pattern already shipped on main/design's /courses/:slug route.
const COURSE_SLUGS = ['scratch', 'python', 'roblox', 'web'];
const COURSE_HTML_TPL = fs.readFileSync(path.join(__dirname, '..', 'course.html'), 'utf8');
app.get('/courses/:slug', (req, res) => {
  const { slug } = req.params;
  if (!SAFE_ID_RE.test(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
  const course = coursesDb.getAll().find(c => c.id === slug);
  if (!course && !COURSE_SLUGS.includes(slug)) return res.status(404).sendFile(path.join(__dirname, '..', '404.html'));
  if (!course) return res.sendFile(path.join(__dirname, '..', 'course.html'));

  const isRu    = req.query.lang === 'ru';
  const name    = (isRu && course.name_ru) ? course.name_ru : course.name;
  const rawDesc = (isRu && course.description_ru) ? course.description_ru : (course.description || 'Детальна інформація про курс програмування для дітей у My Computer Academy');
  const desc    = rawDesc.slice(0, 160);
  const title   = `${name} — My Computer Academy`;
  const siteUrl = 'https://webdesign.mycomputer.education';
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
          { '@type': 'ListItem', position: 2, item: { '@id': `${siteUrl}/#courses`, name: isRu ? 'Курсы' : 'Курси' } },
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
      '<meta name="description" content="Детальна інформація про курс програмування для дітей у My Computer Academy"/>',
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

