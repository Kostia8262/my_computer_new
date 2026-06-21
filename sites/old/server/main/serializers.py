from rest_framework.serializers import ModelSerializer
from .models import Course, Theme, Paragraph, CourseLevel, Spec, LevelSpec

class ParagraphSerializer(ModelSerializer):
    class Meta:
        model = Paragraph
        fields = '__all__'


class ThemeSerializer(ModelSerializer):
    paragraphs = ParagraphSerializer(many=True, read_only=True)

    class Meta:
        model = Theme
        fields = '__all__'


class SpecSerializer(ModelSerializer):
    class Meta:
        model = Spec
        fields = '__all__'

class LevelSpecSerializer(ModelSerializer):
    class Meta:
        model = LevelSpec
        fields = '__all__'

class CourseLevelSerializer(ModelSerializer):
    specs = LevelSpecSerializer(many=True, read_only=True)
    class Meta:
        model = CourseLevel
        fields = '__all__'

class CourseSerializer(ModelSerializer):
    themes = ThemeSerializer(many=True, read_only=True)
    specs = SpecSerializer(many=True, read_only=True)
    levels = CourseLevelSerializer(many=True, read_only=True)


    class Meta:
        model = Course
        fields = '__all__'
