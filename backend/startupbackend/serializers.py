from .models import CustomUser,Startup
from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers

class CustomUserSerializer(UserSerializer):

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email","password")
        extra_kwargs = {'password': {'write_only': True}}


class CustomUserCreateSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ("id", "username", "email", "password")

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user

    def to_representation(self, instance):
        return CustomUserSerializer(instance, context=self.context).data

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = "__all__"