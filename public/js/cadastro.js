const inNome = document.getElementById("inNome");
const inEmail = document.getElementById("inEmail");
const inSenha = document.getElementById("inSenha");
const btCadastrar = document.getElementById("btCadastrar");

btCadastrar.addEventListener("click", async () => {
  const nome = inNome.value.trim();
  const email = inEmail.value.trim();
  const senha = inSenha.value;
  
  const tipoUsuario = localStorage.getItem("tipoUsuario") ?? "cliente";

  if (!nome || !email || !senha) {
    mostrarErro("Preencha todos os campos.");
    return;
  }

  if (senha.length < 6) {
    mostrarErro("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  const tipo = tipoUsuario === "comerciante" ? "comerciante" : "cliente";

  try {
    const endpoint =
      tipo === "comerciante"
        ? "/auth/vendedor/cadastro"
        : "/auth/cliente/cadastro";

    const body =
      tipo === "comerciante"
        ? {
            nome,
            email,
            senha,
            sobre: null,
            imagem: "perfil.png",
            relevancia: 0,
            data: new Date().toISOString(),
            categorias: [],
            produtos: [],
          }
        : {
            nome,
            email,
            senha,
            telefone: null,
            endereco: null,
            sobre: null,
            foto: "perfil.png",
          };

    const response = await fetch(endpoint, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      mostrarErro(data.mensagem ?? "Não foi possível realizar o cadastro.");

      return;
    }

    alert("Cadastro realizado com sucesso!");

    window.location.href = "/login";
  } catch (error) {
    console.error(error);

    mostrarErro("Não foi possível conectar ao servidor.");
  }
});

