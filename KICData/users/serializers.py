from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

UserModel = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserModel
        fields = "__all__"      
            
        id = serializers.IntegerField(read_only=True)  
        name = serializers.CharField(required=True)
        email = serializers.EmailField(required=True)
        password = serializers.CharField(required=True, write_only=True)