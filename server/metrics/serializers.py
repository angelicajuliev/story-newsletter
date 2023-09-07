from rest_framework import serializers


class DashboardSerializer(serializers.Serializer):
    total_recipients = serializers.IntegerField()
    total_newsletters = serializers.IntegerField()
    total_sent_newsletters = serializers.IntegerField()
    total_scheduled_newsletters = serializers.IntegerField()
    total_sent_emails = serializers.IntegerField()
