let nome;
let modeloSelecionado, golaSelecionada, tecidoSelecionado;
let imagemValida;

function perguntarNome(){
    nome = prompt('Olá! Como você gostaria de ser chamadx?')
    return nome;
}

function selecionarModelo(elemento){
    modeloSelecionado = elemento.innerHTML;

    let modelo = document.querySelector('.modelo .selecionado');
    if (modelo !== null) {
        modelo.classList.remove('selecionado');
    }

    elemento.classList.add('selecionado');

    enviarPedido();
}

function selecionarGola(elemento){
    golaSelecionada = elemento.innerHTML;

    let gola = document.querySelector('.gola .selecionado');
    if (gola !== null) {
        gola.classList.remove('selecionado');
    }

    elemento.classList.add('selecionado');

    enviarPedido();
}

function selecionarTecido(elemento){
    tecidoSelecionado = elemento.innerHTML;

    let tecido = document.querySelector('.tecido .selecionado');
    if (tecido !== null) {
        tecido.classList.remove('selecionado');
    }

    elemento.classList.add('selecionado');

    enviarPedido();
}

function isURL() {
    regularExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    return regularExpression.test();
}

function enviarPedido(){
    let botao = document.querySelector('button');
    if (modeloSelecionado && golaSelecionada && tecidoSelecionado) {
        botao.classList.add('botao-selecionado');
        botao.disabled = false;    
    } else {
        botao.disabled = true;
    }
}

function confirmarPedido(){
    alert(`Você encomendou um ${modeloSelecionado} com ${golaSelecionada} de ${tecidoSelecionado}`)
}

perguntarNome();