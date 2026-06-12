import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { Libro } from "./types/libro";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";

function App() {
  const [libros, setLibros] = useState<Libro[]>([
    {
      id: 1,
      titulo: "Harry Potter",
      autor: "J.K. Rowling",
      precio: 30000,
      disponible: true,
      imagen: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    },
    {
      id: 2,
      titulo: "1984",
      autor: "George Orwell",
      precio: 25000,
      disponible: true,
      imagen: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    },
    {
      id: 3,
      titulo: "El Principito",
      autor: "Saint Exupery",
      precio: 20000,
      disponible: true,
      imagen: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    },
  ]);

  function agregarLibro(libro: Libro) {
    setLibros([...libros, libro]);
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home libros={libros} />} />

        <Route path="/catalogo" element={<Catalogo libros={libros} />} />

        <Route
          path="/libros/:id"
          element={<LibroDetalle libros={libros} />}
        />

        <Route
          path="/libros/nuevo"
          element={<LibroNuevo onAgregar={agregarLibro} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;