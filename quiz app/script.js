document.addEventListener("DOMContentLoaded", () => {
  const start_bt = document.getElementById("start-bt");
  const next_bt = document.getElementById("next-bt");
  const restart_bt = document.getElementById("restart-bt");
  const question_container = document.getElementById("question-container");
  const result_container = document.getElementById("result-container");
  const question_text = document.getElementById("question-text");
  const option_list = document.getElementById("option-list");
  const result = document.getElementById("score");

  let score = 0;
  let currindex = 0;
  const question = [
    {
      question: "What is the capital of France?",
      options: ["New Delhi", "New York", "Rome", "Paris"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ];
  let answered = [question.length];
  start_bt.addEventListener("click", startQuiz);
  next_bt.addEventListener("click", () => {
    if (currindex < question.length - 1) {
      currindex++;
      showQuestion();
    } else {
      showResult();
    }
  });
  restart_bt.addEventListener("click", () => {
    currindex = 0;
    score = 0;
    answered = [];
    showQuestion();
    result_container.classList.add("hidden");
  });
  function startQuiz() {
    start_bt.classList.add("hidden");
    showQuestion();
  }
  function showQuestion() {
    question_container.classList.remove("hidden");
    next_bt.classList.add("hidden");
    question_text.innerText = question[currindex].question;
    option_list.innerHTML = "";
    question[currindex].options.forEach((option) => {
      const opli = document.createElement("li");
      opli.innerHTML = `<p>${option}</p>`;
      opli.addEventListener("click", () => {
        selectOption(option, opli);
      });
      option_list.appendChild(opli);
    });
  }

  function selectOption(option, opli) {
    if (answered[currindex] == 1) return;
    else answered[currindex] = 1;
    if (option === question[currindex].answer) {
      score++;
    } else {
      opli.style.backgroundColor = "red";
    }
    const cl = option_list.children;
    for (let i = 0; i < cl.length; i++) {
      if (cl[i].innerText == question[currindex].answer) {
        cl[i].style.backgroundColor = "green";
        break;
      }
    }
    next_bt.classList.remove("hidden");
  }

  function showResult() {
    result_container.classList.remove("hidden");
    question_container.classList.add("hidden");
    result.innerHTML = `${score} out of ${question.length}`;
  }
});
