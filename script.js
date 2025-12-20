// Elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const addSubjectBtn = document.getElementById('add-subject-btn');
const photoUpload = document.getElementById('photo-upload');

loginBtn.addEventListener('click', login);
logoutBtn.addEventListener('click', logout);
addSubjectBtn.addEventListener('click', addSubject);
photoUpload.addEventListener('change', uploadPhoto);

function login() {
  const name = document.getElementById('name').value;
  const enrollment = document.getElementById('enrollment').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if(name && enrollment && email && phone) {
    localStorage.setItem('studentName', name);
    localStorage.setItem('studentEnrollment', enrollment);
    localStorage.setItem('studentEmail', email);
    localStorage.setItem('studentPhone', phone);

    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';

    loadDashboard();
  } else {
    alert('Please fill all fields!');
  }
}

function loadDashboard() {
  document.getElementById('student-name').innerText = `Welcome, ${localStorage.getItem('studentName')}`;
  document.getElementById('card-name').innerText = localStorage.getItem('studentName');
  document.getElementById('card-enrollment').innerText = localStorage.getItem('studentEnrollment');
  document.getElementById('card-email').innerText = localStorage.getItem('studentEmail');
  document.getElementById('card-phone').innerText = localStorage.getItem('studentPhone');

  if(localStorage.getItem('profilePhoto')) {
    document.getElementById('profile-photo').src = localStorage.getItem('profilePhoto');
  }
}

function addSubject() {
  const select = document.getElementById('subject-select');
  const subject = select.value;
  if(subject) {
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
  reader.onload = function(){
    const dataURL = reader.result;
    document.getElementById('profile-photo').src = dataURL;
    localStorage.setItem('profilePhoto', dataURL);
  };
  reader.readAsDataURL(event.target.files[0]);
}

function logout() {
  localStorage.clear();
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('login-section').style.display = 'flex';
}

window.onload = function() {
  if(localStorage.getItem('studentName')) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    loadDashboard();
  }
}
