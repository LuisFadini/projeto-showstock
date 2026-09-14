import type { DatabaseSync, SQLInputValue } from "node:sqlite";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string | null;
  endereco: string | null;
  sobre: string | null;
  foto: string;
}

export type NovoUsuario = Omit<Usuario, "id">;

export type AtualizarUsuario = Partial<NovoUsuario>;

export class UsuarioRepository {
  constructor(private readonly db: DatabaseSync) {}

  buscarTodos(): Usuario[] {
    return this.db
      .prepare(`SELECT * FROM usuarios`)
      .all() as unknown as Usuario[];
  }

  buscarPorId(id: number): Usuario | null {
    const usuario = this.db
      .prepare("SELECT * FROM usuarios WHERE id = ?")
      .get(id) as Usuario | undefined;

    return usuario ?? null;
  }

  buscarPorEmail(email: string): Usuario | null {
    const usuario = this.db
      .prepare("SELECT * FROM usuarios WHERE email = ?")
      .get(email) as Usuario | undefined;

    return usuario ?? null;
  }

  criar(usuario: NovoUsuario): Usuario {
    const result = this.db
      .prepare(
        `
        INSERT INTO usuarios
          (nome, email, senha, telefone, endereco, sobre, foto)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        usuario.nome,
        usuario.email,
        usuario.senha,
        usuario.telefone,
        usuario.endereco,
        usuario.sobre,
        usuario.foto,
      );

    return this.buscarPorId(Number(result.lastInsertRowid))!;
  }

  atualizar(id: number, usuario: AtualizarUsuario): boolean {
    const entries = Object.entries(usuario);

    if (entries.length === 0) {
      return false;
    }

    const campos = entries.map(([campo]) => `${campo} = ?`);
    const valores = entries.map(([, valor]) => valor as SQLInputValue);

    const result = this.db
      .prepare(
        `
        UPDATE usuarios
        SET ${campos.join(", ")}
        WHERE id = ?
      `,
      )
      .run(...valores, id);

    return result.changes > 0;
  }

  remover(id: number): boolean {
    const result = this.db.prepare(`DELETE FROM usuarios WHERE id = ?`).run(id);

    return result.changes > 0;
  }
}

