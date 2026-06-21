from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('demo/', views.demo, name='demo'),
    re_path(r'^course/(?P<id>\d+)/$', views.course, name='course_detail'),
    re_path(r'^programm/(?P<id>\d+)/$', views.download_programm, name='download_programm'),
]
