from server.celery import app
from metrics import services as metrics_services
from newsletter import services
from newsletter import utils


@app.task
def send_email(recipient_email, title, content, attachment):
    utils.send_email(recipient_email, title, content, attachment)
    metrics_services.save_history_newsletter_sent(title, recipient_email)
    return True


@app.task
def send_scheduled_newsletters():
    services.send_scheduled_newsletters()
    return True
