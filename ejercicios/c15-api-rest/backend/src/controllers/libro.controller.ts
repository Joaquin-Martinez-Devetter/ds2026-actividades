import type { Request, Response } from "express";
import type { Libro } from "../types/libro.types";
import * as libroService from "../services/libro.service";

export function getAll(_req: Request, res: Response) {
  const libros = libroService.findAll();

  return res.status(200).json(libros);
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const libro = libroService.findById(id);

  if (!libro) {
    return res.status(404).json({
      error: "Libro no encontrado",
    });
  }

  return res.status(200).json(libro);
}

export function create(req: Request, res: Response) {
  const datos = req.body as Omit<Libro, "id">;
  const nuevoLibro = libroService.create(datos);

  return res.status(201).json(nuevoLibro);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const datos = req.body as Omit<Libro, "id">;

  const libroActualizado = libroService.update(id, datos);

  if (!libroActualizado) {
    return res.status(404).json({
      error: "Libro no encontrado",
    });
  }

  return res.status(200).json(libroActualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const eliminado = libroService.remove(id);

  if (!eliminado) {
    return res.status(404).json({
      error: "Libro no encontrado",
    });
  }

  return res.status(204).send();
}