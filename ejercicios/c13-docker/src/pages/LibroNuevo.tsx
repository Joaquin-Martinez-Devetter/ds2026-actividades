import { Form, Button, Container, Alert } from "react-bootstrap";

function LibroNuevo() {
  return (
    <Container className="my-5" style={{ maxWidth: "500px" }}>
      <h2>Nuevo Libro</h2>

      <Alert variant="info">
        En esta clase el catálogo se carga desde un mock JSON. Para guardar libros de verdad haría falta backend.
      </Alert>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control disabled placeholder="Título del libro" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control disabled placeholder="Autor" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control disabled placeholder="Precio" />
        </Form.Group>

        <Button disabled>Agregar libro</Button>
      </Form>
    </Container>
  );
}

export default LibroNuevo;