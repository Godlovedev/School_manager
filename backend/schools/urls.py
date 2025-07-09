from django.urls import path
from .views import ListSchoolsView, CreateSchoolsView, DeleteSchoolsView, GetSchoolView, UpdateSchoolView, UpdateStaffView

urlpatterns = [
    path("", ListSchoolsView.as_view(), name="list_schools"),
    path("create/", CreateSchoolsView.as_view(), name="create_school"),
    path("delete/<int:pk>/", DeleteSchoolsView.as_view(), name="delete_school"),
    path("<int:pk>/", GetSchoolView.as_view(), name="get_school"),
    path("<int:pk>/update/", UpdateSchoolView.as_view(), name="update_school"),
    path('<int:pk>/update-staff/', UpdateStaffView.as_view(), name="update_staff"),
]