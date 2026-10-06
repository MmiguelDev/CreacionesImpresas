document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-pedido");
    if (!form) return;

    const exito = document.getElementById("exito-pedido");
    const TAMANO_MAXIMO = 5 * 1024 * 1024;
    const tiposImagen = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    const campos = [
        {
            input: document.getElementById("nombre"),
            error: document.getElementById("error-nombre"),
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
            input: document.getElementById("telefono"),
            error: document.getElementById("error-telefono"),
            validar(input) {
                const telefono = input.value.replace(/[\s()-]/g, "");
                if (!telefono) return "Ingresa tu teléfono.";
                if (!/^(?:\+?52)?\d{10}$/.test(telefono)) {
                    return "Ingresa un teléfono de 10 dígitos.";
                }
                return "";
            }
        },
        {
            input: document.getElementById("correo"),
            error: document.getElementById("error-correo"),
            validar(input) {
                const correo = input.value.trim();
                if (!correo) return "Ingresa tu correo.";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
                    return "Ingresa un correo válido.";
                }
                return "";
            }
        },
        {
            input: document.getElementById("descripcion"),
            error: document.getElementById("error-descripcion"),
            validar(input) {
                const descripcion = input.value.trim();
                if (!descripcion) return "Describe tu pedido.";
                if (descripcion.length < 10) return "La descripción debe tener al menos 10 caracteres.";
                return "";
            }
        },
        {
            input: document.getElementById("diseno"),
            error: document.getElementById("error-diseno"),
            validar(input) {
                const archivo = input.files[0];
                if (!archivo) return "Adjunta la imagen de tu diseño.";
                const extensionValida = /\.(jpe?g|png|webp|gif)$/i.test(archivo.name);
                if (!tiposImagen.includes(archivo.type) && !extensionValida) {
                    return "El archivo debe ser JPG, PNG, WEBP o GIF.";
                }
                if (archivo.size > TAMANO_MAXIMO) return "La imagen no puede pesar más de 5 MB.";
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
        const evento = campo.input.type === "file" ? "change" : "input";
        campo.input.addEventListener(evento, () => {
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
