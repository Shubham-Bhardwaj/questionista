const path = require("path");
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

// app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "questionista_secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(3000);
