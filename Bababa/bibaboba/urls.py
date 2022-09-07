from django.urls import path 
from .import views

urlpatterns = [
    path("api/film/",views.getFilms),
    path("api/genre/",views.getGenres),
    path("api/slider/",views.getSlider),
    path("api/user/",views.postUser),
    path("api/get_fav/",views.getFavorites),
    path("api/delete_fav/",views.deleteFavorites),
    path("api/add_fav/",views.addFavorites),
    path("api/user_rating/",views.userRating),
    path("api/film_rating/",views.getFilmRating),
    path("api/get_user_rating/",views.getUserRating),
 ]
