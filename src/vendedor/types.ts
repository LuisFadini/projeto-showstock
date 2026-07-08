export type NomeParams = {
  vendedor_id: string;
};

export type ProdutoParams = {
  produto_id: string;
} & NomeParams;