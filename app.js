const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  res.send('<h1>Questionista!!!</h1>')
});

app.listen(3000);
