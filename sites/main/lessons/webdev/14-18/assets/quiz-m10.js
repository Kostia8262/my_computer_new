/* Питання самоконтролю · Модуль 10 · 14-18 Фулстек-Про */
(function () {
  'use strict';
  var QUIZ = {
    '10-01': {
      uk: [
        { q: "Які ролі користувачів існують у системі навчального центру і як їх реалізувати у Django?", a: "Ролі: Student, Teacher, Admin; реалізуються через Django Groups або поле role у кастомній User-моделі; permission_classes у DRF перевіряють роль і обмежують доступ до відповідних endpoint-ів" },
        { q: "Яка різниця між монолітною архітектурою і мікросервісною для навчальної платформи?", a: "Моноліт — весь код в одному Django-проекті: простіший для розробки і деплою; мікросервіси — окремі сервіси для авторизації, курсів, чату: краще масштабуються, але мають операційну складність що надлишкова для початкового продукту" },
        { q: "Яку роль відіграє REST API у розділеній архітектурі React + Django і що таке contract між фронтом і беком?", a: "REST API — єдиний канал обміну даними між React і Django через HTTP; contract — погоджений формат endpoint-ів, статус-кодів та JSON-схем; зафіксований через OpenAPI/Swagger документацію — фронт і бек можуть розроблятися паралельно" },
      ],
      ru: [
        { q: "Какие роли пользователей существуют в системе учебного центра и как их реализовать в Django?", a: "Роли: Student, Teacher, Admin; реализуются через Django Groups или поле role в кастомной User-модели; permission_classes в DRF проверяют роль и ограничивают доступ к соответствующим endpoint-ам" },
        { q: "В чём разница между монолитной архитектурой и микросервисной для учебной платформы?", a: "Монолит — весь код в одном Django-проекте: проще для разработки и деплоя; микросервисы — отдельные сервисы для авторизации, курсов, чата: лучше масштабируются, но имеют операционную сложность избыточную для начального продукта" },
        { q: "Какую роль играет REST API в разделённой архитектуре React + Django и что такое contract между фронтом и беком?", a: "REST API — единственный канал обмена данными между React и Django через HTTP; contract — согласованный формат endpoint-ов, статус-кодов и JSON-схем; фиксируется через OpenAPI/Swagger документацию — фронт и бек могут разрабатываться параллельно" },
      ]
    },
    '10-02': {
      uk: [
        { q: "Як реалізувати зв'язок \"студент записаний на курс\" з додатковими полями (дата, статус) у Django?", a: "Використати проміжну модель Enrollment з ForeignKey до Student та Course, полями enrolled_at (DateTimeField) і status (CharField); у Course — ManyToManyField(Student, through='Enrollment')" },
        { q: "Що таке ordering у Meta-класі Django-моделі і як він впливає на запити до бази?", a: "ordering = ['-created_at'] автоматично додає ORDER BY до всіх queryset без явного .order_by(); зручно для хронологічних списків, але додає накладні витрати якщо потрібне інше сортування — тоді треба .order_by()" },
        { q: "Навіщо у моделі Lesson зберігати поле order і як правильно переупорядкувати при видаленні уроку?", a: "order гарантує правильну послідовність уроків незалежно від автоінкрементного id; при видаленні оновити order сусідніх записів через Lesson.objects.filter(order__gt=deleted_order).update(order=F('order')-1)" },
      ],
      ru: [
        { q: "Как реализовать связь \"студент записан на курс\" с дополнительными полями (дата, статус) в Django?", a: "Использовать промежуточную модель Enrollment с ForeignKey к Student и Course, полями enrolled_at (DateTimeField) и status (CharField); в Course — ManyToManyField(Student, through='Enrollment')" },
        { q: "Что такое ordering в Meta-классе Django-модели и как он влияет на запросы к базе?", a: "ordering = ['-created_at'] автоматически добавляет ORDER BY ко всем queryset без явного .order_by(); удобно для хронологических списков, но добавляет накладные расходы если нужна другая сортировка — тогда нужен .order_by()" },
        { q: "Зачем в модели Lesson хранить поле order и как правильно переупорядочить при удалении урока?", a: "order гарантирует правильную последовательность уроков независимо от автоинкрементного id; при удалении обновить order соседних записей через Lesson.objects.filter(order__gt=deleted_order).update(order=F('order')-1)" },
      ]
    },
    '10-03': {
      uk: [
        { q: "Як у DRF створити кастомний permission що дозволяє редагувати курс тільки його автору?", a: "Клас IsTeacherOwner(BasePermission): has_object_permission перевіряє request.method in SAFE_METHODS (дозволяє читання всім) або request.user == obj.teacher (дозволяє запис тільки власнику курсу)" },
        { q: "Що таке IsAuthenticated, IsAdminUser, AllowAny у DRF і як їх комбінувати в одному view?", a: "Вбудовані permission classes; у permission_classes = [IsAuthenticated, IsTeacherOwner] — обидва мають повернути True (логіка AND); AllowAny пропускає всіх; IsAdminUser перевіряє user.is_staff" },
        { q: "Як Django Groups спрощують управління правами для ролей Teacher та Student?", a: "Groups дозволяють призначати набір permissions відразу групі; user.groups.add(teacher_group) — і користувач отримує всі права групи без перелічення кожного permission окремо; зручно при зміні прав цілої ролі" },
      ],
      ru: [
        { q: "Как в DRF создать кастомный permission разрешающий редактировать курс только его автору?", a: "Класс IsTeacherOwner(BasePermission): has_object_permission проверяет request.method in SAFE_METHODS (разрешает чтение всем) или request.user == obj.teacher (разрешает запись только владельцу курса)" },
        { q: "Что такое IsAuthenticated, IsAdminUser, AllowAny в DRF и как их комбинировать в одном view?", a: "Встроенные permission classes; в permission_classes = [IsAuthenticated, IsTeacherOwner] — оба должны вернуть True (логика AND); AllowAny пропускает всех; IsAdminUser проверяет user.is_staff" },
        { q: "Как Django Groups упрощают управление правами для ролей Teacher и Student?", a: "Groups позволяют назначать набор permissions сразу группе; user.groups.add(teacher_group) — и пользователь получает все права группы без перечисления каждого permission отдельно; удобно при изменении прав целой роли" },
      ]
    },
    '10-04': {
      uk: [
        { q: "Що таке iCalendar і яка Python-бібліотека генерує .ics файли для розкладу курсів?", a: "iCalendar (RFC 5545) — текстовий формат для обміну подіями календаря (.ics); бібліотека icalendar генерує об'єкти Calendar і Event; .ics файли розуміють Google Calendar, Outlook та Apple Calendar" },
        { q: "Як у Django повернути .ics файл як відповідь API для завантаження клієнтом?", a: "Повернути HttpResponse з Content-Type: text/calendar і Content-Disposition: attachment; filename=\"schedule.ics\"; тіло відповіді — серіалізований cal.to_ical() — готовий для імпорту в будь-який календар" },
        { q: "Як зберігати повторювані щотижневі заняття у базі даних ефективно?", a: "Два підходи: зберігати RRULE рядок (FREQ=WEEKLY;BYDAY=MO,WE) і обчислювати дати на льоту через python-dateutil rrule — економить місце; або генерувати всі записи наперед — простіший для запитів і фільтрації" },
      ],
      ru: [
        { q: "Что такое iCalendar и какая Python-библиотека генерирует .ics файлы для расписания курсов?", a: "iCalendar (RFC 5545) — текстовый формат для обмена событиями календаря (.ics); библиотека icalendar генерирует объекты Calendar и Event; .ics файлы понимают Google Calendar, Outlook и Apple Calendar" },
        { q: "Как в Django вернуть .ics файл как ответ API для скачивания клиентом?", a: "Вернуть HttpResponse с Content-Type: text/calendar и Content-Disposition: attachment; filename=\"schedule.ics\"; тело ответа — сериализованный cal.to_ical() — готов для импорта в любой календарь" },
        { q: "Как эффективно хранить повторяющиеся еженедельные занятия в базе данных?", a: "Два подхода: хранить RRULE строку (FREQ=WEEKLY;BYDAY=MO,WE) и вычислять даты на лету через python-dateutil rrule — экономит место; или генерировать все записи заранее — проще для запросов и фильтрации" },
      ]
    },
    '10-05': {
      uk: [
        { q: "Що таке React.lazy() та Suspense і навіщо їх використовувати у кабінеті студента?", a: "lazy() завантажує компонент тільки коли він потрібен (code splitting); Suspense показує fallback (spinner) поки компонент завантажується — зменшує початковий бандл і прискорює першу завантаження кабінету" },
        { q: "Як реалізувати список курсів студента з серверною пагінацією у React?", a: "Зберігати page у useState, передавати як query param (?page=2); при зміні page — нові дані через useEffect з [page] у залежностях; відображати кнопки Попередня/Наступна на основі total_pages з відповіді API" },
        { q: "Що таке optimistic UI і як застосувати його при позначенні завдання виконаним у React?", a: "Optimistic UI — негайно оновлювати стан UI не чекаючи відповіді сервера; при успішному запиті нічого не змінювати; при помилці — відкотити зміну через попередній стан; покращує сприйняту швидкість інтерфейсу" },
      ],
      ru: [
        { q: "Что такое React.lazy() и Suspense и зачем их использовать в кабинете студента?", a: "lazy() загружает компонент только когда он нужен (code splitting); Suspense показывает fallback (spinner) пока компонент загружается — уменьшает начальный бандл и ускоряет первую загрузку кабинета" },
        { q: "Как реализовать список курсов студента с серверной пагинацией в React?", a: "Хранить page в useState, передавать как query param (?page=2); при изменении page — новые данные через useEffect с [page] в зависимостях; отображать кнопки Предыдущая/Следующая на основе total_pages из ответа API" },
        { q: "Что такое optimistic UI и как применить его при отметке задания выполненным в React?", a: "Optimistic UI — немедленно обновлять состояние UI не дожидаясь ответа сервера; при успешном запросе ничего не менять; при ошибке — откатить изменение к предыдущему состоянию; улучшает воспринимаемую скорость интерфейса" },
      ]
    },
    '10-06': {
      uk: [
        { q: "Як реалізувати редагування оцінки прямо у таблиці (inline editing) у React?", a: "Зберігати editingId у useState; при кліку на комірку — рендерити input замість тексту; при blur або Enter — відправляти PATCH-запит на API і оновлювати локальний стан; встановити editingId = null після збереження" },
        { q: "Що таке useMemo і як використати його для обчислення середнього балу групи у React?", a: "useMemo мемоізує результат і перераховує тільки при зміні залежностей; const avg = useMemo(() => grades.reduce((s,g) => s + g.score, 0) / grades.length, [grades]) — не виконує обчислення при кожному ре-рендері" },
        { q: "Як відобразити прогрес студента у вигляді прогрес-бару у React без зовнішніх бібліотек?", a: "Обчислити відсоток: const pct = (completed / total) * 100; рендерити <div style={{width: pct + '%'}} className=\"progress-fill\" /> всередині контейнера фіксованої ширини з overflow: hidden" },
      ],
      ru: [
        { q: "Как реализовать редактирование оценки прямо в таблице (inline editing) в React?", a: "Хранить editingId в useState; при клике на ячейку — рендерить input вместо текста; при blur или Enter — отправлять PATCH-запрос на API и обновлять локальное состояние; установить editingId = null после сохранения" },
        { q: "Что такое useMemo и как использовать его для вычисления среднего балла группы в React?", a: "useMemo мемоизирует результат и пересчитывает только при изменении зависимостей; const avg = useMemo(() => grades.reduce((s,g) => s + g.score, 0) / grades.length, [grades]) — не выполняет вычисления при каждом ре-рендере" },
        { q: "Как отобразить прогресс студента в виде прогресс-бара в React без внешних библиотек?", a: "Вычислить процент: const pct = (completed / total) * 100; рендерить <div style={{width: pct + '%'}} className=\"progress-fill\" /> внутри контейнера фиксированной ширины с overflow: hidden" },
      ]
    },
    '10-07': {
      uk: [
        { q: "Як у Django реалізувати завантаження файлу домашнього завдання і зберегти його у MEDIA_ROOT?", a: "Модель Submission має FileField(upload_to='assignments/%Y/%m/'); у settings.py задати MEDIA_ROOT та MEDIA_URL; DRF серіалізатор приймає файл через parser_classes = [MultiPartParser, FormParser]" },
        { q: "Яких обмежень слід дотримуватись при прийомі файлів від студентів у Django?", a: "Перевіряти content_type у серіалізаторі (допускати pdf, docx, py); обмежити FILE_UPLOAD_MAX_MEMORY_SIZE у settings.py; у Nginx встановити client_max_body_size; сканувати на шкідливий вміст перед збереженням" },
        { q: "Як реалізувати статусну машину для домашнього завдання (submitted, reviewed, graded) у Django?", a: "Поле status з choices; методи-переходи перевіряють дозволений перехід перед збереженням: submitted -> reviewed -> graded; бібліотека django-fsm автоматизує валідацію переходів і захищає від некоректних змін" },
      ],
      ru: [
        { q: "Как в Django реализовать загрузку файла домашнего задания и сохранить его в MEDIA_ROOT?", a: "Модель Submission имеет FileField(upload_to='assignments/%Y/%m/'); в settings.py задать MEDIA_ROOT и MEDIA_URL; DRF сериализатор принимает файл через parser_classes = [MultiPartParser, FormParser]" },
        { q: "Каких ограничений следует придерживаться при приёме файлов от студентов в Django?", a: "Проверять content_type в сериализаторе (допускать pdf, docx, py); ограничить FILE_UPLOAD_MAX_MEMORY_SIZE в settings.py; в Nginx установить client_max_body_size; сканировать на вредоносный контент перед сохранением" },
        { q: "Как реализовать статусную машину для домашнего задания (submitted, reviewed, graded) в Django?", a: "Поле status с choices; методы-переходы проверяют разрешённый переход перед сохранением: submitted -> reviewed -> graded; библиотека django-fsm автоматизирует валидацию переходов и защищает от некорректных изменений" },
      ]
    },
    '10-08': {
      uk: [
        { q: "Як побудувати Django ORM запит для отримання середнього балу кожного студента по всіх завданнях?", a: "Grade.objects.values('student').annotate(avg=Avg('score'), count=Count('id')).order_by('-avg') — повертає список студентів з обчисленими середніми одним SQL-запитом без циклів у Python" },
        { q: "Як обчислити рейтинг студента відносно групи і відобразити його у відсотках?", a: "Зібрати всі оцінки групи, відсортувати; рейтинг = sorted(scores).index(student_score) / len(scores) * 100 — показує яку частку студентів перевершив; або використати scipy.stats.percentileofscore" },
        { q: "Як реалізувати сортування таблиці оцінок за стовпцем у React без зовнішніх бібліотек?", a: "Зберігати sortKey та sortDir у useState; при кліку на заголовок — змінювати ключ або інвертувати напрям; рендерити [...rows].sort((a, b) => sortDir * (a[sortKey] > b[sortKey] ? 1 : -1))" },
      ],
      ru: [
        { q: "Как построить Django ORM запрос для получения среднего балла каждого студента по всем заданиям?", a: "Grade.objects.values('student').annotate(avg=Avg('score'), count=Count('id')).order_by('-avg') — возвращает список студентов с вычисленными средними одним SQL-запросом без циклов в Python" },
        { q: "Как вычислить рейтинг студента относительно группы и отобразить его в процентах?", a: "Собрать все оценки группы, отсортировать; рейтинг = sorted(scores).index(student_score) / len(scores) * 100 — показывает какую долю студентов превзошёл; или использовать scipy.stats.percentileofscore" },
        { q: "Как реализовать сортировку таблицы оценок по столбцу в React без внешних библиотек?", a: "Хранить sortKey и sortDir в useState; при клике на заголовок — менять ключ или инвертировать направление; рендерить [...rows].sort((a, b) => sortDir * (a[sortKey] > b[sortKey] ? 1 : -1))" },
      ]
    },
    '10-09': {
      uk: [
        { q: "Навіщо для відправки email у Django використовувати Celery замість прямого виклику send_mail()?", a: "send_mail() блокує HTTP-запит до завершення відправки (1-5 сек); Celery виконує задачу асинхронно у фоні — користувач отримує відповідь миттєво, email надсилається незалежно від часу обробки" },
        { q: "Що таке broker і backend у Celery і що зазвичай використовується для кожного?", a: "Broker — черга задач куди Django відправляє завдання (Redis або RabbitMQ); backend — сховище результатів виконаних задач (Redis або база даних); для більшості проектів Redis виконує обидві ролі" },
        { q: "Як налаштувати повтор Celery-задачі при тимчасовій помилці SMTP-сервера?", a: "@app.task(bind=True, max_retries=3) і у тілі: except SMTPException as exc: raise self.retry(exc=exc, countdown=60) — повторює задачу до 3 разів з інтервалом 60 секунд при тимчасових збоях сервера" },
      ],
      ru: [
        { q: "Зачем для отправки email в Django использовать Celery вместо прямого вызова send_mail()?", a: "send_mail() блокирует HTTP-запрос до завершения отправки (1-5 сек); Celery выполняет задачу асинхронно в фоне — пользователь получает ответ мгновенно, email отправляется независимо от времени обработки" },
        { q: "Что такое broker и backend в Celery и что обычно используется для каждого?", a: "Broker — очередь задач куда Django отправляет задания (Redis или RabbitMQ); backend — хранилище результатов выполненных задач (Redis или база данных); для большинства проектов Redis выполняет обе роли" },
        { q: "Как настроить повтор Celery-задачи при временной ошибке SMTP-сервера?", a: "@app.task(bind=True, max_retries=3) и в теле: except SMTPException as exc: raise self.retry(exc=exc, countdown=60) — повторяет задачу до 3 раз с интервалом 60 секунд при временных сбоях сервера" },
      ]
    },
    '10-10': {
      uk: [
        { q: "Що таке WebSocket і чим він відрізняється від HTTP-запиту для реалізації чату?", a: "WebSocket — двостороннє постійне з'єднання між клієнтом і сервером; HTTP — запит-відповідь де з'єднання закривається; WebSocket ідеальний для чату бо сервер може надіслати повідомлення без запиту від клієнта" },
        { q: "Яку роль відіграє Redis у Django Channels при масштабуванні чату на кілька серверів?", a: "Redis виступає Channel Layer — розподіленою шиною повідомлень між воркерами; дозволяє різним інстансам Channels обмінюватися повідомленнями — без Redis повідомлення не пройде між двома серверами" },
        { q: "Як у JavaScript підключитися до WebSocket Django Channels і відправити повідомлення?", a: "const ws = new WebSocket('wss://domain/ws/chat/room_id/'); ws.onmessage = (e) => console.log(JSON.parse(e.data)); ws.send(JSON.stringify({message: text})) — Consumer приймає та пересилає групі" },
      ],
      ru: [
        { q: "Что такое WebSocket и чем он отличается от HTTP-запроса для реализации чата?", a: "WebSocket — двустороннее постоянное соединение между клиентом и сервером; HTTP — запрос-ответ где соединение закрывается; WebSocket идеален для чата так как сервер может отправить сообщение без запроса от клиента" },
        { q: "Какую роль играет Redis в Django Channels при масштабировании чата на несколько серверов?", a: "Redis выступает Channel Layer — распределённой шиной сообщений между воркерами; позволяет разным инстансам Channels обмениваться сообщениями — без Redis сообщение не пройдёт между двумя серверами" },
        { q: "Как в JavaScript подключиться к WebSocket Django Channels и отправить сообщение?", a: "const ws = new WebSocket('wss://domain/ws/chat/room_id/'); ws.onmessage = (e) => console.log(JSON.parse(e.data)); ws.send(JSON.stringify({message: text})) — Consumer принимает и пересылает группе" },
      ]
    },
    '10-11': {
      uk: [
        { q: "Що таке CSS-in-JS і які бібліотеки реалізують цей підхід у React?", a: "CSS-in-JS — написання стилів у JavaScript-файлах разом з компонентами; бібліотеки: styled-components, Emotion; переваги — скоповане стилювання без конфліктів класів, динамічні стилі через props" },
        { q: "Як через CSS Grid зробити адаптивний каталог курсів: 1 колонка на мобільному і 3 на десктопі?", a: "grid-template-columns: 1fr базово + @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr) }; або автоматично: grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) без media query" },
        { q: "Що таке viewport meta tag і чому без нього адаптивний дизайн не працює на мобільному?", a: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> — повідомляє браузеру використовувати реальну ширину пристрою; без нього мобільний браузер емулює ширину 980px і media queries не спрацьовують" },
      ],
      ru: [
        { q: "Что такое CSS-in-JS и какие библиотеки реализуют этот подход в React?", a: "CSS-in-JS — написание стилей в JavaScript-файлах вместе с компонентами; библиотеки: styled-components, Emotion; преимущества — скопированные стили без конфликтов классов, динамические стили через props" },
        { q: "Как через CSS Grid сделать адаптивный каталог курсов: 1 колонка на мобильном и 3 на десктопе?", a: "grid-template-columns: 1fr базово + @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr) }; или автоматически: grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) без media query" },
        { q: "Что такое viewport meta tag и почему без него адаптивный дизайн не работает на мобильном?", a: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> — сообщает браузеру использовать реальную ширину устройства; без него мобильный браузер эмулирует ширину 980px и media queries не срабатывают" },
      ]
    },
    '10-12': {
      uk: [
        { q: "Що таке i18next namespace і навіщо розбивати переклади на кілька файлів?", a: "Namespace — логічна група перекладів (common, courses, profile); розбивка дозволяє завантажувати тільки потрібні переклади для конкретної сторінки, зменшуючи початковий бандл через lazy loading" },
        { q: "Як реалізувати перемикання мови у React з react-i18next без перезавантаження сторінки?", a: "i18n.changeLanguage('uk') — змінює мову глобально; всі компоненти що використовують useTranslation() автоматично ре-рендеряться з новими рядками; мову зберігають у localStorage для збереження між сесіями" },
        { q: "Як у react-i18next передати змінні всередину перекладеного рядка (interpolation)?", a: "У файлі перекладу: \"welcome\": \"Вітаємо, {{name}}!\"; у компоненті: t('welcome', {name: user.name}) — i18next замінює {{name}} на реальне значення; підтримує count для pluralization" },
      ],
      ru: [
        { q: "Что такое i18next namespace и зачем разбивать переводы на несколько файлов?", a: "Namespace — логическая группа переводов (common, courses, profile); разбивка позволяет загружать только нужные переводы для конкретной страницы, уменьшая начальный бандл через lazy loading" },
        { q: "Как реализовать переключение языка в React с react-i18next без перезагрузки страницы?", a: "i18n.changeLanguage('uk') — меняет язык глобально; все компоненты использующие useTranslation() автоматически ре-рендерятся с новыми строками; язык сохраняют в localStorage для сохранения между сессиями" },
        { q: "Как в react-i18next передать переменные внутрь переведённой строки (interpolation)?", a: "В файле перевода: \"welcome\": \"Добро пожаловать, {{name}}!\"; в компоненте: t('welcome', {name: user.name}) — i18next заменяет {{name}} на реальное значение; поддерживает count для pluralization" },
      ]
    },
    '10-13': {
      uk: [
        { q: "Що тестує pytest-django і як написати тест для API endpoint реєстрації студента?", a: "pytest-django тестує views, serializers, models через тест-клієнта; тест: client.post('/api/register/', data) — перевіряє assert response.status_code == 201 і User.objects.filter(email=data['email']).exists()" },
        { q: "Яка різниця між unit-тестом та integration-тестом у контексті Django API?", a: "Unit-тест перевіряє ізольований компонент (серіалізатор або модель) з mock-ами; integration-тест — взаємодію кількох компонентів разом (view + serializer + база); pytest-django переважно пише integration-тести" },
        { q: "Що таке React Testing Library і яка його головна філософія тестування компонентів?", a: "RTL тестує компоненти так як їх використовують реальні користувачі; замість implementation details тестує DOM і поведінку: getByRole, userEvent.click, screen.getByText — тести не ламаються при рефакторингу" },
      ],
      ru: [
        { q: "Что тестирует pytest-django и как написать тест для API endpoint регистрации студента?", a: "pytest-django тестирует views, serializers, models через тест-клиент; тест: client.post('/api/register/', data) — проверяет assert response.status_code == 201 и User.objects.filter(email=data['email']).exists()" },
        { q: "В чём разница между unit-тестом и integration-тестом в контексте Django API?", a: "Unit-тест проверяет изолированный компонент (сериализатор или модель) с mock-ами; integration-тест — взаимодействие нескольких компонентов вместе (view + serializer + база); pytest-django преимущественно пишет integration-тесты" },
        { q: "Что такое React Testing Library и какова его главная философия тестирования компонентов?", a: "RTL тестирует компоненты так как их используют реальные пользователи; вместо implementation details тестирует DOM и поведение: getByRole, userEvent.click, screen.getByText — тесты не ломаются при рефакторинге" },
      ]
    },
    '10-14': {
      uk: [
        { q: "Яку роль виконує Nginx у продакшн-деплої Django + React і чому Django не роздає статику?", a: "Nginx роздає статичні файли React (build/) та media-файли набагато ефективніше ніж Django; проксює /api/ запити до Gunicorn; Django runserver — однопоточний, не призначений для production serving" },
        { q: "Що таке Gunicorn і чому він використовується замість вбудованого Django development сервера?", a: "Gunicorn — WSGI-сервер для продакшну; запускає кілька worker-процесів для паралельної обробки запитів; Django dev server — однопоточний без безпеки, призначений виключно для локальної розробки" },
        { q: "Як налаштувати Nginx щоб /api/ запити йшли до Django а решта роздавалася як React SPA?", a: "location /api/ { proxy_pass http://django:8000; } — проксує API; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } — React SPA з fallback на index.html для client-side routing" },
      ],
      ru: [
        { q: "Какую роль выполняет Nginx в продакшн-деплое Django + React и почему Django не раздаёт статику?", a: "Nginx раздаёт статические файлы React (build/) и media-файлы намного эффективнее чем Django; проксирует /api/ запросы к Gunicorn; Django runserver — однопоточный, не предназначен для production serving" },
        { q: "Что такое Gunicorn и почему он используется вместо встроенного Django development сервера?", a: "Gunicorn — WSGI-сервер для продакшна; запускает несколько worker-процессов для параллельной обработки запросов; Django dev server — однопоточный без безопасности, предназначен исключительно для локальной разработки" },
        { q: "Как настроить Nginx чтобы /api/ запросы шли к Django а остальное раздавалось как React SPA?", a: "location /api/ { proxy_pass http://django:8000; } — проксирует API; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } — React SPA с fallback на index.html для client-side routing" },
      ]
    },
  };
  Object.keys(QUIZ).forEach(function (id) {
    var l = WEB_LESSONS.find(function (x) { return x.id === id; });
    if (l) l.quiz = QUIZ[id];
  });
})();
