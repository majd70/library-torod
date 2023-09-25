const express = require("express");
const router = express.Router();
const {
  requestPasswordReset,
  resetPassword,
} = require("../controllers/passwordResetController");

// Define the route for requesting a password reset
router.post("/forgot-password", requestPasswordReset);

// Define the route for resetting the password
router.post("/reset-password/:token", resetPassword);

module.exports = router;
