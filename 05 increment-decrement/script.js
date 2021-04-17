const lower = document.querySelector('.lower');
const higher = document.querySelector('.higher');
let number = document.querySelector('.number');
let currentNumber = parseInt(number.innerText);

function handleClick(e) {
  e.target.classList.value === 'lower'
    ? (currentNumber -= 1)
    : (currentNumber += 1);

  number.innerText = currentNumber;
}

lower.addEventListener('click', handleClick);
higher.addEventListener('click', handleClick);
