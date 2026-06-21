from django.db import models
from django.core.validators import (
    MaxLengthValidator,
    MinValueValidator,
    MaxValueValidator,
    FileExtensionValidator
)
from recurrence.fields import RecurrenceField


class Discount(models.Model):
    # Название акции
    title = models.CharField(
        max_length=65,
        verbose_name="Название акции",
        help_text="Короткое название акции (до 65 символов)"
    )

    # Краткое описание
    description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Описание акции",
        validators=[MaxLengthValidator(700)],
        help_text="До 700 символов."
    )

    # Баннеры (с валидацией по расширению)
    desktop_banner = models.ImageField(
        upload_to='discounts/',
        blank=True,
        null=True,
        verbose_name="Баннер (десктоп)",
        help_text="JPG/PNG/WebP, 360x600px, до 500KB.",
        validators=[
            FileExtensionValidator(allowed_extensions=[
                                   "jpg", "jpeg", "png", "webp"])
        ]
    )
    mobile_banner = models.ImageField(
        upload_to='discounts/',
        blank=True,
        null=True,
        verbose_name="Баннер (мобайл)",
        help_text="JPG/PNG/WebP, 360x220px, до 300KB.",
        validators=[
            FileExtensionValidator(allowed_extensions=[
                                   "jpg", "jpeg", "png", "webp"])
        ]
    )

    # Скидка и промокод
    discount_percent = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name="Размер скидки (%)",
        help_text="Значение от 0 до 100"
    )

    promo = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name="Промокод",
        help_text="Если применим. Уникальный.",
        unique=True
    )

    has_discount = models.BooleanField(
        default=False,
        verbose_name="Показывать скидку"
    )

    has_promo = models.BooleanField(
        default=False,
        verbose_name="Показывать промокод"
    )

    # Время действия
    start_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Дата начала"
    )

    end_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Дата окончания"
    )

    # Повторение (опционально)
    recurrence = RecurrenceField(
        blank=True,
        null=True,
        verbose_name="Повторение акции"
    )

    # Таймер обратного отсчета
    show_timer = models.BooleanField(
        default=False,
        verbose_name="Показать таймер"
    )

    # Активность
    is_active = models.BooleanField(
        default=True,
        verbose_name="Акция активна"
    )

    class Meta:
        verbose_name = "Скидка"
        verbose_name_plural = "Скидки"
        ordering = ["-start_date"]

    def __str__(self):
        return f"{self.title} ({self.discount_percent}%)"
