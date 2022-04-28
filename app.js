let myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: false,
  },
];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read === "true" ? "read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(event) {
  event.preventDefault();
  // do stuff here
  const title = form.elements["title"].value;
  const author = form.elements["author"].value;
  const pages = form.elements["pages"].value;
  const read = form.elements["status"].value;
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log(newBook.info());
  console.log(myLibrary);
  listLibrary();
}

const listLibrary = function () {
  bookListing.textContent = "";
  const table = document.createElement("table");
  table.innerHTML = `
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Pages</th>
      <th>Read</th>
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
    read.textContent = element.read === "true" ? "read" : "not read yet";
    remove.innerHTML = `
      <button type="button" class="delete-btn" data-cmd="delete" data-id="${myLibrary.indexOf(
        element
      )}"><svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
  </svg></button>
    `;
  });
  table.appendChild(tableBody);
  bookListing.appendChild(table);
  // once table built, listen to delete buttons
  watchDeleteButtons();
};

const watchDeleteButtons = function () {
  const deleteButtons = document.querySelectorAll("button.delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (confirm("Are you sure? Deletion is permanent.") == true) {
        myLibrary.splice(button.getAttribute("data-id"), 1);
        // after delete book, list remaining library
        if (myLibrary.length != 0) {
          listLibrary();
        } else {
          bookListing.textContent = "";
        }
      }
    });
  });
};

// Get form submission
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onsubmit
const form = document.querySelector("form");
form.onsubmit = addBookToLibrary;

// Build container for books
const main = document.querySelector("main");
const bookListing = document.createElement("div");
bookListing.classList.add("book-listing");
main.appendChild(bookListing);

// Initial load of books array
listLibrary();
