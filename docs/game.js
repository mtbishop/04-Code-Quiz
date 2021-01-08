const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let penalty = 10;
let questionCounter = 0;
let availableQuestions = [];
// score value for correct answers
const CORRECT_BONUS = 10;
// total amount of questions
const MAX_QUESTIONS = 5;

// timer variables
let timeLeft = 80;
var t;
// timer function
function countDown() {
  document.getElementById('time-left').value = timeLeft;
  t = setTimeout(countDown, 1000);
  if (timeLeft <= 0) {
    clearTimeout(t);
  }
  timeLeft--;
}
window.onload = countDown;

// questions array

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
    choice4: 'Footer',
    answer: 2,
  },
  {
    question: 'Which event occurs when the user clicks on an HTML element?',
    choice1: 'onchange',
    choice2: 'onclick',
    choice3: 'onmouseover',
    choice4: 'onmouseclick',
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

function startGame() {
  // starts at first question
  questionCounter = 0;
  score = 0;
  // grabs from questions array
  availableQuestions = [...questions];
  // runs first question
  getNewQuestion();
}

function getNewQuestion() {
  // when the last question is answered, it ...
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // ends timer when quiz is complete
    clearTimeout(t);
    // score is given based on time left, cut in half, then added to final score
    timeLeft = timeLeft * 0.5;
    localStorage.setItem('mostRecentScore', score + timeLeft);
    // goes to end page
    return window.location.assign('end.html');
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  // randomizes question index
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  // selects the correct answer by number value
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
    // adds a class decided by if the question was correct or incorrect
    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    // adds CORRECT_BONUS value if answer is correct
    if (classToApply === 'correct') {
      //if answer is correct, you get the correct bonus
      incrementScore(CORRECT_BONUS);
    }
    // if answer is incorrect the time is penalized by penalty value
    else {
      timeLeft = timeLeft - penalty;
    }

    selectedChoice.parentElement.classList.add(classToApply);
    // adds incorrect and correct class depending on answer choice
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1500);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
