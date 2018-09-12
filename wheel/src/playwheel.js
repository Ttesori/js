class PlayWheel {
  constructor(puzzle) {
    console.log(puzzle);
    this._puzzle = puzzle.puzzle.toUpperCase().split('');
    this._category = puzzle.category;
    this._guessedLetters = [];
    this._bank = 0;
    this._turnValue = 0;
  }

  get category() {
    return this._category;
  }

  get puzzle() {
    let puzzle = '';
    this._puzzle.forEach(letter => {
      if (this._guessedLetters.indexOf(letter) !== -1) {
        puzzle += letter;
      } else if (letter === ' ') {
        puzzle += ' ';
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

  guessPuzzle(type, guess) {
    // Check guess
    if (type === 'letter') {
      if (this.isFound(guess)) {
        // Guess is correct
        const result = this._puzzle.filter(letter => letter === guess);
        this._guessedLetters.push(guess);
        return result.length;
      } else {
        return -1;
      }
    } else if (type === 'puzzle') {
      const puzzle = this._puzzle.join('');
      if (this.isPuzzle(guess)) {
        return { won: true, puzzle: puzzle };
      } else {
        return {
          won: false,
          puzzle: puzzle
        };
      }
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
