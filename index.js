window.onload = function() {
	var days = getDays();

	// window.curDay represents the state of the application. At start this is the
	// first item in the left menu i.e. Monday.
	window.curDay = days[0];
	window.curDay.weekDayMenuItem.setAttribute("class", "li-active");
	window.curDay.listContainer.style.display = "initial";

	addHandlers(days);
	addFormHandlers(
		document.getElementById("new-task-box"),
		document.getElementById("add-btn"),
		document.getElementById("clr-btn")
	);
};

function getDays() {
	var dayList = document.getElementById("day-list").children; // left menu
	
	// All the divs containing both the unfinished and finished lists/
	var listContainers = document.getElementById("col-2").children;
	
	var days = [];
	for (var i = 0; i < dayList.length; i++) {
		days.push({
			weekDayMenuItem: dayList[i],
			listContainer: listContainers[i]
		});
	}
	return days;
}

function addHandlers(days) {
	for (let day of days) {
		var handler = function(e) {
			window.curDay.weekDayMenuItem.setAttribute("class", "");
			window.curDay.listContainer.style.display = "none";

			this.setAttribute("class", "li-active");
			day.listContainer.style.display = "initial";
			window.curDay = day;
		}
		day.weekDayMenuItem.addEventListener("click", handler, false);

		let unfin = day.listContainer.children[0];
		let fin = day.listContainer.children[1];
		day.markDoneHandler = function(e) {
			unfin.removeChild(this);
			fin.appendChild(this);
			this.removeEventListener("click", day.markDoneHandler);
			this.addEventListener("click", day.markUnDoneHandler);
		};
		day.markUnDoneHandler = function(e) {
			fin.removeChild(this);
			unfin.appendChild(this);
			this.removeEventListener("click", day.markUnDoneHandler);
			this.addEventListener("click", day.markDoneHandler);
		};
		for (var i = 0; i < unfin.childElementCount; i++) {
			unfin.children[i].addEventListener("click", day.markDoneHandler, false);
		}
		for (var i = 0; i < fin.childElementCount; i++) {
			fin.children[i].addEventListener("click", day.markUnDoneHandler, false);
		}
	}
}

function addFormHandlers(taskBox, addBtn, clrBtn) {
	var addTaskHandler = function (e) {
		var taskName = taskBox.value;
		if (taskName === "") {
			alert("Please enter a task name!");
			return;
		}

		var newTask = document.createElement("li");
		newTask.innerText = taskName;
		newTask.addEventListener("click", window.curDay.markDoneHandler, false);
		window.curDay.listContainer.children[0].appendChild(newTask);
		taskBox.value = "";
	};

	// Add task and clear textbox on enter press:
	taskBox.addEventListener("keypress", function(e) {
		if (e.keyCode == 13)
			addTaskHandler(e);
	}, false);
	
	addBtn.addEventListener("click", function(e) {
		addTaskHandler(e);
	}, false);

	clrBtn.addEventListener("click", function(e){
		window.curDay.listContainer.children[1].innerHTML = "";
	})

	// Clear textbox on click:
	taskBox.addEventListener("click", function(e) { this.value = ""; }, false);
}