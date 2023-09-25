require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sequelize, User, Category, Book, Profile } = require("./models");
app.use(express.json());


//****middlewares
function authenticateToken(req, res, next) {
  
}

function authorizeAdmin(req, res, next) {
  
}

//**** login and register
app.post("/login", async (req, res) => {

});

app.post("/register", async (req, res) => {
 
});

//*****user routes
//1-get all users (you should be an admin)
app.get("/users", authenticateToken, authorizeAdmin, async (req, res) => {
  
});

//2-delete user
app.delete("/user/:id", authenticateToken, async (req, res) => {
  
});

//3-update user
app.put("/user/:id", authenticateToken, async (req, res) => {
 
});

//***** categories route

//1-create category (only by admin) //handle this to put user_id in body of req
app.post("/category",authenticateToken,authorizeAdmin,
  async (req, res) => {
    const { name, description} = req.body;
    const user_id = Number(req.body.user_id); //here
    const loggedInUserId = req.user.userId;

    if (user_id !== loggedInUserId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to create this category" });
    }

    try {
      const category = await Category.create({
        name,
        description,
        user_id,
      });

      res.status(201).json({ message: "Category created", category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//2-get all categoies filterd form a-z by sequalize
app.get("/categories", authenticateToken, authorizeAdmin, async (req, res) => {
  
});
//3-get all categoies filterd form a-z manually
app.get("/categoriesmanualy",authenticateToken,authorizeAdmin, async (req, res) => {
    
  }
);

//4-update category
app.put("/category/:id",authenticateToken,authorizeAdmin,async (req, res) => {
   
  }
);

//5-delete category
app.delete("/category/:id",authenticateToken,authorizeAdmin,async (req, res) => {
      
  }
);

//*****  book routes

//1-create new book
app.post('/book', authenticateToken, async (req, res) => {

});

//2- get all books
  app.get('/books',authenticateToken,async(req,res)=>{
  
    
  })
 
 //3-update book (only for the book creator)
 app.put('/book/:id',authenticateToken,async(req,res)=>{
  
})

//4-delete book
app.delete("/book/:id", authenticateToken,  async (req, res) => {
    
  }
);
 
//***** reset password logic

// generate Resettoken
function generateResetToken() {
  const token = require('crypto').randomBytes(32).toString('hex');
  return token;
}

//Route to request a password reset
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = generateResetToken();
    const resetTokenExpires = new Date(Date.now() + 3600000); // exp 1 our

    await user.update({
      resetToken,
      resetTokenExpires,
    });

    res.status(200).json({ resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Route to reset the password
app.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen({ port: 3000 }, async () => {
  console.log("server on port 3000");
  //await sequelize.sync({forse:true})
  await sequelize.authenticate();
  console.log("database connected!");
});
