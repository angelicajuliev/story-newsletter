''' Send a email given an html and the email address'''
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_email(subject, html, to):
    text_content = strip_tags(html)
    msg = EmailMultiAlternatives(subject, text_content)

    msg.attach_alternative(html, "text/html")
    msg.to = to
    msg.send()

