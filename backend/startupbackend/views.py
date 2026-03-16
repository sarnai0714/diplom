from .models import *
from rest_framework import generics,viewsets,permissions,status,serializers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import CustomUserCreateSerializer,ProjectSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserCreateSerializer
    permission_classes = [AllowAny]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = StartupApplication.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Хүсэлт илгээж буй хэрэглэгчийг 'user' талбарт автоматаар хадгална
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            "message": "Таны стартап бүртгүүлэх хүсэлт амжилттай илгээгдлээ.",
            "data": response.data
        }, status=status.HTTP_201_CREATED)

class ListView(serializers.ModelSerializer):
    """Хэрэглэгч өөрийн илгээсэн хүсэлтүүдийг харах хэсэг"""
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StartupApplication.objects.filter(user=self.request.user)