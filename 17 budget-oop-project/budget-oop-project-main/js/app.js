import { budgedTemplate } from './templates.js';

class budgedApp {
  constructor(budgedForm, expenseForm) {
    this.budgedForm = budgedForm;
    this.expenseForm = expenseForm;
    this.totalAmount = 0;
    this.totalBudged = 0;
    this.totalExpenses = 0;
    this.budgedAppBalance = this.getItems('balance') || {};
    this.budgedAppItems = this.getItems('items') || [];
    this.displayDataFromStorage();
  }

  randomId = () => Math.floor(Math.random() * 2000);

  displayDataFromStorage() {
    this.budgedAppBalance.budged && this.displayBudged();
    this.budgedAppBalance.expense && this.displayExpense();
  }

  deleteAll() {
    this.budgedAppBalance = {};
    this.budgedAppItems = [];

    this.setItems('balance');
    this.setItems('budgedAppItems');

    this.displayedBudged = document.querySelector(
      '#budget-amount'
    ).innerText = 0;

    this.displayedExpense = document.querySelector(
      '#expense-amount'
    ).innerText = 0;

    this.balanceAmount = document.querySelector(
      '#balance-amount'
    ).innerText = 0;

    [...document.querySelectorAll('.singleExpense')].forEach(
      (element) => (element.innerHTML = '')
    );

    this.totalAmount = 0;
    this.totalBudged = 0;
    this.totalExpenses = 0;
  }

  editOne(id, element) {
    this.deleteOne(id, element);
    const title = element.parentElement.parentElement.querySelector(
      '.expense-title'
    ).innerText;

    const value = element.parentElement.parentElement.querySelector(
      '.expense-amount'
    ).innerText;

    this.expenseForm.querySelector('#amount-input').value = value;

    this.expenseForm.querySelector('#expense-input').value = title;
  }

  deleteOne(id, element) {
    const dataId = parseInt(id);
    const value = parseInt(
      element.parentElement.parentElement.querySelector('.expense-amount')
        .innerText
    );

    this.budgedAppItems = this.budgedAppItems.filter(
      (element) => element.id !== dataId
    );

    this.setItems('budgedAppItems');

    this.budgedAppBalance.expense -= value;

    if (this.budgedAppBalance.expense === 0) {
      this.displayedExpense = document.querySelector(
        '#expense-amount'
      ).innerText = this.budgedAppBalance.expense;
    }

    this.totalExpenses = 0;

    this.displayExpense();
  }

  calculateBalance() {
    this.totalAmount =
      (this.budgedAppBalance.budged || 0) -
      (this.budgedAppBalance.expense || 0);

    this.balanceAmount = document.querySelector(
      '#balance-amount'
    ).innerText = this.totalAmount;
  }

  displayBudged() {
    this.totalBudged += this.budgedInput
      ? parseInt(this.budgedInput)
      : this.budgedAppBalance.budged;

    this.budgedAppBalance.budged = this.budgedInput
      ? this.totalBudged
      : this.budgedAppBalance.budged;

    this.setItems('balance');

    this.displayedBudged = document.querySelector(
      '#budget-amount'
    ).innerText = this.budgedInput
      ? this.totalBudged
      : this.budgedAppBalance.budged;

    this.calculateBalance();
  }

  displayExpense() {
    this.totalExpenses += this.expenseInput
      ? parseInt(this.expenseInput)
      : this.budgedAppBalance.expense;

    this.budgedAppBalance.expense = this.expenseInput
      ? this.totalExpenses
      : this.budgedAppBalance.expense;

    this.setItems('balance');

    this.displayedExpense = document.querySelector(
      '#expense-amount'
    ).innerText = this.expenseInput
      ? this.totalExpenses
      : this.budgedAppBalance.expense;

    this.displayAppItems();

    this.calculateBalance();
  }

  displayAppItems() {
    const expenseList = document.querySelector('#expense-list');

    let newExpense = document.createElement('div');
    newExpense.classList.add('expense', 'singleExpense');

    let id = this.randomId();

    //if there is new input, create new object and set it to localStorage
    if (this.expenseText && this.expenseInput) {
      this.budgedAppItems.push({
        id,
        text: this.expenseText,
        value: this.expenseInput,
      });
      this.setItems('budgedAppItems');

      this.expenseText = '';
      this.expenseInput = '';
    }

    //check for existing displayed items, if there are, delete them and render them all again (to avoid duplicates)
    if ([...document.querySelectorAll('.singleExpense')]) {
      [...document.querySelectorAll('.singleExpense')].forEach(
        (element) => (element.innerHTML = '')
      );
    }

    this.budgedAppItems.forEach((item) => {
      newExpense.innerHTML += budgedTemplate(item);
    });

    expenseList.append(newExpense);
    [...document.querySelectorAll('.delete-icon')].forEach((element) => {
      element.addEventListener('click', () => {
        this.deleteOne(element.dataset.id, element);
      });
    });
    [...document.querySelectorAll('.edit-icon')].forEach((element) => {
      element.addEventListener('click', () => {
        this.editOne(element.dataset.id, element);
      });
    });
  }

  handleBudged() {
    this.budgedInput = this.budgedForm.querySelector('#budget-input').value;
    this.budgedForm.querySelector('#budget-input').value = '';

    this.displayBudged();
  }
  handleExpense() {
    this.expenseInput = this.expenseForm.querySelector('#amount-input').value;
    this.expenseForm.querySelector('#amount-input').value = '';

    this.expenseText = this.expenseForm.querySelector('#expense-input').value;
    this.expenseForm.querySelector('#expense-input').value = '';

    this.displayExpense();
  }

  getItems(type) {
    return type === 'balance'
      ? JSON.parse(localStorage.getItem('budgedAppBalance'))
      : JSON.parse(localStorage.getItem('budgedAppItems'));
  }

  setItems(type) {
    type === 'balance'
      ? localStorage.setItem(
          'budgedAppBalance',
          JSON.stringify(this.budgedAppBalance)
        )
      : localStorage.setItem(
          'budgedAppItems',
          JSON.stringify(this.budgedAppItems)
        );
  }
}

const budgedForm = document.querySelector('#budget-form');
const expenseForm = document.querySelector('#expense-form');
const deleteAll = document.querySelector('#reset-all');

const newBudged = new budgedApp(budgedForm, expenseForm);

budgedForm.addEventListener('submit', (e) => {
  e.preventDefault();
  newBudged.handleBudged();
});
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  newBudged.handleExpense();
});
deleteAll.addEventListener('click', () => {
  newBudged.deleteAll();
});
