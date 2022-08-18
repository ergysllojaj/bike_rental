require("dotenv").config();

// create express app
const express = require("express");
const bikeRoutes = require("./routes/bikes");
const userRoutes = require("./routes/user");

// express app
const app = express();
app.use(express.json());

// routes
app.use("/api/bikes", bikeRoutes);
app.use("/api/users", userRoutes);

//mongooes connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
