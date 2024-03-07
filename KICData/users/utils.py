# utils.py
from djoser.views import UserViewSet
from your_app.serializers import CustomUserSerializer

def get_user_serializer(user):
    return CustomUserSerializer
