import { Router } from "express";
import { VendedoresController } from "./controller.js";

export function createVendedoresRoutes(controller: VendedoresController) {
  const router = Router();

  router.post("/login", controller.login);

  router.get("/:vendedor_id", controller.paginaVendedor);

  router.get("/:vendedor_id/produtos/novo", controller.paginaAddProduto);
  router.post("/:vendedor_id/produtos", controller.addProduto);

  router.get("/:vendedor_id/produtos/listar", controller.paginaListar);

  router.get("/:vendedor_id/produtos/:produto_id/editar", controller.paginaEditarProduto);
  router.put("/:vendedor_id/produtos/:produto_id", controller.editarProduto);
  router.delete("/:vendedor_id/produtos/:produto_id", controller.deletarProduto);

  return router;
}

