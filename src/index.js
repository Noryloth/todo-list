// Import files
import "./style.css";


// DOM
const addTaskBtn = document.querySelector('.add-task');
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
if (tasks.innerHTML === '') {
    const noTasksMessage = document.createElement('p');
    noTasksMessage.className = 'no-tasks-message';

    noTasksMessage.innerHTML = `There are no tasks here yet... Click "Add task" button to create a new task!`

    tasks.appendChild(noTasksMessage);
}


// Display tasks in the right container
function displayTasks(myTasks) {
    tasks.innerHTML = '';

    for (let i = 0; i < myTasks.length; i++) {
        const task = myTasks[i];
        const taskItem = document.createElement('div');
        taskItem.className = "task-item";

        taskItem.innerHTML = `
            <p class="title">${task.title}</p>
            <p class="description">${task.description}</p>
            <p class="date">${task.date}</p>
        `

        tasks.appendChild(taskItem);
    }
}


// Add new task button
addTaskBtn.addEventListener("click", () => {
    dialog.showModal();
})

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