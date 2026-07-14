from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from main.models import Course


class Post(models.Model):
    """Модель постов с редактором текста и связью с курсами."""

    title = models.CharField(
        max_length=65, verbose_name="Заголовок",
        help_text="Введите заголовок статьи."
    )
    description = models.TextField(
        max_length=200,
        verbose_name="Описание",
        help_text="Введите краткое описание статьи."
    )
    rich_content = CKEditor5Field(
        config_name='default',
        verbose_name="Текст статьи",
        help_text="Форматируемый текст статьи."
    )
    courses = models.ManyToManyField(
        Course, blank=True, verbose_name="Связанные курсы",
        help_text="Выберите курсы, к которым относится эта статья."
    )
    image = models.ImageField(
        upload_to="news/", blank=True, null=True, verbose_name="Изображение",
        help_text="Загрузите изображение для статьи."
    )
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Дата публикации"
    )
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name="Дата обновления"
    )
    is_published = models.BooleanField(
        default=False, verbose_name="Опубликовано",
        help_text="Отметьте, если статья должна быть опубликована."
    )

    class Meta:
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
