async function addFavorite(baba) {
    if(sessionStorage.getItem('isAuth') == 'true') {
        await axios.post(`http://127.0.0.1:8000/api/add_fav/?user_id=${sessionStorage.getItem('idUser')}&film_id=${baba}`).then((res) => {
        console.log(res)
        alert('Добавлено в избранное')
    })}
    else {
        alert('Сначала зарегистрируйтесь')
    }
}