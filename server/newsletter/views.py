from rest_framework import viewsets
from newsletter.models import Recipient, Newsletter, Category
from newsletter.serializers import RecipientSerializer, NewsletterSerializer, CategorySerializer, CreateRecipientSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class RecipientViewSet(viewsets.ModelViewSet):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateRecipientSerializer
        return RecipientSerializer
    
    def perform_create(self, serializer):
        categories = Category.objects.all()
        obj = serializer.save()
        obj.category_subscription.set(categories)


class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
