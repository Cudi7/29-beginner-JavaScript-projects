const text = document.querySelector('#message');
const submit = document.querySelector('#message-form');

function handleError() {
  const feedback = document.querySelector('.feedback');
  feedback.classList.add('show');
  setTimeout(() => {
    feedback.classList.remove('show');
  }, 1500);
}

function showText() {
  const content = document.querySelector('.message-content');
  content.innerText = text.value;
  text.value = '';
}

function handleSubmit(e) {
  e.preventDefault();
  text.value ? showText() : handleError();
}

submit.addEventListener('submit', handleSubmit);
