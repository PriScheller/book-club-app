// js/dados-compartilhados.js

// Estrutura inicial de listas caso o banco esteja vazio
const listasIniciais = {
    "Geral 📚": [
        { id: 1, titulo: "O Hobbit", autor: "J.R.R. Tolkien", indicadoPor: "Ana", capa: "https://images-na.ssl-images-amazon.com/images/I/91M9x64vS9L.jpg" },
        { id: 2, titulo: "Duna", autor: "Frank Herbert", indicadoPor: "Mari", capa: "https://images-na.ssl-images-amazon.com/images/I/81zE42g7WaL.jpg" }
    ],
    "Terror 👻": [
        { id: 3, titulo: "O Iluminado", autor: "Stephen King", indicadoPor: "Beatriz", capa: "https://images-na.ssl-images-amazon.com/images/I/91S19p0T9ML.jpg" },
        { id: 4, titulo: "Drácula", autor: "Bram Stoker", indicadoPor: "Clara", capa: "https://images-na.ssl-images-amazon.com/images/I/817-f5pXbBL.jpg" }
    ],
    "Romance ☕": [
        { id: 5, titulo: "Orgulho e Preconceito", autor: "Jane Austen", indicadoPor: "Carla", capa: "https://images-na.ssl-images-amazon.com/images/I/71233-w93ML.jpg" }
    ]
};

// Se não existirem dados no LocalStorage, salva os iniciais
if (!localStorage.getItem('bancoClubeLivro')) {
    localStorage.setItem('bancoClubeLivro', JSON.stringify(listasIniciais));
    localStorage.setItem('categoriaAtiva', "Terror 👻"); // Padrão inicial
}

function obterDadosBanco() {
    return JSON.stringify(JSON.parse(localStorage.getItem('bancoClubeLivro')));
}

function salvarDadosBanco(novosDados) {
    localStorage.setItem('bancoClubeLivro', JSON.stringify(novosDados));
}