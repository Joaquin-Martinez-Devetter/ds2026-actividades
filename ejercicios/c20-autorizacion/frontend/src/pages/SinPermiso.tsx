import {
  Alert,
  Container,
} from "react-bootstrap";

import {
  Link,
} from "react-router-dom";

export function SinPermiso() {
  return (
    <Container className="my-5">
      <Alert variant="warning">
        <Alert.Heading>
          Sin permiso
        </Alert.Heading>

        <p>
          No tenés permiso para acceder a esta página.
        </p>

        <Link
          to="/catalogo"
          className="btn btn-primary"
        >
          Volver al catálogo
        </Link>
      </Alert>
    </Container>
  );
}