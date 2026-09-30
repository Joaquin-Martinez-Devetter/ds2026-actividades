import {
  useState,
  type FormEvent,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Container,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import {
  loginSchema,
} from "../schemas/loginSchema";

import {
  useAuth,
} from "../context/AuthContext";

function Login() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [enviando, setEnviando] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError(null);

    const resultado =
      loginSchema.safeParse({
        email,
        password,
      });

    if (!resultado.success) {
      setError(
        resultado.error.issues[0]
          ?.message ??
          "Datos inválidos"
      );
      return;
    }

    try {
      setEnviando(true);

      await login(
        resultado.data
      );

      navigate(
        "/catalogo"
      );
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
      style={{
        maxWidth: "500px",
      }}
    >
      <h2>
        Iniciar sesión
      </h2>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <Form
        onSubmit={
          handleSubmit
        }
      >
        <Form.Group className="mb-3">
          <Form.Label>
            Correo electrónico
          </Form.Label>

          <Form.Control
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
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
              setPassword(
                e.target.value
              )
            }
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