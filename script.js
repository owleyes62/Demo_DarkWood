let perguntas = [];
let perguntaAtual = 0;

async function carregarPerguntas() {
    const resposta = await fetch('perguntas.json');
    perguntas = await resposta.json();
    mostrarPergunta();
}

function iniciarJogo() {
    document.getElementById('introducao').style.display = 'none';
    document.querySelector('.btn').style.display = 'none';
    document.getElementById('perguntaContainer').style.display = 'block';
    carregarPerguntas();
}

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];

    // Exibe a pergunta atual
    document.getElementById('pergunta').innerText = pergunta.pergunta;
    const opcoesContainer = document.getElementById('opcoes');
    opcoesContainer.innerHTML = ''; // Limpa as opções anteriores

    // Cria e exibe as opções de resposta
    pergunta.opcoes.forEach((opcao, index) => {
        const divOpcao = document.createElement('div');
        divOpcao.classList.add('opcao');
        divOpcao.innerText = opcao.texto;
        divOpcao.onclick = () => selecionarOpcao(index);
        opcoesContainer.appendChild(divOpcao);
    });

    document.getElementById('proxima').style.display = 'none'; // Esconde o botão de próxima
}

function selecionarOpcao(opcaoEscolhida) {
    const resultado = perguntas[perguntaAtual].opcoes[opcaoEscolhida].resultado;
    console.log(resultado);
    
    // Verifica se o resultado contém "FIM"
    if (resultado.includes("FIM")) {
        window.location.href = 'final.html'
        console.log("Fim do jogo!");
    } else {
        // Aqui você pode definir a lógica para a próxima pergunta
        // Por exemplo, você pode ter uma estrutura que determina a próxima pergunta com base na escolha
        if (opcaoEscolhida === 0) {
            // Lógica para a opção 0
            perguntaAtual = 1; // Mude para o índice da próxima pergunta desejada
        } else if (opcaoEscolhida === 1) {
            // Lógica para a opção 1
            perguntaAtual = 2; // Mude para o índice da próxima pergunta desejada
        }

        // Verifica se ainda há perguntas
        if (perguntaAtual < perguntas.length) {
            mostrarPergunta();
        } else {
            alert("Você completou todas as perguntas!");
            // Aqui você pode adicionar lógica para reiniciar o jogo ou redirecionar para outra página
        }
    }
}


// Iniciar o jogo quando a página for carregada
window.onload = () => {
    document.getElementById('iniciar').onclick = iniciarJogo;
};

