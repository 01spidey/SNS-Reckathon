from django.db import models
from django.utils.timezone import now
from django.contrib.postgres.fields import ArrayField
# from app.models import Student, Drive
from django.contrib.postgres.fields.jsonb import JSONField



# Create your models here.

class Student(models.Model):
    username = models.CharField(max_length=50, null=False)
    password = models.CharField(max_length=50, null=False)
    name = models.CharField(max_length=50, null=False)
    mail = models.EmailField(null=False)
    phone = models.CharField(max_length=50, null=False)
    college = models.CharField(max_length=50, null=False)
    cgpa = models.FloatField(null=False)
    batch = ArrayField(models.IntegerField(), null=False)
    degree = models.CharField(max_length=50, null=False)
    stream = models.CharField(max_length=100, null=False)
    jobs_applied = models.ManyToManyField('Job', through='JobSelection')
    saved_jobs = models.CharField(max_length=100, null=True, default='')

class Company(models.Model):
    username = models.CharField(max_length=50, null=False)
    password = models.CharField(max_length=50, null=False)
    mail = models.EmailField(null=False)
    phone = models.CharField(max_length=50, null=False)
    category = models.CharField(max_length=50, null=False)
    website = models.CharField(max_length=50, null=True, default='')
    company = models.CharField(max_length=100, null=False)

class Job(models.Model):
    job_id = models.AutoField(primary_key=True)
    company = models.CharField(max_length=50, null=False)
    role = models.CharField(max_length=50, null=False)
    job_desc = models.TextField(null=False)
    job_type = models.CharField(max_length=50, null=False)
    salary = models.FloatField(null=True)
    location = models.CharField(null=True)
    duration = models.IntegerField(null=False)
    date = models.DateTimeField(auto_now_add=True, null=True)
    applicants = models.ManyToManyField('Student', through='JobSelection')

class JobSelection(models.Model):
    job = models.ForeignKey('Job', on_delete=models.CASCADE)
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default='Under Review')


    
    