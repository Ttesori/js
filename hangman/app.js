let hangman;

const startGame = async () => {
  const wordCount = 2;
  const puzzle = await getWordFromServer(wordCount);
  const guesses = [5, 10, 15];
  hangman = new Hangman(puzzle, guesses[wordCount - 1]);
  render();
};

const render = () => {
  const gameEl = document.querySelector('.hang-game-puzzle');
  gameEl.textContent = hangman.puzzle;

  const guessEl = document.querySelector('.hang-game-guesses');
  guessEl.textContent = hangman.statusMsg;
};

function init() {
  document.addEventListener('keypress', e => {
    if (hangman.status === 'playing') {
      hangman.guessLetter(e.key);
      render();
    }
  });

  document
    .querySelector('.hang-game-btn--reset')
    .addEventListener('click', startGame);

  startGame();
}

init();
