let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) return alert("Enter task!");

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    input.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks;

    if (currentFilter === "pending") {
        filtered = tasks.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filtered = tasks.filter(t => t.completed);
    }

    filtered.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? "checked" : ""}
                onclick="toggleTask(${task.id})">
                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

renderTasks();
