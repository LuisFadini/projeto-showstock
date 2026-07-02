import { Router } from "express";
import { VendedoresController } from "./controller.js";

const vendedoresController = new VendedoresController();
const vendedoresRouter = Router();

vendedoresRouter.get("/", vendedoresController.paginaVendedor)
vendedoresRouter.get("/add-produto", vendedoresController.paginaAddProduto)

export {vendedoresRouter} 