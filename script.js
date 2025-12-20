function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dateInput = document.getElementById("dateInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = taskInput.value + " (Due: " + dateInput.value + ")";

    li.onclick = function () {
        li.classList.toggle("done");
    };

    taskList.appendChild(li);

    taskInput.value = "";
    dateInput.value = "";
}
