const btRelevancia = document.getElementById("btRelevancia");
const btRecente = document.getElementById("btRecente");
const listaLojas = document.getElementById("area-lojas");

function atualizarLojas(lojas) {
  listaLojas.innerHTML = "";

  for (const loja of lojas) {
    listaLojas.innerHTML += `
            <div class="loja">
                <div class="img-nome-loja">
                    <img src="/imagens/${loja.imagem}" alt="Loja">
                    <h2>${loja.nome}</h2>
                    <input type="button" value="Acessar Loja" onclick="window.location.href='/comerciante/${encodeURIComponent(loja.nome)}'">
                </div>
                <div class="produtos-loja">
                ${loja.produtos.map(
                  (produto) =>
                    `<a href="/comerciante/produto/${produto.id}" class="produto">
                        <img src="/imagens/${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p>R$<span class="preco">${produto.preco.toFixed(2)}</span></p>
                    </a>`,
                ).join("\n")}
                </div>
            </div>
      `;
  }
}

btRelevancia.addEventListener("click", () => {
  const ordenarRelevancia = comerciantes.sort((a, b) => {
    return b.relevancia - a.relevancia;
  });
  atualizarLojas(ordenarRelevancia);
});

btRecente.addEventListener("click", () => {
  const ordenarRecente = comerciantes.sort((a, b) => {
    return new Date(b.data) - new Date(a.data);
  });
  atualizarLojas(ordenarRecente);
});

atualizarLojas(comerciantes)