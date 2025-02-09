const wordChain = {
  "apple": "tree",
  "tree": "house",
  "house": "fire",
  "fire": "fighter",
  "fighter": "jet",
  "jet": "engine",
  "engine": "speed",
  "speed": "limit",
  "limit": "break",
  "break": "dance",
  "dance": "floor",
  "floor": "lamp",
  "lamp": "light",
  "light": "bulb",
  "bulb": "plant",
  "plant": "growth",
  "growth": "mind",
  "mind": "game",
  "game": "level",
  "level": "boss",
  "boss": "fight",
  "fight": "arena",
  "arena": "crowd",
  "crowd": "cheer",
  "cheer": "happy",
  "happy": "smile",
  "smile": "teeth",
  "teeth": "brush",
  "brush": "paint",
  "paint": "color"
};

let currentWord = "apple";
let score = 100;
let bestScore = localStorage.getItem("bestScore") || 0;
let hintTimer;

document.getElementById("currentWord").textContent = currentWord;
document.getElementById("score").textContent = score;
document.getElementById("bestScore").textContent = bestScore;

const scoreInterval = setInterval(() => {
  if (score > 0) {
    score--;
    document.getElementById("score").textContent = score;
  }
}, 1000);

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
        if (nextInput && !nextInput.disabled) nextInput.focus();
      }
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Backspace" && this.value === "") {
        let prevInput = this.previousElementSibling;
        if (prevInput && !prevInput.disabled) {
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

  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => giveHint(word), 30000);
}

function giveHint(word) {
  let inputLetters = document.querySelectorAll(".letter-box");
  let correctWord = wordChain[currentWord];

  for (let i = 0; i < correctWord.length; i++) {
    if (inputLetters[i].value === "") {
      inputLetters[i].value = correctWord[i];
      inputLetters[i].disabled = true; // Vergrendelt de hintletter
      inputLetters[i].classList.add("hint-letter"); // Optioneel: visuele stijl toevoegen
      break;
    }
  }
}

// Check de ingevoerde antwoord
function checkAnswer() {
  let inputLetters = document.querySelectorAll(".letter-box");
  let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
  let feedback = document.getElementById("feedback");

  if (wordChain[currentWord] === enteredWord) {
      feedback.textContent = `✅ ${currentWord} + ${enteredWord} = ${currentWord}${enteredWord}`;
      feedback.style.color = "#336799";
      feedback.classList.add("correct");
      setTimeout(() => feedback.classList.remove("correct"), 500);

      currentWord = enteredWord; // Zet het nieuwe woord
      document.getElementById("currentWord").textContent = currentWord;

      if (!wordChain[currentWord]) {
          showWinScreen();
      } else {
          createInputFields(wordChain[currentWord]);
      }

      // Speel het juiste geluid af
      playCorrectSound();

      // Voeg punten toe en update de score
      score += 30;
      updateBestScore();
  } else {
      feedback.textContent = "❌ Incorrect! Try again.";
      feedback.style.color = "red";
      feedback.classList.add("wrong");
      setTimeout(() => feedback.classList.remove("wrong"), 300);

      // Speel het foute geluid af
      playWrongSound();
  }
}


function updateBestScore() {
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    document.getElementById("bestScore").textContent = bestScore;
  }
}

function showWinScreen() {
  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("winScreen").classList.remove("hidden");
  clearInterval(scoreInterval);
}

function restartGame() {
  score = 100;
  currentWord = "apple";
  document.getElementById("currentWord").textContent = currentWord;
  document.getElementById("score").textContent = score;
  document.getElementById("gameContainer").classList.remove("hidden");
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("feedback").textContent = "";
  createInputFields(wordChain[currentWord]);

  startBackgroundMusic();
  
  clearInterval(scoreInterval);
  setInterval(() => {
    if (score > 0) {
      score--;
      document.getElementById("score").textContent = score;
    }
  }, 1000);
}

createInputFields(wordChain[currentWord]);

// Thema wisselen en opslaan in localStorage
function changeTheme() {
    let selectedTheme = document.getElementById("theme").value;
    document.body.className = selectedTheme + "-theme"; // Thema toepassen
    localStorage.setItem("selectedTheme", selectedTheme); // Opslaan
}

// Thema laden bij start
window.onload = function() {
    let savedTheme = localStorage.getItem("selectedTheme") || "light";
    document.getElementById("theme").value = savedTheme;
    document.body.className = savedTheme + "-theme";
};

// Thema laden bij start
window.onload = function() {
    let savedTheme = localStorage.getItem("selectedTheme") || "light";
    document.getElementById("theme").value = savedTheme;
    document.body.className = savedTheme + "-theme";
};

// Achtergrondmuziek
const backgroundMusic = document.getElementById("backgroundMusic");

// Geluidseffecten voor goede en foute antwoorden
const correctSound = new Audio('correct-sound.mp3');
const wrongSound = new Audio('wrong-sound.mp3');

// Zet de achtergrondmuziek op 'auto-play' wanneer het spel begint
function startBackgroundMusic() {
    backgroundMusic.play();
}

// Stop de achtergrondmuziek wanneer het spel eindigt
function stopBackgroundMusic() {
    backgroundMusic.pause();
}

// Functie om correct antwoord geluid af te spelen
function playCorrectSound() {
    correctSound.play();
}

// Functie om fout antwoord geluid af te spelen
function playWrongSound() {
    wrongSound.play();
}

function showWinScreen() {
  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("winScreen").classList.remove("hidden");

  // Stop de achtergrondmuziek wanneer het spel is gewonnen
  stopBackgroundMusic();
}

let isSoundOn = true;

function toggleSound() {
  if (isSoundOn) {
    backgroundMusic.pause();
    isSoundOn = false;
  } else {
    backgroundMusic.play();
    isSoundOn = true;
  }
}

// Voeg de onderstaande HTML knop toe:
<button onclick="toggleSound()">Toggle Sound</button>

