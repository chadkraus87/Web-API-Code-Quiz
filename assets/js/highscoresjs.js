var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
if (highScores.length > 0) {
    highScores.forEach(function (score) {
        console.log(score);
        console.log(score.initials);
//         var tr = document.createElement("tr");
// var initialstd = document.createElement("td");
// var scoretd = document.createElement("td");
// var score = document.createElement("p");
// var initials = document.createElement("p");
// initials.textContent = `${score.initials}`;
// initialstd.appendChild(initials);
// score.innerText = score.score;
// scoretd.appendChild(score);
// tr.append(initialstd, scoretd);

var li = document.createElement("li");
li.textContent = `${score.initials} - ${score.score}`;
document.getElementById("high-scores-list").appendChild(li);
    });
}
