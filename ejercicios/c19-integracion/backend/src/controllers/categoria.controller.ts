import type {
  Request,
  Response,
} from "express";

import * as categoriaService from "../services/categoria.service";

export async function getAll(
  _req: Request,
  res: Response
) {
  const categorias =
    await categoriaService.findAll();

  return res
    .status(200)
    .json(categorias);
}

export async function getById(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const categoria =
    await categoriaService.findById(id);

  if (!categoria) {
    return res.status(404).json({
      error: "Categoría no encontrada",
    });
  }

  return res
    .status(200)
    .json(categoria);
}

export async function create(
  req: Request,
  res: Response
) {
  const nuevaCategoria =
    await categoriaService.create(
      req.body
    );

  return res
    .status(201)
    .json(nuevaCategoria);
}

export async function update(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  const categoria =
    await categoriaService.update(
      id,
      req.body
    );

  return res.status(200).json(categoria);
}

export async function remove(
  req: Request,
  res: Response
) {
  const id = Number(req.params.id);

  await categoriaService.remove(id);

  return res.status(204).send();
}