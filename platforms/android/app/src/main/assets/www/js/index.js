

renderTodoList();

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        document.addEventListener('pause', app.onPause);
        document.addEventListener('resume', app.onResume);
        app.receivedEvent('deviceready');

        // this.receivedEvent('deviceready');
    },

    onPause: function () {
        console.log("Device on pause");
      },
      onResume: function () {
        // console.log("Device on resume");
        alert("Welcome back!");
      },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

document.getElementById('addTask').addEventListener('click', function () {
    var value = document.getElementById('inputTaskName').value;
    if (value) {
      addTask(value);
    }
  });
  
  document.getElementById('inputTaskName').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
      addTask(value);
    }
  });
  
  function addTask(value) {
    addTaskToList(value);
    document.getElementById('inputTaskName').value = '';
  
    data.todo.push(value);
    //dataObjectUpdated();
  };


  // Adding a new Task to the list
function addTaskToList(text, completed) {
    var list = document.getElementById('todo');
  
    var inputTaskName = document.createElement('li');
    inputTaskName.innerText = text;
  
    var buttons = document.createElement('div');
    buttons.classList.addTask('buttons');
  
    var remove = document.createElement('button');
    remove.classList.addTask('remove');
    remove.innerHTML = removeSVG;

    list.insertBefore(inputTaskName, list.childNodes[0]);
}

function renderTodoList() {
   
  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addTaskToList(value);
  }
  }