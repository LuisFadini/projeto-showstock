import type { Request, Response } from "express";
import { comerciantes } from "../comerciantes.js";

export class ComerciantesController {
  paginaComerciante(req: Request, res: Response) {
    const nome = req.params.nome;
    const comerciante = comerciantes.find((c) => c.nome === nome);

    if (!comerciante) {
      return res.status(404).send("Comerciante não encontrado");
    }

    res.render('pagina-comerciante', { comerciante });
  }

  paginaProduto(req: Request, res: Response) {
    const id = Number(req.params.id);
    const produto = comerciantes.flatMap(comerciante => comerciante.produtos).find((p) => p.id === id);

    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    res.render('pagina-produto', { produto: produto });
  }
}
