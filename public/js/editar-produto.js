const inNome = document.getElementById("inNome");
const inDescricao = document.getElementById("inDescricao");
const inQuantidade = document.getElementById("inQuantidade");
const inPreco = document.getElementById("inPreco");
const inCategoria = document.getElementById("inCategoria");
const imgProduto = document.getElementById("img-produto");
const btSalvarProduto = document.getElementById("btSalvarProduto");
const btExcluirProduto = document.getElementById("btExcluirProduto");

btSalvarProduto.addEventListener("click", async (e) => {
  await fetch(`/vendedor/produtos/${produto.id}`, {
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
      categoria: inCategoria.value,
      imagem: imgProduto.src.split("/").pop(),
    }),
  });
  window.location = `/vendedor`
});

btExcluirProduto.addEventListener("click", async (e) => {
  await fetch(`/vendedor/produtos/${produto.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  window.location = `/vendedor`
})
