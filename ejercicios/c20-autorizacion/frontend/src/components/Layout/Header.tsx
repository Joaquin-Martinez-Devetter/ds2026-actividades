import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { usuario, logout, tieneRol } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Librería React
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Inicio
          </Nav.Link>

          <Nav.Link as={Link} to="/catalogo">
            Catálogo
          </Nav.Link>

          {tieneRol("ADMIN") && (
            <Nav.Link as={Link} to="/libros/nuevo">
              Nuevo Libro
            </Nav.Link>
          )}

          {usuario ? (
            <>
              <Navbar.Text className="me-3">
                Hola, {usuario.nombre}
              </Navbar.Text>

              <Nav.Link onClick={logout}>
                Salir
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">
              Ingresar
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;