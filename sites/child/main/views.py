from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from .models import Order
from .decorators import set_language
from .telegramm import send_message
from django.utils.translation import activate, check_for_language, get_language
from django.http import JsonResponse
# Create your views here.


@set_language
def index(request):
    print(get_language())
    if request.method == 'POST':
        client_name = request.POST.get('clientName', False)
        client_phone = request.POST.get('clientPhone', False)
        client_message = request.POST.get('clientMessage', False)
        # captcha = request.POST.get('g-recaptcha-response', False)
        print(request.POST)
        # params = {'secret': '6LfW78IaAAAAAA0phM-k5DB95tq80x-yalicb8Y3',
        #           'response': captcha}
        # captcha_resolved = False
        # try:
        #     captcha_resolved = requests.post(
        #         'https://www.google.com/recaptcha/api/siteverify', params=params).json()['success']
        # except Exception as e:
        #     print(e)
        # if captcha_resolved:
        #     print(captcha_resolved)
        if client_name and client_phone and client_message:
            order = Order(
                name=client_name,
                phone=client_phone,
                message=client_message,
            )
            order.save()
            mailText = f'Заявка укр.дошк.\nИмя:{client_name} \nТелефон:{client_phone} \nСообщение:{client_message}'
            try:
                send_message(f'Новая заявка c сайта №{order.id}:\n{mailText}')
            except:
                print("Ошибка отправки в телеграмм")
            # send_mail('Новая заявка c сайта',mailText,'soscomputeracademy@gmail.com',['soscomputeracademy@gmail.com'],fail_silently=False)
            info = {"message": "Дякуем за заявку!"}
            return JsonResponse(info)
        else:
            info = {"message": "Виникла помилка. Будь ласка, спробуйте ще раз."}
            return JsonResponse(info)
        # else:
        #     print(captcha_resolved)
        #     return HttpResponse("captcha")
    return render(request, 'main/index.html', {})


def select_lang(request, language_code):
    print(get_language())

    go_next = request.META.get('HTTP_REFERER', '/')
    response = HttpResponseRedirect(go_next)
    if language_code and check_for_language(language_code):
        if hasattr(request, 'session'):
            request.session['LANGUAGE_SESSION_KEY'] = language_code
            request.session['django_language'] = language_code
            request.session['_language'] = language_code
            print(request.session)
        else:
            response.set_cookie(settings.LANGUAGE_COOKIE_NAME, language_code)
        activate(language_code)
    print(f"Switching to language: {language_code}!")
    print(get_language())
    return response
