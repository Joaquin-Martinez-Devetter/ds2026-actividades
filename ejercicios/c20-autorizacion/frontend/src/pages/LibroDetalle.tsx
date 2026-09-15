import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import type { Libro } from "../types/libro";

function LibroDetalle() {
  const { id } = useParams();

  const {
    data: libro,
    loading,
    error,
  } = useFetch<Libro>(`/libros/${id}`);

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

          <h4>
            {libro.autor.nombre}
          </h4>

          <p>
            Nacionalidad del autor:{" "}
            {libro.autor.nacionalidad}
          </p>

          <p>
            Estado:{" "}
            {libro.disponible
              ? "Disponible"
              : "No disponible"}
          </p>

          <p>
            Precio: ${libro.precio}
          </p>
          <Link
             to="/catalogo"
            className="btn btn-primary"
          >
  Volver
</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default LibroDetalle;