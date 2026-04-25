export function backDrop(){
    const jsToggle = document.querySelector(".js-wire-toggle");
const backDrop = document.querySelector(".backdrop");
const hideLinks = document.querySelector(".hide-backdrop");
jsToggle.addEventListener("click", () => {
  backDrop.style.display = "block";
  hideLinks.style.display = "block";
});

backDrop.addEventListener("click", () => {
  backDrop.style.display = "none";
  hideLinks.style.display = "none";
});
}