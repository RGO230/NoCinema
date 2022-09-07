from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.forms import BooleanField

#from bibaboba.views import userRating


class Film(models.Model):
    title_ru = models.CharField("TITLE_RU", max_length=60)
    title_eng = models.CharField("TITLE_ENG", max_length=60)
    year_of_issue = models.DateField("YEAR_OF_ISSUE")
    duration = models.DurationField("DURATION")
    rating = models.IntegerField("RATING", default=0, validators = [ MaxValueValidator(10), MinValueValidator(0)])
    synopsis = models.CharField("SYNOPSIS", max_length=1500)
    trailer_link = models.TextField("TRAILER_LINK")
    img_cover = models.TextField("IMG_COVER")
    img_small = models.TextField("IMG_SMALL")
    type = models.ForeignKey("Type", related_name="type_name", null=True, on_delete=models.RESTRICT)
    genres = models.ManyToManyField("Genre", related_name="genres")
    favorites = models.ManyToManyField("User", related_name="favorites", blank=True)
    def __str__(self):
        return self.title_ru

class Type(models.Model):
    name = models.CharField("TYPE_NAME", max_length=50)
    def __str__(self):
        return self.name

class Genre(models.Model):
    title = models.CharField("GENRE_TITLE", max_length=50)
    def __str__(self):
        return self.title

class User(models.Model):
    login = models.CharField("LOGIN", max_length=50)
    email = models.EmailField("EMAIL")
    def __str__(self):
        return self.email

class UserRating(models.Model):
    film_id = models.ForeignKey(Film, related_name="film_id", on_delete=models.RESTRICT)
    user_id = models.ForeignKey(User, related_name="user_id", on_delete=models.RESTRICT)
    user_rating = models.IntegerField("USER_RATING", default=0, validators = [ MaxValueValidator(10), MinValueValidator(0)])
 
