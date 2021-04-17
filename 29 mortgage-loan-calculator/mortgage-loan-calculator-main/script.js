loanCalculator = document.querySelector('#loancal');
loanAmount = loanCalculator.querySelector('#amount');
loanInterestRate = loanCalculator.querySelector('#interest_rate');
loanMonthsToPay = loanCalculator.querySelector('#months');
loanPayment = loanCalculator.querySelector('#payment');
loanBtn = loanCalculator.querySelector('#loanBtn');

function displayResult() {
  const interest =
    (loanAmount.value * (loanInterestRate.value * 0.01)) /
    loanMonthsToPay.value;
  let payment = (loanAmount.value / loanMonthsToPay.value + interest).toFixed(
    2
  );
  loanPayment.innerHTML = payment;
}

const checkAllInputs = () =>
  loanAmount.value > 0 &&
  loanInterestRate.value > 0 &&
  loanMonthsToPay.value > 0;

function handleClick() {
  const inputs = checkAllInputs();
  inputs && displayResult();
}

loanBtn.addEventListener('click', () => {
  handleClick();
});
