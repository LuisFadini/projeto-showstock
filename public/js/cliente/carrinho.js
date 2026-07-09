const inQuantidade = document.getElementById("inQuantidade");
const btAdicionarCarrinho = document.getElementById("btAdicionarCarrinho");

if (btAdicionarCarrinho)
  btAdicionarCarrinho.addEventListener("click", () => {
    const quantidade = Number(inQuantidade.value);

    if (quantidade <= 0) {
      mostrarErro("A quantidade deve ser maior que 0");
      return;
    }

    if (quantidade > produto.quantidade) {
      mostrarErro("Quantidade indisponível em estoque");
      return;
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const { quantidade: estoque, ...data } = produto;

    const produtoExistente = carrinho.find((item) => item.id === data.id);

    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
    } else {
      carrinho.unshift({ ...data, quantidade });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    window.history.back()
  });

const listaCarrinho = document.getElementById("listaCarrinho");

function mostrarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  listaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  carrinho.forEach((p) => {
    const div = document.createElement("div");

    div.className = "produto";

    div.innerHTML = `
      <div class="produto-imagem">
        <img src="/imagens/${p.imagem ?? "placeholder.jpg"}" alt="${p.nome}" />
      </div>

      <div class="produto-info">
        <h2>${p.nome}</h2>
        <p class="preco">R$${p.preco.toFixed(2)}</p>
      </div>

      <div class="quantidade">
        <button class="btnDiminuirQuantidade" data-id="${p.id}">-</button>
        <span>${p.quantidade}</span>
        <button class="btnAumentarQuantidade" data-id="${p.id}">+</button>
      </div>

      <div class="subtotal">
        <p>R$${(p.quantidade * p.preco).toFixed(2)}</p>
      </div>

      <button class="remover btnDeletar" data-id="${p.id}">✕</button>
    `;

    listaCarrinho.appendChild(div);
  });
}

listaCarrinho.addEventListener("click", (event) => {
  const id = Number(event.target.dataset.id);

  if (!id) return;

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const produto = carrinho.find((item) => item.id === id);

  if (event.target.classList.contains("btnDiminuirQuantidade")) {
    if (produto.quantidade > 1) {
      produto.quantidade--;
    } else {
      return;
    }
  }

  if (event.target.classList.contains("btnAumentarQuantidade")) {
    produto.quantidade++;
  }

  if (event.target.classList.contains("btnDeletar")) {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);

    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    mostrarCarrinho();
    atualizarResumo();
    return;
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  mostrarCarrinho();
  atualizarResumo();
});

if (listaCarrinho) mostrarCarrinho();

const linhaSubtotal = document.getElementById("linha-subtotal");
const linhaFrete = document.getElementById("linha-frete");
const linhaTotal = document.getElementById("linha-total");

function atualizarResumo() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const frete = 0;

  const subtotal = carrinho.reduce((total, produto) => {
    return total + produto.preco * produto.quantidade;
  }, 0);

  const total = subtotal + frete;

  linhaSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
  linhaFrete.textContent = `R$ ${frete.toFixed(2)}`;
  linhaTotal.textContent = `R$ ${total.toFixed(2)}`;
}

if (linhaSubtotal && linhaFrete && linhaTotal) atualizarResumo();

