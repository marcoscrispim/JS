const html = document.querySelector('html')
const tempoNaTela = document.querySelector('#timer')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const imgemPause = document.querySelector('.app__card-primary-butto-icon')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
//assim pegamos um audio
const startPauseBt = document.querySelector('#start-pause')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
musica.loop = true
const musicaAlerta = new Audio('./sons/beep.mp3')
const pauseM = new Audio('./sons/pause.mp3')
const playM = new Audio('./sons/play.wav')
const textBt = document.querySelector('span')
let tempoDecorridoEmSegundos = 5000
let intevaloId = null
// ao usar arquivo de audio ou input usamos o change
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
        playM.play()
    } else {
        musica.pause()
        pauseM.play()
    }
})
//assim pega o evento de click, depois tem um aero function que diz ao ecendo o que ele tem que fazer

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos=900
    alterarContexto('foco')
    focoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos =1500
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`./imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            QUE TAL DAR UMA RESPIRADA?,<br>
                <strong class="app__title-strong">Faça uma pausa curta </strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML =
            `Hora de voltar a superficie,<br>
                <strong class="app__title-strong">Faça uma pause longa.</strong>`
            break;
        default:
            break; 
    }
}
const contagemTegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        musicaAlerta.play()
        alert('tempo esgotado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()

}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intevaloId){
        imgemPause.setAttribute('src', './imagens/pause.png')
        pauseM.play()
        textBt.innerHTML = 'Pausar'
        zerar()
        return
    }
    intevaloId = setInterval(contagemTegressiva, 1000)
    imgemPause.setAttribute('src', './imagens/play_arrow.png')
    playM.play()
    textBt.innerHTML = 'Começar'
    iniciarOuPausar.textContent = "Pausar"
}
function zerar() {
    clearInterval(intevaloId)
    iniciarOuPausar.textContent = "iniciar"
    intevaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado =  tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
//chamar a função no escopo global deixar o tempo na tela o tempo tdo
mostrarTempo()