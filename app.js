require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize, User } = require("./models");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bookRoutes = require("./routes/bookRoutes");
const resetPass=require("./routes/passwordResetRoutes")

app.use(express.json());


app.use("/",userRoutes); 
app.use("/", categoryRoutes); 
app.use("/", bookRoutes); 
app.use("/",resetPass);




app.listen({ port: 3000 }, async () => {
  console.log("server on port 3000");
  //await sequelize.sync({forse:true})
  await sequelize.authenticate();
  console.log("database connected!");
});
