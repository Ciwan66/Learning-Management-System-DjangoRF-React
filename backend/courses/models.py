from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Avg
from django.db.models import JSONField
from django.utils import timezone
from django.utils.text import slugify
import uuid


CustomUser = get_user_model()

class Category(models.Model):
    slug = models.SlugField(max_length = 250, null = True, blank = True) 
    title = models.CharField(blank=False,max_length=250)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs): 
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField( blank=False,max_length=250)
    subtitle = models.CharField( blank=False,max_length=500)
    img = models.ImageField(upload_to='images_uploaded',null=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser,related_name='courses', on_delete=models.CASCADE)
    objectives = JSONField(default=list, blank=True)
    requirements =  models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    target_audience = models.TextField(blank=True, null=True)
    published = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    average_rating = models.FloatField(default=0)
    num_ratings = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    def __str__(self):
        return self.title


    def update_rating(self):
        average = self.ratings.aggregate(Avg('rating'))['rating__avg']
        self.average_rating = average or 0
        self.num_ratings = self.ratings.count()
        self.save()

class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField( blank=False,max_length=250)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

class Lecture(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    section = models.ForeignKey(Section, related_name='lectures', on_delete=models.CASCADE)
    title = models.CharField( blank=False,max_length=250)
    video = models.FileField(upload_to='videos/', null=True, blank=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lecture = models.ForeignKey(Lecture, related_name='questions', on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField( blank=False,max_length=250)
    details = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.author) + ' comment ' + str(self.title)
    @property
    def children(self):
        return Question.objects.filter(parent=self).reverse()

    @property
    def is_parent(self):
        return self.parent is None

class Rating(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, related_name='ratings', on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    description = models.TextField(blank=True,null=True)
    rating = models.PositiveIntegerField(choices=((1,'1 star'),(2,'2 star'),(3,'3 star'),(4,'4 star'),(5,'5 star')))
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together =('course','user')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.course.update_rating()


    def __str__(self):
        return f'{self.rating} by {self.user} for {self.course}'   


class Coupon(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=50, unique=True)
    discount = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage discount")
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.code

class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.coupon and self.coupon.active and self.coupon.valid_from <= timezone.now() <= self.coupon.valid_to:
            self.amount = self.amount * (1 - (self.coupon.discount / 100))
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user} paid {self.amount} for {self.course}'

class Enrollment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='enrollments', on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.user} enrolled in {self.course}'
    
class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course)

    @property
    def total_price(self):
        return sum(course.price for course in self.courses.all())

    def __str__(self):
        return f'Cart of {self.user}'
    
class Wishlist(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    courses = models.ManyToManyField(Course)

    def __str__(self):
        return f'Wishlist of {self.user}'