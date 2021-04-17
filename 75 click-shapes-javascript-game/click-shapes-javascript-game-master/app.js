const startBtn = document.querySelector('[type=button]');
let countdown = 5;
let timeId;
let currentScore = 0;
let currentSeconds = 2;

function updateUI(message, currentScore = 0, currentSeconds = 2) {
  const starting = `<p>Game starts in: ${countdown} seconds, get ready</p>`;

  return `
    <h3>Your Score is: ${currentScore}/15</h3>
    <h4 class="timeLeft">Time left: ${currentSeconds} seconds</h4>
    ${message ? '' : starting}
    `;
}

const randomNumber = (num) => Math.floor(Math.random() * num) + 1;

function resetGame() {
  countdown = 5;
  currentScore = 0;
  currentSeconds = 2;
  startGame();
}

function endGame(message) {
  clearInterval(timeId);

  document.body.innerHTML = `
  <p>game ended you ${message}</p>
  <button class="reset">Play Again?</button>
  `;

  document.querySelector('.reset').addEventListener('click', () => {
    resetGame();
  });
}

function updateScore() {
  currentScore++;

  document.body.innerHTML = updateUI(
    'cleanStartMessage',
    currentScore,
    currentSeconds
  );

  if (currentScore >= 15) {
    endGame('Won');
  }
}

function displayBall(withoutRendering) {
  if (!withoutRendering) {
    document.body.innerHTML = updateUI('cleanStartMessage');
  }

  if (currentScore < 15) {
    const randomHeight = randomNumber(document.body.clientHeight);
    const randomWidth = randomNumber(document.body.clientWidth);

    const ball = document.createElement('div');

    ball.classList.add('box');
    ball.style.backgroundColor = `rgb(${randomNumber(255)}, ${randomNumber(
      255
    )}, ${randomNumber(255)})`;
    ball.style.top = `${randomNumber(randomHeight)}px`;
    ball.style.left = `${randomNumber(randomWidth)}px`;
    ball.style.borderRadius = `${randomNumber(50)}%`;

    timeId = setInterval(() => {
      currentSeconds -= 0.1;
      document.querySelector(
        '.timeLeft'
      ).innerHTML = `Time left: ${currentSeconds.toFixed(2)} seconds`;

      if (currentSeconds < 0) {
        endGame('Lost');
      }
    }, 100);

    document.body.append(ball);

    const audio = new Audio('awesome.wav');

    ball.addEventListener('click', () => {
      audio.play();
      clearInterval(timeId);
      currentSeconds = 2;
      updateScore();
      displayBall('withoutRendering');
    });
  }
}

function startGame() {
  // countdown starts at 5
  if (countdown <= 0) {
    clearTimeout(timeId);
    displayBall();
  } else {
    document.body.innerHTML = updateUI();
    countdown--;

    timeId = setTimeout(startGame, 1000);
  }
}

startBtn.addEventListener('click', () => {
  startGame();
});
