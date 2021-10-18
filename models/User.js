const db = require("../utils/DBUtils");

const registerUser = (username, password) => {
  const q = "INSERT INTO user (username, password) VALUES (?, ?)";
  const values = [username, password];
  return db.execute(q, values);
};

const fetchUserByUsername = (username) => {
  const q = "SELECT id, username, password FROM user WHERE username=?";
  const values = [username];
  return db.execute(q, values);
};

module.exports = { registerUser, fetchUserByUsername };
