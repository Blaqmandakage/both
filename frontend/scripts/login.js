import { showlogged } from "./utils/show.js";
import { backDrop } from "./utils/backdrop.js";
import { darkmode } from "./utils/darkmode.js";

backDrop();
darkmode();

document.querySelector(".login-form").addEventListener("submit", async(e)=>{
e.preventDefault();
const username = document.querySelector(".js-input").value;
const password = document.querySelector(".js-password").value;


const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
     localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("token", data.token);
    alert("Login successful");
    window.location.href = "/index.html";
  } else {
    alert(data.message);
  }

    showlogged();

});
