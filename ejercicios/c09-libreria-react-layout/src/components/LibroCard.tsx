import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Libro } from "../types/libro";

type LibroCardProps = {
  libro: Libro;
};

function LibroCard({ libro }: LibroCardProps) {
  const [meGusta, setMeGusta] = useState(0);

  return (
    <Card className="h-100 shadow">
      <Card.Img
        variant="top"
        src={libro.imagen}
        style={{ height: "350px", objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{libro.titulo}</Card.Title>
        <Card.Text>Autor: {libro.autor}</Card.Text>

        <Button onClick={() => setMeGusta(meGusta + 1)}>
          Me gusta ({meGusta})
        </Button>

        <Link className="btn btn-outline-primary ms-2" to={`/libros/${libro.id}`}>
          Ver más
        </Link>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;