// =========================
// DATA
// =========================
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// =========================
// STATE
// =========================
let currentIndex = 0;
let score = 0;
let locked = false;

// =========================
// DOM (cached once)
// =========================
const $ = (id) => document.getElementById(id);

const startScreen = $("quiz-start-screen");
const quizScreen = $("quiz-questions-screen");
const resultScreen = $("result-screen");

const startBtn = $("start-btn");
const restartBtn = $("restart-btn");

const questionText = $("question-text");
const answerContainer = $("quiz-choices-container");

const currentQuestionEl = $("current-question");
const totalQuestionEl = $("total-question");

const scoreEl = $("score-value");
const finalScoreEl = $("final-score");
const maxScoreEl = $("max-score");

const resultMsg = $("result-msg");
const progressEl = $("progress");

// initialize DYnamic UI
currentQuestionEl.textContent = currentIndex + 1;
totalQuestionEl.textContent = quizQuestions.length;

// Core Logic

function renderQuestions() {
  locked = false;
  const q = quizQuestions[currentIndex];

  maxScoreEl.textContent = quizQuestions.length;
  questionText.textContent = q.question;
  currentQuestionEl.textContent = currentIndex + 1;

  const progress = (currentIndex / quizQuestions.length) * 100;
  progressEl.style.width = `${progress}%`;

  answerContainer.replaceChildren();

  q.answers.forEach(({ text, correct }) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");

    button.dataset.correct = String(correct);
    button.textContent = text;

    button.addEventListener("click", handleAnswerClick);

    answerContainer.appendChild(button);
  });
}

// handle answer
function handleAnswerClick(e) {
  if (locked) return;
  locked = true;

  const selectedBtn = e.currentTarget;
  const isSelectedCorrect = selectedBtn.dataset.correct === "true";

  // Highlight buttons based on correctness
  [...answerContainer.children].forEach((btn) => {
    const correct = btn.dataset.correct === "true";

    btn.classList.add(correct ? "correct" : "incorrect");
  });

  if (isSelectedCorrect) {
    score++;
    scoreEl.textContent = score;
  }

  setTimeout(nextQuestion, 900);
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex < quizQuestions.length) {
    renderQuestions();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreEl.textContent = score;

  const percent = (score / quizQuestions.length) * 100;
  resultMsg.textContent =
    percent === 100
      ? "Perfect"
      : percent > 80
        ? "Almost"
        : percent > 60
          ? "keep up the good work"
          : percent > 40
            ? "Not bad"
            : "keep on learning";
}

// flow control
//Start Quiz
function startQuiz() {
  currentIndex = 0;
  score = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  renderQuestions();
}

// restart quiz
function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}
// Event listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);
