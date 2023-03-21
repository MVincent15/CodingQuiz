var quiz = document.querySelectorAll(".quiz");
var startQuiz = document.getElementById("start-quiz");
var startButton = document.getElementById("start-quiz-button");


var questionsPage = document.getElementById("questions-page");
var timeRemaining = document.getElementById("time-remaining");
var quizQuestion = document.getElementById("question");
var answerChoices = document.getElementById("answer-choices");
var feedback = document.querySelectorAll(".feedback");
var feedbackCorrect = document.getElementById("feedback-correct");
var feedbackWrong = document.getElementById("feedback-wrong");


var finalPage = document.getElementById("final-page");
var allDone = document.getElementById("all-done");
var takeScore = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var sendScore = document.getElementById("send-score");

//Tutor helped to form the questons input//
class Question {
  constructor(question, choices, indexOfCorrectChoice) {
    this.question = question;
    this.choices = choices;
    this.indexOfCorrectChoice = indexOfCorrectChoice;
  }
}
var question1 = new Question("Commonly used data types DO NOT include: ", 
  ["1. strings", "2. booleans", "3. alerts", "4. numbers"], 2);
var question2 = new Question("The condition in an if/else statement is enclosed within ____.", 
  ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"], 2);
var question3 = new Question("String values must be enclosed within _____ when being assigned to variables.", 
  ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"], 2);
var question4 = new Question("Arrays in JavaScript can be used to store ____.", 
  ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"], 3);
var question5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is: ", 
  ["1. javaScript", "2. terminal/bash", "3. for loops", "4. console.log"], 3);
var questionChoices = [question1, question2, question3, question4, question5];

var currentQuestion = 0;

var totalTime = 75;
var timeInterval;
var timeOut; 

function time() {
  timeRemaining.textContent = totalTime;
};

function endGameTime() {
  if (totalTime <= 0) {
    totalTime = 0;
    endGame();
  }
};

function startTimer() {
  timeInterval = setInterval(function() {
    totalTime--;
    time();
    endGameTime();

  }, 1000);
};



function bringToFront(list, bringToFront) {
  for (element of list) {
    hideFunction(element);
  }
  bringToFront.classList.remove("hide");
};

function hideFunction(element) {
  if (!element.classList.contains("hide")) {
    element.classList.add("hide");
  }
};

startButton.addEventListener('click', startQuizFunction);

function startQuizFunction() {
  bringToFront(quiz, questionsPage);
  time();  
  questionsDisplay();
  startTimer();
};

function answerChoicesFunction() {
  answerChoices.innerHTML = "";

  questionChoices[currentQuestion].choices.forEach(function(answer, index) {
    var li = document.createElement("li");
    li.dataset.index = index;
    var button = document.createElement("button");
    button.textContent = (index + 1) + answer;
    li.appendChild(button);
    answerChoices.appendChild(li);
  });
};

function questionsDisplay() {
  quizQuestion.textContent = questionChoices[currentQuestion].question;
  answerChoicesFunction();
};

answerChoices.addEventListener('click', userAnswerChoice);

function resetChoices() {
  clearTimeout(timeOut);
};

function correctChoice(choice) {
  return choice === questionChoices[currentQuestion].indexOfCorrectChoice;
};

function checkUserChoice(userChoice) {
  if (correctChoice(userChoice)) {
    correctChoiceDisplay();
  } else {
    wrongChoiceDisplay();
  }
};

function wrongChoiceDisplay() {
  wrongChoiceTimeDeduct(10);
  bringToFront(feedback, feedbackWrong);
  timeOut = setTimeout(function() {
    hideFunction(feedbackWrong);
    
  }, 1000);
};
function wrongChoiceTimeDeduct(seconds) {
  totalTime -= seconds;
  endGameTime();
  time();
};

var finalScore = 0;
function correctChoiceDisplay() {
  bringToFront(feedback, feedbackCorrect);
  finalScore++;
  timeOut = setTimeout(function() {
    hideFunction(feedbackCorrect)  ;
  }, 1000);
};

function userAnswerChoice(event) {
  var userChoice = parseInt(event.target.parentElement.dataset.index);
  resetChoices();

  checkUserChoice(userChoice);
  nextQuestion();
};


function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questionChoices.length) {
    endGame();
  } else {
    questionsDisplay();
  }
}
 
function displayScore() {
  takeScore.textContent = finalScore;
};

function endGame() {
  clearInterval(timeInterval);
  
  bringToFront(quiz, finalPage);
  displayScore();
};


sendScore.addEventListener('submit', sendScoreFunction);

function getHighScore(initials, score) {
  var viewList = {
    initials: initials,
    score: score,
  }
  return viewList;
};
function sendScoreFunction(event) {
  event.preventDefault();
  var initials = initialsInput.value.toUpperCase();
  if (initials) {
    var score = finalScore;
    var highScoreEntry = getHighScore(initials, score);
    saveInitialsScore(highScoreEntry);
    window.location.href= "./viewhighscores.html";
  }
};

function scoreIndex(newEntry, scoreList) {
  if (scoreList.length > 0) {
    for (let i = 0; i < scoreList.length; i++) {
      if (scoreList[i].score <= newEntry.score) {
        return i;
      }
    } 
  }
  return scoreList.length;
};


function putInViewHighScore(newEntry, scoreList) {
  var newScoreIndex = scoreIndex(newEntry, scoreList);
  scoreList.splice(newScoreIndex, 0, newEntry);
};

function scoreListFunction() {
  var currentScores = localStorage.getItem('scoreList');
  if (currentScores) {
    return JSON.parse(currentScores);
  } else {
    return [];
  }
};

function saveInitialsScore(highScoreEntry) {
  var currentScores = scoreListFunction();
  putInViewHighScore(highScoreEntry, currentScores);
  localStorage.setItem('scoreList', JSON.stringify(currentScores));
};


