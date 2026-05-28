// js/sorteio.js

let bancoSorteio = JSON.parse(obterDadosBanco());
let categoriaSorteioAtiva = localStorage.getItem('categoriaAtiva') || Object.keys(bancoSorteio)[0];

let emGiro = false;
let rotacaoTotal = 0;

function inicializarSorteio() {
    const seletor = document.getElementById('seletorListaSorteio');
    seletor.innerHTML = "";

    Object.keys(bancoSorteio).forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.innerText = cat;
        if(cat === categoriaSorteioAtiva) opt.selected = true;
        seletor.appendChild(opt);
    });

    // js/sorteio.js
function montarFatiasComCapas() {
    const roleta = document.getElementById('roletaPizza');
    const livros = bancoSorteio[categoriaSorteioAtiva] || [];
    const total = livros.length;
    const angulo = 360 / total;

    // Reseta fatias antigas
    const antigas = roleta.querySelectorAll('.fatia');
    antigas.forEach(a => a.remove());

    livros.forEach((livro, i) => {
        const fatia = document.createElement('div');
        fatia.className = 'fatia';
        
        const rot = i * angulo;
        const skew = 90 - angulo;
        fatia.style.transform = `rotate(${rot}deg) skewY(-${skew}deg)`;

        const containerConteudo = document.createElement('div');
        containerConteudo.className = 'fatia-texto';
        containerConteudo.style.transform = `skewY(${skew}deg) rotate(${angulo / 2}deg)`;
        
        // plica a cor pastel de fundo na fatia
        containerConteudo.style.backgroundColor = coresPasteis[i % coresPasteis.length];
        
        // Trata o tamanho do texto do título
        const textoCurto = livro.titulo.length > 15 ? livro.titulo.substring(0, 13) + '...' : livro.titulo;

        // Injeta o título em texto E a mini imagem da capa abaixo
        containerConteudo.innerHTML = `
            <span>${textoCurto}</span>
            <img src="${livro.capa}" class="mini-capa-roleta" alt="Capa">
        `;

        fatia.appendChild(containerConteudo);
        roleta.appendChild(fatia);
    });
}
}

function mudarListaDaRoleta(novaCat) {
    categoriaSorteioAtiva = novaCat;
    montarFatiasComCapas();
    document.getElementById('resultadoTexto').innerText = "Lista alterada! Pronto para um novo giro.";
}

function montarFatiasComCapas() {
    const roleta = document.getElementById('roletaPizza');
    const livros = bancoSorteio[categoriaSorteioAtiva] || [];
    const total = livros.length;
    const angulo = 360 / total;

    // Reseta fatias antigas
    const antigas = roleta.querySelectorAll('.fatia');
    antigas.forEach(a => a.remove());

    livros.forEach((livro, i) => {
        const fatia = document.createElement('div');
        fatia.className = 'fatia';
        
        const rot = i * angulo;
        const skew = 90 - angulo;
        fatia.style.transform = `rotate(${rot}deg) skewY(-${skew}deg)`;

        const imgContainer = document.createElement('div');
        imgContainer.className = 'fatia-texto'; // Reaproveita estrutura geométrica
        imgContainer.style.transform = `skewY(${skew}deg) rotate(${angulo / 2}deg)`;
        
        // 🌟 A MÁGICA VISUAL: A imagem da capa preenche a fatia com um overlay escuro para divisão
        imgContainer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${livro.capa}')`;
        imgContainer.style.backgroundSize = 'cover';
        imgContainer.style.backgroundPosition = 'center';

        fatia.appendChild(imgContainer);
        roleta.appendChild(fatia);
    });
}

function gerenciarGiro() {
    if (emGiro) return;
    
    const livros = bancoSorteio[categoriaSorteioAtiva] || [];
    if(livros.length === 0) {
        document.getElementById('resultadoTexto').innerText = "Esta lista está vazia! Adicione livros antes de sortear.";
        return;
    }

    emGiro = true;
    const roleta = document.getElementById('roletaPizza');
    const resultado = document.getElementById('resultadoTexto');
    const btn = document.getElementById('btnGirar');

    const total = livros.length;
    const indice = Math.floor(Math.random() * total);
    const vencedor = livros[indice];

    resultado.innerHTML = "Embaralhando as capas... 📚";
    btn.style.opacity = "0.5";

    const anguloFatia = 360 / total;
    const centroFatia = (indice * anguloFatia) + (anguloFatia / 2);
    const alinharTopo = 360 - centroFatia;

    const impulso = 1800 + alinharTopo;
    rotacaoTotal += impulso + (360 - (rotacaoTotal % 360));

    roleta.style.transform = `rotate(${rotacaoTotal}deg)`;

    setTimeout(() => {
        resultado.innerHTML = `
            <div style="width:120px; height:180px; margin: 0 auto 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); border-radius:8px; overflow:hidden;">
                <img src="${vencedor.capa}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <p style="font-weight:700; color:var(--accent-color); font-size:1.3rem;">${vencedor.titulo}</p>
            <p style="font-size:0.9rem; margin-top:5px;">Indicado por: <strong>${vencedor.indicadoPor}</strong></p>
        `;
        emGiro = false;
        btn.style.opacity = "1";
    }, 5000);
}

// Inicializa a roleta ao carregar
window.onload = inicializarSorteio;