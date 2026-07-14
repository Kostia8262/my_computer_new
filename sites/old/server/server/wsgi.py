"""
WSGI config for server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
import sys
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
os.environ.setdefault('PYTHONIOENCODING', 'utf-8')
os.environ.setdefault('LANG', 'en_US.UTF-8')
os.environ.setdefault('LC_ALL', 'en_US.UTF-8')

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

# LiteSpeed's lswsgi runs this under the system-wide Python (not this site's
# own venv) unless told otherwise, and this vhost's `env LS_PYTHONBIN`/
# `PYTHONPATH` directives were confirmed not to change that on this LSWS
# install. Point sys.path at the venv's site-packages directly instead, so
# the packages `pip install -r requirements.txt` puts in the venv are what
# actually get imported, regardless of which interpreter lswsgi launches.
_venv_site_packages = (
    Path(__file__).resolve().parent.parent.parent
    / 'lib' / f'python{sys.version_info.major}.{sys.version_info.minor}' / 'site-packages'
)
if _venv_site_packages.is_dir():
    sys.path.insert(0, str(_venv_site_packages))

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
