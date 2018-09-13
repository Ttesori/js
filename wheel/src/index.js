import WheelValues from './wheelvalues';
import WheelPuzzles from './wheelpuzzles';
import PlayWheelUI from './playwheelui';
import PlayWheel from './playwheel';
let playwheel;

const init = () => {
  startGame();
  addEventListeners();
};

const startGame = () => {
  if (!loadFromLS()) {
    // IF no current game
    const newPuzzle = WheelPuzzles.getRandomPuzzle();
    playwheel = new PlayWheel({
      puzzle: newPuzzle.puzzle,
      category: newPuzzle.category,
      puzzleNum: newPuzzle.puzzleNum
    });
    PlayWheelUI.startGame(playwheel.puzzle, playwheel.category);
    saveCurrentGameToLS();
  } else {
    playwheel = new PlayWheel(playwheel);
    if (playwheel.completed === false) {
      // Check if game is completed
      PlayWheelUI.startGame(
        playwheel.puzzle,
        playwheel.category,
        playwheel.bank
      );
    }
  }
  loadLeaderboardFromLS();
};

const takeTurn = () => {
  // 1. Spin wheel
  const spin = spinWheel();
  const spinValue = spin.value;
  const spinPos = spin.position;
  playwheel.turnValue = spinValue;
  //PlayWheelUI.spinWheel(spinPos);
  if (spinValue === 0) {
    playwheel.emptyBank();
    PlayWheelUI.updateBank(playwheel.bank);
    PlayWheelUI.updateStatus('Oh no, you went bankrupt!');
    PlayWheelUI.showRespin();
  } else {
    // Go to next step>> Show guess letter form
    PlayWheelUI.updateStatus(`You have spun $${spinValue}`);
    PlayWheelUI.clearTurnOptionsArea();
    PlayWheelUI.showGuessLetterForm(playwheel.guessedLetters);
  }
};

const spinWheel = () => {
  const value = WheelValues.getRandomValue();
  return value;
};

const guessALetter = letter => {
  // show dropdown to accept a consonant
  const result = playwheel.guessPuzzle('letter', letter);

  if (result > 0) {
    // Guess is correct
    const total = result * playwheel.turnValue;
    playwheel.bank = total;
    PlayWheelUI.updateStatus('You added $' + total + ' to your bank!');
    PlayWheelUI.updateBank(playwheel.bank);
    PlayWheelUI.updatePuzzle(playwheel.puzzle);
    showEndTurnOptions();
  } else if (result === 0) {
    // Letter already guessed
    PlayWheelUI.updateStatus(
      `Sorry, you already guessed ${letter}. Spin again!`
    );
    PlayWheelUI.showRespin();
  } else {
    // Guess is NOT correct
    PlayWheelUI.updateStatus(`Sorry, there is no ${letter}. Spin again!`);
    PlayWheelUI.showRespin();
  }
  saveCurrentGameToLS();
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
  saveCurrentGameToLS();
};

const solvePuzzle = guess => {
  const puzzle = playwheel.guessPuzzle('puzzle', guess.toUpperCase());
  if (playwheel.won) {
    endGame(true, puzzle);
  } else {
    endGame(false, puzzle);
  }
};

const endGame = (won, puzzle) => {
  if (won) {
    PlayWheelUI.updateStatus('You win!');
    PlayWheelUI.updatePuzzle(puzzle);
    const gameDeets = {
      date: new Date(),
      bank: playwheel.bank,
      category: playwheel.category,
      puzzle: playwheel.puzzleNum
    };
    saveCompletedGameToLS(gameDeets);
  } else {
    PlayWheelUI.updateBank(playwheel.bank);
    PlayWheelUI.updateStatus(`You lose! The puzzle was ${puzzle}`);
  }
  PlayWheelUI.endGame();
  clearCurrentGameFromLS();
};

const saveCurrentGameToLS = () => {
  localStorage.setItem('wheel-current-game', JSON.stringify(playwheel));
};

const clearCurrentGameFromLS = () => {
  if (localStorage.getItem('wheel-current-game')) {
    localStorage.removeItem('wheel-current-game');
  }
};

const saveCompletedGameToLS = gameDetails => {
  const current = JSON.parse(localStorage.getItem('wheel-games'));
  current.push(gameDetails);
  localStorage.setItem('wheel-games', JSON.stringify(current));
  loadLeaderboardFromLS();
};

const loadLeaderboardFromLS = () => {
  const wheelGames = JSON.parse(localStorage.getItem('wheel-games'));
  console.log(typeof wheelGames, wheelGames);
  //console.log(wheelGames.length);
  // If there are previous games
  if (wheelGames === null || wheelGames.length === 0) {
    // Set an empty array
    const empty = [];
    localStorage.setItem('wheel-games', JSON.stringify(empty));
    PlayWheelUI.showLeaderboard(false);
  } else {
    // Sort the games by amount
    wheelGames.sort((a, b) => {
      if (a.bank < b.bank) {
        return 1;
      }
      if (a.bank > b.bank) {
        return -1;
      }
      return 0;
    });
    // Output leaderboard
    PlayWheelUI.showLeaderboard(wheelGames);
  }
};
const clearLeaderboardFromLS = () => {
  if (localStorage.getItem('wheel-games')) {
    localStorage.removeItem('wheel-games');
  }
};

const loadFromLS = () => {
  if (localStorage.getItem('wheel-current-game')) {
    playwheel = JSON.parse(localStorage.getItem('wheel-current-game'));
    return true;
  } else {
    return false;
  }
};

const addEventListeners = () => {
  const elements = PlayWheelUI.getElements();
  const inputAreaEl = elements.inputAreaEl;
  const turnOptionsEl = elements.turnOptionsEl;
  const btnNewGame = elements.btnNewGame;
  const btnClearLeaderboard = elements.btnClearLeaderboard;

  btnNewGame.addEventListener('click', e => {
    clearCurrentGameFromLS();
    startGame();
  });

  turnOptionsEl.addEventListener('click', e => {
    if (e.target.className === 'wheel-btn-spin') {
      takeTurn();
    } else if (e.target.className === 'wheel-btn-vowel') {
      PlayWheelUI.showBuyAVowelForm();
    } else if (e.target.className === 'wheel-btn-solve') {
      PlayWheelUI.showSolvePuzzleForm();
    } else if (e.target.className === 'wheel-btn-replay') {
      startGame();
    }
  });

  inputAreaEl.addEventListener('click', e => {
    const elements = PlayWheelUI.getElements();
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
