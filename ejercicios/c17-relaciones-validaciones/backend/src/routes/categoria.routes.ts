import { Router } from "express";
import * as categoriaController from "../controllers/categoria.controller";

import {
  categoriaCreateSchema,
  categoriaUpdateSchema,
} from "../validations/categoria.validations";

import {
  idParamSchema,
} from "../validations/libro.validations";

import {
  validate,
  validateParams,
} from "../middlewares/validate.middleware";

const router = Router();

router.get(
  "/",
  categoriaController.getAll
);

router.get(
  "/:id",
  validateParams(idParamSchema),
  categoriaController.getById
);

router.post(
  "/",
  validate(categoriaCreateSchema),
  categoriaController.create
);

router.put(
  "/:id",
  validateParams(idParamSchema),
  validate(categoriaUpdateSchema),
  categoriaController.update
);

router.delete(
  "/:id",
  validateParams(idParamSchema),
  categoriaController.remove
);

export default router;