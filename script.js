document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const bars = document.querySelectorAll('.bar');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Very simple animation state toggle
        mobileMenuBtn.classList.toggle('open');

        if (mobileMenuBtn.classList.contains('open')) {
            bars[0].style.transform = 'translateY(8px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Schedule Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const scheduleContents = document.querySelectorAll('.schedule-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all contents
            scheduleContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            // Show target content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                // Small timeout to allow display:block to apply before opacity transition if we added one
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 10);
            }
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.section-title, .committee-card, .pricing-card, .sg-content-grid, .benefit-item, .team-member, .hero-content');

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in-up');
        // Add staggered delay for cards
        if (el.classList.contains('committee-card') || el.classList.contains('benefit-item')) {
            el.style.transitionDelay = `${index * 0.1}s`;
        }
        observer.observe(el);
    });

    // Navbar Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

});
