//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
// Quiz data
const quizData = [
  { q: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
  { q: "Capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
  { q: "Which is a prime number?", options: ["4", "6", "9", "7"], answer: 3 },
  { q: "HTML stands for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "High Text Mark Language", "None"], answer: 1 },
  { q: "Which is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 }
];

// Elements
const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Render quiz questions
function renderQuiz() {
  questionsContainer.innerHTML = "";
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

  quizData.forEach((item, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<p>${i + 1}. ${item.q}</p>`;

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    item.options.forEach((opt, j) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${i}`;
      input.value = j;

      // Restore checked state from sessionStorage
      if (progress[`q${i}`] == j) input.checked = true;

      // Save progress on change
      input.addEventListener("change", () => {
        progress[`q${i}`] = j;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      const label = document.createElement("label");
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));

      optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(optionsDiv);
    questionsContainer.appendChild(questionDiv);
  });
}

// Submit quiz
function submitQuiz() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  quizData.forEach((item, i) => {
    if (progress[`q${i}`] == item.answer) {
      score++;
    }
  });

  const finalScore = `Your score is ${score} out of ${quizData.length}.`;
  scoreDiv.textContent = finalScore;

  // Save score in localStorage
  localStorage.setItem("score", score);
}

// On page load
window.addEventListener("load", () => {
  renderQuiz();

  // Show previous score if available
  const lastScore = localStorage.getItem("score");
  if (lastScore !== null) {
    scoreDiv.textContent = `Your score is ${lastScore} out of ${quizData.length}.`;
  }
});

// Submit button click
submitBtn.addEventListener("click", submitQuiz);
