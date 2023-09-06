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

class NewsletterSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Newsletter
        fields = '__all__'

class CreateNewsletterSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(read_only=True, allow_null=True)

    class Meta:
        model = Newsletter
        fields = ('title', 'content', 'category')

class SendNewsletterSerializer(serializers.Serializer):
    """
    Serializer for sending a newsletter
    """