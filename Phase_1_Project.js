let totalScore = 0;
let questions = [];

const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

document.addEventListener('DOMContentLoaded', function(){
  fetch('https://the-trivia-api.com/api/questions')
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

/*const myQuestions = 
[
    {
        "category": "Geography",
        "id": "62373588cfe13103f55eb53f",
        "correctAnswer": "Montenegro",
        "incorrectAnswers": [
            "Yemen",
            "Mexico",
            "Monaco"
        ],
        "question": "Which region of the world uses '.me' at the end of its web addresses?",
        "tags": [],
        "type": "Multiple Choice",
        "difficulty": "hard"
    },
    {
        "category": "Sport & Leisure",
        "id": "62399eccaf96521963a08708",
        "correctAnswer": "Germany",
        "incorrectAnswers": [
            "Spain",
            "Italy",
            "Argentina"
        ],
        "question": "Which country won the 2014 FIFA World Cup, hosted in Brazil?",
        "tags": [
            "football",
            "soccer",
            "world_cup"
        ],
        "type": "Multiple Choice",
        "difficulty": "medium"
    },
    {
        "category": "Music",
        "id": "622a1c357cc59eab6f94fd6c",
        "correctAnswer": "Fatboy Slim",
        "incorrectAnswers": [
            "Basement Jaxx",
            "Chemical Brothers",
            "Daft Punk"
        ],
        "question": "Whose Albums Include \"Better Living By Chemistry\" & \"You've Come A Long Way Baby\"?",
        "tags": [
            "music_albums"
        ],
        "type": "Multiple Choice",
        "difficulty": "medium"
    },
    {
        "category": "Music",
        "id": "625064d0e12f6dec240bdfcf",
        "correctAnswer": "Eddy Grant",
        "incorrectAnswers": [
            "Devo",
            "Suzi Quatro",
            "Nick Gilder"
        ],
        "question": "'Electric Avenue' was a one hit wonder in 1983 by which artist?",
        "tags": [
            "songs",
            "one_hit_wonders"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard"
    },
    {
        "category": "Music",
        "id": "622a1c357cc59eab6f94fd88",
        "correctAnswer": "Jenny",
        "incorrectAnswers": [
            "Brenda",
            "Lisa",
            "Julie"
        ],
        "question": "Who Is Tommy Tutone Trying To Call When He Dials \"867 5309\"",
        "tags": [
            "songs",
            "lyrics"
        ],
        "type": "Multiple Choice",
        "difficulty": "medium"
    },
    {
        "category": "Society & Culture",
        "id": "622a1c357cc59eab6f94fcea",
        "correctAnswer": "Indo-European",
        "incorrectAnswers": [
            "Niger–Congo",
            "Dravidian",
            "Kra–Dai"
        ],
        "question": "The language 'Russian' belongs to which language family?",
        "tags": [
            "language"
        ],
        "type": "Multiple Choice",
        "difficulty": "medium"
    },
    {
        "category": "Music",
        "id": "622a1c387cc59eab6f950baa",
        "correctAnswer": "Nine Inch Nails",
        "incorrectAnswers": [
            "In This Moment",
            "Nitty Gritty Dirt Band",
            "Animal Collective"
        ],
        "question": "Which American industrial rock band released the studio album 'The Downward Spiral'?",
        "tags": [],
        "type": "Multiple Choice",
        "difficulty": "hard"
    },
    {
        "category": "Sport & Leisure",
        "id": "622a1c367cc59eab6f9500d8",
        "correctAnswer": "Leeds United",
        "incorrectAnswers": [
            "Chelsea",
            "Newcastle United",
            "Everton"
        ],
        "question": "A Statue Of Billy Bremner Stands Outside The Ground Of Which Football Ground?",
        "tags": [],
        "type": "Multiple Choice",
        "difficulty": "hard"
    },
    {
        "category": "Film & TV",
        "id": "624dba44de6018633d31f6bc",
        "correctAnswer": "Carly Simon",
        "incorrectAnswers": [
            "Lulu",
            "Nancy Sinatra",
            "Matt Monro"
        ],
        "question": "Who performed the theme song to the James Bond film The Spy Who Loved Me?",
        "tags": [
            "james_bond",
            "film",
            "soundtracks"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard"
    },
    {
        "category": "Society & Culture",
        "id": "622a1c3d7cc59eab6f951c6e",
        "correctAnswer": "The Shepherds",
        "incorrectAnswers": [
            "Three Wise Men",
            "King Herod",
            "The Stable Boy"
        ],
        "question": "According to the bible, who were the baby Jesus's first visitors?",
        "tags": [],
        "type": "Multiple Choice",
        "difficulty": "hard"
    }
]
*/