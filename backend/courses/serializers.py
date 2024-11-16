from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.serializers import CustomUserSerializer
from .models import Category , Course ,Lecture , Section , Rating , Question , Enrollment , Payment , Coupon
CustomUser = get_user_model()


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['title','slug']

class LectureSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Lecture
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    lectures = LectureSerializer(many=True)
    class Meta:
        model = Section
        fields = '__all__'


class CourseDetailSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True)
    author = CustomUserSerializer()
    class Meta:
        model = Course
        fields = '__all__'
        depth = 1




class CourseListSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer()

    class Meta:
        model = Course
        fields =['id','title','img','average_rating','num_ratings','price','author']
        depth=1

