const express = require("express");
const session = require("express-session");
const mysql = require("mysql2/promise");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

const app = express();

const options = {
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "questionista",
};

const connection = mysql.createPool(options);
const sessionStore = new MySQLStore({}, connection);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "questionista_secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use("/", (req, res, next) => {
  console.log(req.session.user.name);
  req.session.user = { name: "my user", age: 20 };
  console.log("This always runs!");
  res.send("<h1>Questionista!!!</h1>");
});

app.listen(3000);
