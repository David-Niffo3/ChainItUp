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

// Functie om het leaderboard bij te werken
function updateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("dailyLeaderboard")) || [];

    // Sorteer de scores op aflopende volgorde (hoogste score bovenaan)
    leaderboard.sort((a, b) => b.score - a.score);

    const leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = ""; // Maak de lijst leeg voordat je de nieuwe scores weergeeft

    leaderboard.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} - ${player.score} points`;
        leaderboardList.appendChild(li);
    });
}

// Functie om de score van een speler op te slaan
function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("dailyLeaderboard")) || [];
    
    // Voeg de nieuwe score toe aan de leaderboard
    leaderboard.push({ name, score, timestamp: Date.now() });

    // Bewaar de leaderboard in localStorage
    localStorage.setItem("dailyLeaderboard", JSON.stringify(leaderboard));

    // Update het leaderboard op de pagina
    updateLeaderboard();
}

// Functie om te controleren of de score is gereset (op basis van datum)
function resetLeaderboardIfNewDay() {
    const now = new Date();
    const lastResetDate = localStorage.getItem("lastResetDate");

    if (!lastResetDate || new Date(lastResetDate).toDateString() !== now.toDateString()) {
        // Reset de leaderboard als het een nieuwe dag is
        localStorage.setItem("dailyLeaderboard", JSON.stringify([]));
        localStorage.setItem("lastResetDate", now.toISOString());
    }
}

// Functie om de score in te stellen (bijvoorbeeld na het winnen van het spel)
function onGameEnd(name, score) {
    saveScore(name, score);
}

// Start het proces om te controleren of de score moet worden gereset bij een nieuwe dag
resetLeaderboardIfNewDay();
updateLeaderboard(); // Update het leaderboard als de pagina wordt geladen

// Zet bijvoorbeeld de speler en score hier in wanneer het spel eindigt:
onGameEnd("SpelerNaam", score); // Vervang "SpelerNaam" met de naam van de speler


// Wacht tot de pagina is geladen en start dan de timer
document.addEventListener("DOMContentLoaded", startDailyTimer);
