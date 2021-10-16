const db = require("../utils/DBUtils");

const createQuestion = (title, summary, author, authorName) => {
  const q = "INSERT INTO question (title, summary, author, authorName) VALUES (?, ?, ?, ?)";
  const values = [title, summary, author, authorName];
  return db.execute(q, values);
};

const fetchQuestions = (userId, askedByMe, answeredByMe) => {
  console.log({ userId, askedByMe, answeredByMe });
  if (!userId) {
    const q = "SELECT * FROM question LIMIT 5";
    return db.execute(q);
  } else if (askedByMe) {
    const q = "SELECT * FROM question WHERE author = ? LIMIT 5";
    const values = [userId];
    return db.execute(q, values);
  } else if (answeredByMe) {
    const q =
      "SELECT * FROM question WHERE id IN (SELECT questionId from answer WHERE author = ?) LIMIT 5";
    const values = [userId];
    return db.execute(q, values);
  } else {
    const q = "SELECT * FROM question LIMIT 5";
    return db.execute(q);
  }
};

module.exports = { createQuestion, fetchQuestions };
