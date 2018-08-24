// Application to track books read and save in LS

// Book class -- data for individual books
class Book {
  constructor(title, author, rating, percent) {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.percent = percent;
  }
}

// Data class -- manipulate data and save to LS
class Data {
  constructor() {
    if (localStorage.getItem('bl-books')) {
      this.bookData = JSON.parse(localStorage.getItem('bl-books'));
    } else {
      this.bookData = [];
    }
  }

  addBook(book) {
    this.bookData.push(book);
    Data.saveToLS(this.bookData);
  }

  updateBook(book, id) {
    this.bookData[id] = book;
    Data.saveToLS(this.bookData);
  }

  getBook(id) {
    return this.bookData[id];
  }

  removeBook(id) {
    this.bookData.splice(id, 1);
    Data.saveToLS(this.bookData);
  }

  getBooks() {
    return this.bookData;
  }

  static saveToLS(bookData) {
    localStorage.setItem('bl-books', JSON.stringify(bookData));
  }
}

// UI class -- manage Add/UpdateForm and Books Table
class UI {
  constructor() {
    this.titleEl = document.querySelector('#bl-title');
    this.authorEl = document.querySelector('#bl-author');
    this.ratingEl = document.querySelector('#bl-rating');
    this.percentEl = document.querySelector('#bl-percent');
    this.btnFormEl = document.querySelector('.bl-btn-add');
  }

  // Add book data to Form for editing
  editBook(id, book) {
    // Change form submit button
    this.btnFormEl.value = 'Update Book';
    this.btnFormEl.dataset.id = id;

    // load book data
    this.titleEl.value = book.title;
    this.authorEl.value = book.author;
    this.ratingEl.value = book.rating;
    this.percentEl.value = book.percent;
  }
  // List all books in table
  static listBooks(books) {
    const table = document.querySelector('.bl-table tbody');
    table.innerHTML = '';
    // Create row for each book
    books.forEach(function(book, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.rating}/5</td>
      <td>${book.percent}%</td>
      <td><a href="#" class="bl-btn-edit" title="Edit Book">Edit</a> <a href="#" class="bl-btn-del" title="Delete Book">X</a></td>`;
      row.setAttribute('data-id', index);
      table.appendChild(row);
    });
  }

  // Show alert above form
  static showMsg(msg, type) {
    const msgEl = document.querySelector('.bl-alert');
    msgEl.className = 'bl-alert alert-' + type;
    msgEl.innerHTML = `${msg}`;
    msgEl.style.display = 'block';
    setTimeout(function() {
      msgEl.style.display = 'none';
    }, 3000);
  }
  // Reset form fields
  resetFields() {
    this.titleEl.value = '';
    this.authorEl.value = '';
    this.ratingEl.value = '';
    this.percentEl.value = '';
    this.btnFormEl.value = 'Add Book';
  }

  // Validate form data, return Book if valid
  validateData() {
    const title = this.titleEl.value;
    const author = this.authorEl.value;
    const rating = parseInt(this.ratingEl.value);
    const percent = parseInt(this.percentEl.value);

    if (title === '') {
      UI.showMsg('Error: Title cannot be empty', 'error');
    } else if (author === '') {
      UI.showMsg('Error: Author cannot be empty', 'error');
    } else if (isNaN(percent)) {
      UI.showMsg('Error: Select a Percentage', 'error');
    } else if (isNaN(rating)) {
      UI.showMsg('Error: Select a rating', 'error');
    } else {
      return new Book(title, author, rating, percent);
    }
    return false;
  }
}

// App class -- manage UI and Data classes
class App {
  constructor() {
    this.ui = new UI();
    this.data = new Data();

    this.addEventListeners(this.ui, this.data);
    UI.listBooks(this.data.getBooks());
  }

  // Add event listeners to page
  addEventListeners(ui, data) {
    // Add/Edit Button - Form
    const formAdd = document.querySelector('.bl-add');
    formAdd.addEventListener('submit', function(e) {
      const submitType = document.querySelector('.bl-btn-add').value;
      if (submitType === 'Add Book') {
        App.addButtonEvent(ui, data);
      } else {
        App.editButtonEvent(ui, data);
      }
      e.preventDefault();
    });

    // Delete/Edit Button - Table
    const blTable = document.querySelector('.bl-table');
    blTable.addEventListener('click', function(e) {
      if (e.target.classList.contains('bl-btn-del')) {
        // Delete Item
        App.deleteItemFromTableEvent(e, data);
      } else if (e.target.classList.contains('bl-btn-edit')) {
        // Edit Item
        App.editItemFromTable(e, ui, data);
      }
      e.preventDefault();
    });
  }
  // When Add Book button is clicked
  static addButtonEvent(ui, data) {
    // Validate data
    const book = ui.validateData();
    if (book) {
      // If valid, add to table and rebuild list
      data.addBook(book);
      UI.showMsg('Book added successfully!', 'success');
      ui.resetFields();
      UI.listBooks(data.getBooks());
    }
  }
  // When Update Book button is clicked
  static editButtonEvent(ui, data) {
    // Edit Book Button Event Listener
    const book = ui.validateData();
    const bookID = document.querySelector('.bl-btn-add').dataset.id;
    if (book) {
      // If valid, add to table and rebuild list
      data.updateBook(book, bookID);
      UI.showMsg('Book updated successfully!', 'success');
      UI.listBooks(data.getBooks());
      ui.resetFields();
    }
  }
  // When Delete button is clicked in table
  static deleteItemFromTableEvent(e, data) {
    const idToDel = e.target.parentElement.parentElement.dataset.id;
    data.removeBook(idToDel);
    UI.listBooks(data.getBooks());
  }
  // When edit button is clicked in table
  static editItemFromTable(e, ui, data) {
    const idToEdit = e.target.parentElement.parentElement.dataset.id;
    const bookToEdit = data.getBook(idToEdit);
    ui.editBook(idToEdit, bookToEdit);
  }
}
// Initialize application
const app = new App();
