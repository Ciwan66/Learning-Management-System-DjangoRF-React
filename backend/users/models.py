from django.db import models
from django.contrib.auth.models import AbstractUser 
from .managers import CustomUserManager
import uuid


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    email = models.EmailField(unique=True,max_length=254)
    username = None
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)  # Profile picture
    bio = models.TextField(blank=True, null=True)  # Short biography

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']

    def __str__(self) :
        return self.email


class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    major = models.CharField(max_length=100, blank=True, null=True)  # Major field of study

    def __str__(self) :
        return self.user.email

class TeacherProfile(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE)
    years_of_experience = models.IntegerField(blank=True, null=True)  # Years of teaching experience

    def __str__(self) :
        return self.user.email
