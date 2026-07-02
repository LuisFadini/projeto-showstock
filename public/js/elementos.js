const areaLojas = document.getElementById('area-lojas');
const categoriaVendedores = document.getElementById('categorias-vendedores');

function callAtualizarLojas(c) {
    areaLojas.innerHTML = '';
    c.forEach(comerciante => {
        atualizarLojas(comerciante);
    });
}
function atualizarLojas(comerciante) {
    const divLoja = document.createElement('div');
    divLoja.classList.add('loja');
    divLoja.addEventListener('click', e => {
        try {
            if (e.target.value.toLowerCase().includes('acessar')) {
                localStorage.setItem('vendedorAtual', JSON.stringify(comerciante));
                window.location.href = '../3-comerciante/pagina-comerciante/';
            }
        } catch (e) {
            return;
        }
    });
    divLoja.className = 'loja';
    divLoja.innerHTML = `
        <div class="img-nome-loja">
            <img src="../imagens/${comerciante.imagem}" alt="Loja">
            <h2>${comerciante.nome}</h2>
            <input type="button" value="Acessar Loja">
        </div>
    `;

    const produtosLoja = comerciante.produtos;
    let divProdutos = '<div class="produtos-loja">';

    produtosLoja.map(produto => {
        divProdutos += `<div class="produto">
                    <img src="../imagens/${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$<span class="preco">${produto.preco.toFixed(2)}</span></p>
                </div>`;
    }).join('');
    divProdutos += '</div>';

    const botaoAcessar = document.createElement('input');
    botaoAcessar.type = 'button';
    botaoAcessar.value = 'Acessar Loja';

    divLoja.innerHTML += divProdutos;
    areaLojas.appendChild(divLoja);
};



const categorias = new Set();

vetComerciantes.forEach(comerciante => {
    comerciante.categorias.forEach(categoria => {
        categorias.add(categoria);
    });
});

categorias.forEach(categoria => {
    const divCategoria = document.createElement('div');
    divCategoria.classList.add('categoria')


    const textoCategoria = document.createElement('span');
    textoCategoria.textContent = categoria;

    divCategoria.appendChild(textoCategoria);

    categoriaVendedores.appendChild(divCategoria);
});

callAtualizarLojas(vetComerciantes);
