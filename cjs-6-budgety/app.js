/*
BUDGET CONTROLLER
*/
var budgetController = (function() {
  // Expense Constructor
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Income Constructor
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Calculate total
  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(item) {
      sum += item.value;
    });
    data.totals[type] = sum;
  };

  // Store application data
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  //public methods/variables
  return {
    // Add new item to the budget
    addItem: function(type, desc, amount) {
      var newItem, id;

      // Create new ID
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // Create new item based on type
      if (type === 'exp') {
        newItem = new Expense(id, desc, amount);
      } else {
        newItem = new Income(id, desc, amount);
      }

      // Push to data
      data.allItems[type].push(newItem);

      // Return new element
      return newItem;
    },
    // Calculate the budget
    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate percentage of income spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
      } else {
        data.percentage = -1;
      }
    },
    // Get budget data
    getBudget: function() {
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },
    // Testing function to return data
    testing: function() {
      console.log(data);
    }
  };
})();

/*
UI CONTROLLER
*/
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDesc: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    listIncome: '.income__list',
    listExpenses: '.expenses__list',
    lblBudget: '.budget__value',
    lblIncome: '.budget__income--value',
    lblExpenses: '.budget__expenses--value',
    lblPercentage: '.budget__expenses--percentage'
  };

  //public methods/variables
  return {
    // Method to return data from input fields
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDesc).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    // Add item to the list
    addListItem: function(obj, type) {
      var html, newHTML, element;

      // Create HTML placeholder text
      if (type === 'inc') {
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>  </div>';
        element = DOMstrings.listIncome;
      } else {
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        element = DOMstrings.listExpenses;
      }

      // Replace the placeholder text
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);

      // Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
    },
    // Method to clear form fields
    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDesc + ', ' + DOMstrings.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(curVal, curInd) {
        curVal.value = '';
      });

      // Set focus to description field
      fieldsArr[0].focus();
    },
    // Display budget data
    displayBudget: function(budgetData) {
      document.querySelector(DOMstrings.lblBudget).textContent =
        budgetData.budget;
      document.querySelector(DOMstrings.lblIncome).textContent =
        budgetData.totalIncome;
      document.querySelector(DOMstrings.lblExpenses).textContent =
        budgetData.totalExp;
      if (budgetData.percentage > 0) {
        document.querySelector(DOMstrings.lblPercentage).textContent =
          budgetData.percentage + '%';
      } else {
        document.querySelector(DOMstrings.lblPercentage).textContent = '--';
      }
    },
    // Get DOM Strings
    getDOMStrings: function() {
      return DOMstrings;
    }
  };
})();

/*
APP CONTROLLER
*/
var controller = (function(budgetCtrl, UICtrl) {
  // Set Up Event Listeners
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMStrings();
    // Event listeners
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  // Update Budget
  var updateBudget = function() {
    var budget;

    // Calculate the budget
    budgetCtrl.calculateBudget();

    // Return the budget
    budget = budgetCtrl.getBudget();

    // Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  // Add New Item
  var ctrlAddItem = function() {
    var input, newItem;

    // get the input data
    var input = UICtrl.getInput();

    // Test input data and proceed if valid
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // add the item to the budget controller
      var newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );

      // add new item to UI
      UICtrl.addListItem(newItem, input.type);

      // Clear the fields
      UICtrl.clearFields();

      // calculate and update the budget
      updateBudget();
      // display the budget
    }
  };

  return {
    init: function() {
      setupEventListeners();
      updateBudget();
    }
  };
})(budgetController, UIController);

controller.init();
