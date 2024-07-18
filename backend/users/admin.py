from django.contrib import admin
from .models import CustomUser , StudentProfile , TeacherProfile
# Register your models here.
admin.site.register(StudentProfile)
admin.site.register(TeacherProfile)


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email','first_name','last_name']


admin.site.register(CustomUser , CustomUserAdmin)
