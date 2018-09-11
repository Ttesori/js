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
  gameEl.innerHTML = '';
  const puzzle = hangman.puzzle;
  puzzle.split('').forEach(letter => {
    const letterEl = document.createElement('span');
    letterEl.classList.add('hang-game-puzzle-letter');
    if (letter === '*') {
      letterEl.classList.add('empty');
      letterEl.textContent = '';
    } else if (letter === ' ') {
      letterEl.classList.add('space');
      letterEl.innerHTML = '&nbsp;';
    } else {
      letterEl.textContent = letter;
    }
    gameEl.appendChild(letterEl);
  });

  // Output correct letters
  const guessEl = document.querySelector('.hang-game-guesses');
  guessEl.innerHTML = '';

  // Get guesses left text
  const guessesLeftEl = document.createElement('div');
  guessesLeftEl.classList.add('hang-game-guesses--left');
  guessesLeftEl.textContent = hangman.statusMsg;
  guessEl.appendChild(guessesLeftEl);

  // If there are incorrect guesses, print them
  if (hangman.incorrectLetters.length != 0 && hangman.status === 'playing') {
    const incorrectLettersEl = document.createElement('div');
    incorrectLettersEl.textContent = `Incorrect letters guessed: ${hangman.incorrectLetters.join(
      ', '
    )}`;
    incorrectLettersEl.classList.add('hang-game-guesses--incorrect');
    guessEl.appendChild(incorrectLettersEl);
  }

  // Add classes if won or lost
  const containerEl = document.querySelector('.hang-game');
  if (hangman.status === 'finished') {
    containerEl.classList.add('game-won');
  } else if (hangman.status === 'failed') {
    containerEl.classList.add('game-lost');
  }
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
