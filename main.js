const root = document.getElementById("root");
console.log(root);
let playButton = document.createElement("Button");
let nextButton = document.createElement("Button");
let heading = document.createElement("h1");
let question = document.createElement("h3");
const inputField = document.createElement("input");
// Loading screen
const loadingscreen = document.createElement("h1");
loadingscreen.innerText = "Loading....";
// state variable
let questionCount;
let questions;
let questionId = 0;

const paintLandingPage = () => {
  inputField.type = "number";
  inputField.min = 3;
  inputField.max = 10;
  playButton.innerText = "Play";
  heading.innerText = "PLAY QUIZ";
  root.appendChild(heading);
  root.appendChild(inputField);
  root.appendChild(playButton);
};
paintLandingPage();


const paintQuestion = (questionId, buttonText) => {
  root.innerText = null;
  heading.innerText = "Question";
  question.innerText = questionId + 1;
  nextButton.innerText = buttonText;
  root.appendChild(heading);
  root.appendChild(question);
  root.appendChild(nextButton);
};

playButton.addEventListener ("click", async () => {
questionCount = inputField.value;
if (questionCount >= 3) {
  root.innerHTML = null;
  root.appendChild (loadingscreen);
  question = await getQuestion(questionCount);
  root.innerHTML = null;
  paintQuestion (questionId , "next");
}
return;
});


