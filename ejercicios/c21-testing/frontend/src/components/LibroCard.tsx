
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Libro } from "../types/libro";
import "./LibroCard.css";

type LibroCardProps = {
  libro: Libro;
};

function LibroCard({ libro }: LibroCardProps) {
  const [liked, setLiked] = useState(false);

  const cambiarLike = () => {
    setLiked((anterior) => !anterior);
  };

  return (
    <Card className="h-100 shadow libro-card">
      <Card.Img
        variant="top"
        src={libro.imagen}
        alt={libro.titulo}
        style={{ height: "350px", objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{libro.titulo}</Card.Title>

        <Card.Text>
          Autor: {libro.autor.nombre} ({libro.autor.nacionalidad})
        </Card.Text>

        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className={`like-button ${liked ? "liked" : ""}`}
            onClick={cambiarLike}
            aria-label={liked ? "Quitar me gusta" : "Dar me gusta"}
            aria-pressed={liked}
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 24 24"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            <span>{liked ? 1 : 0}</span>
          </button>

          <Link
            className="btn btn-outline-primary"
            to={`/libros/${libro.id}`}
          >
            Ver más
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;
