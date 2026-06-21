from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Discount
from .serializers import DiscountSerializer
from django.utils.timezone import now


@api_view(['GET'])
def discounts(request):
    discounts = Discount.objects.filter(is_active=True, end_date__gte=now())
    serializer = DiscountSerializer(discounts, many=True, context={
                                    'request': request})
    return Response(serializer.data)
