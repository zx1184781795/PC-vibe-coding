// Todo App - Vibe Coding 第一个项目
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const countSpan = document.getElementById("count");
const clearBtn = document.getElementById("clear-btn");

// 从 localStorage 读取已有数据
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <span data-index="${index}">${escapeHtml(todo.text)}</span>
      <button class="delete-btn" data-index="${index}">×</button>
    `;
    list.appendChild(li);
  });
  updateCount();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function updateCount() {
  const active = todos.filter((t) => !t.completed).length;
  countSpan.textContent = `${active} 项待办`;
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = "";
  save();
  render();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  save();
  render();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  save();
  render();
}

function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  save();
  render();
}

// 事件监听
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

list.addEventListener("click", (e) => {
  const index = parseInt(e.target.dataset.index);
  if (isNaN(index)) return;
  if (e.target.tagName === "SPAN") toggleTodo(index);
  if (e.target.classList.contains("delete-btn")) deleteTodo(index);
});

clearBtn.addEventListener("click", clearCompleted);

// 初始渲染
render();