import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { libros } from "../data/libros";

function LibroDetalle() {
  const { id } = useParams();

  const libro = libros.find((libro) => libro.id === Number(id));

  if (!libro) {
    return (
      <Container className="my-5">
        <h1>Libro no encontrado</h1>
        <Link to="/catalogo">Volver al catálogo</Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={4}>
          <img
            src={libro.imagen}
            alt={libro.titulo}
            className="img-fluid rounded shadow"
          />
        </Col>

        <Col md={8}>
          <h1>{libro.titulo}</h1>
          <h4 className="text-muted">{libro.autor}</h4>
          <p className="lead mt-3">{libro.descripcion}</p>

          <Button as={Link as any} to="/catalogo" variant="secondary">
            Volver al catálogo
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LibroDetalle;