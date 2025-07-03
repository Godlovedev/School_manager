from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .permissions import IsAuthenticated
from .models import School
from django.db.models import Q
from .serializer import SchoolSerializer


class ListSchoolsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        schools = School.objects.filter(Q(admin=request.user) | Q(staff=request.user)).distinct()
        serializer = SchoolSerializer(schools, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)