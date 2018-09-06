const Hangman = function(word, guessesLeft) {
  this.word = word.toLowerCase().split('');
  this.guessesLeft = guessesLeft;
  this.guessedLetters = [];
  this.status = 'playing';

  console.log(this.status);
};

Hangman.prototype.getPuzzle = function() {
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
};

Hangman.prototype.guessLetter = function(letter) {
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
};

Hangman.prototype.calculateStatus = function() {
  // check for failed
  if (this.guessesLeft === 0) {
    this.status = 'failed';
  } else {
    // check for finished
    let finished = true;
    this.word.forEach(letter => {
      if (!this.guessedLetters.includes(letter)) {
        finished = false;
      }
    });
    if (finished) {
      this.status = 'finished';
    }
  }
};

Hangman.prototype.getStatusMsg = function() {
  if (this.status === 'playing') {
    return `Guesses left: ${this.guessesLeft}`;
  } else if (this.status === 'failed') {
    return `Nice try! The word was "${this.word.join('')}"`;
  } else {
    return `Great work! You guessed the word.`;
  }
};
