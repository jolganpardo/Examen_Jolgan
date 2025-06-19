var usuarios = [];

const regNombre = document.getElementById("nombre_reg");
const regEmail = document.getElementById("email_reg");
const regPass = document.getElementById("pass_reg");
const regConfPass = document.getElementById("pass_conf_reg");
const btnReg = document.getElementById("btn_registrar")

function resgistrar() {
        const nombre = regNombre.value;
        const email = regEmail.value;
        const pass = regPass.value;
        const passConf = regConfPass.value;
        let usuario = {
            nombre: nombre,
            usuario: email,
            contraseña: pass
        }
        usuarios.push({ email, nombre, pass });
        console.log(JSON.stringify(usuarios));

        if(!nombre || !email || !pass || !passConf) {
            alert("Completa todos los campos");
        } else if(pass !== passConf) {
            alert("Las contraseñas no coinciden");
        } else {
        alert(`Usuario: ${email}`);
        localStorage.setItem("usuarios", JSON.stringify(usuario));
        window.location.href = "./index.html";
        }

}
btnReg.addEventListener("click", () => {
    resgistrar()
})

