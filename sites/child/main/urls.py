from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^lang/(?P<language_code>[\w-]+)/$', views.select_lang,name='select_lang'),
    path('', views.index,name='index'),
]