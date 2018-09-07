class Hangman {
  constructor(word, guessesLeft) {
    this.word = word.toLowerCase().split('');
    this.guessesLeft = guessesLeft;
    this.guessedLetters = [];
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
      return `Nice try! The word was "${this.word.join('')}"`;
    } else {
      return `Great work! You guessed the word.`;
    }
  }
}
