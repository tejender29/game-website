const result = document.getElementById("result");
const userScoreEl = document.getElementById("userScore");
const compScoreEl = document.getElementById("compScore");

let userScore = 0;
let compScore = 0;

function play(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const compChoice = choices[Math.floor(Math.random() * 3)];

  if (userChoice === compChoice) {
    result.innerText = `It's a draw! You both chose ${userChoice}`;
  } else if (
    (userChoice === "rock" && compChoice === "scissors") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissors" && compChoice === "paper")
  ) {
    userScore++;
    result.innerText = `You win! ${userChoice} beats ${compChoice}`;
  } else {
    compScore++;
    result.innerText = `You lose! ${compChoice} beats ${userChoice}`;
  }

  userScoreEl.innerText = userScore;
  compScoreEl.innerText = compScore;
}