import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")

app = Celery("celery", broker="redis://redis:6379/0")
app.config_from_object("django.conf:settings", namespace="CELERY_")
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
