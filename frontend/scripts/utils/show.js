// export function showlogged(){
//     const authLink = document.querySelectorAll(".js-auth-link");
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     const username = localStorage.getItem("username");

//     if (isLoggedIn === "true" && username) {
//     authLink.forEach((auth)=>{
//         auth.textContent = `Hi, ${username}`;
//          auth.href = "#"; 
//     })
//     // or "dashboard.html"
//     }
// //     authLink.addEventListener("click", () => {
// //   localStorage.removeItem("isLoggedIn");
// //   localStorage.removeItem("username");
// //   window.location.href = "login.html";
// // });
// }

export function  showlogged() {
  const username = localStorage.getItem("username");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const authLinks = document.querySelectorAll(".js-auth-link");

  authLinks.forEach((authLink) => {
    if (isLoggedIn === "true" && username) {
      authLink.textContent = `Logout (${username})`;
      authLink.classList.add("logout");
      authLink.href = "#";

      // prevent duplicate listeners
      authLink.addEventListener("click", (e) => {
        e.preventDefault();

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");

        window.location.reload();
      }, { once: true }); // important
    } 
    else {
      authLink.textContent = "Sign up";
      authLink.classList.remove("logout");
      authLink.href = "signup.html";
    }
  });
}

