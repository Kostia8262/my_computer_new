/* Додаткові завдання · Модуль 07 — JavaScript ES6+ · 10-14 Веб-Розробник */
(function () {
  'use strict';
  var EXT = {
    '07-01': [
      { level:'hard',  uk:'Реалізуй функцію <code>retryFetch(url, n)</code>, що повторює fetch до n разів при помилці, використовуючи ланцюжок <code>.then/.catch</code>. Поверни перший успішний результат або викинь помилку після n спроб.', ru:'Реализуй retryFetch(url, n): повторяй fetch до n раз при ошибке через .then/.catch. Верни первый успешный результат или выбрось ошибку после n попыток.' },
      { level:'extra', uk:'Побудуй міні-систему черги задач: клас <code>TaskQueue</code> з методом <code>add(fn)</code>, де fn повертає Promise. Завдання виконуються послідовно (кожне наступне — після resolve попереднього). Додай лічильник виконаних і метод <code>onDone(cb)</code>.', ru:'Создай класс TaskQueue с методом add(fn), где fn — функция, возвращающая Promise. Задачи выполняются последовательно. Добавь счётчик и метод onDone(cb).' },
    ],
    '07-02': [
      { level:'hard',  uk:'Перепиши функцію завантаження даних так, щоб одночасно отримати результати трьох різних URL за допомогою <code>async/await</code> і <code>Promise.all</code>, але показувати окрему помилку для кожного URL що не відповів.', ru:'Перепиши загрузку данных: одновременно получи три URL с async/await и Promise.all, но показывай отдельную ошибку для каждого упавшего URL.' },
      { level:'extra', uk:'Напиши генератор <code>async function* paginate(baseUrl)</code> що на кожен <code>yield</code> завантажує наступну сторінку пагінованого API (параметр <code>?page=N</code>). Зупинись, коли сервер поверне порожній масив. Виведи перші 3 сторінки.', ru:'Напиши async function* paginate(baseUrl): при каждом yield загружай следующую страницу API (?page=N). Остановись при пустом массиве. Выведи первые 3 страницы.' },
    ],
    '07-03': [
      { level:'hard',  uk:'Використовуй <code>Promise.allSettled</code> для одночасного завантаження масиву URL (деякі свідомо некоректні). Відсортуй результати на дві групи: успішні та невдалі, і відобрази їх у двох окремих списках.', ru:'Используй Promise.allSettled для одновременной загрузки массива URL (некоторые заведомо некорректны). Раздели на успешные и неудачные, покажи в двух списках.' },
      { level:'extra', uk:'Реалізуй функцію <code>withTimeout(promise, ms)</code>, що відхиляє promise якщо він не виконався за ms мілісекунд. Використай <code>Promise.race</code>. Продемонструй на fetch-запиті з таймаутом 2 секунди.', ru:'Реализуй withTimeout(promise, ms): отклоняй promise, если не выполнился за ms мс. Используй Promise.race. Продемонстрируй на fetch с таймаутом 2 секунды.' },
    ],
    '07-04': [
      { level:'hard',  uk:'Напиши <code>async</code>-функцію що читає список URL з масиву й обробляє їх послідовно (не паралельно). Для кожного URL: якщо помилка — логуй її і продовжуй до наступного. Наприкінці виведи кількість успішних та невдалих.', ru:'Напиши async-функцию: читай URL из массива последовательно. При ошибке — логируй и продолжай. В конце выведи число успешных и неудачных.' },
      { level:'extra', uk:'Створи клас <code>AsyncRetry</code> з методами <code>run(fn)</code> та конфігурацією <code>{ retries, delay, backoff }</code>. Реалізуй exponential backoff: кожна наступна спроба чекає вдвічі довше. Покрий тестами через mock-функцію що падає перші N разів.', ru:'Создай класс AsyncRetry с run(fn) и конфигурацией { retries, delay, backoff }. Реализуй exponential backoff. Покрой тестами через mock-функцию.' },
    ],
    '07-05': [
      { level:'hard',  uk:'Перетвори існуючий код з глобальними змінними в ES6-модуль: виділи функції утиліт в окремий файл <code>utils.js</code>, використай named exports. Основний файл <code>main.js</code> імпортує лише потрібне. Переконайся, що нічого не витікає в глобальну область.', ru:'Преобразуй код с глобальными переменными в ES6-модуль: утилиты — в utils.js с named exports. main.js импортирует только нужное. Убедись, что ничего не утекает в глобальный скоп.' },
      { level:'extra', uk:'Збери просту систему плагінів: файл <code>pluginSystem.js</code> експортує клас <code>PluginSystem</code>. Плагіни — ES6-модулі що реалізують інтерфейс <code>{ name, install(app) }</code>. Зроби два плагіни (logger та formatter) і підключи їх через <code>app.use(plugin)</code>.', ru:'Создай систему плагинов: PluginSystem в pluginSystem.js, плагины — модули с интерфейсом { name, install(app) }. Сделай два плагина (logger и formatter) и подключи через app.use(plugin).' },
    ],
    '07-06': [
      { level:'hard',  uk:'Реалізуй маршрутизатор на dynamic import: об\'єкт <code>routes = { \'/home\': () => import(\'./home.js\'), ... }</code>. При зміні <code>window.location.hash</code> динамічно завантажуй і виконуй потрібний модуль. Додай індикатор завантаження.', ru:'Реализуй роутер на dynamic import: routes = { \'/home\': () => import(\'./home.js\') }. При изменении location.hash загружай нужный модуль. Добавь индикатор загрузки.' },
      { level:'extra', uk:'Побудуй lazy-систему компонентів: функція <code>lazyLoad(name)</code> повертає Promise що при першому виклику завантажує компонент через dynamic import, при наступних — повертає з кешу (Map). Реалізуй prefetch для передбачення наступного компонента при hover.', ru:'Создай lazy-систему компонентов: lazyLoad(name) — Promise, при первом вызове загружает через dynamic import, дальше возвращает из кеша (Map). Реализуй prefetch при hover.' },
    ],
    '07-07': [
      { level:'hard',  uk:'Напиши генератор <code>function* range(start, end, step = 1)</code> і зроби його сумісним з <code>for...of</code>. Далі реалізуй <code>take(n, iterable)</code> — функцію що бере перші n значень з будь-якого ітерабельного об\'єкта.', ru:'Напиши generator function* range(start, end, step=1), совместимый с for...of. Затем реализуй take(n, iterable) — берёт первые n значений из любого итерируемого объекта.' },
      { level:'extra', uk:'Реалізуй ліниві колекції через генератори: функції <code>lazyMap(iter, fn)</code>, <code>lazyFilter(iter, pred)</code>, <code>lazyTake(iter, n)</code>. Всі повертають генератори. Продемонструй конвеєр з нескінченного генератора натуральних чисел: взяти перші 10 парних квадратів.', ru:'Реализуй ленивые коллекции: lazyMap, lazyFilter, lazyTake — все возвращают генераторы. Продемонстрируй конвейер из бесконечного генератора натуральных чисел: первые 10 чётных квадратов.' },
    ],
    '07-08': [
      { level:'hard',  uk:'Створи об\'єкт <code>EventBus</code> з використанням Symbol як приватних ключів для внутрішнього сховища слухачів. Реалізуй <code>on(event, cb)</code>, <code>off(event, cb)</code>, <code>emit(event, ...args)</code>. Переконайся, що внутрішній <code>_listeners</code> недоступний ззовні.', ru:'Создай EventBus с Symbol-ключами для хранилища слушателей. Реализуй on(event, cb), off(event, cb), emit(event, ...args). Внутренний _listeners должен быть недоступен снаружи.' },
      { level:'extra', uk:'Реалізуй власний Symbol.iterator для класу <code>LinkedList</code>: вузол має поля <code>value</code> і <code>next</code>. Список має бути сумісним з <code>for...of</code>, spread-оператором і деструктуризацією. Додай методи <code>push</code>, <code>pop</code>, <code>size</code>.', ru:'Реализуй Symbol.iterator для класса LinkedList: узлы с value и next. Список должен работать с for...of, spread и деструктуризацией. Добавь push, pop, size.' },
    ],
    '07-09': [
      { level:'hard',  uk:'Реалізуй простий in-memory кеш за допомогою <code>WeakMap</code>: функція <code>memoize(fn)</code> що зберігає результати для об\'єктів-ключів. На відміну від звичайного Map, кеш не утримує об\'єкти живими — продемонструй через FinalizationRegistry або просто поясни в коментарях.', ru:'Реализуй in-memory кеш на WeakMap: memoize(fn) сохраняет результаты для объектов-ключей. Кеш не удерживает объекты — продемонстрируй или объясни в комментарии.' },
      { level:'extra', uk:'Побудуй систему спостереження за об\'єктами через <code>WeakRef</code> і <code>FinalizationRegistry</code>: реєструй callback на збирання сміття кожного об\'єкта. Продемонструй, що після очищення всіх посилань та виклику GC (через node --expose-gc) callback спрацьовує.', ru:'Построй систему наблюдения за объектами через WeakRef и FinalizationRegistry: регистрируй callback на GC. Продемонстрируй, что после очистки ссылок callback срабатывает.' },
    ],
    '07-10': [
      { level:'hard',  uk:'Реалізуй функцію <code>deepClone(value)</code> через <code>structuredClone</code> з fallback на JSON.parse(JSON.stringify()) для оточень де structuredClone відсутній. Обробляй крайні випадки: <code>undefined</code>, <code>Date</code>, <code>RegExp</code>, циклічні посилання.', ru:'Реализуй deepClone(value) через structuredClone с fallback на JSON.parse/stringify. Обрабатывай edge cases: undefined, Date, RegExp, циклические ссылки.' },
      { level:'extra', uk:'Порівняй продуктивність різних методів глибокого копіювання: <code>structuredClone</code>, <code>JSON.parse(JSON.stringify())</code>, власна рекурсивна функція. Виміряй час для об\'єктів різного розміру (100, 1000, 10000 вузлів) і побудуй таблицю результатів у консолі.', ru:'Сравни производительность structuredClone, JSON.parse/stringify и рекурсивной функции. Измерь время для объектов 100/1000/10000 узлов и выведи таблицу результатов.' },
    ],
    '07-11': [
      { level:'hard',  uk:'Перенеси обчислювально важку функцію (наприклад, сортування масиву з 500 000 елементів) у Web Worker. Основний потік надсилає дані, Worker повертає відсортований результат. Виміряй час з Worker і без — відобрази різницю на сторінці.', ru:'Перенеси тяжёлую функцию (сортировка 500 000 элементов) в Web Worker. Основной поток отправляет данные, Worker возвращает результат. Измерь время с Worker и без.' },
      { level:'extra', uk:'Побудуй пул Web Workers: клас <code>WorkerPool(size)</code> що утримує N воркерів і розподіляє завдання між вільними. Реалізуй <code>run(data)</code> що повертає Promise. Якщо всі зайняті — постав в чергу. Продемонструй паралельне виконання 20 завдань на пулі з 4 воркерів.', ru:'Создай WorkerPool(size): N воркеров с распределением задач. run(data) возвращает Promise, занятые — в очередь. Продемонстрируй 20 задач на пуле из 4 воркеров.' },
    ],
    '07-12': [
      { level:'hard',  uk:'Розбий Task Manager на ES6-модулі: <code>store.js</code> (стан + методи), <code>render.js</code> (відрисовка DOM), <code>events.js</code> (обробники подій), <code>main.js</code> (точка входу). Використай лише named exports і barrel-файл <code>index.js</code> для зручного імпорту.', ru:'Разбей Task Manager на модули: store.js (состояние), render.js (DOM), events.js (обработчики), main.js (точка входа). Только named exports и barrel-файл index.js.' },
      { level:'extra', uk:'Додай до Task Manager: фільтрацію через URL-хеш (<code>#all</code>, <code>#active</code>, <code>#completed</code>) з dynamic import для кожного виду; збереження в localStorage через кастомний хук-функцію; Web Worker для сортування великого списку. Всі три ES6+-фічі мають реально працювати.', ru:'Добавь в Task Manager: фильтрацию через URL-хеш (#all/#active/#completed) с dynamic import; localStorage через кастомную функцию-хук; Web Worker для сортировки списка. Все три ES6+-фичи должны работать.' },
    ],
  };
  Object.keys(EXT).forEach(function (id) {
    var l = WEB_LESSONS.find(function (x) { return x.id === id; });
    if (l) l.tasks = (l.tasks || []).concat(EXT[id]);
  });
})();
