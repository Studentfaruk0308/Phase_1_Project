let totalScore = 0;
let questions = [];


const externalUrl = 'https://the-trivia-api.com/api/questions'
const localUrl = 'http://localhost:3000/questions'
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'



document.addEventListener('DOMContentLoaded', function(){
  fetch(externalUrl)
  .then((response) => response.json())
  .then((json) => {
    questions = json
  })
  .then(() => console.log(questions))
  .catch((error) => console.warn(error))
});



// https://javascript.info/array-methods#shuffle-an-array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function displayQuestion (questionIndex){
  // Check if quiz finished
  if (questionIndex >= questions.length){
    displayResult();
  } else {
    // Show next question
    const quizContainer = document.getElementById('question-answer');
    const data = questions[questionIndex]
    const answerList = [...data.incorrectAnswers,data.correctAnswer]
    const formattedAnswerList = answerList.map((answer) => answer.replace(/(\"|\')/g,''))
    shuffle(formattedAnswerList)
    quizContainer.innerHTML=
    `
    <div class="question-row">
    <div class="col-sm-3">${questionIndex+1}</div>
    <div class="col-sm-9">${data.question}</div>
     </div>
    <div class="answer-row">
    ${formattedAnswerList.map((answer)=>(
      `<button 
      class="col-sm-12 col-lg-3" 
      onclick='submitAnswer(${questionIndex+1}, "${answer}", "${data.correctAnswer.replace(/(\"|\')/g,'')}")'>
        ${answer}
      </button>`)).join('')}
    </div>
  `
  }
};



function displayResult() {
  const quizContainer = document.getElementById('question-answer');
  quizContainer.innerHTML= `
  <div class="col-sm-12">
  YOUR TOTAL CORRECTED ANSWER IS ${totalScore} OUT OF ${questions.length}
  </div>
  
  <button class="col-sm-12" onclick="tryAgain()">TRY AGAIN ?</button>
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

function tryAgain(){
  totalScore = 0;
  startQuiz()
};

// from https://github.com/Studentfaruk0308/fewpjs-build-the-example/blob/master/main.js

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

function like(){
  const likeButton = document.getElementById("like");
  likeButton.innerHTML = '<div class="loader"></div>'
  mimicServerCall()
    .then(()=>{ likeButton.innerHTML=`${FULL_HEART}`})
    .catch((error)=>{ 
      alert(error)
      likeButton.innerHTML=`error ${EMPTY_HEART}`
    })
}
