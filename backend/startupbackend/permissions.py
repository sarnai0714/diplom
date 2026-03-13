# surgaltbackend/permissions.py
from rest_framework import permissions 

class IsStartup(permissions.BasePermission):
    """Зөвхөн Админ хэрэглэгчдэд зөвшөөрнө."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'startup'


class IsInvestor(permissions.BasePermission):
    """Зөвхөн багш хэрэглэгчдэд зөвшөөрнө."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'investor'
