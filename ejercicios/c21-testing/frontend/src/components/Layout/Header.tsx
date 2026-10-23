
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header() {
  const { usuario, logout, tieneRol } = useAuth();

  return (
    <Navbar expand="lg" className="libreria-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="libreria-logo">
          📚 Mi Librería
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="menu-libreria"
          className="libreria-toggle"
        />

        <Navbar.Collapse id="menu-libreria">
          <Nav className="ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-boton ${isActive ? "activo" : ""}`
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/catalogo"
              className={({ isActive }) =>
                `nav-boton ${isActive ? "activo" : ""}`
              }
            >
              Catálogo
            </NavLink>

            {tieneRol("ADMIN") && (
              <NavLink
                to="/libros/nuevo"
                className={({ isActive }) =>
                  `nav-boton nav-boton-destacado ${
                    isActive ? "activo" : ""
                  }`
                }
              >
                + Nuevo Libro
              </NavLink>
            )}

            {usuario ? (
              <>
                <button
                  type="button"
                  className="nav-boton nav-boton-salir"
                  onClick={logout}
                >
                  Salir
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-boton nav-boton-destacado ${
                    isActive ? "activo" : ""
                  }`
                }
              >
                Ingresar
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
