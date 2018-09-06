const hangman1 = new Hangman('Cat', 2);

function showGame() {
  const gameEl = document.querySelector('.hang-game-puzzle');
  gameEl.textContent = hangman1.getPuzzle();

  const guessEl = document.querySelector('.hang-game-guesses');
  guessEl.textContent = hangman1.getStatusMsg();
}

document.addEventListener('keypress', e => {
  if (hangman1.status === 'playing') {
    hangman1.guessLetter(e.key);
    showGame();
  }
});

function init() {
  showGame();
  hangman1.calculateStatus();
}
init();
