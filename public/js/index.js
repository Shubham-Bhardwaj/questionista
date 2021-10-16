const userId = null;
const answeredByMe = false;
const askedByMe = false;
const Container = document.getElementsByClassName("Container");
import { postlogin } from "./postlogin.js";
import { postsignup } from "./postsignup.js";
import { loadQuestions } from "./loadQuestions.js";
loadQuestions(userId, askedByMe, answeredByMe);

const signup = document.querySelector("#btnSignUp");
signup.addEventListener("click", () => postsignup());

const login = document.querySelector("#btnLogin");
login.addEventListener("click", () => postlogin());

const home = document.querySelector("#btnHome");
home.addEventListener("click", () => {
  userId = null;
  loadQuestions(userId, false, false);
});

// function dummy(b){
//   console.log(b);
//   // console.log(b.id);
//   return b.id;
// }
// const a = document.createElement('button');
// a.id = 'test';
// //a.onclick = () => dummy(a);
// let c = dummy(a);
// console.log(c);
// document.body.appendChild(a);
