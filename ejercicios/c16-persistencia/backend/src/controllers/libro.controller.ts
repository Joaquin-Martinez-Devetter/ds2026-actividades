import type { Request, Response } from "express";
import type { Libro } from "../types/libro.types";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  try {
    const disponibleParam = req.query.disponible;

    let disponible: boolean | undefined;

    if (disponibleParam === "true") {
      disponible = true;
    } else if (disponibleParam === "false") {
      disponible = false;
    }

    const libros = await libroService.findAll(disponible);

    return res.status(200).json(libros);
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const libro = await libroService.findById(id);

    if (!libro) {
      return res.status(404).json({
        error: "Libro no encontrado",
      });
    }

    return res.status(200).json(libro);
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const datos = req.body as Omit<Libro, "id">;

    const nuevoLibro = await libroService.create(datos);

    return res.status(201).json(nuevoLibro);
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const datos = req.body as Omit<Libro, "id">;

    const libroActualizado = await libroService.update(id, datos);

    if (!libroActualizado) {
      return res.status(404).json({
        error: "Libro no encontrado",
      });
    }

    return res.status(200).json(libroActualizado);
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const eliminado = await libroService.remove(id);

    if (!eliminado) {
      return res.status(404).json({
        error: "Libro no encontrado",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}