let tasks = [];

function login() {
    let name = studentName.value;
    let enroll = studentEnroll.value;
    let email = studentEmail.value;
    let phone = studentPhone.value;

    if (!name || !enroll || !email || !phone) {
        alert("Please fill all details");
        return;
    }

    localStorage.setItem("student", name);
    localStorage.setItem("enroll", enroll);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);

    loginBox.classList.add("hidden");
    appBox.classList.remove("hidden");

    loadProfile();
}

function loadProfile() {
    profileName.innerText = "Welcome, " + localStorage.getItem("student");

    idName.innerText = localStorage.getItem("student");
    idEnroll.innerText = localStorage.getItem("enroll");
    idEmail.innerText = localStorage.getItem("email");
    idPhone.innerText = localStorage.getItem("phone");

    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
}

function logout() {
    localStorage.clear();
    location.reload();
}

function addTask() {
    if (taskInput.value === "") return;

    tasks.push({
        text: taskInput.value,
        done: false
    });

    taskInput.value = "";
    saveTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    let doneCount = 0;

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task.text;
        if (task.done) {
            li.classList.add("done");
            doneCount++;
        }

        li.onclick = () => {
            task.done = !task.done;
            saveTasks();
        };

        taskList.appendChild(li);
    });

    totalTasks.innerText = tasks.length;
    doneTasks.innerText = doneCount;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

if (localStorage.getItem("student")) {
    loginBox.classList.add("hidden");
    appBox.classList.remove("hidden");
    loadProfile();
}
