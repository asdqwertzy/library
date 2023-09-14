var myLibrary = [];

// Object constructor
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


function handleSubmit(event) {
  event.preventDefault();

  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let read = document.getElementById('read');

  // Input sanitization
  let pagesValue = parseInt(pages.value);
  if (isNaN(pagesValue) || pagesValue <= 0) {
    alert('Page count can\'t be negative.');
    return;
  }


  addBookToLibrary(title.value, author.value, pages.value, read.checked ? 'Yes' : 'No');

  // Create a card element and append it to the content area
  var card = document.createElement('div');
  card.classList.add('card')
  card.innerHTML = `
  <p class="title"><span class="label">Title:</span> ${title.value}</p>
  <p class="author"><span class="label">Author:</span> ${author.value}</p>
  <p class="pages"><span class="label">Pages:</span> ${pages.value}</p>
  <p class="read"><span class="label">Read?:</span> ${read.checked ? 'Yes' : 'No'}</p>
  <div class="icons">
    <button class="icon-button read-button" title="Read toggle"></button>
    <div class="right"><button class="icon-button edit-button" title="Edit this entry"></button>
    <button class="icon-button remove-button" title="Remove this entry"></button></div>
  </div>
  `;

  var newIndex = myLibrary.length - 1;
  card.setAttribute('data-id', newIndex);

  const content = document.querySelector('.content');
  content.appendChild(card);



  // Reset input fields
  console.log(`Title: ${title.value}, Author: ${author.value}, Pages: ${pages.value}, Read: ${read.checked}`);
  title.value = ""
  author.value = ""
  pages.value = ""
  read.checked = false;

}

function removeBook(element) {
  var dataIndex = element.getAttribute('data-id');
  element.remove();
  myLibrary.splice(dataIndex, 1);
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-button')) {
    const card = event.target.closest('.card');
    if (card) {
      removeBook(card);
    }
  }
});