var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
if (highScores.length > 0) {
    highScores.forEach(function (score) {
        console.log(score);
        console.log(score.initials);

var li = document.createElement("li");
li.textContent = `${score.initials} - ${score.score}`;
document.getElementById("high-scores-list").appendChild(li);
    });
}
