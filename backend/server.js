require("dotenv").config();

// create express app
const express = require("express");
const bikeRoutes = require("./routes/bikes");

// express app
const app = express();
app.use(express.json());

// routes
app.use("/api/bikes", bikeRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
});
