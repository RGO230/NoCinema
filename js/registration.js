let login = document.getElementById ('login')
let email = document.getElementById ('email')
let button = document.getElementById ('enter')
async function registrationResponse (login,email){
    await axios.put(`http://127.0.0.1:8000/api/user/?email=${email}&login=${login}`).then((res) => {
console.log(res)
if (res.data.isAuth) {
    sessionStorage.setItem('isAuth','true')
    sessionStorage.setItem('login',res.data.user[0].login)
    sessionStorage.setItem('email',res.data.user[0].email)
    sessionStorage.setItem('idUser',res.data.user[0].id)
    document.location.href="index.html"
}
else{
    sessionStorage.removeItem ('isAuth')
    sessionStorage.removeItem ('login')
    sessionStorage.removeItem ('email')
}

})
}
button.addEventListener ('click', (e)=>{
e.preventDefault()
console.log (email.value)
console.log (login.value)
if(email.value.length<2 || login.value.length<2){
alert ('Заполните оба поля')
}
else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email.value)
){
    alert ('недопустимая почта')

}
else if(login.value.length>50){
    alert('Слишком длинный логин')
}

else{
registrationResponse (login.value,email.value)
}
})

  /*function checkingAuth(){
    if(sessionStorage.getItem('isAuth')=='true'&& sessionStorage.getItem('isAdmin')=='true'){
       
       
      
      
    }
    else if (sessionStorage.getItem('isAuth')=='true'&& sessionStorage.getItem('isAdmin')=='false'){
       
       
        
    }
    else{
        
       
       
        
    }
}*/
