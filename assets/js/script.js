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
// create div to hold task info and add to list item
      var taskInfoEl = document.createElement("div");
      taskInfoEl.className = "task-info";
      taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
      listItemEl.appendChild(taskInfoEl);
// add entire list item to list
      tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);
