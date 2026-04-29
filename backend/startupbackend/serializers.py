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
        # Бүх талбарыг авахын оронд талбаруудыг нэрлэж өгөх нь аюулгүй байдалд тустай
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def validate_registration_number(self, value):
        """
        Регистрийн дугаарын давхцлыг шалгах логик
        """
        # 1. Хоосон утга эсвэл формат шалгах (нэмэлтээр)
        if not value:
            raise serializers.ValidationError("Регистрийн дугаар заавал байх ёстой.")

        # 2. Өөрийгөө оролцуулахгүйгээр (Update үед) давхцлыг шалгах
        # self.instance байгаа эсэхийг шалгаад, байвал түүний ID-г хасна
        queryset = Investor.objects.filter(registration_number=value)
        
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "Энэ регистрийн дугаартай байгууллага аль хэдийн бүртгэгдсэн байна."
            )
            
        return value

    def create(self, validated_data):
        """
        Шинээр үүсгэх үед context-оос хэрэглэгчийг авах боломжтой
        """
        # Жишээ: Хэрэв request.user-ийг investor-той холбох бол
        # validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    
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

class SiteContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteContent
        fields = ['id', 'page_name', 'content_key', 'text_content', 'updated_at']