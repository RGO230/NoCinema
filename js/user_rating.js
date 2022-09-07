async function userRating(baba) {
    if(sessionStorage.getItem('isAuth') == 'true') {
        await axios.post(`http://127.0.0.1:8000/api/user_rating/?user_id=${sessionStorage.getItem('idUser')}&film_id=${baba}`).then((res) => {
        console.log(res)
        alert('Рейтинг был добавлен')
    })}
    else {
        alert('Сначала зарегистрируйтесь')
    }
}