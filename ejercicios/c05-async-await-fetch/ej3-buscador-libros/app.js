"use strict";
const inputBusqueda = document.getElementById("busqueda");
const botonBuscar = document.getElementById("buscar");
const resultados = document.getElementById("resultados");
const error = document.getElementById("error");
const cargando = document.getElementById("cargando");
async function buscarLibros(texto) {
    const respuesta = await fetch(`https://openlibrary.org/search.json?q=${texto}`);
    if (!respuesta.ok) {
        throw new Error("Error al buscar libros");
    }
    const datos = await respuesta.json();
    return datos.docs;
}
function renderizarLibros(libros) {
    resultados.innerHTML = "";
    for (let i = 0; i < libros.length && i < 10; i++) {
        const tarjeta = document.createElement("div");
        const autor = libros[i].author_name ? libros[i].author_name[0] : "Autor desconocido";
        const anio = libros[i].first_publish_year ? libros[i].first_publish_year : "Año desconocido";
        tarjeta.innerHTML = `
      <h3>${libros[i].title}</h3>
      <p>Autor: ${autor}</p>
      <p>Año: ${anio}</p>
    `;
        resultados.appendChild(tarjeta);
    }
}
botonBuscar.addEventListener("click", async () => {
    const texto = inputBusqueda.value.trim();
    if (texto === "") {
        error.textContent = "Error: ingresá un texto para buscar.";
        resultados.innerHTML = "";
        return;
    }
    try {
        error.textContent = "";
        cargando.textContent = "Cargando...";
        resultados.innerHTML = "";
        const libros = await buscarLibros(texto);
        cargando.textContent = "";
        renderizarLibros(libros);
    }
    catch (e) {
        cargando.textContent = "";
        error.textContent = "Ocurrió un error al buscar los libros.";
    }
});
