document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-resena");
    if (!form) return;

    const exito = document.getElementById("exito-resena");

    const campos = [
        {
            input: document.getElementById("nombre-resena"),
            error: document.getElementById("error-nombre-resena"),
            validar(input) {
                const nombre = input.value.trim();
                if (!nombre) return "Ingresa tu nombre.";
                if (nombre.length < 2) return "El nombre debe tener al menos 2 caracteres.";
                if (!/^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+(?:[ '\-][A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+)*$/.test(nombre)) {
                    return "Usa solo letras y espacios.";
                }
                return "";
            }
        },
        {
            input: document.getElementById("comentario"),
            error: document.getElementById("error-comentario"),
            validar(input) {
                const comentario = input.value.trim();
                if (!comentario) return "Escribe tu reseña.";
                if (comentario.length < 10) return "La reseña debe tener al menos 10 caracteres.";
                return "";
            }
        },
        {
            input: document.getElementById("calificacion"),
            error: document.getElementById("error-calificacion"),
            validar(input) {
                const texto = input.value.trim();
                if (!texto) return "Ingresa una calificación del 1 al 5.";
                if (!/^[1-5]$/.test(texto)) return "La calificación debe ser un número del 1 al 5.";
                return "";
            }
        }
    ];

    function mostrarError(input, error, mensaje) {
        error.textContent = mensaje;
        error.hidden = !mensaje;
        input.classList.toggle("invalido", Boolean(mensaje));
        input.setAttribute("aria-invalid", mensaje ? "true" : "false");
        if (mensaje) input.setAttribute("aria-describedby", error.id);
        else input.removeAttribute("aria-describedby");
    }

    function validarCampo(campo) {
        const mensaje = campo.validar(campo.input);
        mostrarError(campo.input, campo.error, mensaje);
        return !mensaje;
    }

    campos.forEach((campo) => {
        campo.input.addEventListener("input", () => {
            exito.hidden = true;
            if (campo.input.dataset.tocado) validarCampo(campo);
        });
        campo.input.addEventListener("blur", () => {
            campo.input.dataset.tocado = "1";
            validarCampo(campo);
        });
    });

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        exito.hidden = true;

        const resultados = campos.map((campo) => {
            campo.input.dataset.tocado = "1";
            return { campo, valido: validarCampo(campo) };
        });

        const primeroInvalido = resultados.find((resultado) => !resultado.valido);
        if (primeroInvalido) {
            primeroInvalido.campo.input.focus();
            return;
        }

        form.reset();
        campos.forEach((campo) => {
            delete campo.input.dataset.tocado;
            mostrarError(campo.input, campo.error, "");
        });
        exito.hidden = false;
    });
});
