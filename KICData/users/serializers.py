from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserModel
        fields = ('id', 'name', 'email','password')