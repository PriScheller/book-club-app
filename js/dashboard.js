// js/dashboard.js

function inicializarDashboard() {
    // Busca os dados atuais do banco de dados simulado
    const bancoDadosRaw = localStorage.getItem('bancoClubeLivro');
    
    let totalLivros = 0;
    let totalCategorias = 0;

    if (bancoDadosRaw) {
        const banco = JSON.parse(bancoDadosRaw);
        const categorias = Object.keys(banco);
        totalCategorias = categories = categorias.length;
        
        categorias.forEach(cat => {
            totalLivros += banco[cat].length;
        });
    }

    // Injeta os valores calculados dinamicamente nos elementos do HTML
    document.getElementById('numTotalLivros').innerText = totalLivros;
    document.getElementById('numCategorias').innerText = totalCategorias;
}

// Garante a execução da contagem assim que o painel abrir
window.onload = inicializarDashboard;