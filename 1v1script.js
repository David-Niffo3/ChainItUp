const wordChain = {
  "apple": "tree",
  "tree": "house",
  "house": "fire",
  "fire": "fighter",
  "fighter": "jet"
};

let currentWord = "apple";
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;  // Start met Player 1

document.getElementById("currentWord").textContent = currentWord;

// Create input fields for the current word
function createInputFields(word) {
  const container = document.getElementById("inputContainer");
  container.innerHTML = "";  // Clear previous input fields

  for (let i = 0; i < word.length; i++) {
      let input = document.createElement("input");
      input.type = "text";
      input.classList.add("letter-box");
      input.maxLength = 1;
      input.setAttribute("data-index", i);

      input.addEventListener("input", function () {
          if (this.value.length === 1) {
              let nextInput = this.nextElementSibling;
              if (nextInput) nextInput.focus();
          }
      });

      input.addEventListener("keydown", function (event) {
          if (event.key === "Backspace" && this.value === "") {
              let prevInput = this.previousElementSibling;
              if (prevInput) {
                  prevInput.value = "";  // Clear previous box
                  prevInput.focus();
              }
          }
          if (event.key === "Enter") {
              checkAnswer();  // Press Enter to submit
          }
      });

      container.appendChild(input);
  }

  // Focus the first box when generating inputs
  if (container.firstChild) {
      container.firstChild.focus();
  }
}

// Initialize the first input fields
createInputFields(wordChain[currentWord]);

// Check the entered answer
function checkAnswer() {
  let inputLetters = document.querySelectorAll(".letter-box");
  let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
  let feedback = document.getElementById("feedback");

  // Check if the entered word matches the word in the chain
  if (wordChain[currentWord] === enteredWord) {
      feedback.textContent = `✅ Correct! ${currentWord} + ${enteredWord} = ${currentWord}${enteredWord}`;
      feedback.style.color = "green";
      feedback.classList.add("correct");
      setTimeout(() => feedback.classList.remove("correct"), 500);

      currentWord = enteredWord;  // Set new word
      document.getElementById("currentWord").textContent = currentWord;

      // Check if there's no next word in the chain
      if (!wordChain[currentWord]) {
          showWinScreen();
      } else {
          createInputFields(wordChain[currentWord]);
      }

      // Add points and update score for current player
      if (currentPlayer === 1) {
          player1Score += 30;
          document.getElementById("player1Score").textContent = player1Score;
      } else {
          player2Score += 30;
          document.getElementById("player2Score").textContent = player2Score;
      }

      // Switch player turn
      currentPlayer = currentPlayer === 1 ? 2 : 1;

  } else {
      feedback.textContent = "❌ Incorrect! Try again.";
      feedback.style.color = "red";
      feedback.classList.add("wrong");
      setTimeout(() => feedback.classList.remove("wrong"), 300);
  }
}

// Show win screen when the game is over
function showWinScreen() {
  alert("Game Over! Player 1 score: " + player1Score + ", Player 2 score: " + player2Score);
}

// Restart the game
function restartGame() {
  currentWord = "apple";
  player1Score = 0;
  player2Score = 0;
  currentPlayer = 1;
  document.getElementById("currentWord").textContent = currentWord;
  document.getElementById("player1Score").textContent = player1Score;
  document.getElementById("player2Score").textContent = player2Score;
  document.getElementById("feedback").textContent = "";
  createInputFields(wordChain[currentWord]);
}

