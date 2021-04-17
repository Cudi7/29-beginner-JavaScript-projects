class GroceryList {
  constructor(itemsInput, groceryList) {
    this.itemsInput = itemsInput;
    this.groceryList = groceryList;
    this.itemsData = this.getGroceryItems() || [];
    this.addItems();
  }

  addItems() {
    if (this.newInput) {
      this.itemsData.push(this.newInput);
      this.setGroceryItems();
      this.newInput = '';
    }

    const newInputElement = document.createElement('div');
    this.groceryList.innerHTML = '';
    this.groceryList.prepend(newInputElement);

    this.itemsData.forEach((input) => {
      newInputElement.innerHTML += `
          <div class="grocery-item">
            <h4 class="grocery-item__title">${input}</h4>
            <a href="#" class="grocery-item__link">
                <i class="far fa-trash-alt"></i>
            </a>
          </div>`;
    });
  }

  clearOne(e) {
    if (e.target.parentElement.classList.contains('grocery-item__link')) {
      const deleteOne = e.target.parentElement.parentElement.querySelector(
        '.grocery-item__title'
      );

      this.itemsData = this.itemsData.filter(
        (item) => item !== deleteOne.innerText
      );
      e.target.parentElement.parentElement.remove();
      this.setGroceryItems();
    }
  }

  clearAll() {
    const itemsToDelete = [
      ...this.groceryList.querySelectorAll('.grocery-item'),
    ];
    itemsToDelete.forEach((item) => {
      item.remove();
    });
    localStorage.removeItem('groceryItems');
  }

  handleSubmit() {
    document.querySelector('.addItems-input').value = '';
    this.addItems();
  }

  handleInput(e) {
    this.newInput = e.target.value;
  }

  getGroceryItems() {
    return JSON.parse(localStorage.getItem('groceryItems'));
  }
  setGroceryItems() {
    localStorage.setItem('groceryItems', JSON.stringify(this.itemsData));
  }
}

const itemsInput = document.querySelector('.addItems-input');
const itemsBtn = document.querySelector('#items-submit');

const groceryList = document.querySelector('.grocery-list');
const clearAll = document.querySelector('.displayItems-clear');

const grocery = new GroceryList(itemsInput, groceryList);

itemsInput.addEventListener('keyup', (e) => {
  grocery.handleInput(e);
});

itemsBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  grocery.handleSubmit();
});

clearAll.addEventListener('click', () => {
  grocery.clearAll();
});

groceryList.addEventListener('click', (e) => {
  grocery.clearOne(e);
});
