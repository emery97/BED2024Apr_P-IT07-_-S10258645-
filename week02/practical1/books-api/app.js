// Import Express and body-parser
const express = require('express');
const bodyParser = require("body-parser");

// Instantiate the Express app
const app = express();

// Define the Port
const port = 3000;

// In-memory Book Data : Create an array to store book data.
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
 ];

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // true allows parsing of nested objects within the form data

// creating the route for getting ALL books
app.get('/books', (req,res) => {
    res.json(books); // send the array of books as JSON response
})

// add the route for creating a book (POST /books)
app.post('/books',(req,res) => {
    const newBook = req.body; // get the new book data from the request body
    newBook.id = books.length + 1; // assign a unique ID
    books.push(newBook); // add the new book to the array 
    res.status(201).json(newBook); // send created book with status code 201
});

app.get('/books/:id', (req,res) => {
    const bookId = parseInt(req.params.id); // get book ID from URL parameter
    const book = books.find(book => book.id === bookId);

    if (book){
        res.json(book); // send the book data if found
    }
    else {
        res.status(404).send('Book not found'); // send error for non-existent book
    }
});

// route for updating a Book (PUT)
app.put('/books/:id', (req,res) => {
    const bookId = parseInt(req.params.id); // get book ID from URL parameter
    const updatedBook = req.body; // get updated book data from request body

    const bookIndex = books.findIndex(book => bookid === bookId);

    if(bookIndex !== -1){
        updatedBook.id = bookId;
        books[bookIndex] = updatedBook ; // update book data in the array
        res.json(updatedBook); // send updated book data

    }
    else{
        res.status(404).send('Book not found'); // send error for non-existent book 
    }
});

// route for deleting a Book (DELETE)
app.delete('/books:/id', (req,res) =>{
    const bookId = parseInt(req.params.id); // get book ID from URL parameter
    const bookIndex = books.findIndex(book => book.id === bookId);

    if(bookIndex !== -1){
        book.splice(bookIndex,1); // remove book from the array
        res.status(204).send(); // send empty response with status code 204 (no content)
    }
    else {
        res.status(404).send('Book not found');// send error for non-existent book ;
    }
})

// start the server 
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});