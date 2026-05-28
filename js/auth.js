// js/auth.js

function executarLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const msgErro = document.getElementById('mensagemErro');

    // 🌟 CREDENCIAIS PADRÃO FALSAS (Simples e fáceis de digitar para o teste)
    const emailTeste = "teste@clube.com";
    const senhaTeste = "123";

    // Força a limpeza de resíduos de testes anteriores
    localStorage.removeItem('usuarioAutenticado');

    // Validação direta
    if (email === emailTeste && senha === senhaTeste) {
        msgErro.style.display = "none";
        
        // Ativa a sessão simulada no navegador
        localStorage.setItem('usuarioAutenticado', 'true');
        
        // Redireciona imediatamente para o painel
        window.location.href = "dashboard.html";
    } else {
        // Alerta amigável caso erre a digitação
        msgErro.innerHTML = `E-mail ou senha incorretos!<br>Use: <strong>${emailTeste}</strong> e senha <strong>${senhaTeste}</strong>`;
        msgErro.style.display = "block";
    }
}

// Proteção de tela simples para impedir acessos diretos sem login
function verificarSessao() {
    if (localStorage.getItem('usuarioAutenticado') !== 'true') {
        window.location.href = "index.html";
    }
}
