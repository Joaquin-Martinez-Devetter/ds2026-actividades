import { prisma } from "../src/config/prisma";

const libros = [
  {
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J. K. Rowling",
    precio: 30000,
    imagen: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    disponible: true,
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    precio: 25000,
    imagen: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    disponible: true,
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 20000,
    imagen: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    disponible: false,
  },
];

const autores = [
  {
    nombre: "J. K. Rowling",
    nacionalidad: "Británica",
  },
  {
    nombre: "George Orwell",
    nacionalidad: "Británica",
  },
  {
    nombre: "Antoine de Saint-Exupéry",
    nacionalidad: "Francesa",
  },
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();