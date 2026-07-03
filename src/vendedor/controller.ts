import type { Request, Response } from "express";
import { comerciantes } from "../comerciantes.js";

export class VendedoresController {
  paginaVendedor(req: Request, res: Response) {
    const nome = req.params.nome;
    if (!nome || typeof nome !== "string")
      return res.status(400).send("Precisa ser fornecido o nome do vendedor");

    const comerciante = comerciantes.find(
      (c) => c.nome.toLowerCase() === nome.toLowerCase(),
    );

    if (!comerciante) {
      return res.status(404).send("Comerciante não encontrado");
    }

    res.render("vendedor", { comerciante, produtos: comerciante.produtos });
  }

  paginaAddProduto(req: Request, res: Response) {
    const nome = req.params.nome;
    if (!nome || typeof nome !== "string")
      return res.status(400).send("Precisa ser fornecido o nome do vendedor");

    const comerciante = comerciantes.find(
      (c) => c.nome.toLowerCase() === nome.toLowerCase(),
    );

    if (!comerciante) {
      return res.status(404).send("Comerciante não encontrado");
    }

    res.render("add-produto", { comerciante });
  }

  addProduto(req: Request, res: Response) {
    const nome = req.params.nome;
    if (!nome || typeof nome !== "string")
      return res.status(400).send("Precisa ser fornecido o nome do vendedor");

    const comerciante = comerciantes.find(
      (c) => c.nome.toLowerCase() === nome.toLowerCase(),
    );

    if (!comerciante) {
      return res.status(404).send("Comerciante não encontrado");
    }

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
}

