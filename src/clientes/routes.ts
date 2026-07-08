import { Router } from "express";
import { ClientesController } from "./controller.js";

export function createClientesRoutes(controller: ClientesController) {
  const router = Router();

  router.get("/", controller.produtos);

  return router;
}
