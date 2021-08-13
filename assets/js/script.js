var taskIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');  //main element
var formEl = document.querySelector("#task-form") //form element
var tasksToDoEl = document.querySelector("#tasks-to-do"); // <ul> holding the created lists

var taskFormHandler = function(event) {
      event.preventDefault();
      var taskNameInput = document.querySelector("input[name='task-name']").value;  // task title input
      var taskTypeInput = document.querySelector("select[name='task-type']").value; // task type input
// if inputs are empty alert them
      if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
      }
// reset the form 
      formEl.reset()
// gather inputs in a object
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };
// send object to createTaskEl function
      createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
// create list item
      var listItemEl = document.createElement("li");
      listItemEl.className = "task-item";
// add ID to the list item
      listItemEl.setAttribute("data-task-id", taskIdCounter);
// create div to hold task info and add to list item
      var taskInfoEl = document.createElement("div");
      taskInfoEl.className = "task-info";
      taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

      //append task info to the list
      listItemEl.appendChild(taskInfoEl);

      var taskActionEl = createTaskActions(taskIdCounter); // run id on function
      //append action btn to the list as well
      listItemEl.appendChild(taskActionEl);
      //append list to ul
      tasksToDoEl.appendChild(listItemEl);
// add 1 to taskCounterId
      taskIdCounter++;
}

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions"; 

// Edit btn
  var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

// Delete btn
  var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

// Status btn
  var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);
        // create select options
  var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
      // create option element
      var statusOptionEl = document.createElement("option");
      statusOptionEl.textContent = statusChoices[i];
      statusOptionEl.setAttribute("value", statusChoices[i]);
    
      // append to select
      statusSelectEl.appendChild(statusOptionEl);
    }
  
  return actionContainerEl;
}

formEl.addEventListener("submit", taskFormHandler);

  var taskButtonHandler = function(event) {
    var targetEl = event.target;
    // Edit btn
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // Delete btn
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };

  // Edit Btn 
var editTask = function(taskId) {
// get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
// get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
}
// Delete btn 
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
  taskSelected.remove();
}

pageContentEl.addEventListener("click", taskButtonHandler);
