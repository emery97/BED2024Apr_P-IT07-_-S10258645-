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
app.use(express.json()) //  to parse incoming JSON data in requests to javascript objects
app.use (bodyParser.urlencoded({extended:true})); // set extended to true for nested objects 

// creating the route for getting ALL books
app.get('/books', (req,res) => {
    res.json(books); // send the array of books as JSON response
})

