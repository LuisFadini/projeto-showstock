const btPopular = document.getElementById("btPopular");
const btPreco = document.getElementById("btPreco");
const listaProdutos = document.getElementById('div-lista-produtos');

function atualizarListaProdutos(lista) {
  listaProdutos.innerHTML = "";

  listaProdutos.innerHTML += `
    <ul>
      ${lista
        .map(
          (produto) => `
          <li>
            <a href="/comerciante/produto/${produto.id}">
              <img src="/imagens/${produto.imagem}" alt="${produto.nome}">
              ${produto.nome}
              R$ ${produto.preco.toFixed(2)}
            </a>
          </li>`,
        )
        .join("")}
    </ul>
`;
}

btPopular.addEventListener("click", () => {
  atualizarListaProdutos(comerciante.produtos.sort((a, b) => b.id - a.id));
});

btPreco.addEventListener("click", () => {
  atualizarListaProdutos(
    comerciante.produtos.sort((a, b) => a.preco - b.preco),
  );
});

atualizarListaProdutos(comerciante.produtos)
