import { Router } from "express";
import { VendedoresController } from "./controller.js";

export function createVendedoresRoutes(controller: VendedoresController) {
  const router = Router();

  router.get("/", controller.paginaVendedor);

  router.get("/produtos/novo", controller.paginaAddProduto);
  router.get("/produtos/categorias", controller.getCategorias);
  router.post("/produtos", controller.addProduto);

  router.get("/produtos/listar", controller.paginaListar);

  router.get("/produtos/:produto_id/editar", controller.paginaEditarProduto);
  router.put("/produtos/:produto_id", controller.editarProduto);
  router.delete("/produtos/:produto_id", controller.deletarProduto);

  return router;
}

