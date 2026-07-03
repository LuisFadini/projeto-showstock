import { Router } from "express";
import { VendedoresController } from "./controller.js";

const vendedoresController = new VendedoresController();
const vendedoresRouter = Router();

vendedoresRouter.get("/:nome", vendedoresController.paginaVendedor);

vendedoresRouter.get(
  "/:nome/produtos/novo",
  vendedoresController.paginaAddProduto,
);
vendedoresRouter.post("/:nome/produtos", vendedoresController.addProduto);

vendedoresRouter.get(
  "/:nome/produtos/listar",
  vendedoresController.paginaListar,
);

vendedoresRouter.get(
  "/:nome/produtos/:id/editar",
  vendedoresController.paginaEditarProduto,
);
vendedoresRouter.put("/:nome/produtos/:id", vendedoresController.editarProduto);
vendedoresRouter.delete("/:nome/produtos/:id", vendedoresController.deletarProduto);

export { vendedoresRouter };

