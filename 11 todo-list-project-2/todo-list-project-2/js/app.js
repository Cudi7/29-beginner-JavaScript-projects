class Todo {
  constructor(form) {
    this.form = form;
    this.todoItems = this.getTodo() || [];
    this.displayTodo();
  }

  displayTodo() {
    const todoList = document.querySelector('.item-list');

    if (this.todo) {
      this.todoItems.push({
        todo: this.todo,
        marked: false,
      });
    }

    this.todo = '';
    todoList.innerHTML = '';

    this.todoItems.forEach((todo) => {
      todoList.innerHTML += `
        <div class="item my-3">
          <h5 class="item-name text-capitalize ${
            todo.marked ? 'completed' : ''
          }">${todo.todo}</h5>
          <div class="item-icons">
            <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
            <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
            <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
          </div>
       </div> `;
    });

    this.setTodo();
  }

  handleSubmit() {
    this.todo = this.form.querySelector('.form-control').value;
    this.form.querySelector('.form-control').value = '';
    this.displayTodo();
  }

  clearAll() {
    this.todoItems = [];
    this.displayTodo();
  }

  handleModification(element, action) {
    element = element.querySelector('.item-name');

    if (action.classList.contains('complete-item')) {
      element.classList.toggle('completed');

      this.todoItems.forEach((todo) => {
        if (todo.todo.toLowerCase() === element.innerText.toLowerCase()) {
          todo.marked = todo.marked = !todo.marked;
        }
      });

      this.setTodo();
    } else if (action.classList.contains('edit-item')) {
      // to edit
      this.form.querySelector('.form-control').value = element.innerText;
      element.parentNode.remove();
      this.todoItems = this.todoItems.filter(
        (todo) => todo.todo !== element.parentNode.innerText.trim()
      );
    } else {
      const removedItem = element.parentNode;
      removedItem.remove();

      this.todoItems = this.todoItems.filter(
        (todo) => todo.todo !== removedItem.innerText.trim()
      );

      this.setTodo();
    }
  }

  getTodo() {
    return JSON.parse(localStorage.getItem('todoItems'));
  }

  setTodo() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }
}

const form = document.querySelector('#itemForm');
const deleteAll = document.querySelector('#clear-list');

const todo = new Todo(form);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  todo.handleSubmit();
});

deleteAll.addEventListener('click', () => {
  todo.clearAll();
});

window.addEventListener('click', (e) => {
  if (e.target.parentNode.parentNode.parentNode.classList.contains('item')) {
    const element = e.target.parentNode.parentNode.parentNode;
    const action = e.target.parentNode;
    todo.handleModification(element, action);
  }
});

//or instead of windows.addEventListener
//it could have been easier selecting just the item-list class
// with querySelector and avoid all the parentNode mesiness
