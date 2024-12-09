Gerenciador de Livros
Este projeto é um gerenciador de livros simples, que permite adicionar livros com título, ano, preço e autores. Também permite deletar livros da lista.

Funções do Código
adicionaInputAutor
Esta função adiciona um novo campo de entrada de autor ao formulário.

javascript
function adicionaInputAutor() {
    const pai = document.getElementById("containerAutores");
    const novoInput = document.createElement("input");
    novoInput.setAttribute("placeholder", "Autor");
    pai.insertBefore(novoInput, document.getElementById("btAdicionarAutor"));
}
Declaração da Função
A função adicionaInputAutor é declarada e será chamada quando o botão de adicionar autor for clicado.

Selecionando o Elemento Pai
javascript
const pai = document.getElementById("containerAutores");
Seleciona o elemento pai onde o novo campo de entrada será inserido.

Criando um Novo Elemento de Entrada
javascript
const novoInput = document.createElement("input");
Cria um novo elemento <input> dinamicamente.

Definindo um Atributo para o Novo Input
javascript
novoInput.setAttribute("placeholder", "Autor");
Define o atributo placeholder do novo input como "Autor".

Inserindo o Novo Input no DOM
javascript
pai.insertBefore(novoInput, document.getElementById("btAdicionarAutor"));
Insere o novo input antes do botão de adicionar autor.

inserir
Esta função captura os valores do formulário e cria um novo artigo na lista de livros.

javascript
function inserir() {
    const titulo = document.getElementById("titulo").value;
    const ano = document.getElementById("ano").value;
    const preco = document.getElementById("preco").value;
    const autores = coletarAutores();

    const artigo = criarArtigo(titulo, autores, ano, preco);

    const listaLivros = document.getElementById("listaLivros");
    listaLivros.insertBefore(artigo, listaLivros.firstChild);

    document.getElementById("livrosForm").reset();
    removerExcessoDeInputsAutor();
}
Capturando Valores dos Inputs
Captura os valores dos campos de entrada do formulário.

Criando um Novo Artigo
Chama a função criarArtigo para criar um novo elemento de artigo.

Inserindo o Novo Artigo no Início da Lista
Insere o novo artigo no início da lista de livros.

Resetando o Formulário
Reseta todos os campos do formulário.

Removendo Inputs de Autor Excedentes
Remove quaisquer campos de entrada de autores adicionais.

coletarAutores
Esta função coleta todos os autores inseridos no formulário.

javascript
function coletarAutores() {
    const autoresInputs = document.querySelectorAll("#containerAutores input[placeholder=Autor]");
    const autores = [];
    for (let i = 0; i < autoresInputs.length; i++) {
        autores.push(autoresInputs[i].value);
    }
    return autores;
}
criarArtigo
Esta função cria um novo elemento de artigo com título, lista de autores, ano, preço e um botão para deletar.

javascript
function criarArtigo(titulo, autores, ano, preco) {
    const artigo = document.createElement("div");
    artigo.appendChild(criarTitulo(titulo));
    artigo.appendChild(criarListaAutores(autores));
    artigo.appendChild(criarParagrafo("Ano", ano));
    artigo.appendChild(criarParagrafo("Preço", preco));
    artigo.appendChild(criarBotaoDeletar(artigo));
    return artigo;
}
criarTitulo
Cria um elemento <h2> para o título do artigo.

javascript
function criarTitulo(titulo) {
    const h2 = document.createElement("h2");
    h2.textContent = `Título: ${titulo}`;
    return h2;
}
criarListaAutores
Cria uma lista não ordenada de autores.

javascript
function criarListaAutores(autores) {
    const ul = document.createElement("ul");
    autores.forEach(autor => {
        const li = document.createElement("li");
        li.textContent = `Autor: ${autor}`;
        ul.appendChild(li);
    });
    return ul;
}
criarParagrafo
Cria um parágrafo com uma etiqueta e um valor.

javascript
function criarParagrafo(label, valor) {
    const p = document.createElement("p");
    p.textContent = `${label}: ${valor}`;
    return p;
}
criarBotaoDeletar
Cria um botão para deletar o artigo.

javascript
function criarBotaoDeletar(artigo) {
    const btnDeletar = document.createElement("button");
    btnDeletar.textContent = "Deletar";
    btnDeletar.addEventListener("click", function () {
        artigo.remove();
    });
    return btnDeletar;
}
removerExcessoDeInputsAutor
Remove campos de entrada de autores adicionais.

javascript
function removerExcessoDeInputsAutor() {
    const pai = document.getElementById("containerAutores");
    const inputs = document.querySelectorAll("#containerAutores input[placeholder=Autor]");
    for (let i = 1; i < inputs.length; i++) {
        pai.removeChild(inputs[i]);
    }
}
