from rest_framework import serializers
from .models import Discount


class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get('request')
        if request:
            if 'image' in representation:
                representation['image'] = request.build_absolute_uri(
                    instance.image.url)
        return representation
