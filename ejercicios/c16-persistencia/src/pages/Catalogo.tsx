import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import LibroCard from "../components/LibroCard";
import { useFetch } from "../hooks/useFetch";
import type { Libro } from "../types/libro";

function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>("/libros.json");

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Cargando libros...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1>Catálogo</h1>
      <p>Listado de libros disponibles.</p>

      <Row>
        {(libros ?? []).map((libro) => (
          <Col md={4} key={libro.id} className="mb-4">
            <LibroCard libro={libro} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;