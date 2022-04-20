const myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "Brendan Eich"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "npm"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "ESLint"
  }
];

let totalScore = 0;


function displayQuestion (questionIndex){
  if (questionIndex >= myQuestions.length-1){
    displayResult();
  };
  const quizContainer = document.getElementById('question-answer');
  const data = myQuestions[questionIndex]
  quizContainer.innerHTML=
    `
    <div class="question-row">
    <div class="col-sm-3">${questionIndex+1}</div>
    <div class="col-sm-9">${data.question}</div>
  </div>
  <div class="answer-row">
    <button class="col-sm-12 col-lg-3" onclick="submitAnswer(${questionIndex+1}, '${data.answers.a}', '${data.correctAnswer}')">${data.answers.a}</button>
    <button class="col-sm-12 col-lg-3" onclick="submitAnswer(${questionIndex+1}, '${data.answers.b}', '${data.correctAnswer}')">${data.answers.b}</button>
    <button class="col-sm-12 col-lg-3" onclick="submitAnswer(${questionIndex+1}, '${data.answers.c}', '${data.correctAnswer}')">${data.answers.c}</button>
    <button class="col-sm-12 col-lg-3" onclick="submitAnswer(${questionIndex+1}, '${data.answers.d}', '${data.correctAnswer}')">${data.answers.d}</button>
    </div>
`
};



function displayResult() {
  const quizContainer = document.getElementById('question-answer');
  quizContainer.innerHTML= `
  <div class="col-sm-12">
  YOUR TOTAL CORRECTED ANSWER IS ${totalScore} OUT OF ${myQuestions.length}
  </div>
  `
};

function startQuiz(){
displayQuestion(0);  
};

function submitAnswer(nextQuestionIndex,userAnswer,correctAnswer){
if (userAnswer === correctAnswer)
{totalScore = totalScore+1};
displayQuestion(nextQuestionIndex);
};
