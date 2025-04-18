"""
ASGI config for tripleT project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from django.urls import path
from tic_tac_toe.consumers import test
from channels.routing import ProtocolTypeRouter, URLRouter
from django.contrib.staticfiles.handlers import ASGIStaticFilesHandler


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tripleT.settings')

# application = get_asgi_application()


application = ProtocolTypeRouter({
    "http" : ASGIStaticFilesHandler( get_asgi_application() ),
    "websocket" : URLRouter([
        path("ws/game/",test.as_asgi())
    ])
})
