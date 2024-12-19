export let tasks = [];

export const saveTasks = (mockStorage) => {
    mockStorage.setItem("tasks", JSON.stringify(tasks));
};

export const loadTasks = (mockStorage) => {
    tasks = JSON.parse(mockStorage.getItem("tasks")) || [];
};

export const addTask = (text) => {
    if (!text.trim()) throw new Error("Task cannot be empty!");
    tasks.push({ text, completed: false });
};

export const editTask = (index, newText) => {
    if (!newText.trim()) throw new Error("Edited task cannot be empty!");
    tasks[index].text = newText;
};

export const deleteTask = (index) => {
    tasks.splice(index, 1);
};

export const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
};
