import WheelValues from './wheelvalues';
import WheelPuzzles from './wheelpuzzles';
import PlayWheelUI from './playwheelui';
import PlayWheel from './playwheel';
let playwheel;

const init = () => {
  playwheel = new PlayWheel(WheelPuzzles.getRandomPuzzle());
  PlayWheelUI.startGame(playwheel.puzzle, playwheel.category);
  PlayWheelUI.updateBank(0);
  addEventListeners();
};

const takeTurn = () => {
  // 1. Spin wheel
  const spinValue = spinWheel();
  playwheel.turnValue = spinValue;
  if (spinValue === 0) {
    console.log('player went bankrupt');
    playwheel.bank = 0;
    PlayWheelUI.updateBank(playwheel.bank);
    return false;
  } else {
    // Go to next step>> Show guess letter form
    PlayWheelUI.showGuessLetterForm();
  }
};

const spinWheel = () => {
  const value = WheelValues.getRandomValue();
  PlayWheelUI.spinWheel(value);
  return value;
};

const guessALetter = letter => {
  // show dropdown to accept a consonant
  console.log('You have guessed', letter);

  const result = playwheel.guessPuzzle('letter', letter);

  if (result > 0) {
    // Guess is correct
    // Add money to bank
    const total = result * playwheel.turnValue;
    playwheel.bank += total;
    PlayWheelUI.updateStatus('You added $' + total + ' to your bank!');
    PlayWheelUI.updateBank(playwheel.bank);
    PlayWheelUI.updatePuzzle(playwheel.puzzle);
  } else {
    // Guess is NOT correct
  }

  // Next step >> Show end turn choices
  showEndTurnOptions();
};

const showEndTurnOptions = () => {
  PlayWheelUI.showEndTurnOptions(playwheel.bank > 250);
};

const buyAVowel = vowel => {
  // show dropdown to select a vowel
  // deduct bank 250
  playwheel.buyVowel(vowel);
  PlayWheelUI.updateStatus('You subtracted $250 from your bank!');
  PlayWheelUI.updateBank(playwheel.bank);
  PlayWheelUI.updatePuzzle(playwheel.puzzle);
  PlayWheelUI.showEndTurnOptions(false);
};

const solvePuzzle = guess => {
  const isCorrect = playwheel.guessPuzzle('puzzle', guess.toUpperCase());
  console.log(isCorrect);
  if (!isCorrect.won) {
    // lose everything, game over
    playwheel.emptyBank();
    PlayWheelUI.updateBank(playwheel.bank);
    PlayWheelUI.updateStatus(`You lose! The puzzle was ${isCorrect.puzzle}`);
  } else {
    // lock in bank, game Over
    PlayWheelUI.updateStatus('You win!');
  }
};

const addEventListeners = () => {
  const elements = PlayWheelUI.getElements();
  const inputAreaEl = elements.inputAreaEl;
  const turnOptionsEl = elements.turnOptionsEl;

  turnOptionsEl.addEventListener('click', e => {
    console.log('From turn options', e.target.className);
    if (e.target.className === 'wheel-btn-spin') {
      takeTurn();
    } else if (e.target.className === 'wheel-btn-vowel') {
      console.log('buying a vowel');
      PlayWheelUI.showBuyAVowelForm();
    } else if (e.target.className === 'wheel-btn-solve') {
      PlayWheelUI.showSolvePuzzleForm();
    }
  });

  inputAreaEl.addEventListener('click', e => {
    const elements = PlayWheelUI.getElements();
    console.log('From input area', e.target.className);
    if (e.target.className === 'wheel-btn-guessLetter') {
      guessALetter(elements.txtSelectGuess.value);
    } else if (e.target.className === 'wheel-btn-buyVowel') {
      buyAVowel(elements.txtSelectVowel.value);
    } else if (e.target.className === 'wheel-btn-solvePuzzle') {
      solvePuzzle(elements.txtInputSolve.value);
    }
  });
};

init();
