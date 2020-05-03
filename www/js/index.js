
// delete and task complete(check icon)  in SVG format
var deleteIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var doneIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

//getting task/item from todoList in storage and passing to data variable.
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: []
};

const date = new Date();

//rendering  list at first window
renderTodoList();
currentDate();

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', app.onDeviceReady);


  },
  onDeviceReady: function () {
    document.addEventListener('pause', app.onPause);
    document.addEventListener('resume', app.onResume);
    app.receivedEvent('deviceready');



  },
  onPause: function () {
    console.log("Device paused");
  },
  onResume: function () {
    // console.log("Device is resumed");
    alert("Welcome back!");
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {

  },



};

app.initialize();



//getting data from input field 
document.getElementById('addButton').addEventListener('click', function () {
  var value = document.getElementById('inputData').value;
  if (value) {
    addTask(value);
  }
});

//keyboard enter event
document.getElementById('inputData').addEventListener("keyup",function (event) {
  var value = this.value;
  if ((event.keyCode === 13)&& value) {
    addTask(value);
  }
});

//function to add data ,callingfunction to add data to list and updating storage
function addTask(value) {
  addTaskToList(value);
  document.getElementById('inputData').value = '';

  data.todo.push(value);
  updateTask();
};

// rendering list on device loading
function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addTaskToList(value);
  }

  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addTaskToList(value, true);
  }
}

//updating list on storage
function updateTask() {
  localStorage.setItem('todoList', JSON.stringify(data));
}
 
//function to delete task
function deleteItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  updateTask();

  parent.removeChild(item);
}

//function for doneTask and pushing data to todo or completed particular list 
function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;
//using splice to add/remove and return the data from array
  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  updateTask();

  // Checking to see if task should be added to the completed list or to re-added to the todo list
  var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adding a new task to the list
function addTaskToList(text, completed) {
  var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

  //declaring vaiable item to pass task in the list
  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var deleteTask = document.createElement('button');
  deleteTask.classList.add('remove');
  deleteTask.innerHTML = deleteIcon;

  // onclick event for deleting the task
  deleteTask.addEventListener('click', deleteItem);

  var taskDone = document.createElement('button');
  taskDone.classList.add('complete');
  taskDone.innerHTML = doneIcon;

  // onclick event for completing the task 
  taskDone.addEventListener('click', completeItem);

  //appending delete and done button to the parent buttons
  buttons.appendChild(deleteTask);
  buttons.appendChild(taskDone);
  //appending buttons to parent item
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]);
}

//function to get today's date
function currentDate() {
  getDay();
  getMonth();
  const getDate = date.getDate();

  const headerContainer = document.querySelector('.currentDate');
  const headerDate = `
          ${getDay() + ' ' + getMonth() + ' ' + getDate}
          `;
  headerContainer.textContent = headerDate;
}
function getDay() {
  switch (date.getDay()) {

    case 0:
      return "SUNDAY"
      break;
    case 1:
      return "MONDAY"
      break;
    case 2:
      return "TUESDAY"
      break;
    case 3:
      return "WEDNESDAY"
      break;
    case 4:
      return "THURSDAY"
      break;
    case 5:
      return "FRIDAY"
      break;
    case 6:
      return "SATURDAY"
      break;

    default:
      break;
  }
}
function getMonth() {
  switch (date.getMonth()) {

    case 0:
      return "January"
      break;
    case 1:
      return "February"
      break;
    case 2:
      return "March"
      break;
    case 3:
      return "April"
      break;
    case 4:
      return "May"
      break;
    case 5:
      return "June"
      break;
    case 6:
      return "July"
      break;
    case 7:
      return "August"
      break;
    case 8:
      return "September"
      break;
    case 9:
      return "October"
      break;
    case 10:
      return "November"
      break;
    case 11:
      return "December"
      break;

    default:
      break;
  }
}



              