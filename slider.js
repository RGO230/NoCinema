var photos = ['/img/slider/1.jpg',
'/img/slider/2.jpg', '/img/slider/3.jpg',
 '/img/slider/4.jpg', '/img/slider/5.jpg'];
var itemsSlider = []
let mainPhoto = document.getElementById("mainPhoto");
let getDot = document.getElementsByClassName("dot");
let sliderTitle = document.getElementById("slider_title")
let sliderYear= document.getElementById("slider_year")
let sliderDuration = document.getElementById("slider_duration")
let sliderGenres = document.getElementById("slider_genres")
let sliderFilmPage = document.getElementById("slider_film_page")
let sliderFilmPage2 = document.getElementById("slider_film_page2")
let favoriteButton = document.getElementById("favorite")
var count = 0;
async function getLastFiveFilms() {
  photos = []
  await axios.get(`http://127.0.0.1:8000/api/slider/`).then((res)=>{
    res.data.forEach(element => {
      photos.push(element.img_cover)
      itemsSlider.push(element)
    });
    console.log(photos)
    currentSlide(0)
})
}
window.onload = getLastFiveFilms()
function currentSlide (bababa) {
  
  mainPhoto.style.opacity = 0
  
  for (let i=0; i<getDot.length;i++) {
  getDot[i].classList="dot"
  
}
setTimeout(() => {
  mainPhoto.src = photos[bababa];
  sliderTitle.innerHTML = itemsSlider[bababa].title_ru
  sliderYear.innerHTML = itemsSlider[bababa].year_of_issue
  sliderDuration.innerHTML = itemsSlider[bababa].duration
  sliderGenres.innerHTML = itemsSlider[bababa].genres
  sliderFilmPage.href = `film_page.html?film_id=${itemsSlider[bababa].id}`
  sliderFilmPage2.href = `film_page.html?film_id=${itemsSlider[bababa].id}`
  favoriteButton.setAttribute('data-id', itemsSlider[bababa].id)
}, "900")
setTimeout(() => {
  mainPhoto.style.opacity = 1
}, "900")
  
  getDot[bababa].classList.add("active-slide");
  count = bababa
}

let myTimer = setInterval(() => {
  if (count == 4) {
    count = -1
  }
  currentSlide(count+1)
},"5000")

async function addFavoriteSlider(baba) {
  console.log(baba)
  if(sessionStorage.getItem('isAuth') == 'true') {
      await axios.post(`http://127.0.0.1:8000/api/add_fav/?user_id=${sessionStorage.getItem('idUser')}&film_id=${baba}`).then((res) => {
      console.log(res)
      alert('Добавлено в избранное')
  })}
  else {
      alert('Сначала зарегистрируйтесь')
  }
  
}
favoriteButton.addEventListener('click', (ba) => {
  addFavoriteSlider(ba.target.attributes[1].value)})
