const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const clear = document.querySelector('#clear');

// adds highscore in a li to ul
highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join('');

// clears high score list
clear.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});
