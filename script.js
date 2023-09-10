var myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}


function addBookToLibrary(title, author, pages, read) {
    var newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
  }

  function ltb() {
    myLibrary.forEach((book) => console.log(book.title, book.author, book.pages, book.read))
  }

  function newBook() {
    
  }