# Generated by Django 4.2.3 on 2023-07-15 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_job_jobselection_job_applicants_student_jobs_applied'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='hr_name',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='company',
            name='type',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
