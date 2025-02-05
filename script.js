const wordChain = {
  "apple": "tree",
  "tree": "house",
  "house": "fire",
  "fire": "fighter",
  "fighter": "jet"
};

let score = 100; // Start met 100 punten
document.getElementById("score").textContent = score; // Toon score op de pagina
let currentWord = "apple"; // Het startwoord
document.getElementById("currentWord").textContent = currentWord; // Toon het startwoord op de pagina

// Functie om elke seconde 1 punt af te trekken
function decreaseScore() {
  setInterval(function () {
    if (score > 0) {
      score--;
      document.getElementById("score").textContent = score; // Update de score op de pagina
    }
  }, 1000); // Aftrekken elke seconde
}

// Functie om score toe te voegen wanneer het juiste woord is geraden
function addPoints() {
  score += 30; // Voeg 30 punten toe
  document.getElementById("score").textContent = score; // Update de score op de pagina
}

decreaseScore(); // Start de timer om punten af te trekken bij het laden van de pagina

function createInputFields(word) {
  const container = document.getElementById("inputContainer");
  container.innerHTML = ""; // Clear previous input fields

  // Maak voor elke letter in het woord een invoervak
  for (let i = 0; i < word.length; i++) {
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("letter-box");
    input.maxLength = 1;
    input.setAttribute("data-index", i);

    // Auto-focus naar het volgende vak wanneer een letter is getypt
    input.addEventListener("input", function () {
      if (this.value.length === 1) {
        let nextInput = this.nextElementSibling;
        if (nextInput) nextInput.focus();
      }
    });

    // Focus verplaatsen bij backspace
    input.addEventListener("keydown", function (event) {
      if (event.key === "Backspace" && this.value === "") {
        let prevInput = this.previousElementSibling;
        if (prevInput) {
          prevInput.value = ""; // Verwijder de vorige letter
          prevInput.focus();
        }
      }
      if (event.key === "Enter") {
        checkAnswer(); // Druk op Enter om het antwoord te controleren
      }
    });

    container.appendChild(input); // Voeg het invoervak toe aan de container
  }

  // Focus het eerste vak bij het genereren van de invoervelden
  if (container.firstChild) {
    container.firstChild.focus();
  }
}

// Initialiseer de invoervelden met het eerste woord
createInputFields(wordChain[currentWord]);

// Functie om het ingevoerde woord te controleren
function checkAnswer() {
  let inputLetters = document.querySelectorAll(".letter-box");
  let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
  let feedback = document.getElementById("feedback");

  if (wordChain[currentWord] === enteredWord) {
    feedback.textContent = `✅ ${currentWord} + ${enteredWord} = ${currentWord}${enteredWord}`;
    feedback.style.color = "#ffcc00";
    feedback.classList.add("correct");
    setTimeout(() => feedback.classList.remove("correct"), 500);

    currentWord = enteredWord; // Zet het nieuwe woord
    document.getElementById("currentWord").textContent = currentWord;

    addPoints(); // Voeg 30 punten toe bij een goed antwoord

    if (!wordChain[currentWord]) {
      showWinScreen(); // Laat het win-scherm zien als er geen vervolgwoord is
    } else {
      createInputFields(wordChain[currentWord]); // Maak nieuwe invoervelden voor het volgende woord
    }
  } else {
    feedback.textContent = "❌ Incorrect! Try again.";
    feedback.style.color = "red";
    feedback.classList.add("wrong");
    setTimeout(() => feedback.classList.remove("wrong"), 300);
  }
}

// Toon het win-scherm
function showWinScreen() {
  document.getElementById("gameContainer").classList.add("hidden");
  document.getElementById("winScreen").classList.remove("hidden");
}

// Herstart het spel
function restartGame() {
  score = 100; // Reset de score
  document.getElementById("score").textContent = score; // Update de score weergave
  currentWord = "apple"; // Reset het huidige woord naar "apple"
  document.getElementById("currentWord").textContent = currentWord;
  document.getElementById("gameContainer").classList.remove("hidden");
  document.getElementById("winScreen").classList.add("hidden");
  document.getElementById("feedback").textContent = "";
  createInputFields(wordChain[currentWord]); // Maak de invoervelden voor het startwoord
  decreaseScore(); // Start de timer opnieuw om punten af te trekken
}
