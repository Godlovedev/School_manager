from django.urls import path
from .views import UserRegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



urlpatterns = [
    path("register/", UserRegisterView.as_view(), name="user_register"),
    path("token/", TokenObtainPairView.as_view(), name="token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]