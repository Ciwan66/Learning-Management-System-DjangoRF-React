from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from courses import serializers as api_serializers
from courses import models as api_models

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