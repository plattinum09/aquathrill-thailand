document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('sticky', window.scrollY > 80);
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            nav.classList.toggle('nav-open');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            // Lock body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                nav.classList.remove('nav-open');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Active Nav Link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    // 6. Scroll Animations (fade-up)
    const fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        fadeEls.forEach(el => observer.observe(el));
    }

    // 7. Countdown Timer (Promotions page)
    function updateCountdown() {
        const target = new Date('2026-03-31T23:59:59').getTime();
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) return;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('countdown-days');
        const hoursEl = document.getElementById('countdown-hours');
        const minsEl = document.getElementById('countdown-mins');
        const secsEl = document.getElementById('countdown-secs');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    if (document.getElementById('countdown-days')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 8. Contact Form (simple validation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
                return;
            }

            alert('ขอบคุณสำหรับข้อความ! เราจะติดต่อกลับโดยเร็วที่สุดครับ');
            contactForm.reset();
        });
    }

});