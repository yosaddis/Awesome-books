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
};

// remove a book from the books array
const removeBook = (id) => {
  books = books.filter((book) => book.id !== String(id));
};

addBook('Test Title', 'Author'); // add a book
removeBook(books[0].id); // remove a book
