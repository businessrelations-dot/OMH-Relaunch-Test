// OMH Digital Marketing Landing Page JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // Navbar scroll effect
    const navbar = document.querySelector('[data-navbar]');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add background blur when scrolling
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(1, 15, 7, 0.8)';
            navbar.style.backdropFilter = 'blur(30px)';
        } else {
            navbar.style.background = 'rgba(1, 15, 7, 0.3)';
            navbar.style.backdropFilter = 'blur(25px)';
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Services dropdown hover effect
    const dropdown = document.querySelector('.dropdown');
    let dropdownTimeout;

    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(dropdownTimeout);
            dropdown.classList.add('active');
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownTimeout = setTimeout(() => {
                dropdown.classList.remove('active');
            }, 300);
        });
    }

    // Logo carousel pause on hover
    const carouselTracks = document.querySelectorAll('.carousel-track');

    carouselTracks.forEach(track => {
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });

    // Statistics counter animation
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = element.dataset.prefix + target + element.dataset.suffix;
                clearInterval(timer);
            } else {
                element.textContent = element.dataset.prefix + Math.floor(current) + element.dataset.suffix;
            }
        }, 20);
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Counter animation for statistics
                if (entry.target.classList.contains('stat-number')) {
                    const text = entry.target.textContent;
                    const match = text.match(/(\d+[,.]?\d*)/);
                    if (match) {
                        const number = parseFloat(match[0].replace(',', ''));
                        const prefix = text.substring(0, text.indexOf(match[0]));
                        const suffix = text.substring(text.indexOf(match[0]) + match[0].length);

                        entry.target.dataset.prefix = prefix;
                        entry.target.dataset.suffix = suffix;

                        animateCounter(entry.target, number);
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.problem-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            observer.observe(el);
        }, index * 100);
    });

    document.querySelectorAll('.solution-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            observer.observe(el);
        }, index * 100);
    });

    // Play button interaction
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            // Here you would typically open a video modal or play a video
            console.log('Play video');
        });
    }

    // Parallax effect for background elements
    const bgLight1 = document.querySelector('.bg-light-1');
    const bgLight2 = document.querySelector('.bg-light-2');
    const bgStairs = document.querySelector('.bg-stairs');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        if (bgLight1) {
            bgLight1.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        if (bgLight2) {
            bgLight2.style.transform = `translateY(${scrolled * -0.2}px)`;
        }

        if (bgStairs) {
            bgStairs.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.01}deg)`;
        }
    });

    // Add fade-in animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .carousel-track:hover {
            animation-play-state: paused !important;
        }
    `;
    document.head.appendChild(style);

    // Mobile menu toggle (for future implementation)
    const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // CTA button tracking
    document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Track button clicks (for analytics)
            console.log('CTA clicked:', this.textContent);

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn-primary, .btn-secondary, .nav-cta-button {
            position: relative;
            overflow: hidden;
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Performance optimization - lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('OMH Digital Marketing site initialized');
});