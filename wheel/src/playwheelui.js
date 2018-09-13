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
      btnPlayAgain: '<button class="wheel-btn-replay">Play Again?</button>',
      btnSubmitGuess: document.querySelector('.wheel-btn-guessLetter'),
      btnBuyVowel: document.querySelector('.wheel-btn-buyVowel'),
      txtSelectGuess: document.querySelector('.wheel-input-letter'),
      txtSelectVowel: document.querySelector('.wheel-input-vowel'),
      btnSolvePuzzle: document.querySelector('.wheel-btn-solvePuzzle'),
      txtInputSolve: document.querySelector('.wheel-input-solve'),
      btnNewGame: document.querySelector('.wheel-btn-new'),
      leaderboardContainerEl: document.querySelector('.wheel-game-leaderboard'),
      leaderboardEl: document.querySelector('.wheel-leaderboard'),
      btnClearLeaderboard: document.querySelector('.wheel-btn-clearLeaderboard')
    };
  }

  static startGame(maskedPuzzle, category, bank = 0) {
    const elements = PlayWheelUI.getElements();
    elements.puzzleTextEl.textContent = maskedPuzzle;
    elements.categoryTextEl.textContent = category;
    elements.turnOptionsEl.innerHTML = elements.btnSpin;
    PlayWheelUI.updateStatus('');
    if (bank > 0) {
      PlayWheelUI.updateBank(bank);
    } else {
      PlayWheelUI.updateBank(0);
    }
  }

  static updatePuzzle(maskedPuzzle) {
    const elements = PlayWheelUI.getElements();
    elements.puzzleTextEl.textContent = maskedPuzzle;
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

  static spinWheel(value) {
    const baseSpin = 720;
    const spinPos = value * 15;
    document.querySelector('#wheel').style.transform = `rotate(-${baseSpin +
      spinPos}deg)`;
  }

  static showRespin() {
    const elements = PlayWheelUI.getElements();
    elements.turnOptionsEl.innerHTML = elements.btnSpin;
    elements.inputAreaEl.innerHTML = '';
  }

  static showGuessLetterForm(guessedLetters) {
    const elements = PlayWheelUI.getElements();
    const inputAreaEl = elements.inputAreaEl;
    const letters = 'bcdfghjklmnpqrstvwxyz'.toUpperCase().split('');
    PlayWheelUI.clearTurnOptionsArea();
    let selectBody = '';
    letters.forEach(letter => {
      if (guessedLetters.indexOf(letter) === -1) {
        selectBody += `<option value="${letter}">${letter.toUpperCase()}</option>`;
      }
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
    PlayWheelUI.clearTurnOptionsArea();
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
    turnOptionsEl.innerHTML += elements.btnSpin;
    turnOptionsEl.innerHTML += elements.btnSolve;
    if (canBuyVowel) {
      turnOptionsEl.innerHTML += elements.btnVowel;
    }
  }

  static endGame() {
    PlayWheelUI.clearInputArea();
    PlayWheelUI.clearTurnOptionsArea();
  }

  static clearInputArea() {
    const elements = PlayWheelUI.getElements();
    const inputAreaEl = elements.inputAreaEl;
    inputAreaEl.innerHTML = '';
  }

  static clearTurnOptionsArea() {
    const turnOptionsEl = PlayWheelUI.getElements().turnOptionsEl;
    turnOptionsEl.innerHTML = '';
  }

  static showLeaderboard(games) {
    const leaderboardEl = PlayWheelUI.getElements().leaderboardEl;
    if (!games || games.length === 0) {
      PlayWheelUI.getElements().leaderboardEl.innerHTML =
        '<p>Complete games to add them to your personal leaderboard.</p>';
      return false;
    }
    let gamesHTML = '';
    games.forEach(game => {
      const date = new Date(game.date);
      const prettyDate = `${date.getMonth() +
        1}/${date.getDate()}/${date.getUTCFullYear()}`;
      gamesHTML += `
      <tr><td>${prettyDate}</td><td>$${game.bank} </td><td>${game.category} #${
        game.puzzle
      }</td></tr>
      `;
    });
    const headerRowHTML =
      '<thead><tr><th>Date</th><th>Bank</th><th>Puzzle</th></tr></thead>';
    leaderboardEl.innerHTML = `
    <table>
    ${headerRowHTML}
    <tbody>${gamesHTML}</tbody>
    </table>`;
  }
}

export { PlayWheelUI as default };
