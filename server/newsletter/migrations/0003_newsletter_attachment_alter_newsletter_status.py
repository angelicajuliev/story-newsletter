# Generated by Django 4.2.5 on 2023-09-06 18:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("newsletter", "0002_auto_20230905_2003"),
    ]

    operations = [
        migrations.AddField(
            model_name="newsletter",
            name="attachment",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name="newsletter",
            name="status",
            field=models.CharField(
                choices=[
                    ("draft", "Draft"),
                    ("sent", "Sent"),
                    ("scheduled", "Scheduled"),
                    ("archived", "Archived"),
                ],
                default="scheduled",
                max_length=10,
            ),
        ),
    ]
