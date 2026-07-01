function updateThemeIcon(isDark) {
    const icon = themeBtn.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon', 'fa-regular');
        icon.classList.add('fa-sun', 'fa-solid');
    } else {
        icon.classList.remove('fa-sun', 'fa-solid');
        icon.classList.add('fa-moon', 'fa-regular');
    }
}

const themeBtn = document.getElementById('theme-btn');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    updateThemeIcon(true);
} else {
    updateThemeIcon(false);
}

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    if (isDark) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    updateThemeIcon(isDark);
});

const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.querySelector('nav ul');

burgerBtn.addEventListener('click', function() {
    navMenu.classList.toggle('open');
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll("nav ul a");

navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
            entry.target.classList.add('hidden');
        }
    });
}, { 
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px"
});

const hiddenElements = document.querySelectorAll('.about-section.hidden');
hiddenElements.forEach(function(el) {
    observer.observe(el);
});