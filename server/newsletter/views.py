from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework import filters, views, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.response import Response

from newsletter.models import Category, Newsletter, Recipient
from newsletter.serializers import (
    CategorySerializer,
    CreateNewsletterSerializer,
    CreateRecipientSerializer,
    NewsletterSerializer,
    RecipientSerializer,
    SendNewsletterSerializer,
    UnsubscribeSerializer,
)
from newsletter.services import (
    bulk_create_recipients,
    send_newsletter_by_id,
    unsubscribe_by_email,
    unsubscribe_by_email_and_category,
)
from newsletter.utils import store_attachment_file


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RecipientViewSet(viewsets.ModelViewSet):
    queryset = Recipient.objects.all()
    serializer_class = RecipientSerializer

    def get_serializer_class(self):
        if self.action == "create":
            return CreateRecipientSerializer
        return RecipientSerializer

    def perform_create(self, serializer):
        categories = Category.objects.all()
        obj = serializer.save()
        obj.category_subscription.set(categories)

    @action(detail=False, methods=["delete"], url_path="unsubscribe")
    def unsubscribe(self, request):
        serializer = UnsubscribeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        category = serializer.validated_data.get("category")

        try:
            if category:
                unsubscribe_by_email_and_category(email, category)
            else:
                unsubscribe_by_email(email)
        except Recipient.DoesNotExist:
            return Response(status=404)

        return Response(status=200)


class BulkRecipientView(views.APIView):
    parser_classes = [FileUploadParser]

    def put(self, request):
        file_obj = request.data["file"]
        recipients = []

        for line in file_obj:
            email = line.decode("utf-8").strip()

            try:
                validate_email(email)
                recipient = Recipient(email=email)
                recipients.append(recipient)
            except ValidationError:
                pass

        bulk_create_recipients(recipients)
        return Response(status=204)


class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at", "scheduled_at"]
    ordering = ["-created_at"]

    def get_serializer_class(self):
        if self.action == "send":
            return SendNewsletterSerializer
        elif self.action == "create":
            return CreateNewsletterSerializer

        return super().get_serializer_class()

    @action(detail=True, methods=["put"], url_path="send")
    def send(self, _, pk):
        id = pk
        send_newsletter_by_id(id)
        return Response(status=200)


class NewsletterAttachmentView(views.APIView):
    parser_classes = [MultiPartParser]

    def put(self, request, id, filename):
        file_obj = request.data["file"]
        attachment = store_attachment_file(id, file_obj)
        newsletter = Newsletter.objects.get(pk=id)
        newsletter.attachment = attachment
        newsletter.save()

        return Response(status=204)
