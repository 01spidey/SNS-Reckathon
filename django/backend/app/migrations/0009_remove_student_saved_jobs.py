# Generated by Django 4.2.3 on 2023-07-16 06:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_company_hr_name_company_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='saved_jobs',
        ),
    ]