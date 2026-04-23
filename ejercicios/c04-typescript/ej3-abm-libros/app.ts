interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  precio: number;
  disponible: boolean;
  genero?: string;
}

let catalogo: Libro[] = [
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

const lista = document.getElementById("listado") as HTMLUListElement;
const stats = document.getElementById("stats") as HTMLParagraphElement;
const errorForm = document.getElementById("errorForm") as HTMLDivElement;

const inputFiltro = document.getElementById("filtroAutor") as HTMLInputElement;
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;

const inputTitulo = document.getElementById("titulo") as HTMLInputElement;
const inputAutor = document.getElementById("autor") as HTMLInputElement;
const inputPrecio = document.getElementById("precio") as HTMLInputElement;
const inputGenero = document.getElementById("genero") as HTMLInputElement;
const selectDisponible = document.getElementById("disponible") as HTMLSelectElement;
const btnAgregar = document.getElementById("agregar") as HTMLButtonElement;

function buscarPorAutor(autor: string): Libro[] {
  return catalogo.filter(libro =>
    libro.autor.toLowerCase().includes(autor.toLowerCase())
  );
}

function librosDisponibles(): Libro[] {
  return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: Libro[]): number {
  if (libros.length === 0) return 0;

  let suma = 0;

  for (let i = 0; i < libros.length; i++) {
    suma += libros[i].precio;
  }

  return suma / libros.length;
}

function renderizar(libros: Libro[]): void {
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

function agregarLibro(libro: Libro): void {
  catalogo.push(libro);
  renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
  catalogo = catalogo.filter(libro => libro.isbn !== isbn);
  renderizar(catalogo);
}

function validarFormulario(): Libro | null {
  const titulo = inputTitulo.value.trim();
  const autor = inputAutor.value.trim();
  const precio = Number(inputPrecio.value);
  const genero = inputGenero.value.trim();
  const disponible = selectDisponible.value === "true";

  if (titulo === "" || autor === "" || inputPrecio.value === "" || precio <= 0) {
    errorForm.textContent = "Error: completá título, autor y un precio mayor a 0.";
    return null;
  }

  const nuevoLibro: Libro = {
    isbn: "AUTO-" + Date.now(),
    titulo: titulo,
    autor: autor,
    precio: precio,
    disponible: disponible,
    genero: genero
  };

  return nuevoLibro;
}

function limpiarFormulario(): void {
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