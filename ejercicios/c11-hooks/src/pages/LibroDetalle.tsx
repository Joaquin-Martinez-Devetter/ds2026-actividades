import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

import { useFetch } from "../hooks/useFetch";
import type { Libro } from "../types/libro";

function LibroDetalle() {
  const { id } = useParams();

  const {
    data: libros,
    loading,
    error,
  } = useFetch<Libro[]>("/libros.json");

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  const libro = libros?.find(
    (libro) => libro.id === Number(id)
  );

  if (!libro) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          Libro no encontrado
        </Alert>
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

          <h4>{libro.autor}</h4>

          <p>{libro.descripcion}</p>

          <p>
            Precio: ${libro.precio}
          </p>

          <Button
            as={Link as any}
            to="/catalogo"
          >
            Volver
          </Button>
        </Col>

      </Row>
    </Container>
  );
}

export default LibroDetalle;