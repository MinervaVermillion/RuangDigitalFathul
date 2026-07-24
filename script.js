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

const certSlider = document.getElementById('cert-slider');
const certPrevBtn = document.getElementById('cert-prev');
const certNextBtn = document.getElementById('cert-next');

if (certSlider && certPrevBtn && certNextBtn) {
    const originalCards = Array.from(certSlider.children);

    if (originalCards.length > 0) {
        // Duplicate the set before and after so scrolling feels endless.
        const cloneSetBefore = originalCards.map(card => card.cloneNode(true));
        const cloneSetAfter = originalCards.map(card => card.cloneNode(true));
        const beforeFragment = document.createDocumentFragment();
        cloneSetBefore.forEach(clone => beforeFragment.appendChild(clone));
        certSlider.insertBefore(beforeFragment, certSlider.firstChild);
        cloneSetAfter.forEach(clone => certSlider.appendChild(clone));

        let setWidth = 0;
        let cardStep = 0;
        let isCorrecting = false;
        let correctionTimeout = null;

        function measure() {
            setWidth = certSlider.scrollWidth / 3;
            const card = certSlider.querySelector('.cert-card');
            if (card) {
                const style = window.getComputedStyle(certSlider);
                const gap = parseFloat(style.columnGap || style.gap || 20);
                cardStep = card.offsetWidth + gap;
            }
        }

        function jumpTo(position) {
            const behavior = certSlider.style.scrollBehavior;
            certSlider.style.scrollBehavior = 'auto';
            certSlider.scrollLeft = position;
            certSlider.style.scrollBehavior = behavior;
        }

        function centerOnMiddleSet() {
            measure();
            jumpTo(setWidth + (certSlider.scrollLeft % setWidth || 0));
        }

        function correctLoopPosition() {
            if (setWidth === 0) return;
            if (certSlider.scrollLeft < setWidth * 0.5) {
                isCorrecting = true;
                jumpTo(certSlider.scrollLeft + setWidth);
                isCorrecting = false;
            } else if (certSlider.scrollLeft > setWidth * 1.5) {
                isCorrecting = true;
                jumpTo(certSlider.scrollLeft - setWidth);
                isCorrecting = false;
            }
        }

        certPrevBtn.addEventListener('click', function() {
            certSlider.scrollBy({ left: -cardStep, behavior: 'smooth' });
        });

        certNextBtn.addEventListener('click', function() {
            certSlider.scrollBy({ left: cardStep, behavior: 'smooth' });
        });

        const certTrack = document.getElementById('cert-slider-track');
        const certThumb = document.getElementById('cert-slider-thumb');

        function updateThumb() {
            if (!certTrack || !certThumb || setWidth === 0) return;
            const trackWidth = certTrack.clientWidth;
            const visibleRatio = Math.min(certSlider.clientWidth / setWidth, 1);
            const thumbWidth = Math.max(visibleRatio * trackWidth, 24);
            const positionInSet = ((certSlider.scrollLeft % setWidth) + setWidth) % setWidth;
            const scrollRatio = positionInSet / setWidth;
            const maxThumbLeft = trackWidth - thumbWidth;

            certThumb.style.width = thumbWidth + 'px';
            certThumb.style.transform = `translateX(${scrollRatio * maxThumbLeft}px)`;
        }

        certSlider.addEventListener('scroll', function() {
            updateThumb();
            if (isCorrecting) return;
            clearTimeout(correctionTimeout);
            correctionTimeout = setTimeout(correctLoopPosition, 120);
        });

        window.addEventListener('load', updateThumb);

        window.addEventListener('resize', function() {
            const ratio = setWidth ? (certSlider.scrollLeft - setWidth) / cardStep : 0;
            measure();
            jumpTo(setWidth + ratio * cardStep);
        });

        centerOnMiddleSet();
        window.addEventListener('load', centerOnMiddleSet);
    }
}

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-section') && window.innerWidth <= 680) {
                setTimeout(() => {
                    entry.target.classList.remove('hidden');
                    entry.target.classList.add('visible');
                }, 1200); 
            } else {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px"
});

const hiddenElements = document.querySelectorAll('.about-section.hidden, .skills-section.hidden, .projects-section.hidden, .contact-section.hidden, .page-header.hidden, .featured-section.hidden, .other-projects.hidden, .contact-page-section.hidden, .certificates-section.hidden, .credentials-page-section.hidden');
hiddenElements.forEach(function(el) {
    observer.observe(el);
});