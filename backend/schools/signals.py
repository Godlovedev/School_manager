from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import School, ClassRoom

@receiver(post_save, sender=School)
def create_french_primary_classes(sender, instance, created, **kwargs):
    if created:
        classes = ["MATERNELLE", "SIL", "CP", "CE1", "CE2", "CM1", "CM2"]
        for class_name in classes:
            ClassRoom.objects.create(name=class_name, school=instance)