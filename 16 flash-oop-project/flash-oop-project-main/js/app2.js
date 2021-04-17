const addQuestion = document.querySelector('#show-btn');
const card = document.querySelector('.card');
const cardForm = document.querySelector('#question-form');
const questionsList = document.querySelector('#questions-list');
const questionInput = document.querySelector('#question-input');
const answerInput = document.querySelector('#answer-input');
let cards = JSON.parse(localStorage.getItem('cards')) || [];

const randomId = () => Math.floor(Math.random() * 20000);

function cleanInput() {
  questionInput.value = '';
  answerInput.value = '';
}

function removeCard(id, element) {
  cards = cards.filter((card) => card.id !== parseInt(id));
  localStorage.setItem('cards', JSON.stringify(cards));
  element.remove();
}

function cardEvents(id) {
  const cards = [...questionsList.querySelectorAll('.col-md-4')];
  cards.forEach((element) => {
    //toggle show event
    element.querySelector('.show-answer').addEventListener('click', () => {
      element.querySelector('.answer').classList.contains('showItem')
        ? element.querySelector('.answer').classList.remove('showItem')
        : element.querySelector('.answer').classList.add('showItem');
    });
    //delete card event
    element.querySelector('#delete-flashcard').addEventListener('click', () => {
      removeCard(element.id, element);
    });
    //edit one event
    element.querySelector('#edit-flashcard').addEventListener('click', () => {
      card.classList.add('showItem');
      questionInput.value = element.querySelector('.question').innerText;
      answerInput.value = element.querySelector('.answer').innerText;
      removeCard(element.id, element);
    });
  });
}

function displayCard(question, answer) {
  let id;
  if (question && answer) {
    id = randomId();
    cards.push({ id, question, answer });
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  if (cards.length) {
    questionsList.innerHTML = '';
    cards.forEach((card) => {
      questionsList.innerHTML += `    
    <div class="col-md-4" id="${card.id}"> 
        <!--Template for card data-->
        <div class="card card-body flashcard my-3">
            <h4 class="question text-capitalize">${card.question}</h4>
            <a href="javascript:void(0)" class="text-capitalize my-3 show-answer">Show/Hide answer</a>
            <h5 class="answer mb-3">${card.answer}</h5>
            <div class="flashcard-btn d-flex justify-content-between">
                <a href="javascript:void(0)" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="">edit</a>
                <a href="javascript:void(0)" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
            </div> 
        </div>
    </div>
  `;
    });

    cardEvents(id);
    cleanInput();
  }
}

function handleSubmit() {
  displayCard(questionInput.value, answerInput.value);
}

function displayForm() {
  card.classList.add('showItem');
  document.querySelector('.close-btn').addEventListener('click', () => {
    cleanInput();
    card.classList.remove('showItem');
  });
}

addQuestion.addEventListener('click', () => {
  displayForm();
});

cardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});

displayCard();
