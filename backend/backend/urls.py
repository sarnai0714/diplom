"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from startupbackend.views import RegisterView,ProjectViewSet,InvestorViewSet,WishlistViewSet,StartupGrowthViewSet,SiteContentViewSet,TeamMemberViewSet


router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'investors', InvestorViewSet, basename='investors')
router.register(r'wishlist', WishlistViewSet, basename='wishlist')
router.register(r'startup-growth', StartupGrowthViewSet)
router.register(r'contents', SiteContentViewSet)
router.register(r'team-members', TeamMemberViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
