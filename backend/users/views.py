from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer , RegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.contrib.auth import authenticate
from carts.services import mirage_cart
from django.contrib.auth import get_user_model
CustomUser = get_user_model()
class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MyTokenObtainPairSerializer
    def post(self ,request, *args, **kwargs):
        response = super().post(request,*args, **kwargs)
        user = authenticate(request,username = request.data.get('email'),password= request.data.get('password'))
        session_key = request.session.session_key
        if user and session_key:
            mirage_cart(session_key,user)
        return response


class RegisterAPIView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    

