/* Додаткові завдання · Модуль 03 · 8-11 Веб-Старт */
(function () {
  'use strict';
  var EXT = {
    '03-01': [
      { level:'easy',   uk:'Додай transition: color 0.3s; до посилання. Колір при наведенні тепер змінюється плавно!', ru:'Добавь transition: color 0.3s; к ссылке. Цвет при наведении теперь меняется плавно!' },
      { level:'medium', uk:'Зроби кнопку з плавною зміною фону: button { transition: background-color 0.5s ease; }', ru:'Сделай кнопку с плавным изменением фона: button { transition: background-color 0.5s ease; }' },
      { level:'medium', uk:'Поєднай hover-стиль та transition для кнопки: при наведенні колір змінюється за 0.4 секунди.', ru:'Объедини hover-стиль и transition для кнопки: при наведении цвет меняется за 0.4 секунды.' },
      { level:'hard',   uk:'Додай transition одразу для кількох властивостей: color 0.3s, background-color 0.3s, transform 0.2s.', ru:'Добавь transition сразу для нескольких свойств: color 0.3s, background-color 0.3s, transform 0.2s.' },
      { level:'extra',  uk:'Спробуй різні ease-функції: linear, ease-in, ease-out, ease-in-out. Яка різниця у відчутті руху?', ru:'Попробуй разные ease-функции: linear, ease-in, ease-out, ease-in-out. В чём разница в ощущении движения?' },
    ],
    '03-02': [
      { level:'easy',   uk:'Збільш блок при наведенні: div:hover { transform: scale(1.2); }. Блок росте як повітряна куля!', ru:'Увеличь блок при наведении: div:hover { transform: scale(1.2); }. Блок растёт как воздушный шар!' },
      { level:'medium', uk:'Поверни зображення: img { transform: rotate(45deg); }. На скільки градусів? Спробуй 90, 180!', ru:'Поверни изображение: img { transform: rotate(45deg); }. На сколько градусов? Попробуй 90, 180!' },
      { level:'medium', uk:'Перемісти блок: div { transform: translate(30px, 10px); }. 30px праворуч та 10px вниз!', ru:'Переместь блок: div { transform: translate(30px, 10px); }. 30px вправо и 10px вниз!' },
      { level:'hard',   uk:'Поєднай трансформації: transform: scale(1.1) rotate(5deg); — що відбувається з блоком?', ru:'Объедини трансформации: transform: scale(1.1) rotate(5deg); — что происходит с блоком?' },
      { level:'extra',  uk:'Зроби ефект: при наведенні зображення повертається на 360deg за 1 секунду. Схоже на іграшку!', ru:'Сделай эффект: при наведении изображение поворачивается на 360deg за 1 секунду. Похоже на игрушку!' },
    ],
    '03-03': [
      { level:'easy',   uk:'Додай тінь до блоку: div { box-shadow: 2px 2px 5px gray; }. Блок отримав тінь!', ru:'Добавь тень к блоку: div { box-shadow: 2px 2px 5px gray; }. Блок получил тень!' },
      { level:'medium', uk:'Зроби м\'яку тінь: box-shadow: 0 4px 15px rgba(0,0,0,0.2); — ефект "картки, що летить"!', ru:'Сделай мягкую тень: box-shadow: 0 4px 15px rgba(0,0,0,0.2); — эффект "летящей карточки"!' },
      { level:'medium', uk:'Додай тінь до тексту: h1 { text-shadow: 2px 2px 4px blue; }. Заголовок заблищав!', ru:'Добавь тень к тексту: h1 { text-shadow: 2px 2px 4px blue; }. Заголовок засиял!' },
      { level:'hard',   uk:'Зроби ефект підняття: звичайна маленька тінь, а при :hover — велика та м\'яка тінь!', ru:'Сделай эффект поднятия: обычная маленькая тень, а при :hover — большая и мягкая тень!' },
      { level:'extra',  uk:'Спробуй кілька тіней через кому: box-shadow: 3px 3px 0 red, -3px -3px 0 blue; Що вийшло?', ru:'Попробуй несколько теней через запятую: box-shadow: 3px 3px 0 red, -3px -3px 0 blue; Что получилось?' },
    ],
    '03-04': [
      { level:'easy',   uk:'Зроби елемент напівпрозорим: div { opacity: 0.5; }. Все позаду проглядається крізь нього!', ru:'Сделай элемент полупрозрачным: div { opacity: 0.5; }. Всё позади просвечивается сквозь него!' },
      { level:'medium', uk:'Сховай елемент: div { visibility: hidden; } — місце ще залишається! Різниця з display: none!', ru:'Спрячь элемент: div { visibility: hidden; } — место ещё остаётся! Разница с display: none!' },
      { level:'medium', uk:'Порівняй display: none та visibility: hidden. Де залишається порожнє місце, а де — ні?', ru:'Сравни display: none и visibility: hidden. Где остаётся пустое место, а где — нет?' },
      { level:'hard',   uk:'Зроби ефект появи: звичайна opacity: 0.3, а при :hover — opacity: 1 плавно через transition!', ru:'Сделай эффект появления: обычная opacity: 0.3, а при :hover — opacity: 1 плавно через transition!' },
      { level:'extra',  uk:'Зроби "приховану підказку" — блок з opacity: 0 та текстом, що плавно з\'являється при наведенні!', ru:'Сделай "скрытую подсказку" — блок с opacity: 0 и текстом, который плавно появляется при наведении!' },
    ],
    '03-05': [
      { level:'easy',   uk:'Додай cursor: pointer; до кнопки. При наведенні мишка стає рукою — як на справжніх кнопках!', ru:'Добавь cursor: pointer; к кнопке. При наведении мышь становится рукой — как на настоящих кнопках!' },
      { level:'medium', uk:'Спробуй різні курсори на різних блоках: cursor: crosshair, cursor: wait, cursor: move. Що бачиш?', ru:'Попробуй разные курсоры на разных блоках: cursor: crosshair, cursor: wait, cursor: move. Что видишь?' },
      { level:'medium', uk:'Додай cursor: not-allowed; до заблокованої кнопки. Коли такий курсор корисний на сайтах?', ru:'Добавь cursor: not-allowed; к заблокированной кнопке. Когда такой курсор полезен на сайтах?' },
      { level:'hard',   uk:'Зроби меню з п\'яти пунктів, де кожен має cursor: pointer та hover-підсвітку фоном.', ru:'Сделай меню из пяти пунктов, где каждый имеет cursor: pointer и hover-подсветку фоном.' },
      { level:'extra',  uk:'Дізнайся про cursor: zoom-in та cursor: grab. Де на сайтах зазвичай використовується кожен?', ru:'Узнай про cursor: zoom-in и cursor: grab. Где на сайтах обычно используется каждый?' },
    ],
    '03-06': [
      { level:'easy',   uk:'Прибери стандартний вигляд кнопки: border: none; та додай красивий фон background: coral;', ru:'Убери стандартный вид кнопки: border: none; и добавь красивый фон background: coral;' },
      { level:'medium', uk:'Зроби кнопку гарною: padding: 12px 28px; border-radius: 25px; font-size: 16px;', ru:'Сделай кнопку красивой: padding: 12px 28px; border-radius: 25px; font-size: 16px;' },
      { level:'medium', uk:'Додай hover-ефект: кнопка стає темнішою при наведенні. Додай cursor: pointer і transition!', ru:'Добавь hover-эффект: кнопка становится темнее при наведении. Добавь cursor: pointer и transition!' },
      { level:'hard',   uk:'Створи три стилі кнопок: .btn-primary (синя), .btn-secondary (сіра), .btn-danger (червона).', ru:'Создай три стиля кнопок: .btn-primary (синяя), .btn-secondary (серая), .btn-danger (красная).' },
      { level:'extra',  uk:'Зроби кнопку що "натискається": при :active — transform: translateY(2px); Наче справжня кнопка!', ru:'Сделай кнопку которая "нажимается": при :active — transform: translateY(2px); Как настоящая кнопка!' },
    ],
    '03-07': [
      { level:'easy',   uk:'Додай тінь до картки: .card { box-shadow: 0 2px 8px rgba(0,0,0,0.15); }', ru:'Добавь тень к карточке: .card { box-shadow: 0 2px 8px rgba(0,0,0,0.15); }' },
      { level:'medium', uk:'При наведенні підніми картку: .card:hover { transform: translateY(-6px); }. Картка "літає"!', ru:'При наведении подними карточку: .card:hover { transform: translateY(-6px); }. Карточка "летит"!' },
      { level:'medium', uk:'Додай transition: all 0.3s ease; до .card — тепер підняття відбувається плавно і красиво!', ru:'Добавь transition: all 0.3s ease; к .card — теперь поднятие происходит плавно и красиво!' },
      { level:'hard',   uk:'Зроби три картки в ряд з класом .card та ефектом підняття при :hover на кожній!', ru:'Сделай три карточки в ряд с классом .card и эффектом поднятия при :hover на каждой!' },
      { level:'extra',  uk:'Додай до кожної картки зображення, заголовок, опис і кнопку. Мінімальний, але гарний дизайн!', ru:'Добавь к каждой карточке изображение, заголовок, описание и кнопку. Минималистичный, но красивый дизайн!' },
    ],
    '03-08': [
      { level:'easy',   uk:'Прибери маркери зі списку-меню: ul { list-style: none; padding: 0; margin: 0; }', ru:'Убери маркеры из списка-меню: ul { list-style: none; padding: 0; margin: 0; }' },
      { level:'medium', uk:'Зроби пункти меню горизонтальними: li { display: inline-block; margin: 0 10px; }', ru:'Сделай пункты меню горизонтальными: li { display: inline-block; margin: 0 10px; }' },
      { level:'medium', uk:'Додай hover-підсвітку до пунктів: li:hover { background-color: lightblue; padding: 4px 8px; }', ru:'Добавь hover-подсветку к пунктам: li:hover { background-color: lightblue; padding: 4px 8px; }' },
      { level:'hard',   uk:'Зроби горизонтальне меню: логотип зліва, пункти справа. Додай плавні hover-ефекти!', ru:'Сделай горизонтальное меню: логотип слева, пункты справа. Добавь плавные hover-эффекты!' },
      { level:'extra',  uk:'Додай клас .active з іншим кольором до активного пункту меню. Чому це важливо для UX?', ru:'Добавь класс .active с другим цветом к активному пункту меню. Почему это важно для UX?' },
    ],
    '03-09': [
      { level:'easy',   uk:'Зроби поля форми ширшими: input { width: 100%; box-sizing: border-box; }', ru:'Сделай поля формы шире: input { width: 100%; box-sizing: border-box; }' },
      { level:'medium', uk:'Додай :focus ефект — кольорова рамка при кліку: input:focus { border-color: #4a90e2; }', ru:'Добавь :focus эффект — цветная рамка при клике: input:focus { border-color: #4a90e2; }' },
      { level:'medium', uk:'Прибери стандартний outline та додай box-shadow при :focus: input:focus { outline: none; box-shadow: 0 0 5px blue; }', ru:'Убери стандартный outline и добавь box-shadow при :focus: input:focus { outline: none; box-shadow: 0 0 5px blue; }' },
      { level:'hard',   uk:'Стилізуй повну форму: красиві поля, велика кнопка, підписи-мітки. Зроби форму привабливою!', ru:'Стилизуй полную форму: красивые поля, большая кнопка, подписи-метки. Сделай форму привлекательной!' },
      { level:'extra',  uk:'Зроби placeholder іншого кольору: input::placeholder { color: lightblue; }. Це псевдоелемент CSS!', ru:'Сделай placeholder другого цвета: input::placeholder { color: lightblue; }. Это псевдоэлемент CSS!' },
    ],
    '03-10': [
      { level:'easy',   uk:'Додай красиву тінь до вітальної картки: box-shadow: 0 8px 30px rgba(0,0,0,0.2);', ru:'Добавь красивую тень к поздравительной карточке: box-shadow: 0 8px 30px rgba(0,0,0,0.2);' },
      { level:'medium', uk:'При наведенні на картку — вона плавно піднімається: transform: translateY(-8px) з transition 0.3s!', ru:'При наведении на карточку — она плавно поднимается: transform: translateY(-8px) с transition 0.3s!' },
      { level:'medium', uk:'Додай кнопку з hover-ефектом: плавна зміна кольору та невелике збільшення через scale!', ru:'Добавь кнопку с hover-эффектом: плавная смена цвета и небольшое увеличение через scale!' },
      { level:'hard',   uk:'Зроби всю картку інтерактивною: hover на картці, на кнопці, на посиланнях — все з transition!', ru:'Сделай всю карточку интерактивной: hover на карточке, на кнопке, на ссылках — всё с transition!' },
      { level:'extra',  uk:'Додай transform: rotate(-2deg) до картки. При :hover — rotate(0deg). Картка "вирівнюється" — мило!', ru:'Добавь transform: rotate(-2deg) к карточке. При :hover — rotate(0deg). Карточка "выпрямляется" — мило!' },
    ],
  };
  Object.keys(EXT).forEach(function (id) {
    var l = WEB_LESSONS.find(function (x) { return x.id === id; });
    if (l) l.tasks = (l.tasks || []).concat(EXT[id]);
  });
})();
