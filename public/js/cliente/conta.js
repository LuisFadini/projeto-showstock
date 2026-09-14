const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const telefone = document.getElementById("telefone");
const endereco = document.getElementById("endereco");
const sobre = document.getElementById("sobre");

const editar = document.getElementById("editar");
const salvar = document.getElementById("salvar");
const cancelar = document.getElementById("cancelar");

let dadosOriginais = {};

function salvarDadosOriginais() {
  dadosOriginais = {
    nome: nome.value,
    telefone: telefone.value,
    endereco: endereco.value,
    sobre: sobre.value,
  };
}

function bloquearCampos() {
  nome.disabled = true;
  telefone.disabled = true;
  endereco.disabled = true;
  sobre.disabled = true;
  senha.disabled = true;
}

function liberarCampos() {
  nome.disabled = false;
  telefone.disabled = false;
  endereco.disabled = false;
  sobre.disabled = false;
  senha.disabled = false;
}

editar.addEventListener("click", () => {
  salvarDadosOriginais();

  liberarCampos();

  editar.style.display = "none";
  salvar.style.display = "inline-block";
  cancelar.style.display = "inline-block";
});

salvar.addEventListener("click", async () => {
  await fetch("/cliente/conta", {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      nome: nome.value,
      telefone: telefone.value,
      endereco: endereco.value,
      sobre: sobre.value,
      senha: senha.value,
    }),
  });

  window.location = "/cliente/conta";
});

cancelar.addEventListener("click", () => {
  nome.value = dadosOriginais.nome;
  telefone.value = dadosOriginais.telefone;
  endereco.value = dadosOriginais.endereco;
  sobre.value = dadosOriginais.sobre;

  senha.value = "";

  bloquearCampos();

  editar.style.display = "inline-block";
  salvar.style.display = "none";
  cancelar.style.display = "none";
});

bloquearCampos();