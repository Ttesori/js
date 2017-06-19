var numSquares = 6;
var colors = [];
var pickedColor;
var h1Bkg = "#444444";

var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var pickedColorDisplay = document.querySelector("#pickedColor");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setUpSquares() {
  // add logic for squares
  for (var i = 0; i < squares.length; i++) {
    // add click listeners
    squares[i].addEventListener("click",function() {
      //grab color of clicked square
      var pickedBkg = this.style.backgroundColor;
      //compare color to Picked color
      if (pickedBkg === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(pickedBkg);
        h1.style.backgroundColor = pickedBkg;
        resetButton.textContent = "Play again?";
      } else {
        messageDisplay.textContent = "Try again!";
        this.style.backgroundColor = "#232323";
      }
    });
  }
}


function reset() {
  // generate all new colors
  colors = generateColors(numSquares);
  // pick a new random color
  pickedColor = pickColor();
  // change colordisplay, reset h1 bkg
  pickedColorDisplay.textContent = pickedColor;
  h1.style.backgroundColor = h1Bkg;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";

  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "inline-block";
    } else {
      squares[i].style.display = "none";
    }
  }
}

resetButton.addEventListener("click", function() {
  reset();
});


function changeColors(color) {
  // loop all squares
  for (var i = 0; i< colors.length; i++) {
    //change color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var rand = Math.floor(Math.random() * colors.length);
  return colors[rand];
}

function generateColors(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  // pick red from 0-255
  var r = Math.floor(Math.random() * 256);
  // pick green from 0-255
  var g = Math.floor(Math.random() * 256);
  // pick blue
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r +", " + g + ", " + b + ")";
}
