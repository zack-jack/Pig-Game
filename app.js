/**
 * GAME RULES:
 *
 * - The game has 2 players, playing in rounds
 * - In each turn, a player rolls a dice as many times as he whishes. Each
 *   result get added to his ROUND score
 * - BUT, if the player rolls a 1, all his ROUND score gets lost. After that,
 *   it's the next player's turn
 * - The player can choose to 'Hold', which means that his ROUND score gets
 *   added to his GLBAL score. After that, it's the next player's turn
 * - The first player to reach 100 points on GLOBAL score wins the game
 *
 */

var scores, roundScore, activePlayer, gamePlaying;

// Function to initialize a new game
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Hides the dice img in the beginning
  document.querySelector(".dice").style.display = "none";

  // Sets all scores to 0 in the beginning
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Changes player names back on new game reset
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  // Remove winner class
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  // Remove active class
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  // Make player 1 active player
  document.querySelector(".player-0-panel").classList.add("active");
}

// Initializes a new game in the beginning
init();

// Toggles to next player and resets current score to 0
function nextPlayer() {
  // Next player's turn
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // Resets CURRENT score to zero
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Toggle active player status to show in UI
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Hides the dice img in the initial state once the player switches turns
  document.querySelector(".dice").style.display = "none";
}

// Roll Dice
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Generate random dice number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOMSelector = document.querySelector(".dice");
    diceDOMSelector.style.display = "block";
    diceDOMSelector.src = "dice-" + dice + ".png";
    document.querySelector("#current-" + activePlayer).textContent = dice;

    // 3. Update the round score IF the rolled number is NOT a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player's turn
      nextPlayer();
    }
  }
});

// Hold button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if the player has won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      // Ends the game
      gamePlaying = false;
    } else {
      // Next player's turn
      nextPlayer();
    }
  }
});

// New game initialization button
document.querySelector(".btn-new").addEventListener("click", init);
