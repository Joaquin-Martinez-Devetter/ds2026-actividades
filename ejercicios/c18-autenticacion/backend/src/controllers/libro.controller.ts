import type {
  Request,
  Response,
} from "express";

import * as libroService from "../services/libro.service";

export async function getAll(
  req: Request,
  res: Response
) {
  const disponibleParam =
    req.query.disponible;

  let disponible:
    | boolean
    | undefined;

  if (disponibleParam === "true") {
    disponible = true;
  } else if (
    disponibleParam === "false"
  ) {
    disponible = false;
  }

  const libros =
    await libroService.findAll(disponible);

  return res.status(200).json(libros);
}

export async function getById(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const libro =
    await libroService.findById(id);

  if (!libro) {
    return res.status(404).json({
      error: "Libro no encontrado",
    });
  }

  return res.status(200).json(libro);
}

export async function create(
  req: Request,
  res: Response
) {
  const nuevoLibro =
    await libroService.create(req.body);

  return res
    .status(201)
    .json(nuevoLibro);
}

export async function update(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const libroActualizado =
    await libroService.update(
      id,
      req.body
    );

  return res
    .status(200)
    .json(libroActualizado);
}

export async function remove(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  await libroService.remove(id);

  return res.status(204).send();
}