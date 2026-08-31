import type { Libro } from "../types/libro";

export const libros: Libro[] = [
  {
    id: 1,
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    imagen: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    descripcion: "Harry Potter descubre que es un mago y comienza su aventura en Hogwarts.",
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    imagen: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    descripcion: "Una sociedad controlada por un régimen totalitario y vigilada por el Gran Hermano.",
  },
  {
    id: 3,
    titulo: "El Principito",
    autor: "Saint-Exupéry",
    imagen: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    descripcion: "Un pequeño príncipe viaja por planetas descubriendo enseñanzas sobre la amistad y el amor.",
  },
];