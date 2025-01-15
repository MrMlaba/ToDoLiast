const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


renderTasks();

addTaskButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = { text: taskText, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    
    const taskText = document.createElement("span");
    taskText.textContent = task.text;

  
    const completeButton = document.createElement("button");
    completeButton.className = "complete-button";
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.addEventListener("click", () => toggleTaskCompletion(index));

   
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeTask(index));

    li.appendChild(taskText);
    li.appendChild(completeButton);
    li.appendChild(removeButton);

    taskList.appendChild(li);
  });
}
