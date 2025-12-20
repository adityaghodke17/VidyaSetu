function login() {
  const name = document.getElementById('name').value.trim();
  const enrollment = document.getElementById('enrollment').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  // Check all fields
  if (!name || !enrollment || !email || !phone) {
    alert('All fields are compulsory!');
    return;
  }

  // Email validation (@gmail.com)
  if (!email.endsWith('@gmail.com')) {
    alert('Email must end with @gmail.com');
    return;
  }

  // Phone validation (10-digit Indian number)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    alert('Phone must be a valid 10-digit Indian number starting with 6-9');
    return;
  }

  // Save to localStorage
  localStorage.setItem('studentName', name);
  localStorage.setItem('studentEnrollment', enrollment);
  localStorage.setItem('studentEmail', email);
  localStorage.setItem('studentPhone', phone);

  // Redirect to dashboard
  window.location.href = "dashboard.html";
}

function loadDashboard() {
  if (!localStorage.getItem('studentName')) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById('student-name').innerText = `Welcome, ${localStorage.getItem('studentName')}`;
  document.getElementById('card-name').innerText = localStorage.getItem('studentName');
  document.getElementById('card-enrollment').innerText = localStorage.getItem('studentEnrollment');
  document.getElementById('card-email').innerText = localStorage.getItem('studentEmail');
  document.getElementById('card-phone').innerText = localStorage.getItem('studentPhone');

  if (localStorage.getItem('profilePhoto')) {
    document.getElementById('profile-photo').src = localStorage.getItem('profilePhoto');
  }
}

function addSubject() {
  const select = document.getElementById('subject-select');
  const subject = select.value;
  if (subject) {
    const li = document.createElement('li');
    li.innerHTML = `${subject} <button onclick="deleteSubject(this)">Delete</button>`;
    document.getElementById('subjects-list').appendChild(li);
  }
}

function deleteSubject(button) {
  button.parentElement.remove();
}

function uploadPhoto(event) {
  const reader = new FileReader();
  reader.onload = function() {
    const dataURL = reader.result;
    document.getElementById('profile-photo').src = dataURL;
    localStorage.setItem('profilePhoto', dataURL);
  };
  reader.readAsDataURL(event.target.files[0]);
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
