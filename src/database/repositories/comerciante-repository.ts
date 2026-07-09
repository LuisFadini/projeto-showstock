import type { DatabaseSync, SQLInputValue } from "node:sqlite";
import type {
  NovoProduto,
  Produto,
  ProdutoRepository,
} from "./produto-repository.js";

export interface Comerciante {
  id: number;
  nome: string;
  sobre: string | null;
  email: string;
  senha: string;
  imagem: string;
  relevancia: number;
  data: string;
  categorias: string[];
  produtos: Produto[];
}

export type NovoComerciante = Omit<Omit<Comerciante, "id">, "produtos"> & {
  produtos: Omit<NovoProduto, "comerciante_id">[];
};
export type AtualizarComerciante = Partial<Omit<NovoComerciante, "produtos">>;

type ComercianteRow = Omit<Comerciante, "categorias" | "produtos"> & {
  categorias: string;
};

export class ComercianteRepository {
  constructor(
    private readonly db: DatabaseSync,
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  private readonly mapComerciante = (row: ComercianteRow): Comerciante => ({
    ...row,
    categorias: this.deserializeCategorias(row.categorias),
    produtos: this.produtoRepository.buscarPorComerciante(row.id),
  });

  private serializeCategorias(categorias: string[]): string {
    return JSON.stringify(categorias);
  }

  private deserializeCategorias(json: string): string[] {
    return JSON.parse(json) as string[];
  }

  buscarTodos(): Comerciante[] {
    const comerciantes = this.db
      .prepare("SELECT * FROM comerciantes")
      .all() as ComercianteRow[];

    return comerciantes.map(this.mapComerciante);
  }

  buscarPorId(id: number): Comerciante | null {
    const row = this.db
      .prepare("SELECT * FROM comerciantes WHERE id = ?")
      .get(id) as ComercianteRow | undefined;

    return row ? this.mapComerciante(row) : null;
  }

  buscarPorEmail(email: string): Comerciante | null {
    const row = this.db
      .prepare("SELECT * FROM comerciantes WHERE email = ?")
      .get(email) as ComercianteRow | undefined;

    return row ? this.mapComerciante(row) : null;
  }

  buscarPorCategoria(categoria: string): Comerciante[] {
    const comerciantes = this.db
      .prepare(
        `
      SELECT *
      FROM comerciantes
      WHERE EXISTS (
        SELECT 1
        FROM json_each(comerciantes.categorias)
        WHERE json_each.value = ?
      )
    `,
      )
      .all(categoria) as ComercianteRow[];

    return comerciantes.map(this.mapComerciante).map((comerciante) => ({
      ...comerciante,
      produtos: comerciante.produtos.filter(
        (produto) => produto.categoria === categoria,
      ),
    }));
  }

  criar(comerciante: NovoComerciante): Comerciante {
    const result = this.db
      .prepare(
        `
        INSERT INTO comerciantes (
          nome,
          sobre,
          email,
          senha,
          imagem,
          relevancia,
          data,
          categorias
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
      )
      .run(
        comerciante.nome,
        comerciante.sobre,
        comerciante.email,
        comerciante.senha,
        comerciante.imagem,
        comerciante.relevancia,
        comerciante.data,
        this.serializeCategorias(comerciante.categorias),
      );

    const comercianteId = Number(result.lastInsertRowid);

    for (const produto of comerciante.produtos) {
      this.produtoRepository.criar({
        ...produto,
        comerciante_id: comercianteId,
      });
    }

    return this.buscarPorId(comercianteId)!;
  }

  atualizar(id: number, comerciante: AtualizarComerciante): boolean {
    if (Object.keys(comerciante).length === 0) {
      return false;
    }

    const data: Record<string, SQLInputValue> = {};

    for (const [campo, valor] of Object.entries(comerciante)) {
      if (campo === "categorias") {
        data[campo] = JSON.stringify(valor);
      } else {
        data[campo] = valor as SQLInputValue;
      }
    }
    const campos = Object.keys(data);

    const result = this.db
      .prepare(
        `UPDATE comerciantes SET ${campos.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`,
      )
      .run(...Object.values(data), id);

    return result.changes > 0;
  }

  remover(id: number): boolean {
    const result = this.db
      .prepare(`DELETE FROM comerciantes WHERE id = ?`)
      .run(id);

    return result.changes > 0;
  }
}

