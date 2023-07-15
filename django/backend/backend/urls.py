from django import views
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls'))
    # path('test', include('app.urls')),
    # path('register', include('app.urls')),
    # path('login', include('app.urls')),
    # path('publish_job', include('app.urls')),
    # path('get_jobs', include('app.urls')),
]
