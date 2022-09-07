let titleRu = document.getElementById("title_ru")
let titleEng = document.getElementById("title_eng")
let yearOfIssue = document.getElementById("year_of_issue")
let duration = document.getElementById("duration")
let genres = document.getElementById("genres")
let synopsis = document.getElementById("synopsis")
let filmPoster = document.getElementById("film_poster")
let filmRatingValue = document.getElementById("film_rating")
let userRatingValue = document.getElementById("user_rating")
let trailer = document.getElementById("trailer")
let userRatingBody = document.getElementById("user_rating_body")
let hiddenTitle = document.getElementById("title_hidden")
var paramsString = document.location.search; 
var searchParams = new URLSearchParams(paramsString);
route = searchParams.get("film_id");

async function getFilm() {
    if (sessionStorage.getItem('isAuth')=='true') {
        userRatingBody.style.display = 'flex'
        hiddenTitle.style.display = 'flex'
    }
    else{
        userRatingBody.style.display = 'none'
        hiddenTitle.style.display = 'none'
    }
    await axios.get(`http://127.0.0.1:8000/api/film/?film_id=${route}`).then((res)=>{
        titleRu.innerHTML = res.data[0].title_ru
        titleEng.innerHTML = res.data[0].title_eng
        yearOfIssue.innerHTML = res.data[0].year_of_issue
        duration.innerHTML = res.data[0].duration
        genres.innerHTML = res.data[0].genres
        synopsis.innerHTML = res.data[0].synopsis
        filmPoster.src = res.data[0].img_cover
        trailer.src = res.data[0].trailer_link
       })
}


window.onload =  getFilm();


// Вывод рейтинга фильма
async function getFilmRating() {
    await axios.get(`http://127.0.0.1:8000/api/film_rating/?film_id=${route}`).then((res)=> {
    console.log(res)
    filmRatingValue.innerHTML = res.data
    initRatingsFilm()
    })
   
}

getFilmRating()

// Вывод оценки пользователя 

async function getUserRating() {
    await axios.get(`http://127.0.0.1:8000/api/get_user_rating/?film_id=${route}&user_id=${sessionStorage.getItem('idUser')}`).then((res)=> {
    userRatingValue.innerHTML = res.data[0].user_rating
    initRatings()
    })

}

getUserRating()