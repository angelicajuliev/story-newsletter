from django.utils import timezone

from newsletter import tasks
from newsletter.models import Category, Newsletter, Recipient


def send_newsletter(newsletter: Newsletter):
    recipient_list = Recipient.objects.filter(
        category_subscription__in=[newsletter.category]
    )
    recipient_emails = [recipient.email for recipient in recipient_list]
    for recipient in recipient_emails:
        tasks.send_email.delay(
            recipient, newsletter.title, newsletter.content, newsletter.attachment
        )

    newsletter.status = "sent"
    newsletter.save()


def send_newsletter_by_id(newsletter_id):
    newsletter = Newsletter.objects.get(pk=newsletter_id)
    send_newsletter(newsletter)


def send_scheduled_newsletters():
    scheduled_newsletters = Newsletter.objects.select_for_update().filter(
        status="scheduled", scheduled_at__date__lte=timezone.now().date()
    )
    for newsletter in scheduled_newsletters:
        send_newsletter(newsletter)


def unsubscribe_by_email(email):
    recipient = Recipient.objects.get(email=email)
    recipient.delete()


def unsubscribe_by_email_and_category(email, category_id):
    recipient = Recipient.objects.get(email=email)
    recipient.category_subscription.remove(category_id)
    recipient.save()


def bulk_create_recipients(recipients: list[Recipient]):
    categories_ids = Category.objects.values_list("id", flat=True)
    result = Recipient.objects.bulk_create(recipients)
    category_relations = []

    for recipient in result:
        category_relations.extend(
            [
                Recipient.category_subscription.through(
                    recipient_id=recipient.id, category_id=category_id
                )
                for category_id in categories_ids
            ]
        )

    Recipient.category_subscription.through.objects.bulk_create(category_relations)
