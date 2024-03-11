# utils.py
from djoser.views import UserViewSet
from users.serializers import CustomUserSerializer

def get_user_serializer(user):
    return CustomUserSerializer
