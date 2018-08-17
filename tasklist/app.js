/*
Project: Bullet Journal-style tasklist

Iteration 1
- The user should see a list of current tasks
- The user should be able to add a task
- The user should be able to cross off completed tasks
- The user should be able to delete tasks

Iteration 2
- The user should be able to select a category for the task (todo, note, event)
- The user should be able to edit an item
- The user should be able to add an item inline
- Tasks should persist in local storage

Iteration 3


*/

// Get UI Variables
const dbjList = document.querySelector('.dbj-list');
const dbjInputAdd = document.querySelector('.dbj-input-add');
const dbjBtnAdd = document.querySelector('.dbj-btn-add');
const dbjDeleteHTML =
  '<a href="#" class="dbj-btn-delete"><span aria-hidden="true" class="text-danger">&times;</span></a> ';
const dbjBtnDelete = document.querySelector('.dbj-btn-delete');

// Set up event listeners
dbjBtnAdd.addEventListener('click', addTask);
dbjList.addEventListener('click', function(e) {
  // If delete button is target, delete
  if (e.target.parentElement.nodeName === 'A') {
    deleteTask(e);
  } else {
    // Disable task
    disableTask(e);
  }
});

// Add a new task
function addTask() {
  const textTask = dbjInputAdd.value;
  // If task input isn't empty
  if (textTask !== '') {
    // Create new task <li>
    const newTask = document.createElement('li');
    newTask.appendChild(document.createTextNode(textTask));
    newTask.className = 'list-group-item d-flex justify-content-between';

    // Append delete button
    const btnDeleteTask = document.createElement('div');
    btnDeleteTask.className = 'dbj-delete';
    btnDeleteTask.innerHTML = dbjDeleteHTML;
    newTask.appendChild(btnDeleteTask);

    // Add task to list
    dbjList.appendChild(newTask);

    // Clear input
    dbjInputAdd.value = '';
  }
}

// Cross off a task
function disableTask(e) {
  if (e.target.classList.contains('list-group-item')) {
    e.target.classList.toggle('disabled');
  }
}

// Delete a task
function deleteTask(e) {
  const taskToDelete = e.target.parentElement.parentElement.parentElement;
  taskToDelete.remove();
  e.preventDefault();
}
