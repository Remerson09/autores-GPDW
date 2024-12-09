// Função para pegar o documento XML do LocalStorage ou criar um vazio caso não exista
function pegaDadoDoLivro(tag, livro) {
    const tags = livro.getElementsByTagName(tag);
    if (tags.length === 0) return ''; // Se não encontrar, retorna vazio

    // Para o caso dos autores, que podem ter múltiplos
    if (tag === "autor") {
        return Array.from(tags).map(function(tag) {
            const valor = tag.firstChild ? tag.firstChild.nodeValue : ''; // Verifica se o nó existe
            return valor ? '<li>' + valor + '</li>' : ''; // Retorna apenas se houver valor
        }).join('');
    }

    // Para as demais tags, garantimos que existe um primeiro nó
    const valor = tags[0].firstChild ? tags[0].firstChild.nodeValue : '';
    return valor;
}

// Função para salvar o XML no LocalStorage
function salvar(xmldoc) {
    const serealizador = new XMLSerializer();
    const textoXML = serealizador.serializeToString(xmldoc);
    localStorage.dados = textoXML;
}

// Função para pegar o próximo número de ID serial
function pegaProximoSerial() {
    let novoId = parseInt(localStorage.serial) || 1;
    localStorage.serial = novoId + 1;
    return novoId;
}

// Função para preencher a tabela com os livros
function preencherTabela(xmlDoc, categoriaFiltro = '') {
    const livros = xmlDoc.documentElement.getElementsByTagName("livro");
    const corpo = document.querySelector("tbody");
    corpo.innerHTML = ''; // Limpa a tabela antes de preencher

    // Percorre todos os livros para preencher a tabela
    Array.from(livros).forEach(function(livro) {
        const categoria = pegaDadoDoLivro("categoria", livro);
        if (!categoriaFiltro || categoria === categoriaFiltro) {
            const corCategoria = obterCorPorCategoria(categoria);
            corpo.innerHTML += livroParaTr(livro, corCategoria);
        }
    });
}

// Função para gerar o HTML de cada linha da tabela
function livroParaTr(livro, cor) {
    const titulo = pegaDadoDoLivro("titulo", livro);
    const autor = pegaDadoDoLivro("autor", livro);
    const ano = pegaDadoDoLivro("ano", livro);
    const preco = pegaDadoDoLivro("preco", livro);
    const categoria = pegaDadoDoLivro("categoria", livro);

    return `
        <tr style="background-color: ${cor};">
            <td>${titulo}</td>
            <td><ul>${autor}</ul></td>
            <td>${ano}</td>
            <td>${preco}</td>
            <td>${categoria}</td>
            <td><input onclick="remover('${livro.getAttribute("id")}')" id="${livro.getAttribute("id")}" type="button" value="Deletar"></td>
        </tr>
    `;
}

// Função para obter a cor associada a cada categoria
function obterCorPorCategoria(categoria) {
    const cores = {
        'web': '#ADD8E6', // Azul claro
        'didático': '#90EE90', // Verde claro
        'culinária': '#FFB6C1', // Rosa claro
        'literário': '#FFFACD' // Amarelo claro
    };
    return cores[categoria] || '#FFFFFF'; // Cor padrão é branco se a categoria não for encontrada
}

// Função para remover um livro do XML
function remover(id) {
    const xmlDoc = pegaDocXML();
    const raiz = xmlDoc.documentElement;
    const livroParaRemover = buscarLivro(id, raiz);
    if (livroParaRemover) {
        raiz.removeChild(livroParaRemover);
        salvar(xmlDoc);
        preencherTabela(xmlDoc);
    } else {
        alert("Não foi possível remover");
    }
}

function buscarLivro(id, raiz) {
    return Array.from(raiz.getElementsByTagName("livro")).find(function(livro) {
        return livro.getAttribute("id") === id;
    }) || null;
}

// Função para criar um elemento do livro
function criaElementoDoLivro(tag, texto, livro, xmlDoc) {
    if (!texto) return; // Não cria o elemento se o texto estiver vazio ou nulo
    const elemento = xmlDoc.createElement(tag);
    const noTexto = xmlDoc.createTextNode(texto);
    elemento.appendChild(noTexto);
    livro.appendChild(elemento);
}

// Função para inserir um novo livro
function inserir() {
    const titulo = document.getElementById("titulo").value;
    const autores = Array.from(document.querySelectorAll("#containerAutores > input[placeholder=Autor]")).map(function(input) {
        return input.value;
    });
    const ano = document.getElementById("ano").value;
    const preco = document.getElementById("preco").value;
    const categoria = document.getElementById("categoria").value; // Novo campo de categoria

    // Verifique se algum campo obrigatório está vazio antes de inserir
    if (!titulo || !autores.length || !ano || !preco || !categoria) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const xmlDoc = pegaDocXML();
    const livroExistente = Array.from(xmlDoc.documentElement.getElementsByTagName("livro")).find(livro => pegaDadoDoLivro("titulo", livro) === titulo && pegaDadoDoLivro("categoria", livro) === categoria);

    if (livroExistente) {
        autores.forEach(function(autor) {
            criaElementoDoLivro("autor", autor, livroExistente, xmlDoc);
        });
    } else {
        const livro = xmlDoc.createElement("livro");
        livro.setAttribute("id", pegaProximoSerial());
        criaElementoDoLivro("titulo", titulo, livro, xmlDoc);
        autores.forEach(function(autor) {
            criaElementoDoLivro("autor", autor, livro, xmlDoc);
        });
        criaElementoDoLivro("ano", ano, livro, xmlDoc);
        criaElementoDoLivro("preco", preco, livro, xmlDoc);
        criaElementoDoLivro("categoria", categoria, livro, xmlDoc);
        xmlDoc.documentElement.appendChild(livro);
    }

    salvar(xmlDoc);
    preencherTabela(xmlDoc);
}

// Função para carregar o XML
function pegaDocXML() {
    if (!localStorage.dados) {
        return (new DOMParser()).parseFromString("<livros></livros>", "text/xml");
    }
    return (new DOMParser()).parseFromString(localStorage.dados, "text/xml");
}

// Adicionar o filtro de categoria
document.getElementById("filtroCategoria").addEventListener("change", function() {
    const filtroCategoria = this.value;
    const xmlDoc = pegaDocXML();
    preencherTabela(xmlDoc, filtroCategoria);
});

// Evento do botão cadastrar
document.getElementById("botao").addEventListener("click", inserir);

// Evento para adicionar autores
document.getElementById("btAdicionarAutor").addEventListener("click", function() {
    const containerAutores = document.getElementById("containerAutores");
    const novoAutor = document.createElement("input");
    novoAutor.type = "text";
    novoAutor.className = "form-control mb-2";
    novoAutor.placeholder = "Autor";
    containerAutores.appendChild(novoAutor);
});

// Inicializa a tabela
preencherTabela(pegaDocXML());
