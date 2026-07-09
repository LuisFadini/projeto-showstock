import { Router } from "express";
import { ComerciantesController } from "./controller.js";

export function createComerciantesRoutes(controller: ComerciantesController) {
  const router = Router();

  router.get("/:id", controller.paginaComerciante)
  router.get("/categoria/:categoria", controller.paginaCategoria)
  router.get("/produto/:id", controller.paginaProduto)
  
  return router
}