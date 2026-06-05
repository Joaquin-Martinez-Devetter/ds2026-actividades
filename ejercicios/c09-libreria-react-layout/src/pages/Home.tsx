import { Container, Row, Col } from "react-bootstrap";
import LibroCard from "../components/LibroCard";
import type { Libro } from "../types/libro";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    imagen: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    imagen: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  },
  {
    id: 3,
    titulo: "El Principito",
    autor: "Saint-Exupéry",
    imagen: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
  },
];

function Home() {
  return (
    <>
      <section className="bg-light text-center p-5">
        <h1>Bienvenido a la Librería</h1>
        <p>Explorá libros destacados y descubrí nuevas lecturas.</p>
      </section>

      <Container className="my-5">
        <h2 className="text-center mb-4">Libros destacados</h2>

        <Row>
          {libros.map((libro) => (
            <Col md={4} key={libro.id}>
              <LibroCard libro={libro} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;