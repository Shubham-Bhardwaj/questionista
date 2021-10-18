const db = require("../utils/DBUtils");

const createAnswer = (answer, questionId, author, authorName) => {
  const q =
    "INSERT INTO answer (answer, questionId, author, authorName) VALUES (?, ?, ?, ?)";
  const values = [answer, questionId, author, authorName];
  return db.execute(q, values);
};

const fetchAnswers = (questionId) => {
  const q = "SELECT * FROM answer WHERE questionId = ? LIMIT 5";
  const values = [questionId];
  return db.execute(q, values);
};

module.exports = { createAnswer, fetchAnswers };
