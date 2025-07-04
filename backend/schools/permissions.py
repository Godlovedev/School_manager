from rest_framework.response import Response
from rest_framework import status
from .models import School
from rest_framework.permissions import BasePermission
from django.db.models import Q


class IsAuthenticated(BasePermission):
    """
    Custom permission to only allow authenticated users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated
    

class IsAdminSchool(BasePermission):
    message = "Vous n'êtes pas l'administrateur de cette école. Vous n'avez pas le droit d'effectuer cette tache."

    def has_permission(self, request, view):
        # verifie si le user qui fait la requete est bien l'administrateur de cette ecole
        school_id = view.kwargs.get('pk')
        if not school_id:
            return False
        try:
            school = School.objects.get(pk=school_id, admin=request.user)
            return True
        except School.DoesNotExist:
            return False
        
class IsSchoolMember(BasePermission):
    message = "Vous n'êtes pas membre de cette école. Vous n'avez pas le droit de droit d'effectuer cette tache."

    def has_permission(self, request, view):
        school_id = view.kwargs.get("pk")
        if not school_id:
            return False
        school = School.objects.filter(Q(pk=school_id) & (Q(admin=request.user) | Q(staff=request.user))).exists()
        return school