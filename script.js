// Loader
window.onload = () => {
  const loader = document.getElementById("loader");
  if (loader) setTimeout(() => loader.remove(), 800);
};

// Photo upload
function triggerPhoto() {
  document.getElementById("photo-input").click();
}

document.getElementById("photo-input")?.addEventListener("change", e => {
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("photo-preview").src = reader.result;
    localStorage.setItem("photo", reader.result);
  };
  reader.readAsDataURL(e.target.files[0]);
});

// Login
function login() {
  const name = name.value.trim();
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!email.endsWith("@gmail.com")) return alert("Use Gmail only");
  if (!/^[6-9]\d{9}$/.test(phone)) return alert("Invalid Indian number");
  if (!localStorage.getItem("photo")) return alert("Upload photo");

  localStorage.setItem("name", name);
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

  card-name.innerText = localStorage.getItem("name");
  card-email.innerText = localStorage.getItem("email");
  card-phone.innerText = localStorage.getItem("phone");
  card-photo.src = localStorage.getItem("photo");
}

// Subjects
function addSubject() {
  const li = document.createElement("li");
  li.textContent = `${sub-name.value} | ${sub-teacher.value}`;
  subjectList.appendChild(li);
}

// Logout
function logout() {
  localStorage.clear();
  location.href = "index.html";
}
