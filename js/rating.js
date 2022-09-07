"use strict"

const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
    initRatings();
}

// Основная функция
function initRatings () {
    let ratingActive, ratingValue;
    // "Бегаем" по всем рейтингам на странице
    for(let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating); 
    }

    // Инициализируем конкретный рейтинг
    function initRating(rating) {
        initRatingVars(rating);

        setRatingActiveWidth();

        if(rating.classList.contains('rating_set')) {
            setRating(rating);
        }
    }

    // Инициализация переменных
    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    // Изменяем ширину активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.1;
        ratingActive.style.width = `${ratingActiveWidth}%`;
       
    }

    //Отправка рейтинга пользователя на сервер
    async function sendUserRating(bababa) {
        await axios.post(`http://127.0.0.1:8000/api/user_rating/?film_id=${route}&user_id=${sessionStorage.getItem('idUser')}&user_rating=${bababa}`).then((res)=> {
            console.log(res)
    })
    }

    // Возможность указывать оценку
    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for(let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
                // Обновление переменных
                initRatingVars(rating);
                // Обновление активных звезд
                setRatingActiveWidth(ratingItem.value);                   
            });
            ratingItem.addEventListener("mouseleave", function (e) {
                // Обновление активных звезд
                setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
                // Обновление переменных
                initRatingVars(rating);


                ratingValue.innerHTML = index + 1;
                setRatingActiveWidth();

                sendUserRating(ratingValue.innerHTML)
                
            });
        }
    }

}




