var formEl = document.querySelector("#task-form") //form element
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = (event) => {
  event.preventDefault(event)

  // getting values 
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value; 

  // list 
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // div 
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  // add HTML content to page  
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  listItemEl.appendChild(taskInfoEl);

  // append elements 
  tasksToDoEl.appendChild(listItemEl);
  console.dir(listItemEl)
};

formEl.addEventListener("submit", createTaskHandler);
