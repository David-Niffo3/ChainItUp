const wordChain = {
  "apple": "tree",
  "tree": "house",
  "house": "fire",
  "fire": "fighter",
  "fighter": "jet"
};

let currentWord = "apple"; // Starting word
document.getElementById("currentWord").textContent = currentWord;

// Generate input fields based on word length
function createInputFields(word) {
  const container = document.getElementById("inputContainer");
  container.innerHTML = ""; // Clear previous input fields

  for (let i = 0; i < word.length; i++) {
      let input = document.createElement("input");
      input.type = "text";
      input.classList.add("letter-box");
      input.maxLength = 1;
      input.setAttribute("data-index", i);

      // Auto-focus on the next input box when typing
      input.addEventListener("input", function () {
          if (this.value.length === 1) {
              let nextInput = this.nextElementSibling;
              if (nextInput) nextInput.focus();
          }
      });

      container.appendChild(input);
  }
}

// Initialize the first set of input fields
createInputFields(wordChain[currentWord]);

// Check the user's answer
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
      createInputFields(wordChain[currentWord]); // Generate new input fields
  } else {
      feedback.textContent = "❌ Incorrect! Try again.";
      feedback.style.color = "red";
      feedback.classList.add("wrong");
      setTimeout(() => feedback.classList.remove("wrong"), 300);
  }
}
