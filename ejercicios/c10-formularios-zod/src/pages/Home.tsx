import { Container, Row, Col } from "react-bootstrap";
import LibroCard from "../components/LibroCard";
import type { Libro } from "../types/libro";

type Props = {
  libros: Libro[];
};

function Home({ libros }: Props) {
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
            <Col md={4} key={libro.id} className="mb-4">
              <LibroCard libro={libro} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;