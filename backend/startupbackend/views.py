from .models import *
from rest_framework import generics,viewsets,permissions,status,serializers,parsers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import CustomUserCreateSerializer,ProjectSerializer,InvestorSerializer,WishlistSerializer,StartupGrowthSerializer,SiteContentSerializer,TeamMemberSerializer
from django.contrib.auth import get_user_model
from .permissions import IsStartup
from django.db import transaction
from rest_framework.exceptions import PermissionDenied
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt


User = get_user_model()

@csrf_exempt
def image_upload(request):
    if request.method == "POST":
        file = request.FILES['file'] # TinyMCE 'file' гэж явуулдаг
        file_name = default_storage.save(f"tinymce/{file.name}", file)
        file_url = default_storage.url(file_name)
        
        # TinyMCE-д заавал 'location' гэсэн түлхүүрээр хариу өгөх ёстой
        return JsonResponse({'location': f"http://127.0.0.1:8000{file_url}"})

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
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def create(self, request, *args, **kwargs):
        # 1. Хэрэглэгч нэг ижил регистртэй байгууллага дахин бүртгэхийг оролдож байгааг шалгах
        reg_num = request.data.get('registration_number')
        if Investor.objects.filter(user=request.user, registration_number=reg_num).exists():
            return Response(
                {"detail": "Та энэ регистрийн дугаартай байгууллагыг аль хэдийн бүртгэсэн байна."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # 1 хэрэглэгч олон өөр регистртэй хөрөнгө оруулагч бүртгэх нь одоо нээлттэй
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        with transaction.atomic():
            user = self.request.user
            # Хэрэглэгчийн үүргийг хөрөнгө оруулагч болгох (анхны удаа бүртгүүлэхэд)
            if user.role != 'investor':
                user.role = 'investor'
                user.save()
            
            serializer.save(user=user)

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        if self.request.user.role != "investor":
            raise PermissionDenied(
                "Зөвхөн хөрөнгө оруулагч хэрэглэгч төсөл хадгалах боломжтой."
            )

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
    permission_classes = [AllowAny]

    # Сүүлийн 6 сарын өгөгдлийг шүүж авах нэмэлт функц (сонголтоор)
    def get_queryset(self):
        startup_id = self.request.query_params.get('startup_id')
        if startup_id:
            return StartupGrowth.objects.filter(startup_id=startup_id).order_by('created_at')[:6]
        return super().get_queryset()
    
class SiteContentViewSet(viewsets.ModelViewSet):
    queryset = SiteContent.objects.all()
    serializer_class = SiteContentSerializer
    permission_classes = [AllowAny]
    # id-аар биш slug-аар (content_key) хандах тохиргоо
    lookup_field = 'content_key'


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]

    # Хэрэв стартапаар нь шүүж харах шаардлагатай бол:
    def get_queryset(self):
        queryset = TeamMember.objects.all()
        startup_id = self.request.query_params.get('startup_id')
        if startup_id is not None:
            queryset = queryset.filter(startup_id=startup_id)
        return queryset