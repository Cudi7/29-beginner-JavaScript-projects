btn = document.querySelector('#btn');
text = document.querySelector('#hex-value');

function changeColor() {
  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let newColor = '#';

  while (newColor.length < 7) {
    const rand = Math.floor(Math.random() * values.length);
    newColor += `${values[rand]}`;
  }

  text.innerText = newColor;
  document.body.style.backgroundColor = newColor;
}

btn.addEventListener('click', changeColor);
