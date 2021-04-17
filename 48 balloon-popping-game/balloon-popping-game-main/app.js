const ballons = Array.from(document.querySelectorAll('#balloon-gallery div'));

function removeRandomPop() {
  const randomElementToRemove = Array.from(
    document.querySelectorAll('.randomH')
  );

  setTimeout(() => {
    randomElementToRemove.forEach((el) => {
      el.style.transition = `all ${Math.floor(Math.random() * 15) + 5}s ease`;
      el.style.transform = 'translateY(2000px)';
    });
  }, 1000);
}

function showRandomPop() {
  const hSomething = document.createElement(
    `h${Math.floor(Math.random() * 6) + 1}`
  );
  hSomething.classList.add('randomH');
  hSomething.style.top = `${Math.floor(
    Math.random() * document.body.clientHeight
  )}px`;
  hSomething.style.left = `${Math.floor(
    Math.random() * document.body.clientWidth
  )}px`;
  hSomething.innerText = 'POP';
  document.body.append(hSomething);

  hSomething.style.fontSize = `${Math.floor(Math.random() * 60)}px`;
  console.log(hSomething.style.fontSize);
  removeRandomPop();
}

const randomNumber = () => Math.floor(Math.random() * 256);

function randomColor() {
  ballons.forEach(
    (balon) =>
      (balon.style.backgroundColor = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`)
  );
}

randomColor();

ballons.forEach((balon) => {
  balon.addEventListener('click', (e) => {
    e.target.style.opacity = '0';
    e.target.style.transform = 'scale(0.1)';

    showRandomPop();
  });
});
