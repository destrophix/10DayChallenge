const quizData = [
  {
    question: "Who is the President of India ?",
    a: "Ramnath Kovind",
    b: "Droupadi Murmu",
    c: "Pratibha Patil",
    d: "Jagdeep Dhankar",
    correct: "b",
  },
  {
    question: "Which government is in power currently ?",
    a: "BJP",
    b: "Congress",
    c: "AAP",
    d: "TMC",
    correct: "a",
  },
  {
    question: "What is the national sport of India ?",
    a: "Cricket",
    b: "Wrestling",
    c: "Boxing",
    d: "Hockey",
    correct: "d",
  },
  {
    question: "Who is the Iron Man of India ?",
    a: "APJ Abdul Kalam",
    b: "Netaji Subhash Chandra Bose",
    c: "Narendra Modi",
    d: "Sardar Vallabhbhai Patel",
    correct: "d",
  },
  {
    question: "Who is the first Woman Prime Minister of India ?",
    a: "Indira Gandhi",
    b: "Sonia Gandhi",
    c: "Prathibha Patel",
    d: "Mumta Banerjee",
    correct: "a",
  },
];

let currentQuestionNumber = 0, score = 0;
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const button = document.getElementById("submit");
const inputEls = document.querySelectorAll(".answer");
const quizContainer= document.getElementById('quiz')

loadQuiz();

function loadQuiz() {
  let currentQuestionData = quizData[currentQuestionNumber];
  questionEl.innerText = currentQuestionData.question;
  a_text.innerText = currentQuestionData.a;
  b_text.innerText = currentQuestionData.b;
  c_text.innerText = currentQuestionData.c;
  d_text.innerText = currentQuestionData.d;
  deselect();
}

function getSelected() {
  let answer;
  inputEls.forEach((inputEl) => {
    if (inputEl.checked) answer = inputEl.id;
  });
  return answer;
}

function deselect() {
  inputEls.forEach((inputEl) => {
    inputEl.checked = false;
  });
}

button.addEventListener("click", () => {
  let answer = getSelected();
  if (answer) {
    if(answer === quizData[currentQuestionNumber].correct){
        score++;
    }

    currentQuestionNumber++;
    if (currentQuestionNumber < quizData.length) {
      loadQuiz();
    } else {
      quizContainer.innerHTML = `<h2>Your score is ${score} out of ${quizData.length} questions.</h2><button onclick="window.location.reload()">Reload</button>`
    }
  }
});
