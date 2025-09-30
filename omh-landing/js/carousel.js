/**
 * Carousel JavaScript for OMH Landing Page
 * Handles infinite scroll logo carousel with auto-play and hover controls
 */

class LogoCarousel {
    constructor(selector, options = {}) {
        this.carousel = document.querySelector(selector);
        if (!this.carousel) return;

        this.options = {
            speed: options.speed || 30, // pixels per second
            direction: options.direction || 'left', // 'left' or 'right'
            pauseOnHover: options.pauseOnHover !== false,
            autoPlay: options.autoPlay !== false,
            duplicateCount: options.duplicateCount || 2
        };

        this.isPlaying = this.options.autoPlay;
        this.animationId = null;
        this.lastTimestamp = 0;
        this.currentTranslate = 0;

        this.init();
    }

    init() {
        this.setupCarousel();
        this.setupEventListeners();
        if (this.isPlaying) {
            this.start();
        }
    }

    setupCarousel() {
        const track = this.carousel.querySelector('.carousel-track');
        const items = track.querySelectorAll('.carousel-item');

        // Duplicate items for infinite scroll
        for (let i = 0; i < this.options.duplicateCount; i++) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                clone.classList.add('carousel-clone');
                track.appendChild(clone);
            });
        }

        // Calculate total width
        this.itemWidth = items[0].offsetWidth;
        this.totalItems = items.length;
        this.totalWidth = this.itemWidth * this.totalItems;
        this.trackWidth = track.scrollWidth;

        // Set initial position for right direction
        if (this.options.direction === 'right') {
            this.currentTranslate = -this.totalWidth;
            track.style.transform = `translateX(${this.currentTranslate}px)`;
        }
    }

    setupEventListeners() {
        if (this.options.pauseOnHover) {
            this.carousel.addEventListener('mouseenter', () => this.pause());
            this.carousel.addEventListener('mouseleave', () => this.resume());
        }

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else if (this.options.autoPlay) {
                this.resume();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    start() {
        if (this.animationId) return;
        this.isPlaying = true;
        this.lastTimestamp = performance.now();
        this.animate();
    }

    pause() {
        this.isPlaying = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.isPlaying && this.options.autoPlay) {
            this.start();
        }
    }

    animate(timestamp = performance.now()) {
        if (!this.isPlaying) return;

        const deltaTime = timestamp - this.lastTimestamp;
        const distance = (this.options.speed * deltaTime) / 1000;

        if (this.options.direction === 'left') {
            this.currentTranslate -= distance;
            if (Math.abs(this.currentTranslate) >= this.totalWidth) {
                this.currentTranslate = 0;
            }
        } else {
            this.currentTranslate += distance;
            if (this.currentTranslate >= 0) {
                this.currentTranslate = -this.totalWidth;
            }
        }

        const track = this.carousel.querySelector('.carousel-track');
        track.style.transform = `translateX(${this.currentTranslate}px)`;

        this.lastTimestamp = timestamp;
        this.animationId = requestAnimationFrame((ts) => this.animate(ts));
    }

    handleResize() {
        // Recalculate dimensions on resize
        this.pause();
        setTimeout(() => {
            this.setupCarousel();
            if (this.options.autoPlay) {
                this.start();
            }
        }, 100);
    }

    destroy() {
        this.pause();
        // Remove event listeners and cloned elements
        const clones = this.carousel.querySelectorAll('.carousel-clone');
        clones.forEach(clone => clone.remove());
    }
}

class DualRowCarousel {
    constructor(topSelector, bottomSelector, options = {}) {
        this.topCarousel = new LogoCarousel(topSelector, {
            ...options,
            direction: 'left'
        });

        this.bottomCarousel = new LogoCarousel(bottomSelector, {
            ...options,
            direction: 'right',
            speed: (options.speed || 30) * 0.8 // Slightly different speed for visual interest
        });
    }

    pause() {
        this.topCarousel.pause();
        this.bottomCarousel.pause();
    }

    resume() {
        this.topCarousel.resume();
        this.bottomCarousel.resume();
    }

    destroy() {
        this.topCarousel.destroy();
        this.bottomCarousel.destroy();
    }
}

class TestimonialCarousel {
    constructor(selector, options = {}) {
        this.carousel = document.querySelector(selector);
        if (!this.carousel) return;

        this.options = {
            autoPlay: options.autoPlay !== false,
            interval: options.interval || 5000,
            pauseOnHover: options.pauseOnHover !== false,
            showDots: options.showDots !== false,
            showArrows: options.showArrows !== false
        };

        this.currentIndex = 0;
        this.items = this.carousel.querySelectorAll('.testimonial-item');
        this.totalItems = this.items.length;
        this.intervalId = null;

        this.init();
    }

    init() {
        if (this.totalItems <= 1) return;

        this.setupCarousel();
        this.setupControls();
        this.setupEventListeners();

        if (this.options.autoPlay) {
            this.startAutoPlay();
        }
    }

    setupCarousel() {
        // Hide all items except first
        this.items.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active');
            } else {
                item.style.display = 'none';
            }
        });
    }

    setupControls() {
        if (this.options.showDots) {
            this.createDots();
        }

        if (this.options.showArrows) {
            this.createArrows();
        }
    }

    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';

        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        this.carousel.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.carousel-dot');
    }

    createArrows() {
        const prevArrow = document.createElement('button');
        prevArrow.className = 'carousel-arrow carousel-prev';
        prevArrow.innerHTML = '‹';
        prevArrow.setAttribute('aria-label', 'Previous slide');
        prevArrow.addEventListener('click', () => this.previousSlide());

        const nextArrow = document.createElement('button');
        nextArrow.className = 'carousel-arrow carousel-next';
        nextArrow.innerHTML = '›';
        nextArrow.setAttribute('aria-label', 'Next slide');
        nextArrow.addEventListener('click', () => this.nextSlide());

        this.carousel.appendChild(prevArrow);
        this.carousel.appendChild(nextArrow);
    }

    setupEventListeners() {
        if (this.options.pauseOnHover) {
            this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.carousel.addEventListener('mouseleave', () => {
                if (this.options.autoPlay) {
                    this.startAutoPlay();
                }
            });
        }

        // Keyboard navigation
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
    }

    goToSlide(index) {
        if (index === this.currentIndex) return;

        // Hide current slide
        this.items[this.currentIndex].classList.remove('active');
        this.items[this.currentIndex].style.display = 'none';

        // Show new slide
        this.currentIndex = index;
        this.items[this.currentIndex].style.display = 'block';

        // Use setTimeout to ensure display change is processed
        setTimeout(() => {
            this.items[this.currentIndex].classList.add('active');
        }, 10);

        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Restart autoplay
        if (this.options.autoPlay) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.totalItems;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, this.options.interval);
    }

    stopAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    destroy() {
        this.stopAutoPlay();
        // Clean up created elements and event listeners
        const dots = this.carousel.querySelector('.carousel-dots');
        const arrows = this.carousel.querySelectorAll('.carousel-arrow');

        if (dots) dots.remove();
        arrows.forEach(arrow => arrow.remove());
    }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize logo carousels
    const logoCarousel1 = document.querySelector('.logo-carousel-1');
    const logoCarousel2 = document.querySelector('.logo-carousel-2');

    if (logoCarousel1 && logoCarousel2) {
        new DualRowCarousel('.logo-carousel-1', '.logo-carousel-2', {
            speed: 40,
            pauseOnHover: true
        });
    } else if (logoCarousel1) {
        new LogoCarousel('.logo-carousel-1', {
            speed: 40,
            direction: 'left',
            pauseOnHover: true
        });
    }

    // Initialize testimonial carousel
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        new TestimonialCarousel('.testimonial-carousel', {
            autoPlay: true,
            interval: 6000,
            pauseOnHover: true,
            showDots: true,
            showArrows: true
        });
    }
});