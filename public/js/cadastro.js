const inNome = document.getElementById("inNome");
const inEmail = document.getElementById("inEmail");
const inSenha = document.getElementById("inSenha");
const btCadastrar = document.getElementById("btCadastrar");
const txtCadastro = document.getElementById("txtCadastro");

let mudar = document.getElementById("btMudar");
const rodape = document.getElementById("rodape");
let trocar = true;

mudar.addEventListener("click", () => {
  mudar.remove();
  troca();
});

function troca() {
  const span = document.createElement("span");
  span.addEventListener("click", troca);
  span.id = "btMudar";

  if (trocar) {
    rodape.innerHTML = "Não tem VISU? ";
    span.appendChild(document.createTextNode("Faça o cadastro!"));
    btCadastrar.value = "Entrar";
    txtCadastro.textContent = "Login";
  } else if (!trocar) {
    rodape.innerHTML = "Já tem VISU? ";
    span.appendChild(document.createTextNode("Faça login!"));
    btCadastrar.value = "Cadastrar";
    txtCadastro.textContent = "Cadastro";
  }

  rodape.appendChild(span);
  trocar = !trocar;
}

const btEntrar = document.getElementById("btEntrar");

btCadastrar.addEventListener("click", () => {
  const user = localStorage.getItem("tipoUsuario");
  if (user === "comerciante") {
    if (!inNome.value || !inEmail.value || !inSenha.value) {
      mostrarErro("Por favor, preencha todos os campos antes de continuar.");
      return;
    }

    window.location = `vendedor/${inNome.value}`;
  } else {
    if (!inNome.value || !inEmail.value || !inSenha.value) {
      mostrarErro("Por favor, preencha todos os campos antes de continuar.");
      return;
    }
    window.location = "cliente";
  }
});

btEntrar.addEventListener("click", () => {
  window.location = "cliente";
});

window.onload = () => {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  if (tipoUsuario === "comerciante") {
    btEntrar.style.display = "none";
  }
};

