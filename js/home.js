const btnLogOut = document.getElementById("log_out")
const bienvenida = document.getElementById("bienvenida");
const fechaDoc = document.getElementById("fecha");
const cantAgendas = document.getElementById("cuantas-agendas");
const btnVerAddAgendas = document.getElementById("ver_add_agenda");
const btnVerAgendas = document.getElementById("ver_agendas");
const formAddAgenda = document.getElementById("add_agenda")
const formAgendasExistentes = document.getElementById("agendas_existente")

const datosVdd = JSON.parse(localStorage.getItem("usuarios"));

btnLogOut.addEventListener("click", () => {
    window.location.href = "./index.html";
})

function fechaActual() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');

    const fechaFin = `${año}/${mes}/${dia}`
    return fechaFin;
}

function capitalizar(frase) {
    return frase
        .split(' ')
        .map(palabra =>
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
        )
        .join(' ');
}
btnVerAddAgendas.onclick = () => {
    formAddAgenda.style.display = formAddAgenda.style.display === "block" ? "none" : "block";
};

btnVerAgendas.onclick = () => {
    formAgendasExistentes.style.display = formAgendasExistentes.style.display === "block" ? "none" : "block";
};

bienvenida.textContent = `Hola, ${capitalizar(datosVdd.nombre)}`
cantAgendas.textContent = `Para hoy tienes `