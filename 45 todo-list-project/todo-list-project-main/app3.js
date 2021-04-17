class todoList {
  constructor(inputText) {
    this.inputText = inputText;
    this.items = JSON.parse(localStorage.getItem('items')) || [];
    this.displayItems();
  }

  deleteTodo(e) {
    const targetId = Number(
      e.target.parentElement.parentElement.classList.value
    );

    this.items = this.items.filter((item) => item.id !== targetId);
    this.setLocalStorage();
    this.displayItems();
  }

  editTodo(e) {
    const targetId = Number(
      e.target.parentElement.parentElement.classList.value
    );
    const textInput = this.items.find((item) => item.id === targetId);
    this.items = this.items.filter((item) => item.id !== targetId);
    this.setLocalStorage();
    this.displayItems();
    this.inputText.value = textInput.task;
  }

  handleButtonEvents() {
    const deleteBtn = [...document.querySelectorAll('.deleteTodo')];
    const editBtn = [...document.querySelectorAll('.editTodo')];

    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.deleteTodo(e);
      });
    });

    editBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.editTodo(e);
      });
    });
  }

  displayItems() {
    const todoItemsList = document.querySelector('.todo-items');

    todoItemsList.innerHTML = '';
    if (this.items.length) {
      this.items.forEach((item) => {
        todoItemsList.innerHTML += `
        <div class="${item.id}">${item.task}
            <span>
                <button class="deleteTodo">Delete</button>
                <button class="editTodo">Edit</button>
            </span>
        </div>
        `;
      });
      this.handleButtonEvents();
    }
  }

  randomId = () => Math.floor(Math.random() * 500);

  setLocalStorage(textInput) {
    if (textInput) {
      this.items.push({ id: this.randomId(), task: textInput });
    }

    localStorage.setItem('items', JSON.stringify(this.items));
  }

  handleAddBtn() {
    if (this.inputText.value) {
      const textInput = this.inputText.value.trim().toLowerCase();
      this.inputText.value = '';
      this.setLocalStorage(textInput);
      this.displayItems();
    }
  }
}

const todoInputText = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-item');

const newTodo = new todoList(todoInputText);

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newTodo.handleAddBtn();
});
