# project/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),  # Include Djoser authentication URLs
    path('auth/', include('djoser.urls.jwt')),  # Include Djoser token authentication URLs
]

# Optionally, if you're using JWT authentication
urlpatterns += [
    path('auth/', include('djoser.urls.jwt')),  # Include Djoser JWT authentication URLs
]
