from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    This serializer is used to convert User instances into JSON format and vice versa.
    """
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        read_only_fields = ['id']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ce nom d'utilisateur est déjà pris")
        return value
    
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Le mot de passe doit contenir au moins 6 caractères")
        return value
    
    def create(self, validated_data):
        """
        Create a new user with hashed password using the create_user method.
        """
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )