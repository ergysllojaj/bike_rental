const mongooes = require("mongoose");
const Schema = mongooes.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Invalid or weak password");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw new Error("User already exist");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return this.create({
    email,
    password: hash,
  });
};

module.exports = mongooes.model("User", userSchema);
