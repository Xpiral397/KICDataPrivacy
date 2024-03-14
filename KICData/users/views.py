# views.py
from djoser.views import UserViewSet
from .serializers import CustomUserSerializer
from django.http import JsonResponse
from django.core.files.uploadedfile import InMemoryUploadedFile

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
        cookies_file = request.FILES['cookies_file']

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

        # Return the cookies data in JSON format
        return JsonResponse({'cookies': cookies_data})

    else:
        return JsonResponse({'error': 'No file uploaded'}, status=400)
