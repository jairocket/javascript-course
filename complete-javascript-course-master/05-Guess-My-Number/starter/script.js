'use strict';

// console.log(document.querySelector('.message').textContent)
// document.querySelector('.message').textContent = '🎉 Correct Number!' 

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 23
// console.log(document.querySelector('.guess').value)

let secretNumber = Math.trunc(Math.random() * 20) + 1
console.log(secretNumber)

let score = 20
let highScore = 0

document.querySelector('.check').addEventListener('click', ()=> {
    const guess = Number(document.querySelector('.guess').value)
    if (!guess) {
        document.querySelector('.message').textContent = '⛔ No number!'
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = '🎉 Correct Number!'
        document.querySelector("body").style.backgroundColor = '#60b347'
        document.querySelector('.number').style.width = '30rem'
        document.querySelector('.number').textContent = secretNumber
        if(score > highScore){
            highScore = score
            document.querySelector('.highscore').textContent = highScore
        }
    } else if (guess > secretNumber) {
        if(score > 1){
            document.querySelector('.message').textContent = 'Too high!'
            score --
            document.querySelector('.score').textContent = score
        }else{
            document.querySelector('.message').textContent = 'Game over!'
            document.querySelector('.score').textContent = 0
        }   
    } else if (guess < secretNumber) {
        if(score > 0){
            document.querySelector('.message').textContent = 'Too low!'
            score --
            document.querySelector('.score').textContent = score
        }else{
            document.querySelector('.message').textContent = 'Game over!'
            document.querySelector('.score').textContent = 0
        }     
    }
})

document.querySelector('.again').addEventListener('click', () => {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1
    console.log(secretNumber)

    document.querySelector('.score').textContent = score   
    document.querySelector('.message').textContent = 'Start guessing...'
    document.querySelector('.number').style.width = '15rem'
    document.querySelector('.number').textContent = "?"
    document.querySelector('body').style.backgroundColor = '#222'
    document.querySelector('.guess').value = '';

})
