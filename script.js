const wordChains = {
  easy: {
      "apple": "tree",
      "tree": "house",
      "house": "fire",
      "fire": "fighter",
      "fighter": "jet"
  },
  medium: {
      "apple": "banana",
      "banana": "cherry",
      "cherry": "fruit",
      "fruit": "salad",
      "salad": "dressing"
  },
  hard: {
      "zebra": "stripes",
      "stripes": "tiger",
      "tiger": "jungle",
      "jungle": "rainforest",
      "rainforest": "animals"
  }
};

let currentWord = "";
let currentChain = {};
let difficultyLevel = "";

document.getElementById("playButton").addEventListener("click", function() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("difficultyScreen").classList.remove("hidden");
});

function startGame(difficulty) {
  difficultyLevel = difficulty;
  currentChain = wordChains[difficultyLevel];
  currentWord = Object.keys(currentChain)[0];
  document.getElementById("currentWord").textContent = currentWord;

  document.getElementById("difficultyScreen").classList.add("hidden");
  document.getElementById("gameContainer").classList.remove("hidden");

  createInputFields(currentChain[currentWord]);
}

function createInputFields(word) {
  const container = document.getElementById("inputContainer");
  container.innerHTML = ""; // Clear previous input fields

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
}

function checkAnswer() {
  let inputLetters = document.querySelectorAll(".letter-box");
  let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
  let feedback = document.getElementById("feedback");

  if (currentChain[currentWord] === enteredWord) {
      feedback.textContent = `✅ ${currentWord} + ${enteredWord} = ${currentWord}${enteredWord}`;
      feedback.style.color = "#ffcc00";
      feedback.classList.add("correct");
      setTimeout(() => feedback.classList.remove("correct"), 500);

      currentWord = enteredWord;
      document.getElementById("currentWord").textContent = currentWord;

      if (!currentChain[currentWord]) {
          showWinScreen();
      } else {
          createInputFields(currentChain[currentWord]);
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
}

function restartGame() {
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("startScreen").classList.remove("hidden");
}
