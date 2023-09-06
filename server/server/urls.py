from rest_framework import routers
from django.urls import include, path, re_path
from newsletter.views import RecipientViewSet, NewsletterViewSet, CategoryViewSet, NewsletterAttachmentView, BulkRecipientViewSet

router = routers.DefaultRouter()
router.register(r'recipients', RecipientViewSet)
router.register(r'newsletters', NewsletterViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('recipients/bulk-create/', BulkRecipientViewSet.as_view()),
    re_path(r'^newsletters/(?P<id>[0-9]+)/upload/(?P<filename>[^/]+)/$', NewsletterAttachmentView.as_view()),
    path('', include(router.urls)),

]
