// js/auth.js

function executarLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const msgErro = document.getElementById('mensagemErro');

    // Credenciais simuladas para a versão Beta
    const emailValido = "admin@clube.com";
    const senhaValida = "123456";

    if (email === emailValido && senha === senhaValida) {
        msgErro.style.display = "none";
        
        // Simula uma sessão ativa salvando um marcador no localStorage
        localStorage.setItem('usuarioAutenticado', 'true');
        
        // Redireciona para o Painel Principal
        window.location.href = "dashboard.html";
    } else {
        msgErro.innerText = "E-mail ou senha incorretos! (Dica: admin@clube.com / 123456)";
        msgErro.style.display = "block";
    }
}

// Função auxiliar simples para proteção de rotas nas outras páginas
function verificarSessao() {
    if (localStorage.getItem('usuarioAutenticado') !== 'true') {
        window.location.href = "index.html";
    }
}