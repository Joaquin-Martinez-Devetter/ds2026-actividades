"use strict";
const catalogo = [
    { titulo: "El pricipito", autor: "Saint-Exupery", precio: 100, disponible: true },
    { titulo: "1984", autor: "Orwell", precio: 60, disponible: true },
    { titulo: "El Club De Las 5 De La Mañana", autor: "Sharma", precio: 150, disponible: true },
    { titulo: "Harry Potter", autor: "Rowling", precio: 300, disponible: false }
];
//para buscar el libro por el autor
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}
//para ver los libros que tienen la disponibilidad true
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
//para sacar el promedio
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    let suma = 0;
    for (let i = 0; i < libros.length; i++) {
        suma += libros[i].precio;
    }
    return suma / libros.length;
}
//para renderizar
const lista = document.getElementById("listado");
const stats = document.getElementById("stats");
function renderizar(libros) {
    //innerHTML borra el contenido del ul
    lista.innerHTML = "";
    //para recorrer todos los libros de la lista
    for (let i = 0; i < libros.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${libros[i].titulo} - ${libros[i].autor} ($${libros[i].precio})`;
        lista.appendChild(li);
    }
    //llamo a la funcion promedio
    const promedio = precioPromedio(libros);
    stats.textContent = `${libros.length} libros | Promedio: $${promedio}`;
}
//Botoness
const input = document.getElementById("filtroAutor");
const btnFiltrar = document.getElementById("filtrar");
const btnDisponibles = document.getElementById("mostrarDisponibles");
const btnTodos = document.getElementById("mostrarTodos");
//botón 1
btnFiltrar.addEventListener("click", () => {
    const texto = input.value;
    const resultado = buscarPorAutor(texto);
    renderizar(resultado);
});
//botón 2
btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
//botón 3
btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});
renderizar(catalogo);
