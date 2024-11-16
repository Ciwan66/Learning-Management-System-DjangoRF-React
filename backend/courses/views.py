from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes , action
from rest_framework.permissions import AllowAny, IsAuthenticated
from courses import serializers as api_serializers
from courses import models as api_models
from rest_framework.response import Response
from rest_framework import status ,mixins, generics
from .permissions import IsStudent
from rest_framework import viewsets

# Create your views here.

class CategoryListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = api_models.Category.objects.all()
        return queryset
    
class CategoryCoursesListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.CourseListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category_slug = self.kwargs['category_slug']
        category = api_models.Category.objects.get(slug = category_slug)
        queryset = api_models.Course.objects.filter(category = category)
        return queryset
    
class CourseListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.CourseListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qureyset = api_models.Course.objects.all()
        return qureyset
    
class TeacgerCoursesListAPIView(generics.ListAPIView):
    serializer_class = api_serializers.CourseListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qureyset = api_models.Course.objects.filter(author=self.request.user)
        return qureyset
    
class CourseDetailAPIView(generics.RetrieveAPIView):
    serializer_class = api_serializers.CourseDetailSerializer
    permission_classes = [AllowAny]


    def get_object(self):
        course_id = self.kwargs['course_id']
        course = api_models.Course.objects.get(id=course_id)
        return course

 
    def get(self, request, *args, **kwargs):
        course = self.get_object()
        serializer = self.get_serializer(course)
        response_data = serializer.data

        if request.user.is_authenticated:
            user = request.user
            cart, created = api_models.Cart.objects.get_or_create(user=user)
            wishlist, created = api_models.Wishlist.objects.get_or_create(user=user)
            response_data['in_cart'] = cart.courses.filter(id=course.id).exists()
            response_data['in_wishlist'] = wishlist.courses.filter(id=course.id).exists()
        else:
            response_data['in_cart'] = False

        return Response(response_data,status=200)
    
