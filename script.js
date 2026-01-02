let tasks = [];

/* LOGIN */
function login() {
    const name = studentName.value.trim();
    const email = studentEmail.value.trim();
    const phone = studentPhone.value.trim();
    const code = countryCode.value;

    if (!name || !email || !phone) {
        alert("Please fill all fields");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Enter a valid email");
        return;
    }

    if (code === "+91" && phone.length !== 10) {
        alert("Indian number must be 10 digits");
        return;
    }

    localStorage.setItem("student", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", code + " " + phone);

    window.location.href = "dashboard.html";
}

/* DASHBOARD */
function loadProfile() {
    if (!localStorage.getItem("student")) {
        window.location.href = "login.html";
        return;
    }

    profileName.innerText = "Welcome, " + localStorage.getItem("student");
    idName.innerText = localStorage.getItem("student");
    idEmail.innerText = localStorage.getItem("email");
    idPhone.innerText = localStorage.getItem("phone");

    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

/* TASKS */
function addTask() {
    if (taskInput.value === "") return;

    tasks.push({ text: taskInput.value, done: false });
    taskInput.value = "";
    saveTasks();
}

function renderTasks() {
    taskList.innerHTML = "";
    let done = 0;

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerText = task.text;

        if (task.done) {
            li.classList.add("done");
            done++;
        }

        li.onclick = () => {
            task.done = !task.done;
            saveTasks();
        };

        taskList.appendChild(li);
    });

    totalTasks.innerText = tasks.length;
    doneTasks.innerText = done;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

if (document.getElementById("appBox")) {
    loadProfile();
}
