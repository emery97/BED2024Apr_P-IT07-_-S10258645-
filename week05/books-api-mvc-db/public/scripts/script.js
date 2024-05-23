const postBookMethod = require("../../controllers/booksController");

async function fetchBooks(){
    const response = await fetch("/books"); 
    const data = await response.json();

    const bookList = document.getElementById("book-list");

    data.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book"); // add a CSS class for styling
        
        // create elements for title, author, etc. and populate with book data
        const titleElement = document.createElement("h2");
        titleElement.textContent = book.title;

        const IdElement = document.createElement("h3");
        IdElement.textContent = `ID: ${book.id}`;

        const authorElement = document.createElement("p");
        authorElement.textContent = `By ${book.author}`;

        bookItem.appendChild(titleElement);
        bookItem.appendChild(IdElement);
        bookItem.appendChild(authorElement);
        
        bookList.appendChild(bookItem);
    })
}
async function postBooks(){
    
}

fetchBooks();