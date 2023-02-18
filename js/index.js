// Get DOM elements
const dateDisplay = document.querySelector('.header__date');

// create a date-time function
const CurrentDateTime = () => {
	const dateObject = new Date();
	const yearNow = dateObject.getFullYear();
	const monthNow = dateObject.toLocaleString('default', { month: 'long' });
	const dayNow = dateObject.getDate();
	const timeNow = dateObject.toLocaleTimeString();

	// Append suffix to day
	if (dayNow > 3 && dayNow < 21) {
		const date = `${monthNow} ${dayNow}th ${yearNow}`;
		dateDisplay.innerHTML = `${date}, ${timeNow}`;
	} else {
		const d = dayNow % 10;
		let date = '';
		switch (d) {
			case 1:
				date = `${monthNow} ${dayNow}st ${yearNow}`;
				dateDisplay.innerHTML = `${date}, ${timeNow}`;
				break;
			case 2:
				date = `${monthNow} ${dayNow}nd ${yearNow}`;
				dateDisplay.innerHTML = `${date}, ${timeNow}`;
				break;
			case 3:
				date = `${monthNow} ${dayNow}rd ${yearNow}`;
				dateDisplay.innerHTML = `${date}, ${timeNow}`;
				break;
			default:
				date = `${monthNow} ${dayNow}th ${yearNow}`;
				dateDisplay.innerHTML = `${date}, ${timeNow}`;
				break;
		}
	}
};

setInterval(CurrentDateTime, 1000);

const showAndRemoveSuccessMessage = (target) => {
	const successMessage = document.createElement('p');
	successMessage.classList.add('books__addbook-success');
	successMessage.textContent = 'Book added successfully';
	target.insertAdjacentElement('afterend', successMessage);

	setTimeout(() => {
		successMessage.remove();
	}, 3000);
};

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
	// eslint-disable-next-line class-methods-use-this
	addBook(book) {
		// get the books from the books array from localStorage
		const booksCollection = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
		booksCollection.push(book);

		// update the books array in localStorage
		localStorage.setItem('books', JSON.stringify(booksCollection));
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



// add event listener to the page
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('header__nav-item')) {
		// Get DOM elements
		const navItems = document.querySelectorAll('.header__nav-item');

		// remove the active class from all nav items
		navItems.forEach((item) => {
			item.classList.remove('active');
		});

		// add the active class to the clicked nav item
		e.target.classList.add('active');

		// check which nav item was clicked
		if (e.target.dataset.nav === 'add') {
			displayForm();
		} else if (e.target.dataset.nav === 'contact') {
			displayContact();
		} else {
			displayBooks();

			// create a new instance of the Books class
			const books = new Books();

			// call the renderBooks method from books class when the page loads
			books.renderBooks();
		}
	} else if (e.target.dataset.input === 'submit') {
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
		// show success message
		showAndRemoveSuccessMessage(form);
	} else if (e.target.dataset.id) {
		// create a new instance of the Books class
		const books = new Books();

		// call the removeBook function
		books.removeBook(e.target.dataset.id);
	}
});