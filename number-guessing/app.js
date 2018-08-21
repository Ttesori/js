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
      'info',
      'form'
    );

    // Replace form
    const formEl = document.querySelector('.ng-game-settings-form');
    formEl.innerHTML = '';

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
  btnPlayEl.addEventListener('mousedown', function(e) {
    e.preventDefault();
    startGame();
  });
}

function setMsg(msg, type, where) {
  const gameMsgEl = document.querySelector('.ng-msg');
  const formMsgEl = document.querySelector('.ng-msg-form');

  if (where === 'form') {
    formMsgEl.textContent = msg;
    formMsgEl.classList.add('alert-' + type);
  } else if (where === 'game') {
    gameMsgEl.textContent = msg;
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
  if (numGuessesEl.value === '') {
    validInput = false;
    setMsg('Please select a number of guesses.', 'error');
  } else if (minNumEl.value === '' && minNumEl.value < 0) {
    validInput = false;
    setMsg('Please enter a positive minimum integer.', 'error');
  } else if (maxNumEl.value === '' && maxNumEl <= minNumEl) {
    validInput = false;
    setMsg('Please enter a maximum integer greater than the minimum.', 'error');
  }
  return validInput;
}

function setUpGuessForm() {
  const guessFormEl = document.querySelector('.ng-form-guess');
  guessFormEl.innerHTML =
    '<input type="number" class="ng-text-guess"><button type="button" class="ng-btn-guess">Guess!</button>';
  document
    .querySelector('.ng-btn-guess')
    .addEventListener('mousedown', function(e) {
      e.preventDefault();
      checkGuess();
    });
}

function checkGuess() {
  console.log('Checking guess');
  const currGuess = parseInt(document.querySelector('.ng-text-guess').value);

  if (currGuess === winningNumber) {
    gameOver = true;
    console.log('You won!');
  } else {
    let relative;
    currGuess < winningNumber ? (relative = 'higher') : (relative = 'lower');
    setMsg(
      `The number is ${relative} than ${currGuess}. You have ${numGuesses -
        guessesUsed} guesses left.`,
      'warning',
      'game'
    );
  }
  guessesUsed++;
}

function setWinningNumber() {
  winningNumber = Math.floor(Math.random() * numMax + numMin);
  console.log(winningNumber);
}

init();
