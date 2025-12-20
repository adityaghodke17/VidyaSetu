// Photo preview
document.getElementById("photoInput")?.addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("photoPreview").src = reader.result;
    localStorage.setItem("photo", reader.result);
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Login
function login() {
  const name = document.getElementById("name").value.trim();
  const enroll = document.getElementById("enroll").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!email.endsWith("@gmail.com")) {
    alert("Email must be Gmail");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    alert("Enter valid Indian phone number");
    return;
  }

  if (!localStorage.getItem("photo")) {
    alert("Please upload photo");
    return;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("enroll", enroll);
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
  localStorage.setItem("loggedIn", "true");

  window.location.href = "dashboard.html";
}

// Dashboard load
if (location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }

  document.getElementById("welcome").innerText =
    "Welcome, " + localStorage.getItem("name");

  document.getElementById("cardName").innerText = localStorage.getItem("name");
  document.getElementById("cardEnroll").innerText = localStorage.getItem("enroll");
  document.getElementById("cardEmail").innerText = localStorage.getItem("email");
  document.getElementById("cardPhone").innerText = localStorage.getItem("phone");
  document.getElementById("cardPhoto").src = localStorage.getItem("photo");
}

// Subjects
function addSubject() {
  const name = document.getElementById("subName").value;
  const teacher = document.getElementById("subTeacher").value;

  if (!name) return;

  const li = document.createElement("li");
  li.textContent = `${name} - ${teacher}`;
  document.getElementById("subjectList").appendChild(li);
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
