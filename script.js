const woordenketting = {
  "appel": "boom",
  "boom": "hut",
  "hut": "kamp",
  "kamp": "vuur",
  "vuur": "werk"
};

let huidigWoord = "appel"; // Startwoord
document.getElementById("woord").textContent = huidigWoord;

function controleerAntwoord() {
  let invoer = document.getElementById("inputWoord").value.toLowerCase();
  let feedback = document.getElementById("feedback");

  if (woordenketting[huidigWoord] === invoer) {
      feedback.textContent = `✅ ${huidigWoord} + ${invoer} = ${huidigWoord}${invoer}`;
      feedback.style.color = "#ffcc00";
      feedback.classList.add("correct");
      setTimeout(() => feedback.classList.remove("correct"), 500);
      huidigWoord = invoer; // Het correcte antwoord wordt het nieuwe startwoord
      document.getElementById("woord").textContent = huidigWoord;
  } else {
      feedback.textContent = "❌ Fout! Probeer opnieuw.";
      feedback.style.color = "red";
      feedback.classList.add("wrong");
      setTimeout(() => feedback.classList.remove("wrong"), 300);
  }

  document.getElementById("inputWoord").value = "";
}
