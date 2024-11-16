from django.shortcuts import render

from rest_framework import generics , viewsets, mixins , permissions

from .serializers import CartItemCreateSerializer,CartItemListSerializer,CartSerializer
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

