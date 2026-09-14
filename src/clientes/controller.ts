import type { Request, Response } from "express";
import type { ComercianteRepository } from "../database/repositories/comerciante-repository.js";
import type { UsuarioRepository } from "../database/repositories/user-repository.js";

interface AuthCookie {
  id: number;
  tipo: "cliente" | "comerciante";
}

export class ClientesController {
  constructor(
    private readonly comercianteRepository: ComercianteRepository,
    private readonly usuarioRepository: UsuarioRepository,
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
        auth.tipo !== "cliente" ||
        typeof auth.id !== "number" ||
        !Number.isInteger(auth.id) ||
        auth.id <= 0
      ) {
        res.redirect("/");
        return null;
      }

      return auth;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  paginaProdutos = (req: Request, res: Response) => {
    const comerciantes = this.comercianteRepository.buscarTodos();

    res.render("cliente", { comerciantes });
  };

  paginaCarrinho = (req: Request, res: Response) => {
    res.render("cliente/carrinho");
  };

  paginaConta = (req: Request, res: Response) => {
    const auth = this.getAuth(req, res);

    if (!auth) return res.redirect("/cliente");

    res.render("cliente/conta", {
      usuario: this.usuarioRepository.buscarPorId(auth.id),
    });
  };

  atualizarConta = (req: Request, res: Response) => {
    const auth = this.getAuth(req, res);
    if (!auth) return;

    try {
      const usuario = this.usuarioRepository.buscarPorId(auth.id);

      if (!usuario) {
        return res.status(404).json({
          sucesso: false,
          mensagem: "Usuário não encontrado.",
        });
      }

      const { nome, telefone, endereco, sobre, senha } = req.body;

      if (!nome || nome.trim().length === 0) {
        return res.status(400).json({
          sucesso: false,
          mensagem: "O nome é obrigatório.",
        });
      }

      const dados: Record<string, any> = {
        nome: nome.trim(),
        telefone: telefone?.trim() ?? "",
        endereco: endereco?.trim() ?? "",
        sobre: sobre?.trim() ?? "",
      };

      if (senha && senha.trim().length > 0) {
        dados.senha = senha;
      }

      this.usuarioRepository.atualizar(auth.id, dados);

      const usuarioAtualizado = this.usuarioRepository.buscarPorId(auth.id);

      return res.json({
        sucesso: true,
        mensagem: "Perfil atualizado com sucesso.",
        usuario: usuarioAtualizado,
      });
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);

      return res.status(500).json({
        sucesso: false,
        mensagem: "Não foi possível atualizar o perfil.",
      });
    }
  };
}

