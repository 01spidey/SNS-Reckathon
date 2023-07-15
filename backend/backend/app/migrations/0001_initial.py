# Generated by Django 4.2.3 on 2023-07-15 08:17

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
                ('mail', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=50)),
                ('category', models.CharField(max_length=50)),
                ('website', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.CharField(max_length=50)),
                ('company', models.CharField(max_length=50)),
                ('role', models.CharField(max_length=50)),
                ('job_desc', models.TextField()),
                ('job_type', models.CharField(max_length=50)),
                ('salary', models.FloatField(null=True)),
                ('location', models.CharField(null=True)),
                ('duration', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='JobSelection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='Under Review', max_length=50)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.job')),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=50)),
                ('mail', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=50)),
                ('college', models.CharField(max_length=50)),
                ('cgpa', models.FloatField()),
                ('batch', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), size=None)),
                ('degree', models.CharField(max_length=50)),
                ('stream', models.CharField(max_length=100)),
                ('jobs_applied', models.ManyToManyField(through='app.JobSelection', to='app.job')),
            ],
        ),
        migrations.AddField(
            model_name='jobselection',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.student'),
        ),
        migrations.AddField(
            model_name='job',
            name='applicants',
            field=models.ManyToManyField(through='app.JobSelection', to='app.student'),
        ),
    ]