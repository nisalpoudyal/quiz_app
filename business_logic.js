function parseQuestions(rawQuestions) {
  const formattedQuestions = [];
  for (let question of rawQuestions) {
    const formattedQuestion = {
      question: question.question,
      options: getRandomizedArray ([question.correct_answer, ...question.incorrect_answers]),
      correct_answer: question.correct_answer,
    };
    formattedQuestions.push(formattedQuestion);
  }
  return formattedQuestions;  
}

const getQuestions = async (count) => {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${count}&category=18&difficulty=medium&type=multiple`
    );
    const data = await response.json();
    const questions = await data.results;
    const formattedQuestions = parseQuestions(questions);
    if (questions.length === 0) {
      console.log("Please check the url");
    }
    return formattedQuestions;
  } catch (error) {
    console.log(error);
  }
};

const getCorrectAnswers = (questions) => {
  let answers = [];
  for (let q of questions) {
    answers.push(q.correct_answer);
  }
  return answers;
};
 
const getOptions = (questions) => {
  let options = [];
  for (let q of questions) {
    options.push(q.options);
  }
  return options;
};

const calculateScore = (correctAns, userAnswers) => {
  let correctCount = 0;
  // Assuming ans and question array have same length
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === correctAns[i]) {
      correctCount++;
    }
  }
  return correctCount;
 
};
