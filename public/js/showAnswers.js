import { createAnswer } from "./createAnswer.js";

function showAnswers(questionId) {
  console.log(questionId);
  fetch("/answers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questionId,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const box = document.createElement("div");
      box.className = "modal";
      const boxContent = document.createElement("div");
      boxContent.className = "modal-content";
      document.body.appendChild(box);
      box.appendChild(boxContent);
      document.querySelector(".modal").style.display = "block";
      if (data.answerList.length < 1) {
        const notification = document.createElement("h2");
        notification.textContent =
          "Oops! No answers available. Be the first one to answer.";
        boxContent.appendChild(notification);
        const giveAnswer = document.createElement("button");
        giveAnswer.textContent = "Answer";
        giveAnswer.id = 'giveAnswer';
        boxContent.appendChild(giveAnswer);
        const cancel = document.createElement("button");
        cancel.textContent = "Close";
        cancel.id = 'cancel';
        boxContent.appendChild(cancel);
      } else {
        for (let i = 0; i < data.answerList.length; i++) {
          const answer = document.createElement("div");
          answer.className = "question";
          boxContent.appendChild(answer);
          const title = document.createElement("div");
          title.className = "title";
          title.innerText = data.answerList[i].title;
          answer.appendChild(title);
          const summary = document.createElement("div");
          summary.className = "summary";
          summary.innerText = data.answerList[i].summary;
          answer.appendChild(summary);
          const author = document.createElement("div");
          author.className = "authorName";
          author.innerText = data.answerList[i].authorName;
          answer.appendChild(author);
          const lastEdit = document.createElement("div");
          lastEdit.className = "lastEdit";
          lastEdit.innerText = data.answerList[i].lastEdit;
          answer.appendChild(lastEdit);
        }
        const giveAnswer = document.createElement("button");
        giveAnswer.textContent = "Answer";
        giveAnswer.id = 'giveAnswer';
        boxContent.appendChild(giveAnswer);
        const cancel = document.createElement("button");
        cancel.textContent = "Close";
        cancel.id = 'cancel';
        boxContent.appendChild(cancel);
      }
      document.querySelector('#cancel').addEventListener("click", () => {
        document.querySelector(".modal").remove();
      })
      document.querySelector('#giveAnswer').addEventListener("click", () => {
          createAnswer(questionId);
      })

    })
    .catch((err) => console.log(err));
}

export { showAnswers };
