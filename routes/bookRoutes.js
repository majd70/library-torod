const express = require("express");
const router = express.Router();
const {
  authenticateToken,
} = require("../middlewares/authenticationMiddleware");
const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// Create a new book
router.post("/book", authenticateToken, createBook);

// Get all books
router.get("/books", authenticateToken, getAllBooks);

// Update a book (only for the book creator)
router.put("/book/:id", authenticateToken, updateBook);

// Delete a book (only for the book creator)
router.delete("/book/:id", authenticateToken, deleteBook);

module.exports = router;
