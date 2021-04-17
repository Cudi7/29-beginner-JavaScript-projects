const buttons = [...document.querySelectorAll('.button')];

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`; 
}

function changeBackground(btnColor) {
  let newColor = btnColor.id;

  newColor === 'random'
    ? (document.body.style.backgroundColor = getRandomColor())
    : (document.body.style.backgroundColor = `${newColor}`);
}

function handleClick(btn) {
  changeBackground(btn);
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    handleClick(btn);
  });
});
