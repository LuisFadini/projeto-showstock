import type { Request, Response } from "express";
import type { ComercianteRepository } from "../database/repositories/comerciante-repository.js";

export class ClientesController {
  constructor(private readonly comercianteRepository: ComercianteRepository) {}

  paginaProdutos = (req: Request, res: Response) => {
    const comerciantes = this.comercianteRepository.buscarTodos()
    
    res.render("cliente", { comerciantes })
  }

  paginaCarrinho = (req: Request, res: Response) => {
    res.render("cliente/carrinho")
  }

  paginaConta = (req: Request, res: Response) => {
    res.render("cliente/carrinho")
  }
}