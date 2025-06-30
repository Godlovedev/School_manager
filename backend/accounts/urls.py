from django.urls import path
from .views import UserRegisterView



url_patterns = [
    path("register/", UserRegisterView.as_view(), name="user_register"),
]