import os
import jwt

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_email(recipient_email, subject, html_content, attachment=None):
    text_content = strip_tags(html_content)
    msg = EmailMultiAlternatives(subject, text_content)
    encoded_email = jwt.encode({"email": recipient_email}, "secret", algorithm="HS256")
    
    html = render_to_string(
        "email_template.html", {"content": html_content, "token": encoded_email}
    )
    msg.attach_alternative(html, "text/html")

    if attachment:
        with open(attachment, "rb") as f:
            msg.attach(f.name, f.read())

    msg.to = [recipient_email]
    msg.send()


def store_attachment_file(newsletter_id, file: InMemoryUploadedFile):
    file_path = f"newsletter/attachments/{newsletter_id}"

    if not os.path.exists(file_path):
        os.makedirs(file_path)

    with open(f"{file_path}/{file.name}", "wb+") as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    return f"{file_path}/{file.name}"
