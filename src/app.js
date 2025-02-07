const express = require("express");
const cors = require("cors");
const cartRouter = require("./routes/cartRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Shopping Cart API!");
  });

  
app.use("/cart", cartRouter);

module.exports = app;
