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

function handleSubmit(event) {
  event.preventDefault();

  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let read = document.getElementById('read');

  console.log(`Title: ${title.value}, Author: ${author.value}, Pages: ${pages.value}, Read: ${read.checked}`);
  title.value = ""
  author.value = ""
  pages.value = ""
  read.checked = false;
}