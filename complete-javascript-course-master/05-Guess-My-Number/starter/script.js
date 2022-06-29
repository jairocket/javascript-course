'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1
console.log(secretNumber)

let score = 20
let highScore = 0

function displayMessage(message, key){
    document.querySelector(key).textContent = message
}

function setStyling(key, property, value ){
    document.querySelector(key).style[property] = value
}

document.querySelector('.check').addEventListener('click', ()=> {
    const guess = Number(document.querySelector('.guess').value)
    if (!guess) {
        displayMessage('⛔ No number!', '.message')
    } else if (guess === secretNumber) {
        displayMessage('🎉 Correct Number!', '.message')
        setStyling('body', 'backgroundColor', '#60b347')
        setStyling('.number', 'width', '30rem')
        displayMessage(secretNumber, '.number')
        if(score > highScore){
            highScore = score
            displayMessage(highScore, '.highscore')
        }
    } else if (guess !== secretNumber){
        if(score >=1){
            displayMessage( guess > secretNumber ? ' Too high!' : 'Too low!', '.message')
            score --
            displayMessage(score, '.score')

        } else {
        displayMessage('Game over!', '.message')
        displayMessage(0, '.score')
    }
}
})

document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1
    console.log(secretNumber)
    displayMessage(score, '.score')
    displayMessage('Start guessing...', '.message') 
    setStyling('.number', 'width', '15rem')
    displayMessage('?', '.number')
    setStyling('body', 'backgroundColor', '#222')
    document.querySelector('.guess').value = '';

})
