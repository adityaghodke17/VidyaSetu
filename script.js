// Photo preview
const photoInput = document.getElementById("photoInput");
if (photoInput) {
  photoInput.addEventListener("change", e => {
    const reader = new FileReader();
    reader.onload = () => {
      photoPreview.src = reader.result;
      photoPreview.style.display = "block";
      localStorage.setItem("photo", reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  });
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!email.endsWith("@gmail.com")) return alert("Gmail only");
  if (!/^[6-9]\d{9}$/.test(phone)) return alert("Invalid phone");

  ["name","enroll","email","phone"].forEach(id =>
    localStorage.setItem(id, document.getElementById(id).value)
  );

  if (!localStorage.getItem("photo")) return alert("Upload photo");

  localStorage.setItem("loggedIn","true");
  location.href = "dashboard.html";
}

// Dashboard
if (location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("loggedIn")) location.href = "login.html";

  welcome.innerText = "Welcome, " + localStorage.getItem("name");
  cardName.innerText = localStorage.getItem("name");
  cardEnroll.innerText = localStorage.getItem("enroll");
  cardEmail.innerText = localStorage.getItem("email");
  cardPhone.innerText = localStorage.getItem("phone");
  cardPhoto.src = localStorage.getItem("photo");
}

// Subjects
function addSubject() {
  const li = document.createElement("li");
  li.textContent = document.getElementById("subName").value;
  subjectList.appendChild(li);
}

// Logout
function logout() {
  localStorage.clear();
  location.href = "login.html";
}
