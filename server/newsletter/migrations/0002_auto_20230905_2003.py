# Generated by Django 4.2.5 on 2023-09-05 20:03

from django.db import migrations


def create_default_categories(apps, schema_editor):
    Category = apps.get_model("newsletter", "Category")
    Category.objects.bulk_create(
        [
            Category(name="News"),
            Category(name="Sports"),
            Category(name="Technology"),
        ]
    )


def reverse_create_default_categories(apps, schema_editor):
    Category = apps.get_model("newsletter", "Category")
    Category.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("newsletter", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            create_default_categories, reverse_create_default_categories
        ),
    ]
