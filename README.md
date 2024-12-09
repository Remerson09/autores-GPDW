# autores-GPDW


Função adicionaInputAutor
javascript
function adicionaInputAutor() {
    const pai = document.getElementById("containerAutores");
    const novoInput = document.createElement("input");
    novoInput.setAttribute("placeholder", "Autor");
    pai.insertBefore(novoInput, document.getElementById("btAdicionarAutor"));
}
Declaração da Função

javascript
function adicionaInputAutor() {
Aqui é onde a função chamada adicionaInputAutor é declarada. Essa função será chamada quando o evento de clique for acionado.

Selecionando o Elemento Pai

javascript
const pai = document.getElementById("containerAutores");
A constante pai é definida e armazena uma referência ao elemento HTML com o id containerAutores. Esse elemento é onde o novo campo de entrada será inserido.

Criando um Novo Elemento de Entrada

javascript
const novoInput = document.createElement("input");
A constante novoInput é definida e armazena um novo elemento input que está sendo criado dinamicamente.

Definindo um Atributo para o Novo Input

javascript
novoInput.setAttribute("placeholder", "Autor");
Aqui, um atributo placeholder é adicionado ao novo elemento input, com o valor "Autor". Isso define o texto que aparece dentro do campo de entrada antes de o usuário digitar algo.

Inserindo o Novo Input no DOM

javascript
pai.insertBefore(novoInput, document.getElementById("btAdicionarAutor"));
O método insertBefore é utilizado para inserir o novoInput no elemento pai (containerAutores). O novo input é inserido antes do elemento com id btAdicionarAutor.
