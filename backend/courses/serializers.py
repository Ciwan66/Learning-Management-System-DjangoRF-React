from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category ,Cart, Course , Wishlist,Lecture , Section , Rating , Question , Enrollment , Payment , Coupon
CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','first_name','last_name','profile_picture','bio']
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


class CartSerializer(serializers.ModelSerializer):
    courses = CourseListSerializer(many=True,read_only=True)
    class Meta:
        model = Cart
        fields = ['id','courses','total_price']


class WishlistSerializer(serializers.ModelSerializer):
    courses = CourseListSerializer(many=True , read_only=True)
    class Meta:
        model = Wishlist
        fields = ['id','courses']