from django.urls import path, re_path
from . import views

urlpatterns = [
    path('csrf/', views.get_csrf_token, name='csrf'),
    path('', views.post_order, name='post_order'),
]
