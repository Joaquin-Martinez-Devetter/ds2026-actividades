import type { Libro } from "../types/libro.types";

let libros: Libro[] = [
  {
    id: 1,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J. K. Rowling",
    precio: 30000,
    imagen:
      "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    disponible: true,
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    precio: 25000,
    imagen:
      "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    disponible: true,
  },
  {
    id: 3,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 20000,
    imagen:
      "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    disponible: false,
  },
];

let proximoId = 4;

export function findAll(): Libro[] {
  return libros;
}

export function findById(id: number): Libro | undefined {
  return libros.find((libro) => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevoLibro: Libro = {
    id: proximoId++,
    ...datos,
  };

  libros.push(nuevoLibro);

  return nuevoLibro;
}

export function update(
  id: number,
  datos: Omit<Libro, "id">,
): Libro | undefined {
  const indice = libros.findIndex((libro) => libro.id === id);

  if (indice === -1) {
    return undefined;
  }

  const libroActualizado: Libro = {
    id,
    ...datos,
  };

  libros[indice] = libroActualizado;

  return libroActualizado;
}

export function remove(id: number): boolean {
  const indice = libros.findIndex((libro) => libro.id === id);

  if (indice === -1) {
    return false;
  }

  libros.splice(indice, 1);

  return true;
}