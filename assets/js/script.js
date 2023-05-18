var start = document.querySelector(".start-card");
var instructions = document.querySelector(".start-card + p");
var questionCard = document.querySelector("#question-card");
var questionText = document.querySelector("#question-text");
var scoreCard = document.querySelector("#score-card");
var leaderBoard = document.querySelector(".leader-board");
var startBtn = document.querySelector("#startBtn");
var submitBtn = document.querySelector("#submit-button");
var timeDisplay = document.querySelector("#time");
var result = document.querySelector("#result");
var resultText = document.querySelector("#result-text");
var intervals;
var time;
var currentQuestion;
var score = document.querySelector("#score");
var inputEl = document.querySelector("#initials");
var highscoreList= document.querySelector("#highscore-list")
// var viewHighscoreBtn = document.querySelector();

var questions = [
    {
      questionText: 'Commonly used data types DO Not include:',
      options: ['strings', 'booleans', 'alerts', 'numbers'],
      correctAnswer: 2
    },

    {
      questionText: 'The condition in an if/else statement is enclosed with:',
      options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
      correctAnswer: 2
    },

    {
      questionText: 'Arrays in Javascript can be used to store:',
      options: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
      correctAnswer: 3
    },

    {
      questionText: 'String values must be enclosed within ______ when being assigned to variables',
      options: ['commas', 'curly brackets', 'quotes', 'paranthesis'],
      correctAnswer: 2
    },

    {
      questionText: 'A very useful tool used during development and debugging for printing content to the debugger is:',
      options: ['javaScript', 'terminal/bash', 'for loops', 'console.log'],
      correctAnswer: 3
    },
];
//set up
function hideCards() {
  startBtn.setAttribute("hidden", "false");
//   start.setAttribute("hidden", "true");
  questionCard.setAttribute("hidden", "true");
  instructions.setAttribute("hidden", "true");
  questionText.setAttribute("hidden", "true");
  scoreCard.setAttribute("hidden", "true");
  leaderBoard.setAttribute("hidden", "true");
}

function hideResultText() {
    result.style.display = "none";
}

function startQuiz() {
  hideCards();
  questionText.removeAttribute("hidden");
  currentQuestion = 0;
  displayQuestion();

  time = 75;
  intervals = setInterval(countDown, 1000);
  displayTime();
}

startBtn.addEventListener("click", startQuiz);

function countDown() {
  time--;
  displayTime();
  if (time <1) {
      endQuiz();
  }
}

function displayTime() {
  timeDisplay.textContent = time;
}

function displayQuestion() {
    questionCard.removeAttribute("hidden")
    var question = questions[currentQuestion];
    var options = question.options;
    questionText.textContent = question.questionText;

    for (let i = 0; i < options.length; i++) {
        var option = options[i];
        let optionButton = document.querySelector("#option" + i);
        optionButton.textContent = option;
    }
}

document.querySelector("#quiz-options").addEventListener("click", checkAnswer);

function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions [currentQuestion].answer;
}

function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    result.style.display=  "block";
    if (optionIsCorrect(optionButton)) {
        resultText.textContent = "Correct!";
        setTimeout(hideResultText, 1000);
    } else {
        resultText.textContent = "Incorrect!";
        setTimeout(hideResultText, 1000);
        if ( time >= 10) {
            time = time -12;
            displayTime();
        } else {
            time = 0;
            dispalyTime();
            endQuiz();
        }
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(intervals);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
}

submitBtn.addEventListener("click", storeScore);

function storeScore(event) {
    event.preventDefault();

let leaderboardItems = {
    initials: inputEl.value,
    score: time,
};

updateStoredLeaderboard(leaderboardItems);
hideCards();
leaderBoard.removeAttribute("hidden");
renderLeaderboard();
}

function updateStoredLeaderboard(leaderboardItems) {
    let leaderboardArray = getLeaderboard();
    leaderboardArray.push(leaderboardItems);
    localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArray");
    if (storedLeaderboard !== null) {
        let leaderboardArray = JSON.parse(storedLeaderboard);
        return leaderboardArray;
    } else{
        leaderboardArray = [];
    }
    return leaderboardArray;
}

function renderLeaderboard() {
    let sortedLeaderboardArray = sortLeaderboard();
    var highscoreList = document.querySelector("#highscore-list");
    highscoreList.innerHTML = "";
    for (let i=0; i < sortedLeaderboardArray.length; i++) {
        let leaderboardEntry = sorted.leaderboardArray[i];
        let newListItem = document.createElement("li");
        newListItem.textContent =
        leaderboardEntry.initials + " - " + leaderboardEntry.score;
        highscoreList.append(newListItem);
    }
}

function sortLeaderboard() {
    let leaderboardArray = getLeaderboard();
    if (!leaderboardArray) {
        return;
    }
    leaderboardArray.sort(function (a, b) {
        return b.score - a.score;
    } );
    return leaderboardArray;
}

var clearBtn = document.querySelector("#clear-button");
clearBtn.addEventListener("click", clearHighscores);

function clearHighscores() {
    localStorage.clear();
    renderLeaderboard();
}

var backBtn = document.querySelector("#back-button");
backBtn.addEventListener("click", returnToStart);

function returnToStart() {
    hideCards();
    start.removeAttribute("hidden");
}

var leaderboardHeader = document.querySelector(".leaderboard-header");
leaderboardHeader.addEventListener("click", showLeaderboard);

function showLeaderboard() {
    hideCards();
    leaderBoard.removeAttribute("hidden");

    clearInterval(intervals);

    time = undefined;
    displayTime();

    renderLeaderboard();
}





// // function setTimerText() {
// //     timeEl.textContent = time;