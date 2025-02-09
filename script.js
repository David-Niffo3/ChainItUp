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

    score += 30;
    updateBestScore();
  } else {
    feedback.textContent = "❌ Incorrect! Try again.";
    feedback.style.color = "red";
    feedback.classList.add("wrong");
    setTimeout(() => feedback.classList.remove("wrong"), 300);
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
// Aanpassing van de functie om de achtergrond van info-board aan te passen
function changeTheme(theme) {
    const gameContainer = document.getElementById('gameContainer');
    const inputContainer = document.getElementById('inputContainer');
    const button = document.querySelector('button');
    const infoBoard = document.querySelector('.info-board'); // Het info-board element

    // Verwijder alle thema-klassen eerst
    gameContainer.classList.remove('theme-light', 'theme-dark');
    inputContainer.classList.remove('theme-light', 'theme-dark');
    button.classList.remove('theme-light', 'theme-dark');
    infoBoard.classList.remove('theme-light', 'theme-dark');

    // Pas het nieuwe thema toe
    if (theme === 'light') {
        gameContainer.classList.add('theme-light');
        inputContainer.classList.add('theme-light');
        button.classList.add('theme-light');
        infoBoard.classList.add('theme-light');
        // Verander de achtergrondkleur van de info-board voor light thema
        infoBoard.style.backgroundColor = '#e0f7fa'; // Lichtblauw voor light thema
    } else if (theme === 'dark') {
        gameContainer.classList.add('theme-dark');
        inputContainer.classList.add('theme-dark');
        button.classList.add('theme-dark');
        infoBoard.classList.add('theme-dark');
        // Verander de achtergrondkleur van de info-board voor dark thema
        infoBoard.style.backgroundColor = '#263238'; // Donkergrijs voor dark thema
    }
}

}

// Thema laden bij start
window.onload = function() {
    let savedTheme = localStorage.getItem("selectedTheme") || "light";
    document.getElementById("theme").value = savedTheme;
    document.body.className = savedTheme + "-theme";
};
