const express = require("express");

const router = express.Router();
const {
  login,
  signup,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/UserController");
const { isAuthAs } = require("../middleware/auth");

router.get("/", isAuthAs(["admin"]), getAllUsers);
router.get("/:id", isAuthAs(["admin"]), getUserById);
router.put("/:id", isAuthAs(["admin"]), updateUserById);
router.delete("/:id", isAuthAs(["admin"]), deleteUserById);

//login route
router.post("/login", login);

// singup route
router.post("/signup", signup);

module.exports = router;
