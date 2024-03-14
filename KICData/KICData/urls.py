# project/urls.py

from django.contrib import admin
from djoser import views
from django.urls import path, include
from users.views import Drum

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),  # Include Djoser authentication URLs
    path('auth/', include('djoser.urls.jwt')), 
    path('auth/me/', views.UserViewSet.as_view({'get': 'me'}), name='user-me'),# Include Djoser token authentication URLs
    path("cookies/accounts/", views.fetch_cookies , name = 'cookies-get')
]
urlpatterns += [
    path('auth/', include('djoser.urls.jwt')),  # Include Djoser JWT authentication URLs
]
