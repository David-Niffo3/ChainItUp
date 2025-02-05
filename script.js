const wordChain = {
  "apple": "tree",
  "tree": "house",
  "house": "fire",
  "fire": "fighter",
  "fighter": "jet"
};

let currentWord = "apple"; // Starting word
document.getElementById("currentWord").textContent = currentWord;

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

// Initialize first input fields
createInputFields(wordChain[currentWord]);

function checkAnswer() {
  let inputLetters = document.querySelectorAll(".letter-box");
  let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
  let feedback = document.getElementById("feedback");

  if (wordChain[currentWord] === enteredWord) {
      feedback.textContent = `✅ ${enteredWord};
      feedback.style.color = "#336799";
      feedback.classList.add("correct");
      setTimeout(() => feedback.classList.remove("correct"), 500);

      currentWord = enteredWord; // Set new word
      document.getElementById("currentWord").textContent = currentWord;

      if (!wordChain[currentWord]) {
          showWinScreen();
      } else {
          createInputFields(wordChain[currentWord]);
      }
  } else {
      feedback.textContent = "❌ Incorrect! Try again.";
      feedback.style.color = "red";
      feedback.classList.add("wrong");
      setTimeout(() => feedback.classList.remove("wrong"), 300);
  }
}

// Show win screen
function showWinScreen() {
  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("winScreen").classList.remove("hidden");
}

// Restart game
function restartGame() {
  currentWord = "apple";
  document.getElementById("currentWord").textContent = currentWord;
  document.getElementById("gameContainer").classList.remove("hidden");
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("feedback").textContent = "";
  createInputFields(wordChain[currentWord]);
}
