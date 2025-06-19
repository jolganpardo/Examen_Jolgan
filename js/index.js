const logUser = document.getElementById("log_user");
const logPass = document.getElementById("log_pass");
const btnLogin = document.getElementById("btn_login");

function validarUsuario() {
    const user = logUser.value;
    const pass = logPass.value;
    const datosVdd = JSON.parse(localStorage.getItem("usuarios"));

    if(!user || !pass ) {
        alert("Completa todos los campos")
    } else if(user === datosVdd.usuario && pass === datosVdd.contraseña) {
        window.location.href = "./home.html"
    } else {
        alert("Datos incorrectos")
    }

}

btnLogin.addEventListener("click", () => {
    validarUsuario();
})