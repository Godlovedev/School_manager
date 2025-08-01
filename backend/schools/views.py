from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .permissions import IsAuthenticated, IsAdminSchool, IsSchoolMember
from .models import School, CashContribution, InKindContribution, ClassRoom, Professor, Student
from django.db.models import Q
from .serializer import CashContributionSerializer, InKindContributionSerializer, SchoolSerializer, SchoolStaffUpdateSerializer, StudentSerializer, ClassRoomWithStudentsSerializer, ProfessorSerializer


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


class UpdateStaffView(APIView):
    permission_classes = [IsAuthenticated, IsAdminSchool]

    def patch(self, request, pk):
        try:
            school = School.objects.get(pk=pk)
        except School.DoesNotExist:
            return Response({"detail": "École introuvable."}, status=status.HTTP_404_NOT_FOUND)

        serializer = SchoolStaffUpdateSerializer(
            school,
            data=request.data,
            partial=True,
            context={'request': request}
        )

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Staff mis à jour avec succès."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateCashContributionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        school = get_object_or_404(School, pk=pk)
        serializer = CashContributionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(school=school)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateInKindContributionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        school = get_object_or_404(School, pk=pk)
        serializer = InKindContributionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(school=school)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ListAllContributionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        school = get_object_or_404(School, pk=pk)
        cash = CashContribution.objects.filter(school=school).order_by("-id")
        inkind = InKindContribution.objects.filter(school=school).order_by("-id")

        cash_data = CashContributionSerializer(cash, many=True, context={'request': request}).data
        inkind_data = InKindContributionSerializer(inkind, many=True, context={'request': request}).data

        return Response({
            "cash_contributions": [{"total_amount": CashContribution.get_total_cash(school)}] + cash_data,
            "inkind_contributions": inkind_data
        }, status=status.HTTP_200_OK)


class CreateStudentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        school = get_object_or_404(School, pk=pk)
        serializer = StudentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(school=school)
            return Response({"message": "Etudiant créé avec succès"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class ListStudentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        school = School.objects.get(id=pk)

        classrooms = ClassRoom.objects.filter()
        serializer = ClassRoomWithStudentsSerializer(classrooms, many=True, context={'school': school, 'request': request})
        return Response(serializer.data)


class DeleteStudentView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, student_id):
        try:
            student = Student.objects.get(pk=student_id, school__id=pk)
            student.delete()
            return Response({"message": "Etudiant supprimé avec succès."}, status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response({"detail": "Cet étudiant n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

class UpdateStudentView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, student_id):
        try:
            student = Student.objects.get(pk=student_id, school__id=pk)
            serializer = StudentSerializer(student, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Etudiant mis à jour avec succès."}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Student.DoesNotExist:
            return Response({"detail": "Cet étudiant n'existe pas."}, status=status.HTTP_404_NOT_FOUND)


class CreateProfessorView(APIView):
    """
    {"name":..., "prenom":...}
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        school = School.objects.get(id=pk)

        professor = ProfessorSerializer(data=request.data, context={"request": request})
        if professor.is_valid():
            professor.save(school=school)
            return Response({"message": "Enseignant ajouté avec success"}, status=status.HTTP_201_CREATED)
        return Response(professor.errors, status=status.HTTP_400_BAD_REQUEST)
class ListProfessorView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        school = School.objects.get(id=pk)
        professors = Professor.objects.filter(school=school).order_by("-id")
        serializer = ProfessorSerializer(professors, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteProfessorView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, profid):
        try:
            professor = Professor.objects.get(pk=profid, school__id=pk)
            professor.delete()
            return Response({"message": "Professeur supprimé avec succès."}, status=status.HTTP_204_NO_CONTENT)
        except Professor.DoesNotExist:
            return Response({"detail": "Ce professeur n'existe pas."}, status=status.HTTP_404_NOT_FOUND)
        
class UpdateProfessorView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, profid):
        try:
            professor = Professor.objects.get(pk=profid, school__id=pk)
            serializer = ProfessorSerializer(professor, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Professeur mis à jour avec succès."}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Professor.DoesNotExist:
            return Response({"detail": "Ce professeur n'existe pas."}, status=status.HTTP_404_NOT_FOUND)