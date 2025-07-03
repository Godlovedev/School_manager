from rest_framework import serializers
from .models import School
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
    class Meta:
        model = School
        fields = ['id', 'name', 'localisation', 'phone_number', 'email', "is_admin", 'admin', "staff"]
        read_only_fields = ['admin', 'id']

    def get_is_admin(self, obj):
        request = self.context.get("request")
        return obj.is_admin(request.user)


    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        validated_data['admin'] = user
        return super().create(validated_data)