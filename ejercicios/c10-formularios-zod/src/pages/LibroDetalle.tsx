import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import type { Libro } from "../types/libro";

type Props = {
  libros: Libro[];
};

function LibroDetalle({ libros }: Props) {
  const { id } = useParams();

  const libro = libros.find(
    (libro) => libro.id === Number(id)
  );

  if (!libro) {
    return (
      <Container className="my-5">
        <h1>Libro no encontrado</h1>

        <Link to="/catalogo">
          Volver al catálogo
        </Link>
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

          <p>Precio: ${libro.precio}</p>

          <p>
            Disponible:
            {libro.disponible ? " Sí" : " No"}
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