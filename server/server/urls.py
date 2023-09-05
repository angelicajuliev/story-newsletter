from rest_framework import routers
from django.urls import include, path
from newsletter.views import RecipientViewSet, NewsletterViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register(r'recipients', RecipientViewSet)
router.register(r'newsletters', NewsletterViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
