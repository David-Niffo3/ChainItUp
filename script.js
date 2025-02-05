// List of example word pairs for the game
const wordPairs = [
    { first: 'apple', second: 'tree' },
    { first: 'book', second: 'shelf' },
    { first: 'car', second: 'wheel' },
    { first: 'dog', second: 'bone' },
    { first: 'house', second: 'roof' }
];

let currentWord = wordPairs[0].first;
let currentPair = wordPairs[0];
let guess = "";

// Function to start the game and display the initial word
function startGame() {
    document.getElementById('currentWord').textContent = currentWord;
    generateInputBoxes();
}

// Function to generate input boxes for each letter in the word
function generateInputBoxes() {
    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = ''; // Clear any previous input fields

    // Generate letter boxes based on the word length
    for (let i = 0; i < currentWord.length; i++) {
        const letterBox = document.createElement('input');
        letterBox.type = 'text';
        letterBox.maxLength = 1;
        letterBox.classList.add('letter-box');
        letterBox.dataset.index = i;
        inputContainer.appendChild(letterBox);
    }
}

// Function to check the player's guess
function checkAnswer() {
    let guess = '';
    const letterBoxes = document.querySelectorAll('.letter-box');

    // Collect all the letters from the input boxes
    letterBoxes.forEach(box => {
        guess += box.value.toLowerCase();
    });

    // Check if the guessed word is correct
    if (guess === currentPair.first + currentPair.second) {
        document.getElementById('feedback').textContent = 'Correct! You guessed the word!';
        document.getElementById('feedback').style.color = 'green';
        nextRound();
    } else {
        document.getElementById('feedback').textContent = 'Incorrect. Try again!';
        document.getElementById('feedback').style.color = 'red';
    }
}

// Function to move to the next round
function nextRound() {
    const currentIndex = wordPairs.indexOf(currentPair);
    if (currentIndex + 1 < wordPairs.length) {
        currentPair = wordPairs[currentIndex + 1];
        currentWord = currentPair.first;
        document.getElementById('currentWord').textContent = currentWord;
        generateInputBoxes();
    } else {
        // Game Over
        document.getElementById('gameContainer').classList.add('hidden');
        document.getElementById('winScreen').classList.remove('hidden');
    }
}

// Function to restart the game
function restartGame() {
    currentPair = wordPairs[0];
    currentWord = currentPair.first;
    document.getElementById('currentWord').textContent = currentWord;
    generateInputBoxes();
    document.getElementById('gameContainer').classList.remove('hidden');
    document.getElementById('winScreen').classList.add('hidden');
    document.getElementById('feedback').textContent = '';
}

// Event listener to handle the "Enter" key for checking the word
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Event listener for the "Backspace" key to delete letters
document.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        const letterBoxes = document.querySelectorAll('.letter-box');
        for (let i = letterBoxes.length - 1; i >= 0; i--) {
            if (letterBoxes[i].value === '') {
                continue;
            } else {
                letterBoxes[i].value = '';
                break;
            }
        }
    }
});

// Start the game when the page loads
window.onload = startGame;
