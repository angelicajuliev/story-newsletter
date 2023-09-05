from rest_framework import routers
from django.contrib import admin
from django.urls import include, path
from newsletter.views import EmailViewSet, NewsletterViewSet

router = routers.DefaultRouter()
router.register(r'emails', EmailViewSet)
router.register(r'newsletters', NewsletterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
