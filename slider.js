let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slides");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < slides.length; i++) {
        slides[i].className = slides[i].className.replace(" slide-in", "");
    }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].className += " slide-in";
}
const sidebar = document.querySelector(".navbar>nav")
const hamburger = document.querySelector(".hamburger")
const sidebar_close = document.querySelector(".close-sidebar")

hamburger.onclick =function () {
    sidebar.style.display = "flex"
}
sidebar_close.onclick = function() {
    sidebar.style.display = "none";
  }
