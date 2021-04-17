btnGenerator = document.querySelector('#btn');
cardBody = document.querySelector('.card');

function displayPerson(randomPerson) {
  const image = cardBody.querySelector('.card-img-top');
  const firstName = cardBody.querySelector('#first');
  const lastName = cardBody.querySelector('#last');
  const location = cardBody.querySelector('#street');
  const phone = cardBody.querySelector('#phone');
  const email = cardBody.querySelector('#email');

  image.src = randomPerson.picture.large;
  firstName.innerText = randomPerson.name.first;
  lastName.innerText = randomPerson.name.last;
  location.innerText = `${randomPerson.location.city}, ${randomPerson.location.country}`;
  phone.innerText = randomPerson.phone;
  email.innerText = randomPerson.email;
}

async function getPerson() {
  try {
    const data = await fetch('https://randomuser.me/api');
    return await data.json();
  } catch (error) {
    console.log(error.message);
  }
}

async function handleClick() {
  const randomPerson = await getPerson();
  displayPerson(randomPerson.results[0]);
}

btnGenerator.addEventListener('click', () => {
  handleClick();
});
