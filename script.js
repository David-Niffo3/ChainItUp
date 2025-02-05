
const wordChain = {
  "apple": "tree",
  "tree": "house",
  "house": "fire",
  "fire": "fighter",
  "fighter": "jet"
};

let currentWord = "apple"; // Starting word
let score = 100; // Initial score
let bestScore = localStorage.getItem("bestScore") || 0; // Get best score from localStorage (or 0 if none)

document.getElementById("currentWord").textContent = currentWord;
document.getElementById("score").textContent = score;
document.getElementById("bestScore").textContent = bestScore; // Display best score

// Start the countdown for the score reduction
const scoreInterval = setInterval(() => {
  if (score > 0) {
      score--; // Decrease score by 1 every second
      document.getElementById("score").textContent = score; // Update score display
  }
}, 1000);

// Create the input fields for the current word
function createInputFields(word) {
  const container = document.getElementById("inputContainer");
  container.innerHTML = ""; // Clear previous input fields

  for (let i = 0; i < word.length; i++) {
      let input = document.createElement("input");
      input.type = "text";
      input.classList.add("letter-box");
      input.maxLength = 1;
      input.setAttribute("data-index", i);

      // Auto-focus to next box when typing
      input.addEventListener("input", function () {
          if (this.value.length === 1) {
              let nextInput = this.nextElementSibling;
              if (nextInput) nextInput.focus();
          }
      });

      // Move focus on backspace
      input.addEventListener("keydown", function (event) {
          if (event.key === "Backspace" && this.value === "") {
              let prevInput = this.previousElementSibling;
              if (prevInput) {
                  prevInput.value = ""; // Clear previous box
                  prevInput.focus();
              }
          }
          if (event.key === "Enter") {
              checkAnswer(); // Press Enter to submit
          }
      });

      container.appendChild(input);
  }

  // Focus first box when generating inputs
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

  if (wordChain[currentWord] === enteredWord) {
      feedback.textContent = `✅ ${currentWord} + ${enteredWord} = ${currentWord}${enteredWord}`;
      feedback.style.color = "#";336799
      feedback.classList.add("correct");
      setTimeout(() => feedback.classList.remove("correct"), 500);

      currentWord = enteredWord; // Set new word
      document.getElementById("currentWord").textContent = currentWord;

      if (!wordChain[currentWord]) {
          showWinScreen();
      } else {
          createInputFields(wordChain[currentWord]);
      }

      // Add points and update score
      score += 30;
      updateBestScore();
  } else {
      feedback.textContent = "❌ Incorrect! Try again.";
      feedback.style.color = "red";
      feedback.classList.add("wrong");
      setTimeout(() => feedback.classList.remove("wrong"), 300);
  }
}

// Update best score if necessary
function updateBestScore() {
  // Update best score if necessary
  if (score > bestScore) {
      bestScore = score;
      localStorage.setItem("bestScore", bestScore); // Save best score to localStorage
      document.getElementById("bestScore").textContent = bestScore; // Display best score
  }
}

// Show win screen
function showWinScreen() {
  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("winScreen").classList.remove("hidden");

  // Clear the score interval when the game is won
  clearInterval(scoreInterval);
}

// Restart game
function restartGame() {
  score = 100; // Reset score to initial value
  currentWord = "apple";
  document.getElementById("currentWord").textContent = currentWord;
  document.getElementById("score").textContent = score;
  document.getElementById("gameContainer").classList.remove("hidden");
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("feedback").textContent = "";
  createInputFields(wordChain[currentWord]);

  // Restart the countdown for the score
  clearInterval(scoreInterval);
  setInterval(() => {
      if (score > 0) {
          score--; // Decrease score by 1 every second
          document.getElementById("score").textContent = score; // Update score display
      }
  }, 1000);
}
