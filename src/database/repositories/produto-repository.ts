import type { DatabaseSync, SQLInputValue } from "node:sqlite";

export interface Produto {
  id: number;
  comerciante_id: number;
  nome: string;
  descricao: string | null;
  preco: number;
  quantidade: number;
  marca: string;
  categoria: string;
  imagem: string;
}

export type NovoProduto = Omit<Produto, "id">;
export type AtualizarProduto = Partial<NovoProduto>;

export class ProdutoRepository {
  constructor(private readonly db: DatabaseSync) {}

  buscarTodos(): Produto[] {
    return this.db
      .prepare(`SELECT * FROM produtos`)
      .all() as unknown as Produto[];
  }

  buscarPorId(id: number): Produto | null {
    const produto = this.db
      .prepare("SELECT * FROM produtos WHERE id = ?")
      .get(id) as Produto | undefined;

    return produto ?? null;
  }

  buscarPorComerciante(comercianteId: number): Produto[] {
    return this.db
      .prepare(`SELECT * FROM produtos WHERE comerciante_id = ?`)
      .all(comercianteId) as unknown as Produto[];
  }

  criar(produto: NovoProduto): Produto {
    const result = this.db
      .prepare(
        `
      INSERT INTO produtos
      (comerciante_id, nome, descricao, preco, quantidade, marca, categoria, imagem)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      )
      .run(
        produto.comerciante_id,
        produto.nome,
        produto.descricao,
        produto.preco,
        produto.quantidade,
        produto.marca,
        produto.categoria,
        produto.imagem,
      );

    return this.buscarPorId(Number(result.lastInsertRowid))!;
  }

  atualizar(id: number, produto: AtualizarProduto): boolean {
    const entries = Object.entries(produto);

    if (entries.length === 0) {
      return false;
    }

    const campos = entries.map(([campo]) => `${campo} = ?`);
    const valores = entries.map(([, valor]) => valor as SQLInputValue);

    const result = this.db
      .prepare(`UPDATE produtos SET ${campos.join(", ")} WHERE id = ?`)
      .run(...valores, id);

    return result.changes > 0;
  }

  remover(id: number): boolean {
    const result = this.db.prepare(`DELETE FROM produtos WHERE id = ?`).run(id);

    return result.changes > 0;
  }
}

