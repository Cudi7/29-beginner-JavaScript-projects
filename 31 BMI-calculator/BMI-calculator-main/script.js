const bmiForm = document.querySelector('#bmiForm');
const height = bmiForm.querySelector('#height');
const weight = bmiForm.querySelector('#weight');
const results = bmiForm.querySelector('#results');

function checkInputs() {
  const notEmpty = height.value.length > 0 && weight.value.length > 0; // check if input is empty
  const number = !isNaN(height.value) && !isNaN(weight.value); // check if input is number
  return notEmpty && number; //return true if everything is true
}

function displayValues() {
  const bmi = (weight.value / ((height.value * height.value) / 10000)).toFixed(
    2
  );
  results.innerHTML = bmi;
}

function handleSubmit() {
  const checked = checkInputs();
  console.log(checked);
  checked && displayValues(); //if checked true, we call displayValues
}

bmiForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});
