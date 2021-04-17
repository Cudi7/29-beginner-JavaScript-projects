const btn = document.querySelector('.btn');
const h1Color = document.querySelector('.color__value');

const randomNum = (number) =>
  number
    ? Math.floor(Math.random() * number)
    : Number(Math.random().toFixed(2));

function randomColor() {
  r = randomNum(255);
  g = randomNum(255);
  b = randomNum(255);
  a = randomNum();

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function changeColor() {
  const color = randomColor();
  document.body.style.backgroundColor = color;
  h1Color.innerText = color;
}

btn.addEventListener('click', changeColor);
