from django.db import models

class HistoryNewsletterSent(models.Model):
    newsletter_title = models.CharField(max_length=200)
    recipient_email = models.EmailField(max_length=254)
    sent_at = models.DateTimeField(auto_now_add=True)
