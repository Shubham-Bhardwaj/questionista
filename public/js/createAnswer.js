import { showAnswers } from "./showAnswers.js";

function createAnswer(questionId) {
  if (document.querySelector(".modal") != null)
    document.querySelector(".modal").remove();

  const box = document.createElement("div");
  box.className = "modal";
  const boxContent = document.createElement("div");
  boxContent.className = "modal-content";
  document.body.appendChild(box);
  box.appendChild(boxContent);
  document.querySelector(".modal").style.display = "block";
  const answer = document.createElement("input");
  answer.id = "createAnswer";
  answer.placeholder = "Write your answer here...";
  boxContent.appendChild(answer);
  const submit = document.createElement("button");
  submit.textContent = "Submit";
  boxContent.appendChild(submit);
  const cancel = document.createElement("button");
  cancel.textContent = "Close";
  cancel.id = "cancel";
  boxContent.appendChild(cancel);
  cancel.addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });
  submit.addEventListener("click", () => {
    fetch("/answers/create-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        questionId,
        answer: answer.value,
      },
    })
      .then((res) => {
        return res.json;
      })
      .then((data) => {
          console.log(data);
        // const msg = document.createElement("div");
        // msg.className = "msg";
        // msg.textContent = data.message;
        // boxContent.appendChild(msg);
        answer.value = "";
        alert(data.message);
        document.querySelector(".modal").remove();
        showAnswers(questionId);
      })
      .catch((err) => console.log(err));
  });
}
export {createAnswer};