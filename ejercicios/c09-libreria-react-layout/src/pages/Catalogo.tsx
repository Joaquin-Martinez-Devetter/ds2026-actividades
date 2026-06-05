import { Container, Row, Col } from "react-bootstrap";
import LibroCard from "../components/LibroCard";
import { libros } from "../data/libros";

function Catalogo() {
  return (
    <Container className="my-5">
      <h1>Catálogo</h1>
      <p>Listado de libros disponibles.</p>

      <Row>
        {libros.map((libro) => (
          <Col md={4} key={libro.id} className="mb-4">
            <LibroCard libro={libro} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;