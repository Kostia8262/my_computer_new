# resources.py
from import_export import resources, fields
from .models import Theme, Course

class ThemeResource(resources.ModelResource):
    class Meta:
        model = Theme


class CourseResource(resources.ModelResource):
    themes = fields.Field(column_name='themes')

    def dehydrate_themes(self, course):
        return ', '.join(t.name for t in course.themes.all())

    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'themes')