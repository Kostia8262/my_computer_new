from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


class App(models.Model):
    class Meta:
        verbose_name = "Приложение"
        verbose_name_plural = "Приложения"

    name = models.TextField(default='', verbose_name='Приложение')

    def __str__(self):
        return self.name


class Course(models.Model):

    class Meta:
        verbose_name = 'Курс'
        verbose_name_plural = "Курсы"

    TAGS = [
        ('child', 'Детский'),
        ('dev', 'Программирование'),
        ('design', 'Дизайн'),
        ('office', 'Офисный'),
    ]

    name = models.CharField(max_length=200, verbose_name='Название курса')
    description = models.TextField(
        verbose_name='Описание', default='', blank=True)
    tag = models.CharField(choices=TAGS, max_length=50,
                           default='', blank=True, verbose_name='Тег')
    image = models.ImageField(default=None, null=True,
                              blank=True, verbose_name='Оболожка')
    programm = models.FileField(default=None, null=True,
                                blank=True, verbose_name='Программа курса', upload_to='pdfs/')
    apps = models.ManyToManyField(App, default=None, null=True,
                                  blank=True, verbose_name='Изучаемые приложения')
    demo = models.BooleanField(default=False, verbose_name='Демонстрационный')

    is_active = models.BooleanField(default=True, verbose_name='Доступный')

    def __str__(self):
        return f'{self.name}'


class Theme(models.Model):

    class Meta:
        verbose_name = 'Тема'
        verbose_name_plural = "Темы"

    LEVELS = [
        ('base', 'Базовый'),
        ('advanced', 'Продвинутый'),
        ('expert', 'Экспертный'),
    ]
    order = models.IntegerField(
        verbose_name='Порядковый номер темы', default=0)
    name = models.CharField(max_length=200, verbose_name='Название темы')
    level = models.CharField(
        choices=LEVELS, max_length=50, default='base', verbose_name='Уровень темы')
    course = models.ForeignKey(
        Course, related_name='themes', on_delete=models.CASCADE, verbose_name='Курс')

    def __str__(self):
        return f'{self.name}'


class Paragraph(models.Model):

    class Meta:
        verbose_name = 'Пункт'
        verbose_name_plural = "Пункты"

    name = models.CharField(max_length=200, verbose_name='Название пункта')
    theme = models.ForeignKey(
        Theme, related_name='paragraphs', on_delete=models.CASCADE, verbose_name='Тема')

    def __str__(self):
        return f'{self.name}'


class Spec(models.Model):

    class Meta:
        verbose_name = "Спецификация"
        verbose_name_plural = "Спецификации"

    text = models.TextField(default='', verbose_name='Спецификация')
    course = models.ForeignKey(
        Course, related_name='specs', on_delete=models.CASCADE, verbose_name='Курс')

    def __str__(self):
        return self.text


class CourseLevel(models.Model):

    class Meta:
        verbose_name = "Уровень"
        verbose_name_plural = "Уровни"

    LEVELS = [
        ('base', 'Базовый'),
        ('advanced', 'Продвинутый'),
        ('expert', 'Экспертный'),
    ]
    name = models.CharField(max_length=200, default='Курс',
                            verbose_name='Название уровня')
    level = models.CharField(
        choices=LEVELS, max_length=50, default='base', verbose_name='Уровень')
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name='Стоимость')
    discount = models.IntegerField(default=0, validators=[MinValueValidator(
        0), MaxValueValidator(100)], verbose_name='Скидка')
    course = models.ForeignKey(
        Course, related_name='levels', on_delete=models.CASCADE, verbose_name='Курс')

    def __str__(self):
        return self.level


class LevelSpec(models.Model):

    class Meta:
        verbose_name = "Спецификация"
        verbose_name_plural = "Спецификации"

    text = models.TextField(default='', verbose_name='Спецификация')
    level = models.ForeignKey(
        CourseLevel, related_name='specs', on_delete=models.CASCADE, verbose_name='Уровень')

    def __str__(self):
        return self.text
