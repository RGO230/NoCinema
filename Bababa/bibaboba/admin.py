from django.contrib import admin
from .models import Film, Genre, User, UserRating, Type

admin.site.register(Film)
admin.site.register(Genre)
admin.site.register(User)
admin.site.register(UserRating)
admin.site.register(Type)
