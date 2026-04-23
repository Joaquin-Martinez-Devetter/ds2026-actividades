"use strict";
let catalogo = [
    {
        isbn: "ISBN-1",
        titulo: "El principito",
        autor: "Saint-Exupery",
        precio: 100,
        disponible: true,
        genero: "Ficción"
    },
    {
        isbn: "ISBN-2",
        titulo: "1984",
        autor: "Orwell",
        precio: 60,
        disponible: true,
        genero: "Distopía"
    },
    {
        isbn: "ISBN-3",
        titulo: "Harry Potter",
        autor: "Rowling",
        precio: 300,
        disponible: false,
        genero: "Fantasía"
    }
];
const lista = document.getElementById("listado");
const stats = document.getElementById("stats");
const errorForm = document.getElementById("errorForm");
const inputFiltro = document.getElementById("filtroAutor");
const btnFiltrar = document.getElementById("filtrar");
const btnDisponibles = document.getElementById("mostrarDisponibles");
const btnTodos = document.getElementById("mostrarTodos");
const inputTitulo = document.getElementById("titulo");
const inputAutor = document.getElementById("autor");
const inputPrecio = document.getElementById("precio");
const inputGenero = document.getElementById("genero");
const selectDisponible = document.getElementById("disponible");
const btnAgregar = document.getElementById("agregar");
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    let suma = 0;
    for (let i = 0; i < libros.length; i++) {
        suma += libros[i].precio;
    }
    return suma / libros.length;
}
function renderizar(libros) {
    lista.innerHTML = "";
    for (let i = 0; i < libros.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${libros[i].titulo} - ${libros[i].autor} - $${libros[i].precio} `;
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            eliminarLibro(libros[i].isbn);
        });
        li.appendChild(botonEliminar);
        lista.appendChild(li);
    }
    const promedio = precioPromedio(libros);
    stats.textContent = `${libros.length} libros | Promedio: $${promedio}`;
}
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(libro => libro.isbn !== isbn);
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const precio = Number(inputPrecio.value);
    const genero = inputGenero.value.trim();
    const disponible = selectDisponible.value === "true";
    if (titulo === "" || autor === "" || inputPrecio.value === "" || precio <= 0) {
        errorForm.textContent = "Error: completá título, autor y un precio mayor a 0.";
        return null;
    }
    const nuevoLibro = {
        isbn: "AUTO-" + Date.now(),
        titulo: titulo,
        autor: autor,
        precio: precio,
        disponible: disponible,
        genero: genero
    };
    return nuevoLibro;
}
function limpiarFormulario() {
    inputTitulo.value = "";
    inputAutor.value = "";
    inputPrecio.value = "";
    inputGenero.value = "";
    selectDisponible.value = "true";
}
btnAgregar.addEventListener("click", () => {
    const nuevoLibro = validarFormulario();
    if (nuevoLibro === null) {
        return;
    }
    errorForm.textContent = "";
    agregarLibro(nuevoLibro);
    limpiarFormulario();
});
btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(inputFiltro.value));
});
btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
renderizar(catalogo);
