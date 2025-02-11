const wordChain = {
    "door": "bell",
    "bell": "end",
    "end": "game",
    "game": "night",
    "night": "stand",
    "stand": "up",
    "up": "hill",
};

let currentWord = "door";
let score = 100;
let bestScore = localStorage.getItem("bestScore") || 0;
let hintTimer;

const leaderboardKey = "dailyLeaderboard"; // Key voor localStorage
const now = new Date();
const currentDate = now.toLocaleDateString(); // Vandaag's datum (gebruiken voor daily leaderboard)

document.getElementById("currentWord").textContent = currentWord;
document.getElementById("score").textContent = score;
document.getElementById("bestScore").textContent = bestScore;

const scoreInterval = setInterval(() => {
    if (score > 0) {
        score--;
        document.getElementById("score").textContent = score;
    }
}, 1000);

function getLeaderboard() {
    const storedLeaderboard = localStorage.getItem(leaderboardKey);
    if (storedLeaderboard) {
        return JSON.parse(storedLeaderboard);
    }
    return [];
}

function saveLeaderboard(leaderboard) {
    localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
}

function resetLeaderboardIfNewDay() {
    const storedDate = localStorage.getItem("leaderboardDate");
    if (storedDate !== currentDate) {
        localStorage.removeItem(leaderboardKey); // Verwijder leaderboard van vorige dag
        localStorage.setItem("leaderboardDate", currentDate); // Sla de nieuwe datum op
    }
}

function addScoreToLeaderboard(name, score) {
    const leaderboard = getLeaderboard();
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score); // Sorteer op score van hoog naar laag
    leaderboard.splice(10); // Beperk de lijst tot de top 10

    saveLeaderboard(leaderboard);
}

function displayLeaderboard() {
    const leaderboard = getLeaderboard();
    const leaderboardContainer = document.getElementById("leaderboard");
    leaderboardContainer.innerHTML = "<h2>Daily Leaderboard</h2>";

    leaderboard.forEach((entry, index) => {
        leaderboardContainer.innerHTML += `<p>${index + 1}. ${entry.name}: ${entry.score}</p>`;
    });
}

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

    // Naam invoeren na winnen
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter your name";
    document.getElementById("winScreen").appendChild(nameInput);

    nameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const name = nameInput.value.trim();
            if (name) {
                addScoreToLeaderboard(name, score);
                displayLeaderboard();
            }
            restartGame();
        }
    });
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

function startDailyTimer() {
    const timerElement = document.getElementById("dailyTimer");

    function updateTimer() {
        const now = new Date();
        const utcHour = now.getUTCHours();
        const utcMinute = now.getUTCMinutes();
        const utcSecond = now.getUTCSeconds();

        // Nederlandse tijd (UTC+1 in winter, UTC+2 in zomer)
        const netherlandsOffset = now.getTimezoneOffset() === -120 ? 2 : 1;
        const netherlandsHour = (utcHour + netherlandsOffset) % 24;

        // Bereken hoe lang tot 12:00 NL tijd
        let hoursLeft = 11 - netherlandsHour;
        let minutesLeft = 59 - utcMinute;
        let secondsLeft = 59 - utcSecond;

        if (hoursLeft < 0) {
            hoursLeft += 24; // Reset naar volgende dag
        }

        // Update de timer in de HTML
        timerElement.textContent = `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
    }

    // Update elke seconde
    setInterval(updateTimer, 1000);
    updateTimer();
}

// Wacht tot de pagina is geladen en start dan de timer
document.addEventListener("DOMContentLoaded", function() {
    resetLeaderboardIfNewDay();
    displayLeaderboard();
    startDailyTimer();
});

