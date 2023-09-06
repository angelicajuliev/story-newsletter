from rest_framework import serializers
from newsletter.models import Recipient, Newsletter, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipient
        fields = '__all__'

class CreateRecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipient
        fields = ('email',)

class UnsubscribeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    category = serializers.CharField(required=False)

class NewsletterSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Newsletter
        fields = '__all__'

class CreateNewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ('id', 'title', 'content', 'category', 'scheduled_at')

class SendNewsletterSerializer(serializers.Serializer):
    """
    Serializer for sending a newsletter
    """