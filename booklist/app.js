// ES5 Version
// -- Get book info from UI
// -- Add to table

// Book class - the item we're manipulating in this app
const Book = function(title, author, rating, percent) {
  this.title = title;
  this.author = author;
  this.rating = rating;
  this.percent = percent;
};

// Data class - contains methods for manipulating data structure
const Data = function() {
  this.bookData = [];
};
Data.prototype.addBook = function(book) {
  this.bookData.push(book);
  this.saveToLS();
};
Data.prototype.updateBook = function(book, id) {
  this.bookData[id] = book;
  this.saveToLS();
};
Data.prototype.getBook = function(id) {
  return this.bookData[id];
};
Data.prototype.removeBook = function(id) {
  this.bookData.splice(id, 1);
  this.saveToLS();
};
Data.prototype.getBooks = function() {
  console.log('Listing books in data structure');
  return this.bookData;
};
Data.prototype.saveToLS = function() {
  localStorage.setItem('bl-books', JSON.stringify(this.bookData));
};
Data.prototype.getFromLS = function() {
  if (localStorage.getItem('bl-books')) {
    this.bookData = JSON.parse(localStorage.getItem('bl-books'));
  }
};

// UI Class
const UI = function() {
  this.titleEl = document.querySelector('#bl-title');
  this.authorEl = document.querySelector('#bl-author');
  this.ratingEl = document.querySelector('#bl-rating');
  this.percentEl = document.querySelector('#bl-percent');
  this.btnFormEl = document.querySelector('.bl-btn-add');
};

// Edit book in form
UI.prototype.editBook = function(book, id) {
  // Change form submit button
  btnFormEl.value = 'Update Book';
  btnFormEl.dataset.id = id;

  // load book data
  titleEl.value = book.title;
  authorEl.value = book.author;
  ratingEl.value = book.rating;
  percentEl.value = book.percent;
};

// List all books
UI.prototype.listBooks = function(books) {
  const table = document.querySelector('.bl-table tbody');
  table.innerHTML = '';
  books.forEach(function(book, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.rating}/5</td>
    <td>${book.percent}%</td>
    <td><a href="#" class="bl-btn-edit">Edit</a> | <a href="#" class="bl-btn-del">Del</a></td>`;
    row.setAttribute('data-id', index);
    table.appendChild(row);
  });
};

// Show alert before form
UI.prototype.showMsg = function(msg, type) {
  const msgEl = document.querySelector('.bl-alert');
  msgEl.className = 'bl-alert alert-' + type;
  msgEl.innerHTML = `${msg}`;
  msgEl.style.display = 'block';
  setTimeout(function() {
    msgEl.style.display = 'none';
  }, 3000);
};

// Reset fields
UI.prototype.resetForm = function() {
  this.titleEl.value = '';
  this.authorEl.value = '';
  this.ratingEl.value = '';
  this.percentEl.value = '';
  this.btnFormEl.value = 'Add Book';
};

// Validate data before saving
UI.prototype.validateData = function() {
  const title = this.titleEl.value;
  const author = this.authorEl.value;
  const rating = parseInt(this.ratingEl.value);
  const percent = parseInt(this.percentEl.value);

  if (title === '') {
    this.showMsg('Error: Title cannot be empty', 'error');
  } else if (author === '') {
    this.showMsg('Error: Author cannot be empty', 'error');
  } else if (isNaN(percent)) {
    this.showMsg('Error: Select a Percentage', 'error');
  } else if (isNaN(rating)) {
    this.showMsg('Error: Select a rating', 'error');
  } else {
    return new Book(title, author, rating, percent);
  }
  return false;
};

// Initalize application
function init() {
  const testUI = new UI();
  const data = new Data();
  data.getFromLS();

  // Add Event Listeners
  // Add Book Button - Form
  const formAdd = document.querySelector('.bl-add');
  formAdd.addEventListener('submit', function(e) {
    const submitType = document.querySelector('.bl-btn-add').value;
    if (submitType === 'Add Book') {
      // Validate data
      const book = testUI.validateData();
      if (book) {
        // If valid, add to table and rebuild list
        data.addBook(book);
        testUI.showMsg('Book added successfully!', 'success');
        testUI.resetForm();
        testUI.listBooks(data.getBooks());
      }
    } else {
      // Edit Book Button Event Listener
      const book = testUI.validateData();
      const bookID = document.querySelector('.bl-btn-add').dataset.id;
      if (book) {
        // If valid, add to table and rebuild list
        data.updateBook(book, bookID);
        testUI.showMsg('Book updated successfully!', 'success');
        testUI.listBooks(data.getBooks());
        testUI.resetForm();
      }
    }

    e.preventDefault();
  });

  // Delete Button - Table
  const blTable = document.querySelector('.bl-table');
  blTable.addEventListener('click', function(e) {
    if (e.target.classList.contains('bl-btn-del')) {
      const idToDel = e.target.parentElement.parentElement.dataset.id;
      data.removeBook(idToDel);
      testUI.listBooks(data.getBooks());
    } else if (e.target.classList.contains('bl-btn-edit')) {
      // Edit button - table
      const idToEdit = e.target.parentElement.parentElement.dataset.id;
      let bookToEdit = data.getBook(idToEdit);
      testUI.editBook(bookToEdit, idToEdit);
    }
    e.preventDefault();
  });
  testUI.listBooks(data.getBooks());
}
init();
