from django.contrib import admin
from django.utils.html import format_html
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "short_description",
        "created_at",
        "is_published",
        "related_courses",
        "image_preview"
    )
    list_editable = ("is_published",)
    list_filter = ("is_published", "created_at", "courses")
    search_fields = ("title", "description", "rich_content")
    ordering = ("-created_at",)
    filter_horizontal = ("courses",)
    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at", "image_preview")

    fieldsets = (
        ("Основная информация", {
            "fields": (
                "title",
                "description",
                "rich_content",
                "is_published",
            )
        }),
        ("Медиа и связанные курсы", {
            "fields": (
                "image",
                "image_preview",
                "courses",
            )
        }),
        ("Служебная информация", {
            "classes": ("collapse",),
            "fields": (
                "created_at",
                "updated_at",
            )
        }),
    )

    def short_description(self, obj):
        return obj.description[:50] + "…" if len(obj.description) > 50 else obj.description
    short_description.short_description = "Описание"

    def related_courses(self, obj):
        return ", ".join(course.name for course in obj.courses.all()) or "-"
    related_courses.short_description = "Курсы"

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 150px;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Превью изображения"

    @admin.action(description="Опубликовать выбранные посты")
    def publish_selected(self, request, queryset):
        queryset.update(is_published=True)

    @admin.action(description="Снять публикацию с выбранных постов")
    def unpublish_selected(self, request, queryset):
        queryset.update(is_published=False)

    actions = [publish_selected, unpublish_selected]
