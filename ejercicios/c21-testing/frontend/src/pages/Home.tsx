import { useEffect } from "react";
import { Container } from "react-bootstrap";

function Home() {
  useEffect(() => {
    document.title = "Librería React";
  }, []);

  return (
    <>
      <section className="bg-light text-center p-5">
        <h1>Bienvenido a la Librería</h1>
        <p>Explorá libros destacados y descubrí nuevas lecturas.</p>
      </section>

      <Container className="my-5">
        <h2 className="text-center">
          Usá el catálogo para ver los libros disponibles
        </h2>
      </Container>
    </>
  );
}

export default Home;
