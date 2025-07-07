from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .permissions import IsAuthenticated, IsAdminSchool, IsSchoolMember
from .models import School
from django.db.models import Q
from .serializer import SchoolSerializer


class ListSchoolsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        schools = School.objects.filter(Q(admin=request.user) | Q(staff=request.user)).distinct().order_by("-id")
        serializer = SchoolSerializer(schools, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateSchoolsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SchoolSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            school = serializer.save()
            return Response({"message": "Ecole créée avec success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteSchoolsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminSchool]

    def delete(self, request, pk):
        try:
            school = School.objects.get(pk=pk, admin=request.user)
            school.delete()
            return Response({"message": "Operation effectué avec success."}, status=status.HTTP_200_OK)
        except School.DoesNotExist:
            return Response({"detail": "Cette ecole n'existe pas ou vous n'avez pas la permission pour la supprimer."}, status=status.HTTP_404_NOT_FOUND)
        

class GetSchoolView(APIView):
    permission_classes = [IsAuthenticated, IsSchoolMember]

    def get(self, request, pk):
        try:
            school = School.objects.get(pk=pk)
            serializer = SchoolSerializer(school, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except School.DoesNotExist:
            return Response({"detail": "Cette école n'existe pas."}, status=status.HTTP_404_NOT_FOUND)


class UpdateSchoolView(APIView):
    permission_classes = [IsAuthenticated, IsAdminSchool]
    # partial update
    def patch(self, request, pk):
        try:
            school = School.objects.get(pk=pk, admin=request.user)
            serializer = SchoolSerializer(school, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except School.DoesNotExist:
            return Response({"detail": "Cette école n'existe pas."}, status=status.HTTP_404_NOT_FOUND)