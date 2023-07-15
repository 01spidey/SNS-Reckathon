from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('', views.test),
    path('home', views.home),
    path('register', views.register),
    path('login', views.login),
    path('publish_job', views.publish_job),
    path('get_jobs', views.get_jobs)
]