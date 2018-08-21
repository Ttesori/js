var firstCard = true;
var card1;
var card2;
var numMatches;
var foundMatches = 0;
var turn = 0;
var score = 0;
var foundMatch;
var matches = [];
var cardBack = '&nbsp;';

setupGame();

function setupGame() {
  // Create array of squares
  var squaresDisplay = document.querySelectorAll('.match-square');

  // Create array of matches
  matches = [
    '<i class="fa fa-star" aria-hidden="true"></i>',
    '<i class="fa fa-snowflake-o" aria-hidden="true"></i>',
    '<i class="fa fa-anchor" aria-hidden="true"></i>',
    '<i class="fa fa-bug" aria-hidden="true"></i>',
    '<i class="fa fa-diamond" aria-hidden="true"></i>',
    '<i class="fa fa-taxi" aria-hidden="true"></i>'
  ];
  numMatches = matches.length;
  matches = matches.concat(matches);
  // Shuffle array
  matches.sort(function(a, b) {
    return 0.5 - Math.random();
  });

  for (var i = 0; i < squaresDisplay.length; i++) {
    // Remove 'found' classes if starting new game
    squaresDisplay[i].classList.remove('found');
    squaresDisplay[i].classList.remove('on');

    // Reset square content
    squaresDisplay[i].innerHTML = cardBack;

    // Add click listener
    squaresDisplay[i].addEventListener('click', flipCard);
  }
}

function flipCard() {
  if (firstCard) {
    // Turn cards over if not a match
    if (!foundMatch && (card1 || card2)) {
      card1.innerHTML = cardBack;
      card1.classList.remove('on');
      card2.innerHTML = cardBack;
      card2.classList.remove('on');
    }
    // Save card 1
    card1 = this;
    // Turn over card 1
    card1.innerHTML = matches[card1.dataset.num];
    card1.classList.add('on');
    firstCard = false;
  } else {
    // Save card 2
    card2 = this;
    // Turn over card 2
    card2.innerHTML = matches[card2.dataset.num];
    card2.classList.add('on');
    // Check for a match
    foundMatch = checkMatch(
      matches[card1.dataset.num],
      matches[card2.dataset.num]
    );
    if (foundMatch) {
      foundMatches++;
      score += 25;
      card1.classList.add('found');
      card2.classList.add('found');
      card1.removeEventListener('click', flipCard);
      card2.removeEventListener('click', flipCard);
    } else {
      score -= 5;
    }
    turn++;
    updateScore();
    firstCard = true;
  }
}

function checkMatch(card1, card2) {
  if (card1 === card2) {
    return true;
  } else {
    return false;
  }
}

function updateScore() {
  var scoreDisplay = document.querySelector('.match-info');
  if (numMatches === foundMatches) {
    scoreDisplay.textContent =
      'You win! It took you ' +
      turn +
      ' turns and your final score was ' +
      score;
    promptForRestart();
  } else {
    scoreDisplay.textContent =
      "You've taken " + turn + ' turns. Your score is: ' + score;
  }
}

function promptForRestart() {
  var restartButton = document.querySelector('.play-again');
  restartButton.style.visibility = 'visible';

  restartButton.addEventListener('click', resetGame);
}

function resetGame() {
  firstCard = true;
  card1 = '';
  card2 = '';
  numMatches = 0;
  foundMatches = 0;
  turn = 0;
  score = 0;
  foundMatch;
  matches = [];
  document.querySelector('.match-info').textContent = '';

  setupGame();
}
