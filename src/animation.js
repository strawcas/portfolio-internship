const navHeader = document.querySelector(".nav-header");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 150) {
        navHeader.classList.add("nav-hidden");
    } else {
        navHeader.classList.remove("nav-hidden");
    }
});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});
