const arrowLeft = document.querySelector('#left');
const arrowRight = document.querySelector('#right');
const imageElement = document.querySelector('.imagePhoto');
let currentNumber = parseInt(imageElement.src.slice(-5, -4));

function handleLeftClick() {
  currentNumber -= 1;
  currentNumber === 0 ? (currentNumber = 4) : (currentNumber = currentNumber);
  imageElement.src = `http://127.0.0.1:5500/images/image${currentNumber}.png`;
}
function handleRightClick() {
  currentNumber += 1;
  currentNumber === 5 ? (currentNumber = 1) : (currentNumber = currentNumber);
  imageElement.src = `http://127.0.0.1:5500/images/image${currentNumber}.png`;
}

arrowLeft.addEventListener('click', () => {
  handleLeftClick();
});
arrowRight.addEventListener('click', () => {
  handleRightClick();
});
