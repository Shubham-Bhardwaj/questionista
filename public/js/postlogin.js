import { loggedIn } from "./loggedIn.js";
const postlogin = () => {
    const box = document.createElement("div");
    box.className = "modal";
    const boxContent = document.createElement("div");
    boxContent.className = "modal-content";
    document.body.appendChild(box);
    box.appendChild(boxContent);
    const head = document.createElement("div");
    head.className = "head";
    head.innerHTML =
      "<h1>Welcome to Questionista!!!</h1><br><h2>Login Here</h2>";
    boxContent.appendChild(head);
    const input_div = document.createElement('div');
    input_div.className = 'input_div';
    boxContent.appendChild(input_div);
    const username = document.createElement("input");
    username.className = "userdata";
    username.placeholder = "Enter your Email ID...";
    input_div.appendChild(username);
    const password = document.createElement("input");
    password.className = "userdata";
    password.type = "password";
    password.placeholder = "Enter your Password...";
    input_div.appendChild(password);
    const register = document.createElement("button");
    register.textContent = "Login";
    register.className = 'register';
    input_div.appendChild(register);
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.className = 'register';
    input_div.appendChild(cancel);
    document.querySelector(".modal").style.display = "block";
    register.addEventListener('click',() => {
      fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          message = data.message;
          console.log(message);
          // extract userId here.
          loggedIn(data.userId);
          
        });
    });
    cancel.addEventListener('click', () => {
        document.querySelector(".modal").remove();
    })
    
  }

  export {postlogin};