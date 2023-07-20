import Todo from '../modules/storage.js';

describe('Tests', () => {
  document.body.innerHTML = `<div class="container">
    <div class="title">
      <h2>Today's To Do</h2>
      <i class="fa-solid fa-rotate reset"></i>
    </div>

    <form class="form">
      <input type="text" placeholder="Add to your list" id="activity">
      <button type="submit" id="submit"><i class="fa fa-check"></i></button>
    </form>

    <ul class="list"></ul>

    <div class="footer">
      <a href="" class="clear">Clear all completed</a>
    </div>

  </div>`;

  const task = 'Eat Supper';
  const todo = new Todo(task);

  test('Add item to the list', () => {
    todo.addTodo();
    const data = JSON.parse(localStorage.getItem('todo'));
    expect(data.length).toBe(1);
  });

  test('Remove item from the list', () => {
    Todo.removeTodo(0);
    const data = JSON.parse(localStorage.getItem('todo'));
    expect(data.length).toBe(0);
  });

  test('Edit task description', () => {
    todo.addTodo();
    new Todo('task1').addTodo();
    new Todo('task2').addTodo();
    new Todo('task3').addTodo();
    const edittedTask = 'Take breakfast';
    Todo.updateTodo(1, edittedTask);
    const data = JSON.parse(localStorage.getItem('todo'));
    expect(data[1].description).toBe(edittedTask);
  });

  test('Update completed task', () => {
    Todo.completed(1, true);
    const data = JSON.parse(localStorage.getItem('todo'));
    expect(data[0].completed).toBe(true);
  });

  test('Clear completed tasks', () => {
    Todo.clearCompleted();
    const data = JSON.parse(localStorage.getItem('todo'));
    expect(data[0].completed).toBe(false);
  });
});
