import { Router } from "express";
import { VendedoresController } from "./controller.js";

const vendedoresController = new VendedoresController();
const vendedoresRouter = Router();

vendedoresRouter.get("/:nome", vendedoresController.paginaVendedor);
vendedoresRouter.get("/:nome/add-produto", vendedoresController.paginaAddProduto);
vendedoresRouter.post("/:nome/add-produto", vendedoresController.addProduto);

export { vendedoresRouter };
