const wordChain = {
    "apple": "tree",
    "tree": "house",
    "house": "fire",
    "fire": "fighter",
    "fighter": "jet",
    "jet": "plane",
    "plane": "wing",
    "wing": "bird",
    "bird": "nest",
    "nest": "egg",
    "egg": "shell",
    "shell": "ocean",
    "ocean": "wave",
    "wave": "surf",
    "surf": "board"
};

let currentWord = "apple"; // Startwoord
let score = 100;
let bestScore = localStorage.getItem("bestScore") || 0;
let hintGiven = false;

document.getElementById("currentWord").textContent = currentWord;
document.getElementById("score").textContent = score;
document.getElementById("bestScore").textContent = bestScore;

// Start countdown voor scoreverlies
const scoreInterval = setInterval(() => {
    if (score > 0) {
        score--;
        document.getElementById("score").textContent = score;
    }
}, 1000);

// Start de timer voor de hintletter (na 15 sec)
let hintTimer = setTimeout(giveHintLetter, 15000);

// Maak invoervelden
function createInputFields(word) {
    const container = document.getElementById("inputContainer");
    container.innerHTML = "";

    for (let i = 0; i < word.length; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.classList.add("letter-box");
        input.maxLength = 1;
        input.setAttribute("data-index", i);

        // Auto-focus naar volgende input
        input.addEventListener("input", function () {
            if (this.value.length === 1) {
                let nextInput = this.nextElementSibling;
                if (nextInput) nextInput.focus();
            }
        });

        // Backspace naar vorige letter
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

    // Reset hintstatus
    hintGiven = false;
    clearTimeout(hintTimer);
    hintTimer = setTimeout(giveHintLetter, 15000);
}

// Geef een hintletter na 15 sec
function giveHintLetter() {
    if (!hintGiven) {
        let answer = wordChain[currentWord];
        let inputBoxes = document.querySelectorAll(".letter-box");

        for (let i = 0; i < inputBoxes.length; i++) {
            if (inputBoxes[i].value === "") {
                inputBoxes[i].value = answer[i]; // Zet de hintletter
                inputBoxes[i].classList.add("hint-letter"); // Voeg de grijze hintstijl toe
                inputBoxes[i].readOnly = true; // Vergrendel de input
                hintGiven = true;
                break;
            }
        }
    }
}

// Controleer antwoord
function checkAnswer() {
    let inputLetters = document.querySelectorAll(".letter-box");
    let enteredWord = Array.from(inputLetters).map(input => input.value.toLowerCase()).join("");
    let feedback = document.getElementById("feedback");

    if (wordChain[currentWord] === enteredWord) {
        feedback.textContent = `✅ ${currentWord} → ${enteredWord}`;
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

// Update best score
function updateBestScore() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("bestScore", bestScore);
        document.getElementById("bestScore").textContent = bestScore;
    }
}

// Win scherm tonen
function showWinScreen() {
    document.getElementById("gameContainer").classList.add("hidden");
    document.getElementById("winScreen").classList.remove("hidden");
    clearInterval(scoreInterval);
}

// Herstart het spel
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
