const catalogo = [
    {
        "id": 1,
        "nombre": "Playera con Vinyl",
        "categoria": "playera",
        "descripcion": "Playera blanca personalizada con vinyl textil de la mejor calidad",
        "img": "./assets/productos/1.png"
    },
    {
        "id": 2,
        "nombre": "Combo playera + termos",
        "categoria": "combo",
        "descripcion": "Combo de playera negra y termos personalizados con DTF de la mejor resolucion",
        "img": "./assets/productos/2.png"
    },
    {
        "id": 3,
        "nombre": "Combo playera + termos",
        "categoria": "combo",
        "descripcion": "Combo de playera blanca y set de termos personalizados con DTF de la mejor resolucion",
        "img": "./assets/productos/3.png"
    },
    {
        "id": 4,
        "nombre": "Diploma personalizado",
        "categoria": "diploma",
        "descripcion": "Diploma de reconocimiento personalizado con impresion de alta calidad",
        "img": "./assets/productos/4.png"
    },
    {
        "id": 5,
        "nombre": "Set de termos con nombre",
        "categoria": "termo",
        "descripcion": "Set de termos color menta personalizados con nombre mediante DTF",
        "img": "./assets/productos/5.png"
    },
    {
        "id": 6,
        "nombre": "Set de termos personalizados",
        "categoria": "termo",
        "descripcion": "Set de termos color rosa con diseño personalizado en DTF de la mejor resolucion",
        "img": "./assets/productos/6.png"
    },
    {
        "id": 7,
        "nombre": "Parche de vinyl textil",
        "categoria": "vinyl",
        "descripcion": "Parche personalizado con vinyl textil para playeras o gorras",
        "img": "./assets/productos/7.png"
    },
    {
        "id": 8,
        "nombre": "Combo termos personalizados",
        "categoria": "combo",
        "descripcion": "Combo de termos color amarillo personalizados con diseño de Winnie Pooh en DTF",
        "img": "./assets/productos/8.png"
    },
    {
        "id": 9,
        "nombre": "Combo de playeras tipo polo bordadas",
        "categoria": "playera",
        "descripcion": "Playeras tipo polo personalizadas con nombre y logo mediante vinyl, incluye bandera mexicana en la manga",
        "img": "./assets/productos/9.png"
    },
    {
        "id": 10,
        "nombre": "Llaveros grabados en madera",
        "categoria": "llavero",
        "descripcion": "Set de llaveros de madera grabados con laser, personalizados con nombre y numero de equipo",
        "img": "./assets/productos/10.png"
    }
];

function renderizarProductos(lista) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img class="img-prod" src="${producto.img}" />
            <h2> ${producto.nombre} </h2>
            <p> ${producto.descripcion} </p>
        `;
        contenedor.appendChild(card);
    });
}

function renderizarCategorias() {
    const menu = document.getElementById("dropdown-menu");

    const categorias = ["todas", ...new Set(catalogo.map(p => p.categoria))];

    menu.innerHTML = categorias.map(cat =>
        `<li data-categoria="${cat}" class="${cat === "todas" ? "activo" : ""}">${cat}</li>`
    ).join("");
}

function filtrarPorCategoria(categoria) {
    if (categoria === "todas") {
        renderizarProductos(catalogo);
    } else {
        const filtrados = catalogo.filter(p => p.categoria === categoria);
        renderizarProductos(filtrados);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(catalogo);
    renderizarCategorias();

    const btn = document.getElementById("dropdown-btn");
    const menu = document.getElementById("dropdown-menu");

    btn.addEventListener("click", () => {
        menu.classList.toggle("abierto");
    });

    menu.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;

        menu.querySelectorAll("li").forEach(item => item.classList.remove("activo"));
        li.classList.add("activo");

        filtrarPorCategoria(li.dataset.categoria);
        menu.classList.remove("abierto");
    });

    document.addEventListener("click", (e) => {
        if (!document.getElementById("dropdown-categorias").contains(e.target)) {
            menu.classList.remove("abierto");
        }
    });
});