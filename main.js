const root = document.getElementById('root');
let playButton = document.createElement('button');
let nextButton = document.createElement('button');
let heading = document.createElement('h1');
let question = document.createElement('h3');
const inputField = document.createElement('input');

// Loading Screeen
const loadingScreen = document.createElement('h1');
loadingScreen.innerText = 'Loading....';
// STATE VARIABLES
let questionCount;
let questions;
let questionId = 0;
let getOnlyQsn;
let allOption;
let options;
let optionDiv;
let selectedAns = null;
let allSelectedAns = [];
const paintLandingPage = () => {

	inputField.type = 'number';
	inputField.min = 3;
	inputField.max = 10;
	playButton.innerText = 'Play';

	heading.innerText = 'Play Quiz';
	root.appendChild(heading);
	root.appendChild(inputField);
	root.appendChild(playButton);
};
paintLandingPage();

let getOnlyQuestion = (questions) => {
	return `Q  ${questionId + 1}. ${questions[questionId].question} `;
};

const paintQuestion = (questionId, buttonText) => {
	root.innerHTML = null;
	heading.innerText = 'questions';
	question.innerText = getOnlyQuestion(questions);
	nextButton.innerText = buttonText;
	root.appendChild(heading);
	root.appendChild(question);
	root.appendChild(nextButton);
};

const showOptionsHtml = () => {
	options = getOptions(questions)[questionId];
	let optionsFragements = new DocumentFragment();
	options.map((option) => {
		optionDiv = document.createElement('div');
		let radioButtons = document.createElement('input');
		radioButtons.type = 'radio';
		radioButtons.className = "radio-btn"
		radioButtons.value = option;
		radioButtons.name = 'radio';
		const labelForRadioButton = document.createElement('label');
		labelForRadioButton.htmlFor = option;
		labelForRadioButton.innerText = option;
		optionDiv.appendChild(radioButtons);
		optionDiv.appendChild(labelForRadioButton);
		optionsFragements.appendChild(optionDiv);
	});
	return optionsFragements;
};

playButton.addEventListener('click', async () => {
	// Check if input value is more than 3
	questionCount = inputField.value;
	if (questionCount >= 3) {
		// Fetch question
		// Paint screen with first question
		// Show loading screen
		root.innerHTML = null;
		root.appendChild(loadingScreen);
		questions = await getQuestions(questionCount);
		root.innerHTML = null;
		paintQuestion(questionId, 'Next');
		allOption = showOptionsHtml();

		root.appendChild(allOption);
	}

	return;
});



//  checking and pusing values in the ans array
getCheckedRadioButton = () => {
const allRadioButton = document.querySelectorAll('.radio-btn')	
	allRadioButton.forEach((elem) => {
		if (elem.checked) {
			selectedAns = elem.value
		}else if (selectedAns === null) {
			selectedAns = " ";
		}
	
	})
	allSelectedAns.push(selectedAns);
	selectedAns = null;


}

	
// NEXT BUTTON LOGIC

nextButton.addEventListener('click', () => {
	//TODO:  Save Answer
	let nextButtonText = questionId < questions.length - 2 ? 'Next' : 'Submit';
	if (questionId < questions.length -1 ) {
		// Save Answer here

		getCheckedRadioButton()
		questionId++;
		paintQuestion(questionId, nextButtonText);
     	allOption = showOptionsHtml();

		root.appendChild(allOption);

	} else {
		// calculateFinalScore(questions)
	calculateFinalScore()	
		getCheckedRadioButton()
		showResultPage();
	}
});

// calculate correct ans 
const calculateFinalScore = () => {
	
    let correctAns = getCorrectAnswers(questions)
	let score = calculateScore(correctAns, allSelectedAns);
	return score
}


const showResultPage = () => {
	// TODO: Call get score function and  change score inner text
	// TODO: Add replay button so that the dom paints landing page screen
	root.innerHTML = null;
	heading.innerText = ' Your Score Is ';
	const score = document.createElement('h1');
	score.innerText = `${calculateFinalScore()}/${  questionCount }`;
	root.appendChild(heading);
	root.appendChild(score);
};