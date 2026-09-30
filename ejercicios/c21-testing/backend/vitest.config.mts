import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests",
      DATABASE_URL:
        "postgresql://postgres:tu_password_segura@db:5432/libreria_db",
    },
  },
});