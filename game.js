const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: 'How do you find the number with the highest value of x and y?',
    choice1: 'Math.Random(x,y)',
    choice2: 'ceil.Math(x,y)',
    choice3: 'Math.ceiling(x,y)',
    choice4: 'Math.max(x,y)',
    answer: 3,
  },
  {
    question: 'How do you create a function in JavaScript?',
    choice1: 'function myFunction()',
    choice2: 'fun: myFunction()',
    choice3: 'function:myFunction()',
    choice4: 'function(myFunction)',
    answer: 1,
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    choice1: 'Head',
    choice2: 'Both',
    choice3: 'Body',
    choice4: '???',
    answer: 2,
  },
  {
    question: 'Is JavaScript the same as Java?',
    choice1: 'True',
    choice2: 'False',
    answer: 2,
  },
  {
    question: 'How does a FOR loop start?',
    choice1: 'for (i=0; i > 10; ii+)',
    choice2: 'for (i=0; i <= 10; i++)',
    choice3: 'for i=0; i <= 10; i++',
    choice4: 'for i=0; i < 10;',
    answer: 2,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score);
    // goes to end page
    return window.location.assign('/end.html');
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

      if(classToApply === "correct") {
          incrementScore(CORRECT_BONUS);
      }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};



startGame();
