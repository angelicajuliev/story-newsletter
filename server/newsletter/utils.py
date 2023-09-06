import os
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.template.loader import render_to_string

def send_email(recipient_list, subject, html_content, attachment = None):
    for recipient in recipient_list:
        text_content = strip_tags(html_content)
        msg = EmailMultiAlternatives(subject, text_content)
        html = render_to_string('email_template.html', {'content': html_content, 'email': recipient})
        msg.attach_alternative(html, "text/html")

        if attachment:
            with open(attachment, 'rb') as f:
                msg.attach(f.name, f.read())

        
        msg.to = [recipient]
        msg.send()

def store_attachment_file(newsletter_id, file):
    file_path = f'newsletter/attachments/{newsletter_id}'
    import logging 
    logger = logging.getLogger(__name__)
    logger.error(file_path, file, dir(file))

    if not os.path.exists(file_path):
        os.makedirs(file_path)

    with open(f'{file_path}/{file.name}', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    
    return f'{file_path}/{file.name}'
