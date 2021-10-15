const bcrypt = require("bcryptjs");
const userModel = require("../models/User");

const postSignup = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || password !== confirmPassword) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await userModel.registerUser(username, hashedPassword);
    res.status(201).json({ message: "User Registered Sucessfully" });
  } catch (error) {
    if (error.sql && error.errno == 1062) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    res.status(500).json({ message: "Unable To Register User" });
  }
};

const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const fetchUserDBRespone = await userModel.fetchUserByUsername(username);
    if (fetchUserDBRespone[0].length < 1) {
      return res.status(400).json({ message: "Invalid Username" });
    }
    const userObj = fetchUserDBRespone[0][0];
    const isValidPassword = await bcrypt.compare(password, userObj.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    delete userObj.password;
    return res
      .status(200)
      .json({ user: userObj, message: "Login Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Unable To Login" });
  }
};

module.exports = { postLogin, postSignup };
