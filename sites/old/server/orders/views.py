from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import OrderSerializer
import json

from .models import Order
from .telegramm import send_message
from .crm_forward import forward_to_main_crm
from .mailer import send_lead_notification
from localization.models import SiteSettings


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrf_token': get_token(request)})


@csrf_protect
@api_view(['POST'])
def post_order(request):
    site_settings = SiteSettings.objects.first()
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        order = serializer.save()
        data = serializer.validated_data
        mailText = f'Имя:{data["name"]} \nТелефон:{data["phone"]} \nСообщение:{data["message"]}'
        try:
            mailTextFormatted = f'{site_settings.tag}\nНовая заявка №{order.id}:\n{mailText}'
            send_message(mailTextFormatted)
        except Exception as e:
            print(e)
            print(site_settings.tag)

        try:
            forward_to_main_crm(order)
        except Exception as e:
            print(f'CRM forward error: {e}')

        try:
            send_lead_notification(order)
        except Exception as e:
            print(f'Email notification error: {e}')

        return Response({'message': 'Заявка успешно отправлена', 'order': order.id})
    else:
        return Response(serializer.errors, status=400)
