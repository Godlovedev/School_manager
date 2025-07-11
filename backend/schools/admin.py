from django.contrib import admin
from .models import School, ClassRoom, InKindContribution, CashContribution

# Register your models here.
admin.site.register(School)
admin.site.register(ClassRoom)
admin.site.register(InKindContribution)
admin.site.register(CashContribution)
