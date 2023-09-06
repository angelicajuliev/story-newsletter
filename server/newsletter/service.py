from django.utils import timezone
from newsletter.utils import send_email
from newsletter.models import Newsletter, Recipient

def send_newsletter(newsletter: Newsletter):
    recipient_list = Recipient.objects.filter(category_subscription__in=[newsletter.category])
    recipient_emails = [recipient.email for recipient in recipient_list]

    send_email(newsletter.title, newsletter.content, recipient_emails)
    newsletter.status = 'sent'
    newsletter.save()

def send_newsletter_by_id(newsletter_id):
    newsletter = Newsletter.objects.get(pk=newsletter_id)
    send_newsletter(newsletter)

def send_scheduled_newsletters():
    scheduled_newsletters = Newsletter.objects.filter(status='scheduled')
    for newsletter in scheduled_newsletters:
        if newsletter.scheduled_at.date() == timezone.now().date():
            send_newsletter(newsletter)
