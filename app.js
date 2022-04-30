// create empty array to hold library books
let myLibrary = [];

// set "book" prototype
const book = {
  read: "false",
  toggleStatus: function () {
    if (this.read === "true") {
      this.read = "false";
    } else {
      this.read = "true";
    }
  },
};

// using form data, create newBook object, add to myLibrary array
const addBookToLibrary = function (event) {
  event.preventDefault();
  const newBook = Object.create(book);
  newBook.title = form.elements["title"].value;
  newBook.author = form.elements["author"].value;
  newBook.pages = form.elements["pages"].value;
  newBook.read = form.elements["status"].value;
  myLibrary.push(newBook);
  form.reset();
  form.classList.toggle("show-form");
  listLibrary();
};

// list books from array in a table
const listLibrary = function () {
  bookListing.textContent = "";
  const table = document.createElement("table");
  table.innerHTML = `
	<thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Pages</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  `;
  const tableBody = document.createElement("tbody");
  myLibrary.forEach(function (element) {
    const row = document.createElement("tr");
    const title = document.createElement("td");
    title.classList.add("title");
    const author = document.createElement("td");
    author.classList.add("author");
    const pages = document.createElement("td");
    pages.classList.add("pages");
    const read = document.createElement("td");
    read.classList.add("read");
    const remove = document.createElement("td");
    remove.classList.add("remove");
    tableBody.appendChild(row);
    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(pages);
    row.appendChild(read);
    row.appendChild(remove);
    title.textContent = element.title;
    author.textContent = element.author;
    pages.textContent = element.pages;
    read.innerHTML = `
    <button type="button" title="Read/Unread" class="read-btn" data-id="${myLibrary.indexOf(
      element
    )}">
      <svg class="${element.read === "true" ? "status-read" : "status-unread"}" 
      viewBox="0 0 24 24">
        <path fill="currentColor" d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" />
      </svg>
    </button>
    `;
    remove.innerHTML = `
    <button type="button" title="Delete" class="delete-btn" data-cmd="delete" data-id="${myLibrary.indexOf(
      element
    )}">
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
      </svg>
    </button>
    `;
  });
  table.appendChild(tableBody);
  bookListing.appendChild(table);
  // once table built, listen to buttons
  watchReadButtons();
  watchDeleteButtons();
};

// watch for "read status" button clicks and call toggle function on click
const watchReadButtons = function () {
  const readButtons = document.querySelectorAll("button.read-btn");
  readButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookTarget = myLibrary[button.getAttribute("data-id")];
      bookTarget.toggleStatus();
      listLibrary();
    });
  });
};

// watch for "delete" button clicks and remove book on click
const watchDeleteButtons = function () {
  const deleteButtons = document.querySelectorAll("button.delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (confirm("Are you sure? Deletion is permanent.") == true) {
        const bookTarget = button.getAttribute("data-id");
        myLibrary.splice(bookTarget, 1);
        // after delete book, list remaining library
        if (myLibrary.length !== 0) {
          listLibrary();
        } else {
          bookListing.textContent = "";
        }
      }
    });
  });
};

// get form submission
const form = document.querySelector("form");
form.onsubmit = addBookToLibrary;

// build container for books
const main = document.querySelector("main");
const bookListing = document.createElement("div");
bookListing.classList.add("book-listing");
main.appendChild(bookListing);

// "Add Book" button show/hide form
document.querySelector(".add-book").addEventListener("click", () => {
  form.classList.toggle("show-form");
});

// populate default book
const defaultBook = Object.create(book);
defaultBook.title = "The Hobbit";
defaultBook.author = "J.R.R. Tolkien";
defaultBook.pages = 295;
// prototype has default read status of "false"
// defaultBook.read = "false";
myLibrary.push(defaultBook);

// initial load of library array
listLibrary();
