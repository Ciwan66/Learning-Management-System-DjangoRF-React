from django.contrib import admin
from .models import Course, Section, Lecture, Category, Question, Rating ,Coupon,Payment,Enrollment

admin.site.register(Category)
admin.site.register(Course)
admin.site.register(Section)
admin.site.register(Lecture)
admin.site.register(Question)
admin.site.register(Rating)
admin.site.register(Coupon)
admin.site.register(Payment)
admin.site.register(Enrollment)