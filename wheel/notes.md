Wheel amounts - https://en.wikipedia.org/wiki/Wheel_of_Fortune_(U.S._game_show)

Puzzles and categories - https://wheeloffortuneanswer.com/

#v1
##Build PlayWheel class
instance variables
\_player score
\_puzzle - get from WheelPuzzles
\_guessedLetters
\_status [0 (playing),1 (won),2(lost)]

###takeTurn

- spinWheel OR
- buyVowel (deduct 250) OR
- solvePuzzle (check if correct)
- getGuess (user input letter)
- updateScore
- updatePuzzle
- updateStatus

##Build PlayWheelUI class

- init
- set up event handlers

##Build WheelPuzzles class

- holds puzzles/categories, returns random

## Build WheelValues object

- holds wheel values, returns random
