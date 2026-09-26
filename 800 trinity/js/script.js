function toggleMenu(){document.getElementById("navMenu").classList.toggle("open")}
function useLocation(){if(!navigator.geolocation){alert("Location is not supported by this browser.");return}navigator.geolocation.getCurrentPosition(p=>{const d="5938 Dauramantsi Road, Zimre Park, Ruwa, Zimbabwe";open("https://www.google.com/maps/dir/?api=1&origin="+p.coords.latitude+","+p.coords.longitude+"&destination="+encodeURIComponent(d),"_blank")},()=>alert("Please allow location access and try again."))}
function saveApplication(e){e.preventDefault();const a={parent:parentName.value,phone:phone.value,child:childName.value,grade:grade.value,email:email.value,message:message.value,date:new Date().toLocaleString()};const x=JSON.parse(localStorage.getItem("trinityApplications")||"[]");x.push(a);localStorage.setItem("trinityApplications",JSON.stringify(x));formMessage.textContent="Thank you. Your information has been saved on this device. A real online version will need a secure backend to receive it.";e.target.reset()}

document.addEventListener("keydown",function(e){
  if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()==="k"){
    e.preventDefault();
    window.location.href="admin.html";
  }
});
function adminLogin(e){
  e.preventDefault();
  const user=document.getElementById("adminUser").value;
  const pass=document.getElementById("adminPass").value;
  if(user==="admin" && pass==="TrinityAdmin2026!"){
    sessionStorage.setItem("trinityAdmin","1");
    window.location.href="admin.html#dashboard";
  }else document.getElementById("adminError").textContent="Incorrect username or password.";
}
function adminGuard(){
  if(!sessionStorage.getItem("trinityAdmin")){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("loginBox").style.display="block";
  }else{
    document.getElementById("loginBox").style.display="none";
    document.getElementById("dashboard").style.display="block";
    renderAdmin();
  }
}
function logoutAdmin(){sessionStorage.removeItem("trinityAdmin");location.reload()}
function addAnnouncement(e){
  e.preventDefault();
  const a={title:document.getElementById("annTitle").value,text:document.getElementById("annText").value,date:new Date().toLocaleDateString()};
  const x=JSON.parse(localStorage.getItem("trinityAnnouncements")||"[]");x.push(a);localStorage.setItem("trinityAnnouncements",JSON.stringify(x));e.target.reset();renderAdmin();
}
function deleteAnnouncement(i){
  const x=JSON.parse(localStorage.getItem("trinityAnnouncements")||"[]");x.splice(i,1);localStorage.setItem("trinityAnnouncements",JSON.stringify(x));renderAdmin();
}
function renderAdmin(){
  const apps=JSON.parse(localStorage.getItem("trinityApplications")||"[]");
  const anns=JSON.parse(localStorage.getItem("trinityAnnouncements")||"[]");
  document.getElementById("applicationCount").textContent=apps.length;
  document.getElementById("announcementCount").textContent=anns.length;
  document.getElementById("annList").innerHTML=anns.length?anns.map((a,i)=>`<div class="admin-item"><div><b>${escapeHtml(a.title)}</b><br><small>${escapeHtml(a.text)}</small></div><button class="submit danger" onclick="deleteAnnouncement(${i})">Delete</button></div>`).join(""):"<p class='admin-note'>No announcements yet.</p>";
  document.getElementById("appList").innerHTML=apps.length?apps.map(a=>`<div class="admin-item"><div><b>${escapeHtml(a.child)}</b> — ${escapeHtml(a.grade)}<br><small>Parent: ${escapeHtml(a.parent)} | ${escapeHtml(a.phone)} | ${escapeHtml(a.date)}</small></div></div>`).join(""):"<p class='admin-note'>No enrolment submissions are stored on this browser.</p>";
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
