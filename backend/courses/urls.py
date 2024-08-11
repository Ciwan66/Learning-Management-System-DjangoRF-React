from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from courses import views as api_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'wishlist', api_views.WishlistViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('category/list/',api_views.CategoryListAPIView.as_view()),
    path('category/courses/<category_slug>/',api_views.CategoryCoursesListAPIView.as_view()),
    path('list/',api_views.CourseListAPIView.as_view()),
    path('detail/<course_id>/',api_views.CourseDetailAPIView.as_view()),
    path('guest/cart/',api_views.GuestCartListAPIViewList.as_view()),
    path('cart/',api_views.CartDetailCreateAPIView.as_view()),
    path('cart/<course_id>',api_views.CartDeleteAPIView.as_view()),
    path('teacher/courses',api_views.TeacgerCoursesListAPIView.as_view()),

]

