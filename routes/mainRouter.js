const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const bookRoutes = require("./bookRoutes");
const resetPass = require("./passwordResetRoutes");

router.use("/", userRoutes);
router.use("/", categoryRoutes);
router.use("/", bookRoutes);
router.use("/", resetPass);

module.exports = router;
