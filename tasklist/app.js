/*
Project: Bullet Journal-style tasklist

Iteration 2
- The user should be able to edit an item
- Tasks should persist in local storage

TODOs
(x) Create data structure for task list
(x) Create functions for saving data to and loading data from local storage
(x) Update create and delete functions to update local storage as well
(x) Allow user to change title of list, persist to local storage
() Clean up JS
() Clean up CSS
() Fix select box width
() Fade in/out highlights

*/
// Task List
let dbjLists, currEdit;

// Get UI Variables
const dbjListElement = document.querySelector('.dbj-list');
const dbjTitleAdd = document.querySelector('.dbj-title-add');
const dbjInputAdd = document.querySelector('.dbj-input-add');
const dbjAddType = document.querySelector('.dbj-add-type');
const dbjBtnAdd = document.querySelector('.dbj-btn-add');
const dbjDeleteHTML =
  '<a href="#" class="dbj-btn-delete btn btn-danger" title="Delete Item"></a> ';
const dbjEditHTML =
  '<a href="#" class="dbj-btn-edit btn btn-info" title="Edit Item"></a> ';
const dbjListName = document.querySelector('.dbj-list-label');
const dbjBtnClear = document.querySelector('.dbj-btn-clear');

// Initialize application
init();

function init() {
  // Set up variables
  dbjLists = [];
  currEdit = -1;

  // Set up event listeners
  // Add Task Button
  dbjBtnAdd.addEventListener('click', function(e) {
    if (e.target.textContent === 'Update Task') {
      updateTask();
    } else {
      addTask();
    }
  });
  // Capture clicks on list items
  dbjListElement.addEventListener('click', function(e) {
    // If delete button is target, delete
    if (e.target.classList.contains('dbj-btn-delete')) {
      deleteTask(e);
    } else if (e.target.classList.contains('dbj-btn-edit')) {
      editTask(e);
    } else {
      // Disable task
      disableTask(e);
    }
  });
  dbjListName.addEventListener('input', updateListName);
  dbjBtnClear.addEventListener('click', clearList);

  // Load data from LS
  // List title
  if (localStorage.getItem('dbj-tasks-title')) {
    dbjListName.textContent = localStorage.getItem('dbj-tasks-title');
  }
  // List content
  if (localStorage.getItem('dbj-tasks')) {
    dbjLists = getFromLS();
    listTasks();
  }
}

// Add a new task
function addTask() {
  const textTask = dbjInputAdd.value;
  const taskType = dbjAddType.value;

  // If task input isn't empty
  if (textTask !== '') {
    // Create data
    const newTask = {
      type: taskType,
      text: textTask
    };
    dbjLists.push(newTask);
    saveToLS();

    // Rebuild task list
    listTasks();

    // Clear input
    dbjAddType.value = 'task';
    dbjInputAdd.value = '';
  }
}

function updateTask(taskNum) {
  const textTask = dbjInputAdd.value;
  const taskType = dbjAddType.value;
  const taskToUpdate = dbjBtnAdd.dataset.task;

  if (textTask !== '' && currEdit !== -1) {
    dbjLists[currEdit].type = taskType;
    dbjLists[currEdit].text = textTask;

    // Save to LS and rebuild list
    saveToLS();
    listTasks();

    // Highlight changed element
    const updatedTask = document.querySelector('.dbj-task-' + taskToUpdate);
    updatedTask.classList.add('highlight');
    setTimeout(() => {
      updatedTask.classList.remove('highlight');
    }, 3000);

    // Reset add form
    currEdit = -1;
    dbjBtnAdd.classList.remove('dbj-btn-update');
    dbjAddType.value = 'task';
    dbjInputAdd.value = '';
    dbjBtnAdd.textContent = 'Add a Task';
    dbjTitleAdd.textContent = 'Add Item';
  }
}

// Build task list
function listTasks() {
  // Clear current list
  dbjListElement.innerHTML = '';
  dbjLists.forEach(function(task, index) {
    // Create new task <li>
    const newTask = document.createElement('li');
    // Set classes
    newTask.className =
      'list-group-item  dbj-item dbj-' + task.type + ' dbj-task-' + index;

    // Create and add task text
    const taskText = document.createElement('span');
    taskText.appendChild(document.createTextNode(task.text));
    taskText.className = 'dbj-task-text';
    newTask.appendChild(taskText);

    // Append edit and delete buttons
    const btnManageTask = document.createElement('div');
    btnManageTask.className = 'dbj-manage';
    btnManageTask.innerHTML = dbjEditHTML + dbjDeleteHTML;
    newTask.appendChild(btnManageTask);

    // Add task to list
    dbjListElement.appendChild(newTask);
  });
}

// Cross off a task
function disableTask(e) {
  if (e.target.classList.contains('dbj-item')) {
    e.target.classList.toggle('disabled');
  } else if (e.target.parentElement.classList.contains('dbj-item')) {
    e.target.parentElement.classList.toggle('disabled');
  }
}
// Edit a task
function editTask(e) {
  const taskNumToEdit = getItemNumber(e);
  const taskToEdit = dbjLists[taskNumToEdit];
  const dbjAddContainer = document.querySelector('.dbj-add-container');

  dbjAddType.value = taskToEdit.type;
  dbjInputAdd.value = taskToEdit.text;
  dbjBtnAdd.textContent = 'Update Task';
  dbjBtnAdd.classList.add('dbj-btn-update');
  dbjBtnAdd.setAttribute('data-task', taskNumToEdit);
  dbjTitleAdd.textContent = 'Update Task';
  dbjAddContainer.classList.add('highlight');
  setTimeout(() => {
    dbjAddContainer.classList.remove('highlight');
  }, 3000);

  currEdit = taskNumToEdit;

  e.preventDefault();
}

// Delete a task
function deleteTask(e) {
  // remove task from data structure
  dbjLists.splice(getItemNumber(e), 1);

  // Save to LS
  saveToLS();

  // rebuild list output
  listTasks();

  //taskToDelete.remove();
  e.preventDefault();
}

// Clear list
function clearList() {
  dbjListName.textContent = 'Tasks';
  dbjListElement.innerHTML = '';
  localStorage.removeItem('dbj-tasks');
  localStorage.removeItem('dbj-tasks-title');
}

// Get clicked item number
function getItemNumber(e) {
  const taskToManage = e.target.parentElement.parentElement;
  const toManageClasses = taskToManage.className;
  // Extract class name
  let matches = toManageClasses
    .match(/dbj-task-(\d)/g)
    .toString()
    .split('-');
  // Extract number
  return matches[2];
}

function updateListName() {
  // Save to local storage
  localStorage.setItem('dbj-tasks-title', dbjListName.textContent);
}

// Save list to local storage
function saveToLS() {
  localStorage.setItem('dbj-tasks', JSON.stringify(dbjLists));
}

// Load list from local storage
function getFromLS() {
  const currData = JSON.parse(localStorage.getItem('dbj-tasks'));
  if (currData !== null) {
    return currData;
  } else {
    return '';
  }
}
