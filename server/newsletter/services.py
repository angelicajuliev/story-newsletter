from django.utils import timezone
from newsletter import tasks
from newsletter.models import Newsletter, Recipient

def send_newsletter(newsletter: Newsletter):
    recipient_list = Recipient.objects.filter(category_subscription__in=[newsletter.category])
    recipient_emails = [recipient.email for recipient in recipient_list]

    tasks.send_email.delay(recipient_emails, newsletter.title, newsletter.content, newsletter.attachment)
    newsletter.status = 'sent'
    newsletter.save()

def send_newsletter_by_id(newsletter_id):
    newsletter = Newsletter.objects.get(pk=newsletter_id)
    send_newsletter(newsletter)

def send_scheduled_newsletters():
    scheduled_newsletters = Newsletter.objects.select_for_update().filter(status='scheduled', scheduled_at__date__lte=timezone.now().date())
    for newsletter in scheduled_newsletters:
        import logging
        logger = logging.getLogger(__name__)
        logger.error(newsletter)

        send_newsletter(newsletter)

def unsubscribe_by_email(email):
    recipient = Recipient.objects.get(email=email)
    recipient.delete()

def unsubscribe_by_email_and_category(email, category):
    recipient = Recipient.objects.get(email=email)
    recipient.category_subscription.remove(category)
    recipient.save()
