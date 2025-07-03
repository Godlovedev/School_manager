from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

# Create your models here.
class School(models.Model):
    admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name='schools')
    staff = models.ManyToManyField(User, related_name='staff_schools', blank=True, null=True)
    # students = models.ManyToManyField()
    name = models.CharField(max_length=255)
    localisation = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name

    def is_admin(self, user):
        return self.user == user