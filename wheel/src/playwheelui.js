class PlayWheelUI {
  static getElements() {
    return {
      gameEl: document.querySelector('.wheel-game'),
      puzzleTextEl: document.querySelector('.wheel-puzzle-text'),
      categoryTextEl: document.querySelector('.wheel-puzzle-category'),
      statusEl: document.querySelector('.wheel-game-status'),
      inputAreaEl: document.querySelector('.wheel-game-input'),
      turnOptionsEl: document.querySelector('.wheel-game-turn-options'),
      bankEl: document.querySelector('.wheel-game-bank'),
      btnSpin: '<button class="wheel-btn-spin">Spin Wheel</button>',
      btnGuess: '<button class="wheel-btn-guess">Guess Letter</button>',
      btnSolve: '<button class="wheel-btn-solve">Solve Puzzle</button>',
      btnVowel: '<button class="wheel-btn-vowel">Buy A Vowel</button>',
      btnSubmitGuess: document.querySelector('.wheel-btn-guessLetter'),
      btnBuyVowel: document.querySelector('.wheel-btn-buyVowel'),
      txtSelectGuess: document.querySelector('.wheel-input-letter'),
      txtSelectVowel: document.querySelector('.wheel-input-vowel'),
      btnSolvePuzzle: document.querySelector('.wheel-btn-solvePuzzle'),
      txtInputSolve: document.querySelector('.wheel-input-solve')
    };
  }

  static startGame(maskedPuzzle, category) {
    const elements = PlayWheelUI.getElements();
    elements.puzzleTextEl.textContent = maskedPuzzle;
    elements.categoryTextEl.textContent = category;
  }

  static updatePuzzle(maskedPuzzle) {
    const elements = PlayWheelUI.getElements();
    elements.puzzleTextEl.textContent = maskedPuzzle;
  }

  static spinWheel(value) {
    const elements = PlayWheelUI.getElements();
    elements.statusEl.textContent = `You have spun ${value}`;
  }

  static updateStatus(msg, type) {
    const elements = PlayWheelUI.getElements();
    elements.statusEl.className = 'wheel-game-status game-status-' + type;
    elements.statusEl.textContent = msg;
  }

  static updateBank(amt) {
    const bankEl = PlayWheelUI.getElements().bankEl;
    bankEl.textContent = '$' + amt;
  }

  static showGuessLetterForm() {
    const elements = PlayWheelUI.getElements();
    const inputAreaEl = elements.inputAreaEl;
    const letters = 'bcdfghjklmnpqrstvwxyz'.split('');

    let selectBody = '';
    letters.forEach(letter => {
      selectBody += `<option value="${letter.toUpperCase()}">${letter.toUpperCase()}</option>`;
    });
    inputAreaEl.innerHTML = `
    <label>Select a Letter</label>
    <select class="wheel-input-letter">
    ${selectBody}
    </select>
    <button class="wheel-btn-guessLetter">Guess Letter</button>
    `;
  }

  static showSolvePuzzleForm() {
    console.log('solve puzzle form');
    const elements = PlayWheelUI.getElements();
    const inputAreaEl = elements.inputAreaEl;
    inputAreaEl.innerHTML = `
    <input type="text" class="wheel-input-solve">
    <button class="wheel-btn-solvePuzzle">Solve Puzzle</button>
    `;
  }

  static showBuyAVowelForm() {
    console.log('buy a vowel form');
    const elements = PlayWheelUI.getElements();
    const inputAreaEl = elements.inputAreaEl;
    const letters = 'aeiou'.split('');

    let selectBody = '';
    letters.forEach(letter => {
      selectBody += `<option value="${letter.toUpperCase()}">${letter.toUpperCase()}</option>`;
    });
    inputAreaEl.innerHTML = `
    <label>Select a Letter</label>
    <select class="wheel-input-vowel">
    ${selectBody}
    </select>
    <button class="wheel-btn-buyVowel">Guess Letter</button>
    `;
  }

  static showEndTurnOptions(canBuyVowel) {
    const elements = PlayWheelUI.getElements();
    const turnOptionsEl = elements.turnOptionsEl;
    elements.inputAreaEl.innerHTML = '';
    turnOptionsEl.innerHTML = '';
    if (canBuyVowel) {
      turnOptionsEl.innerHTML += elements.btnVowel;
    }
    turnOptionsEl.innerHTML += elements.btnSolve;
    turnOptionsEl.innerHTML += elements.btnSpin;
  }

  static clearInputArea() {
    const elements = PlayWheelUI.getElements();
    const inputAreaEl = elements.inputAreaEl;
    inputAreaEl.innerHTML = '';
  }
}

export { PlayWheelUI as default };
