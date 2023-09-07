from django.urls import include, path, re_path
from rest_framework import routers

from metrics.views import DashboardView
from newsletter.views import (
    BulkRecipientView,
    CategoryViewSet,
    NewsletterAttachmentView,
    NewsletterViewSet,
    RecipientViewSet,
)

router = routers.DefaultRouter()
router.register(r"recipients", RecipientViewSet)
router.register(r"newsletters", NewsletterViewSet)
router.register(r"categories", CategoryViewSet)

urlpatterns = [
    path("recipients/bulk-create/", BulkRecipientView.as_view()),
    re_path(
        r"^newsletters/(?P<id>[0-9]+)/upload/(?P<filename>[^/]+)/$",
        NewsletterAttachmentView.as_view(),
    ),
    path("dashboard", DashboardView.as_view()),
    path("", include(router.urls)),
]
