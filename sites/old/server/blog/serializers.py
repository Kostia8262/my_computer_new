from rest_framework import serializers
from .models import Post


class AbsoluteImageMixin:
    """Turns the image field into an absolute URL, or null if no image is
    attached — instance.image.url raises ValueError on an empty ImageField,
    so it must never be called unconditionally."""

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request and 'image' in representation:
            representation['image'] = (
                request.build_absolute_uri(instance.image.url)
                if instance.image else None
            )
        return representation


class PostSerializer(AbsoluteImageMixin, serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class PostListSerializer(AbsoluteImageMixin, serializers.ModelSerializer):
    """Lightweight serializer for the /api/posts/ list view — excludes
    rich_content, which can be large and is only needed on the detail page."""
    class Meta:
        model = Post
        exclude = ['rich_content']
