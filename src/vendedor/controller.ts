import type { Request, Response } from "express";
import type { NomeParams, ProdutoParams } from "./types.js";
import type { ComercianteRepository } from "../database/repositories/comerciante-repository.js";
import type { ProdutoRepository } from "../database/repositories/produto-repository.js";

export class VendedoresController {
  constructor(
    private readonly comercianteRepository: ComercianteRepository,
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  private getComerciante(req: Request<NomeParams>, res: Response) {
    const vendedorId = Number(req.params.vendedor_id);

    if (Number.isNaN(vendedorId)) {
      res.status(400).send("ID do vendedor inválido");
      return null;
    }

    const comerciante = this.comercianteRepository.buscarPorId(vendedorId);

    if (!comerciante) {
      res.status(404).send("Comerciante não encontrado");
      return null;
    }

    return comerciante;
  }

  private getProduto(req: Request<ProdutoParams>, res: Response) {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return null;

    const produtoId = Number(req.params.produto_id);

    if (Number.isNaN(produtoId)) {
      res.status(400).send("ID do produto inválido");
      return null;
    }

    const produto = this.produtoRepository.buscarPorId(produtoId);

    if (!produto) {
      res.status(404).send("Produto não encontrado");
      return null;
    }

    return { comerciante, produto };
  }

  paginaVendedor = (req: Request<NomeParams>, res: Response) => {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return;

    res.render("vendedor", { comerciante, produtos: comerciante.produtos });
  };

  paginaAddProduto = (req: Request<NomeParams>, res: Response) => {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return;

    res.render("produto/add-produto", { comerciante });
  };

  addProduto = (req: Request<NomeParams>, res: Response) => {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return;

    const novoProduto = this.produtoRepository.criar({
      ...req.body,
      comerciante_id: comerciante.id,
    });

    return res.status(201).json(novoProduto);
  };

  paginaListar = (req: Request<NomeParams>, res: Response) => {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return;

    res.render("produto/listar", {
      comerciante,
      produtos: comerciante.produtos,
    });
  };

  paginaEditarProduto = (req: Request<ProdutoParams>, res: Response) => {
    const data = this.getProduto(req, res);
    if (!data) return;

    res.render("produto/editar-produto", data);
  };

  editarProduto = (req: Request<ProdutoParams>, res: Response) => {
    const data = this.getProduto(req, res);
    if (!data) return;

    const produto = this.produtoRepository.atualizar(data.produto.id, req.body);

    res.json(produto);
  };

  login = (req: Request, res: Response) => {
    const { email } = req.body;

    const comerciante = this.comercianteRepository.buscarPorEmail(email);

    if (!comerciante) {
      return res.status(404).send("Comerciante não encontrado");
    }

    res.json({
      id: comerciante.id,
    });
  }

  deletarProduto = (req: Request<ProdutoParams>, res: Response) => {
    const data = this.getProduto(req, res);
    if (!data) return;

    this.produtoRepository.remover(data.produto.id);

    res.json(data.produto);
  };
}

