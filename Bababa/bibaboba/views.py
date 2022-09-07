from django.shortcuts import render
from email import message
import email
from urllib import response
from django.http import HttpRequest, HttpResponse, JsonResponse
from pkg_resources import require
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser 
from rest_framework import status
from .models import Film, Genre, User, UserRating
from .serializers import FilmSerializer, GenreSerializer, UserSerializer, UserRatingSerializer

@api_view(["GET"])
def getFilms(request):
    if("film_id" in request.query_params.keys()):
        items = Film.objects.filter(id = request.query_params["film_id"])
        serializer = FilmSerializer(items, many=True)
        if(serializer.data == []):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)

    if("type_id" in request.query_params.keys()):
        items = Film.objects.filter(type = request.query_params["type_id"])
        serializer = FilmSerializer(items, many=True)
        if(serializer.data == []):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
    else:
        items = Film.objects.all()
        serializer = FilmSerializer(items, many=True)
        return Response(serializer.data)

@api_view(["GET"])
def getGenres(request):
    items = Genre.objects.all()
    serializer = GenreSerializer(items, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getSlider(request):
    items = Film.objects.order_by("-id") [0:5]
    serializer = FilmSerializer(items, many=True)
    return Response(serializer.data)

@api_view(["PUT"])
def postUser(request):
    createUser = User.objects.filter(email = request.query_params["email"])
    if(createUser.exists()):
        serializer = UserSerializer(createUser, many=True)
        if(serializer.data[0]["login"] == request.query_params["login"]):
            return Response({"isAuth":True, "user":serializer.data})
        else:
            return Response({"isAuth":False, "message": "login not found"})
    else:
        serializer = UserSerializer(data = request.query_params)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.filter(email = request.query_params["email"])
            serializer = UserSerializer(user, many=True)
            return Response({"isAuth":True, "user":serializer.data})
        else:
            return Response({"isAuth":False,  "message": "this user already registered"})

@api_view (['GET'])
def getFavorites(request):
    films = Film.objects.filter(favorites = request.query_params ['user_id'])
    serializer = FilmSerializer (films, many=True)
    return Response (serializer.data)

@api_view(["POST"])
def addFavorites(request):
    items = Film.objects.get(id = request.query_params["film_id"])
    items.favorites.add(request.query_params["user_id"])
    return Response("this film was added to favorites")

@api_view(["DELETE"])
def deleteFavorites(request):
    items = Film.objects.get(id = request.query_params["film_id"])
    items.favorites.remove(request.query_params["user_id"])
    return Response("this film was removed from favorites")

@api_view(["POST"])
def userRating(request):
    film = Film.objects.get(id = request.query_params["film_id"])
    user = User.objects.get(id = request.query_params["user_id"])
    UserRating.objects.update_or_create(user_id = user, film_id = film,  
    defaults = {"user_rating": request.query_params["user_rating"]})
    return Response("rating was added")

def toFixed(numObj, digits=0):
    return f"{numObj:.{digits}f}"

@api_view(["GET"])
def getFilmRating(request):
    items = UserRating.objects.filter(film_id = request.query_params["film_id"])
    serializer = UserRatingSerializer(items, many=True)
    if len(serializer.data) == 0.0:
        return Response('0.0')
    sum_rating = 0
    for i in serializer.data:
        sum_rating +=  i ["user_rating"]
    sum_rating = sum_rating / len(serializer.data)
    return Response(toFixed(sum_rating, 1))
    
@api_view(["GET"])
def getUserRating(request):
    items = UserRating.objects.filter(user_id = request.query_params["user_id"], film_id = request.query_params["film_id"] )
    serializer = UserRatingSerializer (items, many=True) 
    return Response(serializer.data)