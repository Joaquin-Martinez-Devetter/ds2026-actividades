import bcrypt from "bcrypt";

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

const usuarios = [
  {
    email: "admin@libreria.test",
    nombre: "Admin",
    rol: "ADMIN" as const,
    password: "Admin1234",
  },
  {
    email: "cliente@libreria.test",
    nombre: "Cliente",
    rol: "CLIENTE" as const,
    password: "Cliente1234",
  },
];

async function main() {
  // AUTORES
  for (const autor of autores) {
    await prisma.autor.upsert({
      where: {
        nombre: autor.nombre,
      },
      update: {},
      create: autor,
    });
  }

  // CATEGORÍAS
  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: {
        nombre: categoria.nombre,
      },
      update: {},
      create: categoria,
    });
  }

  // LIBROS
  for (const { autor, cats, ...datos } of libros) {
    const existente = await prisma.libro.findFirst({
      where: {
        titulo: datos.titulo,
      },
    });

    if (!existente) {
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

  // USUARIOS
  for (const { password, ...datos } of usuarios) {
    await prisma.usuario.upsert({
      where: {
        email: datos.email,
      },

      update: {},

      create: {
        ...datos,
        passwordHash: await bcrypt.hash(password, 10),
      },
    });
  }
}

main();