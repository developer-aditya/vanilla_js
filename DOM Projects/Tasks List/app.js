// Targetted Query.......................
const form = document.querySelector('#task-form');
const list = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearAll = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');




// Loading All Event Listners.............

loadEventListeners();

function loadEventListeners() {

   // Loading From Local Storage
   document.addEventListener('DOMContentLoaded', getTasks);

   // New Task Event
   form.addEventListener('submit', newTask);

   //delete task
   list.addEventListener('click', deleteTask);

   // clear all Tasks
   clearAll.addEventListener('click', clearAllTasks);

   // filter Tasks
   filter.addEventListener('keyup', filterTasks);
}




// Utility Functions..................

// Getting Tasks At Startup
function getTasks() {
   let tasks;
   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   }
   else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(element => {
      const listItem = document.createElement('li');
      listItem.className = 'collection-item';

      const text = document.createTextNode(element);
      listItem.appendChild(text);

      const deleteLink = document.createElement('a');
      deleteLink.href = '#';

      deleteLink.className = 'delete-item secondary-content';
      deleteLink.innerHTML = '<i class="fas fa-trash"></i>';
      listItem.appendChild(deleteLink);

      list.appendChild(listItem);
   });
}


// Adding To Local Storage 
function addToLocalStorage(newTask) {
   let tasks;
   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   }
   else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.push(newTask);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Deleting from Local Storage
function removeFromLocalStorage(item) {
   let tasks;
   if (localStorage.getItem('tasks') === null) {
      tasks = [];
   }
   else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.forEach(function (element, index) {
      if (element.toLowerCase() === item.toLowerCase()) {
         tasks.splice(index, 1);
      }
   });
   localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clearing All From Local Storage
function removeAllFromLocalStorage() {
   localStorage.clear();
}





// Event Handling functions................

// 1. New Task
function newTask(e) {
   if (task.value === '') {
      alert('Add New Task');
   }
   else {

      const listItem = document.createElement('li');
      listItem.className = 'collection-item';

      const text = document.createTextNode(taskInput.value);
      listItem.appendChild(text);

      const deleteLink = document.createElement('a');
      deleteLink.href = '#';

      deleteLink.className = 'delete-item secondary-content';
      deleteLink.innerHTML = '<i class="fas fa-trash"></i>';
      listItem.appendChild(deleteLink);

      list.appendChild(listItem);

      addToLocalStorage(taskInput.value);
      taskInput.value = '';

   }

   e.preventDefault();
}


// 2. Delete Task
function deleteTask(e) {
   const i = e.target;
   if (i.parentElement.classList.contains('delete-item')) {
      removeFromLocalStorage(i.parentElement.parentElement.textContent);
      i.parentElement.parentElement.remove();
   }
}


// 3. Clear All Tasks
function clearAllTasks(e) {
   // list.innerHTML = '';

   if (confirm('You Are About To Remove All Your Tasks')) {
      // faster
      while (list.firstChild) {
         list.removeChild(list.firstChild);
      }
      removeAllFromLocalStorage();
   }
}


// 4. Filter Tasks
function filterTasks(e) {
   const filterText = e.target.value.toLowerCase();
   const listAll = list.querySelectorAll('.collection-item')

   listAll.forEach(element => {
      const listTextValue = element.firstChild.textContent.toLowerCase();
      if (listTextValue.indexOf(filterText) != -1) {
         element.style.display = 'block';
      }
      else {
         element.style.display = 'none';
      }
   });
}