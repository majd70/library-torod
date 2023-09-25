const bcrypt = require("bcrypt");
const { User } = require("../models");

// Function to generate a reset token
function generateResetToken() {
  const token = require("crypto").randomBytes(32).toString("hex");
  return token;
}

// Controller for requesting a password reset
async function requestPasswordReset(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = generateResetToken();
    const resetTokenExpires = new Date(Date.now() + 3600000); // exp 1 hour

    await user.update({
      resetToken,
      resetTokenExpires,
    });

    res.status(200).json({ resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Controller for resetting the password
async function resetPassword(req, res) {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  requestPasswordReset,
  resetPassword,
};
