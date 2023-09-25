// authenticationMiddleware.js
const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  console.log(token);

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });

    req.user = user;
    next();
  });
};

exports.authorizeAdmin = (req, res, next) => {
  const userRole = req.user.role;
  console.log(userRole);
  if (userRole === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Permission denied" });
  }
};
