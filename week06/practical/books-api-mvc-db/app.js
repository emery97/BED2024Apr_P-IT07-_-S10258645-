const express = require("express");
const booksController = require("./controllers/booksController");
const usersController = require("../books-api-mvc-db/controllers/userController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body-parser
const validateBook = require("../books-api-mvc-db/middleware/validateBook");

const app = express();
const port = process.env.PORT || 3000;
const staticMiddleware = express.static("public"); // Path to the public folder

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling
app.use(staticMiddleware); // Mount the static middleware

// Routes for GET requests (replace with appropriate routes for update and delete later)
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", validateBook, booksController.createBook); 
app.put("/books/:id", booksController.updateBook); // PUT for updating books
app.delete("/books/:id", booksController.deleteBook); // DELETE for deleting books

app.put("/users/:id", usersController.updateUser); // Update user
app.post("/users", usersController.createUser); // Create user
app.get("/users", usersController.getAllUsers); // Get all users
app.get("/users/with-books", usersController.getUsersWithBooks);
app.get("/users/search", usersController.searchUsers);
app.get("/users/:id", usersController.getUserById); // Get user by ID
app.delete("/users/:id", usersController.deleteUser); // Delete user


app.listen(port, async () => {
    try {
        // Connect to the database
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        // Terminate the application with an error code
        process.exit(1); // Exit with code 1 indicating an error
    }

    console.log(`Server listening on port ${port}`);
});

process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");

    // Perform cleanup task
    await sql.close();
    console.log("Databasee connection closed");
    process.exit(0);
});

