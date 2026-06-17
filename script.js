const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');

burgerBtn.addEventListener('click', function() {
    navMenu.classList.toggle('open');
    burgerBtn.classList.toggle('active');
});

document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    if (!navbar.contains(event.target)) {
        navMenu.classList.remove('open');
        burgerBtn.classList.remove('active');
    }
    }
);