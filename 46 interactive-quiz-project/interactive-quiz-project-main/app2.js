const questions = [
  {
    question: 'What is the baby of a moth known as?',
    choices: ['baby', 'infant', 'kit', 'larva'],
    correctAnswer: 3,
  },
  {
    question: 'What is the adult of a kid called?',
    choices: ['calf', 'doe', 'adult', 'chick'],
    correctAnswer: 2,
  },
  {
    question: 'What is the young of buffalo called?',
    choices: ['calf', 'baby', 'pup', 'cow'],
    correctAnswer: 0,
  },
  {
    question: 'What is a baby alligator called?',
    choices: ['baby', 'gator', 'hatchling', 'calf'],
    correctAnswer: 1,
  },
  {
    question: 'What is a baby goose called?',
    choices: ['gooser', 'gosling', 'gup', 'pup'],
    correctAnswer: 1,
  },
];
const question = document.querySelector('.question');
const choiceList = document.querySelector('.choiceList');
const quizMessage = document.querySelector('.quizMessage');
const result = document.querySelector('.result');
const nextButton = document.querySelector('.nextButton');
const resetButton = document.querySelector('.resetButton');

let totalScore = 0;
let currentQuestionNumber = 0;

function resetValues() {
  result.innerText = '';
  totalScore = 0;
  currentQuestionNumber = 0;
  displayUI(currentQuestionNumber);
}

function checkPoints(currentQuestionNumber) {
  if (currentQuestionNumber > 5) return;

  const radioBtn = Array.from(
    choiceList.querySelectorAll('input[name="dynradio"]')
  );

  const answerIndex = currentQuestionNumber - 1;

  for (let i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) {
      parseInt(radioBtn[i].value) === questions[answerIndex].correctAnswer
        ? (totalScore += 1)
        : (totalScore += 0);
    }
  }
}

function displayUI(currentQuestionNumber) {
  // display question
  question.innerText = questions[currentQuestionNumber].question;
  // reset answer list before displaying new one, so they dont acumulate
  choiceList.innerHTML = '';
  // create and apend answers
  for (let i = 0; i < questions[currentQuestionNumber].choices.length; i++) {
    const newLi = document.createElement('li');
    newLi.innerHTML = `<input class="input-class" type="radio" value="${i}" name="dynradio" />${questions[currentQuestionNumber].choices[i]}`;
    choiceList.append(newLi);
  }
}

function updateUI() {
  currentQuestionNumber += 1;
  checkPoints(currentQuestionNumber);
  if (currentQuestionNumber > 4) {
    result.innerText = `Your total score: ${totalScore}`;
  } else {
    displayUI(currentQuestionNumber);
  }
}

function loadNewGame() {
  displayUI(currentQuestionNumber);
  nextButton.addEventListener('click', () => {
    updateUI();
  });
  resetButton.addEventListener('click', () => {
    resetValues();
  });
}

loadNewGame();
