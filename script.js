const wordChain = {
  "apple": "tree",
  "tree": "house",
  "house": "fire",
  "fire": "fighter",
  "fighter": "jet"
};

let currentWord = "apple"; // Startwoord
let score = 100; // Startscore
let bestScore = localStorage.getItem("bestScore") || 0; // Beste score uit localStorage
let hintTimer; // Timer voor hints

document.getElementById("currentWord").textContent = currentWord;
document.getElementById("score").textContent = score;
document.getElementById("bestScore").textContent = bestScore;

// Start score countdown
const scoreInterval = setInterval(() => {
  if (score > 0) {
    score--;
    document.getElementById("score").textContent = score;
  }
}, 1000);

// Maak invoervelden aan voor het huidige woord
function createInputFields(word) {
  const container = document.getElementById("inputContainer");
  container.innerHTML = ""; // Verwijder oude invoervelden

  for (let i = 0; i < word.length; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("letter-box");
    input.maxLength = 1;
    input.setAttribute("data-index", i);

    // Automatisch naar volgende box springen
    input.addEventListener("input", function () {
      if (this.value.length === 1) {
        let nextInput = this.nextElementSibling;
        if (nextInput) nextInput.focus();
      }
    });

    // Backspace functionaliteit
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

  // Zet de focus op het eerste invoerveld
  if (container.firstChild) {
    container.firstChild.focus();
  }

  // Start hint-timer van 30 seconden
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => giveHint(word), 30000);
}

// Geef een willekeurige letter cadeau als de speler het woord niet binnen 30 seconden raadt
function giveHint(word) {
  let inputLetters = document.querySelectorAll(".letter-box");
  let correctWord = wordChain[currentWord];

  // Maak een lijst van lege velden
  let emptyIndices = [];
  for (let i = 0; i < correctWord.length; i++) {
    if (inputLetters[i].value === "") {
      emptyIndices.push(i);
    }
  }

  // Kies willekeurig een lege positie en vul de juiste letter in
  if (emptyIndices.length > 0) {
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    inputLetters[randomIndex].value = correctWord[randomIndex];
  }
}

// Check het ingevoerde antwoord
function checkAnswer() {
  let inputLetters = document.querySelectorAll(".letter-box");
  let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
  let feedback = document.getElementById("feedback");

  if (wordChain[currentWord] === enteredWord) {
    feedback.textContent = `✅ ${currentWord} + ${enteredWord} = ${currentWord}${enteredWord}`;
    feedback.style.color = "#336799";
    feedback.classList.add("correct");
    setTimeout(() => feedback.classList.remove("correct"), 500);

    currentWord = enteredWord;
    document.getElementById("currentWord").textContent = currentWord;

    if (!wordChain[currentWord]) {
      showWinScreen();
    } else {
      createInputFields(wordChain[currentWord]);
    }

    // Voeg punten toe en update score
    score += 30;
    updateBestScore();
  } else {
    feedback.textContent = "❌ Incorrect! Try again.";
    feedback.style.color = "red";
    feedback.classList.add("wrong");
    setTimeout(() => feedback.classList.remove("wrong"), 300);
  }
}

// Update de beste score als nodig
function updateBestScore() {
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    document.getElementById("bestScore").textContent = bestScore;
  }
}

// Laat het win-scherm zien
function showWinScreen() {
  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("winScreen").classList.remove("hidden");
  clearInterval(scoreInterval);
}

// Start het spel opnieuw
function restartGame() {
  score = 100;
  currentWord = "apple";
  document.getElementById("currentWord").textContent = currentWord;
  document.getElementById("score").textContent = score;
  document.getElementById("gameContainer").classList.remove("hidden");
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("feedback").textContent = "";
  createInputFields(wordChain[currentWord]);

  // Start de score countdown opnieuw
  clearInterval(scoreInterval);
  setInterval(() => {
    if (score > 0) {
      score--;
      document.getElementById("score").textContent = score;
    }
  }, 1000);
}

// Start het eerste woord
createInputFields(wordChain[currentWord]);
