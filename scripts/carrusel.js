document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.getElementById("miCarrusel");
    const items = carrusel.querySelectorAll(".carousel-item");
    const indicadoresContenedor = carrusel.querySelector(".carousel-indicators");
    const btnPrev = carrusel.querySelector(".carousel-control-prev");
    const btnNext = carrusel.querySelector(".carousel-control-next");

    let actual = 0;
    const total = items.length;
    const intervaloMs = 5000; 
    let temporizador;

    items.forEach((_, i) => {
        const punto = document.createElement("button");
        if (i === 0) punto.classList.add("active");
        punto.addEventListener("click", () => irA(i));
        indicadoresContenedor.appendChild(punto);
    });
    const indicadores = indicadoresContenedor.querySelectorAll("button");

    function mostrar(index) {
        items[actual].classList.remove("active");
        indicadores[actual].classList.remove("active");

        actual = (index + total) % total;

        items[actual].classList.add("active");
        indicadores[actual].classList.add("active");
    }

    function irA(index) {
        mostrar(index);
        reiniciarAutoplay();
    }

    function siguiente() {
        mostrar(actual + 1);
    }

    function anterior() {
        mostrar(actual - 1);
    }

    function reiniciarAutoplay() {
        clearInterval(temporizador);
        temporizador = setInterval(siguiente, intervaloMs);
    }

    btnNext.addEventListener("click", () => irA(actual + 1));
    btnPrev.addEventListener("click", () => irA(actual - 1));

    reiniciarAutoplay();
});