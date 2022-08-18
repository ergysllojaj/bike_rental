//login user

const User = require("../models/User");

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  res.send("login");
};
//signup user
module.exports.signup = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.signup(email, password)
    .then((user) => {
      res
        .status(200)
        .json({ email: user.email, role: user.role, password: user.password });
    })
    .catch((err) => {
      res.send(err);
    });
};
