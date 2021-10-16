function createQuestion() {
  const box = document.createElement("div");
  box.className = "modal";
  const boxContent = document.createElement("div");
  boxContent.className = "modal-content";
  document.body.appendChild(box);
  box.appendChild(boxContent);
  const head = document.createElement("div");
  head.className = "head";
  head.innerHTML = "<h2>Post your question here</h2>";
  boxContent.appendChild(head);
  const input_div = document.createElement("div");
  input_div.className = "input_div";
  boxContent.appendChild(input_div);
  const title = document.createElement("input");
  title.className = "title";
  title.placeholder = "Enter the title of the question...";
  input_div.appendChild(title);
  const summary = document.createElement("input");
  summary.className = "summary";
  summary.placeholder = "Enter the summary of the question...";
  input_div.appendChild(summary);
  const submit = document.createElement("button");
  submit.textContent = "Submit";
  submit.className = "register";
  input_div.appendChild(submit);
  const cancel = document.createElement("button");
  cancel.textContent = "Cancel";
  cancel.className = "register";
  input_div.appendChild(cancel);
  document.querySelector(".modal").style.display = "block";

  submit.addEventListener("click", () => {
    fetch("/questions/create-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        summary: summary.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        const msg = document.createElement("div");
        msg.className = "msg";
        msg.textContent = data.message;
        boxContent.appendChild(msg);
        title.value = "";
        summary.value = "";
        return;
      });
  });
  cancel.addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });
}

export { createQuestion };
