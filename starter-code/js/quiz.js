const buttonSubmit = document.getElementById("submit-answer");
const selectAnAnswerContainer = document.getElementById("select-an-answer");

const OPTION_INDICATOR = ["A", "B", "C", "D", "E"];
let questionIndex = 0;
let selectedAnswer = { buttonId: null, option: null, correctAnswerId };
let correctAnswer = null;

function checkAnswer() {
  const button = document.getElementById(selectedAnswer.buttonId);
  const wrongIcon = document.getElementById("wrong-icon");
  const correctIcon = document.getElementById("correct-icon");

  if (selectedAnswer.option === correctAnswer) {
    button.classList.add("correct");
    correctIcon.style.display = "block";
  } else {
    button.classList.add("wrong");
    wrongIcon.style.display = "block";
  }
}

function getSearch() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const quiz = params.get("quiz");
  console.log(quiz);
  return quiz;
}

function getQuizTitle(title, icon) {
  const quizTitle = document.getElementById("quiz-title");
  const quizIcon = document.getElementById("quiz-icon");
  const quizTitleContainer = document.getElementById("quiz-icon-container");

  quizTitleContainer.classList.add(title.toLowerCase() + "-quiz");
  quizTitle.innerHTML = title;
  quizIcon.src = icon;
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
  const progress = (questionIndex / 5) * 100;
  progressBar.style.width = `${progress}%`;
}

function onSelectOption(evt, answer, correctAnswerId, id, optionIndicatorId) {
  evt.preventDefault();
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
    if (correctAnswer === OPTION_INDICATOR[index]) {
      correctOptionId = optionButton.id;
    }
    const wrongIcon = document.createElement("img");
    wrongIcon.src = "./assets/images/icon-error.svg";
    wrongIcon.id = "wrong-icon";
    wrongIcon.classList.add("wrong-icon");

    const correctIcon = document.createElement("img");
    correctIcon.src = "./assets/images/icon-correct.svg";
    correctIcon.id = "correct-icon";
    correctIcon.classList.add("correct-icon");

    optionIndicator.appendChild(optionIndicatorText);
    optionButton.appendChild(optionIndicator);
    optionButton.appendChild(optionText);
    optionButton.appendChild(wrongIcon);
    optionButton.appendChild(correctIcon);

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
  const quiz = quizzes.find((quiz) => quiz.title === getSearch());
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
  if (!selectedAnswer) {
    selectAnAnswerContainer.style.display = "flex";
    return;
  }
  checkAnswer();
});
