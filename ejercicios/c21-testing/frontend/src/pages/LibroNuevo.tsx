import {
  useState,
  type FormEvent,
} from "react";

import {
  Form,
  Button,
  Container,
  Alert,
  Spinner,
} from "react-bootstrap";

import {
  useNavigate,
} from "react-router-dom";

import {
  apiFetch,
} from "../services/api";

import {
  useFetch,
} from "../hooks/useFetch";

import type {
  Autor,
} from "../types/libro";

function LibroNuevo() {
  const navigate = useNavigate();

  const {
    data: autores,
    loading: cargandoAutores,
    error: errorAutores,
  } = useFetch<Autor[]>("/autores");

  const [titulo, setTitulo] =
    useState("");

  const [autorId, setAutorId] =
    useState("");

  const [precio, setPrecio] =
    useState("");

  const [imagen, setImagen] =
    useState("");

  const [
    disponible,
    setDisponible,
  ] = useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [enviando, setEnviando] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    if (!titulo.trim()) {
      setError(
        "El título es obligatorio"
      );
      return;
    }

    if (!autorId) {
      setError(
        "Debe seleccionar un autor"
      );
      return;
    }

    const precioNumero =
      Number(precio);

    if (
      !Number.isInteger(
        precioNumero
      ) ||
      precioNumero <= 0
    ) {
      setError(
        "El precio debe ser un entero mayor a 0"
      );
      return;
    }

    if (!imagen.trim()) {
      setError(
        "La imagen es obligatoria"
      );
      return;
    }

    try {
      setEnviando(true);

      await apiFetch("/libros", {
        method: "POST",

        body: JSON.stringify({
          titulo: titulo.trim(),
          autorId: Number(autorId),
          precio: precioNumero,
          imagen: imagen.trim(),
          disponible,
        }),
      });

      navigate("/catalogo");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Error al crear el libro"
      );
    } finally {
      setEnviando(false);
    }
  }

  if (cargandoAutores) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />

        <p className="mt-3">
          Cargando autores...
        </p>
      </Container>
    );
  }

  return (
    <Container
      className="my-5"
      style={{ maxWidth: "500px" }}
    >
      <h2>Nuevo Libro</h2>

      {errorAutores && (
        <Alert variant="danger">
          {errorAutores}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            Título
          </Form.Label>

          <Form.Control
            type="text"
            value={titulo}
            onChange={(e) =>
              setTitulo(e.target.value)
            }
            placeholder="Título del libro"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Autor
          </Form.Label>

          <Form.Select
            value={autorId}
            onChange={(e) =>
              setAutorId(e.target.value)
            }
          >
            <option value="">
              Seleccione un autor
            </option>

            {(autores ?? []).map(
              (autor) => (
                <option
                  key={autor.id}
                  value={autor.id}
                >
                  {autor.nombre}
                </option>
              )
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Precio
          </Form.Label>

          <Form.Control
            type="number"
            min="1"
            step="1"
            value={precio}
            onChange={(e) =>
              setPrecio(e.target.value)
            }
            placeholder="Precio"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Imagen
          </Form.Label>

          <Form.Control
            type="text"
            value={imagen}
            onChange={(e) =>
              setImagen(e.target.value)
            }
            placeholder="URL de la imagen"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Disponible"
            checked={disponible}
            onChange={(e) =>
              setDisponible(
                e.target.checked
              )
            }
          />
        </Form.Group>

        <Button
          type="submit"
          disabled={
            enviando ||
            Boolean(errorAutores)
          }
        >
          {enviando
            ? "Guardando..."
            : "Agregar libro"}
        </Button>
      </Form>
    </Container>
  );
}

export default LibroNuevo;