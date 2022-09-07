let enterOrLeave = document.getElementById ('enter_or_leave')
let personalCabinet = document.getElementById('personalCabinet')
function checkingAuth() {
    if (sessionStorage.getItem('isAuth')=='true'){
        enterOrLeave.innerHTML = 'Выйти'
        personalCabinet.style.display = 'block'
    }
    else{
        enterOrLeave.innerHTML = 'Войти'
        personalCabinet.style.display = 'none'
    }
}
enterOrLeave.addEventListener("click", (baba) => {
    if(enterOrLeave.innerHTML == 'Выйти') {
        sessionStorage.removeItem ('isAuth')
        sessionStorage.removeItem ('login')
        sessionStorage.removeItem ('email')
        sessionStorage.removeItem ('idUser')
        checkingAuth()
    }
    else {
        document.location.href = 'reglog_page.html'
    }

})
window.onload = checkingAuth()