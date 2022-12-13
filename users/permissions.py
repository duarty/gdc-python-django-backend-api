from rest_framework import permissions
from rest_framework.views import Request, View

from users.models import User


class IsPostOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method == 'POST' or request.user.is_staff


class IsAuthenticated(permissions.BasePermission):
    def has_permission(self, request: Request, view: View) -> bool:
        return request.user.is_authenticated


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request: Request, view: View, user: User) -> bool:
        return bool(user.id == request.user.id or request.user.is_staff)
