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
  <p class="title"><span class="label">Title:</span> <span class="value">${title.value}</span></p>
  <p class="author"><span class="label">Author:</span> <span class="value">${author.value}</span></p>
  <p class="pages"><span class="label">Pages:</span> <span class="value">${pages.value}</span></p>
  <p class="read"><span class="label">Read?:</span> <span class="status">${read.checked ? 'Yes' : 'No'}</span></p>
  <div class="icons">
    <button class="icon-button read-button" title="Read toggle" onclick="toggleReadStatus(this)"></button>
    <div class="right">
      <button class="icon-button edit-button" title="Edit this entry"></button>
      <button class="icon-button remove-button" title="Remove this entry"></button>
    </div>
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
  const modal = document.getElementById('editModal');

  if (event.target.classList.contains('remove-button')) {
    const card = event.target.closest('.card');
    if (card) {
      removeBook(card);
    }
  }
  if (event.target.classList.contains('edit-button')) {
    const card = event.target.closest('.card');
    const dataIndex = card.getAttribute('data-id');
    openEditModal(dataIndex);
  }
  if (event.target === modal) {
    discardEdits();
  }
});


function toggleReadStatus(button) {
  const card = button.closest('.card');
  const statusElement = card.querySelector('.status');
  const dataIndex = card.getAttribute('data-id');

  if (myLibrary[dataIndex].read === 'Yes') {
    myLibrary[dataIndex].read = 'No';
  } else {
    myLibrary[dataIndex].read = 'Yes';
  }

  statusElement.textContent = myLibrary[dataIndex].read;
}

function discardEdits() {
  const modal = document.getElementById('editModal');
  modal.style.display = 'none';
}

function openEditModal(dataIndex) {
  const modal = document.getElementById('editModal');
  const book = myLibrary[dataIndex];

  document.getElementById('editTitle').value = book.title;
  document.getElementById('editAuthor').value = book.author;
  document.getElementById('editPages').value = book.pages;
  document.getElementById('editRead').checked = book.read === 'Yes';

  modal.setAttribute('data-index', dataIndex);

  modal.style.display = 'flex';
}


function saveEdits() {
  const modal = document.getElementById('editModal');
  const dataIndex = modal.getAttribute('data-index');
  const book = myLibrary[dataIndex];

  book.title = document.getElementById('editTitle').value;
  book.author = document.getElementById('editAuthor').value;
  book.pages = document.getElementById('editPages').value;
  book.read = document.getElementById('editRead').checked ? 'Yes' : 'No';

  updateBookEntry(dataIndex);

  modal.style.display = 'none';
}

function updateBookEntry(dataIndex) {
  const card = document.querySelector(`[data-id="${dataIndex}"]`);
  const book = myLibrary[dataIndex];

  card.querySelector('.title .value').textContent = book.title;
  card.querySelector('.author .value').textContent = book.author;
  card.querySelector('.pages .value').textContent = book.pages;
  card.querySelector('.read .status').textContent = book.read;
}