import { prisma } from "../src/config/prisma";

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

const categorias = [
  {
    nombre: "Novela",
  },
  {
    nombre: "Fantasía",
  },
  {
    nombre: "Clásico",
  },
];

const libros = [
  {
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J. K. Rowling",
    precio: 30000,
    imagen:
      "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    disponible: true,
    cats: ["Novela", "Fantasía"],
  },
  {
    titulo: "1984",
    autor: "George Orwell",
    precio: 25000,
    imagen:
      "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    disponible: true,
    cats: ["Novela", "Clásico"],
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 20000,
    imagen:
      "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    disponible: false,
    cats: ["Novela", "Clásico"],
  },
];

async function main() {
  await prisma.autor.createMany({
    data: autores,
  });

  await prisma.categoria.createMany({
    data: categorias,
  });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,

        autor: {
          connect: {
            nombre: autor,
          },
        },

        categorias: {
          connect: cats.map((nombre) => ({
            nombre,
          })),
        },
      },
    });
  }
}

main();