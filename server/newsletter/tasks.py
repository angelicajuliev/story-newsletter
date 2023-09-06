from server.celery import app
from newsletter import services
from newsletter import utils

@app.task
def send_email(recipient_emails, title, content, attachment):
    utils.send_email(recipient_emails, title, content, attachment)
    return True

@app.task
def send_scheduled_newsletters():
    services.send_scheduled_newsletters()
    return True

