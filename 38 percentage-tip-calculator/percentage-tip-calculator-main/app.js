const billAmount = document.querySelector('#bill-amount');
const tipPercentage = document.querySelector('#percentage-tip');
const tipAmount = document.querySelector('#tip-amount');
const total = document.querySelector('#total');
const calculateBtn = document.querySelector('#calculate');

function displayResults() {
  if (isNaN(billAmount.value) || isNaN(tipPercentage.value)) return;

  const bill = parseInt(billAmount.value);
  const percentage = parseInt(tipPercentage.value);
  tipAmount.value = bill * (percentage / 100);
  total.value = bill + parseInt(tipAmount.value);
}

function displayError() {
  billAmount.value.length
    ? (tipPercentage.value = 'Fill this field!')
    : (billAmount.value = 'Fill this field!');

  setTimeout(() => {
    if (tipPercentage.value.includes('Fill')) tipPercentage.value = '';
    if (billAmount.value.includes('Fill')) billAmount.value = '';
  }, 1000);
}

function handleClick() {
  billAmount.value && tipPercentage.value ? displayResults() : displayError();
}

calculateBtn.addEventListener('click', () => {
  handleClick();
});
