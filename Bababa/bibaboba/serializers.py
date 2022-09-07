from asyncore import read
from dataclasses import fields
from pyexpat import model
from statistics import mode
from webbrowser import get
from rest_framework import serializers
from .models import Film, Genre, User, UserRating

class FilmSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    class Meta:
        model = Film
        fields = ['id', 'title_ru', 'title_eng', 'year_of_issue', 'duration', 'rating', 'synopsis', 'trailer_link', 'img_cover', 'img_small', 'type', 'genres',]

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class UserRatingSerializer(serializers.ModelSerializer):
    #film_id = serializers.StringRelatedField(many=True)
    #user_id = serializers.StringRelatedField(many=True)
    class Meta: 
        model = UserRating
        fields = "__all__"

