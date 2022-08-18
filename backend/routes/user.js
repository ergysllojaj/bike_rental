const express = require("express");

const router = express.Router();
const { login, signup } = require("../controllers/UserController");

//login route
router.post("/login", login);

// singup route
router.post("/signup", signup);

module.exports = router;
