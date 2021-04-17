class TipCalculator {
  constructor(amountInput, peopleInput, serviceInput) {
    this.amount = amountInput;
    this.people = peopleInput;
    this.service = serviceInput;
  }

  displayResults() {
    document.querySelector('#tip-amount').innerText = this.tipAmount;
    document.querySelector('#total-amount').innerText = this.totalAmount;
    document.querySelector('#person-amount').innerText = this.toPay;
  }

  compute() {
    const { currentAmount, currentPeople, currentService } = this;

    this.tipAmount = parseFloat((currentAmount * currentService) / 100);
    this.totalAmount = parseFloat(currentAmount) + this.tipAmount;
    this.toPay = this.totalAmount / currentPeople;

    this.displayResults();
  }

  computeServiceValue(value) {
    if (value === '1') return 20;
    if (value === '2') return 10;
    if (value === '3') return 2;
  }

  handleClick() {
    this.currentAmount = this.amount.value;
    this.currentPeople = this.people.value;
    this.currentService = this.computeServiceValue(this.service.value);

    if (
      this.currentAmount > 0 &&
      this.currentPeople > 0 &&
      this.currentService > 0
    ) {
      const loader = document.querySelector('.loader');
      const results = document.querySelector('.results');
      loader.style.display = 'block';

      setTimeout(() => {
        loader.style.display = 'none';
        results.style.display = 'block';
        this.compute();
      }, 1500);
    }
  }
}

const amountInput = document.querySelector('#input-bill');
const peopleInput = document.querySelector('#input-users');
const serviceInput = document.querySelector('#input-service');
const btn = document.querySelector('input[type=submit]');

const tip = new TipCalculator(amountInput, peopleInput, serviceInput);

amountInput.addEventListener('keyup', () => {
  tip.compute();
});

peopleInput.addEventListener('keyup', () => {
  tip.compute();
});

serviceInput.addEventListener('change', () => {
  tip.compute();
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  tip.handleClick();
});
