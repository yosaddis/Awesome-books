// render books
const renderBooks = () => {
	
};

// add a book function
const addBook = (book) => {
	// get the books from the books array from localStorage
	const booksCollection = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
	booksCollection.push(book);

	// update the books array in localStorage
	localStorage.setItem('books', JSON.stringify(booksCollection));

	// call the renderBooks function
	renderBooks();
};

// remove a book function
const removeBook = (id) => {
	// get the books from the books array from localStorage
	const booksCollection = JSON.parse(localStorage.getItem('books'));
	const updatedBooksCollection = booksCollection.filter((book) => book.id !== id);

	// update the books array in localStorage
	localStorage.setItem('books', JSON.stringify(updatedBooksCollection));

	// call the renderBooks function
	renderBooks();
};
