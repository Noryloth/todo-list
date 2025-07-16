// Import files
import "./style.css";


// DOM
const dialog = document.getElementById('dialog');
const tasks = document.querySelector('.task-list');


// Profile name local storage
const profileName = document.getElementById('name');

profileName.addEventListener('blur', () => {
    localStorage.setItem('profile-name', profileName.innerHTML);
})

document.addEventListener('DOMContentLoaded', () => {
    const savedProfileName = localStorage.getItem('profile-name');

    if (savedProfileName) {
        profileName.innerHTML = savedProfileName;
    }
})


// Tasks array with local storage
const myTasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Tasks local storage display
if (localStorage.getItem('tasks')) {
    displayTasks(myTasks);
}


// Tasks class
class Task {
    constructor(title, description, date, category) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.category = category;
        this.id = crypto.randomUUID();
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
        const taskCategory = document.createElement('div');
        const removeBtn = document.createElement('div');
        taskItem.className = "task-item";
        taskText.className = "task-text";
        taskRadio.className = "task-radio";
        taskInfo.className = "task-info";
        taskCategory.className = "task-category";
        removeBtn.className = "remove-task"

        taskRadio.innerHTML = `
            <input type="radio" id="${task.id}" name="task-radio" onchange="completeTask(${i})">
        `

        taskText.innerHTML = `
            
            <p class="title">${task.title}</p>
            <p class="description">${task.description}</p>
            <p class="date">${task.date}</p>
        `

        taskCategory.innerHTML = `
            <p>${task.category}</p>
        `

        removeBtn.innerHTML = `
            <button class="remove-task-button" onclick="removeTask(${i})">Remove task</button>
        `

        taskInfo.appendChild(taskRadio);
        taskInfo.appendChild(taskText);
        taskItem.appendChild(taskInfo);
        taskItem.appendChild(taskCategory);
        taskItem.appendChild(removeBtn);
        tasks.appendChild(taskItem);
    }
}


// Add new task button
const addTaskBtn = document.querySelector('.add-task-div');
const addTaskBtn2 = document.querySelector('.add-task-second')

function handleButtonClick() {
    dialog.showModal();
}

addTaskBtn.addEventListener("click", handleButtonClick);
addTaskBtn2.addEventListener("click", handleButtonClick);


// Close form button
const closeBtn = document.querySelector('.close-button');

closeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
})

// Submit form button
const submitBtn = document.querySelector('.submit-button');

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.getElementById('task-name').value;
    const description = document.getElementById('task-description').value;
    const date = document.getElementById('task-date').value;
    const category = capitalizeFirstLetter(document.getElementById('task-category').value);

    const newTask = new Task(title, description, date, category);

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
    
    // Local storage
    localStorage.setItem('tasks', JSON.stringify(myTasks))
    displayTasks(myTasks);
}


// Clear form
function clearForm() {
    document.getElementById('task-name').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-category').value = '';
}


// Remove task
globalThis.removeTask = removeTask;

function removeTask(i) {
    myTasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(myTasks))

    displayTasks(myTasks);
    displayNoTasksMessage();
}


// Complete task
globalThis.completeTask = completeTask;

function completeTask(i) {
    myTasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(myTasks))

    displayTasks(myTasks);
    alert("Task is completed!");
    displayNoTasksMessage();
}


// Capitalize first letter of a task category
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


// Show items category
const categories = document.querySelectorAll('.category');

categories.forEach((category) => {
    category.addEventListener("click", (e) => {
        const category = e.target.dataset.id;
        const itemCategory = myTasks.filter(function(data){
            if(data.category === category) {
                return data;
            }
        })
        if (category === "All") {
            displayTasks(myTasks);
            displayNoTasksMessage();
        } else {
            displayTasks(itemCategory);
            displayNoSearchMessage();
        }
    })
})


// Show items that have current date (today) 
const todayOpt = document.querySelector('.today');

todayOpt.addEventListener("click", () => {
    let currentDate = new Date();
    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    let yyyy = currentDate.getFullYear();

    currentDate = yyyy + '-' + mm + '-' + dd;

    console.log(currentDate);

       let todayTasks = myTasks.filter(function(data) {
        console.log(data.date);
            if (data.date === currentDate) {
                return data;
            }
       })

       if (todayTasks) {
            displayTasks(todayTasks);
            displayNoTodayMessage();
       }
})


// Search function
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');

searchBtn.addEventListener("click", () => {
    let searchValue = searchBar.value;

    if (searchValue !== '') {
        let searchTask = myTasks.filter(function(data) {
            if (data.title.includes(searchValue)) {
                return data;
            } else if (data.category.includes(searchValue)) {
                return data;
            }
        })

        if (searchTask) {
            displayTasks(searchTask);
            displayNoSearchMessage();
        }

        searchBar.value = '';

    } else {
        alert("Please type a task's title.");
    }
})


// Display a message if there are no tasks
function displayNoTasksMessage() {
    if (tasks.innerHTML === '') {
        const noTasksMessage = document.createElement('p');
        noTasksMessage.className = 'no-tasks-message';

        noTasksMessage.innerHTML = `There are no tasks here yet... Click "Add task" button to create a new task!`

        tasks.appendChild(noTasksMessage);
    }
}


// Display a message if search found nothing
function displayNoSearchMessage() {
    if (tasks.innerHTML === '') {
        const noTasksMessage = document.createElement('p');
        noTasksMessage.className = 'no-tasks-message';

        noTasksMessage.innerHTML = `Search results: none.`

        tasks.appendChild(noTasksMessage);
    }
}


// Display a message if there are not tasks for today
function displayNoTodayMessage() {
    if (tasks.innerHTML === '') {
        const noTasksMessage = document.createElement('p');
        noTasksMessage.className = 'no-tasks-message';

        noTasksMessage.innerHTML = `No tasks for today!`

        tasks.appendChild(noTasksMessage);
    }
}


// Display no task message
displayNoTasksMessage();