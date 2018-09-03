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

var scores, roundScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

// Hides the dice img in the beginning
document.querySelector(".dice").style.display = "none";

// Sets all scores to 0 in the beginning
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

// Roll Dice
document.querySelector(".btn-roll").addEventListener("click", function() {
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
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
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
});
