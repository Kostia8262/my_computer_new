from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'phone', 'message')
    readonly_fields = ('created_at',)

    # fieldsets = (
    #     ('Пользовательски данные', {
    #         'fields': ('name', 'phone')
    #     }),
    #     ('Сообщение', {
    #         'fields': ('message',)
    #     }),
    #     ('Дата отправки', {
    #         'fields': ('created_at',),
    #     })
    # )

