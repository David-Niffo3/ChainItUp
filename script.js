@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    background-color: #9ACEFF; /* Lichte blauwe achtergrond voor de pagina */
    margin: 0;
    padding: 0;
    color: #336799; /* Donkerblauwe tekstkleur */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container {
    margin-top: 20px;
    background: #C7DDF5; /* Lichte achtergrondkleur voor het spelgedeelte */
    padding: 20px;
    width: 80%;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    text-align: center;
    flex-grow: 1;
}

.hidden {
    display: none;
}

h1 {
    font-size: 28px;
    font-weight: 600;
    text-transform: uppercase;
    color: #336799; /* Donkerblauwe tekstkleur */
}

p {
    font-size: 18px;
    margin: 10px 0;
}

#inputContainer {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin: 20px 0;
}

.letter-box {
    width: 40px;
    height: 40px;
    font-size: 24px;
    text-align: center;
    border: 2px solid #336799; /* Donkerblauwe randkleur */
    background-color: #669ACC; /* Blauwe lettervakjes */
    color: #336799; /* Donkerblauwe tekstkleur */
    font-weight: bold;
    border-radius: 5px;
    text-transform: uppercase;
}

button {
    font-size: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #C7DDF5; /* Lichte achtergrondkleur voor de knop */
    color: #336799; /* Donkerblauwe tekstkleur voor de knop */
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background-color: #669ACC; /* Donkerdere blauwe knop bij hover */
}

#feedback {
    font-size: 22px;
    font-weight: bold;
    margin-top: 15px;
    color: #336799; /* Donkerblauwe tekstkleur voor feedback */
}

/* Animation for correct answers */
.correct {
    animation: correctAnim 0.5s ease-in-out;
}

@keyframes correctAnim {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* Animation for incorrect answers */
.wrong {
    animation: shake 0.3s ease-in-out;
}

@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}

/* Info board styling */
.info-board {
    background: #C7DDF5; /* Lichte achtergrondkleur voor de informatiebox */
    color: #336799; /* Donkerblauwe tekstkleur */
    padding: 15px;
    margin: 20px auto;
    width: 80%;
    max-width: 600px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    font-size: 16px;
    position: relative;
    bottom: 0;
}

.info-board h2 {
    font-size: 20px;
    font-weight: bold;
}

.info-board p {
    font-size: 16px;
    line-height: 1.5;
}
