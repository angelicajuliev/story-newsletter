# Generated by Django 4.2.5 on 2023-09-06 20:35

from django.db import migrations

def create_periodical_task(apps, schema_editor):
    IntervalSchedule = apps.get_model('django_celery_beat', 'IntervalSchedule')
    PeriodicTask = apps.get_model('django_celery_beat', 'PeriodicTask')

    schedule, _ = IntervalSchedule.objects.get_or_create(
        every=1,
        period='minutes',
    )

    PeriodicTask.objects.create(
        interval=schedule,
        name='Send the scheduled newsletters',
        task='newsletter.tasks.send_scheduled_newsletters',
    )

def reverse_create_periodical_task(apps, schema_editor):
    PeriodicTask = apps.get_model('django_celery_beat', 'PeriodicTask')
    PeriodicTask.objects.filter(name='Send the scheduled newsletters').delete()

    IntervalSchedule = apps.get_model('django_celery_beat', 'IntervalSchedule')
    IntervalSchedule.objects.filter(every=1, period='minutes').delete()
    
class Migration(migrations.Migration):
    dependencies = [
        ('newsletter', '0003_newsletter_attachment_alter_newsletter_status'),
        ('django_celery_beat', '0018_improve_crontab_helptext'),
    ]

    operations = [
        migrations.RunPython(create_periodical_task, reverse_create_periodical_task),
    ]
