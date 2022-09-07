# -*- coding: utf-8 -*-
import os, sys
sys.path.insert(0, '/home/v/vladisga/vladisga.beget.tech/Beck')
sys.path.insert(1, '/home/v/vladisga/vladisga.beget.tech/djangenv/lib/python3.10/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'Beck.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()