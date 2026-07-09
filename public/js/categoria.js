const inputBusca = document.getElementById("busca");
const lojas = document.querySelectorAll(".loja");

inputBusca.addEventListener("input", () => {
  const termo = inputBusca.value.toLowerCase();

  lojas.forEach(loja => {
    loja.style.display =
      loja.textContent.toLowerCase().includes(termo)
        ? "block"
        : "none";
  });
});