var highScoreList = document.getElementById("high-score-list");
var clearHighScoresButton = document.getElementById("clear-high-scores-button");

function addToHighScoreList(highscores) {
  highscores = JSON.parse(highscores);
  highscores.forEach(function(scoreItem, index) {
    var listNumber = createListNumber(index + 1);
    var scoreList = createScoreList(scoreItem.score);
    var initialsList = createInitialsList(scoreItem.initials);
    var highScoreListComplete = completeHighScoreList(listNumber, scoreList, initialsList);
    highScoreList.appendChild(highScoreListComplete);
  });
};

function createListNumber(rank) {
  var listNumber = document.createElement('td');
  listNumber.textContent = `#${rank}`;
  return listNumber;
};

function createScoreList(score) {
  var scoreList = document.createElement('td');
  scoreList.textContent = score;
  return scoreList;
};

function createInitialsList(initials) {
  var initialsList = document.createElement('td');
  initialsList.textContent = initials;
  return initialsList;
};

function highScoresListGeneration() {
  var highscores = localStorage.getItem("scoreList");
  if (highscores) {
    addToHighScoreList(highscores);
  } 
};

function completeHighScoreList(listNumber, scoreList, initialsList) {
  var tableRow = document.createElement('tr');
  tableRow.appendChild(listNumber);
  tableRow.appendChild(scoreList);
  tableRow.appendChild(initialsList);
  return tableRow;
}

clearHighScoresButton.addEventListener('click', clearHighScores);

function clearHighScores() {
  localStorage.setItem('scoreList', []);
  while (highScoreList.children.length > 0) {
    highScoreList.removeChild(highScoreList.lastChild);
  }
};

highScoresListGeneration();