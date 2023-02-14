let books = [
  {
    id: Math.random().toString(36).substring(2, 9),
    title: 'Test Title',
    author: 'Author',
  },
];

const addBook = (title, author) => {

  // genertate a random id
  const random = Math.random().toString(36).substring(2, 9);

  // add a new book to the books array

  books.push({
    id: random,
    title,
    author,
  });
   listBooks();
}

// remove a book from the books array
const removeBook = (id) => {
  books = books.filter((book) => book.id !== String(id));
   listBooks();
}

// list all books in the books array
const listBooks = ()  => {
  for (let i = 0; i < books.length; i += 1) {
// HTML implementation here
  }
}

