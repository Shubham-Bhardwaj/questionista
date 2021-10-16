const express = require("express");

const answersControllers = require("../controllers/answers");
const { isAuth } = require("../middleware/IsAuth");

const router = express.Router();

router.post("/create-answer", isAuth, answersControllers.postCreateAnswer);
router.post("/", answersControllers.postFetchAnswers);

module.exports = router;
