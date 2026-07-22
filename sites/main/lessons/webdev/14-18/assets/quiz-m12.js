/* Питання самоконтролю · Модуль 12 · 14-18 Фулстек-Про */
(function () {
  'use strict';
  var QUIZ = {
    '12-01': {
      uk: [
        { q: "Яка різниця між git merge та git rebase і коли який використовувати у командній роботі?", a: "merge зберігає повну історію і створює merge-commit; rebase переписує коміти поверх цільової гілки — лінійна чиста історія; rebase для feature-гілок перед злиттям у main, merge для довгоживучих release-гілок" },
        { q: "Що таке git cherry-pick і в якому сценарії він необхідний?", a: "cherry-pick переносить конкретний коміт з однієї гілки на іншу: git cherry-pick abc123; корисний коли hotfix зроблений у development і його треба перенести у production-гілку без злиття всіх змін development" },
        { q: "Що таке Gitflow і які гілки він визначає для командної розробки?", a: "Gitflow: main (продакшн), develop (інтеграція), feature/* (нові функції), release/* (підготовка релізу), hotfix/* (критичні виправлення); чіткі правила злиття захищають main від нестабільного коду" },
      ],
      ru: [
        { q: "В чём разница между git merge и git rebase и когда какой использовать в командной работе?", a: "merge сохраняет полную историю и создаёт merge-commit; rebase переписывает коммиты поверх целевой ветки — линейная чистая история; rebase для feature-веток перед слиянием в main, merge для долгоживущих release-веток" },
        { q: "Что такое git cherry-pick и в каком сценарии он необходим?", a: "cherry-pick переносит конкретный коммит с одной ветки на другую: git cherry-pick abc123; полезен когда hotfix сделан в development и его нужно перенести в production-ветку без слияния всех изменений development" },
        { q: "Что такое Gitflow и какие ветки он определяет для командной разработки?", a: "Gitflow: main (продакшн), develop (интеграция), feature/* (новые функции), release/* (подготовка релиза), hotfix/* (критические исправления); чёткие правила слияния защищают main от нестабильного кода" },
      ]
    },
    '12-02': {
      uk: [
        { q: "Що таке layer кешування у Docker і як порядок інструкцій у Dockerfile впливає на швидкість build?", a: "Кожна інструкція Dockerfile — окремий layer; Docker кешує незмінені layers; COPY requirements.txt + RUN pip install перед COPY . . — залежності кешуються і не перевстановлюються при зміні тільки коду" },
        { q: "Навіщо додавати .dockerignore і що зазвичай він містить для Django/React проекту?", a: ".dockerignore виключає файли з build context: node_modules/, __pycache__/, .env, .git, *.pyc, dist/; без нього Docker копіює всі файли — build повільніший, образ більший, .env може потрапити в образ" },
        { q: "Яка різниця між CMD та ENTRYPOINT у Dockerfile і як їх використовувати разом?", a: "ENTRYPOINT — основна команда що не перевизначається при docker run; CMD — аргументи за замовчуванням; ENTRYPOINT [\"python\"] CMD [\"manage.py\", \"runserver\"] — можна замінити аргументи без зміни виконуваного файлу" },
      ],
      ru: [
        { q: "Что такое layer кеширование в Docker и как порядок инструкций в Dockerfile влияет на скорость build?", a: "Каждая инструкция Dockerfile — отдельный layer; Docker кеширует неизменённые layers; COPY requirements.txt + RUN pip install перед COPY . . — зависимости кешируются и не переустанавливаются при изменении только кода" },
        { q: "Зачем добавлять .dockerignore и что обычно он содержит для Django/React проекта?", a: ".dockerignore исключает файлы из build context: node_modules/, __pycache__/, .env, .git, *.pyc, dist/; без него Docker копирует все файлы — build медленнее, образ больше, .env может попасть в образ" },
        { q: "В чём разница между CMD и ENTRYPOINT в Dockerfile и как их использовать вместе?", a: "ENTRYPOINT — основная команда не переопределяемая при docker run; CMD — аргументы по умолчанию; ENTRYPOINT [\"python\"] CMD [\"manage.py\", \"runserver\"] — можно заменить аргументы без изменения исполняемого файла" },
      ]
    },
    '12-03': {
      uk: [
        { q: "Що таке default network у docker-compose і як сервіси знаходять одне одного за іменем?", a: "Compose автоматично створює bridge-мережу і реєструє кожен сервіс під його іменем як DNS-запис; Django звертається до PostgreSQL через хостнейм 'db' у DATABASE_URL без явного IP-адресування" },
        { q: "Яка різниця між bind mount та named volume у docker-compose і коли використовувати кожен?", a: "Bind mount (./src:/app) монтує директорію хоста — ідеальний для розробки з hot reload; named volume (db-data:/var/lib/postgresql/data) керується Docker і стабільний для даних продакшну" },
        { q: "Як реалізувати secrets у docker-compose щоб паролі не зберігалися у docker-compose.yml?", a: "Через env_file: .env де змінні беруться з файлу доданого в .gitignore; або Docker Secrets: secrets: db_password: file: ./secrets/db_password.txt — контейнер читає з /run/secrets/db_password" },
      ],
      ru: [
        { q: "Что такое default network в docker-compose и как сервисы находят друг друга по имени?", a: "Compose автоматически создаёт bridge-сеть и регистрирует каждый сервис под его именем как DNS-запись; Django обращается к PostgreSQL через хостнейм 'db' в DATABASE_URL без явной IP-адресации" },
        { q: "В чём разница между bind mount и named volume в docker-compose и когда использовать каждый?", a: "Bind mount (./src:/app) монтирует директорию хоста — идеален для разработки с hot reload; named volume (db-data:/var/lib/postgresql/data) управляется Docker и стабилен для данных продакшна" },
        { q: "Как реализовать secrets в docker-compose чтобы пароли не хранились в docker-compose.yml?", a: "Через env_file: .env где переменные берутся из файла добавленного в .gitignore; или Docker Secrets: secrets: db_password: file: ./secrets/db_password.txt — контейнер читает из /run/secrets/db_password" },
      ]
    },
    '12-04': {
      uk: [
        { q: "Що таке artifact у GitHub Actions і навіщо зберігати build output між jobs?", a: "Artifact — файл або директорія що передається між jobs; після npm run build зберегти dist/ через actions/upload-artifact; deploy job завантажує через actions/download-artifact і не будує повторно" },
        { q: "Як безпечно зберігати Docker Hub credentials та SSH-ключі у GitHub Actions?", a: "Через GitHub Secrets (Settings > Secrets and variables > Actions); у workflow: ${{ secrets.DOCKER_PASSWORD }} або ${{ secrets.SSH_KEY }}; значення зашифровані і не відображаються у логах ніколи" },
        { q: "Що таке self-hosted runner у GitHub Actions і коли він краще ніж хмарний runner?", a: "Self-hosted runner — власний сервер що виконує workflow; корисний при потребі доступу до внутрішніх мереж, специфічного заліза (GPU) або коли хмарні хвилини вичерпані; встановлюється агент підключений до GitHub" },
      ],
      ru: [
        { q: "Что такое artifact в GitHub Actions и зачем сохранять build output между jobs?", a: "Artifact — файл или директория передаваемая между jobs; после npm run build сохранить dist/ через actions/upload-artifact; deploy job загружает через actions/download-artifact и не билдит повторно" },
        { q: "Как безопасно хранить Docker Hub credentials и SSH-ключи в GitHub Actions?", a: "Через GitHub Secrets (Settings > Secrets and variables > Actions); в workflow: ${{ secrets.DOCKER_PASSWORD }} или ${{ secrets.SSH_KEY }}; значения зашифрованы и никогда не отображаются в логах" },
        { q: "Что такое self-hosted runner в GitHub Actions и когда он лучше облачного runner-а?", a: "Self-hosted runner — собственный сервер выполняющий workflow; полезен при необходимости доступа к внутренним сетям, специфического железа (GPU) или когда облачные минуты исчерпаны; устанавливается агент подключённый к GitHub" },
      ]
    },
    '12-05': {
      uk: [
        { q: "Які перші кроки безпеки потрібно виконати на новому Linux VPS після підключення?", a: "1) Заборонити root SSH login (PermitRootLogin no); 2) змінити стандартний SSH порт; 3) налаштувати UFW (deny incoming, allow 22/80/443); 4) створити непривілейованого юзера; 5) встановити fail2ban" },
        { q: "Що таке systemd service і як налаштувати автозапуск Gunicorn на VPS?", a: "Файл /etc/systemd/system/gunicorn.service: секції [Unit], [Service] з ExecStart=/venv/bin/gunicorn, Restart=on-failure; systemctl enable gunicorn — автозапуск при перезавантаженні; systemctl status — логи" },
        { q: "Як UFW налаштовує базовий firewall на Linux VPS і які команди використовуються?", a: "ufw default deny incoming; ufw default allow outgoing; ufw allow 22; ufw allow 80; ufw allow 443; ufw enable; ufw status verbose — перегляд активних правил; захищає від сканерів портів і небажаного трафіку" },
      ],
      ru: [
        { q: "Какие первые шаги безопасности нужно выполнить на новом Linux VPS после подключения?", a: "1) Запретить root SSH login (PermitRootLogin no); 2) изменить стандартный SSH порт; 3) настроить UFW (deny incoming, allow 22/80/443); 4) создать непривилегированного юзера; 5) установить fail2ban" },
        { q: "Что такое systemd service и как настроить автозапуск Gunicorn на VPS?", a: "Файл /etc/systemd/system/gunicorn.service: секции [Unit], [Service] с ExecStart=/venv/bin/gunicorn, Restart=on-failure; systemctl enable gunicorn — автозапуск при перезагрузке; systemctl status — логи" },
        { q: "Как UFW настраивает базовый firewall на Linux VPS и какие команды используются?", a: "ufw default deny incoming; ufw default allow outgoing; ufw allow 22; ufw allow 80; ufw allow 443; ufw enable; ufw status verbose — просмотр активных правил; защищает от сканеров портов и нежелательного трафика" },
      ]
    },
    '12-06': {
      uk: [
        { q: "Що таке reverse proxy і яку перевагу надає Nginx перед Django/Gunicorn?", a: "Reverse proxy приймає запити від клієнтів і передає до внутрішніх сервісів; Nginx ефективно роздає статику, підтримує SSL termination, keepalive connections та захищає від повільних клієнтів (slowloris-атака)" },
        { q: "Як налаштувати upstream block у Nginx для розподілу навантаження між кількома Gunicorn воркерами?", a: "upstream django { server 127.0.0.1:8001; server 127.0.0.1:8002; } і location /api/ { proxy_pass http://django; } — Nginx розподіляє запити round-robin між доступними серверами; при падінні одного — виключає його" },
        { q: "Що таке SSL termination і чому краще завершувати HTTPS на рівні Nginx а не Django?", a: "SSL termination: Nginx розшифровує HTTPS і передає HTTP до Django у внутрішній мережі; Django не витрачає CPU на криптографію; сертифікат налаштовується один раз у Nginx для всіх upstream сервісів" },
      ],
      ru: [
        { q: "Что такое reverse proxy и какое преимущество даёт Nginx перед Django/Gunicorn?", a: "Reverse proxy принимает запросы от клиентов и передаёт к внутренним сервисам; Nginx эффективно раздаёт статику, поддерживает SSL termination, keepalive connections и защищает от медленных клиентов (slowloris-атака)" },
        { q: "Как настроить upstream block в Nginx для распределения нагрузки между несколькими Gunicorn воркерами?", a: "upstream django { server 127.0.0.1:8001; server 127.0.0.1:8002; } и location /api/ { proxy_pass http://django; } — Nginx распределяет запросы round-robin между доступными серверами; при падении одного — исключает его" },
        { q: "Что такое SSL termination и почему лучше завершать HTTPS на уровне Nginx а не Django?", a: "SSL termination: Nginx расшифровывает HTTPS и передаёт HTTP к Django во внутренней сети; Django не тратит CPU на криптографию; сертификат настраивается один раз в Nginx для всех upstream сервисов" },
      ]
    },
    '12-07': {
      uk: [
        { q: "Що таке Let's Encrypt і чому він є кращою альтернативою платним SSL-сертифікатам?", a: "Let's Encrypt — безкоштовний центр сертифікації від EFF; сертифікати видаються і оновлюються автоматично через ACME протокол; Certbot автоматизує весь процес; довіряють всі сучасні браузери" },
        { q: "Як Certbot автоматично оновлює SSL-сертифікат і як перевірити що автооновлення налаштоване?", a: "Certbot встановлює systemd timer або cron (certbot renew --quiet) що запускається двічі на день; перевірити: systemctl status certbot.timer або запустити certbot renew --dry-run для тестового відновлення" },
        { q: "Що таке HSTS і як включити його у Nginx конфігурації для додаткової безпеки?", a: "HTTP Strict Transport Security — заголовок що зобов'язує браузер завжди використовувати HTTPS; у Nginx server block для HTTPS: add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains; preload\"" },
      ],
      ru: [
        { q: "Что такое Let's Encrypt и почему он является лучшей альтернативой платным SSL-сертификатам?", a: "Let's Encrypt — бесплатный центр сертификации от EFF; сертификаты выдаются и обновляются автоматически через ACME протокол; Certbot автоматизирует весь процесс; доверяют все современные браузеры" },
        { q: "Как Certbot автоматически обновляет SSL-сертификат и как проверить что автообновление настроено?", a: "Certbot устанавливает systemd timer или cron (certbot renew --quiet) запускающийся дважды в день; проверить: systemctl status certbot.timer или запустить certbot renew --dry-run для тестового обновления" },
        { q: "Что такое HSTS и как включить его в Nginx конфигурации для дополнительной безопасности?", a: "HTTP Strict Transport Security — заголовок обязывающий браузер всегда использовать HTTPS; в Nginx server block для HTTPS: add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains; preload\"" },
      ]
    },
    '12-08': {
      uk: [
        { q: "Яка різниця між pg_dump та pg_dumpall і коли використовувати кожен?", a: "pg_dump — резервна копія однієї бази у SQL або custom формат (-Fc); pg_dumpall — всіх баз + ролей + глобальних налаштувань; для продакшну pg_dump -Fc підходить для більшості випадків, підтримує паралельне відновлення" },
        { q: "Як автоматизувати щоденний backup PostgreSQL і надійно зберегти його поза сервером?", a: "Cron: 0 2 * * * pg_dump -Fc mydb > /backup/$(date +%Y%m%d).dump && aws s3 cp ... s3://bucket/; або barman/pgbackrest для PITR; важливо перевіряти backup через тестове відновлення регулярно" },
        { q: "Що таке WAL у PostgreSQL і яку роль він відіграє у відновленні даних після збою?", a: "Write-Ahead Log — журнал всіх змін записуваний до запису у основні файли; при збої PostgreSQL застосовує WAL для відновлення консистентного стану; WAL archiving дозволяє Point-in-Time Recovery до будь-якого моменту" },
      ],
      ru: [
        { q: "В чём разница между pg_dump и pg_dumpall и когда использовать каждый?", a: "pg_dump — резервная копия одной базы в SQL или custom формат (-Fc); pg_dumpall — всех баз + ролей + глобальных настроек; для продакшна pg_dump -Fc подходит для большинства случаев, поддерживает параллельное восстановление" },
        { q: "Как автоматизировать ежедневный backup PostgreSQL и надёжно хранить его вне сервера?", a: "Cron: 0 2 * * * pg_dump -Fc mydb > /backup/$(date +%Y%m%d).dump && aws s3 cp ... s3://bucket/; или barman/pgbackrest для PITR; важно проверять backup через тестовое восстановление регулярно" },
        { q: "Что такое WAL в PostgreSQL и какую роль он играет в восстановлении данных после сбоя?", a: "Write-Ahead Log — журнал всех изменений записываемый до записи в основные файлы; при сбое PostgreSQL применяет WAL для восстановления консистентного состояния; WAL archiving позволяет Point-in-Time Recovery до любого момента" },
      ]
    },
    '12-09': {
      uk: [
        { q: "Які режими persistence підтримує Redis (RDB vs AOF) і яка різниця між ними?", a: "RDB — snapshot даних кожні N секунд: компактний, швидкий старт, але може втратити дані між snapshot-ами; AOF — записує кожну команду: надійніший, більший файл; для продакшну рекомендується AOF або комбінація обох" },
        { q: "Що таке Redis Sentinel і яку проблему high availability він вирішує?", a: "Sentinel — система моніторингу і автоматичного failover: стежить за master/replica, при падінні master автоматично підвищує replica до master і оновлює конфігурацію клієнтів; усуває single point of failure Redis" },
        { q: "Як використати Redis як кеш у Django і що таке cache invalidation?", a: "django.core.cache.backends.redis.RedisCache у CACHES; cache.set('key', value, timeout=300); cache.get('key'); invalidation — видалення застарілих даних: за TTL (автоматично), або event-based (cache.delete при оновленні)" },
      ],
      ru: [
        { q: "Какие режимы persistence поддерживает Redis (RDB vs AOF) и в чём разница?", a: "RDB — snapshot данных каждые N секунд: компактный, быстрый старт, но может потерять данные между snapshot-ами; AOF — записывает каждую команду: надёжнее, больший файл; для продакшна рекомендуется AOF или комбинация обоих" },
        { q: "Что такое Redis Sentinel и какую проблему high availability он решает?", a: "Sentinel — система мониторинга и автоматического failover: следит за master/replica, при падении master автоматически повышает replica до master и обновляет конфигурацию клиентов; устраняет single point of failure Redis" },
        { q: "Как использовать Redis как кеш в Django и что такое cache invalidation?", a: "django.core.cache.backends.redis.RedisCache в CACHES; cache.set('key', value, timeout=300); cache.get('key'); invalidation — удаление устаревших данных: по TTL (автоматически), или event-based (cache.delete при обновлении)" },
      ]
    },
    '12-10': {
      uk: [
        { q: "Що таке Sentry і які типи помилок він відстежує у Django/React додатку?", a: "Sentry — платформа відстеження помилок у реальному часі; у Django перехоплює unhandled exceptions і 500 errors зі stack trace та контекстом; у React — frontend errors з breadcrumbs; надсилає алерти в Slack чи email" },
        { q: "Що таке Prometheus metrics exporter і як Django відкриває метрики для збору?", a: "django-prometheus або вручну: endpoint /metrics повертає текстові дані у форматі Prometheus (counter, gauge, histogram); Prometheus scrape-є кожні N секунд і зберігає time series у своїй базі даних" },
        { q: "Що таке Grafana dashboard і як він пов'язаний з Prometheus для моніторингу додатку?", a: "Grafana — інструмент візуалізації підключений до Prometheus як datasource; будує графіки CPU, пам'яті, запитів/сек, часу відповіді; налаштовуються alerting rules що сповіщають при перевищенні порогів" },
      ],
      ru: [
        { q: "Что такое Sentry и какие типы ошибок он отслеживает в Django/React приложении?", a: "Sentry — платформа отслеживания ошибок в реальном времени; в Django перехватывает unhandled exceptions и 500 errors со stack trace и контекстом; в React — frontend errors с breadcrumbs; отправляет алерты в Slack или email" },
        { q: "Что такое Prometheus metrics exporter и как Django открывает метрики для сбора?", a: "django-prometheus или вручную: endpoint /metrics возвращает текстовые данные в формате Prometheus (counter, gauge, histogram); Prometheus scrape-ит каждые N секунд и хранит time series в своей базе данных" },
        { q: "Что такое Grafana dashboard и как он связан с Prometheus для мониторинга приложения?", a: "Grafana — инструмент визуализации подключённый к Prometheus как datasource; строит графики CPU, памяти, запросов/сек, времени ответа; настраиваются alerting rules уведомляющие при превышении порогов" },
      ]
    },
    '12-11': {
      uk: [
        { q: "Яка перевага структурованого логування (structlog) порівняно зі звичайним текстовим?", a: "Структуровані логи (JSON): {\"level\": \"error\", \"user_id\": 42, \"action\": \"payment\"} легко фільтрувати, агрегувати та аналізувати у Elasticsearch або Loki через query; текстові логи важко парсити автоматично" },
        { q: "З яких компонентів складається ELK Stack і яку роль виконує кожен?", a: "E — Elasticsearch (зберігання та пошук по логах), L — Logstash (збір та трансформація), K — Kibana (дашборди та візуалізація); легша альтернатива: Grafana Loki + Promtail (збір) + Grafana (дашборди)" },
        { q: "Як у Django налаштувати ротацію логів щоб файли не переповнили диск VPS?", a: "LOGGING у settings.py з RotatingFileHandler: maxBytes=10*1024*1024, backupCount=5 — зберігає 5 архівів і перезаписує найстарший; або TimedRotatingFileHandler для ротації по часу; logrotate на системному рівні" },
      ],
      ru: [
        { q: "Какое преимущество структурированного логирования (structlog) по сравнению с обычным текстовым?", a: "Структурированные логи (JSON): {\"level\": \"error\", \"user_id\": 42, \"action\": \"payment\"} легко фильтровать, агрегировать и анализировать в Elasticsearch или Loki через query; текстовые логи сложно парсить автоматически" },
        { q: "Из каких компонентов состоит ELK Stack и какую роль выполняет каждый?", a: "E — Elasticsearch (хранение и поиск по логам), L — Logstash (сбор и трансформация), K — Kibana (дашборды и визуализация); более лёгкая альтернатива: Grafana Loki + Promtail (сбор) + Grafana (дашборды)" },
        { q: "Как в Django настроить ротацию логов чтобы файлы не переполнили диск VPS?", a: "LOGGING в settings.py с RotatingFileHandler: maxBytes=10*1024*1024, backupCount=5 — хранит 5 архивов и перезаписывает самый старый; или TimedRotatingFileHandler для ротации по времени; logrotate на системном уровне" },
      ]
    },
    '12-12': {
      uk: [
        { q: "Що таке SQL Injection і як Django ORM захищає від неї за замовчуванням?", a: "SQL Injection — вставка шкідливого SQL у запит через неекрановані дані; Django ORM використовує параметризовані запити і ніколи не підставляє значення напряму у SQL; небезпечний тільки raw() з f-рядками" },
        { q: "Що таке rate limiting і як його реалізувати у Django REST Framework?", a: "Rate limiting обмежує кількість запитів за одиницю часу; DRF: DEFAULT_THROTTLE_CLASSES = ['AnonRateThrottle', 'UserRateThrottle'] та DEFAULT_THROTTLE_RATES = {'anon': '100/day', 'user': '1000/day'}" },
        { q: "Що таке OWASP Top 10 і які вразливості з цього списку найкритичніші для Django API?", a: "OWASP Top 10 — список найпоширеніших веб-вразливостей; для Django API: A01 Broken Access Control (перевірка permissions), A02 Cryptographic Failures (HTTPS, хешування), A03 Injection (ORM), A07 Auth Failures (JWT безпека)" },
      ],
      ru: [
        { q: "Что такое SQL Injection и как Django ORM защищает от неё по умолчанию?", a: "SQL Injection — вставка вредоносного SQL в запрос через неэкранированные данные; Django ORM использует параметризованные запросы и никогда не подставляет значения напрямую в SQL; опасен только raw() с f-строками" },
        { q: "Что такое rate limiting и как его реализовать в Django REST Framework?", a: "Rate limiting ограничивает количество запросов за единицу времени; DRF: DEFAULT_THROTTLE_CLASSES = ['AnonRateThrottle', 'UserRateThrottle'] и DEFAULT_THROTTLE_RATES = {'anon': '100/day', 'user': '1000/day'}" },
        { q: "Что такое OWASP Top 10 и какие уязвимости из этого списка наиболее критичны для Django API?", a: "OWASP Top 10 — список наиболее распространённых веб-уязвимостей; для Django API: A01 Broken Access Control (проверка permissions), A02 Cryptographic Failures (HTTPS, хеширование), A03 Injection (ORM), A07 Auth Failures (JWT)" },
      ]
    },
    '12-13': {
      uk: [
        { q: "Яка різниця між вертикальним та горизонтальним масштабуванням і коли застосовується кожен?", a: "Вертикальне (scale up) — додати CPU/RAM до одного сервера, простіше але є апаратний ліміт; горизонтальне (scale out) — додати більше серверів, необмежене але вимагає stateless архітектуру і load balancer" },
        { q: "Що таке stateless додаток і чому це обов'язкова умова для горизонтального масштабування?", a: "Stateless — сервер не зберігає стан між запитами; кожен запит може обробити будь-який інстанс; стан зберігається у Redis (сесії) або S3 (файли); stateful додаток прив'язує клієнта до конкретного сервера (sticky sessions)" },
        { q: "Як Nginx або HAProxy розподіляє запити між кількома backend серверами і які алгоритми підтримуються?", a: "Алгоритми: round-robin (по черзі — за замовчуванням), least_conn (до найменш навантаженого), ip_hash (по IP клієнта для sticky); healthcheck видаляє недоступні backend-и з ротації автоматично" },
      ],
      ru: [
        { q: "В чём разница между вертикальным и горизонтальным масштабированием и когда применяется каждый?", a: "Вертикальное (scale up) — добавить CPU/RAM к одному серверу, проще но есть аппаратный предел; горизонтальное (scale out) — добавить больше серверов, неограниченное но требует stateless архитектуру и load balancer" },
        { q: "Что такое stateless приложение и почему это обязательное условие для горизонтального масштабирования?", a: "Stateless — сервер не хранит состояние между запросами; каждый запрос может обработать любой инстанс; состояние хранится в Redis (сессии) или S3 (файлы); stateful приложение привязывает клиента к конкретному серверу" },
        { q: "Как Nginx или HAProxy распределяет запросы между несколькими backend серверами и какие алгоритмы поддерживаются?", a: "Алгоритмы: round-robin (по очереди — по умолчанию), least_conn (к наименее нагруженному), ip_hash (по IP клиента для sticky); healthcheck удаляет недоступные backend-ы из ротации автоматически" },
      ]
    },
    '12-14': {
      uk: [
        { q: "Що таке Pod у Kubernetes і яка різниця між Pod та Docker-контейнером?", a: "Pod — мінімальна одиниця розгортання у Kubernetes; може містити кілька контейнерів що поділяють мережу і сховище; Pod ефемерний — при збої Kubernetes автоматично створює новий; Docker контейнер — ізольований процес" },
        { q: "Що таке Deployment у Kubernetes і як він забезпечує rolling update без простою?", a: "Deployment управляє ReplicaSet — бажаною кількістю Pod-ів; при оновленні образу поступово замінює Pod-и: запускає новий, чекає ready, видаляє старий; maxSurge і maxUnavailable контролюють швидкість оновлення" },
        { q: "Що таке Service у Kubernetes і навіщо він потрібен якщо Pod вже має IP?", a: "Pod-и мають ephemeral IP що змінюється при перестворенні; Service надає стабільний DNS-ім'я і ClusterIP; типи: ClusterIP (внутрішній), NodePort (через порт ноди), LoadBalancer (зовнішній IP від cloud provider)" },
      ],
      ru: [
        { q: "Что такое Pod в Kubernetes и в чём разница между Pod и Docker-контейнером?", a: "Pod — минимальная единица развёртывания в Kubernetes; может содержать несколько контейнеров разделяющих сеть и хранилище; Pod эфемерен — при сбое Kubernetes автоматически создаёт новый; Docker контейнер — изолированный процесс" },
        { q: "Что такое Deployment в Kubernetes и как он обеспечивает rolling update без простоя?", a: "Deployment управляет ReplicaSet — желаемым количеством Pod-ов; при обновлении образа постепенно заменяет Pod-ы: запускает новый, ждёт ready, удаляет старый; maxSurge и maxUnavailable контролируют скорость обновления" },
        { q: "Что такое Service в Kubernetes и зачем он нужен если Pod уже имеет IP?", a: "Pod-ы имеют ephemeral IP меняющийся при пересоздании; Service предоставляет стабильное DNS-имя и ClusterIP; типы: ClusterIP (внутренний), NodePort (через порт ноды), LoadBalancer (внешний IP от cloud provider)" },
      ]
    },
  };
  Object.keys(QUIZ).forEach(function (id) {
    var l = WEB_LESSONS.find(function (x) { return x.id === id; });
    if (l) l.quiz = QUIZ[id];
  });
})();
