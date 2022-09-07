let profileContent = document.getElementById ('profile_content')
let enterOrLeave = document.getElementById('enter_or_leave')

enterOrLeave.addEventListener("click", (baba) => {
    sessionStorage.removeItem ('isAuth')
    sessionStorage.removeItem ('login')
    sessionStorage.removeItem ('email')
    sessionStorage.removeItem ('idUser')
    document.location.href = 'index.html'
})

async function getFavoriteFilms() {
    await axios.get(`http://127.0.0.1:8000/api/get_fav/?user_id=${sessionStorage.getItem('idUser')}`).then((res) => {
        res.data.forEach(element => {
            profileContent.innerHTML += `<div class="content__cinema__item">
            <div class="content__cinema__item__link">
                <a  href="film_page.html?film_id=${element.id}">
                    <img src="${element.img_small}">
                </a>
            </div>
            <div class="content__cinema__item__overlay">
                <span class="content__cinema__item__overlay__rating" data-id="${element.id}"></span>
            </div>
            <div class="content__cinema__item__text">
                <div class="content__cinema__item__text__film">
                    <a href="film_page.html?film_id=${element.id}">${element.title_ru}</a>
                    <p>${element.genres}</p>
                </div>
                <svg onclick="deleteFilm(this, ${element.id})" xmlns="http://www.w3.org/2000/svg"  fill="red" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        </div>`
        });
        getRating()
        console.log(res)})  
} 

async function deleteFilm (deleteTigger, film_id){
  
    deleteTigger.parentNode.parentNode.style.opacity = 0
       setTimeout(() => {
           deleteTigger.parentNode.parentNode.remove();
         }, "800")
         await axios.delete(`http://127.0.0.1:8000/api/delete_fav/?user_id=${sessionStorage.getItem('idUser')}&film_id=${film_id}`)
        }

function checkingAuth() {
    if (sessionStorage.getItem('isAuth')=='true'){
        getFavoriteFilms()
    }
    else{
        document.location.href = '404error.html'
    }
}
window.onload = checkingAuth()

async function getRating() {
    let labelsRating = document.getElementsByClassName('content__cinema__item__overlay__rating')
    for(let i = 0; i < labelsRating.length; i++) {
        await axios.get(`http://127.0.0.1:8000/api/film_rating/?film_id=${labelsRating[i].getAttribute('data-id')}`).then((res)=> {
        labelsRating[i].innerHTML = res.data
    })
    }
}