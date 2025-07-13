// Import files
import "./style.css";


// DOM
const addTaskBtn = document.querySelector('.add-task');
const addTaskBtn2 = document.querySelector('.add-task-second')
const closeBtn = document.querySelector('.close-button');
const submitBtn = document.querySelector('.submit-button');
const dialog = document.getElementById('dialog');
const tasks = document.querySelector('.task-list');


// Tasks array
const myTasks = [];


// Tasks class
class Task {
    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.id = crypto.randomUUID();
    }
}


// Display a message if there are no tasks
function displayNoTasksMessage() {
    if (tasks.innerHTML === '') {
        const noTasksMessage = document.createElement('p');
        noTasksMessage.className = 'no-tasks-message';

        noTasksMessage.innerHTML = `There are no tasks here yet... Click "Add task" button to create a new task!`

        tasks.appendChild(noTasksMessage);
    }
}



// Display tasks in the right container
function displayTasks(myTasks) {
    tasks.innerHTML = '';

    for (let i = 0; i < myTasks.length; i++) {
        const task = myTasks[i];
        const taskItem = document.createElement('div');
        const taskText = document.createElement('div');
        const taskRadio = document.createElement('div');
        const taskInfo = document.createElement('div');
        const removeBtn = document.createElement('div');
        taskItem.className = "task-item";
        taskText.className = "task-text";
        taskRadio.className = "task-radio";
        taskInfo.className = "task-info";
        removeBtn.className = "remove-task"

        taskRadio.innerHTML = `
            <input type="radio" id="${task.id}" name="task-radio" onchange="completeTask(${i})">
        `

        taskText.innerHTML = `
            
            <p class="title">${task.title}</p>
            <p class="description">${task.description}</p>
            <p class="date">${task.date}</p>
        `

        removeBtn.innerHTML = `
            <button class="remove-task-button" onclick="removeTask(${i})">Remove task</button>
        `

        taskInfo.appendChild(taskRadio);
        taskInfo.appendChild(taskText);
        taskItem.appendChild(taskInfo);
        taskItem.appendChild(removeBtn);
        tasks.appendChild(taskItem);
    }
}


// Add new task button
function handleButtonClick() {
    dialog.showModal();
}

addTaskBtn.addEventListener("click", handleButtonClick);
addTaskBtn2.addEventListener("click", handleButtonClick);


// Close form button
closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
})

// Submit form button
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.getElementById('task-name').value;
    const description = document.getElementById('task-description').value;
    const date = document.getElementById('task-date').value;

    const newTask = new Task(title, description, date);

    if (title === '' || date === '') {
        alert('Please, type name and date for a task.');
    } else {
        addTaskToArray(newTask);
        dialog.close();
        clearForm();
    }
})


// Add task to an array
function addTaskToArray(newTask) {
    myTasks.push(newTask);
    displayTasks(myTasks);
}


// Clear form
function clearForm() {
    document.getElementById('task-name').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-date').value = '';
}


// Remove task
globalThis.removeTask = removeTask;

function removeTask(i) {
    myTasks.splice(i, 1);
    displayTasks(myTasks);
    displayNoTasksMessage();
}


// Complete task
globalThis.completeTask = completeTask;

function completeTask(i) {
    myTasks.splice(i, 1);
    displayTasks(myTasks);
    alert("Task is completed!");
    displayNoTasksMessage();
}

displayNoTasksMessage();