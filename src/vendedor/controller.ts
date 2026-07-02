import type { Request, Response } from "express";
import { comerciantes } from "../comerciantes.js";

export class VendedoresController {
  paginaVendedor(req: Request, res: Response) {
    const comerciante = comerciantes[0];

    if (!comerciante) {
      return res.status(404).send("Comerciante não encontrado");
    }

    res.render('vendedor', { produtos: comerciante.produtos });
  }

  paginaAddProduto(req: Request, res: Response) {
    res.render('add-produto');
  }
}
