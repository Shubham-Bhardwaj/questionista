function loadQuestions(userId, askedByMe, answeredByMe) {
  fetch("/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      askedByMe,
      answeredByMe
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (document.querySelector(".big") != null)
        document.querySelector(".big").remove();
      const big = document.createElement("div");
      big.className = "big";
      Container.appendChild(big);
      const question = document.createElement("div");
      question.className = "question";
      big.appendChild(question);
      const title = document.createElement("div");
      title.className = "title";
      title.innerText = data.title;
      question.appendChild(title);
      const summary = document.createElement("div");
      summary.className = "summary";
      summary.innerText = data.summary;
      question.appendChild(summary);
      const author = document.createElement("div");
      author.className = "author";
      author.innerText = data.author;
      question.appendChild(author);
      const lastEdit = document.createElement("div");
      lastEdit.className = "lastEdit";
      lastEdit.innerText = data.lastEdit;
      question.appendChild(lastEdit);
    })
    .catch((err) => console.log(err));
}
export { loadQuestions };
