// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

// Javascript variables defined.
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var initialsEl = document.querySelector("#initials");

var secondsLeft = 90; // Seconds left in the quiz.
var currentQuestionIndex = 0; // Set the current question index to 0.
var score = 0; // Initial score is set to 0.

// Quiz questions below.
var questions = [
  {
    question: "What kind of language is JavaScript?",
    choices: ["Procedural", "Object-Oriented", "Object-Based", "None of these"],
    answer: "Object-Oriented",
  },
  {
    question: "Which of the following keywords is used to define a variable in JavaScript?",
    choices: ["let", "mkdir", "var", "Both A and C"],
    answer: "Both A and C",
  },
  {
    question: "Where is the most appropriate place for the <script> opening and closing tags </script> in your HTMl document?",
    choices: ["Above the <body> tag", "Middle", "Right before the closing <body> tag", "None of these"],
    answer: "Right before the closing <body> tag",
  },
  {
    question: "What does the JavaScript interpreter do when it encounters an empty statement?",
    choices: ["Gives an error", "Gives a warning", "Ignores the statement", "None of thsese"],
    answer: "Ignores the statement",
  },
  {
    question: "What does a Boolean represent in JavaScript?",
    choices: ["Top/Bottom", "True/False", "Left/Right", "None of these"],
    answer: "True/False",
  },
  {
    question: "What is an Array in JavaScript?",
    choices: ["A special variable that can hold more than one value", "Arrays are not used in JavaScript", "A mathematical equation", "None of the Above"],
    answer: "A special variable that can hold more than one value",
  },
  {
    question: "What are Strings used for in JavaScript?",
    choices: ["Adding/Subtracting", "Storing and manipulating text", "True/False statements", "None of these"],
    answer: "Storing and manipulating text",
  },
  {
    question: "What is a NaN property in JavaScript?",
    choices: ["Number-a-Name", "Name-a-Number", "Not-a-Name", "Not-a-Number"],
    answer: "Not-a-Number",
  },
  {
    question: "What does DOM stand for?",
    choices: ["Data Open Model", "Data Object Mandate", "Document Open Mode", "Document Object Model"],
    answer: "Document Object Model",
  },
  {
    question: "What does parseInt() do in JavaScript?",
    choices: ["Parses a string argument and returns an integer of the specified radix", "Splits math equations", "Parts the Red Sea", "None of these"],
    answer: "Parses a string argument and returns an integer of the specified radix",
  },
];


// When the start button is clicked.
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  console.log("Start button clicked.");
  startTimer();
  displayQuestion();
}
// Timer function.
function startTimer() {
  var clock = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = "Time: " + secondsLeft;

    if (secondsLeft <= 0 || currentQuestionIndex >= questions.length) {
      clearInterval(clock);
      endQuiz();
    }
  }, 1000);
}
// Display the current question.
function displayQuestion() {
  var question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;
  choicesEl.innerHTML = "";
// Question elements.
  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var button = document.createElement("button");
    button.textContent = choice;
    button.setAttribute("data-answer", choice);
    button.addEventListener("click", checkAnswer);
    choicesEl.appendChild(button);
  }
}
// Check the answer.
function checkAnswer(event) {
  var selectedAnswer = event.target.getAttribute("data-answer");
  var correctAnswer = questions[currentQuestionIndex].answer;

  if (selectedAnswer === correctAnswer) {
    feedbackEl.textContent = "You got it right!";
    score += 10; // Increase the score by 10 for each correct answer.
  } else {
    feedbackEl.textContent = "Sorry, that's incorrect.";
    secondsLeft -= 10; // Subtract 10 seconds from the timer for each incorrect answer.
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  timerEl.textContent = "";
  questionEl.textContent = "Thanks for playing!";
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "Your final score is " + score;
  initialsEl.style.display = "block";
  document.querySelector("#submit-initials").addEventListener("click", saveScore);
}

function saveScore() {
  var initials = document.querySelector("#initials-input").value.trim();

  if (initials === "") {
    alert("Please enter your initials!");
    return;
  }

  var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
  highScores.push({ initials: initials, score: score });
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.href = "highscores.html";
}
