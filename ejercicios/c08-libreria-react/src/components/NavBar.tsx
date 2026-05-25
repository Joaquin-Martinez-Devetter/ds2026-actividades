import { Navbar, Container, Nav } from "react-bootstrap";

function NavBar() {

  return (

    <Navbar bg="dark" variant="dark" expand="lg">

      <Container>

        <Navbar.Brand>
          Librería React
        </Navbar.Brand>

        <Nav className="ms-auto">

          <Nav.Link>Inicio</Nav.Link>

          <Nav.Link>Catálogo</Nav.Link>

          <Nav.Link>Contacto</Nav.Link>

        </Nav>

      </Container>

    </Navbar>
  );
}

export default NavBar;