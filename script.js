let currentWord = "apple";  // Starting word
let userGuess = "";
let score = 100;
let timeRemaining = 60;
let timerInterval;

// Function to create the input fields for each letter
function createLetterBoxes() {
    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = "";
    for (let i = 0; i < currentWord.length; i++) {
        const letterBox = document.createElement('input');
        letterBox.type = "text";
        letterBox.maxLength = 1;
        letterBox.classList.add('letter-box');
        inputContainer.appendChild(letterBox);
    }
}

// Function to check the user's guess
function checkAnswer() {
    const userGuess = getUserGuess();
    if (userGuess === currentWord) {
        score += 30;  // Add points for correct guess
        document.getElementById('feedback').textContent = "Correct! You earned 30 points.";
        startNextWord();
    } else {
        document.getElementById('feedback').textContent = "Incorrect! Try again.";
    }
    updateScore();
}

// Function to get the user's guess
function getUserGuess() {
    let guess = "";
    const inputs = document.querySelectorAll('.letter-box');
    inputs.forEach(input => {
        guess += input.value.toLowerCase();
    });
    return guess;
}

// Function to update the score on the screen
function updateScore() {
    document.getElementById('score').textContent = score;
    if (score <= 0) {
        endGame(false);  // End the game if score is 0
    }
}

// Function to start the next word
function startNextWord() {
    currentWord = getNextWord();  // Get the next word
    createLetterBoxes();  // Create new input fields
    document.getElementById('feedback').textContent = "";
}

// Function to get a random next word (you can customize this logic)
function getNextWord() {
    const words = ["tree", "banana", "house", "car", "mountain"];
    return words[Math.floor(Math.random() * words.length)];
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById('timeRemaining').textContent = timeRemaining;
        if (timeRemaining <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Function to handle the end of the game
function endGame(won) {
    clearInterval(timerInterval);
    if (won) {
        document.getElementById('winScreen').classList.remove('hidden');
    } else {
        document.getElementById('loseScreen').classList.remove('hidden');
    }
    document.getElementById('gameContainer').classList.add('hidden');
}

// Function to restart the game
function restartGame() {
    score = 100;
    timeRemaining = 60;
    document.getElementById('score').textContent = score;
    document.getElementById('timeRemaining').textContent = timeRemaining;
    document.getElementById('gameContainer').classList.remove('hidden');
    document.getElementById('winScreen').classList.add('hidden');
    document.getElementById('loseScreen').classList.add('hidden');
    startTimer();
    startNextWord();
}

// Initialize the game
restartGame();
