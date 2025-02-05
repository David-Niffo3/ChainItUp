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
  document.getElementById("startScreen").style.display = "none";  // Verberg de startscherm
  document.getElementById("difficultyScreen").style.display = "flex";  // Laat het keuzescherm zien
});

function startGame(difficulty) {
  difficultyLevel = difficulty;
  currentChain = wordChains[difficultyLevel];
  currentWord = Object.keys(currentChain)[0];
  document.getElementById("currentWord").textContent = currentWord;

  document.getElementById("difficultyScreen").style.display = "none";  // Verberg de moeilijkheidsscherm
  document.getElementById("gameContainer").style.display = "flex";  // Laat het spel zien

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
  document.getElementById("gameContainer").style.display = "none";  // Verberg het spel
  document.getElementById("winScreen").style.display = "flex";  // Laat de winstscherm zien
}

function restartGame() {
  document.getElementById("winScreen").style.display = "none";  // Verberg de winstscherm
  document.getElementById("startScreen").style.display = "flex";  // Laat de startscherm zien
}
