// ---------- Game state ----------
let gameStarted = false;          // becomes true after a valid name is entered
let wins = 0;                     // number of wins
let losses = 0;                   // number of losses
let draws = 0;                    // number of draws
let results = [];                 // stores "Win", "Lose" or "Draw" for every round

// Header row of the history table (used again when the game is reset)
const historyHeader =
  "<thead><tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr></thead>";

// read the name, if its empty show the alert and stop.
function startGame() {
  let name = document.getElementById("playerName").value.trim();

  // Stop if the name is empty
  if (name === "") {
    alert("Please enter your name.");
    return;
  }

//if its true, display "Welcome" using innerHTML
//show start date and time in startTime 
//allow the game to start
  document.getElementById("welcome").innerHTML = "Welcome, " + name + "!";
  document.getElementById("startTime").innerHTML = "Game started: " + new Date();

  gameStarted = true;             // allow the game to start
}

// use an array for rock paper scissors 
//use Math.random to return a random choice
function getComputerChoice() {
  let choices = ["rock", "paper", "scissors"];
  let index = Math.floor(Math.random() * 3);   // 0, 1 or 2
  return choices[index];
}

// if the game hasnt started show alert 
function playRound(playerChoice) {
  // The game must be started first
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  //otherwise get computer choice 
  let computerChoice = getComputerChoice();
  let outcome;                    // "Win", "Lose" or "Draw"
  let colour;                     // colour of the result message

  // Decide the result: rock beats scissors, scissors beats paper, paper beats rock
  if (playerChoice === computerChoice) {
    outcome = "Draw";
    colour = "grey";
    draws++;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    outcome = "Win";
    colour = "green";
    wins++;
  } else {
    outcome = "Lose";
    colour = "red";
    losses++;
  }

  // Change the src of both images
  document.getElementById("playerImg").src = playerChoice + ".png";
  document.getElementById("computerImg").src = computerChoice + ".png";

  // Show the result and change its colour
  let resultElement = document.getElementById("result");
  resultElement.innerHTML = "You " + outcome.toLowerCase() + "! (" +
    playerChoice + " vs " + computerChoice + ")";
  resultElement.style.color = colour;

  // Update the scoreboard
  document.getElementById("wins").innerHTML = wins;
  document.getElementById("losses").innerHTML = losses;
  document.getElementById("draws").innerHTML = draws;

  // Store the result and add a new row to the history table
  results.push(outcome);
  document.getElementById("history").innerHTML +=
    "<tr><td>" + results.length + "</td><td>" + playerChoice +
    "</td><td>" + computerChoice + "</td><td>" + outcome + "</td></tr>";
}

// showSummary()
function showSummary() {
  let total = results.length;

  if (total === 0) {
    document.getElementById("summary").innerHTML = "No rounds played yet.";
    return;
  }

  // Count the wins with a for loop
  let winCount = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i] === "Win") {
      winCount++;
    }
  }

  // Win percentage rounded with Math.round()
  let percentage = Math.round((winCount / total) * 100);
  document.getElementById("summary").innerHTML =
    "You played " + total + " rounds and won " + percentage + "%";
}

// resetGame(): set everything back to the beginning
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  results = [];                   // empty the results array

  // Scores back to 0
  document.getElementById("wins").innerHTML = 0;
  document.getElementById("losses").innerHTML = 0;
  document.getElementById("draws").innerHTML = 0;

  // Clear history rows (keep the header row), result and summary messages
  document.getElementById("history").innerHTML = historyHeader;
  document.getElementById("result").innerHTML = "";
  document.getElementById("summary").innerHTML = "";

  // Clear the two images back to the blank placeholder
  let blank = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  document.getElementById("playerImg").src = blank;
  document.getElementById("computerImg").src = blank;

    // Reset the player's name and start state
  document.getElementById("playerName").value = "";   // clear the name input box
  document.getElementById("welcome").innerHTML = "";  // clear the "Welcome, <name>!" message
  document.getElementById("startTime").innerHTML = ""; // clear the start date and time
  gameStarted = false;                                 // player must click Start Game again
}
