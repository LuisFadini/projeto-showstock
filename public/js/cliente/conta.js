const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const endereco = document.getElementById("endereco");
const sobre = document.getElementById("sobre");

const editar = document.getElementById("editar");
const salvar = document.getElementById("salvar");
const cancelar = document.getElementById("cancelar");

const foto = document.getElementById("fotoPerfil");
const trocarFoto = document.getElementById("trocarFoto");
const inputFoto = document.getElementById("inputFoto");

const campos = [nome, email, telefone, endereco, sobre];

let dadosOriginais = {};

function carregarPerfil() {
  const perfil = JSON.parse(localStorage.getItem("perfil"));

  if (perfil) {
    nome.value = perfil.nome;
    email.value = perfil.email;
    telefone.value = perfil.telefone;
    endereco.value = perfil.endereco;
    sobre.value = perfil.sobre;

    if (perfil.foto) {
      foto.src = perfil.foto;
    }
  } else {
    nome.value = "João da Silva";
    email.value = "joao@email.com";
    telefone.value = "(27)99999-9999";
    endereco.value = "Santa Teresa - ES";
    sobre.value = "Escreva uma descrição sobre você.";
  }
}

carregarPerfil();

editar.onclick = () => {
  dadosOriginais = {
    nome: nome.value,
    email: email.value,
    telefone: telefone.value,
    endereco: endereco.value,
    sobre: sobre.value,
    foto: foto.src,
  };

  campos.forEach((c) => {
    c.disabled = false;
  });

  editar.style.display = "none";
  salvar.style.display = "block";
  cancelar.style.display = "block";
};

salvar.onclick = () => {
  campos.forEach((c) => {
    c.disabled = true;
  });

  const perfil = {
    nome: nome.value,
    email: email.value,
    telefone: telefone.value,
    endereco: endereco.value,
    sobre: sobre.value,
    foto: foto.src,
  };

  localStorage.setItem("perfil", JSON.stringify(perfil));

  editar.style.display = "block";
  salvar.style.display = "none";
  cancelar.style.display = "none";
};

cancelar.onclick = () => {
  nome.value = dadosOriginais.nome;
  email.value = dadosOriginais.email;
  telefone.value = dadosOriginais.telefone;
  endereco.value = dadosOriginais.endereco;
  sobre.value = dadosOriginais.sobre;
  foto.src = dadosOriginais.foto;

  campos.forEach((c) => {
    c.disabled = true;
  });

  editar.style.display = "block";
  salvar.style.display = "none";
  cancelar.style.display = "none";
};

trocarFoto.onclick = () => {
  inputFoto.click();
};

inputFoto.addEventListener("change", function () {
  const arquivo = this.files[0];

  if (!arquivo) return;

  const leitor = new FileReader();

  leitor.onload = function (e) {
    foto.src = e.target.result;
  };

  leitor.readAsDataURL(arquivo);
});
