// Loader
window.onload = () => {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
};

// Photo upload
function uploadPhoto() {
  document.getElementById("photoInput").click();
}

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

  if (!email.endsWith("@gmail.com")) return alert("Use Gmail only");
  if (!/^[6-9]\d{9}$/.test(phone)) return alert("Invalid phone");
  if (!localStorage.getItem("photo")) return alert("Upload photo");

  localStorage.setItem("name", name);
  localStorage.setItem("enroll", enroll);
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
  localStorage.setItem("loggedIn", "true");

  location.href = "dashboard.html";
}

// Dashboard load
if (location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("loggedIn")) location.href = "index.html";

  document.getElementById("welcomeText").innerText =
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

  const li = document.createElement("li");
  li.textContent = `${name} (${teacher})`;
  document.getElementById("subjectList").appendChild(li);
}

// Logout
function logout() {
  localStorage.clear();
  location.href = "index.html";
}
