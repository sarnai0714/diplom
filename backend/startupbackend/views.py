from .models import *
from rest_framework import generics,viewsets,permissions,status,serializers,parsers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import CustomUserCreateSerializer,ProjectSerializer,InvestorSerializer,WishlistSerializer,StartupGrowthSerializer
from django.contrib.auth import get_user_model
from .permissions import IsStartup
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserCreateSerializer
    permission_classes = [AllowAny]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Startup.objects.all()
    serializer_class = ProjectSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        elif self.action == 'create':
            permission_classes = [IsStartup]
        else:
            permission_classes = [permissions.IsAuthenticated]
        
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response({
            "message": "Таны стартап бүртгүүлэх хүсэлт амжилттай илгээгдлээ.",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)
    
class InvestorViewSet(viewsets.ModelViewSet):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [AllowAny]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def create(self, request, *args, **kwargs):
        # 1. Хэрэглэгч аль хэдийн Investor профайлтай эсэхийг шалгах
        if Investor.objects.filter(user=request.user).exists():
            return Response(
                {"detail": "Таны байгууллагын бүртгэл аль хэдийн үүссэн байна."},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        user = self.request.user
        user.role = 'investor'
        user.save()
        
        serializer.save(user=user)

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListView(serializers.ModelSerializer):
    """Хэрэглэгч өөрийн илгээсэн хүсэлтүүдийг харах хэсэг"""
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Startup.objects.filter(user=self.request.user)

class StartupGrowthViewSet(viewsets.ModelViewSet):
    queryset = StartupGrowth.objects.all()
    serializer_class = StartupGrowthSerializer
    
    # Сүүлийн 6 сарын өгөгдлийг шүүж авах нэмэлт функц (сонголтоор)
    def get_queryset(self):
        startup_id = self.request.query_params.get('startup_id')
        if startup_id:
            return StartupGrowth.objects.filter(startup_id=startup_id).order_by('created_at')[:6]
        return super().get_queryset()