
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('KICAuth.urls')),
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
]