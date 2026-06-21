from django.db import models

class Order(models.Model):
    name = models.CharField(max_length=100, verbose_name='Имя пользователя')
    phone = models.CharField(max_length=20, verbose_name='Номер телефона')
    message = models.TextField(verbose_name='Сообщение')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Заявка пользователя'
        verbose_name_plural = 'Заявки пользователей'