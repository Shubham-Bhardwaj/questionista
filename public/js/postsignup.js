const postsignup = () => {
    const box = document.createElement("div");
    box.className = "modal";
    const boxContent = document.createElement("div");
    boxContent.className = "modal-content";
    document.body.appendChild(box);
    box.appendChild(boxContent);
    const head = document.createElement("div");
    head.className = "head";
    head.innerHTML =
      "<h1>Welcome to Questionista!!!</h1><br><h2>Sign Up Here</h2>";
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
    const confirmPassword = document.createElement("input");
    confirmPassword.className = "userdata";
    confirmPassword.type = "password";
    confirmPassword.placeholder = "Confirm Password...";
    input_div.appendChild(confirmPassword);
    const register = document.createElement("button");
    register.textContent = "Sign Up";
    register.className = 'register';
    input_div.appendChild(register);
    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.className = 'register';
    input_div.appendChild(cancel);
    document.querySelector(".modal").style.display = "block";
    register.addEventListener('click',() => {
      fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          message = data.message;
          console.log(message);
          const msg = document.createElement('div');
          msg.className = 'msg';
          msg.textContent = message;
          boxContent.appendChild(msg);
        });
    });
    cancel.addEventListener('click', () => {
        document.querySelector(".modal").remove();
    })
    
  }

  export {postsignup};