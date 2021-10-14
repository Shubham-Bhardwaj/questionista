const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSW,
  database: "questionista",
});

module.exports = pool