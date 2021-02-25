let $start = document.querySelector('#start')
let $playingField = document.querySelector('#game')
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')
let $description = document.querySelector('#description')

let colors = ['#FF033E', '#A8E4A0', '#77DDE7', '#FFDB8B', '#44944A', '#A5260A', '#F984E5', '#FFDC33', '#4285B4', '#FFB02E', '#D5713F', '#FF4040', '#64400F']
let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)

$gameTime.addEventListener('input', setGameTime)

$playingField.addEventListener('click', boxClickHandler)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    isGameStarted = true
    $gameTime.setAttribute('disabled', 'true')
    $playingField.removeAttribute('style')
    hide($start)
    $description.textContent = 'Нажимайте на фигурки'

    $playingField.style.backgroundColor = '#fff'

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time) {
            $time.textContent = (time - 0.1).toFixed(1)
        } else {
            clearInterval(interval)
            endGame()
        }
    }, 100)
    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $playingField.setAttribute('style', 'background-image: url(saw.jpeg)')
    show($start)
    $playingField.style.backgroundColor = '#ccc'
    $playingField.innerHTML = ''
    $description.textContent = 'Я хочу сыграть с Вами в одну игру!'

    hide($timeHeader)
    show($resultHeader)
}

function boxClickHandler(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()

    }
}

function renderBox() {
    $playingField.innerHTML = ''

    let box = document.createElement('div')
    let boxSize = getRandomNumber(25, 90)
    let $playingFieldSize = $playingField.getBoundingClientRect()
    let randomColorIndex = getRandomNumber(0, colors.length)

    let maxTop = $playingFieldSize.height - boxSize
    let maxLeft = $playingFieldSize.width - boxSize

    box.style.width = box.style.height = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.top = getRandomNumber(0, maxTop) + 'px'
    box.style.left = getRandomNumber(0, maxLeft) + 'px'
    box.style.borderRadius = getRandomForm() + '%'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $playingField.appendChild(box)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomForm() {
    return Math.round(Math.random()) * 50
}