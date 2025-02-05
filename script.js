const wordChain = {
    "apple": "tree",
    "tree": "house",
    "house": "fire",
    "fire": "fighter",
    "fighter": "jet"
};

let currentWord = "apple"; // Starting word
document.getElementById("currentWord").textContent = currentWord;

let timer;
let timeLeft = 60;  // Starttijd in seconden

// Start timer bij het laden van een nieuw woord
function startTimer() {
    timeLeft = 60; // Reset de timer
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`; // Toon timer
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop de timer als de tijd om is
            document.getElementById("feedback").textContent = "⏰ Time's up! Try again.";
            document.getElementById("feedback").style.color = "red";
            setTimeout(() => {
                document.getElementById("feedback").textContent = "";
            }, 1000);
            checkAnswer(); // Forceer een antwoord wanneer de tijd om is
        } else {
            timeLeft--; // Verlaag de tijd
            document.getElementById("timer").textContent = `Time left: ${timeLeft}s`; // Toon de resterende tijd
        }
    }, 1000);
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
startTimer(); // Start de timer bij het laden van het eerste woord

function checkAnswer() {
    let inputLetters = document.querySelectorAll(".letter-box");
    let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
    let feedback = document.getElementById("feedback");

    if (wordChain[currentWord] === enteredWord) {
        feedback.textContent = `✅ ${currentWord} + ${enteredWord} = ${currentWord}${enteredWord}`;
        feedback.style.color = "#ffcc00";
        feedback.classList.add("correct");
        setTimeout(() => feedback.classList.remove("correct"), 500);

        currentWord = enteredWord; // Set new word
        document.getElementById("currentWord").textContent = currentWord;

        if (!wordChain[currentWord]) {
            showWinScreen();
        } else {
            createInputFields(wordChain[currentWord]);
            startTimer(); // Start de timer opnieuw voor het nieuwe woord
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
    clearInterval(timer); // Stop de timer wanneer je hebt gewonnen
}

// Restart game
function restartGame() {
    currentWord = "apple";
    document.getElementById("currentWord").textContent = currentWord;
    document.getElementById("gameContainer").classList.remove("hidden");
    document.getElementById("winScreen").classList.add("hidden");
    document.getElementById("feedback").textContent = "";
    createInputFields(wordChain[currentWord]);
    startTimer(); // Start de timer opnieuw
}
