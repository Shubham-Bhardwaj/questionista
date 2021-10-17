import { loadQuestions } from "./loadQuestions.js";
import { createQuestion } from "./createQuestion.js";

const loggedIn = (userId) => {
  if (document.querySelector(".modal") != null)
    document.querySelector(".modal").remove();
  if (document.querySelector("#btnLogin") != null)
    document.querySelector("#btnLogin").remove();
  if (document.querySelector("#btnSignUp") != null)
    document.querySelector("#btnSignUp").remove();
  if (document.querySelector("#answeredByMe") != null)
    document.querySelector("#answeredByMe").remove();
  if (document.querySelector("#askedByMe") != null)
    document.querySelector("#askedByMe").remove();
  if (document.querySelector("#askQuestion") != null)
    document.querySelector("#askQuestion").remove();
  if (document.querySelector("#logout") != null)
    document.querySelector("#logout").remove();

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

  loadQuestions(userId, false, false);

  logout.addEventListener("click", () => {
    fetch("/auth/logout").then((res) => {
      console.log(res);
      console.log("logging out");
      // alert("Logged out Successfully!");
      location.reload();
    });
  });

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
  askQuestion.addEventListener("click", () => {
    createQuestion(userId);
    loadQuestions(userId, false, false);
  });
};

export { loggedIn };
