import { Router } from "express";
import { ClientesController } from "./controller.js";

const clientesController = new ClientesController();
const clientesRouter = Router();

clientesRouter.get("/", clientesController.produtos)

export { clientesRouter }