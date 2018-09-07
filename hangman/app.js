let hangman;

function showGame() {
  const gameEl = document.querySelector('.hang-game-puzzle');
  gameEl.textContent = hangman.puzzle;

  const guessEl = document.querySelector('.hang-game-guesses');
  guessEl.textContent = hangman.statusMsg;
}

function init() {
  const wordCount = 2;
  getWordFromServer(wordCount, (err, puzzle) => {
    if (err) {
      console.log(err);
    } else {
      hangman = new Hangman(puzzle, puzzle.length);
      showGame();
      hangman.calculateStatus();
    }
  });

  document.addEventListener('keypress', e => {
    if (hangman.status === 'playing') {
      hangman.guessLetter(e.key);
      showGame();
    }
  });
}

init();
