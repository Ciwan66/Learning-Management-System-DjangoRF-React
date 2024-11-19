from rest_framework import serializers
from django.contrib.auth import get_user_model
from users.serializers import CustomUserSerializer
from .models import Category , Course ,Lecture , Section , Rating , Question , Enrollment , Payment , Coupon
CustomUser = get_user_model()


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['title','slug']
        extra_kwargs = {
            'title' : {'read_only':True}
        }

class LectureSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Lecture
        fields = '__all__'
        extra_kwargs = {
            'section' : {'read_only':True}
        }

class SectionSerializer(serializers.ModelSerializer):
    lectures = LectureSerializer(many=True)
    class Meta:
        model = Section
        fields = '__all__'
        extra_kwargs = {
            'course' : {'read_only':True}
        }
    def create(self, validated_data):
        lectures = validated_data.pop('lectures')
        section = super().create(validated_data)
        lectures_serailizered = LectureSerializer(data=lectures,many=True)
        lectures_serailizered.is_valid(raise_exception=True)
        lectures_serailizered.save(section=section)
        return section

class CourseDetailSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True , read_only= True)
    author = CustomUserSerializer(read_only= True)
    category = CategorySerializer(read_only= True)
    class Meta:
        model = Course
        fields = '__all__'
        extra_kwargs = {
            'id':{'read_only':True},
            'published':{'read_only':True},
            'last_update':{'read_only':True},
            'average_rating':{'read_only':True},
            'num_ratings':{'read_only':True},
        }




class CourseListSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer()

    class Meta:
        model = Course
        fields =['id','title','img','average_rating','num_ratings','price','author']
        depth=1

