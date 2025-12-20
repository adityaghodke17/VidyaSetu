function login() {
  const name = document.getElementById('name').value.trim();
  const enrollment = document.getElementById('enrollment').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const photo = localStorage.getItem('profilePhoto');

  if (!name || !enrollment || !email || !phone) {
    alert('All fields are compulsory!');
    return;
  }
  if (!email.endsWith('@gmail.com')) {
    alert('Email must end with @gmail.com');
    return;
  }
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    alert('Phone must be a valid 10-digit Indian number starting with 6-9');
    return;
  }
  if (!photo) {
    alert('Please upload your profile photo!');
    return;
  }

  localStorage.setItem('studentName', name);
  localStorage.setItem('studentEnrollment', enrollment);
  localStorage.setItem('studentEmail', email);
  localStorage.setItem('studentPhone', phone);

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

  const photo = localStorage.getItem('profilePhoto');
  if(photo){
    document.getElementById('profile-photo').src = photo;
  } else {
    alert('Please upload your profile photo!');
  }
}

// Add Subject
function addSubject() {
  const name = document.getElementById('subject-name').value.trim();
  const start = document.getElementById('subject-start').value;
  const due = document.getElementById('subject-due').value;
  const teacher = document.getElementById('subject-teacher').value.trim();

  if(!name || !start || !due || !teacher){
    alert('Please fill all subject fields!');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `<strong>${name}</strong><br>Start: ${start} | Due: ${due} | Teacher: ${teacher} <button onclick="deleteSubject(this)">Delete</button>`;
  document.getElementById('subjects-list').appendChild(li);

  document.getElementById('subject-name').value = '';
  document.getElementById('subject-start').value = '';
  document.getElementById('subject-due').value = '';
  document.getElementById('subject-teacher').value = '';
}

function deleteSubject(button) {
  button.parentElement.remove();
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
