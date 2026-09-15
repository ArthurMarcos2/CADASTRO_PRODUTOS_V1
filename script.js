//
// FASE 1: modelagem dos dados (Classe Base)
//
class Produto {
    #preco;
    #quantidade;

    constructor(nome, preco, quantity) {
        if (nome === "") {
            throw new Error("O nome não pode ficar em branco!");
        }
        if (preco <= 0) {
            throw new Error("O preço deve ser maior que zero!");
        }
        if (quantity <= 0) {
            throw new Error("A quantidade deve ser maior que zero!");
        }

        this.nome = nome;
        this.#preco = parseFloat(preco);
        this.#quantidade = parseInt(quantity);
    }

    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    calcularSubtotal() {
        return this.#preco * this.#quantidade;
    }
}

//
// FASE 2: Gerenciamento de Estado (memória)
//
const listaDeProdutos = [];

//
// FASE 3: Escuta de Eventos do DOM
//
const formProduto = document.getElementById("produto-form");

formProduto.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeInput = document.getElementById("nome").value;
    const precoInput = document.getElementById("preco").value;
    const quantidadeInput = document.getElementById("quantidade").value;

    try {
        const fieldProduto = new Produto(nomeInput, precoInput, quantidadeInput);
        listaDeProdutos.push(fieldProduto);

        renderizarTabela();
        atualizarTotalEstoque();
        formProduto.reset();
    } catch (erro) {
        alert(erro.message);
    }
});

document.getElementById("limpar-tabela").addEventListener("click", function () {
    listaDeProdutos.length = 0;
    renderizarTabela();
    atualizarTotalEstoque();
});

//
// FASE 4: Renderização da Interface DOM
//
function renderizarTabela() {
    const tabelaBody = document.querySelector("#tabela-produtos tbody");
    tabelaBody.innerHTML = "";

    listaDeProdutos.forEach(function (produto, index) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.calcularSubtotal().toFixed(2)}</td>
            <td>
                <button class="btn-remover" onclick="removerProduto(${index})">Remover</button>
            </td>
        `;
        tabelaBody.appendChild(linha);
    });
}

//
// FASE 5: Funções de Cálculo e Controle
//
function atualizarTotalEstoque() {
    const total = listaDeProdutos.reduce(function (acumulador, produto) {
        return acumulador + produto.calcularSubtotal();
    }, 0);

    document.getElementById("total-estoque").innerText = "Total em Estoque: R$ " + total.toFixed(2);
}

function removerProduto(index) {
    listaDeProdutos.splice(index, 1);
    renderizarTabela();
    atualizarTotalEstoque();
}
