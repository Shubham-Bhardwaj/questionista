const questionModel = require("../models/Question");

const postCreateQuestion = async (req, res, next) => {
  try {
    const user = req.session.user;
    const { id, username } = user;
    const { title, summary } = req.body;
    await questionModel.createQuestion(title, summary, id, username);
    return res
      .status(201)
      .type("application/json")
      .json({ user: user, message: "Question Posted Sucessfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .type("application/json")
      .json({ message: "Unable To Post Question" });
  }
};

const postFetchQuestions = async (req, res, next) => {
  try {
    let user = req.session.user;
    if (!user) {
      user = {};
    }
    const { id } = user;
    const { askedByMe, answeredByMe } = req.body;
    const fetchQuestionsDBResponse = await questionModel.fetchQuestions(
      id,
      askedByMe,
      answeredByMe
    );
    const questionList = fetchQuestionsDBResponse[0];
    return res
      .status(200)
      .type("application/json")
      .json({
        user: user,
        questionList: questionList,
        message: "Quetions Fetched Sucessfully",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .type("application/json")
      .json({ message: "Unable To Fetch Questions" });
  }
};

module.exports = { postCreateQuestion, postFetchQuestions };
