﻿/* eslint-disable */
// Мова за замовчуванням: українська (uk)
// Default language: Ukrainian

const LESSONS_DATA = [

  // ══════════════════════════════════════════════════════════
  //  МОДУЛЬ 1 — Перші кроки з Python
  // ══════════════════════════════════════════════════════════
  {
    moduleId: 1,
    moduleTitle: { uk: "Перші кроки з Python", ru: "Первые шаги с Python" },
    moduleIcon: "🐍",
    lessons: [

      // ── Урок 1 ─────────────────────────────────────────
      {
        id: 1,
        title: { uk: "Що таке Python? Встановлення", ru: "Что такое Python? Установка" },
        canvasMode: false,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Розминка</h3>
  <p>Уяви: тобі потрібно навчити робота зробити бутерброд. Але він розуміє лише чіткі команди: <em>«Візьми хліб»</em>, <em>«Намастуй масло»</em>, <em>«Поклади сир»</em>.</p>
  <p>Якщо команда неправильна або пропущена — робот зупиниться. <strong>Програмування</strong> — це саме така розмова з комп'ютером.</p>
</div>
<div class="theory-block">
  <h3>🐍 Що таке Python?</h3>
  <p><strong>Python</strong> — мова програмування. Найпопулярніша у світі для початківців. На ній створені YouTube, Instagram, ігри, роботи й штучний інтелект.</p>
  <p>Назву взяли від британського комедійного шоу — не від змії! Але змія на логотипі все одно є 🐍</p>
</div>
<div class="theory-block">
  <h3>💻 Встановлення — два кроки</h3>
  <p><strong>Крок 1 — Python:</strong><br>
  Зайди на <code>python.org/downloads</code> → натисни велику жовту кнопку → запусти installer → постав галочку <em>"Add Python to PATH"</em> → Install Now.</p>
  <p><strong>Крок 2 — Thonny (редактор):</strong><br>
  Зайди на <code>thonny.org</code> → завантаж для Windows → встанови. Thonny простий і зручний — ідеально для початківців.</p>
</div>
<div class="theory-block hint">
  <h3>🖥️ Thonny — що де</h3>
  <p><strong>Верхня частина</strong> — тут ти пишеш код (редактор).<br>
  <strong>Нижня частина</strong> — Shell: тут з'являється результат.<br>
  <strong>Кнопка ▶</strong> або <kbd>F5</kbd> — запустити програму.<br>
  <strong>Зелений жук 🐛</strong> — режим налагодження.</p>
</div>
<div class="theory-block">
  <h3>📝 Перша команда: print()</h3>
  <pre class="code-example">print("Привіт, світе!")
print("Мене звати Стів")
print(2 + 3)
</pre>
  <p><code>print()</code> — виводить текст або число на екран. Текст береться у лапки.</p>
</div>`,
          ru: `
<div class="theory-block warmup">
  <h3>🔥 Разминка</h3>
  <p>Представь: тебе нужно научить робота сделать бутерброд. Он понимает только чёткие команды: <em>«Возьми хлеб»</em>, <em>«Намажь масло»</em>, <em>«Положи сыр»</em>.</p>
  <p>Если команда неправильная — робот остановится. <strong>Программирование</strong> — это такой разговор с компьютером.</p>
</div>
<div class="theory-block">
  <h3>🐍 Что такое Python?</h3>
  <p><strong>Python</strong> — язык программирования, самый популярный в мире для начинающих. На нём созданы YouTube, Instagram, игры, роботы и искусственный интеллект.</p>
  <p>Название взяли от британского комедийного шоу — не от змеи! Но змея на логотипе всё равно есть 🐍</p>
</div>
<div class="theory-block">
  <h3>💻 Установка — два шага</h3>
  <p><strong>Шаг 1 — Python:</strong><br>
  Зайди на <code>python.org/downloads</code> → нажми большую жёлтую кнопку → запусти installer → поставь галочку <em>"Add Python to PATH"</em> → Install Now.</p>
  <p><strong>Шаг 2 — Thonny:</strong><br>
  Зайди на <code>thonny.org</code> → скачай для Windows → установи.</p>
</div>
<div class="theory-block hint">
  <h3>🖥️ Thonny — что где</h3>
  <p><strong>Верхняя часть</strong> — редактор кода.<br>
  <strong>Нижняя часть</strong> — Shell: результат программы.<br>
  <strong>Кнопка ▶ / F5</strong> — запустить.<br>
  <strong>Зелёный жук 🐛</strong> — режим отладки.</p>
</div>
<div class="theory-block">
  <h3>📝 Первая команда: print()</h3>
  <pre class="code-example">print("Привет, мир!")
print("Меня зовут Стив")
print(2 + 3)
</pre>
  <p><code>print()</code> — выводит текст или число на экран. Текст берётся в кавычки.</p>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Запусти стартовий код і подивись що з'явиться. Потім зміни текст у першому print() на своє ім'я.", ru:"Запусти стартовый код и посмотри что появится. Затем измени текст в первом print() на своё имя." }},
          { num:2, level:"easy",   text:{ uk:"Виведи три рядки: своє місто, улюблену гру, улюблений колір.", ru:"Выведи три строки: свой город, любимую игру, любимый цвет." }},
          { num:3, level:"easy",   text:{ uk:"Виведи результати обчислень: 7+3, 10*5, 100-37, 20/4.", ru:"Выведи результаты вычислений: 7+3, 10*5, 100-37, 20/4." }},
          { num:4, level:"medium", text:{ uk:"Надрукуй красивий заголовок з рамкою із зірочок:\n<code>***************</code>\n<code>* Мій профіль *</code>\n<code>***************</code>", ru:"Напечатай красивый заголовок с рамкой из звёздочек:\n<code>***************</code>\n<code>* Мой профиль *</code>\n<code>***************</code>" }},
          { num:5, level:"medium", text:{ uk:"Виведи свій «профіль»: ім'я, вік, місто, улюблена гра, улюблений колір — кожне з нового рядка.", ru:"Выведи свой «профиль»: имя, возраст, город, любимая игра, любимый цвет — каждое с новой строки." }},
          { num:6, level:"medium", text:{ uk:"Виведи таблицю множення числа 3 (від 3×1 до 3×10) — кожен рядок окремим print().", ru:"Выведи таблицу умножения числа 3 (от 3×1 до 3×10) — каждую строку отдельным print()." }},
          { num:7, level:"hard",   text:{ uk:"Виведи ASCII-арт з сердечком або будь-яким малюнком лише із символів, як мінімум 5 рядків.", ru:"Выведи ASCII-арт с сердечком или любым рисунком только из символов, минимум 5 строк." }},
          { num:8, level:"star",   text:{ uk:"⭐ Виведи обличчя Крівера з Minecraft символами ASCII — зелені клітинки, темні очі та рот.", ru:"⭐ Выведи лицо Крипера из Minecraft символами ASCII — зелёные клетки, тёмные глаза и рот." }}
        ],
        starterCode:
`# Моя перша програма на Python!
# Символ # — це коментар. Python його ігнорує.

print("Привіт, світе!")
print("Я вивчаю Python")
print("2 + 2 =", 2 + 2)
print("10 * 5 =", 10 * 5)
`
      },

      // ── Урок 2 ─────────────────────────────────────────
      {
        id: 2,
        title: { uk: "Змінні та математика", ru: "Переменные и математика" },
        canvasMode: false,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Розминка — знайди помилку!</h3>
  <pre class="bug-code">print(Привіт)        # ← помилка 1
Print("Hello")       # ← помилка 2
print("2" + 2)       # ← помилка 3</pre>
  <p>Обговори з вчителем: що не так у кожному рядку?</p>
</div>
<div class="theory-block">
  <h3>📦 Що таке змінна?</h3>
  <p>Змінна — це <strong>скринька з іменем</strong>. Ти кладеш туди значення і використовуєш ім'я замість самого значення.</p>
  <pre class="code-example">name = "Стів"      # рядок (str)
level = 15         # ціле число (int)
health = 9.5       # дійсне число (float)

print("Гравець:", name)
print("Рівень:", level)
</pre>
</div>
<div class="theory-block">
  <h3>🔢 Математичні операції</h3>
  <table class="commands-table">
    <tr><td><code>a + b</code></td><td>додавання</td></tr>
    <tr><td><code>a - b</code></td><td>віднімання</td></tr>
    <tr><td><code>a * b</code></td><td>множення</td></tr>
    <tr><td><code>a / b</code></td><td>ділення (результат float)</td></tr>
    <tr><td><code>a // b</code></td><td>цілочисельне ділення</td></tr>
    <tr><td><code>a % b</code></td><td>залишок від ділення</td></tr>
    <tr><td><code>a ** b</code></td><td>степінь (2**10 = 1024)</td></tr>
  </table>
</div>
<div class="theory-block hint">
  <h3>💡 Правила іменування змінних</h3>
  <p>✅ <code>my_score</code>, <code>level1</code>, <code>player_name</code><br>
  ❌ <code>1level</code> (починається з цифри)<br>
  ❌ <code>my score</code> (пробіл у назві)<br>
  ❌ <code>for</code>, <code>if</code>, <code>print</code> (зарезервовані слова)</p>
</div>`,
          ru: `
<div class="theory-block warmup">
  <h3>🔥 Разминка — найди ошибку!</h3>
  <pre class="bug-code">print(Привет)        # ← ошибка 1
Print("Hello")       # ← ошибка 2
print("2" + 2)       # ← ошибка 3</pre>
</div>
<div class="theory-block">
  <h3>📦 Что такое переменная?</h3>
  <p>Переменная — это <strong>ящик с именем</strong>. Кладёшь значение, используешь имя вместо самого значения.</p>
  <pre class="code-example">name = "Стив"      # строка (str)
level = 15         # целое число (int)
health = 9.5       # дробное число (float)

print("Игрок:", name)
print("Уровень:", level)
</pre>
</div>
<div class="theory-block">
  <h3>🔢 Математические операции</h3>
  <table class="commands-table">
    <tr><td><code>a + b</code></td><td>сложение</td></tr>
    <tr><td><code>a - b</code></td><td>вычитание</td></tr>
    <tr><td><code>a * b</code></td><td>умножение</td></tr>
    <tr><td><code>a / b</code></td><td>деление</td></tr>
    <tr><td><code>a // b</code></td><td>целочисленное деление</td></tr>
    <tr><td><code>a % b</code></td><td>остаток от деления</td></tr>
    <tr><td><code>a ** b</code></td><td>степень</td></tr>
  </table>
</div>
<div class="theory-block hint">
  <h3>💡 Правила именования</h3>
  <p>✅ <code>my_score</code>, <code>level1</code>, <code>player_name</code><br>
  ❌ <code>1level</code>, <code>my score</code>, <code>for</code></p>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Створи змінні: ім'я, вік, улюблена гра. Виведи їх через print().", ru:"Создай переменные: имя, возраст, любимая игра. Выведи через print()." }},
          { num:2, level:"easy",   text:{ uk:"Збережи в змінну результат 17 * 13. Виведи: 'Відповідь: X'.", ru:"Сохрани в переменную результат 17 * 13. Выведи: 'Ответ: X'." }},
          { num:3, level:"medium", text:{ uk:"Обчисли площу прямокутника: <code>width = 8</code>, <code>height = 5</code>. Виведи 'Площа = 40'.", ru:"Вычисли площадь прямоугольника: <code>width = 8</code>, <code>height = 5</code>. Выведи 'Площадь = 40'." }},
          { num:4, level:"medium", text:{ uk:"Рахуй очки: <code>kills=5</code>, <code>coins=12</code>, <code>deaths=2</code>. Очки = kills*10 + coins*5 - deaths*3. Виведи результат.", ru:"Считай очки: kills*10 + coins*5 - deaths*3. Выведи результат." }},
          { num:5, level:"medium", text:{ uk:"Конвертер температури: <code>celsius = 30</code>. Формула: fahrenheit = celsius * 9/5 + 32. Виведи обидва значення.", ru:"Конвертер температуры: celsius = 30. Формула: fahrenheit = celsius * 9/5 + 32. Выведи оба значения." }},
          { num:6, level:"hard",   text:{ uk:"Знайди, скільки секунд у 2 годинах 35 хвилинах 17 секундах. Використовуй змінні для кожної одиниці часу.", ru:"Найди сколько секунд в 2 часах 35 минутах 17 секундах. Используй переменные." }},
          { num:7, level:"hard",   text:{ uk:"Визнач, чи ділиться число на 7 без залишку: використай <code>%</code>. Виведи число та залишок від ділення на 7.", ru:"Определи делится ли число на 7 без остатка: используй <code>%</code>. Выведи число и остаток." }},
          { num:8, level:"star",   text:{ uk:"⭐ Картка персонажа: змінні name, hp, mp, attack, defense, speed. Виведи красиву таблицю характеристик символами ═ і │.", ru:"⭐ Карточка персонажа: переменные name, hp, mp, attack, defense, speed. Выведи красивую таблицу характеристик." }}
        ],
        starterCode:
`# Змінні та математика в Python

name = "Стів"
level = 15
health = 20
coins = 150

print("=== Гравець ===")
print("Ім'я:", name)
print("Рівень:", level)
print("Здоров'я:", health)
print("Монети:", coins)

# Обчислення
damage = 5
critical = damage * 2
print("Звичайний удар:", damage)
print("Критичний удар:", critical)
`
      },

      // ── Урок 3 ─────────────────────────────────────────
      {
        id: 3,
        title: { uk: "Введення даних: input()", ru: "Ввод данных: input()" },
        canvasMode: false,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Розминка</h3>
  <p>Що виведе ця програма? Поміркуй перед запуском:</p>
  <pre class="bug-code">x = 10
x = x + 5
x = x * 2
print(x)</pre>
</div>
<div class="theory-block">
  <h3>⌨️ Функція input()</h3>
  <p><code>input()</code> — зупиняє програму і чекає, поки користувач щось введе та натисне Enter.</p>
  <pre class="code-example">name = input("Як тебе звати? ")
print("Привіт,", name)
</pre>
  <p>⚠️ <code>input()</code> завжди повертає <strong>рядок (str)</strong>, навіть якщо ввели число!</p>
</div>
<div class="theory-block">
  <h3>🔄 Перетворення типів</h3>
  <table class="commands-table">
    <tr><td><code>int("15")</code></td><td>рядок → ціле число</td></tr>
    <tr><td><code>float("3.14")</code></td><td>рядок → дійсне число</td></tr>
    <tr><td><code>str(42)</code></td><td>число → рядок</td></tr>
  </table>
  <pre class="code-example">age = int(input("Скільки тобі років? "))
print("Через 5 років тобі буде", age + 5)
</pre>
</div>
<div class="theory-block hint">
  <h3>💡 f-рядки — зручне виведення</h3>
  <pre class="code-example">name = "Стів"
level = 15
print(f"Гравець {name} досяг рівня {level}!")
</pre>
  <p>Перед лапками стоїть буква <code>f</code>. Змінні беруться у фігурні дужки <code>{}</code>.</p>
</div>`,
          ru: `
<div class="theory-block warmup">
  <h3>🔥 Разминка</h3>
  <pre class="bug-code">x = 10
x = x + 5
x = x * 2
print(x)</pre>
  <p>Что выведет программа? Подумай перед запуском.</p>
</div>
<div class="theory-block">
  <h3>⌨️ Функция input()</h3>
  <p><code>input()</code> — останавливает программу и ждёт пока пользователь что-то введёт.</p>
  <pre class="code-example">name = input("Как тебя зовут? ")
print("Привет,", name)
</pre>
  <p>⚠️ <code>input()</code> всегда возвращает <strong>строку (str)</strong>!</p>
</div>
<div class="theory-block">
  <h3>🔄 Преобразование типов</h3>
  <table class="commands-table">
    <tr><td><code>int("15")</code></td><td>строка → целое число</td></tr>
    <tr><td><code>float("3.14")</code></td><td>строка → дробное</td></tr>
    <tr><td><code>str(42)</code></td><td>число → строка</td></tr>
  </table>
  <pre class="code-example">age = int(input("Сколько тебе лет? "))
print("Через 5 лет тебе будет", age + 5)
</pre>
</div>
<div class="theory-block hint">
  <h3>💡 f-строки</h3>
  <pre class="code-example">name = "Стив"
level = 15
print(f"Игрок {name} достиг уровня {level}!")
</pre>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Запитай ім'я і виведи: 'Привіт, [ім'я]! Ласкаво просимо до Академії!'", ru:"Спроси имя и выведи: 'Привет, [имя]! Добро пожаловать в Академию!'" }},
          { num:2, level:"easy",   text:{ uk:"Запитай два числа і виведи їх суму, різницю та добуток.", ru:"Спроси два числа и выведи их сумму, разность и произведение." }},
          { num:3, level:"medium", text:{ uk:"Калькулятор кола: запитай радіус, виведи площу (3.14 * r * r) та довжину кола (2 * 3.14 * r).", ru:"Калькулятор круга: спроси радиус, выведи площадь и длину окружности." }},
          { num:4, level:"medium", text:{ uk:"Запитай ім'я гравця, кількість перемог та поразок. Виведи статистику у форматі: '[ім'я]: В=X, П=Y, Відсоток перемог: Z%'.", ru:"Спроси имя игрока, победы и поражения. Выведи статистику с процентом побед." }},
          { num:5, level:"medium", text:{ uk:"Конвертер монет: запитай кількість золотих монет, виведи скільки це срібних (×10) та мідних (×100).", ru:"Конвертер монет: запроси золото, выведи серебро (×10) и медь (×100)." }},
          { num:6, level:"hard",   text:{ uk:"Запитай довжину, ширину та висоту коробки. Виведи об'єм та площу поверхні. Використовуй f-рядки.", ru:"Спроси длину, ширину и высоту коробки. Выведи объём и площадь поверхности." }},
          { num:7, level:"hard",   text:{ uk:"Запитай ім'я та рік народження. Виведи вік і скільки днів людина вже прожила (приблизно: вік × 365).", ru:"Спроси имя и год рождения. Выведи возраст и примерное количество прожитых дней." }},
          { num:8, level:"star",   text:{ uk:"⭐ Творець персонажа RPG: запитай ім'я, клас (воїн/маг/лучник) та 3 характеристики. Виведи красиву карточку героя.", ru:"⭐ Создатель персонажа RPG: спроси имя, класс и 3 характеристики. Выведи красивую карточку героя." }}
        ],
        starterCode:
`# input() — отримуємо дані від користувача

name = input("Як тебе звати? ")
print(f"Привіт, {name}!")

age = int(input("Скільки тобі років? "))
print(f"Через 10 років тобі буде {age + 10}")

# Порахуємо разом
a = int(input("Введи перше число: "))
b = int(input("Введи друге число: "))
print(f"{a} + {b} = {a + b}")
print(f"{a} * {b} = {a * b}")
`
      },

      // ── Урок 4 ─────────────────────────────────────────
      {
        id: 4,
        title: { uk: "Умовний оператор if / else", ru: "Условный оператор if / else" },
        canvasMode: false,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Розминка</h3>
  <p>Що виведе програма якщо ввести число 7?</p>
  <pre class="bug-code">n = int(input("Число: "))
print(n * 2)
print(n + 100)</pre>
  <p>А якщо ввести 0? А від'ємне число?</p>
</div>
<div class="theory-block">
  <h3>🔀 Як працює if / else</h3>
  <p>Програма вибирає один з двох шляхів залежно від умови.</p>
  <pre class="code-example">hp = 5
if hp > 0:
    print("Гравець живий!")
else:
    print("Гра закінчена...")
</pre>
  <p>⚠️ Після <code>if</code> та <code>else</code> обов'язково двокрапка <code>:</code><br>
  Код всередині — з відступом (Tab або 4 пробіли)!</p>
</div>
<div class="theory-block">
  <h3>📋 Оператори порівняння</h3>
  <table class="commands-table">
    <tr><td><code>a == b</code></td><td>рівне</td></tr>
    <tr><td><code>a != b</code></td><td>не рівне</td></tr>
    <tr><td><code>a > b</code></td><td>більше</td></tr>
    <tr><td><code>a < b</code></td><td>менше</td></tr>
    <tr><td><code>a >= b</code></td><td>більше або рівне</td></tr>
    <tr><td><code>a <= b</code></td><td>менше або рівне</td></tr>
  </table>
</div>
<div class="theory-block">
  <h3>🔀 elif — кілька умов</h3>
  <pre class="code-example">score = 85
if score >= 90:
    print("Оцінка: A")
elif score >= 75:
    print("Оцінка: B")
elif score >= 60:
    print("Оцінка: C")
else:
    print("Треба більше практики!")
</pre>
</div>
<div class="theory-block hint">
  <h3>💡 Логічні оператори</h3>
  <pre class="code-example">if hp > 0 and mana > 0:
    print("Можна кастувати")

if is_raining or is_cold:
    print("Залишайся вдома")

if not is_game_over:
    print("Продовжуємо!")
</pre>
</div>`,
          ru: `<div class="theory-block warmup">
  <h3>🔥 Разминка</h3>
  <p>Что выведет программа если ввести число 7?</p>
  <pre class="bug-code">n = int(input("Число: "))
print(n * 2)
print(n + 100)</pre>
  <p>А если ввести 0? А отрицательное число?</p>
</div>
<div class="theory-block">
  <h3>🔀 Как работает if / else</h3>
  <p>Программа выбирает один из двух путей в зависимости от условия.</p>
  <pre class="code-example">hp = 5
if hp > 0:
    print("Игрок жив!")
else:
    print("Игра окончена...")
</pre>
  <p>⚠️ После <code>if</code> и <code>else</code> обязательно двоеточие <code>:</code><br>
  Код внутри — с отступом (Tab или 4 пробела)!</p>
</div>
<div class="theory-block">
  <h3>📋 Операторы сравнения</h3>
  <table class="commands-table">
    <tr><td><code>a == b</code></td><td>равно</td></tr>
    <tr><td><code>a != b</code></td><td>не равно</td></tr>
    <tr><td><code>a > b</code></td><td>больше</td></tr>
    <tr><td><code>a < b</code></td><td>меньше</td></tr>
    <tr><td><code>a >= b</code></td><td>больше или равно</td></tr>
    <tr><td><code>a <= b</code></td><td>меньше или равно</td></tr>
  </table>
</div>
<div class="theory-block">
  <h3>🔀 elif — несколько условий</h3>
  <pre class="code-example">score = 85
if score >= 90:
    print("Оценка: A")
elif score >= 75:
    print("Оценка: B")
elif score >= 60:
    print("Оценка: C")
else:
    print("Нужно больше практики!")
</pre>
</div>
<div class="theory-block hint">
  <h3>💡 Логические операторы</h3>
  <pre class="code-example">if hp > 0 and mana > 0:
    print("Можно кастовать")

if is_raining or is_cold:
    print("Оставайся дома")

if not is_game_over:
    print("Продолжаем!")
</pre>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Запитай число. Виведи 'Парне' якщо ділиться на 2 без залишку, інакше 'Непарне'.", ru:"Спроси число. Выведи 'Чётное' или 'Нечётное'." }},
          { num:2, level:"easy",   text:{ uk:"Запитай температуру. Якщо > 30 — 'Спека!', якщо < 0 — 'Мороз!', інакше — 'Норма'.", ru:"Спроси температуру. Если > 30 — 'Жара!', если < 0 — 'Мороз!', иначе — 'Норма'." }},
          { num:3, level:"medium", text:{ uk:"Система оцінок: запитай бали (0-100). Виведи оцінку: 90+ = «Відмінно», 75+ = «Добре», 60+ = «Задовільно», менше = «Незадовільно».", ru:"Система оценок: введи баллы (0-100). Выведи оценку." }},
          { num:4, level:"medium", text:{ uk:"Охоронець підземелля: запитай рівень гравця. Якщо рівень < 5 — 'Зась! Ти ще слабкий', 5-10 — 'Можеш пройти з обережністю', > 10 — 'Ласкаво просимо, герою!'", ru:"Охранник подземелья: если уровень < 5 — 'Нельзя!', 5-10 — 'Осторожно', > 10 — 'Добро пожаловать!'." }},
          { num:5, level:"medium", text:{ uk:"Запитай два числа і знак операції (+, -, *, /). Виведи результат. Для / перевір що другий не нуль.", ru:"Спроси два числа и знак (+,-,*,/). Выведи результат. Для / проверь что делитель не ноль." }},
          { num:6, level:"hard",   text:{ uk:"Вгадай число: оголоси secret_number = 42. Запитай здогадку. Виведи 'Більше', 'Менше', або 'Правильно!'", ru:"Угадай число: объяви secret_number = 42. Спроси догадку. Выведи 'Больше', 'Меньше' или 'Правильно!'" }},
          { num:7, level:"hard",   text:{ uk:"Камінь-ножиці-папір проти комп'ютера: <code>import random</code>, <code>computer = random.choice(['камінь','ножиці','папір'])</code>. Запитай вибір гравця. Визнач переможця.", ru:"Камень-ножницы-бумага: import random, выбор компьютера случайный. Определи победителя." }},
          { num:8, level:"star",   text:{ uk:"⭐ RPG-битва: у гравця 20 hp, у монстра 15 hp. attack_player = 5, attack_monster = 3. Симулюй один раунд бою з if/else: хто атакує першим, чи виживе? Виведи результат красиво.", ru:"⭐ RPG-битва: симулируй один раунд боя. Кто атакует первым? Кто выживет? Выведи красивый результат." }}
        ],
        starterCode:
`# Умовний оператор if / else

hp = int(input("Введи кількість HP гравця: "))

if hp >= 15:
    print("Гравець в хорошій формі!")
elif hp >= 5:
    print("Гравець поранений, треба лікуватись")
else:
    print("Небезпека! HP критично низький!")

# Перевірка на парність
number = int(input("Введи число: "))
if number % 2 == 0:
    print(f"{number} — парне")
else:
    print(f"{number} — непарне")
`
      },

      // ── Урок 5 ─────────────────────────────────────────
      {
        id: 5,
        title: { uk: "Цикли: for та while", ru: "Циклы: for и while" },
        canvasMode: false,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Розминка — знайди баг!</h3>
  <pre class="bug-code">score = 100
if score = 100:        # ← помилка!
    print("Перемога")
</pre>
  <p>Підказка: <code>=</code> — це присвоєння. Для порівняння потрібен <code>==</code>.</p>
</div>
<div class="theory-block">
  <h3>🔁 Цикл for</h3>
  <p>Повторює блок коду певну кількість разів.</p>
  <pre class="code-example">for i in range(5):
    print(f"Крок {i}")

# range(5) дає: 0, 1, 2, 3, 4
# range(1, 6) дає: 1, 2, 3, 4, 5
# range(0, 10, 2) дає: 0, 2, 4, 6, 8
</pre>
</div>
<div class="theory-block">
  <h3>🔄 Цикл while</h3>
  <p>Повторює поки умова правдива. Використовується коли не знаємо кількість повторів.</p>
  <pre class="code-example">lives = 3
while lives > 0:
    print(f"Залишилось життів: {lives}")
    lives -= 1
print("Гра закінчена!")
</pre>
  <p>⚠️ Не забудь змінювати умову, інакше цикл буде нескінченним!</p>
</div>
<div class="theory-block hint">
  <h3>💡 break та continue</h3>
  <pre class="code-example">for i in range(10):
    if i == 5:
        break       # зупинити цикл
    print(i)

for i in range(10):
    if i % 2 == 0:
        continue    # пропустити парні
    print(i)        # виведе тільки непарні
</pre>
</div>`,
          ru: `<div class="theory-block warmup">
  <h3>🔥 Разминка — найди баг!</h3>
  <pre class="bug-code">score = 100
if score = 100:        # ← ошибка!
    print("Победа")
</pre>
  <p>Подсказка: <code>=</code> — это присвоение. Для сравнения нужен <code>==</code>.</p>
</div>
<div class="theory-block">
  <h3>🔁 Цикл for</h3>
  <p>Повторяет блок кода определённое количество раз.</p>
  <pre class="code-example">for i in range(5):
    print(f"Шаг {i}")

# range(5) даёт: 0, 1, 2, 3, 4
# range(1, 6) даёт: 1, 2, 3, 4, 5
# range(0, 10, 2) даёт: 0, 2, 4, 6, 8
</pre>
</div>
<div class="theory-block">
  <h3>🔄 Цикл while</h3>
  <p>Повторяет пока условие истинно. Используется когда не знаем количество повторений.</p>
  <pre class="code-example">lives = 3
while lives > 0:
    print(f"Жизней осталось: {lives}")
    lives -= 1
print("Игра окончена!")
</pre>
  <p>⚠️ Не забудь изменять условие, иначе цикл будет бесконечным!</p>
</div>
<div class="theory-block hint">
  <h3>💡 break и continue</h3>
  <pre class="code-example">for i in range(10):
    if i == 5:
        break       # остановить цикл
    print(i)

for i in range(10):
    if i % 2 == 0:
        continue    # пропустить чётные
    print(i)        # выведет только нечётные
</pre>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Виведи числа від 1 до 10 за допомогою for.", ru:"Выведи числа от 1 до 10 с помощью for." }},
          { num:2, level:"easy",   text:{ uk:"Виведи таблицю множення числа 7 (7×1 до 7×10) за допомогою циклу.", ru:"Выведи таблицу умножения числа 7 с помощью цикла." }},
          { num:3, level:"medium", text:{ uk:"Порахуй суму всіх чисел від 1 до 100 за допомогою for. Відповідь: 5050.", ru:"Посчитай сумму чисел от 1 до 100 с помощью for. Ответ: 5050." }},
          { num:4, level:"medium", text:{ uk:"Симулятор відліку: виведи числа від 10 до 1 (зворотний відлік), потім 'СТАРТ!'. Використай range(10, 0, -1).", ru:"Симулятор отсчёта: выведи числа от 10 до 1, потом 'СТАРТ!'. Используй range(10,0,-1)." }},
          { num:5, level:"medium", text:{ uk:"Гра 'Вгадай число' з while: secret=7, запитуй здогадки поки не вгадає. Рахуй кількість спроб.", ru:"Игра 'Угадай число' с while: secret=7, спрашивай пока не угадает. Считай попытки." }},
          { num:6, level:"hard",   text:{ uk:"Виведи всі числа від 1 до 50 які діляться і на 3, і на 5 (використай and та %). Підказка: тільки числа 15, 30, 45.", ru:"Выведи числа от 1 до 50 которые делятся и на 3, и на 5. Подсказка: 15, 30, 45." }},
          { num:7, level:"hard",   text:{ uk:"Симулятор битви: hp_player=20, hp_monster=15. У циклі while: гравець б'є монстра (damage=4), монстр б'є гравця (damage=3). Виводь стан після кожного раунду. Хто переможе?", ru:"Симулятор боя: hp_player=20, hp_monster=15. В цикле while атакуй и получай урон. Кто победит?" }},
          { num:8, level:"star",   text:{ uk:"⭐ Числа Фібоначчі: виведи перші 15 чисел послідовності (1,1,2,3,5,8...). Кожне наступне — сума двох попередніх.", ru:"⭐ Числа Фибоначчи: выведи первые 15 чисел последовательности (1,1,2,3,5,8...)." }}
        ],
        starterCode:
`# Цикли в Python

print("=== Цикл for ===")
for i in range(1, 6):
    print(f"Крок {i} з 5")

print("\\n=== Цикл while ===")
count = 3
while count > 0:
    print(f"Залишилось: {count}")
    count -= 1
print("Готово!")

print("\\n=== Сума чисел ===")
total = 0
for n in range(1, 11):
    total += n
print(f"Сума від 1 до 10 = {total}")
`
      },

      // ── Урок 6 ─────────────────────────────────────────
      {
        id: 6,
        title: { uk: "Рядки та методи", ru: "Строки и методы" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><pre class="bug-code">word = "Python"\nprint(word[0])   # ?\nprint(word[-1])  # ?\nprint(len(word)) # ?</pre></div><div class="theory-block"><h3>📝 Рядки в Python</h3><p>Кожен символ має <strong>індекс</strong> (з 0). Рядки можна нарізати зрізами.</p><pre class="code-example">s = "Minecraft"\nprint(s[0])      # M\nprint(s[-1])     # t\nprint(s[0:4])    # Mine\nprint(s[::-1])   # tfarceniM\nprint(len(s))    # 9</pre></div><div class="theory-block"><h3>🔧 Методи рядків</h3><table class="commands-table"><tr><td><code>s.upper()</code></td><td>ВЕЛИКІ літери</td></tr><tr><td><code>s.lower()</code></td><td>маленькі</td></tr><tr><td><code>s.strip()</code></td><td>прибрати пробіли з країв</td></tr><tr><td><code>s.replace(a,b)</code></td><td>замінити підрядок</td></tr><tr><td><code>s.split()</code></td><td>розбити на слова → список</td></tr><tr><td><code>s.find("x")</code></td><td>знайти індекс</td></tr><tr><td><code>"x" in s</code></td><td>чи містить?</td></tr></table></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><pre class="bug-code">word = "Python"\nprint(word[0])   # ?\nprint(word[-1])  # ?\nprint(len(word)) # ?</pre></div><div class="theory-block"><h3>📝 Строки в Python</h3><p>Каждый символ имеет <strong>индекс</strong> (с 0). Строки можно нарезать срезами.</p><pre class="code-example">s = "Minecraft"\nprint(s[0])      # M\nprint(s[-1])     # t\nprint(s[0:4])    # Mine\nprint(s[::-1])   # tfarceniM\nprint(len(s))    # 9</pre></div><div class="theory-block"><h3>🔧 Методы строк</h3><table class="commands-table"><tr><td><code>s.upper()</code></td><td>ЗАГЛАВНЫЕ</td></tr><tr><td><code>s.lower()</code></td><td>строчные</td></tr><tr><td><code>s.count("n")</code></td><td>сколько вхождений</td></tr><tr><td><code>s.replace("a","@")</code></td><td>замена</td></tr><tr><td><code>s.split(",")</code></td><td>разбить на список</td></tr></table></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Запитай рядок. Виведи його довжину, великими літерами і навпаки.", ru:"Спроси строку. Выведи длину, заглавными и задом наперёд." }},
          { num:2, level:"easy",   text:{ uk:"Запитай ім'я. Виведи першу та останню літеру.", ru:"Спроси имя. Выведи первую и последнюю букву." }},
          { num:3, level:"medium", text:{ uk:"«Паліндром»: перевір чи слово читається однаково в обох напрямках (word == word[::-1]).", ru:"«Палиндром»: проверь word == word[::-1]." }},
          { num:4, level:"medium", text:{ uk:"Запитай речення. Виведи кількість слів і кількість символів без пробілів.", ru:"Спроси предложение. Выведи кол-во слов и символов без пробелов." }},
          { num:5, level:"medium", text:{ uk:"Генератор ніка: перші 3 літери + '_' + останні 2 цифри року. 'Олекс'+'2015' → 'Оле_15'.", ru:"Генератор ника: первые 3 буквы + '_' + последние 2 цифры года." }},
          { num:6, level:"hard",   text:{ uk:"Запитай текст. Виведи кожну літеру через пробіл: 'hello' → 'h e l l o'.", ru:"Выведи каждую букву через пробел: 'hello' → 'h e l l o'." }},
          { num:7, level:"hard",   text:{ uk:"Лічильник слів: порахуй скільки разів кожне слово зустрічається в реченні.", ru:"Посчитай сколько раз каждое слово встречается в предложении." }},
          { num:8, level:"star",   text:{ uk:"⭐ Валідатор паролю: ≥8 символів, є цифри, є літери → 'Слабкий'/'Середній'/'Надійний'.", ru:"⭐ Валидатор пароля: ≥8 символов, цифры и буквы → Слабый/Средний/Надёжный." }}
        ],
        starterCode:
`# Рядки та методи
s = "Minecraft Steve"
print("Оригінал:", s)
print("Великими:", s.upper())
print("Довжина:", len(s))
print("Перше слово:", s.split()[0])
print("Навпаки:", s[::-1])
print("Замінимо:", s.replace("Steve", "Alex"))

if "craft" in s:
    print("Містить 'craft'!")

word = input("Введи слово: ")
print(f"Довжина: {len(word)}")
print(f"Навпаки: {word[::-1]}")
`
      },

      // ── Урок 7 ─────────────────────────────────────────
      {
        id: 7,
        title: { uk: "Списки", ru: "Списки" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><pre class="bug-code">fruits = ["яблуко","банан","вишня"]\nfor i, fruit in enumerate(fruits):\n    if i % 2 == 0:\n        print(fruit.upper())</pre><p>Що виведе?</p></div><div class="theory-block"><h3>📦 Список = інвентар Minecraft</h3><pre class="code-example">items = ["меч","щит","зілля","лук"]\nprint(items[0])       # меч\nprint(items[-1])      # лук (останній)\nprint(len(items))     # 4\nitems.append("золото")  # додати\nitems.remove("щит")     # видалити\npopped = items.pop()    # видалити останній\nprint(items)</pre></div><div class="theory-block"><h3>🔧 Методи списку</h3><table class="commands-table"><tr><td><code>.append(x)</code></td><td>додати в кінець</td></tr><tr><td><code>.insert(i,x)</code></td><td>вставити на позицію</td></tr><tr><td><code>.remove(x)</code></td><td>видалити по значенню</td></tr><tr><td><code>.pop()</code></td><td>видалити і повернути останній</td></tr><tr><td><code>.sort()</code></td><td>відсортувати</td></tr><tr><td><code>x in list</code></td><td>чи є елемент?</td></tr></table></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><pre class="bug-code">fruits = ["яблоко","банан","вишня"]\nfor i, fruit in enumerate(fruits):\n    if i % 2 == 0:\n        print(fruit.upper())</pre><p>Что выведет?</p></div><div class="theory-block"><h3>📦 Список = инвентарь Minecraft</h3><pre class="code-example">items = ["меч","щит","зелье","лук"]\nprint(items[0])       # меч\nprint(items[-1])      # лук (последний)\nprint(len(items))     # 4\nitems.append("кирка") # добавить в конец\nitems.remove("щит")   # удалить элемент\nfor item in items:\n    print(item)</pre></div><div class="theory-block"><h3>🔧 Методы списка</h3><table class="commands-table"><tr><td><code>lst.append(x)</code></td><td>добавить в конец</td></tr><tr><td><code>lst.insert(i,x)</code></td><td>вставить на позицию</td></tr><tr><td><code>lst.pop()</code></td><td>убрать последний</td></tr><tr><td><code>lst.sort()</code></td><td>сортировать</td></tr></table></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Створи список 5 улюблених ігор. Виведи першу і останню.", ru:"Создай список 5 любимых игр. Выведи первую и последнюю." }},
          { num:2, level:"easy",   text:{ uk:"Додай 2 нові ігри до списку, видали одну стару, виведи всі.", ru:"Добавь 2 игры, удали одну, выведи все." }},
          { num:3, level:"medium", text:{ uk:"scores=[85,42,93,17,68]. Відсортуй по спаданню, виведи топ-3 з місцями (1-е, 2-е, 3-є).", ru:"scores=[85,42,93,17,68]. Отсортируй по убыванию, выведи топ-3 с местами." }},
          { num:4, level:"medium", text:{ uk:"Магазин: items=['меч','щит','лук'], prices=[150,80,60]. Запитай що купити → виведи ціну або «Нема».", ru:"Магазин с товарами и ценами. Запроси что купить — выведи цену." }},
          { num:5, level:"medium", text:{ uk:"Збирай числа поки не введеш 'стоп'. Виведи суму, мін, макс, середнє.", ru:"Собирай числа до 'стоп'. Выведи сумму, мин, макс, среднее." }},
          { num:6, level:"hard",   text:{ uk:"Видали дублікати з [1,2,2,3,3,3,4] БЕЗ set(). Підказка: if item not in new_list.", ru:"Удали дубликаты из [1,2,2,3,3,3,4] БЕЗ set()." }},
          { num:7, level:"hard",   text:{ uk:"Список слів → виведи тільки слова довші за 4 символи, відсортовані за алфавітом.", ru:"Из списка слов выведи только длиннее 4 символов, по алфавиту." }},
          { num:8, level:"star",   text:{ uk:"⭐ Карти пам'яті: 8 пар символів у сітці 4×4. Гравець відкриває по 2 — якщо пара залишаються, ні — закриваються.", ru:"⭐ Карты памяти: 8 пар в сетке 4×4. Открывай по 2 — пара остаётся, нет — закрываются." }}
        ],
        starterCode:
`# Списки — інвентар Minecraft
inventory = ["меч алмазний", "щит залізний", "зілля", "факел"]

print("=== ІНВЕНТАР ===")
for i, item in enumerate(inventory):
    print(f"  {i+1}. {item}")

print(f"Загом: {len(inventory)}")

inventory.append("лук")
inventory.remove("факел")
print("\\nПісля змін:", inventory)

inventory.sort()
print("За алфавітом:", inventory)

if "меч алмазний" in inventory:
    print("\\n⚔️ Меч готовий!")
`
      },

      // ── Урок 8 ─────────────────────────────────────────
      {
        id: 8,
        title: { uk: "Функції: def та return", ru: "Функции: def и return" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><pre class="bug-code">items = ["меч","щит","лук"]\nfor i in range(5):\n    print(items[i])   # ← IndexError при i=3!</pre><p>Виправ: range(len(items))</p></div><div class="theory-block"><h3>🔨 Функція — рецепт з назвою</h3><pre class="code-example">def greet(name):\n    print(f"Привіт, {name}!")\n\ngreet("Стів")\ngreet("Алекс")</pre></div><div class="theory-block"><h3>↩️ return — повернути результат</h3><pre class="code-example">def damage(atk, def_):\n    return max(0, atk - def_)\n\ndmg = damage(15, 8)   # dmg = 7\n\n# Значення за замовчуванням\ndef status(name, hp=100, lvl=1):\n    print(f"{name}: HP={hp}, Lvl={lvl}")\n\nstatus("Герой")           # hp=100, lvl=1\nstatus("Боса", 500, 10)   # hp=500, lvl=10</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><pre class="bug-code">items = ["меч","щит","лук"]\nfor i in range(5):\n    print(items[i])   # ← IndexError при i=3!</pre><p>Исправь: range(len(items))</p></div><div class="theory-block"><h3>🔨 Функция — рецепт с именем</h3><pre class="code-example">def greet(name):\n    print(f"Привет, {name}!")\n\ngreet("Стив")\ngreet("Алекс")</pre></div><div class="theory-block"><h3>↩️ return — вернуть результат</h3><pre class="code-example">def damage(atk, def_):\n    return max(0, atk - def_)\n\ndmg = damage(15, 8)   # dmg = 7\n\n# Значение по умолчанию\ndef status(name, hp=100, lvl=1):\n    print(f"{name}: HP={hp}, Lvl={lvl}")\n\nstatus("Герой")           # hp=100, lvl=1\nstatus("Босс", 500, 10)   # hp=500, lvl=10</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Функція square(n) → повертає n². Виклич для 3, 5, 10, 12.", ru:"Функция square(n) → n². Вызови для 3, 5, 10, 12." }},
          { num:2, level:"easy",   text:{ uk:"Функція is_even(n) → True якщо парне, False якщо непарне.", ru:"Функция is_even(n) → True если чётное." }},
          { num:3, level:"medium", text:{ uk:"greet_player(name, lang='uk'): uk→'Привіт!', en→'Hello!', es→'¡Hola!'", ru:"greet_player(name, lang='ru'): ru→'Привет!', en→'Hello!'" }},
          { num:4, level:"medium", text:{ uk:"stats(scores) → повертає (мін, макс, середнє) для списку балів.", ru:"stats(scores) → (мин, макс, среднее)." }},
          { num:5, level:"medium", text:{ uk:"celsius_to_all(c) → (fahrenheit, kelvin). F=c*9/5+32, K=c+273.15.", ru:"celsius_to_all(c) → (fahrenheit, kelvin)." }},
          { num:6, level:"hard",   text:{ uk:"fizzbuzz(n): ділиться на 3→'Fizz', на 5→'Buzz', на обидва→'FizzBuzz'. Виклич для 1-30.", ru:"fizzbuzz(n): делится на 3→'Fizz', на 5→'Buzz', на оба→'FizzBuzz'. 1-30." }},
          { num:7, level:"hard",   text:{ uk:"Рекурсія: factorial(n) = n*factorial(n-1), factorial(0)=1. Порахуй 5! і 10!", ru:"Рекурсия: factorial(n). Посчитай 5! и 10!" }},
          { num:8, level:"star",   text:{ uk:"⭐ RPG: функції create_hero(), attack_turn(), is_alive(), battle(). Повноцінний бій!", ru:"⭐ RPG: create_hero(), attack_turn(), is_alive(), battle(). Полноценный бой!" }}
        ],
        starterCode:
`# Функції в Python

def show_card(name, hp, attack, level=1):
    bar = "█" * level + "░" * (10 - level)
    print(f"┌{'─'*24}┐")
    print(f"│ Герой: {name:<17}│")
    print(f"│ HP:{hp:<5} ATK:{attack:<5} Lvl:{level:<3}│")
    print(f"│ [{bar}] │")
    print(f"└{'─'*24}┘")

def calc_damage(attack, defense):
    return max(0, attack - defense)

show_card("Стів", 80, 15, level=7)
show_card("Боса", 150, 20, level=12)

p_dmg = calc_damage(15, 10)
m_dmg = calc_damage(20, 8)
print(f"\\nГравець нанесе: {p_dmg}")
print(f"Монстр нанесе:  {m_dmg}")
`
      },

      // ── Урок 9 ─────────────────────────────────────────
      {
        id: 9,
        title: { uk: "Словники", ru: "Словари" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><pre class="bug-code">def greet(name, greeting):\n    print(greeting + name)\ngreet("Привіт, ")   # ← Не вистачає аргументу!</pre></div><div class="theory-block"><h3>📖 Словник = картка персонажа</h3><pre class="code-example">hero = {\n    "name": "Артеміс",\n    "hp":   100,\n    "level": 7,\n    "items": ["посох", "мантія"]\n}\nprint(hero["name"])        # Артеміс\nprint(hero.get("xp", 0))   # 0 (безпечний доступ)\nhero["hp"] = 85             # змінити\nhero["gold"] = 250          # додати ключ\ndel hero["gold"]            # видалити\nfor k, v in hero.items():\n    print(f"  {k}: {v}")</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><pre class="bug-code">def greet(name, greeting):\n    print(greeting + name)\ngreet("Привет, ")   # ← Не хватает аргумента!</pre></div><div class="theory-block"><h3>📖 Словарь = карточка персонажа</h3><pre class="code-example">hero = {\n    "name": "Артемис",\n    "hp":   100,\n    "level": 7,\n    "items": ["посох", "мантия"]\n}\nprint(hero["name"])        # Артемис\nprint(hero.get("xp", 0))   # 0 (безопасный доступ)\nhero["hp"] = 85             # изменить\nhero["gold"] = 250          # добавить ключ\ndel hero["gold"]            # удалить\nfor k, v in hero.items():\n    print(f"  {k}: {v}")</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Словник про себе: name, age, city, fav_game. Виведи через f-рядки.", ru:"Словарь о себе. Выведи через f-строки." }},
          { num:2, level:"easy",   text:{ uk:"Словник-перекладач (5 слів). Запитай слово → переклад або «Не знайдено».", ru:"Словарь-переводчик. Запроси слово — перевод или «Не найдено»." }},
          { num:3, level:"medium", text:{ uk:"Лічильник слів: речення → {слово: кількість} через цикл.", ru:"Счётчик слов: предложение → {слово: количество}." }},
          { num:4, level:"medium", text:{ uk:"Інвентар із кількістю: {меч:1, зілля:5}. Команди: взяти, використати, показати.", ru:"Инвентарь с количеством. Взять, использовать, показать." }},
          { num:5, level:"medium", text:{ uk:"Список студентів [{name, scores:[]}]. Виведи ім'я та середній бал кожного.", ru:"Список студентов [{name, scores:[]}]. Имя и средний балл." }},
          { num:6, level:"hard",   text:{ uk:"Телефонна книга: {ім'я: номер}. Цикл while з командами: додати, знайти, видалити, всі.", ru:"Телефонная книга. Команды: добавить, найти, удалить, все." }},
          { num:7, level:"hard",   text:{ uk:"Магазин: {товар: {price, qty}}. Купівля знімає qty і gold. Виводь залишок.", ru:"Магазин: {товар:{price,qty}}. Покупка снимает qty и gold." }},
          { num:8, level:"star",   text:{ uk:"⭐ Конфігуратор: клас → базові stats зі словника + ім'я → красива картка.", ru:"⭐ Конфигуратор: класс из словаря классов + имя → красивая карточка." }}
        ],
        starterCode:
`# Словники в Python
hero = {
    "name":  "Артеміс",
    "hp":    100,
    "level": 7,
    "class": "Маг",
    "items": ["посох", "мантія"]
}

print("=== ГЕРОЙ ===")
for key, val in hero.items():
    print(f"  {key:<8}: {val}")

hero["hp"] -= 20
hero["gold"] = 250
print(f"\\nПісля бою: HP={hero['hp']}, Gold={hero['gold']}")

party = [
    {"name":"Стів",  "class":"Воїн",   "hp":100},
    {"name":"Алекс", "class":"Лучник", "hp":80},
]
print("\\n=== ЗАГІН ===")
for m in party:
    print(f"  {m['name']} ({m['class']}): {m['hp']} HP")
`
      },

      // ── Урок 10 ────────────────────────────────────────
      {
        id: 10,
        title: { uk: "Проект: Текстова пригода", ru: "Проект: Текстовое приключение" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Мозковий штурм</h3><p>Намалюй карту: 3-4 кімнати зі стрілками між ними. Що є у кожній? Хто там живе?</p></div><div class="theory-block"><h3>🗺️ Структура гри</h3><pre class="code-example">rooms = {\n  "вхід": {\n    "desc":  "Темний коридор...",\n    "exits": {"північ":"зал"},\n    "items": ["ключ"]\n  }\n}\nhero = {"name":"Стів","hp":20,"items":[]}\ncurrent = "вхід"</pre></div><div class="theory-block hint"><h3>💡 Ігровий цикл</h3><p>1. Показати кімнату<br>2. Запитати команду<br>3. Обробити (рух/взяти/бій)<br>4. Перевірити кінець<br>5. Повторити</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Мозговой штурм</h3><p>Нарисуй карту: 3-4 комнаты со стрелками между ними. Что есть в каждой? Кто там живёт?</p></div><div class="theory-block"><h3>🗺️ Структура игры</h3><pre class="code-example">rooms = {\n  "вход": {\n    "desc":  "Тёмный коридор...",\n    "exits": {"север":"зал"},\n    "items": ["ключ"]\n  }\n}\nhero = {"name":"Стив","hp":20,"items":[]}\ncurrent = "вход"</pre></div><div class="theory-block hint"><h3>💡 Игровой цикл</h3><p>1. Показать комнату<br>2. Спросить команду<br>3. Обработать (движение/взять/бой)<br>4. Проверить конец<br>5. Повторить</p></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Запусти стартовий код. Пройди всі 4 кімнати.", ru:"Запусти стартовый код. Пройди все 4 комнаты." }},
          { num:2, level:"easy",   text:{ uk:"Додай нову кімнату «криниця» з описом і предметом. З'єднай з вже існуючою.", ru:"Добавь новую комнату «колодец». Соедини с существующей." }},
          { num:3, level:"medium", text:{ uk:"Додай команду «використати зілля» — +10 hp (не вище max_hp).", ru:"Команда «использовать зелье» — +10 hp (не выше max_hp)." }},
          { num:4, level:"medium", text:{ uk:"При зборі 3+ предметів — виводь святкове повідомлення про перемогу.", ru:"При сборе 3+ предметов — победное сообщение." }},
          { num:5, level:"medium", text:{ uk:"Система «золото»: монети в кімнатах, показуй скільки зібрано.", ru:"Система золота: монеты в комнатах, показывай сколько собрано." }},
          { num:6, level:"hard",   text:{ uk:"Бойова система: ворог у кімнаті атакує, після перемоги залишає предмет.", ru:"Боевая система: враг атакует, после победы — предмет." }},
          { num:7, level:"hard",   text:{ uk:"Команда «карта» — список кімнат де вже побував.", ru:"Команда «карта» — список посещённых комнат." }},
          { num:8, level:"star",   text:{ uk:"⭐ Власна пригода (космос/казка/пірати). 4+ кімнати, 2+ вороги, 3+ предмети.", ru:"⭐ Своё приключение (космос/сказка/пираты). 4+ комнат, 2+ врага, 3+ предмета." }}
        ],
        starterCode:
`rooms = {
    "вхід":       {"desc":"Темний коридор. Смолоскипи ледь горять.", "exits":{"північ":"зал","схід":"комора"}, "items":["монета"],"enemy":None},
    "зал":        {"desc":"Велика зала. Чуєш гарчання...",             "exits":{"південь":"вхід","схід":"скарб"},"items":["зілля"], "enemy":"Зомбі"},
    "комора":     {"desc":"Полиці з пилюкою.",                         "exits":{"захід":"вхід"},                "items":["хліб"],  "enemy":None},
    "скарб": {"desc":"Золоте сяйво! Але попереду Боса!",          "exits":{"захід":"зал"},                 "items":["алмаз"],"enemy":"Боса"},
}
hero = {"name":"Стів","hp":20,"items":[]}
current = "вхід"
print("🗡️ ПІДЗЕМЕЛЛЯ СТІВА")
print("Команди: північ/південь/схід/захід, взяти, статус, вихід\\n")
while hero["hp"] > 0:
    room = rooms[current]
    print(f"\\n📍 {room['desc']}")
    if room["items"]: print(f"   Предмети: {room['items']}")
    if room["enemy"]: print(f"   ⚠️  Ворог: {room['enemy']}")
    exits = ", ".join([f"{d}→{r}" for d,r in room["exits"].items()])
    print(f"   Виходи: {exits}")
    cmd = input("> ").strip().lower()
    if cmd == "вихід": break
    elif cmd == "статус": print(f"HP={hero['hp']}, Предмети={hero['items']}")
    elif cmd == "взяти" and room["items"]:
        item = room["items"].pop(0); hero["items"].append(item); print(f"✅ {item}!")
    elif cmd in room["exits"]: current = room["exits"][cmd]
    else: print("Не розумію.")
`
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  МОДУЛЬ 2 — Черепашача магія
  // ══════════════════════════════════════════════════════════
  {
    moduleId: 2,
    moduleTitle: { uk: "Черепашача магія", ru: "Черепашья магия" },
    moduleIcon: "🐢",
    lessons: [

      // ── Урок 6 ─────────────────────────────────────────
      {
        id: 11,
        title: { uk: "Перша черепашка. Рух", ru: "Первая черепашка. Движение" },
        canvasMode: true,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Розминка</h3>
  <p>Уяви робота на підлозі з маркером. Він малює де йде. Ти кажеш: «вперед 3 кроки, поворот, ще 3 кроки». Що намалюється?</p>
  <p>Саме так працює <strong>черепашка</strong> — вона ходить і малює лінії!</p>
</div>
<div class="theory-block">
  <h3>🐢 Команди руху</h3>
  <table class="commands-table">
    <tr><td><code>t.forward(100)</code></td><td>вперед на 100 пікселів</td></tr>
    <tr><td><code>t.backward(50)</code></td><td>назад на 50</td></tr>
    <tr><td><code>t.left(90)</code></td><td>поворот ліворуч на 90°</td></tr>
    <tr><td><code>t.right(90)</code></td><td>поворот праворуч на 90°</td></tr>
    <tr><td><code>t.penup()</code></td><td>підняти перо (не малює)</td></tr>
    <tr><td><code>t.pendown()</code></td><td>опустити перо (малює)</td></tr>
    <tr><td><code>t.goto(x, y)</code></td><td>перейти в точку</td></tr>
    <tr><td><code>t.speed(N)</code></td><td>швидкість 1–10</td></tr>
    <tr><td><code>t.width(N)</code></td><td>товщина лінії</td></tr>
  </table>
</div>
<div class="theory-block hint">
  <h3>💡 Кути повороту</h3>
  <p>Квадрат: 4 сторони × поворот <strong>90°</strong><br>
  Трикутник: 3 сторони × поворот <strong>120°</strong><br>
  Формула для будь-якого правильного многокутника: <strong>360° ÷ кількість сторін</strong></p>
</div>`,
          ru: `
<div class="theory-block warmup">
  <h3>🔥 Разминка</h3>
  <p>Представь робота на полу с маркером. Ты говоришь: «вперёд 3 шага, поворот, ещё 3 шага». Что нарисуется?</p>
</div>
<div class="theory-block">
  <h3>🐢 Команды движения</h3>
  <table class="commands-table">
    <tr><td><code>t.forward(100)</code></td><td>вперёд на 100 пикселей</td></tr>
    <tr><td><code>t.backward(50)</code></td><td>назад на 50</td></tr>
    <tr><td><code>t.left(90)</code></td><td>поворот влево на 90°</td></tr>
    <tr><td><code>t.right(90)</code></td><td>поворот вправо</td></tr>
    <tr><td><code>t.penup()</code></td><td>поднять перо</td></tr>
    <tr><td><code>t.pendown()</code></td><td>опустить перо</td></tr>
    <tr><td><code>t.goto(x, y)</code></td><td>перейти в точку</td></tr>
    <tr><td><code>t.speed(N)</code></td><td>скорость 1–10</td></tr>
  </table>
</div>
<div class="theory-block hint">
  <h3>💡 Углы поворота</h3>
  <p>Квадрат: 4 × <strong>90°</strong> | Треугольник: 3 × <strong>120°</strong><br>
  Формула: <strong>360° ÷ кол-во сторон</strong></p>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй вертикальну лінію (вгору на 150 пікселів).", ru:"Нарисуй вертикальную линию (вверх на 150 пикселей)." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй хрест (+): лінія вправо, повернись назад, лінія вгору — всього 4 лінії з центру.", ru:"Нарисуй крест (+): 4 линии из центра." }},
          { num:3, level:"medium", text:{ uk:"Намалюй букву «П»: два стовпи вниз, зверху з'єднані горизонтальною лінією.", ru:"Нарисуй букву «П»: два столба вниз, соединённых сверху." }},
          { num:4, level:"medium", text:{ uk:"Намалюй правильний трикутник (кут 120°) та п'ятикутник (кут 72°). Підказка: 360÷3=120, 360÷5=72.", ru:"Нарисуй правильный треугольник (угол 120°) и пятиугольник (угол 72°)." }},
          { num:5, level:"medium", text:{ uk:"Намалюй знак решітки # — чотири паралельні лінії (2 горизонтальних, 2 вертикальних).", ru:"Нарисуй знак решётки # — 4 параллельных линии." }},
          { num:6, level:"hard",   text:{ uk:"Намалюй сходинки: 5 ступенів по 40 пікселів (вперед 40, вліво 90, вперед 40, вправо 90 — повтори 5 разів).", ru:"Нарисуй лестницу: 5 ступеней по 40 пикселей." }},
          { num:7, level:"hard",   text:{ uk:"Намалюй стрілу: довга горизонтальна лінія, а на кінці наконечник з двох діагональних ліній.", ru:"Нарисуй стрелу: длинная линия + наконечник из двух диагоналей." }},
          { num:8, level:"star",   text:{ uk:"⭐ Намалюй першу літеру свого імені великого розміру — лише прямими лініями та кутами.", ru:"⭐ Нарисуй первую букву своего имени большого размера — только прямыми линиями." }}
        ],
        starterCode:
`import turtle

t = turtle.Turtle()
t.shape("turtle")
t.width(3)
t.speed(4)

# Квадрат
t.forward(100)
t.left(90)
t.forward(100)
t.left(90)
t.forward(100)
t.left(90)
t.forward(100)
t.left(90)

# Переїдемо і намалюємо трикутник
t.penup()
t.goto(130, 0)
t.pendown()

for _ in range(3):
    t.forward(100)
    t.left(120)
`
      },

      // ── Урок 7 ─────────────────────────────────────────
      {
        id: 12,
        title: { uk: "Кольори та заливка", ru: "Цвета и заливка" },
        canvasMode: true,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Знайди баг!</h3>
  <pre class="bug-code">t.forward(100)
t.left(45)     ← неправильний кут для квадрата!
t.forward(100)
t.left(90)
...</pre>
</div>
<div class="theory-block">
  <h3>🎨 Команди кольору</h3>
  <table class="commands-table">
    <tr><td><code>t.pencolor("red")</code></td><td>колір лінії</td></tr>
    <tr><td><code>t.fillcolor("blue")</code></td><td>колір заливки</td></tr>
    <tr><td><code>t.color("black","green")</code></td><td>лінія та заливка</td></tr>
    <tr><td><code>t.begin_fill()</code></td><td>почати заливку</td></tr>
    <tr><td><code>t.end_fill()</code></td><td>залити фігуру</td></tr>
    <tr><td><code>t.circle(50)</code></td><td>намалювати коло</td></tr>
    <tr><td><code>turtle.bgcolor("sky blue")</code></td><td>колір фону</td></tr>
  </table>
</div>
<div class="theory-block">
  <h3>⛏️ Кольори Minecraft</h3>
  <table class="commands-table">
    <tr><td>Трава</td><td><code>"green"</code></td><td>Земля</td><td><code>"saddlebrown"</code></td></tr>
    <tr><td>Камінь</td><td><code>"gray"</code></td><td>Пісок</td><td><code>"wheat"</code></td></tr>
    <tr><td>Вода</td><td><code>"dodgerblue"</code></td><td>Лава</td><td><code>"orangered"</code></td></tr>
    <tr><td>Золото</td><td><code>"gold"</code></td><td>Алмаз</td><td><code>"deepskyblue"</code></td></tr>
  </table>
</div>`,
          ru: `<div class="theory-block warmup">
  <h3>🔥 Найди баг!</h3>
  <pre class="bug-code">t.forward(100)
t.left(45)     ← неправильный угол для квадрата!
t.forward(100)
t.left(90)
...</pre>
</div>
<div class="theory-block">
  <h3>🎨 Команды цвета</h3>
  <table class="commands-table">
    <tr><td><code>t.pencolor("red")</code></td><td>цвет линии</td></tr>
    <tr><td><code>t.fillcolor("blue")</code></td><td>цвет заливки</td></tr>
    <tr><td><code>t.color("black","green")</code></td><td>линия и заливка</td></tr>
    <tr><td><code>t.begin_fill()</code></td><td>начать заливку</td></tr>
    <tr><td><code>t.end_fill()</code></td><td>залить фигуру</td></tr>
    <tr><td><code>t.circle(50)</code></td><td>нарисовать круг</td></tr>
    <tr><td><code>turtle.bgcolor("sky blue")</code></td><td>фон</td></tr>
  </table>
</div>
<div class="theory-block">
  <h3>⛏️ Цвета Minecraft</h3>
  <table class="commands-table">
    <tr><td>Трава</td><td><code>"green"</code></td><td>Земля</td><td><code>"saddlebrown"</code></td></tr>
    <tr><td>Камень</td><td><code>"gray"</code></td><td>Песок</td><td><code>"wheat"</code></td></tr>
    <tr><td>Вода</td><td><code>"dodgerblue"</code></td><td>Лава</td><td><code>"orangered"</code></td></tr>
    <tr><td>Золото</td><td><code>"gold"</code></td><td>Алмаз</td><td><code>"deepskyblue"</code></td></tr>
  </table>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй зафарбований червоний квадрат з чорним контуром.", ru:"Нарисуй закрашенный красный квадрат с чёрным контуром." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй світлофор: три кола вертикально — червоне (вгорі), жовте (посередині), зелене (знизу).", ru:"Нарисуй светофор: три круга вертикально — красный, жёлтый, зелёный." }},
          { num:3, level:"medium", text:{ uk:"Намалюй обличчя Крівера з Minecraft: великий зелений квадрат + два темних квадрати-очі + темний прямокутник-рот.", ru:"Нарисуй лицо Крипера из Minecraft: большой зелёный квадрат + тёмные глаза + рот." }},
          { num:4, level:"medium", text:{ uk:"Намалюй прапор України: два прямокутники 200×80 — верхній синій, нижній жовтий.", ru:"Нарисуй флаг Украины: два прямоугольника 200×80 — синий и жёлтый." }},
          { num:5, level:"medium", text:{ uk:"Намалюй смайлик: жовте коло-голова, два маленьких чорних кола-очі, дуга-посмішка (t.circle з невеликим кутом).", ru:"Нарисуй смайлик: жёлтый круг, два чёрных глаза, дуга-улыбка." }},
          { num:6, level:"hard",   text:{ uk:"Намалюй піцу: великий помаранчевий круг (тісто), зверху червоний трохи менший (соус), потім кілька малих кіл-топінгів різного кольору.", ru:"Нарисуй пиццу: оранжевый круг (тесто), красный поменьше (соус), маленькие кружки-топпинги." }},
          { num:7, level:"hard",   text:{ uk:"Намалюй веселку: 5 концентричних дуг різного кольору (червона, помаранчева, жовта, зелена, синя). Дуга — це t.circle(r, 180).", ru:"Нарисуй радугу: 5 концентрических дуг разного цвета. Дуга: t.circle(r, 180)." }},
          { num:8, level:"star",   text:{ uk:"⭐ Намалюй повноцінну сцену Minecraft: блакитне небо, жовте сонце, зелена трава внизу, блоки каменю та землі, хоча б одне дерево.", ru:"⭐ Нарисуй сцену Minecraft: небо, солнце, трава, блоки, дерево." }}
        ],
        starterCode:
`import turtle

t = turtle.Turtle()
t.speed(6)
t.width(2)
turtle.bgcolor("skyblue")

def filled_square(size, fill, outline="black"):
    t.color(outline, fill)
    t.begin_fill()
    for _ in range(4):
        t.forward(size)
        t.left(90)
    t.end_fill()

def filled_circle(radius, fill, outline="black"):
    t.color(outline, fill)
    t.begin_fill()
    t.circle(radius)
    t.end_fill()

# Блок трави
t.penup(); t.goto(-100, -50); t.pendown()
filled_square(80, "green")

# Сонце
t.penup(); t.goto(130, 60); t.pendown()
filled_circle(35, "yellow", "orange")
`
      },

      // ── Урок 8 ─────────────────────────────────────────
      {
        id: 13,
        title: { uk: "Змінні в малюванні", ru: "Переменные в рисовании" },
        canvasMode: true,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Знайди 3 помилки!</h3>
  <pre class="bug-code">import Turtle                # 1
t = turtle.Turtle()
t.fillcolor("red")
t.begin fill()               # 2
for _ in range(4):
    t.forward(100)
    t.left(90)
t.end_fill                   # 3</pre>
</div>
<div class="theory-block">
  <h3>📦 Змінні = налаштування малюнка</h3>
  <p>Зміни <strong>одне значення</strong> — і весь малюнок перебудується автоматично!</p>
  <pre class="code-example">size = 100        # ← спробуй змінити на 50 або 200
color = "green"   # ← спробуй "red", "gold", "purple"

t.fillcolor(color)
t.begin_fill()
for _ in range(4):
    t.forward(size)
    t.left(90)
t.end_fill()
</pre>
</div>
<div class="theory-block hint">
  <h3>💡 write() — текст на екрані</h3>
  <pre class="code-example">t.goto(-60, -130)
t.write("Мій персонаж", font=("Arial", 14, "bold"))
</pre>
</div>`,
          ru: `<div class="theory-block warmup">
  <h3>🔥 Найди 3 ошибки!</h3>
  <pre class="bug-code">import Turtle                # 1
t = turtle.Turtle()
t.fillcolor("red")
t.begin fill()               # 2
for _ in range(4):
    t.forward(100)
    t.left(90)
t.end_fill                   # 3</pre>
</div>
<div class="theory-block">
  <h3>📦 Переменные = настройки рисунка</h3>
  <p>Измени <strong>одно значение</strong> — и весь рисунок перестроится автоматически!</p>
  <pre class="code-example">size = 100        # ← попробуй изменить на 50 или 200
color = "green"   # ← попробуй "red", "gold", "purple"

t.fillcolor(color)
t.begin_fill()
for _ in range(4):
    t.forward(size)
    t.left(90)
t.end_fill()
</pre>
</div>
<div class="theory-block hint">
  <h3>💡 write() — текст на экране</h3>
  <pre class="code-example">t.goto(-60, -130)
t.write("Мой персонаж", font=("Arial", 14, "bold"))
</pre>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Створи змінну <code>size=80</code>. Намалюй квадрат. Зміни на 150 — перезапусти. Зміни на 40 — перезапусти.", ru:"Переменная size=80. Нарисуй квадрат. Измени на 150. Измени на 40." }},
          { num:2, level:"easy",   text:{ uk:"Змінні <code>fill='gold'</code>, <code>outline='darkorange'</code>, <code>size=100</code>. Намалюй квадрат ними.", ru:"Переменные fill='gold', outline='darkorange', size=100. Нарисуй квадрат." }},
          { num:3, level:"medium", text:{ uk:"Намалюй трьох 'планет' різного розміру: <code>r1=20, r2=40, r3=65</code>. Свій колір у кожної. Розташуй їх у ряд.", ru:"Три планеты разного размера: r1=20, r2=40, r3=65. Разные цвета, в ряд." }},
          { num:4, level:"medium", text:{ uk:"Намалюй смайлик: використовуй змінні <code>head_size</code>, <code>eye_size</code>, <code>head_color</code>. Зміни <code>head_size</code> — смайлик перемасштабується.", ru:"Нарисуй смайлик через переменные head_size, eye_size, head_color." }},
          { num:5, level:"medium", text:{ uk:"Картка персонажа: змінні name, hp, attack, defense. Намалюй прямокутник і всередині виведи характеристики через write().", ru:"Карточка персонажа: переменные name, hp, attack, defense. Прямоугольник + write()." }},
          { num:6, level:"hard",   text:{ uk:"Намалюй три сонячні системи з однієї функції: велика жовта зірка + орбіта + планета. Використай змінні для розмірів.", ru:"Три солнечные системы с переменными для размеров звезды, орбиты и планеты." }},
          { num:7, level:"hard",   text:{ uk:"Намалюй піксельний будиночок тільки через змінні: <code>unit=20</code> — усі розміри кратні unit. Зміни unit=10 або 30 — будиночок перемасштабується.", ru:"Пиксельный домик через переменную unit=20. Все размеры кратны unit." }},
          { num:8, level:"star",   text:{ uk:"⭐ Намалюй свого персонажа з Roblox або Minecraft лише через змінні. Зміна однієї змінної <code>scale</code> має масштабувати всього персонажа.", ru:"⭐ Нарисуй персонажа Roblox/Minecraft только через переменные. Одна переменная scale масштабирует всё." }}
        ],
        starterCode:
`import turtle

t = turtle.Turtle()
t.speed(6)
t.width(2)
turtle.bgcolor("lightblue")

# ↓ Змінюй тільки ці рядки!
size = 100
body_color = "saddlebrown"
outline_color = "black"

# Тіло
t.color(outline_color, body_color)
t.begin_fill()
for _ in range(4):
    t.forward(size)
    t.left(90)
t.end_fill()

# Голова (коло)
t.penup()
t.goto(size // 2, size)
t.pendown()
t.color(outline_color, "peachpuff")
t.begin_fill()
t.circle(size // 3)
t.end_fill()

# Підпис
t.penup()
t.goto(-size // 2, -30)
t.write("Мій герой!", font=("Arial", 13, "bold"))
`
      },

      // ── Урок 9 ─────────────────────────────────────────
      {
        id: 14,
        title: { uk: "Цикл for у малюванні", ru: "Цикл for в рисовании" },
        canvasMode: true,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Знайди баг!</h3>
  <pre class="bug-code">colors = ["red", "blue", "green"]
for i in range(5):          # ← проблема!
    t.fillcolor(colors[i])  # ← що станеться при i=3?</pre>
  <p>range(5) дає i=0,1,2,3,4 — але список має лише 3 елементи!</p>
</div>
<div class="theory-block">
  <h3>🔁 for у малюванні</h3>
  <pre class="code-example">for i in range(6):
    t.penup()
    t.goto(-200 + i * 70, 0)   # кожен блок правіше
    t.pendown()
    draw_block(60, colors[i])
</pre>
  <p>Змінна <code>i</code> — лічильник повторень (0,1,2...). Множимо на крок щоб зсувати блоки.</p>
</div>
<div class="theory-block hint">
  <h3>💡 range() з параметрами</h3>
  <pre class="code-example">range(5)        # 0,1,2,3,4
range(1, 6)     # 1,2,3,4,5
range(0,10,2)   # 0,2,4,6,8  (крок 2)
range(10,0,-1)  # 10,9,...,1 (назад)
</pre>
</div>`,
          ru: `<div class="theory-block warmup">
  <h3>🔥 Найди баг!</h3>
  <pre class="bug-code">colors = ["red", "blue", "green"]
for i in range(5):          # ← проблема!
    t.fillcolor(colors[i])  # ← что при i=3?</pre>
  <p>range(5) даёт i=0,1,2,3,4 — но список имеет только 3 элемента!</p>
</div>
<div class="theory-block">
  <h3>🔁 for в рисовании</h3>
  <pre class="code-example">for i in range(6):
    t.penup()
    t.goto(-200 + i * 70, 0)   # каждый блок правее
    t.pendown()
    draw_block(60, colors[i])
</pre>
  <p>Переменная <code>i</code> — счётчик повторений (0,1,2...). Умножаем на шаг чтобы сдвигать блоки.</p>
</div>
<div class="theory-block hint">
  <h3>💡 range() с параметрами</h3>
  <pre class="code-example">range(5)        # 0,1,2,3,4
range(1, 6)     # 1,2,3,4,5
range(0,10,2)   # 0,2,4,6,8  (шаг 2)
range(10,0,-1)  # 10,9,...,1 (назад)
</pre>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй правильний шестикутник за допомогою for (кут 60°). Потім восьмикутник (кут 45°).", ru:"Нарисуй правильный шестиугольник (угол 60°) и восьмиугольник (45°) с помощью for." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй 6 кольорових блоків у ряд: <code>colors=['red','orange','yellow','green','blue','purple']</code>.", ru:"Нарисуй 6 цветных блоков в ряд: red, orange, yellow, green, blue, purple." }},
          { num:3, level:"medium", text:{ uk:"Намалюй сонях: жовте коло по центру + 12 жовтих пелюсток навколо (цикл: forward, backward, left(30)).", ru:"Нарисуй подсолнух: жёлтый круг + 12 жёлтых лепестков вокруг (цикл: forward, backward, left(30))." }},
          { num:4, level:"medium", text:{ uk:"Намалюй сходинки: 6 ступенів за допомогою for. Кожна ступінь: forward(50), left(90), forward(50), right(90).", ru:"Нарисуй лестницу: 6 ступеней с помощью for. forward(50), left(90), forward(50), right(90)." }},
          { num:5, level:"medium", text:{ uk:"Намалюй веселку: цикл з 6 кольорів ['red','orange','yellow','green','blue','violet']. Кожне наступне коло на 20 більше і трохи нижче.", ru:"Нарисуй радугу: 6 дуг разного цвета, каждая на 20 больше предыдущей." }},
          { num:6, level:"hard",   text:{ uk:"Намалюй годинникову мітку: 12 коротких ліній навколо кола рівномірно (360÷12=30°). Більша мітка на 12 і 3 і 6 і 9.", ru:"Нарисуй циферблат: 12 коротких линий вокруг круга (360÷12=30°). Длиннее на 12,3,6,9." }},
          { num:7, level:"hard",   text:{ uk:"Намалюй стіну Minecraft 3×4 блоки (3 ряди, 4 колонки). Вкладений цикл: for row in range(3): for col in range(4). Чергуй кольори.", ru:"Нарисуй стену Minecraft 3×4 блока. Вложенный цикл. Чередуй цвета." }},
          { num:8, level:"star",   text:{ uk:"⭐ Намалюй спіраль: починай з маленького квадрата (size=10), кожен наступний на 8 більше, трохи повертай (left(5)). 20 повторень.", ru:"⭐ Нарисуй спираль: квадраты увеличиваются на 8, немного поворачивают (left(5)). 20 повторений." }}
        ],
        starterCode:
`import turtle

t = turtle.Turtle()
t.speed(9)
t.width(2)
turtle.bgcolor("skyblue")

def draw_block(size, color):
    t.color("black", color)
    t.begin_fill()
    for _ in range(4):
        t.forward(size)
        t.left(90)
    t.end_fill()

# Стіна з 5 блоків
colors = ["darkgray","saddlebrown","green","darkgray","saddlebrown"]
for i in range(5):
    t.penup()
    t.goto(-200 + i * 68, -80)
    t.pendown()
    draw_block(63, colors[i])

# Зірочний візерунок
t.penup()
t.goto(0, 60)
t.pendown()
t.color("gold")
for _ in range(12):
    t.forward(60)
    t.backward(60)
    t.left(30)
`
      },

      // ── Урок 10 ────────────────────────────────────────
      {
        id: 15,
        title: { uk: "Функції — будуємо деревню", ru: "Функции — строим деревню" },
        canvasMode: true,
        theory: {
          uk: `
<div class="theory-block warmup">
  <h3>🔥 Знайди баг!</h3>
  <pre class="bug-code">colors = ["red","blue","green"]
for i in range(4):
    draw_block(60, colors[i])   # ← IndexError при i=3!</pre>
  <p>Список має 3 елементи, цикл іде 4 рази. Виправ: range(3).</p>
</div>
<div class="theory-block">
  <h3>🔨 Що таке функція?</h3>
  <p>Функція — це <strong>рецепт з назвою</strong>. Описуєш один раз — використовуєш скільки завгодно разів з різними налаштуваннями.</p>
  <pre class="code-example">def draw_house(x, y, size):
    t.penup(); t.goto(x, y); t.pendown()
    # стіни
    draw_block(size, "tan")
    # дах
    t.penup(); t.goto(x, y+size); t.pendown()
    draw_triangle(size, "firebrick")

# Викликаємо тричі!
draw_house(-200, -100, 80)
draw_house(-50,  -100, 110)
draw_house(100,  -100, 70)
</pre>
</div>
<div class="theory-block hint">
  <h3>💡 Функція може викликати іншу функцію</h3>
  <p>draw_house() → draw_block() + draw_triangle()<br>
  draw_scene() → draw_house() + draw_tree() + draw_cloud()</p>
</div>`,
          ru: `<div class="theory-block warmup">
  <h3>🔥 Найди баг!</h3>
  <pre class="bug-code">colors = ["red","blue","green"]
for i in range(4):
    draw_block(60, colors[i])   # ← IndexError при i=3!</pre>
  <p>Список имеет 3 элемента, цикл идёт 4 раза. Исправь: range(3).</p>
</div>
<div class="theory-block">
  <h3>🔨 Что такое функция?</h3>
  <p>Функция — это <strong>рецепт с именем</strong>. Описываешь один раз — используешь сколько угодно раз с разными настройками.</p>
  <pre class="code-example">def draw_house(x, y, size):
    t.penup(); t.goto(x, y); t.pendown()
    # стены
    draw_block(size, "tan")
    # крыша
    t.penup(); t.goto(x, y+size); t.pendown()
    draw_triangle(size, "firebrick")

# Вызываем трижды!
draw_house(-200, -100, 80)
draw_house(-50,  -100, 110)
draw_house(100,  -100, 70)
</pre>
</div>
<div class="theory-block hint">
  <h3>💡 Функция может вызывать другую функцию</h3>
  <p>draw_house() → draw_block() + draw_triangle()<br>
  draw_scene() → draw_house() + draw_tree() + draw_cloud()</p>
</div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Напиши функцію <code>draw_circle(x,y,r,color)</code> і намалюй три кола різного розміру та кольору.", ru:"Напиши функцию draw_circle(x,y,r,color) и нарисуй три круга разного размера и цвета." }},
          { num:2, level:"easy",   text:{ uk:"Напиши функцію <code>draw_polygon(n, size, color)</code> — малює правильний n-кутник. Виклич для трикутника, квадрата, шестикутника.", ru:"Функция draw_polygon(n, size, color) — правильный n-угольник. Вызови для 3, 4, 6 сторон." }},
          { num:3, level:"medium", text:{ uk:"Напиши <code>draw_tree(x,y)</code>: коричневий прямокутний стовбур + зелене коло-крона. Намалюй 4 дерева в різних місцях.", ru:"draw_tree(x,y): коричневый ствол + зелёная крона-круг. Нарисуй 4 дерева." }},
          { num:4, level:"medium", text:{ uk:"Напиши <code>draw_snowflake(x,y,size)</code>: 6 ліній з центру (кут 60°). З кожного кінця — дві маленькі лінії під кутом. Намалюй 3 сніжинки.", ru:"draw_snowflake(x,y,size): 6 линий + маленькие ветки с каждого конца. 3 снежинки." }},
          { num:5, level:"medium", text:{ uk:"Напиши <code>draw_cloud(x,y)</code>: 3-4 перекриваючих білих кола. Намалюй 3 хмари на небі.", ru:"draw_cloud(x,y): 3-4 перекрывающихся белых круга. 3 облака на небе." }},
          { num:6, level:"hard",   text:{ uk:"Напиши <code>draw_house(x,y,size,wall_color,roof_color,with_window)</code>. Якщо with_window=True — малюй блакитний квадрат-вікно всередині. Намалюй 3 будинки: різні кольори, деякі з вікнами.", ru:"draw_house с параметром with_window. Если True — рисуй синее окно. 3 дома с разными параметрами." }},
          { num:7, level:"hard",   text:{ uk:"Намалюй квітку: <code>draw_flower(x,y)</code> — зелений стебель, 5 пелюсток (кіл) навколо центру, жовта серединка.", ru:"draw_flower(x,y): зелёный стебель, 5 лепестков-кругов вокруг центра, жёлтая серединка." }},
          { num:8, level:"star",   text:{ uk:"⭐ Намалюй повноцінну деревню: мінімум 5 різних функцій (будинок, дерево, хмара, паркан, машина або що завгодно). Підпиши своє ім'я знизу.", ru:"⭐ Нарисуй полноценную деревню: минимум 5 разных функций. Подпиши своё имя внизу." }}
        ],
        starterCode:
`import turtle

t = turtle.Turtle()
t.speed(9)
t.width(2)
turtle.bgcolor("skyblue")

def go(x, y):
    t.penup(); t.goto(x, y); t.pendown()

def draw_block(size, color):
    t.color("black", color)
    t.begin_fill()
    for _ in range(4):
        t.forward(size)
        t.left(90)
    t.end_fill()

def draw_triangle(size, color):
    t.color("black", color)
    t.begin_fill()
    for _ in range(3):
        t.forward(size)
        t.left(120)
    t.end_fill()

def draw_circle(r, color):
    t.color("black", color)
    t.begin_fill()
    t.circle(r)
    t.end_fill()

def draw_house(x, y, size):
    go(x, y)
    draw_block(size, "tan")
    go(x, y + size)
    t.setheading(0)
    draw_triangle(size, "firebrick")

def draw_tree(x, y):
    go(x + 10, y)
    draw_block(20, "sienna")
    go(x + 10, y + 20)
    draw_circle(28, "forestgreen")

# Малюємо деревню!
draw_house(-220, -100, 90)
draw_tree(-90, -100)
draw_house(-50, -100, 110)
draw_tree(90, -100)
draw_house(130, -100, 75)

# Земля
go(-260, -105)
t.color("saddlebrown", "saddlebrown")
t.begin_fill()
for _ in range(2):
    t.forward(520); t.left(90)
    t.forward(30);  t.left(90)
t.end_fill()

# Сонце
go(190, 80)
draw_circle(35, "yellow")
`
      },

      // ── Урок 16 — random ───────────────────────────────
      {
        id: 16,
        title: { uk: "Випадкові числа і кольори", ru: "Случайные числа и цвета" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Знайди баг!</h3><pre class="bug-code">colors = ["red","blue","green"]\nfor i in range(5):\n    t.color(colors[i])  # IndexError!</pre><p>range(5) але список має 3 елементи!</p></div><div class="theory-block"><h3>🎲 Модуль random</h3><pre class="code-example">import random\nprint(random.randint(1, 10))    # ціле від 1 до 10\nprint(random.random())          # дробове 0.0..1.0\nprint(random.choice(["a","b","c"])) # випадковий елемент\n\ncolors = ["red","orange","yellow","green","blue","purple"]\nc = random.choice(colors)\nsize = random.randint(20, 100)\nt.fillcolor(c)\nt.begin_fill()\nfor _ in range(4):\n    t.forward(size); t.left(90)\nt.end_fill()</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Найди баг!</h3><pre class="bug-code">colors = ["red","blue","green"]\nfor i in range(5):\n    t.color(colors[i])  # IndexError!</pre><p>range(5) но список имеет 3 элемента!</p></div><div class="theory-block"><h3>🎲 Модуль random</h3><pre class="code-example">import random\nprint(random.randint(1, 10))    # целое от 1 до 10\nprint(random.random())          # дробное 0.0..1.0\nprint(random.choice(["a","b","c"])) # случайный элемент\n\nc = random.choice(["red","blue","green","yellow"])\nt.fillcolor(c)\nt.circle(random.randint(20, 80))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй 10 кіл у випадкових місцях екрану з random.randint().", ru:"Нарисуй 10 кругов в случайных позициях." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй 15 квадратів з випадковими кольорами з готового списку.", ru:"Нарисуй 15 квадратов со случайными цветами из списка." }},
          { num:3, level:"medium", text:{ uk:"Зоряне небо: 50+ білих точок (кіл радіусом 1-3) на чорному фоні.", ru:"Звёздное небо: 50+ белых точек на чёрном фоне." }},
          { num:4, level:"medium", text:{ uk:"Намалюй 20 різних квіток (коло-серединка + 6 пелюсток) у випадкових місцях з випадковими кольорами.", ru:"20 разных цветков в случайных позициях со случайными цветами." }},
          { num:5, level:"medium", text:{ uk:"Конфетті: 100 маленьких кіл різного кольору, розміру та позиції.", ru:"Конфетти: 100 маленьких кругов разного цвета и размера." }},
          { num:6, level:"hard",   text:{ uk:"Ліс: 15 дерев у різних місцях. Стовбур і крона — випадкові розміри та кольори зелені.", ru:"Лес: 15 деревьев в разных местах. Случайные размеры и оттенки зелёного." }},
          { num:7, level:"hard",   text:{ uk:"Дорожній рух: 10 «машин» (кольорові прямокутники) у різних місцях дороги.", ru:"Дорожное движение: 10 машин-прямоугольников на дороге." }},
          { num:8, level:"star",   text:{ uk:"⭐ Генератор планет: 8-12 кіл різного розміру та кольору з орбітами (дуги).", ru:"⭐ Генератор планет: 8-12 кругов разного размера с орбитами." }}
        ],
        starterCode:
`import turtle
import random

t = turtle.Turtle()
t.speed(0)
t.width(2)
turtle.bgcolor("black")
t.hideturtle()

colors = ["red","orange","yellow","green","cyan","blue","purple","pink","white"]

for _ in range(30):
    x = random.randint(-250, 250)
    y = random.randint(-150, 150)
    r = random.randint(10, 50)
    c = random.choice(colors)

    t.penup()
    t.goto(x, y - r)
    t.pendown()
    t.fillcolor(c)
    t.begin_fill()
    t.circle(r)
    t.end_fill()
`
      },

      // ── Урок 17 — криві та дуги ────────────────────────
      {
        id: 17,
        title: { uk: "Криві та дуги", ru: "Кривые и дуги" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🌊 t.circle() — коло або дуга</h3><pre class="code-example">t.circle(50)         # повне коло радіусом 50\nt.circle(50, 180)    # напівколо (дуга 180°)\nt.circle(50, 90)     # чверть кола\nt.circle(-50)        # коло в інший бік\n\n# Хвиля:\nfor _ in range(5):\n    t.circle(40, 180)\n    t.circle(-40, 180)</pre></div><div class="theory-block hint"><h3>💡 Кривини</h3><p>t.circle(r, angle): r = радіус, angle = кут дуги.<br>Від'ємний r — коло малюється в іншу сторону.<br>Хвиля: чергуй +r та -r.</p></div>`,
          ru: `<div class="theory-block"><h3>🌊 t.circle() — круг или дуга</h3><pre class="code-example">t.circle(50)         # полный круг радиусом 50\nt.circle(50, 180)    # полуокружность (дуга 180°)\nt.circle(50, 90)     # четверть круга\nt.circle(-50)        # круг в другую сторону\n\n# Волна:\nfor _ in range(5):\n    t.circle(40, 180)\n    t.circle(-40, 180)</pre></div><div class="theory-block hint"><h3>💡 Изгибы</h3><p>t.circle(r, angle): r = радиус, angle = угол дуги (по умолчанию 360°). Отрицательный r — в другую сторону. Дуги меньше 360° — для лепестков и волн.</p></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй три концентричних кола (різні радіуси, один центр).", ru:"Нарисуй три концентрических круга (разные радиусы, один центр)." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй хвилю з 8 дуг чередуючи t.circle(40,180) і t.circle(-40,180).", ru:"Нарисуй волну из 8 дуг: t.circle(40,180) и t.circle(-40,180)." }},
          { num:3, level:"medium", text:{ uk:"Намалюй пелюстку квітки: 2 дуги що з'єднані в точках. Повтори 8 разів (left(45°)).", ru:"Лепесток цветка: 2 дуги. Повтори 8 раз (left(45°))." }},
          { num:4, level:"medium", text:{ uk:"Намалюй смайлик: жовте коло-голова, 2 маленьких кола-очі, дуга-посмішка t.circle(40,180).", ru:"Смайлик: жёлтый круг, 2 глаза, улыбка t.circle(40,180)." }},
          { num:5, level:"medium", text:{ uk:"Намалюй хмарку: 5-6 частково накладених кіл різного радіусу.", ru:"Нарисуй облако из 5-6 частично перекрывающихся кругов." }},
          { num:6, level:"hard",   text:{ uk:"Намалюй рибку: овал-тіло (дві дуги), трикутний плавник, крапку-очко.", ru:"Нарисуй рыбку: овал-тело (две дуги), треугольный плавник, глаз-точку." }},
          { num:7, level:"hard",   text:{ uk:"Намалюй сердечко: два напівкола зверху та два прямих рядки вниз сходяться у точку.", ru:"Нарисуй сердечко: два полукруга сверху и два прямых вниз в точку." }},
          { num:8, level:"star",   text:{ uk:"⭐ Намалюй морський пейзаж: хвилясте море, хмари, сонце (дуга), чайки (дві малі дуги).", ru:"⭐ Морской пейзаж: волнистое море, облака, солнце, чайки." }}
        ],
        starterCode:
`import turtle
t = turtle.Turtle()
t.speed(6)
t.width(2)
turtle.bgcolor("lightblue")

# Хвиля
t.pencolor("blue")
t.penup(); t.goto(-250, -50); t.pendown()
for _ in range(7):
    t.circle(40, 180)
    t.circle(-40, 180)

# Пелюстки квітки
t.penup(); t.goto(0, 0); t.pendown()
t.pencolor("hotpink")
t.fillcolor("pink")
for _ in range(8):
    t.begin_fill()
    t.circle(40, 90); t.left(90); t.circle(40, 90)
    t.end_fill()
    t.left(45)

# Серцевина
t.penup(); t.goto(0, -10); t.pendown()
t.fillcolor("yellow")
t.begin_fill(); t.circle(15); t.end_fill()
`
      },

      // ── Урок 18 — спіралі ──────────────────────────────
      {
        id: 18,
        title: { uk: "Спіралі та узори", ru: "Спирали и узоры" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🌀 Спіраль = цикл + зростаючий розмір</h3><pre class="code-example"># Квадратна спіраль
size = 10
for _ in range(30):
    t.forward(size)
    t.left(91)       # 91° замість 90° — завивання!
    size += 4

# Зіркова спіраль
for i in range(200):
    t.forward(i * 0.5)
    t.left(137.5)    # золотий кут!</pre></div><div class="theory-block hint"><h3>💡 Секрет</h3><p>Поворот трохи більший або менший від «рівного» → з'являється закрутка. Спробуй 91°, 89°, 121°, 144°.</p></div>`,
          ru: `<div class="theory-block"><h3>🌀 Спираль = цикл + растущий размер</h3><pre class="code-example"># Квадратная спираль
size = 10
for _ in range(30):
    t.forward(size)
    t.left(91)       # 91° вместо 90° — закручивание!
    size += 4

# Звёздная спираль
for i in range(200):
    t.forward(i * 0.5)
    t.left(137.5)    # золотой угол!</pre></div><div class="theory-block hint"><h3>💡 Секрет</h3><p>Поворот чуть больше или меньше «ровного» → появляется закрутка. Попробуй 91°, 89°, 121°, 144°.</p></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй квадратну спіраль (size=10, крок +4, кут 91°).", ru:"Нарисуй квадратную спираль (size=10, шаг +4, угол 91°)." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй трикутну спіраль (кут 121°).", ru:"Нарисуй треугольную спираль (угол 121°)." }},
          { num:3, level:"medium", text:{ uk:"Намалюй кольорову спіраль: кожен раз змінюй колір з 6 варіантів (i % 6).", ru:"Цветная спираль: каждый раз меняй цвет из 6 вариантов (i % 6)." }},
          { num:4, level:"medium", text:{ uk:"Зоряний узор: for i in range(500): forward(i*0.5), left(137.5).", ru:"Звёздный узор: for i in range(500): forward(i*0.5), left(137.5)." }},
          { num:5, level:"medium", text:{ uk:"Намалюй 3 різні спіралі поруч: квадратну, трикутну та з кутом 144°.", ru:"Нарисуй 3 разные спирали рядом: квадратную, треугольную и 144°." }},
          { num:6, level:"hard",   text:{ uk:"Мандала: 12 однакових пелюсток навколо центру (цикл left(30) після кожної пелюстки).", ru:"Мандала: 12 одинаковых лепестков вокруг центра (left(30))." }},
          { num:7, level:"hard",   text:{ uk:"Намалюй веселку зі спіраль — кожен виток інший колір.", ru:"Радужная спираль — каждый виток другого цвета." }},
          { num:8, level:"star",   text:{ uk:"⭐ Створи свій унікальний узор — змінюй кут, розмір, кольори. Назви його!", ru:"⭐ Создай свой уникальный узор. Назови его!" }}
        ],
        starterCode:
`import turtle
t = turtle.Turtle()
t.speed(0)
t.width(2)
turtle.bgcolor("black")
t.hideturtle()

colors = ["red","orange","yellow","green","cyan","blue","purple","pink"]

# Кольорова квадратна спіраль
size = 5
for i in range(60):
    t.pencolor(colors[i % len(colors)])
    t.forward(size)
    t.left(91)
    size += 3

# Зоряна спіраль (розкоментуй!)
# t.clear()
# t.penup(); t.goto(0,0); t.pendown()
# for i in range(300):
#     t.pencolor(colors[i % len(colors)])
#     t.forward(i * 0.5)
#     t.left(137.5)
`
      },

      // ── Урок 19 — написи ───────────────────────────────
      {
        id: 19,
        title: { uk: "Написи на малюнку", ru: "Надписи на рисунке" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>✍️ t.write() — текст черепашкою</h3><pre class="code-example">t.goto(-100, 50)\nt.write("Привіт, Minecraft!",\n        font=("Arial", 20, "bold"))\n\n# Параметри шрифту: (назва, розмір, стиль)\n# Стилі: "normal", "bold", "italic", "bold italic"\n\nt.write("Рівень 10",\n        align="center",\n        font=("Courier", 14, "bold italic"))</pre></div>`,
          ru: `<div class="theory-block"><h3>✍️ t.write() — текст черепашкой</h3><pre class="code-example">t.goto(-100, 50)\nt.write("Привет, Minecraft!",\n        font=("Arial", 20, "bold"))\n\n# Параметры шрифта: (название, размер, стиль)\n# Стили: "normal", "bold", "italic", "bold italic"\n\nt.write("Уровень 10",\n        align="center",\n        font=("Courier", 14, "bold italic"))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Напиши своє ім'я великим жирним шрифтом у центрі.", ru:"Напиши своё имя большим жирным шрифтом в центре." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй 3 квадрати різного кольору і підпиши кожен його кольором.", ru:"Нарисуй 3 квадрата и подпиши каждый его цветом." }},
          { num:3, level:"medium", text:{ uk:"Красивий заголовок: великий текст + кольорова рамка навколо нього.", ru:"Красивый заголовок: большой текст + цветная рамка вокруг." }},
          { num:4, level:"medium", text:{ uk:"Підпиши кожне коло з 5 кіл: 'Планета 1', 'Планета 2'... різними кольорами.", ru:"Подпиши каждый из 5 кругов: 'Планета 1', 'Планета 2'..." }},
          { num:5, level:"medium", text:{ uk:"Постер: заголовок вгорі, малюнок по центру (будиночок або дерево), автор знизу.", ru:"Постер: заголовок сверху, рисунок в центре, автор снизу." }},
          { num:6, level:"hard",   text:{ uk:"Годинникова шкала: цифри 12,3,6,9 по колу (t.circle великого радіусу + goto для кожної цифри).", ru:"Циферблат: цифры 12,3,6,9 по кругу." }},
          { num:7, level:"hard",   text:{ uk:"Картка персонажа з Turtle: рамка + портрет (кола) + написи HP, ATK, DEF.", ru:"Карточка персонажа: рамка + портрет + надписи HP, ATK, DEF." }},
          { num:8, level:"star",   text:{ uk:"⭐ Свій плакат або комікс: 3+ панелей з написами та малюнками.", ru:"⭐ Свой плакат или комикс: 3+ панелей с рисунками и надписями." }}
        ],
        starterCode:
`import turtle
t = turtle.Turtle()
t.speed(6)
t.width(2)
turtle.bgcolor("lightblue")

# Заголовок
t.penup(); t.goto(0, 100); t.pendown()
t.pencolor("darkblue")
t.write("🐢 МОЯ АКАДЕМІЯ", align="center",
        font=("Arial", 22, "bold"))

# Декоративна рамка
t.pencolor("green")
t.width(3)
t.penup(); t.goto(-200, -130); t.pendown()
for length in [400, 240, 400, 240]:
    t.forward(length); t.left(90)

# Будиночок
t.pencolor("saddlebrown")
t.fillcolor("tan")
t.penup(); t.goto(-60, -80); t.pendown()
t.width(2)
t.begin_fill()
for _ in range(4): t.forward(120); t.left(90)
t.end_fill()

# Підпис
t.penup(); t.goto(0, -110); t.pendown()
t.pencolor("darkred")
t.write("Мій будиночок", align="center",
        font=("Arial", 12, "italic"))
`
      },

      // ── Урок 20 — міні-проект ──────────────────────────
      {
        id: 20,
        title: { uk: "Проект: Моя картина", ru: "Проект: Моя картина" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Перегляд модуля</h3><p>За 10 уроків ти вивчив:</p><ul><li>Рух і кольори черепашки</li><li>Змінні, цикли, функції в малюванні</li><li>Випадкові числа</li><li>Криві та дуги</li><li>Спіралі та узори</li><li>Написи</li></ul><p>Сьогодні — вільна творчість!</p></div><div class="theory-block hint"><h3>💡 Поради для проекту</h3><p>1. Спочатку намалюй на папері скетч<br>2. Розбий малюнок на функції<br>3. Починай з великих форм → деталі<br>4. Додай написи та підпис автора</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Обзор модуля</h3><p>За 10 уроков ты изучил:</p><ul><li>Движение и цвета черепашки</li><li>Переменные, циклы, функции в рисовании</li><li>Случайные числа</li><li>Кривые и дуги</li><li>Спирали и узоры</li><li>Надписи</li></ul><p>Сегодня — свободное творчество!</p></div><div class="theory-block hint"><h3>💡 Советы для проекта</h3><p>1. Сначала нарисуй скетч на бумаге<br>2. Раздели рисунок на функции<br>3. Начинай с крупных форм → детали<br>4. Добавь надписи и подпись автора</p></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй сцену «Ранок у Minecraft»: небо, сонце, трава, 2-3 дерева.", ru:"Сцена «Утро в Minecraft»: небо, солнце, трава, 2-3 дерева." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй автопортрет черепашкою: голова, очі, ніс, рот, волосся.", ru:"Нарисуй автопортрет черепашкой." }},
          { num:3, level:"medium", text:{ uk:"Намалюй космічну сцену: зірки (random), планети, ракету, написи.", ru:"Космическая сцена: звёзды (random), планеты, ракета, надписи." }},
          { num:4, level:"medium", text:{ uk:"Намалюй узор у стилі мандали: симетричні пелюстки навколо центру.", ru:"Мандала: симметричные лепестки вокруг центра." }},
          { num:5, level:"medium", text:{ uk:"Намалюй карту скарбів: море, острів, Х-мітка, підписи.", ru:"Карта сокровищ: море, остров, отметка X, надписи." }},
          { num:6, level:"hard",   text:{ uk:"Намалюй пейзаж з горами, ріками, деревами — використай функції.", ru:"Пейзаж с горами, реками, деревьями — используй функции." }},
          { num:7, level:"hard",   text:{ uk:"Намалюй персонажа з Roblox або Minecraft у повний зріст.", ru:"Персонаж Roblox или Minecraft в полный рост." }},
          { num:8, level:"star",   text:{ uk:"⭐ Вільна тема! Намалюй щось своє — дивуй клас! Підпиши своє ім'я.", ru:"⭐ Свободная тема! Удиви класс! Подпиши имя." }}
        ],
        starterCode:
`import turtle
import random

t = turtle.Turtle()
t.speed(0)
t.width(2)
turtle.bgcolor("skyblue")
t.hideturtle()

def go(x, y): t.penup(); t.goto(x, y); t.pendown()
def rect(w, h, c): t.color("black",c); t.begin_fill(); [t.forward(w) or t.left(90) if _ % 2 == 0 else t.forward(h) or t.left(90) for _ in range(4)]; t.end_fill()
def circle(r, c): t.color("black",c); t.begin_fill(); t.circle(r); t.end_fill()

# Трава
go(-300, -150)
rect(600, 100, "green")

# Сонце
go(200, 100)
circle(45, "yellow")

# Дерева
for x in [-200, -50, 100]:
    go(x, -150); rect(20, 60, "saddlebrown")
    go(x - 20, -90); circle(40, "forestgreen")

# Підпис
t.pencolor("navy")
go(0, -200)
t.write("Моя картина", align="center", font=("Arial", 16, "bold"))
`
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  МОДУЛЬ 3 — Анімація та Взаємодія (уроки 21-35)
  // ══════════════════════════════════════════════════════════
  {
    moduleId: 3,
    moduleTitle: { uk: "Анімація та Взаємодія", ru: "Анимация и Взаимодействие" },
    moduleIcon: "🎮",
    lessons: [

      {
        id: 21,
        title: { uk: "Анімація: tracer та update", ru: "Анимация: tracer и update" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>⚡ Швидка анімація</h3><pre class="code-example">turtle.tracer(0)  # вимкнути автоматичне оновлення
# ... рухаємо черепашок ...
turtle.update()   # оновити екран (показати кадр)

# Ігровий цикл:
while True:
    turtle.tracer(0)
    # оновлюємо позиції
    turtle.update()
</pre></div>`,
          ru: `<div class="theory-block"><h3>⚡ Быстрая анимация</h3><pre class="code-example">turtle.tracer(0)  # выключить автоматическое обновление
# ... двигаем черепашек ...
turtle.update()   # обновить экран (показать кадр)

# Игровой цикл:
while True:
    turtle.tracer(0)
    # обновляем позиции
    turtle.update()
</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Зроби щоб квадрат повільно рухався вправо (x += 2 в циклі).", ru:"Квадрат медленно движется вправо (x += 2 в цикле)." }},
          { num:2, level:"easy",   text:{ uk:"Намалюй кулю що відскакує від стін (dx, dy, перевірка меж).", ru:"Шар отскакивает от стен (dx, dy, проверка границ)." }},
          { num:3, level:"medium", text:{ uk:"Пульсуюче коло: розмір збільшується від 10 до 80 і назад.", ru:"Пульсирующий круг: размер растёт от 10 до 80 и обратно." }},
          { num:4, level:"medium", text:{ uk:"5 кіл рухаються в різних напрямках одночасно.", ru:"5 кругов движутся в разных направлениях одновременно." }},
          { num:5, level:"medium", text:{ uk:"Таймер на екрані: відображай секунди що пройшли.", ru:"Таймер на экране: отображай прошедшие секунды." }},
          { num:6, level:"hard",   text:{ uk:"Сонячна система: планета обертається навколо сонця по колу.", ru:"Солнечная система: планета вращается вокруг солнца." }},
          { num:7, level:"hard",   text:{ uk:"Змійка: 5 кіл рухаються один за одним (кожне запам'ятовує де було попереднє).", ru:"Змейка: 5 кругов движутся друг за другом." }},
          { num:8, level:"star",   text:{ uk:"⭐ Феєрверк: з центру вилітають 20+ кольорових кіл в різні боки і зникають.", ru:"⭐ Фейерверк: из центра летят 20+ цветных кругов и исчезают." }}
        ],
        starterCode:
`import turtle

t = turtle.Turtle()
t.shape("circle")
t.color("dodgerblue")
t.width(3)
turtle.bgcolor("black")
turtle.tracer(0)

x, y  = -250, 0
dx, dy = 3, 2

def animate():
    global x, y, dx, dy
    t.clear()
    t.penup(); t.goto(x, y); t.pendown()
    t.dot(30, "dodgerblue")
    x += dx; y += dy
    if x > 260 or x < -260: dx = -dx
    if y > 145 or y < -145: dy = -dy
    turtle.update()
    turtle.ontimer(animate, 16)

animate()
`
      },

      {
        id: 22,
        title: { uk: "Клавіатурне керування", ru: "Управление клавиатурой" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>⌨️ onkey() та listen()</h3><pre class="code-example">def move_up():
    y = player.ycor()
    player.sety(y + 10)

def move_left():
    x = player.xcor()
    player.setx(x - 10)

turtle.listen()                   # слухати клавіші
turtle.onkey(move_up,    "Up")    # стрілка вгору
turtle.onkey(move_left,  "Left")
turtle.onkey(move_up,    "w")     # або 'w'

turtle.mainloop()   # тримати вікно відкритим</pre></div>`,
          ru: `<div class="theory-block"><h3>⌨️ onkey() и listen()</h3><pre class="code-example">def move_up():
    y = player.ycor()
    player.sety(y + 10)

def move_left():
    x = player.xcor()
    player.setx(x - 10)

turtle.listen()                   # слушать клавиши
turtle.onkey(move_up,    "Up")    # стрелка вверх
turtle.onkey(move_left,  "Left")
turtle.onkey(move_up,    "w")     # или 'w'

turtle.mainloop()   # держать окно открытым</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Керуй черепашкою стрілками. Вона рухається у 4 напрямки.", ru:"Управляй черепашкой стрелками в 4 направления." }},
          { num:2, level:"easy",   text:{ uk:"Додай клавішу пробіл — черепашка повертається на 180°.", ru:"Пробел — черепашка разворачивается на 180°." }},
          { num:3, level:"medium", text:{ uk:"Гравець не виходить за межі -250..250 по X та -150..150 по Y.", ru:"Игрок не выходит за границы -250..250 по X и -150..150 по Y." }},
          { num:4, level:"medium", text:{ uk:"Гравець залишає слід. Клавіша 'c' очищає екран.", ru:"Игрок оставляет след. Клавиша 'c' очищает экран." }},
          { num:5, level:"medium", text:{ uk:"Намалюй лабіринт із стін (список прямокутників). Гравець рухається не виходячи за стіни.", ru:"Нарисуй лабиринт. Игрок не выходит за стены." }},
          { num:6, level:"hard",   text:{ uk:"Гравець збирає монети (кола) клавішами. При доторканні монета зникає, рахунок зростає.", ru:"Игрок собирает монеты. При касании монета исчезает, счёт растёт." }},
          { num:7, level:"hard",   text:{ uk:"Гравець стріляє (пробіл): куля летить у бік де стоїть гравець.", ru:"Игрок стреляет (пробел): пуля летит вперёд." }},
          { num:8, level:"star",   text:{ uk:"⭐ Мінімальна гра: гравець (↑↓←→) + 5 монет для збору + таймер + рахунок.", ru:"⭐ Мини-игра: игрок (↑↓←→) + 5 монет + таймер + счёт." }}
        ],
        starterCode:
`import turtle
turtle.bgcolor("black")
turtle.tracer(0)

player = turtle.Turtle()
player.shape("square")
player.color("lime")
player.penup()
player.speed(0)

score_display = turtle.Turtle()
score_display.hideturtle()
score_display.penup()
score_display.color("white")
score_display.goto(0, 160)
score_display.write("Рахунок: 0", align="center",
                    font=("Arial", 14, "bold"))

score = [0]

def move_up():    player.sety(min(160, player.ycor() + 15))
def move_down():  player.sety(max(-160, player.ycor() - 15))
def move_right(): player.setx(min(260, player.xcor() + 15))
def move_left():  player.setx(max(-260, player.xcor() - 15))

turtle.listen()
turtle.onkey(move_up,    "Up")
turtle.onkey(move_down,  "Down")
turtle.onkey(move_right, "Right")
turtle.onkey(move_left,  "Left")

def game_loop():
    turtle.tracer(0)
    turtle.update()
    turtle.ontimer(game_loop, 16)

game_loop()
`
      },
// ── Урок 23 — Падаючі предмети ─────────────────────
      {
        id: 23,
        title: { uk: "Падаючі предмети", ru: "Падающие предметы" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Чому при видаленні елементів зі списку ітеруємось по копії <code>items[:]</code>?<br>Якщо видаляти з оригіналу під час ітерації — пропускаємо елементи!</p></div><div class="theory-block"><h3>🌧️ Як зробити «дощ» з предметів</h3><pre class="code-example">items = []

def spawn_item():
    s = turtle.Turtle()
    s.penup()
    s.goto(random.randint(-250, 250), 210)
    items.append(s)

for item in items[:]:          # копія списку!
    item.sety(item.ycor() - 4) # рух вниз
    if item.ycor() < -220:
        item.hideturtle()
        items.remove(item)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Почему при удалении из списка итерируемся по копии <code>items[:]</code>?<br>При удалении из оригинала во время итерации — пропускаем элементы!</p></div><div class="theory-block"><h3>🌧️ «Дождь» из предметов</h3><pre class="code-example">items = []

def spawn_item():
    s = turtle.Turtle()
    s.penup()
    s.goto(random.randint(-250, 250), 210)
    items.append(s)

for item in items[:]:
    item.sety(item.ycor()-4)
    if item.ycor() < -220:
        item.hideturtle()
        items.remove(item)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Один предмет (коло) падає зверху вниз і телепортується знову нагору.", ru:"⭐ Один круг падает и телепортируется обратно." }},
          { num:2, level:"easy",   text:{ uk:"⭐ 5 предметів падають одночасно з різних початкових позицій.", ru:"⭐ 5 предметов падают из разных позиций." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Нові предмети з'являються кожні 40 кадрів через spawn_item().", ru:"⭐⭐ Новые предметы каждые 40 кадров через spawn_item()." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Різні кольори і швидкості: speed = random.randint(2,7).", ru:"⭐⭐ Разные цвета и скорости: speed = random.randint(2,7)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Предмети що впали залишають «калюжу» — маленьке коло внизу.", ru:"⭐⭐ Упавшие предметы оставляют след (маленький круг)." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Кошик ←→ + рахунок. Бомби (червоні) = -5 балів якщо зловив.", ru:"⭐⭐⭐ Корзина ←→ + счёт. Бомбы (красные) = -5 очков если поймал." }},
          { num:7, level:"hard",   text:{ uk:"⭐⭐⭐ Рівні: кожні 50 балів предмети падають швидше.", ru:"⭐⭐⭐ Уровни: каждые 50 очков быстрее." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повна гра: кошик + предмети + бомби + рахунок + рівні + GameOver.", ru:"⭐⭐⭐⭐ Полная игра: корзина + предметы + бомбы + счёт + уровни + GameOver." }}
        ],
        starterCode: `import turtle, random
turtle.bgcolor("black"); turtle.tracer(0)

catcher = turtle.Turtle()
catcher.shape("square"); catcher.color("lime")
catcher.shapesize(1, 4, 1); catcher.penup(); catcher.goto(0, -150)

items = []; score = 0; frame_count = 0

score_t = turtle.Turtle()
score_t.hideturtle(); score_t.penup()
score_t.color("white"); score_t.goto(0, 160)
score_t.write("Рахунок: 0", align="center", font=("Arial", 14, "bold"))

def spawn_item():
    s = turtle.Turtle()
    s.shape("circle")
    s.color(random.choice(["gold", "yellow", "orange", "cyan"]))
    s.penup(); s.goto(random.randint(-250, 250), 210)
    items.append(s)

def move_left():  catcher.setx(max(-220, catcher.xcor() - 20))
def move_right(): catcher.setx(min(220, catcher.xcor() + 20))
turtle.listen()
turtle.onkey(move_left, "Left"); turtle.onkey(move_right, "Right")

def game_loop():
    global score, frame_count
    frame_count += 1
    if frame_count % 40 == 0: spawn_item()
    for item in items[:]:
        item.sety(item.ycor() - 4)
        if abs(item.xcor()-catcher.xcor())<50 and abs(item.ycor()-catcher.ycor())<20:
            item.hideturtle(); items.remove(item); score += 10
            score_t.clear()
            score_t.write(f"Рахунок: {score}", align="center", font=("Arial",14,"bold"))
        elif item.ycor() < -220:
            item.hideturtle(); items.remove(item)
    turtle.tracer(0); turtle.update(); turtle.ontimer(game_loop, 16)

game_loop(); turtle.mainloop()
`
      },

      // ── Урок 24 — Коллізії та рахунок ──────────────────
      {
        id: 24,
        title: { uk: "Коллізії та рахунок", ru: "Коллизии и счёт" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Теорема Піфагора!</h3><pre class="code-example">import math
d = math.sqrt((x2-x1)**2 + (y2-y1)**2)
# або:
d = ((x2-x1)**2 + (y2-y1)**2) ** 0.5
# Якщо d < 25 → зіткнення!</pre></div><div class="theory-block"><h3>💥 Коллізії в грі</h3><pre class="code-example">def dist(a, b):
    return ((a.xcor()-b.xcor())**2 +
            (a.ycor()-b.ycor())**2) ** 0.5

# Збір монети:
if dist(player, coin) < 22:
    score += 10
    coin.goto(random.randint(-200,200),
              random.randint(-150,150))

# Зіткнення з ворогом:
if dist(player, enemy) < 25:
    health -= 1</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Теорема Пифагора!</h3><pre class="code-example">d = ((x2-x1)**2 + (y2-y1)**2) ** 0.5
# Если d < 25 — столкновение!</pre></div><div class="theory-block"><h3>💥 Коллизии в игре</h3><pre class="code-example">def dist(a, b):
    return ((a.xcor()-b.xcor())**2 +
            (a.ycor()-b.ycor())**2) ** 0.5

if dist(player, coin) < 22:
    score += 10   # подобрали монету

if dist(player, enemy) < 25:
    health -= 1   # столкновение с врагом</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Напиши функцію dist(a,b). Виводь відстань між двома черепашками кожен кадр.", ru:"⭐ Напиши функцию dist(a,b). Выводи расстояние каждый кадр." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Гравець збирає одну монету. Після збору монета телепортується в нове місце.", ru:"⭐ Игрок собирает монету. После сбора монета телепортируется." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ 5 монет на екрані. Рахунок +10 за кожну. Зібрані монети зникають.", ru:"⭐⭐ 5 монет на экране. +10 за каждую. Собранные исчезают." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Ворог рухається автоматично. При зіткненні — -1 здоров'я.", ru:"⭐⭐ Враг движется автоматически. При столкновении — -1 жизнь." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ HUD: відображай рахунок і здоров'я «❤️❤️❤️» або «❤️❤️🖤».", ru:"⭐⭐ HUD: счёт и здоровье «❤️❤️❤️» или «❤️❤️🖤»." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ 5 монет + 3 вороги. Після всіх монет ворог прискорюється.", ru:"⭐⭐⭐ 5 монет + 3 врага. После всех монет враги ускоряются." }},
          { num:7, level:"hard",   text:{ uk:"⭐⭐⭐ Монети зникають через 5 секунд якщо не зібрані.", ru:"⭐⭐⭐ Монеты исчезают через 5 секунд если не собраны." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повна гра: гравець + монети + вороги + рахунок + здоров'я + GameOver.", ru:"⭐⭐⭐⭐ Полная игра: игрок + монеты + враги + счёт + здоровье + GameOver." }}
        ],
        starterCode: `import turtle, random

def dist(a, b):
    return ((a.xcor()-b.xcor())**2 + (a.ycor()-b.ycor())**2) ** 0.5

turtle.bgcolor("black"); turtle.tracer(0)

player = turtle.Turtle()
player.shape("turtle"); player.color("lime"); player.penup()

coin = turtle.Turtle()
coin.shape("circle"); coin.color("gold"); coin.penup()
coin.goto(random.randint(-200,200), random.randint(-150,150))

enemy = turtle.Turtle()
enemy.shape("square"); enemy.color("red"); enemy.penup()
enemy.goto(100, 100); enemy.dx = 2; enemy.dy = 1

score = 0; health = 3

score_t = turtle.Turtle()
score_t.hideturtle(); score_t.penup()
score_t.color("white"); score_t.goto(0, 160)

def update_hud():
    score_t.clear()
    score_t.write(f"Рахунок: {score}  Здоровя: {health}", align="center", font=("Arial",13,"bold"))

def up():    player.sety(min(160, player.ycor()+12))
def down():  player.sety(max(-160, player.ycor()-12))
def right(): player.setx(min(260, player.xcor()+12))
def left():  player.setx(max(-260, player.xcor()-12))
turtle.listen()
turtle.onkey(up,"Up"); turtle.onkey(down,"Down")
turtle.onkey(right,"Right"); turtle.onkey(left,"Left")

cooldown = [0]; update_hud()

def game_loop():
    global score, health
    enemy.setx(enemy.xcor()+enemy.dx); enemy.sety(enemy.ycor()+enemy.dy)
    if abs(enemy.xcor())>260: enemy.dx *= -1
    if abs(enemy.ycor())>160: enemy.dy *= -1
    if dist(player, coin) < 22:
        score += 10
        coin.goto(random.randint(-200,200), random.randint(-150,150))
        update_hud()
    if dist(player, enemy) < 25 and cooldown[0] <= 0:
        health -= 1; cooldown[0] = 60; update_hud()
        if health <= 0:
            t = turtle.Turtle(); t.hideturtle(); t.penup()
            t.color("red"); t.goto(0,0)
            t.write("GAME OVER", align="center", font=("Arial",36,"bold"))
            return
    if cooldown[0] > 0: cooldown[0] -= 1
    turtle.tracer(0); turtle.update(); turtle.ontimer(game_loop,16)

game_loop(); turtle.mainloop()
`
      },

      // ── Урок 25 — Проект: Зіркова ловля ─────────────────
      {
        id: 25,
        title: { uk: "Проект: Гра «Зіркова ловля»", ru: "Проект: Игра «Звёздный улов»" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Огляд Модуля 3</h3><ul><li>Урок 21: tracer(0) + update() + ігровий цикл</li><li>Урок 22: onkey() + listen() + клавіатура</li><li>Урок 23: список об'єктів + spawn + рух</li><li>Урок 24: dist(a,b) + коллізії + рахунок</li></ul><p>Сьогодні збираємо все разом у повну гру!</p></div><div class="theory-block"><h3>⭐ Зіркова ловля — механіки</h3><ul><li>Кошик рухається ← →</li><li>Зірки падають зверху (spawn)</li><li>Зловив → +10 балів</li><li>Пропустив → -1 життя</li><li>Кожні 50 балів — рівень і швидкість ↑</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Обзор Модуля 3</h3><ul><li>Урок 21: tracer + update + игровой цикл</li><li>Урок 22: onkey + listen + клавиатура</li><li>Урок 23: список объектов + spawn</li><li>Урок 24: dist() + коллизии + счёт</li></ul><p>Сегодня собираем всё в полную игру!</p></div><div class="theory-block"><h3>⭐ Звёздный улов — механики</h3><ul><li>Корзина движется ← →</li><li>Звёзды падают сверху</li><li>Поймал → +10 очков</li><li>Пропустил → -1 жизнь</li><li>Каждые 50 очков — уровень и скорость ↑</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Запусти стартовий код. Зіграй 1 хвилину — чи все працює?", ru:"⭐ Запусти код. Поиграй 1 минуту — всё работает?" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зміни колір кошика і зірок. Зміни фон на свій.", ru:"⭐ Измени цвет корзины и звёзд. Измени фон." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай «бомби» (червоні кола): якщо зловив — -5 балів.", ru:"⭐⭐ Добавь «бомбы» (красные): поймал — -5 очков." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ HUD: виводь рахунок, рівень і серця «❤️❤️❤️».", ru:"⭐⭐ HUD: счёт, уровень и сердечки «❤️❤️❤️»." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай екран 'Game Over' коли кінчаються життя.", ru:"⭐⭐ Добавь экран Game Over когда кончаются жизни." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Бонусна зірка (блискуча): дає +50 балів, падає рідко.", ru:"⭐⭐⭐ Бонусная звезда: +50 очков, падает редко." }},
          { num:7, level:"hard",   text:{ uk:"⭐⭐⭐ Пауза (пробіл): гра зупиняється і продовжується.", ru:"⭐⭐⭐ Пауза (пробел): игра останавливается и продолжается." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Власна версія: інша тема (фрукти, монети, астероїди), свої механіки.", ru:"⭐⭐⭐⭐ Собственная версия: другая тема, свои цвета и механики." }}
        ],
        starterCode: `import turtle, random
turtle.bgcolor("midnightblue"); turtle.tracer(0)

basket = turtle.Turtle()
basket.shape("square"); basket.color("lime")
basket.shapesize(1, 5, 1); basket.penup(); basket.goto(0, -160)

stars = []; score = 0; lives = 3; level = 1; speed = 3; frame_n = 0

hud = turtle.Turtle()
hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0, 165)

def update_hud():
    hud.clear()
    hud.write(f"Рахунок: {score}  Рівень: {level}  Життя: {lives}",
              align="center", font=("Arial", 13, "bold"))

def spawn_star():
    s = turtle.Turtle()
    s.shape("circle"); s.color("gold"); s.penup()
    s.goto(random.randint(-260, 260), 210)
    stars.append(s)

def move_left():  basket.setx(max(-230, basket.xcor()-20))
def move_right(): basket.setx(min(230, basket.xcor()+20))
turtle.listen()
turtle.onkey(move_left,"Left"); turtle.onkey(move_right,"Right")

update_hud()

def loop():
    global score, lives, level, speed, frame_n
    frame_n += 1
    if frame_n % max(20, 60-level*5) == 0: spawn_star()
    for s in stars[:]:
        s.sety(s.ycor() - speed)
        if abs(s.xcor()-basket.xcor())<50 and abs(s.ycor()-basket.ycor())<20:
            s.hideturtle(); stars.remove(s); score += 10; update_hud()
        elif s.ycor() < -220:
            s.hideturtle(); stars.remove(s); lives -= 1; update_hud()
    if score >= level * 50: level += 1; speed += 0.5
    if lives <= 0:
        over = turtle.Turtle(); over.hideturtle(); over.penup()
        over.color("red"); over.goto(0,0)
        over.write("GAME OVER", align="center", font=("Arial",40,"bold"))
        return
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop(); turtle.mainloop()
`
      },

      // ── Урок 30 — миша: onscreenclick ──────────────────
      {
        id: 26,
        title: { uk: "Реакція на мишу", ru: "Реакция на мышь" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Що виведе код?</h3><pre class="bug-code">def go(x, y):\n    t.penup(); t.goto(x, y); t.pendown()\n\ngo(100, 50)\ngo(-50, -80)</pre><p>Черепашка перейде до (100,50) потім до (-50,-80) без ліній.</p></div><div class="theory-block"><h3>🖱️ Клік миші → дія</h3><pre class="code-example"># turtle.onscreenclick(функція)
# функція отримує x, y координати кліку

def on_click(x, y):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.dot(20, "red")

turtle.onscreenclick(on_click)
turtle.listen()
turtle.mainloop()</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Что выведет код?</h3><pre class="bug-code">def go(x, y):\n    t.penup(); t.goto(x, y); t.pendown()\n\ngo(100, 50)\ngo(-50, -80)</pre><p>Черепашка перейдёт к (100,50) затем к (-50,-80) без линий.</p></div><div class="theory-block"><h3>🖱️ Клик мыши → действие</h3><pre class="code-example"># turtle.onscreenclick(функция)
# функция получает x, y координаты клика

def on_click(x, y):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.dot(20, "red")

turtle.onscreenclick(on_click)
turtle.listen()
turtle.mainloop()</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Клік — черепашка переміщується туди і залишає крапку.", ru:"Клик — черепашка перемещается и ставит точку." }},
          { num:2, level:"easy",   text:{ uk:"Клік лівою кнопкою — червона крапка, правою — синя крапка.", ru:"Левый клик — красная точка, правый — синяя." }},
          { num:3, level:"medium", text:{ uk:"Малювалка: при кліку черепашка малює лінію до нової точки.", ru:"Рисовалка: при клике черепашка рисует линию к новой точке." }},
          { num:4, level:"medium", text:{ uk:"Клік — з'являється квітка (6 пелюсток) де клікнули.", ru:"Клик — появляется цветок где кликнули." }},
          { num:5, level:"medium", text:{ uk:"Рахунок: кожен клік +1. Виводь рахунок на екрані.", ru:"Счётчик кликов: каждый клик +1. Выводи на экране." }},
          { num:6, level:"hard",   text:{ uk:"«Кольоровий дощ»: клік → з неба падає кольорова крапля до точки кліку.", ru:"«Цветной дождь»: клик → с неба падает цветная капля." }},
          { num:7, level:"hard",   text:{ uk:"Клікни на коло (монету) — вона зникає і з'являється нова в іншому місці. Рахунок.", ru:"Кликни на монету — она исчезает и появляется в другом месте." }},
          { num:8, level:"star",   text:{ uk:"⭐ Гра «Влучи в ціль»: з'являються рандомні кола. Клікни по ним до того як зникнуть (таймер). Рахунок.", ru:"⭐ «Попади в цель»: круги появляются и исчезают через 2 сек. Кликни вовремя." }}
        ],
        starterCode:
`import turtle
import random

t = turtle.Turtle()
t.speed(0)
t.width(2)
turtle.bgcolor("black")
t.hideturtle()

score = 0
score_t = turtle.Turtle()
score_t.hideturtle()
score_t.penup()
score_t.color("white")
score_t.goto(0, 160)
score_t.write("Кліків: 0", align="center", font=("Arial", 14, "bold"))

colors = ["red","orange","yellow","green","cyan","blue","purple","pink"]

def on_click(x, y):
    global score
    score += 1
    c = random.choice(colors)
    t.penup(); t.goto(x, y); t.pendown()
    t.fillcolor(c)
    t.begin_fill()
    t.circle(20)
    t.end_fill()
    score_t.clear()
    score_t.write(f"Кліків: {score}", align="center",
                  font=("Arial", 14, "bold"))

turtle.onscreenclick(on_click)
turtle.listen()
`
      },

      // ── Урок 31 — малювання мишею ──────────────────────
      {
        id: 27,
        title: { uk: "Малювалка мишею", ru: "Рисовалка мышью" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🎨 ondrag() — малюємо тягнучи мишу</h3><pre class="code-example">t = turtle.Turtle()
t.shape("circle")
t.color("red")

def drag(x, y):
    t.pendown()
    t.goto(x, y)

t.ondrag(drag)        # при перетягуванні
# turtle.onscreenclick — клік без перетягування

turtle.mainloop()</pre></div><div class="theory-block hint"><h3>💡 Підказка</h3><p>ondrag прив'язується до конкретної черепашки.<br>onscreenclick — до всього полотна.<br>Комбінуй для різних інструментів!</p></div>`,
          ru: `<div class="theory-block"><h3>🎨 ondrag() — рисуем перетаскивая мышь</h3><pre class="code-example">t = turtle.Turtle()
t.shape("circle")
t.color("red")

def drag(x, y):
    t.pendown()
    t.goto(x, y)

t.ondrag(drag)        # при перетаскивании
# turtle.onscreenclick — клик без перетаскивания

turtle.mainloop()</pre></div><div class="theory-block hint"><h3>💡 Подсказка</h3><p>ondrag привязывается к конкретной черепашке.<br>onscreenclick — ко всему полотну.<br>Комбинируй для разных инструментов!</p></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй малювалку: тягни мишу — лінія слідує за курсором.", ru:"Рисовалка: тяни мышь — линия следует за курсором." }},
          { num:2, level:"easy",   text:{ uk:"Клавіша 'r' — змінює колір на червоний, 'g' — зелений, 'b' — синій.", ru:"Клавиши r/g/b меняют цвет карандаша." }},
          { num:3, level:"medium", text:{ uk:"Клавіша '+' — товщий олівець, '-' — тонший (width += 1).", ru:"Клавиши +/- меняют толщину карандаша." }},
          { num:4, level:"medium", text:{ uk:"Кнопка 'c' — очистити екран (t.clear()).", ru:"Клавиша 'c' очищает экран." }},
          { num:5, level:"medium", text:{ uk:"5 кольорових кнопок на екрані (написи). При кліку на кнопку — змінити колір.", ru:"5 цветных кнопок на экране. Клик на кнопку — смена цвета." }},
          { num:6, level:"hard",   text:{ uk:"Режими: олівець (лінія), штамп (коло при кліку), гумка (білий колір).", ru:"Режимы: карандаш, штамп (круг по клику), ластик." }},
          { num:7, level:"hard",   text:{ uk:"Зберегти малюнок: при натисканні 's' — зробити скріншот (turtle.getscreen().getcanvas().postscript()).", ru:"Сохранение: при 's' сделать скриншот холста." }},
          { num:8, level:"star",   text:{ uk:"⭐ Повноцінна малювалка: кольори, товщина, гумка, очистити, режими — все з кнопками.", ru:"⭐ Полная рисовалка: цвета, толщина, ластик, очистить, режимы." }}
        ],
        starterCode:
`import turtle

screen = turtle.Screen()
screen.bgcolor("white")
screen.title("🎨 Малювалка")

t = turtle.Turtle()
t.speed(0)
t.width(3)
t.color("black")
t.penup()

current_color = ["black"]
current_width = [3]

def drag(x, y):
    t.pendown()
    t.goto(x, y)

def click(x, y):
    t.penup()
    t.goto(x, y)

def set_red():    t.color("red");    current_color[0] = "red"
def set_green():  t.color("green");  current_color[0] = "green"
def set_blue():   t.color("blue");   current_color[0] = "blue"
def set_black():  t.color("black");  current_color[0] = "black"
def clear_all():  t.clear(); t.penup()
def wider():      current_width[0] = min(20, current_width[0]+1); t.width(current_width[0])
def thinner():    current_width[0] = max(1, current_width[0]-1); t.width(current_width[0])

t.ondrag(drag)
turtle.onscreenclick(click)
turtle.listen()
turtle.onkey(set_red,   "r")
turtle.onkey(set_green, "g")
turtle.onkey(set_blue,  "b")
turtle.onkey(set_black, "k")
turtle.onkey(clear_all, "c")
turtle.onkey(wider,     "plus")
turtle.onkey(thinner,   "minus")

`
      },

      // ── Урок 32 — кілька черепашок ─────────────────────
      {
        id: 28,
        title: { uk: "Кілька черепашок", ru: "Несколько черепашек" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🐢🐢🐢 Список черепашок</h3><pre class="code-example">turtles = []
colors = ["red","blue","green","yellow","purple"]

for c in colors:
    t = turtle.Turtle()
    t.color(c)
    t.shape("turtle")
    t.speed(0)
    t.penup()
    turtles.append(t)

# Тепер рухаємо всіх разом:
for t in turtles:
    t.forward(random.randint(1, 5))</pre></div>`,
          ru: `<div class="theory-block"><h3>🐢🐢🐢 Список черепашек</h3><pre class="code-example">turtles = []
colors = ["red","blue","green","yellow","purple"]

for c in colors:
    t = turtle.Turtle()
    t.color(c)
    t.shape("turtle")
    t.speed(0)
    t.penup()
    turtles.append(t)

# Теперь двигаем всех вместе:
for t in turtles:
    t.forward(random.randint(1, 5))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Створи 5 черепашок різних кольорів. Кожна починає в центрі і йде у свій бік.", ru:"5 черепашек разных цветов, каждая идёт в свою сторону." }},
          { num:2, level:"easy",   text:{ uk:"Гонки! 5 черепашок рухаються на random.randint(1,10) кроків кожен раунд. Хто перша досягне x=200?", ru:"Гонки! 5 черепашек двигаются на random.randint(1,10) шагов." }},
          { num:3, level:"medium", text:{ uk:"10 черепашок стартують з лівого краю. Анімація: кожен кадр усі рухаються. Переможець виводиться.", ru:"10 черепашек с левого края. Анимация гонки. Победитель выводится." }},
          { num:4, level:"medium", text:{ uk:"Зграя: 20 черепашок рухаються у випадкових напрямках. Кожна залишає кольоровий слід.", ru:"Стая: 20 черепашек движутся в случайных направлениях, оставляя следы." }},
          { num:5, level:"medium", text:{ uk:"Планети: 1 черепашка-сонце в центрі, 3 черепашки-планети обертаються навколо (math.cos/sin).", ru:"Планеты: солнце в центре, 3 планеты вращаются вокруг (math.cos/sin)." }},
          { num:6, level:"hard",   text:{ uk:"Гравець (1 черепашка) керується стрілками. 5 ворогів рухаються автоматично до гравця.", ru:"Игрок (стрелки) + 5 врагов движутся к игроку автоматически." }},
          { num:7, level:"hard",   text:{ uk:"Феєрверк: 30 черепашок вилітають з центру в різні боки, кожна зі своїм кольором і кутом.", ru:"Фейерверк: 30 черепашек вылетают из центра в разные стороны." }},
          { num:8, level:"star",   text:{ uk:"⭐ Симуляція мурашок: 50 мурашок блукають випадково. Якщо дві торкаються — зупиняються на 1 сек.", ru:"⭐ Симуляция муравьёв: 50 муравьёв блуждают, при встрече останавливаются." }}
        ],
        starterCode:
`import turtle
import random
import math

turtle.bgcolor("black")
turtle.tracer(0)

# Гонки!
racers = []
colors = ["red","orange","yellow","lime","cyan","blue","purple","pink","white","gold"]
for i, c in enumerate(colors[:5]):
    t = turtle.Turtle()
    t.shape("turtle"); t.color(c); t.penup()
    t.goto(-250, -100 + i*50)
    t.pendown()
    racers.append(t)

# Лінія фінішу
finish = turtle.Turtle()
finish.hideturtle(); finish.penup()
finish.pencolor("white"); finish.width(2)
finish.goto(220, -130); finish.pendown()
finish.goto(220, 130)
finish.penup(); finish.goto(220, 140)
finish.write("ФІНІШ", align="center", font=("Arial",12,"bold"))

winner = None
def race_loop():
    global winner
    if winner: return
    for t in racers:
        step = random.randint(1, 8)
        t.forward(step)
        if t.xcor() >= 220 and not winner:
            winner = t
            w = turtle.Turtle()
            w.hideturtle(); w.penup(); w.color(t.color()[0])
            w.goto(0, 0)
            w.write(f"Переможець: {t.color()[0].upper()}!",
                    align="center", font=("Arial",20,"bold"))
            return
    turtle.tracer(0); turtle.update()
    turtle.ontimer(race_loop, 30)

race_loop()
`
      },

      // ── Урок 33 — AI ворога: слідкує за гравцем ────────
      {
        id: 29,
        title: { uk: "Простий ШІ ворога", ru: "Простой ИИ врага" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🤖 Як зробити ворога «розумним»?</h3><pre class="code-example"># Ворог слідкує за гравцем:
dx = player.xcor() - enemy.xcor()
dy = player.ycor() - enemy.ycor()
dist = (dx**2 + dy**2)**0.5
if dist > 0:
    # нормуємо → рухаємось на speed у бік гравця
    enemy.setx(enemy.xcor() + dx/dist * speed)
    enemy.sety(enemy.ycor() + dy/dist * speed)</pre></div><div class="theory-block hint"><h3>💡 Типи ШІ</h3><ul><li><b>Слідувач</b> — завжди до гравця</li><li><b>Патруль</b> — між двома точками</li><li><b>Рандомний</b> — випадкові напрямки</li><li><b>Втікач</b> — від гравця</li></ul></div>`,
          ru: `<div class="theory-block"><h3>🤖 Как сделать врага «умным»?</h3><pre class="code-example"># Враг следует за игроком:
dx = player.xcor() - enemy.xcor()
dy = player.ycor() - enemy.ycor()
dist = (dx**2 + dy**2)**0.5
if dist > 0:
    # нормируем → движемся на speed в сторону игрока
    enemy.setx(enemy.xcor() + dx/dist * speed)
    enemy.sety(enemy.ycor() + dy/dist * speed)</pre></div><div class="theory-block hint"><h3>💡 Типы ИИ</h3><ul><li><b>Следователь</b> — всегда к игроку</li><li><b>Патруль</b> — между двумя точками</li><li><b>Рандомный</b> — случайные направления</li><li><b>Убегающий</b> — от игрока</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Ворог-слідувач: кожен кадр рухається на 2 пікселі у бік гравця.", ru:"Враг-преследователь: каждый кадр движется к игроку на 2 пикселя." }},
          { num:2, level:"easy",   text:{ uk:"Ворог-патруль: рухається між (-200,0) і (200,0). Коли досяг точки — розвертається.", ru:"Враг-патруль: движется между (-200,0) и (200,0)." }},
          { num:3, level:"medium", text:{ uk:"3 типи ворогів: слідувач (червоний), патруль (жовтий), рандомний (синій).", ru:"3 типа врагов: преследователь, патруль, случайный." }},
          { num:4, level:"medium", text:{ uk:"Ворог-втікач: тікає від гравця (рух у протилежний бік).", ru:"Враг-убегатель: убегает от игрока." }},
          { num:5, level:"medium", text:{ uk:"Гравець зі стрілками + 3 вороги-слідувачі. 3 життя. При зіткненні -1 life.", ru:"Игрок стрелками + 3 врага-преследователя. 3 жизни." }},
          { num:6, level:"hard",   text:{ uk:"Ворог-sniper: стоїть на місці, кожні 3 секунди 'стріляє' кулею у бік гравця.", ru:"Враг-снайпер: стреляет в сторону игрока каждые 3 секунды." }},
          { num:7, level:"hard",   text:{ uk:"5 ворогів з різним типом поведінки. Гравець збирає монети і уникає ворогів.", ru:"5 врагов с разным типом поведения. Игрок собирает монеты." }},
          { num:8, level:"star",   text:{ uk:"⭐ Вовки і вівці: 3 вовки (слідувачі) + 5 овець (рандомні). Овці тікають від вовків.", ru:"⭐ Волки и овцы: 3 волка (преследователи) + 5 овец (случайные, убегают)." }}
        ],
        starterCode:
`import turtle
import random

turtle.bgcolor("black")
turtle.tracer(0)

# Гравець
player = turtle.Turtle()
player.shape("turtle"); player.color("lime"); player.penup()

# Ворог
enemy = turtle.Turtle()
enemy.shape("square"); enemy.color("red"); enemy.penup()
enemy.goto(random.randint(-200,200), random.randint(-150,150))
ENEMY_SPEED = 2

# HUD
hud = turtle.Turtle()
hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,160)
lives = [3]

def dist(a, b):
    return ((a.xcor()-b.xcor())**2+(a.ycor()-b.ycor())**2)**0.5

def up():    player.sety(min(160,player.ycor()+12))
def down():  player.sety(max(-160,player.ycor()-12))
def right(): player.setx(min(260,player.xcor()+12))
def left():  player.setx(max(-260,player.xcor()-12))
turtle.listen()
for fn, key in [(up,"Up"),(down,"Down"),(right,"Right"),(left,"Left")]:
    turtle.onkey(fn, key)

cooldown = [0]
def loop():
    # Ворог слідує за гравцем
    dx = player.xcor() - enemy.xcor()
    dy = player.ycor() - enemy.ycor()
    d = (dx**2+dy**2)**0.5
    if d > 0:
        enemy.setx(enemy.xcor() + dx/d*ENEMY_SPEED)
        enemy.sety(enemy.ycor() + dy/d*ENEMY_SPEED)
    # Зіткнення
    if dist(player,enemy) < 22 and cooldown[0] <= 0:
        lives[0] -= 1; cooldown[0] = 60
        enemy.goto(random.randint(-200,200), random.randint(-150,150))
    if cooldown[0] > 0: cooldown[0] -= 1
    hud.clear()
    hud.write(f"Життя: {'❤️'*lives[0]}", align="center",
              font=("Arial",14,"bold"))
    if lives[0] <= 0:
        hud.goto(0,0); hud.color("red")
        hud.write("GAME OVER", align="center", font=("Arial",36,"bold"))
        return
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 34 — таймер і відлік ──────────────────────
      {
        id: 30,
        title: { uk: "Таймер і відлік часу", ru: "Таймер и обратный отсчёт" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>⏱️ Таймер через лічильник кадрів</h3><pre class="code-example">frame = 0
FPS = 60

def loop():
    global frame
    frame += 1
    seconds = frame // FPS          # скільки секунд минуло
    remaining = 60 - seconds        # відлік від 60 до 0
    timer_t.clear()
    timer_t.write(f"Час: {remaining}",
                  align="center",
                  font=("Arial", 18, "bold"))
    if remaining <= 0:
        # час вийшов!
        return
    turtle.ontimer(loop, 1000//FPS)</pre></div>`,
          ru: `<div class="theory-block"><h3>⏱️ Таймер через счётчик кадров</h3><pre class="code-example">frame = 0
FPS = 60

def loop():
    global frame
    frame += 1
    seconds = frame // FPS          # сколько секунд прошло
    remaining = 60 - seconds        # отсчёт от 60 до 0
    timer_t.clear()
    timer_t.write(f"Время: {remaining}",
                  align="center",
                  font=("Arial", 18, "bold"))
    if remaining <= 0:
        timer_t.write("Время вышло!", align="center", font=("Arial",24,"bold"))
        return
    turtle.ontimer(loop, 1000 // FPS)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Секундомір: відображай кількість секунд що пройшли.", ru:"Секундомер: отображай прошедшие секунды." }},
          { num:2, level:"easy",   text:{ uk:"Відлік з 30 до 0. Коли досяг 0 — 'ЧАС ВИЙШОВ!'", ru:"Обратный отсчёт с 30 до 0. При 0 — 'ВРЕМЯ ВЫШЛО!'" }},
          { num:3, level:"medium", text:{ uk:"Збирай монети за 30 секунд. Таймер та рахунок на екрані.", ru:"Собирай монеты за 30 секунд. Таймер и счёт на экране." }},
          { num:4, level:"medium", text:{ uk:"Таймер міняє колір: зелений (>15 сек), жовтий (5-15), червоний (<5).", ru:"Таймер меняет цвет: зелёный > 15 сек, жёлтый 5-15, красный < 5." }},
          { num:5, level:"medium", text:{ uk:"Спідометр: відображай у реальному часі швидкість (скільки кроків за секунду зробив гравець).", ru:"Спидометр: отображай скорость игрока (шагов в секунду)." }},
          { num:6, level:"hard",   text:{ uk:"Раунди: 3 раунди по 20 секунд. Між раундами — 3-секундна перерва з відліком.", ru:"Раунды: 3 раунда по 20 секунд с 3-секундной паузой между ними." }},
          { num:7, level:"hard",   text:{ uk:"Рекорд часу: збережи найкращий час гравця (найбільший рахунок за 30 сек) у змінну best.", ru:"Рекорд: сохрани лучший результат (макс счёт за 30 сек) в переменную best." }},
          { num:8, level:"star",   text:{ uk:"⭐ Гра «Швидкі руки»: 10 цілей по черзі. Виміряй час реакції. Показ результату.", ru:"⭐ «Быстрые руки»: 10 целей по очереди. Измеряй время реакции." }}
        ],
        starterCode:
`import turtle
import random

turtle.bgcolor("black")
turtle.tracer(0)

player = turtle.Turtle()
player.shape("turtle"); player.color("lime"); player.penup()

coin = turtle.Turtle()
coin.shape("circle"); coin.color("gold"); coin.penup()
coin.goto(random.randint(-200,200), random.randint(-150,150))

frame = [0]
score = [0]
TIME_LIMIT = 30

hud = turtle.Turtle()
hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,160)

def dist(a,b): return ((a.xcor()-b.xcor())**2+(a.ycor()-b.ycor())**2)**0.5

def up():    player.sety(min(160,player.ycor()+12))
def down():  player.sety(max(-160,player.ycor()-12))
def right(): player.setx(min(260,player.xcor()+12))
def left():  player.setx(max(-260,player.xcor()-12))
turtle.listen()
for fn, key in [(up,"Up"),(down,"Down"),(right,"Right"),(left,"Left")]:
    turtle.onkey(fn, key)

def loop():
    frame[0] += 1
    sec = frame[0] // 60
    remaining = TIME_LIMIT - sec
    clr = "lime" if remaining>15 else ("yellow" if remaining>5 else "red")
    if dist(player,coin) < 22:
        score[0] += 10
        coin.goto(random.randint(-200,200), random.randint(-150,150))
    hud.clear(); hud.color(clr)
    hud.write(f"⏱ {remaining}с   Рахунок: {score[0]}",
              align="center", font=("Arial",15,"bold"))
    if remaining <= 0:
        end = turtle.Turtle(); end.hideturtle(); end.penup()
        end.color("gold"); end.goto(0,0)
        end.write(f"КІНЕЦЬ!  Рахунок: {score[0]}",
                  align="center", font=("Arial",28,"bold"))
        return
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 35 — рівні складності ─────────────────────
      {
        id: 31,
        title: { uk: "Рівні складності", ru: "Уровни сложности" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>📈 Система рівнів</h3><pre class="code-example">level = 1
score = 0
LEVEL_UP_SCORE = 50   # очок до наступного рівня

def check_level_up():
    global level
    if score >= level * LEVEL_UP_SCORE:
        level += 1
        # складніше:
        enemy_speed += 0.5
        spawn_interval = max(10, spawn_interval - 5)
        show_level_up_message()</pre></div>`,
          ru: `<div class="theory-block"><h3>📈 Система уровней</h3><pre class="code-example">level = 1
score = 0
LEVEL_UP_SCORE = 50   # очков до следующего уровня

def check_level_up():
    global level
    if score >= level * LEVEL_UP_SCORE:
        level += 1
        # сложнее:
        enemy_speed += 0.5
        spawn_interval = max(10, spawn_interval - 5)
        show_level_up_message()</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Додай рівні до гри «Зіркова ловля»: кожні 50 балів рівень +1, швидкість +0.5.", ru:"Добавь уровни в «Звёздную ловлю»: каждые 50 очков уровень +1." }},
          { num:2, level:"easy",   text:{ uk:"При підвищенні рівня — показуй 2 секунди «РІВЕНЬ 2!» на екрані.", ru:"При повышении уровня показывай 2 сек «УРОВЕНЬ 2!» на экране." }},
          { num:3, level:"medium", text:{ uk:"На вищих рівнях — більше ворогів (level 1: 1 ворог, level 3: 3 вороги, level 5: 5).", ru:"На высоких уровнях больше врагов: уровень 1→1, уровень 3→3." }},
          { num:4, level:"medium", text:{ uk:"Рівень 1: зірки, рівень 3: бомби додаються, рівень 5: НЛО.", ru:"Уровень 1: звёзды. Уровень 3: добавляются бомбы. Уровень 5: НЛО." }},
          { num:5, level:"medium", text:{ uk:"Прогрес-бар рівня: горизонтальна смуга що заповнюється до наступного рівня.", ru:"Прогресс-бар уровня: полоска заполняется до следующего уровня." }},
          { num:6, level:"hard",   text:{ uk:"Бонусний рівень кожні 5 рівнів: тільки бонуси без ворогів, 10 секунд.", ru:"Бонусный уровень каждые 5 уровней: только бонусы, 10 секунд." }},
          { num:7, level:"hard",   text:{ uk:"«Щит»: кожні 3 рівні дається щит (1 безкоштовне зіткнення).", ru:"«Щит»: каждые 3 уровня даётся щит (1 бесплатное столкновение)." }},
          { num:8, level:"star",   text:{ uk:"⭐ Повна гра з 10 рівнями. Кожен рівень — нова механіка або ворог. Після 10 — екран перемоги.", ru:"⭐ Полная игра с 10 уровнями. Каждый уровень — новая механика." }}
        ],
        starterCode:
`import turtle, random

turtle.bgcolor("midnightblue")
turtle.tracer(0)

basket = turtle.Turtle()
basket.shape("square"); basket.color("lime")
basket.shapesize(1,5,1); basket.penup(); basket.goto(0,-160)

stars=[]; score=0; lives=3; level=1; speed=3; frame_n=0; level_msg_timer=0

hud = turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,165)
lvl_t = turtle.Turtle(); lvl_t.hideturtle(); lvl_t.penup(); lvl_t.color("gold"); lvl_t.goto(0,50)

def spawn():
    s=turtle.Turtle(); s.shape("circle"); s.color("gold")
    s.penup(); s.goto(random.randint(-260,260),215); stars.append(s)

def ml(): basket.setx(max(-230,basket.xcor()-22))
def mr(): basket.setx(min(230,basket.xcor()+22))
turtle.listen(); turtle.onkey(ml,"Left"); turtle.onkey(mr,"Right")

def loop():
    global score,lives,level,speed,frame_n,level_msg_timer
    frame_n+=1
    if frame_n % max(15,55-level*4)==0: spawn()
    for s in stars[:]:
        s.sety(s.ycor()-speed)
        if abs(s.xcor()-basket.xcor())<55 and abs(s.ycor()-basket.ycor())<20:
            s.hideturtle(); stars.remove(s); score+=10
            if score >= level*60: level+=1; speed+=0.5; level_msg_timer=120
        elif s.ycor()<-220: s.hideturtle(); stars.remove(s); lives-=1
    hearts="❤️"*lives+"🖤"*(3-lives)
    hud.clear(); hud.write(f"Рах: {score}  Рів: {level}  {hearts}",align="center",font=("Arial",13,"bold"))
    if level_msg_timer>0:
        lvl_t.clear(); lvl_t.write(f"РІВЕНЬ {level}!",align="center",font=("Arial",28,"bold"))
        level_msg_timer-=1
    elif level_msg_timer==0: lvl_t.clear()
    if lives<=0:
        over=turtle.Turtle(); over.hideturtle(); over.penup(); over.color("red"); over.goto(0,0)
        over.write("GAME OVER",align="center",font=("Arial",40,"bold")); return
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 36 — збереження рекорду ───────────────────
      {
        id: 32,
        title: { uk: "Збереження рекорду у файл", ru: "Сохранение рекорда в файл" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>💾 Файли Python: open()</h3><pre class="code-example"># Запис у файл
with open("record.txt", "w") as f:
    f.write("150")

# Читання з файлу
with open("record.txt", "r") as f:
    record = int(f.read())

# Режими: "w" = write (перезаписати)
#         "r" = read (читати)
#         "a" = append (додати в кінець)</pre></div><div class="theory-block hint"><h3>💡 Безпечне читання</h3><pre class="code-example">try:
    with open("record.txt", "r") as f:
        record = int(f.read())
except FileNotFoundError:
    record = 0   # файл ще не існує</pre></div>`,
          ru: `<div class="theory-block"><h3>💾 Файлы Python: open()</h3><pre class="code-example"># Запись в файл
with open("record.txt", "w") as f:
    f.write("150")

# Чтение из файла
with open("record.txt", "r") as f:
    record = int(f.read())

# Режимы: "w" = write (перезаписать)
#         "r" = read (читать)
#         "a" = append (добавить в конец)</pre></div><div class="theory-block hint"><h3>💡 try/except для безопасного чтения</h3><pre class="code-example">try:
    with open("record.txt") as f:
        record = int(f.read())
except:
    record = 0  # если файла нет — начинаем с 0</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Запитай ім'я та оцінку. Запиши у файл 'results.txt'. Відкрий файл у Notepad.", ru:"Спроси имя и оценку. Запиши в 'results.txt'. Открой в Notepad." }},
          { num:2, level:"easy",   text:{ uk:"Читай вміст файлу 'results.txt' і виводь у консоль.", ru:"Читай содержимое 'results.txt' и выводи в консоль." }},
          { num:3, level:"medium", text:{ uk:"Лічильник запусків: записуй скільки разів запускали програму. При кожному запуску +1.", ru:"Счётчик запусков: при каждом запуске +1, записывай в файл." }},
          { num:4, level:"medium", text:{ uk:"Таблиця рекордів: список топ-5 з іменами. Читай з файлу при старті, записуй якщо новий рекорд.", ru:"Таблица рекордов: топ-5 с именами. Читай при старте, записывай новый рекорд." }},
          { num:5, level:"medium", text:{ uk:"Збереження налаштувань: колір гравця і швидкість у файл 'settings.txt'.", ru:"Сохранение настроек: цвет и скорость в 'settings.txt'." }},
          { num:6, level:"hard",   text:{ uk:"Щоденник: програма запитує що сталось сьогодні. Записує у файл з датою. При старті виводить останні 3 записи.", ru:"Дневник: записывает события с датой. При старте выводит последние 3 записи." }},
          { num:7, level:"hard",   text:{ uk:"Додай збереження рекорду до гри «Зіркова ловля». Показуй рекорд у Game Over екрані.", ru:"Добавь сохранение рекорда в «Звёздную ловлю». Показывай при GameOver." }},
          { num:8, level:"star",   text:{ uk:"⭐ База даних гравців: список словників [{name, score, date}]. Запис/читання через файл. Топ-3 виводиться.", ru:"⭐ База игроков: [{name,score,date}]. Запись/чтение через файл. Топ-3." }}
        ],
        starterCode:
`# Демонстрація роботи з файлами

# ── Запис рекорду ──────────────────────────────────────────
def save_record(score):
    with open("record.txt", "w") as f:
        f.write(str(score))
    print(f"Рекорд {score} збережено!")

# ── Читання рекорду ────────────────────────────────────────
def load_record():
    try:
        with open("record.txt", "r") as f:
            return int(f.read().strip())
    except (FileNotFoundError, ValueError):
        return 0   # файл не існує або порожній

# ── Тест ──────────────────────────────────────────────────
current_record = load_record()
print(f"Поточний рекорд: {current_record}")

name = input("Твоє ім'я: ")
score = int(input("Твій рахунок: "))

if score > current_record:
    print(f"🏆 НОВИЙ РЕКОРД! {current_record} → {score}")
    save_record(score)
else:
    print(f"Рекорд не побитий. Рекорд: {current_record}, твій: {score}")

# ── Файл з таблицею рекордів ───────────────────────────────
def save_to_leaderboard(name, score):
    with open("leaderboard.txt", "a") as f:  # "a" = append
        f.write(f"{name},{score}\\n")

def load_leaderboard():
    try:
        with open("leaderboard.txt", "r") as f:
            lines = f.readlines()
        records = []
        for line in lines:
            parts = line.strip().split(",")
            if len(parts) == 2:
                records.append({"name": parts[0], "score": int(parts[1])})
        records.sort(key=lambda x: x["score"], reverse=True)
        return records[:5]  # топ-5
    except FileNotFoundError:
        return []

save_to_leaderboard(name, score)
board = load_leaderboard()
print("\\n=== ТАБЛИЦЯ РЕКОРДІВ ===")
for i, r in enumerate(board, 1):
    print(f"{i}. {r['name']}: {r['score']}")
`
      },

      // ── Урок 37 — ефект вибуху ─────────────────────────
      {
        id: 33,
        title: { uk: "Ефекти та частинки", ru: "Эффекты и частицы" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>💥 Частинки = список об'єктів з обмеженим часом</h3><pre class="code-example">particles = []

def explosion(x, y):
    for _ in range(12):
        p = turtle.Turtle()
        p.hideturtle(); p.penup(); p.goto(x, y)
        p.setheading(random.randint(0, 360))
        p.color(random.choice(["red","orange","yellow"]))
        p.speed = random.randint(3, 8)
        p.life = 20    # кадрів живе
        particles.append(p)

def update_particles():
    for p in particles[:]:
        p.pendown()
        p.forward(p.speed)
        p.life -= 1
        if p.life <= 0:
            p.hideturtle()
            particles.remove(p)</pre></div>`,
          ru: `<div class="theory-block"><h3>💥 Частицы = список объектов с ограниченным временем</h3><pre class="code-example">particles = []

def explosion(x, y):
    for _ in range(12):
        p = turtle.Turtle()
        p.hideturtle(); p.penup(); p.goto(x, y)
        p.setheading(random.randint(0, 360))
        p.color(random.choice(["red","orange","yellow"]))
        p.speed = random.randint(3, 8)
        p.life = 20    # кадров живёт
        particles.append(p)

def update_particles():
    for p in particles[:]:
        p.pendown()
        p.forward(p.speed)
        p.life -= 1
        if p.life <= 0:
            p.hideturtle()
            particles.remove(p)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Клік мишею → вибух з 10 кольорових ліній від точки кліку.", ru:"Клик мышью → взрыв из 10 цветных линий." }},
          { num:2, level:"easy",   text:{ uk:"Вибух зникає: кожен кадр life -= 1, при life == 0 частинка зникає.", ru:"Взрыв исчезает: life -= 1, при 0 частица исчезает." }},
          { num:3, level:"medium", text:{ uk:"Зорепад: постійний потік частинок падає з верху екрану.", ru:"Звездопад: постоянный поток частиц сверху." }},
          { num:4, level:"medium", text:{ uk:"Слід гравця: гравець залишає коротший слід що поступово зникає.", ru:"След игрока: игрок оставляет след который постепенно исчезает." }},
          { num:5, level:"medium", text:{ uk:"Частинки уповільнюються: speed *= 0.9 кожен кадр.", ru:"Частицы замедляются: speed *= 0.9 каждый кадр." }},
          { num:6, level:"hard",   text:{ uk:"Фонтан: натискай пробіл → фонтан частинок вгору з фізикою (dy -= 0.5 кожен кадр).", ru:"Фонтан: пробел → фонтан частиц вверх с физикой (dy -= 0.5)." }},
          { num:7, level:"hard",   text:{ uk:"Феєрверк з 5 вибухів у різних місцях по черзі.", ru:"Фейерверк из 5 взрывов в разных местах по очереди." }},
          { num:8, level:"star",   text:{ uk:"⭐ Додай вибухи до гри «Зіркова ловля»: при зборі зірки — маленький вибух, при грі GameOver — великий.", ru:"⭐ Добавь взрывы в «Звёздную ловлю»: при сборе — маленький взрыв, GameOver — большой." }}
        ],
        starterCode:
`import turtle, random

turtle.bgcolor("black")
turtle.tracer(0)
t = turtle.Turtle(); t.hideturtle()
particles = []

def explosion(x, y, count=15, colors=None):
    if colors is None:
        colors = ["red","orange","yellow","white"]
    for _ in range(count):
        p = turtle.Turtle()
        p.hideturtle(); p.penup(); p.goto(x, y); p.pendown()
        p.setheading(random.randint(0, 360))
        p.color(random.choice(colors))
        p.width(random.randint(1,3))
        p.spd = random.randint(4, 10)
        p.life = random.randint(10, 25)
        particles.append(p)

def on_click(x, y):
    explosion(x, y)

turtle.onscreenclick(on_click)
turtle.listen()

def loop():
    for p in particles[:]:
        p.forward(p.spd)
        p.spd = max(0, p.spd - 0.3)
        p.life -= 1
        if p.life <= 0:
            p.hideturtle(); particles.remove(p)
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop, 16)

loop()
`
      },

      // ── Урок 38 — огляд Модуля 3 ──────────────────────
      {
        id: 34,
        title: { uk: "Огляд Модуля 3. Практика", ru: "Обзор Модуля 3. Практика" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Швидка вікторина</h3><p>1. Яка команда вимикає автоматичне оновлення?<br>2. Яка команда реагує на клік миші?<br>3. Як видалити елемент зі списку в циклі безпечно?<br>4. Формула відстані між двома точками?<br>5. Як зберегти число у файл?</p></div><div class="theory-block"><h3>📋 Що вивчили у Модулі 3</h3><ul><li>✅ tracer(0) + update() = анімація</li><li>✅ onkey() + listen() = клавіатура</li><li>✅ Список об'єктів + spawn</li><li>✅ dist(a,b) = коллізія</li><li>✅ Миша: onscreenclick()</li><li>✅ Кілька черепашок</li><li>✅ ШІ ворога</li><li>✅ Таймер + рівні</li><li>✅ Файли: read/write</li><li>✅ Частинки</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Быстрая викторина</h3><p>1. Какая команда отключает автоматическое обновление?<br>2. Какая команда реагирует на клик мыши?<br>3. Как безопасно удалить элемент из списка в цикле?<br>4. Формула расстояния между двумя точками?<br>5. Как сохранить число в файл?</p></div><div class="theory-block"><h3>📋 Что изучили в Модуле 3</h3><ul><li>✅ tracer(0) + update() = анимация</li><li>✅ onkey() + listen() = клавиатура</li><li>✅ Список объектов + spawn</li><li>✅ dist(a,b) = коллизия</li><li>✅ Мышь: onscreenclick()</li><li>✅ Несколько черепашек</li><li>✅ ИИ врага</li><li>✅ Таймер + уровни</li><li>✅ Файлы: read/write</li><li>✅ Частицы</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Напиши по пам'яті шаблон ігрового циклу з tracer(0) і update().", ru:"Напиши по памяти шаблон игрового цикла с tracer(0) и update()." }},
          { num:2, level:"easy",   text:{ uk:"Напиши функцію dist(a,b) і перевір її для двох черепашок.", ru:"Напиши функцию dist(a,b) и проверь для двух черепашек." }},
          { num:3, level:"medium", text:{ uk:"Міні-гра «Уникай!»: гравець + 3 ворогі-слідувачі + таймер 30 сек. Мета: вижити.", ru:"Мини-игра «Уклоняйся»: игрок + 3 врага-преследователя + таймер 30 сек." }},
          { num:4, level:"medium", text:{ uk:"Гра «Малювалка-вибухи»: малювалка мишею, клік правою — вибух частинок.", ru:"«Рисовалка-взрывы»: рисуй мышью, правый клик — взрыв частиц." }},
          { num:5, level:"medium", text:{ uk:"Гра «Збери все»: гравець + 10 монет + таймер + рекорд збережено у файл.", ru:"«Собери всё»: игрок + 10 монет + таймер + рекорд в файл." }},
          { num:6, level:"hard",   text:{ uk:"Комбінована гра: гравець + монети + ворог-слідувач + ефект вибуху при зіткненні.", ru:"Комбо: игрок + монеты + враг + взрыв при столкновении." }},
          { num:7, level:"hard",   text:{ uk:"Гра з рекордами: таблиця топ-5 зберігається у файл. Показується перед початком.", ru:"Игра с таблицей рекордов топ-5 в файле. Показывается до старта." }},
          { num:8, level:"star",   text:{ uk:"⭐ Придумай свою гру з Turtle. Використай мінімум 5 механік з Модуля 3.", ru:"⭐ Придумай свою игру в Turtle. Используй минимум 5 механик из Модуля 3." }}
        ],
        starterCode:
`import turtle, random

# ── ШАБЛОН ПОВНОЇ ГРИ (заповни!) ──────────────────────────
turtle.bgcolor("black")
turtle.tracer(0)

# Гравець
player = turtle.Turtle()
player.shape("turtle"); player.color("lime"); player.penup()

# Монети (список)
coins = []
for _ in range(5):
    c = turtle.Turtle()
    c.shape("circle"); c.color("gold"); c.penup()
    c.goto(random.randint(-200,200), random.randint(-150,150))
    coins.append(c)

# HUD
score=0; frame=0
hud = turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,160)

def dist(a,b): return ((a.xcor()-b.xcor())**2+(a.ycor()-b.ycor())**2)**0.5

def up():    player.sety(min(160,player.ycor()+12))
def down():  player.sety(max(-160,player.ycor()-12))
def right(): player.setx(min(260,player.xcor()+12))
def left():  player.setx(max(-260,player.xcor()-12))
turtle.listen()
for fn,key in [(up,"Up"),(down,"Down"),(right,"Right"),(left,"Left")]:
    turtle.onkey(fn,key)

def loop():
    global score, frame
    frame += 1
    remaining = 60 - frame//60
    for c in coins[:]:
        if dist(player,c) < 22:
            c.hideturtle(); coins.remove(c); score += 10
            n = turtle.Turtle(); n.shape("circle"); n.color("gold"); n.penup()
            n.goto(random.randint(-200,200), random.randint(-150,150))
            coins.append(n)
    hud.clear()
    hud.write(f"⏱{remaining}с  Рах:{score}", align="center", font=("Arial",14,"bold"))
    if remaining <= 0: hud.goto(0,0); hud.write(f"КІНЕЦЬ! {score}",align="center",font=("Arial",30,"bold")); return
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 39 — міні-проект: Космічний доджер ────────
      {
        id: 35,
        title: { uk: "Міні-проект: Космічний доджер", ru: "Мини-проект: Космический доджер" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🚀 Сьогодні будуємо гру за один урок!</h3><p>«Космічний доджер»: ракета уникає метеоритів.<br>Використаємо ВСЕ з Модуля 3:</p><ul><li>Анімація (tracer+update)</li><li>Клавіші (onkey)</li><li>Список ворогів (spawn)</li><li>Коллізії</li><li>Рівні і таймер</li><li>Частинки при вибуху</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🚀 Сегодня строим игру за один урок!</h3><p>«Космический доджер»: ракета уклоняется от метеоритов.<br>Используем ВСЁ из Модуля 3:</p><ul><li>Анимация (tracer+update)</li><li>Клавиши (onkey)</li><li>Список врагов (spawn)</li><li>Коллизии</li><li>Уровни и таймер</li><li>Частицы при взрыве</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Запусти гру. Спробуй вижити якомога довше.", ru:"Запусти игру. Попробуй прожить как можно дольше." }},
          { num:2, level:"easy",   text:{ uk:"Зміни форму ракети, колір, швидкість. Підпиши своє ім'я в заголовку.", ru:"Измени форму ракеты, цвет, скорость. Своё имя в заголовке." }},
          { num:3, level:"medium", text:{ uk:"Додай зірки на фоні (random маленькі крапки при старті).", ru:"Добавь звёзды на фоне (случайные маленькие точки при старте)." }},
          { num:4, level:"medium", text:{ uk:"Додай бонус-зірку (золота) — при зборі +30 балів і щит на 3 сек.", ru:"Добавь бонус-звезду (золотую) — при сборе +30 очков и щит 3 сек." }},
          { num:5, level:"medium", text:{ uk:"Рекорд зберігається у файл. При GameOver показуй чи новий рекорд.", ru:"Рекорд сохраняется в файл. При GameOver — новый рекорд или нет." }},
          { num:6, level:"hard",   text:{ uk:"Ворожі НЛО (горизонтальний рух) + метеорити (вертикальний рух).", ru:"Вражеские НЛО (горизонтально) + метеориты (вертикально)." }},
          { num:7, level:"hard",   text:{ uk:"Стрільба: пробіл → куля летить вгору. При влучанні в метеорит — вибух + очки.", ru:"Стрельба: пробел → пуля вверх. Попадание → взрыв + очки." }},
          { num:8, level:"star",   text:{ uk:"⭐ Своя тема! Заміни ракету і метеорити на свої персонажі. Інший фон і оформлення.", ru:"⭐ Своя тема! Замени ракету и метеориты на своих персонажей." }}
        ],
        starterCode:
`import turtle, random

turtle.bgcolor("black"); turtle.tracer(0)


# Фонові зірки
for _ in range(80):
    s=turtle.Turtle(); s.hideturtle(); s.penup()
    s.goto(random.randint(-270,270),random.randint(-180,180))
    s.dot(random.randint(1,3),"white")

rocket = turtle.Turtle()
rocket.shape("triangle"); rocket.color("cyan"); rocket.penup(); rocket.setheading(90)

meteors=[]; score=0; frame=0

hud=turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,165)
particles=[]

def spawn_meteor():
    m=turtle.Turtle(); m.shape("circle"); m.color(random.choice(["gray","dimgray","darkgray"]))
    sz=random.uniform(0.5,1.5); m.shapesize(sz,sz,1)
    m.penup(); m.goto(random.randint(-270,270),210); m.spd=random.uniform(2,5)
    meteors.append(m)

def explosion(x,y):
    for _ in range(10):
        p=turtle.Turtle(); p.hideturtle(); p.penup(); p.goto(x,y); p.pendown()
        p.setheading(random.randint(0,360)); p.color(random.choice(["red","orange","yellow"]))
        p.spd=random.randint(3,7); p.life=15; particles.append(p)

def up():    rocket.sety(min(170,rocket.ycor()+14))
def down():  rocket.sety(max(-170,rocket.ycor()-14))
def right(): rocket.setx(min(260,rocket.xcor()+14))
def left():  rocket.setx(max(-260,rocket.xcor()-14))
turtle.listen()
for fn,k in [(up,"Up"),(down,"Down"),(right,"Right"),(left,"Left")]:
    turtle.onkey(fn,k)

def loop():
    global score,frame
    frame+=1
    if frame%max(12,40-score//50)==0: spawn_meteor()
    for m in meteors[:]:
        m.sety(m.ycor()-m.spd)
        if abs(m.xcor()-rocket.xcor())<25 and abs(m.ycor()-rocket.ycor())<25:
            explosion(rocket.xcor(),rocket.ycor())
            hud.clear(); hud.color("red"); hud.goto(0,0)
            hud.write(f"💥 GAME OVER  Рахунок: {score}",align="center",font=("Arial",24,"bold"))
            return
        if m.ycor()<-210: m.hideturtle(); meteors.remove(m); score+=5
    for p in particles[:]:
        p.forward(p.spd); p.spd=max(0,p.spd-0.4); p.life-=1
        if p.life<=0: p.hideturtle(); particles.remove(p)
    hud.clear(); hud.color("white")
    hud.write(f"⏱{frame//60}с  Рах:{score}",align="center",font=("Arial",13,"bold"))
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 40 — проект: Повна гра ────────────────────
      {
        id: 36,
        title: { uk: "Проект: Моя повна гра (Turtle)", ru: "Проект: Моя полная игра (Turtle)" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🏆 Фінальний проект Модуля 3!</h3><p>Сьогодні у тебе весь урок щоб створити ВЛАСНУ гру.<br>Вибери одну з ідей або придумай свою.</p></div><div class="theory-block"><h3>🗺️ Чеклист хорошої гри</h3><ul><li>☐ Меню або заставка на початку</li><li>☐ Гравець керується клавішами</li><li>☐ Є мета (що зробити щоб перемогти)</li><li>☐ Є небезпека (що може вбити/закінчити гру)</li><li>☐ Рахунок і рівні</li><li>☐ Таймер АБО здоров'я</li><li>☐ Екран «Game Over» з рахунком</li><li>☐ Рекорд зберігається у файл</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🏆 Финальный проект Модуля 3!</h3><p>Сегодня у тебя весь урок чтобы создать СВОЮ игру.<br>Выбери одну из идей или придумай свою.</p></div><div class="theory-block"><h3>🗺️ Чеклист хорошей игры</h3><ul><li>☐ Меню или заставка в начале</li><li>☐ Игрок управляется клавишами</li><li>☐ Есть цель (что сделать чтобы победить)</li><li>☐ Есть опасность (что может убить/завершить игру)</li><li>☐ Счёт и уровни</li><li>☐ Таймер ИЛИ здоровье</li><li>☐ Экран «Game Over» с очками</li><li>☐ Рекорд сохраняется в файл</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"«Зіркова ловля — Преміум»: додай все — таймер, рекорд у файл, вибухи, рівні.", ru:"«Звёздная ловля Премиум»: таймер, рекорд в файл, взрывы, уровни." }},
          { num:2, level:"easy",   text:{ uk:"«Лабіринт»: гравець + стіни (список прямокутників). Знайди вихід.", ru:"«Лабиринт»: игрок + стены. Найди выход." }},
          { num:3, level:"medium", text:{ uk:"«Космічна стрілянина»: ракета + метеорити + стрільба + рекорд.", ru:"«Космическая стрелялка»: ракета + метеориты + стрельба + рекорд." }},
          { num:4, level:"medium", text:{ uk:"«Пастка»: гравець тікає від 5 ворогів. Кожні 10 сек новий ворог. Вижити якомога довше.", ru:"«Ловушка»: игрок убегает от 5 врагов. Каждые 10 сек новый враг." }},
          { num:5, level:"medium", text:{ uk:"«Малювалка-гра»: намалюй дорогу мишею, по ній їде машина (не виходь за межі).", ru:"«Рисовалка-игра»: нарисуй дорогу мышью, по ней едет машина." }},
          { num:6, level:"hard",   text:{ uk:"«Вежа оборони»: метеорити летять, гравець може ставити стіни (клік) що зупиняють їх.", ru:"«Башня обороны»: метеориты летят, игрок ставит стены кликом." }},
          { num:7, level:"hard",   text:{ uk:"«Рибалка»: гравець управляє гачком (вниз/вгору), ловить рибу, уникає медуз.", ru:"«Рыбалка»: гачок вниз/вверх, ловишь рыбу, избегаешь медуз." }},
          { num:8, level:"star",   text:{ uk:"⭐ Власна ідея! Обов'язково: меню, рівні, рекорд у файл, ефекти. Презентація батькам!", ru:"⭐ Своя идея! Обязательно: меню, уровни, рекорд в файл, эффекты. Презентация!" }}
        ],
        starterCode:
`import turtle, random

# ══════════════════════════════════════════════════════════
# МОЯ ГРА
# Назва: _______________________
# Автор: _______________________
# Механіка: ____________________
# ══════════════════════════════════════════════════════════

turtle.bgcolor("black"); turtle.tracer(0)


# ── Допоміжні функції ──────────────────────────────────────
def dist(a,b): return ((a.xcor()-b.xcor())**2+(a.ycor()-b.ycor())**2)**0.5

def load_record():
    try:
        with open("my_game_record.txt","r") as f: return int(f.read())
    except: return 0

def save_record(s):
    with open("my_game_record.txt","w") as f: f.write(str(s))

record = load_record()

# ── Стан гри ───────────────────────────────────────────────
state = ["menu"]
score = [0]; lives = [3]; level = [1]; frame = [0]

# ── Меню ───────────────────────────────────────────────────
menu_t = turtle.Turtle(); menu_t.hideturtle(); menu_t.penup(); menu_t.color("gold"); menu_t.goto(0,50)
menu_t.write("МОЯ ГРА", align="center", font=("Arial",40,"bold"))
sub_t = turtle.Turtle(); sub_t.hideturtle(); sub_t.penup(); sub_t.color("white"); sub_t.goto(0,-20)
sub_t.write(f"Рекорд: {record}\\nПробіл → почати", align="center", font=("Arial",18,"normal"))

# ── Гравець (додай свій!) ───────────────────────────────────
player = turtle.Turtle(); player.shape("triangle"); player.color("cyan"); player.penup()

def up():    player.sety(min(165,player.ycor()+12)); assert state[0]=="playing"
def down():  player.sety(max(-165,player.ycor()-12))
def right(): player.setx(min(265,player.xcor()+12))
def left():  player.setx(max(-265,player.xcor()-12))

def start():
    if state[0]!="menu": return
    state[0]="playing"
    menu_t.clear(); sub_t.clear()
    for fn,k in [(up,"Up"),(down,"Down"),(right,"Right"),(left,"Left")]:
        turtle.onkey(fn,k)
    loop()

turtle.listen(); turtle.onkey(start,"space")

hud = turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,165)

def loop():
    frame[0]+=1
    # ТУТ ПИШИ СВОЮ ЛОГІКУ ГРИ:

    hud.clear(); hud.write(f"Рах:{score[0]} Рів:{level[0]} {'❤️'*lives[0]}",align="center",font=("Arial",13,"bold"))
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

`
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  МОДУЛЬ 4 — Черепашача Гра: Руйнівник Блоків (41-55)
  // ══════════════════════════════════════════════════════════
  {
    moduleId: 4,
    moduleTitle: { uk: "Черепашача Гра", ru: "Черепашья Игра" },
    moduleIcon: "🧱",
    lessons: [
// ── Урок 37 — Архітектура гри ────────────────────────
      {
        id: 37,
        title: { uk: "Архітектура гри. Стан і об'єкти", ru: "Архитектура игры. Состояние и объекты" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Яку гру «Руйнівник блоків» (Breakout) ти знаєш?<br>Ракетка внизу, м'яч летить, руйнує блоки зверху.</p></div><div class="theory-block"><h3>🏗️ Архітектура ігрового об'єкта</h3><pre class="code-example"># Дати об'єкту властивості через крапку:
ball = turtle.Turtle()
ball.dx = 4    # власне поле — швидкість по X
ball.dy = -4   # власне поле — швидкість по Y

# Використати в циклі:
ball.setx(ball.xcor() + ball.dx)
ball.sety(ball.ycor() + ball.dy)

# Відбиття від стіни:
if ball.xcor() > 270: ball.dx *= -1</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что такое игра «Breakout»?<br>Ракетка внизу, мяч летит, разбивает блоки сверху.</p></div><div class="theory-block"><h3>🏗️ Архитектура игрового объекта</h3><pre class="code-example">ball = turtle.Turtle()
ball.dx = 4    # скорость по X
ball.dy = -4   # скорость по Y

ball.setx(ball.xcor() + ball.dx)
ball.sety(ball.ycor() + ball.dy)

if ball.xcor() > 270: ball.dx *= -1  # отражение</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Намалюй статичну сцену: ракетка, м'яч, 3×5 блоків.", ru:"⭐ Нарисуй статичную сцену: ракетка, мяч, 3×5 блоков." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Ракетка рухається клавішами ← →.", ru:"⭐ Ракетка движется клавишами ← →." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ М'яч рухається (dx, dy). Відбивається від стін.", ru:"⭐⭐ Мяч движется (dx, dy). Отбивается от стен." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ М'яч відбивається від ракетки.", ru:"⭐⭐ Мяч отбивается от ракетки." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Список блоків. При влученні м'яча — блок зникає.", ru:"⭐⭐ Список блоков. При попадании мяча — блок исчезает." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Рахунок: кожен розбитий блок +10. Виводь на екран.", ru:"⭐⭐⭐ Счёт: каждый блок +10. Выводи на экран." }},
          { num:7, level:"hard",   text:{ uk:"⭐⭐⭐ GameOver: м'яч впав внизу = -1 життя.", ru:"⭐⭐⭐ GameOver: мяч упал вниз = -1 жизнь." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повна гра «Руйнівник блоків» з рівнями, рахунком і 3 життями.", ru:"⭐⭐⭐⭐ Полная игра «Breakout» с уровнями, счётом и 3 жизнями." }}
        ],
        starterCode: `import turtle
turtle.bgcolor("black"); turtle.tracer(0)

paddle = turtle.Turtle()
paddle.shape("square"); paddle.color("white")
paddle.shapesize(1, 6, 1); paddle.penup(); paddle.goto(0, -170)

ball = turtle.Turtle()
ball.shape("circle"); ball.color("gold")
ball.penup(); ball.goto(0, 0)
ball.dx = 4; ball.dy = -4

blocks = []
colors = ["red","orange","yellow","green","blue"]
for row in range(5):
    for col in range(8):
        b = turtle.Turtle()
        b.shape("square"); b.shapesize(1, 3, 1)
        b.penup(); b.color(colors[row % len(colors)])
        b.goto(-210 + col * 70, 100 - row * 30)
        blocks.append(b)

def move_left():  paddle.setx(max(-230, paddle.xcor()-25))
def move_right(): paddle.setx(min(230,  paddle.xcor()+25))
turtle.listen()
turtle.onkey(move_left,"Left"); turtle.onkey(move_right,"Right")

def loop():
    ball.setx(ball.xcor() + ball.dx)
    ball.sety(ball.ycor() + ball.dy)
    if ball.xcor() > 270 or ball.xcor() < -270: ball.dx *= -1
    if ball.ycor() > 180: ball.dy *= -1
    if ball.ycor() < -195: ball.goto(0,0); ball.dy = abs(ball.dy)
    if abs(ball.xcor()-paddle.xcor())<90 and abs(ball.ycor()-paddle.ycor())<15:
        ball.dy = abs(ball.dy)
    for b in blocks[:]:
        if abs(ball.xcor()-b.xcor())<50 and abs(ball.ycor()-b.ycor())<20:
            b.hideturtle(); blocks.remove(b); ball.dy *= -1
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 41 — ракетка і м'яч ───────────────────────
      {
        id: 38,
        title: { uk: "Breakout: ракетка і м'яч", ru: "Breakout: ракетка и мяч" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🏓 Фізика м'яча: dx та dy</h3><pre class="code-example">ball.dx = 4   # швидкість по X
ball.dy = -4  # швидкість по Y (вгору)

# Кожен кадр:
ball.setx(ball.xcor() + ball.dx)
ball.sety(ball.ycor() + ball.dy)

# Відбиття від стін:
if ball.xcor() > 275 or ball.xcor() < -275:
    ball.dx *= -1   # змінити напрямок X
if ball.ycor() > 185:
    ball.dy *= -1   # відбити від стелі

# Відбиття від ракетки:
if (abs(ball.xcor()-paddle.xcor()) < 65 and
        abs(ball.ycor()-paddle.ycor()) < 15):
    ball.dy = abs(ball.dy)  # летіти вгору</pre></div>`,
          ru: `<div class="theory-block"><h3>🏓 Физика мяча: dx и dy</h3><pre class="code-example">ball.dx = 4   # скорость по X
ball.dy = -4  # скорость по Y (вверх)

# Каждый кадр:
ball.setx(ball.xcor() + ball.dx)
ball.sety(ball.ycor() + ball.dy)

# Отражение от стен:
if ball.xcor() > 275 or ball.xcor() < -275:
    ball.dx *= -1   # изменить направление X
if ball.ycor() > 185:
    ball.dy *= -1   # вниз
if ball.ycor() < -185:
    # мяч упал — потеря очка!</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Ракетка рухається стрілками ← →. Не виходить за межі.", ru:"Ракетка движется стрелками. Не выходит за границы." }},
          { num:2, level:"easy",   text:{ uk:"М'яч рухається і відбивається від 3 стін (лівої, правої, верхньої).", ru:"Мяч движется и отражается от 3 стен." }},
          { num:3, level:"medium", text:{ uk:"М'яч відбивається від ракетки (летить вгору).", ru:"Мяч отражается от ракетки (летит вверх)." }},
          { num:4, level:"medium", text:{ uk:"При промаху (м'яч впав) — -1 life. 3 life. При 0 — Game Over.", ru:"При промахе -1 жизнь. 3 жизни. При 0 — Game Over." }},
          { num:5, level:"medium", text:{ uk:"Кут відбиття залежить від місця удару: центр ракетки → вертикально, край → під кутом.", ru:"Угол отражения зависит от места удара по ракетке." }},
          { num:6, level:"hard",   text:{ uk:"Прискорення: кожні 5 відбиттів від ракетки швидкість м'яча +0.5.", ru:"Ускорение: каждые 5 отражений скорость мяча +0.5." }},
          { num:7, level:"hard",   text:{ uk:"Пузирковий м'яч: після відбиття від ракетки залишає короткий слід (ефект).", ru:"Мяч оставляет короткий след после отражения от ракетки." }},
          { num:8, level:"star",   text:{ uk:"⭐ Дві ракетки і 2 м'ячі: верхня і нижня ракетки керуються різними клавішами.", ru:"⭐ Две ракетки и 2 мяча: верхняя и нижняя, разные клавиши." }}
        ],
        starterCode:
`import turtle
turtle.bgcolor("black"); turtle.tracer(0)

paddle = turtle.Turtle()
paddle.shape("square"); paddle.color("white")
paddle.shapesize(1,6,1); paddle.penup(); paddle.goto(0,-170)

ball = turtle.Turtle()
ball.shape("circle"); ball.color("gold"); ball.penup(); ball.goto(0,0)
ball.dx = 4; ball.dy = -4

lives = 3
hud = turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,165)

def update_hud():
    hud.clear()
    hud.write(f"{'❤️'*lives}  Breakout!", align="center", font=("Arial",13,"bold"))

update_hud()

def ml(): paddle.setx(max(-235,paddle.xcor()-25))
def mr(): paddle.setx(min(235,paddle.xcor()+25))
turtle.listen(); turtle.onkey(ml,"Left"); turtle.onkey(mr,"Right")

def loop():
    global lives
    ball.setx(ball.xcor()+ball.dx); ball.sety(ball.ycor()+ball.dy)
    if ball.xcor()>275 or ball.xcor()<-275: ball.dx*=-1
    if ball.ycor()>185: ball.dy*=-1
    if ball.ycor()<-200:
        lives-=1; update_hud(); ball.goto(0,0); ball.dy=abs(ball.dy)
        if lives<=0:
            over=turtle.Turtle(); over.hideturtle(); over.penup(); over.color("red"); over.goto(0,0)
            over.write("GAME OVER",align="center",font=("Arial",36,"bold")); return
    if abs(ball.xcor()-paddle.xcor())<65 and abs(ball.ycor()-paddle.ycor())<15 and ball.dy<0:
        ball.dy=abs(ball.dy)
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 42 — блоки ────────────────────────────────
      {
        id: 39,
        title: { uk: "Breakout: блоки і коллізії", ru: "Breakout: блоки и коллизии" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🧱 Сітка блоків</h3><pre class="code-example">blocks = []
for row in range(5):
    for col in range(8):
        b = turtle.Turtle()
        b.shape("square"); b.shapesize(1, 3, 1)
        b.penup()
        b.goto(-210 + col * 70, 100 - row * 30)
        blocks.append(b)

# Перевірка зіткнення м'яча з блоком:
for b in blocks[:]:
    if (abs(ball.xcor()-b.xcor()) < 50 and
            abs(ball.ycor()-b.ycor()) < 20):
        b.hideturtle()
        blocks.remove(b)
        ball.dy *= -1   # відбитись</pre></div>`,
          ru: `<div class="theory-block"><h3>🧱 Сетка блоков</h3><pre class="code-example">blocks = []
for row in range(5):
    for col in range(8):
        b = turtle.Turtle()
        b.shape("square"); b.shapesize(1, 3, 1)
        b.penup()
        b.goto(-210 + col * 70, 100 - row * 30)
        blocks.append(b)

# Проверка столкновения мяча с блоком:
for b in blocks[:]:
    if (abs(ball.xcor()-b.xcor()) < 40 and
        abs(ball.ycor()-b.ycor()) < 20):
        b.hideturtle(); blocks.remove(b)
        ball.dy *= -1; score += 1</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Намалюй 3 ряди по 8 блоків різних кольорів (списком).", ru:"Нарисуй 3 ряда по 8 блоков разных цветов." }},
          { num:2, level:"easy",   text:{ uk:"При зіткненні м'яча з блоком — блок зникає, м'яч відбивається.", ru:"При столкновении мяча с блоком — блок исчезает, мяч отражается." }},
          { num:3, level:"medium", text:{ uk:"Рахунок: кожен знищений блок +10. Відображай на екрані.", ru:"Счёт: каждый уничтоженный блок +10." }},
          { num:4, level:"medium", text:{ uk:"Різні очки за різні ряди: перший ряд +50, останній +10.", ru:"Разные очки за разные ряды." }},
          { num:5, level:"medium", text:{ uk:"Коли всі блоки знищені — 'ПЕРЕМОГА!' і наступний рівень.", ru:"Когда все блоки уничтожены — ПОБЕДА! и следующий уровень." }},
          { num:6, level:"hard",   text:{ uk:"Міцні блоки: деякі потребують 2 ударів. Після 1 удару змінюють колір.", ru:"Прочные блоки: 2 удара. После 1 удара меняют цвет." }},
          { num:7, level:"hard",   text:{ uk:"Power-up: деякі блоки при руйнуванні випускають бонус (широка ракетка або +life).", ru:"Power-up: некоторые блоки выпускают бонус при разрушении." }},
          { num:8, level:"star",   text:{ uk:"⭐ Повна гра Breakout: 5 рівнів з різними схемами блоків, рахунок, рекорд у файл.", ru:"⭐ Полный Breakout: 5 уровней, разные схемы блоков, рекорд в файл." }}
        ],
        starterCode:
`import turtle
turtle.bgcolor("black"); turtle.tracer(0)

paddle = turtle.Turtle()
paddle.shape("square"); paddle.color("white")
paddle.shapesize(1,6,1); paddle.penup(); paddle.goto(0,-170)

ball = turtle.Turtle()
ball.shape("circle"); ball.color("gold"); ball.penup(); ball.goto(0,0)
ball.dx=4; ball.dy=-4

# Блоки
blocks=[]; score=0; lives=3
colors=["red","orange","yellow","green","cyan"]
for row in range(5):
    for col in range(8):
        b=turtle.Turtle(); b.shape("square"); b.shapesize(1,3,1); b.penup()
        b.color(colors[row]); b.goto(-210+col*70,100-row*30)
        b.points = (4-row)*10+10  # більше очок за верхні ряди
        blocks.append(b)

hud=turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,165)
def upd(): hud.clear(); hud.write(f"Рах:{score} {'❤️'*lives}",align="center",font=("Arial",13,"bold"))
upd()

def ml(): paddle.setx(max(-235,paddle.xcor()-25))
def mr(): paddle.setx(min(235,paddle.xcor()+25))
turtle.listen(); turtle.onkey(ml,"Left"); turtle.onkey(mr,"Right")

def loop():
    global score,lives
    ball.setx(ball.xcor()+ball.dx); ball.sety(ball.ycor()+ball.dy)
    if ball.xcor()>275 or ball.xcor()<-275: ball.dx*=-1
    if ball.ycor()>185: ball.dy*=-1
    if ball.ycor()<-200:
        lives-=1; upd(); ball.goto(0,0); ball.dy=abs(ball.dy)
        if lives<=0: return
    if abs(ball.xcor()-paddle.xcor())<65 and abs(ball.ycor()-paddle.ycor())<15 and ball.dy<0:
        ball.dy=abs(ball.dy)
    for b in blocks[:]:
        if abs(ball.xcor()-b.xcor())<50 and abs(ball.ycor()-b.ycor())<20:
            score+=b.points; b.hideturtle(); blocks.remove(b); ball.dy*=-1; upd()
    if not blocks:
        win=turtle.Turtle(); win.hideturtle(); win.penup(); win.color("gold"); win.goto(0,0)
        win.write(f"ПЕРЕМОГА! {score}",align="center",font=("Arial",32,"bold")); return
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 43 — рівні Breakout ───────────────────────
      {
        id: 40,
        title: { uk: "Breakout: рівні та прискорення", ru: "Breakout: уровни и ускорение" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>📈 Генерація нового рівня</h3><pre class="code-example">def new_level(level_num):
    global blocks
    # Видалити старі блоки
    for b in blocks:
        b.hideturtle()
    blocks = []

    # Нова схема (більше на вищих рівнях)
    rows = min(3 + level_num, 7)
    cols = 8
    for row in range(rows):
        for col in range(cols):
            b = turtle.Turtle()
            ...
            blocks.append(b)

    # Прискорити м'яч
    speed_factor = 1 + level_num * 0.15
    ball.dx = 4 * speed_factor * (1 if ball.dx>0 else -1)
    ball.dy = abs(4 * speed_factor) * (-1)</pre></div>`,
          ru: `<div class="theory-block"><h3>📈 Генерация нового уровня</h3><pre class="code-example">def new_level(level_num):
    global blocks
    # Удалить старые блоки
    for b in blocks:
        b.hideturtle()
    blocks = []

    # Новая схема (больше на высоких уровнях)
    rows = min(3 + level_num, 7)
    cols = 8
    for row in range(rows):
        for col in range(cols):
            b = turtle.Turtle()
            ...
            blocks.append(b)

    # Ускорить мяч
    speed_factor = 1 + level_num * 0.15
    ball.dx = 4 * speed_factor * (1 if ball.dx>0 else -1)
    ball.dy = abs(4 * speed_factor) * (-1)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Після знищення всіх блоків — вивести 'Рівень 2!' і додати нові блоки.", ru:"После всех блоков — 'Уровень 2!' и новые блоки." }},
          { num:2, level:"easy",   text:{ uk:"На рівні 2 — більше рядів блоків (4→5 рядів). На рівні 3 — 6 рядів.", ru:"Уровень 2 — 5 рядов, уровень 3 — 6 рядов." }},
          { num:3, level:"medium", text:{ uk:"Швидкість м'яча збільшується на кожному рівні на 15%.", ru:"Скорость мяча увеличивается каждый уровень на 15%." }},
          { num:4, level:"medium", text:{ uk:"Ракетка стає на 10 пікселів вужчою на кожному рівні (мінімум 60px).", ru:"Ракетка уже на 10 пикселей каждый уровень (минимум 60px)." }},
          { num:5, level:"medium", text:{ uk:"Міцні блоки з'являються з рівня 3 (потребують 2 ударів).", ru:"Прочные блоки с уровня 3 (2 удара)." }},
          { num:6, level:"hard",   text:{ uk:"Нерухомі перешкоди: з рівня 4 — непробивні блоки (чорні), від яких відбивається м'яч.", ru:"Неуничтожаемые блоки с уровня 4 (чёрные, мяч отражается)." }},
          { num:7, level:"hard",   text:{ uk:"Бонусний рівень кожні 3 рівні: всі блоки дають подвійні очки.", ru:"Бонусный уровень каждые 3 уровня: все блоки дают двойные очки." }},
          { num:8, level:"star",   text:{ uk:"⭐ 5 різних схем блоків у файлах-рівнях. Читай схему з файлу (список рядків).", ru:"⭐ 5 разных схем блоков в файлах. Читай схему из файла." }}
        ],
        starterCode:
`import turtle
turtle.bgcolor("black"); turtle.tracer(0)

paddle = turtle.Turtle(); paddle.shape("square"); paddle.color("white")
paddle.shapesize(1,6,1); paddle.penup(); paddle.goto(0,-170)

ball = turtle.Turtle(); ball.shape("circle"); ball.color("gold")
ball.penup(); ball.goto(0,0); ball.dx=4; ball.dy=-4

blocks=[]; score=0; lives=3; level=1; paddle_width=[6]
COLORS=["red","orange","yellow","lime","cyan","blue"]

def make_level(n):
    global blocks
    for b in blocks: b.hideturtle()
    blocks=[]
    rows=min(2+n,6)
    for row in range(rows):
        for col in range(8):
            b=turtle.Turtle(); b.shape("square"); b.shapesize(1,3,1); b.penup()
            b.color(COLORS[row%len(COLORS)]); b.goto(-210+col*70,110-row*30)
            b.hp=2 if n>=3 and row<2 else 1
            blocks.append(b)

make_level(1)
hud=turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,165)
def upd(): hud.clear(); hud.write(f"Рів:{level} Рах:{score} {'❤️'*lives}",align="center",font=("Arial",13,"bold"))
upd()

def ml(): paddle.setx(max(-235,paddle.xcor()-25))
def mr(): paddle.setx(min(235,paddle.xcor()+25))
turtle.listen(); turtle.onkey(ml,"Left"); turtle.onkey(mr,"Right")

def loop():
    global score,lives,level
    ball.setx(ball.xcor()+ball.dx); ball.sety(ball.ycor()+ball.dy)
    if ball.xcor()>275 or ball.xcor()<-275: ball.dx*=-1
    if ball.ycor()>185: ball.dy*=-1
    if ball.ycor()<-200:
        lives-=1; upd(); ball.goto(0,0); ball.dy=abs(ball.dy)
        if lives<=0: return
    pw=paddle_width[0]*10+10
    if abs(ball.xcor()-paddle.xcor())<pw and abs(ball.ycor()-paddle.ycor())<15 and ball.dy<0:
        ball.dy=abs(ball.dy)
    for b in blocks[:]:
        if abs(ball.xcor()-b.xcor())<50 and abs(ball.ycor()-b.ycor())<20:
            b.hp-=1; ball.dy*=-1; score+=10; upd()
            if b.hp<=0: b.hideturtle(); blocks.remove(b)
            else: b.color("white")
    if not blocks:
        level+=1
        spd=1+level*0.15
        ball.dx=(4*spd)*(1 if ball.dx>0 else -1); ball.dy=-abs(4*spd)
        ball.goto(0,0); make_level(level)
        msg=turtle.Turtle(); msg.hideturtle(); msg.penup(); msg.color("gold"); msg.goto(0,50)
        msg.write(f"РІВЕНЬ {level}!",align="center",font=("Arial",28,"bold"))
        turtle.update(); turtle.ontimer(lambda: msg.clear(), 2000)
        upd()
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 44 — Pong: дві ракетки ────────────────────
      {
        id: 41,
        title: { uk: "Pong: дві ракетки", ru: "Pong: две ракетки" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🏓 Класичний Pong</h3><p>Дві вертикальні ракетки. М'яч летить між ними. Пропустив — суперник отримує очко.</p><pre class="code-example"># Ракетка 1 (ліва): клавіші W/S
# Ракетка 2 (права): клавіші ↑/↓

# Гол (куля пішла за ліву межу):
if ball.xcor() < -290:
    score_r += 1   # очко правому
    ball.goto(0,0); ball.dx = abs(ball.dx)

# Гол (права межа):
if ball.xcor() > 290:
    score_l += 1   # очко лівому
    ball.goto(0,0); ball.dx = -abs(ball.dx)</pre></div>`,
          ru: `<div class="theory-block"><h3>🏓 Классический Pong</h3><p>Две вертикальные ракетки. Мяч летит между ними. Пропустил — соперник получает очко.</p><pre class="code-example"># Ракетка 1 (левая): клавиши W/S
# Ракетка 2 (правая): клавиши ↑/↓

# Гол (мяч ушёл за левую границу):
if ball.xcor() < -290:
    score_r += 1   # очко правому
    ball.goto(0,0); ball.dx = abs(ball.dx)

# Гол (правая граница):
if ball.xcor() > 290:
    score_l += 1   # очко левому
    ball.goto(0,0); ball.dx = -abs(ball.dx)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Дві ракетки керуються клавішами (W/S і стрілки). М'яч відбивається.", ru:"Две ракетки (W/S и стрелки). Мяч отражается." }},
          { num:2, level:"easy",   text:{ uk:"Рахунок: лівий і правий гравець. Відображення вгорі.", ru:"Счёт двух игроков. Отображение вверху." }},
          { num:3, level:"medium", text:{ uk:"Гра до 5 очок. Переможець відображається на екрані.", ru:"Игра до 5 очков. Победитель на экране." }},
          { num:4, level:"medium", text:{ uk:"Кут відбиття залежить від місця удару (верх ракетки → вгору, низ → вниз).", ru:"Угол отражения зависит от места удара о ракетку." }},
          { num:5, level:"medium", text:{ uk:"М'яч прискорюється після кожного 5-го відбиття.", ru:"Мяч ускоряется после каждого 5-го отражения." }},
          { num:6, level:"hard",   text:{ uk:"Комп'ютерний суперник для однієї з ракеток (ракетка рухається до м'яча).", ru:"Компьютерный соперник: ракетка движется к мячу автоматически." }},
          { num:7, level:"hard",   text:{ uk:"Рівні складності ШІ: easy (повільна реакція), hard (точне слідування).", ru:"Уровни сложности ИИ: easy (медленный), hard (точный)." }},
          { num:8, level:"star",   text:{ uk:"⭐ Pong для 2 гравців з рахунком, ефектами при голі, звуком (winsound.Beep).", ru:"⭐ Pong для 2 игроков: счёт, эффекты при голе, звук." }}
        ],
        starterCode:
`import turtle
turtle.bgcolor("black"); turtle.tracer(0)


# Середня лінія
mid=turtle.Turtle(); mid.hideturtle(); mid.penup(); mid.pencolor("gray")
mid.goto(0,190)
for _ in range(19):
    mid.pendown(); mid.forward(15); mid.penup(); mid.backward(35)

# Ракетки
def make_paddle(x):
    p=turtle.Turtle(); p.shape("square"); p.color("white")
    p.shapesize(5,1,1); p.penup(); p.goto(x,0); return p

p1=make_paddle(-270); p2=make_paddle(270)

# М'яч
ball=turtle.Turtle(); ball.shape("circle"); ball.color("white")
ball.penup(); ball.goto(0,0); ball.dx=5; ball.dy=3

# Рахунок
s1,s2=0,0
hud=turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,165)
def upd(): hud.clear(); hud.write(f"{s1}   vs   {s2}",align="center",font=("Arial",20,"bold"))
upd()

def w1_up():   p1.sety(min(155,p1.ycor()+20))
def w1_down(): p1.sety(max(-155,p1.ycor()-20))
def w2_up():   p2.sety(min(155,p2.ycor()+20))
def w2_down(): p2.sety(max(-155,p2.ycor()-20))
turtle.listen()
turtle.onkey(w1_up,"w"); turtle.onkey(w1_down,"s")
turtle.onkey(w2_up,"Up"); turtle.onkey(w2_down,"Down")

def loop():
    global s1,s2
    ball.setx(ball.xcor()+ball.dx); ball.sety(ball.ycor()+ball.dy)
    if ball.ycor()>180 or ball.ycor()<-180: ball.dy*=-1
    # Відбиття
    if abs(ball.xcor()-p1.xcor())<15 and abs(ball.ycor()-p1.ycor())<55 and ball.dx<0:
        ball.dx=abs(ball.dx)
    if abs(ball.xcor()-p2.xcor())<15 and abs(ball.ycor()-p2.ycor())<55 and ball.dx>0:
        ball.dx=-abs(ball.dx)
    # Голи
    if ball.xcor()<-295:
        s2+=1; upd(); ball.goto(0,0); ball.dx=abs(ball.dx)
    if ball.xcor()>295:
        s1+=1; upd(); ball.goto(0,0); ball.dx=-abs(ball.dx)
    if s1>=5 or s2>=5:
        win=turtle.Turtle(); win.hideturtle(); win.penup(); win.color("gold"); win.goto(0,0)
        win.write(f"Переміг {'Гравець 1' if s1>=5 else 'Гравець 2'}!",align="center",font=("Arial",28,"bold")); return
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 45 — Pong: ШІ та рекорд ──────────────────
      {
        id: 42,
        title: { uk: "Pong vs Комп'ютер", ru: "Pong против Компьютера" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block"><h3>🤖 Простий ШІ для ракетки</h3><pre class="code-example"># ШІ: ракетка рухається до м'яча
AI_SPEED = 3   # повільніше = легший ШІ

def move_ai():
    if ball.ycor() > ai_paddle.ycor() + 5:
        ai_paddle.sety(min(155, ai_paddle.ycor() + AI_SPEED))
    elif ball.ycor() < ai_paddle.ycor() - 5:
        ai_paddle.sety(max(-155, ai_paddle.ycor() - AI_SPEED))

# Виклик у циклі:
move_ai()</pre></div>`,
          ru: `<div class="theory-block"><h3>🤖 Простой ИИ для ракетки</h3><pre class="code-example"># ИИ: ракетка движется к мячу
AI_SPEED = 3   # медленнее = легче ИИ

def move_ai():
    if ball.ycor() > ai_paddle.ycor() + 5:
        ai_paddle.sety(min(155, ai_paddle.ycor() + AI_SPEED))
    elif ball.ycor() < ai_paddle.ycor() - 5:
        ai_paddle.sety(max(-155, ai_paddle.ycor() - AI_SPEED))

# Зона мертвого угла (5 пикселей) — без неё ракетка дрожит!</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"ШІ ракетка: рухається до м'яча зі швидкістю 3. Спробуй перемогти!", ru:"ИИ ракетка со скоростью 3. Попробуй победить!" }},
          { num:2, level:"easy",   text:{ uk:"Зміни AI_SPEED на 5. Тепер важче. Зміни на 1 — легко.", ru:"AI_SPEED=5 — сложно. AI_SPEED=1 — легко." }},
          { num:3, level:"medium", text:{ uk:"3 рівні складності: Easy(1), Normal(3), Hard(5). Вибір перед грою.", ru:"3 уровня сложности: Easy/Normal/Hard. Выбор перед игрой." }},
          { num:4, level:"medium", text:{ uk:"Рахунок зберігається у файл. Кількість перемог і поразок.", ru:"Счёт в файл: количество побед и поражений." }},
          { num:5, level:"medium", text:{ uk:"ШІ з 'помилками': іноді (5% шансів) ШІ рухається у неправильний бік.", ru:"ИИ с 'ошибками': 5% шанс движения в неправильную сторону." }},
          { num:6, level:"hard",   text:{ uk:"Передбачення: ШІ розраховує де буде м'яч, а не просто слідує.", ru:"Предсказание: ИИ рассчитывает куда полетит мяч." }},
          { num:7, level:"hard",   text:{ uk:"Анімація голу: при пропущеному голі — екран миготить кольором.", ru:"Анимация гола: при пропущенном голе экран мигает цветом." }},
          { num:8, level:"star",   text:{ uk:"⭐ Турнір: 3 матчі до 5 очок. Рахунок серії. Фінальна таблиця з файлу.", ru:"⭐ Турнир: 3 матча до 5 очков. Финальная таблица из файла." }}
        ],
        starterCode:
`import turtle, random

turtle.bgcolor("black"); turtle.tracer(0)


mid=turtle.Turtle(); mid.hideturtle(); mid.penup(); mid.pencolor("gray")
mid.goto(0,190)
for _ in range(19): mid.pendown(); mid.forward(15); mid.penup(); mid.backward(35)

player=turtle.Turtle(); player.shape("square"); player.color("cyan")
player.shapesize(5,1,1); player.penup(); player.goto(-270,0)

ai=turtle.Turtle(); ai.shape("square"); ai.color("red")
ai.shapesize(5,1,1); ai.penup(); ai.goto(270,0)

ball=turtle.Turtle(); ball.shape("circle"); ball.color("white")
ball.penup(); ball.goto(0,0); ball.dx=5; ball.dy=random.choice([3,-3])

AI_SPEED=3
ps,cs=0,0
hud=turtle.Turtle(); hud.hideturtle(); hud.penup(); hud.color("white"); hud.goto(0,165)
def upd(): hud.clear(); hud.write(f"Ти: {ps}   ШІ: {cs}",align="center",font=("Arial",20,"bold"))
upd()

def pu(): player.sety(min(155,player.ycor()+20))
def pd(): player.sety(max(-155,player.ycor()-20))
turtle.listen(); turtle.onkey(pu,"Up"); turtle.onkey(pd,"Down")

def loop():
    global ps,cs
    ball.setx(ball.xcor()+ball.dx); ball.sety(ball.ycor()+ball.dy)
    if ball.ycor()>180 or ball.ycor()<-180: ball.dy*=-1
    # ШІ рухається
    if ball.ycor()>ai.ycor()+5: ai.sety(min(155,ai.ycor()+AI_SPEED))
    elif ball.ycor()<ai.ycor()-5: ai.sety(max(-155,ai.ycor()-AI_SPEED))
    # Відбиття
    if abs(ball.xcor()-player.xcor())<15 and abs(ball.ycor()-player.ycor())<55 and ball.dx<0:
        ball.dx=abs(ball.dx); ball.dy+=random.uniform(-1,1)
    if abs(ball.xcor()-ai.xcor())<15 and abs(ball.ycor()-ai.ycor())<55 and ball.dx>0:
        ball.dx=-abs(ball.dx)
    if ball.xcor()<-295: cs+=1; upd(); ball.goto(0,0); ball.dx=abs(ball.dx)
    if ball.xcor()>295: ps+=1; upd(); ball.goto(0,0); ball.dx=-abs(ball.dx)
    if ps>=5 or cs>=5:
        win=turtle.Turtle(); win.hideturtle(); win.penup()
        win.color("gold" if ps>=5 else "red"); win.goto(0,0)
        win.write("ТИ ПЕРЕМІГ!" if ps>=5 else "ШІ ПЕРЕМІГ",align="center",font=("Arial",28,"bold")); return
    turtle.tracer(0); turtle.update(); turtle.ontimer(loop,16)

loop()
`
      },

      // ── Урок 46 — проект Модуля 4 ──────────────────────
      {
        id: 43,
        title: { uk: "Проект Модуля 4: Breakout або Pong", ru: "Проект Модуля 4: Breakout или Pong" },
        canvasMode: true,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🏆 Фінальний проект Модуля 4!</h3><p>Вибери свій проект:</p><ul><li>🧱 <b>Breakout</b> — руйнуй блоки, рівні, рекорд у файл</li><li>🏓 <b>Pong</b> — проти ШІ або 2 гравці</li><li>🎯 <b>Своя ідея</b> — гра з ракеткою і м'ячем</li></ul></div><div class="theory-block"><h3>✅ Чеклист проекту</h3><ul><li>☐ Рахунок відображається</li><li>☐ Рівні або система очок</li><li>☐ Рекорд зберігається у файл</li><li>☐ Екран GameOver / Перемога</li><li>☐ Можна почати нову гру (рестарт)</li><li>☐ Підпис автора</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🏆 Финальный проект Модуля 4!</h3><p>Выбери свой проект:</p><ul><li>🧱 <b>Breakout</b> — разрушай блоки, уровни, рекорд в файл</li><li>🏓 <b>Pong</b> — против ИИ или 2 игрока</li><li>🎯 <b>Своя идея</b> — игра с ракеткой и мячом</li></ul></div><div class="theory-block"><h3>✅ Чеклист проекта</h3><ul><li>☐ Счёт отображается</li><li>☐ Уровни или система очков</li><li>☐ Рекорд сохраняется в файл</li><li>☐ Экран GameOver / Победа</li><li>☐ Можно начать новую игру (рестарт)</li><li>☐ Подпись автора</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"Зроби робочий Breakout з 3 рядами блоків, рахунком і GameOver.", ru:"Работающий Breakout с 3 рядами, счётом и GameOver." }},
          { num:2, level:"easy",   text:{ uk:"Зроби робочий Pong проти ШІ (до 5 очок).", ru:"Работающий Pong против ИИ (до 5 очков)." }},
          { num:3, level:"medium", text:{ uk:"Breakout з 5 рівнями (схема блоків міняється, м'яч прискорюється).", ru:"Breakout с 5 уровнями. Блоки меняются, мяч ускоряется." }},
          { num:4, level:"medium", text:{ uk:"Pong з 3 рівнями складності ШІ. Вибір перед грою.", ru:"Pong с 3 уровнями сложности ИИ. Выбор перед игрой." }},
          { num:5, level:"medium", text:{ uk:"Будь-яка гра: рекорд зберігається у файл і відображається при запуску.", ru:"Любая игра: рекорд в файл, отображается при запуске." }},
          { num:6, level:"hard",   text:{ uk:"Breakout + power-ups: wide_paddle, slow_ball, extra_life (падають з блоків).", ru:"Breakout + power-ups: wide_paddle, slow_ball, extra_life." }},
          { num:7, level:"hard",   text:{ uk:"Pong-турнір: 3 матчі підряд, загальний рахунок, збереження.", ru:"Pong-турнир: 3 матча, общий счёт, сохранение." }},
          { num:8, level:"star",   text:{ uk:"⭐ СВОЯ ГРА з ракеткою і м'ячем! Унікальна механіка, красиве оформлення.", ru:"⭐ СВОЯ ИГРА с ракеткой и мячом! Уникальная механика." }}
        ],
        starterCode:
`import turtle, random

# ══════════════════════════════════════════════════════════
# МІЙ ПРОЕКТ МОДУЛЯ 4
# Назва гри: ____________________
# Тип: [ ] Breakout  [ ] Pong  [ ] Своя ідея
# Автор: ________________________
# ══════════════════════════════════════════════════════════

turtle.bgcolor("black"); turtle.tracer(0)

def load_record(filename):
    try:
        with open(filename,"r") as f: return int(f.read())
    except: return 0

def save_record(filename, score):
    with open(filename,"w") as f: f.write(str(score))

RECORD_FILE = "module4_record.txt"
record = load_record(RECORD_FILE)

# ── Меню ────────────────────────────────────────────────
menu = turtle.Turtle(); menu.hideturtle(); menu.penup()
menu.color("gold"); menu.goto(0,60)
menu.write("МІЙ ПРОЕКТ", align="center", font=("Arial",40,"bold"))
sub=turtle.Turtle(); sub.hideturtle(); sub.penup()
sub.color("white"); sub.goto(0,0)
sub.write(f"Рекорд: {record}", align="center", font=("Arial",20,"normal"))
hint=turtle.Turtle(); hint.hideturtle(); hint.penup()
hint.color("gray"); hint.goto(0,-50)
hint.write("Пробіл → почати", align="center", font=("Arial",16,"normal"))

started=[False]
def start():
    if started[0]: return
    started[0]=True
    menu.clear(); sub.clear(); hint.clear()
    # ТУТ ЗАПУСКАЙ СВОЮ ГРУ

turtle.listen(); turtle.onkey(start,"space")
`
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  МОДУЛЬ 5 — Вступ до Pygame (уроки 56-75)
  // ══════════════════════════════════════════════════════════
  {
    moduleId: 5,
    moduleTitle: { uk: "Вступ до Pygame", ru: "Введение в Pygame" },
    moduleIcon: "🕹️",
    lessons: [
// ── Урок 44 — Встановлення Pygame ───────────────────
      {
        id: 44,
        title: { uk: "Встановлення Pygame. Перше вікно", ru: "Установка Pygame. Первое окно" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що ти вивчив у Модулі 4? Яку гру зробив на turtle?<br>Сьогодні починаємо Модуль 5 — справжній pygame!</p></div><div class="theory-block"><h3>🎮 Структура Pygame програми</h3><pre class="code-example">import pygame, sys
pygame.init()                           # запустити pygame

screen = pygame.display.set_mode((800, 600))   # вікно
pygame.display.set_caption("Моя гра")  # заголовок
clock = pygame.time.Clock()

while True:                             # ігровий цикл
    for event in pygame.event.get():   # події
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    screen.fill((0, 0, 50))            # фон (R, G, B)
    pygame.draw.rect(screen, (255,255,0), (300, 200, 100, 100))

    pygame.display.flip()              # оновити екран
    clock.tick(60)                     # 60 кадрів/сек</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что ты изучил в Модуле 4? Какую игру сделал на turtle?<br>Сегодня начинаем Модуль 5 — настоящий pygame!</p></div><div class="theory-block"><h3>🎮 Структура Pygame программы</h3><pre class="code-example">import pygame, sys
pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Моя игра")
clock = pygame.time.Clock()

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    screen.fill((0, 0, 50))       # фон (R, G, B)
    pygame.draw.rect(screen, (255,255,0), (300,200,100,100))

    pygame.display.flip()          # обновить экран
    clock.tick(60)                 # 60 кадров/сек</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Встанови Pygame (pip install pygame). Відкрий вікно 800×600 з чорним фоном.", ru:"⭐ Установи Pygame. Открой окно 800×600 с чёрным фоном." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зміни розмір вікна на 1024×768. Додай заголовок зі своїм ім'ям.", ru:"⭐ Измени размер окна на 1024×768. Добавь заголовок со своим именем." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Намалюй: pygame.draw.rect, pygame.draw.circle, pygame.draw.line.", ru:"⭐⭐ Нарисуй: pygame.draw.rect, pygame.draw.circle, pygame.draw.line." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Фон-градієнт: верх синій, низ зелений (два прямокутники).", ru:"⭐⭐ Фон-градиент: верх синий, низ зелёный (два прямоугольника)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Намалюй Minecraft-блок: заливка + сітка ліній поверх.", ru:"⭐⭐ Нарисуй Minecraft-блок: заливка + сетка линий поверх." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Намалюй сонячну систему: коло-сонце + 3 кола-планети.", ru:"⭐⭐⭐ Нарисуй солнечную систему: круг-солнце + 3 круга-планеты." }},
          { num:7, level:"hard",   text:{ uk:"⭐⭐⭐ Намалюй простий замок із прямокутників різного розміру.", ru:"⭐⭐⭐ Нарисуй простой замок из прямоугольников разного размера." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Намалюй Minecraft-сцену: небо, трава, блоки, сонце, хмари.", ru:"⭐⭐⭐⭐ Нарисуй Minecraft-сцену: небо, трава, блоки, солнце, облака." }}
        ],
        starterCode: `# ⚠️ Запускай у Thonny! (pip install pygame)
import pygame, sys
pygame.init()

screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Мій перший Pygame!")
clock = pygame.time.Clock()

# Кольори (R, G, B)
BLACK  = (0,   0,   0)
WHITE  = (255, 255, 255)
RED    = (200, 50,  50)
GREEN  = (50,  180, 50)
BLUE   = (30,  100, 200)
YELLOW = (255, 220, 0)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    # Фон
    screen.fill(BLUE)
    pygame.draw.rect(screen, GREEN, (0, 450, 800, 150))

    # Сонце
    pygame.draw.circle(screen, YELLOW, (680, 80), 60)

    # Minecraft-блок
    pygame.draw.rect(screen, (100, 70, 30), (300, 350, 100, 100))
    for x in range(0, 101, 25):
        pygame.draw.line(screen, BLACK, (300+x,350),(300+x,450), 1)
    for y in range(0, 101, 25):
        pygame.draw.line(screen, BLACK, (300,350+y),(400,350+y), 1)

    pygame.display.flip()
    clock.tick(60)
`
      },

      {
        id: 45,
        title: { uk: "Кольори та фігури", ru: "Цвета и фигуры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що таке пікселі? Як задати колір у Pygame? Згадай: <b>(R, G, B)</b> — три числа 0-255.</p></div><div class="theory-block"><h3>📦 Малювання фігур</h3><pre class="code-example">pygame.draw.rect(screen, (255,0,0), (x,y,w,h))
pygame.draw.circle(screen, (0,255,0), (cx,cy), r)
pygame.draw.line(screen, (0,0,255), (x1,y1), (x2,y2), 3)
pygame.draw.polygon(screen, (255,255,0), [(x1,y1),(x2,y2),(x3,y3)])</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что такое пиксели? Как задать цвет в Pygame? Вспомни: <b>(R, G, B)</b> — три числа 0-255.</p></div><div class="theory-block"><h3>📦 Рисование фигур</h3><pre class="code-example">pygame.draw.rect(screen, (255,0,0), (x,y,w,h))
pygame.draw.circle(screen, (0,255,0), (cx,cy), r)
pygame.draw.line(screen, (0,0,255), (x1,y1), (x2,y2), 3)
pygame.draw.polygon(screen, (255,255,0), [(x1,y1),(x2,y2),(x3,y3)])</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Намалюй синє небо та зелену землю", ru:"⭐ Нарисуй синее небо и зелёную землю" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Додай жовте сонце (коло)", ru:"⭐ Добавь жёлтое солнце (круг)" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай коричневий будинок (прямокутник)", ru:"⭐⭐ Добавь коричневый дом (прямоугольник)" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай зелене дерево (коло на прямокутнику)", ru:"⭐⭐ Добавь зелёное дерево (круг на прямоугольнике)" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай білі хмари", ru:"⭐⭐ Добавь белые облака" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Намалюй алмаз за допомогою polygon", ru:"⭐⭐⭐ Нарисуй алмаз с помощью polygon" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Додай сітку на будинок як у Minecraft", ru:"⭐⭐⭐⭐ Добавь сетку на дом как в Minecraft" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Намалюй повне Minecraft-село з 3 будинками", ru:"⭐⭐⭐⭐ Нарисуй полную Minecraft-деревню с 3 домами" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Урок 47 — Фігури")
clock = pygame.time.Clock()

# Кольори
SKY   = (135, 206, 235)
GRASS = (34, 139, 34)
SUN   = (255, 220, 0)
BROWN = (100, 70, 30)
GREEN = (0, 180, 0)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    # Небо
    screen.fill(SKY)
    # Земля
    pygame.draw.rect(screen, GRASS, (0, 300, 600, 100))
    # Сонце
    pygame.draw.circle(screen, SUN, (80, 80), 40)
    # Будинок
    pygame.draw.rect(screen, BROWN, (200, 200, 120, 100))
    # Дах (трикутник)
    pygame.draw.polygon(screen, (180, 60, 60), [(200,200),(260,150),(320,200)])
    # Дерево — стовбур
    pygame.draw.rect(screen, (100, 60, 20), (420, 250, 20, 60))
    # Дерево — крона
    pygame.draw.circle(screen, GREEN, (430, 230), 40)
    # Хмари
    pygame.draw.ellipse(screen, WHITE, (300, 50, 100, 40))
    pygame.draw.ellipse(screen, WHITE, (340, 40, 80, 35))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 46,
        title: { uk: "Текст на екрані", ru: "Текст на экране" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як вивести текст у Python? Чим <code>print()</code> відрізняється від тексту у Pygame?</p></div><div class="theory-block"><h3>📦 Шрифти та текст</h3><pre class="code-example">font = pygame.font.SysFont("arial", 36)
text_surf = font.render("Hello!", True, (255,255,255))
screen.blit(text_surf, (x, y))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как вывести текст в Python? Чем <code>print()</code> отличается от текста в Pygame?</p></div><div class="theory-block"><h3>📦 Шрифты и текст</h3><pre class="code-example">font = pygame.font.SysFont("arial", 36)
text_surf = font.render("Hello!", True, (255,255,255))
screen.blit(text_surf, (x, y))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Відобрази \"Hello Pygame!\" на екрані", ru:"⭐ Отобрази \"Hello Pygame!\" на экране" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Покажи рахунок score=0 у верхньому лівому куті", ru:"⭐ Покажи счёт score=0 в верхнем левом углу" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Зміни розмір шрифту на 48", ru:"⭐⭐ Измени размер шрифта на 48" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Відображай час, що минув", ru:"⭐⭐ Отображай прошедшее время" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Покажи \"GAME OVER\" по центру", ru:"⭐⭐ Покажи \"GAME OVER\" по центру" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Відображай 3 рядки тексту різними кольорами", ru:"⭐⭐⭐ Отображай 3 строки текста разными цветами" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Зроби блимаючий текст (кожні 30 кадрів)", ru:"⭐⭐⭐⭐ Сделай мигающий текст (каждые 30 кадров)" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ HUD з рахунком, рівнем та життями", ru:"⭐⭐⭐⭐ HUD со счётом, уровнем и жизнями" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Урок 48 — Текст")
clock = pygame.time.Clock()

# Шрифти
font_big  = pygame.font.SysFont("arial", 48)
font_med  = pygame.font.SysFont("arial", 32)
font_small= pygame.font.SysFont("arial", 24)

score = 0
frame = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    screen.fill((30, 30, 50))
    frame += 1

    # Заголовок
    t1 = font_big.render("Hello Pygame!", True, (255, 220, 0))
    screen.blit(t1, (600//2 - t1.get_width()//2, 80))

    # Рахунок
    t2 = font_med.render(f"Score: {score}", True, (255, 255, 255))
    screen.blit(t2, (10, 10))

    # Час
    secs = frame // 60
    t3 = font_small.render(f"Time: {secs}s", True, (180, 255, 180))
    screen.blit(t3, (10, 50))

    # Блимаючий текст
    if (frame // 30) % 2 == 0:
        t4 = font_big.render("PRESS SPACE", True, (255, 100, 100))
        screen.blit(t4, (600//2 - t4.get_width()//2, 250))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 47,
        title: { uk: "Рух персонажа", ru: "Движение персонажа" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як перевірити натискання клавіші у Pygame? Що таке <code>key.get_pressed()</code>?</p></div><div class="theory-block"><h3>📦 Рух клавішами</h3><pre class="code-example">keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:  x -= speed
if keys[pygame.K_RIGHT]: x += speed
# Обмеження
x = max(0, min(x, WIDTH - size))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как проверить нажатие клавиши в Pygame? Что такое <code>key.get_pressed()</code>?</p></div><div class="theory-block"><h3>📦 Движение клавишами</h3><pre class="code-example">keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:  x -= speed
if keys[pygame.K_RIGHT]: x += speed
# Ограничение
x = max(0, min(x, WIDTH - size))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Синій прямокутник рухається стрілками", ru:"⭐ Синий прямоугольник движется стрелками" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Додай змінну speed=5", ru:"⭐ Добавь переменную speed=5" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Гравець не виходить за межі екрану", ru:"⭐⭐ Игрок не выходит за границы экрана" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Змінюй колір під час руху", ru:"⭐⭐ Меняй цвет во время движения" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Залишай слід з точок", ru:"⭐⭐ Оставляй след из точек" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Показуй координати x,y на екрані", ru:"⭐⭐⭐ Показывай координаты x,y на экране" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Нормалізуй діагональну швидкість", ru:"⭐⭐⭐⭐ Нормализуй диагональную скорость" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Додай спринт клавішею SHIFT", ru:"⭐⭐⭐⭐ Добавь спринт клавишей SHIFT" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 49 — Рух")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 24)

# Гравець
px, py = WIDTH//2, HEIGHT//2
size  = 40
speed = 5
trail = []  # слід

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    moving = False
    if keys[pygame.K_LEFT]:  px -= speed; moving = True
    if keys[pygame.K_RIGHT]: px += speed; moving = True
    if keys[pygame.K_UP]:    py -= speed; moving = True
    if keys[pygame.K_DOWN]:  py += speed; moving = True

    # Утримуємо в межах
    px = max(0, min(px, WIDTH  - size))
    py = max(0, min(py, HEIGHT - size))

    # Слід
    trail.append((px + size//2, py + size//2))
    if len(trail) > 40:
        trail.pop(0)

    screen.fill((20, 20, 40))

    # Малюємо слід
    for i, (tx, ty) in enumerate(trail):
        pygame.draw.circle(screen, (0, 100, 200), (tx, ty), max(1, i//5))

    # Гравець
    color = (0, 200, 255) if moving else (0, 100, 200)
    pygame.draw.rect(screen, color, (px, py, size, size))

    # Координати
    t = font.render(f"x={px}  y={py}", True, (255,255,255))
    screen.blit(t, (10, 10))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 48,
        title: { uk: "Миша та кліки", ru: "Мышь и клики" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як дізнатись де знаходиться курсор? Яка різниця між подією та станом?</p></div><div class="theory-block"><h3>📦 Миша у Pygame</h3><pre class="code-example">mx, my = pygame.mouse.get_pos()
buttons = pygame.mouse.get_pressed()
if buttons[0]:   # ліва кнопка
    pygame.draw.circle(screen, color, (mx,my), 5)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как узнать где находится курсор? Какая разница между событием и состоянием?</p></div><div class="theory-block"><h3>📦 Мышь в Pygame</h3><pre class="code-example">mx, my = pygame.mouse.get_pos()
buttons = pygame.mouse.get_pressed()
if buttons[0]:   # левая кнопка
    pygame.draw.circle(screen, color, (mx,my), 5)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Показуй координати миші на екрані", ru:"⭐ Показывай координаты мыши на экране" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Малюй точку при кліку", ru:"⭐ Рисуй точку при клике" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Малюй поки тримаєш кнопку", ru:"⭐⭐ Рисуй пока держишь кнопку" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Стирай правою кнопкою", ru:"⭐⭐ Стирай правой кнопкой" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Змінюй колір пензля клавішами", ru:"⭐⭐ Меняй цвет кисти клавишами" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Змінюй розмір пензля UP/DOWN", ru:"⭐⭐⭐ Меняй размер кисти UP/DOWN" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Очисти екран клавішею C", ru:"⭐⭐⭐⭐ Очисти экран клавишей C" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Збережи малюнок як скріншот", ru:"⭐⭐⭐⭐ Сохрани рисунок как скриншот" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 50 — Миша")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 22)

canvas = pygame.Surface((WIDTH, HEIGHT))
canvas.fill((30, 30, 30))

COLORS = [(255,80,80),(80,255,80),(80,180,255),(255,220,0),(255,255,255)]
color_idx = 0
brush_size = 8

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_c:
                canvas.fill((30, 30, 30))  # очистити
            if event.key == pygame.K_UP:
                brush_size = min(brush_size + 2, 40)
            if event.key == pygame.K_DOWN:
                brush_size = max(brush_size - 2, 2)
            if event.key == pygame.K_SPACE:
                color_idx = (color_idx + 1) % len(COLORS)
        if event.type == pygame.KEYDOWN and event.key == pygame.K_s:
            pygame.image.save(canvas, "drawing.png")

    mx, my = pygame.mouse.get_pos()
    buttons = pygame.mouse.get_pressed()
    if buttons[0]:  # ліва — малювати
        pygame.draw.circle(canvas, COLORS[color_idx], (mx, my), brush_size)
    if buttons[2]:  # права — стирати
        pygame.draw.circle(canvas, (30, 30, 30), (mx, my), brush_size * 2)

    screen.blit(canvas, (0, 0))
    info = font.render(f"({mx},{my})  size={brush_size}  C=очистити", True, (200,200,200))
    screen.blit(info, (5, 5))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 49,
        title: { uk: "Прямокутні зіткнення", ru: "Прямоугольные коллизии" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як дізнатись чи два об'єкти торкаються? У реальному житті — зупиняємось перед стіною. У грі — перевіряємо координати.</p></div><div class="theory-block"><h3>📦 pygame.Rect та colliderect</h3><pre class="code-example">player = pygame.Rect(x, y, w, h)
coin   = pygame.Rect(cx, cy, 20, 20)
if player.colliderect(coin):
    print("Зібрав!")</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как узнать касаются ли два объекта? В жизни — останавливаемся перед стеной. В игре — проверяем координаты.</p></div><div class="theory-block"><h3>📦 pygame.Rect и colliderect</h3><pre class="code-example">player = pygame.Rect(x, y, w, h)
coin   = pygame.Rect(cx, cy, 20, 20)
if player.colliderect(coin):
    print("Зібрав!")</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Створи Rect гравця та монети", ru:"⭐ Создай Rect игрока и монеты" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Перевір чи вони перетинаються", ru:"⭐ Проверь пересекаются ли они" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Виведи 'Зібрав!' при зіткненні", ru:"⭐⭐ Выведи 'Собрал!' при столкновении" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Перемісти монету у випадкове місце", ru:"⭐⭐ Перемести монету в случайное место" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Показуй рахунок", ru:"⭐⭐ Показывай счёт" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Додай 5 монет одночасно", ru:"⭐⭐⭐ Добавь 5 монет одновременно" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Додай таймер зворотного відліку", ru:"⭐⭐⭐⭐ Добавь таймер обратного отсчёта" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Ворог-прямокутник: гра скінчена при дотику", ru:"⭐⭐⭐⭐ Враг-прямоугольник: игра кончается при касании" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 51 — Зіткнення")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 28)

# Гравець
player = pygame.Rect(280, 180, 40, 40)
speed  = 5

# Монети
def new_coin():
    return pygame.Rect(random.randint(0, WIDTH-20), random.randint(0, HEIGHT-20), 20, 20)

coins = [new_coin() for _ in range(5)]
score = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player.x -= speed
    if keys[pygame.K_RIGHT]: player.x += speed
    if keys[pygame.K_UP]:    player.y -= speed
    if keys[pygame.K_DOWN]:  player.y += speed
    player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

    # Збираємо монети
    for i in range(len(coins)-1, -1, -1):
        if player.colliderect(coins[i]):
            coins[i] = new_coin()
            score += 1

    screen.fill((20, 20, 40))

    # Монети
    for c in coins:
        pygame.draw.ellipse(screen, (255, 220, 0), c)

    # Гравець
    pygame.draw.rect(screen, (0, 180, 255), player)

    # Рахунок
    t = font.render(f"Зібрано: {score}", True, (255,255,255))
    screen.blit(t, (10, 10))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 50,
        title: { uk: "Список ворогів", ru: "Список врагов" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як зберегти багато ворогів? Список словників! Кожен ворог — <code>{"x":…,"y":…,"dx":…,"dy":…}</code></p></div><div class="theory-block"><h3>📦 Список ворогів</h3><pre class="code-example">enemies = [{"x":100,"y":50,"dx":3,"dy":2,"color":(255,0,0)} for _ in range(5)]
for e in enemies:
    e["x"] += e["dx"]
    if e["x"] < 0 or e["x"] > WIDTH: e["dx"] *= -1</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как хранить много врагов? Список словарей! Каждый враг — <code>{"x":…,"y":…,"dx":…,"dy":…}</code></p></div><div class="theory-block"><h3>📦 Список врагов</h3><pre class="code-example">enemies = [{"x":100,"y":50,"dx":3,"dy":2,"color":(255,0,0)} for _ in range(5)]
for e in enemies:
    e["x"] += e["dx"]
    if e["x"] < 0 or e["x"] > WIDTH: e["dx"] *= -1</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Створи один словник ворога", ru:"⭐ Создай один словарь врага" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зроби щоб ворог відбивався від стін", ru:"⭐ Сделай чтобы враг отскакивал от стен" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай 5 ворогів у список", ru:"⭐⭐ Добавь 5 врагов в список" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Малюй усіх ворогів з циклом", ru:"⭐⭐ Рисуй всех врагов в цикле" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зіткнення з гравцем — втрата життя", ru:"⭐⭐ Столкновение с игроком — потеря жизни" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Показуй лічильник життів", ru:"⭐⭐⭐ Показывай счётчик жизней" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Кожні 5 секунд з'являється новий ворог", ru:"⭐⭐⭐⭐ Каждые 5 секунд появляется новый враг" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Різні швидкості та розміри ворогів", ru:"⭐⭐⭐⭐ Разные скорости и размеры врагов" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 52 — Вороги")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 28)

player = pygame.Rect(280, 180, 40, 40)
speed  = 5
lives  = 3
invincible = 0  # кадри невразливості

def make_enemy():
    return {
        "x": random.randint(0, WIDTH-30),
        "y": random.randint(0, HEIGHT-30),
        "dx": random.choice([-3,-2,-1,1,2,3]),
        "dy": random.choice([-3,-2,-1,1,2,3]),
        "size": random.randint(20, 40),
        "color": (random.randint(180,255), random.randint(0,80), random.randint(0,80))
    }

enemies = [make_enemy() for _ in range(5)]
spawn_timer = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player.x -= speed
    if keys[pygame.K_RIGHT]: player.x += speed
    if keys[pygame.K_UP]:    player.y -= speed
    if keys[pygame.K_DOWN]:  player.y += speed
    player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

    spawn_timer += 1
    if spawn_timer >= 300:  # 5 секунд при 60fps
        enemies.append(make_enemy())
        spawn_timer = 0

    for e in enemies:
        e["x"] += e["dx"]; e["y"] += e["dy"]
        if e["x"] < 0 or e["x"] > WIDTH  - e["size"]: e["dx"] *= -1
        if e["y"] < 0 or e["y"] > HEIGHT - e["size"]: e["dy"] *= -1
        erect = pygame.Rect(e["x"], e["y"], e["size"], e["size"])
        if player.colliderect(erect) and invincible == 0:
            lives -= 1; invincible = 90

    if invincible > 0: invincible -= 1

    screen.fill((20, 20, 40))
    for e in enemies:
        pygame.draw.rect(screen, e["color"], (e["x"], e["y"], e["size"], e["size"]))
    col = (255,100,100) if invincible > 0 else (0,200,255)
    pygame.draw.rect(screen, col, player)
    t = font.render(f"Життя: {lives}", True, (255,255,255))
    screen.blit(t, (10,10))
    if lives <= 0:
        over = font.render("GAME OVER", True, (255,50,50))
        screen.blit(over, (WIDTH//2-over.get_width()//2, HEIGHT//2))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 51,
        title: { uk: "Стрільба", ru: "Стрельба" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Якщо у грі 10 куль — де їх зберігати? У списку! Кожна куля — словник <code>{"x":…,"y":…}</code></p></div><div class="theory-block"><h3>📦 Список куль</h3><pre class="code-example">bullets = []
# Постріл
if event.key == K_SPACE:
    bullets.append({"x": px, "y": py})
# Рух куль
for b in bullets:
    b["y"] -= 8
bullets = [b for b in bullets if b["y"] > 0]</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Если в игре 10 пуль — где их хранить? В списке! Каждая пуля — словарь <code>{"x":…,"y":…}</code></p></div><div class="theory-block"><h3>📦 Список пуль</h3><pre class="code-example">bullets = []
# Выстрел
if event.key == K_SPACE:
    bullets.append({"x": px, "y": py})
# Движение пуль
for b in bullets:
    b["y"] -= 8
bullets = [b for b in bullets if b["y"] > 0]</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Постріл однієї кулі SPACE", ru:"⭐ Выстрел одной пулей SPACE" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Куля рухається вгору", ru:"⭐ Пуля движется вверх" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Видаляй кулю коли вона виходить за екран", ru:"⭐⭐ Удаляй пулю когда она выходит за экран" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Список куль — стріляй багато разів", ru:"⭐⭐ Список пуль — стреляй много раз" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Кулі знищують ворогів", ru:"⭐⭐ Пули уничтожают врагов" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ +10 очок за кожного ворога", ru:"⭐⭐⭐ +10 очков за каждого врага" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Максимум 3 кулі одночасно", ru:"⭐⭐⭐⭐ Максимум 3 пули одновременно" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Анімація перезарядки", ru:"⭐⭐⭐⭐ Анимация перезарядки" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 53 — Стрільба")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 28)

player = pygame.Rect(280, 340, 40, 30)
speed  = 5
bullets = []
score  = 0

def make_enemy():
    return pygame.Rect(random.randint(0, WIDTH-30), random.randint(20, 150), 30, 30)

enemies = [make_enemy() for _ in range(4)]

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and len(bullets) < 3:
                bullets.append(pygame.Rect(player.centerx-4, player.top, 8, 16))

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player.x -= speed
    if keys[pygame.K_RIGHT]: player.x += speed
    player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

    # Рух куль
    for b in bullets:
        b.y -= 8
    bullets = [b for b in bullets if b.y > 0]

    # Зіткнення куль з ворогами
    for b in bullets[:]:
        for e in enemies[:]:
            if b.colliderect(e):
                bullets.remove(b)
                enemies.remove(e)
                enemies.append(make_enemy())
                score += 10
                break

    screen.fill((10, 10, 30))
    for e in enemies:
        pygame.draw.rect(screen, (220, 50, 50), e)
    for b in bullets:
        pygame.draw.rect(screen, (255, 255, 100), b)
    pygame.draw.rect(screen, (0, 200, 255), player)
    t = font.render(f"Score: {score}  Кулі: {len(bullets)}/3", True, (255,255,255))
    screen.blit(t, (10,10))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 52,
        title: { uk: "Завантаження зображень", ru: "Загрузка изображений" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як намалювати персонажа без файлу зображення? Можна намалювати його самому за допомогою <code>pygame.draw</code>!</p></div><div class="theory-block"><h3>📦 Surface як зображення</h3><pre class="code-example">img = pygame.image.load("hero.png").convert_alpha()
img = pygame.transform.scale(img, (50, 50))
img = pygame.transform.flip(img, True, False)
screen.blit(img, (x, y))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как нарисовать персонажа без файла изображения? Можно нарисовать его самому с помощью <code>pygame.draw</code>!</p></div><div class="theory-block"><h3>📦 Surface как изображение</h3><pre class="code-example">img = pygame.image.load("hero.png").convert_alpha()
img = pygame.transform.scale(img, (50, 50))
img = pygame.transform.flip(img, True, False)
screen.blit(img, (x, y))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Створи кольоровий Surface як запасний гравець", ru:"⭐ Создай цветной Surface как запасной игрок" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Відмалюй гравця як Surface", ru:"⭐ Нарисуй игрока как Surface" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Масштабуй Surface через transform.scale", ru:"⭐⭐ Масштабируй Surface через transform.scale" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Обертай через transform.rotate", ru:"⭐⭐ Вращай через transform.rotate" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Відзеркалюй горизонтально при зміні напрямку", ru:"⭐⭐ Отражай горизонтально при смене направления" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Додай прозорість (alpha)", ru:"⭐⭐⭐ Добавь прозрачность (alpha)" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Кілька масштабованих копій", ru:"⭐⭐⭐⭐ Несколько масштабированных копий" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Концепція аркушу спрайтів", ru:"⭐⭐⭐⭐ Концепция листа спрайтов" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 54 — Зображення")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 22)

# Малюємо гравця вручну як Surface (якщо немає файлу)
def make_hero_surf(w, h, color):
    s = pygame.Surface((w, h), pygame.SRCALPHA)
    # Тіло
    pygame.draw.rect(s, color, (w//4, h//3, w//2, h//2))
    # Голова
    pygame.draw.circle(s, color, (w//2, h//4), h//5)
    return s

hero_surf = make_hero_surf(60, 80, (0, 180, 255))
angle  = 0
px, py = WIDTH//2, HEIGHT//2
facing = 1  # 1=вправо, -1=вліво

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px -= 4; facing = -1
    if keys[pygame.K_RIGHT]: px += 4; facing = 1
    if keys[pygame.K_UP]:    py -= 4
    if keys[pygame.K_DOWN]:  py += 4
    if keys[pygame.K_r]:     angle += 3

    screen.fill((30, 30, 50))

    # Відзеркалення
    flipped = pygame.transform.flip(hero_surf, facing == -1, False)
    # Обертання
    rotated = pygame.transform.rotate(flipped, angle)
    rect = rotated.get_rect(center=(px, py))
    screen.blit(rotated, rect)

    # Маленькі копії
    small = pygame.transform.scale(hero_surf, (30, 40))
    for i in range(3):
        screen.blit(small, (10 + i*40, HEIGHT - 50))

    t = font.render("R=обертати  стрілки=рух", True, (200,200,200))
    screen.blit(t, (5, 5))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 53,
        title: { uk: "Анімація кадрів", ru: "Покадровая анимация" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як працює мультфільм? Швидка зміна картинок! У Pygame ми так само перемикаємо кадри.</p></div><div class="theory-block"><h3>📦 Список кадрів</h3><pre class="code-example">frames = [surf1, surf2, surf3]
anim_counter += 1
frame_idx = (anim_counter // 10) % len(frames)
screen.blit(frames[frame_idx], (x,y))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как работает мультфильм? Быстрая смена картинок! В Pygame мы точно так же переключаем кадры.</p></div><div class="theory-block"><h3>📦 Список кадров</h3><pre class="code-example">frames = [surf1, surf2, surf3]
anim_counter += 1
frame_idx = (anim_counter // 10) % len(frames)
screen.blit(frames[frame_idx], (x,y))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Створи 2 кадри різних кольорів", ru:"⭐ Создай 2 кадра разных цветов" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Перемикайся між кадрами", ru:"⭐ Переключайся между кадрами" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Контролюй швидкість анімації", ru:"⭐⭐ Контролируй скорость анимации" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Показуй номер поточного кадру", ru:"⭐⭐ Показывай номер текущего кадра" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Різна анімація вліво/вправо", ru:"⭐⭐ Разная анимация влево/вправо" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Анімація idle vs walk", ru:"⭐⭐⭐ Анимация idle vs walk" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Анімація стрибка", ru:"⭐⭐⭐⭐ Анимация прыжка" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повний персонаж з 4 анімаціями", ru:"⭐⭐⭐⭐ Полный персонаж с 4 анимациями" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 55 — Анімація")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 24)

# Малюємо кадри вручну
def make_frame(body_color, leg_offset):
    s = pygame.Surface((60, 80), pygame.SRCALPHA)
    # Тіло
    pygame.draw.rect(s, body_color, (15, 20, 30, 35))
    # Голова
    pygame.draw.circle(s, (255, 200, 150), (30, 12), 12)
    # Ноги (анімуються)
    pygame.draw.rect(s, (80, 80, 200), (15, 55, 12, 20 + leg_offset))
    pygame.draw.rect(s, (80, 80, 200), (33, 55, 12, 20 - leg_offset))
    return s

walk_frames = [
    make_frame((0,150,255),  6),
    make_frame((0,130,220),  0),
    make_frame((0,150,255), -6),
    make_frame((0,130,220),  0),
]
idle_frames = [
    make_frame((0,100,180), 0),
    make_frame((0,120,200), 2),
]

px, py = WIDTH//2, HEIGHT - 120
speed  = 4
anim_t = 0
moving = False
facing = 1

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    moving = False
    if keys[pygame.K_LEFT]:  px -= speed; moving = True; facing = -1
    if keys[pygame.K_RIGHT]: px += speed; moving = True; facing = 1

    anim_t += 1
    if moving:
        frames = walk_frames
        fi = (anim_t // 8) % len(frames)
    else:
        frames = idle_frames
        fi = (anim_t // 20) % len(frames)

    frame = pygame.transform.flip(frames[fi], facing == -1, False)

    screen.fill((30, 30, 50))
    pygame.draw.rect(screen, (60, 120, 60), (0, HEIGHT-80, WIDTH, 80))
    screen.blit(frame, (px - 30, py))
    t = font.render(f"Кадр: {fi}  {'Іде' if moving else 'Стоїть'}", True, (255,255,255))
    screen.blit(t, (10,10))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 54,
        title: { uk: "Гравітація та стрибки", ru: "Гравитация и прыжки" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Чому предмети падають? Гравітація! У грі — це просто число яке ми додаємо до швидкості кожен кадр.</p></div><div class="theory-block"><h3>📦 Гравітація</h3><pre class="code-example">GRAVITY = 0.5
vy = 0          # вертикальна швидкість
vy += GRAVITY   # прискорення вниз
py += vy        # рух
if py >= FLOOR: py = FLOOR; vy = 0  # приземлення</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Почему предметы падают? Гравитация! В игре — это просто число которое добавляем к скорости каждый кадр.</p></div><div class="theory-block"><h3>📦 Гравитация</h3><pre class="code-example">GRAVITY = 0.5
vy = 0          # вертикальная скорость
vy += GRAVITY   # ускорение вниз
py += vy        # движение
if py >= FLOOR: py = FLOOR; vy = 0  # приземление</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Гравець падає вниз під дією гравітації", ru:"⭐ Игрок падает вниз под действием гравитации" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Приземлення на підлогу", ru:"⭐ Приземление на пол" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Стрибок клавішею SPACE", ru:"⭐⭐ Прыжок клавишей SPACE" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Стрибок тільки коли на землі", ru:"⭐⭐ Прыжок только когда на земле" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Показуй текст 'В ПОВІТРІ' під час стрибка", ru:"⭐⭐ Показывай текст 'В ВОЗДУХЕ' во время прыжка" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Додай подвійний стрибок", ru:"⭐⭐⭐ Добавь двойной прыжок" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Змінна висота стрибка (довше тримаєш — вище)", ru:"⭐⭐⭐⭐ Переменная высота прыжка (дольше держишь — выше)" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Додай coyote time (можна стрибнути після краю)", ru:"⭐⭐⭐⭐ Добавь coyote time (можно прыгнуть после края)" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 56 — Гравітація")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 28)

GRAVITY = 0.5
FLOOR   = HEIGHT - 60

px, py  = WIDTH//2, FLOOR
vy      = 0
on_ground = True
jumps_left = 2  # подвійний стрибок

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and jumps_left > 0:
                vy = -12          # стрибок вгору
                jumps_left -= 1
                on_ground = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px -= 5
    if keys[pygame.K_RIGHT]: px += 5
    px = max(20, min(px, WIDTH - 20))

    # Гравітація
    vy += GRAVITY
    py += vy

    # Приземлення
    if py >= FLOOR:
        py = FLOOR
        vy = 0
        on_ground = True
        jumps_left = 2

    screen.fill((30, 30, 80))
    # Підлога
    pygame.draw.rect(screen, (80, 160, 80), (0, FLOOR + 40, WIDTH, 80))
    # Гравець
    pygame.draw.rect(screen, (0, 200, 255), (px - 20, int(py) - 40, 40, 40))
    # Статус
    status = "НА ЗЕМЛІ" if on_ground else "В ПОВІТРІ"
    t = font.render(status, True, (255, 220, 0))
    screen.blit(t, (10, 10))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 55,
        title: { uk: "Платформи", ru: "Платформы" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Де ти ходиш у платформерах? По платформах! Як гравець знає коли він стоїть на платформі?</p></div><div class="theory-block"><h3>📦 Список платформ</h3><pre class="code-example">platforms = [pygame.Rect(100,300,200,20), pygame.Rect(350,200,150,20)]
for plat in platforms:
    if player.colliderect(plat) and vy > 0:
        player.bottom = plat.top
        vy = 0</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Где ходишь в платформерах? По платформам! Как игрок знает когда стоит на платформе?</p></div><div class="theory-block"><h3>📦 Список платформ</h3><pre class="code-example">platforms = [pygame.Rect(100,300,200,20), pygame.Rect(350,200,150,20)]
for plat in platforms:
    if player.colliderect(plat) and vy > 0:
        player.bottom = plat.top
        vy = 0</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Створи одну платформу", ru:"⭐ Создай одну платформу" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Гравець приземляється на платформу", ru:"⭐ Игрок приземляется на платформу" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай 5 платформ", ru:"⭐⭐ Добавь 5 платформ" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Гравець падає з краю", ru:"⭐⭐ Игрок падает с края" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Стрибай між платформами", ru:"⭐⭐ Прыгай между платформами" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Прокрутка платформ", ru:"⭐⭐⭐ Прокрутка платформ" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Рухома платформа", ru:"⭐⭐⭐⭐ Движущаяся платформа" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повний рівень платформера", ru:"⭐⭐⭐⭐ Полный уровень платформера" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 57 — Платформи")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 24)

GRAVITY = 0.5

player = pygame.Rect(50, 100, 36, 36)
vx, vy = 0, 0
on_ground = False

platforms = [
    pygame.Rect(0,   370, 600, 30),   # підлога
    pygame.Rect(100, 300, 150, 18),
    pygame.Rect(300, 240, 130, 18),
    pygame.Rect(450, 170, 120, 18),
    pygame.Rect(200, 160, 100, 18),
    pygame.Rect(50,  220, 110, 18),
]
# Рухома платформа
moving_plat = pygame.Rect(250, 320, 120, 18)
mp_dx = 2

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and on_ground:
                vy = -13

    keys = pygame.key.get_pressed()
    vx = 0
    if keys[pygame.K_LEFT]:  vx = -5
    if keys[pygame.K_RIGHT]: vx = 5

    vy += GRAVITY
    player.x += vx
    player.y += int(vy)

    on_ground = False
    all_plat = platforms + [moving_plat]
    for p in all_plat:
        if player.colliderect(p) and vy > 0:
            player.bottom = p.top
            vy = 0
            on_ground = True

    if player.top > HEIGHT: player.topleft = (50, 100)

    moving_plat.x += mp_dx
    if moving_plat.right > WIDTH or moving_plat.left < 0: mp_dx *= -1

    screen.fill((20, 20, 60))
    for p in platforms:
        pygame.draw.rect(screen, (100, 200, 100), p)
    pygame.draw.rect(screen, (200, 200, 80), moving_plat)
    pygame.draw.rect(screen, (0, 180, 255), player)
    t = font.render("SPACE=стрибок  стрілки=рух", True, (200,200,200))
    screen.blit(t, (5, 5))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 56,
        title: { uk: "Звуки", ru: "Звуки" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Яка гра без звуку? Нудно! Pygame може відтворювати звуки. Але у нас немає файлів — тому генеруємо самі!</p></div><div class="theory-block"><h3>📦 Генерація звуку</h3><pre class="code-example">import numpy as np
pygame.mixer.init(frequency=44100)
def make_beep(freq=440, dur=0.1):
    n = int(44100*dur)
    t = np.linspace(0,dur,n)
    wave = (np.sin(2*np.pi*freq*t)*32767).astype(np.int16)
    stereo = np.column_stack([wave,wave])
    return pygame.sndarray.make_sound(stereo)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Какая игра без звука? Скучно! Pygame умеет воспроизводить звуки. Но у нас нет файлов — генерируем сами!</p></div><div class="theory-block"><h3>📦 Генерация звука</h3><pre class="code-example">import numpy as np
pygame.mixer.init(frequency=44100)
def make_beep(freq=440, dur=0.1):
    n = int(44100*dur)
    t = np.linspace(0,dur,n)
    wave = (np.sin(2*np.pi*freq*t)*32767).astype(np.int16)
    stereo = np.column_stack([wave,wave])
    return pygame.sndarray.make_sound(stereo)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Ініціалізуй mixer", ru:"⭐ Инициализируй mixer" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Згенеруй звук бібліотекою numpy", ru:"⭐ Сгенерируй звук библиотекой numpy" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Грай звук при натисканні SPACE", ru:"⭐⭐ Играй звук при нажатии SPACE" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Зроби звуки різної висоти (частоти)", ru:"⭐⭐ Сделай звуки разной высоты (частоты)" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Звук стрибка vs звук збору", ru:"⭐⭐ Звук прыжка vs звук сбора" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Фонова музика (згенерована)", ru:"⭐⭐⭐ Фоновая музыка (сгенерированная)" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Регулювання гучності", ru:"⭐⭐⭐⭐ Регулировка громкости" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Вимкнення/увімкнення звуку", ru:"⭐⭐⭐⭐ Выключение/включение звука" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Потрібна бібліотека numpy: pip install numpy
import pygame, sys
pygame.init()
pygame.mixer.init(frequency=44100, size=-16, channels=2, buffer=512)

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 58 — Звуки")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 28)

try:
    import numpy as np
    def make_beep(freq=440, dur=0.15, vol=0.4):
        n = int(44100 * dur)
        t = np.linspace(0, dur, n, False)
        wave = (np.sin(2 * np.pi * freq * t) * 32767 * vol).astype(np.int16)
        stereo = np.column_stack([wave, wave])
        return pygame.sndarray.make_sound(stereo)
    snd_jump    = make_beep(523, 0.12)   # До
    snd_collect = make_beep(880, 0.10)   # Ля
    snd_hit     = make_beep(220, 0.20)   # Ля низьке
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False

muted  = False
volume = 0.7

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and HAS_NUMPY and not muted:
                snd_jump.play()
            if event.key == pygame.K_c and HAS_NUMPY and not muted:
                snd_collect.play()
            if event.key == pygame.K_m:
                muted = not muted
                pygame.mixer.pause() if muted else pygame.mixer.unpause()
            if event.key == pygame.K_UP:
                volume = min(1.0, volume + 0.1)
                if HAS_NUMPY: snd_jump.set_volume(volume)
            if event.key == pygame.K_DOWN:
                volume = max(0.0, volume - 0.1)
                if HAS_NUMPY: snd_jump.set_volume(volume)

    screen.fill((20, 20, 40))
    lines = [
        "SPACE = звук стрибка",
        "C     = звук збору",
        "M     = вимкнути/увімкнути",
        "UP/DOWN = гучність",
        f"Гучність: {int(volume*100)}%",
        f"Звук: {'ВИМК' if muted else 'УВІМК'}",
        "" if HAS_NUMPY else "! Встанови numpy для звуку",
    ]
    for i, line in enumerate(lines):
        t = font.render(line, True, (200,200,255))
        screen.blit(t, (50, 60 + i*45))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 57,
        title: { uk: "Таймери та хвилі", ru: "Таймеры и волны" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як зробити так щоб щось відбувалось кожні N секунд? Зберігаємо час і порівнюємо!</p></div><div class="theory-block"><h3>📦 pygame.time.get_ticks()</h3><pre class="code-example">start = pygame.time.get_ticks()
now   = pygame.time.get_ticks()
elapsed_ms = now - start
elapsed_s  = elapsed_ms // 1000
# Спавн кожні 2 секунди:
if now - last_spawn > 2000:
    spawn_enemy(); last_spawn = now</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как сделать чтобы что-то происходило каждые N секунд? Сохраняем время и сравниваем!</p></div><div class="theory-block"><h3>📦 pygame.time.get_ticks()</h3><pre class="code-example">start = pygame.time.get_ticks()
now   = pygame.time.get_ticks()
elapsed_ms = now - start
elapsed_s  = elapsed_ms // 1000
# Спавн каждые 2 секунды:
if now - last_spawn > 2000:
    spawn_enemy(); last_spawn = now</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Показуй час що минув у секундах", ru:"⭐ Показывай прошедшее время в секундах" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Спавн ворога кожні 2 секунди", ru:"⭐ Спавн врага каждые 2 секунды" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Показуй номер хвилі", ru:"⭐⭐ Показывай номер волны" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Нова хвиля кожні 15 секунд", ru:"⭐⭐ Новая волна каждые 15 секунд" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зворотній відлік 60 секунд", ru:"⭐⭐ Обратный отсчёт 60 секунд" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Гра закінчується при 0", ru:"⭐⭐⭐ Игра заканчивается при 0" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Швидший спавн на кожній хвилі", ru:"⭐⭐⭐⭐ Быстрый спавн на каждой волне" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Множник рахунку за хвилю", ru:"⭐⭐⭐⭐ Множитель счёта за волну" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 59 — Таймери")
clock = pygame.time.Clock()
font     = pygame.font.SysFont("arial", 28)
font_big = pygame.font.SysFont("arial", 48, bold=True)

player = pygame.Rect(280, 180, 40, 40)
speed  = 5
score  = 0
wave   = 1

enemies = []
start_time  = pygame.time.get_ticks()
last_spawn  = start_time
GAME_SECS   = 60

def make_enemy(wave):
    spd = 1.5 + wave * 0.4
    return {"rect": pygame.Rect(random.randint(0,WIDTH-30), 0, 28, 28),
            "dy": spd}

spawn_interval = 2000  # мс

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    now     = pygame.time.get_ticks()
    elapsed = (now - start_time) // 1000
    remain  = max(0, GAME_SECS - elapsed)
    wave    = 1 + elapsed // 15
    spawn_interval = max(500, 2000 - (wave - 1) * 300)

    if now - last_spawn > spawn_interval:
        enemies.append(make_enemy(wave))
        last_spawn = now

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player.x -= speed
    if keys[pygame.K_RIGHT]: player.x += speed
    if keys[pygame.K_UP]:    player.y -= speed
    if keys[pygame.K_DOWN]:  player.y += speed
    player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

    for e in enemies:
        e["rect"].y += e["dy"]
    enemies = [e for e in enemies if e["rect"].top < HEIGHT]

    screen.fill((15, 15, 35))
    for e in enemies:
        pygame.draw.rect(screen, (220, 60, 60), e["rect"])
    pygame.draw.rect(screen, (0,200,255), player)

    screen.blit(font.render(f"Хвиля: {wave}  Score: {score}", True, (255,255,255)), (10,10))
    col = (255,80,80) if remain < 10 else (255,255,255)
    screen.blit(font_big.render(str(remain), True, col),
                (WIDTH//2 - 20, 10))

    if remain == 0:
        screen.blit(font_big.render("ЧАС ВИЙШОВ!", True, (255,50,50)),
                    (WIDTH//2 - 140, HEIGHT//2))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 58,
        title: { uk: "HUD: рахунок, здоров'я, життя", ru: "HUD: счёт, здоровье, жизни" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>HUD — heads-up display. Це вся інформація на екрані: рахунок, здоров'я, життя. Де краще розміщувати?</p></div><div class="theory-block"><h3>📦 Рисуємо HUD</h3><pre class="code-example"># Полоска здоров'я
pygame.draw.rect(screen, (100,0,0),  (10,10,200,20))  # фон
pygame.draw.rect(screen, (0,200,0),  (10,10,hp*2,20)) # заповнення
# Серця
for i in range(lives):
    pygame.draw.circle(screen,(255,0,0),(30+i*35,50),12)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>HUD — heads-up display. Это вся информация на экране: счёт, здоровье, жизни. Где лучше размещать?</p></div><div class="theory-block"><h3>📦 Рисуем HUD</h3><pre class="code-example"># Полоска здоровья
pygame.draw.rect(screen, (100,0,0),  (10,10,200,20))  # фон
pygame.draw.rect(screen, (0,200,0),  (10,10,hp*2,20)) # заполнение
# Сердца
for i in range(lives):
    pygame.draw.circle(screen,(255,0,0),(30+i*35,50),12)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Показуй рахунок у верхньому лівому куті", ru:"⭐ Показывай счёт в верхнем левом углу" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Відмалюй 3 життя як кола", ru:"⭐ Нарисуй 3 жизни как круги" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Намалюй полоску здоров'я", ru:"⭐⭐ Нарисуй полоску здоровья" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Анімуй зменшення здоров'я", ru:"⭐⭐ Анимируй уменьшение здоровья" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Колір полоски: зелений→жовтий→червоний", ru:"⭐⭐ Цвет полоски: зелёный→жёлтый→красный" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Попередження 'МАЛО ЗДОРОВ'Я'", ru:"⭐⭐⭐ Предупреждение 'МАЛО ЗДОРОВЬЯ'" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Анімація втрати життя", ru:"⭐⭐⭐⭐ Анимация потери жизни" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повна панель HUD", ru:"⭐⭐⭐⭐ Полная панель HUD" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 60 — HUD")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 26)

score  = 0
lives  = 3
hp     = 100
frame  = 0

def draw_hud(screen, score, lives, hp, frame):
    # Рахунок
    t = font.render(f"Score: {score}", True, (255,255,255))
    screen.blit(t, (10, 10))

    # Серця (життя)
    for i in range(3):
        col = (220, 40, 40) if i < lives else (80, 80, 80)
        pygame.draw.circle(screen, col, (WIDTH - 30 - i*38, 22), 14)

    # Полоска здоров'я
    bar_w = 200
    if hp > 60:   bar_color = (50, 200, 50)
    elif hp > 30: bar_color = (230, 200, 0)
    else:         bar_color = (220, 40, 40)
    pygame.draw.rect(screen, (80,0,0),     (10, 45, bar_w, 18))
    pygame.draw.rect(screen, bar_color,    (10, 45, int(bar_w * hp / 100), 18))
    pygame.draw.rect(screen, (200,200,200),(10, 45, bar_w, 18), 2)

    # Попередження
    if hp < 30 and (frame // 20) % 2 == 0:
        warn = font.render("! МАЛО ЗДОРОВ'Я !", True, (255,50,50))
        screen.blit(warn, (WIDTH//2 - warn.get_width()//2, HEIGHT - 40))

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_h and hp > 0:   hp -= 10
            if event.key == pygame.K_s:               score += 10
            if event.key == pygame.K_l and lives > 0: lives -= 1

    frame += 1
    screen.fill((25, 25, 50))
    draw_hud(screen, score, lives, hp, frame)

    hint = font.render("H=здоров'я  S=рахунок  L=життя", True, (150,150,200))
    screen.blit(hint, (WIDTH//2 - hint.get_width()//2, HEIGHT//2))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 59,
        title: { uk: "Стани гри", ru: "Состояния игры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Які екрани є у грі? Меню, гра, пауза, кінець. Як перемикатись між ними?</p></div><div class="theory-block"><h3>📦 Стан гри</h3><pre class="code-example">game_state = "menu"  # "playing" / "gameover" / "pause"
if game_state == "menu":
    draw_menu()
elif game_state == "playing":
    update_game()
    draw_game()
elif game_state == "gameover":
    draw_gameover()</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Какие экраны есть в игре? Меню, игра, пауза, конец. Как переключаться между ними?</p></div><div class="theory-block"><h3>📦 Состояние игры</h3><pre class="code-example">game_state = "menu"  # "playing" / "gameover" / "pause"
if game_state == "menu":
    draw_menu()
elif game_state == "playing":
    update_game()
    draw_game()
elif game_state == "gameover":
    draw_gameover()</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Створи стан меню", ru:"⭐ Создай состояние меню" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Старт гри клавішею SPACE", ru:"⭐ Старт игры клавишей SPACE" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Створи стан кінця гри", ru:"⭐⭐ Создай состояние конца игры" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Показуй фінальний рахунок", ru:"⭐⭐ Показывай финальный счёт" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Повернення до меню клавішею ENTER", ru:"⭐⭐ Возврат в меню клавишей ENTER" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Додай стан паузи", ru:"⭐⭐⭐ Добавь состояние паузы" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Плавні переходи між станами", ru:"⭐⭐⭐⭐ Плавные переходы между состояниями" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повна машина станів", ru:"⭐⭐⭐⭐ Полная машина состояний" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 61 — Стани гри")
clock = pygame.time.Clock()
font     = pygame.font.SysFont("arial", 32)
font_big = pygame.font.SysFont("arial", 64, bold=True)

game_state = "menu"
score = 0
player = pygame.Rect(280, 180, 40, 40)

def reset_game():
    global score, player
    score  = 0
    player = pygame.Rect(280, 180, 40, 40)

coins = [pygame.Rect(random.randint(0,560), random.randint(0,360), 20,20) for _ in range(5)]

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if game_state == "menu" and event.key == pygame.K_SPACE:
                reset_game(); game_state = "playing"
            elif game_state == "playing" and event.key == pygame.K_p:
                game_state = "pause"
            elif game_state == "pause" and event.key == pygame.K_p:
                game_state = "playing"
            elif game_state == "gameover" and event.key == pygame.K_RETURN:
                game_state = "menu"

    if game_state == "playing":
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  player.x -= 5
        if keys[pygame.K_RIGHT]: player.x += 5
        if keys[pygame.K_UP]:    player.y -= 5
        if keys[pygame.K_DOWN]:  player.y += 5
        player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))
        for i in range(len(coins)-1,-1,-1):
            if player.colliderect(coins[i]):
                coins[i] = pygame.Rect(random.randint(0,560),random.randint(0,360),20,20)
                score += 10
        if score >= 100:
            game_state = "gameover"

    screen.fill((20, 20, 40))

    if game_state == "menu":
        t1 = font_big.render("МОЯ ГРА", True, (255,220,0))
        t2 = font.render("SPACE — почати", True, (200,200,255))
        screen.blit(t1, t1.get_rect(center=(WIDTH//2, HEIGHT//3)))
        screen.blit(t2, t2.get_rect(center=(WIDTH//2, HEIGHT*2//3)))
    elif game_state in ("playing", "pause"):
        for c in coins: pygame.draw.ellipse(screen,(255,220,0),c)
        pygame.draw.rect(screen,(0,200,255),player)
        screen.blit(font.render(f"Score:{score}", True,(255,255,255)),(10,10))
        if game_state == "pause":
            p = font_big.render("ПАУЗА", True,(255,200,0))
            screen.blit(p, p.get_rect(center=(WIDTH//2,HEIGHT//2)))
    elif game_state == "gameover":
        t1 = font_big.render("GAME OVER", True,(255,50,50))
        t2 = font.render(f"Рахунок: {score}", True,(255,255,255))
        t3 = font.render("ENTER — меню", True,(200,200,200))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,HEIGHT//3)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,HEIGHT//2)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,HEIGHT*2//3)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 60,
        title: { uk: "Рекорд у файлі", ru: "Рекорд в файле" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як зберегти рекорд після закриття гри? У файл! Файл не зникає коли гра закрита.</p></div><div class="theory-block"><h3>📦 Читання і запис рекорду</h3><pre class="code-example">try:
    with open("record.txt") as f:
        best = int(f.read())
except:
    best = 0
# Зберігаємо
if score > best:
    best = score
    with open("record.txt","w") as f:
        f.write(str(best))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как сохранить рекорд после закрытия игры? В файл! Файл не исчезает когда игра закрыта.</p></div><div class="theory-block"><h3>📦 Чтение и запись рекорда</h3><pre class="code-example">try:
    with open("record.txt") as f:
        best = int(f.read())
except:
    best = 0
# Сохраняем
if score > best:
    best = score
    with open("record.txt","w") as f:
        f.write(str(best))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Зчитай число з файлу record.txt", ru:"⭐ Считай число из файла record.txt" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Обробляй відсутній файл (try/except)", ru:"⭐ Обрабатывай отсутствующий файл (try/except)" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Збережи новий рекорд у файл", ru:"⭐⭐ Сохрани новый рекорд в файл" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Порівняй поточний рахунок з рекордом", ru:"⭐⭐ Сравни текущий счёт с рекордом" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Показуй рекорд на екрані кінця гри", ru:"⭐⭐ Показывай рекорд на экране конца игры" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Показуй рекорд у меню", ru:"⭐⭐⭐ Показывай рекорд в меню" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Скидання рекорду клавішею R", ru:"⭐⭐⭐⭐ Сброс рекорда клавишей R" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Топ-3 рекорди", ru:"⭐⭐⭐⭐ Топ-3 рекорда" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 62 — Рекорд")
clock = pygame.time.Clock()
font     = pygame.font.SysFont("arial", 30)
font_big = pygame.font.SysFont("arial", 56, bold=True)

RECORD_FILE = "record.txt"

def load_best():
    try:
        with open(RECORD_FILE) as f:
            return int(f.read().strip())
    except:
        return 0

def save_best(val):
    with open(RECORD_FILE, "w") as f:
        f.write(str(val))

best  = load_best()
score = 0
state = "menu"
player= pygame.Rect(280,180,40,40)
coins = [pygame.Rect(random.randint(0,560),random.randint(0,360),20,20) for _ in range(5)]

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if state == "menu":
                if event.key == pygame.K_SPACE:
                    score = 0; state = "playing"
                if event.key == pygame.K_r:
                    best = 0; save_best(0)
            elif state == "gameover" and event.key == pygame.K_RETURN:
                state = "menu"

    if state == "playing":
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  player.x -= 5
        if keys[pygame.K_RIGHT]: player.x += 5
        if keys[pygame.K_UP]:    player.y -= 5
        if keys[pygame.K_DOWN]:  player.y += 5
        player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))
        for i in range(len(coins)-1,-1,-1):
            if player.colliderect(coins[i]):
                coins[i] = pygame.Rect(random.randint(0,560),random.randint(0,360),20,20)
                score += 10
        if score >= 100:
            if score > best:
                best = score; save_best(best)
            state = "gameover"

    screen.fill((20, 20, 40))

    if state == "menu":
        t1 = font_big.render("РЕКОРД", True,(255,220,0))
        t2 = font.render(f"Найкращий: {best}", True,(200,255,200))
        t3 = font.render("SPACE — грати   R — скинути рекорд", True,(180,180,200))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,120)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,220)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,320)))
    elif state == "playing":
        for c in coins: pygame.draw.ellipse(screen,(255,220,0),c)
        pygame.draw.rect(screen,(0,200,255),player)
        screen.blit(font.render(f"Score:{score}  Best:{best}",True,(255,255,255)),(10,10))
    elif state == "gameover":
        new_rec = score >= best
        t1 = font_big.render("GAME OVER", True,(255,50,50))
        t2 = font.render(f"Рахунок: {score}", True,(255,255,255))
        t3 = font.render("НОВИЙ РЕКОРД!" if new_rec else f"Рекорд: {best}",
                         True,(255,220,0) if new_rec else (180,180,200))
        t4 = font.render("ENTER — меню", True,(180,180,200))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,100)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,200)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,260)))
        screen.blit(t4,t4.get_rect(center=(WIDTH//2,330)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 61,
        title: { uk: "Частинки вибуху", ru: "Частицы взрыва" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як зробити ефект вибуху? Багато маленьких кружечків що летять в різні боки!</p></div><div class="theory-block"><h3>📦 Система частинок</h3><pre class="code-example">particles = []
def spawn(x,y):
    for _ in range(10):
        particles.append({"x":x,"y":y,"dx":random.uniform(-4,4),
                          "dy":random.uniform(-4,4),"life":30,"size":6})
for p in particles: p["x"]+=p["dx"]; p["y"]+=p["dy"]; p["life"]-=1
particles=[p for p in particles if p["life"]>0]</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как сделать эффект взрыва? Много маленьких кружочков которые летят в разные стороны!</p></div><div class="theory-block"><h3>📦 Система частиц</h3><pre class="code-example">particles = []
def spawn(x,y):
    for _ in range(10):
        particles.append({"x":x,"y":y,"dx":random.uniform(-4,4),
                          "dy":random.uniform(-4,4),"life":30,"size":6})
for p in particles: p["x"]+=p["dx"]; p["y"]+=p["dy"]; p["life"]-=1
particles=[p for p in particles if p["life"]>0]</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Створи одну частинку", ru:"⭐ Создай одну частицу" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Рух частинки", ru:"⭐ Движение частицы" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Частинка зменшується з часом", ru:"⭐⭐ Частица уменьшается со временом" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Видаляй мертві частинки", ru:"⭐⭐ Удаляй мёртвые частицы" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Спавн 10 штук одразу", ru:"⭐⭐ Спавн 10 штук сразу" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Випадкові напрямки", ru:"⭐⭐⭐ Случайные направления" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Згасання кольору", ru:"⭐⭐⭐⭐ Угасание цвета" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Вибух при знищенні ворога", ru:"⭐⭐⭐⭐ Взрыв при уничтожении врага" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 63 — Частинки")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 24)

particles = []

def spawn_explosion(x, y, color=(255,180,0)):
    for _ in range(20):
        particles.append({
            "x": float(x), "y": float(y),
            "dx": random.uniform(-5, 5),
            "dy": random.uniform(-5, 5),
            "life": random.randint(20, 40),
            "max_life": 40,
            "size": random.randint(4, 10),
            "color": color
        })

player  = pygame.Rect(280, 180, 40, 40)
enemies = [pygame.Rect(random.randint(0,560), random.randint(0,360), 30, 30) for _ in range(4)]
score   = 0
bullets = []

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                bullets.append(pygame.Rect(player.centerx-4, player.top, 8, 14))
        if event.type == pygame.MOUSEBUTTONDOWN:
            spawn_explosion(*pygame.mouse.get_pos())

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player.x -= 5
    if keys[pygame.K_RIGHT]: player.x += 5
    if keys[pygame.K_UP]:    player.y -= 5
    if keys[pygame.K_DOWN]:  player.y += 5
    player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

    for b in bullets: b.y -= 8
    bullets = [b for b in bullets if b.y > 0]
    for b in bullets[:]:
        for e in enemies[:]:
            if b.colliderect(e):
                spawn_explosion(e.centerx, e.centery, (255,100,50))
                bullets.remove(b); enemies.remove(e); score += 10
                enemies.append(pygame.Rect(random.randint(0,560),random.randint(0,360),30,30))
                break

    for p in particles:
        p["x"] += p["dx"]; p["y"] += p["dy"]
        p["dy"] += 0.15
        p["life"] -= 1
        p["size"] = max(1, int(p["size"] * p["life"] / p["max_life"]))
    particles[:] = [p for p in particles if p["life"] > 0]

    screen.fill((15, 15, 30))
    for e in enemies: pygame.draw.rect(screen, (200,50,50), e)
    for b in bullets: pygame.draw.rect(screen, (255,255,100), b)
    pygame.draw.rect(screen, (0,200,255), player)
    for p in particles:
        alpha = int(255 * p["life"] / p["max_life"])
        col = tuple(min(255, c) for c in p["color"])
        pygame.draw.circle(screen, col, (int(p["x"]),int(p["y"])), p["size"])
    screen.blit(font.render(f"Score:{score}  Клік=вибух  SPACE=куля", True,(200,200,255)),(5,5))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 62,
        title: { uk: "Прокручуваний фон", ru: "Прокручиваемый фон" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як зробити нескінченний фон? Рухаємо фон вниз, і коли він виходить — скидаємо назад!</p></div><div class="theory-block"><h3>📦 Прокрутка фону</h3><pre class="code-example">bg_y += scroll_speed
if bg_y >= HEIGHT:
    bg_y = 0
# Малюємо два рази — один за одним
screen.blit(bg, (0, bg_y - HEIGHT))
screen.blit(bg, (0, bg_y))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как сделать бесконечный фон? Двигаем фон вниз, и когда он выходит — сбрасываем назад!</p></div><div class="theory-block"><h3>📦 Прокрутка фона</h3><pre class="code-example">bg_y += scroll_speed
if bg_y >= HEIGHT:
    bg_y = 0
# Рисуем два раза — один за другим
screen.blit(bg, (0, bg_y - HEIGHT))
screen.blit(bg, (0, bg_y))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Одна лінія прокручується вниз", ru:"⭐ Одна линия прокручивается вниз" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зациклений фон", ru:"⭐ Зацикленный фон" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай зірки", ru:"⭐⭐ Добавь звёзды" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Два шари паралакса", ru:"⭐⭐ Два слоя параллакса" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зірки мерехтять", ru:"⭐⭐ Звёзды мерцают" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Кольорові туманності", ru:"⭐⭐⭐ Цветные туманности" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Прискорення фону", ru:"⭐⭐⭐⭐ Ускорение фона" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повний космічний фон", ru:"⭐⭐⭐⭐ Полный космический фон" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 64 — Фон")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 24)

# Генеруємо зірки
stars_far  = [(random.randint(0,WIDTH), random.randint(0,HEIGHT), random.randint(1,2)) for _ in range(80)]
stars_near = [(random.randint(0,WIDTH), random.randint(0,HEIGHT), random.randint(2,4)) for _ in range(40)]

bg_y1 = 0   # дальній шар
bg_y2 = 0   # ближній шар
speed1 = 1
speed2 = 3
frame  = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    bg_y1 = (bg_y1 + speed1) % HEIGHT
    bg_y2 = (bg_y2 + speed2) % HEIGHT
    frame += 1

    screen.fill((5, 5, 20))

    # Дальні зірки
    for sx, sy, sr in stars_far:
        y = (sy + bg_y1) % HEIGHT
        bright = 120 + (hash((sx,sy,frame//30)) % 60)  # мерехтіння
        pygame.draw.circle(screen, (bright, bright, bright+30), (sx, y), sr)

    # Ближні зірки
    for sx, sy, sr in stars_near:
        y = (sy + bg_y2) % HEIGHT
        pygame.draw.circle(screen, (220, 220, 255), (sx, y), sr)

    # Туманність
    neb = pygame.Surface((200, 100), pygame.SRCALPHA)
    pygame.draw.ellipse(neb, (40, 0, 80, 60), (0, 0, 200, 100))
    neb_y = (150 + bg_y1) % (HEIGHT + 100) - 50
    screen.blit(neb, (50, neb_y))

    screen.blit(font.render("Космічний фон з паралаксом", True, (180,180,220)), (5,5))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 63,
        title: { uk: "Рівні та складність", ru: "Уровни и сложность" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Чому ігри стають складнішими? Що саме змінюється: швидкість, кількість ворогів, час?</p></div><div class="theory-block"><h3>📦 Рівні</h3><pre class="code-example">level = 1
enemy_speed = 2 + level * 0.5
if score >= level * 50:
    level += 1
    # Показати "РІВЕНЬ N!"</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Почему игры становятся сложнее? Что именно меняется: скорость, количество врагов, время?</p></div><div class="theory-block"><h3>📦 Уровни</h3><pre class="code-example">level = 1
enemy_speed = 2 + level * 0.5
if score >= level * 50:
    level += 1
    # Показать "УРОВЕНЬ N!"</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Змінна level", ru:"⭐ Переменная level" }},
          { num:2, level:"easy",   text:{ uk:"⭐ speed = 2 + level*0.5", ru:"⭐ speed = 2 + level*0.5" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Підвищення рівня кожні 50 очок", ru:"⭐⭐ Повышение уровня каждые 50 очков" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Показуй рівень на екрані", ru:"⭐⭐ Показывай уровень на экране" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Текст 'РІВЕНЬ N!' на 2 секунди", ru:"⭐⭐ Текст 'УРОВЕНЬ N!' на 2 секунды" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Максимальний рівень 10", ru:"⭐⭐⭐ Максимальный уровень 10" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Колір фону змінюється з рівнем", ru:"⭐⭐⭐⭐ Цвет фона меняется с уровнем" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повна крива складності", ru:"⭐⭐⭐⭐ Полная кривая сложности" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 65 — Рівні")
clock = pygame.time.Clock()
font     = pygame.font.SysFont("arial", 28)
font_big = pygame.font.SysFont("arial", 60, bold=True)

player  = pygame.Rect(280, 340, 40, 30)
score   = 0
level   = 1
MAX_LVL = 10
level_msg_timer = 0

BG_COLORS = [(15,15,35),(20,10,40),(10,20,40),(5,25,35),(20,15,30),
             (30,10,25),(25,5,30),(15,25,20),(10,30,25),(5,10,40)]

def make_enemy(lvl):
    spd = 2 + lvl * 0.5
    return {"rect": pygame.Rect(random.randint(0,WIDTH-30), 0, 28, 28),
            "dy": spd, "color":(200+lvl*5, 60-lvl*4, 60)}

enemies = [make_enemy(level) for _ in range(3)]
bullets = []

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and len(bullets)<3:
                bullets.append(pygame.Rect(player.centerx-4,player.top,8,14))

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player.x -= 5
    if keys[pygame.K_RIGHT]: player.x += 5
    player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

    for b in bullets: b.y -= 9
    bullets = [b for b in bullets if b.y > 0]
    for e in enemies:
        e["rect"].y += e["dy"]
        if e["rect"].top > HEIGHT:
            e["rect"].topleft = (random.randint(0,WIDTH-30), 0)

    for b in bullets[:]:
        for e in enemies[:]:
            if b.colliderect(e["rect"]):
                bullets.remove(b); enemies.remove(e); score += 10
                enemies.append(make_enemy(level))
                break

    # Підвищення рівня
    new_level = min(MAX_LVL, 1 + score // 50)
    if new_level > level:
        level = new_level
        level_msg_timer = 120
        for e in enemies: e["dy"] = 2 + level * 0.5

    if level_msg_timer > 0: level_msg_timer -= 1

    bg = BG_COLORS[min(level-1, len(BG_COLORS)-1)]
    screen.fill(bg)
    for e in enemies: pygame.draw.rect(screen, e["color"], e["rect"])
    for b in bullets: pygame.draw.rect(screen,(255,255,100),b)
    pygame.draw.rect(screen,(0,200,255),player)
    screen.blit(font.render(f"Score:{score}  Рівень:{level}/{MAX_LVL}",True,(255,255,255)),(10,10))

    if level_msg_timer > 0:
        t = font_big.render(f"РІВЕНЬ {level}!", True,(255,220,0))
        screen.blit(t, t.get_rect(center=(WIDTH//2, HEIGHT//2)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 64,
        title: { uk: "Sprite клас (OOP)", ru: "Класс Sprite (ООП)" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що таке клас? Це шаблон! Як cookie-cutter — один шаблон, багато печива. Так само: один клас — багато ворогів.</p></div><div class="theory-block"><h3>📦 pygame.sprite.Sprite</h3><pre class="code-example">class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40,40))
        self.image.fill((0,180,255))
        self.rect  = self.image.get_rect(center=(300,200))
    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]: self.rect.x -= 5</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что такое класс? Это шаблон! Как cookie-cutter — один шаблон, много печенья. Так же: один класс — много врагов.</p></div><div class="theory-block"><h3>📦 pygame.sprite.Sprite</h3><pre class="code-example">class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40,40))
        self.image.fill((0,180,255))
        self.rect  = self.image.get_rect(center=(300,200))
    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]: self.rect.x -= 5</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Створи клас Player з pygame.sprite.Sprite", ru:"⭐ Создай класс Player с pygame.sprite.Sprite" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Додай до групи all_sprites", ru:"⭐ Добавь в группу all_sprites" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Створи клас Enemy", ru:"⭐⭐ Создай класс Enemy" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Використай groupcollide()", ru:"⭐⭐ Используй groupcollide()" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Порівняй з підходом словників", ru:"⭐⭐ Сравни с подходом словарей" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ kill() при зіткненні", ru:"⭐⭐⭐ kill() при столкновении" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Динамічний спавн спрайтів", ru:"⭐⭐⭐⭐ Динамический спавн спрайтов" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повна гра на спрайтах", ru:"⭐⭐⭐⭐ Полная игра на спрайтах" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 66 — OOP Sprites")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 28)

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40, 40), pygame.SRCALPHA)
        pygame.draw.rect(self.image, (0,180,255), (0,0,40,40), border_radius=8)
        self.rect  = self.image.get_rect(center=(WIDTH//2, HEIGHT - 60))
        self.speed = 5

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  self.rect.x -= self.speed
        if keys[pygame.K_RIGHT]: self.rect.x += self.speed
        self.rect.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

class Enemy(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        size = random.randint(20, 40)
        self.image = pygame.Surface((size, size), pygame.SRCALPHA)
        col = (random.randint(180,255), random.randint(0,80), random.randint(0,80))
        pygame.draw.rect(self.image, col, (0,0,size,size), border_radius=4)
        self.rect = self.image.get_rect(topleft=(random.randint(0,WIDTH-size), 0))
        self.dy   = random.uniform(2, 4)

    def update(self):
        self.rect.y += self.dy
        if self.rect.top > HEIGHT:
            self.rect.x = random.randint(0, WIDTH-self.rect.width)
            self.rect.y = 0

class Bullet(pygame.sprite.Sprite):
    def __init__(self, cx, top):
        super().__init__()
        self.image = pygame.Surface((8,16), pygame.SRCALPHA)
        pygame.draw.rect(self.image,(255,255,100),(0,0,8,16),border_radius=4)
        self.rect = self.image.get_rect(centerx=cx, bottom=top)
    def update(self):
        self.rect.y -= 9
        if self.rect.bottom < 0: self.kill()

all_sprites = pygame.sprite.Group()
enemies_grp = pygame.sprite.Group()
bullets_grp = pygame.sprite.Group()
player = Player()
all_sprites.add(player)
for _ in range(5):
    e = Enemy(); all_sprites.add(e); enemies_grp.add(e)

score = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            if len(bullets_grp) < 3:
                b = Bullet(player.rect.centerx, player.rect.top)
                all_sprites.add(b); bullets_grp.add(b)

    all_sprites.update()
    hits = pygame.sprite.groupcollide(bullets_grp, enemies_grp, True, True)
    for _ in hits:
        score += 10
        e = Enemy(); all_sprites.add(e); enemies_grp.add(e)

    screen.fill((15, 15, 35))
    all_sprites.draw(screen)
    screen.blit(font.render(f"Score: {score}  SPACE=стріляти",True,(255,255,255)),(10,10))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 65,
        title: { uk: "Міні-гра: Ловець зірок", ru: "Мини-игра: Ловец звёзд" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Зберемо все що знаємо! Рух гравця + падаючі об'єкти + зіткнення + рахунок + стани гри.</p></div><div class="theory-block"><h3>📦 Ловець зірок — механіка</h3><pre class="code-example"># Гравець рухається ←→
# Зірки падають зверху
# Спіймав = +10 очок
# Пропустив = -1 життя
# 3 життя, потім GAME OVER</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Соберём всё что знаем! Движение игрока + падающие объекты + коллизии + счёт + состояния игры.</p></div><div class="theory-block"><h3>📦 Ловец звёзд — механика</h3><pre class="code-example"># Игрок движется ←→
# Звёзды падают сверху
# Поймал = +10 очков
# Пропустил = -1 жизнь
# 3 жизни, затем GAME OVER</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Гравець рухається ←→", ru:"⭐ Игрок движется ←→" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Одна зірка падає зверху", ru:"⭐ Одна звезда падает сверху" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Спіймав зірку = +10", ru:"⭐⭐ Поймал звезду = +10" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Пропустив = -1 життя", ru:"⭐⭐ Пропустил = -1 жизнь" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Система з 3 життями", ru:"⭐⭐ Система с 3 жизнями" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Швидкість збільшується", ru:"⭐⭐⭐ Скорость увеличивается" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Кілька зірок одночасно", ru:"⭐⭐⭐⭐ Несколько звёзд одновременно" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Рекорд у файлі", ru:"⭐⭐⭐⭐ Рекорд в файле" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Ловець зірок")
clock = pygame.time.Clock()
font     = pygame.font.SysFont("arial", 30)
font_big = pygame.font.SysFont("arial", 60, bold=True)

def load_best():
    try:
        with open("star_record.txt") as f: return int(f.read())
    except: return 0

def save_best(v):
    with open("star_record.txt","w") as f: f.write(str(v))

def new_star(speed):
    return {"x": random.randint(20,WIDTH-20), "y":-20, "speed": speed}

state  = "menu"
score  = 0
lives  = 3
best   = load_best()
stars  = []
player_x = WIDTH//2
PLAYER_W = 70
PLAYER_H = 20
base_speed = 4
frame  = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if state == "menu" and event.key == pygame.K_SPACE:
                score=0; lives=3; stars=[new_star(base_speed)]; frame=0
                state="playing"; player_x=WIDTH//2
            elif state == "gameover" and event.key == pygame.K_RETURN:
                state="menu"

    if state == "playing":
        frame += 1
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  player_x = max(PLAYER_W//2, player_x-6)
        if keys[pygame.K_RIGHT]: player_x = min(WIDTH-PLAYER_W//2, player_x+6)

        speed = base_speed + score // 30
        if frame % max(20, 60 - score//10) == 0:
            stars.append(new_star(speed))

        player_rect = pygame.Rect(player_x-PLAYER_W//2, HEIGHT-40, PLAYER_W, PLAYER_H)
        for s in stars[:]:
            s["y"] += s["speed"]
            sr = pygame.Rect(s["x"]-14, s["y"]-14, 28, 28)
            if player_rect.colliderect(sr):
                stars.remove(s); score += 10
            elif s["y"] > HEIGHT+20:
                stars.remove(s); lives -= 1
        if lives <= 0:
            if score > best: best = score; save_best(best)
            state = "gameover"

    screen.fill((10, 10, 30))
    # Зірки
    for s in stars:
        pts = [(s["x"], s["y"]-14),(s["x"]+5,s["y"]-5),(s["x"]+14,s["y"]-5),
               (s["x"]+8,s["y"]+3),(s["x"]+10,s["y"]+12),(s["x"],s["y"]+7),
               (s["x"]-10,s["y"]+12),(s["x"]-8,s["y"]+3),(s["x"]-14,s["y"]-5),(s["x"]-5,s["y"]-5)]
        pygame.draw.polygon(screen,(255,220,0),pts)

    if state == "menu":
        t1=font_big.render("ЛОВЕЦЬ ЗІРОК",True,(255,220,0))
        t2=font.render(f"Рекорд: {best}",True,(200,255,200))
        t3=font.render("SPACE — почати",True,(180,180,220))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,120)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,220)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,310)))
    elif state == "playing":
        pygame.draw.rect(screen,(0,180,255),(player_x-PLAYER_W//2,HEIGHT-40,PLAYER_W,PLAYER_H),border_radius=8)
        screen.blit(font.render(f"Score:{score}",True,(255,255,255)),(10,10))
        for i in range(3):
            col=(220,40,40) if i<lives else (60,60,60)
            pygame.draw.circle(screen,col,(WIDTH-30-i*35,22),13)
    elif state == "gameover":
        t1=font_big.render("GAME OVER",True,(255,50,50))
        new_r = score>=best and score>0
        t2=font.render(f"Score:{score}  {'РЕКОРД!' if new_r else 'Рекорд:'+str(best)}",True,(255,220,0) if new_r else (255,255,255))
        t3=font.render("ENTER — меню",True,(180,180,200))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,120)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,220)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,310)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 66,
        title: { uk: "Міні-гра: Космічний шутер", ru: "Мини-игра: Космический шутер" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Комбінуємо: рух корабля + стрільба + астероїди що падають + прокручуваний фон + хвилі.</p></div><div class="theory-block"><h3>📦 Космічний шутер</h3><pre class="code-example"># Корабель ←→
# Астероїди падають зверху
# SPACE = постріл
# Попав = +10, пропустив = -1 життя</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Комбинируем: движение корабля + стрельба + падающие астероиды + прокручиваемый фон + волны.</p></div><div class="theory-block"><h3>📦 Космический шутер</h3><pre class="code-example"># Корабль ←→
# Астероиды падают сверху
# SPACE = выстрел
# Попал = +10, пропустил = -1 жизнь</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Корабель рухається ←→", ru:"⭐ Корабль движется ←→" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Один астероїд падає", ru:"⭐ Один астероид падает" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Стрільба клавішею SPACE", ru:"⭐⭐ Стрельба клавишей SPACE" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Астероїд збитий = +10", ru:"⭐⭐ Астероид сбит = +10" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Пропустив астероїд = -1 життя", ru:"⭐⭐ Пропустил астероид = -1 жизнь" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Прокручуваний зоряний фон", ru:"⭐⭐⭐ Прокручиваемый звёздный фон" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Система хвиль", ru:"⭐⭐⭐⭐ Система волн" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Повна гра з рекордом", ru:"⭐⭐⭐⭐ Полная игра с рекордом" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys, random
pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Космічний шутер")
clock = pygame.time.Clock()
font     = pygame.font.SysFont("arial", 28)
font_big = pygame.font.SysFont("arial", 56, bold=True)

def load_best():
    try:
        with open("shooter_record.txt") as f: return int(f.read())
    except: return 0
def save_best(v):
    with open("shooter_record.txt","w") as f: f.write(str(v))

stars = [(random.randint(0,WIDTH), random.randint(0,HEIGHT), random.randint(1,3)) for _ in range(70)]
star_y = 0

def make_asteroid(wave):
    spd = 2 + wave * 0.6
    return pygame.Rect(random.randint(10,WIDTH-40), -40, random.randint(25,45), random.randint(25,45))

state   = "menu"
ship    = pygame.Rect(WIDTH//2-20, HEIGHT-60, 40, 40)
bullets = []
asteroids = []
score   = 0
lives   = 3
wave    = 1
best    = load_best()
spawn_t = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if state == "menu" and event.key == pygame.K_SPACE:
                score=0;lives=3;wave=1;bullets=[];asteroids=[];ship.centerx=WIDTH//2
                state="playing"
            elif state == "playing" and event.key == pygame.K_SPACE:
                if len(bullets)<4:
                    bullets.append(pygame.Rect(ship.centerx-4,ship.top,8,16))
            elif state == "gameover" and event.key == pygame.K_RETURN:
                state="menu"

    # Фон
    star_y = (star_y + 1) % HEIGHT
    screen.fill((5, 5, 20))
    for sx,sy,sr in stars:
        pygame.draw.circle(screen,(180,180,220),(sx,(sy+star_y)%HEIGHT),sr)

    if state == "playing":
        wave = 1 + score // 50
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  ship.x -= 5
        if keys[pygame.K_RIGHT]: ship.x += 5
        ship.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

        spawn_t += 1
        if spawn_t >= max(20, 60 - wave*4):
            asteroids.append(make_asteroid(wave)); spawn_t=0

        for b in bullets: b.y -= 10
        bullets=[b for b in bullets if b.y>0]
        for a in asteroids:
            a.y += 2 + wave*0.6
        for b in bullets[:]:
            for a in asteroids[:]:
                if b.colliderect(a):
                    bullets.remove(b); asteroids.remove(a); score+=10
                    break
        for a in asteroids[:]:
            if a.top > HEIGHT:
                asteroids.remove(a); lives-=1
            elif a.colliderect(ship):
                asteroids.remove(a); lives-=1
        if lives<=0:
            if score>best: best=score; save_best(best)
            state="gameover"

        # Малюємо
        pygame.draw.polygon(screen,(0,200,255),[(ship.centerx,ship.top),(ship.left,ship.bottom),(ship.right,ship.bottom)])
        for b in bullets: pygame.draw.rect(screen,(255,255,100),b)
        for a in asteroids: pygame.draw.ellipse(screen,(160,120,60),a)
        screen.blit(font.render(f"Score:{score}  Хвиля:{wave}",True,(255,255,255)),(10,10))
        for i in range(3):
            col=(220,40,40) if i<lives else (50,50,50)
            pygame.draw.circle(screen,col,(WIDTH-25-i*32,22),12)
    elif state == "menu":
        t1=font_big.render("КОСМОШУТЕР",True,(0,220,255))
        t2=font.render(f"Рекорд: {best}",True,(200,255,200))
        t3=font.render("SPACE — почати",True,(180,180,220))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,120)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,220)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,310)))
    elif state == "gameover":
        new_r=score>=best and score>0
        t1=font_big.render("GAME OVER",True,(255,50,50))
        t2=font.render(f"Score:{score}  {'РЕКОРД!' if new_r else 'Рекорд:'+str(best)}",True,(255,220,0) if new_r else (255,255,255))
        t3=font.render("ENTER — меню",True,(180,180,200))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,120)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,220)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,310)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 67,
        title: { uk: "Огляд Модуля 5", ru: "Обзор Модуля 5" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що ти вивчив у Модулі 5? Назви 5 концепцій Pygame. Яка була найцікавіша?</p></div><div class="theory-block"><h3>📦 Шпаргалка Pygame</h3><pre class="code-example">pygame.init()                    # ініціалізація
screen = pygame.display.set_mode # вікно
clock.tick(60)                   # FPS
pygame.draw.rect/circle/line     # фігури
font.render + screen.blit        # текст
key.get_pressed()                # клавіші
mouse.get_pos()                  # миша
Rect.colliderect()               # зіткнення
pygame.time.get_ticks()          # таймер
game_state                       # стани</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что ты изучил в Модуле 5? Назови 5 концепций Pygame. Какая была самой интересной?</p></div><div class="theory-block"><h3>📦 Шпаргалка Pygame</h3><pre class="code-example">pygame.init()                    # инициализация
screen = pygame.display.set_mode # окно
clock.tick(60)                   # FPS
pygame.draw.rect/circle/line     # фигуры
font.render + screen.blit        # текст
key.get_pressed()                # клавиши
mouse.get_pos()                  # мышь
Rect.colliderect()               # столкновения
pygame.time.get_ticks()          # таймер
game_state                       # состояния</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Виправ баг: відсутній pygame.init()", ru:"⭐ Исправь баг: отсутствует pygame.init()" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Виправ баг: неправильна перевірка QUIT", ru:"⭐ Исправь баг: неправильная проверка QUIT" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Виправ: гравітація не працює", ru:"⭐⭐ Исправь: гравитация не работает" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Виправ: перевірка зіткнення неправильна", ru:"⭐⭐ Исправь: проверка столкновения неправильная" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай відсутній clock.tick()", ru:"⭐⭐ Добавь отсутствующий clock.tick()" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Налагодь відображення HUD", ru:"⭐⭐⭐ Отладь отображение HUD" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Виправ баг у машині станів", ru:"⭐⭐⭐⭐ Исправь баг в машине состояний" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Напиши власну шпаргалку", ru:"⭐⭐⭐⭐ Напиши свою собственную шпаргалку" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# УРОК 69 — ОГЛЯД. Знайди та виправ всі баги!
import pygame, sys, random

# БАГ 1: pygame.init() забули!
# pygame.init()   <-- розкоментуй

pygame.init()

WIDTH, HEIGHT = 600, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Урок 69 — Огляд")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 28)

player = pygame.Rect(280, 180, 40, 40)
speed  = 5

GRAVITY = 0.5
vy = 0
FLOOR = HEIGHT - 60

score = 0
game_state = "playing"

while True:
    for event in pygame.event.get():
        # БАГ 2: неправильна перевірка QUIT
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            # БАГ 3: стрибок завжди, не тільки на землі
            if event.key == pygame.K_SPACE:
                if player.bottom >= FLOOR + 40:  # виправлено
                    vy = -12

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player.x -= speed
    if keys[pygame.K_RIGHT]: player.x += speed

    # БАГ 4: гравітація не додається до vy
    vy += GRAVITY   # виправлено
    player.y += int(vy)

    if player.bottom >= FLOOR + 40:
        player.bottom = FLOOR + 40
        vy = 0

    screen.fill((20, 20, 40))
    pygame.draw.rect(screen,(60,120,60),(0,FLOOR+20,WIDTH,HEIGHT))
    pygame.draw.rect(screen,(0,200,255),player)

    t = font.render(f"Score: {score}  SPACE=стрибок", True,(255,255,255))
    screen.blit(t, (10,10))

    pygame.display.flip()
    # БАГ 5: clock.tick забули
    clock.tick(60)
`
      },
      {
        id: 68,
        title: { uk: "Фінальний проект Модуля 5", ru: "Финальный проект Модуля 5" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Ти пройшов весь Модуль 5! Тепер час зробити СВОЮ гру з нуля. Все що потрібно — вже знаєш!</p></div><div class="theory-block"><h3>📦 Шаблон фінального проекту</h3><pre class="code-example"># Обери тему: ловець / шутер / платформер
# Кастомізуй: кольори, розміри, швидкість
# Додай: частинки, рекорд, рівні
# Збережи рекорд у файл
# Покажи батькам і друзям!</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Ты прошёл весь Модуль 5! Теперь время сделать СВОЮ игру с нуля. Всё что нужно — уже знаешь!</p></div><div class="theory-block"><h3>📦 Шаблон финального проекта</h3><pre class="code-example"># Выбери тему: ловец / шутер / платформер
# Кастомизируй: цвета, размеры, скорость
# Добавь: частицы, рекорд, уровни
# Сохрани рекорд в файл
# Покажи родителям и друзьям!</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Обери тему своєї гри", ru:"⭐ Выбери тему своей игры" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Кастомізуй гравця", ru:"⭐ Кастомизируй игрока" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай унікального ворога", ru:"⭐⭐ Добавь уникального врага" }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Реалізуй систему підрахунку очок", ru:"⭐⭐ Реализуй систему подсчёта очков" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай частинки", ru:"⭐⭐ Добавь частицы" }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Додай рівні складності", ru:"⭐⭐⭐ Добавь уровни сложности" }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Збережи рекорд у файл", ru:"⭐⭐⭐⭐ Сохрани рекорд в файл" }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Презентуй гру класу", ru:"⭐⭐⭐⭐ Представь игру классу" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ╔══════════════════════════════════════════╗
# ║  МОЯ ГРА — ФІНАЛЬНИЙ ПРОЕКТ МОДУЛЯ 5   ║
# ║  Назва: _______________________________  ║
# ║  Автор: _______________________________  ║
# ╚══════════════════════════════════════════╝
import pygame, sys, random
pygame.init()

# === НАЛАШТУВАННЯ (змінюй під свою гру!) ===
WIDTH, HEIGHT = 600, 400
TITLE   = "Моя гра"        # назва вікна
BG_COLOR = (10, 10, 30)    # колір фону

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption(TITLE)
clock    = pygame.time.Clock()
font     = pygame.font.SysFont("arial", 28)
font_big = pygame.font.SysFont("arial", 56, bold=True)

# === РЕКОРД ===
def load_best():
    try:
        with open("my_game_record.txt") as f: return int(f.read())
    except: return 0
def save_best(v):
    with open("my_game_record.txt","w") as f: f.write(str(v))

# === СТАН ГРИ ===
game_state = "menu"
score  = 0
lives  = 3
level  = 1
best   = load_best()
particles = []

# === ГРАВЕЦЬ (кастомізуй!) ===
player = pygame.Rect(WIDTH//2-20, HEIGHT-60, 40, 40)
PLAYER_COLOR = (0, 200, 255)

# === ВОРОГИ ===
enemies = []
def make_enemy():
    return pygame.Rect(random.randint(0,WIDTH-30), 0, 30, 30)

# === ЧАСТИНКИ ===
def spawn_particles(x, y):
    for _ in range(15):
        particles.append({"x":float(x),"y":float(y),
            "dx":random.uniform(-4,4),"dy":random.uniform(-5,1),
            "life":30,"max_life":30,"size":random.randint(3,8)})

spawn_timer = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if game_state=="menu" and event.key==pygame.K_SPACE:
                score=0;lives=3;level=1;enemies=[];particles=[]
                player.center=(WIDTH//2,HEIGHT-40); game_state="playing"
            elif game_state=="gameover" and event.key==pygame.K_RETURN:
                game_state="menu"

    if game_state == "playing":
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  player.x -= 5
        if keys[pygame.K_RIGHT]: player.x += 5
        player.clamp_ip(pygame.Rect(0,0,WIDTH,HEIGHT))

        level = 1 + score // 50
        spawn_timer += 1
        if spawn_timer >= max(15, 50 - level*4):
            enemies.append(make_enemy()); spawn_timer=0

        for e in enemies:
            e.y += 2 + level * 0.5
        for e in enemies[:]:
            if e.colliderect(player):
                spawn_particles(e.centerx, e.centery)
                enemies.remove(e); lives-=1
            elif e.top > HEIGHT:
                enemies.remove(e)
        if lives <= 0:
            if score>best: best=score; save_best(best)
            game_state="gameover"

        score += 1

    for p in particles:
        p["x"]+=p["dx"]; p["y"]+=p["dy"]; p["dy"]+=0.2; p["life"]-=1
    particles[:] = [p for p in particles if p["life"]>0]

    screen.fill(BG_COLOR)
    if game_state == "menu":
        t1=font_big.render(TITLE,True,(255,220,0))
        t2=font.render(f"Рекорд: {best}",True,(200,255,200))
        t3=font.render("SPACE — грати",True,(180,180,220))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,120)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,220)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,310)))
    elif game_state == "playing":
        for e in enemies: pygame.draw.rect(screen,(200,60,60),e)
        pygame.draw.rect(screen,PLAYER_COLOR,player,border_radius=6)
        for p in particles:
            pygame.draw.circle(screen,(255,180,0),(int(p["x"]),int(p["y"])),max(1,p["size"]))
        screen.blit(font.render(f"Score:{score}  Рівень:{level}",True,(255,255,255)),(10,10))
        for i in range(3):
            col=(220,40,40) if i<lives else (50,50,50)
            pygame.draw.circle(screen,col,(WIDTH-25-i*32,22),12)
    elif game_state == "gameover":
        new_r=score>=best and score>0
        t1=font_big.render("GAME OVER",True,(255,50,50))
        t2=font.render(f"Score:{score}",True,(255,255,255))
        t3=font.render("НОВИЙ РЕКОРД!" if new_r else f"Рекорд:{best}",True,(255,220,0) if new_r else (180,180,200))
        t4=font.render("ENTER — меню",True,(180,180,200))
        screen.blit(t1,t1.get_rect(center=(WIDTH//2,100)))
        screen.blit(t2,t2.get_rect(center=(WIDTH//2,200)))
        screen.blit(t3,t3.get_rect(center=(WIDTH//2,260)))
        screen.blit(t4,t4.get_rect(center=(WIDTH//2,330)))

    pygame.display.flip()
    clock.tick(60)
`
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  {
    moduleId: 6,
    moduleTitle: { uk: "Моя Перша Гра", ru: "Моя Первая Игра" },
    moduleIcon: "🏆",
    lessons: [
// ── Урок 69 — Персонаж рухається ─────────────────────
      {
        id: 69,
        title: { uk: "Персонаж рухається (Pygame)", ru: "Персонаж двигается (Pygame)" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що ти вмієш у Pygame після Модуля 5?<br>Вікно, кольори, фігури, ігровий цикл.<br>Сьогодні починаємо Модуль 6 — робимо справжню гру!</p></div><div class="theory-block"><h3>🕹️ Рух персонажа клавішами</h3><pre class="code-example">px, py = 400, 300  # позиція гравця
SPEED = 5

# В ігровому циклі:
keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:  px -= SPEED
if keys[pygame.K_RIGHT]: px += SPEED
if keys[pygame.K_UP]:    py -= SPEED
if keys[pygame.K_DOWN]:  py += SPEED

# Межі екрану:
px = max(20, min(W-20, px))
py = max(20, min(H-20, py))

# Намалювати гравця:
pygame.draw.rect(screen, GREEN, (px-20, py-20, 40, 40))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что умеешь в Pygame после Модуля 5?<br>Окно, цвета, фигуры, игровой цикл.<br>Сегодня начинаем Модуль 6 — делаем настоящую игру!</p></div><div class="theory-block"><h3>🕹️ Движение персонажа клавишами</h3><pre class="code-example">px, py = 400, 300  # позиция игрока
SPEED = 5

keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:  px -= SPEED
if keys[pygame.K_RIGHT]: px += SPEED
if keys[pygame.K_UP]:    py -= SPEED
if keys[pygame.K_DOWN]:  py += SPEED

px = max(20, min(W-20, px))
py = max(20, min(H-20, py))

pygame.draw.rect(screen, GREEN, (px-20, py-20, 40, 40))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Намалюй квадрат-гравця. Він рухається стрілками.", ru:"⭐ Нарисуй квадрат-игрока. Он движется стрелками." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Гравець не виходить за межі екрану.", ru:"⭐ Игрок не выходит за границы экрана." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Завантаж зображення гравця через pygame.image.load().", ru:"⭐⭐ Загрузи изображение игрока через pygame.image.load()." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Відображай координати гравця на екрані (pygame.font).", ru:"⭐⭐ Отображай координаты игрока на экране (pygame.font)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Гравець залишає слід (список попередніх позицій).", ru:"⭐⭐ Игрок оставляет след (список предыдущих позиций)." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Гравець збирає монети (жовті кола). Рахунок зростає.", ru:"⭐⭐⭐ Игрок собирает монеты (жёлтые круги). Счёт растёт." }},
          { num:7, level:"hard",   text:{ uk:"⭐⭐⭐ Ворог рухається автоматично. Зіткнення = GameOver.", ru:"⭐⭐⭐ Враг движется автоматически. Столкновение = GameOver." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Міні-гра: персонаж + 5 монет + 2 вороги + рахунок.", ru:"⭐⭐⭐⭐ Мини-игра: персонаж + 5 монет + 2 врага + счёт." }}
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
import pygame, sys
pygame.init()

W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Мій персонаж")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 24)

px, py = W//2, H//2
SPEED = 5
GREEN = (0, 200, 50)
BLUE  = (30, 100, 200)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px = max(20, px - SPEED)
    if keys[pygame.K_RIGHT]: px = min(W-20, px + SPEED)
    if keys[pygame.K_UP]:    py = max(20, py - SPEED)
    if keys[pygame.K_DOWN]:  py = min(H-20, py + SPEED)

    screen.fill(BLUE)
    pygame.draw.rect(screen, GREEN, (0, H-80, W, 80))
    pygame.draw.rect(screen, (50, 255, 50), (px-20, py-20, 40, 40))

    txt = font.render(f"X:{px}  Y:{py}", True, (255,255,255))
    screen.blit(txt, (10, 10))

    pygame.display.flip()
    clock.tick(60)
`
      },

      {
        id: 70,
        title: { uk: "Планування гри", ru: "Планирование игры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Яку гру ти хочеш зробити? Будуємо справжню гру!</p></div><div class="theory-block"><h3>🗺️ Design document</h3><pre class="code-example"># Гра: Космічний Захисник
# Жанр: shoot'em up
# Гравець: корабель ліво/право, стріляє вгору
# Вороги: астероїди падають зверху
# Мета: вижити, набрати очки
# Кінець: 3 зіткнення = Game Over</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Планируем игру вместе!</p></div><div class="theory-block"><h3>🗺️ Планирование</h3><pre class="code-example"># Игра: Космический Защитник
# Жанр: shoot'em up
# Игрок: корабль лево/право, стреляет вверх
# Враги: астероиды сверху
# Цель: выжить, набрать очки
# Конец: 3 столкновения = Game Over</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Намалюй ескіз гри на папері.", ru:"⭐ Нарисуй эскиз игры на бумаге." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Запиши design doc (жанр, мета, кінець).", ru:"⭐ Запиши design doc." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Запусти шаблон і поміняй назву вікна.", ru:"⭐⭐ Запусти шаблон, измени название окна." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Намалюй гравця трикутником.", ru:"⭐⭐ Нарисуй игрока треугольником." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай назву гри по центру екрану.", ru:"⭐⭐ Добавь название игры по центру." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Лічильник FPS у кут екрану.", ru:"⭐⭐⭐ Счётчик FPS в углу." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Пульсуючий заголовок (розмір змінюється).", ru:"⭐⭐⭐⭐ Пульсирующий заголовок." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Власний design doc для СВОЄЇ гри.", ru:"⭐⭐⭐⭐ Design doc для СВОЕЙ игры." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 71 — Планування гри
import pygame, sys
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Космічний Захисник")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 32)
fps_font = pygame.font.SysFont("Arial", 18)
BLACK = (0, 0, 20)
WHITE = (255, 255, 255)
YELLOW = (255, 220, 0)
ORANGE = (255, 140, 0)
px, py = W // 2, H - 80
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
    screen.fill(BLACK)
    pygame.draw.polygon(screen, YELLOW, [(px, py-25),(px-20, py+15),(px+20, py+15)])
    pygame.draw.circle(screen, ORANGE, (px, py+15), 8)
    title = font.render("Космічний Захисник", True, WHITE)
    screen.blit(title, (W//2 - title.get_width()//2, 20))
    fps_txt = fps_font.render(f"FPS: {int(clock.get_fps())}", True, (180,180,180))
    screen.blit(fps_txt, (10, 10))
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 71,
        title: { uk: "Зоряне поле", ru: "Звёздное поле" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як намалювати нічне небо? Багато маленьких крапок!</p></div><div class="theory-block"><h3>⭐ Анімоване зоряне поле</h3><pre class="code-example">stars = []
for i in range(150):
    stars.append({'x': random.randint(0, W),
                   'y': random.randint(0, H),
                   'speed': random.uniform(0.5, 3.0),
                   'size': random.randint(1, 3)})
for star in stars:
    pygame.draw.circle(screen, WHITE,
        (int(star['x']), int(star['y'])), star['size'])
    star['y'] += star['speed']
    if star['y'] > H:
        star['y'] = 0
        star['x'] = random.randint(0, W)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Список звёзд — каждая со своей скоростью!</p></div><div class="theory-block"><h3>⭐ Звёздное поле</h3><pre class="code-example">stars = [{'x':random.randint(0,W),'y':random.randint(0,H),
  'speed':random.uniform(0.5,3.0),'size':random.randint(1,3)}
  for _ in range(150)]
for star in stars:
    pygame.draw.circle(screen,WHITE,(int(star['x']),int(star['y'])),star['size'])
    star['y']+=star['speed']
    if star['y']>H: star['y']=0; star['x']=random.randint(0,W)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Запусти і подивись на зірки.", ru:"⭐ Запусти и посмотри на звёзды." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зміни кількість зірок на 200.", ru:"⭐ Измени количество звёзд на 200." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Другий шар зірок (повільніший, синюватий).", ru:"⭐⭐ Второй слой (медленнее, синеватый)." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Деякі зірки більші (розмір 3-4).", ru:"⭐⭐ Некоторые звёзды крупнее (размер 3-4)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай корабель гравця поверх зірок.", ru:"⭐⭐ Добавь корабль игрока поверх звёзд." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Паралакс: два шари з різною швидкістю.", ru:"⭐⭐⭐ Параллакс: два слоя с разной скоростью." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Падаюча зірка (метеор) кожні 3 секунди.", ru:"⭐⭐⭐⭐ Падающая звезда каждые 3 сек." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Зорі різних кольорів (білі, блакитні, жовті).", ru:"⭐⭐⭐⭐ Звёзды разных цветов." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 72 — Зоряне поле
import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Зоряне поле")
clock = pygame.time.Clock()
BLACK = (0, 0, 20)
WHITE = (255, 255, 255)
stars = [{'x': random.randint(0,W), 'y': random.randint(0,H),
           'speed': random.uniform(0.5,3.0), 'size': random.randint(1,3)}
          for _ in range(150)]
stars2 = [{'x': random.randint(0,W), 'y': random.randint(0,H),
            'speed': random.uniform(0.2,0.8), 'size': 1}
           for _ in range(80)]
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
    screen.fill(BLACK)
    for star in stars2:
        pygame.draw.circle(screen, (100,120,200), (int(star['x']),int(star['y'])), star['size'])
        star['y'] += star['speed']
        if star['y'] > H: star['y'] = 0; star['x'] = random.randint(0, W)
    for star in stars:
        pygame.draw.circle(screen, WHITE, (int(star['x']),int(star['y'])), star['size'])
        star['y'] += star['speed']
        if star['y'] > H: star['y'] = 0; star['x'] = random.randint(0, W)
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 72,
        title: { uk: "Корабель гравця", ru: "Корабль игрока" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як зробити гравця що рухається клавіатурою?</p></div><div class="theory-block"><h3>🚀 Клас Player</h3><pre class="code-example">class Player:
    def __init__(self):
        self.x = W // 2; self.y = H - 80; self.speed = 5
    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  self.x -= self.speed
        if keys[pygame.K_RIGHT]: self.x += self.speed
        self.x = max(25, min(W-25, self.x))
    def draw(self, screen):
        pygame.draw.polygon(screen, YELLOW,
            [(self.x, self.y-28),(self.x-20,self.y+18),(self.x+20,self.y+18)])
        pygame.draw.circle(screen, ORANGE, (self.x, self.y+18), 8)
        pygame.draw.circle(screen, CYAN,   (self.x, self.y-8),  7)</pre></div>`,
          ru: `<div class="theory-block"><h3>🚀 Класс Player</h3><pre class="code-example">class Player:
    def __init__(self):
        self.x=W//2; self.y=H-80; self.speed=5
    def update(self):
        keys=pygame.key.get_pressed()
        if keys[pygame.K_LEFT]: self.x-=self.speed
        if keys[pygame.K_RIGHT]: self.x+=self.speed
        self.x=max(25,min(W-25,self.x))
    def draw(self,s):
        pygame.draw.polygon(s,YELLOW,[(self.x,self.y-28),(self.x-20,self.y+18),(self.x+20,self.y+18)])
        pygame.draw.circle(s,ORANGE,(self.x,self.y+18),8)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Запусти і порухай корабель стрілками.", ru:"⭐ Запусти и подвигай корабль." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зміни швидкість на 8.", ru:"⭐ Измени скорость на 8." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай зоряне поле з уроку 72.", ru:"⭐⭐ Добавь звёздное поле из урока 72." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Намалюй крила (2 трикутники по боках).", ru:"⭐⭐ Нарисуй крылья (2 треугольника)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Анімація двигуна: glow змінює розмір.", ru:"⭐⭐ Анимируй двигатель: glow меняет размер." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Плавне прискорення (velocity).", ru:"⭐⭐⭐ Плавное ускорение (velocity)." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Корабель з 6+ деталей.", ru:"⭐⭐⭐⭐ Корабль из 6+ деталей." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Рух по осі Y в нижній третині.", ru:"⭐⭐⭐⭐ Движение по Y в нижней трети." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 73 — Корабель гравця
import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Корабель гравця")
clock = pygame.time.Clock()
BLACK=(0,0,20); WHITE=(255,255,255); YELLOW=(255,220,0); ORANGE=(255,140,0); CYAN=(0,200,255)
stars = [{'x':random.randint(0,W),'y':random.randint(0,H),'speed':random.uniform(0.5,2.5),'size':random.randint(1,2)} for _ in range(120)]
class Player:
    def __init__(self):
        self.x=W//2; self.y=H-80; self.speed=5; self.glow=8.0; self.gdir=1
    def update(self):
        keys=pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  self.x=max(25,self.x-self.speed)
        if keys[pygame.K_RIGHT]: self.x=min(W-25,self.x+self.speed)
        self.glow+=self.gdir*0.15
        if self.glow>12 or self.glow<5: self.gdir*=-1
    def draw(self,surf):
        x,y=int(self.x),int(self.y)
        pygame.draw.circle(surf,ORANGE,(x,y+18),int(self.glow))
        pygame.draw.polygon(surf,YELLOW,[(x,y-28),(x-20,y+18),(x+20,y+18)])
        pygame.draw.circle(surf,CYAN,(x,y-8),7)
player=Player()
while True:
    for event in pygame.event.get():
        if event.type==pygame.QUIT: pygame.quit(); sys.exit()
    player.update()
    screen.fill(BLACK)
    for s in stars:
        pygame.draw.circle(screen,WHITE,(int(s['x']),int(s['y'])),s['size'])
        s['y']+=s['speed']
        if s['y']>H: s['y']=0; s['x']=random.randint(0,W)
    player.draw(screen)
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 73,
        title: { uk: "Система стрільби", ru: "Система стрельбы" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Кулі — список словників. Кожна рухається вгору!</p></div><div class="theory-block"><h3>🔫 Стрільба</h3><pre class="code-example">bullets = []; shoot_timer = 0
keys = pygame.key.get_pressed()
if keys[pygame.K_SPACE] and shoot_timer <= 0:
    bullets.append({'x': px, 'y': py - 30})
    shoot_timer = 12
if shoot_timer > 0: shoot_timer -= 1
for b in bullets[:]:
    b['y'] -= 12
    if b['y'] < -10: bullets.remove(b)
for b in bullets:
    pygame.draw.rect(screen, YELLOW, (b['x']-3, b['y']-10, 6, 15))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Пули — список словарей. Каждая движется вверх!</p></div><div class="theory-block"><h3>🔫 Стрельба</h3><pre class="code-example">bullets = []; shoot_timer = 0
keys = pygame.key.get_pressed()
if keys[pygame.K_SPACE] and shoot_timer <= 0:
    bullets.append({'x': px, 'y': py - 30})
    shoot_timer = 12
if shoot_timer > 0: shoot_timer -= 1
for b in bullets[:]:
    b['y'] -= 12
    if b['y'] < -10: bullets.remove(b)
for b in bullets:
    pygame.draw.circle(screen, YELLOW, (int(b['x']), int(b['y'])), 4)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Запусти і пострілюй пробілом.", ru:"⭐ Запусти и стреляй пробелом." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зміни швидкість кулі на 15.", ru:"⭐ Скорость пули 15." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Кулі червоні замість жовтих.", ru:"⭐⭐ Пули красные." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Максимум 5 куль на екрані.", ru:"⭐⭐ Максимум 5 пуль." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Куля у вигляді кола.", ru:"⭐⭐ Пуля-кружок." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Подвійний постріл (2 кулі одночасно).", ru:"⭐⭐⭐ Двойной выстрел." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Потрійний постріл (центр + 2 під кутом).", ru:"⭐⭐⭐⭐ Тройной выстрел." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ 30 патронів + перезарядка 2 сек.", ru:"⭐⭐⭐⭐ 30 патронов + перезарядка." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 74 — Система стрільби
import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Система стрільби")
clock = pygame.time.Clock()
BLACK=(0,0,20); WHITE=(255,255,255); YELLOW=(255,220,0); ORANGE=(255,140,0); CYAN=(0,200,255)
stars=[{'x':random.randint(0,W),'y':random.randint(0,H),'speed':random.uniform(0.5,2.5),'size':1} for _ in range(100)]
px,py=W//2,H-80; bullets=[]; shoot_timer=0
while True:
    for event in pygame.event.get():
        if event.type==pygame.QUIT: pygame.quit(); sys.exit()
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(25,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-25,px+5)
    if keys[pygame.K_SPACE] and shoot_timer<=0:
        bullets.append({'x':px,'y':py-30}); shoot_timer=12
    if shoot_timer>0: shoot_timer-=1
    for b in bullets[:]:
        b['y']-=12
        if b['y']<-10: bullets.remove(b)
    screen.fill(BLACK)
    for s in stars:
        pygame.draw.circle(screen,WHITE,(int(s['x']),int(s['y'])),s['size'])
        s['y']+=s['speed']
        if s['y']>H: s['y']=0; s['x']=random.randint(0,W)
    for b in bullets: pygame.draw.rect(screen,YELLOW,(b['x']-3,b['y']-10,6,15))
    pygame.draw.circle(screen,ORANGE,(px,py+15),8)
    pygame.draw.polygon(screen,YELLOW,[(px,py-28),(px-20,py+15),(px+20,py+15)])
    pygame.draw.circle(screen,CYAN,(px,py-8),7)
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 74,
        title: { uk: "Вороги: астероїди", ru: "Враги: астероиды" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Астероїд — нерівний багатокутник!</p></div><div class="theory-block"><h3>☄️ Клас Enemy</h3><pre class="code-example">import math
class Enemy:
    def __init__(self):
        self.x=float(random.randint(40,W-40)); self.y=-30.0
        self.speed=random.uniform(1.5,3.5)
        self.radius=random.randint(20,35)
        self.angle=0
        self.offsets=[random.randint(-8,8) for _ in range(8)]
    def get_points(self):
        return [(self.x+(self.radius+self.offsets[i])*math.cos(math.radians(self.angle+i*45)),
                 self.y+(self.radius+self.offsets[i])*math.sin(math.radians(self.angle+i*45)))
                for i in range(8)]
    def update(self): self.y+=self.speed; self.angle+=1.5
    def draw(self,s):
        pts=self.get_points()
        pygame.draw.polygon(s,(150,100,60),pts)
        pygame.draw.polygon(s,(220,170,100),pts,2)</pre></div>`,
          ru: `<div class="theory-block"><h3>☄️ Астероиды</h3><pre class="code-example">class Enemy:
    def __init__(self):
        self.x=float(random.randint(40,W-40)); self.y=-30.0
        self.speed=random.uniform(1.5,3.5); self.radius=random.randint(20,35)
        self.angle=0; self.offsets=[random.randint(-8,8) for _ in range(8)]
    def update(self): self.y+=self.speed; self.angle+=1.5
    def draw(self,s):
        pts=[(self.x+(self.radius+self.offsets[i])*math.cos(math.radians(self.angle+i*45)),
              self.y+(self.radius+self.offsets[i])*math.sin(math.radians(self.angle+i*45))) for i in range(8)]
        pygame.draw.polygon(s,(150,100,60),pts)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Запусти і подивись як падають астероїди.", ru:"⭐ Запусти и посмотри как падают астероиды." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Збільш кількість астероїдів до 8.", ru:"⭐ Увеличь количество до 8." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Зміни колір астероїдів на сірий.", ru:"⭐⭐ Серый цвет астероидов." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Нові астероїди кожні 60 кадрів.", ru:"⭐⭐ Новые каждые 60 кадров." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Швидкість x1.5 на рівні 2.", ru:"⭐⭐ Скорость x1.5 на уровне 2." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Великі і маленькі астероїди (2 розміри).", ru:"⭐⭐⭐ Большие и маленькие (2 размера)." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Великий розбивається на 2 маленьких.", ru:"⭐⭐⭐⭐ Большой разбивается на 2 маленьких." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Астероїд летить по діагоналі (dx, dy).", ru:"⭐⭐⭐⭐ Астероид летит по диагонали." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 75 — Вороги: астероїди
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Астероїди!")
clock = pygame.time.Clock()
BLACK=(0,0,20); WHITE=(255,255,255); YELLOW=(255,220,0); ORANGE=(255,140,0); CYAN=(0,200,255)
stars=[{'x':random.randint(0,W),'y':random.randint(0,H),'speed':random.uniform(0.5,2.0),'size':1} for _ in range(100)]
class Enemy:
    def __init__(self):
        self.x=float(random.randint(40,W-40)); self.y=-30.0
        self.speed=random.uniform(1.5,3.5); self.radius=random.randint(20,35)
        self.angle=0; self.offsets=[random.randint(-8,8) for _ in range(8)]
    def get_points(self):
        return [(self.x+(self.radius+self.offsets[i])*math.cos(math.radians(self.angle+i*45)),
                 self.y+(self.radius+self.offsets[i])*math.sin(math.radians(self.angle+i*45))) for i in range(8)]
    def update(self): self.y+=self.speed; self.angle+=1.5
    def draw(self,surf):
        pts=self.get_points()
        pygame.draw.polygon(surf,(150,100,60),pts)
        pygame.draw.polygon(surf,(220,170,100),pts,2)
enemies=[]; bullets=[]; spawn_timer=0; shoot_timer=0
px,py=W//2,H-80
while True:
    for event in pygame.event.get():
        if event.type==pygame.QUIT: pygame.quit(); sys.exit()
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(25,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-25,px+5)
    if keys[pygame.K_SPACE] and shoot_timer<=0:
        bullets.append({'x':px,'y':py-30}); shoot_timer=12
    if shoot_timer>0: shoot_timer-=1
    spawn_timer+=1
    if spawn_timer>=90 and len(enemies)<6: enemies.append(Enemy()); spawn_timer=0
    for b in bullets[:]:
        b['y']-=12
        if b['y']<-10: bullets.remove(b)
    for e in enemies[:]:
        e.update()
        if e.y>H+40: enemies.remove(e)
    screen.fill(BLACK)
    for s in stars:
        pygame.draw.circle(screen,WHITE,(int(s['x']),int(s['y'])),s['size'])
        s['y']+=s['speed']
        if s['y']>H: s['y']=0; s['x']=random.randint(0,W)
    for b in bullets: pygame.draw.rect(screen,YELLOW,(b['x']-3,b['y']-10,6,15))
    for e in enemies: e.draw(screen)
    pygame.draw.circle(screen,ORANGE,(px,py+15),8)
    pygame.draw.polygon(screen,YELLOW,[(px,py-28),(px-20,py+15),(px+20,py+15)])
    pygame.draw.circle(screen,CYAN,(px,py-8),7)
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 75,
        title: { uk: "Зіткнення та вибухи", ru: "Коллизии и взрывы" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Зіткнення двох кіл: відстань між центрами!</p></div><div class="theory-block"><h3>💥 Перевірка зіткнень</h3><pre class="code-example">def circles_collide(x1,y1,r1,x2,y2,r2):
    return math.hypot(x1-x2,y1-y2) < r1+r2
for b in bullets[:]:
    for e in enemies[:]:
        if circles_collide(b['x'],b['y'],4,e.x,e.y,e.radius):
            bullets.remove(b); enemies.remove(e); score+=10
            for _ in range(10):
                particles.append({'x':e.x,'y':e.y,
                    'vx':random.uniform(-5,5),
                    'vy':random.uniform(-5,5),
                    'life':35,
                    'color':random.choice([YELLOW,ORANGE,RED])})
            break</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Столкновение двух кругов: расстояние между центрами!</p></div><div class="theory-block"><h3>💥 Проверка столкновений</h3><pre class="code-example">def circles_collide(x1,y1,r1,x2,y2,r2):
    return math.hypot(x1-x2,y1-y2) < r1+r2
for b in bullets[:]:
    for e in enemies[:]:
        if circles_collide(b['x'],b['y'],4,e.x,e.y,e.radius):
            bullets.remove(b); enemies.remove(e); score+=10
            for _ in range(10):
                particles.append({'x':e.x,'y':e.y,
                    'vx':random.uniform(-4,4),'vy':random.uniform(-4,4),
                    'life':25,'col':(255,150,0)})</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Запусти і збий астероїд — побач вибух!", ru:"⭐ Сбей астероид — взрыв!" }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зміни кількість частинок на 15.", ru:"⭐ Количество частиц 15." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Частинки різних кольорів.", ru:"⭐⭐ Частицы разных цветов." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Виводи рахунок на екрані.", ru:"⭐⭐ Выводи счёт на экране." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зіткнення гравця з ворогом — втрата 1 життя.", ru:"⭐⭐ Столкновение — потеря жизни." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ 3 життя, іконки кораблів.", ru:"⭐⭐⭐ 3 жизни — иконки кораблей." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Миготіння після зіткнення (120 кадрів).", ru:"⭐⭐⭐⭐ Мигание 120 кадров." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Анімований +10 спливає вгору.", ru:"⭐⭐⭐⭐ Анимированный +10." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 76 — Зіткнення та вибухи
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Зіткнення та вибухи!")
clock = pygame.time.Clock()
font=pygame.font.SysFont("Arial",28,bold=True)
BLACK=(0,0,20); WHITE=(255,255,255); YELLOW=(255,220,0); ORANGE=(255,140,0); CYAN=(0,200,255); RED=(255,60,60)
stars=[{'x':random.randint(0,W),'y':random.randint(0,H),'speed':random.uniform(0.5,2.0),'size':1} for _ in range(100)]
def circles_collide(x1,y1,r1,x2,y2,r2): return math.hypot(x1-x2,y1-y2)<r1+r2
class Enemy:
    def __init__(self):
        self.x=float(random.randint(40,W-40)); self.y=-30.0
        self.speed=random.uniform(1.5,3.0); self.radius=random.randint(20,35)
        self.angle=0; self.offsets=[random.randint(-8,8) for _ in range(8)]
    def get_points(self):
        return [(self.x+(self.radius+self.offsets[i])*math.cos(math.radians(self.angle+i*45)),
                 self.y+(self.radius+self.offsets[i])*math.sin(math.radians(self.angle+i*45))) for i in range(8)]
    def update(self): self.y+=self.speed; self.angle+=1.5
    def draw(self,s):
        pts=self.get_points(); pygame.draw.polygon(s,(150,100,60),pts); pygame.draw.polygon(s,(220,170,100),pts,2)
enemies=[]; bullets=[]; particles=[]; spawn_timer=0; shoot_timer=0; inv_timer=0
px,py=W//2,H-80; score=0; lives=3
while True:
    for event in pygame.event.get():
        if event.type==pygame.QUIT: pygame.quit(); sys.exit()
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(25,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-25,px+5)
    if keys[pygame.K_SPACE] and shoot_timer<=0: bullets.append({'x':px,'y':py-30}); shoot_timer=12
    if shoot_timer>0: shoot_timer-=1
    if inv_timer>0: inv_timer-=1
    spawn_timer+=1
    if spawn_timer>=80 and len(enemies)<6: enemies.append(Enemy()); spawn_timer=0
    for b in bullets[:]:
        b['y']-=12
        if b['y']<-10: bullets.remove(b)
    for b in bullets[:]:
        for e in enemies[:]:
            if b in bullets and e in enemies and circles_collide(b['x'],b['y'],4,e.x,e.y,e.radius):
                bullets.remove(b); enemies.remove(e); score+=10
                for _ in range(10): particles.append({'x':e.x,'y':e.y,'vx':random.uniform(-5,5),'vy':random.uniform(-5,5),'life':35,'color':random.choice([YELLOW,ORANGE,RED])})
                break
    for e in enemies[:]:
        e.update()
        if e.y>H+40: enemies.remove(e)
        elif inv_timer==0 and circles_collide(px,py,20,e.x,e.y,e.radius):
            enemies.remove(e); lives-=1; inv_timer=120
            for _ in range(12): particles.append({'x':px,'y':py,'vx':random.uniform(-6,6),'vy':random.uniform(-6,6),'life':40,'color':RED})
    for p in particles[:]:
        p['x']+=p['vx']; p['y']+=p['vy']; p['life']-=1
        if p['life']<=0: particles.remove(p)
    screen.fill(BLACK)
    for s in stars:
        pygame.draw.circle(screen,WHITE,(int(s['x']),int(s['y'])),s['size'])
        s['y']+=s['speed']
        if s['y']>H: s['y']=0; s['x']=random.randint(0,W)
    for b in bullets: pygame.draw.rect(screen,YELLOW,(b['x']-3,b['y']-10,6,15))
    for e in enemies: e.draw(screen)
    for p in particles: pygame.draw.circle(screen,p['color'],(int(p['x']),int(p['y'])),3)
    if inv_timer==0 or (inv_timer//8)%2==0:
        pygame.draw.circle(screen,ORANGE,(px,py+15),8)
        pygame.draw.polygon(screen,YELLOW,[(px,py-28),(px-20,py+15),(px+20,py+15)])
        pygame.draw.circle(screen,CYAN,(px,py-8),7)
    screen.blit(font.render(f"Score:{score}  Життя:{lives}",True,WHITE),(10,10))
    if lives<=0: screen.blit(pygame.font.SysFont("Arial",64).render("GAME OVER",True,RED),(W//2-180,H//2-40))
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 76,
        title: { uk: "Бонуси", ru: "Бонусы" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Power-up — предмет що покращує гравця!</p></div><div class="theory-block"><h3>⚡ Клас PowerUp</h3><pre class="code-example">class PowerUp:
    def __init__(self,x,y):
        self.x=float(x); self.y=float(y)
        self.type=random.choice(['shield','rapid','bomb'])
        self.speed=1.5; self.radius=14
    def update(self): self.y+=self.speed
    def draw(self,screen):
        colors={'shield':(0,150,255),'rapid':(255,220,0),'bomb':(255,60,60)}
        pygame.draw.circle(screen,colors[self.type],(int(self.x),int(self.y)),self.radius)
        pygame.draw.circle(screen,WHITE,(int(self.x),int(self.y)),self.radius,2)
# Після знищення ворога (20%):
if random.random() < 0.2:
    powerups.append(PowerUp(enemy.x, enemy.y))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Power-up — предмет который улучшает игрока!</p></div><div class="theory-block"><h3>⚡ Класс PowerUp</h3><pre class="code-example">class PowerUp:
    def __init__(self,x,y):
        self.x=float(x); self.y=float(y)
        self.type=random.choice(['shield','rapid','bomb'])
        self.speed=1.5; self.radius=14
    def update(self): self.y+=self.speed
    def draw(self,screen):
        colors={'shield':(0,150,255),'rapid':(255,220,0),'bomb':(255,60,60)}
        pygame.draw.circle(screen,colors[self.type],(int(self.x),int(self.y)),self.radius)
        icons={'shield':'🛡','rapid':'⚡','bomb':'💣'}
        label=font_sm.render(icons[self.type],True,(0,0,0))
        screen.blit(label,(int(self.x)-8,int(self.y)-8))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Запусти і збери бонус.", ru:"⭐ Запусти и собери бонус." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Шанс бонуса 40%.", ru:"⭐ Шанс бонуса 40%." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Виводи тип активного бонуса.", ru:"⭐⭐ Выводи тип бонуса." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Щит — синє кільце навколо корабля.", ru:"⭐⭐ Щит — синее кольцо." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Бомба знищує всіх ворогів.", ru:"⭐⭐ Бомба уничтожает всех врагов." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Таймер бонуса (5 сек).", ru:"⭐⭐⭐ Таймер бонуса (5 сек)." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Шкала таймера бонуса.", ru:"⭐⭐⭐⭐ Шкала таймера." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Придумай 4-й тип бонуса.", ru:"⭐⭐⭐⭐ 4-й тип бонуса." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 77 — Бонуси
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Бонуси!")
clock = pygame.time.Clock()
font=pygame.font.SysFont("Arial",24)
BLACK=(0,0,20); WHITE=(255,255,255); YELLOW=(255,220,0); ORANGE=(255,140,0); CYAN=(0,200,255); RED=(255,60,60); BLUE=(0,150,255)
stars=[{'x':random.randint(0,W),'y':random.randint(0,H),'speed':random.uniform(0.5,2.0),'size':1} for _ in range(100)]
def circles_collide(x1,y1,r1,x2,y2,r2): return math.hypot(x1-x2,y1-y2)<r1+r2
class Enemy:
    def __init__(self):
        self.x=float(random.randint(40,W-40)); self.y=-30.0
        self.speed=random.uniform(1.5,3.0); self.radius=random.randint(20,30)
        self.angle=0; self.offsets=[random.randint(-8,8) for _ in range(8)]
    def get_points(self):
        return [(self.x+(self.radius+self.offsets[i])*math.cos(math.radians(self.angle+i*45)),
                 self.y+(self.radius+self.offsets[i])*math.sin(math.radians(self.angle+i*45))) for i in range(8)]
    def update(self): self.y+=self.speed; self.angle+=1.5
    def draw(self,s):
        pts=self.get_points(); pygame.draw.polygon(s,(150,100,60),pts); pygame.draw.polygon(s,(220,170,100),pts,2)
class PowerUp:
    def __init__(self,x,y):
        self.x=float(x); self.y=float(y)
        self.type=random.choice(['shield','rapid','bomb'])
        self.speed=1.5; self.radius=14; self.bob=0.0
    def update(self): self.y+=self.speed; self.bob+=0.1
    def draw(self,s):
        c={'shield':BLUE,'rapid':YELLOW,'bomb':RED}[self.type]
        dy=int(math.sin(self.bob)*3)
        pygame.draw.circle(s,c,(int(self.x),int(self.y)+dy),self.radius)
        pygame.draw.circle(s,WHITE,(int(self.x),int(self.y)+dy),self.radius,2)
enemies=[]; bullets=[]; powerups=[]; particles=[]; spawn_timer=0; shoot_timer=0; inv_timer=0
px,py=W//2,H-80; score=0; lives=3; active_power=None; power_timer=0
while True:
    for event in pygame.event.get():
        if event.type==pygame.QUIT: pygame.quit(); sys.exit()
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(25,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-25,px+5)
    cool=8 if active_power=='rapid' else 12
    if keys[pygame.K_SPACE] and shoot_timer<=0: bullets.append({'x':px,'y':py-30}); shoot_timer=cool
    if shoot_timer>0: shoot_timer-=1
    if inv_timer>0: inv_timer-=1
    if power_timer>0: power_timer-=1
    else: active_power=None
    spawn_timer+=1
    if spawn_timer>=80 and len(enemies)<6: enemies.append(Enemy()); spawn_timer=0
    for b in bullets[:]:
        b['y']-=12
        if b['y']<-10: bullets.remove(b)
    for b in bullets[:]:
        for e in enemies[:]:
            if b in bullets and e in enemies and circles_collide(b['x'],b['y'],4,e.x,e.y,e.radius):
                bullets.remove(b); enemies.remove(e); score+=10
                if random.random()<0.25: powerups.append(PowerUp(e.x,e.y))
                for _ in range(8): particles.append({'x':e.x,'y':e.y,'vx':random.uniform(-4,4),'vy':random.uniform(-4,4),'life':30,'color':ORANGE})
                break
    for e in enemies[:]:
        e.update()
        if e.y>H+40: enemies.remove(e)
        elif inv_timer==0 and active_power!='shield' and circles_collide(px,py,20,e.x,e.y,e.radius):
            enemies.remove(e); lives-=1; inv_timer=120
    for pu in powerups[:]:
        pu.update()
        if pu.y>H+20: powerups.remove(pu)
        elif circles_collide(px,py,22,pu.x,pu.y,pu.radius):
            powerups.remove(pu)
            if pu.type=='bomb': enemies.clear(); score+=50
            else: active_power=pu.type; power_timer=300
    for p in particles[:]:
        p['x']+=p['vx']; p['y']+=p['vy']; p['life']-=1
        if p['life']<=0: particles.remove(p)
    screen.fill(BLACK)
    for s in stars:
        pygame.draw.circle(screen,WHITE,(int(s['x']),int(s['y'])),s['size'])
        s['y']+=s['speed']
        if s['y']>H: s['y']=0; s['x']=random.randint(0,W)
    for b in bullets: pygame.draw.rect(screen,YELLOW,(b['x']-3,b['y']-10,6,15))
    for e in enemies: e.draw(screen)
    for pu in powerups: pu.draw(screen)
    for p in particles: pygame.draw.circle(screen,p['color'],(int(p['x']),int(p['y'])),3)
    if active_power=='shield': pygame.draw.circle(screen,BLUE,(px,py),32,3)
    if inv_timer==0 or (inv_timer//8)%2==0:
        pygame.draw.circle(screen,ORANGE,(px,py+15),8)
        pygame.draw.polygon(screen,YELLOW,[(px,py-28),(px-20,py+15),(px+20,py+15)])
        pygame.draw.circle(screen,CYAN,(px,py-8),7)
    screen.blit(font.render(f"Score:{score}  Життя:{lives}",True,WHITE),(10,10))
    if active_power: screen.blit(font.render(f"Бонус:{active_power} ({power_timer//60}с)",True,CYAN),(10,38))
    if lives<=0: screen.blit(pygame.font.SysFont("Arial",64).render("GAME OVER",True,RED),(W//2-180,H//2-40))
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 77,
        title: { uk: "HUD і рахунок", ru: "HUD и счёт" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>HUD = Heads-Up Display. Весь інтерфейс поверх гри!</p></div><div class="theory-block"><h3>📊 Елементи HUD</h3><pre class="code-example"># Рахунок зліва
screen.blit(font.render(f"Score: {score}",True,WHITE),(10,8))
# Іконки кораблів = життя
for i in range(lives):
    x = W - 30 - i * 32
    pygame.draw.polygon(screen,YELLOW,[(x,8),(x-10,28),(x+10,28)])
# Рівень по центру
lt = font.render(f"Рівень {level}",True,CYAN)
screen.blit(lt,(W//2-lt.get_width()//2,8))
# Бонус-шкала
if active_power:
    bw = int(power_timer/300*200)
    pygame.draw.rect(screen,(50,50,80),(W//2-100,H-20,200,12))
    pygame.draw.rect(screen,CYAN,(W//2-100,H-20,bw,12))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>HUD = Heads-Up Display. Весь интерфейс поверх игры!</p></div><div class="theory-block"><h3>📊 Элементы HUD</h3><pre class="code-example"># Счёт слева
screen.blit(font.render(f"Score: {score}",True,WHITE),(10,8))
# Иконки кораблей = жизни
for i in range(lives):
    x = W - 30 - i * 32
    pygame.draw.polygon(screen,YELLOW,[(x,8),(x-10,28),(x+10,28)])
# Уровень по центру
lt = font.render(f"Уровень {level}",True,CYAN)
screen.blit(lt,(W//2-lt.get_width()//2,8))
# Полоска HP босса (когда активен):
if boss:
    pct = boss.hp / boss.max_hp
    pygame.draw.rect(screen,(100,0,0),(40,H-20,W-80,12))
    pygame.draw.rect(screen,(255,0,80),(40,H-20,int((W-80)*pct),12))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Виводи рахунок і кількість життів.", ru:"⭐ Выводи счёт и жизни." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Іконки кораблів для життів.", ru:"⭐ Иконки кораблей для жизней." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Анімований +10 спливає вгору.", ru:"⭐⭐ Анимированный +10." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Рівень по центру зверху.", ru:"⭐⭐ Уровень по центру." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Напівпрозорий фон під HUD.", ru:"⭐⭐ Полупрозрачный фон под HUD." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Шкала бонуса (смужка зменшується).", ru:"⭐⭐⭐ Шкала бонуса убывает." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Анімація числа рахунку.", ru:"⭐⭐⭐⭐ Анимация числа счёта." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Мінімапа у куті екрану.", ru:"⭐⭐⭐⭐ Миникарта в углу." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 78 — HUD і рахунок
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("HUD — Інтерфейс гри")
clock = pygame.time.Clock()
font=pygame.font.SysFont("Arial",26,bold=True); font_sm=pygame.font.SysFont("Arial",20)
BLACK=(0,0,20); WHITE=(255,255,255); YELLOW=(255,220,0); ORANGE=(255,140,0); CYAN=(0,200,255); RED=(255,60,60); GREEN=(60,220,60)
stars=[{'x':random.randint(0,W),'y':random.randint(0,H),'speed':random.uniform(0.5,2.0),'size':1} for _ in range(100)]
score=0; lives=3; level=1; popups=[]; active_power=None; power_timer=0
px,py=W//2,H-80; bullets=[]; enemies_list=[]; shoot_timer=0; spawn_timer=0
def draw_hud():
    hud=pygame.Surface((W,45),pygame.SRCALPHA); hud.fill((0,0,0,150)); screen.blit(hud,(0,0))
    screen.blit(font.render(f"Score:{score}",True,WHITE),(10,8))
    lt=font.render(f"Рівень {level}",True,CYAN)
    screen.blit(lt,(W//2-lt.get_width()//2,8))
    for i in range(lives):
        x=W-30-i*32; pygame.draw.polygon(screen,YELLOW,[(x,8),(x-10,28),(x+10,28)])
    if active_power and power_timer>0:
        bw=int(power_timer/300*200)
        pygame.draw.rect(screen,(50,50,80),(W//2-100,H-20,200,12))
        c={'shield':CYAN,'rapid':YELLOW,'bomb':RED}.get(active_power,GREEN)
        pygame.draw.rect(screen,c,(W//2-100,H-20,bw,12))
while True:
    for event in pygame.event.get():
        if event.type==pygame.QUIT: pygame.quit(); sys.exit()
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(25,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-25,px+5)
    if keys[pygame.K_SPACE] and shoot_timer<=0:
        bullets.append({'x':px,'y':py-30}); score+=10
        popups.append({'text':'+10','x':px,'y':py-50,'life':40,'vy':-1.5,'color':GREEN})
        shoot_timer=15
    if shoot_timer>0: shoot_timer-=1
    if power_timer>0: power_timer-=1
    else: active_power=None
    spawn_timer+=1
    if spawn_timer>=90: enemies_list.append({'x':float(random.randint(40,W-40)),'y':-30.0,'speed':2.0,'r':25}); spawn_timer=0
    for b in bullets[:]:
        b['y']-=12
        if b['y']<-10: bullets.remove(b)
    for e in enemies_list[:]:
        e['y']+=e['speed']
        if e['y']>H+40: enemies_list.remove(e)
    for p in popups[:]:
        p['y']+=p['vy']; p['life']-=1
        if p['life']<=0: popups.remove(p)
    screen.fill(BLACK)
    for s in stars:
        pygame.draw.circle(screen,WHITE,(int(s['x']),int(s['y'])),s['size'])
        s['y']+=s['speed']
        if s['y']>H: s['y']=0; s['x']=random.randint(0,W)
    for b in bullets: pygame.draw.rect(screen,YELLOW,(b['x']-3,b['y']-10,6,15))
    for e in enemies_list: pygame.draw.circle(screen,(150,100,60),(int(e['x']),int(e['y'])),e['r'])
    pygame.draw.circle(screen,ORANGE,(px,py+15),8)
    pygame.draw.polygon(screen,YELLOW,[(px,py-28),(px-20,py+15),(px+20,py+15)])
    pygame.draw.circle(screen,CYAN,(px,py-8),7)
    for p in popups: screen.blit(font_sm.render(p['text'],True,p['color']),(int(p['x'])-15,int(p['y'])))
    draw_hud()
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 78,
        title: { uk: "Рівні та хвилі", ru: "Уровни и волны" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що змінюється при новому рівні? Вороги швидші!</p></div><div class="theory-block"><h3>📈 Система рівнів</h3><pre class="code-example">level=1; pts_next=100; speed_mult=1.0
spawn_interval=80; show_level_up=0
if score>=pts_next and level<10:
    level+=1; pts_next=level*100
    speed_mult*=1.15
    spawn_interval=max(30,spawn_interval-8)
    show_level_up=90
if show_level_up>0:
    txt=big_font.render(f"РІВЕНЬ {level}!",True,CYAN)
    screen.blit(txt,(W//2-txt.get_width()//2,H//2-40))
    show_level_up-=1</pre></div>`,
          ru: `<div class="theory-block"><h3>📈 Уровни</h3><pre class="code-example">level=1; pts_next=100; speed_mult=1.0; spawn_interval=80; show_lvl=0
if score>=pts_next and level<10:
    level+=1; pts_next=level*100; speed_mult*=1.15
    spawn_interval=max(30,spawn_interval-8); show_lvl=90
if show_lvl>0:
    txt=big_font.render(f"УРОВЕНЬ {level}!",True,CYAN)
    screen.blit(txt,(W//2-txt.get_width()//2,H//2-40)); show_lvl-=1</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Набери 100 очок — побач перехід рівня.", ru:"⭐ Набери 100 очков." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Зміни очки для рівня 2 на 50.", ru:"⭐ Очки для уровня 2 = 50." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Смужка прогресу до наступного рівня.", ru:"⭐⭐ Полоска прогресса." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Flash-ефект при переході (білий екран 0.3с).", ru:"⭐⭐ Flash при переходе." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ На рівні 5 — темно-синій фон.", ru:"⭐⭐ На уровне 5 — тёмно-синий фон." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Мінімум 2 астероїди на рівні 1, +1 на кожному.", ru:"⭐⭐⭐ Мин. 2 астероида, +1 на каждом уровне." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Хвиля: N ворогів одразу, пауза, нова хвиля.", ru:"⭐⭐⭐⭐ Волна врагов." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Рівень 10: ти переміг! + салют.", ru:"⭐⭐⭐⭐ Уровень 10 — победа + салют." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 79 — Рівні та хвилі
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Рівні та хвилі")
clock = pygame.time.Clock()
font=pygame.font.SysFont("Arial",26,bold=True); big_font=pygame.font.SysFont("Arial",72,bold=True)
BLACK=(0,0,20); WHITE=(255,255,255); YELLOW=(255,220,0); ORANGE=(255,140,0); CYAN=(0,200,255); RED=(255,60,60)
stars=[{'x':random.randint(0,W),'y':random.randint(0,H),'speed':random.uniform(0.5,2.0),'size':1} for _ in range(100)]
def circles_collide(x1,y1,r1,x2,y2,r2): return math.hypot(x1-x2,y1-y2)<r1+r2
score=0; lives=3; level=1; pts_next=100; speed_mult=1.0; spawn_interval=80; show_level_up=0; flash_timer=0
px,py=W//2,H-80; bullets=[]; enemies_list=[]; particles=[]; shoot_timer=0; spawn_timer=0
while True:
    for event in pygame.event.get():
        if event.type==pygame.QUIT: pygame.quit(); sys.exit()
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(25,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-25,px+5)
    if keys[pygame.K_SPACE] and shoot_timer<=0: bullets.append({'x':px,'y':py-30}); shoot_timer=12
    if shoot_timer>0: shoot_timer-=1
    if score>=pts_next and level<10:
        level+=1; pts_next=level*100; speed_mult*=1.15; spawn_interval=max(30,spawn_interval-8); show_level_up=90; flash_timer=20
    spawn_timer+=1
    if spawn_timer>=spawn_interval and len(enemies_list)<4+level:
        enemies_list.append({'x':float(random.randint(40,W-40)),'y':-30.0,'speed':random.uniform(1.5,2.5)*speed_mult,'r':25}); spawn_timer=0
    for b in bullets[:]:
        b['y']-=12
        if b['y']<-10: bullets.remove(b)
    for b in bullets[:]:
        for e in enemies_list[:]:
            if b in bullets and e in enemies_list and circles_collide(b['x'],b['y'],4,e['x'],e['y'],e['r']):
                bullets.remove(b); enemies_list.remove(e); score+=10
                for _ in range(8): particles.append({'x':e['x'],'y':e['y'],'vx':random.uniform(-4,4),'vy':random.uniform(-4,4),'life':30})
                break
    for e in enemies_list[:]:
        e['y']+=e['speed']
        if e['y']>H+40: enemies_list.remove(e)
        elif circles_collide(px,py,20,e['x'],e['y'],e['r']): enemies_list.remove(e); lives-=1
    for p in particles[:]:
        p['x']+=p['vx']; p['y']+=p['vy']; p['life']-=1
        if p['life']<=0: particles.remove(p)
    if show_level_up>0: show_level_up-=1
    if flash_timer>0: flash_timer-=1
    screen.fill(BLACK)
    for s in stars:
        pygame.draw.circle(screen,WHITE,(int(s['x']),int(s['y'])),s['size'])
        s['y']+=s['speed']
        if s['y']>H: s['y']=0; s['x']=random.randint(0,W)
    for b in bullets: pygame.draw.rect(screen,YELLOW,(b['x']-3,b['y']-10,6,15))
    for e in enemies_list: pygame.draw.circle(screen,(150,100,60),(int(e['x']),int(e['y'])),e['r'])
    for p in particles: pygame.draw.circle(screen,ORANGE,(int(p['x']),int(p['y'])),3)
    pygame.draw.circle(screen,ORANGE,(px,py+15),8)
    pygame.draw.polygon(screen,YELLOW,[(px,py-28),(px-20,py+15),(px+20,py+15)])
    pygame.draw.circle(screen,CYAN,(px,py-8),7)
    screen.blit(font.render(f"Score:{score}  Рівень:{level}  Життя:{lives}",True,WHITE),(10,10))
    if pts_next>(level-1)*100:
        pw=int((score-(level-1)*100)/(pts_next-(level-1)*100)*200)
        pygame.draw.rect(screen,(50,50,80),(10,40,200,10))
        pygame.draw.rect(screen,CYAN,(10,40,min(200,max(0,pw)),10))
    if flash_timer>0:
        fl=pygame.Surface((W,H)); fl.set_alpha(flash_timer*10); fl.fill(WHITE); screen.blit(fl,(0,0))
    if show_level_up>0:
        t=big_font.render(f"РІВЕНЬ {level}!",True,CYAN)
        screen.blit(t,(W//2-t.get_width()//2,H//2-40))
    if lives<=0: screen.blit(big_font.render("GAME OVER",True,RED),(W//2-200,H//2-40))
    pygame.display.flip()
    clock.tick(60)
`
      },
{
        id: 79,
        title: { uk: "Бос", ru: "Босс" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Бос — сильний ворог з великим HP!</p></div><div class="theory-block"><h3>👾 Клас Boss</h3><pre class="code-example">class Boss:
    def __init__(self):
        self.x=float(W//2); self.y=100.0
        self.hp=20; self.max_hp=20
        self.radius=50; self.move_timer=0; self.shoot_timer=0
    def update(self):
        self.move_timer+=1
        self.x=W//2+math.sin(self.move_timer*0.03)*280
        self.shoot_timer+=1
        if self.shoot_timer>=60:
            self.shoot_timer=0
            return {'x':self.x,'y':self.y+55,'vy':4}
        return None
    def draw_hp_bar(self,screen):
        bw=250; bx=W//2-bw//2
        pygame.draw.rect(screen,(60,0,0),(bx,165,bw,16))
        pygame.draw.rect(screen,RED,(bx,165,int(bw*self.hp/self.max_hp),16))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Босс — сильный враг с большим HP!</p></div><div class="theory-block"><h3>👾 Класс Boss</h3><pre class="code-example">class Boss:
    def __init__(self):
        self.x=float(W//2); self.y=100.0
        self.hp=20; self.max_hp=20
        self.radius=50; self.move_timer=0; self.shoot_timer=0
    def update(self):
        self.move_timer+=1
        self.x=W//2+math.sin(self.move_timer*0.03)*280
        self.shoot_timer+=1
        if self.shoot_timer >= 40:
            self.shoot_timer=0
            return {'x':self.x,'y':self.y+60,'vy':4}  # пуля вниз
    def draw(self,screen):
        pygame.draw.circle(screen,(200,30,30),(int(self.x),int(self.y)),self.radius)
        # полоска HP:
        pct=self.hp/self.max_hp
        pygame.draw.rect(screen,(100,0,0),(40,H-20,W-80,12))
        pygame.draw.rect(screen,(255,0,80),(40,H-20,int((W-80)*pct),12))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy",   text:{ uk:"⭐ Запусти і подивись як бос рухається.", ru:"⭐ Запусти и посмотри на босса." }},
          { num:2, level:"easy",   text:{ uk:"⭐ Збільш HP боса до 30.", ru:"⭐ HP босса = 30." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Бос змінює колір при HP < 50%.", ru:"⭐⭐ Цвет меняется при HP < 50%." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ При смерті — великий вибух (20 частинок).", ru:"⭐⭐ При гибели — большой взрыв." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Стріляє швидше при HP < 30%.", ru:"⭐⭐ Стреляет быстрее при HP < 30%." }},
          { num:6, level:"hard",   text:{ uk:"⭐⭐⭐ Намалюй боса детально (очі, зуби).", ru:"⭐⭐⭐ Детальный рисунок босса." }},
          { num:7, level:"star",   text:{ uk:"⭐⭐⭐⭐ Фаза 2: HP < 50% — швидше + 3 кулі.", ru:"⭐⭐⭐⭐ Фаза 2 босса." }},
          { num:8, level:"star",   text:{ uk:"⭐⭐⭐⭐ Спіральна атака (кулі по колу).", ru:"⭐⭐⭐⭐ Спиральная атака." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 80 — Бос
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Бос з'явився!")
clock = pygame.time.Clock()
font=pygame.font.SysFont("Arial",26,bold=True)
BLACK=(0,0,20); WHITE=(255,255,255); YELLOW=(255,220,0); ORANGE=(255,140,0); CYAN=(0,200,255); RED=(255,40,40); PURPLE=(160,0,220)
stars=[{'x':random.randint(0,W),'y':random.randint(0,H),'speed':random.uniform(0.5,1.5),'size':1} for _ in range(100)]
def circles_collide(x1,y1,r1,x2,y2,r2): return math.hypot(x1-x2,y1-y2)<r1+r2
class Boss:
    def __init__(self):
        self.x=float(W//2); self.y=100.0; self.hp=20; self.max_hp=20
        self.radius=50; self.move_timer=0; self.shoot_timer=0
    def update(self):
        self.move_timer+=1
        self.x=W//2+math.sin(self.move_timer*0.03)*280
        self.shoot_timer+=1
        if self.shoot_timer>=60: self.shoot_timer=0; return {'x':self.x,'y':self.y+55,'vy':4}
        return None
    def draw(self,surf):
        x,y=int(self.x),int(self.y)
        color=RED if self.hp<self.max_hp//2 else PURPLE
        pygame.draw.circle(surf,color,(x,y),self.radius)
        pygame.draw.circle(surf,WHITE,(x,y),self.radius,3)
        pygame.draw.circle(surf,WHITE,(x-18,y-10),10); pygame.draw.circle(surf,WHITE,(x+18,y-10),10)
        pygame.draw.circle(surf,(0,0,0),(x-18,y-10),6); pygame.draw.circle(surf,(0,0,0),(x+18,y-10),6)
        pygame.draw.arc(surf,WHITE,(x-20,y+5,40,20),math.pi,2*math.pi,3)
    def draw_hp_bar(self,surf):
        bw,bh=250,16; bx=W//2-bw//2
        pygame.draw.rect(surf,(60,0,0),(bx,165,bw,bh))
        pygame.draw.rect(surf,RED,(bx,165,int(bw*self.hp/self.max_hp),bh))
        pygame.draw.rect(surf,WHITE,(bx,165,bw,bh),2)
        t=pygame.font.SysFont("Arial",14).render(f"BOSS HP:{self.hp}/{self.max_hp}",True,WHITE)
        surf.blit(t,(bx+bw//2-t.get_width()//2,167))
boss=Boss(); boss_bullets=[]; player_bullets=[]; particles=[]
px,py=W//2,H-80; shoot_timer=0; score=0; lives=3
while True:
    for event in pygame.event.get():
        if event.type==pygame.QUIT: pygame.quit(); sys.exit()
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(25,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-25,px+5)
    if keys[pygame.K_SPACE] and shoot_timer<=0: player_bullets.append({'x':px,'y':py-30}); shoot_timer=12
    if shoot_timer>0: shoot_timer-=1
    nb=boss.update()
    if nb: boss_bullets.append(nb)
    for b in player_bullets[:]:
        b['y']-=12
        if b['y']<-10: player_bullets.remove(b)
        elif boss.hp>0 and circles_collide(b['x'],b['y'],4,boss.x,boss.y,boss.radius):
            player_bullets.remove(b); boss.hp-=1; score+=5
            if boss.hp<=0:
                for _ in range(25): particles.append({'x':boss.x,'y':boss.y,'vx':random.uniform(-7,7),'vy':random.uniform(-7,7),'life':50,'color':random.choice([RED,ORANGE,YELLOW])})
                score+=200
    for b in boss_bullets[:]:
        b['y']+=b['vy']
        if b['y']>H+10: boss_bullets.remove(b)
        elif circles_collide(b['x'],b['y'],6,px,py,20): boss_bullets.remove(b); lives-=1
    for p in particles[:]:
        p['x']+=p['vx']; p['y']+=p['vy']; p['life']-=1
        if p['life']<=0: particles.remove(p)
    screen.fill(BLACK)
    for s in stars:
        pygame.draw.circle(screen,WHITE,(int(s['x']),int(s['y'])),s['size'])
        s['y']+=s['speed']
        if s['y']>H: s['y']=0; s['x']=random.randint(0,W)
    if boss.hp>0: boss.draw(screen); boss.draw_hp_bar(screen)
    elif particles:
        for p in particles: pygame.draw.circle(screen,p['color'],(int(p['x']),int(p['y'])),4)
    else: screen.blit(font.render("БОС ПЕРЕМОЖЕНИЙ! +200",True,YELLOW),(W//2-200,H//2))
    for b in boss_bullets: pygame.draw.circle(screen,RED,(int(b['x']),int(b['y'])),7)
    for b in player_bullets: pygame.draw.rect(screen,YELLOW,(b['x']-3,b['y']-10,6,15))
    pygame.draw.circle(screen,ORANGE,(px,py+15),8)
    pygame.draw.polygon(screen,YELLOW,[(px,py-28),(px-20,py+15),(px+20,py+15)])
    pygame.draw.circle(screen,CYAN,(px,py-8),7)
    screen.blit(font.render(f"Score:{score}  Життя:{lives}",True,WHITE),(10,10))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 80,
        title: { uk: "Меню та пауза", ru: "Меню и пауза" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Будь-яка гра починається з меню! Що має бути в меню гри?</p></div><div class="theory-block"><h3>📖 Меню та пауза</h3><pre class="code-example">game_state = "menu"  # "menu" / "playing" / "paused"

if game_state == "menu":
    screen.fill((0,0,30))
    t = font.render("SPACE — грати", True, (255,255,0))
    screen.blit(t, t.get_rect(center=(W//2, H//2)))
elif game_state == "playing":
    # ігрова логіка
    if keys[pygame.K_p]: game_state = "paused"
elif game_state == "paused":
    # пауза — малюємо напівпрозорий прямокутник
    overlay = pygame.Surface((W, H), pygame.SRCALPHA)
    overlay.fill((0,0,0,160))
    screen.blit(overlay, (0,0))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Любая игра начинается с меню! Что должно быть в меню игры?</p></div><div class="theory-block"><h3>📖 Меню и пауза</h3><pre class="code-example">game_state = "menu"  # "menu" / "playing" / "paused"

if game_state == "menu":
    screen.fill((0,0,30))
    t = font.render("SPACE — играть", True, (255,255,0))
    screen.blit(t, t.get_rect(center=(W//2, H//2)))
elif game_state == "playing":
    # игровая логика
    if keys[pygame.K_p]: game_state = "paused"
elif game_state == "paused":
    # пауза — рисуем полупрозрачный прямоугольник
    overlay = pygame.Surface((W, H), pygame.SRCALPHA)
    overlay.fill((0,0,0,120))
    screen.blit(overlay, (0,0))
    t = font.render("ПАУЗА — P чтобы продолжить", True, (255,255,0))
    screen.blit(t, t.get_rect(center=(W//2, H//2)))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Зроби щоб при натисканні SPACE гра стартувала.", ru:"⭐ SPACE — старт игры." }},
          { num:2, level:"easy", text:{ uk:"⭐ Додай на меню назву гри великим шрифтом.", ru:"⭐ Название игры на меню." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Кнопка P ставить гру на паузу та знімає з паузи.", ru:"⭐⭐ P — пауза/продолжить." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ На паузі намалюй напівпрозорий overlay з текстом ПАУЗА.", ru:"⭐⭐ Полупрозрачный overlay на паузе." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай екран Game Over (стан gameover) з рахунком.", ru:"⭐⭐ Экран Game Over со счётом." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Анімуй заголовок на меню (пульсуючий колір).", ru:"⭐⭐⭐ Анимированный заголовок." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Меню з 3 кнопками: Грати / Рекорди / Вийти.", ru:"⭐⭐⭐⭐ Меню с 3 кнопками." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Зробаний ефект transition при переходах між станами.", ru:"⭐⭐⭐⭐ Эффект перехода между состояниями." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 81 — Меню та пауза
import pygame, sys
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Гра з меню")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 64, bold=True)
font = pygame.font.SysFont("Arial", 32)
BLACK = (0, 0, 20)
YELLOW = (255, 220, 0)
WHITE = (255, 255, 255)

game_state = "menu"
score = 0
px, py = W // 2, H // 2
tick = 0

while True:
    tick += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                if game_state == "menu":
                    game_state = "playing"
                    score = 0
                    px, py = W // 2, H // 2
                elif game_state == "gameover":
                    game_state = "menu"
            if event.key == pygame.K_p and game_state == "playing":
                game_state = "paused"
            elif event.key == pygame.K_p and game_state == "paused":
                game_state = "playing"

    screen.fill(BLACK)

    if game_state == "menu":
        r = int(128 + 127 * abs((tick % 120) / 60 - 1))
        col = (r, 200, 255 - r)
        t1 = font_big.render("МОЯ ГРА", True, col)
        t2 = font.render("SPACE — почати", True, YELLOW)
        screen.blit(t1, t1.get_rect(center=(W // 2, H // 2 - 60)))
        screen.blit(t2, t2.get_rect(center=(W // 2, H // 2 + 40)))

    elif game_state == "playing":
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  px = max(20, px - 5)
        if keys[pygame.K_RIGHT]: px = min(W - 20, px + 5)
        if keys[pygame.K_UP]:    py = max(20, py - 5)
        if keys[pygame.K_DOWN]:  py = min(H - 20, py + 5)
        score += 1
        pygame.draw.rect(screen, (50, 200, 80), (px - 20, py - 20, 40, 40), border_radius=8)
        t = font.render(f"Score: {score}  P — пауза", True, WHITE)
        screen.blit(t, (10, 10))

    elif game_state == "paused":
        overlay = pygame.Surface((W, H), pygame.SRCALPHA)
        overlay.fill((0, 0, 0, 160))
        screen.blit(overlay, (0, 0))
        t = font_big.render("ПАУЗА", True, YELLOW)
        t2 = font.render("P — продовжити", True, WHITE)
        screen.blit(t, t.get_rect(center=(W // 2, H // 2 - 30)))
        screen.blit(t2, t2.get_rect(center=(W // 2, H // 2 + 40)))

    elif game_state == "gameover":
        t1 = font_big.render("GAME OVER", True, (255, 50, 50))
        t2 = font.render(f"Score: {score}   SPACE — меню", True, WHITE)
        screen.blit(t1, t1.get_rect(center=(W // 2, H // 2 - 40)))
        screen.blit(t2, t2.get_rect(center=(W // 2, H // 2 + 40)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 81,
        title: { uk: "Рекорд та файл", ru: "Рекорд и файл" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як зберегти рекорд між запусками гри? У файл!</p></div><div class="theory-block"><h3>📖 Читання та запис файлу</h3><pre class="code-example">def load_record():
    try:
        with open("record.txt") as f:
            return int(f.read())
    except:
        return 0

def save_record(score):
    with open("record.txt", "w") as f:
        f.write(str(score))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как сохранить рекорд между запусками игры? В файл!</p></div><div class="theory-block"><h3>📖 Чтение и запись файла</h3><pre class="code-example">def load_record():
    try:
        with open("record.txt") as f:
            return int(f.read())
    except:
        return 0

def save_record(score):
    with open("record.txt", "w") as f:
        f.write(str(score))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і перевір що record.txt створюється.", ru:"⭐ Запусти — record.txt появится." }},
          { num:2, level:"easy", text:{ uk:"⭐ Виведи рекорд на екран у HUD.", ru:"⭐ Покажи рекорд в HUD." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Рекорд оновлюється тільки якщо поточний score вище.", ru:"⭐⭐ Рекорд обновляется если счёт выше." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Показуй 'НОВИЙ РЕКОРД!' коли побито рекорд.", ru:"⭐⭐ Показывай 'НОВЫЙ РЕКОРД!'." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Рекорд зберігається при GameOver, не тільки при виході.", ru:"⭐⭐ Сохраняй рекорд при GameOver." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Зберігай топ-3 рекорди (список у файлі).", ru:"⭐⭐⭐ Топ-3 рекорда в файле." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Введення імені гравця (pygame.key) і збереження з ім'ям.", ru:"⭐⭐⭐⭐ Ввод имени игрока и сохранение." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Екран таблиці рекордів (leaderboard) з топ-5.", ru:"⭐⭐⭐⭐ Экран таблицы рекордов топ-5." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 82 — Рекорд та файл
import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Рекорд!")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 28, bold=True)
font_big = pygame.font.SysFont("Arial", 56, bold=True)
WHITE = (255,255,255); YELLOW = (255,220,0); RED = (220,50,50); BG = (0,0,20)

RECORD_FILE = "record.txt"

def load_record():
    try:
        with open(RECORD_FILE) as f:
            return int(f.read().strip())
    except:
        return 0

def save_record(score):
    with open(RECORD_FILE, "w") as f:
        f.write(str(score))

best = load_record()
score = 0
new_record_flash = 0
px, py = W//2, H//2
enemies = [{"x": random.randint(50,750), "y": random.randint(50,550)} for _ in range(5)]
game_over = False

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            save_record(max(score, best))
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN and game_over:
            if event.key == pygame.K_r:
                score = 0; game_over = False; new_record_flash = 0
                px, py = W//2, H//2
                enemies = [{"x": random.randint(50,750), "y": random.randint(50,550)} for _ in range(5)]

    if not game_over:
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  px = max(20, px-5)
        if keys[pygame.K_RIGHT]: px = min(W-20, px+5)
        if keys[pygame.K_UP]:    py = max(20, py-5)
        if keys[pygame.K_DOWN]:  py = min(H-20, py+5)
        score += 1
        for e in enemies:
            if abs(px - e["x"]) < 30 and abs(py - e["y"]) < 30:
                if score > best:
                    best = score
                    save_record(best)
                    new_record_flash = 120
                game_over = True

    screen.fill(BG)
    for e in enemies:
        pygame.draw.circle(screen, RED, (e["x"], e["y"]), 20)
    if not game_over:
        pygame.draw.rect(screen, (50,200,80), (px-18, py-18, 36, 36), border_radius=6)
    hud = font.render(f"Score: {score}   Рекорд: {best}", True, WHITE)
    screen.blit(hud, (10, 10))
    if new_record_flash > 0:
        nr = font_big.render("НОВИЙ РЕКОРД!", True, YELLOW)
        screen.blit(nr, nr.get_rect(center=(W//2, 80)))
        new_record_flash -= 1
    if game_over:
        t = font_big.render("GAME OVER — R щоб знову", True, RED)
        screen.blit(t, t.get_rect(center=(W//2, H//2)))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 82,
        title: { uk: "Ефекти: звуки", ru: "Эффекты: звуки" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Як додати звуки у гру без окремих файлів? Генеруємо самостійно!</p></div><div class="theory-block"><h3>📖 Генерація звуків</h3><pre class="code-example">import array, math
pygame.mixer.init(44100, -16, 1, 512)

def beep(freq=440, dur=0.1, vol=0.3):
    n = int(44100 * dur)
    buf = array.array('h', [
        int(vol * 32767 * math.sin(2 * math.pi * freq * i / 44100))
        for i in range(n)
    ])
    snd = pygame.sndarray.make_sound(buf)
    snd.play()

beep(880, 0.05)  # постріл — короткий писк</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Как добавить звуки в игру без отдельных файлов? Генерируем самостоятельно!</p></div><div class="theory-block"><h3>📖 Генерация звуков</h3><pre class="code-example">import array, math
pygame.mixer.init(44100, -16, 1, 512)

def beep(freq=440, dur=0.1, vol=0.3):
    n = int(44100 * dur)
    buf = array.array('h', [
        int(vol * 32767 * math.sin(2 * math.pi * freq * i / 44100))
        for i in range(n)
    ])
    snd = pygame.sndarray.make_sound(buf)
    snd.play()</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти і натисни SPACE — почуєш звук пострілу.", ru:"⭐ SPACE — звук выстрела." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни частоту beep: 220 (низький), 880 (високий), 1760 (дуже високий).", ru:"⭐ Измени частоту: 220, 880, 1760." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай звук вибуху (низька частота, довша тривалість).", ru:"⭐⭐ Звук взрыва (низкая частота, длиннее)." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай звук підбору бонусу (висока коротка нота).", ru:"⭐⭐ Звук бонуса (высокая короткая нота)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зроби акорд (3 ноти одночасно) для level up.", ru:"⭐⭐ Аккорд из 3 нот для level up." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Зроби фонову музику (нескінченний loop з декількох нот).", ru:"⭐⭐⭐ Фоновая музыка (loop из нот)." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Клавіша M вимикає/вмикає звук.", ru:"⭐⭐⭐⭐ M — mute/unmute." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай свої звуки в гру з попередніх уроків.", ru:"⭐⭐⭐⭐ Добавь звуки в свою игру." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 83 — Звуки без файлів
import pygame, sys, array, math
pygame.mixer.init(44100, -16, 1, 512)
pygame.init()
W, H = 800, 500
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Звуки!")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 28, bold=True)
BG = (10, 10, 30)
muted = False

def beep(freq=440, dur=0.1, vol=0.3):
    if muted: return
    n = int(44100 * dur)
    buf = array.array('h', [
        int(vol * 32767 * math.sin(2 * math.pi * freq * i / 44100))
        for i in range(n)
    ])
    pygame.sndarray.make_sound(buf).play()

def explosion():
    if muted: return
    n = int(44100 * 0.3)
    buf = array.array('h', [
        int(0.4 * 32767 * math.sin(2 * math.pi * 80 * i / 44100) *
            math.exp(-5 * i / n))
        for i in range(n)
    ])
    pygame.sndarray.make_sound(buf).play()

def level_up():
    for freq in [523, 659, 784]:
        beep(freq, 0.12, 0.25)
        pygame.time.delay(100)

hints = [
    "SPACE — постріл (880 Гц)",
    "E — вибух (80 Гц затухаючий)",
    "L — level up (акорд 523+659+784)",
    "M — вимкнути/ввімкнути звук",
]

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE: beep(880, 0.05)
            if event.key == pygame.K_e:     explosion()
            if event.key == pygame.K_l:     level_up()
            if event.key == pygame.K_m:     muted = not muted

    screen.fill(BG)
    for i, hint in enumerate(hints):
        col = (200, 200, 100) if i < 3 else (100, 200, 255)
        t = font.render(hint, True, col)
        screen.blit(t, (W // 2 - t.get_width() // 2, 80 + i * 60))
    mut = font.render("ЗВУК ВИМКНЕНИЙ" if muted else "Звук увімкнений", True,
                      (255, 80, 80) if muted else (80, 255, 80))
    screen.blit(mut, mut.get_rect(center=(W // 2, H - 40)))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 83,
        title: { uk: "Ефекти: струс та спалах", ru: "Эффекты: тряска и вспышка" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що робить гру "живою"? Ефекти! Струс екрану при вибуху — це відчуття!</p></div><div class="theory-block"><h3>📖 Струс та спалах</h3><pre class="code-example">shake = 0  # лічильник струсу

# при попаданні:
shake = 15  # запускаємо струс

# у головному циклі:
ox = random.randint(-shake, shake) if shake > 0 else 0
oy = random.randint(-shake, shake) if shake > 0 else 0
if shake > 0: shake -= 1

# малюємо зі зміщенням:
screen.blit(game_surf, (ox, oy))

# спалах:
if flash > 0:
    fl = pygame.Surface((W,H)); fl.set_alpha(flash*12)
    fl.fill((255,255,255)); screen.blit(fl,(0,0))
    flash -= 1</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что делает игру «живой»? Эффекты! Тряска экрана при взрыве — это ощущение!</p></div><div class="theory-block"><h3>📖 Тряска и вспышка</h3><pre class="code-example">shake = 0  # счётчик тряски

# при попадании:
shake = 15  # запускаем тряску

# в главном цикле:
ox = random.randint(-shake, shake) if shake > 0 else 0
oy = random.randint(-shake, shake) if shake > 0 else 0
if shake > 0: shake -= 1

# рисуем со смещением:
screen.blit(game_surf, (ox, oy))

# вспышка:
if flash > 0:
    fl = pygame.Surface((W,H))
    fl.set_alpha(flash * 10)
    fl.fill((255,255,255))
    screen.blit(fl, (0,0))
    flash -= 1</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Натисни SPACE і побачиш струс — поясни як він працює.", ru:"⭐ Нажми SPACE — тряска. Объясни как." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни shake = 30 — струс сильніший. Що відчуваєш?", ru:"⭐ shake = 30 — сильнее. Что чувствуешь?" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай спалах (flash) при натисканні F.", ru:"⭐⭐ Вспышка (flash) при нажатии F." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Зроби slowmo: при натисканні S clock.tick(15) на 2 секунди.", ru:"⭐⭐ Slowmo: clock.tick(15) на 2 секунды." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Комбо: струс + спалах + slowmo одночасно.", ru:"⭐⭐ Комбо: тряска + вспышка + slowmo." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Струс слабшає поступово (shake -= 1 кожен кадр).", ru:"⭐⭐⭐ Тряска затухает постепенно." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай ці ефекти у свою гру при зіткненнях.", ru:"⭐⭐⭐⭐ Добавь эффекты в свою игру." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Ефект 'zoom flash': екран на 1 кадр збільшується (pygame.transform.scale).", ru:"⭐⭐⭐⭐ Zoom flash: масштаб на 1 кадр." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 84 — Струс та спалах
import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Ефекти!")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 28, bold=True)
BG = (10, 10, 30)

shake = 0
flash = 0
slowmo = 0
stars = [{"x": random.randint(0, W), "y": random.randint(0, H)} for _ in range(80)]
px, py = W // 2, H // 2

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE: shake = 20
            if event.key == pygame.K_f:     flash = 15
            if event.key == pygame.K_s:     slowmo = 120

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px = max(20, px - 5)
    if keys[pygame.K_RIGHT]: px = min(W - 20, px + 5)
    if keys[pygame.K_UP]:    py = max(20, py - 5)
    if keys[pygame.K_DOWN]:  py = min(H - 20, py + 5)

    game_surf = pygame.Surface((W, H))
    game_surf.fill(BG)
    for s in stars:
        pygame.draw.circle(game_surf, (200, 200, 255), (s["x"], s["y"]), 1)
    pygame.draw.rect(game_surf, (80, 200, 80), (px - 20, py - 20, 40, 40), border_radius=8)
    hints = ["SPACE — струс", "F — спалах", "S — slowmo", "Стрілки — рух"]
    for i, h in enumerate(hints):
        t = font.render(h, True, (180, 180, 255))
        game_surf.blit(t, (10, 10 + i * 40))

    ox = random.randint(-shake, shake) if shake > 0 else 0
    oy = random.randint(-shake, shake) if shake > 0 else 0
    if shake > 0: shake -= 1

    screen.fill((0, 0, 0))
    screen.blit(game_surf, (ox, oy))

    if flash > 0:
        fl = pygame.Surface((W, H))
        fl.set_alpha(flash * 12)
        fl.fill((255, 255, 255))
        screen.blit(fl, (0, 0))
        flash -= 1

    if slowmo > 0:
        sm = font.render(f"SLOWMO {slowmo//60+1}s", True, (255, 180, 0))
        screen.blit(sm, sm.get_rect(center=(W // 2, 30)))
        slowmo -= 1
        clock.tick(15)
    else:
        clock.tick(60)

    pygame.display.flip()
`
      },
      {
        id: 84,
        title: { uk: "Повна гра: Космічний Захисник", ru: "Полная игра: Космический Защитник" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Сьогодні збираємо ВСЕ що вивчили в одну повну гру!</p></div><div class="theory-block"><h3>🚀 Космічний Захисник — фінальна гра</h3><p>Зібрані механіки:</p><ul><li>Зоряне поле, корабель, стрільба</li><li>Вороги-астероїди + Бос</li><li>Меню, пауза, Game Over</li><li>Рекорд у файлі, HUD з рахунком та життями</li><li>Частинки, струс, спалах</li></ul><p>Вивчи код уважно — кожна частина тобі знайома!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Сегодня собираем ВСЁ что изучили в одну полную игру!</p></div><div class="theory-block"><h3>🚀 Космический Защитник — финальная игра</h3><p>Собранные механики:</p><ul><li>Звёздное поле, корабль, стрельба</li><li>Враги-астероиды + Босс</li><li>Меню, пауза, Game Over</li><li>Рекорд в файле, HUD со счётом и жизнями</li><li>Частицы, тряска, вспышка</li></ul><p>Изучи код внимательно — каждая часть тебе знакома!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти гру і дограй до першого боса.", ru:"⭐ Запусти и дойди до босса." }},
          { num:2, level:"easy", text:{ uk:"⭐ Знайди в коді де зберігається рекорд. Перевір файл record.txt.", ru:"⭐ Найди где сохраняется рекорд." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Змін колір корабля гравця та форму астероїдів.", ru:"⭐⭐ Измени цвет корабля и форму астероидов." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай ще один тип ворога: маленький і швидкий.", ru:"⭐⭐ Добавь ещё один тип врага: маленький быстрый." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Збільш кількість бонусів що випадають з астероїдів.", ru:"⭐⭐ Увеличь количество бонусов." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Додай 3-й рівень складності з іншим фоном.", ru:"⭐⭐⭐ 3-й уровень с другим фоном." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай другий бос з іншою атакою.", ru:"⭐⭐⭐⭐ Второй босс с другой атакой." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай локальний кооператив: 2 гравці на одній клавіатурі.", ru:"⭐⭐⭐⭐ Кооператив: 2 игрока на одной клавиатуре." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 85 — Повна гра: Космічний Захисник
import pygame, sys, random, math, array
pygame.mixer.init(44100,-16,1,512)
pygame.init()
W,H=800,600
screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Космічний Захисник")
clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",24,bold=True)
font_big=pygame.font.SysFont("Arial",56,bold=True)
BK=(0,0,20);WT=(255,255,255);YW=(255,220,0);RD=(220,50,50);CY=(0,200,255)
def beep(f=440,d=0.08,v=0.2):
    n=int(44100*d);buf=array.array('h',[int(v*32767*math.sin(2*math.pi*f*i/44100))for i in range(n)])
    pygame.sndarray.make_sound(buf).play()
def load_rec():
    try:
        with open("record_space.txt")as f:return int(f.read())
    except:return 0
def save_rec(s):
    with open("record_space.txt","w")as f:f.write(str(s))
stars=[{"x":random.randint(0,W),"y":random.randint(0,H),"s":random.uniform(.5,2)}for _ in range(120)]
best=load_rec();state="menu";score=0;lives=3;level=1;shake=0;flash=0;tick=0
px,py=W//2,H-70;bullets=[];enemies=[];particles=[];spawn_t=0;cool=0
def spawn_enemy():
    return{"x":random.randint(20,W-20),"y":-30,"r":random.randint(15,28),"spd":random.uniform(1.5,2.5)+level*0.3}
while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT:save_rec(max(score,best));pygame.quit();sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE:
                if state=="menu":state="playing";score=0;lives=3;level=1;bullets=[];enemies=[];particles=[]
                elif state=="playing"and cool<=0:bullets.append({"x":px,"y":py-30});cool=12;beep(880,.04)
                elif state=="gameover":state="menu"
            if ev.key==pygame.K_p and state=="playing":state="paused"
            elif ev.key==pygame.K_p and state=="paused":state="playing"
    if state=="playing":
        ks=pygame.key.get_pressed()
        if ks[pygame.K_LEFT]:px=max(25,px-6)
        if ks[pygame.K_RIGHT]:px=min(W-25,px+6)
        if cool>0:cool-=1
        spawn_t+=1
        if spawn_t>=max(40,80-level*5):spawn_t=0;enemies.append(spawn_enemy())
        if score//200>level-1:level+=1
        for b in bullets[:]:
            b["y"]-=14
            if b["y"]<-10:bullets.remove(b)
        for e in enemies[:]:
            e["y"]+=e["spd"]
            if e["y"]>H+40:enemies.remove(e)
            elif math.hypot(px-e["x"],py-e["y"])<e["r"]+20:
                enemies.remove(e);lives-=1;shake=18;flash=12;beep(120,.2)
                if lives<=0:
                    if score>best:best=score;save_rec(best)
                    state="gameover"
            else:
                for b in bullets[:]:
                    if b in bullets and math.hypot(b["x"]-e["x"],b["y"]-e["y"])<e["r"]+4:
                        bullets.remove(b);enemies.remove(e);score+=10
                        for _ in range(8):particles.append({"x":e["x"],"y":e["y"],"vx":random.uniform(-4,4),"vy":random.uniform(-4,4),"life":25,"col":random.choice([YW,RD,CY])})
                        beep(300,.06);break
        for p in particles[:]:
            p["x"]+=p["vx"];p["y"]+=p["vy"];p["life"]-=1
            if p["life"]<=0:particles.remove(p)
    ox=random.randint(-shake,shake)if shake>0 else 0;oy=random.randint(-shake,shake)if shake>0 else 0
    if shake>0:shake-=1
    gs=pygame.Surface((W,H));gs.fill(BK)
    for s in stars:
        pygame.draw.circle(gs,WT,(int(s["x"]),int(s["y"])),1)
        s["y"]+=s["s"]*(.4 if state!="playing" else 1)
        if s["y"]>H:s["y"]=0;s["x"]=random.randint(0,W)
    if state in("playing","paused"):
        for p in particles:pygame.draw.circle(gs,p["col"],(int(p["x"]),int(p["y"])),3)
        for e in enemies:pygame.draw.circle(gs,(180,80,40),(int(e["x"]),int(e["y"])),e["r"])
        for b in bullets:pygame.draw.rect(gs,YW,(b["x"]-3,b["y"]-10,6,14))
        pygame.draw.polygon(gs,CY,[(px,py-28),(px-18,py+14),(px+18,py+14)])
        pygame.draw.circle(gs,(255,120,0),(px,py-10),7)
        gs.blit(font.render(f"Score:{score}  Рекорд:{best}  Рівень:{level}",True,WT),(8,8))
        for i in range(lives):pygame.draw.circle(gs,RD,(W-20-i*28,22),10)
    if state=="menu":
        r=int(128+127*abs((tick%120)/60-1))
        t1=font_big.render("КОСМІЧНИЙ ЗАХИСНИК",True,(r,200,255-r))
        t2=font.render("SPACE — грати  |  P — пауза",True,YW)
        gs.blit(t1,t1.get_rect(center=(W//2,H//2-50)));gs.blit(t2,t2.get_rect(center=(W//2,H//2+30)))
    elif state=="paused":
        ov=pygame.Surface((W,H),pygame.SRCALPHA);ov.fill((0,0,0,150))
        gs.blit(ov,(0,0));t=font_big.render("ПАУЗА",True,YW);gs.blit(t,t.get_rect(center=(W//2,H//2)))
    elif state=="gameover":
        t1=font_big.render("GAME OVER",True,RD);t2=font.render(f"Score:{score}  Рекорд:{best}   SPACE",True,WT)
        gs.blit(t1,t1.get_rect(center=(W//2,H//2-40)));gs.blit(t2,t2.get_rect(center=(W//2,H//2+40)))
    screen.fill((0,0,0));screen.blit(gs,(ox,oy))
    if flash>0:
        fl=pygame.Surface((W,H));fl.set_alpha(flash*14);fl.fill(WT);screen.blit(fl,(0,0));flash-=1
    pygame.display.flip();clock.tick(60)
`
      },
      {
        id: 85,
        title: { uk: "Вибір жанру: твоя гра", ru: "Выбор жанра: твоя игра" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Зараз ти будеш робити ВЛАСНУ гру! Спочатку обери жанр.</p></div><div class="theory-block"><h3>🎮 4 жанри на вибір</h3><ul><li>🚀 Шутер — стріляй у ворогів</li><li>🧺 Ловець — лови предмети корзиною</li><li>🏃 Платформер — стрибай по платформах</li><li>🐍 Змійка — класика!</li></ul><p>Вибери ОДИН жанр і пиши далі тільки його!</p></div><div class="theory-block hint"><h3>💡 Поради</h3><p>Не намагайся зробити все одразу. Починай з мінімальної версії: персонаж + одна механіка.</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Сейчас ты будешь делать СВОЮ игру! Сначала выбери жанр.</p></div><div class="theory-block"><h3>🎮 4 жанра на выбор</h3><ul><li>🚀 Шутер — стреляй во врагов</li><li>🧺 Ловец — лови предметы корзиной</li><li>🏃 Платформер — прыгай по платформам</li><li>🐍 Змейка — классика!</li></ul><p>Выбери ОДИН жанр и пиши дальше только его!</p></div><div class="theory-block hint"><h3>💡 Советы</h3><p>Не пытайся сделать всё сразу. Начинай с минимальной версии: персонаж + одна механика.</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти всі 4 шаблони. Яка гра тобі найбільше сподобалась?", ru:"⭐ Запусти все 4 шаблона. Какая понравилась?" }},
          { num:2, level:"easy", text:{ uk:"⭐ Обери жанр і напиши назву своєї гри.", ru:"⭐ Выбери жанр и придумай название игры." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Запусти обраний шаблон і поясни кожну частину коду.", ru:"⭐⭐ Объясни каждую часть кода шаблона." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Зміни кольори та розміри елементів під свій стиль.", ru:"⭐⭐ Измени цвета и размеры под свой стиль." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Придумай і намалюй ескіз свого персонажа.", ru:"⭐⭐ Нарисуй эскиз своего персонажа." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Додай одну унікальну деталь якої немає в шаблоні.", ru:"⭐⭐⭐ Добавь уникальную деталь." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Напиши design document своєї гри (назва, механіка, перемога, поразка).", ru:"⭐⭐⭐⭐ Design document: название, механика, победа, поражение." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Покажи план гри вчителю та однокласникам.", ru:"⭐⭐⭐⭐ Покажи план игры учителю." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 86 — 4 міні-шаблони на вибір
# Запусти кожен по черзі. Обери свій!

import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 28, bold=True)

# ═══ ЗМІНИ ЦЮ ЦИФРУ (1 2 3 або 4) ═══
GENRE = 1  # 1=шутер 2=ловець 3=платформер 4=змійка
# ═══════════════════════════════════════

if GENRE == 1:
    pygame.display.set_caption("Шутер")
    px, bullets, enemies = W//2, [], []
    while True:
        for e in pygame.event.get():
            if e.type == pygame.QUIT: pygame.quit(); sys.exit()
            if e.type == pygame.KEYDOWN and e.key == pygame.K_SPACE:
                bullets.append([px, H-60])
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  px = max(20, px-5)
        if keys[pygame.K_RIGHT]: px = min(W-20, px+5)
        if random.random() < 0.03: enemies.append([random.randint(20, W-20), 0])
        bullets = [[b[0],b[1]-8] for b in bullets if b[1]>0]
        enemies = [[e[0],e[1]+3] for e in enemies if e[1]<H]
        screen.fill((0,0,20))
        for b in bullets: pygame.draw.rect(screen,(255,220,0),(b[0]-3,b[1],6,14))
        for e in enemies: pygame.draw.circle(screen,(200,60,40),(e[0],e[1]),18)
        pygame.draw.polygon(screen,(0,200,255),[(px,H-80),(px-18,H-40),(px+18,H-40)])
        screen.blit(font.render("ШУТЕР — SPACE стріляй",True,(180,180,255)),(10,10))
        pygame.display.flip(); clock.tick(60)

elif GENRE == 2:
    pygame.display.set_caption("Ловець")
    bx, score, objects = W//2, 0, []
    while True:
        for e in pygame.event.get():
            if e.type == pygame.QUIT: pygame.quit(); sys.exit()
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  bx = max(50, bx-6)
        if keys[pygame.K_RIGHT]: bx = min(W-50, bx+6)
        if random.random() < 0.03: objects.append([random.randint(10,W-10),0,random.choice([(0,200,50),(220,50,50)])])
        new_obj = []
        for o in objects:
            o[1] += 3
            if o[1] > H-50 and abs(o[0]-bx) < 55: score += 1
            elif o[1] < H: new_obj.append(o)
        objects = new_obj
        screen.fill((20,20,40))
        pygame.draw.rect(screen,(100,180,255),(bx-50,H-50,100,20),border_radius=8)
        for o in objects: pygame.draw.circle(screen,o[2],(o[0],o[1]),15)
        screen.blit(font.render(f"ЛОВЕЦЬ   Score:{score}",True,(255,255,255)),(10,10))
        pygame.display.flip(); clock.tick(60)

elif GENRE == 3:
    pygame.display.set_caption("Платформер")
    px,py,vx,vy,on_ground = 100,400,0,0,False
    platforms = [(0,550,W,20),(200,420,180,15),(450,320,180,15),(100,220,180,15)]
    while True:
        for e in pygame.event.get():
            if e.type == pygame.QUIT: pygame.quit(); sys.exit()
            if e.type == pygame.KEYDOWN and e.key==pygame.K_UP and on_ground: vy=-14
        keys = pygame.key.get_pressed()
        vx = (-4 if keys[pygame.K_LEFT] else 4 if keys[pygame.K_RIGHT] else 0)
        vy = min(vy+0.5, 12); px+=vx; py+=vy; on_ground=False
        for pl in platforms:
            if pl[0]<px<pl[0]+pl[2] and 0<py-pl[1]<15 and vy>0:
                py=pl[1]; vy=0; on_ground=True
        px=max(10,min(W-10,px)); py=max(0,min(H,py))
        screen.fill((30,10,50))
        for pl in platforms: pygame.draw.rect(screen,(80,160,80),pl)
        pygame.draw.rect(screen,(50,200,255),(px-12,py-24,24,24),border_radius=6)
        screen.blit(font.render("ПЛАТФОРМЕР — стрілки+UP",True,(200,200,255)),(10,10))
        pygame.display.flip(); clock.tick(60)

elif GENRE == 4:
    pygame.display.set_caption("Змійка")
    CS=20; snake=[[W//2,H//2]]; dx,dy=CS,0; apple=[random.randint(1,W//CS-1)*CS, random.randint(1,H//CS-1)*CS]; score=0; mt=0
    while True:
        for e in pygame.event.get():
            if e.type == pygame.QUIT: pygame.quit(); sys.exit()
            if e.type == pygame.KEYDOWN:
                if e.key==pygame.K_UP and dy==0: dx,dy=0,-CS
                if e.key==pygame.K_DOWN and dy==0: dx,dy=0,CS
                if e.key==pygame.K_LEFT and dx==0: dx,dy=-CS,0
                if e.key==pygame.K_RIGHT and dx==0: dx,dy=CS,0
        mt+=1
        if mt>=8:
            mt=0; head=[snake[0][0]+dx,snake[0][1]+dy]
            if head in snake or not(0<=head[0]<W and 0<=head[1]<H):
                snake=[[W//2,H//2]]; dx,dy=CS,0; score=0
            else:
                snake.insert(0,head)
                if head==apple: score+=1; apple=[random.randint(1,W//CS-1)*CS,random.randint(1,H//CS-1)*CS]
                else: snake.pop()
        screen.fill((0,20,0))
        pygame.draw.rect(screen,(220,50,50),(*apple,CS,CS))
        for seg in snake: pygame.draw.rect(screen,(50,220,50),(*seg,CS,CS),border_radius=4)
        screen.blit(font.render(f"ЗМІЙКА   Score:{score}",True,(200,255,200)),(10,10))
        pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 86,
        title: { uk: "Власний персонаж", ru: "Собственный персонаж" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Хто твій герой? Космонавт? Дракон? Робот? Час намалювати його кодом!</p></div><div class="theory-block"><h3>📖 Малюємо персонажа</h3><pre class="code-example">def draw_player(surf, x, y, tick):
    # Тіло (прямокутник)
    pygame.draw.rect(surf, (50,150,255), (x-15, y-20, 30, 35), border_radius=6)
    # Голова (коло)
    pygame.draw.circle(surf, (255,220,180), (x, y-30), 16)
    # Очі (мигають)
    if tick % 60 < 50:
        pygame.draw.circle(surf, (30,30,30), (x-6, y-32), 4)
        pygame.draw.circle(surf, (30,30,30), (x+6, y-32), 4)
    # Ноги (рухаються)
    leg = int(6 * abs((tick % 30) / 15 - 1))
    pygame.draw.line(surf, (80,80,200), (x-8, y+15), (x-8, y+30+leg), 5)
    pygame.draw.line(surf, (80,80,200), (x+8, y+15), (x+8, y+30-leg), 5)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Кто твой герой? Космонавт? Дракон? Робот? Время нарисовать его кодом!</p></div><div class="theory-block"><h3>📖 Рисуем персонажа</h3><pre class="code-example">def draw_player(surf, x, y, tick):
    # Тело (прямоугольник)
    pygame.draw.rect(surf, (50,150,255), (x-15, y-20, 30, 35), border_radius=6)
    # Голова (круг)
    pygame.draw.circle(surf, (255,220,180), (x, y-30), 16)
    # Глаза (мигают)
    if tick % 60 < 50:
        pygame.draw.circle(surf, (30,30,30), (x-5, y-32), 3)
        pygame.draw.circle(surf, (30,30,30), (x+5, y-32), 3)
    # Анимация ног (бег)
    leg_angle = math.sin(tick * 0.2) * 8
    pygame.draw.line(surf,(50,50,200),(x-6,y+15),(x-6+leg_angle,y+35),4)
    pygame.draw.line(surf,(50,50,200),(x+6,y+15),(x+6-leg_angle,y+35),4)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти і подивись на анімованого персонажа.", ru:"⭐ Запусти — увидишь анимированного персонажа." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни колір тіла та шкіри персонажа.", ru:"⭐ Измени цвет тела и кожи." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай шапку або зброю персонажу (pygame.draw).", ru:"⭐⭐ Добавь шапку или оружие." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Зроби різні анімації: стоїть/бігає/стрибає.", ru:"⭐⭐ Разные анимации: стоит/бежит/прыгает." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зміни персонажа на тварину (вуха, хвіст, лапи).", ru:"⭐⭐ Сделай персонажа животным." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Додай ефект щита (мерехтливе коло навколо).", ru:"⭐⭐⭐ Эффект щита (мерцающий круг)." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй персонажа у свою гру (шутер/ловець/платформер).", ru:"⭐⭐⭐⭐ Встрой персонажа в свою игру." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Зроби 4 кадри анімації бігу і перемикай їх.", ru:"⭐⭐⭐⭐ 4 кадра анимации бега." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 87 — Власний персонаж
import pygame, sys, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Мій персонаж")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 22)
BG = (30, 10, 50)
tick = 0
px, py = W // 2, H // 2

def draw_player(surf, x, y, t):
    # Тіло
    pygame.draw.rect(surf, (50, 130, 255), (x - 16, y - 18, 32, 38), border_radius=8)
    # Голова
    pygame.draw.circle(surf, (255, 215, 170), (x, y - 32), 18)
    # Очі (мигають кожні 60 кадрів)
    if t % 70 < 60:
        pygame.draw.circle(surf, (30, 30, 30), (x - 7, y - 34), 4)
        pygame.draw.circle(surf, (30, 30, 30), (x + 7, y - 34), 4)
        pygame.draw.circle(surf, (255, 255, 255), (x - 6, y - 35), 1)
        pygame.draw.circle(surf, (255, 255, 255), (x + 8, y - 35), 1)
    # Рот
    pygame.draw.arc(surf, (180, 80, 80), (x - 8, y - 26, 16, 10), 3.14, 6.28, 2)
    # Ноги (анімація)
    leg = int(8 * math.sin(t * 0.15))
    pygame.draw.line(surf, (30, 80, 200), (x - 9, y + 20), (x - 9, y + 38 + leg), 6)
    pygame.draw.line(surf, (30, 80, 200), (x + 9, y + 20), (x + 9, y + 38 - leg), 6)
    # Руки (теж рухаються)
    pygame.draw.line(surf, (255, 200, 150), (x - 16, y - 5), (x - 28, y + 8 - leg // 2), 5)
    pygame.draw.line(surf, (255, 200, 150), (x + 16, y - 5), (x + 28, y + 8 + leg // 2), 5)

while True:
    tick += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px = max(30, px - 4)
    if keys[pygame.K_RIGHT]: px = min(W - 30, px + 4)
    if keys[pygame.K_UP]:    py = max(50, py - 4)
    if keys[pygame.K_DOWN]:  py = min(H - 50, py + 4)

    screen.fill(BG)
    # Зірки
    for i in range(20):
        sx = (i * 137 + tick // 2) % W
        sy = (i * 89) % H
        pygame.draw.circle(screen, (180, 180, 255), (sx, sy), 1)

    draw_player(screen, px, py, tick)
    t = font.render("Стрілки — рух. Намалюй свого героя!", True, (200, 200, 255))
    screen.blit(t, (10, 10))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 87,
        title: { uk: "Власні вороги", ru: "Собственные враги" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Хороша гра має різних ворогів. Сьогодні додаємо 2 типи!</p></div><div class="theory-block"><h3>📖 Клас ворога</h3><pre class="code-example">class Enemy:
    def __init__(self, etype="normal"):
        self.x = random.randint(20, W-20)
        self.y = -30
        self.etype = etype
        if etype == "fast":
            self.spd = 5; self.r = 12; self.col = (255,100,100)
        else:
            self.spd = 2; self.r = 24; self.col = (180,60,40)
        self.timer = 0

    def update(self):
        self.timer += 1
        self.y += self.spd
        if self.etype == "zigzag":
            self.x += math.sin(self.timer * 0.1) * 3</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Хорошая игра имеет разных врагов. Сегодня добавляем 2 типа!</p></div><div class="theory-block"><h3>📖 Класс врага</h3><pre class="code-example">class Enemy:
    def __init__(self, etype="normal"):
        self.x = random.randint(20, W-20)
        self.y = -30
        self.etype = etype
        if etype == "fast":
            self.spd = 5; self.r = 12; self.col = (255,100,100)
        else:
            self.spd = 2; self.r = 24; self.col = (180,60,40)
        self.timer = 0

    def update(self):
        self.timer += 1
        self.y += self.spd
        # быстрый враг зигзагом:
        if self.etype == "fast":
            self.x += math.sin(self.timer * 0.1) * 3</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти і побачиш два типи ворогів. Чим вони відрізняються?", ru:"⭐ Запусти — два типа врагов. Чем отличаются?" }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни кольори ворогів за своїм смаком.", ru:"⭐ Измени цвета врагов." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай третій тип: великий і повільний.", ru:"⭐⭐ Третий тип: большой и медленный." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Вороги прискорюються кожні 200 очок.", ru:"⭐⭐ Враги ускоряются каждые 200 очков." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Намалюй ворогів у власному стилі (не коло, а щось цікаве).", ru:"⭐⭐ Нарисуй врагов в своём стиле." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Ворог 'мисливець' повільно рухається до гравця.", ru:"⭐⭐⭐ Враг 'охотник' медленно летит к игроку." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Різні вороги дають різну кількість очок.", ru:"⭐⭐⭐⭐ Разные враги дают разные очки." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй ворогів у свою гру.", ru:"⭐⭐⭐⭐ Встрой врагов в свою игру." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 88 — Власні вороги
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Вороги")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 26, bold=True)
BG = (10, 0, 20)

class Enemy:
    def __init__(self, etype="normal"):
        self.x = float(random.randint(20, W - 20))
        self.y = float(-30)
        self.etype = etype
        self.timer = 0
        if etype == "normal":
            self.spd = 2.0; self.r = 22; self.col = (180, 60, 40)
        elif etype == "fast":
            self.spd = 5.0; self.r = 12; self.col = (255, 100, 100)
        elif etype == "zigzag":
            self.spd = 2.5; self.r = 18; self.col = (100, 60, 220)

    def update(self):
        self.timer += 1
        self.y += self.spd
        if self.etype == "zigzag":
            self.x += math.sin(self.timer * 0.12) * 4
            self.x = max(self.r, min(W - self.r, self.x))

    def draw(self, surf):
        x, y = int(self.x), int(self.y)
        pygame.draw.circle(surf, self.col, (x, y), self.r)
        if self.etype == "fast":
            pygame.draw.line(surf, (255,200,200), (x-self.r,y), (x+self.r,y), 2)
        elif self.etype == "zigzag":
            pygame.draw.polygon(surf, (150,100,255), [(x,y-self.r-5),(x-8,y-self.r+5),(x+8,y-self.r+5)])

enemies = []
px, py = W // 2, H - 70
score = 0
spawn_t = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px = max(20, px - 5)
    if keys[pygame.K_RIGHT]: px = min(W - 20, px + 5)

    spawn_t += 1
    if spawn_t >= 45:
        spawn_t = 0
        etype = random.choice(["normal", "fast", "zigzag"])
        enemies.append(Enemy(etype))

    for e in enemies[:]:
        e.update()
        if e.y > H + 40:
            enemies.remove(e)
        elif math.hypot(px - e.x, py - e.y) < e.r + 18:
            enemies.remove(e)
        else:
            score += 1

    screen.fill(BG)
    for e in enemies:
        e.draw(screen)
    pygame.draw.polygon(screen, (0, 200, 255), [(px, py - 24), (px-16, py+12), (px+16, py+12)])
    screen.blit(font.render(f"Score: {score//10}   Вороги: {len(enemies)}", True, (255,255,255)), (10,10))
    hints = ["🔴 Звичайний  🟡 Швидкий  🟣 Зигзаг"]
    screen.blit(font.render(hints[0], True, (200,180,255)), (10, H-40))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 88,
        title: { uk: "Власне меню гри", ru: "Собственное меню игры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Перше що бачить гравець — меню. Зроби його крутим!</p></div><div class="theory-block"><h3>📖 Анімоване меню</h3><pre class="code-example"># Пульсуючий заголовок
r = int(128 + 127 * abs(math.sin(tick * 0.03)))
color = (r, 200 - r // 2, 255)
title = font_big.render("МОЯ ГРА", True, color)

# Кнопки з hover-ефектом
buttons = [("Грати", (W//2, H//2+40)), ("Вихід", (W//2, H//2+100))]
mouse = pygame.mouse.get_pos()
for text, pos in buttons:
    rect = pygame.Rect(pos[0]-80, pos[1]-20, 160, 40)
    col = (255,220,0) if rect.collidepoint(mouse) else (180,180,180)
    pygame.draw.rect(screen, col, rect, border_radius=8)
    screen.blit(font.render(text, True, (0,0,0)), font.render(text,True,(0,0,0)).get_rect(center=pos))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Первое что видит игрок — меню. Сделай его крутым!</p></div><div class="theory-block"><h3>📖 Анимированное меню</h3><pre class="code-example"># Пульсирующий заголовок
r = int(128 + 127 * abs(math.sin(tick * 0.03)))
color = (r, 200 - r // 2, 255)
title = font_big.render("МОЯ ИГРА", True, color)

# Кнопки с hover-эффектом
buttons = [("Играть", (W//2, H//2+40)), ("Выход", (W//2, H//2+100))]
mouse = pygame.mouse.get_pos()
for text, pos in buttons:
    rect = pygame.Rect(pos[0]-80, pos[1]-20, 160, 40)
    col = (255,220,0) if rect.collidepoint(mouse) else (200,200,200)
    pygame.draw.rect(screen, col, rect, border_radius=8)
    label = font.render(text, True, (0,0,0))
    screen.blit(label, label.get_rect(center=pos))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Зміни назву гри на своєму меню.", ru:"⭐ Измени название игры." }},
          { num:2, level:"easy", text:{ uk:"⭐ Додай своє ім'я на меню маленьким шрифтом.", ru:"⭐ Добавь своё имя маленьким шрифтом." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Зміни кольори меню на свою колірну гаму.", ru:"⭐⭐ Измени цветовую гамму меню." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай рухомий фон (зірки або кольорові кола).", ru:"⭐⭐ Добавь движущийся фон." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Кнопка Вийти закриває гру.", ru:"⭐⭐ Кнопка выхода закрывает игру." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Додай підменю налаштувань (гучність, складність).", ru:"⭐⭐⭐ Подменю настроек." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Меню анімовано з'являється (fade-in: alpha 0→255).", ru:"⭐⭐⭐⭐ Меню появляется с fade-in." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Підключи меню до своєї гри.", ru:"⭐⭐⭐⭐ Подключи меню к своей игре." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 89 — Власне меню
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Меню Моєї Гри")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 72, bold=True)
font = pygame.font.SysFont("Arial", 34, bold=True)
font_sm = pygame.font.SysFont("Arial", 20)
BG = (5, 5, 20)
tick = 0
stars = [{"x": random.uniform(0,W), "y": random.uniform(0,H), "spd": random.uniform(0.2,0.8)} for _ in range(100)]
state = "menu"

def draw_button(surf, text, cx, cy, hover):
    col = (255, 210, 0) if hover else (80, 80, 140)
    rect = pygame.Rect(cx - 100, cy - 24, 200, 48)
    pygame.draw.rect(surf, col, rect, border_radius=12)
    pygame.draw.rect(surf, (200, 200, 255), rect, 2, border_radius=12)
    t = font.render(text, True, (0, 0, 0) if hover else (220, 220, 255))
    surf.blit(t, t.get_rect(center=(cx, cy)))
    return rect

while True:
    tick += 1
    mouse = pygame.mouse.get_pos()
    clicked = False
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.MOUSEBUTTONDOWN:
            clicked = True

    screen.fill(BG)
    for s in stars:
        pygame.draw.circle(screen, (180,180,255), (int(s["x"]), int(s["y"])), 1)
        s["y"] += s["spd"]
        if s["y"] > H: s["y"] = 0; s["x"] = random.uniform(0, W)

    if state == "menu":
        r = int(128 + 127 * abs(math.sin(tick * 0.025)))
        col = (r, max(0, 220 - r), 255)
        t1 = font_big.render("МОЯ ГРА", True, col)
        screen.blit(t1, t1.get_rect(center=(W//2, H//2 - 100)))
        author = font_sm.render("автор: [твоє ім'я]", True, (150, 150, 200))
        screen.blit(author, author.get_rect(center=(W//2, H//2 - 40)))
        btn_play = draw_button(screen, "▶ Грати", W//2, H//2 + 40, pygame.Rect(W//2-100, H//2+16, 200, 48).collidepoint(mouse))
        btn_quit = draw_button(screen, "✖ Вийти", W//2, H//2 + 110, pygame.Rect(W//2-100, H//2+86, 200, 48).collidepoint(mouse))
        if clicked:
            if btn_play.collidepoint(mouse): state = "playing"
            if btn_quit.collidepoint(mouse): pygame.quit(); sys.exit()
    elif state == "playing":
        screen.fill((0, 20, 0))
        t = font.render("Гра йде! ESC — меню", True, (200, 255, 200))
        screen.blit(t, t.get_rect(center=(W//2, H//2)))
        keys = pygame.key.get_pressed()
        if keys[pygame.K_ESCAPE]: state = "menu"

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 89,
        title: { uk: "Власний рахунок та рекорд", ru: "Собственный счёт и рекорд" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що мотивує грати знову і знову? РЕКОРД! Сьогодні робимо систему очків для ТВОЄЇ гри.</p></div><div class="theory-block"><h3>📖 Система очків</h3><pre class="code-example"># Різні очки за різні дії:
score += 10    # звичайний ворог
score += 50    # рідкісний ворог
score += 5 * combo  # комбо x5!

# Комбо-лічильник:
combo = 0
combo_timer = 0
# при влученні:
combo += 1; combo_timer = 90
# у циклі:
if combo_timer > 0: combo_timer -= 1
else: combo = 0  # скидаємо комбо</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что мотивирует играть снова и снова? РЕКОРД! Сегодня делаем систему очков для СВОЕЙ игры.</p></div><div class="theory-block"><h3>📖 Система очков</h3><pre class="code-example"># Разные очки за разные действия:
score += 10    # обычный враг
score += 50    # редкий враг
score += 5 * combo  # комбо x5!

# Комбо-счётчик:
combo = 0
combo_timer = 0
# при попадании:
combo += 1; combo_timer = 90
# в цикле:
if combo_timer > 0: combo_timer -= 1
else: combo = 0  # сбрасываем комбо</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти і збери кілька монет. Як рахується комбо?", ru:"⭐ Запусти и собери монеты. Как считается комбо?" }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни базові очки з 10 на 25.", ru:"⭐ Базовые очки: 10 → 25." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай бонус за швидкість: що швидше граєш, тим більше очок.", ru:"⭐⭐ Бонус за скорость." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Збережи рекорд у файл та покажи його в HUD.", ru:"⭐⭐ Сохрани рекорд в файл." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Покажи 'НОВИЙ РЕКОРД!' жовтим коли побито рекорд.", ru:"⭐⭐ Покажи 'НОВЫЙ РЕКОРД!'." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Комбо x3 і більше — рахунок подвоюється.", ru:"⭐⭐⭐ Комбо x3+ — счёт удваивается." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Таблиця топ-3 рекордів (список у файлі).", ru:"⭐⭐⭐⭐ Топ-3 рекордов в файле." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй систему очків у свою гру.", ru:"⭐⭐⭐⭐ Встрой систему очков в свою игру." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# ⚠️ Запускай у Thonny!
# Урок 90 — Рахунок та комбо
import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Комбо рахунок!")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 28, bold=True)
font_big = pygame.font.SysFont("Arial", 48, bold=True)
BG = (10, 10, 30)

RECORD_FILE = "mygame_record.txt"
def load_rec():
    try:
        with open(RECORD_FILE) as f: return int(f.read().strip())
    except: return 0
def save_rec(s):
    with open(RECORD_FILE,"w") as f: f.write(str(s))

score = 0
combo = 0
combo_timer = 0
best = load_rec()
new_rec_flash = 0
popups = []
px, py = W//2, H//2
coins = [{"x": random.randint(30,W-30), "y": random.randint(30,H-100)} for _ in range(8)]

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            save_rec(max(score, best))
            pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px = max(20, px - 5)
    if keys[pygame.K_RIGHT]: px = min(W-20, px + 5)
    if keys[pygame.K_UP]:    py = max(20, py - 5)
    if keys[pygame.K_DOWN]:  py = min(H-50, py + 5)

    for c in coins[:]:
        if abs(px - c["x"]) < 24 and abs(py - c["y"]) < 24:
            combo += 1; combo_timer = 90
            pts = 10 * max(1, combo)
            score += pts
            popups.append({"x": c["x"], "y": c["y"], "txt": f"+{pts}", "life": 40})
            coins.remove(c)
            coins.append({"x": random.randint(30,W-30), "y": random.randint(30,H-100)})
            if score > best:
                best = score; save_rec(best); new_rec_flash = 100

    if combo_timer > 0: combo_timer -= 1
    else: combo = 0

    for p in popups[:]:
        p["y"] -= 1; p["life"] -= 1
        if p["life"] <= 0: popups.remove(p)

    screen.fill(BG)
    for c in coins:
        pygame.draw.circle(screen, (255, 210, 0), (c["x"], c["y"]), 16)
        pygame.draw.circle(screen, (220, 160, 0), (c["x"], c["y"]), 16, 3)
    for p in popups:
        col = (255,80,80) if combo >= 3 else (255,220,0)
        t = font.render(p["txt"], True, col)
        screen.blit(t, t.get_rect(center=(p["x"], p["y"])))
    pygame.draw.rect(screen, (60, 200, 80), (px-18, py-18, 36, 36), border_radius=8)

    hud = font.render(f"Score: {score}  Рекорд: {best}  Комбо x{combo}", True, (255,255,255))
    screen.blit(hud, (10, 10))
    if combo >= 2:
        ct = font_big.render(f"КОМБО x{combo}!", True, (255,100,50))
        screen.blit(ct, ct.get_rect(center=(W//2, 70)))
    if new_rec_flash > 0:
        nr = font_big.render("НОВИЙ РЕКОРД!", True, (255,220,0))
        screen.blit(nr, nr.get_rect(center=(W//2, H-60)))
        new_rec_flash -= 1

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 90,
        title: { uk: "Унікальна механіка", ru: "Уникальная механика" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що робить твою гру НЕ схожою на інші? Унікальна механіка!</p></div><div class="theory-block"><h3>📖 Три спецмеханіки</h3><pre class="code-example"># 1. Ривок (dash): подвійне натискання → швидкий стрибок
dash_timer = 0
if dash_timer > 0:
    px += dash_dir * 15; dash_timer -= 1

# 2. Магніт: монети летять до гравця
for coin in coins:
    dx = px - coin["x"]; dy = py - coin["y"]
    dist = max(1, (dx**2+dy**2)**0.5)
    coin["x"] += dx/dist * 3; coin["y"] += dy/dist * 3

# 3. Щит: перший удар поглинається
if shield and hit:
    shield = False  # щит зламався
else:
    lives -= 1  # удар без щиту</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что делает твою игру НЕ похожей на другие? Уникальная механика!</p></div><div class="theory-block"><h3>📖 Три спецмеханики</h3><pre class="code-example"># 1. Рывок (dash): двойное нажатие → быстрый прыжок
dash_timer = 0
if dash_timer > 0:
    px += dash_dir * 15; dash_timer -= 1

# 2. Магнит: монеты летят к игроку
for coin in coins:
    dx = px - coin["x"]; dy = py - coin["y"]
    dist = max(1, (dx**2+dy**2)**0.5)
    coin["x"] += dx/dist * 3; coin["y"] += dy/dist * 3

# 3. Щит: первый удар поглощается
if shield and hit:
    shield = False  # щит разбит
else:
    lives -= 1</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти і спробуй всі 3 механіки (1 2 3 на клавіатурі).", ru:"⭐ Запусти и попробуй все 3 механики (клавиши 1 2 3)." }},
          { num:2, level:"easy", text:{ uk:"⭐ Додай ривок до своєї гри (клавіша SHIFT або подвійне натискання).", ru:"⭐ Добавь рывок в свою игру (SHIFT)." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Зроби щоб ривок мав кулдаун (не можна використовувати занадто часто).", ru:"⭐⭐ Кулдаун для рывка." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай магніт як тимчасовий бонус (діє 5 секунд).", ru:"⭐⭐ Магнит как временный бонус на 5 сек." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Щит відображається як мерехтлива аура навколо гравця.", ru:"⭐⭐ Щит — мерцающая аура вокруг игрока." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Вибери одну механіку і зроби для неї відповідний бонус-дроп.", ru:"⭐⭐⭐ Для своей механики сделай бонус-дроп." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Комбінуй 2 механіки: ривок + щит одночасно.", ru:"⭐⭐⭐⭐ Комбо двух механик: рывок + щит." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй обрану механіку у свою фінальну гру.", ru:"⭐⭐⭐⭐ Встрой механику в финальную игру." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 91 — Унікальна механіка
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Спецмеханіки")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 26, bold=True)
BG = (10, 10, 30)

mode = 1  # 1=ривок 2=магніт 3=щит
px, py = W//2, H//2
dash_timer = 0; dash_dir = 1
magnet = False; magnet_timer = 0
shield = True; shield_flash = 0
coins = [{"x": random.randint(30,W-30), "y": random.randint(30,H-80)} for _ in range(10)]
enemies = [{"x": random.randint(20,W-20), "y": random.randint(20,H-80)} for _ in range(4)]
score = 0; lives = 3

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_1: mode = 1
            if event.key == pygame.K_2: mode = 2; magnet = True; magnet_timer = 300
            if event.key == pygame.K_3: mode = 3; shield = True
            if event.key == pygame.K_LSHIFT and dash_timer == 0 and mode == 1:
                dash_timer = 12; dash_dir = 1 if pygame.key.get_pressed()[pygame.K_RIGHT] else -1

    keys = pygame.key.get_pressed()
    spd = 5
    if keys[pygame.K_LEFT]:  px = max(20, px - spd)
    if keys[pygame.K_RIGHT]: px = min(W-20, px + spd)
    if keys[pygame.K_UP]:    py = max(20, py - spd)
    if keys[pygame.K_DOWN]:  py = min(H-20, py + spd)

    if dash_timer > 0: px = max(20, min(W-20, px + dash_dir * 15)); dash_timer -= 1
    if magnet_timer > 0: magnet_timer -= 1
    else: magnet = False

    for c in coins[:]:
        if magnet:
            dx = px - c["x"]; dy = py - c["y"]
            dist = max(1, math.hypot(dx, dy))
            c["x"] += dx/dist*4; c["y"] += dy/dist*4
        if abs(px-c["x"]) < 24 and abs(py-c["y"]) < 24:
            score += 10; coins.remove(c)
            coins.append({"x": random.randint(30,W-30), "y": random.randint(30,H-80)})

    for e in enemies:
        ex, ey = e["x"], e["y"]
        if abs(px-ex) < 25 and abs(py-ey) < 25:
            if mode == 3 and shield:
                shield = False; shield_flash = 60
            else:
                lives -= 1
                e["x"] = random.randint(20,W-20); e["y"] = random.randint(20,H-80)

    if shield_flash > 0: shield_flash -= 1

    screen.fill(BG)
    for c in coins: pygame.draw.circle(screen, (255,210,0), (int(c["x"]),int(c["y"])), 14)
    for e in enemies: pygame.draw.circle(screen, (220,50,40), (int(e["x"]),int(e["y"])), 20)
    col = (80,200,80)
    if shield_flash > 0 and shield_flash%10<5: col=(255,255,100)
    pygame.draw.rect(screen, col, (px-18,py-18,36,36), border_radius=8)
    if mode==3 and shield:
        alpha=int(128+80*math.sin(pygame.time.get_ticks()*0.01))
        pygame.draw.circle(screen,(100,150,255),(px,py),32,3)
    hud = font.render(f"Score:{score}  Життя:{lives}  Режим:{mode}(1/2/3)  SHIFT=ривок", True,(255,255,255))
    screen.blit(hud,(8,8))
    modes = ["1-Ривок  2-Магніт  3-Щит"]
    screen.blit(font.render(modes[0],True,(180,180,255)),(8,H-40))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 91,
        title: { uk: "Звуки для своєї гри", ru: "Звуки для своей игры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Пам'ятаєш урок про звуки? Зараз додаємо їх у СВОЮ гру!</p></div><div class="theory-block"><h3>📖 Звуковий менеджер</h3><pre class="code-example">import array, math
pygame.mixer.init(44100, -16, 1, 512)

sounds = {}
def make_beep(freq, dur, vol=0.3, shape="sine"):
    n = int(44100 * dur)
    if shape == "sine":
        wave = [math.sin(2*math.pi*freq*i/44100) for i in range(n)]
    elif shape == "square":
        wave = [1.0 if math.sin(2*math.pi*freq*i/44100)>0 else -1.0 for i in range(n)]
    buf = array.array('h', [int(v*vol*32767) for v in wave])
    sounds[f"{freq}_{dur}"] = pygame.sndarray.make_sound(buf)

make_beep(880, 0.05)  # постріл
make_beep(200, 0.3)   # вибух</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Помнишь урок про звуки? Сейчас добавляем их в СВОЮ игру!</p></div><div class="theory-block"><h3>📖 Звуковой менеджер</h3><pre class="code-example">import array, math
pygame.mixer.init(44100, -16, 1, 512)

sounds = {}
def make_beep(freq, dur, vol=0.3, shape="sine"):
    n = int(44100 * dur)
    if shape == "sine":
        wave = [math.sin(2*math.pi*freq*i/44100) for i in range(n)]
    elif shape == "square":
        wave = [1.0 if math.sin(2*math.pi*freq*i/44100)>0 else -1.0 for i in range(n)]
    buf = array.array('h', [int(vol*32767*s) for s in wave])
    return pygame.sndarray.make_sound(buf)

sounds["shoot"] = make_beep(880, 0.05)
sounds["hit"]   = make_beep(220, 0.15, shape="square")
sounds["bonus"] = make_beep(1320, 0.1)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти і почуй 4 різних звуки.", ru:"⭐ Запусти и услышь 4 звука." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни частоти на будь-які інші. Що звучить круто?", ru:"⭐ Измени частоты. Что звучит круто?" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай звук постілу до шутера/ловця з попередніх уроків.", ru:"⭐⭐ Добавь звук выстрела в свой шутер/ловец." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай звук збору монети (висока нота) і вибуху (низька).", ru:"⭐⭐ Звук монеты (высокая) и взрыва (низкая)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Клавіша M вимикає/вмикає всі звуки.", ru:"⭐⭐ M — mute/unmute." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Зроби 'квадратну хвилю' (8-бітний звук) для ретро-стилю.", ru:"⭐⭐⭐ Квадратная волна — ретро звук." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Фоновий трек: короткий loop з 4 нот що повторюється.", ru:"⭐⭐⭐⭐ Фоновый loop из 4 нот." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй звуки у свою фінальну гру.", ru:"⭐⭐⭐⭐ Встрой звуки в финальную игру." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 92 — Звуки для гри
import pygame, sys, array, math
pygame.mixer.init(44100, -16, 1, 512)
pygame.init()
W, H = 800, 500
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Звуки!")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 26, bold=True)
BG = (10, 10, 30)
muted = False

def make_sound(freq, dur, vol=0.28, shape="sine"):
    n = int(44100 * dur)
    result = []
    for i in range(n):
        t = i / 44100
        if shape == "sine":
            v = math.sin(2 * math.pi * freq * t)
        elif shape == "square":
            v = 1.0 if math.sin(2 * math.pi * freq * t) > 0 else -1.0
        elif shape == "decay":
            v = math.sin(2 * math.pi * freq * t) * math.exp(-6 * i / n)
        result.append(int(v * vol * 32767))
    buf = array.array('h', result)
    return pygame.sndarray.make_sound(buf)

snd_shoot   = make_sound(880,  0.05, shape="sine")
snd_coin    = make_sound(1320, 0.08, shape="sine")
snd_explode = make_sound(100,  0.30, shape="decay")
snd_levelup = make_sound(659,  0.15, shape="square")

buttons = [
    ("SPACE — постріл (880 Гц)", snd_shoot,   pygame.K_SPACE),
    ("C — монета (1320 Гц)",     snd_coin,    pygame.K_c),
    ("E — вибух (100 Гц decay)", snd_explode, pygame.K_e),
    ("L — level up (квадрат)",   snd_levelup, pygame.K_l),
]

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_m: muted = not muted
            for label, snd, key in buttons:
                if event.key == key and not muted: snd.play()

    screen.fill(BG)
    for i, (label, _, _) in enumerate(buttons):
        t = font.render(label, True, (200, 220, 255))
        screen.blit(t, (W//2 - t.get_width()//2, 80 + i * 70))
    mut_col = (255,80,80) if muted else (80,255,80)
    mut_t = font.render("M — " + ("MUTE (тихо)" if muted else "звук увімкнений"), True, mut_col)
    screen.blit(mut_t, mut_t.get_rect(center=(W//2, H-40)))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 92,
        title: { uk: "Тестування та баланс", ru: "Тестирование и баланс" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Готова гра — це не просто 'працює'. Вона має бути ЦІКАВОЮ і ЗБАЛАНСОВАНОЮ!</p></div><div class="theory-block"><h3>📖 Чеклист тестування</h3><ul><li>✅ Гра не крашиться після 5 хвилин гри</li><li>✅ Можна програти і продовжити</li><li>✅ Початок не занадто легкий, кінець не занадто складний</li><li>✅ Рахунок росте логічно</li><li>✅ Вороги не спавняться прямо на гравця</li></ul></div><div class="theory-block hint"><h3>💡 Константи балансу</h3><pre class="code-example">ENEMY_SPEED = 2.0    # починаємо тут
SPAWN_RATE  = 80     # кадрів між ворогами
LEVEL_UP    = 200    # очок до наступного рівня
# Змінюй по одній — дивись результат!</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Готовая игра — это не просто «работает». Она должна быть ИНТЕРЕСНОЙ и СБАЛАНСИРОВАННОЙ!</p></div><div class="theory-block"><h3>📖 Чеклист тестирования</h3><ul><li>✅ Игра не крашится после 5 минут игры</li><li>✅ Можно проиграть и продолжить</li><li>✅ Начало не слишком лёгкое, конец не слишком сложный</li><li>✅ Счёт растёт логично</li><li>✅ Враги не спавнятся прямо на игрока</li></ul></div><div class="theory-block hint"><h3>💡 Константы баланса</h3><p>Вынеси все числа в константы вверху файла: ENEMY_SPEED, SPAWN_RATE, PLAYER_HP. Так легко менять баланс не трогая логику.</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Зіграй у свою гру 5 хвилин. Запиши 3 проблеми.", ru:"⭐ Играй 5 минут. Запиши 3 проблемы." }},
          { num:2, level:"easy", text:{ uk:"⭐ Виправ 1 найважливішу проблему зі свого списку.", ru:"⭐ Исправь 1 главную проблему." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Відрегулюй швидкість ворогів: знайди комфортний рівень.", ru:"⭐⭐ Отрегулируй скорость врагов." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Переконайся що гра ніколи не крашиться (index out of range тощо).", ru:"⭐⭐ Убедись что нет крашей." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Дай зіграти другу або вчителю. Що їм важко?", ru:"⭐⭐ Дай поиграть другу. Что им трудно?" }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Додай чітку прогресію складності (рівні з різними параметрами).", ru:"⭐⭐⭐ Чёткая прогрессия сложности по уровням." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Зроби 'Easy / Normal / Hard' режими в меню.", ru:"⭐⭐⭐⭐ Режимы Easy/Normal/Hard в меню." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Попроси 3 людей протестувати і випрвь знайдені баги.", ru:"⭐⭐⭐⭐ 3 тестера — исправь найденные баги." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 93 — Тестування та баланс
# Ця програма — шаблон для тестування ТВОЄЇ гри.
# Змінюй константи балансу і дивись результат!
import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Тест балансу")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 24, bold=True)
font_sm = pygame.font.SysFont("Arial", 18)
BG = (10, 10, 30)

# ══ КОНСТАНТИ БАЛАНСУ — ЗМІНЮЙ ЦІ ЗНАЧЕННЯ ══
ENEMY_SPEED  = 2.5    # базова швидкість ворогів
SPAWN_RATE   = 60     # кадрів між появою ворогів
LEVEL_UP_PTS = 150    # очок для наступного рівня
PLAYER_LIVES = 3      # початкові життя
SPEED_SCALE  = 0.3    # наскільки вороги прискорюються кожен рівень
# ════════════════════════════════════════════════

score = 0; level = 1; lives = PLAYER_LIVES
enemies = []; spawn_t = 0
px, py = W//2, H-70
game_over = False; timer = 0

while True:
    timer += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN and game_over and event.key == pygame.K_r:
            score=0; level=1; lives=PLAYER_LIVES; enemies=[]; game_over=False; timer=0

    if not game_over:
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  px = max(20, px - 5)
        if keys[pygame.K_RIGHT]: px = min(W-20, px + 5)

        spawn_t += 1
        interval = max(20, SPAWN_RATE - level * 5)
        if spawn_t >= interval:
            spawn_t = 0
            ey = -25
            ex = random.randint(20, W - 20)
            spd = ENEMY_SPEED + (level - 1) * SPEED_SCALE
            enemies.append({"x": ex, "y": ey, "spd": spd})

        for e in enemies[:]:
            e["y"] += e["spd"]
            if e["y"] > H + 30: enemies.remove(e)
            elif abs(px - e["x"]) < 28 and abs(py - e["y"]) < 28:
                enemies.remove(e); lives -= 1
                if lives <= 0: game_over = True
            else: score += 1

        if score >= LEVEL_UP_PTS * level: level += 1

    screen.fill(BG)
    for e in enemies:
        pygame.draw.circle(screen, (200,60,40), (int(e["x"]),int(e["y"])), 22)
    if not game_over:
        pygame.draw.rect(screen, (60,200,80), (px-18,py-18,36,36), border_radius=8)

    hud_lines = [
        f"Score: {score//10}  Рівень: {level}  Життя: {lives}  Час: {timer//60}с",
        f"Швидкість: {ENEMY_SPEED + (level-1)*SPEED_SCALE:.1f}  Інтервал: {max(20,SPAWN_RATE-level*5)}кадрів",
    ]
    for i, line in enumerate(hud_lines):
        screen.blit(font_sm.render(line, True, (200,200,255)), (8, 8 + i*24))

    if game_over:
        t = font.render(f"GAME OVER! Score:{score//10}  R — заново", True, (255,80,80))
        screen.blit(t, t.get_rect(center=(W//2, H//2)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 93,
        title: { uk: "Польорування: частинки та ефекти", ru: "Полировка: частицы и эффекты" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Різниця між 'грою що працює' і 'грою що захоплює' — це деталі!</p></div><div class="theory-block"><h3>📖 Частинки та juice</h3><pre class="code-example"># Частинки при вибуху:
def explode(x, y, col, n=12):
    for _ in range(n):
        particles.append({
            "x": x, "y": y,
            "vx": random.uniform(-5, 5),
            "vy": random.uniform(-5, 5),
            "life": random.randint(15, 35),
            "col": col,
            "size": random.randint(2, 5)
        })

# Плаваючий текст +10:
def score_popup(x, y, text):
    popups.append({"x": x, "y": y, "txt": text, "life": 40})

# У циклі:
for p in particles[:]:
    p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["life"]-=1
    p["size"]=max(1,p["size"]-0.1)
    if p["life"]<=0: particles.remove(p)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Разница между «игрой которая работает» и «игрой которая захватывает» — это детали!</p></div><div class="theory-block"><h3>📖 Частицы и juice</h3><pre class="code-example"># Частицы при взрыве:
def explode(x, y, col, n=12):
    for _ in range(n):
        particles.append({
            "x": x, "y": y,
            "vx": random.uniform(-5, 5),
            "vy": random.uniform(-5, 5),
            "life": random.randint(15, 35),
            "col": col,
            "r": random.randint(3, 8)
        })

# Обновление частиц:
for p in particles[:]:
    p["x"] += p["vx"]; p["y"] += p["vy"]
    p["vy"] += 0.2  # гравитация
    p["life"] -= 1
    if p["life"] <= 0: particles.remove(p)
    else:
        pygame.draw.circle(screen, p["col"], (int(p["x"]), int(p["y"])), p["r"])</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Натисни SPACE і побачиш вибух частинок. Скільки частинок?", ru:"⭐ SPACE — взрыв частиц. Сколько частиц?" }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни колір частинок та їх кількість.", ru:"⭐ Измени цвет и количество частиц." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай плаваючий текст '+10' при зборі монети.", ru:"⭐⭐ Плавающий текст '+10' при сборе монеты." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Вибух при загибелі ворога (великий) і при зборі бонусу (маленький).", ru:"⭐⭐ Большой взрыв врага и маленький — бонуса." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Прибери всі print() з гри — вони гальмують.", ru:"⭐⭐ Убери все print() — они тормозят." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Доріжка з частинок за гравцем (trail effect).", ru:"⭐⭐⭐ Хвост из частиц за игроком." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Фонові зорі + ефект паралаксу (далекі рухаються повільніше).", ru:"⭐⭐⭐⭐ Фон со звёздами и параллаксом." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй всі ефекти у свою фінальну гру.", ru:"⭐⭐⭐⭐ Встрой все эффекты в финальную игру." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 94 — Частинки та польорування
import pygame, sys, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Частинки!")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 24, bold=True)
BG = (8, 8, 22)

particles = []
popups = []
trail = []
coins = [{"x": random.randint(40,W-40), "y": random.randint(40,H-80)} for _ in range(7)]
px, py = W//2, H//2
score = 0

def explode(x, y, col, n=14):
    for _ in range(n):
        particles.append({
            "x": float(x), "y": float(y),
            "vx": random.uniform(-6, 6), "vy": random.uniform(-6, 6),
            "life": random.randint(18, 40),
            "col": col, "size": random.uniform(2, 6)
        })

def score_popup(x, y, text, col=(255,220,0)):
    popups.append({"x": float(x), "y": float(y), "txt": text, "life": 45, "col": col})

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            explode(px, py, (255, 120, 40), 20)

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px = max(20, px - 5)
    if keys[pygame.K_RIGHT]: px = min(W-20, px + 5)
    if keys[pygame.K_UP]:    py = max(20, py - 5)
    if keys[pygame.K_DOWN]:  py = min(H-20, py + 5)

    trail.append({"x": px, "y": py, "life": 12})
    trail = [t for t in trail if t["life"] > 0]
    for t in trail: t["life"] -= 1

    for c in coins[:]:
        if abs(px-c["x"])<26 and abs(py-c["y"])<26:
            score += 10
            explode(c["x"], c["y"], (255, 200, 50), 10)
            score_popup(c["x"], c["y"]-20, "+10")
            coins.remove(c)
            coins.append({"x": random.randint(40,W-40), "y": random.randint(40,H-80)})

    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["life"]-=1; p["size"]=max(1,p["size"]-0.08)
        if p["life"]<=0: particles.remove(p)
    for pp in popups[:]:
        pp["y"]-=1.2; pp["life"]-=1
        if pp["life"]<=0: popups.remove(pp)

    screen.fill(BG)
    for t in trail:
        alpha = int(200 * t["life"] / 12)
        pygame.draw.circle(screen, (60,100,200), (int(t["x"]),int(t["y"])), max(1,t["life"]//2))
    for c in coins:
        pygame.draw.circle(screen,(255,200,0),(c["x"],c["y"]),16)
    for p in particles:
        pygame.draw.circle(screen, p["col"], (int(p["x"]),int(p["y"])), int(p["size"]))
    pygame.draw.rect(screen,(80,200,80),(px-18,py-18,36,36),border_radius=8)
    for pp in popups:
        t=font.render(pp["txt"],True,pp["col"]); screen.blit(t,(int(pp["x"])-t.get_width()//2,int(pp["y"])))
    screen.blit(font.render(f"Score:{score}  SPACE — вибух  Стрілки — рух",True,(200,200,255)),(8,8))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 94,
        title: { uk: "Підготовка до показу", ru: "Подготовка к показу" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Твоя гра майже готова! Сьогодні робимо її 'презентабельною'.</p></div><div class="theory-block"><h3>📖 Фінальні штрихи</h3><pre class="code-example"># 1. Титульний екран з іменем:
author = "Гра автора: [Ваше ім'я]  Вік: [X]"

# 2. README у коментарях на початку файлу:
# ╔══════════════════════╗
# ║  НАЗВА ГРИ           ║
# ║  Автор: [ім'я]       ║
# ║  Як грати:           ║
# ║  - стрілки: рух      ║
# ║  - SPACE: стрільба   ║
# ╚══════════════════════╝

# 3. Pitch (3 речення):
# Моя гра — космічний шутер.
# Гравець керує кораблем і знищує астероїди.
# Особливість: бос з'являється кожні 200 очок!</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Твоя игра почти готова! Сегодня делаем её «презентабельной».</p></div><div class="theory-block"><h3>📖 Финальные штрихи</h3><pre class="code-example"># 1. Титульный экран с именем:
author = "Игра автора: [Ваше имя]  Возраст: [X]"

# 2. README в комментариях в начале файла:
# ╔══════════════════════╗
# ║  НАЗВАНИЕ ИГРЫ       ║
# ║  Автор: [имя]        ║
# ║  Как играть:         ║
# ║  - стрелки: движение ║
# ║  - SPACE: стрельба   ║
# ╚══════════════════════╝

# 3. Питч игры (3 фразы):
# «Это игра где ты [кто]»
# «Твоя цель — [что делать]»
# «Опасность — [от чего уберечься]»</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Додай своє ім'я на титульний екран гри.", ru:"⭐ Добавь своё имя на титульный экран." }},
          { num:2, level:"easy", text:{ uk:"⭐ Напиши README у коментарях на початку файлу (назва, автор, керування).", ru:"⭐ README в комментарях (название, автор, управление)." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Прибери всі print() та тестові змінні з коду.", ru:"⭐⭐ Убери все print() и тестовые переменные." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Перевір що гра запускається на чужому комп'ютері без помилок.", ru:"⭐⭐ Проверь запуск на чужом компьютере." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Придумай і запам'ятай pitch (3 речення про гру).", ru:"⭐⭐ Питч — 3 предложения об игре." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Зроби красивий title screen з логотипом (pygame.draw).", ru:"⭐⭐⭐ Красивый title screen с логотипом." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Запиши відео геймплею (OBS або Bandicam) для портфоліо.", ru:"⭐⭐⭐⭐ Запиши видео геймплея для портфолио." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Завантаж гру на GitHub як своє перше портфоліо.", ru:"⭐⭐⭐⭐ Загрузи игру на GitHub." }},
        ],
        starterCode: `# ╔══════════════════════════════════════════════╗
# ║  МОЯ ПЕРША ГРА                              ║
# ║  Автор: [Твоє ім'я]    Вік: [X] років      ║
# ║  Академія Мій комп'ютер, Дніпро             ║
# ║                                              ║
# ║  Керування:                                  ║
# ║    ← → — рух гравця                         ║
# ║    SPACE — стріляти / старт                 ║
# ║    P — пауза                                 ║
# ║    ESC — вийти в меню                        ║
# ╚══════════════════════════════════════════════╝
# ⚠️ Запускай у Thonny!
# Урок 95 — Підготовка до показу
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("МОЯ ПЕРША ГРА")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 64, bold=True)
font     = pygame.font.SysFont("Arial", 28, bold=True)
font_sm  = pygame.font.SysFont("Arial", 20)
BG = (5, 5, 20)
tick = 0

AUTHOR = "[Твоє ім'я]"
GAME_NAME = "МОЯ ПЕРША ГРА"
stars = [{"x": random.uniform(0,W), "y": random.uniform(0,H), "spd": random.uniform(0.2,0.8)} for _ in range(100)]
state = "title"
px, py = W//2, H-70; score = 0; lives = 3; enemies = []; spawn_t = 0; cool = 0; bullets = []

while True:
    tick += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE and state=="playing": state="title"
            if event.key == pygame.K_SPACE:
                if state in ("title","gameover"):
                    state="playing"; score=0; lives=3; enemies=[]; bullets=[]; spawn_t=0
                elif state=="playing" and cool<=0:
                    bullets.append([px,py-30]); cool=14
            if event.key == pygame.K_p and state=="playing": state="paused"
            elif event.key == pygame.K_p and state=="paused": state="playing"

    screen.fill(BG)
    for s in stars:
        pygame.draw.circle(screen,(180,180,255),(int(s["x"]),int(s["y"])),1)
        s["y"] += s["spd"]
        if s["y"] > H: s["y"]=0; s["x"]=random.uniform(0,W)

    if state == "title":
        r=int(128+127*abs(math.sin(tick*0.025)))
        t1=font_big.render(GAME_NAME,True,(r,200,255-r))
        t2=font.render(f"Автор: {AUTHOR}",True,(200,200,255))
        t3=font.render("SPACE — почати грати",True,(255,220,0))
        t4=font_sm.render("Академія Мій комп'ютер ● Дніпро",True,(120,120,180))
        screen.blit(t1,t1.get_rect(center=(W//2,H//2-80)))
        screen.blit(t2,t2.get_rect(center=(W//2,H//2-10)))
        screen.blit(t3,t3.get_rect(center=(W//2,H//2+55)))
        screen.blit(t4,t4.get_rect(center=(W//2,H-30)))

    elif state == "playing":
        keys=pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  px=max(20,px-6)
        if keys[pygame.K_RIGHT]: px=min(W-20,px+6)
        if cool>0: cool-=1
        spawn_t+=1
        if spawn_t>=55: spawn_t=0; enemies.append([random.randint(20,W-20),-30,random.uniform(2,3.5)])
        for b in bullets[:]:
            b[1]-=13
            if b[1]<-10: bullets.remove(b)
        for e in enemies[:]:
            e[1]+=e[2]
            if e[1]>H+30: enemies.remove(e)
            elif abs(px-e[0])<28 and abs(py-e[1])<28:
                enemies.remove(e); lives-=1
                if lives<=0: state="gameover"
            else:
                for b in bullets[:]:
                    if b in bullets and abs(b[0]-e[0])<24 and abs(b[1]-e[1])<24:
                        bullets.remove(b); enemies.remove(e); score+=10; break
        for e in enemies: pygame.draw.circle(screen,(200,60,40),(int(e[0]),int(e[1])),20)
        for b in bullets: pygame.draw.rect(screen,(255,220,0),(b[0]-3,b[1]-10,6,14))
        pygame.draw.polygon(screen,(0,200,255),[(px,py-26),(px-16,py+12),(px+16,py+12)])
        hud=font.render(f"Score:{score}  Життя:{'♥'*lives}  P-пауза  ESC-меню",True,(255,255,255))
        screen.blit(hud,(8,8))

    elif state == "paused":
        ov=pygame.Surface((W,H),pygame.SRCALPHA); ov.fill((0,0,0,160)); screen.blit(ov,(0,0))
        t=font_big.render("ПАУЗА",True,(255,220,0)); screen.blit(t,t.get_rect(center=(W//2,H//2)))

    elif state == "gameover":
        t1=font_big.render("GAME OVER",True,(255,50,50))
        t2=font.render(f"Score: {score}   SPACE — заново",True,(255,255,255))
        screen.blit(t1,t1.get_rect(center=(W//2,H//2-40))); screen.blit(t2,t2.get_rect(center=(W//2,H//2+40)))

    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 95,
        title: { uk: "Збереження стану гри", ru: "Сохранение состояния игры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що якщо гравець хоче зупинитись і продовжити пізніше? Потрібне збереження!</p></div><div class="theory-block"><h3>📖 Збереження у JSON</h3><pre class="code-example">import json

def save_game(data):
    with open("savegame.json","w") as f:
        json.dump(data,f)

def load_game():
    try:
        with open("savegame.json") as f:
            return json.load(f)
    except:
        return None

# Зберігаємо:
save_game({"score":score,"level":level,"lives":lives})

# Завантажуємо:
save = load_game()
if save:
    score = save["score"]
    level = save["level"]
    lives = save["lives"]</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что если игрок хочет остановиться и продолжить позже? Нужно сохранение!</p></div><div class="theory-block"><h3>📖 Сохранение в JSON</h3><pre class="code-example">import json

def save_game(data):
    with open("savegame.json","w") as f:
        json.dump(data,f)

def load_game():
    try:
        with open("savegame.json") as f:
            return json.load(f)
    except:
        return None

# Сохраняем:
save_game({"score": score, "level": level, "lives": lives})

# Загружаем:
saved = load_game()
if saved:
    score = saved["score"]
    level = saved["level"]
    lives = saved["lives"]</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Натисни S для збереження і L для завантаження. Перевір що працює.", ru:"⭐ S — сохранить, L — загрузить. Проверь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Відкрий savegame.json в Thonny — що там зберігається?", ru:"⭐ Открой savegame.json — что там?" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай збереження позиції гравця (px, py).", ru:"⭐⭐ Сохраняй позицию игрока." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ При завантаженні показуй повідомлення 'Завантаження збереження...'", ru:"⭐⭐ При загрузке показывай 'Загрузка...'." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Автоматичне збереження кожні 30 секунд.", ru:"⭐⭐ Автосохранение каждые 30 секунд." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Збережи список ворогів (їх позиції).", ru:"⭐⭐⭐ Сохраняй список врагов." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ 3 слоти збереження (файли save1.json, save2.json, save3.json).", ru:"⭐⭐⭐⭐ 3 слота сохранений." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй збереження у свою фінальну гру.", ru:"⭐⭐⭐⭐ Встрой сохранение в финальную игру." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 96 — Збереження стану
import pygame, sys, json, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Збереження гри")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 26, bold=True)
font_sm = pygame.font.SysFont("Arial", 20)
BG = (10, 10, 30)
SAVE_FILE = "savegame.json"

def save_game(score, level, lives, px, py):
    data = {"score": score, "level": level, "lives": lives, "px": px, "py": py}
    with open(SAVE_FILE, "w") as f:
        json.dump(data, f, indent=2)
    return True

def load_game():
    try:
        with open(SAVE_FILE) as f:
            return json.load(f)
    except:
        return None

score = 0; level = 1; lives = 3
px, py = W//2, H//2
msg = ""; msg_timer = 0
coins = [{"x": random.randint(40,W-40), "y": random.randint(40,H-80)} for _ in range(6)]
autosave_t = 0

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_s:
                if save_game(score, level, lives, px, py):
                    msg = "✅ Збережено!"; msg_timer = 120
            if event.key == pygame.K_l:
                save = load_game()
                if save:
                    score=save.get("score",0); level=save.get("level",1)
                    lives=save.get("lives",3); px=save.get("px",W//2); py=save.get("py",H//2)
                    msg = "📂 Завантажено!"; msg_timer = 120
                else:
                    msg = "❌ Збереження не знайдено"; msg_timer = 120

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px = max(20, px - 5)
    if keys[pygame.K_RIGHT]: px = min(W-20, px + 5)
    if keys[pygame.K_UP]:    py = max(20, py - 5)
    if keys[pygame.K_DOWN]:  py = min(H-20, py + 5)

    for c in coins[:]:
        if abs(px-c["x"])<24 and abs(py-c["y"])<24:
            score += 10
            if score >= level * 100: level += 1
            coins.remove(c)
            coins.append({"x": random.randint(40,W-40), "y": random.randint(40,H-80)})

    autosave_t += 1
    if autosave_t >= 1800:
        autosave_t = 0; save_game(score, level, lives, px, py)
        msg = "💾 Автозбереження"; msg_timer = 60

    if msg_timer > 0: msg_timer -= 1

    screen.fill(BG)
    for c in coins: pygame.draw.circle(screen,(255,200,0),(c["x"],c["y"]),15)
    pygame.draw.rect(screen,(60,200,80),(px-18,py-18,36,36),border_radius=8)

    screen.blit(font.render(f"Score:{score}  Рівень:{level}  Життя:{lives}", True,(255,255,255)),(8,8))
    hints = ["S — зберегти  |  L — завантажити  |  Автозбереження кожні 30с"]
    screen.blit(font_sm.render(hints[0],True,(160,160,220)),(8,H-35))

    if msg_timer > 0:
        col=(100,255,100) if "✅" in msg or "📂" in msg or "💾" in msg else (255,100,100)
        mt=font.render(msg,True,col); screen.blit(mt,mt.get_rect(center=(W//2,H//2-60)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 96,
        title: { uk: "Фінальне шліфування", ru: "Финальная шлифовка" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Остання перевірка перед презентацією! Чек-ліст фінального шліфування.</p></div><div class="theory-block"><h3>📖 Фінальний чек-ліст</h3><ul><li>✅ Назва гри у заголовку вікна</li><li>✅ Ім'я автора на title screen</li><li>✅ Рекорд зберігається у файл</li><li>✅ Немає print() у коді</li><li>✅ Меню, пауза, Game Over</li><li>✅ Звуки або музика</li><li>✅ Частинки при ключових подіях</li><li>✅ FPS = 60 (clock.tick(60))</li><li>✅ Гра запускається без помилок</li><li>✅ Показана вчителю та батькам</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Последняя проверка перед презентацией! Чек-лист финальной шлифовки.</p></div><div class="theory-block"><h3>📖 Финальный чек-лист</h3><ul><li>✅ Название игры в заголовке окна</li><li>✅ Имя автора на title screen</li><li>✅ Рекорд сохраняется в файл</li><li>✅ Нет print() в коде</li><li>✅ Меню, пауза, Game Over</li><li>✅ Звуки или музыка</li><li>✅ Частицы при ключевых событиях</li><li>✅ FPS = 60 (clock.tick(60))</li><li>✅ Игра запускается без ошибок</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Пройди весь чек-ліст і постав галочки.", ru:"⭐ Пройди чек-лист и поставь галочки." }},
          { num:2, level:"easy", text:{ uk:"⭐ Виправ будь-що що не пройшло чек-ліст.", ru:"⭐ Исправь всё что не прошло чек-лист." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Перевір що FPS не падає нижче 55 навіть з багатьма ворогами.", ru:"⭐⭐ FPS не ниже 55 даже с многими врагами." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай FPS лічильник (тимчасово) щоб виміряти продуктивність.", ru:"⭐⭐ Добавь FPS счётчик временно." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Переконайся що всі шрифти завантажуються без помилок.", ru:"⭐⭐ Все шрифты загружаются без ошибок." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Протестуй гру з випадковим seed (random.seed(42)) — чи відтворювана?", ru:"⭐⭐⭐ Тест с random.seed(42) — воспроизводимо?" }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Оптимізуй: великі списки → не перебирай двічі.", ru:"⭐⭐⭐⭐ Оптимизация: большие списки не перебирай дважды." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Зроби скріншот фінальної гри для портфоліо.", ru:"⭐⭐⭐⭐ Скриншот финальной игры для портфолио." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 97 — Фінальне шліфування
# Використовуй цей файл як шаблон для перевірки своєї гри
import pygame, sys, random, time
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Фінальна гра — [Твоє ім'я]")  # ← змінити!
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 24, bold=True)
font_sm = pygame.font.SysFont("Arial", 18)
BG = (8, 8, 22)

CHECKLIST = [
    ("Назва у заголовку вікна", True),
    ("Ім'я автора на title screen", False),   # ← False = ще не зроблено
    ("Рекорд зберігається у файл", False),
    ("Немає print() у коді", True),
    ("Меню, пауза, Game Over", False),
    ("Звуки або музика", False),
    ("Частинки при ключових подіях", False),
    ("clock.tick(60) в головному циклі", True),
    ("Гра запускається без помилок", True),
    ("Показана вчителю та батькам", False),
]

done = sum(1 for _, v in CHECKLIST if v)
fps_log = []
start = time.time()

while True:
    dt = clock.tick(60)
    fps = clock.get_fps()
    fps_log.append(fps)
    if len(fps_log) > 120: fps_log.pop(0)

    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()

    screen.fill(BG)
    title = font.render("ФІНАЛЬНИЙ ЧЕК-ЛІСТ", True, (255, 220, 0))
    screen.blit(title, title.get_rect(center=(W//2, 30)))

    for i, (item, ok) in enumerate(CHECKLIST):
        col = (80, 220, 80) if ok else (220, 80, 80)
        mark = "✅" if ok else "❌"
        t = font_sm.render(f"{mark} {item}", True, col)
        screen.blit(t, (60, 70 + i * 38))

    progress = done / len(CHECKLIST)
    bar_w = int((W - 120) * progress)
    pygame.draw.rect(screen, (40, 40, 60), (60, H - 80, W - 120, 24), border_radius=8)
    pygame.draw.rect(screen, (80, 200, 80) if done==len(CHECKLIST) else (255,180,0), (60, H-80, bar_w, 24), border_radius=8)
    prog_t = font_sm.render(f"{done}/{len(CHECKLIST)} виконано  |  FPS: {fps:.0f}  |  Час: {int(time.time()-start)}с", True, (200,200,255))
    screen.blit(prog_t, prog_t.get_rect(center=(W//2, H-40)))

    if done == len(CHECKLIST):
        t = font.render("🏆 ГОТОВО! Можна презентувати!", True, (255,220,0))
        screen.blit(t, t.get_rect(center=(W//2, H-100)))

    pygame.display.flip()
`
      },
      {
        id: 97,
        title: { uk: "Демо-день: показ гри", ru: "Demo Day: показ игры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Сьогодні — ДЕМО-ДЕНЬ! Показуєш свою гру батькам, друзям, вчителю.</p></div><div class="theory-block"><h3>📖 Як презентувати гру</h3><ol><li>Назви гру та своє ім'я</li><li>Поясни механіку (30 секунд)</li><li>Пограй демо (1-2 хвилини)</li><li>Розкажи про найскладнішу частину</li><li>Відповідай на питання!</li></ol></div><div class="theory-block hint"><h3>💡 Питання для рефлексії</h3><ul><li>Що тобі найбільше сподобалось у розробці?</li><li>Що було найважче?</li><li>Що б ти змінив якби робив знову?</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Сегодня — ДЕМО-ДЕНЬ! Показываешь свою игру родителям, друзьям, учителю.</p></div><div class="theory-block"><h3>📖 Как презентовать игру</h3><ol><li>Назови игру и своё имя</li><li>Объясни механику (30 секунд)</li><li>Сыграй демо (1-2 минуты)</li><li>Расскажи о самой сложной части</li><li>Отвечай на вопросы!</li></ol></div><div class="theory-block hint"><h3>💡 Вопросы для рефлексии</h3><ul><li>Что тебе больше всего понравилось в разработке?</li><li>Что было самым сложным?</li><li>Что бы ты добавил если было бы больше времени?</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Потренуйся presentation pitch (3 речення) вдома.", ru:"⭐ Потренируй pitch (3 предложения) дома." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зіграй свою гру перед вчителем — покажи меню, геймплей, рекорд.", ru:"⭐ Сыграй перед учителем." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Запроси 2 однокласників пограти і запиши їх враження.", ru:"⭐⭐ Пригласи 2 одноклассников и запиши впечатления." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Відповідай на питання: 'Як зробив X?'", ru:"⭐⭐ Отвечай на вопрос 'Как сделал X?'" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Напиши рефлексію: що сподобалось / що було важко / що б змінив.", ru:"⭐⭐ Рефлексия: понравилось / трудно / изменил бы." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Запроси батьків поглянути на твою гру. Розкажи як це робив!", ru:"⭐⭐⭐ Покажи игру родителям." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Зроби відеозапис геймплею (30-60 секунд) для портфоліо.", ru:"⭐⭐⭐⭐ Видеозапись геймплея для портфолио." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Завантаж гру на GitHub.com як перший публічний проект!", ru:"⭐⭐⭐⭐ Загрузи на GitHub.com первый публичный проект!" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 98 — Демо-день
# Цей файл — шаблон для фінальної презентації.
# ЗАМІНЮЙ [текст у дужках] на свій!
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("[НАЗВА ТВОЄЇ ГРИ]")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 60, bold=True)
font     = pygame.font.SysFont("Arial", 28, bold=True)
font_sm  = pygame.font.SysFont("Arial", 20)
BG = (5, 5, 20)
tick = 0
stars = [{"x": random.uniform(0,W),"y":random.uniform(0,H),"s":random.uniform(.3,.9)} for _ in range(120)]

PITCH = [
    "[НАЗВА ТВОЄЇ ГРИ]",
    "Автор: [Твоє ім'я]  |  Академія Мій комп'ютер",
    "[Одне речення: що за гра і яка механіка]",
    "[Одне речення: що особливе в твоїй грі]",
    "SPACE — запустити гру",
]

while True:
    tick += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            # ТУТ МОЖНА ЗАПУСТИТИ СВОЮ ГРУ
            # exec(open("моя_гра.py").read())
            pass

    screen.fill(BG)
    for s in stars:
        pygame.draw.circle(screen,(180,180,255),(int(s["x"]),int(s["y"])),1)
        s["y"]+=s["s"]; s["y"]%=H

    r = int(128+127*abs(math.sin(tick*0.02)))
    t0 = font_big.render(PITCH[0], True, (r, 200, 255-r))
    screen.blit(t0, t0.get_rect(center=(W//2, 100)))

    for i, line in enumerate(PITCH[1:], 1):
        col = (255,220,0) if i==4 else (180,200,255)
        t = font.render(line, True, col) if i < 4 else font.render(line, True, (255,220,0))
        if i == 4:
            pulse = int(200+55*abs(math.sin(tick*0.05)))
            t = font.render(line, True, (255, pulse, 0))
        screen.blit(t, t.get_rect(center=(W//2, 160 + i*80)))

    tip = font_sm.render("Академія Мій комп'ютер ● Дніпро ● Python + Pygame", True, (100,100,150))
    screen.blit(tip, tip.get_rect(center=(W//2, H-25)))

    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 98,
        title: { uk: "Огляд Модуля 6", ru: "Обзор Модуля 6" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Ти пройшов весь Модуль 6! Давай пригадаємо що навчились.</p></div><div class="theory-block"><h3>📖 Що ти вмієш після Модуля 6</h3><ul><li>🎮 Будувати повні Pygame ігри з нуля</li><li>🗺️ Меню, пауза, Game Over стани</li><li>💾 Збереження рекорду та стану у файл</li><li>🔊 Генерація звуків без файлів</li><li>✨ Частинки, струс, спалах</li><li>🏆 Клас Бос з AI</li><li>🧩 4 жанри: шутер, ловець, платформер, змійка</li><li>🎨 Власний персонаж та вороги</li><li>🚀 Презентація гри публіці</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Ты прошёл весь Модуль 6! Давай вспомним что научились.</p></div><div class="theory-block"><h3>📖 Что умеешь после Модуля 6</h3><ul><li>🎮 Строить полные Pygame игры с нуля</li><li>🗺️ Меню, пауза, Game Over состояния</li><li>💾 Сохранение рекорда и состояния в файл</li><li>🔊 Генерация звуков без файлов</li><li>✨ Частицы, тряска, вспышка</li><li>🏆 Класс Босс с ИИ</li><li>🧩 4 жанра: шутер, ловец, платформер, змейка</li><li>🎨 Собственный персонаж и враги</li><li>🎤 Презентация игры публике</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Перерахуй 5 речей що вмієш після цього модуля.", ru:"⭐ Назови 5 вещей из этого модуля." }},
          { num:2, level:"easy", text:{ uk:"⭐ Яка механіка сподобалась найбільше? Чому?", ru:"⭐ Какая механика понравилась больше всего?" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Поясни другу як зробити Pygame гру з нуля (5 кроків).", ru:"⭐⭐ Объясни другу как сделать Pygame игру (5 шагов)." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Що б ти додав у свою гру якби мав ще 2 тижні?", ru:"⭐⭐ Что бы добавил в игру за ещё 2 недели?" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Знайди в своїй грі найскладніший код і поясни як він працює.", ru:"⭐⭐ Найди самый сложный код и объясни как работает." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Намалюй схему архітектури своєї гри (стани, клас гравця, вороги).", ru:"⭐⭐⭐ Нарисуй схему архитектуры игры." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Напиши план Модуля 7: яку велику гру хочеш зробити?", ru:"⭐⭐⭐⭐ Напиши план Модуля 7: какую большую игру?" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Помоги однокласнику виправити баг у його грі.", ru:"⭐⭐⭐⭐ Помоги однокласснику исправить баг." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 99 — Огляд Модуля 6
# Ця програма показує всі механіки що ти вивчив!
import pygame, sys, random, math, array
pygame.mixer.init(44100,-16,1,512)
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Модуль 6 — Огляд")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial",52,bold=True)
font = pygame.font.SysFont("Arial",26,bold=True)
font_sm = pygame.font.SysFont("Arial",18)
BG=(5,5,20); tick=0
stars=[{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":random.uniform(.2,.8)} for _ in range(100)]
particles=[]; shake=0; flash=0

def beep(f=440,d=0.06,v=0.2):
    n=int(44100*d); buf=array.array('h',[int(v*32767*math.sin(2*math.pi*f*i/44100))for i in range(n)])
    pygame.sndarray.make_sound(buf).play()

def explode(x,y):
    global shake, flash
    shake=15; flash=10
    for _ in range(16):
        particles.append({"x":float(x),"y":float(y),"vx":random.uniform(-6,6),"vy":random.uniform(-6,6),"life":35,"col":random.choice([(255,100,50),(255,200,0),(255,50,50)]),"sz":random.uniform(2,6)})
    beep(200,0.2)

SKILLS = [
    "🎮 Pygame: вікно, цикл, події",
    "🗺️ Стани гри: меню / пауза / gameover",
    "💾 Рекорд та збереження у файл (JSON)",
    "🔊 Звуки без файлів (array + math.sin)",
    "✨ Частинки, струс екрану, спалах",
    "👾 Клас Бос з HP-баром та AI",
    "🧩 Шутер / Ловець / Платформер / Змійка",
    "🎨 Власний персонаж pygame.draw",
    "🚀 Презентація гри батькам та друзям",
]

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE:
            explode(random.randint(100,W-100),random.randint(100,H-100))
    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["life"]-=1; p["sz"]=max(1,p["sz"]-0.1)
        if p["life"]<=0: particles.remove(p)
    ox=random.randint(-shake,shake)if shake>0 else 0; oy=random.randint(-shake,shake)if shake>0 else 0
    if shake>0: shake-=1
    gs=pygame.Surface((W,H)); gs.fill(BG)
    for s in stars:
        pygame.draw.circle(gs,(180,180,255),(int(s["x"]),int(s["y"])),1)
        s["y"]+=s["s"]; s["y"]%=H
    for p in particles: pygame.draw.circle(gs,p["col"],(int(p["x"]),int(p["y"])),int(p["sz"]))
    r=int(128+127*abs(math.sin(tick*0.02)))
    t=font_big.render("Модуль 6 Завершено!",True,(r,200,255-r)); gs.blit(t,t.get_rect(center=(W//2,45)))
    for i,skill in enumerate(SKILLS):
        col=(80+20*i,200-10*i,100+15*i)
        delay=i*8
        if tick>delay:
            alpha=min(255,int((tick-delay)*10))
            ts=font_sm.render(skill,True,col); gs.blit(ts,(80,95+i*48))
    tip=font_sm.render("SPACE — вибух частинок!",True,(255,200,0)); gs.blit(tip,tip.get_rect(center=(W//2,H-25)))
    screen.fill((0,0,0)); screen.blit(gs,(ox,oy))
    if flash>0:
        fl=pygame.Surface((W,H)); fl.set_alpha(flash*15); fl.fill((255,255,255)); screen.blit(fl,(0,0)); flash-=1
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 99,
        title: { uk: "Фінальна презентація Модуля 6! 🏆", ru: "Финальная презентация Модуля 6! 🏆" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 🏆 ВІТАННЯ!</h3><p>Ти завершив Модуль 6 — найбільший модуль курсу! Сьогодні — урочиста презентація.</p></div><div class="theory-block"><h3>🎓 Що сталось за цей модуль</h3><p>Ти пройшов шлях від простого вікна Pygame до повноцінної гри з:</p><ul><li>Меню, паузою, Game Over</li><li>Рекордами у файлі</li><li>Ефектами: частинки, звуки, струс</li><li>Власним персонажем та ворогами</li><li>Боссом з AI</li><li>Власним жанром та механікою</li></ul><p>Далі — Модуль 7: Великий Проект. Ти вже готовий!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 🏆 ПОЗДРАВЛЯЕМ!</h3><p>Ты завершил Модуль 6 — самый большой модуль курса! Сегодня — торжественная презентация.</p></div><div class="theory-block"><h3>🎓 Что произошло за этот модуль</h3><p>Ты прошёл путь от простого окна Pygame до полноценной игры с:</p><ul><li>Меню, паузой, Game Over</li><li>Рекордами в файле</li><li>Эффектами: частицы, звуки, тряска</li><li>Собственным персонажем и врагами</li><li>Боссом с ИИ</li><li>Собственным жанром и механикой</li></ul><p>Дальше — Модуль 7: Платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти свою фінальну гру і пограй 5 хвилин.", ru:"⭐ Запусти финальную игру и играй 5 минут." }},
          { num:2, level:"easy", text:{ uk:"⭐ Покажи гру батькам або другу. Запиши їх реакцію.", ru:"⭐ Покажи игру родителям. Запиши реакцию." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Переконайся що чек-ліст з уроку 97 виконаний на 100%.", ru:"⭐⭐ Чек-лист из урока 97 — 100%." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Зроби фінальний скріншот або відео своєї гри.", ru:"⭐⭐ Финальный скриншот или видео." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Напиши 5 речей що навчився у Модулі 6.", ru:"⭐⭐ Напиши 5 вещей из Модуля 6." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Придумай концепцію своєї гри для Модуля 7 (Великий Проект).", ru:"⭐⭐⭐ Концепция игры для Модуля 7." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Опублікуй гру на GitHub з README.md файлом.", ru:"⭐⭐⭐⭐ Опубликуй на GitHub с README.md." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Допоможи однокласнику завершити його гру. Ти вже pro!", ru:"⭐⭐⭐⭐ Помоги однокласснику. Ты уже pro!" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# 🏆 УРОК 100 — Фінальна презентація Модуля 6!
# ╔══════════════════════════════════════════════════════╗
# ║  МОЯ ФІНАЛЬНА ГРА                                   ║
# ║  Автор: [ТВОЄ ІМ'Я]                                 ║
# ║  Академія Мій комп'ютер ● Дніпро                    ║
# ║  Модуль 6: Моя Перша Гра — ЗАВЕРШЕНО!               ║
# ╚══════════════════════════════════════════════════════╝
import pygame, sys, random, math, array
pygame.mixer.init(44100,-16,1,512)
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("🏆 Моя Перша Гра — [Ім'я] | Академія Мій комп'ютер")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial",58,bold=True)
font = pygame.font.SysFont("Arial",28,bold=True)
font_sm = pygame.font.SysFont("Arial",20)
BG=(3,3,15); tick=0
stars=[{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":random.uniform(.15,1.0),"b":random.randint(100,255)} for _ in range(150)]
particles=[]; shake=0; flash=0; fireworks=[]

def beep(f=440,d=0.08,v=0.25):
    n=int(44100*d); buf=array.array('h',[int(v*32767*math.sin(2*math.pi*f*i/44100))for i in range(n)])
    pygame.sndarray.make_sound(buf).play()

def firework(x,y):
    col=[random.randint(150,255) for _ in range(3)]
    for _ in range(25):
        a=random.uniform(0,2*math.pi); s=random.uniform(2,8)
        particles.append({"x":float(x),"y":float(y),"vx":math.cos(a)*s,"vy":math.sin(a)*s,"life":random.randint(30,60),"col":tuple(col),"sz":random.uniform(2,5)})
    beep(random.choice([523,659,784,1047]),0.1,0.2)

fw_timer=0
CONGRATS = ["🎉 ВІТАННЯ!", "Ти пройшов Модуль 6!", "Ти зробив ВЛАСНУ ГРУ!", "Далі — Модуль 7!", "Ти справжній програміст!"]
congrats_idx=0; congrats_timer=0

while True:
    tick+=1; fw_timer+=1; congrats_timer+=1
    if fw_timer>=90: fw_timer=0; firework(random.randint(100,W-100),random.randint(80,H-150))
    if congrats_timer>=120: congrats_timer=0; congrats_idx=(congrats_idx+1)%len(CONGRATS)

    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            firework(random.randint(100,W-100),random.randint(80,H-150))
            flash=12; shake=8

    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.15; p["life"]-=1; p["sz"]=max(1,p["sz"]-0.05)
        if p["life"]<=0: particles.remove(p)

    ox=random.randint(-shake,shake)if shake>0 else 0; oy=random.randint(-shake,shake)if shake>0 else 0
    if shake>0: shake-=1
    gs=pygame.Surface((W,H)); gs.fill(BG)

    for s in stars:
        b=s["b"]; pygame.draw.circle(gs,(b,b,b),(int(s["x"]),int(s["y"])),1)
        s["y"]+=s["s"]; s["y"]%=H

    for p in particles: pygame.draw.circle(gs,p["col"],(int(p["x"]),int(p["y"])),max(1,int(p["sz"])))

    r=int(128+127*abs(math.sin(tick*0.02)))
    t0=font_big.render("МОДУЛЬ 6",True,(r,220,255-r)); gs.blit(t0,t0.get_rect(center=(W//2,80)))
    t1=font_big.render("ЗАВЕРШЕНО!",True,(255,r,100)); gs.blit(t1,t1.get_rect(center=(W//2,145)))

    cg=font.render(CONGRATS[congrats_idx],True,(255,220,80)); gs.blit(cg,cg.get_rect(center=(W//2,230)))

    badge_lines=["🏅 Ти вмієш:","Pygame від нуля до повної гри","Меню ● Рекорд ● Звуки ● Частинки","Власний персонаж ● Бос ● 4 жанри"]
    for i,bl in enumerate(badge_lines):
        col=(200+i*10,200-i*20,255-i*30); t=font_sm.render(bl,True,col); gs.blit(t,t.get_rect(center=(W//2,310+i*38)))

    tip=font_sm.render("Натисни будь-яку клавішу — феєрверк! 🎆",True,(180,180,255)); gs.blit(tip,tip.get_rect(center=(W//2,H-25)))
    acad=font_sm.render("Академія Мій комп'ютер ● Дніпро ● Python + Pygame",True,(100,100,160)); gs.blit(acad,acad.get_rect(center=(W//2,H-48)))

    screen.fill((0,0,0)); screen.blit(gs,(ox,oy))
    if flash>0:
        fl=pygame.Surface((W,H)); fl.set_alpha(flash*16); fl.fill((255,255,255)); screen.blit(fl,(0,0)); flash-=1
    pygame.display.flip(); clock.tick(60)
# ✅ ГОТОВО! Модуль 6 завершено!
`
      }
    ]
  },

  // ══════════════════════════════════════════════════════════
  //  МОДУЛЬ 7 — Великий Проект (уроки 101-115)
  // ══════════════════════════════════════════════════════════
  {
    moduleId: 7,
    moduleTitle: { uk: "Платформер", ru: "Платформер" },
    moduleIcon: "🏃",
    lessons: [
      {
        id: 100,
        title: { uk: "Гравітація та стрибки", ru: "Гравитация и прыжки" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Модуль 7 — Платформер! Тут буде гравітація, стрибки, платформи та монети.</p></div><div class="theory-block"><h3>📖 Гравітація в коді</h3><pre class="code-example">vy = 0          # вертикальна швидкість
GRAVITY = 0.5   # прискорення вниз

# Кожен кадр:
vy += GRAVITY   # гравітація тягне вниз
y  += vy        # рухаємось

# Підлога:
if y >= FLOOR:
    y = FLOOR
    vy = 0      # стоїмо

# Стрибок (тільки якщо на підлозі):
if on_ground and JUMP:
    vy = -12    # негативна → вгору</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Модуль 7 — Платформер! Гравитация, прыжки, платформы и монеты.<br>Что такое скорость vy и почему она увеличивается каждый кадр?</p></div><div class="theory-block"><h3>📖 Гравитация в коде</h3><pre class="code-example">vy = 0           # вертикальная скорость
GRAVITY = 0.5    # ускорение вниз

# Каждый кадр:
vy += GRAVITY    # скорость вниз растёт
y  += vy         # позиция меняется

# Земля:
if y >= FLOOR:
    y = FLOOR
    vy = 0

# Прыжок (только если на земле):
if on_ground:
    vy = -12     # импульс вверх</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Зроби щоб гравець падав вниз під дією гравітації.", ru:"⭐ Игрок падает вниз." }},
          { num:2, level:"easy", text:{ uk:"⭐ Гравець зупиняється на підлозі (не проходить крізь).", ru:"⭐ Игрок останавливается на полу." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Натискання SPACE — стрибок. Повторний стрибок у повітрі заборонений.", ru:"⭐⭐ SPACE — прыжок, без двойного прыжка." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй GRAVITY і силу стрибка щоб відчувалось \"правильно\".", ru:"⭐⭐ Настрой гравитацию и прыжок." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай анімацію: гравець стискається перед стрибком (squash).", ru:"⭐⭐ Анимация squash перед прыжком." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Подвійний стрибок: перший SPACE — стрибок, другий у повітрі — ще один.", ru:"⭐⭐⭐ Двойной прыжок." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Coyote time: можна стрибнути 0.1 сек після сходу з платформи.", ru:"⭐⭐⭐⭐ Coyote time: прыжок 0.1с после платформы." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Jump buffering: SPACE за 0.1 сек до приземлення — стрибок спрацьовує.", ru:"⭐⭐⭐⭐ Jump buffering." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 100 — Гравітація та стрибки
import pygame, sys, math
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Платформер — Гравітація")
clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",22,bold=True)

# ── НАЛАШТУВАННЯ ─────────────────────────
GRAVITY   = 0.55    # ← спробуй 0.3 або 0.8
JUMP_VEL  = -13.0   # ← спробуй -10 або -16
MAX_FALL  = 18      # максимальна швидкість падіння
PLAYER_SPD= 5
FLOOR     = H-60

# ── ГРАВЕЦЬ ──────────────────────────────
px,py=200.0,float(FLOOR-50); vx,vy=0.0,0.0
on_ground=False; jumps_left=2   # для подвійного стрибка
coyote=0; jump_buf=0            # advanced mechanics
tick=0; jump_count=0; max_h=py

BG=(15,20,40); GROUND_COL=(60,180,80)
PLAYER_COL=(80,200,255)

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE:
            jump_buf=8  # буфер 8 кадрів

    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  vx=-PLAYER_SPD
    elif keys[pygame.K_RIGHT]: vx=PLAYER_SPD
    else: vx*=0.8  # тертя

    # Coyote time: ще 6 кадрів після сходу з підлоги
    if on_ground: coyote=6
    elif coyote>0: coyote-=1

    # Стрибок з буфером
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground:
            vy=JUMP_VEL; coyote=0; jump_buf=0; jump_count+=1
            max_h=py  # починаємо рахувати висоту

    # Фізика
    vy=min(vy+GRAVITY,MAX_FALL)
    px+=vx; py+=vy
    px=max(20,min(W-20,px))

    # Підлога
    if py>=FLOOR-50:
        py=float(FLOOR-50); vy=0; on_ground=True
    else:
        on_ground=False
    max_h=min(max_h,py)

    # ── МАЛЮЄМО ──────────────────────────
    screen.fill(BG)
    # Зірки
    for i in range(30):
        pygame.draw.circle(screen,(100,100,160),(i*27%W,i*19%280),1)
    # Підлога
    pygame.draw.rect(screen,GROUND_COL,(0,FLOOR,W,H-FLOOR))
    pygame.draw.rect(screen,(80,220,100),(0,FLOOR,W,4))

    # Гравець (squash при приземленні, stretch у польоті)
    stretch=1.0
    if not on_ground:
        stretch=1.0+min(0.4,abs(vy)*0.03)*(1 if vy<0 else -0.5)
    w2=int(36/stretch); h2=int(36*stretch)
    col_var=int(80+min(80,abs(vy)*4))
    pygame.draw.rect(screen,(col_var,200,255),(int(px)-w2//2,int(py)-h2,w2,h2),border_radius=8)
    # Очі
    eye_y=int(py)-h2+8
    pygame.draw.circle(screen,(10,10,30),(int(px)-6,eye_y),5)
    pygame.draw.circle(screen,(10,10,30),(int(px)+6,eye_y),5)
    pygame.draw.circle(screen,(255,255,255),(int(px)-5,eye_y-1),2)
    pygame.draw.circle(screen,(255,255,255),(int(px)+7,eye_y-1),2)

    # HUD
    h_px=int(FLOOR-50-max_h)
    info=font.render(f"Стрибків: {jump_count}  Висота: {max_h//10}  vy={vy:.1f}  {'🟢 земля' if on_ground else '🌀 повітря'}",True,(255,255,255))
    screen.blit(info,(8,8))
    tip=pygame.font.SysFont("Arial",18).render("Стрілки=рух  SPACE=стрибок  (подвійний теж!)",True,(150,150,200))
    screen.blit(tip,(8,H-28))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 101,
        title: { uk: "Платформи та коллізії", ru: "Платформы и коллизии" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Гравітація є. Тепер додаємо платформи — горизонтальні поверхні в повітрі!</p></div><div class="theory-block"><h3>📖 Коллізія зверху</h3><pre class="code-example">def collide_top(player, platform, vy):
    px,py,pw,ph = player  # rect гравця
    lx,ly,lw,lh = platform
    # гравець перетинає платформу зверху?
    if (px+pw > lx and px < lx+lw  # по X
    and py+ph >= ly                  # низ гравця ≥ верх платформи
    and py+ph <= ly+lh+abs(vy)+2    # але не глибше
    and vy >= 0):                    # летить вниз
        return True
    return False</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Гравитация есть. Теперь добавляем платформы — горизонтальные поверхности в воздухе!<br>Как проверить что игрок приземлился именно СВЕРХУ на платформу?</p></div><div class="theory-block"><h3>📖 Коллизия сверху</h3><pre class="code-example">def collide_top(player, platform, vy):
    px,py,pw,ph = player
    lx,ly,lw,lh = platform
    # Пересечение по X:
    if px+pw > lx and px < lx+lw:
        # Игрок сверху и движется вниз:
        if py+ph >= ly and py+ph <= ly+lh+abs(vy)+2 and vy >= 0:
            return True
    return False</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Додай 3 платформи різної ширини на різній висоті.", ru:"⭐ Добавь 3 платформы разной ширины." }},
          { num:2, level:"easy", text:{ uk:"⭐ Гравець стоїть на платформах (не проходить крізь).", ru:"⭐ Игрок стоит на платформах." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Гравець падає крізь платформу знизу (тільки зверху зупиняє).", ru:"⭐⭐ Проходит снизу, стоит сверху." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Зроби 5 платформ що утворюють \"дорогу\" до верху екрану.", ru:"⭐⭐ 5 платформ — дорога вгору." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Платформи малюються з тінню (+2px темний прямокутник знизу).", ru:"⭐⭐ Платформы с тенью снизу." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Рухома платформа: їздить вліво-вправо, гравець рухається разом.", ru:"⭐⭐⭐ Движущаяся платформа." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Платформа що зникає через 1 сек після контакту.", ru:"⭐⭐⭐⭐ Платформа исчезает через 1 сек." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Пружна платформа: vy=-20 при ударі.", ru:"⭐⭐⭐⭐ Пружная платформа: vy=-20." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 101 — Платформи та коллізії
import pygame,sys,random
pygame.init()
W,H=800,550; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Платформи")
clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)

GRAVITY=0.55; JUMP=-13.0; SPEED=5; FLOOR=H-50
BG=(15,20,40)

# Платформи: [x, y, w, h, type]  type: normal/move/spring/fade
platforms=[
  {"r":pygame.Rect(0,FLOOR,W,50),"type":"ground","col":(60,180,80),"timer":0,"ox":0,"dx":0},
  {"r":pygame.Rect(100,380,140,18),"type":"normal","col":(120,90,50),"timer":0,"ox":100,"dx":0},
  {"r":pygame.Rect(300,300,120,18),"type":"normal","col":(120,90,50),"timer":0,"ox":300,"dx":0},
  {"r":pygame.Rect(480,220,160,18),"type":"move","col":(80,150,220),"timer":0,"ox":480,"dx":2},
  {"r":pygame.Rect(200,150,100,18),"type":"spring","col":(220,80,80),"timer":0,"ox":200,"dx":0},
  {"r":pygame.Rect(600,130,110,18),"type":"fade","col":(200,180,60),"timer":0,"ox":600,"dx":0},
  {"r":pygame.Rect(350,60, 120,18),"type":"normal","col":(120,90,50),"timer":0,"ox":350,"dx":0},
]

px,py=80.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0

while True:
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8

    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  vx=-SPEED
    elif keys[pygame.K_RIGHT]: vx=SPEED
    else: vx*=0.8

    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground:
            vy=JUMP; coyote=0; jump_buf=0

    vy=min(vy+GRAVITY,20); px+=vx; py+=vy
    px=max(16,min(W-16,px))
    on_ground=False

    # Оновлення рухомих платформ
    for p in platforms:
        if p["type"]=="move":
            p["r"].x+=p["dx"]
            if p["r"].right>W-20 or p["r"].left<20: p["dx"]*=-1

    # Коллізії
    pr=pygame.Rect(int(px)-16,int(py)-40,32,40)
    for p in platforms:
        r=p["r"]
        if pr.right>r.left and pr.left<r.right:
            bottom=pr.bottom; top_r=r.top
            if bottom>=top_r and bottom<=top_r+abs(vy)+4 and vy>=0:
                py=float(r.top-0.5); vy=0; on_ground=True
                if p["type"]=="spring": vy=-20
                if p["type"]=="fade": p["timer"]=min(p["timer"]+1,65)
            elif pr.top<r.bottom and pr.bottom>r.bottom and vy<0:
                vy=abs(vy)*0.3

    # Відновлення fade платформ
    for p in platforms:
        if p["type"]=="fade" and not on_ground: p["timer"]=max(0,p["timer"]-0.5)

    screen.fill(BG)
    # Зірки
    for i in range(25): pygame.draw.circle(screen,(80,80,140),(i*33%W,i*21%200),1)

    # Малюємо платформи
    for p in platforms:
        r=p["r"]; col=list(p["col"])
        if p["type"]=="fade":
            alpha=max(0,255-int(p["timer"]*3.9))
            col=[c*alpha//255 for c in col]
        pygame.draw.rect(screen,col,r,border_radius=4)
        if p["type"]!="ground":
            shadow=pygame.Rect(r.x+2,r.bottom,r.w,4)
            pygame.draw.rect(screen,(0,0,0,80),shadow,border_radius=2)
        if p["type"]=="move":
            t=font.render("→",True,(180,220,255)); screen.blit(t,(r.x+4,r.y-18))
        if p["type"]=="spring":
            t=font.render("🌀",True,(255,120,120)); screen.blit(t,(r.x+4,r.y-22))

    # Гравець
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    pygame.draw.circle(screen,(10,10,30),(pr.centerx-6,pr.top+10),4)
    pygame.draw.circle(screen,(10,10,30),(pr.centerx+6,pr.top+10),4)

    info=font.render(f"SPACE=стрибок  🔵рухома  🔴пружна  🟡зникає  {'🟢земля' if on_ground else '🌀повітря'}",True,(200,200,200))
    screen.blit(info,(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 102,
        title: { uk: "Рух та інерція гравця", ru: "Движение и инерция игрока" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Рух у платформерах — це не просто "натиснув кнопку → перемістився". Є інерція, прискорення, тертя!</p></div><div class="theory-block"><h3>📖 Відчуття руху</h3><pre class="code-example">ACC   = 0.8   # прискорення
FRIC  = 0.85  # тертя (0-1, ближче до 0 = більше тертя)
MAX_SPD = 7   # максимум

if KEY_RIGHT: vx+=ACC
if KEY_LEFT:  vx-=ACC
vx=max(-MAX_SPD, min(MAX_SPD, vx))  # clamp

if not KEY_LEFT and not KEY_RIGHT:
    vx*=FRIC  # гальмування

# Різне тертя в повітрі та на землі
fric = FRIC if on_ground else 0.96</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Движение в платформерах — не просто «нажал → переместился». Есть инерция, ускорение, трение!<br>Почему персонаж в Mario скользит после отпускания кнопки?</p></div><div class="theory-block"><h3>📖 Инерция и трение</h3><pre class="code-example">ACC     = 0.8    # ускорение при нажатии
MAX_SPD = 5.0    # максимальная скорость
FRIC    = 0.85   # трение (ближе к 0 — скользче)

if KEY_RIGHT: vx += ACC
if KEY_LEFT:  vx -= ACC

# Ограничение скорости:
vx = max(-MAX_SPD, min(MAX_SPD, vx))

# Трение — замедление без кнопки:
if not (KEY_LEFT or KEY_RIGHT):
    vx *= FRIC</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Додай прискорення: вх не стрибає до максимуму миттєво.", ru:"⭐ Ускорение: скорость нарастает плавно." }},
          { num:2, level:"easy", text:{ uk:"⭐ Тертя: гравець поступово зупиняється після відпускання кнопки.", ru:"⭐ Трение: плавное торможение." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Різне тертя на землі та у повітрі (повітря = менше контролю).", ru:"⭐⭐ Разное трение на земле и в воздухе." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Максимальна швидкість: vx не більше MAX_SPD.", ru:"⭐⭐ Ограничение максимальной скорости." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Нахил гравця вліво/вправо залежно від напрямку.", ru:"⭐⭐ Наклон в зависимости от направления." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Dash: подвійне натискання → короткий прискорений ривок.", ru:"⭐⭐⭐ Даш: двойное нажатие = рывок." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Wall slide: гравець повільно сповзає по стіні, може відштовхнутись.", ru:"⭐⭐⭐⭐ Wall slide и wall jump." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Порівняй feel гри при FRIC=0.7 та FRIC=0.95. Яке краще?", ru:"⭐⭐⭐⭐ Сравни FRIC=0.7 и FRIC=0.95." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 102 — Рух та інерція
import pygame,sys,math
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Інерція гравця")
clock=pygame.time.Clock(); font=pygame.font.SysFont("Arial",20,bold=True)

# ← ЗМІНЮЙ ЦІ ЗНАЧЕННЯ!
ACC=0.8; FRIC_GROUND=0.82; FRIC_AIR=0.96; MAX_SPD=7.0
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60

platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(150,350,200,18),
           pygame.Rect(450,260,180,18),pygame.Rect(250,180,160,18)]

px,py=100.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False
coyote=0; jump_buf=0; facing=1; dash_cd=0; dash_active=0
last_left=0; last_right=0; tick=0

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_LEFT:
                if tick-last_left<12 and dash_cd<=0: dash_active=10; vx=-15; dash_cd=45
                last_left=tick
            if ev.key==pygame.K_RIGHT:
                if tick-last_right<12 and dash_cd<=0: dash_active=10; vx=15; dash_cd=45
                last_right=tick

    if dash_cd>0: dash_cd-=1
    if dash_active>0: dash_active-=1

    keys=pygame.key.get_pressed()
    if dash_active<=0:
        if keys[pygame.K_RIGHT]: vx+=ACC; facing=1
        elif keys[pygame.K_LEFT]:  vx-=ACC; facing=-1
        fric=FRIC_GROUND if on_ground else FRIC_AIR
        if not keys[pygame.K_LEFT] and not keys[pygame.K_RIGHT]: vx*=fric
        vx=max(-MAX_SPD,min(MAX_SPD,vx))

    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0

    vy=min(vy+GRAVITY,20); px+=vx; py+=vy
    px=max(18,min(W-18,px)); on_ground=False

    pr=pygame.Rect(int(px)-17,int(py)-40,34,40)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right:
            if pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
                py=float(plt.top-0.5); vy=0; on_ground=True

    screen.fill((15,20,40))
    for i in range(20): pygame.draw.circle(screen,(80,80,140),(i*41%W,i*31%200),1)
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)

    # Гравець з нахилом
    tilt=int(vx*1.5)
    col=(255,160,60) if dash_active>0 else (80,200,255)
    pygame.draw.rect(screen,col,pr,border_radius=7)
    eye_x=pr.centerx+facing*6
    pygame.draw.circle(screen,(10,10,30),(eye_x,pr.top+10),5)

    # Спідометр
    bar_w=int(abs(vx)/MAX_SPD*120)
    pygame.draw.rect(screen,(40,40,60),(8,40,120,12),border_radius=4)
    pygame.draw.rect(screen,(255,120,0),(8,40,bar_w,12),border_radius=4)
    s=font.render(f"vx={vx:.1f} vy={vy:.1f}  {'🟢' if on_ground else '🌀'}  Подвійне ← або → = DASH",True,(200,200,200))
    screen.blit(s,(8,8))
    tip=pygame.font.SysFont("Arial",17).render(f"ACC={ACC} FRIC_GROUND={FRIC_GROUND} FRIC_AIR={FRIC_AIR} — змінюй у коді!",True,(150,150,200))
    screen.blit(tip,(8,H-25))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 103,
        title: { uk: "Скроллінг рівня", ru: "Скроллинг уровня" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Рівень більший за екран? Потрібен скроллінг — рухаємо "камеру"!</p></div><div class="theory-block"><h3>📖 Camera offset</h3><pre class="code-example"># Камера слідкує за гравцем
cam_x = player_x - W//2
cam_y = player_y - H//2

# Обмеження (не виходити за рівень)
cam_x = max(0, min(cam_x, LEVEL_W - W))
cam_y = max(0, min(cam_y, LEVEL_H - H))

# При малюванні — віднімаємо камеру
screen_x = world_x - cam_x
screen_y = world_y - cam_y
pygame.draw.rect(screen, col,
    (world_x - cam_x, world_y - cam_y, w, h))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Уровень больше экрана? Нужен скроллинг — двигаем «камеру»!<br>Что такое cam_x и зачем вычитать его при рисовании?</p></div><div class="theory-block"><h3>📖 Camera offset (камера)</h3><pre class="code-example"># Камера следит за игроком:
cam_x = player_x - W//2

# При рисовании: мировые → экранные координаты:
screen_x = world_x - cam_x

# Ограничение (не выходить за уровень):
cam_x = max(0, min(cam_x, WORLD_W - W))

# Рисовать объект:
pygame.draw.rect(screen, col, (obj.x - cam_x, obj.y, w, h))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Рівень 3000px шириною, камера слідкує за гравцем.", ru:"⭐ Уровень 3000px, камера за игроком." }},
          { num:2, level:"easy", text:{ uk:"⭐ Камера не виходить за межі рівня.", ru:"⭐ Камера не выходит за пределы уровня." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Плавне слідування: камера повільно доганяє гравця.", ru:"⭐⭐ Плавное следование камеры." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Паралакс-фон: хмари рухаються у 0.3× швидкості рівня.", ru:"⭐⭐ Параллакс: облака 0.3× скорости." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ HUD (рахунок, life) малюється БЕЗ зсуву камери.", ru:"⭐⭐ HUD без смещения камеры." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Вертикальний скроллінг: рівень вище 3 екранів.", ru:"⭐⭐⭐ Вертикальный скроллинг." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Dead zone: камера рухається лише коли гравець виходить за центр 200px.", ru:"⭐⭐⭐⭐ Dead zone 200px для камеры." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Shake ефект: камера трясеться при ударі.", ru:"⭐⭐⭐⭐ Shake эффект при ударе." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 103 — Скроллінг рівня (камера)
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Скроллінг")
clock=pygame.time.Clock(); font=pygame.font.SysFont("Arial",20,bold=True)

LEVEL_W=3200; LEVEL_H=H; GRAVITY=0.55; JUMP=-13.0; SPEED=5; FLOOR=H-60

# Платформи у WORLD координатах
platforms=[
  pygame.Rect(0,FLOOR,LEVEL_W,60),
  pygame.Rect(300,360,160,18),  pygame.Rect(600,290,140,18),
  pygame.Rect(850,220,120,18),  pygame.Rect(1100,300,180,18),
  pygame.Rect(1350,200,100,18), pygame.Rect(1600,320,200,18),
  pygame.Rect(1900,240,130,18), pygame.Rect(2100,160,150,18),
  pygame.Rect(2400,280,120,18), pygame.Rect(2650,200,140,18),
  pygame.Rect(2900,130,180,18), pygame.Rect(3050,300,100,18),
]
# Монети
coins=[{"x":r.x+r.w//2,"y":r.top-30,"got":False} for r in platforms[1:]]
coins+=[{"x":random.randint(200,LEVEL_W-200),"y":random.randint(100,FLOOR-80),"got":False} for _ in range(15)]

# Хмари (паралакс)
clouds=[{"x":random.uniform(0,LEVEL_W),"y":random.uniform(30,180),"w":random.randint(80,180)} for _ in range(18)]

px,py=100.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False
coyote=0; jump_buf=0; score=0; shake=0
cam_x=0.0; cam_y=0.0  # плавна камера

while True:
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8

    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,SPEED)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-SPEED)
    else: vx*=0.84

    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0

    vy=min(vy+GRAVITY,18); px+=vx; py+=vy
    px=max(18,min(LEVEL_W-18,px)); on_ground=False

    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right:
            if pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
                py=float(plt.top-0.5); vy=0; on_ground=True

    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<22:
            c["got"]=True; score+=10; shake=8

    # Плавна камера (lerp)
    target_x=px-W//2; target_y=py-H//2
    cam_x+=(target_x-cam_x)*0.1
    cam_y+=(target_y-cam_y)*0.1
    cam_x=max(0,min(cam_x,LEVEL_W-W))
    cam_y=max(0,min(cam_y,LEVEL_H-H))
    sx=int(cam_x)+(random.randint(-shake,shake) if shake>0 else 0)
    sy=int(cam_y); if shake>0: shake-=1

    # ── МАЛЮВАННЯ ──
    screen.fill((15,20,40))
    # Паралакс хмари
    for cl in clouds:
        cx=int(cl["x"]-sx*0.3)%W
        pygame.draw.ellipse(screen,(60,70,100),(cx,int(cl["y"]),cl["w"],28))
    # Платформи
    for plt in platforms:
        pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),(plt.x-sx,plt.y-sy,plt.w,plt.h),border_radius=4)
    # Монети
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(c["x"]-sx,c["y"]-sy),10)
    # Гравець
    pygame.draw.rect(screen,(80,200,255),(pr.x-sx,pr.y-sy,pr.w,pr.h),border_radius=7)
    # HUD (без зсуву)
    hud=font.render(f"Score:{score}  Монет:{sum(c['got'] for c in coins)}/{len(coins)}  X:{int(px)}",True,(255,255,255))
    screen.blit(hud,(8,8))
    # Прогрес рівня
    prog=int(px/LEVEL_W*(W-20))
    pygame.draw.rect(screen,(40,40,60),(10,H-20,W-20,10),border_radius=4)
    pygame.draw.rect(screen,(80,200,255),(10,H-20,prog,10),border_radius=4)
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 104,
        title: { uk: "Монети та предмети", ru: "Монеты и предметы" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Монети, зілля, зброя — без предметів платформер нецікавий!</p></div><div class="theory-block"><h3>📖 Системи предметів</h3><pre class="code-example">class Item:
    TYPES = {
        "coin":  {"col":(255,210,0),"pts":10,"r":10},
        "gem":   {"col":(180,80,255),"pts":50,"r":12},
        "hp":    {"col":(255,80,80), "pts":0,"r":12,"heal":1},
        "speed": {"col":(80,220,255),"pts":0,"r":11,"dur":300},
    }
    def __init__(self, x, y, itype="coin"):
        self.x,self.y=x,y; self.t=itype
        d=Item.TYPES[itype]
        self.col=d["col"]; self.r=d["r"]; self.pts=d["pts"]
        self.bob=random.uniform(0,6.28)  # фаза гойдання

    def draw(self, surf, tick, cam_x=0):
        y=self.y+math.sin(tick*0.06+self.bob)*4
        pygame.draw.circle(surf,self.col,(self.x-cam_x,int(y)),self.r)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Монеты, зелья, оружие — без предметов платформер неинтересный!<br>Как хранить разные типы предметов в одном списке?</p></div><div class="theory-block"><h3>📖 Система предметов</h3><pre class="code-example">class Item:
    TYPES = {
        "coin": {"col":(255,210,0), "pts":10, "r":10},
        "gem":  {"col":(180,50,230), "pts":50, "r":8},
    }
    def __init__(self, x, y, itype="coin"):
        self.x = x; self.y = y
        self.itype = itype
        self.collected = False

# Проверка сбора:
for item in items:
    d = ((player.x-item.x)**2+(player.y-item.y)**2)**0.5
    if not item.collected and d < 20:
        score += Item.TYPES[item.itype]["pts"]
        item.collected = True</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Монети гойдаються вгору-вниз (sin анімація).", ru:"⭐ Монеты покачиваются (sin)." }},
          { num:2, level:"easy", text:{ uk:"⭐ Збирання монети: +10 очок, монета зникає.", ru:"⭐ Подбор монеты: +10 очков." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Gem (діамант): +50 очок, рідкісний предмет.", ru:"⭐⭐ Gem: +50 очков." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Аптечка: +1 HP (максимум 3).", ru:"⭐⭐ Аптечка: +1 HP." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Speed boost: 5 сек подвоєна швидкість.", ru:"⭐⭐ Speed boost: 5 сек двойная скорость." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Ефект збирання: 8 частинок розлітаються від місця підбору.", ru:"⭐⭐⭐ Эффект подбора: 8 частиц." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Магніт: гравець притягує монети у радіусі 80px.", ru:"⭐⭐⭐⭐ Магнит: монеты притягиваются." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Мультиплікатор: комбо x2, x3 при збиранні без торкання землі.", ru:"⭐⭐⭐⭐ Мультипликатор комбо x2 x3." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 104 — Монети та предмети
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Монети та предмети")
clock=pygame.time.Clock(); font=pygame.font.SysFont("Arial",20,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
ITEM_TYPES={
    "coin": {"col":(255,210,0),"r":10,"pts":10,"msg":"+10"},
    "gem":  {"col":(180,80,255),"r":13,"pts":50,"msg":"+50 💎"},
    "hp":   {"col":(255,80,100),"r":12,"pts":0, "msg":"+HP ❤️"},
    "speed":{"col":(80,220,255),"r":11,"pts":0, "msg":"SPEED⚡"},
}
class Item:
    def __init__(self,x,y,t="coin"):
        self.x=float(x); self.y=float(y); self.t=t
        self.bob=random.uniform(0,6.28); self.alive=True
    def draw(self,surf,tick,cx=0):
        if not self.alive: return
        d=ITEM_TYPES[self.t]; oy=math.sin(tick*0.06+self.bob)*4
        pygame.draw.circle(surf,d["col"],(int(self.x-cx),int(self.y+oy)),d["r"])
        if self.t=="gem":
            pygame.draw.circle(surf,(220,160,255),(int(self.x-cx),int(self.y+oy)),d["r"],2)
        if self.t=="hp":
            tf=pygame.font.SysFont("Arial",16); t=tf.render("❤",True,(255,255,255))
            surf.blit(t,(int(self.x-cx)-7,int(self.y+oy)-8))

platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(150,360,150,18),
           pygame.Rect(380,280,140,18),pygame.Rect(580,200,120,18),pygame.Rect(300,150,180,18)]
items=[Item(200,340,"coin"),Item(300,340,"coin"),Item(420,260,"gem"),
       Item(480,260,"coin"),Item(610,180,"hp"),Item(350,130,"speed"),
       Item(150,FLOOR-30,"coin"),Item(550,FLOOR-30,"coin"),Item(700,FLOOR-30,"coin")]

px,py=100.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False
coyote=0; jump_buf=0; score=0; hp=3; speed_t=0; combo=0; combo_timer=0
particles=[]; popups=[]; tick=0

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    spd=8 if speed_t>0 else 5; if speed_t>0: speed_t-=1
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,spd)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-spd)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy
    px=max(18,min(W-18,px)); on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right:
            if pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
                py=float(plt.top-0.5); vy=0; on_ground=True; combo=0

    if combo_timer>0: combo_timer-=1
    else: combo=0
    for it in items:
        if it.alive and abs(px-it.x)<20 and abs(py-it.y)<30:
            d=ITEM_TYPES[it.t]; it.alive=False
            if it.t=="coin" or it.t=="gem":
                combo+=1; combo_timer=90; pts=d["pts"]*max(1,combo//3+1)
                score+=pts; popups.append({"x":it.x,"y":it.y,"txt":f"+{pts}","life":40})
            elif it.t=="hp": hp=min(3,hp+1); popups.append({"x":it.x,"y":it.y,"txt":"+HP","life":40})
            elif it.t=="speed": speed_t=300; popups.append({"x":it.x,"y":it.y,"txt":"SPEED!","life":40})
            for _ in range(8):
                particles.append({"x":it.x,"y":it.y,"vx":random.uniform(-5,5),
                    "vy":random.uniform(-6,1),"life":25,"col":d["col"]})
    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.3; p["life"]-=1
        if p["life"]<=0: particles.remove(p)
    for p in popups[:]:
        p["y"]-=0.8; p["life"]-=1
        if p["life"]<=0: popups.remove(p)

    screen.fill((15,20,40))
    for i in range(20): pygame.draw.circle(screen,(80,80,140),(i*43%W,i*31%200),1)
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for p in particles: pygame.draw.circle(screen,p["col"],(int(p["x"]),int(p["y"])),3)
    for it in items: it.draw(screen,tick)
    pygame.draw.rect(screen,(80,speed_t>0 and 255 or 200,255),pr,border_radius=7)
    for p in popups:
        t=font.render(p["txt"],True,(255,220,0)); screen.blit(t,t.get_rect(center=(int(p["x"]),int(p["y"]))))
    hud=font.render(f"Score:{score}  HP:{'❤'*hp}{'🖤'*(3-hp)}  Комбо:x{combo}  {'⚡SPEED!' if speed_t>0 else ''}",True,(255,255,255))
    screen.blit(hud,(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 105,
        title: { uk: "Вороги-піксельники", ru: "Враги-пиксели" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Платформер без ворогів — це просто стрибалка. Додаємо перешкоди!</p></div><div class="theory-block"><h3>📖 Типи платформерних ворогів</h3><ul><li>🟥 <b>Ходок</b>: ходить вперед-назад по платформі, розворот на краю</li><li>🟧 <b>Стрибун</b>: стрибає вгору коли гравець близько</li><li>🟦 <b>Літун</b>: летить синусоїдою або до гравця</li></ul><pre class="code-example"># Розворот на краю платформи
if enemy_x <= plat_left or enemy_x >= plat_right:
    enemy_dx *= -1  # розворот</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Платформер без врагов — это просто прыгалка. Добавляем препятствия!<br>Какие типы врагов бывают в платформерах?</p></div><div class="theory-block"><h3>📖 Типы врагов-пикселников</h3><ul><li>🟥 <b>Ходок</b>: ходит по платформе, разворот на краю</li><li>🟧 <b>Прыгун</b>: прыгает когда игрок рядом</li><li>🟨 <b>Стрелок</b>: стреляет снарядами с задержкой</li></ul><pre class="code-example"># Ходок — разворот на краю платформы:
if enemy.x <= plat_left or enemy.x >= plat_right:
    enemy.dx *= -1

# Прыгун — прыжок когда игрок рядом:
if abs(enemy.x - player.x) < 100 and on_ground:
    enemy.vy = -10  # прыжок вверх</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Ворог ходить вперед-назад по платформі.", ru:"⭐ Враг ходит туда-сюда." }},
          { num:2, level:"easy", text:{ uk:"⭐ При торканні ворога гравець втрачає HP.", ru:"⭐ Касание врага = потеря HP." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Гравець топче ворога (стрибок зверху = вбивство).", ru:"⭐⭐ Прыжок сверху = убийство врага." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Ворог на краю платформи розвертається.", ru:"⭐⭐ Разворот на краю платформы." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Три типи ворогів: ходок, стрибун, літун.", ru:"⭐⭐ Три типа врагов." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Стрибун: слідкує за гравцем по X, стрибає коли близько.", ru:"⭐⭐⭐ Прыгун следит за игроком." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Ворог має HP: 3 стрибки щоб вбити \"боса\".", ru:"⭐⭐⭐⭐ HP у врага: 3 прыжка для убийства." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбитий ворог залишає монету.", ru:"⭐⭐⭐⭐ Убитый враг оставляет монету." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 105 — Вороги-піксельники
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Вороги")
clock=pygame.time.Clock(); font=pygame.font.SysFont("Arial",20,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60

platforms=[
  pygame.Rect(0,FLOOR,W,60),     pygame.Rect(100,360,200,18),
  pygame.Rect(350,280,180,18),   pygame.Rect(580,200,160,18),
  pygame.Rect(250,160,140,18),
]

class Enemy:
    def __init__(self,x,y,plat,etype="walker"):
        self.x=float(x); self.y=float(y); self.vy=0.0
        self.plat=plat; self.etype=etype; self.hp=1; self.alive=True
        self.dx=2 if etype!="flyer" else 0; self.timer=0
        self.w,self.h=32,32; self.iframes=0
    def update(self,px,py):
        self.timer+=1; self.iframes=max(0,self.iframes-1)
        if self.etype=="walker":
            self.x+=self.dx
            if self.x<=self.plat.left+16 or self.x>=self.plat.right-16: self.dx*=-1
            self.y=float(self.plat.top-self.h//2)
        elif self.etype=="jumper":
            self.vy=min(self.vy+GRAVITY,18); self.y+=self.vy
            if self.y>=self.plat.top-self.h//2: self.y=float(self.plat.top-self.h//2); self.vy=0
            if abs(px-self.x)<180 and self.vy==0 and self.timer%60<5: self.vy=-11
            if self.x<px: self.x=min(self.x+1.5,px)
            elif self.x>px: self.x=max(self.x-1.5,px)
        elif self.etype=="flyer":
            self.x+=math.sin(self.timer*0.04)*2+(px>self.x and 1 or -1)*0.8
            self.y=float(self.plat.top-80+math.sin(self.timer*0.06)*30)
    def rect(self):
        return pygame.Rect(int(self.x)-self.w//2,int(self.y)-self.h//2,self.w,self.h)
    def draw(self,surf):
        if not self.alive: return
        cols={"walker":(220,60,60),"jumper":(220,140,60),"flyer":(100,80,220)}
        col=cols[self.etype]; r=self.rect()
        if self.iframes>0 and self.iframes%4<2: return
        pygame.draw.rect(surf,col,r,border_radius=6)
        ey=r.top+10; ex=r.centerx+(-1 if self.dx<0 else 1)*6
        pygame.draw.circle(surf,(255,255,255),(ex,ey),5)
        pygame.draw.circle(surf,(10,10,30),(ex+1,ey),3)
        if self.hp>1:
            for i in range(self.hp):
                pygame.draw.rect(surf,(255,80,80),(r.x+i*12,r.top-10,10,6),border_radius=3)

enemies=[Enemy(180,0,platforms[1],"walker"),Enemy(440,0,platforms[2],"jumper"),
         Enemy(670,0,platforms[3],"flyer"),Enemy(320,0,platforms[4],"walker")]
enemies[2].hp=3  # боса

px,py=60.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
hp=3; score=0; iframes=0; particles=[]; tick=0

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy
    px=max(18,min(W-18,px)); on_ground=False; iframes=max(0,iframes-1)
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right:
            if pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
                py=float(plt.top-0.5); vy=0; on_ground=True
    for e in enemies:
        e.update(px,py)
        if not e.alive: continue
        er=e.rect()
        if pr.colliderect(er):
            if vy>0 and pr.bottom<er.centery+10 and e.iframes==0:
                e.hp-=1; e.iframes=30; vy=JUMP*0.7
                if e.hp<=0:
                    e.alive=False; score+=20
                    for _ in range(10): particles.append({"x":e.x,"y":e.y,"vx":random.uniform(-5,5),"vy":random.uniform(-5,0),"life":30,"col":e.rect() and (220,60,60)})
            elif iframes==0:
                hp=max(0,hp-1); iframes=90
                vx=-vx; vy=-8
    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.3; p["life"]-=1
        if p["life"]<=0: particles.remove(p)

    screen.fill((15,20,40))
    for i in range(20): pygame.draw.circle(screen,(80,80,140),(i*43%W,i*31%200),1)
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for p in particles: pygame.draw.circle(screen,p["col"],(int(p["x"]),int(p["y"])),3)
    for e in enemies: e.draw(screen)
    col=(255,80,80) if iframes>0 and iframes%6<3 else (80,200,255)
    pygame.draw.rect(screen,col,pr,border_radius=7)
    hud=font.render(f"HP:{'❤'*hp}{'🖤'*(3-hp)}  Score:{score}  Стрибок зверху = вбити!",True,(255,255,255))
    screen.blit(hud,(8,8))
    if hp<=0:
        t=font.render("GAME OVER — R щоб знову",True,(255,80,80)); screen.blit(t,t.get_rect(center=(W//2,H//2)))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 106,
        title: { uk: "Рівні та двері", ru: "Уровни и двери" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Рівні та двері</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Уровни и двери</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Намалюй двері (зелений прямокутник) у кінці рівня.", ru:"⭐ Нарисуй дверь в конце уровня." }},
          { num:2, level:"easy", text:{ uk:"⭐ При торканні дверей — повідомлення \"Рівень пройдено!\".", ru:"⭐ При касании дверей — \"Уровень пройден!\"" }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Зроби 3 рівні з різним розташуванням платформ.", ru:"⭐⭐ Сделай 3 уровня с разными платформами." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Гравець стартує з лівого краю на кожному новому рівні.", ru:"⭐⭐ Игрок стартует слева на каждом уровне." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Двері анімовані: зірка обертається над ними.", ru:"⭐⭐ Над дверью вращается звезда." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Двері відчиняються тільки після збирання всіх монет.", ru:"⭐⭐⭐ Дверь открывается только после сбора монет." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Екран переходу між рівнями з анімацією на 2 сек.", ru:"⭐⭐⭐⭐ Экран перехода с анимацией 2 сек." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Рахунок зберігається між рівнями.", ru:"⭐⭐⭐⭐ Счёт сохраняется между уровнями." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 106 — Рівні та двері
import pygame,sys,math
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Рівні та двері"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",22,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60

LEVEL_DATA=[
  [pygame.Rect(0,FLOOR,800,60),pygame.Rect(150,350,140,18),pygame.Rect(380,270,120,18),pygame.Rect(580,190,140,18)],
  [pygame.Rect(0,FLOOR,800,60),pygame.Rect(80,390,100,18),pygame.Rect(300,310,130,18),pygame.Rect(520,220,90,18),pygame.Rect(660,150,110,18)],
  [pygame.Rect(0,FLOOR,800,60),pygame.Rect(200,400,80,18),pygame.Rect(380,320,80,18),pygame.Rect(540,240,80,18),pygame.Rect(680,160,100,18)],
]
LEVEL_COLS=[(15,25,50),(25,15,40),(10,30,20)]

def load_level(n):
    global platforms,door,px,py,coins,all_ok
    platforms=LEVEL_DATA[n]
    last=platforms[-1]; door=pygame.Rect(last.x+last.w//2-20,last.y-80,36,72)
    px=60.0; py=float(FLOOR-50)
    coins=[{"x":float(p.x+p.w//2),"y":float(p.y-24),"got":False} for p in platforms[1:]]
    all_ok=False

level_num=0; load_level(0)
vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0; score=0; tick=0; trans=0

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    if trans>0:
        trans-=1; screen.fill((0,0,0))
        screen.blit(font.render(f"РІВЕНЬ {level_num+1}!",True,(255,220,60)),font.render(f"РІВЕНЬ {level_num+1}!",True,(0,0,0)).get_rect(center=(W//2,H//2)))
        pygame.display.flip(); clock.tick(60); continue
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.85
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    for c in coins:
        if not c["got"] and abs(px-c["x"])<20 and abs(py-c["y"])<24: c["got"]=True; score+=10
    all_ok=all(c["got"] for c in coins)
    if pr.colliderect(door) and all_ok:
        if level_num<len(LEVEL_DATA)-1: level_num+=1; load_level(level_num); trans=80
        else: score+=100
    screen.fill(LEVEL_COLS[level_num])
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),10)
    dcol=(80,220,100) if all_ok else (60,60,60)
    pygame.draw.rect(screen,dcol,door,border_radius=4)
    angle=tick*0.05; sx=door.centerx+int(math.cos(angle)*14); sy=door.top-20+int(math.sin(angle)*8)
    pygame.draw.circle(screen,(255,220,0),(sx,sy),7)
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    need=sum(1 for c in coins if not c["got"])
    screen.blit(font.render(f"Рівень {level_num+1}/3  Score:{score}  {'✅' if all_ok else f'{need} монет лишилось'}",True,(255,255,255)),(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 107,
        title: { uk: "Анімація персонажа", ru: "Анимация персонажа" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Анімація персонажа</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Анимация персонажа</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Squash тіла при приземленні (2 кадри).", ru:"⭐ Squash тела при приземлении." }},
          { num:2, level:"easy", text:{ uk:"⭐ Stretch при стрибку вгору.", ru:"⭐ Stretch при прыжке вверх." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Ноги рухаються при бігу (sin анімація).", ru:"⭐⭐ Ноги двигаются при беге." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Очі дивляться у напрямку руху.", ru:"⭐⭐ Глаза смотрят в сторону движения." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Хвіст або шарф тягнеться за гравцем.", ru:"⭐⭐ Хвост тянется за персонажем." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Пилові частинки при приземленні.", ru:"⭐⭐⭐ Частицы пыли при приземлении." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Емоції: посмішка при монеті, страх при падінні.", ru:"⭐⭐⭐⭐ Эмоции: улыбка и страх." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй анімацію у свій платформер.", ru:"⭐⭐⭐⭐ Встрой анимацию в платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 107 — Анімація персонажа (без зображень)
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Анімація персонажа"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(160,360,150,18),pygame.Rect(400,275,130,18),pygame.Rect(600,190,140,18)]
TRAIL_LEN=8; trail=[]

def draw_player(surf,cx,cy,vx,vy,on_ground,frame,emotion=None):
    if not on_ground and vy<0: sw,sh=0.85,1.25
    elif not on_ground and vy>5: sw,sh=0.9,1.15
    else: sw,sh=1.0,1.0
    w,h=int(30*sw),int(30*sh); facing=1 if vx>=0 else -1
    body=pygame.Rect(cx-w//2,cy-h,w,h)
    pygame.draw.rect(surf,(80,180,255),body,border_radius=6)
    if on_ground and abs(vx)>1:
        la=math.sin(frame*0.25)*25
        for side,ang in [(1,la),(-1,-la)]:
            lx=cx+side*6; ly=cy
            ex=lx+int(math.sin(math.radians(ang))*16)
            ey=ly+int(math.cos(math.radians(ang))*16)
            pygame.draw.line(surf,(60,140,200),(lx,ly),(ex,ey),4)
            pygame.draw.circle(surf,(60,140,200),(ex,ey),5)
    eo=facing*7
    for ox in [eo-4,eo+4]:
        pygame.draw.circle(surf,(10,10,30),(cx+ox,cy-h+8),5)
        pygame.draw.circle(surf,(255,255,255),(cx+ox+1,cy-h+7),2)
    mx,my=cx,cy-h+18
    if emotion=="happy": pygame.draw.arc(surf,(255,50,50),pygame.Rect(mx-7,my-5,14,10),math.pi,2*math.pi,2)
    elif emotion=="scared": pygame.draw.ellipse(surf,(30,30,30),(mx-4,my-4,8,8))
    else: pygame.draw.line(surf,(20,20,50),(mx-5,my),(mx+5,my),2)

px,py=80.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
frame=0; particles=[]; emotion=None; emotion_t=0
coins=[{"x":280.0,"y":340.0,"got":False},{"x":530.0,"y":255.0,"got":False}]; score=0
was_ground=True

while True:
    frame+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px))
    prev_g=on_ground; on_ground=False
    pr=pygame.Rect(int(px)-15,int(py)-30,30,30)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    if on_ground and not prev_g:
        for _ in range(5): particles.append({"x":px+random.uniform(-15,15),"y":py,"vx":random.uniform(-3,3),"vy":random.uniform(-3,0),"life":20})
    for c in coins:
        if not c["got"] and abs(px-c["x"])<20 and abs(py-c["y"])<25: c["got"]=True; score+=10; emotion="happy"; emotion_t=40
    if vy>12: emotion="scared"; emotion_t=10
    if emotion_t>0: emotion_t-=1
    else: emotion=None
    trail.append((int(px),int(py))); trail=trail[-TRAIL_LEN:]
    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.2; p["life"]-=1
        if p["life"]<=0: particles.remove(p)
    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for i,pos in enumerate(trail[:-1]):
        a=int(60*i/TRAIL_LEN); pygame.draw.circle(screen,(a,a+80,a+120),pos,3+i//3)
    for p in particles: pygame.draw.circle(screen,(180,160,120),(int(p["x"]),int(p["y"])),3)
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),12)
    draw_player(screen,int(px),int(py),vx,vy,on_ground,frame,emotion)
    screen.blit(font.render(f"Score:{score}  SPACE=стрибок  Squash•Stretch•Хвіст•Емоції",True,(180,180,220)),(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 108,
        title: { uk: "Звуки та музика", ru: "Звуки и музыка" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Звуки та музика</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Звуки и музыка</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код та опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр (колір, швидкість, розмір) і поясни результат.", ru:"⭐ Измени 1 параметр и объясни результат." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай звуки у власний платформер.", ru:"⭐⭐ Добавь звуки в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй параметри для кращого ігрового досвіду.", ru:"⭐⭐ Настрой параметры для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант механіки з цього уроку.", ru:"⭐⭐ Добавь ещё один вариант механики из урока." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай механіку з попередніми уроками (монети, вороги або платформи).", ru:"⭐⭐⭐ Совмести механику с предыдущими уроками." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай оригінальну деталь — придумай сам!", ru:"⭐⭐⭐⭐ Добавь оригинальную деталь — придумай сам!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Запиши скриншот або відео своєї гри і покажи друзям.", ru:"⭐⭐⭐⭐ Сделай скриншот и покажи друзьям." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 108 — Звуки та музика (процедурна генерація)
import pygame,sys,math,array,random
pygame.mixer.init(44100,-16,1,512); pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Звуки у платформері"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)

def make_snd(freq=440,dur=0.1,vol=0.3,kind="sine"):
    n=int(44100*dur); buf=array.array('h')
    for i in range(n):
        t=i/44100; env=max(0.0,1.0-i/n)
        if kind=="sine": v=math.sin(2*math.pi*freq*t)
        elif kind=="square": v=1.0 if math.sin(2*math.pi*freq*t)>0 else -1.0
        elif kind=="saw": v=2*(t*freq%1)-1
        buf.append(int(v*env*vol*32767))
    return pygame.sndarray.make_sound(buf)

snd_jump =make_snd(523,0.12,0.3,"sine")
snd_coin =make_snd(1047,0.07,0.25,"sine")
snd_land =make_snd(110,0.08,0.4,"square")
snd_die  =make_snd(220,0.3,0.3,"saw")
snd_step =make_snd(180,0.04,0.15,"square")
MELODY=[262,330,392,330,262,294,330,262]
mel_snds=[make_snd(f,0.2,0.15,"sine") for f in MELODY]
mel_idx=0; mel_timer=0; muted=False
def play(s):
    if not muted: s.play()

GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(120,360,140,18),pygame.Rect(380,280,120,18),pygame.Rect(580,200,140,18)]
coins=[{"x":200.0,"y":340.0,"got":False},{"x":440.0,"y":260.0,"got":False},{"x":650.0,"y":180.0,"got":False}]
spikes=[pygame.Rect(260,FLOOR-12,40,12),pygame.Rect(470,FLOOR-12,40,12)]
px,py=80.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
was_ground=False; score=0; alive=True; step_t=0; sound_log=[]

while True:
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_m: muted=not muted
            if ev.key==pygame.K_r: px,py=80.0,float(FLOOR-50); vx=vy=0; alive=True; sound_log=[]
    if not alive:
        screen.fill((20,5,5)); screen.blit(font.render("💀 R — знову",True,(255,80,80)),(W//2-80,H//2))
        pygame.display.flip(); clock.tick(60); continue
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0; play(snd_jump); sound_log.append("⬆")
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px))
    prev_g=on_ground; on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    if on_ground and not prev_g: play(snd_land); sound_log.append("💥")
    if on_ground and abs(vx)>2:
        step_t+=1
        if step_t%12==0: play(snd_step); sound_log.append("👟")
    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<28: c["got"]=True; score+=10; play(snd_coin); sound_log.append("🪙")
    for sp in spikes:
        if pr.colliderect(sp): alive=False; play(snd_die); sound_log.append("💀")
    mel_timer+=1
    if mel_timer>=40: mel_timer=0; play(mel_snds[mel_idx%len(mel_snds)]); mel_idx+=1
    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for sp in spikes:
        for i in range(4): pygame.draw.polygon(screen,(200,60,60),[(sp.x+i*10,sp.bottom),(sp.x+i*10+5,sp.top),(sp.x+i*10+10,sp.bottom)])
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),12)
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    screen.blit(font.render(f"Score:{score}  {'🔇' if muted else '🔊'}  M=mute  R=restart",True,(255,255,255)),(8,8))
    screen.blit(font.render(" ".join(sound_log[-6:]),True,(180,220,180)),(8,H-30))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 109,
        title: { uk: "Збереження рекорду", ru: "Сохранение рекорда" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Збереження рекорду</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Сохранение рекорда</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Зберігай рекорд у файл при game over.", ru:"⭐ Сохраняй рекорд в файл при game over." }},
          { num:2, level:"easy", text:{ uk:"⭐ Завантажуй рекорд при старті.", ru:"⭐ Загружай рекорд при старте." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Зберігай рекорд і найкращий рівень.", ru:"⭐⭐ Сохраняй рекорд и лучший уровень." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Показуй \"Новий рекорд!\" якщо побив попередній.", ru:"⭐⭐ Показывай \"Новый рекорд!\" если побил предыдущий." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Клавіша DEL — скидання рекорду.", ru:"⭐⭐ DEL — сброс рекорда." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Топ-5 результатів зберігаються у файл.", ru:"⭐⭐⭐ Топ-5 результатов сохраняются в файл." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Автозбереження кожні 30 секунд.", ru:"⭐⭐⭐⭐ Автосохранение каждые 30 сек." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй збереження у свій платформер.", ru:"⭐⭐⭐⭐ Встрой сохранение в платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 109 — Збереження рекорду
import pygame,sys,math,random,json
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Рекорди"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",22,bold=True); font_sm=pygame.font.SysFont("Arial",18)
SAVE_FILE="plat_records.json"

def load_rec():
    try:
        with open(SAVE_FILE,"r",encoding="utf-8") as f: return json.load(f)
    except: return {"best":0,"plays":0,"top5":[]}
def save_rec(r):
    with open(SAVE_FILE,"w",encoding="utf-8") as f: json.dump(r,f,ensure_ascii=False,indent=2)

records=load_rec()
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(120,370,140,18),pygame.Rect(370,290,120,18),pygame.Rect(580,200,130,18)]
coins_start=[(200,350),(260,350),(430,268),(490,268),(640,178),(700,178)]

def reset():
    global px,py,vx,vy,on_ground,coyote,jump_buf,score,alive,coins
    px,py=80.0,float(FLOOR-50); vx=vy=0; on_ground=False; coyote=jump_buf=0; score=0; alive=True
    coins=[{"x":float(x),"y":float(y),"got":False} for x,y in coins_start]
reset(); auto_t=0; confirm_del=False; new_record=False

while True:
    auto_t+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT:
            if score>records["best"]: records["best"]=score; save_rec(records)
            pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_r and not alive: reset(); new_record=False
            if ev.key==pygame.K_DELETE:
                if confirm_del: records={"best":0,"plays":0,"top5":[]}; save_rec(records); confirm_del=False
                else: confirm_del=True
            else: confirm_del=False
    if alive:
        keys=pygame.key.get_pressed()
        if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
        elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
        else: vx*=0.84
        if on_ground: coyote=6
        elif coyote>0: coyote-=1
        if jump_buf>0:
            jump_buf-=1
            if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
        vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False
        pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
        for plt in platforms:
            if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
                py=float(plt.top-0.5); vy=0; on_ground=True
        if py>H+50: alive=False
        for c in coins:
            if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26: c["got"]=True; score+=10
        if auto_t%1800==0:
            if score>records["best"]: records["best"]=score; save_rec(records)
    else:
        records["plays"]+=1
        new_record=score>records["best"]
        if new_record: records["best"]=score
        top5=records.get("top5",[]); top5.append(score); top5.sort(reverse=True); records["top5"]=top5[:5]
        save_rec(records)
        alive=False
    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),12)
    if alive:
        pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
        pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    screen.blit(font.render(f"Score:{score}  Рекорд:{records['best']}  Ігор:{records['plays']}",True,(255,255,255)),(8,8))
    t5=" | ".join(str(s) for s in records.get("top5",[])); screen.blit(font_sm.render(f"Top5: {t5}",True,(180,200,180)),(8,38))
    if not alive:
        pygame.draw.rect(screen,(0,0,0),(W//2-200,H//2-55,400,110),border_radius=10)
        screen.blit(font.render(f"{'🏆 НОВИЙ РЕКОРД!' if new_record else 'GAME OVER'}  Score:{score}",True,(255,220,60) if new_record else (255,80,80)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2-20)))
        screen.blit(font_sm.render("R=знову  DEL(2x)=скинути рекорд",True,(200,200,200)),font_sm.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2+25)))
    if confirm_del: screen.blit(font.render("⚠️ DEL ще раз = СКИНУТИ!",True,(255,200,0)),(W//2-150,H//2+60))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 110,
        title: { uk: "Меню та пауза", ru: "Меню и пауза" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Меню та пауза</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Меню и пауза</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Головне меню: назва гри і \"SPACE — грати\".", ru:"⭐ Главное меню с SPACE." }},
          { num:2, level:"easy", text:{ uk:"⭐ Пауза (P): зупиняє гру і показує \"ПАУЗА\".", ru:"⭐ Пауза P." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Game over екран із рахунком.", ru:"⭐⭐ Game over с счётом." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Win екран: \"ВСІ МОНЕТИ ЗІБРАНО!\".", ru:"⭐⭐ Win экран." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Меню з 3 пунктами і навігацією стрілками.", ru:"⭐⭐ Меню с 3 пунктами и стрелками." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ На паузі — статистика: час, монети.", ru:"⭐⭐⭐ На паузе статистика." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Анімоване меню: фон рухається.", ru:"⭐⭐⭐⭐ Анимированное меню." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй меню у свій платформер.", ru:"⭐⭐⭐⭐ Встрой меню в платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 110 — Меню та пауза (стани гри)
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Платформер — Меню"); clock=pygame.time.Clock()
font_big=pygame.font.SysFont("Arial",52,bold=True)
font=pygame.font.SysFont("Arial",26,bold=True)
font_sm=pygame.font.SysFont("Arial",20)

GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(150,360,140,18),pygame.Rect(390,275,120,18),pygame.Rect(590,190,130,18)]
coins_init=[(220,338),(460,252),(650,168)]
stars=[{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":random.uniform(0.2,0.8)} for _ in range(70)]
MENU_ITEMS=["▶  ГРАТИ","🏆  РЕКОРДИ","❌  ВИЙТИ"]; menu_sel=0

def reset():
    global px,py,vx,vy,on_ground,coyote,jump_buf,score,coins,play_time
    px,py=80.0,float(FLOOR-50); vx=vy=0; on_ground=False; coyote=jump_buf=0; score=0; play_time=0
    coins=[{"x":float(x),"y":float(y),"got":False} for x,y in coins_init]
reset(); state="menu"; tick=0; best=0

def bg(scroll=False):
    screen.fill((5,10,25))
    for s in stars:
        pygame.draw.circle(screen,(100,100,160),(int(s["x"]),int(s["y"])),1)
        if scroll: s["y"]=(s["y"]+s["s"])%H

while True:
    tick+=1
    events=pygame.event.get(); keys=pygame.key.get_pressed()
    for ev in events:
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
    if state=="menu":
        for ev in events:
            if ev.type==pygame.KEYDOWN:
                if ev.key==pygame.K_UP: menu_sel=(menu_sel-1)%3
                if ev.key==pygame.K_DOWN: menu_sel=(menu_sel+1)%3
                if ev.key in(pygame.K_RETURN,pygame.K_SPACE):
                    if menu_sel==0: reset(); state="playing"
                    elif menu_sel==1: state="records"
                    elif menu_sel==2: pygame.quit(); sys.exit()
        bg(True)
        r=int(128+127*abs(math.sin(tick*0.02)))
        t=font_big.render("МІЙ ПЛАТФОРМЕР",True,(r,200,255-r)); screen.blit(t,t.get_rect(center=(W//2,120)))
        for i,item in enumerate(MENU_ITEMS):
            sel=i==menu_sel
            pygame.draw.rect(screen,(30,30,60) if sel else (15,15,35),(W//2-160,220+i*60,320,46),border_radius=8)
            if sel: pygame.draw.rect(screen,(80,80,160),(W//2-160,220+i*60,320,46),2,border_radius=8)
            t=font.render(item,True,(255,220,60) if sel else (180,180,200)); screen.blit(t,t.get_rect(center=(W//2,243+i*60)))
        screen.blit(font_sm.render("↑↓ навігація  ENTER/SPACE вибір",True,(100,100,160)),font_sm.render(".",True,(0,0,0)).get_rect(center=(W//2,H-25)))
    elif state=="records":
        for ev in events:
            if ev.type==pygame.KEYDOWN and ev.key in(pygame.K_ESCAPE,pygame.K_BACKSPACE): state="menu"
        bg()
        t=font_big.render("🏆 РЕКОРДИ",True,(255,210,60)); screen.blit(t,t.get_rect(center=(W//2,80)))
        screen.blit(font.render(f"Найкращий: {best}",True,(255,255,200)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,200)))
        screen.blit(font_sm.render("ESC — назад",True,(150,150,200)),(W//2-60,H-40))
    elif state=="playing":
        play_time+=1
        for ev in events:
            if ev.type==pygame.KEYDOWN:
                if ev.key==pygame.K_SPACE: jump_buf=8
                if ev.key==pygame.K_p: state="paused"
                if ev.key==pygame.K_ESCAPE: state="menu"
        if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
        elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
        else: vx*=0.84
        if on_ground: coyote=6
        elif coyote>0: coyote-=1
        if jump_buf>0:
            jump_buf-=1
            if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
        vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False
        pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
        for plt in platforms:
            if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
                py=float(plt.top-0.5); vy=0; on_ground=True
        for c in coins:
            if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26: c["got"]=True; score+=10
        if py>H+50: best=max(best,score); state="gameover"
        if all(c["got"] for c in coins): best=max(best,score); state="win"
        bg()
        for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
        for c in coins:
            if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),12)
        pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
        screen.blit(font.render(f"Score:{score}  P=пауза  ESC=меню",True,(255,255,255)),(8,8))
    elif state=="paused":
        for ev in events:
            if ev.type==pygame.KEYDOWN:
                if ev.key==pygame.K_p: state="playing"
                if ev.key==pygame.K_ESCAPE: state="menu"
        bg(); ov=pygame.Surface((W,H),pygame.SRCALPHA); ov.fill((0,0,0,140)); screen.blit(ov,(0,0))
        pygame.draw.rect(screen,(20,20,50),(W//2-190,H//2-80,380,160),border_radius=12)
        pygame.draw.rect(screen,(80,80,160),(W//2-190,H//2-80,380,160),2,border_radius=12)
        screen.blit(font_big.render("⏸ ПАУЗА",True,(255,220,60)),font_big.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2-30)))
        s=play_time//60; screen.blit(font_sm.render(f"Score:{score}  Час:{s//60}:{s%60:02d}  P=далі  ESC=меню",True,(180,200,200)),font_sm.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2+30)))
    elif state in("gameover","win"):
        for ev in events:
            if ev.type==pygame.KEYDOWN:
                if ev.key==pygame.K_r: reset(); state="playing"
                if ev.key==pygame.K_ESCAPE: state="menu"
        bg()
        col=(220,50,50) if state=="gameover" else (255,200,0)
        screen.blit(font_big.render("💀 GAME OVER" if state=="gameover" else "🏆 ПЕРЕМОГА!",True,col),font_big.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2-50)))
        screen.blit(font.render(f"Score:{score}  Рекорд:{best}",True,(255,255,200)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2+10)))
        screen.blit(font_sm.render("R=знову  ESC=меню",True,(180,180,220)),font_sm.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2+60)))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 111,
        title: { uk: "HUD: здоров'я, XP та бонуси", ru: "HUD: здоровье и бонусы" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 HUD: здоров'я, XP та бонуси</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 HUD: здоровье и бонусы</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Намалюй 3 серця для HP (filled/empty).", ru:"⭐ Нарисуй 3 сердца для HP." }},
          { num:2, level:"easy", text:{ uk:"⭐ XP-шкала: заповнюється при зборі монет.", ru:"⭐ XP-шкала заполняется при монетах." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ При повному XP гравець підвищує рівень (Lv).", ru:"⭐⭐ При полном XP — уровень повышается." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Рахунок у правому верхньому куті.", ru:"⭐⭐ Счёт в правом верхнем углу." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Спливаючий текст \"+10\" при зборі монети.", ru:"⭐⭐ Всплывающий текст \"+10\" при монете." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Іконка швидкого бонусу (зникає через 3 секунди).", ru:"⭐⭐⭐ Иконка бонуса скорости (исчезает через 3 сек)." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Мінімапа: крапки гравця і монет у куті.", ru:"⭐⭐⭐⭐ Миникарта в углу экрана." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй HUD у свій платформер.", ru:"⭐⭐⭐⭐ Встрой HUD в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 111 — HUD: здоров'я, XP та бонуси
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("HUD Платформера"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True); font_sm=pygame.font.SysFont("Arial",17)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(100,375,130,18),pygame.Rect(340,298,120,18),pygame.Rect(560,218,130,18)]
hp=3; max_hp=5; score=0; xp=0; xp_need=100; plevel=1; speed_t=0
coins=[{"x":200.0,"y":355.0,"got":False},{"x":410.0,"y":275.0,"got":False},{"x":625.0,"y":195.0,"got":False}]
hazards=[pygame.Rect(280,FLOOR-12,50,12),pygame.Rect(478,FLOOR-12,50,12)]
px,py=80.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0; iframes=0
popups=[]; tick=0

def draw_hearts(hp,max_hp,x=8,y=8):
    for i in range(max_hp):
        cx=x+i*32+14; cy=y+14; filled=i<hp
        col=(220,50,50) if filled else (50,30,30)
        pygame.draw.circle(screen,col,(cx-6,cy-5),8); pygame.draw.circle(screen,col,(cx+6,cy-5),8)
        pygame.draw.polygon(screen,col,[(cx-13,cy),(cx+13,cy),(cx,cy+14)])
def draw_xp(xp,xp_need,plevel,x=8,y=44):
    p=min(1.0,xp/xp_need); bw=200
    pygame.draw.rect(screen,(20,20,50),(x,y,bw,12),border_radius=5)
    pygame.draw.rect(screen,(80,180,255),(x,y,int(bw*p),12),border_radius=5)
    pygame.draw.rect(screen,(100,140,200),(x,y,bw,12),2,border_radius=5)
    screen.blit(font_sm.render(f"Lv{plevel}",True,(140,180,255)),(x+bw+6,y-2))

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_h: hp=min(max_hp,hp+1)
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_s: speed_t=180
    spd=7 if speed_t>0 else 5
    if speed_t>0: speed_t-=1
    iframes=max(0,iframes-1)
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,spd)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-spd)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    for hz in hazards:
        if pr.colliderect(hz) and iframes==0:
            hp=max(0,hp-1); iframes=90; vx=-vx; vy=-8; popups.append({"x":px,"y":py-40,"txt":"💥-1HP","life":40})
    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26:
            c["got"]=True; score+=10; xp+=20; popups.append({"x":c["x"],"y":c["y"]-20,"txt":"+10","life":35})
            if xp>=xp_need: xp-=xp_need; plevel+=1; xp_need=int(xp_need*1.5); max_hp=min(6,max_hp+1); hp=min(max_hp,hp+1); popups.append({"x":W//2,"y":H//2,"txt":f"LEVEL UP! Lv{plevel}","life":80})
    for p in popups[:]:
        p["y"]-=0.8; p["life"]-=1
        if p["life"]<=0: popups.remove(p)
    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for hz in hazards:
        for i in range(hz.w//10): pygame.draw.polygon(screen,(200,60,60),[(hz.x+i*10,hz.bottom),(hz.x+i*10+5,hz.top),(hz.x+i*10+10,hz.bottom)])
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),12)
    col=(255,80,80) if iframes>0 and iframes%6<3 else (80,200,255)
    pygame.draw.rect(screen,col,pr,border_radius=7)
    for p in popups:
        t=font.render(p["txt"],True,(255,220,60)); screen.blit(t,t.get_rect(center=(int(p["x"]),int(p["y"]))))
    draw_hearts(hp,max_hp); draw_xp(xp,xp_need,plevel)
    t=font.render(f"Score:{score}",True,(255,210,60)); screen.blit(t,t.get_rect(topright=(W-8,8)))
    if speed_t>0: screen.blit(font.render("⚡SPD",True,(80,180,255)),(8,66))
    screen.blit(font_sm.render("H=+HP  S=speed  SPACE=стрибок  Шипи знімають HP",True,(150,150,200)),(8,H-28))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 112,
        title: { uk: "Пастки та небезпека", ru: "Ловушки и опасность" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Пастки та небезпека</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Ловушки и опасность</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Намалюй шипи на підлозі (трикутники).", ru:"⭐ Нарисуй шипы на полу." }},
          { num:2, level:"easy", text:{ uk:"⭐ При торканні шипів гравець втрачає HP.", ru:"⭐ При касании шипов — потеря HP." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Вогонь: вмикається і вимикається кожні 2 секунди.", ru:"⭐⭐ Огонь: включается/выключается каждые 2 сек." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Пила: рухається по горизонталі туди-сюди.", ru:"⭐⭐ Пила: движется горизонтально туда-сюда." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ При ударі — iframes (миготіння 1.5 секунди).", ru:"⭐⭐ После удара — миганиe 1.5 сек." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Ядра: падають зверху кожні 3 секунди.", ru:"⭐⭐⭐ Ядра падают сверху каждые 3 сек." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Лазер: горизонтальний промінь вмикається кожні 4 сек.", ru:"⭐⭐⭐⭐ Лазер: горизонтальный луч каждые 4 сек." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй пастки у свій платформер.", ru:"⭐⭐⭐⭐ Встрой ловушки в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 112 — Пастки та небезпека
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Пастки та небезпека"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(80,385,100,18),pygame.Rect(280,315,120,18),pygame.Rect(490,245,100,18),pygame.Rect(650,175,110,18)]

class Trap:
    def __init__(self,x,y,kind="spike"):
        self.x=float(x); self.y=float(y); self.kind=kind; self.timer=random.randint(0,60); self.active=True
    def update(self):
        self.timer+=1
        if self.kind=="fire": self.active=(self.timer%80)<50
        if self.kind=="saw": self.x+=math.sin(self.timer*0.04)*2.5
    def hits(self,pr):
        if not self.active: return False
        if self.kind=="spike": r=pygame.Rect(int(self.x)-6,int(self.y)-16,12,16)
        elif self.kind=="fire": r=pygame.Rect(int(self.x)-14,int(self.y)-40,28,40)
        else: r=pygame.Rect(int(self.x)-14,int(self.y)-14,28,28)
        return pr.colliderect(r)
    def draw(self,surf):
        x,y=int(self.x),int(self.y)
        if self.kind=="spike":
            for i in (-6,0,6): pygame.draw.polygon(surf,(180,60,60),[(x+i,y),(x+i+6,y-16),(x+i+12,y)])
        elif self.kind=="fire":
            if not self.active: pygame.draw.ellipse(surf,(60,60,80),(x-8,y-8,16,8))
            else:
                for j in range(3):
                    h2=int(30+10*math.sin(self.timer*0.15+j)); fw=10
                    pygame.draw.polygon(surf,(255,max(0,100-j*30),0),[(x-fw+j*fw,y),(x+j*fw,y-h2),(x+fw+j*fw,y)])
        elif self.kind=="saw":
            pygame.draw.circle(surf,(160,160,160),(x,y),14)
            for i in range(8):
                a=math.radians(i*45+self.timer*3)
                pygame.draw.circle(surf,(200,60,60),(x+int(math.cos(a)*18),y+int(math.sin(a)*18)),5)

traps=[Trap(190,FLOOR,"spike"),Trap(300,FLOOR,"spike"),Trap(400,FLOOR,"fire"),
       Trap(160,367,"spike"),Trap(250,FLOOR,"saw"),Trap(590,FLOOR,"fire"),
       Trap(360,297,"spike"),Trap(560,227,"saw")]
px,py=50.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0; hp=3; iframes=0

while True:
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_r: px,py=50.0,float(FLOOR-50); hp=3
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False; iframes=max(0,iframes-1)
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    for t in traps: t.update()
    for t in traps:
        if t.hits(pr) and iframes==0: hp=max(0,hp-1); iframes=90; vx=-vx; vy=-8
    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for t in traps: t.draw(screen)
    col=(255,80,80) if iframes>0 and iframes%6<3 else (80,200,255)
    pygame.draw.rect(screen,col,pr,border_radius=7)
    screen.blit(font.render(f"HP:{'❤'*hp}{'🖤'*(3-hp)}  SPACE=стрибок  R=рестарт",True,(255,255,255)),(8,8))
    screen.blit(font.render("🔴шипи  🔥вогонь(мигає)  ⚙️пила(рухається)",True,(180,160,160)),(8,H-32))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 113,
        title: { uk: "Чекпоінти", ru: "Чекпоинты" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Чекпоінти</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Чекпоинты</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Намалюй прапор-чекпоінт (стовп + трикутник).", ru:"⭐ Нарисуй флаг-чекпоинт." }},
          { num:2, level:"easy", text:{ uk:"⭐ При торканні прапор змінює колір (сірий → зелений).", ru:"⭐ При касании флаг становится зелёным." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ При загибелі гравець відновлюється на останньому чекпоінті.", ru:"⭐⭐ После смерти — возрождение на чекпоинте." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Монети після чекпоінту не скидаються.", ru:"⭐⭐ Монеты после чекпоинта не сбрасываются." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Спливаюче повідомлення \"✅ Чекпоінт!\" при активації.", ru:"⭐⭐ Всплывающее \"✅ Чекпоинт!\" при активации." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ 3 чекпоінти на рівні, кожен дає +50 очків.", ru:"⭐⭐⭐ 3 чекпоинта, каждый даёт +50 очков." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Чекпоінт анімований: зірка обертається над прапором.", ru:"⭐⭐⭐⭐ Анимированная звезда над флагом." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй чекпоінти у свій платформер.", ru:"⭐⭐⭐⭐ Встрой чекпоинты в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 113 — Чекпоінти
import pygame,sys,math
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Чекпоінти"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(100,385,120,18),pygame.Rect(320,315,120,18),pygame.Rect(545,235,120,18),pygame.Rect(685,160,100,18)]
spikes=[pygame.Rect(200,FLOOR-12,40,12),pygame.Rect(440,FLOOR-12,40,12),pygame.Rect(630,FLOOR-12,50,12)]

class Checkpoint:
    def __init__(self,x,y,cid):
        self.x=float(x); self.y=float(y); self.cid=cid; self.active=False
    def draw(self,surf,tick):
        col=(60,220,120) if self.active else (160,160,60)
        pygame.draw.rect(surf,(30,30,50),(int(self.x)-4,int(self.y)-38,8,38))
        h2=16+int(math.sin(tick*0.08+self.cid)*3)
        pygame.draw.polygon(surf,col,[(int(self.x),int(self.y)-38-h2),(int(self.x),int(self.y)-38),(int(self.x)+26,int(self.y)-38-h2//2)])
        if self.active:
            a=tick*0.06; r=12
            sx=int(self.x)+int(math.cos(a)*r); sy=int(self.y)-50+int(math.sin(a)*4)
            pygame.draw.circle(surf,(255,220,0),(sx,sy),6)

cps=[Checkpoint(170,FLOOR,0),Checkpoint(400,297,1),Checkpoint(625,217,2)]
spawn_x,spawn_y=80.0,float(FLOOR-50); px,py=spawn_x,spawn_y; vx,vy=0.0,0.0
on_ground=False; coyote=0; jump_buf=0; hp=3; iframes=0; score=0; tick=0; popups=[]

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False; iframes=max(0,iframes-1)
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    for sp in spikes:
        if pr.colliderect(sp) and iframes==0:
            hp=max(0,hp-1); iframes=120; px,py=spawn_x,spawn_y; vx=vy=0
            popups.append({"x":float(spawn_x),"y":float(spawn_y)-60,"txt":"⟳ відновлення!","life":80})
    for cp in cps:
        if not cp.active and abs(px-cp.x)<30 and py>=cp.y-50:
            cp.active=True; spawn_x,spawn_y=float(cp.x),float(cp.y-50); score+=50
            popups.append({"x":float(cp.x),"y":float(cp.y)-70,"txt":f"✅ Чекпоінт {cp.cid+1}!","life":80})
    for p in popups[:]:
        p["y"]-=0.7; p["life"]-=1
        if p["life"]<=0: popups.remove(p)
    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for sp in spikes:
        for i in range(sp.w//10): pygame.draw.polygon(screen,(200,60,60),[(sp.x+i*10,sp.bottom),(sp.x+i*10+5,sp.top),(sp.x+i*10+10,sp.bottom)])
    pygame.draw.circle(screen,(60,220,60),(int(spawn_x),int(spawn_y)+4),6)
    for cp in cps: cp.draw(screen,tick)
    col=(255,80,80) if iframes>0 and iframes%6<3 else (80,200,255)
    pygame.draw.rect(screen,col,pr,border_radius=7)
    for p in popups: screen.blit(font.render(p["txt"],True,(120,255,120)),font.render(p["txt"],True,(0,0,0)).get_rect(center=(int(p["x"]),int(p["y"]))))
    screen.blit(font.render(f"HP:{'❤'*hp}  Score:{score}  Spawn:({int(spawn_x)},{int(spawn_y)})",True,(255,255,255)),(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 114,
        title: { uk: "Міні-бос", ru: "Мини-босс" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Міні-бос</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Мини-босс</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Намалюй боса (великий червоний круг).", ru:"⭐ Нарисуй босса (большой красный круг)." }},
          { num:2, level:"easy", text:{ uk:"⭐ Бос рухається горизонтально і відбивається від стін.", ru:"⭐ Босс движется горизонтально и отражается." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ У боса є HP-шкала над головою.", ru:"⭐⭐ У босса есть HP-шкала над головой." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Стрибок ЗВЕРХУ на боса знімає 1 HP.", ru:"⭐⭐ Прыжок сверху снимает 1 HP." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ При HP≤2 бос прискорюється (Фаза 2).", ru:"⭐⭐ При HP≤2 — ускорение (Фаза 2)." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ У Фазі 2 бос стріляє снарядами у гравця.", ru:"⭐⭐⭐ В Фазе 2 босс стреляет снарядами." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ При перемозі — феєрверк з частинок.", ru:"⭐⭐⭐⭐ При победе — фейерверк частиц." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй боса у свій платформер.", ru:"⭐⭐⭐⭐ Встрой босса в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 114 — Міні-бос
import pygame,sys,math,random
pygame.init()
W,H=800,550; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Міні-бос"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(50,445,120,18),pygame.Rect(360,415,120,18),pygame.Rect(640,445,120,18)]

class MiniBoss:
    def __init__(self):
        self.x=float(W//2); self.y=float(FLOOR-52); self.vx=2.0; self.vy=0.0
        self.hp=5; self.max_hp=5; self.phase=1; self.timer=0; self.iframes=0
        self.proj=[]; self.alive=True; self.sz=48; self.particles=[]
    def update(self,px,py):
        self.timer+=1; self.iframes=max(0,self.iframes-1)
        if self.hp<=2 and self.phase==1: self.phase=2; self.vx=3.5
        self.vy=min(self.vy+GRAVITY,18); self.y+=self.vy; self.x+=self.vx
        if self.x<self.sz//2+30 or self.x>W-self.sz//2-30: self.vx*=-1
        if self.y>=FLOOR-self.sz//2: self.y=float(FLOOR-self.sz//2); self.vy=0
        if self.phase==2 and self.timer%55==0:
            dx=px-self.x; dy=py-self.y; d=max(1,(dx**2+dy**2)**0.5)
            self.proj.append({"x":self.x,"y":self.y,"vx":dx/d*5.5,"vy":dy/d*5.5,"life":90})
        for p in self.proj[:]:
            p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["life"]-=1
            if p["life"]<=0: self.proj.remove(p)
        for p in self.particles[:]:
            p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.1; p["life"]-=2
            if p["life"]<=0: self.particles.remove(p)
    def hit(self):
        if self.iframes>0: return
        self.hp-=1; self.iframes=40
        if self.hp<=0:
            self.alive=False
            for _ in range(40):
                self.particles.append({"x":self.x,"y":self.y,"vx":random.uniform(-8,8),"vy":random.uniform(-12,2),"col":(random.randint(180,255),random.randint(100,200),0),"life":random.randint(30,80)})
    def draw(self,surf):
        for p in self.particles: pygame.draw.circle(surf,p["col"],(int(p["x"]),int(p["y"])),4)
        if not self.alive: return
        flash=self.iframes>0 and self.iframes%4<2
        if not flash:
            col=(220,60,60) if self.phase==1 else (220,100,20)
            pygame.draw.circle(surf,col,(int(self.x),int(self.y)),self.sz//2)
            ex1=int(self.x)-12; ex2=int(self.x)+12; ey=int(self.y)-8
            pygame.draw.circle(surf,(255,255,100),(ex1,ey),8); pygame.draw.circle(surf,(255,255,100),(ex2,ey),8)
            pygame.draw.circle(surf,(20,10,0),(ex1+2,ey+2),4); pygame.draw.circle(surf,(20,10,0),(ex2-2,ey+2),4)
            if self.phase==2:
                for i in range(5):
                    a=math.radians(i*36-90+self.timer*2)
                    pygame.draw.circle(surf,(255,200,0),(int(self.x+math.cos(a)*(self.sz//2)),int(self.y+math.sin(a)*(self.sz//2))),5)
        bw=100; hpw=int(bw*max(0,self.hp)/self.max_hp)
        pygame.draw.rect(surf,(40,0,0),(int(self.x)-50,int(self.y)-self.sz//2-22,bw,10),border_radius=4)
        pygame.draw.rect(surf,(220,60,60),(int(self.x)-50,int(self.y)-self.sz//2-22,hpw,10),border_radius=4)
        for p in self.proj: pygame.draw.circle(surf,(255,140,40),(int(p["x"]),int(p["y"])),7)

boss=MiniBoss()
px,py=100.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0; hp=3; iframes=0

while True:
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False; iframes=max(0,iframes-1)
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    if boss.alive:
        boss.update(px,py)
        br=pygame.Rect(int(boss.x)-boss.sz//2,int(boss.y)-boss.sz//2,boss.sz,boss.sz)
        if pr.colliderect(br):
            if vy>0 and pr.bottom<br.centery+5: boss.hit(); vy=JUMP*0.7
            elif iframes==0: hp-=1; iframes=90; vx=-vx; vy=-8
        for p in boss.proj[:]:
            if pr.colliderect(pygame.Rect(int(p["x"])-7,int(p["y"])-7,14,14)) and iframes==0:
                hp-=1; iframes=70; boss.proj.remove(p); break
    screen.fill((20,5,15) if boss.alive and boss.phase==2 else (15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    boss.draw(screen)
    col=(255,80,80) if iframes>0 and iframes%6<3 else (80,200,255)
    pygame.draw.rect(screen,col,pr,border_radius=7)
    screen.blit(font.render(f"HP:{'❤'*max(0,hp)}  {'⚡ФАЗА 2!' if boss.alive and boss.phase==2 else ''}",True,(255,255,255)),(8,8))
    if not boss.alive: screen.blit(font.render("🏆 БОС ПЕРЕМОЖЕНИЙ!",True,(255,220,0)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2)))
    if hp<=0: screen.blit(font.render("💀 GAME OVER",True,(255,60,60)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2)))
    screen.blit(font.render("Стрибок ЗВЕРХУ на боса = удар! Уникай снарядів!",True,(180,160,200)),(8,H-30))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 115,
        title: { uk: "Тайлмап — рівень з масиву", ru: "Тайлмап — уровень из массива" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Тайлмап — рівень з масиву</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Тайлмап — уровень из массива</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Намалюй 5×5 тайлмап (масив з # та пробілів).", ru:"⭐ Нарисуй 5×5 тайлмап." }},
          { num:2, level:"easy", text:{ uk:"⭐ Монета на тайлмапі (символ C).", ru:"⭐ Монета на тайлмапе (символ C)." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Двері (символ D) відкривають перехід на рівень 2.", ru:"⭐⭐ Двери (D) переход на уровень 2." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Шипи на тайлмапі (символ ^).", ru:"⭐⭐ Шипы на тайлмапе (^)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зміни тайлмап і зроби свій унікальний рівень.", ru:"⭐⭐ Измени тайлмап — создай свой уровень." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ 3 рівні з різними тайлмапами.", ru:"⭐⭐⭐ 3 уровня с разными тайлмапами." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Рухома камера: рівень ширший за екран.", ru:"⭐⭐⭐⭐ Двигающаяся камера для большого уровня." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй тайлмап у свій платформер.", ru:"⭐⭐⭐⭐ Встрой тайлмап в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 115 — Тайлмап: рівень задається масивом символів
import pygame,sys,math
pygame.init()
W,H=800,480; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Тайлмап"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)
TILE=40; GRAVITY=0.55; JUMP=-13.0

# '#'=земля  'C'=монета  '^'=шипи  'D'=двері  'P'=гравець  '.'=порожньо
LEVEL="""
....................
....................
....####....####....
..C.............C...
####...####.........
.......C........C...
...####....####.....
.C..........C.......
P................D..
####################
""".strip().splitlines()

tiles=[]; coins=[]; spikes=[]; door=None; spawn=(TILE,7*TILE)
for row,line in enumerate(LEVEL):
    for ci,ch in enumerate(line):
        x,y=ci*TILE,row*TILE
        if ch=='#': tiles.append(pygame.Rect(x,y,TILE,TILE))
        elif ch=='C': coins.append({"x":float(x+TILE//2),"y":float(y+TILE//2),"got":False})
        elif ch=='^': spikes.append(pygame.Rect(x,y+TILE-12,TILE,12))
        elif ch=='D': door=pygame.Rect(x,y,TILE,TILE)
        elif ch=='P': spawn=(x+TILE//2,y+TILE//2)

px,py=float(spawn[0]),float(spawn[1]); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
score=0; hp=3; iframes=0; won=False; tick=0

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); iframes=max(0,iframes-1)
    px+=vx; pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for t in tiles:
        if pr.colliderect(t):
            if vx>0: px=float(t.left-16)
            else: px=float(t.right+16)
            vx=0; break
    px=max(16,min(W-16,px))
    py+=vy; on_ground=False; pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for t in tiles:
        if pr.colliderect(t):
            if vy>0: py=float(t.top-0.5); vy=0; on_ground=True
            elif vy<0: py=float(t.bottom+38); vy=0
            break
    for c in coins:
        if not c["got"] and abs(px-c["x"])<24 and abs(py-c["y"])<28: c["got"]=True; score+=10
    for sp in spikes:
        if pr.colliderect(sp) and iframes==0: hp-=1; iframes=90; px,py=float(spawn[0]),float(spawn[1]); vx=vy=0
    if door and pr.colliderect(door): won=True
    screen.fill((15,20,40))
    for t in tiles: pygame.draw.rect(screen,(100,80,50),(t.x,t.y,TILE,TILE)); pygame.draw.rect(screen,(120,100,70),(t.x,t.y,TILE,4))
    for sp in spikes:
        for i in range(sp.w//10): pygame.draw.polygon(screen,(200,60,60),[(sp.x+i*10,sp.y+sp.h),(sp.x+i*10+5,sp.y),(sp.x+i*10+10,sp.y+sp.h)])
    for c in coins:
        if not c["got"]: bob=math.sin(tick*0.08+c["x"])*4; pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"]+bob)),10)
    if door: pygame.draw.rect(screen,(80,220,100),(door.x,door.y,door.w,door.h),border_radius=4)
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    screen.blit(font.render(f"HP:{'❤'*hp}  Score:{score}  SPACE=стрибок",True,(255,255,255)),(8,8))
    if won: screen.blit(font.render("🚪 РІВЕНЬ ПРОЙДЕНО! Тайлмап працює!",True,(255,220,0)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2)))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 116,
        title: { uk: "Дизайн рівнів з тайлмапом", ru: "Дизайн уровней из тайлмапа" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Дизайн рівнів з тайлмапом</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Дизайн уровней из тайлмапа</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Зроби 2 різних рівні через два тайлмап-масиви.", ru:"⭐ Сделай 2 разных уровня через 2 массива." }},
          { num:2, level:"easy", text:{ uk:"⭐ Різний фоновий колір для кожного рівня.", ru:"⭐ Разный фоновый цвет для каждого уровня." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Переходь на наступний рівень через двері.", ru:"⭐⭐ Переход на следующий уровень через дверь." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Гравець стартує з позиції P у тайлмапі.", ru:"⭐⭐ Игрок стартует с позиции P в тайлмапе." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ 3 різних рівні з наростаючою складністю.", ru:"⭐⭐ 3 уровня с нарастающей сложностью." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Рахунок монет зберігається між рівнями.", ru:"⭐⭐⭐ Счёт монет сохраняется между уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Намалюй 5 унікальних рівнів для свого платформера.", ru:"⭐⭐⭐⭐ Нарисуй 5 уникальных уровней." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй тайлмап-систему у свій платформер.", ru:"⭐⭐⭐⭐ Встрой тайлмап-систему в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 116 — Дизайн рівнів: 3 рівні через тайлмапи
import pygame,sys,math
pygame.init()
W,H=800,480; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Дизайн рівнів"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)
TILE=40; GRAVITY=0.55; JUMP=-13.0

LEVELS=[
  ["####################","#..................#","#..C...C.....C....#",
   "#.####..###..####.#","#.................#","#.C...C.C.....C...#",
   "####..####..####..#","#.................#","#P................D","####################"],
  ["####################","#.........C.......#","#.####.########...#",
   "#.C...........C...#","#.##.####.##..####","#..C.......C......#",
   "####.##.####.##...#","#.C...C.....C.....#","#P...............D#","####################"],
  ["####################","#...........C.....#","#.####.######.....#",
   "#.C.........C.....#","#.##.####.#####...#","#.......C.........#",
   "#.####.######.##..#","#.C...C.....C.....#","#P................D","####################"],
]
BG_COLS=[(15,25,50),(25,15,40),(10,30,20)]; TILE_COLS=[(100,80,50),(80,60,80),(50,90,50)]

def load_level(n):
    global tiles,coins,door,spawn_pos
    tiles=[]; coins=[]; door=None; spawn_pos=(TILE,7*TILE)
    for row,line in enumerate(LEVELS[n]):
        for ci,ch in enumerate(line):
            x,y=ci*TILE,row*TILE
            if ch=='#': tiles.append(pygame.Rect(x,y,TILE,TILE))
            elif ch=='C': coins.append({"x":float(x+TILE//2),"y":float(y+TILE//2),"got":False})
            elif ch=='D': door=pygame.Rect(x,y,TILE,TILE)
            elif ch=='P': spawn_pos=(x+TILE//2,y+TILE//2)

level_num=0; load_level(0); px,py=float(spawn_pos[0]),float(spawn_pos[1]); vx=vy=0.0
on_ground=False; coyote=0; jump_buf=0; score=0; tick=0; transition=0

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    if transition>0:
        transition-=1; screen.fill((0,0,0))
        screen.blit(font.render(f"РІВЕНЬ {level_num+1}",True,(255,220,60)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2)))
        pygame.display.flip(); clock.tick(60); continue
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18)
    px+=vx; pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for t in tiles:
        if pr.colliderect(t):
            if vx>0: px=float(t.left-16)
            else: px=float(t.right+16)
            vx=0; break
    px=max(16,min(W-16,px))
    py+=vy; on_ground=False; pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for t in tiles:
        if pr.colliderect(t):
            if vy>0: py=float(t.top-0.5); vy=0; on_ground=True
            elif vy<0: py=float(t.bottom+38); vy=0
            break
    for c in coins:
        if not c["got"] and abs(px-c["x"])<24 and abs(py-c["y"])<28: c["got"]=True; score+=10
    if door and pr.colliderect(door):
        if level_num<len(LEVELS)-1:
            level_num+=1; load_level(level_num); px,py=float(spawn_pos[0]),float(spawn_pos[1]); vx=vy=0; transition=80
        else: score+=100
    screen.fill(BG_COLS[level_num]); tc=TILE_COLS[level_num]
    for t in tiles:
        pygame.draw.rect(screen,tc,(t.x,t.y,TILE,TILE))
        pygame.draw.rect(screen,(min(255,tc[0]+30),min(255,tc[1]+30),min(255,tc[2]+30)),(t.x,t.y,TILE,4))
    for c in coins:
        if not c["got"]: bob=math.sin(tick*0.1+c["x"])*3; pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"]+bob)),10)
    if door:
        pygame.draw.rect(screen,(80,220,100),(door.x,door.y,door.w,door.h),border_radius=4)
        screen.blit(font.render("D",True,(255,255,255)),(door.x+12,door.y+8))
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    screen.blit(font.render(f"Рівень {level_num+1}/{len(LEVELS)}  Score:{score}  Монет:{sum(c['got'] for c in coins)}/{len(coins)}",True,(255,255,255)),(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 117,
        title: { uk: "Прокрутка камери по горизонталі", ru: "Прокрутка камеры по горизонтали" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block"><h3>📖 Прокрутка камери по горизонталі</h3><p>Додай цю механіку у свій платформер крок за кроком!</p></div>`,
          ru: `<div class="theory-block"><h3>📖 Прокрутка камеры по горизонтали</h3><p>Добавь эту механику в свой платформер шаг за шагом!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Рівень ширший за екран (1600px).", ru:"⭐ Уровень шире экрана (1600px)." }},
          { num:2, level:"easy", text:{ uk:"⭐ Камера слідкує за гравцем по горизонталі.", ru:"⭐ Камера следит за игроком по горизонтали." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Камера не виходить за межі рівня (clamp).", ru:"⭐⭐ Камера не выходит за края уровня." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Паралакс: хмари рухаються в 0.3x від швидкості камери.", ru:"⭐⭐ Параллакс: облака движутся 0.3x скорости камеры." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Монети розкидані по всій довжині рівня.", ru:"⭐⭐ Монеты по всей длине уровня." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Мінімапа 200×20px у правому верхньому куті.", ru:"⭐⭐⭐ Миникарта 200×20px вверху справа." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Lerp камера (плавна прокрутка, не миттєва).", ru:"⭐⭐⭐⭐ Lerp-камера (плавная прокрутка)." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй горизонтальну прокрутку у свій платформер.", ru:"⭐⭐⭐⭐ Встрой горизонтальную прокрутку." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 117 — Прокрутка камери по горизонталі
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Горизонтальна прокрутка"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
LW=1800  # ширина рівня

platforms=[
    pygame.Rect(0,FLOOR,LW,60),
    pygame.Rect(180,360,160,18),pygame.Rect(420,290,140,18),pygame.Rect(650,220,160,18),
    pygame.Rect(880,300,130,18),pygame.Rect(1060,360,120,18),pygame.Rect(1200,240,150,18),
    pygame.Rect(1380,180,140,18),pygame.Rect(1560,280,130,18),pygame.Rect(1700,360,100,18),
]
coins=[{"x":float(p.x+p.w//2),"y":float(p.y-24),"got":False} for p in platforms[1:]]
door=pygame.Rect(LW-60,FLOOR-80,40,72)
clouds=[{"x":float(random.randint(0,LW)),"y":float(random.randint(20,160)),"w":random.randint(60,140),"h":random.randint(25,50)} for _ in range(18)]

px,py=80.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
score=0; cam_x=0.0; tick=0

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(LW-16,px)); on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26: c["got"]=True; score+=10
    # Lerp камера
    target_cam=px-W//2; cam_x+=(target_cam-cam_x)*0.1
    cam_x=max(0,min(cam_x,LW-W)); cx=int(cam_x)
    # Параллакс хмари (0.3x)
    pcx=int(cam_x*0.3)
    screen.fill((15,20,40))
    for cl in clouds:
        pygame.draw.ellipse(screen,(40,50,80),(int(cl["x"])-pcx,int(cl["y"]),cl["w"],cl["h"]))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),(plt.x-cx,plt.y,plt.w,plt.h),border_radius=4)
    for c in coins:
        if not c["got"]: bob=math.sin(tick*0.08+c["x"])*3; pygame.draw.circle(screen,(255,210,0),(int(c["x"])-cx,int(c["y"]+bob)),10)
    pygame.draw.rect(screen,(80,220,100),(door.x-cx,door.y,door.w,door.h),border_radius=4)
    pygame.draw.rect(screen,(80,200,255),(int(px)-16-cx,int(py)-38,32,38),border_radius=7)
    # Мінімапа
    mm_w=200; mm_h=16; mm_x=W-mm_w-8; mm_y=8
    pygame.draw.rect(screen,(20,20,40),(mm_x,mm_y,mm_w,mm_h))
    for plt in platforms:
        rx=mm_x+int(plt.x/LW*mm_w); rw=max(2,int(plt.w/LW*mm_w))
        pygame.draw.rect(screen,(80,160,60),(rx,mm_y+mm_h//2,rw,mm_h//2))
    ppx=mm_x+int(px/LW*mm_w); pygame.draw.circle(screen,(80,200,255),(ppx,mm_y+mm_h//2),3)
    screen.blit(font.render(f"Score:{score}  Монет:{sum(c['got'] for c in coins)}/{len(coins)}  SPACE=стрибок",True,(255,255,255)),(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 118,
        title: { uk: "Секретні кімнати", ru: "Секретные комнаты" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Секретні кімнати</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Секретные комнаты</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай секретний прохід у власний платформер.", ru:"⭐⭐ Добавь секретний прохід в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 118 — Секретні кімнати (прихований прохід)
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Секретні кімнати"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True); font_sm=pygame.font.SysFont("Arial",17)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60

# Кімната 0 = основна, кімната 1 = секретна
ROOM_DATA=[
  {"bg":(15,20,40),"platforms":[pygame.Rect(0,FLOOR,800,60),pygame.Rect(150,360,140,18),pygame.Rect(400,280,120,18),pygame.Rect(600,200,130,18)],
   "secret_wall":pygame.Rect(596,198,8,80),"secret_msg":"← ТАМ ЩОСЬ Є!"},
  {"bg":(20,10,30),"platforms":[pygame.Rect(0,FLOOR,800,60),pygame.Rect(100,380,120,18),pygame.Rect(280,310,140,18),pygame.Rect(480,240,120,18),pygame.Rect(650,180,100,18)],
   "secret_wall":None,"secret_msg":""},
]
SECRET_ENTRY=pygame.Rect(596,198,8,80)  # прихована стіна
SECRET_COINS=[{"x":300.0,"y":270.0,"got":False},{"x":450.0,"y":200.0,"got":False},{"x":600.0,"y":160.0,"got":False}]
NORMAL_COINS=[{"x":220.0,"y":338.0,"got":False},{"x":480.0,"y":258.0,"got":False}]

room=0; platforms=ROOM_DATA[0]["platforms"]
px,py=80.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
score=0; tick=0; hint_t=0; secret_found=False
wall_alpha=200; discovered=False

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_UP and room==0 and abs(px-600)<40 and py<250: # вхід у секретну
                room=1; platforms=ROOM_DATA[1]["platforms"]; px=100.0; py=float(FLOOR-50); secret_found=True
            if ev.key==pygame.K_DOWN and room==1:  # вийти з секретної
                room=0; platforms=ROOM_DATA[0]["platforms"]; px=620.0; py=200.0
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    coins=SECRET_COINS if room==1 else NORMAL_COINS
    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26: c["got"]=True; score+=10 if room==0 else 30
    # Підказка: наближення до таємної стіни
    if room==0 and abs(px-600)<80 and py<300: hint_t=60
    if hint_t>0: hint_t-=1
    # Прозора стіна (fade in/out)
    if room==0:
        if abs(px-600)<60 and py<280: wall_alpha=max(60,wall_alpha-10)
        else: wall_alpha=min(200,wall_alpha+5)

    screen.fill(ROOM_DATA[room]["bg"])
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for c in coins:
        if not c["got"]:
            col=(255,210,0) if room==0 else (160,255,160)
            pygame.draw.circle(screen,col,(int(c["x"]),int(c["y"])),12)
    # Секретна стіна (напівпрозора коли близько)
    if room==0:
        ws=pygame.Surface((8,80),pygame.SRCALPHA)
        ws.fill((100,100,200,wall_alpha)); screen.blit(ws,(596,198))
        if wall_alpha<150:
            screen.blit(font_sm.render("↑ UP = увійти",True,(150,220,255)),(540,175))
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    if room==1:
        screen.blit(font.render("🔮 СЕКРЕТНА КІМНАТА! +30 за кожну монету!",True,(180,255,180)),(W//2-200,8))
        screen.blit(font_sm.render("↓ DOWN = вийти",True,(150,220,255)),(350,H-30))
    else:
        screen.blit(font.render(f"Score:{score}  {'🔮 Знайшов секрет!' if secret_found else ''}  SPACE=стрибок",True,(255,255,255)),(8,8))
    if hint_t>0: screen.blit(font_sm.render("← Тут щось є... ↑ UP щоб увійти",True,(255,220,100)),(300,H-30))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 119,
        title: { uk: "Чекпоінти 2: автоматичні та ручні", ru: "Чекпоинты 2: автоматические и ручные" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Чекпоінти 2: автоматичні та ручні</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Чекпоинты 2: автоматические и ручные</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Прапор-чекпоінт активується автоматично при проходженні.", ru:"⭐ Флаг активируется автоматически." }},
          { num:2, level:"easy", text:{ uk:"⭐ Гравець відновлюється на останньому чекпоінті після падіння.", ru:"⭐ Игрок возрождается на последнем чекпоинте." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Монети зібрані ДО чекпоінту не відновлюються.", ru:"⭐⭐ Монеты до чекпоинта не восстанавливаются." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Лічильник смертей відображається в HUD.", ru:"⭐⭐ Счётчик смертей в HUD." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Звук або анімація активації чекпоінту.", ru:"⭐⭐ Звук или анимация активации." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Бонус за проходження без смертей (+100 очків).", ru:"⭐⭐⭐ Бонус за прохождение без смертей." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Чекпоінти зберігаються у файл (persist між сесіями).", ru:"⭐⭐⭐⭐ Чекпоинты сохраняются в файл." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй систему чекпоінтів у свій платформер.", ru:"⭐⭐⭐⭐ Встрой чекпоинты в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 119 — Чекпоінти 2: повна система
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Чекпоінти — повна система"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True); font_sm=pygame.font.SysFont("Arial",17)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(80,395,100,18),pygame.Rect(280,325,120,18),pygame.Rect(490,255,110,18),pygame.Rect(660,185,100,18)]
spikes=[pygame.Rect(180,FLOOR-12,40,12),pygame.Rect(400,FLOOR-12,40,12),pygame.Rect(590,FLOOR-12,50,12)]
ALL_COINS=[(180,375),(190,375),(345,305),(355,305),(555,233),(565,233),(720,163),(730,163)]

class Checkpoint:
    def __init__(self,x,y):
        self.x=float(x); self.y=float(y); self.active=False; self.particles=[]
    def try_activate(self,px,py,score_cb):
        if not self.active and abs(px-self.x)<30 and py>=self.y-55:
            self.active=True; score_cb(50)
            for _ in range(12): self.particles.append({"x":self.x,"y":self.y-30,"vx":random.uniform(-4,4),"vy":random.uniform(-6,0),"col":(random.choice([255,200]),random.choice([200,255]),0),"life":40})
    def update(self):
        for p in self.particles[:]:
            p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.3; p["life"]-=2
            if p["life"]<=0: self.particles.remove(p)
    def draw(self,surf,tick):
        col=(60,220,120) if self.active else (160,160,60)
        pygame.draw.rect(surf,(30,30,50),(int(self.x)-4,int(self.y)-36,8,36))
        h2=14+int(math.sin(tick*0.08)*3)
        pygame.draw.polygon(surf,col,[(int(self.x),int(self.y)-36-h2),(int(self.x),int(self.y)-36),(int(self.x)+24,int(self.y)-36-h2//2)])
        if self.active:
            a=tick*0.06; pygame.draw.circle(surf,(255,220,0),(int(self.x)+int(math.cos(a)*12),int(self.y)-48+int(math.sin(a)*4)),5)
        for p in self.particles: pygame.draw.circle(surf,p["col"],(int(p["x"]),int(p["y"])),3)

cps=[Checkpoint(160,FLOOR),Checkpoint(360,307),Checkpoint(570,237),Checkpoint(730,167)]
spawn_x,spawn_y=80.0,float(FLOOR-50); px,py=spawn_x,spawn_y; vx,vy=0.0,0.0
on_ground=False; coyote=0; jump_buf=0; hp=3; iframes=0; score=0; deaths=0; tick=0; popups=[]
no_death_bonus_given=False

def add_score(n): global score; score+=n

# Монети з persistent "зібрана" ознакою
coins=[{"x":float(x),"y":float(y),"got":False} for x,y in ALL_COINS]
cp_idx=-1  # індекс останнього активованого чекпоінту

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False; iframes=max(0,iframes-1)
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    for sp in spikes:
        if pr.colliderect(sp) and iframes==0:
            hp=max(0,hp-1); deaths+=1; iframes=120
            sx,sy=spawn_x,spawn_y
            if cp_idx>=0: sx,sy=cps[cp_idx].x,cps[cp_idx].y-50
            px,py=sx,sy; vx=vy=0; popups.append({"x":sx,"y":sy-60,"txt":f"💀 Смерть #{deaths}","life":80})
    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26: c["got"]=True; score+=10
    for i,cp in enumerate(cps):
        prev=cp.active
        cp.try_activate(px,py,add_score); cp.update()
        if cp.active and not prev:
            cp_idx=i; popups.append({"x":cp.x,"y":cp.y-70,"txt":f"✅ Чекпоінт {i+1}!","life":80})
    if all(c["got"] for c in coins) and not no_death_bonus_given and deaths==0:
        score+=100; no_death_bonus_given=True; popups.append({"x":W//2,"y":H//2-40,"txt":"🏆 БЕЗ СМЕРТЕЙ! +100!","life":120})
    for p in popups[:]:
        p["y"]-=0.7; p["life"]-=1
        if p["life"]<=0: popups.remove(p)

    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for sp in spikes:
        for i in range(sp.w//10): pygame.draw.polygon(screen,(200,60,60),[(sp.x+i*10,sp.bottom),(sp.x+i*10+5,sp.top),(sp.x+i*10+10,sp.bottom)])
    pygame.draw.circle(screen,(60,180,60),(int(spawn_x),int(spawn_y)+4),5)
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),11)
    for cp in cps: cp.draw(screen,tick)
    col=(255,80,80) if iframes>0 and iframes%6<3 else (80,200,255)
    pygame.draw.rect(screen,col,pr,border_radius=7)
    for p in popups: screen.blit(font.render(p["txt"],True,(120,255,120)),font.render(p["txt"],True,(0,0,0)).get_rect(center=(int(p["x"]),int(p["y"]))))
    screen.blit(font.render(f"HP:{'❤'*hp}  Score:{score}  Смертей:{deaths}",True,(255,255,255)),(8,8))
    screen.blit(font_sm.render("Шипи → відновлення на чекпоінті. Без смертей = +100 бонус!",True,(150,150,200)),(8,H-28))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 120,
        title: { uk: "Погода та день/ніч", ru: "Погода и день/ночь" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Погода та день/ніч</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Погода и день/ночь</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай погоду або день/ніч у власний платформер.", ru:"⭐⭐ Добавь погоду або день/ніч в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 120 — Погода та день/ніч
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Погода та день/ніч"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True); font_sm=pygame.font.SysFont("Arial",17)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(120,370,150,18),pygame.Rect(380,290,130,18),pygame.Rect(600,210,140,18)]

# ── ПОГОДА ────────────────────────────────────────────────────
WEATHER_NAMES=["☀️ День","🌆 Захід","🌙 Ніч","🌧️ Дощ","⛈️ Гроза","❄️ Сніг"]
WEATHER_BG=[(80,130,200),(180,80,40),(5,8,25),(20,30,60),(15,20,50),(30,40,70)]
WEATHER_TILE=[(60,160,70),(100,80,40),(30,80,40),(50,130,60),(40,110,55),(60,100,120)]
weather=0; weather_t=0; rain=[]; snow=[]; lightning=0; thunder_t=0; sun_angle=0

def spawn_precip():
    if WEATHER_NAMES[weather] in("🌧️ Дощ","⛈️ Гроза") and len(rain)<120:
        rain.append({"x":random.uniform(0,W),"y":0,"vy":random.uniform(10,14)})
    if WEATHER_NAMES[weather]=="❄️ Сніг" and len(snow)<80:
        snow.append({"x":random.uniform(0,W),"y":0,"vy":random.uniform(1.5,3),"sx":random.uniform(-0.5,0.5),"r":random.randint(3,7)})

px,py=80.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
score=0; tick=0; coins=[{"x":200.0,"y":350.0,"got":False},{"x":450.0,"y":270.0,"got":False},{"x":660.0,"y":190.0,"got":False}]

while True:
    tick+=1; weather_t+=1; sun_angle+=0.005
    if weather_t>400: weather_t=0; weather=(weather+1)%len(WEATHER_NAMES); rain.clear(); snow.clear()
    if tick%3==0: spawn_precip()
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_w: weather_t=399  # швидка зміна
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26: c["got"]=True; score+=10
    # Блискавка
    if WEATHER_NAMES[weather]=="⛈️ Гроза" and random.random()<0.003:
        lightning=8; thunder_t=12
    lightning=max(0,lightning-1); thunder_t=max(0,thunder_t-1)
    # Дощ/сніг
    for r in rain[:]:
        r["y"]+=r["vy"]
        if r["y"]>H: rain.remove(r)
    for s in snow[:]:
        s["x"]+=s["sx"]; s["y"]+=s["vy"]
        if s["y"]>H: snow.remove(s)

    # Фон
    bg=list(WEATHER_BG[weather])
    if lightning>0: bg=[min(255,b+180) for b in bg]
    screen.fill(tuple(bg))
    # Сонце / місяць
    if weather in(0,1):
        sx=W//2+int(math.cos(sun_angle)*250); sy=80+int(math.sin(sun_angle)*40)
        pygame.draw.circle(screen,(255,230,100) if weather==0 else (200,200,160),(sx,sy),30 if weather==0 else 22)
        if weather==0:
            for i in range(8): a=math.radians(i*45); pygame.draw.line(screen,(255,220,80),(sx+int(math.cos(a)*34),sy+int(math.sin(a)*34)),(sx+int(math.cos(a)*44),sy+int(math.sin(a)*44)),3)
    elif weather==2:
        for i in range(30): pygame.draw.circle(screen,(150,150,200),(random.randint(0,W),random.randint(0,150)),1)
    # Хмари
    if weather in(3,4,5):
        for i in range(5): pygame.draw.ellipse(screen,(50,60,80),(i*170,40+i*10,120,40))
    # Дощ
    for r in rain: pygame.draw.line(screen,(100,160,220),(int(r["x"]),int(r["y"])),(int(r["x"])+2,int(r["y"])+8),1)
    # Сніг
    for s in snow: pygame.draw.circle(screen,(200,220,255),(int(s["x"]),int(s["y"])),s["r"])
    # Платформи
    tc=WEATHER_TILE[weather]
    for plt in platforms: pygame.draw.rect(screen,tc,plt,border_radius=4)
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),12)
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    screen.blit(font.render(f"{WEATHER_NAMES[weather]}  Score:{score}  W=зміна погоди  SPACE=стрибок",True,(255,255,255)),(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 121,
        title: { uk: "Ефекти частинок 2", ru: "Эффекты частиц 2" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Ефекти частинок 2</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Эффекты частиц 2</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай частинкові ефекти у власний платформер.", ru:"⭐⭐ Добавь частинкові ефекти в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 121 — Ефекти частинок 2 (вогонь, вибух, слід)
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Ефекти частинок 2"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(120,370,150,18),pygame.Rect(380,290,130,18),pygame.Rect(600,210,140,18)]

class Particle:
    def __init__(self,x,y,kind="dust"):
        self.x=float(x); self.y=float(y); self.kind=kind; self.life=1.0; self.alive=True
        if kind=="dust": self.vx=random.uniform(-3,3); self.vy=random.uniform(-3,-0.5); self.col=(180,160,120); self.size=random.randint(2,5); self.decay=0.05
        elif kind=="fire": self.vx=random.uniform(-1.5,1.5); self.vy=random.uniform(-4,-1.5); self.size=random.randint(4,10); self.decay=0.04; self.col=(255,random.randint(80,180),0)
        elif kind=="spark": self.vx=random.uniform(-8,8); self.vy=random.uniform(-8,-1); self.col=(255,220,80); self.size=2; self.decay=0.07
        elif kind=="trail": self.vx=random.uniform(-0.5,0.5); self.vy=random.uniform(-1,0.5); self.col=(80,150,255); self.size=4; self.decay=0.1
        elif kind=="snow": self.vx=random.uniform(-0.5,0.5); self.vy=random.uniform(0.5,2); self.col=(200,220,255); self.size=random.randint(2,5); self.decay=0.008
    def update(self):
        self.x+=self.vx; self.y+=self.vy; self.life-=self.decay
        if self.kind in("dust","spark"): self.vy+=0.15
        if self.kind=="fire": self.vy-=0.05
        if self.life<=0: self.alive=False
    def draw(self,surf):
        a=max(0,int(self.life*255))
        r,g,b=self.col; sz=max(1,int(self.size*self.life))
        s=pygame.Surface((sz*2,sz*2),pygame.SRCALPHA)
        pygame.draw.circle(s,(r,g,b,a),(sz,sz),sz)
        surf.blit(s,(int(self.x)-sz,int(self.y)-sz))

particles=[]; fire_src=[(300,FLOOR),(500,FLOOR)]; trail_enabled=False
px,py=80.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
score=0; tick=0; coins=[{"x":250.0,"y":350.0,"got":False},{"x":500.0,"y":268.0,"got":False},{"x":660.0,"y":190.0,"got":False}]

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_t: trail_enabled=not trail_enabled
            if ev.key==pygame.K_e:  # вибух
                for _ in range(40): particles.append(Particle(px,py,"spark"))
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px))
    prev_g=on_ground; on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    # Пил при приземленні
    if on_ground and not prev_g:
        for _ in range(6): particles.append(Particle(px,py,"dust"))
    # Слід
    if trail_enabled and abs(vx)>1:
        if tick%3==0: particles.append(Particle(px,py,"trail"))
    # Вогонь (постійно)
    if tick%2==0:
        for fx,fy in fire_src: particles.append(Particle(fx+random.uniform(-10,10),fy,"fire"))
    # Сніг
    if tick%4==0 and len(particles)<200: particles.append(Particle(random.uniform(0,W),0,"snow"))
    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26:
            c["got"]=True; score+=10
            for _ in range(15): particles.append(Particle(c["x"],c["y"],"spark"))
    for p in particles[:]:
        p.update()
        if not p.alive: particles.remove(p)

    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for p in particles: p.draw(screen)
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),12)
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    screen.blit(font.render(f"Score:{score}  SPACE=стрибок  T=слід({'ВКЛ' if trail_enabled else 'ВИКЛ'})  E=вибух",True,(180,180,220)),(8,8))
    screen.blit(font.render(f"Частинок: {len(particles)}",True,(100,200,150)),(8,H-30))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 122,
        title: { uk: "Фінальний бос платформера", ru: "Финальный босс" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Фінальний бос платформера</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Финальный босс платформера</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай фінального боса у власний платформер.", ru:"⭐⭐ Добавь фінального боса в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 122 — Фінальний бос (2 фази)
import pygame,sys,math,random
pygame.init()
W,H=800,560; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Фінальний бос"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True); font_big=pygame.font.SysFont("Arial",36,bold=True)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(40,460,120,18),pygame.Rect(340,420,120,18),pygame.Rect(640,460,120,18),pygame.Rect(190,370,100,18),pygame.Rect(510,370,100,18)]

class FinalBoss:
    def __init__(self):
        self.x=float(W//2); self.y=float(FLOOR-70); self.vx=2.0; self.hp=8; self.max_hp=8
        self.phase=1; self.timer=0; self.iframes=0; self.sz=64; self.alive=True
        self.proj=[]; self.bombs=[]; self.particles=[]
    def update(self,px,py):
        self.timer+=1; self.iframes=max(0,self.iframes-1)
        if self.hp<=4 and self.phase==1:
            self.phase=2; self.vx=0  # фаза 2: зупиняється і стріляє серіями
        if self.phase==1:
            self.x+=self.vx; self.y+=GRAVITY
            if self.x<self.sz//2+40 or self.x>W-self.sz//2-40: self.vx*=-1
            if self.y>=FLOOR-self.sz//2: self.y=float(FLOOR-self.sz//2)
            if self.timer%60==0:
                dx=px-self.x; dy=py-self.y; d=max(1,(dx**2+dy**2)**0.5)
                self.proj.append({"x":self.x,"y":self.y,"vx":dx/d*5,"vy":dy/d*5,"life":100})
        else:  # фаза 2: у повітрі + спалах снарядів
            ht=60+int(math.sin(self.timer*0.04)*30); self.y=float(FLOOR-self.sz//2-ht)
            self.x=W//2+int(math.sin(self.timer*0.02)*240)
            if self.timer%30==0:  # 8 снарядів по колу
                for i in range(8):
                    a=math.radians(i*45+self.timer*2); spd=4
                    self.proj.append({"x":self.x,"y":self.y,"vx":math.cos(a)*spd,"vy":math.sin(a)*spd,"life":80})
            if self.timer%90==0:  # бомба падає
                self.bombs.append({"x":px+random.uniform(-60,60),"y":self.y,"vy":0,"r":12,"exploded":False,"timer":0})
        for p in self.proj[:]:
            p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["life"]-=1
            if p["life"]<=0: self.proj.remove(p)
        for b in self.bombs[:]:
            if not b["exploded"]: b["y"]+=b["vy"]; b["vy"]+=GRAVITY
            if b["y"]>=FLOOR: b["exploded"]=True
            b["timer"]+=1
            if b["exploded"] and b["timer"]>30: self.bombs.remove(b)
        for p in self.particles[:]:
            p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.15; p["life"]-=3
            if p["life"]<=0: self.particles.remove(p)
    def hit(self):
        if self.iframes>0: return False
        self.hp-=1; self.iframes=35
        if self.hp<=0:
            self.alive=False
            for _ in range(60): self.particles.append({"x":self.x+random.uniform(-40,40),"y":self.y,"vx":random.uniform(-10,10),"vy":random.uniform(-14,2),"col":(random.randint(200,255),random.randint(100,200),0),"life":random.randint(40,100)})
        return True
    def draw(self,surf):
        for p in self.particles: pygame.draw.circle(surf,p["col"],(int(p["x"]),int(p["y"])),4)
        if not self.alive: return
        flash=self.iframes>0 and self.iframes%4<2
        if not flash:
            col=(180,40,40) if self.phase==1 else (180,60,180)
            sz=self.sz//2
            pygame.draw.circle(surf,col,(int(self.x),int(self.y)),sz)
            # Тіло з шипами
            for i in range(6):
                a=math.radians(i*60+self.timer*1.5)
                sx2=int(self.x+math.cos(a)*(sz+14)); sy2=int(self.y+math.sin(a)*(sz+14))
                pygame.draw.circle(surf,(220,80,40) if self.phase==1 else (220,40,220),(sx2,sy2),7)
            # Очі
            for ox in [-18,18]: pygame.draw.circle(surf,(255,255,0),(int(self.x)+ox,int(self.y)-12),10)
            for ox in [-18,18]: pygame.draw.circle(surf,(30,10,0),(int(self.x)+ox+3*(1 if ox>0 else -1),int(self.y)-10),5)
        # HP Bar
        bw=160; hpw=int(bw*max(0,self.hp)/self.max_hp)
        pygame.draw.rect(surf,(40,0,0),(W//2-80,15,bw,16),border_radius=6)
        pygame.draw.rect(surf,(220,40,40) if self.phase==1 else (180,40,200),(W//2-80,15,hpw,16),border_radius=6)
        surf.blit(font.render(f"БОС HP {self.hp}/{self.max_hp}  Фаза {self.phase}",True,(255,200,200)),(W//2-80,35))
        for p in self.proj: pygame.draw.circle(surf,(255,140,40) if self.phase==1 else (220,100,255),(int(p["x"]),int(p["y"])),7)
        for b in self.bombs:
            if not b["exploded"]: pygame.draw.circle(surf,(60,60,60),(int(b["x"]),int(b["y"])),b["r"])
            else:
                r=min(50,b["timer"]*5)
                s=pygame.Surface((r*2,r*2),pygame.SRCALPHA); pygame.draw.circle(s,(255,140,40,max(0,200-b["timer"]*6)),(r,r),r)
                surf.blit(s,(int(b["x"])-r,FLOOR-r))

boss=FinalBoss()
px,py=100.0,float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0; hp=4; iframes=0; won=False

while True:
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False; iframes=max(0,iframes-1)
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    if boss.alive:
        boss.update(px,py)
        br=pygame.Rect(int(boss.x)-boss.sz//2,int(boss.y)-boss.sz//2,boss.sz,boss.sz)
        if pr.colliderect(br):
            if vy>0 and pr.bottom<br.centery+5: boss.hit(); vy=JUMP*0.75
            elif iframes==0: hp-=1; iframes=80; vx=-vx; vy=-8
        for p in boss.proj[:]:
            if pr.colliderect(pygame.Rect(int(p["x"])-7,int(p["y"])-7,14,14)) and iframes==0:
                hp-=1; iframes=60; boss.proj.remove(p); break
        for b in boss.bombs:
            if b["exploded"] and not b.get("dmg_done") and abs(px-b["x"])<60 and abs(py-FLOOR)<80 and iframes==0:
                hp-=1; iframes=80; b["dmg_done"]=True
    else: won=True

    screen.fill((20,5,20) if boss.alive and boss.phase==2 else (15,10,30))
    for plt in platforms: pygame.draw.rect(screen,(60,160,80) if plt.h>30 else (100,80,50),plt,border_radius=4)
    boss.draw(screen)
    col=(255,80,80) if iframes>0 and iframes%6<3 else (80,200,255)
    pygame.draw.rect(screen,col,pr,border_radius=7)
    screen.blit(font.render(f"HP:{'❤'*max(0,hp)}  Стрибок ЗВЕРХУ = удар!",True,(255,255,255)),(8,H-30))
    if won:
        screen.blit(font_big.render("🏆 ПЛАТФОРМЕР ПРОЙДЕНО! МОЛОДЕЦЬ!",True,(255,220,0)),font_big.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2-30)))
    if hp<=0 and boss.alive: screen.blit(font_big.render("💀 GAME OVER",True,(255,60,60)),font_big.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2)))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 123,
        title: { uk: "Магазин та покращення гравця", ru: "Магазин и улучшения" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Магазин та покращення гравця</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Магазин и улучшения игрока</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай магазин та покращення у власний платформер.", ru:"⭐⭐ Добавь магазин та покращення в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 123 — Магазин та покращення гравця
import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Магазин покращень"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True); font_sm=pygame.font.SysFont("Arial",17)
GRAVITY=0.55; FLOOR=H-60

UPGRADES=[
  {"name":"Подвійний стрибок","key":"double_jump","cost":30,"bought":False,"desc":"2 стрибки у повітрі"},
  {"name":"Щит","key":"shield","cost":50,"bought":False,"desc":"Вдвічі більше HP"},
  {"name":"Швидкість","key":"speed","cost":20,"bought":False,"desc":"Макс швидкість +3"},
  {"name":"Монет-магніт","key":"magnet","cost":40,"bought":False,"desc":"Монети притягуються"},
]
platforms=[pygame.Rect(0,FLOOR,W,60),pygame.Rect(80,385,100,18),pygame.Rect(280,315,120,18),pygame.Rect(490,245,110,18),pygame.Rect(650,175,100,18)]
coins_init=[(160,365),(200,365),(340,293),(380,293),(550,222),(590,222),(710,152),(750,152)]

def reset():
    global px,py,vx,vy,on_ground,coyote,jump_buf,coins,hp,max_hp,dj,score,state,shop_sel
    ups={u["key"]:u["bought"] for u in UPGRADES}
    max_hp=6 if ups.get("shield") else 3; hp=max_hp
    px,py=80.0,float(FLOOR-50); vx=vy=0; on_ground=False; coyote=jump_buf=0
    dj=False  # double jump used
    coins=[{"x":float(x),"y":float(y),"got":False} for x,y in coins_init]
    state="playing"; shop_sel=0

score=0; reset(); state="menu"; shop_sel=0; tick=0; coins_total=0

while True:
    tick+=1
    events=pygame.event.get()
    for ev in events:
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
    keys_pressed=[ev.key for ev in events if ev.type==pygame.KEYDOWN]
    if state=="shop":
        if pygame.K_UP in keys_pressed: shop_sel=(shop_sel-1)%len(UPGRADES)
        if pygame.K_DOWN in keys_pressed: shop_sel=(shop_sel+1)%len(UPGRADES)
        if pygame.K_RETURN in keys_pressed or pygame.K_SPACE in keys_pressed:
            u=UPGRADES[shop_sel]
            if not u["bought"] and coins_total>=u["cost"]: u["bought"]=True; coins_total-=u["cost"]
        if pygame.K_ESCAPE in keys_pressed or pygame.K_p in keys_pressed: reset()
        screen.fill((5,8,20))
        screen.blit(font.render(f"🛒 МАГАЗИН  Монет: {coins_total}",True,(255,220,60)),(W//2-140,30))
        for i,u in enumerate(UPGRADES):
            sel=i==shop_sel; bg=(25,35,70) if sel else (15,20,45)
            x=W//2-200; y=100+i*80
            pygame.draw.rect(screen,bg,(x,y,400,68),border_radius=8)
            if sel: pygame.draw.rect(screen,(80,100,180),(x,y,400,68),2,border_radius=8)
            col=(100,200,100) if u["bought"] else ((255,220,60) if sel else (180,180,200))
            screen.blit(font.render(f"{'✅' if u['bought'] else f'{u[chr(34)+chr(99)+chr(111)+chr(115)+chr(116)+chr(34)]}🪙'} {u['name']}",True,col),(x+12,y+8))
            screen.blit(font_sm.render(u["desc"],True,(130,130,170)),(x+12,y+36))
        screen.blit(font_sm.render("↑↓ вибір  ENTER купити  ESC/P грати",True,(100,100,160)),(W//2-170,H-30))
        pygame.display.flip(); clock.tick(60); continue
    if pygame.K_p in keys_pressed: state="shop"; continue
    if state=="playing":
        jump_buf_set=pygame.K_SPACE in keys_pressed
        if jump_buf_set: jump_buf=8
        spd_max=9 if any(u["key"]=="speed" and u["bought"] for u in UPGRADES) else 6
        keys=pygame.key.get_pressed()
        if keys[pygame.K_RIGHT]: vx=min(vx+0.8,spd_max)
        elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-spd_max)
        else: vx*=0.84
        if on_ground: coyote=6; dj=False
        elif coyote>0: coyote-=1
        if jump_buf>0:
            jump_buf-=1
            dj_ok=any(u["key"]=="double_jump" and u["bought"] for u in UPGRADES)
            if coyote>0 or on_ground: vy=-13; coyote=0; jump_buf=0
            elif dj_ok and not dj: vy=-11; dj=True; jump_buf=0
        vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(16,min(W-16,px)); on_ground=False
        pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
        for plt in platforms:
            if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
                py=float(plt.top-0.5); vy=0; on_ground=True
        mag=any(u["key"]=="magnet" and u["bought"] for u in UPGRADES)
        for c in coins:
            if mag and not c["got"]: dx=px-c["x"]; dy=py-c["y"]; d=max(1,(dx**2+dy**2)**0.5); c["x"]+=dx/d*min(3,120/max(1,d)); c["y"]+=dy/d*min(3,120/max(1,d))
            if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26: c["got"]=True; score+=10; coins_total+=1
        if py>H+50: state="shop"

    screen.fill((15,20,40))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),11)
    pygame.draw.rect(screen,(80,200,255),pygame.Rect(int(px)-16,int(py)-38,32,38),border_radius=7)
    screen.blit(font.render(f"Score:{score}  🪙{coins_total}  HP:{'❤'*hp}  P=магазин  SPACE=стрибок",True,(255,255,255)),(8,8))
    ups_txt=" ".join(f"[{u['name'].split()[0]}]" for u in UPGRADES if u["bought"])
    if ups_txt: screen.blit(font_sm.render(f"Покращення: {ups_txt}",True,(100,200,100)),(8,H-28))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 124,
        title: { uk: "Балансування гри", ru: "Балансировка игры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Балансування гри</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Балансировка игры</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай балансування параметрів у власний платформер.", ru:"⭐⭐ Добавь балансування параметрів в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 124 — Балансування гри: живе налаштування
import pygame,sys,math,random
pygame.init()
W,H=900,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Балансування параметрів"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",18,bold=True); font_sm=pygame.font.SysFont("Arial",15)

# ── ПАРАМЕТРИ для балансування ────────────────────────────────
PARAMS=[
  {"name":"Gravity","val":0.55,"min":0.1,"max":2.0,"step":0.05},
  {"name":"Jump power","val":13.0,"min":5.0,"max":20.0,"step":0.5},
  {"name":"Max speed","val":6.0,"min":2.0,"max":15.0,"step":0.5},
  {"name":"Acceleration","val":0.8,"min":0.2,"max":3.0,"step":0.1},
  {"name":"Friction","val":0.84,"min":0.5,"max":0.99,"step":0.01},
]
sel_param=0; PANEL_W=240
FLOOR=H-60

platforms=[pygame.Rect(PANEL_W,FLOOR,W-PANEL_W,60),pygame.Rect(PANEL_W+100,360,130,18),pygame.Rect(PANEL_W+320,280,130,18),pygame.Rect(PANEL_W+520,200,140,18)]

def G(): return PARAMS[0]["val"]
def JUMP(): return -PARAMS[1]["val"]
def MAXSPD(): return PARAMS[2]["val"]
def ACC(): return PARAMS[3]["val"]
def FRIC(): return PARAMS[4]["val"]

px,py=float(PANEL_W+80),float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0
tick=0; playtest_note=""

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_UP and sel_param>0: sel_param-=1
            if ev.key==pygame.K_DOWN and sel_param<len(PARAMS)-1: sel_param+=1
            if ev.key==pygame.K_RIGHT:
                p=PARAMS[sel_param]; p["val"]=min(p["max"],round(p["val"]+p["step"],3))
            if ev.key==pygame.K_LEFT:
                p=PARAMS[sel_param]; p["val"]=max(p["min"],round(p["val"]-p["step"],3))
            if ev.key==pygame.K_r: px,py=float(PANEL_W+80),float(FLOOR-50); vx=vy=0
    keys=pygame.key.get_pressed()
    if keys[pygame.K_d]: vx=min(vx+ACC(),MAXSPD())
    elif keys[pygame.K_a]: vx=max(vx-ACC(),-MAXSPD())
    else: vx*=FRIC()
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP(); coyote=0; jump_buf=0
    vy=min(vy+G(),20); px+=vx; py+=vy; px=max(float(PANEL_W+16),min(float(W-16),px)); on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    if py>H+50: px,py=float(PANEL_W+80),float(FLOOR-50); vx=vy=0; playtest_note="Гравець впав! Відрегулюй параметри."

    # Ігрова зона
    screen.fill((10,15,35))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    screen.blit(font.render("A/D=рух  SPACE=стрибок  R=скинути",True,(140,140,180)),(PANEL_W+8,8))
    if playtest_note: screen.blit(font_sm.render(playtest_note,True,(255,200,100)),(PANEL_W+8,H-28))
    # Панель параметрів
    pygame.draw.rect(screen,(8,12,28),(0,0,PANEL_W,H))
    pygame.draw.line(screen,(40,60,100),(PANEL_W,0),(PANEL_W,H),1)
    screen.blit(font.render("⚙️ ПАРАМЕТРИ",True,(200,200,255)),(8,8))
    screen.blit(font_sm.render("↑↓ вибір  ←→ зміна",True,(100,100,180)),(8,30))
    for i,p in enumerate(PARAMS):
        y=60+i*66; sel=i==sel_param
        pygame.draw.rect(screen,(20,30,55) if sel else (12,18,40),(4,y,PANEL_W-8,58),border_radius=6)
        if sel: pygame.draw.rect(screen,(60,90,160),(4,y,PANEL_W-8,58),1,border_radius=6)
        screen.blit(font.render(p["name"],True,(255,220,60) if sel else (160,160,200)),(10,y+4))
        val_pct=(p["val"]-p["min"])/(p["max"]-p["min"])
        bar_w=PANEL_W-28
        pygame.draw.rect(screen,(20,20,40),(12,y+28,bar_w,12),border_radius=4)
        pygame.draw.rect(screen,(80,180,255) if sel else (60,120,180),(12,y+28,int(bar_w*val_pct),12),border_radius=4)
        screen.blit(font_sm.render(f"{p['val']:.2f}  [{p['min']}-{p['max']}]",True,(180,200,220)),(12,y+44))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 125,
        title: { uk: "Оптимізація та продуктивність", ru: "Оптимизация и производительность" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Оптимізація та продуктивність</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Оптимизация и производительность</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай оптимізацію коду у власний платформер.", ru:"⭐⭐ Добавь оптимізацію коду в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 125 — Оптимізація: Sprite Groups, clock, профілювання
import pygame,sys,math,random,time
pygame.init()
W,H=900,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Оптимізація гри"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",18,bold=True); font_sm=pygame.font.SysFont("Arial",15)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60
PANEL_W=200

# ── Порівняння: 2 підходи до об'єктів ────────────────────────
class CoinSlow:  # Повільний підхід: Python list
    def __init__(self,x,y): self.x=x; self.y=y; self.got=False; self.bob=0
    def update(self,tick): self.bob=math.sin(tick*0.1+self.x)*4
    def draw(self,surf): pygame.draw.circle(surf,(255,210,0),(int(self.x),int(self.y+self.bob)),10)

class CoinFast(pygame.sprite.Sprite):  # Швидкий підхід: Sprite Group
    def __init__(self,x,y):
        super().__init__(); self.image=pygame.Surface((22,22),pygame.SRCALPHA)
        pygame.draw.circle(self.image,(255,210,0),(11,11),10); self.rect=self.image.get_rect(center=(x,y))
        self.base_y=y; self.got=False
    def update(self,tick=0): self.rect.centery=int(self.base_y+math.sin(tick*0.1+self.rect.x)*4)

use_sprites=False; tick=0; mode_switch_t=0
N_COINS=50  # скільки монет тестуємо

coins_slow=[CoinSlow(random.randint(PANEL_W,W),random.randint(50,FLOOR-30)) for _ in range(N_COINS)]
coins_fast=pygame.sprite.Group(*[CoinFast(random.randint(PANEL_W,W),random.randint(50,FLOOR-30)) for _ in range(N_COINS)])

platforms=[pygame.Rect(PANEL_W,FLOOR,W-PANEL_W,60),pygame.Rect(PANEL_W+100,370,120,18),pygame.Rect(PANEL_W+340,290,130,18),pygame.Rect(PANEL_W+540,210,130,18)]
px,py=float(PANEL_W+80),float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0

fps_history=[]; slow_ms_hist=[]; fast_ms_hist=[]
frame=0

while True:
    frame+=1; tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_s: use_sprites=not use_sprites
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; px=max(float(PANEL_W+16),min(float(W-16),px)); on_ground=False
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    # Вимірюємо час
    t0=time.perf_counter()
    if not use_sprites:
        for c in coins_slow: c.update(tick)
    t1=time.perf_counter(); slow_ms=(t1-t0)*1000
    t0=time.perf_counter()
    if use_sprites: coins_fast.update(tick)
    t1=time.perf_counter(); fast_ms=(t1-t0)*1000
    if frame%5==0:
        slow_ms_hist.append(slow_ms); fast_ms_hist.append(fast_ms)
        slow_ms_hist=slow_ms_hist[-20:]; fast_ms_hist=fast_ms_hist[-20:]
    fps=clock.get_fps(); fps_history.append(fps); fps_history=fps_history[-60:]

    screen.fill((10,15,35))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    if not use_sprites:
        for c in coins_slow: c.draw(screen)
    else:
        coins_fast.draw(screen)
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    screen.blit(font.render(f"SPACE=стрибок  S={'Sprites ✅' if use_sprites else 'List (повільний)'}",True,(180,180,220)),(PANEL_W+8,8))
    # Панель статистики
    pygame.draw.rect(screen,(8,12,28),(0,0,PANEL_W,H)); pygame.draw.line(screen,(40,60,100),(PANEL_W,0),(PANEL_W,H),1)
    screen.blit(font.render("📊 СТАТИСТИКА",True,(200,200,255)),(6,6))
    avg_fps=sum(fps_history)/max(1,len(fps_history))
    screen.blit(font_sm.render(f"FPS: {fps:.0f} (avg:{avg_fps:.0f})",True,(100,255,100) if avg_fps>50 else (255,200,80)),(6,32))
    screen.blit(font_sm.render(f"Монет: {N_COINS}",True,(180,180,220)),(6,52))
    sl=sum(slow_ms_hist)/max(1,len(slow_ms_hist))
    fs=sum(fast_ms_hist)/max(1,len(fast_ms_hist))
    screen.blit(font_sm.render(f"List update: {sl:.3f}ms",True,(255,160,80)),(6,76))
    screen.blit(font_sm.render(f"Sprite update: {fs:.3f}ms",True,(80,200,255)),(6,96))
    screen.blit(font_sm.render("S = перемикач підходу",True,(140,140,180)),(6,H-24))
    # FPS графік
    if len(fps_history)>2:
        pts=[(PANEL_W-len(fps_history)+i,H-30-int(f/60*60)) for i,f in enumerate(fps_history)]
        if len(pts)>1: pygame.draw.lines(screen,(80,200,100),False,pts,2)
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 126,
        title: { uk: "Тестування платформера", ru: "Тестирование платформера" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Тестування платформера</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Тестирование платформера</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай тестування гри у власний платформер.", ru:"⭐⭐ Добавь тестування гри в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 126 — Тестування: чекліст та debug режим
import pygame,sys,math,random
pygame.init()
W,H=900,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("Тестування платформера"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",17,bold=True); font_sm=pygame.font.SysFont("Arial",14)
GRAVITY=0.55; JUMP=-13.0; FLOOR=H-60; PANEL_W=220

platforms=[pygame.Rect(PANEL_W,FLOOR,W-PANEL_W,60),pygame.Rect(PANEL_W+80,385,100,18),pygame.Rect(PANEL_W+280,315,120,18),pygame.Rect(PANEL_W+490,245,110,18),pygame.Rect(PANEL_W+650,175,100,18)]
spikes=[pygame.Rect(PANEL_W+190,FLOOR-12,40,12)]
coins=[{"x":float(PANEL_W+160),"y":365.0,"got":False},{"x":float(PANEL_W+340),y:295.0,"got":False},{"x":float(PANEL_W+550),"y":225.0,"got":False}]

CHECKLIST=[
  ("Гравець стрибає", False),("Гравець рухається", False),("Колізія з платформами", False),
  ("Шипи знімають HP", False),("Монети збираються", False),("Гравець не виходить за межі", False),
  ("Gravity працює", False),("Coyote time", False),("Game over показується", False),
]
checks=list(CHECKLIST)
auto_checks=set(); px,py=float(PANEL_W+80),float(FLOOR-50); vx,vy=0.0,0.0; on_ground=False; coyote=0; jump_buf=0; hp=3; iframes=0; score=0; debug=True; tick=0
ever_moved=False; ever_jumped=False; ever_in_air=False; spike_hit=False

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_SPACE: jump_buf=8
            if ev.key==pygame.K_d: debug=not debug
            if ev.key==pygame.K_r: px,py=float(PANEL_W+80),float(FLOOR-50); hp=3; vx=vy=0
    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6); ever_moved=True
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6); ever_moved=True
    else: vx*=0.84
    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0; ever_jumped=True
    vy=min(vy+GRAVITY,18); px+=vx; py+=vy; on_ground=False
    # Межі
    in_bounds=(PANEL_W+16<=px<=W-16); px=max(float(PANEL_W+16),min(float(W-16),px))
    iframes=max(0,iframes-1)
    pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for plt in platforms:
        if pr.right>plt.left and pr.left<plt.right and pr.bottom>=plt.top and pr.bottom<=plt.top+abs(vy)+4 and vy>=0:
            py=float(plt.top-0.5); vy=0; on_ground=True
    if not on_ground: ever_in_air=True
    for sp in spikes:
        if pr.colliderect(sp) and iframes==0: hp=max(0,hp-1); iframes=90; spike_hit=True
    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26: c["got"]=True; score+=10
    if py>H+50: hp=0
    # Автовизначення успішних тестів
    auto=set()
    if ever_moved: auto.add("Гравець рухається")
    if ever_jumped: auto.add("Гравець стрибає")
    if ever_in_air: auto.add("Gravity працює"); auto.add("Coyote time")
    if on_ground: auto.add("Колізія з платформами")
    if spike_hit: auto.add("Шипи знімають HP")
    if any(c["got"] for c in coins): auto.add("Монети збираються")
    if in_bounds: auto.add("Гравець не виходить за межі")
    if hp<=0: auto.add("Game over показується")
    checks=[(name,True if name in auto else done) for name,done in CHECKLIST]

    screen.fill((10,15,35))
    for plt in platforms: pygame.draw.rect(screen,(60,180,80) if plt.h>30 else (120,90,50),plt,border_radius=4)
    for sp in spikes:
        for i in range(4): pygame.draw.polygon(screen,(200,60,60),[(sp.x+i*10,sp.bottom),(sp.x+i*10+5,sp.top),(sp.x+i*10+10,sp.bottom)])
    for c in coins:
        if not c["got"]: pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"])),11)
    pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
    if debug:
        pygame.draw.rect(screen,(255,80,80),pr,1)
        screen.blit(font_sm.render(f"px={int(px)} py={int(py)} vx={vx:.1f} vy={vy:.1f} on_g={on_ground}",True,(150,200,150)),(PANEL_W+4,H-20))
    screen.blit(font.render(f"HP:{'❤'*hp}  Score:{score}  SPACE=стрибок  D=debug  R=restart",True,(255,255,255)),(PANEL_W+8,8))
    # Чекліст
    pygame.draw.rect(screen,(8,12,28),(0,0,PANEL_W,H)); pygame.draw.line(screen,(40,60,100),(PANEL_W,0),(PANEL_W,H),1)
    screen.blit(font.render("✔ ЧЕКЛІСТ",True,(200,200,255)),(6,6))
    passed=sum(1 for _,d in checks if d)
    screen.blit(font_sm.render(f"{passed}/{len(checks)} пройдено",True,(100,255,100) if passed==len(checks) else (200,200,80)),(6,26))
    for i,(name,done) in enumerate(checks):
        col=(80,220,80) if done else (180,80,80); sym="✅" if done else "❌"
        screen.blit(font_sm.render(f"{sym} {name}",True,col),(4,50+i*38))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 127,
        title: { uk: "Пакування та публікація гри", ru: "Упаковка и публикация игры" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Пакування та публікація гри</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Упаковка и публикация игры</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай підготовку гри до публікації у власний платформер.", ru:"⭐⭐ Добавь підготовку гри до публікації в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 127 — Пакування та публікація гри
# Цей урок — покроковий гайд + приклад фінального меню

import pygame,sys,math,random
pygame.init()
W,H=800,500; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("МОЯ ГРА - Фінальна версія"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",24,bold=True); font_sm=pygame.font.SysFont("Arial",17)
font_big=pygame.font.SysFont("Arial",48,bold=True)

# ── КРОКИ ПУБЛІКАЦІЇ (відображаємо як слайди) ─────────────────
STEPS=[
  ("КРОК 1: Назви свою гру 🎮",
   ["• Дай своїй грі класну назву", "• Придумай автора: "by [твоє ім'я]"", "• Додай версію: v1.0"],
   (15,25,50)),
  ("КРОК 2: Фінальне тестування 🧪",
   ["• Пройди гру від початку до кінця", "• Перевір усі рівні та боса", "• Дай пограти другу — чи зрозуміло?"],
   (20,15,45)),
  ("КРОК 3: Скриншоти 📸",
   ["• Print Screen на кращих моментах", "• Збережи як cover.png", "• Можна використати Paint або Canva"],
   (10,25,40)),
  ("КРОК 4: Запакуй у ZIP 📦",
   ["• Файли: main.py, всі .py файли", "• Додай README.txt: 'Запусти main.py'", "• ZIP: Права кнопка → Надіслати в → ZIP"],
   (25,15,35)),
  ("КРОК 5: Поділися! 🚀",
   ["• itch.io — безкоштовна публікація ігор", "• GitHub — розмісти код", "• Покажи батькам, вчителям, друзям!"],
   (15,25,15)),
  ("МОЛОДЕЦЬ! Ти зробив гру! 🏆",
   ["• Програмування — це суперсила", "• Ти вже вмієш більше за більшість дорослих", "• Наступний крок: Pygame ООП або Unity!"],
   (20,20,0)),
]
slide=0; slide_t=0; particles=[]; stars=[{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":random.uniform(0.5,2)} for _ in range(80)]
tick=0

while True:
    tick+=1; slide_t+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key in(pygame.K_SPACE,pygame.K_RIGHT): slide=(slide+1)%len(STEPS); slide_t=0
            if ev.key==pygame.K_LEFT: slide=(slide-1)%len(STEPS); slide_t=0
    # Конфеті
    if tick%4==0:
        col=(random.randint(150,255),random.randint(100,255),random.randint(50,200))
        particles.append({"x":random.uniform(0,W),"y":0,"vx":random.uniform(-2,2),"vy":random.uniform(2,6),"col":col,"life":200,"r":random.randint(4,10),"rot":0,"drot":random.uniform(-0.2,0.2)})
    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.1; p["life"]-=2; p["rot"]+=p["drot"]
        if p["y"]>H or p["life"]<=0: particles.remove(p)

    bg=STEPS[slide][2]; screen.fill(bg)
    # Зірки
    for s in stars: pygame.draw.circle(screen,(100,100,150),(int(s["x"]),int(s["y"])),1)
    # Конфеті
    for p in particles:
        a=max(0,int(p["life"]/200*255))
        r=p["r"]; cs=pygame.Surface((r*2,r*2),pygame.SRCALPHA)
        pygame.draw.rect(cs,(*p["col"],a),(0,0,r*2,r))
        cs=pygame.transform.rotate(cs,math.degrees(p["rot"]))
        screen.blit(cs,(int(p["x"])-r,int(p["y"])-r))

    title,bullets,_=STEPS[slide]
    alpha=min(255,slide_t*8)
    r_val=int(128+127*abs(math.sin(tick*0.02)))
    t=font_big.render(title,True,(r_val,200,255-r_val))
    screen.blit(t,t.get_rect(center=(W//2,120)))
    for i,b in enumerate(bullets):
        y=210+i*55; ta=min(255,max(0,(slide_t-i*15)*12))
        screen.blit(font.render(b,True,(200,220,255)),font.render(b,True,(0,0,0)).get_rect(center=(W//2,y)))

    # Прогрес
    for i in range(len(STEPS)):
        col=(255,220,60) if i==slide else (60,60,100)
        pygame.draw.circle(screen,col,(W//2-int(len(STEPS)//2*30)+i*30,H-30),8 if i==slide else 5)
    screen.blit(font_sm.render("← → або SPACE для наступного кроку",True,(120,120,160)),(W//2-150,H-55))
    screen.blit(font_sm.render(f"Крок {slide+1}/{len(STEPS)}",True,(100,100,180)),(8,8))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 128,
        title: { uk: "Фінальний проект: повний платформер", ru: "Финальный проект: полный платформер" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Фінальний проект: повний платформер</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Финальный проект: полный платформер</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти код і опиши що бачиш.", ru:"⭐ Запусти код и опиши что видишь." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зміни 1 параметр і поясни ефект.", ru:"⭐ Измени 1 параметр и объясни эффект." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай фінальний платформер у власний платформер.", ru:"⭐⭐ Добавь фінальний платформер в свой платформер." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Налаштуй для кращого ігрового досвіду.", ru:"⭐⭐ Настрой для лучшего игрового опыта." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай ще один варіант цієї механіки.", ru:"⭐⭐ Добавь ещё один вариант этой механики." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Поєднай з монетами, ворогами або рівнями.", ru:"⭐⭐⭐ Совмести с монетами, врагами или уровнями." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай власну творчу деталь!", ru:"⭐⭐⭐⭐ Добавь свою творческую деталь!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй у свій платформер.", ru:"⭐⭐⭐⭐ Встрой в свой платформер." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 128 — Фінальний проект: ПОВНИЙ ПЛАТФОРМЕР
# Об'єднуємо ВСЕ що вивчили в модулі 7!
import pygame,sys,math,random,json,array
pygame.mixer.init(44100,-16,1,512); pygame.init()
W,H=800,520; screen=pygame.display.set_mode((W,H))
pygame.display.set_caption("МІЙ ПЛАТФОРМЕР v1.0"); clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",20,bold=True); font_sm=pygame.font.SysFont("Arial",16)
font_big=pygame.font.SysFont("Arial",42,bold=True)

def beep(f=440,d=0.1,v=0.2):
    n=int(44100*d); buf=array.array('h',[int(v*32767*math.sin(2*math.pi*f*i/44100)*max(0,1-i/n))for i in range(n)])
    return pygame.sndarray.make_sound(buf)
snd_jump=beep(523,0.12,0.25); snd_coin=beep(1047,0.07,0.2); snd_hit=beep(180,0.12,0.3)

GRAVITY=0.55; FLOOR=H-60
# ── 2 рівні через тайлмап ─────────────────────────────────────
TILE=40
LEVELS=[
["####################","#..................#","#..C...........C...#",
 "#.####..######.....#","#.C...C.....C......#","#..####...####.....#",
 "#.C.........C......#","#P...............D.#","####################"],
["####################","#.........C........#","#.####.######......#",
 "#.C...C....C.......#","#..##.####..####...#","#.C.......C.......#",
 "#..####.######.....#","#P...............D.#","####################"],
]
BG=[(15,25,50),(20,10,40)]

def load_level(n):
    global tiles,coins,door,spawn_pos,platforms_list
    tiles=[]; coins=[]; door=None; spawn_pos=(TILE,7*TILE); platforms_list=[]
    for row,line in enumerate(LEVELS[n]):
        for ci,ch in enumerate(line):
            x,y=ci*TILE,row*TILE
            if ch=='#': r=pygame.Rect(x,y,TILE,TILE); tiles.append(r); platforms_list.append(r)
            elif ch=='C': coins.append({"x":float(x+TILE//2),"y":float(y+TILE//2),"got":False})
            elif ch=='D': door=pygame.Rect(x,y,TILE,TILE)
            elif ch=='P': spawn_pos=(x+TILE//2,y+TILE//2)

def save_rec(sc):
    try:
        rec=0
        try:
            with open("plat_final.json") as f: rec=json.load(f).get("best",0)
        except: pass
        with open("plat_final.json","w") as f: json.dump({"best":max(rec,sc)},f)
        return max(rec,sc)
    except: return sc

level_num=0; load_level(0)
stars=[{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":random.uniform(0.5,1.5)} for _ in range(60)]
best=save_rec(0); state="menu"; menu_sel=0; MENU=["▶ ГРАТИ","🏆 РЕКОРД","❌ ВИЙТИ"]; tick=0

def new_game():
    global px,py,vx,vy,on_ground,coyote,jump_buf,hp,iframes,score,particles,level_num
    level_num=0; load_level(0); px,py=float(spawn_pos[0]),float(spawn_pos[1]); vx=vy=0
    on_ground=False; coyote=jump_buf=0; hp=3; iframes=0; score=0; particles=[]

new_game(); particles=[]

while True:
    tick+=1; events=pygame.event.get()
    keys_d=[ev.key for ev in events if ev.type==pygame.KEYDOWN]
    for ev in events:
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()

    # ── MENU ──────────────────────────────────────────────────
    if state=="menu":
        if pygame.K_UP in keys_d: menu_sel=(menu_sel-1)%3
        if pygame.K_DOWN in keys_d: menu_sel=(menu_sel+1)%3
        if pygame.K_RETURN in keys_d or pygame.K_SPACE in keys_d:
            if menu_sel==0: new_game(); state="playing"
            elif menu_sel==1: state="records"
            elif menu_sel==2: pygame.quit(); sys.exit()
        screen.fill((5,8,20))
        for s in stars: pygame.draw.circle(screen,(100,100,160),(int(s["x"]),int(s["y"])),1); s["y"]=(s["y"]+s["s"])%H
        r=int(128+127*abs(math.sin(tick*0.02)))
        t=font_big.render("МІЙ ПЛАТФОРМЕР",True,(r,200,255-r)); screen.blit(t,t.get_rect(center=(W//2,100)))
        for i,item in enumerate(MENU):
            sel=i==menu_sel; x=W//2-150; y=210+i*62
            pygame.draw.rect(screen,(30,35,70) if sel else (15,18,40),(x,y,300,48),border_radius=8)
            if sel: pygame.draw.rect(screen,(80,100,180),(x,y,300,48),2,border_radius=8)
            screen.blit(font.render(item,True,(255,220,60) if sel else (180,180,200)),font.render(item,True,(0,0,0)).get_rect(center=(W//2,y+24)))
        screen.blit(font_sm.render("↑↓ вибір  ENTER/SPACE вибрати",True,(100,100,160)),font_sm.render(".",True,(0,0,0)).get_rect(center=(W//2,H-20)))

    elif state=="records":
        if pygame.K_ESCAPE in keys_d: state="menu"
        screen.fill((5,8,20))
        screen.blit(font_big.render("🏆 РЕКОРДИ",True,(255,210,60)),font_big.render(".",True,(0,0,0)).get_rect(center=(W//2,80)))
        screen.blit(font.render(f"Найкращий рахунок: {best}",True,(255,255,200)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,200)))
        screen.blit(font_sm.render("ESC — назад",True,(150,150,200)),(W//2-60,H-40))

    elif state=="playing":
        if pygame.K_SPACE in keys_d: jump_buf=8; snd_jump.play()
        if pygame.K_ESCAPE in keys_d: best=save_rec(score); state="menu"
        if pygame.K_p in keys_d: state="paused"
        keys=pygame.key.get_pressed()
        if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
        elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
        else: vx*=0.85
        if on_ground: coyote=6
        elif coyote>0: coyote-=1
        if jump_buf>0:
            jump_buf-=1
            if coyote>0 or on_ground: vy=-13; coyote=0; jump_buf=0
        vy=min(vy+GRAVITY,18); iframes=max(0,iframes-1)
        px+=vx; pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
        for t in tiles:
            if pr.colliderect(t):
                if vx>0: px=float(t.left-16)
                else: px=float(t.right+16); vx=0; break
        px=max(16.0,min(float(W-16),px))
        py+=vy; on_ground=False; pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
        for t in tiles:
            if pr.colliderect(t):
                if vy>0: py=float(t.top-0.5); vy=0; on_ground=True
                elif vy<0: py=float(t.bottom+38); vy=0; break
        if py>H+50: hp=max(0,hp-1); iframes=90; px,py=float(spawn_pos[0]),float(spawn_pos[1]); vx=vy=0; snd_hit.play()
        for c in coins:
            if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26:
                c["got"]=True; score+=10; snd_coin.play()
                for _ in range(8): particles.append({"x":c["x"],"y":c["y"],"vx":random.uniform(-4,4),"vy":random.uniform(-5,-1),"col":(255,210,0),"life":25})
        if door and pr.colliderect(door):
            if level_num<len(LEVELS)-1:
                level_num+=1; load_level(level_num); px,py=float(spawn_pos[0]),float(spawn_pos[1]); vx=vy=0; score+=50
            else: best=save_rec(score); state="win"
        if hp<=0: best=save_rec(score); state="gameover"
        for p in particles[:]:
            p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.3; p["life"]-=2
            if p["life"]<=0: particles.remove(p)

        screen.fill(BG[level_num])
        for s in stars: pygame.draw.circle(screen,(80,90,130),(int(s["x"]),int(s["y"])),1)
        tc=(100,80,50) if level_num==0 else (80,60,80)
        for t in tiles: pygame.draw.rect(screen,tc,(t.x,t.y,TILE,TILE)); pygame.draw.rect(screen,(min(255,tc[0]+30),min(255,tc[1]+30),min(255,tc[2]+30)),(t.x,t.y,TILE,4))
        for c in coins:
            if not c["got"]: bob=math.sin(tick*0.08+c["x"])*3; pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"]+bob)),10)
        if door: pygame.draw.rect(screen,(80,220,100),(door.x,door.y,door.w,door.h),border_radius=4)
        for p in particles: pygame.draw.circle(screen,p["col"],(int(p["x"]),int(p["y"])),4)
        pygame.draw.rect(screen,(80,200,255),pr,border_radius=7)
        screen.blit(font.render(f"HP:{'❤'*hp}  Score:{score}  Рівень:{level_num+1}/{len(LEVELS)}  P=пауза",True,(255,255,255)),(8,8))

    elif state=="paused":
        if pygame.K_p in keys_d or pygame.K_ESCAPE in keys_d: state="playing"
        ov=pygame.Surface((W,H),pygame.SRCALPHA); ov.fill((0,0,0,150)); screen.blit(ov,(0,0))
        screen.blit(font_big.render("⏸ ПАУЗА",True,(255,220,60)),font_big.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2-30)))
        screen.blit(font.render("P або ESC — продовжити",True,(200,200,200)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2+30)))

    elif state in("gameover","win"):
        if pygame.K_r in keys_d: new_game(); state="playing"
        if pygame.K_ESCAPE in keys_d: state="menu"
        screen.fill((5,8,20))
        col=(220,50,50) if state=="gameover" else (255,200,0)
        screen.blit(font_big.render("💀 GAME OVER" if state=="gameover" else "🏆 ПЕРЕМОГА!",True,col),font_big.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2-60)))
        screen.blit(font.render(f"Score:{score}  Рекорд:{best}",True,(255,255,200)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2)))
        screen.blit(font_sm.render("R=знову  ESC=меню",True,(180,180,220)),font_sm.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2+60)))

    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 129,
        title: { uk: "Проект Модуля 7: Мій платформер", ru: "Проект Модуля 7: Мой платформер" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Продовжуємо будувати платформер. Тема уроку: <strong>Проект Модуля 7: Мій платформер</strong></p></div><div class="theory-block"><h3>📖 Як це працює</h3><p>Вивчи код нижче і додай цю механіку у свій платформер!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Продолжаем строить платформер. Тема урока: <strong>Проект Модуля 7: Мой платформер</strong></p></div><div class="theory-block"><h3>📖 Как это работает</h3><p>Изучи код ниже и добавь эту механику в свой платформер!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Придумай назву та головного героя свого платформера.", ru:"⭐ Придумай название и главного героя." }},
          { num:2, level:"easy", text:{ uk:"⭐ Намалюй на папері 3 рівні — де платформи, монети, вороги.", ru:"⭐ Нарисуй на бумаге 3 уровня." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Намалюй тайлмап для рівня 1 у коді.", ru:"⭐⭐ Нарисуй тайлмап уровня 1 в коде." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай персонажа з анімацією (squash/stretch).", ru:"⭐⭐ Добавь персонажа с анимацией." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай монети, шипи та чекпоінт.", ru:"⭐⭐ Добавь монеты, шипы и чекпоинт." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Повний рівень з боссом або магазином.", ru:"⭐⭐⭐ Полный уровень с боссом или магазином." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Меню, рекорди, звуки — повна гра!", ru:"⭐⭐⭐⭐ Меню, рекорды, звуки — полная игра!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Презентуй свою гру перед класом або батьками!", ru:"⭐⭐⭐⭐ Презентуй игру перед классом!" }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 129 — ПРОЕКТ МОДУЛЯ 7: Мій платформер
# ============================================================
# ЦЕЙ ФАЙЛ — ТВІЙ ШАБЛОН. Заміни [текст] на своє!
# Ти вже знаєш ВСЕ що потрібно для власної гри!
# ============================================================
import pygame,sys,math,random

pygame.init()
W,H=800,500
screen=pygame.display.set_mode((W,H))

# ── 🎮 НАЗВИ СВОЮ ГРУ ──────────────────────────────────────
GAME_TITLE="[НАЗВА ТВОЄЇ ГРИ]"  # ← Зміни!
AUTHOR="[ТВОЄ ІМ'Я]"
pygame.display.set_caption(f"{GAME_TITLE} by {AUTHOR}")
clock=pygame.time.Clock()
font=pygame.font.SysFont("Arial",22,bold=True)
font_sm=pygame.font.SysFont("Arial",17)
font_big=pygame.font.SysFont("Arial",44,bold=True)

GRAVITY=0.55
JUMP=-13.0
FLOOR=H-60

# ── 🗺️ ТВІЙ ТАЙЛМАП ────────────────────────────────────────
# Заміни крапки та # щоб створити свій рівень!
# '#'=земля 'C'=монета 'P'=старт 'D'=двері '.'=порожньо
MY_LEVEL="""
####################
#..................#
#..C......C........#
#.####..####.......#
#..C........C......#
#...####..####.....#
#..C...........C...#
#P...............D.#
####################
""".strip().splitlines()

TILE=40; tiles=[]; coins=[]; door=None; spawn=(80,400)
for row,line in enumerate(MY_LEVEL):
    for ci,ch in enumerate(line):
        x,y=ci*TILE,row*TILE
        if ch=='#': tiles.append(pygame.Rect(x,y,TILE,TILE))
        elif ch=='C': coins.append({"x":float(x+TILE//2),"y":float(y+TILE//2),"got":False})
        elif ch=='D': door=pygame.Rect(x,y,TILE,TILE)
        elif ch=='P': spawn=(x+TILE//2,y+TILE//2)

# ── 👤 ГРАВЕЦЬ ──────────────────────────────────────────────
px,py=float(spawn[0]),float(spawn[1]); vx,vy=0.0,0.0
on_ground=False; coyote=0; jump_buf=0; hp=3; score=0; iframes=0

# ── 🎨 КОЛІР ГРАВЦЯ (зміни!) ─────────────────────────────────
PLAYER_COLOR=(80,200,255)  # ← Синій за замовчуванням

# ── 🌈 КОЛІР ФОНУ ───────────────────────────────────────────
BG_COLOR=(15,25,50)  # ← Темно-синій

# ── 🧱 КОЛІР ПЛАТФОРМ ───────────────────────────────────────
TILE_COLOR=(100,80,50)  # ← Коричневий

tick=0

print(f"🎮 {GAME_TITLE} by {AUTHOR}")
print("Стрілки = рух, SPACE = стрибок")
print("Збирай монети, дістанься до дверей!")

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE: jump_buf=8

    keys=pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: vx=min(vx+0.8,6)
    elif keys[pygame.K_LEFT]: vx=max(vx-0.8,-6)
    else: vx*=0.85

    if on_ground: coyote=6
    elif coyote>0: coyote-=1
    if jump_buf>0:
        jump_buf-=1
        if coyote>0 or on_ground: vy=JUMP; coyote=0; jump_buf=0
    vy=min(vy+GRAVITY,18); iframes=max(0,iframes-1)

    # ── Фізика з тайлмапом ──────────────────────────────────
    px+=vx; pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for t in tiles:
        if pr.colliderect(t):
            if vx>0: px=float(t.left-16)
            else: px=float(t.right+16)
            vx=0; break
    px=max(16.0,min(float(W-16),px))

    py+=vy; on_ground=False; pr=pygame.Rect(int(px)-16,int(py)-38,32,38)
    for t in tiles:
        if pr.colliderect(t):
            if vy>0: py=float(t.top-0.5); vy=0; on_ground=True
            elif vy<0: py=float(t.bottom+38); vy=0
            break

    if py>H+50: px,py=float(spawn[0]),float(spawn[1]); vx=vy=0; hp=max(0,hp-1)

    for c in coins:
        if not c["got"] and abs(px-c["x"])<22 and abs(py-c["y"])<26:
            c["got"]=True; score+=10

    won=door and pr.colliderect(door)

    # ── Малювання ───────────────────────────────────────────
    screen.fill(BG_COLOR)

    for t in tiles:
        pygame.draw.rect(screen,TILE_COLOR,(t.x,t.y,TILE,TILE))
        pygame.draw.rect(screen,(min(255,TILE_COLOR[0]+30),min(255,TILE_COLOR[1]+30),min(255,TILE_COLOR[2]+30)),(t.x,t.y,TILE,4))

    for c in coins:
        if not c["got"]:
            bob=math.sin(tick*0.08+c["x"])*3
            pygame.draw.circle(screen,(255,210,0),(int(c["x"]),int(c["y"]+bob)),11)

    if door:
        pygame.draw.rect(screen,(80,220,100),(door.x,door.y,door.w,door.h),border_radius=4)

    # Гравець
    col=PLAYER_COLOR if iframes==0 or iframes%6<3 else (255,80,80)
    pygame.draw.rect(screen,col,pr,border_radius=7)

    # HUD
    screen.blit(font.render(f"HP:{'❤'*hp}  Score:{score}  SPACE=стрибок",True,(255,255,255)),(8,8))
    screen.blit(font_sm.render(f"{GAME_TITLE} by {AUTHOR}",True,(100,120,180)),(8,H-28))

    if won:
        t=font_big.render("🏆 РІВЕНЬ ПРОЙДЕНО!",True,(255,220,0))
        screen.blit(t,t.get_rect(center=(W//2,H//2-20)))
        screen.blit(font.render(f"Score: {score}",True,(255,255,200)),font.render(".",True,(0,0,0)).get_rect(center=(W//2,H//2+30)))

    if hp<=0:
        t=font_big.render("💀 СПРОБУЙ ЩЕ РАЗ!",True,(255,60,60))
        screen.blit(t,t.get_rect(center=(W//2,H//2)))

    pygame.display.flip()
    clock.tick(60)

# ============================================================
# 🚀 ТВОЄ ЗАВДАННЯ: Зроби цю гру СВОЄЮ!
#
# ✅ Ідеї для покращення:
#   - Зміни тайлмап — намалюй складніший рівень
#   - Додай ворогів з уроку 105
#   - Додай боса з уроку 114
#   - Додай звуки з уроку 108
#   - Додай меню з уроку 110
#   - Збережи рекорд з уроку 109
#   - Додай свій власний секрет!
#
# 🎮 Покажи свою гру друзям і батькам!
# ============================================================
`
      }

    ]
  },
  {
    moduleId: 8,
    moduleTitle: { uk: "Великий Проект", ru: "Большой Проект" },
    moduleIcon: "🌟",
    lessons: [
      {
        id: 130,
        title: { uk: "Починаємо Великий Проект!", ru: "Начинаем Большой Проект!" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Згадай усі 7 модулів — що ти вивчав?<br>1. Яку техніку з Модуля 7 запам'ятав найкраще?<br>2. Що давалося найважче за весь курс?<br>3. Яку гру мрієш зробити?</p></div><div class="theory-block"><h3>📖 Що ти вже вмієш</h3><ul><li>📦 <b>Модуль 1</b> — print(), змінні, if/else, цикли for/while</li><li>🐢 <b>Модуль 2</b> — turtle: рух, кольори, функції, random</li><li>✨ <b>Модуль 3</b> — анімація, onkey(), колізії</li><li>🎮 <b>Модуль 4</b> — ігровий цикл, рахунок, кілька черепашок</li><li>🕹️ <b>Модуль 5</b> — pygame: вікно, draw, ігровий цикл</li><li>🎯 <b>Модуль 6</b> — персонаж, вороги, colliderect, HUD</li><li>🏃 <b>Модуль 7</b> — гравітація, тайлмап, камера, звук, партиклі</li></ul><p>Ти вже вмієш дуже багато — час зробити ВЛАСНИЙ шедевр!</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Вспомни все 7 модулей!<br>1. Какую технику из Модуля 7 запомнил лучше всего?<br>2. Что давалось сложнее всего?<br>3. Какую игру мечтаешь сделать?</p></div><div class="theory-block"><h3>📖 Что ты уже умеешь</h3><ul><li>📦 <b>Модуль 1</b> — переменные, if/else, циклы</li><li>🐢 <b>Модуль 2</b> — turtle: движение, цвета, функции</li><li>✨ <b>Модуль 3</b> — анимация, onkey(), коллизии</li><li>🎮 <b>Модуль 4</b> — игровой цикл, счёт</li><li>🕹️ <b>Модуль 5</b> — pygame: окно, draw, цикл</li><li>🎯 <b>Модуль 6</b> — персонаж, враги, HUD</li><li>🏃 <b>Модуль 7</b> — гравитация, тайлмап, камера, звук</li></ul><p>Ты уже умеешь очень многое — пора сделать СОБСТВЕННЫЙ шедевр!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Заповни змінні: своє ім'я, тип проекту, назву, опис одним реченням.", ru:"⭐ Заполни переменные: имя, тип проекта, название, описание." }},
          { num:2, level:"easy", text:{ uk:"⭐ У словнику механіки постав '✓' або '✗' для кожного пункту.", ru:"⭐ В словаре механик поставь '✓' или '✗' для каждого пункта." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Намалюй на папері SKETCH головного екрану гри.", ru:"⭐⭐ Нарисуй на бумаге скетч главного экрана игры." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Відкрий новий .py файл і зроби pygame-вікно 600×400 з назвою твоєї гри.", ru:"⭐⭐ Открой новый .py и сделай pygame-окно 600×400 с названием игры." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Додай у вікно текст з назвою гри по центру через pygame.font.", ru:"⭐⭐ Добавь текст с названием игры по центру через pygame.font." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Намалюй у вікні головного персонажа в стартовій позиції.", ru:"⭐⭐⭐ Нарисуй главного персонажа в стартовой позиции." }},
          { num:7, level:"hard", text:{ uk:"⭐⭐⭐ Зроби щоб персонаж рухався стрілками і не виходив за межі.", ru:"⭐⭐⭐ Сделай чтобы персонаж двигался стрелками без выхода за границы." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай перший елемент геймплею: ворога, монету або платформу.", ru:"⭐⭐⭐⭐ Добавь первый элемент геймплея: врага, монету или платформу." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 130 — Починаємо Великий Проект!
import pygame, sys
pygame.init()

МОЄ_ІМЯ = "[твоє ім'я]"
ТИП_ПРОЕКТУ = "[твій вибір]"
НАЗВА_ПРОЕКТУ = "[придумай назву]"
ОПИС = "[що гравець робить у грі?]"

механіки = {
    "Рух персонажа (клавіші)":  "?",
    "Вороги / перешкоди":       "?",
    "Колізії (зіткнення)":      "?",
    "Рахунок / очки":           "?",
    "Рівні / екрани":           "?",
    "Таймер":                   "?",
    "Звуки":                    "?",
    "Анімація / партиклі":      "?",
}

print(f"ПРОЕКТ: {НАЗВА_ПРОЕКТУ}")
print(f"Автор: {МОЄ_ІМЯ}")
print(f"Тип: {ТИП_ПРОЕКТУ}")
print(f"Опис: {ОПИС}")
print("Механіки:")
for назва, вибір in механіки.items():
    print(f"  {вибір}  {назва}")
`
      },
      {
        id: 131,
        title: { uk: "Вибір теми Великого Проекту", ru: "Выбор темы Большого Проекта" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Модуль 7 — це твій ВЛАСНИЙ великий проект від початку до кінця. Ти вже знаєш все що потрібно!</p></div><div class="theory-block"><h3>🗺️ Як обрати тему</h3><ul><li>🎮 Гра: платформер, шутер, головоломка, стратегія</li><li>🎨 Інтерактивне мистецтво: генеративний малюнок, аудіовізуалізація</li><li>🧮 Утиліта: калькулятор, тест-програма, словник</li><li>🤖 Симуляція: флокінг, фізика, клітинний автомат</li></ul><p>Обери те що ТЕБЕ цікавить — тільки так вийде крутий проект!</p></div><div class="theory-block hint"><h3>💡 Критерії гарного проекту</h3><ul><li>Можна грати/використовувати 5+ хвилин без нудьги</li><li>Є мета та прогрес</li><li>Ти можеш пояснити код іншому</li><li>Є хоча б одна 'родзинка'</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Модуль 7 — это твой СОБСТВЕННЫЙ большой проект от начала до конца. Ты уже знаешь всё что нужно!</p></div><div class="theory-block"><h3>🗺️ Как выбрать тему</h3><ul><li>🎮 Игра: платформер, шутер, головоломка, стратегия</li><li>🎨 Интерактивное искусство: генеративный рисунок, аудиовизуализация</li><li>🧮 Утилита: калькулятор, тест-программа, словарь</li><li>🤖 Симуляция: флокинг, физика, клеточный автомат</li></ul><p>Выбери то что ТЕБЯ интересует — тогда сделаешь лучше!</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запиши 3 ідеї проекту. Для кожної — одне речення опису.", ru:"⭐ Запиши 3 идеи проекта." }},
          { num:2, level:"easy", text:{ uk:"⭐ Обери одну ідею і намалюй скетч на папері.", ru:"⭐ Выбери идею и нарисуй скетч." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Напиши Design Document (назва, жанр, механіка, мета, Game Over, особливість).", ru:"⭐⭐ Напиши Design Document." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Визнач 5 головних функцій які ТОЧНО будуть у грі.", ru:"⭐⭐ 5 главных функций которые точно будут." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Обговори ідею з вчителем та отримай \'зелене світло\'.", ru:"⭐⭐ Обсуди идею с учителем." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Визнач що ТОЧНО не буде в MVP (мінімальній версії).", ru:"⭐⭐⭐ Что точно НЕ будет в MVP." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Склади plan розробки: 8 уроків → 8 кроків до фінальної версії.", ru:"⭐⭐⭐⭐ План разработки: 8 уроков = 8 шагов." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Знайди 2 схожі гри в інтернеті та запиши що в них крутого.", ru:"⭐⭐⭐⭐ 2 похожих игры — что в них крутого." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 131 — Вибір теми Великого Проекту
# Цей файл — шаблон Design Document для ТВОГО проекту
# Заповни всі [поля в дужках]

# ╔══════════════════════════════════════════════════════════╗
# ║  DESIGN DOCUMENT: [НАЗВА ПРОЕКТУ]                       ║
# ║  Автор: [Твоє ім'я]   Дата: [дата]                     ║
# ╚══════════════════════════════════════════════════════════╝

# ── Загальна концепція ────────────────────────────────────
# Жанр:        [гра / арт / утиліта / симуляція]
# Опис:        [одне речення що таке твій проект]
# Мета гравця: [що треба робити щоб перемогти?]
# Game Over:   [коли гравець програє?]
# Особливість: [одна деталь якої немає в інших іграх]

# ── Механіки ─────────────────────────────────────────────
# 1. [основна механіка]
# 2. [додаткова механіка]
# 3. [ще одна]

# ── Персонажі та об'єкти ─────────────────────────────────
# Гравець:  [опис + керування]
# Вороги:   [опис + поведінка]
# Бонуси:   [типи + ефект]

# ── UI / HUD ─────────────────────────────────────────────
# Показники: score / life / level / timer / [інше]
# Екрани:    menu / playing / paused / gameover / win

# ── Технічний план ───────────────────────────────────────
# Урок 102: [крок 1 — скелет]
# Урок 103: [крок 2 — головна механіка]
# Урок 104: [крок 3 — вороги/перешкоди]
# Урок 105: [крок 4 — рахунок і прогресія]
# Урок 106: [крок 5 — графіка і анімація]
# Урок 107: [крок 6 — звуки та ефекти]
# Урок 108: [крок 7 — меню і збереження]
# Урок 109: [крок 8 — тестування і польорування]
# Урок 110: [ФІНАЛЬНА ПРЕЗЕНТАЦІЯ!]

import pygame, sys
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("[НАЗВА ТВОГО ПРОЕКТУ] — Design Doc")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 42, bold=True)
font     = pygame.font.SysFont("Arial", 26, bold=True)
font_sm  = pygame.font.SysFont("Arial", 19)
BG = (5, 5, 20)

fields = [
    ("Назва:", "[назва проекту]"),
    ("Жанр:",  "[гра / арт / утиліта]"),
    ("Мета:",  "[що робить гравець]"),
    ("Game Over:", "[коли програє]"),
    ("Родзинка:", "[унікальна деталь]"),
]

import random, math
stars = [{"x": random.uniform(0,W), "y": random.uniform(0,H), "s": random.uniform(.2,.8)} for _ in range(80)]
tick = 0

while True:
    tick += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()

    screen.fill(BG)
    for s in stars:
        pygame.draw.circle(screen, (150,150,220), (int(s["x"]),int(s["y"])), 1)
        s["y"] = (s["y"] + s["s"]) % H

    r = int(128+127*abs(math.sin(tick*0.02)))
    t = font_big.render("МІЙ ВЕЛИКИЙ ПРОЕКТ", True, (r, 200, 255-r))
    screen.blit(t, t.get_rect(center=(W//2, 60)))

    for i, (label, value) in enumerate(fields):
        pygame.draw.rect(screen, (20,20,50), (50, 110+i*72, W-100, 60), border_radius=8)
        pygame.draw.rect(screen, (60,60,120), (50, 110+i*72, W-100, 60), 2, border_radius=8)
        screen.blit(font_sm.render(label, True, (150,200,255)), (65, 118+i*72))
        screen.blit(font.render(value, True, (255,255,200)), (65, 138+i*72))

    tip = font_sm.render("Заповни поля у коді і відкрий заново!", True, (120,120,180))
    screen.blit(tip, tip.get_rect(center=(W//2, H-20)))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 132,
        title: { uk: "Скелет проекту", ru: "Скелет проекта" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Найважче в великому проекті — почати. Сьогодні будуємо скелет!</p></div><div class="theory-block"><h3>📖 Архітектура через стани</h3><pre class="code-example"># Головний модуль — ТІЛЬКИ структура
import pygame, sys
from game_states import Menu, Playing, Paused, GameOver

# АБО в одному файлі — чіткі функції:
def run_menu():    pass  # заглушка
def run_playing(): pass  # заглушка
def run_paused():  pass  # заглушка
def run_gameover():pass  # заглушка

state = "menu"
while True:
    if state == "menu":    state = run_menu()
    elif state == "play":  state = run_playing()
    elif state == "pause": state = run_paused()
    elif state == "over":  state = run_gameover()</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Самое сложное в большом проекте — начать. Сегодня строим скелет!</p></div><div class="theory-block"><h3>📖 Архитектура через состояния</h3><pre class="code-example"># Главный модуль — ТОЛЬКО структура
import pygame, sys
from game_states import Menu, Playing, Paused, GameOver

# ИЛИ в одном файле — чёткие функции:
def run_menu():    pass  # заглушка
def run_playing(): pass  # заглушка
def run_paused():  pass  # заглушка
def run_gameover():pass  # заглушка

state = "menu"
while True:
    if   state == "menu":    state = run_menu()
    elif state == "playing": state = run_playing()
    elif state == "paused":  state = run_paused()
    elif state == "gameover":state = run_gameover()</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти скелет і переконайся що всі стани переключаються.", ru:"⭐ Запусти скелет — все состояния переключаются." }},
          { num:2, level:"easy", text:{ uk:"⭐ Додай свою назву гри у заголовок вікна та title screen.", ru:"⭐ Добавь название игры в заголовок." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Намалюй у кожному стані різний фоновий колір та текст.", ru:"⭐⭐ Разный цвет фона для каждого состояния." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай FPS лічильник (тимчасово) щоб контролювати продуктивність.", ru:"⭐⭐ Добавь FPS счётчик временно." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Визнач всі змінні стану: score, lives, level, player_x, player_y тощо.", ru:"⭐⭐ Определи все переменные: score, lives, level..." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Зроби функцію reset_game() яка скидає всі змінні до початкових.", ru:"⭐⭐⭐ Функция reset_game() сбрасывает всё в начало." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Поділи код на логічні секції з коментарями (INIT / GAME LOOP / DRAW / EVENTS).", ru:"⭐⭐⭐⭐ Раздели код на секции с комментариями." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Збережи скелет на GitHub (перший комміт!).", ru:"⭐⭐⭐⭐ Сохрани скелет на GitHub (первый коммит!)." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 132 — Скелет проекту
# ЗАМІНИ [текст] на свій і починай будувати!
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("[НАЗВА ТВОЄЇ ГРИ]")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 56, bold=True)
font     = pygame.font.SysFont("Arial", 28, bold=True)
font_sm  = pygame.font.SysFont("Arial", 20)

# ── КОНСТАНТИ ──────────────────────────────────────────────
FPS         = 60
PLAYER_SPEED= 5
PLAYER_LIVES= 3
# [додай свої константи тут]

# ── СТАН ГРИ ───────────────────────────────────────────────
def reset_game():
    global score, lives, level, player_x, player_y
    score    = 0
    lives    = PLAYER_LIVES
    level    = 1
    player_x = W // 2
    player_y = H - 80
    # [ініціалізуй свої об'єкти тут]

reset_game()
game_state = "menu"
tick = 0

# ── ЕКРАНИ ─────────────────────────────────────────────────
def draw_menu():
    screen.fill((5, 5, 20))
    r = int(128+127*abs(math.sin(tick*0.02)))
    t1 = font_big.render("[НАЗВА ГРИ]", True, (r, 200, 255-r))
    t2 = font.render("SPACE — грати", True, (255, 220, 0))
    t3 = font_sm.render("Автор: [твоє ім'я]  |  Академія Мій комп'ютер", True, (120,120,180))
    screen.blit(t1, t1.get_rect(center=(W//2, H//2-70)))
    screen.blit(t2, t2.get_rect(center=(W//2, H//2+20)))
    screen.blit(t3, t3.get_rect(center=(W//2, H-25)))

def draw_playing():
    screen.fill((10, 10, 30))
    # [малюй свою гру тут]
    pygame.draw.rect(screen, (60,200,80), (player_x-20, player_y-20, 40, 40), border_radius=8)
    hud = font_sm.render(f"Score:{score}  Рівень:{level}  Життя:{lives}  P-пауза", True, (255,255,255))
    screen.blit(hud, (8, 8))

def draw_paused():
    draw_playing()
    overlay = pygame.Surface((W,H), pygame.SRCALPHA)
    overlay.fill((0,0,0,160))
    screen.blit(overlay, (0,0))
    t = font_big.render("ПАУЗА", True, (255,220,0))
    screen.blit(t, t.get_rect(center=(W//2, H//2)))

def draw_gameover():
    screen.fill((10,5,5))
    t1 = font_big.render("GAME OVER", True, (220,50,50))
    t2 = font.render(f"Score: {score}   SPACE — знову", True, (255,255,255))
    screen.blit(t1, t1.get_rect(center=(W//2, H//2-40)))
    screen.blit(t2, t2.get_rect(center=(W//2, H//2+40)))

# ── ОНОВЛЕННЯ ЛОГІКИ ───────────────────────────────────────
def update_playing():
    global player_x, player_y, score, lives, game_state, level
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  player_x = max(20, player_x - PLAYER_SPEED)
    if keys[pygame.K_RIGHT]: player_x = min(W-20, player_x + PLAYER_SPEED)
    if keys[pygame.K_UP]:    player_y = max(20, player_y - PLAYER_SPEED)
    if keys[pygame.K_DOWN]:  player_y = min(H-20, player_y + PLAYER_SPEED)
    # [додай свою логіку гри тут]
    score += 1
    if score >= level * 500: level += 1
    if lives <= 0: game_state = "gameover"

# ── ГОЛОВНИЙ ЦИКЛ ──────────────────────────────────────────
while True:
    tick += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit(); sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE:
                if game_state == "menu":
                    reset_game(); game_state = "playing"
                elif game_state == "gameover":
                    game_state = "menu"
            if event.key == pygame.K_p:
                if game_state == "playing":  game_state = "paused"
                elif game_state == "paused": game_state = "playing"
            if event.key == pygame.K_ESCAPE:
                game_state = "menu"

    if game_state == "playing":
        update_playing()

    if game_state == "menu":        draw_menu()
    elif game_state == "playing":   draw_playing()
    elif game_state == "paused":    draw_paused()
    elif game_state == "gameover":  draw_gameover()

    pygame.display.flip()
    clock.tick(FPS)
`
      },
      {
        id: 133,
        title: { uk: "Головна механіка", ru: "Главная механика" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Сьогодні реалізуємо СЕРЦЕ твоєї гри — головну механіку!</p></div><div class="theory-block"><h3>📖 Ізолюй механіку у функцію</h3><pre class="code-example"># Добре: кожна механіка — окрема функція
def move_player(px, py, keys, spd=5):
    if keys[pygame.K_LEFT]:  px = max(20, px-spd)
    if keys[pygame.K_RIGHT]: px = min(W-20, px+spd)
    return px, py

def shoot(px, py, bullets, cooldown):
    if cooldown <= 0 and pygame.key.get_pressed()[pygame.K_SPACE]:
        bullets.append([px, py])
        return [], 15  # новий список і кулдаун
    return bullets, max(0, cooldown-1)

# Погано: все в одному місці
# (важко тестувати і змінювати)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Сегодня реализуем СЕРДЦЕ твоей игры — главную механику!</p></div><div class="theory-block"><h3>📖 Изолируй механику в функцию</h3><pre class="code-example"># Хорошо: каждая механика — отдельная функция
def move_player(px, py, keys, spd=5):
    if keys[pygame.K_LEFT]:  px = max(20, px-spd)
    if keys[pygame.K_RIGHT]: px = min(W-20, px+spd)
    return px, py

def shoot(px, py, bullets, cooldown):
    if cooldown <= 0 and pygame.key.get_pressed()[pygame.K_SPACE]:
        bullets.append([px, py])
        return bullets, 15  # новый кулдаун
    return bullets, max(0, cooldown-1)</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Реалізуй рух гравця через функцію move_player().", ru:"⭐ Реализуй движение игрока через функцию." }},
          { num:2, level:"easy", text:{ uk:"⭐ Протестуй: гравець не виходить за межі екрану.", ru:"⭐ Тест: игрок не выходит за границы." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Реалізуй головну ігрову дію (стрільба / стрибок / збір).", ru:"⭐⭐ Главное игровое действие (стрельба/прыжок/сбор)." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай кулдаун або обмеження щоб дія не спамилась.", ru:"⭐⭐ Кулдаун чтобы действие не спамилось." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зіграй 5 хвилин лише з цією механікою — чи цікаво?", ru:"⭐⭐ Играй 5 минут с одной механикой — интересно?" }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Налаштуй константи (швидкість, кулдаун) поки не стане \'відчутно правильно\'.", ru:"⭐⭐⭐ Настрой константы пока не станет \'ощутимо правильно\'." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Додай другу механіку що доповнює першу (напр. дефолт + спецудар).", ru:"⭐⭐⭐⭐ Добавь вторую механику дополняющую первую." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Напиши тести вручну: \'якщо натиснути X, має статись Y\'.", ru:"⭐⭐⭐⭐ Ручные тесты: если X то должно быть Y." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 133 — Головна механіка
# Побудуй СВОЮ механіку на основі цього шаблону!
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Механіка — [назва гри]")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 26, bold=True)
font_sm = pygame.font.SysFont("Arial", 19)
BG = (8, 8, 22)

# ── НАЛАШТУВАННЯ ───────────────────────────────────────────
PLAYER_SPEED  = 5       # ← ЗМІНЮЙ
BULLET_SPEED  = 12      # ← ЗМІНЮЙ
SHOOT_COOLDOWN= 14      # ← ЗМІНЮЙ (менше = швидше)
MAX_BULLETS   = 8       # ← ЗМІНЮЙ

# ── СТАН ───────────────────────────────────────────────────
px, py = W//2, H-70
bullets = []
targets = [{"x": random.randint(40,W-40), "y": random.randint(40,200), "hp":3} for _ in range(5)]
score = 0
cooldown = 0
hits = 0

# ── ФУНКЦІЇ МЕХАНІКИ ───────────────────────────────────────
def move_player(px, py, keys):
    if keys[pygame.K_LEFT]:  px = max(20, px - PLAYER_SPEED)
    if keys[pygame.K_RIGHT]: px = min(W-20, px + PLAYER_SPEED)
    if keys[pygame.K_UP]:    py = max(20, py - PLAYER_SPEED)
    if keys[pygame.K_DOWN]:  py = min(H-20, py + PLAYER_SPEED)
    return px, py

def try_shoot(px, py, bullets, cooldown):
    # ← ЗАМІНИ на свою дію!
    keys = pygame.key.get_pressed()
    if cooldown <= 0 and keys[pygame.K_SPACE] and len(bullets) < MAX_BULLETS:
        bullets.append({"x": float(px), "y": float(py-30), "vy": -BULLET_SPEED})
        return bullets, SHOOT_COOLDOWN
    return bullets, max(0, cooldown - 1)

def update_bullets(bullets):
    result = []
    for b in bullets:
        b["y"] += b["vy"]
        if 0 < b["y"] < H:
            result.append(b)
    return result

def check_hits(bullets, targets):
    global score, hits
    new_bullets = bullets[:]
    new_targets = targets[:]
    for b in bullets:
        for t in targets:
            if abs(b["x"]-t["x"]) < 25 and abs(b["y"]-t["y"]) < 25 and b in new_bullets:
                new_bullets.remove(b)
                t["hp"] -= 1
                hits += 1
                if t["hp"] <= 0:
                    new_targets.remove(t)
                    score += 10
                    new_targets.append({"x": random.randint(40,W-40), "y": random.randint(40,200), "hp":3})
                break
    return new_bullets, new_targets

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()

    keys = pygame.key.get_pressed()
    px, py = move_player(px, py, keys)
    bullets, cooldown = try_shoot(px, py, bullets, cooldown)
    bullets = update_bullets(bullets)
    bullets, targets = check_hits(bullets, targets)

    screen.fill(BG)
    for t in targets:
        col = (200, int(60+60*t["hp"]), 40)
        pygame.draw.circle(screen, col, (int(t["x"]),int(t["y"])), 22)
        # HP bar
        pygame.draw.rect(screen,(60,0,0),(int(t["x"])-20,int(t["y"])-32,40,6))
        pygame.draw.rect(screen,(255,80,80),(int(t["x"])-20,int(t["y"])-32,int(40*t["hp"]/3),6))
    for b in bullets:
        pygame.draw.rect(screen,(255,220,0),(int(b["x"])-3,int(b["y"])-8,6,14))
    pygame.draw.polygon(screen,(0,200,255),[(px,py-26),(px-16,py+12),(px+16,py+12)])

    screen.blit(font.render(f"Score:{score}  Влучень:{hits}  Кулдаун:{cooldown}", True,(255,255,255)),(8,8))
    screen.blit(font_sm.render("Стрілки=рух  SPACE=стрільба  ← ЗАМІНИ на свою дію →", True,(160,160,220)),(8,H-30))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 134,
        title: { uk: "Вороги та перешкоди", ru: "Враги и препятствия" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Без ворогів гра нецікава. Сьогодні додаємо своїх унікальних ворогів!</p></div><div class="theory-block"><h3>📖 Клас ворога через словник або клас</h3><pre class="code-example"># Варіант 1: словник (просто)
enemy = {"x":100, "y":0, "hp":3, "spd":2, "type":"normal"}

# Варіант 2: клас (гнучко)
class Enemy:
    types = {
        "scout":  {"hp":1, "spd":4, "r":12, "col":(255,100,100)},
        "tank":   {"hp":5, "spd":1, "r":28, "col":(150,50,200)},
        "zigzag": {"hp":2, "spd":3, "r":16, "col":(100,200,255)},
    }
    def __init__(self, etype="scout"):
        t = Enemy.types[etype]
        self.x = float(random.randint(30, W-30))
        self.y = -40.0
        self.hp, self.spd, self.r, self.col = t["hp"], t["spd"], t["r"], t["col"]
        self.timer = 0
    def update(self):
        self.timer += 1
        self.y += self.spd</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Без врагов игра неинтересная. Сегодня добавляем своих уникальных врагов!</p></div><div class="theory-block"><h3>📖 Класс врага через словарь или класс</h3><pre class="code-example"># Вариант 1: словарь (просто)
enemy = {"x":100, "y":0, "hp":3, "spd":2, "type":"normal"}

# Вариант 2: класс (гибко)
class Enemy:
    types = {
        "scout":  {"hp":1, "spd":4, "r":12, "col":(255,100,100)},
        "tank":   {"hp":5, "spd":1, "r":28, "col":(100,100,255)},
        "bomber": {"hp":2, "spd":3, "r":18, "col":(255,180,0)},
    }
    def __init__(self, etype="scout"):
        t = Enemy.types[etype]
        self.hp=t["hp"]; self.spd=t["spd"]
        self.r=t["r"];   self.col=t["col"]</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Додай базового ворога що рухається зверху вниз.", ru:"⭐ Добавь базового врага сверху вниз." }},
          { num:2, level:"easy", text:{ uk:"⭐ Вороги спавняться з інтервалом і зникають за екраном.", ru:"⭐ Враги спавнятся с интервалом." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Зроби 2 типи ворогів з різними швидкостями і розмірами.", ru:"⭐⭐ 2 типа врагов с разными скоростями." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Додай колізію гравець ↔ ворог (втрата життя).", ru:"⭐⭐ Коллизия игрок-враг (потеря жизни)." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Перевір що вороги НЕ спавняться прямо на гравця.", ru:"⭐⭐ Враги не спавнятся на игрока." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Ворог-переслідувач: повільно летить до гравця.", ru:"⭐⭐⭐ Враг-преследователь: летит к игроку." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Складність зростає: більше і швидших ворогів на вищих рівнях.", ru:"⭐⭐⭐⭐ Сложность растёт с уровнем." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй ворогів у свій проект із попереднього уроку.", ru:"⭐⭐⭐⭐ Встрой врагов в проект из прошлого урока." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 134 — Вороги та перешкоди
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Вороги")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 24, bold=True)
BG = (8, 8, 22)

class Enemy:
    TYPES = {
        "scout":  {"hp":1, "spd":4.0, "r":12, "col":(255,100,100), "pts":5},
        "tank":   {"hp":4, "spd":1.5, "r":26, "col":(160,60,220), "pts":20},
        "zigzag": {"hp":2, "spd":3.0, "r":16, "col":(80,200,255), "pts":10},
    }
    def __init__(self, etype=None):
        etype = etype or random.choice(list(Enemy.TYPES))
        t = Enemy.TYPES[etype]
        self.x = float(random.randint(30, W-30))
        self.y = -50.0
        self.hp = t["hp"]; self.max_hp = t["hp"]
        self.spd = t["spd"]; self.r = t["r"]
        self.col = t["col"]; self.pts = t["pts"]
        self.etype = etype; self.timer = 0

    def update(self, level=1):
        self.timer += 1
        self.y += self.spd * (1 + (level-1)*0.2)
        if self.etype == "zigzag":
            self.x += math.sin(self.timer * 0.1) * 4
            self.x = max(self.r, min(W-self.r, self.x))
        elif self.etype == "scout":
            if self.timer % 30 < 15: self.x = min(W-self.r, self.x+2)
            else: self.x = max(self.r, self.x-2)

    def draw(self, surf):
        x, y = int(self.x), int(self.y)
        pygame.draw.circle(surf, self.col, (x,y), self.r)
        if self.etype == "tank":
            pygame.draw.circle(surf, (200,100,255), (x,y), self.r, 3)
        elif self.etype == "scout":
            pygame.draw.polygon(surf,(255,200,200),[(x,y-self.r-6),(x-5,y-self.r+4),(x+5,y-self.r+4)])
        # HP bar
        if self.hp < self.max_hp:
            bw = self.r*2
            pygame.draw.rect(surf,(60,0,0),(x-self.r,y-self.r-10,bw,5))
            pygame.draw.rect(surf,(220,80,80),(x-self.r,y-self.r-10,int(bw*self.hp/self.max_hp),5))

px, py = W//2, H-70
enemies = []; spawn_t = 0; level = 1; score = 0; lives = 3; bullets = []; cool = 0
particles = []

while True:
    for ev in pygame.event.get():
        if ev.type == pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type == pygame.KEYDOWN and ev.key == pygame.K_SPACE and cool<=0:
            bullets.append({"x":float(px),"y":float(py-30)}); cool=14
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(22,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-22,px+5)
    if cool>0: cool-=1
    spawn_t+=1
    if spawn_t>=max(30,70-level*5):
        spawn_t=0; enemies.append(Enemy())
    for b in bullets[:]:
        b["y"]-=12
        if b["y"]<-10: bullets.remove(b)
    for e in enemies[:]:
        e.update(level)
        if e.y>H+40: enemies.remove(e); continue
        if math.hypot(px-e.x,py-e.y)<e.r+20: enemies.remove(e); lives-=1; continue
        for b in bullets[:]:
            if b in bullets and math.hypot(b["x"]-e.x,b["y"]-e.y)<e.r+4:
                bullets.remove(b); e.hp-=1
                if e.hp<=0:
                    score+=e.pts
                    for _ in range(8):
                        particles.append({"x":e.x,"y":e.y,"vx":random.uniform(-5,5),"vy":random.uniform(-5,5),"life":25,"col":e.col})
                    if e in enemies: enemies.remove(e)
                break
    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["life"]-=1
        if p["life"]<=0: particles.remove(p)
    if score>=level*150: level+=1

    screen.fill(BG)
    for p in particles: pygame.draw.circle(screen,p["col"],(int(p["x"]),int(p["y"])),3)
    for e in enemies: e.draw(screen)
    for b in bullets: pygame.draw.rect(screen,(255,220,0),(int(b["x"])-3,int(b["y"])-8,6,14))
    pygame.draw.polygon(screen,(0,200,255),[(px,py-26),(px-16,py+12),(px+16,py+12)])
    screen.blit(font.render(f"Score:{score}  Рівень:{level}  Життя:{lives}",True,(255,255,255)),(8,8))
    screen.blit(font.render("SPACE=вогонь  🔴scout  🟣tank  🔵zigzag",True,(180,180,220)),(8,H-35))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 135,
        title: { uk: "Рахунок та прогресія", ru: "Счёт и прогрессия" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Що змушує гравця продовжувати? Прогресія та рахунок!</p></div><div class="theory-block"><h3>📖 Системи прогресії</h3><pre class="code-example"># Рівні через score пороги
LEVEL_THRESHOLDS = [0, 200, 500, 1000, 2000]
level = sum(1 for t in LEVEL_THRESHOLDS if score >= t)

# Множник за комбо
combo = 0; combo_timer = 0
def hit():
    global combo, combo_timer, score
    combo += 1; combo_timer = 90
    score += 10 * max(1, combo)

# Прогресія ворогів
enemy_spd   = 2 + (level-1) * 0.4
spawn_rate  = max(20, 70 - level * 8)
enemy_count = min(20, 3 + level * 2)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Что заставляет игрока продолжать? Прогрессия и счёт!</p></div><div class="theory-block"><h3>📖 Системы прогрессии</h3><pre class="code-example"># Уровни через score пороги
LEVEL_THRESHOLDS = [0, 200, 500, 1000, 2000]
level = sum(1 for t in LEVEL_THRESHOLDS if score >= t)

# Множитель за комбо
combo = 0; combo_timer = 0
def hit():
    global combo, combo_timer, score
    combo += 1; combo_timer = 90
    score += 10 * max(1, combo)

# Скорость врагов растёт с уровнем:
enemy_spd = 2 + (level - 1) * 0.4</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Додай рахунок: +10 за ворога, +5 за бонус.", ru:"⭐ Добавь счёт: +10 за врага, +5 за бонус." }},
          { num:2, level:"easy", text:{ uk:"⭐ Рівень підвищується кожні 200 очок.", ru:"⭐ Уровень растёт каждые 200 очков." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Комбо: за 3+ послідовних влучення множник x2.", ru:"⭐⭐ Комбо: 3+ подряд = множитель x2." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Вороги прискорюються кожен рівень.", ru:"⭐⭐ Враги ускоряются каждый уровень." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Флеш-повідомлення \'РІВЕНЬ N!\' при підвищенні.", ru:"⭐⭐ Флэш \'УРОВЕНЬ N!\' при повышении." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Збалансуй складність: протестуй щоб 100 очок = ~1 хвилина гри.", ru:"⭐⭐⭐ Баланс: 100 очков ≈ 1 минута игры." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Збереження рекорду у файл + показ на game over.", ru:"⭐⭐⭐⭐ Сохранение рекорда в файл." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй прогресію у свій великий проект.", ru:"⭐⭐⭐⭐ Встрой прогрессию в свой проект." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 135 — Рахунок та прогресія
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Рахунок і прогресія")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 52, bold=True)
font     = pygame.font.SysFont("Arial", 26, bold=True)
font_sm  = pygame.font.SysFont("Arial", 20)
BG=(8,8,22); YW=(255,220,0); WT=(255,255,255); RD=(220,50,50)

LEVEL_THRESHOLDS = [0,150,400,800,1500,3000]
RECORD_FILE="big_project_record.txt"
def load_rec():
    try:
        with open(RECORD_FILE)as f:return int(f.read())
    except: return 0
def save_rec(s):
    with open(RECORD_FILE,"w")as f:f.write(str(s))

score=0; best=load_rec(); combo=0; combo_timer=0; level=1; lives=3
px,py=W//2,H-70; enemies=[]; spawn_t=0; cool=0; bullets=[]
popups=[]; level_flash=0; new_rec=False

def get_level(sc):
    return sum(1 for t in LEVEL_THRESHOLDS if sc>=t)

while True:
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: save_rec(max(score,best)); pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN and ev.key==pygame.K_SPACE and cool<=0:
            bullets.append({"x":float(px),"y":float(py-30)}); cool=14
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(20,px-6)
    if keys[pygame.K_RIGHT]: px=min(W-20,px+6)
    if cool>0: cool-=1
    if combo_timer>0: combo_timer-=1
    else: combo=0
    spawn_t+=1
    spd=1.8+(level-1)*0.35; rate=max(22,65-level*7)
    if spawn_t>=rate: spawn_t=0; enemies.append({"x":float(random.randint(25,W-25)),"y":-30.0,"r":18})
    for b in bullets[:]:
        b["y"]-=13
        if b["y"]<-10: bullets.remove(b)
    for e in enemies[:]:
        e["y"]+=spd
        if e["y"]>H+35: enemies.remove(e); continue
        if math.hypot(px-e["x"],py-e["y"])<e["r"]+20: enemies.remove(e); lives-=1; combo=0; continue
        for b in bullets[:]:
            if b in bullets and math.hypot(b["x"]-e["x"],b["y"]-e["y"])<e["r"]+4:
                bullets.remove(b); enemies.remove(e)
                combo+=1; combo_timer=90
                pts=10*max(1,combo)
                score+=pts
                popups.append({"x":e["x"],"y":e["y"],"txt":f"+{pts}","life":40,"col":YW if combo<3 else RD})
                new_lv=get_level(score)
                if new_lv>level: level=new_lv; level_flash=100
                if score>best: best=score; save_rec(best); new_rec=True
                break
    for p in popups[:]:
        p["y"]-=1.2; p["life"]-=1
        if p["life"]<=0: popups.remove(p)

    screen.fill(BG)
    for e in enemies: pygame.draw.circle(screen,(200,60,40),(int(e["x"]),int(e["y"])),e["r"])
    for b in bullets: pygame.draw.rect(screen,YW,(int(b["x"])-3,int(b["y"])-8,6,14))
    pygame.draw.polygon(screen,(0,200,255),[(px,py-26),(px-16,py+12),(px+16,py+12)])
    for p in popups:
        t=font.render(p["txt"],True,p["col"]); screen.blit(t,t.get_rect(center=(int(p["x"]),int(p["y"]))))
    hud=font.render(f"Score:{score}  Рекорд:{best}  Рівень:{level}  Комбо:x{combo}",True,WT)
    screen.blit(hud,(8,8))
    if level_flash>0:
        lt=font_big.render(f"РІВЕНЬ {level}!",True,YW); screen.blit(lt,lt.get_rect(center=(W//2,H//2))); level_flash-=1
    if new_rec:
        nr=font.render("🏆 НОВИЙ РЕКОРД!",True,YW); screen.blit(nr,nr.get_rect(center=(W//2,60)))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 136,
        title: { uk: "Графіка та анімація", ru: "Графика и анимация" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Гра виглядає непогано — але може виглядати НАБАГАТО краще!</p></div><div class="theory-block"><h3>📖 Прийоми polish-графіки</h3><pre class="code-example"># 1. Параллакс-фон (різні шари)
bg_stars_far  = [... speed=0.3]
bg_stars_near = [... speed=0.8]

# 2. Плавна анімація через sin
wobble = math.sin(tick * 0.05) * 4  # гойдання
scale  = 1.0 + 0.05*math.sin(tick*0.1)  # пульсація

# 3. Колір-цикл (веселка)
hue = (tick * 2) % 360
r = int(127.5*(1+math.sin(math.radians(hue))))
g = int(127.5*(1+math.sin(math.radians(hue+120))))
b = int(127.5*(1+math.sin(math.radians(hue+240))))
rainbow = (r, g, b)

# 4. Градієнтний фон (Surface)
for y in range(H):
    c = int(5 + 20*(y/H))
    pygame.draw.line(screen,(0,c,c+5),(0,y),(W,y))</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Игра выглядит неплохо — но может выглядеть НАМНОГО лучше!</p></div><div class="theory-block"><h3>📖 Приёмы polish-графики</h3><pre class="code-example"># 1. Параллакс-фон (разные слои)
bg_stars_far  = [... speed=0.3]
bg_stars_near = [... speed=0.8]

# 2. Плавная анимация через sin
wobble = math.sin(tick * 0.05) * 4  # покачивание
scale  = 1.0 + 0.05*math.sin(tick*0.1)  # пульсация

# 3. Цвет-цикл (радуга)
hue = (tick * 2) % 360
r = int(127+127*math.sin(math.radians(hue)))
g = int(127+127*math.sin(math.radians(hue+120)))
b = int(127+127*math.sin(math.radians(hue+240)))</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Додай анімований зоряний фон з параллаксом.", ru:"⭐ Добавь анимированный фон со звёздами." }},
          { num:2, level:"easy", text:{ uk:"⭐ Зроби щоб заголовок пульсував кольором.", ru:"⭐ Заголовок пульсирует цветом." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Гравець злегка \'гойдається\' (sin-анімація).", ru:"⭐⭐ Игрок чуть покачивается (sin-анимация)." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Вороги мають анімацію (обертання або пульсація розміру).", ru:"⭐⭐ Враги анимированы." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Зроби плавний градієнтний фон замість суцільного кольору.", ru:"⭐⭐ Градиентный фон." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Трасуючий слід за гравцем (trail з альфа-канал).", ru:"⭐⭐⭐ Трассирующий след за игроком." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Погода/час доби: динамічна зміна освітлення протягом гри.", ru:"⭐⭐⭐⭐ Динамичное освещение/время суток." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй графіку у свій великий проект.", ru:"⭐⭐⭐⭐ Встрой графику в свой проект." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 136 — Графіка та анімація
import pygame, sys, random, math
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Графіка та анімація")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 56, bold=True)
font = pygame.font.SysFont("Arial", 24, bold=True)
tick = 0

# Два шари зірок (параллакс)
stars_far  = [{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":0.3,"b":random.randint(60,120)} for _ in range(80)]
stars_near = [{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":0.9,"b":random.randint(150,255)} for _ in range(40)]

# Гравець
px, py = W//2, H-80
trail = []

# Вороги з кутом
enemies = [{"x":float(random.randint(60,W-60)), "y":float(random.randint(60,250)), "r":20, "angle":0.0, "phase":random.uniform(0,6.28)} for _ in range(6)]

while True:
    tick += 1
    for event in pygame.event.get():
        if event.type == pygame.QUIT: pygame.quit(); sys.exit()
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px = max(25, px-5)
    if keys[pygame.K_RIGHT]: px = min(W-25, px+5)

    trail.append({"x":px, "y":py, "life":18})
    trail = [t for t in trail if t["life"]>0]
    for t in trail: t["life"] -= 1

    # ── Градієнтний фон
    for y in range(0, H, 3):
        c = int(5 + 25*(y/H))
        d = int(3 + 15*(y/H))
        pygame.draw.line(screen,(0,c,d+c//2),(0,y),(W,y+2))

    # ── Параллакс зірки
    for s in stars_far:
        pygame.draw.circle(screen,(s["b"],s["b"],s["b"]),(int(s["x"]),int(s["y"])),1)
        s["y"] = (s["y"]+s["s"]) % H
    for s in stars_near:
        pygame.draw.circle(screen,(s["b"],s["b"],255),(int(s["x"]),int(s["y"])),1)
        s["y"] = (s["y"]+s["s"]) % H

    # ── Trail за гравцем
    for t in trail:
        alpha_surf = pygame.Surface((14,14), pygame.SRCALPHA)
        alpha_surf.fill((0,180,255,int(200*t["life"]/18)))
        screen.blit(alpha_surf, (t["x"]-7, t["y"]-7))

    # ── Вороги з анімацією
    for e in enemies:
        e["angle"] = (e["angle"] + 0.06) % (2*math.pi)
        pulse = e["r"] + int(3*math.sin(tick*0.08+e["phase"]))
        hue = (tick*1.5 + e["phase"]*30) % 360
        r = int(127+127*math.sin(math.radians(hue)))
        g = int(127+127*math.sin(math.radians(hue+120)))
        b = int(127+127*math.sin(math.radians(hue+240)))
        pygame.draw.circle(screen,(r,g,b),(int(e["x"]),int(e["y"])),pulse)
        for i in range(4):
            a = e["angle"] + i*math.pi/2
            tx = int(e["x"]+math.cos(a)*(pulse+6))
            ty = int(e["y"]+math.sin(a)*(pulse+6))
            pygame.draw.circle(screen,(min(255,r+80),min(255,g+80),b),(tx,ty),4)

    # ── Гравець (гойдання)
    wobble = int(math.sin(tick*0.12)*3)
    pygame.draw.polygon(screen,(0,200,255),[(px,py-28+wobble),(px-18,py+14),(px+18,py+14)])
    pygame.draw.circle(screen,(120,220,255),(px,py-10+wobble),8)

    # ── Заголовок (пульсує)
    r2=int(128+127*abs(math.sin(tick*0.025)))
    t=font_big.render("[НАЗВА ТВОЄЇ ГРИ]",True,(r2,200,255-r2))
    screen.blit(t,t.get_rect(center=(W//2,40)))
    screen.blit(font.render("Стрілки — рух",True,(180,180,255)),(8,H-35))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 137,
        title: { uk: "Звуки та HUD", ru: "Звуки и HUD" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Останні деталі які роблять гру 'цілою': звуки та красивий HUD!</p></div><div class="theory-block"><h3>📖 HUD — Heads Up Display</h3><pre class="code-example"># Серця замість числа
def draw_lives(surf, lives, max_lives=3, x=10, y=10):
    for i in range(max_lives):
        col = (220,40,40) if i < lives else (40,40,60)
        cx = x + i*30 + 15
        # серце з двох кіл і трикутника
        pygame.draw.circle(surf,col,(cx-6,y+8),8)
        pygame.draw.circle(surf,col,(cx+6,y+8),8)
        pygame.draw.polygon(surf,col,[(cx-12,y+12),(cx+12,y+12),(cx,y+24)])

# Прогрес-бар досвіду
def draw_xp_bar(surf, score, level):
    needed = level * 200
    progress = min(1.0, (score % needed) / needed)
    pygame.draw.rect(surf,(30,30,60),(8,40,200,12),border_radius=6)
    pygame.draw.rect(surf,(80,180,255),(8,40,int(200*progress),12),border_radius=6)
    pygame.draw.rect(surf,(100,140,200),(8,40,200,12),2,border_radius=6)</pre></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Последние детали которые делают игру «целой»: звуки и красивый HUD!</p></div><div class="theory-block"><h3>📖 HUD — Heads Up Display</h3><pre class="code-example"># Сердечки вместо числа
def draw_lives(surf, lives, max_lives=3, x=10, y=10):
    for i in range(max_lives):
        col = (220,40,40) if i < lives else (40,40,60)
        cx = x + i*30 + 15
        # сердце из двух кругов и треугольника
        pygame.draw.circle(surf,col,(cx-6,y+8),8)
        pygame.draw.circle(surf,col,(cx+6,y+8),8)
        pygame.draw.polygon(surf,col,[(cx-12,y+12),(cx+12,y+12),(cx,y+28)])</pre></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Замінь числовий показник life на серця-іконки.", ru:"⭐ Замени число жизней на сердечки." }},
          { num:2, level:"easy", text:{ uk:"⭐ Додай прогрес-бар до наступного рівня.", ru:"⭐ Добавь прогресс-бар до следующего уровня." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Додай 3 звуки (постріл, влучення, підвищення рівня).", ru:"⭐⭐ Добавь 3 звука (выстрел, попадание, уровень)." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Клавіша M вимикає/вмикає всі звуки.", ru:"⭐⭐ M — mute/unmute." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ HUD відображається навіть на паузі та в меню.", ru:"⭐⭐ HUD виден на паузе и в меню." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Міні-карта або радар у куті екрану.", ru:"⭐⭐⭐ Мини-карта или радар в углу." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Анімовані повідомлення (РІВЕНЬ!, НОВИЙ РЕКОРД!) з fade-out.", ru:"⭐⭐⭐⭐ Анимированные сообщения с fade-out." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Вбудуй HUD і звуки у свій великий проект.", ru:"⭐⭐⭐⭐ Встрой HUD и звуки в свой проект." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 137 — Звуки та HUD
import pygame, sys, array, math, random
pygame.mixer.init(44100,-16,1,512)
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("HUD та звуки")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 24, bold=True)
font_sm = pygame.font.SysFont("Arial", 18)
BG=(8,8,22); muted=False

def make_snd(freq,dur,vol=0.25,kind="sine"):
    n=int(44100*dur)
    def wave(i):
        t=i/44100
        if kind=="sine":   return math.sin(2*math.pi*freq*t)
        if kind=="square": return 1.0 if math.sin(2*math.pi*freq*t)>0 else -1.0
        if kind=="decay":  return math.sin(2*math.pi*freq*t)*math.exp(-5*i/n)
    buf=array.array('h',[int(wave(i)*vol*32767) for i in range(n)])
    return pygame.sndarray.make_sound(buf)

snd_shoot=make_snd(880,0.05,"square")
snd_hit  =make_snd(300,0.12,"decay")
snd_lvl  =make_snd(659,0.2,"sine")

def play(snd):
    if not muted: snd.play()

def draw_lives(surf,lives,max_l=3,x=8,y=8):
    for i in range(max_l):
        cx=x+i*36+18; cy=y+14
        col=(220,40,40)if i<lives else(40,30,50)
        pygame.draw.circle(surf,col,(cx-7,cy-5),9)
        pygame.draw.circle(surf,col,(cx+7,cy-5),9)
        pygame.draw.polygon(surf,col,[(cx-14,cy),(cx+14,cy),(cx,cy+16)])

def draw_xp(surf,score,level,x=8,y=40):
    need=level*200; prog=min(1.0,(score%need)/need) if need>0 else 1.0
    pygame.draw.rect(surf,(20,20,50),(x,y,220,12),border_radius=6)
    pygame.draw.rect(surf,(80,180,255),(x,y,int(220*prog),12),border_radius=6)
    pygame.draw.rect(surf,(100,140,200),(x,y,220,12),2,border_radius=6)
    t=font_sm.render(f"XP {score%need if need>0 else 0}/{need}",True,(140,180,255))
    surf.blit(t,(x+226,y-2))

def draw_score(surf,score,best,level):
    t=font.render(f"Score:{score}  Рекорд:{best}  Рівень:{level}",True,(255,255,255))
    surf.blit(t,t.get_rect(topright=(W-8,8)))

score=0; best=0; lives=3; level=1
coins=[{"x":random.randint(30,W-30),"y":random.randint(60,H-100)} for _ in range(7)]
px,py=W//2,H//2; tick=0; msgs=[]

while True:
    tick+=1
    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_m: muted=not muted
            if ev.key==pygame.K_SPACE:
                play(snd_shoot); msgs.append({"txt":"ПОСТРIЛ!","x":px,"y":py-30,"life":30,"col":(255,220,0)})
    keys=pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  px=max(20,px-5)
    if keys[pygame.K_RIGHT]: px=min(W-20,px+5)
    if keys[pygame.K_UP]:    py=max(20,py-5)
    if keys[pygame.K_DOWN]:  py=min(H-20,py+5)
    for c in coins[:]:
        if abs(px-c["x"])<26 and abs(py-c["y"])<26:
            score+=10; play(snd_hit)
            if score>best: best=score
            new_lv=max(1,score//200+1)
            if new_lv>level: level=new_lv; play(snd_lvl); msgs.append({"txt":f"РІВЕНЬ {level}!","x":W//2,"y":H//2,"life":80,"col":(255,150,0)})
            coins.remove(c); coins.append({"x":random.randint(30,W-30),"y":random.randint(60,H-100)})
    for m in msgs[:]:
        m["y"]-=0.8; m["life"]-=1
        if m["life"]<=0: msgs.remove(m)

    screen.fill(BG)
    for c in coins: pygame.draw.circle(screen,(255,200,0),(c["x"],c["y"]),16)
    pygame.draw.rect(screen,(60,200,80),(px-18,py-18,36,36),border_radius=8)
    for m in msgs:
        t=font.render(m["txt"],True,m["col"]); screen.blit(t,t.get_rect(center=(int(m["x"]),int(m["y"]))))
    draw_lives(screen,lives)
    draw_xp(screen,score,level)
    draw_score(screen,score,best,level)
    mut=font_sm.render("M: "+("MUTE" if muted else "звук ON")+" | SPACE: постріл",True,(150,150,200))
    screen.blit(mut,(8,H-28))
    pygame.display.flip(); clock.tick(60)
`
      },
      {
        id: 138,
        title: { uk: "Тестування і польорування", ru: "Тестирование и полировка" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Проект майже готовий! Сьогодні — жорстке тестування і фінальне шліфування.</p></div><div class="theory-block"><h3>📖 Playtesting чек-ліст</h3><ul><li>✅ Запусти гру і грай 10 хвилин підряд</li><li>✅ Попроси іншу людину пограти без пояснень</li><li>✅ Запиши всі місця де вона завис/застрягла</li><li>✅ Перевір FPS (має бути ≥55 завжди)</li><li>✅ Немає print() у фінальному коді</li><li>✅ Меню, пауза, game over — всі працюють</li><li>✅ Рекорд зберігається між запусками</li></ul></div><div class="theory-block hint"><h3>💡 Правило 3 bugs</h3><p>Знайди 3 найбільших проблеми — виправ їх. Потім ще 3. Ніколи не намагайся виправити все одразу.</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Проект почти готов! Сегодня — жёсткое тестирование и финальная шлифовка.</p></div><div class="theory-block"><h3>📖 Playtesting чек-лист</h3><ul><li>✅ Запусти игру и играй 10 минут подряд</li><li>✅ Попроси другого человека поиграть без объяснений</li><li>✅ Запиши все места где он завис/застрял</li><li>✅ Проверь FPS (должен быть ≥55 всегда)</li><li>✅ Нет print() в финальном коде</li><li>✅ Меню, пауза, game over — все работают</li><li>✅ Рекорд сохраняется и загружается правильно</li><li>✅ Нет случайных вылетов</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти свою гру і грай 10 хвилин. Запиши всі проблеми.", ru:"⭐ Играй 10 минут. Запиши все проблемы." }},
          { num:2, level:"easy", text:{ uk:"⭐ Виправ 3 найважливіших проблеми зі списку.", ru:"⭐ Исправь 3 главные проблемы." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Видали всі print() та тимчасові debug-змінні.", ru:"⭐⭐ Удали все print() и debug переменные." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Перевір що FPS ≥ 55 навіть при 20+ ворогах.", ru:"⭐⭐ FPS ≥ 55 даже при 20+ врагах." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Дай пограти другу/батьку без пояснень. Що він не зміг?", ru:"⭐⭐ Дай играть другу/родителю без объяснений." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Виправ 3 баги знайдених при тестуванні.", ru:"⭐⭐⭐ Исправь 3 бага найденных при тестировании." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Оптимізуй: заміни O(n²) перевірки на більш ефективні.", ru:"⭐⭐⭐⭐ Оптимизируй: замени O(n²) проверки." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Зроби скріншот і відео фінальної версії для портфоліо.", ru:"⭐⭐⭐⭐ Скриншот и видео финальной версии." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 138 — Тестування і польорування
# Використовуй як інструмент для аналізу СВОЄЇ гри
import pygame, sys, time, random
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Тест-інструмент")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 22, bold=True)
font_sm = pygame.font.SysFont("Arial", 17)
BG=(8,8,22)

CHECKS = [
    "Запускається без помилок",
    "Меню працює",
    "Пауза (P) працює",
    "Game Over показується",
    "Рекорд зберігається у файл",
    "Немає print() в коді",
    "FPS >= 55 завжди",
    "Звуки та ефекти є",
    "Власне ім'я на title screen",
    "Гра цікава 5+ хвилин",
]
done = [False]*len(CHECKS)

fps_samples=[]; start=time.time(); selected=0

while True:
    dt=clock.tick(60); fps=clock.get_fps()
    fps_samples.append(fps)
    if len(fps_samples)>120: fps_samples.pop(0)
    avg_fps=sum(fps_samples)/len(fps_samples) if fps_samples else 0
    elapsed=int(time.time()-start)

    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            if ev.key==pygame.K_UP:    selected=max(0,selected-1)
            if ev.key==pygame.K_DOWN:  selected=min(len(CHECKS)-1,selected+1)
            if ev.key==pygame.K_SPACE: done[selected]=not done[selected]

    screen.fill(BG)
    title=font.render("ФІНАЛЬНИЙ ЧЕКЛИСТ ТЕСТУВАННЯ",True,(255,200,0))
    screen.blit(title,title.get_rect(center=(W//2,25)))

    for i,(check,ok) in enumerate(zip(CHECKS,done)):
        y=60+i*44
        bg_col=(20,40,20)if ok else((30,20,20)if i==selected else(15,15,30))
        pygame.draw.rect(screen,bg_col,(20,y-5,W-40,38),border_radius=6)
        if i==selected: pygame.draw.rect(screen,(80,80,160),(20,y-5,W-40,38),2,border_radius=6)
        mark="✅" if ok else "◻"
        col=(80,220,80)if ok else(200,200,200)
        t=font_sm.render(f"{mark}  {check}",True,col)
        screen.blit(t,(35,y+6))

    done_count=sum(done)
    pct=int(100*done_count/len(CHECKS))
    bw=int((W-100)*pct/100)
    pygame.draw.rect(screen,(20,20,50),(50,H-70,W-100,20),border_radius=8)
    bar_col=(80,200,80)if pct==100 else(255,160,0)
    pygame.draw.rect(screen,bar_col,(50,H-70,bw,20),border_radius=8)
    info=font_sm.render(f"{done_count}/{len(CHECKS)} ({pct}%)  |  FPS:{avg_fps:.0f}  |  Час:{elapsed//60}хв{elapsed%60}с  |  ↑↓ вибір  SPACE галочка",True,(180,180,220))
    screen.blit(info,info.get_rect(center=(W//2,H-35)))
    if pct==100:
        r=pygame.Surface((W,40),pygame.SRCALPHA); r.fill((0,50,0,100)); screen.blit(r,(0,H-105))
        t=font.render("🏆 ГОТОВО ДО ПРЕЗЕНТАЦІЇ!",True,(255,220,0)); screen.blit(t,t.get_rect(center=(W//2,H-85)))
    pygame.display.flip()
`
      },
      {
        id: 139,
        title: { uk: "Підготовка до фінального показу", ru: "Подготовка к финальному показу" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 Розминка</h3><p>Завтра — ВЕЛИКА ПРЕЗЕНТАЦІЯ! Сьогодні готуємось.</p></div><div class="theory-block"><h3>📖 Як провести презентацію</h3><ol><li><strong>30 сек</strong> — pitch: назва, жанр, що особливого</li><li><strong>2 хв</strong> — демо: покажи меню → геймплей → рекорд</li><li><strong>1 хв</strong> — технічна частина: покажи найцікавіший код</li><li><strong>1 хв</strong> — відповіді на питання</li></ol></div><div class="theory-block hint"><h3>💡 Pitch шаблон</h3><p>"Моя гра називається [назва]. Це [жанр] де [що робить гравець]. Особлива деталь — [родзинка]."</p></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 Разминка</h3><p>Завтра — БОЛЬШАЯ ПРЕЗЕНТАЦИЯ! Сегодня готовимся.</p></div><div class="theory-block"><h3>📖 Как провести презентацию</h3><ol><li><strong>30 сек</strong> — питч: название, жанр, что особенного</li><li><strong>2 мин</strong> — демо: покажи меню → геймплей → рекорд</li><li><strong>1 мин</strong> — техническая часть: покажи самый интересный код</li><li><strong>1 мин</strong> — ответы на вопросы</li></ol></div><div class="theory-block hint"><h3>💡 Питч шаблон</h3><p>«Это игра где ты [кто]. Твоя цель — [что делать]. Опасность — [от чего уберечься]. Особенность — [чем уникальна].»</p></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Вивчи pitch напам\'ять (3 речення).", ru:"⭐ Выучи питч наизусть (3 предложения)." }},
          { num:2, level:"easy", text:{ uk:"⭐ Запусти гру — переконайся що все OK перед презентацією.", ru:"⭐ Запусти игру — всё OK перед презентацией." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Зроби скріншот найкращого моменту гри для афіші.", ru:"⭐⭐ Скриншот лучшего момента игры." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Підготуй відповіді на питання: \'Як зробив X?\' для 3 складних частин.", ru:"⭐⭐ Ответы на вопросы \'Как сделал X?\'" }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Запроси батьків або друга на презентацію.", ru:"⭐⭐ Пригласи родителей или друга на презентацию." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Потренуй презентацію перед дзеркалом або на відео.", ru:"⭐⭐⭐ Потренируй презентацию перед зеркалом." }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Завантаж гру на GitHub з README.md (опис, скріншот, інструкція).", ru:"⭐⭐⭐⭐ Загрузи на GitHub с README.md." }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Запиши відео геймплею (30-60 сек) для свого портфоліо.", ru:"⭐⭐⭐⭐ Запиши видео геймплея для портфолио." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# Урок 139 — Підготовка до фінального показу
# Твій персональний тренажер презентації!
import pygame, sys, random, math, time
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("Тренажер презентації")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 44, bold=True)
font     = pygame.font.SysFont("Arial", 26, bold=True)
font_sm  = pygame.font.SysFont("Arial", 19)
BG = (5, 5, 18)

# ═══ ЗАПОВНИ СВІЙ PITCH ═══════════════════════════════════
YOUR_NAME  = "[Твоє ім'я]"
GAME_NAME  = "[Назва гри]"
GAME_GENRE = "[жанр: шутер/ловець/платформер/інше]"
GAME_PITCH = "[що робить гравець]"
GAME_SPECIAL="[одна унікальна деталь]"
# ══════════════════════════════════════════════════════════

PITCH_LINES = [
    f"Моя гра називається «{GAME_NAME}».",
    f"Це {GAME_GENRE}, де {GAME_PITCH}.",
    f"Особлива деталь — {GAME_SPECIAL}.",
]

stages = [
    ("0:30", "PITCH", PITCH_LINES, (80,180,255)),
    ("2:00", "ДЕМО", ["Запусти свою гру!", "Покажи: меню → гру → рекорд", "Зіграй одну партію"], (80,220,80)),
    ("1:00", "КОД",  ["Відкрий Thonny з грою", "Поясни найцікавіший фрагмент", "Покажи як зробив головну механіку"], (255,180,80)),
    ("1:00", "Q&A",  ["Відповідай на питання!", "'Як зробив X?' — поясняй просто", "Дякуй за питання"], (180,80,255)),
]

current_stage = 0
stage_start = time.time()
stars = [{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":random.uniform(.2,.7)} for _ in range(60)]
tick = 0

while True:
    tick += 1
    elapsed = time.time() - stage_start

    for ev in pygame.event.get():
        if ev.type == pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type == pygame.KEYDOWN:
            if ev.key == pygame.K_RIGHT:
                current_stage = min(len(stages)-1, current_stage+1)
                stage_start = time.time()
            if ev.key == pygame.K_LEFT:
                current_stage = max(0, current_stage-1)
                stage_start = time.time()

    screen.fill(BG)
    for s in stars:
        pygame.draw.circle(screen,(120,120,180),(int(s["x"]),int(s["y"])),1)
        s["y"]=(s["y"]+s["s"])%H

    dur_s, title, lines, col = stages[current_stage]
    prog_pct = int(100*(current_stage+1)/len(stages))

    r2=int(128+127*abs(math.sin(tick*0.025)))
    header = font_big.render(f"КРОК {current_stage+1}/{len(stages)}: {title}", True, col)
    screen.blit(header, header.get_rect(center=(W//2, 55)))

    sub = font_sm.render(f"Тривалість: {dur_s}   |   Час зараз: {int(elapsed//60):02d}:{int(elapsed%60):02d}", True, (160,160,200))
    screen.blit(sub, sub.get_rect(center=(W//2, 100)))

    for i, line in enumerate(lines):
        bx, by = 60, 130+i*64
        pygame.draw.rect(screen,(15,15,35),(bx,by,W-120,52),border_radius=8)
        pygame.draw.rect(screen,col,(bx,by,W-120,52),2,border_radius=8)
        screen.blit(font.render(line, True, (230,230,255)), (bx+16, by+14))

    pygame.draw.rect(screen,(20,20,50),(50,H-60,W-100,20),border_radius=8)
    pygame.draw.rect(screen,col,(50,H-60,int((W-100)*prog_pct/100),20),border_radius=8)
    nav=font_sm.render("◀ / ▶  — кроки  |  Автор: "+YOUR_NAME+"  |  Гра: "+GAME_NAME,True,(130,130,180))
    screen.blit(nav,nav.get_rect(center=(W//2,H-25)))
    pygame.display.flip()
    clock.tick(60)
`
      },
      {
        id: 140,
        title: { uk: "Фінальна презентація! Випускний 🎓", ru: "Финальная презентация! Выпускной 🎓" },
        canvasMode: false,
        theory: {
          uk: `<div class="theory-block warmup"><h3>🔥 🎓 ВІТАННЯ З ЗАВЕРШЕННЯМ КУРСУ!</h3><p>Ти пройшов повний курс Python: від першого print() до власної повноцінної Pygame гри. Це СЕРЙОЗНЕ досягнення!</p></div><div class="theory-block"><h3>🏆 Що ти вмієш тепер</h3><ul><li>Python: змінні, умови, цикли, функції, класи, файли</li><li>Turtle: графіка, анімація, інтерактивність</li><li>Pygame: повна гра з нуля, ефекти, звуки</li><li>Git: зберігання проектів на GitHub</li><li>Проектне мислення: від ідеї до готового продукту</li></ul></div><div class="theory-block hint"><h3>🚀 Що далі?</h3><ul><li>Python для веб (Flask, Django)</li><li>Машинне навчання (ML з Python)</li><li>Мобільні застосунки (Kivy, React Native)</li><li>Або — продовжуй робити ігри у Pygame!</li></ul></div>`,
          ru: `<div class="theory-block warmup"><h3>🔥 🎓 ПОЗДРАВЛЯЕМ С ЗАВЕРШЕНИЕМ КУРСА!</h3><p>Ты прошёл полный курс Python: от первого print() до собственной полноценной Pygame игры. Это СЕРЬЁЗНОЕ достижение!</p></div><div class="theory-block"><h3>🏆 Что ты умеешь теперь</h3><ul><li>Python: переменные, условия, циклы, функции, классы, файлы</li><li>Turtle: графика, анимация, интерактивность</li><li>Pygame: полная игра с нуля, эффекты, звуки</li><li>Git: хранение проектов на GitHub</li><li>Проектное мышление: от идеи до готового продукта</li></ul></div><div class="theory-block hint"><h3>🚀 Что дальше?</h3><ul><li>Python для веб: Flask/Django</li><li>Анализ данных: pandas, matplotlib</li><li>Machine Learning: первые шаги</li><li>Gamedev: Godot Engine</li></ul></div>`
        },
        tasks: [
          { num:1, level:"easy", text:{ uk:"⭐ Запусти фінальний урок і насолодись феєрверком!", ru:"⭐ Запусти финальный урок — фейерверк!" }},
          { num:2, level:"easy", text:{ uk:"⭐ Зроби скріншот сертифіката та збережи.", ru:"⭐ Сделай скриншот сертификата." }},
          { num:3, level:"medium", text:{ uk:"⭐⭐ Опублікуй свій проект на GitHub.", ru:"⭐⭐ Опубликуй проект на GitHub." }},
          { num:4, level:"medium", text:{ uk:"⭐⭐ Покажи фінальну гру батькам, друзям, вчителю.", ru:"⭐⭐ Покажи игру родителям и учителю." }},
          { num:5, level:"medium", text:{ uk:"⭐⭐ Напиши список з 10 речей що навчився за весь курс.", ru:"⭐⭐ Список 10 вещей которым научился за курс." }},
          { num:6, level:"hard", text:{ uk:"⭐⭐⭐ Познайом когось з Python — стань ментором!", ru:"⭐⭐⭐ Познакомь кого-то с Python — стань ментором!" }},
          { num:7, level:"star", text:{ uk:"⭐⭐⭐⭐ Почни вивчати Pygame Zero, Godot або Unity — наступний рівень!", ru:"⭐⭐⭐⭐ Начни изучать Godot или Unity — следующий уровень!" }},
          { num:8, level:"star", text:{ uk:"⭐⭐⭐⭐ Поділись досвідом: напиши пост про свою гру у соцмережах.", ru:"⭐⭐⭐⭐ Напиши пост о своей игре в соцсетях." }},
        ],
        starterCode: `# ⚠️ Запускай у Thonny!
# 🎓 УРОК 140 — ФІНАЛЬНА ПРЕЗЕНТАЦІЯ! ВИПУСКНИЙ!
# ╔══════════════════════════════════════════════════════════╗
# ║  КУРС PYTHON ЗАВЕРШЕНО!                                  ║
# ║  Академія Мій комп'ютер ● Дніпро                        ║
# ╚══════════════════════════════════════════════════════════╝
import pygame, sys, random, math, array
pygame.mixer.init(44100,-16,1,512)
pygame.init()
W, H = 800, 600
screen = pygame.display.set_mode((W, H))
pygame.display.set_caption("🎓 Випускний — Академія Мій комп'ютер")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial",58,bold=True)
font_md  = pygame.font.SysFont("Arial",34,bold=True)
font     = pygame.font.SysFont("Arial",24,bold=True)
font_sm  = pygame.font.SysFont("Arial",18)
BG=(3,3,12); tick=0

# ── Зміни на своє ім'я! ──────────────────────────────────
YOUR_NAME = "[Твоє ім'я]"
# ─────────────────────────────────────────────────────────

def beep(f=440,d=0.08,v=0.22):
    n=int(44100*d); buf=array.array('h',[int(v*32767*math.sin(2*math.pi*f*i/44100))for i in range(n)])
    pygame.sndarray.make_sound(buf).play()

stars=[{"x":random.uniform(0,W),"y":random.uniform(0,H),"s":random.uniform(.15,1.2),"b":random.randint(80,220)} for _ in range(180)]
particles=[]; fw_timer=0; shake=0; flash=0
notes=[523,659,784,1047,1319]; note_i=0; note_t=0

SKILLS=[
    "🐍 Python: змінні, функції, класи, файли",
    "🐢 Turtle: графіка і анімація",
    "🎮 Pygame: повна гра від нуля",
    "💾 Git/GitHub: зберігання проектів",
    "🗺️ Проектне мислення: від ідеї до продукту",
]

def firework(x,y):
    global shake,flash
    col=[random.randint(100,255) for _ in range(3)]
    for _ in range(22):
        a=random.uniform(0,2*math.pi); s=random.uniform(3,9)
        particles.append({"x":float(x),"y":float(y),"vx":math.cos(a)*s,"vy":math.sin(a)*s,"life":random.randint(35,70),"col":tuple(col),"sz":random.uniform(2,6)})
    shake=10; flash=8

for _ in range(6): firework(random.randint(80,W-80),random.randint(60,H-100))

while True:
    tick+=1; fw_timer+=1; note_t+=1
    if fw_timer>=80: fw_timer=0; firework(random.randint(80,W-80),random.randint(60,H-100))
    if note_t>=35: note_t=0; beep(notes[note_i%len(notes)],0.12,0.18); note_i+=1

    for ev in pygame.event.get():
        if ev.type==pygame.QUIT: pygame.quit(); sys.exit()
        if ev.type==pygame.KEYDOWN:
            firework(random.randint(80,W-80),random.randint(60,H-100))

    for p in particles[:]:
        p["x"]+=p["vx"]; p["y"]+=p["vy"]; p["vy"]+=0.18; p["life"]-=1; p["sz"]=max(1,p["sz"]-0.06)
        if p["life"]<=0: particles.remove(p)
    ox=random.randint(-shake,shake)if shake>0 else 0; oy=random.randint(-shake,shake)if shake>0 else 0
    if shake>0: shake-=1

    gs=pygame.Surface((W,H)); gs.fill(BG)
    for s in stars:
        pygame.draw.circle(gs,(s["b"],s["b"],s["b"]),(int(s["x"]),int(s["y"])),1)
        s["y"]=(s["y"]+s["s"])%H
    for p in particles: pygame.draw.circle(gs,p["col"],(int(p["x"]),int(p["y"])),max(1,int(p["sz"])))

    r=int(128+127*abs(math.sin(tick*0.018)))
    t0=font_big.render("🎓 КУРС ЗАВЕРШЕНО!",True,(r,220,255-r)); gs.blit(t0,t0.get_rect(center=(W//2,70)))
    t1=font_md.render(f"Вітаємо, {YOUR_NAME}!",True,(255,210,80)); gs.blit(t1,t1.get_rect(center=(W//2,130)))

    cert_rect=pygame.Rect(30,165,W-60,160)
    pygame.draw.rect(gs,(15,15,40),cert_rect,border_radius=12)
    pygame.draw.rect(gs,(100,80,200),cert_rect,3,border_radius=12)
    gs.blit(font_sm.render("СЕРТИФІКАТ",True,(180,160,255)),(50,178))
    gs.blit(font.render(f"{YOUR_NAME} успішно завершив(ла)",True,(230,230,255)),(50,205))
    gs.blit(font.render("повний курс Python (110 уроків)",True,(230,230,255)),(50,233))
    gs.blit(font_sm.render("Академія Мій комп'ютер  ●  Дніпро  ●  Python + Pygame",True,(140,120,200)),(50,265))
    gs.blit(font_sm.render("★ ★ ★ ★ ★",True,(255,200,0)),(W-160,178))

    for i,skill in enumerate(SKILLS):
        delay=i*12
        if tick>delay+20:
            t=font_sm.render(skill,True,(160+i*10,200-i*15,100+i*20)); gs.blit(t,(40,345+i*40))

    tip=font_sm.render("Натисни будь-яку клавішу — феєрверк! 🎆",True,(160,160,200)); gs.blit(tip,tip.get_rect(center=(W//2,H-20)))
    acad=font_sm.render("Академія Мій комп'ютер ● Дніпро ● sosca17@gmail.com",True,(80,80,120)); gs.blit(acad,acad.get_rect(center=(W//2,H-42)))

    screen.fill((0,0,0)); screen.blit(gs,(ox,oy))
    if flash>0:
        fl=pygame.Surface((W,H)); fl.set_alpha(flash*18); fl.fill((255,255,255)); screen.blit(fl,(0,0)); flash-=1
    pygame.display.flip(); clock.tick(60)
# 🎓 ✅ КУРС ЗАВЕРШЕНО! 110 УРОКІВ!
`
      }
    ]
  }
];
