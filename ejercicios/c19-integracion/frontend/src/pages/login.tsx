import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import { apiFetch } from "../services/api";
import { guardarToken } from "../services/sesion";
import { loginSchema } from "../schemas/loginSchema";
import type { Sesion } from "../types/sesion";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const resultado = loginSchema.safeParse({
      email,
      password,
    });

    if (!resultado.success) {
      setError(
        resultado.error.issues[0]?.message ??
          "Datos inválidos"
      );
      return;
    }

    try {
      setEnviando(true);

      const sesion = await apiFetch<Sesion>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(resultado.data),
        }
      );

      guardarToken(sesion.token);

      navigate("/catalogo");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Error al iniciar sesión"
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Container
      className="my-5"
      style={{ maxWidth: "500px" }}
    >
      <h2>Iniciar sesión</h2>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>

          <Form.Control
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="usuario@libreria.test"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Contraseña
          </Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Contraseña"
          />
        </Form.Group>

        <Button
          type="submit"
          disabled={enviando}
        >
          {enviando
            ? "Ingresando..."
            : "Ingresar"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;