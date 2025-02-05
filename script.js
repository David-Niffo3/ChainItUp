const wordChain = {
  "apple": "tree",
  "tree": "house",
  "house": "fire",
  "fire": "fighter",
  "fighter": "jet"
};

let currentWord = "apple"; 
let score = 0;  // Initialize score
document.getElementById("currentWord").textContent = currentWord;
document.getElementById("score").textContent = score;

function createInputFields(word) {
  const container = document.getElementById("inputContainer");
  container.innerHTML = "";

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
                  prevInput.value = "";
                  prevInput.focus();
              }
          }
          if (event.key === "Enter") {
              checkAnswer(); 
          }
      });

      container.appendChild(input);
  }

  if (container.firstChild) {
      container.firstChild.focus();
  }
}

createInputFields(wordChain[currentWord]);

function checkAnswer() {
  let inputLetters = document.querySelectorAll(".letter-box");
  let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
  let feedback = document.getElementById("feedback");

  if (wordChain[currentWord] === enteredWord) {
      feedback.textContent = `✅ Correct!`;
      feedback.style.color = "#ffcc00";
      feedback.classList.add("correct");
      setTimeout(() => feedback.classList.remove("correct"), 500);

      score++;  // Increase score when correct
      document.getElementById("score").textContent = score;  // Update score display

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

function showWinScreen() {
  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("winScreen").classList.remove("hidden");
  document.getElementById("finalScore").textContent = score; // Show final score
}

function restartGame() {
  currentWord = "apple";
  score = 0;  // Reset score
  document.getElementById("score").textContent = score;
  document.getElementById("currentWord").textContent = currentWord;
  document.getElementById("gameContainer").classList.remove("hidden");
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("feedback").textContent = "";
  createInputFields(wordChain[currentWord]);
}
