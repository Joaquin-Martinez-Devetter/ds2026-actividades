import {
  describe,
  it,
  expect,
} from "vitest";

import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../app";
import {
  JWT_SECRET,
} from "../config/env";

describe("Permisos de libros", () => {
  it("devuelve 401 al crear un libro sin autenticación", async () => {
    const response = await request(app)
      .post("/api/libros")
      .send({
        titulo: "Libro de prueba",
        precio: 1000,
        imagen: "prueba.jpg",
        autorId: 1,
      });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      error: "Falta el token",
    });
  });

  it("devuelve 403 cuando un CLIENTE intenta crear un libro", async () => {
    const token = jwt.sign(
      {
        id: 2,
        rol: "CLIENTE",
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const response = await request(app)
      .post("/api/libros")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        titulo: "Libro de prueba",
        precio: 1000,
        imagen: "prueba.jpg",
        autorId: 1,
      });

    expect(response.status).toBe(403);

    expect(response.body).toEqual({
      error:
        "No tenés permiso para esta operación",
    });
  });
});