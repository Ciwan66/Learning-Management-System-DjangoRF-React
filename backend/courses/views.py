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
    
class CartDetailCreateAPIView(APIView):
    serializer_class = api_serializers.CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        try:
        # Try to get the cart for the user
            cart = api_models.Cart.objects.get(user=user)
        except api_models.Cart.DoesNotExist:
        # If the cart does not exist, create one
            cart = api_models.Cart.objects.create(user=user)

        return cart

    def get(self, request, format=None):
        cart = self.get_object()
        serializer = self.serializer_class(cart)
        return Response(serializer.data)

    def post(self, request, format=None):
        cart = self.get_object()  # Assumes get_object() gets the cart for the current user/session
        course_id = request.data.get('id')

        if not course_id:
            return Response({"error": "Course ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            course = api_models.Course.objects.get(id=course_id)
            cart.courses.add(course)
            return Response({'success':"Course added to cart"},status=status.HTTP_201_CREATED)
        except api_models.Course.DoesNotExist:
            
            return Response({'error':'Course not found'},status=status.HTTP_404_NOT_FOUND)

class CartDeleteAPIView(APIView):
    serializer_class = api_serializers.CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        try:
        # Try to get the cart for the user
            cart = api_models.Cart.objects.get(user=user)
        except api_models.Cart.DoesNotExist:
        # If the cart does not exist, create one
            cart = api_models.Cart.objects.create(user=user)

        return cart
    
    def delete(self, request, course_id, format=None):
        cart = self.get_object()
        course = api_models.Course.objects.get(id=course_id)
        cart.courses.remove(course)
        return Response(status=status.HTTP_204_NO_CONTENT)

class GuestCartListAPIViewList(APIView):
    permission_classes=[AllowAny,]

    def post(self,request,format = None):
        courses_id =request.data.get('id',[])
        if not courses_id :
            return Response({"error":"No Course id Provided"},status=status.HTTP_400_BAD_REQUEST)
        try :
            courses = api_models.Course.objects.filter(id__in =courses_id)

        except api_models.Coupon.DoesNotExist:
            return Response({'error':"Course not found"},status=status.HTTP_204_NO_CONTENT)

        total_price = sum(course.price for course in courses)
        serializer = api_serializers.CourseListSerializer(courses , many=True)

        response_data = {
            "courses" : serializer.data,
            'total_price' : total_price,
        }
        return Response(response_data,status=status.HTTP_200_OK)
    

class WishlistViewSet(viewsets.GenericViewSet):
    queryset = api_serializers.Wishlist.objects.all()
    serializer_class = api_serializers.WishlistSerializer
    def get_object(self):
        user = self.request.user
        try:
        # Try to get the cart for the user
            wishlist = api_models.Wishlist.objects.get(user=user)
        except api_models.Wishlist.DoesNotExist:
        # If the cart does not exist, create one
            wishlist = api_models.Wishlist.objects.create(user=user)

        return wishlist

    @action(detail=False, methods=['get'])
    def retrive(self, request):
        wishlist = self.get_object()
        serializer = self.serializer_class(wishlist)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def add_course(self, request):
        wishlist = self.get_object()
        course_id = request.data.get('course_id')
        try:
            course = api_models.Course.objects.get(id=course_id)
        except api_models.Course.DoesNotExist:
            return Response({'detail': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)

        wishlist.courses.add(course)
        return Response({'detail': 'Course added to wishlist.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def remove_course(self, request, pk=None):
        wishlist = self.get_object()
        course_id = request.data.get('course_id')
        try:
            course = api_models.Course.objects.get(id=course_id)
        except api_models.Course.DoesNotExist:
            return Response({'detail': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)

        wishlist.courses.remove(course)
        return Response({'detail': 'Course removed from wishlist.'}, status=status.HTTP_200_OK)