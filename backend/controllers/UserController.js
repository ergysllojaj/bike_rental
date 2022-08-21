//login user
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

//get all users
module.exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json({
        message: "Error getting users",
      });
    }
    return res.status(200).json({ users });
  });
};

//get user by id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Error getting user",
      });
    }
    return res.status(200).json({ user });
  });
};

//update user by id
module.exports.updateUserById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Error updating user",
      });
    }
    return res.status(200).json({ user });
  });
};

//delete user by id
module.exports.deleteUserById = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting user",
      });
    }
    return res.status(200).json({ user });
  });
};

//login user
module.exports.login = (req, res) => {
  console.log(req.body);
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
module.exports.signup = async function (req, res) {
  const { email, password, code } = req.body;
  console.log(req.body);
  try {
    const user = await User.signup(email, password, code);
    const token = createToken(user);
    res.status(200).json({ email: user.email, role: user.role, token });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
