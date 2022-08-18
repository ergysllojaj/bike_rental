//login user
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.login(email, password)
    .then((user) => {
      const token = createToken(user);
      res.status(200).json({
        email: user.email,
        role: user.role,
        token,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};
//signup user
module.exports.signup = (req, res) => {
  const { email, password, code } = req.body;
  User.signup(email, password, code)
    .then((user) => {
      const token = createToken(user);
      res.status(200).json({ email: user.email, role: user.role, token });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};
