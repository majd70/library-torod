require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize, User } = require("./models");
const mainRouter = require("./routes/mainRouter");

app.use(express.json());


app.use("/", mainRouter);





app.listen({ port: 3000 }, async () => {
  console.log("server on port 3000");
  //await sequelize.sync({forse:true})
  await sequelize.authenticate();
  console.log("database connected!");
});
