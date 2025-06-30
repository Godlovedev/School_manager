from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer


User = get_user_model()

# Create your views here.

class UserRegisterView(APIView):
    """
    View to handle user registration.
    """
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response({"message": "L'utilisateur a été créé avec succes"}, status=status.HTTP_201_CREATED)
        
        return Response({"message": "Veuillez rééssayer une erreur est survenue."}, status=status.HTTP_400_BAD_REQUEST)