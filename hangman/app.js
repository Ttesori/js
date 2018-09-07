let hangman;

function showGame() {
  const gameEl = document.querySelector('.hang-game-puzzle');
  gameEl.textContent = hangman.puzzle;

  const guessEl = document.querySelector('.hang-game-guesses');
  guessEl.textContent = hangman.statusMsg;
}

function init() {
  const wordCount = 2;
  getWordFromServer(wordCount).then(
    puzzle => {
      hangman = new Hangman(puzzle, puzzle.length);
      showGame();
      hangman.calculateStatus();
    },
    err => {
      console.log(err);
    }
  );

  document.addEventListener('keypress', e => {
    if (hangman.status === 'playing') {
      hangman.guessLetter(e.key);
      showGame();
    }
  });
}

init();
