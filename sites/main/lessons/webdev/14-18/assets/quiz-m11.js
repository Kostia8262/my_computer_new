/* Питання самоконтролю · Модуль 11 · 14-18 Фулстек-Про */
(function () {
  'use strict';
  var QUIZ = {
    '11-01': {
      uk: [
        { q: "Що таке MVP у контексті e-commerce і які функції входять у мінімальний продукт?", a: "MVP — мінімальний набір функцій для запуску: каталог товарів, кошик, checkout, базовий платіж та email-підтвердження; все інше (відгуки, рекомендації, акції) — наступні ітерації після валідації ринку" },
        { q: "Яку архітектуру обрати для e-commerce: монолітну Django або React + Django API і чому?", a: "React + Django API (SPA + REST): фронтенд розгортається на CDN, завантажується швидко з кешу; API масштабується незалежно; архітектура зручна для мобільного додатку в майбутньому без переписування бекенду" },
        { q: "Що таке payment gateway і чим Stripe відрізняється від прямої обробки карток на сервері?", a: "Payment gateway — посередник між магазином і банком; Stripe обробляє карткові дані на своїх серверах, магазин ніколи не бачить номерів карток — це знімає вимогу PCI DSS compliance з розробника" },
      ],
      ru: [
        { q: "Что такое MVP в контексте e-commerce и какие функции входят в минимальный продукт?", a: "MVP — минимальный набор функций для запуска: каталог товаров, корзина, checkout, базовая оплата и email-подтверждение; всё остальное (отзывы, рекомендации, акции) — следующие итерации после валидации рынка" },
        { q: "Какую архитектуру выбрать для e-commerce: монолитную Django или React + Django API и почему?", a: "React + Django API (SPA + REST): фронтенд разворачивается на CDN, загружается быстро из кеша; API масштабируется независимо; архитектура удобна для мобильного приложения в будущем без переписывания бекенда" },
        { q: "Что такое payment gateway и чем Stripe отличается от прямой обработки карт на сервере?", a: "Payment gateway — посредник между магазином и банком; Stripe обрабатывает карточные данные на своих серверах, магазин никогда не видит номеров карт — это снимает требование PCI DSS compliance с разработчика" },
      ]
    },
    '11-02': {
      uk: [
        { q: "Як реалізувати Cart у Django: зберігати у базі чи у сесії/Redis і яка різниця?", a: "Сесія/Redis — без авторизації, швидко, але тимчасово; база — зберігається між пристроями і після входу; гібрид: анонімний кошик у сесії, при вході — злиття з базою щоб не втратити товари" },
        { q: "Навіщо при оформленні замовлення копіювати ціну товару в OrderItem, а не посилатися на Product.price?", a: "Ціна товару може змінитися після замовлення; OrderItem.price — незмінна копія ціни на момент купівлі; це юридично коректно і гарантує що замовлення відображає реальну сплачену суму" },
        { q: "Як реалізувати вкладені категорії товарів (дерево) у Django-моделі?", a: "self-referential ForeignKey: parent = ForeignKey('self', null=True, blank=True, on_delete=SET_NULL) — довільна глибина вкладеності; бібліотека django-mptt прискорює запити до дерева через Modified Preorder Tree Traversal" },
      ],
      ru: [
        { q: "Как реализовать Cart в Django: хранить в базе или в сессии/Redis и в чём разница?", a: "Сессия/Redis — без авторизации, быстро, но временно; база — сохраняется между устройствами и после входа; гибрид: анонимная корзина в сессии, при входе — слияние с базой чтобы не потерять товары" },
        { q: "Зачем при оформлении заказа копировать цену товара в OrderItem, а не ссылаться на Product.price?", a: "Цена товара может измениться после заказа; OrderItem.price — неизменная копия цены на момент покупки; это юридически корректно и гарантирует что заказ отражает реальную оплаченную сумму" },
        { q: "Как реализовать вложенные категории товаров (дерево) в Django-модели?", a: "self-referential ForeignKey: parent = ForeignKey('self', null=True, blank=True, on_delete=SET_NULL) — произвольная глубина вложенности; библиотека django-mptt ускоряет запросы к дереву через Modified Preorder Tree Traversal" },
      ]
    },
    '11-03': {
      uk: [
        { q: "Як реалізувати фільтрацію каталогу по кількох параметрах одночасно у DRF?", a: "Використати django-filter: клас ProductFilterSet з полями category, price_min, price_max, in_stock; DjangoFilterBackend у ViewSet.filter_backends — фільтри автоматично читаються з query params (?category=1&price_max=500)" },
        { q: "Що таке курсорна пагінація і коли вона краща за offset-based сторінкову?", a: "Cursor пагінація використовує вказівник на конкретний запис замість offset; не страждає від \"зсуву\" при паралельному додаванні товарів; набагато ефективніша для дуже великих таблиць де OFFSET N повільний" },
        { q: "Як реалізувати повнотекстовий пошук товарів у Django з PostgreSQL без зовнішніх сервісів?", a: "SearchVector + SearchQuery: Product.objects.annotate(search=SearchVector('name', 'description')).filter(search=SearchQuery(q)); або простіший варіант: filter(Q(name__icontains=q) | Q(description__icontains=q))" },
      ],
      ru: [
        { q: "Как реализовать фильтрацию каталога по нескольким параметрам одновременно в DRF?", a: "Использовать django-filter: класс ProductFilterSet с полями category, price_min, price_max, in_stock; DjangoFilterBackend в ViewSet.filter_backends — фильтры автоматически читаются из query params (?category=1&price_max=500)" },
        { q: "Что такое курсорная пагинация и когда она лучше offset-based постраничной?", a: "Cursor пагинация использует указатель на конкретную запись вместо offset; не страдает от \"смещения\" при параллельном добавлении товаров; намного эффективнее для очень больших таблиц где OFFSET N медленный" },
        { q: "Как реализовать полнотекстовый поиск товаров в Django с PostgreSQL без внешних сервисов?", a: "SearchVector + SearchQuery: Product.objects.annotate(search=SearchVector('name', 'description')).filter(search=SearchQuery(q)); или простой вариант: filter(Q(name__icontains=q) | Q(description__icontains=q))" },
      ]
    },
    '11-04': {
      uk: [
        { q: "Як синхронізувати стан фільтрів каталогу з URL параметрами у React Router?", a: "Використати useSearchParams(): читати фільтри з URL при завантаженні через searchParams.get('category'); при зміні — setSearchParams({category: val}); URL стає shareable — юзер може надіслати посилання з активними фільтрами" },
        { q: "Що таке debounce і чому його потрібно застосовувати до поля пошуку в каталозі?", a: "Debounce затримує виклик функції поки не пройде N мс без нових подій; без нього кожен натиск клавіші відправляє окремий API-запит — 10 символів = 10 запитів; debounce(300ms) відправляє один після паузи" },
        { q: "Як реалізувати skeleton-завантаження для карток товарів у React замість спінера?", a: "Поки isLoading === true рендерити N компонентів-скелетонів з анімованими сірими блоками (CSS animation shimmer); після завантаження — реальні картки; скелетон кращий ніж спінер бо зберігає layout сторінки" },
      ],
      ru: [
        { q: "Как синхронизировать состояние фильтров каталога с URL параметрами в React Router?", a: "Использовать useSearchParams(): читать фильтры из URL при загрузке через searchParams.get('category'); при изменении — setSearchParams({category: val}); URL становится shareable — юзер может отправить ссылку с активными фильтрами" },
        { q: "Что такое debounce и почему его нужно применять к полю поиска в каталоге?", a: "Debounce задерживает вызов функции пока не пройдёт N мс без новых событий; без него каждое нажатие клавиши отправляет отдельный API-запрос — 10 символов = 10 запросов; debounce(300ms) отправляет один после паузы" },
        { q: "Как реализовать skeleton-загрузку для карточек товаров в React вместо спиннера?", a: "Пока isLoading === true рендерить N компонентов-скелетонов с анимированными серыми блоками (CSS animation shimmer); после загрузки — реальные карточки; скелетон лучше спиннера так как сохраняет layout страницы" },
      ]
    },
    '11-05': {
      uk: [
        { q: "Як реалізувати галерею зображень товару з thumbnail-навігацією у React?", a: "Масив images у стані; currentIndex відстежує активне; клік на thumbnail — setCurrentIndex(i); головне зображення рендерить images[currentIndex].url; плавна зміна через CSS transition на opacity або transform" },
        { q: "Що таке lazy loading для зображень і як реалізувати його у React без бібліотек?", a: "<img loading=\"lazy\"> — нативний HTML атрибут, браузер завантажує зображення тільки при наближенні до viewport; для більшого контролю — IntersectionObserver API: спостерігати за img і встановлювати src тільки при появі" },
        { q: "Яку стратегію кешування варто використати для сторінки товару щоб зменшити кількість API-запитів?", a: "React Query або SWR: кешують результат за ключем ['product', id]; при повторному відвіданні — дані беруться з кешу миттєво, фоново оновлюються (stale-while-revalidate); видалення кешу при мутації" },
      ],
      ru: [
        { q: "Как реализовать галерею изображений товара с thumbnail-навигацией в React?", a: "Массив images в состоянии; currentIndex отслеживает активное; клик на thumbnail — setCurrentIndex(i); главное изображение рендерит images[currentIndex].url; плавная смена через CSS transition на opacity или transform" },
        { q: "Что такое lazy loading для изображений и как реализовать его в React без библиотек?", a: "<img loading=\"lazy\"> — нативный HTML атрибут, браузер загружает изображения только при приближении к viewport; для большего контроля — IntersectionObserver API: наблюдать за img и устанавливать src только при появлении" },
        { q: "Какую стратегию кеширования стоит использовать для страницы товара чтобы уменьшить количество API-запросов?", a: "React Query или SWR: кешируют результат по ключу ['product', id]; при повторном посещении — данные берутся из кеша мгновенно, фоново обновляются (stale-while-revalidate); инвалидация кеша при мутации" },
      ]
    },
    '11-06': {
      uk: [
        { q: "Як зберігати глобальний стан кошика доступним з будь-якого компонента у React?", a: "React Context + useReducer: CartContext зберігає items[]; dispatch({type: 'ADD_ITEM', payload: product}) змінює стан; useContext(CartContext) дає доступ будь-якому компоненту без props drilling" },
        { q: "Як запобігти перегонкам (race condition) при паралельному оновленні кількості товару у кошику на бекенді?", a: "Атомарні операції через F-expressions: CartItem.objects.filter(id=id).update(quantity=F('quantity') + 1) — база оновлює значення атомарно без read-modify-write циклу що може призвести до дублювання" },
        { q: "Як реалізувати persistence кошика у localStorage щоб він зберігався між перезавантаженнями?", a: "При зміні items — localStorage.setItem('cart', JSON.stringify(items)); при ініціалізації useState: () => JSON.parse(localStorage.getItem('cart') || '[]') — читає початковий стан з localStorage" },
      ],
      ru: [
        { q: "Как хранить глобальное состояние корзины доступным из любого компонента в React?", a: "React Context + useReducer: CartContext хранит items[]; dispatch({type: 'ADD_ITEM', payload: product}) меняет состояние; useContext(CartContext) даёт доступ любому компоненту без props drilling" },
        { q: "Как предотвратить гонку (race condition) при параллельном обновлении количества товара в корзине на бекенде?", a: "Атомарные операции через F-expressions: CartItem.objects.filter(id=id).update(quantity=F('quantity') + 1) — база обновляет значение атомарно без read-modify-write цикла который может привести к дублированию" },
        { q: "Как реализовать persistence корзины в localStorage чтобы она сохранялась между перезагрузками?", a: "При изменении items — localStorage.setItem('cart', JSON.stringify(items)); при инициализации useState: () => JSON.parse(localStorage.getItem('cart') || '[]') — читает начальное состояние из localStorage" },
      ]
    },
    '11-07': {
      uk: [
        { q: "Що таке multi-step form і як реалізувати checkout у кілька кроків у React?", a: "Зберігати currentStep у useState (1: адреса, 2: доставка, 3: оплата); рендерити компонент відповідного кроку; дані кожного кроку накопичувати у спільному formData об'єкті; Next/Back змінюють currentStep" },
        { q: "Яку бібліотеку валідації форм використовують у React і яка перевага Zod + React Hook Form?", a: "React Hook Form + Zod: schema (z.string().email(), z.string().min(10)) описує правила; zodResolver підключає до useForm; автоматична валідація всіх полів, типізація TypeScript, мінімальні ре-рендери" },
        { q: "Як захистити форму checkout від повторного відправлення при подвійному кліку?", a: "React Hook Form надає isSubmitting автоматично — блокувати кнопку через disabled={isSubmitting}; на бекенді — idempotency key (унікальний токен форми) щоб повторний запит не створив два замовлення" },
      ],
      ru: [
        { q: "Что такое multi-step form и как реализовать checkout в несколько шагов в React?", a: "Хранить currentStep в useState (1: адрес, 2: доставка, 3: оплата); рендерить компонент соответствующего шага; данные каждого шага накапливать в общем объекте formData; Next/Back меняют currentStep" },
        { q: "Какую библиотеку валидации форм используют в React и какое преимущество Zod + React Hook Form?", a: "React Hook Form + Zod: schema (z.string().email(), z.string().min(10)) описывает правила; zodResolver подключает к useForm; автоматическая валидация всех полей, типизация TypeScript, минимальные ре-рендеры" },
        { q: "Как защитить форму checkout от повторной отправки при двойном клике?", a: "React Hook Form предоставляет isSubmitting автоматически — блокировать кнопку через disabled={isSubmitting}; на бекенде — idempotency key (уникальный токен формы) чтобы повторный запрос не создал два заказа" },
      ]
    },
    '11-08': {
      uk: [
        { q: "Що таке Stripe PaymentIntent і яку роль він відіграє у процесі оплати?", a: "PaymentIntent — об'єкт Stripe що представляє намір оплатити конкретну суму; Django створює його через stripe.PaymentIntent.create(amount, currency) і повертає client_secret; React підтверджує оплату через Stripe.js" },
        { q: "Навіщо обробляти Stripe webhooks у Django і які events критично важливо прослуховувати?", a: "Webhook — підтвердження від Stripe що оплата відбулася незалежно від клієнта; критичні events: payment_intent.succeeded (активувати замовлення), payment_intent.payment_failed (сповістити юзера); клієнту не можна довіряти" },
        { q: "Як тестувати Stripe інтеграцію без реальних грошей у sandbox режимі?", a: "Stripe надає тестові картки (4242 4242 4242 4242 — успішна оплата, 4000 0000 0000 0002 — відхилена); використовувати sk_test_... ключ; Stripe CLI симулює webhooks локально через stripe listen --forward-to localhost" },
      ],
      ru: [
        { q: "Что такое Stripe PaymentIntent и какую роль он играет в процессе оплаты?", a: "PaymentIntent — объект Stripe представляющий намерение оплатить конкретную сумму; Django создаёт его через stripe.PaymentIntent.create(amount, currency) и возвращает client_secret; React подтверждает оплату через Stripe.js" },
        { q: "Зачем обрабатывать Stripe webhooks в Django и какие events критически важно слушать?", a: "Webhook — подтверждение от Stripe что оплата произошла независимо от клиента; критические events: payment_intent.succeeded (активировать заказ), payment_intent.payment_failed (уведомить юзера); клиенту нельзя доверять" },
        { q: "Как тестировать Stripe интеграцию без реальных денег в sandbox режиме?", a: "Stripe предоставляет тестовые карты (4242 4242 4242 4242 — успешная оплата, 4000 0000 0000 0002 — отклонённая); использовать sk_test_... ключ; Stripe CLI симулирует webhooks локально через stripe listen --forward-to localhost" },
      ]
    },
    '11-09': {
      uk: [
        { q: "Як у Django відправити HTML email з деталями замовлення використовуючи шаблон?", a: "EmailMultiAlternatives дозволяє надіслати email з text/plain та text/html версіями; html_content = render_to_string('emails/order_confirm.html', context); msg.attach_alternative(html_content, 'text/html')" },
        { q: "Чому важливо завжди включати text/plain версію поряд з HTML у email-підтвердженні?", a: "Деякі email-клієнти, корпоративні фільтри та доступність вимагають plain text; email тільки з HTML може потрапити до спаму або бути нечитабельним у поштових клієнтах що не підтримують HTML" },
        { q: "Як тестувати відправку email у Django локально без справжнього SMTP-сервера?", a: "EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' — виводить email у термінал; filebased.EmailBackend зберігає у файли; django-mail-panel показує відправлені листи в Django Debug Toolbar" },
      ],
      ru: [
        { q: "Как в Django отправить HTML email с деталями заказа используя шаблон?", a: "EmailMultiAlternatives позволяет отправить email с text/plain и text/html версиями; html_content = render_to_string('emails/order_confirm.html', context); msg.attach_alternative(html_content, 'text/html')" },
        { q: "Почему важно всегда включать text/plain версию рядом с HTML в email-подтверждении?", a: "Некоторые email-клиенты, корпоративные фильтры и доступность требуют plain text; email только с HTML может попасть в спам или быть нечитаемым в почтовых клиентах не поддерживающих HTML" },
        { q: "Как тестировать отправку email в Django локально без настоящего SMTP-сервера?", a: "EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend' — выводит email в терминал; filebased.EmailBackend сохраняет в файлы; django-mail-panel показывает отправленные письма в Django Debug Toolbar" },
      ]
    },
    '11-10': {
      uk: [
        { q: "Як кастомізувати Django admin для зручного управління замовленнями?", a: "OrderAdmin(admin.ModelAdmin): list_display = ('id', 'user', 'status', 'total', 'created_at'), list_filter = ('status', 'created_at'), search_fields = ('user__email',), ordering = ('-created_at')" },
        { q: "Що таке inline admin у Django і навіщо використовувати TabularInline для OrderItem?", a: "Inline дозволяє редагувати пов'язані об'єкти на сторінці батьківського; OrderItemInline у OrderAdmin показує всі товари замовлення прямо на сторінці замовлення без переходу до окремої таблиці" },
        { q: "Як реалізувати bulk action у Django admin для масового оновлення статусу замовлень?", a: "Функція-action: def mark_shipped(modeladmin, request, queryset): queryset.update(status='shipped'); mark_shipped.short_description = 'Позначити відправленими'; додати до actions = [mark_shipped] у ModelAdmin" },
      ],
      ru: [
        { q: "Как кастомизировать Django admin для удобного управления заказами?", a: "OrderAdmin(admin.ModelAdmin): list_display = ('id', 'user', 'status', 'total', 'created_at'), list_filter = ('status', 'created_at'), search_fields = ('user__email',), ordering = ('-created_at')" },
        { q: "Что такое inline admin в Django и зачем использовать TabularInline для OrderItem?", a: "Inline позволяет редактировать связанные объекты на странице родительского; OrderItemInline в OrderAdmin показывает все товары заказа прямо на странице заказа без перехода к отдельной таблице" },
        { q: "Как реализовать bulk action в Django admin для массового обновления статуса заказов?", a: "Функция-action: def mark_shipped(modeladmin, request, queryset): queryset.update(status='shipped'); mark_shipped.short_description = 'Отметить отправленными'; добавить в actions = [mark_shipped] у ModelAdmin" },
      ]
    },
    '11-11': {
      uk: [
        { q: "Як запобігти тому щоб користувач залишав більше одного відгуку на один товар у Django?", a: "unique_together = [['user', 'product']] у Meta-класі моделі Review або UniqueConstraint(fields=['user', 'product'], name='one_review_per_product'); DRF поверне 400 при спробі дублювання" },
        { q: "Як ефективно зберігати середній рейтинг товару без підрахунку при кожному запиті?", a: "Денормалізація: поля avg_rating та review_count у моделі Product; оновлювати через Django signal post_save/post_delete на Review: перераховувати агрегат і зберігати; або через annotate при запиті якщо відгуків небагато" },
        { q: "Що таке content moderation і як реалізувати базову перевірку відгуків перед публікацією?", a: "Поле status у Review (pending, approved, rejected); нові відгуки — status=pending, відображаються тільки approved; адмін або модератор переглядає у Django admin; автоматичний варіант — фільтр за стоп-словами" },
      ],
      ru: [
        { q: "Как запретить пользователю оставлять более одного отзыва на один товар в Django?", a: "unique_together = [['user', 'product']] в Meta-классе модели Review или UniqueConstraint(fields=['user', 'product'], name='one_review_per_product'); DRF вернёт 400 при попытке дублирования" },
        { q: "Как эффективно хранить средний рейтинг товара без пересчёта при каждом запросе?", a: "Денормализация: поля avg_rating и review_count в модели Product; обновлять через Django signal post_save/post_delete на Review: пересчитывать агрегат и сохранять; или через annotate при запросе если отзывов немного" },
        { q: "Что такое content moderation и как реализовать базовую проверку отзывов перед публикацией?", a: "Поле status в Review (pending, approved, rejected); новые отзывы — status=pending, отображаются только approved; админ или модератор просматривает в Django admin; автоматический вариант — фильтр по стоп-словам" },
      ]
    },
    '11-12': {
      uk: [
        { q: "Що таке content-based filtering і як реалізувати просту рекомендацію товарів у Django?", a: "Content-based: рекомендувати товари з тієї ж категорії та схожого цінового діапазону; Product.objects.filter(category=product.category).exclude(id=product.id).order_by('?')[:4] — проста реалізація без ML" },
        { q: "Що таке collaborative filtering і чим він відрізняється від content-based підходу?", a: "Collaborative filtering рекомендує товари що купували інші юзери зі схожими вподобаннями (\"хто купив A купив і B\"); content-based аналізує характеристики товару, а не поведінку; CF потребує достатньо даних" },
        { q: "Як побудувати co-occurrence матрицю для рекомендацій товарів на основі замовлень?", a: "Зібрати пари товарів з одного замовлення; підрахувати частоту кожної пари через itertools.combinations(order_items, 2); нормалізувати; при перегляді товару — повернути топ-N партнерів за частотою" },
      ],
      ru: [
        { q: "Что такое content-based filtering и как реализовать простую рекомендацию товаров в Django?", a: "Content-based: рекомендовать товары из той же категории и схожего ценового диапазона; Product.objects.filter(category=product.category).exclude(id=product.id).order_by('?')[:4] — простая реализация без ML" },
        { q: "Что такое collaborative filtering и чем он отличается от content-based подхода?", a: "Collaborative filtering рекомендует товары которые покупали другие юзеры со схожими предпочтениями (\"кто купил A купил и B\"); content-based анализирует характеристики товара, а не поведение; CF требует достаточно данных" },
        { q: "Как построить co-occurrence матрицу для рекомендаций товаров на основе заказов?", a: "Собрать пары товаров из одного заказа; подсчитать частоту каждой пары через itertools.combinations(order_items, 2); нормализовать; при просмотре товара — вернуть топ-N партнёров по частоте" },
      ]
    },
    '11-13': {
      uk: [
        { q: "Як реалізувати динамічні Open Graph метатеги для сторінок товарів у React?", a: "Використати react-helmet-async: <Helmet><meta property=\"og:title\" content={product.name} /><meta property=\"og:image\" content={product.image} /></Helmet> — метатеги оновлюються при переході між товарами" },
        { q: "Що таке Sitemap.xml і як Django автоматично генерує його для каталогу товарів?", a: "Sitemap.xml — файл для пошукових роботів з переліком URL; django.contrib.sitemaps: клас ProductSitemap з items() = Product.objects.filter(is_active=True) та location(obj) генерує /sitemap.xml автоматично" },
        { q: "Навіщо SPA на React має проблему з SEO і як SSR або pre-rendering вирішують її?", a: "Пошукові боти не виконують JavaScript — SPA повертає порожній HTML; SSR (Next.js) рендерить HTML з даними на сервері; pre-rendering генерує статичні HTML файли при білді; обидва підходи надають ботам готовий контент" },
      ],
      ru: [
        { q: "Как реализовать динамические Open Graph метатеги для страниц товаров в React?", a: "Использовать react-helmet-async: <Helmet><meta property=\"og:title\" content={product.name} /><meta property=\"og:image\" content={product.image} /></Helmet> — метатеги обновляются при переходе между товарами" },
        { q: "Что такое Sitemap.xml и как Django автоматически генерирует его для каталога товаров?", a: "Sitemap.xml — файл для поисковых роботов со списком URL; django.contrib.sitemaps: класс ProductSitemap с items() = Product.objects.filter(is_active=True) и location(obj) генерирует /sitemap.xml автоматически" },
        { q: "Почему SPA на React имеет проблему с SEO и как SSR или pre-rendering решают её?", a: "Поисковые боты не выполняют JavaScript — SPA возвращает пустой HTML; SSR (Next.js) рендерит HTML с данными на сервере; pre-rendering генерирует статические HTML файлы при билде; оба подхода дают ботам готовый контент" },
      ]
    },
    '11-14': {
      uk: [
        { q: "Що таке multi-stage Docker build і яка перевага для React/Django додатку?", a: "Multi-stage: перший stage встановлює залежності і збирає артефакти (npm run build, pip install); другий stage — мінімальний образ тільки з готовими файлами без компіляторів; фінальний образ менший у 3-10 разів" },
        { q: "Як налаштувати PostgreSQL у Docker для продакшну з persistent storage і коректним рестартом?", a: "Named volume для /var/lib/postgresql/data; restart: unless-stopped у compose; healthcheck: test: pg_isready -U postgres; змінні POSTGRES_USER, POSTGRES_PASSWORD через env_file: .env а не у compose напряму" },
        { q: "Що таке zero-downtime deployment і як його досягти при оновленні Docker-контейнерів?", a: "Blue-green: підняти нову версію паралельно зі старою, переключити Nginx upstream на нову і потім зупинити стару; або rolling update в Kubernetes що замінює pod-и по одному з перевіркою health перед наступним" },
      ],
      ru: [
        { q: "Что такое multi-stage Docker build и какое преимущество для React/Django приложения?", a: "Multi-stage: первый stage устанавливает зависимости и собирает артефакты (npm run build, pip install); второй stage — минимальный образ только с готовыми файлами без компиляторов; финальный образ меньше в 3-10 раз" },
        { q: "Как настроить PostgreSQL в Docker для продакшна с persistent storage и корректным рестартом?", a: "Named volume для /var/lib/postgresql/data; restart: unless-stopped в compose; healthcheck: test: pg_isready -U postgres; переменные POSTGRES_USER, POSTGRES_PASSWORD через env_file: .env а не в compose напрямую" },
        { q: "Что такое zero-downtime deployment и как его достичь при обновлении Docker-контейнеров?", a: "Blue-green: поднять новую версию параллельно со старой, переключить Nginx upstream на новую и затем остановить старую; или rolling update в Kubernetes который заменяет pod-ы по одному с проверкой health перед следующим" },
      ]
    },
  };
  Object.keys(QUIZ).forEach(function (id) {
    var l = WEB_LESSONS.find(function (x) { return x.id === id; });
    if (l) l.quiz = QUIZ[id];
  });
})();
