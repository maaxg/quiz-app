const buttonSubmit = document.getElementById("submit-answer");
const selectAnAnswerContainer = document.getElementById("select-an-answer");
const playAgainButton = document.getElementById("play-again");

const OPTION_INDICATOR = ["A", "B", "C", "D", "E"];
let questionIndex = 0;
let selectedAnswer = {
  buttonId: null,
  option: null,
  correctAnswerId: null,
  submited: false,
};
let correctAnswer = null;
let localQuiz = [];
let score = 0;
let finished = false;

function checkAnswer() {
  const button = document.getElementById(selectedAnswer.buttonId);
  const buttonText = document.getElementById("submit-answer-text");
  const correctIcon = document.getElementById("correct-icon");

  if (selectedAnswer.option === correctAnswer) {
    button.classList.add("correct");
    correctIcon.style.display = "block";
    score++;
  } else {
    if (!button.classList.contains("wrong")) {
      const wrongIcon = document.createElement("img");
      wrongIcon.src = "./assets/images/icon-error.svg";
      wrongIcon.id = "wrong-icon";
      wrongIcon.classList.add("wrong-icon");
      button.classList.add("wrong");
      button.appendChild(wrongIcon);
      wrongIcon.style.display = "block";
    }
    correctIcon.style.display = "block";
  }
  buttonText.innerText = "Next question";
}

function getSearch() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const quiz = params.get("quiz");

  return quiz;
}

function getQuizTitle(title, icon) {
  const quizTitle = document.querySelectorAll("#quiz-title");
  const quizIcon = document.querySelectorAll("#quiz-icon");
  const quizTitleContainer = document.querySelectorAll("#quiz-icon-container");
  quizTitleContainer.forEach((item) => {
    item.classList.add(title.toLowerCase() + "-quiz");
  });
  quizTitle.forEach((item) => {
    item.innerHTML = title;
  });
  quizIcon.forEach((item) => {
    item.src = icon;
  });
}

function getQuestions() {
  fetch("/starter-code/data.json")
    .then(async (response) => {
      return response.json();
    })
    .then((result) => {
      drawInformations(result.quizzes);
    })
    .catch((error) => console.log(error));
}

function drawQuestion(questions) {
  const prompt = document.getElementById("prompt");
  const numberOfQuestions = document.getElementById("number-of-questions");
  const question = questions[questionIndex];
  numberOfQuestions.innerHTML = `Question ${questionIndex + 1} of ${
    questions.length
  }`;
  prompt.innerHTML = question.question;
}

function drawProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = ((questionIndex + 1) / 100) * 1000;
  progressBar.style.width = `${progress}%`;
}

function onSelectOption(evt, answer, correctAnswerId, id, optionIndicatorId) {
  evt.preventDefault();
  console.log(selectedAnswer);
  if (selectedAnswer.submited) return;
  const option = document.getElementById(id);
  const optionIndicator = document.getElementById(optionIndicatorId);
  const options = document.querySelectorAll(".active");
  const optionIndicators = document.querySelectorAll(".answer-option-active");

  options.forEach((option) => option.classList.remove("active"));
  optionIndicators.forEach((optionIndicator) =>
    optionIndicator.classList.remove("answer-option-active")
  );

  optionIndicator.classList.add("answer-option-active");
  option.classList.add("active");
  selectAnAnswerContainer.style.display = "none";
  selectedAnswer = { option: answer, buttonId: id, correctAnswerId };
}

function drawOptions(questions) {
  const optionsContainer = document.getElementById("options-container");
  const question = questions[questionIndex];
  let correctOptionId = null;
  if (correctAnswer !== question.answer) {
    optionsContainer.innerHTML = "";
  }
  correctAnswer = question.answer;
  question.options.forEach((option, index) => {
    const li = document.createElement("li");

    const optionButton = document.createElement("button");
    optionButton.id = `option-${index}`;

    const optionText = document.createElement("h3");

    optionText.innerText = option;

    const optionIndicator = document.createElement("div");
    optionIndicator.classList.add("answer-option");
    optionIndicator.id = "option-indicator-" + index;
    const optionIndicatorText = document.createElement("h3");

    optionIndicatorText.innerText = OPTION_INDICATOR[index];
    if (correctAnswer === option) {
      correctOptionId = optionButton.id;
    }

    const correctIcon = document.createElement("img");
    correctIcon.src = "./assets/images/icon-correct.svg";
    correctIcon.id = "correct-icon";
    correctIcon.classList.add("correct-icon");

    optionIndicator.appendChild(optionIndicatorText);
    optionButton.appendChild(optionIndicator);
    optionButton.appendChild(optionText);

    if (correctAnswer === option) optionButton.appendChild(correctIcon);

    li.appendChild(optionButton);

    optionsContainer.appendChild(li);

    optionButton.addEventListener("click", (evt) =>
      onSelectOption(
        evt,
        option,
        correctOptionId,
        optionButton.id,
        optionIndicator.id
      )
    );
  });
}

function drawInformations(quizzes) {
  const quiz = localQuiz?.questions?.length
    ? localQuiz
    : quizzes.find((quiz) => quiz.title === getSearch());
  if (!localQuiz.length) localQuiz = quiz;
  console.log(localQuiz);
  if (quiz) {
    getQuizTitle(quiz.title, quiz.icon);
    drawQuestion(quiz.questions);
    drawProgressBar();
    drawOptions(quiz.questions);
  }
}

getQuestions();
buttonSubmit.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (selectedAnswer.submited) {
    console.log(localQuiz, questionIndex);
    if (questionIndex < localQuiz.questions.length - 1) questionIndex++;
    else {
      finished = true;
      const quizContainer = document.getElementById("question-container");
      const resultContainer = document.getElementById("quiz-result");

      quizContainer.style.display = "none";
      resultContainer.style.display = "flex";
      const scoreText = document.getElementById("quiz-score");
      const outOf = document.getElementById("quiz-score-out-of");
      scoreText.innerText = score;
      outOf.innerText = `out of ${localQuiz.questions.length}`;

      return;
    }
    drawInformations();
    const buttonText = document.getElementById("submit-answer-text");
    buttonText.innerText = "Submit answer";
    selectedAnswer = {
      buttonId: null,
      correctAnswerId: null,
      option: null,
      submited: false,
    };
  }
  if (!selectedAnswer.buttonId) {
    selectAnAnswerContainer.style.display = "flex";
    return;
  } else {
    selectedAnswer.submited = true;
  }

  checkAnswer();
});

playAgainButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  window.location.href = "/starter-code/index.html";
});
