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

userSchema.statics.signup = async function (email, password, code) {
  if (!email || !password) {
    throw new Error("Email, password and role are required");
  }
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

  //users that want to be admin must have the company code
  let role = "user";
  if (code === process.env.SIGNUP_CODE) {
    role = "admin";
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return this.create({
    email,
    password: hash,
    role,
  });
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Invalid email or password");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  return user;
};
module.exports = mongooes.model("User", userSchema);
