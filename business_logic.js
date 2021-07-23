function parseQuestion (rawQuestion) {
const formattedQuestion = [];
for (let question of rawQuestion) {
const formattedQuestion = {
    question: question.question,
    Option: [question.correct_answer, ...question.incorrect_answer],
    correct_answer: question.correct_answer,
     
};
    formattedQuestion.push(formattedQuestion);
}
    return formattedQuestion;

}

const getQuestion = async (count) => {
    try {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${count}&category=18&difficulty=medium&type=multiple`

        );
        const data = await response.json();
        const question = await data.results;
        const formattedQuestion = parseQuestion(question);
        if (question.length === 0) {
            console.log("please check the url");
        }
        return formattedQuestion;
    }catch (error) {
        console.log(error);
    }
};

getQuestion(3);
const getCorrectAnswer = (question) => {
    let answer = [];
    for (let q of question) {
        answer.push(q.correct_answer);
    }
    return answers;
};

const getOptions = (question) => {
    let getOptions = [];
    for (let q of question) {
        answer.push(q.options);
    }
    return options;
};
    


