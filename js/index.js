// create a class for book collection
class Books {
  constructor() {
    // eslint-disable-next-line no-unused-expressions
    this.list;
  }

  // get books from local storage
  // eslint-disable-next-line class-methods-use-this
  get list() {
    return localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
  }

  // render books
  renderBooks() {
    // Get DOM elements'
    const bookList = document.querySelector('.books__list');

    // get the books from the books array from localStorage
    const booksCollection = this.list;

    // check the length of the books array
    if (booksCollection.length === 0) {
      // clear the list
      bookList.innerHTML = '';

      // update the DOM with no books message
      bookList.innerHTML = '<p class="books__list-item">No books to show</p>';
    } else {
      // loop through the books array
      const bookshtml = booksCollection.map((book) => `

      <div class="books__list-item">
        <p class="books__list-book">"${book.title}" by ${book.author}</p>
        <button class="books__list-item-delete" data-id="${book.id}">Delete</button>
      </div>
    `).join('');

      // clear the list
      bookList.innerHTML = '';

      // update the DOM with the new list
      bookList.insertAdjacentHTML('afterbegin', bookshtml);
    }
  }

  // add a book function
  addBook(book) {
    // get the books from the books array from localStorage
    const booksCollection = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
    booksCollection.push(book);

    // update the books array in localStorage
    localStorage.setItem('books', JSON.stringify(booksCollection));

    // call the renderBooks function
    this.renderBooks();
  }

  // remove a book function
  removeBook(id) {
    // get the books from the books array from localStorage
    const booksCollection = JSON.parse(localStorage.getItem('books'));
    const updatedBooksCollection = booksCollection.filter((book) => book.id !== id);

    // update the books array in localStorage
    localStorage.setItem('books', JSON.stringify(updatedBooksCollection));

    // call the renderBooks function
    this.renderBooks();
  }
}

// render  books on the page when page loads
window.addEventListener('DOMContentLoaded', () => {
  // create a new instance of the Books class
  const books = new Books();

  // call the renderBooks method from books class when the page loads
  books.renderBooks();
});

// add event listener to the page
document.addEventListener('click', (e) => {
  if (e.target.dataset.input === 'submit') {
    // Get DOM elements
    const form = document.querySelector('.books__addbook-form');

    // check form validity
    if (form.checkValidity()) {
      // prevent the default behaviour
      e.preventDefault();

      // get the values from the form
      const formData = new FormData(form);
      const title = formData.get('title');
      const author = formData.get('author');
      const id = Math.random().toString(36).substring(2, 9);

      const newBook = { id, title, author };

      // create a new instance of the Books class
      const books = new Books();

      // call the addBook function
      books.addBook(newBook);

      // clear form
      form.reset();
    }
  } else if (e.target.dataset.id) {
    // create a new instance of the Books class
    const books = new Books();

    // call the removeBook function
    books.removeBook(e.target.dataset.id);
  }
});

const showBooksSection = document.querySelector('.show-books');
const addBooksSection = document.querySelector('.add-books');
const contactSection = document.querySelector('.contact');

function showBookListSection() {
	addBooksSection.classList.add('hide');
	contactSection.classList.add('hide');
	showBooksSection.classList.remove('hide');
	confirmationMessage.innerHTML = '';
	cont = 1;
}

function showAddBookSection() {
	contactSection.classList.add('hide');
	showBooksSection.classList.add('hide');
	addBooksSection.classList.remove('hide');
}

function showContactSection() {
	addBooksSection.classList.add('hide');
	showBooksSection.classList.add('hide');
	contactSection.classList.remove('hide');
	confirmationMessage.innerHTML = '';
}

const bookListShowBtn = document.querySelector('.book-list-show');
const addBookShowBtn = document.querySelector('.add-book-show');
const contactShowBtn = document.querySelector('.contact-show');

bookListShowBtn.addEventListener('click', showBookListSection);
addBookShowBtn.addEventListener('click', showAddBookSection);
contactShowBtn.addEventListener('click', showContactSection);