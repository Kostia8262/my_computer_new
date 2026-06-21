from django.contrib import admin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in SiteSettings._meta.fields if field.name != 'id']

    def has_add_permission(self, request):
        existing_records_count = SiteSettings.objects.count()
        return not existing_records_count > 0
