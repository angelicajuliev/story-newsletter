from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from newsletter.models import Recipient, Newsletter, Category
from newsletter.serializers import RecipientSerializer, NewsletterSerializer, CategorySerializer, CreateRecipientSerializer, SendNewsletterSerializer, CreateNewsletterSerializer
from newsletter.service import send_newsletter_by_id


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

    def get_serializer_class(self):
        if self.action == 'send':
            return SendNewsletterSerializer
        elif self.action == 'create':
            return CreateNewsletterSerializer
        
        return super().get_serializer_class()

    @action(detail=True, methods=['put'], url_path='send')
    def send(self, _, pk):
        id = pk
        send_newsletter_by_id(id)
        return Response(status=200)
