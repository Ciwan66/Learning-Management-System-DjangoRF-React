from .models import Cart , CartItem


def get_cart(request):
    session_key = request.session.session_key
    if request.user.is_authenticated:
        cart , created = Cart.objects.get_or_create(user=request.user)
    else:
        if not session_key:
            request.session.save()
            session_key = request.session.session_key
            print(f"Session Key: {session_key}")

        cart , created = Cart.objects.get_or_create(session_id=session_key)
    return cart

def mirage_cart(session_key, user):
    try:
        session_cart = Cart.objects.get(session_id=session_key)
    except Cart.DoesNotExist:
        return "Session cart does not exist."

    # Get or create the user's cart
    user_cart, created = Cart.objects.get_or_create(user=user)

    # Fetch the ids of courses already in the user's cart
    user_items_ids = set(CartItem.objects.filter(cart=user_cart).values_list('course__id', flat=True))

    # Fetch all the items from the session cart
    session_items = CartItem.objects.filter(cart=session_cart)
    updated_items = []

    # Loop through each item in the session cart
    for item in session_items:
        if item.course.id not in user_items_ids:
            item.cart = user_cart
            updated_items.append(item)

    # Bulk update the CartItem objects if any changes were made
    if updated_items:
        CartItem.objects.bulk_update(updated_items, ['cart'])

    # Delete the session cart to complete the merge
    session_cart.delete()

    return "Cart merged successfully"
