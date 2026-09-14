import type { Request, Response } from "express";
import type { ComercianteRepository } from "../database/repositories/comerciante-repository.js";
import type { UsuarioRepository } from "../database/repositories/user-repository.js";

export class AuthController {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly comercianteRepository: ComercianteRepository,
  ) {}

  login = (req: Request, res: Response): void => {
    const { email, senha, tipo } = req.body;

    if (!email || !senha || !tipo) {
      res.status(400).json({
        mensagem: "Email, senha e tipo são obrigatórios.",
      });
      return;
    }

    if (tipo === "cliente") {
      const usuario = this.usuarioRepository.buscarPorEmail(email);

      if (!usuario || usuario.senha !== senha) {
        res.status(401).json({
          mensagem: "Email ou senha inválidos.",
        });
        return;
      }

      res.cookie(
        "auth",
        JSON.stringify({
          id: usuario.id,
          tipo: "cliente",
        }),
        {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7,
        },
      );

      const { senha: _, ...usuarioSemSenha } = usuario;

      res.status(200).json({
        mensagem: "Login realizado com sucesso.",
        tipo: "cliente",
        usuario: usuarioSemSenha,
      });

      return;
    }

    if (tipo === "comerciante") {
      const comerciante =
        this.comercianteRepository.buscarPorEmail(email);

      if (!comerciante || comerciante.senha !== senha) {
        res.status(401).json({
          mensagem: "Email ou senha inválidos.",
        });
        return;
      }

      res.cookie(
        "auth",
        JSON.stringify({
          id: comerciante.id,
          tipo: "comerciante",
        }),
        {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7,
        },
      );

      const { senha: _, ...comercianteSemSenha } = comerciante;

      res.status(200).json({
        mensagem: "Login realizado com sucesso.",
        tipo: "comerciante",
        comerciante: comercianteSemSenha,
      });

      return;
    }

    res.status(400).json({
      mensagem: "Tipo de usuário inválido.",
    });
  };

  cadastrarCliente = (req: Request, res: Response): void => {
    const {
      nome,
      email,
      senha,
      telefone = null,
      endereco = null,
      sobre = null,
      foto = "perfil.png",
    } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({
        mensagem: "Nome, email e senha são obrigatórios.",
      });
      return;
    }

    const usuarioExistente =
      this.usuarioRepository.buscarPorEmail(email);

    if (usuarioExistente) {
      res.status(409).json({
        mensagem: "Já existe um usuário com esse email.",
      });
      return;
    }

    const usuario = this.usuarioRepository.criar({
      nome,
      email,
      senha,
      telefone,
      endereco,
      sobre,
      foto,
    });

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.status(201).json({
      mensagem: "Cliente cadastrado com sucesso.",
      usuario: usuarioSemSenha,
    });
  };

  cadastrarVendedor = (req: Request, res: Response): void => {
    const {
      nome,
      email,
      senha,
      sobre = null,
      imagem = "perfil.png",
      relevancia = 0,
      data = new Date().toISOString(),
      categorias = [],
      produtos = [],
    } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({
        mensagem: "Nome, email e senha são obrigatórios.",
      });
      return;
    }

    const comercianteExistente =
      this.comercianteRepository.buscarPorEmail(email);

    if (comercianteExistente) {
      res.status(409).json({
        mensagem: "Já existe um vendedor com esse email.",
      });
      return;
    }

    const comerciante = this.comercianteRepository.criar({
      nome,
      email,
      senha,
      sobre,
      imagem,
      relevancia,
      data,
      categorias,
      produtos,
    });

    const { senha: _, ...comercianteSemSenha } = comerciante;

    res.status(201).json({
      mensagem: "Vendedor cadastrado com sucesso.",
      comerciante: comercianteSemSenha,
    });
  };

  logout = (_req: Request, res: Response): void => {
    res.clearCookie("auth");

    res.status(200).json({
      mensagem: "Logout realizado com sucesso.",
    });
  };
}
