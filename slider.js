//slider imagens
const slides = document.querySelectorAll (".slides")
var i = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    slides[i].classList.remove("active")
    if( i == 2) {
        i = -1
    }
    slides[++i].classList.add("active")
}
setInterval(showSlides, 4000); 

//abrir sidebar
const sidebar = document.querySelector(".navbar>nav")
const hamburger = document.querySelector(".hamburger")
const sidebar_close = document.querySelector(".close-sidebar")

hamburger.onclick =function () {
    sidebar.style.display = "flex"
}
sidebar_close.onclick = function() {
    sidebar.style.display = "none";
  }
