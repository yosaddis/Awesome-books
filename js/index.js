class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const addNewBookForm = document.querySelector('.bookForm');
const {title} = addNewBookForm.elements;
const {author} = addNewBookForm.elements;  

let books = {};

console.log(books);

function addBook(){
		let newBook = new Book(title,author);
		books.push(newBook);
	}

function removeBook(index){
	books.splice(index,1);
}

addNewBookForm.addEventListener('submit', () => {

});
