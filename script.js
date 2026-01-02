const faces = document.querySelectorAll(".face");

/* EYES FOLLOW CURSOR */
document.addEventListener("mousemove", e => {
  document.querySelectorAll(".eye").forEach(eye => {
    const r = eye.getBoundingClientRect();
    eye.style.transform =
      `translate(${(e.clientX-r.left-4)/25}px,${(e.clientY-r.top-4)/25}px)`;
  });
});

/* PASSWORD REACTION */
document.getElementById("password")?.addEventListener("input", e => {
  faces.forEach(f=>f.classList.remove("suspicious"));
  if(e.target.value.length>0 && e.target.value.length<6)
    faces.forEach(f=>f.classList.add("suspicious"));
});

/* LOGIN */
function login(){
  const u=studentName.value.trim();
  const p=password.value.trim();
  const msg=document.getElementById("msg");

  faces.forEach(f=>f.classList.remove("shake","success"));

  if(!u || p.length<6){
    faces.forEach(f=>{
      f.classList.add("shake");
      setTimeout(()=>f.classList.remove("shake"),400);
    });
    msg.innerText="Nahh 😒 try again";
    msg.style.color="red";
    return;
  }

  faces.forEach(f=>f.classList.add("success"));
  msg.innerText="Welcome 😎";
  msg.style.color="green";

  localStorage.setItem("user",u);
  setTimeout(()=>location.href="dashboard.html",900);
}

/* DASHBOARD */
if(document.getElementById("welcome")){
  const u=localStorage.getItem("user");
  if(!u) location.href="login.html";
  welcome.innerText=`Welcome back, ${u} 👋`;
  name.innerText=u;
}

/* TASKS */
let tasks=JSON.parse(localStorage.getItem("tasks")||"[]");

function addTask(){
  if(!taskInput.value) return;
  tasks.push({t:taskInput.value,d:false});
  taskInput.value="";
  save();
}

function save(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
  render();
}

function render(){
  taskList.innerHTML="";
  tasks.forEach(t=>{
    const li=document.createElement("li");
    li.innerText=t.t;
    if(t.d) li.classList.add("done");
    li.onclick=()=>{t.d=!t.d;save()};
    taskList.appendChild(li);
  });
}
render();

function logout(){
  localStorage.clear();
  location.href="login.html";
}
