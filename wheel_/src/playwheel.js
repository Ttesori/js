class PlayWheel {
  constructor(options) {
    this._puzzle = options._puzzle || options.puzzle.toUpperCase().split('');
    this._category = options._category || options.category;
    this._guessedLetters = options._guessedLetters || [];
    this._bank = options._bank || 0;
    this._turnValue = 0;
    this._completed = options._completed || false;
    this._won = options._won || false;
    this._puzzleNum = options._puzzleNum || options.puzzleNum;
  }

  get category() {
    return this._category;
  }

  get puzzle() {
    let puzzle = '';
    this._puzzle.forEach(letter => {
      if (this._guessedLetters.indexOf(letter) !== -1) {
        puzzle += letter;
      } else if (letter === ' ' || letter === '-') {
        puzzle += letter;
      } else {
        puzzle += '*';
      }
    });
    return puzzle;
  }

  get bank() {
    return this._bank;
  }

  set bank(amt) {
    this._bank += amt;
  }

  emptyBank() {
    this._bank = 0;
  }

  set turnValue(amt) {
    this._turnValue = amt;
  }

  get turnValue() {
    return this._turnValue;
  }

  get completed() {
    return this._completed;
  }

  get won() {
    return this._won;
  }

  get puzzleNum() {
    return this._puzzleNum;
  }

  get guessedLetters() {
    return this._guessedLetters;
  }

  guessPuzzle(type, guess) {
    // Check guess
    if (type === 'letter') {
      if (this._guessedLetters.indexOf(guess) !== -1) {
        return 0;
      } else if (this.isFound(guess)) {
        // Guess is correct
        const result = this._puzzle.filter(letter => letter === guess);
        this._guessedLetters.push(guess);
        return result.length;
      } else {
        this._guessedLetters.push(guess);
        return -1;
      }
    } else if (type === 'puzzle') {
      const puzzle = this._puzzle.join('');
      if (this.isPuzzle(guess)) {
        this._completed = true;
        this._won = true;
      } else {
        this._completed = true;
        this._won = false;
        this.emptyBank();
      }
      return puzzle;
    }
  }

  buyVowel(letter) {
    console.log('buying an', letter);
    if (this.isFound(letter)) {
      this._guessedLetters.push(letter);
    }
    this._bank -= 250;
  }

  isFound(letter) {
    if (this._puzzle.indexOf(letter) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  isPuzzle(guess) {
    if (this._puzzle.join('') === guess) {
      return true;
    } else {
      return false;
    }
  }
}

export { PlayWheel as default };
