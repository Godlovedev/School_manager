from django.urls import path
from .views import ListSchoolsView, CreateSchoolsView, DeleteSchoolsView, GetSchoolView, UpdateSchoolView, UpdateStaffView, CreateCashContributionView, CreateInKindContributionView, ListAllContributionsView, CreateStudentView, ListStudentsView, CreateProfessorView, ListProfessorView, UpdateProfessorView, UpdateStudentView, DeleteProfessorView, DeleteStudentView

urlpatterns = [
    path("", ListSchoolsView.as_view(), name="list_schools"),
    path("create/", CreateSchoolsView.as_view(), name="create_school"),
    path("delete/<int:pk>/", DeleteSchoolsView.as_view(), name="delete_school"),
    path("<int:pk>/", GetSchoolView.as_view(), name="get_school"),
    path("<int:pk>/update/", UpdateSchoolView.as_view(), name="update_school"),
    path('<int:pk>/update-staff/', UpdateStaffView.as_view(), name="update_staff"),
    path('<int:pk>/contributions/', ListAllContributionsView.as_view(), name="list_contributions"),
    path('<int:pk>/contributions/create-cash-contribution/', CreateCashContributionView.as_view(), name="create_cash_contribution"),
    path('<int:pk>/contributions/create-inkind-contribution/', CreateInKindContributionView.as_view(), name="create_inkind_contribution"),
    path("<int:pk>/students/create/", CreateStudentView.as_view(), name="create_student"),
    path("<int:pk>/students/", ListStudentsView.as_view(), name="list_students"),
    path("<int:pk>/students/<int:student_id>/update/", UpdateStudentView.as_view(), name="update_student"),
    path("<int:pk>/students/<int:student_id>/delete/", DeleteStudentView.as_view(), name="delete_student"),
    path("<int:pk>/professors/create/", CreateProfessorView.as_view(), name="create_professor"),
    path("<int:pk>/professors/", ListProfessorView.as_view(), name="list_professors"),
    path("<int:pk>/professors/<int:profid>/update/", UpdateProfessorView.as_view(), name="update_professor"),
    path("<int:pk>/professors/<int:profid>/delete/", DeleteProfessorView.as_view(), name="delete_professor"),

]