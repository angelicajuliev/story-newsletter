from rest_framework import viewsets
from newsletter.models import Email, Newsletter
from newsletter.serializers import EmailSerializer, NewsletterSerializer

class EmailViewSet(viewsets.ModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
