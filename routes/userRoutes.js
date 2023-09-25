// userRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require("../middlewares/authenticationMiddleware");
const {
  login,
  register,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.post("/login", login);
router.post("/register", register);
router.get("/users", authenticateToken, authorizeAdmin, getAllUsers);
router.delete("/user/:id", authenticateToken, deleteUser);
router.put("/user/:id", authenticateToken, updateUser);

module.exports = router;
