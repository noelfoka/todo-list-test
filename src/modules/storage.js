class Todo {
  constructor(description) {
    this.description = description;
  }

  static clearInput = () => {
    const inputField = document.querySelector('#activity');
    inputField.value = '';
    return true;
  }

  static getTodo = () => {
    let todoList = [];
    const data = localStorage.getItem('todo');
    if (data === null) {
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
    todoList = JSON.parse(localStorage.getItem('todo'));
    return todoList;
  }

  static getIndex = () => {
    const todoList = Todo.getTodo();
    let index = 0;
    if (todoList === null) {
      return index + 1;
    }
    index = todoList.length + 1;
    return index;
  }

  addTodo = () => {
    const data = Todo.getTodo();
    const index = Todo.getIndex();
    const todo = {
      index,
      description: this.description,
      completed: false,
    };

    if (data === null) {
      data.push(todo);
      localStorage.setItem('todo', JSON.stringify(data));
    }
    let newtodoList = JSON.parse(localStorage.getItem('todo'));
    newtodoList = [...data, todo];
    localStorage.setItem('todo', JSON.stringify(newtodoList));
    Todo.clearInput();
    Todo.display();
    Todo.updateIndex();
  }

  static updateIndex = () => {
    const todoList = Todo.getTodo();
    todoList.forEach((item) => {
      const indx = todoList.findIndex((obj) => obj === item);
      item.index = indx + 1;
    });
    localStorage.setItem('todo', JSON.stringify(todoList));
  }

  static display() {
    const todoList = Todo.getTodo();
    const list = document.querySelector('.list');
    let str = '';
    todoList.forEach((todo) => {
      str += `<li class="list-item">
            <div class="form-group">
            <input type="checkbox" id="${todo.index}" value="${todo.description}" class="checkbox">
            <textarea class="textarea">${todo.description}</textarea>
          </div>
          <div class="action-icons">
              <i class="fa fa-trash-can delete" id="delete"></i>
          </div>
          </li>`;
    });
    list.innerHTML = str;
    Todo.addEventListenersToListItems();
    Todo.updateIndex();
    Todo.checkedTask();
  }

  static removeTodo = (index) => {
    const todoList = Todo.getTodo();
    todoList.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(todoList));
    Todo.addEventListenersToListItems();
    Todo.display();
    Todo.updateIndex();
  }

  static updateTodo = (index, value) => {
    const todoList = Todo.getTodo();
    todoList.forEach((item) => {
      const indx = todoList.findIndex((obj) => obj === item);
      if (index === indx) {
        item.description = value;
      }
      localStorage.setItem('todo', JSON.stringify(todoList));
    });
    Todo.updateIndex();
  }

  static completed = (index, value) => {
    const todoList = Todo.getTodo();
    todoList[index - 1].completed = value;
    localStorage.setItem('todo', JSON.stringify(todoList));
    Todo.updateIndex();
  }

  static clearCompleted = () => {
    const todoList = Todo.getTodo();
    const uncompleted = todoList.filter((todo) => todo.completed === false);
    localStorage.setItem('todo', JSON.stringify(uncompleted));
    Todo.display();
  }

  static checkedTask = () => {
    const todoList = Todo.getTodo();
    todoList.forEach((item) => {
      if (item.completed === true) {
        document.querySelector(`#\\3${item.index}`).checked = true;
        document.querySelector(`#\\3${item.index}`).nextElementSibling.classList.toggle('line-through');
      }
    });
  }

  static reset = () => {
    window.location.reload();
  }

  static addEventListenersToListItems = () => {
    document.querySelectorAll('.checkbox').forEach((link) => {
      link.addEventListener('click', (e) => {
        link.nextElementSibling.classList.toggle('line-through');
        Todo.completed(link.id, e.target.checked);
      });
    });
    document.querySelectorAll('.textarea').forEach((link, index) => {
      link.addEventListener('keyup', (e) => {
        e.preventDefault();
        Todo.updateTodo(index, e.target.value);
      });
    });
    document.querySelectorAll('.delete').forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        Todo.removeTodo(index);
      });
    });
  };
}
module.exports = Todo;