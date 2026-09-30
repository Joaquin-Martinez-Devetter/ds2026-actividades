import { describe, it, expect } from "vitest";
import {
  libroCreateSchema,
  idParamSchema,
} from "./libro.validations";

const libroValido = {
  titulo: "Rayuela",
  precio: 7000,
  imagen: "https://img/r.jpg",
  autorId: 1,
};

describe("libroCreateSchema", () => {
  it("rechaza precio negativo", () => {
    const resultado = libroCreateSchema.safeParse({
      ...libroValido,
      precio: -5,
    });

    expect(resultado.success).toBe(false);

    if (!resultado.success) {
      expect(resultado.error.issues[0].path).toEqual(["precio"]);
    }
  });

  it("recorta espacios del título", () => {
    const resultado = libroCreateSchema.safeParse({
      ...libroValido,
      titulo: " Rayuela ",
    });

    expect(resultado.success).toBe(true);

    if (resultado.success) {
      expect(resultado.data.titulo).toBe("Rayuela");
    }
  });
});

describe("idParamSchema", () => {
  it("convierte el id recibido como string a número", () => {
    const resultado = idParamSchema.safeParse({
      id: "42",
    });

    expect(resultado.success).toBe(true);

    if (resultado.success) {
      expect(resultado.data.id).toBe(42);
    }
  });
});