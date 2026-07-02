import type { Request, Response } from "express";
import { comerciantes } from "../comerciantes.js";

export class ClientesController {
  produtos(req: Request, res: Response) {
    res.render("cliente", { comerciantes })
  }
}