/////////////////////////////////////////////////////// Book Class //////////////////////////////////////////////////////////////

class Book {
   constructor(name, author, price, isbn) {
      this.name = name;
      this.author = author;
      this.price = price;
      this.isbn = isbn;
   }
}

//
//
//
//
//
//
//

/////////////////////////////////////////////////////// UI Class ////////////////////////////////////////////////////////////////

class UI {
   // Display Alert
   showAlert(message, className) {
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
   }

   // Adding Book
   addBookToList(book) {
      const tbody = document.getElementById('book-list');
      const tr = document.createElement('tr');
      tr.innerHTML = `<td> ${book.name} </td>
      <td> ${book.author} </td>
      <td> ${book.price} </td>
      <td>${book.isbn}<i style="cursor: pointer; padding-right: 1rem;" class="fas fa-trash u-pull-right"></i></td>`;
      tbody.appendChild(tr);
   }

   // Clearing Input Feild (Prototype function of UI)
   clearInputFeild() {
      document.getElementById('name').value = '';
      document.getElementById('author').value = '';
      document.getElementById('price').value = '';
      document.getElementById('isbn').value = '';
   }

   // Removing Book from list (Prototype function of UI)
   removeBookFromList(removeBook) {
      if (confirm('Do you want to Delete This Book ?')) {
         removeBook.parentElement.parentElement.remove();
         this.showAlert('Book Has Been Deleted', 'info');
      }
   }
}

//
//
//
//
//
//
//

/////////////////////////////////////////////////////// Storage Class ///////////////////////////////////////////////////////////

class Storage {
   // Getting Books From Storage
   static getBookListFromStorage() {
      let books;
      if (localStorage.getItem('books') === null) {
         books = [];
      } else {
         books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
   }

   // Adding Books To Storage
   static addBookToStorage(book) {
      const books = Storage.getBookListFromStorage();
      books.push(book);

      localStorage.setItem('books', JSON.stringify(books));
   }

   // Removing Books From Storage
   static removeBookFromStorage(isbn) {
      const books = Storage.getBookListFromStorage();

      books.forEach(function (element, index) {
         if (element.isbn === isbn) {
            books.splice(index, 1);
         }
      });

      localStorage.setItem('books', JSON.stringify(books));
   }

   // Getting Books From Storage ON DOM Content Loading
   static reloadBookListFromStorage() {
      const books = Storage.getBookListFromStorage();

      const ui = new UI();
      books.forEach((element) => {
         ui.addBookToList(element);
      });
   }
}

//
//
//
//
//
//
//

/////////////////////////////////////////////////////// Event Listeners /////////////////////////////////////////////////////////

// 1. Reload DOM
document.addEventListener('DOMContentLoaded', Storage.reloadBookListFromStorage());

// 2. Adding Book
document.getElementById('entry-form').addEventListener('submit', function (e) {
   // get Form Values
   const name = document.getElementById('name').value,
      author = document.getElementById('author').value,
      price = document.getElementById('price').value,
      isbn = document.getElementById('isbn').value;

   // Instantiate Book
   const book = new Book(name, author, price, isbn);

   // Instantiate UI Change
   const ui = new UI();

   // Validation
   if (name === '' || author === '' || price === '' || isbn === '') {
      ui.showAlert('Please Enter All The Details...', 'error');
   } else {
      ui.addBookToList(book);
      Storage.addBookToStorage(book);
      ui.clearInputFeild();
      ui.showAlert('Book Added!', 'success');
   }

   e.preventDefault();
});

// 3. Removing Book
document.getElementById('book-list').addEventListener('click', function (e) {
   // Instantiate UI Change
   const ui = new UI();

   if (e.target.classList.contains('fas')) {
      ui.removeBookFromList(e.target);
      Storage.removeBookFromStorage(e.target.parentElement.textContent);
   }

   e.preventDefault();
});
