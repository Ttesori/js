/* Game Rules
- Player must guess between min and max
- Player gets certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lost
- Let the player choose to play again
*/
let numGuesses, numMax, numMin, guessesUsed, gameOver, winningNumber;

function init() {
  // Set up event handlers
  console.log('setting up events');
  setUpEvents();
}

function startGame() {
  console.log('getting settings');
  if (validateInput()) {
    console.log('input is valid');
    // Continue with game

    // Inform user of game rules
    setMsg(
      `You are trying to guess a number between ${numMin} and ${numMax} in ${numGuesses} guesses.`,
      'light',
      'form'
    );

    // Replace form
    const formEl = document.querySelector('.ng-game-settings');
    formEl.style.display = 'none';

    // Reset game variables
    gameOver = false;
    guessesUsed = 0;

    // Select winning number
    setWinningNumber();

    // Set up guessing form
    setUpGuessForm();
    guessesUsed++;
    setMsg(`You are on guess ${guessesUsed} of ${numGuesses}.`, 'info', 'game');

    // Take turns
  } else {
    console.log('input not valid');
  }
}

function setUpEvents() {
  // Play Game
  console.log('setting up click event on start button');
  const btnPlayEl = document.querySelector('.ng-btn-start');
  btnPlayEl.addEventListener('click', function(e) {
    e.preventDefault();
    startGame();
  });
}

function setMsg(msg, type, where) {
  const gameMsgEl = document.querySelector('.ng-msg-game');
  const formMsgEl = document.querySelector('.ng-msg-form');

  if (where === 'form') {
    formMsgEl.style.display = 'block';
    formMsgEl.className = 'ng-msg-form alert';
    formMsgEl.innerHTML = msg;
    formMsgEl.classList.add('alert-' + type);
  } else if (where === 'game') {
    gameMsgEl.className = 'ng-msg-game alert';
    gameMsgEl.innerHTML = msg;
    gameMsgEl.classList.add('alert-' + type);
  }
  console.log(msg);
}

function validateInput() {
  console.log('validating input...');
  let validInput = true;
  const numGuessesEl = document.querySelector('.ng-setting-guesses');
  const minNumEl = document.querySelector('.ng-setting-min');
  const maxNumEl = document.querySelector('.ng-setting-max');

  numGuesses = parseInt(numGuessesEl.value);
  numMin = parseInt(minNumEl.value);
  numMax = parseInt(maxNumEl.value);

  // Validate input
  if (isNaN(numMin)) {
    validInput = false;
    setMsg('Please enter a minimum number.', 'danger', 'form');
  } else if (isNaN(numMax) || numMax <= numMin) {
    validInput = false;
    setMsg(
      'Please enter a maximum number greater than the minimum.',
      'danger',
      'form'
    );
  } else if (numGuessesEl.value === '') {
    validInput = false;
    setMsg('Please select a number of guesses.', 'danger', 'form');
  }
  return validInput;
}

function setUpGuessForm() {
  const guessFormEl = document.querySelector('.ng-form-guess');
  guessFormEl.innerHTML = `<input type="number" class="ng-text-guess" min="${numMin}" max="${numMax}"><button type="button" class="btn ng-btn-guess">Guess!</button>`;
  document
    .querySelector('.ng-btn-guess')
    .addEventListener('mousedown', function(e) {
      e.preventDefault();
      checkGuess();
    });
}

function checkGuess() {
  console.log('Checking guess');

  const currGuessEl = document.querySelector('.ng-text-guess');
  const currGuess = parseInt(currGuessEl.value);

  console.log(guessesUsed);
  if (currGuess === winningNumber) {
    endGame(true);
  } else if (numGuesses - guessesUsed === 0) {
    endGame(false);
  } else {
    if (isNaN(currGuess) || currGuess < numMin || currGuess > numMax) {
      setMsg(
        `Please enter a number between ${numMin} and ${numMax} above.`,
        'warning',
        'game'
      );
    } else {
      let relative;
      currGuess < winningNumber ? (relative = 'higher') : (relative = 'lower');
      setMsg(
        `The number is ${relative} than ${currGuess}. You have ${numGuesses -
          guessesUsed} guesses left.`,
        'warning',
        'game'
      );
      currGuessEl.value = '';
      guessesUsed++;
    }
  }
}

function setWinningNumber() {
  winningNumber = Math.floor(Math.random() * numMax + numMin);
  console.log(winningNumber);
}

function endGame(won) {
  gameOver = true;
  // hide game message
  if (won === true) {
    setMsg(
      `<h4 class="alert-heading">You won!</h4><p>The winning number was ${winningNumber}.<br>It took you ${guessesUsed} out of ${numGuesses} guesses.</p>`,
      'success',
      'form'
    );
  } else {
    setMsg(
      `<h4 class="alert-heading">You lost!</h4><p>The winning number was ${winningNumber}.</p>`,
      'danger',
      'form'
    );
  }
  console.log('Game over, resetting...');
  const msgGameEl = document.querySelector('.ng-msg-game');
  msgGameEl.innerHTML =
    '<button type="button" class="btn btn-secondary ng-btn-replay">Play<br>again?</button>';
  msgGameEl.className = 'alert ng-msg-game ng-msg-empty';
  document
    .querySelector('.ng-btn-replay')
    .addEventListener('click', restartGame);
  // hide game form
  document.querySelector('.ng-form-guess').innerHTML = '';
}

function restartGame() {
  location.reload();
}

init();
