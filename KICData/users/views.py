# views.py
from djoser.views import UserViewSet
from .serializers import UserCreateSerializer as CustomUserSerializer,UserCreateSerializerAll
from django.http import JsonResponse
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.contrib.auth import get_user_model

from django.views.decorators.csrf import csrf_exempt,csrf_protect
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

@csrf_exempt
def fetch_cookies(request,username):
    SAVE =False
    print(request.FILES['file'])
    if request.method == 'POST' and request.FILES['file']:
        
        # get the user
        Users = get_user_model()
        try:
            User = Users.objects.get(username)
            SAVE = True
        except Users.DoesNotExit:
           pass
              
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


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import UserAccount as  UserProfile
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from django.utils.decorators import method_decorator
import json


class CustomCurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    
    @method_decorator(csrf_protect)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def get(self, request):
        user = request.user
        user_profile = UserProfile.objects.get(email=user.email)
        user_profile.extract_cookies = {}
        user_serializer = UserCreateSerializerAll(user_profile)
        return Response(user_serializer.data)
    
    def paginateCookies(self, cookies, numberofFetch = 0):
        return cookies[numberofFetch*100:numberofFetch+10]



class GetCookiesView(APIView):
    permission_classes = [IsAuthenticated]
    
    @method_decorator(csrf_protect)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def get(self, request, attempts):
        user = request.user
        if attempts:
            attempts = int(attempts)
        user_profile = UserProfile.objects.get(email=user.email)
        extract_cookies = self.paginateCookies(user_profile.extract_cookies, attempts)
        return Response(extract_cookies)
    
    def paginateCookies(self, cookies, numberofFetch = 0):
        return cookies
class UpdateUserData(APIView):
    permission_classes = [IsAuthenticated]
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    def post(self, request):
        user = request.user
        cookie_sent = request.data['cookies_data']
        user_profile = UserProfile.objects.get(email=user.email)
        
        if(user_profile):
            user_profile.extract_cookies = cookie_sent
            user_profile.setCookies = True
            user_profile.save()
            return Response({'user':"user data saved"},status=200)
        return Response({'user':"user cannot be found"},status=404)