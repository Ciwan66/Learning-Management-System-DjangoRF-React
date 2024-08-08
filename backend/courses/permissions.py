from rest_framework import permissions

class IsStudent(permissions.BasePermission):

    def has_permission(self, request, view):
        
        if request.user.is_authenticated :
         
            return request.user.is_student
        else:
            return False




    # def has_object_permission(self, request, view, obj):

    #     # Instance must have an attribute named `owner`.
    #     return obj.user == request.user