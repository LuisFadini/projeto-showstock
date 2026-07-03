import type { Request, Response } from "express";
import { comerciantes } from "../comerciantes.js";
import type { NomeParams, ProdutoParams } from "./types.js";

export class VendedoresController {
  private getComerciante(req: Request<NomeParams>, res: Response) {
    const { nome } = req.params;

    if (!nome) {
      res.status(400).send("Precisa ser fornecido o nome do vendedor");
      return null;
    }

    const comerciante = comerciantes.find(
      (c) => c.nome.toLowerCase() === nome.toLowerCase(),
    );

    if (!comerciante) {
      res.status(404).send("Comerciante não encontrado");
      return null;
    }

    return comerciante;
  }

  private getProduto(req: Request<ProdutoParams>, res: Response) {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return null;

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send("ID inválido");
      return null;
    }

    const produto = comerciante.produtos.find((p) => p.id === id);

    if (!produto) {
      res.status(404).send("Produto não encontrado");
      return null;
    }

    return { comerciante, produto };
  }

  paginaVendedor(req: Request<NomeParams>, res: Response) {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return;

    res.render("vendedor", { comerciante, produtos: comerciante.produtos });
  }

  paginaAddProduto(req: Request<NomeParams>, res: Response) {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return;

    res.render("produto/add-produto", { comerciante });
  }

  addProduto(req: Request<NomeParams>, res: Response) {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return;

    const data = req.body;

    const ids = comerciantes.flatMap((c) => c.produtos.map((p) => p.id));
    const biggestId = ids.length ? Math.max(...ids) : 0;

    const novoProduto = {
      ...data,
      id: biggestId + 1,
    };

    comerciante.produtos.push(novoProduto);

    return res.status(201).json(novoProduto);
  }

  paginaListar(req: Request<NomeParams>, res: Response) {
    const comerciante = this.getComerciante(req, res);
    if (!comerciante) return;

    res.render("produto/listar", {
      comerciante,
      produtos: comerciante.produtos,
    });
  }

  paginaEditarProduto(req: Request<ProdutoParams>, res: Response) {
    const data = this.getProduto(req, res);
    if (!data) return;

    res.render("produto/editar-produto", data);
  }

  editarProduto(req: Request<ProdutoParams>, res: Response) {
    const data = this.getProduto(req, res);
    if (!data) return;

    Object.assign(data.produto, req.body);

    res.json(data.produto);
  }

  deletarProduto(req: Request<ProdutoParams>, res: Response) {
    const data = this.getProduto(req, res);
    if (!data) return;

    const index = data.comerciante.produtos.findIndex(
      (p) => p.id === data.produto.id,
    );

    if (index === -1) {
      return res.status(404).send("Produto não encontrado");
    }

    const [produto] = data.comerciante.produtos.splice(index, 1);

    res.json(produto);
  }
}

