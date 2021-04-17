class GuessNumberGame {
  constructor(form, result) {
    this.form = form;
    this.result = result;
    this.secretNumber = this.getSecretNumber();
    this.previousGuesses = [];
    this.remainingGuesses = 10;
    this.win = false;
  }
  getSecretNumber = () => Math.floor(Math.random() * 101);

  loseGame() {
    this.result.innerHTML = `
    <h2>Sorry you lost, try again next time</h2>
    <button>Reset Game?</button>
    `;
  }
  winGame() {
    this.result.innerHTML = `
    <h2>Congratulations, you won, the number was ${this.secretNumber}</h2>
    <button class="resetBtn">Reset Game?</button>
    `;
  }

  endGame(victoryOrDefeat) {
    form.querySelector('#guessField').disabled = true;
    victoryOrDefeat === 'win' ? this.winGame() : this.loseGame();
  }

  updateHint(correctUserInput) {
    const toLowMessage = `Number ${correctUserInput} to low!`;
    const toHighMessage = `Number ${correctUserInput} to high!`;

    this.lowOrHigh = result.querySelector('.lowOrHi');

    this.lowOrHigh.innerText =
      this.secretNumber > correctUserInput ? toLowMessage : toHighMessage;
  }

  updateRemaining() {
    const remaining = result.querySelector('.lastResult');
    this.remainingGuesses -= 1;
    this.remainingGuesses > 0
      ? (remaining.innerText = this.remainingGuesses)
      : this.endGame('lost');
  }

  updatePrevious(currentWrongNumber) {
    // push to the array of wrong guesses
    this.previousGuesses.push(currentWrongNumber);
    // wrap the element were we want to display the array
    const previousText = this.result.querySelector('.guesses');
    // display the elements from the array to that DOM element
    previousText.innerText = '';
    this.previousGuesses.forEach((word) => {
      previousText.innerText += `  ${word}`;
    });
  }
  checkInput() {
    const numInput = parseInt(form.querySelector('#guessField').value);
    form.querySelector('#guessField').value = '';
    if (isNaN(numInput)) {
      alert('Input must be a number');
    } else if (numInput < 0 || numInput > 100) {
      alert('Input must be between 0 and 100');
    } else {
      if (numInput === this.secretNumber) this.win = true;
      return numInput;
    }
  }

  handleClick() {
    const correctUserInput = this.checkInput();
    if (!this.win && correctUserInput) {
      this.updatePrevious(correctUserInput);
      this.updateRemaining();
      this.updateHint(correctUserInput);
    } else {
      if (this.win) this.endGame('win');
    }
  }
}

const form = document.querySelector('.form');
const result = document.querySelector('.resultParas');

const newGame = new GuessNumberGame(form, result);

const submitBtn = document.querySelector('#subt');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newGame.handleClick();
});
