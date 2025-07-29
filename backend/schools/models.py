from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Sum


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
        return self.admin == user


class ClassRoom(models.Model):
    name = models.CharField(max_length=100)
    school = models.ForeignKey(School, related_name="classes", on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.name} - ({self.school.name})"


class CashContribution(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="cash_contributions")
    contributor_name = models.CharField(max_length=255)
    amount = models.FloatField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.contributor_name} - {self.amount} XAF"


    def get_total_cash(obj):
        total = CashContribution.objects.filter(school=obj).aggregate(Sum('amount'))['amount__sum'] or 0
        return total


class InKindContribution(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="inkind_contributions")
    contributor_name = models.CharField(max_length=255)
    item_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity}x {self.item_name} by {self.contributor_name}"



class Student(models.Model):
    name = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100, blank=True, null=True)
    note = models.FloatField(blank=True, null=True, default=0)
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE, related_name='students')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students')

    def __str__(self):
        return self.name


class Professor(models.Model):
    name = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name="professors")

    def __str__(self):
        return f"{self.name} - ({self.school})"