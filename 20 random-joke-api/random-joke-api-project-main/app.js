const jokeBtn = document.querySelector('#get-joke');
const jokeDisplay = document.querySelector('#display-joke');

async function getJoke() {
  try {
    const data = await fetch('https://api.chucknorris.io/jokes/random');
    const response = await data.json();
    return response.value;
  } catch (error) {
    console.log(error.message);
  }
}
async function handleClick() {
  jokeDisplay.innerHTML = await getJoke();
}

jokeBtn.addEventListener('click', () => {
  handleClick();
});
