const quoteOutput = document.querySelector('#quoteOutput');
const authorOutput = document.querySelector('#authorOutput');
const quoteBtn = document.querySelector('.quoteBtn');

const arrayOfQuotes = [
  {
    author: 'Jim Rohn',
    quote: 'Beware of what you become in pursuit of what you want.',
  },
  {
    author: 'Epictetus',
    quote:
      "It's not what happens to you, but how you react to it that matters.",
  },
  { author: 'Frank Sinatra', quote: 'The best revenge is massive success.' },
  {
    author: 'Wayne Gretzy',
    quote: "You miss 100% of the shots you don't take.",
  },
  {
    author: 'Nelson Mandela',
    quote:
      'Resentment is like drinking poison and waiting for your enemies to die.',
  },
  {
    author: 'Elbert Hubbard',
    quote: 'Do not take life too seriously. You will not get out alive.',
  },
];

function displayQuote(randomQuote) {
  const { author, quote } = randomQuote;
  quoteOutput.innerText = quote;
  authorOutput.innerText = author;
}

const newRandomQuote = (arr) => arr[Math.floor(Math.random() * arr.length)];

function handleClick() {
  const randomQuote = newRandomQuote(arrayOfQuotes);

  randomQuote ? displayQuote(randomQuote) : console.log('Something went wrong');
}

quoteBtn.addEventListener('click', () => {
  handleClick();
});
