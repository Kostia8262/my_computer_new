from django.db import models
from django.conf import settings
from django.utils.translation import gettext as _
# Create your models here.


class SiteSettingsManager(models.Manager):
    def get_or_create_singleton(self):
        obj, created = self.get_or_create(pk=1)
        return obj


class SiteSettings(models.Model):
    CURRENCY = [
        ('RUB', _('Рубль')),
        ('UAH', _('Гривна')),
        ('USD', _('Доллар')),
    ]
    tag = models.CharField(max_length=255, verbose_name='Тег сайта')
    lang = models.CharField(choices=settings.LANGUAGES, max_length=50,
                            default=settings.LANGUAGES[0], verbose_name='Язык')
    currency = models.CharField(choices=CURRENCY, max_length=50,
                                default=CURRENCY[0], verbose_name='Валюта')

    objects = SiteSettingsManager()

    class Meta:
        verbose_name = _("Локализация")
        verbose_name_plural = _("Локализация")

    def __str__(self):
        return "Локализация"

    def get_absolute_url(self):
        return reverse("Localization_detail", kwargs={"pk": self.pk})
