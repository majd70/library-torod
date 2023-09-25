const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require("../middlewares/authenticationMiddleware");
const {
  createCategory,
  getAllCategories,
  getCategoriesManually,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Create a new category (only by admin)
router.post("/category", authenticateToken, authorizeAdmin, createCategory);

// Get all categories (sorted from A-Z using Sequelize)
router.get("/categories", authenticateToken, authorizeAdmin, getAllCategories);

// Get all categories (sorted manually)
router.get("/categoriesmanualy", authenticateToken, authorizeAdmin, getCategoriesManually);

// Update a category
router.put("/category/:id", authenticateToken, authorizeAdmin, updateCategory);

// Delete a category
router.delete("/category/:id", authenticateToken, authorizeAdmin, deleteCategory);

module.exports = router;
