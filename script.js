document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

    const renderTasks = () => {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = task.completed ? "completed" : "";
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="editTask(${index})">✏️</button>
                    <button onclick="deleteTask(${index})">❌</button>
                    <button onclick="toggleComplete(${index})">${task.completed ? "🔄" : "✔️"}</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    // Add Task
    addBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return alert("Task cannot be empty!");
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    });

    // Edit Task
    window.editTask = (index) => {
        const newText = prompt("Edit Task:", tasks[index].text);
        if (newText) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
        }
    };

    // Delete Task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Toggle Complete
    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    // Initial Render
    renderTasks();
});
