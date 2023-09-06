from django.db import models
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Recipient(models.Model):
    email = models.EmailField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    category_subscription = models.ManyToManyField(Category)

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
          ('sent', 'Sent'),
          ('scheduled', 'Scheduled'),
          ('archived', 'Archived'),
        ],
        default='scheduled',
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
