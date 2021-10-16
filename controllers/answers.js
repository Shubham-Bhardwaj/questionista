const answerModel = require("../models/Answer");

const postCreateAnswer = async (req, res, next) => {
  try {
    const { id, username } = req.session.user;
    const { questionId, answer } = req.body;
    await answerModel.createAnswer(answer, questionId, id, username);
    return res
      .status(201)
      .type("application/json")
      .json({ user: user, message: "Answer Posted Sucessfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .type("application/json")
      .json({ message: "Unable To Post Answer" });
  }
};

const postFetchAnswers = async (req, res, next) => {
  try {
    const { questionId } = req.body;
    const fetchAnswersDBResponse = await answerModel.fetchAnswers(questionId);
    const answerList = fetchAnswersDBResponse[0];
    return res.status(200).type("application/json").json({
      answerList: answerList,
      message: "Answers Fetched Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .type("application/json")
      .json({ message: "Unable To Fetch Answers" });
  }
};

module.exports = { postCreateAnswer, postFetchAnswers };
