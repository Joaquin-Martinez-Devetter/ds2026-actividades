
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

function Home() {
  const { usuario, cargando, tieneRol } = useAuth();

  useEffect(() => {
    document.title = "Mi Librería | Inicio";
  }, []);

  if (cargando) {
    return (
      <Container className="my-5 text-center">
        Cargando...
      </Container>
    );
  }

  return (
    <Container className="home-container">
      <section className="home-bienvenida">
        <div className="home-icono">
          {tieneRol("ADMIN")
            ? "👑"
            : usuario
              ? "📖"
              : "📚"}
        </div>

        {tieneRol("ADMIN") ? (
          <>
            <h1>¡Bienvenido, administrador!</h1>
            <p>
              Desde acá podés gestionar los libros de
              nuestra librería y explorar el catálogo.
            </p>
          </>
        ) : usuario ? (
          <>
            <h1>¡Bienvenido, {usuario.nombre}!</h1>
            <p>
              Tu próxima gran lectura te está esperando.
              Explorá nuestro catálogo y descubrí nuevos libros.
            </p>
          </>
        ) : (
          <>
            <h1>¡Bienvenido a Mi Librería!</h1>
            <p>
              Un espacio para descubrir historias,
              explorar libros y encontrar tu próxima lectura.
            </p>
          </>
        )}

        <div className="home-acciones">
          <Link to="/catalogo" className="home-boton">
            📚 Explorar catálogo
          </Link>

          {tieneRol("ADMIN") && (
            <Link
              to="/libros/nuevo"
              className="home-boton home-boton-secundario"
            >
              + Agregar libro
            </Link>
          )}

          {!usuario && (
            <Link
              to="/login"
              className="home-boton home-boton-secundario"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </section>

      <section className="home-mensaje">
        <h2>
          {tieneRol("ADMIN")
            ? "Tu librería, bajo control ✨"
            : "Cada libro es una nueva aventura ✨"}
        </h2>

        <p>
          {tieneRol("ADMIN")
            ? "Administrá el catálogo y mantené los libros actualizados."
            : "Encontrá historias increíbles y disfrutá de la lectura."}
        </p>
      </section>
    </Container>
  );
}

export default Home;
