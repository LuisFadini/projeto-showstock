import { Router } from "express";
import { ComerciantesController } from "./controller.js";

const comerciantesController = new ComerciantesController();
const comerciantesRouter = Router();

comerciantesRouter.get("/:nome", comerciantesController.paginaComerciante)
comerciantesRouter.get("/produto/:id", comerciantesController.paginaProduto)

export { comerciantesRouter }