// Photo preview
const photoInput = document.getElementById("photoInput");
if (photoInput) {
  photoInput.addEventListener("change", e => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.getElementById("photoPreview");
      img.src = reader.result;
      img.style.display = "block";
      localStorage.setItem("photo", reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  });
}

// Login
function login() {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!email.endsWith("@gmail.com")) return alert("Use Gmail only");
  if (!/^[6-9]\d{9}$/.test(phone)) return alert("Invalid phone");

  ["name","enroll","email","phone"].forEach(id =>
    localStorage.setItem(id, document.getElementById(id).value)
  );

  if (!localStorage.getItem("photo")) return alert("Upload photo");

  localStorage.setItem("loggedIn", "true");
  location.href = "dashboard.html";
}

// Dashboard load
if (location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("loggedIn")) location.href = "index.html";

  document.getElementById("welcome").innerText =
    "Welcome, " + localStorage.getItem("name");

  ["Name","Enroll","Email","Phone"].forEach(k =>
    document.getElementById("card"+k).innerText =
      localStorage.getItem(k.toLowerCase())
  );

  document.getElementById("cardPhoto").src = localStorage.getItem("photo");
}

// Subjects
function addSubject() {
  const li = document.createElement("li");
  li.textContent = document.getElementById("subName").value;
  document.getElementById("subjectList").appendChild(li);
}

// Logout
function logout() {
  localStorage.clear();
  location.href = "index.html";
}
