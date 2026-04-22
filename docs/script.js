// URL dinâmica: usa variável de ambiente em produção, localhost em desenvolvimento
const API_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:3000/tasks"
  : "https://task-manager-fullstack-3181.onrender.com/tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

fetchTasks();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  input.value = "";
  fetchTasks();
});

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.done ? "done" : "";

    li.innerHTML = `
      <span>${task.title}</span>
      <div class="actions">
        <button onclick="toggleDone(${task.id}, ${!task.done})">
          ${task.done ? "Undo" : "Done"}
        </button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

async function toggleDone(id, done) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done })
  });
  fetchTasks();
}
