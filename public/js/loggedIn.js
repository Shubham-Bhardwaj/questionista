import { loadQuestions } from "./loadQuestions.js";
import { createQuestion } from "./createQuestion.js";

const loggedIn = (userId) => {
  document.querySelector(".modal").remove();
  document.querySelector("#btnLogin").remove();
  document.querySelector("#btnSignUp").remove();

  const answeredByMe = document.createElement("button");
  answeredByMe.id = "answeredByMe";
  answeredByMe.textContent = "Answered By Me";
  const askedByMe = document.createElement("button");
  askedByMe.id = "askedByMe";
  askedByMe.textContent = "Asked By Me";
  const askQuestion = document.createElement("button");
  askQuestion.id = "askQuestion";
  askQuestion.textContent = "Ask a Question";
  const navHomebtn = document.querySelector(".home");
  navHomebtn.appendChild(answeredByMe);
  navHomebtn.appendChild(askedByMe);
  navHomebtn.appendChild(askQuestion);

  const logout = document.createElement("button");
  logout.id = "logout";
  logout.textContent = "Logout";
  document.querySelector(".login").appendChild(logout);

  answeredByMe.addEventListener("click", () => {
    if (userId != null) {
        
      loadQuestions(userId, false, true);
    }
  });
  askedByMe.addEventListener("click", () => {
    if (userId != null) {
      loadQuestions(userId, true, false);
    }
  });
  askQuestion.addEventListener("click", ()=>{
      createQuestion();
  })
};

export { loggedIn };
