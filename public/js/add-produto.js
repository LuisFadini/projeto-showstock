const inNome = document.getElementById("inNome");
const inDescricao = document.getElementById("inDescricao");
const inQuantidade = document.getElementById("inQuantidade");
const inPreco = document.getElementById("inPreco");
const btAddProduto = document.getElementById("btAddProduto");

btSalvarProduto.addEventListener("click", async (e) => {
  if (
    !inNome.value ||
    !inDescricao.value ||
    !inQuantidade.value ||
    !inPreco.value
  ) {
    mostrarErro("Por favor, preencha todos os campos antes de continuar.");
    return;
  }

  await fetch(`/vendedor/${comerciante.nome}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: inNome.value,
      descricao: inDescricao.value,
      quantidade: Number(inQuantidade.value),
      preco: Number(inPreco.value),
      marca: comerciante.nome,
      imagem: "placeholder.jpg",
    }),
  })
});
