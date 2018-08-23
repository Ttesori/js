// ES5 Version
// -- Get book info from UI
// -- Add to table

const Book = function(title, author, rating, percent) {
  this.title = title;
  this.author = author;
  this.rating = rating;
  this.percent = percent;
};

const Data = function() {
  this.bookData = [];
};
Data.prototype.addBook = function(book) {
  console.log('Adding book to data structure');
  this.bookData.push(book);
};
Data.prototype.getBook = function(id) {
  return this.bookData[id];
};
Data.prototype.removeBook = function(id) {
  this.bookData.splice(id, 1);
};
Data.prototype.getBooks = function() {
  console.log('Listing books in data structure');
  return this.bookData;
};
Data.prototype.saveToLS = function() {
  console.log('Save to LS');
};
Data.prototype.getFromLS = function() {
  console.log('Get from LS');
};

const UI = function() {};

UI.prototype.addBook = function(book) {
  console.log('Add Book');
};
UI.prototype.removeBook = function(book) {
  console.log('Remove book');
};
UI.prototype.editBook = function(book) {
  console.log('Edit book');
};
UI.prototype.listBooks = function(books) {
  console.log('Listing books');
  const table = document.querySelector('.bl-table tbody');
  table.innerHTML = '';
  books.forEach(function(book, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.rating}/5</td>
    <td>${book.percent}%</td>
    <td>Edit | Del</td>`;
    row.setAttribute('data-id', index);
    table.appendChild(row);
  });
};
UI.prototype.showMsg = function(msg, type) {
  console.log(`Message ${msg} Type: ${type}`);
};
UI.prototype.validateData = function() {
  console.log('Validate Data');
  const titleEl = document.querySelector('#bl-title');
  const authorEl = document.querySelector('#bl-author');
  const ratingEl = document.querySelector('#bl-rating');
  const percentEl = document.querySelector('#bl-percent');

  const title = titleEl.value;
  const author = authorEl.value;
  const rating = parseInt(ratingEl.value);
  const percent = parseInt(percentEl.value);

  if (title === '') {
    this.showMsg('Error: Title cannot be empty', 'error');
  } else if (author === '') {
    this.showMsg('Error: Author cannot be empty', 'error');
  } else if (isNaN(percent)) {
    this.showMsg('Error: Select a Percentage', 'error');
  } else if (isNaN(rating)) {
    this.showMsg('Error: Select a rating', 'error');
  } else {
    console.log(percent);
    return new Book(title, author, rating, percent);
  }
  return false;
};

function init() {
  const testUI = new UI();
  const data = new Data();
  // Add Event Listeners
  const btnAdd = document.querySelector('.bl-btn-add');
  btnAdd.addEventListener('click', function(e) {
    // Validate data
    book = testUI.validateData();
    if (book) {
      // If valid, add to table and rebuild list
      data.addBook(book);
      testUI.listBooks(data.getBooks());
    } else {
      console.log('Data not valid');
    }
    e.preventDefault();
  });

  const testBook = new Book('Lord of the Rings', 'JRR Tolkien', 5, 75);
  console.log(data.addBook(testBook));
  testUI.listBooks(data.getBooks());
  console.log(data.getBooks());
}

init();
