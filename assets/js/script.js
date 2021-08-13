var taskIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');  //main element
var formEl = document.querySelector("#task-form") //form element
var tasksToDoEl = document.querySelector("#tasks-to-do"); // <ul> holding the created lists
var tasksInProgressEl = document.querySelector("#tasks-in-progress"); // task in progress list
var tasksCompletedEl = document.querySelector("#tasks-completed");  //task completed list
var tasks = []

// Form 
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
//-------------------
  var isEdit = formEl.hasAttribute("data-task-id");
// gather inputs in a object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
    status: "to do"
  }
// send object to createTaskEl function
// has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    // WAS ORIGINALLY UN COMMENTED OUT
            // var taskDataObj = {
            //   name: taskNameInput,
            //   type: taskTypeInput,
            //   status: "to do"
            // };
  createTaskEl(taskDataObj);
}
};

// new task 
var createTaskEl = function(taskDataObj) {
// create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
// add ID to the list item
  listItemEl.setAttribute("data-task-id", taskIdCounter);
// create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = `<h3 class='task-name'>${taskDataObj.name}<h3><span class='task-type'>${taskDataObj.type}</span>`;
//append task info to the list
  listItemEl.appendChild(taskInfoEl);
 // run id on function
  var taskActionEl = createTaskActions(taskIdCounter);
//append action btn to the list as well
  listItemEl.appendChild(taskActionEl);
//append list to ul
  tasksToDoEl.appendChild(listItemEl);
// Id for task
  taskDataObj.id = taskIdCounter
// add id to the tasks obj 
  tasks.push(taskDataObj)
//save task
  saveTasks()
// add 1 to taskCounterId
  taskIdCounter++;

}

// task options (delete, edit & status) 
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

// Id for tasks 
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
  var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
// get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
// change Add task to "save edits"
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Edit";
  formEl.setAttribute("data-task-id", taskId);
}
// Delete btn 
var deleteTask = function(taskId) {
  var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
  taskSelected.remove();

// loop through current tasks   --------------
    var updatedTaskArr = [];  // 
  for (let i = 0; i < tasks.length; i++) {
    // if tasks[i].id != taskId, push it into the new "updatedTaskArr" array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
    //reassign tasks array to the array we added the ones we don't want deleted "updatedTaskArr"
  }
  tasks = updatedTaskArr;   // ---------------
  //save
  saveTasks()
}

// Edit function (after Editing)
var completeEditTask = function(taskName, taskType, taskId) {
  var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
  // new values 
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType
// adding obj to "tasks" array  
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
};
//save 
  alert(`Task updated!`);
  saveTasks()

// remove id from html form  
  formEl.removeAttribute("data-task-id");
//  change Save Edits to Add task
  document.querySelector("#save-task").textContent = "Add Task";
};

// Status changer (List Type changer)
var taskStatusChangeHandler = function(event) {
  var taskId = event.target.getAttribute("data-task-id");
  var statusValue = event.target.value.toLowerCase();
  var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
// update task's status in tasks array
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
// save
  saveTasks()
};

//  For saving Task array into local storage
  var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

// Submitting the form 
  formEl.addEventListener("submit", taskFormHandler);
// Action buttons 
  pageContentEl.addEventListener("click", taskButtonHandler);
// Changing tasks 
  pageContentEl.addEventListener("change", taskStatusChangeHandler);
