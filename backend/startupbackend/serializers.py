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
        model = Startup
        # Хэрэглэгч бөглөх шаардлагагүй талбаруудыг read_only болгоно
        read_only_fields = ['user', 'status', 'created_at', 'updated_at']
        fields = '__all__'

    def validate_phone_number(self, value):
        # Утасны дугаар зөвхөн тоо байх эсвэл формат шалгах логик нэмж болно
        if not value.isdigit():
            raise serializers.ValidationError("Утасны дугаар зөвхөн тооноос бүрдэх ёстой.")
        return value
    
class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def validate_registration_number(self, value):
        # Шинээр үүсгэж байгаа эсвэл засаж байгаа эсэхийг instance байгаа эсэхээр мэднэ
        instance_id = self.instance.id if self.instance else None
        
        # Өөрийгөө оролцуулахгүйгээр ижил регистр байгаа эсэхийг шалгах
        exists = Investor.objects.filter(registration_number=value).exclude(id=instance_id).exists()
        
        if exists:
            raise serializers.ValidationError("Энэ регистрийн дугаартай байгууллага аль хэдийн бүртгэгдсэн байна.")
            
        return value
    
class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id', 'startup', 'added_at']
        read_only_fields = ['added_at']

    def validate(self, data):
        user = self.context['request'].user
        startup = data.get('startup')

        if Wishlist.objects.filter(user=user, startup=startup).exists():
            raise serializers.ValidationError("Та энэ стартапыг аль хэдийн хадгалсан байна.")

        return data
    
class StartupGrowthSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartupGrowth
        fields = '__all__'
        read_only_fields = ['created_at']