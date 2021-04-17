btn = document.querySelector('#button');
bgCanvas = document.querySelector('#canvas');

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function displayColor(input) {
  bgCanvas.style.backgroundColor = input;
}

function handleClick() {
  displayColor(getRandomColor());
}

btn.addEventListener('click', () => {
  handleClick();
});
