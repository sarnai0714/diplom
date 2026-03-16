from .models import *
from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers

class CustomUserSerializer(UserSerializer):

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email","password","role")
        extra_kwargs = {'password': {'write_only': True}}


class CustomUserCreateSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ("id", "username", "email", "password","role")

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=validated_data.get("role"),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def to_representation(self, instance):
        return CustomUserSerializer(instance, context=self.context).data

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartupApplication
        # Хэрэглэгч бөглөх шаардлагагүй талбаруудыг read_only болгоно
        read_only_fields = ['user', 'status', 'approved_startup', 'created_at', 'updated_at']
        fields = '__all__'

    def validate_phone_number(self, value):
        # Утасны дугаар зөвхөн тоо байх эсвэл формат шалгах логик нэмж болно
        if not value.isdigit():
            raise serializers.ValidationError("Утасны дугаар зөвхөн тооноос бүрдэх ёстой.")
        return value
    
