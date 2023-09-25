// userController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.login = async (req, res) => {
 const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
  
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
          const token = jwt.sign(
            {
              userId: user.id,
              role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );
  
          return res.json({ token });
        } else {
          return res.status(401).json({ error: "Invalid password" });
        }
      } else {
        return res.status(401).json({ error: "User not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
};

exports.register = async (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body;

    // Check if password and password confirmation match
    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: "Password and password confirmation do not match" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: ["categories","books"] });
    
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const loggedInUserId = req.user.userId;
    
        if (userId != loggedInUserId) {
          return res
            .status(403)
            .json({ error: "You are not authorized to delete this user" });
        }
    
        const user = await User.findByPk(userId);
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        await user.destroy();
    
        res.status(200).json({ msg: "User deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const loggedInUserId = req.user.userId;
        console.log(userId);
        console.log(loggedInUserId);
    
        if (userId !== loggedInUserId) {
          return res
            .status(403)
            .json({ error: "You are not authorized to update this user" });
        }
    
        const user = await User.findByPk(userId);
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        if (req.body.username) {
          user.username = req.body.username;
        }
    
        if (req.body.email) {
          user.email = req.body.email;
        }
    
        await user.save();
    
        res.status(200).json({ msg: "User updated" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
};
