const startBtn = document.querySelector('#srart')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
let time = 0
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let point = 0
const colors = ['rgb(207, 222, 52)', 'rgb(201, 90, 59)' , 'rgb(51, 154, 55)', 'rgb(98, 64, 141)']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => 
{
    if (event.target.classList.contains('time-btn')) {
        time = parseInt (event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
    
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        point++
        event.target.remove()
        createRandomCircle()
    }
    
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0 ) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счёт: <span class="primary">${point} </span></h1>`
    restart.style.display = 'inline'
} 

function createRandomCircle() {
    const circle = document.createElement('div')
    const {width, height} = board.getBoundingClientRect()

    const size = getRandomNumber(15, 65)
    const x = getRandomNumber(0 + size, width - size)
    const y = getRandomNumber(0 + size, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height =  `${size}px`
    circle.style.top = (`${x}px`)
    circle.style.left = (`${y}px`)
    setColor(circle)
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
     return colors[index]
 }

