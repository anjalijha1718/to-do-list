// script.js

const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todo list from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodoToDOM(todo);
    });
});

addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const todo = { text: todoText, completed: false };
        addTodoToDOM(todo);
        saveTodoToLocal(todo);
        todoInput.value = '';
    }
});

todoList.addEventListener('click', (e) => {
    const target = e.target;
    const parentLi = target.closest('li');
    if (target.classList.contains('delete-btn')) {
        parentLi.remove();
        removeTodoFromLocal(parentLi);
    } else if (target.classList.contains('complete-btn')) {
        parentLi.classList.toggle('completed');
        updateTodoInLocal(parentLi);
    }
});

function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${todo.text}</span>
        <div>
            <button class="complete-btn">${todo.completed ? 'Incomplete' : 'Complete'}</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    if (todo.completed) {
        li.classList.add('completed');
    }
    todoList.appendChild(li);
}

function saveTodoToLocal(todo) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodoFromLocal(todoElement) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoText = todoElement.querySelector('span').textContent;
    const updatedTodos = todos.filter(todo => todo.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

function updateTodoInLocal(todoElement) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoText = todoElement.querySelector('span').textContent;
    const updatedTodos = todos.map(todo => {
        if (todo.text === todoText) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}
