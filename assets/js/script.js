var time;
var timeEl = document.querySelector(".time");
var startButton = document.querySelector("#start-button");
var submitButton
var viewHighscoreBtn   


var quiz = [
    {
        question: 'Commonly used data types DO Not include:',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswer: 2
    },

    {
        question: 'The condition in an if/else statement is enclosed with:',
        answers: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        correctAnswer: 2
    },

    {
        question: 'Arrays in Javascript can be used to store:',
        answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        correctAnswer: 3
    },

    {
        question: 'String values must be enclosed within ______ when being assigned to variables',
        answers: ['commas', 'curly brackets', 'quotes', 'paranthesis'],
        correctAnswer: 2
    },

    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers:  ['javaScript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: 3
    },
];

var timerPreset = 75;
var timeLeft = timerPreset;
var score = 0;
var gameEnded = true; 




// function setTimerText() {
//     timeEl.textContent = time;
// }

function startQuiz() {
    timeLeft = 75;
}



// document.getElementById("start-button").addEventListener("click", function() {
//     var time = 75;
// })

startButton.addEventListener("click", startQuiz);