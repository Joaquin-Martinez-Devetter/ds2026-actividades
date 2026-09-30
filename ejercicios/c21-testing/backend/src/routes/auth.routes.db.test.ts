// Estos tests requieren la base de datos de Docker levantada
// y los usuarios del seed cargados.

import {
  describe,
  it,
  expect,
  afterAll,
} from "vitest";

import request from "supertest";

import app from "../app";
import { prisma } from "../config/prisma";

describe("POST /api/auth/login - integración con DB", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("devuelve 200 y un token con credenciales válidas", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "cliente@libreria.test",
        password: "Cliente1234",
      });

    expect(response.status).toBe(200);

    expect(response.body.token).toEqual(
      expect.any(String)
    );

    expect(response.body.usuario).toMatchObject({
      email: "cliente@libreria.test",
      nombre: "Cliente",
      rol: "CLIENTE",
    });

    expect(
      response.body.usuario
    ).not.toHaveProperty("passwordHash");
  });

  it("devuelve 401 con credenciales inválidas", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nadie@libreria.test",
        password: "Cliente1234",
      });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      error: "Credenciales inválidas",
    });
  });
});