const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const clear = document.querySelector("#clear");


highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});