document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (!targetElement) return;

        smoothScrollTo(targetElement, 900); // speed in ms

    });

});

function smoothScrollTo(target, duration) {

    const start = window.pageYOffset;
    const end = target.offsetTop - 80;
    const distance = end - start;

    let startTime = null;

    function animation(currentTime) {

        if (startTime === null) startTime = currentTime;

        const timeElapsed = currentTime - startTime;

        const run = ease(timeElapsed, start, distance, duration);

        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }

    }

    function ease(t, b, c, d) {

        t /= d / 2;

        if (t < 1) return c / 2 * t * t + b;

        t--;

        return -c / 2 * (t * (t - 2) - 1) + b;

    }

    requestAnimationFrame(animation);
}
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.1
});

const animatedElements = document.querySelectorAll(
    ".section-heading, .project-card, .skill-card, .info-card, .timeline-item"
);

animatedElements.forEach(el => observer.observe(el));
// Typing Animation

const roles = [
    "Android Application Developer",
    "Web Developer",
    "Web Application Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function type() {

    const current = roles[roleIndex];

    if (!isDeleting) {

        typing.textContent = current.substring(0, charIndex++);
        
        if (charIndex > current.length) {
            isDeleting = true;
            setTimeout(type, 1500);
            return;
        }

    } else {

        typing.textContent = current.substring(0, charIndex--);

        if (charIndex < 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();
// ==========================
// Theme Switcher
// ==========================

const themeToggle = document.getElementById("theme-toggle");
const themeColors = document.getElementById("theme-colors");
const colors = document.querySelectorAll(".color");

// Open / Close color palette
themeToggle.addEventListener("click", () => {
    themeColors.classList.toggle("show");
});

// Change theme color
colors.forEach(color => {

    color.addEventListener("click", () => {

        const primary = color.dataset.primary;
        const hover = color.dataset.hover;

        document.documentElement.style.setProperty("--primary", primary);
        document.documentElement.style.setProperty("--primary-hover", hover);

        // Save selected color
        localStorage.setItem("primaryColor", primary);
        localStorage.setItem("hoverColor", hover);

        // Hide palette
        themeColors.classList.remove("show");

    });

});

// Load saved color
const savedPrimary = localStorage.getItem("primaryColor");
const savedHover = localStorage.getItem("hoverColor");

if (savedPrimary && savedHover) {

    document.documentElement.style.setProperty("--primary", savedPrimary);
    document.documentElement.style.setProperty("--primary-hover", savedHover);

}

// Close palette when clicking outside
document.addEventListener("click", (e) => {

    if (
        !themeToggle.contains(e.target) &&
        !themeColors.contains(e.target)
    ) {
        themeColors.classList.remove("show");
    }

});
