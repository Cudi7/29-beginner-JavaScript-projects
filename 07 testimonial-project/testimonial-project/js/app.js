let customers = [];
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const img = document.querySelector('.img-card');
const name = document.querySelector('#customer-name');
const text = document.querySelector('#customer-text');
let currentIndex = 0;

const createCustomer = (id, name, description) => {
  id = {
    name,
    description,
    img: `img/customer-${id}.jpg`,
  };
  customers.push(id);
};

function showCustomer(direction) {
  direction === 'left' ? (currentIndex -= 1) : (currentIndex += 1);

  if (currentIndex < 0) currentIndex = 4;
  if (currentIndex > 4) currentIndex = 0;

  name.innerText = customers[currentIndex].name;
  text.innerText = customers[currentIndex].description;
  img.src = customers[currentIndex].img;
}

function handleClick(e) {
  const el = e.target.classList;
  if (el.contains('prevBtn')) showCustomer('left');
  if (el.contains('nextBtn')) showCustomer('right');
}

prevBtn.addEventListener('click', handleClick);
nextBtn.addEventListener('click', handleClick);

createCustomer(
  0,
  'John',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis neque reprehenderit laborum, corporis explicabo assumenda. Porro impedit consectetur animi, reprehenderit recusandae sapiente at aliquam reiciendis modi ipsam rerum suscipit distinctio?'
);
createCustomer(
  1,
  'Sandy',
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock'
);
createCustomer(
  2,
  'Amy',
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
);
createCustomer(
  3,
  'Tyrell',
  "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
);
createCustomer(
  4,
  'Wanda',
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
);
