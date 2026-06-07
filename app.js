// Todo App - Vibe Coding 第一个项目
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const countSpan = document.getElementById("count");
const clearBtn = document.getElementById("clear-btn");
const MAX_TODO_LENGTH = 200;

function loadTodos() {
  try {
    const raw = localStorage.getItem("todos");
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => ({
        text: typeof item.text === "string" ? item.text : "",
        completed: Boolean(item.completed),
      }))
      .filter((item) => item.text.trim().length > 0);
  } catch (error) {
    console.warn("加载待办数据失败，已重置：", error);
    return [];
  }
}

let todos = loadTodos();

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function isValidIndex(index) {
  return Number.isInteger(index) && index >= 0 && index < todos.length;
}

function render() {
  if (!list) return;
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.dataset.index = String(index);
    span.textContent = todo.text;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete-btn";
    button.dataset.index = String(index);
    button.textContent = "×";

    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
  });
  updateCount();
}

function updateCount() {
  if (!countSpan) return;
  const active = todos.filter((t) => !t.completed).length;
  countSpan.textContent = `${active} 项待办`;
}

function addTodo() {
  if (!input) return;
  const text = input.value.trim().slice(0, MAX_TODO_LENGTH);
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = "";
  save();
  render();
}

function toggleTodo(index) {
  if (!isValidIndex(index)) return;
  todos[index].completed = !todos[index].completed;
  save();
  render();
}

function deleteTodo(index) {
  if (!isValidIndex(index)) return;
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
if (addBtn) addBtn.addEventListener("click", addTodo);
if (input) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
  });
}

if (list) {
  list.addEventListener("click", (e) => {
    const target = e.target;
    const index = Number.parseInt(target.dataset.index, 10);
    if (!isValidIndex(index)) return;
    if (target.tagName === "SPAN") {
      toggleTodo(index);
    } else if (target.classList.contains("delete-btn")) {
      deleteTodo(index);
    }
  });
}

if (clearBtn) clearBtn.addEventListener("click", clearCompleted);

// 初始渲染
render();