from rest_framework import serializers
from .models import CartItem ,Cart ,WishlistItem ,Wishlist
from courses.serializers import CourseListSerializer
from .services import get_cart


class CartItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartItem
        fields = ['course']
    def validate(self, attrs):
        course_id = attrs['course']
        cart = get_cart(self.context['request'])
        cartItem = CartItem.objects.filter(course_id=course_id,cart=cart)
        if cartItem :
            raise serializers.ValidationError('Already exists')
        return attrs
    
    
class CartItemListSerializer(serializers.ModelSerializer):
    course = CourseListSerializer(read_only=True)
    class Meta:
        model=CartItem
        fields = ['id','course']
        extra_kwargs ={
            "id":{"read_only":True}
        }
        
class CartSerializer(serializers.ModelSerializer):
    items = CartItemListSerializer(read_only=True , many=True)
    class Meta:
        model=Cart
        fields = ['id','items']




class WishlistItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=WishlistItem
        fields = ['course']
    def validate(self, attrs):
        course_id = attrs['course']
        user = self.context['request'].user
        wishlist = Wishlist.objects.get(user=user)
        wishlistItem = WishlistItem.objects.filter(course_id=course_id,wishlist=wishlist)
        if wishlistItem :
            raise serializers.ValidationError('Already exists')
        return attrs
    
    

class WishlistItemListSerializer(serializers.ModelSerializer):
    course = CourseListSerializer(read_only=True)
    class Meta:
        model=WishlistItem
        fields = ['id','course']
        extra_kwargs ={
            "id":{"read_only":True}
        }
        
class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemListSerializer(read_only=True , many=True)
    class Meta:
        model=Wishlist
        fields = ['id','items']
