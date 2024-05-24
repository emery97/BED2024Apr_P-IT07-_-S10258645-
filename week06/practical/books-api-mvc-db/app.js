const express = require("express");
const app = express();
const staticMiddleware = express.static("public"); // path to the public folder

const booksController = require("./controllers/booksController");
const userController = require("./controllers/userController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const validateBook = require("./middleware/validateBook")

const port = 3000; // Use environment variable or default port

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));// for form data handling
app.use(staticMiddleware); // mount the static middleware

// Routes for GET requests (replace with appropriate routes for update and delete later)
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books",validateBook,booksController.createBook); // POST for creating books (can handle JSON data)
app.put("/books/:id", booksController.updateBook); // PUT for updating books
app.delete("/books/:id", booksController.deleteBook); // DELETE for deleting books

app.get("/users/with-books",userController.getUsersWithBooks);
app.get("/users/search",userController.searchUsers);
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.post("/users",userController.createUser);
app.put("/users/:id",userController.updateUser);
app.delete("/users/:id",userController.deleteUser);

app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});
// module.exports = router;
