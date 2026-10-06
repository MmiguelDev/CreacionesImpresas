const resenas = [
    {
        "id": 1,
        "usuario": "Ricardo Pérez",
        "estrellas": 3,
        "comentario": "Excelente atención"
    },
    {
        "id": 2,
        "usuario": "Andrea Molina",
        "estrellas": 5,
        "comentario": "Quedé impresionada con la calidad del estampado, se nota el cuidado en los detalles. Sin duda vuelvo a pedir"
    },
    {
        "id": 3,
        "usuario": "Jorge Salcido",
        "estrellas": 4,
        "comentario": "Buen trabajo y entrega rápida, aunque el color quedó un poco distinto al que pedí"
    },
    {
        "id": 4,
        "usuario": "Fernanda Ríos",
        "estrellas": 5,
        "comentario": "Les mandé un diseño complicado y lo resolvieron perfecto. Muy recomendados"
    },
    {
        "id": 5,
        "usuario": "Luis Armendáriz",
        "estrellas": 4,
        "comentario": "Buena relación calidad-precio, la taza que pedí llegó tal cual la imaginaba"
    }
];

function generarEstrellas(cantidad) {
    const llenas = "★".repeat(cantidad);
    const vacias = "☆".repeat(5 - cantidad);
    return llenas + vacias;
}

function renderizarResenas() {
    const contenedor = document.getElementById("resenaContenedor");

    resenas.forEach(resena => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="estrellas"> ${generarEstrellas(resena.estrellas)} </div>
            <h2 class="usuario"> ${resena.usuario} </h2>
            <p class="comentario"> ${resena.comentario} </p>
        `
        contenedor.appendChild(card);
    })
}

document.addEventListener("DOMContentLoaded", renderizarResenas);