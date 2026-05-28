// js/lista.js

let banco = JSON.parse(obterDadosBanco());
let categoriaAtual = localStorage.getItem('categoriaAtiva') || Object.keys(banco)[0];

function inicializarPaginaLista() {
    const seletor = document.getElementById('seletorLista');
    seletor.innerHTML = "";
    
    Object.keys(banco).forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.innerText = cat;
        if(cat === categoriaAtual) opt.selected = true;
        seletor.appendChild(opt);
    });

    renderizarCards();
}

function alternarListaCategoria(novaCategoria) {
    categoriaAtual = novaCategoria;
    localStorage.setItem('categoriaAtiva', novaCategoria);
    renderizarCards();
}

function renderizarCards(filtro = "") {
    const grid = document.getElementById('gridLivros');
    grid.innerHTML = "";
    
    const livros = banco[categoriaAtual] || [];
    const livrosFiltrados = livros.filter(l => l.titulo.toLowerCase().includes(filtro.toLowerCase()));

    livrosFiltrados.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-cover-wrapper">
                <img src="${livro.capa}" alt="Capa de ${livro.titulo}">
            </div>
            <h4>${livro.titulo}</h4>
            <p>${livro.autor}</p>
            <div class="tag-indicador">👤 ${livro.indicadoPor}</div>
        `;
        grid.appendChild(card);
    });
}

// js/lista.js

// Substitua APENAS a função adicionarLivroAoClube por esta:
async function adicionarLivroAoClube(e) {
    e.preventDefault();
    const titulo = document.getElementById('livroTitulo').value;
    let autor = document.getElementById('livroAutor').value;
    
    // Imagem padrão caso o Google Books não encontre nenhuma capa
    let capaFinal = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300";

    try {
        // Envia uma requisição real para a API do Google Books
        const resposta = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(titulo)}`);
        const dados = await resposta.json();

        if (dados.items && dados.items.length > 0) {
            const infoLivro = dados.items[0].volumeInfo;

            // Se o usuário não digitou o autor, pegamos o autor oficial do Google
            if (!autor && infoLivro.authors) {
                autor = infoLivro.authors.join(', ');
            }

            // Pega a imagem da capa oficial em alta resolução (se existir)
            if (infoLivro.imageLinks && infoLivro.imageLinks.thumbnail) {
                // Forçamos o link para HTTPS para evitar erros de segurança
                capaFinal = infoLivro.imageLinks.thumbnail.replace("http://", "https://");
            }
        }
    } catch (erro) {
        console.error("Erro ao conectar com a API do Google Books:", erro);
    }

    // Se mesmo após a API o autor continuar em branco, definimos como Desconhecido
    if (!autor) autor = "Autor Desconhecido";

    const novoLivro = {
        id: Date.now(),
        titulo: titulo,
        autor: autor,
        indicadoPor: "Você",
        capa: capaFinal
    };

    // Salva no nosso LocalStorage compartilhado
    banco[categoriaAtual].push(novoLivro);
    salvarDadosBanco(banco);
    
    // Reseta o formulário e atualiza a tela
    document.getElementById('formAdicionarLivro').reset();
    renderizarCards();
}

function filtrarLivros() {
    const termo = document.getElementById('inputPesquisa').value;
    renderizarCards(termo);
}

window.onload = inicializarPaginaLista;