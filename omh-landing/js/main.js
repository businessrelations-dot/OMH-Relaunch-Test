/**
 * Main JavaScript file for OMH Landing Page
 * Handles scroll animations, smooth navigation, and dropdown functionality
 */

class MainController {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSmoothScroll();
        this.setupDropdownMenus();
        this.setupScrollToTop();
    }

    /**
     * Intersection Observer for scroll-triggered animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // Special handling for staggered animations
                    if (entry.target.classList.contains('stagger-children')) {
                        this.staggerChildAnimations(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll([
            '.fade-in',
            '.slide-up',
            '.slide-left',
            '.slide-right',
            '.scale-in',
            '.stagger-children'
        ].join(', '));

        animatedElements.forEach(el => observer.observe(el));
    }

    /**
     * Stagger animations for child elements
     */
    staggerChildAnimations(parent) {
        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('animate-in');
            }, index * 100);
        });
    }

    /**
     * Smooth scroll navigation
     */
    setupSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 80; // Account for fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update active nav state
                    this.updateActiveNav(targetId);
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavOnScroll();
        });
    }

    /**
     * Update active navigation item
     */
    updateActiveNav(targetId) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Update active nav based on scroll position
     */
    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.updateActiveNav(`#${sectionId}`);
            }
        });
    }

    /**
     * Dropdown menu functionality
     */
    setupDropdownMenus() {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

        dropdownTriggers.forEach(trigger => {
            const dropdown = trigger.nextElementSibling;

            if (dropdown && dropdown.classList.contains('dropdown-menu')) {
                // Toggle dropdown on click
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other dropdowns
                    this.closeAllDropdowns();

                    // Toggle current dropdown
                    dropdown.classList.toggle('show');
                    trigger.classList.toggle('active');
                });

                // Handle hover for desktop
                if (window.innerWidth > 768) {
                    trigger.addEventListener('mouseenter', () => {
                        dropdown.classList.add('show');
                        trigger.classList.add('active');
                    });

                    trigger.parentElement.addEventListener('mouseleave', () => {
                        dropdown.classList.remove('show');
                        trigger.classList.remove('active');
                    });
                }
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            this.closeAllDropdowns();
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('show');
                mobileMenuToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }
    }

    /**
     * Close all dropdown menus
     */
    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        const triggers = document.querySelectorAll('.dropdown-trigger.active');

        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
        triggers.forEach(trigger => trigger.classList.remove('active'));
    }

    /**
     * Scroll to top functionality
     */
    setupScrollToTop() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top');

        if (scrollToTopBtn) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            });

            // Scroll to top on click
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Utility functions for animations
const AnimationUtils = {
    /**
     * Add reveal animation to elements as they come into view
     */
    addRevealAnimation(selector, delay = 0) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('reveal');
            }, delay + (index * 100));
        });
    },

    /**
     * Typing animation effect
     */
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    },

    /**
     * Number counter animation
     */
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);

            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MainController();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize dropdown behavior for responsive design
    const mainController = new MainController();
});