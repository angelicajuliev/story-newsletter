from django.db import models
from django.utils import timezone

class Email(models.Model):
    email = models.EmailField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    
class Newsletter(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    scheduled_at = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=10,
        choices=[
          ('draft', 'Draft'),
          ('published', 'Published'),
          ('scheduled', 'Scheduled'),
          ('archived', 'Archived'),
        ],
        default='scheduled',
    )
    category = models.CharField(
        max_length=10,
        choices=[
            ('general', 'General'),
            ('news', 'News'),
            ('events', 'Events'),
            ('offers', 'Offers'),
        ],
        default='general',
    )

    def __str__(self):
        return self.title
