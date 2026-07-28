import express from "express";

const app = express();
const PORT = 3000;

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

const libros: Libro[] = [
  {
    id: 1,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    precio: 30000,
    imagen: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    disponible: true,
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    precio: 25000,
    imagen: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    disponible: true,
  },
  {
    id: 3,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 20000,
    imagen: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    disponible: false,
  },
];

app.get("/", (_req, res) => {
  res.json({
    mensaje: "API funcionando",
  });
});

app.get("/libros", (_req, res) => {
  res.json(libros);
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});