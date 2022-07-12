let owner;
let modeloSelecionado, golaSelecionada, tecidoSelecionado;
let imagem;
let camisa;
let novaCamisa = [];
let tipoModelo, tipoGola, tipoTecido;
let author;


function perguntarNome(){
    author = prompt('Olá! Como você gostaria de ser chamadx?');
}    

function mostrarRecentes(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promise.then(pegaRecentes);
}

function pegaRecentes(resposta){
    camisa = resposta.data;
    renderizaRecentes();
}

function renderizaRecentes(){

    let criadosRecentemente = document.querySelector('.imagens');
    
    for (let i = 0; i < camisa.length; i++){
        let template = `
        <div>
            <img src="${camisa[i].image}" />
            <p><strong>Criador: </strong>${camisa[i].owner}</p>
        </div>
    `
        criadosRecentemente.innerHTML += template
    }
}

function selecionarModelo(tipo, elemento){
    tipoModelo = tipo;

    modeloSelecionado = elemento.innerHTML;

    let modelo = document.querySelector('.modelo .selecionado');
    if (modelo !== null) {
        modelo.classList.remove('selecionado');
    }

    elemento.classList.add('selecionado');

    enviarPedido();
}

function selecionarGola(tipo, elemento){
    tipoGola = tipo;

    golaSelecionada = elemento.innerHTML;

    let gola = document.querySelector('.gola .selecionado');
    if (gola !== null) {
        gola.classList.remove('selecionado');
    }

    elemento.classList.add('selecionado');

    enviarPedido();
}

function selecionarTecido(tipo, elemento){
    tipoTecido = tipo;

    tecidoSelecionado = elemento.innerHTML;

    let tecido = document.querySelector('.tecido .selecionado');
    if (tecido !== null) {
        tecido.classList.remove('selecionado');
    }

    elemento.classList.add('selecionado');

    enviarPedido();
}

function isURL(imagem) {
    regularExpression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    return regularExpression.test(imagem);
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
    imagem = document.querySelector('input').value;
    
    modeloSelecionado = document.querySelector('.selecionado .nome-modelo').innerHTML;
    golaSelecionada = document.querySelector('.selecionado .nome-gola').innerHTML;
    tecidoSelecionado = document.querySelector('.selecionado .nome-tecido').innerHTML;

    if (isURL(imagem) != true){
        alert('Por favor, preencha todos os campos corretamente.')
    } else {
        alert(`Você encomendou um ${modeloSelecionado} com ${golaSelecionada} de ${tecidoSelecionado}`)
    }

    enviarCamisa();
}

function enviarCamisa(){

    novaCamisa = {
        model: tipoModelo,
        neck: tipoGola,
        material: tipoTecido,
        owner: author,
        image: imagem
    }

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', novaCamisa);
    promise.then(encomendaConfirmada);
    promise.catch(erroNaEncomenda);    
}

function encomendaConfirmada(){
    alert('tudo certo')
}

function erroNaEncomenda(){
    alert('Ops, não conseguimos processar sua encomenda')
}


perguntarNome();