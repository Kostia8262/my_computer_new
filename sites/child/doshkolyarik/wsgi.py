import os
import sys

project_root = '/usr/local/lsws/child.mycomputer.education/html'

if project_root not in sys.path:
    sys.path.insert(0, project_root)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'doshkolyarik.settings')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
