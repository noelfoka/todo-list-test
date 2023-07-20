import { Todo } from './modules/storage.js';
import './style.css';
import './modules/fontawesome/css/all.css';

const form = document.querySelector('.form');
const inputField = document.querySelector('#activity');
const submitBtn = document.querySelector('#submit');

Todo.display();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = inputField.value;
  const todo = new Todo(description);
  todo.addTodo();
});

inputField.addEventListener('focus', (e) => {
  e.preventDefault();
  submitBtn.style.display = 'block';
});

document.querySelector('#submit').addEventListener('click', (e) => {
  e.preventDefault();
  const description = inputField.value;
  const todo = new Todo(description);
  todo.addTodo();
});

document.querySelectorAll('.clear').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    Todo.clearCompleted();
  });
});

document.querySelector('.reset').addEventListener('click', (e) => {
  e.preventDefault();
  Todo.reset();
});