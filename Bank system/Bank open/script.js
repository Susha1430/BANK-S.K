/* =========================
S.K BANK LOADING ANIMATION
========================= */

let text = "S.K BANK SUSHANTA";
let index = 0;

function typingEffect() {
  
  let el = document.getElementById("typing");
  
  if (!el) return;
  
  if (index < text.length) {
    
    el.innerHTML += text.charAt(index);
    index++;
    
    setTimeout(typingEffect, 120);
    
  }
  
}

typingEffect();



/* =========================
REGISTRATION SYSTEM
========================= */

function register() {
  
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let dob = document.getElementById("dob").value;
  let gender = document.getElementById("gender").value;
  let mobile = document.getElementById("mobile").value;
  
  if (!fname || !lname || !mobile) {
    
    alert("Please fill all fields");
    return;
    
  }
  
  let users = JSON.parse(localStorage.getItem("skbank")) || [];
  
  /* MOBILE ALREADY REGISTER CHECK */
  
  let exist = users.find(u => u.mobile === mobile);
  
  if (exist) {
    
    alert("Mobile number already registered");
    return;
    
  }
  
  /* GENERATE ACCOUNT NUMBER */
  
  let account = Math.floor(1000000000 + Math.random() * 9000000000);
  
  /* GENERATE CUSTOMER ID */
  
  let customer = Math.floor(100000 + Math.random() * 900000);
  
  let newUser = {
    
    fname: fname,
    lname: lname,
    dob: dob,
    gender: gender,
    mobile: mobile,
    account: account,
    customer: customer,
    approved: false,
    date: new Date().toISOString()
    
  };
  
  users.push(newUser);
  
  localStorage.setItem("skbank", JSON.stringify(users));
  
  alert("Registration Successful");
  
  location.href = "index.html";
  
}



/* =========================
LOGIN SYSTEM
========================= */

function login() {
  
  let mobile = document.getElementById("loginMobile").value;
  
  let users = JSON.parse(localStorage.getItem("skbank")) || [];
  
  let user = users.find(u => u.mobile === mobile);
  
  if (!user) {
    
    alert("Account not found");
    return;
    
  }
  
  if (user.approved === false) {
    
    alert("Account waiting for admin approval");
    return;
    
  }
  
  /* SAVE LOGIN USER */
  
  localStorage.setItem("loginUser", JSON.stringify(user));
  
  window.location = "dashboard.html";
  
}



/* =========================
ADMIN PANEL LOAD USERS
========================= */

if (document.getElementById("userTable")) {
  
  loadUsers();
  
}

function loadUsers() {
  
  let users = JSON.parse(localStorage.getItem("skbank")) || [];
  
  let table = document.getElementById("userTable");
  
  users.forEach((u, i) => {
    
    let status = u.approved ? "Approved" : "Pending";
    
    let button = u.approved ?
      "Approved" :
      `<button onclick="approveUser(${i})">Approve</button>`;
    
    let row = `

<tr>
<td>${u.fname} ${u.lname}</td>
<td>${u.mobile}</td>
<td>${status}</td>
<td>${button}</td>
</tr>

`;
    
    table.innerHTML += row;
    
  });
  
}



/* =========================
ADMIN APPROVE USER
========================= */

function approveUser(index) {
  
  let users = JSON.parse(localStorage.getItem("skbank")) || [];
  
  users[index].approved = true;
  
  users[index].approvedAt = new Date().toLocaleString();
  
  localStorage.setItem("skbank", JSON.stringify(users));
  
  alert("Account Approved Successfully");
  
  location.reload();
  
}



/* =========================
SEARCH SYSTEM
========================= */

function searchUser() {
  
  let mobile = document.getElementById("searchMobile").value;
  
  let users = JSON.parse(localStorage.getItem("skbank")) || [];
  
  let user = users.find(u => u.mobile === mobile);
  
  if (!user) {
    
    document.getElementById("searchResult").innerHTML = "User Not Found";
    return;
    
  }
  
  document.getElementById("searchResult").innerHTML =
    
    `
<h3>Account Details</h3>

Account Number : ${user.account} <br>
Customer ID : ${user.customer}

`;
  
}



/* =========================
DASHBOARD USER INFO
========================= */

if (document.getElementById("userInfo")) {
  
  let user = JSON.parse(localStorage.getItem("loginUser"));
  
  if (user) {
    
    document.getElementById("userInfo").innerHTML =
      
      `
<h3>Welcome ${user.fname}</h3>

Account Number : ${user.account} <br>
Customer ID : ${user.customer}

`;
    
  }
  
}



/* =========================
PIE CHART SYSTEM
========================= */

if (document.getElementById("chart")) {
  
  let users = JSON.parse(localStorage.getItem("skbank")) || [];
  
  let approved = users.filter(u => u.approved).length;
  
  let pending = users.length - approved;
  
  let ctx = document.getElementById("chart");
  
  new Chart(ctx, {
    
    type: 'pie',
    
    data: {
      labels: ["Approved Accounts", "Pending Accounts"],
      datasets: [{
        
        data: [approved, pending]
        
      }]
      
    }
    
  });
  
}