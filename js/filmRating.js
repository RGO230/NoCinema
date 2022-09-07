const ratingsFilm = document.querySelectorAll('.rating-film');
if (ratingsFilm.length > 0) {
    initRatingsFilm();
}

// Основная функция
function initRatingsFilm () {
    let ratingActiveFilm, ratingValueFilm;
    // "Бегаем" по всем рейтингам на странице
    for(let index = 0; index < ratingsFilm.length; index++) {
      const ratingFilm = ratingsFilm[index];
      initRatingFilm(ratingFilm); 
    }

    // Инициализируем конкретный рейтинг
    function initRatingFilm(ratingFilm) {
        initRatingVarsFilm(ratingFilm);

        setRatingActiveWidthFilm();

        if(ratingFilm.classList.contains('rating_set')) {
            setRatingFilm(ratingFilm);
        }
    }

    // Инициализация переменных
    function initRatingVarsFilm(ratingFilm) {
        ratingActiveFilm = ratingFilm.querySelector('.rating__active-film');
        ratingValueFilm = ratingFilm.querySelector('.rating__value-film');
    }

    // Изменяем ширину активных звезд
    function setRatingActiveWidthFilm(index = ratingValueFilm.innerHTML) {
        const ratingActiveWidth = index / 0.1;
        ratingActiveFilm.style.width = `${ratingActiveWidth}%`;
       
    }


    // Возможность указывать оценку
    function setRatingFilm(ratingFilm) {
        const ratingItemsFilm = rating.querySelectorAll('.rating__item');
        for(let index = 0; index < ratingItemsFilm.length; index++) {
            const ratingItemFilm = ratingItemsFilm[index];
            ratingItemFilm.addEventListener("mouseenter", function (e) {
                // Обновление переменных
                initRatingVars(ratingFilm);
                // Обновление активных звезд
                setRatingActiveWidth(ratingItemFilm.value);                   
            });
            ratingItemFilm.addEventListener("mouseleave", function (e) {
                // Обновление активных звезд
                setRatingActiveWidth();
            });
            ratingItemFilm.addEventListener("click", function (e) {
                // Обновление переменных
                initRatingVars(ratingFilm);


                ratingValue.innerHTML = index + 1;
                setRatingActiveWidth();
                console.log("DS")
                
                
            });
        }
    }

}