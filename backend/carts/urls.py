from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CartRetriveViwe , CartItemCreateDestroyViewset , WishlistItemCreateDestroyViewset,WishlistRetriveView
router = DefaultRouter()
router.register(r'cart-item',CartItemCreateDestroyViewset,basename='cart-item')
router.register(r'wishlist-item',WishlistItemCreateDestroyViewset,basename='wishlist-item')

urlpatterns = [
    path('test/',CartRetriveViwe.as_view(),name='cart'),
    path('test2/',WishlistRetriveView.as_view(),name='wishlist'),
    path('', include(router.urls)),

]
