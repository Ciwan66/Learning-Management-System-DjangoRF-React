from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import CartRetriveViwe , CartItemCreateDestroyViewset
router = DefaultRouter()
router.register(r'cart-item',CartItemCreateDestroyViewset,basename='cart-item')

urlpatterns = [
    path('test/',CartRetriveViwe.as_view(),name='cart'),
    path('', include(router.urls)),

]
