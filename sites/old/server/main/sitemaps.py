from django.contrib.sitemaps import Sitemap
from main.models import Course
from blog.models import Post

STATIC_PAGES = [
    ('/', 1.0, 'weekly'),
    ('/posts/', 0.7, 'weekly'),
    ('/privacy/', 0.3, 'monthly'),
    ('/cookies/', 0.3, 'monthly'),
    ('/public-offer/', 0.3, 'monthly'),
    ('/refund/', 0.3, 'monthly'),
    ('/terms/', 0.3, 'monthly'),
]


class StaticSitemap(Sitemap):
    protocol = 'https'

    def items(self):
        return STATIC_PAGES

    def location(self, item):
        return item[0]

    def priority(self, item):
        return item[1]

    def changefreq(self, item):
        return item[2]


class CourseSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.9
    protocol = 'https'

    def items(self):
        return Course.objects.filter(is_active=True, demo=False)

    def location(self, course):
        return f'/course/{course.id}/'


class PostSitemap(Sitemap):
    changefreq = 'monthly'
    priority = 0.6
    protocol = 'https'

    def items(self):
        return Post.objects.filter(is_published=True)

    def location(self, post):
        return f'/posts/{post.id}/'

    def lastmod(self, post):
        return post.updated_at
