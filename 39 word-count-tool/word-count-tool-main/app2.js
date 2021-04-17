const inputText = document.querySelector('#str');
const result = document.querySelector('#output');
const btn = document.querySelector('#btn');

const displayResult = (textLength) =>
  (result.innerHTML = `<h1>${textLength}</h1>`);

function handleClick() {
  const textLength = inputText.value.length;
  displayResult(textLength);
}

btn.addEventListener('click', handleClick);
