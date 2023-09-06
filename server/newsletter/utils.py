from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.template.loader import render_to_string

def send_email(subject, html_content, recipient_list):
    for recipient in recipient_list:
        text_content = strip_tags(html_content)
        msg = EmailMultiAlternatives(subject, text_content)
        html = render_to_string('email_template.html', {'content': html_content, 'email': recipient})
        msg.attach_alternative(html, "text/html")
        msg.to = [recipient]
        msg.send()
