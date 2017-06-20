var num1 = '';
var num2 = '';
var firstNum = true;
var oper = '';
var output = '';

var numbers = document.querySelectorAll("#numbers div");
var outputDisplay = document.querySelector("#output");
var operButtons = document.querySelectorAll(".button");
var eqButton = document.querySelector("#eq");
var clButton = document.querySelector("#cl");

// Set up number buttons
for (var i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click",function() {
    if (firstNum) {
      num1 +=  this.textContent;
      outputDisplay.textContent = num1;
    } else {
      num2 +=  this.textContent;
      output = num1 + ' ' + oper + ' ' + num2;
      outputDisplay.textContent = output;
    }
  });
}

// Set up operator buttons
for (var i = 0; i < operButtons.length; i++) {
  operButtons[i].addEventListener("click", function() {
    oper = this.textContent;
    output = num1 + ' ' + oper;
    outputDisplay.textContent = output;
    firstNum = false;
  });
}

// Equals button
eqButton.addEventListener("click",function() {
  switch(oper) {
    case '+':
      outputDisplay.textContent = output + ' = ' + (parseInt(num1) + parseInt(num2));
      reset();
      break;
    case '-':
      outputDisplay.textContent = output + ' = ' + (parseInt(num1) - parseInt(num2));
      reset();
      break;
    case '*':
      outputDisplay.textContent = output + ' = ' + (parseInt(num1) * parseInt(num2));
      reset();
      break;
    case '/':
      outputDisplay.textContent = output + ' = ' + (parseFloat(num1) / parseFloat(num2));
      reset();
      break;
    default:
      break;
  }
});

// Clear Button
clButton.addEventListener("click",function() {
  reset();
  outputDisplay.textContent = 'see result here';
});

// Reset calculator
function reset() {
  num1 = '';
  num2 = '';
  oper = '';
  firstNum = true;
}
