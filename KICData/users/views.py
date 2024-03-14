# views.py
from djoser.views import UserViewSet
from .serializers import UserCreateSerializer as CustomUserSerializer
from django.http import JsonResponse
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import sqlite3
import time
import datetime


import datetime
import csv

class CustomUserViewSet(UserViewSet):
    serializer_class = CustomUserSerializer

    def get_serializer_class(self):
        if self.action == 'me':
            return CustomUserSerializer
        return super().get_serializer_class()


def date_from_webkit(webkit_timestamp):
    epoch_start = datetime.datetime(1601, 1, 1)
    delta = datetime.timedelta(microseconds=int(webkit_timestamp))
    return epoch_start + delta

def fetch_cookies(request):
    if request.method == 'POST' and request.FILES.get('cookies_file'):
        user = request.user
        
        # get the user
        Users = get_user_model()
        try:
            User = Users.objects.get(user.username)
        except Users.DoesNotExit:
           return JsonResponse({'error': f'User with username {user.username} does not exist'}, status=404)
              
        # File System
        cookies_file = request.FILES.get('cookies_file')

        if not  cookies_file:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        cookies_data = []

        # Process the uploaded file (assuming it's a CSV file)
        with cookies_file.open('r') as f:
            reader = csv.reader(f)
            for row in reader:
                # Assuming the CSV file has columns: host_key, name, value, creation_utc, expires_utc
                site, cookie_name, cookie_value, creation_utc, expires_utc = row
                # Convert WebKit timestamps to human-readable dates
                creation_time = date_from_webkit(creation_utc)
                expiration_time = date_from_webkit(expires_utc)

                # Create a dictionary representing the cookie data
                cookie_data = {
                    'site': site,
                    'cookie_name': cookie_name,
                    'cookie_value': cookie_value,
                    'creation_time': creation_time.strftime('%Y-%m-%d %H:%M:%S'),
                    'expiration_time': expiration_time.strftime('%Y-%m-%d %H:%M:%S')
                }

                # Append the cookie data to the list
                cookies_data.append(cookie_data)
                User.account['cookies'] = cookies_data
                User.save()


        # Return the cookies data in JSON format
        return JsonResponse({'cookies': cookies_data})

    else:
        return JsonResponse({'error': 'No file uploaded'}, status=400)

def date_from_webkit(webkit_timestamp):
    epoch_start = datetime.datetime(1601, 1, 1)
    delta = datetime.timedelta(microseconds=int(webkit_timestamp))
    return epoch_start + delta


