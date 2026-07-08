import type { Request, Response } from "express";
import { comerciantes } from "../comerciantes.js";
import type { ProdutoRepository } from "../database/repositories/produto-repository.js";
import type { ComercianteRepository } from "../database/repositories/comerciante-repository.js";

export class ComerciantesController {
  constructor(
    private readonly comercianteRepository: ComercianteRepository,
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  paginaComerciante = (req: Request, res: Response) => {
    const comerciante = this.comercianteRepository.buscarPorId(
      Number(req.params.id),
    );

    if (!comerciante) {
      return res.status(404).send("Comerciante não encontrado");
    }

    res.render("pagina-comerciante", { comerciante });
  };

  paginaProduto = (req: Request, res: Response) => {
    const produto = this.produtoRepository.buscarPorId(Number(req.params.id));

    if (!produto) {
      return res.status(404).send("Produto não encontrado");
    }

    res.render("pagina-produto", { produto: produto });
  };
}

