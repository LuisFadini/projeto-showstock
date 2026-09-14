import { Router } from "express";
import type { AuthController } from "./controller.js";

export function createAuthRoutes(controller: AuthController) {
  const router = Router();

  router.post("/login", controller.login);
  router.post("/cliente/cadastro", controller.cadastrarCliente);
  router.post("/vendedor/cadastro", controller.cadastrarVendedor);
  router.delete("/", controller.logout);

  return router;
}
