let books = [
  {
    id: Math.random().toString(36).substring(2, 9),
    title: 'Test Title',
    author: 'Author',
  },
];

function addBook(title, author) {
  const random = Math.random().toString(36).substring(2, 9);
  books.push({
    id: random,
    title,
    author,
  });
  // listBooks();
}

function removeBook(id) {
  books = books.filter((book) => book.id !== String(id));
  // listBooks();
}

function listBooks() {
  for (let i = 0; i < books.length; i += 1) {
    console.log(books[i]);
  }
}

listBooks();
console.log('===========================');
addBook('Test2', 'Many author');
addBook('Test3', 'Many author');
console.log('===========================');
listBooks();
console.log('===========================');
removeBook(books[0].id);
listBooks();
console.log('===========================');
