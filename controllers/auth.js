const bcrypt = require("bcryptjs");
const userModel = require("../models/User");

const postSignup = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || password !== confirmPassword) {
      return res
        .status(400)
        .type("application/json")
        .json({ message: "Invalid Input" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await userModel.registerUser(username, hashedPassword);
    res
      .status(201)
      .type("application/json")
      .json({ message: "User Registered Sucessfully" });
  } catch (error) {
    if (error.sql && error.errno == 1062) {
      return res
        .status(400)
        .type("application/json")
        .json({ message: "User Already Exists" });
    }
    res
      .status(500)
      .type("application/json")
      .json({ message: "Unable To Register User" });
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
      return res
        .status(400)
        .type("application/json")
        .json({ message: "Invalid Password" });
    }
    delete userObj.password;
    req.session.isLoggedIn = true;
    req.session.user = userObj;
    return req.session.save((err) => {
      if (err) {
        console.log(err);
      }
      res
        .status(200)
        .type("application/json")
        .json({ user: userObj, message: "Login Sucessfully" });
    });
  } catch (error) {
    res
      .status(500)
      .type("application/json")
      .json({ message: "Unable To Login" });
  }
};

const getLogout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postLogin, postSignup, getLogout };
