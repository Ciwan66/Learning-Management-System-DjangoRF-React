from django.shortcuts import render

from rest_framework import generics , viewsets, mixins , permissions
from courses.permissions import IsStudent

from .serializers import CartItemCreateSerializer,CartSerializer,WishlistItemCreateSerializer,WishlistSerializer
from .models import CartItem ,Cart ,WishlistItem ,Wishlist
from .services import get_cart

class CartItemCreateDestroyViewset(viewsets.GenericViewSet,mixins.CreateModelMixin,mixins.DestroyModelMixin):
    serializer_class=CartItemCreateSerializer
    permission_classes=[permissions.AllowAny]
    def get_queryset(self):
        cart = get_cart(self.request)
        return CartItem.objects.filter(cart=cart)
    

    def perform_create(self, serializer):
        cart = get_cart(self.request)
        serializer.save(cart=cart)
                 
class CartRetriveViwe(generics.RetrieveAPIView):
    serializer_class=CartSerializer
    def get_object(self):
        cart = get_cart(self.request)
        return cart

class WishlistItemCreateDestroyViewset(viewsets.GenericViewSet,mixins.CreateModelMixin,mixins.DestroyModelMixin):
    serializer_class=WishlistItemCreateSerializer
    permission_classes=[IsStudent]
    def get_queryset(self):
        return WishlistItem.objects.filter(wishlist__user=self.request.user)
    

    def perform_create(self, serializer):
        wishlist = Wishlist.objects.get(user=self.request.user)
        serializer.save(wishlist=wishlist)
                 
class WishlistRetriveView(generics.RetrieveAPIView):
    serializer_class=CartSerializer
    permission_classes = [IsStudent]
    def get_object(self):
        wishlist = Wishlist.objects.get(user = self.request.user)
        return wishlist

