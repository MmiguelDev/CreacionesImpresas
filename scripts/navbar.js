document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".navbar .menu");
    if (!toggle || !menu) return;

    const icono = toggle.querySelector("i");

    function cerrar() {
        menu.classList.remove("abierto");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        if (icono) {
            icono.classList.add("bi-list");
            icono.classList.remove("bi-x-lg");
        }
    }

    toggle.addEventListener("click", () => {
        const abierto = menu.classList.toggle("abierto");
        toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
        toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
        if (icono) {
            icono.classList.toggle("bi-list", !abierto);
            icono.classList.toggle("bi-x-lg", abierto);
        }
    });

    menu.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", cerrar);
    });
});
