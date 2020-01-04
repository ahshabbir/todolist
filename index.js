// For document listeners:
window.onload = function() {
	var taskBox = document.getElementById("new-task-box");
	
	// Add task and clear textbox on enter press:
	taskBox.addEventListener('keypress', function(e) {
		if (e.keyCode == 13) {
			addTask();
			this.value = "";
		}
	}, false);

	// Clear textbox on enter:
	taskBox.addEventListener('click', e => { this.value = ""; }, false);

	// Add the MarkDoneListener to existing tasks:
	var todolist = document.getElementById("unfinished-list");
	for (var i = 0; i < todolist.childElementCount; i++) {
		todolist.children[i].addEventListener('click', markDoneHandler, false);
	}

	// Add the MarkUnDoneListener to existing finished tasks:
	var finishedList = document.getElementById("finished-list");
	for (var i = 0; i < finishedList.childElementCount; i++) {
		finishedList.children[i].addEventListener('click', markUnDoneHandler, false);
	}
}

function markDoneHandler(e) {
	document.getElementById('unfinished-list').removeChild(this);
	document.getElementById('finished-list').appendChild(this);
	
	// Swap the listeners to enable undoing the task:
	this.removeEventListener('click', markDoneHandler, false);
	this.addEventListener('click', markUnDoneHandler, false);
}

function markUnDoneHandler(e) {
	document.getElementById('finished-list').removeChild(this);
	// Newer tasks are considered higher priority, thus they should be prepended.
	document.getElementById('unfinished-list').prepend(this);

	// Swap the listeners to enable doing the task:
	this.removeEventListener('click', markUnDoneHandler, false);
	this.addEventListener('click', markDoneHandler, false);
}

function addTask() {
	var taskName = document.getElementById("new-task-box").value;
	if (taskName === "") {
		alert("Please enter a task name!");
		return;
	}
	var todolist = document.getElementById("unfinished-list");

	var newTask = document.createElement("li");
	newTask.innerText = taskName;
	newTask.addEventListener('click', markDoneHandler, false);

	// Newer tasks are considered higher priority, thus they should be prepended.
	todolist.prepend(newTask);
}

function clearFinished() {
	document.getElementById("finished-list").innerHTML = "";
}