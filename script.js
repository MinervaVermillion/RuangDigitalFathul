const btn = document.getElementById('theme-btn');

btn.addEventListener('click', function() {
    document.body.classList.toggle('dark');

    const icon = btn.querySelector('i');
    if (document.body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.querySelector('ul');

burgerBtn.addEventListener('click', function() {
    navMenu.classList.toggle('open');
});