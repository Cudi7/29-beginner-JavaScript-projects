class coinGame {
  constructor(gameBoard, btnSelection) {
    this.gameBoard = gameBoard;
    this.btnSelection = btnSelection;
    this.resetGame();
  }
  randomNumber = () => Math.floor(Math.random() * 2) + 1;

  resetGame(text) {
    this.playerCurrentScore = 0;
    this.computerCurrentScore = 0;

    this.btnSelection.forEach((btn) => (btn.disabled = false));

    if (text) {
      text.innerText = 'Make a Selection';
      this.gameBoard.querySelector('.resetBtn').remove();

      this.playerScore.innerText = this.playerCurrentScore;
      this.computerScore.innerText = this.computerCurrentScore;
    }
  }

  finishGame() {
    this.btnSelection.forEach((btn) => (btn.disabled = true));

    const btnWrapper = this.gameBoard.querySelector('.btn-wrapper');

    const resetBtn = document.createElement('button');
    resetBtn.innerText = 'Reset?';
    resetBtn.classList.add('resetBtn');
    btnWrapper.append(resetBtn);

    const text = this.gameBoard.querySelector('.btn-wrapper h2');

    text.innerText = `Game finished, the winner is ${
      this.playerCurrentScore > this.computerCurrentScore
        ? 'Player 1'
        : 'Computer'
    }`;

    resetBtn.addEventListener('click', () => {
      this.resetGame(text);
    });
  }

  score(result) {
    this.playerScore = this.gameBoard.querySelector('#player-score');
    this.computerScore = this.gameBoard.querySelector('#computer-score');

    result === this.player
      ? this.playerCurrentScore++
      : this.computerCurrentScore++;

    this.playerScore.innerText = this.playerCurrentScore;
    this.computerScore.innerText = this.computerCurrentScore;

    if (this.playerCurrentScore === 5 || this.computerCurrentScore === 5) {
      this.finishGame();
    }
  }

  displayCoin() {
    const result = this.randomNumber() === 1 ? 'heads' : 'tails';
    this.image.style.background = `url('./${result}.png')`;
    this.score(result);
  }

  startAnimation() {
    this.image = this.gameBoard.querySelector('#image');
    image.style.animation = 'spin 2s';

    this.btnSelection.forEach((btn) => (btn.disabled = true));

    setTimeout(() => {
      image.style.animation = 'none';

      this.btnSelection.forEach((btn) => (btn.disabled = false));

      this.displayCoin();
    }, 2000);
  }

  displayAssignment() {
    this.gameBoard.querySelector('#player-selection').innerText = this.player;

    this.gameBoard.querySelector(
      '#computer-selection'
    ).innerText = this.computer;

    this.startAnimation();
  }

  assignPlayer(id) {
    id === 'heads' ? (this.player = 'heads') : (this.player = 'tails');
    id === 'heads' ? (this.computer = 'tails') : (this.computer = 'heads');
    this.displayAssignment();
  }
}

const gameBoard = document.querySelector('.canvas');
const btnSelection = [...gameBoard.querySelectorAll('button')];
const newGame = new coinGame(gameBoard, btnSelection);

btnSelection.forEach((btn) => {
  btn.addEventListener('click', () => {
    newGame.assignPlayer(btn.id);
  });
});
