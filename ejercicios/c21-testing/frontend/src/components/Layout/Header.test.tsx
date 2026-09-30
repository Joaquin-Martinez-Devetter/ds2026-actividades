import {
  afterEach,
  describe,
  it,
  expect,
  vi,
} from "vitest";

import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import Header from "./Header";
import { useAuth } from "../../context/AuthContext";

vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const useAuthMock = vi.mocked(useAuth);

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Header", () => {
  it("muestra Nuevo Libro cuando el usuario es ADMIN", () => {
    useAuthMock.mockReturnValue({
      usuario: {
        id: 1,
        email: "admin@libreria.test",
        nombre: "Admin",
        rol: "ADMIN",
      },
      cargando: false,
      estaAutenticado: true,
      tieneRol: (rol) => rol === "ADMIN",
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Nuevo Libro")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Hola, Admin")
    ).toBeInTheDocument();
  });

  it("no muestra Nuevo Libro cuando el usuario es CLIENTE", () => {
    useAuthMock.mockReturnValue({
      usuario: {
        id: 2,
        email: "cliente@libreria.test",
        nombre: "Cliente",
        rol: "CLIENTE",
      },
      cargando: false,
      estaAutenticado: true,

      // El Header pregunta específicamente tieneRol("ADMIN").
      // Un CLIENTE debe responder false.
      tieneRol: () => false,

      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.queryByText("Nuevo Libro")
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Hola, Cliente")
    ).toBeInTheDocument();
  });
});