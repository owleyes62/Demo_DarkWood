let perguntas = [];
let perguntaAtual = 0;

async function carregarPerguntas() {
    const resposta = await fetch('perguntas.json');
    perguntas = await resposta.json();
    mostrarPergunta();
}

function iniciarJogo() {
    document.getElementById('bemvindo').style.display = 'none';
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
    const opcaoSelecionada = perguntas[perguntaAtual].opcoes[opcaoEscolhida];
    const resultado = opcaoSelecionada.resultado;
    console.log(resultado);
    

    // Verifica se a opção leva ao fim do jogo
    if (opcaoSelecionada.mensagemFinal) {
        // Armazena a mensagem final no localStorage
        localStorage.setItem('mensagemFinal', opcaoSelecionada.mensagemFinal);
        window.location.href = 'final.html'; // Redireciona para a página final
    } else {
        // Se não houver próxima pergunta, finaliza o jogo
        const proximaPergunta = opcaoSelecionada.proximaPergunta;
        if (proximaPergunta !== null) {
            perguntaAtual = proximaPergunta; // Atualiza para a próxima pergunta
            mostrarPergunta(); // Mostra a próxima pergunta
        } else {
            alert("Fim do jogo!");
            window.location.href = 'final.html'; // Redireciona para a página final
        }
    }
}

// Iniciar o jogo quando a página for carregada
window.onload = () => {
    document.getElementById('iniciar').onclick = iniciarJogo;
};
