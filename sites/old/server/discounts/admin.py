from django.contrib import admin
from django.contrib.admin.widgets import AdminSplitDateTime
from django import forms
from django.utils.html import format_html
from .models import Discount
from recurrence.forms import RecurrenceWidget


class DiscountAdminForm(forms.ModelForm):
    """Форма для редактирования скидок в админке."""
    class Meta:
        model = Discount
        fields = "__all__"
        widgets = {
            "start_date": AdminSplitDateTime(),
            "end_date": AdminSplitDateTime(),
            "recurrence": RecurrenceWidget(),
        }


@admin.action(description="Активировать выбранные скидки")
def make_active(modeladmin, request, queryset):
    queryset.update(is_active=True)


@admin.action(description="Деактивировать выбранные скидки")
def make_inactive(modeladmin, request, queryset):
    queryset.update(is_active=False)


@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    actions = [make_active, make_inactive]
    form = DiscountAdminForm

    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'is_active')
        }),
        ('Баннеры', {
            'fields': ('desktop_banner_preview', 'desktop_banner_size', 'desktop_banner', 'mobile_banner_preview', 'mobile_banner_size', 'mobile_banner')
        }),
        ('Скидка', {
            'fields': ('has_discount', 'discount_percent', 'has_promo', 'promo')
        }),
        ('Время действия и повторение', {
            'fields': ('start_date', 'end_date', 'recurrence', 'show_timer')
        }),
    )

    readonly_fields = ('desktop_banner_preview', 'mobile_banner_preview',
                       'desktop_banner_size', 'mobile_banner_size',)

    def desktop_banner_preview(self, obj):
        if obj.desktop_banner:
            return format_html('<img src="{}" style="height: 600px; width: 360px; max-width: 100%; object-fit:cover;">', obj.desktop_banner.url)
        return "Нет баннера"

    def mobile_banner_preview(self, obj):
        if obj.mobile_banner:
            return format_html('<img src="{}" style="height: 220px; width: 360px; max-width: 100%; object-fit:cover;">', obj.mobile_banner.url)
        return "Нет баннера"

    def desktop_banner_size(self, obj):
        if obj.desktop_banner:
            return f"{obj.desktop_banner.width} x {obj.desktop_banner.height} px"
        return "Нет баннера"

    def mobile_banner_size(self, obj):
        if obj.mobile_banner:
            return f"{obj.mobile_banner.width} x {obj.mobile_banner.height} px"
        return "Нет баннера"

    desktop_banner_preview.short_description = "Превью десктоп баннера"
    mobile_banner_preview.short_description = "Превью мобильного баннера"
    desktop_banner_size.short_description = "Размер прикрепленного"
    mobile_banner_size.short_description = "Размер прикрепленного"

    list_display = ['title', 'discount_percent',
                    'is_active', 'end_date', 'mobile_banner_preview',]

    list_filter = ['is_active',]

    search_fields = ("title", 'end_date',)

    list_editable = ("is_active", "discount_percent", 'end_date',)
