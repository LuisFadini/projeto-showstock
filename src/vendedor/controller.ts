import type { Request, Response } from "express";
import type { NomeParams, ProdutoParams } from "./types.js";
import type { ComercianteRepository } from "../database/repositories/comerciante-repository.js";
import type { ProdutoRepository } from "../database/repositories/produto-repository.js";

interface AuthCookie {
  id: number;
  tipo: "cliente" | "comerciante";
}

export class VendedoresController {
  constructor(
    private readonly comercianteRepository: ComercianteRepository,
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  private getAuth(req: Request, res: Response): AuthCookie | null {
    const cookie = req.cookies?.auth;

    if (!cookie) {
      res.redirect("/");
      return null;
    }

    try {
      const auth = JSON.parse(cookie) as AuthCookie;

      if (
        auth.tipo !== "comerciante" ||
        typeof auth.id !== "number" ||
        !Number.isInteger(auth.id) ||
        auth.id <= 0
      ) {
        res.redirect("/");
        return null;
      }

      return auth;
    } catch {
      res.redirect("/");
      return null;
    }
  }

  private getComerciante(req: Request, res: Response) {
    const auth = this.getAuth(req, res);

    if (!auth) return null;

    const comerciante = this.comercianteRepository.buscarPorId(auth.id);

    if (!comerciante) {
      res.redirect("/");
      return null;
    }

    return comerciante;
  }

  private getProduto(req: Request<ProdutoParams>, res: Response) {
    const comerciante = this.getComerciante(req, res);

    if (!comerciante) return null;

    const produtoId = Number(req.params.produto_id);

    if (!Number.isInteger(produtoId) || produtoId <= 0) {
      res.redirect("/");
      return null;
    }

    const produto = this.produtoRepository.buscarPorId(produtoId);

    if (!produto) {
      res.redirect("/");
      return null;
    }

    if (produto.comerciante_id !== comerciante.id) {
      res.redirect("/");
      return null;
    }

    return {
      comerciante,
      produto,
    };
  }

  getCategorias = () => {
    return [
      ...new Set(
        this.comercianteRepository
          .buscarTodos()
          .flatMap((c) => c.produtos.flatMap((p) => p.categoria)),
      ),
    ];
  };

  paginaVendedor = (req: Request<NomeParams>, res: Response) => {
    const comerciante = this.getComerciante(req, res);

    if (!comerciante) return;

    res.render("vendedor", {
      comerciante,
      produtos: comerciante.produtos,
    });
  };

  paginaAddProduto = (req: Request<NomeParams>, res: Response) => {
    const comerciante = this.getComerciante(req, res);

    if (!comerciante) return;

    res.render("produto/add-produto", {
      comerciante,
      categorias: this.getCategorias(),
    });
  };

  addProduto = (req: Request<NomeParams>, res: Response) => {
    const comerciante = this.getComerciante(req, res);

    if (!comerciante) return;

    const novoProduto = this.produtoRepository.criar({
      ...req.body,
      comerciante_id: comerciante.id,
    });

    res.status(201).json(novoProduto);
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

    res.render("produto/editar-produto", {
      ...data,
      categorias: this.getCategorias(),
    });
  };

  editarProduto = (req: Request<ProdutoParams>, res: Response) => {
    const data = this.getProduto(req, res);

    if (!data) return;

    const produto = this.produtoRepository.atualizar(data.produto.id, req.body);

    res.json(produto);
  };

  deletarProduto = (req: Request<ProdutoParams>, res: Response) => {
    const data = this.getProduto(req, res);

    if (!data) return;

    this.produtoRepository.remover(data.produto.id);

    res.json(data.produto);
  };
}

