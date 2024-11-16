from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

from django.contrib.auth import get_user_model
CustomUser = get_user_model()
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['first_name'] = user.first_name
        token['email'] = user.email
        token['is_student'] = user.is_student
        token['is_teacher'] = user.is_teacher
        
        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True , required = True , validators = [validate_password])
    class Meta:
        model = CustomUser
        fields = ['first_name' , 'last_name','email','is_student','is_teacher','password']
    extra_kwargs ={
        'first_name':{'required':True},
        'last_name':{'required':True}
    }
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)

        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name','last_name','profile_picture','bio']