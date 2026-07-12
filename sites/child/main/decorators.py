from functools import wraps
from django.conf import settings
from django.utils.translation import activate, check_for_language, get_language


def set_language(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        language_code = request.session.get(
            'django_language', settings.LANGUAGE_CODE)
        activate(language_code)
        return function(request, *args, **kwargs)

    return wrap
