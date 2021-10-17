import { loggedIn } from "./loggedIn.js";
import { showAnswers } from "./showAnswers.js";

function loadQuestions(userId, askedByMe, answeredByMe) {
  const temp = userId;
  console.log(temp);
  fetch("/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      askedByMe,
      answeredByMe,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data.user.id);
      let temp2 = data.user.id;
      if (temp2 == undefined) {
        temp2 = null;
      }
      console.log(temp2);
      if (temp != temp2) {
        loggedIn(data.user.id);
        return;
      }
      if (document.querySelector(".big") != null) {
        document.querySelector(".big").remove();
      }
      if (data.questionList.length < 1) {
        const big = document.createElement("div");
        big.className = "big";
        document.querySelector(".Container").appendChild(big);
        big.textContent = "Oops! Nothing to show.";
        return;
      }
      const big = document.createElement("div");
      big.className = "big";
      document.querySelector(".Container").appendChild(big);
      for (let i = 0; i < data.questionList.length; i++) {
        const question = document.createElement("div");
        question.className = "question";
        question.id = data.questionList[i].id;
        big.appendChild(question);
        const title = document.createElement("div");
        title.className = "title";
        title.innerText = data.questionList[i].title;
        question.appendChild(title);
        const summary = document.createElement("div");
        summary.className = "summary";
        summary.innerText = data.questionList[i].summary;
        question.appendChild(summary);
        const author = document.createElement("div");
        author.className = "authorName";
        author.innerText = data.questionList[i].authorName;
        question.appendChild(author);
        const lastEdit = document.createElement("div");
        lastEdit.className = "lastEdit";
        lastEdit.innerText = data.questionList[i].lastEdit;
        question.appendChild(lastEdit);
        const id = data.questionList[i].id;
        question.onclick = () => showAnswers(question.id);
      }
    })
    .catch((err) => console.log(err));
}

export { loadQuestions };
