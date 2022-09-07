from django.contrib import admin
from .models import Film, Genre, User, UserRating

admin.site.register(Film)
admin.site.register(Genre)
admin.site.register(User)
admin.site.register(UserRating)
