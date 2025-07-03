from django.urls import path
from .views import ListSchoolsView

urlpatterns = [
    path("", ListSchoolsView.as_view(), name="list_schools"),
]