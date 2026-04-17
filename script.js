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

  currentQuestionEl.textContent = currentIndex + 1;
  questionText.textContent = q.question;

  answerContainer.replaceChildren();

  q.answers.forEach(({ text, correct }) => {
    const btn = document.createElement("button");

    btn.classList.add("answer-btn");
    btn.textContent = text;

    btn.dataset.correct = String(correct);

    btn.addEventListener("click", handleAnswerClick);

    answerContainer.appendChild(btn);
  });

  const progress = (currentIndex / quizQuestions.length) * 100;

  progressEl.style.width = `${progress}`;
}

// handle answer
function handleAnswerClick(e) {
  if (locked) return;
  locked = true;

  const selectedBtn = e.currentTarget;
  const isCorrect = selectedBtn.dataset.correct === "true";

  [...answerContainer.children].forEach((button) => {
    const correct = button.dataset.correct === "true";

    button.classList.add(correct ? "correct" : "incorrect");
    // btn.disabled = true;
  });

  if (isCorrect) {
    score++;
    scoreEl.textContent = score;
  }

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentIndex++;

  currentIndex < quizQuestions.length ? renderQuestions() : showResult();
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreEl.textContent = score;
  const percent = (score / quizQuestions.length) * 100;

  resultMsg.textContent =
    percent === 100
      ? "Perfect, you're a genius!"
      : percent >= 80
        ? "Great job"
        : percent >= 60
          ? "Good effort"
          : percent >= 40
            ? "Not Bad, keep improving"
            : "Keep Studying, You'll Get better";
}

// flow control
//Start Quiz
function startQuiz() {
  // reset
  currentIndex = 0;
  score = 0;
  locked = false;

  scoreEl.textContent = score;

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
