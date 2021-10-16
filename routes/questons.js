const express = require("express");

const questionsControllers = require("../controllers/questions");
const { isAuth } = require("../middleware/IsAuth");

const router = express.Router();

router.post(
  "/create-question",
  isAuth,
  questionsControllers.postCreateQuestion
);
router.post("/", questionsControllers.postFetchQuestions);

module.exports = router;
