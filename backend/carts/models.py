from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
import uuid

CustomUser = get_user_model()

######################### ABSTRACT ####################################

class BaseModel(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True

class Item(BaseModel):
    course = models.ForeignKey("courses.Course", on_delete=models.CASCADE)
    def __str__(self):
        return self.course.title
    class Meta:
        abstract = True

######################### CART ########################################

class Cart(BaseModel):
    user = models.OneToOneField(CustomUser, related_name='cart',blank=True,null=True, on_delete=models.CASCADE)
    session = models.OneToOneField(Session, related_name='cart', blank=True,null=True,on_delete=models.CASCADE)
    def __str__(self):
        return f'Cart of {self.session}, {self.user}'

class CartItem(Item):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)

########################## WISHLIST ################################### 

class Wishlist(BaseModel):
    user = models.OneToOneField(CustomUser, related_name='wishlist', on_delete=models.CASCADE)
    def __str__(self):
        return f'Wishlist of {self.user}'

class WishlistItem(Item):
    wishlist = models.ForeignKey(Wishlist, related_name='items', on_delete=models.CASCADE)
