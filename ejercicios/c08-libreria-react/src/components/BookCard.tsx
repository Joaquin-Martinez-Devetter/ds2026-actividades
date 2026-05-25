import { useState } from "react";

import { Card, Button } from "react-bootstrap";

type BookCardProps = {

  titulo: string;
  autor: string;
  imagen: string;
};

function BookCard({ titulo, autor, imagen }: BookCardProps) {

  const [meGusta, setMeGusta] = useState(0);

  return (

    <Card className="h-100 shadow">

      <Card.Img
        variant="top"
        src={imagen}
        style={{
          height: "350px",
          objectFit: "cover"
        }}
      />

      <Card.Body>

        <Card.Title>
          {titulo}
        </Card.Title>

        <Card.Text>
          Autor: {autor}
        </Card.Text>

        <Button
          onClick={() => setMeGusta(meGusta + 1)}
        >
          Me gusta ({meGusta})
        </Button>

      </Card.Body>

    </Card>
  );
}

export default BookCard;