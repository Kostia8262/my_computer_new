# resources.py
from import_export import resources, fields, widgets
from .models import Theme, Course

class ThemeResource(resources.ModelResource):
    class Meta:
        model = Theme


class CourseResource(resources.ModelResource):
    themes = fields.Field(
        column_name='themes',
        attribute='themes_set',
        widget=widgets.ForeignKeyWidget(Theme)
    )

    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'themes')