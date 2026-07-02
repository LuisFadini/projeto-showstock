const divCliente = document.getElementById('cliente');
const divComerciante = document.getElementById('comerciante');
const CAMINHO_LOGIN = 'cadastro';

function salvarERedirecionar(tipo) {
    localStorage.setItem('tipoUsuario', tipo);
    window.location.href = CAMINHO_LOGIN;
}

divCliente.addEventListener('click', () => {
    salvarERedirecionar('cliente');
});

divComerciante.addEventListener('click', () => {
    salvarERedirecionar('comerciante');
});
