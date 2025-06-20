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

        return `${año}-${mes}-${dia}`;
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

    if (!datosVdd.agendas) {
        datosVdd.agendas = [];
        localStorage.setItem("usuarios", JSON.stringify(datosVdd));
    }

    function mostrarCantidadAgendas() {
        const hoy = fechaActual();
        
        const agendasHoy = datosVdd.agendas.filter(agenda => 
            agenda.inicio.startsWith(hoy)
        );

        cantAgendas.textContent = `Para hoy tienes ${agendasHoy.length} agenda(s)`;
    }


    function mostrarAgendas() {
        const contenedor = formAgendasExistentes;

        contenedor.querySelectorAll(".agenda-item").forEach(e => e.remove());

        if (datosVdd.agendas.length === 0) {
            const p = document.createElement("p");
            p.className = "agenda-item";
            p.textContent = "No tienes agendas registradas.";
            contenedor.appendChild(p);
            return;
        }

        datosVdd.agendas.forEach((agenda, idx) => {
            const div = document.createElement("div");
            div.className = "agenda-item";
            div.innerHTML = `
                <strong>${agenda.titulo}</strong><br>
                ${agenda.descripcion}<br>
                Ubicación: ${agenda.ubicacion}<br>
                Inicio: ${agenda.inicio.replace("T", " ")}<br>
                Fin: ${agenda.fin.replace("T", " ")}<br>
            `;
            contenedor.appendChild(div);
        });

    }

    document.getElementById("form_add_agenda").onclick = function() {
        const titulo = document.getElementById("tittle").value.trim();
        const descripcion = document.getElementById("description").value.trim();
        const ubicacion = document.getElementById("ubication").value.trim();
        const inicio = document.getElementById("inicio").value;
        const fin = document.getElementById("fin").value;

        if (!titulo || !descripcion || !ubicacion || !inicio || !fin) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        datosVdd.agendas.push({
            titulo,
            descripcion,
            ubicacion,
            inicio,
            fin
        });

        localStorage.setItem("usuarios", JSON.stringify(datosVdd));
        mostrarCantidadAgendas();
        mostrarAgendas();

        formAddAgenda.reset();
        formAddAgenda.style.display = "none";
    };

    btnVerAgendas.onclick = () => {
        formAgendasExistentes.style.display = formAgendasExistentes.style.display === "block" ? "none" : "block";
        if (formAgendasExistentes.style.display === "block") {
            mostrarAgendas();
        }
    };
    document.getElementById("form_add_agenda").onclick = function() {
        const titulo = document.getElementById("tittle").value.trim();
        const descripcion = document.getElementById("description").value.trim();
        const ubicacion = document.getElementById("ubication").value.trim();
        const inicio = document.getElementById("inicio").value;
        const fin = document.getElementById("fin").value;

        if (!titulo || !descripcion || !ubicacion || !inicio || !fin) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const ahora = new Date();
        const inicioDate = new Date(inicio);
        const finDate = new Date(fin);

        if (inicioDate < new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate())) {
            alert("No puedes crear una agenda para una fecha anterior a hoy.");
            return;
        }

        if (finDate <= inicioDate) {
            alert("La fecha y hora final debe ser mayor a la fecha y hora inicial.");
            return;
        }

        const conflicto = datosVdd.agendas.some(agenda => {
            const agendaInicio = new Date(agenda.inicio);
            const agendaFin = new Date(agenda.fin);
            return (inicioDate < agendaFin && finDate > agendaInicio);
        });

        if (conflicto) {
            alert("Ya tienes una agenda en ese lapso de tiempo.");
            return;
        }

        datosVdd.agendas.push({
            titulo,
            descripcion,
            ubicacion,
            inicio,
            fin
        });

        localStorage.setItem("usuarios", JSON.stringify(datosVdd));
        mostrarCantidadAgendas();
        mostrarAgendas();

        formAddAgenda.reset();
        formAddAgenda.style.display = "none";
    };

    mostrarCantidadAgendas();