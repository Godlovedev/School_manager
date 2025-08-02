from rest_framework import serializers
from .models import School, InKindContribution, CashContribution, ClassRoom, Student, Professor
from django.contrib.auth import get_user_model


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

   

class SchoolSerializer(serializers.ModelSerializer):
    admin = UserSerializer(read_only=True)
    staff = UserSerializer(read_only=True, many=True)
    is_admin = serializers.SerializerMethodField()
    representation = serializers.SerializerMethodField()
    class Meta:
        model = School
        fields = ['id', 'name', 'localisation', 'phone_number', 'email', "is_admin", 'admin', "staff", "representation"]
        read_only_fields = ['admin', 'id', "reprsentation"]

    def get_is_admin(self, obj):
        request = self.context.get("request")
        return obj.is_admin(request.user)
    
    def validate_name(self, value):
        request = self.context.get("request")
        if School.objects.filter(name__iexact=value, admin=request.user).exists():
            raise serializers.ValidationError("Vous avez déja une école à ce nom.")
        return value
    
    def validate_email(self, value):
        if School.objects.filter(email=value).exists():
            raise serializers.ValidationError("Il existe déjà une école avec cette adresse email.")
        return value
    
    def validate_phone_number(self, value):
        if School.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Il existe déjà une école avec ce numéro de téléphone.")
        return value


    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        validated_data['admin'] = user
        return super().create(validated_data)
    
    # fonction qui compte le nombre d'eleves de l'ecole et le nobre d'enseignant
    def get_representation(self, obj):
        return {
            "students_count": obj.count_student(),
            "professors_count": obj.count_professor(),
        }

class SchoolStaffUpdateSerializer(serializers.ModelSerializer):
    staff = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = School
        fields = ["staff"]

    def update(self, instance, validated_data):
        staff = validated_data.get("staff", [])
        instance.staff.add(*staff)
        instance.save()
        return instance



class CashContributionSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True)
    class Meta:
        model = CashContribution
        fields = ['id', 'contributor_name', 'amount', 'date', 'school']
        read_only_fields = ['id', 'date', "school"]



class InKindContributionSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True)
    class Meta:
        model = InKindContribution
        fields = ['id', 'contributor_name', 'item_name', 'quantity', 'description', 'date', 'school']
        read_only_fields = ['id', 'date', "school"]


class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ["id", "name"]

class StudentSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True)
    class Meta:
        model = Student
        fields = ['id', 'name', "prenom", 'note', 'classroom', 'school']
        read_only_fields = ['id', 'school']


class SimpleStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', "prenom" ,'note']


class ClassRoomWithStudentsSerializer(serializers.ModelSerializer):
    students = serializers.SerializerMethodField()

    class Meta:
        model = ClassRoom
        fields = ['id', 'name', 'students']

    def get_students(self, obj):
        # On filtre uniquement les élèves de cette classe et de l’école ciblée
        school = self.context.get('school')
        students = obj.students.filter(school=school)  # `students` = related_name dans le modèle
        return SimpleStudentSerializer(students, many=True, context=self.context).data


class ProfessorSerializer(serializers.ModelSerializer):
    school = SchoolSerializer(read_only=True)
    class Meta:
        model = Professor
        fields = ["id", "name", "prenom", "school"]
        read_only_fields = ["id", "school"]