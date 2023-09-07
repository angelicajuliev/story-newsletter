from metrics.models import HistoryNewsletterSent
from newsletter.models import Newsletter, Recipient


def save_history_newsletter_sent(newsletter, recipient):
    HistoryNewsletterSent.objects.create(
        newsletter_title=newsletter, 
        recipient_email=recipient
    )


def get_total_recipients():
    return Recipient.objects.count()


def get_total_newsletters():
    return Newsletter.objects.count()


def get_total_sent_newsletters():
    return Newsletter.objects.filter(status="sent").count()


def get_total_scheduled_newsletters():
    return Newsletter.objects.filter(status="scheduled").count()


def get_total_sent_emails():
    return HistoryNewsletterSent.objects.count()


def get_dashboard_data():
    return {
        "total_recipients": get_total_recipients(),
        "total_newsletters": get_total_newsletters(),
        "total_sent_newsletters": get_total_sent_newsletters(),
        "total_scheduled_newsletters": get_total_scheduled_newsletters(),
        "total_sent_emails": get_total_sent_emails(),
    }
