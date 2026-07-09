import { Router } from "express";
import { ClientesController } from "./controller.js";

export function createClientesRoutes(controller: ClientesController) {
  const router = Router();

  router.get("/", controller.paginaProdutos);
  router.get("/carrinho", controller.paginaCarrinho);
  router.get("/conta", controller.paginaConta);

  return router;
}
