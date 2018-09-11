class Hangman {
  constructor(word, guessesLeft) {
    this.word = word.toLowerCase().split('');
    this.guessesLeft = guessesLeft;
    this.guessedLetters = [];
    this.incorrectLetters = [];
    this.status = 'playing';
  }
  get puzzle() {
    let currentPuzzle = '';

    // Step through word and guesses to see if there is a match
    this.word.forEach(letter => {
      // Is there a match?
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        currentPuzzle += letter;
      } else {
        currentPuzzle += '*';
      }
    });
    return currentPuzzle;
  }

  guessLetter(letter) {
    if (this.status !== 'playing') {
      return;
    }
    letter = letter.toLowerCase();
    const isUnique = !this.guessedLetters.includes(letter);
    const isIncorrect = !this.word.includes(letter);

    if (isUnique) {
      this.guessedLetters.push(letter);
      if (isIncorrect) {
        this.guessesLeft--;
      }
    }
    this.updateIncorrectLetters();
    this.calculateStatus();
  }

  calculateStatus() {
    // check for failed
    if (this.guessesLeft === 0) {
      this.status = 'failed';
    } else {
      // check for finished
      let finished = true;
      this.word.forEach(letter => {
        if (!this.guessedLetters.includes(letter) && letter !== ' ') {
          finished = false;
        }
      });
      if (finished) {
        this.status = 'finished';
      }
    }
  }

  get statusMsg() {
    if (this.status === 'playing') {
      return `Guesses left: ${this.guessesLeft}`;
    } else if (this.status === 'failed') {
      return `Nice try! The puzzle was "${this.word.join('')}"`;
    } else {
      return `Great work! You guessed the puzzle.`;
    }
  }

  updateIncorrectLetters() {
    if (this.guessedLetters.length > 0) {
      const letters = this.guessedLetters.filter(
        letter => this.word.indexOf(letter) === -1
      );
      this.incorrectLetters = letters.slice();
    }
  }
}

export { Hangman as default };
