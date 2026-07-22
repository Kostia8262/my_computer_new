/* Додаткові завдання · Модуль 07 · 8-11 Веб-Старт */
(function () {
  'use strict';
  var EXT = {

    /* ─── 07-01  Wireframe ───────────────────────────────────── */
    '07-01': [
      { level:'easy',   uk:'Порахуй скільки блоків .wf-* є у HTML і підпиши кожен коментарем <!-- назва секції -->.',                                                          ru:'Посчитай сколько блоков .wf-* есть в HTML и подпиши каждый комментарием <!-- название секции -->.' },
      { level:'medium', uk:'Зміни висоту .wf-hero у CSS з 200px до 300px — так буде ближче до реальної hero-секції.',                                                           ru:'Измени высоту .wf-hero в CSS с 200px до 300px — так будет ближе к реальной hero-секции.' },
      { level:'medium', uk:'Додай новий wireframe-блок .wf-blog «Блог» між .wf-quote і .wf-contact — скопіюй стиль існуючого блоку і поміняй колір та підпис.',                ru:'Добавь новый wireframe-блок .wf-blog «Блог» между .wf-quote и .wf-contact — скопируй стиль существующего блока и поменяй цвет и подпись.' },
      { level:'hard',   uk:'Зроби .wf-about і .wf-skills поруч у дві колонки: обгорни їх у div і застосуй display:grid; grid-template-columns:1fr 1fr; gap:12px.',             ru:'Сделай .wf-about и .wf-skills рядом в две колонки: оберни их в div и примени display:grid; grid-template-columns:1fr 1fr; gap:12px.' },
      { level:'extra',  uk:'Намалюй на папері власний wireframe майбутнього сайту з 8 секцій — покажи друзям, чи зрозуміло де що буде без будь-яких пояснень.',               ru:'Нарисуй на бумаге собственный wireframe будущего сайта из 8 секций — покажи друзьям, понятно ли где что будет без каких-либо объяснений.' },
    ],

    /* ─── 07-02  HTML-скелет ─────────────────────────────────── */
    '07-02': [
      { level:'easy',   uk:'Знайди тег <title> і заміни текст на своє ім\'я — перевір що змінилось у назві вкладки браузера.',                                                 ru:'Найди тег <title> и замени текст на своё имя — проверь что изменилось в названии вкладки браузера.' },
      { level:'medium', uk:'Додай у <head> тег <meta name="description" content="Мій сайт-портфоліо"> — пошуковики покажуть цей опис під назвою сайту.',                      ru:'Добавь в <head> тег <meta name="description" content="Мой сайт-портфолио"> — поисковики покажут это описание под названием сайта.' },
      { level:'medium', uk:'Порахуй і запиши у коментарі скільки семантичних тегів є у HTML: header, main, footer, section, article, nav.',                                     ru:'Посчитай и запиши в комментарии сколько семантических тегов есть в HTML: header, main, footer, section, article, nav.' },
      { level:'hard',   uk:'Перевір що у кожної <section> є унікальний id — додай id="hero", id="about", id="skills", id="works", id="contact" там де вони відсутні.',          ru:'Проверь что у каждой <section> есть уникальный id — добавь id="hero", id="about", id="skills", id="works", id="contact" там где они отсутствуют.' },
      { level:'extra',  uk:'Відкрий DevTools (F12) → Elements і знайди де закінчується <head> і починається <body> — зроби скріншот або замалюй дерево DOM у зошиті.',         ru:'Открой DevTools (F12) → Elements и найди где заканчивается <head> и начинается <body> — сделай скриншот или зарисуй дерево DOM в тетради.' },
    ],

    /* ─── 07-03  Шапка і навігація ─────────────────────────── */
    '07-03': [
      { level:'easy',   uk:'Знайди .logo у шапці і заміни «Аліна Коваль» та ✨ на своє ім\'я та улюблений emoji.',                                                              ru:'Найди .logo в шапке и замени «Алина Коваль» и ✨ на своё имя и любимый emoji.' },
      { level:'medium', uk:'Додай п\'яте посилання у .nav: <a href="#hero" class="nav-link">Початок</a> — воно повертає на верх сторінки.',                                     ru:'Добавь пятую ссылку в .nav: <a href="#hero" class="nav-link">Начало</a> — она возвращает наверх страницы.' },
      { level:'medium', uk:'Переміщуй клас active між посиланнями .nav-link і спостерігай яке з них змінює колір — де active має бути за змістом?',                             ru:'Перемещай класс active между ссылками .nav-link и наблюдай какая из них меняет цвет — где active должен быть по смыслу?' },
      { level:'hard',   uk:'Зміни фон шапки у CSS: .header { background: rgba(30,10,60,.92); } — фіолетово-темна шапка! Поверни оригінал якщо не сподобалось.',                 ru:'Измени фон шапки в CSS: .header { background: rgba(30,10,60,.92); } — фиолетово-тёмная шапка! Верни оригинал если не понравилось.' },
      { level:'extra',  uk:'Збільш font-size .logo до 20px і font-weight до 800 — потім додай text-shadow: 0 0 20px var(--clr-accent) для красивого свічення логотипу.',         ru:'Увеличь font-size .logo до 20px и font-weight до 800 — потом добавь text-shadow: 0 0 20px var(--clr-accent) для красивого свечения логотипа.' },
    ],

    /* ─── 07-04  Hero-секція ────────────────────────────────── */
    '07-04': [
      { level:'easy',   uk:'Знайди «Привіт, я» у HTML і заміни «Аліна» всередині .accent на своє справжнє ім\'я.',                                                             ru:'Найди «Привет, я» в HTML и замени «Алина» внутри .accent на своё настоящее имя.' },
      { level:'medium', uk:'Заміни seed аватару: знайди seed/girl42 і заміни "girl42" на будь-яке слово — спробуй "space99", "robot7", "star42".',                              ru:'Замени seed аватара: найди seed/girl42 и замени "girl42" на любое слово — попробуй "space99", "robot7", "star42".' },
      { level:'medium', uk:'Знайди .hero-sub і напиши свій власний слоган — чим ти цікавишся або яку суперсилу маєш?',                                                          ru:'Найди .hero-sub и напиши свой собственный слоган — чем ты интересуешься или какую суперсилу имеешь?' },
      { level:'hard',   uk:'Замінь текст кнопок .btn-primary і .btn-outline на власний — наприклад "Дивись мої роботи" і "Напиши мені".',                                        ru:'Замени текст кнопок .btn-primary и .btn-outline на свой — например "Смотри мои работы" и "Напиши мне".' },
      { level:'extra',  uk:'Знайди у CSS .hero-inner і додай animation: fadeIn 1s ease-out; — потім оголоси @keyframes fadeIn { from{opacity:0} to{opacity:1} }.',              ru:'Найди в CSS .hero-inner и добавь animation: fadeIn 1s ease-out; — потом объяви @keyframes fadeIn { from{opacity:0} to{opacity:1} }.' },
    ],

    /* ─── 07-05  Секція «Про мене» ─────────────────────────── */
    '07-05': [
      { level:'easy',   uk:'Заміни seed у .about-photo: знайди seed/student7 і заміни "student7" на будь-яке слово — "astronaut", "hero", "coder".',                            ru:'Замени seed в .about-photo: найди seed/student7 и замени "student7" на любое слово — "astronaut", "hero", "coder".' },
      { level:'medium', uk:'Заміни текст у h3 і p в .about-text на своє справжнє ім\'я, вік і короткий опис — скільки місяців вчишся програмувати?',                           ru:'Замени текст в h3 и p в .about-text на своё настоящее имя, возраст и краткое описание — сколько месяцев учишься программировать?' },
      { level:'medium', uk:'Заміни цифри у .fact-num на свої реальні: скільки тобі років, скільки місяців вчишся і скільки проектів зробив.',                                   ru:'Замени цифры в .fact-num на свои реальные: сколько тебе лет, сколько месяцев учишься и сколько проектов сделал.' },
      { level:'hard',   uk:'Додай четвертий .fact: <div class="fact"><div class="fact-num">JS</div><div class="fact-label">Моя мова</div></div>.',                               ru:'Добавь четвёртый .fact: <div class="fact"><div class="fact-num">JS</div><div class="fact-label">Мой язык</div></div>.' },
      { level:'extra',  uk:'Знайди у CSS .photo-wrap з border-radius і спробуй: 50% (коло), 30% 70% 70% 30% / 30% 30% 70% 70% (хмарка), 8px (прямокутник).',                   ru:'Найди в CSS .photo-wrap с border-radius и попробуй: 50% (круг), 30% 70% 70% 30% / 30% 30% 70% 70% (облачко), 8px (прямоугольник).' },
    ],

    /* ─── 07-06  Навички ────────────────────────────────────── */
    '07-06': [
      { level:'easy',   uk:'Знайди теги .tag і додай ще один зі своєю реальною навичкою — наприклад "🎨 Малювання" або "🎮 Ігри".',                                            ru:'Найди теги .tag и добавь ещё один со своим реальным навыком — например "🎨 Рисование" или "🎮 Игры".' },
      { level:'medium', uk:'Знайди прогрес-бари і встанови свій ЧЕСНИЙ рівень у кожному: HTML %, CSS %, JavaScript % — не перебільшуй!',                                       ru:'Найди прогресс-бары и установи свой ЧЕСТНЫЙ уровень в каждом: HTML %, CSS %, JavaScript % — не преувеличивай!' },
      { level:'medium', uk:'Додай нову групу навичок «Хобі» з 3 тегами своїх захоплень — скопіюй існуючу групу і поміняй текст і emoji.',                                       ru:'Добавь новую группу навыков «Хобби» с 3 тегами своих увлечений — скопируй существующую группу и поменяй текст и emoji.' },
      { level:'hard',   uk:'Знайди у CSS класи кольорів тегів (.tag-html, .tag-css, .tag-js) і поміняй їхні background на нові кольори — зроби палітру на свій смак.',          ru:'Найди в CSS классы цветов тегов (.tag-html, .tag-css, .tag-js) и поменяй их background на новые цвета — сделай палитру по своему вкусу.' },
      { level:'extra',  uk:'Знайди .prog-fill у CSS і додай: animation: growBar 1.5s ease-out; — потім: @keyframes growBar { from{width:0} to{width:var(--w)} }.',              ru:'Найди .prog-fill в CSS и добавь: animation: growBar 1.5s ease-out; — потом: @keyframes growBar { from{width:0} to{width:var(--w)} }.' },
    ],

    /* ─── 07-07  Картки проектів (Grid) ────────────────────── */
    '07-07': [
      { level:'easy',   uk:'Знайди seed у URL зображень .work-card і заміни на тематичні слова: nature99 → space99, calc42 → game42.',                                          ru:'Найди seed в URL изображений .work-card и замени на тематические слова: nature99 → space99, calc42 → game42.' },
      { level:'medium', uk:'Додай четверту .work-card з власним проектом — придумай назву, опис і 2-3 теги технологій.',                                                         ru:'Добавь четвёртую .work-card с собственным проектом — придумай название, описание и 2-3 тега технологий.' },
      { level:'medium', uk:'Знайди текст усіх .work-card і замінь назви проектів на власні реальні або вигадані — нехай вони звучать цікаво!',                                  ru:'Найди текст всех .work-card и замени названия проектов на свои реальные или выдуманные — пусть они звучат интересно!' },
      { level:'hard',   uk:'Зроби першу картку «вибраною»: додай клас .featured і CSS: .work-card.featured { grid-column: span 2; border-top: 3px solid var(--clr-accent); }.', ru:'Сделай первую карточку «избранной»: добавь класс .featured и CSS: .work-card.featured { grid-column: span 2; border-top: 3px solid var(--clr-accent); }.' },
      { level:'extra',  uk:'Додай до кожної .work-card span з роком: <span class="work-year">2024</span> і CSS: .work-year { font-size:11px; color:var(--clr-muted); display:block; margin-bottom:6px; }.', ru:'Добавь к каждой .work-card span с годом: <span class="work-year">2024</span> и CSS: .work-year { font-size:11px; color:var(--clr-muted); display:block; margin-bottom:6px; }.' },
    ],

    /* ─── 07-08  Hover-ефекти та overlay ───────────────────── */
    '07-08': [
      { level:'easy',   uk:'Наведи мишку на кожну картку .work-card — перевір що .img-overlay з\'являється і картка піднімається.',                                            ru:'Наведи мышку на каждую карточку .work-card — проверь что .img-overlay появляется и карточка поднимается.' },
      { level:'medium', uk:'Знайди rgba у .img-overlay і зміни колір: наприклад rgba(124,58,237,.85) — оверлей став фіолетовим!',                                               ru:'Найди rgba в .img-overlay и измени цвет: например rgba(124,58,237,.85) — оверлей стал фиолетовым!' },
      { level:'medium', uk:'Знайди ефект :hover у .work-card і заміни translateY(-8px) на rotate(-2deg) scale(1.02) — картка нахиляється!',                                     ru:'Найди эффект :hover у .work-card и замени translateY(-8px) на rotate(-2deg) scale(1.02) — карточка наклоняется!' },
      { level:'hard',   uk:'Додай ефект для .overlay-links a: .overlay-links a:hover { background: #fff; color: var(--clr-accent); transform: scale(1.1); }.',                   ru:'Добавь эффект для .overlay-links a: .overlay-links a:hover { background: #fff; color: var(--clr-accent); transform: scale(1.1); }.' },
      { level:'extra',  uk:'Зроби transition різним: .work-card { transition: transform .15s } і .img-overlay { transition: opacity .6s } — порівняй плавність обох.',           ru:'Сделай transition разным: .work-card { transition: transform .15s } и .img-overlay { transition: opacity .6s } — сравни плавность обоих.' },
    ],

    /* ─── 07-09  Блок відгуків ──────────────────────────────── */
    '07-09': [
      { level:'easy',   uk:'Заміни всі цитати і імена авторів у .quote-card на власні — відгук від друга або улюблена цитата про навчання.',                                    ru:'Замени все цитаты и имена авторов в .quote-card на свои — отзыв от друга или любимая цитата об учёбе.' },
      { level:'medium', uk:'Додай четверту .quote-card з відгуком від однокласника, брата/сестри або вчителя — або вигадай смішний відгук!',                                    ru:'Добавь четвёртую .quote-card с отзывом от одноклассника, брата/сестры или учителя — или придумай смешной отзыв!' },
      { level:'medium', uk:'Знайди min-width у CSS для .quote-card і спробуй різні значення: 200px, 260px, 300px — який розмір виглядає найгармонійніше?',                      ru:'Найди min-width в CSS для .quote-card и попробуй разные значения: 200px, 260px, 300px — какой размер выглядит гармоничнее всего?' },
      { level:'hard',   uk:'Додай до секції .quotes-grid: scroll-snap-type: x mandatory і до .quote-card: scroll-snap-align: start — прокрути і відчуй ефект защіпок!',          ru:'Добавь к секции .quotes-grid: scroll-snap-type: x mandatory и к .quote-card: scroll-snap-align: start — прокрути и почувствуй эффект защёлок!' },
      { level:'extra',  uk:'Додай emoji-аватар до кожної .quote-card: <div class="q-av">🦊</div> і CSS: .q-av { font-size:32px; margin-bottom:8px; }.',                          ru:'Добавь emoji-аватар к каждой .quote-card: <div class="q-av">🦊</div> и CSS: .q-av { font-size:32px; margin-bottom:8px; }.' },
    ],

    /* ─── 07-10  Форма контактів ───────────────────────────── */
    '07-10': [
      { level:'easy',   uk:'Знайди .contact-items і заміни email, Telegram і GitHub на свої справжні або вигадані нікнейми.',                                                   ru:'Найди .contact-items и замени email, Telegram и GitHub на свои настоящие или выдуманные никнеймы.' },
      { level:'medium', uk:'Додай четвертий .contact-item з іконкою 📸 і Instagram або 💬 і Discord — скопіюй існуючий і поміняй.',                                              ru:'Добавь четвёртый .contact-item с иконкой 📸 и Instagram или 💬 и Discord — скопируй существующий и поменяй.' },
      { level:'medium', uk:'Знайди кнопку submit форми і додай у CSS: .contact-form button:hover { background: var(--clr-accent2); transform: translateY(-2px); }.',             ru:'Найди кнопку submit формы и добавь в CSS: .contact-form button:hover { background: var(--clr-accent2); transform: translateY(-2px); }.' },
      { level:'hard',   uk:'Знайди де у CSS задається :focus для полів форми і зміни виділення на 2px solid #7c3aed — при кліку поле буде фіолетовим!',                         ru:'Найди где в CSS задаётся :focus для полей формы и измени выделение на 2px solid #7c3aed — при клике поле будет фиолетовым!' },
      { level:'extra',  uk:'Додай до форми нове поле «Тема»: <div class="form-group"><label for="sub">Тема</label><input id="sub" name="subject" placeholder="Про що пишеш?"></div>.', ru:'Добавь в форму новое поле «Тема»: <div class="form-group"><label for="sub">Тема</label><input id="sub" name="subject" placeholder="О чём пишешь?"></div>.' },
    ],

    /* ─── 07-11  Footer ─────────────────────────────────────── */
    '07-11': [
      { level:'easy',   uk:'Знайди «Аліна Коваль» у footer і заміни на своє справжнє ім\'я — також заміни слоган на власний.',                                                  ru:'Найди «Алина Коваль» в footer и замени на своё настоящее имя — также замени слоган на собственный.' },
      { level:'medium', uk:'Додай четверте посилання у .social-links: іконка 🎥 (YouTube) або 🐦 (Twitter/X) зі своїм нікнеймом.',                                              ru:'Добавь четвёртую ссылку в .social-links: иконка 🎥 (YouTube) или 🐦 (Twitter/X) со своим никнеймом.' },
      { level:'medium', uk:'Знайди .back-top у CSS і зміни background на var(--clr-accent2) — кнопка «вгору» стала синьою!',                                                    ru:'Найди .back-top в CSS и измени background на var(--clr-accent2) — кнопка «вверх» стала синей!' },
      { level:'hard',   uk:'Зроби .back-top видимим лише при прокрученні: у JS напиши window.addEventListener("scroll", () => { bt.style.opacity = scrollY > 300 ? "1" : "0"; }).', ru:'Сделай .back-top видимым только при прокрутке: в JS напиши window.addEventListener("scroll", () => { bt.style.opacity = scrollY > 300 ? "1" : "0"; }).' },
      { level:'extra',  uk:'Зміни рік у copyright автоматично через JS: знайди де виводиться рік і постав new Date().getFullYear() замість статичного числа.',                  ru:'Измени год в copyright автоматически через JS: найди где выводится год и поставь new Date().getFullYear() вместо статического числа.' },
    ],

    /* ─── 07-12  CSS-змінні та кольорова тема ───────────────── */
    '07-12': [
      { level:'easy',   uk:'Знайди у CSS блок :root — порахуй скільки там змінних і підпиши кожну коментарем /* що контролює */.',                                              ru:'Найди в CSS блок :root — посчитай сколько там переменных и подпиши каждую комментарием /* что контролирует */.' },
      { level:'medium', uk:'Знайди де у CSS вживається var(--clr-accent) і порахуй скільки разів — потім зміни значення у :root і спостерігай.',                               ru:'Найди где в CSS используется var(--clr-accent) и посчитай сколько раз — потом измени значение в :root и наблюдай.' },
      { level:'medium', uk:'Додай у :root нову змінну --clr-warning: #f59e0b і застосуй її як border до .pc — жовта рамка картки!',                                             ru:'Добавь в :root новую переменную --clr-warning: #f59e0b и примени её как border к .pc — жёлтая рамка карточки!' },
      { level:'hard',   uk:'Спробуй нову темну схему: --clr-bg:#1a0a2e, --clr-surface:#2d1b69, --clr-accent:#f59e0b — темно-фіолетова тема з жовтим акцентом!',                ru:'Попробуй новую тёмную схему: --clr-bg:#1a0a2e, --clr-surface:#2d1b69, --clr-accent:#f59e0b — тёмно-фиолетовая тема с жёлтым акцентом!' },
      { level:'extra',  uk:'Знайди у JS функцію що змінює тему і додай новий акцентний колір "red" (#ef4444) — потім додай кнопку для нього.',                                  ru:'Найди в JS функцию которая меняет тему и добавь новый акцентный цвет "red" (#ef4444) — потом добавь кнопку для него.' },
    ],

    /* ─── 07-13  Адаптивна шапка / гамбургер ───────────────── */
    '07-13': [
      { level:'easy',   uk:'Знайди у HTML кнопку .burger і перевір — скільки <span> всередині? Саме вони малюють три лінії гамбургера.',                                        ru:'Найди в HTML кнопку .burger и проверь — сколько <span> внутри? Именно они рисуют три линии гамбургера.' },
      { level:'medium', uk:'Зменш вікно браузера нижче 768px — знайди у CSS блок @media де відбувається перетворення і прочитай його.',                                          ru:'Уменьши окно браузера ниже 768px — найди в CSS блок @media где происходит трансформация и прочитай его.' },
      { level:'medium', uk:'Додай ще один пункт у .nav: <a href="#contact" class="nav-link">Контакти</a> — перевір що він видно і на десктопі і в мобільному меню.',            ru:'Добавь ещё один пункт в .nav: <a href="#contact" class="nav-link">Контакты</a> — проверь что он виден и на десктопе и в мобильном меню.' },
      { level:'hard',   uk:'Додай до .nav.open анімацію появи: @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} } .nav.open { animation: slideDown .3s ease; }.', ru:'Добавь к .nav.open анимацию появления: @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} } .nav.open { animation: slideDown .3s ease; }.' },
      { level:'extra',  uk:'Зроби так щоб .burger перетворювався на хрестик при .burger.active: span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); } span:nth-child(2) { opacity:0; } span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }.', ru:'Сделай так чтобы .burger превращался в крестик при .burger.active: span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); } span:nth-child(2) { opacity:0; } span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }.' },
    ],

    /* ─── 07-14  Якість: чек-лист та Lighthouse ────────────── */
    '07-14': [
      { level:'easy',   uk:'Відмічай пункти у .check-section «🎨 CSS-якість» і слідкуй яка частина сайту ще потребує доопрацювання.',                                           ru:'Отмечай пункты в .check-section «🎨 CSS-качество» и следи какая часть сайта ещё требует доработки.' },
      { level:'medium', uk:'Додай новий .check-section «🚀 Швидкість» з пунктами: оптимізовані зображення, мінімум шрифтів, немає зайвих скриптів.',                            ru:'Добавь новый .check-section «🚀 Скорость» с пунктами: оптимизированы изображения, минимум шрифтов, нет лишних скриптов.' },
      { level:'medium', uk:'Виміряй Lighthouse-скор у Chrome DevTools (F12 → Lighthouse → Analyze page load) — запиши результати Performance і Accessibility.',                  ru:'Измерь Lighthouse-скор в Chrome DevTools (F12 → Lighthouse → Analyze page load) — запиши результаты Performance и Accessibility.' },
      { level:'hard',   uk:'Знайди у JS як підраховуються відмічені пункти і додай CSS: .score-box.perfect { background: var(--clr-accent); color:#fff; } для 100% результату.',  ru:'Найди в JS как подсчитываются отмеченные пункты и добавь CSS: .score-box.perfect { background: var(--clr-accent); color:#fff; } для 100% результата.' },
      { level:'extra',  uk:'Перевір кожен <img> на сторінці — чи є у всіх атрибут alt="..."? Якщо ні — додай описовий alt до кожного зображення.',                              ru:'Проверь каждый <img> на странице — есть ли у всех атрибут alt="..."? Если нет — добавь описательный alt к каждому изображению.' },
    ],

    /* ─── 07-15  ФІНАЛ: Портфоліо-сайт готовий ─────────────── */
    '07-15': [
      { level:'easy',   uk:'Перевір всі посилання у .nav — натисни кожне і переконайся що сторінка плавно прокручується до правильної секції.',                                ru:'Проверь все ссылки в .nav — нажми каждую и убедись что страница плавно прокручивается до правильной секции.' },
      { level:'medium', uk:'Перевір портфоліо на мобільному: DevTools (F12) → іконка телефону → вибери "iPhone SE" і перегляньте кожну секцію.',                               ru:'Проверь портфолио на мобильном: DevTools (F12) → иконка телефона → выбери "iPhone SE" и просмотри каждую секцию.' },
      { level:'medium', uk:'Покажи портфоліо дорослому або другу — попроси назвати одну річ яка сподобалась і одну яку можна покращити.',                                       ru:'Покажи портфолио взрослому или другу — попроси назвать одну вещь которая понравилась и одну которую можно улучшить.' },
      { level:'hard',   uk:'Опублікуй сайт через Netlify Drop: перейди на netlify.com/drop, перетягни папку проекту у браузер і отримай безкоштовне посилання.',               ru:'Опубликуй сайт через Netlify Drop: перейди на netlify.com/drop, перетащи папку проекта в браузер и получи бесплатную ссылку.' },
      { level:'extra',  uk:'Зроби скріншот готового портфоліо і поклади поруч із ескізом wireframe з уроку 07-01 — порівняй план і результат, що вийшло найкраще?',             ru:'Сделай скриншот готового портфолио и положи рядом с эскизом wireframe из урока 07-01 — сравни план и результат, что получилось лучше всего?' },
    ],

  };
  Object.keys(EXT).forEach(function (id) {
    var l = WEB_LESSONS.find(function (x) { return x.id === id; });
    if (l) l.tasks = (l.tasks || []).concat(EXT[id]);
  });
})();
