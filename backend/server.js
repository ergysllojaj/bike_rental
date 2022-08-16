require("dotenv").config();

// create express app
const express = require("express");

// express app
const app = express();

// routes
app.get("/", (req, res) => {
  res.send({ mssg: "Hello World!" });
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
});

