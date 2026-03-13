from .models import *
from rest_framework import generics,viewsets
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import CustomUserCreateSerializer,ProjectSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserCreateSerializer
    permission_classes = [AllowAny]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Startup.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]