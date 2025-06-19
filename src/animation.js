const navHeader = document.querySelector(".nav-header");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY > 150) {
        navHeader.classList.add("nav-hidden");
    } else {
        navHeader.classList.remove("nav-hidden");
    }
});
