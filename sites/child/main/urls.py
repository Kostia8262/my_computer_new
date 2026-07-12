from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^lang/(?P<language_code>[\w-]+)/$', views.select_lang,name='select_lang'),
    path('robots.txt', views.robots_txt, name='robots_txt'),
    path('sitemap.xml', views.sitemap_xml, name='sitemap_xml'),
    path('', views.index,name='index'),
]