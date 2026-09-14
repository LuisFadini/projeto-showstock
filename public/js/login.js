const inEmail = document.getElementById("inEmail");
const inSenha = document.getElementById("inSenha");
const btLogin = document.getElementById("btCadastrar");
const btEntrar = document.getElementById("btEntrar");

const tipoUsuario = localStorage.getItem("tipoUsuario") ?? "cliente";

if (tipoUsuario === "comerciante") btEntrar.style.display = "none";

btLogin.addEventListener("click", async () => {
  const email = inEmail.value.trim();
  const senha = inSenha.value;

  if (!email || !senha) {
    mostrarErro("Informe seu email e sua senha.");
    return;
  }

  const tipo = tipoUsuario === "comerciante" ? "comerciante" : "cliente";

  try {
    const response = await fetch("/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify({
        email,
        senha,
        tipo,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      mostrarErro(data.mensagem ?? "Email ou senha inválidos.");

      return;
    }

    if (data.tipo === "comerciante") {
      window.location.href = "/vendedor";

      return;
    }

    window.location.href = "/cliente";
  } catch (error) {
    console.error(error);

    mostrarErro("Não foi possível conectar ao servidor.");
  }
});

btEntrar.addEventListener("click", () => {
  window.location.href = "/cliente";
});

