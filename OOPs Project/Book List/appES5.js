// Book Constructor
function Book(name, author, price, isbn) {
   this.name = name;
   this.author = author;
   this.price = price;
   this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Info Displaying Function (Prototype Function of UI)
UI.prototype.showAlert = function (message, className) {
   if (document.querySelector('.alert') === null) {
      const form = document.getElementById('entry-form');
      const container = document.querySelector('.container');

      const errorDiv = document.createElement('div');
      errorDiv.className = `alert ${className}`;
      errorDiv.textContent = `${message}`;
      container.insertBefore(errorDiv, form);
      setTimeout(() => {
         errorDiv.remove();
      }, 2000);
   } else {
      document.querySelector('.alert').remove();
      this.showAlert(message, className);
   }
};

// Adding Book to list (Prototype function of UI)
UI.prototype.addBookToList = function (book) {
   const tbody = document.getElementById('book-list');
   const tr = document.createElement('tr');
   tr.innerHTML = `<td> ${book.name.value} </td>
   <td> ${book.author.value} </td>
   <td> ${book.price.value} </td>
   <td> ${book.isbn.value} <i style="cursor: pointer; padding-right: 1rem;" class="fas fa-trash u-pull-right"></i> </td>`;
   tbody.appendChild(tr);
};

// Clearing Input Feild (Prototype function of UI)
UI.prototype.clearInputFeild = function () {
   document.getElementById('name').value = '';
   document.getElementById('author').value = '';
   document.getElementById('price').value = '';
   document.getElementById('isbn').value = '';
};

// Removing Book from list (Prototype function of UI)
UI.prototype.removeBookFromList = function (removeBook) {
   if (confirm('Do you want to Delete This Book ?')) {
      removeBook.parentElement.parentElement.remove();
      this.showAlert('Book Has Been Deleted', 'info');
   }
};

//

// Event Listeners

// 1. Addign Book
document.getElementById('entry-form').addEventListener('submit', function (e) {
   // get Form Values
   const name = document.getElementById('name'),
      author = document.getElementById('author'),
      price = document.getElementById('price'),
      isbn = document.getElementById('isbn');

   // Instantiate Book
   const book = new Book(name, author, price, isbn);

   // Instantiate UI Change
   const ui = new UI();

   // Validation
   if (name.value === '' || author.value === '' || price.value === '' || isbn.value === '') {
      ui.showAlert('Please Enter All The Details...', 'error');
   } else {
      ui.addBookToList(book);
      ui.clearInputFeild();
      ui.showAlert('Book Added!', 'success');
   }

   e.preventDefault();
});

// 2. Removing Book
document.getElementById('book-list').addEventListener('click', function (e) {
   // Instantiate UI Change
   const ui = new UI();

   if (e.target.classList.contains('fas')) {
      ui.removeBookFromList(e.target);
   }

   e.preventDefault();
});
