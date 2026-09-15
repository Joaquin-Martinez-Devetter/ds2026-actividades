import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import categoriaRoutes from "./routes/categoria.routes";

import { errorHandler } from "./middlewares/error.middleware";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL ??
      "http://localhost:5173",
  ],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/categorias", categoriaRoutes);

app.use((_req, res) => {
  return res.status(404).json({
    error: "Ruta no encontrada",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Servidor en http://localhost:${PORT}`
  );
});