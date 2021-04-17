btnLeft = document.querySelector('.btn-left');
btnRight = document.querySelector('.btn-right');
let imageIndex = 0;

function handleImage(direction) {
  const imgContainer = document.querySelector('.img-container');

  direction === 'left' ? (imageIndex -= 1) : (imageIndex += 1);
  if (imageIndex < 0) imageIndex = 4;
  if (imageIndex > 4) imageIndex = 0;

  imgContainer.style.backgroundImage = `url('../img/contBcg-${imageIndex}.jpeg')`;
}

function handleClick(e) {
  const el = e.target.classList;
  console.log(el);
  el.contains('btn-left') || el.contains('fa-caret-left')
    ? handleImage('left')
    : handleImage('right');
}

btnLeft.addEventListener('click', handleClick);
btnRight.addEventListener('click', handleClick);
