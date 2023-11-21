const htmlButton = document.getElementById("html");
const cssButton = document.getElementById("css");
const jsButton = document.getElementById("js");
const accessibilityButton = document.getElementById("accessibility");

function onSelectQuiz(evt, quiz) {
  evt.preventDefault();
  window.location.href = "quiz.html?quiz=" + quiz;
}

htmlButton.addEventListener("click", (evt) => onSelectQuiz(evt, "HTML"));
cssButton.addEventListener("click", (evt) => onSelectQuiz(evt, "CSS"));
jsButton.addEventListener("click", (evt) => onSelectQuiz(evt, "JavaScript"));
accessibilityButton.addEventListener("click", (evt) =>
  onSelectQuiz(evt, "Accessibility")
);
