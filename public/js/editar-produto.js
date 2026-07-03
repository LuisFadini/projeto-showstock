const inNome = document.getElementById("inNome");
const inDescricao = document.getElementById("inDescricao");
const inQuantidade = document.getElementById("inQuantidade");
const inPreco = document.getElementById("inPreco");
const imgProduto = document.getElementById("img-produto");
const btSalvarProduto = document.getElementById("btSalvarProduto");
const btExcluirProduto = document.getElementById("btExcluirProduto");

btSalvarProduto.addEventListener("click", async (e) => {
  await fetch(`/vendedor/${comerciante.nome}/produtos/${produto.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: inNome.value,
      descricao: inDescricao.value,
      quantidade: Number(inQuantidade.value),
      preco: Number(inPreco.value),
      marca: comerciante.nome,
      imagem: imgProduto.src.split("/").pop(),
    }),
  });
  window.location = `/vendedor/${comerciante.nome}`
});

btExcluirProduto.addEventListener("click", async (e) => {
  await fetch(`/vendedor/${comerciante.nome}/produtos/${produto.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  window.location = `/vendedor/${comerciante.nome}`
})
